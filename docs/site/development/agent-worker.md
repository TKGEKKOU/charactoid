# Agent 与 Worker

**CHARACTOID 的 Agent 图是中心辐射，不是群聊。只有 `persona_supervisor` 对用户说话；Worker 执行领域动作，经 `finalize_*` 把结构化结果交回 Supervisor。**

源码：`agents/graph/build.py`、`agents/graph/supervisor.py`、`agents/graph/knowledge.py`、`agents/graph/state.py`、`agents/registry.py`、`agents/contracts.py`、`agents/service.py`、`agents/runtime/models.py`（`AgentResult` / `validate_structured_handoff`）。

工具全表与超时见 [Worker 清单](/reference/workers)。新增 Worker 的改文件清单见 [注册 Worker 与工具](./worker-registration)。

## 真实主流程

```text
用户输入
→ PersonaAgentService（pending 门禁、能力清单、意图线索）
→ START → persona_supervisor
→ 缺少输入：supervisor_dispatch → interrupt(waiting_input)
→ 有合同：delegate_to_* / supervisor_dispatch → Worker 节点
→ Worker 只使用注册表里属于自己的工具
→ finalize_* 校验 SpecialistResult / AgentResult
→ 普通任务：supervisor_collect → persona_supervisor → 角色化回复
→ RVC/voice 非 completed：rvc_wait_boundary → 父图 END（不再二次生成）
```

`build_persona_workflow()` 的设计要点（源码 docstring）：

- 只有 `persona_supervisor` 对用户可见，是唯一直接生成最终回复的节点。
- Worker 通过 handoff 工具 `Command(PARENT, goto=worker_node)` 把控制权从 Supervisor 子图交回父图对应节点。
- checkpointer 按 `thread_id = persona_id:conversation_id` 持久化整张图。
- **图中没有 Worker 直达父图 END 的边**（RVC wait boundary 是 finalize 之后的命名节点，不是 Worker 自己跳 END）。

父图闭环：

```text
START → persona_supervisor → (END 若闲聊结束)
                         ↘ supervisor_dispatch → Worker → finalize_* → supervisor_collect → persona_supervisor
                                                                    ↘ rvc_wait_boundary → END
```

`intent_route` 仍注册为兼容节点，**不再位于主入口**。所有专项任务必须先经过 Core 的信息收集和结构化 handoff。

## 节点清单

| 节点 | 文件 | 作用 |
| --- | --- | --- |
| `persona_supervisor` | `supervisor.py` `_supervisor_agent` | 人设回复、决定 handoff |
| `intent_route` | `build.py` `_intent_route` | 兼容；RVC 一律打回 supervisor |
| `supervisor_dispatch` | `_supervisor_dispatch` | 校验合同、缺参 interrupt、写入 `route_node` |
| `supervisor_collect` | `_supervisor_collect` | 门禁后的 Worker 结果交给 Core |
| `{worker}` | `_worker_agent` 或知识子图 | 领域执行 |
| `finalize_{worker}` | `_finalize_worker` | 清 `active_worker`、封装 JSON |
| `rvc_wait_boundary` | `lambda _state: {}` 后接 END | RVC/voice 非终态不再二次生成 |

`_DIRECT_STAGE_LABELS` 只在旧的 intent 直达路径里写 stage。RVC 的文案是“正在分析请求…”，即使漏斗认出 RVC 也不会进 `rvc_worker`。

## Supervisor 做什么、不做什么

可以：

- 闲聊和角色化表达
- 收集缺失信息
- 选择 Worker 并构造 `dispatch_request`
- 按需 `load_skill`
- 读 Worker 的 evidence / artifacts / error，组织最终回复

不可以：

- 自己跑 RAG SQL 或随便拼检索词当“已经查过”
- 执行 Shell、改任意路径、启动未受管进程
- 把未校验的 Worker 草稿直接给用户
- 假装长任务已经完成
- 在 dispatch 阶段替 RVC 一次问完模型/Index/音高（那会让前端永远进不了 worker）

