"""Built-in guide persona: catalog seed and no-LLM preset replies."""

from __future__ import annotations

import json
import logging
from pathlib import Path

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import Persona
from persona.service import LOCAL_WORKSPACE_ID, create_persona
from settings import Settings

logger = logging.getLogger(__name__)

GUIDE_CATALOG_ID = "charactoid-guide"
CATALOG_DIR = Path(__file__).resolve().parent.parent / "catalog" / "guide-persona"


class BuiltinPersonaProtected(Exception):
    """Raised when a built-in persona cannot be deleted."""


def _load_json(path: Path) -> dict:
    return json.loads(path.read_text(encoding="utf-8"))


def is_guide_profile(profile: dict | None) -> bool:
    data = profile or {}
    return bool(data.get("catalog_id") == GUIDE_CATALOG_ID or data.get("guide") is True)


def is_builtin_profile(profile: dict | None) -> bool:
    data = profile or {}
    return bool(data.get("builtin") is True or is_guide_profile(data))


def llm_configured(settings: Settings | None = None) -> bool:
    active = settings or Settings.load()
    return bool(active.openai_api_key)


def should_use_preset_replies(context) -> bool:
    profile = getattr(context, "persona_profile", None) or {}
    return is_guide_profile(profile) and not llm_configured()


def _match_reply(question: str, payload: dict) -> str:
    text = (question or "").strip().casefold()
    for item in payload.get("patterns") or []:
        keys = item.get("keys") or []
        if any(str(key).casefold() in text for key in keys):
            return str(item.get("reply") or payload.get("default") or "")
    return str(payload.get("default") or "")


def reply_without_llm(question: str) -> str:
    replies_path = CATALOG_DIR / "replies.json"
    if not replies_path.is_file():
        return "请先到「系统 → 服务」配置对话模型 API Key。"
    payload = _load_json(replies_path)
    return _match_reply(question, payload).strip() or str(payload.get("default") or "")


def find_guide_persona(session: Session) -> Persona | None:
    personas = session.scalars(
        select(Persona).where(Persona.workspace_id == LOCAL_WORKSPACE_ID)
    )
    for persona in personas:
        if is_guide_profile(persona.profile_json):
            return persona
    return None


def _desired_profile() -> tuple[str, dict]:
    payload = _load_json(CATALOG_DIR / "persona.json")
    name = str(payload.get("name") or "向导")
    profile = dict(payload.get("profile") or {})
    profile["catalog_id"] = GUIDE_CATALOG_ID
    profile["builtin"] = True
    profile["guide"] = True
    return name, profile


def _seed_knowledge(session: Session, persona: Persona) -> None:
    knowledge_dir = CATALOG_DIR / "knowledge"
    if not knowledge_dir.is_dir():
        return
    from app.models import DocumentJob
    existing = {
        job.original_filename
        for job in session.scalars(
            select(DocumentJob).where(
                DocumentJob.workspace_id == persona.workspace_id,
                DocumentJob.knowledge_space_id == persona.knowledge_space_id,
                DocumentJob.status != "deleted",
            )
        )
    }
    # 启动时只写入资料任务，避免在 lifespan 里抢 Milvus 锁导致整段 seed 失败。
    for path in sorted(knowledge_dir.glob("*.md")):
        if path.name in existing:
            continue
        text = path.read_text(encoding="utf-8")
        session.add(
            DocumentJob(
                workspace_id=persona.workspace_id,
                knowledge_space_id=persona.knowledge_space_id,
                original_filename=path.name,
                markdown_filename=path.name,
                source_path=str(path),
                markdown_path=str(path),
                markdown_preview=text[:4000],
                status="preview_ready",
                document_type="markdown",
            )
        )


def ensure_guide_persona(session: Session) -> Persona:
    name, profile = _desired_profile()
    persona = find_guide_persona(session)
    if persona is None:
        persona = create_persona(session, name, profile)
    else:
        merged = {**(persona.profile_json or {}), **profile}
        persona.name = name
        persona.profile_json = merged
        persona.status = "ready"
    session.flush()
    _seed_knowledge(session, persona)
    session.commit()
    session.refresh(persona)
    return persona
