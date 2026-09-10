# 工程实现

**CHARACTOID 不是“一个大 Prompt 调工具”。** 源码把角色、监督者、Worker、Run 和本机资源拆开，用可恢复的状态机把一次对话落成一次运行。

> **事实依据**：`app/main.py`、`app/startup/routes.py`、`app/startup/lifespan.py`、`agents/graph/supervisor.py`、`agents/registry.py`、`agents/runtime/runner.py`、`agents/runtime/errors.py`、`agents/confirmation_policy.py`、`agents/checkpoint.py`、`app/database.py`、`settings.py`、`app/routers/runs.py`、`app/routers/agents.py`。

## 进程怎么起来

`main.py` 调 `app.main.create_app()`。`create_app()` 的组装顺序是：

1. `Settings.load()`
2. `FastAPI(title="CHARACTOID", lifespan=build_lifespan(...))`
3. `app.state.settings`、`app.state.extension_catalog_client = CatalogClient(settings.project_root)`
4. `configure_middleware`（CORS）
5. `initialize_database_and_core`
6. `initialize_voice_resources`
7. `initialize_agent_runtime`
8. `initialize_integration_resources`
9. `register_routes`
10. `mount_static_files`

默认对外 HTTP 前缀是 `/api`，工作台静态在 `/static`（`NoCacheStaticFiles`），Live2D 本地目录挂在 `/live2d-assets` → `data/live2d/`。可选再挂 Datasette 到 `/sqlite/`；失败时静默跳过，不阻断启动。

路由清单在 `app/startup/routes.py` 的 `_ALL_ROUTERS`。健康检查、系统状态、启动器进度是直接挂在 app 上的：

| 路径 | 作用 |
| --- | --- |
| `GET /api/health` | `{"status":"ok","workspace_id":...}` |
| `GET /api/status` | `get_system_status()` |
| `GET /api/launcher/progress` | 读 `app.state.launcher_progress`；没有则返回空进度结构 |
| `GET /` | 302 → `/static/index.html` |

## lifespan：热身和退出

`app/startup/lifespan.py` 在启动时：

- `resume_embedding_workers()` / `resume_reranker_workers()`
- 创建 `MCPManager(data/mcp_servers.json)`，`connect_all(register=True)` 放到后台 task
- 若 `initialize_database`：并行热身 embedding、reranker、ASR、GPT-SoVITS（安装了才 `ensure_service`）

退出时取消这些 task，关掉 MCP。热身失败被吞掉，不让进程起不来——所以“服务已起来”不等于语音或向量已经就绪。要用 `/api/status` 或资源 status 看下一层。

## 为什么是监督者 + Worker

只让一个角色入口对用户说话。`agents/graph/supervisor.py` 给每个 Worker 生成 `delegate_to_{worker}` 交接工具。监督者负责：

1. 收用户输入和附件
2. 判断意图、能力授权、是否要确认
3. 按 `_WORKER_ORDER` 分派
4. 校验 Worker 合同后再组织回复

Worker **不对用户说话**。输入合同只有 `request` 字符串（`additionalProperties: False`）。输出必须带齐：

`worker, status, answer, evidence, artifacts, uncertainties, citations, trace, requires_approval, error`

缺字段就是 `CONTRACT_INVALID`。监督者拿到的是结构化交接，不是模型随口一段话。

`_WORKER_ORDER`：

`knowledge_worker` → `memory_worker` → `document_worker` → `profile_worker` → `voice_worker` → `rvc_worker` → `live2d_worker` → `config_worker`

描述与超时在 `agents/registry.py`。兼容别名：`knowledge` / `memory` / `document` / `profile` / `voice` / `voice_clone` / `live2d` / `rvc` / `config`。对外清单：`GET /api/workers/manifests`、`GET /api/workers/manifests/{worker}`。

`requires_confirmation` 写在 Worker 清单上，表示“该 Worker **可能**触发确认”，不是每一个请求都必须确认。具体动作仍由 CapabilityGuard / HITL 策略决定。`knowledge_worker` 被标成可能确认，是因为 web fallback，不是因为检索本身总要点一次。

## 为什么用图而不是一次函数调用

对话里会出现：分支、等待确认、断开重连、服务重启、长任务。这些更适合显式状态，而不是把历史塞回 Prompt。

Run 存在进程内 `run_store`：

- `GET /api/runs/{id}`
- `GET /api/runs/{id}/events?after_sequence=`
- `POST /api/runs/{id}/cancel`
- `POST /api/runs/{id}/approval`

找不到 404，非法转换 409。审批和取消是独立 HTTP，不复用“再问一句”。

