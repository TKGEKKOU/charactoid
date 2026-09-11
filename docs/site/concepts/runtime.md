# 内置 Runtime

**CHARACTOID 把 Agent Harness 的核心抽象做进 Python 进程：Session、Job、Event、Cancel、Resume、Finish。它不是 DeepSeek Harness / Cordis 的包装，也不需要 Node runtime 或额外下载的 Harness 发行包。业务判断仍由 Core、Supervisor 和 Worker 负责；Runtime 只保证每一次对话或恢复请求有统一的生命周期。**

源码入口：

```text
agents/runtime/native.py     NativeAgentLoop（进程内 Job / cancelled Event）
agents/runtime/runner.py     AgentRuntime：把 PersonaAgentService 映射成 Run
agents/runtime/models.py     RunStatus / AgentRun / RuntimeTask / RuntimeStep / StructuredHandoff / RunEvent
app/run_store.py             Run / Task / Step / Event 持久化
agents/cancellation.py       TurnCancel：打断本轮 LLM / HTTP / MCP
agents/assignment.py         角色能力与 MCP allowed_persona_ids（不是 Runtime 内核，但同一请求会碰到）
```

> **事实依据**：以上文件的类与方法签名。下文状态机、禁止字段、Job 上限、取消顺序均直接来自源码，而不是产品文案。

## 为什么要有这一层

没有 Runtime 时，一次 `stream_query` 只是生成器里的若干事件。前端无法稳定地：

- 用 `run_id` 订阅进度；
- 取消正在跑的 RVC 或资源安装；
- 在确认后恢复，而不是重放整句自然语言；
- 区分「还在跑」「等你确认」「已经失败」。

Runtime 把这些收成同一套合同。DeepSeek Harness 用 Session Event Log 做到「模型可见即记录」；CHARACTOID 的对应物是 `AgentRuntime` + `RunStore`：适合展示的摘要会记下来，Prompt、密钥、原始工具载荷不会进入公开事件。

它**不替代** LangGraph checkpointer，也不替代 Worker 自己的任务表。三套状态并存：

| 层 | 存活范围 | 回答什么问题 |
| --- | --- | --- |
| `NativeAgentLoop` Job | 当前进程内存 | 这个生成器还要不要往下吐事件？ |
| `RunStore` 的 `AgentRun` | SQLite / 持久化 | 前端刷新后，上次停在确认还是失败？ |
| LangGraph checkpointer | 图状态，`thread_id = persona_id:conversation_id` | 恢复时图还记不记得 pending handoff？ |

服务重启后，内存 Job 和 `threading.Event` 都没了，必须重新 `begin`。checkpointer 和 RunStore 仍在。

## 分层

```text
HTTP / SSE  (app/routers/agents.py)
    └── AgentRuntime.query / stream_query / resume / stream_resume / cancel
          └── NativeAgentLoop（Job.cancelled）
                └── PersonaAgentService
                      ├── intent / 能力自检
                      ├── persona_supervisor
                      └── Workers + Tools
```

约束（源码注释与调用关系共同保证）：

- Runtime **不识别**业务关键词，不解析用户句子。
- Runtime **不直接**调用 RVC、GPT-SoVITS 或 Milvus。
- Runtime **不替代** Supervisor 的人设和最终回复。
- 领域副作用的取消必须走已注册钩子：`AgentRuntime.register_cancel_handler(run_id, handler)`。钩子里停 RVC session 或资源下载；钩子抛错被吞掉，不能把 Runtime 窗口打崩。

## Session 与 Job

`NativeAgentLoop.session()` 只构造一个 `RuntimeSession` 数据类。真正用来分组的 session 字符串是：

```text
persona_id:conversation_id
```

由 `NativeAgentLoop._session_id(context)` 拼出。

`begin(job_id, session_id)` 创建或复用 `RuntimeJob`。Job 字段：

| 字段 | 类型 | 含义 |
| --- | --- | --- |
| `job_id` | str | 与 Run 的 `run_id` 对齐 |
| `session_id` | str | 角色+会话 |
| `cancelled` | `threading.Event` | 协作式取消 |
| `status` | str | `running` / `cancelled` / `completed` |

`stream_query` / `stream_resume` 每从 `PersonaAgentService` 拿到一个事件，先看 `job.cancelled.is_set()`。一旦取消：

1. `finish(job_id, "cancelled")`
2. yield `{"kind":"cancelled","job_id":...}`
3. return

`query` / `resume` 的同步路径若在调用服务前已经 cancelled，直接返回 `None`。

已结束的 Job 进入 `_finished`（默认上限 128，超出按插入顺序丢掉最旧的）。`get_job()` 能查到已结束 Job，方便 wait/status；`active_jobs()` 只返回仍在 `_jobs` 里的。

