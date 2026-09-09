import asyncio
import logging
import threading
import time
from collections.abc import AsyncIterator, Callable
from dataclasses import dataclass, field
from typing import Any, TypeVar

from anyio import to_thread

from agents.cancellation import (
    TurnCancel,
    set_current_turn_cancel,
    turn_was_cancelled,
)


logger = logging.getLogger(__name__)

ResultT = TypeVar("ResultT")

_HEARTBEAT_SECONDS = 1.25
_JOIN_AFTER_ABORT_SECONDS = 30.0


@dataclass
class _ExecutionEntry:
    lock: asyncio.Lock = field(default_factory=asyncio.Lock)
    users: int = 0
    cancel: TurnCancel | None = None


class ConversationExecutionRegistry:
    """Serialize blocking Agent calls that target the same checkpoint thread."""

    def __init__(self) -> None:
        self._entries: dict[str, _ExecutionEntry] = {}
        self._guard = asyncio.Lock()

    async def cancel(self, key: str) -> None:
        """Abort the in-flight turn for this conversation, if any."""

        async with self._guard:
            entry = self._entries.get(key)
            token = None if entry is None else entry.cancel
        if token is not None:
            token.abort()

    async def run(self, key: str, call: Callable[[], ResultT]) -> ResultT:
        async with self._guard:
            entry = self._entries.setdefault(key, _ExecutionEntry())
            entry.users += 1
        try:
            async with entry.lock:
                cancel = TurnCancel()
                async with self._guard:
                    entry.cancel = cancel

                def wrapped() -> ResultT:
                    set_current_turn_cancel(cancel)
                    try:
                        cancel.check()
                        return call()
                    finally:
                        set_current_turn_cancel(None)
                        cancel.abort()

                try:
                    return await to_thread.run_sync(wrapped)
                finally:
                    async with self._guard:
                        if entry.cancel is cancel:
                            entry.cancel = None
        finally:
            async with self._guard:
                entry.users -= 1
                if entry.users == 0 and not entry.lock.locked():
                    self._entries.pop(key, None)

    async def run_stream(
        self,
        key: str,
        call: Callable[[], Any],
    ) -> AsyncIterator[Any]:
        """在独立线程中运行阻塞生成器，并把事件逐条泵回事件循环。

        保持与 run() 相同的按会话串行语义。消费者退出时先 abort 本轮
        HTTP/MCP，再等待工作线程真正结束，避免上一轮 daemon 线程继续
        写入同一个 checkpointer。
        """
        async with self._guard:
            entry = self._entries.setdefault(key, _ExecutionEntry())
            entry.users += 1
        try:
            async with entry.lock:
                loop = asyncio.get_running_loop()
                queue: asyncio.Queue[tuple[str, Any]] = asyncio.Queue()
                stop = threading.Event()
                cancel = TurnCancel()
                async with self._guard:
                    entry.cancel = cancel

                def pump(kind: str, payload: Any) -> None:
                    try:
                        loop.call_soon_threadsafe(queue.put_nowait, (kind, payload))
                    except RuntimeError:
                        pass  # 事件循环已关闭，丢弃剩余事件

                def worker() -> None:
                    set_current_turn_cancel(cancel)
                    iterator = None
                    try:
                        cancel.check()
                        iterator = call()
                        while not stop.is_set() and not cancel.is_set():
                            try:
                                item = next(iterator)
                            except StopIteration:
                                break
                            except Exception as exc:
                                if turn_was_cancelled(exc) or cancel.is_set():
                                    break
                                pump("error", exc)
                                break
                            pump("item", item)
                    except Exception as exc:
                        if not (turn_was_cancelled(exc) or cancel.is_set()):
                            pump("error", exc)
                    finally:
                        close = getattr(iterator, "close", None) if iterator is not None else None
                        if close is not None:
                            try:
                                close()
                            except Exception:  # pragma: no cover - 关闭失败不影响主流程
                                pass
                        set_current_turn_cancel(None)
                        pump("end", None)

                thread = threading.Thread(
                    target=worker,
                    daemon=True,
                    name=f"agent-stream-{key}",
                )
                thread.start()
                last_stage = "正在分析请求…"
                saw_tokens = False
                saw_reasoning = False
                started = time.monotonic()
                try:
                    while True:
                        try:
                            kind, payload = await asyncio.wait_for(
                                queue.get(), timeout=_HEARTBEAT_SECONDS
                            )
                        except asyncio.TimeoutError:
                            if (
                                thread.is_alive()
                                and not stop.is_set()
                                and not cancel.is_set()
                                and not saw_tokens
                                and not saw_reasoning
                            ):
                                yield {
                                    "kind": "stage",
                                    "stage": last_stage,
                                }
                            continue
                        if kind == "end":
                            break
                        if kind == "error":
                            raise payload
                        if isinstance(payload, dict):
                            event_kind = payload.get("kind")
                            if event_kind == "stage" and payload.get("stage"):
                                last_stage = str(payload["stage"])
                            elif event_kind == "token":
                                saw_tokens = True
                            elif event_kind == "reasoning":
                                saw_reasoning = True
                        yield payload
                finally:
                    stop.set()
                    cancel.abort()
                    deadline = time.monotonic() + _JOIN_AFTER_ABORT_SECONDS
                    while thread.is_alive() and time.monotonic() < deadline:
                        remaining = min(0.2, deadline - time.monotonic())
                        if remaining <= 0:
                            break
                        await asyncio.to_thread(thread.join, remaining)
                    if thread.is_alive():
                        logger.warning(
                            "agent stream worker still running after abort: %s", key
                        )
                    async with self._guard:
                        if entry.cancel is cancel:
                            entry.cancel = None
        finally:
            async with self._guard:
                entry.users -= 1
                if entry.users == 0 and not entry.lock.locked():
                    self._entries.pop(key, None)
