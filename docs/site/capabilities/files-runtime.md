# 文件与任务运行时

## 功能定位

文件型能力将上传、处理、等待确认、结果生成和下载组织为一个可追踪任务，而不是让前端直接拼接本地路径。

## 统一标识

| 标识 | 用途 |
| --- | --- |
| `conversation_id` | 对话归属 |
| `run_id` | 一次 Agent 运行 |
| `job_id` / `task_id` | 具体后台任务 |
| `asset_id` / `file_id` | 文件或结果资产引用 |

## 状态主线

```text
queued → running → waiting_input → completed
                       ↓
              failed / cancelled / retrying
```

## 结果处理原则

- 结果通过资产 ID 引用，不把绝对路径交给浏览器。
- 长任务通过事件或轮询更新进度。
- 需要用户决定时进入 `waiting_input`，不会擅自继续。
- 失败、取消和重试必须保留可解释状态。

相关接口见 [角色、对话与运行 API](/reference/api-agents-runs) 和 [语音 API](/reference/api-voice)。
