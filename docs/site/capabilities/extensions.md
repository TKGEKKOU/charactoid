# 扩展：Skill、Tool、MCP

**本页说明 CHARACTOID 如何把“角色能调用的能力”组织成三层：Tool 是一次动作，Skill 是一类任务方法，MCP 是外部工具服务器的适配。对应代码在 `agents/registry.py`、`agents/skills.py`、`agents/skill_parser.py`、`agents/mcp_grants.py`、`integrations/mcp/client.py`、`app/routers/skills.py`、`app/routers/mcp.py`。**

扩展体系的目标不是把所有工具一股脑交给模型。目标是：按角色授权、按任务加载、按副作用确认、按统一注册表执行。

## 先分清三个词

| 概念 | 它是什么 | 它不是什么 | 主要落点 |
| --- | --- | --- | --- |
| Tool | 有名字、有输入 schema、有执行函数的一次动作 | 不是角色，也不是一次完整对话 | `ToolSpec` + `agents/tools/*` |
| Skill | 一组说明 + 工具名集合，告诉 Agent 怎么处理某类任务 | 不是密钥包，也不是 MCP 服务器本身 | `agents/skills.py`、`skills/` |
| MCP | 把外部工具服务器发现来的工具，包装进同一套 ToolSpec | 不是自动可信，也不是绕过确认的后门 | `integrations/mcp/` |

一句话关系：

```text
角色策略
  → 决定哪些 Skill / MCP / 内置工具可见
Skill
  → 决定这一类任务先读什么、再调用哪些工具
Tool / MCP 工具
  → 真正执行，返回结构化结果
Runtime
  → 记录事件、确认、取消、资产
Supervisor
  → 把结果组织成对用户的回复
```

## ToolSpec 才是注册合同

`agents/registry.py` 里的 `ToolSpec` 当前字段是：

```python
@dataclass(frozen=True)
class ToolSpec:
    name: str
    specialist: str          # 挂到哪个 Worker，例如 knowledge_worker
    tool: BaseTool           # LangChain 工具实现
    requires_confirmation: bool = False
    mutates_data: bool = False
    server: str = ""         # MCP 服务器名；内置工具为空
```

读这段代码时不要沿用旧文档里的 `worker=` 参数。当前实现用 `specialist`，并有一层兼容别名：

```text
knowledge → knowledge_worker
memory → memory_worker
document → document_worker
profile → profile_worker
voice / voice_clone → voice_worker
live2d → live2d_worker
rvc → rvc_worker
config → config_worker
```

Worker 清单不是装饰。它决定：

- 工具会出现在哪个 Worker 的可见集合里；
- 超时和重试用哪一套默认值；
- API `/worker manifests` 对外展示什么；
- 变更类操作会不会先进入确认。

`mutates_data` 和 `requires_confirmation` 不是一回事。只读检索也可以要求确认，例如联网兜底；写数据的工具通常两者都为 True。

## 内置工具按领域挂 Worker

`agents/tools/` 按领域拆文件，避免一个“万能工具模块”。当前主要分组：

| 文件 | 典型工具 | 挂到 |
| --- | --- | --- |
| `knowledge.py` / `structured_query.py` / `web.py` | 检索、只读 SQL、联网 | knowledge_worker |
| `memory.py` / `workspace_memory.py` | 读写记忆 | memory_worker |
| `management.py` | 文档与角色资料 | document_worker / profile_worker |
| `voice.py` / `voice_clone.py` | TTS、ASR、Studio、训练 | voice_worker |
| `rvc.py` | session、分离、转换、混音 | rvc_worker |
| `live2d.py` | 模型清单、VTS、目录 | live2d_worker |
| `config.py` | 受管资源安装与配置 | config_worker |
| `skills.py` / `skill_install.py` / `mcp_admin.py` / `integrations_admin.py` | 扩展管理 | 管理类 Worker / 配置 |
| `extended.py` | URL 导入知识、导出会话 | document / profile |

新增工具时，先问“它改变了谁的数据、失败了如何恢复、要不要确认”，再写执行函数。不要先写一段能跑的 Python 再补元数据。

## Skill：任务方法，不是插件市场广告

Skill 适合表达“遇到这一类任务时按什么顺序做”。它通常包含：

- 名称与说明；
- 给模型看的 instructions；
- 允许使用的 tool_names；
- 来源（内置、本地目录、安装包）。

`agents/skill_parser.py` 和 `agents/skill_sources.py` 负责解析和查找。非内置 Skill 需要经过信任和权限检查，才能进入某个角色的可见集合。

