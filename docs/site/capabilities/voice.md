# 语音链路

**语音在 CHARACTOID 里是可选但完整的一条产品链：听、说、训练、变声、实时流。** 它绑定在角色上，而不是绑定在“系统默认喇叭”上。没装模型时，文本对话必须仍能用；装上之后，同一条任务才能开口或变声。

> **事实依据**：`app/routers/voice.py`、`voice_stream.py`、`tts.py`、`asr.py`、`voice_studio.py`、`voice_assets.py`、`voice_rvc.py`、`agents/tools/voice.py`、`agents/tools/rvc.py`、`agents/graph/build.py`（RVC 禁止意图直达）、`agents/graph/supervisor.py`（RVC/voice action 与 wait boundary）、`agents/registry.py`（`voice_worker` 300s，`rvc_worker` 1800s）。

## 产品上要分开的三件事

1. **对话开口**：角色已绑定的 GPT-SoVITS / TTS。走 `voice_worker` + `/api/tts/...`。
2. **听写**：麦克风或附件变成字，再进入同一条对话。走 `POST /api/voice/transcriptions` 或 `WS /api/voice/stream/ws`。
3. **RVC 变声**：对已有音视频做音色转换的长任务。走 `rvc_worker` + `/api/voice/rvc`。不要和“角色说话”混成一个按钮。

图上的硬约束：

- 意图漏斗即使认出 RVC，`_intent_route` 也打回 `persona_supervisor`。必须 handoff。
- `voice_worker` / `rvc_worker` 非 `completed` 走 `rvc_wait_boundary` → END，避免 Core 幻觉成功。
- action 只能是闭合集合，写进 `options`，不从自由文本猜。

RVC 合法 action：`prepare_and_separate` `separate_vocals` `session_status` `convert` `cancel`。

voice 合法 action：`analyze` `session_status` `confirm_segments` `save_voice` `upload_segments` `synthesize` `transcribe` `bind` `train` `cancel`。

## 听：同步转写

`app/routers/voice.py` 前缀 `/api/voice`。`POST /transcriptions`。

| 常量 | 值 |
| --- | --- |
| `MAX_AUDIO_BYTES` | 10 * 1024 * 1024（10MB） |
| `MAX_REQUEST_BYTES` | 音频上限 + 64KB（multipart 余量） |

支持 MIME：`audio/wav` `audio/x-wav` `audio/webm` `audio/ogg` `audio/mpeg` `audio/mp4` `audio/m4a` `audio/x-m4a`。`application/octet-stream` 或空类型时按扩展名猜：`.wav .webm .ogg .mp3 .mp4 .m4a`。

需要本机 + OpenAPI 标明必填头 `X-CHARACTOID-Request: web`。

| 条件 | HTTP | `detail` |
| --- | ---: | --- |
| Content-Length 非法 | 400 | `Invalid Content-Length` |
| 声明或实际过大 | 413 | `Audio request is too large` |
| 空 body | 422 | `Audio request is empty` |
| 空文件 | 422 | `Audio file is empty` |
| 类型不支持 | 415 | |
| ASR 未配置 | 503 | |
| 无语音 | 422 | `No speech was recognized` |
| 上游失败 | 502 | |

空文件 422 只属于语音，不属于文档上传。`GET /api/asr/status`（兼容 `/api/stt/status`）给资源页显示“听”是否就绪。

## 听：实时 WS

`app/routers/voice_stream.py` 前缀 `/api/voice/stream`。`WS /ws`。

| 常量 | 值 |
| --- | --- |
| `SAMPLE_RATE` | 16000 |
| `VOICE_LANGUAGE` | `Chinese` |
| `MAX_STREAM_SECONDS` | 90 |
| `MAX_UTTERANCE_SECONDS` | 30 |
| `MIN_PARTIAL_SECONDS` | 0.7 |
| `PARTIAL_EVERY_SECONDS` | 1.2 |
| `LOCAL_HOSTS` | `127.0.0.1` `::1` `localhost` `testclient` |

非本机 **先 close 1008 再 return**，不会 accept。ready 帧：`type: session.ready`，`sample_rate: 16000`，`format: pcm_s16le`，带 `vad`。命令：`ping`/`pong`、`start`、`cancel`、`finish`。错误码：`invalid_command` / `asr_unavailable` / `not_speaking` / `unknown_command`。

## 说：TTS 必须挂在角色会话上

`app/routers/tts.py` 前缀 `/api/tts`：

