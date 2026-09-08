var Rp = Object.defineProperty;
var Lp = (e, t, n) => t in e ? Rp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Qe = (e, t, n) => Lp(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function Zr(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const je = {}, ho = [], Jt = () => {
}, Vp = () => !1, di = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), Jr = (e) => e.startsWith("onUpdate:"), wt = Object.assign, Qr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, zp = Object.prototype.hasOwnProperty, He = (e, t) => zp.call(e, t), Se = Array.isArray, vo = (e) => fs(e) === "[object Map]", No = (e) => fs(e) === "[object Set]", Ra = (e) => fs(e) === "[object Date]", Ie = (e) => typeof e == "function", Ke = (e) => typeof e == "string", Gt = (e) => typeof e == "symbol", Ge = (e) => e !== null && typeof e == "object", Oc = (e) => (Ge(e) || Ie(e)) && Ie(e.then) && Ie(e.catch), Pc = Object.prototype.toString, fs = (e) => Pc.call(e), Fp = (e) => fs(e).slice(8, -1), Ac = (e) => fs(e) === "[object Object]", el = (e) => Ke(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Uo = /* @__PURE__ */ Zr(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), fi = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Bp = /-(\w)/g, Lt = fi(
  (e) => e.replace(Bp, (t, n) => n ? n.toUpperCase() : "")
), Hp = /\B([A-Z])/g, zn = fi(
  (e) => e.replace(Hp, "-$1").toLowerCase()
), pi = fi((e) => e.charAt(0).toUpperCase() + e.slice(1)), zi = fi(
  (e) => e ? `on${pi(e)}` : ""
), pn = (e, t) => !Object.is(e, t), Rs = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Dc = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, qs = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let La;
const hi = () => La || (La = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function Ye(e) {
  if (Se(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = Ke(o) ? qp(o) : Ye(o);
      if (s)
        for (const i in s)
          t[i] = s[i];
    }
    return t;
  } else if (Ke(e) || Ge(e))
    return e;
}
const Up = /;(?![^(]*\))/g, jp = /:([^]+)/, Gp = /\/\*[^]*?\*\//g;
function qp(e) {
  const t = {};
  return e.replace(Gp, "").split(Up).forEach((n) => {
    if (n) {
      const o = n.split(jp);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function ge(e) {
  let t = "";
  if (Ke(e))
    t = e;
  else if (Se(e))
    for (let n = 0; n < e.length; n++) {
      const o = ge(e[n]);
      o && (t += o + " ");
    }
  else if (Ge(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function Fi(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !Ke(t) && (e.class = ge(t)), n && (e.style = Ye(n)), e;
}
const Yp = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Xp = /* @__PURE__ */ Zr(Yp);
function Rc(e) {
  return !!e || e === "";
}
function Kp(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let o = 0; n && o < e.length; o++)
    n = ps(e[o], t[o]);
  return n;
}
function ps(e, t) {
  if (e === t) return !0;
  let n = Ra(e), o = Ra(t);
  if (n || o)
    return n && o ? e.getTime() === t.getTime() : !1;
  if (n = Gt(e), o = Gt(t), n || o)
    return e === t;
  if (n = Se(e), o = Se(t), n || o)
    return n && o ? Kp(e, t) : !1;
  if (n = Ge(e), o = Ge(t), n || o) {
    if (!n || !o)
      return !1;
    const s = Object.keys(e).length, i = Object.keys(t).length;
    if (s !== i)
      return !1;
    for (const r in e) {
      const l = e.hasOwnProperty(r), a = t.hasOwnProperty(r);
      if (l && !a || !l && a || !ps(e[r], t[r]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function tl(e, t) {
  return e.findIndex((n) => ps(n, t));
}
const Lc = (e) => !!(e && e.__v_isRef === !0), A = (e) => Ke(e) ? e : e == null ? "" : Se(e) || Ge(e) && (e.toString === Pc || !Ie(e.toString)) ? Lc(e) ? A(e.value) : JSON.stringify(e, Vc, 2) : String(e), Vc = (e, t) => Lc(t) ? Vc(e, t.value) : vo(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, s], i) => (n[Bi(o, i) + " =>"] = s, n),
    {}
  )
} : No(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Bi(n))
} : Gt(t) ? Bi(t) : Ge(t) && !Se(t) && !Ac(t) ? String(t) : t, Bi = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    Gt(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let St;
class zc {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = St, !t && St && (this.index = (St.scopes || (St.scopes = [])).push(
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
      const n = St;
      try {
        return St = this, t();
      } finally {
        St = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    St = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    St = this.parent;
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
function Fc(e) {
  return new zc(e);
}
function nl() {
  return St;
}
function Ls(e, t = !1) {
  St && St.cleanups.push(e);
}
let qe;
const Hi = /* @__PURE__ */ new WeakSet();
class Bc {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, St && St.active && St.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Hi.has(this) && (Hi.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Uc(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Va(this), jc(this);
    const t = qe, n = jt;
    qe = this, jt = !0;
    try {
      return this.fn();
    } finally {
      Gc(this), qe = t, jt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        il(t);
      this.deps = this.depsTail = void 0, Va(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Hi.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    mr(this) && this.run();
  }
  get dirty() {
    return mr(this);
  }
}
let Hc = 0, jo, Go;
function Uc(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = Go, Go = e;
    return;
  }
  e.next = jo, jo = e;
}
function ol() {
  Hc++;
}
function sl() {
  if (--Hc > 0)
    return;
  if (Go) {
    let t = Go;
    for (Go = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; jo; ) {
    let t = jo;
    for (jo = void 0; t; ) {
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
function jc(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Gc(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === n && (n = s), il(o), Wp(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = n;
}
function mr(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (qc(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function qc(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === Jo))
    return;
  e.globalVersion = Jo;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !mr(e)) {
    e.flags &= -3;
    return;
  }
  const n = qe, o = jt;
  qe = e, jt = !0;
  try {
    jc(e);
    const s = e.fn(e._value);
    (t.version === 0 || pn(s, e._value)) && (e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    qe = n, jt = o, Gc(e), e.flags &= -3;
  }
}
function il(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      il(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function Wp(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let jt = !0;
const Yc = [];
function Fn() {
  Yc.push(jt), jt = !1;
}
function Bn() {
  const e = Yc.pop();
  jt = e === void 0 ? !0 : e;
}
function Va(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = qe;
    qe = void 0;
    try {
      t();
    } finally {
      qe = n;
    }
  }
}
let Jo = 0;
class Zp {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class vi {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(t) {
    if (!qe || !jt || qe === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== qe)
      n = this.activeLink = new Zp(qe, this), qe.deps ? (n.prevDep = qe.depsTail, qe.depsTail.nextDep = n, qe.depsTail = n) : qe.deps = qe.depsTail = n, Xc(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const o = n.nextDep;
      o.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = o), n.prevDep = qe.depsTail, n.nextDep = void 0, qe.depsTail.nextDep = n, qe.depsTail = n, qe.deps === n && (qe.deps = o);
    }
    return n;
  }
  trigger(t) {
    this.version++, Jo++, this.notify(t);
  }
  notify(t) {
    ol();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      sl();
    }
  }
}
function Xc(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        Xc(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const Ys = /* @__PURE__ */ new WeakMap(), Wn = Symbol(
  ""
), yr = Symbol(
  ""
), Qo = Symbol(
  ""
);
function bt(e, t, n) {
  if (jt && qe) {
    let o = Ys.get(e);
    o || Ys.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || (o.set(n, s = new vi()), s.map = o, s.key = n), s.track();
  }
}
function an(e, t, n, o, s, i) {
  const r = Ys.get(e);
  if (!r) {
    Jo++;
    return;
  }
  const l = (a) => {
    a && a.trigger();
  };
  if (ol(), t === "clear")
    r.forEach(l);
  else {
    const a = Se(e), c = a && el(n);
    if (a && n === "length") {
      const d = Number(o);
      r.forEach((f, h) => {
        (h === "length" || h === Qo || !Gt(h) && h >= d) && l(f);
      });
    } else
      switch ((n !== void 0 || r.has(void 0)) && l(r.get(n)), c && l(r.get(Qo)), t) {
        case "add":
          a ? c && l(r.get("length")) : (l(r.get(Wn)), vo(e) && l(r.get(yr)));
          break;
        case "delete":
          a || (l(r.get(Wn)), vo(e) && l(r.get(yr)));
          break;
        case "set":
          vo(e) && l(r.get(Wn));
          break;
      }
  }
  sl();
}
function Jp(e, t) {
  const n = Ys.get(e);
  return n && n.get(t);
}
function ao(e) {
  const t = ze(e);
  return t === e ? t : (bt(t, "iterate", Qo), Rt(e) ? t : t.map(_t));
}
function gi(e) {
  return bt(e = ze(e), "iterate", Qo), e;
}
const Qp = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ui(this, Symbol.iterator, _t);
  },
  concat(...e) {
    return ao(this).concat(
      ...e.map((t) => Se(t) ? ao(t) : t)
    );
  },
  entries() {
    return Ui(this, "entries", (e) => (e[1] = _t(e[1]), e));
  },
  every(e, t) {
    return sn(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return sn(this, "filter", e, t, (n) => n.map(_t), arguments);
  },
  find(e, t) {
    return sn(this, "find", e, t, _t, arguments);
  },
  findIndex(e, t) {
    return sn(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return sn(this, "findLast", e, t, _t, arguments);
  },
  findLastIndex(e, t) {
    return sn(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return sn(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return ji(this, "includes", e);
  },
  indexOf(...e) {
    return ji(this, "indexOf", e);
  },
  join(e) {
    return ao(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return ji(this, "lastIndexOf", e);
  },
  map(e, t) {
    return sn(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Po(this, "pop");
  },
  push(...e) {
    return Po(this, "push", e);
  },
  reduce(e, ...t) {
    return za(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return za(this, "reduceRight", e, t);
  },
  shift() {
    return Po(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return sn(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Po(this, "splice", e);
  },
  toReversed() {
    return ao(this).toReversed();
  },
  toSorted(e) {
    return ao(this).toSorted(e);
  },
  toSpliced(...e) {
    return ao(this).toSpliced(...e);
  },
  unshift(...e) {
    return Po(this, "unshift", e);
  },
  values() {
    return Ui(this, "values", _t);
  }
};
function Ui(e, t, n) {
  const o = gi(e), s = o[t]();
  return o !== e && !Rt(e) && (s._next = s.next, s.next = () => {
    const i = s._next();
    return i.value && (i.value = n(i.value)), i;
  }), s;
}
const eh = Array.prototype;
function sn(e, t, n, o, s, i) {
  const r = gi(e), l = r !== e && !Rt(e), a = r[t];
  if (a !== eh[t]) {
    const f = a.apply(e, i);
    return l ? _t(f) : f;
  }
  let c = n;
  r !== e && (l ? c = function(f, h) {
    return n.call(this, _t(f), h, e);
  } : n.length > 2 && (c = function(f, h) {
    return n.call(this, f, h, e);
  }));
  const d = a.call(r, c, o);
  return l && s ? s(d) : d;
}
function za(e, t, n, o) {
  const s = gi(e);
  let i = n;
  return s !== e && (Rt(e) ? n.length > 3 && (i = function(r, l, a) {
    return n.call(this, r, l, a, e);
  }) : i = function(r, l, a) {
    return n.call(this, r, _t(l), a, e);
  }), s[t](i, ...o);
}
function ji(e, t, n) {
  const o = ze(e);
  bt(o, "iterate", Qo);
  const s = o[t](...n);
  return (s === -1 || s === !1) && ul(n[0]) ? (n[0] = ze(n[0]), o[t](...n)) : s;
}
function Po(e, t, n = []) {
  Fn(), ol();
  const o = ze(e)[t].apply(e, n);
  return sl(), Bn(), o;
}
const th = /* @__PURE__ */ Zr("__proto__,__v_isRef,__isVue"), Kc = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(Gt)
);
function nh(e) {
  Gt(e) || (e = String(e));
  const t = ze(this);
  return bt(t, "has", e), t.hasOwnProperty(e);
}
class Wc {
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
      return o === (s ? i ? fh : ed : i ? Qc : Jc).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const r = Se(t);
    if (!s) {
      let a;
      if (r && (a = Qp[n]))
        return a;
      if (n === "hasOwnProperty")
        return nh;
    }
    const l = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      tt(t) ? t : o
    );
    return (Gt(n) ? Kc.has(n) : th(n)) || (s || bt(t, "get", n), i) ? l : tt(l) ? r && el(n) ? l : l.value : Ge(l) ? s ? ll(l) : Rn(l) : l;
  }
}
class Zc extends Wc {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, s) {
    let i = t[n];
    if (!this._isShallow) {
      const a = to(i);
      if (!Rt(o) && !to(o) && (i = ze(i), o = ze(o)), !Se(t) && tt(i) && !tt(o))
        return a ? !1 : (i.value = o, !0);
    }
    const r = Se(t) && el(n) ? Number(n) < t.length : He(t, n), l = Reflect.set(
      t,
      n,
      o,
      tt(t) ? t : s
    );
    return t === ze(s) && (r ? pn(o, i) && an(t, "set", n, o) : an(t, "add", n, o)), l;
  }
  deleteProperty(t, n) {
    const o = He(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && o && an(t, "delete", n, void 0), s;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!Gt(n) || !Kc.has(n)) && bt(t, "has", n), o;
  }
  ownKeys(t) {
    return bt(
      t,
      "iterate",
      Se(t) ? "length" : Wn
    ), Reflect.ownKeys(t);
  }
}
class oh extends Wc {
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
const sh = /* @__PURE__ */ new Zc(), ih = /* @__PURE__ */ new oh(), rh = /* @__PURE__ */ new Zc(!0);
const br = (e) => e, ws = (e) => Reflect.getPrototypeOf(e);
function lh(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, i = ze(s), r = vo(i), l = e === "entries" || e === Symbol.iterator && r, a = e === "keys" && r, c = s[e](...o), d = n ? br : t ? _r : _t;
    return !t && bt(
      i,
      "iterate",
      a ? yr : Wn
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
function ks(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function ah(e, t) {
  const n = {
    get(s) {
      const i = this.__v_raw, r = ze(i), l = ze(s);
      e || (pn(s, l) && bt(r, "get", s), bt(r, "get", l));
      const { has: a } = ws(r), c = t ? br : e ? _r : _t;
      if (a.call(r, s))
        return c(i.get(s));
      if (a.call(r, l))
        return c(i.get(l));
      i !== r && i.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && bt(ze(s), "iterate", Wn), Reflect.get(s, "size", s);
    },
    has(s) {
      const i = this.__v_raw, r = ze(i), l = ze(s);
      return e || (pn(s, l) && bt(r, "has", s), bt(r, "has", l)), s === l ? i.has(s) : i.has(s) || i.has(l);
    },
    forEach(s, i) {
      const r = this, l = r.__v_raw, a = ze(l), c = t ? br : e ? _r : _t;
      return !e && bt(a, "iterate", Wn), l.forEach((d, f) => s.call(i, c(d), c(f), r));
    }
  };
  return wt(
    n,
    e ? {
      add: ks("add"),
      set: ks("set"),
      delete: ks("delete"),
      clear: ks("clear")
    } : {
      add(s) {
        !t && !Rt(s) && !to(s) && (s = ze(s));
        const i = ze(this);
        return ws(i).has.call(i, s) || (i.add(s), an(i, "add", s, s)), this;
      },
      set(s, i) {
        !t && !Rt(i) && !to(i) && (i = ze(i));
        const r = ze(this), { has: l, get: a } = ws(r);
        let c = l.call(r, s);
        c || (s = ze(s), c = l.call(r, s));
        const d = a.call(r, s);
        return r.set(s, i), c ? pn(i, d) && an(r, "set", s, i) : an(r, "add", s, i), this;
      },
      delete(s) {
        const i = ze(this), { has: r, get: l } = ws(i);
        let a = r.call(i, s);
        a || (s = ze(s), a = r.call(i, s)), l && l.call(i, s);
        const c = i.delete(s);
        return a && an(i, "delete", s, void 0), c;
      },
      clear() {
        const s = ze(this), i = s.size !== 0, r = s.clear();
        return i && an(
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
    n[s] = lh(s, e, t);
  }), n;
}
function rl(e, t) {
  const n = ah(e, t);
  return (o, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    He(n, s) && s in o ? n : o,
    s,
    i
  );
}
const uh = {
  get: /* @__PURE__ */ rl(!1, !1)
}, ch = {
  get: /* @__PURE__ */ rl(!1, !0)
}, dh = {
  get: /* @__PURE__ */ rl(!0, !1)
};
const Jc = /* @__PURE__ */ new WeakMap(), Qc = /* @__PURE__ */ new WeakMap(), ed = /* @__PURE__ */ new WeakMap(), fh = /* @__PURE__ */ new WeakMap();
function ph(e) {
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
function hh(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : ph(Fp(e));
}
function Rn(e) {
  return to(e) ? e : al(
    e,
    !1,
    sh,
    uh,
    Jc
  );
}
function vh(e) {
  return al(
    e,
    !1,
    rh,
    ch,
    Qc
  );
}
function ll(e) {
  return al(
    e,
    !0,
    ih,
    dh,
    ed
  );
}
function al(e, t, n, o, s) {
  if (!Ge(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = s.get(e);
  if (i)
    return i;
  const r = hh(e);
  if (r === 0)
    return e;
  const l = new Proxy(
    e,
    r === 2 ? o : n
  );
  return s.set(e, l), l;
}
function go(e) {
  return to(e) ? go(e.__v_raw) : !!(e && e.__v_isReactive);
}
function to(e) {
  return !!(e && e.__v_isReadonly);
}
function Rt(e) {
  return !!(e && e.__v_isShallow);
}
function ul(e) {
  return e ? !!e.__v_raw : !1;
}
function ze(e) {
  const t = e && e.__v_raw;
  return t ? ze(t) : e;
}
function Zn(e) {
  return !He(e, "__v_skip") && Object.isExtensible(e) && Dc(e, "__v_skip", !0), e;
}
const _t = (e) => Ge(e) ? Rn(e) : e, _r = (e) => Ge(e) ? ll(e) : e;
function tt(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function ee(e) {
  return gh(e, !1);
}
function gh(e, t) {
  return tt(e) ? e : new mh(e, t);
}
class mh {
  constructor(t, n) {
    this.dep = new vi(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : ze(t), this._value = n ? t : _t(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || Rt(t) || to(t);
    t = o ? t : ze(t), pn(t, n) && (this._rawValue = t, this._value = o ? t : _t(t), this.dep.trigger());
  }
}
function H(e) {
  return tt(e) ? e.value : e;
}
function Le(e) {
  return Ie(e) ? e() : H(e);
}
const yh = {
  get: (e, t, n) => t === "__v_raw" ? e : H(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return tt(s) && !tt(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function td(e) {
  return go(e) ? e : new Proxy(e, yh);
}
class bh {
  constructor(t) {
    this.__v_isRef = !0, this._value = void 0;
    const n = this.dep = new vi(), { get: o, set: s } = t(n.track.bind(n), n.trigger.bind(n));
    this._get = o, this._set = s;
  }
  get value() {
    return this._value = this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function _h(e) {
  return new bh(e);
}
function wh(e) {
  const t = Se(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = nd(e, n);
  return t;
}
class kh {
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
    return Jp(ze(this._object), this._key);
  }
}
class Eh {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function Xe(e, t, n) {
  return tt(e) ? e : Ie(e) ? new Eh(e) : Ge(e) && arguments.length > 1 ? nd(e, t, n) : ee(e);
}
function nd(e, t, n) {
  const o = e[t];
  return tt(o) ? o : new kh(e, t, n);
}
class xh {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new vi(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = Jo - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    qe !== this)
      return Uc(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return qc(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Sh(e, t, n = !1) {
  let o, s;
  return Ie(e) ? o = e : (o = e.get, s = e.set), new xh(o, s, n);
}
const Es = {}, Xs = /* @__PURE__ */ new WeakMap();
let qn;
function Ch(e, t = !1, n = qn) {
  if (n) {
    let o = Xs.get(n);
    o || Xs.set(n, o = []), o.push(e);
  }
}
function $h(e, t, n = je) {
  const { immediate: o, deep: s, once: i, scheduler: r, augmentJob: l, call: a } = n, c = (_) => s ? _ : Rt(_) || s === !1 || s === 0 ? un(_, 1) : un(_);
  let d, f, h, v, w = !1, x = !1;
  if (tt(e) ? (f = () => e.value, w = Rt(e)) : go(e) ? (f = () => c(e), w = !0) : Se(e) ? (x = !0, w = e.some((_) => go(_) || Rt(_)), f = () => e.map((_) => {
    if (tt(_))
      return _.value;
    if (go(_))
      return c(_);
    if (Ie(_))
      return a ? a(_, 2) : _();
  })) : Ie(e) ? t ? f = a ? () => a(e, 2) : e : f = () => {
    if (h) {
      Fn();
      try {
        h();
      } finally {
        Bn();
      }
    }
    const _ = qn;
    qn = d;
    try {
      return a ? a(e, 3, [v]) : e(v);
    } finally {
      qn = _;
    }
  } : f = Jt, t && s) {
    const _ = f, R = s === !0 ? 1 / 0 : s;
    f = () => un(_(), R);
  }
  const I = nl(), N = () => {
    d.stop(), I && I.active && Qr(I.effects, d);
  };
  if (i && t) {
    const _ = t;
    t = (...R) => {
      _(...R), N();
    };
  }
  let D = x ? new Array(e.length).fill(Es) : Es;
  const y = (_) => {
    if (!(!(d.flags & 1) || !d.dirty && !_))
      if (t) {
        const R = d.run();
        if (s || w || (x ? R.some((X, Q) => pn(X, D[Q])) : pn(R, D))) {
          h && h();
          const X = qn;
          qn = d;
          try {
            const Q = [
              R,
              // pass undefined as the old value when it's changed for the first time
              D === Es ? void 0 : x && D[0] === Es ? [] : D,
              v
            ];
            a ? a(t, 3, Q) : (
              // @ts-expect-error
              t(...Q)
            ), D = R;
          } finally {
            qn = X;
          }
        }
      } else
        d.run();
  };
  return l && l(y), d = new Bc(f), d.scheduler = r ? () => r(y, !1) : y, v = (_) => Ch(_, !1, d), h = d.onStop = () => {
    const _ = Xs.get(d);
    if (_) {
      if (a)
        a(_, 4);
      else
        for (const R of _) R();
      Xs.delete(d);
    }
  }, t ? o ? y(!0) : D = d.run() : r ? r(y.bind(null, !0), !0) : d.run(), N.pause = d.pause.bind(d), N.resume = d.resume.bind(d), N.stop = N, N;
}
function un(e, t = 1 / 0, n) {
  if (t <= 0 || !Ge(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, tt(e))
    un(e.value, t, n);
  else if (Se(e))
    for (let o = 0; o < e.length; o++)
      un(e[o], t, n);
  else if (No(e) || vo(e))
    e.forEach((o) => {
      un(o, t, n);
    });
  else if (Ac(e)) {
    for (const o in e)
      un(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && un(e[o], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function hs(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (s) {
    mi(s, t, n);
  }
}
function tn(e, t, n, o) {
  if (Ie(e)) {
    const s = hs(e, t, n, o);
    return s && Oc(s) && s.catch((i) => {
      mi(i, t, n);
    }), s;
  }
  if (Se(e)) {
    const s = [];
    for (let i = 0; i < e.length; i++)
      s.push(tn(e[i], t, n, o));
    return s;
  }
}
function mi(e, t, n, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: r } = t && t.appContext.config || je;
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
      Fn(), hs(i, null, 10, [
        e,
        a,
        c
      ]), Bn();
      return;
    }
  }
  Ih(e, n, s, o, r);
}
function Ih(e, t, n, o = !0, s = !1) {
  if (s)
    throw e;
  console.error(e);
}
const Ct = [];
let Kt = -1;
const mo = [];
let xn = null, fo = 0;
const od = /* @__PURE__ */ Promise.resolve();
let Ks = null;
function ft(e) {
  const t = Ks || od;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Nh(e) {
  let t = Kt + 1, n = Ct.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = Ct[o], i = es(s);
    i < e || i === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function cl(e) {
  if (!(e.flags & 1)) {
    const t = es(e), n = Ct[Ct.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= es(n) ? Ct.push(e) : Ct.splice(Nh(t), 0, e), e.flags |= 1, sd();
  }
}
function sd() {
  Ks || (Ks = od.then(rd));
}
function Th(e) {
  Se(e) ? mo.push(...e) : xn && e.id === -1 ? xn.splice(fo + 1, 0, e) : e.flags & 1 || (mo.push(e), e.flags |= 1), sd();
}
function Fa(e, t, n = Kt + 1) {
  for (; n < Ct.length; n++) {
    const o = Ct[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid)
        continue;
      Ct.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function id(e) {
  if (mo.length) {
    const t = [...new Set(mo)].sort(
      (n, o) => es(n) - es(o)
    );
    if (mo.length = 0, xn) {
      xn.push(...t);
      return;
    }
    for (xn = t, fo = 0; fo < xn.length; fo++) {
      const n = xn[fo];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    xn = null, fo = 0;
  }
}
const es = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function rd(e) {
  try {
    for (Kt = 0; Kt < Ct.length; Kt++) {
      const t = Ct[Kt];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), hs(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; Kt < Ct.length; Kt++) {
      const t = Ct[Kt];
      t && (t.flags &= -2);
    }
    Kt = -1, Ct.length = 0, id(), Ks = null, (Ct.length || mo.length) && rd();
  }
}
let dt = null, ld = null;
function Ws(e) {
  const t = dt;
  return dt = e, ld = e && e.type.__scopeId || null, t;
}
function An(e, t = dt, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && Qa(-1);
    const i = Ws(t);
    let r;
    try {
      r = e(...s);
    } finally {
      Ws(i), o._d && Qa(1);
    }
    return r;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function Te(e, t) {
  if (dt === null)
    return e;
  const n = ki(dt), o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, r, l, a = je] = t[s];
    i && (Ie(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && un(r), o.push({
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
function Un(e, t, n, o) {
  const s = e.dirs, i = t && t.dirs;
  for (let r = 0; r < s.length; r++) {
    const l = s[r];
    i && (l.oldValue = i[r].value);
    let a = l.dir[o];
    a && (Fn(), tn(a, n, 8, [
      e.el,
      l,
      e,
      t
    ]), Bn());
  }
}
const ad = Symbol("_vte"), Mh = (e) => e.__isTeleport, qo = (e) => e && (e.disabled || e.disabled === ""), Ba = (e) => e && (e.defer || e.defer === ""), Ha = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Ua = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, wr = (e, t) => {
  const n = e && e.to;
  return Ke(n) ? t ? t(n) : null : n;
}, ud = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, o, s, i, r, l, a, c) {
    const {
      mc: d,
      pc: f,
      pbc: h,
      o: { insert: v, querySelector: w, createText: x, createComment: I }
    } = c, N = qo(t.props);
    let { shapeFlag: D, children: y, dynamicChildren: _ } = t;
    if (e == null) {
      const R = t.el = x(""), X = t.anchor = x("");
      v(R, n, o), v(X, n, o);
      const Q = (T, L) => {
        D & 16 && (s && s.isCE && (s.ce._teleportTarget = T), d(
          y,
          T,
          L,
          s,
          i,
          r,
          l,
          a
        ));
      }, B = () => {
        const T = t.target = wr(t.props, w), L = cd(T, t, x, v);
        T && (r !== "svg" && Ha(T) ? r = "svg" : r !== "mathml" && Ua(T) && (r = "mathml"), N || (Q(T, L), Vs(t, !1)));
      };
      N && (Q(n, X), Vs(t, !0)), Ba(t.props) ? xt(() => {
        B(), t.el.__isMounted = !0;
      }, i) : B();
    } else {
      if (Ba(t.props) && !e.el.__isMounted) {
        xt(() => {
          ud.process(
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
      const R = t.anchor = e.anchor, X = t.target = e.target, Q = t.targetAnchor = e.targetAnchor, B = qo(e.props), T = B ? n : X, L = B ? R : Q;
      if (r === "svg" || Ha(X) ? r = "svg" : (r === "mathml" || Ua(X)) && (r = "mathml"), _ ? (h(
        e.dynamicChildren,
        _,
        T,
        s,
        i,
        r,
        l
      ), pl(e, t, !0)) : a || f(
        e,
        t,
        T,
        L,
        s,
        i,
        r,
        l,
        !1
      ), N)
        B ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : xs(
          t,
          n,
          R,
          c,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const Y = t.target = wr(
          t.props,
          w
        );
        Y && xs(
          t,
          Y,
          null,
          c,
          0
        );
      } else B && xs(
        t,
        X,
        Q,
        c,
        1
      );
      Vs(t, N);
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
      const v = i || !qo(h);
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
  move: xs,
  hydrate: Oh
};
function xs(e, t, n, { o: { insert: o }, m: s }, i = 2) {
  i === 0 && o(e.targetAnchor, t, n);
  const { el: r, anchor: l, shapeFlag: a, children: c, props: d } = e, f = i === 2;
  if (f && o(r, t, n), (!f || qo(d)) && a & 16)
    for (let h = 0; h < c.length; h++)
      s(
        c[h],
        t,
        n,
        2
      );
  f && o(l, t, n);
}
function Oh(e, t, n, o, s, i, {
  o: { nextSibling: r, parentNode: l, querySelector: a, insert: c, createText: d }
}, f) {
  const h = t.target = wr(
    t.props,
    a
  );
  if (h) {
    const v = qo(t.props), w = h._lpa || h.firstChild;
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
        t.targetAnchor || cd(h, t, d, c), f(
          w && r(w),
          t,
          h,
          n,
          o,
          s,
          i
        );
      }
    Vs(t, v);
  }
  return t.anchor && r(t.anchor);
}
const Ph = ud;
function Vs(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let o, s;
    for (t ? (o = e.el, s = e.anchor) : (o = e.targetStart, s = e.targetAnchor); o && o !== s; )
      o.nodeType === 1 && o.setAttribute("data-v-owner", n.uid), o = o.nextSibling;
    n.ut();
  }
}
function cd(e, t, n, o) {
  const s = t.targetStart = n(""), i = t.targetAnchor = n("");
  return s[ad] = i, e && (o(s, e), o(i, e)), i;
}
function dl(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, dl(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function De(e, t) {
  return Ie(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    wt({ name: e.name }, t, { setup: e })
  ) : e;
}
function dd(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function Zs(e, t, n, o, s = !1) {
  if (Se(e)) {
    e.forEach(
      (w, x) => Zs(
        w,
        t && (Se(t) ? t[x] : t),
        n,
        o,
        s
      )
    );
    return;
  }
  if (yo(o) && !s) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && Zs(e, t, n, o.component.subTree);
    return;
  }
  const i = o.shapeFlag & 4 ? ki(o.component) : o.el, r = s ? null : i, { i: l, r: a } = e, c = t && t.r, d = l.refs === je ? l.refs = {} : l.refs, f = l.setupState, h = ze(f), v = f === je ? () => !1 : (w) => He(h, w);
  if (c != null && c !== a && (Ke(c) ? (d[c] = null, v(c) && (f[c] = null)) : tt(c) && (c.value = null)), Ie(a))
    hs(a, l, 12, [r, d]);
  else {
    const w = Ke(a), x = tt(a);
    if (w || x) {
      const I = () => {
        if (e.f) {
          const N = w ? v(a) ? f[a] : d[a] : a.value;
          s ? Se(N) && Qr(N, i) : Se(N) ? N.includes(i) || N.push(i) : w ? (d[a] = [i], v(a) && (f[a] = d[a])) : (a.value = [i], e.k && (d[e.k] = a.value));
        } else w ? (d[a] = r, v(a) && (f[a] = r)) : x && (a.value = r, e.k && (d[e.k] = r));
      };
      r ? (I.id = -1, xt(I, n)) : I();
    }
  }
}
hi().requestIdleCallback;
hi().cancelIdleCallback;
const yo = (e) => !!e.type.__asyncLoader, fd = (e) => e.type.__isKeepAlive;
function Ah(e, t) {
  pd(e, "a", t);
}
function Dh(e, t) {
  pd(e, "da", t);
}
function pd(e, t, n = pt) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (yi(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      fd(s.parent.vnode) && Rh(o, t, n, s), s = s.parent;
  }
}
function Rh(e, t, n, o) {
  const s = yi(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  bi(() => {
    Qr(o[t], s);
  }, n);
}
function yi(e, t, n = pt, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...r) => {
      Fn();
      const l = vs(n), a = tn(t, n, e, r);
      return l(), Bn(), a;
    });
    return o ? s.unshift(i) : s.push(i), i;
  }
}
const bn = (e) => (t, n = pt) => {
  (!ns || e === "sp") && yi(e, (...o) => t(...o), n);
}, hd = bn("bm"), ht = bn("m"), Lh = bn(
  "bu"
), Vh = bn("u"), _n = bn(
  "bum"
), bi = bn("um"), zh = bn(
  "sp"
), Fh = bn("rtg"), Bh = bn("rtc");
function Hh(e, t = pt) {
  yi("ec", e, t);
}
const vd = "components";
function gd(e, t) {
  return bd(vd, e, !0, t) || e;
}
const md = Symbol.for("v-ndc");
function yd(e) {
  return Ke(e) ? bd(vd, e, !1) || e : e || md;
}
function bd(e, t, n = !0, o = !1) {
  const s = dt || pt;
  if (s) {
    const i = s.type;
    {
      const l = $v(
        i,
        !1
      );
      if (l && (l === t || l === Lt(t) || l === pi(Lt(t))))
        return i;
    }
    const r = (
      // local registration
      // check instance[type] first which is resolved for options API
      ja(s[e] || i[e], t) || // global registration
      ja(s.appContext[e], t)
    );
    return !r && o ? i : r;
  }
}
function ja(e, t) {
  return e && (e[t] || e[Lt(t)] || e[pi(Lt(t))]);
}
function Re(e, t, n, o) {
  let s;
  const i = n && n[o], r = Se(e);
  if (r || Ke(e)) {
    const l = r && go(e);
    let a = !1;
    l && (a = !Rt(e), e = gi(e)), s = new Array(e.length);
    for (let c = 0, d = e.length; c < d; c++)
      s[c] = t(
        a ? _t(e[c]) : e[c],
        c,
        void 0,
        i && i[c]
      );
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let l = 0; l < e; l++)
      s[l] = t(l + 1, l, void 0, i && i[l]);
  } else if (Ge(e))
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
function no(e, t, n = {}, o, s) {
  if (dt.ce || dt.parent && yo(dt.parent) && dt.parent.ce)
    return t !== "default" && (n.name = t), E(), lt(
      _e,
      null,
      [ne("slot", n, o && o())],
      64
    );
  let i = e[t];
  i && i._c && (i._d = !1), E();
  const r = i && _d(i(n)), l = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  r && r.key, a = lt(
    _e,
    {
      key: (l && !Gt(l) ? l : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!r && o ? "_fb" : "")
    },
    r || (o ? o() : []),
    r && e._ === 1 ? 64 : -2
  );
  return a.scopeId && (a.slotScopeIds = [a.scopeId + "-s"]), i && i._c && (i._d = !0), a;
}
function _d(e) {
  return e.some((t) => ts(t) ? !(t.type === Ln || t.type === _e && !_d(t.children)) : !0) ? e : null;
}
const kr = (e) => e ? Hd(e) ? ki(e) : kr(e.parent) : null, Yo = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ wt(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => kr(e.parent),
    $root: (e) => kr(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => xd(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      cl(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = ft.bind(e.proxy)),
    $watch: (e) => dv.bind(e)
  })
), Gi = (e, t) => e !== je && !e.__isScriptSetup && He(e, t), Uh = {
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
        if (Gi(o, t))
          return r[t] = 1, o[t];
        if (s !== je && He(s, t))
          return r[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (c = e.propsOptions[0]) && He(c, t)
        )
          return r[t] = 3, i[t];
        if (n !== je && He(n, t))
          return r[t] = 4, n[t];
        Er && (r[t] = 0);
      }
    }
    const d = Yo[t];
    let f, h;
    if (d)
      return t === "$attrs" && bt(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (f = l.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== je && He(n, t))
      return r[t] = 4, n[t];
    if (
      // global properties
      h = a.config.globalProperties, He(h, t)
    )
      return h[t];
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: i } = e;
    return Gi(s, t) ? (s[t] = n, !0) : o !== je && He(o, t) ? (o[t] = n, !0) : He(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: s, propsOptions: i }
  }, r) {
    let l;
    return !!n[r] || e !== je && He(e, r) || Gi(t, r) || (l = i[0]) && He(l, r) || He(o, r) || He(Yo, r) || He(s.config.globalProperties, r);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : He(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function jh() {
  return wd().slots;
}
function Gh() {
  return wd().attrs;
}
function wd() {
  const e = To();
  return e.setupContext || (e.setupContext = jd(e));
}
function Ga(e) {
  return Se(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function kd(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || Object.defineProperty(n, o, {
      enumerable: !0,
      get: () => e[o]
    });
  return n;
}
let Er = !0;
function qh(e) {
  const t = xd(e), n = e.proxy, o = e.ctx;
  Er = !1, t.beforeCreate && qa(t.beforeCreate, e, "bc");
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
    beforeDestroy: N,
    beforeUnmount: D,
    destroyed: y,
    unmounted: _,
    render: R,
    renderTracked: X,
    renderTriggered: Q,
    errorCaptured: B,
    serverPrefetch: T,
    // public API
    expose: L,
    inheritAttrs: Y,
    // assets
    components: U,
    directives: G,
    filters: $
  } = t;
  if (c && Yh(c, o, null), r)
    for (const F in r) {
      const q = r[F];
      Ie(q) && (o[F] = q.bind(n));
    }
  if (s) {
    const F = s.call(n, n);
    Ge(F) && (e.data = Rn(F));
  }
  if (Er = !0, i)
    for (const F in i) {
      const q = i[F], te = Ie(q) ? q.bind(n, n) : Ie(q.get) ? q.get.bind(n, n) : Jt, ce = !Ie(q) && Ie(q.set) ? q.set.bind(n) : Jt, fe = ae({
        get: te,
        set: ce
      });
      Object.defineProperty(o, F, {
        enumerable: !0,
        configurable: !0,
        get: () => fe.value,
        set: (le) => fe.value = le
      });
    }
  if (l)
    for (const F in l)
      Ed(l[F], o, n, F);
  if (a) {
    const F = Ie(a) ? a.call(n) : a;
    Reflect.ownKeys(F).forEach((q) => {
      oo(q, F[q]);
    });
  }
  d && qa(d, e, "c");
  function M(F, q) {
    Se(q) ? q.forEach((te) => F(te.bind(n))) : q && F(q.bind(n));
  }
  if (M(hd, f), M(ht, h), M(Lh, v), M(Vh, w), M(Ah, x), M(Dh, I), M(Hh, B), M(Bh, X), M(Fh, Q), M(_n, D), M(bi, _), M(zh, T), Se(L))
    if (L.length) {
      const F = e.exposed || (e.exposed = {});
      L.forEach((q) => {
        Object.defineProperty(F, q, {
          get: () => n[q],
          set: (te) => n[q] = te
        });
      });
    } else e.exposed || (e.exposed = {});
  R && e.render === Jt && (e.render = R), Y != null && (e.inheritAttrs = Y), U && (e.components = U), G && (e.directives = G), T && dd(e);
}
function Yh(e, t, n = Jt) {
  Se(e) && (e = xr(e));
  for (const o in e) {
    const s = e[o];
    let i;
    Ge(s) ? "default" in s ? i = Qt(
      s.from || o,
      s.default,
      !0
    ) : i = Qt(s.from || o) : i = Qt(s), tt(i) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (r) => i.value = r
    }) : t[o] = i;
  }
}
function qa(e, t, n) {
  tn(
    Se(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Ed(e, t, n, o) {
  let s = o.includes(".") ? Ld(n, o) : () => n[o];
  if (Ke(e)) {
    const i = t[e];
    Ie(i) && Me(s, i);
  } else if (Ie(e))
    Me(s, e.bind(n));
  else if (Ge(e))
    if (Se(e))
      e.forEach((i) => Ed(i, t, n, o));
    else {
      const i = Ie(e.handler) ? e.handler.bind(n) : t[e.handler];
      Ie(i) && Me(s, i, e);
    }
}
function xd(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: s,
    optionsCache: i,
    config: { optionMergeStrategies: r }
  } = e.appContext, l = i.get(t);
  let a;
  return l ? a = l : !s.length && !n && !o ? a = t : (a = {}, s.length && s.forEach(
    (c) => Js(a, c, r, !0)
  ), Js(a, t, r)), Ge(t) && i.set(t, a), a;
}
function Js(e, t, n, o = !1) {
  const { mixins: s, extends: i } = t;
  i && Js(e, i, n, !0), s && s.forEach(
    (r) => Js(e, r, n, !0)
  );
  for (const r in t)
    if (!(o && r === "expose")) {
      const l = Xh[r] || n && n[r];
      e[r] = l ? l(e[r], t[r]) : t[r];
    }
  return e;
}
const Xh = {
  data: Ya,
  props: Xa,
  emits: Xa,
  // objects
  methods: Vo,
  computed: Vo,
  // lifecycle
  beforeCreate: Et,
  created: Et,
  beforeMount: Et,
  mounted: Et,
  beforeUpdate: Et,
  updated: Et,
  beforeDestroy: Et,
  beforeUnmount: Et,
  destroyed: Et,
  unmounted: Et,
  activated: Et,
  deactivated: Et,
  errorCaptured: Et,
  serverPrefetch: Et,
  // assets
  components: Vo,
  directives: Vo,
  // watch
  watch: Wh,
  // provide / inject
  provide: Ya,
  inject: Kh
};
function Ya(e, t) {
  return t ? e ? function() {
    return wt(
      Ie(e) ? e.call(this, this) : e,
      Ie(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function Kh(e, t) {
  return Vo(xr(e), xr(t));
}
function xr(e) {
  if (Se(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Et(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Vo(e, t) {
  return e ? wt(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function Xa(e, t) {
  return e ? Se(e) && Se(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : wt(
    /* @__PURE__ */ Object.create(null),
    Ga(e),
    Ga(t ?? {})
  ) : t;
}
function Wh(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = wt(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = Et(e[o], t[o]);
  return n;
}
function Sd() {
  return {
    app: null,
    config: {
      isNativeTag: Vp,
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
let Zh = 0;
function Jh(e, t) {
  return function(o, s = null) {
    Ie(o) || (o = wt({}, o)), s != null && !Ge(s) && (s = null);
    const i = Sd(), r = /* @__PURE__ */ new WeakSet(), l = [];
    let a = !1;
    const c = i.app = {
      _uid: Zh++,
      _component: o,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: Tv,
      get config() {
        return i.config;
      },
      set config(d) {
      },
      use(d, ...f) {
        return r.has(d) || (d && Ie(d.install) ? (r.add(d), d.install(c, ...f)) : Ie(d) && (r.add(d), d(c, ...f))), c;
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
          return v.appContext = i, h === !0 ? h = "svg" : h === !1 && (h = void 0), e(v, d, h), a = !0, c._container = d, d.__vue_app__ = c, ki(v.component);
        }
      },
      onUnmount(d) {
        l.push(d);
      },
      unmount() {
        a && (tn(
          l,
          c._instance,
          16
        ), e(null, c._container), delete c._container.__vue_app__);
      },
      provide(d, f) {
        return i.provides[d] = f, c;
      },
      runWithContext(d) {
        const f = bo;
        bo = c;
        try {
          return d();
        } finally {
          bo = f;
        }
      }
    };
    return c;
  };
}
let bo = null;
function oo(e, t) {
  if (pt) {
    let n = pt.provides;
    const o = pt.parent && pt.parent.provides;
    o === n && (n = pt.provides = Object.create(o)), n[e] = t;
  }
}
function Qt(e, t, n = !1) {
  const o = pt || dt;
  if (o || bo) {
    const s = bo ? bo._context.provides : o ? o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && Ie(t) ? t.call(o && o.proxy) : t;
  }
}
const Cd = {}, $d = () => Object.create(Cd), Id = (e) => Object.getPrototypeOf(e) === Cd;
function Qh(e, t, n, o = !1) {
  const s = {}, i = $d();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Nd(e, t, s, i);
  for (const r in e.propsOptions[0])
    r in s || (s[r] = void 0);
  n ? e.props = o ? s : vh(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i;
}
function ev(e, t, n, o) {
  const {
    props: s,
    attrs: i,
    vnode: { patchFlag: r }
  } = e, l = ze(s), [a] = e.propsOptions;
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
        if (_i(e.emitsOptions, h))
          continue;
        const v = t[h];
        if (a)
          if (He(i, h))
            v !== i[h] && (i[h] = v, c = !0);
          else {
            const w = Lt(h);
            s[w] = Sr(
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
    Nd(e, t, s, i) && (c = !0);
    let d;
    for (const f in l)
      (!t || // for camelCase
      !He(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = zn(f)) === f || !He(t, d))) && (a ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[d] !== void 0) && (s[f] = Sr(
        a,
        l,
        f,
        void 0,
        e,
        !0
      )) : delete s[f]);
    if (i !== l)
      for (const f in i)
        (!t || !He(t, f)) && (delete i[f], c = !0);
  }
  c && an(e.attrs, "set", "");
}
function Nd(e, t, n, o) {
  const [s, i] = e.propsOptions;
  let r = !1, l;
  if (t)
    for (let a in t) {
      if (Uo(a))
        continue;
      const c = t[a];
      let d;
      s && He(s, d = Lt(a)) ? !i || !i.includes(d) ? n[d] = c : (l || (l = {}))[d] = c : _i(e.emitsOptions, a) || (!(a in o) || c !== o[a]) && (o[a] = c, r = !0);
    }
  if (i) {
    const a = ze(n), c = l || je;
    for (let d = 0; d < i.length; d++) {
      const f = i[d];
      n[f] = Sr(
        s,
        a,
        f,
        c[f],
        e,
        !He(c, f)
      );
    }
  }
  return r;
}
function Sr(e, t, n, o, s, i) {
  const r = e[n];
  if (r != null) {
    const l = He(r, "default");
    if (l && o === void 0) {
      const a = r.default;
      if (r.type !== Function && !r.skipFactory && Ie(a)) {
        const { propsDefaults: c } = s;
        if (n in c)
          o = c[n];
        else {
          const d = vs(s);
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
    ] && (o === "" || o === zn(n)) && (o = !0));
  }
  return o;
}
const tv = /* @__PURE__ */ new WeakMap();
function Td(e, t, n = !1) {
  const o = n ? tv : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const i = e.props, r = {}, l = [];
  let a = !1;
  if (!Ie(e)) {
    const d = (f) => {
      a = !0;
      const [h, v] = Td(f, t, !0);
      wt(r, h), v && l.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!i && !a)
    return Ge(e) && o.set(e, ho), ho;
  if (Se(i))
    for (let d = 0; d < i.length; d++) {
      const f = Lt(i[d]);
      Ka(f) && (r[f] = je);
    }
  else if (i)
    for (const d in i) {
      const f = Lt(d);
      if (Ka(f)) {
        const h = i[d], v = r[f] = Se(h) || Ie(h) ? { type: h } : wt({}, h), w = v.type;
        let x = !1, I = !0;
        if (Se(w))
          for (let N = 0; N < w.length; ++N) {
            const D = w[N], y = Ie(D) && D.name;
            if (y === "Boolean") {
              x = !0;
              break;
            } else y === "String" && (I = !1);
          }
        else
          x = Ie(w) && w.name === "Boolean";
        v[
          0
          /* shouldCast */
        ] = x, v[
          1
          /* shouldCastTrue */
        ] = I, (x || He(v, "default")) && l.push(f);
      }
    }
  const c = [r, l];
  return Ge(e) && o.set(e, c), c;
}
function Ka(e) {
  return e[0] !== "$" && !Uo(e);
}
const Md = (e) => e[0] === "_" || e === "$stable", fl = (e) => Se(e) ? e.map(Zt) : [Zt(e)], nv = (e, t, n) => {
  if (t._n)
    return t;
  const o = An((...s) => fl(t(...s)), n);
  return o._c = !1, o;
}, Od = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (Md(s)) continue;
    const i = e[s];
    if (Ie(i))
      t[s] = nv(s, i, o);
    else if (i != null) {
      const r = fl(i);
      t[s] = () => r;
    }
  }
}, Pd = (e, t) => {
  const n = fl(t);
  e.slots.default = () => n;
}, Ad = (e, t, n) => {
  for (const o in t)
    (n || o !== "_") && (e[o] = t[o]);
}, ov = (e, t, n) => {
  const o = e.slots = $d();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Ad(o, t, n), n && Dc(o, "_", s, !0)) : Od(t, o);
  } else t && Pd(e, t);
}, sv = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let i = !0, r = je;
  if (o.shapeFlag & 32) {
    const l = t._;
    l ? n && l === 1 ? i = !1 : Ad(s, t, n) : (i = !t.$stable, Od(t, s)), r = t;
  } else t && (Pd(e, t), r = { default: 1 });
  if (i)
    for (const l in s)
      !Md(l) && r[l] == null && delete s[l];
}, xt = yv;
function iv(e) {
  return rv(e);
}
function rv(e, t) {
  const n = hi();
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
    setScopeId: v = Jt,
    insertStaticContent: w
  } = e, x = (p, O, g, m = null, k = null, S = null, j = void 0, W = null, Z = !!O.dynamicChildren) => {
    if (p === O)
      return;
    p && !Ao(p, O) && (m = xe(p), le(p, k, S, !0), p = null), O.patchFlag === -2 && (Z = !1, O.dynamicChildren = null);
    const { type: P, ref: re, shapeFlag: ie } = O;
    switch (P) {
      case wi:
        I(p, O, g, m);
        break;
      case Ln:
        N(p, O, g, m);
        break;
      case Yi:
        p == null && D(O, g, m, j);
        break;
      case _e:
        U(
          p,
          O,
          g,
          m,
          k,
          S,
          j,
          W,
          Z
        );
        break;
      default:
        ie & 1 ? R(
          p,
          O,
          g,
          m,
          k,
          S,
          j,
          W,
          Z
        ) : ie & 6 ? G(
          p,
          O,
          g,
          m,
          k,
          S,
          j,
          W,
          Z
        ) : (ie & 64 || ie & 128) && P.process(
          p,
          O,
          g,
          m,
          k,
          S,
          j,
          W,
          Z,
          ke
        );
    }
    re != null && k && Zs(re, p && p.ref, S, O || p, !O);
  }, I = (p, O, g, m) => {
    if (p == null)
      o(
        O.el = l(O.children),
        g,
        m
      );
    else {
      const k = O.el = p.el;
      O.children !== p.children && c(k, O.children);
    }
  }, N = (p, O, g, m) => {
    p == null ? o(
      O.el = a(O.children || ""),
      g,
      m
    ) : O.el = p.el;
  }, D = (p, O, g, m) => {
    [p.el, p.anchor] = w(
      p.children,
      O,
      g,
      m,
      p.el,
      p.anchor
    );
  }, y = ({ el: p, anchor: O }, g, m) => {
    let k;
    for (; p && p !== O; )
      k = h(p), o(p, g, m), p = k;
    o(O, g, m);
  }, _ = ({ el: p, anchor: O }) => {
    let g;
    for (; p && p !== O; )
      g = h(p), s(p), p = g;
    s(O);
  }, R = (p, O, g, m, k, S, j, W, Z) => {
    O.type === "svg" ? j = "svg" : O.type === "math" && (j = "mathml"), p == null ? X(
      O,
      g,
      m,
      k,
      S,
      j,
      W,
      Z
    ) : T(
      p,
      O,
      k,
      S,
      j,
      W,
      Z
    );
  }, X = (p, O, g, m, k, S, j, W) => {
    let Z, P;
    const { props: re, shapeFlag: ie, transition: ue, dirs: de } = p;
    if (Z = p.el = r(
      p.type,
      S,
      re && re.is,
      re
    ), ie & 8 ? d(Z, p.children) : ie & 16 && B(
      p.children,
      Z,
      null,
      m,
      k,
      qi(p, S),
      j,
      W
    ), de && Un(p, null, m, "created"), Q(Z, p, p.scopeId, j, m), re) {
      for (const Pe in re)
        Pe !== "value" && !Uo(Pe) && i(Z, Pe, null, re[Pe], S, m);
      "value" in re && i(Z, "value", null, re.value, S), (P = re.onVnodeBeforeMount) && Xt(P, m, p);
    }
    de && Un(p, null, m, "beforeMount");
    const Ce = lv(k, ue);
    Ce && ue.beforeEnter(Z), o(Z, O, g), ((P = re && re.onVnodeMounted) || Ce || de) && xt(() => {
      P && Xt(P, m, p), Ce && ue.enter(Z), de && Un(p, null, m, "mounted");
    }, k);
  }, Q = (p, O, g, m, k) => {
    if (g && v(p, g), m)
      for (let S = 0; S < m.length; S++)
        v(p, m[S]);
    if (k) {
      let S = k.subTree;
      if (O === S || zd(S.type) && (S.ssContent === O || S.ssFallback === O)) {
        const j = k.vnode;
        Q(
          p,
          j,
          j.scopeId,
          j.slotScopeIds,
          k.parent
        );
      }
    }
  }, B = (p, O, g, m, k, S, j, W, Z = 0) => {
    for (let P = Z; P < p.length; P++) {
      const re = p[P] = W ? Sn(p[P]) : Zt(p[P]);
      x(
        null,
        re,
        O,
        g,
        m,
        k,
        S,
        j,
        W
      );
    }
  }, T = (p, O, g, m, k, S, j) => {
    const W = O.el = p.el;
    let { patchFlag: Z, dynamicChildren: P, dirs: re } = O;
    Z |= p.patchFlag & 16;
    const ie = p.props || je, ue = O.props || je;
    let de;
    if (g && jn(g, !1), (de = ue.onVnodeBeforeUpdate) && Xt(de, g, O, p), re && Un(O, p, g, "beforeUpdate"), g && jn(g, !0), (ie.innerHTML && ue.innerHTML == null || ie.textContent && ue.textContent == null) && d(W, ""), P ? L(
      p.dynamicChildren,
      P,
      W,
      g,
      m,
      qi(O, k),
      S
    ) : j || q(
      p,
      O,
      W,
      null,
      g,
      m,
      qi(O, k),
      S,
      !1
    ), Z > 0) {
      if (Z & 16)
        Y(W, ie, ue, g, k);
      else if (Z & 2 && ie.class !== ue.class && i(W, "class", null, ue.class, k), Z & 4 && i(W, "style", ie.style, ue.style, k), Z & 8) {
        const Ce = O.dynamicProps;
        for (let Pe = 0; Pe < Ce.length; Pe++) {
          const Ne = Ce[Pe], nt = ie[Ne], vt = ue[Ne];
          (vt !== nt || Ne === "value") && i(W, Ne, nt, vt, k, g);
        }
      }
      Z & 1 && p.children !== O.children && d(W, O.children);
    } else !j && P == null && Y(W, ie, ue, g, k);
    ((de = ue.onVnodeUpdated) || re) && xt(() => {
      de && Xt(de, g, O, p), re && Un(O, p, g, "updated");
    }, m);
  }, L = (p, O, g, m, k, S, j) => {
    for (let W = 0; W < O.length; W++) {
      const Z = p[W], P = O[W], re = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        Z.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (Z.type === _e || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Ao(Z, P) || // - In the case of a component, it could contain anything.
        Z.shapeFlag & 70) ? f(Z.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          g
        )
      );
      x(
        Z,
        P,
        re,
        null,
        m,
        k,
        S,
        j,
        !0
      );
    }
  }, Y = (p, O, g, m, k) => {
    if (O !== g) {
      if (O !== je)
        for (const S in O)
          !Uo(S) && !(S in g) && i(
            p,
            S,
            O[S],
            null,
            k,
            m
          );
      for (const S in g) {
        if (Uo(S)) continue;
        const j = g[S], W = O[S];
        j !== W && S !== "value" && i(p, S, W, j, k, m);
      }
      "value" in g && i(p, "value", O.value, g.value, k);
    }
  }, U = (p, O, g, m, k, S, j, W, Z) => {
    const P = O.el = p ? p.el : l(""), re = O.anchor = p ? p.anchor : l("");
    let { patchFlag: ie, dynamicChildren: ue, slotScopeIds: de } = O;
    de && (W = W ? W.concat(de) : de), p == null ? (o(P, g, m), o(re, g, m), B(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      O.children || [],
      g,
      re,
      k,
      S,
      j,
      W,
      Z
    )) : ie > 0 && ie & 64 && ue && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    p.dynamicChildren ? (L(
      p.dynamicChildren,
      ue,
      g,
      k,
      S,
      j,
      W
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (O.key != null || k && O === k.subTree) && pl(
      p,
      O,
      !0
      /* shallow */
    )) : q(
      p,
      O,
      g,
      re,
      k,
      S,
      j,
      W,
      Z
    );
  }, G = (p, O, g, m, k, S, j, W, Z) => {
    O.slotScopeIds = W, p == null ? O.shapeFlag & 512 ? k.ctx.activate(
      O,
      g,
      m,
      j,
      Z
    ) : $(
      O,
      g,
      m,
      k,
      S,
      j,
      Z
    ) : V(p, O, Z);
  }, $ = (p, O, g, m, k, S, j) => {
    const W = p.component = Ev(
      p,
      m,
      k
    );
    if (fd(p) && (W.ctx.renderer = ke), xv(W, !1, j), W.asyncDep) {
      if (k && k.registerDep(W, M, j), !p.el) {
        const Z = W.subTree = ne(Ln);
        N(null, Z, O, g);
      }
    } else
      M(
        W,
        p,
        O,
        g,
        k,
        S,
        j
      );
  }, V = (p, O, g) => {
    const m = O.component = p.component;
    if (gv(p, O, g))
      if (m.asyncDep && !m.asyncResolved) {
        F(m, O, g);
        return;
      } else
        m.next = O, m.update();
    else
      O.el = p.el, m.vnode = O;
  }, M = (p, O, g, m, k, S, j) => {
    const W = () => {
      if (p.isMounted) {
        let { next: ie, bu: ue, u: de, parent: Ce, vnode: Pe } = p;
        {
          const Tt = Dd(p);
          if (Tt) {
            ie && (ie.el = Pe.el, F(p, ie, j)), Tt.asyncDep.then(() => {
              p.isUnmounted || W();
            });
            return;
          }
        }
        let Ne = ie, nt;
        jn(p, !1), ie ? (ie.el = Pe.el, F(p, ie, j)) : ie = Pe, ue && Rs(ue), (nt = ie.props && ie.props.onVnodeBeforeUpdate) && Xt(nt, Ce, ie, Pe), jn(p, !0);
        const vt = Za(p), Pt = p.subTree;
        p.subTree = vt, x(
          Pt,
          vt,
          // parent may have changed if it's in a teleport
          f(Pt.el),
          // anchor may have changed if it's in a fragment
          xe(Pt),
          p,
          k,
          S
        ), ie.el = vt.el, Ne === null && mv(p, vt.el), de && xt(de, k), (nt = ie.props && ie.props.onVnodeUpdated) && xt(
          () => Xt(nt, Ce, ie, Pe),
          k
        );
      } else {
        let ie;
        const { el: ue, props: de } = O, { bm: Ce, m: Pe, parent: Ne, root: nt, type: vt } = p, Pt = yo(O);
        jn(p, !1), Ce && Rs(Ce), !Pt && (ie = de && de.onVnodeBeforeMount) && Xt(ie, Ne, O), jn(p, !0);
        {
          nt.ce && nt.ce._injectChildStyle(vt);
          const Tt = p.subTree = Za(p);
          x(
            null,
            Tt,
            g,
            m,
            p,
            k,
            S
          ), O.el = Tt.el;
        }
        if (Pe && xt(Pe, k), !Pt && (ie = de && de.onVnodeMounted)) {
          const Tt = O;
          xt(
            () => Xt(ie, Ne, Tt),
            k
          );
        }
        (O.shapeFlag & 256 || Ne && yo(Ne.vnode) && Ne.vnode.shapeFlag & 256) && p.a && xt(p.a, k), p.isMounted = !0, O = g = m = null;
      }
    };
    p.scope.on();
    const Z = p.effect = new Bc(W);
    p.scope.off();
    const P = p.update = Z.run.bind(Z), re = p.job = Z.runIfDirty.bind(Z);
    re.i = p, re.id = p.uid, Z.scheduler = () => cl(re), jn(p, !0), P();
  }, F = (p, O, g) => {
    O.component = p;
    const m = p.vnode.props;
    p.vnode = O, p.next = null, ev(p, O.props, m, g), sv(p, O.children, g), Fn(), Fa(p), Bn();
  }, q = (p, O, g, m, k, S, j, W, Z = !1) => {
    const P = p && p.children, re = p ? p.shapeFlag : 0, ie = O.children, { patchFlag: ue, shapeFlag: de } = O;
    if (ue > 0) {
      if (ue & 128) {
        ce(
          P,
          ie,
          g,
          m,
          k,
          S,
          j,
          W,
          Z
        );
        return;
      } else if (ue & 256) {
        te(
          P,
          ie,
          g,
          m,
          k,
          S,
          j,
          W,
          Z
        );
        return;
      }
    }
    de & 8 ? (re & 16 && se(P, k, S), ie !== P && d(g, ie)) : re & 16 ? de & 16 ? ce(
      P,
      ie,
      g,
      m,
      k,
      S,
      j,
      W,
      Z
    ) : se(P, k, S, !0) : (re & 8 && d(g, ""), de & 16 && B(
      ie,
      g,
      m,
      k,
      S,
      j,
      W,
      Z
    ));
  }, te = (p, O, g, m, k, S, j, W, Z) => {
    p = p || ho, O = O || ho;
    const P = p.length, re = O.length, ie = Math.min(P, re);
    let ue;
    for (ue = 0; ue < ie; ue++) {
      const de = O[ue] = Z ? Sn(O[ue]) : Zt(O[ue]);
      x(
        p[ue],
        de,
        g,
        null,
        k,
        S,
        j,
        W,
        Z
      );
    }
    P > re ? se(
      p,
      k,
      S,
      !0,
      !1,
      ie
    ) : B(
      O,
      g,
      m,
      k,
      S,
      j,
      W,
      Z,
      ie
    );
  }, ce = (p, O, g, m, k, S, j, W, Z) => {
    let P = 0;
    const re = O.length;
    let ie = p.length - 1, ue = re - 1;
    for (; P <= ie && P <= ue; ) {
      const de = p[P], Ce = O[P] = Z ? Sn(O[P]) : Zt(O[P]);
      if (Ao(de, Ce))
        x(
          de,
          Ce,
          g,
          null,
          k,
          S,
          j,
          W,
          Z
        );
      else
        break;
      P++;
    }
    for (; P <= ie && P <= ue; ) {
      const de = p[ie], Ce = O[ue] = Z ? Sn(O[ue]) : Zt(O[ue]);
      if (Ao(de, Ce))
        x(
          de,
          Ce,
          g,
          null,
          k,
          S,
          j,
          W,
          Z
        );
      else
        break;
      ie--, ue--;
    }
    if (P > ie) {
      if (P <= ue) {
        const de = ue + 1, Ce = de < re ? O[de].el : m;
        for (; P <= ue; )
          x(
            null,
            O[P] = Z ? Sn(O[P]) : Zt(O[P]),
            g,
            Ce,
            k,
            S,
            j,
            W,
            Z
          ), P++;
      }
    } else if (P > ue)
      for (; P <= ie; )
        le(p[P], k, S, !0), P++;
    else {
      const de = P, Ce = P, Pe = /* @__PURE__ */ new Map();
      for (P = Ce; P <= ue; P++) {
        const gt = O[P] = Z ? Sn(O[P]) : Zt(O[P]);
        gt.key != null && Pe.set(gt.key, P);
      }
      let Ne, nt = 0;
      const vt = ue - Ce + 1;
      let Pt = !1, Tt = 0;
      const Ue = new Array(vt);
      for (P = 0; P < vt; P++) Ue[P] = 0;
      for (P = de; P <= ie; P++) {
        const gt = p[P];
        if (nt >= vt) {
          le(gt, k, S, !0);
          continue;
        }
        let It;
        if (gt.key != null)
          It = Pe.get(gt.key);
        else
          for (Ne = Ce; Ne <= ue; Ne++)
            if (Ue[Ne - Ce] === 0 && Ao(gt, O[Ne])) {
              It = Ne;
              break;
            }
        It === void 0 ? le(gt, k, S, !0) : (Ue[It - Ce] = P + 1, It >= Tt ? Tt = It : Pt = !0, x(
          gt,
          O[It],
          g,
          null,
          k,
          S,
          j,
          W,
          Z
        ), nt++);
      }
      const kt = Pt ? av(Ue) : ho;
      for (Ne = kt.length - 1, P = vt - 1; P >= 0; P--) {
        const gt = Ce + P, It = O[gt], ut = gt + 1 < re ? O[gt + 1].el : m;
        Ue[P] === 0 ? x(
          null,
          It,
          g,
          ut,
          k,
          S,
          j,
          W,
          Z
        ) : Pt && (Ne < 0 || P !== kt[Ne] ? fe(It, g, ut, 2) : Ne--);
      }
    }
  }, fe = (p, O, g, m, k = null) => {
    const { el: S, type: j, transition: W, children: Z, shapeFlag: P } = p;
    if (P & 6) {
      fe(p.component.subTree, O, g, m);
      return;
    }
    if (P & 128) {
      p.suspense.move(O, g, m);
      return;
    }
    if (P & 64) {
      j.move(p, O, g, ke);
      return;
    }
    if (j === _e) {
      o(S, O, g);
      for (let ie = 0; ie < Z.length; ie++)
        fe(Z[ie], O, g, m);
      o(p.anchor, O, g);
      return;
    }
    if (j === Yi) {
      y(p, O, g);
      return;
    }
    if (m !== 2 && P & 1 && W)
      if (m === 0)
        W.beforeEnter(S), o(S, O, g), xt(() => W.enter(S), k);
      else {
        const { leave: ie, delayLeave: ue, afterLeave: de } = W, Ce = () => o(S, O, g), Pe = () => {
          ie(S, () => {
            Ce(), de && de();
          });
        };
        ue ? ue(S, Ce, Pe) : Pe();
      }
    else
      o(S, O, g);
  }, le = (p, O, g, m = !1, k = !1) => {
    const {
      type: S,
      props: j,
      ref: W,
      children: Z,
      dynamicChildren: P,
      shapeFlag: re,
      patchFlag: ie,
      dirs: ue,
      cacheIndex: de
    } = p;
    if (ie === -2 && (k = !1), W != null && Zs(W, null, g, p, !0), de != null && (O.renderCache[de] = void 0), re & 256) {
      O.ctx.deactivate(p);
      return;
    }
    const Ce = re & 1 && ue, Pe = !yo(p);
    let Ne;
    if (Pe && (Ne = j && j.onVnodeBeforeUnmount) && Xt(Ne, O, p), re & 6)
      be(p.component, g, m);
    else {
      if (re & 128) {
        p.suspense.unmount(g, m);
        return;
      }
      Ce && Un(p, null, O, "beforeUnmount"), re & 64 ? p.type.remove(
        p,
        O,
        g,
        ke,
        m
      ) : P && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !P.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (S !== _e || ie > 0 && ie & 64) ? se(
        P,
        O,
        g,
        !1,
        !0
      ) : (S === _e && ie & 384 || !k && re & 16) && se(Z, O, g), m && he(p);
    }
    (Pe && (Ne = j && j.onVnodeUnmounted) || Ce) && xt(() => {
      Ne && Xt(Ne, O, p), Ce && Un(p, null, O, "unmounted");
    }, g);
  }, he = (p) => {
    const { type: O, el: g, anchor: m, transition: k } = p;
    if (O === _e) {
      pe(g, m);
      return;
    }
    if (O === Yi) {
      _(p);
      return;
    }
    const S = () => {
      s(g), k && !k.persisted && k.afterLeave && k.afterLeave();
    };
    if (p.shapeFlag & 1 && k && !k.persisted) {
      const { leave: j, delayLeave: W } = k, Z = () => j(g, S);
      W ? W(p.el, S, Z) : Z();
    } else
      S();
  }, pe = (p, O) => {
    let g;
    for (; p !== O; )
      g = h(p), s(p), p = g;
    s(O);
  }, be = (p, O, g) => {
    const { bum: m, scope: k, job: S, subTree: j, um: W, m: Z, a: P } = p;
    Wa(Z), Wa(P), m && Rs(m), k.stop(), S && (S.flags |= 8, le(j, p, O, g)), W && xt(W, O), xt(() => {
      p.isUnmounted = !0;
    }, O), O && O.pendingBranch && !O.isUnmounted && p.asyncDep && !p.asyncResolved && p.suspenseId === O.pendingId && (O.deps--, O.deps === 0 && O.resolve());
  }, se = (p, O, g, m = !1, k = !1, S = 0) => {
    for (let j = S; j < p.length; j++)
      le(p[j], O, g, m, k);
  }, xe = (p) => {
    if (p.shapeFlag & 6)
      return xe(p.component.subTree);
    if (p.shapeFlag & 128)
      return p.suspense.next();
    const O = h(p.anchor || p.el), g = O && O[ad];
    return g ? h(g) : O;
  };
  let $e = !1;
  const Ee = (p, O, g) => {
    p == null ? O._vnode && le(O._vnode, null, null, !0) : x(
      O._vnode || null,
      p,
      O,
      null,
      null,
      null,
      g
    ), O._vnode = p, $e || ($e = !0, Fa(), id(), $e = !1);
  }, ke = {
    p: x,
    um: le,
    m: fe,
    r: he,
    mt: $,
    mc: B,
    pc: q,
    pbc: L,
    n: xe,
    o: e
  };
  return {
    render: Ee,
    hydrate: void 0,
    createApp: Jh(Ee)
  };
}
function qi({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function jn({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function lv(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function pl(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (Se(o) && Se(s))
    for (let i = 0; i < o.length; i++) {
      const r = o[i];
      let l = s[i];
      l.shapeFlag & 1 && !l.dynamicChildren && ((l.patchFlag <= 0 || l.patchFlag === 32) && (l = s[i] = Sn(s[i]), l.el = r.el), !n && l.patchFlag !== -2 && pl(r, l)), l.type === wi && (l.el = r.el);
    }
}
function av(e) {
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
function Dd(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Dd(t);
}
function Wa(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const uv = Symbol.for("v-scx"), cv = () => Qt(uv);
function Me(e, t, n) {
  return Rd(e, t, n);
}
function Rd(e, t, n = je) {
  const { immediate: o, deep: s, flush: i, once: r } = n, l = wt({}, n), a = t && o || !t && i !== "post";
  let c;
  if (ns) {
    if (i === "sync") {
      const v = cv();
      c = v.__watcherHandles || (v.__watcherHandles = []);
    } else if (!a) {
      const v = () => {
      };
      return v.stop = Jt, v.resume = Jt, v.pause = Jt, v;
    }
  }
  const d = pt;
  l.call = (v, w, x) => tn(v, d, w, x);
  let f = !1;
  i === "post" ? l.scheduler = (v) => {
    xt(v, d && d.suspense);
  } : i !== "sync" && (f = !0, l.scheduler = (v, w) => {
    w ? v() : cl(v);
  }), l.augmentJob = (v) => {
    t && (v.flags |= 4), f && (v.flags |= 2, d && (v.id = d.uid, v.i = d));
  };
  const h = $h(e, t, l);
  return ns && (c ? c.push(h) : a && h()), h;
}
function dv(e, t, n) {
  const o = this.proxy, s = Ke(e) ? e.includes(".") ? Ld(o, e) : () => o[e] : e.bind(o, o);
  let i;
  Ie(t) ? i = t : (i = t.handler, n = t);
  const r = vs(this), l = Rd(s, i.bind(o), n);
  return r(), l;
}
function Ld(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
const fv = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Lt(t)}Modifiers`] || e[`${zn(t)}Modifiers`];
function pv(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || je;
  let s = n;
  const i = t.startsWith("update:"), r = i && fv(o, t.slice(7));
  r && (r.trim && (s = n.map((d) => Ke(d) ? d.trim() : d)), r.number && (s = n.map(qs)));
  let l, a = o[l = zi(t)] || // also try camelCase event handler (#2249)
  o[l = zi(Lt(t))];
  !a && i && (a = o[l = zi(zn(t))]), a && tn(
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
    e.emitted[l] = !0, tn(
      c,
      e,
      6,
      s
    );
  }
}
function Vd(e, t, n = !1) {
  const o = t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const i = e.emits;
  let r = {}, l = !1;
  if (!Ie(e)) {
    const a = (c) => {
      const d = Vd(c, t, !0);
      d && (l = !0, wt(r, d));
    };
    !n && t.mixins.length && t.mixins.forEach(a), e.extends && a(e.extends), e.mixins && e.mixins.forEach(a);
  }
  return !i && !l ? (Ge(e) && o.set(e, null), null) : (Se(i) ? i.forEach((a) => r[a] = null) : wt(r, i), Ge(e) && o.set(e, r), r);
}
function _i(e, t) {
  return !e || !di(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), He(e, t[0].toLowerCase() + t.slice(1)) || He(e, zn(t)) || He(e, t));
}
function Za(e) {
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
  } = e, I = Ws(e);
  let N, D;
  try {
    if (n.shapeFlag & 4) {
      const _ = s || o, R = _;
      N = Zt(
        c.call(
          R,
          _,
          d,
          f,
          v,
          h,
          w
        )
      ), D = l;
    } else {
      const _ = t;
      N = Zt(
        _.length > 1 ? _(
          f,
          { attrs: l, slots: r, emit: a }
        ) : _(
          f,
          null
        )
      ), D = t.props ? l : hv(l);
    }
  } catch (_) {
    Xo.length = 0, mi(_, e, 1), N = ne(Ln);
  }
  let y = N;
  if (D && x !== !1) {
    const _ = Object.keys(D), { shapeFlag: R } = y;
    _.length && R & 7 && (i && _.some(Jr) && (D = vv(
      D,
      i
    )), y = xo(y, D, !1, !0));
  }
  return n.dirs && (y = xo(y, null, !1, !0), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && dl(y, n.transition), N = y, Ws(I), N;
}
const hv = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || di(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, vv = (e, t) => {
  const n = {};
  for (const o in e)
    (!Jr(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
};
function gv(e, t, n) {
  const { props: o, children: s, component: i } = e, { props: r, children: l, patchFlag: a } = t, c = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && a >= 0) {
    if (a & 1024)
      return !0;
    if (a & 16)
      return o ? Ja(o, r, c) : !!r;
    if (a & 8) {
      const d = t.dynamicProps;
      for (let f = 0; f < d.length; f++) {
        const h = d[f];
        if (r[h] !== o[h] && !_i(c, h))
          return !0;
      }
    }
  } else
    return (s || l) && (!l || !l.$stable) ? !0 : o === r ? !1 : o ? r ? Ja(o, r, c) : !0 : !!r;
  return !1;
}
function Ja(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const i = o[s];
    if (t[i] !== e[i] && !_i(n, i))
      return !0;
  }
  return !1;
}
function mv({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const zd = (e) => e.__isSuspense;
function yv(e, t) {
  t && t.pendingBranch ? Se(e) ? t.effects.push(...e) : t.effects.push(e) : Th(e);
}
const _e = Symbol.for("v-fgt"), wi = Symbol.for("v-txt"), Ln = Symbol.for("v-cmt"), Yi = Symbol.for("v-stc"), Xo = [];
let $t = null;
function E(e = !1) {
  Xo.push($t = e ? null : []);
}
function bv() {
  Xo.pop(), $t = Xo[Xo.length - 1] || null;
}
let Eo = 1;
function Qa(e, t = !1) {
  Eo += e, e < 0 && $t && t && ($t.hasOnce = !0);
}
function Fd(e) {
  return e.dynamicChildren = Eo > 0 ? $t || ho : null, bv(), Eo > 0 && $t && $t.push(e), e;
}
function C(e, t, n, o, s, i) {
  return Fd(
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
function lt(e, t, n, o, s) {
  return Fd(
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
function ts(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Ao(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Bd = ({ key: e }) => e ?? null, zs = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? Ke(e) || tt(e) || Ie(e) ? { i: dt, r: e, k: t, f: !!n } : e : null);
function u(e, t = null, n = null, o = 0, s = null, i = e === _e ? 0 : 1, r = !1, l = !1) {
  const a = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Bd(t),
    ref: t && zs(t),
    scopeId: ld,
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
    ctx: dt
  };
  return l ? (hl(a, n), i & 128 && e.normalize(a)) : n && (a.shapeFlag |= Ke(n) ? 8 : 16), Eo > 0 && // avoid a block node from tracking itself
  !r && // has current parent block
  $t && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (a.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  a.patchFlag !== 32 && $t.push(a), a;
}
const ne = _v;
function _v(e, t = null, n = null, o = 0, s = null, i = !1) {
  if ((!e || e === md) && (e = Ln), ts(e)) {
    const l = xo(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && hl(l, n), Eo > 0 && !i && $t && (l.shapeFlag & 6 ? $t[$t.indexOf(e)] = l : $t.push(l)), l.patchFlag = -2, l;
  }
  if (Iv(e) && (e = e.__vccOpts), t) {
    t = Fs(t);
    let { class: l, style: a } = t;
    l && !Ke(l) && (t.class = ge(l)), Ge(a) && (ul(a) && !Se(a) && (a = wt({}, a)), t.style = Ye(a));
  }
  const r = Ke(e) ? 1 : zd(e) ? 128 : Mh(e) ? 64 : Ge(e) ? 4 : Ie(e) ? 2 : 0;
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
function Fs(e) {
  return e ? ul(e) || Id(e) ? wt({}, e) : e : null;
}
function xo(e, t, n = !1, o = !1) {
  const { props: s, ref: i, patchFlag: r, children: l, transition: a } = e, c = t ? vl(s || {}, t) : s, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Bd(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? Se(i) ? i.concat(zs(t)) : [i, zs(t)] : zs(t)
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
    patchFlag: t && e.type !== _e ? r === -1 ? 16 : r | 16 : r,
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
    ssContent: e.ssContent && xo(e.ssContent),
    ssFallback: e.ssFallback && xo(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return a && o && dl(
    d,
    a.clone(d)
  ), d;
}
function me(e = " ", t = 0) {
  return ne(wi, null, e, t);
}
function oe(e = "", t = !1) {
  return t ? (E(), lt(Ln, null, e)) : ne(Ln, null, e);
}
function Zt(e) {
  return e == null || typeof e == "boolean" ? ne(Ln) : Se(e) ? ne(
    _e,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : ts(e) ? Sn(e) : ne(wi, null, String(e));
}
function Sn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : xo(e);
}
function hl(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (Se(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), hl(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !Id(t) ? t._ctx = dt : s === 3 && dt && (dt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Ie(t) ? (t = { default: t, _ctx: dt }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [me(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function vl(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = ge([t.class, o.class]));
      else if (s === "style")
        t.style = Ye([t.style, o.style]);
      else if (di(s)) {
        const i = t[s], r = o[s];
        r && i !== r && !(Se(i) && i.includes(r)) && (t[s] = i ? [].concat(i, r) : r);
      } else s !== "" && (t[s] = o[s]);
  }
  return t;
}
function Xt(e, t, n, o = null) {
  tn(e, t, 7, [
    n,
    o
  ]);
}
const wv = Sd();
let kv = 0;
function Ev(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || wv, i = {
    uid: kv++,
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
    scope: new zc(
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
    propsOptions: Td(o, s),
    emitsOptions: Vd(o, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: je,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: je,
    data: je,
    props: je,
    attrs: je,
    slots: je,
    refs: je,
    setupState: je,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = pv.bind(null, i), e.ce && e.ce(i), i;
}
let pt = null;
const To = () => pt || dt;
let Qs, Cr;
{
  const e = hi(), t = (n, o) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(o), (i) => {
      s.length > 1 ? s.forEach((r) => r(i)) : s[0](i);
    };
  };
  Qs = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => pt = n
  ), Cr = t(
    "__VUE_SSR_SETTERS__",
    (n) => ns = n
  );
}
const vs = (e) => {
  const t = pt;
  return Qs(e), e.scope.on(), () => {
    e.scope.off(), Qs(t);
  };
}, eu = () => {
  pt && pt.scope.off(), Qs(null);
};
function Hd(e) {
  return e.vnode.shapeFlag & 4;
}
let ns = !1;
function xv(e, t = !1, n = !1) {
  t && Cr(t);
  const { props: o, children: s } = e.vnode, i = Hd(e);
  Qh(e, o, i, t), ov(e, s, n);
  const r = i ? Sv(e, t) : void 0;
  return t && Cr(!1), r;
}
function Sv(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Uh);
  const { setup: o } = n;
  if (o) {
    Fn();
    const s = e.setupContext = o.length > 1 ? jd(e) : null, i = vs(e), r = hs(
      o,
      e,
      0,
      [
        e.props,
        s
      ]
    ), l = Oc(r);
    if (Bn(), i(), (l || e.sp) && !yo(e) && dd(e), l) {
      if (r.then(eu, eu), t)
        return r.then((a) => {
          tu(e, a);
        }).catch((a) => {
          mi(a, e, 0);
        });
      e.asyncDep = r;
    } else
      tu(e, r);
  } else
    Ud(e);
}
function tu(e, t, n) {
  Ie(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Ge(t) && (e.setupState = td(t)), Ud(e);
}
function Ud(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || Jt);
  {
    const s = vs(e);
    Fn();
    try {
      qh(e);
    } finally {
      Bn(), s();
    }
  }
}
const Cv = {
  get(e, t) {
    return bt(e, "get", ""), e[t];
  }
};
function jd(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Cv),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function ki(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(td(Zn(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in Yo)
        return Yo[n](e);
    },
    has(t, n) {
      return n in t || n in Yo;
    }
  })) : e.proxy;
}
function $v(e, t = !0) {
  return Ie(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Iv(e) {
  return Ie(e) && "__vccOpts" in e;
}
const ae = (e, t) => Sh(e, t, ns);
function Be(e, t, n) {
  const o = arguments.length;
  return o === 2 ? Ge(t) && !Se(t) ? ts(t) ? ne(e, null, [t]) : ne(e, t) : ne(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : o === 3 && ts(n) && (n = [n]), ne(e, t, n));
}
function Nv(e, t) {
  const n = e.memo;
  if (n.length != t.length)
    return !1;
  for (let o = 0; o < n.length; o++)
    if (pn(n[o], t[o]))
      return !1;
  return Eo > 0 && $t && $t.push(e), !0;
}
const Tv = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let $r;
const nu = typeof window < "u" && window.trustedTypes;
if (nu)
  try {
    $r = /* @__PURE__ */ nu.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Gd = $r ? (e) => $r.createHTML(e) : (e) => e, Mv = "http://www.w3.org/2000/svg", Ov = "http://www.w3.org/1998/Math/MathML", ln = typeof document < "u" ? document : null, ou = ln && /* @__PURE__ */ ln.createElement("template"), Pv = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t === "svg" ? ln.createElementNS(Mv, e) : t === "mathml" ? ln.createElementNS(Ov, e) : n ? ln.createElement(e, { is: n }) : ln.createElement(e);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => ln.createTextNode(e),
  createComment: (e) => ln.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => ln.querySelector(e),
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
      ou.innerHTML = Gd(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const l = ou.content;
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
}, Av = Symbol("_vtc");
function Dv(e, t, n) {
  const o = e[Av];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const su = Symbol("_vod"), Rv = Symbol("_vsh"), Lv = Symbol(""), Vv = /(^|;)\s*display\s*:/;
function zv(e, t, n) {
  const o = e.style, s = Ke(n);
  let i = !1;
  if (n && !s) {
    if (t)
      if (Ke(t))
        for (const r of t.split(";")) {
          const l = r.slice(0, r.indexOf(":")).trim();
          n[l] == null && Bs(o, l, "");
        }
      else
        for (const r in t)
          n[r] == null && Bs(o, r, "");
    for (const r in n)
      r === "display" && (i = !0), Bs(o, r, n[r]);
  } else if (s) {
    if (t !== n) {
      const r = o[Lv];
      r && (n += ";" + r), o.cssText = n, i = Vv.test(n);
    }
  } else t && e.removeAttribute("style");
  su in e && (e[su] = i ? o.display : "", e[Rv] && (o.display = "none"));
}
const iu = /\s*!important$/;
function Bs(e, t, n) {
  if (Se(n))
    n.forEach((o) => Bs(e, t, o));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Fv(e, t);
    iu.test(n) ? e.setProperty(
      zn(o),
      n.replace(iu, ""),
      "important"
    ) : e[o] = n;
  }
}
const ru = ["Webkit", "Moz", "ms"], Xi = {};
function Fv(e, t) {
  const n = Xi[t];
  if (n)
    return n;
  let o = Lt(t);
  if (o !== "filter" && o in e)
    return Xi[t] = o;
  o = pi(o);
  for (let s = 0; s < ru.length; s++) {
    const i = ru[s] + o;
    if (i in e)
      return Xi[t] = i;
  }
  return t;
}
const lu = "http://www.w3.org/1999/xlink";
function au(e, t, n, o, s, i = Xp(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(lu, t.slice(6, t.length)) : e.setAttributeNS(lu, t, n) : n == null || i && !Rc(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : Gt(n) ? String(n) : n
  );
}
function uu(e, t, n, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Gd(n) : n);
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
    l === "boolean" ? n = Rc(n) : n == null && l === "string" ? (n = "", r = !0) : l === "number" && (n = 0, r = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  r && e.removeAttribute(s || t);
}
function In(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Bv(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const cu = Symbol("_vei");
function Hv(e, t, n, o, s = null) {
  const i = e[cu] || (e[cu] = {}), r = i[t];
  if (o && r)
    r.value = o;
  else {
    const [l, a] = Uv(t);
    if (o) {
      const c = i[t] = qv(
        o,
        s
      );
      In(e, l, c, a);
    } else r && (Bv(e, l, r, a), i[t] = void 0);
  }
}
const du = /(?:Once|Passive|Capture)$/;
function Uv(e) {
  let t;
  if (du.test(e)) {
    t = {};
    let o;
    for (; o = e.match(du); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : zn(e.slice(2)), t];
}
let Ki = 0;
const jv = /* @__PURE__ */ Promise.resolve(), Gv = () => Ki || (jv.then(() => Ki = 0), Ki = Date.now());
function qv(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    tn(
      Yv(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = Gv(), n;
}
function Yv(e, t) {
  if (Se(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (o) => (s) => !s._stopped && o && o(s)
    );
  } else
    return t;
}
const fu = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, Xv = (e, t, n, o, s, i) => {
  const r = s === "svg";
  t === "class" ? Dv(e, o, r) : t === "style" ? zv(e, n, o) : di(t) ? Jr(t) || Hv(e, t, n, o, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : Kv(e, t, o, r)) ? (uu(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && au(e, t, o, r, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !Ke(o)) ? uu(e, Lt(t), o, i, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), au(e, t, o, r));
};
function Kv(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && fu(t) && Ie(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return fu(t) && Ke(n) ? !1 : t in e;
}
const So = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return Se(t) ? (n) => Rs(t, n) : t;
};
function Wv(e) {
  e.target.composing = !0;
}
function pu(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const hn = Symbol("_assign"), Fe = {
  created(e, { modifiers: { lazy: t, trim: n, number: o } }, s) {
    e[hn] = So(s);
    const i = o || s.props && s.props.type === "number";
    In(e, t ? "change" : "input", (r) => {
      if (r.target.composing) return;
      let l = e.value;
      n && (l = l.trim()), i && (l = qs(l)), e[hn](l);
    }), n && In(e, "change", () => {
      e.value = e.value.trim();
    }), t || (In(e, "compositionstart", Wv), In(e, "compositionend", pu), In(e, "change", pu));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: o, trim: s, number: i } }, r) {
    if (e[hn] = So(r), e.composing) return;
    const l = (i || e.type === "number") && !/^0\d/.test(e.value) ? qs(e.value) : e.value, a = t ?? "";
    l !== a && (document.activeElement === e && e.type !== "range" && (o && t === n || s && e.value.trim() === a) || (e.value = a));
  }
}, qd = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[hn] = So(n), In(e, "change", () => {
      const o = e._modelValue, s = os(e), i = e.checked, r = e[hn];
      if (Se(o)) {
        const l = tl(o, s), a = l !== -1;
        if (i && !a)
          r(o.concat(s));
        else if (!i && a) {
          const c = [...o];
          c.splice(l, 1), r(c);
        }
      } else if (No(o)) {
        const l = new Set(o);
        i ? l.add(s) : l.delete(s), r(l);
      } else
        r(Yd(e, i));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: hu,
  beforeUpdate(e, t, n) {
    e[hn] = So(n), hu(e, t, n);
  }
};
function hu(e, { value: t, oldValue: n }, o) {
  e._modelValue = t;
  let s;
  if (Se(t))
    s = tl(t, o.props.value) > -1;
  else if (No(t))
    s = t.has(o.props.value);
  else {
    if (t === n) return;
    s = ps(t, Yd(e, !0));
  }
  e.checked !== s && (e.checked = s);
}
const vn = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, o) {
    const s = No(t);
    In(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (r) => r.selected).map(
        (r) => n ? qs(os(r)) : os(r)
      );
      e[hn](
        e.multiple ? s ? new Set(i) : i : i[0]
      ), e._assigning = !0, ft(() => {
        e._assigning = !1;
      });
    }), e[hn] = So(o);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    vu(e, t);
  },
  beforeUpdate(e, t, n) {
    e[hn] = So(n);
  },
  updated(e, { value: t }) {
    e._assigning || vu(e, t);
  }
};
function vu(e, t) {
  const n = e.multiple, o = Se(t);
  if (!(n && !o && !No(t))) {
    for (let s = 0, i = e.options.length; s < i; s++) {
      const r = e.options[s], l = os(r);
      if (n)
        if (o) {
          const a = typeof l;
          a === "string" || a === "number" ? r.selected = t.some((c) => String(c) === String(l)) : r.selected = tl(t, l) > -1;
        } else
          r.selected = t.has(l);
      else if (ps(os(r), t)) {
        e.selectedIndex !== s && (e.selectedIndex = s);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function os(e) {
  return "_value" in e ? e._value : e.value;
}
function Yd(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const Zv = ["ctrl", "shift", "alt", "meta"], Jv = {
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
  exact: (e, t) => Zv.some((n) => e[`${n}Key`] && !t.includes(n))
}, yt = (e, t) => {
  const n = e._withMods || (e._withMods = {}), o = t.join(".");
  return n[o] || (n[o] = (s, ...i) => {
    for (let r = 0; r < t.length; r++) {
      const l = Jv[t[r]];
      if (l && l(s, t)) return;
    }
    return e(s, ...i);
  });
}, Qv = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, gu = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), o = t.join(".");
  return n[o] || (n[o] = (s) => {
    if (!("key" in s))
      return;
    const i = zn(s.key);
    if (t.some(
      (r) => r === i || Qv[r] === i
    ))
      return e(s);
  });
}, eg = /* @__PURE__ */ wt({ patchProp: Xv }, Pv);
let mu;
function tg() {
  return mu || (mu = iv(eg));
}
const gs = (...e) => {
  const t = tg().createApp(...e), { mount: n } = t;
  return t.mount = (o) => {
    const s = og(o);
    if (!s) return;
    const i = t._component;
    !Ie(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const r = n(s, !1, ng(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), r;
  }, t;
};
function ng(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function og(e) {
  return Ke(e) ? document.querySelector(e) : e;
}
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const sg = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Ss = {
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
const ig = ({ size: e, strokeWidth: t = 2, absoluteStrokeWidth: n, color: o, iconNode: s, name: i, class: r, ...l }, { slots: a }) => Be(
  "svg",
  {
    ...Ss,
    width: e || Ss.width,
    height: e || Ss.height,
    stroke: o || Ss.stroke,
    "stroke-width": n ? Number(t) * 24 / Number(e) : t,
    class: ["lucide", `lucide-${sg(i ?? "icon")}`],
    ...l
  },
  [...s.map((c) => Be(...c)), ...a.default ? [a.default()] : []]
);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ae = (e, t) => (n, { slots: o }) => Be(
  ig,
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
const rg = Ae("ArchiveIcon", [
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
const lg = Ae("BotIcon", [
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
const ag = Ae("BrainIcon", [
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
const ug = Ae("ChartColumnIcon", [
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
const Jn = Ae("CheckIcon", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cg = Ae("ChevronDownIcon", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dg = Ae("Clock3Icon", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16.5 12", key: "1aq6pp" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const fg = Ae("DatabaseIcon", [
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
const po = Ae("DownloadIcon", [
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
const Ir = Ae("ExternalLinkIcon", [
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
const yu = Ae("EyeIcon", [
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
const Ko = Ae("FolderOpenIcon", [
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
const Xd = Ae("GitBranchIcon", [
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
const pg = Ae("LayersIcon", [
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
const hg = Ae("Maximize2Icon", [
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
const vg = Ae("MicVocalIcon", [
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
const gg = Ae("MinusIcon", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Kd = Ae("PenLineIcon", [
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
const Wd = Ae("PlayIcon", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mg = Ae("PlugIcon", [
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
const ss = Ae("PlusIcon", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yg = Ae("PuzzleIcon", [
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
const Dt = Ae("RefreshCwIcon", [
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
const gl = Ae("RotateCcwIcon", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Nr = Ae("SaveIcon", [
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
const bg = Ae("ScanFaceIcon", [
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
const _g = Ae("ScanSearchIcon", [
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
const Tr = Ae("SearchIcon", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const wg = Ae("SendIcon", [
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
const uo = Ae("SettingsIcon", [
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
const kg = Ae("ShieldCheckIcon", [
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
const gn = Ae("Trash2Icon", [
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
const Eg = Ae("Undo2Icon", [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mr = Ae("UploadIcon", [
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
const Or = Ae("UserRoundIcon", [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xg = Ae("WrenchIcon", [
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
const Bt = Ae("XIcon", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]), Sg = /* @__PURE__ */ new Set(["converting", "preview_ready", "indexing"]);
function Cg(e) {
  let t = 0, n = 0, o = 0;
  for (const s of e) {
    const i = String(s.status || "");
    i === "indexed" ? t += 1 : i.endsWith("_failed") || ["failed", "error"].includes(i) ? o += 1 : Sg.has(i) && i !== "preview_ready" && (n += 1);
  }
  return { total: e.length, indexed: t, processing: n, failed: o, attention: n + o };
}
function $g(e) {
  if (Array.isArray(e)) return e;
  if (!e || typeof e != "object") return [];
  const t = e;
  for (const n of ["items", "evaluations", "results"])
    if (Array.isArray(t[n])) return t[n];
  return [e];
}
function Ig(e) {
  const t = Number(e);
  return Number.isFinite(t) ? `${Math.round(t <= 1 ? t * 100 : t)}%` : "—";
}
function Ng(e) {
  const t = Number(e == null ? void 0 : e.total_documents), n = Number((e == null ? void 0 : e.indexed_count) ?? (e == null ? void 0 : e.indexed_documents)), o = Number((e == null ? void 0 : e.failed_count) ?? (e == null ? void 0 : e.failed_documents)), s = Number((e == null ? void 0 : e.in_progress_count) ?? (e == null ? void 0 : e.processing_documents)), i = String((e == null ? void 0 : e.status) || (e == null ? void 0 : e.state) || "");
  return ["ready", "completed", "complete", "healthy"].includes(i) ? "处理完成" : ["running", "processing", "pending", "indexing"].includes(i) ? "处理中" : ["failed", "error"].includes(i) || Number.isFinite(o) && o > 0 ? "需要处理" : Number.isFinite(s) && s > 0 ? "处理中" : Number.isFinite(t) && t > 0 && Number.isFinite(n) && n >= t ? "处理完成" : Number.isFinite(t) && t === 0 ? "暂无资料" : e ? "已生成" : "暂无报告";
}
function Tg(e) {
  return { completed: "已完成", complete: "已完成", running: "进行中", pending: "等待中", failed: "失败", error: "失败" }[e || ""] || e || "已保存";
}
function rt(e) {
  return JSON.parse(JSON.stringify(e));
}
class ml extends Error {
  constructor(n, o) {
    super(n);
    Qe(this, "status");
    this.name = "ApiError", this.status = o;
  }
}
async function et(e, t) {
  const n = await fetch(e, t), o = await n.json().catch(() => null);
  if (!n.ok) throw new ml((o == null ? void 0 : o.detail) || `请求失败 (${n.status})`, n.status);
  return o;
}
async function Zd(e, t) {
  try {
    return await et(e, t);
  } catch (n) {
    if (n instanceof ml && n.status === 404) return null;
    throw n;
  }
}
function Wi() {
  return et("/api/personas", { cache: "no-store" });
}
function Jd(e) {
  return et(`/api/personas/${encodeURIComponent(e)}/documents`, { cache: "no-store" });
}
async function Qd() {
  return (await et("/api/live2d/models", { cache: "no-store" })).models;
}
async function Mg() {
  await et("/api/live2d/model-directory", {
    method: "POST",
    headers: { "X-CHARACTOID-Request": "web" }
  });
}
async function bu(e) {
  const [t, n, o, s, i, r] = await Promise.all([
    et(`/api/personas/${encodeURIComponent(e.id)}/capabilities`, { cache: "no-store" }),
    et(`/api/personas/${encodeURIComponent(e.id)}/mcp-grants`, { cache: "no-store" }),
    Jd(e.id),
    et("/api/mcp/servers", { cache: "no-store" }).catch(() => []),
    Qd().then((a) => ({ models: a })).catch(() => ({ models: [] })),
    et("/api/voice-assets", { cache: "no-store" }).catch(() => ({ items: [] }))
  ]), l = new Map(s.map((a) => [a.name, a.status]));
  return {
    persona: rt(e),
    documents: o,
    capabilities: t,
    grants: { servers: n.servers.map((a) => ({ ...a, status: l.get(a.name) || { status: a.enabled ? "unknown" : "disabled" } })) },
    resources: { live2dModels: i.models, voiceAssets: r.items.filter((a) => a.status === "ready" && (!a.engine || a.engine === "gpt_sovits")) }
  };
}
async function Og(e) {
  await et(`/api/personas/${encodeURIComponent(e.id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: e.name, profile: e.profile || {} })
  });
}
async function Pg(e, t) {
  await et(`/api/personas/${encodeURIComponent(e)}/capabilities`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ overrides: t })
  });
}
async function Ag(e, t) {
  const n = t.filter((o) => o.authorized && !o.global).map((o) => o.name);
  await et(`/api/personas/${encodeURIComponent(e)}/mcp-grants`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ server_names: n })
  });
}
async function Dg(e) {
  await et(`/api/personas/${encodeURIComponent(e)}`, { method: "DELETE" });
}
async function Rg(e, t, n) {
  if (!e.knowledge_space_id) throw new Error("角色知识空间不可用");
  const o = new FormData();
  t.forEach((i) => o.append("files", i)), n.trim() && o.append("files", new File([n.trim()], `text-${Date.now()}.txt`, { type: "text/plain;charset=utf-8" }));
  const s = await et(`/api/knowledge-spaces/${encodeURIComponent(e.knowledge_space_id)}/documents/upload`, { method: "POST", body: o });
  await Promise.all(s.map((i) => et(`/api/documents/${encodeURIComponent(i.id)}/confirm`, { method: "POST" })));
}
async function Lg(e) {
  var n;
  const t = await fetch(`/api/documents/${encodeURIComponent(e)}`, { method: "DELETE" });
  if (!t.ok) throw new Error(((n = await t.json().catch(() => null)) == null ? void 0 : n.detail) || `删除失败 (${t.status})`);
}
async function Vg(e) {
  await et(`/api/documents/${encodeURIComponent(e)}/retry-index`, { method: "POST" });
}
async function zg(e, t) {
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
function Fg(e) {
  return et(`/api/personas/${encodeURIComponent(e)}/versions`, { cache: "no-store" });
}
function Bg(e, t) {
  return et(`/api/personas/${encodeURIComponent(e)}/versions/${encodeURIComponent(t)}`, { cache: "no-store" });
}
function Hg(e, t = {}) {
  return et(`/api/personas/${encodeURIComponent(e)}/versions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ label: t.label || "", note: t.note || "" })
  });
}
async function Ug(e, t) {
  return (await et(
    `/api/personas/${encodeURIComponent(e)}/versions/${encodeURIComponent(t)}/publish`,
    { method: "POST" }
  )).version;
}
async function jg(e, t) {
  return (await et(
    `/api/personas/${encodeURIComponent(e)}/versions/${encodeURIComponent(t)}/rollback`,
    { method: "POST" }
  )).version;
}
async function Gg(e) {
  return Zd(
    `/api/knowledge-spaces/${encodeURIComponent(e)}/documents/report`,
    { cache: "no-store" }
  );
}
async function qg(e, t = 1) {
  const n = await Zd(
    `/api/eval/history?persona_id=${encodeURIComponent(e)}&limit=${encodeURIComponent(String(t))}`,
    { cache: "no-store" }
  );
  return $g(n);
}
const Yg = [
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
function Xg(e) {
  return ["available", "partial", "unassigned", "blocked", "pending", "error"].includes(e) ? e : "blocked";
}
function Do(e, t, n) {
  return { id: e, type: t, position: { x: 0, y: 0 }, data: n };
}
function Kg(e) {
  var i, r;
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), o = `persona:${e.persona.id}`, s = "module:extensions";
  t.set(o, Do(o, "persona", { kind: "persona", label: e.persona.name, summary: String(((i = e.persona.profile) == null ? void 0 : i.description) || "尚未填写人设"), status: "available", level: 0 }));
  for (const l of Yg) {
    const a = `module:${l.id}`;
    t.set(a, Do(a, "module", { kind: l.id, label: l.label, summary: l.summary(e), status: "available", level: 0 }));
    const c = l.id === "extensions";
    n.set(`${o}->${a}`, { id: `${o}->${a}`, source: o, target: a, sourceHandle: c ? "right-source" : "left-source", targetHandle: c ? "left-target" : "right-target" });
  }
  for (const l of e.capabilities.packages) {
    const a = l.kind === "skill" ? "skill" : "tool", c = e.capabilities.overrides[l.id], d = c === void 0 ? l.assigned : c, f = c === !1 ? "blocked" : c === !0 && l.status === "unassigned" ? "available" : l.status;
    t.set(l.id, Do(l.id, "capability", {
      kind: a,
      label: l.name,
      summary: l.description || l.reason || "能力包",
      status: Xg(f),
      level: l.level,
      assigned: d,
      configurable: !0,
      sourceId: l.id
    })), n.set(`${s}->${l.id}`, { id: `${s}->${l.id}`, source: s, target: l.id, sourceHandle: "right-source", targetHandle: "left-target" });
    for (const h of l.dependencies || []) {
      if (!h.id) continue;
      const v = e.capabilities.overrides[h.id], w = v === void 0 ? h.effective : v;
      if (t.set(h.id, Do(h.id, "capability", {
        kind: "tool",
        label: h.name,
        summary: h.server ? `MCP · ${h.server}` : h.source,
        status: w ? "available" : "blocked",
        level: h.level,
        assigned: w,
        configurable: !1,
        sourceId: h.id
      })), n.set(`${l.id}->${h.id}`, { id: `${l.id}->${h.id}`, source: l.id, target: h.id, sourceHandle: "right-source", targetHandle: "left-target" }), h.server) {
        const x = `mcp:${h.server}`, I = e.grants.servers.find((D) => D.name === h.server), N = ((r = I == null ? void 0 : I.status) == null ? void 0 : r.status) === "connected";
        t.set(x, Do(x, "capability", {
          kind: "mcp",
          label: h.server,
          summary: (I == null ? void 0 : I.description) || "MCP 服务",
          status: I != null && I.authorized && N ? "available" : "blocked",
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
function Wg(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Zg = "\0", Gn = "\0", _u = "";
let Jg = class {
  constructor(t) {
    Qe(this, "_isDirected", !0);
    Qe(this, "_isMultigraph", !1);
    Qe(this, "_isCompound", !1);
    // Label for the graph itself
    Qe(this, "_label");
    // Defaults to be set when creating a new node
    Qe(this, "_defaultNodeLabelFn", () => {
    });
    // Defaults to be set when creating a new edge
    Qe(this, "_defaultEdgeLabelFn", () => {
    });
    // v -> label
    Qe(this, "_nodes", {});
    // v -> edgeObj
    Qe(this, "_in", {});
    // u -> v -> Number
    Qe(this, "_preds", {});
    // v -> edgeObj
    Qe(this, "_out", {});
    // v -> w -> Number
    Qe(this, "_sucs", {});
    // e -> edgeObj
    Qe(this, "_edgeObjs", {});
    // e -> label
    Qe(this, "_edgeLabels", {});
    /* Number of nodes in the graph. Should only be changed by the implementation. */
    Qe(this, "_nodeCount", 0);
    /* Number of edges in the graph. Should only be changed by the implementation. */
    Qe(this, "_edgeCount", 0);
    Qe(this, "_parent");
    Qe(this, "_children");
    t && (this._isDirected = Object.hasOwn(t, "directed") ? t.directed : !0, this._isMultigraph = Object.hasOwn(t, "multigraph") ? t.multigraph : !1, this._isCompound = Object.hasOwn(t, "compound") ? t.compound : !1), this._isCompound && (this._parent = {}, this._children = {}, this._children[Gn] = {});
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
    return Object.hasOwn(this._nodes, t) ? (arguments.length > 1 && (this._nodes[t] = n), this) : (this._nodes[t] = arguments.length > 1 ? n : this._defaultNodeLabelFn(t), this._isCompound && (this._parent[t] = Gn, this._children[t] = {}, this._children[Gn][t] = !0), this._in[t] = {}, this._preds[t] = {}, this._out[t] = {}, this._sucs[t] = {}, ++this._nodeCount, this);
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
      n = Gn;
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
      if (n !== Gn)
        return n;
    }
  }
  /**
   * Gets list of direct children of node v.
   * Complexity: O(1).
   */
  children(t = Gn) {
    if (this._isCompound) {
      var n = this._children[t];
      if (n)
        return Object.keys(n);
    } else {
      if (t === Gn)
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
    var l = zo(this._isDirected, t, n, o);
    if (Object.hasOwn(this._edgeLabels, l))
      return i && (this._edgeLabels[l] = s), this;
    if (o !== void 0 && !this._isMultigraph)
      throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(t), this.setNode(n), this._edgeLabels[l] = i ? s : this._defaultEdgeLabelFn(t, n, o);
    var a = Qg(this._isDirected, t, n, o);
    return t = a.v, n = a.w, Object.freeze(a), this._edgeObjs[l] = a, wu(this._preds[n], t), wu(this._sucs[t], n), this._in[n][l] = a, this._out[t][l] = a, this._edgeCount++, this;
  }
  /**
   * Gets the label for the specified edge.
   * Complexity: O(1).
   */
  edge(t, n, o) {
    var s = arguments.length === 1 ? Zi(this._isDirected, arguments[0]) : zo(this._isDirected, t, n, o);
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
    var s = arguments.length === 1 ? Zi(this._isDirected, arguments[0]) : zo(this._isDirected, t, n, o);
    return Object.hasOwn(this._edgeLabels, s);
  }
  /**
   * Removes the specified edge from the graph. No subgraphs are considered.
   * Complexity: O(1).
   */
  removeEdge(t, n, o) {
    var s = arguments.length === 1 ? Zi(this._isDirected, arguments[0]) : zo(this._isDirected, t, n, o), i = this._edgeObjs[s];
    return i && (t = i.v, n = i.w, delete this._edgeLabels[s], delete this._edgeObjs[s], ku(this._preds[n], t), ku(this._sucs[t], n), delete this._in[n][s], delete this._out[t][s], this._edgeCount--), this;
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
function wu(e, t) {
  e[t] ? e[t]++ : e[t] = 1;
}
function ku(e, t) {
  --e[t] || delete e[t];
}
function zo(e, t, n, o) {
  var s = "" + t, i = "" + n;
  if (!e && s > i) {
    var r = s;
    s = i, i = r;
  }
  return s + _u + i + _u + (o === void 0 ? Zg : o);
}
function Qg(e, t, n, o) {
  var s = "" + t, i = "" + n;
  if (!e && s > i) {
    var r = s;
    s = i, i = r;
  }
  var l = { v: s, w: i };
  return o && (l.name = o), l;
}
function Zi(e, t) {
  return zo(e, t.v, t.w, t.name);
}
var yl = Jg, em = "2.2.4", tm = {
  Graph: yl,
  version: em
}, nm = yl, om = {
  write: sm,
  read: lm
};
function sm(e) {
  var t = {
    options: {
      directed: e.isDirected(),
      multigraph: e.isMultigraph(),
      compound: e.isCompound()
    },
    nodes: im(e),
    edges: rm(e)
  };
  return e.graph() !== void 0 && (t.value = structuredClone(e.graph())), t;
}
function im(e) {
  return e.nodes().map(function(t) {
    var n = e.node(t), o = e.parent(t), s = { v: t };
    return n !== void 0 && (s.value = n), o !== void 0 && (s.parent = o), s;
  });
}
function rm(e) {
  return e.edges().map(function(t) {
    var n = e.edge(t), o = { v: t.v, w: t.w };
    return t.name !== void 0 && (o.name = t.name), n !== void 0 && (o.value = n), o;
  });
}
function lm(e) {
  var t = new nm(e.options).setGraph(e.value);
  return e.nodes.forEach(function(n) {
    t.setNode(n.v, n.value), n.parent && t.setParent(n.v, n.parent);
  }), e.edges.forEach(function(n) {
    t.setEdge({ v: n.v, w: n.w, name: n.name }, n.value);
  }), t;
}
var am = um;
function um(e) {
  var t = {}, n = [], o;
  function s(i) {
    Object.hasOwn(t, i) || (t[i] = !0, o.push(i), e.successors(i).forEach(s), e.predecessors(i).forEach(s));
  }
  return e.nodes().forEach(function(i) {
    o = [], s(i), o.length && n.push(o);
  }), n;
}
let cm = class {
  constructor() {
    Qe(this, "_arr", []);
    Qe(this, "_keyIndices", {});
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
var ef = cm, dm = ef, tf = pm, fm = () => 1;
function pm(e, t, n, o) {
  return hm(
    e,
    String(t),
    n || fm,
    o || function(s) {
      return e.outEdges(s);
    }
  );
}
function hm(e, t, n, o) {
  var s = {}, i = new dm(), r, l, a = function(c) {
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
var vm = tf, gm = mm;
function mm(e, t, n) {
  return e.nodes().reduce(function(o, s) {
    return o[s] = vm(e, s, t, n), o;
  }, {});
}
var nf = ym;
function ym(e) {
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
var bm = nf, _m = wm;
function wm(e) {
  return bm(e).filter(function(t) {
    return t.length > 1 || t.length === 1 && e.hasEdge(t[0], t[0]);
  });
}
var km = xm, Em = () => 1;
function xm(e, t, n) {
  return Sm(
    e,
    t || Em,
    n || function(o) {
      return e.outEdges(o);
    }
  );
}
function Sm(e, t, n) {
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
function of(e) {
  var t = {}, n = {}, o = [];
  function s(i) {
    if (Object.hasOwn(n, i))
      throw new Pr();
    Object.hasOwn(t, i) || (n[i] = !0, t[i] = !0, e.predecessors(i).forEach(s), delete n[i], o.push(i));
  }
  if (e.sinks().forEach(s), Object.keys(t).length !== e.nodeCount())
    throw new Pr();
  return o;
}
class Pr extends Error {
  constructor() {
    super(...arguments);
  }
}
var sf = of;
of.CycleException = Pr;
var Eu = sf, Cm = $m;
function $m(e) {
  try {
    Eu(e);
  } catch (t) {
    if (t instanceof Eu.CycleException)
      return !1;
    throw t;
  }
  return !0;
}
var rf = Im;
function Im(e, t, n) {
  Array.isArray(t) || (t = [t]);
  var o = e.isDirected() ? (l) => e.successors(l) : (l) => e.neighbors(l), s = n === "post" ? Nm : Tm, i = [], r = {};
  return t.forEach((l) => {
    if (!e.hasNode(l))
      throw new Error("Graph does not have node: " + l);
    s(l, o, r, i);
  }), i;
}
function Nm(e, t, n, o) {
  for (var s = [[e, !1]]; s.length > 0; ) {
    var i = s.pop();
    i[1] ? o.push(i[0]) : Object.hasOwn(n, i[0]) || (n[i[0]] = !0, s.push([i[0], !0]), lf(t(i[0]), (r) => s.push([r, !1])));
  }
}
function Tm(e, t, n, o) {
  for (var s = [e]; s.length > 0; ) {
    var i = s.pop();
    Object.hasOwn(n, i) || (n[i] = !0, o.push(i), lf(t(i), (r) => s.push(r)));
  }
}
function lf(e, t) {
  for (var n = e.length; n--; )
    t(e[n], n, e);
  return e;
}
var Mm = rf, Om = Pm;
function Pm(e, t) {
  return Mm(e, t, "post");
}
var Am = rf, Dm = Rm;
function Rm(e, t) {
  return Am(e, t, "pre");
}
var Lm = yl, Vm = ef, zm = Fm;
function Fm(e, t) {
  var n = new Lm(), o = {}, s = new Vm(), i;
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
var Bm = {
  components: am,
  dijkstra: tf,
  dijkstraAll: gm,
  findCycles: _m,
  floydWarshall: km,
  isAcyclic: Cm,
  postorder: Om,
  preorder: Dm,
  prim: zm,
  tarjan: nf,
  topsort: sf
}, xu = tm, qt = {
  Graph: xu.Graph,
  json: om,
  alg: Bm,
  version: xu.version
};
let Hm = class {
  constructor() {
    let t = {};
    t._next = t._prev = t, this._sentinel = t;
  }
  dequeue() {
    let t = this._sentinel, n = t._prev;
    if (n !== t)
      return Su(n), n;
  }
  enqueue(t) {
    let n = this._sentinel;
    t._prev && t._next && Su(t), t._next = n._next, n._next._prev = t, n._next = t, t._prev = n;
  }
  toString() {
    let t = [], n = this._sentinel, o = n._prev;
    for (; o !== n; )
      t.push(JSON.stringify(o, Um)), o = o._prev;
    return "[" + t.join(", ") + "]";
  }
};
function Su(e) {
  e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev;
}
function Um(e, t) {
  if (e !== "_next" && e !== "_prev")
    return t;
}
var jm = Hm;
let Gm = qt.Graph, qm = jm;
var Ym = Km;
let Xm = () => 1;
function Km(e, t) {
  if (e.nodeCount() <= 1)
    return [];
  let n = Zm(e, t || Xm);
  return Wm(n.graph, n.buckets, n.zeroIdx).flatMap((s) => e.outEdges(s.v, s.w));
}
function Wm(e, t, n) {
  let o = [], s = t[t.length - 1], i = t[0], r;
  for (; e.nodeCount(); ) {
    for (; r = i.dequeue(); )
      Ji(e, t, n, r);
    for (; r = s.dequeue(); )
      Ji(e, t, n, r);
    if (e.nodeCount()) {
      for (let l = t.length - 2; l > 0; --l)
        if (r = t[l].dequeue(), r) {
          o = o.concat(Ji(e, t, n, r, !0));
          break;
        }
    }
  }
  return o;
}
function Ji(e, t, n, o, s) {
  let i = s ? [] : void 0;
  return e.inEdges(o.v).forEach((r) => {
    let l = e.edge(r), a = e.node(r.v);
    s && i.push({ v: r.v, w: r.w }), a.out -= l, Ar(t, n, a);
  }), e.outEdges(o.v).forEach((r) => {
    let l = e.edge(r), a = r.w, c = e.node(a);
    c.in -= l, Ar(t, n, c);
  }), e.removeNode(o.v), i;
}
function Zm(e, t) {
  let n = new Gm(), o = 0, s = 0;
  e.nodes().forEach((l) => {
    n.setNode(l, { v: l, in: 0, out: 0 });
  }), e.edges().forEach((l) => {
    let a = n.edge(l.v, l.w) || 0, c = t(l), d = a + c;
    n.setEdge(l.v, l.w, d), s = Math.max(s, n.node(l.v).out += c), o = Math.max(o, n.node(l.w).in += c);
  });
  let i = Jm(s + o + 3).map(() => new qm()), r = o + 1;
  return n.nodes().forEach((l) => {
    Ar(i, r, n.node(l));
  }), { graph: n, buckets: i, zeroIdx: r };
}
function Ar(e, t, n) {
  n.out ? n.in ? e[n.out - n.in + t].enqueue(n) : e[e.length - 1].enqueue(n) : e[0].enqueue(n);
}
function Jm(e) {
  const t = [];
  for (let n = 0; n < e; n++)
    t.push(n);
  return t;
}
let af = qt.Graph;
var it = {
  addBorderNode: ly,
  addDummyNode: uf,
  applyWithChunking: Ei,
  asNonCompoundGraph: ey,
  buildLayerMatrix: sy,
  intersectRect: oy,
  mapValues: hy,
  maxRank: df,
  normalizeRanks: iy,
  notime: dy,
  partition: uy,
  pick: py,
  predecessorWeights: ny,
  range: pf,
  removeEmptyRanks: ry,
  simplify: Qm,
  successorWeights: ty,
  time: cy,
  uniqueId: ff,
  zipObject: bl
};
function uf(e, t, n, o) {
  for (var s = o; e.hasNode(s); )
    s = ff(o);
  return n.dummy = t, e.setNode(s, n), s;
}
function Qm(e) {
  let t = new af().setGraph(e.graph());
  return e.nodes().forEach((n) => t.setNode(n, e.node(n))), e.edges().forEach((n) => {
    let o = t.edge(n.v, n.w) || { weight: 0, minlen: 1 }, s = e.edge(n);
    t.setEdge(n.v, n.w, {
      weight: o.weight + s.weight,
      minlen: Math.max(o.minlen, s.minlen)
    });
  }), t;
}
function ey(e) {
  let t = new af({ multigraph: e.isMultigraph() }).setGraph(e.graph());
  return e.nodes().forEach((n) => {
    e.children(n).length || t.setNode(n, e.node(n));
  }), e.edges().forEach((n) => {
    t.setEdge(n, e.edge(n));
  }), t;
}
function ty(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.outEdges(n).forEach((s) => {
      o[s.w] = (o[s.w] || 0) + e.edge(s).weight;
    }), o;
  });
  return bl(e.nodes(), t);
}
function ny(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.inEdges(n).forEach((s) => {
      o[s.v] = (o[s.v] || 0) + e.edge(s).weight;
    }), o;
  });
  return bl(e.nodes(), t);
}
function oy(e, t) {
  let n = e.x, o = e.y, s = t.x - n, i = t.y - o, r = e.width / 2, l = e.height / 2;
  if (!s && !i)
    throw new Error("Not possible to find intersection inside of the rectangle");
  let a, c;
  return Math.abs(i) * r > Math.abs(s) * l ? (i < 0 && (l = -l), a = l * s / i, c = l) : (s < 0 && (r = -r), a = r, c = r * i / s), { x: n + a, y: o + c };
}
function sy(e) {
  let t = pf(df(e) + 1).map(() => []);
  return e.nodes().forEach((n) => {
    let o = e.node(n), s = o.rank;
    s !== void 0 && (t[s][o.order] = n);
  }), t;
}
function iy(e) {
  let t = e.nodes().map((o) => {
    let s = e.node(o).rank;
    return s === void 0 ? Number.MAX_VALUE : s;
  }), n = Ei(Math.min, t);
  e.nodes().forEach((o) => {
    let s = e.node(o);
    Object.hasOwn(s, "rank") && (s.rank -= n);
  });
}
function ry(e) {
  let t = e.nodes().map((r) => e.node(r).rank), n = Ei(Math.min, t), o = [];
  e.nodes().forEach((r) => {
    let l = e.node(r).rank - n;
    o[l] || (o[l] = []), o[l].push(r);
  });
  let s = 0, i = e.graph().nodeRankFactor;
  Array.from(o).forEach((r, l) => {
    r === void 0 && l % i !== 0 ? --s : r !== void 0 && s && r.forEach((a) => e.node(a).rank += s);
  });
}
function ly(e, t, n, o) {
  let s = {
    width: 0,
    height: 0
  };
  return arguments.length >= 4 && (s.rank = n, s.order = o), uf(e, "border", s, t);
}
function ay(e, t = cf) {
  const n = [];
  for (let o = 0; o < e.length; o += t) {
    const s = e.slice(o, o + t);
    n.push(s);
  }
  return n;
}
const cf = 65535;
function Ei(e, t) {
  if (t.length > cf) {
    const n = ay(t);
    return e.apply(null, n.map((o) => e.apply(null, o)));
  } else
    return e.apply(null, t);
}
function df(e) {
  const n = e.nodes().map((o) => {
    let s = e.node(o).rank;
    return s === void 0 ? Number.MIN_VALUE : s;
  });
  return Ei(Math.max, n);
}
function uy(e, t) {
  let n = { lhs: [], rhs: [] };
  return e.forEach((o) => {
    t(o) ? n.lhs.push(o) : n.rhs.push(o);
  }), n;
}
function cy(e, t) {
  let n = Date.now();
  try {
    return t();
  } finally {
    console.log(e + " time: " + (Date.now() - n) + "ms");
  }
}
function dy(e, t) {
  return t();
}
let fy = 0;
function ff(e) {
  var t = ++fy;
  return e + ("" + t);
}
function pf(e, t, n = 1) {
  t == null && (t = e, e = 0);
  let o = (i) => i < t;
  n < 0 && (o = (i) => t < i);
  const s = [];
  for (let i = e; o(i); i += n)
    s.push(i);
  return s;
}
function py(e, t) {
  const n = {};
  for (const o of t)
    e[o] !== void 0 && (n[o] = e[o]);
  return n;
}
function hy(e, t) {
  let n = t;
  return typeof t == "string" && (n = (o) => o[t]), Object.entries(e).reduce((o, [s, i]) => (o[s] = n(i, s), o), {});
}
function bl(e, t) {
  return e.reduce((n, o, s) => (n[o] = t[s], n), {});
}
let vy = Ym, gy = it.uniqueId;
var my = {
  run: yy,
  undo: _y
};
function yy(e) {
  (e.graph().acyclicer === "greedy" ? vy(e, n(e)) : by(e)).forEach((o) => {
    let s = e.edge(o);
    e.removeEdge(o), s.forwardName = o.name, s.reversed = !0, e.setEdge(o.w, o.v, s, gy("rev"));
  });
  function n(o) {
    return (s) => o.edge(s).weight;
  }
}
function by(e) {
  let t = [], n = {}, o = {};
  function s(i) {
    Object.hasOwn(o, i) || (o[i] = !0, n[i] = !0, e.outEdges(i).forEach((r) => {
      Object.hasOwn(n, r.w) ? t.push(r) : s(r.w);
    }), delete n[i]);
  }
  return e.nodes().forEach(s), t;
}
function _y(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.reversed) {
      e.removeEdge(t);
      let o = n.forwardName;
      delete n.reversed, delete n.forwardName, e.setEdge(t.w, t.v, n, o);
    }
  });
}
let wy = it;
var ky = {
  run: Ey,
  undo: Sy
};
function Ey(e) {
  e.graph().dummyChains = [], e.edges().forEach((t) => xy(e, t));
}
function xy(e, t) {
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
    }, c = wy.addDummyNode(e, "edge", d, "_d"), o === a && (d.width = l.width, d.height = l.height, d.dummy = "edge-label", d.labelpos = l.labelpos), e.setEdge(n, c, { weight: l.weight }, r), f === 0 && e.graph().dummyChains.push(c), n = c;
  e.setEdge(n, s, { weight: l.weight }, r);
}
function Sy(e) {
  e.graph().dummyChains.forEach((t) => {
    let n = e.node(t), o = n.edgeLabel, s;
    for (e.setEdge(n.edgeObj, o); n.dummy; )
      s = e.successors(t)[0], e.removeNode(t), o.points.push({ x: n.x, y: n.y }), n.dummy === "edge-label" && (o.x = n.x, o.y = n.y, o.width = n.width, o.height = n.height), t = s, n = e.node(t);
  });
}
const { applyWithChunking: Cy } = it;
var xi = {
  longestPath: $y,
  slack: Iy
};
function $y(e) {
  var t = {};
  function n(o) {
    var s = e.node(o);
    if (Object.hasOwn(t, o))
      return s.rank;
    t[o] = !0;
    let i = e.outEdges(o).map((l) => l == null ? Number.POSITIVE_INFINITY : n(l.w) - e.edge(l).minlen);
    var r = Cy(Math.min, i);
    return r === Number.POSITIVE_INFINITY && (r = 0), s.rank = r;
  }
  e.sources().forEach(n);
}
function Iy(e, t) {
  return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen;
}
var Ny = qt.Graph, ei = xi.slack, hf = Ty;
function Ty(e) {
  var t = new Ny({ directed: !1 }), n = e.nodes()[0], o = e.nodeCount();
  t.setNode(n, {});
  for (var s, i; My(t, e) < o; )
    s = Oy(t, e), i = t.hasNode(s.v) ? ei(e, s) : -ei(e, s), Py(t, e, i);
  return t;
}
function My(e, t) {
  function n(o) {
    t.nodeEdges(o).forEach((s) => {
      var i = s.v, r = o === i ? s.w : i;
      !e.hasNode(r) && !ei(t, s) && (e.setNode(r, {}), e.setEdge(o, r, {}), n(r));
    });
  }
  return e.nodes().forEach(n), e.nodeCount();
}
function Oy(e, t) {
  return t.edges().reduce((o, s) => {
    let i = Number.POSITIVE_INFINITY;
    return e.hasNode(s.v) !== e.hasNode(s.w) && (i = ei(t, s)), i < o[0] ? [i, s] : o;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function Py(e, t, n) {
  e.nodes().forEach((o) => t.node(o).rank += n);
}
var Ay = hf, Cu = xi.slack, Dy = xi.longestPath, Ry = qt.alg.preorder, Ly = qt.alg.postorder, Vy = it.simplify, zy = lo;
lo.initLowLimValues = wl;
lo.initCutValues = _l;
lo.calcCutValue = vf;
lo.leaveEdge = mf;
lo.enterEdge = yf;
lo.exchangeEdges = bf;
function lo(e) {
  e = Vy(e), Dy(e);
  var t = Ay(e);
  wl(t), _l(t, e);
  for (var n, o; n = mf(t); )
    o = yf(t, e, n), bf(t, e, n, o);
}
function _l(e, t) {
  var n = Ly(e, e.nodes());
  n = n.slice(0, n.length - 1), n.forEach((o) => Fy(e, t, o));
}
function Fy(e, t, n) {
  var o = e.node(n), s = o.parent;
  e.edge(n, s).cutvalue = vf(e, t, n);
}
function vf(e, t, n) {
  var o = e.node(n), s = o.parent, i = !0, r = t.edge(n, s), l = 0;
  return r || (i = !1, r = t.edge(s, n)), l = r.weight, t.nodeEdges(n).forEach((a) => {
    var c = a.v === n, d = c ? a.w : a.v;
    if (d !== s) {
      var f = c === i, h = t.edge(a).weight;
      if (l += f ? h : -h, Hy(e, n, d)) {
        var v = e.edge(n, d).cutvalue;
        l += f ? -v : v;
      }
    }
  }), l;
}
function wl(e, t) {
  arguments.length < 2 && (t = e.nodes()[0]), gf(e, {}, 1, t);
}
function gf(e, t, n, o, s) {
  var i = n, r = e.node(o);
  return t[o] = !0, e.neighbors(o).forEach((l) => {
    Object.hasOwn(t, l) || (n = gf(e, t, n, l, o));
  }), r.low = i, r.lim = n++, s ? r.parent = s : delete r.parent, n;
}
function mf(e) {
  return e.edges().find((t) => e.edge(t).cutvalue < 0);
}
function yf(e, t, n) {
  var o = n.v, s = n.w;
  t.hasEdge(o, s) || (o = n.w, s = n.v);
  var i = e.node(o), r = e.node(s), l = i, a = !1;
  i.lim > r.lim && (l = r, a = !0);
  var c = t.edges().filter((d) => a === $u(e, e.node(d.v), l) && a !== $u(e, e.node(d.w), l));
  return c.reduce((d, f) => Cu(t, f) < Cu(t, d) ? f : d);
}
function bf(e, t, n, o) {
  var s = n.v, i = n.w;
  e.removeEdge(s, i), e.setEdge(o.v, o.w, {}), wl(e), _l(e, t), By(e, t);
}
function By(e, t) {
  var n = e.nodes().find((s) => !t.node(s).parent), o = Ry(e, n);
  o = o.slice(1), o.forEach((s) => {
    var i = e.node(s).parent, r = t.edge(s, i), l = !1;
    r || (r = t.edge(i, s), l = !0), t.node(s).rank = t.node(i).rank + (l ? r.minlen : -r.minlen);
  });
}
function Hy(e, t, n) {
  return e.hasEdge(t, n);
}
function $u(e, t, n) {
  return n.low <= t.lim && t.lim <= n.lim;
}
var Uy = xi, _f = Uy.longestPath, jy = hf, Gy = zy, qy = Yy;
function Yy(e) {
  var t = e.graph().ranker;
  if (t instanceof Function)
    return t(e);
  switch (e.graph().ranker) {
    case "network-simplex":
      Iu(e);
      break;
    case "tight-tree":
      Ky(e);
      break;
    case "longest-path":
      Xy(e);
      break;
    case "none":
      break;
    default:
      Iu(e);
  }
}
var Xy = _f;
function Ky(e) {
  _f(e), jy(e);
}
function Iu(e) {
  Gy(e);
}
var Wy = Zy;
function Zy(e) {
  let t = Qy(e);
  e.graph().dummyChains.forEach((n) => {
    let o = e.node(n), s = o.edgeObj, i = Jy(e, t, s.v, s.w), r = i.path, l = i.lca, a = 0, c = r[a], d = !0;
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
function Jy(e, t, n, o) {
  let s = [], i = [], r = Math.min(t[n].low, t[o].low), l = Math.max(t[n].lim, t[o].lim), a, c;
  a = n;
  do
    a = e.parent(a), s.push(a);
  while (a && (t[a].low > r || l > t[a].lim));
  for (c = a, a = o; (a = e.parent(a)) !== c; )
    i.push(a);
  return { path: s.concat(i.reverse()), lca: c };
}
function Qy(e) {
  let t = {}, n = 0;
  function o(s) {
    let i = n;
    e.children(s).forEach(o), t[s] = { low: i, lim: n++ };
  }
  return e.children().forEach(o), t;
}
let ti = it;
var e1 = {
  run: t1,
  cleanup: s1
};
function t1(e) {
  let t = ti.addDummyNode(e, "root", {}, "_root"), n = n1(e), o = Object.values(n), s = ti.applyWithChunking(Math.max, o) - 1, i = 2 * s + 1;
  e.graph().nestingRoot = t, e.edges().forEach((l) => e.edge(l).minlen *= i);
  let r = o1(e) + 1;
  e.children().forEach((l) => wf(e, t, i, r, s, n, l)), e.graph().nodeRankFactor = i;
}
function wf(e, t, n, o, s, i, r) {
  let l = e.children(r);
  if (!l.length) {
    r !== t && e.setEdge(t, r, { weight: 0, minlen: n });
    return;
  }
  let a = ti.addBorderNode(e, "_bt"), c = ti.addBorderNode(e, "_bb"), d = e.node(r);
  e.setParent(a, r), d.borderTop = a, e.setParent(c, r), d.borderBottom = c, l.forEach((f) => {
    wf(e, t, n, o, s, i, f);
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
function n1(e) {
  var t = {};
  function n(o, s) {
    var i = e.children(o);
    i && i.length && i.forEach((r) => n(r, s + 1)), t[o] = s;
  }
  return e.children().forEach((o) => n(o, 1)), t;
}
function o1(e) {
  return e.edges().reduce((t, n) => t + e.edge(n).weight, 0);
}
function s1(e) {
  var t = e.graph();
  e.removeNode(t.nestingRoot), delete t.nestingRoot, e.edges().forEach((n) => {
    var o = e.edge(n);
    o.nestingEdge && e.removeEdge(n);
  });
}
let i1 = it;
var r1 = l1;
function l1(e) {
  function t(n) {
    let o = e.children(n), s = e.node(n);
    if (o.length && o.forEach(t), Object.hasOwn(s, "minRank")) {
      s.borderLeft = [], s.borderRight = [];
      for (let i = s.minRank, r = s.maxRank + 1; i < r; ++i)
        Nu(e, "borderLeft", "_bl", n, s, i), Nu(e, "borderRight", "_br", n, s, i);
    }
  }
  e.children().forEach(t);
}
function Nu(e, t, n, o, s, i) {
  let r = { width: 0, height: 0, rank: i, borderType: t }, l = s[t][i - 1], a = i1.addDummyNode(e, "border", r, n);
  s[t][i] = a, e.setParent(a, o), l && e.setEdge(l, a, { weight: 1 });
}
var a1 = {
  adjust: u1,
  undo: c1
};
function u1(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "lr" || t === "rl") && kf(e);
}
function c1(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "bt" || t === "rl") && d1(e), (t === "lr" || t === "rl") && (f1(e), kf(e));
}
function kf(e) {
  e.nodes().forEach((t) => Tu(e.node(t))), e.edges().forEach((t) => Tu(e.edge(t)));
}
function Tu(e) {
  let t = e.width;
  e.width = e.height, e.height = t;
}
function d1(e) {
  e.nodes().forEach((t) => Qi(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(Qi), Object.hasOwn(n, "y") && Qi(n);
  });
}
function Qi(e) {
  e.y = -e.y;
}
function f1(e) {
  e.nodes().forEach((t) => er(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(er), Object.hasOwn(n, "x") && er(n);
  });
}
function er(e) {
  let t = e.x;
  e.x = e.y, e.y = t;
}
let Mu = it;
var p1 = h1;
function h1(e) {
  let t = {}, n = e.nodes().filter((a) => !e.children(a).length), o = n.map((a) => e.node(a).rank), s = Mu.applyWithChunking(Math.max, o), i = Mu.range(s + 1).map(() => []);
  function r(a) {
    if (t[a]) return;
    t[a] = !0;
    let c = e.node(a);
    i[c.rank].push(a), e.successors(a).forEach(r);
  }
  return n.sort((a, c) => e.node(a).rank - e.node(c).rank).forEach(r), i;
}
let v1 = it.zipObject;
var g1 = m1;
function m1(e, t) {
  let n = 0;
  for (let o = 1; o < t.length; ++o)
    n += y1(e, t[o - 1], t[o]);
  return n;
}
function y1(e, t, n) {
  let o = v1(n, n.map((c, d) => d)), s = t.flatMap((c) => e.outEdges(c).map((d) => ({ pos: o[d.w], weight: e.edge(d).weight })).sort((d, f) => d.pos - f.pos)), i = 1;
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
var b1 = _1;
function _1(e, t = []) {
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
let w1 = it;
var k1 = E1;
function E1(e, t) {
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
  return x1(o);
}
function x1(e) {
  let t = [];
  function n(s) {
    return (i) => {
      i.merged || (i.barycenter === void 0 || s.barycenter === void 0 || i.barycenter >= s.barycenter) && S1(s, i);
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
  return t.filter((s) => !s.merged).map((s) => w1.pick(s, ["vs", "i", "barycenter", "weight"]));
}
function S1(e, t) {
  let n = 0, o = 0;
  e.weight && (n += e.barycenter * e.weight, o += e.weight), t.weight && (n += t.barycenter * t.weight, o += t.weight), e.vs = t.vs.concat(e.vs), e.barycenter = n / o, e.weight = o, e.i = Math.min(t.i, e.i), t.merged = !0;
}
let C1 = it;
var $1 = I1;
function I1(e, t) {
  let n = C1.partition(e, (d) => Object.hasOwn(d, "barycenter")), o = n.lhs, s = n.rhs.sort((d, f) => f.i - d.i), i = [], r = 0, l = 0, a = 0;
  o.sort(N1(!!t)), a = Ou(i, s, a), o.forEach((d) => {
    a += d.vs.length, i.push(d.vs), r += d.barycenter * d.weight, l += d.weight, a = Ou(i, s, a);
  });
  let c = { vs: i.flat(!0) };
  return l && (c.barycenter = r / l, c.weight = l), c;
}
function Ou(e, t, n) {
  let o;
  for (; t.length && (o = t[t.length - 1]).i <= n; )
    t.pop(), e.push(o.vs), n++;
  return n;
}
function N1(e) {
  return (t, n) => t.barycenter < n.barycenter ? -1 : t.barycenter > n.barycenter ? 1 : e ? n.i - t.i : t.i - n.i;
}
let T1 = b1, M1 = k1, O1 = $1;
var P1 = Ef;
function Ef(e, t, n, o) {
  let s = e.children(t), i = e.node(t), r = i ? i.borderLeft : void 0, l = i ? i.borderRight : void 0, a = {};
  r && (s = s.filter((h) => h !== r && h !== l));
  let c = T1(e, s);
  c.forEach((h) => {
    if (e.children(h.v).length) {
      let v = Ef(e, h.v, n, o);
      a[h.v] = v, Object.hasOwn(v, "barycenter") && D1(h, v);
    }
  });
  let d = M1(c, n);
  A1(d, a);
  let f = O1(d, o);
  if (r && (f.vs = [r, f.vs, l].flat(!0), e.predecessors(r).length)) {
    let h = e.node(e.predecessors(r)[0]), v = e.node(e.predecessors(l)[0]);
    Object.hasOwn(f, "barycenter") || (f.barycenter = 0, f.weight = 0), f.barycenter = (f.barycenter * f.weight + h.order + v.order) / (f.weight + 2), f.weight += 2;
  }
  return f;
}
function A1(e, t) {
  e.forEach((n) => {
    n.vs = n.vs.flatMap((o) => t[o] ? t[o].vs : o);
  });
}
function D1(e, t) {
  e.barycenter !== void 0 ? (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight), e.weight += t.weight) : (e.barycenter = t.barycenter, e.weight = t.weight);
}
let R1 = qt.Graph, L1 = it;
var V1 = z1;
function z1(e, t, n) {
  let o = F1(e), s = new R1({ compound: !0 }).setGraph({ root: o }).setDefaultNodeLabel((i) => e.node(i));
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
function F1(e) {
  for (var t; e.hasNode(t = L1.uniqueId("_root")); ) ;
  return t;
}
var B1 = H1;
function H1(e, t, n) {
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
let U1 = p1, j1 = g1, G1 = P1, q1 = V1, Y1 = B1, X1 = qt.Graph, Cs = it;
var K1 = xf;
function xf(e, t) {
  if (t && typeof t.customOrder == "function") {
    t.customOrder(e, xf);
    return;
  }
  let n = Cs.maxRank(e), o = Pu(e, Cs.range(1, n + 1), "inEdges"), s = Pu(e, Cs.range(n - 1, -1, -1), "outEdges"), i = U1(e);
  if (Au(e, i), t && t.disableOptimalOrderHeuristic)
    return;
  let r = Number.POSITIVE_INFINITY, l;
  for (let a = 0, c = 0; c < 4; ++a, ++c) {
    W1(a % 2 ? o : s, a % 4 >= 2), i = Cs.buildLayerMatrix(e);
    let d = j1(e, i);
    d < r && (c = 0, l = Object.assign({}, i), r = d);
  }
  Au(e, l);
}
function Pu(e, t, n) {
  return t.map(function(o) {
    return q1(e, o, n);
  });
}
function W1(e, t) {
  let n = new X1();
  e.forEach(function(o) {
    let s = o.graph().root, i = G1(o, s, n, t);
    i.vs.forEach((r, l) => o.node(r).order = l), Y1(o, n, i.vs);
  });
}
function Au(e, t) {
  Object.values(t).forEach((n) => n.forEach((o, s) => e.node(o).order = s));
}
let Z1 = qt.Graph, cn = it;
var J1 = {
  positionX: ub
};
function Q1(e, t) {
  let n = {};
  function o(s, i) {
    let r = 0, l = 0, a = s.length, c = i[i.length - 1];
    return i.forEach((d, f) => {
      let h = tb(e, d), v = h ? e.node(h).order : a;
      (h || d === c) && (i.slice(l, f + 1).forEach((w) => {
        e.predecessors(w).forEach((x) => {
          let I = e.node(x), N = I.order;
          (N < r || v < N) && !(I.dummy && e.node(w).dummy) && Sf(n, x, w);
        });
      }), l = f + 1, r = v);
    }), i;
  }
  return t.length && t.reduce(o), n;
}
function eb(e, t) {
  let n = {};
  function o(i, r, l, a, c) {
    let d;
    cn.range(r, l).forEach((f) => {
      d = i[f], e.node(d).dummy && e.predecessors(d).forEach((h) => {
        let v = e.node(h);
        v.dummy && (v.order < a || v.order > c) && Sf(n, h, d);
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
function tb(e, t) {
  if (e.node(t).dummy)
    return e.predecessors(t).find((n) => e.node(n).dummy);
}
function Sf(e, t, n) {
  if (t > n) {
    let s = t;
    t = n, n = s;
  }
  let o = e[t];
  o || (e[t] = o = {}), o[n] = !0;
}
function nb(e, t, n) {
  if (t > n) {
    let o = t;
    t = n, n = o;
  }
  return !!e[t] && Object.hasOwn(e[t], n);
}
function ob(e, t, n, o) {
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
          i[c] === c && a < r[w] && !nb(n, c, w) && (i[w] = c, i[c] = s[c] = s[w], a = r[w]);
        }
      }
    });
  }), { root: s, align: i };
}
function sb(e, t, n, o, s) {
  let i = {}, r = ib(e, t, n, s), l = s ? "borderLeft" : "borderRight";
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
function ib(e, t, n, o) {
  let s = new Z1(), i = e.graph(), r = cb(i.nodesep, i.edgesep, o);
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
function rb(e, t) {
  return Object.values(t).reduce((n, o) => {
    let s = Number.NEGATIVE_INFINITY, i = Number.POSITIVE_INFINITY;
    Object.entries(o).forEach(([l, a]) => {
      let c = db(e, l) / 2;
      s = Math.max(a + c, s), i = Math.min(a - c, i);
    });
    const r = s - i;
    return r < n[0] && (n = [r, o]), n;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function lb(e, t) {
  let n = Object.values(t), o = cn.applyWithChunking(Math.min, n), s = cn.applyWithChunking(Math.max, n);
  ["u", "d"].forEach((i) => {
    ["l", "r"].forEach((r) => {
      let l = i + r, a = e[l];
      if (a === t) return;
      let c = Object.values(a), d = o - cn.applyWithChunking(Math.min, c);
      r !== "l" && (d = s - cn.applyWithChunking(Math.max, c)), d && (e[l] = cn.mapValues(a, (f) => f + d));
    });
  });
}
function ab(e, t) {
  return cn.mapValues(e.ul, (n, o) => {
    if (t)
      return e[t.toLowerCase()][o];
    {
      let s = Object.values(e).map((i) => i[o]).sort((i, r) => i - r);
      return (s[1] + s[2]) / 2;
    }
  });
}
function ub(e) {
  let t = cn.buildLayerMatrix(e), n = Object.assign(
    Q1(e, t),
    eb(e, t)
  ), o = {}, s;
  ["u", "d"].forEach((r) => {
    s = r === "u" ? t : Object.values(t).reverse(), ["l", "r"].forEach((l) => {
      l === "r" && (s = s.map((f) => Object.values(f).reverse()));
      let a = (r === "u" ? e.predecessors : e.successors).bind(e), c = ob(e, s, n, a), d = sb(
        e,
        s,
        c.root,
        c.align,
        l === "r"
      );
      l === "r" && (d = cn.mapValues(d, (f) => -f)), o[r + l] = d;
    });
  });
  let i = rb(e, o);
  return lb(o, i), ab(o, e.graph().align);
}
function cb(e, t, n) {
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
function db(e, t) {
  return e.node(t).width;
}
let Cf = it, fb = J1.positionX;
var pb = hb;
function hb(e) {
  e = Cf.asNonCompoundGraph(e), vb(e), Object.entries(fb(e)).forEach(([t, n]) => e.node(t).x = n);
}
function vb(e) {
  let t = Cf.buildLayerMatrix(e), n = e.graph().ranksep, o = 0;
  t.forEach((s) => {
    const i = s.reduce((r, l) => {
      const a = e.node(l).height;
      return r > a ? r : a;
    }, 0);
    s.forEach((r) => e.node(r).y = o + i / 2), o += i + n;
  });
}
let Du = my, Ru = ky, gb = qy, mb = it.normalizeRanks, yb = Wy, bb = it.removeEmptyRanks, Lu = e1, _b = r1, Vu = a1, wb = K1, kb = pb, Vt = it, Eb = qt.Graph;
var xb = Sb;
function Sb(e, t) {
  let n = t && t.debugTiming ? Vt.time : Vt.notime;
  n("layout", () => {
    let o = n("  buildLayoutGraph", () => Db(e));
    n("  runLayout", () => Cb(o, n, t)), n("  updateInputGraph", () => $b(e, o));
  });
}
function Cb(e, t, n) {
  t("    makeSpaceForEdgeLabels", () => Rb(e)), t("    removeSelfEdges", () => Gb(e)), t("    acyclic", () => Du.run(e)), t("    nestingGraph.run", () => Lu.run(e)), t("    rank", () => gb(Vt.asNonCompoundGraph(e))), t("    injectEdgeLabelProxies", () => Lb(e)), t("    removeEmptyRanks", () => bb(e)), t("    nestingGraph.cleanup", () => Lu.cleanup(e)), t("    normalizeRanks", () => mb(e)), t("    assignRankMinMax", () => Vb(e)), t("    removeEdgeLabelProxies", () => zb(e)), t("    normalize.run", () => Ru.run(e)), t("    parentDummyChains", () => yb(e)), t("    addBorderSegments", () => _b(e)), t("    order", () => wb(e, n)), t("    insertSelfEdges", () => qb(e)), t("    adjustCoordinateSystem", () => Vu.adjust(e)), t("    position", () => kb(e)), t("    positionSelfEdges", () => Yb(e)), t("    removeBorderNodes", () => jb(e)), t("    normalize.undo", () => Ru.undo(e)), t("    fixupEdgeLabelCoords", () => Hb(e)), t("    undoCoordinateSystem", () => Vu.undo(e)), t("    translateGraph", () => Fb(e)), t("    assignNodeIntersects", () => Bb(e)), t("    reversePoints", () => Ub(e)), t("    acyclic.undo", () => Du.undo(e));
}
function $b(e, t) {
  e.nodes().forEach((n) => {
    let o = e.node(n), s = t.node(n);
    o && (o.x = s.x, o.y = s.y, o.rank = s.rank, t.children(n).length && (o.width = s.width, o.height = s.height));
  }), e.edges().forEach((n) => {
    let o = e.edge(n), s = t.edge(n);
    o.points = s.points, Object.hasOwn(s, "x") && (o.x = s.x, o.y = s.y);
  }), e.graph().width = t.graph().width, e.graph().height = t.graph().height;
}
let Ib = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], Nb = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" }, Tb = ["acyclicer", "ranker", "rankdir", "align"], Mb = ["width", "height", "rank"], zu = { width: 0, height: 0 }, Ob = ["minlen", "weight", "width", "height", "labeloffset"], Pb = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
}, Ab = ["labelpos"];
function Db(e) {
  let t = new Eb({ multigraph: !0, compound: !0 }), n = nr(e.graph());
  return t.setGraph(Object.assign(
    {},
    Nb,
    tr(n, Ib),
    Vt.pick(n, Tb)
  )), e.nodes().forEach((o) => {
    let s = nr(e.node(o));
    const i = tr(s, Mb);
    Object.keys(zu).forEach((r) => {
      i[r] === void 0 && (i[r] = zu[r]);
    }), t.setNode(o, i), t.setParent(o, e.parent(o));
  }), e.edges().forEach((o) => {
    let s = nr(e.edge(o));
    t.setEdge(o, Object.assign(
      {},
      Pb,
      tr(s, Ob),
      Vt.pick(s, Ab)
    ));
  }), t;
}
function Rb(e) {
  let t = e.graph();
  t.ranksep /= 2, e.edges().forEach((n) => {
    let o = e.edge(n);
    o.minlen *= 2, o.labelpos.toLowerCase() !== "c" && (t.rankdir === "TB" || t.rankdir === "BT" ? o.width += o.labeloffset : o.height += o.labeloffset);
  });
}
function Lb(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.width && n.height) {
      let o = e.node(t.v), i = { rank: (e.node(t.w).rank - o.rank) / 2 + o.rank, e: t };
      Vt.addDummyNode(e, "edge-proxy", i, "_ep");
    }
  });
}
function Vb(e) {
  let t = 0;
  e.nodes().forEach((n) => {
    let o = e.node(n);
    o.borderTop && (o.minRank = e.node(o.borderTop).rank, o.maxRank = e.node(o.borderBottom).rank, t = Math.max(t, o.maxRank));
  }), e.graph().maxRank = t;
}
function zb(e) {
  e.nodes().forEach((t) => {
    let n = e.node(t);
    n.dummy === "edge-proxy" && (e.edge(n.e).labelRank = n.rank, e.removeNode(t));
  });
}
function Fb(e) {
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
function Bb(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t), o = e.node(t.v), s = e.node(t.w), i, r;
    n.points ? (i = n.points[0], r = n.points[n.points.length - 1]) : (n.points = [], i = s, r = o), n.points.unshift(Vt.intersectRect(o, i)), n.points.push(Vt.intersectRect(s, r));
  });
}
function Hb(e) {
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
function Ub(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    n.reversed && n.points.reverse();
  });
}
function jb(e) {
  e.nodes().forEach((t) => {
    if (e.children(t).length) {
      let n = e.node(t), o = e.node(n.borderTop), s = e.node(n.borderBottom), i = e.node(n.borderLeft[n.borderLeft.length - 1]), r = e.node(n.borderRight[n.borderRight.length - 1]);
      n.width = Math.abs(r.x - i.x), n.height = Math.abs(s.y - o.y), n.x = i.x + n.width / 2, n.y = o.y + n.height / 2;
    }
  }), e.nodes().forEach((t) => {
    e.node(t).dummy === "border" && e.removeNode(t);
  });
}
function Gb(e) {
  e.edges().forEach((t) => {
    if (t.v === t.w) {
      var n = e.node(t.v);
      n.selfEdges || (n.selfEdges = []), n.selfEdges.push({ e: t, label: e.edge(t) }), e.removeEdge(t);
    }
  });
}
function qb(e) {
  var t = Vt.buildLayerMatrix(e);
  t.forEach((n) => {
    var o = 0;
    n.forEach((s, i) => {
      var r = e.node(s);
      r.order = i + o, (r.selfEdges || []).forEach((l) => {
        Vt.addDummyNode(e, "selfedge", {
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
function Yb(e) {
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
function tr(e, t) {
  return Vt.mapValues(Vt.pick(e, t), Number);
}
function nr(e) {
  var t = {};
  return e && Object.entries(e).forEach(([n, o]) => {
    typeof n == "string" && (n = n.toLowerCase()), t[n] = o;
  }), t;
}
let Xb = it, Kb = qt.Graph;
var Wb = {
  debugOrdering: Zb
};
function Zb(e) {
  let t = Xb.buildLayerMatrix(e), n = new Kb({ compound: !0, multigraph: !0 }).setGraph({});
  return e.nodes().forEach((o) => {
    n.setNode(o, { label: o }), n.setParent(o, "layer" + e.node(o).rank);
  }), e.edges().forEach((o) => n.setEdge(o.v, o.w, {}, o.name)), t.forEach((o, s) => {
    let i = "layer" + s;
    n.setNode(i, { rank: "same" }), o.reduce((r, l) => (n.setEdge(r, l, { style: "invis" }), l));
  }), n;
}
var Jb = "1.1.5", Qb = {
  graphlib: qt,
  layout: xb,
  debug: Wb,
  util: {
    time: it.time,
    notime: it.notime
  },
  version: Jb
};
const Fu = /* @__PURE__ */ Wg(Qb), Bu = 190, Hu = 78, Uu = ["profile", "memory", "rag", "extensions", "voice", "live2d"];
function e_(e) {
  const t = e.nodes.find((a) => a.data.kind === "persona"), n = e.nodes.find((a) => a.data.kind === "extensions");
  if (!t || !n) return;
  const o = /* @__PURE__ */ new Map(), s = e.nodes.filter((a) => a.type === "module" && a.data.kind !== "extensions").sort((a, c) => Uu.indexOf(a.data.kind) - Uu.indexOf(c.data.kind));
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
function t_(e) {
  const t = e_(e);
  if (t) return t;
  const n = new Fu.graphlib.Graph();
  return n.setDefaultEdgeLabel(() => ({})), n.setGraph({ rankdir: "LR", nodesep: 34, ranksep: 96, marginx: 28, marginy: 28 }), [...e.nodes].sort((o, s) => o.id.localeCompare(s.id)).forEach((o) => n.setNode(o.id, { width: Bu, height: Hu })), [...e.edges].sort((o, s) => o.id.localeCompare(s.id)).forEach((o) => n.setEdge(o.source, o.target)), Fu.layout(n), {
    nodes: e.nodes.map((o) => {
      const s = n.node(o.id);
      return { ...o, position: { x: s.x - Bu / 2, y: s.y - Hu / 2 } };
    }),
    edges: e.edges.map((o) => ({ ...o }))
  };
}
function n_(e, t) {
  const n = /* @__PURE__ */ new Set([t]), o = [t];
  for (; o.length; ) {
    const s = o.shift();
    for (const i of e.edges)
      i.source !== s || n.has(i.target) || (n.add(i.target), o.push(i.target));
  }
  return n;
}
function o_(e, t, n) {
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
function s_(e, t) {
  var a;
  const n = e.nodes.find((c) => c.data.kind === "persona");
  if (!n) return e;
  const o = (a = e.nodes.find((c) => c.data.kind === "extensions")) == null ? void 0 : a.id, s = new Set(
    e.edges.filter((c) => c.source === (o || n.id)).map((c) => c.target).filter((c) => e.nodes.some((d) => d.id === c && ["skill", "tool"].includes(d.data.kind)))
  ), i = o_(e, t, s), r = t === o, l = /* @__PURE__ */ new Set([
    n.id,
    ...e.nodes.filter((c) => c.type === "module").map((c) => c.id),
    ...i ? [i] : r ? s : []
  ]);
  return i && n_(e, i).forEach((c) => l.add(c)), {
    nodes: e.nodes.filter((c) => l.has(c.id)),
    edges: e.edges.filter((c) => l.has(c.source) && l.has(c.target))
  };
}
const i_ = {
  class: "knowledge-quality",
  "aria-label": "知识质量"
}, r_ = { class: "knowledge-quality-heading" }, l_ = ["disabled"], a_ = {
  class: "knowledge-quality-stats",
  "aria-label": "资料处理概览"
}, u_ = { class: "knowledge-quality-report" }, c_ = { class: "knowledge-quality-subheading" }, d_ = {
  key: 0,
  class: "knowledge-quality-summary"
}, f_ = {
  key: 1,
  class: "knowledge-quality-meta"
}, p_ = { key: 0 }, h_ = { key: 1 }, v_ = { key: 2 }, g_ = { key: 3 }, m_ = {
  key: 2,
  class: "knowledge-quality-empty"
}, y_ = { class: "knowledge-quality-evaluation" }, b_ = { class: "knowledge-quality-subheading" }, __ = { key: 0 }, w_ = {
  key: 0,
  class: "knowledge-quality-summary"
}, k_ = { class: "knowledge-quality-eval-facts" }, E_ = { key: 0 }, x_ = { key: 1 }, S_ = {
  key: 1,
  class: "knowledge-quality-empty"
}, C_ = {
  key: 0,
  class: "knowledge-quality-error"
}, $_ = /* @__PURE__ */ De({
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
    const l = ae(() => Cg(t.documents)), a = ae(() => {
      if (!n.value) return l.value;
      const I = Number(n.value.total_documents), N = Number(n.value.indexed_count ?? n.value.indexed_documents), D = Number(n.value.in_progress_count ?? n.value.processing_documents), y = Number(n.value.failed_count ?? n.value.failed_documents);
      return [I, N, D, y].every(Number.isFinite) ? { total: I, indexed: N, processing: D, failed: y, attention: D + y } : l.value;
    }), c = ae(() => o.value[0] || null), d = ae(() => Ng(n.value)), f = ae(() => {
      var N, D, y;
      const I = ((N = n.value) == null ? void 0 : N.chunk_count) ?? ((D = n.value) == null ? void 0 : D.chunks) ?? ((y = n.value) == null ? void 0 : y.total_chunks);
      return Number.isFinite(Number(I)) ? Number(I) : null;
    }), h = ae(() => {
      var I, N, D;
      return ((N = (I = c.value) == null ? void 0 : I.metrics) == null ? void 0 : N.accepted_rate) ?? ((D = c.value) == null ? void 0 : D.accepted_rate);
    }), v = ae(() => {
      var D;
      const I = (D = n.value) == null ? void 0 : D.index_version_counts;
      if (!I) return "";
      const [N] = Object.keys(I);
      return N ? `索引 ${N}` : "";
    });
    function w(I) {
      if (!I) return "";
      const N = new Date(I);
      return Number.isNaN(N.getTime()) ? I : new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(N);
    }
    async function x() {
      const I = ++r;
      if (!t.knowledgeSpaceId) {
        n.value = null, o.value = [], i.value = "";
        return;
      }
      s.value = !0, i.value = "";
      const [N, D] = await Promise.allSettled([
        Gg(t.knowledgeSpaceId),
        qg(t.personaId)
      ]);
      if (I !== r) return;
      N.status === "fulfilled" && (n.value = N.value), D.status === "fulfilled" && (o.value = D.value);
      const y = [N, D].find((_) => _.status === "rejected");
      (y == null ? void 0 : y.status) === "rejected" && (i.value = y.reason instanceof Error ? y.reason.message : String(y.reason)), s.value = !1;
    }
    return Me(() => [t.personaId, t.knowledgeSpaceId], x), ht(x), (I, N) => {
      var D, y, _;
      return E(), C("section", i_, [
        u("header", r_, [
          N[0] || (N[0] = u("div", null, [
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
            ne(H(Dt), {
              size: 13,
              class: ge({ "is-spinning": s.value })
            }, null, 8, ["class"]),
            u("span", null, A(s.value ? "读取中" : "刷新"), 1)
          ], 8, l_)
        ]),
        u("div", a_, [
          u("div", null, [
            u("strong", null, A(a.value.total), 1),
            N[1] || (N[1] = u("span", null, "资料", -1))
          ]),
          u("div", null, [
            u("strong", null, A(a.value.indexed), 1),
            N[2] || (N[2] = u("span", null, "已索引", -1))
          ]),
          u("div", {
            class: ge({ "has-attention": a.value.attention > 0 })
          }, [
            u("strong", null, A(a.value.attention), 1),
            N[3] || (N[3] = u("span", null, "需处理", -1))
          ], 2)
        ]),
        u("div", u_, [
          u("div", c_, [
            N[4] || (N[4] = u("span", null, "处理报告", -1)),
            u("b", {
              class: ge({ "is-attention": a.value.attention > 0 })
            }, A(d.value), 3)
          ]),
          (D = n.value) != null && D.summary ? (E(), C("p", d_, A(n.value.summary), 1)) : oe("", !0),
          f.value !== null || v.value ? (E(), C("p", f_, [
            f.value !== null ? (E(), C("span", p_, A(f.value) + " 个片段", 1)) : oe("", !0),
            f.value !== null && v.value ? (E(), C("span", h_, " · ")) : oe("", !0),
            v.value ? (E(), C("span", v_, A(v.value), 1)) : oe("", !0),
            (y = n.value) != null && y.latest_updated_at || (_ = n.value) != null && _.updated_at ? (E(), C("span", g_, " · " + A(w(n.value.latest_updated_at || n.value.updated_at)) + " 更新", 1)) : oe("", !0)
          ])) : n.value ? oe("", !0) : (E(), C("p", m_, "暂无处理报告，当前先显示资料状态。"))
        ]),
        u("div", y_, [
          u("div", b_, [
            N[5] || (N[5] = u("span", null, "最近评测", -1)),
            c.value ? (E(), C("b", __, A(H(Tg)(c.value.status)), 1)) : oe("", !0)
          ]),
          c.value ? (E(), C(_e, { key: 0 }, [
            c.value.summary ? (E(), C("p", w_, A(c.value.summary), 1)) : oe("", !0),
            u("div", k_, [
              h.value !== void 0 && h.value !== null ? (E(), C("span", E_, [
                N[6] || (N[6] = me("通过率 ")),
                u("strong", null, A(H(Ig)(h.value)), 1)
              ])) : oe("", !0),
              c.value.created_at ? (E(), C("span", x_, A(w(c.value.created_at)), 1)) : oe("", !0)
            ])
          ], 64)) : (E(), C("p", S_, "暂无已保存评测，可从下方进入完整 RAG 评测。"))
        ]),
        i.value ? (E(), C("p", C_, "读取质量数据失败：" + A(i.value), 1)) : oe("", !0)
      ]);
    };
  }
}), I_ = ["aria-busy"], N_ = {
  key: 0,
  class: "inspect-fields"
}, T_ = ["value"], M_ = ["value"], O_ = ["value"], P_ = { class: "inspect-fieldset" }, A_ = ["value"], D_ = ["value"], R_ = ["value"], L_ = ["value"], V_ = ["value"], z_ = { class: "inline-check" }, F_ = ["checked"], B_ = {
  key: 1,
  class: "inspect-stack rag-inspector"
}, H_ = ["disabled"], U_ = {
  key: 0,
  class: "pending-files"
}, j_ = ["onClick"], G_ = ["onClick"], q_ = ["disabled"], Y_ = { class: "document-items" }, X_ = { class: "document-actions" }, K_ = ["onClick"], W_ = ["onClick"], Z_ = ["onClick"], J_ = {
  key: 2,
  class: "inspect-stack"
}, Q_ = {
  key: 3,
  class: "inspect-stack"
}, e0 = {
  key: 4,
  class: "inspect-fields"
}, t0 = { class: "inline-check" }, n0 = ["checked"], o0 = { class: "inline-check" }, s0 = ["checked"], i0 = ["value"], r0 = ["value"], l0 = ["value"], a0 = { class: "inspect-button-row" }, u0 = ["disabled"], c0 = {
  key: 5,
  class: "live2d-model-library"
}, d0 = { class: "live2d-binding-summary" }, f0 = ["disabled"], p0 = { class: "live2d-library-actions" }, h0 = ["disabled"], v0 = ["disabled"], g0 = { class: "live2d-model-heading" }, m0 = {
  key: 0,
  class: "live2d-model-items"
}, y0 = { class: "live2d-model-copy" }, b0 = { class: "live2d-model-state" }, _0 = {
  key: 0,
  type: "button",
  disabled: "",
  class: "is-bound"
}, w0 = ["disabled", "title", "onClick"], k0 = {
  key: 1,
  class: "live2d-model-empty"
}, E0 = {
  key: 6,
  class: "inspect-fields"
}, x0 = { key: 0 }, S0 = ["value"], C0 = { key: 1 }, $0 = {
  key: 2,
  class: "dependency-list"
}, I0 = {
  key: 7,
  class: "inspect-fields"
}, N0 = { class: "inline-check" }, T0 = ["checked", "disabled"], M0 = /* @__PURE__ */ De({
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
      var B;
      return ((B = n.node) == null ? void 0 : B.data.kind) || "persona";
    }), a = ae(() => n.draft.capabilities.packages.find((B) => {
      var T;
      return B.id === ((T = n.node) == null ? void 0 : T.id);
    })), c = ae(() => l.value === "mcp" ? n.draft.grants.servers.find((B) => {
      var T;
      return `mcp:${B.name}` === ((T = n.node) == null ? void 0 : T.id);
    }) : void 0), d = ae(() => {
      const B = n.node ? n.draft.capabilities.overrides[n.node.id] : void 0;
      return B === !0 ? "allow" : B === !1 ? "deny" : "inherit";
    }), f = ae(() => {
      var B, T;
      return String(((T = (B = n.draft.persona.profile) == null ? void 0 : B.live2d) == null ? void 0 : T.model) || "");
    }), h = ae(() => {
      var B;
      return ((B = n.draft.resources) == null ? void 0 : B.live2dModels) || [];
    }), v = ae(() => {
      var B;
      return { available: "可用", partial: "部分可用", unassigned: "未分配", blocked: "不可用", pending: "等待中", error: "异常" }[((B = n.node) == null ? void 0 : B.data.status) || "blocked"];
    });
    function w(B) {
      return B.kind === "cubism2" ? "Cubism 2" : B.moc_version ? `MOC3 v${B.moc_version}` : "Cubism / MOC3";
    }
    function x(B, T) {
      const L = rt(n.draft.persona), Y = { ...L.profile || {} };
      B === "name" ? L.name = String(T) : Y[B] = T, L.profile = Y, o("profile", L);
    }
    function I(B, T) {
      const L = rt(n.draft.persona), Y = { ...L.profile || {} };
      Y.tts = { ...Y.tts || {}, [B]: T }, L.profile = Y, o("profile", L);
    }
    function N(B) {
      const T = rt(n.draft.persona), L = { ...T.profile || {} };
      L.live2d = { ...L.live2d || {}, model: B }, T.profile = L, o("profile", T);
    }
    const D = ae(() => {
      var B;
      return ((B = n.draft.persona.profile) == null ? void 0 : B.rag) || {};
    });
    function y(B, T) {
      const L = rt(n.draft.persona), Y = { ...L.profile || {} };
      Y.rag = { ...Y.rag || {}, [B]: T }, L.profile = Y, o("profile", L);
    }
    function _(B) {
      s.value = Array.from(B.target.files || []);
    }
    function R(B) {
      var T;
      s.value = Array.from(((T = B.dataTransfer) == null ? void 0 : T.files) || []);
    }
    function X(B) {
      s.value = s.value.filter((T, L) => L !== B);
    }
    function Q() {
      n.disabled || !s.value.length && !i.value.trim() || o("upload", s.value, i.value);
    }
    return Me(() => n.uploadCompleteToken, () => {
      s.value = [], i.value = "", r.value += 1;
    }), (B, T) => {
      var L, Y, U, G, $, V, M, F, q, te, ce, fe, le, he, pe, be;
      return E(), C("aside", {
        class: ge(["node-inspector", { "is-disabled": B.disabled }]),
        "aria-busy": B.disabled
      }, [
        u("header", null, [
          u("div", null, [
            u("strong", null, A(((L = B.node) == null ? void 0 : L.data.label) || "角色配置"), 1),
            u("small", null, A((Y = B.node) == null ? void 0 : Y.data.summary), 1)
          ]),
          B.node ? (E(), C("span", {
            key: 0,
            class: ge(`inspect-status status-${B.node.data.status}`)
          }, A(v.value), 3)) : oe("", !0)
        ]),
        l.value === "profile" ? (E(), C("div", N_, [
          u("label", null, [
            T[24] || (T[24] = u("span", null, "角色名称", -1)),
            u("input", {
              value: B.draft.persona.name,
              onInput: T[0] || (T[0] = (se) => x("name", se.target.value))
            }, null, 40, T_)
          ]),
          u("label", null, [
            T[25] || (T[25] = u("span", null, "角色人设", -1)),
            u("textarea", {
              rows: "7",
              value: String(((U = B.draft.persona.profile) == null ? void 0 : U.description) || ""),
              onInput: T[1] || (T[1] = (se) => x("description", se.target.value))
            }, null, 40, M_)
          ]),
          u("label", null, [
            T[27] || (T[27] = u("span", null, "回复语言", -1)),
            u("select", {
              value: String(((G = B.draft.persona.profile) == null ? void 0 : G.reply_language) || ""),
              onChange: T[2] || (T[2] = (se) => x("reply_language", se.target.value))
            }, T[26] || (T[26] = [
              u("option", { value: "" }, "跟随对话", -1),
              u("option", { value: "zh" }, "中文", -1),
              u("option", { value: "ja" }, "日语", -1),
              u("option", { value: "en" }, "英语", -1)
            ]), 40, O_)
          ]),
          u("fieldset", P_, [
            T[35] || (T[35] = u("legend", null, "知识检索", -1)),
            u("label", null, [
              T[29] || (T[29] = u("span", null, "检索预设", -1)),
              u("select", {
                value: String(D.value.profile || "deep"),
                onChange: T[3] || (T[3] = (se) => y("profile", se.target.value))
              }, T[28] || (T[28] = [
                u("option", { value: "precise" }, "精准检索", -1),
                u("option", { value: "deep" }, "深度检索", -1),
                u("option", { value: "custom" }, "自定义", -1)
              ]), 40, A_)
            ]),
            D.value.profile === "custom" ? (E(), C(_e, { key: 0 }, [
              u("label", null, [
                T[30] || (T[30] = u("span", null, "初始召回 K", -1)),
                u("input", {
                  type: "number",
                  min: "1",
                  max: "100",
                  value: D.value.retrieval_k || 20,
                  onChange: T[4] || (T[4] = (se) => y("retrieval_k", Number(se.target.value)))
                }, null, 40, D_)
              ]),
              u("label", null, [
                T[31] || (T[31] = u("span", null, "重排保留 K", -1)),
                u("input", {
                  type: "number",
                  min: "1",
                  max: "100",
                  value: D.value.rerank_k || 8,
                  onChange: T[5] || (T[5] = (se) => y("rerank_k", Number(se.target.value)))
                }, null, 40, R_)
              ]),
              u("label", null, [
                T[32] || (T[32] = u("span", null, "最终上下文 K", -1)),
                u("input", {
                  type: "number",
                  min: "1",
                  max: "30",
                  value: D.value.final_context_k || 8,
                  onChange: T[6] || (T[6] = (se) => y("final_context_k", Number(se.target.value)))
                }, null, 40, L_)
              ]),
              u("label", null, [
                T[33] || (T[33] = u("span", null, "证据 Token 预算", -1)),
                u("input", {
                  type: "number",
                  min: "256",
                  max: "20000",
                  step: "256",
                  value: D.value.evidence_token_budget || 4500,
                  onChange: T[7] || (T[7] = (se) => y("evidence_token_budget", Number(se.target.value)))
                }, null, 40, V_)
              ]),
              u("label", z_, [
                u("input", {
                  type: "checkbox",
                  checked: D.value.allow_neighbors !== !1,
                  onChange: T[8] || (T[8] = (se) => y("allow_neighbors", se.target.checked))
                }, null, 40, F_),
                T[34] || (T[34] = u("span", null, "允许补充相邻片段", -1))
              ])
            ], 64)) : oe("", !0),
            T[36] || (T[36] = u("small", null, "查询时直接使用这里保存的参数，不额外调用模型判断检索模式。", -1))
          ]),
          u("button", {
            type: "button",
            class: "inspect-danger",
            onClick: T[9] || (T[9] = (se) => o("deletePersona"))
          }, [
            ne(H(gn), { size: 15 }),
            T[37] || (T[37] = me("删除当前角色"))
          ])
        ])) : l.value === "rag" ? (E(), C("div", B_, [
          u("p", null, A(B.draft.documents.length) + " 份资料已关联到角色知识空间。", 1),
          u("label", {
            class: "document-picker",
            onDragover: T[10] || (T[10] = yt(() => {
            }, ["prevent"])),
            onDrop: yt(R, ["prevent"])
          }, [
            ne(H(Mr), { size: 15 }),
            u("span", null, A(s.value.length ? `已选择 ${s.value.length} 个文件` : "选择或拖入资料文件"), 1),
            (E(), C("input", {
              key: r.value,
              type: "file",
              multiple: "",
              disabled: B.disabled,
              onChange: _
            }, null, 40, H_))
          ], 32),
          s.value.length ? (E(), C("ul", U_, [
            (E(!0), C(_e, null, Re(s.value, (se, xe) => (E(), C("li", {
              key: `${se.name}-${se.size}-${xe}`
            }, [
              u("span", null, A(se.name), 1),
              u("span", null, [
                u("button", {
                  type: "button",
                  title: "上传前预览",
                  onClick: ($e) => o("previewLocalFile", se)
                }, [
                  ne(H(yu), { size: 14 })
                ], 8, j_),
                u("button", {
                  type: "button",
                  title: "移除",
                  onClick: ($e) => X(xe)
                }, [
                  ne(H(gn), { size: 14 })
                ], 8, G_)
              ])
            ]))), 128))
          ])) : oe("", !0),
          u("label", null, [
            T[38] || (T[38] = u("span", null, "补充文本", -1)),
            Te(u("textarea", {
              "onUpdate:modelValue": T[11] || (T[11] = (se) => i.value = se),
              rows: "3",
              placeholder: "直接写入角色知识库"
            }, null, 512), [
              [Fe, i.value]
            ])
          ]),
          u("button", {
            type: "button",
            class: "inspect-action",
            disabled: B.disabled || !s.value.length && !i.value.trim(),
            onClick: Q
          }, [
            ne(H(Mr), { size: 15 }),
            me(A(B.disabled ? "处理中" : "写入知识库"), 1)
          ], 8, q_),
          u("ul", Y_, [
            (E(!0), C(_e, null, Re(B.draft.documents, (se) => (E(), C("li", {
              key: String(se.id)
            }, [
              u("div", null, [
                u("b", null, A(se.original_filename || se.original_name || se.id), 1),
                u("span", null, A(se.status), 1)
              ]),
              u("span", X_, [
                u("button", {
                  type: "button",
                  title: "预览 Markdown",
                  onClick: (xe) => o("previewDocument", se)
                }, [
                  ne(H(yu), { size: 14 })
                ], 8, K_),
                se.status === "index_failed" ? (E(), C("button", {
                  key: 0,
                  type: "button",
                  title: "重新索引",
                  onClick: (xe) => o("retryDocument", String(se.id))
                }, [
                  ne(H(gl), { size: 14 })
                ], 8, W_)) : oe("", !0),
                u("button", {
                  type: "button",
                  title: "删除资料",
                  onClick: (xe) => o("deleteDocument", String(se.id))
                }, [
                  ne(H(gn), { size: 14 })
                ], 8, Z_)
              ])
            ]))), 128))
          ]),
          ne($_, {
            "persona-id": B.draft.persona.id,
            "knowledge-space-id": B.draft.persona.knowledge_space_id,
            documents: B.draft.documents,
            disabled: B.disabled
          }, null, 8, ["persona-id", "knowledge-space-id", "documents", "disabled"]),
          u("button", {
            type: "button",
            class: "inspect-action",
            onClick: T[12] || (T[12] = (se) => o("openRagEval"))
          }, [
            ne(H(Ir), { size: 15 }),
            T[39] || (T[39] = me("前往 RAG 评测"))
          ])
        ])) : l.value === "memory" ? (E(), C("div", J_, T[40] || (T[40] = [
          u("p", null, "会话记忆按对话窗口隔离，长期记忆与角色绑定。", -1),
          u("small", null, "清理操作继续在对应对话或接入窗口执行，避免误清其他会话。", -1)
        ]))) : l.value === "extensions" ? (E(), C("div", Q_, [
          u("p", null, "当前角色可配置 " + A(B.draft.capabilities.packages.length) + " 项扩展能力。", 1),
          T[41] || (T[41] = u("small", null, "选择画布中的 Skill 或 Tool 查看依赖并设置角色策略；依赖只在选中时展开。", -1))
        ])) : l.value === "voice" ? (E(), C("div", e0, [
          u("label", t0, [
            u("input", {
              type: "checkbox",
              checked: !!((V = ($ = B.draft.persona.profile) == null ? void 0 : $.tts) != null && V.enabled),
              onChange: T[13] || (T[13] = (se) => I("enabled", se.target.checked))
            }, null, 40, n0),
            T[42] || (T[42] = u("span", null, "生成语音", -1))
          ]),
          u("label", o0, [
            u("input", {
              type: "checkbox",
              checked: !!((F = (M = B.draft.persona.profile) == null ? void 0 : M.tts) != null && F.auto_play),
              onChange: T[14] || (T[14] = (se) => I("auto_play", se.target.checked))
            }, null, 40, s0),
            T[43] || (T[43] = u("span", null, "自动播放", -1))
          ]),
          u("label", null, [
            T[45] || (T[45] = u("span", null, "角色音色", -1)),
            u("select", {
              value: String(((te = (q = B.draft.persona.profile) == null ? void 0 : q.tts) == null ? void 0 : te.voice_asset_id) || ""),
              onChange: T[15] || (T[15] = (se) => I("voice_asset_id", se.target.value))
            }, [
              T[44] || (T[44] = u("option", { value: "" }, "不绑定音色", -1)),
              (E(!0), C(_e, null, Re((ce = B.draft.resources) == null ? void 0 : ce.voiceAssets, (se) => (E(), C("option", {
                key: se.id,
                value: se.id
              }, A(se.name), 9, r0))), 128))
            ], 40, i0)
          ]),
          u("label", null, [
            T[47] || (T[47] = u("span", null, "输出语言", -1)),
            u("select", {
              value: String(((le = (fe = B.draft.persona.profile) == null ? void 0 : fe.tts) == null ? void 0 : le.output_language) || "auto"),
              onChange: T[16] || (T[16] = (se) => I("output_language", se.target.value))
            }, T[46] || (T[46] = [
              u("option", { value: "auto" }, "自动", -1),
              u("option", { value: "zh" }, "中文", -1),
              u("option", { value: "ja" }, "日语", -1),
              u("option", { value: "en" }, "英语", -1)
            ]), 40, l0)
          ]),
          u("div", a0, [
            u("button", {
              type: "button",
              class: "inspect-action",
              disabled: !((pe = (he = B.draft.persona.profile) == null ? void 0 : he.tts) != null && pe.voice_asset_id),
              onClick: T[17] || (T[17] = (se) => o("previewVoice"))
            }, [
              ne(H(Wd), { size: 15 }),
              T[48] || (T[48] = me("试听"))
            ], 8, u0),
            u("button", {
              type: "button",
              class: "inspect-action",
              onClick: T[18] || (T[18] = (se) => o("openVoiceStudio"))
            }, [
              ne(H(Ir), { size: 15 }),
              T[49] || (T[49] = me("声音工坊"))
            ])
          ])
        ])) : l.value === "live2d" ? (E(), C("div", c0, [
          u("section", d0, [
            T[50] || (T[50] = u("span", null, "当前角色绑定", -1)),
            u("strong", null, A(f.value || "未绑定模型"), 1),
            f.value ? (E(), C("button", {
              key: 0,
              type: "button",
              disabled: B.disabled,
              onClick: T[19] || (T[19] = (se) => N(""))
            }, "解除绑定", 8, f0)) : oe("", !0)
          ]),
          u("div", p0, [
            u("button", {
              type: "button",
              disabled: B.disabled,
              title: "重新扫描模型",
              onClick: T[20] || (T[20] = (se) => o("refreshLive2d"))
            }, [
              ne(H(Dt), { size: 15 }),
              T[51] || (T[51] = me("刷新"))
            ], 8, h0),
            u("button", {
              type: "button",
              disabled: B.disabled,
              title: "打开 Live2D 模型文件夹",
              onClick: T[21] || (T[21] = (se) => o("openLive2dDirectory"))
            }, [
              ne(H(Ko), { size: 15 }),
              T[52] || (T[52] = me("打开文件夹"))
            ], 8, v0)
          ]),
          u("div", g0, [
            T[53] || (T[53] = u("strong", null, "已安装模型", -1)),
            u("span", null, A(h.value.length) + " 个", 1)
          ]),
          h.value.length ? (E(), C("ul", m0, [
            (E(!0), C(_e, null, Re(h.value, (se) => (E(), C("li", {
              key: se.id,
              class: ge({ bound: f.value === se.id, incompatible: se.compatible === !1 })
            }, [
              u("div", y0, [
                u("strong", null, A(se.name), 1),
                u("span", null, A(w(se)), 1)
              ]),
              u("div", b0, [
                u("span", {
                  class: ge(se.compatible === !1 ? "is-error" : "is-compatible")
                }, A(se.compatible === !1 ? "不兼容" : "兼容"), 3),
                f.value === se.id ? (E(), C("button", _0, [
                  ne(H(Jn), { size: 14 }),
                  T[54] || (T[54] = me("已绑定"))
                ])) : (E(), C("button", {
                  key: 1,
                  type: "button",
                  disabled: B.disabled || se.compatible === !1,
                  title: se.compatible === !1 ? "当前 Live2D 运行时不支持此 MOC3 版本" : `绑定 ${se.name}`,
                  onClick: (xe) => N(se.id)
                }, "绑定", 8, w0))
              ])
            ], 2))), 128))
          ])) : (E(), C("div", k0, T[55] || (T[55] = [
            u("strong", null, "尚未发现模型", -1),
            u("p", null, "将模型文件夹放入 data/live2d 后刷新。", -1)
          ]))),
          T[56] || (T[56] = u("p", { class: "live2d-save-hint" }, "绑定修改会随页面顶部“保存配置”一起生效。", -1))
        ])) : l.value === "skill" || l.value === "tool" ? (E(), C("div", E0, [
          a.value ? (E(), C("label", x0, [
            T[58] || (T[58] = u("span", null, "角色策略", -1)),
            u("select", {
              value: d.value,
              onChange: T[22] || (T[22] = (se) => o("capability", B.node.id, se.target.value))
            }, T[57] || (T[57] = [
              u("option", { value: "inherit" }, "继承默认", -1),
              u("option", { value: "allow" }, "允许", -1),
              u("option", { value: "deny" }, "禁用", -1)
            ]), 40, S0)
          ])) : (E(), C("p", C0, "此 Tool 由上级能力包管理，不单独保存开关。")),
          a.value ? (E(), C("div", $0, [
            T[59] || (T[59] = u("b", null, "依赖", -1)),
            (E(!0), C(_e, null, Re(a.value.dependencies, (se) => (E(), C("p", {
              key: se.id || se.name
            }, [
              u("span", null, A(se.name), 1),
              u("em", null, A(se.server || se.source), 1)
            ]))), 128))
          ])) : oe("", !0)
        ])) : l.value === "mcp" && c.value ? (E(), C("div", I0, [
          u("label", N0, [
            u("input", {
              type: "checkbox",
              checked: c.value.authorized,
              disabled: c.value.global,
              onChange: T[23] || (T[23] = (se) => o("server", c.value.name, se.target.checked))
            }, null, 40, T0),
            u("span", null, A(c.value.global ? "全局授权" : "允许当前角色使用"), 1)
          ]),
          u("p", null, A(c.value.description || "MCP 服务"), 1),
          u("small", null, "连接状态：" + A(((be = c.value.status) == null ? void 0 : be.status) || "unknown"), 1)
        ])) : oe("", !0)
      ], 10, I_);
    };
  }
});
function Si(e) {
  return nl() ? (Ls(e), !0) : !1;
}
function dn(e) {
  return typeof e == "function" ? e() : H(e);
}
const O0 = typeof window < "u" && typeof document < "u", P0 = (e) => typeof e < "u", A0 = Object.prototype.toString, D0 = (e) => A0.call(e) === "[object Object]", R0 = () => {
};
function L0(e, t) {
  function n(...o) {
    return new Promise((s, i) => {
      Promise.resolve(e(() => t.apply(this, o), { fn: t, thisArg: this, args: o })).then(s).catch(i);
    });
  }
  return n;
}
const $f = (e) => e();
function V0(e = $f) {
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
  return { isActive: ll(t), pause: n, resume: o, eventFilter: s };
}
function ju(e, t = !1, n = "Timeout") {
  return new Promise((o, s) => {
    setTimeout(t ? () => s(n) : o, e);
  });
}
function z0(e, t, n = {}) {
  const {
    eventFilter: o = $f,
    ...s
  } = n;
  return Me(
    e,
    L0(
      o,
      t
    ),
    s
  );
}
function co(e, t, n = {}) {
  const {
    eventFilter: o,
    ...s
  } = n, { eventFilter: i, pause: r, resume: l, isActive: a } = V0(o);
  return { stop: z0(
    e,
    t,
    {
      ...s,
      eventFilter: i
    }
  ), pause: r, resume: l, isActive: a };
}
function F0(e, t = {}) {
  if (!tt(e))
    return wh(e);
  const n = Array.isArray(e.value) ? Array.from({ length: e.value.length }) : {};
  for (const o in e.value)
    n[o] = _h(() => ({
      get() {
        return e.value[o];
      },
      set(s) {
        var i;
        if ((i = dn(t.replaceRef)) != null ? i : !0)
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
function Dr(e, t = !1) {
  function n(f, { flush: h = "sync", deep: v = !1, timeout: w, throwOnTimeout: x } = {}) {
    let I = null;
    const D = [new Promise((y) => {
      I = Me(
        e,
        (_) => {
          f(_) !== t && (I == null || I(), y(_));
        },
        {
          flush: h,
          deep: v,
          immediate: !0
        }
      );
    })];
    return w != null && D.push(
      ju(w, x).then(() => dn(e)).finally(() => I == null ? void 0 : I())
    ), Promise.race(D);
  }
  function o(f, h) {
    if (!tt(f))
      return n((_) => _ === f, h);
    const { flush: v = "sync", deep: w = !1, timeout: x, throwOnTimeout: I } = h ?? {};
    let N = null;
    const y = [new Promise((_) => {
      N = Me(
        [e, f],
        ([R, X]) => {
          t !== (R === X) && (N == null || N(), _(R));
        },
        {
          flush: v,
          deep: w,
          immediate: !0
        }
      );
    })];
    return x != null && y.push(
      ju(x, I).then(() => dn(e)).finally(() => (N == null || N(), dn(e)))
    ), Promise.race(y);
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
      return w.includes(f) || w.includes(dn(f));
    }, h);
  }
  function c(f) {
    return d(1, f);
  }
  function d(f = 1, h) {
    let v = -1;
    return n(() => (v += 1, v >= f), h);
  }
  return Array.isArray(dn(e)) ? {
    toMatch: n,
    toContains: a,
    changed: c,
    changedTimes: d,
    get not() {
      return Dr(e, !t);
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
      return Dr(e, !t);
    }
  };
}
function Rr(e) {
  return Dr(e);
}
function B0(e) {
  var t;
  const n = dn(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const If = O0 ? window : void 0;
function Nf(...e) {
  let t, n, o, s;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, s] = e, t = If) : [t, n, o, s] = e, !t)
    return R0;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const i = [], r = () => {
    i.forEach((d) => d()), i.length = 0;
  }, l = (d, f, h, v) => (d.addEventListener(f, h, v), () => d.removeEventListener(f, h, v)), a = Me(
    () => [B0(t), dn(s)],
    ([d, f]) => {
      if (r(), !d)
        return;
      const h = D0(f) ? { ...f } : f;
      i.push(
        ...n.flatMap((v) => o.map((w) => l(d, v, w, h)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    a(), r();
  };
  return Si(c), c;
}
function H0(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Gu(...e) {
  let t, n, o = {};
  e.length === 3 ? (t = e[0], n = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: s = If,
    eventName: i = "keydown",
    passive: r = !1,
    dedupe: l = !1
  } = o, a = H0(t);
  return Nf(s, i, (d) => {
    d.repeat && dn(l) || a(d) && n(d);
  }, r);
}
function U0(e) {
  return JSON.parse(JSON.stringify(e));
}
function or(e, t, n, o = {}) {
  var s, i, r;
  const {
    clone: l = !1,
    passive: a = !1,
    eventName: c,
    deep: d = !1,
    defaultValue: f,
    shouldEmit: h
  } = o, v = To(), w = n || (v == null ? void 0 : v.emit) || ((s = v == null ? void 0 : v.$emit) == null ? void 0 : s.bind(v)) || ((r = (i = v == null ? void 0 : v.proxy) == null ? void 0 : i.$emit) == null ? void 0 : r.bind(v == null ? void 0 : v.proxy));
  let x = c;
  t || (t = "modelValue"), x = x || `update:${t.toString()}`;
  const I = (y) => l ? typeof l == "function" ? l(y) : U0(y) : y, N = () => P0(e[t]) ? I(e[t]) : f, D = (y) => {
    h ? h(y) && w(x, y) : w(x, y);
  };
  if (a) {
    const y = N(), _ = ee(y);
    let R = !1;
    return Me(
      () => e[t],
      (X) => {
        R || (R = !0, _.value = I(X), ft(() => R = !1));
      }
    ), Me(
      _,
      (X) => {
        !R && (X !== e[t] || d) && D(X);
      },
      { deep: d }
    ), _;
  } else
    return ae({
      get() {
        return N();
      },
      set(y) {
        D(y);
      }
    });
}
var j0 = { value: () => {
} };
function Ci() {
  for (var e = 0, t = arguments.length, n = {}, o; e < t; ++e) {
    if (!(o = arguments[e] + "") || o in n || /[\s.]/.test(o))
      throw new Error("illegal type: " + o);
    n[o] = [];
  }
  return new Hs(n);
}
function Hs(e) {
  this._ = e;
}
function G0(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var o = "", s = n.indexOf(".");
    if (s >= 0 && (o = n.slice(s + 1), n = n.slice(0, s)), n && !t.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: o };
  });
}
Hs.prototype = Ci.prototype = {
  constructor: Hs,
  on: function(e, t) {
    var n = this._, o = G0(e + "", n), s, i = -1, r = o.length;
    if (arguments.length < 2) {
      for (; ++i < r; )
        if ((s = (e = o[i]).type) && (s = q0(n[s], e.name)))
          return s;
      return;
    }
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++i < r; )
      if (s = (e = o[i]).type)
        n[s] = qu(n[s], e.name, t);
      else if (t == null)
        for (s in n)
          n[s] = qu(n[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t)
      e[n] = t[n].slice();
    return new Hs(e);
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
function q0(e, t) {
  for (var n = 0, o = e.length, s; n < o; ++n)
    if ((s = e[n]).name === t)
      return s.value;
}
function qu(e, t, n) {
  for (var o = 0, s = e.length; o < s; ++o)
    if (e[o].name === t) {
      e[o] = j0, e = e.slice(0, o).concat(e.slice(o + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var Lr = "http://www.w3.org/1999/xhtml";
const Yu = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Lr,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function $i(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Yu.hasOwnProperty(t) ? { space: Yu[t], local: e } : e;
}
function Y0(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Lr && t.documentElement.namespaceURI === Lr ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function X0(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Tf(e) {
  var t = $i(e);
  return (t.local ? X0 : Y0)(t);
}
function K0() {
}
function kl(e) {
  return e == null ? K0 : function() {
    return this.querySelector(e);
  };
}
function W0(e) {
  typeof e != "function" && (e = kl(e));
  for (var t = this._groups, n = t.length, o = new Array(n), s = 0; s < n; ++s)
    for (var i = t[s], r = i.length, l = o[s] = new Array(r), a, c, d = 0; d < r; ++d)
      (a = i[d]) && (c = e.call(a, a.__data__, d, i)) && ("__data__" in a && (c.__data__ = a.__data__), l[d] = c);
  return new Ot(o, this._parents);
}
function Z0(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function J0() {
  return [];
}
function Mf(e) {
  return e == null ? J0 : function() {
    return this.querySelectorAll(e);
  };
}
function Q0(e) {
  return function() {
    return Z0(e.apply(this, arguments));
  };
}
function ew(e) {
  typeof e == "function" ? e = Q0(e) : e = Mf(e);
  for (var t = this._groups, n = t.length, o = [], s = [], i = 0; i < n; ++i)
    for (var r = t[i], l = r.length, a, c = 0; c < l; ++c)
      (a = r[c]) && (o.push(e.call(a, a.__data__, c, r)), s.push(a));
  return new Ot(o, s);
}
function Of(e) {
  return function() {
    return this.matches(e);
  };
}
function Pf(e) {
  return function(t) {
    return t.matches(e);
  };
}
var tw = Array.prototype.find;
function nw(e) {
  return function() {
    return tw.call(this.children, e);
  };
}
function ow() {
  return this.firstElementChild;
}
function sw(e) {
  return this.select(e == null ? ow : nw(typeof e == "function" ? e : Pf(e)));
}
var iw = Array.prototype.filter;
function rw() {
  return Array.from(this.children);
}
function lw(e) {
  return function() {
    return iw.call(this.children, e);
  };
}
function aw(e) {
  return this.selectAll(e == null ? rw : lw(typeof e == "function" ? e : Pf(e)));
}
function uw(e) {
  typeof e != "function" && (e = Of(e));
  for (var t = this._groups, n = t.length, o = new Array(n), s = 0; s < n; ++s)
    for (var i = t[s], r = i.length, l = o[s] = [], a, c = 0; c < r; ++c)
      (a = i[c]) && e.call(a, a.__data__, c, i) && l.push(a);
  return new Ot(o, this._parents);
}
function Af(e) {
  return new Array(e.length);
}
function cw() {
  return new Ot(this._enter || this._groups.map(Af), this._parents);
}
function ni(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
ni.prototype = {
  constructor: ni,
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
function dw(e) {
  return function() {
    return e;
  };
}
function fw(e, t, n, o, s, i) {
  for (var r = 0, l, a = t.length, c = i.length; r < c; ++r)
    (l = t[r]) ? (l.__data__ = i[r], o[r] = l) : n[r] = new ni(e, i[r]);
  for (; r < a; ++r)
    (l = t[r]) && (s[r] = l);
}
function pw(e, t, n, o, s, i, r) {
  var l, a, c = /* @__PURE__ */ new Map(), d = t.length, f = i.length, h = new Array(d), v;
  for (l = 0; l < d; ++l)
    (a = t[l]) && (h[l] = v = r.call(a, a.__data__, l, t) + "", c.has(v) ? s[l] = a : c.set(v, a));
  for (l = 0; l < f; ++l)
    v = r.call(e, i[l], l, i) + "", (a = c.get(v)) ? (o[l] = a, a.__data__ = i[l], c.delete(v)) : n[l] = new ni(e, i[l]);
  for (l = 0; l < d; ++l)
    (a = t[l]) && c.get(h[l]) === a && (s[l] = a);
}
function hw(e) {
  return e.__data__;
}
function vw(e, t) {
  if (!arguments.length)
    return Array.from(this, hw);
  var n = t ? pw : fw, o = this._parents, s = this._groups;
  typeof e != "function" && (e = dw(e));
  for (var i = s.length, r = new Array(i), l = new Array(i), a = new Array(i), c = 0; c < i; ++c) {
    var d = o[c], f = s[c], h = f.length, v = gw(e.call(d, d && d.__data__, c, o)), w = v.length, x = l[c] = new Array(w), I = r[c] = new Array(w), N = a[c] = new Array(h);
    n(d, f, x, I, N, v, t);
    for (var D = 0, y = 0, _, R; D < w; ++D)
      if (_ = x[D]) {
        for (D >= y && (y = D + 1); !(R = I[y]) && ++y < w; )
          ;
        _._next = R || null;
      }
  }
  return r = new Ot(r, o), r._enter = l, r._exit = a, r;
}
function gw(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function mw() {
  return new Ot(this._exit || this._groups.map(Af), this._parents);
}
function yw(e, t, n) {
  var o = this.enter(), s = this, i = this.exit();
  return typeof e == "function" ? (o = e(o), o && (o = o.selection())) : o = o.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), n == null ? i.remove() : n(i), o && s ? o.merge(s).order() : s;
}
function bw(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, o = t._groups, s = n.length, i = o.length, r = Math.min(s, i), l = new Array(s), a = 0; a < r; ++a)
    for (var c = n[a], d = o[a], f = c.length, h = l[a] = new Array(f), v, w = 0; w < f; ++w)
      (v = c[w] || d[w]) && (h[w] = v);
  for (; a < s; ++a)
    l[a] = n[a];
  return new Ot(l, this._parents);
}
function _w() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var o = e[t], s = o.length - 1, i = o[s], r; --s >= 0; )
      (r = o[s]) && (i && r.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(r, i), i = r);
  return this;
}
function ww(e) {
  e || (e = kw);
  function t(f, h) {
    return f && h ? e(f.__data__, h.__data__) : !f - !h;
  }
  for (var n = this._groups, o = n.length, s = new Array(o), i = 0; i < o; ++i) {
    for (var r = n[i], l = r.length, a = s[i] = new Array(l), c, d = 0; d < l; ++d)
      (c = r[d]) && (a[d] = c);
    a.sort(t);
  }
  return new Ot(s, this._parents).order();
}
function kw(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Ew() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function xw() {
  return Array.from(this);
}
function Sw() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], s = 0, i = o.length; s < i; ++s) {
      var r = o[s];
      if (r)
        return r;
    }
  return null;
}
function Cw() {
  let e = 0;
  for (const t of this)
    ++e;
  return e;
}
function $w() {
  return !this.node();
}
function Iw(e) {
  for (var t = this._groups, n = 0, o = t.length; n < o; ++n)
    for (var s = t[n], i = 0, r = s.length, l; i < r; ++i)
      (l = s[i]) && e.call(l, l.__data__, i, s);
  return this;
}
function Nw(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Tw(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Mw(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Ow(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Pw(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function Aw(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Dw(e, t) {
  var n = $i(e);
  if (arguments.length < 2) {
    var o = this.node();
    return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n);
  }
  return this.each((t == null ? n.local ? Tw : Nw : typeof t == "function" ? n.local ? Aw : Pw : n.local ? Ow : Mw)(n, t));
}
function Df(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Rw(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Lw(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function Vw(e, t, n) {
  return function() {
    var o = t.apply(this, arguments);
    o == null ? this.style.removeProperty(e) : this.style.setProperty(e, o, n);
  };
}
function zw(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? Rw : typeof t == "function" ? Vw : Lw)(e, t, n ?? "")) : Co(this.node(), e);
}
function Co(e, t) {
  return e.style.getPropertyValue(t) || Df(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Fw(e) {
  return function() {
    delete this[e];
  };
}
function Bw(e, t) {
  return function() {
    this[e] = t;
  };
}
function Hw(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function Uw(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Fw : typeof t == "function" ? Hw : Bw)(e, t)) : this.node()[e];
}
function Rf(e) {
  return e.trim().split(/^|\s+/);
}
function El(e) {
  return e.classList || new Lf(e);
}
function Lf(e) {
  this._node = e, this._names = Rf(e.getAttribute("class") || "");
}
Lf.prototype = {
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
function Vf(e, t) {
  for (var n = El(e), o = -1, s = t.length; ++o < s; )
    n.add(t[o]);
}
function zf(e, t) {
  for (var n = El(e), o = -1, s = t.length; ++o < s; )
    n.remove(t[o]);
}
function jw(e) {
  return function() {
    Vf(this, e);
  };
}
function Gw(e) {
  return function() {
    zf(this, e);
  };
}
function qw(e, t) {
  return function() {
    (t.apply(this, arguments) ? Vf : zf)(this, e);
  };
}
function Yw(e, t) {
  var n = Rf(e + "");
  if (arguments.length < 2) {
    for (var o = El(this.node()), s = -1, i = n.length; ++s < i; )
      if (!o.contains(n[s]))
        return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? qw : t ? jw : Gw)(n, t));
}
function Xw() {
  this.textContent = "";
}
function Kw(e) {
  return function() {
    this.textContent = e;
  };
}
function Ww(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function Zw(e) {
  return arguments.length ? this.each(e == null ? Xw : (typeof e == "function" ? Ww : Kw)(e)) : this.node().textContent;
}
function Jw() {
  this.innerHTML = "";
}
function Qw(e) {
  return function() {
    this.innerHTML = e;
  };
}
function ek(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function tk(e) {
  return arguments.length ? this.each(e == null ? Jw : (typeof e == "function" ? ek : Qw)(e)) : this.node().innerHTML;
}
function nk() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function ok() {
  return this.each(nk);
}
function sk() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function ik() {
  return this.each(sk);
}
function rk(e) {
  var t = typeof e == "function" ? e : Tf(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function lk() {
  return null;
}
function ak(e, t) {
  var n = typeof e == "function" ? e : Tf(e), o = t == null ? lk : typeof t == "function" ? t : kl(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function uk() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function ck() {
  return this.each(uk);
}
function dk() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function fk() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function pk(e) {
  return this.select(e ? fk : dk);
}
function hk(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function vk(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function gk(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", o = t.indexOf(".");
    return o >= 0 && (n = t.slice(o + 1), t = t.slice(0, o)), { type: t, name: n };
  });
}
function mk(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, o = -1, s = t.length, i; n < s; ++n)
        i = t[n], (!e.type || i.type === e.type) && i.name === e.name ? this.removeEventListener(i.type, i.listener, i.options) : t[++o] = i;
      ++o ? t.length = o : delete this.__on;
    }
  };
}
function yk(e, t, n) {
  return function() {
    var o = this.__on, s, i = vk(t);
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
function bk(e, t, n) {
  var o = gk(e + ""), s, i = o.length, r;
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
  for (l = t ? yk : mk, s = 0; s < i; ++s)
    this.each(l(o[s], t, n));
  return this;
}
function Ff(e, t, n) {
  var o = Df(e), s = o.CustomEvent;
  typeof s == "function" ? s = new s(t, n) : (s = o.document.createEvent("Event"), n ? (s.initEvent(t, n.bubbles, n.cancelable), s.detail = n.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function _k(e, t) {
  return function() {
    return Ff(this, e, t);
  };
}
function wk(e, t) {
  return function() {
    return Ff(this, e, t.apply(this, arguments));
  };
}
function kk(e, t) {
  return this.each((typeof t == "function" ? wk : _k)(e, t));
}
function* Ek() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], s = 0, i = o.length, r; s < i; ++s)
      (r = o[s]) && (yield r);
}
var Bf = [null];
function Ot(e, t) {
  this._groups = e, this._parents = t;
}
function ms() {
  return new Ot([[document.documentElement]], Bf);
}
function xk() {
  return this;
}
Ot.prototype = ms.prototype = {
  constructor: Ot,
  select: W0,
  selectAll: ew,
  selectChild: sw,
  selectChildren: aw,
  filter: uw,
  data: vw,
  enter: cw,
  exit: mw,
  join: yw,
  merge: bw,
  selection: xk,
  order: _w,
  sort: ww,
  call: Ew,
  nodes: xw,
  node: Sw,
  size: Cw,
  empty: $w,
  each: Iw,
  attr: Dw,
  style: zw,
  property: Uw,
  classed: Yw,
  text: Zw,
  html: tk,
  raise: ok,
  lower: ik,
  append: rk,
  insert: ak,
  remove: ck,
  clone: pk,
  datum: hk,
  on: bk,
  dispatch: kk,
  [Symbol.iterator]: Ek
};
function Ht(e) {
  return typeof e == "string" ? new Ot([[document.querySelector(e)]], [document.documentElement]) : new Ot([[e]], Bf);
}
function Sk(e) {
  let t;
  for (; t = e.sourceEvent; )
    e = t;
  return e;
}
function Wt(e, t) {
  if (e = Sk(e), t === void 0 && (t = e.currentTarget), t) {
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
const Ck = { passive: !1 }, is = { capture: !0, passive: !1 };
function sr(e) {
  e.stopImmediatePropagation();
}
function _o(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Hf(e) {
  var t = e.document.documentElement, n = Ht(e).on("dragstart.drag", _o, is);
  "onselectstart" in t ? n.on("selectstart.drag", _o, is) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Uf(e, t) {
  var n = e.document.documentElement, o = Ht(e).on("dragstart.drag", null);
  t && (o.on("click.drag", _o, is), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in n ? o.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const $s = (e) => () => e;
function Vr(e, {
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
Vr.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function $k(e) {
  return !e.ctrlKey && !e.button;
}
function Ik() {
  return this.parentNode;
}
function Nk(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function Tk() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Mk() {
  var e = $k, t = Ik, n = Nk, o = Tk, s = {}, i = Ci("start", "drag", "end"), r = 0, l, a, c, d, f = 0;
  function h(_) {
    _.on("mousedown.drag", v).filter(o).on("touchstart.drag", I).on("touchmove.drag", N, Ck).on("touchend.drag touchcancel.drag", D).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function v(_, R) {
    if (!(d || !e.call(this, _, R))) {
      var X = y(this, t.call(this, _, R), _, R, "mouse");
      X && (Ht(_.view).on("mousemove.drag", w, is).on("mouseup.drag", x, is), Hf(_.view), sr(_), c = !1, l = _.clientX, a = _.clientY, X("start", _));
    }
  }
  function w(_) {
    if (_o(_), !c) {
      var R = _.clientX - l, X = _.clientY - a;
      c = R * R + X * X > f;
    }
    s.mouse("drag", _);
  }
  function x(_) {
    Ht(_.view).on("mousemove.drag mouseup.drag", null), Uf(_.view, c), _o(_), s.mouse("end", _);
  }
  function I(_, R) {
    if (e.call(this, _, R)) {
      var X = _.changedTouches, Q = t.call(this, _, R), B = X.length, T, L;
      for (T = 0; T < B; ++T)
        (L = y(this, Q, _, R, X[T].identifier, X[T])) && (sr(_), L("start", _, X[T]));
    }
  }
  function N(_) {
    var R = _.changedTouches, X = R.length, Q, B;
    for (Q = 0; Q < X; ++Q)
      (B = s[R[Q].identifier]) && (_o(_), B("drag", _, R[Q]));
  }
  function D(_) {
    var R = _.changedTouches, X = R.length, Q, B;
    for (d && clearTimeout(d), d = setTimeout(function() {
      d = null;
    }, 500), Q = 0; Q < X; ++Q)
      (B = s[R[Q].identifier]) && (sr(_), B("end", _, R[Q]));
  }
  function y(_, R, X, Q, B, T) {
    var L = i.copy(), Y = Wt(T || X, R), U, G, $;
    if (($ = n.call(_, new Vr("beforestart", {
      sourceEvent: X,
      target: h,
      identifier: B,
      active: r,
      x: Y[0],
      y: Y[1],
      dx: 0,
      dy: 0,
      dispatch: L
    }), Q)) != null)
      return U = $.x - Y[0] || 0, G = $.y - Y[1] || 0, function V(M, F, q) {
        var te = Y, ce;
        switch (M) {
          case "start":
            s[B] = V, ce = r++;
            break;
          case "end":
            delete s[B], --r;
          case "drag":
            Y = Wt(q || F, R), ce = r;
            break;
        }
        L.call(
          M,
          _,
          new Vr(M, {
            sourceEvent: F,
            subject: $,
            target: h,
            identifier: B,
            active: ce,
            x: Y[0] + U,
            y: Y[1] + G,
            dx: Y[0] - te[0],
            dy: Y[1] - te[1],
            dispatch: L
          }),
          Q
        );
      };
  }
  return h.filter = function(_) {
    return arguments.length ? (e = typeof _ == "function" ? _ : $s(!!_), h) : e;
  }, h.container = function(_) {
    return arguments.length ? (t = typeof _ == "function" ? _ : $s(_), h) : t;
  }, h.subject = function(_) {
    return arguments.length ? (n = typeof _ == "function" ? _ : $s(_), h) : n;
  }, h.touchable = function(_) {
    return arguments.length ? (o = typeof _ == "function" ? _ : $s(!!_), h) : o;
  }, h.on = function() {
    var _ = i.on.apply(i, arguments);
    return _ === i ? h : _;
  }, h.clickDistance = function(_) {
    return arguments.length ? (f = (_ = +_) * _, h) : Math.sqrt(f);
  }, h;
}
function xl(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function jf(e, t) {
  var n = Object.create(e.prototype);
  for (var o in t)
    n[o] = t[o];
  return n;
}
function ys() {
}
var rs = 0.7, oi = 1 / rs, wo = "\\s*([+-]?\\d+)\\s*", ls = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", en = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Ok = /^#([0-9a-f]{3,8})$/, Pk = new RegExp(`^rgb\\(${wo},${wo},${wo}\\)$`), Ak = new RegExp(`^rgb\\(${en},${en},${en}\\)$`), Dk = new RegExp(`^rgba\\(${wo},${wo},${wo},${ls}\\)$`), Rk = new RegExp(`^rgba\\(${en},${en},${en},${ls}\\)$`), Lk = new RegExp(`^hsl\\(${ls},${en},${en}\\)$`), Vk = new RegExp(`^hsla\\(${ls},${en},${en},${ls}\\)$`), Xu = {
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
xl(ys, as, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: Ku,
  // Deprecated! Use color.formatHex.
  formatHex: Ku,
  formatHex8: zk,
  formatHsl: Fk,
  formatRgb: Wu,
  toString: Wu
});
function Ku() {
  return this.rgb().formatHex();
}
function zk() {
  return this.rgb().formatHex8();
}
function Fk() {
  return Gf(this).formatHsl();
}
function Wu() {
  return this.rgb().formatRgb();
}
function as(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = Ok.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? Zu(t) : n === 3 ? new Nt(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Is(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Is(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Pk.exec(e)) ? new Nt(t[1], t[2], t[3], 1) : (t = Ak.exec(e)) ? new Nt(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Dk.exec(e)) ? Is(t[1], t[2], t[3], t[4]) : (t = Rk.exec(e)) ? Is(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Lk.exec(e)) ? ec(t[1], t[2] / 100, t[3] / 100, 1) : (t = Vk.exec(e)) ? ec(t[1], t[2] / 100, t[3] / 100, t[4]) : Xu.hasOwnProperty(e) ? Zu(Xu[e]) : e === "transparent" ? new Nt(NaN, NaN, NaN, 0) : null;
}
function Zu(e) {
  return new Nt(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Is(e, t, n, o) {
  return o <= 0 && (e = t = n = NaN), new Nt(e, t, n, o);
}
function Bk(e) {
  return e instanceof ys || (e = as(e)), e ? (e = e.rgb(), new Nt(e.r, e.g, e.b, e.opacity)) : new Nt();
}
function zr(e, t, n, o) {
  return arguments.length === 1 ? Bk(e) : new Nt(e, t, n, o ?? 1);
}
function Nt(e, t, n, o) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +o;
}
xl(Nt, zr, jf(ys, {
  brighter(e) {
    return e = e == null ? oi : Math.pow(oi, e), new Nt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? rs : Math.pow(rs, e), new Nt(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Nt(Qn(this.r), Qn(this.g), Qn(this.b), si(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: Ju,
  // Deprecated! Use color.formatHex.
  formatHex: Ju,
  formatHex8: Hk,
  formatRgb: Qu,
  toString: Qu
}));
function Ju() {
  return `#${Kn(this.r)}${Kn(this.g)}${Kn(this.b)}`;
}
function Hk() {
  return `#${Kn(this.r)}${Kn(this.g)}${Kn(this.b)}${Kn((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function Qu() {
  const e = si(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${Qn(this.r)}, ${Qn(this.g)}, ${Qn(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function si(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function Qn(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function Kn(e) {
  return e = Qn(e), (e < 16 ? "0" : "") + e.toString(16);
}
function ec(e, t, n, o) {
  return o <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Ut(e, t, n, o);
}
function Gf(e) {
  if (e instanceof Ut)
    return new Ut(e.h, e.s, e.l, e.opacity);
  if (e instanceof ys || (e = as(e)), !e)
    return new Ut();
  if (e instanceof Ut)
    return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, o = e.b / 255, s = Math.min(t, n, o), i = Math.max(t, n, o), r = NaN, l = i - s, a = (i + s) / 2;
  return l ? (t === i ? r = (n - o) / l + (n < o) * 6 : n === i ? r = (o - t) / l + 2 : r = (t - n) / l + 4, l /= a < 0.5 ? i + s : 2 - i - s, r *= 60) : l = a > 0 && a < 1 ? 0 : r, new Ut(r, l, a, e.opacity);
}
function Uk(e, t, n, o) {
  return arguments.length === 1 ? Gf(e) : new Ut(e, t, n, o ?? 1);
}
function Ut(e, t, n, o) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +o;
}
xl(Ut, Uk, jf(ys, {
  brighter(e) {
    return e = e == null ? oi : Math.pow(oi, e), new Ut(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? rs : Math.pow(rs, e), new Ut(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, o = n + (n < 0.5 ? n : 1 - n) * t, s = 2 * n - o;
    return new Nt(
      ir(e >= 240 ? e - 240 : e + 120, s, o),
      ir(e, s, o),
      ir(e < 120 ? e + 240 : e - 120, s, o),
      this.opacity
    );
  },
  clamp() {
    return new Ut(tc(this.h), Ns(this.s), Ns(this.l), si(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = si(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${tc(this.h)}, ${Ns(this.s) * 100}%, ${Ns(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function tc(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ns(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function ir(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const qf = (e) => () => e;
function jk(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Gk(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(o) {
    return Math.pow(e + o * t, n);
  };
}
function qk(e) {
  return (e = +e) == 1 ? Yf : function(t, n) {
    return n - t ? Gk(t, n, e) : qf(isNaN(t) ? n : t);
  };
}
function Yf(e, t) {
  var n = t - e;
  return n ? jk(e, n) : qf(isNaN(e) ? t : e);
}
const nc = function e(t) {
  var n = qk(t);
  function o(s, i) {
    var r = n((s = zr(s)).r, (i = zr(i)).r), l = n(s.g, i.g), a = n(s.b, i.b), c = Yf(s.opacity, i.opacity);
    return function(d) {
      return s.r = r(d), s.g = l(d), s.b = a(d), s.opacity = c(d), s + "";
    };
  }
  return o.gamma = e, o;
}(1);
function Cn(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var Fr = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, rr = new RegExp(Fr.source, "g");
function Yk(e) {
  return function() {
    return e;
  };
}
function Xk(e) {
  return function(t) {
    return e(t) + "";
  };
}
function Kk(e, t) {
  var n = Fr.lastIndex = rr.lastIndex = 0, o, s, i, r = -1, l = [], a = [];
  for (e = e + "", t = t + ""; (o = Fr.exec(e)) && (s = rr.exec(t)); )
    (i = s.index) > n && (i = t.slice(n, i), l[r] ? l[r] += i : l[++r] = i), (o = o[0]) === (s = s[0]) ? l[r] ? l[r] += s : l[++r] = s : (l[++r] = null, a.push({ i: r, x: Cn(o, s) })), n = rr.lastIndex;
  return n < t.length && (i = t.slice(n), l[r] ? l[r] += i : l[++r] = i), l.length < 2 ? a[0] ? Xk(a[0].x) : Yk(t) : (t = a.length, function(c) {
    for (var d = 0, f; d < t; ++d)
      l[(f = a[d]).i] = f.x(c);
    return l.join("");
  });
}
var oc = 180 / Math.PI, Br = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Xf(e, t, n, o, s, i) {
  var r, l, a;
  return (r = Math.sqrt(e * e + t * t)) && (e /= r, t /= r), (a = e * n + t * o) && (n -= e * a, o -= t * a), (l = Math.sqrt(n * n + o * o)) && (n /= l, o /= l, a /= l), e * o < t * n && (e = -e, t = -t, a = -a, r = -r), {
    translateX: s,
    translateY: i,
    rotate: Math.atan2(t, e) * oc,
    skewX: Math.atan(a) * oc,
    scaleX: r,
    scaleY: l
  };
}
var Ts;
function Wk(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Br : Xf(t.a, t.b, t.c, t.d, t.e, t.f);
}
function Zk(e) {
  return e == null || (Ts || (Ts = document.createElementNS("http://www.w3.org/2000/svg", "g")), Ts.setAttribute("transform", e), !(e = Ts.transform.baseVal.consolidate())) ? Br : (e = e.matrix, Xf(e.a, e.b, e.c, e.d, e.e, e.f));
}
function Kf(e, t, n, o) {
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function i(c, d, f, h, v, w) {
    if (c !== f || d !== h) {
      var x = v.push("translate(", null, t, null, n);
      w.push({ i: x - 4, x: Cn(c, f) }, { i: x - 2, x: Cn(d, h) });
    } else (f || h) && v.push("translate(" + f + t + h + n);
  }
  function r(c, d, f, h) {
    c !== d ? (c - d > 180 ? d += 360 : d - c > 180 && (c += 360), h.push({ i: f.push(s(f) + "rotate(", null, o) - 2, x: Cn(c, d) })) : d && f.push(s(f) + "rotate(" + d + o);
  }
  function l(c, d, f, h) {
    c !== d ? h.push({ i: f.push(s(f) + "skewX(", null, o) - 2, x: Cn(c, d) }) : d && f.push(s(f) + "skewX(" + d + o);
  }
  function a(c, d, f, h, v, w) {
    if (c !== f || d !== h) {
      var x = v.push(s(v) + "scale(", null, ",", null, ")");
      w.push({ i: x - 4, x: Cn(c, f) }, { i: x - 2, x: Cn(d, h) });
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
var Jk = Kf(Wk, "px, ", "px)", "deg)"), Qk = Kf(Zk, ", ", ")", ")"), e2 = 1e-12;
function sc(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function t2(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function n2(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const o2 = function e(t, n, o) {
  function s(i, r) {
    var l = i[0], a = i[1], c = i[2], d = r[0], f = r[1], h = r[2], v = d - l, w = f - a, x = v * v + w * w, I, N;
    if (x < e2)
      N = Math.log(h / c) / t, I = function(Q) {
        return [
          l + Q * v,
          a + Q * w,
          c * Math.exp(t * Q * N)
        ];
      };
    else {
      var D = Math.sqrt(x), y = (h * h - c * c + o * x) / (2 * c * n * D), _ = (h * h - c * c - o * x) / (2 * h * n * D), R = Math.log(Math.sqrt(y * y + 1) - y), X = Math.log(Math.sqrt(_ * _ + 1) - _);
      N = (X - R) / t, I = function(Q) {
        var B = Q * N, T = sc(R), L = c / (n * D) * (T * n2(t * B + R) - t2(R));
        return [
          l + L * v,
          a + L * w,
          c * T / sc(t * B + R)
        ];
      };
    }
    return I.duration = N * 1e3 * t / Math.SQRT2, I;
  }
  return s.rho = function(i) {
    var r = Math.max(1e-3, +i), l = r * r, a = l * l;
    return e(r, l, a);
  }, s;
}(Math.SQRT2, 2, 4);
var $o = 0, Fo = 0, Ro = 0, Wf = 1e3, ii, Bo, ri = 0, so = 0, Ii = 0, us = typeof performance == "object" && performance.now ? performance : Date, Zf = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Sl() {
  return so || (Zf(s2), so = us.now() + Ii);
}
function s2() {
  so = 0;
}
function li() {
  this._call = this._time = this._next = null;
}
li.prototype = Jf.prototype = {
  constructor: li,
  restart: function(e, t, n) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? Sl() : +n) + (t == null ? 0 : +t), !this._next && Bo !== this && (Bo ? Bo._next = this : ii = this, Bo = this), this._call = e, this._time = n, Hr();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Hr());
  }
};
function Jf(e, t, n) {
  var o = new li();
  return o.restart(e, t, n), o;
}
function i2() {
  Sl(), ++$o;
  for (var e = ii, t; e; )
    (t = so - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --$o;
}
function ic() {
  so = (ri = us.now()) + Ii, $o = Fo = 0;
  try {
    i2();
  } finally {
    $o = 0, l2(), so = 0;
  }
}
function r2() {
  var e = us.now(), t = e - ri;
  t > Wf && (Ii -= t, ri = e);
}
function l2() {
  for (var e, t = ii, n, o = 1 / 0; t; )
    t._call ? (o > t._time && (o = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : ii = n);
  Bo = e, Hr(o);
}
function Hr(e) {
  if (!$o) {
    Fo && (Fo = clearTimeout(Fo));
    var t = e - so;
    t > 24 ? (e < 1 / 0 && (Fo = setTimeout(ic, e - us.now() - Ii)), Ro && (Ro = clearInterval(Ro))) : (Ro || (ri = us.now(), Ro = setInterval(r2, Wf)), $o = 1, Zf(ic));
  }
}
function rc(e, t, n) {
  var o = new li();
  return t = t == null ? 0 : +t, o.restart((s) => {
    o.stop(), e(s + t);
  }, t, n), o;
}
var a2 = Ci("start", "end", "cancel", "interrupt"), u2 = [], Qf = 0, lc = 1, Ur = 2, Us = 3, ac = 4, jr = 5, js = 6;
function Ni(e, t, n, o, s, i) {
  var r = e.__transition;
  if (!r)
    e.__transition = {};
  else if (n in r)
    return;
  c2(e, n, {
    name: t,
    index: o,
    // For context during callback.
    group: s,
    // For context during callback.
    on: a2,
    tween: u2,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: Qf
  });
}
function Cl(e, t) {
  var n = Yt(e, t);
  if (n.state > Qf)
    throw new Error("too late; already scheduled");
  return n;
}
function nn(e, t) {
  var n = Yt(e, t);
  if (n.state > Us)
    throw new Error("too late; already running");
  return n;
}
function Yt(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t]))
    throw new Error("transition not found");
  return n;
}
function c2(e, t, n) {
  var o = e.__transition, s;
  o[t] = n, n.timer = Jf(i, 0, n.time);
  function i(c) {
    n.state = lc, n.timer.restart(r, n.delay, n.time), n.delay <= c && r(c - n.delay);
  }
  function r(c) {
    var d, f, h, v;
    if (n.state !== lc)
      return a();
    for (d in o)
      if (v = o[d], v.name === n.name) {
        if (v.state === Us)
          return rc(r);
        v.state === ac ? (v.state = js, v.timer.stop(), v.on.call("interrupt", e, e.__data__, v.index, v.group), delete o[d]) : +d < t && (v.state = js, v.timer.stop(), v.on.call("cancel", e, e.__data__, v.index, v.group), delete o[d]);
      }
    if (rc(function() {
      n.state === Us && (n.state = ac, n.timer.restart(l, n.delay, n.time), l(c));
    }), n.state = Ur, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Ur) {
      for (n.state = Us, s = new Array(h = n.tween.length), d = 0, f = -1; d < h; ++d)
        (v = n.tween[d].value.call(e, e.__data__, n.index, n.group)) && (s[++f] = v);
      s.length = f + 1;
    }
  }
  function l(c) {
    for (var d = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(a), n.state = jr, 1), f = -1, h = s.length; ++f < h; )
      s[f].call(e, d);
    n.state === jr && (n.on.call("end", e, e.__data__, n.index, n.group), a());
  }
  function a() {
    n.state = js, n.timer.stop(), delete o[t];
    for (var c in o)
      return;
    delete e.__transition;
  }
}
function Gs(e, t) {
  var n = e.__transition, o, s, i = !0, r;
  if (n) {
    t = t == null ? null : t + "";
    for (r in n) {
      if ((o = n[r]).name !== t) {
        i = !1;
        continue;
      }
      s = o.state > Ur && o.state < jr, o.state = js, o.timer.stop(), o.on.call(s ? "interrupt" : "cancel", e, e.__data__, o.index, o.group), delete n[r];
    }
    i && delete e.__transition;
  }
}
function d2(e) {
  return this.each(function() {
    Gs(this, e);
  });
}
function f2(e, t) {
  var n, o;
  return function() {
    var s = nn(this, e), i = s.tween;
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
function p2(e, t, n) {
  var o, s;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var i = nn(this, e), r = i.tween;
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
function h2(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var o = Yt(this.node(), n).tween, s = 0, i = o.length, r; s < i; ++s)
      if ((r = o[s]).name === e)
        return r.value;
    return null;
  }
  return this.each((t == null ? f2 : p2)(n, e, t));
}
function $l(e, t, n) {
  var o = e._id;
  return e.each(function() {
    var s = nn(this, o);
    (s.value || (s.value = {}))[t] = n.apply(this, arguments);
  }), function(s) {
    return Yt(s, o).value[t];
  };
}
function ep(e, t) {
  var n;
  return (typeof t == "number" ? Cn : t instanceof as ? nc : (n = as(t)) ? (t = n, nc) : Kk)(e, t);
}
function v2(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function g2(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function m2(e, t, n) {
  var o, s = n + "", i;
  return function() {
    var r = this.getAttribute(e);
    return r === s ? null : r === o ? i : i = t(o = r, n);
  };
}
function y2(e, t, n) {
  var o, s = n + "", i;
  return function() {
    var r = this.getAttributeNS(e.space, e.local);
    return r === s ? null : r === o ? i : i = t(o = r, n);
  };
}
function b2(e, t, n) {
  var o, s, i;
  return function() {
    var r, l = n(this), a;
    return l == null ? void this.removeAttribute(e) : (r = this.getAttribute(e), a = l + "", r === a ? null : r === o && a === s ? i : (s = a, i = t(o = r, l)));
  };
}
function _2(e, t, n) {
  var o, s, i;
  return function() {
    var r, l = n(this), a;
    return l == null ? void this.removeAttributeNS(e.space, e.local) : (r = this.getAttributeNS(e.space, e.local), a = l + "", r === a ? null : r === o && a === s ? i : (s = a, i = t(o = r, l)));
  };
}
function w2(e, t) {
  var n = $i(e), o = n === "transform" ? Qk : ep;
  return this.attrTween(e, typeof t == "function" ? (n.local ? _2 : b2)(n, o, $l(this, "attr." + e, t)) : t == null ? (n.local ? g2 : v2)(n) : (n.local ? y2 : m2)(n, o, t));
}
function k2(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function E2(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function x2(e, t) {
  var n, o;
  function s() {
    var i = t.apply(this, arguments);
    return i !== o && (n = (o = i) && E2(e, i)), n;
  }
  return s._value = t, s;
}
function S2(e, t) {
  var n, o;
  function s() {
    var i = t.apply(this, arguments);
    return i !== o && (n = (o = i) && k2(e, i)), n;
  }
  return s._value = t, s;
}
function C2(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  var o = $i(e);
  return this.tween(n, (o.local ? x2 : S2)(o, t));
}
function $2(e, t) {
  return function() {
    Cl(this, e).delay = +t.apply(this, arguments);
  };
}
function I2(e, t) {
  return t = +t, function() {
    Cl(this, e).delay = t;
  };
}
function N2(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? $2 : I2)(t, e)) : Yt(this.node(), t).delay;
}
function T2(e, t) {
  return function() {
    nn(this, e).duration = +t.apply(this, arguments);
  };
}
function M2(e, t) {
  return t = +t, function() {
    nn(this, e).duration = t;
  };
}
function O2(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? T2 : M2)(t, e)) : Yt(this.node(), t).duration;
}
function P2(e, t) {
  if (typeof t != "function")
    throw new Error();
  return function() {
    nn(this, e).ease = t;
  };
}
function A2(e) {
  var t = this._id;
  return arguments.length ? this.each(P2(t, e)) : Yt(this.node(), t).ease;
}
function D2(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    nn(this, e).ease = n;
  };
}
function R2(e) {
  if (typeof e != "function")
    throw new Error();
  return this.each(D2(this._id, e));
}
function L2(e) {
  typeof e != "function" && (e = Of(e));
  for (var t = this._groups, n = t.length, o = new Array(n), s = 0; s < n; ++s)
    for (var i = t[s], r = i.length, l = o[s] = [], a, c = 0; c < r; ++c)
      (a = i[c]) && e.call(a, a.__data__, c, i) && l.push(a);
  return new yn(o, this._parents, this._name, this._id);
}
function V2(e) {
  if (e._id !== this._id)
    throw new Error();
  for (var t = this._groups, n = e._groups, o = t.length, s = n.length, i = Math.min(o, s), r = new Array(o), l = 0; l < i; ++l)
    for (var a = t[l], c = n[l], d = a.length, f = r[l] = new Array(d), h, v = 0; v < d; ++v)
      (h = a[v] || c[v]) && (f[v] = h);
  for (; l < o; ++l)
    r[l] = t[l];
  return new yn(r, this._parents, this._name, this._id);
}
function z2(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function F2(e, t, n) {
  var o, s, i = z2(t) ? Cl : nn;
  return function() {
    var r = i(this, e), l = r.on;
    l !== o && (s = (o = l).copy()).on(t, n), r.on = s;
  };
}
function B2(e, t) {
  var n = this._id;
  return arguments.length < 2 ? Yt(this.node(), n).on.on(e) : this.each(F2(n, e, t));
}
function H2(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition)
      if (+n !== e)
        return;
    t && t.removeChild(this);
  };
}
function U2() {
  return this.on("end.remove", H2(this._id));
}
function j2(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = kl(e));
  for (var o = this._groups, s = o.length, i = new Array(s), r = 0; r < s; ++r)
    for (var l = o[r], a = l.length, c = i[r] = new Array(a), d, f, h = 0; h < a; ++h)
      (d = l[h]) && (f = e.call(d, d.__data__, h, l)) && ("__data__" in d && (f.__data__ = d.__data__), c[h] = f, Ni(c[h], t, n, h, c, Yt(d, n)));
  return new yn(i, this._parents, t, n);
}
function G2(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Mf(e));
  for (var o = this._groups, s = o.length, i = [], r = [], l = 0; l < s; ++l)
    for (var a = o[l], c = a.length, d, f = 0; f < c; ++f)
      if (d = a[f]) {
        for (var h = e.call(d, d.__data__, f, a), v, w = Yt(d, n), x = 0, I = h.length; x < I; ++x)
          (v = h[x]) && Ni(v, t, n, x, h, w);
        i.push(h), r.push(d);
      }
  return new yn(i, r, t, n);
}
var q2 = ms.prototype.constructor;
function Y2() {
  return new q2(this._groups, this._parents);
}
function X2(e, t) {
  var n, o, s;
  return function() {
    var i = Co(this, e), r = (this.style.removeProperty(e), Co(this, e));
    return i === r ? null : i === n && r === o ? s : s = t(n = i, o = r);
  };
}
function tp(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function K2(e, t, n) {
  var o, s = n + "", i;
  return function() {
    var r = Co(this, e);
    return r === s ? null : r === o ? i : i = t(o = r, n);
  };
}
function W2(e, t, n) {
  var o, s, i;
  return function() {
    var r = Co(this, e), l = n(this), a = l + "";
    return l == null && (a = l = (this.style.removeProperty(e), Co(this, e))), r === a ? null : r === o && a === s ? i : (s = a, i = t(o = r, l));
  };
}
function Z2(e, t) {
  var n, o, s, i = "style." + t, r = "end." + i, l;
  return function() {
    var a = nn(this, e), c = a.on, d = a.value[i] == null ? l || (l = tp(t)) : void 0;
    (c !== n || s !== d) && (o = (n = c).copy()).on(r, s = d), a.on = o;
  };
}
function J2(e, t, n) {
  var o = (e += "") == "transform" ? Jk : ep;
  return t == null ? this.styleTween(e, X2(e, o)).on("end.style." + e, tp(e)) : typeof t == "function" ? this.styleTween(e, W2(e, o, $l(this, "style." + e, t))).each(Z2(this._id, e)) : this.styleTween(e, K2(e, o, t), n).on("end.style." + e, null);
}
function Q2(e, t, n) {
  return function(o) {
    this.style.setProperty(e, t.call(this, o), n);
  };
}
function eE(e, t, n) {
  var o, s;
  function i() {
    var r = t.apply(this, arguments);
    return r !== s && (o = (s = r) && Q2(e, r, n)), o;
  }
  return i._value = t, i;
}
function tE(e, t, n) {
  var o = "style." + (e += "");
  if (arguments.length < 2)
    return (o = this.tween(o)) && o._value;
  if (t == null)
    return this.tween(o, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(o, eE(e, t, n ?? ""));
}
function nE(e) {
  return function() {
    this.textContent = e;
  };
}
function oE(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function sE(e) {
  return this.tween("text", typeof e == "function" ? oE($l(this, "text", e)) : nE(e == null ? "" : e + ""));
}
function iE(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function rE(e) {
  var t, n;
  function o() {
    var s = e.apply(this, arguments);
    return s !== n && (t = (n = s) && iE(s)), t;
  }
  return o._value = e, o;
}
function lE(e) {
  var t = "text";
  if (arguments.length < 1)
    return (t = this.tween(t)) && t._value;
  if (e == null)
    return this.tween(t, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(t, rE(e));
}
function aE() {
  for (var e = this._name, t = this._id, n = np(), o = this._groups, s = o.length, i = 0; i < s; ++i)
    for (var r = o[i], l = r.length, a, c = 0; c < l; ++c)
      if (a = r[c]) {
        var d = Yt(a, t);
        Ni(a, e, n, c, r, {
          time: d.time + d.delay + d.duration,
          delay: 0,
          duration: d.duration,
          ease: d.ease
        });
      }
  return new yn(o, this._parents, e, n);
}
function uE() {
  var e, t, n = this, o = n._id, s = n.size();
  return new Promise(function(i, r) {
    var l = { value: r }, a = { value: function() {
      --s === 0 && i();
    } };
    n.each(function() {
      var c = nn(this, o), d = c.on;
      d !== e && (t = (e = d).copy(), t._.cancel.push(l), t._.interrupt.push(l), t._.end.push(a)), c.on = t;
    }), s === 0 && i();
  });
}
var cE = 0;
function yn(e, t, n, o) {
  this._groups = e, this._parents = t, this._name = n, this._id = o;
}
function np() {
  return ++cE;
}
var rn = ms.prototype;
yn.prototype = {
  constructor: yn,
  select: j2,
  selectAll: G2,
  selectChild: rn.selectChild,
  selectChildren: rn.selectChildren,
  filter: L2,
  merge: V2,
  selection: Y2,
  transition: aE,
  call: rn.call,
  nodes: rn.nodes,
  node: rn.node,
  size: rn.size,
  empty: rn.empty,
  each: rn.each,
  on: B2,
  attr: w2,
  attrTween: C2,
  style: J2,
  styleTween: tE,
  text: sE,
  textTween: lE,
  remove: U2,
  tween: h2,
  delay: N2,
  duration: O2,
  ease: A2,
  easeVarying: R2,
  end: uE,
  [Symbol.iterator]: rn[Symbol.iterator]
};
function dE(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var fE = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: dE
};
function pE(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function hE(e) {
  var t, n;
  e instanceof yn ? (t = e._id, e = e._name) : (t = np(), (n = fE).time = Sl(), e = e == null ? null : e + "");
  for (var o = this._groups, s = o.length, i = 0; i < s; ++i)
    for (var r = o[i], l = r.length, a, c = 0; c < l; ++c)
      (a = r[c]) && Ni(a, e, t, c, r, n || pE(a, t));
  return new yn(o, this._parents, e, t);
}
ms.prototype.interrupt = d2;
ms.prototype.transition = hE;
const Ms = (e) => () => e;
function vE(e, {
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
function fn(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
fn.prototype = {
  constructor: fn,
  scale: function(e) {
    return e === 1 ? this : new fn(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new fn(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Io = new fn(1, 0, 0);
fn.prototype;
function lr(e) {
  e.stopImmediatePropagation();
}
function Lo(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function gE(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function mE() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function uc() {
  return this.__zoom || Io;
}
function yE(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function bE() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function _E(e, t, n) {
  var o = e.invertX(t[0][0]) - n[0][0], s = e.invertX(t[1][0]) - n[1][0], i = e.invertY(t[0][1]) - n[0][1], r = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s),
    r > i ? (i + r) / 2 : Math.min(0, i) || Math.max(0, r)
  );
}
function wE() {
  var e = gE, t = mE, n = _E, o = yE, s = bE, i = [0, 1 / 0], r = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], l = 250, a = o2, c = Ci("start", "zoom", "end"), d, f, h, v = 500, w = 150, x = 0, I = 10;
  function N($) {
    $.property("__zoom", uc).on("wheel.zoom", B, { passive: !1 }).on("mousedown.zoom", T).on("dblclick.zoom", L).filter(s).on("touchstart.zoom", Y).on("touchmove.zoom", U).on("touchend.zoom touchcancel.zoom", G).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  N.transform = function($, V, M, F) {
    var q = $.selection ? $.selection() : $;
    q.property("__zoom", uc), $ !== q ? R($, V, M, F) : q.interrupt().each(function() {
      X(this, arguments).event(F).start().zoom(null, typeof V == "function" ? V.apply(this, arguments) : V).end();
    });
  }, N.scaleBy = function($, V, M, F) {
    N.scaleTo($, function() {
      var q = this.__zoom.k, te = typeof V == "function" ? V.apply(this, arguments) : V;
      return q * te;
    }, M, F);
  }, N.scaleTo = function($, V, M, F) {
    N.transform($, function() {
      var q = t.apply(this, arguments), te = this.__zoom, ce = M == null ? _(q) : typeof M == "function" ? M.apply(this, arguments) : M, fe = te.invert(ce), le = typeof V == "function" ? V.apply(this, arguments) : V;
      return n(y(D(te, le), ce, fe), q, r);
    }, M, F);
  }, N.translateBy = function($, V, M, F) {
    N.transform($, function() {
      return n(this.__zoom.translate(
        typeof V == "function" ? V.apply(this, arguments) : V,
        typeof M == "function" ? M.apply(this, arguments) : M
      ), t.apply(this, arguments), r);
    }, null, F);
  }, N.translateTo = function($, V, M, F, q) {
    N.transform($, function() {
      var te = t.apply(this, arguments), ce = this.__zoom, fe = F == null ? _(te) : typeof F == "function" ? F.apply(this, arguments) : F;
      return n(Io.translate(fe[0], fe[1]).scale(ce.k).translate(
        typeof V == "function" ? -V.apply(this, arguments) : -V,
        typeof M == "function" ? -M.apply(this, arguments) : -M
      ), te, r);
    }, F, q);
  };
  function D($, V) {
    return V = Math.max(i[0], Math.min(i[1], V)), V === $.k ? $ : new fn(V, $.x, $.y);
  }
  function y($, V, M) {
    var F = V[0] - M[0] * $.k, q = V[1] - M[1] * $.k;
    return F === $.x && q === $.y ? $ : new fn($.k, F, q);
  }
  function _($) {
    return [(+$[0][0] + +$[1][0]) / 2, (+$[0][1] + +$[1][1]) / 2];
  }
  function R($, V, M, F) {
    $.on("start.zoom", function() {
      X(this, arguments).event(F).start();
    }).on("interrupt.zoom end.zoom", function() {
      X(this, arguments).event(F).end();
    }).tween("zoom", function() {
      var q = this, te = arguments, ce = X(q, te).event(F), fe = t.apply(q, te), le = M == null ? _(fe) : typeof M == "function" ? M.apply(q, te) : M, he = Math.max(fe[1][0] - fe[0][0], fe[1][1] - fe[0][1]), pe = q.__zoom, be = typeof V == "function" ? V.apply(q, te) : V, se = a(pe.invert(le).concat(he / pe.k), be.invert(le).concat(he / be.k));
      return function(xe) {
        if (xe === 1)
          xe = be;
        else {
          var $e = se(xe), Ee = he / $e[2];
          xe = new fn(Ee, le[0] - $e[0] * Ee, le[1] - $e[1] * Ee);
        }
        ce.zoom(null, xe);
      };
    });
  }
  function X($, V, M) {
    return !M && $.__zooming || new Q($, V);
  }
  function Q($, V) {
    this.that = $, this.args = V, this.active = 0, this.sourceEvent = null, this.extent = t.apply($, V), this.taps = 0;
  }
  Q.prototype = {
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
      var V = Ht(this.that).datum();
      c.call(
        $,
        this.that,
        new vE($, {
          sourceEvent: this.sourceEvent,
          target: N,
          transform: this.that.__zoom,
          dispatch: c
        }),
        V
      );
    }
  };
  function B($, ...V) {
    if (!e.apply(this, arguments))
      return;
    var M = X(this, V).event($), F = this.__zoom, q = Math.max(i[0], Math.min(i[1], F.k * Math.pow(2, o.apply(this, arguments)))), te = Wt($);
    if (M.wheel)
      (M.mouse[0][0] !== te[0] || M.mouse[0][1] !== te[1]) && (M.mouse[1] = F.invert(M.mouse[0] = te)), clearTimeout(M.wheel);
    else {
      if (F.k === q)
        return;
      M.mouse = [te, F.invert(te)], Gs(this), M.start();
    }
    Lo($), M.wheel = setTimeout(ce, w), M.zoom("mouse", n(y(D(F, q), M.mouse[0], M.mouse[1]), M.extent, r));
    function ce() {
      M.wheel = null, M.end();
    }
  }
  function T($, ...V) {
    if (h || !e.apply(this, arguments))
      return;
    var M = $.currentTarget, F = X(this, V, !0).event($), q = Ht($.view).on("mousemove.zoom", le, !0).on("mouseup.zoom", he, !0), te = Wt($, M), ce = $.clientX, fe = $.clientY;
    Hf($.view), lr($), F.mouse = [te, this.__zoom.invert(te)], Gs(this), F.start();
    function le(pe) {
      if (Lo(pe), !F.moved) {
        var be = pe.clientX - ce, se = pe.clientY - fe;
        F.moved = be * be + se * se > x;
      }
      F.event(pe).zoom("mouse", n(y(F.that.__zoom, F.mouse[0] = Wt(pe, M), F.mouse[1]), F.extent, r));
    }
    function he(pe) {
      q.on("mousemove.zoom mouseup.zoom", null), Uf(pe.view, F.moved), Lo(pe), F.event(pe).end();
    }
  }
  function L($, ...V) {
    if (e.apply(this, arguments)) {
      var M = this.__zoom, F = Wt($.changedTouches ? $.changedTouches[0] : $, this), q = M.invert(F), te = M.k * ($.shiftKey ? 0.5 : 2), ce = n(y(D(M, te), F, q), t.apply(this, V), r);
      Lo($), l > 0 ? Ht(this).transition().duration(l).call(R, ce, F, $) : Ht(this).call(N.transform, ce, F, $);
    }
  }
  function Y($, ...V) {
    if (e.apply(this, arguments)) {
      var M = $.touches, F = M.length, q = X(this, V, $.changedTouches.length === F).event($), te, ce, fe, le;
      for (lr($), ce = 0; ce < F; ++ce)
        fe = M[ce], le = Wt(fe, this), le = [le, this.__zoom.invert(le), fe.identifier], q.touch0 ? !q.touch1 && q.touch0[2] !== le[2] && (q.touch1 = le, q.taps = 0) : (q.touch0 = le, te = !0, q.taps = 1 + !!d);
      d && (d = clearTimeout(d)), te && (q.taps < 2 && (f = le[0], d = setTimeout(function() {
        d = null;
      }, v)), Gs(this), q.start());
    }
  }
  function U($, ...V) {
    if (this.__zooming) {
      var M = X(this, V).event($), F = $.changedTouches, q = F.length, te, ce, fe, le;
      for (Lo($), te = 0; te < q; ++te)
        ce = F[te], fe = Wt(ce, this), M.touch0 && M.touch0[2] === ce.identifier ? M.touch0[0] = fe : M.touch1 && M.touch1[2] === ce.identifier && (M.touch1[0] = fe);
      if (ce = M.that.__zoom, M.touch1) {
        var he = M.touch0[0], pe = M.touch0[1], be = M.touch1[0], se = M.touch1[1], xe = (xe = be[0] - he[0]) * xe + (xe = be[1] - he[1]) * xe, $e = ($e = se[0] - pe[0]) * $e + ($e = se[1] - pe[1]) * $e;
        ce = D(ce, Math.sqrt(xe / $e)), fe = [(he[0] + be[0]) / 2, (he[1] + be[1]) / 2], le = [(pe[0] + se[0]) / 2, (pe[1] + se[1]) / 2];
      } else if (M.touch0)
        fe = M.touch0[0], le = M.touch0[1];
      else
        return;
      M.zoom("touch", n(y(ce, fe, le), M.extent, r));
    }
  }
  function G($, ...V) {
    if (this.__zooming) {
      var M = X(this, V).event($), F = $.changedTouches, q = F.length, te, ce;
      for (lr($), h && clearTimeout(h), h = setTimeout(function() {
        h = null;
      }, v), te = 0; te < q; ++te)
        ce = F[te], M.touch0 && M.touch0[2] === ce.identifier ? delete M.touch0 : M.touch1 && M.touch1[2] === ce.identifier && delete M.touch1;
      if (M.touch1 && !M.touch0 && (M.touch0 = M.touch1, delete M.touch1), M.touch0)
        M.touch0[1] = this.__zoom.invert(M.touch0[0]);
      else if (M.end(), M.taps === 2 && (ce = Wt(ce, this), Math.hypot(f[0] - ce[0], f[1] - ce[1]) < I)) {
        var fe = Ht(this).on("dblclick.zoom");
        fe && fe.apply(this, arguments);
      }
    }
  }
  return N.wheelDelta = function($) {
    return arguments.length ? (o = typeof $ == "function" ? $ : Ms(+$), N) : o;
  }, N.filter = function($) {
    return arguments.length ? (e = typeof $ == "function" ? $ : Ms(!!$), N) : e;
  }, N.touchable = function($) {
    return arguments.length ? (s = typeof $ == "function" ? $ : Ms(!!$), N) : s;
  }, N.extent = function($) {
    return arguments.length ? (t = typeof $ == "function" ? $ : Ms([[+$[0][0], +$[0][1]], [+$[1][0], +$[1][1]]]), N) : t;
  }, N.scaleExtent = function($) {
    return arguments.length ? (i[0] = +$[0], i[1] = +$[1], N) : [i[0], i[1]];
  }, N.translateExtent = function($) {
    return arguments.length ? (r[0][0] = +$[0][0], r[1][0] = +$[1][0], r[0][1] = +$[0][1], r[1][1] = +$[1][1], N) : [[r[0][0], r[0][1]], [r[1][0], r[1][1]]];
  }, N.constrain = function($) {
    return arguments.length ? (n = $, N) : n;
  }, N.duration = function($) {
    return arguments.length ? (l = +$, N) : l;
  }, N.interpolate = function($) {
    return arguments.length ? (a = $, N) : a;
  }, N.on = function() {
    var $ = c.on.apply(c, arguments);
    return $ === c ? N : $;
  }, N.clickDistance = function($) {
    return arguments.length ? (x = ($ = +$) * $, N) : Math.sqrt(x);
  }, N.tapDistance = function($) {
    return arguments.length ? (I = +$, N) : I;
  }, N;
}
var we = /* @__PURE__ */ ((e) => (e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom", e))(we || {}), Il = /* @__PURE__ */ ((e) => (e.Partial = "partial", e.Full = "full", e))(Il || {}), Yn = /* @__PURE__ */ ((e) => (e.Bezier = "default", e.SimpleBezier = "simple-bezier", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e))(Yn || {}), io = /* @__PURE__ */ ((e) => (e.Strict = "strict", e.Loose = "loose", e))(io || {}), Gr = /* @__PURE__ */ ((e) => (e.Arrow = "arrow", e.ArrowClosed = "arrowclosed", e))(Gr || {}), Wo = /* @__PURE__ */ ((e) => (e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal", e))(Wo || {});
function qr(e) {
  var t, n;
  const o = ((n = (t = e.composedPath) == null ? void 0 : t.call(e)) == null ? void 0 : n[0]) || e.target, s = typeof (o == null ? void 0 : o.hasAttribute) == "function" ? o.hasAttribute("contenteditable") : !1, i = typeof (o == null ? void 0 : o.closest) == "function" ? o.closest(".nokey") : null;
  return ["INPUT", "SELECT", "TEXTAREA"].includes(o == null ? void 0 : o.nodeName) || s || !!i;
}
function kE(e) {
  return e.ctrlKey || e.metaKey || e.shiftKey;
}
function cc(e, t, n, o) {
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
function EE(e, t) {
  return (n) => {
    if (!n.code && !n.key)
      return !1;
    const o = xE(n.code, e);
    return Array.isArray(e) ? e.some((s) => cc(n[o], s, t, n.type === "keyup")) : cc(n[o], e, t, n.type === "keyup");
  };
}
function xE(e, t) {
  return t.includes(e) ? "code" : "key";
}
function Zo(e, t) {
  const n = Xe(() => Le(t == null ? void 0 : t.actInsideInputWithModifier) ?? !1), o = Xe(() => Le(t == null ? void 0 : t.target) ?? window), s = ee(Le(e) === !0);
  let i = !1;
  const r = /* @__PURE__ */ new Set();
  let l = c(Le(e));
  Me(
    () => Le(e),
    (d, f) => {
      typeof f == "boolean" && typeof d != "boolean" && a(), l = c(d);
    },
    {
      immediate: !0
    }
  ), Nf(["blur", "contextmenu"], a), Gu(
    (...d) => l(...d),
    (d) => {
      i = kE(d), !((!i || i && !n.value) && qr(d)) && (d.preventDefault(), s.value = !0);
    },
    { eventName: "keydown", target: o }
  ), Gu(
    (...d) => l(...d),
    (d) => {
      if (s.value) {
        if ((!i || i && !n.value) && qr(d))
          return;
        i = !1, s.value = !1;
      }
    },
    { eventName: "keyup", target: o }
  );
  function a() {
    i = !1, r.clear(), s.value = Le(e) === !0;
  }
  function c(d) {
    return d === null ? (a(), () => !1) : typeof d == "boolean" ? (a(), s.value = d, () => !1) : Array.isArray(d) || typeof d == "string" ? EE(d, r) : d;
  }
  return s;
}
const op = "vue-flow__node-desc", sp = "vue-flow__edge-desc", SE = "vue-flow__aria-live", ip = ["Enter", " ", "Escape"], ko = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
};
function Yr(e) {
  return {
    ...e.computedPosition || { x: 0, y: 0 },
    width: e.dimensions.width || 0,
    height: e.dimensions.height || 0
  };
}
function Xr(e, t) {
  const n = Math.max(0, Math.min(e.x + e.width, t.x + t.width) - Math.max(e.x, t.x)), o = Math.max(0, Math.min(e.y + e.height, t.y + t.height) - Math.max(e.y, t.y));
  return Math.ceil(n * o);
}
function Ti(e) {
  return {
    width: e.offsetWidth,
    height: e.offsetHeight
  };
}
function ro(e, t = 0, n = 1) {
  return Math.min(Math.max(e, t), n);
}
function rp(e, t) {
  return {
    x: ro(e.x, t[0][0], t[1][0]),
    y: ro(e.y, t[0][1], t[1][1])
  };
}
function dc(e) {
  const t = e.getRootNode();
  return "elementFromPoint" in t ? t : window.document;
}
function Vn(e) {
  return e && typeof e == "object" && "id" in e && "source" in e && "target" in e;
}
function eo(e) {
  return e && typeof e == "object" && "id" in e && "position" in e && !Vn(e);
}
function Ho(e) {
  return eo(e) && "computedPosition" in e;
}
function Os(e) {
  return !Number.isNaN(e) && Number.isFinite(e);
}
function CE(e) {
  return Os(e.width) && Os(e.height) && Os(e.x) && Os(e.y);
}
function $E(e, t, n) {
  const o = {
    id: e.id.toString(),
    type: e.type ?? "default",
    dimensions: Zn({
      width: 0,
      height: 0
    }),
    computedPosition: Zn({
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
    data: ot(e.data) ? e.data : {},
    events: Zn(ot(e.events) ? e.events : {})
  };
  return Object.assign(t ?? o, e, { id: e.id.toString(), parentNode: n });
}
function lp(e, t, n) {
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
    data: ot(e.data) ? e.data : {},
    events: Zn(ot(e.events) ? e.events : {}),
    label: e.label ?? "",
    interactionWidth: e.interactionWidth ?? (n == null ? void 0 : n.interactionWidth),
    ...n ?? {}
  };
  return Object.assign(t ?? i, e, { id: e.id.toString() });
}
function ap(e, t, n, o) {
  const s = typeof e == "string" ? e : e.id, i = /* @__PURE__ */ new Set(), r = o === "source" ? "target" : "source";
  for (const l of n)
    l[r] === s && i.add(l[o]);
  return t.filter((l) => i.has(l.id));
}
function IE(...e) {
  if (e.length === 3) {
    const [i, r, l] = e;
    return ap(i, r, l, "target");
  }
  const [t, n] = e, o = typeof t == "string" ? t : t.id;
  return n.filter((i) => Vn(i) && i.source === o).map((i) => n.find((r) => eo(r) && r.id === i.target));
}
function NE(...e) {
  if (e.length === 3) {
    const [i, r, l] = e;
    return ap(i, r, l, "source");
  }
  const [t, n] = e, o = typeof t == "string" ? t : t.id;
  return n.filter((i) => Vn(i) && i.target === o).map((i) => n.find((r) => eo(r) && r.id === i.source));
}
function up({ source: e, sourceHandle: t, target: n, targetHandle: o }) {
  return `vueflow__edge-${e}${t ?? ""}-${n}${o ?? ""}`;
}
function TE(e, t) {
  return t.some(
    (n) => Vn(n) && n.source === e.source && n.target === e.target && (n.sourceHandle === e.sourceHandle || !n.sourceHandle && !e.sourceHandle) && (n.targetHandle === e.targetHandle || !n.targetHandle && !e.targetHandle)
  );
}
function cp({ x: e, y: t }, { x: n, y: o, zoom: s }) {
  return {
    x: e * s + n,
    y: t * s + o
  };
}
function cs({ x: e, y: t }, { x: n, y: o, zoom: s }, i = !1, r = [1, 1]) {
  const l = {
    x: (e - n) / s,
    y: (t - o) / s
  };
  return i ? Mi(l, r) : l;
}
function ME(e, t) {
  return {
    x: Math.min(e.x, t.x),
    y: Math.min(e.y, t.y),
    x2: Math.max(e.x2, t.x2),
    y2: Math.max(e.y2, t.y2)
  };
}
function dp({ x: e, y: t, width: n, height: o }) {
  return {
    x: e,
    y: t,
    x2: e + n,
    y2: t + o
  };
}
function OE({ x: e, y: t, x2: n, y2: o }) {
  return {
    x: e,
    y: t,
    width: n - e,
    height: o - t
  };
}
function fp(e) {
  let t = {
    x: Number.POSITIVE_INFINITY,
    y: Number.POSITIVE_INFINITY,
    x2: Number.NEGATIVE_INFINITY,
    y2: Number.NEGATIVE_INFINITY
  };
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    t = ME(
      t,
      dp({
        ...o.computedPosition,
        ...o.dimensions
      })
    );
  }
  return OE(t);
}
function pp(e, t, n = { x: 0, y: 0, zoom: 1 }, o = !1, s = !1) {
  const i = {
    ...cs(t, n),
    width: t.width / n.zoom,
    height: t.height / n.zoom
  }, r = [];
  for (const l of e) {
    const { dimensions: a, selectable: c = !0, hidden: d = !1 } = l, f = a.width ?? l.width ?? null, h = a.height ?? l.height ?? null;
    if (s && !c || d)
      continue;
    const v = Xr(i, Yr(l)), w = f === null || h === null, x = o && v > 0, I = (f ?? 0) * (h ?? 0);
    (w || x || v >= I || l.dragging) && r.push(l);
  }
  return r;
}
function hp(e, t) {
  const n = /* @__PURE__ */ new Set();
  if (typeof e == "string")
    n.add(e);
  else if (e.length >= 1)
    for (const o of e)
      n.add(o.id);
  return t.filter((o) => n.has(o.source) || n.has(o.target));
}
function fc(e, t, n, o, s, i = 0.1, r = { x: 0, y: 0 }) {
  const l = t / (e.width * (1 + i)), a = n / (e.height * (1 + i)), c = Math.min(l, a), d = ro(c, o, s), f = e.x + e.width / 2, h = e.y + e.height / 2, v = t / 2 - f * d + (r.x ?? 0), w = n / 2 - h * d + (r.y ?? 0);
  return { x: v, y: w, zoom: d };
}
function PE(e, t) {
  return {
    x: t.x + e.x,
    y: t.y + e.y,
    z: (e.z > t.z ? e.z : t.z) + 1
  };
}
function vp(e, t) {
  if (!e.parentNode)
    return !1;
  const n = t(e.parentNode);
  return n ? n.selected ? !0 : vp(n, t) : !1;
}
function ds(e, t) {
  return typeof e > "u" ? "" : typeof e == "string" ? e : `${t ? `${t}__` : ""}${Object.keys(e).sort().map((o) => `${o}=${e[o]}`).join("&")}`;
}
function pc(e, t, n) {
  return e < t ? ro(Math.abs(e - t), 1, t) / t : e > n ? -ro(Math.abs(e - n), 1, t) / t : 0;
}
function gp(e, t, n = 15, o = 40) {
  const s = pc(e.x, o, t.width - o) * n, i = pc(e.y, o, t.height - o) * n;
  return [s, i];
}
function ar(e, t) {
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
function hc(e, t) {
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
            if (Ho(r) && (typeof l.position < "u" && (r.position = l.position), typeof l.dragging < "u" && (r.dragging = l.dragging), r.expandParent && r.parentNode)) {
              const a = t[i.indexOf(r.parentNode)];
              a && Ho(a) && ar(r, a);
            }
            break;
          case "dimensions":
            if (Ho(r) && (typeof l.dimensions < "u" && (r.dimensions = l.dimensions), typeof l.updateStyle < "u" && l.updateStyle && (r.style = {
              ...r.style || {},
              width: `${(n = l.dimensions) == null ? void 0 : n.width}px`,
              height: `${(o = l.dimensions) == null ? void 0 : o.height}px`
            }), typeof l.resizing < "u" && (r.resizing = l.resizing), r.expandParent && r.parentNode)) {
              const a = t[i.indexOf(r.parentNode)];
              a && Ho(a) && (!!a.dimensions.width && !!a.dimensions.height ? ar(r, a) : ft(() => {
                ar(r, a);
              }));
            }
            break;
        }
  return t;
}
function En(e, t) {
  return {
    id: e,
    type: "select",
    selected: t
  };
}
function vc(e) {
  return {
    item: e,
    type: "add"
  };
}
function gc(e) {
  return {
    id: e,
    type: "remove"
  };
}
function mc(e, t, n, o, s) {
  return {
    id: e,
    source: t,
    target: n,
    sourceHandle: o || null,
    targetHandle: s || null,
    type: "remove"
  };
}
function $n(e, t = /* @__PURE__ */ new Set(), n = !1) {
  const o = [];
  for (const [s, i] of e) {
    const r = t.has(s);
    !(i.selected === void 0 && !r) && i.selected !== r && (n && (i.selected = r), o.push(En(i.id, r)));
  }
  return o;
}
function ye(e) {
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
      return Si(a), {
        off: a
      };
    },
    off: s,
    trigger: (l) => Promise.all(Array.from(t).map((a) => a(l))),
    hasListeners: o,
    fns: t
  };
}
function yc(e, t, n) {
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
function AE(e, t, n, o, s) {
  var i, r;
  const l = [];
  for (const a of e)
    (a.selected || a.id === s) && (!a.parentNode || !vp(a, o)) && (a.draggable || t && typeof a.draggable > "u") && l.push(
      Zn({
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
function ur({
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
function mp(e) {
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
function DE(e, t, n) {
  const [o, s, i, r] = typeof e != "string" ? mp(e.padding) : [0, 0, 0, 0];
  return n && typeof n.computedPosition.x < "u" && typeof n.computedPosition.y < "u" && typeof n.dimensions.width < "u" && typeof n.dimensions.height < "u" ? [
    [n.computedPosition.x + r, n.computedPosition.y + o],
    [
      n.computedPosition.x + n.dimensions.width - s,
      n.computedPosition.y + n.dimensions.height - i
    ]
  ] : !1;
}
function RE(e, t, n, o) {
  let s = e.extent || n;
  if ((s === "parent" || !Array.isArray(s) && (s == null ? void 0 : s.range) === "parent") && !e.expandParent)
    if (e.parentNode && o && e.dimensions.width && e.dimensions.height) {
      const i = DE(s, e, o);
      i && (s = i);
    } else
      t(new at(st.NODE_EXTENT_INVALID, e.id)), s = n;
  else if (Array.isArray(s)) {
    const i = (o == null ? void 0 : o.computedPosition.x) || 0, r = (o == null ? void 0 : o.computedPosition.y) || 0;
    s = [
      [s[0][0] + i, s[0][1] + r],
      [s[1][0] + i, s[1][1] + r]
    ];
  } else if (s !== "parent" && (s != null && s.range) && Array.isArray(s.range)) {
    const [i, r, l, a] = mp(s.padding), c = (o == null ? void 0 : o.computedPosition.x) || 0, d = (o == null ? void 0 : o.computedPosition.y) || 0;
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
function LE({ width: e, height: t }, n) {
  return [n[0], [n[1][0] - (e || 0), n[1][1] - (t || 0)]];
}
function Nl(e, t, n, o, s) {
  const i = LE(e.dimensions, RE(e, n, o, s)), r = rp(t, i);
  return {
    position: {
      x: r.x - ((s == null ? void 0 : s.computedPosition.x) || 0),
      y: r.y - ((s == null ? void 0 : s.computedPosition.y) || 0)
    },
    computedPosition: r
  };
}
function ai(e, t, n = we.Left) {
  const o = ((t == null ? void 0 : t.x) ?? 0) + e.computedPosition.x, s = ((t == null ? void 0 : t.y) ?? 0) + e.computedPosition.y, { width: i, height: r } = t ?? FE(e);
  switch ((t == null ? void 0 : t.position) ?? n) {
    case we.Top:
      return {
        x: o + i / 2,
        y: s
      };
    case we.Right:
      return {
        x: o + i,
        y: s + r / 2
      };
    case we.Bottom:
      return {
        x: o + i / 2,
        y: s + r
      };
    case we.Left:
      return {
        x: o,
        y: s + r / 2
      };
  }
}
function bc(e = [], t) {
  return e.length && (t ? e.find((n) => n.id === t) : e[0]) || null;
}
function VE({
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
  const d = dp({
    x: (0 - a.x) / a.zoom,
    y: (0 - a.y) / a.zoom,
    width: r / a.zoom,
    height: l / a.zoom
  }), f = Math.max(0, Math.min(d.x2, c.x2) - Math.max(d.x, c.x)), h = Math.max(0, Math.min(d.y2, c.y2) - Math.max(d.y, c.y));
  return Math.ceil(f * h) > 0;
}
function zE(e, t, n = !1) {
  const o = typeof e.zIndex == "number";
  let s = o ? e.zIndex : 0;
  const i = t(e.source), r = t(e.target);
  return !i || !r ? 0 : (n && (s = o ? e.zIndex : Math.max(i.computedPosition.z || 0, r.computedPosition.z || 0)), s);
}
var st = /* @__PURE__ */ ((e) => (e.MISSING_STYLES = "MISSING_STYLES", e.MISSING_VIEWPORT_DIMENSIONS = "MISSING_VIEWPORT_DIMENSIONS", e.NODE_INVALID = "NODE_INVALID", e.NODE_NOT_FOUND = "NODE_NOT_FOUND", e.NODE_MISSING_PARENT = "NODE_MISSING_PARENT", e.NODE_TYPE_MISSING = "NODE_TYPE_MISSING", e.NODE_EXTENT_INVALID = "NODE_EXTENT_INVALID", e.EDGE_INVALID = "EDGE_INVALID", e.EDGE_NOT_FOUND = "EDGE_NOT_FOUND", e.EDGE_SOURCE_MISSING = "EDGE_SOURCE_MISSING", e.EDGE_TARGET_MISSING = "EDGE_TARGET_MISSING", e.EDGE_TYPE_MISSING = "EDGE_TYPE_MISSING", e.EDGE_SOURCE_TARGET_SAME = "EDGE_SOURCE_TARGET_SAME", e.EDGE_SOURCE_TARGET_MISSING = "EDGE_SOURCE_TARGET_MISSING", e.EDGE_ORPHANED = "EDGE_ORPHANED", e.USEVUEFLOW_OPTIONS = "USEVUEFLOW_OPTIONS", e))(st || {});
const _c = {
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
class at extends Error {
  constructor(t, ...n) {
    var o;
    super((o = _c[t]) == null ? void 0 : o.call(_c, ...n)), this.name = "VueFlowError", this.code = t, this.args = n;
  }
}
function Tl(e) {
  return "clientX" in e;
}
function yp(e) {
  return "sourceEvent" in e;
}
function mn(e, t) {
  var n, o;
  const s = Tl(e), i = s ? e.clientX : (n = e.touches) == null ? void 0 : n[0].clientX, r = s ? e.clientY : (o = e.touches) == null ? void 0 : o[0].clientY;
  return {
    x: i - ((t == null ? void 0 : t.left) ?? 0),
    y: r - ((t == null ? void 0 : t.top) ?? 0)
  };
}
const ui = () => {
  var e;
  return typeof navigator < "u" && ((e = navigator == null ? void 0 : navigator.userAgent) == null ? void 0 : e.indexOf("Mac")) >= 0;
};
function FE(e) {
  var t, n;
  return {
    width: ((t = e.dimensions) == null ? void 0 : t.width) ?? e.width ?? 0,
    height: ((n = e.dimensions) == null ? void 0 : n.height) ?? e.height ?? 0
  };
}
function Mi(e, t = [1, 1]) {
  return {
    x: t[0] * Math.round(e.x / t[0]),
    y: t[1] * Math.round(e.y / t[1])
  };
}
function bp() {
  return {
    handleDomNode: null,
    isValid: !1,
    connection: { source: "", target: "", sourceHandle: null, targetHandle: null },
    endHandle: null
  };
}
function cr(e) {
  e == null || e.classList.remove("valid", "connecting", "vue-flow__handle-valid", "vue-flow__handle-connecting");
}
function wc(e, t, n, o) {
  const s = [];
  for (const i of t[n] || [])
    if (`${e.id}-${i.id}-${n}` !== o) {
      const { x: r, y: l } = ai(e, i);
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
function BE(e, t, n, o, s, i) {
  const { x: r, y: l } = mn(e), c = t.elementsFromPoint(r, l).find((w) => w.classList.contains("vue-flow__handle"));
  if (c) {
    const w = c.getAttribute("data-nodeid");
    if (w) {
      const x = Ml(void 0, c), I = c.getAttribute("data-handleid"), N = i({ nodeId: w, id: I, type: x });
      if (N) {
        const D = s.find((y) => y.nodeId === w && y.type === x && y.id === I);
        return {
          handle: {
            id: I,
            type: x,
            nodeId: w,
            x: (D == null ? void 0 : D.x) || n.x,
            y: (D == null ? void 0 : D.y) || n.y
          },
          validHandleResult: N
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
    return { handle: null, validHandleResult: bp() };
  if (d.length === 1)
    return d[0];
  const h = d.some(({ validHandleResult: w }) => w.isValid), v = d.some(({ handle: w }) => w.type === "target");
  return d.find(
    ({ handle: w, validHandleResult: x }) => v ? w.type === "target" : h ? x.isValid : !0
  ) || d[0];
}
function kc(e, t, n, o, s, i, r, l, a, c, d) {
  const f = i === "target", h = l.querySelector(`.vue-flow__handle[data-id="${t == null ? void 0 : t.nodeId}-${t == null ? void 0 : t.id}-${t == null ? void 0 : t.type}"]`), { x: v, y: w } = mn(e), x = l.elementFromPoint(v, w), I = x != null && x.classList.contains("vue-flow__handle") ? x : h, N = bp();
  if (I) {
    N.handleDomNode = I;
    const D = Ml(void 0, I), y = I.getAttribute("data-nodeid"), _ = I.getAttribute("data-handleid"), R = I.classList.contains("connectable"), X = I.classList.contains("connectableend"), Q = {
      source: f ? y : o,
      sourceHandle: f ? _ : s,
      target: f ? o : y,
      targetHandle: f ? s : _
    };
    N.connection = Q, R && X && (n === io.Strict ? f && D === "source" || !f && D === "target" : y !== o || _ !== s) && (N.isValid = r(Q, {
      edges: a,
      nodes: c,
      sourceNode: d(Q.source),
      targetNode: d(Q.target)
    }), N.endHandle = {
      nodeId: y,
      handleId: _,
      type: D,
      position: N.isValid ? I.getAttribute("data-handlepos") : null
    });
  }
  return N;
}
function HE({ nodes: e, nodeId: t, handleId: n, handleType: o }) {
  const s = [];
  for (let i = 0; i < e.length; i++) {
    const r = e[i], { handleBounds: l } = r;
    let a = [], c = [];
    l && (a = wc(r, l, "source", `${t}-${n}-${o}`), c = wc(r, l, "target", `${t}-${n}-${o}`)), s.push(...a, ...c);
  }
  return s;
}
function Ml(e, t) {
  return e || (t != null && t.classList.contains("target") ? "target" : t != null && t.classList.contains("source") ? "source" : null);
}
function UE(e, t) {
  let n = null;
  return t ? n = "valid" : e && !t && (n = "invalid"), n;
}
const jE = ["production", "prod"];
function Oi(e, ...t) {
  _p() && console.warn(`[Vue Flow]: ${e}`, ...t);
}
function _p() {
  return !jE.includes("production");
}
function Ec(e, t, n, o) {
  const s = t.querySelectorAll(`.vue-flow__handle${e}`);
  return Array.from(s).map((r) => {
    const l = r.getBoundingClientRect();
    return {
      id: r.getAttribute("data-handleid"),
      position: r.getAttribute("data-handlepos"),
      x: (l.left - n.left) / o,
      y: (l.top - n.top) / o,
      ...Ti(r)
    };
  });
}
function Kr(e, t, n, o, s, i = !1, r) {
  s.value = !1, e.selected ? (i || e.selected && t) && (o([e]), ft(() => {
    r.blur();
  })) : n([e]);
}
function ot(e) {
  return typeof H(e) < "u";
}
function GE(e, t, n, o) {
  if (!e || !e.source || !e.target)
    return n(new at(st.EDGE_INVALID, (e == null ? void 0 : e.id) ?? "[ID UNKNOWN]")), !1;
  let s;
  return Vn(e) ? s = e : s = {
    ...e,
    id: up(e)
  }, s = lp(s, void 0, o), TE(s, t) ? !1 : s;
}
function qE(e, t, n, o, s) {
  if (!t.source || !t.target)
    return s(new at(st.EDGE_INVALID, e.id)), !1;
  if (!n)
    return s(new at(st.EDGE_NOT_FOUND, e.id)), !1;
  const { id: i, ...r } = e;
  return {
    ...r,
    id: o ? up(t) : i,
    source: t.source,
    target: t.target,
    sourceHandle: t.sourceHandle,
    targetHandle: t.targetHandle
  };
}
function xc(e, t, n) {
  const o = {}, s = [];
  for (let i = 0; i < e.length; ++i) {
    const r = e[i];
    if (!eo(r)) {
      n(
        new at(st.NODE_INVALID, r == null ? void 0 : r.id) || `[ID UNKNOWN|INDEX ${i}]`
      );
      continue;
    }
    const l = $E(r, t(r.id), r.parentNode);
    r.parentNode && (o[r.parentNode] = !0), s[i] = l;
  }
  for (const i of s) {
    const r = t(i.parentNode) || s.find((l) => l.id === i.parentNode);
    i.parentNode && !r && n(new at(st.NODE_MISSING_PARENT, i.id, i.parentNode)), (i.parentNode || o[i.id]) && (o[i.id] && (i.isParent = !0), r && (r.isParent = !0));
  }
  return s;
}
function dr(e, t) {
  e.clear();
  for (const n of t) {
    const { id: o, source: s, target: i, sourceHandle: r = null, targetHandle: l = null } = n, a = `${s}-source-${r}`, c = `${i}-target-${l}`, d = e.get(a) || /* @__PURE__ */ new Map(), f = e.get(c) || /* @__PURE__ */ new Map(), h = Zn({ edgeId: o, source: s, target: i, sourceHandle: r, targetHandle: l });
    e.set(a, d.set(`${i}-${l}`, h)), e.set(c, f.set(`${s}-${r}`, h));
  }
}
function fr(e, t, n, o, s, i, r, l) {
  const a = [];
  for (const c of e) {
    const d = Vn(c) ? c : GE(c, l, s, i);
    if (!d)
      continue;
    const f = n(d.source), h = n(d.target);
    if (!f || !h) {
      s(new at(st.EDGE_SOURCE_TARGET_MISSING, d.id, d.source, d.target));
      continue;
    }
    if (!f) {
      s(new at(st.EDGE_SOURCE_MISSING, d.id, d.source));
      continue;
    }
    if (!h) {
      s(new at(st.EDGE_TARGET_MISSING, d.id, d.target));
      continue;
    }
    if (t && !t(d, {
      edges: l,
      nodes: r,
      sourceNode: f,
      targetNode: h
    })) {
      s(new at(st.EDGE_INVALID, d.id));
      continue;
    }
    const v = o(d.id);
    a.push({
      ...lp(d, v, i),
      sourceNode: f,
      targetNode: h
    });
  }
  return a;
}
const Sc = Symbol("vueFlow"), wp = Symbol("nodeId"), kp = Symbol("nodeRef"), YE = Symbol("edgeId"), XE = Symbol("edgeRef"), Pi = Symbol("slots");
function Ep(e) {
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
    removeSelectedElements: N,
    addSelectedNodes: D,
    updateNodePositions: y,
    emits: _
  } = We(), { onStart: R, onDrag: X, onStop: Q, onClick: B, el: T, disabled: L, id: Y, selectable: U, dragHandle: G } = e, $ = ee(!1);
  let V = [], M, F = null, q = { x: void 0, y: void 0 }, te = { x: 0, y: 0 }, ce = null, fe = !1, le = 0, he = !1;
  const pe = ZE(), be = ({ x: K, y: p }) => {
    q = { x: K, y: p };
    let O = !1;
    if (V = V.map((g) => {
      const m = { x: K - g.distance.x, y: p - g.distance.y }, { computedPosition: k } = Nl(
        g,
        n.value ? Mi(m, o.value) : m,
        _.error,
        r.value,
        g.parentNode ? v(g.parentNode) : void 0
      );
      return O = O || g.position.x !== k.x || g.position.y !== k.y, g.position = k, g;
    }), !!O && (y(V, !0, !0), $.value = !0, ce)) {
      const [g, m] = ur({
        id: Y,
        dragItems: V,
        findNode: v
      });
      X({ event: ce, node: g, nodes: m });
    }
  }, se = () => {
    if (!F)
      return;
    const [K, p] = gp(te, F, d.value);
    if (K !== 0 || p !== 0) {
      const O = {
        x: (q.x ?? 0) - K / a.value.zoom,
        y: (q.y ?? 0) - p / a.value.zoom
      };
      h({ x: K, y: p }) && be(O);
    }
    le = requestAnimationFrame(se);
  }, xe = (K, p) => {
    fe = !0;
    const O = v(Y);
    !I.value && !w.value && O && (O.selected || N()), O && Le(U) && I.value && Kr(
      O,
      w.value,
      D,
      N,
      x,
      !1,
      p
    );
    const g = pe(K.sourceEvent);
    if (q = g, V = AE(i.value, f.value, g, v, Y), V.length) {
      const [m, k] = ur({
        id: Y,
        dragItems: V,
        findNode: v
      });
      R({ event: K.sourceEvent, node: m, nodes: k });
    }
  }, $e = (K, p) => {
    var O;
    K.sourceEvent.type === "touchmove" && K.sourceEvent.touches.length > 1 || (l.value === 0 && xe(K, p), q = pe(K.sourceEvent), F = ((O = t.value) == null ? void 0 : O.getBoundingClientRect()) || null, te = mn(K.sourceEvent, F));
  }, Ee = (K, p) => {
    const O = pe(K.sourceEvent);
    if (!he && fe && c.value && (he = !0, se()), !fe) {
      const g = O.xSnapped - (q.x ?? 0), m = O.ySnapped - (q.y ?? 0);
      Math.sqrt(g * g + m * m) > l.value && xe(K, p);
    }
    (q.x !== O.xSnapped || q.y !== O.ySnapped) && V.length && fe && (ce = K.sourceEvent, te = mn(K.sourceEvent, F), be(O));
  }, ke = (K) => {
    if (!yp(K) && !fe && !$.value && !w.value) {
      const p = K, O = pe(p), g = O.xSnapped - (q.x ?? 0), m = O.ySnapped - (q.y ?? 0), k = Math.sqrt(g * g + m * m);
      k !== 0 && k <= l.value && (B == null || B(p));
      return;
    }
    if ($.value = !1, he = !1, fe = !1, q = { x: void 0, y: void 0 }, cancelAnimationFrame(le), V.length) {
      y(V, !1, !1);
      const [p, O] = ur({
        id: Y,
        dragItems: V,
        findNode: v
      });
      Q({ event: K.sourceEvent, node: p, nodes: O });
    }
  };
  return Me([() => Le(L), T], ([K, p], O, g) => {
    if (p) {
      const m = Ht(p);
      K || (M = Mk().on("start", (k) => $e(k, p)).on("drag", (k) => Ee(k, p)).on("end", (k) => ke(k)).filter((k) => {
        const S = k.target, j = Le(G);
        return !k.button && (!s.value || !yc(S, `.${s.value}`, p) && (!j || yc(S, j, p)));
      }), m.call(M)), g(() => {
        m.on(".drag", null), M && (M.on("start", null), M.on("drag", null), M.on("end", null));
      });
    }
  }), $;
}
function KE() {
  return {
    doubleClick: ye(),
    click: ye(),
    mouseEnter: ye(),
    mouseMove: ye(),
    mouseLeave: ye(),
    contextMenu: ye(),
    updateStart: ye(),
    update: ye(),
    updateEnd: ye()
  };
}
function WE(e, t) {
  const n = KE();
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
function ZE() {
  const { viewport: e, snapGrid: t, snapToGrid: n } = We();
  return (o) => {
    const s = yp(o) ? o.sourceEvent : o, { x: i, y: r } = mn(s), l = cs({ x: i, y: r }, e.value), { x: a, y: c } = n.value ? Mi(l, t.value) : l;
    return {
      xSnapped: a,
      ySnapped: c,
      ...l
    };
  };
}
function Ps() {
  return !0;
}
function xp({
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
    startConnection: N,
    updateConnection: D,
    endConnection: y,
    emits: _,
    viewport: R,
    edges: X,
    nodes: Q,
    isValidConnection: B
  } = We();
  let T = null, L = !1, Y = null, U = null;
  function G(V) {
    var M;
    const F = Le(n) === "target", q = Tl(V), te = dc(V.target);
    if (q && V.button === 0 || !q) {
      let ce = function(k) {
        p = mn(k, ke);
        const { handle: S, validHandleResult: j } = BE(
          k,
          te,
          cs(p, R.value, !1, [1, 1]),
          c.value,
          g,
          (W) => kc(
            k,
            W,
            a.value,
            Le(t),
            Le(e),
            F ? "target" : "source",
            he,
            te,
            X.value,
            Q.value,
            x
          )
        );
        if (pe = S, O || (m(), O = !0), T = j.connection, L = j.isValid, Y = j.handleDomNode, !(L && pe && (U != null && U.endHandle) && j.endHandle && U.endHandle.type === j.endHandle.type && U.endHandle.nodeId === j.endHandle.nodeId && U.endHandle.handleId === j.endHandle.handleId)) {
          if (D(
            pe && L ? cp(
              {
                x: pe.x,
                y: pe.y
              },
              R.value
            ) : p,
            j.endHandle,
            UE(!!pe, L)
          ), U = j, !pe && !L && !Y)
            return cr(K);
          T && T.source !== T.target && Y && (cr(K), K = Y, Y.classList.add("connecting", "vue-flow__handle-connecting"), Y.classList.toggle("valid", L), Y.classList.toggle("vue-flow__handle-valid", L));
        }
      }, fe = function(k) {
        (pe || Y) && T && L && (i ? i(k, T) : _.connect(T)), _.connectEnd(k), s && (r == null || r(k)), cr(K), cancelAnimationFrame(be), y(k), O = !1, L = !1, T = null, Y = null, te.removeEventListener("mousemove", ce), te.removeEventListener("mouseup", fe), te.removeEventListener("touchmove", ce), te.removeEventListener("touchend", fe);
      };
      const le = x(Le(t));
      let he = Le(o) || B.value || Ps;
      !he && le && (he = (F ? le.isValidSourcePos : le.isValidTargetPos) || Ps);
      let pe, be = 0;
      const { x: se, y: xe } = mn(V), $e = te == null ? void 0 : te.elementFromPoint(se, xe), Ee = Ml(Le(s), $e), ke = (M = l.value) == null ? void 0 : M.getBoundingClientRect();
      if (!ke || !Ee)
        return;
      let K, p = mn(V, ke), O = !1;
      const g = HE({
        nodes: Q.value,
        nodeId: Le(t),
        handleId: Le(e),
        handleType: Ee
      }), m = () => {
        if (!v.value)
          return;
        const [k, S] = gp(p, ke, w.value);
        I({ x: k, y: S }), be = requestAnimationFrame(m);
      };
      N(
        {
          nodeId: Le(t),
          handleId: Le(e),
          type: Ee,
          position: ($e == null ? void 0 : $e.getAttribute("data-handlepos")) || we.Top
        },
        {
          x: se - ke.left,
          y: xe - ke.top
        }
      ), _.connectStart({ event: V, nodeId: Le(t), handleId: Le(e), handleType: Ee }), te.addEventListener("mousemove", ce), te.addEventListener("mouseup", fe), te.addEventListener("touchmove", ce), te.addEventListener("touchend", fe);
    }
  }
  function $(V) {
    if (!d.value)
      return;
    const M = Le(n) === "target";
    if (!f.value)
      _.clickConnectStart({ event: V, nodeId: Le(t), handleId: Le(e) }), N({ nodeId: Le(t), type: Le(n), handleId: Le(e) }, void 0, !0);
    else {
      let F = Le(o) || B.value || Ps;
      const q = x(Le(t));
      if (!F && q && (F = (M ? q.isValidSourcePos : q.isValidTargetPos) || Ps), q && (typeof q.connectable > "u" ? h.value : q.connectable) === !1)
        return;
      const te = dc(V.target), { connection: ce, isValid: fe } = kc(
        V,
        {
          nodeId: Le(t),
          id: Le(e),
          type: Le(n)
        },
        a.value,
        f.value.nodeId,
        f.value.handleId || null,
        f.value.type,
        F,
        te,
        X.value,
        Q.value,
        x
      ), le = ce.source === ce.target;
      fe && !le && _.connect(ce), _.clickConnectEnd(V), y(V, !0);
    }
  }
  return {
    handlePointerDown: G,
    handleClick: $
  };
}
function JE() {
  return Qt(wp, "");
}
function Sp(e) {
  const t = e ?? JE() ?? "", n = Qt(kp, ee(null)), { findNode: o, edges: s, emits: i } = We(), r = o(t);
  return r || i.error(new at(st.NODE_NOT_FOUND, t)), {
    id: t,
    nodeEl: n,
    node: r,
    parentNode: ae(() => o(r.parentNode)),
    connectedEdges: ae(() => hp([r], s.value))
  };
}
function QE() {
  return {
    doubleClick: ye(),
    click: ye(),
    mouseEnter: ye(),
    mouseMove: ye(),
    mouseLeave: ye(),
    contextMenu: ye(),
    dragStart: ye(),
    drag: ye(),
    dragStop: ye()
  };
}
function ex(e, t) {
  const n = QE();
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
function Cp() {
  const { getSelectedNodes: e, nodeExtent: t, updateNodePositions: n, findNode: o, snapGrid: s, snapToGrid: i, nodesDraggable: r, emits: l } = We();
  return (a, c = !1) => {
    const d = i.value ? s.value[0] : 5, f = i.value ? s.value[1] : 5, h = c ? 4 : 1, v = a.x * d * h, w = a.y * f * h, x = [];
    for (const I of e.value)
      if (I.draggable || r && typeof I.draggable > "u") {
        const N = { x: I.computedPosition.x + v, y: I.computedPosition.y + w }, { computedPosition: D } = Nl(
          I,
          N,
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
const pr = 0.1;
function kn() {
  return Oi("Viewport not initialized yet."), Promise.resolve(!1);
}
const tx = {
  zoomIn: kn,
  zoomOut: kn,
  zoomTo: kn,
  fitView: kn,
  setCenter: kn,
  fitBounds: kn,
  project: (e) => e,
  screenToFlowCoordinate: (e) => e,
  flowToScreenCoordinate: (e) => e,
  setViewport: kn,
  setTransform: kn,
  getViewport: () => ({ x: 0, y: 0, zoom: 1 }),
  getTransform: () => ({ x: 0, y: 0, zoom: 1 }),
  viewportInitialized: !1
};
function nx(e) {
  function t(o, s) {
    return new Promise((i) => {
      e.d3Selection && e.d3Zoom ? e.d3Zoom.scaleBy(
        hr(e.d3Selection, s, () => {
          i(!0);
        }),
        o
      ) : i(!1);
    });
  }
  function n(o, s, i, r) {
    return new Promise((l) => {
      const { x: a, y: c } = rp({ x: -o, y: -s }, e.translateExtent), d = Io.translate(-a, -c).scale(i);
      e.d3Selection && e.d3Zoom ? e.d3Zoom.transform(
        hr(e.d3Selection, r, () => {
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
        hr(e.d3Selection, i == null ? void 0 : i.duration, () => {
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
      padding: pr,
      includeHiddenNodes: !1,
      duration: 0
    }) => {
      var i, r;
      const l = [];
      for (const h of e.nodes)
        h.dimensions.width && h.dimensions.height && ((s == null ? void 0 : s.includeHiddenNodes) || !h.hidden) && (!((i = s.nodes) != null && i.length) || (r = s.nodes) != null && r.length && s.nodes.includes(h.id)) && l.push(h);
      if (!l.length)
        return Promise.resolve(!1);
      const a = fp(l), { x: c, y: d, zoom: f } = fc(
        a,
        e.dimensions.width,
        e.dimensions.height,
        s.minZoom ?? e.minZoom,
        s.maxZoom ?? e.maxZoom,
        s.padding ?? pr,
        s.offset
      );
      return n(c, d, f, s == null ? void 0 : s.duration);
    },
    setCenter: (s, i, r) => {
      const l = typeof (r == null ? void 0 : r.zoom) < "u" ? r.zoom : e.maxZoom, a = e.dimensions.width / 2 - s * l, c = e.dimensions.height / 2 - i * l;
      return n(a, c, l, r == null ? void 0 : r.duration);
    },
    fitBounds: (s, i = { padding: pr }) => {
      const { x: r, y: l, zoom: a } = fc(
        s,
        e.dimensions.width,
        e.dimensions.height,
        e.minZoom,
        e.maxZoom,
        i.padding
      );
      return n(r, l, a, i == null ? void 0 : i.duration);
    },
    project: (s) => cs(s, e.viewport, e.snapToGrid, e.snapGrid),
    screenToFlowCoordinate: (s) => {
      if (e.vueFlowRef) {
        const { x: i, y: r } = e.vueFlowRef.getBoundingClientRect(), l = {
          x: s.x - i,
          y: s.y - r
        };
        return cs(l, e.viewport, e.snapToGrid, e.snapGrid);
      }
      return { x: 0, y: 0 };
    },
    flowToScreenCoordinate: (s) => {
      if (e.vueFlowRef) {
        const { x: i, y: r } = e.vueFlowRef.getBoundingClientRect(), l = {
          x: s.x + i,
          y: s.y + r
        };
        return cp(l, e.viewport);
      }
      return { x: 0, y: 0 };
    }
  } : tx);
}
function hr(e, t = 0, n) {
  return e.transition().duration(t).on("end", n);
}
function ox(e, t, n) {
  const o = Fc(!0);
  return o.run(() => {
    const s = () => {
      o.run(() => {
        let x, I, N = !!(n.nodes.value.length || n.edges.value.length);
        x = co([e.modelValue, () => {
          var D, y;
          return (y = (D = e.modelValue) == null ? void 0 : D.value) == null ? void 0 : y.length;
        }], ([D]) => {
          D && Array.isArray(D) && (I == null || I.pause(), n.setElements(D), !I && !N && D.length ? N = !0 : I == null || I.resume());
        }), I = co(
          [n.nodes, n.edges, () => n.edges.value.length, () => n.nodes.value.length],
          ([D, y]) => {
            var _;
            (_ = e.modelValue) != null && _.value && Array.isArray(e.modelValue.value) && (x == null || x.pause(), e.modelValue.value = [...D, ...y], ft(() => {
              x == null || x.resume();
            }));
          },
          { immediate: N }
        ), Ls(() => {
          x == null || x.stop(), I == null || I.stop();
        });
      });
    }, i = () => {
      o.run(() => {
        let x, I, N = !!n.nodes.value.length;
        x = co([e.nodes, () => {
          var D, y;
          return (y = (D = e.nodes) == null ? void 0 : D.value) == null ? void 0 : y.length;
        }], ([D]) => {
          D && Array.isArray(D) && (I == null || I.pause(), n.setNodes(D), !I && !N && D.length ? N = !0 : I == null || I.resume());
        }), I = co(
          [n.nodes, () => n.nodes.value.length],
          ([D]) => {
            var y;
            (y = e.nodes) != null && y.value && Array.isArray(e.nodes.value) && (x == null || x.pause(), e.nodes.value = [...D], ft(() => {
              x == null || x.resume();
            }));
          },
          { immediate: N }
        ), Ls(() => {
          x == null || x.stop(), I == null || I.stop();
        });
      });
    }, r = () => {
      o.run(() => {
        let x, I, N = !!n.edges.value.length;
        x = co([e.edges, () => {
          var D, y;
          return (y = (D = e.edges) == null ? void 0 : D.value) == null ? void 0 : y.length;
        }], ([D]) => {
          D && Array.isArray(D) && (I == null || I.pause(), n.setEdges(D), !I && !N && D.length ? N = !0 : I == null || I.resume());
        }), I = co(
          [n.edges, () => n.edges.value.length],
          ([D]) => {
            var y;
            (y = e.edges) != null && y.value && Array.isArray(e.edges.value) && (x == null || x.pause(), e.edges.value = [...D], ft(() => {
              x == null || x.resume();
            }));
          },
          { immediate: N }
        ), Ls(() => {
          x == null || x.stop(), I == null || I.stop();
        });
      });
    }, l = () => {
      o.run(() => {
        Me(
          () => t.maxZoom,
          () => {
            t.maxZoom && ot(t.maxZoom) && n.setMaxZoom(t.maxZoom);
          },
          {
            immediate: !0
          }
        );
      });
    }, a = () => {
      o.run(() => {
        Me(
          () => t.minZoom,
          () => {
            t.minZoom && ot(t.minZoom) && n.setMinZoom(t.minZoom);
          },
          { immediate: !0 }
        );
      });
    }, c = () => {
      o.run(() => {
        Me(
          () => t.translateExtent,
          () => {
            t.translateExtent && ot(t.translateExtent) && n.setTranslateExtent(t.translateExtent);
          },
          {
            immediate: !0
          }
        );
      });
    }, d = () => {
      o.run(() => {
        Me(
          () => t.nodeExtent,
          () => {
            t.nodeExtent && ot(t.nodeExtent) && n.setNodeExtent(t.nodeExtent);
          },
          {
            immediate: !0
          }
        );
      });
    }, f = () => {
      o.run(() => {
        Me(
          () => t.applyDefault,
          () => {
            ot(t.applyDefault) && (n.applyDefault.value = t.applyDefault);
          },
          {
            immediate: !0
          }
        );
      });
    }, h = () => {
      o.run(() => {
        const x = async (I) => {
          let N = I;
          typeof t.autoConnect == "function" && (N = await t.autoConnect(I)), N !== !1 && n.addEdges([N]);
        };
        Me(
          () => t.autoConnect,
          () => {
            ot(t.autoConnect) && (n.autoConnect.value = t.autoConnect);
          },
          { immediate: !0 }
        ), Me(
          n.autoConnect,
          (I, N, D) => {
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
        const N = I;
        if (!x.includes(N)) {
          const D = Xe(() => t[N]), y = n[N];
          tt(y) && o.run(() => {
            Me(
              D,
              (_) => {
                ot(_) && (y.value = _);
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
function sx() {
  return {
    edgesChange: ye(),
    nodesChange: ye(),
    nodeDoubleClick: ye(),
    nodeClick: ye(),
    nodeMouseEnter: ye(),
    nodeMouseMove: ye(),
    nodeMouseLeave: ye(),
    nodeContextMenu: ye(),
    nodeDragStart: ye(),
    nodeDrag: ye(),
    nodeDragStop: ye(),
    nodesInitialized: ye(),
    miniMapNodeClick: ye(),
    miniMapNodeDoubleClick: ye(),
    miniMapNodeMouseEnter: ye(),
    miniMapNodeMouseMove: ye(),
    miniMapNodeMouseLeave: ye(),
    connect: ye(),
    connectStart: ye(),
    connectEnd: ye(),
    clickConnectStart: ye(),
    clickConnectEnd: ye(),
    paneReady: ye(),
    init: ye(),
    move: ye(),
    moveStart: ye(),
    moveEnd: ye(),
    selectionDragStart: ye(),
    selectionDrag: ye(),
    selectionDragStop: ye(),
    selectionContextMenu: ye(),
    selectionStart: ye(),
    selectionEnd: ye(),
    viewportChangeStart: ye(),
    viewportChange: ye(),
    viewportChangeEnd: ye(),
    paneScroll: ye(),
    paneClick: ye(),
    paneContextMenu: ye(),
    paneMouseEnter: ye(),
    paneMouseMove: ye(),
    paneMouseLeave: ye(),
    edgeContextMenu: ye(),
    edgeMouseEnter: ye(),
    edgeMouseMove: ye(),
    edgeMouseLeave: ye(),
    edgeDoubleClick: ye(),
    edgeClick: ye(),
    edgeUpdateStart: ye(),
    edgeUpdate: ye(),
    edgeUpdateEnd: ye(),
    updateNodeInternals: ye(),
    error: ye((e) => Oi(e.message))
  };
}
function ix(e, t) {
  hd(() => {
    for (const [n, o] of Object.entries(t.value)) {
      const s = (i) => {
        e(n, i);
      };
      o.fns.add(s), Si(() => {
        o.off(s);
      });
    }
  });
}
function $p() {
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
    selectionMode: Il.Full,
    paneDragging: !1,
    preventScrolling: !0,
    zoomOnScroll: !0,
    zoomOnPinch: !0,
    zoomOnDoubleClick: !0,
    panOnScroll: !1,
    panOnScrollSpeed: 0.5,
    panOnScrollMode: Wo.Free,
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
      type: Yn.Bezier,
      style: {}
    },
    connectionMode: io.Loose,
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
    multiSelectionKeyCode: ui() ? "Meta" : "Control",
    zoomActivationKeyCode: ui() ? "Meta" : "Control",
    deleteKeyCode: "Backspace",
    panActivationKeyCode: "Space",
    hooks: sx(),
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
const rx = [
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
function lx(e, t, n) {
  const o = nx(e), s = (g) => {
    const m = g ?? [];
    e.hooks.updateNodeInternals.trigger(m);
  }, i = (g) => NE(g, e.nodes, e.edges), r = (g) => IE(g, e.nodes, e.edges), l = (g) => hp(g, e.edges), a = ({ id: g, type: m, nodeId: k }) => {
    var S;
    return Array.from(((S = e.connectionLookup.get(`${k}-${m}-${g ?? null}`)) == null ? void 0 : S.values()) ?? []);
  }, c = (g) => {
    if (g)
      return t.value.get(g);
  }, d = (g) => {
    if (g)
      return n.value.get(g);
  }, f = (g, m, k) => {
    var S, j;
    const W = [];
    for (const Z of g) {
      const P = {
        id: Z.id,
        type: "position",
        dragging: k,
        from: Z.from
      };
      if (m && (P.position = Z.position, Z.parentNode)) {
        const re = c(Z.parentNode);
        P.position = {
          x: P.position.x - (((S = re == null ? void 0 : re.computedPosition) == null ? void 0 : S.x) ?? 0),
          y: P.position.y - (((j = re == null ? void 0 : re.computedPosition) == null ? void 0 : j.y) ?? 0)
        };
      }
      W.push(P);
    }
    W != null && W.length && e.hooks.nodesChange.trigger(W);
  }, h = (g) => {
    if (!e.vueFlowRef)
      return;
    const m = e.vueFlowRef.querySelector(".vue-flow__transformationpane");
    if (!m)
      return;
    const k = window.getComputedStyle(m), { m22: S } = new window.DOMMatrixReadOnly(k.transform), j = [];
    for (let W = 0; W < g.length; ++W) {
      const Z = g[W], P = c(Z.id);
      if (P) {
        const re = Ti(Z.nodeElement);
        if (!!(re.width && re.height && (P.dimensions.width !== re.width || P.dimensions.height !== re.height || Z.forceUpdate))) {
          const ue = Z.nodeElement.getBoundingClientRect();
          P.dimensions = re, P.handleBounds.source = Ec(".source", Z.nodeElement, ue, S), P.handleBounds.target = Ec(".target", Z.nodeElement, ue, S), j.push({
            id: P.id,
            type: "dimensions",
            dimensions: re
          });
        }
      }
    }
    !e.fitViewOnInitDone && e.fitViewOnInit && o.value.fitView().then(() => {
      e.fitViewOnInitDone = !0;
    }), j.length && e.hooks.nodesChange.trigger(j);
  }, v = (g, m) => {
    const k = /* @__PURE__ */ new Set(), S = /* @__PURE__ */ new Set();
    for (const Z of g)
      eo(Z) ? k.add(Z.id) : Vn(Z) && S.add(Z.id);
    const j = $n(t.value, k, !0), W = $n(n.value, S);
    if (e.multiSelectionActive) {
      for (const Z of k)
        j.push(En(Z, m));
      for (const Z of S)
        W.push(En(Z, m));
    }
    j.length && e.hooks.nodesChange.trigger(j), W.length && e.hooks.edgesChange.trigger(W);
  }, w = (g) => {
    if (e.multiSelectionActive) {
      const m = g.map((k) => En(k.id, !0));
      e.hooks.nodesChange.trigger(m);
      return;
    }
    e.hooks.nodesChange.trigger($n(t.value, new Set(g.map((m) => m.id)), !0)), e.hooks.edgesChange.trigger($n(n.value));
  }, x = (g) => {
    if (e.multiSelectionActive) {
      const m = g.map((k) => En(k.id, !0));
      e.hooks.edgesChange.trigger(m);
      return;
    }
    e.hooks.edgesChange.trigger($n(n.value, new Set(g.map((m) => m.id)))), e.hooks.nodesChange.trigger($n(t.value, /* @__PURE__ */ new Set(), !0));
  }, I = (g) => {
    v(g, !0);
  }, N = (g) => {
    const k = (g || e.nodes).map((S) => (S.selected = !1, En(S.id, !1)));
    e.hooks.nodesChange.trigger(k);
  }, D = (g) => {
    const k = (g || e.edges).map((S) => (S.selected = !1, En(S.id, !1)));
    e.hooks.edgesChange.trigger(k);
  }, y = (g) => {
    if (!g || !g.length)
      return v([], !1);
    const m = g.reduce(
      (k, S) => {
        const j = En(S.id, !1);
        return eo(S) ? k.nodes.push(j) : k.edges.push(j), k;
      },
      { nodes: [], edges: [] }
    );
    m.nodes.length && e.hooks.nodesChange.trigger(m.nodes), m.edges.length && e.hooks.edgesChange.trigger(m.edges);
  }, _ = (g) => {
    var m;
    (m = e.d3Zoom) == null || m.scaleExtent([g, e.maxZoom]), e.minZoom = g;
  }, R = (g) => {
    var m;
    (m = e.d3Zoom) == null || m.scaleExtent([e.minZoom, g]), e.maxZoom = g;
  }, X = (g) => {
    var m;
    (m = e.d3Zoom) == null || m.translateExtent(g), e.translateExtent = g;
  }, Q = (g) => {
    e.nodeExtent = g, s();
  }, B = (g) => {
    var m;
    (m = e.d3Zoom) == null || m.clickDistance(g);
  }, T = (g) => {
    e.nodesDraggable = g, e.nodesConnectable = g, e.elementsSelectable = g;
  }, L = (g) => {
    const m = g instanceof Function ? g(e.nodes) : g;
    !e.initialized && !m.length || (e.nodes = xc(m, c, e.hooks.error.trigger));
  }, Y = (g) => {
    const m = g instanceof Function ? g(e.edges) : g;
    if (!e.initialized && !m.length)
      return;
    const k = fr(
      m,
      e.isValidConnection,
      c,
      d,
      e.hooks.error.trigger,
      e.defaultEdgeOptions,
      e.nodes,
      e.edges
    );
    dr(e.connectionLookup, k), e.edges = k;
  }, U = (g) => {
    const m = g instanceof Function ? g([...e.nodes, ...e.edges]) : g;
    !e.initialized && !m.length || (L(m.filter(eo)), Y(m.filter(Vn)));
  }, G = (g) => {
    let m = g instanceof Function ? g(e.nodes) : g;
    m = Array.isArray(m) ? m : [m];
    const k = xc(m, c, e.hooks.error.trigger), S = [];
    for (const j of k)
      S.push(vc(j));
    S.length && e.hooks.nodesChange.trigger(S);
  }, $ = (g) => {
    let m = g instanceof Function ? g(e.edges) : g;
    m = Array.isArray(m) ? m : [m];
    const k = fr(
      m,
      e.isValidConnection,
      c,
      d,
      e.hooks.error.trigger,
      e.defaultEdgeOptions,
      e.nodes,
      e.edges
    ), S = [];
    for (const j of k)
      S.push(vc(j));
    S.length && e.hooks.edgesChange.trigger(S);
  }, V = (g, m = !0, k = !1) => {
    const S = g instanceof Function ? g(e.nodes) : g, j = Array.isArray(S) ? S : [S], W = [], Z = [];
    function P(ie) {
      const ue = l(ie);
      for (const de of ue)
        (!ot(de.deletable) || de.deletable) && Z.push(mc(de.id, de.source, de.target, de.sourceHandle, de.targetHandle));
    }
    function re(ie) {
      const ue = [];
      for (const de of e.nodes)
        de.parentNode === ie && ue.push(de);
      if (ue.length) {
        for (const de of ue)
          W.push(gc(de.id));
        m && P(ue);
        for (const de of ue)
          re(de.id);
      }
    }
    for (const ie of j) {
      const ue = typeof ie == "string" ? c(ie) : ie;
      ue && (ot(ue.deletable) && !ue.deletable || (W.push(gc(ue.id)), m && P([ue]), k && re(ue.id)));
    }
    Z.length && e.hooks.edgesChange.trigger(Z), W.length && e.hooks.nodesChange.trigger(W);
  }, M = (g) => {
    const m = g instanceof Function ? g(e.edges) : g, k = Array.isArray(m) ? m : [m], S = [];
    for (const j of k) {
      const W = typeof j == "string" ? d(j) : j;
      W && (ot(W.deletable) && !W.deletable || S.push(
        mc(
          typeof j == "string" ? j : j.id,
          W.source,
          W.target,
          W.sourceHandle,
          W.targetHandle
        )
      ));
    }
    e.hooks.edgesChange.trigger(S);
  }, F = (g, m, k = !0) => {
    const S = d(g.id), j = qE(g, m, S, k, e.hooks.error.trigger);
    if (j) {
      const [W] = fr(
        [j],
        e.isValidConnection,
        c,
        d,
        e.hooks.error.trigger,
        e.defaultEdgeOptions,
        e.nodes,
        e.edges
      );
      return e.edges.splice(e.edges.indexOf(S), 1, W), dr(e.connectionLookup, [W]), W;
    }
    return !1;
  }, q = (g, m, k = { replace: !1 }) => {
    const S = d(g);
    if (!S)
      return;
    const j = typeof m == "function" ? m(S) : m;
    S.data = k.replace ? j : { ...S.data, ...j };
  }, te = (g) => hc(g, e.nodes), ce = (g) => {
    const m = hc(g, e.edges);
    return dr(e.connectionLookup, m), m;
  }, fe = (g, m, k = { replace: !1 }) => {
    const S = c(g);
    if (!S)
      return;
    const j = typeof m == "function" ? m(S) : m;
    k.replace ? e.nodes.splice(e.nodes.indexOf(S), 1, j) : Object.assign(S, j);
  }, le = (g, m, k = { replace: !1 }) => {
    const S = c(g);
    if (!S)
      return;
    const j = typeof m == "function" ? m(S) : m;
    S.data = k.replace ? j : { ...S.data, ...j };
  }, he = (g, m, k = !1) => {
    k ? e.connectionClickStartHandle = g : e.connectionStartHandle = g, e.connectionEndHandle = null, e.connectionStatus = null, m && (e.connectionPosition = m);
  }, pe = (g, m = null, k = null) => {
    e.connectionStartHandle && (e.connectionPosition = g, e.connectionEndHandle = m, e.connectionStatus = k);
  }, be = (g, m) => {
    e.connectionPosition = { x: Number.NaN, y: Number.NaN }, e.connectionEndHandle = null, e.connectionStatus = null, m ? e.connectionClickStartHandle = null : e.connectionStartHandle = null;
  }, se = (g) => {
    const m = CE(g), k = m ? null : Ho(g) ? g : c(g.id);
    return !m && !k ? [null, null, m] : [m ? g : Yr(k), k, m];
  }, xe = (g, m = !0, k = e.nodes) => {
    const [S, j, W] = se(g);
    if (!S)
      return [];
    const Z = [];
    for (const P of k || e.nodes) {
      if (!W && (P.id === j.id || !P.computedPosition))
        continue;
      const re = Yr(P), ie = Xr(re, S);
      (m && ie > 0 || ie >= Number(S.width) * Number(S.height)) && Z.push(P);
    }
    return Z;
  }, $e = (g, m, k = !0) => {
    const [S] = se(g);
    if (!S)
      return !1;
    const j = Xr(S, m);
    return k && j > 0 || j >= Number(S.width) * Number(S.height);
  }, Ee = (g) => {
    const { viewport: m, dimensions: k, d3Zoom: S, d3Selection: j, translateExtent: W } = e;
    if (!S || !j || !g.x && !g.y)
      return !1;
    const Z = Io.translate(m.x + g.x, m.y + g.y).scale(m.zoom), P = [
      [0, 0],
      [k.width, k.height]
    ], re = S.constrain()(Z, P, W), ie = e.viewport.x !== re.x || e.viewport.y !== re.y || e.viewport.zoom !== re.k;
    return S.transform(j, re), ie;
  }, ke = (g) => {
    const m = g instanceof Function ? g(e) : g, k = [
      "d3Zoom",
      "d3Selection",
      "d3ZoomHandler",
      "viewportRef",
      "vueFlowRef",
      "dimensions",
      "hooks"
    ];
    ot(m.defaultEdgeOptions) && (e.defaultEdgeOptions = m.defaultEdgeOptions);
    const S = m.modelValue || m.nodes || m.edges ? [] : void 0;
    S && (m.modelValue && S.push(...m.modelValue), m.nodes && S.push(...m.nodes), m.edges && S.push(...m.edges), U(S));
    const j = () => {
      ot(m.maxZoom) && R(m.maxZoom), ot(m.minZoom) && _(m.minZoom), ot(m.translateExtent) && X(m.translateExtent);
    };
    for (const W of Object.keys(m)) {
      const Z = W, P = m[Z];
      ![...rx, ...k].includes(Z) && ot(P) && (e[Z] = P);
    }
    Rr(() => e.d3Zoom).not.toBeNull().then(j), e.initialized || (e.initialized = !0);
  };
  return {
    updateNodePositions: f,
    updateNodeDimensions: h,
    setElements: U,
    setNodes: L,
    setEdges: Y,
    addNodes: G,
    addEdges: $,
    removeNodes: V,
    removeEdges: M,
    findNode: c,
    findEdge: d,
    updateEdge: F,
    updateEdgeData: q,
    updateNode: fe,
    updateNodeData: le,
    applyEdgeChanges: ce,
    applyNodeChanges: te,
    addSelectedElements: I,
    addSelectedNodes: w,
    addSelectedEdges: x,
    setMinZoom: _,
    setMaxZoom: R,
    setTranslateExtent: X,
    setNodeExtent: Q,
    setPaneClickDistance: B,
    removeSelectedElements: y,
    removeSelectedNodes: N,
    removeSelectedEdges: D,
    startConnection: he,
    updateConnection: pe,
    endConnection: be,
    setInteractive: T,
    setState: ke,
    getIntersectingNodes: xe,
    getIncomers: i,
    getOutgoers: r,
    getConnectedEdges: l,
    getHandleConnections: a,
    isNodeIntersecting: $e,
    panBy: Ee,
    fitView: (g) => o.value.fitView(g),
    zoomIn: (g) => o.value.zoomIn(g),
    zoomOut: (g) => o.value.zoomOut(g),
    zoomTo: (g, m) => o.value.zoomTo(g, m),
    setViewport: (g, m) => o.value.setViewport(g, m),
    setTransform: (g, m) => o.value.setTransform(g, m),
    getViewport: () => o.value.getViewport(),
    getTransform: () => o.value.getTransform(),
    setCenter: (g, m, k) => o.value.setCenter(g, m, k),
    fitBounds: (g, m) => o.value.fitBounds(g, m),
    project: (g) => o.value.project(g),
    screenToFlowCoordinate: (g) => o.value.screenToFlowCoordinate(g),
    flowToScreenCoordinate: (g) => o.value.flowToScreenCoordinate(g),
    toObject: () => {
      const g = [], m = [];
      for (const k of e.nodes) {
        const {
          computedPosition: S,
          handleBounds: j,
          selected: W,
          dimensions: Z,
          isParent: P,
          resizing: re,
          dragging: ie,
          events: ue,
          ...de
        } = k;
        g.push(de);
      }
      for (const k of e.edges) {
        const { selected: S, sourceNode: j, targetNode: W, events: Z, ...P } = k;
        m.push(P);
      }
      return JSON.parse(
        JSON.stringify({
          nodes: g,
          edges: m,
          position: [e.viewport.x, e.viewport.y],
          zoom: e.viewport.zoom,
          viewport: e.viewport
        })
      );
    },
    fromObject: (g) => new Promise((m) => {
      const { nodes: k, edges: S, position: j, zoom: W, viewport: Z } = g;
      if (k && L(k), S && Y(S), Z != null && Z.x && (Z != null && Z.y) || j) {
        const P = (Z == null ? void 0 : Z.x) || j[0], re = (Z == null ? void 0 : Z.y) || j[1], ie = (Z == null ? void 0 : Z.zoom) || W || e.viewport.zoom;
        return Rr(() => o.value.viewportInitialized).toBe(!0).then(() => {
          o.value.setViewport({
            x: P,
            y: re,
            zoom: ie
          }).then(() => {
            m(!0);
          });
        });
      } else
        m(!0);
    }),
    updateNodeInternals: s,
    viewportHelper: o,
    $reset: () => {
      const g = $p();
      if (e.edges = [], e.nodes = [], e.d3Zoom && e.d3Selection) {
        const m = Io.translate(g.defaultViewport.x ?? 0, g.defaultViewport.y ?? 0).scale(ro(g.defaultViewport.zoom ?? 1, g.minZoom, g.maxZoom)), k = e.viewportRef.getBoundingClientRect(), S = [
          [0, 0],
          [k.width, k.height]
        ], j = e.d3Zoom.constrain()(m, S, g.translateExtent);
        e.d3Zoom.transform(e.d3Selection, j);
      }
      ke(g);
    },
    $destroy: () => {
    }
  };
}
const ax = ["data-id", "data-handleid", "data-nodeid", "data-handlepos"], ux = {
  name: "Handle",
  compatConfig: { MODE: 3 }
}, Dn = /* @__PURE__ */ De({
  ...ux,
  props: {
    id: { default: null },
    type: {},
    position: { default: () => we.Top },
    isValidConnection: { type: Function },
    connectable: { type: [Boolean, Number, String, Function], default: void 0 },
    connectableStart: { type: Boolean, default: !0 },
    connectableEnd: { type: Boolean, default: !0 }
  },
  setup(e, { expose: t }) {
    const n = kd(e, ["position", "connectable", "connectableStart", "connectableEnd", "id"]), o = Xe(() => n.type ?? "source"), s = Xe(() => n.isValidConnection ?? null), {
      connectionStartHandle: i,
      connectionClickStartHandle: r,
      connectionEndHandle: l,
      vueFlowRef: a,
      nodesConnectable: c,
      noDragClassName: d,
      noPanClassName: f
    } = We(), { id: h, node: v, nodeEl: w, connectedEdges: x } = Sp(), I = ee(), N = Xe(() => typeof e.connectableStart < "u" ? e.connectableStart : !0), D = Xe(() => typeof e.connectableEnd < "u" ? e.connectableEnd : !0), y = Xe(
      () => {
        var L, Y, U, G, $, V;
        return ((L = i.value) == null ? void 0 : L.nodeId) === h && ((Y = i.value) == null ? void 0 : Y.handleId) === e.id && ((U = i.value) == null ? void 0 : U.type) === o.value || ((G = l.value) == null ? void 0 : G.nodeId) === h && (($ = l.value) == null ? void 0 : $.handleId) === e.id && ((V = l.value) == null ? void 0 : V.type) === o.value;
      }
    ), _ = Xe(
      () => {
        var L, Y, U;
        return ((L = r.value) == null ? void 0 : L.nodeId) === h && ((Y = r.value) == null ? void 0 : Y.handleId) === e.id && ((U = r.value) == null ? void 0 : U.type) === o.value;
      }
    ), { handlePointerDown: R, handleClick: X } = xp({
      nodeId: h,
      handleId: e.id,
      isValidConnection: s,
      type: o
    }), Q = ae(() => typeof e.connectable == "string" && e.connectable === "single" ? !x.value.some((L) => {
      const Y = L[`${o.value}Handle`];
      return L[o.value] !== h ? !1 : Y ? Y === e.id : !0;
    }) : typeof e.connectable == "number" ? x.value.filter((L) => {
      const Y = L[`${o.value}Handle`];
      return L[o.value] !== h ? !1 : Y ? Y === e.id : !0;
    }).length < e.connectable : typeof e.connectable == "function" ? e.connectable(v, x.value) : ot(e.connectable) ? e.connectable : c.value);
    ht(() => {
      var L;
      if (!v.dimensions.width || !v.dimensions.height)
        return;
      const Y = (L = v.handleBounds[o.value]) == null ? void 0 : L.find((q) => q.id === e.id);
      if (!a.value || Y)
        return;
      const U = a.value.querySelector(".vue-flow__transformationpane");
      if (!w.value || !I.value || !U || !e.id)
        return;
      const G = w.value.getBoundingClientRect(), $ = I.value.getBoundingClientRect(), V = window.getComputedStyle(U), { m22: M } = new window.DOMMatrixReadOnly(V.transform), F = {
        id: e.id,
        position: e.position,
        x: ($.left - G.left) / M,
        y: ($.top - G.top) / M,
        ...Ti(I.value)
      };
      v.handleBounds[o.value] = [...v.handleBounds[o.value] ?? [], F];
    }), bi(() => {
      const L = v.handleBounds[o.value];
      L && (v.handleBounds[o.value] = L.filter((Y) => Y.id !== e.id));
    });
    function B(L) {
      const Y = Tl(L);
      Q.value && N.value && (Y && L.button === 0 || !Y) && R(L);
    }
    function T(L) {
      !h || !r.value && !N.value || Q.value && X(L);
    }
    return t({
      handleClick: X,
      handlePointerDown: R,
      onClick: T,
      onPointerDown: B
    }), (L, Y) => (E(), C("div", {
      ref_key: "handle",
      ref: I,
      "data-id": `${H(h)}-${e.id}-${o.value}`,
      "data-handleid": e.id,
      "data-nodeid": H(h),
      "data-handlepos": L.position,
      class: ge(["vue-flow__handle", [
        `vue-flow__handle-${L.position}`,
        `vue-flow__handle-${e.id}`,
        H(d),
        H(f),
        o.value,
        {
          connectable: Q.value,
          connecting: _.value,
          connectablestart: N.value,
          connectableend: D.value,
          connectionindicator: Q.value && (N.value && !y.value || D.value && y.value)
        }
      ]]),
      onMousedown: B,
      onTouchstartPassive: B,
      onClick: T
    }, [
      no(L.$slots, "default", { id: L.id })
    ], 42, ax));
  }
}), Ai = function({
  sourcePosition: e = we.Bottom,
  targetPosition: t = we.Top,
  label: n,
  connectable: o = !0,
  isValidTargetPos: s,
  isValidSourcePos: i,
  data: r
}) {
  const l = r.label || n;
  return [
    Be(Dn, { type: "target", position: t, connectable: o, isValidConnection: s }),
    typeof l != "string" && l ? Be(l) : Be(_e, [l]),
    Be(Dn, { type: "source", position: e, connectable: o, isValidConnection: i })
  ];
};
Ai.props = ["sourcePosition", "targetPosition", "label", "isValidTargetPos", "isValidSourcePos", "connectable", "data"];
Ai.inheritAttrs = !1;
Ai.compatConfig = { MODE: 3 };
const cx = Ai, Di = function({
  targetPosition: e = we.Top,
  label: t,
  connectable: n = !0,
  isValidTargetPos: o,
  data: s
}) {
  const i = s.label || t;
  return [
    Be(Dn, { type: "target", position: e, connectable: n, isValidConnection: o }),
    typeof i != "string" && i ? Be(i) : Be(_e, [i])
  ];
};
Di.props = ["targetPosition", "label", "isValidTargetPos", "connectable", "data"];
Di.inheritAttrs = !1;
Di.compatConfig = { MODE: 3 };
const dx = Di, Ri = function({
  sourcePosition: e = we.Bottom,
  label: t,
  connectable: n = !0,
  isValidSourcePos: o,
  data: s
}) {
  const i = s.label || t;
  return [
    typeof i != "string" && i ? Be(i) : Be(_e, [i]),
    Be(Dn, { type: "source", position: e, connectable: n, isValidConnection: o })
  ];
};
Ri.props = ["sourcePosition", "label", "isValidSourcePos", "connectable", "data"];
Ri.inheritAttrs = !1;
Ri.compatConfig = { MODE: 3 };
const fx = Ri, px = ["transform"], hx = ["width", "height", "x", "y", "rx", "ry"], vx = ["y"], gx = {
  name: "EdgeText",
  compatConfig: { MODE: 3 }
}, mx = /* @__PURE__ */ De({
  ...gx,
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
    ht(s), Me([() => e.x, () => e.y, n, () => e.label], s);
    function s() {
      if (!n.value)
        return;
      const i = n.value.getBBox();
      (i.width !== t.value.width || i.height !== t.value.height) && (t.value = i);
    }
    return (i, r) => (E(), C("g", {
      transform: o.value,
      class: "vue-flow__edge-textwrapper"
    }, [
      i.labelShowBg ? (E(), C("rect", {
        key: 0,
        class: "vue-flow__edge-textbg",
        width: `${t.value.width + 2 * i.labelBgPadding[0]}px`,
        height: `${t.value.height + 2 * i.labelBgPadding[1]}px`,
        x: -i.labelBgPadding[0],
        y: -i.labelBgPadding[1],
        style: Ye(i.labelBgStyle),
        rx: i.labelBgBorderRadius,
        ry: i.labelBgBorderRadius
      }, null, 12, hx)) : oe("", !0),
      u("text", vl(i.$attrs, {
        ref_key: "el",
        ref: n,
        class: "vue-flow__edge-text",
        y: t.value.height / 2,
        dy: "0.3em",
        style: i.labelStyle
      }), [
        no(i.$slots, "default", {}, () => [
          typeof i.label != "string" ? (E(), lt(yd(i.label), { key: 0 })) : (E(), C(_e, { key: 1 }, [
            me(A(i.label), 1)
          ], 64))
        ])
      ], 16, vx)
    ], 8, px));
  }
}), yx = ["id", "d", "marker-end", "marker-start"], bx = ["d", "stroke-width"], _x = {
  name: "BaseEdge",
  inheritAttrs: !1,
  compatConfig: { MODE: 3 }
}, bs = /* @__PURE__ */ De({
  ..._x,
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
    const n = kd(e, ["interactionWidth", "labelShowBg"]), o = ee(null), s = ee(null), i = ee(null), r = Gh();
    return t({
      pathEl: o,
      interactionEl: s,
      labelEl: i
    }), (l, a) => (E(), C(_e, null, [
      u("path", {
        id: l.id,
        ref_key: "pathEl",
        ref: o,
        d: l.path,
        style: Ye(n.style),
        class: ge(["vue-flow__edge-path", H(r).class]),
        "marker-end": l.markerEnd,
        "marker-start": l.markerStart
      }, null, 14, yx),
      l.interactionWidth ? (E(), C("path", {
        key: 0,
        ref_key: "interactionEl",
        ref: s,
        fill: "none",
        d: l.path,
        "stroke-width": l.interactionWidth,
        "stroke-opacity": 0,
        class: "vue-flow__edge-interaction"
      }, null, 8, bx)) : oe("", !0),
      l.label && l.labelX && l.labelY ? (E(), lt(mx, {
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
      }, null, 8, ["x", "y", "label", "label-show-bg", "label-bg-style", "label-bg-padding", "label-bg-border-radius", "label-style"])) : oe("", !0)
    ], 64));
  }
});
function Ip({
  sourceX: e,
  sourceY: t,
  targetX: n,
  targetY: o
}) {
  const s = Math.abs(n - e) / 2, i = n < e ? n + s : n - s, r = Math.abs(o - t) / 2, l = o < t ? o + r : o - r;
  return [i, l, s, r];
}
function Np({
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
function As(e, t) {
  return e >= 0 ? 0.5 * e : t * 25 * Math.sqrt(-e);
}
function Cc({ pos: e, x1: t, y1: n, x2: o, y2: s, c: i }) {
  let r, l;
  switch (e) {
    case we.Left:
      r = t - As(t - o, i), l = n;
      break;
    case we.Right:
      r = t + As(o - t, i), l = n;
      break;
    case we.Top:
      r = t, l = n - As(n - s, i);
      break;
    case we.Bottom:
      r = t, l = n + As(s - n, i);
      break;
  }
  return [r, l];
}
function Tp(e) {
  const {
    sourceX: t,
    sourceY: n,
    sourcePosition: o = we.Bottom,
    targetX: s,
    targetY: i,
    targetPosition: r = we.Top,
    curvature: l = 0.25
  } = e, [a, c] = Cc({
    pos: o,
    x1: t,
    y1: n,
    x2: s,
    y2: i,
    c: l
  }), [d, f] = Cc({
    pos: r,
    x1: s,
    y1: i,
    x2: t,
    y2: n,
    c: l
  }), [h, v, w, x] = Np({
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
function $c({ pos: e, x1: t, y1: n, x2: o, y2: s }) {
  let i, r;
  switch (e) {
    case we.Left:
    case we.Right:
      i = 0.5 * (t + o), r = n;
      break;
    case we.Top:
    case we.Bottom:
      i = t, r = 0.5 * (n + s);
      break;
  }
  return [i, r];
}
function Mp(e) {
  const {
    sourceX: t,
    sourceY: n,
    sourcePosition: o = we.Bottom,
    targetX: s,
    targetY: i,
    targetPosition: r = we.Top
  } = e, [l, a] = $c({
    pos: o,
    x1: t,
    y1: n,
    x2: s,
    y2: i
  }), [c, d] = $c({
    pos: r,
    x1: s,
    y1: i,
    x2: t,
    y2: n
  }), [f, h, v, w] = Np({
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
const Ic = {
  [we.Left]: { x: -1, y: 0 },
  [we.Right]: { x: 1, y: 0 },
  [we.Top]: { x: 0, y: -1 },
  [we.Bottom]: { x: 0, y: 1 }
};
function wx({
  source: e,
  sourcePosition: t = we.Bottom,
  target: n
}) {
  return t === we.Left || t === we.Right ? e.x < n.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < n.y ? { x: 0, y: 1 } : { x: 0, y: -1 };
}
function Nc(e, t) {
  return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
}
function kx({
  source: e,
  sourcePosition: t = we.Bottom,
  target: n,
  targetPosition: o = we.Top,
  center: s,
  offset: i
}) {
  const r = Ic[t], l = Ic[o], a = { x: e.x + r.x * i, y: e.y + r.y * i }, c = { x: n.x + l.x * i, y: n.y + l.y * i }, d = wx({
    source: a,
    sourcePosition: t,
    target: c
  }), f = d.x !== 0 ? "x" : "y", h = d[f];
  let v, w, x;
  const I = { x: 0, y: 0 }, N = { x: 0, y: 0 }, [D, y, _, R] = Ip({
    sourceX: e.x,
    sourceY: e.y,
    targetX: n.x,
    targetY: n.y
  });
  if (r[f] * l[f] === -1) {
    w = s.x ?? D, x = s.y ?? y;
    const Q = [
      { x: w, y: a.y },
      { x: w, y: c.y }
    ], B = [
      { x: a.x, y: x },
      { x: c.x, y: x }
    ];
    r[f] === h ? v = f === "x" ? Q : B : v = f === "x" ? B : Q;
  } else {
    const Q = [{ x: a.x, y: c.y }], B = [{ x: c.x, y: a.y }];
    if (f === "x" ? v = r.x === h ? B : Q : v = r.y === h ? Q : B, t === o) {
      const G = Math.abs(e[f] - n[f]);
      if (G <= i) {
        const $ = Math.min(i - 1, i - G);
        r[f] === h ? I[f] = (a[f] > e[f] ? -1 : 1) * $ : N[f] = (c[f] > n[f] ? -1 : 1) * $;
      }
    }
    if (t !== o) {
      const G = f === "x" ? "y" : "x", $ = r[f] === l[G], V = a[G] > c[G], M = a[G] < c[G];
      (r[f] === 1 && (!$ && V || $ && M) || r[f] !== 1 && (!$ && M || $ && V)) && (v = f === "x" ? Q : B);
    }
    const T = { x: a.x + I.x, y: a.y + I.y }, L = { x: c.x + N.x, y: c.y + N.y }, Y = Math.max(Math.abs(T.x - v[0].x), Math.abs(L.x - v[0].x)), U = Math.max(Math.abs(T.y - v[0].y), Math.abs(L.y - v[0].y));
    Y >= U ? (w = (T.x + L.x) / 2, x = v[0].y) : (w = v[0].x, x = (T.y + L.y) / 2);
  }
  return [[
    e,
    { x: a.x + I.x, y: a.y + I.y },
    ...v,
    { x: c.x + N.x, y: c.y + N.y },
    n
  ], w, x, _, R];
}
function Ex(e, t, n, o) {
  const s = Math.min(Nc(e, t) / 2, Nc(t, n) / 2, o), { x: i, y: r } = t;
  if (e.x === i && i === n.x || e.y === r && r === n.y)
    return `L${i} ${r}`;
  if (e.y === r) {
    const c = e.x < n.x ? -1 : 1, d = e.y < n.y ? 1 : -1;
    return `L ${i + s * c},${r}Q ${i},${r} ${i},${r + s * d}`;
  }
  const l = e.x < n.x ? 1 : -1, a = e.y < n.y ? -1 : 1;
  return `L ${i},${r + s * a}Q ${i},${r} ${i + s * l},${r}`;
}
function Wr(e) {
  const {
    sourceX: t,
    sourceY: n,
    sourcePosition: o = we.Bottom,
    targetX: s,
    targetY: i,
    targetPosition: r = we.Top,
    borderRadius: l = 5,
    centerX: a,
    centerY: c,
    offset: d = 20
  } = e, [f, h, v, w, x] = kx({
    source: { x: t, y: n },
    sourcePosition: o,
    target: { x: s, y: i },
    targetPosition: r,
    center: { x: a, y: c },
    offset: d
  });
  return [f.reduce((N, D, y) => {
    let _;
    return y > 0 && y < f.length - 1 ? _ = Ex(f[y - 1], D, f[y + 1], l) : _ = `${y === 0 ? "M" : "L"}${D.x} ${D.y}`, N += _, N;
  }, ""), h, v, w, x];
}
function xx(e) {
  const { sourceX: t, sourceY: n, targetX: o, targetY: s } = e, [i, r, l, a] = Ip({
    sourceX: t,
    sourceY: n,
    targetX: o,
    targetY: s
  });
  return [`M ${t},${n}L ${o},${s}`, i, r, l, a];
}
const Sx = /* @__PURE__ */ De({
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
      const [n, o, s] = xx(e);
      return Be(bs, {
        path: n,
        labelX: o,
        labelY: s,
        ...t,
        ...e
      });
    };
  }
}), Cx = Sx, $x = /* @__PURE__ */ De({
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
      const [n, o, s] = Wr({
        ...e,
        sourcePosition: e.sourcePosition ?? we.Bottom,
        targetPosition: e.targetPosition ?? we.Top
      });
      return Be(bs, {
        path: n,
        labelX: o,
        labelY: s,
        ...t,
        ...e
      });
    };
  }
}), Op = $x, Ix = /* @__PURE__ */ De({
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
    return () => Be(Op, { ...e, ...t, borderRadius: 0 });
  }
}), Nx = Ix, Tx = /* @__PURE__ */ De({
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
      const [n, o, s] = Tp({
        ...e,
        sourcePosition: e.sourcePosition ?? we.Bottom,
        targetPosition: e.targetPosition ?? we.Top
      });
      return Be(bs, {
        path: n,
        labelX: o,
        labelY: s,
        ...t,
        ...e
      });
    };
  }
}), Mx = Tx, Ox = /* @__PURE__ */ De({
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
      const [n, o, s] = Mp({
        ...e,
        sourcePosition: e.sourcePosition ?? we.Bottom,
        targetPosition: e.targetPosition ?? we.Top
      });
      return Be(bs, {
        path: n,
        labelX: o,
        labelY: s,
        ...t,
        ...e
      });
    };
  }
}), Px = Ox, Ax = {
  input: fx,
  default: cx,
  output: dx
}, Dx = {
  default: Mx,
  straight: Cx,
  step: Nx,
  smoothstep: Op,
  simplebezier: Px
};
function Rx(e, t, n) {
  const o = ae(() => (x) => t.value.get(x)), s = ae(() => (x) => n.value.get(x)), i = ae(() => {
    const x = {
      ...Dx,
      ...e.edgeTypes
    }, I = Object.keys(x);
    for (const N of e.edges)
      N.type && !I.includes(N.type) && (x[N.type] = N.type);
    return x;
  }), r = ae(() => {
    const x = {
      ...Ax,
      ...e.nodeTypes
    }, I = Object.keys(x);
    for (const N of e.nodes)
      N.type && !I.includes(N.type) && (x[N.type] = N.type);
    return x;
  }), l = ae(() => e.onlyRenderVisibleElements ? pp(
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
        const N = t.value.get(I.source), D = t.value.get(I.target);
        VE({
          sourcePos: N.computedPosition || { x: 0, y: 0 },
          targetPos: D.computedPosition || { x: 0, y: 0 },
          sourceWidth: N.dimensions.width,
          sourceHeight: N.dimensions.height,
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
class Xn {
  constructor() {
    this.currentId = 0, this.flows = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    var t;
    const n = (t = To()) == null ? void 0 : t.appContext.app, o = (n == null ? void 0 : n.config.globalProperties.$vueFlowStorage) ?? Xn.instance;
    return Xn.instance = o ?? new Xn(), n && (n.config.globalProperties.$vueFlowStorage = Xn.instance), Xn.instance;
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
    const o = $p(), s = Rn(o), i = {};
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
    }), c = Rx(s, l, a), d = lx(s, l, a);
    d.setState({ ...s, ...n });
    const f = {
      ...i,
      ...c,
      ...d,
      ...F0(s),
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
function We(e) {
  const t = Xn.getInstance(), n = nl(), o = typeof e == "object", s = o ? e : { id: e }, i = s.id, r = i ?? (n == null ? void 0 : n.vueFlowId);
  let l;
  if (n) {
    const a = Qt(Sc, null);
    typeof a < "u" && a !== null && (!r || a.id === r) && (l = a);
  }
  if (l || r && (l = t.get(r)), !l || r && l.id !== r) {
    const a = i ?? t.getId(), c = t.create(a, s);
    l = c, (n ?? Fc(!0)).run(() => {
      Me(
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
      ), Si(() => {
        if (l) {
          const f = t.get(l.id);
          f ? f.$destroy() : Oi(`No store instance found for id ${l.id} in storage.`);
        }
      });
    });
  } else
    o && l.setState(s);
  if (n && (oo(Sc, l), n.vueFlowId = l.id), o) {
    const a = To();
    (a == null ? void 0 : a.type.name) !== "VueFlow" && l.emits.error(new at(st.USEVUEFLOW_OPTIONS));
  }
  return l;
}
function Lx(e) {
  const { emits: t, dimensions: n } = We();
  let o;
  ht(() => {
    const s = e.value, i = () => {
      if (!s)
        return;
      const r = Ti(s);
      (r.width === 0 || r.height === 0) && t.error(new at(st.MISSING_VIEWPORT_DIMENSIONS)), n.value = { width: r.width || 500, height: r.height || 500 };
    };
    i(), window.addEventListener("resize", i), s && (o = new ResizeObserver(() => i()), o.observe(s)), _n(() => {
      window.removeEventListener("resize", i), o && s && o.unobserve(s);
    });
  });
}
const Vx = {
  name: "UserSelection",
  compatConfig: { MODE: 3 }
}, zx = /* @__PURE__ */ De({
  ...Vx,
  props: {
    userSelectionRect: {}
  },
  setup(e) {
    return (t, n) => (E(), C("div", {
      class: "vue-flow__selection vue-flow__container",
      style: Ye({
        width: `${t.userSelectionRect.width}px`,
        height: `${t.userSelectionRect.height}px`,
        transform: `translate(${t.userSelectionRect.x}px, ${t.userSelectionRect.y}px)`
      })
    }, null, 4));
  }
}), Fx = ["tabIndex"], Bx = {
  name: "NodesSelection",
  compatConfig: { MODE: 3 }
}, Hx = /* @__PURE__ */ De({
  ...Bx,
  setup(e) {
    const { emits: t, viewport: n, getSelectedNodes: o, noPanClassName: s, disableKeyboardA11y: i, userSelectionActive: r } = We(), l = Cp(), a = ee(null), c = Ep({
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
    ht(() => {
      var w;
      i.value || (w = a.value) == null || w.focus({ preventScroll: !0 });
    });
    const d = ae(() => fp(o.value)), f = ae(() => ({
      width: `${d.value.width}px`,
      height: `${d.value.height}px`,
      top: `${d.value.y}px`,
      left: `${d.value.x}px`
    }));
    function h(w) {
      t.selectionContextMenu({ event: w, nodes: o.value });
    }
    function v(w) {
      i || ko[w.key] && (w.preventDefault(), l(
        {
          x: ko[w.key].x,
          y: ko[w.key].y
        },
        w.shiftKey
      ));
    }
    return (w, x) => !H(r) && d.value.width && d.value.height ? (E(), C("div", {
      key: 0,
      class: ge(["vue-flow__nodesselection vue-flow__container", H(s)]),
      style: Ye({ transform: `translate(${H(n).x}px,${H(n).y}px) scale(${H(n).zoom})` })
    }, [
      u("div", {
        ref_key: "el",
        ref: a,
        class: ge([{ dragging: H(c) }, "vue-flow__nodesselection-rect"]),
        style: Ye(f.value),
        tabIndex: H(i) ? void 0 : -1,
        onContextmenu: h,
        onKeydown: v
      }, null, 46, Fx)
    ], 6)) : oe("", !0);
  }
});
function Ux(e, t) {
  return {
    x: e.clientX - t.left,
    y: e.clientY - t.top
  };
}
const jx = {
  name: "Pane",
  compatConfig: { MODE: 3 }
}, Gx = /* @__PURE__ */ De({
  ...jx,
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
      multiSelectionActive: N,
      edgeLookup: D,
      nodeLookup: y
    } = We(), _ = ee(null), R = ee(0), X = ee(0), Q = ee(), B = ee(/* @__PURE__ */ new Map()), T = Xe(() => a.value && (e.isSelecting || i.value));
    let L = !1, Y = !1;
    const U = Zo(x, { actInsideInputWithModifier: !1 }), G = Zo(I);
    Me(U, (le) => {
      le && (h(f.value), v(d.value), c.value = !1);
    }), Me(G, (le) => {
      N.value = le;
    });
    function $(le, he) {
      return (pe) => {
        pe.target === he && (le == null || le(pe));
      };
    }
    function V() {
      i.value = !1, l.value = null, R.value = 0, X.value = 0;
    }
    function M(le) {
      if (L) {
        L = !1;
        return;
      }
      s.paneClick(le), r(), c.value = !1;
    }
    function F(le) {
      le.preventDefault(), le.stopPropagation(), s.paneContextMenu(le);
    }
    function q(le) {
      s.paneScroll(le);
    }
    function te(le) {
      var he, pe, be, se, xe;
      if (Q.value = (he = t.value) == null ? void 0 : he.getBoundingClientRect(), !a.value || !e.isSelecting || le.button !== 0 || le.target !== _.value || !Q.value)
        return;
      (be = (pe = le.target) == null ? void 0 : pe.setPointerCapture) == null || be.call(pe, le.pointerId);
      const { x: $e, y: Ee } = Ux(le, Q.value);
      Y = !0, L = !1, B.value = /* @__PURE__ */ new Map();
      for (const [ke, K] of D.value)
        B.value.set(K.source, ((se = B.value.get(K.source)) == null ? void 0 : se.add(ke)) || /* @__PURE__ */ new Set([ke])), B.value.set(K.target, ((xe = B.value.get(K.target)) == null ? void 0 : xe.add(ke)) || /* @__PURE__ */ new Set([ke]));
      r(), l.value = {
        width: 0,
        height: 0,
        startX: $e,
        startY: Ee,
        x: $e,
        y: Ee
      }, s.selectionStart(le);
    }
    function ce(le) {
      if (!Q.value || !l.value)
        return;
      L = !0;
      const { x: he, y: pe } = mn(le, Q.value), { startX: be = 0, startY: se = 0 } = l.value, xe = {
        startX: be,
        startY: se,
        x: he < be ? he : be,
        y: pe < se ? pe : se,
        width: Math.abs(he - be),
        height: Math.abs(pe - se)
      }, $e = pp(
        n.value,
        xe,
        o.value,
        w.value === Il.Partial,
        !0
      ), Ee = /* @__PURE__ */ new Set(), ke = /* @__PURE__ */ new Set();
      for (const K of $e) {
        ke.add(K.id);
        const p = B.value.get(K.id);
        if (p)
          for (const O of p)
            Ee.add(O);
      }
      if (R.value !== ke.size) {
        R.value = ke.size;
        const K = $n(y.value, ke, !0);
        s.nodesChange(K);
      }
      if (X.value !== Ee.size) {
        X.value = Ee.size;
        const K = $n(D.value, Ee);
        s.edgesChange(K);
      }
      l.value = xe, i.value = !0, c.value = !1;
    }
    function fe(le) {
      var he;
      le.button !== 0 || !Y || ((he = le.target) == null || he.releasePointerCapture(le.pointerId), !i.value && l.value && le.target === _.value && M(le), R.value > 0 && (c.value = !0), V(), s.selectionEnd(le), e.selectionKeyPressed && (L = !1), Y = !1);
    }
    return (le, he) => (E(), C("div", {
      ref_key: "container",
      ref: _,
      class: ge(["vue-flow__pane vue-flow__container", { selection: le.isSelecting }]),
      onClick: he[0] || (he[0] = (pe) => T.value ? void 0 : $(M, _.value)(pe)),
      onContextmenu: he[1] || (he[1] = (pe) => $(F, _.value)(pe)),
      onWheelPassive: he[2] || (he[2] = (pe) => $(q, _.value)(pe)),
      onPointerenter: he[3] || (he[3] = (pe) => T.value ? void 0 : H(s).paneMouseEnter(pe)),
      onPointerdown: he[4] || (he[4] = (pe) => T.value ? te(pe) : H(s).paneMouseMove(pe)),
      onPointermove: he[5] || (he[5] = (pe) => T.value ? ce(pe) : H(s).paneMouseMove(pe)),
      onPointerup: he[6] || (he[6] = (pe) => T.value ? fe(pe) : void 0),
      onPointerleave: he[7] || (he[7] = (pe) => H(s).paneMouseLeave(pe))
    }, [
      no(le.$slots, "default"),
      H(i) && H(l) ? (E(), lt(zx, {
        key: 0,
        "user-selection-rect": H(l)
      }, null, 8, ["user-selection-rect"])) : oe("", !0),
      H(c) && H(f).length ? (E(), lt(Hx, { key: 1 })) : oe("", !0)
    ], 34));
  }
}), qx = {
  name: "Transform",
  compatConfig: { MODE: 3 }
}, Yx = /* @__PURE__ */ De({
  ...qx,
  setup(e) {
    const { viewport: t, fitViewOnInit: n, fitViewOnInitDone: o } = We(), s = ae(() => n.value ? !o.value : !1), i = ae(() => `translate(${t.value.x}px,${t.value.y}px) scale(${t.value.zoom})`);
    return (r, l) => (E(), C("div", {
      class: "vue-flow__transformationpane vue-flow__container",
      style: Ye({ transform: i.value, opacity: s.value ? 0 : void 0 })
    }, [
      no(r.$slots, "default")
    ], 4));
  }
}), Xx = {
  name: "Viewport",
  compatConfig: { MODE: 3 }
}, Kx = /* @__PURE__ */ De({
  ...Xx,
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
      noPanClassName: N,
      emits: D,
      connectionStartHandle: y,
      userSelectionActive: _,
      paneDragging: R,
      d3Zoom: X,
      d3Selection: Q,
      d3ZoomHandler: B,
      viewport: T,
      viewportRef: L,
      paneClickDistance: Y
    } = We();
    Lx(L);
    const U = ee(!1), G = ee(!1);
    let $ = null, V = !1, M = 0, F = {
      x: 0,
      y: 0,
      zoom: 0
    };
    const q = Zo(l), te = Zo(r), ce = Zo(i), fe = Xe(
      () => (!te.value || te.value && r.value === !0) && (q.value || f.value)
    ), le = Xe(() => q.value || a.value), he = Xe(() => te.value || r.value === !0 && fe.value !== !0);
    ht(() => {
      if (!L.value) {
        Oi("Viewport element is missing");
        return;
      }
      const Ee = L.value, ke = Ee.getBoundingClientRect(), K = wE().clickDistance(Y.value).scaleExtent([t.value, n.value]).translateExtent(s.value), p = Ht(Ee).call(K), O = p.on("wheel.zoom"), g = Io.translate(o.value.x ?? 0, o.value.y ?? 0).scale(ro(o.value.zoom ?? 1, t.value, n.value)), m = [
        [0, 0],
        [ke.width, ke.height]
      ], k = K.constrain()(g, m, s.value);
      K.transform(p, k), K.wheelDelta(be), X.value = K, Q.value = p, B.value = O, T.value = { x: k.x, y: k.y, zoom: k.k }, K.on("start", (S) => {
        var j;
        if (!S.sourceEvent)
          return null;
        M = S.sourceEvent.button, U.value = !0;
        const W = xe(S.transform);
        ((j = S.sourceEvent) == null ? void 0 : j.type) === "mousedown" && (R.value = !0), F = W, D.viewportChangeStart(W), D.moveStart({ event: S, flowTransform: W });
      }), K.on("end", (S) => {
        if (!S.sourceEvent)
          return null;
        if (U.value = !1, R.value = !1, pe(fe.value, M ?? 0) && !V && D.paneContextMenu(S.sourceEvent), V = !1, se(F, S.transform)) {
          const j = xe(S.transform);
          F = j, D.viewportChangeEnd(j), D.moveEnd({ event: S, flowTransform: j });
        }
      }), K.filter((S) => {
        var j;
        const W = ce.value || w.value, Z = v.value && S.ctrlKey, P = S.button;
        if (P === 1 && S.type === "mousedown" && ($e(S, "vue-flow__node") || $e(S, "vue-flow__edge")))
          return !0;
        if (!fe.value && !W && !le.value && !h.value && !v.value || _.value || !h.value && S.type === "dblclick" || $e(S, I.value) && S.type === "wheel" || $e(S, N.value) && (S.type !== "wheel" || le.value && S.type === "wheel" && !ce.value) || !v.value && S.ctrlKey && S.type === "wheel" || !W && !le.value && !Z && S.type === "wheel")
          return !1;
        if (!v && S.type === "touchstart" && ((j = S.touches) == null ? void 0 : j.length) > 1)
          return S.preventDefault(), !1;
        if (!fe.value && (S.type === "mousedown" || S.type === "touchstart") || r.value === !0 && Array.isArray(f.value) && f.value.includes(0) && P === 0 || Array.isArray(f.value) && !f.value.includes(P) && (S.type === "mousedown" || S.type === "touchstart"))
          return !1;
        const re = Array.isArray(f.value) && f.value.includes(P) || r.value === !0 && Array.isArray(f.value) && !f.value.includes(0) || !P || P <= 1;
        return (!S.ctrlKey || q.value || S.type === "wheel") && re;
      }), Me(
        [_, fe],
        () => {
          _.value && !U.value ? K.on("zoom", null) : _.value || K.on("zoom", (S) => {
            T.value = { x: S.transform.x, y: S.transform.y, zoom: S.transform.k };
            const j = xe(S.transform);
            V = pe(fe.value, M ?? 0), D.viewportChange(j), D.move({ event: S, flowTransform: j });
          });
        },
        { immediate: !0 }
      ), Me(
        [_, le, c, ce, v, x, I],
        () => {
          le.value && !ce.value && !_.value ? p.on(
            "wheel.zoom",
            (S) => {
              if ($e(S, I.value))
                return !1;
              const j = ce.value || w.value, W = v.value && S.ctrlKey;
              if (!(!x.value || le.value || j || W))
                return !1;
              S.preventDefault(), S.stopImmediatePropagation();
              const P = p.property("__zoom").k || 1, re = ui();
              if (!q.value && S.ctrlKey && v.value && re) {
                const Pe = Wt(S), Ne = be(S), nt = P * 2 ** Ne;
                K.scaleTo(p, nt, Pe, S);
                return;
              }
              const ie = S.deltaMode === 1 ? 20 : 1;
              let ue = c.value === Wo.Vertical ? 0 : S.deltaX * ie, de = c.value === Wo.Horizontal ? 0 : S.deltaY * ie;
              !re && S.shiftKey && c.value !== Wo.Vertical && !ue && de && (ue = de, de = 0), K.translateBy(
                p,
                -(ue / P) * d.value,
                -(de / P) * d.value
              );
              const Ce = xe(p.property("__zoom"));
              $ && clearTimeout($), G.value ? (D.move({ event: S, flowTransform: Ce }), D.viewportChange(Ce), $ = setTimeout(() => {
                D.moveEnd({ event: S, flowTransform: Ce }), D.viewportChangeEnd(Ce), G.value = !1;
              }, 150)) : (G.value = !0, D.moveStart({ event: S, flowTransform: Ce }), D.viewportChangeStart(Ce));
            },
            { passive: !1 }
          ) : typeof O < "u" && p.on(
            "wheel.zoom",
            function(S, j) {
              const W = !x.value && S.type === "wheel" && !S.ctrlKey, Z = ce.value || w.value, P = v.value && S.ctrlKey;
              if (!Z && !a.value && !P && S.type === "wheel" || W || $e(S, I.value))
                return null;
              S.preventDefault(), O.call(this, S, j);
            },
            { passive: !1 }
          );
        },
        { immediate: !0 }
      );
    });
    function pe(Ee, ke) {
      return ke === 2 && Array.isArray(Ee) && Ee.includes(2);
    }
    function be(Ee) {
      const ke = Ee.ctrlKey && ui() ? 10 : 1;
      return -Ee.deltaY * (Ee.deltaMode === 1 ? 0.05 : Ee.deltaMode ? 1 : 2e-3) * ke;
    }
    function se(Ee, ke) {
      return Ee.x !== ke.x && !Number.isNaN(ke.x) || Ee.y !== ke.y && !Number.isNaN(ke.y) || Ee.zoom !== ke.k && !Number.isNaN(ke.k);
    }
    function xe(Ee) {
      return {
        x: Ee.x,
        y: Ee.y,
        zoom: Ee.k
      };
    }
    function $e(Ee, ke) {
      return Ee.target.closest(`.${ke}`);
    }
    return (Ee, ke) => (E(), C("div", {
      ref_key: "viewportRef",
      ref: L,
      class: "vue-flow__viewport vue-flow__container"
    }, [
      ne(Gx, {
        "is-selecting": he.value,
        "selection-key-pressed": H(te),
        class: ge({
          connecting: !!H(y),
          dragging: H(R),
          draggable: H(f) === !0 || Array.isArray(H(f)) && H(f).includes(0)
        })
      }, {
        default: An(() => [
          ne(Yx, null, {
            default: An(() => [
              no(Ee.$slots, "default")
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["is-selecting", "selection-key-pressed", "class"])
    ], 512));
  }
}), Wx = ["id"], Zx = ["id"], Jx = ["id"], Qx = {
  name: "A11yDescriptions",
  compatConfig: { MODE: 3 }
}, eS = /* @__PURE__ */ De({
  ...Qx,
  setup(e) {
    const { id: t, disableKeyboardA11y: n, ariaLiveMessage: o } = We();
    return (s, i) => (E(), C(_e, null, [
      u("div", {
        id: `${H(op)}-${H(t)}`,
        style: { display: "none" }
      }, " Press enter or space to select a node. " + A(H(n) ? "" : "You can then use the arrow keys to move the node around.") + " You can then use the arrow keys to move the node around, press delete to remove it and press escape to cancel. ", 9, Wx),
      u("div", {
        id: `${H(sp)}-${H(t)}`,
        style: { display: "none" }
      }, " Press enter or space to select an edge. You can then press delete to remove it or press escape to cancel. ", 8, Zx),
      H(n) ? oe("", !0) : (E(), C("div", {
        key: 0,
        id: `${H(SE)}-${H(t)}`,
        "aria-live": "assertive",
        "aria-atomic": "true",
        style: { position: "absolute", width: "1px", height: "1px", margin: "-1px", border: "0", padding: "0", overflow: "hidden", clip: "rect(0px, 0px, 0px, 0px)", "clip-path": "inset(100%)" }
      }, A(H(o)), 9, Jx))
    ], 64));
  }
});
function tS() {
  const e = We();
  Me(
    () => e.viewportHelper.value.viewportInitialized,
    (t) => {
      t && setTimeout(() => {
        e.emits.init(e), e.emits.paneReady(e);
      }, 1);
    }
  );
}
function nS(e, t, n) {
  return n === we.Left ? e - t : n === we.Right ? e + t : e;
}
function oS(e, t, n) {
  return n === we.Top ? e - t : n === we.Bottom ? e + t : e;
}
const Ol = function({
  radius: e = 10,
  centerX: t = 0,
  centerY: n = 0,
  position: o = we.Top,
  type: s
}) {
  return Be("circle", {
    class: `vue-flow__edgeupdater vue-flow__edgeupdater-${s}`,
    cx: nS(t, e, o),
    cy: oS(n, e, o),
    r: e,
    stroke: "transparent",
    fill: "transparent"
  });
};
Ol.props = ["radius", "centerX", "centerY", "position", "type"];
Ol.compatConfig = { MODE: 3 };
const Tc = Ol, sS = /* @__PURE__ */ De({
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
      edgesFocusable: N,
      hooks: D
    } = We(), y = ae(() => d(e.id)), { emit: _, on: R } = WE(y.value, i), X = Qt(Pi), Q = To(), B = ee(!1), T = ee(!1), L = ee(""), Y = ee(null), U = ee("source"), G = ee(null), $ = Xe(
      () => typeof y.value.selectable > "u" ? x.value : y.value.selectable
    ), V = Xe(() => typeof y.value.updatable > "u" ? I.value : y.value.updatable), M = Xe(() => typeof y.value.focusable > "u" ? N.value : y.value.focusable);
    oo(YE, e.id), oo(XE, G);
    const F = ae(() => y.value.class instanceof Function ? y.value.class(y.value) : y.value.class), q = ae(() => y.value.style instanceof Function ? y.value.style(y.value) : y.value.style), te = ae(() => {
      const m = y.value.type || "default", k = X == null ? void 0 : X[`edge-${m}`];
      if (k)
        return k;
      let S = y.value.template ?? a.value[m];
      if (typeof S == "string" && Q) {
        const j = Object.keys(Q.appContext.components);
        j && j.includes(m) && (S = gd(m, !1));
      }
      return S && typeof S != "string" ? S : (i.error(new at(st.EDGE_TYPE_MISSING, S)), !1);
    }), { handlePointerDown: ce } = xp({
      nodeId: L,
      handleId: Y,
      type: U,
      isValidConnection: h,
      edgeUpdaterType: U,
      onEdgeUpdate: he,
      onEdgeUpdateEnd: pe
    });
    return () => {
      const m = f(y.value.source), k = f(y.value.target), S = "pathOptions" in y.value ? y.value.pathOptions : {};
      if (!m && !k)
        return i.error(new at(st.EDGE_SOURCE_TARGET_MISSING, y.value.id, y.value.source, y.value.target)), null;
      if (!m)
        return i.error(new at(st.EDGE_SOURCE_MISSING, y.value.id, y.value.source)), null;
      if (!k)
        return i.error(new at(st.EDGE_TARGET_MISSING, y.value.id, y.value.target)), null;
      if (!y.value || y.value.hidden || m.hidden || k.hidden)
        return null;
      let j;
      o.value === io.Strict ? j = m.handleBounds.source : j = [...m.handleBounds.source || [], ...m.handleBounds.target || []];
      const W = bc(j, y.value.sourceHandle);
      let Z;
      o.value === io.Strict ? Z = k.handleBounds.target : Z = [...k.handleBounds.target || [], ...k.handleBounds.source || []];
      const P = bc(Z, y.value.targetHandle), re = (W == null ? void 0 : W.position) || we.Bottom, ie = (P == null ? void 0 : P.position) || we.Top, { x: ue, y: de } = ai(m, W, re), { x: Ce, y: Pe } = ai(k, P, ie);
      return y.value.sourceX = ue, y.value.sourceY = de, y.value.targetX = Ce, y.value.targetY = Pe, Be(
        "g",
        {
          ref: G,
          key: e.id,
          "data-id": e.id,
          class: [
            "vue-flow__edge",
            `vue-flow__edge-${te.value === !1 ? "default" : y.value.type || "default"}`,
            l.value,
            F.value,
            {
              updating: B.value,
              selected: y.value.selected,
              animated: y.value.animated,
              inactive: !$.value && !D.value.edgeClick.hasListeners()
            }
          ],
          onClick: se,
          onContextmenu: xe,
          onDblclick: $e,
          onMouseenter: Ee,
          onMousemove: ke,
          onMouseleave: K,
          onKeyDown: M.value ? g : void 0,
          tabIndex: M.value ? 0 : void 0,
          "aria-label": y.value.ariaLabel === null ? void 0 : y.value.ariaLabel || `Edge from ${y.value.source} to ${y.value.target}`,
          "aria-describedby": M.value ? `${sp}-${t}` : void 0,
          role: M.value ? "button" : "img"
        },
        [
          T.value ? null : Be(te.value === !1 ? a.value.default : te.value, {
            id: e.id,
            sourceNode: m,
            targetNode: k,
            source: y.value.source,
            target: y.value.target,
            type: y.value.type,
            updatable: V.value,
            selected: y.value.selected,
            animated: y.value.animated,
            label: y.value.label,
            labelStyle: y.value.labelStyle,
            labelShowBg: y.value.labelShowBg,
            labelBgStyle: y.value.labelBgStyle,
            labelBgPadding: y.value.labelBgPadding,
            labelBgBorderRadius: y.value.labelBgBorderRadius,
            data: y.value.data,
            events: { ...y.value.events, ...R },
            style: q.value,
            markerStart: `url('#${ds(y.value.markerStart, t)}')`,
            markerEnd: `url('#${ds(y.value.markerEnd, t)}')`,
            sourcePosition: re,
            targetPosition: ie,
            sourceX: ue,
            sourceY: de,
            targetX: Ce,
            targetY: Pe,
            sourceHandleId: y.value.sourceHandle,
            targetHandleId: y.value.targetHandle,
            interactionWidth: y.value.interactionWidth,
            ...S
          }),
          [
            V.value === "source" || V.value === !0 ? [
              Be(
                "g",
                {
                  onMousedown: p,
                  onMouseenter: fe,
                  onMouseout: le
                },
                Be(Tc, {
                  position: re,
                  centerX: ue,
                  centerY: de,
                  radius: s.value,
                  type: "source",
                  "data-type": "source"
                })
              )
            ] : null,
            V.value === "target" || V.value === !0 ? [
              Be(
                "g",
                {
                  onMousedown: O,
                  onMouseenter: fe,
                  onMouseout: le
                },
                Be(Tc, {
                  position: ie,
                  centerX: Ce,
                  centerY: Pe,
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
    function fe() {
      B.value = !0;
    }
    function le() {
      B.value = !1;
    }
    function he(m, k) {
      _.update({ event: m, edge: y.value, connection: k });
    }
    function pe(m) {
      _.updateEnd({ event: m, edge: y.value }), T.value = !1;
    }
    function be(m, k) {
      m.button === 0 && (T.value = !0, L.value = k ? y.value.target : y.value.source, Y.value = (k ? y.value.targetHandle : y.value.sourceHandle) ?? "", U.value = k ? "target" : "source", _.updateStart({ event: m, edge: y.value }), ce(m));
    }
    function se(m) {
      var k;
      const S = { event: m, edge: y.value };
      $.value && (r.value = !1, y.value.selected && v.value ? (c([y.value]), (k = G.value) == null || k.blur()) : n([y.value])), _.click(S);
    }
    function xe(m) {
      _.contextMenu({ event: m, edge: y.value });
    }
    function $e(m) {
      _.doubleClick({ event: m, edge: y.value });
    }
    function Ee(m) {
      _.mouseEnter({ event: m, edge: y.value });
    }
    function ke(m) {
      _.mouseMove({ event: m, edge: y.value });
    }
    function K(m) {
      _.mouseLeave({ event: m, edge: y.value });
    }
    function p(m) {
      be(m, !0);
    }
    function O(m) {
      be(m, !1);
    }
    function g(m) {
      var k;
      !w.value && ip.includes(m.key) && $.value && (m.key === "Escape" ? ((k = G.value) == null || k.blur(), c([d(e.id)])) : n([d(e.id)]));
    }
  }
}), iS = sS, rS = {
  [we.Left]: we.Right,
  [we.Right]: we.Left,
  [we.Top]: we.Bottom,
  [we.Bottom]: we.Top
}, lS = /* @__PURE__ */ De({
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
    } = We(), h = (e = Qt(Pi)) == null ? void 0 : e["connection-line"], v = ae(() => {
      var D;
      return f((D = o.value) == null ? void 0 : D.nodeId);
    }), w = ae(() => {
      var D;
      return f((D = s.value) == null ? void 0 : D.nodeId) ?? null;
    }), x = ae(() => ({
      x: (i.value.x - d.value.x) / d.value.zoom,
      y: (i.value.y - d.value.y) / d.value.zoom
    })), I = ae(
      () => a.value.markerStart ? `url(#${ds(a.value.markerStart, t)})` : ""
    ), N = ae(
      () => a.value.markerEnd ? `url(#${ds(a.value.markerEnd, t)})` : ""
    );
    return () => {
      var D, y, _, R;
      if (!v.value || !o.value)
        return null;
      const X = o.value.handleId, Q = o.value.type, B = v.value.handleBounds;
      let T = (B == null ? void 0 : B[Q]) || [];
      if (n.value === io.Loose) {
        const te = (B == null ? void 0 : B[Q === "source" ? "target" : "source"]) || [];
        T = [...T, ...te];
      }
      if (!T)
        return null;
      const L = (X ? T.find((te) => te.id === X) : T[0]) ?? null, Y = (L == null ? void 0 : L.position) || we.Top, { x: U, y: G } = ai(v.value, L, Y);
      let $ = null;
      w.value && ((D = s.value) != null && D.handleId) && (n.value === io.Strict ? $ = ((y = w.value.handleBounds[Q === "source" ? "target" : "source"]) == null ? void 0 : y.find(
        (te) => {
          var ce;
          return te.id === ((ce = s.value) == null ? void 0 : ce.handleId);
        }
      )) || null : $ = ((_ = [...w.value.handleBounds.source || [], ...w.value.handleBounds.target || []]) == null ? void 0 : _.find(
        (te) => {
          var ce;
          return te.id === ((ce = s.value) == null ? void 0 : ce.handleId);
        }
      )) || null);
      const V = ((R = s.value) == null ? void 0 : R.position) ?? (Y ? rS[Y] : null);
      if (!Y || !V)
        return null;
      const M = r.value ?? a.value.type ?? Yn.Bezier;
      let F = "";
      const q = {
        sourceX: U,
        sourceY: G,
        sourcePosition: Y,
        targetX: x.value.x,
        targetY: x.value.y,
        targetPosition: V
      };
      return M === Yn.Bezier ? [F] = Tp(q) : M === Yn.Step ? [F] = Wr({
        ...q,
        borderRadius: 0
      }) : M === Yn.SmoothStep ? [F] = Wr(q) : M === Yn.SimpleBezier ? [F] = Mp(q) : F = `M${U},${G} ${x.value.x},${x.value.y}`, Be(
        "svg",
        { class: "vue-flow__edges vue-flow__connectionline vue-flow__container" },
        Be(
          "g",
          { class: "vue-flow__connection" },
          h ? Be(h, {
            sourceX: U,
            sourceY: G,
            sourcePosition: Y,
            targetX: x.value.x,
            targetY: x.value.y,
            targetPosition: V,
            sourceNode: v.value,
            sourceHandle: L,
            targetNode: w.value,
            targetHandle: $,
            markerEnd: N.value,
            markerStart: I.value,
            connectionStatus: c.value
          }) : Be("path", {
            d: F,
            class: [a.value.class, c, "vue-flow__connection-path"],
            style: {
              ...l.value,
              ...a.value.style
            },
            "marker-end": N.value,
            "marker-start": I.value
          })
        )
      );
    };
  }
}), aS = lS, uS = ["id", "markerWidth", "markerHeight", "markerUnits", "orient"], cS = {
  name: "MarkerType",
  compatConfig: { MODE: 3 }
}, dS = /* @__PURE__ */ De({
  ...cS,
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
    return (t, n) => (E(), C("marker", {
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
      t.type === H(Gr).ArrowClosed ? (E(), C("polyline", {
        key: 0,
        style: Ye({
          stroke: t.color,
          fill: t.color,
          strokeWidth: t.strokeWidth
        }),
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        points: "-5,-4 0,0 -5,4 -5,-4"
      }, null, 4)) : oe("", !0),
      t.type === H(Gr).Arrow ? (E(), C("polyline", {
        key: 1,
        style: Ye({
          stroke: t.color,
          strokeWidth: t.strokeWidth
        }),
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        fill: "none",
        points: "-5,-4 0,0 -5,4"
      }, null, 4)) : oe("", !0)
    ], 8, uS));
  }
}), fS = { class: "vue-flow__marker vue-flow__container" }, pS = {
  name: "MarkerDefinitions",
  compatConfig: { MODE: 3 }
}, hS = /* @__PURE__ */ De({
  ...pS,
  setup(e) {
    const { id: t, edges: n, connectionLineOptions: o, defaultMarkerColor: s } = We(), i = ae(() => {
      const r = /* @__PURE__ */ new Set(), l = [], a = (c) => {
        if (c) {
          const d = ds(c, t);
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
    return (r, l) => (E(), C("svg", fS, [
      u("defs", null, [
        (E(!0), C(_e, null, Re(i.value, (a) => (E(), lt(dS, {
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
}), vS = {
  name: "Edges",
  compatConfig: { MODE: 3 }
}, gS = /* @__PURE__ */ De({
  ...vS,
  setup(e) {
    const { findNode: t, getEdges: n, elevateEdgesOnSelect: o } = We();
    return (s, i) => (E(), C(_e, null, [
      ne(hS),
      (E(!0), C(_e, null, Re(H(n), (r) => (E(), C("svg", {
        key: r.id,
        class: "vue-flow__edges vue-flow__container",
        style: Ye({ zIndex: H(zE)(r, H(t), H(o)) })
      }, [
        ne(H(iS), {
          id: r.id
        }, null, 8, ["id"])
      ], 4))), 128)),
      ne(H(aS))
    ], 64));
  }
}), mS = /* @__PURE__ */ De({
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
      snapGrid: N,
      nodeDragThreshold: D,
      nodesDraggable: y,
      elementsSelectable: _,
      nodesConnectable: R,
      nodesFocusable: X,
      hooks: Q
    } = We(), B = ee(null);
    oo(kp, B), oo(wp, e.id);
    const T = Qt(Pi), L = To(), Y = Cp(), { node: U, parentNode: G } = Sp(e.id), { emit: $, on: V } = ex(U, r), M = Xe(() => typeof U.draggable > "u" ? y.value : U.draggable), F = Xe(() => typeof U.selectable > "u" ? _.value : U.selectable), q = Xe(() => typeof U.connectable > "u" ? R.value : U.connectable), te = Xe(() => typeof U.focusable > "u" ? X.value : U.focusable), ce = Xe(
      () => F.value || M.value || Q.value.nodeClick.hasListeners() || Q.value.nodeDoubleClick.hasListeners() || Q.value.nodeMouseEnter.hasListeners() || Q.value.nodeMouseMove.hasListeners() || Q.value.nodeMouseLeave.hasListeners()
    ), fe = Xe(() => !!U.dimensions.width && !!U.dimensions.height), le = ae(() => {
      const k = U.type || "default", S = T == null ? void 0 : T[`node-${k}`];
      if (S)
        return S;
      let j = U.template || f.value[k];
      if (typeof j == "string" && L) {
        const W = Object.keys(L.appContext.components);
        W && W.includes(k) && (j = gd(k, !1));
      }
      return j && typeof j != "string" ? j : (r.error(new at(st.NODE_TYPE_MISSING, j)), !1);
    }), he = Ep({
      id: e.id,
      el: B,
      disabled: () => !M.value,
      selectable: F,
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
        g(k);
      }
    }), pe = ae(() => U.class instanceof Function ? U.class(U) : U.class), be = ae(() => {
      const k = (U.style instanceof Function ? U.style(U) : U.style) || {}, S = U.width instanceof Function ? U.width(U) : U.width, j = U.height instanceof Function ? U.height(U) : U.height;
      return !k.width && S && (k.width = typeof S == "string" ? S : `${S}px`), !k.height && j && (k.height = typeof j == "string" ? j : `${j}px`), k;
    }), se = Xe(() => Number(U.zIndex ?? be.value.zIndex ?? 0));
    return d((k) => {
      (k.includes(e.id) || !k.length) && $e();
    }), ht(() => {
      Me(
        () => U.hidden,
        (k = !1, S, j) => {
          !k && B.value && (e.resizeObserver.observe(B.value), j(() => {
            B.value && e.resizeObserver.unobserve(B.value);
          }));
        },
        { immediate: !0, flush: "post" }
      );
    }), Me([() => U.type, () => U.sourcePosition, () => U.targetPosition], () => {
      ft(() => {
        c([{ id: e.id, nodeElement: B.value, forceUpdate: !0 }]);
      });
    }), Me(
      [
        () => U.position.x,
        () => U.position.y,
        () => {
          var k;
          return (k = G.value) == null ? void 0 : k.computedPosition.x;
        },
        () => {
          var k;
          return (k = G.value) == null ? void 0 : k.computedPosition.y;
        },
        () => {
          var k;
          return (k = G.value) == null ? void 0 : k.computedPosition.z;
        },
        se,
        () => U.selected,
        () => U.dimensions.height,
        () => U.dimensions.width,
        () => {
          var k;
          return (k = G.value) == null ? void 0 : k.dimensions.height;
        },
        () => {
          var k;
          return (k = G.value) == null ? void 0 : k.dimensions.width;
        }
      ],
      ([k, S, j, W, Z, P]) => {
        const re = {
          x: k,
          y: S,
          z: P + (v.value && U.selected ? 1e3 : 0)
        };
        typeof j < "u" && typeof W < "u" ? U.computedPosition = PE({ x: j, y: W, z: Z }, re) : U.computedPosition = re;
      },
      { flush: "post", immediate: !0 }
    ), Me([() => U.extent, h], ([k, S], [j, W]) => {
      (k !== j || S !== W) && xe();
    }), U.extent === "parent" || typeof U.extent == "object" && "range" in U.extent && U.extent.range === "parent" ? Rr(() => fe).toBe(!0).then(xe) : xe(), () => U.hidden ? null : Be(
      "div",
      {
        ref: B,
        "data-id": U.id,
        class: [
          "vue-flow__node",
          `vue-flow__node-${le.value === !1 ? "default" : U.type || "default"}`,
          {
            [n.value]: M.value,
            dragging: he == null ? void 0 : he.value,
            draggable: M.value,
            selected: U.selected,
            selectable: F.value,
            parent: U.isParent
          },
          pe.value
        ],
        style: {
          visibility: fe.value ? "visible" : "hidden",
          zIndex: U.computedPosition.z ?? se.value,
          transform: `translate(${U.computedPosition.x}px,${U.computedPosition.y}px)`,
          pointerEvents: ce.value ? "all" : "none",
          ...be.value
        },
        tabIndex: te.value ? 0 : void 0,
        role: te.value ? "button" : void 0,
        "aria-describedby": w.value ? void 0 : `${op}-${t}`,
        "aria-label": U.ariaLabel,
        onMouseenter: Ee,
        onMousemove: ke,
        onMouseleave: K,
        onContextmenu: p,
        onClick: g,
        onDblclick: O,
        onKeydown: m
      },
      [
        Be(le.value === !1 ? f.value.default : le.value, {
          id: U.id,
          type: U.type,
          data: U.data,
          events: { ...U.events, ...V },
          selected: U.selected,
          resizing: U.resizing,
          dragging: he.value,
          connectable: q.value,
          position: U.computedPosition,
          dimensions: U.dimensions,
          isValidTargetPos: U.isValidTargetPos,
          isValidSourcePos: U.isValidSourcePos,
          parent: U.parentNode,
          parentNodeId: U.parentNode,
          zIndex: U.computedPosition.z ?? se.value,
          targetPosition: U.targetPosition,
          sourcePosition: U.sourcePosition,
          label: U.label,
          dragHandle: U.dragHandle,
          onUpdateNodeInternals: $e
        })
      ]
    );
    function xe() {
      const k = U.computedPosition, { computedPosition: S, position: j } = Nl(
        U,
        I.value ? Mi(k, N.value) : k,
        r.error,
        h.value,
        G.value
      );
      (U.computedPosition.x !== S.x || U.computedPosition.y !== S.y) && (U.computedPosition = { ...U.computedPosition, ...S }), (U.position.x !== j.x || U.position.y !== j.y) && (U.position = j);
    }
    function $e() {
      B.value && c([{ id: e.id, nodeElement: B.value, forceUpdate: !0 }]);
    }
    function Ee(k) {
      he != null && he.value || $.mouseEnter({ event: k, node: U });
    }
    function ke(k) {
      he != null && he.value || $.mouseMove({ event: k, node: U });
    }
    function K(k) {
      he != null && he.value || $.mouseLeave({ event: k, node: U });
    }
    function p(k) {
      return $.contextMenu({ event: k, node: U });
    }
    function O(k) {
      return $.doubleClick({ event: k, node: U });
    }
    function g(k) {
      F.value && (!o.value || !M.value || D.value > 0) && Kr(
        U,
        i.value,
        a,
        l,
        s,
        !1,
        B.value
      ), $.click({ event: k, node: U });
    }
    function m(k) {
      if (!(qr(k) || w.value))
        if (ip.includes(k.key) && F.value) {
          const S = k.key === "Escape";
          Kr(
            U,
            i.value,
            a,
            l,
            s,
            S,
            B.value
          );
        } else M.value && U.selected && ko[k.key] && (k.preventDefault(), x.value = `Moved selected node ${k.key.replace("Arrow", "").toLowerCase()}. New position, x: ${~~U.position.x}, y: ${~~U.position.y}`, Y(
          {
            x: ko[k.key].x,
            y: ko[k.key].y
          },
          k.shiftKey
        ));
    }
  }
}), yS = mS;
function bS(e = { includeHiddenNodes: !1 }) {
  const { nodes: t } = We();
  return ae(() => {
    if (t.value.length === 0)
      return !1;
    for (const n of t.value)
      if ((e.includeHiddenNodes || !n.hidden) && ((n == null ? void 0 : n.handleBounds) === void 0 || n.dimensions.width === 0 || n.dimensions.height === 0))
        return !1;
    return !0;
  });
}
const _S = { class: "vue-flow__nodes vue-flow__container" }, wS = {
  name: "Nodes",
  compatConfig: { MODE: 3 }
}, kS = /* @__PURE__ */ De({
  ...wS,
  setup(e) {
    const { getNodes: t, updateNodeDimensions: n, emits: o } = We(), s = bS(), i = ee();
    return Me(
      s,
      (r) => {
        r && ft(() => {
          o.nodesInitialized(t.value);
        });
      },
      { immediate: !0 }
    ), ht(() => {
      i.value = new ResizeObserver((r) => {
        const l = r.map((a) => ({
          id: a.target.getAttribute("data-id"),
          nodeElement: a.target,
          forceUpdate: !0
        }));
        ft(() => n(l));
      });
    }), _n(() => {
      var r;
      return (r = i.value) == null ? void 0 : r.disconnect();
    }), (r, l) => (E(), C("div", _S, [
      i.value ? (E(!0), C(_e, { key: 0 }, Re(H(t), (a, c, d, f) => {
        const h = [a.id];
        if (f && f.key === a.id && Nv(f, h))
          return f;
        const v = (E(), lt(H(yS), {
          id: a.id,
          key: a.id,
          "resize-observer": i.value
        }, null, 8, ["id", "resize-observer"]));
        return v.memo = h, v;
      }, l, 0), 128)) : oe("", !0)
    ]));
  }
});
function ES() {
  const { emits: e } = We();
  ht(() => {
    if (_p()) {
      const t = document.querySelector(".vue-flow__pane");
      t && window.getComputedStyle(t).zIndex !== "1" && e.error(new at(st.MISSING_STYLES));
    }
  });
}
const xS = /* @__PURE__ */ u("div", { class: "vue-flow__edge-labels" }, null, -1), SS = {
  name: "VueFlow",
  compatConfig: { MODE: 3 }
}, CS = /* @__PURE__ */ De({
  ...SS,
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
    const o = e, s = jh(), i = or(o, "modelValue", n), r = or(o, "nodes", n), l = or(o, "edges", n), a = We(o), c = ox({ modelValue: i, nodes: r, edges: l }, o, a);
    return ix(n, a.hooks), tS(), ES(), oo(Pi, s), bi(() => {
      c();
    }), t(a), (d, f) => (E(), C("div", {
      ref: H(a).vueFlowRef,
      class: "vue-flow"
    }, [
      ne(Kx, null, {
        default: An(() => [
          ne(gS),
          xS,
          ne(kS),
          no(d.$slots, "zoom-pane")
        ]),
        _: 3
      }),
      no(d.$slots, "default"),
      ne(eS)
    ], 512));
  }
}), $S = { class: "graph-node-head" }, IS = {
  key: 0,
  class: "level-tag"
}, NS = ["aria-pressed", "aria-label"], vr = /* @__PURE__ */ De({
  __name: "GraphNodeCard",
  props: {
    data: {},
    selected: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = { persona: lg, profile: Or, memory: ag, rag: fg, voice: vg, live2d: bg, extensions: pg, skill: yg, tool: xg, mcp: mg }, i = !!n.data.configurable && n.data.level > 0;
    return (r, l) => (E(), C("article", {
      class: ge(["graph-node", [`kind-${r.data.kind}`, `status-${r.data.status}`, { selected: r.selected }]])
    }, [
      ne(H(Dn), {
        id: "left-target",
        type: "target",
        position: H(we).Left,
        class: "graph-handle"
      }, null, 8, ["position"]),
      ne(H(Dn), {
        id: "left-source",
        type: "source",
        position: H(we).Left,
        class: "graph-handle"
      }, null, 8, ["position"]),
      ne(H(Dn), {
        id: "right-target",
        type: "target",
        position: H(we).Right,
        class: "graph-handle"
      }, null, 8, ["position"]),
      ne(H(Dn), {
        id: "right-source",
        type: "source",
        position: H(we).Right,
        class: "graph-handle"
      }, null, 8, ["position"]),
      u("div", $S, [
        (E(), lt(yd(s[r.data.kind]), { size: 16 })),
        u("b", null, A(r.data.label), 1),
        r.data.kind === "skill" || r.data.kind === "tool" ? (E(), C("span", IS, "L" + A(r.data.level), 1)) : oe("", !0)
      ]),
      u("p", null, A(r.data.summary), 1),
      u("footer", null, [
        u("span", null, A(r.data.status === "available" ? "可用" : r.data.status === "unassigned" ? "未分配" : r.data.status === "partial" ? "部分可用" : "不可用"), 1),
        H(i) ? (E(), C("button", {
          key: 0,
          type: "button",
          class: ge(["graph-switch", { on: r.data.assigned }]),
          "aria-pressed": !!r.data.assigned,
          "aria-label": `${r.data.label}能力开关`,
          onClick: l[0] || (l[0] = yt((a) => o("toggle"), ["stop"]))
        }, l[1] || (l[1] = [
          u("i", null, null, -1)
        ]), 10, NS)) : oe("", !0)
      ])
    ], 2));
  }
}), TS = /* @__PURE__ */ De({
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
    return (o, s) => (E(), lt(H(bs), {
      path: n.value,
      class: ge({ selected: o.selected })
    }, null, 8, ["path", "class"]));
  }
}), MS = {
  class: "graph-stage",
  "aria-label": "角色能力架构画布"
}, OS = {
  class: "graph-tools",
  "aria-label": "画布工具"
}, PS = /* @__PURE__ */ De({
  __name: "RoleGraphCanvas",
  props: {
    graph: {},
    selectedNodeId: {}
  },
  emits: ["select", "toggle", "reset"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = ee([]), i = ee([]), { fitView: r, zoomIn: l, zoomOut: a } = We({ id: "role-architecture" }), c = ee(!1);
    function d() {
      return new Promise((y) => requestAnimationFrame(() => requestAnimationFrame(() => y())));
    }
    function f(y) {
      const _ = /* @__PURE__ */ new Set([y]), R = [y];
      for (; R.length; ) {
        const X = R.shift();
        for (const Q of i.value)
          Q.source !== X || _.has(Q.target) || (_.add(Q.target), R.push(Q.target));
      }
      return _;
    }
    function h(y) {
      var X;
      let _ = y;
      const R = /* @__PURE__ */ new Set();
      for (; !R.has(_); ) {
        R.add(_);
        const Q = (X = i.value.find((B) => B.target === _)) == null ? void 0 : X.source;
        if (!Q) return;
        if (Q === "module:extensions") return _;
        _ = Q;
      }
    }
    async function v(y, _) {
      !c.value || !y.length || (await ft(), await d(), await r({ nodes: y, ..._ }));
    }
    function w(y = 220) {
      const _ = s.value.filter((R) => R.data.kind === "persona" || ["profile", "memory", "rag", "voice", "live2d", "extensions"].includes(R.data.kind));
      return v(_.map((R) => R.id), { padding: 0.18, minZoom: 0.68, maxZoom: 1.08, duration: y });
    }
    function x(y = 220) {
      if (n.selectedNodeId === "module:extensions") {
        const R = s.value.filter((X) => X.id === "module:extensions" || ["skill", "tool"].includes(X.data.kind));
        return v(R.map((X) => X.id), { padding: 0.16, minZoom: 0.38, maxZoom: 0.86, duration: y });
      }
      const _ = h(n.selectedNodeId);
      if (_) {
        const R = f(_);
        return R.add("module:extensions"), v([...R], { padding: 0.24, minZoom: 0.58, maxZoom: 1, duration: y });
      }
      return w(y);
    }
    Me(() => n.graph, async (y) => {
      s.value = y.nodes.map((_) => ({ ..._, selected: _.id === n.selectedNodeId })), i.value = y.edges.map((_) => ({ ..._, type: "brace", animated: !1 })), await ft(), await x();
    }, { immediate: !0, deep: !0 }), Me(() => n.selectedNodeId, (y) => s.value = s.value.map((_) => ({ ..._, selected: _.id === y })));
    function I(y) {
      o("select", y.node.id);
    }
    async function N() {
      o("reset"), await ft(), w();
    }
    async function D() {
      c.value = !0, await x(0);
    }
    return (y, _) => (E(), C("section", MS, [
      u("div", OS, [
        u("button", {
          type: "button",
          title: "放大",
          onClick: _[0] || (_[0] = () => H(l)())
        }, [
          ne(H(ss), { size: 16 })
        ]),
        u("button", {
          type: "button",
          title: "缩小",
          onClick: _[1] || (_[1] = () => H(a)())
        }, [
          ne(H(gg), { size: 16 })
        ]),
        u("button", {
          type: "button",
          title: "适应视图",
          onClick: _[2] || (_[2] = (R) => H(r)({ padding: 0.15, duration: 220 }))
        }, [
          ne(H(hg), { size: 16 })
        ]),
        u("button", {
          type: "button",
          title: "恢复自动布局",
          onClick: N
        }, [
          ne(H(gl), { size: 16 })
        ])
      ]),
      ne(H(CS), {
        id: "role-architecture",
        nodes: s.value,
        "onUpdate:nodes": _[3] || (_[3] = (R) => s.value = R),
        edges: i.value,
        "onUpdate:edges": _[4] || (_[4] = (R) => i.value = R),
        "min-zoom": 0.32,
        "max-zoom": 1.8,
        "fit-view-on-init": !1,
        onInit: D,
        onNodeClick: I
      }, {
        "node-persona": An((R) => [
          ne(vr, Fi(Fs(R)), null, 16)
        ]),
        "node-module": An((R) => [
          ne(vr, Fi(Fs(R)), null, 16)
        ]),
        "node-capability": An((R) => [
          ne(vr, vl(R, {
            onToggle: (X) => o("toggle", R.id)
          }), null, 16, ["onToggle"])
        ]),
        "edge-brace": An((R) => [
          ne(TS, Fi(Fs(R)), null, 16)
        ]),
        _: 1
      }, 8, ["nodes", "edges"])
    ]));
  }
}), AS = ["disabled", "aria-expanded"], DS = {
  key: 0,
  id: "manage-role-menu",
  class: "role-picker-menu"
}, RS = { class: "role-search" }, LS = {
  class: "role-list",
  role: "listbox",
  "aria-label": "选择角色"
}, VS = ["aria-selected", "disabled", "onClick"], zS = {
  key: 0,
  class: "role-empty"
}, FS = /* @__PURE__ */ De({
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
      n.disabled || (r.value = !r.value, r.value && await ft(() => {
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
    return Me(() => n.disabled, (w) => {
      w && (r.value = !1);
    }), ht(() => {
      document.addEventListener("pointerdown", h), document.addEventListener("keydown", v);
    }), _n(() => {
      document.removeEventListener("pointerdown", h), document.removeEventListener("keydown", v);
    }), (w, x) => {
      var I;
      return E(), C("div", {
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
          ne(H(Or), { size: 17 }),
          u("strong", null, A(((I = c.value) == null ? void 0 : I.name) || "角色管理"), 1),
          ne(H(cg), { size: 15 })
        ], 8, AS),
        r.value ? (E(), C("div", DS, [
          u("label", RS, [
            ne(H(Tr), { size: 15 }),
            Te(u("input", {
              ref_key: "searchInput",
              ref: i,
              "onUpdate:modelValue": x[0] || (x[0] = (N) => l.value = N),
              placeholder: "查找角色",
              "aria-label": "查找角色"
            }, null, 512), [
              [Fe, l.value]
            ])
          ]),
          u("div", LS, [
            (E(!0), C(_e, null, Re(a.value, (N) => {
              var D;
              return E(), C("button", {
                key: N.id,
                type: "button",
                role: "option",
                "aria-selected": N.id === w.selectedId,
                disabled: w.disabled,
                class: ge({ active: N.id === w.selectedId }),
                onClick: (y) => f(N.id)
              }, [
                ne(H(Or), { size: 17 }),
                u("span", null, [
                  u("b", null, A(N.name), 1),
                  u("small", null, A(((D = N.profile) == null ? void 0 : D.description) || "尚未填写人设"), 1)
                ])
              ], 10, VS);
            }), 128)),
            a.value.length ? oe("", !0) : (E(), C("p", zS, "没有匹配的角色"))
          ])
        ])) : oe("", !0)
      ], 512);
    };
  }
}), BS = { class: "version-panel-layer" }, HS = {
  class: "version-panel",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "version-panel-title"
}, US = { class: "version-panel-header" }, jS = { class: "version-panel-kicker" }, GS = { id: "version-panel-title" }, qS = {
  key: 0,
  class: "version-message is-error"
}, YS = { class: "version-panel-toolbar" }, XS = ["disabled"], KS = ["disabled"], WS = {
  key: 0,
  class: "version-form-hint"
}, ZS = { class: "version-form-actions" }, JS = ["disabled"], QS = ["disabled"], eC = {
  key: 2,
  class: "version-empty"
}, tC = {
  key: 3,
  class: "version-empty"
}, nC = {
  key: 4,
  class: "version-body"
}, oC = {
  class: "version-list",
  role: "listbox",
  "aria-label": "角色版本历史"
}, sC = ["aria-selected", "disabled", "onClick"], iC = { class: "version-number" }, rC = { class: "version-item-copy" }, lC = { class: "version-detail" }, aC = { class: "version-detail-heading" }, uC = {
  key: 0,
  class: "version-note"
}, cC = {
  key: 1,
  class: "version-detail-loading"
}, dC = {
  key: 2,
  class: "version-facts"
}, fC = {
  key: 3,
  class: "version-detail-loading"
}, pC = { class: "version-action-row" }, hC = ["disabled"], vC = ["disabled"], gC = {
  key: 2,
  class: "version-current"
}, mC = {
  key: 4,
  class: "version-published"
}, yC = {
  key: 5,
  class: "version-panel-footnote"
}, bC = /* @__PURE__ */ De({
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
    const x = ae(() => l.value || a.value || !!c.value), I = ae(() => s.value.find((M) => M.id === i.value)), N = ae(() => {
      var M;
      return (M = r.value) == null ? void 0 : M.snapshot;
    }), D = ae(() => {
      var M;
      return Object.keys(((M = N.value) == null ? void 0 : M.capability_overrides) || {}).length;
    }), y = ae(() => {
      var M, F;
      return ((F = (M = N.value) == null ? void 0 : M.document_ids) == null ? void 0 : F.length) || 0;
    }), _ = ae(() => {
      var M;
      return ((M = N.value) == null ? void 0 : M.mcp_server_names) || [];
    });
    function R(M) {
      return { draft: "草稿", published: "已发布", superseded: "已替代", archived: "已归档" }[M] || M;
    }
    function X(M) {
      return `is-${M}`;
    }
    function Q(M) {
      if (!M) return "—";
      const F = new Date(M);
      return Number.isNaN(F.getTime()) ? M : new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(F);
    }
    function B(M) {
      return M instanceof ml && M.status === 404 ? "版本接口尚未启用，请先启用角色版本 API。" : M instanceof Error ? M.message : String(M);
    }
    async function T() {
      const M = ++w;
      if (s.value = [], i.value = "", r.value = null, d.value = "", !!n.personaId) {
        l.value = !0;
        try {
          const F = await Fg(n.personaId);
          if (M !== w) return;
          s.value = F, F.length && await L(F[0].id, M);
        } catch (F) {
          M === w && (d.value = B(F));
        } finally {
          M === w && (l.value = !1);
        }
      }
    }
    async function L(M, F = w) {
      i.value = M, r.value = null, d.value = "", a.value = !0;
      try {
        const q = await Bg(n.personaId, M);
        F === w && (r.value = q);
      } catch (q) {
        F === w && (d.value = B(q));
      } finally {
        F === w && (a.value = !1);
      }
    }
    function Y() {
      var M;
      n.disabled || x.value || (f.value = !0, h.value = `版本 ${Math.max(((M = s.value[0]) == null ? void 0 : M.version_number) || 0, 0) + 1}`, v.value = "");
    }
    function U() {
      c.value || (f.value = !1);
    }
    async function G() {
      if (!(n.disabled || x.value)) {
        c.value = "create", d.value = "";
        try {
          const M = await Hg(n.personaId, { label: h.value, note: v.value });
          f.value = !1, s.value = [M, ...s.value.filter((F) => F.id !== M.id)], i.value = M.id, r.value = M, o("changed", M);
        } catch (M) {
          d.value = B(M);
        } finally {
          c.value = "";
        }
      }
    }
    function $(M) {
      s.value = s.value.map((F) => F.id === M.id ? M : F), i.value = M.id, r.value = M;
    }
    async function V(M) {
      const F = i.value;
      if (!(!F || n.disabled || x.value) && !(M === "rollback" && !window.confirm("确定回滚到这个角色版本？当前未保存的运行配置不会自动保留。"))) {
        c.value = F, d.value = "";
        try {
          const q = M === "publish" ? await Ug(n.personaId, F) : await jg(n.personaId, F);
          $(q), o("changed", q), await T();
        } catch (q) {
          d.value = B(q);
        } finally {
          c.value = "";
        }
      }
    }
    return Me(() => n.personaId, () => {
      T();
    }, { immediate: !0 }), (M, F) => {
      var q, te, ce, fe, le, he, pe;
      return E(), C("div", BS, [
        u("button", {
          type: "button",
          class: "version-panel-backdrop",
          "aria-label": "关闭版本面板",
          onClick: F[0] || (F[0] = (be) => o("close"))
        }),
        u("section", HS, [
          u("header", US, [
            u("div", null, [
              u("span", jS, [
                ne(H(Xd), { size: 13 }),
                F[6] || (F[6] = me("运行版本"))
              ]),
              u("h2", GS, A(M.personaName || "当前角色"), 1),
              F[7] || (F[7] = u("p", null, "保存和切换角色的运行配置", -1))
            ]),
            u("button", {
              type: "button",
              class: "icon-button",
              "aria-label": "关闭版本面板",
              onClick: F[1] || (F[1] = (be) => o("close"))
            }, [
              ne(H(Bt), { size: 17 })
            ])
          ]),
          d.value ? (E(), C("p", qS, A(d.value), 1)) : oe("", !0),
          u("div", YS, [
            u("span", null, A(s.value.length ? `${s.value.length} 个版本` : "版本历史"), 1),
            u("div", null, [
              u("button", {
                type: "button",
                class: "text-button",
                disabled: x.value,
                onClick: T
              }, [
                ne(H(Dt), { size: 14 }),
                F[8] || (F[8] = me("刷新"))
              ], 8, XS),
              u("button", {
                type: "button",
                class: "text-button is-primary",
                disabled: M.disabled || x.value,
                onClick: Y
              }, [
                ne(H(ss), { size: 14 }),
                F[9] || (F[9] = me("创建"))
              ], 8, KS)
            ])
          ]),
          f.value ? (E(), C("form", {
            key: 1,
            class: "version-create-form",
            onSubmit: yt(G, ["prevent"])
          }, [
            u("label", null, [
              F[10] || (F[10] = u("span", null, "版本名称", -1)),
              Te(u("input", {
                "onUpdate:modelValue": F[2] || (F[2] = (be) => h.value = be),
                maxlength: "255",
                placeholder: "例如：稳定版"
              }, null, 512), [
                [Fe, h.value]
              ])
            ]),
            u("label", null, [
              F[11] || (F[11] = u("span", null, "备注", -1)),
              Te(u("textarea", {
                "onUpdate:modelValue": F[3] || (F[3] = (be) => v.value = be),
                rows: "2",
                maxlength: "5000",
                placeholder: "记录这次配置的变化"
              }, null, 512), [
                [Fe, v.value]
              ])
            ]),
            M.disabled ? (E(), C("p", WS, "请先保存顶部的角色配置，再创建版本。")) : oe("", !0),
            u("div", ZS, [
              u("button", {
                type: "button",
                class: "text-button",
                disabled: !!c.value,
                onClick: U
              }, "取消", 8, JS),
              u("button", {
                type: "submit",
                class: "text-button is-primary",
                disabled: M.disabled || x.value
              }, A(c.value === "create" ? "创建中…" : "保存版本"), 9, QS)
            ])
          ], 32)) : oe("", !0),
          l.value ? (E(), C("div", eC, "正在读取版本历史…")) : !s.value.length && !d.value ? (E(), C("div", tC, [
            ne(H(rg), { size: 22 }),
            F[12] || (F[12] = u("strong", null, "还没有保存的运行版本", -1)),
            F[13] || (F[13] = u("span", null, "创建版本会记录当前已保存的角色配置。", -1))
          ])) : s.value.length ? (E(), C("div", nC, [
            u("div", oC, [
              (E(!0), C(_e, null, Re(s.value, (be) => (E(), C("button", {
                key: be.id,
                type: "button",
                class: ge(["version-item", { selected: be.id === i.value }]),
                "aria-selected": be.id === i.value,
                role: "option",
                disabled: x.value,
                onClick: (se) => L(be.id)
              }, [
                u("span", iC, "v" + A(be.version_number), 1),
                u("span", rC, [
                  u("strong", null, A(be.label || `版本 ${be.version_number}`), 1),
                  u("small", null, A(Q(be.created_at)), 1)
                ]),
                u("span", {
                  class: ge(["version-status", X(be.status)])
                }, A(R(be.status)), 3)
              ], 10, sC))), 128))
            ]),
            u("div", lC, [
              u("div", aC, [
                u("div", null, [
                  F[14] || (F[14] = u("span", null, "当前选择", -1)),
                  u("strong", null, A(((q = I.value) == null ? void 0 : q.label) || `版本 ${((te = I.value) == null ? void 0 : te.version_number) || ""}`), 1)
                ]),
                u("span", {
                  class: ge(["version-status", X(((ce = I.value) == null ? void 0 : ce.status) || "draft")])
                }, A(R(((fe = I.value) == null ? void 0 : fe.status) || "draft")), 3)
              ]),
              (le = I.value) != null && le.note ? (E(), C("p", uC, A(I.value.note), 1)) : oe("", !0),
              a.value ? (E(), C("div", cC, "正在读取快照…")) : N.value ? (E(), C("dl", dC, [
                u("div", null, [
                  F[15] || (F[15] = u("dt", null, "角色名称", -1)),
                  u("dd", null, A(N.value.name), 1)
                ]),
                u("div", null, [
                  F[16] || (F[16] = u("dt", null, "知识库", -1)),
                  u("dd", null, A(N.value.knowledge_space_id || "未绑定"), 1)
                ]),
                u("div", null, [
                  F[17] || (F[17] = u("dt", null, "资料", -1)),
                  u("dd", null, A(y.value) + " 份资料", 1)
                ]),
                u("div", null, [
                  F[18] || (F[18] = u("dt", null, "能力策略", -1)),
                  u("dd", null, A(D.value) + " 项能力", 1)
                ]),
                u("div", null, [
                  F[19] || (F[19] = u("dt", null, "MCP 授权", -1)),
                  u("dd", null, A(_.value.length ? _.value.join("、") : "无"), 1)
                ])
              ])) : (E(), C("p", fC, "暂无快照详情")),
              u("div", pC, [
                ((he = I.value) == null ? void 0 : he.status) === "draft" ? (E(), C("button", {
                  key: 0,
                  type: "button",
                  class: "version-action is-primary",
                  disabled: M.disabled || x.value,
                  onClick: F[4] || (F[4] = (be) => V("publish"))
                }, [
                  ne(H(wg), { size: 14 }),
                  F[20] || (F[20] = me("发布版本"))
                ], 8, hC)) : I.value && I.value.status !== "published" ? (E(), C("button", {
                  key: 1,
                  type: "button",
                  class: "version-action",
                  disabled: M.disabled || x.value,
                  onClick: F[5] || (F[5] = (be) => V("rollback"))
                }, [
                  ne(H(gl), { size: 14 }),
                  F[21] || (F[21] = me("回滚到此版本"))
                ], 8, vC)) : (E(), C("span", gC, [
                  ne(H(Jn), { size: 14 }),
                  F[22] || (F[22] = me("这是当前发布版本"))
                ]))
              ]),
              (pe = I.value) != null && pe.published_at ? (E(), C("p", mC, [
                ne(H(dg), { size: 13 }),
                me("发布于 " + A(Q(I.value.published_at)), 1)
              ])) : oe("", !0)
            ])
          ])) : oe("", !0),
          !d.value && M.disabled && s.value.length ? (E(), C("p", yC, "顶部存在未保存修改时，版本操作会暂时停用。")) : oe("", !0)
        ])
      ]);
    };
  }
}), Pl = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, _C = /* @__PURE__ */ Pl(bC, [["__scopeId", "data-v-81aec505"]]);
function wC(e, t, n) {
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
async function kC(e) {
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
function EC(e, t, n) {
  const o = rt(e);
  return n.has("profile") && (o.persona = rt(t.persona)), n.has("capabilities") && (o.capabilities.overrides = rt(t.capabilities.overrides)), n.has("grants") && (o.grants.servers = rt(t.grants.servers)), o;
}
function xC() {
  const e = ee([]), t = ee(""), n = ee(null), o = ee(null), s = ee(""), i = ee(/* @__PURE__ */ new Set()), r = ee(!1), l = ee(!1), a = ee(!1), c = ee(""), d = ee(""), f = ae(() => i.value.size > 0);
  async function h() {
    if (!r.value) {
      r.value = !0, c.value = "";
      try {
        e.value = await Wi();
        const G = t.value || sessionStorage.getItem("charactoid.manage.persona"), $ = e.value.find((V) => V.id === G) || e.value[0];
        $ && await w($.id, !0);
      } catch (G) {
        c.value = G instanceof Error ? G.message : String(G);
      } finally {
        r.value = !1;
      }
    }
  }
  async function v() {
    f.value || r.value || l.value || a.value || await h();
  }
  async function w(G, $ = !1) {
    if (!$ && (l.value || a.value)) {
      d.value = "当前操作完成后才能切换角色";
      return;
    }
    if (!$ && f.value && !window.confirm("当前角色有未保存修改，放弃后切换角色？")) return;
    const V = e.value.find((M) => M.id === G);
    if (V) {
      r.value = !0, c.value = "", d.value = "";
      try {
        const M = await bu(V);
        n.value = M, o.value = rt(M), t.value = G, s.value = `persona:${G}`, i.value = /* @__PURE__ */ new Set(), sessionStorage.setItem("charactoid.manage.persona", G);
      } catch (M) {
        c.value = M instanceof Error ? M.message : String(M);
      } finally {
        r.value = !1;
      }
    }
  }
  function x(G) {
    s.value = G;
  }
  function I(G) {
    o.value && (o.value.persona = rt(G), i.value = new Set(i.value).add("profile"));
  }
  function N(G, $) {
    if (!o.value) return;
    o.value = wC(o.value, G, $);
    const V = new Set(i.value);
    V.add("capabilities"), V.add("grants"), i.value = V;
  }
  function D(G, $) {
    if (!o.value) return;
    const V = o.value.grants.servers.find((M) => M.name === G);
    V && !V.global && (V.authorized = $), i.value = new Set(i.value).add("grants");
  }
  function y() {
    n.value && (o.value = rt(n.value), i.value = /* @__PURE__ */ new Set(), d.value = "已撤销本轮修改");
  }
  async function _() {
    if (!o.value || !n.value) return;
    const G = await Jd(o.value.persona.id);
    o.value.documents = G, n.value.documents = rt(G);
  }
  async function R() {
    if (!(!o.value || !n.value || a.value)) {
      a.value = !0, c.value = "", d.value = "正在扫描 Live2D 模型...";
      try {
        const G = await Qd();
        o.value.resources = { ...o.value.resources || { voiceAssets: [], live2dModels: [] }, live2dModels: G }, n.value.resources = { ...n.value.resources || { voiceAssets: [], live2dModels: [] }, live2dModels: rt(G) }, d.value = `已发现 ${G.length} 个 Live2D 模型`;
      } catch (G) {
        c.value = G instanceof Error ? G.message : String(G);
      } finally {
        a.value = !1;
      }
    }
  }
  async function X() {
    if (!a.value) {
      a.value = !0, c.value = "";
      try {
        await Mg(), d.value = "已打开 Live2D 模型文件夹";
      } catch (G) {
        c.value = G instanceof Error ? G.message : String(G);
      } finally {
        a.value = !1;
      }
    }
  }
  function Q(G, $ = 10) {
    $ <= 0 || window.setTimeout(async () => {
      var V;
      if (((V = o.value) == null ? void 0 : V.persona.id) === G)
        try {
          await _(), o.value.documents.some((F) => ["converting", "preview_ready", "indexing"].includes(String(F.status))) && Q(G, $ - 1);
        } catch {
        }
    }, 1400);
  }
  async function B(G, $) {
    if (!o.value || !G.length && !$.trim() || a.value) return !1;
    a.value = !0, c.value = "", d.value = "正在写入角色知识库...";
    try {
      const V = o.value.persona.id;
      return await Rg(o.value.persona, G, $), await _(), Q(V), d.value = "资料已提交，正在建立索引", !0;
    } catch (V) {
      return c.value = V instanceof Error ? V.message : String(V), !1;
    } finally {
      a.value = !1;
    }
  }
  async function T(G) {
    a.value = !0, c.value = "";
    try {
      await Lg(G), await _(), d.value = "资料已删除";
    } catch ($) {
      c.value = $ instanceof Error ? $.message : String($);
    } finally {
      a.value = !1;
    }
  }
  async function L(G) {
    var $;
    a.value = !0, c.value = "";
    try {
      const V = (($ = o.value) == null ? void 0 : $.persona.id) || "";
      await Vg(G), await _(), V && Q(V), d.value = "已重新提交索引";
    } catch (V) {
      c.value = V instanceof Error ? V.message : String(V);
    } finally {
      a.value = !1;
    }
  }
  async function Y() {
    if (o.value) {
      a.value = !0, c.value = "";
      try {
        const G = o.value.persona.id;
        await Dg(G), e.value = (await Wi()).filter(($) => $.id !== G), n.value = null, o.value = null, t.value = "", i.value = /* @__PURE__ */ new Set(), e.value[0] && await w(e.value[0].id, !0), d.value = "角色已删除";
      } catch (G) {
        c.value = G instanceof Error ? G.message : String(G);
      } finally {
        a.value = !1;
      }
    }
  }
  async function U() {
    if (!o.value || !f.value) return;
    l.value = !0, c.value = "", d.value = "";
    const G = rt(o.value), $ = {};
    i.value.has("profile") && ($.profile = () => Og(G.persona)), i.value.has("capabilities") && ($.capabilities = () => Pg(G.persona.id, G.capabilities.overrides)), i.value.has("grants") && ($.grants = () => Ag(G.persona.id, G.grants.servers));
    const V = await kC($), M = new Set(V.failedDomains.map((F) => F.domain));
    if (i.value = M, V.savedDomains.length)
      try {
        e.value = await Wi();
        const F = e.value.find((te) => te.id === G.persona.id) || G.persona, q = await bu(F);
        n.value = q, o.value = EC(q, G, M);
      } catch (F) {
        const q = rt(n.value || G);
        V.savedDomains.includes("profile") && (q.persona = rt(G.persona)), V.savedDomains.includes("capabilities") && (q.capabilities.overrides = rt(G.capabilities.overrides)), V.savedDomains.includes("grants") && (q.grants.servers = rt(G.grants.servers)), n.value = q, o.value = G, c.value = `配置已保存，但刷新失败：${F instanceof Error ? F.message : String(F)}`;
      }
    V.ok ? d.value = "角色配置已保存" : c.value = V.failedDomains.map((F) => `${F.domain}: ${F.message}`).join("；"), l.value = !1;
  }
  return { personas: e, selectedPersonaId: t, snapshot: n, draft: o, selectedNodeId: s, dirtyDomains: i, loading: r, isSaving: l, operationPending: a, error: c, message: d, isDirty: f, initialize: h, refreshIfClean: v, selectPersona: w, selectNode: x, updateProfile: I, setCapability: N, setServer: D, discard: y, save: U, addDocuments: B, removeDocument: T, reindexDocument: L, refreshLive2dResources: R, openLive2dDirectory: X, removeCurrentPersona: Y };
}
const SC = { class: "workbench-toolbar" }, CC = { class: "toolbar-identity" }, $C = { class: "toolbar-actions" }, IC = {
  key: 0,
  class: "dirty-state"
}, NC = ["disabled"], TC = ["disabled"], MC = ["disabled"], OC = {
  key: 0,
  class: "workbench-message error"
}, PC = {
  key: 1,
  class: "workbench-message"
}, AC = { class: "workbench-content" }, DC = { class: "workbench-canvas-region" }, RC = {
  key: 0,
  class: "workbench-loading"
}, LC = {
  key: 1,
  class: "workbench-empty"
}, VC = /* @__PURE__ */ De({
  __name: "App",
  setup(e) {
    const t = xC(), n = ee(0), o = ee(0), s = ee(!1), i = ae(() => t.isSaving.value || t.operationPending.value), r = ae(() => t.draft.value ? Kg(t.draft.value) : { nodes: [], edges: [] }), l = ae(() => (n.value, t_(s_(r.value, t.selectedNodeId.value)))), a = ae(() => r.value.nodes.find((L) => L.id === t.selectedNodeId.value));
    function c(L) {
      const Y = l.value.nodes.find((U) => U.id === L);
      if (Y != null && Y.data.configurable) {
        if (Y.data.kind === "mcp" && Y.data.sourceId) {
          t.setServer(Y.data.sourceId, !Y.data.assigned);
          return;
        }
        t.setCapability(L, Y.data.assigned ? "deny" : "allow");
      }
    }
    async function d() {
      var Y, U, G;
      const L = (U = (Y = t.draft.value) == null ? void 0 : Y.persona.profile) == null ? void 0 : U.tts;
      if (L != null && L.voice_asset_id)
        try {
          const $ = await zg(L.voice_asset_id, L.output_language || "auto"), V = new Audio(URL.createObjectURL($)), M = (G = window.PL) == null ? void 0 : G.audio;
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
      var Y;
      const L = (Y = t.draft.value) == null ? void 0 : Y.persona.name;
      !L || !window.confirm(`永久删除“${L}”及其资料、记忆、向量和对话？此操作无法恢复。`) || await t.removeCurrentPersona();
    }
    async function N(L) {
      window.confirm("从角色资料中删除该文件？知识库向量与本地文件将一并移除。") && await t.removeDocument(L);
    }
    async function D(L, Y) {
      await t.addDocuments(L, Y) && (o.value += 1);
    }
    function y(L, Y) {
      var $, V;
      const U = document.querySelector("#preview-title"), G = document.querySelector("#preview-content");
      !U || !G || (U.textContent = L, G.replaceChildren(typeof Y == "string" ? document.createTextNode(Y) : Y), ($ = document.querySelector("#preview-drawer")) == null || $.classList.add("is-open"), (V = document.querySelector("#preview-backdrop")) == null || V.classList.add("is-open"));
    }
    function _() {
      var L, Y;
      (L = document.querySelector("#preview-drawer")) == null || L.classList.remove("is-open"), (Y = document.querySelector("#preview-backdrop")) == null || Y.classList.remove("is-open");
    }
    function R(L) {
      y(String(L.original_filename || L.original_name || "资料预览"), String(L.markdown_preview || L.error_message || "暂无预览内容"));
    }
    async function X(L) {
      if (L.type.startsWith("image/")) {
        const U = document.createElement("img"), G = URL.createObjectURL(L);
        U.src = G, U.alt = L.name, U.style.maxWidth = "100%", U.onload = () => URL.revokeObjectURL(G), y(L.name, U);
        return;
      }
      const Y = L.type.startsWith("text/") || /\.(md|txt|json|csv|ya?ml)$/i.test(L.name);
      y(L.name, Y ? await L.text() : "该文件将在上传转换后提供 Markdown 预览。");
    }
    function Q(L) {
      t.isDirty.value && (L.preventDefault(), L.returnValue = "");
    }
    function B(L) {
      var U;
      const Y = ((U = L == null ? void 0 : L.detail) == null ? void 0 : U.nodeId) || sessionStorage.getItem("charactoid.manage.node");
      Y && (sessionStorage.removeItem("charactoid.manage.node"), t.selectNode(Y));
    }
    async function T() {
      await t.refreshIfClean(), B();
    }
    return Me(() => t.selectedPersonaId.value, () => {
      s.value = !1;
    }), ht(async () => {
      var L, Y, U;
      await t.initialize(), B(), window.addEventListener("beforeunload", Q), (L = document.querySelector("#role-workbench-root")) == null || L.addEventListener("charactoid:manage-show", T), document.addEventListener("charactoid:manage-select-node", B), (Y = document.querySelector("#close-preview")) == null || Y.addEventListener("click", _), (U = document.querySelector("#preview-backdrop")) == null || U.addEventListener("click", _);
    }), _n(() => {
      var L, Y, U;
      window.removeEventListener("beforeunload", Q), (L = document.querySelector("#role-workbench-root")) == null || L.removeEventListener("charactoid:manage-show", T), document.removeEventListener("charactoid:manage-select-node", B), (Y = document.querySelector("#close-preview")) == null || Y.removeEventListener("click", _), (U = document.querySelector("#preview-backdrop")) == null || U.removeEventListener("click", _);
    }), (L, Y) => (E(), C("div", {
      class: ge(["role-workbench", { "is-busy": i.value }])
    }, [
      u("header", SC, [
        u("div", CC, [
          ne(FS, {
            personas: H(t).personas.value,
            "selected-id": H(t).selectedPersonaId.value,
            disabled: i.value,
            onSelect: H(t).selectPersona
          }, null, 8, ["personas", "selected-id", "disabled", "onSelect"]),
          Y[3] || (Y[3] = u("p", null, "角色运行架构与能力配置", -1))
        ]),
        u("div", $C, [
          H(t).isDirty.value ? (E(), C("span", IC, "存在未保存修改")) : oe("", !0),
          u("button", {
            type: "button",
            class: ge({ active: s.value }),
            disabled: !H(t).draft.value || i.value,
            onClick: v
          }, [
            ne(H(Xd), { size: 16 }),
            Y[4] || (Y[4] = me("运行版本"))
          ], 10, NC),
          u("button", {
            type: "button",
            disabled: !H(t).isDirty.value || H(t).isSaving.value || H(t).operationPending.value,
            onClick: Y[0] || (Y[0] = //@ts-ignore
            (...U) => H(t).discard && H(t).discard(...U))
          }, [
            ne(H(Eg), { size: 16 }),
            Y[5] || (Y[5] = me("撤销"))
          ], 8, TC),
          u("button", {
            type: "button",
            class: "primary",
            disabled: !H(t).isDirty.value || H(t).isSaving.value || H(t).operationPending.value,
            onClick: Y[1] || (Y[1] = //@ts-ignore
            (...U) => H(t).save && H(t).save(...U))
          }, [
            ne(H(Nr), { size: 16 }),
            me(A(H(t).isSaving.value ? "保存中" : "保存配置"), 1)
          ], 8, MC)
        ])
      ]),
      H(t).error.value ? (E(), C("p", OC, A(H(t).error.value), 1)) : H(t).message.value ? (E(), C("p", PC, A(H(t).message.value), 1)) : oe("", !0),
      u("div", AC, [
        u("main", DC, [
          H(t).loading.value ? (E(), C("div", RC, "正在读取角色架构...")) : H(t).personas.value.length ? (E(), lt(PS, {
            key: 2,
            graph: l.value,
            "selected-node-id": H(t).selectedNodeId.value,
            onSelect: H(t).selectNode,
            onToggle: c,
            onReset: Y[2] || (Y[2] = (U) => n.value++)
          }, null, 8, ["graph", "selected-node-id", "onSelect"])) : (E(), C("div", LC, Y[6] || (Y[6] = [
            u("strong", null, "还没有角色", -1),
            u("p", null, "先在“创建角色”页面建立角色。", -1)
          ])))
        ]),
        H(t).draft.value ? (E(), lt(M0, {
          key: 0,
          node: a.value,
          draft: H(t).draft.value,
          disabled: i.value,
          "upload-complete-token": o.value,
          onProfile: H(t).updateProfile,
          onCapability: H(t).setCapability,
          onServer: H(t).setServer,
          onUpload: D,
          onDeleteDocument: N,
          onRetryDocument: H(t).reindexDocument,
          onDeletePersona: I,
          onPreviewVoice: d,
          onOpenVoiceStudio: f,
          onOpenRagEval: h,
          onPreviewDocument: R,
          onPreviewLocalFile: X,
          onRefreshLive2d: H(t).refreshLive2dResources,
          onOpenLive2dDirectory: H(t).openLive2dDirectory
        }, null, 8, ["node", "draft", "disabled", "upload-complete-token", "onProfile", "onCapability", "onServer", "onRetryDocument", "onRefreshLive2d", "onOpenLive2dDirectory"])) : oe("", !0)
      ]),
      s.value && H(t).draft.value ? (E(), lt(_C, {
        key: 2,
        "persona-id": H(t).draft.value.persona.id,
        "persona-name": H(t).draft.value.persona.name,
        disabled: i.value || H(t).isDirty.value,
        onClose: w,
        onChanged: x
      }, null, 8, ["persona-id", "persona-name", "disabled"])) : oe("", !0)
    ], 2));
  }
});
let Nn = null;
function oM(e = "#role-workbench-root") {
  if (Nn) return Nn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("角色工作台挂载点不存在");
  return Nn = gs(VC), Nn.mount(t), Nn;
}
function sM() {
  var e;
  (e = document.querySelector("#role-workbench-root")) == null || e.dispatchEvent(new CustomEvent("charactoid:manage-show"));
}
function iM() {
  Nn && (Nn.unmount(), Nn = null);
}
async function Ve(e, t) {
  const n = await fetch(e, t), s = (n.headers.get("content-type") || "").includes("application/json") ? await n.json() : await n.text();
  if (!n.ok) {
    const i = typeof s == "object" && s && "detail" in s ? s.detail : s;
    throw new Error(typeof i == "string" ? i : `请求失败（${n.status}）`);
  }
  return s;
}
function Ze(e) {
  return e instanceof Error ? e.message : String(e || "操作失败");
}
function zC(e) {
  const t = e.skills || [], n = e.servers || [], o = e.tools || [], s = t.filter((a) => a.enabled).length, i = n.filter((a) => {
    var c;
    return a.enabled && ((c = a.status) == null ? void 0 : c.status) === "connected";
  }).length, r = n.filter((a) => {
    var c, d;
    return ((c = a.status) == null ? void 0 : c.status) === "error" || a.enabled && ((d = a.status) == null ? void 0 : d.status) !== "connected";
  }).length, l = t.filter((a) => !a.builtin && !a.trusted).length;
  return { enabledSkills: s, mcpOnline: i, mcpIssues: r, toolCount: o.length, attentionCount: r + l };
}
function Mc(e) {
  const t = {};
  for (const n of e.split(/\r?\n/)) {
    const o = n.trim();
    if (!o) continue;
    const s = o.indexOf("="), i = o.indexOf(":"), r = s > 0 && (i < 0 || s < i) ? s : i;
    r > 0 && (t[o.slice(0, r).trim()] = o.slice(r + 1).trim());
  }
  return t;
}
const FC = { class: "yv-page extension-page" }, BC = { class: "extension-hero" }, HC = { class: "hero-actions" }, UC = ["disabled"], jC = {
  class: "signal-strip",
  "aria-label": "能力状态"
}, GC = {
  class: "extension-tabs",
  "aria-label": "能力工作台"
}, qC = ["data-capability-tab", "onClick"], YC = {
  key: 1,
  class: "content-section"
}, XC = {
  key: 0,
  class: "yv-empty"
}, KC = { class: "row-main" }, WC = { class: "tag-line" }, ZC = { class: "row-actions" }, JC = ["title", "onClick"], QC = ["onClick"], e$ = ["onClick"], t$ = ["onClick"], n$ = {
  key: 2,
  class: "content-section"
}, o$ = {
  key: 0,
  class: "yv-empty"
}, s$ = { class: "row-main" }, i$ = { class: "grant-field" }, r$ = ["value", "onChange"], l$ = { class: "row-actions" }, a$ = ["onClick"], u$ = ["onClick"], c$ = ["onClick"], d$ = {
  key: 3,
  class: "content-section"
}, f$ = { class: "filter-input" }, p$ = {
  key: 0,
  class: "yv-empty"
}, h$ = { class: "row-main" }, v$ = {
  key: 4,
  class: "content-section"
}, g$ = { class: "catalog-tools" }, m$ = { class: "filter-input" }, y$ = { class: "catalog-grid" }, b$ = { class: "tag-line" }, _$ = ["disabled", "onClick"], w$ = { class: "dialog-head" }, k$ = { class: "yv-kicker" }, E$ = { class: "yv-field" }, x$ = ["readonly"], S$ = { class: "yv-field" }, C$ = { class: "yv-field" }, $$ = { class: "yv-field" }, I$ = { class: "tool-options" }, N$ = ["value"], T$ = {
  class: "yv-button primary",
  type: "submit"
}, M$ = { class: "yv-field" }, O$ = { class: "yv-field" }, P$ = { class: "transport-tabs" }, A$ = ["onClick"], D$ = { class: "yv-field" }, R$ = { class: "yv-field" }, L$ = { class: "yv-field" }, V$ = { class: "yv-field" }, z$ = { class: "yv-field" }, F$ = {
  class: "yv-button primary",
  type: "submit"
}, B$ = { class: "dialog-head" }, H$ = { class: "dialog-body" }, U$ = { class: "catalog-detail" }, j$ = /* @__PURE__ */ De({
  __name: "App",
  setup(e) {
    const t = [
      { id: "skills", label: "技能" },
      { id: "mcp", label: "MCP 服务" },
      { id: "tools", label: "工具与权限" },
      { id: "catalog", label: "扩展管理" }
    ], n = Rn({ skills: [], servers: [], tools: [] }), o = ee("skills"), s = ee(!1), i = ee(""), r = ee(!1), l = ee(""), a = ee(null), c = ee("skill"), d = ee(null), f = ee(null), h = ee([]), v = ee(!1), w = ee(""), x = ee("all"), I = ee(null), N = ee([]), D = ee(null), y = Rn({ name: "", description: "", instructions: "", prompt_hint: "", tool_names: [] }), _ = Rn({ name: "", description: "", transport: "stdio", command: "", args: "", env: "", url: "", headers: "" }), R = ae(() => zC(n)), X = ae(() => {
      const K = l.value.trim().toLowerCase();
      return n.tools.filter((p) => !K || [p.name, p.server, p.description].some((O) => String(O || "").toLowerCase().includes(K)));
    }), Q = ae(() => {
      const K = w.value.trim().toLowerCase();
      return h.value.filter((p) => !K || [p.id, p.name, p.description, ...p.categories || []].join(" ").toLowerCase().includes(K));
    }), B = ae(() => Object.entries(n.skills.reduce((K, p) => {
      var g;
      const O = ((g = p.metadata) == null ? void 0 : g.category) || "其他";
      return (K[O] || (K[O] = [])).push(p), K;
    }, {})).sort(([K], [p]) => K.localeCompare(p, "zh")));
    let T = 0;
    function L(K, p = !1) {
      i.value = K, r.value = p;
    }
    async function Y(K = !1) {
      K || (s.value = !0);
      try {
        const [p, O, g, m] = await Promise.all([
          Ve("/api/skills"),
          Ve("/api/mcp/servers"),
          Ve("/api/mcp/tools"),
          Ve("/api/skills/tools")
        ]);
        n.skills = p, n.servers = O, n.tools = g, N.value = m, K || L("扩展状态已刷新");
      } catch (p) {
        L(Ze(p), !0);
      } finally {
        s.value = !1;
      }
    }
    function U() {
      G(), T = window.setInterval(() => Y(!0), 3e4);
    }
    function G() {
      T && window.clearInterval(T), T = 0;
    }
    async function $() {
      await Y(!0), U();
    }
    function V() {
      D.value = null, Object.assign(y, { name: "", description: "", instructions: "", prompt_hint: "", tool_names: [] });
    }
    function M(K) {
      V(), c.value = "skill", K && (D.value = K.name, Object.assign(y, { name: K.name, description: K.description || "", instructions: K.instructions || "", prompt_hint: K.prompt_hint || "", tool_names: [...K.tool_names || []] })), ft(() => {
        var p;
        return (p = a.value) == null ? void 0 : p.showModal();
      });
    }
    function F() {
      c.value = "mcp", Object.assign(_, { name: "", description: "", transport: "stdio", command: "", args: "", env: "", url: "", headers: "" }), ft(() => {
        var K;
        return (K = a.value) == null ? void 0 : K.showModal();
      });
    }
    async function q() {
      var K;
      if (!y.name.trim() || !y.instructions.trim()) return L("名称与提示词不能为空", !0);
      s.value = !0;
      try {
        const p = { description: y.description.trim(), instructions: y.instructions.trim(), prompt_hint: y.prompt_hint.trim(), tool_names: y.tool_names };
        D.value ? await Ve(`/api/skills/${encodeURIComponent(D.value)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) }) : await Ve("/api/skills", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: y.name.trim(), ...p }) }), (K = a.value) == null || K.close(), await Y(!0), L(D.value ? "技能修改已保存" : "技能已创建");
      } catch (p) {
        L(Ze(p), !0);
      } finally {
        s.value = !1;
      }
    }
    async function te(K, p) {
      try {
        await Ve(`/api/skills/${encodeURIComponent(K.name)}`, { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) }), await Y(!0), L("技能状态已更新");
      } catch (O) {
        L(Ze(O), !0);
      }
    }
    async function ce(K) {
      if (confirm(`删除技能 ${K.name}？`))
        try {
          await Ve(`/api/skills/${encodeURIComponent(K.name)}`, { method: "DELETE" }), await Y(!0), L("技能已删除");
        } catch (p) {
          L(Ze(p), !0);
        }
    }
    async function fe(K) {
      var O;
      if (!K) return;
      const p = new FormData();
      p.append("file", K);
      try {
        const g = await Ve("/api/skills/upload", { method: "POST", body: p });
        await Y(!0), L((O = g.installed) != null && O.length ? `已安装：${g.installed.join("、")}` : "上传完成");
      } catch (g) {
        L(Ze(g), !0);
      } finally {
        d.value && (d.value.value = "");
      }
    }
    async function le() {
      var K;
      if (!_.name.trim()) return L("服务器名称不能为空", !0);
      try {
        await Ve("/api/mcp/servers", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: _.name.trim(), description: _.description.trim(), transport: _.transport, command: _.command.trim(), args: _.args.split(/\r?\n/).map((p) => p.trim()).filter(Boolean), env: Mc(_.env), url: _.url.trim(), headers: Mc(_.headers), enabled: !0 }) }), (K = a.value) == null || K.close(), await Y(!0), L("MCP 服务已保存并连接");
      } catch (p) {
        L(Ze(p), !0);
      }
    }
    async function he(K) {
      try {
        await Ve(`/api/mcp/servers/${encodeURIComponent(K.name)}/${K.enabled ? "disable" : "enable"}`, { method: "POST" }), await Y(!0);
      } catch (p) {
        L(Ze(p), !0);
      }
    }
    async function pe(K) {
      L(`正在测试 ${K.name}…`);
      try {
        const p = await Ve(`/api/mcp/servers/${encodeURIComponent(K.name)}/test`, { method: "POST" });
        L(p.ok ? `${K.name} 连接正常：${p.tool_count} 个工具，耗时 ${p.elapsed_ms}ms` : `${K.name} 连接失败：${p.error}`, !p.ok), await Y(!0);
      } catch (p) {
        L(Ze(p), !0);
      }
    }
    async function be(K, p) {
      const g = p.target.value.split(",").map((m) => m.trim()).filter(Boolean);
      try {
        await Ve(`/api/mcp/servers/${encodeURIComponent(K.name)}/grants`, { method: "PATCH", headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body: JSON.stringify({ allowed_persona_ids: g }) }), L(`已更新 ${K.name} 的授权`);
      } catch (m) {
        L(Ze(m), !0);
      }
    }
    async function se(K) {
      if (confirm(`删除 MCP 服务器 ${K.name}？其工具将立即不可用。`))
        try {
          await Ve(`/api/mcp/servers/${encodeURIComponent(K.name)}`, { method: "DELETE" }), await Y(!0), L("MCP 服务已删除");
        } catch (p) {
          L(Ze(p), !0);
        }
    }
    async function xe(K = !1) {
      try {
        const p = await Ve(`/api/extensions/catalog?kind=${encodeURIComponent(x.value)}${K ? "&refresh=true" : ""}`);
        h.value = p.items || [], v.value = !!p.stale;
      } catch {
        L("在线扩展目录暂时不可用，可稍后重试", !0), h.value = [];
      }
    }
    function $e(K) {
      return K.kind === "skill" ? n.skills.some((p) => p.name === K.id) : n.servers.some((p) => p.name === K.id);
    }
    function Ee(K) {
      I.value = K, ft(() => {
        var p;
        return (p = f.value) == null ? void 0 : p.showModal();
      });
    }
    async function ke() {
      var p, O, g;
      const K = I.value;
      if (K)
        try {
          const m = await Ve(`/api/extensions/catalog/${encodeURIComponent(K.id)}/install`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ confirmed: !1 }) });
          if ((O = (p = m.preview) == null ? void 0 : p.conflicts) != null && O.length) throw new Error(m.preview.conflicts.join("；"));
          const k = await Ve(`/api/extensions/catalog/${encodeURIComponent(K.id)}/install`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ confirmed: !0 }) });
          if (k.status !== "installed") throw new Error(k.message || "安装未完成");
          await Y(!0), (g = f.value) == null || g.close(), L(K.kind === "skill" ? "安装完成，请在技能页启用并信任" : "安装完成，请在 MCP 页启用并授权角色");
        } catch (m) {
          L(Ze(m), !0);
        }
    }
    return ht(() => {
      const K = document.querySelector("#extensions-app-root");
      K == null || K.addEventListener("charactoid:extensions-show", $), K == null || K.addEventListener("charactoid:extensions-hide", G), $();
    }), _n(() => G()), (K, p) => {
      var O, g, m, k, S, j, W, Z;
      return E(), C("main", FC, [
        u("header", BC, [
          p[24] || (p[24] = u("div", null, [
            u("span", { class: "yv-kicker" }, "Agent capability registry"),
            u("h1", null, "能力扩展"),
            u("p", null, "统一管理角色可调用的 Skill、Tool 与 MCP 服务。")
          ], -1)),
          u("div", HC, [
            u("span", {
              class: ge(["yv-status", R.value.attentionCount ? "warn" : "ok"])
            }, A(R.value.attentionCount ? `${R.value.attentionCount} 项待处理` : "运行正常"), 3),
            u("button", {
              class: "yv-button yv-icon-button",
              title: "刷新",
              disabled: s.value,
              onClick: p[0] || (p[0] = (P) => Y())
            }, [
              ne(H(Dt))
            ], 8, UC)
          ])
        ]),
        u("section", jC, [
          u("div", null, [
            p[25] || (p[25] = u("span", null, "已启用技能", -1)),
            u("strong", null, A(R.value.enabledSkills), 1),
            u("small", null, "共 " + A(n.skills.length) + " 个", 1)
          ]),
          u("div", null, [
            p[26] || (p[26] = u("span", null, "MCP 在线", -1)),
            u("strong", null, A(R.value.mcpOnline), 1),
            u("small", null, A(R.value.mcpIssues) + " 项异常", 1)
          ]),
          u("div", null, [
            p[27] || (p[27] = u("span", null, "已注册工具", -1)),
            u("strong", null, A(R.value.toolCount), 1),
            p[28] || (p[28] = u("small", null, "统一工具注册表", -1))
          ]),
          u("div", null, [
            p[29] || (p[29] = u("span", null, "需要处理", -1)),
            u("strong", null, A(R.value.attentionCount), 1),
            p[30] || (p[30] = u("small", null, "信任与连接状态", -1))
          ])
        ]),
        u("nav", GC, [
          (E(), C(_e, null, Re(t, (P) => u("button", {
            key: P.id,
            "data-capability-tab": P.id,
            type: "button",
            class: ge({ active: o.value === P.id }),
            onClick: (re) => {
              o.value = P.id, P.id === "catalog" && xe(!1);
            }
          }, A(P.label), 11, qC)), 64))
        ]),
        i.value ? (E(), C("p", {
          key: 0,
          class: ge(["extension-message", { error: r.value }]),
          role: "status"
        }, A(i.value), 3)) : oe("", !0),
        o.value === "skills" ? (E(), C("section", YC, [
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
                onChange: p[1] || (p[1] = (P) => {
                  var re;
                  return fe((re = P.target.files) == null ? void 0 : re[0]);
                })
              }, null, 544),
              u("button", {
                class: "yv-button",
                onClick: p[2] || (p[2] = (P) => {
                  var re;
                  return (re = d.value) == null ? void 0 : re.click();
                })
              }, [
                ne(H(Mr)),
                p[31] || (p[31] = me("上传技能包"))
              ]),
              u("button", {
                class: "yv-button primary",
                onClick: p[3] || (p[3] = (P) => M())
              }, [
                ne(H(ss)),
                p[32] || (p[32] = me("新增技能"))
              ])
            ])
          ]),
          n.skills.length ? oe("", !0) : (E(), C("div", XC, "还没有技能")),
          (E(!0), C(_e, null, Re(B.value, ([P, re]) => (E(), C("section", {
            key: P,
            class: "skill-group"
          }, [
            u("h3", null, A(P), 1),
            (E(!0), C(_e, null, Re(re, (ie) => (E(), C("article", {
              key: ie.name,
              class: "extension-row kind-skill"
            }, [
              u("div", KC, [
                u("div", null, [
                  u("strong", null, A(ie.name), 1),
                  u("span", null, A(ie.builtin ? "内置" : "自定义") + " · " + A(ie.format === "skillmd" ? "标准包" : "JSON"), 1)
                ]),
                u("p", null, A(ie.description || "暂无说明"), 1),
                u("div", WC, [
                  (E(!0), C(_e, null, Re(ie.tool_names, (ue) => (E(), C("span", { key: ue }, A(ue), 1))), 128))
                ])
              ]),
              u("div", ZC, [
                u("span", {
                  class: ge(["yv-status", ie.enabled ? "ok" : "warn"])
                }, A(ie.enabled ? "已启用" : "已停用"), 3),
                u("button", {
                  class: "yv-button yv-icon-button",
                  title: ie.enabled ? "停用" : "启用",
                  onClick: (ue) => te(ie, { enabled: !ie.enabled })
                }, [
                  ne(H(kg))
                ], 8, JC),
                !ie.builtin && !ie.trusted ? (E(), C("button", {
                  key: 0,
                  class: "yv-button",
                  onClick: (ue) => te(ie, { trusted: !0 })
                }, "信任", 8, QC)) : oe("", !0),
                ie.builtin ? oe("", !0) : (E(), C("button", {
                  key: 1,
                  class: "yv-button yv-icon-button",
                  title: "编辑",
                  onClick: (ue) => M(ie)
                }, [
                  ne(H(Kd))
                ], 8, e$)),
                ie.builtin ? oe("", !0) : (E(), C("button", {
                  key: 2,
                  class: "yv-button yv-icon-button danger",
                  title: "删除",
                  onClick: (ue) => ce(ie)
                }, [
                  ne(H(gn))
                ], 8, t$))
              ])
            ]))), 128))
          ]))), 128))
        ])) : o.value === "mcp" ? (E(), C("section", n$, [
          u("header", null, [
            p[35] || (p[35] = u("div", null, [
              u("span", { class: "yv-kicker" }, "External protocol services"),
              u("h2", null, "MCP 服务"),
              u("p", null, "连接、测试并限制外部服务可访问的角色。")
            ], -1)),
            u("button", {
              class: "yv-button primary",
              onClick: p[4] || (p[4] = (P) => F())
            }, [
              ne(H(ss)),
              p[34] || (p[34] = me("新增服务"))
            ])
          ]),
          n.servers.length ? oe("", !0) : (E(), C("div", o$, "尚未配置 MCP 服务")),
          (E(!0), C(_e, null, Re(n.servers, (P) => {
            var re, ie, ue, de, Ce;
            return E(), C("article", {
              key: P.name,
              class: "extension-row kind-mcp"
            }, [
              u("div", s$, [
                u("div", null, [
                  u("strong", null, A(P.name), 1),
                  u("span", null, A(P.transport) + " · " + A(P.enabled ? "已启用" : "已停用"), 1)
                ]),
                u("p", null, A(P.description || ((re = P.status) == null ? void 0 : re.error) || "暂无说明"), 1),
                u("label", i$, [
                  p[36] || (p[36] = u("span", null, "授权角色", -1)),
                  u("input", {
                    value: (P.allowed_persona_ids || []).join(","),
                    placeholder: "* 或角色 ID，逗号分隔",
                    onChange: (Pe) => be(P, Pe)
                  }, null, 40, r$)
                ])
              ]),
              u("div", l$, [
                u("span", {
                  class: ge(["yv-status", ((ie = P.status) == null ? void 0 : ie.status) === "connected" ? "ok" : ((ue = P.status) == null ? void 0 : ue.status) === "error" ? "error" : "warn"])
                }, A(((de = P.status) == null ? void 0 : de.status) === "connected" ? `${P.status.tool_count} 个工具` : ((Ce = P.status) == null ? void 0 : Ce.status) === "error" ? "连接失败" : "等待连接"), 3),
                u("button", {
                  class: "yv-button",
                  onClick: (Pe) => pe(P)
                }, "测试", 8, a$),
                u("button", {
                  class: "yv-button",
                  onClick: (Pe) => he(P)
                }, A(P.enabled ? "停用" : "启用"), 9, u$),
                u("button", {
                  class: "yv-button yv-icon-button danger",
                  title: "删除",
                  onClick: (Pe) => se(P)
                }, [
                  ne(H(gn))
                ], 8, c$)
              ])
            ]);
          }), 128))
        ])) : o.value === "tools" ? (E(), C("section", d$, [
          u("header", null, [
            p[37] || (p[37] = u("div", null, [
              u("span", { class: "yv-kicker" }, "Unified registry"),
              u("h2", null, "工具与权限"),
              u("p", null, "查看可调用工具，并确认哪些调用需要用户授权。")
            ], -1)),
            u("label", f$, [
              ne(H(Tr)),
              Te(u("input", {
                "onUpdate:modelValue": p[5] || (p[5] = (P) => l.value = P),
                placeholder: "搜索工具名、服务或描述"
              }, null, 512), [
                [Fe, l.value]
              ])
            ])
          ]),
          X.value.length ? oe("", !0) : (E(), C("div", p$, "没有匹配的工具")),
          (E(!0), C(_e, null, Re(X.value, (P) => (E(), C("article", {
            key: `${P.server}/${P.name}`,
            class: "extension-row kind-tool"
          }, [
            u("div", h$, [
              u("div", null, [
                u("strong", null, A(P.name), 1),
                u("span", null, A(P.server || "内置"), 1)
              ]),
              u("p", null, A(P.description || "暂无说明"), 1)
            ]),
            u("span", {
              class: ge(["yv-status", P.requires_confirmation ? "warn" : "ok"])
            }, A(P.requires_confirmation ? "调用需确认" : "可直接调用"), 3)
          ]))), 128))
        ])) : (E(), C("section", v$, [
          u("header", null, [
            p[39] || (p[39] = u("div", null, [
              u("span", { class: "yv-kicker" }, "Curated catalog"),
              u("h2", null, "扩展管理"),
              u("p", null, "查看可安装扩展，确认来源后再加入本地能力系统。")
            ], -1)),
            u("button", {
              class: "yv-button",
              onClick: p[6] || (p[6] = (P) => xe(!0))
            }, [
              ne(H(Dt)),
              p[38] || (p[38] = me("刷新目录"))
            ])
          ]),
          u("div", g$, [
            u("label", m$, [
              ne(H(Tr)),
              Te(u("input", {
                "onUpdate:modelValue": p[7] || (p[7] = (P) => w.value = P),
                placeholder: "搜索名称、说明或分类"
              }, null, 512), [
                [Fe, w.value]
              ])
            ]),
            Te(u("select", {
              "onUpdate:modelValue": p[8] || (p[8] = (P) => x.value = P),
              onChange: p[9] || (p[9] = (P) => xe(!1))
            }, p[40] || (p[40] = [
              u("option", { value: "all" }, "全部类型", -1),
              u("option", { value: "skill" }, "Skill", -1),
              u("option", { value: "mcp" }, "MCP", -1)
            ]), 544), [
              [vn, x.value]
            ]),
            u("span", {
              class: ge(["yv-status", v.value ? "warn" : "ok"])
            }, A(v.value ? "缓存目录" : `${h.value.length} 个条目`), 3)
          ]),
          u("div", y$, [
            (E(!0), C(_e, null, Re(Q.value, (P) => (E(), C("article", {
              key: P.id,
              class: ge(["catalog-item", `kind-${P.kind}`])
            }, [
              u("span", null, A(P.kind.toUpperCase()), 1),
              u("h3", null, A(P.name || P.id), 1),
              u("small", null, "v" + A(P.version || "未知") + " · " + A(P.id), 1),
              u("p", null, A(P.description || "暂无说明"), 1),
              u("div", b$, [
                (E(!0), C(_e, null, Re(P.categories, (re) => (E(), C("span", { key: re }, A(re), 1))), 128))
              ]),
              u("button", {
                class: "yv-button",
                disabled: $e(P),
                onClick: (re) => Ee(P)
              }, A($e(P) ? "已安装" : "查看并安装"), 9, _$)
            ], 2))), 128))
          ])
        ])),
        u("dialog", {
          ref_key: "drawer",
          ref: a,
          class: "yv-dialog"
        }, [
          u("header", w$, [
            u("div", null, [
              u("span", k$, A(c.value === "skill" ? "Instruction package" : "Protocol service"), 1),
              u("h2", null, A(c.value === "skill" ? D.value ? `编辑 ${D.value}` : "新增技能" : "新增 MCP 服务"), 1)
            ]),
            u("button", {
              class: "yv-button yv-icon-button",
              title: "关闭",
              onClick: p[10] || (p[10] = (P) => {
                var re;
                return (re = a.value) == null ? void 0 : re.close();
              })
            }, [
              ne(H(Bt))
            ])
          ]),
          c.value === "skill" ? (E(), C("form", {
            key: 0,
            class: "dialog-body",
            onSubmit: yt(q, ["prevent"])
          }, [
            u("label", E$, [
              p[41] || (p[41] = u("span", null, "名称", -1)),
              Te(u("input", {
                "onUpdate:modelValue": p[11] || (p[11] = (P) => y.name = P),
                readonly: !!D.value
              }, null, 8, x$), [
                [Fe, y.name]
              ])
            ]),
            u("label", S$, [
              p[42] || (p[42] = u("span", null, "描述", -1)),
              Te(u("input", {
                "onUpdate:modelValue": p[12] || (p[12] = (P) => y.description = P)
              }, null, 512), [
                [Fe, y.description]
              ])
            ]),
            u("label", C$, [
              p[43] || (p[43] = u("span", null, "提示词", -1)),
              Te(u("textarea", {
                "onUpdate:modelValue": p[13] || (p[13] = (P) => y.instructions = P),
                rows: "6"
              }, null, 512), [
                [Fe, y.instructions]
              ])
            ]),
            u("label", $$, [
              p[44] || (p[44] = u("span", null, "触发提示", -1)),
              Te(u("input", {
                "onUpdate:modelValue": p[14] || (p[14] = (P) => y.prompt_hint = P)
              }, null, 512), [
                [Fe, y.prompt_hint]
              ])
            ]),
            u("fieldset", I$, [
              p[45] || (p[45] = u("legend", null, "可附加工具", -1)),
              (E(!0), C(_e, null, Re(N.value, (P) => (E(), C("label", {
                key: P.name
              }, [
                Te(u("input", {
                  "onUpdate:modelValue": p[15] || (p[15] = (re) => y.tool_names = re),
                  type: "checkbox",
                  value: P.name
                }, null, 8, N$), [
                  [qd, y.tool_names]
                ]),
                u("span", null, A(P.name) + A(P.requires_confirmation ? "（需确认）" : ""), 1)
              ]))), 128))
            ]),
            u("button", T$, [
              ne(H(Nr)),
              p[46] || (p[46] = me("保存技能"))
            ])
          ], 32)) : (E(), C("form", {
            key: 1,
            class: "dialog-body",
            onSubmit: yt(le, ["prevent"])
          }, [
            u("label", M$, [
              p[47] || (p[47] = u("span", null, "名称", -1)),
              Te(u("input", {
                "onUpdate:modelValue": p[16] || (p[16] = (P) => _.name = P)
              }, null, 512), [
                [Fe, _.name]
              ])
            ]),
            u("label", O$, [
              p[48] || (p[48] = u("span", null, "描述", -1)),
              Te(u("input", {
                "onUpdate:modelValue": p[17] || (p[17] = (P) => _.description = P)
              }, null, 512), [
                [Fe, _.description]
              ])
            ]),
            u("div", P$, [
              (E(), C(_e, null, Re([{ id: "stdio", label: "本地进程" }, { id: "streamable_http", label: "远程 HTTP" }, { id: "sse", label: "远程 SSE" }], (P) => u("button", {
                key: P.id,
                type: "button",
                class: ge({ active: _.transport === P.id }),
                onClick: (re) => _.transport = P.id
              }, A(P.label), 11, A$)), 64))
            ]),
            _.transport === "stdio" ? (E(), C(_e, { key: 0 }, [
              u("label", D$, [
                p[49] || (p[49] = u("span", null, "启动命令", -1)),
                Te(u("input", {
                  "onUpdate:modelValue": p[18] || (p[18] = (P) => _.command = P)
                }, null, 512), [
                  [Fe, _.command]
                ])
              ]),
              u("label", R$, [
                p[50] || (p[50] = u("span", null, "参数（每行一个）", -1)),
                Te(u("textarea", {
                  "onUpdate:modelValue": p[19] || (p[19] = (P) => _.args = P),
                  rows: "3"
                }, null, 512), [
                  [Fe, _.args]
                ])
              ]),
              u("label", L$, [
                p[51] || (p[51] = u("span", null, "环境变量（KEY=VALUE）", -1)),
                Te(u("textarea", {
                  "onUpdate:modelValue": p[20] || (p[20] = (P) => _.env = P),
                  rows: "3"
                }, null, 512), [
                  [Fe, _.env]
                ])
              ])
            ], 64)) : (E(), C(_e, { key: 1 }, [
              u("label", V$, [
                p[52] || (p[52] = u("span", null, "服务器地址", -1)),
                Te(u("input", {
                  "onUpdate:modelValue": p[21] || (p[21] = (P) => _.url = P)
                }, null, 512), [
                  [Fe, _.url]
                ])
              ]),
              u("label", z$, [
                p[53] || (p[53] = u("span", null, "请求头（KEY: VALUE）", -1)),
                Te(u("textarea", {
                  "onUpdate:modelValue": p[22] || (p[22] = (P) => _.headers = P),
                  rows: "3"
                }, null, 512), [
                  [Fe, _.headers]
                ])
              ])
            ], 64)),
            u("button", F$, [
              ne(H(Nr)),
              p[54] || (p[54] = me("保存服务"))
            ])
          ], 32))
        ], 512),
        u("dialog", {
          ref_key: "catalogDialog",
          ref: f,
          class: "yv-dialog"
        }, [
          u("header", B$, [
            u("div", null, [
              p[55] || (p[55] = u("span", { class: "yv-kicker" }, "安装预览", -1)),
              u("h2", null, A(((O = I.value) == null ? void 0 : O.name) || ((g = I.value) == null ? void 0 : g.id)), 1)
            ]),
            u("button", {
              class: "yv-button yv-icon-button",
              title: "关闭",
              onClick: p[23] || (p[23] = (P) => {
                var re;
                return (re = f.value) == null ? void 0 : re.close();
              })
            }, [
              ne(H(Bt))
            ])
          ]),
          u("div", H$, [
            u("p", null, A(((m = I.value) == null ? void 0 : m.description) || "暂无说明"), 1),
            u("dl", U$, [
              p[56] || (p[56] = u("dt", null, "类型", -1)),
              u("dd", null, A((S = (k = I.value) == null ? void 0 : k.kind) == null ? void 0 : S.toUpperCase()), 1),
              p[57] || (p[57] = u("dt", null, "版本", -1)),
              u("dd", null, A(((j = I.value) == null ? void 0 : j.version) || "未知"), 1),
              p[58] || (p[58] = u("dt", null, "来源", -1)),
              u("dd", null, A(((Z = (W = I.value) == null ? void 0 : W.source) == null ? void 0 : Z.type) || "未知"), 1)
            ]),
            u("button", {
              class: "yv-button primary",
              onClick: ke
            }, [
              ne(H(po)),
              p[59] || (p[59] = me("确认安装"))
            ])
          ])
        ], 512)
      ]);
    };
  }
});
let Tn = null;
const Pp = () => document.querySelector("#extensions-app-root");
function rM(e = "#extensions-app-root") {
  if (Tn) return Tn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("能力扩展挂载点不存在");
  return Tn = gs(j$), Tn.mount(t), Tn;
}
function lM() {
  var e;
  (e = Pp()) == null || e.dispatchEvent(new CustomEvent("charactoid:extensions-show"));
}
function aM() {
  var e;
  (e = Pp()) == null || e.dispatchEvent(new CustomEvent("charactoid:extensions-hide"));
}
function uM() {
  Tn && (Tn.unmount(), Tn = null);
}
const G$ = /* @__PURE__ */ new Set([
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
function Ds(e, t) {
  if (e === "scope_isolation_ok") return t ? "通过" : "未通过";
  const n = Number(t);
  return G$.has(e) && Number.isFinite(n) ? `${Math.round(n * 100)}%` : typeof t == "number" && Number.isFinite(n) ? Number.isInteger(n) ? String(n) : n.toFixed(3) : String(t ?? "—");
}
function q$(e, t) {
  return t ? Math.max(0, Math.min(100, Math.round(e / t * 100))) : 0;
}
function Y$(e) {
  return {
    persona_id: e.personaId,
    tier: e.tier,
    dataset_mode: e.datasetMode
  };
}
function ci(e) {
  return [...new Set(e.split(/[\n,，]+/).map((t) => t.trim()).filter(Boolean))];
}
function Ap(e) {
  return {
    question: e.question.trim(),
    expected_answer: e.expectedAnswer.trim(),
    relevant_document_ids: ci(e.documentIds),
    tags: ci(e.tags),
    difficulty: e.difficulty,
    enabled: e.enabled
  };
}
function X$(e) {
  return Ve(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-cases`, { cache: "no-store" });
}
function K$(e, t) {
  return Ve(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-cases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Ap(t))
  });
}
function W$(e, t, n) {
  return Ve(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-cases/${encodeURIComponent(t)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Ap(n))
  });
}
async function Z$(e, t) {
  await Ve(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-cases/${encodeURIComponent(t)}`, {
    method: "DELETE"
  });
}
function J$(e, t = "pending") {
  return Ve(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-candidates?status=${encodeURIComponent(t)}`, { cache: "no-store" });
}
function Q$(e) {
  return Ve(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-candidates/sync`, { method: "POST" });
}
function eI(e) {
  const t = { note: (e.note || "").trim() };
  return e.expectedAnswer !== void 0 && (t.expected_answer = e.expectedAnswer.trim()), e.documentIds !== void 0 && (t.relevant_document_ids = ci(e.documentIds)), e.tags !== void 0 && (t.tags = ci(e.tags)), e.difficulty !== void 0 && (t.difficulty = e.difficulty), t;
}
function tI(e, t, n) {
  return Ve(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-candidates/${encodeURIComponent(t)}/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(eI(n))
  });
}
function nI(e, t, n = "") {
  return Ve(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-candidates/${encodeURIComponent(t)}/reject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note: n.trim() })
  });
}
const oI = {
  class: "eval-dataset",
  "aria-label": "人工评测题集"
}, sI = { class: "eval-dataset-heading" }, iI = { key: 0 }, rI = { class: "eval-dataset-actions" }, lI = ["disabled"], aI = ["disabled"], uI = {
  key: 0,
  class: "eval-dataset-error"
}, cI = {
  key: 1,
  class: "eval-dataset-editor"
}, dI = { class: "eval-dataset-editor-head" }, fI = ["disabled"], pI = { class: "yv-field" }, hI = { class: "yv-field" }, vI = { class: "eval-dataset-form-grid" }, gI = { class: "yv-field" }, mI = { class: "yv-field" }, yI = { class: "yv-field" }, bI = { class: "eval-dataset-check" }, _I = { class: "eval-dataset-editor-actions" }, wI = ["disabled"], kI = ["disabled"], EI = {
  key: 2,
  class: "eval-dataset-empty"
}, xI = {
  key: 3,
  class: "eval-dataset-empty"
}, SI = {
  key: 4,
  class: "eval-dataset-empty"
}, CI = {
  key: 5,
  class: "eval-dataset-list"
}, $I = { class: "eval-dataset-row-main" }, II = { key: 0 }, NI = { class: "eval-dataset-meta" }, TI = { key: 0 }, MI = { key: 1 }, OI = { class: "eval-dataset-row-actions" }, PI = ["disabled", "onClick"], AI = ["disabled", "onClick"], DI = /* @__PURE__ */ De({
  __name: "EvalDatasetPanel",
  props: {
    spaceId: {}
  },
  setup(e) {
    const t = e, n = ee([]), o = ee(!1), s = ee(!1), i = ee(""), r = ee(!1), l = ee(null), a = ee(h());
    let c = 0;
    const d = ae(() => n.value.filter((R) => R.enabled !== !1).length), f = ae(() => !!l.value);
    function h() {
      return { question: "", expectedAnswer: "", documentIds: "", tags: "", difficulty: "medium", enabled: !0 };
    }
    function v(R) {
      return {
        question: R.question || "",
        expectedAnswer: R.expected_answer || "",
        documentIds: (R.relevant_document_ids || []).join(`
`),
        tags: (R.tags || []).join(", "),
        difficulty: R.difficulty || "medium",
        enabled: R.enabled !== !1
      };
    }
    function w(R) {
      return { easy: "简单", medium: "中等", hard: "困难" }[R || "medium"] || "中等";
    }
    function x() {
      l.value = null, a.value = h(), r.value = !0, i.value = "";
    }
    function I(R) {
      l.value = R.id, a.value = v(R), r.value = !0, i.value = "";
    }
    function N() {
      s.value || (r.value = !1, l.value = null);
    }
    async function D() {
      const R = ++c;
      if (!t.spaceId) {
        n.value = [], r.value = !1;
        return;
      }
      o.value = !0, i.value = "";
      try {
        const X = await X$(t.spaceId);
        R === c && (n.value = X.items || []);
      } catch (X) {
        R === c && (i.value = Ze(X));
      } finally {
        R === c && (o.value = !1);
      }
    }
    async function y() {
      if (!t.spaceId || !a.value.question.trim()) {
        i.value = "请填写问题";
        return;
      }
      s.value = !0, i.value = "";
      try {
        const R = l.value ? await W$(t.spaceId, l.value, a.value) : await K$(t.spaceId, a.value);
        l.value ? n.value = n.value.map((X) => X.id === R.id ? R : X) : n.value = [...n.value, R], N();
      } catch (R) {
        i.value = Ze(R);
      } finally {
        s.value = !1;
      }
    }
    async function _(R) {
      if (!(!t.spaceId || !window.confirm(`删除这条评测题？

${R.question}`))) {
        s.value = !0, i.value = "";
        try {
          await Z$(t.spaceId, R.id), n.value = n.value.filter((X) => X.id !== R.id), l.value === R.id && N();
        } catch (X) {
          i.value = Ze(X);
        } finally {
          s.value = !1;
        }
      }
    }
    return Me(() => t.spaceId, D), ht(D), (R, X) => (E(), C("section", oI, [
      u("header", sI, [
        u("div", null, [
          X[7] || (X[7] = u("span", { class: "yv-kicker" }, "Regression set", -1)),
          u("h2", null, [
            X[6] || (X[6] = me("人工题集 ")),
            n.value.length ? (E(), C("small", iI, A(d.value) + "/" + A(n.value.length) + " 启用", 1)) : oe("", !0)
          ]),
          X[8] || (X[8] = u("p", null, "把真实问题留成可重复的回归样本。", -1))
        ]),
        u("div", rI, [
          u("button", {
            class: "yv-button",
            type: "button",
            disabled: o.value || s.value || !R.spaceId,
            title: "刷新题集",
            onClick: D
          }, [
            ne(H(Dt), {
              size: 14,
              class: ge({ "is-spinning": o.value })
            }, null, 8, ["class"]),
            X[9] || (X[9] = me("刷新"))
          ], 8, lI),
          u("button", {
            class: "yv-button primary",
            type: "button",
            disabled: s.value || !R.spaceId,
            onClick: x
          }, [
            ne(H(ss), { size: 14 }),
            X[10] || (X[10] = me("新增题目"))
          ], 8, aI)
        ])
      ]),
      i.value ? (E(), C("p", uI, A(i.value), 1)) : oe("", !0),
      r.value ? (E(), C("div", cI, [
        u("div", dI, [
          u("strong", null, A(f.value ? "编辑题目" : "新增题目"), 1),
          u("button", {
            class: "icon-button",
            type: "button",
            title: "关闭",
            disabled: s.value,
            onClick: N
          }, [
            ne(H(Bt), { size: 15 })
          ], 8, fI)
        ]),
        u("label", pI, [
          X[11] || (X[11] = u("span", null, "问题", -1)),
          Te(u("textarea", {
            name: "question",
            "onUpdate:modelValue": X[0] || (X[0] = (Q) => a.value.question = Q),
            rows: "2",
            maxlength: "4000",
            placeholder: "例如：CHARACTOID 如何选择知识检索路径？"
          }, null, 512), [
            [Fe, a.value.question]
          ])
        ]),
        u("label", hI, [
          X[12] || (X[12] = u("span", null, [
            me("预期答案 "),
            u("em", null, "可选")
          ], -1)),
          Te(u("textarea", {
            name: "expected_answer",
            "onUpdate:modelValue": X[1] || (X[1] = (Q) => a.value.expectedAnswer = Q),
            rows: "3",
            maxlength: "8000",
            placeholder: "用于人工复核与后续答案对比"
          }, null, 512), [
            [Fe, a.value.expectedAnswer]
          ])
        ]),
        u("div", vI, [
          u("label", gI, [
            X[13] || (X[13] = u("span", null, [
              me("相关资料 ID "),
              u("em", null, "每行一个，也可用逗号分隔")
            ], -1)),
            Te(u("textarea", {
              "onUpdate:modelValue": X[2] || (X[2] = (Q) => a.value.documentIds = Q),
              rows: "2",
              placeholder: "上传资料列表中的 ID"
            }, null, 512), [
              [Fe, a.value.documentIds]
            ])
          ]),
          u("label", mI, [
            X[14] || (X[14] = u("span", null, [
              me("标签 "),
              u("em", null, "用逗号分隔")
            ], -1)),
            Te(u("input", {
              "onUpdate:modelValue": X[3] || (X[3] = (Q) => a.value.tags = Q),
              placeholder: "角色, RAG, 回归"
            }, null, 512), [
              [Fe, a.value.tags]
            ])
          ]),
          u("label", yI, [
            X[16] || (X[16] = u("span", null, "难度", -1)),
            Te(u("select", {
              "onUpdate:modelValue": X[4] || (X[4] = (Q) => a.value.difficulty = Q)
            }, X[15] || (X[15] = [
              u("option", { value: "easy" }, "简单", -1),
              u("option", { value: "medium" }, "中等", -1),
              u("option", { value: "hard" }, "困难", -1)
            ]), 512), [
              [vn, a.value.difficulty]
            ])
          ]),
          u("label", bI, [
            Te(u("input", {
              "onUpdate:modelValue": X[5] || (X[5] = (Q) => a.value.enabled = Q),
              type: "checkbox"
            }, null, 512), [
              [qd, a.value.enabled]
            ]),
            X[17] || (X[17] = u("span", null, "加入后续评测", -1))
          ])
        ]),
        u("div", _I, [
          u("button", {
            class: "yv-button",
            type: "button",
            disabled: s.value,
            onClick: N
          }, "取消", 8, wI),
          u("button", {
            class: "yv-button primary",
            type: "button",
            disabled: s.value || !a.value.question.trim(),
            onClick: y
          }, [
            ne(H(Jn), { size: 14 }),
            me(A(s.value ? "保存中" : "保存题目"), 1)
          ], 8, kI)
        ])
      ])) : oe("", !0),
      o.value && !n.value.length ? (E(), C("div", EI, "读取题集…")) : !n.value.length && !R.spaceId ? (E(), C("div", xI, "先选择一个角色")) : n.value.length ? (E(), C("div", CI, [
        (E(!0), C(_e, null, Re(n.value, (Q) => {
          var B;
          return E(), C("article", {
            key: Q.id,
            class: ge(["eval-dataset-row", { "is-disabled": Q.enabled === !1 }])
          }, [
            u("div", $I, [
              u("strong", null, A(Q.question), 1),
              Q.expected_answer ? (E(), C("p", II, A(Q.expected_answer), 1)) : oe("", !0),
              u("div", NI, [
                u("span", null, A(w(Q.difficulty)), 1),
                (B = Q.relevant_document_ids) != null && B.length ? (E(), C("span", TI, A(Q.relevant_document_ids.length) + " 份资料", 1)) : oe("", !0),
                (E(!0), C(_e, null, Re(Q.tags || [], (T) => (E(), C("span", {
                  key: T,
                  class: "eval-dataset-tag"
                }, A(T), 1))), 128)),
                Q.enabled === !1 ? (E(), C("span", MI, "已停用")) : oe("", !0)
              ])
            ]),
            u("div", OI, [
              u("button", {
                class: "icon-button",
                type: "button",
                title: "编辑",
                disabled: s.value,
                onClick: (T) => I(Q)
              }, [
                ne(H(Kd), { size: 15 })
              ], 8, PI),
              u("button", {
                class: "icon-button danger",
                type: "button",
                title: "删除",
                disabled: s.value,
                onClick: (T) => _(Q)
              }, [
                ne(H(gn), { size: 15 })
              ], 8, AI)
            ])
          ], 2);
        }), 128))
      ])) : (E(), C("div", SI, "还没有人工题目，先保存一条真实问题。"))
    ]));
  }
}), RI = { class: "eval-candidates" }, LI = { class: "eval-candidates-heading" }, VI = { key: 0 }, zI = ["disabled"], FI = {
  key: 0,
  class: "eval-candidates-error"
}, BI = {
  key: 1,
  class: "eval-candidates-empty"
}, HI = {
  key: 2,
  class: "eval-candidates-empty"
}, UI = {
  key: 3,
  class: "eval-candidates-empty"
}, jI = {
  key: 4,
  class: "eval-candidates-list"
}, GI = { class: "eval-candidate-head" }, qI = { class: "eval-candidate-source" }, YI = { class: "eval-candidate-signals" }, XI = { class: "eval-candidate-question" }, KI = { class: "eval-candidate-meta" }, WI = { class: "eval-candidate-editor" }, ZI = { class: "yv-field" }, JI = ["onUpdate:modelValue"], QI = { class: "eval-candidate-fields" }, eN = { class: "yv-field" }, tN = ["onUpdate:modelValue"], nN = { class: "yv-field" }, oN = ["onUpdate:modelValue"], sN = { class: "yv-field" }, iN = ["onUpdate:modelValue"], rN = { class: "yv-field" }, lN = ["onUpdate:modelValue"], aN = { class: "eval-candidate-actions" }, uN = ["disabled", "onClick"], cN = ["disabled", "onClick"], dN = /* @__PURE__ */ De({
  __name: "EvalCandidatePanel",
  props: {
    spaceId: {}
  },
  emits: ["accepted"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = ee([]), i = ee(0), r = ee(!1), l = ee(!1), a = ee(""), c = ee(""), d = Rn({}), f = ae(() => !!n.spaceId);
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
      return n.spaceId ? (r.value = !0, c.value = "", J$(n.spaceId).then((D) => {
        s.value = D.items || [], i.value = D.pending_total || s.value.length;
        for (const y of s.value) h(y);
      }).catch((D) => {
        c.value = Ze(D);
      }).finally(() => {
        r.value = !1;
      })) : (s.value = [], i.value = 0, Promise.resolve());
    }
    async function x() {
      if (n.spaceId) {
        l.value = !0, c.value = "";
        try {
          const D = await Q$(n.spaceId);
          s.value = D.items || [], i.value = s.value.length;
          for (const y of s.value) h(y);
        } catch (D) {
          c.value = Ze(D);
        } finally {
          l.value = !1;
        }
      }
    }
    async function I(D) {
      if (n.spaceId) {
        a.value = D.id, c.value = "";
        try {
          await tI(n.spaceId, D.id, h(D)), s.value = s.value.filter((y) => y.id !== D.id), i.value = Math.max(0, i.value - 1), o("accepted");
        } catch (y) {
          c.value = Ze(y);
        } finally {
          a.value = "";
        }
      }
    }
    async function N(D) {
      if (n.spaceId) {
        a.value = D.id, c.value = "";
        try {
          await nI(n.spaceId, D.id, d[D.id].note), s.value = s.value.filter((y) => y.id !== D.id), i.value = Math.max(0, i.value - 1);
        } catch (y) {
          c.value = Ze(y);
        } finally {
          a.value = "";
        }
      }
    }
    return Me(() => n.spaceId, w, { immediate: !0 }), (D, y) => (E(), C("section", RI, [
      u("header", LI, [
        u("div", null, [
          y[1] || (y[1] = u("span", { class: "yv-kicker" }, "Quality loop", -1)),
          u("h2", null, [
            y[0] || (y[0] = me("失败样本 ")),
            f.value ? (E(), C("small", VI, A(i.value) + " 条待确认", 1)) : oe("", !0)
          ]),
          y[2] || (y[2] = u("p", null, "把真实问答里的问题沉淀为人工题，确认后才会进入正式评测。", -1))
        ]),
        u("button", {
          class: "yv-button",
          type: "button",
          disabled: !f.value || l.value,
          onClick: x
        }, [
          ne(H(Dt), {
            size: 14,
            class: ge({ "is-spinning": l.value })
          }, null, 8, ["class"]),
          me(A(l.value ? "扫描中" : "扫描新样本"), 1)
        ], 8, zI)
      ]),
      c.value ? (E(), C("p", FI, A(c.value), 1)) : oe("", !0),
      f.value ? r.value && !s.value.length ? (E(), C("div", HI, "读取待确认样本…")) : s.value.length ? (E(), C("div", jI, [
        (E(!0), C(_e, null, Re(s.value, (_) => (E(), C("article", {
          key: _.id,
          class: "eval-candidate-row"
        }, [
          u("div", GI, [
            u("div", null, [
              u("span", qI, A(v(_)), 1),
              u("small", null, "查询 " + A(_.source_query_id.slice(0, 8)), 1)
            ]),
            u("div", YI, [
              (E(!0), C(_e, null, Re(_.signals, (R) => (E(), C("span", {
                key: R.code
              }, A(R.label), 1))), 128))
            ])
          ]),
          u("strong", XI, A(_.question), 1),
          u("div", KI, [
            u("span", null, "置信度 " + A(_.confidence.toFixed(2)), 1),
            u("span", null, A(_.grounded ? "已接地" : "未接地"), 1),
            u("span", null, A(_.useful ? "已解决" : "未解决"), 1)
          ]),
          u("div", WI, [
            u("label", ZI, [
              y[3] || (y[3] = u("span", null, [
                me("标准答案 "),
                u("em", null, "建议答案可直接修改")
              ], -1)),
              Te(u("textarea", {
                "onUpdate:modelValue": (R) => d[_.id].expectedAnswer = R,
                rows: "3"
              }, null, 8, JI), [
                [Fe, d[_.id].expectedAnswer]
              ])
            ]),
            u("div", QI, [
              u("label", eN, [
                y[4] || (y[4] = u("span", null, "关联资料 ID", -1)),
                Te(u("input", {
                  "onUpdate:modelValue": (R) => d[_.id].documentIds = R,
                  placeholder: "每行一个 DocumentJob ID"
                }, null, 8, tN), [
                  [Fe, d[_.id].documentIds]
                ])
              ]),
              u("label", nN, [
                y[5] || (y[5] = u("span", null, "标签", -1)),
                Te(u("input", {
                  "onUpdate:modelValue": (R) => d[_.id].tags = R,
                  placeholder: "例如：反馈回流, 边界问题"
                }, null, 8, oN), [
                  [Fe, d[_.id].tags]
                ])
              ]),
              u("label", sN, [
                y[7] || (y[7] = u("span", null, "难度", -1)),
                Te(u("select", {
                  "onUpdate:modelValue": (R) => d[_.id].difficulty = R
                }, y[6] || (y[6] = [
                  u("option", { value: "easy" }, "简单", -1),
                  u("option", { value: "medium" }, "中等", -1),
                  u("option", { value: "hard" }, "困难", -1)
                ]), 8, iN), [
                  [vn, d[_.id].difficulty]
                ])
              ])
            ]),
            u("label", rN, [
              y[8] || (y[8] = u("span", null, "复核备注", -1)),
              Te(u("input", {
                "onUpdate:modelValue": (R) => d[_.id].note = R,
                placeholder: "可选：记录为什么收录或忽略"
              }, null, 8, lN), [
                [Fe, d[_.id].note]
              ])
            ])
          ]),
          u("div", aN, [
            u("button", {
              class: "yv-button primary",
              type: "button",
              disabled: a.value === _.id,
              onClick: (R) => I(_)
            }, [
              ne(H(Jn), { size: 14 }),
              y[9] || (y[9] = me("收录为人工题"))
            ], 8, uN),
            u("button", {
              class: "yv-button",
              type: "button",
              disabled: a.value === _.id,
              onClick: (R) => N(_)
            }, [
              ne(H(Bt), { size: 14 }),
              y[10] || (y[10] = me("忽略"))
            ], 8, cN)
          ])
        ]))), 128))
      ])) : (E(), C("div", UI, "暂无待确认样本。点击“扫描新样本”读取低置信度、未接地或负反馈查询。")) : (E(), C("div", BI, "先选择一个角色。"))
    ]));
  }
}), fN = { class: "yv-page evaluation-page" }, pN = { class: "evaluation-hero" }, hN = { class: "evaluation-control" }, vN = { class: "control-fields" }, gN = { class: "yv-field" }, mN = ["value"], yN = { class: "yv-field" }, bN = { class: "yv-field" }, _N = { class: "control-actions" }, wN = ["disabled"], kN = ["disabled"], EN = ["href"], xN = { class: "run-status" }, SN = {
  key: 0,
  class: "results-stage"
}, CN = { class: "metric-lead" }, $N = { class: "metric-groups" }, IN = {
  key: 0,
  class: "analysis-block"
}, NN = { class: "case-section" }, TN = { class: "case-index" }, MN = {
  key: 1,
  class: "evaluation-empty"
}, ON = /* @__PURE__ */ De({
  __name: "App",
  setup(e) {
    const t = ee([]), n = ee(""), o = ee("fast"), s = ee("generated"), i = ae(() => t.value.find(($) => $.id === n.value)), r = ee({ state: "idle", progress: 0, total: 0 }), l = ee(null), a = ee(""), c = ee(""), d = ee(!1), f = ee(!1), h = ee(!1);
    let v = 0;
    const w = ae(() => ({ idle: "未运行", running: r.value.phase === "generating" ? "生成问题" : "评测中", done: "已完成", error: "失败" })[r.value.state] || r.value.state || "未运行"), x = ae(() => q$(Number(r.value.progress || 0), Number(r.value.total || 0))), I = ae(() => {
      var $;
      return (($ = l.value) == null ? void 0 : $.cases) || [];
    }), N = ae(() => h.value ? I.value : I.value.slice(0, 3)), D = ae(() => {
      var V;
      const $ = ((V = l.value) == null ? void 0 : V.metrics) || {};
      return [
        { label: "Top 3 召回率", value: Ds("recall_at_3_answerable", $.recall_at_3_answerable), tone: R("recall_at_3_answerable", $.recall_at_3_answerable) },
        { label: "回答接地率", value: Ds("grounded_rate", $.grounded_rate), tone: R("grounded_rate", $.grounded_rate) },
        { label: "质量通过率", value: Ds("accepted_rate", $.accepted_rate), tone: R("accepted_rate", $.accepted_rate) },
        { label: "P95 总延迟", value: $.p95_total_latency_ms == null ? "—" : `${Math.round(Number($.p95_total_latency_ms))} ms`, tone: "" }
      ];
    }), y = [
      { title: "检索质量", keys: ["recall_at_3_answerable", "precision_at_3_answerable", "mrr_at_3_answerable", "hit_at_3_answerable", "cases_answerable", "mean_latency_ms", "p95_latency_ms"] },
      { title: "回答质量", keys: ["grounded_rate", "useful_rate", "accepted_rate", "answer_rate", "refusal_rate", "cases_checked", "mean_confidence", "scope_isolation_ok"] },
      { title: "行为与性能", keys: ["rewrite_rate", "correction_rate", "mean_rewrite_count", "mean_correction_count", "complex_rewrite_rate", "complex_correction_rate", "probe_refusal_rate", "cases_total", "cases_complex", "mean_total_latency_ms", "p95_total_latency_ms"] }
    ], _ = { recall_at_3_answerable: "可答问题召回率 Recall@3", precision_at_3_answerable: "可答问题精确率 Precision@3", mrr_at_3_answerable: "可答问题 MRR@3", hit_at_3_answerable: "可答问题命中 Hit@3", cases_answerable: "可答用例数", mean_latency_ms: "平均检索延迟 (ms)", p95_latency_ms: "P95 检索延迟 (ms)", grounded_rate: "事实接地率", useful_rate: "问题解决率", accepted_rate: "质量通过率", answer_rate: "正常作答率", refusal_rate: "拒答率", cases_checked: "生成已检用例", mean_confidence: "平均置信度", scope_isolation_ok: "跨角色隔离校验", rewrite_rate: "查询改写触发率", correction_rate: "生成纠错触发率", mean_rewrite_count: "平均改写次数", mean_correction_count: "平均纠错次数", complex_rewrite_rate: "复杂题改写率", complex_correction_rate: "复杂题纠错率", probe_refusal_rate: "无关问题拒答率", cases_total: "用例总数", cases_complex: "复杂题数", mean_total_latency_ms: "平均整链路延迟 (ms)", p95_total_latency_ms: "P95 整链路延迟 (ms)" };
    function R($, V) {
      if ($ === "scope_isolation_ok") return V ? "good" : "bad";
      const M = Number(V);
      return !["recall_at_3_answerable", "precision_at_3_answerable", "mrr_at_3_answerable", "hit_at_3_answerable", "grounded_rate", "useful_rate", "accepted_rate", "answer_rate", "mean_confidence"].includes($) || !Number.isFinite(M) ? "" : M >= 0.8 ? "good" : M <= 0.2 ? "bad" : "";
    }
    function X() {
      return r.value.phase === "generating" ? r.value.status_text || "正在从角色资料生成问题" : r.value.total > 0 ? [`已完成 ${r.value.progress}/${r.value.total} 条`, r.value.current_question_text, r.value.current_step].filter(Boolean).join(" · ") : c.value || "等待开始";
    }
    async function Q() {
      try {
        t.value = await Ve("/api/personas"), !n.value && t.value.length && (n.value = t.value[0].id);
      } catch ($) {
        c.value = Ze($);
      }
    }
    async function B() {
      l.value = await Ve("/api/eval/results");
    }
    function T() {
      v += 1, d.value = !1;
    }
    async function L() {
      const $ = ++v;
      d.value = !0;
      for (let V = 0; V < 1200 && $ === v; V += 1) {
        try {
          if (r.value = await Ve("/api/eval/status"), r.value.state === "done") {
            await B(), d.value = !1;
            return;
          }
          if (r.value.state === "error") {
            c.value = r.value.error || "评测失败", d.value = !1;
            return;
          }
        } catch (M) {
          c.value = Ze(M), d.value = !1;
          return;
        }
        await new Promise((M) => setTimeout(M, 500));
      }
    }
    async function Y() {
      if (!n.value) {
        c.value = "请先选择评测角色";
        return;
      }
      c.value = "", l.value = null, a.value = "", h.value = !1;
      try {
        await Ve("/api/eval/run", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Y$({ personaId: n.value, tier: o.value, datasetMode: s.value })) }), await L();
      } catch ($) {
        c.value = Ze($), d.value = !1;
      }
    }
    async function U() {
      f.value = !0;
      try {
        const $ = await Ve("/api/eval/analyze", { method: "POST" });
        a.value = $.analysis || "分析结果为空";
      } catch ($) {
        c.value = Ze($);
      } finally {
        f.value = !1;
      }
    }
    async function G() {
      await Q();
      try {
        r.value = await Ve("/api/eval/status"), r.value.state === "running" ? L() : r.value.state === "done" && await B();
      } catch {
      }
    }
    return ht(() => {
      const $ = document.querySelector("#evaluation-app-root");
      $ == null || $.addEventListener("charactoid:evaluation-show", G), $ == null || $.addEventListener("charactoid:evaluation-hide", T), G();
    }), _n(T), ($, V) => {
      var M, F;
      return E(), C("main", fN, [
        u("header", pN, [
          V[4] || (V[4] = u("div", null, [
            u("span", { class: "yv-kicker" }, "Retrieval quality lab"),
            u("h1", null, "RAG 评测"),
            u("p", null, "用可复现指标检查召回、回答接地与整链路延迟。")
          ], -1)),
          u("span", {
            class: ge(["yv-status", r.value.state === "done" ? "ok" : r.value.state === "error" ? "error" : d.value ? "warn" : ""])
          }, A(w.value), 3)
        ]),
        u("section", hN, [
          u("div", vN, [
            u("label", gN, [
              V[6] || (V[6] = u("span", null, "评测角色", -1)),
              Te(u("select", {
                "onUpdate:modelValue": V[0] || (V[0] = (q) => n.value = q)
              }, [
                V[5] || (V[5] = u("option", { value: "" }, "请选择角色", -1)),
                (E(!0), C(_e, null, Re(t.value, (q) => (E(), C("option", {
                  key: q.id,
                  value: q.id
                }, A(q.name), 9, mN))), 128))
              ], 512), [
                [vn, n.value]
              ])
            ]),
            u("label", yN, [
              V[8] || (V[8] = u("span", null, "问题规模", -1)),
              Te(u("select", {
                "onUpdate:modelValue": V[1] || (V[1] = (q) => o.value = q)
              }, V[7] || (V[7] = [
                u("option", { value: "fast" }, "轻量 · 5 个问题", -1),
                u("option", { value: "standard" }, "标准 · 10 个问题", -1),
                u("option", { value: "thorough" }, "全面 · 15 个问题", -1)
              ]), 512), [
                [vn, o.value]
              ])
            ]),
            u("label", bN, [
              V[10] || (V[10] = u("span", null, "题目来源", -1)),
              Te(u("select", {
                "onUpdate:modelValue": V[2] || (V[2] = (q) => s.value = q)
              }, V[9] || (V[9] = [
                u("option", { value: "generated" }, "自动生成", -1),
                u("option", { value: "manual" }, "人工题集", -1),
                u("option", { value: "combined" }, "人工 + 自动", -1)
              ]), 512), [
                [vn, s.value]
              ])
            ])
          ]),
          u("div", _N, [
            u("button", {
              class: "yv-button primary",
              disabled: d.value,
              onClick: Y
            }, [
              ne(H(Wd)),
              me(A(d.value ? "评测进行中" : "生成并评测"), 1)
            ], 8, wN),
            u("button", {
              class: "yv-button",
              disabled: !l.value || f.value,
              onClick: U
            }, [
              ne(H(_g)),
              me(A(f.value ? "分析中" : "AI 分析"), 1)
            ], 8, kN),
            u("a", {
              class: ge(["yv-button", { disabled: !l.value }]),
              href: l.value ? "/api/eval/export" : void 0
            }, [
              ne(H(po)),
              V[11] || (V[11] = me("导出 JSON"))
            ], 10, EN)
          ])
        ]),
        ne(dN, {
          "space-id": (M = i.value) == null ? void 0 : M.knowledge_space_id
        }, null, 8, ["space-id"]),
        ne(DI, {
          "space-id": (F = i.value) == null ? void 0 : F.knowledge_space_id
        }, null, 8, ["space-id"]),
        u("section", xN, [
          u("div", null, [
            u("strong", null, A(w.value), 1),
            u("p", {
              class: ge({ error: c.value })
            }, A(c.value || X()), 3)
          ]),
          u("div", {
            class: ge(["progress-track", { indeterminate: d.value && r.value.phase === "generating" }])
          }, [
            u("span", {
              style: Ye({ width: `${x.value}%` })
            }, null, 4)
          ], 2)
        ]),
        l.value ? (E(), C("section", SN, [
          u("div", CN, [
            (E(!0), C(_e, null, Re(D.value, (q) => (E(), C("article", {
              key: q.label,
              class: ge(q.tone)
            }, [
              u("span", null, A(q.label), 1),
              u("strong", null, A(q.value), 1)
            ], 2))), 128))
          ]),
          u("div", $N, [
            (E(), C(_e, null, Re(y, (q) => u("section", {
              key: q.title
            }, [
              u("h2", null, A(q.title), 1),
              u("div", null, [
                (E(!0), C(_e, null, Re(q.keys.filter((te) => {
                  var ce, fe;
                  return ((ce = l.value.metrics) == null ? void 0 : ce[te]) !== void 0 && ((fe = l.value.metrics) == null ? void 0 : fe[te]) !== null;
                }), (te) => (E(), C("article", { key: te }, [
                  u("span", null, A(_[te] || te), 1),
                  u("strong", {
                    class: ge(R(te, l.value.metrics[te]))
                  }, A(H(Ds)(te, l.value.metrics[te])), 3)
                ]))), 128))
              ])
            ])), 64))
          ]),
          a.value ? (E(), C("section", IN, [
            V[12] || (V[12] = u("span", { class: "yv-kicker" }, "AI review", -1)),
            V[13] || (V[13] = u("h2", null, "结果解读", -1)),
            u("p", null, A(a.value), 1)
          ])) : oe("", !0),
          u("section", NN, [
            u("header", null, [
              V[14] || (V[14] = u("div", null, [
                u("span", { class: "yv-kicker" }, "Case evidence"),
                u("h2", null, "逐条详情")
              ], -1)),
              I.value.length > 3 ? (E(), C("button", {
                key: 0,
                class: "yv-button",
                onClick: V[3] || (V[3] = (q) => h.value = !h.value)
              }, A(h.value ? "收起" : `展开全部 ${I.value.length} 条`), 1)) : oe("", !0)
            ]),
            (E(!0), C(_e, null, Re(N.value, (q, te) => (E(), C("article", {
              key: te,
              class: "case-row"
            }, [
              u("div", TN, A(String(te + 1).padStart(2, "0")), 1),
              u("div", null, [
                u("strong", null, A(q.question), 1),
                u("p", null, A((q.answer || "").slice(0, 240)), 1),
                u("small", null, A([q.grounded == null ? "grounded=—" : `grounded=${q.grounded}`, q.useful == null ? "useful=—" : `useful=${q.useful}`, `confidence=${q.confidence ?? "—"}`, q.rewrite_used ? "查询改写" : "", q.corrected ? "生成纠错" : "", q.is_probe ? "无关探针" : ""].filter(Boolean).join(" · ")), 1)
              ]),
              u("span", {
                class: ge(["yv-status", q.accepted || q.is_probe && q.refused ? "ok" : "error"])
              }, A(q.accepted || q.is_probe && q.refused ? "符合预期" : "未通过"), 3)
            ]))), 128))
          ])
        ])) : (E(), C("section", MN, [
          ne(H(ug)),
          V[15] || (V[15] = u("h2", null, "等待一轮可比较的结果", -1)),
          V[16] || (V[16] = u("p", null, "选择角色和问题规模后开始。评测会覆盖知识召回、复杂问题与无关问题拒答。", -1))
        ]))
      ]);
    };
  }
});
let Mn = null;
const Dp = () => document.querySelector("#evaluation-app-root");
function cM(e = "#evaluation-app-root") {
  if (Mn) return Mn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("RAG 评测挂载点不存在");
  return Mn = gs(ON), Mn.mount(t), Mn;
}
function dM() {
  var e;
  (e = Dp()) == null || e.dispatchEvent(new CustomEvent("charactoid:evaluation-show"));
}
function fM() {
  var e;
  (e = Dp()) == null || e.dispatchEvent(new CustomEvent("charactoid:evaluation-hide"));
}
function pM() {
  Mn && (Mn.unmount(), Mn = null);
}
async function _s(e, t) {
  const n = await fetch(e, t), o = await n.json().catch(() => null);
  if (!n.ok) throw new Error((o == null ? void 0 : o.detail) || `请求失败 (${n.status})`);
  return o;
}
function PN() {
  return _s("/api/reranker/status", { cache: "no-store" });
}
function AN(e) {
  return _s("/api/reranker/install", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
    body: JSON.stringify({ model_id: "Qwen/Qwen3-Reranker-0.6B", source: "modelscope", device: e })
  });
}
function DN() {
  return _s("/api/reranker/install/cancel", { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } });
}
function RN() {
  return _s("/api/reranker/model", { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } });
}
function LN() {
  return _s("/api/reranker/model-directory", { method: "POST", headers: { "X-CHARACTOID-Request": "web" } });
}
const VN = { class: "settings-summary" }, zN = { class: "section-toggle-label" }, FN = { class: "asr-resource-bar" }, BN = {
  key: 0,
  max: "100"
}, HN = {
  key: 1,
  class: "inline-status"
}, UN = { class: "asr-actions" }, jN = ["disabled"], GN = ["disabled"], qN = ["disabled"], YN = ["disabled"], XN = { class: "settings-grid one-column reranker-settings-grid" }, KN = { class: "field provider-field" }, WN = ["disabled"], ZN = /* @__PURE__ */ De({
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
        t.value = await PN(), n.value = t.value.device || n.value, s.value = t.value.error || "";
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
          await LN();
        } catch (v) {
          s.value = v instanceof Error ? v.message : "无法打开模型目录";
        } finally {
          o.value = !1;
        }
      }
    }
    return ht(() => {
      d(), r = window.setInterval(() => {
        var v;
        (v = t.value) != null && v.installing && d();
      }, 1500);
    }), _n(() => {
      r && window.clearInterval(r);
    }), (v, w) => {
      var x, I, N, D, y, _, R;
      return E(), C("details", {
        class: "panel settings-section",
        "data-collapsible": "",
        onToggle: w[4] || (w[4] = (X) => i.value = X.currentTarget.open)
      }, [
        u("summary", VN, [
          w[5] || (w[5] = u("span", { class: "settings-summary-title" }, [
            u("strong", null, "Reranker 精排"),
            u("span", { class: "settings-summary-meta" }, "候选重排序 · 本地模型 · RRF 自动降级")
          ], -1)),
          u("span", zN, A(i.value ? "收起" : "展开"), 1)
        ]),
        w[9] || (w[9] = u("p", { class: "settings-help" }, [
          me("使用本地模型 "),
          u("code", null, "Qwen3-Reranker-0.6B"),
          me(" 对召回候选精排；模型未安装或暂不可用时，系统自动保留 RRF 融合结果。")
        ], -1)),
        u("div", FN, [
          u("div", null, [
            u("strong", null, A(l.value), 1),
            u("p", {
              class: ge(["inline-status", { "is-error": !!s.value }]),
              role: "status",
              "aria-live": "polite"
            }, A(a.value), 3),
            (x = t.value) != null && x.installing ? (E(), C("progress", BN)) : oe("", !0),
            c.value ? (E(), C("p", HN, A(c.value), 1)) : oe("", !0)
          ]),
          u("div", UN, [
            u("button", {
              class: "button button-secondary",
              type: "button",
              disabled: o.value,
              onClick: h
            }, [
              ne(H(Ko), { size: 16 }),
              w[6] || (w[6] = me("打开目录"))
            ], 8, jN),
            u("button", {
              class: "button button-danger",
              type: "button",
              disabled: o.value || !((I = t.value) != null && I.installed) || ((N = t.value) == null ? void 0 : N.installing),
              onClick: w[0] || (w[0] = (X) => f(H(RN)))
            }, "删除", 8, GN),
            (D = t.value) != null && D.installing ? (E(), C("button", {
              key: 0,
              class: "button button-secondary",
              type: "button",
              disabled: o.value || t.value.cancelling,
              onClick: w[1] || (w[1] = (X) => f(H(DN)))
            }, "取消下载", 8, qN)) : (E(), C("button", {
              key: 1,
              class: "button button-primary",
              type: "button",
              disabled: o.value || ((y = t.value) == null ? void 0 : y.installed),
              onClick: w[2] || (w[2] = (X) => f(() => H(AN)(n.value)))
            }, "安装", 8, YN))
          ])
        ]),
        u("div", XN, [
          u("label", KN, [
            w[8] || (w[8] = u("span", null, "运行设备", -1)),
            Te(u("select", {
              "onUpdate:modelValue": w[3] || (w[3] = (X) => n.value = X),
              disabled: o.value || ((_ = t.value) == null ? void 0 : _.installing) || ((R = t.value) == null ? void 0 : R.installed)
            }, w[7] || (w[7] = [
              u("option", { value: "auto" }, "自动（GPU 优先）", -1),
              u("option", { value: "cuda" }, "仅 GPU", -1),
              u("option", { value: "cpu" }, "仅 CPU", -1)
            ]), 8, WN), [
              [vn, n.value]
            ])
          ])
        ]),
        w[10] || (w[10] = u("details", { class: "settings-help" }, [
          u("summary", null, "参数说明"),
          u("p", null, [
            me("模型固定为 "),
            u("code", null, "Qwen/Qwen3-Reranker-0.6B"),
            me("，从 ModelScope 下载。设备选择在安装时保存；需要更换设备时，删除后重新安装。")
          ])
        ], -1))
      ], 32);
    };
  }
}), JN = /* @__PURE__ */ Pl(ZN, [["__scopeId", "data-v-bf7b6366"]]), QN = { class: "providers-settings" }, e3 = {
  class: "provider-tabs",
  role: "tablist",
  "aria-label": "供应商类型"
}, t3 = ["aria-selected", "onClick"], n3 = {
  key: 0,
  class: "download-center",
  "aria-label": "资源下载中心"
}, o3 = ["aria-expanded"], s3 = { class: "download-summary-icon" }, i3 = { class: "download-summary-copy" }, r3 = {
  key: 1,
  class: "local-production-zone audio-workbench",
  "aria-labelledby": "local-production-title"
}, l3 = {
  class: "audio-section",
  "aria-labelledby": "audio-common-title"
}, a3 = { class: "production-grid audio-grid audio-grid-2" }, u3 = {
  key: 0,
  class: "production-card"
}, c3 = { class: "production-card-head" }, d3 = {
  key: 0,
  class: "install-progress"
}, f3 = { class: "install-progress-head" }, p3 = { class: "production-actions" }, h3 = ["disabled"], v3 = { class: "production-card production-card-ffmpeg" }, g3 = { class: "production-card-head" }, m3 = { class: "production-facts" }, y3 = {
  key: 0,
  class: "install-progress"
}, b3 = { class: "install-progress-head" }, _3 = {
  key: 1,
  class: "config-hint"
}, w3 = { class: "production-actions" }, k3 = ["disabled"], E3 = {
  class: "audio-section",
  "aria-labelledby": "audio-voice-title"
}, x3 = { class: "production-grid audio-grid audio-grid-2" }, S3 = {
  key: 0,
  class: "production-card production-card-gsv"
}, C3 = { class: "production-card-head" }, $3 = { class: "production-facts" }, I3 = {
  key: 0,
  class: "install-progress"
}, N3 = { class: "install-progress-head" }, T3 = { class: "production-actions" }, M3 = ["disabled"], O3 = {
  key: 1,
  class: "production-card production-card-rvc"
}, P3 = { class: "production-card-head" }, A3 = {
  key: 0,
  class: "install-progress"
}, D3 = { class: "install-progress-head" }, R3 = { class: "production-actions" }, L3 = {
  class: "audio-section",
  "aria-labelledby": "audio-stt-title"
}, V3 = { class: "production-grid audio-grid audio-grid-1" }, z3 = {
  key: 0,
  class: "production-card production-card-stt"
}, F3 = { class: "production-card-head" }, B3 = { class: "production-facts" }, H3 = {
  key: 0,
  class: "install-progress"
}, U3 = { class: "install-progress-head" }, j3 = { class: "production-actions" }, G3 = ["disabled"], q3 = {
  key: 2,
  class: "providers-main"
}, Y3 = {
  key: 0,
  class: "loading-state"
}, X3 = {
  key: 1,
  class: "error-state"
}, K3 = {
  key: 2,
  class: "empty-state"
}, W3 = ["onClick", "onKeydown"], Z3 = { class: "provider-header" }, J3 = { class: "provider-title" }, Q3 = {
  key: 0,
  class: "mode-badge"
}, eT = {
  key: 1,
  class: "mode-badge api"
}, tT = ["aria-checked", "aria-label", "onClick", "disabled"], nT = {
  key: 1,
  class: "active-label"
}, oT = { class: "provider-description" }, sT = {
  key: 0,
  class: "provider-meta resource-meta"
}, iT = { class: "install-progress-head" }, rT = { class: "download-task-meta" }, lT = { key: 0 }, aT = { key: 1 }, uT = { key: 2 }, cT = {
  key: 3,
  class: "task-error"
}, dT = {
  key: 2,
  class: "provider-meta"
}, fT = {
  key: 3,
  class: "provider-meta"
}, pT = {
  key: 0,
  class: "meta-url"
}, hT = { class: "provider-actions" }, vT = ["onClick"], gT = ["onClick", "disabled"], mT = {
  class: "config-drawer download-drawer provider-config-drawer",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "资源下载任务"
}, yT = { class: "drawer-header" }, bT = { class: "drawer-header-actions" }, _T = { class: "drawer-body download-list" }, wT = {
  key: 0,
  class: "empty-state"
}, kT = {
  key: 1,
  class: "empty-state"
}, ET = { class: "download-task-head" }, xT = { class: "download-task-meta" }, ST = { key: 0 }, CT = { key: 1 }, $T = { key: 2 }, IT = {
  key: 3,
  class: "task-error"
}, NT = {
  key: 0,
  class: "download-task-actions"
}, TT = ["onClick"], MT = {
  key: 1,
  class: "download-task-actions"
}, OT = ["onClick"], PT = {
  class: "config-drawer rvc-workspace-drawer provider-config-drawer",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "RVC 音频生产资源管理"
}, AT = { class: "drawer-header" }, DT = { class: "drawer-body rvc-workspace-body" }, RT = { class: "rvc-workspace-summary" }, LT = {
  class: "rvc-component-list",
  "aria-label": "RVC 资源状态"
}, VT = { class: "rvc-component-icon" }, zT = { key: 1 }, FT = { class: "rvc-component-copy" }, BT = { class: "rvc-install-block" }, HT = { class: "production-actions" }, UT = ["disabled"], jT = ["disabled"], GT = ["disabled"], qT = ["disabled"], YT = {
  key: 0,
  class: "config-error"
}, XT = {
  key: 1,
  class: "config-error"
}, KT = {
  class: "config-drawer provider-config-drawer",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "FFmpeg 资源管理"
}, WT = { class: "drawer-header" }, ZT = { class: "drawer-body" }, JT = { class: "drawer-status" }, QT = { class: "resource-config-readonly" }, e5 = { class: "production-facts" }, t5 = {
  key: 0,
  class: "install-progress"
}, n5 = { class: "install-progress-head" }, o5 = { class: "resource-control-actions" }, s5 = ["disabled"], i5 = ["disabled"], r5 = ["disabled"], l5 = ["disabled"], a5 = {
  key: 1,
  class: "config-error"
}, u5 = ["aria-label"], c5 = { class: "drawer-header" }, d5 = { class: "drawer-body" }, f5 = { class: "drawer-status" }, p5 = {
  key: 0,
  class: "field"
}, h5 = {
  key: 1,
  class: "field"
}, v5 = {
  key: 2,
  class: "resource-config-readonly"
}, g5 = {
  key: 0,
  class: "field"
}, m5 = { class: "field" }, y5 = ["placeholder"], b5 = { class: "field" }, _5 = ["placeholder"], w5 = { class: "resource-config-intro" }, k5 = {
  key: 0,
  class: "config-hint"
}, E5 = { class: "field" }, x5 = ["placeholder"], S5 = { class: "form-row" }, C5 = { class: "field" }, $5 = { class: "field" }, I5 = {
  key: 1,
  class: "resource-install-form"
}, N5 = {
  key: 2,
  class: "resource-config-readonly"
}, T5 = {
  key: 3,
  class: "resource-config-readonly"
}, M5 = { class: "resource-controls" }, O5 = {
  key: 0,
  class: "install-progress"
}, P5 = { class: "install-progress-head" }, A5 = { class: "download-task-meta" }, D5 = { key: 0 }, R5 = { key: 1 }, L5 = { key: 2 }, V5 = {
  key: 3,
  class: "task-error"
}, z5 = { class: "resource-control-actions" }, F5 = ["disabled"], B5 = ["disabled"], H5 = ["disabled"], U5 = ["disabled"], j5 = ["disabled"], G5 = ["disabled"], q5 = {
  key: 3,
  class: "config-hint"
}, Y5 = { class: "modal-actions" }, X5 = ["disabled"], K5 = {
  key: 4,
  class: "config-success"
}, W5 = {
  key: 6,
  class: "config-error"
}, gr = "https://huggingface.co/lj1995/GPT-SoVITS-windows-package/resolve/main/GPT-SoVITS-v3lora-20250228.7z?download=true", Z5 = /* @__PURE__ */ De({
  __name: "ProvidersApp",
  setup(e) {
    const t = ee([]), n = ee("llm"), o = ee(!1), s = ee(""), i = ee(null), r = ee(null), l = ee(null), a = ee(""), c = ee(""), d = ee({}), f = ee(gr), h = ee([]), v = ee(!1), w = ee(!1), x = ee(!1), I = ee(!1), N = ee(""), D = /* @__PURE__ */ new Set(), y = ee(!1);
    let _;
    const R = ee({
      provider_type: "",
      provider_id: "",
      api_key: "",
      base_url: "",
      model: "",
      source: "modelscope",
      device: "auto",
      enabled: !1
    }), X = [
      { id: "llm", label: "对话模型(LLM)", count: 0 },
      { id: "embedding", label: "知识库向量化(Embedding)", count: 0 },
      { id: "reranker", label: "检索重排(Rerank)", count: 0 },
      { id: "stt", label: "语音识别(STT)", count: 0 },
      { id: "tts", label: "对话语音(TTS)", count: 0 },
      { id: "web_search", label: "联网搜索(Web)", count: 0 },
      { id: "audio", label: "音频(Audio)", count: 0 }
    ], Q = ae(() => t.value.filter((z) => z.type === n.value)), B = ae(() => t.value.find((z) => z.id === "rvc")), T = ae(() => t.value.find((z) => z.id === "separator")), L = ae(() => t.value.find((z) => z.id === "local_stt")), Y = ae(() => t.value.find((z) => z.id === "gsv_tts_local")), U = ee({}), G = ae(() => t.value.find((z) => z.id === i.value)), $ = ae(() => !!(i.value || v.value || w.value || x.value));
    Me($, (z) => {
      document.body.classList.toggle("provider-modal-open", z), document.documentElement.classList.toggle("provider-modal-open", z);
    }), Me(n, (z) => {
      z === "audio" && ke("detect");
    });
    const V = ae(() => {
      var b;
      const z = (b = G.value) == null ? void 0 : b.id;
      return z === "local_embedding" ? "embedding" : z === "local_rerank" ? "reranker" : z === "local_stt" ? "stt" : z === "gsv_tts_local" ? "gpt_sovits" : z === "separator" ? "separator" : "none";
    });
    function M() {
      switch (V.value) {
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
    const F = {
      local_embedding: { status: "/api/embedding/status", install: "/api/embedding/install", cancel: "/api/embedding/install/cancel", remove: "/api/embedding/model", directory: "/api/embedding/model-directory" },
      local_rerank: { status: "/api/reranker/status", install: "/api/reranker/install", cancel: "/api/reranker/install/cancel", remove: "/api/reranker/model", directory: "/api/reranker/model-directory" },
      local_stt: { status: "/api/stt/status", install: "/api/stt/install", cancel: "/api/stt/install/cancel", remove: "/api/stt/install", directory: "/api/stt/model-directory" },
      gsv_tts_local: { status: "/api/gpt-sovits/status", install: "/api/gpt-sovits/install", cancel: "/api/gpt-sovits/install/cancel", remove: "/api/gpt-sovits/install", directory: "/api/gpt-sovits/model-directory", start: "/api/gpt-sovits/service/start", stop: "/api/gpt-sovits/service/stop" },
      // RVC 是音色转换资源，不计入 TTS 供应商数量；后端未实现时由抽屉显示可读错误。
      rvc: { status: "/api/providers/rvc/status", install: "/api/providers/rvc/install", cancel: "/api/providers/rvc/install/cancel", remove: "/api/providers/rvc/install", directory: "/api/providers/rvc/directory" },
      separator: { status: "/api/providers/resources/separator", install: "/api/providers/resources/separator/install", cancel: "/api/providers/resources/tasks", remove: "/api/providers/resources/separator", directory: "/api/providers/resources/separator" }
    };
    function q(z) {
      return ["queued", "preparing", "downloading", "verifying", "installing", "running"].includes(z.status);
    }
    const te = ae(() => h.value.filter(q)), ce = ae(() => h.value.filter((z) => !q(z)).length);
    function fe(z) {
      if (!z || z < 1024) return `${z || 0} B`;
      const b = ["KB", "MB", "GB", "TB"];
      let ve = z, Oe = -1;
      do
        ve /= 1024, Oe++;
      while (ve >= 1024 && Oe < b.length - 1);
      return `${ve.toFixed(ve >= 100 ? 0 : ve >= 10 ? 1 : 2)} ${b[Oe]}`;
    }
    function le(z) {
      return z == null || z < 0 ? "—" : z < 60 ? `${Math.round(z)} 秒` : `${Math.floor(z / 60)} 分 ${Math.round(z % 60)} 秒`;
    }
    function he(z) {
      return { queued: "排队中", preparing: "准备中", downloading: "下载中", verifying: "校验中", installing: "安装中", ready: "已完成", failed: "失败", cancelled: "已取消", running: "运行中", interrupted: "已中断" }[z.status] || z.status;
    }
    function pe(z) {
      const b = {
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
        running: "运行中"
      };
      return z ? b[z] || z : "";
    }
    async function be() {
      y.value = !0;
      try {
        const z = await fetch("/api/resources/tasks?limit=30", { headers: { "X-CHARACTOID-Request": "web" }, cache: "no-store" });
        if (!z.ok) return;
        const b = await z.json(), ve = Array.isArray(b) ? b : b.tasks || b.items || [];
        h.value = ve.map((Oe) => ({
          ...Oe,
          progress_percent: Oe.progress_percent ?? (typeof Oe.progress == "number" ? Oe.progress : null),
          error_message: Oe.error_message ?? Oe.error,
          current_file: Oe.current_file ?? Oe.detail
        }));
      } catch {
      } finally {
        y.value = !1;
      }
    }
    async function se(z) {
      try {
        await fetch(`/api/resources/tasks/${encodeURIComponent(z.task_id)}`, { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } }), await be();
      } catch (b) {
        s.value = b instanceof Error ? b.message : "取消下载失败";
      }
    }
    async function xe() {
      try {
        const z = await fetch("/api/resources/tasks?finished=true", { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } });
        if (!z.ok) {
          const b = await z.json().catch(() => ({}));
          throw new Error(b.detail || `HTTP ${z.status}`);
        }
        await be();
      } catch (z) {
        s.value = z instanceof Error ? z.message : "清理下载记录失败";
      }
    }
    async function $e(z) {
      try {
        const b = await fetch(`/api/resources/tasks/${encodeURIComponent(z.task_id)}/retry`, { method: "POST", headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" } });
        if (!b.ok) {
          const ve = await b.json().catch(() => ({}));
          throw new Error(ve.detail || `HTTP ${b.status}`);
        }
        await be();
      } catch (b) {
        s.value = b instanceof Error ? b.message : "重试下载失败";
      }
    }
    async function Ee() {
      try {
        const z = await fetch("/api/providers/resources/ffmpeg/status", { headers: { "X-CHARACTOID-Request": "web" }, cache: "no-store" });
        z.ok && (U.value = await z.json());
      } catch {
      }
    }
    async function ke(z) {
      const b = { install: "/api/providers/resources/ffmpeg/install", remove: "/api/providers/resources/ffmpeg", directory: "/api/providers/resources/ffmpeg/directory", detect: "/api/providers/resources/ffmpeg/detect" };
      l.value = `ffmpeg:${z}`, s.value = "", z === "detect" && (I.value = !0);
      try {
        const ve = await fetch(b[z], { method: z === "remove" ? "DELETE" : z === "directory" ? "GET" : "POST", headers: { "X-CHARACTOID-Request": "web" } });
        if (!ve.ok) {
          const Oe = await ve.json().catch(() => ({}));
          throw new Error(Oe.detail || `HTTP ${ve.status}`);
        }
        U.value = await ve.json(), N.value = String(U.value.detection_note || "");
      } catch (ve) {
        s.value = ve instanceof Error ? ve.message : "FFmpeg 操作失败";
      } finally {
        l.value = null, z === "detect" && (I.value = !1);
      }
    }
    async function K(z) {
      const b = !!(z && typeof z == "object" && "quiet" in z && z.quiet);
      b || (o.value = !0, s.value = "");
      try {
        const ve = await fetch("/api/providers/list", { cache: "no-store" });
        if (!ve.ok) throw new Error(`HTTP ${ve.status}`);
        const Oe = await ve.json();
        t.value = Oe.providers || [], await Ee(), X.forEach((Je) => {
          Je.count = t.value.filter((Mt) => Mt.type === Je.id).length;
        });
      } catch (ve) {
        b || (s.value = ve instanceof Error ? ve.message : "加载失败");
      } finally {
        b || (o.value = !1);
      }
    }
    function p() {
      i.value = null, v.value = !1, w.value = !1, x.value = !1;
    }
    function O() {
      p(), v.value = !0;
    }
    function g() {
      p(), x.value = !0, N.value = "", ke("detect");
    }
    function m(z) {
      if (p(), z.id === "rvc") {
        w.value = !0, K();
        return;
      }
      i.value = z.id, a.value = "", c.value = "", s.value = "";
      const b = z.resource_status || {};
      let ve = z.current_model || "";
      (z.id === "local_embedding" || z.id === "local_rerank") && !String(ve).includes("/") ? ve = String(b.model_id || z.default_model || "") : ve || (ve = String(b.model_id || z.default_model || "")), R.value = {
        provider_type: z.type,
        provider_id: z.id,
        api_key: z.current_api_key || "",
        base_url: z.current_base_url || z.default_base_url,
        model: ve,
        source: String(b.source || "modelscope"),
        device: String(b.device || "auto"),
        enabled: z.is_active
      }, f.value = gr;
    }
    function k() {
      w.value = !1, s.value = "";
    }
    function S(z) {
      var ve, Oe;
      const b = (Oe = (ve = B.value) == null ? void 0 : ve.resource_status) == null ? void 0 : Oe.components;
      return (b == null ? void 0 : b[z]) || {};
    }
    function j(z) {
      return !!S(z).ready;
    }
    function W(z) {
      return j(z) ? "已就绪" : z === "indices" ? "可选" : "待准备";
    }
    function Z() {
      var b, ve;
      const z = ut(Ue(B.value));
      return z ?? It((ve = (b = B.value) == null ? void 0 : b.resource_status) == null ? void 0 : ve.progress_percent);
    }
    function P() {
      i.value = null, a.value = "", c.value = "", f.value = "", R.value = { provider_type: "", provider_id: "", api_key: "", base_url: "", model: "", source: "modelscope", device: "auto", enabled: !1 }, f.value = gr;
    }
    async function re() {
      if (R.value.provider_id) {
        R.value.enabled = !0, o.value = !0, s.value = "", a.value = "";
        try {
          const z = await fetch("/api/providers/configure", {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
            body: JSON.stringify(ue())
          });
          if (!z.ok) {
            const ve = await z.json().catch(() => ({}));
            throw new Error(ve.detail || `HTTP ${z.status}`);
          }
          const b = await z.json();
          a.value = b.message || "配置已保存", await K();
        } catch (z) {
          s.value = z instanceof Error ? z.message : "配置失败";
        } finally {
          o.value = !1;
        }
      }
    }
    function ie() {
      switch (V.value) {
        case "embedding":
        case "reranker":
          return { model_id: R.value.model, source: R.value.source || "modelscope", device: R.value.device || "auto" };
        case "gpt_sovits":
          return { url: f.value.trim() };
        default:
          return {};
      }
    }
    function ue() {
      var b;
      const z = { ...R.value };
      return ((b = G.value) == null ? void 0 : b.mode) === "local" && (["embedding", "reranker"].includes(V.value) || (delete z.model, delete z.source, delete z.device), delete z.api_key, delete z.base_url), z;
    }
    async function de(z, b) {
      if (!z) return;
      const ve = F[z.id], Oe = ve == null ? void 0 : ve[b];
      if (Oe) {
        l.value = `${z.id}:${b}`, s.value = "";
        try {
          const Je = b === "remove" || b === "cancel" ? "DELETE" : b === "directory" && z.id === "rvc" ? "GET" : b === "install" || b === "directory" || b === "start" || b === "stop" ? "POST" : "GET";
          let Mt;
          b === "install" && (Mt = z.id === "gsv_tts_local" ? JSON.stringify({ url: f.value.trim() }) : z.id === "local_stt" ? void 0 : JSON.stringify(ie()));
          let mt;
          if (b === "install" && z.mode === "local") {
            const Hn = `/api/resources/${encodeURIComponent(z.id)}/install`;
            mt = await fetch(Hn, { method: "POST", headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body: JSON.stringify({ parameters: z.id === "gsv_tts_local" ? { url: f.value.trim() } : ie() }) }), (mt.status === 404 || mt.status === 405) && (mt = await fetch(Oe, { method: Je, headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body: Mt }));
          } else
            mt = await fetch(Oe, { method: Je, headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body: Mt });
          if (!mt.ok) {
            const Hn = await mt.json().catch(() => ({}));
            throw new Error(Hn.detail || `HTTP ${mt.status}`);
          }
          b === "install" && ["local_stt", "gsv_tts_local", "local_embedding", "local_rerank"].includes(z.id) && D.add(z.id), await K(), await be(), await Ll();
        } catch (Je) {
          s.value = Je instanceof Error ? Je.message : "资源操作失败";
        } finally {
          l.value = null;
        }
      }
    }
    async function Ce(z) {
      var b, ve;
      o.value = !0, s.value = "";
      try {
        const Oe = await fetch("/api/providers/configure", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
          body: JSON.stringify({ provider_type: z.type, provider_id: z.id, api_key: z.current_api_key, base_url: z.current_base_url || z.default_base_url, model: z.current_model || z.default_model, source: (b = z.resource_status) == null ? void 0 : b.source, device: (ve = z.resource_status) == null ? void 0 : ve.device, enabled: !z.is_active })
        });
        if (!Oe.ok) {
          const Je = await Oe.json().catch(() => ({}));
          throw new Error(Je.detail || `HTTP ${Oe.status}`);
        }
        await K();
      } catch (Oe) {
        s.value = Oe instanceof Error ? Oe.message : "切换失败";
      } finally {
        o.value = !1;
      }
    }
    async function Pe(z) {
      r.value = z.id, s.value = "", d.value = { ...d.value, [z.id]: { ok: !1, message: "正在测试连接…" } };
      try {
        const b = await fetch("/api/providers/test", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
          body: JSON.stringify({ provider_type: z.type, provider_id: z.id, api_key: z.current_api_key, base_url: z.current_base_url, model: z.current_model })
        });
        if (!b.ok) {
          const Mt = await b.json().catch(() => ({}));
          throw new Error(Mt.detail || `HTTP ${b.status}`);
        }
        const ve = await b.json(), Oe = !!ve.ok, Je = Oe ? `成功${ve.latency_ms ? ` · ${ve.latency_ms} ms` : ""}` : `失败 · ${ve.message || "未通过"}`;
        d.value = { ...d.value, [z.id]: { ok: Oe, message: Je } }, c.value = Je;
      } catch (b) {
        const ve = `失败 · ${b instanceof Error ? b.message : "网络错误"}`;
        d.value = { ...d.value, [z.id]: { ok: !1, message: ve } }, c.value = ve;
      } finally {
        r.value = null;
      }
    }
    function Ne(z) {
      var ve;
      if (!z) return !1;
      const b = z.resource_status || {};
      return !!(b.ready || b.service_running || b.installed || (ve = b.install) != null && ve.installed);
    }
    function nt(z) {
      var ve;
      if (!z) return !1;
      const b = z.resource_status || {};
      return !!(b.installing || (ve = b.install) != null && ve.installing);
    }
    const vt = {
      local_stt: ["local_stt", "stt", "asr"],
      gsv_tts_local: ["gsv_tts_local", "tts", "gpt_sovits"],
      local_embedding: ["local_embedding", "embedding"],
      local_rerank: ["local_rerank", "reranker"],
      rvc: ["rvc"],
      separator: ["separator"],
      ffmpeg: ["ffmpeg"]
    };
    function Pt(z, b) {
      const ve = vt[b] || [b];
      return ve.includes(z.provider_id) || ve.includes(String(z.resource_kind || ""));
    }
    function Tt(z) {
      const b = h.value.filter((ve) => Pt(ve, z));
      return b.find(q) || b[0] || null;
    }
    function Ue(z) {
      return z ? Tt(z.id) : null;
    }
    function kt(z) {
      if (!z) return !1;
      const b = Ue(z);
      return nt(z) || !!(b && q(b));
    }
    function gt(z) {
      const b = Ue(z);
      return !!(b && q(b));
    }
    function It(z) {
      return typeof z != "number" || !Number.isFinite(z) ? null : Math.min(100, Math.max(0, z));
    }
    function ut(z) {
      return It(z == null ? void 0 : z.progress_percent);
    }
    function ct(z) {
      var ve;
      if (!z) return null;
      const b = ut(Ue(z));
      return b ?? It((ve = z.resource_status) == null ? void 0 : ve.progress_percent);
    }
    function zt(z) {
      return z == null ? "进行中" : `${Math.round(z)}%`;
    }
    function on(z, b = !0) {
      return { "task-progress": !0, active: b, determinate: b && z != null, indeterminate: b && z == null };
    }
    function Ft(z) {
      return z == null ? void 0 : { width: `${z}%` };
    }
    function wn() {
      return Tt("ffmpeg");
    }
    function Li() {
      const z = wn();
      return !!(z && q(z) || l.value === "ffmpeg:install");
    }
    function Vi() {
      const z = wn();
      return z ? he(z) : "安装中";
    }
    function At(z) {
      var ve, Oe, Je, Mt;
      const b = Ue(z);
      if (b && q(b)) {
        const mt = b.progress_percent == null ? "" : ` ${Math.round(Number(b.progress_percent) || 0)}%`;
        return `${he(b)}${mt}${pe(b.phase) ? ` · ${pe(b.phase)}` : ""}`;
      }
      if (nt(z)) {
        const mt = (ve = z.resource_status) == null ? void 0 : ve.progress_percent;
        return `安装中${typeof mt == "number" ? ` ${Math.round(mt)}%` : ""}${pe(String(((Oe = z.resource_status) == null ? void 0 : Oe.phase) || "")) ? ` · ${pe(String(((Je = z.resource_status) == null ? void 0 : Je.phase) || ""))}` : ""}`;
      }
      return z.id === "gsv_tts_local" && ((Mt = z.resource_status) != null && Mt.service_running) ? "服务运行中" : Ne(z) ? "资源就绪" : "未安装";
    }
    function Al() {
      return !!(U.value.installed || U.value.ready || U.value.cache_available || U.value.system_path);
    }
    function Dl() {
      return Li() ? Vi() : U.value.installed ? "托管副本已就绪" : U.value.system_path ? "已检测到系统 FFmpeg" : U.value.cache_available ? "已检测到本地缓存" : U.value.detected ? "已检测到" : "未检测到";
    }
    function Rl(z) {
      const b = z.resource_status || {};
      return z.id === "local_stt" ? Ne(z) ? String(b.model_id || b.resolved_model || "Qwen3-ASR-0.6B") : "未安装本地识别" : z.id === "gsv_tts_local" ? b.service_running ? `本地服务运行中 · 端口 ${b.api_port || "9880"}` : Ne(z) ? "GPT-SoVITS 已安装" : "未安装本地引擎" : Ne(z) ? String(b.model_id || "资源就绪") : String(b.model_id || "尚未安装资源");
    }
    async function Ll() {
      const z = [...D];
      if (z.length) {
        for (const b of z) {
          const ve = t.value.find((Je) => Je.id === b);
          if (!ve || !Ne(ve)) continue;
          if (ve.is_active) {
            D.delete(b);
            continue;
          }
          (await fetch("/api/providers/configure", {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
            body: JSON.stringify({ provider_type: ve.type, provider_id: ve.id, enabled: !0 })
          })).ok && D.delete(b);
        }
        z.some((b) => !D.has(b)) && await K({ quiet: !0 });
      }
    }
    function Vl(z) {
      z.key === "Escape" && (i.value ? P() : v.value ? v.value = !1 : w.value ? k() : x.value && (x.value = !1));
    }
    return ht(() => {
      K(), be(), _ = window.setInterval(() => {
        be(), Ee(), (n.value === "audio" || te.value.length || t.value.some((z) => nt(z))) && K({ quiet: !0 }).then(() => Ll());
      }, 2500), window.addEventListener("keydown", Vl);
    }), _n(() => {
      document.body.classList.remove("provider-modal-open"), document.documentElement.classList.remove("provider-modal-open"), _ && window.clearInterval(_), window.removeEventListener("keydown", Vl);
    }), (z, b) => {
      var ve, Oe, Je, Mt, mt, Hn, zl, Fl, Bl, Hl, Ul, jl, Gl, ql, Yl, Xl, Kl, Wl, Zl, Jl, Ql, ea, ta, na, oa, sa, ia, ra, la, aa, ua, ca, da, fa, pa, ha, va, ga, ma, ya, ba, _a, wa, ka;
      return E(), C("div", QN, [
        u("nav", e3, [
          (E(), C(_e, null, Re(X, (J) => u("button", {
            key: J.id,
            class: ge(["tab-button", { active: n.value === J.id }]),
            role: "tab",
            "aria-selected": n.value === J.id,
            onClick: (Mo) => n.value = J.id
          }, [
            u("span", null, A(J.label), 1)
          ], 10, t3)), 64))
        ]),
        te.value.length || n.value === "audio" ? (E(), C("section", n3, [
          u("button", {
            class: "download-summary",
            type: "button",
            onClick: O,
            "aria-expanded": v.value
          }, [
            u("span", s3, [
              ne(H(po), {
                size: 16,
                class: ge({ spin: te.value.length > 0 })
              }, null, 8, ["class"])
            ]),
            u("span", i3, [
              u("strong", null, A(te.value.length ? `正在处理 ${te.value.length} 个资源` : "资源任务中心"), 1),
              u("span", null, A(te.value[0] ? `${te.value[0].resource_name || te.value[0].provider_id} · ${he(te.value[0])}` : "查看最近的安装、校验与失败记录"), 1)
            ]),
            te.value[0] ? (E(), C("span", {
              key: 0,
              class: ge(["download-summary-progress", { active: !0, determinate: ut(te.value[0]) != null, indeterminate: ut(te.value[0]) == null }])
            }, [
              u("b", null, A(zt(ut(te.value[0]))), 1),
              u("i", null, [
                u("em", {
                  style: Ye(Ft(ut(te.value[0])))
                }, null, 4)
              ])
            ], 2)) : oe("", !0),
            b[35] || (b[35] = u("span", { class: "download-summary-arrow" }, "查看详情 →", -1))
          ], 8, o3)
        ])) : oe("", !0),
        n.value === "audio" ? (E(), C("section", r3, [
          b[56] || (b[56] = u("div", { class: "section-heading" }, [
            u("div", null, [
              u("span", { class: "section-label" }, "AUDIO WORKBENCH"),
              u("h3", { id: "local-production-title" }, "本地音频工作台")
            ]),
            u("span", { class: "section-note" }, "通用资源给各音频能力共用。GPT-SoVITS 装好后会出现在「对话语音(TTS)」；本地识别装好后会出现在「语音识别(STT)」。FFmpeg 用检测查看本机是否已有，不会开始下载。")
          ], -1)),
          u("section", l3, [
            b[43] || (b[43] = u("div", { class: "audio-section-head" }, [
              u("h4", { id: "audio-common-title" }, "通用资源"),
              u("span", null, "人声分离与 FFmpeg，供各音频能力共用")
            ], -1)),
            u("div", a3, [
              T.value ? (E(), C("article", u3, [
                u("div", c3, [
                  b[36] || (b[36] = u("div", null, [
                    u("span", { class: "production-kicker" }, "PREP"),
                    u("h3", null, "人声分离")
                  ], -1)),
                  u("span", {
                    class: ge(["status-chip", { on: (ve = T.value.resource_status) == null ? void 0 : ve.ready }])
                  }, A((Oe = T.value.resource_status) != null && Oe.ready ? "已就绪" : kt(T.value) ? At(T.value) : "未准备"), 3)
                ]),
                b[38] || (b[38] = u("p", null, "切片和音频生产共用的 HT-Demucs 前处理模型。", -1)),
                kt(T.value) ? (E(), C("div", d3, [
                  u("div", f3, [
                    u("strong", null, A(At(T.value)), 1),
                    u("b", null, A(zt(ct(T.value))), 1)
                  ]),
                  u("div", {
                    class: ge(on(ct(T.value)))
                  }, [
                    u("i", {
                      style: Ye(Ft(ct(T.value)))
                    }, null, 4)
                  ], 2)
                ])) : oe("", !0),
                u("div", p3, [
                  u("button", {
                    class: "button button-primary",
                    type: "button",
                    onClick: b[0] || (b[0] = (J) => m(T.value))
                  }, [
                    ne(H(uo), { size: 15 }),
                    b[37] || (b[37] = me("管理"))
                  ]),
                  kt(T.value) ? (E(), C("button", {
                    key: 0,
                    class: "button button-secondary",
                    type: "button",
                    onClick: b[1] || (b[1] = (J) => de(T.value, "cancel")),
                    disabled: l.value !== null
                  }, "取消", 8, h3)) : oe("", !0)
                ])
              ])) : oe("", !0),
              u("article", v3, [
                u("div", g3, [
                  b[39] || (b[39] = u("div", null, [
                    u("span", { class: "production-kicker" }, "FFMPEG"),
                    u("h3", null, "FFmpeg")
                  ], -1)),
                  u("span", {
                    class: ge(["status-chip", { on: Al() }])
                  }, A(Dl()), 3)
                ]),
                b[42] || (b[42] = u("p", null, "音视频前处理运行时。点检测即可确认托管副本、系统 PATH 或本地缓存，不必先点下载。", -1)),
                u("div", m3, [
                  u("span", null, "托管副本：" + A(U.value.installed ? "已存在" : "未安装"), 1),
                  u("span", null, "系统/缓存：" + A(U.value.system_path ? "PATH 已找到" : U.value.cache_available ? "本地缓存已找到" : "未找到"), 1)
                ]),
                Li() ? (E(), C("div", y3, [
                  u("div", b3, [
                    u("strong", null, A(Vi()), 1),
                    u("b", null, A(zt(ut(wn()))), 1)
                  ]),
                  u("div", {
                    class: ge(on(ut(wn())))
                  }, [
                    u("i", {
                      style: Ye(Ft(ut(wn())))
                    }, null, 4)
                  ], 2)
                ])) : oe("", !0),
                N.value ? (E(), C("p", _3, A(N.value), 1)) : oe("", !0),
                u("div", w3, [
                  u("button", {
                    class: "button button-secondary",
                    type: "button",
                    onClick: b[2] || (b[2] = (J) => ke("detect")),
                    disabled: I.value || l.value !== null
                  }, [
                    ne(H(Dt), {
                      size: 15,
                      class: ge({ spin: I.value })
                    }, null, 8, ["class"]),
                    b[40] || (b[40] = me("检测"))
                  ], 8, k3),
                  u("button", {
                    class: "button button-primary",
                    type: "button",
                    onClick: g
                  }, [
                    ne(H(uo), { size: 15 }),
                    b[41] || (b[41] = me("管理"))
                  ])
                ])
              ])
            ])
          ]),
          u("section", E3, [
            b[50] || (b[50] = u("div", { class: "audio-section-head" }, [
              u("h4", { id: "audio-voice-title" }, "音色引擎"),
              u("span", null, "GPT-SoVITS 与 RVC 并列，分别服务对话合成和音频变声")
            ], -1)),
            u("div", x3, [
              Y.value ? (E(), C("article", S3, [
                u("div", C3, [
                  b[44] || (b[44] = u("div", null, [
                    u("span", { class: "production-kicker" }, "GPT-SOVITS"),
                    u("h3", null, "对话音色引擎")
                  ], -1)),
                  u("span", {
                    class: ge(["status-chip", { on: ((Je = Y.value.resource_status) == null ? void 0 : Je.service_running) || Ne(Y.value) }])
                  }, A(At(Y.value)), 3)
                ]),
                b[46] || (b[46] = u("p", null, "角色对话和声音训练共用的本地引擎。安装后会出现在「对话语音(TTS)」页。", -1)),
                u("div", $3, [
                  u("span", null, "安装包：" + A(Ne(Y.value) || (Mt = Y.value.resource_status) != null && Mt.installed ? "已就绪" : "未安装"), 1),
                  u("span", null, "服务：" + A((mt = Y.value.resource_status) != null && mt.service_running ? "运行中" : "未启动"), 1)
                ]),
                kt(Y.value) ? (E(), C("div", I3, [
                  u("div", N3, [
                    u("strong", null, A(At(Y.value)), 1),
                    u("b", null, A(zt(ct(Y.value))), 1)
                  ]),
                  u("div", {
                    class: ge(on(ct(Y.value)))
                  }, [
                    u("i", {
                      style: Ye(Ft(ct(Y.value)))
                    }, null, 4)
                  ], 2)
                ])) : oe("", !0),
                u("div", T3, [
                  u("button", {
                    class: "button button-primary",
                    type: "button",
                    onClick: b[3] || (b[3] = (J) => m(Y.value))
                  }, [
                    ne(H(uo), { size: 15 }),
                    b[45] || (b[45] = me("管理"))
                  ]),
                  kt(Y.value) ? (E(), C("button", {
                    key: 0,
                    class: "button button-secondary",
                    type: "button",
                    onClick: b[4] || (b[4] = (J) => de(Y.value, "cancel")),
                    disabled: l.value !== null
                  }, "取消", 8, M3)) : oe("", !0)
                ])
              ])) : oe("", !0),
              B.value ? (E(), C("article", O3, [
                u("div", P3, [
                  b[47] || (b[47] = u("div", null, [
                    u("span", { class: "production-kicker" }, "RVC"),
                    u("h3", null, "变声生产")
                  ], -1)),
                  u("span", {
                    class: ge(["status-chip", { on: (Hn = B.value.resource_status) == null ? void 0 : Hn.ready }])
                  }, A((zl = B.value.resource_status) != null && zl.ready ? "已就绪" : kt(B.value) ? At(B.value) : "未准备"), 3)
                ]),
                b[49] || (b[49] = u("p", null, "音频到音频变声运行时，不参与角色对话 TTS。", -1)),
                kt(B.value) ? (E(), C("div", A3, [
                  u("div", D3, [
                    u("strong", null, A(At(B.value)), 1),
                    u("b", null, A(zt(ct(B.value))), 1)
                  ]),
                  u("div", {
                    class: ge(on(ct(B.value)))
                  }, [
                    u("i", {
                      style: Ye(Ft(ct(B.value)))
                    }, null, 4)
                  ], 2)
                ])) : oe("", !0),
                u("div", R3, [
                  u("button", {
                    class: "button button-primary",
                    type: "button",
                    onClick: b[5] || (b[5] = (J) => m(B.value))
                  }, [
                    ne(H(uo), { size: 15 }),
                    b[48] || (b[48] = me("管理"))
                  ])
                ])
              ])) : oe("", !0)
            ])
          ]),
          u("section", L3, [
            b[55] || (b[55] = u("div", { class: "audio-section-head" }, [
              u("h4", { id: "audio-stt-title" }, "本地语音识别"),
              u("span", null, "安装后同步到「语音识别(STT)」页")
            ], -1)),
            u("div", V3, [
              L.value ? (E(), C("article", z3, [
                u("div", F3, [
                  b[51] || (b[51] = u("div", null, [
                    u("span", { class: "production-kicker" }, "LOCAL STT"),
                    u("h3", null, "本地语音识别")
                  ], -1)),
                  u("span", {
                    class: ge(["status-chip", { on: Ne(L.value) }])
                  }, A(At(L.value)), 3)
                ]),
                b[54] || (b[54] = u("p", null, "Qwen3-ASR 给对话识别和 GPT-SoVITS 标注共用。安装后会出现在「语音识别(STT)」页。", -1)),
                u("div", B3, [
                  u("span", null, "模型：" + A(Rl(L.value)), 1),
                  b[52] || (b[52] = u("span", null, "依赖：FFmpeg", -1))
                ]),
                kt(L.value) ? (E(), C("div", H3, [
                  u("div", U3, [
                    u("strong", null, A(At(L.value)), 1),
                    u("b", null, A(zt(ct(L.value))), 1)
                  ]),
                  u("div", {
                    class: ge(on(ct(L.value)))
                  }, [
                    u("i", {
                      style: Ye(Ft(ct(L.value)))
                    }, null, 4)
                  ], 2)
                ])) : oe("", !0),
                u("div", j3, [
                  u("button", {
                    class: "button button-primary",
                    type: "button",
                    onClick: b[6] || (b[6] = (J) => m(L.value))
                  }, [
                    ne(H(uo), { size: 15 }),
                    b[53] || (b[53] = me("管理"))
                  ]),
                  kt(L.value) ? (E(), C("button", {
                    key: 0,
                    class: "button button-secondary",
                    type: "button",
                    onClick: b[7] || (b[7] = (J) => de(L.value, "cancel")),
                    disabled: l.value !== null
                  }, "取消", 8, G3)) : oe("", !0)
                ])
              ])) : oe("", !0)
            ])
          ])
        ])) : oe("", !0),
        n.value !== "audio" ? (E(), C("main", q3, [
          o.value && t.value.length === 0 ? (E(), C("div", Y3, [
            ne(H(Dt), {
              size: 22,
              class: "spin"
            }),
            b[57] || (b[57] = u("p", null, "加载中...", -1))
          ])) : s.value && t.value.length === 0 ? (E(), C("div", X3, [
            ne(H(Bt), { size: 22 }),
            u("p", null, A(s.value), 1),
            u("button", {
              class: "button button-primary",
              onClick: K
            }, "重试")
          ])) : Q.value.length === 0 ? (E(), C("div", K3, b[58] || (b[58] = [
            u("p", null, "这个分类暂时没有可用供应商。", -1)
          ]))) : (E(), C("div", {
            key: 3,
            class: ge(["providers-grid", { compact: n.value === "llm" }])
          }, [
            (E(!0), C(_e, null, Re(Q.value, (J) => {
              var Mo, Ea, xa, Sa, Ca, $a, Ia, Na, Ta, Ma, Oa, Pa, Aa, Da;
              return E(), C("article", {
                key: J.type + ":" + J.id,
                class: ge(["provider-card", { configured: J.is_configured, active: J.is_active, local: J.mode === "local" }]),
                tabindex: "0",
                onClick: (Oo) => m(J),
                onKeydown: [
                  gu((Oo) => m(J), ["enter"]),
                  gu(yt((Oo) => m(J), ["prevent"]), ["space"])
                ]
              }, [
                u("div", Z3, [
                  u("div", J3, [
                    u("span", {
                      class: ge(["provider-mark", { local: J.mode === "local" }])
                    }, null, 2),
                    u("h3", null, A(J.name), 1),
                    J.mode === "local" ? (E(), C("span", Q3, "本地")) : (E(), C("span", eT, "API"))
                  ]),
                  J.runtime_supported ? (E(), C("button", {
                    key: 0,
                    class: ge(["provider-switch", { on: J.is_active }]),
                    type: "button",
                    role: "switch",
                    "aria-checked": J.is_active,
                    "aria-label": `${J.is_active ? "停用" : "启用"} ${J.name}`,
                    onClick: yt((Oo) => Ce(J), ["stop"]),
                    disabled: o.value
                  }, b[59] || (b[59] = [
                    u("span", null, null, -1)
                  ]), 10, tT)) : (E(), C("span", nT, "仅配置"))
                ]),
                u("p", oT, A(J.description), 1),
                J.mode === "local" ? (E(), C("div", sT, [
                  b[60] || (b[60] = u("span", { class: "meta-label" }, "本地配置", -1)),
                  u("strong", null, A(At(J)), 1),
                  u("code", null, A(Rl(J)), 1)
                ])) : oe("", !0),
                J.mode === "local" && kt(J) ? (E(), C("div", {
                  key: 1,
                  class: "install-progress",
                  onClick: b[8] || (b[8] = yt(() => {
                  }, ["stop"]))
                }, [
                  u("div", iT, [
                    u("strong", null, A(At(J)), 1),
                    u("b", null, A(zt(ct(J))), 1)
                  ]),
                  u("div", {
                    class: ge(on(ct(J)))
                  }, [
                    u("i", {
                      style: Ye(Ft(ct(J)))
                    }, null, 4)
                  ], 2),
                  u("div", rT, [
                    (Mo = Ue(J)) != null && Mo.current_file ? (E(), C("span", lT, "当前文件：" + A((Ea = Ue(J)) == null ? void 0 : Ea.current_file), 1)) : oe("", !0),
                    (xa = Ue(J)) != null && xa.total_bytes ? (E(), C("span", aT, A(fe((Sa = Ue(J)) == null ? void 0 : Sa.downloaded_bytes)) + " / " + A(fe((Ca = Ue(J)) == null ? void 0 : Ca.total_bytes)), 1)) : oe("", !0),
                    gt(J) ? (E(), C("span", uT, "速度 " + A(fe(($a = Ue(J)) == null ? void 0 : $a.speed_bytes_per_second)) + "/秒 · 剩余 " + A(le((Ia = Ue(J)) == null ? void 0 : Ia.eta_seconds)), 1)) : oe("", !0),
                    (Na = Ue(J)) != null && Na.error_message || (Ta = J.resource_status) != null && Ta.error ? (E(), C("span", cT, A(((Ma = Ue(J)) == null ? void 0 : Ma.error_message) || ((Oa = J.resource_status) == null ? void 0 : Oa.error)), 1)) : oe("", !0)
                  ])
                ])) : J.type === "web_search" ? (E(), C("div", dT, [
                  b[61] || (b[61] = u("span", { class: "meta-label" }, "搜索服务", -1)),
                  u("code", null, A(J.name), 1),
                  u("span", null, A(J.current_api_key ? "API Key 已配置" : "需要 API Key"), 1)
                ])) : J.mode !== "local" ? (E(), C("div", fT, [
                  b[62] || (b[62] = u("span", { class: "meta-label" }, "当前模型", -1)),
                  u("code", null, A(J.current_model || J.default_model || "按接口默认"), 1),
                  J.current_base_url ? (E(), C("span", pT, A(J.current_base_url), 1)) : oe("", !0)
                ])) : oe("", !0),
                u("footer", hT, [
                  u("button", {
                    class: "button button-secondary",
                    type: "button",
                    onClick: yt((Oo) => m(J), ["stop"])
                  }, [
                    ne(H(uo), { size: 15 }),
                    b[63] || (b[63] = me("配置"))
                  ], 8, vT),
                  J.mode === "api" && J.is_configured && J.runtime_supported ? (E(), C("button", {
                    key: 0,
                    class: ge(["button button-test", { "is-success": (Pa = d.value[J.id]) == null ? void 0 : Pa.ok, "is-error": d.value[J.id] && !d.value[J.id].ok }]),
                    type: "button",
                    onClick: yt((Oo) => Pe(J), ["stop"]),
                    disabled: r.value === J.id
                  }, [
                    r.value === J.id ? (E(), lt(H(Dt), {
                      key: 0,
                      size: 15,
                      class: "spin"
                    })) : (Aa = d.value[J.id]) != null && Aa.ok ? (E(), lt(H(Jn), {
                      key: 1,
                      size: 15
                    })) : d.value[J.id] ? (E(), lt(H(Bt), {
                      key: 2,
                      size: 15
                    })) : oe("", !0),
                    me(A(r.value === J.id ? "测试中" : ((Da = d.value[J.id]) == null ? void 0 : Da.message) || "测试连接"), 1)
                  ], 10, gT)) : oe("", !0)
                ])
              ], 42, W3);
            }), 128))
          ], 2))
        ])) : oe("", !0),
        (E(), lt(Ph, { to: "body" }, [
          v.value ? (E(), C("div", {
            key: 0,
            class: "drawer-overlay provider-config-overlay",
            onClick: b[10] || (b[10] = yt((J) => v.value = !1, ["self"]))
          }, [
            u("aside", mT, [
              u("div", yT, [
                b[64] || (b[64] = u("div", null, [
                  u("p", { class: "eyebrow" }, "RESOURCE TASKS"),
                  u("h3", null, "下载中心"),
                  u("p", null, "安装、校验和失败记录都会留在这里。音频页会常驻入口，方便查看 GPT-SoVITS 与语音识别的下载进度。")
                ], -1)),
                u("div", bT, [
                  ce.value ? (E(), C("button", {
                    key: 0,
                    class: "button button-quiet",
                    type: "button",
                    onClick: xe
                  }, "清理已结束")) : oe("", !0),
                  u("button", {
                    class: "modal-close",
                    type: "button",
                    onClick: b[9] || (b[9] = (J) => v.value = !1),
                    "aria-label": "关闭下载中心"
                  }, [
                    ne(H(Bt), { size: 18 })
                  ])
                ])
              ]),
              u("div", _T, [
                y.value && !h.value.length ? (E(), C("p", wT, "加载任务中…")) : h.value.length ? oe("", !0) : (E(), C("p", kT, "暂无资源任务")),
                (E(!0), C(_e, null, Re(h.value, (J) => (E(), C("article", {
                  key: J.task_id,
                  class: ge(["download-task", `task-${J.status}`])
                }, [
                  u("div", ET, [
                    u("div", null, [
                      u("strong", null, A(J.resource_name || J.provider_id), 1),
                      u("span", null, [
                        me(A(he(J)), 1),
                        pe(J.phase) ? (E(), C(_e, { key: 0 }, [
                          me(" · " + A(pe(J.phase)), 1)
                        ], 64)) : oe("", !0)
                      ])
                    ]),
                    u("b", null, A(q(J) ? zt(ut(J)) : J.progress_percent == null ? "—" : `${Math.round(J.progress_percent)}%`), 1)
                  ]),
                  u("div", {
                    class: ge(on(ut(J), q(J)))
                  }, [
                    u("i", {
                      style: Ye(Ft(ut(J)))
                    }, null, 4)
                  ], 2),
                  u("div", xT, [
                    J.current_file ? (E(), C("span", ST, "当前文件：" + A(J.current_file), 1)) : oe("", !0),
                    J.total_bytes ? (E(), C("span", CT, A(fe(J.downloaded_bytes)) + " / " + A(fe(J.total_bytes)), 1)) : oe("", !0),
                    q(J) ? (E(), C("span", $T, "速度 " + A(fe(J.speed_bytes_per_second)) + "/秒 · 剩余 " + A(le(J.eta_seconds)), 1)) : oe("", !0),
                    J.error_message ? (E(), C("span", IT, A(J.error_message), 1)) : oe("", !0)
                  ]),
                  q(J) ? (E(), C("div", NT, [
                    u("button", {
                      class: "button button-secondary",
                      type: "button",
                      onClick: (Mo) => se(J)
                    }, "取消", 8, TT)
                  ])) : J.status === "failed" ? (E(), C("div", MT, [
                    u("button", {
                      class: "button button-secondary",
                      type: "button",
                      onClick: (Mo) => $e(J)
                    }, [
                      ne(H(Dt), { size: 14 }),
                      b[65] || (b[65] = me("重试"))
                    ], 8, OT)
                  ])) : oe("", !0)
                ], 2))), 128))
              ])
            ])
          ])) : oe("", !0),
          w.value && B.value ? (E(), C("div", {
            key: 1,
            class: "drawer-overlay provider-config-overlay",
            onClick: yt(k, ["self"])
          }, [
            u("aside", PT, [
              u("div", AT, [
                b[66] || (b[66] = u("div", null, [
                  u("p", { class: "eyebrow" }, "LOCAL AUDIO PRODUCTION / RVC"),
                  u("h3", null, "RVC 音频生产"),
                  u("p", null, "只管理 RVC 音频到音频推理所需的运行时和模型，不参与角色对话或 TTS。")
                ], -1)),
                u("button", {
                  class: "modal-close",
                  type: "button",
                  onClick: k,
                  "aria-label": "关闭 RVC 管理"
                }, [
                  ne(H(Bt), { size: 18 })
                ])
              ]),
              u("div", DT, [
                u("div", RT, [
                  u("div", null, [
                    b[67] || (b[67] = u("span", { class: "section-label" }, "推理可用性", -1)),
                    u("strong", null, A((Fl = B.value.resource_status) != null && Fl.ready ? "可以开始生成变声音频" : "还需要补完资源"), 1)
                  ]),
                  u("span", {
                    class: ge(["status-chip", { on: (Bl = B.value.resource_status) == null ? void 0 : Bl.ready }])
                  }, A((Hl = B.value.resource_status) != null && Hl.ready ? "READY" : "INCOMPLETE"), 3)
                ]),
                u("div", LT, [
                  (E(), C(_e, null, Re([{ key: "source", title: "CHARACTOID 内置 RVC 核心", detail: "项目内置推理核心" }, { key: "runtime", title: "独立 Python 运行时", detail: "CHARACTOID/runtime/rvc" }, { key: "hubert", title: "Hubert 特征模型", detail: "用于音频特征提取" }, { key: "rmvpe", title: "RMVPE 音高模型", detail: "用于 F0 提取" }], (J) => u("div", {
                    key: J.key,
                    class: "rvc-component-row"
                  }, [
                    u("div", VT, [
                      j(J.key) ? (E(), lt(H(Jn), {
                        key: 0,
                        size: 16
                      })) : (E(), C("span", zT, "·"))
                    ]),
                    u("div", FT, [
                      u("strong", null, A(J.title), 1),
                      u("span", null, A(J.detail), 1)
                    ]),
                    u("b", {
                      class: ge({ ready: j(J.key) })
                    }, A(W(J.key)), 3)
                  ])), 64))
                ]),
                u("div", BT, [
                  u("div", null, [
                    u("strong", null, A((Ul = B.value.resource_status) != null && Ul.installing ? "正在准备 RVC 运行时" : "补完推理环境"), 1),
                    u("p", null, A(((jl = B.value.resource_status) == null ? void 0 : jl.detail) || ((Gl = B.value.resource_status) == null ? void 0 : Gl.note)), 1)
                  ]),
                  (ql = B.value.resource_status) != null && ql.installing || kt(B.value) ? (E(), C("div", {
                    key: 0,
                    class: ge(["rvc-progress", { active: !0, determinate: Z() != null, indeterminate: Z() == null }])
                  }, [
                    u("span", null, A(zt(Z())), 1),
                    u("i", null, [
                      u("em", {
                        style: Ye(Ft(Z()))
                      }, null, 4)
                    ])
                  ], 2)) : oe("", !0),
                  u("div", HT, [
                    (Yl = B.value.resource_status) != null && Yl.installing ? (E(), C("button", {
                      key: 0,
                      class: "button button-secondary",
                      type: "button",
                      onClick: b[11] || (b[11] = (J) => de(B.value, "cancel")),
                      disabled: l.value !== null
                    }, "取消准备", 8, UT)) : (Xl = B.value.resource_status) != null && Xl.ready ? oe("", !0) : (E(), C("button", {
                      key: 1,
                      class: "button button-primary",
                      type: "button",
                      onClick: b[12] || (b[12] = (J) => de(B.value, "install")),
                      disabled: l.value !== null
                    }, [
                      ne(H(po), { size: 15 }),
                      b[68] || (b[68] = me("准备运行时与基础模型"))
                    ], 8, jT)),
                    (Kl = B.value.resource_status) != null && Kl.ready ? (E(), C("button", {
                      key: 2,
                      class: "button button-secondary",
                      type: "button",
                      onClick: b[13] || (b[13] = (J) => de(B.value, "remove")),
                      disabled: l.value !== null
                    }, [
                      ne(H(gn), { size: 15 }),
                      b[69] || (b[69] = me("移除 CHARACTOID 运行时"))
                    ], 8, GT)) : oe("", !0),
                    u("button", {
                      class: "button button-secondary",
                      type: "button",
                      onClick: b[14] || (b[14] = (J) => de(B.value, "directory")),
                      disabled: l.value !== null
                    }, [
                      ne(H(Ko), { size: 15 }),
                      b[70] || (b[70] = me("查看资源目录"))
                    ], 8, qT)
                  ])
                ]),
                (Wl = B.value.resource_status) != null && Wl.error ? (E(), C("p", YT, A(B.value.resource_status.error), 1)) : oe("", !0),
                s.value ? (E(), C("p", XT, A(s.value), 1)) : oe("", !0),
                b[71] || (b[71] = u("div", { class: "rvc-workspace-note" }, [
                  u("strong", null, "下一步"),
                  u("span", null, "将自己的 .pth 音色模型放入受管的 weights 目录；.index 文件不是必需项。完成后到独立的“RVC”页面上传音频并生成文件。")
                ], -1))
              ])
            ])
          ])) : oe("", !0),
          x.value ? (E(), C("div", {
            key: 2,
            class: "drawer-overlay provider-config-overlay",
            onClick: b[20] || (b[20] = yt((J) => x.value = !1, ["self"]))
          }, [
            u("aside", KT, [
              u("div", WT, [
                b[72] || (b[72] = u("div", null, [
                  u("p", { class: "eyebrow" }, "RUNTIME"),
                  u("h3", null, "FFmpeg"),
                  u("p", null, "检测只查找本机已有的托管副本、系统 PATH 和 imageio 缓存，不会开始下载。")
                ], -1)),
                u("button", {
                  class: "modal-close",
                  type: "button",
                  onClick: b[15] || (b[15] = (J) => x.value = !1),
                  "aria-label": "关闭 FFmpeg 管理"
                }, [
                  ne(H(Bt), { size: 18 })
                ])
              ]),
              u("div", ZT, [
                u("div", JT, [
                  u("span", {
                    class: ge(["status-chip", { on: Al() }])
                  }, A(Dl()), 3),
                  u("span", null, A(U.value.path || "尚未找到可执行文件"), 1)
                ]),
                u("div", QT, [
                  b[73] || (b[73] = u("span", null, "检测结果", -1)),
                  u("strong", null, A(N.value || "点击检测以刷新本机状态"), 1)
                ]),
                u("div", e5, [
                  u("span", null, "托管：" + A(U.value.installed ? "已安装" : "无"), 1),
                  u("span", null, "系统：" + A(U.value.system_path ? "已找到" : "无"), 1),
                  u("span", null, "缓存：" + A(U.value.cache_available ? "已找到" : "无"), 1)
                ]),
                Li() ? (E(), C("div", t5, [
                  u("div", n5, [
                    u("strong", null, A(Vi()), 1),
                    u("b", null, A(zt(ut(wn()))), 1)
                  ]),
                  u("div", {
                    class: ge(on(ut(wn())))
                  }, [
                    u("i", {
                      style: Ye(Ft(ut(wn())))
                    }, null, 4)
                  ], 2)
                ])) : oe("", !0),
                u("div", o5, [
                  u("button", {
                    class: "button button-secondary",
                    type: "button",
                    onClick: b[16] || (b[16] = (J) => ke("detect")),
                    disabled: I.value || l.value !== null
                  }, [
                    ne(H(Dt), {
                      size: 15,
                      class: ge({ spin: I.value })
                    }, null, 8, ["class"]),
                    b[74] || (b[74] = me("检测"))
                  ], 8, s5),
                  U.value.installed ? (E(), C("button", {
                    key: 1,
                    class: "button button-secondary",
                    type: "button",
                    onClick: b[18] || (b[18] = (J) => ke("remove")),
                    disabled: l.value !== null
                  }, [
                    ne(H(gn), { size: 15 }),
                    b[75] || (b[75] = me("移除托管副本"))
                  ], 8, r5)) : (E(), C("button", {
                    key: 0,
                    class: "button button-primary",
                    type: "button",
                    onClick: b[17] || (b[17] = (J) => ke("install")),
                    disabled: l.value !== null
                  }, [
                    ne(H(po), { size: 15 }),
                    me(A(U.value.cache_available || U.value.system_path ? "安装托管副本" : "下载 FFmpeg"), 1)
                  ], 8, i5)),
                  u("button", {
                    class: "button button-secondary",
                    type: "button",
                    onClick: b[19] || (b[19] = (J) => ke("directory")),
                    disabled: l.value !== null
                  }, [
                    ne(H(Ko), { size: 15 }),
                    b[76] || (b[76] = me("打开目录"))
                  ], 8, l5)
                ]),
                s.value ? (E(), C("p", a5, A(s.value), 1)) : oe("", !0)
              ])
            ])
          ])) : oe("", !0),
          i.value ? (E(), C("div", {
            key: 3,
            class: "drawer-overlay provider-config-overlay",
            onClick: yt(P, ["self"])
          }, [
            u("aside", {
              class: "config-drawer provider-config-drawer",
              role: "dialog",
              "aria-modal": "true",
              "aria-label": `配置 ${((Zl = G.value) == null ? void 0 : Zl.name) || "供应商"}`
            }, [
              u("div", c5, [
                u("div", null, [
                  b[77] || (b[77] = u("p", { class: "eyebrow" }, "CONFIGURE", -1)),
                  u("h3", null, A((Jl = G.value) == null ? void 0 : Jl.name), 1),
                  u("p", null, A((Ql = G.value) == null ? void 0 : Ql.description), 1)
                ]),
                u("button", {
                  class: "modal-close",
                  type: "button",
                  onClick: P,
                  "aria-label": "关闭配置"
                }, [
                  ne(H(Bt), { size: 18 })
                ])
              ]),
              u("div", d5, [
                u("div", f5, [
                  u("span", {
                    class: ge(["status-chip", { on: (ea = G.value) == null ? void 0 : ea.is_active }])
                  }, A((ta = G.value) != null && ta.is_active ? "当前启用" : (na = G.value) != null && na.runtime_supported ? "可用" : "仅保存配置"), 3),
                  u("span", null, A(((oa = G.value) == null ? void 0 : oa.mode) === "local" ? "本地资源" : "API 接口"), 1)
                ]),
                u("form", {
                  onSubmit: yt(re, ["prevent"]),
                  class: "config-form"
                }, [
                  ((sa = G.value) == null ? void 0 : sa.mode) === "api" && ((ia = G.value) == null ? void 0 : ia.type) === "web_search" ? (E(), C(_e, { key: 0 }, [
                    b[81] || (b[81] = u("div", { class: "resource-config-intro" }, [
                      u("span", { class: "meta-label" }, "搜索服务"),
                      u("p", { class: "config-hint" }, "为 Agent 提供实时互联网检索能力，不是模型配置。")
                    ], -1)),
                    G.value.requires_api_key ? (E(), C("label", p5, [
                      b[78] || (b[78] = u("span", null, [
                        me("搜索服务 API Key "),
                        u("span", { class: "required" }, "*")
                      ], -1)),
                      Te(u("input", {
                        type: "password",
                        "onUpdate:modelValue": b[21] || (b[21] = (J) => R.value.api_key = J),
                        placeholder: "输入搜索服务 API Key",
                        required: "",
                        autocomplete: "off"
                      }, null, 512), [
                        [Fe, R.value.api_key]
                      ])
                    ])) : oe("", !0),
                    G.value.id === "custom_search" ? (E(), C("label", h5, [
                      b[79] || (b[79] = u("span", null, "搜索接口地址", -1)),
                      Te(u("input", {
                        type: "url",
                        "onUpdate:modelValue": b[22] || (b[22] = (J) => R.value.base_url = J),
                        placeholder: "https://your-search-endpoint"
                      }, null, 512), [
                        [Fe, R.value.base_url]
                      ])
                    ])) : (E(), C("div", v5, [
                      b[80] || (b[80] = u("span", null, "接口地址", -1)),
                      u("strong", null, A(G.value.id === "tavily" ? "Tavily 官方服务" : "博查官方服务"), 1)
                    ]))
                  ], 64)) : ((ra = G.value) == null ? void 0 : ra.mode) === "api" ? (E(), C(_e, { key: 1 }, [
                    G.value.requires_api_key ? (E(), C("label", g5, [
                      b[82] || (b[82] = u("span", null, [
                        me("API Key "),
                        u("span", { class: "required" }, "*")
                      ], -1)),
                      Te(u("input", {
                        type: "password",
                        "onUpdate:modelValue": b[23] || (b[23] = (J) => R.value.api_key = J),
                        placeholder: "输入 API Key",
                        required: "",
                        autocomplete: "off"
                      }, null, 512), [
                        [Fe, R.value.api_key]
                      ])
                    ])) : oe("", !0),
                    u("label", m5, [
                      b[83] || (b[83] = u("span", null, "服务接口地址", -1)),
                      Te(u("input", {
                        type: "url",
                        "onUpdate:modelValue": b[24] || (b[24] = (J) => R.value.base_url = J),
                        placeholder: G.value.default_base_url
                      }, null, 8, y5), [
                        [Fe, R.value.base_url]
                      ])
                    ]),
                    u("label", b5, [
                      b[84] || (b[84] = u("span", null, "模型名称", -1)),
                      Te(u("input", {
                        type: "text",
                        "onUpdate:modelValue": b[25] || (b[25] = (J) => R.value.model = J),
                        placeholder: G.value.default_model
                      }, null, 8, _5), [
                        [Fe, R.value.model]
                      ])
                    ])
                  ], 64)) : (E(), C(_e, { key: 2 }, [
                    u("div", w5, [
                      b[85] || (b[85] = u("span", { class: "meta-label" }, "资源配置", -1)),
                      M() ? (E(), C("p", k5, A(M()), 1)) : oe("", !0)
                    ]),
                    V.value === "embedding" || V.value === "reranker" ? (E(), C(_e, { key: 0 }, [
                      u("label", E5, [
                        u("span", null, A(V.value === "embedding" ? "向量模型 ID" : "精排模型 ID"), 1),
                        Te(u("input", {
                          type: "text",
                          "onUpdate:modelValue": b[26] || (b[26] = (J) => R.value.model = J),
                          placeholder: (la = G.value) == null ? void 0 : la.default_model
                        }, null, 8, x5), [
                          [Fe, R.value.model]
                        ])
                      ]),
                      u("div", S5, [
                        u("label", C5, [
                          b[87] || (b[87] = u("span", null, "模型来源", -1)),
                          Te(u("select", {
                            "onUpdate:modelValue": b[27] || (b[27] = (J) => R.value.source = J)
                          }, b[86] || (b[86] = [
                            u("option", { value: "modelscope" }, "ModelScope", -1),
                            u("option", { value: "huggingface" }, "Hugging Face", -1)
                          ]), 512), [
                            [vn, R.value.source]
                          ])
                        ]),
                        u("label", $5, [
                          b[89] || (b[89] = u("span", null, "运行设备", -1)),
                          Te(u("select", {
                            "onUpdate:modelValue": b[28] || (b[28] = (J) => R.value.device = J)
                          }, b[88] || (b[88] = [
                            u("option", { value: "auto" }, "自动（GPU 优先）", -1),
                            u("option", { value: "cuda" }, "CUDA", -1),
                            u("option", { value: "cpu" }, "CPU", -1)
                          ]), 512), [
                            [vn, R.value.device]
                          ])
                        ])
                      ])
                    ], 64)) : V.value === "gpt_sovits" ? (E(), C("div", I5, b[90] || (b[90] = [
                      u("div", { class: "resource-config-readonly" }, [
                        u("span", null, "固定运行环境"),
                        u("strong", null, "GPT-SoVITS v3lora Windows 整合包"),
                        u("small", null, "应用内置下载源 · Hugging Face · 约 8 GB · 服务按需启动")
                      ], -1)
                    ]))) : V.value === "stt" ? (E(), C("div", N5, b[91] || (b[91] = [
                      u("span", null, "固定资源清单", -1),
                      u("strong", null, "Qwen3-ASR-0.6B + FFmpeg", -1)
                    ]))) : V.value === "separator" ? (E(), C("div", T5, b[92] || (b[92] = [
                      u("span", null, "固定资源", -1),
                      u("strong", null, "HT-Demucs 人声分离模型 · 约 165 MB", -1)
                    ]))) : oe("", !0),
                    u("div", M5, [
                      u("div", null, [
                        b[93] || (b[93] = u("span", { class: "meta-label" }, "资源状态", -1)),
                        u("strong", null, A(G.value ? At(G.value) : "未知"), 1)
                      ]),
                      G.value && kt(G.value) ? (E(), C("div", O5, [
                        u("div", P5, [
                          u("strong", null, A(At(G.value)), 1),
                          u("b", null, A(zt(ct(G.value))), 1)
                        ]),
                        u("div", {
                          class: ge(on(ct(G.value)))
                        }, [
                          u("i", {
                            style: Ye(Ft(ct(G.value)))
                          }, null, 4)
                        ], 2),
                        u("div", A5, [
                          (aa = Ue(G.value)) != null && aa.current_file ? (E(), C("span", D5, "当前文件：" + A((ua = Ue(G.value)) == null ? void 0 : ua.current_file), 1)) : oe("", !0),
                          (ca = Ue(G.value)) != null && ca.total_bytes ? (E(), C("span", R5, A(fe((da = Ue(G.value)) == null ? void 0 : da.downloaded_bytes)) + " / " + A(fe((fa = Ue(G.value)) == null ? void 0 : fa.total_bytes)), 1)) : oe("", !0),
                          gt(G.value) ? (E(), C("span", L5, "速度 " + A(fe((pa = Ue(G.value)) == null ? void 0 : pa.speed_bytes_per_second)) + "/秒 · 剩余 " + A(le((ha = Ue(G.value)) == null ? void 0 : ha.eta_seconds)), 1)) : oe("", !0),
                          (va = Ue(G.value)) != null && va.error_message || (ga = G.value.resource_status) != null && ga.error ? (E(), C("span", V5, A(((ma = Ue(G.value)) == null ? void 0 : ma.error_message) || ((ya = G.value.resource_status) == null ? void 0 : ya.error)), 1)) : oe("", !0)
                        ])
                      ])) : oe("", !0),
                      u("div", z5, [
                        nt(G.value) ? (E(), C("button", {
                          key: 0,
                          type: "button",
                          class: "button button-secondary",
                          onClick: b[29] || (b[29] = (J) => de(G.value, "cancel")),
                          disabled: l.value !== null
                        }, "取消安装", 8, F5)) : Ne(G.value) ? oe("", !0) : (E(), C("button", {
                          key: 1,
                          type: "button",
                          class: "button button-primary",
                          onClick: b[30] || (b[30] = (J) => de(G.value, "install")),
                          disabled: l.value !== null || ((ba = G.value) == null ? void 0 : ba.id) === "gsv_tts_local" && !f.value
                        }, [
                          ne(H(po), { size: 15 }),
                          b[94] || (b[94] = me(" 安装运行环境"))
                        ], 8, B5)),
                        Ne(G.value) ? (E(), C("button", {
                          key: 2,
                          type: "button",
                          class: "button button-secondary",
                          onClick: b[31] || (b[31] = (J) => de(G.value, "remove")),
                          disabled: l.value !== null
                        }, [
                          ne(H(gn), { size: 15 }),
                          b[95] || (b[95] = me(" 删除"))
                        ], 8, H5)) : oe("", !0),
                        u("button", {
                          type: "button",
                          class: "button button-secondary",
                          onClick: b[32] || (b[32] = (J) => de(G.value, "directory")),
                          disabled: l.value !== null
                        }, [
                          ne(H(Ko), { size: 15 }),
                          b[96] || (b[96] = me(" 打开目录"))
                        ], 8, U5),
                        ((_a = G.value) == null ? void 0 : _a.id) === "gsv_tts_local" && ((wa = G.value.resource_status) != null && wa.service_running) ? (E(), C("button", {
                          key: 3,
                          type: "button",
                          class: "button button-secondary",
                          onClick: b[33] || (b[33] = (J) => de(G.value, "stop")),
                          disabled: l.value !== null
                        }, "停止服务", 8, j5)) : ((ka = G.value) == null ? void 0 : ka.id) === "gsv_tts_local" && Ne(G.value) ? (E(), C("button", {
                          key: 4,
                          type: "button",
                          class: "button button-primary",
                          onClick: b[34] || (b[34] = (J) => de(G.value, "start")),
                          disabled: l.value !== null
                        }, [
                          ne(H(Ir), { size: 15 }),
                          b[97] || (b[97] = me(" 启动服务"))
                        ], 8, G5)) : oe("", !0)
                      ])
                    ])
                  ], 64)),
                  G.value && !G.value.runtime_supported ? (E(), C("p", q5, "当前运行时还没有这个 Provider 的适配器，因此这里只保存配置，不会自动调用。")) : oe("", !0),
                  u("div", Y5, [
                    u("button", {
                      type: "button",
                      class: "button button-secondary",
                      onClick: P
                    }, "取消"),
                    u("button", {
                      type: "submit",
                      class: "button button-primary",
                      disabled: o.value
                    }, A(o.value ? "保存中..." : "保存并启用"), 9, X5)
                  ]),
                  a.value ? (E(), C("p", K5, [
                    ne(H(Jn), { size: 16 }),
                    me(" " + A(a.value), 1)
                  ])) : oe("", !0),
                  c.value ? (E(), C("p", {
                    key: 5,
                    class: ge(["config-message", c.value.startsWith("连接成功") ? "success" : "error"])
                  }, A(c.value), 3)) : oe("", !0),
                  s.value ? (E(), C("p", W5, A(s.value), 1)) : oe("", !0)
                ], 32)
              ])
            ], 8, u5)
          ])) : oe("", !0)
        ]))
      ]);
    };
  }
}), J5 = /* @__PURE__ */ Pl(Z5, [["__scopeId", "data-v-2735f362"]]);
let On = null, Pn = null;
function hM(e = "#reranker-settings-root") {
  if (On) return On;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("Reranker 设置挂载点不存在");
  return On = gs(JN), On.mount(t), On;
}
function vM() {
  On && (On.unmount(), On = null);
}
function gM(e = "#providers-root") {
  if (Pn) return Pn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("提供商配置挂载点不存在");
  return Pn = gs(J5), Pn.mount(t), Pn;
}
function mM() {
  Pn && (Pn.unmount(), Pn = null);
}
export {
  pM as destroyEvaluationApp,
  uM as destroyExtensionsApp,
  iM as destroyManageApp,
  mM as destroyProvidersApp,
  vM as destroyRerankerSettingsApp,
  fM as hideEvaluationApp,
  aM as hideExtensionsApp,
  cM as mountEvaluationApp,
  rM as mountExtensionsApp,
  oM as mountManageApp,
  gM as mountProvidersApp,
  hM as mountRerankerSettingsApp,
  dM as showEvaluationApp,
  lM as showExtensionsApp,
  sM as showManageApp
};
