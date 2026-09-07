# 完成一次对话任务

## 这页解决什么问题

这页带你完成 CHARACTOID 的第一轮真实对话，并解释普通回答、长任务、等待输入、人工确认和任务结果之间的区别。

CHARACTOID 的对话请求不是简单地把文本转发给模型。服务端会为角色和会话建立上下文，由 Agent 判断是直接回答、调用知识检索，还是委派 Worker 执行任务。任务执行结果会以结构化运行结果返回，必要时要求你补充信息或确认下一步。

## 前置条件

- 已按照[快速开始](./quickstart)启动服务，地址为 `http://127.0.0.1:18000`；
- 已按照[配置角色](./character)创建至少一个角色；
- LLM Provider 已在工作台设置页配置；
- 已知道角色的 `persona_id`；
- 如果问题需要知识库、附件、语音或其他资源，对应资源已经准备好。

## 操作步骤

### 1. 进入角色对话

打开：

```text
http://127.0.0.1:18000/static/index.html
```

选择刚创建的角色。前端会为当前角色保存一个 `conversation_id`；它用于读取历史消息、上传附件和保持同一轮任务上下文。

如果要自己调用接口，可以先生成一个任意非空的会话 ID，例如：

```text
conversation-demo-001
```

### 2. 先发送一个普通问题

使用同步 Agent 接口可以得到完整结果：

```http
POST /api/personas/{persona_id}/agent/query
Content-Type: application/json
```

请求体：

```json
{
  "question": "请介绍一下你能做什么。",
  "conversation_id": "conversation-demo-001",
  "attachment_ids": []
}
```

接口约束来自 `AgentQueryPayload`：`question` 和 `conversation_id` 必须是非空字符串，问题最多 2000 个字符，附件 ID 最多 32 个。

### 3. 查看回答状态

响应中的 `status` 可能是：

- `completed`：本轮已经完成；
- `pending_confirmation`：需要你确认一个动作；
- `waiting_input`：缺少文件、参数或其他输入；
- `failed`：本轮执行失败；
- `degraded`：部分能力不可用，但系统返回了降级结果。

完成时重点查看：

- `answer`：角色对你可见的回答；
- `worker`：如果委派了 Worker，这里会有 Worker 名称；
- `worker_results`：领域 Worker 返回的结构化结果；
- `artifacts`：任务生成的文件或资产；
- `citations` / `evidence`：知识检索相关证据；
- `confidence`：当前结果的置信度；
- `error_code`、`error_message`：失败或降级原因。

### 4. 需要实时显示时使用流式接口

工作台默认使用流式接口，以便在任务运行时显示过程：

```http
POST /api/personas/{persona_id}/agent/stream
Content-Type: application/json
```

请求体与 `/agent/query` 相同。接口返回 Server-Sent Events（SSE），前端会根据事件更新回答、运行状态、Worker 流程、等待输入卡片和最终结果。

不要把 SSE 当成普通 JSON 直接解析；需要逐条读取事件，并在收到 `done` 后结束本轮读取。

### 5. 让 Agent 执行一个需要资源的任务

可以用自然语言提出真实目标，例如：

```text
检查当前本地语音和知识库资源是否可用，并告诉我缺少什么。
```

或者在对话中附加一个文件，再提出：

```text
分析这个文件，并告诉我下一步需要确认什么。
```

文件先通过会话附件接口上传：

```http
POST /api/conversations/{conversation_id}/attachments
```

上传后，把返回的 `file_id` 放入 Agent 请求的 `attachment_ids`。附件接口要求请求头：

```http
X-CHARACTOID-Request: web
```

### 6. 处理等待输入或人工确认

当响应状态为 `waiting_input` 或 `pending_confirmation` 时，不要重新发起一个无关的新问题。先按照页面中的提示补齐输入或确认动作。

继续当前任务使用：

```http
POST /api/personas/{persona_id}/agent/resume
Content-Type: application/json
```

请求体可以包含：

```json
{
  "conversation_id": "conversation-demo-001",
  "specialist": "management",
  "approved": true,
  "worker": "当前任务返回的 worker（如有）",
  "task_id": "当前任务返回的 task_id（如有）",
  "attachment_ids": [],
  "input_values": {}
}
```

实际需要填写哪些字段，以当前等待卡片返回的 `worker`、`task_id`、输入名称和确认要求为准。`approved` 只表达是否同意需要确认的动作，不代表跳过资源检查或权限校验。

实时恢复使用：

```http
POST /api/personas/{persona_id}/agent/stream-resume
```

### 7. 查看消息和运行记录

读取当前会话消息：

```http
GET /api/personas/{persona_id}/conversations/{conversation_id}/messages
```

如果任务返回了 `run_id`，可以查看运行状态和事件：

```http
GET /api/runs/{run_id}
GET /api/runs/{run_id}/events
```

运行中的任务可以请求取消：

```http
POST /api/runs/{run_id}/cancel
```

## 你应该看到什么

- 普通问题返回一条角色回答，并在消息列表中保留；
- 需要 Worker 的问题会先显示运行过程，最后回到同一条对话；
- 缺少文件或参数时出现等待输入，而不是静默失败；
- 有副作用的动作可能要求确认；
- 生成的文件、音频或其他结果会作为 `artifacts` 或消息附件关联到本轮任务；
- 刷新页面后，只要使用同一个角色和会话，历史消息仍可通过消息接口读取。

## 常见错误

### `404 Persona not found`

`persona_id` 不存在，或者角色不属于当前本地工作区。先用 `GET /api/personas` 获取真实 ID，不要把角色名称直接当作 ID。

### `422` 请求体校验失败

检查 `question`、`conversation_id` 是否为空，以及是否提交了当前接口不接受的额外字段。`AgentQueryPayload` 采用禁止额外字段的严格模型。

### 一直停在 `waiting_input`

说明当前任务还没有拿到它声明需要的输入。查看等待卡片中的字段名、附件要求和 `task_id`，使用 `/agent/resume` 继续，不要只重复发送同一句问题。

### 任务被拒绝或要求确认

这是任务安全边界的一部分。确认动作会改变资源、启动服务、安装模型或影响外部接入时，先阅读页面给出的目标和影响，再决定是否确认。

### 对话可以打开但模型没有回答

这通常表示 LLM Provider 配置、模型名、Base URL 或网络连接存在问题。先在设置页测试 LLM，再查看 `/api/status` 和响应中的 `error_code`。

## 下一步

- [本地资源准备](./resources)：为知识库、语音和文件处理准备可选资源；
- [问题排查](/troubleshooting)：按端口、Provider、模型和浏览器连接问题定位；
- [配置角色](./character)：继续完善角色资料、知识和能力授权。
