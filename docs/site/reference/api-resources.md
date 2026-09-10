# 资源与模型 API

**可选能力依赖可管理资源：安装、探测、启停、取消都走同一套任务模型，而不是在对话里“顺便下载一个模型”。**

源码：`app/routers/resources.py`（`/api/resources` 与兼容前缀 `/api/providers/resources`）、`app/routers/providers.py`、`app/routers/embedding.py`、`app/routers/reranker.py`、`app/routers/asr.py`、`app/routers/voice_assets.py` 中的 GPT-SoVITS 段、`agents/tools/config.py`（`config_worker`）。

资源未就绪时，基础文字对话仍应可用。前端要把“未安装”渲染成未就绪，而不是对话失败。

## 两套前缀

历史原因，资源任务同时挂在：

- `/api/resources`（当前）
- `/api/providers/resources`（兼容）

新代码用 `/api/resources`。旧前端若仍打兼容前缀，行为应对齐，不要复制出第二套任务表。

`/api/providers` 本身管的是 **LLM / Embedding 等 Provider 配置**，和“下载一个本地包”不是同一件事。

## 资源任务

`app/routers/resources.py` 的典型形状：

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `POST` | `/api/resources/{provider_id}/install` | 接受安装，通常 `202` |
| `GET` | `/api/resources/{provider_id}/status` | 当前安装/运行状态 |
| `DELETE` | `/api/resources/{provider_id}/install` | 卸载或删除安装 |
| `DELETE` | `/api/resources/{provider_id}/install/cancel` | 取消进行中的安装 |
| `GET` | `/api/resources/tasks` | 任务列表 |
| `GET` | `/api/resources/tasks/{task_id}` | 单任务 |
| `DELETE` | `/api/resources/tasks/{task_id}` | 取消/删除任务 |
| `POST` | `/api/resources/tasks/{task_id}/retry` | 重试失败任务 |
| `DELETE` | `/api/resources/tasks` | 清理任务集合（以实现为准） |

安装是异步的。客户端应：

1. 保存 `task_id` / `provider_id`
2. 轮询 `status` 或 `tasks/{task_id}`
3. 取消前先看当前状态，避免对已完成任务重复 DELETE
4. 失败时读错误字段，而不是立刻再 POST 一次 install

`config_worker` 的 `manage_resource_install` 走同一条链。对话里“帮我装 embedding”最后仍应落到这些 HTTP 接口，而不是 Worker 自己 wget。

## Provider 配置

`app/routers/providers.py`：

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `GET` | `/api/providers/list` | 已配置 Provider |
| `POST` | `/api/providers/configure` | 写入配置 |
| `POST` | `/api/providers/test` | 探测 |
| `GET` | `/api/providers/resources` | 资源视图（兼容） |
| `GET` | `/api/providers/resources/tasks` | 兼容任务列表 |
| `POST` | `/api/providers/resources/{provider_id}/install` | 兼容安装 |
| `GET` | `/api/providers/resources/{provider_id}` | 兼容详情 |
| `GET` | `/api/providers/resources/{provider_id}/status` | 兼容状态 |
| `GET` | `/api/providers/resources/tasks/{task_id}` | 兼容单任务 |
| `DELETE` | `/api/providers/resources/tasks/{task_id}` | 兼容取消 |
| `POST` | `/api/providers/resources/tasks/{task_id}/retry` | 兼容重试 |

`configure` 与 `test` 处理的是端点、模型名、密钥。密钥不要进日志、不要进文档示例。探测失败时返回可读 detail，前端应展示 detail 而不是只显示 500。

## 模型资源专页

这些路由器形状接近：`status` + `config` + `install` + `cancel` + 模型目录。

| 前缀 | 源码 | 资源 |
| --- | --- | --- |
| `/api/embedding` | `app/routers/embedding.py` | 向量模型 |
| `/api/reranker` | `app/routers/reranker.py` | 重排模型 |
| `/api/asr`、`/api/stt` | `app/routers/asr.py` | 识别；`stt` 为别名 |
| `/api/gpt-sovits` | `app/routers/voice_assets.py` | GPT-SoVITS 安装、探测、启停、模型目录 |
| `/api/providers/rvc` | `app/routers/voice_rvc.py` | RVC 运行时与模型 |
| `/api/tts/separator` | `app/routers/video_clone.py` | 人声分离 |

Embedding 与 Reranker 未就绪时，知识库不能建新索引，但普通 LLM 对话仍应工作。ASR 未就绪时，Voice Studio 的标注和转写会失败，TTS 不一定失败。

GPT-SoVITS 还提供：

- `GET /api/gpt-sovits/status`
- `PATCH /api/gpt-sovits/config`
- `POST /api/gpt-sovits/detect`
- `POST /api/gpt-sovits/install` / `DELETE .../install` / `DELETE .../install/cancel`
- `POST /api/gpt-sovits/service/start` / `.../stop`
- `POST /api/gpt-sovits/model-directory`

服务启停与模型安装是两件事。没启动服务时，角色开口应返回真实状态，而不是假装正在说话。

## 安装约定

- 接受安装 → `202` + 任务标识
- 查询 → `200` + 阶段、百分比、错误
- 冲突状态（已在装、已完成）→ `409`
- 校验失败 → `422`
- 依赖缺失（例如 Docker、磁盘）→ `500` 或带 `ok: false` 的业务体，以 OpenAPI 为准

不要把本机绝对路径当请求参数传来传去。需要打开目录时走 `/api/system/open-directory/{location}` 或各资源的 `model-directory` 接口。

## 配置示例

```env
APP_HOST=127.0.0.1
APP_PORT=18000
COLLECTION_NAME=charactoid_knowledge_v1
CHARACTOID_RVC_DEVICE=auto
```

完整项见 [配置项](/reference/config)。Provider Key 只放本机设置或 `.env`。

## 相关页面

- [系统、状态与设置 API](/reference/api-system)
- [语音、RVC 与 Live2D API](/reference/api-voice)
- [准备本地资源](/guide/resources)
- [资源、模型与设备排查](/troubleshooting/resources)
- [Worker 清单](/reference/workers) 中的 `config_worker`
