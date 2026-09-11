# 资源安装与模型

**资源页不是装饰。** `config_worker` 只查询、安装、更新、取消和清理受管资源，不代替 knowledge / voice / rvc 去执行业务。资源没就绪时，文字对话仍可能进行，只是对应链路缺段。

> 事实依据：`app/routers/resources.py`（`/api/resources` 与兼容 `/api/providers/resources`）、`app/routers/settings.py` 的 `require_local`、`app/routers/system.py`、GPT-SoVITS `_gpt_sovits_status`、`agents/registry.py` 对 `config_worker` 的描述。

## 先核对这两道门

每一条资源 HTTP 都会走 `_guard`：

1. `require_local(request)`
   - 客户端 host 必须是本机（`127.0.0.1` / `::1` / `localhost` / `testclient`）
   - `Host` 主机名必须是本机
   - 若带了 `Origin`，协议、主机、端口必须与当前请求一致
   - 失败：403 `Local settings are available on localhost only`
2. 请求头 `X-Charactoid-Request` 必须等于 `web`
   - 失败：403 `Missing same-origin request header`
   - 浏览器扩展、curl 漏头、远程 Origin 都会卡在这里

CORS 配的是 `allow_origins=["*"]`，**不能**据此认为设置和资源可以跨源写。健康检查能通、装模型 403，优先查这两道门。

## 双前缀

- 规范：`/api/resources`
- 兼容：`/api/providers/resources`

兼容前缀把 install / tasks / retry 指到同一组函数，不要复制第二套任务表。`/api/providers` 的 `configure` / `test` 是 Provider 密钥和端点，不是下载本地包。

## 目录只有 7 项

`GET /api/resources` 的 `definitions`：

| provider_id | 标题 | 可 install / cancel / clean |
| --- | --- | --- |
| `rvc` | RVC 运行环境 | 由对应 manager 是否暴露 `start_install`/`cancel_install`/`remove*` 决定 |
| `separator` | 人声分离模型 | 同上 |
| `asr` | 语音识别资源 | 同上 |
| `gpt_sovits` | GPT-SoVITS 运行环境 | 安装与服务启停是两件事 |
| `ffmpeg` | FFmpeg 音视频处理 | 同上 |
| `embedding` | Embedding 本地模型 | 知识索引依赖 |
| `reranker` | Reranker 本地模型 | 精排依赖 |

每项返回：

```json
{
  "provider_id": "embedding",
  "resource_kind": "embedding",
  "title": "Embedding 本地模型",
  "status": {},
  "capabilities": { "status": true, "install": true, "cancel": true, "clean": true }
}
```

manager 缺失时该项直接跳过，不会把整个目录打成 500。

### 别名

| 传入 | 正规化 |
| --- | --- |
| `stt` / `local_stt` | `asr` |
| `local_embedding` | `embedding` |
| `local_rerank` | `reranker` |
| `tts` / `gsv_tts_local` | `gpt_sovits` |

客户端应显示正规化后的 id。自己发明 `local_tts` 之类会 404。

## 接口合同

| 方法 | 路径 | 码 | 失败时 |
| --- | --- | ---: | --- |
| GET | `/api/resources` | 200 | 403 门禁 |
| GET | `/{id}/status` | 200 | 404 未知资源 |
| POST | `/{id}/install` | 202 | 无安装器 500；安装异常写任务 `failed` 再 500 |
| DELETE | `/{id}/install/cancel` | 202 | 未在安装则原样返回 status；无 cancel 方法 405 `该资源不支持停止安装` |
| DELETE | `/{id}/install` | 200 | 正在安装 409 `资源正在安装，请先停止安装`；无卸载方法 405 |
| GET | `/tasks?limit=` | 200 | limit 夹在 1–100，默认 30 |
| GET | `/tasks/{task_id}` | 200 | 404 `任务不存在` |
| DELETE | `/tasks/{task_id}` | 202 | 404；仅当状态 ∈ 进行中才真正 cancel |
| POST | `/tasks/{task_id}/retry` | 202 | 404；参数里 `retry_count` +1 后重新 `_install` |
| DELETE | `/tasks?finished=true` | 200 | **缺少 finished=true → 400 `只允许清理已结束的任务`** |

