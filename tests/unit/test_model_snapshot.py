from pathlib import Path
import subprocess
import time

from ingestion.model_snapshot import directory_fingerprint, run_model_snapshot, snapshot_sources


def test_snapshot_sources_orders_fallback():
    assert snapshot_sources("modelscope") == ["modelscope", "huggingface"]
    assert snapshot_sources("huggingface") == ["huggingface", "modelscope"]
    assert snapshot_sources("other") == ["modelscope", "huggingface"]


def test_directory_fingerprint_counts_files(tmp_path: Path):
    (tmp_path / "a.bin").write_bytes(b"12345")
    (tmp_path / "nested").mkdir()
    (tmp_path / "nested" / "b.bin").write_bytes(b"ab")
    total, files = directory_fingerprint(tmp_path)
    assert files == 2
    assert total == 7


class _FakeProcess:
    def __init__(self):
        self.pid = 4242
        self.returncode = None

    def poll(self):
        return None

    def wait(self, timeout=None):
        return None

    def kill(self):
        self.returncode = -9


def test_run_model_snapshot_kills_stalled_source(tmp_path, monkeypatch):
    created = []

    def fake_popen(command, **kwargs):
        created.append(command)
        return _FakeProcess()

    killed = []

    def fake_kill(process):
        killed.append(process.pid)
        process.returncode = -9

    monkeypatch.setattr("ingestion.model_snapshot.subprocess.Popen", fake_popen)
    monkeypatch.setattr("ingestion.model_snapshot.kill_process", fake_kill)

    target = tmp_path / "model"
    try:
        run_model_snapshot(
            python="python",
            model_id="org/model",
            target=target,
            primary="modelscope",
            env={},
            cwd=tmp_path,
            stall_seconds=1,
            source_seconds=30,
        )
    except RuntimeError as exc:
        message = str(exc)
    else:
        raise AssertionError("expected RuntimeError")

    assert len(created) == 2
    assert created[0][2].count("source = ") >= 1
    assert "modelscope" in created[0][2]
    assert "huggingface" in created[1][2]
    assert len(killed) == 2
    assert "无进度超过" in message
