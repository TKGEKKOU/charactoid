"""Build the current user turn for the LLM.

Selected images are inlined as data URLs. Storage paths never leave this module.
"""

from __future__ import annotations

import base64
import logging
from io import BytesIO
from pathlib import Path
from typing import Any

from agents.context import PersonaAgentContext
from app.attachments import resolve_attachment
from settings import Settings


logger = logging.getLogger(__name__)

_MAX_VISION_IMAGES = 4
_MAX_RAW_BYTES = 8 * 1024 * 1024
_MAX_INLINE_BYTES = 1_500_000
_IMAGE_MIME = {
    "image/png",
    "image/jpeg",
    "image/jpg",
    "image/webp",
    "image/gif",
}


def message_text(content: Any) -> str:
    if isinstance(content, str):
        return content
    if not isinstance(content, list):
        return ""
    parts: list[str] = []
    for part in content:
        if isinstance(part, str):
            parts.append(part)
            continue
        if not isinstance(part, dict):
            continue
        ptype = str(part.get("type") or "")
        if ptype in {"text", "output_text", ""}:
            text = part.get("text")
            if text:
                parts.append(str(text))
    return "\n".join(parts)


def user_turn_content(question: str, context: PersonaAgentContext) -> str | list[dict[str, Any]]:
    text = str(question or "").strip()
    images = _selected_image_parts(context)
    if not images:
        return text or str(question or "")
    if not text:
        text = "请查看图片。"
    return [{"type": "text", "text": text}, *images]


def _selected_image_parts(context: PersonaAgentContext) -> list[dict[str, Any]]:
    selected = {str(item) for item in context.attachment_ids if item}
    if not selected:
        return []
    parts: list[dict[str, Any]] = []
    for item in context.attachment_manifest:
        file_id = str(item.get("file_id") or "")
        if file_id not in selected:
            continue
        if str(item.get("kind") or "") != "image":
            continue
        name = str(item.get("name") or file_id)
        part = _image_content_part(context, file_id, item)
        if part is None:
            parts.append({"type": "text", "text": f"（未能读取图片：{name}）"})
        else:
            parts.append(part)
        if len(parts) >= _MAX_VISION_IMAGES:
            break
    return parts


def _image_content_part(context: PersonaAgentContext, file_id: str, item: dict[str, Any]) -> dict[str, Any] | None:
    session_factory = context.session_factory
    if session_factory is None:
        return None
    session = session_factory()
    try:
        attachment = resolve_attachment(
            session,
            Settings.load().project_root,
            context.conversation_id,
            file_id,
            workspace_id=context.workspace_id,
        )
        path = Path(attachment.storage_path)
        mime = _safe_image_mime(item.get("mime_type") or getattr(attachment, "mime_type", ""), path.name)
        data_url = _path_to_data_url(path, mime)
        if not data_url:
            return None
        return {"type": "image_url", "image_url": {"url": data_url}}
    except Exception:
        logger.exception("failed to inline conversation image %s", file_id)
        return None
    finally:
        closer = getattr(session, "close", None)
        if callable(closer):
            closer()


def _safe_image_mime(mime: Any, name: str) -> str:
    value = str(mime or "").split(";", 1)[0].strip().lower()
    if value in _IMAGE_MIME:
        return "image/jpeg" if value == "image/jpg" else value
    lower = name.lower()
    if lower.endswith(".png"):
        return "image/png"
    if lower.endswith(".webp"):
        return "image/webp"
    if lower.endswith(".gif"):
        return "image/gif"
    return "image/jpeg"


def _path_to_data_url(path: Path, mime: str) -> str | None:
    try:
        data = path.read_bytes()
    except OSError:
        return None
    if not data:
        return None
    if len(data) > _MAX_RAW_BYTES:
        encoded = _compressed_jpeg(path)
    elif len(data) > _MAX_INLINE_BYTES:
        encoded = _compressed_jpeg(path) or (mime, data)
    else:
        encoded = (mime, data)
    if not encoded:
        return None
    out_mime, payload = encoded
    if len(payload) > _MAX_RAW_BYTES:
        return None
    return f"data:{out_mime};base64,{base64.b64encode(payload).decode('ascii')}"


def _compressed_jpeg(path: Path) -> tuple[str, bytes] | None:
    try:
        from PIL import Image
    except Exception:
        return None
    try:
        with Image.open(path) as image:
            rgb = image.convert("RGB")
            rgb.thumbnail((1568, 1568))
            buffer = BytesIO()
            rgb.save(buffer, format="JPEG", quality=85, optimize=True)
            payload = buffer.getvalue()
        return ("image/jpeg", payload) if payload else None
    except Exception:
        logger.exception("failed to compress conversation image")
        return None
