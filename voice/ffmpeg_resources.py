from __future__ import annotations

import os
import shutil
import subprocess
from pathlib import Path


def _probe_ffmpeg(path: Path | str | None) -> bool:
    if not path:
        return False
    try:
        completed = subprocess.run([str(path), "-version"], stdout=subprocess.PIPE, stderr=subprocess.STDOUT, text=True, timeout=15, check=False)
    except (OSError, subprocess.SubprocessError):
        return False
    return completed.returncode == 0 and "ffmpeg" in (completed.stdout or "").lower()


def _imageio_cache_candidates() -> list[Path]:
    candidates: list[Path] = []
    env = os.environ.get("IMAGEIO_FFMPEG_EXE", "").strip()
    if env:
        candidates.append(Path(env))
    try:
        import imageio_ffmpeg
    except ImportError:
        return candidates
    package_file = getattr(imageio_ffmpeg, "__file__", None)
    if not package_file:
        return candidates
    binaries = Path(package_file).resolve().parent / "binaries"
    if binaries.is_dir():
        candidates.extend(path for path in sorted(binaries.glob("ffmpeg*")) if path.is_file() and path.suffix.lower() in {".exe", ""})
    return candidates


def _probe_imageio_cache() -> Path | None:
    """Locate a local imageio-ffmpeg binary without triggering a download."""
    for candidate in _imageio_cache_candidates():
        if _probe_ffmpeg(candidate):
            return candidate
    return None


def resolve_ffmpeg(project_root: Path) -> Path:
    """Resolve a usable FFmpeg binary, preferring the project-managed copy."""
    managed = Path(project_root) / "runtime" / "ffmpeg" / ("ffmpeg.exe" if os.name == "nt" else "ffmpeg")
    if _probe_ffmpeg(managed):
        return managed
    located = shutil.which("ffmpeg")
    if _probe_ffmpeg(located):
        return Path(located)
    cached = _probe_imageio_cache()
    if cached:
        return cached
    raise RuntimeError("未找到可执行的 ffmpeg，请先在资源管理器安装 FFmpeg")


class FFmpegResourceManager:
    """管理供音视频前处理使用的独立 ffmpeg 可执行文件。

    ``imageio-ffmpeg`` owns the platform-specific download/cache.  CHARACTOID owns
    the final project-local copy and validates it before reporting success.
    """

    def __init__(self, project_root: Path) -> None:
        self.project_root = Path(project_root).resolve()
        self.root = self.project_root / "runtime" / "ffmpeg"
        self.binary = self.root / ("ffmpeg.exe" if os.name == "nt" else "ffmpeg")
        self.error = ""
        self.installing = False

    def _probe(self, path: Path | str | None) -> bool:
        return _probe_ffmpeg(path)

    def status(self) -> dict:
        managed = self.binary if self._probe(self.binary) else None
        system = shutil.which("ffmpeg")
        system = system if self._probe(system) else ""
        cached = _probe_imageio_cache()
        if cached and managed and Path(cached).resolve() == Path(managed).resolve():
            cached = None
        if cached and system and Path(system).resolve() == Path(cached).resolve():
            cached = None
        source = "managed" if managed else ("system" if system else ("imageio-cache" if cached else ""))
        return {
            "ready": bool(managed or system or cached),
            "installed": managed is not None,
            "installing": self.installing,
            "managed_path": str(managed or ""),
            "system_path": system or "",
            "cache_path": str(cached or ""),
            "cache_available": cached is not None,
            "detected": bool(managed or system or cached),
            "detection_source": source,
            "path": str(managed or system or cached or ""),
            "error": self.error,
            "source": "imageio-ffmpeg（由项目主环境依赖安装并按需下载）",
            "note": "用于视频抽音频、格式转换和 GPT-SoVITS 前处理；RVC 不依赖文字转写。",
        }

    def detect(self) -> dict:
        """Re-probe local FFmpeg locations without downloading."""
        self.error = ""
        status = self.status()
        if status["installed"]:
            note = "已找到项目托管的 FFmpeg"
        elif status["system_path"]:
            note = "已在系统 PATH 中找到 FFmpeg，不必下载；如需项目内副本可再安装"
        elif status["cache_available"]:
            note = "已找到本地 FFmpeg 缓存，可安装为项目托管副本"
        else:
            note = "未检测到可用的 FFmpeg，需要下载"
        status["detection_note"] = note
        return status

    def install(self) -> dict:
        if self.installing:
            return self.status()
        self.installing = True
        self.error = ""
        temporary = self.binary.with_suffix(self.binary.suffix + ".part")
        try:
            try:
                from imageio_ffmpeg import get_ffmpeg_exe
            except ImportError as exc:
                raise RuntimeError(
                    "当前环境缺少 imageio-ffmpeg；请重新执行 .\\scripts\\start.ps1 或 pip install -r requirements.txt"
                ) from exc
            source = Path(get_ffmpeg_exe())
            if not source.is_file():
                raise RuntimeError(f"imageio-ffmpeg 未返回有效的 FFmpeg 文件：{source}")
            self.root.mkdir(parents=True, exist_ok=True)
            shutil.copy2(source, temporary)
            if not self._probe(temporary):
                raise RuntimeError("下载得到的文件不是可执行的 FFmpeg，可能是下载不完整或缓存损坏")
            temporary.replace(self.binary)
        except Exception as exc:
            temporary.unlink(missing_ok=True)
            self.error = str(exc)
        finally:
            self.installing = False
        return self.status()

    def remove(self) -> dict:
        self.binary.unlink(missing_ok=True)
        return self.status()

    def directory(self) -> dict:
        self.root.mkdir(parents=True, exist_ok=True)
        return {**self.status(), "directory": str(self.root)}
