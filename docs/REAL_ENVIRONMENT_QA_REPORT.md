# CHARACTOID 真实环境检查与修正报告

> 本报告基于 `E:\tmp\charactoid` 这份由 npm 准备出的本地运行目录、当前运行服务、只读 API 探测、SQLite 状态、前端源码检查以及已提供的页面截图整理。此轮没有新增安装、删除、取消任务或修改业务代码；正在进行中的既有任务也没有被主动停止。

## 1. 结论摘要

当前项目已经具备可运行的本地闭环，但“资源状态语义、任务进度、前端刷新、敏感配置保护和 npm 启动体验”还没有统一到可以让普通用户稳定理解的程度。

最重要的结论：

1. **基础服务正常**：健康检查通过，SQLite 与 Milvus Lite 可用，Web UI、Swagger 和 OpenAPI 可访问。
2. **LLM 配置已经生效**：当前使用的是远程自定义 API，不是本地大语言模型。
3. **角色与知识写入已有实际数据**：当前有 1 个角色、1 个知识空间、1 个文档任务，向量集合中有 5 个向量。
4. **人声分离已就绪**：HT-Demucs 模型已存在并被状态接口识别。
5. **RVC 基础运行时已就绪，但当前使用 CPU**：RVC 状态为 ready，检测到 1 个 `.pth` 音色模型；系统虽然有 NVIDIA GPU，但 RVC 当前是 CPU 版 PyTorch。
6. **ASR 没有就绪**：安装任务仍停留在 `preparing/runtime`，没有可见进度；专用状态接口与总览状态还存在不一致。
7. **本地 Embedding 与 Reranker 不能按“已启用”展示**：当前 Embedding 是远程 custom API，`installed=false`；本地 Reranker `ready=false`、`installed=false`。
8. **RAG 测评没有形成完整终态**：数据库中有一条 `running` 记录，用户看到的结果为 3/5，但当前记录的 `metrics` 为空、`cases` 为空、没有完成时间。
9. **供应商页面闪烁的根因基本明确**：后台刷新时清空整个卡片网格并重新构建，保存配置也会触发完整重绘。
10. **npm 启动器目前不能安全地发现任意位置的已有项目**：只搜索显式目录、当前目录、父级目录和少数固定用户目录，不搜索当前目录下的项目子目录，也没有持久化的项目索引。
11. **浏览器打开时机确实过早**：启动器先打开浏览器，再启动 Python 服务；因此会短暂出现“无法连接”。
12. **当前最大安全问题是配置读取接口返回了明文 API Key**：本报告不输出任何密钥，也没有保存密钥内容；已配置的密钥应立即轮换。

---

## 2. 检查范围与环境

### 2.1 检查对象

```text
E:\tmp\charactoid
```

该目录是 npm 包准备出的运行时目录，不是 Git 仓库；执行 `git status` 会得到 `fatal: not a git repository`。因此本报告不能用该目录的 Git diff 判断 npm 包与源码之间的差异。

主要检查目录：

```text
app/routers
app/startup
agents
rag
ingestion
voice
runtime
integrations
static/js
```

### 2.2 运行时

```text
系统：Windows 11
Python：3.11.9
GPU：NVIDIA GeForce RTX 5060 Laptop GPU
显存：8 GB
CHARACTOID Web：127.0.0.1:18000
SQLite：data/charactoid.db
Milvus Lite：./data/milvus_local.db
```

当前 18000 端口的监听进程为 `C:\Python311\python.exe -B main.py`。同时发现另一个使用 `E:\tmp\charactoid\.venv` 的 `main.py` 进程，但它不是 18000 端口的监听者。因此，后续验收必须先明确“当前端口对应哪一个运行时”，否则容易把不同进程的结果混在一起。

### 2.3 主要配置（已脱敏）

```text
LLM provider：custom
LLM base URL：智谱兼容地址
LLM model：glm-5.3-flash
Embedding provider：custom
Embedding model：text-embedding-v3
Embedding dimensions：512
Embedding device：auto
联网搜索：关闭
```

这里的 `custom` 表示通过兼容 API 调用远程服务。不能把它展示成“本地 Embedding”或“本地模型已安装”。

---

## 3. 运行基础检查

| 检查项 | 结果 | 证据 | 结论 |
|---|---|---|---|
| Web 健康检查 | 通过 | `GET /api/health` 返回 200，`status=ok` | 基础服务可访问 |
| 系统状态 | 通过 | `GET /api/status` 返回 SQLite/Milvus 状态 | 主进程可读取运行状态 |
| Web UI | 通过 | `GET /static/index.html` 返回 200 | 静态页面能打开 |
| Swagger UI | 通过 | `GET /docs` 返回 200 | API 文档入口可访问 |
| OpenAPI | 通过 | `GET /openapi.json` 返回 200 | 当前生成 215 个路径、254 个操作 |
| SQLite | 通过 | 状态接口为 `ok`，数据库文件存在 | 控制面可用 |
| Milvus Lite | 通过 | 状态接口为 `ok`，集合存在 | 向量数据面可用 |
| Live2D 模型发现 | 通过 | `/api/live2d/models` 发现 `miku` | 模型发现链路正常 |

