# Live2D 与外部接入

**本页说明表现层和渠道层如何订阅同一套运行结果。Live2D 代码在 `app/routers/live2d.py`、`agents/tools/live2d.py`、`live/` 以及前端对话页；外部接入在 `integrations/bilibili`、`integrations/onebot11`、`app/routers/integrations.py`、`app/routers/realtime.py`、`app/routers/voice_stream.py`。**

CHARACTOID 不把 Live2D 或机器人做成另一套 Agent。角色还是那个角色，Supervisor 还是那个出口，渠道和立绘只是把同一条事件链表现出去。

`integrations/qq_official/` 目前没有可引用的实现文件（目录里只有缓存），不要把“QQ 官方机器人”写成已接通的运行时能力。当前可操作的 IM 通道是 OneBot11 / NapCat。

## Live2D 在系统里的位置

Live2D 是表现层，不是编排层。它接收：

- 当前角色绑定的模型；
- 语音输出（TTS / GPT-SoVITS / 实时流）；
- 运行状态（说话中、等待确认、空闲）。

它不负责：

- 决定调用哪个 Worker；
- 读取任意本地路径；
- 修改角色人设或知识库。

因此落地页和开发者文档都把 Live2D 写成“和对话走在同一条链路上”，而不是“一个独立的桌宠引擎”。

## 模型发现

`app/routers/live2d.py` 扫描 `data/live2d/`（`Settings.project_root / "data" / "live2d"`）。规则很具体：

- 每个**子目录**视为一个模型；根目录散落的 json 不会被收；
- 优先 Cubism 4 的 `*.model3.json`，否则 Cubism 2 的 `*.model.json`；同目录两者都有时只取 Cubism 4 的第一份（按文件名排序）；
- 读取 `.moc3` 头 5 字节：`MOC3` + version；
- `MAX_MOC3_VERSION = 6`，更高版本 `compatible=false`，避免运行时崩在未知格式；
- Cubism 2 没有 moc 版本，`moc_version` 为 `null`，`compatible` 为 true。

清单条目：

```json
{
  "id": "folder-name",
  "name": "folder-name",
  "entry": "folder-name/xxx.model3.json",
  "kind": "cubism4",
  "moc_version": 5,
  "compatible": true
}
```

`entry` 是相对 `data/live2d/` 的路径，给前端拼 `/live2d-assets/{entry}`。`mount_static_files` 会 `mkdir` 这个目录并挂到 `/live2d-assets`。JSON 里不出现磁盘绝对路径。

接口：

| 方法 | 路径 | 作用 | 约束 |
| --- | --- | --- | --- |
| GET | `/api/live2d/models` | `{"models": discover_models(...)}` | `require_local` |
| GET | `/api/live2d/vts` | VTube Studio 连接参数 | `require_local` |
| POST | `/api/live2d/model-directory` | 打开本机模型目录 | `require_local` + `X-Charactoid-Request: web` |

打开目录缺头时 403 `Missing same-origin request header`。成功返回 `{"opened_directory": ...}`，内部走 `voice.resource_directory.open_resource_directory`，并 `LIVE2D_ROOT.mkdir(parents=True, exist_ok=True)`。

VTS 默认（写死在路由常量里，不是设置项）：

```text
url:  ws://127.0.0.1:8001
host: 127.0.0.1
port: 8001
plugin_name: CHARACTOID
protocol: VTubeStudioPublicAPI 1.0
```

这是本机回环连接，不是公网推流地址。要把立绘送进直播软件，仍然由用户在 OBS / 直播姬里采集 VTS 或浏览器窗口。

## live2d_worker

`agents/registry.py` 里 `live2d_worker` 的职责是：统一管理模型、VTS 连接和本地模型目录。超时 **45 秒**，默认不重试。兼容别名 `live2d`。

工具层 `agents/tools/live2d.py` 只包装已经存在的能力，不虚构动作、表情或远程控制 API：

| 工具 | 作用 | 返回要点 |
| --- | --- | --- |
| `list_live2d_models` | 扫描并返回兼容性 | `status/ok`、`root`、`models` |
| `get_live2d_vts_config` | 返回与 HTTP 相同的 VTS 常量 | `url/host/port/plugin_name/protocol` |
| `open_live2d_model_directory` | 打开本地目录 | `opened_directory` |

