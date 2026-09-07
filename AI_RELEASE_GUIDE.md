# CHARACTOID 发布与更新指南

这份文件给维护 CHARACTOID 的 AI 使用。项目源码只推送到 GitHub；npm 不自动同步，只有明确发布时才更新 npm。

## 项目位置

- GitHub：`git@github.com:TKGEKKOU/charactoid.git`
- npm：`charactoid-web`
- 默认启动：`npx charactoid-web`
- 主动更新：`npx charactoid-web update`
- npm 运行时目录：`package-runtime`（自动生成，不手动编辑）

## 用户使用方式

```powershell
# 首次准备或启动已有项目
npx charactoid-web

# 主动更新已有 CHARACTOID 项目
npx charactoid-web update
```

默认启动不会覆盖已有源码、`.env`、数据库、模型、用户资源或虚拟环境。
`update` 会在用户确认后优先从 GitHub 获取最新源码；GitHub 不可用时自动回退到 npm 内置运行时。它会更新应用源码和静态文件，并保留上述本地数据。

可通过环境变量跳过 GitHub，直接使用 npm 内置运行时：

```powershell
$env:CHARACTOID_UPDATE_SOURCE = "npm"
npx charactoid-web update
```

## 开发后的检查

```powershell
node --check bin\\charactoid.mjs
npm run build:npm
npm pack --dry-run
```

构建脚本会重新生成 `package-runtime`，并自动排除缓存、数据库、日志、模型和虚拟环境。

## 推送 GitHub

```powershell
git status
git add <明确的文件>
git commit -m "描述本次修改"
git push origin main
```

普通 GitHub 推送不会发布 npm，也不会自动增加 npm 版本。

## 手动发布 npm

只有用户明确要求发布时执行：

```powershell
npm run build:npm
npm pack --dry-run
npm publish
```

发布前确认 `package.json` 版本尚未存在；npm 已发布版本不能覆盖。版本应保持低速增长，只在真正需要发布新运行时后递增，例如 `0.0.1-rc.3`。

## 发布后验证

```powershell
npm view charactoid-web version
npx --yes charactoid-web@<version> --help
```

## 安全边界

- 不提交 `.env`、密钥、Token、数据库、模型、用户上传文件和本地输出。
- 不在普通启动时自动覆盖用户目录。
- 更新失败时必须保证正式项目目录未被清空；临时目录下载或复制完成后再写入。
- 不记录或索要 npm 密码、Token、验证码或浏览器密钥。