handoff 工具名是 `delegate_to_{worker}`。描述要求提供 JSON：`task_type`、`input_refs`、`options`、`conversation_context`。只用受管文件/模型 ID，永不提供路径。

## Canonical Worker 名

`agents/graph/state.py`：

```text
knowledge_worker
memory_worker
document_worker
profile_worker
voice_worker
rvc_worker
live2d_worker
config_worker
```

`WORKERS` 元组与 `registry._WORKER_ORDER` 顺序一致。旧名只在 `LEGACY_WORKER_ALIASES`：`knowledge`、`memory`、`document`、`profile`、`voice`、`voice_clone`、`live2d`、`rvc`、`config`。新代码和新合同永远写带 `_worker` 后缀的名字。`canonicalize_worker_name()` / `worker_node_name()` 读旧 checkpoint 时用。

## Worker 职责与执行默认值

`registry._WORKER_EXECUTION_DEFAULTS`：

| Worker | 负责 | 不负责 | 默认超时 | 重试 |
| --- | --- | --- | ---: | --- |
| `knowledge_worker` | RAG、只读 SQL、策略化联网 | 无证据自由作答 | 45s | 2 次，0.5s |
| `memory_worker` | 角色记忆、工作区记忆 | 文档索引 | 30s | 1 |
| `document_worker` | 列表、上传、URL 导入 | 最终角色表达 | 120s | 2 次，1s |
| `profile_worker` | 人设修改、会话导出 | 语音推理 | 30s | 1 |
| `voice_worker` | TTS、ASR、Studio、GPT-SoVITS | RVC 文件工作流 | 300s | 1 |
| `rvc_worker` | 变声会话、分离、转换 | 实时对话 TTS | 1800s | 1 |
| `live2d_worker` | 模型清单、VTS、本地目录 | 音频训练 | 45s | 1 |
| `config_worker` | 受管资源安装/更新/取消/清理 | 领域内容回答 | 45s | 1 |

媒体任务几乎不重试，避免把训练或变声跑两遍。知识检索可以短重试，失败常常是嵌入服务抖动。

RVC 必须由 Supervisor handoff。意图漏斗不能把一句话直接送进 `rvc_worker`。

## task_type 允许集合

`_TASK_TYPES_BY_WORKER`（`supervisor.py`）。空集合等于不校验类型；当前每个 Worker 都有集合，未知类型在 dispatch 直接失败：

| Worker | 允许的 task_type |
| --- | --- |
| knowledge_worker | `search_knowledge` `search_web` `query_structured_data` `legacy_request` |
| memory_worker | `save_memory` `recall_memory` `legacy_request` |
| document_worker | `ingest_document` `manage_document` `legacy_request` |
| profile_worker | `update_profile` `legacy_request` |
| voice_worker | `voice_asset` `voice_clone` `voice_status` `voice_training` `voice_synthesize` `voice_transcribe` `voice_reference` `legacy_request` |
| rvc_worker | `convert_audio_with_rvc` `mix_rvc_instrumental` `prepare_rvc_source` `separate_rvc_vocals` `cancel_rvc_task` `legacy_request` |
| live2d_worker | `manage_live2d` `legacy_request` |
| config_worker | `update_config` `resource_status` `resource_install` `legacy_request` |

`legacy_request` 是兼容通道，新 Supervisor 提示应写具体类型。

## RVC / voice 的 action

`_normalize_dispatch_request` 把 action 固定进 `options`，避免 Worker 从自由文本猜动作。

RVC 合法 action：`prepare_and_separate` `separate_vocals` `session_status` `convert` `cancel`。

别名：`prepare` / `prepare_source` / `confirm_processing` → `prepare_and_separate`；`separate` → `separate_vocals`；`conversion` → `convert`。

voice 合法 action：`analyze` `session_status` `confirm_segments` `save_voice` `upload_segments` `synthesize` `transcribe` `bind` `train` `cancel`。

别名：`confirm_processing` / `prepare` → `analyze`；`segments` → `confirm_segments`；`tts` → `synthesize`；`asr` → `transcribe`。

