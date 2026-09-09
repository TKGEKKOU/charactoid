from types import SimpleNamespace
from pathlib import Path

from langchain_core.messages import HumanMessage

from agents.context import PersonaAgentContext
from agents.multimodal import message_text, user_turn_content
from agents.service import PersonaAgentService


PNG = bytes.fromhex(
    "89504e470d0a1a0a0000000d49484452000000010000000108060000001f15c489"
    "0000000a4944415478da63000000020001005e738a240000000049454e44ae426082"
)


class _Session:
    def close(self) -> None:
        return None


def _context(**kwargs) -> PersonaAgentContext:
    values = {
        "persona_id": "persona-a",
        "workspace_id": "local-default",
        "knowledge_space_ids": ("space-a",),
        "conversation_id": "thread-a",
        "persona_name": "Ames",
        "persona_type": "character",
    }
    values.update(kwargs)
    return PersonaAgentContext(**values)


def test_user_turn_content_stays_string_without_images():
    content = user_turn_content("你好", _context())
    assert content == "你好"


def test_user_turn_content_inlines_selected_image(tmp_path, monkeypatch):
    image = tmp_path / "cat.png"
    image.write_bytes(PNG)

    class Attachment:
        storage_path = str(image)
        mime_type = "image/png"

    monkeypatch.setattr("agents.multimodal.resolve_attachment", lambda *args, **kwargs: Attachment())

    content = user_turn_content(
        "看看这张图",
        _context(
            attachment_ids=("img-1",),
            attachment_manifest=(
                {
                    "file_id": "img-1",
                    "name": "cat.png",
                    "mime_type": "image/png",
                    "kind": "image",
                    "selected": True,
                    "uses": ["vision"],
                },
            ),
            session_factory=_Session,
        ),
    )

    assert isinstance(content, list)
    assert content[0] == {"type": "text", "text": "看看这张图"}
    assert content[1]["type"] == "image_url"
    url = content[1]["image_url"]["url"]
    assert url.startswith("data:image/png;base64,")
    assert "\\" not in url
    assert ":\\" not in url
    assert str(image) not in url


def test_user_turn_content_ignores_non_image_attachments(tmp_path, monkeypatch):
    monkeypatch.setattr("agents.multimodal.resolve_attachment", lambda *args, **kwargs: (_ for _ in ()).throw(AssertionError("should not read")))
    content = user_turn_content(
        "变声",
        _context(
            attachment_ids=("aud-1",),
            attachment_manifest=(
                {
                    "file_id": "aud-1",
                    "name": "voice.wav",
                    "mime_type": "audio/wav",
                    "kind": "audio",
                    "selected": True,
                    "uses": ["rvc"],
                },
            ),
            session_factory=_Session,
        ),
    )
    assert content == "变声"


def test_message_text_reads_multimodal_text_parts():
    assert message_text("plain") == "plain"
    assert message_text([
        {"type": "text", "text": "看看这张图"},
        {"type": "image_url", "image_url": {"url": "data:image/png;base64,xx"}},
    ]) == "看看这张图"


def test_stream_query_sends_image_url_content(tmp_path, monkeypatch):
    image = tmp_path / "cat.png"
    image.write_bytes(PNG)
    captured = {}

    class Attachment:
        storage_path = str(image)
        mime_type = "image/png"

    class Graph:
        def stream(self, state, *args, **kwargs):
            captured["messages"] = state["messages"]
            return iter(())

        def get_state(self, config):
            return SimpleNamespace(values={"messages": []}, interrupts=())

    monkeypatch.setattr("agents.multimodal.resolve_attachment", lambda *args, **kwargs: Attachment())
    service = PersonaAgentService(checkpointer=object())
    service._workflow = Graph()
    list(
        service.stream_query(
            "描述图片",
            _context(
                attachment_ids=("img-1",),
                attachment_manifest=(
                    {
                        "file_id": "img-1",
                        "name": "cat.png",
                        "mime_type": "image/png",
                        "kind": "image",
                        "selected": True,
                        "uses": ["vision"],
                    },
                ),
                session_factory=_Session,
            ),
        )
    )
    message = captured["messages"][0]
    assert isinstance(message, HumanMessage)
    assert isinstance(message.content, list)
    assert any(part.get("type") == "image_url" for part in message.content if isinstance(part, dict))
