# 第一次完整任务

**目标：从安装后的空白工作台，走到一条带确认、带结果的真实任务。** 不要一上来就训练音色或变声。

> **事实依据**：`app/startup/routes.py` 的入口与健康检查、`app/main.py`、`app/routers/personas.py`、`app/routers/agents.py`、`app/routers/runs.py`、`app/routers/documents.py`、`app/routers/settings.py`、`agents/registry.py` 超时表、`agents/confirmation_policy.py`。

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

在设置里配置对话模型并探测（`probe_llm`）。普通设置 GET **不返回 API key 明文**，只返回是否已配置。没有可用 LLM 时，后面的 stream 不会出现正常 token，也不要这时去装 RVC。

## 2. 建一个角色

`POST /api/personas`，body 是名字和 profile，201。列表 `GET /api/personas` 只返回 `workspace_id == LOCAL_WORKSPACE_ID` 的角色，排序 `created_at, id`。

记下 `persona_id`。之后所有对话、能力、文档都挂在这个 id 上。内置指南角色受 `BuiltinPersonaProtected` 保护，不要拿它当可以随便删的试验品。

单条读取走 `GET /api/personas/{id}`；不在本地工作区就是 404 `Persona not found`，对话四条 HTTP 同样。

建议第一次只开最少能力。能力全开会让监督者面对更多确认分支。

## 3. 先发一句不会写磁盘的话

打开该角色对话，问一件只需要人设回答的事，例如角色是谁、能做什么。这条走 `POST /api/personas/{id}/agent/stream`：

- 用户句会先 `try_persist_text_message`
- SSE 事件 `stage / token / result / done`
- 执行键是 `persona_id:conversation_id`
- 浏览器断开连接会 abort

成功标准：气泡里有角色回复，且没有等待确认。若直接 404，角色不在本地工作区。若 health 正常但没有 token，先看 LLM 是否 configured，再看 SSE 是否被取消。

不要用 `/query` 当工作台主路径；那是不要流式时的 JSON 通道。

## 4. 再发一件需要能力的事

例如“查看当前知识库缺什么”。监督者可能分派 `knowledge_worker`（45s，可重试 2 次）或 `config_worker`（45s）。

观察：

- 是否出现等待确认（能力未授权或策略要求 confirm）
- `GET /api/runs/{run_id}` 的状态
- `GET /api/runs/{id}/events?after_sequence=`
- 事件里 **没有** 本地绝对路径和密钥

授权在 `GET/PUT /api/personas/{id}/capabilities`。没授权就去改能力，不要连点发送。未授权的公开码是 `capability_denied`。

若策略要确认，去点卡片：`POST /api/runs/{id}/approval`。不要在输入框写“继续”。

## 5. 可选：上传一份文档并真正索引

1. 找到该角色知识空间
2. `POST /api/knowledge-spaces/{space_id}/documents/upload`（至少一个文件，201）
3. 空文件列表 422 `At least one file is required`；空间不存在 404 `Knowledge space not found`
4. 等 conversion job：`GET /api/documents/{job_id}`
5. `POST /api/documents/{job_id}/confirm`
6. 失败可 `POST /api/documents/{job_id}/retry-index`
7. 再问文档里的具体事实

没 confirm 就提问，角色说“没有”是正确行为。`document_worker` 超时 120s，`knowledge_worker` 45s。向量在 Milvus，job 元数据在 SQLite，二者不同步时优先看 job `status`，不要先删模型目录。

## 6. 若任务要写文件或联网

停在确认卡片时：

- 读它列出的动作
- `POST /api/runs/{id}/approval` `approved: true` 然后 `/agent/stream-resume`
- `false` → `confirmation_denied`
- `cancel` 结束
- 已经结束的 run 再批是 409
- 不要再发同一句话开第二条 run

联网不足时的确认理由是 `local_knowledge_insufficient`。用户明确不要 web 时是 reject，不是 confirm。

## 7. 什么叫第一次任务完成

同时满足：

1. 同一 `conversation_id` 里能看到用户句和角色回复
2. 若有 Worker，事件里能看到分派而不是前端假进度
3. 若有文档，confirm 之后的提问能引用，而不是只复述人设
4. 失败时有 `error.code`，不是空白转圈
5. 你能说出这一步走的是 REST、SSE 还是 Run approval，而不是“点了那个绿按钮”

## 刻意不要第一次就做的

- RVC 视频转音色（默认 1800s，1 次尝试）
- Voice Studio 训练（`voice_worker` 300s 量级，还要材料）
- 改 Docker / shutdown（`require_local` + 会动本机容器）
- 把 QQ 或直播当第一条输入
- 一上来 PUT 全开 MCP grants

那些是资源与接入章节的事。第一次任务的意义是把 **角色 → 对话 → Run →（可选）确认 → 结果** 走通。

## 失败时跳转

- 页面或 403：[常见问题](/troubleshooting/qa)
- 停在确认或 SSE 断开：[任务、文件与连接](/troubleshooting/tasks-connections)
- 资源红灯：[资源安装](/troubleshooting/resources)
- 角色本身：[创建角色](/guide/character)
- 错误码表：[排查总则](/troubleshooting)
