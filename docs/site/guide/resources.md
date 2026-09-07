# 本地资源准备

**这页说明哪些资源是 CHARACTOID 的基础配置，哪些是按需安装的可选能力，以及应该按什么顺序准备它们。**

默认目标是先跑通文字对话，再按需求增加知识检索、语音输入、语音输出、RVC 和 GPT-SoVITS。不要为了启动基础 Web 工作台一次性安装所有模型。

## 前置条件

- 已完成[快速开始](./quickstart)；
- 项目根目录存在 `.env`；
- `.env` 由 `.env.example` 复制而来，或已经确认当前配置；
- 需要安装本地模型时，准备网络、磁盘空间和足够的内存；
- 需要 GPU 的任务先确认本机 CUDA、驱动和对应 Python 运行时可用。

## 操作步骤

### 1. 先确认基础目录和端口

`.env.example` 当前的关键默认值是：

```env
APP_HOST=127.0.0.1
APP_PORT=18000
DB_PATH=data/charactoid.db
MILVUS_DB_URI=./data/milvus_local.db
COLLECTION_NAME=charactoid_knowledge_v1
```

含义是：

- Web 工作台默认通过 `18000` 访问；
- 角色、会话和状态使用本地 SQLite；
- 知识库默认使用嵌入式 Milvus Lite；
- 向量集合名用于隔离当前 Embedding 配置。

`.env` 会被 Git 忽略。不要把其中的密码或 Provider Key 提交到仓库。

### 2. 配置 LLM（基础对话需要）

LLM、Embedding 和联网搜索并不在 `.env.example` 中直接填写。仓库注释说明，这些设置由 Web 工作台的“设置”页保存到：

```text
data/local_settings.json
```


### 3. 准备知识库资源（RAG，可选）

知识库默认使用本地 Milvus Lite。为了让 RAG 真正返回证据，还需要 Embedding；当前默认本地 Embedding 模型由代码定义为：

```text
Qwen/Qwen3-Embedding-0.6B
```

默认本地 Reranker 模型为：

```text
Qwen/Qwen3-Reranker-0.6B
```


准备知识资料的实际顺序：

1. 创建角色，并打开它的知识资料区域；
2. 上传支持的文档；
3. 查看转换结果；
4. 点击“确认索引”，开始建立知识库；
5. 等待文档状态为 `indexed`；

支持的文档扩展名来自 `ingestion/document_jobs.py`，包括：

```text
.pdf .doc .docx .ppt .pptx .xls .xlsx
.html .htm .csv .json .xml .txt .md
```

旧版 Word `.doc` 在转换器中会提示先另存为 `.docx`，这是当前实现的明确限制。


### 4. 准备语音输入（ASR / STT，可选）

进入语音资源页面，安装或选择语音识别模型，完成后用页面提供的测试功能确认可以识别一段短音频。

### 5. 准备语音输出（TTS，可选）


本地 GPT-SoVITS 是独立的可选运行时，不会因为创建角色而自动安装或启动。需要它时，先进入 Provider/声音资源页面检查安装状态，再启动服务。

### 6. 准备 GPT-SoVITS 音色（可选）




### 7. 准备 FFmpeg、人声分离和 RVC（可选）

FFmpeg 用于部分音视频读取、转换和处理；ASR 配置也支持填写 `ffmpeg_path`。


RVC 是音频到音频的变声处理，不是角色对话的 TTS。它需要音色模型及相关特征/音高资源；没有模型时只能看到未就绪状态，不能把“安装了 RVC 运行时”理解成“已经可以转换”。


### 8. 准备 Live2D（可选）

Live2D 模型目录由服务端管理，当前可以查询模型和 VTuber Studio 状态：

模型必须放入应用识别的本地 Live2D 目录。不要在文档或角色资料中写入任意本地路径来绕过服务端目录约束；先使用工作台的模型目录入口。

## 你应该看到什么

- Provider/资源页面能分别显示 LLM、Embedding、Reranker、ASR、TTS、RVC 和 GPT-SoVITS 的配置或运行状态；
- 知识文档上传后先进入转换/预览状态，确认后才开始索引；
- 资源没有安装时显示未就绪，而不是显示虚假的“已完成”；
- 只有准备好相应资源后，RAG、语音、RVC 或 Live2D 才能进入可用链路。

## 常见错误

### 把所有 Key 都写进 `.env`

当前项目把 LLM、Embedding 和联网搜索设置保存到 `data/local_settings.json`。优先使用工作台设置页；不要自行添加代码中没有读取的环境变量并期待它生效。

### 更换 Embedding 模型后索引报错

不同模型可能有不同向量维度。`.env.example` 明确提示，改变 Embedding 维度时应使用新的 `COLLECTION_NAME` 重建索引；不要用新维度直接写入旧集合。

### 文档上传成功但没有检索结果

检查文档是否已经完成索引、向量模型是否可用、重排模型是否配置，以及当前角色是否关联了正确的知识资料。

### RVC 能看到页面但无法转换

检查 RVC 资源状态、音色模型列表、输入文件类型和任务错误信息。RVC 运行时、`.pth`/`.index` 等模型文件和输入音频是不同层次的资源。

### GPT-SoVITS 状态正常但没有语音

检查服务是否真的启动、声音资产是否存在、参考音频和模型路径是否有效，以及当前角色是否使用了可用 TTS 配置。

### 本地模型下载很慢或失败


## 下一步

- [完成一次对话任务](./conversation)；
- [配置角色](./character)；
- [问题排查](/troubleshooting)。
