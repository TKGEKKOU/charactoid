# 事件与状态

事件是前端、Worker 和运行时之间的稳定边界。建议至少包含：

```json
{
  "type": "worker.started",
  "run_id": "run_01",
  "worker": "rvc",
  "timestamp": "2026-09-07T00:00:00Z",
  "data": {}
}
```

常见事件：`run.created`、`worker.started`、`worker.progress`、`asset.created`、`run.waiting_input`、`run.completed`、`run.failed`。

文件结果使用 `asset_id` 引用，避免在对话或浏览器端传递本地绝对路径。
