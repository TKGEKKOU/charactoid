# 任务、文件与连接排查

**一次用户句子会变成一条 Run；文件是附件或 DocumentJob；QQ / 直播是同一条角色任务的入口。** 三者状态机不同，不要互相重试。

> **事实依据**：`app/routers/runs.py`、`app/routers/agents.py`、`app/routers/documents.py`、`app/routers/attachments.py`、`app/routers/integrations.py`、`agents/runtime/approvals.py`、`agents/runtime/errors.py`。

## Run

| 方法 | 路径 | 成功 | 典型失败 |
| --- | --- | --- | --- |
| GET | `/api/runs/{run_id}` | `{ run }` | 404 `run_not_found` |
| GET | `/api/runs/{run_id}/events?after_sequence=` | 增量事件 | 404 |
| POST | `/api/runs/{run_id}/cancel` | 取消后的 run | 404 / 409 非法转换 |
| POST | `/api/runs/{run_id}/approval` | `{ run, approved }` | 404 / 409 `invalid_approval` |

`_status_for_error`：找不到 404，其它转换问题 409。响应形状是 `{"error":{"code","message"}}`。

前端应用 `after_sequence` 做轮询或 SSE 之后的补洞。不要全量重拉再自己去重，sequence 就是游标。

## 对话入口怎么接到 Run

`POST /api/personas/{persona_id}/agent/stream`：

1. `context_for` 从 session 建 `PersonaAgentContext`，角色不在本地工作区 → 404
2. `try_persist_text_message` 先落用户句
3. 执行键 `persona_id:conversation_id`
4. `realtime_executions.run_stream` 产出事件
5. 浏览器断开 → `_watch_request_disconnect` 中止
6. `clone_session` 类事件改写成 `upload_request`（要声音材料时）
7. `result` 后再 `done`

同步：`/agent/query`。确认后：`/agent/stream-resume`、`/agent/resume`。Resume 不会重新 persist 那句用户话。

## 文档任务

和 Run 不是一张表。

1. `POST /api/knowledge-spaces/{space_id}/documents/upload` 接受多个文件，空间不存在则失败
2. 每个文件 `create_conversion_job`
3. 看 job：`GET /api/documents/{job_id}`
4. **确认索引** `POST /api/documents/{job_id}/confirm`
5. 失败重试 `POST /api/documents/{job_id}/retry-index`
6. 删除 `DELETE /api/documents/{job_id}`（204）
7. 空间汇总 `GET /api/knowledge-spaces/{space_id}/documents/report`

没 confirm 的文档不会稳定出现在 knowledge_worker 的证据里。这是最常见的“我传了但角色说没有”。

## 附件

对话 payload 带 `attachment_ids`。Agent 上下文会把这些 id 传进监督者。结果里的附件 id 由 `_result_attachment_ids` 从 Worker artifacts 抽出。前端应展示 artifacts，而不是假设文件已经进了知识库——那是 document_worker + confirm 的事。

## QQ / OneBot 与 B站

`/api/integrations` 全部 `require_local`。

B站：

- `GET /api/integrations/bilibili`
- `PUT /bilibili/config`
- `POST /bilibili/connect|disconnect|pause|resume`
- 清队列 / 清 session
- `WS /bilibili/events/ws`

OneBot：

- `GET/PUT /onebot11`
- observation、targets、test、disconnect
- 清 conversation / recent
- 删 token
- `POST /napcat/send`

这些入口把消息送进**同一条角色任务**，不是旁路聊天机器人。排查时用角色 `conversation_id` 和 integrations 状态对照，不要只看直播软件。

直播 WebSocket 断了只影响弹幕入口，不影响本机 `/agent/stream`。OneBot 未连接时，工作台对话仍可用。

## 决策表

| 你看到 | 先做 | 不要做 |
| --- | --- | --- |
| 等待确认 | approval true/false | 再发同一句开新 run |
| 用户断开 SSE | 用 events 补；必要时 resume | 当成 Worker 崩溃 |
| 文档 converting | 等 job，再 confirm | 立刻知识问答 |
| RVC 长时间 running | 看 rvc 任务，等 1800s 量级 | 当 TTS 重试 |
| 直播连不上 | integrations + require_local | 重装 embedding |
| 403 | 确认 127.0.0.1 | 关 CORS |

## 下一步

[常见问题](/troubleshooting/qa) · [资源](/troubleshooting/resources) · [事件](/reference/events) · [Runs API](/reference/api-agents-runs)


## SSE 断开与 abort

`app/routers/agents.py`：

- `_watch_request_disconnect(request, execution_key)` 轮询 `request.is_disconnected`，客户端一走就停；
- `_stream_with_disconnect_abort` 把“当前 Job”abort 掉，执行键是 `persona_id:conversation_id`；
- 这**不会**自动把 Run 写成用户已读的 `completed`。刷新后用 `GET /api/runs/{id}` 和 `GET /api/runs/{id}/events?after_sequence=` 补洞，必要时 `stream-resume`。

不要把“浏览器关了标签”理解成 Worker 崩溃，也不要立刻再 POST 同一句开一条新 Run——那会并发行、重复副作用。

## 事件流形状

stream 的公开事件是 `stage` / `token` / `result` / `done`。`result` 必须是对象：`_public_stream_event` 会改写内部 `AgentTurnResult`。如果你在代理层用 `json.dumps(default=str)` 把 dataclass 变成字符串，UI 会丢答案和附件。

响应头必须保留 `Cache-Control: no-cache` 和 `X-Accel-Buffering: no`，否则 nginx 类反向代理会把 SSE 攒成一块。
