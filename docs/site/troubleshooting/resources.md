# 资源安装与模型

**资源页不是装饰。** `config_worker` 只查询、安装、更新、取消和清理受管资源，不代替 knowledge / voice / rvc 去执行业务。资源没就绪时，对话仍可能进行，只是对应链路缺段。

> **事实依据**：`app/routers/resources.py`（`/api/resources` 与兼容 `/api/providers/resources`）、`agents/registry.py` 对 `config_worker` 的描述、`app/routers/system.py`、`app/routers/settings.py`、GPT-SoVITS 状态机在 resources 内的 `_gpt_sovits_status`。

## 双前缀

写代码或抓包时两套前缀指向同一套处理：

- 规范：`/api/resources`
- 兼容：`/api/providers/resources`

都要 `require_local`。浏览器扩展或远程 Origin 会 403。

## 目录与状态

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| GET | `/api/resources` | 资源目录 |
| GET | `/{provider_id}/status` | 单项状态 |
| POST | `/{provider_id}/install` | 开始安装，HTTP 202 |
| DELETE | `/{provider_id}/install/cancel` | 取消进行中的安装，202 |
| DELETE | `/{provider_id}/install` | 移除已安装资源 |
| GET | `/tasks` | 安装/下载任务，默认 limit=30 |
| GET | `/tasks/{task_id}` | 任务详情 |
| DELETE | `/tasks/{task_id}` | 取消任务，202 |
| POST | `/tasks/{task_id}/retry` | 重试，202 |
| DELETE | `/tasks?finished=` | 清理已结束任务 |

`provider_id` 会经 `_canonical_provider_id` 正规化。不要在客户端自己发明 id。

## 读懂 status，不要只看红绿

GPT-SoVITS 这组字段最容易误判：

| 观察 | 含义 | `next_action` |
| --- | --- | --- |
| 正在装 | 目录写入中 | `wait` |
| 未安装 | 受管目录不存在 | `install` |
| 已安装但没写入配置 | 目录在，服务适配器还不能选 | `check` |
| 缺文件 / installation_ready 为假 | 装了一半 | `check` |
| 装好但服务没起 | 模型在，进程没起 | `start_service` |
| 都好 | 可选、可推理 | `none` |

`config_worker` 的职责就是把这些状态收成可回复摘要，**不把密钥或本地绝对路径塞进对话**。

## 和 Worker 的关系

| 你在资源页装的 | 对话里谁用 | 超时 |
| --- | --- | ---: |
| 向量 / 重排 | knowledge_worker | 45s |
| 文档转换依赖 | document_worker | 120s |
| ASR / TTS / GPT-SoVITS | voice_worker | 300s |
| RVC 模型 | rvc_worker | 1800s |
| Live2D 模型目录 | live2d_worker | 45s |
| 安装动作本身 | config_worker | 45s |

装好 ≠ 角色已授权。角色能力在 `GET/PUT /api/personas/{id}/capabilities`。没授权时 run 会 `capability_denied`，不是资源 404。

## 系统诊断

只读诊断：`GET /api/system/diagnostics`（同样 `require_local`），内部 `get_system_status()`。

打开目录不是任意路径：

`POST /api/system/open-directory/{location}`

允许的 location 只有：`project` / `data` / `runtime` / `models` / `sqlite` / `milvus`。其它 404 `未知的诊断目录`。

Docker：

- `GET/PUT /api/system/docker-settings`，`on_exit` ∈ `keep | pause | remove`，落在 `data/docker_settings.json`
- `POST /api/system/docker/pause` → `docker compose stop`
- `POST /api/system/docker/remove` → `docker compose down`
- 超时 120s，失败 `ok: false`

关机 `POST /api/system/shutdown` 也是本机接口。

## 常见误判

1. **目录在、服务没起** —— 去 start_service，不要重新下载。
2. **换 embedding 后知识全空** —— collection 维度变了，要重建索引，不是资源没装上。
3. **RVC 很久没结束** —— 默认 1800s，看 `/api/voice/rvc` 任务，不要当 TTS 失败。
4. **远程电脑打开工作台改不了资源** —— `require_local`，这是功能。
5. **对话里问“缺什么”得到摘要而不是路径** —— config_worker 故意不回绝对路径。

## 下一步

资源好了仍不能检索或不能开口，转到 [常见问题](/troubleshooting/qa) 和 [语音 API](/reference/api-voice)。
