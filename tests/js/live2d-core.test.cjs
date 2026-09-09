const fs = require("fs");
const vm = require("vm");
const assert = require("assert");

let now = 0;
const writes = [];
const sandbox = {
  window: {},
  localStorage: { getItem: () => null, setItem() {} },
  document: { addEventListener() {}, dispatchEvent() {} },
  CustomEvent: class {},
  performance: { now: () => now },
  requestAnimationFrame: () => 1,
  cancelAnimationFrame() {},
  Math,
  console,
};
vm.createContext(sandbox);
vm.runInContext(fs.readFileSync("static/live2d/angle-z-motion.js", "utf8"), sandbox);
vm.runInContext(fs.readFileSync("static/live2d/live2d-core.js", "utf8"), sandbox);

const controller = sandbox.window.PLLive2D;
controller.model = {
  internalModel: {
    coreModel: {
      getParameterIndex: (id) => id === "ParamAngleZ" ? 0 : -1,
      getParameterMinimumValue: () => -42,
      getParameterMaximumValue: () => 42,
      setParameterValueById: (id, value) => writes.push({ id, value }),
    },
  },
};
controller._hasAutoBlink = true;
controller._angleZMotion = sandbox.window.PLAngleZMotion.create({ random: () => 0 });
controller._angleZMotion.reset(0);

now = 3000;
controller._applyLife();
now = 3525;
controller._applyLife();

const angleWrites = writes.filter((entry) => entry.id === "ParamAngleZ");
assert(angleWrites.length >= 2, "embedded mode drives Angle Z even when the model has automatic blinking");
assert(angleWrites.at(-1).value >= 42 * 0.85 - 1e-9, "embedded mode uses at least 85% of the model's positive Angle Z bound");
assert(writes.some((entry) => entry.id === "ParamBodyAngleX"), "auto mode sways the body");
assert(writes.some((entry) => entry.id === "ParamBreath"), "auto mode keeps breathing");

writes.length = 0;
controller.setGazeFollow(true);
controller._gazeTX = 1;
controller._gazeTY = 0.4;
controller._gazeX = 1;
controller._gazeY = 0.4;
controller._applyLife();
controller._applyGaze();
assert(writes.some((entry) => entry.id === "ParamAngleZ" && entry.value >= 42 * 0.85 - 1e-9), "gaze must not overwrite auto Angle Z sway");
assert(writes.some((entry) => entry.id === "ParamBodyAngleX"), "gaze must not freeze auto body sway");
assert(writes.some((entry) => entry.id === "ParamEyeBallX"), "gaze still drives the eyes");
assert(!writes.some((entry) => entry.id === "ParamAngleX" && Math.abs(entry.value) > 42 * 0.3), "gaze only applies a small head turn while auto is on");

controller.setMotionMode("off");
writes.length = 0;
controller._applyLife();
assert.strictEqual(writes.length, 0, "off mode must not run auto body sway");
controller._applyGaze();
assert(!writes.some((entry) => entry.id === "ParamBodyAngleX"), "gaze-only mode must not drive the body");
assert(writes.some((entry) => entry.id === "ParamEyeBallX"), "gaze-only mode still drives the eyes");
assert(writes.some((entry) => entry.id === "ParamAngleX"), "gaze-only mode still uses a small head turn");

console.log("ok: embedded Live2D Angle Z integration");
