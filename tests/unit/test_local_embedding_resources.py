from pathlib import Path
import subprocess

import pytest

from ingestion.local_embedding.resources import LocalEmbeddingResourceManager, validate_model_id


def test_model_directory_is_scoped_to_project_models(tmp_path: Path):
    manager = LocalEmbeddingResourceManager(tmp_path)

    assert manager.model_directory("Qwen/Qwen3-Embedding-0.6B") == (
        tmp_path / "models" / "Qwen--Qwen3-Embedding-0.6B"
    ).resolve()


@pytest.mark.parametrize("model_id", ["../outside", "Qwen/../../outside", "C:/outside", "/outside"])
def test_model_id_rejects_path_escape(tmp_path: Path, model_id: str):
    manager = LocalEmbeddingResourceManager(tmp_path)

    with pytest.raises(ValueError):
        manager.model_directory(model_id)


def test_validate_model_id_accepts_huggingface_style_id():
    assert validate_model_id("Qwen/Qwen3-Embedding-0.6B") == "Qwen/Qwen3-Embedding-0.6B"


def test_open_directory_uses_models_root_before_download(tmp_path: Path, monkeypatch):
    manager = LocalEmbeddingResourceManager(tmp_path)
    opened = []
    monkeypatch.setattr("ingestion.local_embedding.resources.open_resource_directory", lambda path: opened.append(path) or str(path))

    result = manager.open_model_directory()

    assert opened == [tmp_path / "models"]
    assert result["opened_directory"] == str(tmp_path / "models")


def test_runtime_install_falls_back_to_official_pytorch_index(tmp_path: Path, monkeypatch):
    manager = LocalEmbeddingResourceManager(tmp_path)
    manager.runtime_python.parent.mkdir(parents=True)
    manager.runtime_python.write_text("python", encoding="ascii")
    commands = []

    def fake_run(command, **kwargs):
        commands.append(list(command))
        if len(commands) == 1:
            raise RuntimeError("No matching distribution found for torch==2.8.0+cu128")
        return subprocess.CompletedProcess(command, 0, "", "")

    monkeypatch.setattr(manager, "_run", fake_run)

    manager._install_runtime("cuda")

    assert len(commands) == 2
    assert "https://mirrors.aliyun.com/pytorch-wheels/cu128/" in commands[0]
    assert "https://download.pytorch.org/whl/cu128" in commands[1]
    assert (manager.runtime_dir / ".requirements-ready.json").is_file()


def test_cpu_runtime_uses_cpu_requirements_without_cuda_index(tmp_path: Path, monkeypatch):
    manager = LocalEmbeddingResourceManager(tmp_path)
    manager.runtime_python.parent.mkdir(parents=True)
    manager.runtime_python.write_text("python", encoding="ascii")
    commands = []
    monkeypatch.setattr(manager, "_run", lambda command, **kwargs: commands.append(list(command)) or subprocess.CompletedProcess(command, 0, "", ""))

    manager._install_runtime("cpu")

    assert commands[0][-1].endswith("requirements-local-cpu.txt")
    assert all("cu128" not in item for item in commands[0])


def test_auto_without_nvidia_uses_cpu_runtime(tmp_path: Path, monkeypatch):
    manager = LocalEmbeddingResourceManager(tmp_path)
    manager.runtime_python.parent.mkdir(parents=True)
    manager.runtime_python.write_text("python", encoding="ascii")
    commands = []
    monkeypatch.setattr("ingestion.local_embedding.resources.subprocess.run", lambda *args, **kwargs: subprocess.CompletedProcess(args[0], 1, "", ""))
    monkeypatch.setattr(manager, "_run", lambda command, **kwargs: commands.append(list(command)) or subprocess.CompletedProcess(command, 0, "", ""))

    manager._install_runtime("auto")

    assert commands[0][-1].endswith("requirements-local-cpu.txt")
