# 快速开始

**这页带你在 Windows 上从空环境启动 CHARACTOID，并确认 Web 工作台、SQLite 和本地 Milvus Lite 可以正常工作。这里描述的是仓库当前的真实启动方式：默认端口是 `18000`，默认使用项目目录内的 SQLite 和 Milvus Lite 文件，不要求先部署 Docker 版 Milvus。**

如果你只想先看到界面，优先完成“启动服务”和“配置 LLM”两步；如果还没有语音、RVC 或知识库模型，可以先跳过对应功能。对话失败时不要重装整个环境，先看本页“页面能打开但对话失败”。

> **事实依据**：`scripts/start.ps1`、`main.py`、`app/main.py`、`app/startup/routes.py`、`.env.example`、`settings.py`、`pyproject.toml`、`app/routers/settings.py`、`app/routers/agents.py`、`persona/guide.py`。

## 前置条件

- Windows PowerShell；
- Python **3.11**；`py -3.11` 或 `python` 可以调用它。仓库 `requires-python = ">=3.11,<3.12"`，脚本也只接受 3.11；
- Git（如果你是从仓库克隆）；
- 至少一个可用的 LLM Provider 配置（保存在 `data/local_settings.json`，不是 `.env`）；
- 如果要处理音视频，再准备 FFmpeg；如果要使用本地语音模型，还需要额外的模型和运行时。

项目的 Python 依赖由 `requirements.txt` 和 `pyproject.toml` 管理。`pyproject.toml` 的 `[project.scripts]` 提供 `charactoid` 入口，指向 `agents.runtime.cli:main`；日常启动工作台仍然走 `main.py` / `scripts/start.ps1`。

## 操作步骤

### 1. 进入项目目录

```powershell
cd C:\\path\\to\\CHARACTOID
```

如果你的项目放在别处，把路径替换成实际路径即可。`start.ps1` 会把工作目录切到仓库根（`Split-Path -Parent $PSScriptRoot`），不要在别的目录里复制脚本单独跑。

### 2. 使用一键启动脚本

推荐第一次运行使用：

```powershell
.\\scripts\\start.ps1
```

脚本按 `[1/4]` 到 `[4/4]` 执行：

1. 检查 Python 3.11：先 `py -3.11`，再回退到 `python`；版本对不上直接 `exit 1`；
2. 创建或复用 `.venv`；
3. 安装或校准依赖：用 `requirements.txt` + `pyproject.toml` 的 SHA256 写入 `.venv/.charactoid-requirements.sha256`。指纹变了、`pip check` 失败、或没有标记文件时，会 `pip install --upgrade pip`，再 `pip install -e . -r requirements.txt`，然后 `pip check`；
4. 如果没有 `.env`，从 `.env.example` 复制生成；
5. 默认启动 FastAPI，并尝试打开本地 Web 工作台。

常用参数：

```powershell
# 环境已经安装好时，跳过依赖安装
.\\scripts\\start.ps1 -NoInstall

# 启动宿主窗口，同时仍然使用浏览器中的工作台
.\\scripts\\start.ps1 -Desktop

# 启动服务但不自动打开浏览器
.\\scripts\\start.ps1 -NoBrowser
```

`-Server` 是兼容参数，当前默认启动行为已经是 Web 服务。`-Desktop` 会额外安装 `requirements-desktop.txt`，然后跑 `desktop_main.py`；关闭宿主窗口会停掉本地服务。

脚本在启动前会用 `httpx.get("http://127.0.0.1:18000/api/health")` 探测。注意：这里的端口是写死的 `18000`，即使你把 `.env` 的 `APP_PORT` 改掉，这个探测也不会跟着变。服务真正监听的地址以 `Settings.load()` 的 `APP_HOST` / `APP_PORT` 和启动日志为准。

如果探测已经成功，脚本会打开浏览器然后 `exit 0`，不会再起第二个 `main.py`。

### 3. 手动启动

如果你不使用脚本，可以直接运行：

```powershell
.\\.venv\\Scripts\\python.exe -B main.py
```

