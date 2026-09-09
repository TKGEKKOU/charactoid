"""rag.llm.invoke_llm 对外层瞬时故障（429/5xx）的重试与失败语义。"""

import pytest
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.runnables import RunnableLambda


class TransientServiceError(RuntimeError):
    status_code = 503


def test_cached_llm_uses_idle_stream_timeout_and_no_sdk_retries(monkeypatch):
    from rag import llm

    captured = {}

    def fake_create(api_key, base_url, model, timeout=60, max_retries=2):
        captured.update(timeout=timeout, max_retries=max_retries)
        return object()

    llm._build_llm.cache_clear()
    monkeypatch.setattr(llm, "_create_llm", fake_create)

    llm._build_llm("key", "https://example.invalid", "model")

    timeout = captured["timeout"]
    assert captured["max_retries"] == 0
    assert timeout.connect == llm.LLM_CONNECT_TIMEOUT_SECONDS
    assert timeout.read == llm.LLM_STREAM_IDLE_TIMEOUT_SECONDS
    assert timeout.write == llm.LLM_WRITE_TIMEOUT_SECONDS
    assert timeout.pool == llm.LLM_CONNECT_TIMEOUT_SECONDS


def test_llm_http_timeout_keeps_connect_short_and_read_wide():
    from rag.llm import llm_http_timeout, LLM_CONNECT_TIMEOUT_SECONDS, LLM_STREAM_IDLE_TIMEOUT_SECONDS

    timeout = llm_http_timeout()
    assert timeout.connect == LLM_CONNECT_TIMEOUT_SECONDS
    assert timeout.read == LLM_STREAM_IDLE_TIMEOUT_SECONDS
    assert timeout.connect < timeout.read


PROMPT = ChatPromptTemplate.from_messages([("human", "{question}")])


def _flaky_model(attempts, responses):
    """按调用次数依次抛错或返回文本的可运行假模型。"""

    def run(_):
        index = attempts[0]
        attempts[0] += 1
        if index < len(responses):
            raise responses[index]
        return "ok"

    return RunnableLambda(run)


def test_invoke_llm_retries_transient_error_and_succeeds(monkeypatch):
    from rag.llm import invoke_llm

    attempts = [0]
    monkeypatch.setattr("rag.llm.get_llm", lambda: _flaky_model(attempts, [TransientServiceError()] * 2))
    monkeypatch.setattr("rag.llm._sleep", lambda seconds: None)

    result = invoke_llm(PROMPT, {"question": "q"})

    assert result == "ok"
    assert attempts[0] == 3


def test_invoke_llm_reraises_after_retries_exhausted(monkeypatch):
    from rag.llm import invoke_llm

    attempts = [0]
    monkeypatch.setattr("rag.llm.get_llm", lambda: _flaky_model(attempts, [TransientServiceError()] * 10))
    monkeypatch.setattr("rag.llm._sleep", lambda seconds: None)

    with pytest.raises(TransientServiceError):
        invoke_llm(PROMPT, {"question": "q"})
    assert attempts[0] == 3


def test_invoke_llm_does_not_retry_non_transient_error(monkeypatch):
    from rag.llm import invoke_llm

    attempts = [0]
    monkeypatch.setattr("rag.llm.get_llm", lambda: _flaky_model(attempts, [ValueError("boom")]))
    monkeypatch.setattr("rag.llm._sleep", lambda seconds: None)

    with pytest.raises(ValueError, match="boom"):
        invoke_llm(PROMPT, {"question": "q"})
    assert attempts[0] == 1

def test_empty_completion_helpers_ignore_tool_calls_and_reasoning():
    from langchain_core.messages import AIMessage
    from rag.llm import is_empty_completion_text, is_empty_model_message

    assert is_empty_completion_text("")
    assert is_empty_completion_text("   ")
    assert is_empty_completion_text([{"type": "text", "text": ""}])
    assert not is_empty_completion_text("ok")
    assert is_empty_model_message(AIMessage(content=""))
    assert not is_empty_model_message(AIMessage(content="hi"))
    assert not is_empty_model_message(AIMessage(content="", tool_calls=[{"id": "1", "name": "x", "args": {}}]))
    assert not is_empty_model_message(
        AIMessage(content="", additional_kwargs={"reasoning_content": "thinking"})
    )


def test_invoke_llm_retries_empty_completion_once(monkeypatch):
    from rag.llm import invoke_llm, EmptyCompletionError

    attempts = [0]

    def run(_):
        attempts[0] += 1
        if attempts[0] == 1:
            return "   "
        return "ok"

    monkeypatch.setattr("rag.llm.get_llm", lambda: RunnableLambda(run))
    monkeypatch.setattr("rag.llm._sleep", lambda seconds: None)

    result = invoke_llm(PROMPT, {"question": "q"})

    assert result == "ok"
    assert attempts[0] == 2


def test_invoke_llm_raises_after_empty_completion_retry(monkeypatch):
    from rag.llm import invoke_llm, EmptyCompletionError

    attempts = [0]

    def run(_):
        attempts[0] += 1
        return ""

    monkeypatch.setattr("rag.llm.get_llm", lambda: RunnableLambda(run))
    monkeypatch.setattr("rag.llm._sleep", lambda seconds: None)

    with pytest.raises(EmptyCompletionError):
        invoke_llm(PROMPT, {"question": "q"})
    assert attempts[0] == 2


def test_compatible_chat_openai_keeps_reasoning_content():
    from langchain_core.messages import AIMessageChunk
    from rag.reasoning import CompatibleChatOpenAI, provider_reasoning_text, reasoning_from_message

    chunk = {
        "choices": [{
            "delta": {"content": "", "reasoning_content": "step-one"},
            "finish_reason": None,
        }]
    }
    llm = CompatibleChatOpenAI(api_key="x", model="m")
    generation = llm._convert_chunk_to_generation_chunk(chunk, AIMessageChunk, None)
    assert generation.message.additional_kwargs.get("reasoning_content") == "step-one"

    response = {
        "choices": [{
            "message": {"role": "assistant", "content": "ok", "reasoning_content": "thought"},
            "finish_reason": "stop",
        }],
        "model": "m",
    }
    result = llm._create_chat_result(response)
    assert result.generations[0].message.additional_kwargs.get("reasoning_content") == "thought"
    assert provider_reasoning_text(chunk) == "step-one"
    assert reasoning_from_message(generation.message) == "step-one"
