# Worker 注册

Worker 应声明名称、输入 schema、输出类型、权限范围和可恢复性。注册后由协调层根据任务目标选择，不建议在 UI 中写死调用路径。

```python
worker = registry.register(
    name="rvc",
    input_schema=RvcRequest,
    output_type="audio",
    resumable=True,
)
```