## Run 状态机

`agents/runtime/models.py` 的 `RunStatus`：

```text
queued
  → running | failed | cancelled
running
  → waiting_approval | paused | completed | failed | cancelled
waiting_approval
  → running | paused | failed | cancelled
paused
  → running | failed | cancelled
completed / failed / cancelled
  → （终态，只允许写回自身做幂等）
```

`allowed_transition(source, target)`：

- 非法枚举 → `False`
- 同源同目标：仅终态允许（幂等）
- 否则看 `_TRANSITIONS[source]`

`TaskStatus` 与 Run 相同（Phase 1 不另做任务状态机）。`StepStatus` 额外有 `skipped`，表示被跳过、不再执行的步骤。

业务结果映射（`runner.to_agent_result` / `record_result`）：

| AgentTurnResult.status | Runtime |
| --- | --- |
| `completed` | `completed` |
| `failed` | `failed`，带公开 error |
| `degraded` | `failed`（常见于 Provider 不可用；不是单独的 RunStatus） |
| `pending_confirmation` | `waiting_approval` |
| 其它未知 | `failed` |

`record_pending()` 会把结果强制改写成 `pending_confirmation`，再走同一套更新。前端应展示确认卡或补输入，而不是当聊天失败。

## AgentRun 记什么

`AgentRun` 是给前端和 RunStore 的主记录，字段包括：

- 身份：`run_id`、`action`（`chat` / `resume` 或后台 `start_task` 传入的动作名）、`workspace_id`、`persona_id`、`conversation_id`、`thread_id`
- 进度：`active_worker`、`specialist`、`pending_action`、`current_step`、`current_question`、`progress` / `total`、`status_text`
- 结果摘要：`answer`、`worker_results`、`evidence`、`citations`、`uncertainties`、`trace`
- 控制：`requires_approval`、`resume_state`
- 错误：`error_code`、`error_message`
- 时间：`created_at` / `started_at` / `finished_at` / `updated_at`

细合同放在 `result_json`。公开摘要字段与 specialist 的具体载荷分开存，避免把工具原始参数当进度条。

`AgentResult` 是面向 API 的视图：除 Run 摘要外，还可以带 `result_refs`、`waiting_inputs`、`task_id`、`attachment` / `attachments`、`workflow`、以及 RVC/语音会话引用（`rvc_session_id`、`session_id`、`attachment_ids`、`input_refs`）。`as_worker_dict()` 把它收成监督者可消费的字典。

`RuntimeTask` / `RuntimeStep` 是持久化子结构。摘要字段会走 `_sanitize_summary`，避免把路径和密钥写进 SQLite。

## start_run 与 start_task

对话轮次用 `start_run(context, action="chat"|"resume")`：

1. `thread_id` 优先 `service.thread_id(context, "conversation")`，否则 `persona_id:conversation_id`
2. `RunStore.create` → `update_status(RUNNING)` → 追加 `category=agent name=run_started` 事件
3. 把 `job_id=run.run_id` 交给 `NativeAgentLoop`

后台、非对话任务用 `start_task(...)`。源码注释写明：文档转换、模型下载等没有 `PersonaAgentContext`，所以不强制走 `start_run`，但仍创建同一套 `AgentRun` / 事件 / 取消 / 恢复合同。随后 `update_task_progress`、`finish_task`、`fail_task` 更新进度与终态。

不要为「装一个模型」另造一套 status 字符串。

## 结构化交接

`StructuredHandoff` 是 Core → Supervisor → Worker 的最小 JSON 合同，字段包括：

`conversation_id`、`pending_task`、`task_type`、`dispatch_request`、`input_refs`、`selected_options`、`waiting_inputs`、`workflow`、`result_refs`、`dispatch_status`

`_FORBIDDEN_HANDOFF_FIELDS`：

```text
path
command
python
shell
```

校验是递归的：这些名字只要作为**结构键**出现就会 `ValueError: forbidden handoff field`。字符串值里用户谈论「路径」或「命令」是允许的——注释写明不能误伤普通文本。Agent 层之间不能把可执行指令当 JSON 键传来传去。真正的文件处理用 `attachment_id` / `asset_id` 和受管目录。

## 两层取消

取消不是一件事。源码里至少两层，解决不同的阻塞。

### 1. Runtime Job（`NativeAgentLoop.cancel` + `AgentRuntime.cancel`）

`AgentRuntime.cancel(run_id)` 顺序：

