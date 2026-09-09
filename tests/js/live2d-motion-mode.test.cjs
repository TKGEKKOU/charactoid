const fs = require("fs");
const vm = require("vm");
const assert = require("assert");

function loadController() {
  const sandbox = {
    window: {},
    localStorage: {
      store: {},
      getItem(key) { return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null; },
      setItem(key, value) { this.store[key] = String(value); },
    },
    document: { addEventListener() {}, dispatchEvent() {} },
    CustomEvent: class { constructor(type, init) { this.type = type; this.detail = init && init.detail; } },
    performance: { now: () => 0 },
    requestAnimationFrame: () => 1,
    cancelAnimationFrame() {},
    Math,
    console,
  };
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync("static/live2d/live2d-core.js", "utf8"), sandbox);
  return sandbox.window.PLLive2D;
}

const controller = loadController();
const calls = { natural: 0, focus: 0, internal: 0, ticker: 0, update: 0, idle: 0 };

controller.model = {
  autoUpdate: true,
  deltaTime: 16,
  elapsedTime: 0,
  onTickerUpdate() { this.update(16); calls.ticker += 1; },
  update(dt) { this.deltaTime += dt; this.elapsedTime += dt; calls.update += 1; },
  _render() {},
  motion() { calls.idle += 1; },
  internalModel: {
    motionManager: {
      groups: { idle: "Idle" },
      state: { shouldRequestIdleMotion() { return true; } },
      stopAllMotions() {},
    },
    breath: { id: "breath" },
    physics: { id: "physics" },
    eyeBlink: { id: "blink" },
    pose: { id: "pose" },
    update() { calls.internal += 1; },
    updateNaturalMovements() { calls.natural += 1; },
    updateFocus() { calls.focus += 1; },
    coreModel: {
      getParameterCount: () => 0,
      setParameterValueById() {},
      update() {},
    },
  },
};

controller._installModelHooks();
controller.setMotionMode("off");
controller.setGazeFollow(false);
assert.strictEqual(controller.model.autoUpdate, false, "off mode must detach the Live2D ticker");
controller.model.onTickerUpdate();
controller.model.update(16);
controller.model.internalModel.updateNaturalMovements(16, 1000);
assert.strictEqual(calls.ticker, 0, "off mode must ignore ticker-driven motion");
assert.strictEqual(calls.update, 0, "off mode must not accumulate model time");
assert.strictEqual(calls.natural, 0, "off mode must not run idle sway");

controller.setMotionMode("auto");
assert.strictEqual(controller.gazeFollow, false, "auto/off must not change gaze follow");
assert.strictEqual(controller.model.autoUpdate, true, "auto mode must reattach the Live2D ticker");
controller.model.internalModel.updateNaturalMovements(16, 1000);
controller.model.internalModel.updateFocus();
assert.strictEqual(calls.natural, 1, "auto mode keeps built-in idle sway");
assert.strictEqual(calls.focus, 1, "auto mode keeps idle look-around");

controller.setGazeFollow(true);
assert.strictEqual(controller.motionMode, "auto", "gaze is independent of auto/off");
controller.model.internalModel.updateFocus();
assert.strictEqual(calls.focus, 1, "gaze follow disables idle look-around");

controller.setMotionMode("off");
assert.strictEqual(controller.gazeFollow, true, "switching auto/off must keep gaze follow");
assert.strictEqual(controller._isFrozen(), false, "off + gaze still needs updates to look at the pointer");
assert.strictEqual(controller.model.autoUpdate, true, "off + gaze must keep the ticker for gaze");

const html = fs.readFileSync("static/views/chat.html", "utf8");
const autoAt = html.indexOf('data-live2d-motion="auto"');
const offAt = html.indexOf('data-live2d-motion="off"');
assert.ok(autoAt >= 0 && autoAt < offAt, "the motion menu should list 自动 before 不自动");
assert.match(html, /data-live2d-gaze/, "gaze follow should be an independent switch");
assert.doesNotMatch(html, /data-live2d-motion="gaze"/);

console.log("ok: Live2D auto/off exclusive, gaze independent");
