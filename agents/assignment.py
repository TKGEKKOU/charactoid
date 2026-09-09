"""Role assignment helpers for Skill / Tool / MCP.

Runtime still uses two enforcement layers:

- MCP grants (``allowed_persona_ids``): fail-closed server visibility
- CapabilityPolicy: per-capability allow/deny, with MCP tools default-denied

This module keeps those layers aligned so assigning an MCP server to a role
also enables ``mcp/{server}/*``. The capabilities page is the product surface;
the role workbench continues to consume the same stores.
"""

from __future__ import annotations

from collections.abc import Iterable, Mapping, Sequence

from agents.policy import CapabilityPolicyStore


def skill_capability_id(name: str) -> str:
    return f"skill/{name}"


def mcp_wildcard_id(server: str) -> str:
    return f"mcp/{server}/*"


def next_allowed_persona_ids(
    current: Sequence[str],
    persona_id: str,
    assigned: bool,
    all_persona_ids: Sequence[str],
) -> list[str]:
    """Compute the next MCP grant list without silently wiping other roles.

    Unchecking one persona while ``*`` is set expands to every other current
    role instead of clearing the whole ACL. Future roles stay fail-closed
    unless the user explicitly chooses ``*`` again.
    """

    persona_id = str(persona_id or "").strip()
    current_ids = [str(item).strip() for item in current if str(item).strip()]
    known = [str(item).strip() for item in all_persona_ids if str(item).strip()]
    if persona_id == "*":
        return ["*"] if assigned else []
    if "*" in current_ids:
        if assigned:
            return ["*"]
        return sorted(item for item in known if item != persona_id)
    ids = {item for item in current_ids if item != "*"}
    if assigned:
        ids.add(persona_id)
    else:
        ids.discard(persona_id)
    return sorted(ids)


def sync_mcp_wildcard_policy(
    store: CapabilityPolicyStore,
    server_name: str,
    allowed_persona_ids: Iterable[str],
) -> None:
    """Enable ``mcp/{server}/*`` for granted roles so MCP tools become usable.

    Star and concrete persona overrides must not coexist. A leftover persona
    True after revoke would keep tools enabled; a leftover persona False after
    a later global grant would hide tools from that role.
    """

    cap = mcp_wildcard_id(server_name)
    granted = [str(item).strip() for item in allowed_persona_ids if str(item).strip()]
    existing_ids = {
        item.persona_id
        for item in store.list_all()
        if item.capability_id == cap
    }
    if "*" in granted:
        store.set_overrides("*", {cap: True})
        for persona_id in existing_ids:
            if persona_id != "*":
                store.set_overrides(persona_id, {cap: None})
        return
    store.set_overrides("*", {cap: None})
    granted_set = set(granted)
    for persona_id in existing_ids:
        if persona_id != "*" and persona_id not in granted_set:
            store.set_overrides(persona_id, {cap: None})
    for persona_id in granted:
        store.set_overrides(persona_id, {cap: True})


def policy_map(policies) -> dict[tuple[str, str], bool]:
    return {(item.persona_id, item.capability_id): item.enabled for item in policies}


def inherited_assigned(
    *,
    persona_id: str,
    capability_id: str,
    default_assigned: bool,
    policies: Mapping[tuple[str, str], bool],
) -> bool:
    if persona_id != "*":
        starred = policies.get(("*", capability_id))
        if starred is not None:
            return starred
    return default_assigned


def effective_assigned(
    *,
    persona_id: str,
    capability_id: str,
    default_assigned: bool,
    policies: Mapping[tuple[str, str], bool],
) -> bool:
    explicit = policies.get((persona_id, capability_id))
    if explicit is not None:
        return explicit
    return inherited_assigned(
        persona_id=persona_id,
        capability_id=capability_id,
        default_assigned=default_assigned,
        policies=policies,
    )


def override_for_toggle(*, assigned: bool, inherited: bool) -> bool | None:
    """Persist True/False, or None to inherit the parent default."""

    return None if assigned == inherited else assigned
