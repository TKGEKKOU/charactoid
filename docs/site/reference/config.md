# 配置项

## 配置来源

当前配置分为三类：

1. 代码默认值；
2. 项目根目录 `.env`；
3. Web UI 保存的本地设置和运行时任务参数。

实际优先级以对应模块读取方式为准，不要把所有配置都复制到 `.env`。

## 基础配置

| 变量 | 默认/示例 | 作用 |
| --- | --- | --- |
| `APP_HOST` | `127.0.0.1` | 主服务绑定地址 |
| `APP_PORT` | `18000` | FastAPI 端口 |
| `DB_PATH` | `data/charactoid.db` | SQLite 控制面 |
| `MILVUS_DB_URI` | `./data/milvus_local.db` | Milvus Lite 数据文件 |
| `COLLECTION_NAME` | `charactoid_knowledge_v1` | 向量集合名称 |

## RAG 配置

| 变量 | 示例 | 作用 |
| --- | --- | --- |
| `RAG_PIPELINE` | `default` | Adaptive/Corrective RAG 流程 |
| `MAX_REWRITE_COUNT` | `1` | 查询改写次数上限 |
| `MAX_GENERATION_RETRY` | `1` | 生成质量重试上限 |
| `DEFAULT_CONFIDENCE_THRESHOLD` | `0.75` | 置信度门限 |
| `MAX_UPLOAD_MB` | `50` | 单文件上传上限 |

## 语音与资源

| 变量 | 示例 | 作用 |
| --- | --- | --- |
| `CHARACTOID_RVC_DEVICE` | `auto` | RVC 使用 GPU/CPU 策略 |
| `CHARACTOID_RVC_HF_ENDPOINT` | 空 | 可选下载镜像/代理 |

## 安全

`.env` 已被 Git 忽略。不要提交 API Key、Token、Cookie、模型下载凭据或真实外部服务地址。默认绑定回环地址；公网部署必须另行配置认证、HTTPS、访问控制和数据隔离。

## 更换向量模型

Embedding 维度改变时，不要复用旧集合。修改集合名称、重新摄取文档并确认检索结果后再切换角色。

## 配置优先级

CHARACTOID 并不存在一条对所有模块都完全相同的全局覆盖链。按当前实现可用以下顺序理解，并以具体模块的读取逻辑为准：

```text
代码默认值
→ .env（基础设施和启动参数）
→ data/local_settings.json / Web UI（Provider、Embedding、联网搜索等本地设置）
→ 单次 API 或任务参数（只影响本次调用）
```

`.env.example` 已明确说明：LLM、Embedding 和联网搜索主要由 Web 工作台保存到 `data/local_settings.json`，不要为了“集中管理”而重复写入多个位置。

## 配置项详表

| 变量名 | 默认值 | 必填 | 作用 | 修改时机 | 安全注意事项 |
| --- | --- | --- | --- | --- | --- |
| `APP_HOST` | `127.0.0.1` | 否 | FastAPI 监听地址 | 需要局域网访问时 | 未配置认证前不要绑定公网地址 |
| `APP_PORT` | `18000` | 否 | Web/API 端口 | 端口冲突时 | 同步修改反向代理和客户端地址 |
| `DB_PATH` | `data/charactoid.db` | 否 | SQLite 控制面文件 | 调整数据目录时 | 迁移前备份；不要提交数据库 |
| `MILVUS_DB_URI` | `./data/milvus_local.db` | 否 | Milvus Lite 或远程 Milvus 地址 | 更换向量数据面时 | 远程地址和凭据不要提交 |
| `MILVUS_USER` | 空 | 远程模式可能需要 | 远程 Milvus 用户名 | 启用远程鉴权时 | 视为敏感信息 |
| `MILVUS_PASSWORD` | 空 | 远程模式可能需要 | 远程 Milvus 密码 | 启用远程鉴权时 | 禁止提交 Git |
| `COLLECTION_NAME` | `charactoid_knowledge_v1` | 否 | 向量集合名 | Embedding 维度或索引版本变化时 | 新旧维度不要复用同一集合 |
| `RAG_PIPELINE` | `default` | 否 | Adaptive/Corrective RAG 流程 | 调试检索策略时 | `adaptive` 是兼容别名 |
| `MAX_REWRITE_COUNT` | `1` | 否 | 查询改写上限 | 调整纠错成本时 | 次数越高延迟和模型成本越高 |
| `MAX_GENERATION_RETRY` | `1` | 否 | 质量门生成重试上限 | 调整质量/延迟平衡时 | 不应无限重试 |
| `DEFAULT_CONFIDENCE_THRESHOLD` | `0.75` | 否 | 证据置信度阈值 | 评测后校准 | 过低会增加无依据回答 |
| `MAX_UPLOAD_MB` | `50` | 否 | 单文件上传上限 | 处理大文档时 | 同时考虑磁盘、内存和网关限制 |
| `CHARACTOID_RVC_DEVICE` | `auto` | 否 | RVC GPU/CPU 选择 | 设备探测错误或显存不足时 | `cuda` 并不保证环境实际可用 |
| `CHARACTOID_RVC_HF_ENDPOINT` | 空 | 否 | RVC 下载镜像/代理 | 官方源不可达时 | 不要嵌入带凭据的 URL |

