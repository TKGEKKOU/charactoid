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


def resolve_ffmpeg(project_root: Path) -> Path:
    """Resolve a usable FFmpeg binary, preferring the project-managed copy."""
    managed = Path(project_root) / "runtime" / "ffmpeg" / ("ffmpeg.exe" if os.name == "nt" else "ffmpeg")
    if _probe_ffmpeg(managed):
        return managed
    located = shutil.which("ffmpeg")
    if _probe_ffmpeg(located):
        return Path(located)
    # 允许运行时直接使用 imageio-ffmpeg 的受信任缓存；资源安装器仍会
    # 将它复制到项目 runtime 目录，保证新用户最终拥有可见的完整体。
    try:
        from imageio_ffmpeg import get_ffmpeg_exe
        cached = Path(get_ffmpeg_exe())
    except (ImportError, OSError, RuntimeError):
        cached = None
    if _probe_ffmpeg(cached):
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
        return {
            "ready": bool(managed or system),
            "installed": managed is not None,
            "installing": self.installing,
            "managed_path": str(managed or ""),
            "system_path": system or "",
            "path": str(managed or system or ""),
            "error": self.error,
            "source": "imageio-ffmpeg（由项目主环境依赖安装并按需下载）",
            "note": "用于视频抽音频、格式转换和 GPT-SoVITS 前处理；RVC 不依赖文字转写。",
        }

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
