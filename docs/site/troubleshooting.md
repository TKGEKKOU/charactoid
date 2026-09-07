# 问题排查总表

**按现象定位 CHARACTOID 启动、Provider、知识库、语音、文件任务和实时连接问题。先确认服务进程和健康检查，再看具体能力的资源状态；不要先删除数据库或反复重装模型。**

## 前置条件

- 项目已按[快速开始](/guide/quickstart)启动；
- 可以在 PowerShell 中执行命令；
- 记录失败请求的 HTTP 状态码、`run_id`、`job_id` 或 `task_id`。

## 操作步骤

### 1. 确认端口和健康状态

```powershell
Get-NetTCPConnection -LocalPort 18000 -State Listen
Invoke-RestMethod http://127.0.0.1:18000/api/health
Invoke-RestMethod http://127.0.0.1:18000/api/status
```

### 2. 按错误类型分流

| 现象 | 先检查 | 对应页面 |
| --- | --- | --- |
| 服务打不开 | 进程、端口、`.env`、启动日志 | [资源、模型与设备](/troubleshooting/resources) |
| 对话失败 | Provider 配置、角色 ID、请求体 | [任务、文件与连接](/troubleshooting/tasks-connections) |
| 知识库无结果 | 文档是否确认索引、Embedding、集合名、证据阈值 | [资源、模型与设备](/troubleshooting/resources) |
| 音频任务卡住 | FFmpeg、RVC/GPT-SoVITS 状态、任务状态 | [任务、文件与连接](/troubleshooting/tasks-connections) |
| 实时页面断开 | WebSocket 地址、服务状态、浏览器控制台 | [任务、文件与连接](/troubleshooting/tasks-connections) |

## 你应该看到什么

- `/api/health` 返回 `{"status":"ok", ...}`；
- `/api/status` 能返回当前资源和服务状态；
- 异步任务不会被误判为完成，而是可以通过标识继续查询。

## 常见错误

- **`404`**：确认前缀是 `/api`，并检查路径中的资源标识；
- **`422`**：按响应中的字段错误修正 JSON、表单或路径参数；
- **`503`**：依赖未安装、未启动或设备不可用；
- **连接被拒绝**：应用未监听 `18000`，或被防火墙/代理拦截；
- **状态丢失**：先保留任务标识和日志，确认是否只是前端断线；重启后应通过查询接口补齐状态。

## 下一步

继续阅读[问题排查：资源、模型与设备](/troubleshooting/resources)、[任务、文件与连接](/troubleshooting/tasks-connections)或[事件与状态](/reference/events)。