`main.py` 只做三件事：`create_app()`、`Settings.load()`、`uvicorn.run(app, host=settings.app_host, port=settings.app_port)`。应用装配在 `app/main.py`：中间件、数据库、语音资源、Agent runtime、集成、路由、静态文件。

如果没有虚拟环境，先创建并安装依赖：

```powershell
py -3.11 -m venv .venv
.\\.venv\\Scripts\\python.exe -m pip install -e . -r requirements.txt
```

### 4. 打开工作台并检查健康状态

浏览器访问：

```text
http://127.0.0.1:18000/static/index.html
```

`GET /` 会 302 到 `/static/index.html`。静态资源挂在 `/static`（`NoCacheStaticFiles`）。Live2D 模型文件挂在 `/live2d-assets`，目录是 `data/live2d/`。

健康检查：

| 方法 | 路径 | 返回 |
| --- | --- | --- |
| GET | `/api/health` | `{"status":"ok","workspace_id":"local-default"}` |
| GET | `/api/status` | `ingestion.status.get_system_status()` 的诊断摘要 |
| GET | `/api/system/diagnostics` | 同样的系统摘要，但要 `require_local` |
| GET | `/api/launcher/progress` | 宿主启动进度；没有 launcher 时返回空步骤 |

`workspace_id` 在 `Settings` 里写死为 `local-default`，和 `persona.service.LOCAL_WORKSPACE_ID` 相同。打开工作台后，如果页面能正常加载并且 `/api/health` 返回 `ok`，说明进程起来了。这还不等于对话能走通。

### 5. 配置 LLM

`.env.example` 明确说明：LLM、Embedding 和联网搜索配置由 Web 工作台的“设置”页保存到 `data/local_settings.json`，不直接写入 `.env`。`.env` 只负责本机基础设施：

```env
MILVUS_DB_URI=./data/milvus_local.db
COLLECTION_NAME=charactoid_knowledge_v1
DB_PATH=data/charactoid.db
APP_HOST=127.0.0.1
APP_PORT=18000
RAG_PIPELINE=default
MAX_REWRITE_COUNT=1
MAX_GENERATION_RETRY=1
DEFAULT_CONFIDENCE_THRESHOLD=0.75
MAX_UPLOAD_MB=50
CHARACTOID_RVC_DEVICE=auto
```

`Settings.load()` 会合并 `.env` 和 `data/local_settings.json`。API Key 会经过 `is_real_api_key()`：空串、`your-api-key`、`sk-...`、`<api-key>` 这类占位值会被当成未配置。

第一次打开后：

1. 进入设置或模型配置页；
2. 填写服务地址、密钥和模型名；
3. 点击页面提供的连接测试：`POST /api/settings/llm/test`；
4. 保存：`PATCH /api/settings`。

连接测试的硬条件：

- `require_local`：客户端 host 必须是 `127.0.0.1` / `::1` / `localhost` / `testclient`，请求 Host 也必须是本机；Origin 若存在，必须同 scheme、同本机 host、同端口。否则 403 `Local settings are available on localhost only`；
- 请求头 `X-Charactoid-Request: web`，否则 403；
- 请求体或已保存设置里必须有真实 API Key，否则 422；
- `base_url` 必须以 `http://` 或 `https://` 开头，否则 422；
- 实际探测走 `rag.llm.probe_llm`。上游 401/403 → 502（Key 或权限）；404 → 502（地址或模型不存在）；429 → 502（限流）；其它失败也是 502，截断前 300 字符。

`GET /api/settings` 不会把 Key 明文送回前端，只给 `openai_api_key_configured` 这类布尔。要看明文走 `POST /api/settings/reveal-key`（同样要本机 + `X-Charactoid-Request: web`，响应 `Cache-Control: no-store`）。清空走 `POST /api/settings/clear-key`。整份重置走 `DELETE /api/settings`。

