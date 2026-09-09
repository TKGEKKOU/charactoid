<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, reactive, ref } from "vue";
import { Download, Edit3, Eye, Play, Plus, RefreshCw, RotateCw, Save, Search, Trash2, Upload, X } from "lucide-vue-next";
import { apiRequest, errorMessage } from "../shared/api";
import {
  CAPABILITY_TABS,
  assignmentColumns,
  assignmentHint,
  assignmentSummary,
  attentionItems,
  deriveExtensionSummary,
  filterAssignmentItems,
  filterTools,
  groupAssignmentItems,
  groupSkills,
  groupTools,
  isItemAssigned,
  parseKeyValueLines,
  serializeKeyValueLines,
  tabFromHash,
  type AssignmentItem,
  type AssignmentKind,
  type AssignmentSnapshot,
  type CapabilityTab,
} from "./model";

const state = reactive({ skills: [] as any[], servers: [] as any[], tools: [] as any[] });
const assignments = ref<AssignmentSnapshot | null>(null);
const assignQuery = ref("");
const assignKind = ref<AssignmentKind>("all");
const assignBusy = ref(false);
const assignKindOptions: Array<{ id: AssignmentKind; label: string }> = [
  { id: "all", label: "全部" },
  { id: "skill", label: "技能(Skill)" },
  { id: "mcp", label: "MCP" },
  { id: "tool", label: "工具(Tool)" },
];
const activeTab = ref<CapabilityTab>(tabFromHash(location.hash));
const busy = ref(false);
const message = ref("");
const messageError = ref(false);
const toolFilter = ref("");
const toolSource = ref<"all" | "builtin" | "mcp">("all");
const drawer = ref<HTMLDialogElement | null>(null);
const confirmDialog = ref<HTMLDialogElement | null>(null);
const catalogDialog = ref<HTMLDialogElement | null>(null);
const drawerKind = ref<"skill" | "mcp">("skill");
const uploadInput = ref<HTMLInputElement | null>(null);
const catalog = ref<any[]>([]);
const catalogStale = ref(false);
const catalogQuery = ref("");
const catalogKind = ref("all");
const selectedCatalog = ref<any>(null);
const editingSkill = ref<string | null>(null);
const editingMcp = ref<string | null>(null);
const skillReadonly = ref(false);
const mcpTests = reactive<Record<string, any>>({});
const confirmState = reactive({ title: "", detail: "", busy: false });
let confirmAction: (() => Promise<void>) | null = null;
const skillForm = reactive({ name: "", description: "", instructions: "", prompt_hint: "", tool_names: [] as string[] });
const mcpForm = reactive({ name: "", description: "", transport: "stdio", command: "", args: "", env: "", url: "", headers: "", enabled: true });
const summary = computed(() => deriveExtensionSummary(state));
const issues = computed(() => attentionItems(state, assignments.value));
const assignCols = computed(() => assignmentColumns(assignments.value));
const visibleAssignGroups = computed(() => groupAssignmentItems(filterAssignmentItems(assignments.value?.items || [], assignQuery.value, assignKind.value)));
const assignVisibleCount = computed(() => visibleAssignGroups.value.reduce((sum, [, items]) => sum + items.length, 0));
const skillGroups = computed(() => groupSkills(state.skills));
const skillFormToolGroups = computed(() => groupTools(state.tools));
const visibleToolGroups = computed(() => groupTools(filterTools(state.tools, toolFilter.value, toolSource.value), state.skills));
const visibleCatalog = computed(() => {
  const q = catalogQuery.value.trim().toLowerCase();
  return catalog.value.filter((item) => !q || [item.id, item.name, item.description, ...(item.categories || [])].join(" ").toLowerCase().includes(q));
});
let pollTimer = 0;

