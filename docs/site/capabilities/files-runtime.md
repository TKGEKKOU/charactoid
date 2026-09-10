# 文件与任务运行时

**本页说明 CHARACTOID 如何把“用户丢进来的文件”变成可追踪任务，而不是让前端或模型直接拼接本地路径。对应代码主要在 `app/attachments.py`、`app/run_store.py`、`app/routers/attachments.py`、`app/routers/runs.py`、`agents/runtime/models.py` 以及各领域 Worker 的工具实现。**

文件能力不是独立的上传页。它是角色对话、知识入库、语音训练和 RVC 变声共用的一层：先变成附件引用，再进入 Run，必要时等待确认，最后用资产 ID 把结果交回对话。

## 为什么必须有这一层

如果浏览器或模型直接拿到绝对路径，会出现三类问题：

1. **越权**：一次对话可能读到别的角色、别的工作区、甚至系统目录。
2. **不可恢复**：路径在重启、搬家、清理缓存后失效，任务无法继续。
3. **不可观察**：前端只能显示“处理中”，无法区分 queued、running、waiting_approval、failed。

CHARACTOID 的选择是：文件先登记为附件，任务先登记为 Run/Task/Step，结果再登记为资产。三套标识把控制面、执行面和存储面分开。

## 统一标识

| 标识 | 保存在哪 | 用途 | 不该承担的职责 |
| --- | --- | --- | --- |
| `conversation_id` | SQLite 会话表 | 对话归属，消息和附件的容器 | 不表示一次工具调用 |
| `persona_id` | 角色表 | 知识、记忆、音色、能力策略的边界 | 不是模型名称 |
| `run_id` | `AgentRunRecord` / Runtime | 一次 Agent 运行的全过程 | 不是 HTTP 请求 ID |
| `task_id` | `RuntimeTaskRecord` | Run 内可独立追踪的业务任务 | 不替代 Worker 名 |
| `step_id` | `RuntimeStepRecord` | 任务里的一步，允许 skipped | 不对外作为下载入口 |
| `attachment_id` / `asset_id` / `file_id` | 附件与资产表 | 文件引用，可下载、可交接 | 不把绝对路径交给模型 |
| `workspace_id` | 设置 / Run | 本机工作区隔离 | 不是多租户公网账号 |

`agents/runtime/models.py` 里的 `StructuredHandoff` 只允许数据引用和编排元数据。字段名 `path`、`command`、`python`、`shell` 被明确禁止出现在交接对象里。文本内容里可以提到这些词，但不能作为结构化执行入口。

## 附件如何进入系统

`app/attachments.py` 负责安全落盘，而不是“把用户文件原样放到任意目录”。

当前约束：

- 允许的扩展名覆盖文档、图片、音频、视频：`.pdf` `.txt` `.md` `.docx` `.xlsx` `.pptx` `.csv` `.json`，以及常见音视频容器。
- 单文件上限 `MAX_ATTACHMENT_BYTES = 512MB`。
- `safe_name()` 会去掉控制字符和 `\\ / : * ? " < > |`，并截断到 255 字符。
- `apply_display_name()` 只改展示名，不改存储路径和文件种类。
- `kind_for()` 把附件分成 `image` / `audio` / `video` / `document` / `file`，供后续 Worker 判断能不能用。

附件登记后，对话消息里出现的是引用，不是磁盘路径。Supervisor 委派 Worker 时，handoff 里应带 `input_refs`，由工具层再解析成受管文件。

## 从一句话到一个文件结果

落地页“从一句话，到一个结果”对应的就是这条链。以 RVC 变声为例，真实顺序接近：

```text
用户在对话里附上音视频
  → 附件登记，得到 attachment_id
  → Supervisor 识别这是变声任务，而不是普通闲聊
  → 委派 rvc_worker（RVC 不允许绕过 Supervisor）
  → rvc_worker 建立 session、挂上附件、规范化音轨
  → 如需分离人声，进入可观察步骤
  → 需要确认时 Run 进入 waiting_approval
  → 用户确认后继续转换
  → 结果登记为资产，引用回到对话
  → 用户可以直接试听，而不知道文件在哪
```

语音训练、文档入库、URL 导入知识走的是同一套骨架，只是 Worker 和确认点不同。

## Run / Task / Step

`agents/runtime/models.py` 把一次运行拆成三层：

```text
Run
 ├─ 状态：queued / running / waiting_approval / paused / completed / failed / cancelled
 ├─ 归属：workspace_id、persona_id、conversation_id、thread_id
 ├─ 进度：current_step、progress/total、status_text
 ├─ 交接：pending_action、resume_state、worker_results
 └─ Task[]
      └─ Step[]   （Step 额外允许 skipped）
```

状态机是闭合的。`allowed_transition()` 只允许合法跳转；终态到自身用于幂等更新，终态不能再变成 running。

| 当前状态 | 可以转到 |
| --- | --- |
| queued | running, failed, cancelled |
| running | waiting_approval, paused, completed, failed, cancelled |
| waiting_approval | running, paused, failed, cancelled |
| paused | running, failed, cancelled |
| completed / failed / cancelled | 仅自身（幂等） |

