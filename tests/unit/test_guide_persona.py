from types import SimpleNamespace

from persona.guide import (
    GUIDE_CATALOG_ID,
    is_builtin_profile,
    is_guide_profile,
    reply_without_llm,
    should_use_preset_replies,
)


def test_guide_profile_flags():
    profile = {"catalog_id": GUIDE_CATALOG_ID, "builtin": True, "guide": True}
    assert is_guide_profile(profile)
    assert is_builtin_profile(profile)
    assert not is_guide_profile({"description": "普通角色"})


def test_preset_replies_cover_onboarding():
    hello = reply_without_llm("你好")
    assert "系统" in hello and "服务" in hello
    setup = reply_without_llm("怎么配置 API Key")
    assert "LLM" in setup or "API Key" in setup
    create = reply_without_llm("怎么创建角色")
    assert "创建角色" in create
    fallback = reply_without_llm("随便问问天气")
    assert "系统" in fallback and "服务" in fallback


def test_preset_only_when_guide_and_no_llm(monkeypatch):
    monkeypatch.setattr("persona.guide.llm_configured", lambda settings=None: False)
    context = SimpleNamespace(persona_profile={"catalog_id": GUIDE_CATALOG_ID, "guide": True})
    assert should_use_preset_replies(context) is True
    monkeypatch.setattr("persona.guide.llm_configured", lambda settings=None: True)
    assert should_use_preset_replies(context) is False
    monkeypatch.setattr("persona.guide.llm_configured", lambda settings=None: False)
    other = SimpleNamespace(persona_profile={"catalog_id": "other"})
    assert should_use_preset_replies(other) is False
