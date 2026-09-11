# 注册 Worker 与工具

**本页按当前 `agents/registry.py`、`agents/contracts.py`、`agents/graph/build.py` 说明如何新增 Worker 或工具。示例必须能对上源码字段；旧文档里的 `ToolSpec(worker=...)` 已经过时。**

CHARACTOID 的 Worker 不是“再写一个聊天机器人”。它是领域执行器：拿到 Supervisor 的结构化交接，调用已注册工具，返回 `SpecialistResult`。可见回复仍然由 Supervisor 组织。

## 先读这三份合同

### 1. ToolSpec

```python
@dataclass(frozen=True)
class ToolSpec:
    name: str
    specialist: str
    tool: BaseTool
    requires_confirmation: bool = False
    mutates_data: bool = False
    server: str = ""
```

- `name`：模型可见的工具名，要稳定。
- `specialist`：canonical Worker 名，例如 `knowledge_worker`。
- `tool`：LangChain `BaseTool` 实现。
- `requires_confirmation`：执行前是否进入 HITL。
- `mutates_data`：是否写数据，用于只读/变更分组。
- `server`：MCP 来源名；内置工具留空。

兼容别名在 `_WORKER_COMPAT_ALIASES`。新代码请直接写 `knowledge_worker`，不要再写 `knowledge`。

### 2. WorkerManifest

`WorkerManifest` 是描述性合同，不执行工具。它声明输入/输出 schema、capabilities、mutating_operations、超时和 `WorkerRetryPolicy`。`read_only` 由“有没有 mutating_operations”推导。

当前默认超时与重试：

| Worker | 超时 | 重试 |
| --- | --- | --- |
| knowledge_worker | 45s | 最多 2 次，backoff 0.5s |
| memory_worker | 30s | 1 次 |
| document_worker | 120s | 最多 2 次，backoff 1s |
| profile_worker | 30s | 1 次 |
| voice_worker | 300s | 1 次 |
| rvc_worker | 1800s | 1 次 |
| live2d_worker | 45s | 1 次 |
| config_worker | 45s | 1 次 |

媒体任务几乎不重试，避免把训练或变声跑两遍。知识检索可以短重试，因为失败常常是瞬时的嵌入服务抖动。

### 3. SpecialistResult

Worker 与 Supervisor 之间不要靠自然语言模板解析。`SpecialistResult` 的状态是闭合集合：

`accepted` / `insufficient` / `confirmation_required` / `completed` / `failed`

字段包括 answer、evidence、citations、uncertainties、trace、confidence、pending_action、artifacts、error。`error` 必须先经 `resolve_error_fields()`，不能塞原始异常。

## 新增一把内置工具

最小步骤：

1. 在 `agents/tools/<domain>.py` 实现工具，输入用明确 schema，输出用结构化 dict 或 JSON 字符串。
2. 在 `agents/registry.py` 登记 `ToolSpec`，指定 `specialist`。
3. 若会写数据或不可逆，打开 `mutates_data` / `requires_confirmation`。
4. 给正常、缺参、未授权、重复调用写测试。
5. 更新 Worker 清单文档和 API 参考。

示意（字段以源码为准）：

```python
from agents.registry import ToolSpec

spec = ToolSpec(
    name="example_status",
    specialist="config_worker",
    tool=example_status_tool,
    requires_confirmation=False,
    mutates_data=False,
)
```

不要在工具里：

- 拼接用户给的绝对路径去读盘；
- 执行任意 Shell；
- 直接 `print` 密钥；
- 自己把确认状态改成 completed。

## 新增一个 Worker

只登记工具是不够的。领域 Worker 要进入父图，需要完整接缝：

