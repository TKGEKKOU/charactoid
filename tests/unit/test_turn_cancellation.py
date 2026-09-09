"""Per-turn cancellation: abort HTTP, fail-fast MCP, live worker progress."""

from __future__ import annotations

import asyncio
import socket
import threading
import time
from types import SimpleNamespace

import httpx
import pytest
from langchain_core.tools import tool as make_tool

from agents.cancellation import (
    TurnAwareHttpxClient,
    TurnCancel,
    TurnCancelled,
    set_current_turn_cancel,
)
from agents.context import PersonaAgentContext
from agents.service import PersonaAgentService
from integrations.mcp.client import MCPRuntime, _make_sync_tool
from realtime.execution import ConversationExecutionRegistry


STAGE_ANALYZING = "\u6b63\u5728\u5206\u6790\u8bf7\u6c42\u2026"
STILL_PROCESSING = "\u4ecd\u5728\u5904\u7406"
NOT_READY = "\u5c1a\u672a\u5c31\u7eea"
CASUAL = "\u666e\u901a\u95ee\u9898"


def _context() -> PersonaAgentContext:
    return PersonaAgentContext(
        persona_id="persona-a",
        workspace_id="local-default",
        knowledge_space_ids=("space-a",),
        conversation_id="thread-a",
        persona_name="Ames",
        persona_type="character",
    )


class _HangServer:
    """TCP listener that never accepts, so HTTP clients block in connect/read."""

    def __enter__(self) -> "_HangServer":
        self.sock = socket.socket()
        self.sock.bind(("127.0.0.1", 0))
        self.sock.listen(1)
        self.host, self.port = self.sock.getsockname()
        return self

    def __exit__(self, *args) -> None:
        self.sock.close()

    @property
    def url(self) -> str:
        return f"http://{self.host}:{self.port}/"


def test_turn_aware_client_abort_unblocks_hung_httpx():
    cancel = TurnCancel()
    cached = TurnAwareHttpxClient(trust_env=False, timeout=30)
    errors: list[BaseException] = []
    started = threading.Event()

    with _HangServer() as server:
        def worker() -> None:
            set_current_turn_cancel(cancel)
            try:
                started.set()
                cached.get(server.url)
            except BaseException as exc:
                errors.append(exc)
            finally:
                set_current_turn_cancel(None)

        thread = threading.Thread(target=worker, name="hung-httpx")
        thread.start()
        assert started.wait(2)
        time.sleep(0.2)
        t0 = time.monotonic()
        cancel.abort()
        thread.join(3)
        elapsed = time.monotonic() - t0

    assert not thread.is_alive(), "abort should unblock hung httpx in <3s"
    assert elapsed < 3
    assert errors
    assert all(isinstance(exc, httpx.HTTPError) for exc in errors)
    assert not cached.is_closed
    cached.close()


def test_abort_does_not_close_cached_httpx_client():
    cached = TurnAwareHttpxClient(trust_env=False, timeout=5)
    cancel = TurnCancel()
    set_current_turn_cancel(cancel)
    try:
        cancel.abort()
        assert not cached.is_closed
    finally:
        set_current_turn_cancel(None)
        cached.close()


def test_run_stream_emits_live_progress_until_tokens(monkeypatch):
    monkeypatch.setattr("realtime.execution._HEARTBEAT_SECONDS", 0.2)

    def slow():
        time.sleep(0.55)
        yield {"kind": "stage", "stage": STAGE_ANALYZING}
        yield {"kind": "token", "text": "hi"}
        time.sleep(0.55)
        yield {"kind": "result", "result": "done"}

    async def consume():
        registry = ConversationExecutionRegistry()
        return [event async for event in registry.run_stream("thread-a", slow)]

    events = asyncio.run(consume())
    assert all(not str(event.get("details") or "").startswith(STILL_PROCESSING) for event in events)
    token_index = next(i for i, event in enumerate(events) if event.get("kind") == "token")
    heartbeats = [
        event
        for i, event in enumerate(events)
        if i < token_index and event.get("kind") == "stage"
    ]
    assert heartbeats, "blocked worker should emit live progress"
    after_token = [
        event
        for i, event in enumerate(events)
        if i > token_index and event.get("kind") == "stage"
    ]
    assert after_token == []
    assert events[-1] == {"kind": "result", "result": "done"}


def test_run_stream_cancel_unblocks_hung_httpx():
    cancel_started = threading.Event()

    with _HangServer() as server:
        def hung():
            cancel_started.set()
            TurnAwareHttpxClient(trust_env=False, timeout=30).get(server.url)
            yield {"kind": "result", "result": "should-not-complete"}

        async def consume():
            registry = ConversationExecutionRegistry()

            async def collect():
                events = []
                async for event in registry.run_stream("thread-a", hung):
                    events.append(event)
                return events

            task = asyncio.create_task(collect())
            assert await asyncio.to_thread(cancel_started.wait, 2)
            await asyncio.sleep(0.2)
            t0 = time.monotonic()
            await registry.cancel("thread-a")
            collected = await asyncio.wait_for(task, timeout=3)
            return time.monotonic() - t0, collected

        elapsed, events = asyncio.run(consume())

    assert elapsed < 3
    assert all(event.get("kind") != "result" for event in events if isinstance(event, dict))


def test_stream_query_cancel_does_not_yield_completed_result():
    class CancellingGraph:
        def stream(self, *args, **kwargs):
            raise TurnCancelled("Turn cancelled")
            yield  # pragma: no cover

        def get_state(self, config):
            return SimpleNamespace(values={"messages": []}, interrupts=())

    service = PersonaAgentService(checkpointer=object())
    service._workflow = CancellingGraph()
    cancel = TurnCancel()
    set_current_turn_cancel(cancel)
    try:
        events = list(service.stream_query(CASUAL, _context()))
    finally:
        set_current_turn_cancel(None)

    assert events[0]["kind"] == "stage"
    assert all(event.get("kind") != "result" for event in events)


def test_query_cancel_reraises_instead_of_degrading():
    class CancellingGraph:
        def invoke(self, *args, **kwargs):
            raise TurnCancelled("Turn cancelled")

        def get_state(self, config):
            return SimpleNamespace(values={"messages": []}, interrupts=())

    service = PersonaAgentService(checkpointer=object())
    service._workflow = CancellingGraph()
    with pytest.raises(TurnCancelled):
        service.query(CASUAL, _context())


def test_mcp_runtime_require_ready_does_not_start():
    runtime = MCPRuntime()
    started = False
    original = runtime.start

    def tracking_start() -> None:
        nonlocal started
        started = True
        original()

    runtime.start = tracking_start  # type: ignore[method-assign]

    async def noop():
        return "ok"

    coro = noop()
    t0 = time.monotonic()
    with pytest.raises(RuntimeError, match="not ready"):
        runtime.run(coro, require_ready=True)
    assert time.monotonic() - t0 < 1
    assert started is False


def test_mcp_tool_fail_fast_when_runtime_not_ready():
    @make_tool
    async def ping() -> str:
        """Health check."""
        return "pong"

    runtime = MCPRuntime()
    wrapped = _make_sync_tool(ping, "demo", runtime)
    t0 = time.monotonic()
    with pytest.raises(RuntimeError, match=NOT_READY):
        wrapped.invoke({})
    assert time.monotonic() - t0 < 1
