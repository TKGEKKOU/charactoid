"use strict";

window.PL = window.PL || { modules: {} };

let currentCategory = "llm";
let providersData = [];
let providersLoadRequest = null;
let providersLoadSequence = 0;
const pendingToggleIds = new Set();

async function initProviders() {
  bindProvidersEvents();
  await loadProviders();
}

function bindProvidersEvents() {
  document.querySelectorAll(".providers-tab").forEach(btn => {
    if (btn.dataset.providersBound === "true") return;
    btn.dataset.providersBound = "true";
    btn.addEventListener("click", () => switchCategory(btn.dataset.category));
  });

  const gridEl = document.getElementById("providers-grid");
  if (!gridEl || gridEl.dataset.providersBound === "true") return;
  gridEl.dataset.providersBound = "true";
  gridEl.addEventListener("click", event => {
    // 开关由 change 事件处理；阻止冒泡，避免点击开关同时打开配置弹窗。
    if (event.target.closest(".provider-toggle")) return;
    const card = event.target.closest(".provider-card");
    if (card) openProviderConfig(card.dataset.providerId);
  });
  gridEl.addEventListener("change", event => {
    const toggle = event.target.closest(".provider-toggle input");
    if (toggle) handleToggleChange(toggle.dataset.providerId, toggle.checked, toggle);
  });
}

async function loadProviders({ silent = false } = {}) {
  const loadingEl = document.getElementById("providers-loading");
  const errorEl = document.getElementById("providers-error");
  const requestSequence = ++providersLoadSequence;

  // 初始化时显示加载态；已有卡片刷新时保留旧内容，避免页面闪烁。
  if (!silent && providersData.length === 0 && loadingEl) loadingEl.classList.remove("is-hidden");
  if (errorEl) errorEl.classList.add("is-hidden");
  if (providersLoadRequest) providersLoadRequest.abort();
  providersLoadRequest = new AbortController();

  try {
    const response = await fetch("/api/providers/list", { signal: providersLoadRequest.signal });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    if (requestSequence !== providersLoadSequence) return;
    providersData = Array.isArray(data.providers) ? data.providers : [];
    renderProvidersByCategory(currentCategory);
    if (loadingEl) loadingEl.classList.add("is-hidden");
  } catch (error) {
    if (error.name === "AbortError" || requestSequence !== providersLoadSequence) return;
    console.error("Failed to load providers:", error);
    if (loadingEl) loadingEl.classList.add("is-hidden");
    if (errorEl) {
      errorEl.classList.remove("is-hidden");
      const msgEl = errorEl.querySelector(".error-message");
      if (msgEl) msgEl.textContent = error.message || "加载失败";
    }
  } finally {
    if (requestSequence === providersLoadSequence) providersLoadRequest = null;
  }
}

function switchCategory(category) {
  currentCategory = category;
  document.querySelectorAll(".providers-tab").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.category === category);
  });
  renderProvidersByCategory(category);
}

function providerFingerprint(provider) {
  return JSON.stringify([
    provider.name, provider.description, provider.is_active, provider.is_configured,
    provider.runtime_supported, provider.runtime_note, provider.requires_api_key,
    provider.current_base_url, provider.current_model
  ]);
}

function updateProviderCard(card, provider) {
  const activeClass = provider.is_active ? "is-active" : "";
  const statusIcon = provider.is_configured ? "check-circle" : "circle";
  const statusText = provider.is_configured ? "已配置" : "未配置";
  const statusClass = provider.is_configured ? "is-configured" : "is-unconfigured";
  card.className = `provider-card ${activeClass}`;
  card.dataset.providerId = provider.id;
  card.dataset.fingerprint = providerFingerprint(provider);
  card.innerHTML = `
    <div class="provider-card-header">
      <h3 class="provider-name">${escapeHtml(provider.name)}</h3>
      <label class="provider-toggle">
        <input type="checkbox" ${provider.is_active ? "checked" : ""} ${!provider.is_configured || !provider.runtime_supported ? "disabled" : ""} data-provider-id="${escapeHtml(provider.id)}">
        <span class="toggle-slider"></span>
      </label>
    </div>
    <p class="provider-description">${escapeHtml(provider.description)}</p>
    <div class="provider-status ${statusClass}">
      <i data-lucide="${statusIcon}"></i><span>${statusText}</span>
    </div>
    <div class="provider-runtime-status ${provider.runtime_supported ? "is-supported" : "is-not-supported"}" title="${escapeHtml(provider.runtime_note || "")}">
      <i data-lucide="${provider.runtime_supported ? "plug-zap" : "info"}"></i>
      <span>${provider.runtime_supported ? "运行链路已接入" : "仅保存/测试，未接入运行链路"}</span>
    </div>`;
}

