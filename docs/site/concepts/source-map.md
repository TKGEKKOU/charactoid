# 源码地图

**本页按当前仓库目录说明 CHARACTOID 的代码落点。它对应 DeepSeek Harness 文档里的 module-graph：先告诉你“代码在哪”，再告诉你“运行时谁调用谁”。阅读时以本页和 [系统架构](./architecture) 为准，不要把 `docs/archive` 里的历史方案当成当前实现。**

CHARACTOID 不是“一个聊天前端 + 若干脚本”。它是一套本地优先的角色 Agent 工作台：FastAPI 暴露合同，LangGraph 编排 Supervisor 与 Worker，内置 Runtime 管理 Run/Job/Event，SQLite / Milvus Lite / 受管文件目录分别保存控制面、检索面和资产面。

## 先建立坐标

```text
用户界面
  frontend/          Vue 工作台（对话、角色、设置、扩展、评测）
  static/            构建后的静态资源，由 FastAPI 挂到 /static
  desktop/           桌面宿主：拉起本地服务、进度窗、WebView

入口与装配
  main.py            Web 进程入口
  desktop_main.py    桌面进程入口
  settings.py        环境与本地设置装配
  app/main.py        FastAPI create_app()
  app/startup/       生命周期、路由、静态资源、受管资源

编排与运行
  agents/            Supervisor、Worker、Tool、Skill、MCP、合同
  agents/graph/      LangGraph 父图 / 知识子图
  agents/runtime/    内置 Session / Job / Event / Cancel / Resume
  agents/tools/      领域工具实现

数据与媒体
  app/models.py      SQLite ORM
  app/run_store.py   Run / Task / Step / Event 持久化
  rag/               Adaptive RAG、检索、重排、评测
  ingestion/         文档切分、Embedding、Milvus 写入
  voice/             ASR / TTS / GPT-SoVITS / RVC / Separator
  live/              Live2D 服务侧辅助
  realtime/          实时语音流

扩展与渠道
  extensions/        扩展安装与目录
  skills/            Skill 包
  integrations/      OneBot11 / B站 / MCP / QQ 官方
  providers/         模型与服务 Provider
  catalog/           可安装资源目录

工程
  tests/             回归与合同测试
  scripts/           启动、发布、维护脚本
  docs/site/         本开发者文档（VitePress）
  package-runtime/   npm 启动器运行时（独立发布，不在本文展开）
```

## 启动之后发生什么

`python main.py` 或 `scripts/start.ps1` 最终都会进入 FastAPI 应用工厂。应用起来后：

1. `settings.py` 读取 `.env`、`data/local_settings.json` 和项目根路径，得到端口、SQLite 路径、Milvus URI、工作区 ID。
2. `app/startup/lifespan.py` 初始化数据库、受管资源状态、Agent 服务和 RunStore。
3. `app/startup/routes.py` 挂上全部路由器，并把 `/static`、`/live2d-assets` 以及可选的 Datasette `/sqlite` 挂到应用上。
4. 浏览器打开 `http://127.0.0.1:18000/static/index.html`。根路径 `/` 会重定向到这个工作台。
5. 用户在对话页发消息时，前端调用角色 Agent 流式接口；`agents/service.py` 的 `PersonaAgentService` 进入 LangGraph 父图。
6. Supervisor 决定直接回答或 `delegate_to_*`；Worker 执行后经 `finalize_*` 回到 Supervisor。
7. `agents/runtime` 把这一轮变成可查询、可取消、可恢复的 Run，并把适合展示的事件写入 `app/run_store.py`。

桌面入口 `desktop_main.py` 不另做一套业务。它负责拉起同一个 Web 服务，并在宿主窗口里打开同一套前端。

## 目录详解

### `agents/`：编排内核

这是 CHARACTOID 最接近 DeepSeek Harness 的部分：模型、工具、会话、循环都有明确边界，但实现是 Python / LangGraph，而不是 Cordis 插件树。

| 文件 | 职责 |
| --- | --- |
| `graph/build.py` | 组装父图：`persona_supervisor`、Worker 节点、`finalize_*`、dispatch/collect |
| `graph/supervisor.py` | Supervisor 节点、handoff、finalize、收集用户可见回复 |
| `graph/knowledge.py` | 知识子图：planner → retrieve → fallback → finalize |
| `graph/state.py` | `PersonaWorkflowState`、canonical Worker 名、结构化交接字段 |
| `graph/policy.py` | 意图到 Worker 的直达策略；RVC 不允许绕过 Supervisor |
| `graph/middleware.py` | 图中间件：上下文、安全门、流式阶段 |
| `registry.py` | `ToolSpec` / Worker 元数据：确认、写数据、超时、重试 |
| `contracts.py` | `WorkerManifest`、`SpecialistResult`、交接字段安全检查 |
| `service.py` | `PersonaAgentService`：query / stream / resume 的业务入口 |
| `intent_funnel.py` | 意图线索与安全门；不能替代 Supervisor 的结构化 handoff |
| `capabilities.py` | 能力目录与角色策略 |
| `skills.py` / `skill_parser.py` / `skill_sources.py` | Skill 加载、解析、来源 |
| `mcp_grants.py` | MCP 授权，和“连上了服务”不是一回事 |
| `sql_security.py` | 结构化查询的只读 SQL 约束 |
| `observability.py` | 公开事件摘要，去掉 Prompt、密钥和原始载荷 |
| `context.py` / `context_factory.py` / `context_budget.py` | 角色上下文与预算 |
| `confirmation_policy.py` | 人工确认策略 |
| `cancellation.py` | 领域取消钩子 |
| `resilience.py` | 超时、降级、重试边界 |
| `workflows.py` | 可恢复工作流摘要 |