function notify(text: string, isError = false) {
  message.value = text;
  messageError.value = isError;
}
function jsonHeaders() {
  return { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" };
}
function lines(text: string) {
  return text.split(/\r?\n/).map((item) => item.trim()).filter(Boolean);
}
function goTab(tab: CapabilityTab) {
  activeTab.value = tab;
  const hash = "#capabilities-" + tab;
  if (location.hash !== hash) history.replaceState(null, "", hash);
  if (tab === "catalog") void loadCatalog(false);
}
function applyHash() {
  const tab = tabFromHash(location.hash);
  activeTab.value = tab;
  if (tab === "catalog") void loadCatalog(false);
}
async function refreshAll(silent = false) {
  if (!silent) busy.value = true;
  try {
    const [skills, servers, tools, snapshot] = await Promise.all([
      apiRequest<any[]>("/api/skills"),
      apiRequest<any[]>("/api/mcp/servers"),
      apiRequest<any[]>("/api/skills/tools"),
      apiRequest<AssignmentSnapshot>("/api/capabilities/assignments"),
    ]);
    state.skills = skills;
    state.servers = servers;
    state.tools = tools;
    assignments.value = snapshot;
    if (!silent) notify("能力状态已刷新");
  } catch (reason) {
    notify(errorMessage(reason), true);
  } finally {
    busy.value = false;
  }
}
function startPolling() {
  stopPolling();
  pollTimer = window.setInterval(() => refreshAll(true), 30000);
}
function stopPolling() {
  if (pollTimer) window.clearInterval(pollTimer);
  pollTimer = 0;
}
async function showPage() {
  applyHash();
  await refreshAll(true);
  startPolling();
}
function resetSkill() {
  editingSkill.value = null;
  skillReadonly.value = false;
  Object.assign(skillForm, { name: "", description: "", instructions: "", prompt_hint: "", tool_names: [] as string[] });
}
function openSkill(skill?: any, readonly = false) {
  resetSkill();
  drawerKind.value = "skill";
  if (skill) {
    editingSkill.value = skill.name;
    skillReadonly.value = Boolean(readonly || skill.builtin);
    Object.assign(skillForm, {
      name: skill.name,
      description: skill.description || "",
      instructions: skill.instructions || "",
      prompt_hint: skill.prompt_hint || "",
      tool_names: [...(skill.tool_names || [])],
    });
  }
  nextTick(() => drawer.value?.showModal());
}
function resetMcp() {
  editingMcp.value = null;
  Object.assign(mcpForm, { name: "", description: "", transport: "stdio", command: "", args: "", env: "", url: "", headers: "", enabled: true });
}
function openMcp(server?: any) {
  resetMcp();
  drawerKind.value = "mcp";
  if (server) {
    editingMcp.value = server.name;
    Object.assign(mcpForm, {
      name: server.name,
      description: server.description || "",
      transport: server.transport || "stdio",
      command: server.command || "",
      args: (server.args || []).join("\n"),
      env: serializeKeyValueLines(server.env),
      url: server.url || "",
      headers: serializeKeyValueLines(server.headers),
      enabled: Boolean(server.enabled),
    });
  }
  nextTick(() => drawer.value?.showModal());
}
async function saveSkill() {
  if (skillReadonly.value) return;
  if (!skillForm.name.trim() || !skillForm.instructions.trim()) return notify("名称与提示词不能为空", true);
  busy.value = true;
  try {
    const body = {
      description: skillForm.description.trim(),
      instructions: skillForm.instructions.trim(),
      prompt_hint: skillForm.prompt_hint.trim(),
      tool_names: skillForm.tool_names,
    };
    if (editingSkill.value) {
      await apiRequest("/api/skills/" + encodeURIComponent(editingSkill.value), { method: "PATCH", headers: jsonHeaders(), body: JSON.stringify(body) });
    } else {
      await apiRequest("/api/skills", { method: "POST", headers: jsonHeaders(), body: JSON.stringify({ name: skillForm.name.trim(), ...body }) });
    }
    drawer.value?.close();
    await refreshAll(true);
    notify(editingSkill.value ? "技能已保存" : "技能已创建");
  } catch (reason) {
    notify(errorMessage(reason), true);
  } finally {
    busy.value = false;
  }
}
async function patchSkill(skill: any, body: Record<string, unknown>) {
  try {
    await apiRequest("/api/skills/" + encodeURIComponent(skill.name), { method: "PATCH", headers: jsonHeaders(), body: JSON.stringify(body) });
    await refreshAll(true);
  } catch (reason) {
    notify(errorMessage(reason), true);
  }
}
function askConfirm(title: string, detail: string, action: () => Promise<void>) {
  confirmState.title = title;
  confirmState.detail = detail;
  confirmState.busy = false;
  confirmAction = action;
  nextTick(() => confirmDialog.value?.showModal());
}
async function runConfirm() {
  if (!confirmAction) return;
  confirmState.busy = true;
  try {
    await confirmAction();
    confirmDialog.value?.close();
  } catch (reason) {
    notify(errorMessage(reason), true);
  } finally {
    confirmState.busy = false;
    confirmAction = null;
  }
}
function removeSkill(skill: any) {
  askConfirm("删除技能", "删除 " + skill.name + " 后不可恢复。", async () => {
    await apiRequest("/api/skills/" + encodeURIComponent(skill.name), { method: "DELETE" });
    await refreshAll(true);
    notify("技能已删除");
  });
}
async function uploadSkill(file?: File) {
  if (!file) return;
  const body = new FormData();
  body.append("file", file);
  try {
    const result: any = await apiRequest("/api/skills/upload", { method: "POST", body });
    await refreshAll(true);
    const parts: string[] = [];
    if (result.installed?.length) parts.push("已安装：" + result.installed.join("、"));
    if (result.skipped?.length) parts.push("跳过：" + result.skipped.map((item: any) => item.name + "（" + item.reason + "）").join("、"));
    notify(parts.join("。") || "上传完成，没有新技能被安装", Boolean(result.skipped?.length && !result.installed?.length));
  } catch (reason) {
    notify(errorMessage(reason), true);
  } finally {
    if (uploadInput.value) uploadInput.value.value = "";
  }
}
function onUploadChange(event: Event) {
  const input = event.target as HTMLInputElement;
  void uploadSkill(input.files?.[0] || undefined);
}
async function saveMcp() {
  if (!mcpForm.name.trim()) return notify("服务名称不能为空", true);
  try {
    await apiRequest("/api/mcp/servers", {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify({
        name: mcpForm.name.trim(),
        description: mcpForm.description.trim(),
        transport: mcpForm.transport,
        command: mcpForm.command.trim(),
        args: lines(mcpForm.args),
        env: parseKeyValueLines(mcpForm.env),
        url: mcpForm.url.trim(),
        headers: parseKeyValueLines(mcpForm.headers),
        enabled: mcpForm.enabled,
      }),
    });
    drawer.value?.close();
    await refreshAll(true);
    notify(editingMcp.value ? "MCP 服务已更新并重连" : "MCP 服务已保存并连接");
  } catch (reason) {
    notify(errorMessage(reason), true);
  }
}
async function toggleMcp(server: any) {
  try {
    await apiRequest("/api/mcp/servers/" + encodeURIComponent(server.name) + "/" + (server.enabled ? "disable" : "enable"), { method: "POST" });
    await refreshAll(true);
  } catch (reason) {
    notify(errorMessage(reason), true);
  }
}
async function testMcp(server: any) {
  notify("正在测试 " + server.name + "…");
  try {
    const result: any = await apiRequest("/api/mcp/servers/" + encodeURIComponent(server.name) + "/test", { method: "POST" });
    mcpTests[server.name] = result;
    notify(result.ok ? server.name + " 连接成功，发现 " + result.tool_count + " 个工具，耗时 " + result.elapsed_ms + "ms" : server.name + " 连接失败：" + result.error, !result.ok);
    await refreshAll(true);
  } catch (reason) {
    notify(errorMessage(reason), true);
  }
}
async function reloadMcp(server: any) {
  try {
    await apiRequest("/api/mcp/servers/" + encodeURIComponent(server.name) + "/reload", { method: "POST" });
    await refreshAll(true);
    notify(server.name + " 已重新加载");
  } catch (reason) {
    notify(errorMessage(reason), true);
  }
}
function mcpGrantSummary(server: any) {
  const item = assignments.value?.items.find((entry) => entry.kind === "mcp" && entry.id === server.name);
  if (!item || !assignments.value) return "尚未授权任何角色";
  return assignmentSummary(item, assignments.value);
}
function assignedOf(item: AssignmentItem, personaId: string) {
  return assignments.value ? isItemAssigned(item, personaId, assignments.value) : false;
}
async function toggleAssignment(item: AssignmentItem, personaId: string, assigned: boolean) {
  if (item.locked || assignBusy.value) return;
  assignBusy.value = true;
  try {
    assignments.value = await apiRequest<AssignmentSnapshot>("/api/capabilities/assignments", {
      method: "PATCH",
      headers: jsonHeaders(),
      body: JSON.stringify({ persona_id: personaId, kind: item.kind, id: item.id, assigned }),
    });
    notify((assigned ? "已分配 " : "已取消 ") + item.name);
  } catch (reason) {
    notify(errorMessage(reason), true);
  } finally {
    assignBusy.value = false;
  }
}
function onAssignToggle(item: AssignmentItem, personaId: string, event: Event) {
  const target = event.target as HTMLInputElement;
  const assigned = target.checked;
  target.checked = assignedOf(item, personaId);
  void toggleAssignment(item, personaId, assigned);
}
function removeMcp(server: any) {
  askConfirm("删除 MCP 服务", "删除 " + server.name + " 后，其工具将立即从能力清单中移除。", async () => {
    await apiRequest("/api/mcp/servers/" + encodeURIComponent(server.name), { method: "DELETE" });
    await refreshAll(true);
    notify("MCP 服务已删除");
  });
}
async function loadCatalog(refresh = false) {
  try {
    const snapshot: any = await apiRequest("/api/extensions/catalog?kind=" + encodeURIComponent(catalogKind.value) + (refresh ? "&refresh=true" : ""));
    catalog.value = snapshot.items || [];
    catalogStale.value = Boolean(snapshot.stale);
  } catch {
    notify("在线扩展目录暂时不可用，请稍后再试", true);
    catalog.value = [];
  }
}
function isInstalled(item: any) {
  return item.kind === "skill" ? state.skills.some((value) => value.name === item.id) : state.servers.some((value) => value.name === item.id);
}
function openCatalog(item: any) {
  selectedCatalog.value = item;
  nextTick(() => catalogDialog.value?.showModal());
}
async function installCatalog() {
  const item = selectedCatalog.value;
  if (!item) return;
  try {
    const preview: any = await apiRequest("/api/extensions/catalog/" + encodeURIComponent(item.id) + "/install", {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify({ confirmed: false }),
    });
    if (preview.preview?.conflicts?.length) throw new Error(preview.preview.conflicts.join("；"));
    const result: any = await apiRequest("/api/extensions/catalog/" + encodeURIComponent(item.id) + "/install", {
      method: "POST",
      headers: jsonHeaders(),
      body: JSON.stringify({ confirmed: true }),
    });
    if (result.status !== "installed") throw new Error(result.message || "安装未完成");
    await refreshAll(true);
    catalogDialog.value?.close();
    notify(item.kind === "skill" ? "安装完成，请在技能页启用并信任，再到角色分配页授权" : "安装完成，请在 MCP 页配置连接，再到角色分配页授权");
  } catch (reason) {
    notify(errorMessage(reason), true);
  }
}
function mcpStatusClass(server: any) {
  if (!server.enabled) return "warn";
  const status = server.status?.status;
  if (status === "connected") return "ok";
  if (status === "error") return "error";
  return "warn";
}
function mcpStatusLabel(server: any) {
  if (!server.enabled) return "已停用";
  const status = server.status?.status;
  if (status === "connected") return "已连接 · " + Number(server.status?.tool_count || 0) + " 工具";
  if (status === "error") return "连接失败";
  if (status === "not_loaded") return "未加载";
  return status || "未知";
}
function currentSkill() {
  return state.skills.find((item) => item.name === editingSkill.value);
}
function onShow() { void showPage(); }
function onHide() { stopPolling(); }
onMounted(() => {
  const root = document.querySelector("#extensions-app-root");
  root?.addEventListener("charactoid:extensions-show", onShow);
  root?.addEventListener("charactoid:extensions-hide", onHide);
  window.addEventListener("hashchange", applyHash);
  showPage();
});
onBeforeUnmount(() => {
  stopPolling();
  window.removeEventListener("hashchange", applyHash);
});
</script>


<template>
  <main class="yv-page extension-page">
    <header class="extension-hero">
      <div>
        <span class="yv-kicker">Agent capability registry</span>
        <h1>能力扩展</h1>
        <p>内置 Skill / Tool 固定，可按角色开关；自定义 Skill 与 MCP 在本页新增后，再分配给角色。</p>
      </div>
      <div class="hero-actions">
        <span :class="['yv-status', summary.attentionCount ? 'warn' : 'ok']">{{ summary.attentionCount ? summary.attentionCount + ' 项待处理' : '运行正常' }}</span>
        <button class="yv-button yv-icon-button" type="button" title="刷新" :disabled="busy" @click="refreshAll()"><RefreshCw /></button>
      </div>
    </header>

    <section class="signal-strip" aria-label="能力状态">
      <div><span>已启用技能</span><strong>{{ summary.enabledSkills }}</strong><small>共 {{ state.skills.length }} 个</small></div>
      <div><span>MCP 在线</span><strong>{{ summary.mcpOnline }}</strong><small>{{ summary.mcpIssues }} 个异常</small></div>
      <div><span>已注册工具</span><strong>{{ summary.toolCount }}</strong><small>内置 + MCP</small></div>
      <div><span>需要处理</span><strong>{{ summary.attentionCount }}</strong><small>未信任或连接异常</small></div>
    </section>

    <nav class="extension-tabs" aria-label="能力工作台">
      <button v-for="tab in CAPABILITY_TABS" :key="tab.id" :data-capability-tab="tab.id" type="button" :class="{ active: activeTab === tab.id }" @click="goTab(tab.id)">{{ tab.label }}</button>
    </nav>
    <p v-if="message" :class="['extension-message', { error: messageError }]" role="status">{{ message }}</p>

    <section v-if="activeTab === 'overview'" class="overview-layout">
      <div class="capability-line">
        <article class="skill"><span>01 Assign</span><strong>角色分配</strong><p>按角色开关 Skill / Tool；MCP 按服务授权，授权后该服务工具一起生效。</p></article>
        <article class="tool"><span>02 Skill</span><strong>技能</strong><p>内置技能只读固定；自定义技能可新增、启用和信任。</p></article>
        <article class="mcp"><span>03 MCP</span><strong>MCP 服务</strong><p>负责连接、测试和启用。角色授权请到分配页统一管理。</p></article>
        <article><span>04 Tool</span><strong>工具清单</strong><p>内置 Worker 工具固定；MCP 工具随服务出现，确认策略写在代码里。</p></article>
      </div>
      <div class="overview-foot">
        <div>
          <h2>健康与待处理</h2>
          <div class="health-row"><span>技能</span><div>{{ summary.enabledSkills }} / {{ state.skills.length }} 已启用</div><button class="yv-button" type="button" @click="goTab('skills')">管理</button></div>
          <div class="health-row"><span>MCP</span><div>{{ summary.mcpOnline }} 在线 · {{ summary.mcpIssues }} 异常</div><button class="yv-button" type="button" @click="goTab('mcp')">管理</button></div>
          <div class="health-row"><span>工具</span><div>{{ summary.toolCount }} 个已注册</div><button class="yv-button" type="button" @click="goTab('tools')">查看</button></div>
          <div v-if="issues.length" class="attention-list">
            <button v-for="item in issues" :key="item.kind + item.name" class="attention-item" type="button" @click="goTab(item.tab)">
              <span>{{ item.kind === 'skill' ? '技能' : 'MCP' }}</span>
              <div><strong>{{ item.name }}</strong><small>{{ item.detail }}</small></div>
            </button>
          </div>
        </div>
        <div class="quick-entry">
          <h2>快捷入口</h2>
          <button class="yv-button primary" type="button" @click="goTab('assign')">角色分配(Assign)</button>
          <button class="yv-button" type="button" @click="goTab('skills')">技能(Skill)</button>
          <button class="yv-button" type="button" @click="goTab('mcp')">MCP服务(MCP)</button>
          <button class="yv-button" type="button" @click="goTab('tools')">工具(Tool)</button>
          <button class="yv-button" type="button" @click="goTab('catalog')">扩展目录(Catalog)</button>
        </div>
      </div>
    </section>


    <section v-else-if="activeTab === 'assign'" class="content-section">
      <header>
        <div>
          <span class="yv-kicker">Role assignment matrix</span>
          <h2>角色分配(Assign)</h2>
          <p>这是按角色分配 Skill / Tool / MCP 的主界面。内置能力内容固定，只能开关；MCP 按服务授权，不逐个工具分配。</p>
        </div>
        <div>
          <button class="yv-button" type="button" @click="goTab('skills')"><Plus />新增技能</button>
          <button class="yv-button" type="button" @click="goTab('mcp')"><Plus />新增 MCP</button>
        </div>
      </header>
      <div class="assign-toolbar">
        <label class="filter-input"><Search /><input v-model="assignQuery" placeholder="搜索技能、工具或 MCP 服务"></label>
        <div class="assign-kinds">
          <button v-for="item in assignKindOptions" :key="item.id" type="button" :class="{ active: assignKind === item.id }" @click="assignKind = item.id">{{ item.label }}</button>
        </div>
      </div>
      <p class="assign-legend">显示 {{ assignVisibleCount }} 项。勾选即允许该角色使用；取消「全部角色(*)」中的某一个角色，只会收回该角色，不会清空其他人。</p>
      <div v-if="!assignCols.length" class="yv-empty">还没有可分配的能力</div>
      <div v-else class="assign-board">
        <table class="assign-table">
          <thead>
            <tr>
              <th class="sticky">能力</th>
              <th v-for="col in assignCols" :key="col.id" class="check">{{ col.name }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="[group, items] in visibleAssignGroups" :key="group">
              <tr class="group-row"><td :colspan="assignCols.length + 1">{{ group }}</td></tr>
              <tr v-for="item in items" :key="item.id" :class="'kind-' + item.kind">
                <td class="sticky">
                  <div class="assign-name" :title="assignmentHint(item)">
                    <strong>{{ item.name }}</strong>
                    <small>{{ assignments ? assignmentSummary(item, assignments) : '' }}</small>
                  </div>
                </td>
                <td v-for="col in assignCols" :key="item.id + col.id" class="check">
                  <input type="checkbox" :checked="assignedOf(item, col.id)" :disabled="assignBusy || item.locked" :aria-label="item.name + ' / ' + col.name" @change="onAssignToggle(item, col.id, $event)">
                </td>
              </tr>
            </template>
          </tbody>
        </table>
        <p v-if="!visibleAssignGroups.length" class="yv-empty">没有匹配的能力。自定义 Skill / MCP 请到对应分页新增。</p>
      </div>
    </section>
    <section v-else-if="activeTab === 'skills'" class="content-section">
      <header>
        <div>
          <span class="yv-kicker">Instruction packages</span>
          <h2>技能(Skill)</h2>
          <p>内置技能只读查看；自定义技能可编辑、启用、信任并决定是否允许脚本。</p>
        </div>
        <div>
          <input ref="uploadInput" hidden type="file" accept=".zip" @change="onUploadChange">
          <button class="yv-button" type="button" @click="uploadInput?.click()"><Upload />上传技能包</button>
          <button class="yv-button primary" type="button" @click="openSkill()"><Plus />新增技能</button>
        </div>
      </header>
      <div v-if="!state.skills.length" class="yv-empty">还没有技能</div>
      <section v-for="[group, skills] in skillGroups" :key="group" class="skill-group">
        <h3>{{ group }}</h3>
        <article v-for="skill in skills" :key="skill.name" class="extension-row kind-skill">
          <div class="row-main">
            <div>
              <strong>{{ skill.name }}</strong>
              <span>{{ skill.builtin ? '内置' : '自定义' }} · {{ skill.format === 'skillmd' ? '标准包' : 'JSON' }}</span>
            </div>
            <p>{{ skill.description || '暂无说明' }}</p>
            <div class="tag-line">
              <span v-for="tool in skill.tool_names" :key="tool">{{ tool }}</span>
            </div>
            <div class="flag-line">
              <label><input type="checkbox" :checked="skill.enabled" @change="patchSkill(skill, { enabled: !skill.enabled })"><span>启用</span></label>
              <label v-if="!skill.builtin"><input type="checkbox" :checked="skill.trusted" @change="patchSkill(skill, { trusted: !skill.trusted })"><span>信任</span></label>
              <label v-if="skill.scripts?.length"><input type="checkbox" :checked="skill.scripts_enabled" @change="patchSkill(skill, { scripts_enabled: !skill.scripts_enabled })"><span>允许脚本</span></label>
            </div>
          </div>
          <div class="row-actions">
            <span :class="['yv-status', skill.enabled ? 'ok' : 'warn']">{{ skill.enabled ? '已启用' : '已停用' }}</span>
            <button class="yv-button yv-icon-button" type="button" :title="skill.builtin ? '查看' : '编辑'" @click="openSkill(skill, skill.builtin)"><component :is="skill.builtin ? Eye : Edit3" /></button>
            <button v-if="!skill.builtin" class="yv-button yv-icon-button danger" type="button" title="删除" @click="removeSkill(skill)"><Trash2 /></button>
          </div>
        </article>
      </section>
    </section>

    <section v-else-if="activeTab === 'mcp'" class="content-section">
      <header>
        <div>
          <span class="yv-kicker">External protocol services</span>
          <h2>MCP服务(MCP)</h2>
          <p>配置连接、测试连通和启用。角色授权请到「角色分配」页统一管理，未授权角色即使服务在线也看不到对应工具。</p>
        </div>
        <button class="yv-button primary" type="button" @click="openMcp()"><Plus />新增服务</button>
      </header>
      <div v-if="!state.servers.length" class="yv-empty">尚未配置 MCP 服务</div>
      <article v-for="server in state.servers" :key="server.name" class="extension-row kind-mcp">
        <div class="row-main">
          <div>
            <strong>{{ server.name }}</strong>
            <span>{{ server.transport }} · {{ server.enabled ? '已启用' : '已停用' }}</span>
          </div>
          <p>{{ server.description || server.status?.error || '暂无说明' }}</p>
          <div class="grant-box">
            <span>角色授权</span>
            <p class="grant-empty">当前：{{ mcpGrantSummary(server) }}</p>
            <button class="yv-button" type="button" @click="goTab('assign')">去分配</button>
          </div>
          <p v-if="mcpTests[server.name]" class="mcp-test">{{ mcpTests[server.name].ok ? '最近测试成功 · ' + mcpTests[server.name].tool_count + ' 个工具 · ' + mcpTests[server.name].elapsed_ms + 'ms' : '最近测试失败：' + mcpTests[server.name].error }}</p>
        </div>
        <div class="row-actions">
          <span :class="['yv-status', mcpStatusClass(server)]">{{ mcpStatusLabel(server) }}</span>
          <button class="yv-button" type="button" @click="toggleMcp(server)">{{ server.enabled ? '停用' : '启用' }}</button>
          <button class="yv-button yv-icon-button" type="button" title="测试连接" @click="testMcp(server)"><Play /></button>
          <button class="yv-button yv-icon-button" type="button" title="重新加载" @click="reloadMcp(server)"><RotateCw /></button>
          <button class="yv-button yv-icon-button" type="button" title="编辑" @click="openMcp(server)"><Edit3 /></button>
          <button class="yv-button yv-icon-button danger" type="button" title="删除" @click="removeMcp(server)"><Trash2 /></button>
        </div>
      </article>
    </section>

    <section v-else-if="activeTab === 'tools'" class="content-section">
      <header>
        <div>
          <span class="yv-kicker">Registered tools</span>
          <h2>工具(Tool)</h2>
          <p>这里列出内置 Worker 工具和已连接 MCP 工具。内置工具可在角色分配页按角色开关；MCP 工具随所属服务授权。</p>
        </div>
        <button class="yv-button" type="button" @click="goTab('assign')">去分配</button>
      </header>
      <div class="filter-row">
        <label class="filter-input"><Search /><input v-model="toolFilter" placeholder="搜索名称、说明、服务或 Worker"></label>
        <select v-model="toolSource">
          <option value="all">全部来源</option>
          <option value="builtin">内置</option>
          <option value="mcp">MCP</option>
        </select>
      </div>
      <div v-if="!visibleToolGroups.length" class="yv-empty">没有匹配的工具</div>
      <section v-for="[group, tools] in visibleToolGroups" :key="group" class="tool-group">
        <h3>{{ group }}</h3>
        <article v-for="tool in tools" :key="tool.name" class="extension-row kind-tool">
          <div class="row-main">
            <div>
              <strong>{{ tool.name }}</strong>
              <span>{{ tool.source === 'mcp' ? (tool.server || 'MCP') : '内置' }}</span>
            </div>
            <p>{{ tool.description || '暂无说明' }}</p>
            <div v-if="tool.usedBy?.length" class="used-by tag-line">
              <span v-for="name in tool.usedBy" :key="name">技能 {{ name }}</span>
            </div>
          </div>
          <span :class="['yv-status', tool.requires_confirmation ? 'warn' : 'ok']">{{ tool.requires_confirmation ? '调用需确认' : '可直接调用' }}</span>
        </article>
      </section>
    </section>

    <section v-else-if="activeTab === 'catalog'" class="content-section">
      <header>
        <div>
          <span class="yv-kicker">Curated catalog</span>
          <h2>扩展目录(Catalog)</h2>
          <p>查看可安装扩展，确认来源后再加入本地能力系统。</p>
        </div>
        <button class="yv-button" type="button" @click="loadCatalog(true)"><RefreshCw />刷新目录</button>
      </header>
      <div class="catalog-tools">
        <label class="filter-input"><Search /><input v-model="catalogQuery" placeholder="搜索名称、说明或分类"></label>
        <select v-model="catalogKind" @change="loadCatalog(false)">
          <option value="all">全部类型</option>
          <option value="skill">Skill</option>
          <option value="mcp">MCP</option>
        </select>
        <span :class="['yv-status', catalogStale ? 'warn' : 'ok']">{{ catalogStale ? '缓存目录' : catalog.length + ' 个条目' }}</span>
      </div>
      <div class="catalog-grid">
        <article v-for="item in visibleCatalog" :key="item.id" :class="['catalog-item', 'kind-' + item.kind]">
          <span>{{ (item.kind || '').toUpperCase() }}</span>
          <h3>{{ item.name || item.id }}</h3>
          <small>v{{ item.version || '未知' }} · {{ item.id }}</small>
          <p>{{ item.description || '暂无说明' }}</p>
          <div class="tag-line"><span v-for="tag in item.categories" :key="tag">{{ tag }}</span></div>
          <button class="yv-button" type="button" :disabled="isInstalled(item)" @click="openCatalog(item)">{{ isInstalled(item) ? '已安装' : '查看并安装' }}</button>
        </article>
      </div>
    </section>

    <dialog ref="drawer" class="yv-dialog">
      <header class="dialog-head">
        <div>
          <span class="yv-kicker">{{ drawerKind === 'skill' ? 'Instruction package' : 'Protocol service' }}</span>
          <h2 v-if="drawerKind === 'skill'">{{ skillReadonly ? '查看 ' + (editingSkill || '') : (editingSkill ? '编辑 ' + editingSkill : '新增技能') }}</h2>
          <h2 v-else>{{ editingMcp ? '编辑 ' + editingMcp : '新增 MCP 服务' }}</h2>
        </div>
        <button class="yv-button yv-icon-button" type="button" title="关闭" @click="drawer?.close()"><X /></button>
      </header>
      <form v-if="drawerKind === 'skill'" class="dialog-body" @submit.prevent="saveSkill">
        <p v-if="skillReadonly" class="readonly-banner">内置技能只读。可以在列表中启用或停用，但不能改提示词和工具。</p>
        <label class="yv-field"><span>名称</span><input v-model="skillForm.name" :readonly="!!editingSkill || skillReadonly"></label>
        <label class="yv-field"><span>描述</span><input v-model="skillForm.description" :readonly="skillReadonly"></label>
        <label class="yv-field"><span>提示词</span><textarea v-model="skillForm.instructions" rows="6" :readonly="skillReadonly"></textarea></label>
        <label class="yv-field"><span>触发提示</span><input v-model="skillForm.prompt_hint" :readonly="skillReadonly"></label>
        <p v-if="currentSkill()?.scripts?.length" class="mcp-test">脚本：{{ currentSkill().scripts.join('、') }}{{ currentSkill().scripts_enabled ? '（已允许）' : '（未允许）' }}</p>
        <fieldset v-for="[group, tools] in skillFormToolGroups" :key="group" class="tool-options">
          <legend>{{ group }}</legend>
          <label v-for="tool in tools" :key="tool.name">
            <input v-model="skillForm.tool_names" type="checkbox" :value="tool.name" :disabled="skillReadonly">
            <span>{{ tool.name }}{{ tool.requires_confirmation ? '（需确认）' : '' }}</span>
          </label>
        </fieldset>
        <button v-if="!skillReadonly" class="yv-button primary" type="submit"><Save />保存技能</button>
      </form>
      <form v-else class="dialog-body" @submit.prevent="saveMcp">
        <label class="yv-field"><span>名称</span><input v-model="mcpForm.name" :readonly="!!editingMcp"></label>
        <label class="yv-field"><span>描述</span><input v-model="mcpForm.description"></label>
        <div class="transport-tabs">
          <button v-for="item in [{id:'stdio',label:'本地进程(stdio)'},{id:'streamable_http',label:'远程 HTTP(HTTP)'},{id:'sse',label:'远程 SSE(SSE)'}]" :key="item.id" type="button" :class="{ active: mcpForm.transport === item.id }" @click="mcpForm.transport = item.id">{{ item.label }}</button>
        </div>
        <template v-if="mcpForm.transport === 'stdio'">
          <label class="yv-field"><span>启动命令</span><input v-model="mcpForm.command"></label>
          <label class="yv-field"><span>参数（每行一个）</span><textarea v-model="mcpForm.args" rows="3"></textarea></label>
          <label class="yv-field"><span>环境变量（KEY=VALUE）</span><textarea v-model="mcpForm.env" rows="3"></textarea></label>
        </template>
        <template v-else>
          <label class="yv-field"><span>服务器地址</span><input v-model="mcpForm.url"></label>
          <label class="yv-field"><span>请求头（KEY: VALUE）</span><textarea v-model="mcpForm.headers" rows="3"></textarea></label>
        </template>
        <label class="flag-line"><input v-model="mcpForm.enabled" type="checkbox"><span>保存后启用</span></label>
        <button class="yv-button primary" type="submit"><Save />保存服务</button>
      </form>
    </dialog>

    <dialog ref="catalogDialog" class="yv-dialog">
      <header class="dialog-head">
        <div>
          <span class="yv-kicker">安装预览</span>
          <h2>{{ selectedCatalog?.name || selectedCatalog?.id }}</h2>
        </div>
        <button class="yv-button yv-icon-button" type="button" title="关闭" @click="catalogDialog?.close()"><X /></button>
      </header>
      <div class="dialog-body">
        <p>{{ selectedCatalog?.description || '暂无说明' }}</p>
        <dl class="catalog-detail">
          <dt>类型</dt><dd>{{ selectedCatalog?.kind?.toUpperCase() }}</dd>
          <dt>版本</dt><dd>{{ selectedCatalog?.version || '未知' }}</dd>
          <dt>来源</dt><dd>{{ selectedCatalog?.source?.type || '未知' }}</dd>
        </dl>
        <button class="yv-button primary" type="button" @click="installCatalog"><Download />确认安装</button>
      </div>
    </dialog>

    <dialog ref="confirmDialog" class="yv-dialog confirm-dialog">
      <header class="dialog-head">
        <div>
          <span class="yv-kicker">Confirm action</span>
          <h2>{{ confirmState.title }}</h2>
        </div>
        <button class="yv-button yv-icon-button" type="button" title="关闭" @click="confirmDialog?.close()"><X /></button>
      </header>
      <div class="dialog-body">
        <p>{{ confirmState.detail }}</p>
        <div class="dialog-actions">
          <button class="yv-button" type="button" @click="confirmDialog?.close()">取消</button>
          <button class="yv-button danger" type="button" :disabled="confirmState.busy" @click="runConfirm">确认删除</button>
        </div>
      </div>
    </dialog>
  </main>
</template>
