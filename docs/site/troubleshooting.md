# 排查总则

**先分清是进程、本机守卫、角色授权、Run 状态，还是外部模型。** 四者混在一条“打不开”里会永远在重装。

> **事实依据**：`app/startup/routes.py`、`app/main.py`、`app/routers/settings.py`、`app/routers/runs.py`、`app/routers/system.py`、`app/routers/agents.py`、`app/routers/personas.py`、`agents/runtime/errors.py`、`agents/confirmation_policy.py`、`agents/checkpoint.py`、`agents/registry.py`、`ingestion.status.get_system_status`。

CHARACTOID 的故障表面经常长得很像：空白页、转圈、角色不说话、设置保存失败、资源红灯。它们很少是同一个根因。排查时只问一件事：**这一层的合同有没有被满足。** 合同满足了再往下一层。

默认进程入口是 `main.py` → `app.main.create_app()`。浏览器工作台在 `http://127.0.0.1:18000/static/index.html`。`GET /` 会 302 到这个地址。健康检查、系统状态、启动器进度是直接挂在 app 上的，不属于某个业务 router。

## 建议顺序

1. `GET /api/health` —— 进程活着吗。正常返回 `{"status":"ok","workspace_id":...}`。
2. 浏览器是不是 `http://127.0.0.1:18000` —— Host 和 Origin 会决定 `require_local`。
3. `GET /api/status` 或 `GET /api/system/diagnostics` —— 本机诊断；后者也走 `require_local`。
4. 角色是否存在且属于 `LOCAL_WORKSPACE_ID`。不在本地工作区时，对话接口一律 `Persona not found`。
5. 该角色 `GET /api/personas/{id}/capabilities` 是否允许你正在用的能力。
6. 若已有 `run_id`，看 `GET /api/runs/{id}` 和 `GET /api/runs/{id}/events?after_sequence=`。
7. 资源 `GET /api/resources/{provider_id}/status`（兼容前缀还有 `/api/providers/resources`）。
8. 最后才看模型本身是否胡说。模型胡话不会产生 `RuntimeErrorCode`。

不要从第 8 步开始。也不要在没有 `run_id` 时说“任务失败”。

## 把现象映射到层

| 现象 | 先看 | 不是 |
| --- | --- | --- |
| 整页空白、health 失败 | 进程 / 端口 18000 | 角色人设 |
| 设置保存 403 | `require_local`：client host + Host + Origin | CORS `allow_origins=["*"]` |
| 对话 404 Persona not found | 角色 id / `workspace_id` | Worker 超时 |
| 停在确认 | `confirmation_policy` 的 direct/confirm/reject | 模型死了 |
| 有 run 但没有 token | SSE 断开 / 等审批 / 事件清洗 | 前端没渲染 |
| 检索为空 | 文档未 confirm / embedding 维度 / 知识空间 | 资源图标红了 |
| 不会说话 | TTS 绑定 / `voice_worker` 300s | RVC session |
| 变声没完 | `rvc_worker` 默认 1800s | 普通对话 |
| MCP 503 | `app.state.mcp_manager` 尚未就绪 | 角色人设写错 |
| 重启后旧任务没了 | `RUNTIME_RESTARTED` | checkpoint 丢了（那是另一个码） |

## 本机守卫

`require_local` 在 `app/routers/settings.py`：

- 客户端地址必须 ∈ `{127.0.0.1, ::1, localhost, testclient}`
- 请求 Host 必须 ∈ `{127.0.0.1, ::1, localhost}`（**没有** `testclient`）
- 若带 Origin，则 scheme、host、port 必须与当前请求一致，且 Origin host 仍在本机集合里

CORS 中间件是 `allow_origins=["*"]`、`allow_credentials=False`。这只解决浏览器跨域预检，**不**等于可以改本机设置。展示站或局域网 IP 打开工作台时，对话只读页面可能还能看，写入设置、装资源、Docker、关机都会 403。

用 `127.0.0.0`、`0.0.0.0`、机器局域网 IP、或 `localhost` 配错端口，都会踩这条。403 文案是 `Local settings are available on localhost only`。

## 公开展示的错误

`RuntimeErrorCode` 是给本地 UI 用的稳定枚举，定义在 `agents/runtime/errors.py`。`public_error_message()` 把内部细节换成不泄实现的中文。API 层 `RuntimeOperationError` 转成：

```json
{"error":{"code":"run_not_found","message":"运行记录不存在。"}}
```

Run 路由里：找不到 404，其余非法转换 409。UI 应消费 `error.code`，文案用 `public_error_message`。不要把 Python traceback 贴进角色气泡。

完整码表：

| code | 公开文案 |
| --- | --- |
| `run_not_found` | 运行记录不存在。 |
| `invalid_transition` | 运行状态不能执行此转换。 |
| `invalid_approval` | 当前运行不在等待审批状态。 |
| `approval_required` | 此操作需要先完成审批。 |
| `run_terminal` | 运行已经结束，不能再执行此操作。 |
| `run_cancelled` | 运行已取消。 |
| `runtime_failure` / `runtime_failed` | 运行处理失败，请稍后重试。 |
| `storage_error` | 运行记录暂时不可用。 |
| `invalid_request` | 请求参数无效。 |
| `confirmation_denied` | 操作未获确认。 |
| `capability_denied` | 当前角色没有执行此操作的权限。 |
| `contract_invalid` | 运行结果格式无效。 |
| `provider_unavailable` | 模型服务暂时不可用，请稍后重试。 |
| `worker_timeout` | 能力模块处理超时，请稍后重试。 |
| `worker_failed` | 能力模块处理失败，请稍后重试。 |
| `checkpoint_unavailable` | 运行恢复状态暂时不可用。 |
| `runtime_restarted` | 服务重启后，未完成的运行已安全结束，请重新发起。 |

