# 常见问题

**按启动、本机限制、对话任务、知识和语音这条真实链路排查。** 这里写的是源码里会真正返回的状态和错误，不是笼统的「检查网络」。

> 事实依据：`app/startup/routes.py`、`app/routers/settings.py`、`app/routers/runs.py`、`agents/runtime/errors.py`、`agents/runtime/approvals.py`、`agents/confirmation_policy.py`、`app/routers/documents.py`、`ingestion/document_jobs.py`、`app/routers/resources.py`、`app/routers/voice.py`、`app/attachments.py`。

## 启动与访问

### 默认地址是什么？

工作台入口是 `http://127.0.0.1:18000`。`GET /` 会 302 到 `/static/index.html`。

| 路径 | 作用 |
| --- | --- |
| `GET /api/health` | `{"status":"ok","workspace_id": ...}` |
| `GET /api/status` | `ingestion.status.get_system_status()` 的只读摘要 |
| `GET /api/launcher/progress` | 启动器进度；未注入时 `starting: false` 的空壳 |

`start.ps1` 健康探测写死 `18000`。改了 `APP_PORT` 以后脚本不会跟着变，浏览器地址也要自己改。

页面打不开：先看终端有没有绑到该端口，再直接打 `/api/health`。健康检查失败是进程没起来，不是前端缓存。

### CORS 是 `*`，为什么改设置还是 403？

`allow_origins=["*"]` 只管跨源读。写设置、装资源、系统诊断仍走 `require_local`：

1. `request.client.host` ∈ `127.0.0.1` / `::1` / `localhost` / `testclient`
2. `Host` 主机名必须是本机
3. 若带 `Origin`，协议、主机、端口必须一致

局域网 IP、反向代理改 Host、页面 Origin 对不上：健康检查可能成功，`/api/settings` 仍 403。这是本机写保护。

另外，LLM 测试 / 揭示密钥 / 资源安装还要求：

```http
X-Charactoid-Request: web
```

漏头同样 403，文案可能是 `缺少同源请求标识` 或 `Missing same-origin request header`。

### 页面能打开但对话失败？

先 `POST /api/settings/llm/test`。

- 502：对端模型服务当时不可达，查 Provider URL / 本机网络 / 密钥
- 401/403 来自上游：密钥或权限，不是资源目录没装
- 本机 403：`require_local` 或漏头
- 角色 404 `Persona not found`：不在 `LOCAL_WORKSPACE_ID`

LLM 配置在 `data/local_settings.json`，不在 `.env`。

### `/sqlite` 打不开算不算故障？

`mount_static_files` 会尝试挂 Datasette 到 `/sqlite/`。导入失败时整段 `except Exception: pass`，工作台不受影响。Datasette 不是必装依赖。

## 对话与任务

### 为什么任务停在等待确认？

`confirmation_policy`：`direct` / `confirm` / `reject`。

- 角色没授权 → `reject`（`capability_not_allowed`）
- 能力声明需要确认 → `confirm`（`capability_requires_confirmation`）
- 联网补全时本地知识不够 → `confirm`（`local_knowledge_insufficient`）
- 用户明确禁止 web → `reject`（`web_explicitly_denied`）

恢复：`POST /api/runs/{run_id}/approval`，`{ "approved": true|false }`。

- 不在等待审批 → `invalid_approval`（409）
- run 不存在 → `run_not_found`（404）
- **`approved=false` 没有独立 reject**，内部 `runtime.cancel(run_id)`

同一会话实时执行键是 `persona_id:conversation_id`。resume **不再**把用户句持久化一遍。

### 失败后该重试还是重开？

| code | 公开展示 | 建议 |
| --- | --- | --- |
| `provider_unavailable` | 模型服务暂时不可用 | 同一条对话重试 |
| `worker_timeout` | 能力模块处理超时 | 对超时表；RVC 默认 1800s |
| `worker_failed` | 能力模块处理失败 | 看 artifacts / error |
| `capability_denied` | 当前角色没有权限 | 去能力页授权 |
| `confirmation_denied` | 操作未获确认 | 拒绝，不是崩溃 |
| `checkpoint_unavailable` | 恢复状态不可用 | 重新发起 |
| `runtime_restarted` | 服务重启后未完成运行已结束 | 重新发起 |
| `run_terminal` | 运行已经结束 | 不要再 approval/cancel |

