# 语音、RVC 与 Live2D API

## 语音服务

| 前缀 | 用途 |
| --- | --- |
| `/api/voice` | 普通语音生成或资产操作 |
| `/api/voice/stream` | 实时语音状态与 WebSocket |
| `/api/tts` | TTS 与视频克隆相关接口 |
| `/api/voice-studio` | 原始音视频、片段和参考音频 |
| `/api`（voice assets） | 音色资产导入、合成和训练 |
| `/api/asr`、`/api/stt` | 语音识别资源和配置 |
| `/api/live2d` | Live2D 模型和表现 |

## Voice Studio

典型流程：

```text
POST /api/voice-studio/sessions
→ POST .../video 或 .../audio
→ POST .../separate
→ POST .../segments/select
→ POST .../reference/upload
→ POST .../complete
```

接口会返回会话、片段、参考音频等稳定标识。

## RVC

前缀 `/api/voice/rvc`，主要接口包括：

- 创建会话：`POST /sessions`；
- 添加来源或附件：`POST /sessions/{session_id}/source`、`.../attachment`；
- 提取、分离、裁剪：`POST .../extract`、`.../separate`、`.../trim`；
- 查询文件和波形：`GET .../files/{file_id}`、`.../waveform`；
- 转换：`POST /convert`；
- 查询/取消任务：`GET /tasks/{task_id}`、`DELETE /tasks/{task_id}`；
- 读取输出：`GET /output/{task_id}` 或 `GET .../output`；
- 混音：`POST /tasks/{task_id}/mix`。

转换通常异步返回任务 ID。音频结果使用文件或资产 ID，不把本地绝对路径传给浏览器。

## Live2D 与流式接口

Live2D 资源管理和实时语音相关接口需要本地模型或 WebSocket 客户端。WebSocket 断开时应处理重连和服务状态，不把连接断开当作任务完成。
