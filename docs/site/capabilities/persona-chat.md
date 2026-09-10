# 角色与对话

**CHARACTOID 的对话永远属于某个角色。** 角色不是皮肤：它带着人设、授权能力、知识范围、记忆、声音绑定和形象。监督者只用这个角色被允许的工具回答用户。

> **事实依据**：`app/routers/personas.py`、`app/routers/agents.py`、`app/routers/messages.py`、`app/routers/persona_drafts.py`、`app/routers/persona_versions.py`、`agents/graph/supervisor.py`、`agents/capabilities.py`。

## 角色对象

集合接口（空路径）：

- `POST /api/personas` 创建
- `GET /api/personas` 列表
- `GET /api/personas/{persona_id}` 详情
- `PATCH /api/personas/{persona_id}` 更新
- `DELETE /api/personas/{persona_id}` 删除
- `GET /api/personas/{persona_id}/documents` 该角色文档

授权：

- `GET/PUT /api/personas/{persona_id}/capabilities`
- `GET/PUT /api/personas/{persona_id}/mcp-grants`

人设草稿与版本在独立 router 里，避免把“正在编辑”和“正在对话的生效档案”混成一次 PATCH。

`profile_worker` 负责在任务中修改档案（例如欢迎词），超时 30 秒，工具会标写操作。对话里改人设应走 Worker + 确认，而不是 silently PATCH。

## 对话怎么跑

`app/routers/agents.py` 挂在 `/api/personas` 下：

| 路径 | 用途 |
| --- | --- |
| `POST /{persona_id}/agent/stream` | 流式执行 |
| `POST /{persona_id}/agent/stream-resume` | 从中断处继续流 |
| `POST /{persona_id}/agent/query` | 非流式查询 |
| `POST /{persona_id}/agent/resume` | 非流式恢复 |

消息：

- `GET /api/personas/{persona_id}/conversations/{conversation_id}/messages`
- `DELETE /api/personas/{persona_id}/conversations/{conversation_id}`
- `POST .../voice-messages` 发送语音消息
- `GET /api/voice-messages/{message_id}/audio`
- `POST /api/voice-messages/{message_id}/transcribe`

删除会话是破坏性的。导出可用 `export_conversation` 工具（extended tools），不要靠复制 DOM。

## 监督者在中间做什么

图在 `agents/graph/build.py` 装配，监督者实现于 `agents/graph/supervisor.py`。意图漏斗在 `agents/intent_funnel.py`。典型路径：

1. 接收用户输入（文本或听写结果）；
2. 判断是直接回答，还是委派 Worker；
3. 按角色 capabilities 过滤工具；
4. Worker 返回合同字段；
5. finalize 校验；
6. 以角色口吻回复，并把 artifacts 留在同一任务。

落地页系统章用八个 Worker 案例把这条链可视化，和源码清单一一对应，并不是另编的演示数据。

## 流式与可恢复

长任务（文档 120s、语音 300s、RVC 1800s）不能把 HTTP 请求当成事务边界。正确做法：

- 用 stream 把监督者增量事件推给 UI；
- 同时持有 `run_id`；
- 刷新后 `stream-resume` / `resume`，或直接读 `GET /api/runs/{id}/events`。

HITL：Worker `requires_approval` 为真时，UI 出确认卡，`POST /api/runs/{id}/approval`。取消走 `/cancel`。

## 角色能力不是全开

内置 Tool 按 Worker 切片；Skill 与 MCP 要额外授权。没授权的 MCP 工具不会因为“模型想用”就出现。这是 `tools_for_specialist` 和 mcp-grants 的合页。

继续阅读：[创建第一个角色](/guide/character)、[对话与附件](/guide/conversation)、[Agent 与 Worker](/development/agent-worker)。
