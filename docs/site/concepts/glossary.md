# 术语表

**本表定义开发者文档和源码里反复出现的词。同一个中文词在界面、API 和 LangGraph 节点里可能对应不同对象；发生歧义时以代码名为准。**

## 产品对象

| 术语 | 含义 | 不是什么 |
| --- | --- | --- |
| 角色 / Persona | 工作台的组织单位。保存人设、版本、能力策略、知识空间、音色和 Live2D 绑定。 | 不是某个 LLM 模型，也不是一次对话。 |
| 角色版本 / PersonaVersion | 人设快照。修改资料会留下可回溯版本。 | 不是 Git 提交。 |
| 工作区 / workspace_id | 本机数据隔离边界。默认本地单工作区。 | 不是云租户系统。 |
| 知识空间 / KnowledgeSpace | 角色可检索的资料集合。检索时按空间过滤。 | 不是整个 SQLite 数据库。 |
| 对话 / Conversation | 围绕一个角色的消息、附件和任务上下文。 | 不是一次 Run。一次对话可以有很多次 Run。 |
| 工作台 | Web / 桌面里的角色操作界面。 | 不是 Agent 图本身。 |

## 编排对象

| 术语 | 代码名 | 含义 |
| --- | --- | --- |
| Core / 意图层 | `intent_funnel`、Supervisor 前的能力自检 | 识别线索、补齐输入、拦住不安全直达。不能自己执行领域任务。 |
| Supervisor / 监督者 | `persona_supervisor` | 唯一对用户组织最终回复的节点。决定直接回答或委派 Worker。 |
| Worker / 子智能体 | `knowledge_worker` 等 canonical 名 | 在受限工具集里执行领域动作，返回结构化结果，不直接对用户说话。 |
| Tool | `ToolSpec.tool` | Worker 可调用的单个操作。声明 specialist、是否写数据、是否要确认。 |
| Skill | `agents/skills.py` | 一组提示词 + 工具集合，按需加载，不默认暴露全部工具。 |
| MCP | `integrations/mcp`、`mcp_grants.py` | 把外部服务在运行时注册成工具。连接成功 ≠ 角色已授权。 |
| handoff | `delegate_to_*` / `Command(PARENT, goto=...)` | Supervisor 把控制权交给 Worker 节点。 |
| finalize | `finalize_*` | 校验 Worker 合同后再回到 Supervisor。 |
| 父图 / 子图 | `agents/graph/build.py`、`knowledge.py` | 父图闭环到 Supervisor；子图 END 不等于父图 END。 |

## 运行对象

| 术语 | 代码名 | 含义 |
| --- | --- | --- |
| Runtime | `agents/runtime` | 内置 Session/Job/Event/Cancel/Resume，不依赖外部 Harness 发行包。 |
| Session | `RuntimeSession` | 以 `persona_id:conversation_id` 为边界。 |
| Job | `RuntimeJob` | 一次 query/resume/stream 的可取消执行。 |
| Run | `AgentRun` / `AgentRunRecord` | 持久化的一次运行，可含多个 Task/Step/Event。 |
| Task | `RuntimeTask` / `RuntimeTaskRecord` | Run 内可独立追踪的业务任务。 |
| Step | `RuntimeStep` | Task 内的步骤，允许 skipped。 |
| Event | `RunEvent` / `AgentRunEventRecord` | 可展示的进度、状态、资产引用。不含 Prompt 和密钥。 |
| Checkpoint | LangGraph checkpointer | 按 thread_id 保存图状态，用于中断恢复。 |
| Resume | `stream_resume` / `resume` | 从确认、补输入或异步任务继续，不重新猜测上下文。 |

## 合同与状态

| 术语 | 含义 |
| --- | --- |
| `SpecialistResult` | Worker → Supervisor 的稳定结果：status、answer、evidence、citations、artifacts、error。 |
| `WorkerManifest` | Worker 的公开能力边界：输入输出 schema、超时、重试、是否只读。 |
| `StructuredHandoff` | Core → Supervisor → Worker 的最小交接。禁止 `path` / `command` / `python` / `shell` 字段。 |
| `attachment_id` | 用户已上传或已登记的输入引用。 |
| `asset_id` | 任务产出的结果引用，例如音频。 |
| `source_hash` | 文档去重和增量入库依据。 |
| confirmation / HITL | 写操作或策略要求的人工确认。只读检索的联网兜底也可能要确认。 |
| waiting_input | Run 停在补文件、选选项或确认，而不是失败。 |

