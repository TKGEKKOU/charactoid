"use strict";

/*
 * CHARACTOID Live2D core controller.
 * Renders a Cubism 2 / Cubism 4 model on a PIXI canvas, drives lip sync
 * from text-derived visemes blended with real-time audio energy
 * (Web Audio AnalyserNode; see viseme.js for the phoneme model).
 *
 * Layout modes:
 *   "stage" — the canvas fills the page; the model is centered, fully
 *             visible, draggable, wheel-zoomable, double-click resets.
 *   "float" — bottom-anchored stage used by the desktop floating window.
 *
 * Public API:
 *   PLLive2D.init(container, canvas, layout)
 *   PLLive2D.show() / PLLive2D.hide()      // keep renderer alive
 *   PLLive2D.setModel(id) / setPreferredModel(id)
 *   PLLive2D.setFlip(bool) / setScale(n) / resetPosition()
 *   PLLive2D.setMotionMode("off" | "auto")
 *   PLLive2D.setGazeFollow(bool)
 *   PLLive2D.setMode("embedded" | "vts")
 *   PLLive2D.setAgentState("thinking" | "idle")
 *   PLLive2D.setVoiceState("listening" | "idle" | "connecting")
 *   PLLive2D.setLipSyncText(text, language?)
 *   PLLive2D.destroy()
 * Events (CustomEvent "charactoid:live2d" on document):
 *   { type: "state", state } | { type: "models", models, current } |
 *   { type: "model", name, id } | { type: "config", ... } |
 *   { type: "status", level, message }
 */