function renderProvidersByCategory(category) {
  const gridEl = document.getElementById("providers-grid");
  if (!gridEl) return;
  const categoryProviders = providersData.filter(p => p.type === category);
  const existingCards = new Map([...gridEl.querySelectorAll(".provider-card")].map(card => [card.dataset.providerId, card]));
  const emptyEl = gridEl.querySelector("[data-providers-empty]");
  const categoryIds = new Set(categoryProviders.map(provider => provider.id));
  // 切换分类时只移除不属于当前分类的卡片，保留当前分类中未变化的节点。
  existingCards.forEach((card, providerId) => {
    if (!categoryIds.has(providerId)) card.remove();
  });
  if (categoryProviders.length === 0) {
    existingCards.forEach(card => card.remove());
    if (!emptyEl) {
      const node = document.createElement("div");
      node.dataset.providersEmpty = "true";
      node.className = "providers-loading";
      node.innerHTML = '<i data-lucide="inbox"></i><p>暂无提供商</p>';
      gridEl.appendChild(node);
      lucide.createIcons();
    }
    return;
  }
  if (emptyEl) emptyEl.remove();

  const fragment = document.createDocumentFragment();
  categoryProviders.forEach(provider => {
    let card = existingCards.get(provider.id);
    if (!card) {
      card = document.createElement("article");
      updateProviderCard(card, provider);
    } else if (card.dataset.fingerprint !== providerFingerprint(provider)) {
      updateProviderCard(card, provider);
    }
    fragment.appendChild(card);
  });
  // 只移动/新增必要卡片，不清空网格；已有节点和弹窗状态得以保留。
  gridEl.appendChild(fragment);
  lucide.createIcons();
}

async function handleToggleChange(providerId, enabled, toggle) {
  const provider = providersData.find(p => p.id === providerId);
  if (!provider || pendingToggleIds.has(providerId)) return;

  // 先锁定当前开关，避免连续点击产生相互覆盖的请求。
  pendingToggleIds.add(providerId);
  if (toggle) toggle.disabled = true;

  // 如果是关闭操作，弹出确认；取消时只恢复当前控件，不刷新整页。
  if (!enabled) {
    const confirmed = confirm('确定要停用 ' + provider.name + ' 吗？');
    if (!confirmed) {
      if (toggle) {
        toggle.checked = Boolean(provider.is_active);
        toggle.disabled = false;
      }
      pendingToggleIds.delete(providerId);
      return;
    }
  }

  // 如果是开启，检查是否已配置。
  if (enabled && !provider.is_configured) {
    alert('请先配置该提供商');
    if (toggle) {
      toggle.checked = false;
      toggle.disabled = false;
    }
    pendingToggleIds.delete(providerId);
    return;
  }

  try {
    const payload = {
      provider_type: provider.type,
      provider_id: providerId,
      api_key: null,
      base_url: provider.current_base_url || null,
      model: provider.current_model || null,
      enabled: enabled
    };
    await api(fetch("/api/providers/configure", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
      body: JSON.stringify(payload)
    }));
    await loadProviders({ silent: true });
  } catch (error) {
    console.error("Failed to toggle provider:", error);
    alert(`切换失败: ${error.message || "请求失败"}`);
    if (toggle) toggle.checked = Boolean(provider.is_active);
    await loadProviders({ silent: true });
  } finally {
    pendingToggleIds.delete(providerId);
    if (toggle && toggle.isConnected) {
      toggle.disabled = !provider.is_configured || !provider.runtime_supported;
    }
  }
}

