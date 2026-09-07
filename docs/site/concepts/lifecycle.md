# Agent 生命周期

一次运行通常经历：

`queued → running → waiting_input → completed`

异常路径包括：`failed`、`cancelled`、`retrying`。

每次状态变化都应产生事件，事件包含运行标识、Worker 标识、时间和可供界面呈现的数据。需要人工确认时进入 `waiting_input`，而不是让 Worker 擅自继续。
