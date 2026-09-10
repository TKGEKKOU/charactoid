# 文档、知识与评测 API

**知识不是聊天记录。文档要先入库、确认索引，才能被 `knowledge_worker` 检索；评测是质量工具，不是对话历史。**

源码：`app/routers/documents.py`、`app/routers/rag.py`、`app/routers/eval.py`、`app/routers/eval_dataset.py`、`app/routers/attachments.py`、`agents/graph/knowledge.py`、`rag/`。

角色通过知识空间隔离资料。检索合同由代码约束，客户端不要让模型直接拼 SQL 或文件路径。

## 文档处理

文档任务挂在知识空间与 job 上，而不是“上传完立刻可搜”。

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `POST` | `/api/knowledge-spaces/{space_id}/documents/upload` | 上传并创建处理任务 |
| `GET` | `/api/knowledge-spaces/{space_id}/documents/report` | 空间级文档报告 |
| `GET` | `/api/documents/{job_id}` | 单个处理任务 |
| `GET` | `/api/documents/{job_id}/report` | 任务报告 |
| `POST` | `/api/documents/{job_id}/confirm` | 确认索引 |
| `POST` | `/api/documents/{job_id}/retry-index` | 重试索引 |
| `DELETE` | `/api/documents/{job_id}` | 删除任务/文档 |
| `GET` | `/api/personas/{persona_id}/documents` | 角色可见文档 |

大文件和解析是异步的。客户端必须保存 `job_id`。

典型顺序：

```text
upload
→ GET /api/documents/{job_id} 直到处理完成
→ POST /api/documents/{job_id}/confirm
→ 角色对话里提问
→ 回答带引用；不足时说明 insufficient，不编造
```

未确认索引的文档不应出现在检索结果里。换 Embedding 模型后，旧集合维度可能不匹配，需要新集合，不能“接着用昨天的向量”。

对话附件要进知识库时，走 `POST /api/conversations/{conversation_id}/attachments/{file_id}/send-to-rag`，仍然使用 `file_id` / `attachment_id`，不传本机路径。

## RAG 查询

`app/routers/rag.py` 挂在 `/api/personas`：

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `POST` | `/api/personas/{persona_id}/rag/query` | 按角色知识空间检索 |
| `GET` | `/api/personas/{persona_id}/rag/queries` | 历史查询 |
| `POST` | `/api/personas/{persona_id}/rag/queries/{query_id}/feedback` | 记录反馈 |
| `GET` | `/api/personas/{persona_id}/rag/report` | 检索质量/覆盖报告 |

对话里的知识问题通常不由前端直接打 RAG 路由，而是：

```text
POST /api/personas/{persona_id}/agent/stream
→ Supervisor 委派 knowledge_worker
→ search_persona_knowledge / 结构化查询
→ finalize 校验
→ 引用回到同一条会话
```

调试检索、做评测、看报告时才直接打 `/rag/*`。结构化查询必须走受限合同（`agents/tools/structured_query.py`），禁止把任意 SQL 交给模型执行。

检索失败的合法结果包括：没有命中、证据不足、空间未就绪。这些不是 500。

## 评测运行

`/api/eval`（`app/routers/eval.py`）跑的是知识质量，不是一次闲聊。

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `POST` | `/api/eval/run` | 启动评测，通常 `202` |
| `GET` | `/api/eval/status` | 当前运行状态 |
| `GET` | `/api/eval/results` | 结果 |
| `GET` | `/api/eval/history` | 历史 |
| `GET` | `/api/eval/history/{run_id}` | 单次历史 |
| `GET` | `/api/eval/export` | 导出 |
| `POST` | `/api/eval/analyze` | 分析一次运行 |

评测 `run_id` 和 Agent `run_id` 不要混用。评测失败要看数据集、Embedding、集合名，而不是重发同一句角色对话。

## 评测数据集

`app/routers/eval_dataset.py`：

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `GET` | `/api/knowledge-spaces/{space_id}/eval-cases` | 用例列表 |
| `POST` | `/api/knowledge-spaces/{space_id}/eval-cases` | 新建用例 |
| `GET` | `/api/knowledge-spaces/{space_id}/eval-cases/{case_id}` | 单条 |
| `PATCH` | `/api/knowledge-spaces/{space_id}/eval-cases/{case_id}` | 修改 |
| `DELETE` | `/api/knowledge-spaces/{space_id}/eval-cases/{case_id}` | 删除 |
| `GET` | `/api/knowledge-spaces/{space_id}/eval-candidates` | 候选问答 |
| `POST` | `/api/knowledge-spaces/{space_id}/eval-candidates/sync` | 从对话/检索同步候选 |
| `POST` | `.../eval-candidates/{candidate_id}/approve` | 批准进用例 |
| `POST` | `.../eval-candidates/{candidate_id}/reject` | 拒绝 |

候选不是标准答案。批准之前不要拿候选去“证明系统已经会了”。

## 角色侧文档列表

`GET /api/personas/{persona_id}/documents` 给工作台知识页用。删除或重试仍应打 documents 路由，不要在前端直接操作向量库。

## 失败怎么读

| 现象 | 先看 |
| --- | --- |
| 上传后问不到 | job 是否完成、是否 confirm |
| 维度错误 | Embedding 是否更换、集合名是否仍是旧的 |
| insufficient | 证据不足，属于正常拒答 |
| 结构化查询被拒 | 合同不允许该表/该语句 |
| 评测一直排队 | `/api/eval/status` 与 Embedding 资源状态 |

## 相关页面

- [知识库与记忆](/capabilities/knowledge-memory)
- [RAG 设计](/concepts/rag)
- [持久化](/concepts/persistence)
- [角色、对话与运行 API](/reference/api-agents-runs)
