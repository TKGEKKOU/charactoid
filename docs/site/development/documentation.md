# 文档维护规范

**文档正文直接维护在 `docs/site`，每个页面都是可独立复制的 Markdown。发布走 GitHub Pages：`base: '/charactoid/'`，工作流 `.github/workflows/deploy-charactoid-docs.yml`。**

本页给文档作者和改代码的人同时看。CHARACTOID 的文档必须描述当前仓库，而不是历史设计草案或落地页文案。

## 目录约定

```text
docs/site/
  index.md                 入口与阅读路径
  guide/                   第一次跑起来
  capabilities/            产品能力，对应真实模块
  concepts/                架构、源码地图、术语、Runtime、持久化
  development/             如何改 Agent / Worker / Skill
  reference/               API、事件、Worker、配置
  troubleshooting/         按现象排查
  .vitepress/config.mjs    侧栏与站点配置
```

不要把 `docs/archive` 或旧 README 段落复制进 `docs/site` 冒充当前行为。如果行为变了，改当前页，而不是加一篇“新版说明”让读者自己猜。

## 侧栏检查

漏改侧栏等于这篇文档对外不存在。新增或移动 Markdown 时必须同时改 `.vitepress/config.mjs`：

1. 文件落在正确分组：`guide` / `capabilities` / `concepts` / `development` / `reference` / `troubleshooting`；
2. 侧栏 link 与文件路径一致，不含 `.md` 后缀；
3. 标题与页面 H1 一致，避免侧栏写产品名、正文写模块名；
4. 本地 `npm run dev --prefix docs/site` 点一遍新页，确认不是 404；
5. 构建后再用 `npm run build` 的死链提示核对内部链接。

不要把草稿页放进侧栏“先占位”。没有对照源码的页面不应出现在导航里。

## 变更同步表

| 代码变更 | 必须同步 |
| --- | --- |
| 新增或修改路由 | `reference/api*` 与 curl 示例 |
| 新增 Worker | Agent/Worker 页、Worker 清单、必要时能力页 |
| 修改状态或事件 | 生命周期、Runtime、事件参考 |
| 新增配置项 | `reference/config.md` 和 `.env.example` |
| 新增外部接入 | 能力页、API 页、排查页 |
| 修改默认端口/路径 | 快速开始、配置、排查 |
| 修改 ToolSpec 字段 | 注册 Worker 页的示例代码 |
| 新增 Markdown 页 | `.vitepress/config.mjs` 侧栏 |
| 修改错误码 / HTTP 状态 | 对应能力页与 troubleshooting，不要只改 API 总览 |
| 修改确认策略纯函数 | 生命周期、事件、任务排查 |

## 写作规则

- 当前代码行为优先于历史文档和聊天里的口头设计；
- 事实、推断和未来方向分开写；
- 不写真实 Token、密码、Cookie、私密绝对路径；
- 示例必须能复制，占位值写清楚；
- 实验、外部依赖、兼容接口明确标注；
- 每页给出用途、边界、最小示例和相关页面；
- 代码示例字段必须对得上源码，宁缺毋错。
- HTTP 状态码、错误 `detail` 字符串必须从 router 抄，不要意译成另一句；
- 不要把落地页演示文案（例如工作台按钮文案）写进运行时合同。

推荐开头用一句话定位 + 对应源码路径。读者应在 20 秒内知道这页该不该继续读。

## 禁止事项

文档提交和正文都不要做这些事：

- 把 `node_modules`、`docs/site/.vitepress/dist`、`docs/site/_patch-sidebar.cjs` 加进 git；
- 把 `bin/charactoid.mjs` 或 npm 包改动混进文档提交；
- 把展示站仓库当作 npm 依赖写进 `docs/site/package.json`（CI 里没有 `E:\\landing`）；
- 把展示站 Live2D 拟合参数写成运行时默认值；
- 覆盖或重写 `concepts/architecture.md`、`concepts/source-map.md`、`reference/api-all.md` 去“整理结构”，除非源码合同变了；
- 写未在源码出现的错误，例如文档上传的「空文件 422」——`documents.py` 没有 `EMPTY_FILE`；
- 把 checkpoint 前缀写成 `LIKE "{persona_id}%"`。源码是 `f"{persona_id}:%"`，**带冒号**。

## 和落地页的边界

`E:\\landing` 或产品展示站可以引用本文档的 URL，但：

- 不要把展示站仓库当作 npm 依赖写进 `docs/site/package.json`（CI 里没有那块盘）；
- 不要把展示站 Live2D 拟合参数写进运行时文档当默认值；
- 文档提交可以 push；展示站提交策略以展示站自己的约束为准。

## 发布命令

在仓库根目录，只构建文档站：

```powershell
npm install --prefix docs/site
npm run build --prefix docs/site
```

或进入 `docs/site` 后：

```powershell
npm install
npm run build
```

本地预览：

```powershell
npm run dev --prefix docs/site
```

默认 `http://127.0.0.1:18081/`。

提交前再检查：

1. 侧栏能点到所有新页；
2. 内部链接没有 404；
3. 没有 `file:E:/landing` 这类本机依赖；
4. 构建产物不含 `node_modules` 提交；
5. `git add` 范围只覆盖 `docs/site/**`，排除 `_patch-sidebar.cjs`、`node_modules`、`.vitepress/dist`；
6. 不要把 `bin/charactoid.mjs` 或 npm 包改动混进文档提交。

GitHub Pages 由 `.github/workflows/deploy-charactoid-docs.yml` 在 push 后构建。`base: '/charactoid/'` 意味着站内链接应使用 VitePress 的站点相对路径，不要写死 `https://localhost`。

## 相关页面

- [源码地图](/concepts/source-map)
- [API 总览](/reference/api)
- [工程实践](/development/engineering)
