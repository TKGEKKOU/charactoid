# 配置角色

**这页说明如何创建一个可以被对话页使用的角色，以及角色资料、知识空间、能力授权和外部声音/Live2D 资源之间的关系。**

CHARACTOID 的角色不是只保存一段提示词。服务端的 `Persona` 还会关联工作区、知识空间、角色类型和状态；后续上传的文档、RAG 查询、能力授权和会话消息都通过角色 ID 关联。

## 前置条件

- 已完成[快速开始](./quickstart)，服务运行在 `http://127.0.0.1:18000`；
- LLM 已在 Web 工作台设置页配置并通过测试；
- 如果要绑定知识、声音或 Live2D，先确认对应资源已经准备好；
- 当前角色数据保存在 `.env.example` 指定的 SQLite 路径 `data/charactoid.db`，没有现有用户迁移要求时可以从空数据库开始。

## 操作步骤

### 1. 在工作台创建角色

在资料或角色管理入口新建角色。创建接口是：

```http
POST /api/personas
Content-Type: application/json
```

请求体只接受 `name` 和 `profile`：

```json
{
  "name": "示例角色",
  "profile": {
    "description": "一个负责解释技术问题的角色",
    "system_prompt": "回答要清楚、具体；不确定时明确说明。"
  }
}
```

`name` 必须是 1 到 255 个字符；`profile` 是可扩展的 JSON 对象。不要把不存在的字段当作稳定配置写进去，实际能否被某个能力使用取决于当前前端和服务实现。

### 2. 先设置最小角色资料

建议先填写：

- 角色名称；
- 一句话定位；
- 回答风格；
- 不能做什么；
- 需要用户确认的操作。

示例：

```json
{
  "description": "本地优先的开发助手",
  "system_prompt": "用中文回答。给出可执行步骤；遇到不确定事实时说明不确定，不要编造接口或文件。",
  "response_style": "简洁、分步骤、优先给出命令"
}
```

这些字段会被保存为角色 Profile 的 JSON 内容。它们是角色行为资料，不等于给系统增加权限。

### 3. 确认角色是否创建成功

```http
GET /api/personas
GET /api/personas/{persona_id}
```

返回的角色对象包含：

- `id`：后续对话、文档和 RAG 请求需要使用；
- `name`；
- `workspace_id`；
- `knowledge_space_id`；
- `persona_type`；
- `profile`；
- `status`。

### 4. 绑定知识资料（可选）

角色创建后，前端会使用角色的 `knowledge_space_id` 管理文档。最小流程是：

1. 上传文档；
2. 查看转换结果和预览；
3. 确认索引；
4. 等待状态变为 `indexed`；
5. 回到角色对话中提问。

角色文档列表接口：

```http
GET /api/personas/{persona_id}/documents
```

上传和确认的完整说明见[本地资源准备](./resources)中的知识库部分。

### 5. 设置能力和 MCP 授权（可选）

角色有统一的能力目录，可以查看当前 Tool、Skill 和 MCP 能力：

```http
GET /api/personas/{persona_id}/capabilities
PUT /api/personas/{persona_id}/capabilities
GET /api/personas/{persona_id}/mcp-grants
PUT /api/personas/{persona_id}/mcp-grants
```

启用某项能力前，先确认它的副作用。例如，读取资料、查询状态和写入文件不是同一种风险；需要修改外部系统的能力应保留人工确认。

角色授权不会把任意路径、Shell 或本地命令直接交给浏览器。前端应只提交服务端定义的结构化能力 ID 和 MCP 服务器名称。

### 6. 绑定声音和 Live2D（可选）

声音资源和 Live2D 模型是独立资源，不是创建角色时强制填写的字段。可以先完成文字对话，再在设置或工作台中：

- 选择可用的 TTS Provider；
- 绑定或生成声音资产；
- 选择 Live2D 模型；
- 让语音输出驱动口型和动作。

可用模型列表接口：

```http
GET /api/live2d/models
GET /api/live2d/vts
```

声音资源的完整准备方式见[本地资源准备](./resources)。

### 7. 修改或删除角色

```http
PATCH /api/personas/{persona_id}
DELETE /api/personas/{persona_id}
```

修改时只提交需要变化的 `name` 或 `profile`。删除前确认角色关联的对话、文档和资源是否还需要；删除不是“撤销当前消息”的操作。

## 你应该看到什么

- 角色列表里出现新角色；
- 角色有唯一的 `id` 和 `knowledge_space_id`；
- 对话页可以选中该角色；
- 未配置可选 Provider 时，文字角色仍可创建，但语音、RAG 或外部接入会显示未就绪，而不是假装可用；
- 能力页能看到角色当前的 Tool / Skill / MCP 授权状态。

## 常见错误

### `422`：角色名称为空或字段不合法

`PersonaCreate` 禁止额外字段，名称必须非空且不超过 255 个字符。先删除前端示例中不属于当前接口的字段。

### 角色创建成功但无法回答

创建角色只写入角色资料，不会自动配置 LLM。回到设置页检查 LLM Provider、Base URL 和模型。

### 知识资料上传了但问不到

上传文档只是创建处理任务。必须继续确认索引，并等待文档状态进入 `indexed`；如果是失败状态，先查看处理报告或重试索引。

### 给角色授权后仍然不能使用

检查能力本身是否已安装、Provider 是否运行、MCP 服务器是否连接，以及角色授权是否保存。角色授权不是资源安装，也不是服务连接的替代品。

## 下一步

- [完成一次对话任务](./conversation)；
- [本地资源准备](./resources)；
- [问题排查](/troubleshooting)。
