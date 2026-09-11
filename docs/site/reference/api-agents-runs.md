# 角色、对话与运行 API

**角色是组织单位。一次对话请求要么由 Supervisor 直接回答，要么创建可查询、可确认、可取消的 Run。前端不要自己选 Worker。**

源码：`app/routers/personas.py`、`app/routers/persona_versions.py`、`app/routers/persona_drafts.py`、`app/routers/agents.py`、`app/routers/messages.py`、`app/routers/runs.py`、`app/routers/attachments.py`、`app/routers/capability_assignments.py`、`app/routers/realtime.py`、`agents/service.py`、`app/run_store.py`。

## 角色

`APIRouter(prefix="/api/personas")`。

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `POST` | `/api/personas` | 创建角色，`201` |
| `GET` | `/api/personas` | 列出本机工作区角色 |
| `GET` | `/api/personas/{persona_id}` | 详情 |
| `PATCH` | `/api/personas/{persona_id}` | 更新资料 |
| `DELETE` | `/api/personas/{persona_id}` | 删除 |
| `GET` | `/api/personas/{persona_id}/documents` | 角色文档 |
| `GET` | `/api/personas/{persona_id}/capabilities` | 能力策略 |
| `PUT` | `/api/personas/{persona_id}/capabilities` | 保存能力策略 |
| `GET` | `/api/personas/{persona_id}/mcp-grants` | MCP 授权视图 |
| `PUT` | `/api/personas/{persona_id}/mcp-grants` | 保存授权并即时刷新 |

创建最小集只要名称和人设。声音、知识、Live2D、MCP 都是后续绑定。内置角色可能受 `persona.guide.BuiltinPersonaProtected` 保护，不能按普通角色删。

能力策略决定这个角色能用哪些 Tool / Skill / MCP，以及写操作要不要确认。全局目录在 `GET /api/capabilities/assignments`，角色覆盖在上面两条 capabilities 路由。

## 版本

`app/routers/persona_versions.py`，人设变更应版本化，而不是覆盖掉唯一一份 prompt。

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `POST` | `/api/personas/{persona_id}/versions` | 新建版本 |
| `GET` | `/api/personas/{persona_id}/versions` | 列表 |
| `GET` | `/api/personas/{persona_id}/versions/diff` | 差异 |
| `GET` | `/api/personas/{persona_id}/versions/{version_id}` | 单版本 |
| `POST` | `/api/personas/{persona_id}/versions/{version_id}/publish` | 发布 |
| `POST` | `/api/personas/{persona_id}/versions/{version_id}/rollback` | 回滚 |

工作台编辑人设后，对话应读当前已发布版本。草稿确认前不要当成线上人设。

## 草稿

`/api/persona-drafts` 用于从材料生成或编辑候选人设，不是已发布角色。

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `POST` | `/api/persona-drafts/upload` | 上传材料 |
| `GET` | `/api/persona-drafts/{draft_id}` | 草稿 |
| `PATCH` | `/api/persona-drafts/{draft_id}` | 改草稿 |
| `POST` | `/api/persona-drafts/{draft_id}/candidates/{candidate_id}` | 选候选 |
| `POST` | `/api/persona-drafts/{draft_id}/confirm` | 确认落成角色/版本 |

## Agent 进出

`app/routers/agents.py`，仍挂在 `/api/personas`：

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `POST` | `/api/personas/{persona_id}/agent/stream` | 流式执行一次请求 |
| `POST` | `/api/personas/{persona_id}/agent/stream-resume` | 流式恢复 |
| `POST` | `/api/personas/{persona_id}/agent/query` | 非流式查询 |
| `POST` | `/api/personas/{persona_id}/agent/resume` | 非流式恢复 |

这是工作台对话的主入口。请求里带会话、消息、附件引用。响应是事件流或最终消息，不是 Worker 名称菜单。

恢复必须带原来的 `run_id` 和等待输入所需的确认/补充，不要重发同一句话假装 resume。

## 运行

