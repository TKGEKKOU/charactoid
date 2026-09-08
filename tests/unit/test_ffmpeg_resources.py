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

def test_ffmpeg_status_reports_imageio_cache_without_install(tmp_path, monkeypatch):
    from voice import ffmpeg_resources

    cached = tmp_path / "binaries"
    cached.mkdir()
    binary = cached / "ffmpeg.exe"
    binary.write_text("binary", encoding="ascii")
    module = types.ModuleType("imageio_ffmpeg")
    module.__file__ = str(tmp_path / "imageio_ffmpeg" / "__init__.py")
    (tmp_path / "imageio_ffmpeg").mkdir()
    (tmp_path / "imageio_ffmpeg" / "binaries").mkdir()
    cache_bin = tmp_path / "imageio_ffmpeg" / "binaries" / "ffmpeg.exe"
    cache_bin.write_text("binary", encoding="ascii")
    monkeypatch.setitem(sys.modules, "imageio_ffmpeg", module)
    manager = ffmpeg_resources.FFmpegResourceManager(tmp_path)
    monkeypatch.setattr(manager, "_probe", lambda path: bool(path) and Path(path).is_file())
    monkeypatch.setattr(ffmpeg_resources, "_probe_ffmpeg", lambda path: bool(path) and Path(path).is_file())

    called = {"get": False}
    module.get_ffmpeg_exe = lambda: called.__setitem__("get", True) or str(cache_bin)

    result = manager.detect()

    assert called["get"] is False
    assert result["installed"] is False
    assert result["cache_available"] is True
    assert result["detected"] is True
    assert "缓存" in result["detection_note"]


def test_ffmpeg_detect_prefers_managed_copy(tmp_path, monkeypatch):
    from voice.ffmpeg_resources import FFmpegResourceManager

    manager = FFmpegResourceManager(tmp_path)
    managed = tmp_path / "runtime" / "ffmpeg"
    managed.mkdir(parents=True)
    binary = managed / "ffmpeg.exe"
    binary.write_text("managed", encoding="ascii")
    monkeypatch.setattr(manager, "_probe", lambda path: bool(path) and Path(path).is_file())

    result = manager.detect()

    assert result["installed"] is True
    assert result["detection_source"] == "managed"
    assert "托管" in result["detection_note"]


def test_ffmpeg_start_install_does_not_block(tmp_path, monkeypatch):
    from voice.ffmpeg_resources import FFmpegResourceManager
    import time

    manager = FFmpegResourceManager(tmp_path)
    started = time.monotonic()

    def slow_copy():
        time.sleep(0.4)

    monkeypatch.setattr(manager, "_copy_binary", slow_copy)
    assert manager.start_install() is True
    elapsed = time.monotonic() - started
    assert elapsed < 0.3
    assert manager.installing is True
    deadline = time.monotonic() + 2
    while manager.installing and time.monotonic() < deadline:
        time.sleep(0.05)
    assert manager.installing is False
