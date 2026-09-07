# 角色与对话

## 功能定位

角色是 CHARACTOID 的组织单位。它可以拥有独立的人格设定、知识资源、声音资源、Live2D 表现和可调用能力。对话页不是单纯的聊天窗口，而是提交任务目标、查看运行过程和接收结果的统一入口。

## 一次对话的处理过程

```text
消息进入
→ 读取角色与会话上下文
→ 识别普通回答或任务意图
→ 缺少输入时先请求补充
→ Supervisor 委派 Worker
→ 返回事件、状态或资产
→ 生成最终角色化回复
```

## 角色配置的核心字段

实际字段以当前前端表单和后端 schema 为准，概念上包括：

```yaml
name: 示例角色
system_prompt: 保持明确、简洁，并说明不确定性
knowledge_space_id: optional-space
voice_id: optional-voice
live2d_model_id: optional-model
```

## 普通回答和任务回答

| 类型 | 行为 | 结果 |
| --- | --- | --- |
| 普通问题 | Supervisor 直接组织回答 | 一条或多条消息 |
| 知识问题 | 委派知识 Worker | 证据片段、引用和回答 |
| 文件任务 | 创建 Run / Job | 进度、确认、结果资产 |
| 写操作 | 先校验权限和确认 | 可审计的执行结果 |

## 相关接口

- 角色与版本：见 [角色、对话与运行 API](/reference/api-agents-runs)。
- 流式 Agent：`POST /api/personas/{persona_id}/agent/stream`。
- 附件：见 [文档、知识与评测 API](/reference/api-knowledge)。
