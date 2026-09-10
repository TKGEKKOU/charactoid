# 创建与配置角色

**角色是工作区里的一等对象：人设、能力、知识空间、记忆、声音和形象都挂在同一个 `persona_id` 上。** 对话 API 全部嵌在 `/api/personas/{id}/...` 下面。换角色就是换这个 id，不要指望记忆、知识或音色跟着“当前窗口”走。

> **事实依据**：`app/routers/personas.py`、`persona/service.py` 的 `create_persona` / `LOCAL_WORKSPACE_ID`、`persona/guide.py` 的内置保护、`agents/policy.py`、`agents/registry.py` 的 `capability_catalog`、MCP grants 接口、`profile_worker` 超时。

## 生命周期

Router 前缀 `/api/personas`：

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| POST | `/api/personas` | 创建，201，`PersonaCreate`: name + profile |
| GET | `/api/personas` | 仅 `workspace_id == LOCAL_WORKSPACE_ID`，按 `created_at, id` |
| GET | `/api/personas/{id}` | 单条；不在本地工作区 404 `Persona not found` |
| PATCH | `/api/personas/{id}` | `PersonaUpdate`：可选 name / profile。profile 是浅合并；若含 `rag` 会走 `validate_retrieval_config`，非法 422 |
| DELETE | `/api/personas/{id}` | 204；内置指南角色会拒绝 |
| GET | `/api/personas/{id}/documents` | 该角色文档 job 列表 |
| GET/PUT | `/api/personas/{id}/capabilities` | 角色能力包 |
| GET/PUT | `/api/personas/{id}/mcp-grants` | 角色级 MCP 授权 |

`local_persona_or_404`：`session.get` 不到，或 `workspace_id != LOCAL_WORKSPACE_ID`，一律 `Persona not found`。不要靠猜 id，也不要区分“不存在”和“在别人的工作区”——对本地 UI 这是同一扇门。

列表接口**不会**返回其他 workspace 的角色。创建后立刻 `GET /api/personas` 看不到，优先怀疑没 commit、或看错了 workspace，而不是“创建 API 没写库”。

## 人设是档案，不是 Prompt 拼盘

profile 由 `profile_worker` 读改，超时 30s，不重试。改欢迎词、口型策略、允许做什么，属于写操作，监督者通常会要求确认。不要在每句对话里把整份人设再贴一遍；上下文工厂会按角色装配。

页面上的保存可以走 REST PATCH；**对话里的“帮我改人设”必须进监督者**，再交给 `profile_worker`。不要让前端在聊天成功回调里再 PATCH 一次，那会产生两份真相。

导出会话也走同一 Worker，避免“前端直接读 SQLite 当副作用”。

## 能力与授权

- `GET /api/personas/{id}/capabilities`
- `PUT /api/personas/{id}/capabilities`

目录来自 `capability_catalog()` 和 `build_capability_packages`。未授权时 `decide_capability` 直接 `reject`，run 侧是 `capability_denied`，公开文案是“当前角色没有执行此操作的权限。”

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

MCP 管理器来自 lifespan 里的 `MCPManager(data/mcp_servers.json)`。尚未就绪 → 503 `MCP 管理器尚未就绪`。授权是角色级的，不是全局一把钥匙。返回结构带 `enabled` / `global` / `authorized`。`GLOBAL_ALL` 只用于组装可选项，不表示每个角色默认全开。

允许任意 stdio 由 `settings.mcp_allow_arbitrary_stdio` 控制。不要在文档里把“能配 MCP”写成“任意命令都能跑”。

## 知识空间

`GET /api/personas/{id}/documents` 列出该角色文档 job。上传走 `POST /api/knowledge-spaces/{space_id}/documents/upload`，不走 personas 根路径。空间不在本地 → 404 `Knowledge space not found`。

角色删除后不要假设向量会立即被人读到——空间与 job 有自己的删除路径；checkpoint 会按 `persona_id:%` 清 LangGraph 表。检索为空时先看 job 是否 `indexed`，以及有没有 `confirm`。

## 声音与形象

绑定音色、TTS、ASR、Studio 属于 `voice_worker`（300s）。Live2D 模型发现、VTS、目录属于 `live2d_worker`（45s）。它们都是角色资源：

- 对话页开口：绑定音色，不是 RVC
- RVC 是受管变声任务，默认 1800s，产物应作为 artifacts 回到当前对话
- 形象口型：跟当前语音输出，不跟用户麦克风自动对口型（除非走实时听写那条链）

## 版本与草稿

另有 `persona_versions`、`persona_drafts` 路由，用来做可回滚的人设编辑，而不是覆盖 SQLite 一行了事。对内置指南角色，`BuiltinPersonaProtected` 会挡住破坏性操作。不要拿内置指南角色当可以随便删的试验品。

## 创建时建议一次只开必要能力

1. 名字 + 短 profile（`POST /api/personas`）
2. 先对话，确认 LLM 通（`/agent/stream`，不要附件、不要写盘）
3. 再开知识 / 记忆
4. 再绑声音或形象
5. 最后才接 QQ 或直播

每一步都应该能回答：失败时的 `error.code` 是哪一层。

## 相关

[第一次任务](/guide/first-task) · [对话与任务](/guide/conversation) · [能力总览](/capabilities/overview) · [角色对话能力](/capabilities/persona-chat)
