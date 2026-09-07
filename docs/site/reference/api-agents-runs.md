# 角色、对话与运行 API

## 角色

角色路由以 `/api/personas` 为前缀，覆盖角色创建、列表、读取、更新、删除以及角色关联的知识、声音和能力。版本与草稿也复用角色前缀。

常见操作：

```powershell
Invoke-RestMethod http://127.0.0.1:18000/api/personas
```

具体请求体以 OpenAPI schema 为准，避免在客户端硬编码未声明字段。

## Agent 调用

### `POST /api/personas/{persona_id}/agent/query`（稳定）

执行一轮非流式 Agent 请求，适合脚本和简单客户端。

### `POST /api/personas/{persona_id}/agent/stream`（稳定）

执行流式 Agent 请求，前端可以逐步接收消息、Worker 状态和结果。

### `POST /api/personas/{persona_id}/agent/resume`（稳定）

恢复等待输入或检查点中的运行。

### `POST /api/personas/{persona_id}/agent/stream-resume`（稳定）

以流式方式恢复运行。

> Agent 请求中的确认、恢复和任务引用必须来自当前运行，不要通过重复发送自然语言消息模拟恢复。

## Run

`/api/runs` 提供运行读取、事件、取消、恢复或任务状态相关接口。一个 run 可以包含多个 Worker 和后台 job。

## 消息和附件

消息路由负责会话消息与语音输出；附件路由包括：

- `POST /api/conversations/{conversation_id}/attachments`；
- `GET /api/conversations/{conversation_id}/attachments`；
- `GET/PATCH/DELETE /api/conversations/{conversation_id}/attachments/{file_id}`；
- `POST .../{file_id}/send-to-rvc`；
- `POST .../{file_id}/send-to-rag`。

文件上传成功只代表资产已登记，后续处理仍需查看任务状态。
