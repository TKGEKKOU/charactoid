from ingestion.local_embedding.resources import resolve_local_model_id


class FakeGPTInstall:
    def __init__(self, *, installing=False, installed=False, error=""):
        self.started = []
        self.installing = installing
        self.installed = installed
        self.error = error
        self.download_url = "https://example.test/gpt-sovits.7z"

    def status(self):
        return {
            "installed": self.installed,
            "installation_ready": self.installed,
            "ready": False,
            "service_running": False,
            "installing": self.installing,
            "error": self.error,
            "missing": [] if self.installed else ["install_dir"],
            "next_action": "wait" if self.installing else ("start_service" if self.installed else "install"),
            "install_dir": "E:/managed/gpt_sovits" if self.installed else "",
            "download_url": self.download_url,
        }

    def start_install(self, url):
        self.started.append(url)
        self.installing = True
        return self.status()


class FakeGPTInstalledIdle(FakeGPTInstall):
    def start_install(self, url):
        self.started.append(url)
        self.installed = True
        self.installing = False
        self.error = ""
        return self.status()


class FakeEmbedding:
    def __init__(self):
        self.started = []
        self.configured = []
        self._status = {
            "installed": False,
            "ready": False,
            "installing": False,
            "phase": "idle",
            "model_id": "text-embedding-v3",
            "source": "modelscope",
            "device": "auto",
        }

    def status(self):
        return dict(self._status)

    def resolve_install_model_id(self, model_id=""):
        return resolve_local_model_id(model_id or self._status.get("model_id"))

    def configure(self, *args, **kwargs):
        self.configured.append((args, kwargs))
        return self.status()

    def start_install(self, model_id, source="modelscope", device="auto"):
        self.started.append((model_id, source, device))
        self._status.update(installing=True, phase="preparing", model_id=model_id)
        return self.status()


def _headers():
    return {"X-CHARACTOID-Request": "web"}


def test_gpt_sovits_unconfigured_probe_does_not_fail_active_install(client):
    fake = FakeGPTInstall(
        installing=False,
        installed=False,
        error="未配置 GPT-SoVITS 安装目录",
    )
    client.app.state.gpt_sovits_install = fake
    client.app.state.gpt_sovits = None

    response = client.post(
        "/api/resources/gpt_sovits/install",
        json={"url": fake.download_url},
        headers=_headers(),
    )
    assert response.status_code == 202, response.text
    body = response.json()
    assert body["status"] != "failed"
    assert fake.started == [fake.download_url]

    detail = client.get(f"/api/resources/tasks/{body['task_id']}", headers=_headers())
    assert detail.status_code == 200
    assert detail.json()["status"] != "failed"


def test_gpt_sovits_installed_files_without_running_service_mark_task_ready(client):
    fake = FakeGPTInstalledIdle(installed=True, installing=False, error="")
    client.app.state.gpt_sovits_install = fake
    client.app.state.gpt_sovits = None

    response = client.post(
        "/api/resources/gsv_tts_local/install",
        json={"parameters": {"url": fake.download_url}},
        headers=_headers(),
    )
    assert response.status_code == 202, response.text
    body = response.json()
    assert body["provider_id"] == "gpt_sovits"
    assert body["status"] in {"ready", "done", "succeeded", "success"}
    assert body["phase"] in {"done", "complete", "ready"}


def test_local_embedding_install_ignores_cloud_api_model_and_does_not_configure(client):
    fake = FakeEmbedding()
    client.app.state.embedding_resources = fake

    response = client.post(
        "/api/resources/local_embedding/install",
        json={"parameters": {"model_id": "text-embedding-v3", "source": "modelscope", "device": "cpu"}},
        headers=_headers(),
    )
    assert response.status_code == 202, response.text
    body = response.json()
    assert body["provider_id"] == "embedding"
    assert fake.configured == []
    assert fake.started == [("Qwen/Qwen3-Embedding-0.6B", "modelscope", "cpu")]