### 3.1 数据库当前状态

```text
SQLite 表数量：25
角色：1
知识空间：1
文档任务：1
向量：5
Agent 运行记录：7
Agent 运行事件：67
恢复检查点：12
资源下载任务：2
评测运行记录：1
声音资产：0
对话消息：0
```

这说明角色和知识索引确实写入了数据库与向量库；但当前没有可用于验证“完整对话消息 → 音频资产 → Live2D 输出”的历史成功记录。

---

## 4. 已确认正常的功能

### 4.1 LLM 配置

**事实**：系统状态显示 `custom` provider、智谱兼容 Base URL 和 `glm-5.3-flash`；供应商列表中对应 provider 为已配置、已启用。

**结论**：用户测试的 LLM API 配置已经被运行时读取。

**边界**：本轮没有再次发送真实对话请求，因此“配置被读取”已确认，“持续多轮流式对话、超时、重试和断线恢复”尚未完成运行时验收。

### 4.2 角色与知识写入

**事实**：当前有 1 个 ready 角色、1 个知识空间、1 个已完成的文档索引任务、5 个向量。

**结论**：从文档上传/处理/索引到向量写入，至少有一条成功记录。

**边界**：当前 `rag_query_records=0`，本轮没有用真实查询验证检索片段、引用、置信度和纠错路径；因此不能仅根据向量数量断言 RAG 回答质量。

### 4.3 人声分离

**事实**：`/api/tts/separator/status` 返回 `installed=true`、`ready=true`、`phase=complete`，模型文件存在。

**结论**：用户反馈“人声分离模型快速下载成功”与当前状态一致；对话中分离出人声和背景声也有用户实际验证支持。

### 4.4 FFmpeg

**事实**：FFmpeg 状态接口返回受管 FFmpeg 已安装且 ready，路径位于 `runtime/ffmpeg`。

**解释**：项目使用 `imageio-ffmpeg` 按需准备受管可执行文件，用户第一次点击下载或第一次触发视频抽音频时才识别到，并不一定代表下载按钮失效。

**体验问题**：界面没有清楚区分：

```text
系统 PATH 中已发现
CHARACTOID 受管版本已安装
本次任务按需下载完成
```

因此用户会感觉“点击下载后才突然识别”。

### 4.5 Live2D 模型发现

**事实**：`/api/live2d/models` 发现 `miku/miku.model3.json`，类型为 Cubism 4，兼容性为 true。

**结论**：资源扫描与模型入口正常。

**边界**：没有执行对话页实时口型、音频事件、VTube Studio 和全屏沉浸式模式的完整运行验证。

---

## 5. 阻塞问题与高优先级问题

## QA-01：配置读取接口返回明文 API Key

**优先级：P0，必须优先修复**

### 现象

无特殊请求头访问 `GET /api/settings` 时仍返回 200，并包含完整的 LLM 与 Embedding API Key。供应商列表响应也包含已配置 provider 的 `current_api_key`。

### 证据

```text
GET /api/settings → 200
GET /api/providers/list → 200
```

响应字段包括：

```text
openai_api_key
embedding_api_key
current_api_key
```

本报告没有保存或重复输出密钥内容。

### 影响

即使应用只监听 `127.0.0.1`，本机其他网页、浏览器扩展、恶意本地进程或未来错误的局域网绑定，都可能读取凭据。若未来部署到非本机地址，风险会直接扩大。

### 根因判断

**已确认事实**：后端响应模型将密钥原值返回给前端，且 `/api/settings` 未表现出与资源接口一致的请求头保护。

### 修正建议

1. 立即轮换本次环境中已经暴露的 LLM 与 Embedding Key。
2. API 只返回：
   ```json
   {
     "configured": true,
     "masked": "sk-****9BFw"
   }
   ```
3. 前端不再依赖读取原始 Key；编辑时由用户重新输入，空值表示保持原值。
4. `providers/list` 同样只返回脱敏状态，不返回 `current_api_key`。
5. 对配置读取、保存、测试接口统一同源保护和本地访问策略。
6. 检查异常、日志、诊断导出和 OpenAPI 示例，确保不再泄露。

### 验证方式

```text
GET /api/settings：不再出现原始 Key
GET /api/providers/list：不再出现 current_api_key 原值
前端仍能显示“已配置”并可重新填写、保存和测试
```

---

## QA-02：ASR 安装任务长时间没有可见进度

**优先级：P1**

### 现象

专用状态接口曾返回：

```text
enabled=true
installed=false
ready=false
installing=true
phase=runtime
progress_percent=null
current_file=""
downloaded_bytes=0
total_bytes=0
error=""
```

