# Agent 与 Worker

## 真实主流程

```text
用户输入
→ 能力自检与意图线索
→ persona_supervisor 判断
→ 收集缺少输入
→ delegate_to_*
→ Worker 执行
→ finalize_* 校验合同
→ 返回 Supervisor
→ 组织用户可见回复
```

## Supervisor

Supervisor 是唯一面向用户组织最终表达的 Agent。它可以直接处理普通闲聊；涉及知识、文件、记忆、声音、Live2D 或配置动作时，则委派领域 Worker。它不应伪装成已经执行了检索或写操作。

## Worker 清单

| Worker | 负责 | 不负责 | 可恢复/确认 |
| --- | --- | --- | --- |
| `knowledge_worker` | RAG、结构化查询、证据不足处理 | 无证据自由作答 | 可进入联网确认 |
| `memory_worker` | 记忆读写 | 文档索引 | 写入按工具策略确认 |
| `document_worker` | 文档处理与索引任务 | 最终角色表达 | 后台任务可重试 |
| `profile_worker` | 角色资料修改 | 语音推理 | 写操作需校验 |
| `voice_worker` | TTS、声音资源和服务动作 | RVC 文件工作流 | 依赖资源状态 |
| `rvc_worker` | RVC 会话、分离、转换与结果 | 普通 TTS | 支持等待输入/取消 |
| `live2d_worker` | 模型与表现层操作 | 音频训练 | 依赖本地模型/外部应用 |
| `config_worker` | Provider、资源与配置动作 | 领域内容回答 | 安装/修改可能确认 |

## finalize 的作用

Worker 返回的是结构化事实、状态或资产引用。`finalize_*` 检查输出合同，再交给 Supervisor。这样可以避免 Worker 直接生成不可审计的用户答案。

## 知识 Worker 为什么不同

知识链路采用 Planner + 确定性执行：Planner 只选择受限 schema；retrieve 执行 RAG/SQL；fallback 处理证据不足；finalize 校验合同。这样比让通用 Agent 自由拼 SQL、检索和答案更容易审计。

## 关键代码入口

- 父图：`agents/graph/build.py`
- Supervisor：`agents/graph/supervisor.py`
- 知识子图：`agents/graph/knowledge.py`
- 服务入口：`agents/service.py`
- 工具与 Worker 注册：`agents/registry.py`
- 合同：`agents/contracts.py`
