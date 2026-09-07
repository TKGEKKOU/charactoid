# 扩展与外部集成 API

## Skill

前缀 `/api/skills`，覆盖列表、创建、更新、删除、上传和工具关联。非内置 Skill 需要信任后再启用。

## MCP

前缀 `/api/mcp`，覆盖服务注册、启停、测试、工具发现、授权和连接状态。支持 stdio、streamable HTTP 和 SSE。

## Provider 与外部平台

- `/api/providers`：模型和 Provider 配置；
- `/api/integrations`：B站、OneBot11 等外部接入；
- B站事件提供 WebSocket；
- OneBot11 提供配置、测试、发送和会话清理接口。

## 安全要求

- 生产环境不要使用公开文档中的占位 Token；
- stdio MCP 命令等价于本机子进程入口；
- 外部消息发送属于副作用操作，应有明确角色授权和确认策略；
- 外部平台断线、凭据过期和限流都需要在 UI/日志中单独展示。
