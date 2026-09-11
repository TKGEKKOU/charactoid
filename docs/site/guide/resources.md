# 本地资源准备

**先跑通文字对话，再按需装可选能力。** 不要为了打开 Web 工作台一次性下载全部模型。

CHARACTOID 把「本机可管理资源」和「Provider 密钥配置」分成两层：

- 资源目录、安装、取消、卸载：`app/routers/resources.py`，前缀 `/api/resources`（兼容 `/api/providers/resources`）
- LLM / Embedding / 联网搜索的端点与密钥：Web 设置页写入 `data/local_settings.json`，**不**写在 `.env.example`
- 角色是否允许用某条能力：`GET/PUT /api/personas/{id}/capabilities`。装好资源 ≠ 角色已授权

> 事实依据：`.env.example`、`app/routers/resources.py`、`app/routers/settings.py`、`ingestion/document_jobs.py`、`app/routers/system.py`。

## 前置条件

- 已完成[快速开始](./quickstart)
- 项目根目录有 `.env`（由 `.env.example` 复制，已被 Git 忽略）
- 装本地模型前准备网络、磁盘和内存；需要 GPU 的任务先确认 CUDA / 驱动
- 改资源、改设置必须从本机打开工作台。`require_local` 会拒绝局域网 IP、改过的 Host、对不上的 Origin

## 建议顺序

1. 确认端口和数据目录，打开 `http://127.0.0.1:18000`
2. 在设置页配置 LLM，并用「测试连接」确认能通
3. 创建角色，先完成一轮纯文字对话
4. 需要检索时再装 Embedding / Reranker，上传文档并确认索引
5. 需要听写再装 ASR；需要角色开口再装 GPT-SoVITS 并启动服务
6. 需要变声或音视频处理再装 FFmpeg、人声分离、RVC
7. 需要形象再放入 Live2D 模型目录

`start.ps1` 探测的是写死的 `18000`。改 `APP_PORT` 后脚本不会自动跟过去，浏览器也要改地址。

## 1. 基础目录和端口

`.env.example` 当前默认值：

```env
APP_HOST=127.0.0.1
APP_PORT=18000
DB_PATH=data/charactoid.db
MILVUS_DB_URI=./data/milvus_local.db
COLLECTION_NAME=charactoid_knowledge_v1
RAG_PIPELINE=default
MAX_REWRITE_COUNT=1
MAX_GENERATION_RETRY=1
DEFAULT_CONFIDENCE_THRESHOLD=0.75
MAX_UPLOAD_MB=50
CHARACTOID_RVC_DEVICE=auto
```

含义：

- 工作台默认只绑本机 `127.0.0.1:18000`，避免未鉴权时暴露到局域网
- 角色、会话、任务状态在 SQLite；`data/` 已被 Git 忽略
- 知识库默认嵌入式 Milvus Lite，不需要 Docker Desktop
- 改 Embedding 维度时必须换 `COLLECTION_NAME` 重建索引，不能往旧集合写新维度
- 知识文档上传上限是 `MAX_UPLOAD_MB`（默认 50MB）。对话附件是另一条路，上限 512MB

可选远程 Milvus：把 `MILVUS_DB_URI` 改成 `http://127.0.0.1:19530`，需要鉴权时再填 `MILVUS_USER` / `MILVUS_PASSWORD`。

## 2. 配置 LLM（基础对话需要）

LLM、Embedding 和联网搜索**不**在 `.env` 里填。设置页保存到：

```text
data/local_settings.json
```

相关接口都要本机访问：

| 方法 | 路径 | 说明 |
| --- | --- | --- |
| `GET` | `/api/settings` | 读当前本机设置 |
| `PATCH` | `/api/settings` | 保存；部分项会提示需要重启 |
| `DELETE` | `/api/settings` | 清空本机设置文件 |
| `POST` | `/api/settings/llm/test` | 探测当前 LLM |
| `POST` | `/api/settings/reveal-key` | 显示已存密钥 |
| `POST` | `/api/settings/clear-key` | 清除密钥 |

