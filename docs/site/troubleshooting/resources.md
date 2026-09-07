# 资源、模型与设备排查

**处理“模型未安装、服务未启动、CUDA 不可用、FFmpeg 不存在、Embedding/Reranker 无法加载”等依赖问题。**

## 前置条件

- 服务已运行在 `http://127.0.0.1:18000`；
- 已准备 `.env`，但不要把真实 Key、Token 或 Cookie 粘贴到问题报告；
- 需要时准备本地模型目录和 GPU 驱动信息。

## 操作步骤

### 1. 查看资源总表

```powershell
Invoke-RestMethod http://127.0.0.1:18000/api/resources
Invoke-RestMethod http://127.0.0.1:18000/api/providers/resources
Invoke-RestMethod http://127.0.0.1:18000/api/embedding/status
Invoke-RestMethod http://127.0.0.1:18000/api/reranker/status
Invoke-RestMethod http://127.0.0.1:18000/api/asr/status
Invoke-RestMethod http://127.0.0.1:18000/api/voice/rvc/status
```

### 2. 检查命令行依赖

```powershell
ffmpeg -version
python --version
nvidia-smi
```

`nvidia-smi` 失败不一定代表 CPU 不能运行；它只说明 NVIDIA 驱动或命令不可用。RVC 的设备选择由 `CHARACTOID_RVC_DEVICE` 和运行环境共同决定。

### 3. 检查向量模型更换

如果 Embedding 维度发生变化，应修改 `COLLECTION_NAME`，重新摄取文档并确认索引；不要让新旧维度写入同一个集合。

## 你应该看到什么

资源接口返回明确的 `installed`、`ready`、`running`、`error` 或任务状态。未安装不应被展示为已就绪。

## 常见错误

- **模型目录存在但状态仍未就绪**：检查目录层级、模型文件名和配置路径；
- **CUDA 不可用**：先改用 CPU 验证流程，再单独处理驱动、CUDA 和 PyTorch 版本；
- **Embedding 加载失败**：确认模型维度、缓存目录和集合名一致；
- **Reranker 未安装**：检索可暂时处于降级状态，但结果质量和置信度要按实际状态理解；
- **FFmpeg 未找到**：把可执行文件加入 PATH，重启服务后再检查；
- **GPT-SoVITS/RVC 服务启动失败**：查看服务状态和启动错误，不要只重复点击启动。

## 下一步

回到[本地资源准备](/guide/resources)，或继续看[任务、文件与连接排查](/troubleshooting/tasks-connections)。
