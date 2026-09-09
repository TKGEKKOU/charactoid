"""Tool dispatch normalizes timeout/abort instead of failing the whole turn."""

from types import SimpleNamespace

from agents.cancellation import TurnCancel, TurnCancelled, set_current_turn_cancel
from agents.graph.middleware import _dispatch_tool_call


def _request(name: str = "web_search"):
    return SimpleNamespace(tool_call={"id": "call-1", "name": name})


def test_abort_before_dispatch_skips_handler():
    called = []
    cancel = TurnCancel()
    cancel.abort()
    set_current_turn_cancel(cancel)
    try:
        message = _dispatch_tool_call(
            _request(),
            lambda request: called.append(request) or "should-not-run",
        )
    finally:
        set_current_turn_cancel(None)

    assert called == []
    assert "aborted_before_dispatch" in str(message.content)


def test_timeout_becomes_tool_result():
    def handler(_request):
        raise TimeoutError("slow tool")

    message = _dispatch_tool_call(_request("retrieve_knowledge"), handler)
    assert "timeout" in str(message.content)
    assert message.status == "error"


def test_turn_cancelled_during_handler_becomes_aborted_result():
    def handler(_request):
        raise TurnCancelled("Turn cancelled")

    message = _dispatch_tool_call(_request(), handler)
    assert "aborted" in str(message.content)
    assert "aborted_before_dispatch" not in str(message.content)


def test_unrelated_error_still_raises():
    def handler(_request):
        raise ValueError("boom")

    try:
        _dispatch_tool_call(_request(), handler)
    except ValueError as exc:
        assert "boom" in str(exc)
    else:
        raise AssertionError("expected ValueError")
