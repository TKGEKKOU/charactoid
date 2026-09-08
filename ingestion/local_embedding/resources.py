"""受管本地 Embedding 模型的安装、状态和目录操作。"""

import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import threading
import time
from pathlib import Path

from settings import DEFAULT_LOCAL_EMBEDDING_MODEL, Settings
from voice.resource_directory import open_resource_directory


MODEL_ID_PATTERN = re.compile(r"^[A-Za-z0-9][A-Za-z0-9._/-]{0,199}$")
SNAPSHOT_SCRIPT = """
import traceback
model_id = %r
target = %r
primary = %r
last = None

def _modelscope():
    from modelscope import snapshot_download
    snapshot_download(model_id, local_dir=target)

def _huggingface():
    from huggingface_hub import snapshot_download
    snapshot_download(repo_id=model_id, local_dir=target)

order = (_modelscope, _huggingface) if primary == "modelscope" else (_huggingface, _modelscope)
for download in order:
    try:
        download()
        break
    except Exception as exc:
        last = exc
        traceback.print_exc()
else:
    raise last
"""


class EmbeddingInstallCancelled(RuntimeError):
    pass


def validate_model_id(model_id: str) -> str:
    value = model_id.strip()
    if not MODEL_ID_PATTERN.fullmatch(value) or ".." in value.split("/"):
        raise ValueError("模型 ID 只能包含字母、数字、点、短横线、下划线和单个路径分隔符")
    return value


def resolve_local_model_id(model_id: str | None, default: str = DEFAULT_LOCAL_EMBEDDING_MODEL) -> str:
    """Ignore cloud API model names when choosing a local snapshot id."""
    value = (model_id or "").strip()
    if value and "/" in value and MODEL_ID_PATTERN.fullmatch(value) and ".." not in value.split("/"):
        return value
    return default


def download_env(project_root: Path) -> dict[str, str]:
    env = os.environ.copy()
    env["MODELSCOPE_CACHE"] = str(project_root / "runtime" / "modelscope-cache")
    env["HF_HOME"] = str(project_root / "runtime" / "huggingface-cache")
    if "HF_ENDPOINT" not in env:
        env["HF_ENDPOINT"] = os.getenv("CHARACTOID_HF_ENDPOINT", "https://hf-mirror.com")
    return env


