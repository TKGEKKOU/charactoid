# Worker 清单

**Worker 是监督者可以委派的领域执行器。** 它们在 `agents/registry.py` 注册，有固定顺序、超时、重试、输入输出 JSON Schema 和工具切片。HTTP 清单在 `app/routers/worker_manifests.py`。

> **事实依据**：`agents/registry.py` 的 `_WORKER_ORDER`、`_WORKER_DESCRIPTIONS`、`_WORKER_EXECUTION_DEFAULTS`、`_WORKER_INPUT_SCHEMA`、`_WORKER_OUTPUT_SCHEMA`、`_WORKER_COMPAT_ALIASES`、`ToolSpec`（当前 66 条）。`ToolSpec(` 在该文件中出现 66 次。

## HTTP

| 方法 | 路径 | 行为 |
| --- | --- | --- |
| GET | `/api/workers/manifests` | `{"items":[manifest.as_dict(), ...]}` 按规范顺序 |
| GET | `/api/workers/manifests/{worker}` | 单个清单；未知名字 404 `Worker manifest not found` |

`{worker}` 会走 `_canonical_worker_name`，因此旧短名 `knowledge` 也能命中 `knowledge_worker`。

## 规范顺序与职责

`_WORKER_ORDER` 也是 UI 和文档应使用的展示顺序。不要按英文字母重排。

| Worker | `_WORKER_DESCRIPTIONS` 原文 | timeout | retry |
| --- | --- | ---: | --- |
| `knowledge_worker` | 在当前角色知识空间中检索、查询结构化数据，并按策略补充公开信息。 | 45s | max 2，backoff 0.5s |
| `memory_worker` | 读取、维护当前角色范围内的用户记忆与工作区记忆。 | 30s | 1 |
| `document_worker` | 管理当前角色的知识文档、上传资料和 URL 导入任务。 | 120s | max 2，backoff 1.0s |
| `profile_worker` | 读取或修改当前角色的人设档案，并导出会话内容。 | 30s | 1 |
| `voice_worker` | 统一管理音色、TTS、ASR、实时语音、Voice Studio、训练与 GPT-SoVITS。 | 300s | 1 |
| `rvc_worker` | 管理本地 RVC 音色转换资源，并提交和跟踪受管的音频变声任务。 | 1800s | 1 |
| `live2d_worker` | 统一管理 Live2D 模型、VTube Studio 连接和本地模型目录。 | 45s | 1 |
| `config_worker` | 查询、安装、更新、取消和安全清理应用受管资源；不执行具体功能任务。 | 45s | 1 |

这些数字来自 `_WORKER_EXECUTION_DEFAULTS`，不是产品文案。知识检索允许一次短重试；RVC 是半小时级任务，`max_attempts=1` 是为了避免把长管道跑两遍。

RVC **必须**由 Supervisor handoff。`agents/graph/build.py` 的 `_intent_route` 若识别到 `rvc_worker`，会改送到 `persona_supervisor`，注释写明意图漏斗不能把一句话直接送进 `rvc_worker`。

## 输入合同

所有 Worker 的 input schema 目前相同：

```json
{
  "type": "object",
  "properties": {
    "request": { "type": "string", "description": "Supervisor 委派的任务说明" }
  },
  "required": ["request"],
  "additionalProperties": false
}
```

监督者把用户目标改写成给专家的 `request`，而不是把原始聊天记录整段塞进 Worker。

## 输出合同（必填）

`_WORKER_OUTPUT_SCHEMA.required`：

```text
worker
status
answer
evidence
artifacts
uncertainties
citations
trace
requires_approval
error
```

| 字段 | 监督者怎么用 |
| --- | --- |
| `answer` | 领域结论，不是最终对用户的角色台词 |
| `evidence` / `citations` | 检索或记忆依据；缺证据时不应把流程写死 |
| `artifacts` | `asset_id`、附件、文件引用 |
| `uncertainties` | 明确不知道的部分，避免幻觉补全 |
| `trace` | 可观察步骤，供时间线 |
| `requires_approval` | 世界还没改，等 HITL |
| `error` | 对象或 `null`，不要用空字符串代替 |

## ToolSpec 合同

```text
ToolSpec(name, specialist, tool, requires_confirmation=False, mutates_data=False, server="")
```

源码注释：

- `name`：Agent 可见的工具名
- `specialist`：挂到哪个 Worker
- `requires_confirmation=True`：变更类操作，执行前必须 HITL
- `mutates_data`：是否写数据，用于能力清单与只读/变更分组
- `server`：MCP 服务器名；内置工具为空

`mutates_data` 与 `requires_confirmation` 正交：

- 检索类不写数据；`web_search` 的 HITL 由 `knowledge_fallback` 按策略决定，不把「有时需要确认」写死成 ToolSpec
- `request_*_confirmation` 本身不写数据，但就是确认步骤
- 真正改记忆 / 文档 / 人设 / 配置的工具 `requires_confirmation=True`

`tools_for_specialist(specialist)` 只返回 `ToolSpec.specialist == worker` 的工具。MCP 的 specialist 固定为 `"mcp"`，**不属于**任何内置 Worker。`web_search` 还受 `Settings.enable_web_fallback` 控制：没开时不会出现在「可自动使用」摘要里。

`register_tool_specs` / `unregister_tool_specs` 会增加 `_REGISTRY_REVISION`。Manifest 的工具列表始终从当前 `tool_specs()` 计算。

