# 资源与模型 API

## 资源管理

资源路由包括 `/api/resources` 及保留的 `/api/providers/resources` 兼容路由，覆盖状态、安装、取消、删除、目录和服务启停。

## 模型资源

| 前缀 | 资源 |
| --- | --- |
| `/api/embedding` | 向量模型安装、配置和状态 |
| `/api/reranker` | 重排模型安装、配置和状态 |
| `/api/asr`、`/api/stt` | 识别模型和配置 |
| `/api/providers/rvc` | RVC 运行时和模型资源 |
| `/api/gpt-sovits`（由语音资源路由提供） | GPT-SoVITS 安装、探测、服务启停 |

## 安装任务

安装通常返回 `202`，客户端应保存任务标识并轮询状态；取消、删除和启停都要先检查当前状态，避免重复操作。

## 配置示例

```env
APP_HOST=127.0.0.1
APP_PORT=18000
COLLECTION_NAME=charactoid_knowledge_v1
CHARACTOID_RVC_DEVICE=auto
```

敏感配置和 Provider Key 只放本地 `.env` 或 Web UI 本地设置。
