"""Regression tests for the project-local FFmpeg download/install boundary."""

import sys
import types
from pathlib import Path


def _fake_imageio(monkeypatch, cached: Path):
    module = types.ModuleType("imageio_ffmpeg")
    module.get_ffmpeg_exe = lambda: str(cached)
    monkeypatch.setitem(sys.modules, "imageio_ffmpeg", module)


def test_ffmpeg_install_copies_and_validates_cached_binary(tmp_path, monkeypatch):
    from voice.ffmpeg_resources import FFmpegResourceManager

    cached = tmp_path / "cached-ffmpeg.exe"
    cached.write_text("binary", encoding="ascii")
    manager = FFmpegResourceManager(tmp_path)
    monkeypatch.setattr(manager, "_probe", lambda path: bool(path) and Path(path).is_file())
    _fake_imageio(monkeypatch, cached)

    result = manager.install()

    assert result["installed"] is True
    assert result["ready"] is True
    assert Path(result["managed_path"]).is_file()
    assert not (tmp_path / "runtime" / "ffmpeg" / "ffmpeg.exe.part").exists()


def test_ffmpeg_install_removes_invalid_partial(tmp_path, monkeypatch):
    from voice.ffmpeg_resources import FFmpegResourceManager

    cached = tmp_path / "cached-ffmpeg.exe"
    cached.write_text("not executable", encoding="ascii")
    manager = FFmpegResourceManager(tmp_path)
    monkeypatch.setattr(manager, "_probe", lambda path: False)
    _fake_imageio(monkeypatch, cached)

    result = manager.install()

    assert result["installed"] is False
    assert result["ready"] is False
    assert "不是可执行的 FFmpeg" in result["error"]
    assert not (tmp_path / "runtime" / "ffmpeg" / "ffmpeg.exe.part").exists()
