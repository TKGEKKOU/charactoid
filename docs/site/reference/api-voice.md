# 语音、RVC 与 Live2D API

**语音不是一条 `/tts` 就结束的功能。** 仓库把听、说、训练、变声、实时流和形象发现拆成多组路由，再由 `voice_worker` / `rvc_worker` / `live2d_worker` 在对话任务里调用。本文按源码前缀列出当前接口，不把未实现的云端音色市场写进来。

> **事实依据**：`app/routers/voice.py`、`voice_stream.py`、`voice_rvc.py`、`voice_studio.py`、`voice_assets.py`、`tts.py`、`asr.py`、`live2d.py`。Worker 侧工具在 `agents/tools/voice.py`、`agents/tools/rvc.py`、`agents/tools/live2d.py`。

## 先分清五条链

| 链 | 用户感知 | HTTP/WS 前缀 | Worker |
| --- | --- | --- | --- |
| 听写 | 把录音变成字 | `POST /api/voice/transcriptions`，`/api/asr`，兼容 `/api/stt` | voice_worker |
| 实时听写 | 边说边出 partial | `GET /api/voice/stream/status`，`WS /api/voice/stream/ws` | voice_worker |
| 开口 | 角色把文本念出来 | `/api/tts/personas/{id}/conversations/{cid}/synthesize` | voice_worker |
| 训练与资产 | Voice Studio、GPT-SoVITS、绑定音色 | `/api/voice-studio`，`/api/voice-assets`，`/api/gpt-sovits` | voice_worker |
| 变声 | 音视频转音色的长任务 | `/api/voice/rvc`（兼容 `/api/providers/rvc`） | rvc_worker |
| 形象 | 发现模型、VTS、打开目录 | `/api/live2d` | live2d_worker |

对话里的“用这个角色的声音说话”走绑定音色 + TTS，**不走 RVC**。RVC 是文件型长任务，有自己的 session/task 状态机，超时默认 **1800 秒**。

## 本机与体积约束

- 上述绝大多数写接口会 `require_local`。
- `POST /api/voice/transcriptions` 还要求 `X-CHARACTOID-Request: web`。
- 音频上传上限：`MAX_AUDIO_BYTES = 10 * 1024 * 1024`，整包再加 64KB。超限 413。
- 接受的 MIME：`audio/wav`、`audio/x-wav`、`audio/webm`、`audio/ogg`、`audio/mpeg`、`audio/mp4`、`audio/m4a`、`audio/x-m4a`。扩展名可在 `application/octet-stream` 时回退。

ASR 失败时的 HTTP 分层（`voice.py`）：

- 配置问题 → 503 `ASR is not configured`
- 上游错误 → 502
- 空结果 → 422

## 听写

`POST /api/voice/transcriptions`

- 只接受 `multipart/form-data`，字段名 `file`。
- 内部用 `request.app.state.asr_provider_factory(Settings.load())`。
- 响应模型 `TranscriptionResponse`。

`/api/asr` 与兼容 `/api/stt`（同一套处理函数，两套前缀）：

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| GET | `/status` | ASR 是否可用 |
| PATCH | `/config` | 改本地 ASR 配置 |
| POST | `/install` | 安装模型/依赖 |
| DELETE | `/install` | 卸载 |
| DELETE | `/install/cancel` | 取消安装任务 |
| POST | `/model-directory` | 打开模型目录 |

## 实时流

`app/routers/voice_stream.py` 前缀 `/api/voice/stream`。

`GET /status` 返回：

```json
{
  "vad_provider": "...",
  "sample_rate": 16000,
  "format": "pcm_s16le",
  "partial_every_seconds": 1.2
}
```

`WS /ws` 只接受本机 host：`127.0.0.1` / `::1` / `localhost` / `testclient`，否则 close 1008。

连接后服务端先发：

```json
{ "type": "session.ready", "sample_rate": 16000, "format": "pcm_s16le", "vad": "..." }
```

二进制帧是 16-bit PCM little-endian。文本帧是命令 JSON。VAD 驱动 utterance 的开始/结束。硬限制：

- 整段流最多 90 秒缓冲
- 单句最多 30 秒
- 最短 partial 0.7 秒，之后约每 1.2 秒尝试 partial
- 语言写死 `Chinese`（`VOICE_LANGUAGE`）

识别工作进程来自 `websocket.app.state.asr_stream_client_factory()`。连不上时发送 `{"type":"error","code":"worker_unavailable",...}`。

## TTS

前缀 `/api/tts`：

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| GET | `/status` | TTS 引擎状态 |
| POST | `/personas/{persona_id}/conversations/{conversation_id}/synthesize` | 把该会话中的文本合成为音频资产 |
| POST | `.../synthesize/stream` | 流式合成 |

TTS 绑定的是**角色 + 会话**，不是全局默认喇叭。没有绑定音色时，资源页和 `/api/status` 应显示未就绪，而不是假装有声音。

## Voice Studio 与音色资产

Voice Studio 前缀 `/api/voice-studio`，面向“从视频/音频切出训练片段”：

