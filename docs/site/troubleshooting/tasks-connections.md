# 任务、文件与连接排查

**一次用户句子会变成一条 Run；文件是附件或 DocumentJob；QQ / 直播是同一条角色任务的入口。** 三者状态机不同，不要互相重试。

> **事实依据**：`app/routers/runs.py`、`app/routers/agents.py`、`app/routers/documents.py`、`app/routers/attachments.py`、`app/attachments.py`、`app/routers/integrations.py`、`agents/runtime/approvals.py`、`agents/runtime/errors.py`、`ingestion/document_jobs.py`、`realtime/protocol.py`。

## Run

前缀 `/api/runs`，标签 `agent-runtime`。找不到 → 404 `run_not_found`；其它非法状态转换 → 409。响应形状：

```json
{ "error": { "code": "run_not_found", "message": "对外安全文案" } }
```

`message` 来自 `public_error_message`，不回传内部异常。

| 方法 | 路径 | 成功 | 典型失败 |
| --- | --- | --- | --- |
| GET | `/api/runs/{run_id}` | `{ "run": ... }` | 404 |
| GET | `/api/runs/{run_id}/events?after_sequence=` | `{ "run_id", "events": [...] }` | 404 |
| POST | `/api/runs/{run_id}/cancel` | 取消后的 run | 404 / 409 |
| POST | `/api/runs/{run_id}/approval` | `{ "run", "approved" }` | 404 / 409 `invalid_approval` |

前端用 `after_sequence` 做轮询或 SSE 之后的补洞。不要全量重拉再自己去重，sequence 就是游标。

`POST /approval` 的 body 是 `RunApprovalPayload`：只有 `approved: bool`。`ApprovalService.decide`：

- run 不存在 → `RUN_NOT_FOUND`；
- 当前不是 `WAITING_APPROVAL` → `INVALID_APPROVAL`；
- `approved=false` → 直接 `runtime.cancel(run_id)`，**没有**独立的 reject 状态；
- `approved=true` → 状态改 `RUNNING`，追加 `approval_granted` 事件。

## 对话入口怎么接到 Run

`POST /api/personas/{persona_id}/agent/stream`，body `AgentQueryPayload`：`question` 1–2000，`conversation_id` 1–255，`attachment_ids` 最多 32。

1. `context_for` 从 session 建 `PersonaAgentContext`，角色不在本地工作区 → 404 `Persona not found`
2. `try_persist_text_message` 先落用户句
3. 执行键 `persona_id:conversation_id`
4. `realtime_executions.run_stream` 产出事件
5. 浏览器断开 → `_watch_request_disconnect` 中止
6. `clone_session` 类事件改写成 `upload_request`（要声音材料时）
7. `result` 后再 `done`

同步：`/agent/query`。确认后：`/agent/stream-resume`、`/agent/resume`。Resume **不会**重新 persist 那句用户话。

WebSocket 入口：`/ws/personas/{persona_id}/conversations/{conversation_id}`。客户端只认 `text.submit` / `generation.cancel` / `confirmation.respond` / `session.ping`。角色 404 时 `error` + `close 1008`。

## SSE 断开与 abort

`app/routers/agents.py`：

- `_watch_request_disconnect(request, execution_key)` 轮询 `request.is_disconnected`，客户端一走就停；
- `_stream_with_disconnect_abort` 把当前 Job abort 掉，执行键是 `persona_id:conversation_id`；
- 这**不会**自动把 Run 写成用户已读的 `completed`。刷新后用 `GET /api/runs/{id}` 和 `events?after_sequence=` 补洞，必要时 `stream-resume`。

不要把“浏览器关了标签”理解成 Worker 崩溃，也不要立刻再 POST 同一句开一条新 Run——那会并发行、重复副作用。

## 事件流形状

stream 的公开事件是 `stage` / `token` / `result` / `done`。`result` 必须是对象：`_public_stream_event` 会把内部 `AgentTurnResult` 改写成 `response_for(result).model_dump(by_alias=True)`。如果你在代理层用 `json.dumps(default=str)` 把 dataclass 变成字符串，UI 会丢答案和附件。

非 dict 事件会被改成 `{ "kind": "error", "message": "无效的 Agent 事件" }`。

响应头必须保留 `Cache-Control: no-cache` 和 `X-Accel-Buffering: no`，否则 nginx 类反向代理会把 SSE 攒成一块。

## 文档任务

和 Run 不是一张表。上传上限 `MAX_UPLOAD_MB`（`.env` 默认 50）→ `MAX_UPLOAD_BYTES`。

`ALLOWED_EXTENSIONS`：

```text
.pdf .doc .docx .ppt .pptx .xls .xlsx
.html .htm .csv .json .xml .txt .md
.epub .jpg .jpeg .png .gif .bmp .tif .tiff
```

`.csv` / `.xlsx` 还会进结构化知识（`STRUCTURED_EXTENSIONS`）。旧版 Word `.doc` 在转换层可能提示另存为 `.docx`，那是实现约束，不是文档写错。

