# 对话与任务

**对话页是监督者的用户界面。** 一句普通闲聊可以只生成回复；一句带目标的话会变成 Run，可能分派 Worker、等待确认或补齐输入、写入附件，再回到同一 `conversation_id`。

> **事实依据**：`app/routers/agents.py`、`app/routers/runs.py`、`app/schemas.py`（`AgentQueryPayload` / `AgentResumePayload` / `AgentTurnResponse`）、`app/chat_store.py`、`app/conversation_summary.py`、`agents/context_factory.py`、`agents/service.py`（`PersonaAgentService`）、`agents/confirmation_policy.py`、`agents/graph/build.py`、`agents/graph/supervisor.py`、`agents/runtime/approvals.py`。

本页回答四件事：HTTP 怎么进图、SSE 浏览器能看见什么、确认/补输入和取消分别走哪条路、一轮结束后消息和摘要怎么落库。Runtime 的 Job / RunStore / checkpointer 三层见 [内置 Runtime](/concepts/runtime)。八个 Worker 的超时与工具表见 [Worker 清单](/reference/workers)。

## 四条 HTTP

`APIRouter` 前缀是 `/api/personas`，所以完整路径都在 `/api/personas/{persona_id}/agent`：

| 路径 | 形态 | 请求体 | 何时用 |
| --- | --- | --- | --- |
| `POST /stream` | SSE | `AgentQueryPayload` | 新问题，页面主路径 |
| `POST /query` | JSON `AgentTurnResponse` | 同上 | 不要流式时（脚本、测试、一次性调用） |
| `POST /stream-resume` | SSE | `AgentResumePayload` | 确认或补输入后继续，流式 |
| `POST /resume` | JSON `AgentTurnResponse` | 同上 | 确认或补输入后继续，一次性 |

角色不存在、或不属于本地工作区，`context_for()` 把 `PersonaNotFound` 转成 **404** `Persona not found`。对外不区分“id 写错”和“工作区不对”。

### AgentQueryPayload

`extra="forbid"`。字段：

| 字段 | 约束 |
| --- | --- |
| `question` | 1–2000 字符，strip 后不能空 |
| `conversation_id` | 1–255 字符，strip 后不能空 |
| `attachment_ids` | `list[str]`，最多 32 个，默认 `[]` |

多出来的字段直接 422，不要靠后端默默丢掉。

### AgentResumePayload

同样 `extra="forbid"`：

| 字段 | 说明 |
| --- | --- |
| `conversation_id` | 必填 |
| `specialist` | 旧确认 API，默认 `"management"`，闭合集合 `conversation / web / memory / management` |
| `approved` | `bool \| None`，旧“同意/拒绝” |
| `worker` | 新流程优先，canonical Worker 名 |
| `task_id` | 新流程优先 |
| `attachment_ids` | 最多 32 个 |
| `input_values` | `dict`，补齐 `waiting_input` 时用 |

源码注释写明：`specialist` / `approved` 保留旧确认 API；新流程优先 `worker` / `task_id` / `input_values`。前端不要只发一句自然语言“你继续吧”当 resume。

## stream 内部顺序

`POST /stream` 在 `stream_agent_query` 里按这个顺序走：

1. `persona_agent_context_from_session` 装配 `PersonaAgentContext`（人设、能力、附件、runtime）。
2. `try_persist_text_message(..., role="user", content=payload.question, attachment_ids=...)` 先把用户句落库。
3. 执行键 `key = f"{persona_id}:{conversation_id}"`。
4. `agent_runner_for(app.state)`：有 `app.state.agent_runtime` 就用 Runtime，否则回落到 `agent_service`（演示/测试）。
5. `realtime_executions.run_stream(key, lambda: agent_runner.stream_query(...))`。
6. `async with _stream_with_disconnect_abort(request, key)`：后台每 0.2s 看 `request.is_disconnected()`，断开就 `realtime_executions.cancel(key)`。
7. 循环里再检查一次 `is_disconnected()`，断了就 `break`。
8. 特殊内部事件 `kind == "clone_session"` 不会原样出站：
   - `action == "request_voice_material"` → 公开 `{"kind":"upload_request","purpose":"voice_material"}`
   - `action == "voice_session_created"` → 同上，并带 `session_id`
