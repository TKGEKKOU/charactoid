# 文档、知识与评测 API

## 文档处理

文档路由提供上传、处理任务查询、确认索引、重试索引和删除：

- `GET /api/documents`；
- `GET /api/documents/{job_id}`；
- `POST /api/documents/{job_id}/confirm`；
- `POST /api/documents/{job_id}/retry-index`；
- `DELETE /api/documents/{job_id}`。

大文件和解析任务通常异步执行，先保存返回的 `job_id`。

## RAG 与结构化查询

RAG 路由挂在 `/api/personas` 下，由角色关联知识空间和知识工具。结构化查询必须使用受限合同，不要在客户端让模型直接生成任意 SQL。

## 评测数据集

评测数据集接口覆盖：

- 评测用例列表、创建、修改和删除；
- 候选问答同步、批准和拒绝；
- 评测运行启动、状态、结果和历史；
- 单次运行分析与结果导出。

评测运行接口以 `/api/eval` 为前缀，通常使用 `202` 表示后台运行已创建。

## 示例流程

```text
上传文档
→ GET /api/documents/{job_id}
→ POST /api/documents/{job_id}/confirm
→ 在角色对话中提问
→ 查看引用和证据
→ 将失败问题加入评测数据集
→ 执行评测并导出
```