## 全部 66 个内置工具

下表按 `agents/registry.py` 中 `ToolSpec(` 出现顺序。`conf` = `requires_confirmation`，`mut` = `mutates_data`。未写出的两个布尔量默认为 `False`。

### knowledge_worker（4）

| name | conf | mut |
| --- | :---: | :---: |
| `search_persona_knowledge` |  |  |
| `web_search` |  |  |
| `list_structured_tables` |  |  |
| `query_structured_data` |  |  |

### memory_worker（7）

| name | conf | mut |
| --- | :---: | :---: |
| `read_persona_memories` |  |  |
| `save_persona_memory` |  | ✓ |
| `update_persona_memory` |  | ✓ |
| `delete_persona_memory` |  | ✓ |
| `read_workspace_memories` |  |  |
| `save_workspace_memory` | ✓ | ✓ |
| `delete_workspace_memory` | ✓ | ✓ |

角色记忆可写但不强制确认；工作区记忆写入/删除要确认。这是源码里的字面量，不是文档推断。

### document_worker（4）

| name | conf | mut |
| --- | :---: | :---: |
| `list_persona_documents` |  |  |
| `add_persona_knowledge` | ✓ | ✓ |
| `delete_persona_document` | ✓ | ✓ |
| `import_knowledge_from_url` | ✓ | ✓ |

### profile_worker（3）

| name | conf | mut |
| --- | :---: | :---: |
| `rename_persona` | ✓ | ✓ |
| `update_persona_profile` | ✓ | ✓ |
| `export_conversation` |  |  |

### voice_worker（26）

| name | conf | mut |
| --- | :---: | :---: |
| `start_voice_clone_session` |  | ✓ |
| `request_file_upload` |  |  |
| `analyze_voice_material` |  |  |
| `request_training_confirmation` | ✓ |  |
| `start_voice_training` |  | ✓ |
| `train_voice_from_studio` |  | ✓ |
| `check_training_progress` |  |  |
| `bind_trained_voice` |  | ✓ |
| `list_voice_assets` |  |  |
| `get_voice_system_status` |  |  |
| `get_gpt_sovits_engine_status` |  |  |
| `control_gpt_sovits_service` |  | ✓ |
| `synthesize_voice_asset` |  | ✓ |
| `create_voice_asset` |  | ✓ |
| `update_voice_asset` |  | ✓ |
| `delete_voice_asset` | ✓ | ✓ |
| `transcribe_voice_attachment` |  | ✓ |
| `get_voice_asset` |  |  |
| `set_voice_asset_reference_audio` |  | ✓ |
| `bind_voice_asset_to_persona` |  | ✓ |
| `upload_voice_studio_segments` |  | ✓ |
| `cancel_voice_studio_session` |  | ✓ |
| `list_voice_studio_sessions` |  |  |
| `get_voice_studio_session` |  |  |
| `get_voice_training_status` |  |  |
| `get_persona_voice_binding` |  |  |

语音训练的确认步骤是 `request_training_confirmation`（conf=True, mut=False），真正开训是后面的 `start_voice_training` / `train_voice_from_studio`。删除音色资产才同时 conf+mut。

### rvc_worker（13）

| name | conf | mut |
| --- | :---: | :---: |
| `create_rvc_session` |  |  |
| `attach_file_to_rvc_session` |  |  |
| `prepare_rvc_source` |  |  |
| `separate_rvc_vocals` |  |  |
| `get_rvc_session` |  |  |
| `mix_rvc_instrumental` |  | ✓ |
| `register_rvc_result_attachment` |  | ✓ |
| `get_rvc_status` |  |  |
| `list_rvc_models` |  |  |
| `validate_rvc_model` |  |  |
| `convert_audio_with_rvc` |  | ✓ |
| `get_rvc_task_status` |  |  |
| `cancel_rvc_task` |  | ✓ |

RVC 管道本身多数步骤不标 `requires_confirmation`；要不要让用户点确认由 Supervisor / confirmation_policy 在进入 Worker 之前决定，而不是每个转换工具自己再弹一次。

### live2d_worker（3）

| name | conf | mut |
| --- | :---: | :---: |
| `list_live2d_models` |  |  |
| `get_live2d_vts_config` |  |  |
| `open_live2d_model_directory` |  |  |

### config_worker（6）

| name | conf | mut |
| --- | :---: | :---: |
| `list_available_configs` |  |  |
| `get_config_detail` |  |  |
| `get_resource_install_status` |  |  |
| `manage_resource_install` | ✓ | ✓ |
| `request_config_change` | ✓ |  |
| `apply_config_change` |  | ✓ |

配置变更也是「先请求确认、再 apply」两段，和 Voice Studio 训练同构。

## 别名

`_WORKER_COMPAT_ALIASES`：

| 旧 | 规范 |
| --- | --- |
| knowledge | knowledge_worker |
| memory | memory_worker |
| document | document_worker |
| profile | profile_worker |
| voice / voice_clone | voice_worker |
| live2d | live2d_worker |
| rvc | rvc_worker |
| config | config_worker |

新代码、新文档、新 UI 只用右列。左列只为旧调用。

## 动态注册

扩展 Skill / MCP 的写法见 [注册 Worker 与工具](/development/worker-registration) 和 [扩展 Skill 与 MCP](/development/extensions)。角色能否看见某个 MCP server，另见 `agents/assignment.py` 的 `allowed_persona_ids` 与 `mcp/{server}/*`。