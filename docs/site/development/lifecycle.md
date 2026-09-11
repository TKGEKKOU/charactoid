# 任务生命周期

**一次用户请求会同时碰到三套时钟：LangGraph 节点、Runtime Job、领域后台任务。文档和 UI 必须能解释“现在停在哪”，不能把等待输入显示成完成。**

源码：`agents/runtime/models.py`、`agents/runtime/runner.py`、`agents/runtime/native.py`、`app/run_store.py`、`agents/cancellation.py`。

## 三套时钟

| 时钟 | 粒度 | 存活范围 |
| --- | --- | --- |
| LangGraph | 节点、handoff、interrupt、checkpointer | `persona_id:conversation_id` 线程 |
| Runtime Job | 一次 query/resume 生成器 | 进程内存，取消靠 Event |
| RunStore | Run / Task / Step / Event | SQLite，给前端和排障 |

Job 取消不会自动删除已经写出的音频文件；领域钩子负责停后台进程。Run 记录仍应落到 `cancelled`。

## Run 状态

权威枚举是 `RunStatus`，不是随手画的 retrying。

```text
queued
  → running
      → waiting_approval
      → paused
      → completed | failed | cancelled
```

`allowed_transition()` 禁止终态再转到其他状态；终态写自身用于幂等。

| 状态 | 用户应看到 |
| --- | --- |
| `queued` / `running` | 阶段、Worker、进度，而不是无限“处理中” |
| `waiting_approval` | 确认按钮、缺的文件、可选项 |
| `paused` | 可继续，不是失败 |
| `completed` | 回复 + 资产引用 |
| `failed` | 公开错误码、阶段、下一步 |
| `cancelled` | 已停止；再执行要新 Run 或按接口恢复 |

`runner.py` 把 `pending_confirmation` / `waiting_input` 映射为等待批准；`degraded` 表示 Provider 等问题下的降级，不是静默成功。

## 事件

事件是 Runtime、前端、外部渠道的稳定边界。清洗后只留摘要。完整字段见 [事件与状态](/reference/events)。

```json
{
  "type": "worker.progress",
  "run_id": "run_01",
  "worker": "rvc_worker",
  "data": {"stage": "separate", "percent": 42}
}
```

规则：

- 按 `run_id` 更新对应卡片，不要整页刷新
- 重复事件必须可安全应用
- 未知事件保留原数据，不能把页面打崩
- 文件用 `asset_id`，不用盘符路径

## 恢复

正确做法：带原 Run / checkpoint、Worker、`approved` 或补充输入，走 `resume` / `stream_resume`。

错误做法：把同一句话再发一遍；前端本地假装已确认；恢复时悄悄改掉 `attachment_id`。

完成后的重复确认不能再次转换音频或再次写入记忆。取消是终态。

## 取消顺序

1. `NativeAgentLoop.cancel(job_id)` 置位
2. 流式生成器停止转发
3. `agents/cancellation.py` 调领域钩子（RVC session、资源下载等）
4. RunStore 记 `cancelled`

## 检查点

LangGraph checkpointer 让服务重启后图状态可续。它不替代 RunStore。重连后应查询 Run，不能只靠 WebSocket 最后一帧。

## 前端原则

- 显示 Worker 名、阶段、进度、错误、下一步
- 等待输入和失败是不同 UI
- 资产卡片绑定 `asset_id`
- 长任务（RVC 1800s、voice 300s）要能取消

## 相关页面

- [内置 Runtime](/concepts/runtime)
- [事件与状态](/reference/events)
- [文件与任务](/capabilities/files-runtime)


## HTTP 与进程边界

Run 的对外合同在 `app/routers/runs.py`：

| 方法 | 路径 | 找不到 | 非法转换 |
| --- | --- | --- | --- |
| GET | `/api/runs/{run_id}` | 404 `run_not_found` | — |
| GET | `/api/runs/{run_id}/events?after_sequence=` | 404 | — |
| POST | `/api/runs/{run_id}/cancel` | 404 | 409 |
| POST | `/api/runs/{run_id}/approval` | 404 | 409 |