| 步骤 | 方法 | 路径 | 失败 |
| --- | --- | --- | --- |
| 上传 | POST | `/api/knowledge-spaces/{space_id}/documents/upload` | 空列表 422；空间不在本地 404；类型 415；过大 413；转换失败 422；201 返回 job 列表 |
| 看 job | GET | `/api/documents/{job_id}` | 404 `Document job not found` |
| 单份报告 | GET | `/api/documents/{job_id}/report` | 404 |
| 空间汇总 | GET | `/api/knowledge-spaces/{space_id}/documents/report` | 404 `Knowledge space not found` |
| **确认索引** | POST | `/api/documents/{job_id}/confirm` | 状态不是 `preview_ready` → 409 `Invalid document state` |
| 失败重试 | POST | `/api/documents/{job_id}/retry-index` | 状态不是 `index_failed` → 409 |
| 删除 | DELETE | `/api/documents/{job_id}` | 204；indexing/indexed/index_failed 时先删 Milvus，失败 502 |

状态机（`ingestion/document_jobs.py`）：

```text
converting → preview_ready → indexing → indexed
                 ↘ conversion_failed
                              ↘ index_failed → retry → indexing
```

`prepare_index` 只接受 `preview_ready`；`prepare_retry` 只接受 `index_failed`。没 confirm 的文档不会稳定出现在 knowledge_worker 的证据里。这是最常见的“我传了但角色说没有”。

文档上传**没有** `EMPTY_FILE` 业务码。空文件 422 属于语音：`Audio request is empty` / `Audio file is required` / `Audio file is empty`。

## 附件

对话 payload 带 `attachment_ids`。Agent 上下文会把这些 id 传进监督者。结果里的附件 id 由 `_result_attachment_ids` 从 Worker artifacts 抽出。前端应展示 artifacts，而不是假设文件已经进了知识库——那是 document_worker + confirm 的事。

附件 API 都要 `X-Charactoid-Request: web`（下载 GET 除外）。缺头 403 `Missing same-origin request header`。

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/conversations/{conversation_id}/attachments` | 201 `{ attachments }`；空文件 / 超 512MB / 不支持格式。超 512MB → 413（靠错误文案含 `512` 判断），其它 ValueError → 415 |
| GET | `/.../attachments` | 仅 `status=ready`，按 created_at desc |
| GET | `/.../attachments/{file_id}` | 下载；找不到 404 |
| PATCH | `/.../attachments/{file_id}` | 改显示名；非法 400 |
| DELETE | `/.../attachments/{file_id}` | 204 |
| POST | `/.../send-to-rvc` | 仅 `kind in {audio,video}`，否则 415 |
| POST | `/.../send-to-rag` | 仅 `kind=document`，否则 415 |

`MAX_ATTACHMENT_BYTES = 512 * 1024 * 1024`。上传失败会 rollback 并删除已写到磁盘的文件。

Voice Studio 更严：视频 400MB，音频 200MB，表单分片上限 512MB。那是 Studio，不是聊天附件。

## QQ / OneBot 与 B站

`/api/integrations` 全部 `require_local`。配置在 `data/integrations.json`。

B站：`GET /bilibili`、`PUT /bilibili/config`（空 cookie 不覆盖已存值）、`POST connect|disconnect|pause|resume`、清队列 / 清 session、`WS /bilibili/events/ws`。

OneBot：`GET/PUT /onebot11`、observation、targets（未连接返回 `available=false` 空列表，不抛）、test（未连接 409）、disconnect、清 conversation / recent、删 token、`POST /napcat/send`。

`/napcat/send`：未连接 409 `NapCat 尚未连接`；既没 text 也没 record_path → 422；要现合成却没绑 GPT-SoVITS 音色 → 409。

这些入口把消息送进**同一条角色任务**，不是旁路聊天机器人。排查时用角色 `conversation_id` 和 integrations 状态对照，不要只看直播软件。

直播 WebSocket 断了只影响弹幕入口，不影响本机 `/agent/stream`。OneBot 未连接时，工作台对话仍可用。

`integrations/qq_official/` 目前没有可引用的实现，不要按“官方 QQ 机器人已接通”去排。

## 决策表

| 你看到 | 先做 | 不要做 |
| --- | --- | --- |
| 等待确认 | approval true/false | 再发同一句开新 run |
| 用户断开 SSE | 用 events 补；必要时 resume | 当成 Worker 崩溃 |
| 文档 converting / preview_ready | 等 job，再 confirm | 立刻知识问答 |
| confirm 409 | 看 job.status 是不是 preview_ready | 反复 upload |
| RVC 长时间 running | 看 rvc 任务，等 1800s 量级 | 当 TTS 重试 |
| 直播连不上 | integrations + require_local | 重装 embedding |
| 403 | 确认 127.0.0.1 和 `X-Charactoid-Request` | 关 CORS |
| 附件 413 | 文件 > 512MB | 当文档 50MB 上限 |
| 文档 413 | 超过 `MAX_UPLOAD_MB` | 当附件 512MB |

## 下一步

[常见问题](/troubleshooting/qa) · [资源](/troubleshooting/resources) · [事件](/reference/events) · [Runs API](/reference/api-agents-runs)