Provider 级配置还可以落在 `data/providers/{provider_id}.json`。`app/routers/providers.py` 会把旧版 `local_settings.json` 里的 LLM/Embedding/搜索字段迁到对应 Provider 文件，**Provider JSON 优先**；无效占位 Key 不能盖掉已经生效的真实 Key。

### 6. 停止服务

- 使用前台启动命令时，在对应 PowerShell 窗口按 `Ctrl+C`；
- 使用 `-Desktop` 时，关闭宿主窗口；
- 工作台也可以调 `POST /api/system/shutdown`（`require_local`）。它会起一个后台线程，sleep 0.5s 后调用 `shutdown_callback` 或 `os._exit(0)`；`stop_docker=true` 时先 `docker compose stop`；
- 如果浏览器工作台仍打开但服务已退出，刷新页面会显示服务不可用。

当前项目默认只绑定 `127.0.0.1`，这是为了避免未配置认证时把本地资料和设置暴露到局域网。`CORSMiddleware` 的 `allow_origins=["*"]` 并不等于允许远程改设置：设置、资源、集成、Live2D 管理接口仍然走 `require_local`。

## 你应该看到什么

- Web 工作台可以加载；
- `GET /api/health` 返回 `ok` 和 `local-default`；
- 设置页能够显示 Provider 配置入口；
- `data/charactoid.db` 在首次初始化后作为 SQLite 控制面数据库；
- `data/milvus_local.db` 作为默认的 Milvus Lite 本地文件（真正建立知识索引时才会有可用内容）；
- lifespan 会确保内置指南角色存在（`persona.guide.ensure_guide_persona`）。没有配置 LLM 时，指南角色走 `replies.json` 的预设回复，不是“对话坏了”。

## 常见错误

### PowerShell 不允许执行脚本

如果看到执行策略错误，先在当前用户范围允许本地脚本：

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

然后重新执行 `.\\scripts\\start.ps1`。如果组织策略禁止修改执行策略，请改用手动 Python 命令，并遵守本机安全策略。

### 找不到 Python 3.11

脚本只接受 3.11。检查：

```powershell
py -3.11 --version
python --version
```

如果默认 `python` 是其他版本，请安装 Python 3.11，并重新创建 `.venv`。不要把 3.12 的 venv 硬改标记文件绕过检查。

### 18000 端口被占用

查看占用进程：

```powershell
Get-NetTCPConnection -LocalPort 18000 -State Listen
```

关闭确认无误的占用进程后再启动。不要随意结束未知进程。也不要只改文档中的端口：运行端口以 `.env` 的 `APP_PORT` 和实际启动日志为准。改了端口之后，`start.ps1` 的健康探测仍看 18000，可能误判“已经在跑”或“没在跑”。

### 页面能打开但对话失败

页面静态资源和 `/api/health` 不依赖 LLM。对话走 `POST /api/personas/{persona_id}/agent/stream`，请求体是 `AgentQueryPayload`：

| 字段 | 约束 |
| --- | --- |
| `question` | 1–2000 字符，strip 后不能空 |
| `conversation_id` | 1–255 字符，strip 后不能空 |
| `attachment_ids` | 最多 32 个 |

按这个顺序排查：

1. **角色不在本地工作区** → 404 `Persona not found`。`context_for` 用 `local_persona_or_404`。先 `GET /api/personas`，不要对着过期 id 发 stream。
2. **没有真实 API Key** → `Settings.openai_api_key` 为空。指南角色在未配置 LLM 时会走预设回复；普通角色不会。占位 Key 会被 `is_real_api_key` 丢掉。
3. **Key / Base URL / 模型不对** → 用 `POST /api/settings/llm/test`。502 的三种常见映射见上一节。不要先怀疑 SQLite。
4. **从局域网 IP 打开页面** → 工作台也许能加载静态文件，但设置和部分本机接口 403。用 `http://127.0.0.1:18000`。
5. **SSE 被缓冲** → 响应头必须保留 `Cache-Control: no-cache` 和 `X-Accel-Buffering: no`。若你前面加了 nginx，关掉 proxy buffering。
6. **浏览器断开被当成崩溃** → `_watch_request_disconnect` 会 abort 执行键 `persona_id:conversation_id`。刷新后用 `GET /api/runs/{id}` / `events?after_sequence=` 补洞，或 `stream-resume`。不要立刻再 POST 同一句开新 Run。
7. **在等确认** → 这是 `waiting_approval`，不是对话失败。`POST /api/runs/{id}/approval`，`approved=false` 会 `runtime.cancel`，没有单独的 reject 状态。
8. **能力未开** → `capability_denied`，公开文案是“当前角色没有执行此操作的权限。”这和 Provider 没装不是一回事。

