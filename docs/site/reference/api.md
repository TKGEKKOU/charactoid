# API 总览

**CHARACTOID 的 HTTP 面是 FastAPI。** 应用工厂 `app/main.py:create_app()` 调用 `app/startup/routes.py:register_routes`，把业务 router 和三个系统端点挂到同一应用上。

默认基址：`http://127.0.0.1:18000`。几乎所有 JSON API 都以 `/api` 开头。Web 工作台在 `/static/index.html`，`GET /` 会重定向过去。

> **事实依据**：`app/startup/routes.py`、`app/routers/*.py`、`app/routers/settings.py:require_local`。完整路径清单见 [全部路由清单](/reference/api-all)。

## 读这个仓库的 API 时先记住三件事

1. **本机优先**。资源安装、模型目录、语音上传、Live2D 目录等接口会 `require_local(request)`。从非本机 IP 调用会失败，这是设计而不是漏网。
2. **同源头**。部分写接口额外要求 `X-CHARACTOID-Request: web`，例如 `POST /api/voice/transcriptions`、`POST /api/live2d/model-directory`。缺头返回 403。
3. **用 ID，不用路径**。响应和后续请求使用 `persona_id`、`conversation_id`、`run_id`、`attachment_id`、`asset_id`、`session_id`、`task_id`。不要假设能拿到宿主机绝对路径。

## 系统端点（写在 register_routes 里）

| 方法 | 路径 | 源码 | 说明 |
| --- | --- | --- | --- |
| GET | `/api/health` | `routes.py` | `status=ok` 以及 `workspace_id` |
| GET | `/api/status` | `ingestion.status.get_system_status` | 资源与服务汇总 |
| GET | `/api/launcher/progress` | `app.state.launcher_progress` | 启动器进度；未注入则返回空壳 |

更细的诊断在 [系统与诊断 API](/reference/api-system)。

## 按主题分组

| 主题 | 主要前缀 | 参考页 |
| --- | --- | --- |
| 角色、对话、Agent | `/api/personas`，`/api/personas/{id}/agent/*` | [角色、对话与运行](/reference/api-agents-runs) |
| 运行与审批 | `/api/runs` | [事件与状态](/reference/events) |
| 文档、知识、评测 | `/api/personas/{id}/rag/*`，documents，eval | [文档、知识与评测 API](/reference/api-knowledge) |
| 资源与 Provider | `/api/resources`，兼容 `/api/providers/resources` | [资源与 Provider API](/reference/api-resources) |
| 语音、RVC、Live2D | `/api/voice*`，`/api/tts`，`/api/asr`，`/api/stt`，`/api/live2d` | [语音、RVC 与 Live2D API](/reference/api-voice) |
| 扩展与外部接入 | skills、mcp、integrations、onebot | [扩展与外部接入 API](/reference/api-integrations) |
| 系统 | `/api/system` | [系统与诊断 API](/reference/api-system) |
| Worker 合同 | `/api/workers/manifests` | [Worker 清单](/reference/workers) |

## 角色与 Agent 的路径形状

角色集合本身是空路径挂在前缀上：

- `POST /api/personas`、`GET /api/personas`（`personas.py` 里 `@router.post("")` / `@router.get("")`）
- `GET/PATCH/DELETE /api/personas/{persona_id}`

Agent 运行挂在同一前缀下的子路由（`app/routers/agents.py`）：

- `POST /api/personas/{persona_id}/agent/stream`
- `POST /api/personas/{persona_id}/agent/stream-resume`
- `POST /api/personas/{persona_id}/agent/query`
- `POST /api/personas/{persona_id}/agent/resume`

Skill 同样是集合空路径：`GET/POST /api/skills`。

## 错误怎么读

