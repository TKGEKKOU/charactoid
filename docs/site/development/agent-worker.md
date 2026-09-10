# Agent 与 Worker

**CHARACTOID 的 Agent 图是中心辐射，不是群聊。只有 `persona_supervisor` 对用户说话；Worker 执行领域动作，经 `finalize_*` 把结构化结果交回 Supervisor。**

源码：`agents/graph/build.py`、`agents/graph/supervisor.py`、`agents/registry.py`、`agents/contracts.py`、`agents/service.py`。

## 真实主流程

```text
用户输入
→ 能力自检与意图线索（intent_funnel，不能替代 handoff）
→ persona_supervisor 判断
→ 缺少输入就停在 waiting_input
→ delegate_to_* 结构化交接
→ Worker 只使用注册表里属于自己的工具
→ finalize_* 校验 SpecialistResult
→ 回到 Supervisor
→ 角色化回复 + 事件 + 资产引用
```

父图闭环始终是：

`START → persona_supervisor → Worker → finalize_* → persona_supervisor → 父图 END`

子图 END 只结束子图。图中没有 Worker 直达父图 END 的边。

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

## Worker 清单

canonical 名称以 `agents/graph/state.py` 和 `agents/registry.py` 为准。旧名 `knowledge`、`rvc`、`voice_clone` 只是兼容别名。

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

RVC 必须由 Supervisor handoff。意图漏斗不能把一句话直接送进 `rvc_worker`。

## 工具元数据

`ToolSpec` 字段：

- `name`：模型看见的工具名
- `specialist`：挂到哪个 Worker
- `requires_confirmation`：执行前 HITL
- `mutates_data`：是否写数据
- `server`：可选 MCP server

写不写数据、要不要确认，不从名字猜测。例如联网搜索本身只读，但知识 fallback 仍可能要求确认；MCP 默认更严。

当前工具按 Worker 分组，完整列表以 `agents/registry.py` 为准：

- knowledge：检索、列结构化表、只读查询、联网
- memory：读写删角色记忆与工作区记忆
- document：加入知识、删文档、URL 导入
- profile：改名、更新人设、导出会话
- voice：Studio 会话、训练、绑定、TTS、ASR、GPT-SoVITS 控制
- rvc：session、附件、分离、转换、混音、取消
- live2d：模型列表、VTS 配置、打开模型目录
- config：资源状态、安装管理、配置变更

## 交接合同

`StructuredHandoff` 只带数据引用和选项。禁止字段名 `path` / `command` / `python` / `shell`。Worker 需要文件时使用 `attachment_id`，产出结果时使用 `asset_id`。

`SpecialistResult` 是回来的合同：

```text
status: accepted | insufficient | confirmation_required | completed | failed
answer / evidence / citations / uncertainties / trace / confidence
pending_action / artifacts / error
```

`finalize_*` 检查这张合同。Supervisor 只消费通过校验的字段。

## 知识 Worker 为什么是子图

`agents/graph/knowledge.py` 固定为：

```text
knowledge_planner → knowledge_retrieve → knowledge_fallback → finalize_knowledge_worker
```

Planner 只出受 schema 约束的计划；retrieve 跑确定性检索或只读 SQL；fallback 在证据不足时拒答、请求确认或按策略联网。这样比让通用 Agent 一边写 SQL 一边编答案更容易审计。

知识检索必须带工作区和知识空间过滤。详见 [RAG 设计](/concepts/rag)。

## 服务入口

`PersonaAgentService`（`agents/service.py`）对外提供 query / stream_query / resume / stream_resume。Runtime 的 `NativeAgentLoop` 包住这些调用，使取消和 Job 状态一致。不要从路由里直接 invoke 某个 Worker 节点。

## 注册新 Worker 时要改什么

见 [注册 Worker 与工具](./worker-registration)。最小集合：

1. `state.py` 的 Worker 字面量和 `WORKERS`
2. `registry.py` 的描述、超时、ToolSpec
3. `graph/build.py` 与 supervisor 的 delegate / finalize
4. 合同字面量 `SpecialistResult.specialist`
5. 文档：本页、Worker 清单、能力页、必要时 API

## 不要这样实现

- Worker 互相通话
- Worker 直达父图 END
- 用自然语言模板解析 Worker 结果
- 让模型自由拼接 SQL 或 Shell
- 把所有 Worker 当成对等聊天机器人