数据库中的对应任务为：

```text
provider_id=asr
operation=install
status=preparing
phase=runtime
progress=0
finished_at=null
```

同时发现 ASR runtime 下存在 pip 安装进程。

### 结论

**事实**：ASR 未就绪，任务没有可供用户理解的进度。

**推断**：任务可能仍在安装 Python/CUDA 依赖，也可能状态机没有及时回写；仅凭 `installing=true` 不能断言后台已经死锁。

### 修正建议

把安装阶段拆开，并给出可解释状态：

```text
准备 Python 运行环境
安装基础依赖
安装 PyTorch / CUDA 依赖
下载 ASR 模型
校验模型
完成 / 失败 / 可重试
```

依赖安装阶段不应显示虚假的 0% 下载条，而应显示：

```text
正在安装依赖，当前阶段不可计算下载百分比
已运行时间
最近一次状态更新时间
当前子进程 / 当前包（可选）
```

同时需要：

- 后端将任务状态与专用资源状态统一到一个权威来源；
- 服务重启后从任务表恢复状态；
- 进程异常退出时进入 `failed` 或 `interrupted`，不能永久停留 `preparing`；
- 完成后刷新资源卡片和系统总览；
- 失败时显示可复制的短错误原因。

---

## QA-03：总览、供应商列表和专用状态的状态语义不一致

**优先级：P1**

### 现象

同一批资源同时使用：

```text
configured
is_configured
is_active
installed
managed_installed
ready
service_running
```

例如：

- Embedding：`provider=custom`、`ready=true`、`installed=false`；
- Reranker：`installed=false`、`ready=false`；
- RVC：`installed=true`、`ready=true`，但 `source_configured=false`；
- 人声分离：模型已安装且 ready，但总览截图曾显示“未配置 / 待命”；
- `/api/status` 嵌套的 ASR 状态与 `/api/asr/status` 的 `installing` 值不一致。

### 根因判断

不同资源管理器把“发现系统资源”“受管安装完成”“配置完成”“可执行”“服务运行”混在不同字段里，前端又用简单的 `is_active/is_configured` 选择文案。

`static/js/system-workbench.js` 中的逻辑：

```js
const status = provider.is_active
  ? "已启用"
  : (s.service_running ? "运行中"
  : (provider.is_configured ? "待命" : "未配置"));
```

该逻辑不能表达本地资源未装、远程 API 已配置、RVC 基础资源已装但音色来源未配置等状态。

### 修正建议

建立统一状态契约：

```text
detected       是否发现可用资源
managed        是否由 CHARACTOID 管理
installed      受管资源是否完整安装
configured     用户是否填写了必要配置
ready          当前能力是否可以执行
running        关联服务是否正在运行
source         api / managed_local / system / external
phase          当前安装或运行阶段
error          面向用户的错误摘要
```

前端只使用后端返回的 `ready/configured/source/phase` 组合，不自行猜测。

推荐显示：

```text
远程 Embedding API · 已启用
本地 Embedding · 未安装
本地 Reranker · 未安装
RVC 基础运行时 · 已就绪
RVC 音色模型 · 已有 1 个
GPT-SoVITS · 未配置安装目录
人声分离模型 · 已就绪
```

---

## QA-04：RAG 测评记录未形成完成终态

**优先级：P1**

### 现象

用户看到测评为 3/5；数据库中最新记录为：

```text
status=running
metrics={}
cases=[]
finished_at=null
```

### 影响

用户无法判断：

- 3/5 是当前阶段进度，还是最终得分；
- 剩余 2 条是失败、跳过还是尚未运行；
- 测评是否仍在后台执行；
- 是否可以重新运行；
- 当前结果是否已经写入历史。

### 推断

生成式测评任务可能在候选问题生成、模型调用或结果分析阶段中断；也可能前端以 `3/5` 显示了进度，而不是分数。当前数据库字段不足以证明具体原因。

### 修正建议

将评测拆为：

```text
queued
preparing_dataset
running_case
analyzing
completed
failed
cancelled
```

持久化：

```text
总题数
已完成题数
成功数
失败数
跳过数
最终指标
当前案例
最后更新时间
错误摘要
```

前端分离展示：

```text
进度：3 / 5
结果：尚未完成
```

完成后再显示：

```text
得分：3 / 5
完成：5 / 5
```

---

## QA-05：供应商页面闪烁

**优先级：P1**

### 事实证据

文件：

```text
E:\tmp\charactoid\static\js\providers.js
```

`loadProviders()` 第 19–42 行附近会：

```js
loadingEl.classList.remove("is-hidden");
gridEl.innerHTML = "";
```

请求完成后调用：

```js
renderProvidersByCategory(currentCategory);
```

`renderProvidersByCategory()` 第 52–95 行附近会：

```js
gridEl.replaceChildren(...);
lucide.createIcons();
```