```text
1. 起一个 canonical 名，加入 _WORKER_ORDER
2. 写 description、timeout、retry
3. 声明 input_schema / output_schema
4. 在 graph/state.py 加入交接字段（如需）
5. 在 graph/build.py 挂节点和 finalize_*
6. 提供 handoff 工具给 Supervisor
7. 实现 Worker 节点：调工具、填 SpecialistResult
8. finalize 校验：状态合法、禁止字段、公开错误
9. 暴露到 worker manifests API
10. 同步文档、事件、排查页
```

父图约束：

- 用户可见出口只有 Supervisor。
- Worker 结束必须回到 `finalize_*`，不能直达 END。
- RVC 等敏感任务不允许意图层绕过 Supervisor。
- handoff 禁止 `path` / `command` / `python` / `shell` 字段名。

## 输入输出 schema

当前默认输入很窄：

```json
{
  "type": "object",
  "properties": {
    "request": {
      "type": "string",
      "description": "Supervisor 委派的任务说明"
    }
  },
  "required": ["request"],
  "additionalProperties": false
}
```

真正的文件引用应放在 Run 状态的 `StructuredHandoff.input_refs`，而不是让模型在 request 字符串里塞路径。输出 schema 在 registry 里列出了 Supervisor 需要的稳定字段；Worker 自己加的内部调试信息不要泄漏到公开事件。

## 确认、取消、恢复

- 确认：工具或 Worker 返回 `confirmation_required` 和 `pending_action`，Run 进入 `waiting_approval`。
- 取消：走 Runtime 取消，而不是杀进程。领域取消钩子在 `agents/cancellation.py`。
- 恢复：从 `resume_state` 继续，不重放整段聊天。长任务 Worker 必须能把“已经规范化的附件 ID”写进恢复状态。

## 测试清单

至少覆盖：

1. 工具 schema 校验失败时的公开错误；
2. 未授权角色看不到该工具；
3. 变更工具在未确认前不写数据；
4. finalize 拒绝非法 handoff 字段；
5. 超时是否按 Manifest 生效；
6. 重试是否只发生在声明过的错误上。

## 相关页面

- [Agent 与 Worker](/development/agent-worker)
- [任务生命周期](/development/lifecycle)
- [Worker 清单](/reference/workers)
- [事件与状态](/reference/events)
- [扩展：Skill、Tool、MCP](/capabilities/extensions)

## 源码合同（中档补全）

### Manifest 超时就是运行时超时

`agents/registry.py` 规范顺序固定：

`knowledge_worker → memory_worker → document_worker → profile_worker → voice_worker → rvc_worker → live2d_worker → config_worker`

| Worker | 超时秒 | 重试 |
| --- | --- | --- |
| knowledge_worker | 45 | 最多 2 次，backoff 0.5s |
| memory_worker | 30 | 1 |
| document_worker | 120 | 最多 2 次，backoff 1s |
| profile_worker | 30 | 1 |
| voice_worker | 300 | 1 |
| rvc_worker | 1800 | 1 |
| live2d_worker | 45 | 1 |
| config_worker | 45 | 1 |

HTTP：`GET /api/workers/manifests`、`GET /api/workers/manifests/{worker}`。兼容别名 `_WORKER_COMPAT_ALIASES` 仍认识 `knowledge` / `voice_clone` 等，新代码用 `*_worker` 全名。

Worker 不直接对用户说话。即使用户可见的 `answer` 来自某个 specialist，也要经 Supervisor 组织。handoff 禁止 `path` / `command` / `python` / `shell` 字段出站。


注册新 Worker 时同步三处：registry 顺序、Manifest 超时、HTTP `/api/workers/manifests/{worker}`。只改其中一处会让 Supervisor 选得到但跑到一半被超时，或清单显示的秒数与 abort 不一致。

用户可见语言只来自 Supervisor。Worker 应返回 `SpecialistResult` / 结构化 handoff，由 `finalize_*` 收口，不要自己 END 掉整张图（RVC 长链路尤其如此）。测试清单：schema 失败、未授权角色、未确认就写数据、finalize 拒绝非法字段、超时是否按 Manifest。
