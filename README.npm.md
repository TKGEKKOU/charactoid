# CHARACTOID

在项目源码目录中开发：

```powershell
git add .
git commit -m "描述本次更新"
git push origin main
```

构建并发布 npm 运行时：

```powershell
npm run release:npm
```

用户无需 Git 或源码仓库即可启动：

```powershell
npx charactoid web
```

`charactoid` npm 包内包含可运行的 Web 代码；首次运行只准备本地 Python 虚拟环境并安装基础依赖，不自动下载可选模型。运行时会优先复用当前目录或父级目录中已有的 CHARACTOID 项目。