`agents/tools/` 是 Worker 真正调用的工具实现，按领域拆分：

| 文件 | 领域 |
| --- | --- |
| `knowledge.py` / `structured_query.py` / `web.py` | 检索、只读 SQL、联网 |
| `memory.py` / `workspace_memory.py` | 角色记忆与工作区记忆 |
| `management.py` | 文档与角色资料管理 |
| `voice.py` / `voice_clone.py` | TTS、ASR、Voice Studio、GPT-SoVITS |
| `rvc.py` | RVC 会话、分离、转换、混音 |
| `live2d.py` | 模型清单、VTS、本地目录 |
| `config.py` | 受管资源安装与配置变更 |
| `skills.py` / `skill_install.py` / `mcp_admin.py` / `integrations_admin.py` | 扩展管理 |
| `extended.py` | URL 导入知识、导出会话 |

### `agents/runtime/`：内置 Harness

CHARACTOID 不包装外部 Harness SDK。`NativeAgentLoop` 把 Session / Job / Cancel / Resume 做进 Python 进程：

| 文件 | 职责 |
| --- | --- |
| `native.py` | Job 生命周期原语 |
| `runner.py` | 把 `PersonaAgentService` 的一轮调用映射成 Run |
| `models.py` | `RunStatus`、`StructuredHandoff`、Task/Step/Event |
| `events.py` | 事件字段清洗 |
| `errors.py` | 对外错误码，不泄露内部异常 |
| `cli.py` / `__main__.py` | `python -m agents.runtime` |

详见 [内置 Runtime](./runtime)。

### `app/`：HTTP 合同与持久化

| 文件 / 目录 | 职责 |
| --- | --- |
| `main.py` | `create_app()` |
| `startup/routes.py` | 路由器清单、`/api/health`、`/api/status`、静态挂载 |
| `startup/lifespan.py` | 启动和关闭 |
| `routers/` | 按领域切开的 FastAPI 路由 |
| `models.py` | SQLAlchemy 实体 |
| `run_store.py` | Run、Task、Step、Event 的存储 |
| `chat_store.py` | 会话消息 |
| `database.py` | SQLite 引擎 |
| `attachments.py` | 附件引用，不接受任意本地绝对路径 |
| `providers.py` | 运行时 Provider 装配 |

`app/routers/` 当前包括角色、消息、文档、RAG、评测、语音、RVC、Live2D、资源、设置、Skill、MCP、扩展、集成、实时流、Worker manifests 等。完整路由以 [全量路由清单](/reference/api-all) 为准。

### `rag/` 与 `ingestion/`：知识面

检索不是“把文档塞进 Prompt”。入库和查询是两条链：

```text
入库
  上传/URL 导入
    → ingestion/document_jobs.py
    → markdown_parser / converter / semantic_chunker
    → embeddings / local_embedding
    → milvus_store.py 写入 Dense + BM25
    → SQLite 记录 document / job / source_hash

查询
  knowledge_worker
    → rag/query_rewriter.py
    → retriever.py（向量 + BM25 + 作用域过滤）
    → reranker.py / reranker_runtime.py
    → context_assembler.py
    → 证据不足时 fallback（拒答 / 确认 / 受限联网）
    → SpecialistResult 交回 Supervisor
```

结构化表格走另一条路：CSV/XLSX 进入 SQLite，表说明进入向量库，统计查询走 `agents/sql_security.py` 约束的只读 SQL。

### `voice/`：声音链路

声音能力分成两类，不要混用：

- **角色开口**：GPT-SoVITS 绑定音色，对话中 TTS，可驱动 Live2D 口型。
- **文件变声**：RVC 处理已有音视频，产出结果资产，不负责角色实时对话。

对应目录：

| 路径 | 内容 |
| --- | --- |
| `voice/asr` | 转写 |
| `voice/tts` | 合成 |
| `voice/gpt_sovits` | 引擎与服务控制 |
| `voice/rvc` | 变声任务 |
| `voice/separator` | 人声分离 |
| `voice/vad` | 语音活动检测 |
| `voice/studio.py` / `clone_pipeline.py` | Voice Studio 与训练 |

