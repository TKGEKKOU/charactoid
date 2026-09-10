# 内置 Runtime

**CHARACTOID 把 Agent Harness 的核心抽象做进 Python 进程：Session、Job、Event、Cancel、Resume、Finish。它不是 DeepSeek Harness / Cordis 的包装，也不需要 Node runtime 或额外下载的 Harness 发行包。业务判断仍由 Core、Supervisor 和 Worker 负责；Runtime 只保证每一次对话或恢复请求有统一的生命周期。**

源码入口：

```text
agents/runtime/native.py     NativeAgentLoop（内存中的 Job）
agents/runtime/runner.py     把 PersonaAgentService 映射成 Run
agents/runtime/models.py     Run / Task / Step / Event / Handoff
app/run_store.py             持久化
agents/cancellation.py       领域取消钩子
```

## 为什么要有这一层

没有 Runtime 时，一次 `stream_query` 只是生成器里的若干事件。前端无法稳定地：

- 用 `run_id` 订阅进度；
- 取消正在跑的 RVC 或资源安装；
- 在确认后恢复，而不是重放整句自然语言；
- 区分“还在跑”“等你确认”“已经失败”。

Runtime 把这些收成同一套合同。DeepSeek Harness 用 Session Event Log 做到“模型可见即记录”；CHARACTOID 的对应物是 `RunRecorder` + `RunStore`：适合展示的摘要会记下来，Prompt、密钥、原始工具载荷不会进入公开事件。

## 分层

```text
HTTP / WebSocket
    └── AgentRuntime / runner
          └── NativeAgentLoop
                └── PersonaAgentService
                      ├── intent / 能力自检
                      ├── persona_supervisor
                      └── Workers + Tools
```

约束：

- Runtime **不识别**业务关键词。
- Runtime **不直接**调用 RVC、GPT-SoVITS 或 Milvus。
- Runtime **不替代** Supervisor 的人设和最终回复。
- 领域副作用的取消必须走已注册钩子，例如停掉 RVC session 或资源下载。

## Session 与 Job

`NativeAgentLoop.session()` 只是给一次角色对话一个 `session_id`。实际代码用：

```text
persona_id:conversation_id
```

`begin(job_id, session_id)` 创建或复用 `RuntimeJob`。Job 带 `threading.Event cancelled`。`stream_query` / `stream_resume` 每产出一个事件都检查这个 Event；一旦取消，生成器会先吐 `{"kind":"cancelled","job_id":...}` 再结束。

已结束的 Job 会进入有上限的 `_finished` 字典（默认 128），方便状态查询，但 `active_jobs()` 只返回仍在跑的 Job。

## Run 状态机

`agents/runtime/models.py` 里的 `RunStatus`：

```text
queued
  → running
      → waiting_approval
      → paused
      → completed
      → failed
      → cancelled
```

合法转换由 `allowed_transition()` 约束。终态到自身允许，用于幂等更新；终态到其他状态不允许。

对应业务结果：

| AgentTurnResult.status | Runtime 结果 |
| --- | --- |
| `completed` | 完成 |
| `failed` | 失败，带公开 error |
| `degraded` | 降级，常见于 Provider 不可用 |
| `pending_confirmation` / `waiting_input` | `waiting_approval`，前端应展示确认或补输入 |

## 结构化交接

`StructuredHandoff` 是 Core → Supervisor → Worker 的最小 JSON 合同。它只保存：

- `conversation_id`
- `pending_task` / `task_id` / `task_type`
- 输入引用、已选选项、等待输入
- 工作流摘要、结果引用、dispatch 状态

它故意禁止这些**字段名**：

```text
path
command
python
shell
```

用户可以在句子里谈论“路径”或“命令”。Agent 层之间不能把它们当成可执行字段传来传去。真正的文件处理由附件引用和受管目录完成。

## 取消

`AgentRuntime.cancel(run_id)` 的顺序是：

1. 标记 Job cancelled，停止继续转发事件；
2. 调用 `agents/cancellation.py` 里登记的领域钩子；
3. 钩子去取消 RVC 任务、资源安装或其它后台进程；
4. Run 记为 `cancelled`。

只停生成器不够。长任务的副作用在 Worker / 工具进程里，必须有对应钩子。

## 恢复

恢复入口是 `resume()` / `stream_resume()`，不是再发一句“继续”。调用方要带上：

- 原 `run_id` 或等价上下文；
- Worker / specialist；
- `approved` 或用户补充的 `input_values`；
- 原有 `attachment_id`、session、已选选项。

Runtime 不会猜测你刚才在等哪个文件。业务层维护这些引用，Runtime 只保证恢复请求和首次请求走同一套 Job 合同。

## 事件清洗

`sanitize_event_details()` 只保留标量摘要：节点名、阶段、数量、耗时、状态、公开错误码。下面这些不应出现在前端事件里：

- 完整 Prompt / 系统提示词
- Token / API Key
- 本机绝对路径
- 原始模型思维或完整工具参数

如果某个 Worker 需要给前端看文件，应发 `asset_id` 或可下载的受管 URL，而不是盘符路径。

## 和 LangGraph checkpointer 的关系

Runtime Job 是进程内的执行控制。LangGraph checkpointer 是图状态的持久化，thread_id 通常是 `persona_id:conversation_id`。两者互补：

- 服务重启后，checkpointer 能恢复图状态；
- RunStore 能告诉前端上次停在确认还是失败；
- 新的 Job 仍然要重新 `begin`，因为内存中的 cancelled Event 不会跨进程存在。

## CLI

```powershell
.\ .venv\Scripts\python.exe -m agents.runtime runtime-status
```

日常开发仍用：

```powershell
.\ .venv\Scripts\python.exe -B main.py
```

## 相关页面

- [源码地图](./source-map)
- [任务生命周期](/development/lifecycle)
- [事件与状态](/reference/events)
- [数据与边界](./data-boundaries)