| HTTP | 常见含义 | 你该做什么 |
| --- | --- | --- |
| 400 | 表单/JSON 无法解析 | 检查 multipart boundary、字段名 |
| 403 | 缺少同源头或非本机 | 加 `X-CHARACTOID-Request: web`，或改回本机调用 |
| 404 | 资源或 run 不存在 | 核对 ID；run 的公开错误码见 `RuntimeErrorCode.RUN_NOT_FOUND` |
| 409 | 运行状态不允许该操作 | 例如已结束的 run 不能再取消/审批 |
| 413 | 音频或上传超过上限 | `/api/voice/transcriptions` 默认音频不超过 10MB |
| 415 | MIME 不被接受 | 语音接口只接受 wav/webm/ogg/mpeg/mp4/m4a |
| 422 | 校验失败 | 按响应字段修 JSON |
| 503 | 依赖未配置 | ASR/TTS/RVC/模型服务未就绪 |

运行接口不总是裸字符串错误。`app/routers/runs.py` 会返回：

```json
{ "error": { "code": "run_not_found", "message": "..." } }
```

`message` 来自 `agents.runtime.errors.public_error_message`，不会把内部异常栈交给浏览器。

## 兼容前缀

`register_routes` 同时挂了新前缀和旧前缀，避免旧前端一次性翻车：

| 新 | 兼容 |
| --- | --- |
| `/api/resources` | `/api/providers/resources` |
| `/api/voice/rvc` | `/api/providers/rvc` |
| `/api/asr` | `/api/stt` |

新集成应走左列。右列会保留到文档标明废弃为止。

## 建议的调用顺序

1. `GET /api/health` 确认进程活着。
2. `GET /api/status` 看可选资源。
3. `GET /api/personas` 取角色。
4. 对话走 `/agent/stream` 或 `/agent/query`。
5. 长任务用返回的 `run_id` 轮询 `GET /api/runs/{id}` 和 `GET /api/runs/{id}/events?after_sequence=`。
6. 需要人工确认时 `POST /api/runs/{id}/approval`。
7. 语音/RVC/文档走各自 session 或 task 接口，不要把文件内容塞进 Agent 文本字段。

配置项的环境变量与文件位置见 [配置项](/reference/config)。

## 源码合同（中档补全）

### 路由是怎么挂上的

`register_routes` 遍历 `_ALL_ROUTERS` 做 `include_router`，然后在同一函数里定义三个系统端点：`GET /api/health`、`GET /api/status`、`GET /api/launcher/progress`，以及 `GET /` → `/static/index.html`。

`configure_middleware` 加 CORS：`allow_origins=["*"]`、`allow_credentials=False`、方法与头全放行。这只影响浏览器预检，**不能**替代 `require_local`。从局域网 IP 打开工作台，静态文件也许能加载，本机设置和资源写接口仍 403。

### 静态挂载

`mount_static_files`：

- `/live2d-assets` ← `data/live2d/`（目录不存在会 `mkdir`）
- `/static` ← 工作台静态文件，`NoCacheStaticFiles`
- `/sqlite` ← Datasette 包住 SQLite；`from datasette.app import Datasette` 失败则 `except Exception: pass`，没有这个挂载，应用照常启动

健康检查 JSON 的 `workspace_id` 来自 `Settings.workspace_id`，当前写死 `local-default`，不是按机器生成。

### 调用时不要假设的事

- OpenAPI 运行时才是字段真源；本页分组会过期。
- 兼容前缀 `/api/providers/resources`、`/api/providers/rvc`、`/api/stt` 仍然注册，新代码走 `/api/resources`、`/api/voice/rvc`、`/api/asr`。
- `GET /api/launcher/progress` 未注入 `app.state.launcher_progress` 时返回空壳：`starting/done=false`，`percent=0`，`steps=[]`。


### require_local 的主机集合

`LOCAL_CLIENT_HOSTS = {127.0.0.1, ::1, localhost, testclient}`；`LOCAL_REQUEST_HOSTS` 不含 `testclient`。带 Origin 时还要比 scheme 与 port。错误文案固定英文：`Local settings are available on localhost only`。

同源头在 OpenAPI 里写作 `X-CHARACTOID-Request`，代码读 `x-charactoid-request`，值必须是 `web`。这与 CORS `*` 同时存在：跨源预检能过，本机检查仍失败。

不要用 `GET /api/health` 判断 LLM 是否可用。健康检查不读 `data/local_settings.json` 里的 Key。