`POST /api/settings/llm/test`、`reveal-key`、`clear-key` 还要求请求头：

```http
X-Charactoid-Request: web
```

缺这个头会 403（`缺少同源请求标识` 或 `Missing same-origin request header`）。上游返回 401/403 时，工作台应展示「密钥或权限失败」，不要只显示 500。探测 502 说明对端模型服务当时不可达，先查 Provider 地址和本机网络，不要重装资源目录。

探测成功只表示这个 Provider 能回答，不表示知识库、ASR 或 TTS 可用。

## 3. 资源目录里到底有哪 7 项

`GET /api/resources` 返回的受管目录（`config_worker` 也只认这些 id）是：

| `provider_id` | 标题 | 对话里谁用 | Worker 超时 |
| --- | --- | --- | ---: |
| `rvc` | RVC 运行环境 | `rvc_worker` | 1800s |
| `separator` | 人声分离模型 | 音视频预处理 | 随语音/RVC 任务 |
| `asr` | 语音识别资源 | `voice_worker` 听写 | 300s |
| `gpt_sovits` | GPT-SoVITS 运行环境 | `voice_worker` TTS | 300s |
| `ffmpeg` | FFmpeg 音视频处理 | ASR/RVC/分离的读文件 | — |
| `embedding` | Embedding 本地模型 | `knowledge_worker` | 45s |
| `reranker` | Reranker 本地模型 | `knowledge_worker` 精排 | 45s |

别名会经 `_canonical_provider_id` 正规化，不要在客户端发明第四套 id：

| 传入 | 正规化后 |
| --- | --- |
| `stt` / `local_stt` | `asr` |
| `local_embedding` | `embedding` |
| `local_rerank` | `reranker` |
| `tts` / `gsv_tts_local` | `gpt_sovits` |

未知 id → 404，detail 含「未找到可管理资源」。

所有资源接口都要：

1. `require_local`（非本机 403 `Local settings are available on localhost only`）
2. 头 `X-Charactoid-Request: web`（否则 403 `Missing same-origin request header`）

兼容前缀 `/api/providers/resources` 挂的是同一套 `list_tasks` / `install` / `retry`，**不会**再维护第二张任务表。`/api/providers` 本身管的是 Provider 配置，和下载本地包不是一件事。

## 4. 知识库资源（RAG，可选）

默认本地模型名（代码内，不是 `.env`）：

- Embedding：`Qwen/Qwen3-Embedding-0.6B`
- Reranker：`Qwen/Qwen3-Reranker-0.6B`

`managed_local` Embedding 默认维度 1024，其它默认 512。维度或模型变了，换 `COLLECTION_NAME`，并调用检索器缓存清理，不要假设旧 Milvus 连接还指向新集合。

文档必须走知识空间，不能把文件丢进对话附件就指望能检索。

实际顺序：

1. 创建角色，打开它的知识资料
2. `POST /api/knowledge-spaces/{space_id}/documents/upload`
3. 转换完成后状态为 `preview_ready`，先看预览
4. `POST /api/documents/{job_id}/confirm` 才开始索引
5. 等到 `indexed`

状态机（`ingestion/document_jobs.py`）：

```text
converting → preview_ready → indexing → indexed
                              ↘ index_failed →（仅此时）retry-index
```

- `confirm` 只接受 `preview_ready`，否则 `INVALID_DOCUMENT_STATE`
- `retry-index` 只接受 `index_failed`
- 空文件 422 **不属于**文档上传；语音空音频才会 422 `Audio file is empty` / `Audio request is empty`
- 文档体积超过 `MAX_UPLOAD_MB`（默认 50）→ 413 `File too large`
- 旧版 Word `.doc` 转换器会要求先另存为 `.docx`

允许的扩展名：

```text
.pdf .doc .docx .ppt .pptx .xls .xlsx
.html .htm .csv .json .xml .txt .md
.epub .jpg .jpeg .png .gif .bmp .tif .tiff
```

