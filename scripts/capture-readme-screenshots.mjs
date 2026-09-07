#!/usr/bin/env node
/** Generate deterministic README screenshots from the running local CHARACTOID UI. */
import playwright from "../frontend/node_modules/playwright/index.js";
const { chromium } = playwright;
import { existsSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";

const baseURL = process.env.CHARACTOID_BASE_URL || "http://127.0.0.1:18000";
const outDir = new URL("../docs/images/", import.meta.url).pathname.replace(/^\/+([A-Z]:)/, "$1");
mkdirSync(outDir, { recursive: true });

async function reachable(url) {
  try { const res = await fetch(url); return res.ok; } catch { return false; }
}
if (!await reachable(`${baseURL}/static/index.html`)) {
  throw new Error(`CHARACTOID 未运行或无法访问：${baseURL}`);
}

const browser = await chromium.launch({ headless: true, channel: process.env.CHARACTOID_BROWSER || "msedge" }).catch(() => chromium.launch({ headless: true }));
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  await page.goto(`${baseURL}/static/index.html`, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(1200);
  await page.evaluate(() => document.body.classList.add("readme-capture"));
  const shots = [
    { view: "chat", file: "charactoid-conversation-workbench" },
    { view: "voice", file: "charactoid-rvc-task" },
    { view: "system", file: "charactoid-system-status" },
  ];
  for (const shot of shots) {
    await page.locator(`[data-view="${shot.view}"]`).first().click();
    await page.waitForTimeout(900);
    await page.screenshot({ path: `${outDir}/${shot.file}.raw.png`, fullPage: true });
    console.log(`captured ${shot.view}`);
  }
} finally { await browser.close(); }

const py = spawnSync(process.env.CHARACTOID_PYTHON || ".venv/Scripts/python.exe", ["scripts/wrap-readme-screenshots.py"], { stdio: "inherit" });
if (py.status !== 0) process.exit(py.status ?? 1);


