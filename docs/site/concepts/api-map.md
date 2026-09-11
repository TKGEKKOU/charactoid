# API 与模块地图

**本页不是替代 `/reference/` 下的接口手册，而是把“能力对应哪个模块和接口”集中列出，便于从概念文档跳到源码。路径和方法以当前 `app/routers/` 注册结果为准。**

## 角色、对话与运行

```text
POST /api/personas
GET  /api/personas
GET  /api/personas/{persona_id}
PATCH /api/personas/{persona_id}
DELETE /api/personas/{persona_id}
POST /api/personas/{persona_id}/agent/stream
POST /api/personas/{persona_id}/agent/query
POST /api/personas/{persona_id}/agent/resume
GET  /api/runs/{run_id}
GET  /api/runs/{run_id}/events
POST /api/runs/{run_id}/cancel
POST /api/runs/{run_id}/approval
```

源码：`app/routers/personas.py`、`app/routers/agents.py`、`app/routers/runs.py`、`agents/service.py`。

## 文档、知识与评测

```text
POST /api/conversations/{conversation_id}/attachments
POST /api/conversations/{conversation_id}/attachments/{file_id}/send-to-rag
GET  /api/documents/{job_id}
POST /api/documents/{job_id}/confirm
POST /api/documents/{job_id}/retry-index
POST /api/personas/{persona_id}/rag/query
GET  /api/personas/{persona_id}/rag/queries
POST /api/personas/{persona_id}/rag/queries/{query_id}/feedback
GET  /api/personas/{persona_id}/rag/report
POST /api/eval/run
GET  /api/eval/status
GET  /api/eval/results
GET  /api/eval/history
GET  /api/eval/export
```

源码：`app/routers/attachments.py`、`app/routers/documents.py`、`app/routers/rag.py`、`app/routers/eval.py`、`rag/`、`ingestion/`。

## 声音、RVC 与 Live2D

```text
GET  /api/asr/status
PATCH /api/asr/config
GET  /api/tts/status
POST /api/tts/personas/{persona_id}/conversations/{conversation_id}/synthesize/stream
WS   /api/tts/personas/{persona_id}/conversations/{conversation_id}/synthesize/ws
POST /api/voice-studio/sessions
POST /api/voice-studio/sessions/{session_id}/video
POST /api/voice-studio/sessions/{session_id}/separate
POST /api/voice-studio/sessions/{session_id}/complete
POST /api/voice/rvc/sessions
POST /api/voice/rvc/sessions/{session_id}/extract
POST /api/voice/rvc/convert
GET  /api/voice/rvc/tasks/{task_id}
GET  /api/voice/rvc/tasks/{task_id}/output
GET  /api/live2d/models
GET  /api/live2d/vts
WS   /api/voice/stream/ws
```

源码：`app/routers/voice_studio.py`、`app/routers/voice_assets.py`、`app/routers/voice_rvc.py`、`app/routers/live2d.py`、`app/routers/voice_stream.py`、`voice/`。

## 扩展、资源与外部集成

```text
GET  /api/skills
POST /api/skills
PATCH /api/skills/{name}
GET  /api/mcp/servers
POST /api/mcp/servers
POST /api/mcp/servers/{name}/test
PATCH /api/mcp/servers/{name}/grants
GET  /api/workers/manifests
GET  /api/workers/manifests/{worker}
GET  /api/providers/list
POST /api/providers/configure
POST /api/providers/test
GET  /api/integrations/bilibili
POST /api/integrations/bilibili/connect
PUT  /api/integrations/onebot11
POST /api/integrations/onebot11/test
```

源码：`app/routers/skills.py`、`app/routers/mcp.py`、`app/routers/worker_manifests.py`、`app/routers/providers.py`、`app/routers/integrations.py`。

## 配置与系统

```text
GET   /api/settings
PATCH /api/settings
GET   /api/system/diagnostics
GET   /api/resources
GET   /api/resources/tasks
GET   /api/embedding/status
GET   /api/reranker/status
GET   /api/gpt-sovits/status
```

源码：`app/routers/settings.py`、`app/routers/system.py`、`app/routers/resources.py`、`app/routers/embedding.py`、`app/routers/reranker.py`、`app/routers/voice_assets.py`。

