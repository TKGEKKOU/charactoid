# 创建与配置角色

**角色是工作区里的一等对象：人设、能力、知识空间、记忆、声音和形象都挂在同一个 `persona_id` 上。** 对话 API 全部嵌在 `/api/personas/{id}/...` 下面。换角色就是换这个 id，不要指望记忆、知识或音色跟着“当前窗口”走。

> **事实依据**：`app/routers/personas.py`、`persona/service.py` 的 `create_persona` / `LOCAL_WORKSPACE_ID`、`persona/guide.py` 的内置保护、`persona/delete_service.py`、`app/routers/persona_drafts.py`、`app/routers/persona_versions.py`、`agents/policy.py`、`agents/assignment.py`、`agents/registry.py` 的 `capability_catalog`、MCP grants 接口、`profile_worker` 超时。

## 创建时实际发生了什么

`POST /api/personas` 的请求体是 `PersonaCreate`：`name`（1–255，strip 后不能空）+ `profile`（默认 `{}`）。`extra` 禁止。201 返回 `PersonaResponse`。

`create_persona(session, name, profile)` 会：

1. 新建一个 `KnowledgeSpace(workspace_id=local-default)` 并 flush；
2. 新建 `Persona`，`workspace_id=local-default`，`knowledge_space_id` 指向刚创建的空间，`profile_json=profile or {}`，`status="ready"`；
3. 再 flush。Router 随后 `commit` + `refresh`。

也就是说：**每个角色自带一个知识空间**，不是“全站一个库、角色只是标签”。`resolve_knowledge_scope` 读到角色不在本地工作区、或知识空间丢了 / 不在本地，都抛 `PersonaNotFound`。

`find_persona_by_name` 只在 `LOCAL_WORKSPACE_ID` 里按 `created_at, id` 取第一条同名角色。名字不唯一约束到数据库层；同名时不要假设后创建的会覆盖先创建的。

## 生命周期

Router 前缀 `/api/personas`：

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/personas` | 创建，201，`PersonaCreate`: name + profile |
| GET | `/api/personas` | 仅 `workspace_id == LOCAL_WORKSPACE_ID`，按 `created_at, id` |
| GET | `/api/personas/{id}` | 单条；不在本地工作区 404 `Persona not found` |
| PATCH | `/api/personas/{id}` | `PersonaUpdate`：可选 name / profile。profile 是浅合并；若含 `rag` 会走 `validate_retrieval_config`，非法 422 `Invalid RAG configuration: ...` |
| DELETE | `/api/personas/{id}` | 204；内置指南角色 403 `内置角色不能删除` |
| GET | `/api/personas/{id}/documents` | 该角色知识空间里 `status != deleted` 的 DocumentJob |
| GET/PUT | `/api/personas/{id}/capabilities` | 角色能力包与覆盖 |
| GET/PUT | `/api/personas/{id}/mcp-grants` | 角色级 MCP 授权 |

`PersonaResponse` 字段：`id`、`name`、`workspace_id`、`knowledge_space_id`、`persona_type`（`character` | `knowledge_expert`）、`profile`（来自 `profile_json`）、`status`。

`local_persona_or_404`：`session.get` 不到，或 `workspace_id != LOCAL_WORKSPACE_ID`，一律 `Persona not found`。不要靠猜 id，也不要区分“不存在”和“在别人的工作区”——对本地 UI 这是同一扇门。

列表接口**不会**返回其他 workspace 的角色。创建后立刻 `GET /api/personas` 看不到，优先怀疑没 commit、或看错了 workspace，而不是“创建 API 没写库”。

## 人设是档案，不是 Prompt 拼盘

profile 由 `profile_worker` 读改，超时 **30s**，`WorkerRetryPolicy(max_attempts=1)`，不重试。工具包括 `rename_persona`、`update_persona_profile`、`export_conversation`。改欢迎词、口型策略、允许做什么，属于写操作，监督者通常会要求确认。不要在每句对话里把整份人设再贴一遍；上下文工厂会按角色装配。

页面上的保存可以走 REST PATCH；**对话里的“帮我改人设”必须进监督者**，再交给 `profile_worker`。不要让前端在聊天成功回调里再 PATCH 一次，那会产生两份真相。

导出会话也走同一 Worker，避免“前端直接读 SQLite 当副作用”。

## 从材料创建：草稿

前缀 `/api/persona-drafts`。这是另一条创建路径：先上传材料，后台分析，再确认成角色。

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/persona-drafts/upload` | `mode=character\|expert` + `files`；201；后台 `analyze_draft_background` |
| GET | `/api/persona-drafts/{draft_id}` | 404 `Persona draft not found` |
| PATCH | `/api/persona-drafts/{draft_id}` | 仅 `status==draft` 可改 name/profile；已确认 409 |
| POST | `/api/persona-drafts/{draft_id}/candidates/{candidate_id}` | 选候选人设；已确认 409；候选不存在 404 |
| POST | `/api/persona-drafts/{draft_id}/confirm` | 名字空 409；有候选却没选 409 |

