# 事件与状态

**一次 Agent 运行是有身份的对象。** 它有 `run_id`、状态、事件序列、可选审批和取消。前端不应当只拿最终一句文本；长任务、确认和失败都靠这条时间线对齐。

> **事实依据**：`app/routers/runs.py`、`app/run_store.py`、`agents/runtime/events.py`、`agents/observability.py`、`agents/runtime/errors.py`、`agents/runtime/approvals.py`。

## HTTP

前缀 `/api/runs`，标签 `agent-runtime`。

| 方法 | 路径 | 成功形状 | 失败 |
| --- | --- | --- | --- |
| GET | `/{run_id}` | `{"run": {...}}` | 404 `run_not_found` |
| GET | `/{run_id}/events?after_sequence=0` | `{"run_id","events":[...]}` | 404 |
| POST | `/{run_id}/cancel` | `{"run": {...}}` | 404 或 409 |
| POST | `/{run_id}/approval` | `{"run": {...}, "approved": bool}` | 404 或 409 |

`after_sequence` 用来做增量拉取：已经渲染到序号 12 时，下次带 `after_sequence=12`。事件对象来自 store 的 `model_dump(mode="json")`。

取消和审批走 `request.app.state.agent_runtime`。状态不允许时抛 `RuntimeOperationError`，HTTP 映射：

- `RUN_NOT_FOUND` → 404
- 其它冲突 → 409

错误体统一为：

```json
{ "error": { "code": "run_not_found", "message": "对外安全文案" } }
```

`message` 经过 `public_error_message`，不会回放内部异常。

审批 payload 是 `RunApprovalPayload`，字段 `approved: bool`。真正决策在 `ApprovalService.decide(run_id, approved)`。

## 事件清洗

`agents/runtime/events.py` 只有一件事：把 `sanitize_event_details` 指到 `agents.observability.sanitize_details`。

`sanitize_details` **不是**模糊脱敏。它是白名单：

```text
worker, tool, source, count, candidate_count, result_count,
ok, reason, error_code, status, previous_status, route,
query_rewritten, corrected, refused,
document_job_id, session_id, source_kind, operation, phase,
task_id, step_id, step_key
```

并且值必须是 `None` 或 `str/int/float/bool`。因此：

- Prompt、用户原话、工具参数、密钥、绝对路径**不会**出现在公开事件里；
- 你可以安全把事件流给 UI 时间线；
- 调试内部内容要看服务端日志，不要指望 events API 给你完整 prompt。

`RunRecorder`（`agents/observability.py`）明确写了：它是请求内遥测，**不写入 LangGraph，也不写入数据库**。持久化的是 `RunStore` 里的 run 与其事件副本，两者不要混为一谈。

## 建议的前端状态机

```text
创建对话请求
  → 拿到 run_id（或 stream 中的等价标识）
  → 轮询 GET /runs/{id} 与 GET /runs/{id}/events?after_sequence=
  → 若 requires_approval / 等待确认：展示卡片，用户决定后 POST /approval
  → 若用户放弃：POST /cancel
  → 结束态：把 artifacts 里的 asset_id / attachment_id 交给对应资源 API 去播放或下载
```

不要用“页面还在转圈”当唯一状态。刷新后应能用同一个 `run_id` 把时间线补齐——这是可恢复的含义。

## 和 Worker 输出合同的关系

Worker 返回的 `requires_approval` 为真时，监督者不应该假装已经改了世界。对应的 UI 是确认卡，对应的 HTTP 是 `/approval`。

Worker 的 `trace`、`uncertainties`、`citations` 是给监督者的结构化材料。公开事件只保留白名单字段，所以 UI 上的“检索了 8 条”可以来自 `count` / `result_count`，但不会带出检索 query 原文。

## 常见误判

| 现象 | 不是 | 而是 |
| --- | --- | --- |
| 事件数组为空 | 系统没跑 | 你的 `after_sequence` 已经到最新，或 run 刚创建 |
| 403/空 details | 坏了 | 清洗掉了 prompt |
| 409 cancel | 取消接口坏了 | run 已经结束或不允许该迁移 |
| 刷新后进度消失 | 没持久化 | 前端没保存 run_id，或打错了 ID |

下一步：[Worker 清单](/reference/workers)、[任务生命周期](/concepts/lifecycle)、[问题排查：任务、文件与连接](/troubleshooting/tasks-connections)。


## ApprovalService

`agents/runtime/approvals.py`：`ApprovalService` 只负责审批状态，真正的 LangGraph resume 仍走对话入口。

`decide(run_id, approved)`：

