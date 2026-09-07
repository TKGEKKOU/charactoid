# API 总览

**CHARACTOID 的 HTTP API 由 FastAPI 注册，默认前缀为 `/api`。本页是分组索引；具体参数和示例见分组页面。**

## 基础约定

- 默认地址：`http://127.0.0.1:18000`；
- JSON 接口使用 `Content-Type: application/json`；
- 文件接口使用 `multipart/form-data`；
- 长任务通常先返回 `202 Accepted`，再通过任务接口、事件或 WebSocket 查询；
- 资源使用稳定 ID 引用，不在响应中暴露本地绝对路径；
- 错误响应应保留 HTTP 状态码和可读 detail。

## 路由分组

| 分组 | 页面 | 主要前缀 | 状态 |
| --- | --- | --- | --- |
| 系统 | [健康、状态与设置](/reference/api-system) | `/api/health`、`/api/system`、`/api/settings` | 稳定 |
| 角色与运行 | [角色、对话与运行](/reference/api-agents-runs) | `/api/personas`、`/api/runs` | 稳定 |
| 知识与评测 | [文档、知识与评测](/reference/api-knowledge) | `/api/documents`、`/api/eval` | 可选 |
| 语音与表现 | [语音、RVC 与 Live2D](/reference/api-voice) | `/api/voice`、`/api/live2d` | 可选/实验 |
| 扩展与集成 | [扩展与外部集成](/reference/api-integrations) | `/api/skills`、`/api/mcp`、`/api/integrations` | 外部依赖 |
| 资源 Provider | [资源与模型 API](/reference/api-resources) | `/api/providers`、`/api/resources` | 可选 |

## 快速验证

```powershell
Invoke-RestMethod http://127.0.0.1:18000/api/health
```

```json
{"status":"ok","workspace_id":"..."}
```

## OpenAPI

开发环境可以打开 FastAPI 自动生成的 `/docs` 或 `/openapi.json` 查看实际 schema。本文档用于解释业务流程、使用场景和边界，参数发生变化时以 OpenAPI 与源码为准。

## 接口状态标签

- **稳定**：核心路径已实现；
- **可选**：需要模型、设备或本地资源；
- **实验**：接口存在但需按环境验证；
- **外部依赖**：需要第三方服务、凭据或独立进程；
- **兼容**：保留旧调用方式，不建议新代码依赖。



完整的当前路由逐条清单见 [全量路由清单](/reference/api-all)。
