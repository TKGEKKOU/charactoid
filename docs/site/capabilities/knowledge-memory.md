# 知识与记忆

**知识是可引用的材料，记忆是角色范围内的笔记。** 两者都按角色或工作区隔离。检索到的片段要带着出处回到监督者；记忆写入是变更，不是聊天修辞。

> **事实依据**：`app/routers/rag.py`、`app/routers/documents.py`、`app/schemas.py`（`RagQueryPayload`）、`agents/graph/knowledge.py`、`agents/tools/knowledge.py`、`agents/tools/memory.py`、`agents/tools/workspace_memory.py`、`agents/context_budget.py`、`agents/confirmation_policy.py`、`agents/registry.py`、`persona.service.resolve_knowledge_scope`。

## 为什么要拆开

| | 知识 | 记忆 |
| --- | --- | --- |
| 来源 | 文档、URL 导入、结构化表 | 用户交代、对话中明确“记住” |
| Worker | `knowledge_worker`、`document_worker` | `memory_worker` |
| 超时 | 检索 45s（2 次，0.5s）；文档 120s（2 次，1s） | 30s，1 次 |
| 存储 | 元数据在 SQLite `DocumentJob`；向量在 Milvus | SQLite `PersonaMemory` / `WorkspaceMemory` |
| 输出重点 | evidence、citations、uncertainties | `status` + `memory_id` |
| 失败时 | 宁可说不知道，也不要编流程 | 找不到就 `LookupError`，不要写到别的角色 |

落地页把“知识”按钮和人设绑到同一段管理页视频，是因为配置入口在角色对象上；运行时仍是不同 Worker。

## 知识怎么进系统

文档入口在 `app/routers/documents.py`，不要和对话附件 `attachment_ids` 混用。

```text
upload → conversion job → GET job → confirm →（失败）retry-index → knowledge_worker 可检索
```

`POST /api/knowledge-spaces/{space_id}/documents/upload`：

| 条件 | HTTP | `detail` |
| --- | ---: | --- |
| 没有文件 | 422 | `At least one file is required` |
| 空间不存在 | 404 | `Knowledge space not found` |
| 类型不支持 | 415 | `Unsupported file type` |
| 文件过大 | 413 | `File too large` |
| 转换失败 | 422 | `Document conversion failed` 或 `str(exc)` |

源码里**没有** `EMPTY_FILE`。空文件 422 是语音路由的规则。

其它文档 HTTP：

| 路径 | 作用 |
| --- | --- |
| `GET /api/knowledge-spaces/{space_id}/documents/report` | 空间处理摘要；空间不存在 404 |
| `GET /api/documents/{job_id}` | job 状态 |
| `POST /api/documents/{job_id}/confirm` | 确认索引；非法状态 409 `Invalid document state` |
| `POST /api/documents/{job_id}/retry-index` | 重试索引；非法状态同样 409 |
| `GET /api/documents/{job_id}/report` | 单 job 处理报告 |
| `DELETE /api/documents/{job_id}` | 见下一节 |

job 不存在：`get_job_or_404` → 404 `Document job not found`。没 confirm 的文档不会稳定出现在 `knowledge_worker` 的证据里。这是最常见的“我传了但角色说没有”。

## 删除文档会清向量

`DELETE /api/documents/{job_id}` 成功返回 **204**。若 job 处于 `indexing` / `indexed` / `index_failed`，会先 `MilvusRagStore().delete_document`：

- 向量删除失败 → **502** `Failed to remove document vectors: ...`
- 成功后再 `delete_structured_document`、清 staging、`session.delete(job)`

`indexing` 也可能已有部分向量（后台任务与删除并发），所以这一步会一并清理。删角色 API **不会**自动走这条路径。

## 独立 RAG API

`app/routers/rag.py` 前缀 `/api/personas`。这条路**不经过**监督者口吻。`force_knowledge=True`：源码注释写明该路由语义就是知识问答，不能被内部交互路由降级为闲聊。

`POST /{persona_id}/rag/query` body 是 `RagQueryPayload`（`extra=forbid`）：

| 字段 | 约束 |
| --- | --- |
| `question` | 1–2000，strip 后非空 |
| `conversation_id` | 可选，最长 255 |

角色解析走 `resolve_knowledge_scope`；`PersonaNotFound` → 404 `Persona not found`。`RagQueryContext` 带 `persona_id`、`workspace_id`、`knowledge_space_ids`、`conversation_id`。`allow_web_fallback` 来自 **当前** `Settings.enable_web_fallback`，不是请求体字段。`retrieval_config` 来自 `persona.profile_json["rag"]`。

底层异常被收成 `RagResult.failed(DEPENDENCY_UNAVAILABLE)`，避免配置错误变成 500。每次查询尝试写入 `RagQueryRecord`；写库失败会 rollback，**仍返回完整答案**（`query_id` 可能为 null）。质量记录不能阻断线上问答。

