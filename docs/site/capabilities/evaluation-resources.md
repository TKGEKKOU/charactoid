# 评测与系统资源

**本页覆盖两件常被混在一起、其实分属不同控制面的事：评测数据集如何衡量知识和 Agent 输出；本机受管资源如何安装、探测和报错。对应代码在 `app/routers/eval.py`、`app/routers/eval_dataset.py`、`app/schemas_eval.py`、`rag/eval/`、`app/routers/resources.py`、`app/startup/resources.py`、`ingestion/status.py`。**

评测回答“这次检索或这次回答好不好”。资源页回答“这台机器能不能跑 ASR / Embedding / RVC”。两者都会出现“失败”，但失败含义不同，不能用同一个红叉解释。

## 评测模块做什么

评测把“题面、期望、实际输出、分数、失败样本”留成可导出记录。它不是在线 A/B 平台，而是给本机开发和调 RAG 用的闭环：

```text
准备数据集
  → 生成或同步候选题
  → 选择一次评测运行
  → 对每题执行检索 / 生成
  → 记录单题结果与汇总
  → 分析失败样本
  → 导出历史
```

典型用途：

- 知识库改切分或重排后，回归“还能不能问到”；
- 换 Embedding / Reranker 后，看引用是否仍指向同一批证据；
- Agent 改 Supervisor 提示词后，看是否更容易拒答或乱委派。

评测运行也应尽量走公开合同：题 ID、状态、输出摘要、错误码。不要把完整 Prompt 和密钥写进导出文件。

## 评测对象要写清楚

一次评测必须声明评的是哪一层，否则分数无法解释。

| 对象 | 你在衡量什么 | 常见失败 |
| --- | --- | --- |
| 检索 | 能否找到该找的片段 | 切分过碎、元数据丢了、集合不对 |
| 重排 | 前 K 是否把真正证据顶上去 | 模型未就绪、阈值过严 |
| 生成 | 能否根据证据组织回答并引用 | 模型胡编、拒答过度、引用丢失 |
| Agent | 能否选对 Worker、等待确认、回收结果 | 误委派、跳过 HITL、状态机卡死 |

不要用“对话看起来聪明一点”代替上述任何一层。看起来聪明可能只是模型在用自己的参数记忆，而不是你的知识库。

## 数据集与执行

`eval_dataset` 路由负责题集，`eval` 路由负责跑和读结果。实践上：

1. 题面要带期望引用或期望要点，而不是只有一句口语问题；
2. 执行时记录 `run_id` 或评测批次 ID，便于和普通对话 Run 区分；
3. 单题失败不要中断整批，除非资源根本没装；
4. 汇总至少包含：总数、成功、失败、跳过、平均耗时、缺证据比例。

如果评测依赖 Milvus 或 Embedding，先看资源页。评测失败时先问“是题错了，还是组件没起来”。

## 系统资源是另一条状态机

`app/routers/resources.py` 管理本机组件。Provider ID 有兼容别名：

```text
stt / local_stt     → asr
local_embedding     → embedding
local_rerank        → reranker
tts / gsv_tts_local → gpt_sovits
```

资源安装任务的活跃状态包括：`queued` `preparing` `downloading` `verifying` `installing` `running`。这些状态存在 `ProviderDownloadTask` 一类记录里，不是对话 Run。

接口需要本机来源：`require_local` + same-origin 请求头。浏览器随便打开别人的页面，不能替你安装模型。

## “安装成功”不是“可以执行”

GPT-SoVITS 在代码里被刻意拆成两截：

- 发行版/目录是否安装完整（`installed` / `installation_ready`）；
- API 服务是否活着（`service_running`）；
- 是否配置了外部安装（`configured` / `external_configured`）。

`ready` 需要安装完整且服务可探针。只复制了文件、服务没起来，资源页不应显示为可用。

同样的原则适用于：

| 资源 | 安装成功之后还要看 |
| --- | --- |
| FFmpeg | 二进制能跑、能被附件规范化调用 |
| ASR | worker 就绪、warmup 是否成功 |
| Embedding | 模型文件、设备、warmup |
| Reranker | 与 Embedding 类似 |
| Separator | 人声分离模型是否在位 |
| RVC | 模型、index、设备、任务队列 |
| GPT-SoVITS | 安装完整 + 服务探针 |

`app/startup/lifespan.py` 会在启动时恢复 embedding/reranker worker，并按需 warmup ASR 与 GPT-SoVITS。warmup 失败被吞掉是为了不阻断工作台启动；不阻断不等于已经可用。UI 必须再读一次 status。

## 资源状态怎么读

建议把资源页的状态理解成：

```text
未配置 → 未安装 → 安装中 → 已安装未就绪 → 运行中 → 可用
              ↘ 失败
```

“未配置”是用户还没选这项能力。“未安装”是决定用本地组件但文件不在。“已安装未就绪”是文件在但服务/设备/依赖不行。把这三格都显示成同一个灰点，用户会反复点安装。

`config_worker` 可以查询和发起受管资源操作，但它不执行变声、不训练音色、不检索知识。领域任务失败时，如果错误是缺资源，Supervisor 应提示去资源页，而不是假装 Worker 自己能装好。

## 评测与资源如何一起用

调 RAG 的最小闭环：

1. 资源页确认 Embedding / Reranker / 向量库可用；
2. 上传一小批带标准答案的文档；
3. 建评测集，题面指向这些文档里的事实；
4. 跑检索评测，看命中和引用；
5. 改切分或重排后再跑同一批题；
6. 只有检索稳定了，再评生成或 Agent 委派。

调语音的最小闭环：

1. 确认 FFmpeg、ASR、GPT-SoVITS 或 RVC 的探针；
2. 用最短音频走完规范化；
3. 再跑训练或转换；
4. 不要用评测集去“评”一次还没装好的 TTS。

## 导出与隐私

评测导出可以包含题面、输出摘要、引用 ID、分数。不要包含：

- 环境变量和 Token；
- 本机绝对路径；
- 完整系统提示词；
- 其他角色的记忆。

资源安装日志同样要避免把下载 URL 里的密钥打印到公开事件。

## 相关页面

- [知识库与记忆](/capabilities/knowledge-memory)
- [RAG 设计](/concepts/rag)
- [配置项](/reference/config)
- [资源、模型与设备](/troubleshooting/resources)
- [文件与任务运行时](/capabilities/files-runtime)