| 方法 | 路径 |
| --- | --- |
| POST/GET | `/sessions` |
| GET/DELETE | `/sessions/{session_id}` |
| POST | `/sessions/{session_id}/video` |
| POST | `/sessions/{session_id}/audio` |
| POST | `/sessions/{session_id}/separate` |
| POST | `/sessions/{session_id}/segments/upload` |
| DELETE | `/sessions/{session_id}/segments/{segment_index}` |
| GET | `/sessions/{session_id}/segments/{segment_index}/audio` |
| GET | `/sessions/{session_id}/reference/audio` |
| POST | `/sessions/{session_id}/segments/select` |
| POST | `/sessions/{session_id}/reference/upload` |
| POST | `/sessions/{session_id}/complete` |
| GET | `/voices` |
| GET | `/voices/{voice_id}/audio` |
| DELETE | `/voices/{voice_id}` |

资产前缀写在 `voice_assets.py` 的 `/api` 下：

| 方法 | 路径 |
| --- | --- |
| GET/POST | `/voice-assets` |
| GET/PATCH/DELETE | `/voice-assets/{asset_id}` |
| POST | `/voice-assets/import` |
| POST | `/voice-assets/{asset_id}/synthesize` |
| POST | `/voice-assets/{asset_id}/train` |
| POST | `/voice-assets/train-from-studio` |
| GET/PATCH | `/gpt-sovits/status`，`/gpt-sovits/config` |
| POST | `/gpt-sovits/detect`，`/gpt-sovits/install`，`/gpt-sovits/service/start`，`/gpt-sovits/service/stop`，`/gpt-sovits/model-directory` |
| DELETE | `/gpt-sovits/install`，`/gpt-sovits/install/cancel` |

GPT-SoVITS 是可选外部引擎。没装时训练和绑定会 503，对话文本通道仍应可用。

## RVC

主前缀 `/api/voice/rvc`，兼容 `/api/providers/rvc`。这是会话 + 任务两段：

**会话**

| 方法 | 路径 |
| --- | --- |
| POST | `/sessions` |
| POST | `/sessions/{session_id}/source` |
| POST | `/sessions/{session_id}/attachment` |
| GET | `/sessions/{session_id}` |
| DELETE | `/sessions/{session_id}` |
| POST | `/sessions/{session_id}/extract` |
| POST | `/sessions/{session_id}/separate` |
| GET | `/sessions/{session_id}/files/{file_id}` |
| GET | `/sessions/{session_id}/files/{file_id}/waveform` |
| POST | `/sessions/{session_id}/files/{file_id}/trim` |

**模型与转换**

| 方法 | 路径 |
| --- | --- |
| GET | `/status` |
| GET | `/models` |
| GET | `/models/{model_id}/metadata` |
| POST | `/convert` |
| GET | `/tasks/{task_id}` |
| DELETE | `/tasks/{task_id}` |
| GET | `/output/{task_id}` |
| GET | `/tasks/{task_id}/files/{file_id}` |
| GET | `/tasks/{task_id}/files/{file_id}/waveform` |
| POST | `/tasks/{task_id}/files/{file_id}/trim` |
| POST | `/tasks/{task_id}/mix` |
| GET | `/tasks/{task_id}/output` |

FFmpeg 与安装类接口挂在资源兼容前缀上（`ffmpeg/status|detect|install` 等）。缺 FFmpeg 时 extract/separate 不会“卡死成成功”，任务状态应保持失败或等待。

`rvc_worker` 超时 1800 秒、重试 1 次，和知识检索不是一个数量级。前端必须按任务查询，而不是按一次 HTTP 的返回当作完成。

## Live2D

前缀 `/api/live2d`：

| 方法 | 路径 | 行为 |
| --- | --- | --- |
| GET | `/models` | 扫描 `data/live2d`，每目录一个模型；同目录优先 Cubism 4 `*.model3.json`，否则 Cubism 2 `*.model.json` |
| GET | `/vts` | 返回本地 VTube Studio 连接信息：host `127.0.0.1`，port `8001`，plugin `CHARACTOID`，protocol `VTubeStudioPublicAPI 1.0` |
| POST | `/model-directory` | 打开模型目录；要求 `X-CHARACTOID-Request: web` |

Cubism 4 会读 moc3 版本，高于内部 `MAX_MOC3_VERSION` 的标 `compatible: false`，避免前端加载后才爆。

静态资源另挂 `/live2d-assets`，不是这个 JSON API。

## 和 Agent 的交接

不要从浏览器直接拼一条“帮我训练音色”的开放 HTTP 调用就以为进了 Worker。对话任务里：

1. Supervisor 识别意图；
2. `voice_worker` 或 `rvc_worker` 拿到 `request` 字符串；
3. 工具函数创建 session / 绑定资产 / 查询状态；
4. Worker 输出合同里的 `artifacts` 带回 `asset_id` 或 `task_id`；
5. 监督者组织回复，音频仍通过消息或资产接口播放。

相关工具名可在 `GET /api/workers/manifests/voice_worker` 与 `.../rvc_worker` 看到。