保存配置后 `saveProviderConfig()` 还会再次执行：

```js
await loadProviders();
```

### 根因判断

供应商页面在每次刷新时经历：

```text
显示 Loading
→ 清空卡片
→ 等待请求
→ 重建所有卡片
→ 重建图标和事件
```

这就是闪烁的主要原因，不是单纯 CSS 问题。

### 额外交互风险

卡片点击和开关事件位于嵌套关系中：

```js
card.addEventListener("click", ...);
toggle.addEventListener("change", ...);
```

开关事件没有明确阻止冒泡，可能出现点击开关同时打开配置卡片的复合行为。初始化也缺少明确的防重复绑定标记。

### 修正方案

1. 首次加载才清空并显示 Loading。
2. 后台刷新保留旧卡片，显示轻量刷新状态。
3. 保存配置后只更新对应卡片，不重建整个网格。
4. 使用 `data-provider-id` 做局部更新。
5. 对开关事件执行 `stopPropagation()`。
6. `bindProvidersEvents()` 增加 `dataset.bound` 防重复。
7. 只对新增节点执行图标初始化。
8. 用 `AbortController` 或请求序号防止旧响应覆盖新状态。
9. 配置弹窗打开期间不替换弹窗 DOM 和输入内容。
10. 保存按钮明确显示 `保存中 / 已保存 / 保存失败`，而不是让列表重绘承担反馈。

---

## QA-06：资源任务面板让 RVC 依赖安装看起来像卡死

**优先级：P1**

### 截图现象

用户截图中的 RVC 任务显示：

```text
安装中 · dependencies
47%
速度 0 B/秒 · 剩余 —
取消
```

### 事实与解释

RVC 当前状态接口后来已经返回：

```text
phase=done
installed=true
ready=true
progress_percent=100
model_count=1
device=cpu
```

因此 RVC 基础资源最终确实完成了。问题主要是安装过程的反馈设计没有说明“依赖安装不是普通文件下载”。

### 修正建议

阶段应改成用户能理解的名称：

```text
准备运行环境
下载 RVC 运行依赖
安装 Python 依赖
下载 Hubert / RMVPE
校验模型
完成
```

在 `dependencies/runtime` 阶段：

- 使用不确定进度动画，不显示伪造的 47%；
- 显示“正在安装 Python 依赖，仍在执行”；
- 显示已经运行的时间；
- 显示最近一次状态更新时间；
- 如可行，显示当前安装包；
- 允许取消，并在取消后明确清理结果；
- 完成后主动刷新 RVC 状态、音色模型列表和供应商卡片；
- 成功提示应说明“基础运行时已完成，还需要添加/选择音色模型”。

### 状态层次

必须区分：

```text
RVC 核心运行时已安装
Hubert / RMVPE 已安装
音色模型数量
当前是否选择音色
当前是否可以执行转换
```

不能用一个“RVC 已配置”覆盖以上全部状态。

---

## QA-07：RVC 当前可用但运行在 CPU

**优先级：P1/P2**

### 事实

```text
系统 GPU：NVIDIA GeForce RTX 5060 Laptop GPU
RVC cuda_available：false
RVC device：cpu
torch：2.4.1+cpu
```

### 影响

RVC 可以执行，但转换速度会明显低于 CUDA 运行时；用户可能误以为“有 NVIDIA GPU 就会自动使用 GPU”。

### 修正建议

- 安装前明确显示 CPU/CUDA 选择和预计依赖大小；
- 检测 GPU、驱动、CUDA 与 PyTorch wheel 是否匹配；
- `auto` 选择失败时说明原因，而不是静默回落 CPU；
- 状态页分别显示“检测到 GPU”和“当前 RVC 使用 CPU”；
- 提供切换运行时的方式，不要要求用户猜测。

---

## QA-08：本地 Embedding / Reranker 下载 0% 的反馈不足

**优先级：P1/P2**

### 事实

Embedding：

```text
provider=custom
model=text-embedding-v3
dimensions=512
installed=false
ready=true
installing=false
```

Reranker：

```text
model=gte-rerank
installed=false
ready=false
installing=false
```

用户反馈本地 Embedding 与 Reranker 下载卡在 0%。

### 推断

当前状态可能处于以下任一情况：

- 下载器未产生可计算的总字节数；
- 依赖运行时准备阶段不回写进度；
- 下载没有真正开始；
- 页面只显示 `progress_percent || 0`，把“未知”错误显示成 0%；
- 模型目录存在部分文件，但完整性检查未通过。

不能仅凭 0% 判定网络或模型服务必然失效。

### 修正建议

