import json
from pathlib import Path

from langchain_core.output_parsers import StrOutputParser
from langchain_core.prompts import PromptTemplate
from langchain_text_splitters import RecursiveCharacterTextSplitter
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models import DocumentJob, KnowledgeSpace, Persona, PersonaDraft
from persona.service import LOCAL_WORKSPACE_ID
from rag.llm import get_llm


ANALYSIS_PROMPT = PromptTemplate(
    template=(
        "阅读以下资料，生成适合对话的角色。倾向：{mode}。只用中文。\n"
        "character：仅当资料本身在介绍或设定可扮演人物时，才用该人物的名字和人设；"
        "若资料是面试题、知识、说明书、记录或产品介绍，不要把文中出现的岗位、产品、模型、示例 Agent 当成人物，"
        "改为生成能依据这些资料回答的助手，名称用资料主题。\n"
        "expert：只生成资料领域助手，不扮演文中人物。\n"
        "禁止输出未描述、英文报错、模型名。\n"
        "仅输出 JSON object：{{\"name\":\"不超过20字\",\"description\":\"不超过120字\","
        "\"candidates\":[{{\"name\":\"...\",\"description\":\"...\"}}]}}。\n"
        "candidates 仅在资料明确给出多个可扮演人物且每人有可写设定时填写，否则必须是空数组。\n\n"
        "资料：\n{content}"
    ),
    input_variables=["mode", "content"],
)

CANDIDATE_PROMPT = PromptTemplate(
    template=(
        "Extract every explicitly configured fictional or assistant persona from this Markdown chunk. "
        "Do not include authors, quoted people, interviewees, or incidental people. "
        "Return JSON only: {{\"candidates\":[{{\"name\":\"...\",\"identity\":\"...\","
        "\"personality\":\"...\",\"voice\":\"...\",\"background\":\"...\","
        "\"relationships\":\"...\",\"boundaries\":\"...\",\"evidence\":\"...\"}}]}}.\n\n"
        "Markdown:\n{content}"
    ),
    input_variables=["content"],
)


PROFILE_FIELDS = (
    "identity",
    "personality",
    "voice",
    "background",
    "relationships",
    "boundaries",
    "evidence",
)


def markdown_chunks(previews: list[str], size: int = 4000) -> list[str]:
    content = "\n\n---\n\n".join(previews)
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=size,
        chunk_overlap=min(400, size // 4),
        separators=["\n## ", "\n### ", "\n\n", "\n", "。", ".", " ", ""],
    )
    return splitter.split_text(content)


def _json_payload(raw: str) -> object:
    normalized = raw.strip()
    if normalized.startswith("```") and normalized.endswith("```"):
        normalized = "\n".join(normalized.splitlines()[1:-1]).strip()
    return json.loads(normalized)


def _normalize_candidates(payload: object) -> list[dict]:
    items = payload.get("candidates", []) if isinstance(payload, dict) else payload
    if not isinstance(items, list):
        return []
    candidates: list[dict] = []
    for item in items:
        if not isinstance(item, dict):
            continue
        name = str(item.get("name", "")).strip()[:255]
        profile = {
            key: str(item.get(key, "")).strip()[:500]
            for key in PROFILE_FIELDS
            if str(item.get(key, "")).strip()
        }
        description = str(item.get("description", "")).strip()[:500]
        if not description:
            description = " ".join(profile.get(key, "") for key in ("identity", "personality", "voice") if profile.get(key))[:500]
        if not name:
            continue
        profile["description"] = description
        profile["generation_mode"] = "character"
        candidates.append({"name": name, "profile": profile})
    return candidates


def merge_candidates(existing: list[dict], incoming: list[dict]) -> list[dict]:
    merged = list(existing)
    for candidate in incoming:
        candidate_profile = candidate.get("profile") or {}
        candidate_identity = str(candidate_profile.get("identity", "")).strip().casefold()
        match = None
        for current in merged:
            if str(current.get("name", "")).strip().casefold() != candidate["name"].casefold():
                continue
            current_identity = str((current.get("profile") or {}).get("identity", "")).strip().casefold()
            if not current_identity or not candidate_identity or current_identity == candidate_identity:
                match = current
                break
        if match is None:
            merged.append(candidate)
            continue
        profile = match.setdefault("profile", {})
        for key, value in candidate_profile.items():
            value = str(value).strip()
            current_value = str(profile.get(key, "")).strip()
            if value and not current_value:
                profile[key] = value[:500]
            elif value and value != current_value and value not in current_value:
                profile[key] = f"{current_value}；{value}"[:500]
    return merged


def identify_candidates(previews: list[str]) -> list[dict]:
    candidates: list[dict] = []
    for chunk in markdown_chunks(previews):
        try:
            raw = (CANDIDATE_PROMPT | get_llm() | StrOutputParser()).invoke({"content": chunk})
            chunk_candidates = _normalize_candidates(_json_payload(raw))
        except Exception:
            continue
        candidates = merge_candidates(candidates, chunk_candidates)
    for index, candidate in enumerate(candidates, start=1):
        candidate["id"] = f"candidate-{index}"
    return candidates


