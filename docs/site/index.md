# CHARACTOID 开发者文档

CHARACTOID 是一个**本地优先、角色驱动、可恢复执行**的 Agent 工作台。

它把角色设定、知识检索、声音生成、工具调用、Live2D 表现和长任务状态放进同一个可追踪运行过程。

<div class="tip custom-block"><p class="custom-block-title">项目状态</p><p>CHARACTOID 正在持续开发中。文档优先描述当前代码结构和可接入边界，实验性能力会单独标注。</p></div>

## 从这里开始

- [快速开始](/guide/quickstart)：本地安装并启动 Web UI
- [系统架构](/concepts/architecture)：理解 Agent、Worker、RAG 与运行时关系
- [事件与状态](/reference/events)：接入前端或外部客户端

## 核心方向

| 模块 | 作用 |
| --- | --- |
| 角色 Agent | 保存角色人格、知识、声音和交互策略 |
| RAG | 将资料切分、索引，并在对话中按需检索 |
| Worker | 把文件处理、语音、工具等能力变成可追踪任务 |
| Live2D | 将语音输出映射为口型和角色表现 |