- `null` 进度显示为“准备中 / 进度暂不可计算”，不要变成 0%；
- 增加 `phase/current_file/last_update/error`；
- 显示模型来源（ModelScope/Hugging Face/自定义 API）；
- 下载文件使用临时目录，完成校验后原子切换；
- 模型完整性不只检查文件名，还要验证关键配置和权重能否加载；
- Embedding 与 Reranker 运行时隔离，避免并发安装互相覆盖；
- 安装完成后做一次最小推理探针，确认维度和模型可加载；
- 更换 Embedding 维度时自动提示必须新建集合名称并重建索引。

---

## QA-09：音频分离成功但最终音频没有产出

**优先级：P1/P2**

### 用户现象

对话中已经成功得到人声和背景声，但因目录名称无效，无法生成最终音频。

### 当前代码检查结果

已确认的安全设计：

- RVC session ID 使用 `^[A-Za-z0-9_-]{1,64}$` 校验；
- RVC 文件路径会限制在当前 session 目录；
- RVC 上传文件名会去除目录部分，并拒绝 Windows 非法字符；
- 附件实际存储文件名使用 file ID，不直接使用用户上传文件名；
- TTS 输出目录使用会话哈希，输出文件使用 UUID。

但静态检查还发现：

- `train-from-studio` 路径中对 `session_id` 的验证链需要与 Voice Studio 统一；
- `segments[].file` 的目录 containment 需要在最终入口再次校验；
- `voice_assets.py` 中从 Voice Studio 训练/导入的路径存在绕过统一校验的风险；
- RVC 同名 `.pth/.index` 导入可能直接覆盖受管文件；
- 用户输入的音色名称只做非空检查，缺少长度和控制字符限制。

### 修正建议

1. 不让用户输入直接成为真实目录名；统一生成安全 slug。
2. 所有 session、文件、片段路径在最终执行入口重新校验，不只依赖上游路由。
3. 为非法目录名返回具体原因：
   ```text
   名称只能包含中文、字母、数字、空格、下划线和短横线
   ```
4. 写入前检查目标是否已存在；同名模型采用覆盖确认、自动重命名或版本目录。
5. 失败时保留已生成的人声/伴奏资产，并提供“继续生成”“重新命名”“清理任务”选项。
6. UI 明确区分：分离完成、音频转换完成、最终合成完成。

---

## QA-10：资源状态主要依赖进程内变量，重启恢复不完整

**优先级：P2**

### 事实

Embedding、Reranker、ASR 等资源管理器使用 `_installing`、`_phase`、取消事件等进程内状态；数据库只保存部分下载任务信息。

### 风险

服务重启后可能出现：

```text
实际子进程仍在运行，但页面显示 idle
实际任务已中断，但页面显示 installing
任务已经完成，但数据库仍是 preparing
```

### 修正建议

- 任务表作为安装任务权威记录；
- 启动时扫描子进程、临时目录和完成标记；
- 将 `interrupted` 作为独立终态；
- 每次状态变更写入更新时间；
- 前端显示“状态更新时间”；
- 旧任务超过阈值自动标记为需要恢复或失败，而不是一直转圈。

---

## QA-11：RVC 同名模型可能覆盖已有模型

**优先级：P2**

### 证据

`app/routers/voice_rvc.py` 的导入流程根据上传文件名生成目标路径，并通过临时文件替换目标文件。没有发现明确的同名拒绝、版本化或覆盖确认。

### 建议

- 默认拒绝覆盖；
- 或弹窗显示已有模型的名称、大小和更新时间后再确认；
- 采用模型 ID 与原文件名分离；
- 对 `.pth` 和 `.index` 建立成对关系，避免只替换其中一个造成不可用状态。

---

## QA-12：缺少稳定的正式日志和可关联错误

**优先级：P2**

### 事实

项目目录没有发现明确的正式日志文件；多数失败信息主要存在于数据库简短字段或 Agent 事件中。

数据库中确认存在：

```text
worker_failed
关联操作：attach_file_to_rvc_session
出现 2 次失败事件
至少有 1 个 Agent run 最终 failed
```

### 影响

RVC 挂载失败、ASR 安装、RAG 评测和外部服务错误难以通过单一 run_id 追踪完整堆栈和子进程输出。

### 建议

统一记录：

```text
run_id
job_id
provider_id
phase
error_code
user_message
technical_message
retryable
created_at
finished_at
```

用户只看到短错误；详细堆栈写入本地日志并按大小轮转。日志中禁止记录 API Key、Token、完整请求体和敏感路径。

---

## 6. npm 启动器检查

### 6.1 已确认的当前逻辑

文件：

```text
D:\CodePython\YUMENO\bin\charactoid.mjs
```

当前查找逻辑：

1. `CHARACTOID_HOME`；
2. 当前工作目录；
3. 当前目录的父级目录链；
4. `%USERPROFILE%\charactoid`；
5. `%LOCALAPPDATA%\charactoid`。

完整项目只通过以下文件判断：

```text
main.py
requirements.txt
```

默认准备目录为：

```text
当前目录\charactoid
```

### 6.2 为什么在别的目录识别不到