打开目录是本机操作，必须受 `require_local` 和确认策略约束，不能让远程渠道间接触发。Worker 的输出应是结构化清单和状态，而不是一段“已经帮你打开了文件夹”的散文。Supervisor 再决定怎么对用户说。

## 口型与动作

语音输出驱动口型，这是产品承诺，也是实现边界：

1. 对话页或全屏页挂上同一套模型；
2. TTS / 实时语音产生音频；
3. 前端结合音素或音频能量更新口型参数；
4. 运行状态可以触发短动作，但不要用动作去“表演”内部错误栈。

落地页的 Live2D 拟合参数（resource / workbench / live 的 scale、x、y）属于展示站，不在本仓库运行时里修改。开发者文档只描述产品侧绑定和 API，不把展示站的调试值写进运行时默认值。

## 实时 WebSocket

`GET` 不是这条通道。对话实时入口是：

```text
/ws/personas/{persona_id}/conversations/{conversation_id}
```

`conversation_id` 长度 1–255。接受连接后立刻用 `context_for` 校验角色。404 → 发送 `error` / `persona_not_found`，`close 1008`。成功则 `session.ready`。

客户端事件（`realtime/protocol.py`，`extra=forbid`，按 `type` 判别）：

| type | 字段 |
| --- | --- |
| `text.submit` | `question` 1–2000；`attachment_ids` 最多 32 |
| `generation.cancel` | 无额外字段 |
| `confirmation.respond` | `approved` 可空；`specialist` 默认 `management`（`conversation\|web\|memory\|management`）；可选 `worker` / `task_id` / `attachment_ids` / `input_values` |
| `session.ping` | 无额外字段 |

执行键仍是 `persona_id:conversation_id`。`text.submit` 会 `try_persist_text_message`。同一会话里 `TurnInProgressError` 时不要并行再丢一句。

## 外部接入总表

配置文件：`data/integrations.json`。Router 前缀 `/api/integrations`，全部 `require_local`。

| 接入 | 目录 | 作用 | 主要边界 |
| --- | --- | --- | --- |
| B站直播 | `integrations/bilibili` | 直播间事件、弹幕、可能的语音回复 | 需要 cookie、房间号、连接生命周期 |
| OneBot11 | `integrations/onebot11` | 机器人消息收发 | 需要 OneBot 服务、Token、事件映射 |
| VTube Studio | Live2D 路由 / 工具 | 把表现接到 VTuber 工作流 | 本机 8001 端口，用户自己采集 |
| WebSocket 实时 | `realtime` / `voice_stream` | 语音流、运行事件 | 断线重连，不保存密钥到日志 |
| MCP | `integrations/mcp` | 外部工具服务器 | 见扩展页，默认不可信 |

所有渠道进入系统后，都应变成“某角色的一条消息或事件”，再走 `PersonaAgentService`。不要为 B 站单独写一套 Prompt 拼接，也不要让 OneBot 直接调用 RVC 工具。

## B站

默认字段（`BILIBILI_DEFAULTS`）：`room_id`、`default_persona_id`、`danmaku_enabled=true`、`enter_enabled=true`、`auto_voice=true`、`cookie=""`。

| 方法 | 路径 |
| --- | --- |
| GET | `/api/integrations` （同时带 onebot11 + bilibili） |
| GET | `/bilibili` |
| PUT | `/bilibili/config` |
| POST | `/bilibili/connect` `/disconnect` `/pause` `/resume` |
| POST | `/bilibili/queue/clear` `/session/clear` |
| WS | `/bilibili/events/ws` |

`PUT /bilibili/config` 用 `BilibiliConfigUpdate` 的 `exclude_unset`。`cookie` 为 `None` 或 `""` 时**不会覆盖**已保存的 cookie。改完调用 `manager.config_changed(current)`。

## OneBot11 / NapCat

默认字段（`ONEBOT_DEFAULTS`）：

| 字段 | 默认 | 合法值 |
| --- | --- | --- |
| `enabled` | false | |
| `access_token` | `""` | 响应里只暴露 `access_token_configured` |
| `group_trigger` | `at` | `at` / `prefix`，其它回退 `at` |
| `prefix` | `""` | |
| `default_persona_id` | `""` | |
| `auto_reply_enabled` | false | |
| `reply_mode` | `text` | `text` / `text_voice` / `voice_only`；非法时由 `voice_only` / `auto_voice_reply` 回推 |
| `spontaneous_reply_probability` | 0.05 | |
| `authorized_group_ids` | `[]` | |

