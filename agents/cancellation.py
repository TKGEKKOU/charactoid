"""Per-turn cancellation for blocking Agent / LLM / MCP work.

LangGraph and ChatOpenAI run in worker threads. Clearing a WebSocket turn_id
or aborting an SSE consumer does not stop those calls. TurnCancel is the
thread-local signal that actually closes this turn's HTTP clients and MCP
futures so the next user message can start.
"""

from __future__ import annotations

import threading
from concurrent.futures import Future
from typing import Any

import httpx


class TurnCancelled(RuntimeError):
    """Raised when the current conversation turn was aborted."""


_local = threading.local()


def current_turn_cancel() -> TurnCancel | None:
    return getattr(_local, "cancel", None)


def set_current_turn_cancel(cancel: TurnCancel | None) -> None:
    _local.cancel = cancel


def turn_was_cancelled(exc: BaseException | None = None) -> bool:
    if isinstance(exc, TurnCancelled):
        return True
    cancel = current_turn_cancel()
    return cancel is not None and cancel.is_set()


class TurnCancel:
    """Abort in-flight HTTP and MCP work that belongs to one conversation turn."""

    def __init__(self) -> None:
        self._event = threading.Event()
        self._lock = threading.Lock()
        self._clients: list[httpx.Client] = []
        self._futures: list[Future[Any]] = []

    def is_set(self) -> bool:
        return self._event.is_set()

    def check(self) -> None:
        if self._event.is_set():
            raise TurnCancelled("Turn cancelled")

    def http_client(self, **kwargs: Any) -> httpx.Client:
        kwargs.setdefault("trust_env", False)
        client = httpx.Client(**kwargs)
        with self._lock:
            if self._event.is_set():
                client.close()
                raise TurnCancelled("Turn cancelled")
            self._clients.append(client)
        return client

    def discard_client(self, client: httpx.Client) -> None:
        with self._lock:
            try:
                self._clients.remove(client)
            except ValueError:
                return
        if not client.is_closed:
            client.close()

    def register_future(self, future: Future[Any]) -> None:
        with self._lock:
            if self._event.is_set():
                future.cancel()
                return
            self._futures.append(future)

    def abort(self) -> None:
        self._event.set()
        with self._lock:
            clients = list(self._clients)
            futures = list(self._futures)
            self._clients.clear()
            self._futures.clear()
        for client in clients:
            if not client.is_closed:
                try:
                    client.close()
                except Exception:
                    pass
        for future in futures:
            try:
                future.cancel()
            except Exception:
                pass


class TurnAwareHttpxClient(httpx.Client):
    """Shared ChatOpenAI httpx client that never closes the cached instance.

    When a turn is active, each request is delegated to a private inner client
    registered on TurnCancel. Aborting the turn closes that inner client and
    unblocks the in-flight send without poisoning other conversations.
    """

    def send(self, request: httpx.Request, *args: Any, **kwargs: Any) -> httpx.Response:
        cancel = current_turn_cancel()
        if cancel is None:
            return super().send(request, *args, **kwargs)
        if cancel.is_set():
            raise httpx.RequestError("Turn cancelled", request=request)
        stream = bool(kwargs.get("stream", False))
        inner = cancel.http_client(timeout=self.timeout, trust_env=False)
        try:
            response = inner.send(request, *args, **kwargs)
        except Exception:
            cancel.discard_client(inner)
            if cancel.is_set():
                raise httpx.RequestError("Turn cancelled", request=request)
            raise
        if not stream:
            cancel.discard_client(inner)
        return response