## 调用示例：查询运行状态

```js
async function readRun(runId) {
  const response = await fetch(`/api/runs/${encodeURIComponent(runId)}`)
  if (!response.ok) throw new Error(`读取运行失败：${response.status}`)
  return response.json()
}
```

## 调用示例：轮询 RVC 任务

```js
async function waitForRvcTask(taskId, onUpdate) {
  for (;;) {
    const response = await fetch(`/api/voice/rvc/tasks/${encodeURIComponent(taskId)}`)
    const task = await response.json()
    onUpdate(task)
    if (["succeeded", "failed", "cancelled"].includes(task.state)) return task
    await new Promise((resolve) => setTimeout(resolve, 800))
  }
}
```

## 接口状态说明

- **稳定**：当前有明确路由和核心业务调用；
- **可选**：接口存在，但需要本地资源或配置；
- **实验**：接口存在，仍依赖目标设备、模型或外部客户端验证；
- **外部依赖**：CHARACTOID 只负责协议或进程适配；
- **内部接口**：主要供前端、Worker 或应用服务使用，不承诺第三方 SDK 兼容。

精确的 Request Body、Pydantic 字段和状态码应以 FastAPI 运行时 OpenAPI 为准；本页故意只保留用于导航的稳定路径，避免复制出一份很快过期的 schema。

## 源码合同（中档补全）

本页只做导航，不复制 OpenAPI schema。下列路径以 `app/startup/routes.py:_ALL_ROUTERS` 和各 router 为准。

### 对话恢复不要再 POST 同一句

同一执行键是 `persona_id:conversation_id`（`app/routers/agents.py`）。断线后续上：

- `POST /api/personas/{persona_id}/agent/stream-resume`：SSE 恢复确认回合
- `POST /api/personas/{persona_id}/agent/resume`：非流式恢复

Resume **不再** persist 用户句。新问题才走 `/agent/stream` 或 `/agent/query`，那里才会 `try_persist_text_message(..., role="user")`。

轮询：`GET /api/runs/{id}`、`GET /api/runs/{id}/events?after_sequence=`。不要靠再发一遍 question 续跑。

### 本机写操作的两道门

`require_local`（`app/routers/settings.py`）检查：

- client host ∈ `127.0.0.1` / `::1` / `localhost` / `testclient`
- Host 头主机名 ∈ `127.0.0.1` / `::1` / `localhost`
- 若带 Origin，则 scheme/host/port 必须与请求一致

失败统一 403：`Local settings are available on localhost only`。CORS `allow_origins=["*"]` **挡不住** 这道门。

部分写接口还要请求头 `X-CHARACTOID-Request: web`（FastAPI 读 `x-charactoid-request`）。缺头 403 `Missing same-origin request header`。语音转写、Live2D 目录、资源安装、附件上传都走这套。

### 资源 7 项（导航用）

规范 id：`rvc`、`separator`、`asr`、`gpt_sovits`、`ffmpeg`、`embedding`、`reranker`。

别名由 `_canonical_provider_id` 收敛：`stt` / `local_stt` → `asr`；`local_embedding` → `embedding`；`local_rerank` → `reranker`；`tts` / `gsv_tts_local` → `gpt_sovits`。未知 id 会 404 `未找到本地资源管理器`。


### SSE 与系统端点（导航）

流式接口响应头必须带 `Cache-Control: no-cache` 与 `X-Accel-Buffering: no`，否则 nginx 会把 token 事件攒成一块。前端若自己反代，先关 proxy buffering。

系统三端点不在业务 router 文件里，而在 `register_routes` 闭包中：

- `GET /api/health` → `status` + `workspace_id`
- `GET /api/status` → `ingestion.status.get_system_status`
- `GET /api/launcher/progress` → 启动器进度或空壳

Worker 清单：`GET /api/workers/manifests`、`GET /api/workers/manifests/{worker}`。OneBot 实时通道：`/api/onebot/ws`。对话实时通道：`/ws/personas/{persona_id}/conversations/{conversation_id}`（角色 404 时 `error` / `persona_not_found` 后 close 1008）。