事件流：`GET /api/runs/{id}/events?after_sequence=`。细节经过 `sanitize_details`，不会把 prompt、密钥、本地路径原样推到前端。

### 对话发出去没有回复？

走 `POST /api/personas/{id}/agent/stream`，同步兜底 `/agent/query`。确认后继续 `/agent/stream-resume` 或 `/agent/resume`。

常见原因：

1. LLM 未配置或探测失败
2. `Persona not found`
3. 浏览器断开中止了 `persona_id:conversation_id`
4. 变声/训练事件被改写成 `upload_request`，其实在等材料
5. 两个标签页抢同一条执行键

## 知识与文档

### 上传了为什么检索不到？

上传入口是 `POST /api/knowledge-spaces/{space_id}/documents/upload`，不是直接进向量库。

```text
converting → preview_ready → indexing → indexed
                              ↘ index_failed
```

- `POST /api/documents/{job_id}/confirm` **只接受** `preview_ready`
- `POST /api/documents/{job_id}/retry-index` **只接受** `index_failed`
- 其它状态 → `INVALID_DOCUMENT_STATE`

空间报告：`GET /api/knowledge-spaces/{space_id}/documents/report`。

换了 embedding 模型或维度，旧 collection 不能直接复用。knowledge_worker 45s，document_worker 120s。

### 空文件、体积、扩展名

| 通道 | 上限 | 空文件 | 超限 |
| --- | --- | --- | --- |
| 知识文档 | `MAX_UPLOAD_MB` 默认 50MB | 文档上传**没有** `EMPTY_FILE` 这种码 | 413 `File too large` |
| 对话附件 | 512MB | 走附件校验 | 错误含 `512` → 413 |
| 听写 `/api/voice/transcriptions` | 10MB（整包 +64KB） | **422** `Audio request is empty` / `Audio file is empty` | 413 |
| Voice Studio 视频 | 400MB | 语音模块自己的校验 | 413 |
| Voice Studio 音频 | 200MB | 同上 | 413 |

不要把语音的空文件 422 套到文档上传上。

文档扩展名含 epub 和常见图片。旧 `.doc` 要先另存 `.docx`。`.csv`/`.xlsx` 走结构化导入。

### 角色列表里看不到这份文档？

`GET /api/personas/{id}/documents` 只列这个角色知识空间里的 job。文档不属于全局上传箱。

要把对话附件送进知识库：`POST /api/conversations/{conversation_id}/attachments/{file_id}/send-to-rag`，传 id 不传路径。

## 资源与语音

### 资源卡片一直未就绪？

目录只有：`rvc` `separator` `asr` `gpt_sovits` `ffmpeg` `embedding` `reranker`。

双前缀都要 `require_local` + `X-Charactoid-Request: web`。

GPT-SoVITS：

- 没装 → `next_action=install`
- 装了没写入配置 / 缺文件 → `check`
- 没起服务 → `start_service`
- `ready = installation_ready && service_running`

清理任务必须 `DELETE /api/resources/tasks?finished=true`，否则 400。它不卸载模型。

### 语音相关 413 / 422 / 502 / 503？

`POST /api/voice/transcriptions`：

- 必须 multipart 字段 `file`
- 必须头 `X-Charactoid-Request: web`
- ASR 未配置 → 503
- 上游失败 → 502
- 空结果 → 422 `No speech was recognized`

角色开口走绑定音色 + TTS，**不走 RVC**。RVC 是 `/api/voice/rvc` 的文件型长任务。

OneBot 等外部连接的 409 见 [任务、文件与连接排查](/troubleshooting/tasks-connections)，不要当成资源安装冲突。

## 下一步

仍然卡住时记下：任务 `run_id`、失败 `code`、资源 `provider_id`、`/api/health` 的结果，再看：

- [任务、文件与连接排查](/troubleshooting/tasks-connections)
- [资源安装与模型](/troubleshooting/resources)
- [准备本地资源](/guide/resources)