function openProviderConfig(providerId) {
  const provider = providersData.find(p => p.id === providerId);
  if (!provider) return;
  const template = document.getElementById("provider-config-modal-template");
  if (!template) return;
  const modal = template.content.cloneNode(true).querySelector("[data-provider-modal]");
  const titleEl = modal.querySelector(".modal-title");
  if (titleEl) titleEl.textContent = provider.name;
  const descEl = modal.querySelector(".provider-description");
  if (descEl) descEl.textContent = provider.description;
  const form = modal.querySelector(".provider-config-form");
  const apiKeyInput = form.querySelector('[name="api_key"]');
  const baseUrlInput = form.querySelector('[name="base_url"]');
  const modelInput = form.querySelector('[name="model"]');
  
  // 填充已有配置值
  if (apiKeyInput) {
    apiKeyInput.value = provider.current_api_key || "";
    apiKeyInput.placeholder = provider.is_configured ? "已配置，留空保持不变" : "请输入 API Key";
  }
  if (baseUrlInput) {
    baseUrlInput.value = provider.current_base_url || provider.default_base_url || "";
    baseUrlInput.placeholder = "API 服务地址";
  }
  if (modelInput) {
    modelInput.value = provider.current_model || provider.default_model || "";
    modelInput.placeholder = "模型名称";
  }

  if (!provider.requires_api_key) {
    const apiKeyField = form.querySelector('[name="api_key"]')?.closest(".field");
    if (apiKeyField) apiKeyField.style.display = "none";
  }
  const testBtn = modal.querySelector(".test-connection");
  if (testBtn) {
    testBtn.addEventListener("click", async () => {
      const formData = new FormData(form);
      await testProviderConnection(provider, formData, modal);
    });
  }
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    await saveProviderConfig(provider, formData, modal);
  });
  const closeBtn = modal.querySelector(".modal-close");
  if (closeBtn) closeBtn.addEventListener("click", () => modal.remove());
  // 已禁用点击外部关闭弹窗
  document.body.appendChild(modal);
  lucide.createIcons();
}

async function testProviderConnection(provider, formData, modal) {
  const testBtn = modal.querySelector(".test-connection");
  const resultEl = modal.querySelector(".test-result");
  if (testBtn) {
    testBtn.disabled = true;
    testBtn.innerHTML = '<i data-lucide="loader-circle" class="spin"></i> 测试中...';
    lucide.createIcons();
  }
  try {
    const payload = {
      provider_type: provider.type,
      provider_id: provider.id,
      api_key: formData.get("api_key") || null,
      base_url: formData.get("base_url") || provider.default_base_url,
      model: formData.get("model") || provider.default_model
    };
    const result = await api(fetch("/api/providers/test", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
      body: JSON.stringify(payload)
    }));
    if (resultEl) {
      resultEl.classList.remove("is-hidden", "is-success", "is-error");
      resultEl.classList.add(result.ok ? "is-success" : "is-error");
      const latencyText = result.latency_ms ? `<span class="latency">${result.latency_ms}ms</span>` : '';
      resultEl.innerHTML = `<i data-lucide="${result.ok ? 'check-circle' : 'alert-circle'}"></i><span></span>${latencyText}`;
      resultEl.querySelector("span").textContent = result.message;
      lucide.createIcons();
    }
  } catch (error) {
    if (resultEl) {
      resultEl.classList.remove("is-hidden", "is-success");
      resultEl.classList.add("is-error");
      resultEl.innerHTML = '<i data-lucide="alert-circle"></i><span></span>';
      resultEl.querySelector("span").textContent = error.message || "测试失败";
      lucide.createIcons();
    }
  } finally {
    if (testBtn) {
      testBtn.disabled = false;
      testBtn.innerHTML = '<i data-lucide="wifi"></i> 测试连接';
      lucide.createIcons();
    }
  }
}

async function saveProviderConfig(provider, formData, modal) {
  const submitBtn = modal.querySelector('button[type="submit"]');
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "保存中...";
  }
  try {
    const payload = {
      provider_type: provider.type,
      provider_id: provider.id,
      api_key: formData.get("api_key") || null,
      base_url: formData.get("base_url") || null,
      model: formData.get("model") || null,
      enabled: true
    };
      await api(fetch("/api/providers/configure", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
      body: JSON.stringify(payload)
      }));
      
      // 显示成功反馈
      const resultEl = modal.querySelector(".test-result");
      if (resultEl) {
        resultEl.classList.remove("is-hidden", "is-error");
        resultEl.classList.add("is-success");
        resultEl.innerHTML = '<i data-lucide="check-circle"></i><span>保存成功</span>';
        lucide.createIcons();
      }
      
      await loadProviders();
      
      // 延迟关闭弹窗
      setTimeout(() => modal.remove(), 1500);
  } catch (error) {
    const resultEl = modal.querySelector(".test-result");
    if (resultEl) {
      resultEl.classList.remove("is-hidden", "is-success");
      resultEl.classList.add("is-error");
        resultEl.innerHTML = '<i data-lucide="alert-circle"></i><span></span>';
        resultEl.querySelector("span").textContent = error.message || "保存失败";
      lucide.createIcons();
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "保存配置";
    }
  }
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}

window.PL.modules.providers = {
  init: initProviders,
  onShow: () => { if (providersData.length === 0) loadProviders(); }
};