def fallback_identity(mode: str, filename: str) -> tuple[str, dict]:
    stem = Path(filename).stem.strip()[:16] or "资料"
    name = stem if mode == "character" else f"{stem}专家"
    description = "依据上传资料回答问题。" if mode == "character" else "提供上传资料相关的专业解答。"
    return name[:20], {"description": description, "generation_mode": mode}


def _clean_text(value: object, limit: int = 500) -> str:
    text = str(value or "").strip()
    for token in ("未描述", "Not specified", "not specified", "N/A", "n/a"):
        text = text.replace(token, " ")
    return " ".join(text.split())[:limit]


def _is_noise_name(name: str) -> bool:
    compact = name.strip()
    if not compact:
        return True
    lowered = compact.casefold()
    if any(token in lowered for token in ("gpt", "claude", "gemini", "opus", "clawbot", "chatgpt", "llm")):
        return True
    if any(ch.isdigit() for ch in compact) and "." in compact:
        return True
    return False


def _candidate_from_item(item: dict, mode: str) -> dict | None:
    name = _clean_text(item.get("name"), 20)
    description = _clean_text(item.get("description") or item.get("identity"), 500)
    if _is_noise_name(name) or len(description) < 8:
        return None
    if any(token in description for token in ("示例", "专职Agent", "专职 Agent")) and len(description) < 40:
        return None
    return {
        "name": name,
        "profile": {"description": description, "generation_mode": mode},
    }


def analyze_materials(mode: str, previews: list[str], fallback: tuple[str, dict]) -> tuple[str, dict]:
    name, profile, _candidates = analyze_draft_pack(mode, previews, fallback)
    return name, profile


def analyze_draft_pack(mode: str, previews: list[str], fallback: tuple[str, dict]) -> tuple[str, dict, list[dict]]:
    content = "\n\n---\n\n".join(previews)[:16000]
    try:
        raw = (ANALYSIS_PROMPT | get_llm() | StrOutputParser()).invoke({"mode": mode, "content": content})
        payload = _json_payload(raw)
        if not isinstance(payload, dict):
            return (*fallback, [])
        name = _clean_text(payload.get("name"), 20) or fallback[0]
        description = _clean_text(payload.get("description"), 500) or fallback[1].get("description", "")
        profile = {"description": description, "generation_mode": mode}
        candidates: list[dict] = []
        if mode == "character":
            for item in payload.get("candidates") or []:
                if not isinstance(item, dict):
                    continue
                candidate = _candidate_from_item(item, mode)
                if candidate:
                    candidates.append(candidate)
            candidates = merge_candidates([], candidates)
            for index, candidate in enumerate(candidates, start=1):
                candidate["id"] = f"candidate-{index}"
        if name and description:
            return name, profile, candidates
    except Exception:
        pass
    return (*fallback, [])


def create_draft(session: Session, mode: str) -> PersonaDraft:
    space = KnowledgeSpace(workspace_id=LOCAL_WORKSPACE_ID)
    session.add(space)
    session.flush()
    draft = PersonaDraft(
        workspace_id=LOCAL_WORKSPACE_ID,
        knowledge_space_id=space.id,
        mode=mode,
        persona_type="knowledge_expert",
        candidates_json=[],
        suggested_name="资料角色",
        profile_json={"generation_mode": mode},
    )
    session.add(draft)
    session.commit()
    session.refresh(draft)
    return draft


def get_draft(session: Session, draft_id: str) -> PersonaDraft | None:
    draft = session.get(PersonaDraft, draft_id)
    if draft is None or draft.workspace_id != LOCAL_WORKSPACE_ID:
        return None
    return draft


def draft_documents(session: Session, draft: PersonaDraft) -> list[DocumentJob]:
    statement = select(DocumentJob).where(
        DocumentJob.workspace_id == LOCAL_WORKSPACE_ID,
        DocumentJob.knowledge_space_id == draft.knowledge_space_id,
    ).order_by(DocumentJob.created_at, DocumentJob.id)
    return list(session.scalars(statement))


def confirm_draft(session: Session, draft: PersonaDraft) -> Persona:
    locked_draft = session.scalar(
        select(PersonaDraft)
        .where(PersonaDraft.id == draft.id)
        .with_for_update()
        .execution_options(populate_existing=True)
    )
    if locked_draft is None:
        raise ValueError("PERSONA_DRAFT_NOT_FOUND")
    draft = locked_draft
    if draft.persona_id:
        return session.get(Persona, draft.persona_id)
    persona = Persona(
        workspace_id=LOCAL_WORKSPACE_ID,
        knowledge_space_id=draft.knowledge_space_id,
        name=draft.suggested_name,
        persona_type=draft.persona_type,
        profile_json=draft.profile_json,
        status="ready",
    )
    session.add(persona)
    session.flush()
    draft.persona_id = persona.id
    draft.status = "confirmed"
    session.commit()
    session.refresh(persona)
    return persona
