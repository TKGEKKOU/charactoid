# 系统、状态与设置 API

**系统接口回答三件事：进程是否活着、本机资源现在怎样、以及只有本机才允许做的运维动作。**

源码：`app/startup/routes.py`（`/api/health`、`/api/status`、`/api/launcher/progress`）、`app/routers/system.py`、`app/routers/settings.py`、`ingestion/status.py`。默认前缀之外，健康检查直接挂在应用根上。

默认地址：`http://127.0.0.1:18000`。JSON 使用 `Content-Type: application/json`。

## 健康与总览

### `GET /api/health`（稳定）

确认 FastAPI 进程可访问。成功只表示 HTTP 服务起来了，**不**表示 Embedding、GPT-SoVITS、RVC 或 Docker 已就绪。

```powershell
Invoke-RestMethod http://127.0.0.1:18000/api/health
```

```json
{"status":"ok","workspace_id":"..."}
```

`workspace_id` 来自 `Settings.workspace_id`，对应本机工作区，不是云端租户号。

### `GET /api/status`（稳定）

返回 `ingestion.status.get_system_status()` 的摘要：核心服务、可选资源、当前工作区。适合启动后做一次总检，不要拿它当任务进度接口。任务进度走 `/api/runs/{run_id}` 或对应资源的 `tasks/{task_id}`。

### `GET /api/launcher/progress`（可选）

桌面启动器或资源启动流程的进度。若 `app.state.launcher_progress` 未注入，返回空进度：

```json
{"starting":false,"done":false,"ok":null,"error":"","percent":0,"steps":[]}
```

前端不应把空进度渲染成失败。

## `/api/system` 运维

这些接口在 `app/routers/system.py`。写操作通过 `require_local` 限制为本机请求，避免被局域网里的其它页面误触。

| 方法 | 路径 | 作用 | 副作用 |
| --- | --- | --- | --- |
| `GET` | `/api/system/diagnostics` | 只读诊断 | 无 |
| `POST` | `/api/system/open-directory/{location}` | 用系统文件管理器打开已知目录 | 打开资源管理器 |
| `GET` | `/api/system/docker-settings` | 读 Docker 退出策略 | 无 |
| `PUT` | `/api/system/docker-settings` | 写 `data/docker_settings.json` | 改本地 JSON |
| `POST` | `/api/system/docker/pause` | `docker compose stop` | 暂停容器，不删除数据 |
| `POST` | `/api/system/docker/remove` | `docker compose down` | 停止并移除 compose 服务 |
| `POST` | `/api/system/shutdown` | 延迟退出当前进程 | 桌面版回到启动页或结束窗口 |

### 诊断

`GET /api/system/diagnostics` 聚合当前 MCP 管理器、资源目录和系统状态，不修改用户数据。排障时应先打这一条，再决定要不要打开目录或动 Docker。

`POST /api/system/open-directory/{location}` 只接受白名单 `location`。未知值返回 400。打开的是本机目录，不是把路径回传给浏览器。

### Docker 退出策略

`on_exit` 只允许：

- `keep`：退出时保留容器
- `pause`：默认，执行 `docker compose stop`
- `remove`：执行 `docker compose down`

桌面版关闭窗口时会读这个文件。HTTP 客户端不要把 pause 理解成删除数据卷。

### 关机

`POST /api/system/shutdown` 请求体 `ShutdownPayload`，字段 `stop_docker`。本机校验通过后延迟约 0.5s：

1. 若存在 `app.state.shutdown_callback`（桌面模式），回调停服务，窗口回到启动页，进程不一定退出。
2. 否则可选先 `docker compose stop`，再结束当前进程。

不要在文档站、CI 或远程机器上调用这一支。

## `/api/settings`

`app/routers/settings.py` 管本机 Provider 与密钥，不把密钥写进仓库或公开文档。

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| `POST` | `/api/settings/llm/test` | 按当前配置探测语言模型 |
| `POST` | `/api/settings/reveal-key` | 本机显示已保存密钥 |
| `POST` | `/api/settings/clear-key` | 清除已保存密钥 |

探测成功只说明该 Provider 当前能回答；不代表角色、知识库或语音链路可用。密钥接口必须本机调用。

## 状态码

| 状态码 | 含义 |
| --- | --- |
| `200` | 查询或更新成功 |
| `202` | 后台安装/启动任务已接受（资源接口更常见） |
| `400` | 参数或 location 不合法 |
| `403` / 本机拒绝 | 非本机请求打到了 `require_local` |
| `404` | 资源不存在 |
| `409` | 当前状态不允许该操作 |
| `422` | Schema 校验失败 |
| `500` | 内部错误，查终端日志 |
| `503` | 依赖尚未就绪，例如 MCP 管理器未注入 |

## 不该用这些接口做什么

- 不要用 `/api/health` 判断 RAG 或语音是否可用。
- 不要用 `/api/status` 轮询一次 RVC 转换。
- 不要把 `workspace_id` 当成多租户隔离的安全边界；CHARACTOID 是本地优先单工作区。
- 不要把 Docker pause/remove 接到普通角色对话里。那是 `config_worker` 与系统设置的职责。

## 相关页面

- [API 总览](/reference/api)
- [全量路由清单](/reference/api-all)
- [资源与模型 API](/reference/api-resources)
- [配置项](/reference/config)
- [问题排查总表](/troubleshooting)
