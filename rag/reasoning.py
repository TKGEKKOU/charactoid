from __future__ import annotations

from typing import Any

from langchain_openai import ChatOpenAI


_REASONING_KEYS = ("reasoning_content", "reasoning")
_REASONING_BLOCK_TYPES = {"reasoning", "thinking", "reasoning_content"}


def _as_mapping(value: object) -> dict[str, Any]:
    if isinstance(value, dict):
        return value
    dump = getattr(value, "model_dump", None)
    if callable(dump):
        try:
            dumped = dump()
        except Exception:
            dumped = None
        if isinstance(dumped, dict):
            return dumped
    if hasattr(value, "__dict__"):
        return {key: item for key, item in vars(value).items() if not str(key).startswith("_")}
    return {}


def _stringify_reasoning(value: object) -> str:
    if value is None:
        return ""
    if isinstance(value, str):
        return value
    if isinstance(value, list):
        return "".join(_stringify_reasoning(item) for item in value)
    mapping = _as_mapping(value)
    if not mapping:
        return ""
    for key in ("content", "text", "reasoning", "reasoning_content"):
        item = mapping.get(key)
        if isinstance(item, str) and item:
            return item
    details = mapping.get("reasoning_details") or mapping.get("summary")
    if details:
        return _stringify_reasoning(details)
    return ""


def provider_reasoning_text(payload: object) -> str:
    """Extract third-party reasoning fields that ChatOpenAI normally drops."""

    if payload is None:
        return ""
    if isinstance(payload, str):
        return payload
    if isinstance(payload, list):
        return "".join(provider_reasoning_text(item) for item in payload if item is not None)

    mapping = _as_mapping(payload)
    if not mapping:
        return ""

    for key in _REASONING_KEYS:
        text = _stringify_reasoning(mapping.get(key))
        if text:
            return text

    details = mapping.get("reasoning_details")
    text = _stringify_reasoning(details)
    if text:
        return text

    delta = mapping.get("delta")
    if delta is not None:
        text = provider_reasoning_text(delta)
        if text:
            return text

    message = mapping.get("message")
    if message is not None:
        text = provider_reasoning_text(message)
        if text:
            return text

    choices = mapping.get("choices")
    if isinstance(choices, list) and choices:
        text = provider_reasoning_text(choices[0])
        if text:
            return text

    content = mapping.get("content")
    if isinstance(content, list):
        parts: list[str] = []
        for part in content:
            block = _as_mapping(part) if not isinstance(part, str) else {}
            if str(block.get("type") or "") in _REASONING_BLOCK_TYPES:
                parts.append(str(block.get("text") or block.get("reasoning") or block.get("thinking") or ""))
        joined = "".join(parts)
        if joined:
            return joined
    return ""


def reasoning_from_message(message: object) -> str:
    extra = getattr(message, "additional_kwargs", None) or {}
    if isinstance(extra, dict):
        for key in _REASONING_KEYS:
            text = _stringify_reasoning(extra.get(key))
            if text:
                return text
    content = getattr(message, "content", None)
    if isinstance(content, list):
        parts: list[str] = []
        for part in content:
            if not isinstance(part, dict):
                continue
            if str(part.get("type") or "") in _REASONING_BLOCK_TYPES:
                parts.append(str(part.get("text") or part.get("reasoning") or part.get("thinking") or ""))
        joined = "".join(parts)
        if joined:
            return joined
    return provider_reasoning_text(message)


class CompatibleChatOpenAI(ChatOpenAI):
    """Keep provider reasoning fields that stock ChatOpenAI discards."""

    def _convert_chunk_to_generation_chunk(
        self,
        chunk: dict,
        default_chunk_class: type,
        base_generation_info: dict | None,
    ):
        generation_chunk = super()._convert_chunk_to_generation_chunk(
            chunk, default_chunk_class, base_generation_info
        )
        if generation_chunk is None:
            return None
        reasoning = provider_reasoning_text(chunk)
        if reasoning:
            extra = dict(getattr(generation_chunk.message, "additional_kwargs", None) or {})
            extra["reasoning_content"] = reasoning
            generation_chunk.message.additional_kwargs = extra
        return generation_chunk

    def _create_chat_result(self, response, generation_info=None):
        result = super()._create_chat_result(response, generation_info)
        reasoning = provider_reasoning_text(response)
        if reasoning and result.generations:
            message = result.generations[0].message
            extra = dict(getattr(message, "additional_kwargs", None) or {})
            extra.setdefault("reasoning_content", reasoning)
            message.additional_kwargs = extra
        return result

