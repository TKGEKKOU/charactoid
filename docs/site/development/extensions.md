# 扩展 Skill 与 MCP

**本页面向要往 CHARACTOID 里加 Skill 包或 MCP 服务器的开发者。产品概念见 [扩展：Skill、Tool、MCP](/capabilities/extensions)；这里写落地步骤、配置形状和失败怎么查。代码：`agents/skills.py`、`agents/skill_parser.py`、`agents/skill_sources.py`、`agents/mcp_grants.py`、`integrations/mcp/`、`app/routers/skills.py`、`app/routers/mcp.py`、`app/startup/lifespan.py`。**

## Skill 最小概念

Skill 是可以启用、停用、信任和分配工具的指令包。它适合表达某一类任务的操作规则，而不是保存敏感凭据。

解析器读到的常见字段：

```yaml
name: example_skill
description: 处理示例任务
instructions: |
  先读取状态，再决定是否执行修改。
  缺参数就停，不要猜测本地路径。
tool_names:
  - example_status
  - example_apply
```

实际 schema 以当前 Skill API 为准。非内置 Skill 应经过信任和权限检查，才能出现在某个角色的可见集合里。

Skill 只声明工具名。工具本身仍要在 `ToolSpec` 里存在（内置或 MCP 发现）。Skill 不会凭空创造执行函数。

## Skill 来源

通常有三类来源：

1. **内置**：随仓库发布，默认可信，但仍按角色启用。
2. **本地目录 / 安装包**：需要信任标记，避免随便丢一个 YAML 就获得删库工具。
3. **管理 API 安装**：走 `skill_install` 一类工具或路由，写进受管位置。

加载顺序和冲突策略以 `skill_sources.py` 为准。同名 Skill 不要靠“谁后加载谁赢”这种隐式行为；文档和 API 应能查出最终生效的是哪一份。

## MCP 服务配置

配置文件默认是 `data/mcp_servers.json`。启动时 `MCPManager` 读取它并 `connect_all(register=True)`。

```json
{
  "name": "example",
  "description": "本地示例服务",
  "transport": "stdio",
  "command": "python",
  "args": ["server.py"],
  "env": {},
  "enabled": true
}
```

传输：

| transport | 含义 | 风险 |
| --- | --- | --- |
| stdio | 拉起本机进程，从标准输入输出说话 | 等于执行本机代码 |
| streamable_http | HTTP 流式传输 | 要校验地址和鉴权 |
| sse | Server-Sent Events | 旧路径，注意超时和断线 |

`mcp_allow_arbitrary_stdio` 允许任意命令时非常危险，只应在自己完全控制的本机开发环境打开。

客户端在 langchain-mcp-adapters 0.3.x 之后是无状态的：拉清单和调工具各开会话。不要以为管理器里有一条永远活着的连接。

## 超时与只读注解

`integrations/mcp/client.py`：

- 连接超时 90 秒（冷启动可能装依赖）；
- 只读工具 20 秒；
- 变更工具 60 秒。

只读来自 MCP 注解 `readOnlyHint` / `read_only_hint`。没声明只读，就按变更工具处理：更长超时，并且默认需要确认。

超时返回结构化 JSON：`{"status":"timeout","error":"MCP tool timed out after Ns"}`。模型应据此停手，而不是换一种说法再打一次。

## 授权不是连接

连上 MCP 只是发现工具并注册 `ToolSpec.server=该服务名`。某个角色能不能用，还要看 `mcp_grants` 和能力分配。

推荐流程：

```text
保存服务
→ 测试连接
→ 查看发现的工具与注解
→ 检查副作用分类
→ 限定允许角色
→ 启用
→ 从对话中调用
→ 断开时清理会话和子进程
```

跳过“限定允许角色”会把外部工具变成全局能力。这和 CHARACTOID 的角色边界相反。

## 安全规则

- 不把 Token 写进仓库、Skill instructions 或公开事件；
- stdio 命令视为本机代码执行入口；
- 修改数据的 MCP 工具必须标记并确认；
- 设置连接和工具调用超时；
- 断开服务时清理会话和子进程；
- 不要把 MCP 返回的本地路径写进 StructuredHandoff。

## 调试

1. 先看服务是否 enabled、进程是否还在；
2. 再看工具清单是否注册进 `tool_specs()`；
3. 再看角色 grants；
4. 再看这次 Run 的事件里工具名和超时；
5. 最后才看 MCP 服务器自己的日志。

常见误判：服务连上了，但角色没授权；或者工具清单有了，但 `requires_confirmation` 让 Run 停在 waiting_approval，用户以为“没反应”。

## 相关页面

- [扩展：Skill、Tool、MCP](/capabilities/extensions)
- [扩展体系设计](/concepts/extensions)
- [注册 Worker 与工具](/development/worker-registration)
- [扩展与外部集成 API](/reference/api-integrations)