`.csv` / `.xlsx` 走结构化导入（schema card），正文走 Milvus。结构化查询必须走受限 SQL 合同，模型不能直接拼 SQL。

对话附件是另一条路：`POST /api/conversations/{conversation_id}/attachments`，上限 **512MB**，错误信息含 `512` 时 HTTP 413。要进知识库再 `send-to-rag`，仍然传 `file_id`，不传本机路径。

## 5. 语音输入（ASR / STT，可选）

在资源页安装 `asr`（别名 `stt`）。完成后用页面测试识别一段短音频。

`POST /api/voice/transcriptions`：

- `multipart/form-data` 字段必须叫 `file`
- 必须 `X-Charactoid-Request: web`
- 音频上限 10MB，整包上限 10MB+64KB
- 空请求 / 空文件 → 422
- ASR 未配置 → 503
- 上游失败 → 502
- 识别结果为空 → 422 `No speech was recognized`

ASR 配置可以填 `ffmpeg_path`。没装 FFmpeg 时，部分容器格式读不出来，看起来像「识别坏了」。

## 6. 语音输出与 GPT-SoVITS（可选）

本地 GPT-SoVITS **不会**因为创建角色而自动安装或启动。安装文件和服务进程是两套组件：

| 字段 | 含义 |
| --- | --- |
| `installed` | 发行包/目录在 |
| `installation_ready` | 受管安装完整 |
| `service_running` | API 服务进程活着 |
| `ready` | `installation_ready && service_running` |
| `configured` | 服务适配器已经选中一套安装（可能是外部目录） |
| `next_action` | 下一步该做什么，**不是**按钮文案 |

`next_action`（`_gpt_sovits_status`）：

| 观察 | `next_action` | 你该做的 |
| --- | --- | --- |
| 正在写入目录 | `wait` | 轮询，不要再点安装 |
| 受管目录不存在 | `install` | `POST .../install` |
| 目录在，但还没写入 GPT-SoVITS 配置 | `check` | 去检测/写入配置，不要重下一遍 |
| 缺文件或 `installation_ready` 为假 | `check` | 查 `missing` |
| 装好但服务没起 | `start_service` | 启动服务 |
| 都可以推理 | `none` | 去角色绑定音色 |

角色开口走绑定音色 + TTS，**不走 RVC**。RVC 是 `/api/voice/rvc` 的文件型长任务。

没有参考音频、没有声音资产、角色没绑 TTS 配置时，状态「看起来正常」也不会出声。

## 7. FFmpeg、人声分离和 RVC（可选）

- **FFmpeg**：读容器、转码、部分 ASR/RVC 预处理。装的是受管资源 `ffmpeg`，不是随便填一个系统 PATH 就结束。
- **separator**：人声分离模型。视频克隆 / 提取人声依赖它，和对话 TTS 无关。
- **RVC**：音频到音频变声。需要运行时 **和** `.pth` / `.index` 等音色文件。装了运行时 ≠ 已经可以转换。

RVC 设备：`.env` 里 `CHARACTOID_RVC_DEVICE=auto`，有 NVIDIA CUDA 会用 GPU，没有也能在 CPU 上跑（会慢）。可选 `CHARACTOID_RVC_HF_ENDPOINT` 只影响 Hugging Face 下载镜像，不改变推理合同。

`rvc_worker` 默认超时 **1800s**。长时间「没结束」先看 `/api/voice/rvc` 任务，不要当 TTS 失败。

正在安装时 `DELETE /{provider_id}/install` 会 409「资源正在安装，请先停止安装」。先 `DELETE .../install/cancel`。资源没有 `cancel_install` 时取消接口 405。

## 8. Live2D（可选）

模型必须放进应用识别的本地 Live2D 目录。用工作台的模型目录入口，或 `POST /api/live2d/model-directory` 这类服务端接口，不要在角色资料里写任意绝对路径绕过。

当前实现约束：MOC3 版本上限 6；`qq_official` 通道在源码里没有实现，不要按「已接入 QQ 官方机器人」去配。