`RagQueryResponse` 公开字段：`query_id`、`answer`（`answer_draft`）、`evidence`、`confidence`、`used_web_search`、`trace`、`grounded`、`useful`、`missing_points`、`error_code`、`error_message`、`interaction_mode`。

其它：

| 路径 | 作用 |
| --- | --- |
| `GET /{persona_id}/rag/queries` | 历史查询记录 |
| `POST /{persona_id}/rag/queries/{query_id}/feedback` | `RagFeedbackPayload`：`helpful` + 可选 `note`（≤2000） |
| `GET /{persona_id}/rag/report` | 质量报告 |

对话走 `/agent/stream|query`，内部才可能派 `knowledge_worker`。不要把两个入口的返回形状当成同一个。

## knowledge_worker 子图

```text
knowledge_planner → knowledge_retrieve → knowledge_fallback → finalize_knowledge_worker
```

Planner 工具只有计划合同：`search_persona_knowledge` / `query_structured_data`。retrieve 跑确定性检索或只读 SQL。结构化结果有行数上限，截断时附加“结果已按安全上限截断。”

`knowledge_fallback` 仅在合同带 `web_fallback` 且 status 不是 `accepted` 时工作：

1. stage：“正在检查联网搜索政策...”
2. `decide_web_fallback(intent)`
3. `direct` → 立刻搜；`confirm` → `request_confirmation(tool=web_search_confirmation)`；否则不搜
4. 有 `web_rag_executor` 时走严格 RAG；测试注入旧 executor 时只格式化结果
5. 失败合同：`error_code = FAILED_RETRIEVAL`，公开文案经 `public_rag_error_message`

`GraphInterrupt` 必须上抛，不能吞成检索失败。

工具层面（对话 Worker）：

- `search_persona_knowledge`：当前角色知识空间
- `list_persona_documents` / `delete_persona_document`
- `list_structured_tables` / `query_structured_data`
- `import_knowledge_from_url`（写，通常要确认）
- `web_search`：仅当 fallback 政策允许

检索必须带工作区和知识空间过滤。换向量模型后不能复用维度不同的旧集合。设计见 [RAG](/concepts/rag)。

## 记忆：两张表、两套工具

### 角色记忆 `PersonaMemory`

`agents/tools/memory.py`。所有 SQL 都带 `workspace_id` **和** `persona_id`。

| 工具 | 行为 |
| --- | --- |
| `read_persona_memories` | 按 `updated_at, id` 倒序；`limit` 夹在 1–100，默认 20 |
| `save_persona_memory` | `content.strip()` 空则 `ValueError`；返回 `{status:saved, memory_id, content}` |
| `update_persona_memory` | 按 id + workspace + persona 定位；没有 → `LookupError("Persona memory not found")` |
| `delete_persona_memory` | 同上隔离删除 |

读出字段只有 `id` / `content` / `updated_at`。没有跨角色“全局笔记”。

### 工作区记忆 `WorkspaceMemory`

`agents/tools/workspace_memory.py`。只按 `workspace_id` 过滤，**没有** `persona_id`。

| 工具 | 行为 |
| --- | --- |
| `read_workspace_memories` | `id` 倒序；limit 1–50，默认 12 |
| `save_workspace_memory` | 空内容 ValueError；**超过 2000 字符** ValueError `too long` |
| `delete_workspace_memory` | 找不到 → `LookupError("Workspace memory not found")` |

角色记忆没有 2000 上限这段校验；工作区记忆有。监督者装配上下文时两套都会读：`memories_for_context` / `workspace_memories_for_context`。不要放进 localStorage。

写工具在注册表标 `mutates_data=True`。监督者在“记住：直播用绑定音色”这类句子里应委派 `memory_worker`，而不是让知识检索去“假装记住”。换 `persona_id` 角色记忆不会跟着走；工作区记忆仍在同一 `workspace_id`。

没有 session_factory 时两套工具都 `RuntimeError("Database session is unavailable")`。

## 上下文预算

`agents/context_budget.py`：`ContextBudget.max_tokens` 默认 **6000**，最小值 32。优先 `tiktoken` `cl100k_base`；导入失败则 `4 + ceil(len/4)`。按 HumanMessage 切块丢弃旧轮，并丢掉孤儿 ToolMessage。观测可记 `tokens_before/after` 和 `dropped_messages`；公开事件不含原文。

## 监督者怎么用检索结果

- 有证据才把步骤写具体
- 没证据进 uncertainties，而不是补全成教程腔
- 引用指向文档/片段 ID，而不是本地路径
- 联网不足：`local_knowledge_insufficient` 要确认；用户明确不要 web：`web_explicitly_denied`

## 相关

[RAG 设计](/concepts/rag) · [对话与任务](/guide/conversation) · [文档、知识与评测 API](/reference/api-knowledge) · [数据边界](/concepts/data-boundaries)