## Web UI 管理的配置

以下内容主要由设置 API 和本地设置文件管理，而不是 `.env.example`：

- LLM Provider、模型、Base URL 和 API Key；
- Embedding Provider、来源、设备和模型；
- Reranker 模型与设备；
- 联网搜索 Provider；
- B站、OneBot11、MCP 等外部接入配置；
- GPT-SoVITS、ASR/STT、RVC 等运行时路径或服务状态。

调用 `POST /api/settings/reveal-key` 会触及敏感配置，只应在受信任的本机 UI 中使用。

## 数据、缓存和临时目录

- `data/`：SQLite、Milvus Lite、Live2D 资源和本地设置；
- `runtime/`：受管理的 ASR、Embedding、Reranker、RVC、GPT-SoVITS 等运行时；
- 临时音视频文件：由具体任务管理器创建和清理，不应作为永久引用返回给前端；
- 永久结果：应登记为资产并通过 `asset_id` 或任务文件 ID 使用。

## `settings.py` 快照里还有这些

`Settings` 是 frozen dataclass。进程启动时拍一次快照；改文件后要重新加载才生效。

### 不是 `.env` 的项

| 项 | 实际来源 | 当前默认 | 说明 |
| --- | --- | --- | --- |
| `workspace_id` | 代码写死 | `local-default` | 改 `.env` 不会换工作区 |
| `chunk_size` | `local_settings.json` | `1000` | 文档切分 |
| `chunk_overlap` | `local_settings.json` | `150` | 切分重叠 |
| `embedding_provider` | `local_settings.json` | 空则按 Base URL 推断：DashScope→`qwen`，有 URL→`custom`，否则 `managed_local` | 只接受 `qwen / managed_local / custom` |
| `embedding_dimensions` | `local_settings.json` | `managed_local` 为 1024，否则 512 | 与集合维度必须一致 |
| `embedding_send_dimensions` | `local_settings.json` | `true` | 是否把维度发给上游 |
| `embedding_model_source` | `local_settings.json` | `modelscope` | 只接受 `modelscope / huggingface` |
| `embedding_device` | `local_settings.json` | `auto` | 只接受 `auto / cuda / cpu` |
| LLM / STT / TTS / Reranker 凭据 | `local_settings.json` | 空 | `is_real_api_key()` 会把 `your-api-key`、`sk-...`、`<api-key>` 等占位值当成未配置 |

`local_settings.json` 读失败（缺文件、不是 JSON、IO 错误）时回退 `{}`，设置页仍可启动。

### 仍由 `.env` 读取的项

| 变量 | 默认 | 说明 |
| --- | --- | --- |
| `MCP_ALLOW_ARBITRARY_STDIO` | `false` | 为真才允许任意 stdio MCP；`1/true/yes/on` 才算真 |
| `MILVUS_USER` / `MILVUS_PASSWORD` | 空 | 远程 Milvus 才用；Lite 文件模式通常为空 |
| `RAG_PIPELINE` | `default` | 读入后会 `lower()` |

布尔解析走 `setting_bool`：字符串 `"false"` 不会被当成 True。API Key 走 `configured_api_key`，模板值在快照里就是空字符串。

冻结的桌面包（`sys.frozen`）把 `project_root` 指到可执行文件所在目录，而不是源码树。路径类配置都相对这个根。
