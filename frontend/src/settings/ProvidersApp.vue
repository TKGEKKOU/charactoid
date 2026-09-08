<script setup lang="ts">
import { Check, Download, ExternalLink, FolderOpen, Power, RefreshCw, Settings, Trash2, X } from "lucide-vue-next";
import { computed, onBeforeUnmount, onMounted, ref, watch } from "vue";

interface ResourceComponent {
  ready?: boolean;
  label?: string;
  path?: string;
  count?: number;
}

interface ResourceStatus {
  installed?: boolean;
  ready?: boolean;
  installing?: boolean;
  service_running?: boolean;
  model_id?: string;
  source?: string;
  device?: string;
  actual_device?: string;
  model_dir?: string;
  install_dir?: string;
  error?: string;
  phase?: string;
  progress_percent?: number;
  install?: { installed?: boolean; installing?: boolean; service_running?: boolean; error?: string };
  components?: Record<string, ResourceComponent>;
  [key: string]: unknown;
}

interface Provider {
  id: string;
  name: string;
  type: string;
  description: string;
  default_base_url: string;
  default_model: string;
  requires_api_key: boolean;
  supports_streaming: boolean;
  mode: "api" | "local";
  resource_kind?: string;
  resource_status?: ResourceStatus | null;
  runtime_supported: boolean;
  runtime_note: string;
  is_configured: boolean;
  is_active: boolean;
  current_api_key: string;
  current_base_url: string;
  current_model: string;
}

interface DownloadTask {
  task_id: string; provider_id: string; resource_kind?: string; resource_name?: string;
  status: string; phase?: string; progress_percent?: number | null;
  downloaded_bytes?: number; total_bytes?: number; speed_bytes_per_second?: number;
  eta_seconds?: number | null; current_file?: string; error_message?: string;
  retry_count?: number; updated_at?: string;
  [key: string]: unknown;
}

interface ProviderConfig {
  provider_type: string;
  provider_id: string;
  api_key?: string;
  base_url?: string;
  model?: string;
  source?: string;
  device?: string;
  enabled: boolean;
}

const providers = ref<Provider[]>([]);
const activeTab = ref<string>("llm");
const loading = ref(false);
const error = ref("");
const configuring = ref<string | null>(null);
const testing = ref<string | null>(null);
const resourceAction = ref<string | null>(null);
const saveStatus = ref("");
const testStatus = ref("");
const testFeedback = ref<Record<string, { ok: boolean; message: string }>>({});
const FIXED_GPT_SOVITS_URL = "https://huggingface.co/lj1995/GPT-SoVITS-windows-package/resolve/main/GPT-SoVITS-v3lora-20250228.7z?download=true";
const installUrl = ref(FIXED_GPT_SOVITS_URL);
const downloadTasks = ref<DownloadTask[]>([]);
const downloadsOpen = ref(false);
const rvcWorkspaceOpen = ref(false);
const ffmpegOpen = ref(false);
const ffmpegDetecting = ref(false);
const ffmpegDetectNote = ref("");
const pendingLocalEnable = new Set<string>();
const downloadsLoading = ref(false);
let downloadsTimer: number | undefined;

const configForm = ref<ProviderConfig>({
  provider_type: "", provider_id: "", api_key: "", base_url: "", model: "",
  source: "modelscope", device: "auto", enabled: false,
});

const tabs = [
  { id: "llm", label: "对话模型(LLM)", count: 0 },
  { id: "embedding", label: "知识库向量化(Embedding)", count: 0 },
  { id: "reranker", label: "检索重排(Rerank)", count: 0 },
  { id: "stt", label: "语音识别(STT)", count: 0 },
  { id: "tts", label: "对话语音(TTS)", count: 0 },
  { id: "web_search", label: "联网搜索(Web)", count: 0 },
  { id: "audio", label: "音频(Audio)", count: 0 },
];

const filteredProviders = computed(() => providers.value.filter(p => p.type === activeTab.value));
const rvcProvider = computed(() => providers.value.find(p => p.id === "rvc"));
const separatorProvider = computed(() => providers.value.find(p => p.id === "separator"));
const localSttProvider = computed(() => providers.value.find(p => p.id === "local_stt"));
const gsvTtsProvider = computed(() => providers.value.find(p => p.id === "gsv_tts_local"));
const ffmpegStatus = ref<Record<string, unknown>>({});
const selectedProvider = computed(() => providers.value.find(p => p.id === configuring.value));

const overlayOpen = computed(() => Boolean(configuring.value || downloadsOpen.value || rvcWorkspaceOpen.value || ffmpegOpen.value));
watch(overlayOpen, (open) => {
  document.body.classList.toggle("provider-modal-open", open);
  document.documentElement.classList.toggle("provider-modal-open", open);
});
watch(activeTab, (tab) => {
  if (tab === "audio") void callFfmpeg("detect");
});
const resourceConfigKind = computed(() => {
  const id = selectedProvider.value?.id;
  if (id === "local_embedding") return "embedding";
  if (id === "local_rerank") return "reranker";
  if (id === "local_stt") return "stt";
  if (id === "gsv_tts_local") return "gpt_sovits";
  if (id === "separator") return "separator";
  return "none";
});
function resourceConfigHint() {
  switch (resourceConfigKind.value) {
    case "embedding": return "用于知识库向量化；安装前可选择模型来源和运行设备。";
    case "reranker": return "用于检索结果重排；未安装时仍可使用 RRF 融合，不会阻断检索。";
    case "stt": return "本地语音识别由系统按固定清单准备，不需要在此重复填写模型参数。";
    case "gpt_sovits": return "引擎按需启动；安装完成后，声音资产仍在“声音”模块管理。";
    case "separator": return "人声分离使用应用已验证的固定模型，不需要填写通用模型来源或设备。";
    default: return "";
  }
}


const resourceHandlers: Record<string, { status: string; install?: string; cancel?: string; remove?: string; directory?: string; start?: string; stop?: string }> = {
  local_embedding: { status: "/api/embedding/status", install: "/api/embedding/install", cancel: "/api/embedding/install/cancel", remove: "/api/embedding/model", directory: "/api/embedding/model-directory" },
  local_rerank: { status: "/api/reranker/status", install: "/api/reranker/install", cancel: "/api/reranker/install/cancel", remove: "/api/reranker/model", directory: "/api/reranker/model-directory" },
  local_stt: { status: "/api/stt/status", install: "/api/stt/install", cancel: "/api/stt/install/cancel", remove: "/api/stt/install", directory: "/api/stt/model-directory" },
  gsv_tts_local: { status: "/api/gpt-sovits/status", install: "/api/gpt-sovits/install", cancel: "/api/gpt-sovits/install/cancel", remove: "/api/gpt-sovits/install", directory: "/api/gpt-sovits/model-directory", start: "/api/gpt-sovits/service/start", stop: "/api/gpt-sovits/service/stop" },
  // RVC 是音色转换资源，不计入 TTS 供应商数量；后端未实现时由抽屉显示可读错误。
  rvc: { status: "/api/providers/rvc/status", install: "/api/providers/rvc/install", cancel: "/api/providers/rvc/install/cancel", remove: "/api/providers/rvc/install", directory: "/api/providers/rvc/directory" },
  separator: { status: "/api/providers/resources/separator", install: "/api/providers/resources/separator/install", cancel: "/api/providers/resources/tasks", remove: "/api/providers/resources/separator", directory: "/api/providers/resources/separator" },
};

function isActiveDownload(task: DownloadTask) {
  return ["queued", "preparing", "downloading", "verifying", "installing", "running"].includes(task.status);
}
const activeDownloads = computed(() => downloadTasks.value.filter(isActiveDownload));
const finishedDownloadCount = computed(() => downloadTasks.value.filter(task => !isActiveDownload(task)).length);
function formatBytes(value?: number) {
  if (!value || value < 1024) return `${value || 0} B`;
  const units = ["KB", "MB", "GB", "TB"]; let n = value; let i = -1;
  do { n /= 1024; i++; } while (n >= 1024 && i < units.length - 1);
  return `${n.toFixed(n >= 100 ? 0 : n >= 10 ? 1 : 2)} ${units[i]}`;
}
function formatEta(value?: number | null) {
  if (value == null || value < 0) return "—";
  if (value < 60) return `${Math.round(value)} 秒`;
  return `${Math.floor(value / 60)} 分 ${Math.round(value % 60)} 秒`;
}
function taskStatusLabel(task: DownloadTask) {
  const labels: Record<string, string> = { queued: "排队中", preparing: "准备中", downloading: "下载中", verifying: "校验中", installing: "安装中", ready: "已完成", failed: "失败", cancelled: "已取消", running: "运行中", interrupted: "已中断" };
  return labels[task.status] || task.status;
}
function phaseLabel(phase?: string) {
  const labels: Record<string, string> = {
    idle: "",
    preparing: "准备中",
    runtime: "安装运行环境",
    model: "下载模型",
    ffmpeg: "安装 FFmpeg",
    loading: "探测模型",
    downloading: "下载中",
    verifying: "校验中",
    installing: "安装中",
    complete: "完成",
    done: "完成",
    cancelling: "取消中",
    error: "失败",
    failed: "失败",
    interrupted: "已中断",
    running: "运行中",
  };
  if (!phase) return "";
  return labels[phase] || phase;
}
async function fetchDownloadTasks() {
  downloadsLoading.value = true;
  try {
    const response = await fetch("/api/resources/tasks?limit=30", { headers: { "X-CHARACTOID-Request": "web" }, cache: "no-store" });
    if (!response.ok) return;
    const data = await response.json();
    const items = Array.isArray(data) ? data : (data.tasks || data.items || []);
    downloadTasks.value = items.map((task: DownloadTask) => ({
      ...task,
      progress_percent: task.progress_percent ?? (typeof task.progress === "number" ? task.progress : null),
      error_message: task.error_message ?? task.error,
      current_file: task.current_file ?? task.detail,
    }));
  } catch { /* 旧后端没有统一任务接口时，保留供应商状态显示 */ }
  finally { downloadsLoading.value = false; }
}
async function cancelDownload(task: DownloadTask) {
  try {
    await fetch(`/api/resources/tasks/${encodeURIComponent(task.task_id)}`, { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } });
    await fetchDownloadTasks();
  } catch (e) { error.value = e instanceof Error ? e.message : "取消下载失败"; }
}
async function clearFinishedDownloads() {
  try {
    const response = await fetch("/api/resources/tasks?finished=true", { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } });
    if (!response.ok) { const data = await response.json().catch(() => ({})); throw new Error(data.detail || `HTTP ${response.status}`); }
    await fetchDownloadTasks();
  } catch (e) { error.value = e instanceof Error ? e.message : "清理下载记录失败"; }
}

