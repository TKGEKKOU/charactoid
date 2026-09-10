# 扩展与外部集成 API

**Skill、MCP、扩展目录和外部渠道都是“先注册、再按角色授权”，不是把所有工具塞进每个对话。**

源码：`app/routers/skills.py`、`app/routers/mcp.py`、`app/routers/extensions.py`、`app/routers/integrations.py`、`app/routers/capability_assignments.py`、`agents/skills.py`、`integrations/`。

外部消息进系统后，必须落到某个角色的同一套 Supervisor → Worker 链。渠道适配器不得自己选工具、自己改人设。

## Skill

前缀 `/api/skills`（`app/routers/skills.py`）。Skill 是提示词 + 可引用工具名的包装，内置 Skill 不能删。

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `GET` | `/api/skills` | 列表 |
| `POST` | `/api/skills` | 创建，`201` |
| `PATCH` | `/api/skills/{name}` | 更新 |
| `DELETE` | `/api/skills/{name}` | 删除；内置返回 403 |
| `POST` | `/api/skills/upload` | 上传 zip（上限约 25MB / 500 文件） |
| `GET` | `/api/skills/tools` | 技能可勾选的 ToolSpec，含已注册 MCP 工具 |

`name` 需匹配 `[a-z0-9_-]+`。`instructions` 会在加载后注入 system prompt。`tool_names` 只能引用已注册 ToolSpec，不能在 Skill 里发明 HTTP 调用。

上传 zip 会走 `agents/skill_parser.py`。不可信 Skill 默认限制脚本。不要在文档示例里放真实 Token。

## MCP

前缀 `/api/mcp`（`app/routers/mcp.py`）。支持 stdio、streamable HTTP、SSE。

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `GET` | `/api/mcp/servers` | 已配置服务器 |
| `POST` | `/api/mcp/servers` | 注册 |
| `DELETE` | `/api/mcp/servers/{name}` | 删除 |
| `POST` | `/api/mcp/servers/{name}/enable` | 启用 |
| `POST` | `/api/mcp/servers/{name}/disable` | 停用 |
| `POST` | `/api/mcp/servers/{name}/reload` | 重载 |
| `POST` | `/api/mcp/servers/{name}/test` | 探测 |
| `PATCH` | `/api/mcp/servers/{name}/grants` | 授权范围 |
| `GET` | `/api/mcp/tools` | 当前可见工具 |

角色级授权另见 `GET/PUT /api/personas/{persona_id}/mcp-grants`。改 grants 后应即时刷新可见性，不要求重启进程。

stdio MCP 应优先跑在本机可控进程里。远程 MCP 把网络和凭据风险带进工作区，需要按角色收紧 grants。

## 扩展目录

`/api/extensions`（`app/routers/extensions.py`）读 `extensions.catalog.CatalogClient`，安装是异步 job。

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `GET` | `/api/extensions/catalog` | 目录 |
| `GET` | `/api/extensions/catalog/{item_id}` | 单项 |
| `POST` | `/api/extensions/catalog/refresh` | 刷新目录 |
| `POST` | `/api/extensions/catalog/{item_id}/install` | 安装 |
| `GET` | `/api/extensions/catalog/install/{job_id}` | 安装任务 |

扩展安装仍是可选资源，失败时基础对话应可用。

## 外部渠道

`/api/integrations`（`app/routers/integrations.py`）。

### B 站直播

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `GET` | `/api/integrations/bilibili` | 状态 |
| `PUT` | `/api/integrations/bilibili/config` | 配置 |
| `POST` | `/api/integrations/bilibili/connect` | 连接 |
| `POST` | `/api/integrations/bilibili/disconnect` | 断开 |
| `POST` | `/api/integrations/bilibili/pause` | 暂停 |
| `POST` | `/api/integrations/bilibili/resume` | 继续 |
| `POST` | `/api/integrations/bilibili/queue/clear` | 清队列 |
| `POST` | `/api/integrations/bilibili/session/clear` | 清会话 |
| `WEBSOCKET` | `/api/integrations/bilibili/events/ws` | 事件 |

弹幕是输入，口型和语音是输出。它们必须绑定到同一个角色，而不是直播插件自己养一套人格。

### OneBot11 / QQ

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `GET` | `/api/integrations/onebot11` | 配置/状态 |
| `PUT` | `/api/integrations/onebot11` | 写入配置 |
| `PUT` | `/api/integrations/onebot11/observation` | 观察项 |
| `GET` | `/api/integrations/onebot11/targets` | 目标 |
| `POST` | `/api/integrations/onebot11/test` | 探测 |
| `POST` | `/api/integrations/onebot11/disconnect` | 断开 |
| `POST` | `/api/integrations/onebot11/conversation/clear` | 清会话 |
| `POST` | `/api/integrations/onebot11/recent/clear` | 清最近 |
| `DELETE` | `/api/integrations/onebot11/token` | 删令牌 |
| `POST` | `/api/integrations/napcat/send` | 发送（NapCat） |

另有 OneBot WebSocket 服务挂在 `integrations.onebot11.ws_server`。外部消息进系统后应创建或复用该角色的 conversation/run，而不是另写一套回复器。

## 能力总表

`GET /api/capabilities/assignments`、`PATCH /api/capabilities/assignments` 提供全局默认。角色覆盖见 [角色、对话与运行 API](/reference/api-agents-runs)。

## 安全

- 示例里只用占位 Token。
- 写操作、发消息、改外部状态要确认。
- 凭据过期应表现为渠道未就绪，而不是角色“坏了”。
- 不要在 UI/日志里展开密钥。
- MCP grants 默认收紧，需要时再按角色打开。

## 相关页面

- [扩展：Skill、Tool、MCP](/capabilities/extensions)
- [Live2D 与外部接入](/capabilities/live2d-integrations)
- [扩展体系设计](/concepts/extensions)