同步入口是 `POST /api/personas/{id}/agent/query`。确认后的流式入口是 `/agent/stream-resume`。Resume **不会**再次 persist 那句用户话。

WebSocket 实时对话是另一条入口：`/ws/personas/{persona_id}/conversations/{conversation_id}`。角色 404 时服务端发 `error` / `persona_not_found` 并 `close 1008`。执行键同样是 `persona_id:conversation_id`。

### RAG 或语音按钮不可用

这些能力依赖独立 Provider 或本地资源。先完成基础对话，再按照[本地资源准备](./resources)配置 Embedding、Reranker、ASR、TTS、Separator、RVC 或 GPT-SoVITS。

`RAG_PIPELINE=simple` 不是合法值。`.env.example` 写明：`default` 使用 Adaptive/Corrective RAG，`adaptive` 是兼容别名，不支持绕过质量链的 `simple`。

### 依赖安装反复跑

这通常是正常的：改了 `requirements.txt` 或 `pyproject.toml` 就会换指纹。若 `pip check` 失败，标记文件不会更新，下次还会全量安装。不要手改 `.venv/.charactoid-requirements.sha256` 来跳过损坏的环境。

### Milvus 路径非法

`normalize_milvus_uri` 要求本地文件模式的 URI 落在项目目录内，否则抛 `MILVUS_DB_URI 的文件必须位于项目目录内`。远程模式用 `http://` / `https://` / `tcp://` / `unix://`。没有后缀的路径会被补成 `milvus_local.db`。

## 下一步

- [配置角色](./character)：创建一个最小可用角色；
- [完成一次对话任务](./conversation)：发送普通问题，并理解等待确认与任务结果；
- [本地资源准备](./resources)：按功能安装可选资源；
- [问题排查](/troubleshooting)：启动后遇到问题时按现象定位。

## 源码合同（中档补全）

### 仓库入口与 npm 入口

`scripts/start.ps1` 假设你已经在 CHARACTOID 源码根目录，而不是文档站或展示站目录。

```powershell
git clone git@github.com:TKGEKKOU/charactoid.git
cd charactoid
.\scripts\start.ps1
```

浏览器打开 `http://127.0.0.1:18000/static/index.html`。若 18000 上 `GET /api/health` 已经成功，脚本会直接打开浏览器并退出，避免双开 `uvicorn`。

没有 Git、只想拉运行时的机器可以使用 npm 包（实现是 `bin/charactoid.mjs`，本页只描述行为，不修改该文件）：

```powershell
npx charactoid-web
npx charactoid-web update
```

| 入口 | 适用 | 不会做的事 |
| --- | --- | --- |
| `scripts/start.ps1` | 克隆后的源码仓库 | 不会安装 Docker；不会把 LLM Key 写进 `.env` |
| 手动 `python -B main.py` | 虚拟环境已就绪 | 不会做健康探测、不会自动开浏览器 |
| `npx charactoid-web` | 用 npm 准备 Web 运行时 | 默认不覆盖 `.env` / `.venv` / `data/`；必需文件是 `main.py` `requirements.txt` `settings.py`，必需目录是 `app` `static` |
| `npx charactoid-web update` | 已有项目要更新运行时 | 只在确认后更新；用户资源仍保留 |

`CHARACTOID_HOME` 可覆盖项目根。端口与主机来自 `Settings.load()`，默认 `APP_PORT=18000`。
