export type ExtensionState = { skills: any[]; servers: any[]; tools: any[] };
export type CapabilityTab = "overview" | "assign" | "skills" | "mcp" | "tools" | "catalog";
export type AssignmentKind = "skill" | "tool" | "mcp" | "all";
export type AssignmentItem = {
  kind: "skill" | "tool" | "mcp";
  id: string;
  name: string;
  group: string;
  builtin?: boolean;
  default_assigned: boolean;
  source?: string;
  server?: string;
  locked?: boolean;
  allowed_persona_ids?: string[];
  enabled?: boolean;
  trusted?: boolean;
  description?: string;
};
export type AssignmentSnapshot = {
  personas: Array<{ id: string; name: string }>;
  items: AssignmentItem[];
  overrides: Record<string, Record<string, boolean>>;
};

export const CAPABILITY_TABS: Array<{ id: CapabilityTab; label: string }> = [
  { id: "assign", label: "角色分配(Assign)" },
  { id: "overview", label: "总览(Overview)" },
  { id: "skills", label: "技能(Skill)" },
  { id: "mcp", label: "MCP服务(MCP)" },
  { id: "tools", label: "工具(Tool)" },
  { id: "catalog", label: "扩展目录(Catalog)" },
];

const WORKER_LABELS: Record<string, string> = {
  knowledge_worker: "知识(Knowledge)",
  memory_worker: "记忆(Memory)",
  document_worker: "文档(Document)",
  profile_worker: "人设(Profile)",
  voice_worker: "语音(Voice)",
  rvc_worker: "变声(RVC)",
  live2d_worker: "Live2D",
  config_worker: "配置(Config)",
  mcp: "MCP",
};

export function deriveExtensionSummary(state: ExtensionState) {
  const skills = state.skills || [];
  const servers = state.servers || [];
  const tools = state.tools || [];
  const enabledSkills = skills.filter((skill) => skill.enabled).length;
  const mcpOnline = servers.filter((server) => server.enabled && server.status?.status === "connected").length;
  const mcpIssues = servers.filter((server) => server.status?.status === "error" || (server.enabled && server.status?.status !== "connected")).length;
  const untrustedSkills = skills.filter((skill) => !skill.builtin && !skill.trusted).length;
  return { enabledSkills, mcpOnline, mcpIssues, toolCount: tools.length, attentionCount: mcpIssues + untrustedSkills };
}

export function parseKeyValueLines(text: string) {
  const result: Record<string, string> = {};
  for (const line of text.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    const eq = trimmed.indexOf("=");
    const colon = trimmed.indexOf(":");
    const separator = eq > 0 && (colon < 0 || eq < colon) ? eq : colon;
    if (separator > 0) result[trimmed.slice(0, separator).trim()] = trimmed.slice(separator + 1).trim();
  }
  return result;
}

export function serializeKeyValueLines(values: Record<string, string> | undefined) {
  return Object.entries(values || {}).map(([key, value]) => `${key}=${value}`).join("\n");
}

export function tabFromHash(hash: string): CapabilityTab {
  const raw = String(hash || "").replace(/^#/, "");
  const id = raw.startsWith("capabilities-") ? raw.slice("capabilities-".length) : raw === "capabilities" ? "assign" : raw;
  if (id === "overview" || id === "assign" || id === "skills" || id === "mcp" || id === "tools" || id === "catalog") return id;
  return "assign";
}

export function groupSkills(skills: any[]) {
  const groups: Record<string, any[]> = {};
  for (const skill of skills || []) {
    const key = skill.metadata?.category || (skill.builtin ? "内置" : "自定义");
    (groups[key] ||= []).push(skill);
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b, "zh"));
}

export function workerLabel(specialist: string | undefined) {
  if (!specialist) return "其他";
  return WORKER_LABELS[specialist] || specialist;
}

export function groupTools(tools: any[], skills: any[] = []) {
  const usedBy = new Map<string, string[]>();
  for (const skill of skills || []) {
    for (const name of skill.tool_names || []) {
      const list = usedBy.get(name) || [];
      list.push(skill.name);
      usedBy.set(name, list);
    }
  }
  const groups: Record<string, any[]> = {};
  for (const tool of tools || []) {
    const enriched = { ...tool, usedBy: usedBy.get(tool.name) || [] };
    const key = tool.source === "mcp" || tool.specialist === "mcp" ? "MCP" : workerLabel(tool.specialist);
    (groups[key] ||= []).push(enriched);
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b, "zh"));
}

