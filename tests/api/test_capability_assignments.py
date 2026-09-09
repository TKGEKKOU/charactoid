from integrations.mcp.config import MCPServerConfig


def test_assignment_snapshot_and_role_toggles(client, tmp_path, monkeypatch):
    import agents.mcp_grants as grants_module
    import agents.skills as skills_module

    monkeypatch.setattr(skills_module, "USER_SKILL_DIR", tmp_path / "skills")
    (tmp_path / "skills").mkdir()
    manager = client.app.state.mcp_manager
    monkeypatch.setattr(manager, "config_path", tmp_path / "mcp_servers.json")
    monkeypatch.setattr(grants_module, "_config_path", tmp_path / "mcp_servers.json")
    manager.save_configs(
        [
            MCPServerConfig(
                name="filesystem",
                transport="stdio",
                command="python",
                args=["-m", "demo_mcp"],
            )
        ]
    )
    grants_module.refresh_grants()

    alpha = client.post("/api/personas", json={"name": "Alpha"}).json()
    beta = client.post("/api/personas", json={"name": "Beta"}).json()
    created = client.post(
        "/api/skills",
        json={
            "name": "custom_notes",
            "description": "notes",
            "instructions": "Use when taking notes.",
        },
    )
    assert created.status_code == 201

    snapshot = client.get("/api/capabilities/assignments")
    assert snapshot.status_code == 200
    body = snapshot.json()
    assert {item["name"] for item in body["personas"]} == {"Alpha", "Beta"}
    custom = next(item for item in body["items"] if item["id"] == "skill/custom_notes")
    assert custom["default_assigned"] is False
    mcp = next(item for item in body["items"] if item["kind"] == "mcp" and item["id"] == "filesystem")
    assert mcp["allowed_persona_ids"] == []

    denied = client.patch(
        "/api/capabilities/assignments",
        json={"persona_id": "missing", "kind": "skill", "id": "skill/custom_notes", "assigned": True},
    )
    assert denied.status_code == 404

    assigned = client.patch(
        "/api/capabilities/assignments",
        json={
            "persona_id": alpha["id"],
            "kind": "skill",
            "id": "skill/custom_notes",
            "assigned": True,
        },
    )
    assert assigned.status_code == 200
    assert assigned.json()["overrides"][alpha["id"]]["skill/custom_notes"] is True

    granted = client.patch(
        "/api/capabilities/assignments",
        json={"persona_id": "*", "kind": "mcp", "id": "filesystem", "assigned": True},
    )
    assert granted.status_code == 200
    mcp = next(item for item in granted.json()["items"] if item["kind"] == "mcp" and item["id"] == "filesystem")
    assert mcp["allowed_persona_ids"] == ["*"]
    assert grants_module.allowed_servers_for_persona(beta["id"]) == {"filesystem"}
    assert granted.json()["overrides"]["*"]["mcp/filesystem/*"] is True

    narrowed = client.patch(
        "/api/capabilities/assignments",
        json={"persona_id": beta["id"], "kind": "mcp", "id": "filesystem", "assigned": False},
    )
    assert narrowed.status_code == 200
    mcp = next(item for item in narrowed.json()["items"] if item["kind"] == "mcp" and item["id"] == "filesystem")
    assert mcp["allowed_persona_ids"] == [alpha["id"]]
    assert grants_module.allowed_servers_for_persona(beta["id"]) == set()
    assert grants_module.allowed_servers_for_persona(alpha["id"]) == {"filesystem"}
    overrides = narrowed.json()["overrides"]
    assert overrides.get("*", {}).get("mcp/filesystem/*") is None
    assert overrides[alpha["id"]]["mcp/filesystem/*"] is True
    assert "mcp/filesystem/*" not in overrides.get(beta["id"], {})

    revoked = client.patch(
        "/api/capabilities/assignments",
        json={"persona_id": alpha["id"], "kind": "mcp", "id": "filesystem", "assigned": False},
    )
    assert revoked.status_code == 200
    mcp = next(item for item in revoked.json()["items"] if item["kind"] == "mcp" and item["id"] == "filesystem")
    assert mcp["allowed_persona_ids"] == []
    leftover = [
        (persona_id, cap)
        for persona_id, caps in revoked.json()["overrides"].items()
        for cap in caps
        if cap == "mcp/filesystem/*"
    ]
    assert leftover == []

    locked = next((item for item in snapshot.json()["items"] if item.get("locked")), None)
    if locked is not None:
        denied_tool = client.patch(
            "/api/capabilities/assignments",
            json={"persona_id": alpha["id"], "kind": "tool", "id": locked["id"], "assigned": True},
        )
        assert denied_tool.status_code == 422

    blocked = client.patch(
        "/api/capabilities/assignments",
        json={
            "persona_id": alpha["id"],
            "kind": "tool",
            "id": "builtin/search_persona_knowledge",
            "assigned": False,
        },
    )
    assert blocked.status_code == 200
    assert blocked.json()["overrides"][alpha["id"]]["builtin/search_persona_knowledge"] is False