`/api/runs`（`app/routers/runs.py`）+ `app/run_store.py`：

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `GET` | `/api/runs/{run_id}` | 运行快照 |
| `GET` | `/api/runs/{run_id}/events` | 事件 |
| `POST` | `/api/runs/{run_id}/cancel` | 取消 |
| `POST` | `/api/runs/{run_id}/approval` | 确认或拒绝等待中的操作 |

状态机见 [任务生命周期](/development/lifecycle) 与 [事件与状态](/reference/events)。`waiting_input` 时前端应展示卡片，而不是继续 POST stream。

## 消息、附件、语音消息

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `GET` | `/api/personas/{persona_id}/conversations/{conversation_id}/messages` | 消息列表 |
| `DELETE` | `/api/personas/{persona_id}/conversations/{conversation_id}` | 删除会话 |
| `POST` | `/api/personas/{persona_id}/conversations/{conversation_id}/voice-messages` | 语音消息 |
| `GET` | `/api/voice-messages/{message_id}/audio` | 取音频 |
| `POST` | `/api/voice-messages/{message_id}/transcribe` | 转写 |
| `POST` | `/api/conversations/{conversation_id}/attachments` | 上传附件 |
| `GET` | `/api/conversations/{conversation_id}/attachments` | 附件列表 |
| `GET` | `/api/conversations/{conversation_id}/attachments/{file_id}` | 附件 |
| `PATCH` | `/api/conversations/{conversation_id}/attachments/{file_id}` | 元数据 |
| `DELETE` | `/api/conversations/{conversation_id}/attachments/{file_id}` | 删除 |
| `POST` | `.../attachments/{file_id}/send-to-rvc` | 送到 RVC 会话 |
| `POST` | `.../attachments/{file_id}/send-to-rag` | 送到知识库 |

附件 ID 是后续 RVC / RAG / Voice Studio 的输入。浏览器只拿 ID 和下载 URL，不拿盘符路径。

## 实时通道

`WEBSOCKET /ws/personas/{persona_id}/conversations/{conversation_id}`（`app/routers/realtime.py`）推送同一会话上的消息与运行事件。WebSocket 不是第二条业务协议：断线后用 HTTP 查询补洞，不要只信内存里的最后一帧。

## 能力总表

`GET /api/capabilities/assignments` / `PATCH /api/capabilities/assignments` 管全局默认。角色级覆盖仍走 `/api/personas/{id}/capabilities`。Worker 清单是 `GET /api/workers/manifests`，给调试用，不给用户点选。

## 相关页面

- [角色与对话](/capabilities/persona-chat)
- [创建第一个角色](/guide/character)
- [完成一次对话任务](/guide/first-task)
- [事件与状态](/reference/events)
- [任务生命周期](/development/lifecycle)

## 源码合同（中档补全）

### 执行键与 Resume

`app/routers/agents.py` 用 `key = f"{persona_id}:{conversation_id}"` 交给 `realtime_executions`。同一对话同时只能有一条 in-flight 执行。SSE 断开时 `_watch_request_disconnect` 会 `cancel(execution_key)`。

`/agent/stream` 与 `/agent/query` 会 persist 用户句；`/agent/stream-resume` 与 `/agent/resume` **不会**再 persist 用户句。Resume 仍可能 persist assistant 完成句（`result.status == "completed" and result.answer`）。

### 审批没有独立 reject

`POST /api/runs/{id}/approval` → `ApprovalService.decide(run_id, approved)`（`agents/runtime/approvals.py`）：

- Run 不存在：`RUN_NOT_FOUND`
- 状态不是 `waiting_approval`：`INVALID_APPROVAL`
- `approved=false`：`runtime.cancel(run_id)`，没有单独的 rejected 状态
- `approved=true`：标为 running，并追加 `approval_granted` 事件

取消另有 `POST /api/runs/{id}/cancel`。

### PATCH 人设是浅合并

`PATCH /api/personas/{persona_id}`：`merged = {**(persona.profile_json or {}), **payload.profile}`。只覆盖提交的键。若合并结果含 `rag`，会走 `validate_retrieval_config`。不要以为省略的字段会被清空。
