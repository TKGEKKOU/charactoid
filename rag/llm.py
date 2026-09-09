import logging
import time
from functools import lru_cache

import httpx
from langchain_core.messages import HumanMessage
from langchain_core.output_parsers import StrOutputParser
from langchain_openai import ChatOpenAI

from agents.cancellation import TurnAwareHttpxClient
from rag.reasoning import CompatibleChatOpenAI
from settings import Settings


logger = logging.getLogger(__name__)

# 可重试的瞬时故障：限流与 5xx 服务端错误；其他异常（参数错误、超时等）不重试。
TRANSIENT_STATUS_CODES = frozenset({429, 500, 502, 503, 504})
MAX_OUTER_RETRIES = 2
RETRY_BACKOFF_SECONDS = 1.0
EMPTY_COMPLETION_RETRIES = 1

# 模型服务不可用时的统一降级提示，供 Agent/RAG 层直接返回给用户。
LLM_UNAVAILABLE_MESSAGE = "模型服务暂时不可用，请稍后重试。"


# Transport vs SDK retries stay separate: fail connect fast, keep stream idle wide.
# P0 heartbeats already cover the analyzing-stage UI, so a 30s total timeout is obsolete.
LLM_CONNECT_TIMEOUT_SECONDS = 10.0
LLM_STREAM_IDLE_TIMEOUT_SECONDS = 180.0
LLM_WRITE_TIMEOUT_SECONDS = 30.0


def llm_http_timeout(
    *,
    connect: float = LLM_CONNECT_TIMEOUT_SECONDS,
    read: float = LLM_STREAM_IDLE_TIMEOUT_SECONDS,
    write: float = LLM_WRITE_TIMEOUT_SECONDS,
) -> httpx.Timeout:
    """httpx timeout for ChatOpenAI: short connect/pool, idle-read budget for streaming."""

    return httpx.Timeout(connect=connect, read=read, write=write, pool=connect)


class EmptyCompletionError(RuntimeError):
    """Provider finished with no model-visible content; retryable once at the agent layer."""


def is_transient_provider_error(error: Exception) -> bool:
    """Return True for retryable OpenAI-compatible 429/5xx failures."""

    return getattr(error, "status_code", None) in TRANSIENT_STATUS_CODES


def is_empty_completion_text(content: object) -> bool:
    """True when a chat completion has no model-visible text."""

    if content is None:
        return True
    if isinstance(content, str):
        return not content.strip()
    if isinstance(content, list):
        parts: list[str] = []
        for part in content:
            if isinstance(part, dict):
                parts.append(str(part.get("text") or ""))
            else:
                parts.append(str(part))
        return not "".join(parts).strip()
    return not str(content).strip()


def is_empty_model_message(message: object) -> bool:
    """True when a finished model message has no text, tools, or reasoning."""

    tool_calls = getattr(message, "tool_calls", None) or ()
    if tool_calls:
        return False
    extra = getattr(message, "additional_kwargs", None) or {}
    if extra.get("reasoning_content") or extra.get("reasoning"):
        return False
    return is_empty_completion_text(getattr(message, "content", None))


def _sleep(seconds: float) -> None:
    time.sleep(seconds)


# 这里使用 OpenAI-compatible 接口。只要服务兼容 OpenAI Chat Completions，就可以替换 base_url 和 model。
def _create_llm(
    api_key: str,
    base_url: str,
    model: str,
    timeout: float | httpx.Timeout | None = None,
    max_retries: int = 2,
) -> ChatOpenAI:
    http_timeout = timeout if isinstance(timeout, httpx.Timeout) else (
        llm_http_timeout() if timeout is None else httpx.Timeout(timeout)
    )
    return CompatibleChatOpenAI(
        api_key=api_key,
        base_url=base_url,
        model=model,
        temperature=0,
        max_retries=max_retries,
        http_client=TurnAwareHttpxClient(trust_env=False, timeout=http_timeout),
    )


@lru_cache(maxsize=8)
def _build_llm(api_key: str, base_url: str, model: str) -> ChatOpenAI:
    # Interactive Agent retries transient 429/5xx outside the adapter.
    # Adapter retries stay off. Connect/pool fail fast; stream idle read is wide
    # so thinking models are not killed by a 30s total timeout. UI liveness is heartbeats.
    return _create_llm(api_key, base_url, model, timeout=llm_http_timeout(), max_retries=0)


def clear_llm_cache() -> None:
    """清除 LLM 缓存，强制下次调用重新加载配置。
    
    配置更新后调用此函数，确保新的 API Key、Base URL 和模型名称生效。
    """
    _build_llm.cache_clear()


def get_llm(settings: Settings | None = None) -> ChatOpenAI:
    active = settings or Settings.load()
    return _build_llm(active.openai_api_key, active.openai_base_url, active.openai_model)


def probe_llm(api_key: str, base_url: str, model: str) -> str:
    """用一次最小文本请求验证 OpenAI-compatible Chat Completions 连接。"""
    client = _create_llm(api_key, base_url, model, timeout=20, max_retries=0)
    response = client.invoke([HumanMessage(content="Reply with exactly: CHARACTOID_OK")])
    content = response.content
    if isinstance(content, list):
        content = "".join(
            part.get("text", "") if isinstance(part, dict) else str(part)
            for part in content
        )
    text = str(content or "").strip()
    if not text:
        raise RuntimeError("模型返回了空文本")
    return text


def invoke_llm(prompt, values: dict) -> str:
    """执行 prompt -> LLM -> 文本 链，并对瞬时故障做指数退避重试。

    模型内部已有默认重试；这里再兜一层，吸收偶发的 503 服务繁忙等抖动。
    重试耗尽后保留原始异常，由上层决定降级还是上报。
    """

    chain = prompt | get_llm() | StrOutputParser()
    empty_attempts = 0
    for attempt in range(MAX_OUTER_RETRIES + 1):
        try:
            text_out = chain.invoke(values)
            if is_empty_completion_text(text_out):
                raise EmptyCompletionError("empty completion")
            return text_out
        except Exception as exc:
            if isinstance(exc, EmptyCompletionError):
                empty_attempts += 1
                retryable = empty_attempts <= EMPTY_COMPLETION_RETRIES
            else:
                retryable = is_transient_provider_error(exc)
            if attempt >= MAX_OUTER_RETRIES or not retryable:
                raise
            delay = RETRY_BACKOFF_SECONDS * (2**attempt)
            logger.warning("LLM 瞬时故障（%s），%.1fs 后重试 %d/%d", exc, delay, attempt + 1, MAX_OUTER_RETRIES)
            _sleep(delay)
    raise AssertionError("unreachable")
