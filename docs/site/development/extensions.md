# 扩展 Skill 与 MCP

## Skill 最小概念

Skill 是可以启用、停用、信任和分配工具的指令包。它适合表达某一类任务的操作规则，而不是保存敏感凭据。

```yaml
name: example_skill
description: 处理示例任务
instructions: |
  先读取状态，再决定是否执行修改。
tool_names:
  - example_status
  - example_apply
```

字段以当前 Skill API schema 为准。非内置 Skill 应经过信任和权限检查。

## MCP 服务

支持的传输方向包括 `stdio`、`streamable_http` 和 `sse`。服务注册后，Runtime 建立连接、发现工具、包装异步调用并将工具注册到统一 ToolSpec。

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

## 推荐流程

```text
保存服务
→ 测试连接
→ 查看发现的工具
→ 检查副作用分类
→ 限定允许角色
→ 启用
→ 从对话中调用
```

## 安全规则

- 不把 Token 写进仓库文档；
- stdio 命令视为本机代码执行入口；
- 修改数据的 MCP 工具必须标记并确认；
- 设置连接和工具调用超时；
- 断开服务时清理会话和子进程。