9. `kind == "result"` 时：若 result 有 `workflow`，先派生 `workflow_update`（`task_id` 来自 `result.task_id`，否则倒序扫 artifacts）；然后 `_finalize_agent_turn`。
10. 每个公开事件经 `_sse()` 写出；生成器结束时再发 `{"kind":"done"}`。

响应：`StreamingResponse`，`media_type="text/event-stream"`，头是 `Cache-Control: no-cache` 和 `X-Accel-Buffering: no`（避免反向代理把 SSE 攒成一块）。

`POST /stream-resume` **几乎相同**，但有两处关键差别：

- **不会**再 `try_persist_text_message` 用户句。重复点发送才会变成两条用户消息。
- 调用的是 `agent_runner.stream_resume(context, payload.specialist, payload.approved, worker=..., task_id=..., attachment_ids=..., input_values=...)`。

非流式 `query` / `resume` 走 `realtime_executions.run`。`query` 在 `status == "completed" and result.answer` 时同步落 assistant 消息并 `schedule_summary_after_turn`；流式把这两步放进 `_finalize_agent_turn`，避免 token 还在飞就写库。

## 公开 SSE 合同

`_public_stream_event` 把内部事件收成浏览器可 JSON 解析的对象。`AgentTurnResult` 是内部 dataclass：**必须** `response_for(result).model_dump(by_alias=True)`。用 `json.dumps(..., default=str)` 会把答案、附件和 workflow 变成字符串，前端拿不到对象。

页面应处理的 `kind`：

| kind | 含义 |
| --- | --- |
| `stage` | 过程文案，例如“已识别为记忆请求…” |
| `token` | 监督者增量文本 |
| `result` | 整轮 `AgentTurnResponse` |
| `workflow_update` | 从 result 派生，带 `task_id` 与 `flow` |
| `upload_request` | 变声/声音素材上传 |
| `done` | 本条 SSE 结束，不是任务一定成功 |
| `error` | 事件本身非法 |

前端应根据 `stage` 画过程，不要自己 `setTimeout` 假进度。Worker 不对用户说话；用户只看到监督者组织后的回复（RVC / voice 非 completed 是例外，见下文 wait boundary）。

## AgentTurnResponse

`response_for()` 从内部 result 抽出公开字段。`status` 闭合集合：

`completed` / `pending_confirmation` / `waiting_input` / `failed` / `degraded`

其它稳定字段（以 `app/schemas.py` 为准）：

- `answer`、`specialist`（旧四分类）、`worker`（canonical 名，`result.worker or result.specialist`）
- `pending_action`、`waiting_inputs`、`requires_approval`（`status == "pending_confirmation"` 时为真）
- `tool_calls`、`worker_results`（缺省时回落到 `tool_calls`）
- `evidence` / `citations` / `uncertainties` / `trace` / `artifacts` / `result_refs`
- `confidence` 来自 `metrics.confidence`，缺省 0.0
- `error` / `error_code` / `error_message` 经 `resolve_error_fields()`，不暴露私有异常
- `workflow`、`task_type`、`task_id`、`input_refs`、`selected_options`
- `loaded_skills`、`events`、`metrics`、`duration_seconds`

`specialist` 对外仍是旧四分类；领域归属看 `worker`。

## 进入图之前：PersonaAgentService

`agents/service.py` 是 LangGraph 的应用层入口。`thread_id` **永远**是：

```text
persona_id:conversation_id
```

所有 Worker 共享这一条线程，handoff / interrupt / resume 才能回到同一份父图检查点。`specialist` 参数只为兼容旧接口，函数里 `del specialist`。

`query()` / `stream_query()` 的前置门：

