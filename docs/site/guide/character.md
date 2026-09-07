# 配置角色

角色由设定、知识资源、声音配置和表现层组成。建议先在配置文件中定义稳定身份，再通过会话上下文传递临时目标。

```yaml
character:
  name: miku
  system_prompt: "保持简洁、明确地回答"
  voice: gpt-sovits:miku
  live2d: miku
```

实际可用字段以仓库中的配置模型和 `.env.example` 为准。