`live2d_worker` 超时 45s，只处理模型目录与状态，不代替绘制引擎。

## 资源任务怎么打

| 方法 | 路径 | 状态码 | 说明 |
| --- | --- | ---: | --- |
| GET | `/api/resources` | 200 | 七项目录 + 每项 `capabilities` |
| GET | `/api/resources/{id}/status` | 200 | 单项状态 |
| POST | `/api/resources/{id}/install` | 202 | 开始安装 |
| DELETE | `/api/resources/{id}/install/cancel` | 202 | 取消进行中的安装 |
| DELETE | `/api/resources/{id}/install` | 200 | 卸载受管文件 |
| GET | `/api/resources/tasks` | 200 | 默认 limit=30，最大 100 |
| GET | `/api/resources/tasks/{task_id}` | 200 | 详情；不存在 404 |
| DELETE | `/api/resources/tasks/{task_id}` | 202 | 取消进行中的任务 |
| POST | `/api/resources/tasks/{task_id}/retry` | 202 | 重试；`retry_count` +1 |
| DELETE | `/api/resources/tasks?finished=true` | 200 | 清理已结束任务记录 |

`DELETE /api/resources/tasks` **必须**带 `finished=true`，否则 400「只允许清理已结束的任务」。它只删任务表记录，不卸载已经装好的模型文件。

进行中状态集合：`queued` / `preparing` / `downloading` / `verifying` / `installing` / `running`。

终态（可被 `finished=true` 清掉）：`succeeded` / `success` / `ready` / `failed` / `cancelled` / `interrupted`。

`config_worker` 超时 45s，只查询/安装/取消/清理受管资源，**不把密钥或本机绝对路径塞进对话**。

打开本机目录只能用：

```text
POST /api/system/open-directory/{location}
```

`location` 白名单：`project` / `data` / `runtime` / `models` / `sqlite` / `milvus`。其它 → 404 `未知的诊断目录`。

## 你应该看到什么

- 资源页能分别显示 7 项受管资源的安装/运行状态，未安装显示未就绪，而不是「已完成」
- 设置页能探测 LLM；失败有可读 detail
- 文档先转换预览，确认后才索引；`indexed` 之后对话才能引用
- GPT-SoVITS 能区分「没装 / 装了一半 / 没启动服务 / 可以推理」
- 远程浏览器能打开页面、能打 `/api/health`，但不能改设置、不能装资源

## 常见错误

### 把所有 Key 都写进 `.env`

LLM / Embedding / 联网搜索在 `data/local_settings.json`。不要发明代码不读的环境变量。

### 页面能打开但对话失败

先 `POST /api/settings/llm/test`。502 是上游不可达；403 可能是非本机或缺少 `X-Charactoid-Request`。角色 404 `Persona not found` 表示不在 `LOCAL_WORKSPACE_ID`，本机单工作区不会跨机器共享角色。

### 更换 Embedding 后检索全空或报维度错误

换 `COLLECTION_NAME` 重建索引。旧向量不能直接复用。

### 文档上传成功但问不到

看 job 是否 `preview_ready`、是否已经 `confirm`、是否 `indexed`、当前角色是否指向这份知识空间。

### GPT-SoVITS 绿灯但没有语音

看 `next_action` 是不是其实该 `start_service` 或 `check`。再看角色 TTS 绑定和参考音频。

### RVC 页面在，转换没有

运行时、音色文件、输入音频是三层。缺任何一层都不是「TTS 坏了」。

### 清理任务 400

补上 `?finished=true`。不要用这个接口卸载模型。

### 本地模型下载很慢或失败

看对应 `tasks/{task_id}` 的 `error` 和阶段。失败后用 retry，而不是连续 POST install。可选 Hugging Face 镜像只对 RVC 下载生效。磁盘满、代理未通、校验失败都会停在 `failed`。

## 下一步

- [完成一次对话任务](./conversation)
- [配置角色](./character)
- [资源安装与模型排查](/troubleshooting/resources)
- [问题排查](/troubleshooting)