LangGraph checkpoint 落在 SQLite。`create_sqlite_checkpointer` 会 `mkdir` 父目录、`SqliteSaver.setup()`。角色删除时按 `persona_id:%` 清 checkpoints。checkpoint 不是给浏览器看的事件流；浏览器看的是清洗后的 run events。

## Worker 执行默认值

来自 `_WORKER_EXECUTION_DEFAULTS`：

| Worker | 超时 | 重试 | 典型职责 |
| --- | ---: | --- | --- |
| knowledge_worker | 45s | 2 次，backoff 0.5s | 当前角色知识空间检索，按策略补公开信息 |
| memory_worker | 30s | 1 次 | 角色范围内的用户记忆与工作区记忆 |
| document_worker | 120s | 2 次，backoff 1.0s | 知识文档、上传、URL 导入 |
| profile_worker | 30s | 1 次 | 人设档案读写、导出会话 |
| voice_worker | 300s | 1 次 | 音色、TTS、ASR、实时语音、Studio、GPT-SoVITS |
| rvc_worker | 1800s | 1 次 | 受管音频变声任务 |
| live2d_worker | 45s | 1 次 | Live2D 模型、VTS、本地目录 |
| config_worker | 45s | 1 次 | 查询/安装/更新/取消/清理受管资源，不执行具体功能任务 |

工具注册是单一事实来源。`mutates_data` 与 `requires_confirmation` 正交：检索类工具不写数据；`web_search` 的 HITL 由 knowledge fallback 按策略决定，而不是把“有时需要确认”写死成每个 ToolSpec。

## 数据放哪

| 存什么 | 放哪 | 不放什么 |
| --- | --- | --- |
| 角色、会话、文档 job、设置元数据 | SQLite（`settings.sqlite_path`） | 向量、大音频 |
| 知识切片向量 | Milvus（`settings.milvus_uri`） | 人设全文 |
| 模型、音色、Live2D、下载中的安装 | 文件系统（`models/`、`data/`、`runtime/`） | 密钥明文到前端 |
| 运行事件 | 进程内 run store + 清洗后的事件 | prompt / 路径 / 密钥 |
| 对话 checkpoint | SQLite LangGraph 表 `writes` / `checkpoints` | 浏览器可直接改的状态 |

前端设置接口即使配置了 key，普通 `GET` 也只回 `configured` 布尔；明文必须走显式 reveal。

## 本机写保护

CORS 放行不等于可写。`require_local` 卡的是客户端地址和 Host/Origin。资源安装、系统诊断、Docker 启停、关机、integrations 配置都走这条。设计意图：展示站或远程页面不能改你磁盘上的模型。

## 失败被收成稳定错误码

`RuntimeErrorCode` 是给本地 UI 用的枚举，`public_error_message()` 把内部细节换成不泄实现的中文。API 层 `RuntimeOperationError` 转成 `{"error":{"code","message"}}`。不要在文档或 UI 里发明第四套文案。完整表见 [排查总则](/troubleshooting)。

## 确认策略是纯函数

`decide_capability` / `decide_web_fallback` 不读网络、不写库。是否允许、是否确认、是否拒绝，必须能在单测里用意图对象推出来。监督者调用它们，再决定是直接分派、`interrupt` 等审批，还是拒绝。

UI 侧对应 `POST /api/runs/{id}/approval`。`ApprovalService.decide` 失败时走同一套 error envelope。

## 对话 HTTP 合同

前缀 `/api/personas/{persona_id}/agent`：

| 路径 | 形态 |
| --- | --- |
| `POST /stream` | SSE：stage / token / result / done |
| `POST /query` | JSON `AgentTurnResponse` |
| `POST /stream-resume` | SSE，确认后继续 |
| `POST /resume` | JSON，确认后继续 |

执行键是 `persona_id:conversation_id`。断开 abort。`AgentTurnResult` 是内部 dataclass，SSE 必须 `response_for(result).model_dump`，不能 `json.dumps(default=str)`，否则浏览器收到字符串，答案、附件和 workflow 会丢。

## 建议的改动边界

- 新能力：先注册 ToolSpec / Worker manifest，再写 router
- 新确认点：改 `confirmation_policy` 或 capability 标记，不要在前端私自弹窗冒充 HITL
- 新事件：走 run store，并过清洗白名单
- 新静态资源：不要绕过 `require_local` 去提供“一键写盘”

## 相关

[Agent 与 Worker](/development/agent-worker) · [注册 Worker](/development/worker-registration) · [任务生命周期](/development/lifecycle) · [源码地图](/concepts/source-map)
