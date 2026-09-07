# 快速开始

## 启动服务

YUMENO 的主服务入口是 `main.py`。推荐在项目根目录创建并激活虚拟环境：

```powershell
.\.venv\Scripts\python.exe -B main.py
```

默认地址：`http://127.0.0.1:17000/static/index.html`

如果使用已经准备好的环境，也可以直接运行：

```powershell
python main.py
```

## 第一次运行

1. 复制 `.env.example` 为 `.env`；
2. 按需配置模型、语音和向量数据库连接；
3. 启动服务并打开 Web UI；
4. 在对话页选择角色，发送一条任务请求；
5. 从运行状态中查看 Worker、工具调用和结果资产。

## 桌面端

桌面端入口为 `desktop_main.py`。它复用同一套运行时和配置，不会改变 Agent、RAG、Worker 的任务语义。

## 代码结构

- `agents/`：Agent 编排、上下文和生命周期；
- `rag/`：知识摄取、切分、检索和引用；
- `voice/`、`realtime/`：语音生成、实时对话相关能力；
- `skills/`、`integrations/`：工具与外部服务接入；
- `runtime/`：任务、事件、资产和恢复逻辑；
- `static/`、`frontend/`：Web UI 与静态资源。

## 生产检查

```powershell
pytest
python -m compileall agents rag runtime voice
```

> 当前文档描述的是 YUMENO 实际项目；与产品展示站中的视觉演示不同，真实模型、文件处理和服务连接以仓库配置为准。
