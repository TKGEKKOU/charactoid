# 全量 API 路由清单

> 本页按当前 `app/routers/` 和 `app/startup/routes.py` 的装饰器与注册代码静态盘点，共 **257** 个 HTTP / WebSocket 操作；其中 WebSocket 不会出现在 FastAPI 的 HTTP OpenAPI `paths` 中。它是可复制的路由索引，不替代运行时 OpenAPI：Request Body、响应模型和实际状态码以当前 FastAPI 运行结果为准。

## 如何使用

- **稳定**：核心应用路径，通常可直接调用。
- **可选**：需要本地模型、文件或额外配置。
- **实验 / 外部依赖**：需要第三方客户端、服务或目标设备验证。
- **兼容**：为旧调用方式保留的别名或并行入口。

通用调用约定：JSON 接口使用 `Content-Type: application/json`；上传接口使用 `multipart/form-data`；异步接口先保存返回的 `run_id`、`job_id`、`task_id` 或 `asset_id`，再查询状态。

## 路由总表

| 方法 | 路径 | 源码模块 | 处理函数 | 初步状态 |
| --- | --- | --- | --- | --- |
| `PATCH` | `/api/asr/config` | `asr.py` | `update_config` | 可选 |
| `DELETE` | `/api/asr/install` | `asr.py` | `remove` | 可选 |
| `POST` | `/api/asr/install` | `asr.py` | `install` | 可选 |
| `DELETE` | `/api/asr/install/cancel` | `asr.py` | `cancel_install` | 可选 |
| `POST` | `/api/asr/model-directory` | `asr.py` | `open_model_directory` | 可选 |
| `GET` | `/api/asr/status` | `asr.py` | `get_status` | 可选 |
| `GET` | `/api/conversations/{conversation_id}/attachments` | `attachments.py` | `list_attachments` | 稳定 |
| `POST` | `/api/conversations/{conversation_id}/attachments` | `attachments.py` | `upload_attachments` | 稳定 |
| `DELETE` | `/api/conversations/{conversation_id}/attachments/{file_id}` | `attachments.py` | `remove_attachment` | 稳定 |
| `GET` | `/api/conversations/{conversation_id}/attachments/{file_id}` | `attachments.py` | `download_attachment` | 稳定 |
| `PATCH` | `/api/conversations/{conversation_id}/attachments/{file_id}` | `attachments.py` | `rename_attachment` | 稳定 |
| `POST` | `/api/conversations/{conversation_id}/attachments/{file_id}/send-to-rag` | `attachments.py` | `send_to_rag` | 稳定 |
| `POST` | `/api/conversations/{conversation_id}/attachments/{file_id}/send-to-rvc` | `attachments.py` | `send_to_rvc` | 稳定 |
| `DELETE` | `/api/documents/{job_id}` | `documents.py` | `delete_document` | 稳定 |
| `GET` | `/api/documents/{job_id}` | `documents.py` | `get_document` | 稳定 |
| `POST` | `/api/documents/{job_id}/confirm` | `documents.py` | `confirm_document` | 稳定 |
| `GET` | `/api/documents/{job_id}/report` | `documents.py` | `get_document_processing_report` | 稳定 |
| `POST` | `/api/documents/{job_id}/retry-index` | `documents.py` | `retry_document` | 稳定 |
| `PATCH` | `/api/embedding/config` | `embedding.py` | `configure` | 可选 |
| `POST` | `/api/embedding/install` | `embedding.py` | `install` | 可选 |
| `DELETE` | `/api/embedding/install/cancel` | `embedding.py` | `cancel` | 可选 |
| `DELETE` | `/api/embedding/model` | `embedding.py` | `remove` | 可选 |
| `POST` | `/api/embedding/model-directory` | `embedding.py` | `open_model_directory` | 可选 |
| `GET` | `/api/embedding/status` | `embedding.py` | `get_status` | 可选 |
| `POST` | `/api/eval/analyze` | `eval.py` | `analyze_eval` | 可选 |
| `GET` | `/api/eval/export` | `eval.py` | `export_eval` | 可选 |
| `GET` | `/api/eval/history` | `eval.py` | `eval_history` | 可选 |
| `GET` | `/api/eval/history/{run_id}` | `eval.py` | `eval_history_detail` | 可选 |
| `GET` | `/api/eval/results` | `eval.py` | `eval_results` | 可选 |
| `POST` | `/api/eval/run` | `eval.py` | `start_eval` | 可选 |
| `GET` | `/api/eval/status` | `eval.py` | `eval_status` | 可选 |
| `GET` | `/api/extensions/catalog` | `extensions.py` | `catalog_api` | 稳定 |
| `GET` | `/api/extensions/catalog/install/{job_id}` | `extensions.py` | `install_status_api` | 稳定 |
| `POST` | `/api/extensions/catalog/refresh` | `extensions.py` | `refresh_catalog_api` | 稳定 |
| `GET` | `/api/extensions/catalog/{item_id}` | `extensions.py` | `catalog_item_api` | 稳定 |
| `POST` | `/api/extensions/catalog/{item_id}/install` | `extensions.py` | `install_catalog_item_api` | 稳定 |
| `PATCH` | `/api/gpt-sovits/config` | `voice_assets.py` | `update_gpt_sovits_config` | 实验 / 外部依赖 |
| `POST` | `/api/gpt-sovits/detect` | `voice_assets.py` | `detect_gpt_sovits` | 实验 / 外部依赖 |
| `DELETE` | `/api/gpt-sovits/install` | `voice_assets.py` | `remove_gpt_sovits_install` | 实验 / 外部依赖 |
| `POST` | `/api/gpt-sovits/install` | `voice_assets.py` | `install_gpt_sovits` | 实验 / 外部依赖 |
| `DELETE` | `/api/gpt-sovits/install/cancel` | `voice_assets.py` | `cancel_gpt_sovits_install` | 实验 / 外部依赖 |
| `POST` | `/api/gpt-sovits/model-directory` | `voice_assets.py` | `open_gpt_sovits_directory` | 实验 / 外部依赖 |
| `POST` | `/api/gpt-sovits/service/start` | `voice_assets.py` | `start_gpt_sovits_service` | 实验 / 外部依赖 |
| `POST` | `/api/gpt-sovits/service/stop` | `voice_assets.py` | `stop_gpt_sovits_service` | 实验 / 外部依赖 |
| `GET` | `/api/gpt-sovits/status` | `voice_assets.py` | `gpt_sovits_status` | 实验 / 外部依赖 |
| `GET` | `/api/health` | `app/startup/routes.py` | `health` | 稳定 |
| `GET` | `/api/integrations` | `integrations.py` | `get_integrations` | 稳定 |
| `GET` | `/api/integrations/bilibili` | `integrations.py` | `get_bilibili` | 实验 / 外部依赖 |
| `PUT` | `/api/integrations/bilibili/config` | `integrations.py` | `update_bilibili` | 实验 / 外部依赖 |
| `POST` | `/api/integrations/bilibili/connect` | `integrations.py` | `connect_bilibili` | 实验 / 外部依赖 |
| `POST` | `/api/integrations/bilibili/disconnect` | `integrations.py` | `disconnect_bilibili` | 实验 / 外部依赖 |
| `WEBSOCKET` | `/api/integrations/bilibili/events/ws` | `integrations.py` | `bilibili_events` | 实验 / 外部依赖 |
| `POST` | `/api/integrations/bilibili/pause` | `integrations.py` | `pause_bilibili` | 实验 / 外部依赖 |
| `POST` | `/api/integrations/bilibili/queue/clear` | `integrations.py` | `clear_bilibili_queue` | 实验 / 外部依赖 |
| `POST` | `/api/integrations/bilibili/resume` | `integrations.py` | `resume_bilibili` | 实验 / 外部依赖 |
| `POST` | `/api/integrations/bilibili/session/clear` | `integrations.py` | `clear_bilibili_session` | 实验 / 外部依赖 |
| `POST` | `/api/integrations/napcat/send` | `integrations.py` | `send_napcat` | 稳定 |
| `GET` | `/api/integrations/onebot11` | `integrations.py` | `get_onebot` | 实验 / 外部依赖 |
| `PUT` | `/api/integrations/onebot11` | `integrations.py` | `update_onebot` | 实验 / 外部依赖 |
| `POST` | `/api/integrations/onebot11/conversation/clear` | `integrations.py` | `clear_onebot_conversation` | 实验 / 外部依赖 |
| `POST` | `/api/integrations/onebot11/disconnect` | `integrations.py` | `disconnect_onebot` | 实验 / 外部依赖 |
| `PUT` | `/api/integrations/onebot11/observation` | `integrations.py` | `update_onebot_observation` | 实验 / 外部依赖 |
| `POST` | `/api/integrations/onebot11/recent/clear` | `integrations.py` | `clear_onebot_recent_messages` | 实验 / 外部依赖 |
| `GET` | `/api/integrations/onebot11/targets` | `integrations.py` | `get_onebot_targets` | 实验 / 外部依赖 |
| `POST` | `/api/integrations/onebot11/test` | `integrations.py` | `test_onebot_connection` | 实验 / 外部依赖 |
| `DELETE` | `/api/integrations/onebot11/token` | `integrations.py` | `clear_onebot_token` | 实验 / 外部依赖 |
| `GET` | `/api/knowledge-spaces/{space_id}/documents/report` | `documents.py` | `get_knowledge_space_document_report` | 稳定 |
| `POST` | `/api/knowledge-spaces/{space_id}/documents/upload` | `documents.py` | `upload_documents` | 稳定 |
| `GET` | `/api/knowledge-spaces/{space_id}/eval-candidates` | `eval_dataset.py` | `list_eval_candidates` | 可选 |
| `POST` | `/api/knowledge-spaces/{space_id}/eval-candidates/sync` | `eval_dataset.py` | `sync_eval_candidates` | 可选 |
| `POST` | `/api/knowledge-spaces/{space_id}/eval-candidates/{candidate_id}/approve` | `eval_dataset.py` | `approve_eval_candidate` | 可选 |
| `POST` | `/api/knowledge-spaces/{space_id}/eval-candidates/{candidate_id}/reject` | `eval_dataset.py` | `reject_eval_candidate` | 可选 |
| `GET` | `/api/knowledge-spaces/{space_id}/eval-cases` | `eval_dataset.py` | `list_eval_cases` | 可选 |
| `POST` | `/api/knowledge-spaces/{space_id}/eval-cases` | `eval_dataset.py` | `create_eval_case` | 可选 |
| `DELETE` | `/api/knowledge-spaces/{space_id}/eval-cases/{case_id}` | `eval_dataset.py` | `delete_eval_case` | 可选 |
| `GET` | `/api/knowledge-spaces/{space_id}/eval-cases/{case_id}` | `eval_dataset.py` | `get_eval_case` | 可选 |
| `PATCH` | `/api/knowledge-spaces/{space_id}/eval-cases/{case_id}` | `eval_dataset.py` | `update_eval_case` | 可选 |
| `GET` | `/api/launcher/progress` | `app/startup/routes.py` | `launcher_progress` | 稳定 |
| `POST` | `/api/live2d/model-directory` | `live2d.py` | `open_live2d_model_directory` | 实验 / 外部依赖 |
| `GET` | `/api/live2d/models` | `live2d.py` | `list_models` | 实验 / 外部依赖 |
| `GET` | `/api/live2d/vts` | `live2d.py` | `vts_connection_config` | 实验 / 外部依赖 |
| `GET` | `/api/mcp/servers` | `mcp.py` | `list_servers_api` | 实验 / 外部依赖 |
| `POST` | `/api/mcp/servers` | `mcp.py` | `upsert_server_api` | 实验 / 外部依赖 |
| `DELETE` | `/api/mcp/servers/{name}` | `mcp.py` | `delete_server_api` | 实验 / 外部依赖 |
| `POST` | `/api/mcp/servers/{name}/disable` | `mcp.py` | `disable_server_api` | 实验 / 外部依赖 |
| `POST` | `/api/mcp/servers/{name}/enable` | `mcp.py` | `enable_server_api` | 实验 / 外部依赖 |
| `PATCH` | `/api/mcp/servers/{name}/grants` | `mcp.py` | `update_grants_api` | 实验 / 外部依赖 |
| `POST` | `/api/mcp/servers/{name}/reload` | `mcp.py` | `reload_server_api` | 实验 / 外部依赖 |
| `POST` | `/api/mcp/servers/{name}/test` | `mcp.py` | `test_server_api` | 实验 / 外部依赖 |
| `GET` | `/api/mcp/tools` | `mcp.py` | `list_registered_tools_api` | 实验 / 外部依赖 |
| `POST` | `/api/persona-drafts/upload` | `persona_drafts.py` | `upload_draft` | 稳定 |
| `GET` | `/api/persona-drafts/{draft_id}` | `persona_drafts.py` | `read_draft` | 稳定 |
| `PATCH` | `/api/persona-drafts/{draft_id}` | `persona_drafts.py` | `update_draft` | 稳定 |
| `POST` | `/api/persona-drafts/{draft_id}/candidates/{candidate_id}` | `persona_drafts.py` | `select_candidate` | 稳定 |
| `POST` | `/api/persona-drafts/{draft_id}/confirm` | `persona_drafts.py` | `confirm_persona_draft` | 稳定 |
| `GET` | `/api/personas` | `personas.py` | `list_personas` | 稳定 |
| `POST` | `/api/personas` | `personas.py` | `create` | 稳定 |
| `DELETE` | `/api/personas/{persona_id}` | `personas.py` | `delete_persona` | 稳定 |
| `GET` | `/api/personas/{persona_id}` | `personas.py` | `get_persona` | 稳定 |
| `PATCH` | `/api/personas/{persona_id}` | `personas.py` | `update_persona` | 稳定 |
| `POST` | `/api/personas/{persona_id}/agent/query` | `agents.py` | `query_agent` | 稳定 |
| `POST` | `/api/personas/{persona_id}/agent/resume` | `agents.py` | `resume_agent` | 稳定 |
| `POST` | `/api/personas/{persona_id}/agent/stream` | `agents.py` | `stream_agent_query` | 稳定 |
| `POST` | `/api/personas/{persona_id}/agent/stream-resume` | `agents.py` | `stream_agent_resume` | 稳定 |
| `GET` | `/api/personas/{persona_id}/capabilities` | `personas.py` | `get_persona_capabilities` | 稳定 |
| `PUT` | `/api/personas/{persona_id}/capabilities` | `personas.py` | `put_persona_capabilities` | 稳定 |
| `DELETE` | `/api/personas/{persona_id}/conversations/{conversation_id}` | `messages.py` | `clear_conversation` | 稳定 |
| `GET` | `/api/personas/{persona_id}/conversations/{conversation_id}/messages` | `messages.py` | `list_messages` | 稳定 |
| `POST` | `/api/personas/{persona_id}/conversations/{conversation_id}/voice-messages` | `messages.py` | `create_voice_message` | 可选 |
| `GET` | `/api/personas/{persona_id}/documents` | `personas.py` | `list_persona_documents` | 稳定 |
| `GET` | `/api/personas/{persona_id}/mcp-grants` | `personas.py` | `get_mcp_grants` | 实验 / 外部依赖 |
| `PUT` | `/api/personas/{persona_id}/mcp-grants` | `personas.py` | `put_mcp_grants` | 实验 / 外部依赖 |
| `GET` | `/api/personas/{persona_id}/rag/queries` | `rag.py` | `list_persona_rag_queries` | 稳定 |
| `POST` | `/api/personas/{persona_id}/rag/queries/{query_id}/feedback` | `rag.py` | `submit_rag_feedback` | 稳定 |
| `POST` | `/api/personas/{persona_id}/rag/query` | `rag.py` | `query_persona` | 稳定 |
| `GET` | `/api/personas/{persona_id}/rag/report` | `rag.py` | `get_rag_quality_report` | 稳定 |
| `GET` | `/api/personas/{persona_id}/versions` | `persona_versions.py` | `list_persona_versions` | 稳定 |
| `POST` | `/api/personas/{persona_id}/versions` | `persona_versions.py` | `create_persona_version` | 稳定 |
| `GET` | `/api/personas/{persona_id}/versions/diff` | `persona_versions.py` | `diff_persona_versions` | 稳定 |
| `GET` | `/api/personas/{persona_id}/versions/{version_id}` | `persona_versions.py` | `get_persona_version` | 稳定 |
| `POST` | `/api/personas/{persona_id}/versions/{version_id}/publish` | `persona_versions.py` | `publish_persona_version` | 稳定 |
| `POST` | `/api/personas/{persona_id}/versions/{version_id}/rollback` | `persona_versions.py` | `rollback_persona_version` | 稳定 |
| `POST` | `/api/providers/configure` | `providers.py` | `configure_provider` | 可选 |
| `GET` | `/api/providers/list` | `providers.py` | `list_all_providers` | 可选 |
| `GET` | `/api/providers/resources` | `providers.py` | `list_resource_status` | 可选 |
| `DELETE` | `/api/providers/resources/ffmpeg` | `voice_rvc.py` | `ffmpeg_remove` | 可选 |
| `GET` | `/api/providers/resources/ffmpeg/directory` | `voice_rvc.py` | `ffmpeg_directory` | 可选 |
| `POST` | `/api/providers/resources/ffmpeg/install` | `voice_rvc.py` | `ffmpeg_install` | 可选 |
| `GET` | `/api/providers/resources/ffmpeg/status` | `voice_rvc.py` | `ffmpeg_status` | 可选 |
| `GET` | `/api/providers/resources/tasks` | `providers.py` | `list_resource_tasks` | 可选 |
| `DELETE` | `/api/providers/resources/tasks/{task_id}` | `providers.py` | `cancel_resource_task` | 可选 |
| `GET` | `/api/providers/resources/tasks/{task_id}` | `providers.py` | `get_resource_task` | 可选 |
| `POST` | `/api/providers/resources/tasks/{task_id}/retry` | `providers.py` | `retry_resource_task` | 可选 |
| `GET` | `/api/providers/resources/{provider_id}` | `providers.py` | `get_resource_status` | 可选 |
| `POST` | `/api/providers/resources/{provider_id}/install` | `providers.py` | `install_resource` | 可选 |
| `GET` | `/api/providers/resources/{provider_id}/status` | `providers.py` | `get_resource_status_alias` | 可选 |
| `GET` | `/api/providers/rvc/directory` | `voice_rvc.py` | `provider_directory` | 可选 |
| `DELETE` | `/api/providers/rvc/install` | `voice_rvc.py` | `provider_install_remove` | 可选 |
| `POST` | `/api/providers/rvc/install` | `voice_rvc.py` | `provider_install` | 可选 |
| `DELETE` | `/api/providers/rvc/install/cancel` | `voice_rvc.py` | `provider_install_cancel` | 可选 |
| `POST` | `/api/providers/rvc/models/import` | `voice_rvc.py` | `import_models` | 可选 |
| `POST` | `/api/providers/rvc/open-model-directory` | `voice_rvc.py` | `open_model_directory` | 可选 |
| `GET` | `/api/providers/rvc/status` | `voice_rvc.py` | `provider_status` | 可选 |
| `POST` | `/api/providers/test` | `providers.py` | `test_provider` | 可选 |
| `PATCH` | `/api/reranker/config` | `reranker.py` | `configure` | 可选 |
| `POST` | `/api/reranker/install` | `reranker.py` | `install` | 可选 |
| `DELETE` | `/api/reranker/install/cancel` | `reranker.py` | `cancel` | 可选 |
| `DELETE` | `/api/reranker/model` | `reranker.py` | `remove` | 可选 |
| `POST` | `/api/reranker/model-directory` | `reranker.py` | `open_model_directory` | 可选 |
| `GET` | `/api/reranker/status` | `reranker.py` | `get_status` | 可选 |
| `GET` | `/api/resources` | `resources.py` | `resource_catalog` | 可选 |
| `DELETE` | `/api/resources/tasks` | `resources.py` | `clear_finished_tasks` | 可选 |
| `GET` | `/api/resources/tasks` | `resources.py` | `list_tasks` | 可选 |
| `DELETE` | `/api/resources/tasks/{task_id}` | `resources.py` | `cancel_task` | 可选 |
| `GET` | `/api/resources/tasks/{task_id}` | `resources.py` | `task_detail` | 可选 |
| `POST` | `/api/resources/tasks/{task_id}/retry` | `resources.py` | `retry_task` | 可选 |
| `DELETE` | `/api/resources/{provider_id}/install` | `resources.py` | `remove_resource` | 可选 |
| `POST` | `/api/resources/{provider_id}/install` | `resources.py` | `install_resource` | 可选 |
| `DELETE` | `/api/resources/{provider_id}/install/cancel` | `resources.py` | `cancel_resource_install` | 可选 |
| `GET` | `/api/resources/{provider_id}/status` | `resources.py` | `resource_status` | 可选 |
| `GET` | `/api/runs/{run_id}` | `runs.py` | `get_run` | 稳定 |
| `POST` | `/api/runs/{run_id}/approval` | `runs.py` | `decide_approval` | 稳定 |
| `POST` | `/api/runs/{run_id}/cancel` | `runs.py` | `cancel_run` | 稳定 |
| `GET` | `/api/runs/{run_id}/events` | `runs.py` | `get_run_events` | 稳定 |
| `DELETE` | `/api/settings` | `settings.py` | `reset_settings` | 稳定 |
| `GET` | `/api/settings` | `settings.py` | `get_settings` | 稳定 |
| `PATCH` | `/api/settings` | `settings.py` | `save_settings` | 稳定 |
| `POST` | `/api/settings/llm/test` | `settings.py` | `test_llm_connection` | 稳定 |
| `POST` | `/api/settings/reveal-key` | `settings.py` | `reveal_api_key` | 稳定 |
| `GET` | `/api/skills` | `skills.py` | `list_skills_api` | 稳定 |
| `POST` | `/api/skills` | `skills.py` | `create_skill_api` | 稳定 |
| `GET` | `/api/skills/tools` | `skills.py` | `list_skill_tools_api` | 稳定 |
| `POST` | `/api/skills/upload` | `skills.py` | `upload_skills_api` | 稳定 |
| `DELETE` | `/api/skills/{name}` | `skills.py` | `delete_skill_api` | 稳定 |
| `PATCH` | `/api/skills/{name}` | `skills.py` | `update_skill_api` | 稳定 |
| `GET` | `/api/status` | `app/startup/routes.py` | `status` | 稳定 |
| `PATCH` | `/api/stt/config` | `asr.py` | `update_stt_config` | 可选 |
| `DELETE` | `/api/stt/install` | `asr.py` | `remove_stt` | 可选 |
| `POST` | `/api/stt/install` | `asr.py` | `install_stt` | 可选 |
| `DELETE` | `/api/stt/install/cancel` | `asr.py` | `cancel_stt_install` | 可选 |
| `POST` | `/api/stt/model-directory` | `asr.py` | `open_stt_model_directory` | 可选 |
| `GET` | `/api/stt/status` | `asr.py` | `get_stt_status` | 可选 |
| `GET` | `/api/system/diagnostics` | `system.py` | `diagnostics` | 稳定 |
| `GET` | `/api/system/docker-settings` | `system.py` | `get_docker_settings` | 稳定 |
| `PUT` | `/api/system/docker-settings` | `system.py` | `update_docker_settings` | 稳定 |
| `POST` | `/api/system/docker/pause` | `system.py` | `pause_docker` | 稳定 |
| `POST` | `/api/system/docker/remove` | `system.py` | `remove_docker` | 稳定 |
| `POST` | `/api/system/open-directory/{location}` | `system.py` | `open_diagnostics_directory` | 稳定 |
| `POST` | `/api/system/shutdown` | `system.py` | `shutdown` | 稳定 |
| `DELETE` | `/api/tts/clone-tasks/{task_id}` | `video_clone.py` | `cancel_clone_task` | 可选 |
| `GET` | `/api/tts/clone-tasks/{task_id}` | `video_clone.py` | `get_clone_task` | 可选 |
| `POST` | `/api/tts/personas/{persona_id}/conversations/{conversation_id}/synthesize` | `tts.py` | `synthesize` | 可选 |
| `POST` | `/api/tts/personas/{persona_id}/conversations/{conversation_id}/synthesize/stream` | `tts.py` | `synthesize_stream` | 可选 |
| `WEBSOCKET` | `/api/tts/personas/{persona_id}/conversations/{conversation_id}/synthesize/ws` | `tts.py` | `synthesize_ws` | 可选 |
| `POST` | `/api/tts/personas/{persona_id}/reference/from-video` | `video_clone.py` | `import_reference_from_video` | 可选 |
| `DELETE` | `/api/tts/separator/install` | `video_clone.py` | `separator_remove` | 可选 |
| `POST` | `/api/tts/separator/install` | `video_clone.py` | `separator_install` | 可选 |
| `DELETE` | `/api/tts/separator/install/cancel` | `video_clone.py` | `separator_cancel_install` | 可选 |
| `GET` | `/api/tts/separator/model-directory` | `video_clone.py` | `separator_model_directory` | 可选 |
| `GET` | `/api/tts/separator/status` | `video_clone.py` | `separator_status` | 可选 |
| `GET` | `/api/tts/status` | `tts.py` | `get_status` | 可选 |
| `GET` | `/api/voice-assets` | `voice_assets.py` | `list_assets` | 可选 |
| `POST` | `/api/voice-assets` | `voice_assets.py` | `create_asset` | 可选 |
| `POST` | `/api/voice-assets/import` | `voice_assets.py` | `import_assets` | 可选 |
| `POST` | `/api/voice-assets/train-from-studio` | `voice_assets.py` | `train_from_studio` | 可选 |
| `DELETE` | `/api/voice-assets/{asset_id}` | `voice_assets.py` | `delete_asset` | 可选 |
| `GET` | `/api/voice-assets/{asset_id}` | `voice_assets.py` | `get_asset` | 可选 |
| `PATCH` | `/api/voice-assets/{asset_id}` | `voice_assets.py` | `update_asset` | 可选 |
| `POST` | `/api/voice-assets/{asset_id}/synthesize` | `voice_assets.py` | `synthesize_asset` | 可选 |
| `POST` | `/api/voice-assets/{asset_id}/train` | `voice_assets.py` | `start_training` | 可选 |
| `GET` | `/api/voice-messages/{message_id}/audio` | `messages.py` | `get_audio` | 可选 |
| `POST` | `/api/voice-messages/{message_id}/transcribe` | `messages.py` | `transcribe_message` | 可选 |
| `GET` | `/api/voice-studio/sessions` | `voice_studio.py` | `list_sessions` | 实验 / 外部依赖 |
| `POST` | `/api/voice-studio/sessions` | `voice_studio.py` | `create_session` | 实验 / 外部依赖 |
| `DELETE` | `/api/voice-studio/sessions/{session_id}` | `voice_studio.py` | `delete_session` | 实验 / 外部依赖 |
| `GET` | `/api/voice-studio/sessions/{session_id}` | `voice_studio.py` | `get_session` | 实验 / 外部依赖 |
| `POST` | `/api/voice-studio/sessions/{session_id}/audio` | `voice_studio.py` | `upload_audio` | 实验 / 外部依赖 |
| `POST` | `/api/voice-studio/sessions/{session_id}/complete` | `voice_studio.py` | `complete_session` | 实验 / 外部依赖 |
| `GET` | `/api/voice-studio/sessions/{session_id}/reference/audio` | `voice_studio.py` | `session_reference_audio` | 实验 / 外部依赖 |
| `POST` | `/api/voice-studio/sessions/{session_id}/reference/upload` | `voice_studio.py` | `upload_reference` | 实验 / 外部依赖 |
| `POST` | `/api/voice-studio/sessions/{session_id}/segments/select` | `voice_studio.py` | `select_segments` | 实验 / 外部依赖 |
| `POST` | `/api/voice-studio/sessions/{session_id}/segments/upload` | `voice_studio.py` | `upload_segments` | 实验 / 外部依赖 |
| `DELETE` | `/api/voice-studio/sessions/{session_id}/segments/{segment_index}` | `voice_studio.py` | `delete_segment` | 实验 / 外部依赖 |
| `GET` | `/api/voice-studio/sessions/{session_id}/segments/{segment_index}/audio` | `voice_studio.py` | `segment_audio` | 实验 / 外部依赖 |
| `POST` | `/api/voice-studio/sessions/{session_id}/separate` | `voice_studio.py` | `start_separation` | 实验 / 外部依赖 |
| `POST` | `/api/voice-studio/sessions/{session_id}/video` | `voice_studio.py` | `upload_video` | 实验 / 外部依赖 |
| `GET` | `/api/voice-studio/voices` | `voice_studio.py` | `list_voices` | 实验 / 外部依赖 |
| `DELETE` | `/api/voice-studio/voices/{voice_id}` | `voice_studio.py` | `delete_voice` | 实验 / 外部依赖 |
| `GET` | `/api/voice-studio/voices/{voice_id}/audio` | `voice_studio.py` | `voice_audio` | 实验 / 外部依赖 |
| `POST` | `/api/voice/rvc/convert` | `voice_rvc.py` | `convert` | 实验 / 外部依赖 |
| `GET` | `/api/voice/rvc/models` | `voice_rvc.py` | `models` | 实验 / 外部依赖 |
| `GET` | `/api/voice/rvc/models/{model_id}/metadata` | `voice_rvc.py` | `model_metadata` | 实验 / 外部依赖 |
| `GET` | `/api/voice/rvc/output/{task_id}` | `voice_rvc.py` | `output_by_task` | 实验 / 外部依赖 |
| `POST` | `/api/voice/rvc/sessions` | `voice_rvc.py` | `create_session` | 实验 / 外部依赖 |
| `DELETE` | `/api/voice/rvc/sessions/{session_id}` | `voice_rvc.py` | `cancel_session` | 实验 / 外部依赖 |
| `GET` | `/api/voice/rvc/sessions/{session_id}` | `voice_rvc.py` | `session_status` | 实验 / 外部依赖 |
| `POST` | `/api/voice/rvc/sessions/{session_id}/attachment` | `voice_rvc.py` | `attach_conversation_attachment` | 实验 / 外部依赖 |
| `POST` | `/api/voice/rvc/sessions/{session_id}/extract` | `voice_rvc.py` | `extract_session` | 实验 / 外部依赖 |
| `GET` | `/api/voice/rvc/sessions/{session_id}/files/{file_id}` | `voice_rvc.py` | `session_file` | 实验 / 外部依赖 |
| `POST` | `/api/voice/rvc/sessions/{session_id}/files/{file_id}/trim` | `voice_rvc.py` | `trim_session_file` | 实验 / 外部依赖 |
| `GET` | `/api/voice/rvc/sessions/{session_id}/files/{file_id}/waveform` | `voice_rvc.py` | `session_waveform` | 实验 / 外部依赖 |
| `POST` | `/api/voice/rvc/sessions/{session_id}/separate` | `voice_rvc.py` | `separate_session` | 实验 / 外部依赖 |
| `POST` | `/api/voice/rvc/sessions/{session_id}/source` | `voice_rvc.py` | `upload_session_source` | 实验 / 外部依赖 |
| `GET` | `/api/voice/rvc/status` | `voice_rvc.py` | `rvc_status` | 实验 / 外部依赖 |
| `DELETE` | `/api/voice/rvc/tasks/{task_id}` | `voice_rvc.py` | `cancel_task` | 实验 / 外部依赖 |
| `GET` | `/api/voice/rvc/tasks/{task_id}` | `voice_rvc.py` | `task_status` | 实验 / 外部依赖 |
| `GET` | `/api/voice/rvc/tasks/{task_id}/files/{file_id}` | `voice_rvc.py` | `task_file` | 实验 / 外部依赖 |
| `POST` | `/api/voice/rvc/tasks/{task_id}/files/{file_id}/trim` | `voice_rvc.py` | `trim_task_file` | 实验 / 外部依赖 |
| `GET` | `/api/voice/rvc/tasks/{task_id}/files/{file_id}/waveform` | `voice_rvc.py` | `task_waveform` | 实验 / 外部依赖 |
| `POST` | `/api/voice/rvc/tasks/{task_id}/mix` | `voice_rvc.py` | `mix_task` | 实验 / 外部依赖 |
| `GET` | `/api/voice/rvc/tasks/{task_id}/output` | `voice_rvc.py` | `output` | 实验 / 外部依赖 |
| `GET` | `/api/voice/stream/status` | `voice_stream.py` | `stream_status` | 实验 / 外部依赖 |
| `WEBSOCKET` | `/api/voice/stream/ws` | `voice_stream.py` | `voice_stream` | 实验 / 外部依赖 |
| `POST` | `/api/voice/transcriptions` | `voice.py` | `transcribe_audio` | 可选 |
| `GET` | `/api/workers/manifests` | `worker_manifests.py` | `list_worker_manifests` | 稳定 |
| `GET` | `/api/workers/manifests/{worker}` | `worker_manifests.py` | `get_worker_manifest` | 稳定 |
| `WEBSOCKET` | `/ws/personas/{persona_id}/conversations/{conversation_id}` | `realtime.py` | `persona_realtime` | 稳定 |

