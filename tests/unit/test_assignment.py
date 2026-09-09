"""Role assignment helpers."""

from agents.assignment import (
    inherited_assigned,
    next_allowed_persona_ids,
    override_for_toggle,
    policy_map,
    sync_mcp_wildcard_policy,
)
from agents.capabilities import CapabilityPolicy
from agents.policy import CapabilityPolicyStore
from app.database import Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker


def test_unchecking_star_keeps_other_personas():
    assert next_allowed_persona_ids(["*"], "p2", False, ["p1", "p2", "p3"]) == ["p1", "p3"]
    assert next_allowed_persona_ids(["*"], "*", False, ["p1"]) == []
    assert next_allowed_persona_ids(["p1"], "p2", True, ["p1", "p2"]) == ["p1", "p2"]
    assert next_allowed_persona_ids(["p1", "p2"], "p1", False, ["p1", "p2"]) == ["p2"]


def test_override_toggle_inherits_default():
    assert override_for_toggle(assigned=True, inherited=True) is None
    assert override_for_toggle(assigned=False, inherited=True) is False
    assert override_for_toggle(assigned=True, inherited=False) is True
    assert override_for_toggle(assigned=False, inherited=False) is None


def test_star_policy_is_inherited_until_persona_overrides():
    policies = {("*", "skill/custom"): True}
    assert inherited_assigned(
        persona_id="p1",
        capability_id="skill/custom",
        default_assigned=False,
        policies=policies,
    ) is True
    assert policy_map([CapabilityPolicy("p1", "skill/custom", False)]) == {
        ("p1", "skill/custom"): False
    }


def test_sync_mcp_wildcard_writes_star_policy():
    engine = create_engine("sqlite://")
    Base.metadata.create_all(engine)
    store = CapabilityPolicyStore(sessionmaker(bind=engine, autoflush=False, expire_on_commit=False))
    sync_mcp_wildcard_policy(store, "fs", ["*"])
    assert ("*", "mcp/fs/*", True) in [
        (item.persona_id, item.capability_id, item.enabled) for item in store.list_all()
    ]
    sync_mcp_wildcard_policy(store, "fs", ["p1"])
    rows = {(item.persona_id, item.capability_id, item.enabled) for item in store.list_all()}
    assert ("p1", "mcp/fs/*", True) in rows
    assert ("*", "mcp/fs/*", True) not in rows
    sync_mcp_wildcard_policy(store, "fs", [])
    assert all(item.capability_id != "mcp/fs/*" for item in store.list_all())
    store.set_overrides("p2", {"mcp/fs/*": False})
    sync_mcp_wildcard_policy(store, "fs", ["*"])
    rows = {(item.persona_id, item.capability_id, item.enabled) for item in store.list_all()}
    assert ("*", "mcp/fs/*", True) in rows
    assert ("p2", "mcp/fs/*", False) not in rows
