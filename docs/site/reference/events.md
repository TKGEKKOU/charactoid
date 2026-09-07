# 事件与状态

事件是 Runtime、前端和外部客户端之间的稳定边界。

## 通用字段

```json
{
  "type": "worker.progress",
  "run_id": "run_01",
  "worker": "rvc",
  "timestamp": "2026-09-07T00:00:00Z",
  "data": {"stage": "separate", "percent": 42}
}
```

## 常见事件

| 事件 | 含义 |
| --- | --- |
| `run.created` | 运行创建 |
| `worker.started` | Worker 开始执行 |
| `worker.progress` | 阶段或进度变化 |
| `asset.created` | 文件/结果资产登记 |
| `run.waiting_input` | 等待确认或补充输入 |
| `run.completed` | 完成 |
| `run.failed` | 失败 |
| `run.cancelled` | 取消 |

## 前端消费规则

只更新对应 `run_id` 的动态区域；重复事件应可安全处理；未知事件保留原始数据并记录，不应导致整个页面刷新。

## 与 WebSocket 的关系

WebSocket 负责实时传输，事件本身负责业务语义。连接断开后，应通过重新连接或查询接口补齐状态，不能只依赖内存中的最后一帧。
