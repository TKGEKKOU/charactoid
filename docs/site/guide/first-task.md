# 第一次完整任务

**目标：从安装后的空白工作台，走到一条带确认、带结果的真实任务。** 不要一上来就训练音色或变声。

> **事实依据**：`app/startup/routes.py`、`app/main.py`、`app/routers/personas.py`、`app/routers/agents.py`、`app/routers/runs.py`、`app/routers/documents.py`、`app/routers/settings.py`、`app/schemas.py`、`agents/service.py`、`agents/registry.py`、`agents/confirmation_policy.py`、`agents/runtime/approvals.py`。

第一次任务要证明的是合同，不是模型有多聪明：角色能被创建、对话能落库、监督者能分派、确认能点、结果能回到同一条会话。

## 0. 确认进程

浏览器打开 `http://127.0.0.1:18000`。`GET /` 会跳到 `/static/index.html`。另开一页访问 `/api/health`，应看到 `status: ok` 和 `workspace_id`。

可选再看 `GET /api/status`。启动器进度是 `GET /api/launcher/progress`；没有 launcher 函数时返回 `starting: false, done: false, percent: 0, steps: []`，这不是故障。

设置、资源、诊断必须在 localhost。`require_local` 要求：

- client host ∈ `{127.0.0.1, ::1, localhost, testclient}`
- Host ∈ `{127.0.0.1, ::1, localhost}`
- 有 Origin 则 scheme/host/port 一致

用局域网 IP 打开时，对话页面可能还能看，写入会 403 `Local settings are available on localhost only`。CORS `allow_origins=["*"]` 解决不了这件事。

## 1. 语言模型

在设置里配置对话模型并探测（`probe_llm`）。普通设置 GET **不返回 API key 明文**，只返回是否已配置。没有可用 LLM 时，后面的 stream 不会出现正常 token，也不要这时去装 RVC。瞬时 429/5xx 时服务可能返回降级文案而不是 500，不要把它当成角色人设。

## 2. 建一个角色

`POST /api/personas`，body 是名字和 profile，201。列表 `GET /api/personas` 只返回 `workspace_id == LOCAL_WORKSPACE_ID` 的角色，排序 `created_at, id`。

记下 `persona_id`。之后所有对话、能力、文档都挂在这个 id 上。内置指南角色受 `BuiltinPersonaProtected` 保护，不要拿它当可以随便删的试验品。

`PATCH` 人设是浅合并：`{**(persona.profile_json or {}), **payload.profile}`。没出现的键保持原值。含 `rag` 时会 `validate_retrieval_config`，失败 422。

单条读取走 `GET /api/personas/{id}`；不在本地工作区就是 404 `Persona not found`，对话四条 HTTP 同样。

建议第一次只开最少能力。能力全开会让监督者面对更多确认分支。未知能力 id：`PUT .../capabilities` → 422。

## 3. 先发一句不会写磁盘的话

打开该角色对话，问一件只需要人设回答的事。这条走 `POST /api/personas/{id}/agent/stream`，body `AgentQueryPayload`：

| 字段 | 约束 |
| --- | --- |
| `question` | 1–2000，strip 非空 |
| `conversation_id` | 1–255，strip 非空 |
| `attachment_ids` | 最多 32 个 |

`extra=forbid`，多字段 422。

服务端顺序：

1. 装配 `PersonaAgentContext`
2. `try_persist_text_message` 用户句
3. 执行键 `{persona_id}:{conversation_id}`
4. SSE：`stage / token / result / done`；可能有 `upload_request` / `workflow_update`
5. 浏览器断开 → abort 当前 Job

成功标准：气泡里有角色回复，且没有等待确认。若直接 404，角色不在本地工作区。若 health 正常但没有 token，先看 LLM 是否 configured，再看 SSE 是否被取消。

不要用 `/query` 当工作台主路径；那是不要流式时的 JSON 通道。

`PersonaAgentService.query` 还有两道门：检查点里已有 pending 时，**新问题不能绕过**；能力清单问句直接 `capability_summary()` 不派 Worker。

## 4. 再发一件需要能力的事

例如“查看当前知识库缺什么”。监督者可能分派 `knowledge_worker`（45s，可重试 2 次）或 `config_worker`（45s）。

观察：