错误信封永远是 `{"error":{"code","message"}}`，文案来自 `public_error_message`。`_status_for_error` 只把 `run_not_found` 映射成 404，其余 `RuntimeOperationError` 走 409。

对话入口在 `/api/personas/{id}/agent/{stream,query,stream-resume,resume}`。执行键是 `persona_id:conversation_id`。浏览器断开 SSE 会 abort **当前 Job**，不自动把 Run 标成用户已读的成功。

## 重启

进程内 Job 和 run store 不跨进程。服务起来后未完成 run 被安全结束，对外 `RUNTIME_RESTARTED`，公开文案要求重新发起。这和 `CHECKPOINT_UNAVAILABLE` 不同：后者是图状态读失败。

`agents/checkpoint.py` 把 LangGraph `SqliteSaver` 建在 `settings.sqlite_path`。删除角色时 `delete_persona_checkpoints` 按 `thread_id LIKE` 与 `prefix = f"{persona_id}:%"`（**带冒号**）清 `writes` 和 `checkpoints`。写成 `"{persona_id}%"` 会误伤其它以同一 id 字符串开头、但不是该角色会话线程的记录。不要在产品文案里说“删角色会立刻清掉 Milvus 里所有切片”——那是另一条删除路径。

## 确认决策从哪来

Run 进入 `waiting_approval` 之前，监督者已经用纯函数做了决定：`decide_capability` / `decide_web_fallback`。前端不能自己把按钮画成“已批准”。批准之后走 resume，而不是再 persist 一句用户话。


## ApprovalService 实际做什么

`agents/runtime/approvals.py` 的 `ApprovalService.decide(run_id, approved)` 只处理审批态，不负责把 LangGraph 接着跑完。resume 仍走对话入口 `stream-resume` / `resume`。

规则：

| 条件 | 结果 |
| --- | --- |
| run 不存在 | `RuntimeOperationError(RUN_NOT_FOUND)`，HTTP 404 |
| 当前状态不是 `WAITING_APPROVAL` | `INVALID_APPROVAL`，HTTP 409 |
| `approved=false` | **调用 `runtime.cancel(run_id)`**，没有单独的 reject 状态 |
| `approved=true` | 状态改为 `RUNNING`，追加事件 `approval_granted`，label 为 `已批准，等待继续处理` |

不要在文档或 UI 里发明 `rejected` / `denied` 作为 RunStatus。拒绝批准就是取消。

## checkpoint 前缀

`agents/checkpoint.py`：

- LangGraph `SqliteSaver` 建在 `settings.sqlite_path`；
- `delete_persona_checkpoints(settings, persona_id)` 连接同一 SQLite，对表 `writes` 和 `checkpoints` 执行 `DELETE ... WHERE thread_id LIKE ?`，绑定值是 `f"{persona_id}:%"`。

执行键和线程 id 的形状是 `persona_id:conversation_id`。冒号是分隔符，删除角色时必须带上，否则前缀匹配会过宽。

## 确认决策从哪来（纯函数）

`agents/confirmation_policy.py` 不读数据库：

`decide_capability`：

- 不允许 → `reject` / `capability_not_allowed`
- 允许但要确认 → `confirm` / `capability_requires_confirmation`
- 允许且直接执行 → `direct` / `capability_allowed`

`decide_web_fallback`：

- `web` 在 `intent.negated` → `reject` / `web_explicitly_denied`
- `web_authorized` → `direct`（原因 `explicit_web_request` 或 `fresh_external_fact`）
- 否则 → `confirm` / `local_knowledge_insufficient`

Run 进入 `waiting_approval` 之前，监督者已经用这些函数做了决定。前端不能自己把按钮画成“已批准”。批准之后走 resume，而不是再 persist 一句用户话。

## 源码合同（中档补全）

实现生命周期时不要发明新状态名。公开状态以 `agents.runtime.models.RunStatus` 和事件名为准。`waiting_approval` → 批准后 `RUNNING` 并写 `approval_granted`；拒绝则 `runtime.cancel`。Worker 超时必须与 Manifest 一致，否则前端进度条和实际 abort 会对不上。RVC 的 1800 秒是硬边界，测试不要用 30 秒假超时冒充成功路径。