1. `run_store.get(run_id)` 为空 → `RUN_NOT_FOUND`（HTTP 404）；
2. `run.status is not WAITING_APPROVAL` → `INVALID_APPROVAL`（HTTP 409）；
3. `approved=false` → **`runtime.cancel(run_id)`**。没有独立的 reject 状态；
4. `approved=true` → `update_status(RUNNING)`，`append_event`：
   - `category="approval"`
   - `name="approval_granted"`
   - `label="已批准，等待继续处理"`
   - `status="completed"`

前端在收到批准事件后仍应 `stream-resume` / `resume`。只把 Run 标成 running 不会自动续跑图。

HTTP `POST /api/runs/{id}/approval` 的 body 是 `RunApprovalPayload.approved: bool`。非法转换统一 409，错误信封 `{"error":{"code","message"}}`。

## RunStore 合同

`app/run_store.py` 是公开运行态的 SQLite 持久化层，不是 LangGraph checkpointer。`RunRecorder` 仍是请求内遥测，两者不要混用。

### `AgentRun` 落库字段

来源 `agents/runtime/models.py`。一次 run 至少带：

| 字段 | 含义 |
| --- | --- |
| `run_id` | UUID，主键 |
| `action` | 默认 `chat` |
| `status` | `RunStatus` |
| `workspace_id` / `persona_id` / `conversation_id` / `thread_id` | 域定位 |
| `active_worker` / `specialist` | 当前交接对象 |
| `pending_action` | 等待用户决策的动作摘要 |
| `current_step` / `current_question` / `progress` / `total` / `status_text` | 可恢复进度 |
| `resume_state` | 恢复所需状态；写入前走 `sanitize_event_details` |
| `answer` / `worker_results` / `evidence` / `citations` / `uncertainties` / `trace` | 监督者可展示材料 |
| `requires_approval` | 是否卡在确认 |
| `error_code` / `error_message` / `result_json` | 失败与结果信封 |
| `created_at` / `started_at` / `finished_at` / `updated_at` | UTC |

`progress`、`total` 的下限是 0。`RunEvent.sequence` 的下限是 1。`details` 在模型校验时就会白名单清洗，不是写入后再补洗。

### `update_status`

- 非法 `status` 字符串 → `INVALID_REQUEST`。
- 未知字段 → `INVALID_REQUEST`（`unknown run fields`）。允许写入的键是白名单：`action`、域 ID、`active_worker`、`specialist`、`pending_action`、`answer`、`worker_results`、`evidence`、`citations`、`uncertainties`、`trace`、进度字段、`resume_state`、`requires_approval`、错误字段、`result_json`。
- 找不到 run → `RUN_NOT_FOUND`。
- 终态（`completed` / `failed` / `cancelled`）写回同一终态：幂等，直接返回现记录。
- 其它非法迁移 → `INVALID_TRANSITION`。合法边在 `allowed_transition()`：

```text
queued            → running, failed, cancelled
running           → waiting_approval, paused, completed, failed, cancelled
waiting_approval  → running, paused, failed, cancelled
paused            → running, failed, cancelled
completed/failed/cancelled → 无出边（仅允许写回自身）
```

### 事件增量

`list_events(run_id, after_sequence=0)` 的过滤是 `sequence > max(0, int(after_sequence))`，按 sequence 升序。已经渲染到 12 时下次传 `12`，不会重复拿到 12。

`append_event` 与 `create_in_session` 走同一 session 边界。需要原子地露出“正在跑的 run + 第一个 task/step + 可选首事件”时，用 `create_run_with_task(run, task, step, event=None)`：

- `task.run_id` 必须等于 `run.run_id`
- `step.task_id` 必须等于 `task.task_id`
- 若带 event，`event.run_id` 必须等于 `run.run_id`
- 任一不符 → `INVALID_REQUEST`

这是新托管任务的窄创建口。旧的单记录 `create` / `create_task` / `create_step` 仍可用，但不要先把 running run 暴露给 UI 再补 child。

### 进程重启

`recover_incomplete_runs()` **只**把 `queued` / `running` 收口为 `failed`，错误码 `runtime_restarted`，`requires_approval=false`，并把 `error` 写进 `result_json`。

`waiting_approval` 和 `paused` **必须保留**：它们代表用户还可以继续处理的持久化状态，不是当前进程独占的执行态。重启后不要把确认卡或暂停任务当成崩溃。

`latest(action=, workspace_id=, persona_id=, statuses=)` 按 `created_at desc, run_id desc` 取一条，可选收窄域和状态集合。

下一步仍是：[Worker 清单](/reference/workers)、[任务生命周期](/concepts/lifecycle)、[问题排查：任务、文件与连接](/troubleshooting/tasks-connections)。