引用键合并：RVC 看 `session_id` / `rvc_session_id` / `source_file_id` / `audio_file_id` / `input_file_id` / `model_id` / `index_id` / `task_id` 等。恢复确认时，state 里的 `input_refs` 会 merge 进可能过期的 attachment-only 快照——这是“确认只发 action”仍能继续的桥。

## 禁止字段

`_FORBIDDEN_DISPATCH_KEYS`：

```text
input_path, output_path, path, command, cmd, shell, python, python_file
```

与 Runtime `StructuredHandoff` 的禁键一致。Worker 需要文件时用 `attachment_id` / `file_id` / `session_id`，产出用 `asset_id`。出现禁键时 dispatch 返回公开错误“任务交接包含禁止字段：…”，不把路径交给工具层。

## 工具元数据

`ToolSpec` 字段：

- `name`：模型看见的工具名
- `specialist`：挂到哪个 Worker
- `requires_confirmation`：执行前 HITL
- `mutates_data`：是否写数据
- `server`：可选 MCP server

写不写数据、要不要确认，不从名字猜测。联网搜索本身只读，但知识 fallback 仍可能要求确认；MCP 默认更严。完整 66 条 ToolSpec 见 [Worker 清单](/reference/workers)。

按 Worker 分组的能力边界：

- knowledge：检索、列结构化表、只读查询、联网
- memory：读写删角色记忆与工作区记忆
- document：加入知识、删文档、URL 导入
- profile：改名、更新人设、导出会话
- voice：Studio 会话、训练、绑定、TTS、ASR、GPT-SoVITS 控制
- rvc：session、附件、分离、转换、混音、取消
- live2d：模型列表、VTS 配置、打开模型目录
- config：资源状态、安装管理、配置变更

`worker_tools(worker)` = `tools_for_specialist(worker)`。Worker Agent 拿不到别人的工具。

## 回来的合同

`SpecialistResult`（`agents/contracts.py`）状态闭合：

`accepted` / `insufficient` / `confirmation_required` / `completed` / `failed`

字段：`answer` / `evidence` / `citations` / `uncertainties` / `trace` / `confidence` / `pending_action` / `artifacts` / `error`。`worker` 是 property，等于 `specialist`。`as_dict()` 会加 `requires_approval = status == confirmation_required or pending_action is not None`。

图层还有更宽的公开 Worker 状态（`_ALLOWED_WORKER_RESULT_STATUSES`）：

`accepted` `queued` `running` `waiting_input` `completed` `insufficient` `failed` `error` `denied` `confirmation_required`

终态：`completed` / `insufficient`。失败：`failed` / `error` / `denied`。

RVC 旧工具仍返回 `ok` / `rejected` 等，公共边界映射：

| 旧 status | 映射 |
| --- | --- |
| `ok` | `accepted` |
| `rejected` | `failed` |
| `unavailable` | `error` |
| `not_found` | `failed` |
| `not_cancelled` | `failed` |

`_validate_public_worker_result` 会跑 `validate_structured_handoff` + `AgentResult.model_validate`。归属 Worker 不匹配、状态不在集合、合同无效：返回公开错误，不把异常细节泄漏到对话。

## finalize 与 rvc_wait_boundary

`_finalize_worker`：

- 先发 stage（“知识检索完成”“RVC 音频生产任务已完成，整理结果中…”等）。
- `knowledge_worker` 走 `_knowledge_specialist_result`：Supervisor 只接收门禁后的 JSON；未通过时只有不确定性，不含答案草稿或弱证据。
- 其它 Worker：倒序找属于自己工具名的 `ToolMessage`，JSON 解析后取第一条结构化 payload。`AIMessage` 只在没有工具结果时当兼容摘要，**不能**把 Worker 内部对话当作用户答复。

`_after_finalize_route`：

- worker 是 `rvc_worker` 或 `voice_worker` **且** `dispatch_status != completed` → `rvc_wait_boundary`
- 否则 → `supervisor_collect`