1. `_preset_guide_turn`：命中内置引导则直接返回，不进图。
2. `_find_pending`：检查点里已有暂停的写操作或等待输入。**新问题不能绕过上一次确认。** 返回 `pending_confirmation` 或 `waiting_input`。
3. `is_capability_question(question)`：能力清单问答，直接 `capability_summary()`，不派 Worker。
4. `_intent_for_question`：本句意图 + 上一轮 `intent_decision`（省略句要沿用 web 策略）。
5. `graph.invoke` / `astream`，初始 state 带 `messages`、`intent_decision`、`input_refs.attachment_ids` 等。
6. 瞬时模型故障（429/5xx）走降级文案，`status` 对外仍可能是 `completed` 但 telemetry 记 `degraded`；取消异常 `turn_was_cancelled` 上抛。
7. invoke 返回后**再读一次 checkpoint**。interrupt 的值在 checkpoint 里，不在 invoke 返回值里；不读就会把“等上传”误报成普通完成。

`_graph()` 在工具注册表 revision 变化、或 Settings 的 `openai_api_key` / `base_url` / `model` 变化时重建编译图。正在跑的 turn 不被强制打断；下一轮用新客户端。

## 普通闲聊 vs 任务

图的主入口是 `START → persona_supervisor`，**不是**意图漏斗。`intent_route` 节点仍在 `build.py` 里，但不挂在 START 上。漏斗只提供提示和搜索安全门禁。

`_intent_route` 里有硬约束：`direct_worker_for_intent` 若得到 `rvc_worker`（或没有 worker），**强制** `route_node = persona_supervisor`。源码注释：RVC 必须由 Core Supervisor 通过 handoff 委派；意图漏斗不能绕过 Agent 直接进专用工作流。

监督者可以：

- 纯人设问答，不派 Worker
- 收集缺失信息，停在 `waiting_input`
- `delegate_to_*` 结构化交接
- 按需 `load_skill`
- 读 Worker 的 evidence / artifacts / error，组织最终回复

能力未开：`reject` → 公开侧常见为 `capability_denied` 一类 `error.code`。写操作或本地知识不足要联网：`confirm`。

## 结构化交接与 waiting_input

Supervisor 不把自由文本当任务合同。`supervisor_dispatch` 校验 `dispatch_request`：

- 必须是对象，且通过 `validate_structured_handoff`
- `worker` 必须在 `WORKERS`
- 禁止字段（顶层、`input_refs`、`options` 都查）：`input_path` / `output_path` / `path` / `command` / `cmd` / `shell` / `python` / `python_file`
- 必须有 `conversation_context` 对象、非空 `task_type`、对象型 `input_refs` 与 `options`
- `task_type` 必须属于该 Worker 的允许集合（见 [Agent 与 Worker](/development/agent-worker)）
- RVC `convert` 必须有 `session_id` 或输入文件引用；`cancel` 必须有 `task_id` 或 `session_id`
- voice `cancel` 必须有 `session_id` / `voice_session_id`

缺输入时 `interrupt(action)`，`action.kind == "waiting_input"`。interrupt 把状态交给 API/UI，**不再 route 回 Core**，避免 Core 重复 handoff 死循环。恢复后本节点从头校验。

RVC 在 dispatch 阶段只收集启动 session 必需的源文件。模型、Index、转换参数属于 `rvc_worker` 业务状态，必须在 handoff 且源文件准备/分离之后再问。如果在 dispatch 一次性拦截，前端会在“正在分析请求…”就弹出配置卡，永远进不了 Worker。

document_worker 只有入库/导入才强制附件或 URL；列表、删除、重命名不得在图层拦截。

## 确认

确认发生在 **Run** 上，不是发生在下一句聊天里。纯函数决策见 `agents/confirmation_policy.py`：

`decide_capability`：

| 条件 | mode | reason |
| --- | --- | --- |
| `allowed` 为假 | `reject` | `capability_not_allowed` |
| `requires_confirmation` | `confirm` | `capability_requires_confirmation` |
| 否则 | `direct` | `capability_allowed` |

`decide_web_fallback`：

| 条件 | mode | reason |
| --- | --- | --- |
| 意图 `negated` 含 `web` | `reject` | `web_explicitly_denied` |
| `web_authorized` 且显式要 web | `direct` | `explicit_web_request` |
| `web_authorized`（新鲜外部事实） | `direct` | `fresh_external_fact` |
| 否则 | `confirm` | `local_knowledge_insufficient` |

操作走 `/api/runs`（`app/routers/runs.py`）：

