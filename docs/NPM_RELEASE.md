# npm 发布流程

## 首次发布

```powershell
npm run build:npm
npm publish --access public
```

这会发布当前源码打包出的 `charactoid@1.0.0`。包内带有 Web 运行所需的 Python 源码和静态文件，不需要先连接 GitHub。

## 以后更新

先把源码提交到 GitHub，再发布 npm 更新：

```powershell
git add .
git commit -m "描述更新"
git push origin main
npm run release:npm:patch
```

`release:npm:patch` 会自动递增补丁版本、重新生成 npm 运行时并发布。例如 `1.0.0` 更新为 `1.0.1`。需要较大功能版本时，可先执行 `npm version minor --no-git-tag-version` 或 `npm version major --no-git-tag-version`，再执行 `npm run release:npm`。

GitHub 是源码协作和版本追踪入口；npm 是用户的一键安装入口。两者使用同一份源码，但 npm 发布的是经过白名单整理的可运行包，不包含数据库、模型、虚拟环境、日志和用户数据。
