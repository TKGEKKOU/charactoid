# Live2D 与外部接入

**本页说明表现层和渠道层如何订阅同一套运行结果。Live2D 代码在 `app/routers/live2d.py`、`agents/tools/live2d.py`、`live/` 以及前端对话页；外部接入在 `integrations/bilibili`、`integrations/onebot11`、`integrations/qq_official`、`app/routers/integrations.py`、`app/routers/realtime.py`、`app/routers/voice_stream.py`。**

CHARACTOID 不把 Live2D 或机器人做成另一套 Agent。角色还是那个角色，Supervisor 还是那个出口，渠道和立绘只是把同一条事件链表现出去。

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

`app/routers/live2d.py` 扫描 `data/live2d/`。规则很具体：

- 每个子目录视为一个模型；
- 优先 Cubism 4 的 `*.model3.json`，否则 Cubism 2 的 `*.model.json`；
- 读取 `.moc3` 头 5 字节，`MOC3` + version；
- `MAX_MOC3_VERSION = 6`，更高版本标为不兼容，避免运行时崩在未知格式。

接口：

| 方法 | 路径 | 作用 |
| --- | --- | --- |
| GET | `/api/live2d/models` | 列出本机模型清单 |
| GET | `/api/live2d/vts` | 返回 VTube Studio 连接参数 |

两个接口都走 `require_local`。模型文件通过 `/live2d-assets` 静态挂载提供给前端，不把磁盘绝对路径写进 JSON。

VTS 默认：

```text
url:  ws://127.0.0.1:8001
plugin_name: CHARACTOID
protocol: VTubeStudioPublicAPI 1.0
```

这是本机回环连接，不是公网推流地址。要把立绘送进直播软件，仍然由用户在 OBS / 直播姬里采集 VTS 或浏览器窗口。

## live2d_worker

`agents/registry.py` 里 `live2d_worker` 的职责是：统一管理模型、VTS 连接和本地模型目录。超时 45 秒，默认不重试。

工具层 `agents/tools/live2d.py` 提供清单、VTS 配置和打开模型目录。打开目录是本机操作，必须受 `require_local` 和确认策略约束，不能让远程渠道间接触发。

Worker 的输出应是结构化清单和状态，而不是一段“已经帮你打开了文件夹”的散文。Supervisor 再决定怎么对用户说。

## 口型与动作

语音输出驱动口型，这是产品承诺，也是实现边界：

1. 对话页或全屏页挂上同一套模型；
2. TTS / 实时语音产生音频；
3. 前端结合音素或音频能量更新口型参数；
4. 运行状态可以触发短动作，但不要用动作去“表演”内部错误栈。

落地页的 Live2D 拟合参数（resource / workbench / live 的 scale、x、y）属于展示站，不在本仓库运行时里修改。开发者文档只描述产品侧绑定和 API，不把展示站的调试值写进运行时默认值。

## 外部接入总表

| 接入 | 目录 | 作用 | 主要边界 |
| --- | --- | --- | --- |
| B站直播 | `integrations/bilibili` | 直播间事件、弹幕、可能的语音回复 | 需要登录态、房间号、连接生命周期 |
| OneBot11 | `integrations/onebot11` | 机器人消息收发 | 需要 OneBot 服务、Token、事件映射 |
| QQ 官方 | `integrations/qq_official` | 官方机器人通道 | 需要应用凭证和回调配置 |
| VTube Studio | Live2D 路由 / 工具 | 把表现接到 VTuber 工作流 | 本机 8001 端口，用户自己采集 |
| WebSocket 实时 | `realtime` / `voice_stream` | 语音流、运行事件 | 断线重连，不保存密钥到日志 |
| MCP | `integrations/mcp` | 外部工具服务器 | 见扩展页，默认不可信 |

所有渠道进入系统后，都应变成“某角色的一条消息或事件”，再走 `PersonaAgentService`。不要为 B 站单独写一套 Prompt 拼接，也不要让 OneBot 直接调用 RVC 工具。

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

`app/startup/lifespan.py` 在关闭时会 `await app.state.bilibili.disconnect()`，并取消 MCP 连接任务。新增渠道时，必须在 shutdown 里留下对称的清理，否则桌面退出后还会占端口或子进程。

## 安全与本地边界

- 集成管理接口走 `require_local` 或同等本机校验；
- Token 只存在本地设置，不进公开事件；
- 渠道用户不等于工作台用户：群友没有安装模型和删知识库的权限；
- 角色策略仍然有效：没启用 live2d 或 integrations 的角色，不会因为渠道连上了就突然开口播报内部状态。

## 开发检查表

1. 模型清单是否只暴露相对入口和兼容标记；
2. 口型是否订阅语音输出，而不是假动画循环；
3. 渠道消息是否进入同一套 Agent，而不是旁路；
4. 不可逆操作是否仍要工作台确认；
5. shutdown 是否断开连接；
6. 文档、API 和排查页是否同步。

## 相关页面

- [声音与 Live2D 设计](/concepts/voice-live2d)
- [语音链路](/capabilities/voice)
- [扩展与外部集成 API](/reference/api-integrations)
- [语音、RVC 与 Live2D API](/reference/api-voice)
- [任务、文件与连接](/troubleshooting/tasks-connections)