| 路径 | 作用 |
| --- | --- |
| `GET /api/runs/{id}` | 读 Run |
| `GET /api/runs/{id}/events?after_sequence=` | 续拉事件，不要全量当进度条 |
| `POST /api/runs/{id}/approval` | `{ "approved": true\|false }`，`ApprovalService.decide` |
| `POST /api/runs/{id}/cancel` | `agent_runtime.cancel` |

找不到 run → 404 `run_not_found`。非法状态转换 → 409（`run_terminal` / `invalid_approval` 等）。已经 terminal 的 run 不能再批。

同意之后还要 **resume**（`/agent/stream-resume` 或 `/agent/resume`），approval 本身不会把图跑完。拒绝后公开结果是 `confirmation_denied` 一类失败，而不是静默当闲聊。

## 断开、取消、两层 abort

浏览器关掉 SSE：`_watch_request_disconnect` 取消的是 **当前 execution_key 对应的 Job**，不是“把 Run 标成用户已读的成功”。要停领域副作用（RVC session、资源下载）必须走 Runtime 已注册的 cancel handler，见 [内置 Runtime](/concepts/runtime) 的两层取消。

`TurnCancel` 打断本轮 LLM / HTTP / MCP；`NativeAgentLoop.Job.cancelled` 停生成器。两层都要看，只关页面不等于任务在磁盘上消失。

## 结果附件与落库

`_result_attachment_ids` 只从 `artifacts` 和 `worker_results` 抽 **结果** 附件，不把用户输入附件误挂到 assistant 消息。识别 `type` 为 `attachment` / `file` / `audio` / `video` / `image` / `document`，或嵌套键 `attachment(s)` / `artifacts`；用 `file_id`，最多 32 个。

`_finalize_agent_turn` 仅在 `status == "completed" and result.answer` 时：

1. persist assistant 文本 + 结果附件 id
2. `schedule_summary_after_turn`

失败、等待确认、等待输入都不会在这里写一条假装完成的助手消息。

RVC 完成不是去资源页另开下载窗口就结束；监督者要把产物收束到**当前对话**。前端工作台的结果卡片应对这个合同。

上传知识文档不走 agent 的 `attachment_ids`，走知识空间 upload + document confirm。`attachment_ids` 是本轮对话输入，不是索引流水线。

## 摘要与记忆

`schedule_summary_after_turn` 是会话压缩，**不是**记忆 Worker。记忆写入要用户明确“记住…”，走 `memory_worker`（默认 30s 超时、不重试）。换 `persona_id` 记忆不会跟着走。

工作区记忆和角色记忆是两套；`workspace_memories_for_context` / `memories_for_context` 在监督者装配上下文时读入，不在前端 localStorage。

## 事件卫生

推到浏览器的 details 经过清洗。不要指望看到完整 prompt、工具原始参数里的路径、密钥。UI 调试用 `run_id` + `code` + Worker `trace`。`GET /api/runs/{id}/events?after_sequence=` 用来续拉。

## 接入通道

QQ / 直播把外部消息变成同一套 `question + conversation`。它们不走另一套人格。排查“直播不回答”时，先看 integrations 是否 connected，再看该角色对话里是否出现对应 user 消息。OneBot WebSocket 路由与 integrations 路由是分开注册的。

## 建议的操作纪律

1. 一条目标没结束前，不要复制粘贴再发一遍——pending 会挡住新问题，重复发送只会多一条用户消息。
2. 等确认时去点卡片 / 调 `/approval`，不要在输入框解释“你继续吧”。
3. 缺文件时走 `waiting_input` 的上传控件，不要把本地路径写进聊天。
4. 看失败先看 `error_code` 再看模型。
5. 换角色就是换 `persona_id`，不要指望记忆跟着走。
6. 关掉页面会 abort 当前 stream Job；要续的是 Run / resume，不是“再把上一句贴回去”。

## 相关

[第一次任务](/guide/first-task) · [角色与对话](/capabilities/persona-chat) · [生命周期](/concepts/lifecycle) · [内置 Runtime](/concepts/runtime) · [事件](/reference/events) · [Agent/Run API](/reference/api-agents-runs) · [Agent 与 Worker](/development/agent-worker)
