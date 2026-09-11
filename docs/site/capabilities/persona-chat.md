# 角色与对话

**CHARACTOID 的对话永远属于某个角色。** 角色不是皮肤：它带着人设、授权能力、知识范围、记忆、声音绑定和形象。监督者只用这个角色被允许的工具回答用户。

> 事实依据：`app/routers/personas.py`、`app/routers/agents.py`、`app/routers/messages.py`、`app/routers/runs.py`、`app/routers/persona_drafts.py`、`app/routers/persona_versions.py`、`agents/graph/supervisor.py`、`agents/runtime/approvals.py`、`agents/confirmation_policy.py`。

## 角色对象

集合接口：

- `POST /api/personas` 创建
- `GET /api/personas` 列表（只返回 `workspace_id == LOCAL_WORKSPACE_ID`）
- `GET /api/personas/{persona_id}` 详情
- `PATCH /api/personas/{persona_id}` 浅合并更新
- `DELETE /api/personas/{persona_id}` 删除
- `GET /api/personas/{persona_id}/documents` 该角色知识空间里的文档

授权：

- `GET/PUT /api/personas/{persona_id}/capabilities`
- `GET/PUT /api/personas/{persona_id}/mcp-grants`

人设草稿与版本在独立 router 里，避免把「正在编辑」和「正在对话的生效档案」混成一次 PATCH。

`profile_worker` 负责在任务中修改档案（例如欢迎词），超时 30 秒。对话里改人设应走 Worker + 确认，而不是 silently PATCH。

## PATCH 是浅合并

`PATCH /api/personas/{persona_id}` 更新 `profile` 时不是整份替换：

```python
merged = {**(persona.profile_json or {}), **payload.profile}
```

只覆盖本次提交的键。没出现的键保持原值。如果合并结果里有 `rag`，会走 `validate_retrieval_config`；失败 **422**，`detail` 为 `Invalid RAG configuration: ...`。

`local_persona_or_404` 在记录不存在**或**不属于本地工作区时，一律 **404** `Persona not found`。不要根据这条 404 区分「id 写错」还是「工作区不对」——对外是同一句话。

## 删除、草稿、版本

`DELETE /api/personas/{persona_id}` 走 `persona_delete_service`：

- 内置角色 → **403** `内置角色不能删除`
- 成功后删除 `data/tts/voices/{persona_id}.wav`（`unlink(missing_ok=True)`），再 **204**
- 删角色会级联会话/授权等应用数据；**不会**在这一步清掉 Milvus 里所有切片
- 文档向量删除走 `DELETE /api/documents/{job_id}`
- checkpoint 前缀是 `persona_id:%`，见任务生命周期

草稿不是生效档案。版本页保存的是可回滚快照。工作台如果把草稿 id 拿去 `agent/stream`，会 404 或跑到错误档案上。

## 能力与 MCP 授权

`PUT /api/personas/{persona_id}/capabilities`：未知能力 id 返回 **422** `Unknown capabilities: ...`。以 `/*` 结尾的通配（`endswith("/*")`）不算未知。

MCP：

- 管理器未挂到 `app.state.mcp_manager` → **503** `MCP 管理器尚未就绪`
- `*` 表示授权该服务器全部工具，**不能**与同一服务器下的具体工具名共存；混写会被拒绝
- 没授权的 MCP 工具不会因为「模型想用」就出现。这是 `tools_for_specialist` 和 mcp-grants 的合页

`agents/confirmation_policy.py` 把能力决策收成三种模式：

| 模式 | 何时 | 对外 |
| --- | --- | --- |
| `direct` | 已授权且不需要确认 | 直接进 Worker |
| `confirm` | 能力声明要确认，或本地知识不够要联网 | 等待审批 |
| `reject` | 未授权，或用户明确禁止 web | 不执行 |

常见原因码：`capability_not_allowed` / `capability_requires_confirmation` / `local_knowledge_insufficient` / `web_explicitly_denied`。

## 对话怎么跑