源码原因：RVC UI 直接消费 Worker 合同。这些状态再回 Core 会幻觉成功，并且下一句短回复（例如“A”）会二次 handoff。`rvc_wait_boundary` 是空节点接 END，保留图内省的命名分支。

条件边仍列出 `persona_supervisor` 作为 legacy/introspection 分支；运行时 router 对 RVC 非终态选 `rvc_wait_boundary`。

## 知识 Worker 为什么是子图

`agents/graph/knowledge.py` `_knowledge_subgraph` 固定为：

```text
START → knowledge_planner → knowledge_retrieve → knowledge_fallback → END
```

父图再把这个子图的 END 接到 `finalize_knowledge_worker`。

- Planner 只出受 schema 约束的计划（`search_persona_knowledge` / `query_structured_data`），不自己编最终答案。
- retrieve 跑确定性检索或只读 SQL。
- fallback 在证据不足时拒答、请求确认、或按 `decide_web_fallback` 联网。

这样比让通用 Agent 一边写 SQL 一边编答案更容易审计。检索必须带工作区和知识空间过滤，见 [RAG 设计](/concepts/rag)。

结构化查询结果有行数上限；截断时会附加“结果已按安全上限截断。”

## 服务入口

`PersonaAgentService` 对外：`query` / `stream_query` / `resume` / `stream_resume`。Runtime 的 `NativeAgentLoop` 包住这些调用，使取消和 Job 状态一致。不要从路由里直接 invoke 某个 Worker 节点。

`thread_id(context, specialist)` 忽略 specialist，始终 `persona_id:conversation_id`。

图重建条件：

- `_workflow is None`
- `tool_registry.tool_registry_revision()` 变化（MCP/工具热更新）
- Settings 的 LLM 指纹变化（key / base_url / model）

构造后若宿主注入了自定义 workflow，第一次使用把当前 Settings 当基线，不覆盖已注入执行器；之后配置变化仍重建。

pending 门禁：已暂停的写操作必须先由用户处理，不能用新问题绕过。见 [对话与任务](/guide/conversation)。

## WorkerManifest

描述性合同，不执行工具。字段：`name` `description` `input_schema` `output_schema` `capabilities` `mutating_operations` `requires_confirmation` `timeout_seconds` `retry_policy` `tools`。

`read_only` = 没有 `mutating_operations`。`timeout_seconds` 必须 > 0；`WorkerRetryPolicy.max_attempts` ≥ 1，`backoff_seconds` ≥ 0。

Manifest 给 API、控制台、Runtime 读；真正执行仍走 ToolSpec 里的 `BaseTool`。

## 注册新 Worker 时要改什么

最小集合：

1. `state.py` 的 `Worker` 字面量和 `WORKERS`（以及必要时 `LEGACY_WORKER_ALIASES`）
2. `registry.py` 的 `_WORKER_ORDER`、超时、ToolSpec、Manifest
3. `graph/build.py`：节点、finalize 边；若不能直达用户，不要加 Worker→END
4. `supervisor.py`：`delegate_to_*`、`_TASK_TYPES_BY_WORKER`、缺参规则、finalize 文案
5. 合同字面量 `SpecialistResult.specialist`
6. 若需要 wait boundary 或禁止意图直达，显式写进 `_intent_route` / `_after_finalize_route`
7. 文档：本页、Worker 清单、能力页、必要时 API

细节步骤见 [注册 Worker 与工具](./worker-registration)。

## 不要这样实现

- Worker 互相通话
- Worker 直达父图 END
- 用自然语言模板解析 Worker 结果
- 让模型自由拼接 SQL 或 Shell
- 把所有 Worker 当成对等聊天机器人
- 意图漏斗直达 RVC
- 在 Core 二次生成 RVC 非终态的“成功”消息
- 把本地路径放进 `dispatch_request`

## 相关

[对话与任务](/guide/conversation) · [内置 Runtime](/concepts/runtime) · [Worker 清单](/reference/workers) · [注册 Worker](./worker-registration) · [RAG](/concepts/rag)