这套状态同时服务：

- 对话页的进度与确认按钮；
- `/api/runs` 查询；
- 取消与恢复；
- 公开事件流（不含 Prompt 和密钥）。

`app/run_store.py` 是 SQLite 实现。它把 Runtime 内存对象写成 `AgentRunRecord`、`RuntimeTaskRecord`、`RuntimeStepRecord`、`AgentRunEventRecord`。事件细节会先经 `sanitize_event_details()`，只保留可公开标量。

## 等待确认不是失败

很多文件任务必须在某个点停下来等用户。典型原因：

- 将要训练或覆盖音色；
- 将要修改角色资料或删除文档；
- 将要调用未声明只读的 MCP 工具；
- 资源检查通过，但下一步不可逆。

这时 Run 进入 `waiting_approval`，并在 `pending_action` 里留下足够 UI 渲染的信息。Worker 不得把“用户还没点确认”当成失败，也不得自己把确认按钮点掉。

确认通过后，Runtime 从 `resume_state` 继续，而不是重放整段自然语言历史。

## 结果必须是引用

Worker 完成文件处理后，应返回：

- 结构化 `artifacts`（资产 ID、类型、展示名、可选时长/尺寸）；
- 可选 `citations` / `evidence`（如果结果依赖知识）；
- 公开错误码（如果失败）。

不要返回：

- 本机绝对路径；
- 原始异常栈；
- 内部命令或 Python 片段；
- 未清洗的 Prompt。

前端用资产 ID 请求试听或下载。模型如果需要再次使用该文件，也只能带引用，不能“记住上次那个 `D:\...`”。

## 和各 Worker 的接缝

| Worker | 文件从哪来 | 文件到哪去 | 长任务特征 |
| --- | --- | --- | --- |
| `document_worker` | 上传资料、URL 导入 | 角色知识空间、待确认索引 | 解析和入库可能超过对话超时 |
| `knowledge_worker` | 已入库文档、结构化表 | 证据片段，不是原文件 | 检索应短；缺证据就 insufficient |
| `voice_worker` | 音视频附件、Voice Studio 切片 | 音色资产、参考音频、TTS 结果 | 训练可到数分钟到数十分钟 |
| `rvc_worker` | 待转换音轨、已有模型 | 变声人声、可选回混 | 超时默认 1800 秒，不自动重试 |
| `live2d_worker` | `data/live2d/` 目录 | 模型清单、VTS 配置 | 不把模型文件当对话附件改写 |
| `config_worker` | 受管资源安装包 | 安装状态，不产出用户文件 | 只管理资源，不执行领域任务 |

`agents/registry.py` 给每个 Worker 声明了超时和重试：知识可短重试，RVC/Voice 几乎不重试，避免把昂贵的媒体任务跑两遍。

## 资源安装也是任务，但不是对话任务

`app/routers/resources.py` 管理 FFmpeg、ASR、Embedding、Reranker、Separator、RVC、GPT-SoVITS。它们有自己的下载/安装状态：

```text
queued → preparing → downloading → verifying → installing → running
```

这和对话 Run 分开。原因：

- 安装需要本机来源校验（`require_local` + same-origin header）；
- “安装成功”不等于“这次变声能跑”，还要看模型、设备和探针；
- GPT-SoVITS 还区分发行版已安装、安装完整、API 服务活着。

对话里的 `config_worker` 可以查询或发起受管资源操作，但不会把安装进度伪装成一次普通聊天回复。

## 失败时要留下下一步

文件任务失败时，公开合同应能回答三个问题：

1. 卡在哪一阶段（附件、规范化、分离、确认、转换、回写）；
2. 是缺资源、缺参数、用户取消，还是执行错误；
3. 下一步是重试、补文件、去设置页安装，还是放弃。

`RuntimeErrorCode` 和 `public_error_message()` 就是为了避免把内部异常直接丢到 UI。排查时先看 Run 状态和事件，再看资源页，最后才看进程日志。

## 和页面、渠道的关系

同一条文件任务可以同时服务：

- Web 工作台对话页；
- 桌面 WebView；
- 机器人或直播渠道（若该角色启用了对应集成）。

渠道不得自己执行 FFmpeg 或读写任意路径。它们只能发消息、收事件、展示资产引用。这和 Live2D、语音流的原则一致：表现层订阅运行结果，不拥有执行权。

## 开发时的检查表

新增一种文件处理能力时，至少确认：

1. 输入是附件 ID 或受管目录，不是用户拼的路径；
2. 有 Run/Task，状态机能走到 waiting_approval；
3. 结果写入资产并出现在 `artifacts`；
4. 交接对象不含 `path`/`command`/`shell`；
5. 超时和是否重试写进 WorkerManifest；
6. 失败有公开错误码和下一动作；
7. 文档和 API 参考同步。

## 相关页面

- [任务生命周期](/development/lifecycle)
- [内置 Runtime](/concepts/runtime)
- [持久化](/concepts/persistence)
- [角色、对话与运行 API](/reference/api-agents-runs)
- [语音、RVC 与 Live2D API](/reference/api-voice)
- [资源、模型与设备](/troubleshooting/resources)
