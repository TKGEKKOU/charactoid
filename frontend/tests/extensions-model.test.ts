import { describe, expect, it } from "vitest";

import { assignmentSummary, attentionItems, deriveExtensionSummary, filterAssignmentItems, filterTools, groupSkills, groupTools, isItemAssigned, parseKeyValueLines, tabFromHash } from "../src/extensions/model";

describe("extension console model", () => {
  it("derives the overview without coupling it to rendered DOM", () => {
    expect(deriveExtensionSummary({
      skills: [
        { name: "rag", enabled: true, builtin: true, trusted: true },
        { name: "search", enabled: false, builtin: false, trusted: false },
      ],
      servers: [
        { name: "ok", enabled: true, status: { status: "connected" } },
        { name: "bad", enabled: true, status: { status: "error" } },
      ],
      tools: [{ name: "query" }],
    })).toEqual({ enabledSkills: 1, mcpOnline: 1, mcpIssues: 1, toolCount: 1, attentionCount: 2 });
  });

  it("parses MCP environment and header lines", () => {
    expect(parseKeyValueLines("TOKEN=abc\nAuthorization: Bearer demo\ninvalid")).toEqual({
      TOKEN: "abc",
      Authorization: "Bearer demo",
    });
  });
});

describe("capability navigation and grouping", () => {
  it("reads tabs from hash", () => {
    expect(tabFromHash("#capabilities-overview")).toBe("overview");
    expect(tabFromHash("#capabilities-assign")).toBe("assign");
    expect(tabFromHash("#capabilities-skills")).toBe("skills");
    expect(tabFromHash("#capabilities")).toBe("assign");
    expect(tabFromHash("#nope")).toBe("assign");
  });

  it("groups builtin skills and records tool usage", () => {
    const skillGroups = Object.fromEntries(groupSkills([
      { name: "rag", builtin: true, metadata: {} },
      { name: "custom", builtin: false, metadata: { category: "demo" } },
    ]));
    expect(skillGroups["内置"][0].name).toBe("rag");
    expect(skillGroups.demo[0].name).toBe("custom");
    const toolGroups = Object.fromEntries(groupTools(
      [
        { name: "search_persona_knowledge", specialist: "knowledge_worker", source: "builtin" },
        { name: "demo_add", specialist: "mcp", source: "mcp", server: "fs" },
      ],
      [{ name: "rag", tool_names: ["search_persona_knowledge"] }],
    ));
    expect(toolGroups["知识(Knowledge)"][0].usedBy).toEqual(["rag"]);
    expect(toolGroups.MCP[0].name).toBe("demo_add");
  });

  it("filters tools and lists attention items", () => {
    const tools = [
      { name: "search_persona_knowledge", specialist: "knowledge_worker", source: "builtin", description: "search" },
      { name: "demo_add", specialist: "mcp", source: "mcp", server: "fs", description: "add" },
    ];
    expect(filterTools(tools, "demo", "all").map((item) => item.name)).toEqual(["demo_add"]);
    expect(filterTools(tools, "", "builtin")).toHaveLength(1);
    expect(attentionItems({
      skills: [{ name: "custom", builtin: false, trusted: false }],
      servers: [{ name: "bad", enabled: true, status: { status: "error", error: "timeout" } }],
      tools: [],
    })).toEqual([
      { kind: "skill", name: "custom", detail: "未信任的自定义技能，默认不启用脚本", tab: "skills" },
      { kind: "mcp", name: "bad", detail: "timeout", tab: "mcp" },
    ]);
  });

  it("assigns builtin tools by default and keeps MCP tools out of the matrix", () => {
    const snapshot = {
      personas: [{ id: "alpha", name: "Alpha" }],
      items: [
        { kind: "skill" as const, id: "skill/custom", name: "custom", group: "自定义", builtin: false, default_assigned: false },
        { kind: "mcp" as const, id: "fs", name: "fs", group: "MCP", default_assigned: false, allowed_persona_ids: ["alpha"] },
        { kind: "tool" as const, id: "builtin/search", name: "search", group: "知识", builtin: true, default_assigned: true },
        { kind: "tool" as const, id: "mcp/fs/add", name: "add", group: "MCP", default_assigned: false, locked: true, server: "fs" },
      ],
      overrides: { alpha: { "skill/custom": true } },
    };
    expect(isItemAssigned(snapshot.items[0], "alpha", snapshot)).toBe(true);
    expect(isItemAssigned(snapshot.items[1], "*", snapshot)).toBe(false);
    expect(isItemAssigned(snapshot.items[1], "alpha", snapshot)).toBe(true);
    expect(isItemAssigned(snapshot.items[2], "alpha", snapshot)).toBe(true);
    expect(assignmentSummary(snapshot.items[1], snapshot)).toBe("Alpha");
    expect(filterAssignmentItems(snapshot.items, "", "all").map((item) => item.id)).toEqual([
      "skill/custom",
      "fs",
      "builtin/search",
    ]);
  });
});
