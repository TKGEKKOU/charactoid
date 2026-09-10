# 常见问题

**按启动、本机限制、对话任务、知识和语音这条真实链路排查。** 这里写的是源码里会真正返回的状态和错误，不是笼统的“检查网络”。

> **事实依据**：`app/startup/routes.py`、`app/routers/settings.py` 的 `require_local`、`app/routers/runs.py`、`agents/runtime/errors.py`、`agents/confirmation_policy.py`、`app/routers/documents.py`、`app/routers/resources.py`、`app/routers/voice.py`。

## 启动与访问

### 默认地址是什么？

工作台入口是 `http://127.0.0.1:18000`。`GET /` 会 302 到 `/static/index.html`。健康检查：

| 路径 | 作用 |
| --- | --- |
| `GET /api/health` | `{"status":"ok","workspace_id": ...}` |
| `GET /api/status` | 调 `ingestion.status.get_system_status()` 的只读摘要 |
| `GET /api/launcher/progress` | 启动器进度；未注入时返回 `starting: false` 的空壳 |

如果页面打不开，先看终端有没有绑到 18000，再在浏览器直接打 `/api/health`。健康检查失败说明进程没起来，不是前端缓存问题。

### CORS 是 `*`，为什么改设置还是 403？

`configure_middleware` 里 `allow_origins=["*"]`，但写设置、装资源、系统诊断仍走 `require_local`。它同时检查：

1. `request.client.host` 必须是 `127.0.0.1` / `::1` / `localhost` / `testclient`
2. `Host` 头主机名必须是 `127.0.0.1` / `::1` / `localhost`
3. 若带了 `Origin`，协议、主机、端口必须和当前请求一致

所以局域网 IP、反向代理改 Host、或页面 Origin 对不上时，读健康检查可能成功，改 `/api/settings` 仍 403。这是刻意的本机写保护，不是 CORS 配错。

### `/sqlite` 打不开算不算故障？

`mount_static_files` 会尝试挂 Datasette 到 `/sqlite/`。`Datasette` 导入失败时整段 `except Exception: pass`，工作台本身不受影响。不要把 Datasette 当成必装依赖。

## 对话与任务

### 为什么任务停在等待确认？

`agents/confirmation_policy.py` 把能力决策收成三种模式：`direct` / `confirm` / `reject`。

- 角色没授权该能力 → `reject`（`capability_not_allowed`）
- 能力声明需要确认 → `confirm`（`capability_requires_confirmation`）
- 联网补全时本地知识不够 → `confirm`（`local_knowledge_insufficient`）
- 用户明确禁止 web → `reject`（`web_explicitly_denied`）

前端看到的等待卡片对应 run 的审批态。恢复接口是：

- `POST /api/runs/{run_id}/approval`，body `{ "approved": true|false }`
- 不在等待审批 → `invalid_approval`（409）
- run 不存在 → `run_not_found`（404）

不确定时点拒绝或 `POST /api/runs/{run_id}/cancel`。取消不会悄悄改本地文件；真正写文件的 Worker 必须先过确认。

### 失败后该重试还是重开？

先看 `RuntimeErrorCode`，不要只看中文句子：

| code | 公开展示 | 建议 |
| --- | --- | --- |
| `provider_unavailable` | 模型服务暂时不可用 | 同一条对话重试 |
| `worker_timeout` | 能力模块处理超时 | 查对应 Worker 超时；RVC 默认 1800s |
| `worker_failed` | 能力模块处理失败 | 看 artifacts / error，修正输入再试 |
| `capability_denied` | 当前角色没有权限 | 去角色能力页授权，不要重发同一句 |
| `confirmation_denied` | 操作未获确认 | 这是拒绝，不是崩溃 |
| `checkpoint_unavailable` | 恢复状态不可用 | 需要重新发起，不能 resume |
| `runtime_restarted` | 服务重启后未完成运行已结束 | 重新发起 |
| `run_terminal` | 运行已经结束 | 不要再 approval/cancel |

事件流：`GET /api/runs/{id}/events?after_sequence=`。细节经过 `observability.sanitize_details`，**不会**把 prompt、密钥、本地路径原样推到前端。

### 对话发出去没有回复？

对话走 `POST /api/personas/{id}/agent/stream`（SSE：stage / token / result / done），同步兜底是 `/agent/query`。等待确认后继续是 `/agent/stream-resume` 或 `/agent/resume`。

常见原因：

1. LLM 未配置或探测失败（设置页 `probe_llm`）
2. `Persona not found`（404）——角色不在 `LOCAL_WORKSPACE_ID`
3. 浏览器断开：`_watch_request_disconnect` 会中止这条 `persona_id:conversation_id` 的实时执行
4. 变声/训练类事件会被改写成 `upload_request`，看起来像“没回答”，其实在等材料

## 知识与文档

### 上传了为什么检索不到？

上传入口是 `POST /api/knowledge-spaces/{space_id}/documents/upload`，不是直接进向量库。之后：

1. 转换任务变成 `DocumentJob`
2. `POST /api/documents/{job_id}/confirm` 才索引
3. `POST /api/documents/{job_id}/retry-index` 在失败后重试
4. 空间报告：`GET /api/knowledge-spaces/{space_id}/documents/report`

检索走当前角色的知识空间。换了 embedding 模型或维度，旧 collection 不能直接复用。知识 Worker 超时默认 45s，文档 Worker 120s。

### 角色列表里看不到这份文档？

`GET /api/personas/{id}/documents` 只列这个角色知识空间里的 job。文档不属于“全局上传箱”。

## 资源与语音

### 资源卡片一直未就绪？

`GET /api/resources` 与兼容前缀 `/api/providers/resources` 都要 `require_local`。安装是 `POST /{provider_id}/install`（202），状态 `GET /{provider_id}/status`，取消 `DELETE /{provider_id}/install/cancel`。任务队列在 `/api/resources/tasks`。

GPT-SoVITS 有单独的“已安装但未写入配置”状态，`next_action` 会是 `check` 而不是 `install`。目录在、服务没起来时是 `start_service`。不要把这三种当成同一种红灯。

### 语音相关 413 / 422 / 502 / 503？

`POST /api/voice/transcriptions`：

- 必须 `multipart/form-data` 字段 `file`
- 必须头 `X-CHARACTOID-Request: web`
- 上限 `10MB + 64KB`
- ASR 未配置 → 503
- 上游失败 → 502
- 空结果 → 422

对话里“用这个角色的声音说话”走绑定音色 + TTS，**不走 RVC**。RVC 是 `/api/voice/rvc` 的文件型长任务。

## 下一步

仍然卡住时，记下：任务 `run_id`、失败 `code`、资源 `provider_id`、终端里 `/api/health` 的结果，再看 [任务、文件与连接排查](/troubleshooting/tasks-connections) 和 [资源安装与模型](/troubleshooting/resources)。
