from __future__ import annotations

import os
import subprocess
import threading
import time
from pathlib import Path
from typing import Callable

_RUNTIME_LOCKS: dict[str, threading.Lock] = {}
_RUNTIME_LOCKS_GUARD = threading.Lock()

DEFAULT_STALL_SECONDS = 90
DEFAULT_SOURCE_SECONDS = 1800

SNAPSHOT_SCRIPT = """
model_id = %r
target = %r
source = %r
if source == "modelscope":
    from modelscope import snapshot_download
    snapshot_download(model_id, local_dir=target)
else:
    from huggingface_hub import snapshot_download
    snapshot_download(repo_id=model_id, local_dir=target)
"""


class SnapshotCancelled(RuntimeError):
    pass


def snapshot_sources(primary: str) -> list[str]:
    source = primary if primary in {"modelscope", "huggingface"} else "modelscope"
    fallback = "huggingface" if source == "modelscope" else "modelscope"
    return [source, fallback]


def runtime_lock(runtime_dir: Path) -> threading.Lock:
    key = str(Path(runtime_dir).resolve())
    with _RUNTIME_LOCKS_GUARD:
        lock = _RUNTIME_LOCKS.get(key)
        if lock is None:
            lock = threading.Lock()
            _RUNTIME_LOCKS[key] = lock
        return lock


def directory_fingerprint(path: Path) -> tuple[int, int]:
    total = 0
    files = 0
    if not path.exists():
        return 0, 0
    for item in path.rglob("*"):
        if not item.is_file():
            continue
        try:
            total += item.stat().st_size
            files += 1
        except OSError:
            continue
    return total, files


def kill_process(process: subprocess.Popen | None) -> None:
    if process is None or process.poll() is not None:
        return
    if os.name == "nt":
        subprocess.run(
            ["taskkill", "/F", "/T", "/PID", str(process.pid)],
            stdout=subprocess.DEVNULL,
            stderr=subprocess.DEVNULL,
            check=False,
        )
        try:
            process.wait(timeout=8)
        except subprocess.TimeoutExpired:
            process.kill()
        return
    process.terminate()
    try:
        process.wait(timeout=5)
    except subprocess.TimeoutExpired:
        process.kill()


def _env_int(name: str, default: int) -> int:
    raw = os.getenv(name, "").strip()
    if not raw:
        return default
    try:
        value = int(raw)
    except ValueError:
        return default
    return value if value > 0 else default


def run_model_snapshot(
    *,
    python: str | Path,
    model_id: str,
    target: Path,
    primary: str,
    env: dict[str, str] | None,
    cwd: Path,
    cancel_event: threading.Event | None = None,
    set_process: Callable[[subprocess.Popen | None], None] | None = None,
    on_progress: Callable[[str, int, int], None] | None = None,
    stall_seconds: int | None = None,
    source_seconds: int | None = None,
) -> str:
    """Download one model source at a time. A hung source is killed and skipped."""

    stall_limit = stall_seconds if stall_seconds is not None else _env_int("CHARACTOID_SNAPSHOT_STALL_SECONDS", DEFAULT_STALL_SECONDS)
    source_limit = source_seconds if source_seconds is not None else _env_int("CHARACTOID_SNAPSHOT_SOURCE_SECONDS", DEFAULT_SOURCE_SECONDS)
    target.mkdir(parents=True, exist_ok=True)
    errors: list[str] = []
    for source in snapshot_sources(primary):
        if cancel_event is not None and cancel_event.is_set():
            raise SnapshotCancelled()
        if on_progress:
            on_progress(source, 0, 0)
        log_path = target / f".charactoid-snapshot-{source}.log"
        command = [str(python), "-c", SNAPSHOT_SCRIPT % (model_id, str(target), source)]
        log_file = log_path.open("w", encoding="utf-8", errors="replace")
        try:
            process = subprocess.Popen(
                command,
                cwd=str(cwd),
                env=env,
                stdout=log_file,
                stderr=subprocess.STDOUT,
            )
        except OSError as exc:
            log_file.close()
            errors.append(f"{source}: {exc}")
            continue
        if set_process:
            set_process(process)
        started = time.monotonic()
        last_change = started
        last_fp = directory_fingerprint(target)
        timed_out = False
        try:
            while True:
                if cancel_event is not None and cancel_event.is_set():
                    kill_process(process)
                    raise SnapshotCancelled()
                code = process.poll()
                fingerprint = directory_fingerprint(target)
                now = time.monotonic()
                if fingerprint != last_fp:
                    last_fp = fingerprint
                    last_change = now
                    if on_progress:
                        on_progress(source, fingerprint[0], int(now - started))
                if code is not None:
                    try:
                        process.wait(timeout=1)
                    except subprocess.TimeoutExpired:
                        kill_process(process)
                    break
                if now - started >= source_limit or now - last_change >= stall_limit:
                    kill_process(process)
                    timed_out = True
                    break
                time.sleep(0.2)
        finally:
            log_file.close()
            if set_process:
                set_process(None)
        if process.returncode == 0 and not timed_out:
            return source
        detail = ""
        try:
            detail = log_path.read_text(encoding="utf-8", errors="replace")[-1500:]
        except OSError:
            detail = ""
        if timed_out:
            waited = int(time.monotonic() - last_change)
            errors.append(f"{source}: 无进度超过 {waited}s，已中止并切换源" + (f"：{detail.strip()}" if detail.strip() else ""))
        else:
            errors.append(f"{source}: {detail.strip() or f'exit {process.returncode}'}")
    raise RuntimeError("模型快照下载失败：" + " | ".join(errors))
