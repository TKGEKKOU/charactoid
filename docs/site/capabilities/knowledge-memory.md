# 知识与记忆

**知识是可引用的材料，记忆是角色范围内的笔记。** 两者都按角色隔离。检索到的片段要带着出处回到监督者；记忆写入是变更，不是聊天修辞。

> **事实依据**：`app/routers/rag.py`、`app/routers/documents.py`、`agents/graph/knowledge.py`、`agents/tools/knowledge.py`、`agents/tools/memory.py`、`agents/tools/workspace_memory.py`、`agents/registry.py`。

## 为什么要拆开

| | 知识 | 记忆 |
| --- | --- | --- |
| 来源 | 文档、URL 导入、结构化表 | 用户交代、对话中明确“记住” |
| Worker | knowledge_worker、document_worker | memory_worker |
| 超时 | 检索 45s；文档 120s | 30s |
| 输出重点 | evidence、citations、uncertainties | 已读/已写的条目 |
| 失败时 | 宁可说不知道，也不要编流程 | 不要写到别的角色 |

落地页把“知识”按钮和人设绑到同一段管理页视频，是因为配置入口在角色对象上；运行时仍是不同 Worker。

## 知识怎么进系统

1. 文档进入角色：`document_worker` 处理上传、清洗、切分、写元数据。
2. 索引不是上传成功的同义词。确认索引后，`knowledge_worker` 才能检索。
3. `POST /api/personas/{persona_id}/rag/query` 提供独立 RAG 查询；`GET .../rag/queries` 和 feedback、report 用于评测与复盘。
4. Embedding / reranker 是可选资源。换向量模型后不能复用维度不同的旧集合。

工具层面：

- `search_persona_knowledge`：当前角色知识空间
- `list_persona_documents` / `delete_persona_document`
- `list_structured_tables` / `query_structured_data`
- `import_knowledge_from_url`（写，通常要确认）
- `web_search`：仅当 `Settings.enable_web_fallback` 打开，且监督者决定需要补公共信息

`knowledge_worker` 的 Manifest 把 `requires_confirmation` 设为真（源码：该 worker 本身或任一工具需要确认）。联网补全尤其不能在无确认时变成默认动作。

## 记忆怎么隔离

`memory_worker` 工具：

- 角色记忆：`read_persona_memories`、`save_persona_memory`、`update_persona_memory`、`delete_persona_memory`
- 工作区记忆：`read_workspace_memories`、`save_workspace_memory`、`delete_workspace_memory`

写工具标了 `mutates_data=True`。监督者在“记住：直播用绑定音色”这类句子里应委派 memory_worker，而不是让知识检索去“假装记住”。

记忆不是无限上下文。上下文预算在 `agents/context_budget.py`，观测里会记录 `context_tokens_before/after` 和 dropped messages，但公开事件不会包含原文。

## 监督者怎么用检索结果

Worker 输出合同要求 `evidence`、`citations`、`uncertainties`。监督者应当：

- 有证据才把步骤写具体；
- 没证据就进入 uncertainties，而不是补全成教程腔；
- 引用指向文档/片段 ID，而不是本地路径。

这和落地页系统章的文案一致：知识检索案例里“依据 voice.md；缺证据的步骤不会写死”。

## 独立 RAG API 和对话 API 的关系

对话走 `/api/personas/{id}/agent/stream|query`，监督者内部可能调用 knowledge_worker。评测和调试可以走 `/rag/query`，不经过角色口吻。不要把两个入口的返回形状当成同一个。

更多设计见 [RAG 设计](/concepts/rag)，接口见 [文档、知识与评测 API](/reference/api-knowledge)。


## 上传不是检索

文档入口在 `app/routers/documents.py`，不要和对话附件混用。

`POST /api/knowledge-spaces/{space_id}/documents/upload`：

| 条件 | HTTP | `detail` |
| --- | ---: | --- |
| 没有文件 | 422 | `At least one file is required` |
| 空间不存在 | 404 | `Knowledge space not found` |
| 类型不支持 | 415 | `Unsupported file type` |
| 文件过大 | 413 | `File too large` |
| 其它转换失败 | 422 | `Document conversion failed` 或同类转换错误 |

源码里**没有** `EMPTY_FILE`。不要写“空文件 422”——那是语音路由对空音频的规则，不是文档上传。

上传成功只产生 conversion job。检索可用之前还要：

1. `GET /api/documents/{job_id}` 看状态；
2. `POST /api/documents/{job_id}/confirm` 确认索引；
3. 失败才 `POST /api/documents/{job_id}/retry-index`。

`confirm` 与 `retry-index` 在非法状态时 **409** `Invalid document state`。没 confirm 的文档不会稳定出现在 `knowledge_worker` 的证据里。这是最常见的“我传了但角色说没有”。

## 删除文档会清向量

`DELETE /api/documents/{job_id}` 返回 **204**。若 job 处于 `indexing` / `indexed` / `index_failed`，会先 `MilvusRagStore().delete_document`：

- 向量删除失败 → **502** `Failed to remove document vectors: ...`；
- 成功后再 `delete_structured_document`、清 staging、`session.delete(job)`。

`indexing` 也可能已有部分向量（后台任务与删除并发），所以这一步会一并清理，避免孤儿向量。删角色 API **不会**自动走这条路径。

## Worker 超时（对照 registry）

`agents/registry.py` 的 `_WORKER_EXECUTION_DEFAULTS`：

| Worker | 超时 | attempts | backoff |
| --- | ---: | ---: | ---: |
| knowledge | 45s | 2 | 0.5 |
| memory | 30s | 1 | — |
| document | 120s | 2 | 1.0 |

联网补全走 `decide_web_fallback`：用户明确否定 web 则拒绝；本地知识不够则确认，而不是默默上网。
