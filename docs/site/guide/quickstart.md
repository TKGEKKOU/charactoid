# 快速开始

这篇只做一件事：让你在自己的电脑上打开 CHARACTOID 工作台，并确认模型能连上。创建角色、发任务、装语音，都放到后面的指南里。

CHARACTOID 跑在本机。默认不用 Docker，也不需要先下载语音或 Live2D 模型。

## 你需要准备

- Windows，用 PowerShell
- 已安装 **Python 3.11**（安装时勾选 Add to PATH）
- 一个可用的对话模型服务，以及对应的 API Key
- 浏览器（脚本默认会尝试打开）

## 启动工作台

在任意合适的目录执行：

```powershell
git clone git@github.com:TKGEKKOU/charactoid.git
cd charactoid
.\scripts\start.ps1
```

第一次会创建虚拟环境、安装依赖，并在没有配置文件时复制一份默认 `.env`。以后再运行，已装好的环境会直接复用。

启动成功后，用浏览器打开工作台。请使用本机地址，不要改成局域网 IP——设置、资源和不少写入操作只允许从这台电脑访问。

脚本常用参数：

| 你想怎样 | 怎么写 |
| --- | --- |
| 环境已经装好，加快启动 | `.\scripts\start.ps1 -NoInstall` |
| 只要服务，自己开浏览器 | `.\scripts\start.ps1 -NoBrowser` |
| 同时打开桌面宿主窗口 | `.\scripts\start.ps1 -Desktop` |

如果这个目录里的服务已经在跑，脚本会直接打开浏览器，而不会再起一份。

### 没有 Git 时

也可以用 `npx charactoid-web` 准备 Web 运行时。它不会覆盖你已有的 `.env`、虚拟环境和 `data/` 里的用户数据。需要更新运行时时再用 `npx charactoid-web update`，并在确认后才写入。

### 更愿意手动启动时

```powershell
py -3.11 -m venv .venv
.\.venv\Scripts\python.exe -m pip install -e . -r requirements.txt
Copy-Item .env.example .env
.\.venv\Scripts\python.exe -B main.py
```

然后自己打开工作台页面。

## 打开之后先做这件事

1. 进入**设置**页。
2. 填写模型服务地址、模型和 API Key。
3. 使用页面上的**测试连接**。通了再去创建角色。

密钥和模型配置保存在工作台设置里，**不要**到 `.env` 里找 API Key。`.env` 只放本机数据目录、端口这类基础设施。

还没有 Key 时，内置指南角色仍可能用预设回复带你熟悉界面；那不代表你的模型已经配好。正式对话前仍应完成测试连接。

## 怎样算启动成功

- 浏览器里能看到工作台，而不是空白或无法访问
- 设置页测试连接成功
- 能进入角色或对话，而不是一说话就失败

页面能打开，只说明本机服务在；对话失败时先回到设置页，不要重装依赖。

## 启动不了时

| 你看到的 | 先试 |
| --- | --- |
| 脚本无法运行 | 当前用户允许执行本地脚本，或改用「手动启动」那几条命令 |
| 提示没有 Python 3.11 | 安装 3.11 并重新打开 PowerShell |
| 提示端口被占用 | 多半是工作台已经在跑，让脚本打开已有页面即可；若不是本应用，再关掉占用的进程 |
| 页面打开了，一对话就失败 | 到设置页测试连接；占位 Key 不会被当成真实密钥 |
| 知识或语音按钮是灰的 | 正常。先完成文字对话，再看[准备本地资源](./resources) |

依赖反复安装、向量库路径报错等，见[问题排查](/troubleshooting)。

停服务：在运行 `start.ps1` 或 `main.py` 的终端里 Ctrl+C。若开了桌面宿主窗口，关掉窗口会一并停掉本地服务。

## 下一步

- [创建第一个角色](./character)
- [完成一次对话任务](./first-task)
- 仍要查启动脚本和接口细节时，再看[配置项](/reference/config)与[API 总览](/reference/api)
