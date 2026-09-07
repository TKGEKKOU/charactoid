# 任务、文件与连接排查

**处理任务停在等待、文件结果找不到、附件上传失败、WebSocket 断线以及 B站/OneBot/MCP 外部连接问题。**

## 前置条件

- 保留失败任务的 `run_id`、`job_id`、`task_id`、`asset_id` 或 `attachment_id`；
- 明确这是普通请求、异步任务还是实时连接；
- 外部平台凭据仅在本地配置，不放进 Markdown、截图或 Git。

## 操作步骤

### 1. 查询运行和事件

```powershell
$runId = "run-id"
Invoke-RestMethod "http://127.0.0.1:18000/api/runs/$runId"
Invoke-RestMethod "http://127.0.0.1:18000/api/runs/$runId/events"
```

### 2. 区分等待、失败、取消

- `waiting_approval` / `waiting_input`：补充输入或调用 approval/resume，不要重复创建任务；
- `running`：继续轮询事件；
- `failed`：查看公开错误合同和依赖状态，修复后再 retry；
- `cancelled`：确认取消结果，再决定是否重新发起；
- 已完成但无文件：用 `asset_id` 查询资产或输出，不要依赖本地绝对路径。

### 3. 检查实时连接

角色对话实时 WebSocket 使用 `/ws/personas/{persona_id}/conversations/{conversation_id}`；语音流使用 `/api/voice/stream/ws`；B站事件使用 `/api/integrations/bilibili/events/ws`。断线后先查询状态，再重连并补齐事件。

## 你应该看到什么

前端只更新当前 `run_id` 对应的任务区域；连接断开、任务失败和任务完成应是三种不同状态。文件结果通过稳定 ID 引用，并能再次下载或播放。

## 常见错误

- **上传 `413` 或大小校验失败**：检查 `MAX_UPLOAD_MB` 和表单字段；
- **`409`**：任务状态不允许当前操作，先 GET 状态；
- **`422`**：检查 multipart 字段、JSON 字段和 ID 格式；
- **WebSocket 404**：确认使用 `ws://`、路径和代理转发配置；
- **WebSocket 连接后无事件**：确认对应任务确实产生事件，并通过 REST 状态接口校准；
- **B站/OneBot 无法发送**：检查凭据、目标列表、连接状态和平台限流；
- **MCP 工具不可见**：检查服务是否启用、工具发现是否成功以及角色授权范围。

## 下一步

阅读[事件与状态](/reference/events)、[任务生命周期](/development/lifecycle)和[扩展与外部集成 API](/reference/api-integrations)。
