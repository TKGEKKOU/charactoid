"""Capability-page role assignment API.

This is the product surface for assigning Skill / Tool / MCP to personas.
It writes the existing CapabilityPolicy and MCP grant stores; it does not
introduce a third permission model.
"""

from __future__ import annotations

from typing import Literal

from fastapi import APIRouter, Depends, HTTPException, Request
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.orm import Session

from agents.assignment import (
    inherited_assigned,
    next_allowed_persona_ids,
    override_for_toggle,
    policy_map,
    skill_capability_id,
    sync_mcp_wildcard_policy,
)
from agents.policy import CapabilityPolicyStore
from agents.registry import capability_catalog, tool_specs
from agents.skills import list_skills
from app.database import get_session
from app.models import Persona
from app.routers.mcp import _manager
from integrations.mcp.config import GLOBAL_ALL
from persona.service import LOCAL_WORKSPACE_ID


router = APIRouter(prefix="/api/capabilities", tags=["capabilities"])

_WORKER_LABELS = {
    "knowledge_worker": "知识(Knowledge)",
    "memory_worker": "记忆(Memory)",
    "document_worker": "文档(Document)",
    "profile_worker": "人设(Profile)",
    "voice_worker": "语音(Voice)",
    "rvc_worker": "变声(RVC)",
    "live2d_worker": "Live2D",
    "config_worker": "配置(Config)",
    "mcp": "MCP",
}


class AssignmentPatch(BaseModel):
    persona_id: str = Field(..., min_length=1)
    kind: Literal["skill", "tool", "mcp"]
    id: str = Field(..., min_length=1)
    assigned: bool


_TOOL_DESCRIPTIONS = {
    spec.name: str(getattr(spec.tool, "description", "") or "")
    for spec in tool_specs()
}


def _store(request: Request) -> CapabilityPolicyStore:
    return CapabilityPolicyStore(request.app.state.session_factory)


def _local_personas(session: Session) -> list[Persona]:
    statement = (
        select(Persona)
        .where(Persona.workspace_id == LOCAL_WORKSPACE_ID)
        .order_by(Persona.created_at, Persona.id)
    )
    return list(session.scalars(statement))


def _require_persona(persona_id: str, personas: list[Persona]) -> None:
    if persona_id == GLOBAL_ALL:
        return
    if not any(item.id == persona_id for item in personas):
        raise HTTPException(status_code=404, detail="Persona not found")


def _skill_item(skill) -> dict:
    return {
        "kind": "skill",
        "id": skill_capability_id(skill.name),
        "name": skill.name,
        "group": (skill.metadata or {}).get("category") or ("内置" if skill.builtin else "自定义"),
        "builtin": bool(skill.builtin),
        "default_assigned": bool(skill.builtin),
        "enabled": bool(skill.enabled),
        "trusted": bool(skill.trusted),
        "description": skill.description,
        "locked": False,
    }


def _tool_item(descriptor) -> dict:
    is_mcp = descriptor.source == "mcp"
    return {
        "kind": "tool",
        "id": descriptor.capability_id,
        "name": descriptor.name,
        "group": "MCP" if is_mcp else _WORKER_LABELS.get(descriptor.specialist, descriptor.specialist or "其他"),
        "builtin": descriptor.source == "builtin",
        "default_assigned": bool(descriptor.default_allowed),
        "source": descriptor.source,
        "server": descriptor.server,
        "specialist": descriptor.specialist,
        "description": _TOOL_DESCRIPTIONS.get(descriptor.name, ""),
        "locked": is_mcp,
    }


def _mcp_item(config) -> dict:
    return {
        "kind": "mcp",
        "id": config.name,
        "name": config.name,
        "group": "MCP",
        "builtin": False,
        "default_assigned": False,
        "description": config.description,
        "enabled": bool(config.enabled),
        "allowed_persona_ids": list(config.allowed_persona_ids),
        "locked": False,
    }


@router.get("/assignments")
def get_assignments(request: Request, session: Session = Depends(get_session)) -> dict:
    personas = _local_personas(session)
    store = _store(request)
    policies = policy_map(store.list_all())
    manager = getattr(request.app.state, "mcp_manager", None)
    servers = list(manager.list_configs()) if manager is not None else []
    items = (
        [_skill_item(skill) for skill in list_skills()]
        + [_mcp_item(config) for config in servers]
        + [_tool_item(item) for item in capability_catalog().list()]
    )
    overrides: dict[str, dict[str, bool]] = {}
    for (persona_id, capability_id), enabled in policies.items():
        overrides.setdefault(persona_id, {})[capability_id] = enabled
    return {
        "personas": [{"id": item.id, "name": item.name} for item in personas],
        "items": items,
        "overrides": overrides,
    }


@router.patch("/assignments")
def patch_assignment(
    payload: AssignmentPatch,
    request: Request,
    session: Session = Depends(get_session),
) -> dict:
    personas = _local_personas(session)
    _require_persona(payload.persona_id, personas)
    store = _store(request)
    persona_ids = [item.id for item in personas]

    if payload.kind == "mcp":
        manager = _manager(request)
        config = manager.get_config(payload.id)
        if config is None:
            raise HTTPException(status_code=404, detail="MCP 服务器不存在")
        config.allowed_persona_ids = next_allowed_persona_ids(
            config.allowed_persona_ids,
            payload.persona_id,
            payload.assigned,
            persona_ids,
        )
        servers = [item if item.name != config.name else config for item in manager.list_configs()]
        try:
            manager.save_configs(servers)
        except ValueError as exc:
            raise HTTPException(status_code=422, detail=str(exc)) from exc
        from agents.mcp_grants import refresh_grants

        refresh_grants()
        sync_mcp_wildcard_policy(store, config.name, config.allowed_persona_ids)
        return get_assignments(request, session)

    if payload.kind == "skill":
        skills = {skill_capability_id(skill.name): skill for skill in list_skills()}
        skill = skills.get(payload.id)
        if skill is None:
            raise HTTPException(status_code=404, detail="Skill not found")
        default_assigned = bool(skill.builtin)
        capability_id = payload.id
    else:
        catalog = {item.capability_id: item for item in capability_catalog().list()}
        descriptor = catalog.get(payload.id)
        if descriptor is None:
            raise HTTPException(status_code=404, detail="Tool not found")
        if descriptor.source == "mcp":
            raise HTTPException(status_code=422, detail="MCP 工具请按服务授权，不要单独分配")
        default_assigned = bool(descriptor.default_allowed)
        capability_id = payload.id

    policies = policy_map(store.list_all())
    inherited = inherited_assigned(
        persona_id=payload.persona_id,
        capability_id=capability_id,
        default_assigned=default_assigned,
        policies=policies,
    )
    try:
        store.set_overrides(
            payload.persona_id,
            {capability_id: override_for_toggle(assigned=payload.assigned, inherited=inherited)},
        )
    except ValueError as exc:
        raise HTTPException(status_code=422, detail=str(exc)) from exc
    return get_assignments(request, session)