window.PLLive2D = (function () {
  const LS = {
    model: "charactoid:live2d:model",
    flip: "charactoid:live2d:flip",
    scale: "charactoid:live2d:scale",
    mode: "charactoid:live2d:mode",
    posX: "charactoid:live2d:posx",
    posY: "charactoid:live2d:posy",
    motion: "charactoid:live2d:motion",
    gaze: "charactoid:live2d:gaze",
  };

  function readMotionMode() {
    const value = localStorage.getItem(LS.motion);
    return value === "off" || value === "gaze" ? "off" : "auto";
  }

  function readGazeFollow() {
    const stored = localStorage.getItem(LS.gaze);
    if (stored === "1") return true;
    if (stored === "0") return false;
    return localStorage.getItem(LS.motion) === "gaze";
  }

  const LIP_IDS = ["ParamMouthOpenY", "ParamMouthForm"];
  const DEFAULT_MODEL_ID = "sakiko2_vts";

  class Controller {
    constructor() {
      this.app = null;
      this.model = null;
      this.models = [];
      this.currentId = null;
      this.preferredId = null;
      this.container = null;
      this.canvas = null;
      this.layout = "stage";
      this._raf = 0;
      this._ready = false;
      this._visible = false;
      this._talking = false;
      this._dragging = false;

      this.mode = "embedded";
      this.flip = localStorage.getItem(LS.flip) === "1";
      this.scale = parseFloat(localStorage.getItem(LS.scale)) || 1;
      this.agentState = "idle";
      this.voiceState = "idle";

      this.mouth = 0;
      this.mouthForm = 0;
      this._lipText = "";
      this._lipUnits = [];
      this._lipPoses = [];
      this._env = 0;

      this._audioCtx = null;
      this._analyser = null;
      this._source = null;
      this._currentAudio = null;
      this._connected = new WeakSet();
      this._pcmBuf = null;
      this._hasAutoBlink = true;
      this._blinkAt = 0;
      this._blinkAmount = 0;
      this._angleZMotion = window.PLAngleZMotion ? window.PLAngleZMotion.create() : null;
      this._wheelAcc = 0;
      this.motionMode = readMotionMode();
      this.gazeFollow = readGazeFollow();
      this._gazeX = 0;
      this._gazeY = 0;
      this._gazeTX = 0;
      this._gazeTY = 0;
      this._gazeBound = false;
      this._pointerClientX = 0;
      this._pointerClientY = 0;
      this._hasPointer = false;
      this._idleGroup = null;
      this._naturalFrozen = false;
      this._savedBreath = undefined;
      this._savedPhysics = undefined;
      this._savedEyeBlink = undefined;
      this._savedPose = undefined;
      this._savedNaturalMovements = undefined;
      this._savedUpdateFocus = undefined;
      this._savedIdleRequest = undefined;
      this._idleStopped = false;
    }

    /* ---------- lifecycle ---------- */

    async init(container, canvas, layout = "stage") {
      if (this.app) {
        try { this.destroy(); } catch (e) { /* ignore */ }
      }
      this.container = container;
      this.canvas = canvas;
      this.layout = layout === "float" ? "float" : "stage";
      if (!window.PIXI || !window.PIXI.live2d) {
        this._emit({ type: "status", level: "error", message: "Live2D 渲染库未加载" });
        throw new Error("Live2D dependencies missing");
      }
      this.app = new PIXI.Application({
        view: canvas,
        resizeTo: container,
        backgroundAlpha: 0,
        antialias: true,
        autoDensity: true,
        resolution: Math.min(window.devicePixelRatio || 1, 2),
      });
      this.app.renderer.on("resize", () => this._fit());
      this._bindAudioEvents();
      if (this.layout === "stage") this._bindStagePointer();
      this._bindGaze();
      this._visible = true;
      this._startLoop();
      await this.refreshModels();
      if (this.mode === "vts" && this.app) this.app.ticker.stop();
      this._ready = true;
      this._emitState();
    }

    show() {
      this._visible = true;
      if (this.app && this.mode === "embedded") this.app.ticker.start();
      this._startLoop();
      requestAnimationFrame(() => this._fit());
    }

    resize() {
      // 主动同步画布尺寸并重新适配模型（舞台高度拖拽后调用，
      // 不依赖 ResizeObserver 的触发时机）。
      if (!this.app || !this.container) return;
      const w = this.container.clientWidth || 0;
      const h = this.container.clientHeight || 0;
      if (w > 0 && h > 0) {
        this.app.renderer.resize(w, h);
        this._fit();
      }
    }

    hide() {
      this._visible = false;
      this._currentAudio = null;
      if (this._raf) cancelAnimationFrame(this._raf);
      this._raf = 0;
      if (this.app) this.app.ticker.stop();
    }

    destroy() {
      this.hide();
      if (this.model) {
        try {
          this.app.stage.removeChild(this.model);
          this.model.destroy();
        } catch (e) { /* ignore */ }
      }
      if (this.app) {
        try { this.app.destroy(true, { children: true }); } catch (e) { /* ignore */ }
      }
      if (this._audioCtx) {
        try { this._audioCtx.close(); } catch (e) { /* ignore */ }
      }
      this.app = null;
      this.model = null;
      this._ready = false;
    }

    /* ---------- models ---------- */

    async refreshModels(options = {}) {
      const keepCurrent = Boolean(options && options.keepCurrent);
      let list = [];
      try {
        const response = await fetch("/api/live2d/models");
        if (response.ok) list = (await response.json()).models || [];
      } catch (e) { /* offline / not ready */ }
      this.models = list;
      const saved = localStorage.getItem(LS.model);
      const usable = (model) => model && model.compatible !== false;
      const byId = (id) => list.find((m) => m.id === id && usable(m));
      const target = (keepCurrent ? byId(this.currentId) : null)
        || byId(this.preferredId)
        || byId(this.currentId)
        || byId(DEFAULT_MODEL_ID)
        || byId(saved)
        || list.find(usable) || null;
      if (target) {
        if (target.id !== this.currentId) await this.loadModel(target.id);
      } else {
        this._emit({ type: "status", level: "warn", message: "未找到 Live2D 模型，请将模型放入 data/live2d/" });
      }
      this._emit({ type: "models", models: list, current: target ? target.id : this.currentId });
      return list;
    }

    async loadModel(id, options = {}) {
      const entry = this.models.find((m) => m.id === id);
      if (!entry || !this.app) return;
      if (entry.compatible === false) {
        this._emit({ type: "status", level: "error", message: `模型 ${entry.name} 使用 MOC3 v${entry.moc_version}，当前内嵌运行库最高支持 MOC3 v6（Cubism 5.3）` });
        return;
      }
      this._emit({ type: "status", level: "info", message: "正在加载模型…" });
      const url = "/live2d-assets/" + entry.entry;
      let next;
      try {
        next = await window.PIXI.live2d.Live2DModel.from(url, { autoInteract: false });
      } catch (e) {
        this._emit({ type: "status", level: "error", message: "模型加载失败：" + (e && e.message ? e.message : e) });
        return;
      }
      if (this.model) {
        try {
          this.app.stage.removeChild(this.model);
          this.model.destroy();
        } catch (e) { /* ignore */ }
      }
      this.model = next;
      this.app.stage.addChild(next);
      next.on("hit", (areas) => {
        if (this._isFrozen()) return;
        if (Array.isArray(areas) && areas.some((a) => String(a).toLowerCase().includes("body"))) {
          try { next.motion("TapBody"); } catch (e) { /* no tap motion */ }
        }
      });
      this._fit();
      this.currentId = entry.id;
      if (options && options.persist) localStorage.setItem(LS.model, entry.id);
      this._detectAutoBlink();
      this._resetNaturalMotionCache();
      if (this._angleZMotion) this._angleZMotion.reset(performance.now());
      this._installModelHooks();
      this._hideWatermark();
      this._syncIdle();
      this._emit({ type: "model", name: this._displayName(entry), id: entry.id });
      this._emit({ type: "status", level: "ok", message: this._displayName(entry) });
    }

    setModel(id) {
      if (id && id !== this.currentId) this.loadModel(id, { persist: false });
    }

    setPreferredModel(id) {
      this.preferredId = id || null;
      if (id) localStorage.setItem(LS.model, id);
      if (id && this._ready && id !== this.currentId) this.loadModel(id, { persist: true });
    }

    _detectAutoBlink() {
      this._hasAutoBlink = true;
      try {
        const settings = this.model.internalModel.settings;
        const groups = (settings && settings.Groups) || [];
        const eye = groups.find((group) => group.Name === "EyeBlink");
        this._hasAutoBlink = Boolean(eye && Array.isArray(eye.Ids) && eye.Ids.length > 0);
      } catch (e) {
        this._hasAutoBlink = true;
      }
      this._blinkAt = performance.now() + 1800 + Math.random() * 2600;
      this._blinkAmount = 0;
    }

    _displayName(entry) {
      const base = entry.entry.split("/").pop() || entry.id;
      return base.replace(/\.model3?\.json$/i, "") || entry.id;
    }

    /* ---------- transform (stage vs float) ---------- */

    _fit() {
      if (!this.model || !this.app) return;
      const w = this.app.renderer.width || (this.container && this.container.clientWidth) || 300;
      const h = this.app.renderer.height || (this.container && this.container.clientHeight) || 400;
      // 使用模型固有尺寸（internalModel 不受缩放影响），避免 scale 反馈环导致
      // 只能在两个固定大小间振荡。
      const internal = this.model.internalModel || {};
      const bw = internal.width || this.model.width || 1;
      const bh = internal.height || this.model.height || 1;
      if (this.layout === "stage") {
        const target = Math.min((w * 0.9) / bw, (h * 0.88) / bh) * this.scale;
        this.model.anchor.set(0.5, 0.5);
        this.model.scale.set(target * (this.flip ? -1 : 1), target);
        const storedX = parseFloat(localStorage.getItem(LS.posX));
        const storedY = parseFloat(localStorage.getItem(LS.posY));
        if (Number.isFinite(storedX) && Number.isFinite(storedY)) {
          this.model.x = storedX * w;
          this.model.y = storedY * h;
        } else {
          this.model.x = w / 2;
          this.model.y = h * 0.52;
        }
      } else {
        const target = Math.min((w * 0.92) / bw, (h * 0.84) / bh) * this.scale;
        this.model.anchor.set(0.5, 1);
        this.model.scale.set(target * (this.flip ? -1 : 1), target);
        this.model.x = w / 2;
        this.model.y = h;
      }
    }

    _bindStagePointer() {
      const canvas = this.canvas;
      if (!canvas) return;
      let startX = 0;
      let startY = 0;
      let baseX = 0;
      let baseY = 0;
      canvas.addEventListener("pointerdown", (event) => {
        if (!this.model) return;
        this._dragging = true;
        try { canvas.setPointerCapture(event.pointerId); } catch (e) { /* ignore */ }
        startX = event.clientX;
        startY = event.clientY;
        baseX = this.model.x;
        baseY = this.model.y;
        canvas.style.cursor = "grabbing";
      });
      canvas.addEventListener("pointermove", (event) => {
        if (!this._dragging || !this.model) return;
        this.model.x = baseX + (event.clientX - startX);
        this.model.y = baseY + (event.clientY - startY);
        this._savePosition();
      });
      const endDrag = () => {
        this._dragging = false;
        canvas.style.cursor = "grab";
      };
      canvas.addEventListener("pointerup", endDrag);
      canvas.addEventListener("pointercancel", endDrag);
      canvas.addEventListener("wheel", (event) => {
        event.preventDefault();
        // 低灵敏度：累积滚轮位移，达到阈值才缩放一次
        this._wheelAcc += event.deltaY;
        if (Math.abs(this._wheelAcc) >= 60) {
          this.setScale(this._wheelAcc > 0 ? -0.06 : 0.06);
          this._wheelAcc = 0;
        }
      }, { passive: false });
      canvas.addEventListener("dblclick", () => this.resetPosition());
      canvas.style.cursor = "grab";
    }

    _bindGaze() {
      if (this._gazeBound) return;
      this._gazeBound = true;
      window.addEventListener("pointermove", (event) => {
        this._pointerClientX = event.clientX;
        this._pointerClientY = event.clientY;
        this._hasPointer = true;
      }, { passive: true });
    }


    _updateGazeTarget() {
      if (!this._hasPointer || !this.model || !this.canvas) return;
      const rect = this.canvas.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const screen = this.app && this.app.screen;
      const worldW = Math.max((screen && screen.width) || rect.width, 1);
      const worldH = Math.max((screen && screen.height) || rect.height, 1);
      const scaleX = rect.width / worldW;
      const scaleY = rect.height / worldH;
      let headX = rect.left + this.model.x * scaleX;
      let headY = rect.top + this.model.y * scaleY;
      try {
        const bounds = this.model.getBounds();
        headX = rect.left + (bounds.x + bounds.width * 0.5) * scaleX;
        headY = rect.top + (bounds.y + bounds.height * 0.18) * scaleY;
      } catch (e) {
        headY -= Math.min(rect.height, 320) * 0.16;
      }
      const dx = this._pointerClientX - headX;
      const dy = this._pointerClientY - headY;
      const span = 140;
      this._gazeTX = Math.max(-1, Math.min(1, dx / span));
      this._gazeTY = Math.max(-1, Math.min(1, dy / span));
    }

    _motionManager() {
      return this.model && this.model.internalModel && this.model.internalModel.motionManager;
    }

    _internalModel() {
      return this.model && this.model.internalModel;
    }

    _resetNaturalMotionCache() {
      this._idleGroup = null;
      this._naturalFrozen = false;
      this._savedBreath = undefined;
      this._savedPhysics = undefined;
      this._savedEyeBlink = undefined;
      this._savedPose = undefined;
      this._savedNaturalMovements = undefined;
      this._savedUpdateFocus = undefined;
      this._savedIdleRequest = undefined;
      this._idleStopped = false;
    }


    _isFrozen() {
      return this.motionMode === "off" && !this.gazeFollow;
    }

    _wantsIdle() {
      return this.motionMode === "auto";
    }

    _installModelHooks() {
      const model = this.model;
      const internal = this._internalModel();
      const self = this;
      if (model && !model._charactoidRenderHooked && typeof model._render === "function") {
        model._charactoidRenderHooked = true;
        const originalRender = model._render.bind(model);
        model._render = function (renderer) {
          if (self._isFrozen()) {
            this.deltaTime = 0;
            self._holdStillFrame();
          }
          originalRender(renderer);
        };
      }
      if (model && !model._charactoidTickerHooked && typeof model.onTickerUpdate === "function") {
        model._charactoidTickerHooked = true;
        const originalTicker = model.onTickerUpdate.bind(model);
        model.onTickerUpdate = function () {
          if (self._isFrozen()) {
            this.deltaTime = 0;
            return;
          }
          originalTicker();
        };
      }
      if (model && !model._charactoidUpdateHooked && typeof model.update === "function") {
        model._charactoidUpdateHooked = true;
        const originalUpdate = model.update.bind(model);
        model.update = function (dt) {
          if (self._isFrozen()) {
            this.deltaTime = 0;
            return;
          }
          originalUpdate(dt);
        };
      }
      if (internal && !internal._charactoidNaturalHooked && typeof internal.updateNaturalMovements === "function") {
        internal._charactoidNaturalHooked = true;
        const originalNatural = internal.updateNaturalMovements.bind(internal);
        internal.updateNaturalMovements = function (dt, now) {
          if (!self._wantsIdle()) return;
          originalNatural(dt, now);
        };
      }
      if (internal && !internal._charactoidFocusHooked && typeof internal.updateFocus === "function") {
        internal._charactoidFocusHooked = true;
        const originalFocus = internal.updateFocus.bind(internal);
        internal.updateFocus = function () {
          if (!self._wantsIdle() || self.gazeFollow) return;
          originalFocus();
        };
      }
      if (!internal || internal._charactoidHooked) return;
      internal._charactoidHooked = true;
      const original = internal.update.bind(internal);
      internal.update = function (dt, now) {
        if (self._isFrozen()) {
          self._holdStillFrame();
          return;
        }
        if (self._wantsIdle()) self._restoreNaturalMotion(internal);
        else self._disableIdle();
        if (self._wantsIdle()) self._enableIdle();
        original(dt, now);
        if (self._wantsIdle()) self._applyLife();
        if (self.gazeFollow) self._applyGaze();
        else self._applyBlinkFallback();
        self._applyParams(self.mouth, self.mouthForm);
        self._flushCore();
      };
    }


    _freezeNaturalMotion(internal) {
      if (!internal) return;
      if (!this._naturalFrozen) {
        this._savedBreath = internal.breath;
        this._savedPhysics = internal.physics;
        this._savedEyeBlink = internal.eyeBlink;
        this._savedPose = internal.pose;
        this._naturalFrozen = true;
      }
      internal.breath = null;
      internal.physics = null;
      internal.eyeBlink = null;
      internal.pose = null;
      try {
        if (internal.focusController && typeof internal.focusController.focus === "function") {
          internal.focusController.focus(0, 0, true);
        }
      } catch (e) { /* ignore */ }
    }


    _restoreNaturalMotion(internal) {
      if (!internal || !this._naturalFrozen) return;
      if (this._savedBreath !== undefined) internal.breath = this._savedBreath;
      if (this._savedPhysics !== undefined) internal.physics = this._savedPhysics;
      if (this._savedEyeBlink !== undefined) internal.eyeBlink = this._savedEyeBlink;
      if (this._savedPose !== undefined) internal.pose = this._savedPose;
      this._savedBreath = undefined;
      this._savedPhysics = undefined;
      this._savedEyeBlink = undefined;
      this._savedPose = undefined;
      this._naturalFrozen = false;
    }

    _holdStillFrame() {
      if (this.model) this.model.deltaTime = 0;
      this._disableIdle();
      this._freezeNaturalMotion(this._internalModel());
      this._applyDefaultPose();
      this._holdNeutralPose();
      this._applyParams(this.mouth, this.mouthForm);
      this._flushCore();
    }

    _disableIdle() {
      const manager = this._motionManager();
      if (!manager) return;
      if (!this._idleGroup && manager.groups && manager.groups.idle) {
        this._idleGroup = manager.groups.idle;
      }
      try { if (typeof manager.stopAllMotions === "function") manager.stopAllMotions(); } catch (e) { /* ignore */ }
      this._idleStopped = true;
      if (manager.groups) manager.groups.idle = "";
      if (manager.state) {
        if (this._savedIdleRequest === undefined) this._savedIdleRequest = manager.state.shouldRequestIdleMotion;
        manager.state.shouldRequestIdleMotion = function () { return false; };
        manager.state.reservedIdleGroup = undefined;
        manager.state.reservedIdleIndex = undefined;
      }
    }

    _enableIdle() {
      const wasStopped = this._idleStopped;
      this._idleStopped = false;
      const manager = this._motionManager();
      if (!manager) return;
      if (manager.groups) manager.groups.idle = this._idleGroup || manager.groups.idle || "Idle";
      if (manager.state && this._savedIdleRequest !== undefined) {
        manager.state.shouldRequestIdleMotion = this._savedIdleRequest;
        this._savedIdleRequest = undefined;
      }
      if (wasStopped && this.model && typeof this.model.motion === "function") {
        try { this.model.motion("Idle"); } catch (e) { /* no idle motion */ }
      }
    }

    _flushCore() {
      const core = this.model && this.model.internalModel && this.model.internalModel.coreModel;
      if (!core) return;
      try { if (typeof core.update === "function") core.update(); } catch (e) { /* ignore */ }
    }

    _holdNeutralPose() {
      const core = this.model && this.model.internalModel && this.model.internalModel.coreModel;
      if (!core) return;
      this._gazeTX = 0;
      this._gazeTY = 0;
      this._gazeX = 0;
      this._gazeY = 0;
      [
        ["ParamAngleX", 0], ["PARAM_ANGLE_X", 0],
        ["ParamAngleY", 0], ["PARAM_ANGLE_Y", 0],
        ["ParamAngleZ", 0], ["PARAM_ANGLE_Z", 0],
        ["ParamBodyAngleX", 0], ["PARAM_BODY_ANGLE_X", 0],
        ["ParamEyeBallX", 0], ["PARAM_EYE_BALL_X", 0],
        ["ParamEyeBallY", 0], ["PARAM_EYE_BALL_Y", 0],
        ["ParamBreath", 0.5], ["PARAM_BREATH", 0.5],
      ].forEach(([id, value]) => this._setParameter(core, id, value));
    }

    _paramCount(core) {
      if (!core) return 0;
      if (typeof core.getParameterCount === "function") return core.getParameterCount();
      if (core._model && core._model.parameters && Number.isFinite(core._model.parameters.count)) {
        return core._model.parameters.count;
      }
      if (typeof core.getParamCount === "function") return core.getParamCount();
      return 0;
    }

    _paramDefault(core, index) {
      if (typeof core.getParameterDefaultValue === "function") {
        const value = core.getParameterDefaultValue(index);
        if (Number.isFinite(value)) return value;
      }
      const parameters = core._model && core._model.parameters;
      if (parameters && parameters.defaultValues && Number.isFinite(parameters.defaultValues[index])) {
        return parameters.defaultValues[index];
      }
      if (typeof core.getParamDefault === "function") {
        const value = core.getParamDefault(index);
        if (Number.isFinite(value)) return value;
      }
      return 0;
    }

    _setParamByIndex(core, index, value) {
      try {
        if (typeof core.setParameterValueByIndex === "function") core.setParameterValueByIndex(index, value);
        else if (typeof core.setParamFloat === "function") core.setParamFloat(index, value);
        else if (core._model && core._model.parameters && core._model.parameters.values) {
          core._model.parameters.values[index] = value;
        }
      } catch (e) { /* parameter missing */ }
    }

    _applyDefaultPose() {
      const core = this.model && this.model.internalModel && this.model.internalModel.coreModel;
      if (!core) return;
      const count = this._paramCount(core);
      for (let i = 0; i < count; i += 1) this._setParamByIndex(core, i, this._paramDefault(core, i));
      this._hideWatermark();
    }

    _hideWatermark() {
      const core = this.model && this.model.internalModel && this.model.internalModel.coreModel;
      if (!core) return;
      this._setParameter(core, 'Param137', 1);
    }

    _syncIdle() {
      const frozen = this._isFrozen();
      if (this.model) {
        this.model.autoUpdate = !frozen;
        if (frozen) this.model.deltaTime = 0;
      }
      if (frozen) {
        this._holdStillFrame();
        return;
      }
      this._restoreNaturalMotion(this._internalModel());
      if (this._wantsIdle()) this._enableIdle();
      else this._disableIdle();
    }


    _savePosition() {
      if (!this.model || !this.app || !Number.isFinite(this.model.x) || !Number.isFinite(this.model.y)) return;
      const w = this.app.renderer.width || 1;
      const h = this.app.renderer.height || 1;
      localStorage.setItem(LS.posX, String(this.model.x / w));
      localStorage.setItem(LS.posY, String(this.model.y / h));
    }

    resetPosition() {
      localStorage.removeItem(LS.posX);
      localStorage.removeItem(LS.posY);
      this.scale = 1;
      localStorage.setItem(LS.scale, "1");
      this._fit();
      this._emit({ type: "config", flip: this.flip, scale: this.scale, mode: this.mode });
    }

    setFlip(flip) {
      this.flip = Boolean(flip);
      localStorage.setItem(LS.flip, this.flip ? "1" : "0");
      if (this.model) this.model.scale.x = Math.abs(this.model.scale.x) * (this.flip ? -1 : 1);
      this._emit({ type: "config", flip: this.flip, scale: this.scale, mode: this.mode });
    }

    setScale(deltaOrValue) {
      if (typeof deltaOrValue === "number" && Math.abs(deltaOrValue) <= 1) {
        this.scale = Math.max(0.3, Math.min(3, this.scale + deltaOrValue));
      } else if (typeof deltaOrValue === "number") {
        this.scale = Math.max(0.3, Math.min(3, deltaOrValue));
      }
      localStorage.setItem(LS.scale, String(this.scale));
      this._fit();
      this._emit({ type: "config", flip: this.flip, scale: this.scale, mode: this.mode });
    }

    setMotionMode(mode) {
      if (mode !== "off" && mode !== "auto") return;
      const previous = this.motionMode;
      this.motionMode = mode;
      localStorage.setItem(LS.motion, mode);
      if (mode === "off") this._idleStopped = true;
      else if (previous === "off") this._idleStopped = true;
      if (mode === "auto" && this._angleZMotion) this._angleZMotion.reset(performance.now());
      this._syncIdle();
      this._emit({ type: "motion", mode: this.motionMode, gaze: this.gazeFollow });
    }

    setGazeFollow(enabled) {
      const next = Boolean(enabled);
      this.gazeFollow = next;
      localStorage.setItem(LS.gaze, next ? "1" : "0");
      if (!next) {
        this._gazeTX = 0;
        this._gazeTY = 0;
        this._gazeX = 0;
        this._gazeY = 0;
      }
      this._syncIdle();
      this._emit({ type: "motion", mode: this.motionMode, gaze: this.gazeFollow });
    }

    setMode(mode) {
      if (mode !== "embedded" && mode !== "vts") return;
      this.mode = mode;
      if (this._angleZMotion) this._angleZMotion.reset(performance.now());
      if (this.app) {
        if (mode === "vts") this.app.ticker.stop();
        else if (this._visible) this.app.ticker.start();
      }
      if (mode === "vts" && window.PLVTS) window.PLVTS.connect();
      this._emit({ type: "config", flip: this.flip, scale: this.scale, mode: this.mode });
      this._emitState();
    }

    /* ---------- state ---------- */

    setAgentState(state) {
      this.agentState = state === "thinking" ? "thinking" : "idle";
      this._emitState();
    }

    setVoiceState(state) {
      this.voiceState = state === "listening" || state === "speaking" ? "listening"
        : state === "connecting" ? "connecting" : "idle";
      this._emitState();
    }

    _getState() {
      if (this._talking) return "talking";
      if (this.voiceState === "listening") return "listening";
      if (this.agentState === "thinking") return "thinking";
      if (this.voiceState === "connecting") return "connecting";
      return "idle";
    }

    _emitState() {
      this._emit({ type: "state", state: this._getState() });
    }

    /* ---------- volume / lip sync ---------- */

    _ensureAudio() {
      if (this._audioCtx) return;
      try {
        const Ctx = window.AudioContext || window.webkitAudioContext;
        this._audioCtx = new Ctx();
        if (this._audioCtx.state === "suspended") {
          this._audioCtx.resume().catch(() => {});
        }
        this._analyser = this._audioCtx.createAnalyser();
        this._analyser.fftSize = 1024;
        this._analyser.smoothingTimeConstant = 0.4;
        this._pcmBuf = new Float32Array(this._analyser.fftSize);
      } catch (e) { /* audio blocked until user gesture */ }
    }

    _attachAudio(audio) {
      if (!audio) return;
      if (!this._connected.has(audio)) {
        this._ensureAudio();
        if (this._audioCtx) {
          if (this._audioCtx.state === "suspended") {
            this._audioCtx.resume().catch(() => {});
          }
          try {
            const source = this._audioCtx.createMediaElementSource(audio);
            source.connect(this._analyser);
            this._analyser.connect(this._audioCtx.destination);
            this._source = source;
            this._connected.add(audio);
          } catch (e) { /* element already routed or unsupported */ }
        }
      }
      this._currentAudio = audio;
      this.setLipSyncText((audio.dataset && audio.dataset.lipText) || "");
      const allocate = () => this._allocateLipPoses();
      if (audio.duration && isFinite(audio.duration)) {
        allocate();
      } else {
        audio.addEventListener("loadedmetadata", allocate, { once: true });
        audio.addEventListener("durationchange", allocate, { once: true });
      }
    }

    _bindAudioEvents() {
      const resumeAudio = () => {
        this._ensureAudio();
        if (this._audioCtx && this._audioCtx.state === "suspended") {
          this._audioCtx.resume().catch(() => {});
        }
        if (window.PL && window.PL.unlockAudio) window.PL.unlockAudio();
      };
      ["pointerdown", "keydown", "touchstart", "click"].forEach((type) => {
        document.addEventListener(type, resumeAudio, { once: true, capture: true });
      });
      document.addEventListener("play", (event) => {
        const el = event.target;
        if (el && el.tagName === "AUDIO") this._attachAudio(el);
      }, true);
      const detach = () => { this._currentAudio = null; };
      document.addEventListener("pause", (event) => {
        if (event.target && event.target.tagName === "AUDIO") detach();
      }, true);
      document.addEventListener("ended", (event) => {
        if (event.target && event.target.tagName === "AUDIO") detach();
      }, true);
    }

    _startLoop() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => this._tick());
    }

    _tick() {
      if (!this._visible) return;
      this._raf = requestAnimationFrame(() => this._tick());
      let rms = 0;
      let peak = 0;
      if (this._analyser && this._currentAudio && !this._currentAudio.paused) {
        try {
          this._analyser.getFloatTimeDomainData(this._pcmBuf);
          let sum = 0;
          for (let i = 0; i < this._pcmBuf.length; i += 1) {
            const value = this._pcmBuf[i];
            sum += value * value;
            const magnitude = Math.abs(value);
            if (magnitude > peak) peak = magnitude;
          }
          rms = Math.sqrt(sum / this._pcmBuf.length);
        } catch (e) { /* analyser not ready */ }
      }
      // Peak-ish energy envelope (BandoriPet-style), decaying each frame.
      this._env = Math.max(this._env * 0.74, Math.min(Math.max(rms * 4.0, peak * 0.35), 0.7));
      const playing = this._currentAudio && !this._currentAudio.paused;
      let target;
      let formTarget;
      if (playing && this._lipPoses.length && window.PLViseme) {
        const pose = window.PLViseme.probePose(this._lipPoses, this._currentAudio.currentTime);
        const blended = window.PLViseme.computeMouth(this._env, pose.open, pose.form);
        target = blended.open;
        formTarget = blended.form;
      } else {
        target = Math.min(1, this._env * 3.4);
        formTarget = target * 0.6;
      }
      const delta = target - this.mouth;
      this.mouth += delta * (delta > 0 ? 0.46 : 0.16); // fast open, slower close
      const formDelta = formTarget - this.mouthForm;
      this.mouthForm += formDelta * 0.45;
      const open = Math.max(0, Math.min(1, this.mouth));
      const form = Math.max(-1, Math.min(1, this.mouthForm));
      this._vtsSend(open, form);
      const talking = open > 0.035;
      if (talking !== this._talking) {
        this._talking = talking;
        this._emitState();
      }
      if (this._isFrozen()) this._holdStillFrame();
    }

    setLipSyncText(text, language) {
      this._lipText = String(text || "");
      this._lipUnits = window.PLViseme
        ? window.PLViseme.estimateVisemeUnits(this._lipText, language || "")
        : [];
      this._allocateLipPoses();
    }

    _allocateLipPoses() {
      if (!this._lipUnits || !this._lipUnits.length || !this._currentAudio) {
        this._lipPoses = [];
        return;
      }
      const duration = this._currentAudio.duration;
      if (!duration || !isFinite(duration)) {
        this._lipPoses = [];
        return;
      }
      this._lipPoses = window.PLViseme
        ? window.PLViseme.allocatePoses(this._lipUnits, duration)
        : [];
    }


    _applyParams(open, form) {
      if (!this.model || !this.model.internalModel || !this.model.internalModel.coreModel) return;
      const core = this.model.internalModel.coreModel;
      this._setParameter(core, "ParamMouthOpenY", open);
      this._setParameter(core, "ParamMouthForm", form);
    }

    _paramAliases(id) {
      const map = {
        ParamAngleX: "PARAM_ANGLE_X",
        ParamAngleY: "PARAM_ANGLE_Y",
        ParamAngleZ: "PARAM_ANGLE_Z",
        ParamBodyAngleX: "PARAM_BODY_ANGLE_X",
        ParamBodyAngleY: "PARAM_BODY_ANGLE_Y",
        ParamBodyAngleZ: "PARAM_BODY_ANGLE_Z",
        ParamBustX: "PARAM_BUST_X",
        ParamBustY: "PARAM_BUST_Y",
        ParamEyeBallX: "PARAM_EYE_BALL_X",
        ParamEyeBallY: "PARAM_EYE_BALL_Y",
        ParamEyeLOpen: "PARAM_EYE_L_OPEN",
        ParamEyeROpen: "PARAM_EYE_R_OPEN",
        ParamMouthOpenY: "PARAM_MOUTH_OPEN_Y",
        ParamMouthForm: "PARAM_MOUTH_FORM",
        ParamBreath: "PARAM_BREATH",
      };
      const alt = map[id];
      return alt ? [id, alt] : [id];
    }

    _paramRange(core, id, fallback) {
      const fallbackMin = fallback[0];
      const fallbackMax = fallback[1];
      const getIndex = typeof core.getParameterIndex === "function"
        ? core.getParameterIndex.bind(core)
        : typeof core.getParamIndex === "function" ? core.getParamIndex.bind(core) : null;
      for (const name of this._paramAliases(id)) {
        try {
          const index = getIndex ? getIndex(name) : -1;
          if (index < 0) continue;
          let minimum;
          let maximum;
          if (typeof core.getParameterMinimumValue === "function") minimum = core.getParameterMinimumValue(index);
          if (typeof core.getParameterMaximumValue === "function") maximum = core.getParameterMaximumValue(index);
          const parameters = core._model && core._model.parameters;
          if (!Number.isFinite(minimum) && parameters && parameters.minimumValues) minimum = parameters.minimumValues[index];
          if (!Number.isFinite(maximum) && parameters && parameters.maximumValues) maximum = parameters.maximumValues[index];
          if (Number.isFinite(minimum) && Number.isFinite(maximum) && minimum < maximum) return [minimum, maximum];
        } catch (e) { /* try alias */ }
      }
      return [fallbackMin, fallbackMax];
    }

    _angleZRange(core) {
      return this._paramRange(core, "ParamAngleZ", [-30, 30]);
    }

    _lerp(from, to, amount) {
      return from + (to - from) * amount;
    }


    _setParameter(core, id, value) {
      for (const name of this._paramAliases(id)) {
        try {
          if (typeof core.setParameterValueById === "function") {
            core.setParameterValueById(name, value);
            return;
          }
          if (typeof core.getParamIndex === "function") {
            const index = core.getParamIndex(name);
            if (index >= 0) {
              core.setParamFloat(index, value);
              return;
            }
          }
        } catch (e) { /* try alias */ }
      }
    }

    _applyGaze() {
      if (!this.model) return;
      const core = this.model.internalModel && this.model.internalModel.coreModel;
      if (!core) return;
      this._updateGazeTarget();
      this._gazeX = this._lerp(this._gazeX, this._gazeTX, 0.22);
      this._gazeY = this._lerp(this._gazeY, this._gazeTY, 0.22);
      const [minX, maxX] = this._paramRange(core, "ParamAngleX", [-30, 30]);
      const [minY, maxY] = this._paramRange(core, "ParamAngleY", [-30, 30]);
      const [minEyeX, maxEyeX] = this._paramRange(core, "ParamEyeBallX", [-1, 1]);
      const [minEyeY, maxEyeY] = this._paramRange(core, "ParamEyeBallY", [-1, 1]);
      const headScale = this._wantsIdle() ? 0.18 : 0.26;
      this._setParameter(core, "ParamAngleX", this._gazeX * Math.max(Math.abs(minX), Math.abs(maxX)) * headScale);
      this._setParameter(core, "ParamAngleY", -this._gazeY * Math.max(Math.abs(minY), Math.abs(maxY)) * headScale);
      if (!this._wantsIdle()) {
        const [minZ, maxZ] = this._angleZRange(core);
        this._setParameter(core, "ParamAngleZ", this._gazeX * Math.max(Math.abs(minZ), Math.abs(maxZ)) * 0.12);
      }
      this._setParameter(core, "ParamEyeBallX", this._gazeX * Math.max(Math.abs(minEyeX), Math.abs(maxEyeX)));
      this._setParameter(core, "ParamEyeBallY", -this._gazeY * Math.max(Math.abs(minEyeY), Math.abs(maxEyeY)));
      this._applyBlinkFallback();
    }

    _idleWave(seconds, speed, phase) {
      return Math.sin(seconds * speed + phase);
    }

    _applyLife() {
      if (!this.model || !this._wantsIdle() || this.mode === "vts") return;
      const core = this.model.internalModel && this.model.internalModel.coreModel;
      if (!core) return;
      const now = performance.now();
      const seconds = now / 1000;
      const activity = this.agentState === "thinking" ? 1.2 : this._talking ? 0.78 : 1;
      if (this._angleZMotion) {
        const [minimum, maximum] = this._angleZRange(core);
        this._setParameter(core, "ParamAngleZ", this._angleZMotion.sample(now, minimum, maximum));
      }
      if (!this.gazeFollow) {
        const [minX, maxX] = this._paramRange(core, "ParamAngleX", [-30, 30]);
        const [minY, maxY] = this._paramRange(core, "ParamAngleY", [-30, 30]);
        const angleX = (this._idleWave(seconds, 0.72, 0) * 0.62 + this._idleWave(seconds, 0.21, 1.4) * 0.38);
        const angleY = (this._idleWave(seconds, 0.43, 0.8) * 0.7 + this._idleWave(seconds, 0.17, 2.1) * 0.3);
        this._setParameter(core, "ParamAngleX", angleX * Math.max(Math.abs(minX), Math.abs(maxX)) * 0.48 * activity);
        this._setParameter(core, "ParamAngleY", angleY * Math.max(Math.abs(minY), Math.abs(maxY)) * 0.22 * activity);
      }
      const [minBX, maxBX] = this._paramRange(core, "ParamBodyAngleX", [-10, 10]);
      const [minBY, maxBY] = this._paramRange(core, "ParamBodyAngleY", [-10, 10]);
      const [minBZ, maxBZ] = this._paramRange(core, "ParamBodyAngleZ", [-10, 10]);
      const bodyX = this._idleWave(seconds, 0.55, 0.2) * 0.58 + this._idleWave(seconds, 0.19, 1.7) * 0.42;
      const bodyY = this._idleWave(seconds, 0.34, 0.6);
      const bodyZ = this._idleWave(seconds, 0.48, 1.1);
      this._setParameter(core, "ParamBodyAngleX", bodyX * Math.max(Math.abs(minBX), Math.abs(maxBX)) * 0.86 * activity);
      this._setParameter(core, "ParamBodyAngleY", bodyY * Math.max(Math.abs(minBY), Math.abs(maxBY)) * 0.36 * activity);
      this._setParameter(core, "ParamBodyAngleZ", bodyZ * Math.max(Math.abs(minBZ), Math.abs(maxBZ)) * 0.32 * activity);
      this._setParameter(core, "ParamBreath", 0.5 + 0.42 * this._idleWave(seconds, 0.45, 0));
      this._setParameter(core, "ParamBustX", this._idleWave(seconds, 0.9, 0.3) * 0.38 * activity);
      this._setParameter(core, "ParamBustY", this._idleWave(seconds, 1.05, 1.2) * 0.28 * activity);
    }

    _applyBlinkFallback() {
      if (this._hasAutoBlink || this._isFrozen()) return;
      const core = this.model && this.model.internalModel && this.model.internalModel.coreModel;
      if (!core) return;
      const now = performance.now();
      if (now >= this._blinkAt) {
        this._blinkAmount = 0.999;
        this._blinkAt = now + 2200 + Math.random() * 3400;
      }
      if (this._blinkAmount > 0) {
        this._blinkAmount *= 0.78;
        if (this._blinkAmount < 0.012) this._blinkAmount = 0;
      }
      const eyeOpen = 1 - this._blinkAmount;
      this._setParameter(core, "ParamEyeLOpen", eyeOpen);
      this._setParameter(core, "ParamEyeROpen", eyeOpen);
    }

    _vtsSend(open, form) {
      if (this.mode !== "vts" || !window.PLVTS || !window.PLVTS.connected) return;
      window.PLVTS.setMouth(open, form, this._getState());
    }

    /* ---------- events ---------- */

    _emit(payload) {
      document.dispatchEvent(new CustomEvent("charactoid:live2d", { detail: payload }));
    }
  }

  return new Controller();
})();