class LocalEmbeddingResourceManager:
    def __init__(self, project_root: Path) -> None:
        self.project_root = project_root.resolve()
        self.models_root = self.project_root / "models"
        self.local_settings_path = self.project_root / "data" / "local_settings.json"
        self.runtime_dir = self.project_root / "runtime" / "embedding"
        self.requirements = self.project_root / "ingestion" / "local_embedding" / "requirements-local.txt"
        self.cpu_requirements = self.requirements.with_name("requirements-local-cpu.txt")
        self.worker_script = self.project_root / "ingestion" / "local_embedding" / "worker.py"
        self._installing = False
        self._cancel_requested = threading.Event()
        self._process: subprocess.Popen | None = None
        self._error = ""
        self._phase = "idle"
        self._current_file = ""
        self._install_model_id = ""
        self._started_at: float | None = None
        self._lock = threading.Lock()

    @property
    def runtime_python(self) -> Path:
        return self.runtime_dir / ("Scripts/python.exe" if os.name == "nt" else "bin/python")

    def model_directory(self, model_id: str) -> Path:
        safe_id = validate_model_id(model_id)
        directory = (self.models_root / safe_id.replace("/", "--")).resolve()
        if directory.parent != self.models_root.resolve():
            raise ValueError("模型目录超出项目 models 范围")
        return directory

    @staticmethod
    def _metadata_path(directory: Path) -> Path:
        return directory / ".charactoid-model.json"

    def _read_metadata(self, directory: Path) -> dict:
        path = self._metadata_path(directory)
        try:
            value = json.loads(path.read_text(encoding="utf-8")) if path.is_file() else {}
        except (OSError, json.JSONDecodeError):
            return {}
        return value if isinstance(value, dict) else {}

    def resolve_install_model_id(self, model_id: str = "") -> str:
        return resolve_local_model_id(model_id or None)

    def _active(self) -> tuple[Settings, Path, dict]:
        settings = Settings.load(self.project_root)
        model_id = self._install_model_id or resolve_local_model_id(settings.embedding_model)
        directory = self.model_directory(model_id)
        return settings, directory, self._read_metadata(directory)

    @staticmethod
    def _model_complete(directory: Path) -> bool:
        """Reject metadata-only/partial downloads after restart."""
        if not (directory / "config.json").is_file():
            return False
        has_tokenizer = any((directory / name).is_file() for name in ("tokenizer.json", "tokenizer_config.json", "spiece.model", "vocab.txt"))
        has_weights = any(directory.glob(pattern) for pattern in ("*.safetensors", "*.bin", "*.pt"))
        return has_tokenizer and has_weights

    def status(self) -> dict:
        settings, directory, metadata = self._active()
        model_id = self._install_model_id or resolve_local_model_id(settings.embedding_model)
        elapsed = time.monotonic() - self._started_at if self._started_at else 0
        installed = self._model_complete(directory)
        ready = installed if settings.embedding_provider == "managed_local" else bool(
            settings.embedding_api_key and settings.embedding_base_url and settings.embedding_model
        )
        phase_progress = {"preparing": 5, "runtime": 20, "model": 50, "loading": 88, "complete": 100}
        if self._phase == "complete" or (installed and not self._installing):
            progress = 100 if installed else None
        elif self._installing:
            progress = phase_progress.get(self._phase, 5)
        else:
            progress = None
        return {
            "provider": settings.embedding_provider,
            "model_id": model_id,
            "source": settings.embedding_model_source,
            "device": settings.embedding_device,
            "actual_device": str(metadata.get("actual_device") or ""),
            "dimensions": int(metadata.get("dimensions") or settings.embedding_dimensions),
            "installed": installed,
            "ready": ready,
            "installing": self._installing,
            "cancelling": self._installing and self._cancel_requested.is_set(),
            "phase": self._phase,
            "current_file": self._current_file,
            "downloaded_bytes": 0,
            "total_bytes": 0,
            "progress_percent": progress,
            "download_speed_bytes": 0,
            "eta_seconds": None,
            "elapsed_seconds": round(elapsed),
            "error": self._error,
            "model_dir": str(directory if directory.is_dir() else ""),
            "models_root": str(self.models_root),
        }

    def configure(self, model_id: str, source: str, device: str) -> dict:
        validate_model_id(model_id)
        if source not in {"modelscope", "huggingface"} or device not in {"auto", "cuda", "cpu"}:
            raise ValueError("本地 Embedding 配置无效")
        try:
            values = json.loads(self.local_settings_path.read_text(encoding="utf-8")) if self.local_settings_path.is_file() else {}
        except (OSError, json.JSONDecodeError):
            values = {}
        values.update({
            "embedding_provider": "managed_local",
            "embedding_model": model_id,
            "embedding_model_source": source,
            "embedding_device": device,
            "embedding_send_dimensions": False,
        })
        self.local_settings_path.parent.mkdir(parents=True, exist_ok=True)
        temporary = self.local_settings_path.with_suffix(".tmp")
        temporary.write_text(json.dumps(values, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        os.replace(temporary, self.local_settings_path)
        return self.status()

    def start_install(self, model_id: str, source: str, device: str) -> bool:
        model_id = resolve_local_model_id(model_id)
        validate_model_id(model_id)
        if source not in {"modelscope", "huggingface"}:
            raise ValueError("不支持的模型下载源")
        if device not in {"auto", "cuda", "cpu"}:
            raise ValueError("不支持的运行设备")
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
        threading.Thread(
            target=self._install,
            args=(model_id, source, device),
            daemon=True,
            name="embedding-install",
        ).start()
        return True

    def cancel_install(self) -> bool:
        with self._lock:
            if not self._installing:
                return False
            self._cancel_requested.set()
            self._phase = "cancelling"
            process = self._process
        if process and process.poll() is None:
            process.terminate()
        return True

    def _run(self, command: list[str], *, env: dict[str, str] | None = None) -> subprocess.CompletedProcess:
        if self._cancel_requested.is_set():
            raise EmbeddingInstallCancelled()
        process = subprocess.Popen(
            command,
            cwd=self.project_root,
            env=env,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            encoding="utf-8",
            errors="replace",
        )
        with self._lock:
            self._process = process
        stdout, stderr = process.communicate()
        with self._lock:
            self._process = None
        if self._cancel_requested.is_set():
            raise EmbeddingInstallCancelled()
        if process.returncode:
            raise RuntimeError((stderr or stdout or "子进程执行失败")[-3000:])
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
        self._phase = "runtime"
        actual = self._effective_device(device)
        requirements = self.requirements if actual == "cuda" else self.cpu_requirements
        if not requirements.is_file():
            requirements = Path(__file__).with_name(requirements.name)
        if not self.runtime_python.is_file():
            subprocess.run([sys.executable, "-m", "venv", str(self.runtime_dir)], check=True)
        marker = self.runtime_dir / ".requirements-ready.json"
        expected = {"requirements_sha256": hashlib.sha256(requirements.read_bytes()).hexdigest(), "device": actual, "python": f"{sys.version_info.major}.{sys.version_info.minor}"}
        try:
            if json.loads(marker.read_text(encoding="utf-8")) == expected:
                return
        except (OSError, json.JSONDecodeError):
            pass
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
            except EmbeddingInstallCancelled: raise
            except RuntimeError as exc: last_error = exc
        raise RuntimeError(f"Embedding {actual} 运行依赖安装失败：{last_error}") from last_error

    def _install(self, model_id: str, source: str, device: str) -> None:
        directory = self.model_directory(model_id)
        try:
            self._install_runtime(device)
            self._phase = "model"
            self._current_file = model_id
            directory.mkdir(parents=True, exist_ok=True)
            code = SNAPSHOT_SCRIPT % (model_id, str(directory), source)
            self._run([str(self.runtime_python), "-c", code], env=download_env(self.project_root))
            self._phase = "loading"
            probe = self._run([str(self.runtime_python), str(self.worker_script), "--probe", str(directory), device])
            result = json.loads(probe.stdout.strip().splitlines()[-1])
            if not result.get("ok"):
                raise RuntimeError(str(result.get("error") or "模型维度探测失败"))
            self._metadata_path(directory).write_text(
                json.dumps({
                    "model_id": model_id,
                    "source": source,
                    "dimensions": result["dimensions"],
                    "actual_device": result["actual_device"],
                }, ensure_ascii=False, indent=2),
                encoding="utf-8",
            )
            # 维度由真实模型输出探测，避免用户手填后与 Milvus Collection 不一致。
            try:
                values = json.loads(self.local_settings_path.read_text(encoding="utf-8"))
            except (OSError, json.JSONDecodeError):
                values = {}
            if values.get("embedding_provider") == "managed_local":
                values["embedding_dimensions"] = int(result["dimensions"])
                temporary = self.local_settings_path.with_suffix(".tmp")
                temporary.write_text(json.dumps(values, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
                os.replace(temporary, self.local_settings_path)
            self._phase = "complete"
        except EmbeddingInstallCancelled:
            self._error = ""
            self._phase = "idle"
        except Exception as exc:
            self._error = str(exc)
            self._phase = "error"
        finally:
            with self._lock:
                self._installing = False
                self._process = None
            self._cancel_requested.clear()
            self._started_at = None

    def remove_model(self) -> dict:
        if self._installing:
            raise RuntimeError("请先取消正在进行的下载")
        _, directory, _ = self._active()
        if directory.is_dir():
            shutil.rmtree(directory)
        self._error = ""
        self._phase = "idle"
        return self.status()

    def open_model_directory(self) -> dict:
        _, directory, _ = self._active()
        target = directory if directory.is_dir() else self.models_root
        return {**self.status(), "opened_directory": open_resource_directory(target)}
