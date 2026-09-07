var Uf = Object.defineProperty;
var jf = (e, t, n) => t in e ? Uf(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Ye = (e, t, n) => jf(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Dr(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const ze = {}, Wn = [], Vt = () => {
}, Gf = () => !1, Ws = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Rr = (e) => e.startsWith("onUpdate:"), dt = Object.assign, Vr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, qf = Object.prototype.hasOwnProperty, Le = (e, t) => qf.call(e, t), Ee = Array.isArray, Zn = (e) => Zo(e) === "[object Map]", fo = (e) => Zo(e) === "[object Set]", Ul = (e) => Zo(e) === "[object Date]", Se = (e) => typeof e == "function", Ue = (e) => typeof e == "string", Nt = (e) => typeof e == "symbol", Fe = (e) => e !== null && typeof e == "object", zu = (e) => (Fe(e) || Se(e)) && Se(e.then) && Se(e.catch), Fu = Object.prototype.toString, Zo = (e) => Fu.call(e), Yf = (e) => Zo(e).slice(8, -1), Bu = (e) => Zo(e) === "[object Object]", Lr = (e) => Ue(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Io = /* @__PURE__ */ Dr(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Zs = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Xf = /-(\w)/g, xt = Zs(
  (e) => e.replace(Xf, (t, n) => n ? n.toUpperCase() : "")
), Kf = /\B([A-Z])/g, xn = Zs(
  (e) => e.replace(Kf, "-$1").toLowerCase()
), Js = Zs((e) => e.charAt(0).toUpperCase() + e.slice(1)), ki = Zs(
  (e) => e ? `on${Js(e)}` : ""
), Zt = (e, t) => !Object.is(e, t), ws = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Hu = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, Ts = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let jl;
const Qs = () => jl || (jl = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function rt(e) {
  if (Ee(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = Ue(o) ? Qf(o) : rt(o);
      if (s)
        for (const i in s)
          t[i] = s[i];
    }
    return t;
  } else if (Ue(e) || Fe(e))
    return e;
}
const Wf = /;(?![^(]*\))/g, Zf = /:([^]+)/, Jf = /\/\*[^]*?\*\//g;
function Qf(e) {
  const t = {};
  return e.replace(Jf, "").split(Wf).forEach((n) => {
    if (n) {
      const o = n.split(Zf);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function me(e) {
  let t = "";
  if (Ue(e))
    t = e;
  else if (Ee(e))
    for (let n = 0; n < e.length; n++) {
      const o = me(e[n]);
      o && (t += o + " ");
    }
  else if (Fe(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function Ei(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !Ue(t) && (e.class = me(t)), n && (e.style = rt(n)), e;
}
const ep = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", tp = /* @__PURE__ */ Dr(ep);
function Uu(e) {
  return !!e || e === "";
}
function np(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let o = 0; n && o < e.length; o++)
    n = Jo(e[o], t[o]);
  return n;
}
function Jo(e, t) {
  if (e === t) return !0;
  let n = Ul(e), o = Ul(t);
  if (n || o)
    return n && o ? e.getTime() === t.getTime() : !1;
  if (n = Nt(e), o = Nt(t), n || o)
    return e === t;
  if (n = Ee(e), o = Ee(t), n || o)
    return n && o ? np(e, t) : !1;
  if (n = Fe(e), o = Fe(t), n || o) {
    if (!n || !o)
      return !1;
    const s = Object.keys(e).length, i = Object.keys(t).length;
    if (s !== i)
      return !1;
    for (const r in e) {
      const l = e.hasOwnProperty(r), a = t.hasOwnProperty(r);
      if (l && !a || !l && a || !Jo(e[r], t[r]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function zr(e, t) {
  return e.findIndex((n) => Jo(n, t));
}
const ju = (e) => !!(e && e.__v_isRef === !0), F = (e) => Ue(e) ? e : e == null ? "" : Ee(e) || Fe(e) && (e.toString === Fu || !Se(e.toString)) ? ju(e) ? F(e.value) : JSON.stringify(e, Gu, 2) : String(e), Gu = (e, t) => ju(t) ? Gu(e, t.value) : Zn(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, s], i) => (n[xi(o, i) + " =>"] = s, n),
    {}
  )
} : fo(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => xi(n))
} : Nt(t) ? xi(t) : Fe(t) && !Ee(t) && !Bu(t) ? String(t) : t, xi = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Nt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let ht;
class qu {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = ht, !t && ht && (this.index = (ht.scopes || (ht.scopes = [])).push(
      this
    ) - 1);
  }
  get active() {
    return this._active;
  }
  pause() {
    if (this._active) {
      this._isPaused = !0;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].pause();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].pause();
    }
  }
  /**
   * Resumes the effect scope, including all child scopes and effects.
   */
  resume() {
    if (this._active && this._isPaused) {
      this._isPaused = !1;
      let t, n;
      if (this.scopes)
        for (t = 0, n = this.scopes.length; t < n; t++)
          this.scopes[t].resume();
      for (t = 0, n = this.effects.length; t < n; t++)
        this.effects[t].resume();
    }
  }
  run(t) {
    if (this._active) {
      const n = ht;
      try {
        return ht = this, t();
      } finally {
        ht = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    ht = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    ht = this.parent;
  }
  stop(t) {
    if (this._active) {
      this._active = !1;
      let n, o;
      for (n = 0, o = this.effects.length; n < o; n++)
        this.effects[n].stop();
      for (this.effects.length = 0, n = 0, o = this.cleanups.length; n < o; n++)
        this.cleanups[n]();
      if (this.cleanups.length = 0, this.scopes) {
        for (n = 0, o = this.scopes.length; n < o; n++)
          this.scopes[n].stop(!0);
        this.scopes.length = 0;
      }
      if (!this.detached && this.parent && !t) {
        const s = this.parent.scopes.pop();
        s && s !== this && (this.parent.scopes[this.index] = s, s.index = this.index);
      }
      this.parent = void 0;
    }
  }
}
function Yu(e) {
  return new qu(e);
}
function Fr() {
  return ht;
}
function ks(e, t = !1) {
  ht && ht.cleanups.push(e);
}
let Be;
const Ci = /* @__PURE__ */ new WeakSet();
class Xu {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, ht && ht.active && ht.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Ci.has(this) && (Ci.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Wu(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Gl(this), Zu(this);
    const t = Be, n = It;
    Be = this, It = !0;
    try {
      return this.fn();
    } finally {
      Ju(this), Be = t, It = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        Ur(t);
      this.deps = this.depsTail = void 0, Gl(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Ci.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    tr(this) && this.run();
  }
  get dirty() {
    return tr(this);
  }
}
let Ku = 0, No, Mo;
function Wu(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Mo, Mo = e;
    return;
  }
  e.next = No, No = e;
}
function Br() {
  Ku++;
}
function Hr() {
  if (--Ku > 0)
    return;
  if (Mo) {
    let t = Mo;
    for (Mo = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; No; ) {
    let t = No;
    for (No = void 0; t; ) {
      const n = t.next;
      if (t.next = void 0, t.flags &= -9, t.flags & 1)
        try {
          t.trigger();
        } catch (o) {
          e || (e = o);
        }
      t = n;
    }
  }
  if (e) throw e;
}
function Zu(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Ju(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === n && (n = s), Ur(o), op(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = n;
}
function tr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (Qu(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function Qu(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Vo))
    return;
  e.globalVersion = Vo;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !tr(e)) {
    e.flags &= -3;
    return;
  }
  const n = Be, o = It;
  Be = e, It = !0;
  try {
    Zu(e);
    const s = e.fn(e._value);
    (t.version === 0 || Zt(s, e._value)) && (e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    Be = n, It = o, Ju(e), e.flags &= -3;
  }
}
function Ur(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      Ur(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function op(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let It = !0;
const ec = [];
function Cn() {
  ec.push(It), It = !1;
}
function Sn() {
  const e = ec.pop();
  It = e === void 0 ? !0 : e;
}
function Gl(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = Be;
    Be = void 0;
    try {
      t();
    } finally {
      Be = n;
    }
  }
}
let Vo = 0;
class sp {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class ei {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(t) {
    if (!Be || !It || Be === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Be)
      n = this.activeLink = new sp(Be, this), Be.deps ? (n.prevDep = Be.depsTail, Be.depsTail.nextDep = n, Be.depsTail = n) : Be.deps = Be.depsTail = n, tc(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const o = n.nextDep;
      o.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = o), n.prevDep = Be.depsTail, n.nextDep = void 0, Be.depsTail.nextDep = n, Be.depsTail = n, Be.deps === n && (Be.deps = o);
    }
    return n;
  }
  trigger(t) {
    this.version++, Vo++, this.notify(t);
  }
  notify(t) {
    Br();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      Hr();
    }
  }
}
function tc(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        tc(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Os = /* @__PURE__ */ new WeakMap(), An = Symbol(
  ""
), nr = Symbol(
  ""
), Lo = Symbol(
  ""
);
function ut(e, t, n) {
  if (It && Be) {
    let o = Os.get(e);
    o || Os.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || (o.set(n, s = new ei()), s.map = o, s.key = n), s.track();
  }
}
function qt(e, t, n, o, s, i) {
  const r = Os.get(e);
  if (!r) {
    Vo++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (Br(), t === "clear")
    r.forEach(l);
  else {
    const a = Ee(e), c = a && Lr(n);
    if (a && n === "length") {
      const d = Number(o);
      r.forEach((f, h) => {
        (h === "length" || h === Lo || !Nt(h) && h >= d) && l(f);
      });
    } else
      switch ((n !== void 0 || r.has(void 0)) && l(r.get(n)), c && l(r.get(Lo)), t) {
        case "add":
          a ? c && l(r.get("length")) : (l(r.get(An)), Zn(e) && l(r.get(nr)));
          break;
        case "delete":
          a || (l(r.get(An)), Zn(e) && l(r.get(nr)));
          break;
        case "set":
          Zn(e) && l(r.get(An));
          break;
      }
  }
  Hr();
}
function ip(e, t) {
  const n = Os.get(e);
  return n && n.get(t);
}
function qn(e) {
  const t = De(e);
  return t === e ? t : (ut(t, "iterate", Lo), Et(e) ? t : t.map(ct));
}
function ti(e) {
  return ut(e = De(e), "iterate", Lo), e;
}
const rp = {
  __proto__: null,
  [Symbol.iterator]() {
    return Si(this, Symbol.iterator, ct);
  },
  concat(...e) {
    return qn(this).concat(
      ...e.map((t) => Ee(t) ? qn(t) : t)
    );
  },
  entries() {
    return Si(this, "entries", (e) => (e[1] = ct(e[1]), e));
  },
  every(e, t) {
    return Ut(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return Ut(this, "filter", e, t, (n) => n.map(ct), arguments);
  },
  find(e, t) {
    return Ut(this, "find", e, t, ct, arguments);
  },
  findIndex(e, t) {
    return Ut(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return Ut(this, "findLast", e, t, ct, arguments);
  },
  findLastIndex(e, t) {
    return Ut(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return Ut(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return $i(this, "includes", e);
  },
  indexOf(...e) {
    return $i(this, "indexOf", e);
  },
  join(e) {
    return qn(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return $i(this, "lastIndexOf", e);
  },
  map(e, t) {
    return Ut(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return yo(this, "pop");
  },
  push(...e) {
    return yo(this, "push", e);
  },
  reduce(e, ...t) {
    return ql(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ql(this, "reduceRight", e, t);
  },
  shift() {
    return yo(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return Ut(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return yo(this, "splice", e);
  },
  toReversed() {
    return qn(this).toReversed();
  },
  toSorted(e) {
    return qn(this).toSorted(e);
  },
  toSpliced(...e) {
    return qn(this).toSpliced(...e);
  },
  unshift(...e) {
    return yo(this, "unshift", e);
  },
  values() {
    return Si(this, "values", ct);
  }
};
function Si(e, t, n) {
  const o = ti(e), s = o[t]();
  return o !== e && !Et(e) && (s._next = s.next, s.next = () => {
    const i = s._next();
    return i.value && (i.value = n(i.value)), i;
  }), s;
}
const lp = Array.prototype;
function Ut(e, t, n, o, s, i) {
  const r = ti(e), l = r !== e && !Et(e), a = r[t];
  if (a !== lp[t]) {
    const f = a.apply(e, i);
    return l ? ct(f) : f;
  }
  let c = n;
  r !== e && (l ? c = function(f, h) {
    return n.call(this, ct(f), h, e);
  } : n.length > 2 && (c = function(f, h) {
    return n.call(this, f, h, e);
  }));
  const d = a.call(r, c, o);
  return l && s ? s(d) : d;
}
function ql(e, t, n, o) {
  const s = ti(e);
  let i = n;
  return s !== e && (Et(e) ? n.length > 3 && (i = function(r, l, a) {
    return n.call(this, r, l, a, e);
  }) : i = function(r, l, a) {
    return n.call(this, r, ct(l), a, e);
  }), s[t](i, ...o);
}
function $i(e, t, n) {
  const o = De(e);
  ut(o, "iterate", Lo);
  const s = o[t](...n);
  return (s === -1 || s === !1) && Yr(n[0]) ? (n[0] = De(n[0]), o[t](...n)) : s;
}
function yo(e, t, n = []) {
  Cn(), Br();
  const o = De(e)[t].apply(e, n);
  return Hr(), Sn(), o;
}
const ap = /* @__PURE__ */ Dr("__proto__,__v_isRef,__isVue"), nc = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Nt)
);
function up(e) {
  Nt(e) || (e = String(e));
  const t = De(this);
  return ut(t, "has", e), t.hasOwnProperty(e);
}
class oc {
  constructor(t = !1, n = !1) {
    this._isReadonly = t, this._isShallow = n;
  }
  get(t, n, o) {
    if (n === "__v_skip") return t.__v_skip;
    const s = this._isReadonly, i = this._isShallow;
    if (n === "__v_isReactive")
      return !s;
    if (n === "__v_isReadonly")
      return s;
    if (n === "__v_isShallow")
      return i;
    if (n === "__v_raw")
      return o === (s ? i ? bp : lc : i ? rc : ic).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const r = Ee(t);
    if (!s) {
      let a;
      if (r && (a = rp[n]))
        return a;
      if (n === "hasOwnProperty")
        return up;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      Ke(t) ? t : o
    );
    return (Nt(n) ? nc.has(n) : ap(n)) || (s || ut(t, "get", n), i) ? l : Ke(l) ? r && Lr(n) ? l : l.value : Fe(l) ? s ? Gr(l) : wn(l) : l;
  }
}
class sc extends oc {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, s) {
    let i = t[n];
    if (!this._isShallow) {
      const a = zn(i);
      if (!Et(o) && !zn(o) && (i = De(i), o = De(o)), !Ee(t) && Ke(i) && !Ke(o))
        return a ? !1 : (i.value = o, !0);
    }
    const r = Ee(t) && Lr(n) ? Number(n) < t.length : Le(t, n), l = Reflect.set(
      t,
      n,
      o,
      Ke(t) ? t : s
    );
    return t === De(s) && (r ? Zt(o, i) && qt(t, "set", n, o) : qt(t, "add", n, o)), l;
  }
  deleteProperty(t, n) {
    const o = Le(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && o && qt(t, "delete", n, void 0), s;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!Nt(n) || !nc.has(n)) && ut(t, "has", n), o;
  }
  ownKeys(t) {
    return ut(
      t,
      "iterate",
      Ee(t) ? "length" : An
    ), Reflect.ownKeys(t);
  }
}
class cp extends oc {
  constructor(t = !1) {
    super(!0, t);
  }
  set(t, n) {
    return !0;
  }
  deleteProperty(t, n) {
    return !0;
  }
}
const dp = /* @__PURE__ */ new sc(), fp = /* @__PURE__ */ new cp(), pp = /* @__PURE__ */ new sc(!0);
const or = (e) => e, rs = (e) => Reflect.getPrototypeOf(e);
function hp(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, i = De(s), r = Zn(i), l = e === "entries" || e === Symbol.iterator && r, a = e === "keys" && r, c = s[e](...o), d = n ? or : t ? sr : ct;
    return !t && ut(
      i,
      "iterate",
      a ? nr : An
    ), {
      // iterator protocol
      next() {
        const { value: f, done: h } = c.next();
        return h ? { value: f, done: h } : {
          value: l ? [d(f[0]), d(f[1])] : d(f),
          done: h
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function ls(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function vp(e, t) {
  const n = {
    get(s) {
      const i = this.__v_raw, r = De(i), l = De(s);
      e || (Zt(s, l) && ut(r, "get", s), ut(r, "get", l));
      const { has: a } = rs(r), c = t ? or : e ? sr : ct;
      if (a.call(r, s))
        return c(i.get(s));
      if (a.call(r, l))
        return c(i.get(l));
      i !== r && i.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && ut(De(s), "iterate", An), Reflect.get(s, "size", s);
    },
    has(s) {
      const i = this.__v_raw, r = De(i), l = De(s);
      return e || (Zt(s, l) && ut(r, "has", s), ut(r, "has", l)), s === l ? i.has(s) : i.has(s) || i.has(l);
    },
    forEach(s, i) {
      const r = this, l = r.__v_raw, a = De(l), c = t ? or : e ? sr : ct;
      return !e && ut(a, "iterate", An), l.forEach((d, f) => s.call(i, c(d), c(f), r));
    }
  };
  return dt(
    n,
    e ? {
      add: ls("add"),
      set: ls("set"),
      delete: ls("delete"),
      clear: ls("clear")
    } : {
      add(s) {
        !t && !Et(s) && !zn(s) && (s = De(s));
        const i = De(this);
        return rs(i).has.call(i, s) || (i.add(s), qt(i, "add", s, s)), this;
      },
      set(s, i) {
        !t && !Et(i) && !zn(i) && (i = De(i));
        const r = De(this), { has: l, get: a } = rs(r);
        let c = l.call(r, s);
        c || (s = De(s), c = l.call(r, s));
        const d = a.call(r, s);
        return r.set(s, i), c ? Zt(i, d) && qt(r, "set", s, i) : qt(r, "add", s, i), this;
      },
      delete(s) {
        const i = De(this), { has: r, get: l } = rs(i);
        let a = r.call(i, s);
        a || (s = De(s), a = r.call(i, s)), l && l.call(i, s);
        const c = i.delete(s);
        return a && qt(i, "delete", s, void 0), c;
      },
      clear() {
        const s = De(this), i = s.size !== 0, r = s.clear();
        return i && qt(
          s,
          "clear",
          void 0,
          void 0
        ), r;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    n[s] = hp(s, e, t);
  }), n;
}
function jr(e, t) {
  const n = vp(e, t);
  return (o, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    Le(n, s) && s in o ? n : o,
    s,
    i
  );
}
const gp = {
  get: /* @__PURE__ */ jr(!1, !1)
}, mp = {
  get: /* @__PURE__ */ jr(!1, !0)
}, yp = {
  get: /* @__PURE__ */ jr(!0, !1)
};
const ic = /* @__PURE__ */ new WeakMap(), rc = /* @__PURE__ */ new WeakMap(), lc = /* @__PURE__ */ new WeakMap(), bp = /* @__PURE__ */ new WeakMap();
function _p(e) {
  switch (e) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function wp(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : _p(Yf(e));
}
function wn(e) {
  return zn(e) ? e : qr(
    e,
    !1,
    dp,
    gp,
    ic
  );
}
function kp(e) {
  return qr(
    e,
    !1,
    pp,
    mp,
    rc
  );
}
function Gr(e) {
  return qr(
    e,
    !0,
    fp,
    yp,
    lc
  );
}
function qr(e, t, n, o, s) {
  if (!Fe(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = s.get(e);
  if (i)
    return i;
  const r = wp(e);
  if (r === 0)
    return e;
  const l = new Proxy(
    e,
    r === 2 ? o : n
  );
  return s.set(e, l), l;
}
function Jn(e) {
  return zn(e) ? Jn(e.__v_raw) : !!(e && e.__v_isReactive);
}
function zn(e) {
  return !!(e && e.__v_isReadonly);
}
function Et(e) {
  return !!(e && e.__v_isShallow);
}
function Yr(e) {
  return e ? !!e.__v_raw : !1;
}
function De(e) {
  const t = e && e.__v_raw;
  return t ? De(t) : e;
}
function Dn(e) {
  return !Le(e, "__v_skip") && Object.isExtensible(e) && Hu(e, "__v_skip", !0), e;
}
const ct = (e) => Fe(e) ? wn(e) : e, sr = (e) => Fe(e) ? Gr(e) : e;
function Ke(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ee(e) {
  return Ep(e, !1);
}
function Ep(e, t) {
  return Ke(e) ? e : new xp(e, t);
}
class xp {
  constructor(t, n) {
    this.dep = new ei(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : De(t), this._value = n ? t : ct(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || Et(t) || zn(t);
    t = o ? t : De(t), Zt(t, n) && (this._rawValue = t, this._value = o ? t : ct(t), this.dep.trigger());
  }
}
function H(e) {
  return Ke(e) ? e.value : e;
}
function Pe(e) {
  return Se(e) ? e() : H(e);
}
const Cp = {
  get: (e, t, n) => t === "__v_raw" ? e : H(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return Ke(s) && !Ke(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function ac(e) {
  return Jn(e) ? e : new Proxy(e, Cp);
}
class Sp {
  constructor(t) {
    this.__v_isRef = !0, this._value = void 0;
    const n = this.dep = new ei(), { get: o, set: s } = t(n.track.bind(n), n.trigger.bind(n));
    this._get = o, this._set = s;
  }
  get value() {
    return this._value = this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function $p(e) {
  return new Sp(e);
}
function Ip(e) {
  const t = Ee(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = uc(e, n);
  return t;
}
class Np {
  constructor(t, n, o) {
    this._object = t, this._key = n, this._defaultValue = o, this.__v_isRef = !0, this._value = void 0;
  }
  get value() {
    const t = this._object[this._key];
    return this._value = t === void 0 ? this._defaultValue : t;
  }
  set value(t) {
    this._object[this._key] = t;
  }
  get dep() {
    return ip(De(this._object), this._key);
  }
}
class Mp {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function He(e, t, n) {
  return Ke(e) ? e : Se(e) ? new Mp(e) : Fe(e) && arguments.length > 1 ? uc(e, t, n) : ee(e);
}
function uc(e, t, n) {
  const o = e[t];
  return Ke(o) ? o : new Np(e, t, n);
}
class Tp {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new ei(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Vo - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Be !== this)
      return Wu(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return Qu(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Op(e, t, n = !1) {
  let o, s;
  return Se(e) ? o = e : (o = e.get, s = e.set), new Tp(o, s, n);
}
const as = {}, Ps = /* @__PURE__ */ new WeakMap();
let Mn;
function Pp(e, t = !1, n = Mn) {
  if (n) {
    let o = Ps.get(n);
    o || Ps.set(n, o = []), o.push(e);
  }
}
function Ap(e, t, n = ze) {
  const { immediate: o, deep: s, once: i, scheduler: r, augmentJob: l, call: a } = n, c = (m) => s ? m : Et(m) || s === !1 || s === 0 ? Yt(m, 1) : Yt(m);
  let d, f, h, v, w = !1, x = !1;
  if (Ke(e) ? (f = () => e.value, w = Et(e)) : Jn(e) ? (f = () => c(e), w = !0) : Ee(e) ? (x = !0, w = e.some((m) => Jn(m) || Et(m)), f = () => e.map((m) => {
    if (Ke(m))
      return m.value;
    if (Jn(m))
      return c(m);
    if (Se(m))
      return a ? a(m, 2) : m();
  })) : Se(e) ? t ? f = a ? () => a(e, 2) : e : f = () => {
    if (h) {
      Cn();
      try {
        h();
      } finally {
        Sn();
      }
    }
    const m = Mn;
    Mn = d;
    try {
      return a ? a(e, 3, [v]) : e(v);
    } finally {
      Mn = m;
    }
  } : f = Vt, t && s) {
    const m = f, z = s === !0 ? 1 / 0 : s;
    f = () => Yt(m(), z);
  }
  const I = Fr(), C = () => {
    d.stop(), I && I.active && Vr(I.effects, d);
  };
  if (i && t) {
    const m = t;
    t = (...z) => {
      m(...z), C();
    };
  }
  let D = x ? new Array(e.length).fill(as) : as;
  const _ = (m) => {
    if (!(!(d.flags & 1) || !d.dirty && !m))
      if (t) {
        const z = d.run();
        if (s || w || (x ? z.some((Y, q) => Zt(Y, D[q])) : Zt(z, D))) {
          h && h();
          const Y = Mn;
          Mn = d;
          try {
            const q = [
              z,
              // pass undefined as the old value when it's changed for the first time
              D === as ? void 0 : x && D[0] === as ? [] : D,
              v
            ];
            a ? a(t, 3, q) : (
              // @ts-expect-error
              t(...q)
            ), D = z;
          } finally {
            Mn = Y;
          }
        }
      } else
        d.run();
  };
  return l && l(_), d = new Xu(f), d.scheduler = r ? () => r(_, !1) : _, v = (m) => Pp(m, !1, d), h = d.onStop = () => {
    const m = Ps.get(d);
    if (m) {
      if (a)
        a(m, 4);
      else
        for (const z of m) z();
      Ps.delete(d);
    }
  }, t ? o ? _(!0) : D = d.run() : r ? r(_.bind(null, !0), !0) : d.run(), C.pause = d.pause.bind(d), C.resume = d.resume.bind(d), C.stop = C, C;
}
function Yt(e, t = 1 / 0, n) {
  if (t <= 0 || !Fe(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, Ke(e))
    Yt(e.value, t, n);
  else if (Ee(e))
    for (let o = 0; o < e.length; o++)
      Yt(e[o], t, n);
  else if (fo(e) || Zn(e))
    e.forEach((o) => {
      Yt(o, t, n);
    });
  else if (Bu(e)) {
    for (const o in e)
      Yt(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && Yt(e[o], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function Qo(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (s) {
    ni(s, t, n);
  }
}
function Bt(e, t, n, o) {
  if (Se(e)) {
    const s = Qo(e, t, n, o);
    return s && zu(s) && s.catch((i) => {
      ni(i, t, n);
    }), s;
  }
  if (Ee(e)) {
    const s = [];
    for (let i = 0; i < e.length; i++)
      s.push(Bt(e[i], t, n, o));
    return s;
  }
}
function ni(e, t, n, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: r } = t && t.appContext.config || ze;
  if (t) {
    let l = t.parent;
    const a = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; l; ) {
      const d = l.ec;
      if (d) {
        for (let f = 0; f < d.length; f++)
          if (d[f](e, a, c) === !1)
            return;
      }
      l = l.parent;
    }
    if (i) {
      Cn(), Qo(i, null, 10, [
        e,
        a,
        c
      ]), Sn();
      return;
    }
  }
  Dp(e, n, s, o, r);
}
function Dp(e, t, n, o = !0, s = !1) {
  if (s)
    throw e;
  console.error(e);
}
const vt = [];
let Pt = -1;
const Qn = [];
let un = null, Xn = 0;
const cc = /* @__PURE__ */ Promise.resolve();
let As = null;
function ot(e) {
  const t = As || cc;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Rp(e) {
  let t = Pt + 1, n = vt.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = vt[o], i = zo(s);
    i < e || i === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function Xr(e) {
  if (!(e.flags & 1)) {
    const t = zo(e), n = vt[vt.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= zo(n) ? vt.push(e) : vt.splice(Rp(t), 0, e), e.flags |= 1, dc();
  }
}
function dc() {
  As || (As = cc.then(pc));
}
function Vp(e) {
  Ee(e) ? Qn.push(...e) : un && e.id === -1 ? un.splice(Xn + 1, 0, e) : e.flags & 1 || (Qn.push(e), e.flags |= 1), dc();
}
function Yl(e, t, n = Pt + 1) {
  for (; n < vt.length; n++) {
    const o = vt[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid)
        continue;
      vt.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function fc(e) {
  if (Qn.length) {
    const t = [...new Set(Qn)].sort(
      (n, o) => zo(n) - zo(o)
    );
    if (Qn.length = 0, un) {
      un.push(...t);
      return;
    }
    for (un = t, Xn = 0; Xn < un.length; Xn++) {
      const n = un[Xn];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    un = null, Xn = 0;
  }
}
const zo = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function pc(e) {
  try {
    for (Pt = 0; Pt < vt.length; Pt++) {
      const t = vt[Pt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), Qo(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Pt < vt.length; Pt++) {
      const t = vt[Pt];
      t && (t.flags &= -2);
    }
    Pt = -1, vt.length = 0, fc(), As = null, (vt.length || Qn.length) && pc();
  }
}
let nt = null, hc = null;
function Ds(e) {
  const t = nt;
  return nt = e, hc = e && e.type.__scopeId || null, t;
}
function bn(e, t = nt, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && ra(-1);
    const i = Ds(t);
    let r;
    try {
      r = e(...s);
    } finally {
      Ds(i), o._d && ra(1);
    }
    return r;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function Ie(e, t) {
  if (nt === null)
    return e;
  const n = li(nt), o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, r, l, a = ze] = t[s];
    i && (Se(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && Yt(r), o.push({
      dir: i,
      instance: n,
      value: r,
      oldValue: void 0,
      arg: l,
      modifiers: a
    }));
  }
  return e;
}
function $n(e, t, n, o) {
  const s = e.dirs, i = t && t.dirs;
  for (let r = 0; r < s.length; r++) {
    const l = s[r];
    i && (l.oldValue = i[r].value);
    let a = l.dir[o];
    a && (Cn(), Bt(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Sn());
  }
}
const vc = Symbol("_vte"), Lp = (e) => e.__isTeleport, To = (e) => e && (e.disabled || e.disabled === ""), Xl = (e) => e && (e.defer || e.defer === ""), Kl = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Wl = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, ir = (e, t) => {
  const n = e && e.to;
  return Ue(n) ? t ? t(n) : null : n;
}, gc = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, o, s, i, r, l, a, c) {
    const {
      mc: d,
      pc: f,
      pbc: h,
      o: { insert: v, querySelector: w, createText: x, createComment: I }
    } = c, C = To(t.props);
    let { shapeFlag: D, children: _, dynamicChildren: m } = t;
    if (e == null) {
      const z = t.el = x(""), Y = t.anchor = x("");
      v(z, n, o), v(Y, n, o);
      const q = (P, L) => {
        D & 16 && (s && s.isCE && (s.ce._teleportTarget = P), d(
          _,
          P,
          L,
          s,
          i,
          r,
          l,
          a
        ));
      }, j = () => {
        const P = t.target = ir(t.props, w), L = mc(P, t, x, v);
        P && (r !== "svg" && Kl(P) ? r = "svg" : r !== "mathml" && Wl(P) && (r = "mathml"), C || (q(P, L), Es(t, !1)));
      };
      C && (q(n, Y), Es(t, !0)), Xl(t.props) ? pt(() => {
        j(), t.el.__isMounted = !0;
      }, i) : j();
    } else {
      if (Xl(t.props) && !e.el.__isMounted) {
        pt(() => {
          gc.process(
            e,
            t,
            n,
            o,
            s,
            i,
            r,
            l,
            a,
            c
          ), delete e.el.__isMounted;
        }, i);
        return;
      }
      t.el = e.el, t.targetStart = e.targetStart;
      const z = t.anchor = e.anchor, Y = t.target = e.target, q = t.targetAnchor = e.targetAnchor, j = To(e.props), P = j ? n : Y, L = j ? z : q;
      if (r === "svg" || Kl(Y) ? r = "svg" : (r === "mathml" || Wl(Y)) && (r = "mathml"), m ? (h(
        e.dynamicChildren,
        m,
        P,
        s,
        i,
        r,
        l
      ), Zr(e, t, !0)) : a || f(
        e,
        t,
        P,
        L,
        s,
        i,
        r,
        l,
        !1
      ), C)
        j ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : us(
          t,
          n,
          z,
          c,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const X = t.target = ir(
          t.props,
          w
        );
        X && us(
          t,
          X,
          null,
          c,
          0
        );
      } else j && us(
        t,
        Y,
        q,
        c,
        1
      );
      Es(t, C);
    }
  },
  remove(e, t, n, { um: o, o: { remove: s } }, i) {
    const {
      shapeFlag: r,
      children: l,
      anchor: a,
      targetStart: c,
      targetAnchor: d,
      target: f,
      props: h
    } = e;
    if (f && (s(c), s(d)), i && s(a), r & 16) {
      const v = i || !To(h);
      for (let w = 0; w < l.length; w++) {
        const x = l[w];
        o(
          x,
          t,
          n,
          v,
          !!x.dynamicChildren
        );
      }
    }
  },
  move: us,
  hydrate: zp
};
function us(e, t, n, { o: { insert: o }, m: s }, i = 2) {
  i === 0 && o(e.targetAnchor, t, n);
  const { el: r, anchor: l, shapeFlag: a, children: c, props: d } = e, f = i === 2;
  if (f && o(r, t, n), (!f || To(d)) && a & 16)
    for (let h = 0; h < c.length; h++)
      s(
        c[h],
        t,
        n,
        2
      );
  f && o(l, t, n);
}
function zp(e, t, n, o, s, i, {
  o: { nextSibling: r, parentNode: l, querySelector: a, insert: c, createText: d }
}, f) {
  const h = t.target = ir(
    t.props,
    a
  );
  if (h) {
    const v = To(t.props), w = h._lpa || h.firstChild;
    if (t.shapeFlag & 16)
      if (v)
        t.anchor = f(
          r(e),
          t,
          l(e),
          n,
          o,
          s,
          i
        ), t.targetStart = w, t.targetAnchor = w && r(w);
      else {
        t.anchor = r(e);
        let x = w;
        for (; x; ) {
          if (x && x.nodeType === 8) {
            if (x.data === "teleport start anchor")
              t.targetStart = x;
            else if (x.data === "teleport anchor") {
              t.targetAnchor = x, h._lpa = t.targetAnchor && r(t.targetAnchor);
              break;
            }
          }
          x = r(x);
        }
        t.targetAnchor || mc(h, t, d, c), f(
          w && r(w),
          t,
          h,
          n,
          o,
          s,
          i
        );
      }
    Es(t, v);
  }
  return t.anchor && r(t.anchor);
}
const Fp = gc;
function Es(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let o, s;
    for (t ? (o = e.el, s = e.anchor) : (o = e.targetStart, s = e.targetAnchor); o && o !== s; )
      o.nodeType === 1 && o.setAttribute("data-v-owner", n.uid), o = o.nextSibling;
    n.ut();
  }
}
function mc(e, t, n, o) {
  const s = t.targetStart = n(""), i = t.targetAnchor = n("");
  return s[vc] = i, e && (o(s, e), o(i, e)), i;
}
function Kr(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, Kr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Te(e, t) {
  return Se(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    dt({ name: e.name }, t, { setup: e })
  ) : e;
}
function yc(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Rs(e, t, n, o, s = !1) {
  if (Ee(e)) {
    e.forEach(
      (w, x) => Rs(
        w,
        t && (Ee(t) ? t[x] : t),
        n,
        o,
        s
      )
    );
    return;
  }
  if (eo(o) && !s) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && Rs(e, t, n, o.component.subTree);
    return;
  }
  const i = o.shapeFlag & 4 ? li(o.component) : o.el, r = s ? null : i, { i: l, r: a } = e, c = t && t.r, d = l.refs === ze ? l.refs = {} : l.refs, f = l.setupState, h = De(f), v = f === ze ? () => !1 : (w) => Le(h, w);
  if (c != null && c !== a && (Ue(c) ? (d[c] = null, v(c) && (f[c] = null)) : Ke(c) && (c.value = null)), Se(a))
    Qo(a, l, 12, [r, d]);
  else {
    const w = Ue(a), x = Ke(a);
    if (w || x) {
      const I = () => {
        if (e.f) {
          const C = w ? v(a) ? f[a] : d[a] : a.value;
          s ? Ee(C) && Vr(C, i) : Ee(C) ? C.includes(i) || C.push(i) : w ? (d[a] = [i], v(a) && (f[a] = d[a])) : (a.value = [i], e.k && (d[e.k] = a.value));
        } else w ? (d[a] = r, v(a) && (f[a] = r)) : x && (a.value = r, e.k && (d[e.k] = r));
      };
      r ? (I.id = -1, pt(I, n)) : I();
    }
  }
}
Qs().requestIdleCallback;
Qs().cancelIdleCallback;
const eo = (e) => !!e.type.__asyncLoader, bc = (e) => e.type.__isKeepAlive;
function Bp(e, t) {
  _c(e, "a", t);
}
function Hp(e, t) {
  _c(e, "da", t);
}
function _c(e, t, n = it) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (oi(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      bc(s.parent.vnode) && Up(o, t, n, s), s = s.parent;
  }
}
function Up(e, t, n, o) {
  const s = oi(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  si(() => {
    Vr(o[t], s);
  }, n);
}
function oi(e, t, n = it, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...r) => {
      Cn();
      const l = es(n), a = Bt(t, n, e, r);
      return l(), Sn(), a;
    });
    return o ? s.unshift(i) : s.push(i), i;
  }
}
const on = (e) => (t, n = it) => {
  (!Bo || e === "sp") && oi(e, (...o) => t(...o), n);
}, wc = on("bm"), lt = on("m"), jp = on(
  "bu"
), Gp = on("u"), sn = on(
  "bum"
), si = on("um"), qp = on(
  "sp"
), Yp = on("rtg"), Xp = on("rtc");
function Kp(e, t = it) {
  oi("ec", e, t);
}
const kc = "components";
function Ec(e, t) {
  return Sc(kc, e, !0, t) || e;
}
const xc = Symbol.for("v-ndc");
function Cc(e) {
  return Ue(e) ? Sc(kc, e, !1) || e : e || xc;
}
function Sc(e, t, n = !0, o = !1) {
  const s = nt || it;
  if (s) {
    const i = s.type;
    {
      const l = Ah(
        i,
        !1
      );
      if (l && (l === t || l === xt(t) || l === Js(xt(t))))
        return i;
    }
    const r = (
      // local registration
      // check instance[type] first which is resolved for options API
      Zl(s[e] || i[e], t) || // global registration
      Zl(s.appContext[e], t)
    );
    return !r && o ? i : r;
  }
}
function Zl(e, t) {
  return e && (e[t] || e[xt(t)] || e[Js(xt(t))]);
}
function Oe(e, t, n, o) {
  let s;
  const i = n && n[o], r = Ee(e);
  if (r || Ue(e)) {
    const l = r && Jn(e);
    let a = !1;
    l && (a = !Et(e), e = ti(e)), s = new Array(e.length);
    for (let c = 0, d = e.length; c < d; c++)
      s[c] = t(
        a ? ct(e[c]) : e[c],
        c,
        void 0,
        i && i[c]
      );
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let l = 0; l < e; l++)
      s[l] = t(l + 1, l, void 0, i && i[l]);
  } else if (Fe(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (l, a) => t(l, a, void 0, i && i[a])
      );
    else {
      const l = Object.keys(e);
      s = new Array(l.length);
      for (let a = 0, c = l.length; a < c; a++) {
        const d = l[a];
        s[a] = t(e[d], d, a, i && i[a]);
      }
    }
  else
    s = [];
  return n && (n[o] = s), s;
}
function Fn(e, t, n = {}, o, s) {
  if (nt.ce || nt.parent && eo(nt.parent) && nt.parent.ce)
    return t !== "default" && (n.name = t), S(), et(
      ye,
      null,
      [ne("slot", n, o && o())],
      64
    );
  let i = e[t];
  i && i._c && (i._d = !1), S();
  const r = i && $c(i(n)), l = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  r && r.key, a = et(
    ye,
    {
      key: (l && !Nt(l) ? l : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!r && o ? "_fb" : "")
    },
    r || (o ? o() : []),
    r && e._ === 1 ? 64 : -2
  );
  return a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), i && i._c && (i._d = !0), a;
}
function $c(e) {
  return e.some((t) => Fo(t) ? !(t.type === kn || t.type === ye && !$c(t.children)) : !0) ? e : null;
}
const rr = (e) => e ? Kc(e) ? li(e) : rr(e.parent) : null, Oo = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ dt(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => rr(e.parent),
    $root: (e) => rr(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Tc(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      Xr(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ot.bind(e.proxy)),
    $watch: (e) => yh.bind(e)
  })
), Ii = (e, t) => e !== ze && !e.__isScriptSetup && Le(e, t), Wp = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: s, props: i, accessCache: r, type: l, appContext: a } = e;
    let c;
    if (t[0] !== "$") {
      const v = r[t];
      if (v !== void 0)
        switch (v) {
          case 1:
            return o[t];
          case 2:
            return s[t];
          case 4:
            return n[t];
          case 3:
            return i[t];
        }
      else {
        if (Ii(o, t))
          return r[t] = 1, o[t];
        if (s !== ze && Le(s, t))
          return r[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (c = e.propsOptions[0]) && Le(c, t)
        )
          return r[t] = 3, i[t];
        if (n !== ze && Le(n, t))
          return r[t] = 4, n[t];
        lr && (r[t] = 0);
      }
    }
    const d = Oo[t];
    let f, h;
    if (d)
      return t === "$attrs" && ut(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== ze && Le(n, t))
      return r[t] = 4, n[t];
    if (
      // global properties
      h = a.config.globalProperties, Le(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: i } = e;
    return Ii(s, t) ? (s[t] = n, !0) : o !== ze && Le(o, t) ? (o[t] = n, !0) : Le(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: s, propsOptions: i }
  }, r) {
    let l;
    return !!n[r] || e !== ze && Le(e, r) || Ii(t, r) || (l = i[0]) && Le(l, r) || Le(o, r) || Le(Oo, r) || Le(s.config.globalProperties, r);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Le(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Zp() {
  return Ic().slots;
}
function Jp() {
  return Ic().attrs;
}
function Ic() {
  const e = po();
  return e.setupContext || (e.setupContext = Zc(e));
}
function Jl(e) {
  return Ee(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Nc(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || Object.defineProperty(n, o, {
      enumerable: !0,
      get: () => e[o]
    });
  return n;
}
let lr = !0;
function Qp(e) {
  const t = Tc(e), n = e.proxy, o = e.ctx;
  lr = !1, t.beforeCreate && Ql(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: i,
    methods: r,
    watch: l,
    provide: a,
    inject: c,
    // lifecycle
    created: d,
    beforeMount: f,
    mounted: h,
    beforeUpdate: v,
    updated: w,
    activated: x,
    deactivated: I,
    beforeDestroy: C,
    beforeUnmount: D,
    destroyed: _,
    unmounted: m,
    render: z,
    renderTracked: Y,
    renderTriggered: q,
    errorCaptured: j,
    serverPrefetch: P,
    // public API
    expose: L,
    inheritAttrs: X,
    // assets
    components: U,
    directives: K,
    filters: $
  } = t;
  if (c && eh(c, o, null), r)
    for (const R in r) {
      const G = r[R];
      Se(G) && (o[R] = G.bind(n));
    }
  if (s) {
    const R = s.call(n, n);
    Fe(R) && (e.data = wn(R));
  }
  if (lr = !0, i)
    for (const R in i) {
      const G = i[R], oe = Se(G) ? G.bind(n, n) : Se(G.get) ? G.get.bind(n, n) : Vt, ue = !Se(G) && Se(G.set) ? G.set.bind(n) : Vt, de = ae({
        get: oe,
        set: ue
      });
      Object.defineProperty(o, R, {
        enumerable: !0,
        configurable: !0,
        get: () => de.value,
        set: (re) => de.value = re
      });
    }
  if (l)
    for (const R in l)
      Mc(l[R], o, n, R);
  if (a) {
    const R = Se(a) ? a.call(n) : a;
    Reflect.ownKeys(R).forEach((G) => {
      Bn(G, R[G]);
    });
  }
  d && Ql(d, e, "c");
  function M(R, G) {
    Ee(G) ? G.forEach((oe) => R(oe.bind(n))) : G && R(G.bind(n));
  }
  if (M(wc, f), M(lt, h), M(jp, v), M(Gp, w), M(Bp, x), M(Hp, I), M(Kp, j), M(Xp, Y), M(Yp, q), M(sn, D), M(si, m), M(qp, P), Ee(L))
    if (L.length) {
      const R = e.exposed || (e.exposed = {});
      L.forEach((G) => {
        Object.defineProperty(R, G, {
          get: () => n[G],
          set: (oe) => n[G] = oe
        });
      });
    } else e.exposed || (e.exposed = {});
  z && e.render === Vt && (e.render = z), X != null && (e.inheritAttrs = X), U && (e.components = U), K && (e.directives = K), P && yc(e);
}
function eh(e, t, n = Vt) {
  Ee(e) && (e = ar(e));
  for (const o in e) {
    const s = e[o];
    let i;
    Fe(s) ? "default" in s ? i = Lt(
      s.from || o,
      s.default,
      !0
    ) : i = Lt(s.from || o) : i = Lt(s), Ke(i) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (r) => i.value = r
    }) : t[o] = i;
  }
}
function Ql(e, t, n) {
  Bt(
    Ee(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Mc(e, t, n, o) {
  let s = o.includes(".") ? jc(n, o) : () => n[o];
  if (Ue(e)) {
    const i = t[e];
    Se(i) && Ne(s, i);
  } else if (Se(e))
    Ne(s, e.bind(n));
  else if (Fe(e))
    if (Ee(e))
      e.forEach((i) => Mc(i, t, n, o));
    else {
      const i = Se(e.handler) ? e.handler.bind(n) : t[e.handler];
      Se(i) && Ne(s, i, e);
    }
}
function Tc(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: s,
    optionsCache: i,
    config: { optionMergeStrategies: r }
  } = e.appContext, l = i.get(t);
  let a;
  return l ? a = l : !s.length && !n && !o ? a = t : (a = {}, s.length && s.forEach(
    (c) => Vs(a, c, r, !0)
  ), Vs(a, t, r)), Fe(t) && i.set(t, a), a;
}
function Vs(e, t, n, o = !1) {
  const { mixins: s, extends: i } = t;
  i && Vs(e, i, n, !0), s && s.forEach(
    (r) => Vs(e, r, n, !0)
  );
  for (const r in t)
    if (!(o && r === "expose")) {
      const l = th[r] || n && n[r];
      e[r] = l ? l(e[r], t[r]) : t[r];
    }
  return e;
}
const th = {
  data: ea,
  props: ta,
  emits: ta,
  // objects
  methods: Eo,
  computed: Eo,
  // lifecycle
  beforeCreate: ft,
  created: ft,
  beforeMount: ft,
  mounted: ft,
  beforeUpdate: ft,
  updated: ft,
  beforeDestroy: ft,
  beforeUnmount: ft,
  destroyed: ft,
  unmounted: ft,
  activated: ft,
  deactivated: ft,
  errorCaptured: ft,
  serverPrefetch: ft,
  // assets
  components: Eo,
  directives: Eo,
  // watch
  watch: oh,
  // provide / inject
  provide: ea,
  inject: nh
};
function ea(e, t) {
  return t ? e ? function() {
    return dt(
      Se(e) ? e.call(this, this) : e,
      Se(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function nh(e, t) {
  return Eo(ar(e), ar(t));
}
function ar(e) {
  if (Ee(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function ft(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Eo(e, t) {
  return e ? dt(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function ta(e, t) {
  return e ? Ee(e) && Ee(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : dt(
    /* @__PURE__ */ Object.create(null),
    Jl(e),
    Jl(t ?? {})
  ) : t;
}
function oh(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = dt(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = ft(e[o], t[o]);
  return n;
}
function Oc() {
  return {
    app: null,
    config: {
      isNativeTag: Gf,
      performance: !1,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let sh = 0;
function ih(e, t) {
  return function(o, s = null) {
    Se(o) || (o = dt({}, o)), s != null && !Fe(s) && (s = null);
    const i = Oc(), r = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const c = i.app = {
      _uid: sh++,
      _component: o,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: Vh,
      get config() {
        return i.config;
      },
      set config(d) {
      },
      use(d, ...f) {
        return r.has(d) || (d && Se(d.install) ? (r.add(d), d.install(c, ...f)) : Se(d) && (r.add(d), d(c, ...f))), c;
      },
      mixin(d) {
        return i.mixins.includes(d) || i.mixins.push(d), c;
      },
      component(d, f) {
        return f ? (i.components[d] = f, c) : i.components[d];
      },
      directive(d, f) {
        return f ? (i.directives[d] = f, c) : i.directives[d];
      },
      mount(d, f, h) {
        if (!a) {
          const v = c._ceVNode || ne(o, s);
          return v.appContext = i, h === !0 ? h = "svg" : h === !1 && (h = void 0), e(v, d, h), a = !0, c._container = d, d.__vue_app__ = c, li(v.component);
        }
      },
      onUnmount(d) {
        l.push(d);
      },
      unmount() {
        a && (Bt(
          l,
          c._instance,
          16
        ), e(null, c._container), delete c._container.__vue_app__);
      },
      provide(d, f) {
        return i.provides[d] = f, c;
      },
      runWithContext(d) {
        const f = to;
        to = c;
        try {
          return d();
        } finally {
          to = f;
        }
      }
    };
    return c;
  };
}
let to = null;
function Bn(e, t) {
  if (it) {
    let n = it.provides;
    const o = it.parent && it.parent.provides;
    o === n && (n = it.provides = Object.create(o)), n[e] = t;
  }
}
function Lt(e, t, n = !1) {
  const o = it || nt;
  if (o || to) {
    const s = to ? to._context.provides : o ? o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && Se(t) ? t.call(o && o.proxy) : t;
  }
}
const Pc = {}, Ac = () => Object.create(Pc), Dc = (e) => Object.getPrototypeOf(e) === Pc;
function rh(e, t, n, o = !1) {
  const s = {}, i = Ac();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Rc(e, t, s, i);
  for (const r in e.propsOptions[0])
    r in s || (s[r] = void 0);
  n ? e.props = o ? s : kp(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i;
}
function lh(e, t, n, o) {
  const {
    props: s,
    attrs: i,
    vnode: { patchFlag: r }
  } = e, l = De(s), [a] = e.propsOptions;
  let c = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (o || r > 0) && !(r & 16)
  ) {
    if (r & 8) {
      const d = e.vnode.dynamicProps;
      for (let f = 0; f < d.length; f++) {
        let h = d[f];
        if (ii(e.emitsOptions, h))
          continue;
        const v = t[h];
        if (a)
          if (Le(i, h))
            v !== i[h] && (i[h] = v, c = !0);
          else {
            const w = xt(h);
            s[w] = ur(
              a,
              l,
              w,
              v,
              e,
              !1
            );
          }
        else
          v !== i[h] && (i[h] = v, c = !0);
      }
    }
  } else {
    Rc(e, t, s, i) && (c = !0);
    let d;
    for (const f in l)
      (!t || // for camelCase
      !Le(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = xn(f)) === f || !Le(t, d))) && (a ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[d] !== void 0) && (s[f] = ur(
        a,
        l,
        f,
        void 0,
        e,
        !0
      )) : delete s[f]);
    if (i !== l)
      for (const f in i)
        (!t || !Le(t, f)) && (delete i[f], c = !0);
  }
  c && qt(e.attrs, "set", "");
}
function Rc(e, t, n, o) {
  const [s, i] = e.propsOptions;
  let r = !1, l;
  if (t)
    for (let a in t) {
      if (Io(a))
        continue;
      const c = t[a];
      let d;
      s && Le(s, d = xt(a)) ? !i || !i.includes(d) ? n[d] = c : (l || (l = {}))[d] = c : ii(e.emitsOptions, a) || (!(a in o) || c !== o[a]) && (o[a] = c, r = !0);
    }
  if (i) {
    const a = De(n), c = l || ze;
    for (let d = 0; d < i.length; d++) {
      const f = i[d];
      n[f] = ur(
        s,
        a,
        f,
        c[f],
        e,
        !Le(c, f)
      );
    }
  }
  return r;
}
function ur(e, t, n, o, s, i) {
  const r = e[n];
  if (r != null) {
    const l = Le(r, "default");
    if (l && o === void 0) {
      const a = r.default;
      if (r.type !== Function && !r.skipFactory && Se(a)) {
        const { propsDefaults: c } = s;
        if (n in c)
          o = c[n];
        else {
          const d = es(s);
          o = c[n] = a.call(
            null,
            t
          ), d();
        }
      } else
        o = a;
      s.ce && s.ce._setProp(n, o);
    }
    r[
      0
      /* shouldCast */
    ] && (i && !l ? o = !1 : r[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === xn(n)) && (o = !0));
  }
  return o;
}
const ah = /* @__PURE__ */ new WeakMap();
function Vc(e, t, n = !1) {
  const o = n ? ah : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const i = e.props, r = {}, l = [];
  let a = !1;
  if (!Se(e)) {
    const d = (f) => {
      a = !0;
      const [h, v] = Vc(f, t, !0);
      dt(r, h), v && l.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!i && !a)
    return Fe(e) && o.set(e, Wn), Wn;
  if (Ee(i))
    for (let d = 0; d < i.length; d++) {
      const f = xt(i[d]);
      na(f) && (r[f] = ze);
    }
  else if (i)
    for (const d in i) {
      const f = xt(d);
      if (na(f)) {
        const h = i[d], v = r[f] = Ee(h) || Se(h) ? { type: h } : dt({}, h), w = v.type;
        let x = !1, I = !0;
        if (Ee(w))
          for (let C = 0; C < w.length; ++C) {
            const D = w[C], _ = Se(D) && D.name;
            if (_ === "Boolean") {
              x = !0;
              break;
            } else _ === "String" && (I = !1);
          }
        else
          x = Se(w) && w.name === "Boolean";
        v[
          0
          /* shouldCast */
        ] = x, v[
          1
          /* shouldCastTrue */
        ] = I, (x || Le(v, "default")) && l.push(f);
      }
    }
  const c = [r, l];
  return Fe(e) && o.set(e, c), c;
}
function na(e) {
  return e[0] !== "$" && !Io(e);
}
const Lc = (e) => e[0] === "_" || e === "$stable", Wr = (e) => Ee(e) ? e.map(Dt) : [Dt(e)], uh = (e, t, n) => {
  if (t._n)
    return t;
  const o = bn((...s) => Wr(t(...s)), n);
  return o._c = !1, o;
}, zc = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (Lc(s)) continue;
    const i = e[s];
    if (Se(i))
      t[s] = uh(s, i, o);
    else if (i != null) {
      const r = Wr(i);
      t[s] = () => r;
    }
  }
}, Fc = (e, t) => {
  const n = Wr(t);
  e.slots.default = () => n;
}, Bc = (e, t, n) => {
  for (const o in t)
    (n || o !== "_") && (e[o] = t[o]);
}, ch = (e, t, n) => {
  const o = e.slots = Ac();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Bc(o, t, n), n && Hu(o, "_", s, !0)) : zc(t, o);
  } else t && Fc(e, t);
}, dh = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let i = !0, r = ze;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? i = !1 : Bc(s, t, n) : (i = !t.$stable, zc(t, s)), r = t;
  } else t && (Fc(e, t), r = { default: 1 });
  if (i)
    for (const l in s)
      !Lc(l) && r[l] == null && delete s[l];
}, pt = Ch;
function fh(e) {
  return ph(e);
}
function ph(e, t) {
  const n = Qs();
  n.__VUE__ = !0;
  const {
    insert: o,
    remove: s,
    patchProp: i,
    createElement: r,
    createText: l,
    createComment: a,
    setText: c,
    setElementText: d,
    parentNode: f,
    nextSibling: h,
    setScopeId: v = Vt,
    insertStaticContent: w
  } = e, x = (p, T, y, b = null, k = null, E = null, B = void 0, W = null, Q = !!T.dynamicChildren) => {
    if (p === T)
      return;
    p && !bo(p, T) && (b = _e(p), re(p, k, E, !0), p = null), T.patchFlag === -2 && (Q = !1, T.dynamicChildren = null);
    const { type: A, ref: N, shapeFlag: g } = T;
    switch (A) {
      case ri:
        I(p, T, y, b);
        break;
      case kn:
        C(p, T, y, b);
        break;
      case Mi:
        p == null && D(T, y, b, B);
        break;
      case ye:
        U(
          p,
          T,
          y,
          b,
          k,
          E,
          B,
          W,
          Q
        );
        break;
      default:
        g & 1 ? z(
          p,
          T,
          y,
          b,
          k,
          E,
          B,
          W,
          Q
        ) : g & 6 ? K(
          p,
          T,
          y,
          b,
          k,
          E,
          B,
          W,
          Q
        ) : (g & 64 || g & 128) && A.process(
          p,
          T,
          y,
          b,
          k,
          E,
          B,
          W,
          Q,
          ke
        );
    }
    N != null && k && Rs(N, p && p.ref, E, T || p, !T);
  }, I = (p, T, y, b) => {
    if (p == null)
      o(
        T.el = l(T.children),
        y,
        b
      );
    else {
      const k = T.el = p.el;
      T.children !== p.children && c(k, T.children);
    }
  }, C = (p, T, y, b) => {
    p == null ? o(
      T.el = a(T.children || ""),
      y,
      b
    ) : T.el = p.el;
  }, D = (p, T, y, b) => {
    [p.el, p.anchor] = w(
      p.children,
      T,
      y,
      b,
      p.el,
      p.anchor
    );
  }, _ = ({ el: p, anchor: T }, y, b) => {
    let k;
    for (; p && p !== T; )
      k = h(p), o(p, y, b), p = k;
    o(T, y, b);
  }, m = ({ el: p, anchor: T }) => {
    let y;
    for (; p && p !== T; )
      y = h(p), s(p), p = y;
    s(T);
  }, z = (p, T, y, b, k, E, B, W, Q) => {
    T.type === "svg" ? B = "svg" : T.type === "math" && (B = "mathml"), p == null ? Y(
      T,
      y,
      b,
      k,
      E,
      B,
      W,
      Q
    ) : P(
      p,
      T,
      k,
      E,
      B,
      W,
      Q
    );
  }, Y = (p, T, y, b, k, E, B, W) => {
    let Q, A;
    const { props: N, shapeFlag: g, transition: Z, dirs: ie } = p;
    if (Q = p.el = r(
      p.type,
      E,
      N && N.is,
      N
    ), g & 8 ? d(Q, p.children) : g & 16 && j(
      p.children,
      Q,
      null,
      b,
      k,
      Ni(p, E),
      B,
      W
    ), ie && $n(p, null, b, "created"), q(Q, p, p.scopeId, B, b), N) {
      for (const Ce in N)
        Ce !== "value" && !Io(Ce) && i(Q, Ce, null, N[Ce], E, b);
      "value" in N && i(Q, "value", null, N.value, E), (A = N.onVnodeBeforeMount) && Ot(A, b, p);
    }
    ie && $n(p, null, b, "beforeMount");
    const ge = hh(k, Z);
    ge && Z.beforeEnter(Q), o(Q, T, y), ((A = N && N.onVnodeMounted) || ge || ie) && pt(() => {
      A && Ot(A, b, p), ge && Z.enter(Q), ie && $n(p, null, b, "mounted");
    }, k);
  }, q = (p, T, y, b, k) => {
    if (y && v(p, y), b)
      for (let E = 0; E < b.length; E++)
        v(p, b[E]);
    if (k) {
      let E = k.subTree;
      if (T === E || qc(E.type) && (E.ssContent === T || E.ssFallback === T)) {
        const B = k.vnode;
        q(
          p,
          B,
          B.scopeId,
          B.slotScopeIds,
          k.parent
        );
      }
    }
  }, j = (p, T, y, b, k, E, B, W, Q = 0) => {
    for (let A = Q; A < p.length; A++) {
      const N = p[A] = W ? cn(p[A]) : Dt(p[A]);
      x(
        null,
        N,
        T,
        y,
        b,
        k,
        E,
        B,
        W
      );
    }
  }, P = (p, T, y, b, k, E, B) => {
    const W = T.el = p.el;
    let { patchFlag: Q, dynamicChildren: A, dirs: N } = T;
    Q |= p.patchFlag & 16;
    const g = p.props || ze, Z = T.props || ze;
    let ie;
    if (y && In(y, !1), (ie = Z.onVnodeBeforeUpdate) && Ot(ie, y, T, p), N && $n(T, p, y, "beforeUpdate"), y && In(y, !0), (g.innerHTML && Z.innerHTML == null || g.textContent && Z.textContent == null) && d(W, ""), A ? L(
      p.dynamicChildren,
      A,
      W,
      y,
      b,
      Ni(T, k),
      E
    ) : B || G(
      p,
      T,
      W,
      null,
      y,
      b,
      Ni(T, k),
      E,
      !1
    ), Q > 0) {
      if (Q & 16)
        X(W, g, Z, y, k);
      else if (Q & 2 && g.class !== Z.class && i(W, "class", null, Z.class, k), Q & 4 && i(W, "style", g.style, Z.style, k), Q & 8) {
        const ge = T.dynamicProps;
        for (let Ce = 0; Ce < ge.length; Ce++) {
          const $e = ge[Ce], Ge = g[$e], st = Z[$e];
          (st !== Ge || $e === "value") && i(W, $e, Ge, st, k, y);
        }
      }
      Q & 1 && p.children !== T.children && d(W, T.children);
    } else !B && A == null && X(W, g, Z, y, k);
    ((ie = Z.onVnodeUpdated) || N) && pt(() => {
      ie && Ot(ie, y, T, p), N && $n(T, p, y, "updated");
    }, b);
  }, L = (p, T, y, b, k, E, B) => {
    for (let W = 0; W < T.length; W++) {
      const Q = p[W], A = T[W], N = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        Q.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (Q.type === ye || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !bo(Q, A) || // - In the case of a component, it could contain anything.
        Q.shapeFlag & 70) ? f(Q.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          y
        )
      );
      x(
        Q,
        A,
        N,
        null,
        b,
        k,
        E,
        B,
        !0
      );
    }
  }, X = (p, T, y, b, k) => {
    if (T !== y) {
      if (T !== ze)
        for (const E in T)
          !Io(E) && !(E in y) && i(
            p,
            E,
            T[E],
            null,
            k,
            b
          );
      for (const E in y) {
        if (Io(E)) continue;
        const B = y[E], W = T[E];
        B !== W && E !== "value" && i(p, E, W, B, k, b);
      }
      "value" in y && i(p, "value", T.value, y.value, k);
    }
  }, U = (p, T, y, b, k, E, B, W, Q) => {
    const A = T.el = p ? p.el : l(""), N = T.anchor = p ? p.anchor : l("");
    let { patchFlag: g, dynamicChildren: Z, slotScopeIds: ie } = T;
    ie && (W = W ? W.concat(ie) : ie), p == null ? (o(A, y, b), o(N, y, b), j(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      T.children || [],
      y,
      N,
      k,
      E,
      B,
      W,
      Q
    )) : g > 0 && g & 64 && Z && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren ? (L(
      p.dynamicChildren,
      Z,
      y,
      k,
      E,
      B,
      W
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (T.key != null || k && T === k.subTree) && Zr(
      p,
      T,
      !0
      /* shallow */
    )) : G(
      p,
      T,
      y,
      N,
      k,
      E,
      B,
      W,
      Q
    );
  }, K = (p, T, y, b, k, E, B, W, Q) => {
    T.slotScopeIds = W, p == null ? T.shapeFlag & 512 ? k.ctx.activate(
      T,
      y,
      b,
      B,
      Q
    ) : $(
      T,
      y,
      b,
      k,
      E,
      B,
      Q
    ) : V(p, T, Q);
  }, $ = (p, T, y, b, k, E, B) => {
    const W = p.component = Mh(
      p,
      b,
      k
    );
    if (bc(p) && (W.ctx.renderer = ke), Th(W, !1, B), W.asyncDep) {
      if (k && k.registerDep(W, M, B), !p.el) {
        const Q = W.subTree = ne(kn);
        C(null, Q, T, y);
      }
    } else
      M(
        W,
        p,
        T,
        y,
        k,
        E,
        B
      );
  }, V = (p, T, y) => {
    const b = T.component = p.component;
    if (Eh(p, T, y))
      if (b.asyncDep && !b.asyncResolved) {
        R(b, T, y);
        return;
      } else
        b.next = T, b.update();
    else
      T.el = p.el, b.vnode = T;
  }, M = (p, T, y, b, k, E, B) => {
    const W = () => {
      if (p.isMounted) {
        let { next: g, bu: Z, u: ie, parent: ge, vnode: Ce } = p;
        {
          const _t = Hc(p);
          if (_t) {
            g && (g.el = Ce.el, R(p, g, B)), _t.asyncDep.then(() => {
              p.isUnmounted || W();
            });
            return;
          }
        }
        let $e = g, Ge;
        In(p, !1), g ? (g.el = Ce.el, R(p, g, B)) : g = Ce, Z && ws(Z), (Ge = g.props && g.props.onVnodeBeforeUpdate) && Ot(Ge, ge, g, Ce), In(p, !0);
        const st = sa(p), bt = p.subTree;
        p.subTree = st, x(
          bt,
          st,
          // parent may have changed if it's in a teleport
          f(bt.el),
          // anchor may have changed if it's in a fragment
          _e(bt),
          p,
          k,
          E
        ), g.el = st.el, $e === null && xh(p, st.el), ie && pt(ie, k), (Ge = g.props && g.props.onVnodeUpdated) && pt(
          () => Ot(Ge, ge, g, Ce),
          k
        );
      } else {
        let g;
        const { el: Z, props: ie } = T, { bm: ge, m: Ce, parent: $e, root: Ge, type: st } = p, bt = eo(T);
        In(p, !1), ge && ws(ge), !bt && (g = ie && ie.onVnodeBeforeMount) && Ot(g, $e, T), In(p, !0);
        {
          Ge.ce && Ge.ce._injectChildStyle(st);
          const _t = p.subTree = sa(p);
          x(
            null,
            _t,
            y,
            b,
            p,
            k,
            E
          ), T.el = _t.el;
        }
        if (Ce && pt(Ce, k), !bt && (g = ie && ie.onVnodeMounted)) {
          const _t = T;
          pt(
            () => Ot(g, $e, _t),
            k
          );
        }
        (T.shapeFlag & 256 || $e && eo($e.vnode) && $e.vnode.shapeFlag & 256) && p.a && pt(p.a, k), p.isMounted = !0, T = y = b = null;
      }
    };
    p.scope.on();
    const Q = p.effect = new Xu(W);
    p.scope.off();
    const A = p.update = Q.run.bind(Q), N = p.job = Q.runIfDirty.bind(Q);
    N.i = p, N.id = p.uid, Q.scheduler = () => Xr(N), In(p, !0), A();
  }, R = (p, T, y) => {
    T.component = p;
    const b = p.vnode.props;
    p.vnode = T, p.next = null, lh(p, T.props, b, y), dh(p, T.children, y), Cn(), Yl(p), Sn();
  }, G = (p, T, y, b, k, E, B, W, Q = !1) => {
    const A = p && p.children, N = p ? p.shapeFlag : 0, g = T.children, { patchFlag: Z, shapeFlag: ie } = T;
    if (Z > 0) {
      if (Z & 128) {
        ue(
          A,
          g,
          y,
          b,
          k,
          E,
          B,
          W,
          Q
        );
        return;
      } else if (Z & 256) {
        oe(
          A,
          g,
          y,
          b,
          k,
          E,
          B,
          W,
          Q
        );
        return;
      }
    }
    ie & 8 ? (N & 16 && te(A, k, E), g !== A && d(y, g)) : N & 16 ? ie & 16 ? ue(
      A,
      g,
      y,
      b,
      k,
      E,
      B,
      W,
      Q
    ) : te(A, k, E, !0) : (N & 8 && d(y, ""), ie & 16 && j(
      g,
      y,
      b,
      k,
      E,
      B,
      W,
      Q
    ));
  }, oe = (p, T, y, b, k, E, B, W, Q) => {
    p = p || Wn, T = T || Wn;
    const A = p.length, N = T.length, g = Math.min(A, N);
    let Z;
    for (Z = 0; Z < g; Z++) {
      const ie = T[Z] = Q ? cn(T[Z]) : Dt(T[Z]);
      x(
        p[Z],
        ie,
        y,
        null,
        k,
        E,
        B,
        W,
        Q
      );
    }
    A > N ? te(
      p,
      k,
      E,
      !0,
      !1,
      g
    ) : j(
      T,
      y,
      b,
      k,
      E,
      B,
      W,
      Q,
      g
    );
  }, ue = (p, T, y, b, k, E, B, W, Q) => {
    let A = 0;
    const N = T.length;
    let g = p.length - 1, Z = N - 1;
    for (; A <= g && A <= Z; ) {
      const ie = p[A], ge = T[A] = Q ? cn(T[A]) : Dt(T[A]);
      if (bo(ie, ge))
        x(
          ie,
          ge,
          y,
          null,
          k,
          E,
          B,
          W,
          Q
        );
      else
        break;
      A++;
    }
    for (; A <= g && A <= Z; ) {
      const ie = p[g], ge = T[Z] = Q ? cn(T[Z]) : Dt(T[Z]);
      if (bo(ie, ge))
        x(
          ie,
          ge,
          y,
          null,
          k,
          E,
          B,
          W,
          Q
        );
      else
        break;
      g--, Z--;
    }
    if (A > g) {
      if (A <= Z) {
        const ie = Z + 1, ge = ie < N ? T[ie].el : b;
        for (; A <= Z; )
          x(
            null,
            T[A] = Q ? cn(T[A]) : Dt(T[A]),
            y,
            ge,
            k,
            E,
            B,
            W,
            Q
          ), A++;
      }
    } else if (A > Z)
      for (; A <= g; )
        re(p[A], k, E, !0), A++;
    else {
      const ie = A, ge = A, Ce = /* @__PURE__ */ new Map();
      for (A = ge; A <= Z; A++) {
        const at = T[A] = Q ? cn(T[A]) : Dt(T[A]);
        at.key != null && Ce.set(at.key, A);
      }
      let $e, Ge = 0;
      const st = Z - ge + 1;
      let bt = !1, _t = 0;
      const rn = new Array(st);
      for (A = 0; A < st; A++) rn[A] = 0;
      for (A = ie; A <= g; A++) {
        const at = p[A];
        if (Ge >= st) {
          re(at, k, E, !0);
          continue;
        }
        let wt;
        if (at.key != null)
          wt = Ce.get(at.key);
        else
          for ($e = ge; $e <= Z; $e++)
            if (rn[$e - ge] === 0 && bo(at, T[$e])) {
              wt = $e;
              break;
            }
        wt === void 0 ? re(at, k, E, !0) : (rn[wt - ge] = A + 1, wt >= _t ? _t = wt : bt = !0, x(
          at,
          T[wt],
          y,
          null,
          k,
          E,
          B,
          W,
          Q
        ), Ge++);
      }
      const ho = bt ? vh(rn) : Wn;
      for ($e = ho.length - 1, A = st - 1; A >= 0; A--) {
        const at = ge + A, wt = T[at], vo = at + 1 < N ? T[at + 1].el : b;
        rn[A] === 0 ? x(
          null,
          wt,
          y,
          vo,
          k,
          E,
          B,
          W,
          Q
        ) : bt && ($e < 0 || A !== ho[$e] ? de(wt, y, vo, 2) : $e--);
      }
    }
  }, de = (p, T, y, b, k = null) => {
    const { el: E, type: B, transition: W, children: Q, shapeFlag: A } = p;
    if (A & 6) {
      de(p.component.subTree, T, y, b);
      return;
    }
    if (A & 128) {
      p.suspense.move(T, y, b);
      return;
    }
    if (A & 64) {
      B.move(p, T, y, ke);
      return;
    }
    if (B === ye) {
      o(E, T, y);
      for (let g = 0; g < Q.length; g++)
        de(Q[g], T, y, b);
      o(p.anchor, T, y);
      return;
    }
    if (B === Mi) {
      _(p, T, y);
      return;
    }
    if (b !== 2 && A & 1 && W)
      if (b === 0)
        W.beforeEnter(E), o(E, T, y), pt(() => W.enter(E), k);
      else {
        const { leave: g, delayLeave: Z, afterLeave: ie } = W, ge = () => o(E, T, y), Ce = () => {
          g(E, () => {
            ge(), ie && ie();
          });
        };
        Z ? Z(E, ge, Ce) : Ce();
      }
    else
      o(E, T, y);
  }, re = (p, T, y, b = !1, k = !1) => {
    const {
      type: E,
      props: B,
      ref: W,
      children: Q,
      dynamicChildren: A,
      shapeFlag: N,
      patchFlag: g,
      dirs: Z,
      cacheIndex: ie
    } = p;
    if (g === -2 && (k = !1), W != null && Rs(W, null, y, p, !0), ie != null && (T.renderCache[ie] = void 0), N & 256) {
      T.ctx.deactivate(p);
      return;
    }
    const ge = N & 1 && Z, Ce = !eo(p);
    let $e;
    if (Ce && ($e = B && B.onVnodeBeforeUnmount) && Ot($e, T, p), N & 6)
      he(p.component, y, b);
    else {
      if (N & 128) {
        p.suspense.unmount(y, b);
        return;
      }
      ge && $n(p, null, T, "beforeUnmount"), N & 64 ? p.type.remove(
        p,
        T,
        y,
        ke,
        b
      ) : A && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !A.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (E !== ye || g > 0 && g & 64) ? te(
        A,
        T,
        y,
        !1,
        !0
      ) : (E === ye && g & 384 || !k && N & 16) && te(Q, T, y), b && fe(p);
    }
    (Ce && ($e = B && B.onVnodeUnmounted) || ge) && pt(() => {
      $e && Ot($e, T, p), ge && $n(p, null, T, "unmounted");
    }, y);
  }, fe = (p) => {
    const { type: T, el: y, anchor: b, transition: k } = p;
    if (T === ye) {
      ce(y, b);
      return;
    }
    if (T === Mi) {
      m(p);
      return;
    }
    const E = () => {
      s(y), k && !k.persisted && k.afterLeave && k.afterLeave();
    };
    if (p.shapeFlag & 1 && k && !k.persisted) {
      const { leave: B, delayLeave: W } = k, Q = () => B(y, E);
      W ? W(p.el, E, Q) : Q();
    } else
      E();
  }, ce = (p, T) => {
    let y;
    for (; p !== T; )
      y = h(p), s(p), p = y;
    s(T);
  }, he = (p, T, y) => {
    const { bum: b, scope: k, job: E, subTree: B, um: W, m: Q, a: A } = p;
    oa(Q), oa(A), b && ws(b), k.stop(), E && (E.flags |= 8, re(B, p, T, y)), W && pt(W, T), pt(() => {
      p.isUnmounted = !0;
    }, T), T && T.pendingBranch && !T.isUnmounted && p.asyncDep && !p.asyncResolved && p.suspenseId === T.pendingId && (T.deps--, T.deps === 0 && T.resolve());
  }, te = (p, T, y, b = !1, k = !1, E = 0) => {
    for (let B = E; B < p.length; B++)
      re(p[B], T, y, b, k);
  }, _e = (p) => {
    if (p.shapeFlag & 6)
      return _e(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const T = h(p.anchor || p.el), y = T && T[vc];
    return y ? h(y) : T;
  };
  let xe = !1;
  const we = (p, T, y) => {
    p == null ? T._vnode && re(T._vnode, null, null, !0) : x(
      T._vnode || null,
      p,
      T,
      null,
      null,
      null,
      y
    ), T._vnode = p, xe || (xe = !0, Yl(), fc(), xe = !1);
  }, ke = {
    p: x,
    um: re,
    m: de,
    r: fe,
    mt: $,
    mc: j,
    pc: G,
    pbc: L,
    n: _e,
    o: e
  };
  return {
    render: we,
    hydrate: void 0,
    createApp: ih(we)
  };
}
function Ni({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function In({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function hh(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Zr(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (Ee(o) && Ee(s))
    for (let i = 0; i < o.length; i++) {
      const r = o[i];
      let l = s[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[i] = cn(s[i]), l.el = r.el), !n && l.patchFlag !== -2 && Zr(r, l)), l.type === ri && (l.el = r.el);
    }
}
function vh(e) {
  const t = e.slice(), n = [0];
  let o, s, i, r, l;
  const a = e.length;
  for (o = 0; o < a; o++) {
    const c = e[o];
    if (c !== 0) {
      if (s = n[n.length - 1], e[s] < c) {
        t[o] = s, n.push(o);
        continue;
      }
      for (i = 0, r = n.length - 1; i < r; )
        l = i + r >> 1, e[n[l]] < c ? i = l + 1 : r = l;
      c < e[n[i]] && (i > 0 && (t[o] = n[i - 1]), n[i] = o);
    }
  }
  for (i = n.length, r = n[i - 1]; i-- > 0; )
    n[i] = r, r = t[r];
  return n;
}
function Hc(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Hc(t);
}
function oa(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const gh = Symbol.for("v-scx"), mh = () => Lt(gh);
function Ne(e, t, n) {
  return Uc(e, t, n);
}
function Uc(e, t, n = ze) {
  const { immediate: o, deep: s, flush: i, once: r } = n, l = dt({}, n), a = t && o || !t && i !== "post";
  let c;
  if (Bo) {
    if (i === "sync") {
      const v = mh();
      c = v.__watcherHandles || (v.__watcherHandles = []);
    } else if (!a) {
      const v = () => {
      };
      return v.stop = Vt, v.resume = Vt, v.pause = Vt, v;
    }
  }
  const d = it;
  l.call = (v, w, x) => Bt(v, d, w, x);
  let f = !1;
  i === "post" ? l.scheduler = (v) => {
    pt(v, d && d.suspense);
  } : i !== "sync" && (f = !0, l.scheduler = (v, w) => {
    w ? v() : Xr(v);
  }), l.augmentJob = (v) => {
    t && (v.flags |= 4), f && (v.flags |= 2, d && (v.id = d.uid, v.i = d));
  };
  const h = Ap(e, t, l);
  return Bo && (c ? c.push(h) : a && h()), h;
}
function yh(e, t, n) {
  const o = this.proxy, s = Ue(e) ? e.includes(".") ? jc(o, e) : () => o[e] : e.bind(o, o);
  let i;
  Se(t) ? i = t : (i = t.handler, n = t);
  const r = es(this), l = Uc(s, i.bind(o), n);
  return r(), l;
}
function jc(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
const bh = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${xt(t)}Modifiers`] || e[`${xn(t)}Modifiers`];
function _h(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || ze;
  let s = n;
  const i = t.startsWith("update:"), r = i && bh(o, t.slice(7));
  r && (r.trim && (s = n.map((d) => Ue(d) ? d.trim() : d)), r.number && (s = n.map(Ts)));
  let l, a = o[l = ki(t)] || // also try camelCase event handler (#2249)
  o[l = ki(xt(t))];
  !a && i && (a = o[l = ki(xn(t))]), a && Bt(
    a,
    e,
    6,
    s
  );
  const c = o[l + "Once"];
  if (c) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[l])
      return;
    e.emitted[l] = !0, Bt(
      c,
      e,
      6,
      s
    );
  }
}
function Gc(e, t, n = !1) {
  const o = t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const i = e.emits;
  let r = {}, l = !1;
  if (!Se(e)) {
    const a = (c) => {
      const d = Gc(c, t, !0);
      d && (l = !0, dt(r, d));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !l ? (Fe(e) && o.set(e, null), null) : (Ee(i) ? i.forEach((a) => r[a] = null) : dt(r, i), Fe(e) && o.set(e, r), r);
}
function ii(e, t) {
  return !e || !Ws(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Le(e, t[0].toLowerCase() + t.slice(1)) || Le(e, xn(t)) || Le(e, t));
}
function sa(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: s,
    propsOptions: [i],
    slots: r,
    attrs: l,
    emit: a,
    render: c,
    renderCache: d,
    props: f,
    data: h,
    setupState: v,
    ctx: w,
    inheritAttrs: x
  } = e, I = Ds(e);
  let C, D;
  try {
    if (n.shapeFlag & 4) {
      const m = s || o, z = m;
      C = Dt(
        c.call(
          z,
          m,
          d,
          f,
          v,
          h,
          w
        )
      ), D = l;
    } else {
      const m = t;
      C = Dt(
        m.length > 1 ? m(
          f,
          { attrs: l, slots: r, emit: a }
        ) : m(
          f,
          null
        )
      ), D = t.props ? l : wh(l);
    }
  } catch (m) {
    Po.length = 0, ni(m, e, 1), C = ne(kn);
  }
  let _ = C;
  if (D && x !== !1) {
    const m = Object.keys(D), { shapeFlag: z } = _;
    m.length && z & 7 && (i && m.some(Rr) && (D = kh(
      D,
      i
    )), _ = ro(_, D, !1, !0));
  }
  return n.dirs && (_ = ro(_, null, !1, !0), _.dirs = _.dirs ? _.dirs.concat(n.dirs) : n.dirs), n.transition && Kr(_, n.transition), C = _, Ds(I), C;
}
const wh = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || Ws(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, kh = (e, t) => {
  const n = {};
  for (const o in e)
    (!Rr(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
};
function Eh(e, t, n) {
  const { props: o, children: s, component: i } = e, { props: r, children: l, patchFlag: a } = t, c = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return o ? ia(o, r, c) : !!r;
    if (a & 8) {
      const d = t.dynamicProps;
      for (let f = 0; f < d.length; f++) {
        const h = d[f];
        if (r[h] !== o[h] && !ii(c, h))
          return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : o === r ? !1 : o ? r ? ia(o, r, c) : !0 : !!r;
  return !1;
}
function ia(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const i = o[s];
    if (t[i] !== e[i] && !ii(n, i))
      return !0;
  }
  return !1;
}
function xh({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const qc = (e) => e.__isSuspense;
function Ch(e, t) {
  t && t.pendingBranch ? Ee(e) ? t.effects.push(...e) : t.effects.push(e) : Vp(e);
}
const ye = Symbol.for("v-fgt"), ri = Symbol.for("v-txt"), kn = Symbol.for("v-cmt"), Mi = Symbol.for("v-stc"), Po = [];
let gt = null;
function S(e = !1) {
  Po.push(gt = e ? null : []);
}
function Sh() {
  Po.pop(), gt = Po[Po.length - 1] || null;
}
let io = 1;
function ra(e, t = !1) {
  io += e, e < 0 && gt && t && (gt.hasOnce = !0);
}
function Yc(e) {
  return e.dynamicChildren = io > 0 ? gt || Wn : null, Sh(), io > 0 && gt && gt.push(e), e;
}
function O(e, t, n, o, s, i) {
  return Yc(
    u(
      e,
      t,
      n,
      o,
      s,
      i,
      !0
    )
  );
}
function et(e, t, n, o, s) {
  return Yc(
    ne(
      e,
      t,
      n,
      o,
      s,
      !0
    )
  );
}
function Fo(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function bo(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Xc = ({ key: e }) => e ?? null, xs = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Ue(e) || Ke(e) || Se(e) ? { i: nt, r: e, k: t, f: !!n } : e : null);
function u(e, t = null, n = null, o = 0, s = null, i = e === ye ? 0 : 1, r = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Xc(t),
    ref: t && xs(t),
    scopeId: hc,
    slotScopeIds: null,
    children: n,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetStart: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag: i,
    patchFlag: o,
    dynamicProps: s,
    dynamicChildren: null,
    appContext: null,
    ctx: nt
  };
  return l ? (Jr(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= Ue(n) ? 8 : 16), io > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  gt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && gt.push(a), a;
}
const ne = $h;
function $h(e, t = null, n = null, o = 0, s = null, i = !1) {
  if ((!e || e === xc) && (e = kn), Fo(e)) {
    const l = ro(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Jr(l, n), io > 0 && !i && gt && (l.shapeFlag & 6 ? gt[gt.indexOf(e)] = l : gt.push(l)), l.patchFlag = -2, l;
  }
  if (Dh(e) && (e = e.__vccOpts), t) {
    t = Cs(t);
    let { class: l, style: a } = t;
    l && !Ue(l) && (t.class = me(l)), Fe(a) && (Yr(a) && !Ee(a) && (a = dt({}, a)), t.style = rt(a));
  }
  const r = Ue(e) ? 1 : qc(e) ? 128 : Lp(e) ? 64 : Fe(e) ? 4 : Se(e) ? 2 : 0;
  return u(
    e,
    t,
    n,
    o,
    s,
    r,
    i,
    !0
  );
}
function Cs(e) {
  return e ? Yr(e) || Dc(e) ? dt({}, e) : e : null;
}
function ro(e, t, n = !1, o = !1) {
  const { props: s, ref: i, patchFlag: r, children: l, transition: a } = e, c = t ? Qr(s || {}, t) : s, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Xc(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? Ee(i) ? i.concat(xs(t)) : [i, xs(t)] : xs(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: l,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== ye ? r === -1 ? 16 : r | 16 : r,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: a,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && ro(e.ssContent),
    ssFallback: e.ssFallback && ro(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && o && Kr(
    d,
    a.clone(d)
  ), d;
}
function ve(e = " ", t = 0) {
  return ne(ri, null, e, t);
}
function le(e = "", t = !1) {
  return t ? (S(), et(kn, null, e)) : ne(kn, null, e);
}
function Dt(e) {
  return e == null || typeof e == "boolean" ? ne(kn) : Ee(e) ? ne(
    ye,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : Fo(e) ? cn(e) : ne(ri, null, String(e));
}
function cn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : ro(e);
}
function Jr(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (Ee(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Jr(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !Dc(t) ? t._ctx = nt : s === 3 && nt && (nt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Se(t) ? (t = { default: t, _ctx: nt }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [ve(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function Qr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = me([t.class, o.class]));
      else if (s === "style")
        t.style = rt([t.style, o.style]);
      else if (Ws(s)) {
        const i = t[s], r = o[s];
        r && i !== r && !(Ee(i) && i.includes(r)) && (t[s] = i ? [].concat(i, r) : r);
      } else s !== "" && (t[s] = o[s]);
  }
  return t;
}
function Ot(e, t, n, o = null) {
  Bt(e, t, 7, [
    n,
    o
  ]);
}
const Ih = Oc();
let Nh = 0;
function Mh(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || Ih, i = {
    uid: Nh++,
    vnode: e,
    type: o,
    parent: t,
    appContext: s,
    root: null,
    // to be immediately set
    next: null,
    subTree: null,
    // will be set synchronously right after creation
    effect: null,
    update: null,
    // will be set synchronously right after creation
    job: null,
    scope: new qu(
      !0
      /* detached */
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: t ? t.provides : Object.create(s.provides),
    ids: t ? t.ids : ["", 0, 0],
    accessCache: null,
    renderCache: [],
    // local resolved assets
    components: null,
    directives: null,
    // resolved props and emits options
    propsOptions: Vc(o, s),
    emitsOptions: Gc(o, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: ze,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: ze,
    data: ze,
    props: ze,
    attrs: ze,
    slots: ze,
    refs: ze,
    setupState: ze,
    setupContext: null,
    // suspense related
    suspense: n,
    suspenseId: n ? n.pendingId : 0,
    asyncDep: null,
    asyncResolved: !1,
    // lifecycle hooks
    // not using enums here because it results in computed properties
    isMounted: !1,
    isUnmounted: !1,
    isDeactivated: !1,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = _h.bind(null, i), e.ce && e.ce(i), i;
}
let it = null;
const po = () => it || nt;
let Ls, cr;
{
  const e = Qs(), t = (n, o) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(o), (i) => {
      s.length > 1 ? s.forEach((r) => r(i)) : s[0](i);
    };
  };
  Ls = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => it = n
  ), cr = t(
    "__VUE_SSR_SETTERS__",
    (n) => Bo = n
  );
}
const es = (e) => {
  const t = it;
  return Ls(e), e.scope.on(), () => {
    e.scope.off(), Ls(t);
  };
}, la = () => {
  it && it.scope.off(), Ls(null);
};
function Kc(e) {
  return e.vnode.shapeFlag & 4;
}
let Bo = !1;
function Th(e, t = !1, n = !1) {
  t && cr(t);
  const { props: o, children: s } = e.vnode, i = Kc(e);
  rh(e, o, i, t), ch(e, s, n);
  const r = i ? Oh(e, t) : void 0;
  return t && cr(!1), r;
}
function Oh(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Wp);
  const { setup: o } = n;
  if (o) {
    Cn();
    const s = e.setupContext = o.length > 1 ? Zc(e) : null, i = es(e), r = Qo(
      o,
      e,
      0,
      [
        e.props,
        s
      ]
    ), l = zu(r);
    if (Sn(), i(), (l || e.sp) && !eo(e) && yc(e), l) {
      if (r.then(la, la), t)
        return r.then((a) => {
          aa(e, a);
        }).catch((a) => {
          ni(a, e, 0);
        });
      e.asyncDep = r;
    } else
      aa(e, r);
  } else
    Wc(e);
}
function aa(e, t, n) {
  Se(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Fe(t) && (e.setupState = ac(t)), Wc(e);
}
function Wc(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || Vt);
  {
    const s = es(e);
    Cn();
    try {
      Qp(e);
    } finally {
      Sn(), s();
    }
  }
}
const Ph = {
  get(e, t) {
    return ut(e, "get", ""), e[t];
  }
};
function Zc(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Ph),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function li(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ac(Dn(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Oo)
        return Oo[n](e);
    },
    has(t, n) {
      return n in t || n in Oo;
    }
  })) : e.proxy;
}
function Ah(e, t = !0) {
  return Se(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Dh(e) {
  return Se(e) && "__vccOpts" in e;
}
const ae = (e, t) => Op(e, t, Bo);
function Ve(e, t, n) {
  const o = arguments.length;
  return o === 2 ? Fe(t) && !Ee(t) ? Fo(t) ? ne(e, null, [t]) : ne(e, t) : ne(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : o === 3 && Fo(n) && (n = [n]), ne(e, t, n));
}
function Rh(e, t) {
  const n = e.memo;
  if (n.length != t.length)
    return !1;
  for (let o = 0; o < n.length; o++)
    if (Zt(n[o], t[o]))
      return !1;
  return io > 0 && gt && gt.push(e), !0;
}
const Vh = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let dr;
const ua = typeof window < "u" && window.trustedTypes;
if (ua)
  try {
    dr = /* @__PURE__ */ ua.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Jc = dr ? (e) => dr.createHTML(e) : (e) => e, Lh = "http://www.w3.org/2000/svg", zh = "http://www.w3.org/1998/Math/MathML", Gt = typeof document < "u" ? document : null, ca = Gt && /* @__PURE__ */ Gt.createElement("template"), Fh = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t === "svg" ? Gt.createElementNS(Lh, e) : t === "mathml" ? Gt.createElementNS(zh, e) : n ? Gt.createElement(e, { is: n }) : Gt.createElement(e);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => Gt.createTextNode(e),
  createComment: (e) => Gt.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => Gt.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, o, s, i) {
    const r = n ? n.previousSibling : t.lastChild;
    if (s && (s === i || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)); )
        ;
    else {
      ca.innerHTML = Jc(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const l = ca.content;
      if (o === "svg" || o === "mathml") {
        const a = l.firstChild;
        for (; a.firstChild; )
          l.appendChild(a.firstChild);
        l.removeChild(a);
      }
      t.insertBefore(l, n);
    }
    return [
      // first
      r ? r.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Bh = Symbol("_vtc");
function Hh(e, t, n) {
  const o = e[Bh];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const da = Symbol("_vod"), Uh = Symbol("_vsh"), jh = Symbol(""), Gh = /(^|;)\s*display\s*:/;
function qh(e, t, n) {
  const o = e.style, s = Ue(n);
  let i = !1;
  if (n && !s) {
    if (t)
      if (Ue(t))
        for (const r of t.split(";")) {
          const l = r.slice(0, r.indexOf(":")).trim();
          n[l] == null && Ss(o, l, "");
        }
      else
        for (const r in t)
          n[r] == null && Ss(o, r, "");
    for (const r in n)
      r === "display" && (i = !0), Ss(o, r, n[r]);
  } else if (s) {
    if (t !== n) {
      const r = o[jh];
      r && (n += ";" + r), o.cssText = n, i = Gh.test(n);
    }
  } else t && e.removeAttribute("style");
  da in e && (e[da] = i ? o.display : "", e[Uh] && (o.display = "none"));
}
const fa = /\s*!important$/;
function Ss(e, t, n) {
  if (Ee(n))
    n.forEach((o) => Ss(e, t, o));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Yh(e, t);
    fa.test(n) ? e.setProperty(
      xn(o),
      n.replace(fa, ""),
      "important"
    ) : e[o] = n;
  }
}
const pa = ["Webkit", "Moz", "ms"], Ti = {};
function Yh(e, t) {
  const n = Ti[t];
  if (n)
    return n;
  let o = xt(t);
  if (o !== "filter" && o in e)
    return Ti[t] = o;
  o = Js(o);
  for (let s = 0; s < pa.length; s++) {
    const i = pa[s] + o;
    if (i in e)
      return Ti[t] = i;
  }
  return t;
}
const ha = "http://www.w3.org/1999/xlink";
function va(e, t, n, o, s, i = tp(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(ha, t.slice(6, t.length)) : e.setAttributeNS(ha, t, n) : n == null || i && !Uu(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : Nt(n) ? String(n) : n
  );
}
function ga(e, t, n, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Jc(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const l = i === "OPTION" ? e.getAttribute("value") || "" : e.value, a = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (l !== a || !("_value" in e)) && (e.value = a), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let r = !1;
  if (n === "" || n == null) {
    const l = typeof e[t];
    l === "boolean" ? n = Uu(n) : n == null && l === "string" ? (n = "", r = !0) : l === "number" && (n = 0, r = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  r && e.removeAttribute(s || t);
}
function pn(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Xh(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const ma = Symbol("_vei");
function Kh(e, t, n, o, s = null) {
  const i = e[ma] || (e[ma] = {}), r = i[t];
  if (o && r)
    r.value = o;
  else {
    const [l, a] = Wh(t);
    if (o) {
      const c = i[t] = Qh(
        o,
        s
      );
      pn(e, l, c, a);
    } else r && (Xh(e, l, r, a), i[t] = void 0);
  }
}
const ya = /(?:Once|Passive|Capture)$/;
function Wh(e) {
  let t;
  if (ya.test(e)) {
    t = {};
    let o;
    for (; o = e.match(ya); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : xn(e.slice(2)), t];
}
let Oi = 0;
const Zh = /* @__PURE__ */ Promise.resolve(), Jh = () => Oi || (Zh.then(() => Oi = 0), Oi = Date.now());
function Qh(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    Bt(
      ev(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = Jh(), n;
}
function ev(e, t) {
  if (Ee(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (o) => (s) => !s._stopped && o && o(s)
    );
  } else
    return t;
}
const ba = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, tv = (e, t, n, o, s, i) => {
  const r = s === "svg";
  t === "class" ? Hh(e, o, r) : t === "style" ? qh(e, n, o) : Ws(t) ? Rr(t) || Kh(e, t, n, o, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : nv(e, t, o, r)) ? (ga(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && va(e, t, o, r, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !Ue(o)) ? ga(e, xt(t), o, i, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), va(e, t, o, r));
};
function nv(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && ba(t) && Se(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return ba(t) && Ue(n) ? !1 : t in e;
}
const lo = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return Ee(t) ? (n) => ws(t, n) : t;
};
function ov(e) {
  e.target.composing = !0;
}
function _a(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Jt = Symbol("_assign"), Re = {
  created(e, { modifiers: { lazy: t, trim: n, number: o } }, s) {
    e[Jt] = lo(s);
    const i = o || s.props && s.props.type === "number";
    pn(e, t ? "change" : "input", (r) => {
      if (r.target.composing) return;
      let l = e.value;
      n && (l = l.trim()), i && (l = Ts(l)), e[Jt](l);
    }), n && pn(e, "change", () => {
      e.value = e.value.trim();
    }), t || (pn(e, "compositionstart", ov), pn(e, "compositionend", _a), pn(e, "change", _a));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: o, trim: s, number: i } }, r) {
    if (e[Jt] = lo(r), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? Ts(e.value) : e.value, a = t ?? "";
    l !== a && (document.activeElement === e && e.type !== "range" && (o && t === n || s && e.value.trim() === a) || (e.value = a));
  }
}, Qc = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[Jt] = lo(n), pn(e, "change", () => {
      const o = e._modelValue, s = Ho(e), i = e.checked, r = e[Jt];
      if (Ee(o)) {
        const l = zr(o, s), a = l !== -1;
        if (i && !a)
          r(o.concat(s));
        else if (!i && a) {
          const c = [...o];
          c.splice(l, 1), r(c);
        }
      } else if (fo(o)) {
        const l = new Set(o);
        i ? l.add(s) : l.delete(s), r(l);
      } else
        r(ed(e, i));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: wa,
  beforeUpdate(e, t, n) {
    e[Jt] = lo(n), wa(e, t, n);
  }
};
function wa(e, { value: t, oldValue: n }, o) {
  e._modelValue = t;
  let s;
  if (Ee(t))
    s = zr(t, o.props.value) > -1;
  else if (fo(t))
    s = t.has(o.props.value);
  else {
    if (t === n) return;
    s = Jo(t, ed(e, !0));
  }
  e.checked !== s && (e.checked = s);
}
const Qt = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, o) {
    const s = fo(t);
    pn(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (r) => r.selected).map(
        (r) => n ? Ts(Ho(r)) : Ho(r)
      );
      e[Jt](
        e.multiple ? s ? new Set(i) : i : i[0]
      ), e._assigning = !0, ot(() => {
        e._assigning = !1;
      });
    }), e[Jt] = lo(o);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    ka(e, t);
  },
  beforeUpdate(e, t, n) {
    e[Jt] = lo(n);
  },
  updated(e, { value: t }) {
    e._assigning || ka(e, t);
  }
};
function ka(e, t) {
  const n = e.multiple, o = Ee(t);
  if (!(n && !o && !fo(t))) {
    for (let s = 0, i = e.options.length; s < i; s++) {
      const r = e.options[s], l = Ho(r);
      if (n)
        if (o) {
          const a = typeof l;
          a === "string" || a === "number" ? r.selected = t.some((c) => String(c) === String(l)) : r.selected = zr(t, l) > -1;
        } else
          r.selected = t.has(l);
      else if (Jo(Ho(r), t)) {
        e.selectedIndex !== s && (e.selectedIndex = s);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function Ho(e) {
  return "_value" in e ? e._value : e.value;
}
function ed(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const sv = ["ctrl", "shift", "alt", "meta"], iv = {
  stop: (e) => e.stopPropagation(),
  prevent: (e) => e.preventDefault(),
  self: (e) => e.target !== e.currentTarget,
  ctrl: (e) => !e.ctrlKey,
  shift: (e) => !e.shiftKey,
  alt: (e) => !e.altKey,
  meta: (e) => !e.metaKey,
  left: (e) => "button" in e && e.button !== 0,
  middle: (e) => "button" in e && e.button !== 1,
  right: (e) => "button" in e && e.button !== 2,
  exact: (e, t) => sv.some((n) => e[`${n}Key`] && !t.includes(n))
}, mt = (e, t) => {
  const n = e._withMods || (e._withMods = {}), o = t.join(".");
  return n[o] || (n[o] = (s, ...i) => {
    for (let r = 0; r < t.length; r++) {
      const l = iv[t[r]];
      if (l && l(s, t)) return;
    }
    return e(s, ...i);
  });
}, rv = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Ea = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), o = t.join(".");
  return n[o] || (n[o] = (s) => {
    if (!("key" in s))
      return;
    const i = xn(s.key);
    if (t.some(
      (r) => r === i || rv[r] === i
    ))
      return e(s);
  });
}, lv = /* @__PURE__ */ dt({ patchProp: tv }, Fh);
let xa;
function av() {
  return xa || (xa = fh(lv));
}
const ts = (...e) => {
  const t = av().createApp(...e), { mount: n } = t;
  return t.mount = (o) => {
    const s = cv(o);
    if (!s) return;
    const i = t._component;
    !Se(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const r = n(s, !1, uv(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), r;
  }, t;
};
function uv(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function cv(e) {
  return Ue(e) ? document.querySelector(e) : e;
}
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dv = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var cs = {
  xmlns: "http://www.w3.org/2000/svg",
  width: 24,
  height: 24,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round"
};
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fv = ({ size: e, strokeWidth: t = 2, absoluteStrokeWidth: n, color: o, iconNode: s, name: i, class: r, ...l }, { slots: a }) => Ve(
  "svg",
  {
    ...cs,
    width: e || cs.width,
    height: e || cs.height,
    stroke: o || cs.stroke,
    "stroke-width": n ? Number(t) * 24 / Number(e) : t,
    class: ["lucide", `lucide-${dv(i ?? "icon")}`],
    ...l
  },
  [...s.map((c) => Ve(...c)), ...a.default ? [a.default()] : []]
);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Me = (e, t) => (n, { slots: o }) => Ve(
  fv,
  {
    ...n,
    iconNode: t,
    name: e
  },
  o
);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pv = Me("ArchiveIcon", [
  ["rect", { width: "20", height: "5", x: "2", y: "3", rx: "1", key: "1wp1u1" }],
  ["path", { d: "M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8", key: "1s80jp" }],
  ["path", { d: "M10 12h4", key: "a56b0p" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hv = Me("BotIcon", [
  ["path", { d: "M12 8V4H8", key: "hb8ula" }],
  ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
  ["path", { d: "M2 14h2", key: "vft8re" }],
  ["path", { d: "M20 14h2", key: "4cs60a" }],
  ["path", { d: "M15 13v2", key: "1xurst" }],
  ["path", { d: "M9 13v2", key: "rq6x2g" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vv = Me("BrainIcon", [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gv = Me("ChartColumnIcon", [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rn = Me("CheckIcon", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mv = Me("ChevronDownIcon", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yv = Me("Clock3Icon", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16.5 12", key: "1aq6pp" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bv = Me("DatabaseIcon", [
  ["ellipse", { cx: "12", cy: "5", rx: "9", ry: "3", key: "msslwz" }],
  ["path", { d: "M3 5V19A9 3 0 0 0 21 19V5", key: "1wlel7" }],
  ["path", { d: "M3 12A9 3 0 0 0 21 12", key: "mv7ke4" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kn = Me("DownloadIcon", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "7 10 12 15 17 10", key: "2ggqvy" }],
  ["line", { x1: "12", x2: "12", y1: "15", y2: "3", key: "1vk2je" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fr = Me("ExternalLinkIcon", [
  ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
  ["path", { d: "M10 14 21 3", key: "gplh6r" }],
  ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ca = Me("EyeIcon", [
  [
    "path",
    {
      d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
      key: "1nclc0"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ao = Me("FolderOpenIcon", [
  [
    "path",
    {
      d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
      key: "usdka0"
    }
  ]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const td = Me("GitBranchIcon", [
  ["line", { x1: "6", x2: "6", y1: "3", y2: "15", key: "17qcm7" }],
  ["circle", { cx: "18", cy: "6", r: "3", key: "1h7g24" }],
  ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
  ["path", { d: "M18 9a9 9 0 0 1-9 9", key: "n2h4wq" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const _v = Me("LayersIcon", [
  [
    "path",
    {
      d: "M12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z",
      key: "zw3jo"
    }
  ],
  [
    "path",
    {
      d: "M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12",
      key: "1wduqc"
    }
  ],
  [
    "path",
    {
      d: "M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17",
      key: "kqbvx6"
    }
  ]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wv = Me("Maximize2Icon", [
  ["polyline", { points: "15 3 21 3 21 9", key: "mznyad" }],
  ["polyline", { points: "9 21 3 21 3 15", key: "1avn1i" }],
  ["line", { x1: "21", x2: "14", y1: "3", y2: "10", key: "ota7mn" }],
  ["line", { x1: "3", x2: "10", y1: "21", y2: "14", key: "1atl0r" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const kv = Me("MicVocalIcon", [
  [
    "path",
    {
      d: "m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12",
      key: "80a601"
    }
  ],
  [
    "path",
    {
      d: "M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5",
      key: "j0ngtp"
    }
  ],
  ["circle", { cx: "16", cy: "7", r: "5", key: "d08jfb" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ev = Me("MinusIcon", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const nd = Me("PenLineIcon", [
  ["path", { d: "M12 20h9", key: "t2du7b" }],
  [
    "path",
    {
      d: "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
      key: "1ykcvy"
    }
  ]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const od = Me("PlayIcon", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xv = Me("PlugIcon", [
  ["path", { d: "M12 22v-5", key: "1ega77" }],
  ["path", { d: "M9 8V2", key: "14iosj" }],
  ["path", { d: "M15 8V2", key: "18g5xt" }],
  ["path", { d: "M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z", key: "osxo6l" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Uo = Me("PlusIcon", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cv = Me("PuzzleIcon", [
  [
    "path",
    {
      d: "M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z",
      key: "w46dr5"
    }
  ]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zt = Me("RefreshCwIcon", [
  ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
  ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
  ["path", { d: "M8 16H3v5", key: "1cv678" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const el = Me("RotateCcwIcon", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const pr = Me("SaveIcon", [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Sv = Me("ScanFaceIcon", [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["path", { d: "M8 14s1.5 2 4 2 4-2 4-2", key: "1y1vjs" }],
  ["path", { d: "M9 9h.01", key: "1q5me6" }],
  ["path", { d: "M15 9h.01", key: "x1ddxp" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const $v = Me("ScanSearchIcon", [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["path", { d: "m16 16-1.9-1.9", key: "1dq9hf" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const hr = Me("SearchIcon", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Iv = Me("SendIcon", [
  [
    "path",
    {
      d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
      key: "1ffxy3"
    }
  ],
  ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Pi = Me("SettingsIcon", [
  [
    "path",
    {
      d: "M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z",
      key: "1qme2f"
    }
  ],
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nv = Me("ShieldCheckIcon", [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const en = Me("Trash2Icon", [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mv = Me("Undo2Icon", [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const vr = Me("UploadIcon", [
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["polyline", { points: "17 8 12 3 7 8", key: "t8dd8p" }],
  ["line", { x1: "12", x2: "12", y1: "3", y2: "15", key: "widbto" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gr = Me("UserRoundIcon", [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tv = Me("WrenchIcon", [
  [
    "path",
    {
      d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
      key: "cbrjhi"
    }
  ]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Rt = Me("XIcon", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]), Ov = /* @__PURE__ */ new Set(["converting", "preview_ready", "indexing"]);
function Pv(e) {
  let t = 0, n = 0, o = 0;
  for (const s of e) {
    const i = String(s.status || "");
    i === "indexed" ? t += 1 : i.endsWith("_failed") || ["failed", "error"].includes(i) ? o += 1 : Ov.has(i) && i !== "preview_ready" && (n += 1);
  }
  return { total: e.length, indexed: t, processing: n, failed: o, attention: n + o };
}
function Av(e) {
  if (Array.isArray(e)) return e;
  if (!e || typeof e != "object") return [];
  const t = e;
  for (const n of ["items", "evaluations", "results"])
    if (Array.isArray(t[n])) return t[n];
  return [e];
}
function Dv(e) {
  const t = Number(e);
  return Number.isFinite(t) ? `${Math.round(t <= 1 ? t * 100 : t)}%` : "—";
}
function Rv(e) {
  const t = Number(e == null ? void 0 : e.total_documents), n = Number((e == null ? void 0 : e.indexed_count) ?? (e == null ? void 0 : e.indexed_documents)), o = Number((e == null ? void 0 : e.failed_count) ?? (e == null ? void 0 : e.failed_documents)), s = Number((e == null ? void 0 : e.in_progress_count) ?? (e == null ? void 0 : e.processing_documents)), i = String((e == null ? void 0 : e.status) || (e == null ? void 0 : e.state) || "");
  return ["ready", "completed", "complete", "healthy"].includes(i) ? "处理完成" : ["running", "processing", "pending", "indexing"].includes(i) ? "处理中" : ["failed", "error"].includes(i) || Number.isFinite(o) && o > 0 ? "需要处理" : Number.isFinite(s) && s > 0 ? "处理中" : Number.isFinite(t) && t > 0 && Number.isFinite(n) && n >= t ? "处理完成" : Number.isFinite(t) && t === 0 ? "暂无资料" : e ? "已生成" : "暂无报告";
}
function Vv(e) {
  return { completed: "已完成", complete: "已完成", running: "进行中", pending: "等待中", failed: "失败", error: "失败" }[e || ""] || e || "已保存";
}
function Qe(e) {
  return JSON.parse(JSON.stringify(e));
}
class tl extends Error {
  constructor(n, o) {
    super(n);
    Ye(this, "status");
    this.name = "ApiError", this.status = o;
  }
}
async function Xe(e, t) {
  const n = await fetch(e, t), o = await n.json().catch(() => null);
  if (!n.ok) throw new tl((o == null ? void 0 : o.detail) || `请求失败 (${n.status})`, n.status);
  return o;
}
async function sd(e, t) {
  try {
    return await Xe(e, t);
  } catch (n) {
    if (n instanceof tl && n.status === 404) return null;
    throw n;
  }
}
function Ai() {
  return Xe("/api/personas", { cache: "no-store" });
}
function id(e) {
  return Xe(`/api/personas/${encodeURIComponent(e)}/documents`, { cache: "no-store" });
}
async function rd() {
  return (await Xe("/api/live2d/models", { cache: "no-store" })).models;
}
async function Lv() {
  await Xe("/api/live2d/model-directory", {
    method: "POST",
    headers: { "X-CHARACTOID-Request": "web" }
  });
}
async function Sa(e) {
  const [t, n, o, s, i, r] = await Promise.all([
    Xe(`/api/personas/${encodeURIComponent(e.id)}/capabilities`, { cache: "no-store" }),
    Xe(`/api/personas/${encodeURIComponent(e.id)}/mcp-grants`, { cache: "no-store" }),
    id(e.id),
    Xe("/api/mcp/servers", { cache: "no-store" }).catch(() => []),
    rd().then((a) => ({ models: a })).catch(() => ({ models: [] })),
    Xe("/api/voice-assets", { cache: "no-store" }).catch(() => ({ items: [] }))
  ]), l = new Map(s.map((a) => [a.name, a.status]));
  return {
    persona: Qe(e),
    documents: o,
    capabilities: t,
    grants: { servers: n.servers.map((a) => ({ ...a, status: l.get(a.name) || { status: a.enabled ? "unknown" : "disabled" } })) },
    resources: { live2dModels: i.models, voiceAssets: r.items.filter((a) => a.status === "ready" && (!a.engine || a.engine === "gpt_sovits")) }
  };
}
async function zv(e) {
  await Xe(`/api/personas/${encodeURIComponent(e.id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: e.name, profile: e.profile || {} })
  });
}
async function Fv(e, t) {
  await Xe(`/api/personas/${encodeURIComponent(e)}/capabilities`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ overrides: t })
  });
}
async function Bv(e, t) {
  const n = t.filter((o) => o.authorized && !o.global).map((o) => o.name);
  await Xe(`/api/personas/${encodeURIComponent(e)}/mcp-grants`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ server_names: n })
  });
}
async function Hv(e) {
  await Xe(`/api/personas/${encodeURIComponent(e)}`, { method: "DELETE" });
}
async function Uv(e, t, n) {
  if (!e.knowledge_space_id) throw new Error("角色知识空间不可用");
  const o = new FormData();
  t.forEach((i) => o.append("files", i)), n.trim() && o.append("files", new File([n.trim()], `text-${Date.now()}.txt`, { type: "text/plain;charset=utf-8" }));
  const s = await Xe(`/api/knowledge-spaces/${encodeURIComponent(e.knowledge_space_id)}/documents/upload`, { method: "POST", body: o });
  await Promise.all(s.map((i) => Xe(`/api/documents/${encodeURIComponent(i.id)}/confirm`, { method: "POST" })));
}
async function jv(e) {
  var n;
  const t = await fetch(`/api/documents/${encodeURIComponent(e)}`, { method: "DELETE" });
  if (!t.ok) throw new Error(((n = await t.json().catch(() => null)) == null ? void 0 : n.detail) || `删除失败 (${t.status})`);
}
async function Gv(e) {
  await Xe(`/api/documents/${encodeURIComponent(e)}/retry-index`, { method: "POST" });
}
async function qv(e, t) {
  var s;
  const n = {
    zh: "你好，这是我的声音。很高兴认识你。",
    ja: "こんにちは、これは私の声です。お会いできてうれしいです。",
    en: "Hello, this is my voice. Nice to meet you.",
    auto: "こんにちは、这是我的声音。Hello!"
  }, o = await fetch(`/api/voice-assets/${encodeURIComponent(e)}/synthesize`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
    body: JSON.stringify({ text: n[t] || n.auto, text_lang: t })
  });
  if (!o.ok) throw new Error(((s = await o.json().catch(() => null)) == null ? void 0 : s.detail) || "试听失败");
  return o.blob();
}
function Yv(e) {
  return Xe(`/api/personas/${encodeURIComponent(e)}/versions`, { cache: "no-store" });
}
function Xv(e, t) {
  return Xe(`/api/personas/${encodeURIComponent(e)}/versions/${encodeURIComponent(t)}`, { cache: "no-store" });
}
function Kv(e, t = {}) {
  return Xe(`/api/personas/${encodeURIComponent(e)}/versions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ label: t.label || "", note: t.note || "" })
  });
}
async function Wv(e, t) {
  return (await Xe(
    `/api/personas/${encodeURIComponent(e)}/versions/${encodeURIComponent(t)}/publish`,
    { method: "POST" }
  )).version;
}
async function Zv(e, t) {
  return (await Xe(
    `/api/personas/${encodeURIComponent(e)}/versions/${encodeURIComponent(t)}/rollback`,
    { method: "POST" }
  )).version;
}
async function Jv(e) {
  return sd(
    `/api/knowledge-spaces/${encodeURIComponent(e)}/documents/report`,
    { cache: "no-store" }
  );
}
async function Qv(e, t = 1) {
  const n = await sd(
    `/api/eval/history?persona_id=${encodeURIComponent(e)}&limit=${encodeURIComponent(String(t))}`,
    { cache: "no-store" }
  );
  return Av(n);
}
const eg = [
  { id: "profile", label: "设定", summary: () => "编辑角色设定" },
  { id: "memory", label: "记忆", summary: () => "会话与长期记忆" },
  { id: "rag", label: "知识库", summary: (e) => `${e.documents.length} 份资料` },
  { id: "voice", label: "声音", summary: (e) => {
    var t, n;
    return (n = (t = e.persona.profile) == null ? void 0 : t.tts) != null && n.voice_asset_id ? "已绑定角色音色" : "未绑定角色音色";
  } },
  { id: "live2d", label: "Live2D", summary: (e) => {
    var t, n;
    return (n = (t = e.persona.profile) == null ? void 0 : t.live2d) != null && n.model ? "已绑定模型" : "未绑定模型";
  } },
  { id: "extensions", label: "扩展能力", summary: (e) => `${e.capabilities.packages.length} 项 Skill 与 Tool` }
];
function tg(e) {
  return ["available", "partial", "unassigned", "blocked", "pending", "error"].includes(e) ? e : "blocked";
}
function _o(e, t, n) {
  return { id: e, type: t, position: { x: 0, y: 0 }, data: n };
}
function ng(e) {
  var i, r;
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), o = `persona:${e.persona.id}`, s = "module:extensions";
  t.set(o, _o(o, "persona", { kind: "persona", label: e.persona.name, summary: String(((i = e.persona.profile) == null ? void 0 : i.description) || "尚未填写人设"), status: "available", level: 0 }));
  for (const l of eg) {
    const a = `module:${l.id}`;
    t.set(a, _o(a, "module", { kind: l.id, label: l.label, summary: l.summary(e), status: "available", level: 0 }));
    const c = l.id === "extensions";
    n.set(`${o}->${a}`, { id: `${o}->${a}`, source: o, target: a, sourceHandle: c ? "right-source" : "left-source", targetHandle: c ? "left-target" : "right-target" });
  }
  for (const l of e.capabilities.packages) {
    const a = l.kind === "skill" ? "skill" : "tool", c = e.capabilities.overrides[l.id], d = c === void 0 ? l.assigned : c, f = c === !1 ? "blocked" : c === !0 && l.status === "unassigned" ? "available" : l.status;
    t.set(l.id, _o(l.id, "capability", {
      kind: a,
      label: l.name,
      summary: l.description || l.reason || "能力包",
      status: tg(f),
      level: l.level,
      assigned: d,
      configurable: !0,
      sourceId: l.id
    })), n.set(`${s}->${l.id}`, { id: `${s}->${l.id}`, source: s, target: l.id, sourceHandle: "right-source", targetHandle: "left-target" });
    for (const h of l.dependencies || []) {
      if (!h.id) continue;
      const v = e.capabilities.overrides[h.id], w = v === void 0 ? h.effective : v;
      if (t.set(h.id, _o(h.id, "capability", {
        kind: "tool",
        label: h.name,
        summary: h.server ? `MCP · ${h.server}` : h.source,
        status: w ? "available" : "blocked",
        level: h.level,
        assigned: w,
        configurable: !1,
        sourceId: h.id
      })), n.set(`${l.id}->${h.id}`, { id: `${l.id}->${h.id}`, source: l.id, target: h.id, sourceHandle: "right-source", targetHandle: "left-target" }), h.server) {
        const x = `mcp:${h.server}`, I = e.grants.servers.find((D) => D.name === h.server), C = ((r = I == null ? void 0 : I.status) == null ? void 0 : r.status) === "connected";
        t.set(x, _o(x, "capability", {
          kind: "mcp",
          label: h.server,
          summary: (I == null ? void 0 : I.description) || "MCP 服务",
          status: I != null && I.authorized && C ? "available" : "blocked",
          level: h.level,
          assigned: !!(I != null && I.authorized),
          configurable: !!(I && !I.global),
          sourceId: h.server
        })), n.set(`${h.id}->${x}`, { id: `${h.id}->${x}`, source: h.id, target: x, sourceHandle: "right-source", targetHandle: "left-target" });
      }
    }
  }
  return { nodes: [...t.values()], edges: [...n.values()] };
}
function og(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var sg = "\0", Nn = "\0", $a = "";
let ig = class {
  constructor(t) {
    Ye(this, "_isDirected", !0);
    Ye(this, "_isMultigraph", !1);
    Ye(this, "_isCompound", !1);
    // Label for the graph itself
    Ye(this, "_label");
    // Defaults to be set when creating a new node
    Ye(this, "_defaultNodeLabelFn", () => {
    });
    // Defaults to be set when creating a new edge
    Ye(this, "_defaultEdgeLabelFn", () => {
    });
    // v -> label
    Ye(this, "_nodes", {});
    // v -> edgeObj
    Ye(this, "_in", {});
    // u -> v -> Number
    Ye(this, "_preds", {});
    // v -> edgeObj
    Ye(this, "_out", {});
    // v -> w -> Number
    Ye(this, "_sucs", {});
    // e -> edgeObj
    Ye(this, "_edgeObjs", {});
    // e -> label
    Ye(this, "_edgeLabels", {});
    /* Number of nodes in the graph. Should only be changed by the implementation. */
    Ye(this, "_nodeCount", 0);
    /* Number of edges in the graph. Should only be changed by the implementation. */
    Ye(this, "_edgeCount", 0);
    Ye(this, "_parent");
    Ye(this, "_children");
    t && (this._isDirected = Object.hasOwn(t, "directed") ? t.directed : !0, this._isMultigraph = Object.hasOwn(t, "multigraph") ? t.multigraph : !1, this._isCompound = Object.hasOwn(t, "compound") ? t.compound : !1), this._isCompound && (this._parent = {}, this._children = {}, this._children[Nn] = {});
  }
  /* === Graph functions ========= */
  /**
   * Whether graph was created with 'directed' flag set to true or not.
   */
  isDirected() {
    return this._isDirected;
  }
  /**
   * Whether graph was created with 'multigraph' flag set to true or not.
   */
  isMultigraph() {
    return this._isMultigraph;
  }
  /**
   * Whether graph was created with 'compound' flag set to true or not.
   */
  isCompound() {
    return this._isCompound;
  }
  /**
   * Sets the label of the graph.
   */
  setGraph(t) {
    return this._label = t, this;
  }
  /**
   * Gets the graph label.
   */
  graph() {
    return this._label;
  }
  /* === Node functions ========== */
  /**
   * Sets the default node label. If newDefault is a function, it will be
   * invoked ach time when setting a label for a node. Otherwise, this label
   * will be assigned as default label in case if no label was specified while
   * setting a node.
   * Complexity: O(1).
   */
  setDefaultNodeLabel(t) {
    return this._defaultNodeLabelFn = t, typeof t != "function" && (this._defaultNodeLabelFn = () => t), this;
  }
  /**
   * Gets the number of nodes in the graph.
   * Complexity: O(1).
   */
  nodeCount() {
    return this._nodeCount;
  }
  /**
   * Gets all nodes of the graph. Note, the in case of compound graph subnodes are
   * not included in list.
   * Complexity: O(1).
   */
  nodes() {
    return Object.keys(this._nodes);
  }
  /**
   * Gets list of nodes without in-edges.
   * Complexity: O(|V|).
   */
  sources() {
    var t = this;
    return this.nodes().filter((n) => Object.keys(t._in[n]).length === 0);
  }
  /**
   * Gets list of nodes without out-edges.
   * Complexity: O(|V|).
   */
  sinks() {
    var t = this;
    return this.nodes().filter((n) => Object.keys(t._out[n]).length === 0);
  }
  /**
   * Invokes setNode method for each node in names list.
   * Complexity: O(|names|).
   */
  setNodes(t, n) {
    var o = arguments, s = this;
    return t.forEach(function(i) {
      o.length > 1 ? s.setNode(i, n) : s.setNode(i);
    }), this;
  }
  /**
   * Creates or updates the value for the node v in the graph. If label is supplied
   * it is set as the value for the node. If label is not supplied and the node was
   * created by this call then the default node label will be assigned.
   * Complexity: O(1).
   */
  setNode(t, n) {
    return Object.hasOwn(this._nodes, t) ? (arguments.length > 1 && (this._nodes[t] = n), this) : (this._nodes[t] = arguments.length > 1 ? n : this._defaultNodeLabelFn(t), this._isCompound && (this._parent[t] = Nn, this._children[t] = {}, this._children[Nn][t] = !0), this._in[t] = {}, this._preds[t] = {}, this._out[t] = {}, this._sucs[t] = {}, ++this._nodeCount, this);
  }
  /**
   * Gets the label of node with specified name.
   * Complexity: O(|V|).
   */
  node(t) {
    return this._nodes[t];
  }
  /**
   * Detects whether graph has a node with specified name or not.
   */
  hasNode(t) {
    return Object.hasOwn(this._nodes, t);
  }
  /**
   * Remove the node with the name from the graph or do nothing if the node is not in
   * the graph. If the node was removed this function also removes any incident
   * edges.
   * Complexity: O(1).
   */
  removeNode(t) {
    var n = this;
    if (Object.hasOwn(this._nodes, t)) {
      var o = (s) => n.removeEdge(n._edgeObjs[s]);
      delete this._nodes[t], this._isCompound && (this._removeFromParentsChildList(t), delete this._parent[t], this.children(t).forEach(function(s) {
        n.setParent(s);
      }), delete this._children[t]), Object.keys(this._in[t]).forEach(o), delete this._in[t], delete this._preds[t], Object.keys(this._out[t]).forEach(o), delete this._out[t], delete this._sucs[t], --this._nodeCount;
    }
    return this;
  }
  /**
   * Sets node p as a parent for node v if it is defined, or removes the
   * parent for v if p is undefined. Method throws an exception in case of
   * invoking it in context of noncompound graph.
   * Average-case complexity: O(1).
   */
  setParent(t, n) {
    if (!this._isCompound)
      throw new Error("Cannot set parent in a non-compound graph");
    if (n === void 0)
      n = Nn;
    else {
      n += "";
      for (var o = n; o !== void 0; o = this.parent(o))
        if (o === t)
          throw new Error("Setting " + n + " as parent of " + t + " would create a cycle");
      this.setNode(n);
    }
    return this.setNode(t), this._removeFromParentsChildList(t), this._parent[t] = n, this._children[n][t] = !0, this;
  }
  _removeFromParentsChildList(t) {
    delete this._children[this._parent[t]][t];
  }
  /**
   * Gets parent node for node v.
   * Complexity: O(1).
   */
  parent(t) {
    if (this._isCompound) {
      var n = this._parent[t];
      if (n !== Nn)
        return n;
    }
  }
  /**
   * Gets list of direct children of node v.
   * Complexity: O(1).
   */
  children(t = Nn) {
    if (this._isCompound) {
      var n = this._children[t];
      if (n)
        return Object.keys(n);
    } else {
      if (t === Nn)
        return this.nodes();
      if (this.hasNode(t))
        return [];
    }
  }
  /**
   * Return all nodes that are predecessors of the specified node or undefined if node v is not in
   * the graph. Behavior is undefined for undirected graphs - use neighbors instead.
   * Complexity: O(|V|).
   */
  predecessors(t) {
    var n = this._preds[t];
    if (n)
      return Object.keys(n);
  }
  /**
   * Return all nodes that are successors of the specified node or undefined if node v is not in
   * the graph. Behavior is undefined for undirected graphs - use neighbors instead.
   * Complexity: O(|V|).
   */
  successors(t) {
    var n = this._sucs[t];
    if (n)
      return Object.keys(n);
  }
  /**
   * Return all nodes that are predecessors or successors of the specified node or undefined if
   * node v is not in the graph.
   * Complexity: O(|V|).
   */
  neighbors(t) {
    var n = this.predecessors(t);
    if (n) {
      const s = new Set(n);
      for (var o of this.successors(t))
        s.add(o);
      return Array.from(s.values());
    }
  }
  isLeaf(t) {
    var n;
    return this.isDirected() ? n = this.successors(t) : n = this.neighbors(t), n.length === 0;
  }
  /**
   * Creates new graph with nodes filtered via filter. Edges incident to rejected node
   * are also removed. In case of compound graph, if parent is rejected by filter,
   * than all its children are rejected too.
   * Average-case complexity: O(|E|+|V|).
   */
  filterNodes(t) {
    var n = new this.constructor({
      directed: this._isDirected,
      multigraph: this._isMultigraph,
      compound: this._isCompound
    });
    n.setGraph(this.graph());
    var o = this;
    Object.entries(this._nodes).forEach(function([r, l]) {
      t(r) && n.setNode(r, l);
    }), Object.values(this._edgeObjs).forEach(function(r) {
      n.hasNode(r.v) && n.hasNode(r.w) && n.setEdge(r, o.edge(r));
    });
    var s = {};
    function i(r) {
      var l = o.parent(r);
      return l === void 0 || n.hasNode(l) ? (s[r] = l, l) : l in s ? s[l] : i(l);
    }
    return this._isCompound && n.nodes().forEach((r) => n.setParent(r, i(r))), n;
  }
  /* === Edge functions ========== */
  /**
   * Sets the default edge label or factory function. This label will be
   * assigned as default label in case if no label was specified while setting
   * an edge or this function will be invoked each time when setting an edge
   * with no label specified and returned value * will be used as a label for edge.
   * Complexity: O(1).
   */
  setDefaultEdgeLabel(t) {
    return this._defaultEdgeLabelFn = t, typeof t != "function" && (this._defaultEdgeLabelFn = () => t), this;
  }
  /**
   * Gets the number of edges in the graph.
   * Complexity: O(1).
   */
  edgeCount() {
    return this._edgeCount;
  }
  /**
   * Gets edges of the graph. In case of compound graph subgraphs are not considered.
   * Complexity: O(|E|).
   */
  edges() {
    return Object.values(this._edgeObjs);
  }
  /**
   * Establish an edges path over the nodes in nodes list. If some edge is already
   * exists, it will update its label, otherwise it will create an edge between pair
   * of nodes with label provided or default label if no label provided.
   * Complexity: O(|nodes|).
   */
  setPath(t, n) {
    var o = this, s = arguments;
    return t.reduce(function(i, r) {
      return s.length > 1 ? o.setEdge(i, r, n) : o.setEdge(i, r), r;
    }), this;
  }
  /**
   * Creates or updates the label for the edge (v, w) with the optionally supplied
   * name. If label is supplied it is set as the value for the edge. If label is not
   * supplied and the edge was created by this call then the default edge label will
   * be assigned. The name parameter is only useful with multigraphs.
   */
  setEdge() {
    var t, n, o, s, i = !1, r = arguments[0];
    typeof r == "object" && r !== null && "v" in r ? (t = r.v, n = r.w, o = r.name, arguments.length === 2 && (s = arguments[1], i = !0)) : (t = r, n = arguments[1], o = arguments[3], arguments.length > 2 && (s = arguments[2], i = !0)), t = "" + t, n = "" + n, o !== void 0 && (o = "" + o);
    var l = xo(this._isDirected, t, n, o);
    if (Object.hasOwn(this._edgeLabels, l))
      return i && (this._edgeLabels[l] = s), this;
    if (o !== void 0 && !this._isMultigraph)
      throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(t), this.setNode(n), this._edgeLabels[l] = i ? s : this._defaultEdgeLabelFn(t, n, o);
    var a = rg(this._isDirected, t, n, o);
    return t = a.v, n = a.w, Object.freeze(a), this._edgeObjs[l] = a, Ia(this._preds[n], t), Ia(this._sucs[t], n), this._in[n][l] = a, this._out[t][l] = a, this._edgeCount++, this;
  }
  /**
   * Gets the label for the specified edge.
   * Complexity: O(1).
   */
  edge(t, n, o) {
    var s = arguments.length === 1 ? Di(this._isDirected, arguments[0]) : xo(this._isDirected, t, n, o);
    return this._edgeLabels[s];
  }
  /**
   * Gets the label for the specified edge and converts it to an object.
   * Complexity: O(1)
   */
  edgeAsObj() {
    const t = this.edge(...arguments);
    return typeof t != "object" ? { label: t } : t;
  }
  /**
   * Detects whether the graph contains specified edge or not. No subgraphs are considered.
   * Complexity: O(1).
   */
  hasEdge(t, n, o) {
    var s = arguments.length === 1 ? Di(this._isDirected, arguments[0]) : xo(this._isDirected, t, n, o);
    return Object.hasOwn(this._edgeLabels, s);
  }
  /**
   * Removes the specified edge from the graph. No subgraphs are considered.
   * Complexity: O(1).
   */
  removeEdge(t, n, o) {
    var s = arguments.length === 1 ? Di(this._isDirected, arguments[0]) : xo(this._isDirected, t, n, o), i = this._edgeObjs[s];
    return i && (t = i.v, n = i.w, delete this._edgeLabels[s], delete this._edgeObjs[s], Na(this._preds[n], t), Na(this._sucs[t], n), delete this._in[n][s], delete this._out[t][s], this._edgeCount--), this;
  }
  /**
   * Return all edges that point to the node v. Optionally filters those edges down to just those
   * coming from node u. Behavior is undefined for undirected graphs - use nodeEdges instead.
   * Complexity: O(|E|).
   */
  inEdges(t, n) {
    var o = this._in[t];
    if (o) {
      var s = Object.values(o);
      return n ? s.filter((i) => i.v === n) : s;
    }
  }
  /**
   * Return all edges that are pointed at by node v. Optionally filters those edges down to just
   * those point to w. Behavior is undefined for undirected graphs - use nodeEdges instead.
   * Complexity: O(|E|).
   */
  outEdges(t, n) {
    var o = this._out[t];
    if (o) {
      var s = Object.values(o);
      return n ? s.filter((i) => i.w === n) : s;
    }
  }
  /**
   * Returns all edges to or from node v regardless of direction. Optionally filters those edges
   * down to just those between nodes v and w regardless of direction.
   * Complexity: O(|E|).
   */
  nodeEdges(t, n) {
    var o = this.inEdges(t, n);
    if (o)
      return o.concat(this.outEdges(t, n));
  }
};
function Ia(e, t) {
  e[t] ? e[t]++ : e[t] = 1;
}
function Na(e, t) {
  --e[t] || delete e[t];
}
function xo(e, t, n, o) {
  var s = "" + t, i = "" + n;
  if (!e && s > i) {
    var r = s;
    s = i, i = r;
  }
  return s + $a + i + $a + (o === void 0 ? sg : o);
}
function rg(e, t, n, o) {
  var s = "" + t, i = "" + n;
  if (!e && s > i) {
    var r = s;
    s = i, i = r;
  }
  var l = { v: s, w: i };
  return o && (l.name = o), l;
}
function Di(e, t) {
  return xo(e, t.v, t.w, t.name);
}
var nl = ig, lg = "2.2.4", ag = {
  Graph: nl,
  version: lg
}, ug = nl, cg = {
  write: dg,
  read: hg
};
function dg(e) {
  var t = {
    options: {
      directed: e.isDirected(),
      multigraph: e.isMultigraph(),
      compound: e.isCompound()
    },
    nodes: fg(e),
    edges: pg(e)
  };
  return e.graph() !== void 0 && (t.value = structuredClone(e.graph())), t;
}
function fg(e) {
  return e.nodes().map(function(t) {
    var n = e.node(t), o = e.parent(t), s = { v: t };
    return n !== void 0 && (s.value = n), o !== void 0 && (s.parent = o), s;
  });
}
function pg(e) {
  return e.edges().map(function(t) {
    var n = e.edge(t), o = { v: t.v, w: t.w };
    return t.name !== void 0 && (o.name = t.name), n !== void 0 && (o.value = n), o;
  });
}
function hg(e) {
  var t = new ug(e.options).setGraph(e.value);
  return e.nodes.forEach(function(n) {
    t.setNode(n.v, n.value), n.parent && t.setParent(n.v, n.parent);
  }), e.edges.forEach(function(n) {
    t.setEdge({ v: n.v, w: n.w, name: n.name }, n.value);
  }), t;
}
var vg = gg;
function gg(e) {
  var t = {}, n = [], o;
  function s(i) {
    Object.hasOwn(t, i) || (t[i] = !0, o.push(i), e.successors(i).forEach(s), e.predecessors(i).forEach(s));
  }
  return e.nodes().forEach(function(i) {
    o = [], s(i), o.length && n.push(o);
  }), n;
}
let mg = class {
  constructor() {
    Ye(this, "_arr", []);
    Ye(this, "_keyIndices", {});
  }
  /**
   * Returns the number of elements in the queue. Takes `O(1)` time.
   */
  size() {
    return this._arr.length;
  }
  /**
   * Returns the keys that are in the queue. Takes `O(n)` time.
   */
  keys() {
    return this._arr.map(function(t) {
      return t.key;
    });
  }
  /**
   * Returns `true` if **key** is in the queue and `false` if not.
   */
  has(t) {
    return Object.hasOwn(this._keyIndices, t);
  }
  /**
   * Returns the priority for **key**. If **key** is not present in the queue
   * then this function returns `undefined`. Takes `O(1)` time.
   *
   * @param {Object} key
   */
  priority(t) {
    var n = this._keyIndices[t];
    if (n !== void 0)
      return this._arr[n].priority;
  }
  /**
   * Returns the key for the minimum element in this queue. If the queue is
   * empty this function throws an Error. Takes `O(1)` time.
   */
  min() {
    if (this.size() === 0)
      throw new Error("Queue underflow");
    return this._arr[0].key;
  }
  /**
   * Inserts a new key into the priority queue. If the key already exists in
   * the queue this function returns `false`; otherwise it will return `true`.
   * Takes `O(n)` time.
   *
   * @param {Object} key the key to add
   * @param {Number} priority the initial priority for the key
   */
  add(t, n) {
    var o = this._keyIndices;
    if (t = String(t), !Object.hasOwn(o, t)) {
      var s = this._arr, i = s.length;
      return o[t] = i, s.push({ key: t, priority: n }), this._decrease(i), !0;
    }
    return !1;
  }
  /**
   * Removes and returns the smallest key in the queue. Takes `O(log n)` time.
   */
  removeMin() {
    this._swap(0, this._arr.length - 1);
    var t = this._arr.pop();
    return delete this._keyIndices[t.key], this._heapify(0), t.key;
  }
  /**
   * Decreases the priority for **key** to **priority**. If the new priority is
   * greater than the previous priority, this function will throw an Error.
   *
   * @param {Object} key the key for which to raise priority
   * @param {Number} priority the new priority for the key
   */
  decrease(t, n) {
    var o = this._keyIndices[t];
    if (n > this._arr[o].priority)
      throw new Error("New priority is greater than current priority. Key: " + t + " Old: " + this._arr[o].priority + " New: " + n);
    this._arr[o].priority = n, this._decrease(o);
  }
  _heapify(t) {
    var n = this._arr, o = 2 * t, s = o + 1, i = t;
    o < n.length && (i = n[o].priority < n[i].priority ? o : i, s < n.length && (i = n[s].priority < n[i].priority ? s : i), i !== t && (this._swap(t, i), this._heapify(i)));
  }
  _decrease(t) {
    for (var n = this._arr, o = n[t].priority, s; t !== 0 && (s = t >> 1, !(n[s].priority < o)); )
      this._swap(t, s), t = s;
  }
  _swap(t, n) {
    var o = this._arr, s = this._keyIndices, i = o[t], r = o[n];
    o[t] = r, o[n] = i, s[r.key] = t, s[i.key] = n;
  }
};
var ld = mg, yg = ld, ad = _g, bg = () => 1;
function _g(e, t, n, o) {
  return wg(
    e,
    String(t),
    n || bg,
    o || function(s) {
      return e.outEdges(s);
    }
  );
}
function wg(e, t, n, o) {
  var s = {}, i = new yg(), r, l, a = function(c) {
    var d = c.v !== r ? c.v : c.w, f = s[d], h = n(c), v = l.distance + h;
    if (h < 0)
      throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + c + " Weight: " + h);
    v < f.distance && (f.distance = v, f.predecessor = r, i.decrease(d, v));
  };
  for (e.nodes().forEach(function(c) {
    var d = c === t ? 0 : Number.POSITIVE_INFINITY;
    s[c] = { distance: d }, i.add(c, d);
  }); i.size() > 0 && (r = i.removeMin(), l = s[r], l.distance !== Number.POSITIVE_INFINITY); )
    o(r).forEach(a);
  return s;
}
var kg = ad, Eg = xg;
function xg(e, t, n) {
  return e.nodes().reduce(function(o, s) {
    return o[s] = kg(e, s, t, n), o;
  }, {});
}
var ud = Cg;
function Cg(e) {
  var t = 0, n = [], o = {}, s = [];
  function i(r) {
    var l = o[r] = {
      onStack: !0,
      lowlink: t,
      index: t++
    };
    if (n.push(r), e.successors(r).forEach(function(d) {
      Object.hasOwn(o, d) ? o[d].onStack && (l.lowlink = Math.min(l.lowlink, o[d].index)) : (i(d), l.lowlink = Math.min(l.lowlink, o[d].lowlink));
    }), l.lowlink === l.index) {
      var a = [], c;
      do
        c = n.pop(), o[c].onStack = !1, a.push(c);
      while (r !== c);
      s.push(a);
    }
  }
  return e.nodes().forEach(function(r) {
    Object.hasOwn(o, r) || i(r);
  }), s;
}
var Sg = ud, $g = Ig;
function Ig(e) {
  return Sg(e).filter(function(t) {
    return t.length > 1 || t.length === 1 && e.hasEdge(t[0], t[0]);
  });
}
var Ng = Tg, Mg = () => 1;
function Tg(e, t, n) {
  return Og(
    e,
    t || Mg,
    n || function(o) {
      return e.outEdges(o);
    }
  );
}
function Og(e, t, n) {
  var o = {}, s = e.nodes();
  return s.forEach(function(i) {
    o[i] = {}, o[i][i] = { distance: 0 }, s.forEach(function(r) {
      i !== r && (o[i][r] = { distance: Number.POSITIVE_INFINITY });
    }), n(i).forEach(function(r) {
      var l = r.v === i ? r.w : r.v, a = t(r);
      o[i][l] = { distance: a, predecessor: i };
    });
  }), s.forEach(function(i) {
    var r = o[i];
    s.forEach(function(l) {
      var a = o[l];
      s.forEach(function(c) {
        var d = a[i], f = r[c], h = a[c], v = d.distance + f.distance;
        v < h.distance && (h.distance = v, h.predecessor = f.predecessor);
      });
    });
  }), o;
}
function cd(e) {
  var t = {}, n = {}, o = [];
  function s(i) {
    if (Object.hasOwn(n, i))
      throw new mr();
    Object.hasOwn(t, i) || (n[i] = !0, t[i] = !0, e.predecessors(i).forEach(s), delete n[i], o.push(i));
  }
  if (e.sinks().forEach(s), Object.keys(t).length !== e.nodeCount())
    throw new mr();
  return o;
}
class mr extends Error {
  constructor() {
    super(...arguments);
  }
}
var dd = cd;
cd.CycleException = mr;
var Ma = dd, Pg = Ag;
function Ag(e) {
  try {
    Ma(e);
  } catch (t) {
    if (t instanceof Ma.CycleException)
      return !1;
    throw t;
  }
  return !0;
}
var fd = Dg;
function Dg(e, t, n) {
  Array.isArray(t) || (t = [t]);
  var o = e.isDirected() ? (l) => e.successors(l) : (l) => e.neighbors(l), s = n === "post" ? Rg : Vg, i = [], r = {};
  return t.forEach((l) => {
    if (!e.hasNode(l))
      throw new Error("Graph does not have node: " + l);
    s(l, o, r, i);
  }), i;
}
function Rg(e, t, n, o) {
  for (var s = [[e, !1]]; s.length > 0; ) {
    var i = s.pop();
    i[1] ? o.push(i[0]) : Object.hasOwn(n, i[0]) || (n[i[0]] = !0, s.push([i[0], !0]), pd(t(i[0]), (r) => s.push([r, !1])));
  }
}
function Vg(e, t, n, o) {
  for (var s = [e]; s.length > 0; ) {
    var i = s.pop();
    Object.hasOwn(n, i) || (n[i] = !0, o.push(i), pd(t(i), (r) => s.push(r)));
  }
}
function pd(e, t) {
  for (var n = e.length; n--; )
    t(e[n], n, e);
  return e;
}
var Lg = fd, zg = Fg;
function Fg(e, t) {
  return Lg(e, t, "post");
}
var Bg = fd, Hg = Ug;
function Ug(e, t) {
  return Bg(e, t, "pre");
}
var jg = nl, Gg = ld, qg = Yg;
function Yg(e, t) {
  var n = new jg(), o = {}, s = new Gg(), i;
  function r(a) {
    var c = a.v === i ? a.w : a.v, d = s.priority(c);
    if (d !== void 0) {
      var f = t(a);
      f < d && (o[c] = i, s.decrease(c, f));
    }
  }
  if (e.nodeCount() === 0)
    return n;
  e.nodes().forEach(function(a) {
    s.add(a, Number.POSITIVE_INFINITY), n.setNode(a);
  }), s.decrease(e.nodes()[0], 0);
  for (var l = !1; s.size() > 0; ) {
    if (i = s.removeMin(), Object.hasOwn(o, i))
      n.setEdge(i, o[i]);
    else {
      if (l)
        throw new Error("Input graph is not connected: " + e);
      l = !0;
    }
    e.nodeEdges(i).forEach(r);
  }
  return n;
}
var Xg = {
  components: vg,
  dijkstra: ad,
  dijkstraAll: Eg,
  findCycles: $g,
  floydWarshall: Ng,
  isAcyclic: Pg,
  postorder: zg,
  preorder: Hg,
  prim: qg,
  tarjan: ud,
  topsort: dd
}, Ta = ag, Mt = {
  Graph: Ta.Graph,
  json: cg,
  alg: Xg,
  version: Ta.version
};
let Kg = class {
  constructor() {
    let t = {};
    t._next = t._prev = t, this._sentinel = t;
  }
  dequeue() {
    let t = this._sentinel, n = t._prev;
    if (n !== t)
      return Oa(n), n;
  }
  enqueue(t) {
    let n = this._sentinel;
    t._prev && t._next && Oa(t), t._next = n._next, n._next._prev = t, n._next = t, t._prev = n;
  }
  toString() {
    let t = [], n = this._sentinel, o = n._prev;
    for (; o !== n; )
      t.push(JSON.stringify(o, Wg)), o = o._prev;
    return "[" + t.join(", ") + "]";
  }
};
function Oa(e) {
  e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev;
}
function Wg(e, t) {
  if (e !== "_next" && e !== "_prev")
    return t;
}
var Zg = Kg;
let Jg = Mt.Graph, Qg = Zg;
var em = nm;
let tm = () => 1;
function nm(e, t) {
  if (e.nodeCount() <= 1)
    return [];
  let n = sm(e, t || tm);
  return om(n.graph, n.buckets, n.zeroIdx).flatMap((s) => e.outEdges(s.v, s.w));
}
function om(e, t, n) {
  let o = [], s = t[t.length - 1], i = t[0], r;
  for (; e.nodeCount(); ) {
    for (; r = i.dequeue(); )
      Ri(e, t, n, r);
    for (; r = s.dequeue(); )
      Ri(e, t, n, r);
    if (e.nodeCount()) {
      for (let l = t.length - 2; l > 0; --l)
        if (r = t[l].dequeue(), r) {
          o = o.concat(Ri(e, t, n, r, !0));
          break;
        }
    }
  }
  return o;
}
function Ri(e, t, n, o, s) {
  let i = s ? [] : void 0;
  return e.inEdges(o.v).forEach((r) => {
    let l = e.edge(r), a = e.node(r.v);
    s && i.push({ v: r.v, w: r.w }), a.out -= l, yr(t, n, a);
  }), e.outEdges(o.v).forEach((r) => {
    let l = e.edge(r), a = r.w, c = e.node(a);
    c.in -= l, yr(t, n, c);
  }), e.removeNode(o.v), i;
}
function sm(e, t) {
  let n = new Jg(), o = 0, s = 0;
  e.nodes().forEach((l) => {
    n.setNode(l, { v: l, in: 0, out: 0 });
  }), e.edges().forEach((l) => {
    let a = n.edge(l.v, l.w) || 0, c = t(l), d = a + c;
    n.setEdge(l.v, l.w, d), s = Math.max(s, n.node(l.v).out += c), o = Math.max(o, n.node(l.w).in += c);
  });
  let i = im(s + o + 3).map(() => new Qg()), r = o + 1;
  return n.nodes().forEach((l) => {
    yr(i, r, n.node(l));
  }), { graph: n, buckets: i, zeroIdx: r };
}
function yr(e, t, n) {
  n.out ? n.in ? e[n.out - n.in + t].enqueue(n) : e[e.length - 1].enqueue(n) : e[0].enqueue(n);
}
function im(e) {
  const t = [];
  for (let n = 0; n < e; n++)
    t.push(n);
  return t;
}
let hd = Mt.Graph;
var Je = {
  addBorderNode: hm,
  addDummyNode: vd,
  applyWithChunking: ai,
  asNonCompoundGraph: lm,
  buildLayerMatrix: dm,
  intersectRect: cm,
  mapValues: wm,
  maxRank: md,
  normalizeRanks: fm,
  notime: ym,
  partition: gm,
  pick: _m,
  predecessorWeights: um,
  range: bd,
  removeEmptyRanks: pm,
  simplify: rm,
  successorWeights: am,
  time: mm,
  uniqueId: yd,
  zipObject: ol
};
function vd(e, t, n, o) {
  for (var s = o; e.hasNode(s); )
    s = yd(o);
  return n.dummy = t, e.setNode(s, n), s;
}
function rm(e) {
  let t = new hd().setGraph(e.graph());
  return e.nodes().forEach((n) => t.setNode(n, e.node(n))), e.edges().forEach((n) => {
    let o = t.edge(n.v, n.w) || { weight: 0, minlen: 1 }, s = e.edge(n);
    t.setEdge(n.v, n.w, {
      weight: o.weight + s.weight,
      minlen: Math.max(o.minlen, s.minlen)
    });
  }), t;
}
function lm(e) {
  let t = new hd({ multigraph: e.isMultigraph() }).setGraph(e.graph());
  return e.nodes().forEach((n) => {
    e.children(n).length || t.setNode(n, e.node(n));
  }), e.edges().forEach((n) => {
    t.setEdge(n, e.edge(n));
  }), t;
}
function am(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.outEdges(n).forEach((s) => {
      o[s.w] = (o[s.w] || 0) + e.edge(s).weight;
    }), o;
  });
  return ol(e.nodes(), t);
}
function um(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.inEdges(n).forEach((s) => {
      o[s.v] = (o[s.v] || 0) + e.edge(s).weight;
    }), o;
  });
  return ol(e.nodes(), t);
}
function cm(e, t) {
  let n = e.x, o = e.y, s = t.x - n, i = t.y - o, r = e.width / 2, l = e.height / 2;
  if (!s && !i)
    throw new Error("Not possible to find intersection inside of the rectangle");
  let a, c;
  return Math.abs(i) * r > Math.abs(s) * l ? (i < 0 && (l = -l), a = l * s / i, c = l) : (s < 0 && (r = -r), a = r, c = r * i / s), { x: n + a, y: o + c };
}
function dm(e) {
  let t = bd(md(e) + 1).map(() => []);
  return e.nodes().forEach((n) => {
    let o = e.node(n), s = o.rank;
    s !== void 0 && (t[s][o.order] = n);
  }), t;
}
function fm(e) {
  let t = e.nodes().map((o) => {
    let s = e.node(o).rank;
    return s === void 0 ? Number.MAX_VALUE : s;
  }), n = ai(Math.min, t);
  e.nodes().forEach((o) => {
    let s = e.node(o);
    Object.hasOwn(s, "rank") && (s.rank -= n);
  });
}
function pm(e) {
  let t = e.nodes().map((r) => e.node(r).rank), n = ai(Math.min, t), o = [];
  e.nodes().forEach((r) => {
    let l = e.node(r).rank - n;
    o[l] || (o[l] = []), o[l].push(r);
  });
  let s = 0, i = e.graph().nodeRankFactor;
  Array.from(o).forEach((r, l) => {
    r === void 0 && l % i !== 0 ? --s : r !== void 0 && s && r.forEach((a) => e.node(a).rank += s);
  });
}
function hm(e, t, n, o) {
  let s = {
    width: 0,
    height: 0
  };
  return arguments.length >= 4 && (s.rank = n, s.order = o), vd(e, "border", s, t);
}
function vm(e, t = gd) {
  const n = [];
  for (let o = 0; o < e.length; o += t) {
    const s = e.slice(o, o + t);
    n.push(s);
  }
  return n;
}
const gd = 65535;
function ai(e, t) {
  if (t.length > gd) {
    const n = vm(t);
    return e.apply(null, n.map((o) => e.apply(null, o)));
  } else
    return e.apply(null, t);
}
function md(e) {
  const n = e.nodes().map((o) => {
    let s = e.node(o).rank;
    return s === void 0 ? Number.MIN_VALUE : s;
  });
  return ai(Math.max, n);
}
function gm(e, t) {
  let n = { lhs: [], rhs: [] };
  return e.forEach((o) => {
    t(o) ? n.lhs.push(o) : n.rhs.push(o);
  }), n;
}
function mm(e, t) {
  let n = Date.now();
  try {
    return t();
  } finally {
    console.log(e + " time: " + (Date.now() - n) + "ms");
  }
}
function ym(e, t) {
  return t();
}
let bm = 0;
function yd(e) {
  var t = ++bm;
  return e + ("" + t);
}
function bd(e, t, n = 1) {
  t == null && (t = e, e = 0);
  let o = (i) => i < t;
  n < 0 && (o = (i) => t < i);
  const s = [];
  for (let i = e; o(i); i += n)
    s.push(i);
  return s;
}
function _m(e, t) {
  const n = {};
  for (const o of t)
    e[o] !== void 0 && (n[o] = e[o]);
  return n;
}
function wm(e, t) {
  let n = t;
  return typeof t == "string" && (n = (o) => o[t]), Object.entries(e).reduce((o, [s, i]) => (o[s] = n(i, s), o), {});
}
function ol(e, t) {
  return e.reduce((n, o, s) => (n[o] = t[s], n), {});
}
let km = em, Em = Je.uniqueId;
var xm = {
  run: Cm,
  undo: $m
};
function Cm(e) {
  (e.graph().acyclicer === "greedy" ? km(e, n(e)) : Sm(e)).forEach((o) => {
    let s = e.edge(o);
    e.removeEdge(o), s.forwardName = o.name, s.reversed = !0, e.setEdge(o.w, o.v, s, Em("rev"));
  });
  function n(o) {
    return (s) => o.edge(s).weight;
  }
}
function Sm(e) {
  let t = [], n = {}, o = {};
  function s(i) {
    Object.hasOwn(o, i) || (o[i] = !0, n[i] = !0, e.outEdges(i).forEach((r) => {
      Object.hasOwn(n, r.w) ? t.push(r) : s(r.w);
    }), delete n[i]);
  }
  return e.nodes().forEach(s), t;
}
function $m(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.reversed) {
      e.removeEdge(t);
      let o = n.forwardName;
      delete n.reversed, delete n.forwardName, e.setEdge(t.w, t.v, n, o);
    }
  });
}
let Im = Je;
var Nm = {
  run: Mm,
  undo: Om
};
function Mm(e) {
  e.graph().dummyChains = [], e.edges().forEach((t) => Tm(e, t));
}
function Tm(e, t) {
  let n = t.v, o = e.node(n).rank, s = t.w, i = e.node(s).rank, r = t.name, l = e.edge(t), a = l.labelRank;
  if (i === o + 1) return;
  e.removeEdge(t);
  let c, d, f;
  for (f = 0, ++o; o < i; ++f, ++o)
    l.points = [], d = {
      width: 0,
      height: 0,
      edgeLabel: l,
      edgeObj: t,
      rank: o
    }, c = Im.addDummyNode(e, "edge", d, "_d"), o === a && (d.width = l.width, d.height = l.height, d.dummy = "edge-label", d.labelpos = l.labelpos), e.setEdge(n, c, { weight: l.weight }, r), f === 0 && e.graph().dummyChains.push(c), n = c;
  e.setEdge(n, s, { weight: l.weight }, r);
}
function Om(e) {
  e.graph().dummyChains.forEach((t) => {
    let n = e.node(t), o = n.edgeLabel, s;
    for (e.setEdge(n.edgeObj, o); n.dummy; )
      s = e.successors(t)[0], e.removeNode(t), o.points.push({ x: n.x, y: n.y }), n.dummy === "edge-label" && (o.x = n.x, o.y = n.y, o.width = n.width, o.height = n.height), t = s, n = e.node(t);
  });
}
const { applyWithChunking: Pm } = Je;
var ui = {
  longestPath: Am,
  slack: Dm
};
function Am(e) {
  var t = {};
  function n(o) {
    var s = e.node(o);
    if (Object.hasOwn(t, o))
      return s.rank;
    t[o] = !0;
    let i = e.outEdges(o).map((l) => l == null ? Number.POSITIVE_INFINITY : n(l.w) - e.edge(l).minlen);
    var r = Pm(Math.min, i);
    return r === Number.POSITIVE_INFINITY && (r = 0), s.rank = r;
  }
  e.sources().forEach(n);
}
function Dm(e, t) {
  return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen;
}
var Rm = Mt.Graph, zs = ui.slack, _d = Vm;
function Vm(e) {
  var t = new Rm({ directed: !1 }), n = e.nodes()[0], o = e.nodeCount();
  t.setNode(n, {});
  for (var s, i; Lm(t, e) < o; )
    s = zm(t, e), i = t.hasNode(s.v) ? zs(e, s) : -zs(e, s), Fm(t, e, i);
  return t;
}
function Lm(e, t) {
  function n(o) {
    t.nodeEdges(o).forEach((s) => {
      var i = s.v, r = o === i ? s.w : i;
      !e.hasNode(r) && !zs(t, s) && (e.setNode(r, {}), e.setEdge(o, r, {}), n(r));
    });
  }
  return e.nodes().forEach(n), e.nodeCount();
}
function zm(e, t) {
  return t.edges().reduce((o, s) => {
    let i = Number.POSITIVE_INFINITY;
    return e.hasNode(s.v) !== e.hasNode(s.w) && (i = zs(t, s)), i < o[0] ? [i, s] : o;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function Fm(e, t, n) {
  e.nodes().forEach((o) => t.node(o).rank += n);
}
var Bm = _d, Pa = ui.slack, Hm = ui.longestPath, Um = Mt.alg.preorder, jm = Mt.alg.postorder, Gm = Je.simplify, qm = Gn;
Gn.initLowLimValues = il;
Gn.initCutValues = sl;
Gn.calcCutValue = wd;
Gn.leaveEdge = Ed;
Gn.enterEdge = xd;
Gn.exchangeEdges = Cd;
function Gn(e) {
  e = Gm(e), Hm(e);
  var t = Bm(e);
  il(t), sl(t, e);
  for (var n, o; n = Ed(t); )
    o = xd(t, e, n), Cd(t, e, n, o);
}
function sl(e, t) {
  var n = jm(e, e.nodes());
  n = n.slice(0, n.length - 1), n.forEach((o) => Ym(e, t, o));
}
function Ym(e, t, n) {
  var o = e.node(n), s = o.parent;
  e.edge(n, s).cutvalue = wd(e, t, n);
}
function wd(e, t, n) {
  var o = e.node(n), s = o.parent, i = !0, r = t.edge(n, s), l = 0;
  return r || (i = !1, r = t.edge(s, n)), l = r.weight, t.nodeEdges(n).forEach((a) => {
    var c = a.v === n, d = c ? a.w : a.v;
    if (d !== s) {
      var f = c === i, h = t.edge(a).weight;
      if (l += f ? h : -h, Km(e, n, d)) {
        var v = e.edge(n, d).cutvalue;
        l += f ? -v : v;
      }
    }
  }), l;
}
function il(e, t) {
  arguments.length < 2 && (t = e.nodes()[0]), kd(e, {}, 1, t);
}
function kd(e, t, n, o, s) {
  var i = n, r = e.node(o);
  return t[o] = !0, e.neighbors(o).forEach((l) => {
    Object.hasOwn(t, l) || (n = kd(e, t, n, l, o));
  }), r.low = i, r.lim = n++, s ? r.parent = s : delete r.parent, n;
}
function Ed(e) {
  return e.edges().find((t) => e.edge(t).cutvalue < 0);
}
function xd(e, t, n) {
  var o = n.v, s = n.w;
  t.hasEdge(o, s) || (o = n.w, s = n.v);
  var i = e.node(o), r = e.node(s), l = i, a = !1;
  i.lim > r.lim && (l = r, a = !0);
  var c = t.edges().filter((d) => a === Aa(e, e.node(d.v), l) && a !== Aa(e, e.node(d.w), l));
  return c.reduce((d, f) => Pa(t, f) < Pa(t, d) ? f : d);
}
function Cd(e, t, n, o) {
  var s = n.v, i = n.w;
  e.removeEdge(s, i), e.setEdge(o.v, o.w, {}), il(e), sl(e, t), Xm(e, t);
}
function Xm(e, t) {
  var n = e.nodes().find((s) => !t.node(s).parent), o = Um(e, n);
  o = o.slice(1), o.forEach((s) => {
    var i = e.node(s).parent, r = t.edge(s, i), l = !1;
    r || (r = t.edge(i, s), l = !0), t.node(s).rank = t.node(i).rank + (l ? r.minlen : -r.minlen);
  });
}
function Km(e, t, n) {
  return e.hasEdge(t, n);
}
function Aa(e, t, n) {
  return n.low <= t.lim && t.lim <= n.lim;
}
var Wm = ui, Sd = Wm.longestPath, Zm = _d, Jm = qm, Qm = ey;
function ey(e) {
  var t = e.graph().ranker;
  if (t instanceof Function)
    return t(e);
  switch (e.graph().ranker) {
    case "network-simplex":
      Da(e);
      break;
    case "tight-tree":
      ny(e);
      break;
    case "longest-path":
      ty(e);
      break;
    case "none":
      break;
    default:
      Da(e);
  }
}
var ty = Sd;
function ny(e) {
  Sd(e), Zm(e);
}
function Da(e) {
  Jm(e);
}
var oy = sy;
function sy(e) {
  let t = ry(e);
  e.graph().dummyChains.forEach((n) => {
    let o = e.node(n), s = o.edgeObj, i = iy(e, t, s.v, s.w), r = i.path, l = i.lca, a = 0, c = r[a], d = !0;
    for (; n !== s.w; ) {
      if (o = e.node(n), d) {
        for (; (c = r[a]) !== l && e.node(c).maxRank < o.rank; )
          a++;
        c === l && (d = !1);
      }
      if (!d) {
        for (; a < r.length - 1 && e.node(c = r[a + 1]).minRank <= o.rank; )
          a++;
        c = r[a];
      }
      e.setParent(n, c), n = e.successors(n)[0];
    }
  });
}
function iy(e, t, n, o) {
  let s = [], i = [], r = Math.min(t[n].low, t[o].low), l = Math.max(t[n].lim, t[o].lim), a, c;
  a = n;
  do
    a = e.parent(a), s.push(a);
  while (a && (t[a].low > r || l > t[a].lim));
  for (c = a, a = o; (a = e.parent(a)) !== c; )
    i.push(a);
  return { path: s.concat(i.reverse()), lca: c };
}
function ry(e) {
  let t = {}, n = 0;
  function o(s) {
    let i = n;
    e.children(s).forEach(o), t[s] = { low: i, lim: n++ };
  }
  return e.children().forEach(o), t;
}
let Fs = Je;
var ly = {
  run: ay,
  cleanup: dy
};
function ay(e) {
  let t = Fs.addDummyNode(e, "root", {}, "_root"), n = uy(e), o = Object.values(n), s = Fs.applyWithChunking(Math.max, o) - 1, i = 2 * s + 1;
  e.graph().nestingRoot = t, e.edges().forEach((l) => e.edge(l).minlen *= i);
  let r = cy(e) + 1;
  e.children().forEach((l) => $d(e, t, i, r, s, n, l)), e.graph().nodeRankFactor = i;
}
function $d(e, t, n, o, s, i, r) {
  let l = e.children(r);
  if (!l.length) {
    r !== t && e.setEdge(t, r, { weight: 0, minlen: n });
    return;
  }
  let a = Fs.addBorderNode(e, "_bt"), c = Fs.addBorderNode(e, "_bb"), d = e.node(r);
  e.setParent(a, r), d.borderTop = a, e.setParent(c, r), d.borderBottom = c, l.forEach((f) => {
    $d(e, t, n, o, s, i, f);
    let h = e.node(f), v = h.borderTop ? h.borderTop : f, w = h.borderBottom ? h.borderBottom : f, x = h.borderTop ? o : 2 * o, I = v !== w ? 1 : s - i[r] + 1;
    e.setEdge(a, v, {
      weight: x,
      minlen: I,
      nestingEdge: !0
    }), e.setEdge(w, c, {
      weight: x,
      minlen: I,
      nestingEdge: !0
    });
  }), e.parent(r) || e.setEdge(t, a, { weight: 0, minlen: s + i[r] });
}
function uy(e) {
  var t = {};
  function n(o, s) {
    var i = e.children(o);
    i && i.length && i.forEach((r) => n(r, s + 1)), t[o] = s;
  }
  return e.children().forEach((o) => n(o, 1)), t;
}
function cy(e) {
  return e.edges().reduce((t, n) => t + e.edge(n).weight, 0);
}
function dy(e) {
  var t = e.graph();
  e.removeNode(t.nestingRoot), delete t.nestingRoot, e.edges().forEach((n) => {
    var o = e.edge(n);
    o.nestingEdge && e.removeEdge(n);
  });
}
let fy = Je;
var py = hy;
function hy(e) {
  function t(n) {
    let o = e.children(n), s = e.node(n);
    if (o.length && o.forEach(t), Object.hasOwn(s, "minRank")) {
      s.borderLeft = [], s.borderRight = [];
      for (let i = s.minRank, r = s.maxRank + 1; i < r; ++i)
        Ra(e, "borderLeft", "_bl", n, s, i), Ra(e, "borderRight", "_br", n, s, i);
    }
  }
  e.children().forEach(t);
}
function Ra(e, t, n, o, s, i) {
  let r = { width: 0, height: 0, rank: i, borderType: t }, l = s[t][i - 1], a = fy.addDummyNode(e, "border", r, n);
  s[t][i] = a, e.setParent(a, o), l && e.setEdge(l, a, { weight: 1 });
}
var vy = {
  adjust: gy,
  undo: my
};
function gy(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "lr" || t === "rl") && Id(e);
}
function my(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "bt" || t === "rl") && yy(e), (t === "lr" || t === "rl") && (by(e), Id(e));
}
function Id(e) {
  e.nodes().forEach((t) => Va(e.node(t))), e.edges().forEach((t) => Va(e.edge(t)));
}
function Va(e) {
  let t = e.width;
  e.width = e.height, e.height = t;
}
function yy(e) {
  e.nodes().forEach((t) => Vi(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(Vi), Object.hasOwn(n, "y") && Vi(n);
  });
}
function Vi(e) {
  e.y = -e.y;
}
function by(e) {
  e.nodes().forEach((t) => Li(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(Li), Object.hasOwn(n, "x") && Li(n);
  });
}
function Li(e) {
  let t = e.x;
  e.x = e.y, e.y = t;
}
let La = Je;
var _y = wy;
function wy(e) {
  let t = {}, n = e.nodes().filter((a) => !e.children(a).length), o = n.map((a) => e.node(a).rank), s = La.applyWithChunking(Math.max, o), i = La.range(s + 1).map(() => []);
  function r(a) {
    if (t[a]) return;
    t[a] = !0;
    let c = e.node(a);
    i[c.rank].push(a), e.successors(a).forEach(r);
  }
  return n.sort((a, c) => e.node(a).rank - e.node(c).rank).forEach(r), i;
}
let ky = Je.zipObject;
var Ey = xy;
function xy(e, t) {
  let n = 0;
  for (let o = 1; o < t.length; ++o)
    n += Cy(e, t[o - 1], t[o]);
  return n;
}
function Cy(e, t, n) {
  let o = ky(n, n.map((c, d) => d)), s = t.flatMap((c) => e.outEdges(c).map((d) => ({ pos: o[d.w], weight: e.edge(d).weight })).sort((d, f) => d.pos - f.pos)), i = 1;
  for (; i < n.length; ) i <<= 1;
  let r = 2 * i - 1;
  i -= 1;
  let l = new Array(r).fill(0), a = 0;
  return s.forEach((c) => {
    let d = c.pos + i;
    l[d] += c.weight;
    let f = 0;
    for (; d > 0; )
      d % 2 && (f += l[d + 1]), d = d - 1 >> 1, l[d] += c.weight;
    a += c.weight * f;
  }), a;
}
var Sy = $y;
function $y(e, t = []) {
  return t.map((n) => {
    let o = e.inEdges(n);
    if (o.length) {
      let s = o.reduce((i, r) => {
        let l = e.edge(r), a = e.node(r.v);
        return {
          sum: i.sum + l.weight * a.order,
          weight: i.weight + l.weight
        };
      }, { sum: 0, weight: 0 });
      return {
        v: n,
        barycenter: s.sum / s.weight,
        weight: s.weight
      };
    } else
      return { v: n };
  });
}
let Iy = Je;
var Ny = My;
function My(e, t) {
  let n = {};
  e.forEach((s, i) => {
    let r = n[s.v] = {
      indegree: 0,
      in: [],
      out: [],
      vs: [s.v],
      i
    };
    s.barycenter !== void 0 && (r.barycenter = s.barycenter, r.weight = s.weight);
  }), t.edges().forEach((s) => {
    let i = n[s.v], r = n[s.w];
    i !== void 0 && r !== void 0 && (r.indegree++, i.out.push(n[s.w]));
  });
  let o = Object.values(n).filter((s) => !s.indegree);
  return Ty(o);
}
function Ty(e) {
  let t = [];
  function n(s) {
    return (i) => {
      i.merged || (i.barycenter === void 0 || s.barycenter === void 0 || i.barycenter >= s.barycenter) && Oy(s, i);
    };
  }
  function o(s) {
    return (i) => {
      i.in.push(s), --i.indegree === 0 && e.push(i);
    };
  }
  for (; e.length; ) {
    let s = e.pop();
    t.push(s), s.in.reverse().forEach(n(s)), s.out.forEach(o(s));
  }
  return t.filter((s) => !s.merged).map((s) => Iy.pick(s, ["vs", "i", "barycenter", "weight"]));
}
function Oy(e, t) {
  let n = 0, o = 0;
  e.weight && (n += e.barycenter * e.weight, o += e.weight), t.weight && (n += t.barycenter * t.weight, o += t.weight), e.vs = t.vs.concat(e.vs), e.barycenter = n / o, e.weight = o, e.i = Math.min(t.i, e.i), t.merged = !0;
}
let Py = Je;
var Ay = Dy;
function Dy(e, t) {
  let n = Py.partition(e, (d) => Object.hasOwn(d, "barycenter")), o = n.lhs, s = n.rhs.sort((d, f) => f.i - d.i), i = [], r = 0, l = 0, a = 0;
  o.sort(Ry(!!t)), a = za(i, s, a), o.forEach((d) => {
    a += d.vs.length, i.push(d.vs), r += d.barycenter * d.weight, l += d.weight, a = za(i, s, a);
  });
  let c = { vs: i.flat(!0) };
  return l && (c.barycenter = r / l, c.weight = l), c;
}
function za(e, t, n) {
  let o;
  for (; t.length && (o = t[t.length - 1]).i <= n; )
    t.pop(), e.push(o.vs), n++;
  return n;
}
function Ry(e) {
  return (t, n) => t.barycenter < n.barycenter ? -1 : t.barycenter > n.barycenter ? 1 : e ? n.i - t.i : t.i - n.i;
}
let Vy = Sy, Ly = Ny, zy = Ay;
var Fy = Nd;
function Nd(e, t, n, o) {
  let s = e.children(t), i = e.node(t), r = i ? i.borderLeft : void 0, l = i ? i.borderRight : void 0, a = {};
  r && (s = s.filter((h) => h !== r && h !== l));
  let c = Vy(e, s);
  c.forEach((h) => {
    if (e.children(h.v).length) {
      let v = Nd(e, h.v, n, o);
      a[h.v] = v, Object.hasOwn(v, "barycenter") && Hy(h, v);
    }
  });
  let d = Ly(c, n);
  By(d, a);
  let f = zy(d, o);
  if (r && (f.vs = [r, f.vs, l].flat(!0), e.predecessors(r).length)) {
    let h = e.node(e.predecessors(r)[0]), v = e.node(e.predecessors(l)[0]);
    Object.hasOwn(f, "barycenter") || (f.barycenter = 0, f.weight = 0), f.barycenter = (f.barycenter * f.weight + h.order + v.order) / (f.weight + 2), f.weight += 2;
  }
  return f;
}
function By(e, t) {
  e.forEach((n) => {
    n.vs = n.vs.flatMap((o) => t[o] ? t[o].vs : o);
  });
}
function Hy(e, t) {
  e.barycenter !== void 0 ? (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight), e.weight += t.weight) : (e.barycenter = t.barycenter, e.weight = t.weight);
}
let Uy = Mt.Graph, jy = Je;
var Gy = qy;
function qy(e, t, n) {
  let o = Yy(e), s = new Uy({ compound: !0 }).setGraph({ root: o }).setDefaultNodeLabel((i) => e.node(i));
  return e.nodes().forEach((i) => {
    let r = e.node(i), l = e.parent(i);
    (r.rank === t || r.minRank <= t && t <= r.maxRank) && (s.setNode(i), s.setParent(i, l || o), e[n](i).forEach((a) => {
      let c = a.v === i ? a.w : a.v, d = s.edge(c, i), f = d !== void 0 ? d.weight : 0;
      s.setEdge(c, i, { weight: e.edge(a).weight + f });
    }), Object.hasOwn(r, "minRank") && s.setNode(i, {
      borderLeft: r.borderLeft[t],
      borderRight: r.borderRight[t]
    }));
  }), s;
}
function Yy(e) {
  for (var t; e.hasNode(t = jy.uniqueId("_root")); ) ;
  return t;
}
var Xy = Ky;
function Ky(e, t, n) {
  let o = {}, s;
  n.forEach((i) => {
    let r = e.parent(i), l, a;
    for (; r; ) {
      if (l = e.parent(r), l ? (a = o[l], o[l] = r) : (a = s, s = r), a && a !== r) {
        t.setEdge(a, r);
        return;
      }
      r = l;
    }
  });
}
let Wy = _y, Zy = Ey, Jy = Fy, Qy = Gy, e1 = Xy, t1 = Mt.Graph, ds = Je;
var n1 = Md;
function Md(e, t) {
  if (t && typeof t.customOrder == "function") {
    t.customOrder(e, Md);
    return;
  }
  let n = ds.maxRank(e), o = Fa(e, ds.range(1, n + 1), "inEdges"), s = Fa(e, ds.range(n - 1, -1, -1), "outEdges"), i = Wy(e);
  if (Ba(e, i), t && t.disableOptimalOrderHeuristic)
    return;
  let r = Number.POSITIVE_INFINITY, l;
  for (let a = 0, c = 0; c < 4; ++a, ++c) {
    o1(a % 2 ? o : s, a % 4 >= 2), i = ds.buildLayerMatrix(e);
    let d = Zy(e, i);
    d < r && (c = 0, l = Object.assign({}, i), r = d);
  }
  Ba(e, l);
}
function Fa(e, t, n) {
  return t.map(function(o) {
    return Qy(e, o, n);
  });
}
function o1(e, t) {
  let n = new t1();
  e.forEach(function(o) {
    let s = o.graph().root, i = Jy(o, s, n, t);
    i.vs.forEach((r, l) => o.node(r).order = l), e1(o, n, i.vs);
  });
}
function Ba(e, t) {
  Object.values(t).forEach((n) => n.forEach((o, s) => e.node(o).order = s));
}
let s1 = Mt.Graph, Xt = Je;
var i1 = {
  positionX: g1
};
function r1(e, t) {
  let n = {};
  function o(s, i) {
    let r = 0, l = 0, a = s.length, c = i[i.length - 1];
    return i.forEach((d, f) => {
      let h = a1(e, d), v = h ? e.node(h).order : a;
      (h || d === c) && (i.slice(l, f + 1).forEach((w) => {
        e.predecessors(w).forEach((x) => {
          let I = e.node(x), C = I.order;
          (C < r || v < C) && !(I.dummy && e.node(w).dummy) && Td(n, x, w);
        });
      }), l = f + 1, r = v);
    }), i;
  }
  return t.length && t.reduce(o), n;
}
function l1(e, t) {
  let n = {};
  function o(i, r, l, a, c) {
    let d;
    Xt.range(r, l).forEach((f) => {
      d = i[f], e.node(d).dummy && e.predecessors(d).forEach((h) => {
        let v = e.node(h);
        v.dummy && (v.order < a || v.order > c) && Td(n, h, d);
      });
    });
  }
  function s(i, r) {
    let l = -1, a, c = 0;
    return r.forEach((d, f) => {
      if (e.node(d).dummy === "border") {
        let h = e.predecessors(d);
        h.length && (a = e.node(h[0]).order, o(r, c, f, l, a), c = f, l = a);
      }
      o(r, c, r.length, a, i.length);
    }), r;
  }
  return t.length && t.reduce(s), n;
}
function a1(e, t) {
  if (e.node(t).dummy)
    return e.predecessors(t).find((n) => e.node(n).dummy);
}
function Td(e, t, n) {
  if (t > n) {
    let s = t;
    t = n, n = s;
  }
  let o = e[t];
  o || (e[t] = o = {}), o[n] = !0;
}
function u1(e, t, n) {
  if (t > n) {
    let o = t;
    t = n, n = o;
  }
  return !!e[t] && Object.hasOwn(e[t], n);
}
function c1(e, t, n, o) {
  let s = {}, i = {}, r = {};
  return t.forEach((l) => {
    l.forEach((a, c) => {
      s[a] = a, i[a] = a, r[a] = c;
    });
  }), t.forEach((l) => {
    let a = -1;
    l.forEach((c) => {
      let d = o(c);
      if (d.length) {
        d = d.sort((h, v) => r[h] - r[v]);
        let f = (d.length - 1) / 2;
        for (let h = Math.floor(f), v = Math.ceil(f); h <= v; ++h) {
          let w = d[h];
          i[c] === c && a < r[w] && !u1(n, c, w) && (i[w] = c, i[c] = s[c] = s[w], a = r[w]);
        }
      }
    });
  }), { root: s, align: i };
}
function d1(e, t, n, o, s) {
  let i = {}, r = f1(e, t, n, s), l = s ? "borderLeft" : "borderRight";
  function a(f, h) {
    let v = r.nodes(), w = v.pop(), x = {};
    for (; w; )
      x[w] ? f(w) : (x[w] = !0, v.push(w), v = v.concat(h(w))), w = v.pop();
  }
  function c(f) {
    i[f] = r.inEdges(f).reduce((h, v) => Math.max(h, i[v.v] + r.edge(v)), 0);
  }
  function d(f) {
    let h = r.outEdges(f).reduce((w, x) => Math.min(w, i[x.w] - r.edge(x)), Number.POSITIVE_INFINITY), v = e.node(f);
    h !== Number.POSITIVE_INFINITY && v.borderType !== l && (i[f] = Math.max(i[f], h));
  }
  return a(c, r.predecessors.bind(r)), a(d, r.successors.bind(r)), Object.keys(o).forEach((f) => i[f] = i[n[f]]), i;
}
function f1(e, t, n, o) {
  let s = new s1(), i = e.graph(), r = m1(i.nodesep, i.edgesep, o);
  return t.forEach((l) => {
    let a;
    l.forEach((c) => {
      let d = n[c];
      if (s.setNode(d), a) {
        var f = n[a], h = s.edge(f, d);
        s.setEdge(f, d, Math.max(r(e, c, a), h || 0));
      }
      a = c;
    });
  }), s;
}
function p1(e, t) {
  return Object.values(t).reduce((n, o) => {
    let s = Number.NEGATIVE_INFINITY, i = Number.POSITIVE_INFINITY;
    Object.entries(o).forEach(([l, a]) => {
      let c = y1(e, l) / 2;
      s = Math.max(a + c, s), i = Math.min(a - c, i);
    });
    const r = s - i;
    return r < n[0] && (n = [r, o]), n;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function h1(e, t) {
  let n = Object.values(t), o = Xt.applyWithChunking(Math.min, n), s = Xt.applyWithChunking(Math.max, n);
  ["u", "d"].forEach((i) => {
    ["l", "r"].forEach((r) => {
      let l = i + r, a = e[l];
      if (a === t) return;
      let c = Object.values(a), d = o - Xt.applyWithChunking(Math.min, c);
      r !== "l" && (d = s - Xt.applyWithChunking(Math.max, c)), d && (e[l] = Xt.mapValues(a, (f) => f + d));
    });
  });
}
function v1(e, t) {
  return Xt.mapValues(e.ul, (n, o) => {
    if (t)
      return e[t.toLowerCase()][o];
    {
      let s = Object.values(e).map((i) => i[o]).sort((i, r) => i - r);
      return (s[1] + s[2]) / 2;
    }
  });
}
function g1(e) {
  let t = Xt.buildLayerMatrix(e), n = Object.assign(
    r1(e, t),
    l1(e, t)
  ), o = {}, s;
  ["u", "d"].forEach((r) => {
    s = r === "u" ? t : Object.values(t).reverse(), ["l", "r"].forEach((l) => {
      l === "r" && (s = s.map((f) => Object.values(f).reverse()));
      let a = (r === "u" ? e.predecessors : e.successors).bind(e), c = c1(e, s, n, a), d = d1(
        e,
        s,
        c.root,
        c.align,
        l === "r"
      );
      l === "r" && (d = Xt.mapValues(d, (f) => -f)), o[r + l] = d;
    });
  });
  let i = p1(e, o);
  return h1(o, i), v1(o, e.graph().align);
}
function m1(e, t, n) {
  return (o, s, i) => {
    let r = o.node(s), l = o.node(i), a = 0, c;
    if (a += r.width / 2, Object.hasOwn(r, "labelpos"))
      switch (r.labelpos.toLowerCase()) {
        case "l":
          c = -r.width / 2;
          break;
        case "r":
          c = r.width / 2;
          break;
      }
    if (c && (a += n ? c : -c), c = 0, a += (r.dummy ? t : e) / 2, a += (l.dummy ? t : e) / 2, a += l.width / 2, Object.hasOwn(l, "labelpos"))
      switch (l.labelpos.toLowerCase()) {
        case "l":
          c = l.width / 2;
          break;
        case "r":
          c = -l.width / 2;
          break;
      }
    return c && (a += n ? c : -c), c = 0, a;
  };
}
function y1(e, t) {
  return e.node(t).width;
}
let Od = Je, b1 = i1.positionX;
var _1 = w1;
function w1(e) {
  e = Od.asNonCompoundGraph(e), k1(e), Object.entries(b1(e)).forEach(([t, n]) => e.node(t).x = n);
}
function k1(e) {
  let t = Od.buildLayerMatrix(e), n = e.graph().ranksep, o = 0;
  t.forEach((s) => {
    const i = s.reduce((r, l) => {
      const a = e.node(l).height;
      return r > a ? r : a;
    }, 0);
    s.forEach((r) => e.node(r).y = o + i / 2), o += i + n;
  });
}
let Ha = xm, Ua = Nm, E1 = Qm, x1 = Je.normalizeRanks, C1 = oy, S1 = Je.removeEmptyRanks, ja = ly, $1 = py, Ga = vy, I1 = n1, N1 = _1, Ct = Je, M1 = Mt.Graph;
var T1 = O1;
function O1(e, t) {
  let n = t && t.debugTiming ? Ct.time : Ct.notime;
  n("layout", () => {
    let o = n("  buildLayoutGraph", () => H1(e));
    n("  runLayout", () => P1(o, n, t)), n("  updateInputGraph", () => A1(e, o));
  });
}
function P1(e, t, n) {
  t("    makeSpaceForEdgeLabels", () => U1(e)), t("    removeSelfEdges", () => J1(e)), t("    acyclic", () => Ha.run(e)), t("    nestingGraph.run", () => ja.run(e)), t("    rank", () => E1(Ct.asNonCompoundGraph(e))), t("    injectEdgeLabelProxies", () => j1(e)), t("    removeEmptyRanks", () => S1(e)), t("    nestingGraph.cleanup", () => ja.cleanup(e)), t("    normalizeRanks", () => x1(e)), t("    assignRankMinMax", () => G1(e)), t("    removeEdgeLabelProxies", () => q1(e)), t("    normalize.run", () => Ua.run(e)), t("    parentDummyChains", () => C1(e)), t("    addBorderSegments", () => $1(e)), t("    order", () => I1(e, n)), t("    insertSelfEdges", () => Q1(e)), t("    adjustCoordinateSystem", () => Ga.adjust(e)), t("    position", () => N1(e)), t("    positionSelfEdges", () => eb(e)), t("    removeBorderNodes", () => Z1(e)), t("    normalize.undo", () => Ua.undo(e)), t("    fixupEdgeLabelCoords", () => K1(e)), t("    undoCoordinateSystem", () => Ga.undo(e)), t("    translateGraph", () => Y1(e)), t("    assignNodeIntersects", () => X1(e)), t("    reversePoints", () => W1(e)), t("    acyclic.undo", () => Ha.undo(e));
}
function A1(e, t) {
  e.nodes().forEach((n) => {
    let o = e.node(n), s = t.node(n);
    o && (o.x = s.x, o.y = s.y, o.rank = s.rank, t.children(n).length && (o.width = s.width, o.height = s.height));
  }), e.edges().forEach((n) => {
    let o = e.edge(n), s = t.edge(n);
    o.points = s.points, Object.hasOwn(s, "x") && (o.x = s.x, o.y = s.y);
  }), e.graph().width = t.graph().width, e.graph().height = t.graph().height;
}
let D1 = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], R1 = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" }, V1 = ["acyclicer", "ranker", "rankdir", "align"], L1 = ["width", "height", "rank"], qa = { width: 0, height: 0 }, z1 = ["minlen", "weight", "width", "height", "labeloffset"], F1 = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
}, B1 = ["labelpos"];
function H1(e) {
  let t = new M1({ multigraph: !0, compound: !0 }), n = Fi(e.graph());
  return t.setGraph(Object.assign(
    {},
    R1,
    zi(n, D1),
    Ct.pick(n, V1)
  )), e.nodes().forEach((o) => {
    let s = Fi(e.node(o));
    const i = zi(s, L1);
    Object.keys(qa).forEach((r) => {
      i[r] === void 0 && (i[r] = qa[r]);
    }), t.setNode(o, i), t.setParent(o, e.parent(o));
  }), e.edges().forEach((o) => {
    let s = Fi(e.edge(o));
    t.setEdge(o, Object.assign(
      {},
      F1,
      zi(s, z1),
      Ct.pick(s, B1)
    ));
  }), t;
}
function U1(e) {
  let t = e.graph();
  t.ranksep /= 2, e.edges().forEach((n) => {
    let o = e.edge(n);
    o.minlen *= 2, o.labelpos.toLowerCase() !== "c" && (t.rankdir === "TB" || t.rankdir === "BT" ? o.width += o.labeloffset : o.height += o.labeloffset);
  });
}
function j1(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.width && n.height) {
      let o = e.node(t.v), i = { rank: (e.node(t.w).rank - o.rank) / 2 + o.rank, e: t };
      Ct.addDummyNode(e, "edge-proxy", i, "_ep");
    }
  });
}
function G1(e) {
  let t = 0;
  e.nodes().forEach((n) => {
    let o = e.node(n);
    o.borderTop && (o.minRank = e.node(o.borderTop).rank, o.maxRank = e.node(o.borderBottom).rank, t = Math.max(t, o.maxRank));
  }), e.graph().maxRank = t;
}
function q1(e) {
  e.nodes().forEach((t) => {
    let n = e.node(t);
    n.dummy === "edge-proxy" && (e.edge(n.e).labelRank = n.rank, e.removeNode(t));
  });
}
function Y1(e) {
  let t = Number.POSITIVE_INFINITY, n = 0, o = Number.POSITIVE_INFINITY, s = 0, i = e.graph(), r = i.marginx || 0, l = i.marginy || 0;
  function a(c) {
    let d = c.x, f = c.y, h = c.width, v = c.height;
    t = Math.min(t, d - h / 2), n = Math.max(n, d + h / 2), o = Math.min(o, f - v / 2), s = Math.max(s, f + v / 2);
  }
  e.nodes().forEach((c) => a(e.node(c))), e.edges().forEach((c) => {
    let d = e.edge(c);
    Object.hasOwn(d, "x") && a(d);
  }), t -= r, o -= l, e.nodes().forEach((c) => {
    let d = e.node(c);
    d.x -= t, d.y -= o;
  }), e.edges().forEach((c) => {
    let d = e.edge(c);
    d.points.forEach((f) => {
      f.x -= t, f.y -= o;
    }), Object.hasOwn(d, "x") && (d.x -= t), Object.hasOwn(d, "y") && (d.y -= o);
  }), i.width = n - t + r, i.height = s - o + l;
}
function X1(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t), o = e.node(t.v), s = e.node(t.w), i, r;
    n.points ? (i = n.points[0], r = n.points[n.points.length - 1]) : (n.points = [], i = s, r = o), n.points.unshift(Ct.intersectRect(o, i)), n.points.push(Ct.intersectRect(s, r));
  });
}
function K1(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (Object.hasOwn(n, "x"))
      switch ((n.labelpos === "l" || n.labelpos === "r") && (n.width -= n.labeloffset), n.labelpos) {
        case "l":
          n.x -= n.width / 2 + n.labeloffset;
          break;
        case "r":
          n.x += n.width / 2 + n.labeloffset;
          break;
      }
  });
}
function W1(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    n.reversed && n.points.reverse();
  });
}
function Z1(e) {
  e.nodes().forEach((t) => {
    if (e.children(t).length) {
      let n = e.node(t), o = e.node(n.borderTop), s = e.node(n.borderBottom), i = e.node(n.borderLeft[n.borderLeft.length - 1]), r = e.node(n.borderRight[n.borderRight.length - 1]);
      n.width = Math.abs(r.x - i.x), n.height = Math.abs(s.y - o.y), n.x = i.x + n.width / 2, n.y = o.y + n.height / 2;
    }
  }), e.nodes().forEach((t) => {
    e.node(t).dummy === "border" && e.removeNode(t);
  });
}
function J1(e) {
  e.edges().forEach((t) => {
    if (t.v === t.w) {
      var n = e.node(t.v);
      n.selfEdges || (n.selfEdges = []), n.selfEdges.push({ e: t, label: e.edge(t) }), e.removeEdge(t);
    }
  });
}
function Q1(e) {
  var t = Ct.buildLayerMatrix(e);
  t.forEach((n) => {
    var o = 0;
    n.forEach((s, i) => {
      var r = e.node(s);
      r.order = i + o, (r.selfEdges || []).forEach((l) => {
        Ct.addDummyNode(e, "selfedge", {
          width: l.label.width,
          height: l.label.height,
          rank: r.rank,
          order: i + ++o,
          e: l.e,
          label: l.label
        }, "_se");
      }), delete r.selfEdges;
    });
  });
}
function eb(e) {
  e.nodes().forEach((t) => {
    var n = e.node(t);
    if (n.dummy === "selfedge") {
      var o = e.node(n.e.v), s = o.x + o.width / 2, i = o.y, r = n.x - s, l = o.height / 2;
      e.setEdge(n.e, n.label), e.removeNode(t), n.label.points = [
        { x: s + 2 * r / 3, y: i - l },
        { x: s + 5 * r / 6, y: i - l },
        { x: s + r, y: i },
        { x: s + 5 * r / 6, y: i + l },
        { x: s + 2 * r / 3, y: i + l }
      ], n.label.x = n.x, n.label.y = n.y;
    }
  });
}
function zi(e, t) {
  return Ct.mapValues(Ct.pick(e, t), Number);
}
function Fi(e) {
  var t = {};
  return e && Object.entries(e).forEach(([n, o]) => {
    typeof n == "string" && (n = n.toLowerCase()), t[n] = o;
  }), t;
}
let tb = Je, nb = Mt.Graph;
var ob = {
  debugOrdering: sb
};
function sb(e) {
  let t = tb.buildLayerMatrix(e), n = new nb({ compound: !0, multigraph: !0 }).setGraph({});
  return e.nodes().forEach((o) => {
    n.setNode(o, { label: o }), n.setParent(o, "layer" + e.node(o).rank);
  }), e.edges().forEach((o) => n.setEdge(o.v, o.w, {}, o.name)), t.forEach((o, s) => {
    let i = "layer" + s;
    n.setNode(i, { rank: "same" }), o.reduce((r, l) => (n.setEdge(r, l, { style: "invis" }), l));
  }), n;
}
var ib = "1.1.5", rb = {
  graphlib: Mt,
  layout: T1,
  debug: ob,
  util: {
    time: Je.time,
    notime: Je.notime
  },
  version: ib
};
const Ya = /* @__PURE__ */ og(rb), Xa = 190, Ka = 78, Wa = ["profile", "memory", "rag", "extensions", "voice", "live2d"];
function lb(e) {
  const t = e.nodes.find((a) => a.data.kind === "persona"), n = e.nodes.find((a) => a.data.kind === "extensions");
  if (!t || !n) return;
  const o = /* @__PURE__ */ new Map(), s = e.nodes.filter((a) => a.type === "module" && a.data.kind !== "extensions").sort((a, c) => Wa.indexOf(a.data.kind) - Wa.indexOf(c.data.kind));
  s.forEach((a, c) => o.set(a.id, { x: 34, y: 24 + c * 112 }));
  const i = 24 + (s.length - 1) * 112 / 2;
  o.set(t.id, { x: 340, y: i }), o.set(n.id, { x: 650, y: i });
  const r = new Set(e.edges.filter((a) => a.source === n.id).map((a) => a.target)), l = e.nodes.filter((a) => r.has(a.id)).sort((a, c) => a.data.level - c.data.level || a.data.label.localeCompare(c.data.label));
  if (l.length > 1) {
    const a = Math.min(3, l.length);
    l.forEach((c, d) => o.set(c.id, {
      x: 960 + d % a * 230,
      y: 24 + Math.floor(d / a) * 108
    }));
  } else if (l.length === 1) {
    const a = l[0];
    o.set(a.id, { x: 960, y: o.get(n.id).y });
    const c = /* @__PURE__ */ new Map([[a.id, 0]]), d = [a.id];
    for (; d.length; ) {
      const h = d.shift(), v = c.get(h);
      e.edges.filter((w) => w.source === h).forEach((w) => {
        c.has(w.target) || (c.set(w.target, v + 1), d.push(w.target));
      });
    }
    const f = Math.max(0, ...c.values());
    for (let h = 1; h <= f; h += 1) {
      const v = e.nodes.filter((x) => c.get(x.id) === h).sort((x, I) => x.data.label.localeCompare(I.data.label)), w = o.get(n.id).y;
      v.forEach((x, I) => o.set(x.id, {
        x: 960 + h * 260,
        y: w + (I - (v.length - 1) / 2) * 104
      }));
    }
  }
  return {
    nodes: e.nodes.map((a) => ({ ...a, position: o.get(a.id) || a.position })),
    edges: e.edges.map((a) => ({ ...a }))
  };
}
function ab(e) {
  const t = lb(e);
  if (t) return t;
  const n = new Ya.graphlib.Graph();
  return n.setDefaultEdgeLabel(() => ({})), n.setGraph({ rankdir: "LR", nodesep: 34, ranksep: 96, marginx: 28, marginy: 28 }), [...e.nodes].sort((o, s) => o.id.localeCompare(s.id)).forEach((o) => n.setNode(o.id, { width: Xa, height: Ka })), [...e.edges].sort((o, s) => o.id.localeCompare(s.id)).forEach((o) => n.setEdge(o.source, o.target)), Ya.layout(n), {
    nodes: e.nodes.map((o) => {
      const s = n.node(o.id);
      return { ...o, position: { x: s.x - Xa / 2, y: s.y - Ka / 2 } };
    }),
    edges: e.edges.map((o) => ({ ...o }))
  };
}
function ub(e, t) {
  const n = /* @__PURE__ */ new Set([t]), o = [t];
  for (; o.length; ) {
    const s = o.shift();
    for (const i of e.edges)
      i.source !== s || n.has(i.target) || (n.add(i.target), o.push(i.target));
  }
  return n;
}
function cb(e, t, n) {
  if (n.has(t)) return t;
  const o = /* @__PURE__ */ new Set(), s = [t];
  for (; s.length; ) {
    const i = s.shift();
    if (!o.has(i)) {
      o.add(i);
      for (const r of e.edges)
        if (r.target === i) {
          if (n.has(r.source)) return r.source;
          s.push(r.source);
        }
    }
  }
}
function db(e, t) {
  var a;
  const n = e.nodes.find((c) => c.data.kind === "persona");
  if (!n) return e;
  const o = (a = e.nodes.find((c) => c.data.kind === "extensions")) == null ? void 0 : a.id, s = new Set(
    e.edges.filter((c) => c.source === (o || n.id)).map((c) => c.target).filter((c) => e.nodes.some((d) => d.id === c && ["skill", "tool"].includes(d.data.kind)))
  ), i = cb(e, t, s), r = t === o, l = /* @__PURE__ */ new Set([
    n.id,
    ...e.nodes.filter((c) => c.type === "module").map((c) => c.id),
    ...i ? [i] : r ? s : []
  ]);
  return i && ub(e, i).forEach((c) => l.add(c)), {
    nodes: e.nodes.filter((c) => l.has(c.id)),
    edges: e.edges.filter((c) => l.has(c.source) && l.has(c.target))
  };
}
const fb = {
  class: "knowledge-quality",
  "aria-label": "知识质量"
}, pb = { class: "knowledge-quality-heading" }, hb = ["disabled"], vb = {
  class: "knowledge-quality-stats",
  "aria-label": "资料处理概览"
}, gb = { class: "knowledge-quality-report" }, mb = { class: "knowledge-quality-subheading" }, yb = {
  key: 0,
  class: "knowledge-quality-summary"
}, bb = {
  key: 1,
  class: "knowledge-quality-meta"
}, _b = { key: 0 }, wb = { key: 1 }, kb = { key: 2 }, Eb = { key: 3 }, xb = {
  key: 2,
  class: "knowledge-quality-empty"
}, Cb = { class: "knowledge-quality-evaluation" }, Sb = { class: "knowledge-quality-subheading" }, $b = { key: 0 }, Ib = {
  key: 0,
  class: "knowledge-quality-summary"
}, Nb = { class: "knowledge-quality-eval-facts" }, Mb = { key: 0 }, Tb = { key: 1 }, Ob = {
  key: 1,
  class: "knowledge-quality-empty"
}, Pb = {
  key: 0,
  class: "knowledge-quality-error"
}, Ab = /* @__PURE__ */ Te({
  __name: "KnowledgeQualityPanel",
  props: {
    personaId: {},
    knowledgeSpaceId: {},
    documents: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ee(null), o = ee([]), s = ee(!1), i = ee("");
    let r = 0;
    const l = ae(() => Pv(t.documents)), a = ae(() => {
      if (!n.value) return l.value;
      const I = Number(n.value.total_documents), C = Number(n.value.indexed_count ?? n.value.indexed_documents), D = Number(n.value.in_progress_count ?? n.value.processing_documents), _ = Number(n.value.failed_count ?? n.value.failed_documents);
      return [I, C, D, _].every(Number.isFinite) ? { total: I, indexed: C, processing: D, failed: _, attention: D + _ } : l.value;
    }), c = ae(() => o.value[0] || null), d = ae(() => Rv(n.value)), f = ae(() => {
      var C, D, _;
      const I = ((C = n.value) == null ? void 0 : C.chunk_count) ?? ((D = n.value) == null ? void 0 : D.chunks) ?? ((_ = n.value) == null ? void 0 : _.total_chunks);
      return Number.isFinite(Number(I)) ? Number(I) : null;
    }), h = ae(() => {
      var I, C, D;
      return ((C = (I = c.value) == null ? void 0 : I.metrics) == null ? void 0 : C.accepted_rate) ?? ((D = c.value) == null ? void 0 : D.accepted_rate);
    }), v = ae(() => {
      var D;
      const I = (D = n.value) == null ? void 0 : D.index_version_counts;
      if (!I) return "";
      const [C] = Object.keys(I);
      return C ? `索引 ${C}` : "";
    });
    function w(I) {
      if (!I) return "";
      const C = new Date(I);
      return Number.isNaN(C.getTime()) ? I : new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(C);
    }
    async function x() {
      const I = ++r;
      if (!t.knowledgeSpaceId) {
        n.value = null, o.value = [], i.value = "";
        return;
      }
      s.value = !0, i.value = "";
      const [C, D] = await Promise.allSettled([
        Jv(t.knowledgeSpaceId),
        Qv(t.personaId)
      ]);
      if (I !== r) return;
      C.status === "fulfilled" && (n.value = C.value), D.status === "fulfilled" && (o.value = D.value);
      const _ = [C, D].find((m) => m.status === "rejected");
      (_ == null ? void 0 : _.status) === "rejected" && (i.value = _.reason instanceof Error ? _.reason.message : String(_.reason)), s.value = !1;
    }
    return Ne(() => [t.personaId, t.knowledgeSpaceId], x), lt(x), (I, C) => {
      var D, _, m;
      return S(), O("section", fb, [
        u("header", pb, [
          C[0] || (C[0] = u("div", null, [
            u("span", null, "知识质量"),
            u("strong", null, "处理与评测")
          ], -1)),
          u("button", {
            type: "button",
            class: "knowledge-quality-refresh",
            disabled: s.value || I.disabled || !I.knowledgeSpaceId,
            title: "刷新知识质量",
            onClick: x
          }, [
            ne(H(zt), {
              size: 13,
              class: me({ "is-spinning": s.value })
            }, null, 8, ["class"]),
            u("span", null, F(s.value ? "读取中" : "刷新"), 1)
          ], 8, hb)
        ]),
        u("div", vb, [
          u("div", null, [
            u("strong", null, F(a.value.total), 1),
            C[1] || (C[1] = u("span", null, "资料", -1))
          ]),
          u("div", null, [
            u("strong", null, F(a.value.indexed), 1),
            C[2] || (C[2] = u("span", null, "已索引", -1))
          ]),
          u("div", {
            class: me({ "has-attention": a.value.attention > 0 })
          }, [
            u("strong", null, F(a.value.attention), 1),
            C[3] || (C[3] = u("span", null, "需处理", -1))
          ], 2)
        ]),
        u("div", gb, [
          u("div", mb, [
            C[4] || (C[4] = u("span", null, "处理报告", -1)),
            u("b", {
              class: me({ "is-attention": a.value.attention > 0 })
            }, F(d.value), 3)
          ]),
          (D = n.value) != null && D.summary ? (S(), O("p", yb, F(n.value.summary), 1)) : le("", !0),
          f.value !== null || v.value ? (S(), O("p", bb, [
            f.value !== null ? (S(), O("span", _b, F(f.value) + " 个片段", 1)) : le("", !0),
            f.value !== null && v.value ? (S(), O("span", wb, " · ")) : le("", !0),
            v.value ? (S(), O("span", kb, F(v.value), 1)) : le("", !0),
            (_ = n.value) != null && _.latest_updated_at || (m = n.value) != null && m.updated_at ? (S(), O("span", Eb, " · " + F(w(n.value.latest_updated_at || n.value.updated_at)) + " 更新", 1)) : le("", !0)
          ])) : n.value ? le("", !0) : (S(), O("p", xb, "暂无处理报告，当前先显示资料状态。"))
        ]),
        u("div", Cb, [
          u("div", Sb, [
            C[5] || (C[5] = u("span", null, "最近评测", -1)),
            c.value ? (S(), O("b", $b, F(H(Vv)(c.value.status)), 1)) : le("", !0)
          ]),
          c.value ? (S(), O(ye, { key: 0 }, [
            c.value.summary ? (S(), O("p", Ib, F(c.value.summary), 1)) : le("", !0),
            u("div", Nb, [
              h.value !== void 0 && h.value !== null ? (S(), O("span", Mb, [
                C[6] || (C[6] = ve("通过率 ")),
                u("strong", null, F(H(Dv)(h.value)), 1)
              ])) : le("", !0),
              c.value.created_at ? (S(), O("span", Tb, F(w(c.value.created_at)), 1)) : le("", !0)
            ])
          ], 64)) : (S(), O("p", Ob, "暂无已保存评测，可从下方进入完整 RAG 评测。"))
        ]),
        i.value ? (S(), O("p", Pb, "读取质量数据失败：" + F(i.value), 1)) : le("", !0)
      ]);
    };
  }
}), Db = ["aria-busy"], Rb = {
  key: 0,
  class: "inspect-fields"
}, Vb = ["value"], Lb = ["value"], zb = ["value"], Fb = { class: "inspect-fieldset" }, Bb = ["value"], Hb = ["value"], Ub = ["value"], jb = ["value"], Gb = ["value"], qb = { class: "inline-check" }, Yb = ["checked"], Xb = {
  key: 1,
  class: "inspect-stack rag-inspector"
}, Kb = ["disabled"], Wb = {
  key: 0,
  class: "pending-files"
}, Zb = ["onClick"], Jb = ["onClick"], Qb = ["disabled"], e0 = { class: "document-items" }, t0 = { class: "document-actions" }, n0 = ["onClick"], o0 = ["onClick"], s0 = ["onClick"], i0 = {
  key: 2,
  class: "inspect-stack"
}, r0 = {
  key: 3,
  class: "inspect-stack"
}, l0 = {
  key: 4,
  class: "inspect-fields"
}, a0 = { class: "inline-check" }, u0 = ["checked"], c0 = { class: "inline-check" }, d0 = ["checked"], f0 = ["value"], p0 = ["value"], h0 = ["value"], v0 = { class: "inspect-button-row" }, g0 = ["disabled"], m0 = {
  key: 5,
  class: "live2d-model-library"
}, y0 = { class: "live2d-binding-summary" }, b0 = ["disabled"], _0 = { class: "live2d-library-actions" }, w0 = ["disabled"], k0 = ["disabled"], E0 = { class: "live2d-model-heading" }, x0 = {
  key: 0,
  class: "live2d-model-items"
}, C0 = { class: "live2d-model-copy" }, S0 = { class: "live2d-model-state" }, $0 = {
  key: 0,
  type: "button",
  disabled: "",
  class: "is-bound"
}, I0 = ["disabled", "title", "onClick"], N0 = {
  key: 1,
  class: "live2d-model-empty"
}, M0 = {
  key: 6,
  class: "inspect-fields"
}, T0 = { key: 0 }, O0 = ["value"], P0 = { key: 1 }, A0 = {
  key: 2,
  class: "dependency-list"
}, D0 = {
  key: 7,
  class: "inspect-fields"
}, R0 = { class: "inline-check" }, V0 = ["checked", "disabled"], L0 = /* @__PURE__ */ Te({
  __name: "NodeInspector",
  props: {
    node: {},
    draft: {},
    disabled: { type: Boolean },
    uploadCompleteToken: {}
  },
  emits: ["profile", "capability", "server", "upload", "deleteDocument", "retryDocument", "deletePersona", "previewVoice", "openVoiceStudio", "openRagEval", "previewDocument", "previewLocalFile", "refreshLive2d", "openLive2dDirectory"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = ee([]), i = ee(""), r = ee(0), l = ae(() => {
      var j;
      return ((j = n.node) == null ? void 0 : j.data.kind) || "persona";
    }), a = ae(() => n.draft.capabilities.packages.find((j) => {
      var P;
      return j.id === ((P = n.node) == null ? void 0 : P.id);
    })), c = ae(() => l.value === "mcp" ? n.draft.grants.servers.find((j) => {
      var P;
      return `mcp:${j.name}` === ((P = n.node) == null ? void 0 : P.id);
    }) : void 0), d = ae(() => {
      const j = n.node ? n.draft.capabilities.overrides[n.node.id] : void 0;
      return j === !0 ? "allow" : j === !1 ? "deny" : "inherit";
    }), f = ae(() => {
      var j, P;
      return String(((P = (j = n.draft.persona.profile) == null ? void 0 : j.live2d) == null ? void 0 : P.model) || "");
    }), h = ae(() => {
      var j;
      return ((j = n.draft.resources) == null ? void 0 : j.live2dModels) || [];
    }), v = ae(() => {
      var j;
      return { available: "可用", partial: "部分可用", unassigned: "未分配", blocked: "不可用", pending: "等待中", error: "异常" }[((j = n.node) == null ? void 0 : j.data.status) || "blocked"];
    });
    function w(j) {
      return j.kind === "cubism2" ? "Cubism 2" : j.moc_version ? `MOC3 v${j.moc_version}` : "Cubism / MOC3";
    }
    function x(j, P) {
      const L = Qe(n.draft.persona), X = { ...L.profile || {} };
      j === "name" ? L.name = String(P) : X[j] = P, L.profile = X, o("profile", L);
    }
    function I(j, P) {
      const L = Qe(n.draft.persona), X = { ...L.profile || {} };
      X.tts = { ...X.tts || {}, [j]: P }, L.profile = X, o("profile", L);
    }
    function C(j) {
      const P = Qe(n.draft.persona), L = { ...P.profile || {} };
      L.live2d = { ...L.live2d || {}, model: j }, P.profile = L, o("profile", P);
    }
    const D = ae(() => {
      var j;
      return ((j = n.draft.persona.profile) == null ? void 0 : j.rag) || {};
    });
    function _(j, P) {
      const L = Qe(n.draft.persona), X = { ...L.profile || {} };
      X.rag = { ...X.rag || {}, [j]: P }, L.profile = X, o("profile", L);
    }
    function m(j) {
      s.value = Array.from(j.target.files || []);
    }
    function z(j) {
      var P;
      s.value = Array.from(((P = j.dataTransfer) == null ? void 0 : P.files) || []);
    }
    function Y(j) {
      s.value = s.value.filter((P, L) => L !== j);
    }
    function q() {
      n.disabled || !s.value.length && !i.value.trim() || o("upload", s.value, i.value);
    }
    return Ne(() => n.uploadCompleteToken, () => {
      s.value = [], i.value = "", r.value += 1;
    }), (j, P) => {
      var L, X, U, K, $, V, M, R, G, oe, ue, de, re, fe, ce, he;
      return S(), O("aside", {
        class: me(["node-inspector", { "is-disabled": j.disabled }]),
        "aria-busy": j.disabled
      }, [
        u("header", null, [
          u("div", null, [
            u("strong", null, F(((L = j.node) == null ? void 0 : L.data.label) || "角色配置"), 1),
            u("small", null, F((X = j.node) == null ? void 0 : X.data.summary), 1)
          ]),
          j.node ? (S(), O("span", {
            key: 0,
            class: me(`inspect-status status-${j.node.data.status}`)
          }, F(v.value), 3)) : le("", !0)
        ]),
        l.value === "profile" ? (S(), O("div", Rb, [
          u("label", null, [
            P[24] || (P[24] = u("span", null, "角色名称", -1)),
            u("input", {
              value: j.draft.persona.name,
              onInput: P[0] || (P[0] = (te) => x("name", te.target.value))
            }, null, 40, Vb)
          ]),
          u("label", null, [
            P[25] || (P[25] = u("span", null, "角色人设", -1)),
            u("textarea", {
              rows: "7",
              value: String(((U = j.draft.persona.profile) == null ? void 0 : U.description) || ""),
              onInput: P[1] || (P[1] = (te) => x("description", te.target.value))
            }, null, 40, Lb)
          ]),
          u("label", null, [
            P[27] || (P[27] = u("span", null, "回复语言", -1)),
            u("select", {
              value: String(((K = j.draft.persona.profile) == null ? void 0 : K.reply_language) || ""),
              onChange: P[2] || (P[2] = (te) => x("reply_language", te.target.value))
            }, P[26] || (P[26] = [
              u("option", { value: "" }, "跟随对话", -1),
              u("option", { value: "zh" }, "中文", -1),
              u("option", { value: "ja" }, "日语", -1),
              u("option", { value: "en" }, "英语", -1)
            ]), 40, zb)
          ]),
          u("fieldset", Fb, [
            P[35] || (P[35] = u("legend", null, "知识检索", -1)),
            u("label", null, [
              P[29] || (P[29] = u("span", null, "检索预设", -1)),
              u("select", {
                value: String(D.value.profile || "deep"),
                onChange: P[3] || (P[3] = (te) => _("profile", te.target.value))
              }, P[28] || (P[28] = [
                u("option", { value: "precise" }, "精准检索", -1),
                u("option", { value: "deep" }, "深度检索", -1),
                u("option", { value: "custom" }, "自定义", -1)
              ]), 40, Bb)
            ]),
            D.value.profile === "custom" ? (S(), O(ye, { key: 0 }, [
              u("label", null, [
                P[30] || (P[30] = u("span", null, "初始召回 K", -1)),
                u("input", {
                  type: "number",
                  min: "1",
                  max: "100",
                  value: D.value.retrieval_k || 20,
                  onChange: P[4] || (P[4] = (te) => _("retrieval_k", Number(te.target.value)))
                }, null, 40, Hb)
              ]),
              u("label", null, [
                P[31] || (P[31] = u("span", null, "重排保留 K", -1)),
                u("input", {
                  type: "number",
                  min: "1",
                  max: "100",
                  value: D.value.rerank_k || 8,
                  onChange: P[5] || (P[5] = (te) => _("rerank_k", Number(te.target.value)))
                }, null, 40, Ub)
              ]),
              u("label", null, [
                P[32] || (P[32] = u("span", null, "最终上下文 K", -1)),
                u("input", {
                  type: "number",
                  min: "1",
                  max: "30",
                  value: D.value.final_context_k || 8,
                  onChange: P[6] || (P[6] = (te) => _("final_context_k", Number(te.target.value)))
                }, null, 40, jb)
              ]),
              u("label", null, [
                P[33] || (P[33] = u("span", null, "证据 Token 预算", -1)),
                u("input", {
                  type: "number",
                  min: "256",
                  max: "20000",
                  step: "256",
                  value: D.value.evidence_token_budget || 4500,
                  onChange: P[7] || (P[7] = (te) => _("evidence_token_budget", Number(te.target.value)))
                }, null, 40, Gb)
              ]),
              u("label", qb, [
                u("input", {
                  type: "checkbox",
                  checked: D.value.allow_neighbors !== !1,
                  onChange: P[8] || (P[8] = (te) => _("allow_neighbors", te.target.checked))
                }, null, 40, Yb),
                P[34] || (P[34] = u("span", null, "允许补充相邻片段", -1))
              ])
            ], 64)) : le("", !0),
            P[36] || (P[36] = u("small", null, "查询时直接使用这里保存的参数，不额外调用模型判断检索模式。", -1))
          ]),
          u("button", {
            type: "button",
            class: "inspect-danger",
            onClick: P[9] || (P[9] = (te) => o("deletePersona"))
          }, [
            ne(H(en), { size: 15 }),
            P[37] || (P[37] = ve("删除当前角色"))
          ])
        ])) : l.value === "rag" ? (S(), O("div", Xb, [
          u("p", null, F(j.draft.documents.length) + " 份资料已关联到角色知识空间。", 1),
          u("label", {
            class: "document-picker",
            onDragover: P[10] || (P[10] = mt(() => {
            }, ["prevent"])),
            onDrop: mt(z, ["prevent"])
          }, [
            ne(H(vr), { size: 15 }),
            u("span", null, F(s.value.length ? `已选择 ${s.value.length} 个文件` : "选择或拖入资料文件"), 1),
            (S(), O("input", {
              key: r.value,
              type: "file",
              multiple: "",
              disabled: j.disabled,
              onChange: m
            }, null, 40, Kb))
          ], 32),
          s.value.length ? (S(), O("ul", Wb, [
            (S(!0), O(ye, null, Oe(s.value, (te, _e) => (S(), O("li", {
              key: `${te.name}-${te.size}-${_e}`
            }, [
              u("span", null, F(te.name), 1),
              u("span", null, [
                u("button", {
                  type: "button",
                  title: "上传前预览",
                  onClick: (xe) => o("previewLocalFile", te)
                }, [
                  ne(H(Ca), { size: 14 })
                ], 8, Zb),
                u("button", {
                  type: "button",
                  title: "移除",
                  onClick: (xe) => Y(_e)
                }, [
                  ne(H(en), { size: 14 })
                ], 8, Jb)
              ])
            ]))), 128))
          ])) : le("", !0),
          u("label", null, [
            P[38] || (P[38] = u("span", null, "补充文本", -1)),
            Ie(u("textarea", {
              "onUpdate:modelValue": P[11] || (P[11] = (te) => i.value = te),
              rows: "3",
              placeholder: "直接写入角色知识库"
            }, null, 512), [
              [Re, i.value]
            ])
          ]),
          u("button", {
            type: "button",
            class: "inspect-action",
            disabled: j.disabled || !s.value.length && !i.value.trim(),
            onClick: q
          }, [
            ne(H(vr), { size: 15 }),
            ve(F(j.disabled ? "处理中" : "写入知识库"), 1)
          ], 8, Qb),
          u("ul", e0, [
            (S(!0), O(ye, null, Oe(j.draft.documents, (te) => (S(), O("li", {
              key: String(te.id)
            }, [
              u("div", null, [
                u("b", null, F(te.original_filename || te.original_name || te.id), 1),
                u("span", null, F(te.status), 1)
              ]),
              u("span", t0, [
                u("button", {
                  type: "button",
                  title: "预览 Markdown",
                  onClick: (_e) => o("previewDocument", te)
                }, [
                  ne(H(Ca), { size: 14 })
                ], 8, n0),
                te.status === "index_failed" ? (S(), O("button", {
                  key: 0,
                  type: "button",
                  title: "重新索引",
                  onClick: (_e) => o("retryDocument", String(te.id))
                }, [
                  ne(H(el), { size: 14 })
                ], 8, o0)) : le("", !0),
                u("button", {
                  type: "button",
                  title: "删除资料",
                  onClick: (_e) => o("deleteDocument", String(te.id))
                }, [
                  ne(H(en), { size: 14 })
                ], 8, s0)
              ])
            ]))), 128))
          ]),
          ne(Ab, {
            "persona-id": j.draft.persona.id,
            "knowledge-space-id": j.draft.persona.knowledge_space_id,
            documents: j.draft.documents,
            disabled: j.disabled
          }, null, 8, ["persona-id", "knowledge-space-id", "documents", "disabled"]),
          u("button", {
            type: "button",
            class: "inspect-action",
            onClick: P[12] || (P[12] = (te) => o("openRagEval"))
          }, [
            ne(H(fr), { size: 15 }),
            P[39] || (P[39] = ve("前往 RAG 评测"))
          ])
        ])) : l.value === "memory" ? (S(), O("div", i0, P[40] || (P[40] = [
          u("p", null, "会话记忆按对话窗口隔离，长期记忆与角色绑定。", -1),
          u("small", null, "清理操作继续在对应对话或接入窗口执行，避免误清其他会话。", -1)
        ]))) : l.value === "extensions" ? (S(), O("div", r0, [
          u("p", null, "当前角色可配置 " + F(j.draft.capabilities.packages.length) + " 项扩展能力。", 1),
          P[41] || (P[41] = u("small", null, "选择画布中的 Skill 或 Tool 查看依赖并设置角色策略；依赖只在选中时展开。", -1))
        ])) : l.value === "voice" ? (S(), O("div", l0, [
          u("label", a0, [
            u("input", {
              type: "checkbox",
              checked: !!((V = ($ = j.draft.persona.profile) == null ? void 0 : $.tts) != null && V.enabled),
              onChange: P[13] || (P[13] = (te) => I("enabled", te.target.checked))
            }, null, 40, u0),
            P[42] || (P[42] = u("span", null, "生成语音", -1))
          ]),
          u("label", c0, [
            u("input", {
              type: "checkbox",
              checked: !!((R = (M = j.draft.persona.profile) == null ? void 0 : M.tts) != null && R.auto_play),
              onChange: P[14] || (P[14] = (te) => I("auto_play", te.target.checked))
            }, null, 40, d0),
            P[43] || (P[43] = u("span", null, "自动播放", -1))
          ]),
          u("label", null, [
            P[45] || (P[45] = u("span", null, "角色音色", -1)),
            u("select", {
              value: String(((oe = (G = j.draft.persona.profile) == null ? void 0 : G.tts) == null ? void 0 : oe.voice_asset_id) || ""),
              onChange: P[15] || (P[15] = (te) => I("voice_asset_id", te.target.value))
            }, [
              P[44] || (P[44] = u("option", { value: "" }, "不绑定音色", -1)),
              (S(!0), O(ye, null, Oe((ue = j.draft.resources) == null ? void 0 : ue.voiceAssets, (te) => (S(), O("option", {
                key: te.id,
                value: te.id
              }, F(te.name), 9, p0))), 128))
            ], 40, f0)
          ]),
          u("label", null, [
            P[47] || (P[47] = u("span", null, "输出语言", -1)),
            u("select", {
              value: String(((re = (de = j.draft.persona.profile) == null ? void 0 : de.tts) == null ? void 0 : re.output_language) || "auto"),
              onChange: P[16] || (P[16] = (te) => I("output_language", te.target.value))
            }, P[46] || (P[46] = [
              u("option", { value: "auto" }, "自动", -1),
              u("option", { value: "zh" }, "中文", -1),
              u("option", { value: "ja" }, "日语", -1),
              u("option", { value: "en" }, "英语", -1)
            ]), 40, h0)
          ]),
          u("div", v0, [
            u("button", {
              type: "button",
              class: "inspect-action",
              disabled: !((ce = (fe = j.draft.persona.profile) == null ? void 0 : fe.tts) != null && ce.voice_asset_id),
              onClick: P[17] || (P[17] = (te) => o("previewVoice"))
            }, [
              ne(H(od), { size: 15 }),
              P[48] || (P[48] = ve("试听"))
            ], 8, g0),
            u("button", {
              type: "button",
              class: "inspect-action",
              onClick: P[18] || (P[18] = (te) => o("openVoiceStudio"))
            }, [
              ne(H(fr), { size: 15 }),
              P[49] || (P[49] = ve("声音工坊"))
            ])
          ])
        ])) : l.value === "live2d" ? (S(), O("div", m0, [
          u("section", y0, [
            P[50] || (P[50] = u("span", null, "当前角色绑定", -1)),
            u("strong", null, F(f.value || "未绑定模型"), 1),
            f.value ? (S(), O("button", {
              key: 0,
              type: "button",
              disabled: j.disabled,
              onClick: P[19] || (P[19] = (te) => C(""))
            }, "解除绑定", 8, b0)) : le("", !0)
          ]),
          u("div", _0, [
            u("button", {
              type: "button",
              disabled: j.disabled,
              title: "重新扫描模型",
              onClick: P[20] || (P[20] = (te) => o("refreshLive2d"))
            }, [
              ne(H(zt), { size: 15 }),
              P[51] || (P[51] = ve("刷新"))
            ], 8, w0),
            u("button", {
              type: "button",
              disabled: j.disabled,
              title: "打开 Live2D 模型文件夹",
              onClick: P[21] || (P[21] = (te) => o("openLive2dDirectory"))
            }, [
              ne(H(Ao), { size: 15 }),
              P[52] || (P[52] = ve("打开文件夹"))
            ], 8, k0)
          ]),
          u("div", E0, [
            P[53] || (P[53] = u("strong", null, "已安装模型", -1)),
            u("span", null, F(h.value.length) + " 个", 1)
          ]),
          h.value.length ? (S(), O("ul", x0, [
            (S(!0), O(ye, null, Oe(h.value, (te) => (S(), O("li", {
              key: te.id,
              class: me({ bound: f.value === te.id, incompatible: te.compatible === !1 })
            }, [
              u("div", C0, [
                u("strong", null, F(te.name), 1),
                u("span", null, F(w(te)), 1)
              ]),
              u("div", S0, [
                u("span", {
                  class: me(te.compatible === !1 ? "is-error" : "is-compatible")
                }, F(te.compatible === !1 ? "不兼容" : "兼容"), 3),
                f.value === te.id ? (S(), O("button", $0, [
                  ne(H(Rn), { size: 14 }),
                  P[54] || (P[54] = ve("已绑定"))
                ])) : (S(), O("button", {
                  key: 1,
                  type: "button",
                  disabled: j.disabled || te.compatible === !1,
                  title: te.compatible === !1 ? "当前 Live2D 运行时不支持此 MOC3 版本" : `绑定 ${te.name}`,
                  onClick: (_e) => C(te.id)
                }, "绑定", 8, I0))
              ])
            ], 2))), 128))
          ])) : (S(), O("div", N0, P[55] || (P[55] = [
            u("strong", null, "尚未发现模型", -1),
            u("p", null, "将模型文件夹放入 data/live2d 后刷新。", -1)
          ]))),
          P[56] || (P[56] = u("p", { class: "live2d-save-hint" }, "绑定修改会随页面顶部“保存配置”一起生效。", -1))
        ])) : l.value === "skill" || l.value === "tool" ? (S(), O("div", M0, [
          a.value ? (S(), O("label", T0, [
            P[58] || (P[58] = u("span", null, "角色策略", -1)),
            u("select", {
              value: d.value,
              onChange: P[22] || (P[22] = (te) => o("capability", j.node.id, te.target.value))
            }, P[57] || (P[57] = [
              u("option", { value: "inherit" }, "继承默认", -1),
              u("option", { value: "allow" }, "允许", -1),
              u("option", { value: "deny" }, "禁用", -1)
            ]), 40, O0)
          ])) : (S(), O("p", P0, "此 Tool 由上级能力包管理，不单独保存开关。")),
          a.value ? (S(), O("div", A0, [
            P[59] || (P[59] = u("b", null, "依赖", -1)),
            (S(!0), O(ye, null, Oe(a.value.dependencies, (te) => (S(), O("p", {
              key: te.id || te.name
            }, [
              u("span", null, F(te.name), 1),
              u("em", null, F(te.server || te.source), 1)
            ]))), 128))
          ])) : le("", !0)
        ])) : l.value === "mcp" && c.value ? (S(), O("div", D0, [
          u("label", R0, [
            u("input", {
              type: "checkbox",
              checked: c.value.authorized,
              disabled: c.value.global,
              onChange: P[23] || (P[23] = (te) => o("server", c.value.name, te.target.checked))
            }, null, 40, V0),
            u("span", null, F(c.value.global ? "全局授权" : "允许当前角色使用"), 1)
          ]),
          u("p", null, F(c.value.description || "MCP 服务"), 1),
          u("small", null, "连接状态：" + F(((he = c.value.status) == null ? void 0 : he.status) || "unknown"), 1)
        ])) : le("", !0)
      ], 10, Db);
    };
  }
});
function ci(e) {
  return Fr() ? (ks(e), !0) : !1;
}
function Kt(e) {
  return typeof e == "function" ? e() : H(e);
}
const z0 = typeof window < "u" && typeof document < "u", F0 = (e) => typeof e < "u", B0 = Object.prototype.toString, H0 = (e) => B0.call(e) === "[object Object]", U0 = () => {
};
function j0(e, t) {
  function n(...o) {
    return new Promise((s, i) => {
      Promise.resolve(e(() => t.apply(this, o), { fn: t, thisArg: this, args: o })).then(s).catch(i);
    });
  }
  return n;
}
const Pd = (e) => e();
function G0(e = Pd) {
  const t = ee(!0);
  function n() {
    t.value = !1;
  }
  function o() {
    t.value = !0;
  }
  const s = (...i) => {
    t.value && e(...i);
  };
  return { isActive: Gr(t), pause: n, resume: o, eventFilter: s };
}
function Za(e, t = !1, n = "Timeout") {
  return new Promise((o, s) => {
    setTimeout(t ? () => s(n) : o, e);
  });
}
function q0(e, t, n = {}) {
  const {
    eventFilter: o = Pd,
    ...s
  } = n;
  return Ne(
    e,
    j0(
      o,
      t
    ),
    s
  );
}
function Yn(e, t, n = {}) {
  const {
    eventFilter: o,
    ...s
  } = n, { eventFilter: i, pause: r, resume: l, isActive: a } = G0(o);
  return { stop: q0(
    e,
    t,
    {
      ...s,
      eventFilter: i
    }
  ), pause: r, resume: l, isActive: a };
}
function Y0(e, t = {}) {
  if (!Ke(e))
    return Ip(e);
  const n = Array.isArray(e.value) ? Array.from({ length: e.value.length }) : {};
  for (const o in e.value)
    n[o] = $p(() => ({
      get() {
        return e.value[o];
      },
      set(s) {
        var i;
        if ((i = Kt(t.replaceRef)) != null ? i : !0)
          if (Array.isArray(e.value)) {
            const l = [...e.value];
            l[o] = s, e.value = l;
          } else {
            const l = { ...e.value, [o]: s };
            Object.setPrototypeOf(l, Object.getPrototypeOf(e.value)), e.value = l;
          }
        else
          e.value[o] = s;
      }
    }));
  return n;
}
function br(e, t = !1) {
  function n(f, { flush: h = "sync", deep: v = !1, timeout: w, throwOnTimeout: x } = {}) {
    let I = null;
    const D = [new Promise((_) => {
      I = Ne(
        e,
        (m) => {
          f(m) !== t && (I == null || I(), _(m));
        },
        {
          flush: h,
          deep: v,
          immediate: !0
        }
      );
    })];
    return w != null && D.push(
      Za(w, x).then(() => Kt(e)).finally(() => I == null ? void 0 : I())
    ), Promise.race(D);
  }
  function o(f, h) {
    if (!Ke(f))
      return n((m) => m === f, h);
    const { flush: v = "sync", deep: w = !1, timeout: x, throwOnTimeout: I } = h ?? {};
    let C = null;
    const _ = [new Promise((m) => {
      C = Ne(
        [e, f],
        ([z, Y]) => {
          t !== (z === Y) && (C == null || C(), m(z));
        },
        {
          flush: v,
          deep: w,
          immediate: !0
        }
      );
    })];
    return x != null && _.push(
      Za(x, I).then(() => Kt(e)).finally(() => (C == null || C(), Kt(e)))
    ), Promise.race(_);
  }
  function s(f) {
    return n((h) => !!h, f);
  }
  function i(f) {
    return o(null, f);
  }
  function r(f) {
    return o(void 0, f);
  }
  function l(f) {
    return n(Number.isNaN, f);
  }
  function a(f, h) {
    return n((v) => {
      const w = Array.from(v);
      return w.includes(f) || w.includes(Kt(f));
    }, h);
  }
  function c(f) {
    return d(1, f);
  }
  function d(f = 1, h) {
    let v = -1;
    return n(() => (v += 1, v >= f), h);
  }
  return Array.isArray(Kt(e)) ? {
    toMatch: n,
    toContains: a,
    changed: c,
    changedTimes: d,
    get not() {
      return br(e, !t);
    }
  } : {
    toMatch: n,
    toBe: o,
    toBeTruthy: s,
    toBeNull: i,
    toBeNaN: l,
    toBeUndefined: r,
    changed: c,
    changedTimes: d,
    get not() {
      return br(e, !t);
    }
  };
}
function _r(e) {
  return br(e);
}
function X0(e) {
  var t;
  const n = Kt(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Ad = z0 ? window : void 0;
function Dd(...e) {
  let t, n, o, s;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, s] = e, t = Ad) : [t, n, o, s] = e, !t)
    return U0;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const i = [], r = () => {
    i.forEach((d) => d()), i.length = 0;
  }, l = (d, f, h, v) => (d.addEventListener(f, h, v), () => d.removeEventListener(f, h, v)), a = Ne(
    () => [X0(t), Kt(s)],
    ([d, f]) => {
      if (r(), !d)
        return;
      const h = H0(f) ? { ...f } : f;
      i.push(
        ...n.flatMap((v) => o.map((w) => l(d, v, w, h)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    a(), r();
  };
  return ci(c), c;
}
function K0(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Ja(...e) {
  let t, n, o = {};
  e.length === 3 ? (t = e[0], n = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: s = Ad,
    eventName: i = "keydown",
    passive: r = !1,
    dedupe: l = !1
  } = o, a = K0(t);
  return Dd(s, i, (d) => {
    d.repeat && Kt(l) || a(d) && n(d);
  }, r);
}
function W0(e) {
  return JSON.parse(JSON.stringify(e));
}
function Bi(e, t, n, o = {}) {
  var s, i, r;
  const {
    clone: l = !1,
    passive: a = !1,
    eventName: c,
    deep: d = !1,
    defaultValue: f,
    shouldEmit: h
  } = o, v = po(), w = n || (v == null ? void 0 : v.emit) || ((s = v == null ? void 0 : v.$emit) == null ? void 0 : s.bind(v)) || ((r = (i = v == null ? void 0 : v.proxy) == null ? void 0 : i.$emit) == null ? void 0 : r.bind(v == null ? void 0 : v.proxy));
  let x = c;
  t || (t = "modelValue"), x = x || `update:${t.toString()}`;
  const I = (_) => l ? typeof l == "function" ? l(_) : W0(_) : _, C = () => F0(e[t]) ? I(e[t]) : f, D = (_) => {
    h ? h(_) && w(x, _) : w(x, _);
  };
  if (a) {
    const _ = C(), m = ee(_);
    let z = !1;
    return Ne(
      () => e[t],
      (Y) => {
        z || (z = !0, m.value = I(Y), ot(() => z = !1));
      }
    ), Ne(
      m,
      (Y) => {
        !z && (Y !== e[t] || d) && D(Y);
      },
      { deep: d }
    ), m;
  } else
    return ae({
      get() {
        return C();
      },
      set(_) {
        D(_);
      }
    });
}
var Z0 = { value: () => {
} };
function di() {
  for (var e = 0, t = arguments.length, n = {}, o; e < t; ++e) {
    if (!(o = arguments[e] + "") || o in n || /[\s.]/.test(o))
      throw new Error("illegal type: " + o);
    n[o] = [];
  }
  return new $s(n);
}
function $s(e) {
  this._ = e;
}
function J0(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var o = "", s = n.indexOf(".");
    if (s >= 0 && (o = n.slice(s + 1), n = n.slice(0, s)), n && !t.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: o };
  });
}
$s.prototype = di.prototype = {
  constructor: $s,
  on: function(e, t) {
    var n = this._, o = J0(e + "", n), s, i = -1, r = o.length;
    if (arguments.length < 2) {
      for (; ++i < r; )
        if ((s = (e = o[i]).type) && (s = Q0(n[s], e.name)))
          return s;
      return;
    }
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++i < r; )
      if (s = (e = o[i]).type)
        n[s] = Qa(n[s], e.name, t);
      else if (t == null)
        for (s in n)
          n[s] = Qa(n[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t)
      e[n] = t[n].slice();
    return new $s(e);
  },
  call: function(e, t) {
    if ((s = arguments.length - 2) > 0)
      for (var n = new Array(s), o = 0, s, i; o < s; ++o)
        n[o] = arguments[o + 2];
    if (!this._.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    for (i = this._[e], o = 0, s = i.length; o < s; ++o)
      i[o].value.apply(t, n);
  },
  apply: function(e, t, n) {
    if (!this._.hasOwnProperty(e))
      throw new Error("unknown type: " + e);
    for (var o = this._[e], s = 0, i = o.length; s < i; ++s)
      o[s].value.apply(t, n);
  }
};
function Q0(e, t) {
  for (var n = 0, o = e.length, s; n < o; ++n)
    if ((s = e[n]).name === t)
      return s.value;
}
function Qa(e, t, n) {
  for (var o = 0, s = e.length; o < s; ++o)
    if (e[o].name === t) {
      e[o] = Z0, e = e.slice(0, o).concat(e.slice(o + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var wr = "http://www.w3.org/1999/xhtml";
const eu = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: wr,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function fi(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), eu.hasOwnProperty(t) ? { space: eu[t], local: e } : e;
}
function e_(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === wr && t.documentElement.namespaceURI === wr ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function t_(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Rd(e) {
  var t = fi(e);
  return (t.local ? t_ : e_)(t);
}
function n_() {
}
function rl(e) {
  return e == null ? n_ : function() {
    return this.querySelector(e);
  };
}
function o_(e) {
  typeof e != "function" && (e = rl(e));
  for (var t = this._groups, n = t.length, o = new Array(n), s = 0; s < n; ++s)
    for (var i = t[s], r = i.length, l = o[s] = new Array(r), a, c, d = 0; d < r; ++d)
      (a = i[d]) && (c = e.call(a, a.__data__, d, i)) && ("__data__" in a && (c.__data__ = a.__data__), l[d] = c);
  return new kt(o, this._parents);
}
function s_(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function i_() {
  return [];
}
function Vd(e) {
  return e == null ? i_ : function() {
    return this.querySelectorAll(e);
  };
}
function r_(e) {
  return function() {
    return s_(e.apply(this, arguments));
  };
}
function l_(e) {
  typeof e == "function" ? e = r_(e) : e = Vd(e);
  for (var t = this._groups, n = t.length, o = [], s = [], i = 0; i < n; ++i)
    for (var r = t[i], l = r.length, a, c = 0; c < l; ++c)
      (a = r[c]) && (o.push(e.call(a, a.__data__, c, r)), s.push(a));
  return new kt(o, s);
}
function Ld(e) {
  return function() {
    return this.matches(e);
  };
}
function zd(e) {
  return function(t) {
    return t.matches(e);
  };
}
var a_ = Array.prototype.find;
function u_(e) {
  return function() {
    return a_.call(this.children, e);
  };
}
function c_() {
  return this.firstElementChild;
}
function d_(e) {
  return this.select(e == null ? c_ : u_(typeof e == "function" ? e : zd(e)));
}
var f_ = Array.prototype.filter;
function p_() {
  return Array.from(this.children);
}
function h_(e) {
  return function() {
    return f_.call(this.children, e);
  };
}
function v_(e) {
  return this.selectAll(e == null ? p_ : h_(typeof e == "function" ? e : zd(e)));
}
function g_(e) {
  typeof e != "function" && (e = Ld(e));
  for (var t = this._groups, n = t.length, o = new Array(n), s = 0; s < n; ++s)
    for (var i = t[s], r = i.length, l = o[s] = [], a, c = 0; c < r; ++c)
      (a = i[c]) && e.call(a, a.__data__, c, i) && l.push(a);
  return new kt(o, this._parents);
}
function Fd(e) {
  return new Array(e.length);
}
function m_() {
  return new kt(this._enter || this._groups.map(Fd), this._parents);
}
function Bs(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
Bs.prototype = {
  constructor: Bs,
  appendChild: function(e) {
    return this._parent.insertBefore(e, this._next);
  },
  insertBefore: function(e, t) {
    return this._parent.insertBefore(e, t);
  },
  querySelector: function(e) {
    return this._parent.querySelector(e);
  },
  querySelectorAll: function(e) {
    return this._parent.querySelectorAll(e);
  }
};
function y_(e) {
  return function() {
    return e;
  };
}
function b_(e, t, n, o, s, i) {
  for (var r = 0, l, a = t.length, c = i.length; r < c; ++r)
    (l = t[r]) ? (l.__data__ = i[r], o[r] = l) : n[r] = new Bs(e, i[r]);
  for (; r < a; ++r)
    (l = t[r]) && (s[r] = l);
}
function __(e, t, n, o, s, i, r) {
  var l, a, c = /* @__PURE__ */ new Map(), d = t.length, f = i.length, h = new Array(d), v;
  for (l = 0; l < d; ++l)
    (a = t[l]) && (h[l] = v = r.call(a, a.__data__, l, t) + "", c.has(v) ? s[l] = a : c.set(v, a));
  for (l = 0; l < f; ++l)
    v = r.call(e, i[l], l, i) + "", (a = c.get(v)) ? (o[l] = a, a.__data__ = i[l], c.delete(v)) : n[l] = new Bs(e, i[l]);
  for (l = 0; l < d; ++l)
    (a = t[l]) && c.get(h[l]) === a && (s[l] = a);
}
function w_(e) {
  return e.__data__;
}
function k_(e, t) {
  if (!arguments.length)
    return Array.from(this, w_);
  var n = t ? __ : b_, o = this._parents, s = this._groups;
  typeof e != "function" && (e = y_(e));
  for (var i = s.length, r = new Array(i), l = new Array(i), a = new Array(i), c = 0; c < i; ++c) {
    var d = o[c], f = s[c], h = f.length, v = E_(e.call(d, d && d.__data__, c, o)), w = v.length, x = l[c] = new Array(w), I = r[c] = new Array(w), C = a[c] = new Array(h);
    n(d, f, x, I, C, v, t);
    for (var D = 0, _ = 0, m, z; D < w; ++D)
      if (m = x[D]) {
        for (D >= _ && (_ = D + 1); !(z = I[_]) && ++_ < w; )
          ;
        m._next = z || null;
      }
  }
  return r = new kt(r, o), r._enter = l, r._exit = a, r;
}
function E_(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function x_() {
  return new kt(this._exit || this._groups.map(Fd), this._parents);
}
function C_(e, t, n) {
  var o = this.enter(), s = this, i = this.exit();
  return typeof e == "function" ? (o = e(o), o && (o = o.selection())) : o = o.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), n == null ? i.remove() : n(i), o && s ? o.merge(s).order() : s;
}
function S_(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, o = t._groups, s = n.length, i = o.length, r = Math.min(s, i), l = new Array(s), a = 0; a < r; ++a)
    for (var c = n[a], d = o[a], f = c.length, h = l[a] = new Array(f), v, w = 0; w < f; ++w)
      (v = c[w] || d[w]) && (h[w] = v);
  for (; a < s; ++a)
    l[a] = n[a];
  return new kt(l, this._parents);
}
function $_() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var o = e[t], s = o.length - 1, i = o[s], r; --s >= 0; )
      (r = o[s]) && (i && r.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(r, i), i = r);
  return this;
}
function I_(e) {
  e || (e = N_);
  function t(f, h) {
    return f && h ? e(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, o = n.length, s = new Array(o), i = 0; i < o; ++i) {
    for (var r = n[i], l = r.length, a = s[i] = new Array(l), c, d = 0; d < l; ++d)
      (c = r[d]) && (a[d] = c);
    a.sort(t);
  }
  return new kt(s, this._parents).order();
}
function N_(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function M_() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function T_() {
  return Array.from(this);
}
function O_() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], s = 0, i = o.length; s < i; ++s) {
      var r = o[s];
      if (r)
        return r;
    }
  return null;
}
function P_() {
  let e = 0;
  for (const t of this)
    ++e;
  return e;
}
function A_() {
  return !this.node();
}
function D_(e) {
  for (var t = this._groups, n = 0, o = t.length; n < o; ++n)
    for (var s = t[n], i = 0, r = s.length, l; i < r; ++i)
      (l = s[i]) && e.call(l, l.__data__, i, s);
  return this;
}
function R_(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function V_(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function L_(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function z_(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function F_(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function B_(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function H_(e, t) {
  var n = fi(e);
  if (arguments.length < 2) {
    var o = this.node();
    return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n);
  }
  return this.each((t == null ? n.local ? V_ : R_ : typeof t == "function" ? n.local ? B_ : F_ : n.local ? z_ : L_)(n, t));
}
function Bd(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function U_(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function j_(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function G_(e, t, n) {
  return function() {
    var o = t.apply(this, arguments);
    o == null ? this.style.removeProperty(e) : this.style.setProperty(e, o, n);
  };
}
function q_(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? U_ : typeof t == "function" ? G_ : j_)(e, t, n ?? "")) : ao(this.node(), e);
}
function ao(e, t) {
  return e.style.getPropertyValue(t) || Bd(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Y_(e) {
  return function() {
    delete this[e];
  };
}
function X_(e, t) {
  return function() {
    this[e] = t;
  };
}
function K_(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function W_(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Y_ : typeof t == "function" ? K_ : X_)(e, t)) : this.node()[e];
}
function Hd(e) {
  return e.trim().split(/^|\s+/);
}
function ll(e) {
  return e.classList || new Ud(e);
}
function Ud(e) {
  this._node = e, this._names = Hd(e.getAttribute("class") || "");
}
Ud.prototype = {
  add: function(e) {
    var t = this._names.indexOf(e);
    t < 0 && (this._names.push(e), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(e) {
    var t = this._names.indexOf(e);
    t >= 0 && (this._names.splice(t, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(e) {
    return this._names.indexOf(e) >= 0;
  }
};
function jd(e, t) {
  for (var n = ll(e), o = -1, s = t.length; ++o < s; )
    n.add(t[o]);
}
function Gd(e, t) {
  for (var n = ll(e), o = -1, s = t.length; ++o < s; )
    n.remove(t[o]);
}
function Z_(e) {
  return function() {
    jd(this, e);
  };
}
function J_(e) {
  return function() {
    Gd(this, e);
  };
}
function Q_(e, t) {
  return function() {
    (t.apply(this, arguments) ? jd : Gd)(this, e);
  };
}
function ew(e, t) {
  var n = Hd(e + "");
  if (arguments.length < 2) {
    for (var o = ll(this.node()), s = -1, i = n.length; ++s < i; )
      if (!o.contains(n[s]))
        return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Q_ : t ? Z_ : J_)(n, t));
}
function tw() {
  this.textContent = "";
}
function nw(e) {
  return function() {
    this.textContent = e;
  };
}
function ow(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function sw(e) {
  return arguments.length ? this.each(e == null ? tw : (typeof e == "function" ? ow : nw)(e)) : this.node().textContent;
}
function iw() {
  this.innerHTML = "";
}
function rw(e) {
  return function() {
    this.innerHTML = e;
  };
}
function lw(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function aw(e) {
  return arguments.length ? this.each(e == null ? iw : (typeof e == "function" ? lw : rw)(e)) : this.node().innerHTML;
}
function uw() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function cw() {
  return this.each(uw);
}
function dw() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function fw() {
  return this.each(dw);
}
function pw(e) {
  var t = typeof e == "function" ? e : Rd(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function hw() {
  return null;
}
function vw(e, t) {
  var n = typeof e == "function" ? e : Rd(e), o = t == null ? hw : typeof t == "function" ? t : rl(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function gw() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function mw() {
  return this.each(gw);
}
function yw() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function bw() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function _w(e) {
  return this.select(e ? bw : yw);
}
function ww(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function kw(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Ew(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", o = t.indexOf(".");
    return o >= 0 && (n = t.slice(o + 1), t = t.slice(0, o)), { type: t, name: n };
  });
}
function xw(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, o = -1, s = t.length, i; n < s; ++n)
        i = t[n], (!e.type || i.type === e.type) && i.name === e.name ? this.removeEventListener(i.type, i.listener, i.options) : t[++o] = i;
      ++o ? t.length = o : delete this.__on;
    }
  };
}
function Cw(e, t, n) {
  return function() {
    var o = this.__on, s, i = kw(t);
    if (o) {
      for (var r = 0, l = o.length; r < l; ++r)
        if ((s = o[r]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = i, s.options = n), s.value = t;
          return;
        }
    }
    this.addEventListener(e.type, i, n), s = { type: e.type, name: e.name, value: t, listener: i, options: n }, o ? o.push(s) : this.__on = [s];
  };
}
function Sw(e, t, n) {
  var o = Ew(e + ""), s, i = o.length, r;
  if (arguments.length < 2) {
    var l = this.node().__on;
    if (l) {
      for (var a = 0, c = l.length, d; a < c; ++a)
        for (s = 0, d = l[a]; s < i; ++s)
          if ((r = o[s]).type === d.type && r.name === d.name)
            return d.value;
    }
    return;
  }
  for (l = t ? Cw : xw, s = 0; s < i; ++s)
    this.each(l(o[s], t, n));
  return this;
}
function qd(e, t, n) {
  var o = Bd(e), s = o.CustomEvent;
  typeof s == "function" ? s = new s(t, n) : (s = o.document.createEvent("Event"), n ? (s.initEvent(t, n.bubbles, n.cancelable), s.detail = n.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function $w(e, t) {
  return function() {
    return qd(this, e, t);
  };
}
function Iw(e, t) {
  return function() {
    return qd(this, e, t.apply(this, arguments));
  };
}
function Nw(e, t) {
  return this.each((typeof t == "function" ? Iw : $w)(e, t));
}
function* Mw() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], s = 0, i = o.length, r; s < i; ++s)
      (r = o[s]) && (yield r);
}
var Yd = [null];
function kt(e, t) {
  this._groups = e, this._parents = t;
}
function ns() {
  return new kt([[document.documentElement]], Yd);
}
function Tw() {
  return this;
}
kt.prototype = ns.prototype = {
  constructor: kt,
  select: o_,
  selectAll: l_,
  selectChild: d_,
  selectChildren: v_,
  filter: g_,
  data: k_,
  enter: m_,
  exit: x_,
  join: C_,
  merge: S_,
  selection: Tw,
  order: $_,
  sort: I_,
  call: M_,
  nodes: T_,
  node: O_,
  size: P_,
  empty: A_,
  each: D_,
  attr: H_,
  style: q_,
  property: W_,
  classed: ew,
  text: sw,
  html: aw,
  raise: cw,
  lower: fw,
  append: pw,
  insert: vw,
  remove: mw,
  clone: _w,
  datum: ww,
  on: Sw,
  dispatch: Nw,
  [Symbol.iterator]: Mw
};
function St(e) {
  return typeof e == "string" ? new kt([[document.querySelector(e)]], [document.documentElement]) : new kt([[e]], Yd);
}
function Ow(e) {
  let t;
  for (; t = e.sourceEvent; )
    e = t;
  return e;
}
function At(e, t) {
  if (e = Ow(e), t === void 0 && (t = e.currentTarget), t) {
    var n = t.ownerSVGElement || t;
    if (n.createSVGPoint) {
      var o = n.createSVGPoint();
      return o.x = e.clientX, o.y = e.clientY, o = o.matrixTransform(t.getScreenCTM().inverse()), [o.x, o.y];
    }
    if (t.getBoundingClientRect) {
      var s = t.getBoundingClientRect();
      return [e.clientX - s.left - t.clientLeft, e.clientY - s.top - t.clientTop];
    }
  }
  return [e.pageX, e.pageY];
}
const Pw = { passive: !1 }, jo = { capture: !0, passive: !1 };
function Hi(e) {
  e.stopImmediatePropagation();
}
function no(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Xd(e) {
  var t = e.document.documentElement, n = St(e).on("dragstart.drag", no, jo);
  "onselectstart" in t ? n.on("selectstart.drag", no, jo) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Kd(e, t) {
  var n = e.document.documentElement, o = St(e).on("dragstart.drag", null);
  t && (o.on("click.drag", no, jo), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in n ? o.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const fs = (e) => () => e;
function kr(e, {
  sourceEvent: t,
  subject: n,
  target: o,
  identifier: s,
  active: i,
  x: r,
  y: l,
  dx: a,
  dy: c,
  dispatch: d
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    subject: { value: n, enumerable: !0, configurable: !0 },
    target: { value: o, enumerable: !0, configurable: !0 },
    identifier: { value: s, enumerable: !0, configurable: !0 },
    active: { value: i, enumerable: !0, configurable: !0 },
    x: { value: r, enumerable: !0, configurable: !0 },
    y: { value: l, enumerable: !0, configurable: !0 },
    dx: { value: a, enumerable: !0, configurable: !0 },
    dy: { value: c, enumerable: !0, configurable: !0 },
    _: { value: d }
  });
}
kr.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function Aw(e) {
  return !e.ctrlKey && !e.button;
}
function Dw() {
  return this.parentNode;
}
function Rw(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function Vw() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Lw() {
  var e = Aw, t = Dw, n = Rw, o = Vw, s = {}, i = di("start", "drag", "end"), r = 0, l, a, c, d, f = 0;
  function h(m) {
    m.on("mousedown.drag", v).filter(o).on("touchstart.drag", I).on("touchmove.drag", C, Pw).on("touchend.drag touchcancel.drag", D).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function v(m, z) {
    if (!(d || !e.call(this, m, z))) {
      var Y = _(this, t.call(this, m, z), m, z, "mouse");
      Y && (St(m.view).on("mousemove.drag", w, jo).on("mouseup.drag", x, jo), Xd(m.view), Hi(m), c = !1, l = m.clientX, a = m.clientY, Y("start", m));
    }
  }
  function w(m) {
    if (no(m), !c) {
      var z = m.clientX - l, Y = m.clientY - a;
      c = z * z + Y * Y > f;
    }
    s.mouse("drag", m);
  }
  function x(m) {
    St(m.view).on("mousemove.drag mouseup.drag", null), Kd(m.view, c), no(m), s.mouse("end", m);
  }
  function I(m, z) {
    if (e.call(this, m, z)) {
      var Y = m.changedTouches, q = t.call(this, m, z), j = Y.length, P, L;
      for (P = 0; P < j; ++P)
        (L = _(this, q, m, z, Y[P].identifier, Y[P])) && (Hi(m), L("start", m, Y[P]));
    }
  }
  function C(m) {
    var z = m.changedTouches, Y = z.length, q, j;
    for (q = 0; q < Y; ++q)
      (j = s[z[q].identifier]) && (no(m), j("drag", m, z[q]));
  }
  function D(m) {
    var z = m.changedTouches, Y = z.length, q, j;
    for (d && clearTimeout(d), d = setTimeout(function() {
      d = null;
    }, 500), q = 0; q < Y; ++q)
      (j = s[z[q].identifier]) && (Hi(m), j("end", m, z[q]));
  }
  function _(m, z, Y, q, j, P) {
    var L = i.copy(), X = At(P || Y, z), U, K, $;
    if (($ = n.call(m, new kr("beforestart", {
      sourceEvent: Y,
      target: h,
      identifier: j,
      active: r,
      x: X[0],
      y: X[1],
      dx: 0,
      dy: 0,
      dispatch: L
    }), q)) != null)
      return U = $.x - X[0] || 0, K = $.y - X[1] || 0, function V(M, R, G) {
        var oe = X, ue;
        switch (M) {
          case "start":
            s[j] = V, ue = r++;
            break;
          case "end":
            delete s[j], --r;
          case "drag":
            X = At(G || R, z), ue = r;
            break;
        }
        L.call(
          M,
          m,
          new kr(M, {
            sourceEvent: R,
            subject: $,
            target: h,
            identifier: j,
            active: ue,
            x: X[0] + U,
            y: X[1] + K,
            dx: X[0] - oe[0],
            dy: X[1] - oe[1],
            dispatch: L
          }),
          q
        );
      };
  }
  return h.filter = function(m) {
    return arguments.length ? (e = typeof m == "function" ? m : fs(!!m), h) : e;
  }, h.container = function(m) {
    return arguments.length ? (t = typeof m == "function" ? m : fs(m), h) : t;
  }, h.subject = function(m) {
    return arguments.length ? (n = typeof m == "function" ? m : fs(m), h) : n;
  }, h.touchable = function(m) {
    return arguments.length ? (o = typeof m == "function" ? m : fs(!!m), h) : o;
  }, h.on = function() {
    var m = i.on.apply(i, arguments);
    return m === i ? h : m;
  }, h.clickDistance = function(m) {
    return arguments.length ? (f = (m = +m) * m, h) : Math.sqrt(f);
  }, h;
}
function al(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Wd(e, t) {
  var n = Object.create(e.prototype);
  for (var o in t)
    n[o] = t[o];
  return n;
}
function os() {
}
var Go = 0.7, Hs = 1 / Go, oo = "\\s*([+-]?\\d+)\\s*", qo = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", Ft = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", zw = /^#([0-9a-f]{3,8})$/, Fw = new RegExp(`^rgb\\(${oo},${oo},${oo}\\)$`), Bw = new RegExp(`^rgb\\(${Ft},${Ft},${Ft}\\)$`), Hw = new RegExp(`^rgba\\(${oo},${oo},${oo},${qo}\\)$`), Uw = new RegExp(`^rgba\\(${Ft},${Ft},${Ft},${qo}\\)$`), jw = new RegExp(`^hsl\\(${qo},${Ft},${Ft}\\)$`), Gw = new RegExp(`^hsla\\(${qo},${Ft},${Ft},${qo}\\)$`), tu = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
al(os, Yo, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: nu,
  // Deprecated! Use color.formatHex.
  formatHex: nu,
  formatHex8: qw,
  formatHsl: Yw,
  formatRgb: ou,
  toString: ou
});
function nu() {
  return this.rgb().formatHex();
}
function qw() {
  return this.rgb().formatHex8();
}
function Yw() {
  return Zd(this).formatHsl();
}
function ou() {
  return this.rgb().formatRgb();
}
function Yo(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = zw.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? su(t) : n === 3 ? new yt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? ps(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? ps(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Fw.exec(e)) ? new yt(t[1], t[2], t[3], 1) : (t = Bw.exec(e)) ? new yt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Hw.exec(e)) ? ps(t[1], t[2], t[3], t[4]) : (t = Uw.exec(e)) ? ps(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = jw.exec(e)) ? lu(t[1], t[2] / 100, t[3] / 100, 1) : (t = Gw.exec(e)) ? lu(t[1], t[2] / 100, t[3] / 100, t[4]) : tu.hasOwnProperty(e) ? su(tu[e]) : e === "transparent" ? new yt(NaN, NaN, NaN, 0) : null;
}
function su(e) {
  return new yt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function ps(e, t, n, o) {
  return o <= 0 && (e = t = n = NaN), new yt(e, t, n, o);
}
function Xw(e) {
  return e instanceof os || (e = Yo(e)), e ? (e = e.rgb(), new yt(e.r, e.g, e.b, e.opacity)) : new yt();
}
function Er(e, t, n, o) {
  return arguments.length === 1 ? Xw(e) : new yt(e, t, n, o ?? 1);
}
function yt(e, t, n, o) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +o;
}
al(yt, Er, Wd(os, {
  brighter(e) {
    return e = e == null ? Hs : Math.pow(Hs, e), new yt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Go : Math.pow(Go, e), new yt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new yt(Vn(this.r), Vn(this.g), Vn(this.b), Us(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: iu,
  // Deprecated! Use color.formatHex.
  formatHex: iu,
  formatHex8: Kw,
  formatRgb: ru,
  toString: ru
}));
function iu() {
  return `#${Pn(this.r)}${Pn(this.g)}${Pn(this.b)}`;
}
function Kw() {
  return `#${Pn(this.r)}${Pn(this.g)}${Pn(this.b)}${Pn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ru() {
  const e = Us(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Vn(this.r)}, ${Vn(this.g)}, ${Vn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function Us(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Vn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Pn(e) {
  return e = Vn(e), (e < 16 ? "0" : "") + e.toString(16);
}
function lu(e, t, n, o) {
  return o <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new $t(e, t, n, o);
}
function Zd(e) {
  if (e instanceof $t)
    return new $t(e.h, e.s, e.l, e.opacity);
  if (e instanceof os || (e = Yo(e)), !e)
    return new $t();
  if (e instanceof $t)
    return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, o = e.b / 255, s = Math.min(t, n, o), i = Math.max(t, n, o), r = NaN, l = i - s, a = (i + s) / 2;
  return l ? (t === i ? r = (n - o) / l + (n < o) * 6 : n === i ? r = (o - t) / l + 2 : r = (t - n) / l + 4, l /= a < 0.5 ? i + s : 2 - i - s, r *= 60) : l = a > 0 && a < 1 ? 0 : r, new $t(r, l, a, e.opacity);
}
function Ww(e, t, n, o) {
  return arguments.length === 1 ? Zd(e) : new $t(e, t, n, o ?? 1);
}
function $t(e, t, n, o) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +o;
}
al($t, Ww, Wd(os, {
  brighter(e) {
    return e = e == null ? Hs : Math.pow(Hs, e), new $t(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? Go : Math.pow(Go, e), new $t(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, o = n + (n < 0.5 ? n : 1 - n) * t, s = 2 * n - o;
    return new yt(
      Ui(e >= 240 ? e - 240 : e + 120, s, o),
      Ui(e, s, o),
      Ui(e < 120 ? e + 240 : e - 120, s, o),
      this.opacity
    );
  },
  clamp() {
    return new $t(au(this.h), hs(this.s), hs(this.l), Us(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = Us(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${au(this.h)}, ${hs(this.s) * 100}%, ${hs(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function au(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function hs(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function Ui(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Jd = (e) => () => e;
function Zw(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Jw(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(o) {
    return Math.pow(e + o * t, n);
  };
}
function Qw(e) {
  return (e = +e) == 1 ? Qd : function(t, n) {
    return n - t ? Jw(t, n, e) : Jd(isNaN(t) ? n : t);
  };
}
function Qd(e, t) {
  var n = t - e;
  return n ? Zw(e, n) : Jd(isNaN(e) ? t : e);
}
const uu = function e(t) {
  var n = Qw(t);
  function o(s, i) {
    var r = n((s = Er(s)).r, (i = Er(i)).r), l = n(s.g, i.g), a = n(s.b, i.b), c = Qd(s.opacity, i.opacity);
    return function(d) {
      return s.r = r(d), s.g = l(d), s.b = a(d), s.opacity = c(d), s + "";
    };
  }
  return o.gamma = e, o;
}(1);
function dn(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var xr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, ji = new RegExp(xr.source, "g");
function ek(e) {
  return function() {
    return e;
  };
}
function tk(e) {
  return function(t) {
    return e(t) + "";
  };
}
function nk(e, t) {
  var n = xr.lastIndex = ji.lastIndex = 0, o, s, i, r = -1, l = [], a = [];
  for (e = e + "", t = t + ""; (o = xr.exec(e)) && (s = ji.exec(t)); )
    (i = s.index) > n && (i = t.slice(n, i), l[r] ? l[r] += i : l[++r] = i), (o = o[0]) === (s = s[0]) ? l[r] ? l[r] += s : l[++r] = s : (l[++r] = null, a.push({ i: r, x: dn(o, s) })), n = ji.lastIndex;
  return n < t.length && (i = t.slice(n), l[r] ? l[r] += i : l[++r] = i), l.length < 2 ? a[0] ? tk(a[0].x) : ek(t) : (t = a.length, function(c) {
    for (var d = 0, f; d < t; ++d)
      l[(f = a[d]).i] = f.x(c);
    return l.join("");
  });
}
var cu = 180 / Math.PI, Cr = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ef(e, t, n, o, s, i) {
  var r, l, a;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (a = e * n + t * o) && (n -= e * a, o -= t * a), (l = Math.sqrt(n * n + o * o)) && (n /= l, o /= l, a /= l), e * o < t * n && (e = -e, t = -t, a = -a, r = -r), {
    translateX: s,
    translateY: i,
    rotate: Math.atan2(t, e) * cu,
    skewX: Math.atan(a) * cu,
    scaleX: r,
    scaleY: l
  };
}
var vs;
function ok(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Cr : ef(t.a, t.b, t.c, t.d, t.e, t.f);
}
function sk(e) {
  return e == null || (vs || (vs = document.createElementNS("http://www.w3.org/2000/svg", "g")), vs.setAttribute("transform", e), !(e = vs.transform.baseVal.consolidate())) ? Cr : (e = e.matrix, ef(e.a, e.b, e.c, e.d, e.e, e.f));
}
function tf(e, t, n, o) {
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function i(c, d, f, h, v, w) {
    if (c !== f || d !== h) {
      var x = v.push("translate(", null, t, null, n);
      w.push({ i: x - 4, x: dn(c, f) }, { i: x - 2, x: dn(d, h) });
    } else (f || h) && v.push("translate(" + f + t + h + n);
  }
  function r(c, d, f, h) {
    c !== d ? (c - d > 180 ? d += 360 : d - c > 180 && (c += 360), h.push({ i: f.push(s(f) + "rotate(", null, o) - 2, x: dn(c, d) })) : d && f.push(s(f) + "rotate(" + d + o);
  }
  function l(c, d, f, h) {
    c !== d ? h.push({ i: f.push(s(f) + "skewX(", null, o) - 2, x: dn(c, d) }) : d && f.push(s(f) + "skewX(" + d + o);
  }
  function a(c, d, f, h, v, w) {
    if (c !== f || d !== h) {
      var x = v.push(s(v) + "scale(", null, ",", null, ")");
      w.push({ i: x - 4, x: dn(c, f) }, { i: x - 2, x: dn(d, h) });
    } else (f !== 1 || h !== 1) && v.push(s(v) + "scale(" + f + "," + h + ")");
  }
  return function(c, d) {
    var f = [], h = [];
    return c = e(c), d = e(d), i(c.translateX, c.translateY, d.translateX, d.translateY, f, h), r(c.rotate, d.rotate, f, h), l(c.skewX, d.skewX, f, h), a(c.scaleX, c.scaleY, d.scaleX, d.scaleY, f, h), c = d = null, function(v) {
      for (var w = -1, x = h.length, I; ++w < x; )
        f[(I = h[w]).i] = I.x(v);
      return f.join("");
    };
  };
}
var ik = tf(ok, "px, ", "px)", "deg)"), rk = tf(sk, ", ", ")", ")"), lk = 1e-12;
function du(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function ak(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function uk(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const ck = function e(t, n, o) {
  function s(i, r) {
    var l = i[0], a = i[1], c = i[2], d = r[0], f = r[1], h = r[2], v = d - l, w = f - a, x = v * v + w * w, I, C;
    if (x < lk)
      C = Math.log(h / c) / t, I = function(q) {
        return [
          l + q * v,
          a + q * w,
          c * Math.exp(t * q * C)
        ];
      };
    else {
      var D = Math.sqrt(x), _ = (h * h - c * c + o * x) / (2 * c * n * D), m = (h * h - c * c - o * x) / (2 * h * n * D), z = Math.log(Math.sqrt(_ * _ + 1) - _), Y = Math.log(Math.sqrt(m * m + 1) - m);
      C = (Y - z) / t, I = function(q) {
        var j = q * C, P = du(z), L = c / (n * D) * (P * uk(t * j + z) - ak(z));
        return [
          l + L * v,
          a + L * w,
          c * P / du(t * j + z)
        ];
      };
    }
    return I.duration = C * 1e3 * t / Math.SQRT2, I;
  }
  return s.rho = function(i) {
    var r = Math.max(1e-3, +i), l = r * r, a = l * l;
    return e(r, l, a);
  }, s;
}(Math.SQRT2, 2, 4);
var uo = 0, Co = 0, wo = 0, nf = 1e3, js, So, Gs = 0, Hn = 0, pi = 0, Xo = typeof performance == "object" && performance.now ? performance : Date, of = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function ul() {
  return Hn || (of(dk), Hn = Xo.now() + pi);
}
function dk() {
  Hn = 0;
}
function qs() {
  this._call = this._time = this._next = null;
}
qs.prototype = sf.prototype = {
  constructor: qs,
  restart: function(e, t, n) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? ul() : +n) + (t == null ? 0 : +t), !this._next && So !== this && (So ? So._next = this : js = this, So = this), this._call = e, this._time = n, Sr();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Sr());
  }
};
function sf(e, t, n) {
  var o = new qs();
  return o.restart(e, t, n), o;
}
function fk() {
  ul(), ++uo;
  for (var e = js, t; e; )
    (t = Hn - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --uo;
}
function fu() {
  Hn = (Gs = Xo.now()) + pi, uo = Co = 0;
  try {
    fk();
  } finally {
    uo = 0, hk(), Hn = 0;
  }
}
function pk() {
  var e = Xo.now(), t = e - Gs;
  t > nf && (pi -= t, Gs = e);
}
function hk() {
  for (var e, t = js, n, o = 1 / 0; t; )
    t._call ? (o > t._time && (o = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : js = n);
  So = e, Sr(o);
}
function Sr(e) {
  if (!uo) {
    Co && (Co = clearTimeout(Co));
    var t = e - Hn;
    t > 24 ? (e < 1 / 0 && (Co = setTimeout(fu, e - Xo.now() - pi)), wo && (wo = clearInterval(wo))) : (wo || (Gs = Xo.now(), wo = setInterval(pk, nf)), uo = 1, of(fu));
  }
}
function pu(e, t, n) {
  var o = new qs();
  return t = t == null ? 0 : +t, o.restart((s) => {
    o.stop(), e(s + t);
  }, t, n), o;
}
var vk = di("start", "end", "cancel", "interrupt"), gk = [], rf = 0, hu = 1, $r = 2, Is = 3, vu = 4, Ir = 5, Ns = 6;
function hi(e, t, n, o, s, i) {
  var r = e.__transition;
  if (!r)
    e.__transition = {};
  else if (n in r)
    return;
  mk(e, n, {
    name: t,
    index: o,
    // For context during callback.
    group: s,
    // For context during callback.
    on: vk,
    tween: gk,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: rf
  });
}
function cl(e, t) {
  var n = Tt(e, t);
  if (n.state > rf)
    throw new Error("too late; already scheduled");
  return n;
}
function Ht(e, t) {
  var n = Tt(e, t);
  if (n.state > Is)
    throw new Error("too late; already running");
  return n;
}
function Tt(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t]))
    throw new Error("transition not found");
  return n;
}
function mk(e, t, n) {
  var o = e.__transition, s;
  o[t] = n, n.timer = sf(i, 0, n.time);
  function i(c) {
    n.state = hu, n.timer.restart(r, n.delay, n.time), n.delay <= c && r(c - n.delay);
  }
  function r(c) {
    var d, f, h, v;
    if (n.state !== hu)
      return a();
    for (d in o)
      if (v = o[d], v.name === n.name) {
        if (v.state === Is)
          return pu(r);
        v.state === vu ? (v.state = Ns, v.timer.stop(), v.on.call("interrupt", e, e.__data__, v.index, v.group), delete o[d]) : +d < t && (v.state = Ns, v.timer.stop(), v.on.call("cancel", e, e.__data__, v.index, v.group), delete o[d]);
      }
    if (pu(function() {
      n.state === Is && (n.state = vu, n.timer.restart(l, n.delay, n.time), l(c));
    }), n.state = $r, n.on.call("start", e, e.__data__, n.index, n.group), n.state === $r) {
      for (n.state = Is, s = new Array(h = n.tween.length), d = 0, f = -1; d < h; ++d)
        (v = n.tween[d].value.call(e, e.__data__, n.index, n.group)) && (s[++f] = v);
      s.length = f + 1;
    }
  }
  function l(c) {
    for (var d = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(a), n.state = Ir, 1), f = -1, h = s.length; ++f < h; )
      s[f].call(e, d);
    n.state === Ir && (n.on.call("end", e, e.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = Ns, n.timer.stop(), delete o[t];
    for (var c in o)
      return;
    delete e.__transition;
  }
}
function Ms(e, t) {
  var n = e.__transition, o, s, i = !0, r;
  if (n) {
    t = t == null ? null : t + "";
    for (r in n) {
      if ((o = n[r]).name !== t) {
        i = !1;
        continue;
      }
      s = o.state > $r && o.state < Ir, o.state = Ns, o.timer.stop(), o.on.call(s ? "interrupt" : "cancel", e, e.__data__, o.index, o.group), delete n[r];
    }
    i && delete e.__transition;
  }
}
function yk(e) {
  return this.each(function() {
    Ms(this, e);
  });
}
function bk(e, t) {
  var n, o;
  return function() {
    var s = Ht(this, e), i = s.tween;
    if (i !== n) {
      o = n = i;
      for (var r = 0, l = o.length; r < l; ++r)
        if (o[r].name === t) {
          o = o.slice(), o.splice(r, 1);
          break;
        }
    }
    s.tween = o;
  };
}
function _k(e, t, n) {
  var o, s;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var i = Ht(this, e), r = i.tween;
    if (r !== o) {
      s = (o = r).slice();
      for (var l = { name: t, value: n }, a = 0, c = s.length; a < c; ++a)
        if (s[a].name === t) {
          s[a] = l;
          break;
        }
      a === c && s.push(l);
    }
    i.tween = s;
  };
}
function wk(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var o = Tt(this.node(), n).tween, s = 0, i = o.length, r; s < i; ++s)
      if ((r = o[s]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? bk : _k)(n, e, t));
}
function dl(e, t, n) {
  var o = e._id;
  return e.each(function() {
    var s = Ht(this, o);
    (s.value || (s.value = {}))[t] = n.apply(this, arguments);
  }), function(s) {
    return Tt(s, o).value[t];
  };
}
function lf(e, t) {
  var n;
  return (typeof t == "number" ? dn : t instanceof Yo ? uu : (n = Yo(t)) ? (t = n, uu) : nk)(e, t);
}
function kk(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Ek(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function xk(e, t, n) {
  var o, s = n + "", i;
  return function() {
    var r = this.getAttribute(e);
    return r === s ? null : r === o ? i : i = t(o = r, n);
  };
}
function Ck(e, t, n) {
  var o, s = n + "", i;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === s ? null : r === o ? i : i = t(o = r, n);
  };
}
function Sk(e, t, n) {
  var o, s, i;
  return function() {
    var r, l = n(this), a;
    return l == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), a = l + "", r === a ? null : r === o && a === s ? i : (s = a, i = t(o = r, l)));
  };
}
function $k(e, t, n) {
  var o, s, i;
  return function() {
    var r, l = n(this), a;
    return l == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), a = l + "", r === a ? null : r === o && a === s ? i : (s = a, i = t(o = r, l)));
  };
}
function Ik(e, t) {
  var n = fi(e), o = n === "transform" ? rk : lf;
  return this.attrTween(e, typeof t == "function" ? (n.local ? $k : Sk)(n, o, dl(this, "attr." + e, t)) : t == null ? (n.local ? Ek : kk)(n) : (n.local ? Ck : xk)(n, o, t));
}
function Nk(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function Mk(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function Tk(e, t) {
  var n, o;
  function s() {
    var i = t.apply(this, arguments);
    return i !== o && (n = (o = i) && Mk(e, i)), n;
  }
  return s._value = t, s;
}
function Ok(e, t) {
  var n, o;
  function s() {
    var i = t.apply(this, arguments);
    return i !== o && (n = (o = i) && Nk(e, i)), n;
  }
  return s._value = t, s;
}
function Pk(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  var o = fi(e);
  return this.tween(n, (o.local ? Tk : Ok)(o, t));
}
function Ak(e, t) {
  return function() {
    cl(this, e).delay = +t.apply(this, arguments);
  };
}
function Dk(e, t) {
  return t = +t, function() {
    cl(this, e).delay = t;
  };
}
function Rk(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Ak : Dk)(t, e)) : Tt(this.node(), t).delay;
}
function Vk(e, t) {
  return function() {
    Ht(this, e).duration = +t.apply(this, arguments);
  };
}
function Lk(e, t) {
  return t = +t, function() {
    Ht(this, e).duration = t;
  };
}
function zk(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? Vk : Lk)(t, e)) : Tt(this.node(), t).duration;
}
function Fk(e, t) {
  if (typeof t != "function")
    throw new Error();
  return function() {
    Ht(this, e).ease = t;
  };
}
function Bk(e) {
  var t = this._id;
  return arguments.length ? this.each(Fk(t, e)) : Tt(this.node(), t).ease;
}
function Hk(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    Ht(this, e).ease = n;
  };
}
function Uk(e) {
  if (typeof e != "function")
    throw new Error();
  return this.each(Hk(this._id, e));
}
function jk(e) {
  typeof e != "function" && (e = Ld(e));
  for (var t = this._groups, n = t.length, o = new Array(n), s = 0; s < n; ++s)
    for (var i = t[s], r = i.length, l = o[s] = [], a, c = 0; c < r; ++c)
      (a = i[c]) && e.call(a, a.__data__, c, i) && l.push(a);
  return new nn(o, this._parents, this._name, this._id);
}
function Gk(e) {
  if (e._id !== this._id)
    throw new Error();
  for (var t = this._groups, n = e._groups, o = t.length, s = n.length, i = Math.min(o, s), r = new Array(o), l = 0; l < i; ++l)
    for (var a = t[l], c = n[l], d = a.length, f = r[l] = new Array(d), h, v = 0; v < d; ++v)
      (h = a[v] || c[v]) && (f[v] = h);
  for (; l < o; ++l)
    r[l] = t[l];
  return new nn(r, this._parents, this._name, this._id);
}
function qk(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function Yk(e, t, n) {
  var o, s, i = qk(t) ? cl : Ht;
  return function() {
    var r = i(this, e), l = r.on;
    l !== o && (s = (o = l).copy()).on(t, n), r.on = s;
  };
}
function Xk(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Tt(this.node(), n).on.on(e) : this.each(Yk(n, e, t));
}
function Kk(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition)
      if (+n !== e)
        return;
    t && t.removeChild(this);
  };
}
function Wk() {
  return this.on("end.remove", Kk(this._id));
}
function Zk(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = rl(e));
  for (var o = this._groups, s = o.length, i = new Array(s), r = 0; r < s; ++r)
    for (var l = o[r], a = l.length, c = i[r] = new Array(a), d, f, h = 0; h < a; ++h)
      (d = l[h]) && (f = e.call(d, d.__data__, h, l)) && ("__data__" in d && (f.__data__ = d.__data__), c[h] = f, hi(c[h], t, n, h, c, Tt(d, n)));
  return new nn(i, this._parents, t, n);
}
function Jk(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Vd(e));
  for (var o = this._groups, s = o.length, i = [], r = [], l = 0; l < s; ++l)
    for (var a = o[l], c = a.length, d, f = 0; f < c; ++f)
      if (d = a[f]) {
        for (var h = e.call(d, d.__data__, f, a), v, w = Tt(d, n), x = 0, I = h.length; x < I; ++x)
          (v = h[x]) && hi(v, t, n, x, h, w);
        i.push(h), r.push(d);
      }
  return new nn(i, r, t, n);
}
var Qk = ns.prototype.constructor;
function e2() {
  return new Qk(this._groups, this._parents);
}
function t2(e, t) {
  var n, o, s;
  return function() {
    var i = ao(this, e), r = (this.style.removeProperty(e), ao(this, e));
    return i === r ? null : i === n && r === o ? s : s = t(n = i, o = r);
  };
}
function af(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function n2(e, t, n) {
  var o, s = n + "", i;
  return function() {
    var r = ao(this, e);
    return r === s ? null : r === o ? i : i = t(o = r, n);
  };
}
function o2(e, t, n) {
  var o, s, i;
  return function() {
    var r = ao(this, e), l = n(this), a = l + "";
    return l == null && (a = l = (this.style.removeProperty(e), ao(this, e))), r === a ? null : r === o && a === s ? i : (s = a, i = t(o = r, l));
  };
}
function s2(e, t) {
  var n, o, s, i = "style." + t, r = "end." + i, l;
  return function() {
    var a = Ht(this, e), c = a.on, d = a.value[i] == null ? l || (l = af(t)) : void 0;
    (c !== n || s !== d) && (o = (n = c).copy()).on(r, s = d), a.on = o;
  };
}
function i2(e, t, n) {
  var o = (e += "") == "transform" ? ik : lf;
  return t == null ? this.styleTween(e, t2(e, o)).on("end.style." + e, af(e)) : typeof t == "function" ? this.styleTween(e, o2(e, o, dl(this, "style." + e, t))).each(s2(this._id, e)) : this.styleTween(e, n2(e, o, t), n).on("end.style." + e, null);
}
function r2(e, t, n) {
  return function(o) {
    this.style.setProperty(e, t.call(this, o), n);
  };
}
function l2(e, t, n) {
  var o, s;
  function i() {
    var r = t.apply(this, arguments);
    return r !== s && (o = (s = r) && r2(e, r, n)), o;
  }
  return i._value = t, i;
}
function a2(e, t, n) {
  var o = "style." + (e += "");
  if (arguments.length < 2)
    return (o = this.tween(o)) && o._value;
  if (t == null)
    return this.tween(o, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(o, l2(e, t, n ?? ""));
}
function u2(e) {
  return function() {
    this.textContent = e;
  };
}
function c2(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function d2(e) {
  return this.tween("text", typeof e == "function" ? c2(dl(this, "text", e)) : u2(e == null ? "" : e + ""));
}
function f2(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function p2(e) {
  var t, n;
  function o() {
    var s = e.apply(this, arguments);
    return s !== n && (t = (n = s) && f2(s)), t;
  }
  return o._value = e, o;
}
function h2(e) {
  var t = "text";
  if (arguments.length < 1)
    return (t = this.tween(t)) && t._value;
  if (e == null)
    return this.tween(t, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(t, p2(e));
}
function v2() {
  for (var e = this._name, t = this._id, n = uf(), o = this._groups, s = o.length, i = 0; i < s; ++i)
    for (var r = o[i], l = r.length, a, c = 0; c < l; ++c)
      if (a = r[c]) {
        var d = Tt(a, t);
        hi(a, e, n, c, r, {
          time: d.time + d.delay + d.duration,
          delay: 0,
          duration: d.duration,
          ease: d.ease
        });
      }
  return new nn(o, this._parents, e, n);
}
function g2() {
  var e, t, n = this, o = n._id, s = n.size();
  return new Promise(function(i, r) {
    var l = { value: r }, a = { value: function() {
      --s === 0 && i();
    } };
    n.each(function() {
      var c = Ht(this, o), d = c.on;
      d !== e && (t = (e = d).copy(), t._.cancel.push(l), t._.interrupt.push(l), t._.end.push(a)), c.on = t;
    }), s === 0 && i();
  });
}
var m2 = 0;
function nn(e, t, n, o) {
  this._groups = e, this._parents = t, this._name = n, this._id = o;
}
function uf() {
  return ++m2;
}
var jt = ns.prototype;
nn.prototype = {
  constructor: nn,
  select: Zk,
  selectAll: Jk,
  selectChild: jt.selectChild,
  selectChildren: jt.selectChildren,
  filter: jk,
  merge: Gk,
  selection: e2,
  transition: v2,
  call: jt.call,
  nodes: jt.nodes,
  node: jt.node,
  size: jt.size,
  empty: jt.empty,
  each: jt.each,
  on: Xk,
  attr: Ik,
  attrTween: Pk,
  style: i2,
  styleTween: a2,
  text: d2,
  textTween: h2,
  remove: Wk,
  tween: wk,
  delay: Rk,
  duration: zk,
  ease: Bk,
  easeVarying: Uk,
  end: g2,
  [Symbol.iterator]: jt[Symbol.iterator]
};
function y2(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var b2 = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: y2
};
function _2(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function w2(e) {
  var t, n;
  e instanceof nn ? (t = e._id, e = e._name) : (t = uf(), (n = b2).time = ul(), e = e == null ? null : e + "");
  for (var o = this._groups, s = o.length, i = 0; i < s; ++i)
    for (var r = o[i], l = r.length, a, c = 0; c < l; ++c)
      (a = r[c]) && hi(a, e, t, c, r, n || _2(a, t));
  return new nn(o, this._parents, e, t);
}
ns.prototype.interrupt = yk;
ns.prototype.transition = w2;
const gs = (e) => () => e;
function k2(e, {
  sourceEvent: t,
  target: n,
  transform: o,
  dispatch: s
}) {
  Object.defineProperties(this, {
    type: { value: e, enumerable: !0, configurable: !0 },
    sourceEvent: { value: t, enumerable: !0, configurable: !0 },
    target: { value: n, enumerable: !0, configurable: !0 },
    transform: { value: o, enumerable: !0, configurable: !0 },
    _: { value: s }
  });
}
function Wt(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
Wt.prototype = {
  constructor: Wt,
  scale: function(e) {
    return e === 1 ? this : new Wt(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Wt(this.k, this.x + this.k * e, this.y + this.k * t);
  },
  apply: function(e) {
    return [e[0] * this.k + this.x, e[1] * this.k + this.y];
  },
  applyX: function(e) {
    return e * this.k + this.x;
  },
  applyY: function(e) {
    return e * this.k + this.y;
  },
  invert: function(e) {
    return [(e[0] - this.x) / this.k, (e[1] - this.y) / this.k];
  },
  invertX: function(e) {
    return (e - this.x) / this.k;
  },
  invertY: function(e) {
    return (e - this.y) / this.k;
  },
  rescaleX: function(e) {
    return e.copy().domain(e.range().map(this.invertX, this).map(e.invert, e));
  },
  rescaleY: function(e) {
    return e.copy().domain(e.range().map(this.invertY, this).map(e.invert, e));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
var co = new Wt(1, 0, 0);
Wt.prototype;
function Gi(e) {
  e.stopImmediatePropagation();
}
function ko(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function E2(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function x2() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function gu() {
  return this.__zoom || co;
}
function C2(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function S2() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function $2(e, t, n) {
  var o = e.invertX(t[0][0]) - n[0][0], s = e.invertX(t[1][0]) - n[1][0], i = e.invertY(t[0][1]) - n[0][1], r = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s),
    r > i ? (i + r) / 2 : Math.min(0, i) || Math.max(0, r)
  );
}
function I2() {
  var e = E2, t = x2, n = $2, o = C2, s = S2, i = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, a = ck, c = di("start", "zoom", "end"), d, f, h, v = 500, w = 150, x = 0, I = 10;
  function C($) {
    $.property("__zoom", gu).on("wheel.zoom", j, { passive: !1 }).on("mousedown.zoom", P).on("dblclick.zoom", L).filter(s).on("touchstart.zoom", X).on("touchmove.zoom", U).on("touchend.zoom touchcancel.zoom", K).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  C.transform = function($, V, M, R) {
    var G = $.selection ? $.selection() : $;
    G.property("__zoom", gu), $ !== G ? z($, V, M, R) : G.interrupt().each(function() {
      Y(this, arguments).event(R).start().zoom(null, typeof V == "function" ? V.apply(this, arguments) : V).end();
    });
  }, C.scaleBy = function($, V, M, R) {
    C.scaleTo($, function() {
      var G = this.__zoom.k, oe = typeof V == "function" ? V.apply(this, arguments) : V;
      return G * oe;
    }, M, R);
  }, C.scaleTo = function($, V, M, R) {
    C.transform($, function() {
      var G = t.apply(this, arguments), oe = this.__zoom, ue = M == null ? m(G) : typeof M == "function" ? M.apply(this, arguments) : M, de = oe.invert(ue), re = typeof V == "function" ? V.apply(this, arguments) : V;
      return n(_(D(oe, re), ue, de), G, r);
    }, M, R);
  }, C.translateBy = function($, V, M, R) {
    C.transform($, function() {
      return n(this.__zoom.translate(
        typeof V == "function" ? V.apply(this, arguments) : V,
        typeof M == "function" ? M.apply(this, arguments) : M
      ), t.apply(this, arguments), r);
    }, null, R);
  }, C.translateTo = function($, V, M, R, G) {
    C.transform($, function() {
      var oe = t.apply(this, arguments), ue = this.__zoom, de = R == null ? m(oe) : typeof R == "function" ? R.apply(this, arguments) : R;
      return n(co.translate(de[0], de[1]).scale(ue.k).translate(
        typeof V == "function" ? -V.apply(this, arguments) : -V,
        typeof M == "function" ? -M.apply(this, arguments) : -M
      ), oe, r);
    }, R, G);
  };
  function D($, V) {
    return V = Math.max(i[0], Math.min(i[1], V)), V === $.k ? $ : new Wt(V, $.x, $.y);
  }
  function _($, V, M) {
    var R = V[0] - M[0] * $.k, G = V[1] - M[1] * $.k;
    return R === $.x && G === $.y ? $ : new Wt($.k, R, G);
  }
  function m($) {
    return [(+$[0][0] + +$[1][0]) / 2, (+$[0][1] + +$[1][1]) / 2];
  }
  function z($, V, M, R) {
    $.on("start.zoom", function() {
      Y(this, arguments).event(R).start();
    }).on("interrupt.zoom end.zoom", function() {
      Y(this, arguments).event(R).end();
    }).tween("zoom", function() {
      var G = this, oe = arguments, ue = Y(G, oe).event(R), de = t.apply(G, oe), re = M == null ? m(de) : typeof M == "function" ? M.apply(G, oe) : M, fe = Math.max(de[1][0] - de[0][0], de[1][1] - de[0][1]), ce = G.__zoom, he = typeof V == "function" ? V.apply(G, oe) : V, te = a(ce.invert(re).concat(fe / ce.k), he.invert(re).concat(fe / he.k));
      return function(_e) {
        if (_e === 1)
          _e = he;
        else {
          var xe = te(_e), we = fe / xe[2];
          _e = new Wt(we, re[0] - xe[0] * we, re[1] - xe[1] * we);
        }
        ue.zoom(null, _e);
      };
    });
  }
  function Y($, V, M) {
    return !M && $.__zooming || new q($, V);
  }
  function q($, V) {
    this.that = $, this.args = V, this.active = 0, this.sourceEvent = null, this.extent = t.apply($, V), this.taps = 0;
  }
  q.prototype = {
    event: function($) {
      return $ && (this.sourceEvent = $), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function($, V) {
      return this.mouse && $ !== "mouse" && (this.mouse[1] = V.invert(this.mouse[0])), this.touch0 && $ !== "touch" && (this.touch0[1] = V.invert(this.touch0[0])), this.touch1 && $ !== "touch" && (this.touch1[1] = V.invert(this.touch1[0])), this.that.__zoom = V, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function($) {
      var V = St(this.that).datum();
      c.call(
        $,
        this.that,
        new k2($, {
          sourceEvent: this.sourceEvent,
          target: C,
          transform: this.that.__zoom,
          dispatch: c
        }),
        V
      );
    }
  };
  function j($, ...V) {
    if (!e.apply(this, arguments))
      return;
    var M = Y(this, V).event($), R = this.__zoom, G = Math.max(i[0], Math.min(i[1], R.k * Math.pow(2, o.apply(this, arguments)))), oe = At($);
    if (M.wheel)
      (M.mouse[0][0] !== oe[0] || M.mouse[0][1] !== oe[1]) && (M.mouse[1] = R.invert(M.mouse[0] = oe)), clearTimeout(M.wheel);
    else {
      if (R.k === G)
        return;
      M.mouse = [oe, R.invert(oe)], Ms(this), M.start();
    }
    ko($), M.wheel = setTimeout(ue, w), M.zoom("mouse", n(_(D(R, G), M.mouse[0], M.mouse[1]), M.extent, r));
    function ue() {
      M.wheel = null, M.end();
    }
  }
  function P($, ...V) {
    if (h || !e.apply(this, arguments))
      return;
    var M = $.currentTarget, R = Y(this, V, !0).event($), G = St($.view).on("mousemove.zoom", re, !0).on("mouseup.zoom", fe, !0), oe = At($, M), ue = $.clientX, de = $.clientY;
    Xd($.view), Gi($), R.mouse = [oe, this.__zoom.invert(oe)], Ms(this), R.start();
    function re(ce) {
      if (ko(ce), !R.moved) {
        var he = ce.clientX - ue, te = ce.clientY - de;
        R.moved = he * he + te * te > x;
      }
      R.event(ce).zoom("mouse", n(_(R.that.__zoom, R.mouse[0] = At(ce, M), R.mouse[1]), R.extent, r));
    }
    function fe(ce) {
      G.on("mousemove.zoom mouseup.zoom", null), Kd(ce.view, R.moved), ko(ce), R.event(ce).end();
    }
  }
  function L($, ...V) {
    if (e.apply(this, arguments)) {
      var M = this.__zoom, R = At($.changedTouches ? $.changedTouches[0] : $, this), G = M.invert(R), oe = M.k * ($.shiftKey ? 0.5 : 2), ue = n(_(D(M, oe), R, G), t.apply(this, V), r);
      ko($), l > 0 ? St(this).transition().duration(l).call(z, ue, R, $) : St(this).call(C.transform, ue, R, $);
    }
  }
  function X($, ...V) {
    if (e.apply(this, arguments)) {
      var M = $.touches, R = M.length, G = Y(this, V, $.changedTouches.length === R).event($), oe, ue, de, re;
      for (Gi($), ue = 0; ue < R; ++ue)
        de = M[ue], re = At(de, this), re = [re, this.__zoom.invert(re), de.identifier], G.touch0 ? !G.touch1 && G.touch0[2] !== re[2] && (G.touch1 = re, G.taps = 0) : (G.touch0 = re, oe = !0, G.taps = 1 + !!d);
      d && (d = clearTimeout(d)), oe && (G.taps < 2 && (f = re[0], d = setTimeout(function() {
        d = null;
      }, v)), Ms(this), G.start());
    }
  }
  function U($, ...V) {
    if (this.__zooming) {
      var M = Y(this, V).event($), R = $.changedTouches, G = R.length, oe, ue, de, re;
      for (ko($), oe = 0; oe < G; ++oe)
        ue = R[oe], de = At(ue, this), M.touch0 && M.touch0[2] === ue.identifier ? M.touch0[0] = de : M.touch1 && M.touch1[2] === ue.identifier && (M.touch1[0] = de);
      if (ue = M.that.__zoom, M.touch1) {
        var fe = M.touch0[0], ce = M.touch0[1], he = M.touch1[0], te = M.touch1[1], _e = (_e = he[0] - fe[0]) * _e + (_e = he[1] - fe[1]) * _e, xe = (xe = te[0] - ce[0]) * xe + (xe = te[1] - ce[1]) * xe;
        ue = D(ue, Math.sqrt(_e / xe)), de = [(fe[0] + he[0]) / 2, (fe[1] + he[1]) / 2], re = [(ce[0] + te[0]) / 2, (ce[1] + te[1]) / 2];
      } else if (M.touch0)
        de = M.touch0[0], re = M.touch0[1];
      else
        return;
      M.zoom("touch", n(_(ue, de, re), M.extent, r));
    }
  }
  function K($, ...V) {
    if (this.__zooming) {
      var M = Y(this, V).event($), R = $.changedTouches, G = R.length, oe, ue;
      for (Gi($), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, v), oe = 0; oe < G; ++oe)
        ue = R[oe], M.touch0 && M.touch0[2] === ue.identifier ? delete M.touch0 : M.touch1 && M.touch1[2] === ue.identifier && delete M.touch1;
      if (M.touch1 && !M.touch0 && (M.touch0 = M.touch1, delete M.touch1), M.touch0)
        M.touch0[1] = this.__zoom.invert(M.touch0[0]);
      else if (M.end(), M.taps === 2 && (ue = At(ue, this), Math.hypot(f[0] - ue[0], f[1] - ue[1]) < I)) {
        var de = St(this).on("dblclick.zoom");
        de && de.apply(this, arguments);
      }
    }
  }
  return C.wheelDelta = function($) {
    return arguments.length ? (o = typeof $ == "function" ? $ : gs(+$), C) : o;
  }, C.filter = function($) {
    return arguments.length ? (e = typeof $ == "function" ? $ : gs(!!$), C) : e;
  }, C.touchable = function($) {
    return arguments.length ? (s = typeof $ == "function" ? $ : gs(!!$), C) : s;
  }, C.extent = function($) {
    return arguments.length ? (t = typeof $ == "function" ? $ : gs([[+$[0][0], +$[0][1]], [+$[1][0], +$[1][1]]]), C) : t;
  }, C.scaleExtent = function($) {
    return arguments.length ? (i[0] = +$[0], i[1] = +$[1], C) : [i[0], i[1]];
  }, C.translateExtent = function($) {
    return arguments.length ? (r[0][0] = +$[0][0], r[1][0] = +$[1][0], r[0][1] = +$[0][1], r[1][1] = +$[1][1], C) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, C.constrain = function($) {
    return arguments.length ? (n = $, C) : n;
  }, C.duration = function($) {
    return arguments.length ? (l = +$, C) : l;
  }, C.interpolate = function($) {
    return arguments.length ? (a = $, C) : a;
  }, C.on = function() {
    var $ = c.on.apply(c, arguments);
    return $ === c ? C : $;
  }, C.clickDistance = function($) {
    return arguments.length ? (x = ($ = +$) * $, C) : Math.sqrt(x);
  }, C.tapDistance = function($) {
    return arguments.length ? (I = +$, C) : I;
  }, C;
}
var be = /* @__PURE__ */ ((e) => (e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom", e))(be || {}), fl = /* @__PURE__ */ ((e) => (e.Partial = "partial", e.Full = "full", e))(fl || {}), Tn = /* @__PURE__ */ ((e) => (e.Bezier = "default", e.SimpleBezier = "simple-bezier", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e))(Tn || {}), Un = /* @__PURE__ */ ((e) => (e.Strict = "strict", e.Loose = "loose", e))(Un || {}), Nr = /* @__PURE__ */ ((e) => (e.Arrow = "arrow", e.ArrowClosed = "arrowclosed", e))(Nr || {}), Do = /* @__PURE__ */ ((e) => (e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal", e))(Do || {});
function Mr(e) {
  var t, n;
  const o = ((n = (t = e.composedPath) == null ? void 0 : t.call(e)) == null ? void 0 : n[0]) || e.target, s = typeof (o == null ? void 0 : o.hasAttribute) == "function" ? o.hasAttribute("contenteditable") : !1, i = typeof (o == null ? void 0 : o.closest) == "function" ? o.closest(".nokey") : null;
  return ["INPUT", "SELECT", "TEXTAREA"].includes(o == null ? void 0 : o.nodeName) || s || !!i;
}
function N2(e) {
  return e.ctrlKey || e.metaKey || e.shiftKey;
}
function mu(e, t, n, o) {
  const s = t.replace("+", `
`).replace(`

`, `
+`).split(`
`).map((r) => r.trim().toLowerCase());
  if (s.length === 1)
    return e.toLowerCase() === t.toLowerCase();
  o || n.add(e.toLowerCase());
  const i = s.every(
    (r, l) => n.has(r) && Array.from(n.values())[l] === s[l]
  );
  return o && n.delete(e.toLowerCase()), i;
}
function M2(e, t) {
  return (n) => {
    if (!n.code && !n.key)
      return !1;
    const o = T2(n.code, e);
    return Array.isArray(e) ? e.some((s) => mu(n[o], s, t, n.type === "keyup")) : mu(n[o], e, t, n.type === "keyup");
  };
}
function T2(e, t) {
  return t.includes(e) ? "code" : "key";
}
function Ro(e, t) {
  const n = He(() => Pe(t == null ? void 0 : t.actInsideInputWithModifier) ?? !1), o = He(() => Pe(t == null ? void 0 : t.target) ?? window), s = ee(Pe(e) === !0);
  let i = !1;
  const r = /* @__PURE__ */ new Set();
  let l = c(Pe(e));
  Ne(
    () => Pe(e),
    (d, f) => {
      typeof f == "boolean" && typeof d != "boolean" && a(), l = c(d);
    },
    {
      immediate: !0
    }
  ), Dd(["blur", "contextmenu"], a), Ja(
    (...d) => l(...d),
    (d) => {
      i = N2(d), !((!i || i && !n.value) && Mr(d)) && (d.preventDefault(), s.value = !0);
    },
    { eventName: "keydown", target: o }
  ), Ja(
    (...d) => l(...d),
    (d) => {
      if (s.value) {
        if ((!i || i && !n.value) && Mr(d))
          return;
        i = !1, s.value = !1;
      }
    },
    { eventName: "keyup", target: o }
  );
  function a() {
    i = !1, r.clear(), s.value = Pe(e) === !0;
  }
  function c(d) {
    return d === null ? (a(), () => !1) : typeof d == "boolean" ? (a(), s.value = d, () => !1) : Array.isArray(d) || typeof d == "string" ? M2(d, r) : d;
  }
  return s;
}
const cf = "vue-flow__node-desc", df = "vue-flow__edge-desc", O2 = "vue-flow__aria-live", ff = ["Enter", " ", "Escape"], so = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
};
function Tr(e) {
  return {
    ...e.computedPosition || { x: 0, y: 0 },
    width: e.dimensions.width || 0,
    height: e.dimensions.height || 0
  };
}
function Or(e, t) {
  const n = Math.max(0, Math.min(e.x + e.width, t.x + t.width) - Math.max(e.x, t.x)), o = Math.max(0, Math.min(e.y + e.height, t.y + t.height) - Math.max(e.y, t.y));
  return Math.ceil(n * o);
}
function vi(e) {
  return {
    width: e.offsetWidth,
    height: e.offsetHeight
  };
}
function jn(e, t = 0, n = 1) {
  return Math.min(Math.max(e, t), n);
}
function pf(e, t) {
  return {
    x: jn(e.x, t[0][0], t[1][0]),
    y: jn(e.y, t[0][1], t[1][1])
  };
}
function yu(e) {
  const t = e.getRootNode();
  return "elementFromPoint" in t ? t : window.document;
}
function En(e) {
  return e && typeof e == "object" && "id" in e && "source" in e && "target" in e;
}
function Ln(e) {
  return e && typeof e == "object" && "id" in e && "position" in e && !En(e);
}
function $o(e) {
  return Ln(e) && "computedPosition" in e;
}
function ms(e) {
  return !Number.isNaN(e) && Number.isFinite(e);
}
function P2(e) {
  return ms(e.width) && ms(e.height) && ms(e.x) && ms(e.y);
}
function A2(e, t, n) {
  const o = {
    id: e.id.toString(),
    type: e.type ?? "default",
    dimensions: Dn({
      width: 0,
      height: 0
    }),
    computedPosition: Dn({
      z: 0,
      ...e.position
    }),
    // todo: shouldn't be defined initially, as we want to use handleBounds to check if a node was actually initialized or not
    handleBounds: {
      source: [],
      target: []
    },
    draggable: void 0,
    selectable: void 0,
    connectable: void 0,
    focusable: void 0,
    selected: !1,
    dragging: !1,
    resizing: !1,
    initialized: !1,
    isParent: !1,
    position: {
      x: 0,
      y: 0
    },
    data: We(e.data) ? e.data : {},
    events: Dn(We(e.events) ? e.events : {})
  };
  return Object.assign(t ?? o, e, { id: e.id.toString(), parentNode: n });
}
function hf(e, t, n) {
  var o, s;
  const i = {
    id: e.id.toString(),
    type: e.type ?? (t == null ? void 0 : t.type) ?? "default",
    source: e.source.toString(),
    target: e.target.toString(),
    sourceHandle: (o = e.sourceHandle) == null ? void 0 : o.toString(),
    targetHandle: (s = e.targetHandle) == null ? void 0 : s.toString(),
    updatable: e.updatable ?? (n == null ? void 0 : n.updatable),
    selectable: e.selectable ?? (n == null ? void 0 : n.selectable),
    focusable: e.focusable ?? (n == null ? void 0 : n.focusable),
    data: We(e.data) ? e.data : {},
    events: Dn(We(e.events) ? e.events : {}),
    label: e.label ?? "",
    interactionWidth: e.interactionWidth ?? (n == null ? void 0 : n.interactionWidth),
    ...n ?? {}
  };
  return Object.assign(t ?? i, e, { id: e.id.toString() });
}
function vf(e, t, n, o) {
  const s = typeof e == "string" ? e : e.id, i = /* @__PURE__ */ new Set(), r = o === "source" ? "target" : "source";
  for (const l of n)
    l[r] === s && i.add(l[o]);
  return t.filter((l) => i.has(l.id));
}
function D2(...e) {
  if (e.length === 3) {
    const [i, r, l] = e;
    return vf(i, r, l, "target");
  }
  const [t, n] = e, o = typeof t == "string" ? t : t.id;
  return n.filter((i) => En(i) && i.source === o).map((i) => n.find((r) => Ln(r) && r.id === i.target));
}
function R2(...e) {
  if (e.length === 3) {
    const [i, r, l] = e;
    return vf(i, r, l, "source");
  }
  const [t, n] = e, o = typeof t == "string" ? t : t.id;
  return n.filter((i) => En(i) && i.target === o).map((i) => n.find((r) => Ln(r) && r.id === i.source));
}
function gf({ source: e, sourceHandle: t, target: n, targetHandle: o }) {
  return `vueflow__edge-${e}${t ?? ""}-${n}${o ?? ""}`;
}
function V2(e, t) {
  return t.some(
    (n) => En(n) && n.source === e.source && n.target === e.target && (n.sourceHandle === e.sourceHandle || !n.sourceHandle && !e.sourceHandle) && (n.targetHandle === e.targetHandle || !n.targetHandle && !e.targetHandle)
  );
}
function mf({ x: e, y: t }, { x: n, y: o, zoom: s }) {
  return {
    x: e * s + n,
    y: t * s + o
  };
}
function Ko({ x: e, y: t }, { x: n, y: o, zoom: s }, i = !1, r = [1, 1]) {
  const l = {
    x: (e - n) / s,
    y: (t - o) / s
  };
  return i ? gi(l, r) : l;
}
function L2(e, t) {
  return {
    x: Math.min(e.x, t.x),
    y: Math.min(e.y, t.y),
    x2: Math.max(e.x2, t.x2),
    y2: Math.max(e.y2, t.y2)
  };
}
function yf({ x: e, y: t, width: n, height: o }) {
  return {
    x: e,
    y: t,
    x2: e + n,
    y2: t + o
  };
}
function z2({ x: e, y: t, x2: n, y2: o }) {
  return {
    x: e,
    y: t,
    width: n - e,
    height: o - t
  };
}
function bf(e) {
  let t = {
    x: Number.POSITIVE_INFINITY,
    y: Number.POSITIVE_INFINITY,
    x2: Number.NEGATIVE_INFINITY,
    y2: Number.NEGATIVE_INFINITY
  };
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    t = L2(
      t,
      yf({
        ...o.computedPosition,
        ...o.dimensions
      })
    );
  }
  return z2(t);
}
function _f(e, t, n = { x: 0, y: 0, zoom: 1 }, o = !1, s = !1) {
  const i = {
    ...Ko(t, n),
    width: t.width / n.zoom,
    height: t.height / n.zoom
  }, r = [];
  for (const l of e) {
    const { dimensions: a, selectable: c = !0, hidden: d = !1 } = l, f = a.width ?? l.width ?? null, h = a.height ?? l.height ?? null;
    if (s && !c || d)
      continue;
    const v = Or(i, Tr(l)), w = f === null || h === null, x = o && v > 0, I = (f ?? 0) * (h ?? 0);
    (w || x || v >= I || l.dragging) && r.push(l);
  }
  return r;
}
function wf(e, t) {
  const n = /* @__PURE__ */ new Set();
  if (typeof e == "string")
    n.add(e);
  else if (e.length >= 1)
    for (const o of e)
      n.add(o.id);
  return t.filter((o) => n.has(o.source) || n.has(o.target));
}
function bu(e, t, n, o, s, i = 0.1, r = { x: 0, y: 0 }) {
  const l = t / (e.width * (1 + i)), a = n / (e.height * (1 + i)), c = Math.min(l, a), d = jn(c, o, s), f = e.x + e.width / 2, h = e.y + e.height / 2, v = t / 2 - f * d + (r.x ?? 0), w = n / 2 - h * d + (r.y ?? 0);
  return { x: v, y: w, zoom: d };
}
function F2(e, t) {
  return {
    x: t.x + e.x,
    y: t.y + e.y,
    z: (e.z > t.z ? e.z : t.z) + 1
  };
}
function kf(e, t) {
  if (!e.parentNode)
    return !1;
  const n = t(e.parentNode);
  return n ? n.selected ? !0 : kf(n, t) : !1;
}
function Wo(e, t) {
  return typeof e > "u" ? "" : typeof e == "string" ? e : `${t ? `${t}__` : ""}${Object.keys(e).sort().map((o) => `${o}=${e[o]}`).join("&")}`;
}
function _u(e, t, n) {
  return e < t ? jn(Math.abs(e - t), 1, t) / t : e > n ? -jn(Math.abs(e - n), 1, t) / t : 0;
}
function Ef(e, t, n = 15, o = 40) {
  const s = _u(e.x, o, t.width - o) * n, i = _u(e.y, o, t.height - o) * n;
  return [s, i];
}
function qi(e, t) {
  if (t) {
    const n = e.position.x + e.dimensions.width - t.dimensions.width, o = e.position.y + e.dimensions.height - t.dimensions.height;
    if (n > 0 || o > 0 || e.position.x < 0 || e.position.y < 0) {
      let s = {};
      if (typeof t.style == "function" ? s = { ...t.style(t) } : t.style && (s = { ...t.style }), s.width = s.width ?? `${t.dimensions.width}px`, s.height = s.height ?? `${t.dimensions.height}px`, n > 0)
        if (typeof s.width == "string") {
          const i = Number(s.width.replace("px", ""));
          s.width = `${i + n}px`;
        } else
          s.width += n;
      if (o > 0)
        if (typeof s.height == "string") {
          const i = Number(s.height.replace("px", ""));
          s.height = `${i + o}px`;
        } else
          s.height += o;
      if (e.position.x < 0) {
        const i = Math.abs(e.position.x);
        if (t.position.x = t.position.x - i, typeof s.width == "string") {
          const r = Number(s.width.replace("px", ""));
          s.width = `${r + i}px`;
        } else
          s.width += i;
        e.position.x = 0;
      }
      if (e.position.y < 0) {
        const i = Math.abs(e.position.y);
        if (t.position.y = t.position.y - i, typeof s.height == "string") {
          const r = Number(s.height.replace("px", ""));
          s.height = `${r + i}px`;
        } else
          s.height += i;
        e.position.y = 0;
      }
      t.dimensions.width = Number(s.width.toString().replace("px", "")), t.dimensions.height = Number(s.height.toString().replace("px", "")), typeof t.style == "function" ? t.style = (i) => {
        const r = t.style;
        return {
          ...r(i),
          ...s
        };
      } : t.style = {
        ...t.style,
        ...s
      };
    }
  }
}
function wu(e, t) {
  var n, o;
  const s = e.filter((r) => r.type === "add" || r.type === "remove");
  for (const r of s)
    if (r.type === "add")
      t.findIndex((a) => a.id === r.item.id) === -1 && t.push(r.item);
    else if (r.type === "remove") {
      const l = t.findIndex((a) => a.id === r.id);
      l !== -1 && t.splice(l, 1);
    }
  const i = t.map((r) => r.id);
  for (const r of t)
    for (const l of e)
      if (l.id === r.id)
        switch (l.type) {
          case "select":
            r.selected = l.selected;
            break;
          case "position":
            if ($o(r) && (typeof l.position < "u" && (r.position = l.position), typeof l.dragging < "u" && (r.dragging = l.dragging), r.expandParent && r.parentNode)) {
              const a = t[i.indexOf(r.parentNode)];
              a && $o(a) && qi(r, a);
            }
            break;
          case "dimensions":
            if ($o(r) && (typeof l.dimensions < "u" && (r.dimensions = l.dimensions), typeof l.updateStyle < "u" && l.updateStyle && (r.style = {
              ...r.style || {},
              width: `${(n = l.dimensions) == null ? void 0 : n.width}px`,
              height: `${(o = l.dimensions) == null ? void 0 : o.height}px`
            }), typeof l.resizing < "u" && (r.resizing = l.resizing), r.expandParent && r.parentNode)) {
              const a = t[i.indexOf(r.parentNode)];
              a && $o(a) && (!!a.dimensions.width && !!a.dimensions.height ? qi(r, a) : ot(() => {
                qi(r, a);
              }));
            }
            break;
        }
  return t;
}
function an(e, t) {
  return {
    id: e,
    type: "select",
    selected: t
  };
}
function ku(e) {
  return {
    item: e,
    type: "add"
  };
}
function Eu(e) {
  return {
    id: e,
    type: "remove"
  };
}
function xu(e, t, n, o, s) {
  return {
    id: e,
    source: t,
    target: n,
    sourceHandle: o || null,
    targetHandle: s || null,
    type: "remove"
  };
}
function fn(e, t = /* @__PURE__ */ new Set(), n = !1) {
  const o = [];
  for (const [s, i] of e) {
    const r = t.has(s);
    !(i.selected === void 0 && !r) && i.selected !== r && (n && (i.selected = r), o.push(an(i.id, r)));
  }
  return o;
}
function pe(e) {
  const t = /* @__PURE__ */ new Set();
  let n = !1;
  const o = () => t.size > 0;
  e && (n = !0, t.add(e));
  const s = (l) => {
    t.delete(l);
  };
  return {
    on: (l) => {
      e && n && t.delete(e), t.add(l);
      const a = () => {
        s(l), e && n && t.add(e);
      };
      return ci(a), {
        off: a
      };
    },
    off: s,
    trigger: (l) => Promise.all(Array.from(t).map((a) => a(l))),
    hasListeners: o,
    fns: t
  };
}
function Cu(e, t, n) {
  let o = e;
  do {
    if (o && o.matches(t))
      return !0;
    if (o === n)
      return !1;
    o = o.parentElement;
  } while (o);
  return !1;
}
function B2(e, t, n, o, s) {
  var i, r;
  const l = [];
  for (const a of e)
    (a.selected || a.id === s) && (!a.parentNode || !kf(a, o)) && (a.draggable || t && typeof a.draggable > "u") && l.push(
      Dn({
        id: a.id,
        position: a.position || { x: 0, y: 0 },
        distance: {
          x: n.x - ((i = a.computedPosition) == null ? void 0 : i.x) || 0,
          y: n.y - ((r = a.computedPosition) == null ? void 0 : r.y) || 0
        },
        from: a.computedPosition,
        extent: a.extent,
        parentNode: a.parentNode,
        dimensions: a.dimensions,
        expandParent: a.expandParent
      })
    );
  return l;
}
function Yi({
  id: e,
  dragItems: t,
  findNode: n
}) {
  const o = [];
  for (const s of t) {
    const i = n(s.id);
    i && o.push(i);
  }
  return [e ? o.find((s) => s.id === e) : o[0], o];
}
function xf(e) {
  if (Array.isArray(e))
    switch (e.length) {
      case 1:
        return [e[0], e[0], e[0], e[0]];
      case 2:
        return [e[0], e[1], e[0], e[1]];
      case 3:
        return [e[0], e[1], e[2], e[1]];
      case 4:
        return e;
      default:
        return [0, 0, 0, 0];
    }
  return [e, e, e, e];
}
function H2(e, t, n) {
  const [o, s, i, r] = typeof e != "string" ? xf(e.padding) : [0, 0, 0, 0];
  return n && typeof n.computedPosition.x < "u" && typeof n.computedPosition.y < "u" && typeof n.dimensions.width < "u" && typeof n.dimensions.height < "u" ? [
    [n.computedPosition.x + r, n.computedPosition.y + o],
    [
      n.computedPosition.x + n.dimensions.width - s,
      n.computedPosition.y + n.dimensions.height - i
    ]
  ] : !1;
}
function U2(e, t, n, o) {
  let s = e.extent || n;
  if ((s === "parent" || !Array.isArray(s) && (s == null ? void 0 : s.range) === "parent") && !e.expandParent)
    if (e.parentNode && o && e.dimensions.width && e.dimensions.height) {
      const i = H2(s, e, o);
      i && (s = i);
    } else
      t(new tt(Ze.NODE_EXTENT_INVALID, e.id)), s = n;
  else if (Array.isArray(s)) {
    const i = (o == null ? void 0 : o.computedPosition.x) || 0, r = (o == null ? void 0 : o.computedPosition.y) || 0;
    s = [
      [s[0][0] + i, s[0][1] + r],
      [s[1][0] + i, s[1][1] + r]
    ];
  } else if (s !== "parent" && (s != null && s.range) && Array.isArray(s.range)) {
    const [i, r, l, a] = xf(s.padding), c = (o == null ? void 0 : o.computedPosition.x) || 0, d = (o == null ? void 0 : o.computedPosition.y) || 0;
    s = [
      [s.range[0][0] + c + a, s.range[0][1] + d + i],
      [s.range[1][0] + c - r, s.range[1][1] + d - l]
    ];
  }
  return s === "parent" ? [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
  ] : s;
}
function j2({ width: e, height: t }, n) {
  return [n[0], [n[1][0] - (e || 0), n[1][1] - (t || 0)]];
}
function pl(e, t, n, o, s) {
  const i = j2(e.dimensions, U2(e, n, o, s)), r = pf(t, i);
  return {
    position: {
      x: r.x - ((s == null ? void 0 : s.computedPosition.x) || 0),
      y: r.y - ((s == null ? void 0 : s.computedPosition.y) || 0)
    },
    computedPosition: r
  };
}
function Ys(e, t, n = be.Left) {
  const o = ((t == null ? void 0 : t.x) ?? 0) + e.computedPosition.x, s = ((t == null ? void 0 : t.y) ?? 0) + e.computedPosition.y, { width: i, height: r } = t ?? Y2(e);
  switch ((t == null ? void 0 : t.position) ?? n) {
    case be.Top:
      return {
        x: o + i / 2,
        y: s
      };
    case be.Right:
      return {
        x: o + i,
        y: s + r / 2
      };
    case be.Bottom:
      return {
        x: o + i / 2,
        y: s + r
      };
    case be.Left:
      return {
        x: o,
        y: s + r / 2
      };
  }
}
function Su(e = [], t) {
  return e.length && (t ? e.find((n) => n.id === t) : e[0]) || null;
}
function G2({
  sourcePos: e,
  targetPos: t,
  sourceWidth: n,
  sourceHeight: o,
  targetWidth: s,
  targetHeight: i,
  width: r,
  height: l,
  viewport: a
}) {
  const c = {
    x: Math.min(e.x, t.x),
    y: Math.min(e.y, t.y),
    x2: Math.max(e.x + n, t.x + s),
    y2: Math.max(e.y + o, t.y + i)
  };
  c.x === c.x2 && (c.x2 += 1), c.y === c.y2 && (c.y2 += 1);
  const d = yf({
    x: (0 - a.x) / a.zoom,
    y: (0 - a.y) / a.zoom,
    width: r / a.zoom,
    height: l / a.zoom
  }), f = Math.max(0, Math.min(d.x2, c.x2) - Math.max(d.x, c.x)), h = Math.max(0, Math.min(d.y2, c.y2) - Math.max(d.y, c.y));
  return Math.ceil(f * h) > 0;
}
function q2(e, t, n = !1) {
  const o = typeof e.zIndex == "number";
  let s = o ? e.zIndex : 0;
  const i = t(e.source), r = t(e.target);
  return !i || !r ? 0 : (n && (s = o ? e.zIndex : Math.max(i.computedPosition.z || 0, r.computedPosition.z || 0)), s);
}
var Ze = /* @__PURE__ */ ((e) => (e.MISSING_STYLES = "MISSING_STYLES", e.MISSING_VIEWPORT_DIMENSIONS = "MISSING_VIEWPORT_DIMENSIONS", e.NODE_INVALID = "NODE_INVALID", e.NODE_NOT_FOUND = "NODE_NOT_FOUND", e.NODE_MISSING_PARENT = "NODE_MISSING_PARENT", e.NODE_TYPE_MISSING = "NODE_TYPE_MISSING", e.NODE_EXTENT_INVALID = "NODE_EXTENT_INVALID", e.EDGE_INVALID = "EDGE_INVALID", e.EDGE_NOT_FOUND = "EDGE_NOT_FOUND", e.EDGE_SOURCE_MISSING = "EDGE_SOURCE_MISSING", e.EDGE_TARGET_MISSING = "EDGE_TARGET_MISSING", e.EDGE_TYPE_MISSING = "EDGE_TYPE_MISSING", e.EDGE_SOURCE_TARGET_SAME = "EDGE_SOURCE_TARGET_SAME", e.EDGE_SOURCE_TARGET_MISSING = "EDGE_SOURCE_TARGET_MISSING", e.EDGE_ORPHANED = "EDGE_ORPHANED", e.USEVUEFLOW_OPTIONS = "USEVUEFLOW_OPTIONS", e))(Ze || {});
const $u = {
  MISSING_STYLES: () => "It seems that you haven't loaded the necessary styles. Please import '@vue-flow/core/dist/style.css' to ensure that the graph is rendered correctly",
  MISSING_VIEWPORT_DIMENSIONS: () => "The Vue Flow parent container needs a width and a height to render the graph",
  NODE_INVALID: (e) => `Node is invalid
Node: ${e}`,
  NODE_NOT_FOUND: (e) => `Node not found
Node: ${e}`,
  NODE_MISSING_PARENT: (e, t) => `Node is missing a parent
Node: ${e}
Parent: ${t}`,
  NODE_TYPE_MISSING: (e) => `Node type is missing
Type: ${e}`,
  NODE_EXTENT_INVALID: (e) => `Only child nodes can use a parent extent
Node: ${e}`,
  EDGE_INVALID: (e) => `An edge needs a source and a target
Edge: ${e}`,
  EDGE_SOURCE_MISSING: (e, t) => `Edge source is missing
Edge: ${e} 
Source: ${t}`,
  EDGE_TARGET_MISSING: (e, t) => `Edge target is missing
Edge: ${e} 
Target: ${t}`,
  EDGE_TYPE_MISSING: (e) => `Edge type is missing
Type: ${e}`,
  EDGE_SOURCE_TARGET_SAME: (e, t, n) => `Edge source and target are the same
Edge: ${e} 
Source: ${t} 
Target: ${n}`,
  EDGE_SOURCE_TARGET_MISSING: (e, t, n) => `Edge source or target is missing
Edge: ${e} 
Source: ${t} 
Target: ${n}`,
  EDGE_ORPHANED: (e) => `Edge was orphaned (suddenly missing source or target) and has been removed
Edge: ${e}`,
  EDGE_NOT_FOUND: (e) => `Edge not found
Edge: ${e}`,
  // deprecation errors
  USEVUEFLOW_OPTIONS: () => "The options parameter is deprecated and will be removed in the next major version. Please use the id parameter instead"
};
class tt extends Error {
  constructor(t, ...n) {
    var o;
    super((o = $u[t]) == null ? void 0 : o.call($u, ...n)), this.name = "VueFlowError", this.code = t, this.args = n;
  }
}
function hl(e) {
  return "clientX" in e;
}
function Cf(e) {
  return "sourceEvent" in e;
}
function tn(e, t) {
  var n, o;
  const s = hl(e), i = s ? e.clientX : (n = e.touches) == null ? void 0 : n[0].clientX, r = s ? e.clientY : (o = e.touches) == null ? void 0 : o[0].clientY;
  return {
    x: i - ((t == null ? void 0 : t.left) ?? 0),
    y: r - ((t == null ? void 0 : t.top) ?? 0)
  };
}
const Xs = () => {
  var e;
  return typeof navigator < "u" && ((e = navigator == null ? void 0 : navigator.userAgent) == null ? void 0 : e.indexOf("Mac")) >= 0;
};
function Y2(e) {
  var t, n;
  return {
    width: ((t = e.dimensions) == null ? void 0 : t.width) ?? e.width ?? 0,
    height: ((n = e.dimensions) == null ? void 0 : n.height) ?? e.height ?? 0
  };
}
function gi(e, t = [1, 1]) {
  return {
    x: t[0] * Math.round(e.x / t[0]),
    y: t[1] * Math.round(e.y / t[1])
  };
}
function Sf() {
  return {
    handleDomNode: null,
    isValid: !1,
    connection: { source: "", target: "", sourceHandle: null, targetHandle: null },
    endHandle: null
  };
}
function Xi(e) {
  e == null || e.classList.remove("valid", "connecting", "vue-flow__handle-valid", "vue-flow__handle-connecting");
}
function Iu(e, t, n, o) {
  const s = [];
  for (const i of t[n] || [])
    if (`${e.id}-${i.id}-${n}` !== o) {
      const { x: r, y: l } = Ys(e, i);
      s.push({
        id: i.id || null,
        type: n,
        nodeId: e.id,
        x: r,
        y: l
      });
    }
  return s;
}
function X2(e, t, n, o, s, i) {
  const { x: r, y: l } = tn(e), c = t.elementsFromPoint(r, l).find((w) => w.classList.contains("vue-flow__handle"));
  if (c) {
    const w = c.getAttribute("data-nodeid");
    if (w) {
      const x = vl(void 0, c), I = c.getAttribute("data-handleid"), C = i({ nodeId: w, id: I, type: x });
      if (C) {
        const D = s.find((_) => _.nodeId === w && _.type === x && _.id === I);
        return {
          handle: {
            id: I,
            type: x,
            nodeId: w,
            x: (D == null ? void 0 : D.x) || n.x,
            y: (D == null ? void 0 : D.y) || n.y
          },
          validHandleResult: C
        };
      }
    }
  }
  let d = [], f = Number.POSITIVE_INFINITY;
  for (const w of s) {
    const x = Math.sqrt((w.x - n.x) ** 2 + (w.y - n.y) ** 2);
    if (x <= o) {
      const I = i(w);
      x <= f && (x < f ? d = [{ handle: w, validHandleResult: I }] : x === f && d.push({
        handle: w,
        validHandleResult: I
      }), f = x);
    }
  }
  if (!d.length)
    return { handle: null, validHandleResult: Sf() };
  if (d.length === 1)
    return d[0];
  const h = d.some(({ validHandleResult: w }) => w.isValid), v = d.some(({ handle: w }) => w.type === "target");
  return d.find(
    ({ handle: w, validHandleResult: x }) => v ? w.type === "target" : h ? x.isValid : !0
  ) || d[0];
}
function Nu(e, t, n, o, s, i, r, l, a, c, d) {
  const f = i === "target", h = l.querySelector(`.vue-flow__handle[data-id="${t == null ? void 0 : t.nodeId}-${t == null ? void 0 : t.id}-${t == null ? void 0 : t.type}"]`), { x: v, y: w } = tn(e), x = l.elementFromPoint(v, w), I = x != null && x.classList.contains("vue-flow__handle") ? x : h, C = Sf();
  if (I) {
    C.handleDomNode = I;
    const D = vl(void 0, I), _ = I.getAttribute("data-nodeid"), m = I.getAttribute("data-handleid"), z = I.classList.contains("connectable"), Y = I.classList.contains("connectableend"), q = {
      source: f ? _ : o,
      sourceHandle: f ? m : s,
      target: f ? o : _,
      targetHandle: f ? s : m
    };
    C.connection = q, z && Y && (n === Un.Strict ? f && D === "source" || !f && D === "target" : _ !== o || m !== s) && (C.isValid = r(q, {
      edges: a,
      nodes: c,
      sourceNode: d(q.source),
      targetNode: d(q.target)
    }), C.endHandle = {
      nodeId: _,
      handleId: m,
      type: D,
      position: C.isValid ? I.getAttribute("data-handlepos") : null
    });
  }
  return C;
}
function K2({ nodes: e, nodeId: t, handleId: n, handleType: o }) {
  const s = [];
  for (let i = 0; i < e.length; i++) {
    const r = e[i], { handleBounds: l } = r;
    let a = [], c = [];
    l && (a = Iu(r, l, "source", `${t}-${n}-${o}`), c = Iu(r, l, "target", `${t}-${n}-${o}`)), s.push(...a, ...c);
  }
  return s;
}
function vl(e, t) {
  return e || (t != null && t.classList.contains("target") ? "target" : t != null && t.classList.contains("source") ? "source" : null);
}
function W2(e, t) {
  let n = null;
  return t ? n = "valid" : e && !t && (n = "invalid"), n;
}
const Z2 = ["production", "prod"];
function mi(e, ...t) {
  $f() && console.warn(`[Vue Flow]: ${e}`, ...t);
}
function $f() {
  return !Z2.includes("production");
}
function Mu(e, t, n, o) {
  const s = t.querySelectorAll(`.vue-flow__handle${e}`);
  return Array.from(s).map((r) => {
    const l = r.getBoundingClientRect();
    return {
      id: r.getAttribute("data-handleid"),
      position: r.getAttribute("data-handlepos"),
      x: (l.left - n.left) / o,
      y: (l.top - n.top) / o,
      ...vi(r)
    };
  });
}
function Pr(e, t, n, o, s, i = !1, r) {
  s.value = !1, e.selected ? (i || e.selected && t) && (o([e]), ot(() => {
    r.blur();
  })) : n([e]);
}
function We(e) {
  return typeof H(e) < "u";
}
function J2(e, t, n, o) {
  if (!e || !e.source || !e.target)
    return n(new tt(Ze.EDGE_INVALID, (e == null ? void 0 : e.id) ?? "[ID UNKNOWN]")), !1;
  let s;
  return En(e) ? s = e : s = {
    ...e,
    id: gf(e)
  }, s = hf(s, void 0, o), V2(s, t) ? !1 : s;
}
function Q2(e, t, n, o, s) {
  if (!t.source || !t.target)
    return s(new tt(Ze.EDGE_INVALID, e.id)), !1;
  if (!n)
    return s(new tt(Ze.EDGE_NOT_FOUND, e.id)), !1;
  const { id: i, ...r } = e;
  return {
    ...r,
    id: o ? gf(t) : i,
    source: t.source,
    target: t.target,
    sourceHandle: t.sourceHandle,
    targetHandle: t.targetHandle
  };
}
function Tu(e, t, n) {
  const o = {}, s = [];
  for (let i = 0; i < e.length; ++i) {
    const r = e[i];
    if (!Ln(r)) {
      n(
        new tt(Ze.NODE_INVALID, r == null ? void 0 : r.id) || `[ID UNKNOWN|INDEX ${i}]`
      );
      continue;
    }
    const l = A2(r, t(r.id), r.parentNode);
    r.parentNode && (o[r.parentNode] = !0), s[i] = l;
  }
  for (const i of s) {
    const r = t(i.parentNode) || s.find((l) => l.id === i.parentNode);
    i.parentNode && !r && n(new tt(Ze.NODE_MISSING_PARENT, i.id, i.parentNode)), (i.parentNode || o[i.id]) && (o[i.id] && (i.isParent = !0), r && (r.isParent = !0));
  }
  return s;
}
function Ki(e, t) {
  e.clear();
  for (const n of t) {
    const { id: o, source: s, target: i, sourceHandle: r = null, targetHandle: l = null } = n, a = `${s}-source-${r}`, c = `${i}-target-${l}`, d = e.get(a) || /* @__PURE__ */ new Map(), f = e.get(c) || /* @__PURE__ */ new Map(), h = Dn({ edgeId: o, source: s, target: i, sourceHandle: r, targetHandle: l });
    e.set(a, d.set(`${i}-${l}`, h)), e.set(c, f.set(`${s}-${r}`, h));
  }
}
function Wi(e, t, n, o, s, i, r, l) {
  const a = [];
  for (const c of e) {
    const d = En(c) ? c : J2(c, l, s, i);
    if (!d)
      continue;
    const f = n(d.source), h = n(d.target);
    if (!f || !h) {
      s(new tt(Ze.EDGE_SOURCE_TARGET_MISSING, d.id, d.source, d.target));
      continue;
    }
    if (!f) {
      s(new tt(Ze.EDGE_SOURCE_MISSING, d.id, d.source));
      continue;
    }
    if (!h) {
      s(new tt(Ze.EDGE_TARGET_MISSING, d.id, d.target));
      continue;
    }
    if (t && !t(d, {
      edges: l,
      nodes: r,
      sourceNode: f,
      targetNode: h
    })) {
      s(new tt(Ze.EDGE_INVALID, d.id));
      continue;
    }
    const v = o(d.id);
    a.push({
      ...hf(d, v, i),
      sourceNode: f,
      targetNode: h
    });
  }
  return a;
}
const Ou = Symbol("vueFlow"), If = Symbol("nodeId"), Nf = Symbol("nodeRef"), eE = Symbol("edgeId"), tE = Symbol("edgeRef"), yi = Symbol("slots");
function Mf(e) {
  const {
    vueFlowRef: t,
    snapToGrid: n,
    snapGrid: o,
    noDragClassName: s,
    nodes: i,
    nodeExtent: r,
    nodeDragThreshold: l,
    viewport: a,
    autoPanOnNodeDrag: c,
    autoPanSpeed: d,
    nodesDraggable: f,
    panBy: h,
    findNode: v,
    multiSelectionActive: w,
    nodesSelectionActive: x,
    selectNodesOnDrag: I,
    removeSelectedElements: C,
    addSelectedNodes: D,
    updateNodePositions: _,
    emits: m
  } = je(), { onStart: z, onDrag: Y, onStop: q, onClick: j, el: P, disabled: L, id: X, selectable: U, dragHandle: K } = e, $ = ee(!1);
  let V = [], M, R = null, G = { x: void 0, y: void 0 }, oe = { x: 0, y: 0 }, ue = null, de = !1, re = 0, fe = !1;
  const ce = sE(), he = ({ x: J, y: p }) => {
    G = { x: J, y: p };
    let T = !1;
    if (V = V.map((y) => {
      const b = { x: J - y.distance.x, y: p - y.distance.y }, { computedPosition: k } = pl(
        y,
        n.value ? gi(b, o.value) : b,
        m.error,
        r.value,
        y.parentNode ? v(y.parentNode) : void 0
      );
      return T = T || y.position.x !== k.x || y.position.y !== k.y, y.position = k, y;
    }), !!T && (_(V, !0, !0), $.value = !0, ue)) {
      const [y, b] = Yi({
        id: X,
        dragItems: V,
        findNode: v
      });
      Y({ event: ue, node: y, nodes: b });
    }
  }, te = () => {
    if (!R)
      return;
    const [J, p] = Ef(oe, R, d.value);
    if (J !== 0 || p !== 0) {
      const T = {
        x: (G.x ?? 0) - J / a.value.zoom,
        y: (G.y ?? 0) - p / a.value.zoom
      };
      h({ x: J, y: p }) && he(T);
    }
    re = requestAnimationFrame(te);
  }, _e = (J, p) => {
    de = !0;
    const T = v(X);
    !I.value && !w.value && T && (T.selected || C()), T && Pe(U) && I.value && Pr(
      T,
      w.value,
      D,
      C,
      x,
      !1,
      p
    );
    const y = ce(J.sourceEvent);
    if (G = y, V = B2(i.value, f.value, y, v, X), V.length) {
      const [b, k] = Yi({
        id: X,
        dragItems: V,
        findNode: v
      });
      z({ event: J.sourceEvent, node: b, nodes: k });
    }
  }, xe = (J, p) => {
    var T;
    J.sourceEvent.type === "touchmove" && J.sourceEvent.touches.length > 1 || (l.value === 0 && _e(J, p), G = ce(J.sourceEvent), R = ((T = t.value) == null ? void 0 : T.getBoundingClientRect()) || null, oe = tn(J.sourceEvent, R));
  }, we = (J, p) => {
    const T = ce(J.sourceEvent);
    if (!fe && de && c.value && (fe = !0, te()), !de) {
      const y = T.xSnapped - (G.x ?? 0), b = T.ySnapped - (G.y ?? 0);
      Math.sqrt(y * y + b * b) > l.value && _e(J, p);
    }
    (G.x !== T.xSnapped || G.y !== T.ySnapped) && V.length && de && (ue = J.sourceEvent, oe = tn(J.sourceEvent, R), he(T));
  }, ke = (J) => {
    if (!Cf(J) && !de && !$.value && !w.value) {
      const p = J, T = ce(p), y = T.xSnapped - (G.x ?? 0), b = T.ySnapped - (G.y ?? 0), k = Math.sqrt(y * y + b * b);
      k !== 0 && k <= l.value && (j == null || j(p));
      return;
    }
    if ($.value = !1, fe = !1, de = !1, G = { x: void 0, y: void 0 }, cancelAnimationFrame(re), V.length) {
      _(V, !1, !1);
      const [p, T] = Yi({
        id: X,
        dragItems: V,
        findNode: v
      });
      q({ event: J.sourceEvent, node: p, nodes: T });
    }
  };
  return Ne([() => Pe(L), P], ([J, p], T, y) => {
    if (p) {
      const b = St(p);
      J || (M = Lw().on("start", (k) => xe(k, p)).on("drag", (k) => we(k, p)).on("end", (k) => ke(k)).filter((k) => {
        const E = k.target, B = Pe(K);
        return !k.button && (!s.value || !Cu(E, `.${s.value}`, p) && (!B || Cu(E, B, p)));
      }), b.call(M)), y(() => {
        b.on(".drag", null), M && (M.on("start", null), M.on("drag", null), M.on("end", null));
      });
    }
  }), $;
}
function nE() {
  return {
    doubleClick: pe(),
    click: pe(),
    mouseEnter: pe(),
    mouseMove: pe(),
    mouseLeave: pe(),
    contextMenu: pe(),
    updateStart: pe(),
    update: pe(),
    updateEnd: pe()
  };
}
function oE(e, t) {
  const n = nE();
  return n.doubleClick.on((o) => {
    var s, i;
    t.edgeDoubleClick(o), (i = (s = e.events) == null ? void 0 : s.doubleClick) == null || i.call(s, o);
  }), n.click.on((o) => {
    var s, i;
    t.edgeClick(o), (i = (s = e.events) == null ? void 0 : s.click) == null || i.call(s, o);
  }), n.mouseEnter.on((o) => {
    var s, i;
    t.edgeMouseEnter(o), (i = (s = e.events) == null ? void 0 : s.mouseEnter) == null || i.call(s, o);
  }), n.mouseMove.on((o) => {
    var s, i;
    t.edgeMouseMove(o), (i = (s = e.events) == null ? void 0 : s.mouseMove) == null || i.call(s, o);
  }), n.mouseLeave.on((o) => {
    var s, i;
    t.edgeMouseLeave(o), (i = (s = e.events) == null ? void 0 : s.mouseLeave) == null || i.call(s, o);
  }), n.contextMenu.on((o) => {
    var s, i;
    t.edgeContextMenu(o), (i = (s = e.events) == null ? void 0 : s.contextMenu) == null || i.call(s, o);
  }), n.updateStart.on((o) => {
    var s, i;
    t.edgeUpdateStart(o), (i = (s = e.events) == null ? void 0 : s.updateStart) == null || i.call(s, o);
  }), n.update.on((o) => {
    var s, i;
    t.edgeUpdate(o), (i = (s = e.events) == null ? void 0 : s.update) == null || i.call(s, o);
  }), n.updateEnd.on((o) => {
    var s, i;
    t.edgeUpdateEnd(o), (i = (s = e.events) == null ? void 0 : s.updateEnd) == null || i.call(s, o);
  }), Object.entries(n).reduce(
    (o, [s, i]) => (o.emit[s] = i.trigger, o.on[s] = i.on, o),
    { emit: {}, on: {} }
  );
}
function sE() {
  const { viewport: e, snapGrid: t, snapToGrid: n } = je();
  return (o) => {
    const s = Cf(o) ? o.sourceEvent : o, { x: i, y: r } = tn(s), l = Ko({ x: i, y: r }, e.value), { x: a, y: c } = n.value ? gi(l, t.value) : l;
    return {
      xSnapped: a,
      ySnapped: c,
      ...l
    };
  };
}
function ys() {
  return !0;
}
function Tf({
  handleId: e,
  nodeId: t,
  type: n,
  isValidConnection: o,
  edgeUpdaterType: s,
  onEdgeUpdate: i,
  onEdgeUpdateEnd: r
}) {
  const {
    vueFlowRef: l,
    connectionMode: a,
    connectionRadius: c,
    connectOnClick: d,
    connectionClickStartHandle: f,
    nodesConnectable: h,
    autoPanOnConnect: v,
    autoPanSpeed: w,
    findNode: x,
    panBy: I,
    startConnection: C,
    updateConnection: D,
    endConnection: _,
    emits: m,
    viewport: z,
    edges: Y,
    nodes: q,
    isValidConnection: j
  } = je();
  let P = null, L = !1, X = null, U = null;
  function K(V) {
    var M;
    const R = Pe(n) === "target", G = hl(V), oe = yu(V.target);
    if (G && V.button === 0 || !G) {
      let ue = function(k) {
        p = tn(k, ke);
        const { handle: E, validHandleResult: B } = X2(
          k,
          oe,
          Ko(p, z.value, !1, [1, 1]),
          c.value,
          y,
          (W) => Nu(
            k,
            W,
            a.value,
            Pe(t),
            Pe(e),
            R ? "target" : "source",
            fe,
            oe,
            Y.value,
            q.value,
            x
          )
        );
        if (ce = E, T || (b(), T = !0), P = B.connection, L = B.isValid, X = B.handleDomNode, !(L && ce && (U != null && U.endHandle) && B.endHandle && U.endHandle.type === B.endHandle.type && U.endHandle.nodeId === B.endHandle.nodeId && U.endHandle.handleId === B.endHandle.handleId)) {
          if (D(
            ce && L ? mf(
              {
                x: ce.x,
                y: ce.y
              },
              z.value
            ) : p,
            B.endHandle,
            W2(!!ce, L)
          ), U = B, !ce && !L && !X)
            return Xi(J);
          P && P.source !== P.target && X && (Xi(J), J = X, X.classList.add("connecting", "vue-flow__handle-connecting"), X.classList.toggle("valid", L), X.classList.toggle("vue-flow__handle-valid", L));
        }
      }, de = function(k) {
        (ce || X) && P && L && (i ? i(k, P) : m.connect(P)), m.connectEnd(k), s && (r == null || r(k)), Xi(J), cancelAnimationFrame(he), _(k), T = !1, L = !1, P = null, X = null, oe.removeEventListener("mousemove", ue), oe.removeEventListener("mouseup", de), oe.removeEventListener("touchmove", ue), oe.removeEventListener("touchend", de);
      };
      const re = x(Pe(t));
      let fe = Pe(o) || j.value || ys;
      !fe && re && (fe = (R ? re.isValidSourcePos : re.isValidTargetPos) || ys);
      let ce, he = 0;
      const { x: te, y: _e } = tn(V), xe = oe == null ? void 0 : oe.elementFromPoint(te, _e), we = vl(Pe(s), xe), ke = (M = l.value) == null ? void 0 : M.getBoundingClientRect();
      if (!ke || !we)
        return;
      let J, p = tn(V, ke), T = !1;
      const y = K2({
        nodes: q.value,
        nodeId: Pe(t),
        handleId: Pe(e),
        handleType: we
      }), b = () => {
        if (!v.value)
          return;
        const [k, E] = Ef(p, ke, w.value);
        I({ x: k, y: E }), he = requestAnimationFrame(b);
      };
      C(
        {
          nodeId: Pe(t),
          handleId: Pe(e),
          type: we,
          position: (xe == null ? void 0 : xe.getAttribute("data-handlepos")) || be.Top
        },
        {
          x: te - ke.left,
          y: _e - ke.top
        }
      ), m.connectStart({ event: V, nodeId: Pe(t), handleId: Pe(e), handleType: we }), oe.addEventListener("mousemove", ue), oe.addEventListener("mouseup", de), oe.addEventListener("touchmove", ue), oe.addEventListener("touchend", de);
    }
  }
  function $(V) {
    if (!d.value)
      return;
    const M = Pe(n) === "target";
    if (!f.value)
      m.clickConnectStart({ event: V, nodeId: Pe(t), handleId: Pe(e) }), C({ nodeId: Pe(t), type: Pe(n), handleId: Pe(e) }, void 0, !0);
    else {
      let R = Pe(o) || j.value || ys;
      const G = x(Pe(t));
      if (!R && G && (R = (M ? G.isValidSourcePos : G.isValidTargetPos) || ys), G && (typeof G.connectable > "u" ? h.value : G.connectable) === !1)
        return;
      const oe = yu(V.target), { connection: ue, isValid: de } = Nu(
        V,
        {
          nodeId: Pe(t),
          id: Pe(e),
          type: Pe(n)
        },
        a.value,
        f.value.nodeId,
        f.value.handleId || null,
        f.value.type,
        R,
        oe,
        Y.value,
        q.value,
        x
      ), re = ue.source === ue.target;
      de && !re && m.connect(ue), m.clickConnectEnd(V), _(V, !0);
    }
  }
  return {
    handlePointerDown: K,
    handleClick: $
  };
}
function iE() {
  return Lt(If, "");
}
function Of(e) {
  const t = e ?? iE() ?? "", n = Lt(Nf, ee(null)), { findNode: o, edges: s, emits: i } = je(), r = o(t);
  return r || i.error(new tt(Ze.NODE_NOT_FOUND, t)), {
    id: t,
    nodeEl: n,
    node: r,
    parentNode: ae(() => o(r.parentNode)),
    connectedEdges: ae(() => wf([r], s.value))
  };
}
function rE() {
  return {
    doubleClick: pe(),
    click: pe(),
    mouseEnter: pe(),
    mouseMove: pe(),
    mouseLeave: pe(),
    contextMenu: pe(),
    dragStart: pe(),
    drag: pe(),
    dragStop: pe()
  };
}
function lE(e, t) {
  const n = rE();
  return n.doubleClick.on((o) => {
    var s, i;
    t.nodeDoubleClick(o), (i = (s = e.events) == null ? void 0 : s.doubleClick) == null || i.call(s, o);
  }), n.click.on((o) => {
    var s, i;
    t.nodeClick(o), (i = (s = e.events) == null ? void 0 : s.click) == null || i.call(s, o);
  }), n.mouseEnter.on((o) => {
    var s, i;
    t.nodeMouseEnter(o), (i = (s = e.events) == null ? void 0 : s.mouseEnter) == null || i.call(s, o);
  }), n.mouseMove.on((o) => {
    var s, i;
    t.nodeMouseMove(o), (i = (s = e.events) == null ? void 0 : s.mouseMove) == null || i.call(s, o);
  }), n.mouseLeave.on((o) => {
    var s, i;
    t.nodeMouseLeave(o), (i = (s = e.events) == null ? void 0 : s.mouseLeave) == null || i.call(s, o);
  }), n.contextMenu.on((o) => {
    var s, i;
    t.nodeContextMenu(o), (i = (s = e.events) == null ? void 0 : s.contextMenu) == null || i.call(s, o);
  }), n.dragStart.on((o) => {
    var s, i;
    t.nodeDragStart(o), (i = (s = e.events) == null ? void 0 : s.dragStart) == null || i.call(s, o);
  }), n.drag.on((o) => {
    var s, i;
    t.nodeDrag(o), (i = (s = e.events) == null ? void 0 : s.drag) == null || i.call(s, o);
  }), n.dragStop.on((o) => {
    var s, i;
    t.nodeDragStop(o), (i = (s = e.events) == null ? void 0 : s.dragStop) == null || i.call(s, o);
  }), Object.entries(n).reduce(
    (o, [s, i]) => (o.emit[s] = i.trigger, o.on[s] = i.on, o),
    { emit: {}, on: {} }
  );
}
function Pf() {
  const { getSelectedNodes: e, nodeExtent: t, updateNodePositions: n, findNode: o, snapGrid: s, snapToGrid: i, nodesDraggable: r, emits: l } = je();
  return (a, c = !1) => {
    const d = i.value ? s.value[0] : 5, f = i.value ? s.value[1] : 5, h = c ? 4 : 1, v = a.x * d * h, w = a.y * f * h, x = [];
    for (const I of e.value)
      if (I.draggable || r && typeof I.draggable > "u") {
        const C = { x: I.computedPosition.x + v, y: I.computedPosition.y + w }, { computedPosition: D } = pl(
          I,
          C,
          l.error,
          t.value,
          I.parentNode ? o(I.parentNode) : void 0
        );
        x.push({
          id: I.id,
          position: D,
          from: I.position,
          distance: { x: a.x, y: a.y },
          dimensions: I.dimensions
        });
      }
    n(x, !0, !1);
  };
}
const Zi = 0.1;
function ln() {
  return mi("Viewport not initialized yet."), Promise.resolve(!1);
}
const aE = {
  zoomIn: ln,
  zoomOut: ln,
  zoomTo: ln,
  fitView: ln,
  setCenter: ln,
  fitBounds: ln,
  project: (e) => e,
  screenToFlowCoordinate: (e) => e,
  flowToScreenCoordinate: (e) => e,
  setViewport: ln,
  setTransform: ln,
  getViewport: () => ({ x: 0, y: 0, zoom: 1 }),
  getTransform: () => ({ x: 0, y: 0, zoom: 1 }),
  viewportInitialized: !1
};
function uE(e) {
  function t(o, s) {
    return new Promise((i) => {
      e.d3Selection && e.d3Zoom ? e.d3Zoom.scaleBy(
        Ji(e.d3Selection, s, () => {
          i(!0);
        }),
        o
      ) : i(!1);
    });
  }
  function n(o, s, i, r) {
    return new Promise((l) => {
      const { x: a, y: c } = pf({ x: -o, y: -s }, e.translateExtent), d = co.translate(-a, -c).scale(i);
      e.d3Selection && e.d3Zoom ? e.d3Zoom.transform(
        Ji(e.d3Selection, r, () => {
          l(!0);
        }),
        d
      ) : l(!1);
    });
  }
  return ae(() => e.d3Zoom && e.d3Selection && e.dimensions.width && e.dimensions.height ? {
    viewportInitialized: !0,
    // todo: allow passing scale as option
    zoomIn: (s) => t(1.2, s == null ? void 0 : s.duration),
    zoomOut: (s) => t(1 / 1.2, s == null ? void 0 : s.duration),
    zoomTo: (s, i) => new Promise((r) => {
      e.d3Selection && e.d3Zoom ? e.d3Zoom.scaleTo(
        Ji(e.d3Selection, i == null ? void 0 : i.duration, () => {
          r(!0);
        }),
        s
      ) : r(!1);
    }),
    setViewport: (s, i) => n(s.x, s.y, s.zoom, i == null ? void 0 : i.duration),
    setTransform: (s, i) => n(s.x, s.y, s.zoom, i == null ? void 0 : i.duration),
    getViewport: () => ({
      x: e.viewport.x,
      y: e.viewport.y,
      zoom: e.viewport.zoom
    }),
    getTransform: () => ({
      x: e.viewport.x,
      y: e.viewport.y,
      zoom: e.viewport.zoom
    }),
    fitView: (s = {
      padding: Zi,
      includeHiddenNodes: !1,
      duration: 0
    }) => {
      var i, r;
      const l = [];
      for (const h of e.nodes)
        h.dimensions.width && h.dimensions.height && ((s == null ? void 0 : s.includeHiddenNodes) || !h.hidden) && (!((i = s.nodes) != null && i.length) || (r = s.nodes) != null && r.length && s.nodes.includes(h.id)) && l.push(h);
      if (!l.length)
        return Promise.resolve(!1);
      const a = bf(l), { x: c, y: d, zoom: f } = bu(
        a,
        e.dimensions.width,
        e.dimensions.height,
        s.minZoom ?? e.minZoom,
        s.maxZoom ?? e.maxZoom,
        s.padding ?? Zi,
        s.offset
      );
      return n(c, d, f, s == null ? void 0 : s.duration);
    },
    setCenter: (s, i, r) => {
      const l = typeof (r == null ? void 0 : r.zoom) < "u" ? r.zoom : e.maxZoom, a = e.dimensions.width / 2 - s * l, c = e.dimensions.height / 2 - i * l;
      return n(a, c, l, r == null ? void 0 : r.duration);
    },
    fitBounds: (s, i = { padding: Zi }) => {
      const { x: r, y: l, zoom: a } = bu(
        s,
        e.dimensions.width,
        e.dimensions.height,
        e.minZoom,
        e.maxZoom,
        i.padding
      );
      return n(r, l, a, i == null ? void 0 : i.duration);
    },
    project: (s) => Ko(s, e.viewport, e.snapToGrid, e.snapGrid),
    screenToFlowCoordinate: (s) => {
      if (e.vueFlowRef) {
        const { x: i, y: r } = e.vueFlowRef.getBoundingClientRect(), l = {
          x: s.x - i,
          y: s.y - r
        };
        return Ko(l, e.viewport, e.snapToGrid, e.snapGrid);
      }
      return { x: 0, y: 0 };
    },
    flowToScreenCoordinate: (s) => {
      if (e.vueFlowRef) {
        const { x: i, y: r } = e.vueFlowRef.getBoundingClientRect(), l = {
          x: s.x + i,
          y: s.y + r
        };
        return mf(l, e.viewport);
      }
      return { x: 0, y: 0 };
    }
  } : aE);
}
function Ji(e, t = 0, n) {
  return e.transition().duration(t).on("end", n);
}
function cE(e, t, n) {
  const o = Yu(!0);
  return o.run(() => {
    const s = () => {
      o.run(() => {
        let x, I, C = !!(n.nodes.value.length || n.edges.value.length);
        x = Yn([e.modelValue, () => {
          var D, _;
          return (_ = (D = e.modelValue) == null ? void 0 : D.value) == null ? void 0 : _.length;
        }], ([D]) => {
          D && Array.isArray(D) && (I == null || I.pause(), n.setElements(D), !I && !C && D.length ? C = !0 : I == null || I.resume());
        }), I = Yn(
          [n.nodes, n.edges, () => n.edges.value.length, () => n.nodes.value.length],
          ([D, _]) => {
            var m;
            (m = e.modelValue) != null && m.value && Array.isArray(e.modelValue.value) && (x == null || x.pause(), e.modelValue.value = [...D, ..._], ot(() => {
              x == null || x.resume();
            }));
          },
          { immediate: C }
        ), ks(() => {
          x == null || x.stop(), I == null || I.stop();
        });
      });
    }, i = () => {
      o.run(() => {
        let x, I, C = !!n.nodes.value.length;
        x = Yn([e.nodes, () => {
          var D, _;
          return (_ = (D = e.nodes) == null ? void 0 : D.value) == null ? void 0 : _.length;
        }], ([D]) => {
          D && Array.isArray(D) && (I == null || I.pause(), n.setNodes(D), !I && !C && D.length ? C = !0 : I == null || I.resume());
        }), I = Yn(
          [n.nodes, () => n.nodes.value.length],
          ([D]) => {
            var _;
            (_ = e.nodes) != null && _.value && Array.isArray(e.nodes.value) && (x == null || x.pause(), e.nodes.value = [...D], ot(() => {
              x == null || x.resume();
            }));
          },
          { immediate: C }
        ), ks(() => {
          x == null || x.stop(), I == null || I.stop();
        });
      });
    }, r = () => {
      o.run(() => {
        let x, I, C = !!n.edges.value.length;
        x = Yn([e.edges, () => {
          var D, _;
          return (_ = (D = e.edges) == null ? void 0 : D.value) == null ? void 0 : _.length;
        }], ([D]) => {
          D && Array.isArray(D) && (I == null || I.pause(), n.setEdges(D), !I && !C && D.length ? C = !0 : I == null || I.resume());
        }), I = Yn(
          [n.edges, () => n.edges.value.length],
          ([D]) => {
            var _;
            (_ = e.edges) != null && _.value && Array.isArray(e.edges.value) && (x == null || x.pause(), e.edges.value = [...D], ot(() => {
              x == null || x.resume();
            }));
          },
          { immediate: C }
        ), ks(() => {
          x == null || x.stop(), I == null || I.stop();
        });
      });
    }, l = () => {
      o.run(() => {
        Ne(
          () => t.maxZoom,
          () => {
            t.maxZoom && We(t.maxZoom) && n.setMaxZoom(t.maxZoom);
          },
          {
            immediate: !0
          }
        );
      });
    }, a = () => {
      o.run(() => {
        Ne(
          () => t.minZoom,
          () => {
            t.minZoom && We(t.minZoom) && n.setMinZoom(t.minZoom);
          },
          { immediate: !0 }
        );
      });
    }, c = () => {
      o.run(() => {
        Ne(
          () => t.translateExtent,
          () => {
            t.translateExtent && We(t.translateExtent) && n.setTranslateExtent(t.translateExtent);
          },
          {
            immediate: !0
          }
        );
      });
    }, d = () => {
      o.run(() => {
        Ne(
          () => t.nodeExtent,
          () => {
            t.nodeExtent && We(t.nodeExtent) && n.setNodeExtent(t.nodeExtent);
          },
          {
            immediate: !0
          }
        );
      });
    }, f = () => {
      o.run(() => {
        Ne(
          () => t.applyDefault,
          () => {
            We(t.applyDefault) && (n.applyDefault.value = t.applyDefault);
          },
          {
            immediate: !0
          }
        );
      });
    }, h = () => {
      o.run(() => {
        const x = async (I) => {
          let C = I;
          typeof t.autoConnect == "function" && (C = await t.autoConnect(I)), C !== !1 && n.addEdges([C]);
        };
        Ne(
          () => t.autoConnect,
          () => {
            We(t.autoConnect) && (n.autoConnect.value = t.autoConnect);
          },
          { immediate: !0 }
        ), Ne(
          n.autoConnect,
          (I, C, D) => {
            I ? n.onConnect(x) : n.hooks.value.connect.off(x), D(() => {
              n.hooks.value.connect.off(x);
            });
          },
          { immediate: !0 }
        );
      });
    }, v = () => {
      const x = [
        "id",
        "modelValue",
        "translateExtent",
        "nodeExtent",
        "edges",
        "nodes",
        "maxZoom",
        "minZoom",
        "applyDefault",
        "autoConnect"
      ];
      for (const I of Object.keys(t)) {
        const C = I;
        if (!x.includes(C)) {
          const D = He(() => t[C]), _ = n[C];
          Ke(_) && o.run(() => {
            Ne(
              D,
              (m) => {
                We(m) && (_.value = m);
              },
              { immediate: !0 }
            );
          });
        }
      }
    };
    (() => {
      s(), i(), r(), a(), l(), c(), d(), f(), h(), v();
    })();
  }), () => o.stop();
}
function dE() {
  return {
    edgesChange: pe(),
    nodesChange: pe(),
    nodeDoubleClick: pe(),
    nodeClick: pe(),
    nodeMouseEnter: pe(),
    nodeMouseMove: pe(),
    nodeMouseLeave: pe(),
    nodeContextMenu: pe(),
    nodeDragStart: pe(),
    nodeDrag: pe(),
    nodeDragStop: pe(),
    nodesInitialized: pe(),
    miniMapNodeClick: pe(),
    miniMapNodeDoubleClick: pe(),
    miniMapNodeMouseEnter: pe(),
    miniMapNodeMouseMove: pe(),
    miniMapNodeMouseLeave: pe(),
    connect: pe(),
    connectStart: pe(),
    connectEnd: pe(),
    clickConnectStart: pe(),
    clickConnectEnd: pe(),
    paneReady: pe(),
    init: pe(),
    move: pe(),
    moveStart: pe(),
    moveEnd: pe(),
    selectionDragStart: pe(),
    selectionDrag: pe(),
    selectionDragStop: pe(),
    selectionContextMenu: pe(),
    selectionStart: pe(),
    selectionEnd: pe(),
    viewportChangeStart: pe(),
    viewportChange: pe(),
    viewportChangeEnd: pe(),
    paneScroll: pe(),
    paneClick: pe(),
    paneContextMenu: pe(),
    paneMouseEnter: pe(),
    paneMouseMove: pe(),
    paneMouseLeave: pe(),
    edgeContextMenu: pe(),
    edgeMouseEnter: pe(),
    edgeMouseMove: pe(),
    edgeMouseLeave: pe(),
    edgeDoubleClick: pe(),
    edgeClick: pe(),
    edgeUpdateStart: pe(),
    edgeUpdate: pe(),
    edgeUpdateEnd: pe(),
    updateNodeInternals: pe(),
    error: pe((e) => mi(e.message))
  };
}
function fE(e, t) {
  wc(() => {
    for (const [n, o] of Object.entries(t.value)) {
      const s = (i) => {
        e(n, i);
      };
      o.fns.add(s), ci(() => {
        o.off(s);
      });
    }
  });
}
function Af() {
  return {
    vueFlowRef: null,
    viewportRef: null,
    nodes: [],
    edges: [],
    connectionLookup: /* @__PURE__ */ new Map(),
    nodeTypes: {},
    edgeTypes: {},
    initialized: !1,
    dimensions: {
      width: 0,
      height: 0
    },
    viewport: { x: 0, y: 0, zoom: 1 },
    d3Zoom: null,
    d3Selection: null,
    d3ZoomHandler: null,
    minZoom: 0.5,
    maxZoom: 2,
    translateExtent: [
      [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
    ],
    nodeExtent: [
      [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
      [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
    ],
    selectionMode: fl.Full,
    paneDragging: !1,
    preventScrolling: !0,
    zoomOnScroll: !0,
    zoomOnPinch: !0,
    zoomOnDoubleClick: !0,
    panOnScroll: !1,
    panOnScrollSpeed: 0.5,
    panOnScrollMode: Do.Free,
    paneClickDistance: 0,
    panOnDrag: !0,
    edgeUpdaterRadius: 10,
    onlyRenderVisibleElements: !1,
    defaultViewport: { x: 0, y: 0, zoom: 1 },
    nodesSelectionActive: !1,
    userSelectionActive: !1,
    userSelectionRect: null,
    defaultMarkerColor: "#b1b1b7",
    connectionLineStyle: {},
    connectionLineType: null,
    connectionLineOptions: {
      type: Tn.Bezier,
      style: {}
    },
    connectionMode: Un.Loose,
    connectionStartHandle: null,
    connectionEndHandle: null,
    connectionClickStartHandle: null,
    connectionPosition: { x: Number.NaN, y: Number.NaN },
    connectionRadius: 20,
    connectOnClick: !0,
    connectionStatus: null,
    isValidConnection: null,
    snapGrid: [15, 15],
    snapToGrid: !1,
    edgesUpdatable: !1,
    edgesFocusable: !0,
    nodesFocusable: !0,
    nodesConnectable: !0,
    nodesDraggable: !0,
    nodeDragThreshold: 1,
    elementsSelectable: !0,
    selectNodesOnDrag: !0,
    multiSelectionActive: !1,
    selectionKeyCode: "Shift",
    multiSelectionKeyCode: Xs() ? "Meta" : "Control",
    zoomActivationKeyCode: Xs() ? "Meta" : "Control",
    deleteKeyCode: "Backspace",
    panActivationKeyCode: "Space",
    hooks: dE(),
    applyDefault: !0,
    autoConnect: !1,
    fitViewOnInit: !1,
    fitViewOnInitDone: !1,
    noDragClassName: "nodrag",
    noWheelClassName: "nowheel",
    noPanClassName: "nopan",
    defaultEdgeOptions: void 0,
    elevateEdgesOnSelect: !1,
    elevateNodesOnSelect: !0,
    autoPanOnNodeDrag: !0,
    autoPanOnConnect: !0,
    autoPanSpeed: 15,
    disableKeyboardA11y: !1,
    ariaLiveMessage: ""
  };
}
const pE = [
  "id",
  "vueFlowRef",
  "viewportRef",
  "initialized",
  "modelValue",
  "nodes",
  "edges",
  "maxZoom",
  "minZoom",
  "translateExtent",
  "hooks",
  "defaultEdgeOptions"
];
function hE(e, t, n) {
  const o = uE(e), s = (y) => {
    const b = y ?? [];
    e.hooks.updateNodeInternals.trigger(b);
  }, i = (y) => R2(y, e.nodes, e.edges), r = (y) => D2(y, e.nodes, e.edges), l = (y) => wf(y, e.edges), a = ({ id: y, type: b, nodeId: k }) => {
    var E;
    return Array.from(((E = e.connectionLookup.get(`${k}-${b}-${y ?? null}`)) == null ? void 0 : E.values()) ?? []);
  }, c = (y) => {
    if (y)
      return t.value.get(y);
  }, d = (y) => {
    if (y)
      return n.value.get(y);
  }, f = (y, b, k) => {
    var E, B;
    const W = [];
    for (const Q of y) {
      const A = {
        id: Q.id,
        type: "position",
        dragging: k,
        from: Q.from
      };
      if (b && (A.position = Q.position, Q.parentNode)) {
        const N = c(Q.parentNode);
        A.position = {
          x: A.position.x - (((E = N == null ? void 0 : N.computedPosition) == null ? void 0 : E.x) ?? 0),
          y: A.position.y - (((B = N == null ? void 0 : N.computedPosition) == null ? void 0 : B.y) ?? 0)
        };
      }
      W.push(A);
    }
    W != null && W.length && e.hooks.nodesChange.trigger(W);
  }, h = (y) => {
    if (!e.vueFlowRef)
      return;
    const b = e.vueFlowRef.querySelector(".vue-flow__transformationpane");
    if (!b)
      return;
    const k = window.getComputedStyle(b), { m22: E } = new window.DOMMatrixReadOnly(k.transform), B = [];
    for (let W = 0; W < y.length; ++W) {
      const Q = y[W], A = c(Q.id);
      if (A) {
        const N = vi(Q.nodeElement);
        if (!!(N.width && N.height && (A.dimensions.width !== N.width || A.dimensions.height !== N.height || Q.forceUpdate))) {
          const Z = Q.nodeElement.getBoundingClientRect();
          A.dimensions = N, A.handleBounds.source = Mu(".source", Q.nodeElement, Z, E), A.handleBounds.target = Mu(".target", Q.nodeElement, Z, E), B.push({
            id: A.id,
            type: "dimensions",
            dimensions: N
          });
        }
      }
    }
    !e.fitViewOnInitDone && e.fitViewOnInit && o.value.fitView().then(() => {
      e.fitViewOnInitDone = !0;
    }), B.length && e.hooks.nodesChange.trigger(B);
  }, v = (y, b) => {
    const k = /* @__PURE__ */ new Set(), E = /* @__PURE__ */ new Set();
    for (const Q of y)
      Ln(Q) ? k.add(Q.id) : En(Q) && E.add(Q.id);
    const B = fn(t.value, k, !0), W = fn(n.value, E);
    if (e.multiSelectionActive) {
      for (const Q of k)
        B.push(an(Q, b));
      for (const Q of E)
        W.push(an(Q, b));
    }
    B.length && e.hooks.nodesChange.trigger(B), W.length && e.hooks.edgesChange.trigger(W);
  }, w = (y) => {
    if (e.multiSelectionActive) {
      const b = y.map((k) => an(k.id, !0));
      e.hooks.nodesChange.trigger(b);
      return;
    }
    e.hooks.nodesChange.trigger(fn(t.value, new Set(y.map((b) => b.id)), !0)), e.hooks.edgesChange.trigger(fn(n.value));
  }, x = (y) => {
    if (e.multiSelectionActive) {
      const b = y.map((k) => an(k.id, !0));
      e.hooks.edgesChange.trigger(b);
      return;
    }
    e.hooks.edgesChange.trigger(fn(n.value, new Set(y.map((b) => b.id)))), e.hooks.nodesChange.trigger(fn(t.value, /* @__PURE__ */ new Set(), !0));
  }, I = (y) => {
    v(y, !0);
  }, C = (y) => {
    const k = (y || e.nodes).map((E) => (E.selected = !1, an(E.id, !1)));
    e.hooks.nodesChange.trigger(k);
  }, D = (y) => {
    const k = (y || e.edges).map((E) => (E.selected = !1, an(E.id, !1)));
    e.hooks.edgesChange.trigger(k);
  }, _ = (y) => {
    if (!y || !y.length)
      return v([], !1);
    const b = y.reduce(
      (k, E) => {
        const B = an(E.id, !1);
        return Ln(E) ? k.nodes.push(B) : k.edges.push(B), k;
      },
      { nodes: [], edges: [] }
    );
    b.nodes.length && e.hooks.nodesChange.trigger(b.nodes), b.edges.length && e.hooks.edgesChange.trigger(b.edges);
  }, m = (y) => {
    var b;
    (b = e.d3Zoom) == null || b.scaleExtent([y, e.maxZoom]), e.minZoom = y;
  }, z = (y) => {
    var b;
    (b = e.d3Zoom) == null || b.scaleExtent([e.minZoom, y]), e.maxZoom = y;
  }, Y = (y) => {
    var b;
    (b = e.d3Zoom) == null || b.translateExtent(y), e.translateExtent = y;
  }, q = (y) => {
    e.nodeExtent = y, s();
  }, j = (y) => {
    var b;
    (b = e.d3Zoom) == null || b.clickDistance(y);
  }, P = (y) => {
    e.nodesDraggable = y, e.nodesConnectable = y, e.elementsSelectable = y;
  }, L = (y) => {
    const b = y instanceof Function ? y(e.nodes) : y;
    !e.initialized && !b.length || (e.nodes = Tu(b, c, e.hooks.error.trigger));
  }, X = (y) => {
    const b = y instanceof Function ? y(e.edges) : y;
    if (!e.initialized && !b.length)
      return;
    const k = Wi(
      b,
      e.isValidConnection,
      c,
      d,
      e.hooks.error.trigger,
      e.defaultEdgeOptions,
      e.nodes,
      e.edges
    );
    Ki(e.connectionLookup, k), e.edges = k;
  }, U = (y) => {
    const b = y instanceof Function ? y([...e.nodes, ...e.edges]) : y;
    !e.initialized && !b.length || (L(b.filter(Ln)), X(b.filter(En)));
  }, K = (y) => {
    let b = y instanceof Function ? y(e.nodes) : y;
    b = Array.isArray(b) ? b : [b];
    const k = Tu(b, c, e.hooks.error.trigger), E = [];
    for (const B of k)
      E.push(ku(B));
    E.length && e.hooks.nodesChange.trigger(E);
  }, $ = (y) => {
    let b = y instanceof Function ? y(e.edges) : y;
    b = Array.isArray(b) ? b : [b];
    const k = Wi(
      b,
      e.isValidConnection,
      c,
      d,
      e.hooks.error.trigger,
      e.defaultEdgeOptions,
      e.nodes,
      e.edges
    ), E = [];
    for (const B of k)
      E.push(ku(B));
    E.length && e.hooks.edgesChange.trigger(E);
  }, V = (y, b = !0, k = !1) => {
    const E = y instanceof Function ? y(e.nodes) : y, B = Array.isArray(E) ? E : [E], W = [], Q = [];
    function A(g) {
      const Z = l(g);
      for (const ie of Z)
        (!We(ie.deletable) || ie.deletable) && Q.push(xu(ie.id, ie.source, ie.target, ie.sourceHandle, ie.targetHandle));
    }
    function N(g) {
      const Z = [];
      for (const ie of e.nodes)
        ie.parentNode === g && Z.push(ie);
      if (Z.length) {
        for (const ie of Z)
          W.push(Eu(ie.id));
        b && A(Z);
        for (const ie of Z)
          N(ie.id);
      }
    }
    for (const g of B) {
      const Z = typeof g == "string" ? c(g) : g;
      Z && (We(Z.deletable) && !Z.deletable || (W.push(Eu(Z.id)), b && A([Z]), k && N(Z.id)));
    }
    Q.length && e.hooks.edgesChange.trigger(Q), W.length && e.hooks.nodesChange.trigger(W);
  }, M = (y) => {
    const b = y instanceof Function ? y(e.edges) : y, k = Array.isArray(b) ? b : [b], E = [];
    for (const B of k) {
      const W = typeof B == "string" ? d(B) : B;
      W && (We(W.deletable) && !W.deletable || E.push(
        xu(
          typeof B == "string" ? B : B.id,
          W.source,
          W.target,
          W.sourceHandle,
          W.targetHandle
        )
      ));
    }
    e.hooks.edgesChange.trigger(E);
  }, R = (y, b, k = !0) => {
    const E = d(y.id), B = Q2(y, b, E, k, e.hooks.error.trigger);
    if (B) {
      const [W] = Wi(
        [B],
        e.isValidConnection,
        c,
        d,
        e.hooks.error.trigger,
        e.defaultEdgeOptions,
        e.nodes,
        e.edges
      );
      return e.edges.splice(e.edges.indexOf(E), 1, W), Ki(e.connectionLookup, [W]), W;
    }
    return !1;
  }, G = (y, b, k = { replace: !1 }) => {
    const E = d(y);
    if (!E)
      return;
    const B = typeof b == "function" ? b(E) : b;
    E.data = k.replace ? B : { ...E.data, ...B };
  }, oe = (y) => wu(y, e.nodes), ue = (y) => {
    const b = wu(y, e.edges);
    return Ki(e.connectionLookup, b), b;
  }, de = (y, b, k = { replace: !1 }) => {
    const E = c(y);
    if (!E)
      return;
    const B = typeof b == "function" ? b(E) : b;
    k.replace ? e.nodes.splice(e.nodes.indexOf(E), 1, B) : Object.assign(E, B);
  }, re = (y, b, k = { replace: !1 }) => {
    const E = c(y);
    if (!E)
      return;
    const B = typeof b == "function" ? b(E) : b;
    E.data = k.replace ? B : { ...E.data, ...B };
  }, fe = (y, b, k = !1) => {
    k ? e.connectionClickStartHandle = y : e.connectionStartHandle = y, e.connectionEndHandle = null, e.connectionStatus = null, b && (e.connectionPosition = b);
  }, ce = (y, b = null, k = null) => {
    e.connectionStartHandle && (e.connectionPosition = y, e.connectionEndHandle = b, e.connectionStatus = k);
  }, he = (y, b) => {
    e.connectionPosition = { x: Number.NaN, y: Number.NaN }, e.connectionEndHandle = null, e.connectionStatus = null, b ? e.connectionClickStartHandle = null : e.connectionStartHandle = null;
  }, te = (y) => {
    const b = P2(y), k = b ? null : $o(y) ? y : c(y.id);
    return !b && !k ? [null, null, b] : [b ? y : Tr(k), k, b];
  }, _e = (y, b = !0, k = e.nodes) => {
    const [E, B, W] = te(y);
    if (!E)
      return [];
    const Q = [];
    for (const A of k || e.nodes) {
      if (!W && (A.id === B.id || !A.computedPosition))
        continue;
      const N = Tr(A), g = Or(N, E);
      (b && g > 0 || g >= Number(E.width) * Number(E.height)) && Q.push(A);
    }
    return Q;
  }, xe = (y, b, k = !0) => {
    const [E] = te(y);
    if (!E)
      return !1;
    const B = Or(E, b);
    return k && B > 0 || B >= Number(E.width) * Number(E.height);
  }, we = (y) => {
    const { viewport: b, dimensions: k, d3Zoom: E, d3Selection: B, translateExtent: W } = e;
    if (!E || !B || !y.x && !y.y)
      return !1;
    const Q = co.translate(b.x + y.x, b.y + y.y).scale(b.zoom), A = [
      [0, 0],
      [k.width, k.height]
    ], N = E.constrain()(Q, A, W), g = e.viewport.x !== N.x || e.viewport.y !== N.y || e.viewport.zoom !== N.k;
    return E.transform(B, N), g;
  }, ke = (y) => {
    const b = y instanceof Function ? y(e) : y, k = [
      "d3Zoom",
      "d3Selection",
      "d3ZoomHandler",
      "viewportRef",
      "vueFlowRef",
      "dimensions",
      "hooks"
    ];
    We(b.defaultEdgeOptions) && (e.defaultEdgeOptions = b.defaultEdgeOptions);
    const E = b.modelValue || b.nodes || b.edges ? [] : void 0;
    E && (b.modelValue && E.push(...b.modelValue), b.nodes && E.push(...b.nodes), b.edges && E.push(...b.edges), U(E));
    const B = () => {
      We(b.maxZoom) && z(b.maxZoom), We(b.minZoom) && m(b.minZoom), We(b.translateExtent) && Y(b.translateExtent);
    };
    for (const W of Object.keys(b)) {
      const Q = W, A = b[Q];
      ![...pE, ...k].includes(Q) && We(A) && (e[Q] = A);
    }
    _r(() => e.d3Zoom).not.toBeNull().then(B), e.initialized || (e.initialized = !0);
  };
  return {
    updateNodePositions: f,
    updateNodeDimensions: h,
    setElements: U,
    setNodes: L,
    setEdges: X,
    addNodes: K,
    addEdges: $,
    removeNodes: V,
    removeEdges: M,
    findNode: c,
    findEdge: d,
    updateEdge: R,
    updateEdgeData: G,
    updateNode: de,
    updateNodeData: re,
    applyEdgeChanges: ue,
    applyNodeChanges: oe,
    addSelectedElements: I,
    addSelectedNodes: w,
    addSelectedEdges: x,
    setMinZoom: m,
    setMaxZoom: z,
    setTranslateExtent: Y,
    setNodeExtent: q,
    setPaneClickDistance: j,
    removeSelectedElements: _,
    removeSelectedNodes: C,
    removeSelectedEdges: D,
    startConnection: fe,
    updateConnection: ce,
    endConnection: he,
    setInteractive: P,
    setState: ke,
    getIntersectingNodes: _e,
    getIncomers: i,
    getOutgoers: r,
    getConnectedEdges: l,
    getHandleConnections: a,
    isNodeIntersecting: xe,
    panBy: we,
    fitView: (y) => o.value.fitView(y),
    zoomIn: (y) => o.value.zoomIn(y),
    zoomOut: (y) => o.value.zoomOut(y),
    zoomTo: (y, b) => o.value.zoomTo(y, b),
    setViewport: (y, b) => o.value.setViewport(y, b),
    setTransform: (y, b) => o.value.setTransform(y, b),
    getViewport: () => o.value.getViewport(),
    getTransform: () => o.value.getTransform(),
    setCenter: (y, b, k) => o.value.setCenter(y, b, k),
    fitBounds: (y, b) => o.value.fitBounds(y, b),
    project: (y) => o.value.project(y),
    screenToFlowCoordinate: (y) => o.value.screenToFlowCoordinate(y),
    flowToScreenCoordinate: (y) => o.value.flowToScreenCoordinate(y),
    toObject: () => {
      const y = [], b = [];
      for (const k of e.nodes) {
        const {
          computedPosition: E,
          handleBounds: B,
          selected: W,
          dimensions: Q,
          isParent: A,
          resizing: N,
          dragging: g,
          events: Z,
          ...ie
        } = k;
        y.push(ie);
      }
      for (const k of e.edges) {
        const { selected: E, sourceNode: B, targetNode: W, events: Q, ...A } = k;
        b.push(A);
      }
      return JSON.parse(
        JSON.stringify({
          nodes: y,
          edges: b,
          position: [e.viewport.x, e.viewport.y],
          zoom: e.viewport.zoom,
          viewport: e.viewport
        })
      );
    },
    fromObject: (y) => new Promise((b) => {
      const { nodes: k, edges: E, position: B, zoom: W, viewport: Q } = y;
      if (k && L(k), E && X(E), Q != null && Q.x && (Q != null && Q.y) || B) {
        const A = (Q == null ? void 0 : Q.x) || B[0], N = (Q == null ? void 0 : Q.y) || B[1], g = (Q == null ? void 0 : Q.zoom) || W || e.viewport.zoom;
        return _r(() => o.value.viewportInitialized).toBe(!0).then(() => {
          o.value.setViewport({
            x: A,
            y: N,
            zoom: g
          }).then(() => {
            b(!0);
          });
        });
      } else
        b(!0);
    }),
    updateNodeInternals: s,
    viewportHelper: o,
    $reset: () => {
      const y = Af();
      if (e.edges = [], e.nodes = [], e.d3Zoom && e.d3Selection) {
        const b = co.translate(y.defaultViewport.x ?? 0, y.defaultViewport.y ?? 0).scale(jn(y.defaultViewport.zoom ?? 1, y.minZoom, y.maxZoom)), k = e.viewportRef.getBoundingClientRect(), E = [
          [0, 0],
          [k.width, k.height]
        ], B = e.d3Zoom.constrain()(b, E, y.translateExtent);
        e.d3Zoom.transform(e.d3Selection, B);
      }
      ke(y);
    },
    $destroy: () => {
    }
  };
}
const vE = ["data-id", "data-handleid", "data-nodeid", "data-handlepos"], gE = {
  name: "Handle",
  compatConfig: { MODE: 3 }
}, _n = /* @__PURE__ */ Te({
  ...gE,
  props: {
    id: { default: null },
    type: {},
    position: { default: () => be.Top },
    isValidConnection: { type: Function },
    connectable: { type: [Boolean, Number, String, Function], default: void 0 },
    connectableStart: { type: Boolean, default: !0 },
    connectableEnd: { type: Boolean, default: !0 }
  },
  setup(e, { expose: t }) {
    const n = Nc(e, ["position", "connectable", "connectableStart", "connectableEnd", "id"]), o = He(() => n.type ?? "source"), s = He(() => n.isValidConnection ?? null), {
      connectionStartHandle: i,
      connectionClickStartHandle: r,
      connectionEndHandle: l,
      vueFlowRef: a,
      nodesConnectable: c,
      noDragClassName: d,
      noPanClassName: f
    } = je(), { id: h, node: v, nodeEl: w, connectedEdges: x } = Of(), I = ee(), C = He(() => typeof e.connectableStart < "u" ? e.connectableStart : !0), D = He(() => typeof e.connectableEnd < "u" ? e.connectableEnd : !0), _ = He(
      () => {
        var L, X, U, K, $, V;
        return ((L = i.value) == null ? void 0 : L.nodeId) === h && ((X = i.value) == null ? void 0 : X.handleId) === e.id && ((U = i.value) == null ? void 0 : U.type) === o.value || ((K = l.value) == null ? void 0 : K.nodeId) === h && (($ = l.value) == null ? void 0 : $.handleId) === e.id && ((V = l.value) == null ? void 0 : V.type) === o.value;
      }
    ), m = He(
      () => {
        var L, X, U;
        return ((L = r.value) == null ? void 0 : L.nodeId) === h && ((X = r.value) == null ? void 0 : X.handleId) === e.id && ((U = r.value) == null ? void 0 : U.type) === o.value;
      }
    ), { handlePointerDown: z, handleClick: Y } = Tf({
      nodeId: h,
      handleId: e.id,
      isValidConnection: s,
      type: o
    }), q = ae(() => typeof e.connectable == "string" && e.connectable === "single" ? !x.value.some((L) => {
      const X = L[`${o.value}Handle`];
      return L[o.value] !== h ? !1 : X ? X === e.id : !0;
    }) : typeof e.connectable == "number" ? x.value.filter((L) => {
      const X = L[`${o.value}Handle`];
      return L[o.value] !== h ? !1 : X ? X === e.id : !0;
    }).length < e.connectable : typeof e.connectable == "function" ? e.connectable(v, x.value) : We(e.connectable) ? e.connectable : c.value);
    lt(() => {
      var L;
      if (!v.dimensions.width || !v.dimensions.height)
        return;
      const X = (L = v.handleBounds[o.value]) == null ? void 0 : L.find((G) => G.id === e.id);
      if (!a.value || X)
        return;
      const U = a.value.querySelector(".vue-flow__transformationpane");
      if (!w.value || !I.value || !U || !e.id)
        return;
      const K = w.value.getBoundingClientRect(), $ = I.value.getBoundingClientRect(), V = window.getComputedStyle(U), { m22: M } = new window.DOMMatrixReadOnly(V.transform), R = {
        id: e.id,
        position: e.position,
        x: ($.left - K.left) / M,
        y: ($.top - K.top) / M,
        ...vi(I.value)
      };
      v.handleBounds[o.value] = [...v.handleBounds[o.value] ?? [], R];
    }), si(() => {
      const L = v.handleBounds[o.value];
      L && (v.handleBounds[o.value] = L.filter((X) => X.id !== e.id));
    });
    function j(L) {
      const X = hl(L);
      q.value && C.value && (X && L.button === 0 || !X) && z(L);
    }
    function P(L) {
      !h || !r.value && !C.value || q.value && Y(L);
    }
    return t({
      handleClick: Y,
      handlePointerDown: z,
      onClick: P,
      onPointerDown: j
    }), (L, X) => (S(), O("div", {
      ref_key: "handle",
      ref: I,
      "data-id": `${H(h)}-${e.id}-${o.value}`,
      "data-handleid": e.id,
      "data-nodeid": H(h),
      "data-handlepos": L.position,
      class: me(["vue-flow__handle", [
        `vue-flow__handle-${L.position}`,
        `vue-flow__handle-${e.id}`,
        H(d),
        H(f),
        o.value,
        {
          connectable: q.value,
          connecting: m.value,
          connectablestart: C.value,
          connectableend: D.value,
          connectionindicator: q.value && (C.value && !_.value || D.value && _.value)
        }
      ]]),
      onMousedown: j,
      onTouchstartPassive: j,
      onClick: P
    }, [
      Fn(L.$slots, "default", { id: L.id })
    ], 42, vE));
  }
}), bi = function({
  sourcePosition: e = be.Bottom,
  targetPosition: t = be.Top,
  label: n,
  connectable: o = !0,
  isValidTargetPos: s,
  isValidSourcePos: i,
  data: r
}) {
  const l = r.label || n;
  return [
    Ve(_n, { type: "target", position: t, connectable: o, isValidConnection: s }),
    typeof l != "string" && l ? Ve(l) : Ve(ye, [l]),
    Ve(_n, { type: "source", position: e, connectable: o, isValidConnection: i })
  ];
};
bi.props = ["sourcePosition", "targetPosition", "label", "isValidTargetPos", "isValidSourcePos", "connectable", "data"];
bi.inheritAttrs = !1;
bi.compatConfig = { MODE: 3 };
const mE = bi, _i = function({
  targetPosition: e = be.Top,
  label: t,
  connectable: n = !0,
  isValidTargetPos: o,
  data: s
}) {
  const i = s.label || t;
  return [
    Ve(_n, { type: "target", position: e, connectable: n, isValidConnection: o }),
    typeof i != "string" && i ? Ve(i) : Ve(ye, [i])
  ];
};
_i.props = ["targetPosition", "label", "isValidTargetPos", "connectable", "data"];
_i.inheritAttrs = !1;
_i.compatConfig = { MODE: 3 };
const yE = _i, wi = function({
  sourcePosition: e = be.Bottom,
  label: t,
  connectable: n = !0,
  isValidSourcePos: o,
  data: s
}) {
  const i = s.label || t;
  return [
    typeof i != "string" && i ? Ve(i) : Ve(ye, [i]),
    Ve(_n, { type: "source", position: e, connectable: n, isValidConnection: o })
  ];
};
wi.props = ["sourcePosition", "label", "isValidSourcePos", "connectable", "data"];
wi.inheritAttrs = !1;
wi.compatConfig = { MODE: 3 };
const bE = wi, _E = ["transform"], wE = ["width", "height", "x", "y", "rx", "ry"], kE = ["y"], EE = {
  name: "EdgeText",
  compatConfig: { MODE: 3 }
}, xE = /* @__PURE__ */ Te({
  ...EE,
  props: {
    x: {},
    y: {},
    label: {},
    labelStyle: { default: () => ({}) },
    labelShowBg: { type: Boolean, default: !0 },
    labelBgStyle: { default: () => ({}) },
    labelBgPadding: { default: () => [2, 4] },
    labelBgBorderRadius: { default: 2 }
  },
  setup(e) {
    const t = ee({ x: 0, y: 0, width: 0, height: 0 }), n = ee(null), o = ae(() => `translate(${e.x - t.value.width / 2} ${e.y - t.value.height / 2})`);
    lt(s), Ne([() => e.x, () => e.y, n, () => e.label], s);
    function s() {
      if (!n.value)
        return;
      const i = n.value.getBBox();
      (i.width !== t.value.width || i.height !== t.value.height) && (t.value = i);
    }
    return (i, r) => (S(), O("g", {
      transform: o.value,
      class: "vue-flow__edge-textwrapper"
    }, [
      i.labelShowBg ? (S(), O("rect", {
        key: 0,
        class: "vue-flow__edge-textbg",
        width: `${t.value.width + 2 * i.labelBgPadding[0]}px`,
        height: `${t.value.height + 2 * i.labelBgPadding[1]}px`,
        x: -i.labelBgPadding[0],
        y: -i.labelBgPadding[1],
        style: rt(i.labelBgStyle),
        rx: i.labelBgBorderRadius,
        ry: i.labelBgBorderRadius
      }, null, 12, wE)) : le("", !0),
      u("text", Qr(i.$attrs, {
        ref_key: "el",
        ref: n,
        class: "vue-flow__edge-text",
        y: t.value.height / 2,
        dy: "0.3em",
        style: i.labelStyle
      }), [
        Fn(i.$slots, "default", {}, () => [
          typeof i.label != "string" ? (S(), et(Cc(i.label), { key: 0 })) : (S(), O(ye, { key: 1 }, [
            ve(F(i.label), 1)
          ], 64))
        ])
      ], 16, kE)
    ], 8, _E));
  }
}), CE = ["id", "d", "marker-end", "marker-start"], SE = ["d", "stroke-width"], $E = {
  name: "BaseEdge",
  inheritAttrs: !1,
  compatConfig: { MODE: 3 }
}, ss = /* @__PURE__ */ Te({
  ...$E,
  props: {
    id: {},
    labelX: {},
    labelY: {},
    path: {},
    label: {},
    markerStart: {},
    markerEnd: {},
    interactionWidth: { default: 20 },
    style: {},
    labelStyle: {},
    labelShowBg: { type: Boolean, default: !0 },
    labelBgStyle: {},
    labelBgPadding: {},
    labelBgBorderRadius: {}
  },
  setup(e, { expose: t }) {
    const n = Nc(e, ["interactionWidth", "labelShowBg"]), o = ee(null), s = ee(null), i = ee(null), r = Jp();
    return t({
      pathEl: o,
      interactionEl: s,
      labelEl: i
    }), (l, a) => (S(), O(ye, null, [
      u("path", {
        id: l.id,
        ref_key: "pathEl",
        ref: o,
        d: l.path,
        style: rt(n.style),
        class: me(["vue-flow__edge-path", H(r).class]),
        "marker-end": l.markerEnd,
        "marker-start": l.markerStart
      }, null, 14, CE),
      l.interactionWidth ? (S(), O("path", {
        key: 0,
        ref_key: "interactionEl",
        ref: s,
        fill: "none",
        d: l.path,
        "stroke-width": l.interactionWidth,
        "stroke-opacity": 0,
        class: "vue-flow__edge-interaction"
      }, null, 8, SE)) : le("", !0),
      l.label && l.labelX && l.labelY ? (S(), et(xE, {
        key: 1,
        ref_key: "labelEl",
        ref: i,
        x: l.labelX,
        y: l.labelY,
        label: l.label,
        "label-show-bg": l.labelShowBg,
        "label-bg-style": l.labelBgStyle,
        "label-bg-padding": l.labelBgPadding,
        "label-bg-border-radius": l.labelBgBorderRadius,
        "label-style": l.labelStyle
      }, null, 8, ["x", "y", "label", "label-show-bg", "label-bg-style", "label-bg-padding", "label-bg-border-radius", "label-style"])) : le("", !0)
    ], 64));
  }
});
function Df({
  sourceX: e,
  sourceY: t,
  targetX: n,
  targetY: o
}) {
  const s = Math.abs(n - e) / 2, i = n < e ? n + s : n - s, r = Math.abs(o - t) / 2, l = o < t ? o + r : o - r;
  return [i, l, s, r];
}
function Rf({
  sourceX: e,
  sourceY: t,
  targetX: n,
  targetY: o,
  sourceControlX: s,
  sourceControlY: i,
  targetControlX: r,
  targetControlY: l
}) {
  const a = e * 0.125 + s * 0.375 + r * 0.375 + n * 0.125, c = t * 0.125 + i * 0.375 + l * 0.375 + o * 0.125, d = Math.abs(a - e), f = Math.abs(c - t);
  return [a, c, d, f];
}
function bs(e, t) {
  return e >= 0 ? 0.5 * e : t * 25 * Math.sqrt(-e);
}
function Pu({ pos: e, x1: t, y1: n, x2: o, y2: s, c: i }) {
  let r, l;
  switch (e) {
    case be.Left:
      r = t - bs(t - o, i), l = n;
      break;
    case be.Right:
      r = t + bs(o - t, i), l = n;
      break;
    case be.Top:
      r = t, l = n - bs(n - s, i);
      break;
    case be.Bottom:
      r = t, l = n + bs(s - n, i);
      break;
  }
  return [r, l];
}
function Vf(e) {
  const {
    sourceX: t,
    sourceY: n,
    sourcePosition: o = be.Bottom,
    targetX: s,
    targetY: i,
    targetPosition: r = be.Top,
    curvature: l = 0.25
  } = e, [a, c] = Pu({
    pos: o,
    x1: t,
    y1: n,
    x2: s,
    y2: i,
    c: l
  }), [d, f] = Pu({
    pos: r,
    x1: s,
    y1: i,
    x2: t,
    y2: n,
    c: l
  }), [h, v, w, x] = Rf({
    sourceX: t,
    sourceY: n,
    targetX: s,
    targetY: i,
    sourceControlX: a,
    sourceControlY: c,
    targetControlX: d,
    targetControlY: f
  });
  return [
    `M${t},${n} C${a},${c} ${d},${f} ${s},${i}`,
    h,
    v,
    w,
    x
  ];
}
function Au({ pos: e, x1: t, y1: n, x2: o, y2: s }) {
  let i, r;
  switch (e) {
    case be.Left:
    case be.Right:
      i = 0.5 * (t + o), r = n;
      break;
    case be.Top:
    case be.Bottom:
      i = t, r = 0.5 * (n + s);
      break;
  }
  return [i, r];
}
function Lf(e) {
  const {
    sourceX: t,
    sourceY: n,
    sourcePosition: o = be.Bottom,
    targetX: s,
    targetY: i,
    targetPosition: r = be.Top
  } = e, [l, a] = Au({
    pos: o,
    x1: t,
    y1: n,
    x2: s,
    y2: i
  }), [c, d] = Au({
    pos: r,
    x1: s,
    y1: i,
    x2: t,
    y2: n
  }), [f, h, v, w] = Rf({
    sourceX: t,
    sourceY: n,
    targetX: s,
    targetY: i,
    sourceControlX: l,
    sourceControlY: a,
    targetControlX: c,
    targetControlY: d
  });
  return [
    `M${t},${n} C${l},${a} ${c},${d} ${s},${i}`,
    f,
    h,
    v,
    w
  ];
}
const Du = {
  [be.Left]: { x: -1, y: 0 },
  [be.Right]: { x: 1, y: 0 },
  [be.Top]: { x: 0, y: -1 },
  [be.Bottom]: { x: 0, y: 1 }
};
function IE({
  source: e,
  sourcePosition: t = be.Bottom,
  target: n
}) {
  return t === be.Left || t === be.Right ? e.x < n.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < n.y ? { x: 0, y: 1 } : { x: 0, y: -1 };
}
function Ru(e, t) {
  return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
}
function NE({
  source: e,
  sourcePosition: t = be.Bottom,
  target: n,
  targetPosition: o = be.Top,
  center: s,
  offset: i
}) {
  const r = Du[t], l = Du[o], a = { x: e.x + r.x * i, y: e.y + r.y * i }, c = { x: n.x + l.x * i, y: n.y + l.y * i }, d = IE({
    source: a,
    sourcePosition: t,
    target: c
  }), f = d.x !== 0 ? "x" : "y", h = d[f];
  let v, w, x;
  const I = { x: 0, y: 0 }, C = { x: 0, y: 0 }, [D, _, m, z] = Df({
    sourceX: e.x,
    sourceY: e.y,
    targetX: n.x,
    targetY: n.y
  });
  if (r[f] * l[f] === -1) {
    w = s.x ?? D, x = s.y ?? _;
    const q = [
      { x: w, y: a.y },
      { x: w, y: c.y }
    ], j = [
      { x: a.x, y: x },
      { x: c.x, y: x }
    ];
    r[f] === h ? v = f === "x" ? q : j : v = f === "x" ? j : q;
  } else {
    const q = [{ x: a.x, y: c.y }], j = [{ x: c.x, y: a.y }];
    if (f === "x" ? v = r.x === h ? j : q : v = r.y === h ? q : j, t === o) {
      const K = Math.abs(e[f] - n[f]);
      if (K <= i) {
        const $ = Math.min(i - 1, i - K);
        r[f] === h ? I[f] = (a[f] > e[f] ? -1 : 1) * $ : C[f] = (c[f] > n[f] ? -1 : 1) * $;
      }
    }
    if (t !== o) {
      const K = f === "x" ? "y" : "x", $ = r[f] === l[K], V = a[K] > c[K], M = a[K] < c[K];
      (r[f] === 1 && (!$ && V || $ && M) || r[f] !== 1 && (!$ && M || $ && V)) && (v = f === "x" ? q : j);
    }
    const P = { x: a.x + I.x, y: a.y + I.y }, L = { x: c.x + C.x, y: c.y + C.y }, X = Math.max(Math.abs(P.x - v[0].x), Math.abs(L.x - v[0].x)), U = Math.max(Math.abs(P.y - v[0].y), Math.abs(L.y - v[0].y));
    X >= U ? (w = (P.x + L.x) / 2, x = v[0].y) : (w = v[0].x, x = (P.y + L.y) / 2);
  }
  return [[
    e,
    { x: a.x + I.x, y: a.y + I.y },
    ...v,
    { x: c.x + C.x, y: c.y + C.y },
    n
  ], w, x, m, z];
}
function ME(e, t, n, o) {
  const s = Math.min(Ru(e, t) / 2, Ru(t, n) / 2, o), { x: i, y: r } = t;
  if (e.x === i && i === n.x || e.y === r && r === n.y)
    return `L${i} ${r}`;
  if (e.y === r) {
    const c = e.x < n.x ? -1 : 1, d = e.y < n.y ? 1 : -1;
    return `L ${i + s * c},${r}Q ${i},${r} ${i},${r + s * d}`;
  }
  const l = e.x < n.x ? 1 : -1, a = e.y < n.y ? -1 : 1;
  return `L ${i},${r + s * a}Q ${i},${r} ${i + s * l},${r}`;
}
function Ar(e) {
  const {
    sourceX: t,
    sourceY: n,
    sourcePosition: o = be.Bottom,
    targetX: s,
    targetY: i,
    targetPosition: r = be.Top,
    borderRadius: l = 5,
    centerX: a,
    centerY: c,
    offset: d = 20
  } = e, [f, h, v, w, x] = NE({
    source: { x: t, y: n },
    sourcePosition: o,
    target: { x: s, y: i },
    targetPosition: r,
    center: { x: a, y: c },
    offset: d
  });
  return [f.reduce((C, D, _) => {
    let m;
    return _ > 0 && _ < f.length - 1 ? m = ME(f[_ - 1], D, f[_ + 1], l) : m = `${_ === 0 ? "M" : "L"}${D.x} ${D.y}`, C += m, C;
  }, ""), h, v, w, x];
}
function TE(e) {
  const { sourceX: t, sourceY: n, targetX: o, targetY: s } = e, [i, r, l, a] = Df({
    sourceX: t,
    sourceY: n,
    targetX: o,
    targetY: s
  });
  return [`M ${t},${n}L ${o},${s}`, i, r, l, a];
}
const OE = /* @__PURE__ */ Te({
  name: "StraightEdge",
  props: [
    "label",
    "labelStyle",
    "labelShowBg",
    "labelBgStyle",
    "labelBgPadding",
    "labelBgBorderRadius",
    "sourceY",
    "sourceX",
    "targetX",
    "targetY",
    "markerEnd",
    "markerStart",
    "interactionWidth"
  ],
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t }) {
    return () => {
      const [n, o, s] = TE(e);
      return Ve(ss, {
        path: n,
        labelX: o,
        labelY: s,
        ...t,
        ...e
      });
    };
  }
}), PE = OE, AE = /* @__PURE__ */ Te({
  name: "SmoothStepEdge",
  props: [
    "sourcePosition",
    "targetPosition",
    "label",
    "labelStyle",
    "labelShowBg",
    "labelBgStyle",
    "labelBgPadding",
    "labelBgBorderRadius",
    "sourceY",
    "sourceX",
    "targetX",
    "targetY",
    "borderRadius",
    "markerEnd",
    "markerStart",
    "interactionWidth",
    "offset"
  ],
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t }) {
    return () => {
      const [n, o, s] = Ar({
        ...e,
        sourcePosition: e.sourcePosition ?? be.Bottom,
        targetPosition: e.targetPosition ?? be.Top
      });
      return Ve(ss, {
        path: n,
        labelX: o,
        labelY: s,
        ...t,
        ...e
      });
    };
  }
}), zf = AE, DE = /* @__PURE__ */ Te({
  name: "StepEdge",
  props: [
    "sourcePosition",
    "targetPosition",
    "label",
    "labelStyle",
    "labelShowBg",
    "labelBgStyle",
    "labelBgPadding",
    "labelBgBorderRadius",
    "sourceY",
    "sourceX",
    "targetX",
    "targetY",
    "markerEnd",
    "markerStart",
    "interactionWidth"
  ],
  setup(e, { attrs: t }) {
    return () => Ve(zf, { ...e, ...t, borderRadius: 0 });
  }
}), RE = DE, VE = /* @__PURE__ */ Te({
  name: "BezierEdge",
  props: [
    "sourcePosition",
    "targetPosition",
    "label",
    "labelStyle",
    "labelShowBg",
    "labelBgStyle",
    "labelBgPadding",
    "labelBgBorderRadius",
    "sourceY",
    "sourceX",
    "targetX",
    "targetY",
    "curvature",
    "markerEnd",
    "markerStart",
    "interactionWidth"
  ],
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t }) {
    return () => {
      const [n, o, s] = Vf({
        ...e,
        sourcePosition: e.sourcePosition ?? be.Bottom,
        targetPosition: e.targetPosition ?? be.Top
      });
      return Ve(ss, {
        path: n,
        labelX: o,
        labelY: s,
        ...t,
        ...e
      });
    };
  }
}), LE = VE, zE = /* @__PURE__ */ Te({
  name: "SimpleBezierEdge",
  props: [
    "sourcePosition",
    "targetPosition",
    "label",
    "labelStyle",
    "labelShowBg",
    "labelBgStyle",
    "labelBgPadding",
    "labelBgBorderRadius",
    "sourceY",
    "sourceX",
    "targetX",
    "targetY",
    "markerEnd",
    "markerStart",
    "interactionWidth"
  ],
  compatConfig: { MODE: 3 },
  setup(e, { attrs: t }) {
    return () => {
      const [n, o, s] = Lf({
        ...e,
        sourcePosition: e.sourcePosition ?? be.Bottom,
        targetPosition: e.targetPosition ?? be.Top
      });
      return Ve(ss, {
        path: n,
        labelX: o,
        labelY: s,
        ...t,
        ...e
      });
    };
  }
}), FE = zE, BE = {
  input: bE,
  default: mE,
  output: yE
}, HE = {
  default: LE,
  straight: PE,
  step: RE,
  smoothstep: zf,
  simplebezier: FE
};
function UE(e, t, n) {
  const o = ae(() => (x) => t.value.get(x)), s = ae(() => (x) => n.value.get(x)), i = ae(() => {
    const x = {
      ...HE,
      ...e.edgeTypes
    }, I = Object.keys(x);
    for (const C of e.edges)
      C.type && !I.includes(C.type) && (x[C.type] = C.type);
    return x;
  }), r = ae(() => {
    const x = {
      ...BE,
      ...e.nodeTypes
    }, I = Object.keys(x);
    for (const C of e.nodes)
      C.type && !I.includes(C.type) && (x[C.type] = C.type);
    return x;
  }), l = ae(() => e.onlyRenderVisibleElements ? _f(
    e.nodes,
    {
      x: 0,
      y: 0,
      width: e.dimensions.width,
      height: e.dimensions.height
    },
    e.viewport,
    !0
  ) : e.nodes), a = ae(() => {
    if (e.onlyRenderVisibleElements) {
      const x = [];
      for (const I of e.edges) {
        const C = t.value.get(I.source), D = t.value.get(I.target);
        G2({
          sourcePos: C.computedPosition || { x: 0, y: 0 },
          targetPos: D.computedPosition || { x: 0, y: 0 },
          sourceWidth: C.dimensions.width,
          sourceHeight: C.dimensions.height,
          targetWidth: D.dimensions.width,
          targetHeight: D.dimensions.height,
          width: e.dimensions.width,
          height: e.dimensions.height,
          viewport: e.viewport
        }) && x.push(I);
      }
      return x;
    }
    return e.edges;
  }), c = ae(() => [...l.value, ...a.value]), d = ae(() => {
    const x = [];
    for (const I of e.nodes)
      I.selected && x.push(I);
    return x;
  }), f = ae(() => {
    const x = [];
    for (const I of e.edges)
      I.selected && x.push(I);
    return x;
  }), h = ae(() => [
    ...d.value,
    ...f.value
  ]), v = ae(() => {
    const x = [];
    for (const I of e.nodes)
      I.dimensions.width && I.dimensions.height && I.handleBounds !== void 0 && x.push(I);
    return x;
  }), w = ae(
    () => l.value.length > 0 && v.value.length === l.value.length
  );
  return {
    getNode: o,
    getEdge: s,
    getElements: c,
    getEdgeTypes: i,
    getNodeTypes: r,
    getEdges: a,
    getNodes: l,
    getSelectedElements: h,
    getSelectedNodes: d,
    getSelectedEdges: f,
    getNodesInitialized: v,
    areNodesInitialized: w
  };
}
class On {
  constructor() {
    this.currentId = 0, this.flows = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    var t;
    const n = (t = po()) == null ? void 0 : t.appContext.app, o = (n == null ? void 0 : n.config.globalProperties.$vueFlowStorage) ?? On.instance;
    return On.instance = o ?? new On(), n && (n.config.globalProperties.$vueFlowStorage = On.instance), On.instance;
  }
  set(t, n) {
    return this.flows.set(t, n);
  }
  get(t) {
    return this.flows.get(t);
  }
  remove(t) {
    return this.flows.delete(t);
  }
  create(t, n) {
    const o = Af(), s = wn(o), i = {};
    for (const [h, v] of Object.entries(s.hooks)) {
      const w = `on${h.charAt(0).toUpperCase() + h.slice(1)}`;
      i[w] = v.on;
    }
    const r = {};
    for (const [h, v] of Object.entries(s.hooks))
      r[h] = v.trigger;
    const l = ae(() => {
      const h = /* @__PURE__ */ new Map();
      for (const v of s.nodes)
        h.set(v.id, v);
      return h;
    }), a = ae(() => {
      const h = /* @__PURE__ */ new Map();
      for (const v of s.edges)
        h.set(v.id, v);
      return h;
    }), c = UE(s, l, a), d = hE(s, l, a);
    d.setState({ ...s, ...n });
    const f = {
      ...i,
      ...c,
      ...d,
      ...Y0(s),
      nodeLookup: l,
      edgeLookup: a,
      emits: r,
      id: t,
      vueFlowVersion: "1.41.6",
      $destroy: () => {
        this.remove(t);
      }
    };
    return this.set(t, f), f;
  }
  getId() {
    return `vue-flow-${this.currentId++}`;
  }
}
function je(e) {
  const t = On.getInstance(), n = Fr(), o = typeof e == "object", s = o ? e : { id: e }, i = s.id, r = i ?? (n == null ? void 0 : n.vueFlowId);
  let l;
  if (n) {
    const a = Lt(Ou, null);
    typeof a < "u" && a !== null && (!r || a.id === r) && (l = a);
  }
  if (l || r && (l = t.get(r)), !l || r && l.id !== r) {
    const a = i ?? t.getId(), c = t.create(a, s);
    l = c, (n ?? Yu(!0)).run(() => {
      Ne(
        c.applyDefault,
        (f, h, v) => {
          const w = (I) => {
            c.applyNodeChanges(I);
          }, x = (I) => {
            c.applyEdgeChanges(I);
          };
          f ? (c.onNodesChange(w), c.onEdgesChange(x)) : (c.hooks.value.nodesChange.off(w), c.hooks.value.edgesChange.off(x)), v(() => {
            c.hooks.value.nodesChange.off(w), c.hooks.value.edgesChange.off(x);
          });
        },
        { immediate: !0 }
      ), ci(() => {
        if (l) {
          const f = t.get(l.id);
          f ? f.$destroy() : mi(`No store instance found for id ${l.id} in storage.`);
        }
      });
    });
  } else
    o && l.setState(s);
  if (n && (Bn(Ou, l), n.vueFlowId = l.id), o) {
    const a = po();
    (a == null ? void 0 : a.type.name) !== "VueFlow" && l.emits.error(new tt(Ze.USEVUEFLOW_OPTIONS));
  }
  return l;
}
function jE(e) {
  const { emits: t, dimensions: n } = je();
  let o;
  lt(() => {
    const s = e.value, i = () => {
      if (!s)
        return;
      const r = vi(s);
      (r.width === 0 || r.height === 0) && t.error(new tt(Ze.MISSING_VIEWPORT_DIMENSIONS)), n.value = { width: r.width || 500, height: r.height || 500 };
    };
    i(), window.addEventListener("resize", i), s && (o = new ResizeObserver(() => i()), o.observe(s)), sn(() => {
      window.removeEventListener("resize", i), o && s && o.unobserve(s);
    });
  });
}
const GE = {
  name: "UserSelection",
  compatConfig: { MODE: 3 }
}, qE = /* @__PURE__ */ Te({
  ...GE,
  props: {
    userSelectionRect: {}
  },
  setup(e) {
    return (t, n) => (S(), O("div", {
      class: "vue-flow__selection vue-flow__container",
      style: rt({
        width: `${t.userSelectionRect.width}px`,
        height: `${t.userSelectionRect.height}px`,
        transform: `translate(${t.userSelectionRect.x}px, ${t.userSelectionRect.y}px)`
      })
    }, null, 4));
  }
}), YE = ["tabIndex"], XE = {
  name: "NodesSelection",
  compatConfig: { MODE: 3 }
}, KE = /* @__PURE__ */ Te({
  ...XE,
  setup(e) {
    const { emits: t, viewport: n, getSelectedNodes: o, noPanClassName: s, disableKeyboardA11y: i, userSelectionActive: r } = je(), l = Pf(), a = ee(null), c = Mf({
      el: a,
      onStart(w) {
        t.selectionDragStart(w);
      },
      onDrag(w) {
        t.selectionDrag(w);
      },
      onStop(w) {
        t.selectionDragStop(w);
      }
    });
    lt(() => {
      var w;
      i.value || (w = a.value) == null || w.focus({ preventScroll: !0 });
    });
    const d = ae(() => bf(o.value)), f = ae(() => ({
      width: `${d.value.width}px`,
      height: `${d.value.height}px`,
      top: `${d.value.y}px`,
      left: `${d.value.x}px`
    }));
    function h(w) {
      t.selectionContextMenu({ event: w, nodes: o.value });
    }
    function v(w) {
      i || so[w.key] && (w.preventDefault(), l(
        {
          x: so[w.key].x,
          y: so[w.key].y
        },
        w.shiftKey
      ));
    }
    return (w, x) => !H(r) && d.value.width && d.value.height ? (S(), O("div", {
      key: 0,
      class: me(["vue-flow__nodesselection vue-flow__container", H(s)]),
      style: rt({ transform: `translate(${H(n).x}px,${H(n).y}px) scale(${H(n).zoom})` })
    }, [
      u("div", {
        ref_key: "el",
        ref: a,
        class: me([{ dragging: H(c) }, "vue-flow__nodesselection-rect"]),
        style: rt(f.value),
        tabIndex: H(i) ? void 0 : -1,
        onContextmenu: h,
        onKeydown: v
      }, null, 46, YE)
    ], 6)) : le("", !0);
  }
});
function WE(e, t) {
  return {
    x: e.clientX - t.left,
    y: e.clientY - t.top
  };
}
const ZE = {
  name: "Pane",
  compatConfig: { MODE: 3 }
}, JE = /* @__PURE__ */ Te({
  ...ZE,
  props: {
    isSelecting: { type: Boolean },
    selectionKeyPressed: { type: Boolean }
  },
  setup(e) {
    const {
      vueFlowRef: t,
      nodes: n,
      viewport: o,
      emits: s,
      userSelectionActive: i,
      removeSelectedElements: r,
      userSelectionRect: l,
      elementsSelectable: a,
      nodesSelectionActive: c,
      getSelectedEdges: d,
      getSelectedNodes: f,
      removeNodes: h,
      removeEdges: v,
      selectionMode: w,
      deleteKeyCode: x,
      multiSelectionKeyCode: I,
      multiSelectionActive: C,
      edgeLookup: D,
      nodeLookup: _
    } = je(), m = ee(null), z = ee(0), Y = ee(0), q = ee(), j = ee(/* @__PURE__ */ new Map()), P = He(() => a.value && (e.isSelecting || i.value));
    let L = !1, X = !1;
    const U = Ro(x, { actInsideInputWithModifier: !1 }), K = Ro(I);
    Ne(U, (re) => {
      re && (h(f.value), v(d.value), c.value = !1);
    }), Ne(K, (re) => {
      C.value = re;
    });
    function $(re, fe) {
      return (ce) => {
        ce.target === fe && (re == null || re(ce));
      };
    }
    function V() {
      i.value = !1, l.value = null, z.value = 0, Y.value = 0;
    }
    function M(re) {
      if (L) {
        L = !1;
        return;
      }
      s.paneClick(re), r(), c.value = !1;
    }
    function R(re) {
      re.preventDefault(), re.stopPropagation(), s.paneContextMenu(re);
    }
    function G(re) {
      s.paneScroll(re);
    }
    function oe(re) {
      var fe, ce, he, te, _e;
      if (q.value = (fe = t.value) == null ? void 0 : fe.getBoundingClientRect(), !a.value || !e.isSelecting || re.button !== 0 || re.target !== m.value || !q.value)
        return;
      (he = (ce = re.target) == null ? void 0 : ce.setPointerCapture) == null || he.call(ce, re.pointerId);
      const { x: xe, y: we } = WE(re, q.value);
      X = !0, L = !1, j.value = /* @__PURE__ */ new Map();
      for (const [ke, J] of D.value)
        j.value.set(J.source, ((te = j.value.get(J.source)) == null ? void 0 : te.add(ke)) || /* @__PURE__ */ new Set([ke])), j.value.set(J.target, ((_e = j.value.get(J.target)) == null ? void 0 : _e.add(ke)) || /* @__PURE__ */ new Set([ke]));
      r(), l.value = {
        width: 0,
        height: 0,
        startX: xe,
        startY: we,
        x: xe,
        y: we
      }, s.selectionStart(re);
    }
    function ue(re) {
      if (!q.value || !l.value)
        return;
      L = !0;
      const { x: fe, y: ce } = tn(re, q.value), { startX: he = 0, startY: te = 0 } = l.value, _e = {
        startX: he,
        startY: te,
        x: fe < he ? fe : he,
        y: ce < te ? ce : te,
        width: Math.abs(fe - he),
        height: Math.abs(ce - te)
      }, xe = _f(
        n.value,
        _e,
        o.value,
        w.value === fl.Partial,
        !0
      ), we = /* @__PURE__ */ new Set(), ke = /* @__PURE__ */ new Set();
      for (const J of xe) {
        ke.add(J.id);
        const p = j.value.get(J.id);
        if (p)
          for (const T of p)
            we.add(T);
      }
      if (z.value !== ke.size) {
        z.value = ke.size;
        const J = fn(_.value, ke, !0);
        s.nodesChange(J);
      }
      if (Y.value !== we.size) {
        Y.value = we.size;
        const J = fn(D.value, we);
        s.edgesChange(J);
      }
      l.value = _e, i.value = !0, c.value = !1;
    }
    function de(re) {
      var fe;
      re.button !== 0 || !X || ((fe = re.target) == null || fe.releasePointerCapture(re.pointerId), !i.value && l.value && re.target === m.value && M(re), z.value > 0 && (c.value = !0), V(), s.selectionEnd(re), e.selectionKeyPressed && (L = !1), X = !1);
    }
    return (re, fe) => (S(), O("div", {
      ref_key: "container",
      ref: m,
      class: me(["vue-flow__pane vue-flow__container", { selection: re.isSelecting }]),
      onClick: fe[0] || (fe[0] = (ce) => P.value ? void 0 : $(M, m.value)(ce)),
      onContextmenu: fe[1] || (fe[1] = (ce) => $(R, m.value)(ce)),
      onWheelPassive: fe[2] || (fe[2] = (ce) => $(G, m.value)(ce)),
      onPointerenter: fe[3] || (fe[3] = (ce) => P.value ? void 0 : H(s).paneMouseEnter(ce)),
      onPointerdown: fe[4] || (fe[4] = (ce) => P.value ? oe(ce) : H(s).paneMouseMove(ce)),
      onPointermove: fe[5] || (fe[5] = (ce) => P.value ? ue(ce) : H(s).paneMouseMove(ce)),
      onPointerup: fe[6] || (fe[6] = (ce) => P.value ? de(ce) : void 0),
      onPointerleave: fe[7] || (fe[7] = (ce) => H(s).paneMouseLeave(ce))
    }, [
      Fn(re.$slots, "default"),
      H(i) && H(l) ? (S(), et(qE, {
        key: 0,
        "user-selection-rect": H(l)
      }, null, 8, ["user-selection-rect"])) : le("", !0),
      H(c) && H(f).length ? (S(), et(KE, { key: 1 })) : le("", !0)
    ], 34));
  }
}), QE = {
  name: "Transform",
  compatConfig: { MODE: 3 }
}, ex = /* @__PURE__ */ Te({
  ...QE,
  setup(e) {
    const { viewport: t, fitViewOnInit: n, fitViewOnInitDone: o } = je(), s = ae(() => n.value ? !o.value : !1), i = ae(() => `translate(${t.value.x}px,${t.value.y}px) scale(${t.value.zoom})`);
    return (r, l) => (S(), O("div", {
      class: "vue-flow__transformationpane vue-flow__container",
      style: rt({ transform: i.value, opacity: s.value ? 0 : void 0 })
    }, [
      Fn(r.$slots, "default")
    ], 4));
  }
}), tx = {
  name: "Viewport",
  compatConfig: { MODE: 3 }
}, nx = /* @__PURE__ */ Te({
  ...tx,
  setup(e) {
    const {
      minZoom: t,
      maxZoom: n,
      defaultViewport: o,
      translateExtent: s,
      zoomActivationKeyCode: i,
      selectionKeyCode: r,
      panActivationKeyCode: l,
      panOnScroll: a,
      panOnScrollMode: c,
      panOnScrollSpeed: d,
      panOnDrag: f,
      zoomOnDoubleClick: h,
      zoomOnPinch: v,
      zoomOnScroll: w,
      preventScrolling: x,
      noWheelClassName: I,
      noPanClassName: C,
      emits: D,
      connectionStartHandle: _,
      userSelectionActive: m,
      paneDragging: z,
      d3Zoom: Y,
      d3Selection: q,
      d3ZoomHandler: j,
      viewport: P,
      viewportRef: L,
      paneClickDistance: X
    } = je();
    jE(L);
    const U = ee(!1), K = ee(!1);
    let $ = null, V = !1, M = 0, R = {
      x: 0,
      y: 0,
      zoom: 0
    };
    const G = Ro(l), oe = Ro(r), ue = Ro(i), de = He(
      () => (!oe.value || oe.value && r.value === !0) && (G.value || f.value)
    ), re = He(() => G.value || a.value), fe = He(() => oe.value || r.value === !0 && de.value !== !0);
    lt(() => {
      if (!L.value) {
        mi("Viewport element is missing");
        return;
      }
      const we = L.value, ke = we.getBoundingClientRect(), J = I2().clickDistance(X.value).scaleExtent([t.value, n.value]).translateExtent(s.value), p = St(we).call(J), T = p.on("wheel.zoom"), y = co.translate(o.value.x ?? 0, o.value.y ?? 0).scale(jn(o.value.zoom ?? 1, t.value, n.value)), b = [
        [0, 0],
        [ke.width, ke.height]
      ], k = J.constrain()(y, b, s.value);
      J.transform(p, k), J.wheelDelta(he), Y.value = J, q.value = p, j.value = T, P.value = { x: k.x, y: k.y, zoom: k.k }, J.on("start", (E) => {
        var B;
        if (!E.sourceEvent)
          return null;
        M = E.sourceEvent.button, U.value = !0;
        const W = _e(E.transform);
        ((B = E.sourceEvent) == null ? void 0 : B.type) === "mousedown" && (z.value = !0), R = W, D.viewportChangeStart(W), D.moveStart({ event: E, flowTransform: W });
      }), J.on("end", (E) => {
        if (!E.sourceEvent)
          return null;
        if (U.value = !1, z.value = !1, ce(de.value, M ?? 0) && !V && D.paneContextMenu(E.sourceEvent), V = !1, te(R, E.transform)) {
          const B = _e(E.transform);
          R = B, D.viewportChangeEnd(B), D.moveEnd({ event: E, flowTransform: B });
        }
      }), J.filter((E) => {
        var B;
        const W = ue.value || w.value, Q = v.value && E.ctrlKey, A = E.button;
        if (A === 1 && E.type === "mousedown" && (xe(E, "vue-flow__node") || xe(E, "vue-flow__edge")))
          return !0;
        if (!de.value && !W && !re.value && !h.value && !v.value || m.value || !h.value && E.type === "dblclick" || xe(E, I.value) && E.type === "wheel" || xe(E, C.value) && (E.type !== "wheel" || re.value && E.type === "wheel" && !ue.value) || !v.value && E.ctrlKey && E.type === "wheel" || !W && !re.value && !Q && E.type === "wheel")
          return !1;
        if (!v && E.type === "touchstart" && ((B = E.touches) == null ? void 0 : B.length) > 1)
          return E.preventDefault(), !1;
        if (!de.value && (E.type === "mousedown" || E.type === "touchstart") || r.value === !0 && Array.isArray(f.value) && f.value.includes(0) && A === 0 || Array.isArray(f.value) && !f.value.includes(A) && (E.type === "mousedown" || E.type === "touchstart"))
          return !1;
        const N = Array.isArray(f.value) && f.value.includes(A) || r.value === !0 && Array.isArray(f.value) && !f.value.includes(0) || !A || A <= 1;
        return (!E.ctrlKey || G.value || E.type === "wheel") && N;
      }), Ne(
        [m, de],
        () => {
          m.value && !U.value ? J.on("zoom", null) : m.value || J.on("zoom", (E) => {
            P.value = { x: E.transform.x, y: E.transform.y, zoom: E.transform.k };
            const B = _e(E.transform);
            V = ce(de.value, M ?? 0), D.viewportChange(B), D.move({ event: E, flowTransform: B });
          });
        },
        { immediate: !0 }
      ), Ne(
        [m, re, c, ue, v, x, I],
        () => {
          re.value && !ue.value && !m.value ? p.on(
            "wheel.zoom",
            (E) => {
              if (xe(E, I.value))
                return !1;
              const B = ue.value || w.value, W = v.value && E.ctrlKey;
              if (!(!x.value || re.value || B || W))
                return !1;
              E.preventDefault(), E.stopImmediatePropagation();
              const A = p.property("__zoom").k || 1, N = Xs();
              if (!G.value && E.ctrlKey && v.value && N) {
                const Ce = At(E), $e = he(E), Ge = A * 2 ** $e;
                J.scaleTo(p, Ge, Ce, E);
                return;
              }
              const g = E.deltaMode === 1 ? 20 : 1;
              let Z = c.value === Do.Vertical ? 0 : E.deltaX * g, ie = c.value === Do.Horizontal ? 0 : E.deltaY * g;
              !N && E.shiftKey && c.value !== Do.Vertical && !Z && ie && (Z = ie, ie = 0), J.translateBy(
                p,
                -(Z / A) * d.value,
                -(ie / A) * d.value
              );
              const ge = _e(p.property("__zoom"));
              $ && clearTimeout($), K.value ? (D.move({ event: E, flowTransform: ge }), D.viewportChange(ge), $ = setTimeout(() => {
                D.moveEnd({ event: E, flowTransform: ge }), D.viewportChangeEnd(ge), K.value = !1;
              }, 150)) : (K.value = !0, D.moveStart({ event: E, flowTransform: ge }), D.viewportChangeStart(ge));
            },
            { passive: !1 }
          ) : typeof T < "u" && p.on(
            "wheel.zoom",
            function(E, B) {
              const W = !x.value && E.type === "wheel" && !E.ctrlKey, Q = ue.value || w.value, A = v.value && E.ctrlKey;
              if (!Q && !a.value && !A && E.type === "wheel" || W || xe(E, I.value))
                return null;
              E.preventDefault(), T.call(this, E, B);
            },
            { passive: !1 }
          );
        },
        { immediate: !0 }
      );
    });
    function ce(we, ke) {
      return ke === 2 && Array.isArray(we) && we.includes(2);
    }
    function he(we) {
      const ke = we.ctrlKey && Xs() ? 10 : 1;
      return -we.deltaY * (we.deltaMode === 1 ? 0.05 : we.deltaMode ? 1 : 2e-3) * ke;
    }
    function te(we, ke) {
      return we.x !== ke.x && !Number.isNaN(ke.x) || we.y !== ke.y && !Number.isNaN(ke.y) || we.zoom !== ke.k && !Number.isNaN(ke.k);
    }
    function _e(we) {
      return {
        x: we.x,
        y: we.y,
        zoom: we.k
      };
    }
    function xe(we, ke) {
      return we.target.closest(`.${ke}`);
    }
    return (we, ke) => (S(), O("div", {
      ref_key: "viewportRef",
      ref: L,
      class: "vue-flow__viewport vue-flow__container"
    }, [
      ne(JE, {
        "is-selecting": fe.value,
        "selection-key-pressed": H(oe),
        class: me({
          connecting: !!H(_),
          dragging: H(z),
          draggable: H(f) === !0 || Array.isArray(H(f)) && H(f).includes(0)
        })
      }, {
        default: bn(() => [
          ne(ex, null, {
            default: bn(() => [
              Fn(we.$slots, "default")
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["is-selecting", "selection-key-pressed", "class"])
    ], 512));
  }
}), ox = ["id"], sx = ["id"], ix = ["id"], rx = {
  name: "A11yDescriptions",
  compatConfig: { MODE: 3 }
}, lx = /* @__PURE__ */ Te({
  ...rx,
  setup(e) {
    const { id: t, disableKeyboardA11y: n, ariaLiveMessage: o } = je();
    return (s, i) => (S(), O(ye, null, [
      u("div", {
        id: `${H(cf)}-${H(t)}`,
        style: { display: "none" }
      }, " Press enter or space to select a node. " + F(H(n) ? "" : "You can then use the arrow keys to move the node around.") + " You can then use the arrow keys to move the node around, press delete to remove it and press escape to cancel. ", 9, ox),
      u("div", {
        id: `${H(df)}-${H(t)}`,
        style: { display: "none" }
      }, " Press enter or space to select an edge. You can then press delete to remove it or press escape to cancel. ", 8, sx),
      H(n) ? le("", !0) : (S(), O("div", {
        key: 0,
        id: `${H(O2)}-${H(t)}`,
        "aria-live": "assertive",
        "aria-atomic": "true",
        style: { position: "absolute", width: "1px", height: "1px", margin: "-1px", border: "0", padding: "0", overflow: "hidden", clip: "rect(0px, 0px, 0px, 0px)", "clip-path": "inset(100%)" }
      }, F(H(o)), 9, ix))
    ], 64));
  }
});
function ax() {
  const e = je();
  Ne(
    () => e.viewportHelper.value.viewportInitialized,
    (t) => {
      t && setTimeout(() => {
        e.emits.init(e), e.emits.paneReady(e);
      }, 1);
    }
  );
}
function ux(e, t, n) {
  return n === be.Left ? e - t : n === be.Right ? e + t : e;
}
function cx(e, t, n) {
  return n === be.Top ? e - t : n === be.Bottom ? e + t : e;
}
const gl = function({
  radius: e = 10,
  centerX: t = 0,
  centerY: n = 0,
  position: o = be.Top,
  type: s
}) {
  return Ve("circle", {
    class: `vue-flow__edgeupdater vue-flow__edgeupdater-${s}`,
    cx: ux(t, e, o),
    cy: cx(n, e, o),
    r: e,
    stroke: "transparent",
    fill: "transparent"
  });
};
gl.props = ["radius", "centerX", "centerY", "position", "type"];
gl.compatConfig = { MODE: 3 };
const Vu = gl, dx = /* @__PURE__ */ Te({
  name: "Edge",
  compatConfig: { MODE: 3 },
  props: ["id"],
  setup(e) {
    const {
      id: t,
      addSelectedEdges: n,
      connectionMode: o,
      edgeUpdaterRadius: s,
      emits: i,
      nodesSelectionActive: r,
      noPanClassName: l,
      getEdgeTypes: a,
      removeSelectedEdges: c,
      findEdge: d,
      findNode: f,
      isValidConnection: h,
      multiSelectionActive: v,
      disableKeyboardA11y: w,
      elementsSelectable: x,
      edgesUpdatable: I,
      edgesFocusable: C,
      hooks: D
    } = je(), _ = ae(() => d(e.id)), { emit: m, on: z } = oE(_.value, i), Y = Lt(yi), q = po(), j = ee(!1), P = ee(!1), L = ee(""), X = ee(null), U = ee("source"), K = ee(null), $ = He(
      () => typeof _.value.selectable > "u" ? x.value : _.value.selectable
    ), V = He(() => typeof _.value.updatable > "u" ? I.value : _.value.updatable), M = He(() => typeof _.value.focusable > "u" ? C.value : _.value.focusable);
    Bn(eE, e.id), Bn(tE, K);
    const R = ae(() => _.value.class instanceof Function ? _.value.class(_.value) : _.value.class), G = ae(() => _.value.style instanceof Function ? _.value.style(_.value) : _.value.style), oe = ae(() => {
      const b = _.value.type || "default", k = Y == null ? void 0 : Y[`edge-${b}`];
      if (k)
        return k;
      let E = _.value.template ?? a.value[b];
      if (typeof E == "string" && q) {
        const B = Object.keys(q.appContext.components);
        B && B.includes(b) && (E = Ec(b, !1));
      }
      return E && typeof E != "string" ? E : (i.error(new tt(Ze.EDGE_TYPE_MISSING, E)), !1);
    }), { handlePointerDown: ue } = Tf({
      nodeId: L,
      handleId: X,
      type: U,
      isValidConnection: h,
      edgeUpdaterType: U,
      onEdgeUpdate: fe,
      onEdgeUpdateEnd: ce
    });
    return () => {
      const b = f(_.value.source), k = f(_.value.target), E = "pathOptions" in _.value ? _.value.pathOptions : {};
      if (!b && !k)
        return i.error(new tt(Ze.EDGE_SOURCE_TARGET_MISSING, _.value.id, _.value.source, _.value.target)), null;
      if (!b)
        return i.error(new tt(Ze.EDGE_SOURCE_MISSING, _.value.id, _.value.source)), null;
      if (!k)
        return i.error(new tt(Ze.EDGE_TARGET_MISSING, _.value.id, _.value.target)), null;
      if (!_.value || _.value.hidden || b.hidden || k.hidden)
        return null;
      let B;
      o.value === Un.Strict ? B = b.handleBounds.source : B = [...b.handleBounds.source || [], ...b.handleBounds.target || []];
      const W = Su(B, _.value.sourceHandle);
      let Q;
      o.value === Un.Strict ? Q = k.handleBounds.target : Q = [...k.handleBounds.target || [], ...k.handleBounds.source || []];
      const A = Su(Q, _.value.targetHandle), N = (W == null ? void 0 : W.position) || be.Bottom, g = (A == null ? void 0 : A.position) || be.Top, { x: Z, y: ie } = Ys(b, W, N), { x: ge, y: Ce } = Ys(k, A, g);
      return _.value.sourceX = Z, _.value.sourceY = ie, _.value.targetX = ge, _.value.targetY = Ce, Ve(
        "g",
        {
          ref: K,
          key: e.id,
          "data-id": e.id,
          class: [
            "vue-flow__edge",
            `vue-flow__edge-${oe.value === !1 ? "default" : _.value.type || "default"}`,
            l.value,
            R.value,
            {
              updating: j.value,
              selected: _.value.selected,
              animated: _.value.animated,
              inactive: !$.value && !D.value.edgeClick.hasListeners()
            }
          ],
          onClick: te,
          onContextmenu: _e,
          onDblclick: xe,
          onMouseenter: we,
          onMousemove: ke,
          onMouseleave: J,
          onKeyDown: M.value ? y : void 0,
          tabIndex: M.value ? 0 : void 0,
          "aria-label": _.value.ariaLabel === null ? void 0 : _.value.ariaLabel || `Edge from ${_.value.source} to ${_.value.target}`,
          "aria-describedby": M.value ? `${df}-${t}` : void 0,
          role: M.value ? "button" : "img"
        },
        [
          P.value ? null : Ve(oe.value === !1 ? a.value.default : oe.value, {
            id: e.id,
            sourceNode: b,
            targetNode: k,
            source: _.value.source,
            target: _.value.target,
            type: _.value.type,
            updatable: V.value,
            selected: _.value.selected,
            animated: _.value.animated,
            label: _.value.label,
            labelStyle: _.value.labelStyle,
            labelShowBg: _.value.labelShowBg,
            labelBgStyle: _.value.labelBgStyle,
            labelBgPadding: _.value.labelBgPadding,
            labelBgBorderRadius: _.value.labelBgBorderRadius,
            data: _.value.data,
            events: { ..._.value.events, ...z },
            style: G.value,
            markerStart: `url('#${Wo(_.value.markerStart, t)}')`,
            markerEnd: `url('#${Wo(_.value.markerEnd, t)}')`,
            sourcePosition: N,
            targetPosition: g,
            sourceX: Z,
            sourceY: ie,
            targetX: ge,
            targetY: Ce,
            sourceHandleId: _.value.sourceHandle,
            targetHandleId: _.value.targetHandle,
            interactionWidth: _.value.interactionWidth,
            ...E
          }),
          [
            V.value === "source" || V.value === !0 ? [
              Ve(
                "g",
                {
                  onMousedown: p,
                  onMouseenter: de,
                  onMouseout: re
                },
                Ve(Vu, {
                  position: N,
                  centerX: Z,
                  centerY: ie,
                  radius: s.value,
                  type: "source",
                  "data-type": "source"
                })
              )
            ] : null,
            V.value === "target" || V.value === !0 ? [
              Ve(
                "g",
                {
                  onMousedown: T,
                  onMouseenter: de,
                  onMouseout: re
                },
                Ve(Vu, {
                  position: g,
                  centerX: ge,
                  centerY: Ce,
                  radius: s.value,
                  type: "target",
                  "data-type": "target"
                })
              )
            ] : null
          ]
        ]
      );
    };
    function de() {
      j.value = !0;
    }
    function re() {
      j.value = !1;
    }
    function fe(b, k) {
      m.update({ event: b, edge: _.value, connection: k });
    }
    function ce(b) {
      m.updateEnd({ event: b, edge: _.value }), P.value = !1;
    }
    function he(b, k) {
      b.button === 0 && (P.value = !0, L.value = k ? _.value.target : _.value.source, X.value = (k ? _.value.targetHandle : _.value.sourceHandle) ?? "", U.value = k ? "target" : "source", m.updateStart({ event: b, edge: _.value }), ue(b));
    }
    function te(b) {
      var k;
      const E = { event: b, edge: _.value };
      $.value && (r.value = !1, _.value.selected && v.value ? (c([_.value]), (k = K.value) == null || k.blur()) : n([_.value])), m.click(E);
    }
    function _e(b) {
      m.contextMenu({ event: b, edge: _.value });
    }
    function xe(b) {
      m.doubleClick({ event: b, edge: _.value });
    }
    function we(b) {
      m.mouseEnter({ event: b, edge: _.value });
    }
    function ke(b) {
      m.mouseMove({ event: b, edge: _.value });
    }
    function J(b) {
      m.mouseLeave({ event: b, edge: _.value });
    }
    function p(b) {
      he(b, !0);
    }
    function T(b) {
      he(b, !1);
    }
    function y(b) {
      var k;
      !w.value && ff.includes(b.key) && $.value && (b.key === "Escape" ? ((k = K.value) == null || k.blur(), c([d(e.id)])) : n([d(e.id)]));
    }
  }
}), fx = dx, px = {
  [be.Left]: be.Right,
  [be.Right]: be.Left,
  [be.Top]: be.Bottom,
  [be.Bottom]: be.Top
}, hx = /* @__PURE__ */ Te({
  name: "ConnectionLine",
  compatConfig: { MODE: 3 },
  setup() {
    var e;
    const {
      id: t,
      connectionMode: n,
      connectionStartHandle: o,
      connectionEndHandle: s,
      connectionPosition: i,
      connectionLineType: r,
      connectionLineStyle: l,
      connectionLineOptions: a,
      connectionStatus: c,
      viewport: d,
      findNode: f
    } = je(), h = (e = Lt(yi)) == null ? void 0 : e["connection-line"], v = ae(() => {
      var D;
      return f((D = o.value) == null ? void 0 : D.nodeId);
    }), w = ae(() => {
      var D;
      return f((D = s.value) == null ? void 0 : D.nodeId) ?? null;
    }), x = ae(() => ({
      x: (i.value.x - d.value.x) / d.value.zoom,
      y: (i.value.y - d.value.y) / d.value.zoom
    })), I = ae(
      () => a.value.markerStart ? `url(#${Wo(a.value.markerStart, t)})` : ""
    ), C = ae(
      () => a.value.markerEnd ? `url(#${Wo(a.value.markerEnd, t)})` : ""
    );
    return () => {
      var D, _, m, z;
      if (!v.value || !o.value)
        return null;
      const Y = o.value.handleId, q = o.value.type, j = v.value.handleBounds;
      let P = (j == null ? void 0 : j[q]) || [];
      if (n.value === Un.Loose) {
        const oe = (j == null ? void 0 : j[q === "source" ? "target" : "source"]) || [];
        P = [...P, ...oe];
      }
      if (!P)
        return null;
      const L = (Y ? P.find((oe) => oe.id === Y) : P[0]) ?? null, X = (L == null ? void 0 : L.position) || be.Top, { x: U, y: K } = Ys(v.value, L, X);
      let $ = null;
      w.value && ((D = s.value) != null && D.handleId) && (n.value === Un.Strict ? $ = ((_ = w.value.handleBounds[q === "source" ? "target" : "source"]) == null ? void 0 : _.find(
        (oe) => {
          var ue;
          return oe.id === ((ue = s.value) == null ? void 0 : ue.handleId);
        }
      )) || null : $ = ((m = [...w.value.handleBounds.source || [], ...w.value.handleBounds.target || []]) == null ? void 0 : m.find(
        (oe) => {
          var ue;
          return oe.id === ((ue = s.value) == null ? void 0 : ue.handleId);
        }
      )) || null);
      const V = ((z = s.value) == null ? void 0 : z.position) ?? (X ? px[X] : null);
      if (!X || !V)
        return null;
      const M = r.value ?? a.value.type ?? Tn.Bezier;
      let R = "";
      const G = {
        sourceX: U,
        sourceY: K,
        sourcePosition: X,
        targetX: x.value.x,
        targetY: x.value.y,
        targetPosition: V
      };
      return M === Tn.Bezier ? [R] = Vf(G) : M === Tn.Step ? [R] = Ar({
        ...G,
        borderRadius: 0
      }) : M === Tn.SmoothStep ? [R] = Ar(G) : M === Tn.SimpleBezier ? [R] = Lf(G) : R = `M${U},${K} ${x.value.x},${x.value.y}`, Ve(
        "svg",
        { class: "vue-flow__edges vue-flow__connectionline vue-flow__container" },
        Ve(
          "g",
          { class: "vue-flow__connection" },
          h ? Ve(h, {
            sourceX: U,
            sourceY: K,
            sourcePosition: X,
            targetX: x.value.x,
            targetY: x.value.y,
            targetPosition: V,
            sourceNode: v.value,
            sourceHandle: L,
            targetNode: w.value,
            targetHandle: $,
            markerEnd: C.value,
            markerStart: I.value,
            connectionStatus: c.value
          }) : Ve("path", {
            d: R,
            class: [a.value.class, c, "vue-flow__connection-path"],
            style: {
              ...l.value,
              ...a.value.style
            },
            "marker-end": C.value,
            "marker-start": I.value
          })
        )
      );
    };
  }
}), vx = hx, gx = ["id", "markerWidth", "markerHeight", "markerUnits", "orient"], mx = {
  name: "MarkerType",
  compatConfig: { MODE: 3 }
}, yx = /* @__PURE__ */ Te({
  ...mx,
  props: {
    id: {},
    type: {},
    color: { default: "none" },
    width: { default: 12.5 },
    height: { default: 12.5 },
    markerUnits: { default: "strokeWidth" },
    orient: { default: "auto-start-reverse" },
    strokeWidth: { default: 1 }
  },
  setup(e) {
    return (t, n) => (S(), O("marker", {
      id: t.id,
      class: "vue-flow__arrowhead",
      viewBox: "-10 -10 20 20",
      refX: "0",
      refY: "0",
      markerWidth: `${t.width}`,
      markerHeight: `${t.height}`,
      markerUnits: t.markerUnits,
      orient: t.orient
    }, [
      t.type === H(Nr).ArrowClosed ? (S(), O("polyline", {
        key: 0,
        style: rt({
          stroke: t.color,
          fill: t.color,
          strokeWidth: t.strokeWidth
        }),
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        points: "-5,-4 0,0 -5,4 -5,-4"
      }, null, 4)) : le("", !0),
      t.type === H(Nr).Arrow ? (S(), O("polyline", {
        key: 1,
        style: rt({
          stroke: t.color,
          strokeWidth: t.strokeWidth
        }),
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        fill: "none",
        points: "-5,-4 0,0 -5,4"
      }, null, 4)) : le("", !0)
    ], 8, gx));
  }
}), bx = { class: "vue-flow__marker vue-flow__container" }, _x = {
  name: "MarkerDefinitions",
  compatConfig: { MODE: 3 }
}, wx = /* @__PURE__ */ Te({
  ..._x,
  setup(e) {
    const { id: t, edges: n, connectionLineOptions: o, defaultMarkerColor: s } = je(), i = ae(() => {
      const r = /* @__PURE__ */ new Set(), l = [], a = (c) => {
        if (c) {
          const d = Wo(c, t);
          r.has(d) || (typeof c == "object" ? l.push({ ...c, id: d, color: c.color || s.value }) : l.push({ id: d, color: s.value, type: c }), r.add(d));
        }
      };
      for (const c of [o.value.markerEnd, o.value.markerStart])
        a(c);
      for (const c of n.value)
        for (const d of [c.markerStart, c.markerEnd])
          a(d);
      return l.sort((c, d) => c.id.localeCompare(d.id));
    });
    return (r, l) => (S(), O("svg", bx, [
      u("defs", null, [
        (S(!0), O(ye, null, Oe(i.value, (a) => (S(), et(yx, {
          id: a.id,
          key: a.id,
          type: a.type,
          color: a.color,
          width: a.width,
          height: a.height,
          markerUnits: a.markerUnits,
          "stroke-width": a.strokeWidth,
          orient: a.orient
        }, null, 8, ["id", "type", "color", "width", "height", "markerUnits", "stroke-width", "orient"]))), 128))
      ])
    ]));
  }
}), kx = {
  name: "Edges",
  compatConfig: { MODE: 3 }
}, Ex = /* @__PURE__ */ Te({
  ...kx,
  setup(e) {
    const { findNode: t, getEdges: n, elevateEdgesOnSelect: o } = je();
    return (s, i) => (S(), O(ye, null, [
      ne(wx),
      (S(!0), O(ye, null, Oe(H(n), (r) => (S(), O("svg", {
        key: r.id,
        class: "vue-flow__edges vue-flow__container",
        style: rt({ zIndex: H(q2)(r, H(t), H(o)) })
      }, [
        ne(H(fx), {
          id: r.id
        }, null, 8, ["id"])
      ], 4))), 128)),
      ne(H(vx))
    ], 64));
  }
}), xx = /* @__PURE__ */ Te({
  name: "Node",
  compatConfig: { MODE: 3 },
  props: ["id", "resizeObserver"],
  setup(e) {
    const {
      id: t,
      noPanClassName: n,
      selectNodesOnDrag: o,
      nodesSelectionActive: s,
      multiSelectionActive: i,
      emits: r,
      removeSelectedNodes: l,
      addSelectedNodes: a,
      updateNodeDimensions: c,
      onUpdateNodeInternals: d,
      getNodeTypes: f,
      nodeExtent: h,
      elevateNodesOnSelect: v,
      disableKeyboardA11y: w,
      ariaLiveMessage: x,
      snapToGrid: I,
      snapGrid: C,
      nodeDragThreshold: D,
      nodesDraggable: _,
      elementsSelectable: m,
      nodesConnectable: z,
      nodesFocusable: Y,
      hooks: q
    } = je(), j = ee(null);
    Bn(Nf, j), Bn(If, e.id);
    const P = Lt(yi), L = po(), X = Pf(), { node: U, parentNode: K } = Of(e.id), { emit: $, on: V } = lE(U, r), M = He(() => typeof U.draggable > "u" ? _.value : U.draggable), R = He(() => typeof U.selectable > "u" ? m.value : U.selectable), G = He(() => typeof U.connectable > "u" ? z.value : U.connectable), oe = He(() => typeof U.focusable > "u" ? Y.value : U.focusable), ue = He(
      () => R.value || M.value || q.value.nodeClick.hasListeners() || q.value.nodeDoubleClick.hasListeners() || q.value.nodeMouseEnter.hasListeners() || q.value.nodeMouseMove.hasListeners() || q.value.nodeMouseLeave.hasListeners()
    ), de = He(() => !!U.dimensions.width && !!U.dimensions.height), re = ae(() => {
      const k = U.type || "default", E = P == null ? void 0 : P[`node-${k}`];
      if (E)
        return E;
      let B = U.template || f.value[k];
      if (typeof B == "string" && L) {
        const W = Object.keys(L.appContext.components);
        W && W.includes(k) && (B = Ec(k, !1));
      }
      return B && typeof B != "string" ? B : (r.error(new tt(Ze.NODE_TYPE_MISSING, B)), !1);
    }), fe = Mf({
      id: e.id,
      el: j,
      disabled: () => !M.value,
      selectable: R,
      dragHandle: () => U.dragHandle,
      onStart(k) {
        $.dragStart(k);
      },
      onDrag(k) {
        $.drag(k);
      },
      onStop(k) {
        $.dragStop(k);
      },
      onClick(k) {
        y(k);
      }
    }), ce = ae(() => U.class instanceof Function ? U.class(U) : U.class), he = ae(() => {
      const k = (U.style instanceof Function ? U.style(U) : U.style) || {}, E = U.width instanceof Function ? U.width(U) : U.width, B = U.height instanceof Function ? U.height(U) : U.height;
      return !k.width && E && (k.width = typeof E == "string" ? E : `${E}px`), !k.height && B && (k.height = typeof B == "string" ? B : `${B}px`), k;
    }), te = He(() => Number(U.zIndex ?? he.value.zIndex ?? 0));
    return d((k) => {
      (k.includes(e.id) || !k.length) && xe();
    }), lt(() => {
      Ne(
        () => U.hidden,
        (k = !1, E, B) => {
          !k && j.value && (e.resizeObserver.observe(j.value), B(() => {
            j.value && e.resizeObserver.unobserve(j.value);
          }));
        },
        { immediate: !0, flush: "post" }
      );
    }), Ne([() => U.type, () => U.sourcePosition, () => U.targetPosition], () => {
      ot(() => {
        c([{ id: e.id, nodeElement: j.value, forceUpdate: !0 }]);
      });
    }), Ne(
      [
        () => U.position.x,
        () => U.position.y,
        () => {
          var k;
          return (k = K.value) == null ? void 0 : k.computedPosition.x;
        },
        () => {
          var k;
          return (k = K.value) == null ? void 0 : k.computedPosition.y;
        },
        () => {
          var k;
          return (k = K.value) == null ? void 0 : k.computedPosition.z;
        },
        te,
        () => U.selected,
        () => U.dimensions.height,
        () => U.dimensions.width,
        () => {
          var k;
          return (k = K.value) == null ? void 0 : k.dimensions.height;
        },
        () => {
          var k;
          return (k = K.value) == null ? void 0 : k.dimensions.width;
        }
      ],
      ([k, E, B, W, Q, A]) => {
        const N = {
          x: k,
          y: E,
          z: A + (v.value && U.selected ? 1e3 : 0)
        };
        typeof B < "u" && typeof W < "u" ? U.computedPosition = F2({ x: B, y: W, z: Q }, N) : U.computedPosition = N;
      },
      { flush: "post", immediate: !0 }
    ), Ne([() => U.extent, h], ([k, E], [B, W]) => {
      (k !== B || E !== W) && _e();
    }), U.extent === "parent" || typeof U.extent == "object" && "range" in U.extent && U.extent.range === "parent" ? _r(() => de).toBe(!0).then(_e) : _e(), () => U.hidden ? null : Ve(
      "div",
      {
        ref: j,
        "data-id": U.id,
        class: [
          "vue-flow__node",
          `vue-flow__node-${re.value === !1 ? "default" : U.type || "default"}`,
          {
            [n.value]: M.value,
            dragging: fe == null ? void 0 : fe.value,
            draggable: M.value,
            selected: U.selected,
            selectable: R.value,
            parent: U.isParent
          },
          ce.value
        ],
        style: {
          visibility: de.value ? "visible" : "hidden",
          zIndex: U.computedPosition.z ?? te.value,
          transform: `translate(${U.computedPosition.x}px,${U.computedPosition.y}px)`,
          pointerEvents: ue.value ? "all" : "none",
          ...he.value
        },
        tabIndex: oe.value ? 0 : void 0,
        role: oe.value ? "button" : void 0,
        "aria-describedby": w.value ? void 0 : `${cf}-${t}`,
        "aria-label": U.ariaLabel,
        onMouseenter: we,
        onMousemove: ke,
        onMouseleave: J,
        onContextmenu: p,
        onClick: y,
        onDblclick: T,
        onKeydown: b
      },
      [
        Ve(re.value === !1 ? f.value.default : re.value, {
          id: U.id,
          type: U.type,
          data: U.data,
          events: { ...U.events, ...V },
          selected: U.selected,
          resizing: U.resizing,
          dragging: fe.value,
          connectable: G.value,
          position: U.computedPosition,
          dimensions: U.dimensions,
          isValidTargetPos: U.isValidTargetPos,
          isValidSourcePos: U.isValidSourcePos,
          parent: U.parentNode,
          parentNodeId: U.parentNode,
          zIndex: U.computedPosition.z ?? te.value,
          targetPosition: U.targetPosition,
          sourcePosition: U.sourcePosition,
          label: U.label,
          dragHandle: U.dragHandle,
          onUpdateNodeInternals: xe
        })
      ]
    );
    function _e() {
      const k = U.computedPosition, { computedPosition: E, position: B } = pl(
        U,
        I.value ? gi(k, C.value) : k,
        r.error,
        h.value,
        K.value
      );
      (U.computedPosition.x !== E.x || U.computedPosition.y !== E.y) && (U.computedPosition = { ...U.computedPosition, ...E }), (U.position.x !== B.x || U.position.y !== B.y) && (U.position = B);
    }
    function xe() {
      j.value && c([{ id: e.id, nodeElement: j.value, forceUpdate: !0 }]);
    }
    function we(k) {
      fe != null && fe.value || $.mouseEnter({ event: k, node: U });
    }
    function ke(k) {
      fe != null && fe.value || $.mouseMove({ event: k, node: U });
    }
    function J(k) {
      fe != null && fe.value || $.mouseLeave({ event: k, node: U });
    }
    function p(k) {
      return $.contextMenu({ event: k, node: U });
    }
    function T(k) {
      return $.doubleClick({ event: k, node: U });
    }
    function y(k) {
      R.value && (!o.value || !M.value || D.value > 0) && Pr(
        U,
        i.value,
        a,
        l,
        s,
        !1,
        j.value
      ), $.click({ event: k, node: U });
    }
    function b(k) {
      if (!(Mr(k) || w.value))
        if (ff.includes(k.key) && R.value) {
          const E = k.key === "Escape";
          Pr(
            U,
            i.value,
            a,
            l,
            s,
            E,
            j.value
          );
        } else M.value && U.selected && so[k.key] && (k.preventDefault(), x.value = `Moved selected node ${k.key.replace("Arrow", "").toLowerCase()}. New position, x: ${~~U.position.x}, y: ${~~U.position.y}`, X(
          {
            x: so[k.key].x,
            y: so[k.key].y
          },
          k.shiftKey
        ));
    }
  }
}), Cx = xx;
function Sx(e = { includeHiddenNodes: !1 }) {
  const { nodes: t } = je();
  return ae(() => {
    if (t.value.length === 0)
      return !1;
    for (const n of t.value)
      if ((e.includeHiddenNodes || !n.hidden) && ((n == null ? void 0 : n.handleBounds) === void 0 || n.dimensions.width === 0 || n.dimensions.height === 0))
        return !1;
    return !0;
  });
}
const $x = { class: "vue-flow__nodes vue-flow__container" }, Ix = {
  name: "Nodes",
  compatConfig: { MODE: 3 }
}, Nx = /* @__PURE__ */ Te({
  ...Ix,
  setup(e) {
    const { getNodes: t, updateNodeDimensions: n, emits: o } = je(), s = Sx(), i = ee();
    return Ne(
      s,
      (r) => {
        r && ot(() => {
          o.nodesInitialized(t.value);
        });
      },
      { immediate: !0 }
    ), lt(() => {
      i.value = new ResizeObserver((r) => {
        const l = r.map((a) => ({
          id: a.target.getAttribute("data-id"),
          nodeElement: a.target,
          forceUpdate: !0
        }));
        ot(() => n(l));
      });
    }), sn(() => {
      var r;
      return (r = i.value) == null ? void 0 : r.disconnect();
    }), (r, l) => (S(), O("div", $x, [
      i.value ? (S(!0), O(ye, { key: 0 }, Oe(H(t), (a, c, d, f) => {
        const h = [a.id];
        if (f && f.key === a.id && Rh(f, h))
          return f;
        const v = (S(), et(H(Cx), {
          id: a.id,
          key: a.id,
          "resize-observer": i.value
        }, null, 8, ["id", "resize-observer"]));
        return v.memo = h, v;
      }, l, 0), 128)) : le("", !0)
    ]));
  }
});
function Mx() {
  const { emits: e } = je();
  lt(() => {
    if ($f()) {
      const t = document.querySelector(".vue-flow__pane");
      t && window.getComputedStyle(t).zIndex !== "1" && e.error(new tt(Ze.MISSING_STYLES));
    }
  });
}
const Tx = /* @__PURE__ */ u("div", { class: "vue-flow__edge-labels" }, null, -1), Ox = {
  name: "VueFlow",
  compatConfig: { MODE: 3 }
}, Px = /* @__PURE__ */ Te({
  ...Ox,
  props: {
    id: {},
    modelValue: {},
    nodes: {},
    edges: {},
    edgeTypes: {},
    nodeTypes: {},
    connectionMode: {},
    connectionLineType: {},
    connectionLineStyle: { default: void 0 },
    connectionLineOptions: { default: void 0 },
    connectionRadius: {},
    isValidConnection: { type: [Function, null], default: void 0 },
    deleteKeyCode: { default: void 0 },
    selectionKeyCode: { type: [Boolean, null], default: void 0 },
    multiSelectionKeyCode: { default: void 0 },
    zoomActivationKeyCode: { default: void 0 },
    panActivationKeyCode: { default: void 0 },
    snapToGrid: { type: Boolean, default: void 0 },
    snapGrid: {},
    onlyRenderVisibleElements: { type: Boolean, default: void 0 },
    edgesUpdatable: { type: [Boolean, String], default: void 0 },
    nodesDraggable: { type: Boolean, default: void 0 },
    nodesConnectable: { type: Boolean, default: void 0 },
    nodeDragThreshold: {},
    elementsSelectable: { type: Boolean, default: void 0 },
    selectNodesOnDrag: { type: Boolean, default: void 0 },
    panOnDrag: { type: [Boolean, Array], default: void 0 },
    minZoom: {},
    maxZoom: {},
    defaultViewport: {},
    translateExtent: {},
    nodeExtent: {},
    defaultMarkerColor: {},
    zoomOnScroll: { type: Boolean, default: void 0 },
    zoomOnPinch: { type: Boolean, default: void 0 },
    panOnScroll: { type: Boolean, default: void 0 },
    panOnScrollSpeed: {},
    panOnScrollMode: {},
    paneClickDistance: {},
    zoomOnDoubleClick: { type: Boolean, default: void 0 },
    preventScrolling: { type: Boolean, default: void 0 },
    selectionMode: {},
    edgeUpdaterRadius: {},
    fitViewOnInit: { type: Boolean, default: void 0 },
    connectOnClick: { type: Boolean, default: void 0 },
    applyDefault: { type: Boolean, default: void 0 },
    autoConnect: { type: [Boolean, Function], default: void 0 },
    noDragClassName: {},
    noWheelClassName: {},
    noPanClassName: {},
    defaultEdgeOptions: {},
    elevateEdgesOnSelect: { type: Boolean, default: void 0 },
    elevateNodesOnSelect: { type: Boolean, default: void 0 },
    disableKeyboardA11y: { type: Boolean, default: void 0 },
    edgesFocusable: { type: Boolean, default: void 0 },
    nodesFocusable: { type: Boolean, default: void 0 },
    autoPanOnConnect: { type: Boolean, default: void 0 },
    autoPanOnNodeDrag: { type: Boolean, default: void 0 },
    autoPanSpeed: {}
  },
  emits: ["nodesChange", "edgesChange", "nodesInitialized", "paneReady", "init", "updateNodeInternals", "error", "connect", "connectStart", "connectEnd", "clickConnectStart", "clickConnectEnd", "moveStart", "move", "moveEnd", "selectionDragStart", "selectionDrag", "selectionDragStop", "selectionContextMenu", "selectionStart", "selectionEnd", "viewportChangeStart", "viewportChange", "viewportChangeEnd", "paneScroll", "paneClick", "paneContextMenu", "paneMouseEnter", "paneMouseMove", "paneMouseLeave", "edgeUpdate", "edgeContextMenu", "edgeMouseEnter", "edgeMouseMove", "edgeMouseLeave", "edgeDoubleClick", "edgeClick", "edgeUpdateStart", "edgeUpdateEnd", "nodeContextMenu", "nodeMouseEnter", "nodeMouseMove", "nodeMouseLeave", "nodeDoubleClick", "nodeClick", "nodeDragStart", "nodeDrag", "nodeDragStop", "miniMapNodeClick", "miniMapNodeDoubleClick", "miniMapNodeMouseEnter", "miniMapNodeMouseMove", "miniMapNodeMouseLeave", "update:modelValue", "update:nodes", "update:edges"],
  setup(e, { expose: t, emit: n }) {
    const o = e, s = Zp(), i = Bi(o, "modelValue", n), r = Bi(o, "nodes", n), l = Bi(o, "edges", n), a = je(o), c = cE({ modelValue: i, nodes: r, edges: l }, o, a);
    return fE(n, a.hooks), ax(), Mx(), Bn(yi, s), si(() => {
      c();
    }), t(a), (d, f) => (S(), O("div", {
      ref: H(a).vueFlowRef,
      class: "vue-flow"
    }, [
      ne(nx, null, {
        default: bn(() => [
          ne(Ex),
          Tx,
          ne(Nx),
          Fn(d.$slots, "zoom-pane")
        ]),
        _: 3
      }),
      Fn(d.$slots, "default"),
      ne(lx)
    ], 512));
  }
}), Ax = { class: "graph-node-head" }, Dx = {
  key: 0,
  class: "level-tag"
}, Rx = ["aria-pressed", "aria-label"], Qi = /* @__PURE__ */ Te({
  __name: "GraphNodeCard",
  props: {
    data: {},
    selected: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = { persona: hv, profile: gr, memory: vv, rag: bv, voice: kv, live2d: Sv, extensions: _v, skill: Cv, tool: Tv, mcp: xv }, i = !!n.data.configurable && n.data.level > 0;
    return (r, l) => (S(), O("article", {
      class: me(["graph-node", [`kind-${r.data.kind}`, `status-${r.data.status}`, { selected: r.selected }]])
    }, [
      ne(H(_n), {
        id: "left-target",
        type: "target",
        position: H(be).Left,
        class: "graph-handle"
      }, null, 8, ["position"]),
      ne(H(_n), {
        id: "left-source",
        type: "source",
        position: H(be).Left,
        class: "graph-handle"
      }, null, 8, ["position"]),
      ne(H(_n), {
        id: "right-target",
        type: "target",
        position: H(be).Right,
        class: "graph-handle"
      }, null, 8, ["position"]),
      ne(H(_n), {
        id: "right-source",
        type: "source",
        position: H(be).Right,
        class: "graph-handle"
      }, null, 8, ["position"]),
      u("div", Ax, [
        (S(), et(Cc(s[r.data.kind]), { size: 16 })),
        u("b", null, F(r.data.label), 1),
        r.data.kind === "skill" || r.data.kind === "tool" ? (S(), O("span", Dx, "L" + F(r.data.level), 1)) : le("", !0)
      ]),
      u("p", null, F(r.data.summary), 1),
      u("footer", null, [
        u("span", null, F(r.data.status === "available" ? "可用" : r.data.status === "unassigned" ? "未分配" : r.data.status === "partial" ? "部分可用" : "不可用"), 1),
        H(i) ? (S(), O("button", {
          key: 0,
          type: "button",
          class: me(["graph-switch", { on: r.data.assigned }]),
          "aria-pressed": !!r.data.assigned,
          "aria-label": `${r.data.label}能力开关`,
          onClick: l[0] || (l[0] = mt((a) => o("toggle"), ["stop"]))
        }, l[1] || (l[1] = [
          u("i", null, null, -1)
        ]), 10, Rx)) : le("", !0)
      ])
    ], 2));
  }
}), Vx = /* @__PURE__ */ Te({
  __name: "BraceEdge",
  props: {
    sourceX: {},
    sourceY: {},
    targetX: {},
    targetY: {},
    selected: { type: Boolean }
  },
  setup(e) {
    const t = e, n = ae(() => {
      const o = t.targetX >= t.sourceX ? 1 : -1, s = Math.abs(t.targetX - t.sourceX), i = Math.min(86, s * 0.34), r = (t.sourceX + t.targetX) / 2, l = (t.sourceY + t.targetY) / 2;
      return `M ${t.sourceX} ${t.sourceY} C ${t.sourceX + o * i} ${t.sourceY}, ${r} ${t.sourceY}, ${r} ${l} C ${r} ${t.targetY}, ${t.targetX - o * i} ${t.targetY}, ${t.targetX} ${t.targetY}`;
    });
    return (o, s) => (S(), et(H(ss), {
      path: n.value,
      class: me({ selected: o.selected })
    }, null, 8, ["path", "class"]));
  }
}), Lx = {
  class: "graph-stage",
  "aria-label": "角色能力架构画布"
}, zx = {
  class: "graph-tools",
  "aria-label": "画布工具"
}, Fx = /* @__PURE__ */ Te({
  __name: "RoleGraphCanvas",
  props: {
    graph: {},
    selectedNodeId: {}
  },
  emits: ["select", "toggle", "reset"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = ee([]), i = ee([]), { fitView: r, zoomIn: l, zoomOut: a } = je({ id: "role-architecture" }), c = ee(!1);
    function d() {
      return new Promise((_) => requestAnimationFrame(() => requestAnimationFrame(() => _())));
    }
    function f(_) {
      const m = /* @__PURE__ */ new Set([_]), z = [_];
      for (; z.length; ) {
        const Y = z.shift();
        for (const q of i.value)
          q.source !== Y || m.has(q.target) || (m.add(q.target), z.push(q.target));
      }
      return m;
    }
    function h(_) {
      var Y;
      let m = _;
      const z = /* @__PURE__ */ new Set();
      for (; !z.has(m); ) {
        z.add(m);
        const q = (Y = i.value.find((j) => j.target === m)) == null ? void 0 : Y.source;
        if (!q) return;
        if (q === "module:extensions") return m;
        m = q;
      }
    }
    async function v(_, m) {
      !c.value || !_.length || (await ot(), await d(), await r({ nodes: _, ...m }));
    }
    function w(_ = 220) {
      const m = s.value.filter((z) => z.data.kind === "persona" || ["profile", "memory", "rag", "voice", "live2d", "extensions"].includes(z.data.kind));
      return v(m.map((z) => z.id), { padding: 0.18, minZoom: 0.68, maxZoom: 1.08, duration: _ });
    }
    function x(_ = 220) {
      if (n.selectedNodeId === "module:extensions") {
        const z = s.value.filter((Y) => Y.id === "module:extensions" || ["skill", "tool"].includes(Y.data.kind));
        return v(z.map((Y) => Y.id), { padding: 0.16, minZoom: 0.38, maxZoom: 0.86, duration: _ });
      }
      const m = h(n.selectedNodeId);
      if (m) {
        const z = f(m);
        return z.add("module:extensions"), v([...z], { padding: 0.24, minZoom: 0.58, maxZoom: 1, duration: _ });
      }
      return w(_);
    }
    Ne(() => n.graph, async (_) => {
      s.value = _.nodes.map((m) => ({ ...m, selected: m.id === n.selectedNodeId })), i.value = _.edges.map((m) => ({ ...m, type: "brace", animated: !1 })), await ot(), await x();
    }, { immediate: !0, deep: !0 }), Ne(() => n.selectedNodeId, (_) => s.value = s.value.map((m) => ({ ...m, selected: m.id === _ })));
    function I(_) {
      o("select", _.node.id);
    }
    async function C() {
      o("reset"), await ot(), w();
    }
    async function D() {
      c.value = !0, await x(0);
    }
    return (_, m) => (S(), O("section", Lx, [
      u("div", zx, [
        u("button", {
          type: "button",
          title: "放大",
          onClick: m[0] || (m[0] = () => H(l)())
        }, [
          ne(H(Uo), { size: 16 })
        ]),
        u("button", {
          type: "button",
          title: "缩小",
          onClick: m[1] || (m[1] = () => H(a)())
        }, [
          ne(H(Ev), { size: 16 })
        ]),
        u("button", {
          type: "button",
          title: "适应视图",
          onClick: m[2] || (m[2] = (z) => H(r)({ padding: 0.15, duration: 220 }))
        }, [
          ne(H(wv), { size: 16 })
        ]),
        u("button", {
          type: "button",
          title: "恢复自动布局",
          onClick: C
        }, [
          ne(H(el), { size: 16 })
        ])
      ]),
      ne(H(Px), {
        id: "role-architecture",
        nodes: s.value,
        "onUpdate:nodes": m[3] || (m[3] = (z) => s.value = z),
        edges: i.value,
        "onUpdate:edges": m[4] || (m[4] = (z) => i.value = z),
        "min-zoom": 0.32,
        "max-zoom": 1.8,
        "fit-view-on-init": !1,
        onInit: D,
        onNodeClick: I
      }, {
        "node-persona": bn((z) => [
          ne(Qi, Ei(Cs(z)), null, 16)
        ]),
        "node-module": bn((z) => [
          ne(Qi, Ei(Cs(z)), null, 16)
        ]),
        "node-capability": bn((z) => [
          ne(Qi, Qr(z, {
            onToggle: (Y) => o("toggle", z.id)
          }), null, 16, ["onToggle"])
        ]),
        "edge-brace": bn((z) => [
          ne(Vx, Ei(Cs(z)), null, 16)
        ]),
        _: 1
      }, 8, ["nodes", "edges"])
    ]));
  }
}), Bx = ["disabled", "aria-expanded"], Hx = {
  key: 0,
  id: "manage-role-menu",
  class: "role-picker-menu"
}, Ux = { class: "role-search" }, jx = {
  class: "role-list",
  role: "listbox",
  "aria-label": "选择角色"
}, Gx = ["aria-selected", "disabled", "onClick"], qx = {
  key: 0,
  class: "role-empty"
}, Yx = /* @__PURE__ */ Te({
  __name: "RoleNavigator",
  props: {
    personas: {},
    selectedId: {},
    disabled: { type: Boolean }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = ee(null), i = ee(null), r = ee(!1), l = ee(""), a = ae(() => n.personas.filter((w) => w.name.toLowerCase().includes(l.value.trim().toLowerCase()))), c = ae(() => n.personas.find((w) => w.id === n.selectedId));
    async function d() {
      n.disabled || (r.value = !r.value, r.value && await ot(() => {
        var w;
        return (w = i.value) == null ? void 0 : w.focus();
      }));
    }
    function f(w) {
      o("select", w), r.value = !1, l.value = "";
    }
    function h(w) {
      var x;
      (x = s.value) != null && x.contains(w.target) || (r.value = !1);
    }
    function v(w) {
      w.key === "Escape" && (r.value = !1);
    }
    return Ne(() => n.disabled, (w) => {
      w && (r.value = !1);
    }), lt(() => {
      document.addEventListener("pointerdown", h), document.addEventListener("keydown", v);
    }), sn(() => {
      document.removeEventListener("pointerdown", h), document.removeEventListener("keydown", v);
    }), (w, x) => {
      var I;
      return S(), O("div", {
        ref_key: "root",
        ref: s,
        class: "role-picker"
      }, [
        u("button", {
          type: "button",
          class: "role-picker-trigger",
          disabled: w.disabled || !w.personas.length,
          "aria-haspopup": "listbox",
          "aria-expanded": r.value,
          "aria-controls": "manage-role-menu",
          onClick: d
        }, [
          ne(H(gr), { size: 17 }),
          u("strong", null, F(((I = c.value) == null ? void 0 : I.name) || "角色管理"), 1),
          ne(H(mv), { size: 15 })
        ], 8, Bx),
        r.value ? (S(), O("div", Hx, [
          u("label", Ux, [
            ne(H(hr), { size: 15 }),
            Ie(u("input", {
              ref_key: "searchInput",
              ref: i,
              "onUpdate:modelValue": x[0] || (x[0] = (C) => l.value = C),
              placeholder: "查找角色",
              "aria-label": "查找角色"
            }, null, 512), [
              [Re, l.value]
            ])
          ]),
          u("div", jx, [
            (S(!0), O(ye, null, Oe(a.value, (C) => {
              var D;
              return S(), O("button", {
                key: C.id,
                type: "button",
                role: "option",
                "aria-selected": C.id === w.selectedId,
                disabled: w.disabled,
                class: me({ active: C.id === w.selectedId }),
                onClick: (_) => f(C.id)
              }, [
                ne(H(gr), { size: 17 }),
                u("span", null, [
                  u("b", null, F(C.name), 1),
                  u("small", null, F(((D = C.profile) == null ? void 0 : D.description) || "尚未填写人设"), 1)
                ])
              ], 10, Gx);
            }), 128)),
            a.value.length ? le("", !0) : (S(), O("p", qx, "没有匹配的角色"))
          ])
        ])) : le("", !0)
      ], 512);
    };
  }
}), Xx = { class: "version-panel-layer" }, Kx = {
  class: "version-panel",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "version-panel-title"
}, Wx = { class: "version-panel-header" }, Zx = { class: "version-panel-kicker" }, Jx = { id: "version-panel-title" }, Qx = {
  key: 0,
  class: "version-message is-error"
}, eC = { class: "version-panel-toolbar" }, tC = ["disabled"], nC = ["disabled"], oC = {
  key: 0,
  class: "version-form-hint"
}, sC = { class: "version-form-actions" }, iC = ["disabled"], rC = ["disabled"], lC = {
  key: 2,
  class: "version-empty"
}, aC = {
  key: 3,
  class: "version-empty"
}, uC = {
  key: 4,
  class: "version-body"
}, cC = {
  class: "version-list",
  role: "listbox",
  "aria-label": "角色版本历史"
}, dC = ["aria-selected", "disabled", "onClick"], fC = { class: "version-number" }, pC = { class: "version-item-copy" }, hC = { class: "version-detail" }, vC = { class: "version-detail-heading" }, gC = {
  key: 0,
  class: "version-note"
}, mC = {
  key: 1,
  class: "version-detail-loading"
}, yC = {
  key: 2,
  class: "version-facts"
}, bC = {
  key: 3,
  class: "version-detail-loading"
}, _C = { class: "version-action-row" }, wC = ["disabled"], kC = ["disabled"], EC = {
  key: 2,
  class: "version-current"
}, xC = {
  key: 4,
  class: "version-published"
}, CC = {
  key: 5,
  class: "version-panel-footnote"
}, SC = /* @__PURE__ */ Te({
  __name: "VersionPanel",
  props: {
    personaId: {},
    personaName: {},
    disabled: { type: Boolean }
  },
  emits: ["close", "changed"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = ee([]), i = ee(""), r = ee(null), l = ee(!1), a = ee(!1), c = ee(""), d = ee(""), f = ee(!1), h = ee(""), v = ee("");
    let w = 0;
    const x = ae(() => l.value || a.value || !!c.value), I = ae(() => s.value.find((M) => M.id === i.value)), C = ae(() => {
      var M;
      return (M = r.value) == null ? void 0 : M.snapshot;
    }), D = ae(() => {
      var M;
      return Object.keys(((M = C.value) == null ? void 0 : M.capability_overrides) || {}).length;
    }), _ = ae(() => {
      var M, R;
      return ((R = (M = C.value) == null ? void 0 : M.document_ids) == null ? void 0 : R.length) || 0;
    }), m = ae(() => {
      var M;
      return ((M = C.value) == null ? void 0 : M.mcp_server_names) || [];
    });
    function z(M) {
      return { draft: "草稿", published: "已发布", superseded: "已替代", archived: "已归档" }[M] || M;
    }
    function Y(M) {
      return `is-${M}`;
    }
    function q(M) {
      if (!M) return "—";
      const R = new Date(M);
      return Number.isNaN(R.getTime()) ? M : new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(R);
    }
    function j(M) {
      return M instanceof tl && M.status === 404 ? "版本接口尚未启用，请先启用角色版本 API。" : M instanceof Error ? M.message : String(M);
    }
    async function P() {
      const M = ++w;
      if (s.value = [], i.value = "", r.value = null, d.value = "", !!n.personaId) {
        l.value = !0;
        try {
          const R = await Yv(n.personaId);
          if (M !== w) return;
          s.value = R, R.length && await L(R[0].id, M);
        } catch (R) {
          M === w && (d.value = j(R));
        } finally {
          M === w && (l.value = !1);
        }
      }
    }
    async function L(M, R = w) {
      i.value = M, r.value = null, d.value = "", a.value = !0;
      try {
        const G = await Xv(n.personaId, M);
        R === w && (r.value = G);
      } catch (G) {
        R === w && (d.value = j(G));
      } finally {
        R === w && (a.value = !1);
      }
    }
    function X() {
      var M;
      n.disabled || x.value || (f.value = !0, h.value = `版本 ${Math.max(((M = s.value[0]) == null ? void 0 : M.version_number) || 0, 0) + 1}`, v.value = "");
    }
    function U() {
      c.value || (f.value = !1);
    }
    async function K() {
      if (!(n.disabled || x.value)) {
        c.value = "create", d.value = "";
        try {
          const M = await Kv(n.personaId, { label: h.value, note: v.value });
          f.value = !1, s.value = [M, ...s.value.filter((R) => R.id !== M.id)], i.value = M.id, r.value = M, o("changed", M);
        } catch (M) {
          d.value = j(M);
        } finally {
          c.value = "";
        }
      }
    }
    function $(M) {
      s.value = s.value.map((R) => R.id === M.id ? M : R), i.value = M.id, r.value = M;
    }
    async function V(M) {
      const R = i.value;
      if (!(!R || n.disabled || x.value) && !(M === "rollback" && !window.confirm("确定回滚到这个角色版本？当前未保存的运行配置不会自动保留。"))) {
        c.value = R, d.value = "";
        try {
          const G = M === "publish" ? await Wv(n.personaId, R) : await Zv(n.personaId, R);
          $(G), o("changed", G), await P();
        } catch (G) {
          d.value = j(G);
        } finally {
          c.value = "";
        }
      }
    }
    return Ne(() => n.personaId, () => {
      P();
    }, { immediate: !0 }), (M, R) => {
      var G, oe, ue, de, re, fe, ce;
      return S(), O("div", Xx, [
        u("button", {
          type: "button",
          class: "version-panel-backdrop",
          "aria-label": "关闭版本面板",
          onClick: R[0] || (R[0] = (he) => o("close"))
        }),
        u("section", Kx, [
          u("header", Wx, [
            u("div", null, [
              u("span", Zx, [
                ne(H(td), { size: 13 }),
                R[6] || (R[6] = ve("运行版本"))
              ]),
              u("h2", Jx, F(M.personaName || "当前角色"), 1),
              R[7] || (R[7] = u("p", null, "保存和切换角色的运行配置", -1))
            ]),
            u("button", {
              type: "button",
              class: "icon-button",
              "aria-label": "关闭版本面板",
              onClick: R[1] || (R[1] = (he) => o("close"))
            }, [
              ne(H(Rt), { size: 17 })
            ])
          ]),
          d.value ? (S(), O("p", Qx, F(d.value), 1)) : le("", !0),
          u("div", eC, [
            u("span", null, F(s.value.length ? `${s.value.length} 个版本` : "版本历史"), 1),
            u("div", null, [
              u("button", {
                type: "button",
                class: "text-button",
                disabled: x.value,
                onClick: P
              }, [
                ne(H(zt), { size: 14 }),
                R[8] || (R[8] = ve("刷新"))
              ], 8, tC),
              u("button", {
                type: "button",
                class: "text-button is-primary",
                disabled: M.disabled || x.value,
                onClick: X
              }, [
                ne(H(Uo), { size: 14 }),
                R[9] || (R[9] = ve("创建"))
              ], 8, nC)
            ])
          ]),
          f.value ? (S(), O("form", {
            key: 1,
            class: "version-create-form",
            onSubmit: mt(K, ["prevent"])
          }, [
            u("label", null, [
              R[10] || (R[10] = u("span", null, "版本名称", -1)),
              Ie(u("input", {
                "onUpdate:modelValue": R[2] || (R[2] = (he) => h.value = he),
                maxlength: "255",
                placeholder: "例如：稳定版"
              }, null, 512), [
                [Re, h.value]
              ])
            ]),
            u("label", null, [
              R[11] || (R[11] = u("span", null, "备注", -1)),
              Ie(u("textarea", {
                "onUpdate:modelValue": R[3] || (R[3] = (he) => v.value = he),
                rows: "2",
                maxlength: "5000",
                placeholder: "记录这次配置的变化"
              }, null, 512), [
                [Re, v.value]
              ])
            ]),
            M.disabled ? (S(), O("p", oC, "请先保存顶部的角色配置，再创建版本。")) : le("", !0),
            u("div", sC, [
              u("button", {
                type: "button",
                class: "text-button",
                disabled: !!c.value,
                onClick: U
              }, "取消", 8, iC),
              u("button", {
                type: "submit",
                class: "text-button is-primary",
                disabled: M.disabled || x.value
              }, F(c.value === "create" ? "创建中…" : "保存版本"), 9, rC)
            ])
          ], 32)) : le("", !0),
          l.value ? (S(), O("div", lC, "正在读取版本历史…")) : !s.value.length && !d.value ? (S(), O("div", aC, [
            ne(H(pv), { size: 22 }),
            R[12] || (R[12] = u("strong", null, "还没有保存的运行版本", -1)),
            R[13] || (R[13] = u("span", null, "创建版本会记录当前已保存的角色配置。", -1))
          ])) : s.value.length ? (S(), O("div", uC, [
            u("div", cC, [
              (S(!0), O(ye, null, Oe(s.value, (he) => (S(), O("button", {
                key: he.id,
                type: "button",
                class: me(["version-item", { selected: he.id === i.value }]),
                "aria-selected": he.id === i.value,
                role: "option",
                disabled: x.value,
                onClick: (te) => L(he.id)
              }, [
                u("span", fC, "v" + F(he.version_number), 1),
                u("span", pC, [
                  u("strong", null, F(he.label || `版本 ${he.version_number}`), 1),
                  u("small", null, F(q(he.created_at)), 1)
                ]),
                u("span", {
                  class: me(["version-status", Y(he.status)])
                }, F(z(he.status)), 3)
              ], 10, dC))), 128))
            ]),
            u("div", hC, [
              u("div", vC, [
                u("div", null, [
                  R[14] || (R[14] = u("span", null, "当前选择", -1)),
                  u("strong", null, F(((G = I.value) == null ? void 0 : G.label) || `版本 ${((oe = I.value) == null ? void 0 : oe.version_number) || ""}`), 1)
                ]),
                u("span", {
                  class: me(["version-status", Y(((ue = I.value) == null ? void 0 : ue.status) || "draft")])
                }, F(z(((de = I.value) == null ? void 0 : de.status) || "draft")), 3)
              ]),
              (re = I.value) != null && re.note ? (S(), O("p", gC, F(I.value.note), 1)) : le("", !0),
              a.value ? (S(), O("div", mC, "正在读取快照…")) : C.value ? (S(), O("dl", yC, [
                u("div", null, [
                  R[15] || (R[15] = u("dt", null, "角色名称", -1)),
                  u("dd", null, F(C.value.name), 1)
                ]),
                u("div", null, [
                  R[16] || (R[16] = u("dt", null, "知识库", -1)),
                  u("dd", null, F(C.value.knowledge_space_id || "未绑定"), 1)
                ]),
                u("div", null, [
                  R[17] || (R[17] = u("dt", null, "资料", -1)),
                  u("dd", null, F(_.value) + " 份资料", 1)
                ]),
                u("div", null, [
                  R[18] || (R[18] = u("dt", null, "能力策略", -1)),
                  u("dd", null, F(D.value) + " 项能力", 1)
                ]),
                u("div", null, [
                  R[19] || (R[19] = u("dt", null, "MCP 授权", -1)),
                  u("dd", null, F(m.value.length ? m.value.join("、") : "无"), 1)
                ])
              ])) : (S(), O("p", bC, "暂无快照详情")),
              u("div", _C, [
                ((fe = I.value) == null ? void 0 : fe.status) === "draft" ? (S(), O("button", {
                  key: 0,
                  type: "button",
                  class: "version-action is-primary",
                  disabled: M.disabled || x.value,
                  onClick: R[4] || (R[4] = (he) => V("publish"))
                }, [
                  ne(H(Iv), { size: 14 }),
                  R[20] || (R[20] = ve("发布版本"))
                ], 8, wC)) : I.value && I.value.status !== "published" ? (S(), O("button", {
                  key: 1,
                  type: "button",
                  class: "version-action",
                  disabled: M.disabled || x.value,
                  onClick: R[5] || (R[5] = (he) => V("rollback"))
                }, [
                  ne(H(el), { size: 14 }),
                  R[21] || (R[21] = ve("回滚到此版本"))
                ], 8, kC)) : (S(), O("span", EC, [
                  ne(H(Rn), { size: 14 }),
                  R[22] || (R[22] = ve("这是当前发布版本"))
                ]))
              ]),
              (ce = I.value) != null && ce.published_at ? (S(), O("p", xC, [
                ne(H(yv), { size: 13 }),
                ve("发布于 " + F(q(I.value.published_at)), 1)
              ])) : le("", !0)
            ])
          ])) : le("", !0),
          !d.value && M.disabled && s.value.length ? (S(), O("p", CC, "顶部存在未保存修改时，版本操作会暂时停用。")) : le("", !0)
        ])
      ]);
    };
  }
}), ml = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, $C = /* @__PURE__ */ ml(SC, [["__scopeId", "data-v-81aec505"]]);
function IC(e, t, n) {
  const o = {
    ...e,
    capabilities: {
      ...e.capabilities,
      overrides: { ...e.capabilities.overrides }
    },
    grants: { servers: e.grants.servers.map((r) => ({ ...r })) }
  }, s = e.capabilities.packages.find((r) => r.id === t);
  if (!s || (n === "inherit" ? delete o.capabilities.overrides[t] : o.capabilities.overrides[t] = n === "allow", n !== "allow")) return o;
  for (const r of s.dependencies)
    r.id && (o.capabilities.overrides[r.id] = !0);
  const i = new Set(s.required_servers);
  return o.grants.servers.forEach((r) => {
    !r.global && i.has(r.name) && (r.authorized = !0);
  }), o;
}
async function NC(e) {
  const t = Object.entries(e), n = await Promise.all(t.map(async ([o, s]) => {
    try {
      return await s(), { domain: o, ok: !0 };
    } catch (i) {
      return { domain: o, ok: !1, message: i instanceof Error ? i.message : String(i) };
    }
  }));
  return {
    ok: n.every((o) => o.ok),
    savedDomains: n.filter((o) => o.ok).map((o) => o.domain),
    failedDomains: n.filter((o) => !o.ok).map(({ domain: o, message: s }) => ({ domain: o, message: s }))
  };
}
function MC(e, t, n) {
  const o = Qe(e);
  return n.has("profile") && (o.persona = Qe(t.persona)), n.has("capabilities") && (o.capabilities.overrides = Qe(t.capabilities.overrides)), n.has("grants") && (o.grants.servers = Qe(t.grants.servers)), o;
}
function TC() {
  const e = ee([]), t = ee(""), n = ee(null), o = ee(null), s = ee(""), i = ee(/* @__PURE__ */ new Set()), r = ee(!1), l = ee(!1), a = ee(!1), c = ee(""), d = ee(""), f = ae(() => i.value.size > 0);
  async function h() {
    if (!r.value) {
      r.value = !0, c.value = "";
      try {
        e.value = await Ai();
        const K = t.value || sessionStorage.getItem("charactoid.manage.persona"), $ = e.value.find((V) => V.id === K) || e.value[0];
        $ && await w($.id, !0);
      } catch (K) {
        c.value = K instanceof Error ? K.message : String(K);
      } finally {
        r.value = !1;
      }
    }
  }
  async function v() {
    f.value || r.value || l.value || a.value || await h();
  }
  async function w(K, $ = !1) {
    if (!$ && (l.value || a.value)) {
      d.value = "当前操作完成后才能切换角色";
      return;
    }
    if (!$ && f.value && !window.confirm("当前角色有未保存修改，放弃后切换角色？")) return;
    const V = e.value.find((M) => M.id === K);
    if (V) {
      r.value = !0, c.value = "", d.value = "";
      try {
        const M = await Sa(V);
        n.value = M, o.value = Qe(M), t.value = K, s.value = `persona:${K}`, i.value = /* @__PURE__ */ new Set(), sessionStorage.setItem("charactoid.manage.persona", K);
      } catch (M) {
        c.value = M instanceof Error ? M.message : String(M);
      } finally {
        r.value = !1;
      }
    }
  }
  function x(K) {
    s.value = K;
  }
  function I(K) {
    o.value && (o.value.persona = Qe(K), i.value = new Set(i.value).add("profile"));
  }
  function C(K, $) {
    if (!o.value) return;
    o.value = IC(o.value, K, $);
    const V = new Set(i.value);
    V.add("capabilities"), V.add("grants"), i.value = V;
  }
  function D(K, $) {
    if (!o.value) return;
    const V = o.value.grants.servers.find((M) => M.name === K);
    V && !V.global && (V.authorized = $), i.value = new Set(i.value).add("grants");
  }
  function _() {
    n.value && (o.value = Qe(n.value), i.value = /* @__PURE__ */ new Set(), d.value = "已撤销本轮修改");
  }
  async function m() {
    if (!o.value || !n.value) return;
    const K = await id(o.value.persona.id);
    o.value.documents = K, n.value.documents = Qe(K);
  }
  async function z() {
    if (!(!o.value || !n.value || a.value)) {
      a.value = !0, c.value = "", d.value = "正在扫描 Live2D 模型...";
      try {
        const K = await rd();
        o.value.resources = { ...o.value.resources || { voiceAssets: [], live2dModels: [] }, live2dModels: K }, n.value.resources = { ...n.value.resources || { voiceAssets: [], live2dModels: [] }, live2dModels: Qe(K) }, d.value = `已发现 ${K.length} 个 Live2D 模型`;
      } catch (K) {
        c.value = K instanceof Error ? K.message : String(K);
      } finally {
        a.value = !1;
      }
    }
  }
  async function Y() {
    if (!a.value) {
      a.value = !0, c.value = "";
      try {
        await Lv(), d.value = "已打开 Live2D 模型文件夹";
      } catch (K) {
        c.value = K instanceof Error ? K.message : String(K);
      } finally {
        a.value = !1;
      }
    }
  }
  function q(K, $ = 10) {
    $ <= 0 || window.setTimeout(async () => {
      var V;
      if (((V = o.value) == null ? void 0 : V.persona.id) === K)
        try {
          await m(), o.value.documents.some((R) => ["converting", "preview_ready", "indexing"].includes(String(R.status))) && q(K, $ - 1);
        } catch {
        }
    }, 1400);
  }
  async function j(K, $) {
    if (!o.value || !K.length && !$.trim() || a.value) return !1;
    a.value = !0, c.value = "", d.value = "正在写入角色知识库...";
    try {
      const V = o.value.persona.id;
      return await Uv(o.value.persona, K, $), await m(), q(V), d.value = "资料已提交，正在建立索引", !0;
    } catch (V) {
      return c.value = V instanceof Error ? V.message : String(V), !1;
    } finally {
      a.value = !1;
    }
  }
  async function P(K) {
    a.value = !0, c.value = "";
    try {
      await jv(K), await m(), d.value = "资料已删除";
    } catch ($) {
      c.value = $ instanceof Error ? $.message : String($);
    } finally {
      a.value = !1;
    }
  }
  async function L(K) {
    var $;
    a.value = !0, c.value = "";
    try {
      const V = (($ = o.value) == null ? void 0 : $.persona.id) || "";
      await Gv(K), await m(), V && q(V), d.value = "已重新提交索引";
    } catch (V) {
      c.value = V instanceof Error ? V.message : String(V);
    } finally {
      a.value = !1;
    }
  }
  async function X() {
    if (o.value) {
      a.value = !0, c.value = "";
      try {
        const K = o.value.persona.id;
        await Hv(K), e.value = (await Ai()).filter(($) => $.id !== K), n.value = null, o.value = null, t.value = "", i.value = /* @__PURE__ */ new Set(), e.value[0] && await w(e.value[0].id, !0), d.value = "角色已删除";
      } catch (K) {
        c.value = K instanceof Error ? K.message : String(K);
      } finally {
        a.value = !1;
      }
    }
  }
  async function U() {
    if (!o.value || !f.value) return;
    l.value = !0, c.value = "", d.value = "";
    const K = Qe(o.value), $ = {};
    i.value.has("profile") && ($.profile = () => zv(K.persona)), i.value.has("capabilities") && ($.capabilities = () => Fv(K.persona.id, K.capabilities.overrides)), i.value.has("grants") && ($.grants = () => Bv(K.persona.id, K.grants.servers));
    const V = await NC($), M = new Set(V.failedDomains.map((R) => R.domain));
    if (i.value = M, V.savedDomains.length)
      try {
        e.value = await Ai();
        const R = e.value.find((oe) => oe.id === K.persona.id) || K.persona, G = await Sa(R);
        n.value = G, o.value = MC(G, K, M);
      } catch (R) {
        const G = Qe(n.value || K);
        V.savedDomains.includes("profile") && (G.persona = Qe(K.persona)), V.savedDomains.includes("capabilities") && (G.capabilities.overrides = Qe(K.capabilities.overrides)), V.savedDomains.includes("grants") && (G.grants.servers = Qe(K.grants.servers)), n.value = G, o.value = K, c.value = `配置已保存，但刷新失败：${R instanceof Error ? R.message : String(R)}`;
      }
    V.ok ? d.value = "角色配置已保存" : c.value = V.failedDomains.map((R) => `${R.domain}: ${R.message}`).join("；"), l.value = !1;
  }
  return { personas: e, selectedPersonaId: t, snapshot: n, draft: o, selectedNodeId: s, dirtyDomains: i, loading: r, isSaving: l, operationPending: a, error: c, message: d, isDirty: f, initialize: h, refreshIfClean: v, selectPersona: w, selectNode: x, updateProfile: I, setCapability: C, setServer: D, discard: _, save: U, addDocuments: j, removeDocument: P, reindexDocument: L, refreshLive2dResources: z, openLive2dDirectory: Y, removeCurrentPersona: X };
}
const OC = { class: "workbench-toolbar" }, PC = { class: "toolbar-identity" }, AC = { class: "toolbar-actions" }, DC = {
  key: 0,
  class: "dirty-state"
}, RC = ["disabled"], VC = ["disabled"], LC = ["disabled"], zC = {
  key: 0,
  class: "workbench-message error"
}, FC = {
  key: 1,
  class: "workbench-message"
}, BC = { class: "workbench-content" }, HC = { class: "workbench-canvas-region" }, UC = {
  key: 0,
  class: "workbench-loading"
}, jC = {
  key: 1,
  class: "workbench-empty"
}, GC = /* @__PURE__ */ Te({
  __name: "App",
  setup(e) {
    const t = TC(), n = ee(0), o = ee(0), s = ee(!1), i = ae(() => t.isSaving.value || t.operationPending.value), r = ae(() => t.draft.value ? ng(t.draft.value) : { nodes: [], edges: [] }), l = ae(() => (n.value, ab(db(r.value, t.selectedNodeId.value)))), a = ae(() => r.value.nodes.find((L) => L.id === t.selectedNodeId.value));
    function c(L) {
      const X = l.value.nodes.find((U) => U.id === L);
      if (X != null && X.data.configurable) {
        if (X.data.kind === "mcp" && X.data.sourceId) {
          t.setServer(X.data.sourceId, !X.data.assigned);
          return;
        }
        t.setCapability(L, X.data.assigned ? "deny" : "allow");
      }
    }
    async function d() {
      var X, U, K;
      const L = (U = (X = t.draft.value) == null ? void 0 : X.persona.profile) == null ? void 0 : U.tts;
      if (L != null && L.voice_asset_id)
        try {
          const $ = await qv(L.voice_asset_id, L.output_language || "auto"), V = new Audio(URL.createObjectURL($)), M = (K = window.PL) == null ? void 0 : K.audio;
          M ? await M.play(V) : await V.play();
        } catch ($) {
          t.error.value = $ instanceof Error ? $.message : String($);
        }
    }
    function f() {
      var L;
      (L = document.querySelector('[data-view="voice"]')) == null || L.click();
    }
    function h() {
      window.location.hash = "#knowledge-eval";
    }
    function v() {
      !t.draft.value || i.value || (s.value = !s.value);
    }
    function w() {
      s.value = !1;
    }
    async function x() {
      await t.refreshIfClean();
    }
    async function I() {
      var X;
      const L = (X = t.draft.value) == null ? void 0 : X.persona.name;
      !L || !window.confirm(`永久删除“${L}”及其资料、记忆、向量和对话？此操作无法恢复。`) || await t.removeCurrentPersona();
    }
    async function C(L) {
      window.confirm("从角色资料中删除该文件？知识库向量与本地文件将一并移除。") && await t.removeDocument(L);
    }
    async function D(L, X) {
      await t.addDocuments(L, X) && (o.value += 1);
    }
    function _(L, X) {
      var $, V;
      const U = document.querySelector("#preview-title"), K = document.querySelector("#preview-content");
      !U || !K || (U.textContent = L, K.replaceChildren(typeof X == "string" ? document.createTextNode(X) : X), ($ = document.querySelector("#preview-drawer")) == null || $.classList.add("is-open"), (V = document.querySelector("#preview-backdrop")) == null || V.classList.add("is-open"));
    }
    function m() {
      var L, X;
      (L = document.querySelector("#preview-drawer")) == null || L.classList.remove("is-open"), (X = document.querySelector("#preview-backdrop")) == null || X.classList.remove("is-open");
    }
    function z(L) {
      _(String(L.original_filename || L.original_name || "资料预览"), String(L.markdown_preview || L.error_message || "暂无预览内容"));
    }
    async function Y(L) {
      if (L.type.startsWith("image/")) {
        const U = document.createElement("img"), K = URL.createObjectURL(L);
        U.src = K, U.alt = L.name, U.style.maxWidth = "100%", U.onload = () => URL.revokeObjectURL(K), _(L.name, U);
        return;
      }
      const X = L.type.startsWith("text/") || /\.(md|txt|json|csv|ya?ml)$/i.test(L.name);
      _(L.name, X ? await L.text() : "该文件将在上传转换后提供 Markdown 预览。");
    }
    function q(L) {
      t.isDirty.value && (L.preventDefault(), L.returnValue = "");
    }
    function j(L) {
      var U;
      const X = ((U = L == null ? void 0 : L.detail) == null ? void 0 : U.nodeId) || sessionStorage.getItem("charactoid.manage.node");
      X && (sessionStorage.removeItem("charactoid.manage.node"), t.selectNode(X));
    }
    async function P() {
      await t.refreshIfClean(), j();
    }
    return Ne(() => t.selectedPersonaId.value, () => {
      s.value = !1;
    }), lt(async () => {
      var L, X, U;
      await t.initialize(), j(), window.addEventListener("beforeunload", q), (L = document.querySelector("#role-workbench-root")) == null || L.addEventListener("charactoid:manage-show", P), document.addEventListener("charactoid:manage-select-node", j), (X = document.querySelector("#close-preview")) == null || X.addEventListener("click", m), (U = document.querySelector("#preview-backdrop")) == null || U.addEventListener("click", m);
    }), sn(() => {
      var L, X, U;
      window.removeEventListener("beforeunload", q), (L = document.querySelector("#role-workbench-root")) == null || L.removeEventListener("charactoid:manage-show", P), document.removeEventListener("charactoid:manage-select-node", j), (X = document.querySelector("#close-preview")) == null || X.removeEventListener("click", m), (U = document.querySelector("#preview-backdrop")) == null || U.removeEventListener("click", m);
    }), (L, X) => (S(), O("div", {
      class: me(["role-workbench", { "is-busy": i.value }])
    }, [
      u("header", OC, [
        u("div", PC, [
          ne(Yx, {
            personas: H(t).personas.value,
            "selected-id": H(t).selectedPersonaId.value,
            disabled: i.value,
            onSelect: H(t).selectPersona
          }, null, 8, ["personas", "selected-id", "disabled", "onSelect"]),
          X[3] || (X[3] = u("p", null, "角色运行架构与能力配置", -1))
        ]),
        u("div", AC, [
          H(t).isDirty.value ? (S(), O("span", DC, "存在未保存修改")) : le("", !0),
          u("button", {
            type: "button",
            class: me({ active: s.value }),
            disabled: !H(t).draft.value || i.value,
            onClick: v
          }, [
            ne(H(td), { size: 16 }),
            X[4] || (X[4] = ve("运行版本"))
          ], 10, RC),
          u("button", {
            type: "button",
            disabled: !H(t).isDirty.value || H(t).isSaving.value || H(t).operationPending.value,
            onClick: X[0] || (X[0] = //@ts-ignore
            (...U) => H(t).discard && H(t).discard(...U))
          }, [
            ne(H(Mv), { size: 16 }),
            X[5] || (X[5] = ve("撤销"))
          ], 8, VC),
          u("button", {
            type: "button",
            class: "primary",
            disabled: !H(t).isDirty.value || H(t).isSaving.value || H(t).operationPending.value,
            onClick: X[1] || (X[1] = //@ts-ignore
            (...U) => H(t).save && H(t).save(...U))
          }, [
            ne(H(pr), { size: 16 }),
            ve(F(H(t).isSaving.value ? "保存中" : "保存配置"), 1)
          ], 8, LC)
        ])
      ]),
      H(t).error.value ? (S(), O("p", zC, F(H(t).error.value), 1)) : H(t).message.value ? (S(), O("p", FC, F(H(t).message.value), 1)) : le("", !0),
      u("div", BC, [
        u("main", HC, [
          H(t).loading.value ? (S(), O("div", UC, "正在读取角色架构...")) : H(t).personas.value.length ? (S(), et(Fx, {
            key: 2,
            graph: l.value,
            "selected-node-id": H(t).selectedNodeId.value,
            onSelect: H(t).selectNode,
            onToggle: c,
            onReset: X[2] || (X[2] = (U) => n.value++)
          }, null, 8, ["graph", "selected-node-id", "onSelect"])) : (S(), O("div", jC, X[6] || (X[6] = [
            u("strong", null, "还没有角色", -1),
            u("p", null, "先在“创建角色”页面建立角色。", -1)
          ])))
        ]),
        H(t).draft.value ? (S(), et(L0, {
          key: 0,
          node: a.value,
          draft: H(t).draft.value,
          disabled: i.value,
          "upload-complete-token": o.value,
          onProfile: H(t).updateProfile,
          onCapability: H(t).setCapability,
          onServer: H(t).setServer,
          onUpload: D,
          onDeleteDocument: C,
          onRetryDocument: H(t).reindexDocument,
          onDeletePersona: I,
          onPreviewVoice: d,
          onOpenVoiceStudio: f,
          onOpenRagEval: h,
          onPreviewDocument: z,
          onPreviewLocalFile: Y,
          onRefreshLive2d: H(t).refreshLive2dResources,
          onOpenLive2dDirectory: H(t).openLive2dDirectory
        }, null, 8, ["node", "draft", "disabled", "upload-complete-token", "onProfile", "onCapability", "onServer", "onRetryDocument", "onRefreshLive2d", "onOpenLive2dDirectory"])) : le("", !0)
      ]),
      s.value && H(t).draft.value ? (S(), et($C, {
        key: 2,
        "persona-id": H(t).draft.value.persona.id,
        "persona-name": H(t).draft.value.persona.name,
        disabled: i.value || H(t).isDirty.value,
        onClose: w,
        onChanged: x
      }, null, 8, ["persona-id", "persona-name", "disabled"])) : le("", !0)
    ], 2));
  }
});
let hn = null;
function gM(e = "#role-workbench-root") {
  if (hn) return hn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("角色工作台挂载点不存在");
  return hn = ts(GC), hn.mount(t), hn;
}
function mM() {
  var e;
  (e = document.querySelector("#role-workbench-root")) == null || e.dispatchEvent(new CustomEvent("charactoid:manage-show"));
}
function yM() {
  hn && (hn.unmount(), hn = null);
}
async function Ae(e, t) {
  const n = await fetch(e, t), s = (n.headers.get("content-type") || "").includes("application/json") ? await n.json() : await n.text();
  if (!n.ok) {
    const i = typeof s == "object" && s && "detail" in s ? s.detail : s;
    throw new Error(typeof i == "string" ? i : `请求失败（${n.status}）`);
  }
  return s;
}
function qe(e) {
  return e instanceof Error ? e.message : String(e || "操作失败");
}
function qC(e) {
  const t = e.skills || [], n = e.servers || [], o = e.tools || [], s = t.filter((a) => a.enabled).length, i = n.filter((a) => {
    var c;
    return a.enabled && ((c = a.status) == null ? void 0 : c.status) === "connected";
  }).length, r = n.filter((a) => {
    var c, d;
    return ((c = a.status) == null ? void 0 : c.status) === "error" || a.enabled && ((d = a.status) == null ? void 0 : d.status) !== "connected";
  }).length, l = t.filter((a) => !a.builtin && !a.trusted).length;
  return { enabledSkills: s, mcpOnline: i, mcpIssues: r, toolCount: o.length, attentionCount: r + l };
}
function Lu(e) {
  const t = {};
  for (const n of e.split(/\r?\n/)) {
    const o = n.trim();
    if (!o) continue;
    const s = o.indexOf("="), i = o.indexOf(":"), r = s > 0 && (i < 0 || s < i) ? s : i;
    r > 0 && (t[o.slice(0, r).trim()] = o.slice(r + 1).trim());
  }
  return t;
}
const YC = { class: "yv-page extension-page" }, XC = { class: "extension-hero" }, KC = { class: "hero-actions" }, WC = ["disabled"], ZC = {
  class: "signal-strip",
  "aria-label": "能力状态"
}, JC = {
  class: "extension-tabs",
  "aria-label": "能力工作台"
}, QC = ["data-capability-tab", "onClick"], eS = {
  key: 1,
  class: "content-section"
}, tS = {
  key: 0,
  class: "yv-empty"
}, nS = { class: "row-main" }, oS = { class: "tag-line" }, sS = { class: "row-actions" }, iS = ["title", "onClick"], rS = ["onClick"], lS = ["onClick"], aS = ["onClick"], uS = {
  key: 2,
  class: "content-section"
}, cS = {
  key: 0,
  class: "yv-empty"
}, dS = { class: "row-main" }, fS = { class: "grant-field" }, pS = ["value", "onChange"], hS = { class: "row-actions" }, vS = ["onClick"], gS = ["onClick"], mS = ["onClick"], yS = {
  key: 3,
  class: "content-section"
}, bS = { class: "filter-input" }, _S = {
  key: 0,
  class: "yv-empty"
}, wS = { class: "row-main" }, kS = {
  key: 4,
  class: "content-section"
}, ES = { class: "catalog-tools" }, xS = { class: "filter-input" }, CS = { class: "catalog-grid" }, SS = { class: "tag-line" }, $S = ["disabled", "onClick"], IS = { class: "dialog-head" }, NS = { class: "yv-kicker" }, MS = { class: "yv-field" }, TS = ["readonly"], OS = { class: "yv-field" }, PS = { class: "yv-field" }, AS = { class: "yv-field" }, DS = { class: "tool-options" }, RS = ["value"], VS = {
  class: "yv-button primary",
  type: "submit"
}, LS = { class: "yv-field" }, zS = { class: "yv-field" }, FS = { class: "transport-tabs" }, BS = ["onClick"], HS = { class: "yv-field" }, US = { class: "yv-field" }, jS = { class: "yv-field" }, GS = { class: "yv-field" }, qS = { class: "yv-field" }, YS = {
  class: "yv-button primary",
  type: "submit"
}, XS = { class: "dialog-head" }, KS = { class: "dialog-body" }, WS = { class: "catalog-detail" }, ZS = /* @__PURE__ */ Te({
  __name: "App",
  setup(e) {
    const t = [
      { id: "skills", label: "技能" },
      { id: "mcp", label: "MCP 服务" },
      { id: "tools", label: "工具与权限" },
      { id: "catalog", label: "扩展管理" }
    ], n = wn({ skills: [], servers: [], tools: [] }), o = ee("skills"), s = ee(!1), i = ee(""), r = ee(!1), l = ee(""), a = ee(null), c = ee("skill"), d = ee(null), f = ee(null), h = ee([]), v = ee(!1), w = ee(""), x = ee("all"), I = ee(null), C = ee([]), D = ee(null), _ = wn({ name: "", description: "", instructions: "", prompt_hint: "", tool_names: [] }), m = wn({ name: "", description: "", transport: "stdio", command: "", args: "", env: "", url: "", headers: "" }), z = ae(() => qC(n)), Y = ae(() => {
      const J = l.value.trim().toLowerCase();
      return n.tools.filter((p) => !J || [p.name, p.server, p.description].some((T) => String(T || "").toLowerCase().includes(J)));
    }), q = ae(() => {
      const J = w.value.trim().toLowerCase();
      return h.value.filter((p) => !J || [p.id, p.name, p.description, ...p.categories || []].join(" ").toLowerCase().includes(J));
    }), j = ae(() => Object.entries(n.skills.reduce((J, p) => {
      var y;
      const T = ((y = p.metadata) == null ? void 0 : y.category) || "其他";
      return (J[T] || (J[T] = [])).push(p), J;
    }, {})).sort(([J], [p]) => J.localeCompare(p, "zh")));
    let P = 0;
    function L(J, p = !1) {
      i.value = J, r.value = p;
    }
    async function X(J = !1) {
      J || (s.value = !0);
      try {
        const [p, T, y, b] = await Promise.all([
          Ae("/api/skills"),
          Ae("/api/mcp/servers"),
          Ae("/api/mcp/tools"),
          Ae("/api/skills/tools")
        ]);
        n.skills = p, n.servers = T, n.tools = y, C.value = b, J || L("扩展状态已刷新");
      } catch (p) {
        L(qe(p), !0);
      } finally {
        s.value = !1;
      }
    }
    function U() {
      K(), P = window.setInterval(() => X(!0), 3e4);
    }
    function K() {
      P && window.clearInterval(P), P = 0;
    }
    async function $() {
      await X(!0), U();
    }
    function V() {
      D.value = null, Object.assign(_, { name: "", description: "", instructions: "", prompt_hint: "", tool_names: [] });
    }
    function M(J) {
      V(), c.value = "skill", J && (D.value = J.name, Object.assign(_, { name: J.name, description: J.description || "", instructions: J.instructions || "", prompt_hint: J.prompt_hint || "", tool_names: [...J.tool_names || []] })), ot(() => {
        var p;
        return (p = a.value) == null ? void 0 : p.showModal();
      });
    }
    function R() {
      c.value = "mcp", Object.assign(m, { name: "", description: "", transport: "stdio", command: "", args: "", env: "", url: "", headers: "" }), ot(() => {
        var J;
        return (J = a.value) == null ? void 0 : J.showModal();
      });
    }
    async function G() {
      var J;
      if (!_.name.trim() || !_.instructions.trim()) return L("名称与提示词不能为空", !0);
      s.value = !0;
      try {
        const p = { description: _.description.trim(), instructions: _.instructions.trim(), prompt_hint: _.prompt_hint.trim(), tool_names: _.tool_names };
        D.value ? await Ae(`/api/skills/${encodeURIComponent(D.value)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) }) : await Ae("/api/skills", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: _.name.trim(), ...p }) }), (J = a.value) == null || J.close(), await X(!0), L(D.value ? "技能修改已保存" : "技能已创建");
      } catch (p) {
        L(qe(p), !0);
      } finally {
        s.value = !1;
      }
    }
    async function oe(J, p) {
      try {
        await Ae(`/api/skills/${encodeURIComponent(J.name)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) }), await X(!0), L("技能状态已更新");
      } catch (T) {
        L(qe(T), !0);
      }
    }
    async function ue(J) {
      if (confirm(`删除技能 ${J.name}？`))
        try {
          await Ae(`/api/skills/${encodeURIComponent(J.name)}`, { method: "DELETE" }), await X(!0), L("技能已删除");
        } catch (p) {
          L(qe(p), !0);
        }
    }
    async function de(J) {
      var T;
      if (!J) return;
      const p = new FormData();
      p.append("file", J);
      try {
        const y = await Ae("/api/skills/upload", { method: "POST", body: p });
        await X(!0), L((T = y.installed) != null && T.length ? `已安装：${y.installed.join("、")}` : "上传完成");
      } catch (y) {
        L(qe(y), !0);
      } finally {
        d.value && (d.value.value = "");
      }
    }
    async function re() {
      var J;
      if (!m.name.trim()) return L("服务器名称不能为空", !0);
      try {
        await Ae("/api/mcp/servers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: m.name.trim(), description: m.description.trim(), transport: m.transport, command: m.command.trim(), args: m.args.split(/\r?\n/).map((p) => p.trim()).filter(Boolean), env: Lu(m.env), url: m.url.trim(), headers: Lu(m.headers), enabled: !0 }) }), (J = a.value) == null || J.close(), await X(!0), L("MCP 服务已保存并连接");
      } catch (p) {
        L(qe(p), !0);
      }
    }
    async function fe(J) {
      try {
        await Ae(`/api/mcp/servers/${encodeURIComponent(J.name)}/${J.enabled ? "disable" : "enable"}`, { method: "POST" }), await X(!0);
      } catch (p) {
        L(qe(p), !0);
      }
    }
    async function ce(J) {
      L(`正在测试 ${J.name}…`);
      try {
        const p = await Ae(`/api/mcp/servers/${encodeURIComponent(J.name)}/test`, { method: "POST" });
        L(p.ok ? `${J.name} 连接正常：${p.tool_count} 个工具，耗时 ${p.elapsed_ms}ms` : `${J.name} 连接失败：${p.error}`, !p.ok), await X(!0);
      } catch (p) {
        L(qe(p), !0);
      }
    }
    async function he(J, p) {
      const y = p.target.value.split(",").map((b) => b.trim()).filter(Boolean);
      try {
        await Ae(`/api/mcp/servers/${encodeURIComponent(J.name)}/grants`, { method: "PATCH", headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body: JSON.stringify({ allowed_persona_ids: y }) }), L(`已更新 ${J.name} 的授权`);
      } catch (b) {
        L(qe(b), !0);
      }
    }
    async function te(J) {
      if (confirm(`删除 MCP 服务器 ${J.name}？其工具将立即不可用。`))
        try {
          await Ae(`/api/mcp/servers/${encodeURIComponent(J.name)}`, { method: "DELETE" }), await X(!0), L("MCP 服务已删除");
        } catch (p) {
          L(qe(p), !0);
        }
    }
    async function _e(J = !1) {
      try {
        const p = await Ae(`/api/extensions/catalog?kind=${encodeURIComponent(x.value)}${J ? "&refresh=true" : ""}`);
        h.value = p.items || [], v.value = !!p.stale;
      } catch {
        L("在线扩展目录暂时不可用，可稍后重试", !0), h.value = [];
      }
    }
    function xe(J) {
      return J.kind === "skill" ? n.skills.some((p) => p.name === J.id) : n.servers.some((p) => p.name === J.id);
    }
    function we(J) {
      I.value = J, ot(() => {
        var p;
        return (p = f.value) == null ? void 0 : p.showModal();
      });
    }
    async function ke() {
      var p, T, y;
      const J = I.value;
      if (J)
        try {
          const b = await Ae(`/api/extensions/catalog/${encodeURIComponent(J.id)}/install`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ confirmed: !1 }) });
          if ((T = (p = b.preview) == null ? void 0 : p.conflicts) != null && T.length) throw new Error(b.preview.conflicts.join("；"));
          const k = await Ae(`/api/extensions/catalog/${encodeURIComponent(J.id)}/install`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ confirmed: !0 }) });
          if (k.status !== "installed") throw new Error(k.message || "安装未完成");
          await X(!0), (y = f.value) == null || y.close(), L(J.kind === "skill" ? "安装完成，请在技能页启用并信任" : "安装完成，请在 MCP 页启用并授权角色");
        } catch (b) {
          L(qe(b), !0);
        }
    }
    return lt(() => {
      const J = document.querySelector("#extensions-app-root");
      J == null || J.addEventListener("charactoid:extensions-show", $), J == null || J.addEventListener("charactoid:extensions-hide", K), $();
    }), sn(() => K()), (J, p) => {
      var T, y, b, k, E, B, W, Q;
      return S(), O("main", YC, [
        u("header", XC, [
          p[24] || (p[24] = u("div", null, [
            u("span", { class: "yv-kicker" }, "Agent capability registry"),
            u("h1", null, "能力扩展"),
            u("p", null, "统一管理角色可调用的 Skill、Tool 与 MCP 服务。")
          ], -1)),
          u("div", KC, [
            u("span", {
              class: me(["yv-status", z.value.attentionCount ? "warn" : "ok"])
            }, F(z.value.attentionCount ? `${z.value.attentionCount} 项待处理` : "运行正常"), 3),
            u("button", {
              class: "yv-button yv-icon-button",
              title: "刷新",
              disabled: s.value,
              onClick: p[0] || (p[0] = (A) => X())
            }, [
              ne(H(zt))
            ], 8, WC)
          ])
        ]),
        u("section", ZC, [
          u("div", null, [
            p[25] || (p[25] = u("span", null, "已启用技能", -1)),
            u("strong", null, F(z.value.enabledSkills), 1),
            u("small", null, "共 " + F(n.skills.length) + " 个", 1)
          ]),
          u("div", null, [
            p[26] || (p[26] = u("span", null, "MCP 在线", -1)),
            u("strong", null, F(z.value.mcpOnline), 1),
            u("small", null, F(z.value.mcpIssues) + " 项异常", 1)
          ]),
          u("div", null, [
            p[27] || (p[27] = u("span", null, "已注册工具", -1)),
            u("strong", null, F(z.value.toolCount), 1),
            p[28] || (p[28] = u("small", null, "统一工具注册表", -1))
          ]),
          u("div", null, [
            p[29] || (p[29] = u("span", null, "需要处理", -1)),
            u("strong", null, F(z.value.attentionCount), 1),
            p[30] || (p[30] = u("small", null, "信任与连接状态", -1))
          ])
        ]),
        u("nav", JC, [
          (S(), O(ye, null, Oe(t, (A) => u("button", {
            key: A.id,
            "data-capability-tab": A.id,
            type: "button",
            class: me({ active: o.value === A.id }),
            onClick: (N) => {
              o.value = A.id, A.id === "catalog" && _e(!1);
            }
          }, F(A.label), 11, QC)), 64))
        ]),
        i.value ? (S(), O("p", {
          key: 0,
          class: me(["extension-message", { error: r.value }]),
          role: "status"
        }, F(i.value), 3)) : le("", !0),
        o.value === "skills" ? (S(), O("section", eS, [
          u("header", null, [
            p[33] || (p[33] = u("div", null, [
              u("span", { class: "yv-kicker" }, "Instruction packages"),
              u("h2", null, "技能"),
              u("p", null, "为 Agent 提供按需加载的规则与工具组合。")
            ], -1)),
            u("div", null, [
              u("input", {
                ref_key: "uploadInput",
                ref: d,
                hidden: "",
                type: "file",
                accept: ".zip",
                onChange: p[1] || (p[1] = (A) => {
                  var N;
                  return de((N = A.target.files) == null ? void 0 : N[0]);
                })
              }, null, 544),
              u("button", {
                class: "yv-button",
                onClick: p[2] || (p[2] = (A) => {
                  var N;
                  return (N = d.value) == null ? void 0 : N.click();
                })
              }, [
                ne(H(vr)),
                p[31] || (p[31] = ve("上传技能包"))
              ]),
              u("button", {
                class: "yv-button primary",
                onClick: p[3] || (p[3] = (A) => M())
              }, [
                ne(H(Uo)),
                p[32] || (p[32] = ve("新增技能"))
              ])
            ])
          ]),
          n.skills.length ? le("", !0) : (S(), O("div", tS, "还没有技能")),
          (S(!0), O(ye, null, Oe(j.value, ([A, N]) => (S(), O("section", {
            key: A,
            class: "skill-group"
          }, [
            u("h3", null, F(A), 1),
            (S(!0), O(ye, null, Oe(N, (g) => (S(), O("article", {
              key: g.name,
              class: "extension-row kind-skill"
            }, [
              u("div", nS, [
                u("div", null, [
                  u("strong", null, F(g.name), 1),
                  u("span", null, F(g.builtin ? "内置" : "自定义") + " · " + F(g.format === "skillmd" ? "标准包" : "JSON"), 1)
                ]),
                u("p", null, F(g.description || "暂无说明"), 1),
                u("div", oS, [
                  (S(!0), O(ye, null, Oe(g.tool_names, (Z) => (S(), O("span", { key: Z }, F(Z), 1))), 128))
                ])
              ]),
              u("div", sS, [
                u("span", {
                  class: me(["yv-status", g.enabled ? "ok" : "warn"])
                }, F(g.enabled ? "已启用" : "已停用"), 3),
                u("button", {
                  class: "yv-button yv-icon-button",
                  title: g.enabled ? "停用" : "启用",
                  onClick: (Z) => oe(g, { enabled: !g.enabled })
                }, [
                  ne(H(Nv))
                ], 8, iS),
                !g.builtin && !g.trusted ? (S(), O("button", {
                  key: 0,
                  class: "yv-button",
                  onClick: (Z) => oe(g, { trusted: !0 })
                }, "信任", 8, rS)) : le("", !0),
                g.builtin ? le("", !0) : (S(), O("button", {
                  key: 1,
                  class: "yv-button yv-icon-button",
                  title: "编辑",
                  onClick: (Z) => M(g)
                }, [
                  ne(H(nd))
                ], 8, lS)),
                g.builtin ? le("", !0) : (S(), O("button", {
                  key: 2,
                  class: "yv-button yv-icon-button danger",
                  title: "删除",
                  onClick: (Z) => ue(g)
                }, [
                  ne(H(en))
                ], 8, aS))
              ])
            ]))), 128))
          ]))), 128))
        ])) : o.value === "mcp" ? (S(), O("section", uS, [
          u("header", null, [
            p[35] || (p[35] = u("div", null, [
              u("span", { class: "yv-kicker" }, "External protocol services"),
              u("h2", null, "MCP 服务"),
              u("p", null, "连接、测试并限制外部服务可访问的角色。")
            ], -1)),
            u("button", {
              class: "yv-button primary",
              onClick: p[4] || (p[4] = (A) => R())
            }, [
              ne(H(Uo)),
              p[34] || (p[34] = ve("新增服务"))
            ])
          ]),
          n.servers.length ? le("", !0) : (S(), O("div", cS, "尚未配置 MCP 服务")),
          (S(!0), O(ye, null, Oe(n.servers, (A) => {
            var N, g, Z, ie, ge;
            return S(), O("article", {
              key: A.name,
              class: "extension-row kind-mcp"
            }, [
              u("div", dS, [
                u("div", null, [
                  u("strong", null, F(A.name), 1),
                  u("span", null, F(A.transport) + " · " + F(A.enabled ? "已启用" : "已停用"), 1)
                ]),
                u("p", null, F(A.description || ((N = A.status) == null ? void 0 : N.error) || "暂无说明"), 1),
                u("label", fS, [
                  p[36] || (p[36] = u("span", null, "授权角色", -1)),
                  u("input", {
                    value: (A.allowed_persona_ids || []).join(","),
                    placeholder: "* 或角色 ID，逗号分隔",
                    onChange: (Ce) => he(A, Ce)
                  }, null, 40, pS)
                ])
              ]),
              u("div", hS, [
                u("span", {
                  class: me(["yv-status", ((g = A.status) == null ? void 0 : g.status) === "connected" ? "ok" : ((Z = A.status) == null ? void 0 : Z.status) === "error" ? "error" : "warn"])
                }, F(((ie = A.status) == null ? void 0 : ie.status) === "connected" ? `${A.status.tool_count} 个工具` : ((ge = A.status) == null ? void 0 : ge.status) === "error" ? "连接失败" : "等待连接"), 3),
                u("button", {
                  class: "yv-button",
                  onClick: (Ce) => ce(A)
                }, "测试", 8, vS),
                u("button", {
                  class: "yv-button",
                  onClick: (Ce) => fe(A)
                }, F(A.enabled ? "停用" : "启用"), 9, gS),
                u("button", {
                  class: "yv-button yv-icon-button danger",
                  title: "删除",
                  onClick: (Ce) => te(A)
                }, [
                  ne(H(en))
                ], 8, mS)
              ])
            ]);
          }), 128))
        ])) : o.value === "tools" ? (S(), O("section", yS, [
          u("header", null, [
            p[37] || (p[37] = u("div", null, [
              u("span", { class: "yv-kicker" }, "Unified registry"),
              u("h2", null, "工具与权限"),
              u("p", null, "查看可调用工具，并确认哪些调用需要用户授权。")
            ], -1)),
            u("label", bS, [
              ne(H(hr)),
              Ie(u("input", {
                "onUpdate:modelValue": p[5] || (p[5] = (A) => l.value = A),
                placeholder: "搜索工具名、服务或描述"
              }, null, 512), [
                [Re, l.value]
              ])
            ])
          ]),
          Y.value.length ? le("", !0) : (S(), O("div", _S, "没有匹配的工具")),
          (S(!0), O(ye, null, Oe(Y.value, (A) => (S(), O("article", {
            key: `${A.server}/${A.name}`,
            class: "extension-row kind-tool"
          }, [
            u("div", wS, [
              u("div", null, [
                u("strong", null, F(A.name), 1),
                u("span", null, F(A.server || "内置"), 1)
              ]),
              u("p", null, F(A.description || "暂无说明"), 1)
            ]),
            u("span", {
              class: me(["yv-status", A.requires_confirmation ? "warn" : "ok"])
            }, F(A.requires_confirmation ? "调用需确认" : "可直接调用"), 3)
          ]))), 128))
        ])) : (S(), O("section", kS, [
          u("header", null, [
            p[39] || (p[39] = u("div", null, [
              u("span", { class: "yv-kicker" }, "Curated catalog"),
              u("h2", null, "扩展管理"),
              u("p", null, "查看可安装扩展，确认来源后再加入本地能力系统。")
            ], -1)),
            u("button", {
              class: "yv-button",
              onClick: p[6] || (p[6] = (A) => _e(!0))
            }, [
              ne(H(zt)),
              p[38] || (p[38] = ve("刷新目录"))
            ])
          ]),
          u("div", ES, [
            u("label", xS, [
              ne(H(hr)),
              Ie(u("input", {
                "onUpdate:modelValue": p[7] || (p[7] = (A) => w.value = A),
                placeholder: "搜索名称、说明或分类"
              }, null, 512), [
                [Re, w.value]
              ])
            ]),
            Ie(u("select", {
              "onUpdate:modelValue": p[8] || (p[8] = (A) => x.value = A),
              onChange: p[9] || (p[9] = (A) => _e(!1))
            }, p[40] || (p[40] = [
              u("option", { value: "all" }, "全部类型", -1),
              u("option", { value: "skill" }, "Skill", -1),
              u("option", { value: "mcp" }, "MCP", -1)
            ]), 544), [
              [Qt, x.value]
            ]),
            u("span", {
              class: me(["yv-status", v.value ? "warn" : "ok"])
            }, F(v.value ? "缓存目录" : `${h.value.length} 个条目`), 3)
          ]),
          u("div", CS, [
            (S(!0), O(ye, null, Oe(q.value, (A) => (S(), O("article", {
              key: A.id,
              class: me(["catalog-item", `kind-${A.kind}`])
            }, [
              u("span", null, F(A.kind.toUpperCase()), 1),
              u("h3", null, F(A.name || A.id), 1),
              u("small", null, "v" + F(A.version || "未知") + " · " + F(A.id), 1),
              u("p", null, F(A.description || "暂无说明"), 1),
              u("div", SS, [
                (S(!0), O(ye, null, Oe(A.categories, (N) => (S(), O("span", { key: N }, F(N), 1))), 128))
              ]),
              u("button", {
                class: "yv-button",
                disabled: xe(A),
                onClick: (N) => we(A)
              }, F(xe(A) ? "已安装" : "查看并安装"), 9, $S)
            ], 2))), 128))
          ])
        ])),
        u("dialog", {
          ref_key: "drawer",
          ref: a,
          class: "yv-dialog"
        }, [
          u("header", IS, [
            u("div", null, [
              u("span", NS, F(c.value === "skill" ? "Instruction package" : "Protocol service"), 1),
              u("h2", null, F(c.value === "skill" ? D.value ? `编辑 ${D.value}` : "新增技能" : "新增 MCP 服务"), 1)
            ]),
            u("button", {
              class: "yv-button yv-icon-button",
              title: "关闭",
              onClick: p[10] || (p[10] = (A) => {
                var N;
                return (N = a.value) == null ? void 0 : N.close();
              })
            }, [
              ne(H(Rt))
            ])
          ]),
          c.value === "skill" ? (S(), O("form", {
            key: 0,
            class: "dialog-body",
            onSubmit: mt(G, ["prevent"])
          }, [
            u("label", MS, [
              p[41] || (p[41] = u("span", null, "名称", -1)),
              Ie(u("input", {
                "onUpdate:modelValue": p[11] || (p[11] = (A) => _.name = A),
                readonly: !!D.value
              }, null, 8, TS), [
                [Re, _.name]
              ])
            ]),
            u("label", OS, [
              p[42] || (p[42] = u("span", null, "描述", -1)),
              Ie(u("input", {
                "onUpdate:modelValue": p[12] || (p[12] = (A) => _.description = A)
              }, null, 512), [
                [Re, _.description]
              ])
            ]),
            u("label", PS, [
              p[43] || (p[43] = u("span", null, "提示词", -1)),
              Ie(u("textarea", {
                "onUpdate:modelValue": p[13] || (p[13] = (A) => _.instructions = A),
                rows: "6"
              }, null, 512), [
                [Re, _.instructions]
              ])
            ]),
            u("label", AS, [
              p[44] || (p[44] = u("span", null, "触发提示", -1)),
              Ie(u("input", {
                "onUpdate:modelValue": p[14] || (p[14] = (A) => _.prompt_hint = A)
              }, null, 512), [
                [Re, _.prompt_hint]
              ])
            ]),
            u("fieldset", DS, [
              p[45] || (p[45] = u("legend", null, "可附加工具", -1)),
              (S(!0), O(ye, null, Oe(C.value, (A) => (S(), O("label", {
                key: A.name
              }, [
                Ie(u("input", {
                  "onUpdate:modelValue": p[15] || (p[15] = (N) => _.tool_names = N),
                  type: "checkbox",
                  value: A.name
                }, null, 8, RS), [
                  [Qc, _.tool_names]
                ]),
                u("span", null, F(A.name) + F(A.requires_confirmation ? "（需确认）" : ""), 1)
              ]))), 128))
            ]),
            u("button", VS, [
              ne(H(pr)),
              p[46] || (p[46] = ve("保存技能"))
            ])
          ], 32)) : (S(), O("form", {
            key: 1,
            class: "dialog-body",
            onSubmit: mt(re, ["prevent"])
          }, [
            u("label", LS, [
              p[47] || (p[47] = u("span", null, "名称", -1)),
              Ie(u("input", {
                "onUpdate:modelValue": p[16] || (p[16] = (A) => m.name = A)
              }, null, 512), [
                [Re, m.name]
              ])
            ]),
            u("label", zS, [
              p[48] || (p[48] = u("span", null, "描述", -1)),
              Ie(u("input", {
                "onUpdate:modelValue": p[17] || (p[17] = (A) => m.description = A)
              }, null, 512), [
                [Re, m.description]
              ])
            ]),
            u("div", FS, [
              (S(), O(ye, null, Oe([{ id: "stdio", label: "本地进程" }, { id: "streamable_http", label: "远程 HTTP" }, { id: "sse", label: "远程 SSE" }], (A) => u("button", {
                key: A.id,
                type: "button",
                class: me({ active: m.transport === A.id }),
                onClick: (N) => m.transport = A.id
              }, F(A.label), 11, BS)), 64))
            ]),
            m.transport === "stdio" ? (S(), O(ye, { key: 0 }, [
              u("label", HS, [
                p[49] || (p[49] = u("span", null, "启动命令", -1)),
                Ie(u("input", {
                  "onUpdate:modelValue": p[18] || (p[18] = (A) => m.command = A)
                }, null, 512), [
                  [Re, m.command]
                ])
              ]),
              u("label", US, [
                p[50] || (p[50] = u("span", null, "参数（每行一个）", -1)),
                Ie(u("textarea", {
                  "onUpdate:modelValue": p[19] || (p[19] = (A) => m.args = A),
                  rows: "3"
                }, null, 512), [
                  [Re, m.args]
                ])
              ]),
              u("label", jS, [
                p[51] || (p[51] = u("span", null, "环境变量（KEY=VALUE）", -1)),
                Ie(u("textarea", {
                  "onUpdate:modelValue": p[20] || (p[20] = (A) => m.env = A),
                  rows: "3"
                }, null, 512), [
                  [Re, m.env]
                ])
              ])
            ], 64)) : (S(), O(ye, { key: 1 }, [
              u("label", GS, [
                p[52] || (p[52] = u("span", null, "服务器地址", -1)),
                Ie(u("input", {
                  "onUpdate:modelValue": p[21] || (p[21] = (A) => m.url = A)
                }, null, 512), [
                  [Re, m.url]
                ])
              ]),
              u("label", qS, [
                p[53] || (p[53] = u("span", null, "请求头（KEY: VALUE）", -1)),
                Ie(u("textarea", {
                  "onUpdate:modelValue": p[22] || (p[22] = (A) => m.headers = A),
                  rows: "3"
                }, null, 512), [
                  [Re, m.headers]
                ])
              ])
            ], 64)),
            u("button", YS, [
              ne(H(pr)),
              p[54] || (p[54] = ve("保存服务"))
            ])
          ], 32))
        ], 512),
        u("dialog", {
          ref_key: "catalogDialog",
          ref: f,
          class: "yv-dialog"
        }, [
          u("header", XS, [
            u("div", null, [
              p[55] || (p[55] = u("span", { class: "yv-kicker" }, "安装预览", -1)),
              u("h2", null, F(((T = I.value) == null ? void 0 : T.name) || ((y = I.value) == null ? void 0 : y.id)), 1)
            ]),
            u("button", {
              class: "yv-button yv-icon-button",
              title: "关闭",
              onClick: p[23] || (p[23] = (A) => {
                var N;
                return (N = f.value) == null ? void 0 : N.close();
              })
            }, [
              ne(H(Rt))
            ])
          ]),
          u("div", KS, [
            u("p", null, F(((b = I.value) == null ? void 0 : b.description) || "暂无说明"), 1),
            u("dl", WS, [
              p[56] || (p[56] = u("dt", null, "类型", -1)),
              u("dd", null, F((E = (k = I.value) == null ? void 0 : k.kind) == null ? void 0 : E.toUpperCase()), 1),
              p[57] || (p[57] = u("dt", null, "版本", -1)),
              u("dd", null, F(((B = I.value) == null ? void 0 : B.version) || "未知"), 1),
              p[58] || (p[58] = u("dt", null, "来源", -1)),
              u("dd", null, F(((Q = (W = I.value) == null ? void 0 : W.source) == null ? void 0 : Q.type) || "未知"), 1)
            ]),
            u("button", {
              class: "yv-button primary",
              onClick: ke
            }, [
              ne(H(Kn)),
              p[59] || (p[59] = ve("确认安装"))
            ])
          ])
        ], 512)
      ]);
    };
  }
});
let vn = null;
const Ff = () => document.querySelector("#extensions-app-root");
function bM(e = "#extensions-app-root") {
  if (vn) return vn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("能力扩展挂载点不存在");
  return vn = ts(ZS), vn.mount(t), vn;
}
function _M() {
  var e;
  (e = Ff()) == null || e.dispatchEvent(new CustomEvent("charactoid:extensions-show"));
}
function wM() {
  var e;
  (e = Ff()) == null || e.dispatchEvent(new CustomEvent("charactoid:extensions-hide"));
}
function kM() {
  vn && (vn.unmount(), vn = null);
}
const JS = /* @__PURE__ */ new Set([
  "recall_at_3_answerable",
  "precision_at_3_answerable",
  "mrr_at_3_answerable",
  "hit_at_3_answerable",
  "grounded_rate",
  "useful_rate",
  "refusal_rate",
  "answer_rate",
  "accepted_rate",
  "rewrite_rate",
  "correction_rate",
  "complex_rewrite_rate",
  "complex_correction_rate",
  "probe_refusal_rate",
  "mean_confidence"
]);
function _s(e, t) {
  if (e === "scope_isolation_ok") return t ? "通过" : "未通过";
  const n = Number(t);
  return JS.has(e) && Number.isFinite(n) ? `${Math.round(n * 100)}%` : typeof t == "number" && Number.isFinite(n) ? Number.isInteger(n) ? String(n) : n.toFixed(3) : String(t ?? "—");
}
function QS(e, t) {
  return t ? Math.max(0, Math.min(100, Math.round(e / t * 100))) : 0;
}
function e$(e) {
  return {
    persona_id: e.personaId,
    tier: e.tier,
    dataset_mode: e.datasetMode
  };
}
function Ks(e) {
  return [...new Set(e.split(/[\n,，]+/).map((t) => t.trim()).filter(Boolean))];
}
function Bf(e) {
  return {
    question: e.question.trim(),
    expected_answer: e.expectedAnswer.trim(),
    relevant_document_ids: Ks(e.documentIds),
    tags: Ks(e.tags),
    difficulty: e.difficulty,
    enabled: e.enabled
  };
}
function t$(e) {
  return Ae(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-cases`, { cache: "no-store" });
}
function n$(e, t) {
  return Ae(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-cases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Bf(t))
  });
}
function o$(e, t, n) {
  return Ae(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-cases/${encodeURIComponent(t)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Bf(n))
  });
}
async function s$(e, t) {
  await Ae(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-cases/${encodeURIComponent(t)}`, {
    method: "DELETE"
  });
}
function i$(e, t = "pending") {
  return Ae(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-candidates?status=${encodeURIComponent(t)}`, { cache: "no-store" });
}
function r$(e) {
  return Ae(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-candidates/sync`, { method: "POST" });
}
function l$(e) {
  const t = { note: (e.note || "").trim() };
  return e.expectedAnswer !== void 0 && (t.expected_answer = e.expectedAnswer.trim()), e.documentIds !== void 0 && (t.relevant_document_ids = Ks(e.documentIds)), e.tags !== void 0 && (t.tags = Ks(e.tags)), e.difficulty !== void 0 && (t.difficulty = e.difficulty), t;
}
function a$(e, t, n) {
  return Ae(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-candidates/${encodeURIComponent(t)}/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(l$(n))
  });
}
function u$(e, t, n = "") {
  return Ae(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-candidates/${encodeURIComponent(t)}/reject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note: n.trim() })
  });
}
const c$ = {
  class: "eval-dataset",
  "aria-label": "人工评测题集"
}, d$ = { class: "eval-dataset-heading" }, f$ = { key: 0 }, p$ = { class: "eval-dataset-actions" }, h$ = ["disabled"], v$ = ["disabled"], g$ = {
  key: 0,
  class: "eval-dataset-error"
}, m$ = {
  key: 1,
  class: "eval-dataset-editor"
}, y$ = { class: "eval-dataset-editor-head" }, b$ = ["disabled"], _$ = { class: "yv-field" }, w$ = { class: "yv-field" }, k$ = { class: "eval-dataset-form-grid" }, E$ = { class: "yv-field" }, x$ = { class: "yv-field" }, C$ = { class: "yv-field" }, S$ = { class: "eval-dataset-check" }, $$ = { class: "eval-dataset-editor-actions" }, I$ = ["disabled"], N$ = ["disabled"], M$ = {
  key: 2,
  class: "eval-dataset-empty"
}, T$ = {
  key: 3,
  class: "eval-dataset-empty"
}, O$ = {
  key: 4,
  class: "eval-dataset-empty"
}, P$ = {
  key: 5,
  class: "eval-dataset-list"
}, A$ = { class: "eval-dataset-row-main" }, D$ = { key: 0 }, R$ = { class: "eval-dataset-meta" }, V$ = { key: 0 }, L$ = { key: 1 }, z$ = { class: "eval-dataset-row-actions" }, F$ = ["disabled", "onClick"], B$ = ["disabled", "onClick"], H$ = /* @__PURE__ */ Te({
  __name: "EvalDatasetPanel",
  props: {
    spaceId: {}
  },
  setup(e) {
    const t = e, n = ee([]), o = ee(!1), s = ee(!1), i = ee(""), r = ee(!1), l = ee(null), a = ee(h());
    let c = 0;
    const d = ae(() => n.value.filter((z) => z.enabled !== !1).length), f = ae(() => !!l.value);
    function h() {
      return { question: "", expectedAnswer: "", documentIds: "", tags: "", difficulty: "medium", enabled: !0 };
    }
    function v(z) {
      return {
        question: z.question || "",
        expectedAnswer: z.expected_answer || "",
        documentIds: (z.relevant_document_ids || []).join(`
`),
        tags: (z.tags || []).join(", "),
        difficulty: z.difficulty || "medium",
        enabled: z.enabled !== !1
      };
    }
    function w(z) {
      return { easy: "简单", medium: "中等", hard: "困难" }[z || "medium"] || "中等";
    }
    function x() {
      l.value = null, a.value = h(), r.value = !0, i.value = "";
    }
    function I(z) {
      l.value = z.id, a.value = v(z), r.value = !0, i.value = "";
    }
    function C() {
      s.value || (r.value = !1, l.value = null);
    }
    async function D() {
      const z = ++c;
      if (!t.spaceId) {
        n.value = [], r.value = !1;
        return;
      }
      o.value = !0, i.value = "";
      try {
        const Y = await t$(t.spaceId);
        z === c && (n.value = Y.items || []);
      } catch (Y) {
        z === c && (i.value = qe(Y));
      } finally {
        z === c && (o.value = !1);
      }
    }
    async function _() {
      if (!t.spaceId || !a.value.question.trim()) {
        i.value = "请填写问题";
        return;
      }
      s.value = !0, i.value = "";
      try {
        const z = l.value ? await o$(t.spaceId, l.value, a.value) : await n$(t.spaceId, a.value);
        l.value ? n.value = n.value.map((Y) => Y.id === z.id ? z : Y) : n.value = [...n.value, z], C();
      } catch (z) {
        i.value = qe(z);
      } finally {
        s.value = !1;
      }
    }
    async function m(z) {
      if (!(!t.spaceId || !window.confirm(`删除这条评测题？

${z.question}`))) {
        s.value = !0, i.value = "";
        try {
          await s$(t.spaceId, z.id), n.value = n.value.filter((Y) => Y.id !== z.id), l.value === z.id && C();
        } catch (Y) {
          i.value = qe(Y);
        } finally {
          s.value = !1;
        }
      }
    }
    return Ne(() => t.spaceId, D), lt(D), (z, Y) => (S(), O("section", c$, [
      u("header", d$, [
        u("div", null, [
          Y[7] || (Y[7] = u("span", { class: "yv-kicker" }, "Regression set", -1)),
          u("h2", null, [
            Y[6] || (Y[6] = ve("人工题集 ")),
            n.value.length ? (S(), O("small", f$, F(d.value) + "/" + F(n.value.length) + " 启用", 1)) : le("", !0)
          ]),
          Y[8] || (Y[8] = u("p", null, "把真实问题留成可重复的回归样本。", -1))
        ]),
        u("div", p$, [
          u("button", {
            class: "yv-button",
            type: "button",
            disabled: o.value || s.value || !z.spaceId,
            title: "刷新题集",
            onClick: D
          }, [
            ne(H(zt), {
              size: 14,
              class: me({ "is-spinning": o.value })
            }, null, 8, ["class"]),
            Y[9] || (Y[9] = ve("刷新"))
          ], 8, h$),
          u("button", {
            class: "yv-button primary",
            type: "button",
            disabled: s.value || !z.spaceId,
            onClick: x
          }, [
            ne(H(Uo), { size: 14 }),
            Y[10] || (Y[10] = ve("新增题目"))
          ], 8, v$)
        ])
      ]),
      i.value ? (S(), O("p", g$, F(i.value), 1)) : le("", !0),
      r.value ? (S(), O("div", m$, [
        u("div", y$, [
          u("strong", null, F(f.value ? "编辑题目" : "新增题目"), 1),
          u("button", {
            class: "icon-button",
            type: "button",
            title: "关闭",
            disabled: s.value,
            onClick: C
          }, [
            ne(H(Rt), { size: 15 })
          ], 8, b$)
        ]),
        u("label", _$, [
          Y[11] || (Y[11] = u("span", null, "问题", -1)),
          Ie(u("textarea", {
            name: "question",
            "onUpdate:modelValue": Y[0] || (Y[0] = (q) => a.value.question = q),
            rows: "2",
            maxlength: "4000",
            placeholder: "例如：CHARACTOID 如何选择知识检索路径？"
          }, null, 512), [
            [Re, a.value.question]
          ])
        ]),
        u("label", w$, [
          Y[12] || (Y[12] = u("span", null, [
            ve("预期答案 "),
            u("em", null, "可选")
          ], -1)),
          Ie(u("textarea", {
            name: "expected_answer",
            "onUpdate:modelValue": Y[1] || (Y[1] = (q) => a.value.expectedAnswer = q),
            rows: "3",
            maxlength: "8000",
            placeholder: "用于人工复核与后续答案对比"
          }, null, 512), [
            [Re, a.value.expectedAnswer]
          ])
        ]),
        u("div", k$, [
          u("label", E$, [
            Y[13] || (Y[13] = u("span", null, [
              ve("相关资料 ID "),
              u("em", null, "每行一个，也可用逗号分隔")
            ], -1)),
            Ie(u("textarea", {
              "onUpdate:modelValue": Y[2] || (Y[2] = (q) => a.value.documentIds = q),
              rows: "2",
              placeholder: "上传资料列表中的 ID"
            }, null, 512), [
              [Re, a.value.documentIds]
            ])
          ]),
          u("label", x$, [
            Y[14] || (Y[14] = u("span", null, [
              ve("标签 "),
              u("em", null, "用逗号分隔")
            ], -1)),
            Ie(u("input", {
              "onUpdate:modelValue": Y[3] || (Y[3] = (q) => a.value.tags = q),
              placeholder: "角色, RAG, 回归"
            }, null, 512), [
              [Re, a.value.tags]
            ])
          ]),
          u("label", C$, [
            Y[16] || (Y[16] = u("span", null, "难度", -1)),
            Ie(u("select", {
              "onUpdate:modelValue": Y[4] || (Y[4] = (q) => a.value.difficulty = q)
            }, Y[15] || (Y[15] = [
              u("option", { value: "easy" }, "简单", -1),
              u("option", { value: "medium" }, "中等", -1),
              u("option", { value: "hard" }, "困难", -1)
            ]), 512), [
              [Qt, a.value.difficulty]
            ])
          ]),
          u("label", S$, [
            Ie(u("input", {
              "onUpdate:modelValue": Y[5] || (Y[5] = (q) => a.value.enabled = q),
              type: "checkbox"
            }, null, 512), [
              [Qc, a.value.enabled]
            ]),
            Y[17] || (Y[17] = u("span", null, "加入后续评测", -1))
          ])
        ]),
        u("div", $$, [
          u("button", {
            class: "yv-button",
            type: "button",
            disabled: s.value,
            onClick: C
          }, "取消", 8, I$),
          u("button", {
            class: "yv-button primary",
            type: "button",
            disabled: s.value || !a.value.question.trim(),
            onClick: _
          }, [
            ne(H(Rn), { size: 14 }),
            ve(F(s.value ? "保存中" : "保存题目"), 1)
          ], 8, N$)
        ])
      ])) : le("", !0),
      o.value && !n.value.length ? (S(), O("div", M$, "读取题集…")) : !n.value.length && !z.spaceId ? (S(), O("div", T$, "先选择一个角色")) : n.value.length ? (S(), O("div", P$, [
        (S(!0), O(ye, null, Oe(n.value, (q) => {
          var j;
          return S(), O("article", {
            key: q.id,
            class: me(["eval-dataset-row", { "is-disabled": q.enabled === !1 }])
          }, [
            u("div", A$, [
              u("strong", null, F(q.question), 1),
              q.expected_answer ? (S(), O("p", D$, F(q.expected_answer), 1)) : le("", !0),
              u("div", R$, [
                u("span", null, F(w(q.difficulty)), 1),
                (j = q.relevant_document_ids) != null && j.length ? (S(), O("span", V$, F(q.relevant_document_ids.length) + " 份资料", 1)) : le("", !0),
                (S(!0), O(ye, null, Oe(q.tags || [], (P) => (S(), O("span", {
                  key: P,
                  class: "eval-dataset-tag"
                }, F(P), 1))), 128)),
                q.enabled === !1 ? (S(), O("span", L$, "已停用")) : le("", !0)
              ])
            ]),
            u("div", z$, [
              u("button", {
                class: "icon-button",
                type: "button",
                title: "编辑",
                disabled: s.value,
                onClick: (P) => I(q)
              }, [
                ne(H(nd), { size: 15 })
              ], 8, F$),
              u("button", {
                class: "icon-button danger",
                type: "button",
                title: "删除",
                disabled: s.value,
                onClick: (P) => m(q)
              }, [
                ne(H(en), { size: 15 })
              ], 8, B$)
            ])
          ], 2);
        }), 128))
      ])) : (S(), O("div", O$, "还没有人工题目，先保存一条真实问题。"))
    ]));
  }
}), U$ = { class: "eval-candidates" }, j$ = { class: "eval-candidates-heading" }, G$ = { key: 0 }, q$ = ["disabled"], Y$ = {
  key: 0,
  class: "eval-candidates-error"
}, X$ = {
  key: 1,
  class: "eval-candidates-empty"
}, K$ = {
  key: 2,
  class: "eval-candidates-empty"
}, W$ = {
  key: 3,
  class: "eval-candidates-empty"
}, Z$ = {
  key: 4,
  class: "eval-candidates-list"
}, J$ = { class: "eval-candidate-head" }, Q$ = { class: "eval-candidate-source" }, eI = { class: "eval-candidate-signals" }, tI = { class: "eval-candidate-question" }, nI = { class: "eval-candidate-meta" }, oI = { class: "eval-candidate-editor" }, sI = { class: "yv-field" }, iI = ["onUpdate:modelValue"], rI = { class: "eval-candidate-fields" }, lI = { class: "yv-field" }, aI = ["onUpdate:modelValue"], uI = { class: "yv-field" }, cI = ["onUpdate:modelValue"], dI = { class: "yv-field" }, fI = ["onUpdate:modelValue"], pI = { class: "yv-field" }, hI = ["onUpdate:modelValue"], vI = { class: "eval-candidate-actions" }, gI = ["disabled", "onClick"], mI = ["disabled", "onClick"], yI = /* @__PURE__ */ Te({
  __name: "EvalCandidatePanel",
  props: {
    spaceId: {}
  },
  emits: ["accepted"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = ee([]), i = ee(0), r = ee(!1), l = ee(!1), a = ee(""), c = ee(""), d = wn({}), f = ae(() => !!n.spaceId);
    function h(D) {
      return d[D.id] || (d[D.id] = {
        expectedAnswer: D.suggested_answer || "",
        documentIds: (D.relevant_document_ids || []).join(`
`),
        tags: (D.tags || []).join(", "),
        difficulty: "medium",
        note: ""
      });
    }
    function v(D) {
      return D.source === "feedback" ? "用户反馈" : "质量信号";
    }
    function w() {
      return n.spaceId ? (r.value = !0, c.value = "", i$(n.spaceId).then((D) => {
        s.value = D.items || [], i.value = D.pending_total || s.value.length;
        for (const _ of s.value) h(_);
      }).catch((D) => {
        c.value = qe(D);
      }).finally(() => {
        r.value = !1;
      })) : (s.value = [], i.value = 0, Promise.resolve());
    }
    async function x() {
      if (n.spaceId) {
        l.value = !0, c.value = "";
        try {
          const D = await r$(n.spaceId);
          s.value = D.items || [], i.value = s.value.length;
          for (const _ of s.value) h(_);
        } catch (D) {
          c.value = qe(D);
        } finally {
          l.value = !1;
        }
      }
    }
    async function I(D) {
      if (n.spaceId) {
        a.value = D.id, c.value = "";
        try {
          await a$(n.spaceId, D.id, h(D)), s.value = s.value.filter((_) => _.id !== D.id), i.value = Math.max(0, i.value - 1), o("accepted");
        } catch (_) {
          c.value = qe(_);
        } finally {
          a.value = "";
        }
      }
    }
    async function C(D) {
      if (n.spaceId) {
        a.value = D.id, c.value = "";
        try {
          await u$(n.spaceId, D.id, d[D.id].note), s.value = s.value.filter((_) => _.id !== D.id), i.value = Math.max(0, i.value - 1);
        } catch (_) {
          c.value = qe(_);
        } finally {
          a.value = "";
        }
      }
    }
    return Ne(() => n.spaceId, w, { immediate: !0 }), (D, _) => (S(), O("section", U$, [
      u("header", j$, [
        u("div", null, [
          _[1] || (_[1] = u("span", { class: "yv-kicker" }, "Quality loop", -1)),
          u("h2", null, [
            _[0] || (_[0] = ve("失败样本 ")),
            f.value ? (S(), O("small", G$, F(i.value) + " 条待确认", 1)) : le("", !0)
          ]),
          _[2] || (_[2] = u("p", null, "把真实问答里的问题沉淀为人工题，确认后才会进入正式评测。", -1))
        ]),
        u("button", {
          class: "yv-button",
          type: "button",
          disabled: !f.value || l.value,
          onClick: x
        }, [
          ne(H(zt), {
            size: 14,
            class: me({ "is-spinning": l.value })
          }, null, 8, ["class"]),
          ve(F(l.value ? "扫描中" : "扫描新样本"), 1)
        ], 8, q$)
      ]),
      c.value ? (S(), O("p", Y$, F(c.value), 1)) : le("", !0),
      f.value ? r.value && !s.value.length ? (S(), O("div", K$, "读取待确认样本…")) : s.value.length ? (S(), O("div", Z$, [
        (S(!0), O(ye, null, Oe(s.value, (m) => (S(), O("article", {
          key: m.id,
          class: "eval-candidate-row"
        }, [
          u("div", J$, [
            u("div", null, [
              u("span", Q$, F(v(m)), 1),
              u("small", null, "查询 " + F(m.source_query_id.slice(0, 8)), 1)
            ]),
            u("div", eI, [
              (S(!0), O(ye, null, Oe(m.signals, (z) => (S(), O("span", {
                key: z.code
              }, F(z.label), 1))), 128))
            ])
          ]),
          u("strong", tI, F(m.question), 1),
          u("div", nI, [
            u("span", null, "置信度 " + F(m.confidence.toFixed(2)), 1),
            u("span", null, F(m.grounded ? "已接地" : "未接地"), 1),
            u("span", null, F(m.useful ? "已解决" : "未解决"), 1)
          ]),
          u("div", oI, [
            u("label", sI, [
              _[3] || (_[3] = u("span", null, [
                ve("标准答案 "),
                u("em", null, "建议答案可直接修改")
              ], -1)),
              Ie(u("textarea", {
                "onUpdate:modelValue": (z) => d[m.id].expectedAnswer = z,
                rows: "3"
              }, null, 8, iI), [
                [Re, d[m.id].expectedAnswer]
              ])
            ]),
            u("div", rI, [
              u("label", lI, [
                _[4] || (_[4] = u("span", null, "关联资料 ID", -1)),
                Ie(u("input", {
                  "onUpdate:modelValue": (z) => d[m.id].documentIds = z,
                  placeholder: "每行一个 DocumentJob ID"
                }, null, 8, aI), [
                  [Re, d[m.id].documentIds]
                ])
              ]),
              u("label", uI, [
                _[5] || (_[5] = u("span", null, "标签", -1)),
                Ie(u("input", {
                  "onUpdate:modelValue": (z) => d[m.id].tags = z,
                  placeholder: "例如：反馈回流, 边界问题"
                }, null, 8, cI), [
                  [Re, d[m.id].tags]
                ])
              ]),
              u("label", dI, [
                _[7] || (_[7] = u("span", null, "难度", -1)),
                Ie(u("select", {
                  "onUpdate:modelValue": (z) => d[m.id].difficulty = z
                }, _[6] || (_[6] = [
                  u("option", { value: "easy" }, "简单", -1),
                  u("option", { value: "medium" }, "中等", -1),
                  u("option", { value: "hard" }, "困难", -1)
                ]), 8, fI), [
                  [Qt, d[m.id].difficulty]
                ])
              ])
            ]),
            u("label", pI, [
              _[8] || (_[8] = u("span", null, "复核备注", -1)),
              Ie(u("input", {
                "onUpdate:modelValue": (z) => d[m.id].note = z,
                placeholder: "可选：记录为什么收录或忽略"
              }, null, 8, hI), [
                [Re, d[m.id].note]
              ])
            ])
          ]),
          u("div", vI, [
            u("button", {
              class: "yv-button primary",
              type: "button",
              disabled: a.value === m.id,
              onClick: (z) => I(m)
            }, [
              ne(H(Rn), { size: 14 }),
              _[9] || (_[9] = ve("收录为人工题"))
            ], 8, gI),
            u("button", {
              class: "yv-button",
              type: "button",
              disabled: a.value === m.id,
              onClick: (z) => C(m)
            }, [
              ne(H(Rt), { size: 14 }),
              _[10] || (_[10] = ve("忽略"))
            ], 8, mI)
          ])
        ]))), 128))
      ])) : (S(), O("div", W$, "暂无待确认样本。点击“扫描新样本”读取低置信度、未接地或负反馈查询。")) : (S(), O("div", X$, "先选择一个角色。"))
    ]));
  }
}), bI = { class: "yv-page evaluation-page" }, _I = { class: "evaluation-hero" }, wI = { class: "evaluation-control" }, kI = { class: "control-fields" }, EI = { class: "yv-field" }, xI = ["value"], CI = { class: "yv-field" }, SI = { class: "yv-field" }, $I = { class: "control-actions" }, II = ["disabled"], NI = ["disabled"], MI = ["href"], TI = { class: "run-status" }, OI = {
  key: 0,
  class: "results-stage"
}, PI = { class: "metric-lead" }, AI = { class: "metric-groups" }, DI = {
  key: 0,
  class: "analysis-block"
}, RI = { class: "case-section" }, VI = { class: "case-index" }, LI = {
  key: 1,
  class: "evaluation-empty"
}, zI = /* @__PURE__ */ Te({
  __name: "App",
  setup(e) {
    const t = ee([]), n = ee(""), o = ee("fast"), s = ee("generated"), i = ae(() => t.value.find(($) => $.id === n.value)), r = ee({ state: "idle", progress: 0, total: 0 }), l = ee(null), a = ee(""), c = ee(""), d = ee(!1), f = ee(!1), h = ee(!1);
    let v = 0;
    const w = ae(() => ({ idle: "未运行", running: r.value.phase === "generating" ? "生成问题" : "评测中", done: "已完成", error: "失败" })[r.value.state] || r.value.state || "未运行"), x = ae(() => QS(Number(r.value.progress || 0), Number(r.value.total || 0))), I = ae(() => {
      var $;
      return (($ = l.value) == null ? void 0 : $.cases) || [];
    }), C = ae(() => h.value ? I.value : I.value.slice(0, 3)), D = ae(() => {
      var V;
      const $ = ((V = l.value) == null ? void 0 : V.metrics) || {};
      return [
        { label: "Top 3 召回率", value: _s("recall_at_3_answerable", $.recall_at_3_answerable), tone: z("recall_at_3_answerable", $.recall_at_3_answerable) },
        { label: "回答接地率", value: _s("grounded_rate", $.grounded_rate), tone: z("grounded_rate", $.grounded_rate) },
        { label: "质量通过率", value: _s("accepted_rate", $.accepted_rate), tone: z("accepted_rate", $.accepted_rate) },
        { label: "P95 总延迟", value: $.p95_total_latency_ms == null ? "—" : `${Math.round(Number($.p95_total_latency_ms))} ms`, tone: "" }
      ];
    }), _ = [
      { title: "检索质量", keys: ["recall_at_3_answerable", "precision_at_3_answerable", "mrr_at_3_answerable", "hit_at_3_answerable", "cases_answerable", "mean_latency_ms", "p95_latency_ms"] },
      { title: "回答质量", keys: ["grounded_rate", "useful_rate", "accepted_rate", "answer_rate", "refusal_rate", "cases_checked", "mean_confidence", "scope_isolation_ok"] },
      { title: "行为与性能", keys: ["rewrite_rate", "correction_rate", "mean_rewrite_count", "mean_correction_count", "complex_rewrite_rate", "complex_correction_rate", "probe_refusal_rate", "cases_total", "cases_complex", "mean_total_latency_ms", "p95_total_latency_ms"] }
    ], m = { recall_at_3_answerable: "可答问题召回率 Recall@3", precision_at_3_answerable: "可答问题精确率 Precision@3", mrr_at_3_answerable: "可答问题 MRR@3", hit_at_3_answerable: "可答问题命中 Hit@3", cases_answerable: "可答用例数", mean_latency_ms: "平均检索延迟 (ms)", p95_latency_ms: "P95 检索延迟 (ms)", grounded_rate: "事实接地率", useful_rate: "问题解决率", accepted_rate: "质量通过率", answer_rate: "正常作答率", refusal_rate: "拒答率", cases_checked: "生成已检用例", mean_confidence: "平均置信度", scope_isolation_ok: "跨角色隔离校验", rewrite_rate: "查询改写触发率", correction_rate: "生成纠错触发率", mean_rewrite_count: "平均改写次数", mean_correction_count: "平均纠错次数", complex_rewrite_rate: "复杂题改写率", complex_correction_rate: "复杂题纠错率", probe_refusal_rate: "无关问题拒答率", cases_total: "用例总数", cases_complex: "复杂题数", mean_total_latency_ms: "平均整链路延迟 (ms)", p95_total_latency_ms: "P95 整链路延迟 (ms)" };
    function z($, V) {
      if ($ === "scope_isolation_ok") return V ? "good" : "bad";
      const M = Number(V);
      return !["recall_at_3_answerable", "precision_at_3_answerable", "mrr_at_3_answerable", "hit_at_3_answerable", "grounded_rate", "useful_rate", "accepted_rate", "answer_rate", "mean_confidence"].includes($) || !Number.isFinite(M) ? "" : M >= 0.8 ? "good" : M <= 0.2 ? "bad" : "";
    }
    function Y() {
      return r.value.phase === "generating" ? r.value.status_text || "正在从角色资料生成问题" : r.value.total > 0 ? [`已完成 ${r.value.progress}/${r.value.total} 条`, r.value.current_question_text, r.value.current_step].filter(Boolean).join(" · ") : c.value || "等待开始";
    }
    async function q() {
      try {
        t.value = await Ae("/api/personas"), !n.value && t.value.length && (n.value = t.value[0].id);
      } catch ($) {
        c.value = qe($);
      }
    }
    async function j() {
      l.value = await Ae("/api/eval/results");
    }
    function P() {
      v += 1, d.value = !1;
    }
    async function L() {
      const $ = ++v;
      d.value = !0;
      for (let V = 0; V < 1200 && $ === v; V += 1) {
        try {
          if (r.value = await Ae("/api/eval/status"), r.value.state === "done") {
            await j(), d.value = !1;
            return;
          }
          if (r.value.state === "error") {
            c.value = r.value.error || "评测失败", d.value = !1;
            return;
          }
        } catch (M) {
          c.value = qe(M), d.value = !1;
          return;
        }
        await new Promise((M) => setTimeout(M, 500));
      }
    }
    async function X() {
      if (!n.value) {
        c.value = "请先选择评测角色";
        return;
      }
      c.value = "", l.value = null, a.value = "", h.value = !1;
      try {
        await Ae("/api/eval/run", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(e$({ personaId: n.value, tier: o.value, datasetMode: s.value })) }), await L();
      } catch ($) {
        c.value = qe($), d.value = !1;
      }
    }
    async function U() {
      f.value = !0;
      try {
        const $ = await Ae("/api/eval/analyze", { method: "POST" });
        a.value = $.analysis || "分析结果为空";
      } catch ($) {
        c.value = qe($);
      } finally {
        f.value = !1;
      }
    }
    async function K() {
      await q();
      try {
        r.value = await Ae("/api/eval/status"), r.value.state === "running" ? L() : r.value.state === "done" && await j();
      } catch {
      }
    }
    return lt(() => {
      const $ = document.querySelector("#evaluation-app-root");
      $ == null || $.addEventListener("charactoid:evaluation-show", K), $ == null || $.addEventListener("charactoid:evaluation-hide", P), K();
    }), sn(P), ($, V) => {
      var M, R;
      return S(), O("main", bI, [
        u("header", _I, [
          V[4] || (V[4] = u("div", null, [
            u("span", { class: "yv-kicker" }, "Retrieval quality lab"),
            u("h1", null, "RAG 评测"),
            u("p", null, "用可复现指标检查召回、回答接地与整链路延迟。")
          ], -1)),
          u("span", {
            class: me(["yv-status", r.value.state === "done" ? "ok" : r.value.state === "error" ? "error" : d.value ? "warn" : ""])
          }, F(w.value), 3)
        ]),
        u("section", wI, [
          u("div", kI, [
            u("label", EI, [
              V[6] || (V[6] = u("span", null, "评测角色", -1)),
              Ie(u("select", {
                "onUpdate:modelValue": V[0] || (V[0] = (G) => n.value = G)
              }, [
                V[5] || (V[5] = u("option", { value: "" }, "请选择角色", -1)),
                (S(!0), O(ye, null, Oe(t.value, (G) => (S(), O("option", {
                  key: G.id,
                  value: G.id
                }, F(G.name), 9, xI))), 128))
              ], 512), [
                [Qt, n.value]
              ])
            ]),
            u("label", CI, [
              V[8] || (V[8] = u("span", null, "问题规模", -1)),
              Ie(u("select", {
                "onUpdate:modelValue": V[1] || (V[1] = (G) => o.value = G)
              }, V[7] || (V[7] = [
                u("option", { value: "fast" }, "轻量 · 5 个问题", -1),
                u("option", { value: "standard" }, "标准 · 10 个问题", -1),
                u("option", { value: "thorough" }, "全面 · 15 个问题", -1)
              ]), 512), [
                [Qt, o.value]
              ])
            ]),
            u("label", SI, [
              V[10] || (V[10] = u("span", null, "题目来源", -1)),
              Ie(u("select", {
                "onUpdate:modelValue": V[2] || (V[2] = (G) => s.value = G)
              }, V[9] || (V[9] = [
                u("option", { value: "generated" }, "自动生成", -1),
                u("option", { value: "manual" }, "人工题集", -1),
                u("option", { value: "combined" }, "人工 + 自动", -1)
              ]), 512), [
                [Qt, s.value]
              ])
            ])
          ]),
          u("div", $I, [
            u("button", {
              class: "yv-button primary",
              disabled: d.value,
              onClick: X
            }, [
              ne(H(od)),
              ve(F(d.value ? "评测进行中" : "生成并评测"), 1)
            ], 8, II),
            u("button", {
              class: "yv-button",
              disabled: !l.value || f.value,
              onClick: U
            }, [
              ne(H($v)),
              ve(F(f.value ? "分析中" : "AI 分析"), 1)
            ], 8, NI),
            u("a", {
              class: me(["yv-button", { disabled: !l.value }]),
              href: l.value ? "/api/eval/export" : void 0
            }, [
              ne(H(Kn)),
              V[11] || (V[11] = ve("导出 JSON"))
            ], 10, MI)
          ])
        ]),
        ne(yI, {
          "space-id": (M = i.value) == null ? void 0 : M.knowledge_space_id
        }, null, 8, ["space-id"]),
        ne(H$, {
          "space-id": (R = i.value) == null ? void 0 : R.knowledge_space_id
        }, null, 8, ["space-id"]),
        u("section", TI, [
          u("div", null, [
            u("strong", null, F(w.value), 1),
            u("p", {
              class: me({ error: c.value })
            }, F(c.value || Y()), 3)
          ]),
          u("div", {
            class: me(["progress-track", { indeterminate: d.value && r.value.phase === "generating" }])
          }, [
            u("span", {
              style: rt({ width: `${x.value}%` })
            }, null, 4)
          ], 2)
        ]),
        l.value ? (S(), O("section", OI, [
          u("div", PI, [
            (S(!0), O(ye, null, Oe(D.value, (G) => (S(), O("article", {
              key: G.label,
              class: me(G.tone)
            }, [
              u("span", null, F(G.label), 1),
              u("strong", null, F(G.value), 1)
            ], 2))), 128))
          ]),
          u("div", AI, [
            (S(), O(ye, null, Oe(_, (G) => u("section", {
              key: G.title
            }, [
              u("h2", null, F(G.title), 1),
              u("div", null, [
                (S(!0), O(ye, null, Oe(G.keys.filter((oe) => {
                  var ue, de;
                  return ((ue = l.value.metrics) == null ? void 0 : ue[oe]) !== void 0 && ((de = l.value.metrics) == null ? void 0 : de[oe]) !== null;
                }), (oe) => (S(), O("article", { key: oe }, [
                  u("span", null, F(m[oe] || oe), 1),
                  u("strong", {
                    class: me(z(oe, l.value.metrics[oe]))
                  }, F(H(_s)(oe, l.value.metrics[oe])), 3)
                ]))), 128))
              ])
            ])), 64))
          ]),
          a.value ? (S(), O("section", DI, [
            V[12] || (V[12] = u("span", { class: "yv-kicker" }, "AI review", -1)),
            V[13] || (V[13] = u("h2", null, "结果解读", -1)),
            u("p", null, F(a.value), 1)
          ])) : le("", !0),
          u("section", RI, [
            u("header", null, [
              V[14] || (V[14] = u("div", null, [
                u("span", { class: "yv-kicker" }, "Case evidence"),
                u("h2", null, "逐条详情")
              ], -1)),
              I.value.length > 3 ? (S(), O("button", {
                key: 0,
                class: "yv-button",
                onClick: V[3] || (V[3] = (G) => h.value = !h.value)
              }, F(h.value ? "收起" : `展开全部 ${I.value.length} 条`), 1)) : le("", !0)
            ]),
            (S(!0), O(ye, null, Oe(C.value, (G, oe) => (S(), O("article", {
              key: oe,
              class: "case-row"
            }, [
              u("div", VI, F(String(oe + 1).padStart(2, "0")), 1),
              u("div", null, [
                u("strong", null, F(G.question), 1),
                u("p", null, F((G.answer || "").slice(0, 240)), 1),
                u("small", null, F([G.grounded == null ? "grounded=—" : `grounded=${G.grounded}`, G.useful == null ? "useful=—" : `useful=${G.useful}`, `confidence=${G.confidence ?? "—"}`, G.rewrite_used ? "查询改写" : "", G.corrected ? "生成纠错" : "", G.is_probe ? "无关探针" : ""].filter(Boolean).join(" · ")), 1)
              ]),
              u("span", {
                class: me(["yv-status", G.accepted || G.is_probe && G.refused ? "ok" : "error"])
              }, F(G.accepted || G.is_probe && G.refused ? "符合预期" : "未通过"), 3)
            ]))), 128))
          ])
        ])) : (S(), O("section", LI, [
          ne(H(gv)),
          V[15] || (V[15] = u("h2", null, "等待一轮可比较的结果", -1)),
          V[16] || (V[16] = u("p", null, "选择角色和问题规模后开始。评测会覆盖知识召回、复杂问题与无关问题拒答。", -1))
        ]))
      ]);
    };
  }
});
let gn = null;
const Hf = () => document.querySelector("#evaluation-app-root");
function EM(e = "#evaluation-app-root") {
  if (gn) return gn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("RAG 评测挂载点不存在");
  return gn = ts(zI), gn.mount(t), gn;
}
function xM() {
  var e;
  (e = Hf()) == null || e.dispatchEvent(new CustomEvent("charactoid:evaluation-show"));
}
function CM() {
  var e;
  (e = Hf()) == null || e.dispatchEvent(new CustomEvent("charactoid:evaluation-hide"));
}
function SM() {
  gn && (gn.unmount(), gn = null);
}
async function is(e, t) {
  const n = await fetch(e, t), o = await n.json().catch(() => null);
  if (!n.ok) throw new Error((o == null ? void 0 : o.detail) || `请求失败 (${n.status})`);
  return o;
}
function FI() {
  return is("/api/reranker/status", { cache: "no-store" });
}
function BI(e) {
  return is("/api/reranker/install", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
    body: JSON.stringify({ model_id: "Qwen/Qwen3-Reranker-0.6B", source: "modelscope", device: e })
  });
}
function HI() {
  return is("/api/reranker/install/cancel", { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } });
}
function UI() {
  return is("/api/reranker/model", { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } });
}
function jI() {
  return is("/api/reranker/model-directory", { method: "POST", headers: { "X-CHARACTOID-Request": "web" } });
}
const GI = { class: "settings-summary" }, qI = { class: "section-toggle-label" }, YI = { class: "asr-resource-bar" }, XI = {
  key: 0,
  max: "100"
}, KI = {
  key: 1,
  class: "inline-status"
}, WI = { class: "asr-actions" }, ZI = ["disabled"], JI = ["disabled"], QI = ["disabled"], eN = ["disabled"], tN = { class: "settings-grid one-column reranker-settings-grid" }, nN = { class: "field provider-field" }, oN = ["disabled"], sN = /* @__PURE__ */ Te({
  __name: "RerankerSettingsApp",
  setup(e) {
    const t = ee(null), n = ee("auto"), o = ee(!1), s = ee(""), i = ee(!1);
    let r;
    const l = ae(() => s.value ? "检查失败" : t.value ? t.value.installing ? "安装中" : t.value.ready ? "已就绪" : t.value.installed ? "已安装，等待加载" : "未安装" : "检查中"), a = ae(() => s.value ? s.value : t.value ? t.value.ready ? "本地精排可用；检索候选将经过语义重排序。" : t.value.installed ? "模型文件完整，将在首次检索时加载。" : "未安装时系统自动使用 RRF 融合结果，不会阻断知识检索。" : "正在读取本地模型状态"), c = ae(() => {
      var x;
      if (!((x = t.value) != null && x.installing)) return "";
      const v = t.value.phase || "准备资源";
      return `${t.value.current_file || v} · ${Math.round(t.value.elapsed_seconds || 0)} 秒`;
    });
    async function d() {
      try {
        t.value = await FI(), n.value = t.value.device || n.value, s.value = t.value.error || "";
      } catch (v) {
        s.value = v instanceof Error ? v.message : "无法读取 Reranker 状态";
      }
    }
    async function f(v) {
      if (!o.value) {
        o.value = !0, s.value = "";
        try {
          t.value = await v();
        } catch (w) {
          s.value = w instanceof Error ? w.message : "操作失败";
        } finally {
          o.value = !1;
        }
      }
    }
    async function h() {
      if (!o.value) {
        o.value = !0, s.value = "";
        try {
          await jI();
        } catch (v) {
          s.value = v instanceof Error ? v.message : "无法打开模型目录";
        } finally {
          o.value = !1;
        }
      }
    }
    return lt(() => {
      d(), r = window.setInterval(() => {
        var v;
        (v = t.value) != null && v.installing && d();
      }, 1500);
    }), sn(() => {
      r && window.clearInterval(r);
    }), (v, w) => {
      var x, I, C, D, _, m, z;
      return S(), O("details", {
        class: "panel settings-section",
        "data-collapsible": "",
        onToggle: w[4] || (w[4] = (Y) => i.value = Y.currentTarget.open)
      }, [
        u("summary", GI, [
          w[5] || (w[5] = u("span", { class: "settings-summary-title" }, [
            u("strong", null, "Reranker 精排"),
            u("span", { class: "settings-summary-meta" }, "候选重排序 · 本地模型 · RRF 自动降级")
          ], -1)),
          u("span", qI, F(i.value ? "收起" : "展开"), 1)
        ]),
        w[9] || (w[9] = u("p", { class: "settings-help" }, [
          ve("使用本地模型 "),
          u("code", null, "Qwen3-Reranker-0.6B"),
          ve(" 对召回候选精排；模型未安装或暂不可用时，系统自动保留 RRF 融合结果。")
        ], -1)),
        u("div", YI, [
          u("div", null, [
            u("strong", null, F(l.value), 1),
            u("p", {
              class: me(["inline-status", { "is-error": !!s.value }]),
              role: "status",
              "aria-live": "polite"
            }, F(a.value), 3),
            (x = t.value) != null && x.installing ? (S(), O("progress", XI)) : le("", !0),
            c.value ? (S(), O("p", KI, F(c.value), 1)) : le("", !0)
          ]),
          u("div", WI, [
            u("button", {
              class: "button button-secondary",
              type: "button",
              disabled: o.value,
              onClick: h
            }, [
              ne(H(Ao), { size: 16 }),
              w[6] || (w[6] = ve("打开目录"))
            ], 8, ZI),
            u("button", {
              class: "button button-danger",
              type: "button",
              disabled: o.value || !((I = t.value) != null && I.installed) || ((C = t.value) == null ? void 0 : C.installing),
              onClick: w[0] || (w[0] = (Y) => f(H(UI)))
            }, "删除", 8, JI),
            (D = t.value) != null && D.installing ? (S(), O("button", {
              key: 0,
              class: "button button-secondary",
              type: "button",
              disabled: o.value || t.value.cancelling,
              onClick: w[1] || (w[1] = (Y) => f(H(HI)))
            }, "取消下载", 8, QI)) : (S(), O("button", {
              key: 1,
              class: "button button-primary",
              type: "button",
              disabled: o.value || ((_ = t.value) == null ? void 0 : _.installed),
              onClick: w[2] || (w[2] = (Y) => f(() => H(BI)(n.value)))
            }, "安装", 8, eN))
          ])
        ]),
        u("div", tN, [
          u("label", nN, [
            w[8] || (w[8] = u("span", null, "运行设备", -1)),
            Ie(u("select", {
              "onUpdate:modelValue": w[3] || (w[3] = (Y) => n.value = Y),
              disabled: o.value || ((m = t.value) == null ? void 0 : m.installing) || ((z = t.value) == null ? void 0 : z.installed)
            }, w[7] || (w[7] = [
              u("option", { value: "auto" }, "自动（GPU 优先）", -1),
              u("option", { value: "cuda" }, "仅 GPU", -1),
              u("option", { value: "cpu" }, "仅 CPU", -1)
            ]), 8, oN), [
              [Qt, n.value]
            ])
          ])
        ]),
        w[10] || (w[10] = u("details", { class: "settings-help" }, [
          u("summary", null, "参数说明"),
          u("p", null, [
            ve("模型固定为 "),
            u("code", null, "Qwen/Qwen3-Reranker-0.6B"),
            ve("，从 ModelScope 下载。设备选择在安装时保存；需要更换设备时，删除后重新安装。")
          ])
        ], -1))
      ], 32);
    };
  }
}), iN = /* @__PURE__ */ ml(sN, [["__scopeId", "data-v-bf7b6366"]]), rN = { class: "providers-settings" }, lN = {
  class: "provider-tabs",
  role: "tablist",
  "aria-label": "供应商类型"
}, aN = ["aria-selected", "onClick"], uN = {
  key: 0,
  class: "download-center",
  "aria-label": "资源下载中心"
}, cN = ["aria-expanded"], dN = { class: "download-summary-icon" }, fN = { class: "download-summary-copy" }, pN = {
  key: 0,
  class: "download-summary-progress"
}, hN = {
  class: "config-drawer download-drawer",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "资源下载任务"
}, vN = { class: "drawer-header" }, gN = { class: "drawer-header-actions" }, mN = { class: "drawer-body download-list" }, yN = {
  key: 0,
  class: "empty-state"
}, bN = {
  key: 1,
  class: "empty-state"
}, _N = { class: "download-task-head" }, wN = { class: "task-progress" }, kN = { class: "download-task-meta" }, EN = { key: 0 }, xN = { key: 1 }, CN = { key: 2 }, SN = {
  key: 3,
  class: "task-error"
}, $N = {
  key: 0,
  class: "download-task-actions"
}, IN = ["onClick"], NN = {
  key: 1,
  class: "download-task-actions"
}, MN = ["onClick"], TN = {
  key: 2,
  class: "local-production-zone",
  "aria-labelledby": "local-production-title"
}, ON = { class: "production-grid" }, PN = {
  key: 0,
  class: "production-card production-card-rvc"
}, AN = { class: "production-card-head" }, DN = { class: "production-facts" }, RN = { class: "production-actions" }, VN = {
  key: 1,
  class: "production-card"
}, LN = { class: "production-card-head" }, zN = { class: "production-actions" }, FN = { class: "production-card production-card-ffmpeg" }, BN = { class: "production-card-head" }, HN = { class: "production-facts" }, UN = { class: "production-actions" }, jN = ["disabled"], GN = ["disabled"], qN = ["disabled"], YN = {
  key: 3,
  class: "providers-main"
}, XN = {
  key: 0,
  class: "loading-state"
}, KN = {
  key: 1,
  class: "error-state"
}, WN = {
  key: 2,
  class: "empty-state"
}, ZN = ["onClick", "onKeydown"], JN = { class: "provider-header" }, QN = { class: "provider-title" }, e3 = {
  key: 0,
  class: "mode-badge"
}, t3 = {
  key: 1,
  class: "mode-badge api"
}, n3 = ["aria-checked", "aria-label", "onClick", "disabled"], o3 = {
  key: 1,
  class: "active-label"
}, s3 = { class: "provider-description" }, i3 = {
  key: 0,
  class: "provider-meta resource-meta"
}, r3 = {
  key: 1,
  class: "provider-meta"
}, l3 = {
  key: 2,
  class: "provider-meta"
}, a3 = {
  key: 0,
  class: "meta-url"
}, u3 = { class: "provider-actions" }, c3 = ["onClick"], d3 = ["onClick", "disabled"], f3 = {
  class: "config-drawer rvc-workspace-drawer",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "RVC 音频生产资源管理"
}, p3 = { class: "drawer-header" }, h3 = { class: "drawer-body rvc-workspace-body" }, v3 = { class: "rvc-workspace-summary" }, g3 = {
  class: "rvc-component-list",
  "aria-label": "RVC 资源状态"
}, m3 = { class: "rvc-component-icon" }, y3 = { key: 1 }, b3 = { class: "rvc-component-copy" }, _3 = { class: "rvc-install-block" }, w3 = {
  key: 0,
  class: "rvc-progress"
}, k3 = { class: "production-actions" }, E3 = ["disabled"], x3 = ["disabled"], C3 = ["disabled"], S3 = ["disabled"], $3 = {
  key: 0,
  class: "config-error"
}, I3 = {
  key: 1,
  class: "config-error"
}, N3 = ["aria-label"], M3 = { class: "drawer-header" }, T3 = { class: "drawer-body" }, O3 = { class: "drawer-status" }, P3 = {
  key: 0,
  class: "field"
}, A3 = {
  key: 1,
  class: "field"
}, D3 = {
  key: 2,
  class: "resource-config-readonly"
}, R3 = {
  key: 0,
  class: "field"
}, V3 = { class: "field" }, L3 = ["placeholder"], z3 = { class: "field" }, F3 = ["placeholder"], B3 = { class: "resource-config-intro" }, H3 = {
  key: 0,
  class: "config-hint"
}, U3 = { class: "field" }, j3 = ["placeholder"], G3 = { class: "form-row" }, q3 = { class: "field" }, Y3 = { class: "field" }, X3 = {
  key: 1,
  class: "resource-install-form"
}, K3 = {
  key: 2,
  class: "resource-config-readonly"
}, W3 = {
  key: 3,
  class: "resource-config-readonly"
}, Z3 = { class: "resource-controls" }, J3 = { class: "resource-control-actions" }, Q3 = ["disabled"], eM = ["disabled"], tM = ["disabled"], nM = ["disabled"], oM = ["disabled"], sM = ["disabled"], iM = {
  key: 3,
  class: "config-hint"
}, rM = { class: "modal-actions" }, lM = ["disabled"], aM = {
  key: 4,
  class: "config-success"
}, uM = {
  key: 6,
  class: "config-error"
}, er = "https://huggingface.co/lj1995/GPT-SoVITS-windows-package/resolve/main/GPT-SoVITS-v3lora-20250228.7z?download=true", cM = /* @__PURE__ */ Te({
  __name: "ProvidersApp",
  setup(e) {
    const t = ee([]), n = ee("llm"), o = ee(!1), s = ee(""), i = ee(null), r = ee(null), l = ee(null), a = ee(""), c = ee(""), d = ee({}), f = ee(er), h = ee([]), v = ee(!1), w = ee(!1), x = ee(!1);
    let I;
    const C = ee({
      provider_type: "",
      provider_id: "",
      api_key: "",
      base_url: "",
      model: "",
      source: "modelscope",
      device: "auto",
      enabled: !1
    }), D = [
      { id: "llm", label: "对话模型", count: 0 },
      { id: "embedding", label: "知识库向量化", count: 0 },
      { id: "reranker", label: "检索重排", count: 0 },
      { id: "stt", label: "语音识别", count: 0 },
      { id: "tts", label: "对话语音", count: 0 },
      { id: "web_search", label: "联网搜索", count: 0 },
      { id: "audio", label: "音频", count: 0 }
    ], _ = ae(() => t.value.filter((N) => N.type === n.value)), m = ae(() => t.value.find((N) => N.id === "rvc")), z = ae(() => t.value.find((N) => N.id === "separator")), Y = ee({}), q = ae(() => t.value.find((N) => N.id === i.value)), j = ae(() => !!(i.value || v.value || w.value));
    Ne(j, (N) => {
      document.body.classList.toggle("provider-modal-open", N), document.documentElement.classList.toggle("provider-modal-open", N);
    });
    const P = ae(() => {
      var g;
      const N = (g = q.value) == null ? void 0 : g.id;
      return N === "local_embedding" ? "embedding" : N === "local_rerank" ? "reranker" : N === "local_stt" ? "stt" : N === "gsv_tts_local" ? "gpt_sovits" : N === "separator" ? "separator" : "none";
    });
    function L() {
      switch (P.value) {
        case "embedding":
          return "用于知识库向量化；安装前可选择模型来源和运行设备。";
        case "reranker":
          return "用于检索结果重排；未安装时仍可使用 RRF 融合，不会阻断检索。";
        case "stt":
          return "本地语音识别由系统按固定清单准备，不需要在此重复填写模型参数。";
        case "gpt_sovits":
          return "引擎按需启动；安装完成后，声音资产仍在“声音”模块管理。";
        case "separator":
          return "人声分离使用应用已验证的固定模型，不需要填写通用模型来源或设备。";
        default:
          return "";
      }
    }
    const X = {
      local_embedding: { status: "/api/embedding/status", install: "/api/embedding/install", cancel: "/api/embedding/install/cancel", remove: "/api/embedding/model", directory: "/api/embedding/model-directory" },
      local_rerank: { status: "/api/reranker/status", install: "/api/reranker/install", cancel: "/api/reranker/install/cancel", remove: "/api/reranker/model", directory: "/api/reranker/model-directory" },
      local_stt: { status: "/api/stt/status", install: "/api/stt/install", cancel: "/api/stt/install/cancel", remove: "/api/stt/install", directory: "/api/stt/model-directory" },
      gsv_tts_local: { status: "/api/gpt-sovits/status", install: "/api/gpt-sovits/install", cancel: "/api/gpt-sovits/install/cancel", remove: "/api/gpt-sovits/install", directory: "/api/gpt-sovits/model-directory", start: "/api/gpt-sovits/service/start", stop: "/api/gpt-sovits/service/stop" },
      // RVC 是音色转换资源，不计入 TTS 供应商数量；后端未实现时由抽屉显示可读错误。
      rvc: { status: "/api/providers/rvc/status", install: "/api/providers/rvc/install", cancel: "/api/providers/rvc/install/cancel", remove: "/api/providers/rvc/install", directory: "/api/providers/rvc/directory" },
      separator: { status: "/api/providers/resources/separator", install: "/api/providers/resources/separator/install", cancel: "/api/providers/resources/tasks", remove: "/api/providers/resources/separator", directory: "/api/providers/resources/separator" }
    };
    function U(N) {
      return ["queued", "preparing", "downloading", "verifying", "installing"].includes(N.status);
    }
    const K = ae(() => h.value.filter(U)), $ = ae(() => h.value.filter((N) => !U(N)).length);
    function V(N) {
      if (!N || N < 1024) return `${N || 0} B`;
      const g = ["KB", "MB", "GB", "TB"];
      let Z = N, ie = -1;
      do
        Z /= 1024, ie++;
      while (Z >= 1024 && ie < g.length - 1);
      return `${Z.toFixed(Z >= 100 ? 0 : Z >= 10 ? 1 : 2)} ${g[ie]}`;
    }
    function M(N) {
      return N == null || N < 0 ? "—" : N < 60 ? `${Math.round(N)} 秒` : `${Math.floor(N / 60)} 分 ${Math.round(N % 60)} 秒`;
    }
    function R(N) {
      return { queued: "排队中", preparing: "准备中", downloading: "下载中", verifying: "校验中", installing: "安装中", ready: "已完成", failed: "失败", cancelled: "已取消", interrupted: "已中断" }[N.status] || N.status;
    }
    async function G() {
      x.value = !0;
      try {
        const N = await fetch("/api/resources/tasks?limit=30", { headers: { "X-CHARACTOID-Request": "web" }, cache: "no-store" });
        if (!N.ok) return;
        const g = await N.json(), Z = Array.isArray(g) ? g : g.tasks || g.items || [];
        h.value = Z.map((ie) => ({
          ...ie,
          progress_percent: ie.progress_percent ?? (typeof ie.progress == "number" ? ie.progress : 0),
          error_message: ie.error_message ?? ie.error,
          current_file: ie.current_file ?? ie.detail
        }));
      } catch {
      } finally {
        x.value = !1;
      }
    }
    async function oe(N) {
      try {
        await fetch(`/api/resources/tasks/${encodeURIComponent(N.task_id)}`, { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } }), await G();
      } catch (g) {
        s.value = g instanceof Error ? g.message : "取消下载失败";
      }
    }
    async function ue() {
      try {
        const N = await fetch("/api/resources/tasks?finished=true", { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } });
        if (!N.ok) {
          const g = await N.json().catch(() => ({}));
          throw new Error(g.detail || `HTTP ${N.status}`);
        }
        await G();
      } catch (N) {
        s.value = N instanceof Error ? N.message : "清理下载记录失败";
      }
    }
    async function de(N) {
      try {
        const g = await fetch(`/api/resources/tasks/${encodeURIComponent(N.task_id)}/retry`, { method: "POST", headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" } });
        if (!g.ok) {
          const Z = await g.json().catch(() => ({}));
          throw new Error(Z.detail || `HTTP ${g.status}`);
        }
        await G();
      } catch (g) {
        s.value = g instanceof Error ? g.message : "重试下载失败";
      }
    }
    async function re() {
      try {
        const N = await fetch("/api/providers/resources/ffmpeg/status", { headers: { "X-CHARACTOID-Request": "web" }, cache: "no-store" });
        N.ok && (Y.value = await N.json());
      } catch {
      }
    }
    async function fe(N) {
      const g = { install: "/api/providers/resources/ffmpeg/install", remove: "/api/providers/resources/ffmpeg", directory: "/api/providers/resources/ffmpeg/directory" };
      l.value = `ffmpeg:${N}`, s.value = "";
      try {
        const Z = await fetch(g[N], { method: N === "remove" ? "DELETE" : N === "directory" ? "GET" : "POST", headers: { "X-CHARACTOID-Request": "web" } });
        if (!Z.ok) {
          const ie = await Z.json().catch(() => ({}));
          throw new Error(ie.detail || `HTTP ${Z.status}`);
        }
        Y.value = await Z.json();
      } catch (Z) {
        s.value = Z instanceof Error ? Z.message : "FFmpeg 操作失败";
      } finally {
        l.value = null;
      }
    }
    async function ce() {
      o.value = !0, s.value = "";
      try {
        const N = await fetch("/api/providers/list", { cache: "no-store" });
        if (!N.ok) throw new Error(`HTTP ${N.status}`);
        const g = await N.json();
        t.value = g.providers || [], await re(), D.forEach((Z) => {
          Z.count = t.value.filter((ie) => ie.type === Z.id).length;
        });
      } catch (N) {
        s.value = N instanceof Error ? N.message : "加载失败";
      } finally {
        o.value = !1;
      }
    }
    function he(N) {
      if (N.id === "rvc") {
        w.value = !0, ce();
        return;
      }
      i.value = N.id, a.value = "", c.value = "", s.value = "";
      const g = N.resource_status || {};
      C.value = {
        provider_type: N.type,
        provider_id: N.id,
        api_key: N.current_api_key || "",
        base_url: N.current_base_url || N.default_base_url,
        model: N.current_model || String(g.model_id || N.default_model || ""),
        source: String(g.source || "modelscope"),
        device: String(g.device || "auto"),
        enabled: N.is_active
      }, f.value = er;
    }
    function te() {
      w.value = !1, s.value = "";
    }
    function _e(N) {
      var Z, ie;
      const g = (ie = (Z = m.value) == null ? void 0 : Z.resource_status) == null ? void 0 : ie.components;
      return (g == null ? void 0 : g[N]) || {};
    }
    function xe(N) {
      return !!_e(N).ready;
    }
    function we(N) {
      return xe(N) ? "已就绪" : N === "indices" ? "可选" : "待准备";
    }
    function ke() {
      var g, Z;
      const N = (Z = (g = m.value) == null ? void 0 : g.resource_status) == null ? void 0 : Z.progress_percent;
      return typeof N == "number" ? Math.min(100, Math.max(0, N)) : 0;
    }
    function J() {
      i.value = null, a.value = "", c.value = "", f.value = "", C.value = { provider_type: "", provider_id: "", api_key: "", base_url: "", model: "", source: "modelscope", device: "auto", enabled: !1 }, f.value = er;
    }
    async function p() {
      if (C.value.provider_id) {
        C.value.enabled = !0, o.value = !0, s.value = "", a.value = "";
        try {
          const N = await fetch("/api/providers/configure", {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
            body: JSON.stringify(y())
          });
          if (!N.ok) {
            const Z = await N.json().catch(() => ({}));
            throw new Error(Z.detail || `HTTP ${N.status}`);
          }
          const g = await N.json();
          a.value = g.message || "配置已保存", await ce();
        } catch (N) {
          s.value = N instanceof Error ? N.message : "配置失败";
        } finally {
          o.value = !1;
        }
      }
    }
    function T() {
      switch (P.value) {
        case "embedding":
        case "reranker":
          return { model_id: C.value.model, source: C.value.source || "modelscope", device: C.value.device || "auto" };
        case "gpt_sovits":
          return { url: f.value.trim() };
        default:
          return {};
      }
    }
    function y() {
      var g;
      const N = { ...C.value };
      return ((g = q.value) == null ? void 0 : g.mode) === "local" && (["embedding", "reranker"].includes(P.value) || (delete N.model, delete N.source, delete N.device), delete N.api_key, delete N.base_url), N;
    }
    async function b(N, g) {
      const Z = X[N.id], ie = Z == null ? void 0 : Z[g];
      if (ie) {
        l.value = `${N.id}:${g}`, s.value = "";
        try {
          const ge = g === "remove" || g === "cancel" ? "DELETE" : g === "directory" && N.id === "rvc" ? "GET" : g === "install" || g === "directory" || g === "start" || g === "stop" ? "POST" : "GET";
          let Ce;
          g === "install" && (Ce = N.id === "gsv_tts_local" ? JSON.stringify({ url: f.value.trim() }) : N.id === "local_stt" ? void 0 : JSON.stringify(T()));
          let $e;
          if (g === "install" && N.mode === "local") {
            const Ge = `/api/resources/${encodeURIComponent(N.id)}/install`;
            $e = await fetch(Ge, { method: "POST", headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body: JSON.stringify({ parameters: N.id === "gsv_tts_local" ? { url: f.value.trim() } : T() }) }), ($e.status === 404 || $e.status === 405) && ($e = await fetch(ie, { method: ge, headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body: Ce }));
          } else
            $e = await fetch(ie, { method: ge, headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body: Ce });
          if (!$e.ok) {
            const Ge = await $e.json().catch(() => ({}));
            throw new Error(Ge.detail || `HTTP ${$e.status}`);
          }
          await ce(), await G();
        } catch (ge) {
          s.value = ge instanceof Error ? ge.message : "资源操作失败";
        } finally {
          l.value = null;
        }
      }
    }
    async function k(N) {
      var g, Z;
      o.value = !0, s.value = "";
      try {
        const ie = await fetch("/api/providers/configure", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
          body: JSON.stringify({ provider_type: N.type, provider_id: N.id, api_key: N.current_api_key, base_url: N.current_base_url || N.default_base_url, model: N.current_model || N.default_model, source: (g = N.resource_status) == null ? void 0 : g.source, device: (Z = N.resource_status) == null ? void 0 : Z.device, enabled: !N.is_active })
        });
        if (!ie.ok) {
          const ge = await ie.json().catch(() => ({}));
          throw new Error(ge.detail || `HTTP ${ie.status}`);
        }
        await ce();
      } catch (ie) {
        s.value = ie instanceof Error ? ie.message : "切换失败";
      } finally {
        o.value = !1;
      }
    }
    async function E(N) {
      r.value = N.id, s.value = "", d.value = { ...d.value, [N.id]: { ok: !1, message: "正在测试连接…" } };
      try {
        const g = await fetch("/api/providers/test", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
          body: JSON.stringify({ provider_type: N.type, provider_id: N.id, api_key: N.current_api_key, base_url: N.current_base_url, model: N.current_model })
        });
        if (!g.ok) {
          const Ce = await g.json().catch(() => ({}));
          throw new Error(Ce.detail || `HTTP ${g.status}`);
        }
        const Z = await g.json(), ie = !!Z.ok, ge = ie ? `成功${Z.latency_ms ? ` · ${Z.latency_ms} ms` : ""}` : `失败 · ${Z.message || "未通过"}`;
        d.value = { ...d.value, [N.id]: { ok: ie, message: ge } }, c.value = ge;
      } catch (g) {
        const Z = `失败 · ${g instanceof Error ? g.message : "网络错误"}`;
        d.value = { ...d.value, [N.id]: { ok: !1, message: Z } }, c.value = Z;
      } finally {
        r.value = null;
      }
    }
    function B(N) {
      var Z;
      const g = N.resource_status || {};
      return !!(g.ready || g.service_running || g.installed || (Z = g.install) != null && Z.installed);
    }
    function W(N) {
      var Z;
      const g = N.resource_status || {};
      return !!(g.installing || (Z = g.install) != null && Z.installing);
    }
    function Q(N) {
      var g, Z;
      return W(N) ? `安装中${(g = N.resource_status) != null && g.phase ? ` · ${N.resource_status.phase}` : ""}` : N.id === "gsv_tts_local" && ((Z = N.resource_status) != null && Z.service_running) ? "服务运行中" : B(N) ? "资源就绪" : "未安装";
    }
    function A(N) {
      N.key === "Escape" && i.value && J();
    }
    return lt(() => {
      ce(), G(), I = window.setInterval(() => {
        G(), re();
      }, 2500), window.addEventListener("keydown", A);
    }), sn(() => {
      document.body.classList.remove("provider-modal-open"), document.documentElement.classList.remove("provider-modal-open"), I && window.clearInterval(I), window.removeEventListener("keydown", A);
    }), (N, g) => {
      var Z, ie, ge, Ce, $e, Ge, st, bt, _t, rn, ho, at, wt, vo, yl, bl, _l, wl, kl, El, xl, Cl, Sl, $l, Il, Nl, Ml, Tl, Ol, Pl, Al, Dl, Rl, Vl, Ll, zl;
      return S(), O("div", rN, [
        u("nav", lN, [
          (S(), O(ye, null, Oe(D, (se) => u("button", {
            key: se.id,
            class: me(["tab-button", { active: n.value === se.id }]),
            role: "tab",
            "aria-selected": n.value === se.id,
            onClick: (go) => n.value = se.id
          }, [
            u("span", null, F(se.label), 1)
          ], 10, aN)), 64))
        ]),
        K.value.length ? (S(), O("section", uN, [
          u("button", {
            class: "download-summary",
            type: "button",
            onClick: g[0] || (g[0] = (se) => v.value = !0),
            "aria-expanded": v.value
          }, [
            u("span", dN, [
              ne(H(Kn), {
                size: 16,
                class: me({ spin: K.value.length > 0 })
              }, null, 8, ["class"])
            ]),
            u("span", fN, [
              u("strong", null, F(K.value.length ? `正在处理 ${K.value.length} 个资源` : "资源任务中心"), 1),
              u("span", null, F(K.value[0] ? `${K.value[0].resource_name || K.value[0].provider_id} · ${R(K.value[0])}` : "查看最近的安装、校验与失败记录"), 1)
            ]),
            K.value[0] ? (S(), O("span", pN, [
              u("b", null, F(Math.round(K.value[0].progress_percent || 0)) + "%", 1),
              u("i", null, [
                u("em", {
                  style: rt({ width: `${Math.min(100, Math.max(0, K.value[0].progress_percent || 0))}%` })
                }, null, 4)
              ])
            ])) : le("", !0),
            g[26] || (g[26] = u("span", { class: "download-summary-arrow" }, "查看详情 →", -1))
          ], 8, cN)
        ])) : le("", !0),
        v.value ? (S(), O("div", {
          key: 1,
          class: "drawer-overlay",
          onClick: g[2] || (g[2] = mt((se) => v.value = !1, ["self"]))
        }, [
          u("aside", hN, [
            u("div", vN, [
              g[27] || (g[27] = u("div", null, [
                u("p", { class: "eyebrow" }, "RESOURCE TASKS"),
                u("h3", null, "下载中心"),
                u("p", null, "只在有活动任务时显示入口；已结束任务可在这里重试或清理。")
              ], -1)),
              u("div", gN, [
                $.value ? (S(), O("button", {
                  key: 0,
                  class: "button button-quiet",
                  type: "button",
                  onClick: ue
                }, "清理已结束")) : le("", !0),
                u("button", {
                  class: "modal-close",
                  type: "button",
                  onClick: g[1] || (g[1] = (se) => v.value = !1),
                  "aria-label": "关闭下载中心"
                }, [
                  ne(H(Rt), { size: 18 })
                ])
              ])
            ]),
            u("div", mN, [
              x.value && !h.value.length ? (S(), O("p", yN, "加载任务中…")) : h.value.length ? le("", !0) : (S(), O("p", bN, "暂无资源任务")),
              (S(!0), O(ye, null, Oe(h.value, (se) => (S(), O("article", {
                key: se.task_id,
                class: me(["download-task", `task-${se.status}`])
              }, [
                u("div", _N, [
                  u("div", null, [
                    u("strong", null, F(se.resource_name || se.provider_id), 1),
                    u("span", null, [
                      ve(F(R(se)), 1),
                      se.phase ? (S(), O(ye, { key: 0 }, [
                        ve(" · " + F(se.phase), 1)
                      ], 64)) : le("", !0)
                    ])
                  ]),
                  u("b", null, F(se.progress_percent == null ? "—" : `${Math.round(se.progress_percent)}%`), 1)
                ]),
                u("div", wN, [
                  u("i", {
                    style: rt({ width: `${Math.min(100, Math.max(0, se.progress_percent || 0))}%` })
                  }, null, 4)
                ]),
                u("div", kN, [
                  se.current_file ? (S(), O("span", EN, "当前文件：" + F(se.current_file), 1)) : le("", !0),
                  se.total_bytes ? (S(), O("span", xN, F(V(se.downloaded_bytes)) + " / " + F(V(se.total_bytes)), 1)) : le("", !0),
                  U(se) ? (S(), O("span", CN, "速度 " + F(V(se.speed_bytes_per_second)) + "/秒 · 剩余 " + F(M(se.eta_seconds)), 1)) : le("", !0),
                  se.error_message ? (S(), O("span", SN, F(se.error_message), 1)) : le("", !0)
                ]),
                U(se) ? (S(), O("div", $N, [
                  u("button", {
                    class: "button button-secondary",
                    type: "button",
                    onClick: (go) => oe(se)
                  }, "取消", 8, IN)
                ])) : se.status === "failed" ? (S(), O("div", NN, [
                  u("button", {
                    class: "button button-secondary",
                    type: "button",
                    onClick: (go) => de(se)
                  }, [
                    ne(H(zt), { size: 14 }),
                    g[28] || (g[28] = ve("重试"))
                  ], 8, MN)
                ])) : le("", !0)
              ], 2))), 128))
            ])
          ])
        ])) : le("", !0),
        n.value === "audio" && (m.value || z.value) ? (S(), O("section", TN, [
          g[41] || (g[41] = u("div", { class: "section-heading" }, [
            u("div", null, [
              u("span", { class: "section-label" }, "LOCAL AUDIO PRODUCTION"),
              u("h3", { id: "local-production-title" }, "本地音频生产")
            ]),
            u("span", { class: "section-note" }, "不参与角色对话，只用于素材处理和文件生成")
          ], -1)),
          u("div", ON, [
            m.value ? (S(), O("article", PN, [
              u("div", AN, [
                g[29] || (g[29] = u("div", null, [
                  u("span", { class: "production-kicker" }, "RVC"),
                  u("h3", null, "RVC 音频生产")
                ], -1)),
                u("span", {
                  class: me(["status-chip", { on: (Z = m.value.resource_status) == null ? void 0 : Z.ready }])
                }, F((ie = m.value.resource_status) != null && ie.ready ? "可用于音频生产" : (ge = m.value.resource_status) != null && ge.installing ? "准备中" : "资源未就绪"), 3)
              ]),
              g[32] || (g[32] = u("p", null, "使用已有音频和训练好的 .pth 音色模型生成新的变声音频文件。RVC 不作为 TTS，也不改变角色对话音色。", -1)),
              u("div", DN, [
                u("span", null, "内置核心：" + F((Ge = ($e = (Ce = m.value.resource_status) == null ? void 0 : Ce.components) == null ? void 0 : $e.source) != null && Ge.ready ? "已就绪" : "待准备"), 1),
                u("span", null, "Hubert：" + F((st = m.value.resource_status) != null && st.hubert_ready ? "已就绪" : "待准备"), 1),
                u("span", null, "RMVPE：" + F((bt = m.value.resource_status) != null && bt.rmvpe_ready ? "已就绪" : "待准备"), 1),
                g[30] || (g[30] = u("span", null, "模型由 RVC 页面管理", -1))
              ]),
              u("div", RN, [
                u("button", {
                  class: "button button-primary",
                  type: "button",
                  onClick: g[3] || (g[3] = (se) => he(m.value))
                }, [
                  ne(H(Pi), { size: 15 }),
                  g[31] || (g[31] = ve("管理 RVC 资源"))
                ])
              ])
            ])) : le("", !0),
            z.value ? (S(), O("article", VN, [
              u("div", LN, [
                g[33] || (g[33] = u("div", null, [
                  u("span", { class: "production-kicker" }, "COMMON AUDIO"),
                  u("h3", null, "人声分离")
                ], -1)),
                u("span", {
                  class: me(["status-chip", { on: (_t = z.value.resource_status) == null ? void 0 : _t.ready }])
                }, F((rn = z.value.resource_status) != null && rn.ready ? "已就绪" : "待准备"), 3)
              ]),
              g[35] || (g[35] = u("p", null, "通用声音前处理资源，供 GPT-SoVITS 数据集流程和其他音频处理任务使用。", -1)),
              u("div", zN, [
                u("button", {
                  class: "button button-secondary",
                  type: "button",
                  onClick: g[4] || (g[4] = (se) => he(z.value))
                }, [
                  ne(H(Pi), { size: 15 }),
                  g[34] || (g[34] = ve("管理人声分离"))
                ])
              ])
            ])) : le("", !0),
            u("article", FN, [
              u("div", BN, [
                g[36] || (g[36] = u("div", null, [
                  u("span", { class: "production-kicker" }, "MEDIA RUNTIME"),
                  u("h3", null, "FFmpeg")
                ], -1)),
                u("span", {
                  class: me(["status-chip", { on: Y.value.ready }])
                }, F(Y.value.ready ? "可用" : "未安装"), 3)
              ]),
              g[40] || (g[40] = u("p", null, "音视频抽取、格式转换和声音工作流的基础运行时。使用独立受管副本，不复用 RVC 的来源或设备配置。", -1)),
              u("div", HN, [
                u("span", null, "受管副本：" + F(Y.value.installed ? "已存在" : "未准备"), 1),
                u("span", null, "系统命令：" + F(Y.value.system_path ? "已发现" : "未发现"), 1)
              ]),
              u("div", UN, [
                Y.value.installed ? (S(), O("button", {
                  key: 1,
                  class: "button button-secondary",
                  type: "button",
                  onClick: g[6] || (g[6] = (se) => fe("remove")),
                  disabled: l.value !== null
                }, [
                  ne(H(en), { size: 15 }),
                  g[38] || (g[38] = ve("移除受管副本"))
                ], 8, GN)) : (S(), O("button", {
                  key: 0,
                  class: "button button-primary",
                  type: "button",
                  onClick: g[5] || (g[5] = (se) => fe("install")),
                  disabled: l.value !== null
                }, [
                  ne(H(Kn), { size: 15 }),
                  g[37] || (g[37] = ve("下载 FFmpeg"))
                ], 8, jN)),
                u("button", {
                  class: "button button-secondary",
                  type: "button",
                  onClick: g[7] || (g[7] = (se) => fe("directory")),
                  disabled: l.value !== null
                }, [
                  ne(H(Ao), { size: 15 }),
                  g[39] || (g[39] = ve("打开目录"))
                ], 8, qN)
              ])
            ])
          ])
        ])) : le("", !0),
        n.value !== "audio" ? (S(), O("main", YN, [
          o.value && t.value.length === 0 ? (S(), O("div", XN, [
            ne(H(zt), {
              size: 22,
              class: "spin"
            }),
            g[42] || (g[42] = u("p", null, "加载中...", -1))
          ])) : s.value && t.value.length === 0 ? (S(), O("div", KN, [
            ne(H(Rt), { size: 22 }),
            u("p", null, F(s.value), 1),
            u("button", {
              class: "button button-primary",
              onClick: ce
            }, "重试")
          ])) : _.value.length === 0 ? (S(), O("div", WN, g[43] || (g[43] = [
            u("p", null, "这个分类暂时没有可用供应商。", -1)
          ]))) : (S(), O("div", {
            key: 3,
            class: me(["providers-grid", { compact: n.value === "llm" }])
          }, [
            (S(!0), O(ye, null, Oe(_.value, (se) => {
              var go, Fl, Bl, Hl;
              return S(), O("article", {
                key: se.type + ":" + se.id,
                class: me(["provider-card", { configured: se.is_configured, active: se.is_active, local: se.mode === "local" }]),
                tabindex: "0",
                onClick: (mo) => he(se),
                onKeydown: [
                  Ea((mo) => he(se), ["enter"]),
                  Ea(mt((mo) => he(se), ["prevent"]), ["space"])
                ]
              }, [
                u("div", JN, [
                  u("div", QN, [
                    u("span", {
                      class: me(["provider-mark", { local: se.mode === "local" }])
                    }, null, 2),
                    u("h3", null, F(se.name), 1),
                    se.mode === "local" ? (S(), O("span", e3, "本地")) : (S(), O("span", t3, "API"))
                  ]),
                  se.runtime_supported ? (S(), O("button", {
                    key: 0,
                    class: me(["provider-switch", { on: se.is_active }]),
                    type: "button",
                    role: "switch",
                    "aria-checked": se.is_active,
                    "aria-label": `${se.is_active ? "停用" : "启用"} ${se.name}`,
                    onClick: mt((mo) => k(se), ["stop"]),
                    disabled: o.value
                  }, g[44] || (g[44] = [
                    u("span", null, null, -1)
                  ]), 10, n3)) : (S(), O("span", o3, "仅配置"))
                ]),
                u("p", s3, F(se.description), 1),
                se.mode === "local" ? (S(), O("div", i3, [
                  g[45] || (g[45] = u("span", { class: "meta-label" }, "资源状态", -1)),
                  u("strong", null, F(Q(se)), 1),
                  u("code", null, F(((go = se.resource_status) == null ? void 0 : go.model_id) || "尚未选择资源"), 1)
                ])) : se.type === "web_search" ? (S(), O("div", r3, [
                  g[46] || (g[46] = u("span", { class: "meta-label" }, "搜索服务", -1)),
                  u("code", null, F(se.name), 1),
                  u("span", null, F(se.current_api_key ? "API Key 已配置" : "需要 API Key"), 1)
                ])) : (S(), O("div", l3, [
                  g[47] || (g[47] = u("span", { class: "meta-label" }, "当前模型", -1)),
                  u("code", null, F(se.current_model || se.default_model || "按接口默认"), 1),
                  se.current_base_url ? (S(), O("span", a3, F(se.current_base_url), 1)) : le("", !0)
                ])),
                u("footer", u3, [
                  u("button", {
                    class: "button button-secondary",
                    type: "button",
                    onClick: mt((mo) => he(se), ["stop"])
                  }, [
                    ne(H(Pi), { size: 15 }),
                    g[48] || (g[48] = ve("配置"))
                  ], 8, c3),
                  se.mode === "api" && se.is_configured && se.runtime_supported ? (S(), O("button", {
                    key: 0,
                    class: me(["button button-test", { "is-success": (Fl = d.value[se.id]) == null ? void 0 : Fl.ok, "is-error": d.value[se.id] && !d.value[se.id].ok }]),
                    type: "button",
                    onClick: mt((mo) => E(se), ["stop"]),
                    disabled: r.value === se.id
                  }, [
                    r.value === se.id ? (S(), et(H(zt), {
                      key: 0,
                      size: 15,
                      class: "spin"
                    })) : (Bl = d.value[se.id]) != null && Bl.ok ? (S(), et(H(Rn), {
                      key: 1,
                      size: 15
                    })) : d.value[se.id] ? (S(), et(H(Rt), {
                      key: 2,
                      size: 15
                    })) : le("", !0),
                    ve(F(r.value === se.id ? "测试中" : ((Hl = d.value[se.id]) == null ? void 0 : Hl.message) || "测试连接"), 1)
                  ], 10, d3)) : le("", !0)
                ])
              ], 42, ZN);
            }), 128))
          ], 2))
        ])) : le("", !0),
        w.value && m.value ? (S(), O("div", {
          key: 4,
          class: "drawer-overlay",
          onClick: mt(te, ["self"])
        }, [
          u("aside", f3, [
            u("div", p3, [
              g[49] || (g[49] = u("div", null, [
                u("p", { class: "eyebrow" }, "LOCAL AUDIO PRODUCTION / RVC"),
                u("h3", null, "RVC 音频生产"),
                u("p", null, "只管理 RVC 音频到音频推理所需的运行时和模型，不参与角色对话或 TTS。")
              ], -1)),
              u("button", {
                class: "modal-close",
                type: "button",
                onClick: te,
                "aria-label": "关闭 RVC 管理"
              }, [
                ne(H(Rt), { size: 18 })
              ])
            ]),
            u("div", h3, [
              u("div", v3, [
                u("div", null, [
                  g[50] || (g[50] = u("span", { class: "section-label" }, "推理可用性", -1)),
                  u("strong", null, F((ho = m.value.resource_status) != null && ho.ready ? "可以开始生成变声音频" : "还需要补完资源"), 1)
                ]),
                u("span", {
                  class: me(["status-chip", { on: (at = m.value.resource_status) == null ? void 0 : at.ready }])
                }, F((wt = m.value.resource_status) != null && wt.ready ? "READY" : "INCOMPLETE"), 3)
              ]),
              u("div", g3, [
                (S(), O(ye, null, Oe([{ key: "source", title: "CHARACTOID 内置 RVC 核心", detail: "项目内置推理核心" }, { key: "runtime", title: "独立 Python 运行时", detail: "CHARACTOID/runtime/rvc" }, { key: "hubert", title: "Hubert 特征模型", detail: "用于音频特征提取" }, { key: "rmvpe", title: "RMVPE 音高模型", detail: "用于 F0 提取" }], (se) => u("div", {
                  key: se.key,
                  class: "rvc-component-row"
                }, [
                  u("div", m3, [
                    xe(se.key) ? (S(), et(H(Rn), {
                      key: 0,
                      size: 16
                    })) : (S(), O("span", y3, "·"))
                  ]),
                  u("div", b3, [
                    u("strong", null, F(se.title), 1),
                    u("span", null, F(se.detail), 1)
                  ]),
                  u("b", {
                    class: me({ ready: xe(se.key) })
                  }, F(we(se.key)), 3)
                ])), 64))
              ]),
              u("div", _3, [
                u("div", null, [
                  u("strong", null, F((vo = m.value.resource_status) != null && vo.installing ? "正在准备 RVC 运行时" : "补完推理环境"), 1),
                  u("p", null, F(((yl = m.value.resource_status) == null ? void 0 : yl.detail) || ((bl = m.value.resource_status) == null ? void 0 : bl.note)), 1)
                ]),
                (_l = m.value.resource_status) != null && _l.installing ? (S(), O("div", w3, [
                  u("span", null, F(Math.round(ke())) + "%", 1),
                  u("i", null, [
                    u("em", {
                      style: rt({ width: `${ke()}%` })
                    }, null, 4)
                  ])
                ])) : le("", !0),
                u("div", k3, [
                  (wl = m.value.resource_status) != null && wl.installing ? (S(), O("button", {
                    key: 0,
                    class: "button button-secondary",
                    type: "button",
                    onClick: g[8] || (g[8] = (se) => b(m.value, "cancel")),
                    disabled: l.value !== null
                  }, "取消准备", 8, E3)) : (kl = m.value.resource_status) != null && kl.ready ? le("", !0) : (S(), O("button", {
                    key: 1,
                    class: "button button-primary",
                    type: "button",
                    onClick: g[9] || (g[9] = (se) => b(m.value, "install")),
                    disabled: l.value !== null
                  }, [
                    ne(H(Kn), { size: 15 }),
                    g[51] || (g[51] = ve("准备运行时与基础模型"))
                  ], 8, x3)),
                  (El = m.value.resource_status) != null && El.ready ? (S(), O("button", {
                    key: 2,
                    class: "button button-secondary",
                    type: "button",
                    onClick: g[10] || (g[10] = (se) => b(m.value, "remove")),
                    disabled: l.value !== null
                  }, [
                    ne(H(en), { size: 15 }),
                    g[52] || (g[52] = ve("移除 CHARACTOID 运行时"))
                  ], 8, C3)) : le("", !0),
                  u("button", {
                    class: "button button-secondary",
                    type: "button",
                    onClick: g[11] || (g[11] = (se) => b(m.value, "directory")),
                    disabled: l.value !== null
                  }, [
                    ne(H(Ao), { size: 15 }),
                    g[53] || (g[53] = ve("查看资源目录"))
                  ], 8, S3)
                ])
              ]),
              (xl = m.value.resource_status) != null && xl.error ? (S(), O("p", $3, F(m.value.resource_status.error), 1)) : le("", !0),
              s.value ? (S(), O("p", I3, F(s.value), 1)) : le("", !0),
              g[54] || (g[54] = u("div", { class: "rvc-workspace-note" }, [
                u("strong", null, "下一步"),
                u("span", null, "将自己的 .pth 音色模型放入受管的 weights 目录；.index 文件不是必需项。完成后到独立的“RVC”页面上传音频并生成文件。")
              ], -1))
            ])
          ])
        ])) : le("", !0),
        (S(), et(Fp, { to: "body" }, [
          i.value ? (S(), O("div", {
            key: 0,
            class: "drawer-overlay provider-config-overlay",
            onClick: mt(J, ["self"])
          }, [
            u("aside", {
              class: "config-drawer provider-config-drawer",
              role: "dialog",
              "aria-modal": "true",
              "aria-label": `配置 ${((Cl = q.value) == null ? void 0 : Cl.name) || "供应商"}`
            }, [
              u("div", M3, [
                u("div", null, [
                  g[55] || (g[55] = u("p", { class: "eyebrow" }, "CONFIGURE", -1)),
                  u("h3", null, F((Sl = q.value) == null ? void 0 : Sl.name), 1),
                  u("p", null, F(($l = q.value) == null ? void 0 : $l.description), 1)
                ]),
                u("button", {
                  class: "modal-close",
                  type: "button",
                  onClick: J,
                  "aria-label": "关闭配置"
                }, [
                  ne(H(Rt), { size: 18 })
                ])
              ]),
              u("div", T3, [
                u("div", O3, [
                  u("span", {
                    class: me(["status-chip", { on: (Il = q.value) == null ? void 0 : Il.is_active }])
                  }, F((Nl = q.value) != null && Nl.is_active ? "当前启用" : (Ml = q.value) != null && Ml.runtime_supported ? "可用" : "仅保存配置"), 3),
                  u("span", null, F(((Tl = q.value) == null ? void 0 : Tl.mode) === "local" ? "本地资源" : "API 接口"), 1)
                ]),
                u("form", {
                  onSubmit: mt(p, ["prevent"]),
                  class: "config-form"
                }, [
                  ((Ol = q.value) == null ? void 0 : Ol.mode) === "api" && ((Pl = q.value) == null ? void 0 : Pl.type) === "web_search" ? (S(), O(ye, { key: 0 }, [
                    g[59] || (g[59] = u("div", { class: "resource-config-intro" }, [
                      u("span", { class: "meta-label" }, "搜索服务"),
                      u("p", { class: "config-hint" }, "为 Agent 提供实时互联网检索能力，不是模型配置。")
                    ], -1)),
                    q.value.requires_api_key ? (S(), O("label", P3, [
                      g[56] || (g[56] = u("span", null, [
                        ve("搜索服务 API Key "),
                        u("span", { class: "required" }, "*")
                      ], -1)),
                      Ie(u("input", {
                        type: "password",
                        "onUpdate:modelValue": g[12] || (g[12] = (se) => C.value.api_key = se),
                        placeholder: "输入搜索服务 API Key",
                        required: "",
                        autocomplete: "off"
                      }, null, 512), [
                        [Re, C.value.api_key]
                      ])
                    ])) : le("", !0),
                    q.value.id === "custom_search" ? (S(), O("label", A3, [
                      g[57] || (g[57] = u("span", null, "搜索接口地址", -1)),
                      Ie(u("input", {
                        type: "url",
                        "onUpdate:modelValue": g[13] || (g[13] = (se) => C.value.base_url = se),
                        placeholder: "https://your-search-endpoint"
                      }, null, 512), [
                        [Re, C.value.base_url]
                      ])
                    ])) : (S(), O("div", D3, [
                      g[58] || (g[58] = u("span", null, "接口地址", -1)),
                      u("strong", null, F(q.value.id === "tavily" ? "Tavily 官方服务" : "博查官方服务"), 1)
                    ]))
                  ], 64)) : ((Al = q.value) == null ? void 0 : Al.mode) === "api" ? (S(), O(ye, { key: 1 }, [
                    q.value.requires_api_key ? (S(), O("label", R3, [
                      g[60] || (g[60] = u("span", null, [
                        ve("API Key "),
                        u("span", { class: "required" }, "*")
                      ], -1)),
                      Ie(u("input", {
                        type: "password",
                        "onUpdate:modelValue": g[14] || (g[14] = (se) => C.value.api_key = se),
                        placeholder: "输入 API Key",
                        required: "",
                        autocomplete: "off"
                      }, null, 512), [
                        [Re, C.value.api_key]
                      ])
                    ])) : le("", !0),
                    u("label", V3, [
                      g[61] || (g[61] = u("span", null, "服务接口地址", -1)),
                      Ie(u("input", {
                        type: "url",
                        "onUpdate:modelValue": g[15] || (g[15] = (se) => C.value.base_url = se),
                        placeholder: q.value.default_base_url
                      }, null, 8, L3), [
                        [Re, C.value.base_url]
                      ])
                    ]),
                    u("label", z3, [
                      g[62] || (g[62] = u("span", null, "模型名称", -1)),
                      Ie(u("input", {
                        type: "text",
                        "onUpdate:modelValue": g[16] || (g[16] = (se) => C.value.model = se),
                        placeholder: q.value.default_model
                      }, null, 8, F3), [
                        [Re, C.value.model]
                      ])
                    ])
                  ], 64)) : (S(), O(ye, { key: 2 }, [
                    u("div", B3, [
                      g[63] || (g[63] = u("span", { class: "meta-label" }, "资源配置", -1)),
                      L() ? (S(), O("p", H3, F(L()), 1)) : le("", !0)
                    ]),
                    P.value === "embedding" || P.value === "reranker" ? (S(), O(ye, { key: 0 }, [
                      u("label", U3, [
                        u("span", null, F(P.value === "embedding" ? "向量模型 ID" : "精排模型 ID"), 1),
                        Ie(u("input", {
                          type: "text",
                          "onUpdate:modelValue": g[17] || (g[17] = (se) => C.value.model = se),
                          placeholder: (Dl = q.value) == null ? void 0 : Dl.default_model
                        }, null, 8, j3), [
                          [Re, C.value.model]
                        ])
                      ]),
                      u("div", G3, [
                        u("label", q3, [
                          g[65] || (g[65] = u("span", null, "模型来源", -1)),
                          Ie(u("select", {
                            "onUpdate:modelValue": g[18] || (g[18] = (se) => C.value.source = se)
                          }, g[64] || (g[64] = [
                            u("option", { value: "modelscope" }, "ModelScope", -1),
                            u("option", { value: "huggingface" }, "Hugging Face", -1)
                          ]), 512), [
                            [Qt, C.value.source]
                          ])
                        ]),
                        u("label", Y3, [
                          g[67] || (g[67] = u("span", null, "运行设备", -1)),
                          Ie(u("select", {
                            "onUpdate:modelValue": g[19] || (g[19] = (se) => C.value.device = se)
                          }, g[66] || (g[66] = [
                            u("option", { value: "auto" }, "自动（GPU 优先）", -1),
                            u("option", { value: "cuda" }, "CUDA", -1),
                            u("option", { value: "cpu" }, "CPU", -1)
                          ]), 512), [
                            [Qt, C.value.device]
                          ])
                        ])
                      ])
                    ], 64)) : P.value === "gpt_sovits" ? (S(), O("div", X3, g[68] || (g[68] = [
                      u("div", { class: "resource-config-readonly" }, [
                        u("span", null, "固定运行环境"),
                        u("strong", null, "GPT-SoVITS v3lora Windows 整合包"),
                        u("small", null, "应用内置下载源 · Hugging Face · 约 8 GB · 服务按需启动")
                      ], -1)
                    ]))) : P.value === "stt" ? (S(), O("div", K3, g[69] || (g[69] = [
                      u("span", null, "固定资源清单", -1),
                      u("strong", null, "Qwen3-ASR-0.6B + FFmpeg", -1)
                    ]))) : P.value === "separator" ? (S(), O("div", W3, g[70] || (g[70] = [
                      u("span", null, "固定资源", -1),
                      u("strong", null, "HT-Demucs 人声分离模型 · 约 165 MB", -1)
                    ]))) : le("", !0),
                    u("div", Z3, [
                      u("div", null, [
                        g[71] || (g[71] = u("span", { class: "meta-label" }, "资源状态", -1)),
                        u("strong", null, F(q.value ? Q(q.value) : "未知"), 1)
                      ]),
                      u("div", J3, [
                        W(q.value) ? (S(), O("button", {
                          key: 0,
                          type: "button",
                          class: "button button-secondary",
                          onClick: g[20] || (g[20] = (se) => b(q.value, "cancel")),
                          disabled: l.value !== null
                        }, "取消安装", 8, Q3)) : B(q.value) ? le("", !0) : (S(), O("button", {
                          key: 1,
                          type: "button",
                          class: "button button-primary",
                          onClick: g[21] || (g[21] = (se) => b(q.value, "install")),
                          disabled: l.value !== null || ((Rl = q.value) == null ? void 0 : Rl.id) === "gsv_tts_local" && !f.value
                        }, [
                          ne(H(Kn), { size: 15 }),
                          g[72] || (g[72] = ve(" 安装运行环境"))
                        ], 8, eM)),
                        B(q.value) ? (S(), O("button", {
                          key: 2,
                          type: "button",
                          class: "button button-secondary",
                          onClick: g[22] || (g[22] = (se) => b(q.value, "remove")),
                          disabled: l.value !== null
                        }, [
                          ne(H(en), { size: 15 }),
                          g[73] || (g[73] = ve(" 删除"))
                        ], 8, tM)) : le("", !0),
                        u("button", {
                          type: "button",
                          class: "button button-secondary",
                          onClick: g[23] || (g[23] = (se) => b(q.value, "directory")),
                          disabled: l.value !== null
                        }, [
                          ne(H(Ao), { size: 15 }),
                          g[74] || (g[74] = ve(" 打开目录"))
                        ], 8, nM),
                        ((Vl = q.value) == null ? void 0 : Vl.id) === "gsv_tts_local" && ((Ll = q.value.resource_status) != null && Ll.service_running) ? (S(), O("button", {
                          key: 3,
                          type: "button",
                          class: "button button-secondary",
                          onClick: g[24] || (g[24] = (se) => b(q.value, "stop")),
                          disabled: l.value !== null
                        }, "停止服务", 8, oM)) : ((zl = q.value) == null ? void 0 : zl.id) === "gsv_tts_local" && B(q.value) ? (S(), O("button", {
                          key: 4,
                          type: "button",
                          class: "button button-primary",
                          onClick: g[25] || (g[25] = (se) => b(q.value, "start")),
                          disabled: l.value !== null
                        }, [
                          ne(H(fr), { size: 15 }),
                          g[75] || (g[75] = ve(" 启动服务"))
                        ], 8, sM)) : le("", !0)
                      ])
                    ])
                  ], 64)),
                  q.value && !q.value.runtime_supported ? (S(), O("p", iM, "当前运行时还没有这个 Provider 的适配器，因此这里只保存配置，不会自动调用。")) : le("", !0),
                  u("div", rM, [
                    u("button", {
                      type: "button",
                      class: "button button-secondary",
                      onClick: J
                    }, "取消"),
                    u("button", {
                      type: "submit",
                      class: "button button-primary",
                      disabled: o.value
                    }, F(o.value ? "保存中..." : "保存并启用"), 9, lM)
                  ]),
                  a.value ? (S(), O("p", aM, [
                    ne(H(Rn), { size: 16 }),
                    ve(" " + F(a.value), 1)
                  ])) : le("", !0),
                  c.value ? (S(), O("p", {
                    key: 5,
                    class: me(["config-message", c.value.startsWith("连接成功") ? "success" : "error"])
                  }, F(c.value), 3)) : le("", !0),
                  s.value ? (S(), O("p", uM, F(s.value), 1)) : le("", !0)
                ], 32)
              ])
            ], 8, N3)
          ])) : le("", !0)
        ]))
      ]);
    };
  }
}), dM = /* @__PURE__ */ ml(cM, [["__scopeId", "data-v-3e2a16a6"]]);
let mn = null, yn = null;
function $M(e = "#reranker-settings-root") {
  if (mn) return mn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("Reranker 设置挂载点不存在");
  return mn = ts(iN), mn.mount(t), mn;
}
function IM() {
  mn && (mn.unmount(), mn = null);
}
function NM(e = "#providers-root") {
  if (yn) return yn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("提供商配置挂载点不存在");
  return yn = ts(dM), yn.mount(t), yn;
}
function MM() {
  yn && (yn.unmount(), yn = null);
}
export {
  SM as destroyEvaluationApp,
  kM as destroyExtensionsApp,
  yM as destroyManageApp,
  MM as destroyProvidersApp,
  IM as destroyRerankerSettingsApp,
  CM as hideEvaluationApp,
  wM as hideExtensionsApp,
  EM as mountEvaluationApp,
  bM as mountExtensionsApp,
  gM as mountManageApp,
  NM as mountProvidersApp,
  $M as mountRerankerSettingsApp,
  xM as showEvaluationApp,
  _M as showExtensionsApp,
  mM as showManageApp
};
