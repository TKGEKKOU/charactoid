# 快速开始

## 这页解决什么问题

这页带你在 Windows 上从空环境启动 CHARACTOID，并确认 Web 工作台、SQLite 和本地 Milvus Lite 可以正常工作。这里描述的是仓库当前的真实启动方式：默认端口是 `18000`，默认使用项目目录内的 SQLite 和 Milvus Lite 文件，不要求先部署 Docker 版 Milvus。

如果你只想先看到界面，优先完成“启动服务”和“配置 LLM”两步；如果还没有语音、RVC 或知识库模型，可以先跳过对应功能。

## 前置条件

- Windows PowerShell；
- Python **3.11**；`py -3.11` 或 `python` 可以调用它；
- Git（如果你是从仓库克隆）；
- 至少一个可用的 LLM Provider 配置；
- 如果要处理音视频，再准备 FFmpeg；如果要使用本地语音模型，还需要额外的模型和运行时。

项目的 Python 依赖由 `requirements.txt` 和 `pyproject.toml` 管理。仓库要求 Python `>=3.11,<3.12`。

## 操作步骤

### 1. 进入项目目录

```powershell
cd C:\\path\\to\\CHARACTOID
```

如果你的项目放在别处，把路径替换成实际路径即可。

### 2. 使用一键启动脚本

推荐第一次运行使用：

```powershell
.\scripts\start.ps1
```

脚本会按顺序：

1. 检查 Python 3.11；
2. 创建或复用 `.venv`；
3. 安装或校准 `requirements.txt` 和项目本身；
4. 如果没有 `.env`，从 `.env.example` 复制生成；
5. 启动 FastAPI 服务；
6. 默认打开本地 Web 工作台。

常用参数：

```powershell
# 环境已经安装好时，跳过依赖安装
.\scripts\start.ps1 -NoInstall

# 启动宿主窗口，同时仍然使用浏览器中的工作台
.\scripts\start.ps1 -Desktop

# 启动服务但不自动打开浏览器
.\scripts\start.ps1 -NoBrowser
```

脚本中 `-Server` 是兼容参数，当前默认启动行为已经是 Web 服务。

### 3. 手动启动

如果你不使用脚本，可以直接运行：

```powershell
.\.venv\Scripts\python.exe -B main.py
```

如果没有虚拟环境，先创建并安装依赖：

```powershell
py -3.11 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -e . -r requirements.txt
```

### 4. 打开工作台并检查健康状态

浏览器访问：

```text
http://127.0.0.1:18000/static/index.html
```

只检查服务是否存活时，可以访问：

```text
http://127.0.0.1:18000/api/health
```

正常响应至少包含：

```json
{"status":"ok","workspace_id":"local-default"}
```

系统状态页使用的只读接口是：

```text
http://127.0.0.1:18000/api/status
```

### 5. 配置 LLM

`.env.example` 明确说明：LLM、Embedding 和联网搜索配置由 Web 工作台的“设置”页保存到 `data/local_settings.json`，不直接写入 `.env`。

第一次打开后：

1. 进入设置或 Provider 配置页；
2. 填写 LLM API Key、Base URL 和模型名；
3. 使用页面提供的连接测试；
4. 保存后返回对话页。

不要把真实 API Key 写入 Git，也不要把 `.env` 或 `data/local_settings.json` 上传到 Issue。

### 6. 停止服务

- 使用前台启动命令时，在对应 PowerShell 窗口按 `Ctrl+C`；
- 使用 `-Desktop` 时，关闭宿主窗口；
- 如果浏览器工作台仍打开但服务已退出，刷新页面会显示服务不可用。

当前项目默认只绑定 `127.0.0.1`，这是为了避免未配置认证时把本地资料和设置暴露到局域网。

## 你应该看到什么

- 访问 `/api/health` 返回 `status: ok`；
- Web 工作台可以加载；
- 设置页能够显示 Provider 配置入口；
- `data/charactoid.db` 在首次初始化后作为 SQLite 控制面数据库；
- `data/milvus_local.db` 作为默认的 Milvus Lite 本地文件（真正建立知识索引时才会有可用内容）。

## 常见错误

### PowerShell 不允许执行脚本

如果看到执行策略错误，先在当前用户范围允许本地脚本：

```powershell
Set-ExecutionPolicy -Scope CurrentUser RemoteSigned
```

然后重新执行 `.\scripts\start.ps1`。如果组织策略禁止修改执行策略，请改用手动 Python 命令，并遵守本机安全策略。

### 找不到 Python 3.11

脚本只接受 3.11。检查：

```powershell
py -3.11 --version
python --version
```

如果默认 `python` 是其他版本，请安装 Python 3.11，并重新创建 `.venv`。

### 18000 端口被占用

查看占用进程：

```powershell
Get-NetTCPConnection -LocalPort 18000 -State Listen
```

关闭确认无误的占用进程后再启动。不要随意结束未知进程；也不要只改文档中的端口，运行端口应以 `.env` 的 `APP_PORT` 和实际启动日志为准。

### 页面能打开但对话失败

这通常不是 FastAPI 没启动，而是 LLM Provider 尚未配置、模型名错误、Base URL 不匹配或网络不可用。先回到设置页测试 LLM，再查看 `/api/status` 和页面错误信息。

### RAG 或语音按钮不可用

这些能力依赖独立 Provider 或本地资源。先完成基础对话，再按照[本地资源准备](./resources)配置 Embedding、Reranker、ASR、TTS、Separator、RVC 或 GPT-SoVITS。

## 下一步

- [配置角色](./character)：创建一个最小可用角色；
- [完成一次对话任务](./conversation)：发送普通问题，并理解等待确认与任务结果；
- [本地资源准备](./resources)：按功能安装可选资源；
- [问题排查](/troubleshooting)：启动后遇到问题时按现象定位。