`voice_worker` 与 `rvc_worker` 在 Agent 图里是两个 Worker，超时分别是 300s 和 1800s。

### `frontend/`：工作台

前端是独立的 Vite + TypeScript 应用，构建产物放到 `static/`，由 FastAPI 提供。

| 路径 | 页面职责 |
| --- | --- |
| `frontend/src/main.ts` | 入口 |
| `frontend/src/manage/` | 角色、对话、知识、人设 |
| `frontend/src/settings/` | Provider、资源、本地设置 |
| `frontend/src/extensions/` | Skill / MCP / 扩展 |
| `frontend/src/evaluation/` | RAG 评测 |
| `frontend/src/shared/` | 共享组件与 API 客户端 |

前端只提交结构化引用：`persona_id`、`conversation_id`、`attachment_id`、`run_id`、`asset_id`。它不拼接 Shell，也不把本机绝对路径当作执行参数。

### `integrations/` 与 `extensions/`

| 路径 | 渠道或能力 |
| --- | --- |
| `integrations/onebot11` | QQ 机器人（OneBot11 WebSocket） |
| `integrations/bilibili` | B站直播弹幕 |
| `integrations/mcp` | MCP 客户端连接 |
| `integrations/qq_official` | QQ 官方接口适配 |
| `extensions/` | 扩展目录、安装、事件 |
| `skills/` | 仓库内置 Skill 包 |
| `catalog/` | 可安装资源与扩展清单 |

外部渠道进入后仍然变成同一条角色任务：人设、知识、声音、确认策略都复用对话页的 Agent 图。

### `desktop/`：宿主，不是第二套后端

| 文件 | 职责 |
| --- | --- |
| `launcher.py` | 拉起 Python 服务 |
| `server_manager.py` | 服务进程 |
| `browser.py` | 打开工作台 |
| `launcher_api.py` | 启动进度 API |
| `docker_manager.py` | 可选容器辅助，不是普通用户前置 |

## 关键运行对象在代码里的名字

| 用户看到的东西 | 代码对象 | 主要落点 |
| --- | --- | --- |
| 角色 | `Persona` / `PersonaVersion` | `app/models.py`、`app/routers/personas.py` |
| 对话 | `ConversationMessage` | `app/chat_store.py`、`app/routers/messages.py` |
| 一次任务 | `AgentRun` / `AgentRunRecord` | `agents/runtime/models.py`、`app/run_store.py` |
| 监督者 | `persona_supervisor` | `agents/graph/supervisor.py` |
| 子智能体 | canonical Worker | `agents/registry.py`、`agents/graph/state.py` |
| 工具 | `ToolSpec` | `agents/registry.py`、`agents/tools/` |
| 证据 | `SpecialistResult` / `RagEvidenceResult` | `agents/contracts.py`、`rag/contracts.py` |
| 知识空间 | `KnowledgeSpace` | `app/models.py`、`ingestion/`、`rag/` |
| 音色 | `VoiceAsset` | `app/models.py`、`voice/` |
| 附件 / 结果 | `attachment_id` / `asset_id` | `app/attachments.py`、各 Worker 工具 |

## 不该从这些目录开始改

- `docs/archive/`：历史设计，不是当前图。
- `runtime/` 项目根下的资源缓存、日志和第三方运行时目录：那是数据，不是编排代码。真正的 Runtime 在 `agents/runtime/`。
- `package-runtime/` 与 npm 发布流水线：文档站不描述如何发 npm；用户启动器用已发布包，源码开发走 `main.py`。
- `third_party/`：第三方源码与注意项，改功能前先看许可证和适配层。

## 建议阅读顺序

1. 本页，建立目录坐标。
2. [系统架构](./architecture)，看父图闭环。
3. [内置 Runtime](./runtime)，看 Run/Job 如何包住 Agent 调用。
4. [持久化目录](./persistence)，看 SQLite / Milvus / 文件如何分工。
5. [Agent 与 Worker](/development/agent-worker)，看委派和 finalize。
6. 按兴趣进入 `rag/`、`voice/`、`integrations/` 或 `frontend/src/manage/`。

## 和 DeepSeek Harness 文档的对应关系

DeepSeek Harness 用 Cordis 把模型、工具、会话、循环都做成可卸载插件。CHARACTOID 用另一套同等强度的边界，但更贴近“角色工作台”而不是通用 coding agent：

| DeepSeek Harness 文档 | CHARACTOID 对应 |
| --- | --- |
| architecture / Cordis | [系统架构](./architecture)：LangGraph 父图 + FastAPI |
| module-graph | 本页 |
| agent-lifecycle | [任务生命周期](/development/lifecycle) |
| capability-seams | [扩展体系设计](./extensions)、`ToolSpec` / `CapabilityDescriptor` |
| persistence-catalog | [持久化目录](./persistence) |
| config-catalog | [配置项](/reference/config) |
| glossary | [术语表](./glossary) |
| Session event log | `RunStore` 与公开事件 |
