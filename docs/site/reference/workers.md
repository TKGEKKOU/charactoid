# Worker 清单

## Worker 的统一合同

Worker 应声明名称、输入 schema、输出类型、权限范围、副作用和可恢复性。

```text
输入合同 → 受限工具 → 结构化事实/状态/资产 → finalize → Supervisor
```

## 当前主要 Worker

| 名称 | 领域 | 典型结果 |
| --- | --- | --- |
| `knowledge_worker` | RAG、SQL、证据 | 片段、引用、结构化结果 |
| `memory_worker` | 记忆读写 | 记忆记录或查询结果 |
| `document_worker` | 文件解析、索引 | job 状态、索引结果 |
| `profile_worker` | 角色资料 | 角色配置变更 |
| `voice_worker` | TTS、服务、声音资源 | 音频资产、服务状态 |
| `rvc_worker` | 音频转换 | task 状态、WAV 资产 |
| `live2d_worker` | 模型与表现 | 模型/表现状态 |
| `config_worker` | Provider、资源 | 配置或安装状态 |

## 注册与清单接口

Worker 清单路由为 `/api/workers/manifests`，用于查看可用 Worker 的描述和能力元数据。真正的调用仍由 Agent 图和注册表控制。

## 不要这样实现

- Worker 直接向用户写最终答案；
- Worker 绕过 finalize 直接结束父图；
- 让模型自由拼接 SQL 或 Shell；
- 把所有 Worker 当成完全对等的聊天 Agent。
