# Worker 清单

**Worker 是监督者可以委派的领域执行器。** 它们在 `agents/registry.py` 注册，有固定顺序、超时、重试、输入输出 JSON Schema 和工具切片。HTTP 清单在 `app/routers/worker_manifests.py`。

> **事实依据**：`agents/registry.py` 的 `_WORKER_ORDER`、`_WORKER_DESCRIPTIONS`、`_WORKER_EXECUTION_DEFAULTS`、`_WORKER_INPUT_SCHEMA`、`_WORKER_OUTPUT_SCHEMA`、`_WORKER_COMPAT_ALIASES`、`ToolSpec`。

## HTTP

| 方法 | 路径 | 行为 |
| --- | --- | --- |
| GET | `/api/workers/manifests` | `{"items":[manifest.as_dict(), ...]}` 按规范顺序 |
| GET | `/api/workers/manifests/{worker}` | 单个清单；未知名字 404 `Worker manifest not found` |

`{worker}` 会走 `_canonical_worker_name`，因此旧短名 `knowledge` 也能命中 `knowledge_worker`。

## 规范顺序

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

顺序出现在 `worker_manifests()` 的循环里，也是 UI 和文档应使用的展示顺序。不要按英文字母重排，那会把“先检索再改档”的阅读习惯打乱。

## 超时与重试

来自 `_WORKER_EXECUTION_DEFAULTS`：

| name | timeout_seconds | retry |
| --- | ---: | --- |
| knowledge_worker | 45 | max 2，backoff 0.5s |
| memory_worker | 30 | 1 |
| document_worker | 120 | max 2，backoff 1.0s |
| profile_worker | 30 | 1 |
| voice_worker | 300 | 1 |
| rvc_worker | 1800 | 1 |
| live2d_worker | 45 | 1 |
| config_worker | 45 | 1 |

这些数字不是产品文案。知识检索允许一次短重试；RVC 是半小时级任务，重试 1 次是为了避免把长管道跑两遍。

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

含义：

| 字段 | 监督者怎么用 |
| --- | --- |
| `answer` | 领域结论，不是最终对用户的角色台词 |
| `evidence` / `citations` | 检索或记忆依据；缺证据时不应把流程写死 |
| `artifacts` | `asset_id`、附件、文件引用 |
| `uncertainties` | 明确不知道的部分，避免幻觉补全 |
| `trace` | 可观察步骤，供时间线 |
| `requires_approval` | 世界还没改，等 HITL |
| `error` | 对象或 `null`，不要用空字符串代替 |

## 职责对照

描述来自 `_WORKER_DESCRIPTIONS`（大意）：

| Worker | 做什么 | 典型工具 |
| --- | --- | --- |
| knowledge_worker | 在当前角色知识空间检索，也可查询结构化数据；可申请补公共信息 | `search_persona_knowledge`，`web_search`，`list_structured_tables`，`query_structured_data` |
| memory_worker | 读写当前角色范围内的用户记忆与工作记忆 | `read/save/update/delete_persona_memory`，workspace 记忆 |
| document_worker | 处理当前角色的知识文档：上传、索引、URL 导入 | `list_persona_documents`，删除文档，`import_knowledge_from_url` |
| profile_worker | 读改当前角色档案，不碰别人 | `update_persona_profile`，`rename_persona` |
| voice_worker | TTS/ASR/实时听写/Voice Studio/训练/GPT-SoVITS | `agents/tools/voice.py` 一整组 |
| rvc_worker | RVC 转换的源检查、提交和管道 | `agents/tools/rvc.py` |
| live2d_worker | 模型列表、VTS、打开目录 | `list_live2d_models` 等 |
| config_worker | 查询/安装/更新/取消资源，执行窄功能 | `agents/tools/config.py` |

## 工具切片规则

`tools_for_specialist(specialist)` 只返回 `ToolSpec.specialist == worker` 的工具。注释写明：

- knowledge 拥有检索 / SQL / 联网补全；
- memory 拥有记忆读写；
- 其它 Worker 只拥有窄工具；
- MCP 的 specialist 固定为 `"mcp"`，**不属于**任何内置 Worker，避免越权。

`ToolSpec` 字段：

- `requires_confirmation`：执行前 HITL
- `mutates_data`：是否写数据
- `server`：MCP 服务器名，内置为空

`web_search` 还受 `Settings.enable_web_fallback` 控制：没开时不会出现在“可自动使用”摘要里。

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

`register_tool_specs` / `unregister_tool_specs` 会增加 `_REGISTRY_REVISION`。Manifest 的工具列表始终从当前 `tool_specs()` 计算，避免文档和运行时两张表。扩展 Skill / MCP 的写法见 [注册 Worker 与工具](/development/worker-registration) 和 [扩展 Skill 与 MCP](/development/extensions)。