未知 code 会落到 `运行时操作失败。` 不要在文档或 UI 里发明第四套文案。

## 确认不是下一句聊天

`agents/confirmation_policy.py` 是纯函数，不读网络、不写库：

- `decide_capability`：未授权 → `reject` / `capability_not_allowed`；需要确认 → `confirm` / `capability_requires_confirmation`；否则 `direct`
- `decide_web_fallback`：用户明确否定 web → `reject`；已授权（显式要 web 或需要新鲜外部事实）→ `direct`；本地知识不足 → `confirm` / `local_knowledge_insufficient`

继续一条等待中的任务：

- `POST /api/runs/{id}/approval` `{ "approved": true }` 然后走 `/agent/stream-resume` 或 `/agent/resume`
- `approved: false` → `confirmation_denied`
- `POST /api/runs/{id}/cancel` 取消

不要在输入框再发“你继续吧”。那是新问题，会开新的执行键占用，也可能再 persist 一条用户消息。Resume **不会**再 persist 用户句。

## SSE 与执行键

对话主路径是 `POST /api/personas/{persona_id}/agent/stream`。内部顺序：

1. 装配角色上下文
2. `try_persist_text_message` 写入用户句
3. 执行键 `{persona_id}:{conversation_id}`
4. 流式产出 `stage / token / result / done`
5. 监听 `request.is_disconnected()`，断开就 abort

有 run 但页面上没有 token，优先怀疑：连接被浏览器取消、等审批、事件被清洗掉了敏感字段。不要先重装模型。

## 重启、checkpoint 和“任务丢了”

进程内 run store 不跨进程。服务起来后，未完成 run 被安全结束，对外是 `RUNTIME_RESTARTED`，需要重新发起。

LangGraph checkpoint 在 SQLite：`agents/checkpoint.py` 的 `create_sqlite_checkpointer` 使用 `settings.sqlite_path`，`check_same_thread=False`。删除角色时 `delete_persona_checkpoints` 按 `thread_id LIKE "{persona_id}%"` 清 `writes` 和 `checkpoints` 两张表。

checkpoint 不可用是另一个码：`CHECKPOINT_UNAVAILABLE`。不要把“重启后旧 run 没了”和“恢复状态读失败”写成同一件事。

## Worker 超时不要当成卡死

来自 `agents/registry.py` 的 `_WORKER_EXECUTION_DEFAULTS`：

| Worker | 超时 | 重试 |
| --- | ---: | --- |
| knowledge_worker | 45s | 2 次，backoff 0.5s |
| memory_worker | 30s | 1 次 |
| document_worker | 120s | 2 次，backoff 1.0s |
| profile_worker | 30s | 1 次 |
| voice_worker | 300s | 1 次 |
| rvc_worker | 1800s | 1 次 |
| live2d_worker | 45s | 1 次 |
| config_worker | 45s | 1 次 |

RVC 跑十几分钟是合同内行为。Voice Studio / GPT-SoVITS 走 `voice_worker` 的 300s 量级。知识检索 45s 内没合同输出，才是 `worker_timeout`。

Worker 输出必须带齐：`worker, status, answer, evidence, artifacts, uncertainties, citations, trace, requires_approval, error`。缺字段是 `CONTRACT_INVALID`，不会把半截 JSON 渲染成角色台词。

## 系统诊断能开哪些目录

`POST /api/system/open-directory/{location}` 只接受白名单：`project` / `data` / `runtime` / `models` / `sqlite` / `milvus`。未知 location 404 `未知的诊断目录`。这不是任意路径打开器。

Docker：`GET/PUT /api/system/docker-settings`，`on_exit` ∈ `{keep, pause, remove}`，非法值回落到 `pause`。`POST /api/system/docker/pause|remove` 和 `POST /api/system/shutdown` 都走 `require_local`。

## 文档没进知识库

上传是 `POST /api/knowledge-spaces/{space_id}/documents/upload`，201，至少一个文件。空间不在本地 → 404 `Knowledge space not found`。转换 job 不在本地工作区 → 404 `Document job not found`。

真正可检索要 `POST /api/documents/{job_id}/confirm`。没 confirm 就提问，角色说“没有”是正确行为，不是 embedding 坏了。

## 日志够用的最小集合

- `run_id`
- `persona_id` / `conversation_id`
- `error.code`
- 资源 `provider_id` 与 `next_action`
- `GET /api/health` 和 `GET /api/system/diagnostics` 的时间点
- 若是文档：`job_id`、`knowledge_space_id`、job `status`

有这些再去看终端。终端里的 traceback 给开发者，不给角色气泡。

## 子页

- [常见问题](/troubleshooting/qa)
- [任务、文件与连接](/troubleshooting/tasks-connections)
- [资源安装与模型](/troubleshooting/resources)