`app/routers/agents.py` 挂在 `/api/personas` 下：

| 路径 | 用途 |
| --- | --- |
| `POST /{persona_id}/agent/stream` | 流式执行（SSE：stage / token / result / done） |
| `POST /{persona_id}/agent/stream-resume` | 从中断处继续流 |
| `POST /{persona_id}/agent/query` | 非流式查询 |
| `POST /{persona_id}/agent/resume` | 非流式恢复 |

同一角色同一会话的实时执行键是：

```text
persona_id:conversation_id
```

浏览器断开时，`_watch_request_disconnect` 会中止这条键上的实时执行。不要开两个标签页对同一会话同时 `stream`。

**resume 不再把用户那句话持久化一遍。** 用户句只在首次 `stream` / `query` 入账。恢复走的是已有 run / checkpoint，body 里不要再塞一条「假装新消息」的用户文本。

消息：

- `GET /api/personas/{persona_id}/conversations/{conversation_id}/messages`
- `DELETE /api/personas/{persona_id}/conversations/{conversation_id}`
- `POST .../voice-messages` 发送语音消息
- `GET /api/voice-messages/{message_id}/audio`
- `POST /api/voice-messages/{message_id}/transcribe`

删除会话是破坏性的。导出用 `export_conversation` 工具（extended tools），不要靠复制 DOM。

## 监督者在中间做什么

图在 `agents/graph/build.py` 装配，监督者实现于 `agents/graph/supervisor.py`。意图漏斗在 `agents/intent_funnel.py`。典型路径：

1. 接收用户输入（文本或听写结果）
2. 判断是直接回答，还是委派 Worker
3. 按角色 capabilities 过滤工具
4. Worker 返回合同字段
5. finalize 校验
6. 以角色口吻回复，并把 artifacts 留在同一任务

落地页系统章用八个 Worker 案例把这条链可视化，和源码清单一一对应，并不是另编的演示数据。

## 流式、审批、取消

长任务（文档 120s、语音 300s、RVC 1800s）不能把 HTTP 请求当成事务边界。正确做法：

- 用 stream 把监督者增量事件推给 UI
- 同时持有 `run_id`
- 刷新后 `stream-resume` / `resume`，或读 `GET /api/runs/{id}/events?after_sequence=`

HITL：Worker `requires_approval` 为真时，UI 出确认卡。

`POST /api/runs/{run_id}/approval` body：`{ "approved": true|false }`

- run 不存在 → `run_not_found`（404）
- 不在等待审批 → `invalid_approval`（409）
- `approved=true` → 状态改为 running，追加 `approval_granted` 事件，随后 resume
- **`approved=false` 没有独立 reject 接口**，内部直接 `runtime.cancel(run_id)`

取消也可以 `POST /api/runs/{run_id}/cancel`。取消不会悄悄改本地文件；真正写文件的 Worker 必须先过确认。

事件细节经过 `observability.sanitize_details`，**不会**把 prompt、密钥、本地路径原样推到前端。

变声/训练类事件可能被改写成 `upload_request`，看起来像「没回答」，其实在等材料。

## 失败码怎么读

| code | 含义 | 不要做的事 |
| --- | --- | --- |
| `provider_unavailable` | 模型服务暂时不可用 | 不要立刻换角色重开 |
| `worker_timeout` | 模块超时 | 先对上表里的超时再重试 |
| `worker_failed` | 模块失败 | 先看 artifacts / error |
| `capability_denied` | 角色没授权 | 去能力页，不要重发同一句 |
| `confirmation_denied` | 未获确认 | 这是拒绝，不是崩溃 |
| `checkpoint_unavailable` | 不能 resume | 重新发起 |
| `runtime_restarted` | 服务重启后未完成运行已结束 | 重新发起 |
| `run_terminal` | 已经结束 | 不要再 approval/cancel |

继续阅读：[创建第一个角色](/guide/character)、[对话与附件](/guide/conversation)、[Agent 与 Worker](/development/agent-worker)、[任务生命周期](/development/lifecycle)。