## 参数、响应与失败处理

单个接口的字段定义不应凭文档手写猜测。推荐在本地运行服务后打开 `/docs` 或 `/openapi.json`，再结合对应路由函数的 Pydantic 类型检查：

```powershell
Invoke-RestMethod http://127.0.0.1:18000/openapi.json | ConvertTo-Json -Depth 20
```

常见失败响应：

| 状态码 | 含义 | 客户端处理 |
| --- | --- | --- |
| `400` | 请求内容或状态不允许 | 修正参数或先完成前置步骤 |
| `404` | 资源标识不存在 | 检查 `persona_id`、`job_id`、`task_id` 等标识 |
| `409` | 状态冲突或重复操作 | 先读取当前状态，再决定重试/取消/恢复 |
| `422` | Pydantic 请求校验失败 | 按响应中的字段错误修正 JSON 或表单 |
| `503` | 本地模型或外部服务不可用 | 检查资源状态和依赖服务，不要伪装成完成 |

## 可复制的最小请求

```powershell
$body = @{ message = "检查当前资源状态"; conversation_id = "conversation-id" } | ConvertTo-Json
Invoke-RestMethod `
  -Method Post `
  -Uri "http://127.0.0.1:18000/api/personas/persona-id/agent/query" `
  -ContentType "application/json" `
  -Body $body
```

```javascript
const response = await fetch("http://127.0.0.1:18000/api/status")
if (!response.ok) throw new Error(`status=${response.status}`)
const status = await response.json()
```

## 维护说明

新增或修改路由后重新生成/核对本页；涉及 Request Body、响应模型、状态码或事件时，同时更新对应的分组 API 页面。
