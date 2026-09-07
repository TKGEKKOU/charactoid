# 系统架构

本文描述当前仓库中的运行架构，而不是历史设计草案。顶层入口是 `main.py`，应用工厂位于 `app/main.py:create_app()`；桌面入口为 `desktop_main.py`，Web 与桌面端复用同一套 API、Agent 和运行时语义。

## 分层总览

```mermaid
flowchart TB
  UI[浏览器 / WebView2 / 前端] --> API[FastAPI 与 WebSocket]
  CH[B站 / OneBot11 等渠道] --> API
  API --> APP[应用服务层\n角色 / 会话 / 文档 / 评测]
  APP --> ORCH[Agent 编排\nintent / Supervisor / Worker / HITL]
  ORCH --> CAP[能力层\nTool / Skill / MCP / Policy]
  CAP --> RAG[知识与记忆\nAdaptive RAG / SQL / Memory]
  CAP --> MEDIA[媒体能力\nTTS / ASR / GPT-SoVITS / RVC / Live2D]
  RAG --> DATA[SQLite / Milvus Lite / 文件资产]
  MEDIA --> DATA
  ORCH --> OBS[Run / Event / Checkpoint]
  OBS --> API
```

| 层 | 当前职责 | 不应承担的职责 |
| --- | --- | --- |
| 前端与渠道 | 采集用户操作、显示事件和结果、保持连接 | 直接执行 Shell、拼接本地绝对路径、决定 Worker 权限 |
| FastAPI | 暴露 HTTP/WebSocket 合同、校验请求、连接应用服务 | 把全部业务逻辑写进路由函数 |
| 应用服务 | 组装角色、会话、文档、资源和运行记录 | 让模型绕过策略直接访问数据库 |
| Agent 编排 | 判断直接回答还是委派、维护交接和人工确认 | 直接把未校验的 Worker 草稿展示给用户 |
| Worker/Tool | 在受限作用域执行领域操作并返回结构化合同 | 自己改变角色人设或越权访问别的工作区 |
| 数据层 | 保存角色、对话、任务、文档索引和文件引用 | 把密钥、Prompt 或任意命令写入公开事件 |

## 当前父图

```mermaid
flowchart TD
  START([START]) --> ROUTE[intent_route]
  ROUTE --> SUP[persona_supervisor]
  SUP -->|直接回答| END([父图 END])
  SUP -->|delegate_to_knowledge_worker| K[knowledge_worker 子图]
  SUP -->|delegate_to_memory_worker| M[memory_worker]
  SUP -->|delegate_to_document_worker| D[document_worker]
  SUP -->|delegate_to_profile_worker| P[profile_worker]
  SUP -->|delegate_to_voice_worker| V[voice_worker]
  SUP -->|delegate_to_rvc_worker| R[rvc_worker]
  SUP -->|delegate_to_live2d_worker| L[live2d_worker]
  SUP -->|delegate_to_config_worker| C[config_worker]
  K --> FK[finalize_knowledge_worker]
  M --> FM[finalize_memory_worker]
  D --> FD[finalize_document_worker]
  P --> FP[finalize_profile_worker]
  V --> FV[finalize_voice_worker]
  R --> FR[finalize_rvc_worker]
  L --> FL[finalize_live2d_worker]
  C --> FC[finalize_config_worker]
  FK --> SUP
  FM --> SUP
  FD --> SUP
  FP --> SUP
  FV --> SUP
  FR --> SUP
  FL --> SUP
  FC --> SUP
```

### `persona_supervisor`

`agents/graph/supervisor.py` 与 `agents/graph/build.py` 负责外层编排。它可以：

- 对普通闲聊生成角色化回答；
- 收集缺失信息；
- 通过 `delegate_to_*` 把任务交给领域 Worker；
- 管理动态 Skill/MCP 能力；
- 在 Worker 返回后读取结构化结果并组织最终表达。

它不应直接执行 RAG 查询、任意 SQL、文件系统命令或本地路径操作。

### `knowledge_worker`

知识 Worker 不是无约束的通用 Agent，而是固定子图：

```mermaid
flowchart LR
  A[knowledge_planner] --> B[knowledge_retrieve]
  B --> C[knowledge_fallback]
  C --> D[finalize_knowledge_worker]
```

Planner 只产出受 schema 约束的 RAG/结构化查询计划；retrieve 运行确定性检索或只读 SQL；fallback 在证据不足时按策略拒答、请求确认或联网；finalize 负责合同校验后交回 Supervisor。

## Worker 注册与工具分配

`agents/registry.py` 是当前 Worker 和 Tool 元数据的重要事实来源。当前 canonical Worker 为：

| Worker | 责任 | 默认超时 |
| --- | --- | ---: |
| `knowledge_worker` | 知识检索、结构化查询、策略化联网回退 | 45s |
| `memory_worker` | 角色记忆、工作区记忆 | 30s |
| `document_worker` | 文档列表、上传和 URL 导入任务 | 120s |
| `profile_worker` | 角色档案、会话导出 | 30s |
| `voice_worker` | TTS、ASR、Voice Studio、音色训练与 GPT-SoVITS | 300s |
| `rvc_worker` | RVC 会话、音频转换和结果跟踪 | 1800s |
| `live2d_worker` | 模型清单、VTube Studio 配置、本地模型目录 | 45s |
| `config_worker` | 应用受管资源安装、更新、取消和清理 | 45s |

`ToolSpec` 同时记录 `specialist`、`requires_confirmation`、`mutates_data` 和可选 MCP server。这样“是否写数据”和“是否需要确认”是显式元数据，不需要从工具名称猜测。

## 为什么这样拆分

- **Supervisor 中心辐射**：避免 Worker 互相对话导致状态和权限难以审计。
- **finalize 作为边界**：Worker 可以失败、等待或返回不确定性，但只有通过合同校验的结果才能回到角色层。
- **控制面与数据面分离**：SQLite 保存角色、会话和任务关系；Milvus 保存检索索引；文件系统保存受管资源和结果文件。
- **事件驱动展示**：前端只订阅状态、进度和资产引用，不需要知道工具内部的进程或路径。

## 源码阅读入口

```text
agents/graph/build.py          父图组装
agents/graph/supervisor.py     Supervisor 节点
agents/graph/knowledge.py      Planner + 检索 + fallback
agents/registry.py             Worker / Tool 注册元数据
agents/contracts.py            交接和结果合同
agents/runtime/models.py       Run / Task / Step / Event 模型
agents/runtime/runner.py       运行控制与取消
app/main.py                    FastAPI 应用工厂
app/startup/routes.py          路由装配
app/run_store.py               运行记录存储
```
