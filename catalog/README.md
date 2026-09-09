# Catalog

内置资产与运行时数据库分离。

- `catalog/guide-persona/` 是可提交的向导角色源：人设、无 Key 预设回复、轻量知识。
- 启动时 `ensure_guide_persona()` 把 catalog 同步进本地 workspace（SQLite / 知识任务），不在仓库里提交用户库。
- 向导 `profile.catalog_id = charactoid-guide`，`builtin` + `guide`。删除接口对内置角色返回 403。
- 没有 LLM API Key 时，向导走 `replies.json` 预设；配置 Key 后走正常 Agent。