上传时每个文件走 `create_conversion_job`。`UNSUPPORTED_FILE_TYPE` → 415，`FILE_TOO_LARGE` → 413，其它转换失败 422。`mode=character` 时 `chunking_preset="character"`，否则 `knowledge_base`。草稿状态先变成 `analyzing`。

分析失败不会把草稿卡死：`analyze_draft_background` 会退回 `fallback_identity(mode, filename)`，清空 `candidates_json`，状态写成 `draft`。

`confirm_draft` 对草稿行 `FOR UPDATE`。如果已经有 `persona_id`，直接返回那个角色（幂等）。否则用草稿的 `knowledge_space_id`、`suggested_name`、`persona_type`、`profile_json` 新建 `Persona`，`status="ready"`，草稿标 `confirmed`。确认后会对仍是 `preview` 的文档 `prepare_index` 并调度索引——**草稿确认不等于知识已经 indexed**。

## 版本与回滚

`app/routers/persona_versions.py` 仍挂在 `/api/personas` 下，用来做可回滚的运行时快照，而不是覆盖 SQLite 一行了事。

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/{id}/versions` | 201；快照含当前 MCP 授权名 |
| GET | `/{id}/versions` | 列表，默认不含 snapshot |
| GET | `/{id}/versions/diff?from_version_id=&to_version_id=` | 两边缺一则 404 |
| GET | `/{id}/versions/{version_id}` | 含 snapshot |
| POST | `/{id}/versions/{version_id}/publish` | 发布快照到当前角色 |
| POST | `/{id}/versions/{version_id}/rollback` | 与 publish 同一套 `_publish_version`，`action` 不同 |

`PersonaVersionCreate`：`label` 最长 255，`note` 最长 5000，都会 strip。版本状态字面量是 `draft` / `published` / `superseded`。

发布时会 `_apply_mcp_server_names`。若 MCP 管理器未就绪但快照里有服务器名 → 409。快照里的服务器现在已经不存在 → 409。失败会 `session.rollback()`，并尝试把 MCP 配置写回 `previous_servers`。全局 `GLOBAL_ALL` 的服务器不参与按角色覆盖。

## 删除是级联，不是藏起来

`DELETE /api/personas/{id}` 走 `PersonaDeletionService.delete`：

1. 找不到或不在本地 → `PersonaNotFound` → 404；
2. `is_builtin_profile`（`builtin=true` 或指南角色）→ `BuiltinPersonaProtected` → 403 `内置角色不能删除`；
3. 尽量删 Milvus 知识空间；失败只打 warning，**不阻断** SQLite 删除（避免坏向量库把角色永久锁死）；
4. 同样尽力删结构化知识空间；
5. `delete_persona_checkpoints`，按 `persona_id:%` 清 LangGraph 表；
6. 删对话消息、记忆、RAG query/feedback/eval、相关草稿；
7. 再删 DocumentJob、KnowledgeSpace、Persona 本身；
8. 只删除 `data/` 下该角色文档拥有的目录；
9. Router 额外 `unlink` `data/tts/voices/{persona_id}.wav`（`missing_ok=True`）。

角色删除后不要假设向量会立即被人读到——空间与 job 有自己的删除路径。检索为空时先看 job 是否 `indexed`，以及有没有 `confirm`。

## 内置指南角色

`GUIDE_CATALOG_ID = "charactoid-guide"`。`ensure_guide_persona` 在启动时播种：从 `catalog/guide-persona/persona.json` 读名字和 profile，写入 `catalog_id` / `builtin` / `guide`。知识目录里的 `*.md` 只建成 `preview_ready` 的 DocumentJob，**避免 lifespan 在 Milvus 没起来时把 seed 搞失败**。

`should_use_preset_replies`：指南角色 **且** `Settings.openai_api_key` 为空时，用 `catalog/guide-persona/replies.json` 的关键词匹配，不走 LLM。不要拿内置指南角色当可以随便删的试验品。

## 能力与授权

- `GET /api/personas/{id}/capabilities`
- `PUT /api/personas/{id}/capabilities`

GET 返回：`overrides`、`skills`、`capabilities`、`packages`。目录来自 `capability_catalog()` 和 `build_capability_packages`。skill id 形如 `skill/{name}`，带 `builtin` / `enabled` / `trusted` / `tool_names`。

PUT 的 body 是 `{ "overrides": { "capability_id": bool } }`。`overrides` 不是对象 → 422。未知 id（且不是 `.../*` 通配）→ 422 `Unknown capabilities: ...`。`CapabilityPolicyStore.replace_for_persona` 抛 `ValueError` 也是 422。

未授权时 `decide_capability` 直接 `reject`，run 侧是 `capability_denied`，公开文案是“当前角色没有执行此操作的权限。”

这和资源未安装不同：

| 情况 | 表现 |
| --- | --- |
| 没装 GPT-SoVITS | 资源 status / `voice_worker` 失败，`provider_unavailable` 或资源 `next_action` |
| 装了但角色没开语音能力 | 监督者拒，`capability_denied` |
| 开了能力但要写盘 / 联网 | `confirm`，等 `POST /api/runs/{id}/approval` |

第一次把能力全打开，监督者会面对更多确认分支，很难判断“卡住是正常确认还是真故障”。

## MCP

- `GET /api/personas/{id}/mcp-grants`
- `PUT /api/personas/{id}/mcp-grants`

MCP 管理器来自 lifespan 里的 `MCPManager(data/mcp_servers.json)`。尚未就绪 → 503 `MCP 管理器尚未就绪`。授权是角色级的，不是全局一把钥匙。返回结构带 `enabled` / `global` / `authorized`。`GLOBAL_ALL` 只用于组装可选项，不表示每个角色默认全开。带 `GLOBAL_ALL` 的服务器在 PUT 时**跳过**，不能靠取消某个角色把它关掉。

PUT body：`{ "server_names": ["..."] }`。保存失败 `ValueError` → 422。成功后 `refresh_grants()`，并对每个服务器 `sync_mcp_wildcard_policy`，把 `mcp/{server}/*` 写进能力覆盖。

`agents/assignment.py` 的硬规则：

- MCP grants 是 fail-closed：没出现在 `allowed_persona_ids` 里就看不见服务器；
- CapabilityPolicy 对 MCP 工具默认拒绝；
- **`*` 与具体 persona 覆盖不能共存**。全局授予时会清掉各角色残留的 True/False；撤销某个角色而当前是 `*` 时，会展开成“除该角色外的已知角色”，而不是清空整个 ACL；
- 未来新角色默认仍是 fail-closed，除非用户再次显式选 `*`。

允许任意 stdio 由 `settings.mcp_allow_arbitrary_stdio` 控制。不要在文档里把“能配 MCP”写成“任意命令都能跑”。

## 知识空间

`GET /api/personas/{id}/documents` 列出该角色文档 job。上传走 `POST /api/knowledge-spaces/{space_id}/documents/upload`，不走 personas 根路径。空间不在本地 → 404 `Knowledge space not found`。空文件列表 → 422 `At least one file is required`。

文档上传没有 `EMPTY_FILE` 这种业务码；空文件 422 只属于语音链路。文档侧对应的是“至少一个文件”、类型 415、过大 413、转换失败 422。

## 声音与形象

绑定音色、TTS、ASR、Studio 属于 `voice_worker`（300s）。Live2D 模型发现、VTS、目录属于 `live2d_worker`（45s）。RVC 属于 `rvc_worker`（1800s）。它们都是角色资源：

- 对话页开口：绑定音色，不是 RVC
- RVC 是受管变声任务，默认 1800s，产物应作为 artifacts 回到当前对话
- 形象口型：跟当前语音输出，不跟用户麦克风自动对口型（除非走实时听写那条链）

`_WORKER_ORDER` 是：`knowledge_worker` → `memory_worker` → `document_worker` → `profile_worker` → `voice_worker` → `rvc_worker` → `live2d_worker` → `config_worker`。兼容别名：`profile`、`voice`、`voice_clone`、`live2d`、`rvc`。

## 创建时建议一次只开必要能力

1. 名字 + 短 profile（`POST /api/personas`），或材料草稿确认；
2. 先对话，确认 LLM 通（`/agent/stream`，不要附件、不要写盘）；
3. 再开知识 / 记忆；
4. 再绑声音或形象；
5. 最后才接 QQ 或直播。

每一步都应该能回答：失败时的 `error.code` 是哪一层。

## 相关

[第一次任务](/guide/first-task) · [对话与任务](/guide/conversation) · [能力总览](/capabilities/overview) · [角色对话能力](/capabilities/persona-chat)
