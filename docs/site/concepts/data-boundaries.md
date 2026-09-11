# 数据、资产与安全边界

**CHARACTOID 把“谁可以做什么”“任务做到哪一步”“文件结果在哪里”分开处理。** 目的不是增加概念，而是避免一次 Agent 调用同时携带角色权限、数据库操作和本地路径，导致难以恢复或审计。

> **事实依据**：`app/models.py`、`app/run_store.py`、`agents/contracts.py`、`agents/runtime/models.py`（`validate_structured_handoff`）、`agents/graph/supervisor.py`（`_FORBIDDEN_DISPATCH_KEYS`）、`agents/capabilities.py`、`agents/assignment.py`、`agents/mcp_grants.py`、`agents/observability.py`、`ingestion/milvus_store.py`、`app/routers/attachments.py`、`app/routers/settings.py`（`require_local`）。

## 三类数据面

```text
前端 / 外部渠道
  → FastAPI 合同
      → SQLite 控制面
      → 受管文件与模型目录
      → Milvus Lite / Standalone
SQLite 用 document_id / source_hash / asset_id 关联后两面
```

| 数据面 | 当前存放内容 | 典型模块 |
| --- | --- | --- |
| SQLite 控制面 | 角色、版本、能力策略、记忆、消息、附件元数据、VoiceAsset、文档任务、Run/Task/Step/Event | `app/models.py`、`app/run_store.py` |
| 向量数据面 | Dense/BM25 索引和检索元数据 | `ingestion/milvus_store.py`、`rag/retriever.py` |
| 文件数据面 | 上传附件、音频、训练/推理结果、受管模型和运行时 | `attachments.py`、`voice/`、资源管理器 |

SQLite 记录“这份资料属于哪个角色/工作区/任务”；Milvus 保存检索向量。文件结果通过 `asset_id` / `file_id` 挂钩。删角色不会自动清 Milvus 切片；清向量走 `DELETE /api/documents/{job_id}`。

## 作用域字段

| 字段 | 边界 |
| --- | --- |
| `workspace_id` | 工作区；列表角色只返回 `LOCAL_WORKSPACE_ID` |
| `persona_id` | 角色；记忆读写 SQL 必须同时匹配 workspace + persona |
| `knowledge_space_id` | 知识空间；RAG `resolve_knowledge_scope` |
| `document_id` / `source_hash` | 文档身份与去重 |
| `conversation_id` | 会话；thread_id = `persona_id:conversation_id` |
| `run_id` / `task_id` / `step_id` | Runtime 过程 |
| `attachment_id` | 已登记输入 |
| `asset_id` / `file_id` / `session_id` | 受管产出或媒体会话 |

知识检索在向量侧附带作用域过滤。结构化 SQL 不能靠用户输入绕过当前角色和工作区。工作区记忆只有 `workspace_id`，角色记忆两者都要。

## 文件引用原则

浏览器只提交结构化引用，不提交任意本地绝对路径：

```json
{
  "conversation_id": "conversation_01",
  "attachment_id": "attachment_01",
  "run_id": "run_01",
  "asset_id": "asset_01"
}
```

服务端按当前会话、角色、工作区重新解析。不能只相信客户端传来的文件名。

## 交接合同禁键

Runtime `validate_structured_handoff` 递归检查 JSON。图层 `_FORBIDDEN_DISPATCH_KEYS` 在顶层、`input_refs`、`options` 都查：

```text
input_path, output_path, path, command, cmd, shell, python, python_file
```

用户可以在自然语言里讨论“命令”或“路径”，但 Agent 层之间不能把它们当可执行字段传递。真正的文件处理由受管 Tool、资源目录和服务端适配器完成。

## 两层 MCP 授权（fail-closed）

`agents/assignment.py` 模块注释写明 Runtime 仍用两层：

1. **MCP grants**（`allowed_persona_ids`）：服务器可见性 fail-closed。没出现在名单里的角色看不到该 server。
2. **CapabilityPolicy**：按能力 allow/deny。MCP 工具默认拒绝，除非明确打开。