**事实**：启动器没有扫描当前目录下的子目录，也没有用户级项目注册表。

因此：

```text
在 E:\tmp\charactoid 执行：可以识别当前根目录
在 E:\tmp 执行：可以识别 E:\tmp\charactoid（若按默认目录规则）
在 E:\tmp\other 执行：不会自动发现 E:\tmp\charactoid
在任意其他目录执行：不会全盘搜索已有项目
```

**推断**：这是安全默认值与用户预期之间的差异，不是项目内容一定损坏。全盘扫描也不是好方案，会慢、误识别并可能读取不应读取的目录。

### 6.3 推荐的安全发现顺序

```text
显式 CHARACTOID_HOME
→ 当前目录及父级目录
→ 用户级最近项目索引
→ 当前目录下一层子目录
→ 找到多个时让用户选择
```

首次成功准备后保存：

```text
%LOCALAPPDATA%\charactoid\projects.json
```

索引只记录用户主动使用或准备过的项目路径，并在启动前校验：

```text
main.py
requirements.txt
static
app
settings.py
```

不能只凭两个文件判断“可信项目”。对于当前目录的一层子目录，可以做安全白名单校验；不要默认全盘搜索。

### 6.4 覆盖与不完整目录

当前已经有临时目录和覆盖提示设计，方向是正确的：

```text
目录存在但不完整
→ 提示用户覆盖或取消
→ 不直接删除
```

建议进一步做到：

- 下载/复制始终写入临时目录；
- 完整性校验通过后原子重命名；
- 保留失败目录用于诊断，或由用户明确确认后清理；
- 把“发现已有完整项目”“发现上次未完成准备”“发现不受信任目录”分成三种文案；
- 不把网络失败直接写成用户项目“失败”。

---

## 7. 启动器浏览器打开过早

### 当前代码顺序

`bin/charactoid.mjs` 当前逻辑为：

```text
创建/识别项目
→ 创建虚拟环境
→ pip install requirements.txt
→ 创建 .env
→ 输出 URL
→ openBrowser(url)
→ 启动 main.py
```

### 现象

浏览器先打开时，Python 服务还没有开始监听 18000，用户会看到短暂的“无法连接”。

### 推荐顺序

```text
创建/识别项目
→ 准备依赖
→ 启动 main.py 子进程
→ 轮询 GET /api/health
→ 返回 status=ok
→ 输出“服务已就绪”
→ 打开浏览器
```

### 必须补齐的边界

- 健康检查超时；
- Python 启动失败；
- 端口被占用；
- 已有服务时复用而不是重复启动；
- Ctrl+C 能转发并清理子进程；
- `--no-open` 禁止打开浏览器；
- 浏览器打开失败不应让服务退出；
- 输出当前 PID 和停止方式。

建议用户可见输出：

```text
CHARACTOID 正在启动
✓ 环境已准备
✓ Python 服务已启动
✓ 服务健康检查通过
CHARACTOID Web: http://127.0.0.1:18000
正在打开浏览器…
```

---

## 8. 前端页面与交互检查

### 8.1 已访问或接口覆盖的页面

```text
对话
角色
声音 / Voice Studio
知识库
知识库评测
接入（B站、OneBot）
能力（Skill、MCP、Tool）
系统总览
服务供应商
Live2D
RVC
```

页面入口及对应 GET 数据基本可访问：

```text
/api/personas
/api/skills
/api/skills/tools
/api/mcp/servers
/api/mcp/tools
/api/workers/manifests
/api/live2d/models
/api/voice-assets
/api/providers/list
/api/providers/resources
/api/eval/status
/api/eval/results
/api/eval/history
/api/embedding/status
/api/reranker/status
/api/asr/status
/api/tts/status
/api/gpt-sovits/status
/api/voice/stream/status
/api/integrations
/api/integrations/bilibili
/api/integrations/onebot11
```

### 8.2 只读浏览器观察

使用浏览器打开系统工作台时：

- 初始对话页面可以渲染；
- 切换到系统总览后能显示诊断卡片；
- 总览能显示数据库、Milvus、GPU、磁盘等信息；
- 系统总览静态文案存在“已启用/未配置/待命”过度简化问题；
- 在自动化点击供应商子页的过程中曾观察到页面回到 `#chat`，这次现象未能稳定复现，因此暂列为交互切换风险，不认定为确定性故障；
- 供应商卡片闪烁则可以由源码重绘逻辑确认，不依赖该一次性现象。

### 8.3 文案纠错表

