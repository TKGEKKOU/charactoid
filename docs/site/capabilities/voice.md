# 语音链路

**语音在 CHARACTOID 里是可选但完整的一条产品链：听、说、训练、变声、实时流。** 它绑定在角色上，而不是绑定在“系统默认喇叭”上。没装模型时，文本对话必须仍能用；装上之后，同一条任务才能开口或变声。

> **事实依据**：`app/routers/voice.py`、`voice_stream.py`、`tts.py`、`asr.py`、`voice_studio.py`、`voice_assets.py`、`voice_rvc.py`、`agents/tools/voice.py`、`agents/tools/rvc.py`、`agents/registry.py`（`voice_worker` 300s，`rvc_worker` 1800s）。

## 产品上要分开的三件事

1. **对话开口**：用角色已绑定的 GPT-SoVITS / TTS 音色，把即将说出的文本合成音频。走 `voice_worker` + `/api/tts/...`。
2. **听写**：麦克风或附件变成字，再进入同一条对话。走 `/api/voice/transcriptions` 或实时 `/api/voice/stream/ws`。
3. **RVC 变声**：对已有音视频做音色转换的长任务。走 `rvc_worker` + `/api/voice/rvc`。不要和“角色说话”混成一个按钮。

落地页工作台把“对话 / 人设 / 知识”绑在视频上，是为了展示角色对象；声音资源则在资源拼贴里。源码上也是：人设页绑定音色，对话页使用绑定，RVC 是独立管道。

## 听

同步听写：`POST /api/voice/transcriptions`。multipart 字段 `file`，10MB 上限，需要本机 + `X-CHARACTOID-Request: web`。失败时：

- 没配置 ASR → 503
- 上游错误 → 502
- 空识别 → 422

实时听写：浏览器推 `pcm_s16le` @ 16kHz 到 `WS /api/voice/stream/ws`。服务端用 VAD 切句，partial 大约每 1.2 秒，单句最多 30 秒，整段缓冲最多 90 秒。非本机连接直接 close 1008。

`GET /api/asr/status`（兼容 `/api/stt/status`）用来在资源页显示“听”是否就绪。安装/卸载/打开目录也在同一组路由。

## 说

`GET /api/tts/status` 看引擎。真正合成挂在角色和会话上：

- `POST /api/tts/personas/{persona_id}/conversations/{conversation_id}/synthesize`
- `POST .../synthesize/stream`

这意味着：没有角色、没有会话、没有绑定音色，就不该有“系统配音”。对话消息里的音频用 `/api/voice-messages/{message_id}/audio` 取回，转写用 `POST /api/voice-messages/{message_id}/transcribe`。

## 训练

Voice Studio 把视频/音频变成可训练片段：建 session → 上传 → 人声分离 → 选段 → 参考音频 → complete。资产再进入 `/api/voice-assets`：导入、合成、训练、`train-from-studio`。

GPT-SoVITS 是外部引擎，状态在 `/api/gpt-sovits/status`。detect / install / start / stop / model-directory 都是资源动作，应由 `config_worker` 或资源页触发，而不是让监督者在对话里直接改全局服务。

## 变声

RVC 是“会话准备材料 + 任务跑管道”：

1. 建 session，挂 source 或 attachment；
2. extract / separate / trim；
3. convert 产生 `task_id`；
4. 轮询 task，必要时 mix，最后取 output。

FFmpeg 是硬依赖。没有它，extract 不会成功。资源接口提供 ffmpeg 的 status/detect/install。

`rvc_worker` 超时 1800 秒。UI 必须按 `task_id` 恢复，刷新页面不能把任务当成丢失。

## 和 Live2D 的衔接

口型跟的是**正在播放的那路音频**，不是另造一条时间轴。Live2D 模型发现是 `GET /api/live2d/models`；VTS 连接是 `GET /api/live2d/vts`。形象 Worker 只负责接好模型和目录，不负责训练音色。

设计讨论见 [声音与 Live2D 设计](/concepts/voice-live2d)，接口清单见 [语音、RVC 与 Live2D API](/reference/api-voice)。


## `/api/voice` 同步听写边界

`app/routers/voice.py`：`MAX_AUDIO_BYTES = 10 * 1024 * 1024`（10MB）。

| 条件 | HTTP | `detail` |
| --- | ---: | --- |
| 空请求 | 422 | `Audio request is empty` |
| 空文件 | 422 | `Audio file is empty` |
| 超过 10MB | 413 | （过大） |
| 类型不支持 | 415 | |
| ASR 未配置 | 503 | |
| 无语音 | 422 | `No speech was recognized` |
| 上游失败 | 502 | |

空文件 422 只属于语音，不属于文档上传。

## 实时 WS

`WS /api/voice/stream/ws`：

- 非 `LOCAL_HOSTS`（`127.0.0.1` / `::1` / `localhost` / `testclient`）**先 close 1008 再 return**，不会 accept；
- ready 帧：`type: session.ready`，`sample_rate: 16000`，`format: pcm_s16le`，带 `vad`；
- `MAX_STREAM_SECONDS=90`，`MAX_UTTERANCE_SECONDS=30`；
- `PARTIAL_EVERY_SECONDS=1.2`，`MIN_PARTIAL_SECONDS=0.7`；
- 命令：`ping`/`pong`、`start`、`cancel`、`finish`；
- 错误码：`invalid_command` / `asr_unavailable` / `not_speaking` / `unknown_command`。

## RVC 路径

`app/routers/voice_rvc.py` 是会话管道，不是一次性 POST：

```text
sessions → source / attachment → extract → separate → convert → mix / output
```

另有 trim、waveform、models、tasks。FFmpeg 是 extract 的硬依赖。`rvc_worker` 超时 1800 秒；`voice_worker` 超时 300 秒。刷新页面要用 `task_id` 恢复，不要把长任务当成 TTS 失败。