- 是否出现等待确认或等待输入（这两种 UI 不同）
- `GET /api/runs/{run_id}` 的状态
- `GET /api/runs/{id}/events?after_sequence=`
- 事件里 **没有** 本地绝对路径和密钥

授权在 `GET/PUT /api/personas/{id}/capabilities`。没授权就去改能力，不要连点发送。未授权的公开码是 `capability_denied` / `capability_not_allowed`。

### 确认 vs 补输入

| 停在哪 | 图状态 | HTTP | 你该做什么 |
| --- | --- | --- | --- |
| 要不要执行 | `pending_confirmation` / Run `waiting_approval` | `POST /api/runs/{id}/approval` 然后 `/agent/stream-resume` | 点卡片，不要打字“继续” |
| 缺文件/缺字段 | `waiting_input` | resume 的 `input_values` / `attachment_ids` | 按卡片补，不要发新问题 |

`ApprovalService.decide`：run 不存在 404；状态不是 `WAITING_APPROVAL` → 409 `INVALID_APPROVAL`；`approved=false` **调用 `runtime.cancel`**，没有单独的 reject RunStatus；`approved=true` 把 Run 标 `RUNNING` 并写 `approval_granted`，**不会**把图跑完。

resume body 是 `AgentResumePayload`：新流程优先 `worker` / `task_id` / `input_values`；`specialist`/`approved` 是旧字段。resume **不再 persist 用户句**。

已经 terminal 的 run 再批是 409。不要再发同一句话开第二条 run。

## 5. 可选：上传一份文档并真正索引

1. 找到该角色知识空间
2. `POST /api/knowledge-spaces/{space_id}/documents/upload`（至少一个文件，201）
3. 没有文件 422 `At least one file is required`；空间不存在 404；类型 415；过大 413
4. `GET /api/documents/{job_id}`
5. `POST /api/documents/{job_id}/confirm`（非法状态 409）
6. 失败可 `POST /api/documents/{job_id}/retry-index`
7. 再问文档里的具体事实

没 confirm 就提问，角色说“没有”是正确行为。`document_worker` 超时 120s，`knowledge_worker` 45s。向量在 Milvus，job 元数据在 SQLite。独立评测入口 `POST /api/personas/{id}/rag/query` 不经过角色口吻，第一次任务不必走它。

## 6. 若任务要写文件或联网

停在确认卡片时：

- 读它列出的动作
- `approved: true` 然后 `/agent/stream-resume`
- `false` → Runtime 取消该 Run
- `POST /api/runs/{id}/cancel` 结束

联网不足时的确认理由是 `local_knowledge_insufficient`。用户明确不要 web 时是 reject `web_explicitly_denied`，不是 confirm。

缺 RVC 音频时是 `waiting_input`（上传），不是确认。dispatch 不会在“正在分析请求…”阶段一次性要模型/Index。

## 7. 什么叫第一次任务完成

同时满足：

1. 同一 `conversation_id` 里能看到用户句和角色回复
2. 若有 Worker，事件里能看到分派而不是前端假进度
3. 若有文档，confirm 之后的提问能引用，而不是只复述人设
4. 失败时有 `error.code`，不是空白转圈
5. 你能说出这一步走的是 REST、SSE 还是 Run approval，而不是“点了那个绿按钮”

## 刻意不要第一次就做的

- RVC 视频转音色（默认 1800s，1 次尝试；意图漏斗不能直达）
- Voice Studio 训练（`voice_worker` 300s 量级，视频上限 400MB）
- 改 Docker / shutdown（`require_local` + 会动本机容器）
- 把 QQ 或直播当第一条输入
- 一上来 PUT 全开 MCP grants（`*` 与具体 persona 不能共存，未来角色 fail-closed）

那些是资源与接入章节的事。第一次任务的意义是把 **角色 → 对话 → Run →（可选）确认或补输入 → 结果** 走通。

## 失败时跳转

- 页面或 403：[常见问题](/troubleshooting/qa)
- 停在确认或 SSE 断开：[任务、文件与连接](/troubleshooting/tasks-connections)
- 资源红灯：[资源安装](/troubleshooting/resources)
- 角色本身：[创建角色](/guide/character)
- 对话合同：[对话与任务](/guide/conversation)
- 错误码表：[排查总则](/troubleshooting)
