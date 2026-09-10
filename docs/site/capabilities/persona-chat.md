# 角色与对话

**CHARACTOID 的对话永远属于某个角色。** 角色不是皮肤：它带着人设、授权能力、知识范围、记忆、声音绑定和形象。监督者只用这个角色被允许的工具回答用户。

> **事实依据**：`app/routers/personas.py`、`app/routers/agents.py`、`app/routers/messages.py`、`app/routers/persona_drafts.py`、`app/routers/persona_versions.py`、`agents/graph/supervisor.py`、`agents/capabilities.py`。

## 角色对象

集合接口（空路径）：

- `POST /api/personas` 创建
- `GET /api/personas` 列表
- `GET /api/personas/{persona_id}` 详情
- `PATCH /api/personas/{persona_id}` 更新
- `DELETE /api/personas/{persona_id}` 删除
- `GET /api/personas/{persona_id}/documents` 该角色文档

授权：

- `GET/PUT /api/personas/{persona_id}/capabilities`
- `GET/PUT /api/personas/{persona_id}/mcp-grants`

人设草稿与版本在独立 router 里，避免把“正在编辑”和“正在对话的生效档案”混成一次 PATCH。

`profile_worker` 负责在任务中修改档案（例如欢迎词），超时 30 秒，工具会标写操作。对话里改人设应走 Worker + 确认，而不是 silently PATCH。

## 对话怎么跑

`app/routers/agents.py` 挂在 `/api/personas` 下：

| 路径 | 用途 |
| --- | --- |
| `POST /{persona_id}/agent/stream` | 流式执行 |
| `POST /{persona_id}/agent/stream-resume` | 从中断处继续流 |
| `POST /{persona_id}/agent/query` | 非流式查询 |
| `POST /{persona_id}/agent/resume` | 非流式恢复 |

消息：

- `GET /api/personas/{persona_id}/conversations/{conversation_id}/messages`
- `DELETE /api/personas/{persona_id}/conversations/{conversation_id}`
- `POST .../voice-messages` 发送语音消息
- `GET /api/voice-messages/{message_id}/audio`
- `POST /api/voice-messages/{message_id}/transcribe`

删除会话是破坏性的。导出可用 `export_conversation` 工具（extended tools），不要靠复制 DOM。

## 监督者在中间做什么

图在 `agents/graph/build.py` 装配，监督者实现于 `agents/graph/supervisor.py`。意图漏斗在 `agents/intent_funnel.py`。典型路径：

1. 接收用户输入（文本或听写结果）；
2. 判断是直接回答，还是委派 Worker；
3. 按角色 capabilities 过滤工具；
4. Worker 返回合同字段；
5. finalize 校验；
6. 以角色口吻回复，并把 artifacts 留在同一任务。

落地页系统章用八个 Worker 案例把这条链可视化，和源码清单一一对应，并不是另编的演示数据。

## 流式与可恢复

长任务（文档 120s、语音 300s、RVC 1800s）不能把 HTTP 请求当成事务边界。正确做法：

- 用 stream 把监督者增量事件推给 UI；
- 同时持有 `run_id`；
- 刷新后 `stream-resume` / `resume`，或直接读 `GET /api/runs/{id}/events`。

HITL：Worker `requires_approval` 为真时，UI 出确认卡，`POST /api/runs/{id}/approval`。取消走 `/cancel`。

## 角色能力不是全开

内置 Tool 按 Worker 切片；Skill 与 MCP 要额外授权。没授权的 MCP 工具不会因为“模型想用”就出现。这是 `tools_for_specialist` 和 mcp-grants 的合页。

继续阅读：[创建第一个角色](/guide/character)、[对话与附件](/guide/conversation)、[Agent 与 Worker](/development/agent-worker)。


## PATCH 是浅合并

`PATCH /api/personas/{persona_id}` 更新 `profile` 时不是整份替换：

```python
merged = {**(persona.profile_json or {}), **payload.profile}
```

只覆盖本次提交的键。没出现的键保持原值。如果合并结果里有 `rag`，会走 `validate_retrieval_config`；失败返回 **422**，`detail` 为 `Invalid RAG configuration: ...`。

列表 `GET /api/personas` 只返回 `workspace_id == LOCAL_WORKSPACE_ID` 的角色。`local_persona_or_404` 在记录不存在**或**不属于本地工作区时，一律 **404** `Persona not found`。不要根据这条 404 判断“id 写错了”还是“工作区不对”——对外是同一句话。

## 删除与内置角色

`DELETE /api/personas/{persona_id}` 走 `persona_delete_service`：

- 内置角色 → **403** `内置角色不能删除`；
- 成功后删除 `data/tts/voices/{persona_id}.wav`（`unlink(missing_ok=True)`），再返回 **204**。

删角色不会在这一步清掉 Milvus 里所有切片。文档向量删除是文档任务自己的 `DELETE /api/documents/{job_id}` 路径。checkpoint 清理见 [任务生命周期](/development/lifecycle)，前缀是 `persona_id:%`。

## 能力与 MCP 授权

`PUT /api/personas/{persona_id}/capabilities`：未知能力 id 返回 **422** `Unknown capabilities: ...`。以 `/*` 结尾的通配（`endswith("/*")`）不算未知。

MCP 授权：

- 管理器未挂到 `app.state.mcp_manager` → **503** `MCP 管理器尚未就绪`；
- `GET .../mcp-grants` 里 `global` / `authorized` 看 `GLOBAL_ALL in server.allowed_persona_ids`；
- `PUT .../mcp-grants` **跳过** 已带 `GLOBAL_ALL` 的服务器：平台级全局授权不参与按角色授权，保持对所有角色可见。

不要用 PUT grants 去“关掉”全局服务器。那不是角色授权的职责。

## SSE 合同

`app/routers/agents.py` 与 personas 同挂 `/api/personas`。流式接口：

| 路径 | 用途 |
| --- | --- |
| `POST /{id}/agent/stream` | 流式执行 |
| `POST /{id}/agent/stream-resume` | 从中断处继续流 |
| `POST /{id}/agent/query` | 非流式 |
| `POST /{id}/agent/resume` | 非流式恢复 |

SSE 事件名是 `stage` / `token` / `result` / `done`。`StreamingResponse` 的 `media_type=text/event-stream`，响应头：

- `Cache-Control: no-cache`
- `X-Accel-Buffering: no`

执行键是 `persona_id:conversation_id`。`_watch_request_disconnect` / `_stream_with_disconnect_abort`：浏览器断开就 abort **当前 Job**，不会把 Run 标成用户已读的成功。

`_public_stream_event` 会把内部 `AgentTurnResult` 收成可 JSON 序列化的对象。不能依赖 `json.dumps(..., default=str)` 把 dataclass 丢给浏览器，否则前端收到的是字符串，答案、附件和 workflow 都会丢。