| 当前展示倾向 | 实际状态 | 建议文案 |
|---|---|---|
| DashScope Embedding 已启用 | provider 为 custom，调用远程兼容 API | 自定义 Embedding API · 已启用 |
| 本地 Embedding 待命 | 本地模型 `installed=false` | 本地 Embedding · 未安装 |
| 百炼 Rerank 已启用 | 本地 Reranker `ready=false` | 本地 Reranker · 未安装 |
| RVC 未配置 | RVC 基础运行时和音色模型已存在 | RVC 运行时已就绪 · 已有 1 个音色模型 |
| 人声分离未配置 | 分离器模型 ready | 人声分离模型 · 已就绪 |
| GPT-SoVITS 可用/已安装 | 安装目录未配置、服务未运行 | GPT-SoVITS · 未配置安装目录 |
| 下载中 0% | 进度未知或在安装依赖 | 准备中 · 当前阶段无法计算进度 |
| 已启用 | 只表示配置开关，不代表实际可调用 | 配置、安装、可执行分别显示 |

### 8.4 导出诊断的额外问题

`static/js/system-workbench.js` 的诊断导出包含：

```js
生成时间：new Date().toLocaleString()
```

并将当前 provider 的 `current_model/current_base_url` 等信息写入 Markdown。后续应确认：

- 不导出任何明文 Key；
- 本地路径是否需要脱敏；
- “当前启用服务”是否区分远程 API 与本地模型；
- 导出的状态应带 `source` 和 `ready` 语义，而不是只写“已启用”。

---

## 9. 任务与接口覆盖结果

### 9.1 OpenAPI 规模

```text
路径：215
操作：254
```

接口可以按以下领域归类：

```text
健康与系统状态
角色、角色草稿、角色版本
对话、附件、消息、语音消息
Agent stream / resume / query
Run、Job、Checkpoint
文档与知识空间
RAG 查询与反馈
评测数据集与评测运行
Embedding、Reranker
ASR / STT
TTS、GPT-SoVITS
Voice Studio、Voice Assets
RVC、音频分离、FFmpeg
Live2D
Worker 清单
Skill、Tool、MCP
Provider 与资源任务
B站、OneBot、NapCat
系统目录与设置
```

### 9.2 本轮实际执行的接口类型

为避免改变用户环境，本轮主要执行：

```text
GET /api/health
GET /api/status
GET /openapi.json
GET /docs
GET 资源状态接口
GET 角色、技能、MCP、Worker、集成列表
GET Live2D、声音资产、Voice Studio 会话列表
```

同源保护接口在缺少：

```http
X-CHARACTOID-Request: web
```

时返回 403；带上该请求头后可以读取状态。这说明资源接口保护逻辑生效，但它不能代替凭据脱敏。

### 9.3 本轮未执行的操作

以下操作会改变数据库、文件、模型或外部服务，因此没有在只读检查阶段执行：

- 发送新的普通对话；
- 新建角色；
- 上传文档或附件；
- 启动/取消/删除 Embedding、Reranker、ASR、RVC、GPT-SoVITS 安装；
- RVC 真实转换；
- GPT-SoVITS 真实推理；
- B站、OneBot 连接；
- MCP 外部服务器连接；
- Live2D/VTube Studio 连接；
- 评测重新运行；
- 删除资源、附件或数据库内容。

这些属于下一轮“隔离测试数据上的可写流程验收”，不能用本报告的 GET 结果替代。

---

## 10. 静态安全与健壮性检查

### 10.1 已确认的防护

以下设计目前较完整：

1. RVC session ID 有字符集和长度限制。
2. RVC 会话文件访问会限制在 session 目录内。
3. 附件文件名会清洗，实际文件名使用 file ID。
4. 附件内容会做基础类型识别和扩展名一致性检查。
5. Embedding/Reranker 模型 ID 有根目录和格式约束。
6. 大多数下载使用临时文件或临时目录，避免半成品直接变成正式资源。
7. Persona 删除音频时有音频根目录 containment 检查。
8. 数据库采用 WAL，基础读写状态正常。

### 10.2 需要补强的点

| 项目 | 风险 |
|---|---|
| `train-from-studio` 的 session/file 统一校验 | 可能绕过上游路径约束 |
| `delete_attachment()` 自身的 containment | 当前依赖路由调用方先校验 |
| 同名 RVC 模型导入 | 可能覆盖已有模型 |
| 音色名称 | 只校验非空，缺少长度和控制字符限制 |
| 本地音色导入 | 允许扫描外部目录，需要明确授权和日志脱敏 |
| 资源安装状态 | 进程内变量与数据库恢复不完整 |
| 模型完整性 | 部分资源以文件存在/固定大小判断，未必等于可加载 |
| 配置读取 | 当前为 P0 明文凭据风险 |

---

## 11. 建议的源码迭代顺序

### 第一阶段：先修安全和状态可信度

1. 立即轮换已暴露 Key。
2. `/api/settings`、`/api/providers/list` 全部改为脱敏返回。
3. 统一资源状态契约。
4. 修复 `/api/status` 与专用资源状态的来源不一致。
5. 为任务增加 `last_update`、`interrupted`、`retryable`、`error_code`。
6. 评测任务拆分进度与最终得分。