WebSocket 路径写在状态里：`ws_path: /api/onebot/ws`（`integrations.onebot11.ws_server`）。

| 方法 | 路径 | 失败 |
| --- | --- | --- |
| GET/PUT | `/onebot11` | |
| PUT | `/onebot11/observation` | |
| GET | `/onebot11/targets` | 未连接时 `available=false`，friends/groups 空数组，不抛 409 |
| POST | `/onebot11/test` | 未连接 409 `NapCat 尚未建立 WebSocket 连接`；上游 RuntimeError 502 |
| POST | `/onebot11/disconnect` | 把 `enabled=false` 写回 json 再 `config_changed` |
| POST | `/onebot11/conversation/clear` | 清 IM 窗口数据 + checkpoint |
| POST | `/onebot11/recent/clear` | 只清管理器里的 recent_messages |
| DELETE | `/onebot11/token` | 把 access_token 写成空串 |
| POST | `/napcat/send` | 未连接 409；既没有 text 也没有 record_path → 422 `至少提供文字或语音文件`；要现合成却没绑 GPT-SoVITS 音色 → 409；发送 RuntimeError → 502 |

`/napcat/send` 在 `voice=true` 且有 `text` + `persona_id`、没有现成 `record_path` 时，会 `persona_voice_asset` + `tts_synthesis.synthesize`，把 wav 写到 `AUDIO_ROOT/napcat/{uuid}.wav` 再 `send_record`。

## 事件优先于页面耦合

外部集成不应读取前端组件内部状态。正确依赖是：

```text
渠道消息
  → FastAPI / WebSocket
  → 角色 Agent
  → Supervisor / Worker
  → Runtime 事件与资产
  → 前端、Live2D、机器人、直播 同时订阅
```

这样同一条任务可以同时：

- 在 Web 对话里显示引用；
- 驱动 Live2D 口型；
- 把简短结果打回直播间或群聊。

如果某个渠道需要确认，仍然回到 `waiting_approval`。直播弹幕不能自动点掉“训练音色”这种不可逆确认。

## 连接生命周期

渠道连接是资源，不是设置页上的一个勾。至少要处理：

- 未配置：缺房间、缺 Token；
- 已配置未连接；
- 连接中 / 已连接；
- 断线重试；
- 主动断开；
- 鉴权失败。

`app/startup/lifespan.py` 的 `_shutdown` 顺序是：

1. `await app.state.bilibili.disconnect()`；
2. 取消 `mcp_connect_task`，再 `mcp_manager.close()`；
3. `begin_embedding_shutdown` / `begin_reranker_shutdown`，等待 warmup task；
4. 取消 STT / GPT-SoVITS warmup，`gpt_sovits.stop_service()`；
5. `shutdown_asr_workers`；
6. `clear_retriever_cache` + `close_milvus_connections`；
7. 关闭 checkpoint resource。

新增渠道时，必须在 shutdown 里留下对称的清理，否则桌面退出后还会占端口或子进程。

## 安全与本地边界

- 集成管理接口走 `require_local` 或同等本机校验；
- Token / cookie 只存在本地设置，不进公开事件；GET OneBot 状态只给 `access_token_configured`；
- 渠道用户不等于工作台用户：群友没有安装模型和删知识库的权限；
- 角色策略仍然有效：没启用 live2d 或 integrations 的角色，不会因为渠道连上了就突然开口播报内部状态；
- CORS `allow_origins=["*"]` 不管这些本机接口。

## 开发检查表

1. 模型清单是否只暴露相对入口和兼容标记；
2. 口型是否订阅语音输出，而不是假动画循环；
3. 渠道消息是否进入同一套 Agent，而不是旁路；
4. 不可逆操作是否仍要工作台确认；
5. shutdown 是否断开连接；
6. 打开模型目录是否带 `X-Charactoid-Request: web`；
7. 文档、API 和排查页是否同步。

## 相关页面

- [声音与 Live2D 设计](/concepts/voice-live2d)
- [语音链路](/capabilities/voice)
- [扩展与外部集成 API](/reference/api-integrations)
- [语音、RVC 与 Live2D API](/reference/api-voice)
- [任务、文件与连接](/troubleshooting/tasks-connections)