Skill 加载后，不会自动暴露该角色的全部工具。它只把声明过的工具放进这一次任务的方法里。这是为了避免“装了一个查天气的 Skill，结果模型能删文档”。

最小示意：

```yaml
name: example_skill
description: 处理示例任务
instructions: |
  先读取状态，再决定是否执行修改。
  缺参数就停，不要猜测本地路径。
tool_names:
  - example_status
  - example_apply
```

字段以当前 Skill API schema 为准。不要把 Token 写进 instructions。

## MCP：发现外部工具，再纳入同一套门

`integrations/mcp/client.py` 基于 `langchain-mcp-adapters` 的 `MultiServerMCPClient`。0.3.x 之后客户端是无状态的：

- `get_tools()` 时建会话拉清单；
- 真正调用工具时再开一次性会话；
- 管理器不需要持有长连接，也不依赖 `aclose()`。

配置保存在 `data/mcp_servers.json`。启动时 `app/startup/lifespan.py` 创建 `MCPManager`，并 `connect_all(register=True)`，把发现的工具注册进 `ToolSpec`。

支持的传输包括 `stdio`、`streamable_http` 和 `sse`。stdio 在本机等于“启动一条命令”，要当成代码执行入口，而不是普通 URL。

超时按副作用分级：

| 类型 | 超时 | 来源 |
| --- | --- | --- |
| 连接/握手 | 90 秒 | 冷启动可能要装依赖 |
| 只读工具 | 20 秒 | `readOnlyHint` / `read_only_hint` |
| 变更工具 | 60 秒 | 默认 |

超时返回的是结构化 JSON，而不是把适配器内部异常直接丢给模型。

MCP 工具默认不可信。除非服务端显式声明只读，否则应走确认。`agents/mcp_grants.py` 把“连上了服务器”和“某个角色被允许用这些工具”分开。连上只是发现；授权才是可见。

推荐流程：

```text
保存服务配置
  → 测试连接
  → 查看发现的工具和注解
  → 检查 read-only / destructive 分类
  → 给需要的角色授权
  → 启用
  → 在对话里按任务调用
  → 断开时清理会话和 stdio 子进程
```

## 角色授权与能力包

扩展不是全局开关。角色有自己的能力策略：哪些内置 Worker、哪些 Skill、哪些 MCP 服务器可用。`app/routers/capability_assignments.py` 和 `agents/capabilities.py` 维护这张表。

设计意图：

- 同一个工作台里，资料员角色不必拥有 RVC；
- 直播角色不必拥有删文档；
- 管理类工具即使存在于进程里，也不会只因为“模型想起来了”就被调用。

Supervisor 看到的工具集合，已经是过滤后的集合。Worker 再在自己的领域里执行。不要在 Worker 内部做第二套“偷偷启用全部 MCP”的逻辑。

## 安全边界

1. **前端只提交结构化配置**，不把任意 Shell 暴露给模型。
2. **凭据放本机设置或环境变量**，不进 Git，不进 Skill 文档，不进公开事件。
3. **交接合同禁止 path/command/python/shell 字段**。MCP 参数也要走 schema，不要把整段命令当字符串执行。
4. **确认规则看副作用，不看心情**。只读检索的联网兜底、未声明只读的 MCP、删除记忆、覆盖音色，都可能需要确认。
5. **stdio 命令等于本机代码**。`mcp_allow_arbitrary_stdio` 是危险开关，默认应关闭。
6. **断开即清理**。MCP 子进程、会话、注册表条目都要能卸掉，否则下次启动会留下幽灵工具。

## 和 Runtime 的接缝

工具执行不是“函数返回了就结束”。一次 MCP 或内置工具调用应当能被映射到：

- 当前 Run 的 active_worker；
- 可能的 waiting_approval；
- 公开事件（工具名、成功/失败、耗时，不含原始参数里的秘密）；
- 若产生文件，则写入 artifacts。

如果某个 MCP 工具会写文件，仍然要走附件/资产层，不要让外部服务器返回的本地路径直接进入 handoff。

## 开发检查表

新增 Skill 或 MCP 能力时：

1. 工具是否有 schema 和结构化错误；
2. 是否声明 specialist、mutates_data、requires_confirmation；
3. 是否按角色授权，而不是全局可见；
4. 是否有连接测试和超时；
5. 文档、排查页和 API 参考是否同步；
6. 是否写了缺参、超时、未授权、重复调用的测试。

## 相关页面

- [扩展体系设计](/concepts/extensions)
- [注册 Worker 与工具](/development/worker-registration)
- [扩展 Skill 与 MCP](/development/extensions)
- [扩展与外部集成 API](/reference/api-integrations)
- [数据与边界](/concepts/data-boundaries)