async function retryDownload(task: DownloadTask) {
  try {
    const response = await fetch(`/api/resources/tasks/${encodeURIComponent(task.task_id)}/retry`, { method: "POST", headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" } });
    if (!response.ok) { const data = await response.json().catch(() => ({})); throw new Error(data.detail || `HTTP ${response.status}`); }
    await fetchDownloadTasks();
  } catch (e) { error.value = e instanceof Error ? e.message : "重试下载失败"; }
}

async function fetchFfmpegStatus() {
  try {
    const response = await fetch("/api/providers/resources/ffmpeg/status", { headers: { "X-CHARACTOID-Request": "web" }, cache: "no-store" });
    if (response.ok) ffmpegStatus.value = await response.json();
  } catch { /* 音频资源接口不可用时保留已有状态 */ }
}
async function callFfmpeg(action: "install" | "remove" | "directory" | "detect") {
  const urls = { install: "/api/providers/resources/ffmpeg/install", remove: "/api/providers/resources/ffmpeg", directory: "/api/providers/resources/ffmpeg/directory", detect: "/api/providers/resources/ffmpeg/detect" };
  resourceAction.value = `ffmpeg:${action}`; error.value = "";
  if (action === "detect") ffmpegDetecting.value = true;
  try {
    const response = await fetch(urls[action], { method: action === "remove" ? "DELETE" : action === "directory" ? "GET" : "POST", headers: { "X-CHARACTOID-Request": "web" } });
    if (!response.ok) { const data = await response.json().catch(() => ({})); throw new Error(data.detail || `HTTP ${response.status}`); }
    ffmpegStatus.value = await response.json();
    ffmpegDetectNote.value = String(ffmpegStatus.value.detection_note || "");
  } catch (e) { error.value = e instanceof Error ? e.message : "FFmpeg 操作失败"; }
  finally {
    resourceAction.value = null;
    if (action === "detect") ffmpegDetecting.value = false;
  }
}

async function fetchProviders(options?: { quiet?: boolean } | Event) {
  const quiet = Boolean(options && typeof options === "object" && "quiet" in options && options.quiet);
  if (!quiet) { loading.value = true; error.value = ""; }
  try {
    const response = await fetch("/api/providers/list", { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    providers.value = data.providers || [];
    await fetchFfmpegStatus();
    tabs.forEach(tab => { tab.count = providers.value.filter(p => p.type === tab.id).length; });
  } catch (e) {
    if (!quiet) error.value = e instanceof Error ? e.message : "加载失败";
  } finally { if (!quiet) loading.value = false; }
}

function closeOverlays() {
  configuring.value = null;
  downloadsOpen.value = false;
  rvcWorkspaceOpen.value = false;
  ffmpegOpen.value = false;
}
function openDownloads() {
  closeOverlays();
  downloadsOpen.value = true;
}
function openFfmpegManage() {
  closeOverlays();
  ffmpegOpen.value = true;
  ffmpegDetectNote.value = "";
  void callFfmpeg("detect");
}
function openConfig(provider: Provider) {
  closeOverlays();
  if (provider.id === "rvc") {
    rvcWorkspaceOpen.value = true;
    void fetchProviders();
    return;
  }
  configuring.value = provider.id; saveStatus.value = ""; testStatus.value = ""; error.value = "";
  const status = provider.resource_status || {};
  let model = provider.current_model || "";
  if ((provider.id === "local_embedding" || provider.id === "local_rerank") && !String(model).includes("/")) {
    model = String(status.model_id || provider.default_model || "");
  } else if (!model) {
    model = String(status.model_id || provider.default_model || "");
  }
  configForm.value = {
    provider_type: provider.type, provider_id: provider.id,
    api_key: provider.current_api_key || "",
    base_url: provider.current_base_url || provider.default_base_url,
    model,
    source: String(status.source || "modelscope"), device: String(status.device || "auto"),
    enabled: provider.is_active,
  };
  installUrl.value = FIXED_GPT_SOVITS_URL;
}

function closeRvcWorkspace() {
  rvcWorkspaceOpen.value = false;
  error.value = "";
}

function rvcComponent(key: string) {
  const components = rvcProvider.value?.resource_status?.components as Record<string, Record<string, unknown>> | undefined;
  return components?.[key] || {};
}
function rvcComponentReady(key: string) { return Boolean(rvcComponent(key).ready); }
function rvcComponentLabel(key: string) {
  return rvcComponentReady(key) ? "已就绪" : key === "indices" ? "可选" : "待准备";
}
function rvcProgressPercent() {
  const fromTask = taskProgressValue(installTask(rvcProvider.value));
  if (fromTask != null) return fromTask;
  return clampPercent(rvcProvider.value?.resource_status?.progress_percent);
}

function closeConfig() {
  configuring.value = null; saveStatus.value = ""; testStatus.value = ""; installUrl.value = "";
  configForm.value = { provider_type: "", provider_id: "", api_key: "", base_url: "", model: "", source: "modelscope", device: "auto", enabled: false }; installUrl.value = FIXED_GPT_SOVITS_URL;
}

async function saveConfig() {
  if (!configForm.value.provider_id) return;
  // 配置弹窗的主操作就是“保存并启用”；停用交给卡片右上角开关。
  configForm.value.enabled = true;
  loading.value = true; error.value = ""; saveStatus.value = "";
  try {
    const response = await fetch("/api/providers/configure", {
      method: "POST", headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
      body: JSON.stringify(providerConfigPayload()),
    });
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      throw new Error(errData.detail || `HTTP ${response.status}`);
    }
    const result = await response.json(); saveStatus.value = result.message || "配置已保存";
    await fetchProviders();
  } catch (e) { error.value = e instanceof Error ? e.message : "配置失败"; }
  finally { loading.value = false; }
}

function resourcePayload() {
  switch (resourceConfigKind.value) {
    case "embedding":
    case "reranker":
      return { model_id: configForm.value.model, source: configForm.value.source || "modelscope", device: configForm.value.device || "auto" };
    case "gpt_sovits": return { url: installUrl.value.trim() };
    default: return {};
  }
}
function providerConfigPayload() {
  const value = { ...configForm.value };
  if (selectedProvider.value?.mode === "local") {
    if (!["embedding", "reranker"].includes(resourceConfigKind.value)) {
      delete value.model; delete value.source; delete value.device;
    }
    delete value.api_key; delete value.base_url;
  }
  return value;
}

async function callResource(provider: Provider | null | undefined, action: "install" | "cancel" | "remove" | "directory" | "start" | "stop") {
  if (!provider) return;
  const handler = resourceHandlers[provider.id]; const url = handler?.[action];
  if (!url) return;
  resourceAction.value = `${provider.id}:${action}`; error.value = "";
  try {
    const method = action === "remove" || action === "cancel" ? "DELETE" : action === "directory" && provider.id === "rvc" ? "GET" : action === "install" || action === "directory" || action === "start" || action === "stop" ? "POST" : "GET";
    let body: string | undefined;
    if (action === "install") body = provider.id === "gsv_tts_local" ? JSON.stringify({ url: installUrl.value.trim() }) : provider.id === "local_stt" ? undefined : JSON.stringify(resourcePayload());
    let response: Response;
    if (action === "install" && provider.mode === "local") {
      const unifiedUrl = `/api/resources/${encodeURIComponent(provider.id)}/install`;
      response = await fetch(unifiedUrl, { method: "POST", headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body: JSON.stringify({ parameters: provider.id === "gsv_tts_local" ? { url: installUrl.value.trim() } : resourcePayload() }) });
      // 老版本后端没有统一资源路由时，回退到原 Provider 安装接口。
      if (response.status === 404 || response.status === 405) response = await fetch(url, { method, headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body });
    } else {
      response = await fetch(url, { method, headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body });
    }
    if (!response.ok) {
      const data = await response.json().catch(() => ({})); throw new Error(data.detail || `HTTP ${response.status}`);
    }
    if (action === "install" && ["local_stt", "gsv_tts_local", "local_embedding", "local_rerank"].includes(provider.id)) pendingLocalEnable.add(provider.id);
    await fetchProviders(); await fetchDownloadTasks();
    await enablePendingLocalProviders();
  } catch (e) { error.value = e instanceof Error ? e.message : "资源操作失败"; }
  finally { resourceAction.value = null; }
}

async function toggleProvider(provider: Provider) {
  loading.value = true; error.value = "";
  try {
    const response = await fetch("/api/providers/configure", {
      method: "POST", headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
      body: JSON.stringify({ provider_type: provider.type, provider_id: provider.id, api_key: provider.current_api_key, base_url: provider.current_base_url || provider.default_base_url, model: provider.current_model || provider.default_model, source: provider.resource_status?.source, device: provider.resource_status?.device, enabled: !provider.is_active }),
    });
    if (!response.ok) { const data = await response.json().catch(() => ({})); throw new Error(data.detail || `HTTP ${response.status}`); }
    await fetchProviders();
  } catch (e) { error.value = e instanceof Error ? e.message : "切换失败"; }
  finally { loading.value = false; }
}

async function testProvider(provider: Provider) {
  testing.value = provider.id; error.value = "";
  testFeedback.value = { ...testFeedback.value, [provider.id]: { ok: false, message: "正在测试连接…" } };
  try {
    const response = await fetch("/api/providers/test", {
      method: "POST", headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
      body: JSON.stringify({ provider_type: provider.type, provider_id: provider.id, api_key: provider.current_api_key, base_url: provider.current_base_url, model: provider.current_model }),
    });
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new Error(data.detail || `HTTP ${response.status}`);
    }
    const result = await response.json();
    const ok = Boolean(result.ok);
    const message = ok
      ? `成功${result.latency_ms ? ` · ${result.latency_ms} ms` : ""}`
      : `失败 · ${result.message || "未通过"}`;
    testFeedback.value = { ...testFeedback.value, [provider.id]: { ok, message } };
    testStatus.value = message;
  } catch (e) {
    const message = `失败 · ${e instanceof Error ? e.message : "网络错误"}`;
    testFeedback.value = { ...testFeedback.value, [provider.id]: { ok: false, message } };
    testStatus.value = message;
  } finally { testing.value = null; }
}

function resourceReady(provider?: Provider | null) {
  if (!provider) return false;
  const status = provider.resource_status || {};
  return Boolean(status.ready || status.service_running || status.installed || status.install?.installed);
}
function resourceInstalling(provider?: Provider | null) {
  if (!provider) return false;
  const status = provider.resource_status || {};
  return Boolean(status.installing || status.install?.installing);
}

const resourceTaskAliases: Record<string, string[]> = {
  local_stt: ["local_stt", "stt", "asr"],
  gsv_tts_local: ["gsv_tts_local", "tts", "gpt_sovits"],
  local_embedding: ["local_embedding", "embedding"],
  local_rerank: ["local_rerank", "reranker"],
  rvc: ["rvc"],
  separator: ["separator"],
  ffmpeg: ["ffmpeg"],
};

function matchesResourceTask(task: DownloadTask, providerId: string) {
  const aliases = resourceTaskAliases[providerId] || [providerId];
  return aliases.includes(task.provider_id) || aliases.includes(String(task.resource_kind || ""));
}

function lookupDownloadTask(providerId: string): DownloadTask | null {
  const matches = downloadTasks.value.filter(task => matchesResourceTask(task, providerId));
  return matches.find(isActiveDownload) || matches[0] || null;
}

function installTask(provider?: Provider | null): DownloadTask | null {
  if (!provider) return null;
  return lookupDownloadTask(provider.id);
}

function installBusy(provider?: Provider | null) {
  if (!provider) return false;
  const task = installTask(provider);
  return resourceInstalling(provider) || Boolean(task && isActiveDownload(task));
}
function isProviderTaskActive(provider?: Provider | null) {
  const task = installTask(provider);
  return Boolean(task && isActiveDownload(task));
}

function clampPercent(value: unknown): number | null {
  if (typeof value !== "number" || !Number.isFinite(value)) return null;
  return Math.min(100, Math.max(0, value));
}
function taskProgressValue(task?: DownloadTask | null): number | null {
  return clampPercent(task?.progress_percent);
}
function installProgressValue(provider?: Provider | null): number | null {
  if (!provider) return null;
  const fromTask = taskProgressValue(installTask(provider));
  if (fromTask != null) return fromTask;
  return clampPercent(provider.resource_status?.progress_percent);
}
function installProgress(provider?: Provider | null) {
  return installProgressValue(provider) ?? 0;
}
function progressLabel(value: number | null | undefined) {
  return value == null ? "进行中" : `${Math.round(value)}%`;
}
function progressBarClass(value: number | null | undefined, active = true) {
  return { "task-progress": true, active, determinate: active && value != null, indeterminate: active && value == null };
}
function progressFillStyle(value: number | null | undefined) {
  return value == null ? undefined : { width: `${value}%` };
}

function ffmpegInstallTask() {
  return lookupDownloadTask("ffmpeg");
}

function ffmpegBusy() {
  const task = ffmpegInstallTask();
  return Boolean((task && isActiveDownload(task)) || resourceAction.value === "ffmpeg:install");
}
function isFfmpegTaskActive() {
  const task = ffmpegInstallTask();
  return Boolean(task && isActiveDownload(task));
}
function ffmpegTaskLabel() {
  const task = ffmpegInstallTask();
  return task ? taskStatusLabel(task) : "安装中";
}

function resourceLabel(provider: Provider) {
  const task = installTask(provider);
  if (task && isActiveDownload(task)) {
    const percent = task.progress_percent == null ? "" : ` ${Math.round(Number(task.progress_percent) || 0)}%`;
    return `${taskStatusLabel(task)}${percent}${phaseLabel(task.phase) ? ` · ${phaseLabel(task.phase)}` : ""}`;
  }
  if (resourceInstalling(provider)) {
    const percentValue = provider.resource_status?.progress_percent;
    const percent = typeof percentValue === "number" ? ` ${Math.round(percentValue)}%` : "";
    return `安装中${percent}${phaseLabel(String(provider.resource_status?.phase || "")) ? ` · ${phaseLabel(String(provider.resource_status?.phase || ""))}` : ""}`;
  }
  if (provider.id === "gsv_tts_local" && provider.resource_status?.service_running) return "服务运行中";
  if (resourceReady(provider)) return "资源就绪";
  return "未安装";
}

function ffmpegDetected() {
  return Boolean(ffmpegStatus.value.installed || ffmpegStatus.value.ready || ffmpegStatus.value.cache_available || ffmpegStatus.value.system_path);
}
function ffmpegLabel() {
  if (ffmpegBusy()) return ffmpegTaskLabel();
  if (ffmpegStatus.value.installed) return "托管副本已就绪";
  if (ffmpegStatus.value.system_path) return "已检测到系统 FFmpeg";
  if (ffmpegStatus.value.cache_available) return "已检测到本地缓存";
  if (ffmpegStatus.value.detected) return "已检测到";
  return "未检测到";
}
function resourceDetail(provider: Provider) {
  const status = provider.resource_status || {};
  if (provider.id === "local_stt") {
    if (resourceReady(provider)) return String(status.model_id || status.resolved_model || "Qwen3-ASR-0.6B");
    return "未安装本地识别";
  }
  if (provider.id === "gsv_tts_local") {
    if (status.service_running) return `本地服务运行中 · 端口 ${status.api_port || "9880"}`;
    if (resourceReady(provider)) return "GPT-SoVITS 已安装";
    return "未安装本地引擎";
  }
  if (resourceReady(provider)) return String(status.model_id || "资源就绪");
  return String(status.model_id || "尚未安装资源");
}
async function enablePendingLocalProviders() {
  const ids = [...pendingLocalEnable];
  if (!ids.length) return;
  for (const id of ids) {
    const provider = providers.value.find(item => item.id === id);
    if (!provider || !resourceReady(provider)) continue;
    if (provider.is_active) { pendingLocalEnable.delete(id); continue; }
    const response = await fetch("/api/providers/configure", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
      body: JSON.stringify({ provider_type: provider.type, provider_id: provider.id, enabled: true }),
    });
    if (response.ok) pendingLocalEnable.delete(id);
  }
  if (ids.some(id => !pendingLocalEnable.has(id))) await fetchProviders({ quiet: true });
}
function handleKeydown(event: KeyboardEvent) {
  if (event.key !== "Escape") return;
  if (configuring.value) closeConfig();
  else if (downloadsOpen.value) downloadsOpen.value = false;
  else if (rvcWorkspaceOpen.value) closeRvcWorkspace();
  else if (ffmpegOpen.value) ffmpegOpen.value = false;
}

onMounted(() => {
  void fetchProviders(); void fetchDownloadTasks();
  downloadsTimer = window.setInterval(() => {
    void fetchDownloadTasks();
    void fetchFfmpegStatus();
    if (activeTab.value === "audio" || activeDownloads.value.length || providers.value.some(p => resourceInstalling(p))) {
      void fetchProviders({ quiet: true }).then(() => enablePendingLocalProviders());
    }
  }, 2500);
  window.addEventListener("keydown", handleKeydown);
});
onBeforeUnmount(() => {
  document.body.classList.remove("provider-modal-open");
  document.documentElement.classList.remove("provider-modal-open");
  if (downloadsTimer) window.clearInterval(downloadsTimer);
  window.removeEventListener("keydown", handleKeydown);
});
</script>


<template>
  <div class="providers-settings">
    <nav class="provider-tabs" role="tablist" aria-label="供应商类型">
      <button v-for="tab in tabs" :key="tab.id" :class="['tab-button', { active: activeTab === tab.id }]" role="tab" :aria-selected="activeTab === tab.id" @click="activeTab = tab.id">
        <span>{{ tab.label }}</span>
      </button>
    </nav>

    <section v-if="activeDownloads.length || activeTab === 'audio'" class="download-center" aria-label="资源下载中心">
      <button class="download-summary" type="button" @click="openDownloads" :aria-expanded="downloadsOpen">
        <span class="download-summary-icon"><Download :size="16" :class="{ spin: activeDownloads.length > 0 }" /></span>
        <span class="download-summary-copy"><strong>{{ activeDownloads.length ? `正在处理 ${activeDownloads.length} 个资源` : '资源任务中心' }}</strong><span>{{ activeDownloads[0] ? `${activeDownloads[0].resource_name || activeDownloads[0].provider_id} · ${taskStatusLabel(activeDownloads[0])}` : '查看最近的安装、校验与失败记录' }}</span></span>
        <span class="download-summary-progress" v-if="activeDownloads[0]" :class="{ active: true, determinate: taskProgressValue(activeDownloads[0]) != null, indeterminate: taskProgressValue(activeDownloads[0]) == null }"><b>{{ progressLabel(taskProgressValue(activeDownloads[0])) }}</b><i><em :style="progressFillStyle(taskProgressValue(activeDownloads[0]))"></em></i></span>
        <span class="download-summary-arrow">查看详情 →</span>
      </button>
    </section>

    <section v-if="activeTab === 'audio'" class="local-production-zone audio-workbench" aria-labelledby="local-production-title">
      <div class="section-heading"><div><span class="section-label">AUDIO WORKBENCH</span><h3 id="local-production-title">本地音频工作台</h3></div><span class="section-note">通用资源给各音频能力共用。GPT-SoVITS 装好后会出现在「对话语音(TTS)」；本地识别装好后会出现在「语音识别(STT)」。FFmpeg 用检测查看本机是否已有，不会开始下载。</span></div>

      <section class="audio-section" aria-labelledby="audio-common-title">
        <div class="audio-section-head"><h4 id="audio-common-title">通用资源</h4><span>人声分离与 FFmpeg，供各音频能力共用</span></div>
        <div class="production-grid audio-grid audio-grid-2">
        <article v-if="separatorProvider" class="production-card">
          <div class="production-card-head"><div><span class="production-kicker">PREP</span><h3>人声分离</h3></div><span :class="['status-chip', { on: separatorProvider.resource_status?.ready }]">{{ separatorProvider.resource_status?.ready ? '已就绪' : installBusy(separatorProvider) ? resourceLabel(separatorProvider) : '未准备' }}</span></div>
          <p>切片和音频生产共用的 HT-Demucs 前处理模型。</p>
          <div v-if="installBusy(separatorProvider)" class="install-progress">
            <div class="install-progress-head"><strong>{{ resourceLabel(separatorProvider) }}</strong><b>{{ progressLabel(installProgressValue(separatorProvider)) }}</b></div>
            <div :class="progressBarClass(installProgressValue(separatorProvider))"><i :style="progressFillStyle(installProgressValue(separatorProvider))"></i></div>
          </div>
          <div class="production-actions">
            <button class="button button-primary" type="button" @click="openConfig(separatorProvider)"><Settings :size="15" />管理</button>
            <button v-if="installBusy(separatorProvider)" class="button button-secondary" type="button" @click="callResource(separatorProvider, 'cancel')" :disabled="resourceAction !== null">取消</button>
          </div>
        </article>
        <article class="production-card production-card-ffmpeg">
          <div class="production-card-head"><div><span class="production-kicker">FFMPEG</span><h3>FFmpeg</h3></div><span :class="['status-chip', { on: ffmpegDetected() }]">{{ ffmpegLabel() }}</span></div>
          <p>音视频前处理运行时。点检测即可确认托管副本、系统 PATH 或本地缓存，不必先点下载。</p>
          <div class="production-facts"><span>托管副本：{{ ffmpegStatus.installed ? '已存在' : '未安装' }}</span><span>系统/缓存：{{ ffmpegStatus.system_path ? 'PATH 已找到' : ffmpegStatus.cache_available ? '本地缓存已找到' : '未找到' }}</span></div>
          <div v-if="ffmpegBusy()" class="install-progress">
            <div class="install-progress-head"><strong>{{ ffmpegTaskLabel() }}</strong><b>{{ progressLabel(taskProgressValue(ffmpegInstallTask())) }}</b></div>
            <div :class="progressBarClass(taskProgressValue(ffmpegInstallTask()))"><i :style="progressFillStyle(taskProgressValue(ffmpegInstallTask()))"></i></div>
          </div>
          <p v-if="ffmpegDetectNote" class="config-hint">{{ ffmpegDetectNote }}</p>
          <div class="production-actions">
            <button class="button button-secondary" type="button" @click="callFfmpeg('detect')" :disabled="ffmpegDetecting || resourceAction !== null"><RefreshCw :size="15" :class="{ spin: ffmpegDetecting }" />检测</button>
            <button class="button button-primary" type="button" @click="openFfmpegManage"><Settings :size="15" />管理</button>
          </div>
        </article>
        </div>
      </section>

      <section class="audio-section" aria-labelledby="audio-voice-title">
        <div class="audio-section-head"><h4 id="audio-voice-title">音色引擎</h4><span>GPT-SoVITS 与 RVC 并列，分别服务对话合成和音频变声</span></div>
        <div class="production-grid audio-grid audio-grid-2">
        <article v-if="gsvTtsProvider" class="production-card production-card-gsv">
          <div class="production-card-head"><div><span class="production-kicker">GPT-SOVITS</span><h3>对话音色引擎</h3></div><span :class="['status-chip', { on: gsvTtsProvider.resource_status?.service_running || resourceReady(gsvTtsProvider) }]">{{ resourceLabel(gsvTtsProvider) }}</span></div>
          <p>角色对话和声音训练共用的本地引擎。安装后会出现在「对话语音(TTS)」页。</p>
          <div class="production-facts"><span>安装包：{{ resourceReady(gsvTtsProvider) || gsvTtsProvider.resource_status?.installed ? '已就绪' : '未安装' }}</span><span>服务：{{ gsvTtsProvider.resource_status?.service_running ? '运行中' : '未启动' }}</span></div>
          <div v-if="installBusy(gsvTtsProvider)" class="install-progress">
            <div class="install-progress-head"><strong>{{ resourceLabel(gsvTtsProvider) }}</strong><b>{{ progressLabel(installProgressValue(gsvTtsProvider)) }}</b></div>
            <div :class="progressBarClass(installProgressValue(gsvTtsProvider))"><i :style="progressFillStyle(installProgressValue(gsvTtsProvider))"></i></div>
          </div>
          <div class="production-actions">
            <button class="button button-primary" type="button" @click="openConfig(gsvTtsProvider)"><Settings :size="15" />管理</button>
            <button v-if="installBusy(gsvTtsProvider)" class="button button-secondary" type="button" @click="callResource(gsvTtsProvider, 'cancel')" :disabled="resourceAction !== null">取消</button>
          </div>
        </article>
        <article v-if="rvcProvider" class="production-card production-card-rvc">
          <div class="production-card-head"><div><span class="production-kicker">RVC</span><h3>变声生产</h3></div><span :class="['status-chip', { on: rvcProvider.resource_status?.ready }]">{{ rvcProvider.resource_status?.ready ? '已就绪' : installBusy(rvcProvider) ? resourceLabel(rvcProvider) : '未准备' }}</span></div>
          <p>音频到音频变声运行时，不参与角色对话 TTS。</p>
          <div v-if="installBusy(rvcProvider)" class="install-progress">
            <div class="install-progress-head"><strong>{{ resourceLabel(rvcProvider) }}</strong><b>{{ progressLabel(installProgressValue(rvcProvider)) }}</b></div>
            <div :class="progressBarClass(installProgressValue(rvcProvider))"><i :style="progressFillStyle(installProgressValue(rvcProvider))"></i></div>
          </div>
          <div class="production-actions">
            <button class="button button-primary" type="button" @click="openConfig(rvcProvider)"><Settings :size="15" />管理</button>
          </div>
        </article>
        </div>
      </section>

      <section class="audio-section" aria-labelledby="audio-stt-title">
        <div class="audio-section-head"><h4 id="audio-stt-title">本地语音识别</h4><span>安装后同步到「语音识别(STT)」页</span></div>
        <div class="production-grid audio-grid audio-grid-1">
        <article v-if="localSttProvider" class="production-card production-card-stt">
          <div class="production-card-head"><div><span class="production-kicker">LOCAL STT</span><h3>本地语音识别</h3></div><span :class="['status-chip', { on: resourceReady(localSttProvider) }]">{{ resourceLabel(localSttProvider) }}</span></div>
          <p>Qwen3-ASR 给对话识别和 GPT-SoVITS 标注共用。安装后会出现在「语音识别(STT)」页。</p>
          <div class="production-facts"><span>模型：{{ resourceDetail(localSttProvider) }}</span><span>依赖：FFmpeg</span></div>
          <div v-if="installBusy(localSttProvider)" class="install-progress">
            <div class="install-progress-head"><strong>{{ resourceLabel(localSttProvider) }}</strong><b>{{ progressLabel(installProgressValue(localSttProvider)) }}</b></div>
            <div :class="progressBarClass(installProgressValue(localSttProvider))"><i :style="progressFillStyle(installProgressValue(localSttProvider))"></i></div>
          </div>
          <div class="production-actions">
            <button class="button button-primary" type="button" @click="openConfig(localSttProvider)"><Settings :size="15" />管理</button>
            <button v-if="installBusy(localSttProvider)" class="button button-secondary" type="button" @click="callResource(localSttProvider, 'cancel')" :disabled="resourceAction !== null">取消</button>
          </div>
        </article>
        </div>
      </section>
    </section>
    <main v-if="activeTab !== 'audio'" class="providers-main">
      <div v-if="loading && providers.length === 0" class="loading-state"><RefreshCw :size="22" class="spin" /><p>加载中...</p></div>
      <div v-else-if="error && providers.length === 0" class="error-state"><X :size="22" /><p>{{ error }}</p><button class="button button-primary" @click="fetchProviders">重试</button></div>
      <div v-else-if="filteredProviders.length === 0" class="empty-state"><p>这个分类暂时没有可用供应商。</p></div>
      <div v-else :class="['providers-grid', { compact: activeTab === 'llm' }]">
        <article v-for="provider in filteredProviders" :key="provider.type + ':' + provider.id" :class="['provider-card', { configured: provider.is_configured, active: provider.is_active, local: provider.mode === 'local' }]" tabindex="0" @click="openConfig(provider)" @keydown.enter="openConfig(provider)" @keydown.space.prevent="openConfig(provider)">
          <div class="provider-header"><div class="provider-title"><span class="provider-mark" :class="{ local: provider.mode === 'local' }"></span><h3>{{ provider.name }}</h3><span v-if="provider.mode === 'local'" class="mode-badge">本地</span><span v-else class="mode-badge api">API</span></div><button v-if="provider.runtime_supported" class="provider-switch" :class="{ on: provider.is_active }" type="button" role="switch" :aria-checked="provider.is_active" :aria-label="`${provider.is_active ? '停用' : '启用'} ${provider.name}`" @click.stop="toggleProvider(provider)" :disabled="loading"><span></span></button><span v-else class="active-label">仅配置</span></div>
          <p class="provider-description">{{ provider.description }}</p>
          <div v-if="provider.mode === 'local'" class="provider-meta resource-meta"><span class="meta-label">本地配置</span><strong>{{ resourceLabel(provider) }}</strong><code>{{ resourceDetail(provider) }}</code></div>
          <div v-if="provider.mode === 'local' && installBusy(provider)" class="install-progress" @click.stop>
            <div class="install-progress-head"><strong>{{ resourceLabel(provider) }}</strong><b>{{ progressLabel(installProgressValue(provider)) }}</b></div>
            <div :class="progressBarClass(installProgressValue(provider))"><i :style="progressFillStyle(installProgressValue(provider))"></i></div>
            <div class="download-task-meta">
              <span v-if="installTask(provider)?.current_file">当前文件：{{ installTask(provider)?.current_file }}</span>
              <span v-if="installTask(provider)?.total_bytes">{{ formatBytes(installTask(provider)?.downloaded_bytes) }} / {{ formatBytes(installTask(provider)?.total_bytes) }}</span>
              <span v-if="isProviderTaskActive(provider)">速度 {{ formatBytes(installTask(provider)?.speed_bytes_per_second) }}/秒 · 剩余 {{ formatEta(installTask(provider)?.eta_seconds) }}</span>
              <span v-if="installTask(provider)?.error_message || provider.resource_status?.error" class="task-error">{{ installTask(provider)?.error_message || provider.resource_status?.error }}</span>
            </div>
          </div>
          <div v-else-if="provider.type === 'web_search'" class="provider-meta"><span class="meta-label">搜索服务</span><code>{{ provider.name }}</code><span>{{ provider.current_api_key ? 'API Key 已配置' : '需要 API Key' }}</span></div><div v-else-if="provider.mode !== 'local'" class="provider-meta"><span class="meta-label">当前模型</span><code>{{ provider.current_model || provider.default_model || '按接口默认' }}</code><span v-if="provider.current_base_url" class="meta-url">{{ provider.current_base_url }}</span></div>
          <footer class="provider-actions"><button class="button button-secondary" type="button" @click.stop="openConfig(provider)"><Settings :size="15" />配置</button><button v-if="provider.mode === 'api' && provider.is_configured && provider.runtime_supported" class="button button-test" :class="{ 'is-success': testFeedback[provider.id]?.ok, 'is-error': testFeedback[provider.id] && !testFeedback[provider.id].ok }" type="button" @click.stop="testProvider(provider)" :disabled="testing === provider.id"><RefreshCw v-if="testing === provider.id" :size="15" class="spin" /><Check v-else-if="testFeedback[provider.id]?.ok" :size="15" /><X v-else-if="testFeedback[provider.id]" :size="15" />{{ testing === provider.id ? '测试中' : testFeedback[provider.id]?.message || '测试连接' }}</button></footer>
        </article>
      </div>
    </main>

    <Teleport to="body">
    <div v-if="downloadsOpen" class="drawer-overlay provider-config-overlay" @click.self="downloadsOpen = false">
      <aside class="config-drawer download-drawer provider-config-drawer" role="dialog" aria-modal="true" aria-label="资源下载任务">
        <div class="drawer-header"><div><p class="eyebrow">RESOURCE TASKS</p><h3>下载中心</h3><p>安装、校验和失败记录都会留在这里。音频页会常驻入口，方便查看 GPT-SoVITS 与语音识别的下载进度。</p></div><div class="drawer-header-actions"><button v-if="finishedDownloadCount" class="button button-quiet" type="button" @click="clearFinishedDownloads">清理已结束</button><button class="modal-close" type="button" @click="downloadsOpen = false" aria-label="关闭下载中心"><X :size="18" /></button></div></div>
        <div class="drawer-body download-list">
          <p v-if="downloadsLoading && !downloadTasks.length" class="empty-state">加载任务中…</p>
          <p v-else-if="!downloadTasks.length" class="empty-state">暂无资源任务</p>
          <article v-for="task in downloadTasks" :key="task.task_id" class="download-task" :class="`task-${task.status}`">
            <div class="download-task-head"><div><strong>{{ task.resource_name || task.provider_id }}</strong><span>{{ taskStatusLabel(task) }}<template v-if="phaseLabel(task.phase)"> · {{ phaseLabel(task.phase) }}</template></span></div><b>{{ isActiveDownload(task) ? progressLabel(taskProgressValue(task)) : (task.progress_percent == null ? '—' : `${Math.round(task.progress_percent)}%`) }}</b></div>
            <div :class="progressBarClass(taskProgressValue(task), isActiveDownload(task))"><i :style="progressFillStyle(taskProgressValue(task))"></i></div>
            <div class="download-task-meta"><span v-if="task.current_file">当前文件：{{ task.current_file }}</span><span v-if="task.total_bytes">{{ formatBytes(task.downloaded_bytes) }} / {{ formatBytes(task.total_bytes) }}</span><span v-if="isActiveDownload(task)">速度 {{ formatBytes(task.speed_bytes_per_second) }}/秒 · 剩余 {{ formatEta(task.eta_seconds) }}</span><span v-if="task.error_message" class="task-error">{{ task.error_message }}</span></div>
            <div v-if="isActiveDownload(task)" class="download-task-actions"><button class="button button-secondary" type="button" @click="cancelDownload(task)">取消</button></div><div v-else-if="task.status === 'failed'" class="download-task-actions"><button class="button button-secondary" type="button" @click="retryDownload(task)"><RefreshCw :size="14" />重试</button></div>
          </article>
        </div>
      </aside>
    </div>
    <div v-if="rvcWorkspaceOpen && rvcProvider" class="drawer-overlay provider-config-overlay" @click.self="closeRvcWorkspace">
      <aside class="config-drawer rvc-workspace-drawer provider-config-drawer" role="dialog" aria-modal="true" aria-label="RVC 音频生产资源管理">
        <div class="drawer-header"><div><p class="eyebrow">LOCAL AUDIO PRODUCTION / RVC</p><h3>RVC 音频生产</h3><p>只管理 RVC 音频到音频推理所需的运行时和模型，不参与角色对话或 TTS。</p></div><button class="modal-close" type="button" @click="closeRvcWorkspace" aria-label="关闭 RVC 管理"><X :size="18" /></button></div>
        <div class="drawer-body rvc-workspace-body">
          <div class="rvc-workspace-summary"><div><span class="section-label">推理可用性</span><strong>{{ rvcProvider.resource_status?.ready ? '可以开始生成变声音频' : '还需要补完资源' }}</strong></div><span :class="['status-chip', { on: rvcProvider.resource_status?.ready }]">{{ rvcProvider.resource_status?.ready ? 'READY' : 'INCOMPLETE' }}</span></div>
          <div class="rvc-component-list" aria-label="RVC 资源状态">
            <div v-for="item in [{ key: 'source', title: 'CHARACTOID 内置 RVC 核心', detail: '项目内置推理核心' }, { key: 'runtime', title: '独立 Python 运行时', detail: 'CHARACTOID/runtime/rvc' }, { key: 'hubert', title: 'Hubert 特征模型', detail: '用于音频特征提取' }, { key: 'rmvpe', title: 'RMVPE 音高模型', detail: '用于 F0 提取' }]" :key="item.key" class="rvc-component-row">
              <div class="rvc-component-icon"><Check v-if="rvcComponentReady(item.key)" :size="16" /><span v-else>·</span></div><div class="rvc-component-copy"><strong>{{ item.title }}</strong><span>{{ item.detail }}</span></div><b :class="{ ready: rvcComponentReady(item.key) }">{{ rvcComponentLabel(item.key) }}</b>
            </div>
          </div>
          <div class="rvc-install-block"><div><strong>{{ rvcProvider.resource_status?.installing ? '正在准备 RVC 运行时' : '补完推理环境' }}</strong><p>{{ rvcProvider.resource_status?.detail || rvcProvider.resource_status?.note }}</p></div><div v-if="rvcProvider.resource_status?.installing || installBusy(rvcProvider)" class="rvc-progress" :class="{ active: true, determinate: rvcProgressPercent() != null, indeterminate: rvcProgressPercent() == null }"><span>{{ progressLabel(rvcProgressPercent()) }}</span><i><em :style="progressFillStyle(rvcProgressPercent())"></em></i></div><div class="production-actions"><button v-if="rvcProvider.resource_status?.installing" class="button button-secondary" type="button" @click="callResource(rvcProvider, 'cancel')" :disabled="resourceAction !== null">取消准备</button><button v-else-if="!rvcProvider.resource_status?.ready" class="button button-primary" type="button" @click="callResource(rvcProvider, 'install')" :disabled="resourceAction !== null"><Download :size="15" />准备运行时与基础模型</button><button v-if="rvcProvider.resource_status?.ready" class="button button-secondary" type="button" @click="callResource(rvcProvider, 'remove')" :disabled="resourceAction !== null"><Trash2 :size="15" />移除 CHARACTOID 运行时</button><button class="button button-secondary" type="button" @click="callResource(rvcProvider, 'directory')" :disabled="resourceAction !== null"><FolderOpen :size="15" />查看资源目录</button></div></div>

          <p v-if="rvcProvider.resource_status?.error" class="config-error">{{ rvcProvider.resource_status.error }}</p><p v-if="error" class="config-error">{{ error }}</p>
          <div class="rvc-workspace-note"><strong>下一步</strong><span>将自己的 .pth 音色模型放入受管的 weights 目录；.index 文件不是必需项。完成后到独立的“RVC”页面上传音频并生成文件。</span></div>
        </div>
      </aside>
    </div>
      <div v-if="ffmpegOpen" class="drawer-overlay provider-config-overlay" @click.self="ffmpegOpen = false">
        <aside class="config-drawer provider-config-drawer" role="dialog" aria-modal="true" aria-label="FFmpeg 资源管理">
          <div class="drawer-header"><div><p class="eyebrow">RUNTIME</p><h3>FFmpeg</h3><p>检测只查找本机已有的托管副本、系统 PATH 和 imageio 缓存，不会开始下载。</p></div><button class="modal-close" type="button" @click="ffmpegOpen = false" aria-label="关闭 FFmpeg 管理"><X :size="18" /></button></div>
          <div class="drawer-body">
            <div class="drawer-status"><span :class="['status-chip', { on: ffmpegDetected() }]">{{ ffmpegLabel() }}</span><span>{{ ffmpegStatus.path || '尚未找到可执行文件' }}</span></div>
            <div class="resource-config-readonly"><span>检测结果</span><strong>{{ ffmpegDetectNote || '点击检测以刷新本机状态' }}</strong></div>
            <div class="production-facts"><span>托管：{{ ffmpegStatus.installed ? '已安装' : '无' }}</span><span>系统：{{ ffmpegStatus.system_path ? '已找到' : '无' }}</span><span>缓存：{{ ffmpegStatus.cache_available ? '已找到' : '无' }}</span></div>
            <div v-if="ffmpegBusy()" class="install-progress">
              <div class="install-progress-head"><strong>{{ ffmpegTaskLabel() }}</strong><b>{{ progressLabel(taskProgressValue(ffmpegInstallTask())) }}</b></div>
              <div :class="progressBarClass(taskProgressValue(ffmpegInstallTask()))"><i :style="progressFillStyle(taskProgressValue(ffmpegInstallTask()))"></i></div>
            </div>
            <div class="resource-control-actions">
              <button class="button button-secondary" type="button" @click="callFfmpeg('detect')" :disabled="ffmpegDetecting || resourceAction !== null"><RefreshCw :size="15" :class="{ spin: ffmpegDetecting }" />检测</button>
              <button v-if="!ffmpegStatus.installed" class="button button-primary" type="button" @click="callFfmpeg('install')" :disabled="resourceAction !== null"><Download :size="15" />{{ ffmpegStatus.cache_available || ffmpegStatus.system_path ? '安装托管副本' : '下载 FFmpeg' }}</button>
              <button v-else class="button button-secondary" type="button" @click="callFfmpeg('remove')" :disabled="resourceAction !== null"><Trash2 :size="15" />移除托管副本</button>
              <button class="button button-secondary" type="button" @click="callFfmpeg('directory')" :disabled="resourceAction !== null"><FolderOpen :size="15" />打开目录</button>
            </div>
            <p v-if="error" class="config-error">{{ error }}</p>
          </div>
        </aside>
      </div>
      <div v-if="configuring" class="drawer-overlay provider-config-overlay" @click.self="closeConfig">
      <aside class="config-drawer provider-config-drawer" role="dialog" aria-modal="true" :aria-label="`配置 ${selectedProvider?.name || '供应商'}`">
        <div class="drawer-header"><div><p class="eyebrow">CONFIGURE</p><h3>{{ selectedProvider?.name }}</h3><p>{{ selectedProvider?.description }}</p></div><button class="modal-close" type="button" @click="closeConfig" aria-label="关闭配置"><X :size="18" /></button></div>
        <div class="drawer-body"><div class="drawer-status"><span :class="['status-chip', { on: selectedProvider?.is_active }]">{{ selectedProvider?.is_active ? '当前启用' : selectedProvider?.runtime_supported ? '可用' : '仅保存配置' }}</span><span>{{ selectedProvider?.mode === 'local' ? '本地资源' : 'API 接口' }}</span></div>
          <form @submit.prevent="saveConfig" class="config-form">
            <template v-if="selectedProvider?.mode === 'api' && selectedProvider?.type === 'web_search'"><div class="resource-config-intro"><span class="meta-label">搜索服务</span><p class="config-hint">为 Agent 提供实时互联网检索能力，不是模型配置。</p></div><label v-if="selectedProvider.requires_api_key" class="field"><span>搜索服务 API Key <span class="required">*</span></span><input type="password" v-model="configForm.api_key" placeholder="输入搜索服务 API Key" required autocomplete="off" /></label><label v-if="selectedProvider.id === 'custom_search'" class="field"><span>搜索接口地址</span><input type="url" v-model="configForm.base_url" placeholder="https://your-search-endpoint" /></label><div v-else class="resource-config-readonly"><span>接口地址</span><strong>{{ selectedProvider.id === 'tavily' ? 'Tavily 官方服务' : '博查官方服务' }}</strong></div></template><template v-else-if="selectedProvider?.mode === 'api'"><label v-if="selectedProvider.requires_api_key" class="field"><span>API Key <span class="required">*</span></span><input type="password" v-model="configForm.api_key" placeholder="输入 API Key" required autocomplete="off" /></label><label class="field"><span>服务接口地址</span><input type="url" v-model="configForm.base_url" :placeholder="selectedProvider.default_base_url" /></label><label class="field"><span>模型名称</span><input type="text" v-model="configForm.model" :placeholder="selectedProvider.default_model" /></label></template>
            <template v-else><div class="resource-config-intro"><span class="meta-label">资源配置</span><p v-if="resourceConfigHint()" class="config-hint">{{ resourceConfigHint() }}</p></div><template v-if="resourceConfigKind === 'embedding' || resourceConfigKind === 'reranker'"><label class="field"><span>{{ resourceConfigKind === 'embedding' ? '向量模型 ID' : '精排模型 ID' }}</span><input type="text" v-model="configForm.model" :placeholder="selectedProvider?.default_model" /></label><div class="form-row"><label class="field"><span>模型来源</span><select v-model="configForm.source"><option value="modelscope">ModelScope</option><option value="huggingface">Hugging Face</option></select></label><label class="field"><span>运行设备</span><select v-model="configForm.device"><option value="auto">自动（GPU 优先）</option><option value="cuda">CUDA</option><option value="cpu">CPU</option></select></label></div></template><div v-else-if="resourceConfigKind === 'gpt_sovits'" class="resource-install-form"><div class="resource-config-readonly"><span>固定运行环境</span><strong>GPT-SoVITS v3lora Windows 整合包</strong><small>应用内置下载源 · Hugging Face · 约 8 GB · 服务按需启动</small></div></div><div v-else-if="resourceConfigKind === 'stt'" class="resource-config-readonly"><span>固定资源清单</span><strong>Qwen3-ASR-0.6B + FFmpeg</strong></div><div v-else-if="resourceConfigKind === 'separator'" class="resource-config-readonly"><span>固定资源</span><strong>HT-Demucs 人声分离模型 · 约 165 MB</strong></div><div class="resource-controls"><div><span class="meta-label">资源状态</span><strong>{{ selectedProvider ? resourceLabel(selectedProvider) : '未知' }}</strong></div><div v-if="selectedProvider && installBusy(selectedProvider)" class="install-progress"><div class="install-progress-head"><strong>{{ resourceLabel(selectedProvider) }}</strong><b>{{ progressLabel(installProgressValue(selectedProvider)) }}</b></div><div :class="progressBarClass(installProgressValue(selectedProvider))"><i :style="progressFillStyle(installProgressValue(selectedProvider))"></i></div><div class="download-task-meta"><span v-if="installTask(selectedProvider)?.current_file">当前文件：{{ installTask(selectedProvider)?.current_file }}</span><span v-if="installTask(selectedProvider)?.total_bytes">{{ formatBytes(installTask(selectedProvider)?.downloaded_bytes) }} / {{ formatBytes(installTask(selectedProvider)?.total_bytes) }}</span><span v-if="isProviderTaskActive(selectedProvider)">速度 {{ formatBytes(installTask(selectedProvider)?.speed_bytes_per_second) }}/秒 · 剩余 {{ formatEta(installTask(selectedProvider)?.eta_seconds) }}</span><span v-if="installTask(selectedProvider)?.error_message || selectedProvider.resource_status?.error" class="task-error">{{ installTask(selectedProvider)?.error_message || selectedProvider.resource_status?.error }}</span></div></div><div class="resource-control-actions"><button v-if="resourceInstalling(selectedProvider)" type="button" class="button button-secondary" @click="callResource(selectedProvider, 'cancel')" :disabled="resourceAction !== null">取消安装</button><button v-else-if="!resourceReady(selectedProvider)" type="button" class="button button-primary" @click="callResource(selectedProvider, 'install')" :disabled="resourceAction !== null || (selectedProvider?.id === 'gsv_tts_local' && !installUrl)"><Download :size="15" /> 安装运行环境</button><button v-if="resourceReady(selectedProvider)" type="button" class="button button-secondary" @click="callResource(selectedProvider, 'remove')" :disabled="resourceAction !== null"><Trash2 :size="15" /> 删除</button><button type="button" class="button button-secondary" @click="callResource(selectedProvider, 'directory')" :disabled="resourceAction !== null"><FolderOpen :size="15" /> 打开目录</button><button v-if="selectedProvider?.id === 'gsv_tts_local' && selectedProvider.resource_status?.service_running" type="button" class="button button-secondary" @click="callResource(selectedProvider, 'stop')" :disabled="resourceAction !== null">停止服务</button><button v-else-if="selectedProvider?.id === 'gsv_tts_local' && resourceReady(selectedProvider)" type="button" class="button button-primary" @click="callResource(selectedProvider, 'start')" :disabled="resourceAction !== null"><ExternalLink :size="15" /> 启动服务</button></div></div></template><p v-if="selectedProvider && !selectedProvider.runtime_supported" class="config-hint">当前运行时还没有这个 Provider 的适配器，因此这里只保存配置，不会自动调用。</p><div class="modal-actions"><button type="button" class="button button-secondary" @click="closeConfig">取消</button><button type="submit" class="button button-primary" :disabled="loading">{{ loading ? '保存中...' : '保存并启用' }}</button></div><p v-if="saveStatus" class="config-success"><Check :size="16" /> {{ saveStatus }}</p><p v-if="testStatus" :class="['config-message', testStatus.startsWith('连接成功') ? 'success' : 'error']">{{ testStatus }}</p><p v-if="error" class="config-error">{{ error }}</p>
          </form>
        </div>
      </aside>
      </div>
    </Teleport>
  </div>
</template><style scoped>
:global(*) { box-sizing: border-box; }
:global(.page-shell:has(.providers-settings)) { width:100%; max-width:none; margin:0; padding:0; }
.providers-settings { --ink:#142027; --muted:#71808a; --line:#d8e2e6; --paper:#f5f8f9; --cyan:#009fc6; --cyan-soft:#e9f8fb; --ok:#12745e; --danger:#b3261e; min-height:100%; width:100%; max-width:none; padding:36px clamp(24px,4vw,72px) 64px; color:var(--ink); background:var(--paper); background-image:linear-gradient(rgba(20,32,39,.028) 1px,transparent 1px),linear-gradient(90deg,rgba(20,32,39,.028) 1px,transparent 1px); background-size:32px 32px; display:block; }
.settings-header { display:flex; align-items:end; justify-content:space-between; gap:24px; padding-bottom:22px; border-bottom:1px solid var(--ink); }
.eyebrow { margin:0 0 8px; color:var(--cyan); font:11px/1.2 "Cascadia Mono",Consolas,monospace; letter-spacing:.12em; }
.settings-header h2 { margin:0; font-size:clamp(25px,3vw,36px); line-height:1; letter-spacing:-.04em; font-weight:760; }
.settings-help { margin:10px 0 0; color:var(--muted); font-size:13px; }
.refresh-button { display:inline-flex; align-items:center; gap:8px; min-height:36px; padding:8px 12px; border:1px solid var(--line); background:#fff; color:var(--ink); cursor:pointer; font:12px inherit; }
.refresh-button:hover:not(:disabled) { border-color:var(--cyan); color:var(--cyan); }
.provider-tabs { position:sticky; top:0; z-index:10; display:flex; align-items:stretch; gap:0; margin:0 calc(-1 * clamp(24px,4vw,72px)) 34px; padding:0 clamp(24px,4vw,72px); border-bottom:1px solid var(--line); background:rgba(245,248,249,.94); backdrop-filter:blur(10px); }
.tab-button { appearance:none; display:flex; align-items:center; justify-content:center; gap:9px; min-height:52px; padding:0 11px; border:0; border-bottom:2px solid transparent; background:transparent; color:var(--muted); cursor:pointer; text-align:center; white-space:nowrap; font:12px inherit; }
.tab-button:hover { color:var(--ink); background:rgba(255,255,255,.62); }
.tab-button.active { border-bottom-color:var(--cyan); background:#fff; color:var(--ink); box-shadow:0 3px 0 var(--cyan); }

.local-production-zone { margin:0 0 42px; padding:24px; border:1px solid var(--line); background:linear-gradient(135deg,#fff,#eefafd); }.audio-workbench { display:flex; flex-direction:column; gap:20px; padding:0; border:0; background:transparent; }.audio-section { padding:22px 24px 24px; border:1px solid var(--line); background:linear-gradient(135deg,#fff,#eefafd); }.audio-section-head { display:flex; align-items:baseline; gap:12px; margin-bottom:16px; }.audio-section-head h4 { margin:0; font-size:16px; letter-spacing:-.02em; }.production-grid { display:grid; grid-template-columns:minmax(0,1.6fr) minmax(280px,1fr); gap:18px; }.audio-grid { grid-template-columns:repeat(auto-fit,minmax(280px,1fr)); gap:14px; }.audio-grid-2 { grid-template-columns:repeat(2,minmax(0,1fr)); }.audio-grid-1 { grid-template-columns:minmax(0,1fr); max-width:560px; }.audio-section-head span { color:var(--muted); font-size:12px; }.audio-workbench .production-card { padding:18px; }.audio-workbench .production-card p { max-width:none; min-height:42px; margin:8px 0 0; }.audio-workbench .production-facts { grid-template-columns:repeat(2,minmax(0,1fr)); margin:12px 0; }.audio-workbench .production-card-head h3 { font-size:17px; }.production-card-gsv { border-color:#74cad8; box-shadow:0 12px 30px rgba(0,159,198,.08); }.production-card-stt { border-color:#b153bd; }.install-progress { margin:14px 0 8px; padding:12px; border:1px solid var(--line); background:var(--paper); }.install-progress-head { display:flex; justify-content:space-between; gap:12px; font-size:12px; }.install-progress .task-progress { margin:8px 0; }.provider-card .install-progress { margin:0 0 12px; }.production-card { padding:22px; border:1px solid var(--line); background:#fff; }.production-card-rvc { border-color:#74cad8; box-shadow:0 12px 30px rgba(0,159,198,.08); }.production-card-head { display:flex; align-items:flex-start; justify-content:space-between; gap:18px; }.production-card h3 { margin:4px 0 0; font-size:20px; }.production-kicker { color:var(--cyan); font:11px "Cascadia Mono",Consolas,monospace; letter-spacing:.12em; }.production-card p { max-width:66ch; color:var(--muted); font-size:13px; line-height:1.7; }.production-facts { display:grid; grid-template-columns:repeat(4,minmax(0,1fr)); gap:8px; margin:18px 0; color:var(--muted); font:11px "Cascadia Mono",Consolas,monospace; }.production-facts span { padding:10px; background:var(--paper); border:1px solid var(--line); }.production-actions { display:flex; flex-wrap:wrap; gap:8px; }
.providers-main { min-width:0; width:100%; }
.section-heading { display:flex; align-items:end; justify-content:space-between; gap:16px; margin-bottom:14px; }
.section-label { color:var(--cyan); font:11px "Cascadia Mono",Consolas,monospace; }
.section-heading h3 { margin:4px 0 0; font-size:19px; letter-spacing:-.02em; }
.section-note { color:var(--muted); font-size:12px; }
.providers-grid { display:grid; grid-template-columns:repeat(auto-fit,minmax(320px,1fr)); gap:18px; }.providers-grid.compact { grid-template-columns:repeat(auto-fit,minmax(270px,1fr)); gap:12px; }.providers-grid.compact .provider-card { padding:15px 16px; }.providers-grid.compact .provider-description { min-height:30px; margin:9px 0; }.providers-grid.compact .provider-meta { min-height:54px; margin-bottom:11px; }.providers-grid.compact .runtime-status { margin-bottom:10px; }
.provider-card { min-width:0; min-height:0; padding:22px; border:1px solid var(--line); background:#fff; cursor:pointer; transition:border-color .18s ease, box-shadow .18s ease, transform .18s ease; }
.provider-card:hover, .provider-card:focus-visible { border-color:var(--cyan); outline:none; box-shadow:4px 4px 0 rgba(0,159,198,.17); transform:translateY(-2px); }
.provider-card.active { border-color:var(--ink); box-shadow:4px 4px 0 var(--cyan); }
.provider-card.local { background:linear-gradient(135deg,#fff,#f6fcfd); }
.provider-header { display:flex; align-items:start; justify-content:space-between; gap:12px; }
.provider-title { display:flex; align-items:center; gap:8px; min-width:0; }
.provider-mark { width:9px; height:9px; flex:0 0 9px; border:2px solid var(--cyan); transform:rotate(45deg); }
.provider-mark.local { border-color:#b153bd; }
.provider-title h3 { margin:0; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; font-size:16px; }
.mode-badge, .active-label, .status-chip { white-space:nowrap; font:10px "Cascadia Mono",Consolas,monospace; }
.mode-badge { padding:3px 6px; border:1px solid #b153bd; color:#93419c; }
.mode-badge.api { border-color:var(--line); color:var(--muted); }
.active-label { color:var(--muted); }.active-label.on { color:var(--ok); }
.provider-description { min-height:38px; margin:13px 0 12px; color:var(--muted); font-size:12px; line-height:1.55; }
.runtime-status { display:flex; align-items:center; gap:7px; margin-bottom:14px; color:#9a716b; font:11px "Cascadia Mono",Consolas,monospace; }.runtime-status.supported { color:var(--ok); }
.runtime-dot { width:7px; height:7px; border-radius:50%; background:currentColor; }.provider-meta { display:grid; gap:5px; min-height:68px; margin-bottom:16px; padding:11px 12px; border:1px solid var(--line); background:#fbfdfd; }.meta-label { color:var(--muted); font-size:11px; }.provider-meta code, .meta-url { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; color:var(--ink); font:11px "Cascadia Mono",Consolas,monospace; }.meta-url { color:var(--muted); }.resource-meta strong { font-size:12px; }.provider-actions, .resource-control-actions, .modal-actions { display:flex; flex-wrap:wrap; gap:8px; }.provider-actions .button { flex:1 1 100px; }
.button { min-height:36px; padding:8px 12px; border:1px solid var(--ink); background:#fff; color:var(--ink); cursor:pointer; display:inline-flex; align-items:center; justify-content:center; gap:7px; font:12px inherit; transition:background .18s ease,color .18s ease,border-color .18s ease; }.button:hover:not(:disabled) { border-color:var(--cyan); }.button:disabled { opacity:.45; cursor:not-allowed; }.button-primary { background:var(--ink); color:#fff; }.button-primary:hover:not(:disabled) { background:var(--cyan); border-color:var(--cyan); }.button-secondary { border-color:var(--line); }.button-test { min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; background:var(--cyan-soft); color:#087a9a; border-color:var(--cyan); }.button-active { color:var(--ok); border-color:#9bcfbe; background:#effaf6; }
.button:focus-visible, .tab-button:focus-visible, .refresh-button:focus-visible, .modal-close:focus-visible, input:focus-visible, select:focus-visible, .provider-card:focus-visible { outline:2px solid var(--cyan); outline-offset:2px; }
.loading-state,.error-state,.empty-state { min-height:260px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; color:var(--muted); }.empty-state { border:1px dashed var(--line); }
.spin { animation:spin 1s linear infinite; } @keyframes spin { to { transform:rotate(360deg); } }
.drawer-overlay { position:fixed; inset:0; z-index:1000; display:flex; justify-content:flex-end; background:rgba(17,28,34,.34); animation:fade-in .16s ease; }.config-drawer { width:min(560px,100%); height:100%; overflow:auto; background:#fff; border-left:1px solid var(--ink); box-shadow:-16px 0 40px rgba(16,40,48,.16); animation:slide-in .2s ease; }.drawer-header { display:flex; justify-content:space-between; gap:20px; padding:28px 30px 22px; border-bottom:1px solid var(--ink); }.drawer-header h3 { margin:0; font-size:22px; letter-spacing:-.03em; }.drawer-header p:last-child { max-width:40ch; margin:9px 0 0; color:var(--muted); font-size:12px; line-height:1.5; }.modal-close { display:grid; place-items:center; width:28px; height:28px; flex:0 0 34px; border:1px solid var(--line); background:#fff; color:var(--ink); cursor:pointer; }.drawer-body { padding:18px 30px 36px; }.drawer-status { display:flex; align-items:center; gap:10px; margin-bottom:20px; color:var(--muted); font:11px "Cascadia Mono",Consolas,monospace; }.status-chip { padding:4px 7px; border:1px solid var(--line); }.status-chip.on { color:var(--ok); border-color:#9bcfbe; background:#effaf6; }
.config-form { padding:0; }.field { display:flex; flex-direction:column; gap:7px; margin-bottom:18px; }.field > span { color:var(--muted); font-size:12px; }.required { color:var(--danger); }.field input[type=text],.field input[type=password],.field select { width:100%; padding:11px 12px; border:1px solid var(--line); background:#fbfcfc; color:var(--ink); font:13px inherit; }.field input:focus,.field select:focus { border-color:var(--cyan); outline:none; }.form-row { display:grid; grid-template-columns:1fr 1fr; gap:14px; }.checkbox-field { flex-direction:row; align-items:center; gap:9px; padding:14px 0; border-top:1px solid var(--line); }.checkbox-field input { width:16px; height:16px; accent-color:var(--cyan); }.resource-controls { margin:5px 0 22px; padding:13px; border:1px solid var(--line); background:#fbfcfc; }.resource-controls > div:first-child { display:flex; justify-content:space-between; align-items:center; gap:12px; }.resource-control-actions { margin-top:12px; }.config-success,.config-error,.config-message { display:flex; align-items:center; gap:7px; margin:15px 0 0; padding:11px 12px; font-size:12px; }.config-success,.config-message.success { color:var(--ok); background:#effaf6; border:1px solid #b9e5d6; }.config-error,.config-message.error { color:var(--danger); background:#fff5f4; border:1px solid #ecc2bf; }.config-hint { margin:7px 0 18px; color:var(--muted); font-size:11px; line-height:1.5; }
.rvc-workspace-drawer { width:min(680px,100%); }.rvc-workspace-body { background:linear-gradient(180deg,#fff 0%,#f8fcfd 100%); }.rvc-workspace-summary { display:flex; justify-content:space-between; align-items:center; gap:16px; padding:18px; margin-bottom:18px; border:1px solid #b9e5ed; background:#f2fbfd; }.rvc-workspace-summary div { display:flex; flex-direction:column; gap:6px; }.rvc-workspace-summary strong { font-size:17px; }.rvc-component-list { border-top:1px solid var(--line); }.rvc-component-row { display:grid; grid-template-columns:28px 1fr auto; align-items:center; gap:12px; min-height:68px; padding:10px 0; border-bottom:1px solid var(--line); }.rvc-component-icon { display:grid; place-items:center; width:26px; height:26px; border:1px solid var(--line); color:var(--muted); }.rvc-component-copy { display:flex; flex-direction:column; gap:4px; min-width:0; }.rvc-component-copy strong { font-size:13px; }.rvc-component-copy span { color:var(--muted); font-size:11px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }.rvc-component-row b { color:var(--muted); font:11px monospace; }.rvc-component-row b.ready { color:var(--ok); }.rvc-install-block { margin-top:22px; padding:16px; border:1px solid var(--line); background:#fff; }
.rvc-install-block > div:first-child { display:flex; flex-direction:column; gap:6px; }.rvc-install-block p { margin:0; color:var(--muted); font-size:12px; line-height:1.5; }.rvc-progress { display:flex!important; flex-direction:row!important; align-items:center; gap:10px; margin-top:16px; font:12px monospace; }.rvc-progress i { display:block; height:6px; flex:1; background:#dff1f4; overflow:hidden; }.rvc-progress em { display:block; height:100%; }.rvc-install-block .production-actions { margin-top:16px; }.rvc-workspace-note { display:flex; gap:10px; margin-top:18px; padding:12px; border-left:2px solid #b976d9; background:#fbf6fd; color:var(--muted); font-size:11px; line-height:1.55; }.rvc-workspace-note strong { color:#8b4da8; white-space:nowrap; }
@keyframes fade-in { from { opacity:0; } to { opacity:1; } } @keyframes slide-in { from { transform:translateX(24px); } to { transform:translateX(0); } }
@media (max-width:900px) { .production-grid, .audio-grid, .audio-grid-2 { grid-template-columns:1fr; }.production-facts { grid-template-columns:repeat(2,minmax(0,1fr)); } }
@media (max-width:760px) { .providers-settings { padding:22px 16px 34px; background-size:24px 24px; }.settings-header { align-items:start; margin-bottom:22px; }.provider-tabs { position:sticky; top:0; margin:0 -16px 25px; padding:0 10px; flex-wrap:wrap; }.tab-button { flex:1 1 33%; min-height:46px; padding:0 7px; font-size:11px; }.providers-grid,.providers-grid.compact { grid-template-columns:1fr; }.section-note { display:none; }.drawer-overlay { justify-content:stretch; }.config-drawer { width:100%; border-left:0; }.drawer-header,.drawer-body { padding-left:20px; padding-right:20px; }.form-row { grid-template-columns:1fr; gap:0; } }
@media (prefers-reduced-motion:reduce) { *,*::before,*::after { animation-duration:.01ms!important; transition-duration:.01ms!important; scroll-behavior:auto!important; } }

.download-center { margin:0 auto 28px; max-width:1180px; }.download-summary { width:100%; display:flex; align-items:center; gap:14px; padding:9px 12px; border:1px solid var(--cyan); background:linear-gradient(100deg,#f0fbfd,#fff 65%); color:var(--ink); text-align:left; cursor:pointer; }.download-summary:hover { box-shadow:0 8px 24px rgba(0,150,190,.10); }.download-summary-icon { display:grid; place-items:center; width:34px; height:34px; color:#0785a3; border:1px solid #8ed8e5; }.download-summary-copy { display:flex; flex-direction:column; gap:3px; min-width:0; flex:1; }.download-summary-copy strong { font-size:13px; }.download-summary-copy span { color:var(--muted); font-size:11px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }.download-summary-progress { width:130px; display:flex; align-items:center; gap:8px; font:11px monospace; }.download-summary-progress i,.task-progress,.rvc-progress i { display:block; overflow:hidden; height:5px; flex:1; background:#dff1f4; position:relative; }.download-summary-progress em,.task-progress i,.rvc-progress em { display:block; height:100%; width:0; background:linear-gradient(90deg,#00a4c4,#7fe3f0,#00a4c4); background-size:200% 100%; transition:width .35s ease; }
.task-progress.active i,.download-summary-progress.active em,.rvc-progress.active em { animation:progress-sheen 1.15s linear infinite; }
.task-progress.indeterminate i,.download-summary-progress.indeterminate em,.rvc-progress.indeterminate em { width:34%; animation:progress-indeterminate 1.4s ease-in-out infinite, progress-sheen 1.15s linear infinite; }
@keyframes progress-sheen { from { background-position:0 0; } to { background-position:-200% 0; } }
@keyframes progress-indeterminate { 0% { transform:translateX(-40%); } 100% { transform:translateX(280%); } }.download-summary-arrow { color:#087a9a; font-size:11px; white-space:nowrap; }.download-drawer { width:min(620px,100%); }.download-list { display:flex; flex-direction:column; gap:12px; }.download-task { padding:15px; border:1px solid var(--line); background:#fbfcfc; }.download-task-head { display:flex; justify-content:space-between; gap:12px; }.download-task-head div { display:flex; flex-direction:column; gap:5px; }.download-task-head span,.download-task-meta { color:var(--muted); font-size:11px; }.download-task-head b { color:#0785a3; font:14px monospace; }.task-progress { margin:12px 0 10px; height:6px; }.download-task-meta { display:flex; flex-wrap:wrap; gap:5px 14px; line-height:1.5; }.task-error { color:var(--danger); flex-basis:100%; }.download-task-actions { display:flex; justify-content:flex-end; margin-top:12px; }.task-ready .download-task-head b { color:var(--ok); }.task-failed { border-color:#ecc2bf; background:#fffafa; }

/* Provider workspace: keep the page in the application canvas instead of opening a second opaque canvas. */
.providers-settings {
  background: transparent;
  background-image: none;
  padding: 28px clamp(24px, 4vw, 72px) 64px;
}
.provider-tabs {
  background: rgba(255,255,255,.34);
  border-bottom-color: rgba(20,32,39,.12);
  backdrop-filter: blur(18px) saturate(115%);
}
.tab-button:hover { background: rgba(255,255,255,.38); }
.tab-button.active { background: rgba(255,255,255,.52); box-shadow: 0 2px 0 var(--cyan); }
.provider-card,
.production-card,
.local-production-zone,
.resource-meta,
.provider-meta {
  border-color: rgba(20,32,39,.13);
  background: rgba(255,255,255,.38);
  box-shadow: 0 14px 34px rgba(20,42,48,.045);
  backdrop-filter: blur(16px) saturate(112%);
}
.provider-card:hover, .provider-card:focus-visible {
  background: rgba(255,255,255,.58);
  box-shadow: 0 18px 38px rgba(0,159,198,.11);
}
.provider-card.active { background: rgba(255,255,255,.55); box-shadow: 0 14px 34px rgba(0,159,198,.1); }
.provider-meta { background: rgba(255,255,255,.22); }
.drawer-overlay.provider-config-overlay {
  display: grid;
  place-items: center;
  justify-content: center;
  align-items: center;
  padding: 24px;
  background: rgba(13, 25, 31, .42);
  backdrop-filter: blur(10px) saturate(82%);
  -webkit-backdrop-filter: blur(10px) saturate(82%);
  pointer-events: auto;
  animation: fade-in .16s ease;
}
.config-drawer.provider-config-drawer {
  width: min(560px, calc(100vw - 48px));
  max-height: min(760px, calc(100vh - 48px));
  height: auto;
  margin: 0;
  border: 1px solid rgba(255,255,255,.82);
  border-radius: 20px;
  background: rgba(226, 239, 242, .94);
  box-shadow: 0 26px 90px rgba(10, 34, 43, .28), inset 0 1px rgba(255,255,255,.9);
  backdrop-filter: blur(48px) saturate(140%);
  -webkit-backdrop-filter: blur(48px) saturate(140%);
  animation: config-modal-settle .22s ease-out;
  pointer-events: auto;
}
.download-drawer.provider-config-drawer { width: min(620px, calc(100vw - 48px)); }
.rvc-workspace-drawer.provider-config-drawer { width: min(680px, calc(100vw - 48px)); }
.drawer-header { border-bottom-color: rgba(20,32,39,.13); background: transparent; }
.drawer-body, .rvc-workspace-body { background: transparent; }
.modal-close { background: rgba(255,255,255,.35); border-color: rgba(20,32,39,.14); }
.field input[type=text], .field input[type=password], .field select { background: rgba(255,255,255,.45); border-color: rgba(20,32,39,.16); }
.resource-controls, .resource-config-readonly, .rvc-install-block { background: rgba(255,255,255,.28); border-color: rgba(20,32,39,.13); }
.provider-test-feedback { display:flex; align-items:center; gap:6px; min-height:18px; margin:8px 1px 0; font-size:11px; line-height:1.35; }
.provider-test-feedback.is-success { color: var(--ok); }
.provider-test-feedback.is-error { color: var(--danger); }
@keyframes drawer-settle { from { opacity:0; transform:translateX(10px); } to { opacity:1; transform:translateX(0); } }
@media (prefers-reduced-motion: reduce) { .config-drawer { animation:none; } }

.provider-config-overlay {
  align-items: center;
  justify-content: center;
  padding: 24px;
}
.provider-config-drawer {
  width: min(560px, calc(100vw - 48px));
  max-height: min(760px, calc(100vh - 48px));
  height: auto;
  margin: 0;
  border-radius: 20px;
  animation: config-modal-settle .22s ease-out;
}
@keyframes config-modal-settle {
  from { opacity: 0; transform: translateY(10px) scale(.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}
@media (prefers-reduced-motion: reduce) {
  .provider-config-drawer { animation: none; }
}
@media (max-width:760px) {
  .provider-config-overlay { align-items: flex-end; padding: 12px; }
  .provider-config-drawer { width: 100%; max-height: calc(100vh - 24px); margin: 0; border-radius: 18px; }
}

</style>

<style>
.providers-settings .resource-config-intro { margin: 2px 0 14px; padding: 12px 14px; border: 1px solid var(--line); background: var(--paper); }
.providers-settings .resource-config-intro .config-hint { margin: 5px 0 0; }
.providers-settings .resource-config-readonly { display: grid; gap: 5px; margin: 4px 0 16px; padding: 13px 14px; border: 1px solid var(--line); background: #fbfdfd; }
.providers-settings .resource-config-readonly span { color: var(--muted); font-size: 11px; }
.providers-settings .resource-config-readonly strong { font-size: 13px; font-weight: 650; }

html.provider-modal-open,
body.provider-modal-open {
  overflow: hidden !important;
  overscroll-behavior: none;
}
.providers-grid.compact .provider-card { min-height: 248px; }
.providers-grid.compact .provider-description {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
.providers-grid.compact .provider-actions .button { white-space: nowrap; }
.provider-tabs,
.tab-button,
.provider-actions .button { white-space: nowrap; }
.provider-tabs { overflow-x: auto; }
.provider-actions { flex-wrap: nowrap; }
.provider-actions .button { min-width: 0; flex: 1 1 0; }
.provider-switch {
  display: inline-flex;
  align-items: center;
  min-width: 34px;
  width: 34px;
  height: 20px;
  padding: 2px;
  border: 0;
  border-radius: 999px;
  background: rgba(125,145,151,.45);
  box-shadow: inset 0 0 0 1px rgba(20,32,39,.12);
  cursor: pointer;
}
.provider-switch span {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  transform: translateX(0);
  background: #f7fbfc;
  box-shadow: 0 1px 3px rgba(20,32,39,.25);
  transition: transform .16s ease, background .16s ease;
}
.provider-switch.on { background: var(--ok); }
.provider-switch.on span { transform: translateX(14px); background: #fff; }
.provider-switch:disabled { opacity: .5; cursor: wait; }
.provider-actions .button-test.is-success { color: var(--ok); border-color: rgba(18,116,94,.35); background: rgba(231,250,244,.72); }
.provider-actions .button-test.is-error { color: var(--danger); border-color: rgba(179,38,30,.3); background: rgba(255,241,240,.78); }
.provider-config-drawer .modal-actions .button-primary {
  background: #142027 !important;
  border-color: #142027 !important;
  color: #fff !important;
}
.provider-config-drawer .modal-actions .button-primary:hover:not(:disabled) {
  background: var(--cyan) !important;
  border-color: var(--cyan) !important;
}
@media (max-width:760px) {
  .drawer-overlay.provider-config-overlay { align-items: end; padding: 12px; }
  .config-drawer.provider-config-drawer { width: 100%; max-height: calc(100vh - 24px); border-radius: 18px; }
}
</style>