`sync_mcp_wildcard_policy` 把 grants 对齐到 `mcp/{server}/*`：

- `*` 与具体 persona **不能共存**。留下 persona True 会在撤销后仍开着工具；留下 persona False 会在后来的全局授权下把该角色藏起来。
- 授予 `*`：写 `("*", cap)=True`，并清掉所有具体 persona override（设为 `None` 表示继承）。
- 授予具体列表：清掉 `*` override，对授予的 persona 写 True，对其它已有记录写 None。

`next_allowed_persona_ids`：当当前 ACL 已是 `*` 时，取消某一个角色会 **展开成“除该角色外的所有已知角色”**，而不是把整个 ACL 清空。未来新角色仍然 fail-closed，除非用户再次显式选 `*`。

`effective_assigned`：先看该 persona 的显式 override，没有再看 `("*", capability_id)`，再没有才用 `default_assigned`。`override_for_toggle`：若目标值等于继承值，持久化为 `None`（继承），否则写 True/False。

能力页是产品表面；角色工作台读同一套 store。连接成功 ≠ 所有角色可用。平台级 `GLOBAL_ALL` 的服务器不参与按角色 PUT grants，见 [角色与对话](/capabilities/persona-chat)。

Skill 能力 id：`skill/{name}`。MCP 通配：`mcp/{server}/*`。

## 能力描述

`CapabilityDescriptor` 描述来源、所属 Worker、是否改数据、是否要确认。`CapabilityPolicy` 保存角色级覆盖。解析顺序：角色精确匹配 → 角色通配 → 全局通配。MCP 除非明确只读，否则 `confirmation_required` 更严。

未知能力 id 在 `PUT .../capabilities` 返回 422；以 `/*` 结尾的通配不算未知。

## 可公开事件

`RunRecorder` 只留适合展示的摘要：节点名、阶段、数量、耗时、状态。不写 Prompt、Token、密钥、原始工具载荷或思维过程。

```json
{
  "sequence": 3,
  "category": "tool",
  "name": "knowledge_retrieve",
  "label": "检索知识",
  "status": "completed",
  "duration_ms": 142.5,
  "details": {"document_count": 4, "confidence": 0.84}
}
```

## 资源管理边界

`config_worker` 只管理应用受管资源：FFmpeg、ASR、Embedding、Reranker、Separator、RVC、GPT-SoVITS 运行环境。它不负责删除用户音色模型、会话附件、历史任务结果、知识文档或任意外部路径。

## 本地优先的实际含义

- 默认 FastAPI 绑定 `127.0.0.1`，端口 `18000`
- 设置/资源/诊断 `require_local`：client host ∈ `{127.0.0.1, ::1, localhost, testclient}`，Host 同样，有 Origin 则 scheme/host/port 一致
- 局域网 IP 打开时页面可能还能看，写入 403 `Local settings are available on localhost only`。CORS `allow_origins=["*"]` 解决不了
- 默认向量库 Milvus Lite 文件；角色/会话/Run 用本地 SQLite
- LLM、联网搜索、GPT-SoVITS、VTube Studio 仍可能把数据送出本机，由对应配置决定
- `.env`、Token、API Key、私有音频和文档不能提交到 Git

实时听写 WS 对非 `LOCAL_HOSTS` 直接 close 1008。

“本地优先”不是“所有处理永远不出本机”，而是默认把控制面和主要资源放在本地，并把外部调用拆成可配置适配器。

## 相关源码

```text
app/models.py                    SQLite 实体
app/run_store.py                 运行任务与事件摘要
agents/contracts.py              交接/结果合同
agents/graph/supervisor.py       dispatch 禁键与 task_type
agents/capabilities.py           能力目录与策略
agents/assignment.py             MCP grants ↔ mcp/{server}/*
agents/mcp_grants.py             MCP 授权
agents/observability.py          公开事件
ingestion/milvus_store.py        向量库与作用域过滤
app/routers/attachments.py       附件引用
```

继续：[内置 Runtime](/concepts/runtime) · [知识与记忆](/capabilities/knowledge-memory) · [扩展](/capabilities/extensions)
