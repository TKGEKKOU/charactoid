# 注册 Worker 与工具

## Worker 声明

新增 Worker 时至少明确：

- 稳定名称；
- 负责的领域；
- 输入合同；
- 输出合同；
- 允许调用的工具；
- 是否修改数据；
- 是否需要确认；
- 是否支持恢复；
- finalize 校验方式。

示意代码：

```python
from agents.registry import ToolSpec

spec = ToolSpec(
    name="example_status",
    description="读取示例资源状态",
    worker="config",
    requires_confirmation=False,
    mutates_data=False,
)
```

> 具体构造参数以 `agents/registry.py` 当前定义为准；示例展示的是需要表达的安全元数据。

## 工具设计检查表

1. 输入使用 Pydantic 或明确 JSON schema；
2. 返回结构化结果，不返回模糊成功文本；
3. 不把任意本地路径、Shell 或凭据交给模型；
4. 副作用和确认要求可被注册表读取；
5. 错误消息能定位资源、阶段和恢复方式；
6. 为正常、缺参、权限不足、失败和重复调用编写测试。

## 接入父图

新增领域 Worker 后，需要完成 Worker 构建、handoff 工具、父图节点、`finalize_*`、清单接口和文档同步。不要让 Worker 绕过 Supervisor 直达父图 END。
