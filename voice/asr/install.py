import json
import os
import shutil
import subprocess
import sys
import threading
import time
from dataclasses import dataclass
from pathlib import Path

from voice.resource_directory import open_resource_directory
from ingestion.local_embedding.resources import download_env
from ingestion.model_snapshot import SnapshotCancelled, kill_process, run_model_snapshot


@dataclass(frozen=True)
class STTResources:
    python: Path | None
    model: Path | None
    ffmpeg: Path | None

    @property
    def ready(self) -> bool:
        return bool(
            self.python
            and self.python.is_file()
            and self.model
            and (self.model / "config.json").is_file()
            and self.ffmpeg
            and self.ffmpeg.is_file()
        )


class STTResourceManager:
    def __init__(self, project_root: Path) -> None:
        self.project_root = project_root.resolve()
        self.data_dir = self.project_root / "data" / "asr"
        self.config_path = self.data_dir / "config.json"
        self.runtime_dir = self.project_root / "runtime" / "asr"
        self.managed_model = self.project_root / "models" / "Qwen3-ASR-0.6B"
        self.managed_ffmpeg = self.project_root / "runtime" / "ffmpeg" / "ffmpeg.exe"
        self.requirements = self.project_root / "voice" / "asr" / "requirements-local.txt"
        self._installing = False
        self._cancel_requested = threading.Event()
        self._process: subprocess.Popen | None = None
        self._phase = "idle"
        self._started_at: float | None = None
        self._error = ""
        self._current_file = ""
        self._lock = threading.Lock()

    @property
    def runtime_python(self) -> Path:
        return self.runtime_dir / ("Scripts/python.exe" if os.name == "nt" else "bin/python")

    def config(self) -> dict:
        defaults = {"enabled": True, "python_path": "", "model_path": "", "ffmpeg_path": ""}
        if not self.config_path.is_file():
            return defaults
        try:
            values = json.loads(self.config_path.read_text(encoding="utf-8"))
        except (OSError, ValueError):
            return defaults
        return {**defaults, **{key: values.get(key, default) for key, default in defaults.items()}}

    def configure(self, **changes) -> dict:
        values = self.config()
        for key in values:
            if key in changes and changes[key] is not None:
                values[key] = changes[key]
        self.data_dir.mkdir(parents=True, exist_ok=True)
        temporary = self.config_path.with_suffix(".tmp")
        temporary.write_text(json.dumps(values, ensure_ascii=False, indent=2), encoding="utf-8")
        os.replace(temporary, self.config_path)
        return self.status()

    @staticmethod
    def _file(configured: str, managed: Path, system_name: str = "") -> Path | None:
        candidates = [Path(configured).expanduser() if configured else None, managed]
        if system_name:
            located = shutil.which(system_name)
            candidates.append(Path(located) if located else None)
        return next((path.resolve() for path in candidates if path and path.is_file()), None)

    @staticmethod
    def _model(configured: str, managed: Path) -> Path | None:
        candidates = [Path(configured).expanduser() if configured else None, managed]
        return next((path.resolve() for path in candidates if path and (path / "config.json").is_file()), None)

    def resolve(self) -> STTResources:
        values = self.config()
        return STTResources(
            python=self._file(values["python_path"] or os.getenv("CHARACTOID_STT_PYTHON", os.getenv("CHARACTOID_ASR_PYTHON", "")), self.runtime_python),
            model=self._model(values["model_path"] or os.getenv("CHARACTOID_STT_MODEL", os.getenv("CHARACTOID_ASR_MODEL", "")), self.managed_model),
            ffmpeg=self._file(values["ffmpeg_path"] or os.getenv("CHARACTOID_STT_FFMPEG", os.getenv("CHARACTOID_ASR_FFMPEG", "")), self.managed_ffmpeg, "ffmpeg"),
        )

    def status(self) -> dict:
        values = self.config()
        resources = self.resolve()
        elapsed = time.monotonic() - self._started_at if self._started_at else 0
        phase_progress = {"preparing": 5, "runtime": 20, "model": 55, "ffmpeg": 88, "complete": 100}
        if self._phase == "complete" or (resources.ready and not self._installing):
            progress = 100 if resources.ready else None
        elif self._installing:
            progress = phase_progress.get(self._phase, 5)
        else:
            progress = None
        if self._phase == "model":
            current_file = self._current_file or "Qwen/Qwen3-ASR-0.6B"
        elif self._phase == "ffmpeg":
            current_file = "ffmpeg"
        else:
            current_file = self._current_file
        return {
            **values,
            "installed": resources.ready,
            "managed_installed": self.runtime_dir.is_dir() or self.managed_model.is_dir() or self.managed_ffmpeg.is_file(),
            "ready": bool(values["enabled"] and resources.ready),
            "installing": self._installing,
            "cancelling": self._installing and self._cancel_requested.is_set(),
            "phase": self._phase,
            "current_file": current_file,
            "progress_percent": progress,
            "downloaded_bytes": 0,
            "total_bytes": 0,
            "download_speed_bytes": 0,
            "eta_seconds": None,
            "elapsed_seconds": round(elapsed),
            "source": "modelscope",
            "error": self._error,
            "model_id": "Qwen/Qwen3-ASR-0.6B",
            "resolved_python": str(resources.python or ""),
            "resolved_model": str(resources.model or ""),
            "resolved_ffmpeg": str(resources.ffmpeg or ""),
            "download_size": "约 5-10 GB（含 CUDA PyTorch 与 1.88 GB 模型）",
        }

    def start_install(self) -> bool:
        with self._lock:
            if self._installing:
                return False
            self._installing = True
            self._cancel_requested.clear()
            self._error = ""
            self._phase = "preparing"
            self._started_at = time.monotonic()
        threading.Thread(target=self._install, daemon=True, name="asr-install").start()
        return True

    def cancel_install(self) -> bool:
        with self._lock:
            if not self._installing:
                return False
            self._cancel_requested.set()
            self._phase = "cancelling"
            process = self._process
        if process and process.poll() is None:
            kill_process(process)
        return True

    def _run(self, command: list[str], **options) -> subprocess.CompletedProcess:
        if self._cancel_requested.is_set():
            raise RuntimeError("STT 安装已取消")
        options.setdefault("stdout", subprocess.PIPE)
        options.setdefault("stderr", subprocess.PIPE)
        options.setdefault("text", True)
        options.setdefault("encoding", "utf-8")
        options.setdefault("errors", "replace")
        process = subprocess.Popen(command, **options)
        with self._lock:
            self._process = process
        stdout, stderr = process.communicate()
        with self._lock:
            self._process = None
        if self._cancel_requested.is_set():
            raise RuntimeError("STT 安装已取消")
        if process.returncode:
            raise subprocess.CalledProcessError(process.returncode, command, stdout, stderr)
        return subprocess.CompletedProcess(command, process.returncode, stdout, stderr)

    @staticmethod
    def _asr_device() -> str:
        requested = os.getenv("CHARACTOID_ASR_DEVICE", "auto").strip().lower()
        if requested in {"cpu", "cuda"}:
            return requested
        # Avoid installing the 2.8GB CUDA wheel on ordinary Windows machines.
        try:
            probe = subprocess.run(["nvidia-smi", "-L"], stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL, timeout=3, check=False)
        except (OSError, subprocess.SubprocessError):
            probe = None
        return "cuda" if probe is not None and probe.returncode == 0 else "cpu"

    def _install(self) -> None:
        try:
            if not self.runtime_python.is_file():
                subprocess.run([sys.executable, "-m", "venv", str(self.runtime_dir)], check=True)
            pypi_index = os.getenv("CHARACTOID_PYPI_INDEX", "https://mirrors.aliyun.com/pypi/simple/")
            pytorch_index = os.getenv(
                "CHARACTOID_PYTORCH_INDEX",
                "https://mirrors.aliyun.com/pytorch-wheels/cu128/",
            )
            device = self._asr_device()
            requirements = self.requirements
            if device == "cpu":
                requirements = self.requirements.with_name("requirements-local-cpu.txt")
            pip_command = [
                str(self.runtime_python),
                "-m",
                "pip",
                "install",
                "--timeout",
                "30",
                "--retries",
                "1",
                "--index-url",
                pypi_index,
                "--extra-index-url",
                pytorch_index,
                "-r",
                str(requirements),
            ]
            self._phase = "runtime"
            try:
                self._run(pip_command, cwd=self.project_root, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
            except subprocess.CalledProcessError as domestic_error:
                # Domestic mirrors do not always carry every CUDA Wheel release.
                pip_command[pip_command.index(pytorch_index)] = "https://download.pytorch.org/whl/cu128"
                try:
                    self._run(pip_command, cwd=self.project_root, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
                except subprocess.CalledProcessError as fallback_error:
                    detail = fallback_error.stderr or domestic_error.stderr or "pip install failed"
                    raise RuntimeError(detail[-2000:]) from fallback_error
            model_id = os.getenv("CHARACTOID_STT_MODEL_ID", os.getenv("CHARACTOID_ASR_MODEL_ID", "Qwen/Qwen3-ASR-0.6B"))
            self._phase = "model"

            def _set_process(process):
                with self._lock:
                    self._process = process

            def _on_progress(src, nbytes, elapsed):
                mb = nbytes / (1024 * 1024)
                self._current_file = f"{src} · {mb:.1f} MB"

            self._current_file = model_id
            run_model_snapshot(
                python=self.runtime_python,
                model_id=model_id,
                target=self.managed_model,
                primary="modelscope",
                env=download_env(self.project_root),
                cwd=self.project_root,
                cancel_event=self._cancel_requested,
                set_process=_set_process,
                on_progress=_on_progress,
            )
            self.managed_ffmpeg.parent.mkdir(parents=True, exist_ok=True)
            ffmpeg_script = (
                "import shutil; from imageio_ffmpeg import get_ffmpeg_exe; "
                f"shutil.copy2(get_ffmpeg_exe(), {str(self.managed_ffmpeg)!r})"
            )
            self._phase = "ffmpeg"
            self._run([str(self.runtime_python), "-c", ffmpeg_script], cwd=self.project_root)
            self._phase = "complete"
        except SnapshotCancelled:
            self._error = ""
            self._phase = "idle"
        except Exception as exc:
            if self._cancel_requested.is_set():
                self._error = ""
                self._phase = "idle"
            else:
                if isinstance(exc, subprocess.CalledProcessError):
                    self._error = str(exc.stderr or exc.stdout or exc)[-2000:]
                else:
                    self._error = str(exc)
                self._phase = "error"
        finally:
            self._installing = False
            self._cancel_requested.clear()
            self._process = None
            self._started_at = None

    def remove_managed(self) -> dict:
        for target in (self.runtime_dir, self.managed_model, self.managed_ffmpeg.parent):
            if target.exists():
                shutil.rmtree(target)
        self._error = ""
        return self.status()

    def open_model_directory(self) -> dict:
        resources = self.resolve()
        directory = resources.model or self.managed_model
        return {**self.status(), "opened_directory": open_resource_directory(directory)}


# 兼容旧安装资源接口；新代码使用 STT 命名。
ASRResources = STTResources
ASRResourceManager = STTResourceManager