1. Run 不存在 → `RuntimeOperationError(RUN_NOT_FOUND)`
2. 已是 `cancelled` → 原样返回（幂等）
3. 已是 `completed` / `failed` → `RUN_TERMINAL`，不能再取消
4. `engine.cancel(run_id)`：给 Job 的 `Event` 置位，流式循环停止转发
5. 若登记了 `_cancel_handlers[run_id]`，调用它（RVC / 资源安装等副作用）
6. `RunStore.update_status(CANCELLED)`

只停生成器不够。长任务的副作用在 Worker / 工具进程里。

### 2. TurnCancel（`agents/cancellation.py`）

LangGraph 和 ChatOpenAI 跑在工作线程。清掉 WebSocket `turn_id` 或掐掉 SSE 消费端，**不会**自动结束那些 HTTP 调用。`TurnCancel` 是 thread-local 信号：

- `set_current_turn_cancel` / `current_turn_cancel`
- `check()` 已取消则抛 `TurnCancelled`
- `http_client()` 登记本轮私有 httpx Client；`abort()` 关闭它们并 `future.cancel()`
- `TurnAwareHttpxClient.send` 把 ChatOpenAI 的请求转到内层 Client。中止本轮时关掉内层，不毒化缓存的共享 Client，也不影响其它对话

`turn_was_cancelled(exc)` 同时认 `TurnCancelled` 异常和当前 Event。

两层要一起理解：Job 取消阻止 Runtime 继续 yield；TurnCancel 把已经打到模型供应商 / MCP 的阻塞 I/O 拔掉。前端「关掉页面」走 disconnect abort，通常先打到 TurnCancel；点任务卡片上的取消走 `POST /api/runs/{id}/cancel`，走 Runtime Job + 领域钩子。

## 恢复

入口是 `resume()` / `stream_resume()`，`action="resume"`，**不是**再发一句「继续」。调用方要带：

- 原上下文（persona / conversation / thread）
- `specialist`，可选 `worker`、`task_id`
- `approved: bool | None`
- `attachment_ids`、`input_values`

Runtime 不会猜测你刚才在等哪个文件。业务层维护引用，Runtime 只保证恢复请求和首次请求走同一套 Job 合同。

## 事件清洗

`RunEvent` 字段：`run_id`、`sequence`、`category`、`name`、`label`、`status`、`duration_ms`、`details`。`details` 经 sanitizer，只留标量摘要：节点名、阶段、数量、耗时、状态、公开错误码。

不应出现在前端事件里：

- 完整 Prompt / 系统提示词
- Token / API Key
- 本机绝对路径
- 原始模型思维或完整工具参数

Worker 要给前端看文件时发 `asset_id` 或受管 URL，不要发盘符路径。`GET /api/runs/{id}/events?after_sequence=` 用来续拉。

## RunStore

`app/run_store.py` 的 `RunStore` 负责：

- `create` / `create_run_with_task` / `create_task` / `create_step`
- `get` / `latest` / `delete`
- `update_status`（走 `allowed_transition`）
- `update_progress`
- `append_event` / `list_events`
- `recover_incomplete_runs`：进程起来后，把没写完的 Run 收成可展示的失败/取消，而不是假装还在跑

Task / Step 与 Run 状态同步由 `_sync_child_statuses_in_session` 处理。不要绕过 Store 直接改 SQLite 行。

## 和角色能力分配的边界

`agents/assignment.py` **不是** Runtime 内核，但同一轮对话会经过它：

- MCP 授权：`allowed_persona_ids`，默认 fail-closed
- `CapabilityPolicy`：按 capability allow/deny，MCP 工具默认拒绝
- 给角色勾选 MCP server 时，`sync_mcp_wildcard_policy` 会打开 `mcp/{server}/*`
- `*` 与具体 persona 覆盖不能共存，避免「撤销后仍 True」或「全局开放后某人仍 False」
- 取消某一个角色且当前是 `*` 时，会展开成「除该角色外的已知角色」，而不是清空整个 ACL；未来新角色仍然 fail-closed，除非再次显式选择 `*`

Runtime 不解释这些策略。策略在进图之前由服务层过滤工具；取消和 Run 状态仍然只看 Job / RunStore。

## CLI 与本地进程

```powershell
.\.venv\Scripts\python.exe -m agents.runtime runtime-status
.\.venv\Scripts\python.exe -B main.py
```

默认应用地址见仓库说明：`http://127.0.0.1:17000/static/index.html`。展示站是另一份前端，不要把两套端口当成同一个 Runtime。

## 相关页面

- [源码地图](./source-map)
- [任务生命周期](/development/lifecycle)
- [事件与状态](/reference/events)
- [数据与边界](./data-boundaries)
- [Agent 与 Worker](/development/agent-worker)
- [Worker 清单](/reference/workers)