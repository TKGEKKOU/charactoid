"""Installation and status management for the local reranker."""

import hashlib
import json
import os
import shutil
import subprocess
import sys
import threading
import time
from pathlib import Path

from ingestion.local_embedding.resources import download_env, resolve_local_model_id, validate_model_id
from ingestion.model_snapshot import SnapshotCancelled, kill_process, run_model_snapshot, runtime_lock
from settings import DEFAULT_LOCAL_RERANKER_MODEL, Settings
from voice.resource_directory import open_resource_directory


class RerankerInstallCancelled(RuntimeError):
    pass


class LocalRerankerResourceManager:
    def __init__(self, project_root: Path) -> None:
        self.project_root = project_root.resolve()
        self.models_root = self.project_root / "models"
        self.local_settings_path = self.project_root / "data" / "local_settings.json"
        # Embedding and reranking use the same PyTorch/Transformers stack. Sharing
        # the managed runtime avoids downloading several GB of duplicate wheels.
        self.runtime_dir = self.project_root / "runtime" / "embedding"
        self.requirements = self.project_root / "ingestion" / "local_reranker" / "requirements-local.txt"
        self.cpu_requirements = self.requirements.with_name("requirements-local-cpu.txt")
        self.worker_script = self.project_root / "ingestion" / "local_reranker" / "worker.py"
        self._installing = False
        self._cancel_requested = threading.Event()
        self._process = None
        self._error = ""
        self._phase = "idle"
        self._current_file = ""
        self._install_model_id = ""
        self._started_at = None
        self._lock = threading.Lock()

    @property
    def runtime_python(self) -> Path:
        return self.runtime_dir / ("Scripts/python.exe" if os.name == "nt" else "bin/python")

    def model_directory(self, model_id: str) -> Path:
        safe_id = validate_model_id(model_id)
        directory = (self.models_root / safe_id.replace("/", "--")).resolve()
        if directory.parent != self.models_root.resolve():
            raise ValueError("Reranker model directory escapes project models root")
        return directory

    def resolve_install_model_id(self, model_id: str = "") -> str:
        return resolve_local_model_id(model_id or None, DEFAULT_LOCAL_RERANKER_MODEL)

    def _active(self):
        settings = Settings.load(self.project_root)
        model_id = self._install_model_id or resolve_local_model_id(settings.reranker_model, DEFAULT_LOCAL_RERANKER_MODEL)
        return settings, self.model_directory(model_id)

    @staticmethod
    def _model_complete(directory: Path) -> bool:
        """Reject metadata-only/partial downloads after restart."""
        if not (directory / "config.json").is_file():
            return False
        has_tokenizer = any((directory / name).is_file() for name in ("tokenizer.json", "tokenizer_config.json", "spiece.model", "vocab.txt"))
        has_weights = any(directory.glob(pattern) for pattern in ("*.safetensors", "*.bin", "*.pt"))
        return has_tokenizer and has_weights

    def status(self) -> dict:
        settings, directory = self._active()
        model_id = self._install_model_id or resolve_local_model_id(settings.reranker_model, DEFAULT_LOCAL_RERANKER_MODEL)
        elapsed = time.monotonic() - self._started_at if self._started_at else 0
        installed = self._model_complete(directory)
        phase_progress = {"preparing": 5, "runtime": 20, "model": 50, "loading": 88, "complete": 100}
        if self._phase == "complete" or (installed and not self._installing):
            progress = 100 if installed else None
        elif self._installing:
            progress = phase_progress.get(self._phase, 5)
        else:
            progress = None
        return {
            "model_id": model_id,
            "source": settings.reranker_model_source,
            "device": settings.reranker_device,
            "installed": installed,
            "ready": installed and self.runtime_python.is_file(),
            "installing": self._installing,
            "cancelling": self._installing and self._cancel_requested.is_set(),
            "phase": self._phase,
            "current_file": self._current_file,
            "progress_percent": progress,
            "elapsed_seconds": round(elapsed),
            "error": self._error,
            "model_dir": str(directory if directory.is_dir() else ""),
            "models_root": str(self.models_root),
        }

    def configure(self, model_id: str, source: str, device: str) -> dict:
        validate_model_id(model_id)
        if source not in {"modelscope", "huggingface"} or device not in {"auto", "cuda", "cpu"}:
            raise ValueError("Invalid local reranker configuration")
        try:
            values = json.loads(self.local_settings_path.read_text(encoding="utf-8")) if self.local_settings_path.is_file() else {}
        except (OSError, json.JSONDecodeError):
            values = {}
        values.update({"reranker_model": model_id, "reranker_model_source": source, "reranker_device": device})
        self.local_settings_path.parent.mkdir(parents=True, exist_ok=True)
        temporary = self.local_settings_path.with_suffix(".tmp")
        temporary.write_text(json.dumps(values, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        os.replace(temporary, self.local_settings_path)
        return self.status()

    def start_install(self, model_id: str, source: str, device: str) -> bool:
        model_id = resolve_local_model_id(model_id, DEFAULT_LOCAL_RERANKER_MODEL)
        validate_model_id(model_id)
        if source not in {"modelscope", "huggingface"} or device not in {"auto", "cuda", "cpu"}:
            raise ValueError("Invalid local reranker configuration")
        with self._lock:
            if self._installing:
                return False
            self._installing = True
            self._cancel_requested.clear()
            self._error = ""
            self._phase = "preparing"
            self._current_file = model_id
            self._install_model_id = model_id
            self._started_at = time.monotonic()
        threading.Thread(target=self._install, args=(model_id, source, device), daemon=True, name="reranker-install").start()
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

    def _run(self, command: list[str], env=None):
        if self._cancel_requested.is_set():
            raise RerankerInstallCancelled()
        process = subprocess.Popen(command, cwd=self.project_root, env=env, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True, encoding="utf-8", errors="replace")
        with self._lock:
            self._process = process
        stdout, stderr = process.communicate()
        with self._lock:
            self._process = None
        if self._cancel_requested.is_set():
            raise RerankerInstallCancelled()
        if process.returncode:
            raise RuntimeError((stderr or stdout or "Reranker subprocess failed")[-3000:])
        return subprocess.CompletedProcess(command, process.returncode, stdout, stderr)

    @staticmethod
    def _effective_device(device: str) -> str:
        if device != "auto":
            return device
        try:
            result = subprocess.run(["nvidia-smi", "-L"], capture_output=True, text=True, timeout=5)
            return "cuda" if result.returncode == 0 and result.stdout.strip() else "cpu"
        except (OSError, subprocess.SubprocessError):
            return "cpu"

    def _install_runtime(self, device: str = "cuda") -> None:
        with runtime_lock(self.runtime_dir):
            self._install_runtime_locked(device)

    def _install_runtime_locked(self, device: str = "cuda") -> None:
        self._phase = "runtime"
        actual = self._effective_device(device)
        requirements = self.requirements if actual == "cuda" else self.cpu_requirements
        if not requirements.is_file():
            requirements = Path(__file__).with_name(requirements.name)
        if not self.runtime_python.is_file():
            subprocess.run([sys.executable, "-m", "venv", str(self.runtime_dir)], check=True)
        marker = self.runtime_dir / ".reranker-requirements-ready.json"
        expected = {"requirements_sha256": hashlib.sha256(requirements.read_bytes()).hexdigest(), "device": actual, "python": f"{sys.version_info.major}.{sys.version_info.minor}"}
        try:
            if json.loads(marker.read_text(encoding="utf-8")) == expected:
                return
        except (OSError, json.JSONDecodeError):
            pass
        probe = [str(self.runtime_python), "-c", "import torch, transformers, modelscope, huggingface_hub"]
        try:
            self._run(probe)
        except RuntimeError:
            pass
        else:
            marker.write_text(json.dumps(expected, sort_keys=True) + "\n", encoding="utf-8")
            return
        pypi = os.getenv("CHARACTOID_PYPI_INDEX", "https://mirrors.aliyun.com/pypi/simple/")
        indexes = [(pypi, os.getenv("CHARACTOID_PYTORCH_INDEX", "https://mirrors.aliyun.com/pytorch-wheels/cu128/"))] if actual == "cuda" else [(pypi, None)]
        if actual == "cuda":
            indexes.append((os.getenv("CHARACTOID_PYPI_FALLBACK_INDEX", "https://pypi.org/simple/"), os.getenv("CHARACTOID_PYTORCH_FALLBACK_INDEX", "https://download.pytorch.org/whl/cu128")))
        last_error = None
        for pypi_index, torch_index in indexes:
            command = [str(self.runtime_python), "-m", "pip", "install", "--timeout", "60", "--retries", "2", "--index-url", pypi_index]
            if torch_index: command += ["--extra-index-url", torch_index]
            command += ["-r", str(requirements)]
            try:
                self._run(command); marker.write_text(json.dumps(expected, sort_keys=True) + "\n", encoding="utf-8"); return
            except RerankerInstallCancelled: raise
            except RuntimeError as exc: last_error = exc
        raise RuntimeError(f"Reranker {actual} 运行依赖安装失败：{last_error}") from last_error

    def _install(self, model_id: str, source: str, device: str) -> None:
        directory = self.model_directory(model_id)
        try:
            self._install_runtime(device)
            self._phase = "model"
            directory.mkdir(parents=True, exist_ok=True)

            def _set_process(process):
                with self._lock:
                    self._process = process

            def _on_progress(src, nbytes, elapsed):
                mb = nbytes / (1024 * 1024)
                self._current_file = f"{src} · {mb:.1f} MB"

            used = run_model_snapshot(
                python=self.runtime_python,
                model_id=model_id,
                target=directory,
                primary=source,
                env=download_env(self.project_root),
                cwd=self.project_root,
                cancel_event=self._cancel_requested,
                set_process=_set_process,
                on_progress=_on_progress,
            )
            self._current_file = f"{used} · {model_id}"
            self._phase = "loading"
            probe = self._run([str(self.runtime_python), str(self.worker_script), "--probe", str(directory), device])
            result = json.loads(probe.stdout.strip().splitlines()[-1])
            if not result.get("ok"):
                raise RuntimeError(str(result.get("error") or "Reranker probe failed"))
            self._phase = "complete"
        except (RerankerInstallCancelled, SnapshotCancelled):
            self._error, self._phase = "", "idle"
        except Exception as exc:
            self._error, self._phase = str(exc), "error"
        finally:
            with self._lock:
                self._installing = False
                self._process = None
            self._cancel_requested.clear()
            self._started_at = None

    def remove_model(self) -> dict:
        if self._installing:
            raise RuntimeError("Cancel the active reranker installation first")
        _, directory = self._active()
        if directory.is_dir():
            shutil.rmtree(directory)
        self._error, self._phase = "", "idle"
        return self.status()

    def open_model_directory(self) -> dict:
        _, directory = self._active()
        target = directory if directory.is_dir() else self.models_root
        return {**self.status(), "opened_directory": open_resource_directory(target)}