### Worker 结果状态

`SpecialistStatus`：

| 值 | 含义 |
| --- | --- |
| `accepted` | Worker 接受任务，尚未给出终态。 |
| `insufficient` | 证据或输入不足。 |
| `confirmation_required` | 需要用户确认或补输入。 |
| `completed` | 合同校验后的成功结果。 |
| `failed` | 失败，带公开 error code/message。 |

### Run 状态

`RunStatus`：`queued` → `running` → `waiting_approval` / `paused` / `completed` / `failed` / `cancelled`。终态不能再转到其他非自身状态。

## 数据面

| 术语 | 存放 | 典型内容 |
| --- | --- | --- |
| 控制面 | SQLite `data/charactoid.db` | 角色、消息、记忆、Run、文档任务、音色元数据 |
| 检索面 | Milvus Lite `data/milvus_local.db` | Dense / BM25 索引与检索元数据 |
| 文件面 | 项目内受管目录 | 附件、音频结果、模型、GPT-SoVITS / RVC 运行时 |
| 本地设置 | `data/local_settings.json` | LLM、Embedding、搜索等 UI 保存的配置 |
| 环境 | `.env` | 端口、主机、路径、工作区等进程级设置 |

## 声音与表现

| 术语 | 含义 |
| --- | --- |
| 绑定音色 | 角色在对话里开口用的 GPT-SoVITS 资产。 |
| Voice Studio | 素材切片、标注、训练、绑定的工作流。 |
| RVC | 把已有音视频转换成目标音色文件。不是实时对话 TTS。 |
| Separator | 人声/伴奏分离，常作为 RVC 或训练前处理。 |
| ASR | 转写。用于标注训练数据，也可转写附件。 |
| Live2D | 角色形象。口型跟随当前正在播放的语音，而不是“模型自己在说话”。 |
| VTube Studio | 外部 Live2D 宿主，直播采集用。 |

## 能力与扩展

| 术语 | 含义 |
| --- | --- |
| CapabilityDescriptor | 一条能力的来源、所属 Worker、是否写数据、是否要确认。 |
| CapabilityPolicy | 角色级覆盖：启用、禁用、强制确认。 |
| Provider | LLM / Embedding / 搜索等外部或本地服务适配。 |
| 受管资源 | 由 `config_worker` 安装的 FFmpeg、ASR、Embedding、Reranker、Separator、RVC、GPT-SoVITS 等。 |
| 评测 | RAG 数据集、候选、反馈，用来检查检索质量，不是聊天记录本身。 |

## 渠道

| 术语 | 含义 |
| --- | --- |
| OneBot11 | QQ 机器人协议。消息进入同一条角色任务。 |
| B站直播 | 弹幕可作为输入；形象和口型走同一角色绑定。 |
| 开发者文档 | `docs/site` VitePress，发布到 GitHub Pages：`/charactoid/`。 |

## 命名规则

- **canonical Worker 名带 `_worker` 后缀**。`knowledge`、`rvc`、`voice_clone` 只是兼容别名。
- **节点名**用 `worker_node_name()` 计算，例如 `knowledge_worker`。
- **用户可见文案**可以叫“知识检索”“变声”，但 API、事件、日志应写代码名。
- **不要把 specialist 和 worker 当成两个系统**。`SpecialistResult.worker` 是新字段，`specialist` 保留兼容。

## 常见混用

| 混用 | 正确理解 |
| --- | --- |
| “模型就是角色” | 模型是 Provider；角色是人设、权限和资源绑定。 |
| “Worker 直接回用户” | 只有 Supervisor 组织最终回复。 |
| “文档上传了就能问” | 还要处理完成并确认索引。 |
| “RVC 就是角色声音” | RVC 产文件；角色开口走 GPT-SoVITS 绑定音色。 |
| “MCP 连上就能用” | 还要角色授权和确认策略。 |
| “本地优先=永不联网” | 默认控制面在本地；LLM、搜索、部分语音仍可能出网。 |