进行中：`queued` `preparing` `downloading` `verifying` `installing` `running`。

可被清理的终态：`succeeded` `success` `ready` `failed` `cancelled` `interrupted`。

`DELETE /tasks?finished=true` 返回 `{ "deleted": N }`，只删 SQLite 里的 `ProviderDownloadTask` 行，**不删模型文件**。

## GPT-SoVITS：不要只看红绿

安装目录和服务进程分属不同组件。

| 字段 | 含义 |
| --- | --- |
| `installed` | 发行包存在 |
| `installation_ready` | 受管安装完整 |
| `service_running` | API 活着 |
| `ready` | **`installation_ready and service_running`** |
| `configured` | 适配器已选中一套安装（外部目录优先） |
| `missing` | 缺什么 |
| `next_action` | 下一步，不是按钮文案 |
| `install_dir` | 外部配置路径优先，否则受管目录 |

| 观察 | next_action |
| --- | --- |
| `installing` | `wait` |
| 未安装 | `install` |
| 已安装但适配器未 configured | `check`（missing 含「安装配置」） |
| missing 非空或 installation_ready 为假 | `check` |
| 没起服务 | `start_service` |
| 都好 | `none` |

目录在时再点一次 install 通常是错的。`wait` / `check` / `start_service` 不要渲染成同一个「未安装」红灯。

`config_worker` 可以把这些收成可回复摘要，但**不会**把密钥或绝对路径塞进对话。

## 和 Worker 的关系

| 资源页装的 | 业务 Worker | 超时 |
| --- | --- | ---: |
| embedding / reranker | knowledge_worker | 45s |
| 文档转换依赖 | document_worker | 120s |
| asr / gpt_sovits | voice_worker | 300s |
| rvc | rvc_worker | 1800s |
| Live2D 模型目录 | live2d_worker | 45s |
| 安装动作本身 | config_worker | 45s |
| 改欢迎词等人设 | profile_worker | 30s |

装好 ≠ 角色已授权。没授权时 run 是 `capability_denied`，不是资源 404。

对话 TTS 不走 RVC。RVC 走 `/api/voice/rvc`。

## 系统诊断（经常被当成「资源坏了」）

`GET /api/system/diagnostics` 同样 `require_local`，内部 `get_system_status()`，只读。

打开目录：

`POST /api/system/open-directory/{location}`

允许：`project` / `data` / `runtime` / `models` / `sqlite` / `milvus`。其它 **404** `未知的诊断目录`（不是 400）。

Docker：

- 设置落在 `data/docker_settings.json`，`on_exit` ∈ `keep | pause | remove`，非法值回退 `pause`
- `POST /api/system/docker/pause` → `docker compose stop`，超时 120s
- `POST /api/system/docker/remove` → `docker compose down`
- 失败体是 `{ "ok": false, "error": "..." }`，不一定抛 500

`POST /api/system/shutdown` 也是本机接口。桌面模式走 `shutdown_callback`（窗口回启动页）；否则 0.5s 后 `os._exit(0)`。`stop_docker=true` 时先 `docker compose stop`（桌面外路径超时 90s）。

## 常见误判

1. **目录在、服务没起** — `next_action=start_service`，不要重新下载。
2. **换 embedding 后知识全空** — collection 维度变了，要重建索引。
3. **RVC 很久没结束** — 默认 1800s，看 `/api/voice/rvc`，不要当 TTS 失败。
4. **远程电脑改不了资源** — `require_local`，这是功能。
5. **对话问「缺什么」只给摘要** — `config_worker` 故意不回绝对路径。
6. **清理任务 400** — 必须 `DELETE /api/resources/tasks?finished=true`。
7. **漏 `X-Charactoid-Request: web`** — 403，不是资源没装上。
8. **正在安装时卸载 409** — 先 cancel。
9. **LLM 测试 502** — 对端模型服务不可达，设置页问题，不要重装 embedding。
10. **把 `/api/providers/test` 当成安装接口** — 那是探测密钥，不会下载模型。

## 下一步

资源好了仍不能检索或不能开口，转到 [常见问题](/troubleshooting/qa)、[准备本地资源](/guide/resources)、[语音 API](/reference/api-voice)。

