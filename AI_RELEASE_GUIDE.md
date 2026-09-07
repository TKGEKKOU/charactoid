# CHARACTOID 代码更新发布指南

> 给 AI 使用：每次修改 CHARACTOID 代码后，必须同时更新 GitHub 源码和 npm 启动包。不要跳过验证，不要把密钥、数据库、模型或用户数据发布到 npm。

## 项目位置

- 源码目录：`D:\CodePython\YUMENO`
- GitHub 仓库：`git@github.com:TKGEKKOU/charactoid.git`
- npm 包名：`charactoid`
- 用户启动命令：`npx charactoid web`
- npm 运行时构建目录：`package-runtime`（自动生成，不要手动编辑）

## 标准更新流程

在源码目录执行：

```powershell
Set-Location 

# 1. 检查改动
 git status

# 2. 运行与本次改动相关的测试或检查
node --check bin\charactoid.mjs

# 3. 提交并推送 GitHub
git add .
git commit -m "描述本次更新"
git push origin main

# 4. 重新生成 npm 内置运行时并检查发布内容
npm run build:npm
npm pack --dry-run

# 5. 发布 npm 补丁版本
npm run release:npm:patch
```

`release:npm:patch` 会自动递增 npm 补丁版本、重新构建 `package-runtime` 并执行 `npm publish`。

## 功能版本发布

普通修复使用：

```powershell
npm run release:npm:patch
```

新增功能较多时使用：

```powershell
npm version minor --no-git-tag-version
npm run release:npm
```

破坏性变更使用：

```powershell
npm version major --no-git-tag-version
npm run release:npm
```

npm 已发布的版本不能覆盖。发布前必须确认当前版本未被发布，或先递增版本号。

## 发布前检查

1. `git diff` 中没有 `.env`、Token、密码、私钥或本地用户数据。
2. `package-runtime` 由构建脚本生成，不要手动把模型、数据库、日志、`.venv` 或缓存复制进去。
3. `npm pack --dry-run` 中只出现必要的启动器和运行时代码。
4. `node --check bin\charactoid.mjs` 通过。
5. 相关 Python 文件可以正常导入或通过项目已有测试。
6. GitHub 推送成功后，再发布 npm。
7. npm 发布成功后，确认：

```powershell
npm view charactoid version
```

## 失败处理

### GitHub 推送失败

先停止 npm 发布，不要发布未同步到 GitHub 的版本。检查：

```powershell
git status
git remote -v
git log -1 --oneline
```

### npm 发布失败

不要重复发布同一个版本。先确认：

```powershell
npm whoami
npm view charactoid versions --json
```

如果版本已经存在，递增版本后重新执行发布流程。如果 npm 要求浏览器授权或双因素认证，等待用户完成认证，不要索要或记录密码、Token、验证码。

### 构建失败

不要执行 `npm publish`。检查 `scripts\build-npm-runtime.ps1` 和源码依赖，修复后重新执行：

```powershell
npm run build:npm
npm pack --dry-run
```

## 给 AI 的最终报告格式

完成后简要报告：

```text
GitHub：已提交并推送，提交号：<commit>
npm：已发布，版本：charactoid@<version>
验证：npm view charactoid version = <version>
用户命令：npx charactoid web
```

如果任一步未完成，必须明确写出“未完成”和具体原因，不要声称发布成功。