export function attentionItems(state: ExtensionState, snapshot?: AssignmentSnapshot | null) {
  const items: Array<{ kind: string; name: string; detail: string; tab: CapabilityTab }> = [];
  for (const skill of state.skills || []) {
    if (!skill.builtin && !skill.trusted) {
      items.push({ kind: "skill", name: skill.name, detail: "未信任的自定义技能，默认不启用脚本", tab: "skills" });
    }
  }
  for (const server of state.servers || []) {
    if (server.status?.status === "error") {
      items.push({ kind: "mcp", name: server.name, detail: server.status?.error || "连接失败", tab: "mcp" });
    } else if (server.enabled && server.status?.status !== "connected") {
      items.push({ kind: "mcp", name: server.name, detail: "已启用但尚未连上", tab: "mcp" });
    }
  }
  if (snapshot) {
    for (const item of snapshot.items || []) {
      if (item.kind === "skill" && !item.builtin && assignmentSummary(item, snapshot) === "未分配") {
        items.push({ kind: "skill", name: item.name, detail: "自定义技能尚未分配给任何角色", tab: "assign" });
      }
      if (item.kind === "mcp" && assignmentSummary(item, snapshot) === "未分配") {
        items.push({ kind: "mcp", name: item.name, detail: "MCP 服务尚未授权给任何角色", tab: "assign" });
      }
    }
  }
  return items;
}

export function filterTools(tools: any[], query: string, source: "all" | "builtin" | "mcp") {
  const q = query.trim().toLowerCase();
  return (tools || []).filter((tool) => {
    const isMcp = tool.source === "mcp" || tool.specialist === "mcp";
    if (source === "mcp" && !isMcp) return false;
    if (source === "builtin" && isMcp) return false;
    if (!q) return true;
    return [tool.name, tool.server, tool.description, tool.specialist].some((value) => String(value || "").toLowerCase().includes(q));
  });
}

export function isItemAssigned(item: AssignmentItem, personaId: string, snapshot: AssignmentSnapshot) {
  if (item.kind === "mcp") {
    const ids = item.allowed_persona_ids || [];
    if (personaId === "*") return ids.includes("*");
    return ids.includes("*") || ids.includes(personaId);
  }
  const overrides = snapshot.overrides || {};
  const explicit = overrides[personaId]?.[item.id];
  if (explicit !== undefined) return explicit;
  if (personaId !== "*") {
    const starred = overrides["*"]?.[item.id];
    if (starred !== undefined) return starred;
  }
  return Boolean(item.default_assigned);
}

export function assignmentSummary(item: AssignmentItem, snapshot: AssignmentSnapshot) {
  const personas = snapshot.personas || [];
  if (item.kind === "mcp") {
    const ids = item.allowed_persona_ids || [];
    if (ids.includes("*")) return "全部角色";
    if (!ids.length) return "未分配";
    const names = ids.map((id) => personas.find((persona) => persona.id === id)?.name || id);
    return names.length <= 2 ? names.join("、") : `${names.slice(0, 2).join("、")} 等 ${names.length} 个角色`;
  }
  const assigned = personas.filter((persona) => isItemAssigned(item, persona.id, snapshot));
  const global = isItemAssigned(item, "*", snapshot);
  if (global && assigned.length === personas.length) return "全部角色";
  if (!assigned.length) return "未分配";
  const names = assigned.map((persona) => persona.name);
  return names.length <= 2 ? names.join("、") : `${names.slice(0, 2).join("、")} 等 ${names.length} 个角色`;
}

export function groupAssignmentItems(items: AssignmentItem[]) {
  const groups: Record<string, AssignmentItem[]> = {};
  for (const item of items || []) {
    const key = item.kind === "skill" ? `技能 · ${item.group}` : item.kind === "mcp" ? "MCP 服务" : `工具 · ${item.group}`;
    (groups[key] ||= []).push(item);
  }
  return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b, "zh"));
}

export function filterAssignmentItems(items: AssignmentItem[], query: string, kind: AssignmentKind) {
  const q = query.trim().toLowerCase();
  return (items || []).filter((item) => {
    if (item.locked) return false;
    if (kind !== "all" && item.kind !== kind) return false;
    if (!q) return true;
    return [item.name, item.group, item.server, item.description].some((value) => String(value || "").toLowerCase().includes(q));
  });
}

export function assignmentHint(item: AssignmentItem) {
  if (item.kind === "mcp") return "未授权则完全不可见；授权后该服务下的工具才可被角色调用。";
  if (item.kind === "skill") return item.builtin ? "内置技能默认开放，可按角色关闭。" : "自定义技能默认不给任何角色，需要明确分配。";
  if (item.locked) return "MCP 工具随所属服务授权，不在这里单独开关。";
  return "内置工具默认开放，可按角色关闭。";
}

export function assignmentColumns(snapshot: AssignmentSnapshot | null) {
  return [{ id: "*", name: "全部角色(*)" }, ...(snapshot?.personas || [])];
}
