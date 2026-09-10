# 对话与任务

**对话页是监督者的用户界面。** 一句普通闲聊可以只生成回复；一句带目标的话会变成 Run，可能分派 Worker、等待确认、写入附件，再回到同一 `conversation_id`。

> **事实依据**：`app/routers/agents.py`、`app/routers/runs.py`、`app/chat_store.py`、`app/conversation_summary.py`、`agents/context_factory.py`、`agents/confirmation_policy.py`、`agents/runtime/events.py`、`agents/graph/supervisor.py`。

## 四条 HTTP

前缀都在 `/api/personas/{persona_id}/agent`：

| 路径 | 形态 | 何时 |
| --- | --- | --- |
| `POST /stream` | SSE | 新问题，页面主路径 |
| `POST /query` | JSON `AgentTurnResponse` | 不要流式时 |
| `POST /stream-resume` | SSE | 确认后继续，流式 |
| `POST /resume` | JSON | 确认后继续，一次性 |

`AgentQueryPayload` 带 `question`、`conversation_id`、`attachment_ids`。角色不存在或不在本地工作区 → 404 `Persona not found`。

## stream 内部顺序

1. `persona_agent_context_from_session` 装配上下文（人设、能力、附件、runtime）
2. 用户文本落库 `try_persist_text_message`
3. 执行键 `{persona_id}:{conversation_id}`
4. `realtime_executions.run_stream`
5. 监听 `request.is_disconnected()`，断开就停
6. 特殊 `clone_session` → 前端 `upload_request`
7. `result` 后做 `_finalize_agent_turn`（含附件 id 提取、可能的摘要调度）

Resume **不会**再 persist 用户句。重复点发送才会变成两条用户消息。

SSE 事件要让浏览器拿到对象而不是字符串：`AgentTurnResult` 是内部 dataclass，必须 `response_for(result).model_dump(by_alias=True)`。用 `json.dumps(default=str)` 会把答案、附件和 workflow 弄丢。

公开事件形态收敛为 `stage / token / result / done`（以及错误）。workflow 若存在，会从 result 再派生事件，`task_id` 来自 result 或 artifacts。

## 普通闲聊 vs 任务

监督者看意图：

- 纯人设问答：直接回复，不一定有 Worker
- 检索 / 记忆 / 改档案 / 语音 / 变声 / 装资源：分派对应 Worker
- 能力未开：`reject` → `capability_denied`
- 写操作或本地知识不足要联网：`confirm`

前端应根据事件 `stage` 画过程，不要自己用 setTimeout 假进度。Worker 不对用户说话；用户只看到监督者组织后的回复。

## 确认

确认发生在 Run 上，不是发生在下一句聊天里。纯函数决策见 `agents/confirmation_policy.py`：

- 能力未开 → reject
- 能力要求确认 → confirm
- 用户明确不要 web → reject
- 已授权的 web / 新鲜外部事实 → direct
- 本地知识不足 → confirm `local_knowledge_insufficient`

操作：

- 继续：`POST /api/runs/{id}/approval` `{ "approved": true }` 然后 resume
- 拒绝：`approved: false` → `confirmation_denied`
- 取消：`POST /api/runs/{id}/cancel`

非法状态转换 409。已经 terminal 的 run 不能再批（`run_terminal` / `invalid_approval`）。找不到 run 是 404 `run_not_found`。

## 事件卫生

推到浏览器的 details 经过清洗。不要指望看到完整 prompt、工具原始参数里的路径、密钥。UI 调试用 `run_id` + `code` + Worker `trace` 字段。`GET /api/runs/{id}/events?after_sequence=` 用来续拉，不要全量重放当进度条。

## 摘要与记忆

一轮结束后可能 `schedule_summary_after_turn`。这是会话压缩，不是记忆 Worker。记忆写入要用户明确“记住…”，走 `memory_worker`，30s 超时、不重试。换 `persona_id` 记忆不会跟着走。

工作区记忆和角色记忆是两套；`workspace_memories_for_context` / `memories_for_context` 在监督者装配上下文时读入，不在前端 localStorage。

## 附件与结果

结果里的文件、音频应作为 artifacts 回到**当前对话**。RVC 完成不是去资源页另开下载窗口就结束；监督者要把产物收束到同一条任务。前端工作台的“结果卡片”应对这个合同，而不是另起上传记录。

上传知识文档不走 agent 附件字段，走知识空间 upload + document confirm。附件 `attachment_ids` 是对话轮次的输入，不是索引流水线。

## 接入通道

QQ / 直播把外部消息变成同一套 `question + conversation`。它们不走另一套人格。排查“直播不回答”时，先看 integrations 是否 connected，再看该角色对话里是否出现对应 user 消息。OneBot WebSocket 路由与 integrations 路由是分开注册的。

## 建议的操作纪律

1. 一条目标没结束前，不要复制粘贴再发一遍
2. 等确认时去点卡片，不要在输入框解释“你继续吧”（那是新问题）
3. 看失败先看 `code` 再看模型
4. 换角色就是换 `persona_id`，不要指望记忆跟着走
5. 关掉页面会 abort 当前 stream；要续的是 Run / resume，不是“再把上一句贴回去”

## 相关

[第一次任务](/guide/first-task) · [生命周期](/concepts/lifecycle) · [事件](/reference/events) · [Agent/Run API](/reference/api-agents-runs)