### 第二阶段：修 npm 启动体验

1. 启动器增加安全项目发现策略。
2. 首次准备后写用户级项目索引。
3. 找到多个项目时让用户选择。
4. 准备目录使用临时目录 + 原子切换。
5. 启动 Python 后轮询 `/api/health`，健康后才打开浏览器。
6. 已有健康服务直接复用，避免重复启动。
7. 明确网络失败、项目不完整和用户取消三种结果。

### 第三阶段：修供应商页面

1. 首次加载和后台刷新分离。
2. 列表局部更新，不清空整个网格。
3. 配置弹窗与列表刷新解耦。
4. 防止事件冒泡和重复绑定。
5. 请求序号/AbortController 防止旧响应覆盖新响应。
6. 资源安装使用阶段化状态组件。
7. 完成、失败、取消后主动刷新相关能力卡片。

### 第四阶段：修语音与 RAG 任务

1. ASR runtime 安装恢复与超时。
2. Embedding/Reranker 进度可见性和可加载探针。
3. RVC CPU/CUDA 选择说明。
4. RVC 目录名安全 slug、同名模型冲突处理。
5. 音频任务保留中间资产，支持从分离结果继续。
6. 评测任务补充案例、指标和完成终态。

### 第五阶段：隔离环境做完整可写验收

使用全新临时工作区、测试 Key 和测试模型，按以下顺序执行：

```text
启动器全新准备
→ 已有项目发现
→ 健康等待
→ LLM 配置与真实对话
→ 角色创建
→ 文档上传/索引
→ RAG 查询与引用
→ 评测完成
→ FFmpeg 识别
→ 人声分离
→ RVC 转换
→ 输出资产登记
→ 音频播放/下载
→ Live2D 口型
→ MCP/Skill 测试
→ 失败、取消、恢复、重试
```

每一步都记录：

```text
请求
响应
run_id/job_id
前端显示
数据库终态
生成文件
错误处理
```

---

## 12. 验收标准

### npm 启动器

- 在项目根目录可以复用已有项目；
- 在父目录或已注册项目目录可以发现已有项目；
- 不进行全盘扫描；
- 多个候选项目可选择；
- 不完整目录只提示覆盖或取消；
- 网络失败不删除正式项目目录；
- Python 服务健康后才打开浏览器；
- 浏览器不再出现启动初期的无法连接页面；
- Ctrl+C 能停止由启动器启动的服务。

### 供应商页面

- 首次加载有 Loading，后台刷新不清空内容；
- 输入配置时页面不闪烁、不丢输入；
- 点击开关不会误打开配置卡；
- 保存只更新目标 provider；
- 安装阶段显示真实阶段，不将未知进度显示成 0%；
- 完成、失败、取消后状态实时刷新；
- API、本地、受管资源、外部服务文案明确区分。

### 语音与 RAG

- ASR 长任务不会永久停在 `installing`；
- Embedding/Reranker 下载失败有原因和重试；
- `ready` 必须能通过最小实际调用证明；
- RVC 显示 CPU/CUDA 实际运行设备；
- 分离完成后可以继续生成最终音频；
- 非法目录名有明确提示，不产生模糊失败；
- RAG 评测分离“进度”和“得分”；
- 所有文件结果都能通过 `run_id/asset_id` 追溯。

### 安全

- 任何 GET 接口不返回明文 Key；
- 诊断导出、日志、错误响应不包含密钥；
- `.env`、数据库、模型、用户附件不进入 GitHub 或 npm 包；
- 所有外部路径和模型文件都做目录边界校验；
- 写操作拥有确认、取消、恢复和错误终态。

---

## 13. 最终状态判断

```text
基础 Web 服务：通过
SQLite：通过
Milvus Lite：通过
LLM API 配置：已生效
角色创建与向量写入：有成功证据
人声分离：已就绪
FFmpeg：已就绪，但按需识别文案不清晰
RVC：基础运行时已就绪，1 个音色模型，当前 CPU
ASR：未就绪，安装任务状态和进度需要修复
远程 Embedding：当前配置可用性有证据，但本地模型未安装
本地 Embedding：未安装，0% 反馈问题待修复
本地 Reranker：未就绪，0% 反馈问题待修复
GPT-SoVITS：未配置安装目录，不应展示为可用
RAG 测评：3/5 反馈存在，但数据库终态仍为 running
供应商页面：闪烁根因已定位，需局部刷新重构
npm 项目发现：范围过窄，需安全项目索引/候选发现
npm 浏览器打开：早于健康检查，需改为健康后打开
最终音频：分离阶段成功，最终输出目录名/资产链路需修复
安全：配置接口明文 Key 为最高优先级问题
```

本报告完成后，下一步应先修复 P0/P1 项，再使用隔离测试数据执行可写流程验收。当前不应把静态页面能打开、接口返回 200 或资源文件存在，直接宣传为所有端到端功能已经完成。