| 路径 | 作用 |
| --- | --- |
| `GET /status` | 引擎是否就绪 |
| `POST /personas/{persona_id}/conversations/{conversation_id}/synthesize` | 一次性合成 |
| `POST .../synthesize/stream` | 流式合成 |
| `WS .../synthesize/ws` | WebSocket 合成 |

没有角色、没有会话、没有绑定音色，就不该有“系统配音”。对话消息音频：`GET /api/voice-messages/{message_id}/audio`；转写：`POST /api/voice-messages/{message_id}/transcribe`。

## 训练：Voice Studio → VoiceAsset → GPT-SoVITS

Studio 前缀 `/api/voice-studio`。`MAX_VIDEO_BYTES = 400 * 1024 * 1024`（400MB）。步进管道：

```text
POST /sessions
→ POST .../video 或 .../audio   (202)
→ POST .../separate             (202)
→ 选段 / 上传片段 / 参考音频
→ POST .../complete
→ /api/voice-assets 训练或绑定
```

| 路径 | 作用 |
| --- | --- |
| `POST /sessions` | 201 建草稿 |
| `GET /sessions` `GET /sessions/{id}` `DELETE /sessions/{id}` | 列表/详情/删除 |
| `POST .../video` `POST .../audio` | 202 上传素材 |
| `POST .../separate` | 202 人声分离 |
| `POST .../segments/upload` `DELETE .../segments/{i}` | 片段 |
| `GET .../segments/{i}/audio` `GET .../reference/audio` | 取音频 |
| `POST .../segments/select` | 选段 |
| `POST .../reference/upload` | 参考音频 |
| `POST .../complete` | 完成草稿 |
| `GET /voices` `GET /voices/{id}/audio` `DELETE /voices/{id}` | 成品音色 |

`/api/voice-assets`（`voice_assets.py`，router 前缀 `/api`）：

| 路径 | 作用 |
| --- | --- |
| `GET/POST /voice-assets` | 列表 / 201 创建 |
| `GET/PATCH/DELETE /voice-assets/{asset_id}` | 读写删 |
| `POST /voice-assets/import` | 导入 |
| `POST /voice-assets/{id}/synthesize` | 用该资产合成 |
| `POST /voice-assets/{id}/train` | 训练 |
| `POST /voice-assets/train-from-studio` | Studio 成品开训 |

GPT-SoVITS 是外部引擎，同文件：`GET /gpt-sovits/status`、`PATCH /gpt-sovits/config`、detect / install / cancel / uninstall、`service/start|stop`、`model-directory`。这些是资源动作，应由 `config_worker` 或资源页触发，而不是让监督者在对话里直接改全局服务。

## 变声：`/api/voice/rvc`

`voice_rvc.py` 前缀 `/api/voice/rvc`。另有 `provider_router` `/api/providers/rvc` 和 ffmpeg 资源 `/api/providers/resources/ffmpeg/status`。FFmpeg 是 extract 的硬依赖。

会话管道：

```text
POST /sessions                         201
POST /sessions/{id}/source|attachment  202
POST /sessions/{id}/extract            202
POST /sessions/{id}/separate           202
GET  /sessions/{id}
POST /convert                          202 → task_id
GET  /tasks/{task_id}
DELETE /tasks/{task_id}                202 取消
POST /tasks/{task_id}/mix              202
GET  /output/{task_id} 与 /tasks/{id}/output
```

文件级：waveform、trim、按 `file_id` 取回。模型：`GET /models`、`GET /models/{id}/metadata`、`GET /status`。

`rvc_worker` 超时 **1800s**，不重试。UI 必须按 `task_id` 恢复。刷新页面不能把任务当成丢失，也不能当成 TTS 失败。

dispatch 阶段只收集启动 session 的源文件。模型、Index、转换参数是 Worker 业务状态，handoff 之后再问。convert 必须有 `session_id` 或输入文件引用；cancel 必须有 `task_id` 或 `session_id`。

## 和 Live2D 的衔接

口型跟的是**正在播放的那路音频**，不是另造一条时间轴。模型发现 `GET /api/live2d/models`；VTS `GET /api/live2d/vts`。`live2d_worker` 接模型和目录，不负责训练音色。

## 相关

[声音与 Live2D 设计](/concepts/voice-live2d) · [语音、RVC 与 Live2D API](/reference/api-voice) · [Agent 与 Worker](/development/agent-worker) · [对话与任务](/guide/conversation)
