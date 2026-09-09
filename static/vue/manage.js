var Bp = Object.defineProperty;
var Hp = (e, t, n) => t in e ? Bp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var lt = (e, t, n) => Hp(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function ar(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Ze = {}, Eo = [], cn = () => {
}, Up = () => !1, ki = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ur = (e) => e.startsWith("onUpdate:"), Tt = Object.assign, cr = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, jp = Object.prototype.hasOwnProperty, Ke = (e, t) => jp.call(e, t), Ne = Array.isArray, Co = (e) => _s(e) === "[object Map]", Vo = (e) => _s(e) === "[object Set]", Ua = (e) => _s(e) === "[object Date]", Re = (e) => typeof e == "function", nt = (e) => typeof e == "string", en = (e) => typeof e == "symbol", Je = (e) => e !== null && typeof e == "object", Bc = (e) => (Je(e) || Re(e)) && Re(e.then) && Re(e.catch), Hc = Object.prototype.toString, _s = (e) => Hc.call(e), Gp = (e) => _s(e).slice(8, -1), Uc = (e) => _s(e) === "[object Object]", dr = (e) => nt(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Jo = /* @__PURE__ */ ar(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ei = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, qp = /-(\w)/g, Xt = Ei(
  (e) => e.replace(qp, (t, n) => n ? n.toUpperCase() : "")
), Yp = /\B([A-Z])/g, Xn = Ei(
  (e) => e.replace(Yp, "-$1").toLowerCase()
), Ci = Ei((e) => e.charAt(0).toUpperCase() + e.slice(1)), Xi = Ei(
  (e) => e ? `on${Ci(e)}` : ""
), xn = (e, t) => !Object.is(e, t), js = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, jc = (e, t, n, o = !1) => {
  Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !1,
    writable: o,
    value: n
  });
}, ni = (e) => {
  const t = parseFloat(e);
  return isNaN(t) ? e : t;
};
let ja;
const xi = () => ja || (ja = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function et(e) {
  if (Ne(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = nt(o) ? Zp(o) : et(o);
      if (s)
        for (const i in s)
          t[i] = s[i];
    }
    return t;
  } else if (nt(e) || Je(e))
    return e;
}
const Xp = /;(?![^(]*\))/g, Kp = /:([^]+)/, Wp = /\/\*[^]*?\*\//g;
function Zp(e) {
  const t = {};
  return e.replace(Wp, "").split(Xp).forEach((n) => {
    if (n) {
      const o = n.split(Kp);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function be(e) {
  let t = "";
  if (nt(e))
    t = e;
  else if (Ne(e))
    for (let n = 0; n < e.length; n++) {
      const o = be(e[n]);
      o && (t += o + " ");
    }
  else if (Je(e))
    for (const n in e)
      e[n] && (t += n + " ");
  return t.trim();
}
function Ki(e) {
  if (!e) return null;
  let { class: t, style: n } = e;
  return t && !nt(t) && (e.class = be(t)), n && (e.style = et(n)), e;
}
const Jp = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", Qp = /* @__PURE__ */ ar(Jp);
function Gc(e) {
  return !!e || e === "";
}
function eh(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let o = 0; n && o < e.length; o++)
    n = ws(e[o], t[o]);
  return n;
}
function ws(e, t) {
  if (e === t) return !0;
  let n = Ua(e), o = Ua(t);
  if (n || o)
    return n && o ? e.getTime() === t.getTime() : !1;
  if (n = en(e), o = en(t), n || o)
    return e === t;
  if (n = Ne(e), o = Ne(t), n || o)
    return n && o ? eh(e, t) : !1;
  if (n = Je(e), o = Je(t), n || o) {
    if (!n || !o)
      return !1;
    const s = Object.keys(e).length, i = Object.keys(t).length;
    if (s !== i)
      return !1;
    for (const l in e) {
      const r = e.hasOwnProperty(l), u = t.hasOwnProperty(l);
      if (r && !u || !r && u || !ws(e[l], t[l]))
        return !1;
    }
  }
  return String(e) === String(t);
}
function fr(e, t) {
  return e.findIndex((n) => ws(n, t));
}
const qc = (e) => !!(e && e.__v_isRef === !0), N = (e) => nt(e) ? e : e == null ? "" : Ne(e) || Je(e) && (e.toString === Hc || !Re(e.toString)) ? qc(e) ? N(e.value) : JSON.stringify(e, Yc, 2) : String(e), Yc = (e, t) => qc(t) ? Yc(e, t.value) : Co(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, s], i) => (n[Wi(o, i) + " =>"] = s, n),
    {}
  )
} : Vo(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Wi(n))
} : en(t) ? Wi(t) : Je(t) && !Ne(t) && !Uc(t) ? String(t) : t, Wi = (e, t = "") => {
  var n;
  return (
    // Symbol.description in es2019+ so we need to cast here to pass
    // the lib: es2016 check
    en(e) ? `Symbol(${(n = e.description) != null ? n : t})` : e
  );
};
/**
* @vue/reactivity v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Dt;
class Xc {
  constructor(t = !1) {
    this.detached = t, this._active = !0, this.effects = [], this.cleanups = [], this._isPaused = !1, this.parent = Dt, !t && Dt && (this.index = (Dt.scopes || (Dt.scopes = [])).push(
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
      const n = Dt;
      try {
        return Dt = this, t();
      } finally {
        Dt = n;
      }
    }
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  on() {
    Dt = this;
  }
  /**
   * This should only be called on non-detached scopes
   * @internal
   */
  off() {
    Dt = this.parent;
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
function Kc(e) {
  return new Xc(e);
}
function pr() {
  return Dt;
}
function Gs(e, t = !1) {
  Dt && Dt.cleanups.push(e);
}
let Qe;
const Zi = /* @__PURE__ */ new WeakSet();
class Wc {
  constructor(t) {
    this.fn = t, this.deps = void 0, this.depsTail = void 0, this.flags = 5, this.next = void 0, this.cleanup = void 0, this.scheduler = void 0, Dt && Dt.active && Dt.effects.push(this);
  }
  pause() {
    this.flags |= 64;
  }
  resume() {
    this.flags & 64 && (this.flags &= -65, Zi.has(this) && (Zi.delete(this), this.trigger()));
  }
  /**
   * @internal
   */
  notify() {
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Jc(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ga(this), Qc(this);
    const t = Qe, n = Qt;
    Qe = this, Qt = !0;
    try {
      return this.fn();
    } finally {
      ed(this), Qe = t, Qt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        gr(t);
      this.deps = this.depsTail = void 0, Ga(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Zi.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    xl(this) && this.run();
  }
  get dirty() {
    return xl(this);
  }
}
let Zc = 0, Qo, es;
function Jc(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = es, es = e;
    return;
  }
  e.next = Qo, Qo = e;
}
function hr() {
  Zc++;
}
function vr() {
  if (--Zc > 0)
    return;
  if (es) {
    let t = es;
    for (es = void 0; t; ) {
      const n = t.next;
      t.next = void 0, t.flags &= -9, t = n;
    }
  }
  let e;
  for (; Qo; ) {
    let t = Qo;
    for (Qo = void 0; t; ) {
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
function Qc(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function ed(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === n && (n = s), gr(o), th(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = n;
}
function xl(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (td(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function td(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === rs))
    return;
  e.globalVersion = rs;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !xl(e)) {
    e.flags &= -3;
    return;
  }
  const n = Qe, o = Qt;
  Qe = e, Qt = !0;
  try {
    Qc(e);
    const s = e.fn(e._value);
    (t.version === 0 || xn(s, e._value)) && (e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    Qe = n, Qt = o, ed(e), e.flags &= -3;
  }
}
function gr(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      gr(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function th(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Qt = !0;
const nd = [];
function Kn() {
  nd.push(Qt), Qt = !1;
}
function Wn() {
  const e = nd.pop();
  Qt = e === void 0 ? !0 : e;
}
function Ga(e) {
  const { cleanup: t } = e;
  if (e.cleanup = void 0, t) {
    const n = Qe;
    Qe = void 0;
    try {
      t();
    } finally {
      Qe = n;
    }
  }
}
let rs = 0;
class nh {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class Si {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(t) {
    if (!Qe || !Qt || Qe === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Qe)
      n = this.activeLink = new nh(Qe, this), Qe.deps ? (n.prevDep = Qe.depsTail, Qe.depsTail.nextDep = n, Qe.depsTail = n) : Qe.deps = Qe.depsTail = n, od(n);
    else if (n.version === -1 && (n.version = this.version, n.nextDep)) {
      const o = n.nextDep;
      o.prevDep = n.prevDep, n.prevDep && (n.prevDep.nextDep = o), n.prevDep = Qe.depsTail, n.nextDep = void 0, Qe.depsTail.nextDep = n, Qe.depsTail = n, Qe.deps === n && (Qe.deps = o);
    }
    return n;
  }
  trigger(t) {
    this.version++, rs++, this.notify(t);
  }
  notify(t) {
    hr();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      vr();
    }
  }
}
function od(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        od(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const oi = /* @__PURE__ */ new WeakMap(), io = Symbol(
  ""
), Sl = Symbol(
  ""
), as = Symbol(
  ""
);
function It(e, t, n) {
  if (Qt && Qe) {
    let o = oi.get(e);
    o || oi.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || (o.set(n, s = new Si()), s.map = o, s.key = n), s.track();
  }
}
function _n(e, t, n, o, s, i) {
  const l = oi.get(e);
  if (!l) {
    rs++;
    return;
  }
  const r = (u) => {
    u && u.trigger();
  };
  if (hr(), t === "clear")
    l.forEach(r);
  else {
    const u = Ne(e), c = u && dr(n);
    if (u && n === "length") {
      const d = Number(o);
      l.forEach((f, p) => {
        (p === "length" || p === as || !en(p) && p >= d) && r(f);
      });
    } else
      switch ((n !== void 0 || l.has(void 0)) && r(l.get(n)), c && r(l.get(as)), t) {
        case "add":
          u ? c && r(l.get("length")) : (r(l.get(io)), Co(e) && r(l.get(Sl)));
          break;
        case "delete":
          u || (r(l.get(io)), Co(e) && r(l.get(Sl)));
          break;
        case "set":
          Co(e) && r(l.get(io));
          break;
      }
  }
  vr();
}
function oh(e, t) {
  const n = oi.get(e);
  return n && n.get(t);
}
function yo(e) {
  const t = Ye(e);
  return t === e ? t : (It(t, "iterate", as), Yt(e) ? t : t.map(Nt));
}
function $i(e) {
  return It(e = Ye(e), "iterate", as), e;
}
const sh = {
  __proto__: null,
  [Symbol.iterator]() {
    return Ji(this, Symbol.iterator, Nt);
  },
  concat(...e) {
    return yo(this).concat(
      ...e.map((t) => Ne(t) ? yo(t) : t)
    );
  },
  entries() {
    return Ji(this, "entries", (e) => (e[1] = Nt(e[1]), e));
  },
  every(e, t) {
    return mn(this, "every", e, t, void 0, arguments);
  },
  filter(e, t) {
    return mn(this, "filter", e, t, (n) => n.map(Nt), arguments);
  },
  find(e, t) {
    return mn(this, "find", e, t, Nt, arguments);
  },
  findIndex(e, t) {
    return mn(this, "findIndex", e, t, void 0, arguments);
  },
  findLast(e, t) {
    return mn(this, "findLast", e, t, Nt, arguments);
  },
  findLastIndex(e, t) {
    return mn(this, "findLastIndex", e, t, void 0, arguments);
  },
  // flat, flatMap could benefit from ARRAY_ITERATE but are not straight-forward to implement
  forEach(e, t) {
    return mn(this, "forEach", e, t, void 0, arguments);
  },
  includes(...e) {
    return Qi(this, "includes", e);
  },
  indexOf(...e) {
    return Qi(this, "indexOf", e);
  },
  join(e) {
    return yo(this).join(e);
  },
  // keys() iterator only reads `length`, no optimisation required
  lastIndexOf(...e) {
    return Qi(this, "lastIndexOf", e);
  },
  map(e, t) {
    return mn(this, "map", e, t, void 0, arguments);
  },
  pop() {
    return Ho(this, "pop");
  },
  push(...e) {
    return Ho(this, "push", e);
  },
  reduce(e, ...t) {
    return qa(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return qa(this, "reduceRight", e, t);
  },
  shift() {
    return Ho(this, "shift");
  },
  // slice could use ARRAY_ITERATE but also seems to beg for range tracking
  some(e, t) {
    return mn(this, "some", e, t, void 0, arguments);
  },
  splice(...e) {
    return Ho(this, "splice", e);
  },
  toReversed() {
    return yo(this).toReversed();
  },
  toSorted(e) {
    return yo(this).toSorted(e);
  },
  toSpliced(...e) {
    return yo(this).toSpliced(...e);
  },
  unshift(...e) {
    return Ho(this, "unshift", e);
  },
  values() {
    return Ji(this, "values", Nt);
  }
};
function Ji(e, t, n) {
  const o = $i(e), s = o[t]();
  return o !== e && !Yt(e) && (s._next = s.next, s.next = () => {
    const i = s._next();
    return i.value && (i.value = n(i.value)), i;
  }), s;
}
const ih = Array.prototype;
function mn(e, t, n, o, s, i) {
  const l = $i(e), r = l !== e && !Yt(e), u = l[t];
  if (u !== ih[t]) {
    const f = u.apply(e, i);
    return r ? Nt(f) : f;
  }
  let c = n;
  l !== e && (r ? c = function(f, p) {
    return n.call(this, Nt(f), p, e);
  } : n.length > 2 && (c = function(f, p) {
    return n.call(this, f, p, e);
  }));
  const d = u.call(l, c, o);
  return r && s ? s(d) : d;
}
function qa(e, t, n, o) {
  const s = $i(e);
  let i = n;
  return s !== e && (Yt(e) ? n.length > 3 && (i = function(l, r, u) {
    return n.call(this, l, r, u, e);
  }) : i = function(l, r, u) {
    return n.call(this, l, Nt(r), u, e);
  }), s[t](i, ...o);
}
function Qi(e, t, n) {
  const o = Ye(e);
  It(o, "iterate", as);
  const s = o[t](...n);
  return (s === -1 || s === !1) && _r(n[0]) ? (n[0] = Ye(n[0]), o[t](...n)) : s;
}
function Ho(e, t, n = []) {
  Kn(), hr();
  const o = Ye(e)[t].apply(e, n);
  return vr(), Wn(), o;
}
const lh = /* @__PURE__ */ ar("__proto__,__v_isRef,__isVue"), sd = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(en)
);
function rh(e) {
  en(e) || (e = String(e));
  const t = Ye(this);
  return It(t, "has", e), t.hasOwnProperty(e);
}
class id {
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
      return o === (s ? i ? mh : ud : i ? ad : rd).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const l = Ne(t);
    if (!s) {
      let u;
      if (l && (u = sh[n]))
        return u;
      if (n === "hasOwnProperty")
        return rh;
    }
    const r = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      at(t) ? t : o
    );
    return (en(n) ? sd.has(n) : lh(n)) || (s || It(t, "get", n), i) ? r : at(r) ? l && dr(n) ? r : r.value : Je(r) ? s ? yr(r) : un(r) : r;
  }
}
class ld extends id {
  constructor(t = !1) {
    super(!1, t);
  }
  set(t, n, o, s) {
    let i = t[n];
    if (!this._isShallow) {
      const u = co(i);
      if (!Yt(o) && !co(o) && (i = Ye(i), o = Ye(o)), !Ne(t) && at(i) && !at(o))
        return u ? !1 : (i.value = o, !0);
    }
    const l = Ne(t) && dr(n) ? Number(n) < t.length : Ke(t, n), r = Reflect.set(
      t,
      n,
      o,
      at(t) ? t : s
    );
    return t === Ye(s) && (l ? xn(o, i) && _n(t, "set", n, o) : _n(t, "add", n, o)), r;
  }
  deleteProperty(t, n) {
    const o = Ke(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && o && _n(t, "delete", n, void 0), s;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!en(n) || !sd.has(n)) && It(t, "has", n), o;
  }
  ownKeys(t) {
    return It(
      t,
      "iterate",
      Ne(t) ? "length" : io
    ), Reflect.ownKeys(t);
  }
}
class ah extends id {
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
const uh = /* @__PURE__ */ new ld(), ch = /* @__PURE__ */ new ah(), dh = /* @__PURE__ */ new ld(!0);
const $l = (e) => e, Ns = (e) => Reflect.getPrototypeOf(e);
function fh(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, i = Ye(s), l = Co(i), r = e === "entries" || e === Symbol.iterator && l, u = e === "keys" && l, c = s[e](...o), d = n ? $l : t ? Il : Nt;
    return !t && It(
      i,
      "iterate",
      u ? Sl : io
    ), {
      // iterator protocol
      next() {
        const { value: f, done: p } = c.next();
        return p ? { value: f, done: p } : {
          value: r ? [d(f[0]), d(f[1])] : d(f),
          done: p
        };
      },
      // iterable protocol
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function Ts(e) {
  return function(...t) {
    return e === "delete" ? !1 : e === "clear" ? void 0 : this;
  };
}
function ph(e, t) {
  const n = {
    get(s) {
      const i = this.__v_raw, l = Ye(i), r = Ye(s);
      e || (xn(s, r) && It(l, "get", s), It(l, "get", r));
      const { has: u } = Ns(l), c = t ? $l : e ? Il : Nt;
      if (u.call(l, s))
        return c(i.get(s));
      if (u.call(l, r))
        return c(i.get(r));
      i !== l && i.get(s);
    },
    get size() {
      const s = this.__v_raw;
      return !e && It(Ye(s), "iterate", io), Reflect.get(s, "size", s);
    },
    has(s) {
      const i = this.__v_raw, l = Ye(i), r = Ye(s);
      return e || (xn(s, r) && It(l, "has", s), It(l, "has", r)), s === r ? i.has(s) : i.has(s) || i.has(r);
    },
    forEach(s, i) {
      const l = this, r = l.__v_raw, u = Ye(r), c = t ? $l : e ? Il : Nt;
      return !e && It(u, "iterate", io), r.forEach((d, f) => s.call(i, c(d), c(f), l));
    }
  };
  return Tt(
    n,
    e ? {
      add: Ts("add"),
      set: Ts("set"),
      delete: Ts("delete"),
      clear: Ts("clear")
    } : {
      add(s) {
        !t && !Yt(s) && !co(s) && (s = Ye(s));
        const i = Ye(this);
        return Ns(i).has.call(i, s) || (i.add(s), _n(i, "add", s, s)), this;
      },
      set(s, i) {
        !t && !Yt(i) && !co(i) && (i = Ye(i));
        const l = Ye(this), { has: r, get: u } = Ns(l);
        let c = r.call(l, s);
        c || (s = Ye(s), c = r.call(l, s));
        const d = u.call(l, s);
        return l.set(s, i), c ? xn(i, d) && _n(l, "set", s, i) : _n(l, "add", s, i), this;
      },
      delete(s) {
        const i = Ye(this), { has: l, get: r } = Ns(i);
        let u = l.call(i, s);
        u || (s = Ye(s), u = l.call(i, s)), r && r.call(i, s);
        const c = i.delete(s);
        return u && _n(i, "delete", s, void 0), c;
      },
      clear() {
        const s = Ye(this), i = s.size !== 0, l = s.clear();
        return i && _n(
          s,
          "clear",
          void 0,
          void 0
        ), l;
      }
    }
  ), [
    "keys",
    "values",
    "entries",
    Symbol.iterator
  ].forEach((s) => {
    n[s] = fh(s, e, t);
  }), n;
}
function mr(e, t) {
  const n = ph(e, t);
  return (o, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    Ke(n, s) && s in o ? n : o,
    s,
    i
  );
}
const hh = {
  get: /* @__PURE__ */ mr(!1, !1)
}, vh = {
  get: /* @__PURE__ */ mr(!1, !0)
}, gh = {
  get: /* @__PURE__ */ mr(!0, !1)
};
const rd = /* @__PURE__ */ new WeakMap(), ad = /* @__PURE__ */ new WeakMap(), ud = /* @__PURE__ */ new WeakMap(), mh = /* @__PURE__ */ new WeakMap();
function yh(e) {
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
function bh(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : yh(Gp(e));
}
function un(e) {
  return co(e) ? e : br(
    e,
    !1,
    uh,
    hh,
    rd
  );
}
function _h(e) {
  return br(
    e,
    !1,
    dh,
    vh,
    ad
  );
}
function yr(e) {
  return br(
    e,
    !0,
    ch,
    gh,
    ud
  );
}
function br(e, t, n, o, s) {
  if (!Je(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = s.get(e);
  if (i)
    return i;
  const l = bh(e);
  if (l === 0)
    return e;
  const r = new Proxy(
    e,
    l === 2 ? o : n
  );
  return s.set(e, r), r;
}
function xo(e) {
  return co(e) ? xo(e.__v_raw) : !!(e && e.__v_isReactive);
}
function co(e) {
  return !!(e && e.__v_isReadonly);
}
function Yt(e) {
  return !!(e && e.__v_isShallow);
}
function _r(e) {
  return e ? !!e.__v_raw : !1;
}
function Ye(e) {
  const t = e && e.__v_raw;
  return t ? Ye(t) : e;
}
function lo(e) {
  return !Ke(e, "__v_skip") && Object.isExtensible(e) && jc(e, "__v_skip", !0), e;
}
const Nt = (e) => Je(e) ? un(e) : e, Il = (e) => Je(e) ? yr(e) : e;
function at(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function te(e) {
  return wh(e, !1);
}
function wh(e, t) {
  return at(e) ? e : new kh(e, t);
}
class kh {
  constructor(t, n) {
    this.dep = new Si(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : Ye(t), this._value = n ? t : Nt(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || Yt(t) || co(t);
    t = o ? t : Ye(t), xn(t, n) && (this._rawValue = t, this._value = o ? t : Nt(t), this.dep.trigger());
  }
}
function U(e) {
  return at(e) ? e.value : e;
}
function Ue(e) {
  return Re(e) ? e() : U(e);
}
const Eh = {
  get: (e, t, n) => t === "__v_raw" ? e : U(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return at(s) && !at(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function cd(e) {
  return xo(e) ? e : new Proxy(e, Eh);
}
class Ch {
  constructor(t) {
    this.__v_isRef = !0, this._value = void 0;
    const n = this.dep = new Si(), { get: o, set: s } = t(n.track.bind(n), n.trigger.bind(n));
    this._get = o, this._set = s;
  }
  get value() {
    return this._value = this._get();
  }
  set value(t) {
    this._set(t);
  }
}
function xh(e) {
  return new Ch(e);
}
function Sh(e) {
  const t = Ne(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = dd(e, n);
  return t;
}
class $h {
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
    return oh(Ye(this._object), this._key);
  }
}
class Ih {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function tt(e, t, n) {
  return at(e) ? e : Re(e) ? new Ih(e) : Je(e) && arguments.length > 1 ? dd(e, t, n) : te(e);
}
function dd(e, t, n) {
  const o = e[t];
  return at(o) ? o : new $h(e, t, n);
}
class Nh {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new Si(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = rs - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Qe !== this)
      return Jc(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return td(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Th(e, t, n = !1) {
  let o, s;
  return Re(e) ? o = e : (o = e.get, s = e.set), new Nh(o, s, n);
}
const Ms = {}, si = /* @__PURE__ */ new WeakMap();
let eo;
function Mh(e, t = !1, n = eo) {
  if (n) {
    let o = si.get(n);
    o || si.set(n, o = []), o.push(e);
  }
}
function Ph(e, t, n = Ze) {
  const { immediate: o, deep: s, once: i, scheduler: l, augmentJob: r, call: u } = n, c = (x) => s ? x : Yt(x) || s === !1 || s === 0 ? wn(x, 1) : wn(x);
  let d, f, p, h, b = !1, C = !1;
  if (at(e) ? (f = () => e.value, b = Yt(e)) : xo(e) ? (f = () => c(e), b = !0) : Ne(e) ? (C = !0, b = e.some((x) => xo(x) || Yt(x)), f = () => e.map((x) => {
    if (at(x))
      return x.value;
    if (xo(x))
      return c(x);
    if (Re(x))
      return u ? u(x, 2) : x();
  })) : Re(e) ? t ? f = u ? () => u(e, 2) : e : f = () => {
    if (p) {
      Kn();
      try {
        p();
      } finally {
        Wn();
      }
    }
    const x = eo;
    eo = d;
    try {
      return u ? u(e, 3, [h]) : e(h);
    } finally {
      eo = x;
    }
  } : f = cn, t && s) {
    const x = f, z = s === !0 ? 1 / 0 : s;
    f = () => wn(x(), z);
  }
  const M = pr(), P = () => {
    d.stop(), M && M.active && cr(M.effects, d);
  };
  if (i && t) {
    const x = t;
    t = (...z) => {
      x(...z), P();
    };
  }
  let L = C ? new Array(e.length).fill(Ms) : Ms;
  const E = (x) => {
    if (!(!(d.flags & 1) || !d.dirty && !x))
      if (t) {
        const z = d.run();
        if (s || b || (C ? z.some((Y, Z) => xn(Y, L[Z])) : xn(z, L))) {
          p && p();
          const Y = eo;
          eo = d;
          try {
            const Z = [
              z,
              // pass undefined as the old value when it's changed for the first time
              L === Ms ? void 0 : C && L[0] === Ms ? [] : L,
              h
            ];
            u ? u(t, 3, Z) : (
              // @ts-expect-error
              t(...Z)
            ), L = z;
          } finally {
            eo = Y;
          }
        }
      } else
        d.run();
  };
  return r && r(E), d = new Wc(f), d.scheduler = l ? () => l(E, !1) : E, h = (x) => Mh(x, !1, d), p = d.onStop = () => {
    const x = si.get(d);
    if (x) {
      if (u)
        u(x, 4);
      else
        for (const z of x) z();
      si.delete(d);
    }
  }, t ? o ? E(!0) : L = d.run() : l ? l(E.bind(null, !0), !0) : d.run(), P.pause = d.pause.bind(d), P.resume = d.resume.bind(d), P.stop = P, P;
}
function wn(e, t = 1 / 0, n) {
  if (t <= 0 || !Je(e) || e.__v_skip || (n = n || /* @__PURE__ */ new Set(), n.has(e)))
    return e;
  if (n.add(e), t--, at(e))
    wn(e.value, t, n);
  else if (Ne(e))
    for (let o = 0; o < e.length; o++)
      wn(e[o], t, n);
  else if (Vo(e) || Co(e))
    e.forEach((o) => {
      wn(o, t, n);
    });
  else if (Uc(e)) {
    for (const o in e)
      wn(e[o], t, n);
    for (const o of Object.getOwnPropertySymbols(e))
      Object.prototype.propertyIsEnumerable.call(e, o) && wn(e[o], t, n);
  }
  return e;
}
/**
* @vue/runtime-core v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
function ks(e, t, n, o) {
  try {
    return o ? e(...o) : e();
  } catch (s) {
    Ii(s, t, n);
  }
}
function hn(e, t, n, o) {
  if (Re(e)) {
    const s = ks(e, t, n, o);
    return s && Bc(s) && s.catch((i) => {
      Ii(i, t, n);
    }), s;
  }
  if (Ne(e)) {
    const s = [];
    for (let i = 0; i < e.length; i++)
      s.push(hn(e[i], t, n, o));
    return s;
  }
}
function Ii(e, t, n, o = !0) {
  const s = t ? t.vnode : null, { errorHandler: i, throwUnhandledErrorInProduction: l } = t && t.appContext.config || Ze;
  if (t) {
    let r = t.parent;
    const u = t.proxy, c = `https://vuejs.org/error-reference/#runtime-${n}`;
    for (; r; ) {
      const d = r.ec;
      if (d) {
        for (let f = 0; f < d.length; f++)
          if (d[f](e, u, c) === !1)
            return;
      }
      r = r.parent;
    }
    if (i) {
      Kn(), ks(i, null, 10, [
        e,
        u,
        c
      ]), Wn();
      return;
    }
  }
  Oh(e, n, s, o, l);
}
function Oh(e, t, n, o = !0, s = !1) {
  if (s)
    throw e;
  console.error(e);
}
const Rt = [];
let ln = -1;
const So = [];
let An = null, wo = 0;
const fd = /* @__PURE__ */ Promise.resolve();
let ii = null;
function _t(e) {
  const t = ii || fd;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Ah(e) {
  let t = ln + 1, n = Rt.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = Rt[o], i = us(s);
    i < e || i === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function wr(e) {
  if (!(e.flags & 1)) {
    const t = us(e), n = Rt[Rt.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= us(n) ? Rt.push(e) : Rt.splice(Ah(t), 0, e), e.flags |= 1, pd();
  }
}
function pd() {
  ii || (ii = fd.then(vd));
}
function Dh(e) {
  Ne(e) ? So.push(...e) : An && e.id === -1 ? An.splice(wo + 1, 0, e) : e.flags & 1 || (So.push(e), e.flags |= 1), pd();
}
function Ya(e, t, n = ln + 1) {
  for (; n < Rt.length; n++) {
    const o = Rt[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid)
        continue;
      Rt.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function hd(e) {
  if (So.length) {
    const t = [...new Set(So)].sort(
      (n, o) => us(n) - us(o)
    );
    if (So.length = 0, An) {
      An.push(...t);
      return;
    }
    for (An = t, wo = 0; wo < An.length; wo++) {
      const n = An[wo];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    An = null, wo = 0;
  }
}
const us = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function vd(e) {
  try {
    for (ln = 0; ln < Rt.length; ln++) {
      const t = Rt[ln];
      t && !(t.flags & 8) && (t.flags & 4 && (t.flags &= -2), ks(
        t,
        t.i,
        t.i ? 15 : 14
      ), t.flags & 4 || (t.flags &= -2));
    }
  } finally {
    for (; ln < Rt.length; ln++) {
      const t = Rt[ln];
      t && (t.flags &= -2);
    }
    ln = -1, Rt.length = 0, hd(), ii = null, (Rt.length || So.length) && vd();
  }
}
let kt = null, gd = null;
function li(e) {
  const t = kt;
  return kt = e, gd = e && e.type.__scopeId || null, t;
}
function jn(e, t = kt, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && lu(-1);
    const i = li(t);
    let l;
    try {
      l = e(...s);
    } finally {
      li(i), o._d && lu(1);
    }
    return l;
  };
  return o._n = !0, o._c = !0, o._d = !0, o;
}
function De(e, t) {
  if (kt === null)
    return e;
  const n = Oi(kt), o = e.dirs || (e.dirs = []);
  for (let s = 0; s < t.length; s++) {
    let [i, l, r, u = Ze] = t[s];
    i && (Re(i) && (i = {
      mounted: i,
      updated: i
    }), i.deep && wn(l), o.push({
      dir: i,
      instance: n,
      value: l,
      oldValue: void 0,
      arg: r,
      modifiers: u
    }));
  }
  return e;
}
function Zn(e, t, n, o) {
  const s = e.dirs, i = t && t.dirs;
  for (let l = 0; l < s.length; l++) {
    const r = s[l];
    i && (r.oldValue = i[l].value);
    let u = r.dir[o];
    u && (Kn(), hn(u, n, 8, [
      e.el,
      r,
      e,
      t
    ]), Wn());
  }
}
const md = Symbol("_vte"), Rh = (e) => e.__isTeleport, ts = (e) => e && (e.disabled || e.disabled === ""), Xa = (e) => e && (e.defer || e.defer === ""), Ka = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Wa = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Nl = (e, t) => {
  const n = e && e.to;
  return nt(n) ? t ? t(n) : null : n;
}, yd = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, o, s, i, l, r, u, c) {
    const {
      mc: d,
      pc: f,
      pbc: p,
      o: { insert: h, querySelector: b, createText: C, createComment: M }
    } = c, P = ts(t.props);
    let { shapeFlag: L, children: E, dynamicChildren: x } = t;
    if (e == null) {
      const z = t.el = C(""), Y = t.anchor = C("");
      h(z, n, o), h(Y, n, o);
      const Z = (T, X) => {
        L & 16 && (s && s.isCE && (s.ce._teleportTarget = T), d(
          E,
          T,
          X,
          s,
          i,
          l,
          r,
          u
        ));
      }, H = () => {
        const T = t.target = Nl(t.props, b), X = bd(T, t, C, h);
        T && (l !== "svg" && Ka(T) ? l = "svg" : l !== "mathml" && Wa(T) && (l = "mathml"), P || (Z(T, X), qs(t, !1)));
      };
      P && (Z(n, Y), qs(t, !0)), Xa(t.props) ? At(() => {
        H(), t.el.__isMounted = !0;
      }, i) : H();
    } else {
      if (Xa(t.props) && !e.el.__isMounted) {
        At(() => {
          yd.process(
            e,
            t,
            n,
            o,
            s,
            i,
            l,
            r,
            u,
            c
          ), delete e.el.__isMounted;
        }, i);
        return;
      }
      t.el = e.el, t.targetStart = e.targetStart;
      const z = t.anchor = e.anchor, Y = t.target = e.target, Z = t.targetAnchor = e.targetAnchor, H = ts(e.props), T = H ? n : Y, X = H ? z : Z;
      if (l === "svg" || Ka(Y) ? l = "svg" : (l === "mathml" || Wa(Y)) && (l = "mathml"), x ? (p(
        e.dynamicChildren,
        x,
        T,
        s,
        i,
        l,
        r
      ), xr(e, t, !0)) : u || f(
        e,
        t,
        T,
        X,
        s,
        i,
        l,
        r,
        !1
      ), P)
        H ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Ps(
          t,
          n,
          z,
          c,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const q = t.target = Nl(
          t.props,
          b
        );
        q && Ps(
          t,
          q,
          null,
          c,
          0
        );
      } else H && Ps(
        t,
        Y,
        Z,
        c,
        1
      );
      qs(t, P);
    }
  },
  remove(e, t, n, { um: o, o: { remove: s } }, i) {
    const {
      shapeFlag: l,
      children: r,
      anchor: u,
      targetStart: c,
      targetAnchor: d,
      target: f,
      props: p
    } = e;
    if (f && (s(c), s(d)), i && s(u), l & 16) {
      const h = i || !ts(p);
      for (let b = 0; b < r.length; b++) {
        const C = r[b];
        o(
          C,
          t,
          n,
          h,
          !!C.dynamicChildren
        );
      }
    }
  },
  move: Ps,
  hydrate: Lh
};
function Ps(e, t, n, { o: { insert: o }, m: s }, i = 2) {
  i === 0 && o(e.targetAnchor, t, n);
  const { el: l, anchor: r, shapeFlag: u, children: c, props: d } = e, f = i === 2;
  if (f && o(l, t, n), (!f || ts(d)) && u & 16)
    for (let p = 0; p < c.length; p++)
      s(
        c[p],
        t,
        n,
        2
      );
  f && o(r, t, n);
}
function Lh(e, t, n, o, s, i, {
  o: { nextSibling: l, parentNode: r, querySelector: u, insert: c, createText: d }
}, f) {
  const p = t.target = Nl(
    t.props,
    u
  );
  if (p) {
    const h = ts(t.props), b = p._lpa || p.firstChild;
    if (t.shapeFlag & 16)
      if (h)
        t.anchor = f(
          l(e),
          t,
          r(e),
          n,
          o,
          s,
          i
        ), t.targetStart = b, t.targetAnchor = b && l(b);
      else {
        t.anchor = l(e);
        let C = b;
        for (; C; ) {
          if (C && C.nodeType === 8) {
            if (C.data === "teleport start anchor")
              t.targetStart = C;
            else if (C.data === "teleport anchor") {
              t.targetAnchor = C, p._lpa = t.targetAnchor && l(t.targetAnchor);
              break;
            }
          }
          C = l(C);
        }
        t.targetAnchor || bd(p, t, d, c), f(
          b && l(b),
          t,
          p,
          n,
          o,
          s,
          i
        );
      }
    qs(t, h);
  }
  return t.anchor && l(t.anchor);
}
const Vh = yd;
function qs(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let o, s;
    for (t ? (o = e.el, s = e.anchor) : (o = e.targetStart, s = e.targetAnchor); o && o !== s; )
      o.nodeType === 1 && o.setAttribute("data-v-owner", n.uid), o = o.nextSibling;
    n.ut();
  }
}
function bd(e, t, n, o) {
  const s = t.targetStart = n(""), i = t.targetAnchor = n("");
  return s[md] = i, e && (o(s, e), o(i, e)), i;
}
function kr(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, kr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
}
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function He(e, t) {
  return Re(e) ? (
    // #8236: extend call and options.name access are considered side-effects
    // by Rollup, so we have to wrap it in a pure-annotated IIFE.
    Tt({ name: e.name }, t, { setup: e })
  ) : e;
}
function _d(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function ri(e, t, n, o, s = !1) {
  if (Ne(e)) {
    e.forEach(
      (b, C) => ri(
        b,
        t && (Ne(t) ? t[C] : t),
        n,
        o,
        s
      )
    );
    return;
  }
  if ($o(o) && !s) {
    o.shapeFlag & 512 && o.type.__asyncResolved && o.component.subTree.component && ri(e, t, n, o.component.subTree);
    return;
  }
  const i = o.shapeFlag & 4 ? Oi(o.component) : o.el, l = s ? null : i, { i: r, r: u } = e, c = t && t.r, d = r.refs === Ze ? r.refs = {} : r.refs, f = r.setupState, p = Ye(f), h = f === Ze ? () => !1 : (b) => Ke(p, b);
  if (c != null && c !== u && (nt(c) ? (d[c] = null, h(c) && (f[c] = null)) : at(c) && (c.value = null)), Re(u))
    ks(u, r, 12, [l, d]);
  else {
    const b = nt(u), C = at(u);
    if (b || C) {
      const M = () => {
        if (e.f) {
          const P = b ? h(u) ? f[u] : d[u] : u.value;
          s ? Ne(P) && cr(P, i) : Ne(P) ? P.includes(i) || P.push(i) : b ? (d[u] = [i], h(u) && (f[u] = d[u])) : (u.value = [i], e.k && (d[e.k] = u.value));
        } else b ? (d[u] = l, h(u) && (f[u] = l)) : C && (u.value = l, e.k && (d[e.k] = l));
      };
      l ? (M.id = -1, At(M, n)) : M();
    }
  }
}
xi().requestIdleCallback;
xi().cancelIdleCallback;
const $o = (e) => !!e.type.__asyncLoader, wd = (e) => e.type.__isKeepAlive;
function zh(e, t) {
  kd(e, "a", t);
}
function Fh(e, t) {
  kd(e, "da", t);
}
function kd(e, t, n = Ct) {
  const o = e.__wdc || (e.__wdc = () => {
    let s = n;
    for (; s; ) {
      if (s.isDeactivated)
        return;
      s = s.parent;
    }
    return e();
  });
  if (Ni(t, o, n), n) {
    let s = n.parent;
    for (; s && s.parent; )
      wd(s.parent.vnode) && Bh(o, t, n, s), s = s.parent;
  }
}
function Bh(e, t, n, o) {
  const s = Ni(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  Ti(() => {
    cr(o[t], s);
  }, n);
}
function Ni(e, t, n = Ct, o = !1) {
  if (n) {
    const s = n[e] || (n[e] = []), i = t.__weh || (t.__weh = (...l) => {
      Kn();
      const r = Es(n), u = hn(t, n, e, l);
      return r(), Wn(), u;
    });
    return o ? s.unshift(i) : s.push(i), i;
  }
}
const Tn = (e) => (t, n = Ct) => {
  (!ds || e === "sp") && Ni(e, (...o) => t(...o), n);
}, Ed = Tn("bm"), xt = Tn("m"), Hh = Tn(
  "bu"
), Uh = Tn("u"), Mn = Tn(
  "bum"
), Ti = Tn("um"), jh = Tn(
  "sp"
), Gh = Tn("rtg"), qh = Tn("rtc");
function Yh(e, t = Ct) {
  Ni("ec", e, t);
}
const Cd = "components";
function xd(e, t) {
  return $d(Cd, e, !0, t) || e;
}
const Sd = Symbol.for("v-ndc");
function Er(e) {
  return nt(e) ? $d(Cd, e, !1) || e : e || Sd;
}
function $d(e, t, n = !0, o = !1) {
  const s = kt || Ct;
  if (s) {
    const i = s.type;
    {
      const r = Ov(
        i,
        !1
      );
      if (r && (r === t || r === Xt(t) || r === Ci(Xt(t))))
        return i;
    }
    const l = (
      // local registration
      // check instance[type] first which is resolved for options API
      Za(s[e] || i[e], t) || // global registration
      Za(s.appContext[e], t)
    );
    return !l && o ? i : l;
  }
}
function Za(e, t) {
  return e && (e[t] || e[Xt(t)] || e[Ci(Xt(t))]);
}
function Ve(e, t, n, o) {
  let s;
  const i = n && n[o], l = Ne(e);
  if (l || nt(e)) {
    const r = l && xo(e);
    let u = !1;
    r && (u = !Yt(e), e = $i(e)), s = new Array(e.length);
    for (let c = 0, d = e.length; c < d; c++)
      s[c] = t(
        u ? Nt(e[c]) : e[c],
        c,
        void 0,
        i && i[c]
      );
  } else if (typeof e == "number") {
    s = new Array(e);
    for (let r = 0; r < e; r++)
      s[r] = t(r + 1, r, void 0, i && i[r]);
  } else if (Je(e))
    if (e[Symbol.iterator])
      s = Array.from(
        e,
        (r, u) => t(r, u, void 0, i && i[u])
      );
    else {
      const r = Object.keys(e);
      s = new Array(r.length);
      for (let u = 0, c = r.length; u < c; u++) {
        const d = r[u];
        s[u] = t(e[d], d, u, i && i[u]);
      }
    }
  else
    s = [];
  return n && (n[o] = s), s;
}
function fo(e, t, n = {}, o, s) {
  if (kt.ce || kt.parent && $o(kt.parent) && kt.parent.ce)
    return t !== "default" && (n.name = t), v(), ht(
      xe,
      null,
      [ne("slot", n, o && o())],
      64
    );
  let i = e[t];
  i && i._c && (i._d = !1), v();
  const l = i && Id(i(n)), r = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  l && l.key, u = ht(
    xe,
    {
      key: (r && !en(r) ? r : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!l && o ? "_fb" : "")
    },
    l || (o ? o() : []),
    l && e._ === 1 ? 64 : -2
  );
  return u.scopeId && (u.slotScopeIds = [u.scopeId + "-s"]), i && i._c && (i._d = !0), u;
}
function Id(e) {
  return e.some((t) => cs(t) ? !(t.type === qn || t.type === xe && !Id(t.children)) : !0) ? e : null;
}
const Tl = (e) => e ? Wd(e) ? Oi(e) : Tl(e.parent) : null, ns = (
  // Move PURE marker to new line to workaround compiler discarding it
  // due to type annotation
  /* @__PURE__ */ Tt(/* @__PURE__ */ Object.create(null), {
    $: (e) => e,
    $el: (e) => e.vnode.el,
    $data: (e) => e.data,
    $props: (e) => e.props,
    $attrs: (e) => e.attrs,
    $slots: (e) => e.slots,
    $refs: (e) => e.refs,
    $parent: (e) => Tl(e.parent),
    $root: (e) => Tl(e.root),
    $host: (e) => e.ce,
    $emit: (e) => e.emit,
    $options: (e) => Pd(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      wr(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = _t.bind(e.proxy)),
    $watch: (e) => gv.bind(e)
  })
), el = (e, t) => e !== Ze && !e.__isScriptSetup && Ke(e, t), Xh = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: s, props: i, accessCache: l, type: r, appContext: u } = e;
    let c;
    if (t[0] !== "$") {
      const h = l[t];
      if (h !== void 0)
        switch (h) {
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
        if (el(o, t))
          return l[t] = 1, o[t];
        if (s !== Ze && Ke(s, t))
          return l[t] = 2, s[t];
        if (
          // only cache other properties when instance has declared (thus stable)
          // props
          (c = e.propsOptions[0]) && Ke(c, t)
        )
          return l[t] = 3, i[t];
        if (n !== Ze && Ke(n, t))
          return l[t] = 4, n[t];
        Ml && (l[t] = 0);
      }
    }
    const d = ns[t];
    let f, p;
    if (d)
      return t === "$attrs" && It(e.attrs, "get", ""), d(e);
    if (
      // css module (injected by vue-loader)
      (f = r.__cssModules) && (f = f[t])
    )
      return f;
    if (n !== Ze && Ke(n, t))
      return l[t] = 4, n[t];
    if (
      // global properties
      p = u.config.globalProperties, Ke(p, t)
    )
      return p[t];
  },
  set({ _: e }, t, n) {
    const { data: o, setupState: s, ctx: i } = e;
    return el(s, t) ? (s[t] = n, !0) : o !== Ze && Ke(o, t) ? (o[t] = n, !0) : Ke(e.props, t) || t[0] === "$" && t.slice(1) in e ? !1 : (i[t] = n, !0);
  },
  has({
    _: { data: e, setupState: t, accessCache: n, ctx: o, appContext: s, propsOptions: i }
  }, l) {
    let r;
    return !!n[l] || e !== Ze && Ke(e, l) || el(t, l) || (r = i[0]) && Ke(r, l) || Ke(o, l) || Ke(ns, l) || Ke(s.config.globalProperties, l);
  },
  defineProperty(e, t, n) {
    return n.get != null ? e._.accessCache[t] = 0 : Ke(n, "value") && this.set(e, t, n.value, null), Reflect.defineProperty(e, t, n);
  }
};
function Kh() {
  return Nd().slots;
}
function Wh() {
  return Nd().attrs;
}
function Nd() {
  const e = zo();
  return e.setupContext || (e.setupContext = Jd(e));
}
function Ja(e) {
  return Ne(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Td(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || Object.defineProperty(n, o, {
      enumerable: !0,
      get: () => e[o]
    });
  return n;
}
let Ml = !0;
function Zh(e) {
  const t = Pd(e), n = e.proxy, o = e.ctx;
  Ml = !1, t.beforeCreate && Qa(t.beforeCreate, e, "bc");
  const {
    // state
    data: s,
    computed: i,
    methods: l,
    watch: r,
    provide: u,
    inject: c,
    // lifecycle
    created: d,
    beforeMount: f,
    mounted: p,
    beforeUpdate: h,
    updated: b,
    activated: C,
    deactivated: M,
    beforeDestroy: P,
    beforeUnmount: L,
    destroyed: E,
    unmounted: x,
    render: z,
    renderTracked: Y,
    renderTriggered: Z,
    errorCaptured: H,
    serverPrefetch: T,
    // public API
    expose: X,
    inheritAttrs: q,
    // assets
    components: V,
    directives: R,
    filters: k
  } = t;
  if (c && Jh(c, o, null), l)
    for (const B in l) {
      const G = l[B];
      Re(G) && (o[B] = G.bind(n));
    }
  if (s) {
    const B = s.call(n, n);
    Je(B) && (e.data = un(B));
  }
  if (Ml = !0, i)
    for (const B in i) {
      const G = i[B], ie = Re(G) ? G.bind(n, n) : Re(G.get) ? G.get.bind(n, n) : cn, de = !Re(G) && Re(G.set) ? G.set.bind(n) : cn, ve = ae({
        get: ie,
        set: de
      });
      Object.defineProperty(o, B, {
        enumerable: !0,
        configurable: !0,
        get: () => ve.value,
        set: (re) => ve.value = re
      });
    }
  if (r)
    for (const B in r)
      Md(r[B], o, n, B);
  if (u) {
    const B = Re(u) ? u.call(n) : u;
    Reflect.ownKeys(B).forEach((G) => {
      po(G, B[G]);
    });
  }
  d && Qa(d, e, "c");
  function O(B, G) {
    Ne(G) ? G.forEach((ie) => B(ie.bind(n))) : G && B(G.bind(n));
  }
  if (O(Ed, f), O(xt, p), O(Hh, h), O(Uh, b), O(zh, C), O(Fh, M), O(Yh, H), O(qh, Y), O(Gh, Z), O(Mn, L), O(Ti, x), O(jh, T), Ne(X))
    if (X.length) {
      const B = e.exposed || (e.exposed = {});
      X.forEach((G) => {
        Object.defineProperty(B, G, {
          get: () => n[G],
          set: (ie) => n[G] = ie
        });
      });
    } else e.exposed || (e.exposed = {});
  z && e.render === cn && (e.render = z), q != null && (e.inheritAttrs = q), V && (e.components = V), R && (e.directives = R), T && _d(e);
}
function Jh(e, t, n = cn) {
  Ne(e) && (e = Pl(e));
  for (const o in e) {
    const s = e[o];
    let i;
    Je(s) ? "default" in s ? i = dn(
      s.from || o,
      s.default,
      !0
    ) : i = dn(s.from || o) : i = dn(s), at(i) ? Object.defineProperty(t, o, {
      enumerable: !0,
      configurable: !0,
      get: () => i.value,
      set: (l) => i.value = l
    }) : t[o] = i;
  }
}
function Qa(e, t, n) {
  hn(
    Ne(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Md(e, t, n, o) {
  let s = o.includes(".") ? Gd(n, o) : () => n[o];
  if (nt(e)) {
    const i = t[e];
    Re(i) && ze(s, i);
  } else if (Re(e))
    ze(s, e.bind(n));
  else if (Je(e))
    if (Ne(e))
      e.forEach((i) => Md(i, t, n, o));
    else {
      const i = Re(e.handler) ? e.handler.bind(n) : t[e.handler];
      Re(i) && ze(s, i, e);
    }
}
function Pd(e) {
  const t = e.type, { mixins: n, extends: o } = t, {
    mixins: s,
    optionsCache: i,
    config: { optionMergeStrategies: l }
  } = e.appContext, r = i.get(t);
  let u;
  return r ? u = r : !s.length && !n && !o ? u = t : (u = {}, s.length && s.forEach(
    (c) => ai(u, c, l, !0)
  ), ai(u, t, l)), Je(t) && i.set(t, u), u;
}
function ai(e, t, n, o = !1) {
  const { mixins: s, extends: i } = t;
  i && ai(e, i, n, !0), s && s.forEach(
    (l) => ai(e, l, n, !0)
  );
  for (const l in t)
    if (!(o && l === "expose")) {
      const r = Qh[l] || n && n[l];
      e[l] = r ? r(e[l], t[l]) : t[l];
    }
  return e;
}
const Qh = {
  data: eu,
  props: tu,
  emits: tu,
  // objects
  methods: Yo,
  computed: Yo,
  // lifecycle
  beforeCreate: Ot,
  created: Ot,
  beforeMount: Ot,
  mounted: Ot,
  beforeUpdate: Ot,
  updated: Ot,
  beforeDestroy: Ot,
  beforeUnmount: Ot,
  destroyed: Ot,
  unmounted: Ot,
  activated: Ot,
  deactivated: Ot,
  errorCaptured: Ot,
  serverPrefetch: Ot,
  // assets
  components: Yo,
  directives: Yo,
  // watch
  watch: tv,
  // provide / inject
  provide: eu,
  inject: ev
};
function eu(e, t) {
  return t ? e ? function() {
    return Tt(
      Re(e) ? e.call(this, this) : e,
      Re(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function ev(e, t) {
  return Yo(Pl(e), Pl(t));
}
function Pl(e) {
  if (Ne(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++)
      t[e[n]] = e[n];
    return t;
  }
  return e;
}
function Ot(e, t) {
  return e ? [...new Set([].concat(e, t))] : t;
}
function Yo(e, t) {
  return e ? Tt(/* @__PURE__ */ Object.create(null), e, t) : t;
}
function tu(e, t) {
  return e ? Ne(e) && Ne(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Tt(
    /* @__PURE__ */ Object.create(null),
    Ja(e),
    Ja(t ?? {})
  ) : t;
}
function tv(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Tt(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = Ot(e[o], t[o]);
  return n;
}
function Od() {
  return {
    app: null,
    config: {
      isNativeTag: Up,
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
let nv = 0;
function ov(e, t) {
  return function(o, s = null) {
    Re(o) || (o = Tt({}, o)), s != null && !Je(s) && (s = null);
    const i = Od(), l = /* @__PURE__ */ new WeakSet(), r = [];
    let u = !1;
    const c = i.app = {
      _uid: nv++,
      _component: o,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: Rv,
      get config() {
        return i.config;
      },
      set config(d) {
      },
      use(d, ...f) {
        return l.has(d) || (d && Re(d.install) ? (l.add(d), d.install(c, ...f)) : Re(d) && (l.add(d), d(c, ...f))), c;
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
      mount(d, f, p) {
        if (!u) {
          const h = c._ceVNode || ne(o, s);
          return h.appContext = i, p === !0 ? p = "svg" : p === !1 && (p = void 0), e(h, d, p), u = !0, c._container = d, d.__vue_app__ = c, Oi(h.component);
        }
      },
      onUnmount(d) {
        r.push(d);
      },
      unmount() {
        u && (hn(
          r,
          c._instance,
          16
        ), e(null, c._container), delete c._container.__vue_app__);
      },
      provide(d, f) {
        return i.provides[d] = f, c;
      },
      runWithContext(d) {
        const f = Io;
        Io = c;
        try {
          return d();
        } finally {
          Io = f;
        }
      }
    };
    return c;
  };
}
let Io = null;
function po(e, t) {
  if (Ct) {
    let n = Ct.provides;
    const o = Ct.parent && Ct.parent.provides;
    o === n && (n = Ct.provides = Object.create(o)), n[e] = t;
  }
}
function dn(e, t, n = !1) {
  const o = Ct || kt;
  if (o || Io) {
    const s = Io ? Io._context.provides : o ? o.parent == null ? o.vnode.appContext && o.vnode.appContext.provides : o.parent.provides : void 0;
    if (s && e in s)
      return s[e];
    if (arguments.length > 1)
      return n && Re(t) ? t.call(o && o.proxy) : t;
  }
}
const Ad = {}, Dd = () => Object.create(Ad), Rd = (e) => Object.getPrototypeOf(e) === Ad;
function sv(e, t, n, o = !1) {
  const s = {}, i = Dd();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Ld(e, t, s, i);
  for (const l in e.propsOptions[0])
    l in s || (s[l] = void 0);
  n ? e.props = o ? s : _h(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i;
}
function iv(e, t, n, o) {
  const {
    props: s,
    attrs: i,
    vnode: { patchFlag: l }
  } = e, r = Ye(s), [u] = e.propsOptions;
  let c = !1;
  if (
    // always force full diff in dev
    // - #1942 if hmr is enabled with sfc component
    // - vite#872 non-sfc component used by sfc component
    (o || l > 0) && !(l & 16)
  ) {
    if (l & 8) {
      const d = e.vnode.dynamicProps;
      for (let f = 0; f < d.length; f++) {
        let p = d[f];
        if (Mi(e.emitsOptions, p))
          continue;
        const h = t[p];
        if (u)
          if (Ke(i, p))
            h !== i[p] && (i[p] = h, c = !0);
          else {
            const b = Xt(p);
            s[b] = Ol(
              u,
              r,
              b,
              h,
              e,
              !1
            );
          }
        else
          h !== i[p] && (i[p] = h, c = !0);
      }
    }
  } else {
    Ld(e, t, s, i) && (c = !0);
    let d;
    for (const f in r)
      (!t || // for camelCase
      !Ke(t, f) && // it's possible the original props was passed in as kebab-case
      // and converted to camelCase (#955)
      ((d = Xn(f)) === f || !Ke(t, d))) && (u ? n && // for camelCase
      (n[f] !== void 0 || // for kebab-case
      n[d] !== void 0) && (s[f] = Ol(
        u,
        r,
        f,
        void 0,
        e,
        !0
      )) : delete s[f]);
    if (i !== r)
      for (const f in i)
        (!t || !Ke(t, f)) && (delete i[f], c = !0);
  }
  c && _n(e.attrs, "set", "");
}
function Ld(e, t, n, o) {
  const [s, i] = e.propsOptions;
  let l = !1, r;
  if (t)
    for (let u in t) {
      if (Jo(u))
        continue;
      const c = t[u];
      let d;
      s && Ke(s, d = Xt(u)) ? !i || !i.includes(d) ? n[d] = c : (r || (r = {}))[d] = c : Mi(e.emitsOptions, u) || (!(u in o) || c !== o[u]) && (o[u] = c, l = !0);
    }
  if (i) {
    const u = Ye(n), c = r || Ze;
    for (let d = 0; d < i.length; d++) {
      const f = i[d];
      n[f] = Ol(
        s,
        u,
        f,
        c[f],
        e,
        !Ke(c, f)
      );
    }
  }
  return l;
}
function Ol(e, t, n, o, s, i) {
  const l = e[n];
  if (l != null) {
    const r = Ke(l, "default");
    if (r && o === void 0) {
      const u = l.default;
      if (l.type !== Function && !l.skipFactory && Re(u)) {
        const { propsDefaults: c } = s;
        if (n in c)
          o = c[n];
        else {
          const d = Es(s);
          o = c[n] = u.call(
            null,
            t
          ), d();
        }
      } else
        o = u;
      s.ce && s.ce._setProp(n, o);
    }
    l[
      0
      /* shouldCast */
    ] && (i && !r ? o = !1 : l[
      1
      /* shouldCastTrue */
    ] && (o === "" || o === Xn(n)) && (o = !0));
  }
  return o;
}
const lv = /* @__PURE__ */ new WeakMap();
function Vd(e, t, n = !1) {
  const o = n ? lv : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const i = e.props, l = {}, r = [];
  let u = !1;
  if (!Re(e)) {
    const d = (f) => {
      u = !0;
      const [p, h] = Vd(f, t, !0);
      Tt(l, p), h && r.push(...h);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!i && !u)
    return Je(e) && o.set(e, Eo), Eo;
  if (Ne(i))
    for (let d = 0; d < i.length; d++) {
      const f = Xt(i[d]);
      nu(f) && (l[f] = Ze);
    }
  else if (i)
    for (const d in i) {
      const f = Xt(d);
      if (nu(f)) {
        const p = i[d], h = l[f] = Ne(p) || Re(p) ? { type: p } : Tt({}, p), b = h.type;
        let C = !1, M = !0;
        if (Ne(b))
          for (let P = 0; P < b.length; ++P) {
            const L = b[P], E = Re(L) && L.name;
            if (E === "Boolean") {
              C = !0;
              break;
            } else E === "String" && (M = !1);
          }
        else
          C = Re(b) && b.name === "Boolean";
        h[
          0
          /* shouldCast */
        ] = C, h[
          1
          /* shouldCastTrue */
        ] = M, (C || Ke(h, "default")) && r.push(f);
      }
    }
  const c = [l, r];
  return Je(e) && o.set(e, c), c;
}
function nu(e) {
  return e[0] !== "$" && !Jo(e);
}
const zd = (e) => e[0] === "_" || e === "$stable", Cr = (e) => Ne(e) ? e.map(an) : [an(e)], rv = (e, t, n) => {
  if (t._n)
    return t;
  const o = jn((...s) => Cr(t(...s)), n);
  return o._c = !1, o;
}, Fd = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (zd(s)) continue;
    const i = e[s];
    if (Re(i))
      t[s] = rv(s, i, o);
    else if (i != null) {
      const l = Cr(i);
      t[s] = () => l;
    }
  }
}, Bd = (e, t) => {
  const n = Cr(t);
  e.slots.default = () => n;
}, Hd = (e, t, n) => {
  for (const o in t)
    (n || o !== "_") && (e[o] = t[o]);
}, av = (e, t, n) => {
  const o = e.slots = Dd();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Hd(o, t, n), n && jc(o, "_", s, !0)) : Fd(t, o);
  } else t && Bd(e, t);
}, uv = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let i = !0, l = Ze;
  if (o.shapeFlag & 32) {
    const r = t._;
    r ? n && r === 1 ? i = !1 : Hd(s, t, n) : (i = !t.$stable, Fd(t, s)), l = t;
  } else t && (Bd(e, t), l = { default: 1 });
  if (i)
    for (const r in s)
      !zd(r) && l[r] == null && delete s[r];
}, At = Ev;
function cv(e) {
  return dv(e);
}
function dv(e, t) {
  const n = xi();
  n.__VUE__ = !0;
  const {
    insert: o,
    remove: s,
    patchProp: i,
    createElement: l,
    createText: r,
    createComment: u,
    setText: c,
    setElementText: d,
    parentNode: f,
    nextSibling: p,
    setScopeId: h = cn,
    insertStaticContent: b
  } = e, C = ($, A, m, y = null, w = null, S = null, j = void 0, K = null, Q = !!A.dynamicChildren) => {
    if ($ === A)
      return;
    $ && !Uo($, A) && (y = Me($), re($, w, S, !0), $ = null), A.patchFlag === -2 && (Q = !1, A.dynamicChildren = null);
    const { type: W, ref: fe, shapeFlag: ue } = A;
    switch (W) {
      case Pi:
        M($, A, m, y);
        break;
      case qn:
        P($, A, m, y);
        break;
      case Ys:
        $ == null && L(A, m, y, j);
        break;
      case xe:
        V(
          $,
          A,
          m,
          y,
          w,
          S,
          j,
          K,
          Q
        );
        break;
      default:
        ue & 1 ? z(
          $,
          A,
          m,
          y,
          w,
          S,
          j,
          K,
          Q
        ) : ue & 6 ? R(
          $,
          A,
          m,
          y,
          w,
          S,
          j,
          K,
          Q
        ) : (ue & 64 || ue & 128) && W.process(
          $,
          A,
          m,
          y,
          w,
          S,
          j,
          K,
          Q,
          Ee
        );
    }
    fe != null && w && ri(fe, $ && $.ref, S, A || $, !A);
  }, M = ($, A, m, y) => {
    if ($ == null)
      o(
        A.el = r(A.children),
        m,
        y
      );
    else {
      const w = A.el = $.el;
      A.children !== $.children && c(w, A.children);
    }
  }, P = ($, A, m, y) => {
    $ == null ? o(
      A.el = u(A.children || ""),
      m,
      y
    ) : A.el = $.el;
  }, L = ($, A, m, y) => {
    [$.el, $.anchor] = b(
      $.children,
      A,
      m,
      y,
      $.el,
      $.anchor
    );
  }, E = ({ el: $, anchor: A }, m, y) => {
    let w;
    for (; $ && $ !== A; )
      w = p($), o($, m, y), $ = w;
    o(A, m, y);
  }, x = ({ el: $, anchor: A }) => {
    let m;
    for (; $ && $ !== A; )
      m = p($), s($), $ = m;
    s(A);
  }, z = ($, A, m, y, w, S, j, K, Q) => {
    A.type === "svg" ? j = "svg" : A.type === "math" && (j = "mathml"), $ == null ? Y(
      A,
      m,
      y,
      w,
      S,
      j,
      K,
      Q
    ) : T(
      $,
      A,
      w,
      S,
      j,
      K,
      Q
    );
  }, Y = ($, A, m, y, w, S, j, K) => {
    let Q, W;
    const { props: fe, shapeFlag: ue, transition: ge, dirs: he } = $;
    if (Q = $.el = l(
      $.type,
      S,
      fe && fe.is,
      fe
    ), ue & 8 ? d(Q, $.children) : ue & 16 && H(
      $.children,
      Q,
      null,
      y,
      w,
      tl($, S),
      j,
      K
    ), he && Zn($, null, y, "created"), Z(Q, $, $.scopeId, j, y), fe) {
      for (const Be in fe)
        Be !== "value" && !Jo(Be) && i(Q, Be, null, fe[Be], S, y);
      "value" in fe && i(Q, "value", null, fe.value, S), (W = fe.onVnodeBeforeMount) && sn(W, y, $);
    }
    he && Zn($, null, y, "beforeMount");
    const Te = fv(w, ge);
    Te && ge.beforeEnter(Q), o(Q, A, m), ((W = fe && fe.onVnodeMounted) || Te || he) && At(() => {
      W && sn(W, y, $), Te && ge.enter(Q), he && Zn($, null, y, "mounted");
    }, w);
  }, Z = ($, A, m, y, w) => {
    if (m && h($, m), y)
      for (let S = 0; S < y.length; S++)
        h($, y[S]);
    if (w) {
      let S = w.subTree;
      if (A === S || Yd(S.type) && (S.ssContent === A || S.ssFallback === A)) {
        const j = w.vnode;
        Z(
          $,
          j,
          j.scopeId,
          j.slotScopeIds,
          w.parent
        );
      }
    }
  }, H = ($, A, m, y, w, S, j, K, Q = 0) => {
    for (let W = Q; W < $.length; W++) {
      const fe = $[W] = K ? Dn($[W]) : an($[W]);
      C(
        null,
        fe,
        A,
        m,
        y,
        w,
        S,
        j,
        K
      );
    }
  }, T = ($, A, m, y, w, S, j) => {
    const K = A.el = $.el;
    let { patchFlag: Q, dynamicChildren: W, dirs: fe } = A;
    Q |= $.patchFlag & 16;
    const ue = $.props || Ze, ge = A.props || Ze;
    let he;
    if (m && Jn(m, !1), (he = ge.onVnodeBeforeUpdate) && sn(he, m, A, $), fe && Zn(A, $, m, "beforeUpdate"), m && Jn(m, !0), (ue.innerHTML && ge.innerHTML == null || ue.textContent && ge.textContent == null) && d(K, ""), W ? X(
      $.dynamicChildren,
      W,
      K,
      m,
      y,
      tl(A, w),
      S
    ) : j || G(
      $,
      A,
      K,
      null,
      m,
      y,
      tl(A, w),
      S,
      !1
    ), Q > 0) {
      if (Q & 16)
        q(K, ue, ge, m, w);
      else if (Q & 2 && ue.class !== ge.class && i(K, "class", null, ge.class, w), Q & 4 && i(K, "style", ue.style, ge.style, w), Q & 8) {
        const Te = A.dynamicProps;
        for (let Be = 0; Be < Te.length; Be++) {
          const Ae = Te[Be], st = ue[Ae], mt = ge[Ae];
          (mt !== st || Ae === "value") && i(K, Ae, st, mt, w, m);
        }
      }
      Q & 1 && $.children !== A.children && d(K, A.children);
    } else !j && W == null && q(K, ue, ge, m, w);
    ((he = ge.onVnodeUpdated) || fe) && At(() => {
      he && sn(he, m, A, $), fe && Zn(A, $, m, "updated");
    }, y);
  }, X = ($, A, m, y, w, S, j) => {
    for (let K = 0; K < A.length; K++) {
      const Q = $[K], W = A[K], fe = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        Q.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (Q.type === xe || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Uo(Q, W) || // - In the case of a component, it could contain anything.
        Q.shapeFlag & 70) ? f(Q.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          m
        )
      );
      C(
        Q,
        W,
        fe,
        null,
        y,
        w,
        S,
        j,
        !0
      );
    }
  }, q = ($, A, m, y, w) => {
    if (A !== m) {
      if (A !== Ze)
        for (const S in A)
          !Jo(S) && !(S in m) && i(
            $,
            S,
            A[S],
            null,
            w,
            y
          );
      for (const S in m) {
        if (Jo(S)) continue;
        const j = m[S], K = A[S];
        j !== K && S !== "value" && i($, S, K, j, w, y);
      }
      "value" in m && i($, "value", A.value, m.value, w);
    }
  }, V = ($, A, m, y, w, S, j, K, Q) => {
    const W = A.el = $ ? $.el : r(""), fe = A.anchor = $ ? $.anchor : r("");
    let { patchFlag: ue, dynamicChildren: ge, slotScopeIds: he } = A;
    he && (K = K ? K.concat(he) : he), $ == null ? (o(W, m, y), o(fe, m, y), H(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      A.children || [],
      m,
      fe,
      w,
      S,
      j,
      K,
      Q
    )) : ue > 0 && ue & 64 && ge && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    $.dynamicChildren ? (X(
      $.dynamicChildren,
      ge,
      m,
      w,
      S,
      j,
      K
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (A.key != null || w && A === w.subTree) && xr(
      $,
      A,
      !0
      /* shallow */
    )) : G(
      $,
      A,
      m,
      fe,
      w,
      S,
      j,
      K,
      Q
    );
  }, R = ($, A, m, y, w, S, j, K, Q) => {
    A.slotScopeIds = K, $ == null ? A.shapeFlag & 512 ? w.ctx.activate(
      A,
      m,
      y,
      j,
      Q
    ) : k(
      A,
      m,
      y,
      w,
      S,
      j,
      Q
    ) : D($, A, Q);
  }, k = ($, A, m, y, w, S, j) => {
    const K = $.component = Nv(
      $,
      y,
      w
    );
    if (wd($) && (K.ctx.renderer = Ee), Tv(K, !1, j), K.asyncDep) {
      if (w && w.registerDep(K, O, j), !$.el) {
        const Q = K.subTree = ne(qn);
        P(null, Q, A, m);
      }
    } else
      O(
        K,
        $,
        A,
        m,
        w,
        S,
        j
      );
  }, D = ($, A, m) => {
    const y = A.component = $.component;
    if (wv($, A, m))
      if (y.asyncDep && !y.asyncResolved) {
        B(y, A, m);
        return;
      } else
        y.next = A, y.update();
    else
      A.el = $.el, y.vnode = A;
  }, O = ($, A, m, y, w, S, j) => {
    const K = () => {
      if ($.isMounted) {
        let { next: ue, bu: ge, u: he, parent: Te, vnode: Be } = $;
        {
          const Mt = Ud($);
          if (Mt) {
            ue && (ue.el = Be.el, B($, ue, j)), Mt.asyncDep.then(() => {
              $.isUnmounted || K();
            });
            return;
          }
        }
        let Ae = ue, st;
        Jn($, !1), ue ? (ue.el = Be.el, B($, ue, j)) : ue = Be, ge && js(ge), (st = ue.props && ue.props.onVnodeBeforeUpdate) && sn(st, Te, ue, Be), Jn($, !0);
        const mt = su($), Vt = $.subTree;
        $.subTree = mt, C(
          Vt,
          mt,
          // parent may have changed if it's in a teleport
          f(Vt.el),
          // anchor may have changed if it's in a fragment
          Me(Vt),
          $,
          w,
          S
        ), ue.el = mt.el, Ae === null && kv($, mt.el), he && At(he, w), (st = ue.props && ue.props.onVnodeUpdated) && At(
          () => sn(st, Te, ue, Be),
          w
        );
      } else {
        let ue;
        const { el: ge, props: he } = A, { bm: Te, m: Be, parent: Ae, root: st, type: mt } = $, Vt = $o(A);
        Jn($, !1), Te && js(Te), !Vt && (ue = he && he.onVnodeBeforeMount) && sn(ue, Ae, A), Jn($, !0);
        {
          st.ce && st.ce._injectChildStyle(mt);
          const Mt = $.subTree = su($);
          C(
            null,
            Mt,
            m,
            y,
            $,
            w,
            S
          ), A.el = Mt.el;
        }
        if (Be && At(Be, w), !Vt && (ue = he && he.onVnodeMounted)) {
          const Mt = A;
          At(
            () => sn(ue, Ae, Mt),
            w
          );
        }
        (A.shapeFlag & 256 || Ae && $o(Ae.vnode) && Ae.vnode.shapeFlag & 256) && $.a && At($.a, w), $.isMounted = !0, A = m = y = null;
      }
    };
    $.scope.on();
    const Q = $.effect = new Wc(K);
    $.scope.off();
    const W = $.update = Q.run.bind(Q), fe = $.job = Q.runIfDirty.bind(Q);
    fe.i = $, fe.id = $.uid, Q.scheduler = () => wr(fe), Jn($, !0), W();
  }, B = ($, A, m) => {
    A.component = $;
    const y = $.vnode.props;
    $.vnode = A, $.next = null, iv($, A.props, y, m), uv($, A.children, m), Kn(), Ya($), Wn();
  }, G = ($, A, m, y, w, S, j, K, Q = !1) => {
    const W = $ && $.children, fe = $ ? $.shapeFlag : 0, ue = A.children, { patchFlag: ge, shapeFlag: he } = A;
    if (ge > 0) {
      if (ge & 128) {
        de(
          W,
          ue,
          m,
          y,
          w,
          S,
          j,
          K,
          Q
        );
        return;
      } else if (ge & 256) {
        ie(
          W,
          ue,
          m,
          y,
          w,
          S,
          j,
          K,
          Q
        );
        return;
      }
    }
    he & 8 ? (fe & 16 && Ie(W, w, S), ue !== W && d(m, ue)) : fe & 16 ? he & 16 ? de(
      W,
      ue,
      m,
      y,
      w,
      S,
      j,
      K,
      Q
    ) : Ie(W, w, S, !0) : (fe & 8 && d(m, ""), he & 16 && H(
      ue,
      m,
      y,
      w,
      S,
      j,
      K,
      Q
    ));
  }, ie = ($, A, m, y, w, S, j, K, Q) => {
    $ = $ || Eo, A = A || Eo;
    const W = $.length, fe = A.length, ue = Math.min(W, fe);
    let ge;
    for (ge = 0; ge < ue; ge++) {
      const he = A[ge] = Q ? Dn(A[ge]) : an(A[ge]);
      C(
        $[ge],
        he,
        m,
        null,
        w,
        S,
        j,
        K,
        Q
      );
    }
    W > fe ? Ie(
      $,
      w,
      S,
      !0,
      !1,
      ue
    ) : H(
      A,
      m,
      y,
      w,
      S,
      j,
      K,
      Q,
      ue
    );
  }, de = ($, A, m, y, w, S, j, K, Q) => {
    let W = 0;
    const fe = A.length;
    let ue = $.length - 1, ge = fe - 1;
    for (; W <= ue && W <= ge; ) {
      const he = $[W], Te = A[W] = Q ? Dn(A[W]) : an(A[W]);
      if (Uo(he, Te))
        C(
          he,
          Te,
          m,
          null,
          w,
          S,
          j,
          K,
          Q
        );
      else
        break;
      W++;
    }
    for (; W <= ue && W <= ge; ) {
      const he = $[ue], Te = A[ge] = Q ? Dn(A[ge]) : an(A[ge]);
      if (Uo(he, Te))
        C(
          he,
          Te,
          m,
          null,
          w,
          S,
          j,
          K,
          Q
        );
      else
        break;
      ue--, ge--;
    }
    if (W > ue) {
      if (W <= ge) {
        const he = ge + 1, Te = he < fe ? A[he].el : y;
        for (; W <= ge; )
          C(
            null,
            A[W] = Q ? Dn(A[W]) : an(A[W]),
            m,
            Te,
            w,
            S,
            j,
            K,
            Q
          ), W++;
      }
    } else if (W > ge)
      for (; W <= ue; )
        re($[W], w, S, !0), W++;
    else {
      const he = W, Te = W, Be = /* @__PURE__ */ new Map();
      for (W = Te; W <= ge; W++) {
        const yt = A[W] = Q ? Dn(A[W]) : an(A[W]);
        yt.key != null && Be.set(yt.key, W);
      }
      let Ae, st = 0;
      const mt = ge - Te + 1;
      let Vt = !1, Mt = 0;
      const qe = new Array(mt);
      for (W = 0; W < mt; W++) qe[W] = 0;
      for (W = he; W <= ue; W++) {
        const yt = $[W];
        if (st >= mt) {
          re(yt, w, S, !0);
          continue;
        }
        let St;
        if (yt.key != null)
          St = Be.get(yt.key);
        else
          for (Ae = Te; Ae <= ge; Ae++)
            if (qe[Ae - Te] === 0 && Uo(yt, A[Ae])) {
              St = Ae;
              break;
            }
        St === void 0 ? re(yt, w, S, !0) : (qe[St - Te] = W + 1, St >= Mt ? Mt = St : Vt = !0, C(
          yt,
          A[St],
          m,
          null,
          w,
          S,
          j,
          K,
          Q
        ), st++);
      }
      const ut = Vt ? pv(qe) : Eo;
      for (Ae = ut.length - 1, W = mt - 1; W >= 0; W--) {
        const yt = Te + W, St = A[yt], ct = yt + 1 < fe ? A[yt + 1].el : y;
        qe[W] === 0 ? C(
          null,
          St,
          m,
          ct,
          w,
          S,
          j,
          K,
          Q
        ) : Vt && (Ae < 0 || W !== ut[Ae] ? ve(St, m, ct, 2) : Ae--);
      }
    }
  }, ve = ($, A, m, y, w = null) => {
    const { el: S, type: j, transition: K, children: Q, shapeFlag: W } = $;
    if (W & 6) {
      ve($.component.subTree, A, m, y);
      return;
    }
    if (W & 128) {
      $.suspense.move(A, m, y);
      return;
    }
    if (W & 64) {
      j.move($, A, m, Ee);
      return;
    }
    if (j === xe) {
      o(S, A, m);
      for (let ue = 0; ue < Q.length; ue++)
        ve(Q[ue], A, m, y);
      o($.anchor, A, m);
      return;
    }
    if (j === Ys) {
      E($, A, m);
      return;
    }
    if (y !== 2 && W & 1 && K)
      if (y === 0)
        K.beforeEnter(S), o(S, A, m), At(() => K.enter(S), w);
      else {
        const { leave: ue, delayLeave: ge, afterLeave: he } = K, Te = () => o(S, A, m), Be = () => {
          ue(S, () => {
            Te(), he && he();
          });
        };
        ge ? ge(S, Te, Be) : Be();
      }
    else
      o(S, A, m);
  }, re = ($, A, m, y = !1, w = !1) => {
    const {
      type: S,
      props: j,
      ref: K,
      children: Q,
      dynamicChildren: W,
      shapeFlag: fe,
      patchFlag: ue,
      dirs: ge,
      cacheIndex: he
    } = $;
    if (ue === -2 && (w = !1), K != null && ri(K, null, m, $, !0), he != null && (A.renderCache[he] = void 0), fe & 256) {
      A.ctx.deactivate($);
      return;
    }
    const Te = fe & 1 && ge, Be = !$o($);
    let Ae;
    if (Be && (Ae = j && j.onVnodeBeforeUnmount) && sn(Ae, A, $), fe & 6)
      ce($.component, m, y);
    else {
      if (fe & 128) {
        $.suspense.unmount(m, y);
        return;
      }
      Te && Zn($, null, A, "beforeUnmount"), fe & 64 ? $.type.remove(
        $,
        A,
        m,
        Ee,
        y
      ) : W && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !W.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (S !== xe || ue > 0 && ue & 64) ? Ie(
        W,
        A,
        m,
        !1,
        !0
      ) : (S === xe && ue & 384 || !w && fe & 16) && Ie(Q, A, m), y && ye($);
    }
    (Be && (Ae = j && j.onVnodeUnmounted) || Te) && At(() => {
      Ae && sn(Ae, A, $), Te && Zn($, null, A, "unmounted");
    }, m);
  }, ye = ($) => {
    const { type: A, el: m, anchor: y, transition: w } = $;
    if (A === xe) {
      pe(m, y);
      return;
    }
    if (A === Ys) {
      x($);
      return;
    }
    const S = () => {
      s(m), w && !w.persisted && w.afterLeave && w.afterLeave();
    };
    if ($.shapeFlag & 1 && w && !w.persisted) {
      const { leave: j, delayLeave: K } = w, Q = () => j(m, S);
      K ? K($.el, S, Q) : Q();
    } else
      S();
  }, pe = ($, A) => {
    let m;
    for (; $ !== A; )
      m = p($), s($), $ = m;
    s(A);
  }, ce = ($, A, m) => {
    const { bum: y, scope: w, job: S, subTree: j, um: K, m: Q, a: W } = $;
    ou(Q), ou(W), y && js(y), w.stop(), S && (S.flags |= 8, re(j, $, A, m)), K && At(K, A), At(() => {
      $.isUnmounted = !0;
    }, A), A && A.pendingBranch && !A.isUnmounted && $.asyncDep && !$.asyncResolved && $.suspenseId === A.pendingId && (A.deps--, A.deps === 0 && A.resolve());
  }, Ie = ($, A, m, y = !1, w = !1, S = 0) => {
    for (let j = S; j < $.length; j++)
      re($[j], A, m, y, w);
  }, Me = ($) => {
    if ($.shapeFlag & 6)
      return Me($.component.subTree);
    if ($.shapeFlag & 128)
      return $.suspense.next();
    const A = p($.anchor || $.el), m = A && A[md];
    return m ? p(m) : A;
  };
  let oe = !1;
  const Se = ($, A, m) => {
    $ == null ? A._vnode && re(A._vnode, null, null, !0) : C(
      A._vnode || null,
      $,
      A,
      null,
      null,
      null,
      m
    ), A._vnode = $, oe || (oe = !0, Ya(), hd(), oe = !1);
  }, Ee = {
    p: C,
    um: re,
    m: ve,
    r: ye,
    mt: k,
    mc: H,
    pc: G,
    pbc: X,
    n: Me,
    o: e
  };
  return {
    render: Se,
    hydrate: void 0,
    createApp: ov(Se)
  };
}
function tl({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Jn({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function fv(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function xr(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (Ne(o) && Ne(s))
    for (let i = 0; i < o.length; i++) {
      const l = o[i];
      let r = s[i];
      r.shapeFlag & 1 && !r.dynamicChildren && ((r.patchFlag <= 0 || r.patchFlag === 32) && (r = s[i] = Dn(s[i]), r.el = l.el), !n && r.patchFlag !== -2 && xr(l, r)), r.type === Pi && (r.el = l.el);
    }
}
function pv(e) {
  const t = e.slice(), n = [0];
  let o, s, i, l, r;
  const u = e.length;
  for (o = 0; o < u; o++) {
    const c = e[o];
    if (c !== 0) {
      if (s = n[n.length - 1], e[s] < c) {
        t[o] = s, n.push(o);
        continue;
      }
      for (i = 0, l = n.length - 1; i < l; )
        r = i + l >> 1, e[n[r]] < c ? i = r + 1 : l = r;
      c < e[n[i]] && (i > 0 && (t[o] = n[i - 1]), n[i] = o);
    }
  }
  for (i = n.length, l = n[i - 1]; i-- > 0; )
    n[i] = l, l = t[l];
  return n;
}
function Ud(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Ud(t);
}
function ou(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const hv = Symbol.for("v-scx"), vv = () => dn(hv);
function ze(e, t, n) {
  return jd(e, t, n);
}
function jd(e, t, n = Ze) {
  const { immediate: o, deep: s, flush: i, once: l } = n, r = Tt({}, n), u = t && o || !t && i !== "post";
  let c;
  if (ds) {
    if (i === "sync") {
      const h = vv();
      c = h.__watcherHandles || (h.__watcherHandles = []);
    } else if (!u) {
      const h = () => {
      };
      return h.stop = cn, h.resume = cn, h.pause = cn, h;
    }
  }
  const d = Ct;
  r.call = (h, b, C) => hn(h, d, b, C);
  let f = !1;
  i === "post" ? r.scheduler = (h) => {
    At(h, d && d.suspense);
  } : i !== "sync" && (f = !0, r.scheduler = (h, b) => {
    b ? h() : wr(h);
  }), r.augmentJob = (h) => {
    t && (h.flags |= 4), f && (h.flags |= 2, d && (h.id = d.uid, h.i = d));
  };
  const p = Ph(e, t, r);
  return ds && (c ? c.push(p) : u && p()), p;
}
function gv(e, t, n) {
  const o = this.proxy, s = nt(e) ? e.includes(".") ? Gd(o, e) : () => o[e] : e.bind(o, o);
  let i;
  Re(t) ? i = t : (i = t.handler, n = t);
  const l = Es(this), r = jd(s, i.bind(o), n);
  return l(), r;
}
function Gd(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
const mv = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Xt(t)}Modifiers`] || e[`${Xn(t)}Modifiers`];
function yv(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || Ze;
  let s = n;
  const i = t.startsWith("update:"), l = i && mv(o, t.slice(7));
  l && (l.trim && (s = n.map((d) => nt(d) ? d.trim() : d)), l.number && (s = n.map(ni)));
  let r, u = o[r = Xi(t)] || // also try camelCase event handler (#2249)
  o[r = Xi(Xt(t))];
  !u && i && (u = o[r = Xi(Xn(t))]), u && hn(
    u,
    e,
    6,
    s
  );
  const c = o[r + "Once"];
  if (c) {
    if (!e.emitted)
      e.emitted = {};
    else if (e.emitted[r])
      return;
    e.emitted[r] = !0, hn(
      c,
      e,
      6,
      s
    );
  }
}
function qd(e, t, n = !1) {
  const o = t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const i = e.emits;
  let l = {}, r = !1;
  if (!Re(e)) {
    const u = (c) => {
      const d = qd(c, t, !0);
      d && (r = !0, Tt(l, d));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !i && !r ? (Je(e) && o.set(e, null), null) : (Ne(i) ? i.forEach((u) => l[u] = null) : Tt(l, i), Je(e) && o.set(e, l), l);
}
function Mi(e, t) {
  return !e || !ki(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Ke(e, t[0].toLowerCase() + t.slice(1)) || Ke(e, Xn(t)) || Ke(e, t));
}
function su(e) {
  const {
    type: t,
    vnode: n,
    proxy: o,
    withProxy: s,
    propsOptions: [i],
    slots: l,
    attrs: r,
    emit: u,
    render: c,
    renderCache: d,
    props: f,
    data: p,
    setupState: h,
    ctx: b,
    inheritAttrs: C
  } = e, M = li(e);
  let P, L;
  try {
    if (n.shapeFlag & 4) {
      const x = s || o, z = x;
      P = an(
        c.call(
          z,
          x,
          d,
          f,
          h,
          p,
          b
        )
      ), L = r;
    } else {
      const x = t;
      P = an(
        x.length > 1 ? x(
          f,
          { attrs: r, slots: l, emit: u }
        ) : x(
          f,
          null
        )
      ), L = t.props ? r : bv(r);
    }
  } catch (x) {
    os.length = 0, Ii(x, e, 1), P = ne(qn);
  }
  let E = P;
  if (L && C !== !1) {
    const x = Object.keys(L), { shapeFlag: z } = E;
    x.length && z & 7 && (i && x.some(ur) && (L = _v(
      L,
      i
    )), E = Oo(E, L, !1, !0));
  }
  return n.dirs && (E = Oo(E, null, !1, !0), E.dirs = E.dirs ? E.dirs.concat(n.dirs) : n.dirs), n.transition && kr(E, n.transition), P = E, li(M), P;
}
const bv = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || ki(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, _v = (e, t) => {
  const n = {};
  for (const o in e)
    (!ur(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
};
function wv(e, t, n) {
  const { props: o, children: s, component: i } = e, { props: l, children: r, patchFlag: u } = t, c = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return o ? iu(o, l, c) : !!l;
    if (u & 8) {
      const d = t.dynamicProps;
      for (let f = 0; f < d.length; f++) {
        const p = d[f];
        if (l[p] !== o[p] && !Mi(c, p))
          return !0;
      }
    }
  } else
    return (s || r) && (!r || !r.$stable) ? !0 : o === l ? !1 : o ? l ? iu(o, l, c) : !0 : !!l;
  return !1;
}
function iu(e, t, n) {
  const o = Object.keys(t);
  if (o.length !== Object.keys(e).length)
    return !0;
  for (let s = 0; s < o.length; s++) {
    const i = o[s];
    if (t[i] !== e[i] && !Mi(n, i))
      return !0;
  }
  return !1;
}
function kv({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const Yd = (e) => e.__isSuspense;
function Ev(e, t) {
  t && t.pendingBranch ? Ne(e) ? t.effects.push(...e) : t.effects.push(e) : Dh(e);
}
const xe = Symbol.for("v-fgt"), Pi = Symbol.for("v-txt"), qn = Symbol.for("v-cmt"), Ys = Symbol.for("v-stc"), os = [];
let Lt = null;
function v(e = !1) {
  os.push(Lt = e ? null : []);
}
function Cv() {
  os.pop(), Lt = os[os.length - 1] || null;
}
let Po = 1;
function lu(e, t = !1) {
  Po += e, e < 0 && Lt && t && (Lt.hasOnce = !0);
}
function Xd(e) {
  return e.dynamicChildren = Po > 0 ? Lt || Eo : null, Cv(), Po > 0 && Lt && Lt.push(e), e;
}
function _(e, t, n, o, s, i) {
  return Xd(
    a(
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
function ht(e, t, n, o, s) {
  return Xd(
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
function cs(e) {
  return e ? e.__v_isVNode === !0 : !1;
}
function Uo(e, t) {
  return e.type === t.type && e.key === t.key;
}
const Kd = ({ key: e }) => e ?? null, Xs = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? nt(e) || at(e) || Re(e) ? { i: kt, r: e, k: t, f: !!n } : e : null);
function a(e, t = null, n = null, o = 0, s = null, i = e === xe ? 0 : 1, l = !1, r = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Kd(t),
    ref: t && Xs(t),
    scopeId: gd,
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
    ctx: kt
  };
  return r ? (Sr(u, n), i & 128 && e.normalize(u)) : n && (u.shapeFlag |= nt(n) ? 8 : 16), Po > 0 && // avoid a block node from tracking itself
  !l && // has current parent block
  Lt && // presence of a patch flag indicates this node needs patching on updates.
  // component nodes also should always be patched, because even if the
  // component doesn't need to update, it needs to persist the instance on to
  // the next vnode so that it can be properly unmounted later.
  (u.patchFlag > 0 || i & 6) && // the EVENTS flag is only for hydration and if it is the only flag, the
  // vnode should not be considered dynamic due to handler caching.
  u.patchFlag !== 32 && Lt.push(u), u;
}
const ne = xv;
function xv(e, t = null, n = null, o = 0, s = null, i = !1) {
  if ((!e || e === Sd) && (e = qn), cs(e)) {
    const r = Oo(
      e,
      t,
      !0
      /* mergeRef: true */
    );
    return n && Sr(r, n), Po > 0 && !i && Lt && (r.shapeFlag & 6 ? Lt[Lt.indexOf(e)] = r : Lt.push(r)), r.patchFlag = -2, r;
  }
  if (Av(e) && (e = e.__vccOpts), t) {
    t = Ks(t);
    let { class: r, style: u } = t;
    r && !nt(r) && (t.class = be(r)), Je(u) && (_r(u) && !Ne(u) && (u = Tt({}, u)), t.style = et(u));
  }
  const l = nt(e) ? 1 : Yd(e) ? 128 : Rh(e) ? 64 : Je(e) ? 4 : Re(e) ? 2 : 0;
  return a(
    e,
    t,
    n,
    o,
    s,
    l,
    i,
    !0
  );
}
function Ks(e) {
  return e ? _r(e) || Rd(e) ? Tt({}, e) : e : null;
}
function Oo(e, t, n = !1, o = !1) {
  const { props: s, ref: i, patchFlag: l, children: r, transition: u } = e, c = t ? $r(s || {}, t) : s, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Kd(c),
    ref: t && t.ref ? (
      // #2078 in the case of <component :is="vnode" ref="extra"/>
      // if the vnode itself already has a ref, cloneVNode will need to merge
      // the refs so the single vnode can be set on multiple refs
      n && i ? Ne(i) ? i.concat(Xs(t)) : [i, Xs(t)] : Xs(t)
    ) : i,
    scopeId: e.scopeId,
    slotScopeIds: e.slotScopeIds,
    children: r,
    target: e.target,
    targetStart: e.targetStart,
    targetAnchor: e.targetAnchor,
    staticCount: e.staticCount,
    shapeFlag: e.shapeFlag,
    // if the vnode is cloned with extra props, we can no longer assume its
    // existing patch flag to be reliable and need to add the FULL_PROPS flag.
    // note: preserve flag for fragments since they use the flag for children
    // fast paths only.
    patchFlag: t && e.type !== xe ? l === -1 ? 16 : l | 16 : l,
    dynamicProps: e.dynamicProps,
    dynamicChildren: e.dynamicChildren,
    appContext: e.appContext,
    dirs: e.dirs,
    transition: u,
    // These should technically only be non-null on mounted VNodes. However,
    // they *should* be copied for kept-alive vnodes. So we just always copy
    // them since them being non-null during a mount doesn't affect the logic as
    // they will simply be overwritten.
    component: e.component,
    suspense: e.suspense,
    ssContent: e.ssContent && Oo(e.ssContent),
    ssFallback: e.ssFallback && Oo(e.ssFallback),
    el: e.el,
    anchor: e.anchor,
    ctx: e.ctx,
    ce: e.ce
  };
  return u && o && kr(
    d,
    u.clone(d)
  ), d;
}
function _e(e = " ", t = 0) {
  return ne(Pi, null, e, t);
}
function Sv(e, t) {
  const n = ne(Ys, null, e);
  return n.staticCount = t, n;
}
function se(e = "", t = !1) {
  return t ? (v(), ht(qn, null, e)) : ne(qn, null, e);
}
function an(e) {
  return e == null || typeof e == "boolean" ? ne(qn) : Ne(e) ? ne(
    xe,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : cs(e) ? Dn(e) : ne(Pi, null, String(e));
}
function Dn(e) {
  return e.el === null && e.patchFlag !== -1 || e.memo ? e : Oo(e);
}
function Sr(e, t) {
  let n = 0;
  const { shapeFlag: o } = e;
  if (t == null)
    t = null;
  else if (Ne(t))
    n = 16;
  else if (typeof t == "object")
    if (o & 65) {
      const s = t.default;
      s && (s._c && (s._d = !1), Sr(e, s()), s._c && (s._d = !0));
      return;
    } else {
      n = 32;
      const s = t._;
      !s && !Rd(t) ? t._ctx = kt : s === 3 && kt && (kt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Re(t) ? (t = { default: t, _ctx: kt }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [_e(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function $r(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = be([t.class, o.class]));
      else if (s === "style")
        t.style = et([t.style, o.style]);
      else if (ki(s)) {
        const i = t[s], l = o[s];
        l && i !== l && !(Ne(i) && i.includes(l)) && (t[s] = i ? [].concat(i, l) : l);
      } else s !== "" && (t[s] = o[s]);
  }
  return t;
}
function sn(e, t, n, o = null) {
  hn(e, t, 7, [
    n,
    o
  ]);
}
const $v = Od();
let Iv = 0;
function Nv(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || $v, i = {
    uid: Iv++,
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
    scope: new Xc(
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
    propsOptions: Vd(o, s),
    emitsOptions: qd(o, s),
    // emit
    emit: null,
    // to be set immediately
    emitted: null,
    // props default value
    propsDefaults: Ze,
    // inheritAttrs
    inheritAttrs: o.inheritAttrs,
    // state
    ctx: Ze,
    data: Ze,
    props: Ze,
    attrs: Ze,
    slots: Ze,
    refs: Ze,
    setupState: Ze,
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = yv.bind(null, i), e.ce && e.ce(i), i;
}
let Ct = null;
const zo = () => Ct || kt;
let ui, Al;
{
  const e = xi(), t = (n, o) => {
    let s;
    return (s = e[n]) || (s = e[n] = []), s.push(o), (i) => {
      s.length > 1 ? s.forEach((l) => l(i)) : s[0](i);
    };
  };
  ui = t(
    "__VUE_INSTANCE_SETTERS__",
    (n) => Ct = n
  ), Al = t(
    "__VUE_SSR_SETTERS__",
    (n) => ds = n
  );
}
const Es = (e) => {
  const t = Ct;
  return ui(e), e.scope.on(), () => {
    e.scope.off(), ui(t);
  };
}, ru = () => {
  Ct && Ct.scope.off(), ui(null);
};
function Wd(e) {
  return e.vnode.shapeFlag & 4;
}
let ds = !1;
function Tv(e, t = !1, n = !1) {
  t && Al(t);
  const { props: o, children: s } = e.vnode, i = Wd(e);
  sv(e, o, i, t), av(e, s, n);
  const l = i ? Mv(e, t) : void 0;
  return t && Al(!1), l;
}
function Mv(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Xh);
  const { setup: o } = n;
  if (o) {
    Kn();
    const s = e.setupContext = o.length > 1 ? Jd(e) : null, i = Es(e), l = ks(
      o,
      e,
      0,
      [
        e.props,
        s
      ]
    ), r = Bc(l);
    if (Wn(), i(), (r || e.sp) && !$o(e) && _d(e), r) {
      if (l.then(ru, ru), t)
        return l.then((u) => {
          au(e, u);
        }).catch((u) => {
          Ii(u, e, 0);
        });
      e.asyncDep = l;
    } else
      au(e, l);
  } else
    Zd(e);
}
function au(e, t, n) {
  Re(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Je(t) && (e.setupState = cd(t)), Zd(e);
}
function Zd(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || cn);
  {
    const s = Es(e);
    Kn();
    try {
      Zh(e);
    } finally {
      Wn(), s();
    }
  }
}
const Pv = {
  get(e, t) {
    return It(e, "get", ""), e[t];
  }
};
function Jd(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Pv),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Oi(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(cd(lo(e.exposed)), {
    get(t, n) {
      if (n in t)
        return t[n];
      if (n in ns)
        return ns[n](e);
    },
    has(t, n) {
      return n in t || n in ns;
    }
  })) : e.proxy;
}
function Ov(e, t = !0) {
  return Re(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Av(e) {
  return Re(e) && "__vccOpts" in e;
}
const ae = (e, t) => Th(e, t, ds);
function Xe(e, t, n) {
  const o = arguments.length;
  return o === 2 ? Je(t) && !Ne(t) ? cs(t) ? ne(e, null, [t]) : ne(e, t) : ne(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : o === 3 && cs(n) && (n = [n]), ne(e, t, n));
}
function Dv(e, t) {
  const n = e.memo;
  if (n.length != t.length)
    return !1;
  for (let o = 0; o < n.length; o++)
    if (xn(n[o], t[o]))
      return !1;
  return Po > 0 && Lt && Lt.push(e), !0;
}
const Rv = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Dl;
const uu = typeof window < "u" && window.trustedTypes;
if (uu)
  try {
    Dl = /* @__PURE__ */ uu.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Qd = Dl ? (e) => Dl.createHTML(e) : (e) => e, Lv = "http://www.w3.org/2000/svg", Vv = "http://www.w3.org/1998/Math/MathML", bn = typeof document < "u" ? document : null, cu = bn && /* @__PURE__ */ bn.createElement("template"), zv = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t === "svg" ? bn.createElementNS(Lv, e) : t === "mathml" ? bn.createElementNS(Vv, e) : n ? bn.createElement(e, { is: n }) : bn.createElement(e);
    return e === "select" && o && o.multiple != null && s.setAttribute("multiple", o.multiple), s;
  },
  createText: (e) => bn.createTextNode(e),
  createComment: (e) => bn.createComment(e),
  setText: (e, t) => {
    e.nodeValue = t;
  },
  setElementText: (e, t) => {
    e.textContent = t;
  },
  parentNode: (e) => e.parentNode,
  nextSibling: (e) => e.nextSibling,
  querySelector: (e) => bn.querySelector(e),
  setScopeId(e, t) {
    e.setAttribute(t, "");
  },
  // __UNSAFE__
  // Reason: innerHTML.
  // Static content here can only come from compiled templates.
  // As long as the user only uses trusted templates, this is safe.
  insertStaticContent(e, t, n, o, s, i) {
    const l = n ? n.previousSibling : t.lastChild;
    if (s && (s === i || s.nextSibling))
      for (; t.insertBefore(s.cloneNode(!0), n), !(s === i || !(s = s.nextSibling)); )
        ;
    else {
      cu.innerHTML = Qd(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const r = cu.content;
      if (o === "svg" || o === "mathml") {
        const u = r.firstChild;
        for (; u.firstChild; )
          r.appendChild(u.firstChild);
        r.removeChild(u);
      }
      t.insertBefore(r, n);
    }
    return [
      // first
      l ? l.nextSibling : t.firstChild,
      // last
      n ? n.previousSibling : t.lastChild
    ];
  }
}, Fv = Symbol("_vtc");
function Bv(e, t, n) {
  const o = e[Fv];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const du = Symbol("_vod"), Hv = Symbol("_vsh"), Uv = Symbol(""), jv = /(^|;)\s*display\s*:/;
function Gv(e, t, n) {
  const o = e.style, s = nt(n);
  let i = !1;
  if (n && !s) {
    if (t)
      if (nt(t))
        for (const l of t.split(";")) {
          const r = l.slice(0, l.indexOf(":")).trim();
          n[r] == null && Ws(o, r, "");
        }
      else
        for (const l in t)
          n[l] == null && Ws(o, l, "");
    for (const l in n)
      l === "display" && (i = !0), Ws(o, l, n[l]);
  } else if (s) {
    if (t !== n) {
      const l = o[Uv];
      l && (n += ";" + l), o.cssText = n, i = jv.test(n);
    }
  } else t && e.removeAttribute("style");
  du in e && (e[du] = i ? o.display : "", e[Hv] && (o.display = "none"));
}
const fu = /\s*!important$/;
function Ws(e, t, n) {
  if (Ne(n))
    n.forEach((o) => Ws(e, t, o));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = qv(e, t);
    fu.test(n) ? e.setProperty(
      Xn(o),
      n.replace(fu, ""),
      "important"
    ) : e[o] = n;
  }
}
const pu = ["Webkit", "Moz", "ms"], nl = {};
function qv(e, t) {
  const n = nl[t];
  if (n)
    return n;
  let o = Xt(t);
  if (o !== "filter" && o in e)
    return nl[t] = o;
  o = Ci(o);
  for (let s = 0; s < pu.length; s++) {
    const i = pu[s] + o;
    if (i in e)
      return nl[t] = i;
  }
  return t;
}
const hu = "http://www.w3.org/1999/xlink";
function vu(e, t, n, o, s, i = Qp(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(hu, t.slice(6, t.length)) : e.setAttributeNS(hu, t, n) : n == null || i && !Gc(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : en(n) ? String(n) : n
  );
}
function gu(e, t, n, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Qd(n) : n);
    return;
  }
  const i = e.tagName;
  if (t === "value" && i !== "PROGRESS" && // custom elements may use _value internally
  !i.includes("-")) {
    const r = i === "OPTION" ? e.getAttribute("value") || "" : e.value, u = n == null ? (
      // #11647: value should be set as empty string for null and undefined,
      // but <input type="checkbox"> should be set as 'on'.
      e.type === "checkbox" ? "on" : ""
    ) : String(n);
    (r !== u || !("_value" in e)) && (e.value = u), n == null && e.removeAttribute(t), e._value = n;
    return;
  }
  let l = !1;
  if (n === "" || n == null) {
    const r = typeof e[t];
    r === "boolean" ? n = Gc(n) : n == null && r === "string" ? (n = "", l = !0) : r === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  l && e.removeAttribute(s || t);
}
function Vn(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Yv(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const mu = Symbol("_vei");
function Xv(e, t, n, o, s = null) {
  const i = e[mu] || (e[mu] = {}), l = i[t];
  if (o && l)
    l.value = o;
  else {
    const [r, u] = Kv(t);
    if (o) {
      const c = i[t] = Jv(
        o,
        s
      );
      Vn(e, r, c, u);
    } else l && (Yv(e, r, l, u), i[t] = void 0);
  }
}
const yu = /(?:Once|Passive|Capture)$/;
function Kv(e) {
  let t;
  if (yu.test(e)) {
    t = {};
    let o;
    for (; o = e.match(yu); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Xn(e.slice(2)), t];
}
let ol = 0;
const Wv = /* @__PURE__ */ Promise.resolve(), Zv = () => ol || (Wv.then(() => ol = 0), ol = Date.now());
function Jv(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    hn(
      Qv(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = Zv(), n;
}
function Qv(e, t) {
  if (Ne(t)) {
    const n = e.stopImmediatePropagation;
    return e.stopImmediatePropagation = () => {
      n.call(e), e._stopped = !0;
    }, t.map(
      (o) => (s) => !s._stopped && o && o(s)
    );
  } else
    return t;
}
const bu = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, eg = (e, t, n, o, s, i) => {
  const l = s === "svg";
  t === "class" ? Bv(e, o, l) : t === "style" ? Gv(e, n, o) : ki(t) ? ur(t) || Xv(e, t, n, o, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : tg(e, t, o, l)) ? (gu(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && vu(e, t, o, l, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !nt(o)) ? gu(e, Xt(t), o, i, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), vu(e, t, o, l));
};
function tg(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && bu(t) && Re(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return bu(t) && nt(n) ? !1 : t in e;
}
const Ao = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return Ne(t) ? (n) => js(t, n) : t;
};
function ng(e) {
  e.target.composing = !0;
}
function _u(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const Sn = Symbol("_assign"), Ge = {
  created(e, { modifiers: { lazy: t, trim: n, number: o } }, s) {
    e[Sn] = Ao(s);
    const i = o || s.props && s.props.type === "number";
    Vn(e, t ? "change" : "input", (l) => {
      if (l.target.composing) return;
      let r = e.value;
      n && (r = r.trim()), i && (r = ni(r)), e[Sn](r);
    }), n && Vn(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Vn(e, "compositionstart", ng), Vn(e, "compositionend", _u), Vn(e, "change", _u));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: o, trim: s, number: i } }, l) {
    if (e[Sn] = Ao(l), e.composing) return;
    const r = (i || e.type === "number") && !/^0\d/.test(e.value) ? ni(e.value) : e.value, u = t ?? "";
    r !== u && (document.activeElement === e && e.type !== "range" && (o && t === n || s && e.value.trim() === u) || (e.value = u));
  }
}, Rl = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[Sn] = Ao(n), Vn(e, "change", () => {
      const o = e._modelValue, s = fs(e), i = e.checked, l = e[Sn];
      if (Ne(o)) {
        const r = fr(o, s), u = r !== -1;
        if (i && !u)
          l(o.concat(s));
        else if (!i && u) {
          const c = [...o];
          c.splice(r, 1), l(c);
        }
      } else if (Vo(o)) {
        const r = new Set(o);
        i ? r.add(s) : r.delete(s), l(r);
      } else
        l(ef(e, i));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: wu,
  beforeUpdate(e, t, n) {
    e[Sn] = Ao(n), wu(e, t, n);
  }
};
function wu(e, { value: t, oldValue: n }, o) {
  e._modelValue = t;
  let s;
  if (Ne(t))
    s = fr(t, o.props.value) > -1;
  else if (Vo(t))
    s = t.has(o.props.value);
  else {
    if (t === n) return;
    s = ws(t, ef(e, !0));
  }
  e.checked !== s && (e.checked = s);
}
const fn = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, o) {
    const s = Vo(t);
    Vn(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (l) => l.selected).map(
        (l) => n ? ni(fs(l)) : fs(l)
      );
      e[Sn](
        e.multiple ? s ? new Set(i) : i : i[0]
      ), e._assigning = !0, _t(() => {
        e._assigning = !1;
      });
    }), e[Sn] = Ao(o);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    ku(e, t);
  },
  beforeUpdate(e, t, n) {
    e[Sn] = Ao(n);
  },
  updated(e, { value: t }) {
    e._assigning || ku(e, t);
  }
};
function ku(e, t) {
  const n = e.multiple, o = Ne(t);
  if (!(n && !o && !Vo(t))) {
    for (let s = 0, i = e.options.length; s < i; s++) {
      const l = e.options[s], r = fs(l);
      if (n)
        if (o) {
          const u = typeof r;
          u === "string" || u === "number" ? l.selected = t.some((c) => String(c) === String(r)) : l.selected = fr(t, r) > -1;
        } else
          l.selected = t.has(r);
      else if (ws(fs(l), t)) {
        e.selectedIndex !== s && (e.selectedIndex = s);
        return;
      }
    }
    !n && e.selectedIndex !== -1 && (e.selectedIndex = -1);
  }
}
function fs(e) {
  return "_value" in e ? e._value : e.value;
}
function ef(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const og = ["ctrl", "shift", "alt", "meta"], sg = {
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
  exact: (e, t) => og.some((n) => e[`${n}Key`] && !t.includes(n))
}, $t = (e, t) => {
  const n = e._withMods || (e._withMods = {}), o = t.join(".");
  return n[o] || (n[o] = (s, ...i) => {
    for (let l = 0; l < t.length; l++) {
      const r = sg[t[l]];
      if (r && r(s, t)) return;
    }
    return e(s, ...i);
  });
}, ig = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, Eu = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), o = t.join(".");
  return n[o] || (n[o] = (s) => {
    if (!("key" in s))
      return;
    const i = Xn(s.key);
    if (t.some(
      (l) => l === i || ig[l] === i
    ))
      return e(s);
  });
}, lg = /* @__PURE__ */ Tt({ patchProp: eg }, zv);
let Cu;
function rg() {
  return Cu || (Cu = cv(lg));
}
const Cs = (...e) => {
  const t = rg().createApp(...e), { mount: n } = t;
  return t.mount = (o) => {
    const s = ug(o);
    if (!s) return;
    const i = t._component;
    !Re(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const l = n(s, !1, ag(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), l;
  }, t;
};
function ag(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function ug(e) {
  return nt(e) ? document.querySelector(e) : e;
}
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const cg = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
var Os = {
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
const dg = ({ size: e, strokeWidth: t = 2, absoluteStrokeWidth: n, color: o, iconNode: s, name: i, class: l, ...r }, { slots: u }) => Xe(
  "svg",
  {
    ...Os,
    width: e || Os.width,
    height: e || Os.height,
    stroke: o || Os.stroke,
    "stroke-width": n ? Number(t) * 24 / Number(e) : t,
    class: ["lucide", `lucide-${cg(i ?? "icon")}`],
    ...r
  },
  [...s.map((c) => Xe(...c)), ...u.default ? [u.default()] : []]
);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fe = (e, t) => (n, { slots: o }) => Xe(
  dg,
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
const fg = Fe("ArchiveIcon", [
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
const pg = Fe("BotIcon", [
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
const hg = Fe("BrainIcon", [
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
const vg = Fe("ChartColumnIcon", [
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
const ro = Fe("CheckIcon", [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const gg = Fe("ChevronDownIcon", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const mg = Fe("Clock3Icon", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16.5 12", key: "1aq6pp" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yg = Fe("DatabaseIcon", [
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
const ko = Fe("DownloadIcon", [
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
const Ll = Fe("ExternalLinkIcon", [
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
const Vl = Fe("EyeIcon", [
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
const ss = Fe("FolderOpenIcon", [
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
const tf = Fe("GitBranchIcon", [
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
const bg = Fe("LayersIcon", [
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
const _g = Fe("Maximize2Icon", [
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
const wg = Fe("MicVocalIcon", [
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
const kg = Fe("MinusIcon", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const zl = Fe("PenLineIcon", [
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
const Ir = Fe("PlayIcon", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Eg = Fe("PlugIcon", [
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
const oo = Fe("PlusIcon", [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cg = Fe("PuzzleIcon", [
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
const qt = Fe("RefreshCwIcon", [
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
const Nr = Fe("RotateCcwIcon", [
  ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
  ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const xg = Fe("RotateCwIcon", [
  ["path", { d: "M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8", key: "1p45f6" }],
  ["path", { d: "M21 3v5h-5", key: "1q7to0" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fl = Fe("SaveIcon", [
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
const Sg = Fe("ScanFaceIcon", [
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
const $g = Fe("ScanSearchIcon", [
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
const Zs = Fe("SearchIcon", [
  ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }],
  ["path", { d: "m21 21-4.3-4.3", key: "1qie3q" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Ig = Fe("SendIcon", [
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
const bo = Fe("SettingsIcon", [
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
const $n = Fe("Trash2Icon", [
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
const Ng = Fe("Undo2Icon", [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Bl = Fe("UploadIcon", [
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
const Hl = Fe("UserRoundIcon", [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Tg = Fe("WrenchIcon", [
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
const Gt = Fe("XIcon", [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
]), Mg = /* @__PURE__ */ new Set(["converting", "preview_ready", "indexing"]);
function Pg(e) {
  let t = 0, n = 0, o = 0;
  for (const s of e) {
    const i = String(s.status || "");
    i === "indexed" ? t += 1 : i.endsWith("_failed") || ["failed", "error"].includes(i) ? o += 1 : Mg.has(i) && i !== "preview_ready" && (n += 1);
  }
  return { total: e.length, indexed: t, processing: n, failed: o, attention: n + o };
}
function Og(e) {
  if (Array.isArray(e)) return e;
  if (!e || typeof e != "object") return [];
  const t = e;
  for (const n of ["items", "evaluations", "results"])
    if (Array.isArray(t[n])) return t[n];
  return [e];
}
function Ag(e) {
  const t = Number(e);
  return Number.isFinite(t) ? `${Math.round(t <= 1 ? t * 100 : t)}%` : "—";
}
function Dg(e) {
  const t = Number(e == null ? void 0 : e.total_documents), n = Number((e == null ? void 0 : e.indexed_count) ?? (e == null ? void 0 : e.indexed_documents)), o = Number((e == null ? void 0 : e.failed_count) ?? (e == null ? void 0 : e.failed_documents)), s = Number((e == null ? void 0 : e.in_progress_count) ?? (e == null ? void 0 : e.processing_documents)), i = String((e == null ? void 0 : e.status) || (e == null ? void 0 : e.state) || "");
  return ["ready", "completed", "complete", "healthy"].includes(i) ? "处理完成" : ["running", "processing", "pending", "indexing"].includes(i) ? "处理中" : ["failed", "error"].includes(i) || Number.isFinite(o) && o > 0 ? "需要处理" : Number.isFinite(s) && s > 0 ? "处理中" : Number.isFinite(t) && t > 0 && Number.isFinite(n) && n >= t ? "处理完成" : Number.isFinite(t) && t === 0 ? "暂无资料" : e ? "已生成" : "暂无报告";
}
function Rg(e) {
  return { completed: "已完成", complete: "已完成", running: "进行中", pending: "等待中", failed: "失败", error: "失败" }[e || ""] || e || "已保存";
}
function bt(e) {
  return JSON.parse(JSON.stringify(e));
}
class Tr extends Error {
  constructor(n, o) {
    super(n);
    lt(this, "status");
    this.name = "ApiError", this.status = o;
  }
}
async function rt(e, t) {
  const n = await fetch(e, t), o = await n.json().catch(() => null);
  if (!n.ok) throw new Tr((o == null ? void 0 : o.detail) || `请求失败 (${n.status})`, n.status);
  return o;
}
async function nf(e, t) {
  try {
    return await rt(e, t);
  } catch (n) {
    if (n instanceof Tr && n.status === 404) return null;
    throw n;
  }
}
function sl() {
  return rt("/api/personas", { cache: "no-store" });
}
async function of(e) {
  const t = await rt(`/api/personas/${encodeURIComponent(e)}/documents`, { cache: "no-store" });
  return Array.isArray(t) ? t : t && typeof t == "object" && Array.isArray(t.items) ? t.items : [];
}
async function sf() {
  return (await rt("/api/live2d/models", { cache: "no-store" })).models;
}
async function Lg() {
  await rt("/api/live2d/model-directory", {
    method: "POST",
    headers: { "X-CHARACTOID-Request": "web" }
  });
}
async function xu(e) {
  const [t, n, o, s, i, l] = await Promise.all([
    rt(`/api/personas/${encodeURIComponent(e.id)}/capabilities`, { cache: "no-store" }),
    rt(`/api/personas/${encodeURIComponent(e.id)}/mcp-grants`, { cache: "no-store" }),
    of(e.id),
    rt("/api/mcp/servers", { cache: "no-store" }).catch(() => []),
    sf().then((u) => ({ models: u })).catch(() => ({ models: [] })),
    rt("/api/voice-assets", { cache: "no-store" }).catch(() => ({ items: [] }))
  ]), r = new Map(s.map((u) => [u.name, u.status]));
  return {
    persona: bt(e),
    documents: o,
    capabilities: t,
    grants: { servers: n.servers.map((u) => ({ ...u, status: r.get(u.name) || { status: u.enabled ? "unknown" : "disabled" } })) },
    resources: { live2dModels: i.models, voiceAssets: l.items.filter((u) => u.status === "ready" && (!u.engine || u.engine === "gpt_sovits")) }
  };
}
async function Vg(e) {
  await rt(`/api/personas/${encodeURIComponent(e.id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: e.name, profile: e.profile || {} })
  });
}
async function zg(e, t) {
  await rt(`/api/personas/${encodeURIComponent(e)}/capabilities`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ overrides: t })
  });
}
async function Fg(e, t) {
  const n = t.filter((o) => o.authorized && !o.global).map((o) => o.name);
  await rt(`/api/personas/${encodeURIComponent(e)}/mcp-grants`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ server_names: n })
  });
}
async function Bg(e) {
  await rt(`/api/personas/${encodeURIComponent(e)}`, { method: "DELETE" });
}
async function Hg(e, t, n) {
  if (!e.knowledge_space_id) throw new Error("角色知识空间不可用");
  const o = new FormData();
  t.forEach((i) => o.append("files", i)), n.trim() && o.append("files", new File([n.trim()], `text-${Date.now()}.txt`, { type: "text/plain;charset=utf-8" }));
  const s = await rt(`/api/knowledge-spaces/${encodeURIComponent(e.knowledge_space_id)}/documents/upload`, { method: "POST", body: o });
  await Promise.all(s.map((i) => rt(`/api/documents/${encodeURIComponent(i.id)}/confirm`, { method: "POST" })));
}
async function Ug(e) {
  var n;
  const t = await fetch(`/api/documents/${encodeURIComponent(e)}`, { method: "DELETE" });
  if (!t.ok) throw new Error(((n = await t.json().catch(() => null)) == null ? void 0 : n.detail) || `删除失败 (${t.status})`);
}
async function jg(e) {
  await rt(`/api/documents/${encodeURIComponent(e)}/retry-index`, { method: "POST" });
}
async function Gg(e, t) {
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
function qg(e) {
  return rt(`/api/personas/${encodeURIComponent(e)}/versions`, { cache: "no-store" });
}
function Yg(e, t) {
  return rt(`/api/personas/${encodeURIComponent(e)}/versions/${encodeURIComponent(t)}`, { cache: "no-store" });
}
function Xg(e, t = {}) {
  return rt(`/api/personas/${encodeURIComponent(e)}/versions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ label: t.label || "", note: t.note || "" })
  });
}
async function Kg(e, t) {
  return (await rt(
    `/api/personas/${encodeURIComponent(e)}/versions/${encodeURIComponent(t)}/publish`,
    { method: "POST" }
  )).version;
}
async function Wg(e, t) {
  return (await rt(
    `/api/personas/${encodeURIComponent(e)}/versions/${encodeURIComponent(t)}/rollback`,
    { method: "POST" }
  )).version;
}
async function Zg(e) {
  return nf(
    `/api/knowledge-spaces/${encodeURIComponent(e)}/documents/report`,
    { cache: "no-store" }
  );
}
async function Jg(e, t = 1) {
  const n = await nf(
    `/api/eval/history?persona_id=${encodeURIComponent(e)}&limit=${encodeURIComponent(String(t))}`,
    { cache: "no-store" }
  );
  return Og(n);
}
const Qg = [
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
function em(e) {
  return ["available", "partial", "unassigned", "blocked", "pending", "error"].includes(e) ? e : "blocked";
}
function jo(e, t, n) {
  return { id: e, type: t, position: { x: 0, y: 0 }, data: n };
}
function tm(e) {
  var i, l;
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), o = `persona:${e.persona.id}`, s = "module:extensions";
  t.set(o, jo(o, "persona", { kind: "persona", label: e.persona.name, summary: String(((i = e.persona.profile) == null ? void 0 : i.description) || "尚未填写人设"), status: "available", level: 0 }));
  for (const r of Qg) {
    const u = `module:${r.id}`;
    t.set(u, jo(u, "module", { kind: r.id, label: r.label, summary: r.summary(e), status: "available", level: 0 }));
    const c = r.id === "extensions";
    n.set(`${o}->${u}`, { id: `${o}->${u}`, source: o, target: u, sourceHandle: c ? "right-source" : "left-source", targetHandle: c ? "left-target" : "right-target" });
  }
  for (const r of e.capabilities.packages) {
    const u = r.kind === "skill" ? "skill" : "tool", c = e.capabilities.overrides[r.id], d = c === void 0 ? r.assigned : c, f = c === !1 ? "blocked" : c === !0 && r.status === "unassigned" ? "available" : r.status;
    t.set(r.id, jo(r.id, "capability", {
      kind: u,
      label: r.name,
      summary: r.description || r.reason || "能力包",
      status: em(f),
      level: r.level,
      assigned: d,
      configurable: !0,
      sourceId: r.id
    })), n.set(`${s}->${r.id}`, { id: `${s}->${r.id}`, source: s, target: r.id, sourceHandle: "right-source", targetHandle: "left-target" });
    for (const p of r.dependencies || []) {
      if (!p.id) continue;
      const h = e.capabilities.overrides[p.id], b = h === void 0 ? p.effective : h;
      if (t.set(p.id, jo(p.id, "capability", {
        kind: "tool",
        label: p.name,
        summary: p.server ? `MCP · ${p.server}` : p.source,
        status: b ? "available" : "blocked",
        level: p.level,
        assigned: b,
        configurable: !1,
        sourceId: p.id
      })), n.set(`${r.id}->${p.id}`, { id: `${r.id}->${p.id}`, source: r.id, target: p.id, sourceHandle: "right-source", targetHandle: "left-target" }), p.server) {
        const C = `mcp:${p.server}`, M = e.grants.servers.find((L) => L.name === p.server), P = ((l = M == null ? void 0 : M.status) == null ? void 0 : l.status) === "connected";
        t.set(C, jo(C, "capability", {
          kind: "mcp",
          label: p.server,
          summary: (M == null ? void 0 : M.description) || "MCP 服务",
          status: M != null && M.authorized && P ? "available" : "blocked",
          level: p.level,
          assigned: !!(M != null && M.authorized),
          configurable: !!(M && !M.global),
          sourceId: p.server
        })), n.set(`${p.id}->${C}`, { id: `${p.id}->${C}`, source: p.id, target: C, sourceHandle: "right-source", targetHandle: "left-target" });
      }
    }
  }
  return { nodes: [...t.values()], edges: [...n.values()] };
}
function nm(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var om = "\0", Qn = "\0", Su = "";
let sm = class {
  constructor(t) {
    lt(this, "_isDirected", !0);
    lt(this, "_isMultigraph", !1);
    lt(this, "_isCompound", !1);
    // Label for the graph itself
    lt(this, "_label");
    // Defaults to be set when creating a new node
    lt(this, "_defaultNodeLabelFn", () => {
    });
    // Defaults to be set when creating a new edge
    lt(this, "_defaultEdgeLabelFn", () => {
    });
    // v -> label
    lt(this, "_nodes", {});
    // v -> edgeObj
    lt(this, "_in", {});
    // u -> v -> Number
    lt(this, "_preds", {});
    // v -> edgeObj
    lt(this, "_out", {});
    // v -> w -> Number
    lt(this, "_sucs", {});
    // e -> edgeObj
    lt(this, "_edgeObjs", {});
    // e -> label
    lt(this, "_edgeLabels", {});
    /* Number of nodes in the graph. Should only be changed by the implementation. */
    lt(this, "_nodeCount", 0);
    /* Number of edges in the graph. Should only be changed by the implementation. */
    lt(this, "_edgeCount", 0);
    lt(this, "_parent");
    lt(this, "_children");
    t && (this._isDirected = Object.hasOwn(t, "directed") ? t.directed : !0, this._isMultigraph = Object.hasOwn(t, "multigraph") ? t.multigraph : !1, this._isCompound = Object.hasOwn(t, "compound") ? t.compound : !1), this._isCompound && (this._parent = {}, this._children = {}, this._children[Qn] = {});
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
    return Object.hasOwn(this._nodes, t) ? (arguments.length > 1 && (this._nodes[t] = n), this) : (this._nodes[t] = arguments.length > 1 ? n : this._defaultNodeLabelFn(t), this._isCompound && (this._parent[t] = Qn, this._children[t] = {}, this._children[Qn][t] = !0), this._in[t] = {}, this._preds[t] = {}, this._out[t] = {}, this._sucs[t] = {}, ++this._nodeCount, this);
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
      n = Qn;
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
      if (n !== Qn)
        return n;
    }
  }
  /**
   * Gets list of direct children of node v.
   * Complexity: O(1).
   */
  children(t = Qn) {
    if (this._isCompound) {
      var n = this._children[t];
      if (n)
        return Object.keys(n);
    } else {
      if (t === Qn)
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
    Object.entries(this._nodes).forEach(function([l, r]) {
      t(l) && n.setNode(l, r);
    }), Object.values(this._edgeObjs).forEach(function(l) {
      n.hasNode(l.v) && n.hasNode(l.w) && n.setEdge(l, o.edge(l));
    });
    var s = {};
    function i(l) {
      var r = o.parent(l);
      return r === void 0 || n.hasNode(r) ? (s[l] = r, r) : r in s ? s[r] : i(r);
    }
    return this._isCompound && n.nodes().forEach((l) => n.setParent(l, i(l))), n;
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
    return t.reduce(function(i, l) {
      return s.length > 1 ? o.setEdge(i, l, n) : o.setEdge(i, l), l;
    }), this;
  }
  /**
   * Creates or updates the label for the edge (v, w) with the optionally supplied
   * name. If label is supplied it is set as the value for the edge. If label is not
   * supplied and the edge was created by this call then the default edge label will
   * be assigned. The name parameter is only useful with multigraphs.
   */
  setEdge() {
    var t, n, o, s, i = !1, l = arguments[0];
    typeof l == "object" && l !== null && "v" in l ? (t = l.v, n = l.w, o = l.name, arguments.length === 2 && (s = arguments[1], i = !0)) : (t = l, n = arguments[1], o = arguments[3], arguments.length > 2 && (s = arguments[2], i = !0)), t = "" + t, n = "" + n, o !== void 0 && (o = "" + o);
    var r = Xo(this._isDirected, t, n, o);
    if (Object.hasOwn(this._edgeLabels, r))
      return i && (this._edgeLabels[r] = s), this;
    if (o !== void 0 && !this._isMultigraph)
      throw new Error("Cannot set a named edge when isMultigraph = false");
    this.setNode(t), this.setNode(n), this._edgeLabels[r] = i ? s : this._defaultEdgeLabelFn(t, n, o);
    var u = im(this._isDirected, t, n, o);
    return t = u.v, n = u.w, Object.freeze(u), this._edgeObjs[r] = u, $u(this._preds[n], t), $u(this._sucs[t], n), this._in[n][r] = u, this._out[t][r] = u, this._edgeCount++, this;
  }
  /**
   * Gets the label for the specified edge.
   * Complexity: O(1).
   */
  edge(t, n, o) {
    var s = arguments.length === 1 ? il(this._isDirected, arguments[0]) : Xo(this._isDirected, t, n, o);
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
    var s = arguments.length === 1 ? il(this._isDirected, arguments[0]) : Xo(this._isDirected, t, n, o);
    return Object.hasOwn(this._edgeLabels, s);
  }
  /**
   * Removes the specified edge from the graph. No subgraphs are considered.
   * Complexity: O(1).
   */
  removeEdge(t, n, o) {
    var s = arguments.length === 1 ? il(this._isDirected, arguments[0]) : Xo(this._isDirected, t, n, o), i = this._edgeObjs[s];
    return i && (t = i.v, n = i.w, delete this._edgeLabels[s], delete this._edgeObjs[s], Iu(this._preds[n], t), Iu(this._sucs[t], n), delete this._in[n][s], delete this._out[t][s], this._edgeCount--), this;
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
function $u(e, t) {
  e[t] ? e[t]++ : e[t] = 1;
}
function Iu(e, t) {
  --e[t] || delete e[t];
}
function Xo(e, t, n, o) {
  var s = "" + t, i = "" + n;
  if (!e && s > i) {
    var l = s;
    s = i, i = l;
  }
  return s + Su + i + Su + (o === void 0 ? om : o);
}
function im(e, t, n, o) {
  var s = "" + t, i = "" + n;
  if (!e && s > i) {
    var l = s;
    s = i, i = l;
  }
  var r = { v: s, w: i };
  return o && (r.name = o), r;
}
function il(e, t) {
  return Xo(e, t.v, t.w, t.name);
}
var Mr = sm, lm = "2.2.4", rm = {
  Graph: Mr,
  version: lm
}, am = Mr, um = {
  write: cm,
  read: pm
};
function cm(e) {
  var t = {
    options: {
      directed: e.isDirected(),
      multigraph: e.isMultigraph(),
      compound: e.isCompound()
    },
    nodes: dm(e),
    edges: fm(e)
  };
  return e.graph() !== void 0 && (t.value = structuredClone(e.graph())), t;
}
function dm(e) {
  return e.nodes().map(function(t) {
    var n = e.node(t), o = e.parent(t), s = { v: t };
    return n !== void 0 && (s.value = n), o !== void 0 && (s.parent = o), s;
  });
}
function fm(e) {
  return e.edges().map(function(t) {
    var n = e.edge(t), o = { v: t.v, w: t.w };
    return t.name !== void 0 && (o.name = t.name), n !== void 0 && (o.value = n), o;
  });
}
function pm(e) {
  var t = new am(e.options).setGraph(e.value);
  return e.nodes.forEach(function(n) {
    t.setNode(n.v, n.value), n.parent && t.setParent(n.v, n.parent);
  }), e.edges.forEach(function(n) {
    t.setEdge({ v: n.v, w: n.w, name: n.name }, n.value);
  }), t;
}
var hm = vm;
function vm(e) {
  var t = {}, n = [], o;
  function s(i) {
    Object.hasOwn(t, i) || (t[i] = !0, o.push(i), e.successors(i).forEach(s), e.predecessors(i).forEach(s));
  }
  return e.nodes().forEach(function(i) {
    o = [], s(i), o.length && n.push(o);
  }), n;
}
let gm = class {
  constructor() {
    lt(this, "_arr", []);
    lt(this, "_keyIndices", {});
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
    var o = this._arr, s = this._keyIndices, i = o[t], l = o[n];
    o[t] = l, o[n] = i, s[l.key] = t, s[i.key] = n;
  }
};
var lf = gm, mm = lf, rf = bm, ym = () => 1;
function bm(e, t, n, o) {
  return _m(
    e,
    String(t),
    n || ym,
    o || function(s) {
      return e.outEdges(s);
    }
  );
}
function _m(e, t, n, o) {
  var s = {}, i = new mm(), l, r, u = function(c) {
    var d = c.v !== l ? c.v : c.w, f = s[d], p = n(c), h = r.distance + p;
    if (p < 0)
      throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + c + " Weight: " + p);
    h < f.distance && (f.distance = h, f.predecessor = l, i.decrease(d, h));
  };
  for (e.nodes().forEach(function(c) {
    var d = c === t ? 0 : Number.POSITIVE_INFINITY;
    s[c] = { distance: d }, i.add(c, d);
  }); i.size() > 0 && (l = i.removeMin(), r = s[l], r.distance !== Number.POSITIVE_INFINITY); )
    o(l).forEach(u);
  return s;
}
var wm = rf, km = Em;
function Em(e, t, n) {
  return e.nodes().reduce(function(o, s) {
    return o[s] = wm(e, s, t, n), o;
  }, {});
}
var af = Cm;
function Cm(e) {
  var t = 0, n = [], o = {}, s = [];
  function i(l) {
    var r = o[l] = {
      onStack: !0,
      lowlink: t,
      index: t++
    };
    if (n.push(l), e.successors(l).forEach(function(d) {
      Object.hasOwn(o, d) ? o[d].onStack && (r.lowlink = Math.min(r.lowlink, o[d].index)) : (i(d), r.lowlink = Math.min(r.lowlink, o[d].lowlink));
    }), r.lowlink === r.index) {
      var u = [], c;
      do
        c = n.pop(), o[c].onStack = !1, u.push(c);
      while (l !== c);
      s.push(u);
    }
  }
  return e.nodes().forEach(function(l) {
    Object.hasOwn(o, l) || i(l);
  }), s;
}
var xm = af, Sm = $m;
function $m(e) {
  return xm(e).filter(function(t) {
    return t.length > 1 || t.length === 1 && e.hasEdge(t[0], t[0]);
  });
}
var Im = Tm, Nm = () => 1;
function Tm(e, t, n) {
  return Mm(
    e,
    t || Nm,
    n || function(o) {
      return e.outEdges(o);
    }
  );
}
function Mm(e, t, n) {
  var o = {}, s = e.nodes();
  return s.forEach(function(i) {
    o[i] = {}, o[i][i] = { distance: 0 }, s.forEach(function(l) {
      i !== l && (o[i][l] = { distance: Number.POSITIVE_INFINITY });
    }), n(i).forEach(function(l) {
      var r = l.v === i ? l.w : l.v, u = t(l);
      o[i][r] = { distance: u, predecessor: i };
    });
  }), s.forEach(function(i) {
    var l = o[i];
    s.forEach(function(r) {
      var u = o[r];
      s.forEach(function(c) {
        var d = u[i], f = l[c], p = u[c], h = d.distance + f.distance;
        h < p.distance && (p.distance = h, p.predecessor = f.predecessor);
      });
    });
  }), o;
}
function uf(e) {
  var t = {}, n = {}, o = [];
  function s(i) {
    if (Object.hasOwn(n, i))
      throw new Ul();
    Object.hasOwn(t, i) || (n[i] = !0, t[i] = !0, e.predecessors(i).forEach(s), delete n[i], o.push(i));
  }
  if (e.sinks().forEach(s), Object.keys(t).length !== e.nodeCount())
    throw new Ul();
  return o;
}
class Ul extends Error {
  constructor() {
    super(...arguments);
  }
}
var cf = uf;
uf.CycleException = Ul;
var Nu = cf, Pm = Om;
function Om(e) {
  try {
    Nu(e);
  } catch (t) {
    if (t instanceof Nu.CycleException)
      return !1;
    throw t;
  }
  return !0;
}
var df = Am;
function Am(e, t, n) {
  Array.isArray(t) || (t = [t]);
  var o = e.isDirected() ? (r) => e.successors(r) : (r) => e.neighbors(r), s = n === "post" ? Dm : Rm, i = [], l = {};
  return t.forEach((r) => {
    if (!e.hasNode(r))
      throw new Error("Graph does not have node: " + r);
    s(r, o, l, i);
  }), i;
}
function Dm(e, t, n, o) {
  for (var s = [[e, !1]]; s.length > 0; ) {
    var i = s.pop();
    i[1] ? o.push(i[0]) : Object.hasOwn(n, i[0]) || (n[i[0]] = !0, s.push([i[0], !0]), ff(t(i[0]), (l) => s.push([l, !1])));
  }
}
function Rm(e, t, n, o) {
  for (var s = [e]; s.length > 0; ) {
    var i = s.pop();
    Object.hasOwn(n, i) || (n[i] = !0, o.push(i), ff(t(i), (l) => s.push(l)));
  }
}
function ff(e, t) {
  for (var n = e.length; n--; )
    t(e[n], n, e);
  return e;
}
var Lm = df, Vm = zm;
function zm(e, t) {
  return Lm(e, t, "post");
}
var Fm = df, Bm = Hm;
function Hm(e, t) {
  return Fm(e, t, "pre");
}
var Um = Mr, jm = lf, Gm = qm;
function qm(e, t) {
  var n = new Um(), o = {}, s = new jm(), i;
  function l(u) {
    var c = u.v === i ? u.w : u.v, d = s.priority(c);
    if (d !== void 0) {
      var f = t(u);
      f < d && (o[c] = i, s.decrease(c, f));
    }
  }
  if (e.nodeCount() === 0)
    return n;
  e.nodes().forEach(function(u) {
    s.add(u, Number.POSITIVE_INFINITY), n.setNode(u);
  }), s.decrease(e.nodes()[0], 0);
  for (var r = !1; s.size() > 0; ) {
    if (i = s.removeMin(), Object.hasOwn(o, i))
      n.setEdge(i, o[i]);
    else {
      if (r)
        throw new Error("Input graph is not connected: " + e);
      r = !0;
    }
    e.nodeEdges(i).forEach(l);
  }
  return n;
}
var Ym = {
  components: hm,
  dijkstra: rf,
  dijkstraAll: km,
  findCycles: Sm,
  floydWarshall: Im,
  isAcyclic: Pm,
  postorder: Vm,
  preorder: Bm,
  prim: Gm,
  tarjan: af,
  topsort: cf
}, Tu = rm, tn = {
  Graph: Tu.Graph,
  json: um,
  alg: Ym,
  version: Tu.version
};
let Xm = class {
  constructor() {
    let t = {};
    t._next = t._prev = t, this._sentinel = t;
  }
  dequeue() {
    let t = this._sentinel, n = t._prev;
    if (n !== t)
      return Mu(n), n;
  }
  enqueue(t) {
    let n = this._sentinel;
    t._prev && t._next && Mu(t), t._next = n._next, n._next._prev = t, n._next = t, t._prev = n;
  }
  toString() {
    let t = [], n = this._sentinel, o = n._prev;
    for (; o !== n; )
      t.push(JSON.stringify(o, Km)), o = o._prev;
    return "[" + t.join(", ") + "]";
  }
};
function Mu(e) {
  e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev;
}
function Km(e, t) {
  if (e !== "_next" && e !== "_prev")
    return t;
}
var Wm = Xm;
let Zm = tn.Graph, Jm = Wm;
var Qm = ty;
let ey = () => 1;
function ty(e, t) {
  if (e.nodeCount() <= 1)
    return [];
  let n = oy(e, t || ey);
  return ny(n.graph, n.buckets, n.zeroIdx).flatMap((s) => e.outEdges(s.v, s.w));
}
function ny(e, t, n) {
  let o = [], s = t[t.length - 1], i = t[0], l;
  for (; e.nodeCount(); ) {
    for (; l = i.dequeue(); )
      ll(e, t, n, l);
    for (; l = s.dequeue(); )
      ll(e, t, n, l);
    if (e.nodeCount()) {
      for (let r = t.length - 2; r > 0; --r)
        if (l = t[r].dequeue(), l) {
          o = o.concat(ll(e, t, n, l, !0));
          break;
        }
    }
  }
  return o;
}
function ll(e, t, n, o, s) {
  let i = s ? [] : void 0;
  return e.inEdges(o.v).forEach((l) => {
    let r = e.edge(l), u = e.node(l.v);
    s && i.push({ v: l.v, w: l.w }), u.out -= r, jl(t, n, u);
  }), e.outEdges(o.v).forEach((l) => {
    let r = e.edge(l), u = l.w, c = e.node(u);
    c.in -= r, jl(t, n, c);
  }), e.removeNode(o.v), i;
}
function oy(e, t) {
  let n = new Zm(), o = 0, s = 0;
  e.nodes().forEach((r) => {
    n.setNode(r, { v: r, in: 0, out: 0 });
  }), e.edges().forEach((r) => {
    let u = n.edge(r.v, r.w) || 0, c = t(r), d = u + c;
    n.setEdge(r.v, r.w, d), s = Math.max(s, n.node(r.v).out += c), o = Math.max(o, n.node(r.w).in += c);
  });
  let i = sy(s + o + 3).map(() => new Jm()), l = o + 1;
  return n.nodes().forEach((r) => {
    jl(i, l, n.node(r));
  }), { graph: n, buckets: i, zeroIdx: l };
}
function jl(e, t, n) {
  n.out ? n.in ? e[n.out - n.in + t].enqueue(n) : e[e.length - 1].enqueue(n) : e[0].enqueue(n);
}
function sy(e) {
  const t = [];
  for (let n = 0; n < e; n++)
    t.push(n);
  return t;
}
let pf = tn.Graph;
var gt = {
  addBorderNode: py,
  addDummyNode: hf,
  applyWithChunking: Ai,
  asNonCompoundGraph: ly,
  buildLayerMatrix: cy,
  intersectRect: uy,
  mapValues: _y,
  maxRank: gf,
  normalizeRanks: dy,
  notime: my,
  partition: vy,
  pick: by,
  predecessorWeights: ay,
  range: yf,
  removeEmptyRanks: fy,
  simplify: iy,
  successorWeights: ry,
  time: gy,
  uniqueId: mf,
  zipObject: Pr
};
function hf(e, t, n, o) {
  for (var s = o; e.hasNode(s); )
    s = mf(o);
  return n.dummy = t, e.setNode(s, n), s;
}
function iy(e) {
  let t = new pf().setGraph(e.graph());
  return e.nodes().forEach((n) => t.setNode(n, e.node(n))), e.edges().forEach((n) => {
    let o = t.edge(n.v, n.w) || { weight: 0, minlen: 1 }, s = e.edge(n);
    t.setEdge(n.v, n.w, {
      weight: o.weight + s.weight,
      minlen: Math.max(o.minlen, s.minlen)
    });
  }), t;
}
function ly(e) {
  let t = new pf({ multigraph: e.isMultigraph() }).setGraph(e.graph());
  return e.nodes().forEach((n) => {
    e.children(n).length || t.setNode(n, e.node(n));
  }), e.edges().forEach((n) => {
    t.setEdge(n, e.edge(n));
  }), t;
}
function ry(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.outEdges(n).forEach((s) => {
      o[s.w] = (o[s.w] || 0) + e.edge(s).weight;
    }), o;
  });
  return Pr(e.nodes(), t);
}
function ay(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.inEdges(n).forEach((s) => {
      o[s.v] = (o[s.v] || 0) + e.edge(s).weight;
    }), o;
  });
  return Pr(e.nodes(), t);
}
function uy(e, t) {
  let n = e.x, o = e.y, s = t.x - n, i = t.y - o, l = e.width / 2, r = e.height / 2;
  if (!s && !i)
    throw new Error("Not possible to find intersection inside of the rectangle");
  let u, c;
  return Math.abs(i) * l > Math.abs(s) * r ? (i < 0 && (r = -r), u = r * s / i, c = r) : (s < 0 && (l = -l), u = l, c = l * i / s), { x: n + u, y: o + c };
}
function cy(e) {
  let t = yf(gf(e) + 1).map(() => []);
  return e.nodes().forEach((n) => {
    let o = e.node(n), s = o.rank;
    s !== void 0 && (t[s][o.order] = n);
  }), t;
}
function dy(e) {
  let t = e.nodes().map((o) => {
    let s = e.node(o).rank;
    return s === void 0 ? Number.MAX_VALUE : s;
  }), n = Ai(Math.min, t);
  e.nodes().forEach((o) => {
    let s = e.node(o);
    Object.hasOwn(s, "rank") && (s.rank -= n);
  });
}
function fy(e) {
  let t = e.nodes().map((l) => e.node(l).rank), n = Ai(Math.min, t), o = [];
  e.nodes().forEach((l) => {
    let r = e.node(l).rank - n;
    o[r] || (o[r] = []), o[r].push(l);
  });
  let s = 0, i = e.graph().nodeRankFactor;
  Array.from(o).forEach((l, r) => {
    l === void 0 && r % i !== 0 ? --s : l !== void 0 && s && l.forEach((u) => e.node(u).rank += s);
  });
}
function py(e, t, n, o) {
  let s = {
    width: 0,
    height: 0
  };
  return arguments.length >= 4 && (s.rank = n, s.order = o), hf(e, "border", s, t);
}
function hy(e, t = vf) {
  const n = [];
  for (let o = 0; o < e.length; o += t) {
    const s = e.slice(o, o + t);
    n.push(s);
  }
  return n;
}
const vf = 65535;
function Ai(e, t) {
  if (t.length > vf) {
    const n = hy(t);
    return e.apply(null, n.map((o) => e.apply(null, o)));
  } else
    return e.apply(null, t);
}
function gf(e) {
  const n = e.nodes().map((o) => {
    let s = e.node(o).rank;
    return s === void 0 ? Number.MIN_VALUE : s;
  });
  return Ai(Math.max, n);
}
function vy(e, t) {
  let n = { lhs: [], rhs: [] };
  return e.forEach((o) => {
    t(o) ? n.lhs.push(o) : n.rhs.push(o);
  }), n;
}
function gy(e, t) {
  let n = Date.now();
  try {
    return t();
  } finally {
    console.log(e + " time: " + (Date.now() - n) + "ms");
  }
}
function my(e, t) {
  return t();
}
let yy = 0;
function mf(e) {
  var t = ++yy;
  return e + ("" + t);
}
function yf(e, t, n = 1) {
  t == null && (t = e, e = 0);
  let o = (i) => i < t;
  n < 0 && (o = (i) => t < i);
  const s = [];
  for (let i = e; o(i); i += n)
    s.push(i);
  return s;
}
function by(e, t) {
  const n = {};
  for (const o of t)
    e[o] !== void 0 && (n[o] = e[o]);
  return n;
}
function _y(e, t) {
  let n = t;
  return typeof t == "string" && (n = (o) => o[t]), Object.entries(e).reduce((o, [s, i]) => (o[s] = n(i, s), o), {});
}
function Pr(e, t) {
  return e.reduce((n, o, s) => (n[o] = t[s], n), {});
}
let wy = Qm, ky = gt.uniqueId;
var Ey = {
  run: Cy,
  undo: Sy
};
function Cy(e) {
  (e.graph().acyclicer === "greedy" ? wy(e, n(e)) : xy(e)).forEach((o) => {
    let s = e.edge(o);
    e.removeEdge(o), s.forwardName = o.name, s.reversed = !0, e.setEdge(o.w, o.v, s, ky("rev"));
  });
  function n(o) {
    return (s) => o.edge(s).weight;
  }
}
function xy(e) {
  let t = [], n = {}, o = {};
  function s(i) {
    Object.hasOwn(o, i) || (o[i] = !0, n[i] = !0, e.outEdges(i).forEach((l) => {
      Object.hasOwn(n, l.w) ? t.push(l) : s(l.w);
    }), delete n[i]);
  }
  return e.nodes().forEach(s), t;
}
function Sy(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.reversed) {
      e.removeEdge(t);
      let o = n.forwardName;
      delete n.reversed, delete n.forwardName, e.setEdge(t.w, t.v, n, o);
    }
  });
}
let $y = gt;
var Iy = {
  run: Ny,
  undo: My
};
function Ny(e) {
  e.graph().dummyChains = [], e.edges().forEach((t) => Ty(e, t));
}
function Ty(e, t) {
  let n = t.v, o = e.node(n).rank, s = t.w, i = e.node(s).rank, l = t.name, r = e.edge(t), u = r.labelRank;
  if (i === o + 1) return;
  e.removeEdge(t);
  let c, d, f;
  for (f = 0, ++o; o < i; ++f, ++o)
    r.points = [], d = {
      width: 0,
      height: 0,
      edgeLabel: r,
      edgeObj: t,
      rank: o
    }, c = $y.addDummyNode(e, "edge", d, "_d"), o === u && (d.width = r.width, d.height = r.height, d.dummy = "edge-label", d.labelpos = r.labelpos), e.setEdge(n, c, { weight: r.weight }, l), f === 0 && e.graph().dummyChains.push(c), n = c;
  e.setEdge(n, s, { weight: r.weight }, l);
}
function My(e) {
  e.graph().dummyChains.forEach((t) => {
    let n = e.node(t), o = n.edgeLabel, s;
    for (e.setEdge(n.edgeObj, o); n.dummy; )
      s = e.successors(t)[0], e.removeNode(t), o.points.push({ x: n.x, y: n.y }), n.dummy === "edge-label" && (o.x = n.x, o.y = n.y, o.width = n.width, o.height = n.height), t = s, n = e.node(t);
  });
}
const { applyWithChunking: Py } = gt;
var Di = {
  longestPath: Oy,
  slack: Ay
};
function Oy(e) {
  var t = {};
  function n(o) {
    var s = e.node(o);
    if (Object.hasOwn(t, o))
      return s.rank;
    t[o] = !0;
    let i = e.outEdges(o).map((r) => r == null ? Number.POSITIVE_INFINITY : n(r.w) - e.edge(r).minlen);
    var l = Py(Math.min, i);
    return l === Number.POSITIVE_INFINITY && (l = 0), s.rank = l;
  }
  e.sources().forEach(n);
}
function Ay(e, t) {
  return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen;
}
var Dy = tn.Graph, ci = Di.slack, bf = Ry;
function Ry(e) {
  var t = new Dy({ directed: !1 }), n = e.nodes()[0], o = e.nodeCount();
  t.setNode(n, {});
  for (var s, i; Ly(t, e) < o; )
    s = Vy(t, e), i = t.hasNode(s.v) ? ci(e, s) : -ci(e, s), zy(t, e, i);
  return t;
}
function Ly(e, t) {
  function n(o) {
    t.nodeEdges(o).forEach((s) => {
      var i = s.v, l = o === i ? s.w : i;
      !e.hasNode(l) && !ci(t, s) && (e.setNode(l, {}), e.setEdge(o, l, {}), n(l));
    });
  }
  return e.nodes().forEach(n), e.nodeCount();
}
function Vy(e, t) {
  return t.edges().reduce((o, s) => {
    let i = Number.POSITIVE_INFINITY;
    return e.hasNode(s.v) !== e.hasNode(s.w) && (i = ci(t, s)), i < o[0] ? [i, s] : o;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function zy(e, t, n) {
  e.nodes().forEach((o) => t.node(o).rank += n);
}
var Fy = bf, Pu = Di.slack, By = Di.longestPath, Hy = tn.alg.preorder, Uy = tn.alg.postorder, jy = gt.simplify, Gy = mo;
mo.initLowLimValues = Ar;
mo.initCutValues = Or;
mo.calcCutValue = _f;
mo.leaveEdge = kf;
mo.enterEdge = Ef;
mo.exchangeEdges = Cf;
function mo(e) {
  e = jy(e), By(e);
  var t = Fy(e);
  Ar(t), Or(t, e);
  for (var n, o; n = kf(t); )
    o = Ef(t, e, n), Cf(t, e, n, o);
}
function Or(e, t) {
  var n = Uy(e, e.nodes());
  n = n.slice(0, n.length - 1), n.forEach((o) => qy(e, t, o));
}
function qy(e, t, n) {
  var o = e.node(n), s = o.parent;
  e.edge(n, s).cutvalue = _f(e, t, n);
}
function _f(e, t, n) {
  var o = e.node(n), s = o.parent, i = !0, l = t.edge(n, s), r = 0;
  return l || (i = !1, l = t.edge(s, n)), r = l.weight, t.nodeEdges(n).forEach((u) => {
    var c = u.v === n, d = c ? u.w : u.v;
    if (d !== s) {
      var f = c === i, p = t.edge(u).weight;
      if (r += f ? p : -p, Xy(e, n, d)) {
        var h = e.edge(n, d).cutvalue;
        r += f ? -h : h;
      }
    }
  }), r;
}
function Ar(e, t) {
  arguments.length < 2 && (t = e.nodes()[0]), wf(e, {}, 1, t);
}
function wf(e, t, n, o, s) {
  var i = n, l = e.node(o);
  return t[o] = !0, e.neighbors(o).forEach((r) => {
    Object.hasOwn(t, r) || (n = wf(e, t, n, r, o));
  }), l.low = i, l.lim = n++, s ? l.parent = s : delete l.parent, n;
}
function kf(e) {
  return e.edges().find((t) => e.edge(t).cutvalue < 0);
}
function Ef(e, t, n) {
  var o = n.v, s = n.w;
  t.hasEdge(o, s) || (o = n.w, s = n.v);
  var i = e.node(o), l = e.node(s), r = i, u = !1;
  i.lim > l.lim && (r = l, u = !0);
  var c = t.edges().filter((d) => u === Ou(e, e.node(d.v), r) && u !== Ou(e, e.node(d.w), r));
  return c.reduce((d, f) => Pu(t, f) < Pu(t, d) ? f : d);
}
function Cf(e, t, n, o) {
  var s = n.v, i = n.w;
  e.removeEdge(s, i), e.setEdge(o.v, o.w, {}), Ar(e), Or(e, t), Yy(e, t);
}
function Yy(e, t) {
  var n = e.nodes().find((s) => !t.node(s).parent), o = Hy(e, n);
  o = o.slice(1), o.forEach((s) => {
    var i = e.node(s).parent, l = t.edge(s, i), r = !1;
    l || (l = t.edge(i, s), r = !0), t.node(s).rank = t.node(i).rank + (r ? l.minlen : -l.minlen);
  });
}
function Xy(e, t, n) {
  return e.hasEdge(t, n);
}
function Ou(e, t, n) {
  return n.low <= t.lim && t.lim <= n.lim;
}
var Ky = Di, xf = Ky.longestPath, Wy = bf, Zy = Gy, Jy = Qy;
function Qy(e) {
  var t = e.graph().ranker;
  if (t instanceof Function)
    return t(e);
  switch (e.graph().ranker) {
    case "network-simplex":
      Au(e);
      break;
    case "tight-tree":
      t1(e);
      break;
    case "longest-path":
      e1(e);
      break;
    case "none":
      break;
    default:
      Au(e);
  }
}
var e1 = xf;
function t1(e) {
  xf(e), Wy(e);
}
function Au(e) {
  Zy(e);
}
var n1 = o1;
function o1(e) {
  let t = i1(e);
  e.graph().dummyChains.forEach((n) => {
    let o = e.node(n), s = o.edgeObj, i = s1(e, t, s.v, s.w), l = i.path, r = i.lca, u = 0, c = l[u], d = !0;
    for (; n !== s.w; ) {
      if (o = e.node(n), d) {
        for (; (c = l[u]) !== r && e.node(c).maxRank < o.rank; )
          u++;
        c === r && (d = !1);
      }
      if (!d) {
        for (; u < l.length - 1 && e.node(c = l[u + 1]).minRank <= o.rank; )
          u++;
        c = l[u];
      }
      e.setParent(n, c), n = e.successors(n)[0];
    }
  });
}
function s1(e, t, n, o) {
  let s = [], i = [], l = Math.min(t[n].low, t[o].low), r = Math.max(t[n].lim, t[o].lim), u, c;
  u = n;
  do
    u = e.parent(u), s.push(u);
  while (u && (t[u].low > l || r > t[u].lim));
  for (c = u, u = o; (u = e.parent(u)) !== c; )
    i.push(u);
  return { path: s.concat(i.reverse()), lca: c };
}
function i1(e) {
  let t = {}, n = 0;
  function o(s) {
    let i = n;
    e.children(s).forEach(o), t[s] = { low: i, lim: n++ };
  }
  return e.children().forEach(o), t;
}
let di = gt;
var l1 = {
  run: r1,
  cleanup: c1
};
function r1(e) {
  let t = di.addDummyNode(e, "root", {}, "_root"), n = a1(e), o = Object.values(n), s = di.applyWithChunking(Math.max, o) - 1, i = 2 * s + 1;
  e.graph().nestingRoot = t, e.edges().forEach((r) => e.edge(r).minlen *= i);
  let l = u1(e) + 1;
  e.children().forEach((r) => Sf(e, t, i, l, s, n, r)), e.graph().nodeRankFactor = i;
}
function Sf(e, t, n, o, s, i, l) {
  let r = e.children(l);
  if (!r.length) {
    l !== t && e.setEdge(t, l, { weight: 0, minlen: n });
    return;
  }
  let u = di.addBorderNode(e, "_bt"), c = di.addBorderNode(e, "_bb"), d = e.node(l);
  e.setParent(u, l), d.borderTop = u, e.setParent(c, l), d.borderBottom = c, r.forEach((f) => {
    Sf(e, t, n, o, s, i, f);
    let p = e.node(f), h = p.borderTop ? p.borderTop : f, b = p.borderBottom ? p.borderBottom : f, C = p.borderTop ? o : 2 * o, M = h !== b ? 1 : s - i[l] + 1;
    e.setEdge(u, h, {
      weight: C,
      minlen: M,
      nestingEdge: !0
    }), e.setEdge(b, c, {
      weight: C,
      minlen: M,
      nestingEdge: !0
    });
  }), e.parent(l) || e.setEdge(t, u, { weight: 0, minlen: s + i[l] });
}
function a1(e) {
  var t = {};
  function n(o, s) {
    var i = e.children(o);
    i && i.length && i.forEach((l) => n(l, s + 1)), t[o] = s;
  }
  return e.children().forEach((o) => n(o, 1)), t;
}
function u1(e) {
  return e.edges().reduce((t, n) => t + e.edge(n).weight, 0);
}
function c1(e) {
  var t = e.graph();
  e.removeNode(t.nestingRoot), delete t.nestingRoot, e.edges().forEach((n) => {
    var o = e.edge(n);
    o.nestingEdge && e.removeEdge(n);
  });
}
let d1 = gt;
var f1 = p1;
function p1(e) {
  function t(n) {
    let o = e.children(n), s = e.node(n);
    if (o.length && o.forEach(t), Object.hasOwn(s, "minRank")) {
      s.borderLeft = [], s.borderRight = [];
      for (let i = s.minRank, l = s.maxRank + 1; i < l; ++i)
        Du(e, "borderLeft", "_bl", n, s, i), Du(e, "borderRight", "_br", n, s, i);
    }
  }
  e.children().forEach(t);
}
function Du(e, t, n, o, s, i) {
  let l = { width: 0, height: 0, rank: i, borderType: t }, r = s[t][i - 1], u = d1.addDummyNode(e, "border", l, n);
  s[t][i] = u, e.setParent(u, o), r && e.setEdge(r, u, { weight: 1 });
}
var h1 = {
  adjust: v1,
  undo: g1
};
function v1(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "lr" || t === "rl") && $f(e);
}
function g1(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "bt" || t === "rl") && m1(e), (t === "lr" || t === "rl") && (y1(e), $f(e));
}
function $f(e) {
  e.nodes().forEach((t) => Ru(e.node(t))), e.edges().forEach((t) => Ru(e.edge(t)));
}
function Ru(e) {
  let t = e.width;
  e.width = e.height, e.height = t;
}
function m1(e) {
  e.nodes().forEach((t) => rl(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(rl), Object.hasOwn(n, "y") && rl(n);
  });
}
function rl(e) {
  e.y = -e.y;
}
function y1(e) {
  e.nodes().forEach((t) => al(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(al), Object.hasOwn(n, "x") && al(n);
  });
}
function al(e) {
  let t = e.x;
  e.x = e.y, e.y = t;
}
let Lu = gt;
var b1 = _1;
function _1(e) {
  let t = {}, n = e.nodes().filter((u) => !e.children(u).length), o = n.map((u) => e.node(u).rank), s = Lu.applyWithChunking(Math.max, o), i = Lu.range(s + 1).map(() => []);
  function l(u) {
    if (t[u]) return;
    t[u] = !0;
    let c = e.node(u);
    i[c.rank].push(u), e.successors(u).forEach(l);
  }
  return n.sort((u, c) => e.node(u).rank - e.node(c).rank).forEach(l), i;
}
let w1 = gt.zipObject;
var k1 = E1;
function E1(e, t) {
  let n = 0;
  for (let o = 1; o < t.length; ++o)
    n += C1(e, t[o - 1], t[o]);
  return n;
}
function C1(e, t, n) {
  let o = w1(n, n.map((c, d) => d)), s = t.flatMap((c) => e.outEdges(c).map((d) => ({ pos: o[d.w], weight: e.edge(d).weight })).sort((d, f) => d.pos - f.pos)), i = 1;
  for (; i < n.length; ) i <<= 1;
  let l = 2 * i - 1;
  i -= 1;
  let r = new Array(l).fill(0), u = 0;
  return s.forEach((c) => {
    let d = c.pos + i;
    r[d] += c.weight;
    let f = 0;
    for (; d > 0; )
      d % 2 && (f += r[d + 1]), d = d - 1 >> 1, r[d] += c.weight;
    u += c.weight * f;
  }), u;
}
var x1 = S1;
function S1(e, t = []) {
  return t.map((n) => {
    let o = e.inEdges(n);
    if (o.length) {
      let s = o.reduce((i, l) => {
        let r = e.edge(l), u = e.node(l.v);
        return {
          sum: i.sum + r.weight * u.order,
          weight: i.weight + r.weight
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
let $1 = gt;
var I1 = N1;
function N1(e, t) {
  let n = {};
  e.forEach((s, i) => {
    let l = n[s.v] = {
      indegree: 0,
      in: [],
      out: [],
      vs: [s.v],
      i
    };
    s.barycenter !== void 0 && (l.barycenter = s.barycenter, l.weight = s.weight);
  }), t.edges().forEach((s) => {
    let i = n[s.v], l = n[s.w];
    i !== void 0 && l !== void 0 && (l.indegree++, i.out.push(n[s.w]));
  });
  let o = Object.values(n).filter((s) => !s.indegree);
  return T1(o);
}
function T1(e) {
  let t = [];
  function n(s) {
    return (i) => {
      i.merged || (i.barycenter === void 0 || s.barycenter === void 0 || i.barycenter >= s.barycenter) && M1(s, i);
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
  return t.filter((s) => !s.merged).map((s) => $1.pick(s, ["vs", "i", "barycenter", "weight"]));
}
function M1(e, t) {
  let n = 0, o = 0;
  e.weight && (n += e.barycenter * e.weight, o += e.weight), t.weight && (n += t.barycenter * t.weight, o += t.weight), e.vs = t.vs.concat(e.vs), e.barycenter = n / o, e.weight = o, e.i = Math.min(t.i, e.i), t.merged = !0;
}
let P1 = gt;
var O1 = A1;
function A1(e, t) {
  let n = P1.partition(e, (d) => Object.hasOwn(d, "barycenter")), o = n.lhs, s = n.rhs.sort((d, f) => f.i - d.i), i = [], l = 0, r = 0, u = 0;
  o.sort(D1(!!t)), u = Vu(i, s, u), o.forEach((d) => {
    u += d.vs.length, i.push(d.vs), l += d.barycenter * d.weight, r += d.weight, u = Vu(i, s, u);
  });
  let c = { vs: i.flat(!0) };
  return r && (c.barycenter = l / r, c.weight = r), c;
}
function Vu(e, t, n) {
  let o;
  for (; t.length && (o = t[t.length - 1]).i <= n; )
    t.pop(), e.push(o.vs), n++;
  return n;
}
function D1(e) {
  return (t, n) => t.barycenter < n.barycenter ? -1 : t.barycenter > n.barycenter ? 1 : e ? n.i - t.i : t.i - n.i;
}
let R1 = x1, L1 = I1, V1 = O1;
var z1 = If;
function If(e, t, n, o) {
  let s = e.children(t), i = e.node(t), l = i ? i.borderLeft : void 0, r = i ? i.borderRight : void 0, u = {};
  l && (s = s.filter((p) => p !== l && p !== r));
  let c = R1(e, s);
  c.forEach((p) => {
    if (e.children(p.v).length) {
      let h = If(e, p.v, n, o);
      u[p.v] = h, Object.hasOwn(h, "barycenter") && B1(p, h);
    }
  });
  let d = L1(c, n);
  F1(d, u);
  let f = V1(d, o);
  if (l && (f.vs = [l, f.vs, r].flat(!0), e.predecessors(l).length)) {
    let p = e.node(e.predecessors(l)[0]), h = e.node(e.predecessors(r)[0]);
    Object.hasOwn(f, "barycenter") || (f.barycenter = 0, f.weight = 0), f.barycenter = (f.barycenter * f.weight + p.order + h.order) / (f.weight + 2), f.weight += 2;
  }
  return f;
}
function F1(e, t) {
  e.forEach((n) => {
    n.vs = n.vs.flatMap((o) => t[o] ? t[o].vs : o);
  });
}
function B1(e, t) {
  e.barycenter !== void 0 ? (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight), e.weight += t.weight) : (e.barycenter = t.barycenter, e.weight = t.weight);
}
let H1 = tn.Graph, U1 = gt;
var j1 = G1;
function G1(e, t, n) {
  let o = q1(e), s = new H1({ compound: !0 }).setGraph({ root: o }).setDefaultNodeLabel((i) => e.node(i));
  return e.nodes().forEach((i) => {
    let l = e.node(i), r = e.parent(i);
    (l.rank === t || l.minRank <= t && t <= l.maxRank) && (s.setNode(i), s.setParent(i, r || o), e[n](i).forEach((u) => {
      let c = u.v === i ? u.w : u.v, d = s.edge(c, i), f = d !== void 0 ? d.weight : 0;
      s.setEdge(c, i, { weight: e.edge(u).weight + f });
    }), Object.hasOwn(l, "minRank") && s.setNode(i, {
      borderLeft: l.borderLeft[t],
      borderRight: l.borderRight[t]
    }));
  }), s;
}
function q1(e) {
  for (var t; e.hasNode(t = U1.uniqueId("_root")); ) ;
  return t;
}
var Y1 = X1;
function X1(e, t, n) {
  let o = {}, s;
  n.forEach((i) => {
    let l = e.parent(i), r, u;
    for (; l; ) {
      if (r = e.parent(l), r ? (u = o[r], o[r] = l) : (u = s, s = l), u && u !== l) {
        t.setEdge(u, l);
        return;
      }
      l = r;
    }
  });
}
let K1 = b1, W1 = k1, Z1 = z1, J1 = j1, Q1 = Y1, eb = tn.Graph, As = gt;
var tb = Nf;
function Nf(e, t) {
  if (t && typeof t.customOrder == "function") {
    t.customOrder(e, Nf);
    return;
  }
  let n = As.maxRank(e), o = zu(e, As.range(1, n + 1), "inEdges"), s = zu(e, As.range(n - 1, -1, -1), "outEdges"), i = K1(e);
  if (Fu(e, i), t && t.disableOptimalOrderHeuristic)
    return;
  let l = Number.POSITIVE_INFINITY, r;
  for (let u = 0, c = 0; c < 4; ++u, ++c) {
    nb(u % 2 ? o : s, u % 4 >= 2), i = As.buildLayerMatrix(e);
    let d = W1(e, i);
    d < l && (c = 0, r = Object.assign({}, i), l = d);
  }
  Fu(e, r);
}
function zu(e, t, n) {
  return t.map(function(o) {
    return J1(e, o, n);
  });
}
function nb(e, t) {
  let n = new eb();
  e.forEach(function(o) {
    let s = o.graph().root, i = Z1(o, s, n, t);
    i.vs.forEach((l, r) => o.node(l).order = r), Q1(o, n, i.vs);
  });
}
function Fu(e, t) {
  Object.values(t).forEach((n) => n.forEach((o, s) => e.node(o).order = s));
}
let ob = tn.Graph, kn = gt;
var sb = {
  positionX: vb
};
function ib(e, t) {
  let n = {};
  function o(s, i) {
    let l = 0, r = 0, u = s.length, c = i[i.length - 1];
    return i.forEach((d, f) => {
      let p = rb(e, d), h = p ? e.node(p).order : u;
      (p || d === c) && (i.slice(r, f + 1).forEach((b) => {
        e.predecessors(b).forEach((C) => {
          let M = e.node(C), P = M.order;
          (P < l || h < P) && !(M.dummy && e.node(b).dummy) && Tf(n, C, b);
        });
      }), r = f + 1, l = h);
    }), i;
  }
  return t.length && t.reduce(o), n;
}
function lb(e, t) {
  let n = {};
  function o(i, l, r, u, c) {
    let d;
    kn.range(l, r).forEach((f) => {
      d = i[f], e.node(d).dummy && e.predecessors(d).forEach((p) => {
        let h = e.node(p);
        h.dummy && (h.order < u || h.order > c) && Tf(n, p, d);
      });
    });
  }
  function s(i, l) {
    let r = -1, u, c = 0;
    return l.forEach((d, f) => {
      if (e.node(d).dummy === "border") {
        let p = e.predecessors(d);
        p.length && (u = e.node(p[0]).order, o(l, c, f, r, u), c = f, r = u);
      }
      o(l, c, l.length, u, i.length);
    }), l;
  }
  return t.length && t.reduce(s), n;
}
function rb(e, t) {
  if (e.node(t).dummy)
    return e.predecessors(t).find((n) => e.node(n).dummy);
}
function Tf(e, t, n) {
  if (t > n) {
    let s = t;
    t = n, n = s;
  }
  let o = e[t];
  o || (e[t] = o = {}), o[n] = !0;
}
function ab(e, t, n) {
  if (t > n) {
    let o = t;
    t = n, n = o;
  }
  return !!e[t] && Object.hasOwn(e[t], n);
}
function ub(e, t, n, o) {
  let s = {}, i = {}, l = {};
  return t.forEach((r) => {
    r.forEach((u, c) => {
      s[u] = u, i[u] = u, l[u] = c;
    });
  }), t.forEach((r) => {
    let u = -1;
    r.forEach((c) => {
      let d = o(c);
      if (d.length) {
        d = d.sort((p, h) => l[p] - l[h]);
        let f = (d.length - 1) / 2;
        for (let p = Math.floor(f), h = Math.ceil(f); p <= h; ++p) {
          let b = d[p];
          i[c] === c && u < l[b] && !ab(n, c, b) && (i[b] = c, i[c] = s[c] = s[b], u = l[b]);
        }
      }
    });
  }), { root: s, align: i };
}
function cb(e, t, n, o, s) {
  let i = {}, l = db(e, t, n, s), r = s ? "borderLeft" : "borderRight";
  function u(f, p) {
    let h = l.nodes(), b = h.pop(), C = {};
    for (; b; )
      C[b] ? f(b) : (C[b] = !0, h.push(b), h = h.concat(p(b))), b = h.pop();
  }
  function c(f) {
    i[f] = l.inEdges(f).reduce((p, h) => Math.max(p, i[h.v] + l.edge(h)), 0);
  }
  function d(f) {
    let p = l.outEdges(f).reduce((b, C) => Math.min(b, i[C.w] - l.edge(C)), Number.POSITIVE_INFINITY), h = e.node(f);
    p !== Number.POSITIVE_INFINITY && h.borderType !== r && (i[f] = Math.max(i[f], p));
  }
  return u(c, l.predecessors.bind(l)), u(d, l.successors.bind(l)), Object.keys(o).forEach((f) => i[f] = i[n[f]]), i;
}
function db(e, t, n, o) {
  let s = new ob(), i = e.graph(), l = gb(i.nodesep, i.edgesep, o);
  return t.forEach((r) => {
    let u;
    r.forEach((c) => {
      let d = n[c];
      if (s.setNode(d), u) {
        var f = n[u], p = s.edge(f, d);
        s.setEdge(f, d, Math.max(l(e, c, u), p || 0));
      }
      u = c;
    });
  }), s;
}
function fb(e, t) {
  return Object.values(t).reduce((n, o) => {
    let s = Number.NEGATIVE_INFINITY, i = Number.POSITIVE_INFINITY;
    Object.entries(o).forEach(([r, u]) => {
      let c = mb(e, r) / 2;
      s = Math.max(u + c, s), i = Math.min(u - c, i);
    });
    const l = s - i;
    return l < n[0] && (n = [l, o]), n;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function pb(e, t) {
  let n = Object.values(t), o = kn.applyWithChunking(Math.min, n), s = kn.applyWithChunking(Math.max, n);
  ["u", "d"].forEach((i) => {
    ["l", "r"].forEach((l) => {
      let r = i + l, u = e[r];
      if (u === t) return;
      let c = Object.values(u), d = o - kn.applyWithChunking(Math.min, c);
      l !== "l" && (d = s - kn.applyWithChunking(Math.max, c)), d && (e[r] = kn.mapValues(u, (f) => f + d));
    });
  });
}
function hb(e, t) {
  return kn.mapValues(e.ul, (n, o) => {
    if (t)
      return e[t.toLowerCase()][o];
    {
      let s = Object.values(e).map((i) => i[o]).sort((i, l) => i - l);
      return (s[1] + s[2]) / 2;
    }
  });
}
function vb(e) {
  let t = kn.buildLayerMatrix(e), n = Object.assign(
    ib(e, t),
    lb(e, t)
  ), o = {}, s;
  ["u", "d"].forEach((l) => {
    s = l === "u" ? t : Object.values(t).reverse(), ["l", "r"].forEach((r) => {
      r === "r" && (s = s.map((f) => Object.values(f).reverse()));
      let u = (l === "u" ? e.predecessors : e.successors).bind(e), c = ub(e, s, n, u), d = cb(
        e,
        s,
        c.root,
        c.align,
        r === "r"
      );
      r === "r" && (d = kn.mapValues(d, (f) => -f)), o[l + r] = d;
    });
  });
  let i = fb(e, o);
  return pb(o, i), hb(o, e.graph().align);
}
function gb(e, t, n) {
  return (o, s, i) => {
    let l = o.node(s), r = o.node(i), u = 0, c;
    if (u += l.width / 2, Object.hasOwn(l, "labelpos"))
      switch (l.labelpos.toLowerCase()) {
        case "l":
          c = -l.width / 2;
          break;
        case "r":
          c = l.width / 2;
          break;
      }
    if (c && (u += n ? c : -c), c = 0, u += (l.dummy ? t : e) / 2, u += (r.dummy ? t : e) / 2, u += r.width / 2, Object.hasOwn(r, "labelpos"))
      switch (r.labelpos.toLowerCase()) {
        case "l":
          c = r.width / 2;
          break;
        case "r":
          c = -r.width / 2;
          break;
      }
    return c && (u += n ? c : -c), c = 0, u;
  };
}
function mb(e, t) {
  return e.node(t).width;
}
let Mf = gt, yb = sb.positionX;
var bb = _b;
function _b(e) {
  e = Mf.asNonCompoundGraph(e), wb(e), Object.entries(yb(e)).forEach(([t, n]) => e.node(t).x = n);
}
function wb(e) {
  let t = Mf.buildLayerMatrix(e), n = e.graph().ranksep, o = 0;
  t.forEach((s) => {
    const i = s.reduce((l, r) => {
      const u = e.node(r).height;
      return l > u ? l : u;
    }, 0);
    s.forEach((l) => e.node(l).y = o + i / 2), o += i + n;
  });
}
let Bu = Ey, Hu = Iy, kb = Jy, Eb = gt.normalizeRanks, Cb = n1, xb = gt.removeEmptyRanks, Uu = l1, Sb = f1, ju = h1, $b = tb, Ib = bb, Kt = gt, Nb = tn.Graph;
var Tb = Mb;
function Mb(e, t) {
  let n = t && t.debugTiming ? Kt.time : Kt.notime;
  n("layout", () => {
    let o = n("  buildLayoutGraph", () => Bb(e));
    n("  runLayout", () => Pb(o, n, t)), n("  updateInputGraph", () => Ob(e, o));
  });
}
function Pb(e, t, n) {
  t("    makeSpaceForEdgeLabels", () => Hb(e)), t("    removeSelfEdges", () => Zb(e)), t("    acyclic", () => Bu.run(e)), t("    nestingGraph.run", () => Uu.run(e)), t("    rank", () => kb(Kt.asNonCompoundGraph(e))), t("    injectEdgeLabelProxies", () => Ub(e)), t("    removeEmptyRanks", () => xb(e)), t("    nestingGraph.cleanup", () => Uu.cleanup(e)), t("    normalizeRanks", () => Eb(e)), t("    assignRankMinMax", () => jb(e)), t("    removeEdgeLabelProxies", () => Gb(e)), t("    normalize.run", () => Hu.run(e)), t("    parentDummyChains", () => Cb(e)), t("    addBorderSegments", () => Sb(e)), t("    order", () => $b(e, n)), t("    insertSelfEdges", () => Jb(e)), t("    adjustCoordinateSystem", () => ju.adjust(e)), t("    position", () => Ib(e)), t("    positionSelfEdges", () => Qb(e)), t("    removeBorderNodes", () => Wb(e)), t("    normalize.undo", () => Hu.undo(e)), t("    fixupEdgeLabelCoords", () => Xb(e)), t("    undoCoordinateSystem", () => ju.undo(e)), t("    translateGraph", () => qb(e)), t("    assignNodeIntersects", () => Yb(e)), t("    reversePoints", () => Kb(e)), t("    acyclic.undo", () => Bu.undo(e));
}
function Ob(e, t) {
  e.nodes().forEach((n) => {
    let o = e.node(n), s = t.node(n);
    o && (o.x = s.x, o.y = s.y, o.rank = s.rank, t.children(n).length && (o.width = s.width, o.height = s.height));
  }), e.edges().forEach((n) => {
    let o = e.edge(n), s = t.edge(n);
    o.points = s.points, Object.hasOwn(s, "x") && (o.x = s.x, o.y = s.y);
  }), e.graph().width = t.graph().width, e.graph().height = t.graph().height;
}
let Ab = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], Db = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" }, Rb = ["acyclicer", "ranker", "rankdir", "align"], Lb = ["width", "height", "rank"], Gu = { width: 0, height: 0 }, Vb = ["minlen", "weight", "width", "height", "labeloffset"], zb = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
}, Fb = ["labelpos"];
function Bb(e) {
  let t = new Nb({ multigraph: !0, compound: !0 }), n = cl(e.graph());
  return t.setGraph(Object.assign(
    {},
    Db,
    ul(n, Ab),
    Kt.pick(n, Rb)
  )), e.nodes().forEach((o) => {
    let s = cl(e.node(o));
    const i = ul(s, Lb);
    Object.keys(Gu).forEach((l) => {
      i[l] === void 0 && (i[l] = Gu[l]);
    }), t.setNode(o, i), t.setParent(o, e.parent(o));
  }), e.edges().forEach((o) => {
    let s = cl(e.edge(o));
    t.setEdge(o, Object.assign(
      {},
      zb,
      ul(s, Vb),
      Kt.pick(s, Fb)
    ));
  }), t;
}
function Hb(e) {
  let t = e.graph();
  t.ranksep /= 2, e.edges().forEach((n) => {
    let o = e.edge(n);
    o.minlen *= 2, o.labelpos.toLowerCase() !== "c" && (t.rankdir === "TB" || t.rankdir === "BT" ? o.width += o.labeloffset : o.height += o.labeloffset);
  });
}
function Ub(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.width && n.height) {
      let o = e.node(t.v), i = { rank: (e.node(t.w).rank - o.rank) / 2 + o.rank, e: t };
      Kt.addDummyNode(e, "edge-proxy", i, "_ep");
    }
  });
}
function jb(e) {
  let t = 0;
  e.nodes().forEach((n) => {
    let o = e.node(n);
    o.borderTop && (o.minRank = e.node(o.borderTop).rank, o.maxRank = e.node(o.borderBottom).rank, t = Math.max(t, o.maxRank));
  }), e.graph().maxRank = t;
}
function Gb(e) {
  e.nodes().forEach((t) => {
    let n = e.node(t);
    n.dummy === "edge-proxy" && (e.edge(n.e).labelRank = n.rank, e.removeNode(t));
  });
}
function qb(e) {
  let t = Number.POSITIVE_INFINITY, n = 0, o = Number.POSITIVE_INFINITY, s = 0, i = e.graph(), l = i.marginx || 0, r = i.marginy || 0;
  function u(c) {
    let d = c.x, f = c.y, p = c.width, h = c.height;
    t = Math.min(t, d - p / 2), n = Math.max(n, d + p / 2), o = Math.min(o, f - h / 2), s = Math.max(s, f + h / 2);
  }
  e.nodes().forEach((c) => u(e.node(c))), e.edges().forEach((c) => {
    let d = e.edge(c);
    Object.hasOwn(d, "x") && u(d);
  }), t -= l, o -= r, e.nodes().forEach((c) => {
    let d = e.node(c);
    d.x -= t, d.y -= o;
  }), e.edges().forEach((c) => {
    let d = e.edge(c);
    d.points.forEach((f) => {
      f.x -= t, f.y -= o;
    }), Object.hasOwn(d, "x") && (d.x -= t), Object.hasOwn(d, "y") && (d.y -= o);
  }), i.width = n - t + l, i.height = s - o + r;
}
function Yb(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t), o = e.node(t.v), s = e.node(t.w), i, l;
    n.points ? (i = n.points[0], l = n.points[n.points.length - 1]) : (n.points = [], i = s, l = o), n.points.unshift(Kt.intersectRect(o, i)), n.points.push(Kt.intersectRect(s, l));
  });
}
function Xb(e) {
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
function Kb(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    n.reversed && n.points.reverse();
  });
}
function Wb(e) {
  e.nodes().forEach((t) => {
    if (e.children(t).length) {
      let n = e.node(t), o = e.node(n.borderTop), s = e.node(n.borderBottom), i = e.node(n.borderLeft[n.borderLeft.length - 1]), l = e.node(n.borderRight[n.borderRight.length - 1]);
      n.width = Math.abs(l.x - i.x), n.height = Math.abs(s.y - o.y), n.x = i.x + n.width / 2, n.y = o.y + n.height / 2;
    }
  }), e.nodes().forEach((t) => {
    e.node(t).dummy === "border" && e.removeNode(t);
  });
}
function Zb(e) {
  e.edges().forEach((t) => {
    if (t.v === t.w) {
      var n = e.node(t.v);
      n.selfEdges || (n.selfEdges = []), n.selfEdges.push({ e: t, label: e.edge(t) }), e.removeEdge(t);
    }
  });
}
function Jb(e) {
  var t = Kt.buildLayerMatrix(e);
  t.forEach((n) => {
    var o = 0;
    n.forEach((s, i) => {
      var l = e.node(s);
      l.order = i + o, (l.selfEdges || []).forEach((r) => {
        Kt.addDummyNode(e, "selfedge", {
          width: r.label.width,
          height: r.label.height,
          rank: l.rank,
          order: i + ++o,
          e: r.e,
          label: r.label
        }, "_se");
      }), delete l.selfEdges;
    });
  });
}
function Qb(e) {
  e.nodes().forEach((t) => {
    var n = e.node(t);
    if (n.dummy === "selfedge") {
      var o = e.node(n.e.v), s = o.x + o.width / 2, i = o.y, l = n.x - s, r = o.height / 2;
      e.setEdge(n.e, n.label), e.removeNode(t), n.label.points = [
        { x: s + 2 * l / 3, y: i - r },
        { x: s + 5 * l / 6, y: i - r },
        { x: s + l, y: i },
        { x: s + 5 * l / 6, y: i + r },
        { x: s + 2 * l / 3, y: i + r }
      ], n.label.x = n.x, n.label.y = n.y;
    }
  });
}
function ul(e, t) {
  return Kt.mapValues(Kt.pick(e, t), Number);
}
function cl(e) {
  var t = {};
  return e && Object.entries(e).forEach(([n, o]) => {
    typeof n == "string" && (n = n.toLowerCase()), t[n] = o;
  }), t;
}
let e_ = gt, t_ = tn.Graph;
var n_ = {
  debugOrdering: o_
};
function o_(e) {
  let t = e_.buildLayerMatrix(e), n = new t_({ compound: !0, multigraph: !0 }).setGraph({});
  return e.nodes().forEach((o) => {
    n.setNode(o, { label: o }), n.setParent(o, "layer" + e.node(o).rank);
  }), e.edges().forEach((o) => n.setEdge(o.v, o.w, {}, o.name)), t.forEach((o, s) => {
    let i = "layer" + s;
    n.setNode(i, { rank: "same" }), o.reduce((l, r) => (n.setEdge(l, r, { style: "invis" }), r));
  }), n;
}
var s_ = "1.1.5", i_ = {
  graphlib: tn,
  layout: Tb,
  debug: n_,
  util: {
    time: gt.time,
    notime: gt.notime
  },
  version: s_
};
const qu = /* @__PURE__ */ nm(i_), Yu = 190, Xu = 78, Ku = ["profile", "memory", "rag", "extensions", "voice", "live2d"];
function l_(e) {
  const t = e.nodes.find((u) => u.data.kind === "persona"), n = e.nodes.find((u) => u.data.kind === "extensions");
  if (!t || !n) return;
  const o = /* @__PURE__ */ new Map(), s = e.nodes.filter((u) => u.type === "module" && u.data.kind !== "extensions").sort((u, c) => Ku.indexOf(u.data.kind) - Ku.indexOf(c.data.kind));
  s.forEach((u, c) => o.set(u.id, { x: 34, y: 24 + c * 112 }));
  const i = 24 + (s.length - 1) * 112 / 2;
  o.set(t.id, { x: 340, y: i }), o.set(n.id, { x: 650, y: i });
  const l = new Set(e.edges.filter((u) => u.source === n.id).map((u) => u.target)), r = e.nodes.filter((u) => l.has(u.id)).sort((u, c) => u.data.level - c.data.level || u.data.label.localeCompare(c.data.label));
  if (r.length > 1) {
    const u = Math.min(3, r.length);
    r.forEach((c, d) => o.set(c.id, {
      x: 960 + d % u * 230,
      y: 24 + Math.floor(d / u) * 108
    }));
  } else if (r.length === 1) {
    const u = r[0];
    o.set(u.id, { x: 960, y: o.get(n.id).y });
    const c = /* @__PURE__ */ new Map([[u.id, 0]]), d = [u.id];
    for (; d.length; ) {
      const p = d.shift(), h = c.get(p);
      e.edges.filter((b) => b.source === p).forEach((b) => {
        c.has(b.target) || (c.set(b.target, h + 1), d.push(b.target));
      });
    }
    const f = Math.max(0, ...c.values());
    for (let p = 1; p <= f; p += 1) {
      const h = e.nodes.filter((C) => c.get(C.id) === p).sort((C, M) => C.data.label.localeCompare(M.data.label)), b = o.get(n.id).y;
      h.forEach((C, M) => o.set(C.id, {
        x: 960 + p * 260,
        y: b + (M - (h.length - 1) / 2) * 104
      }));
    }
  }
  return {
    nodes: e.nodes.map((u) => ({ ...u, position: o.get(u.id) || u.position })),
    edges: e.edges.map((u) => ({ ...u }))
  };
}
function r_(e) {
  const t = l_(e);
  if (t) return t;
  const n = new qu.graphlib.Graph();
  return n.setDefaultEdgeLabel(() => ({})), n.setGraph({ rankdir: "LR", nodesep: 34, ranksep: 96, marginx: 28, marginy: 28 }), [...e.nodes].sort((o, s) => o.id.localeCompare(s.id)).forEach((o) => n.setNode(o.id, { width: Yu, height: Xu })), [...e.edges].sort((o, s) => o.id.localeCompare(s.id)).forEach((o) => n.setEdge(o.source, o.target)), qu.layout(n), {
    nodes: e.nodes.map((o) => {
      const s = n.node(o.id);
      return { ...o, position: { x: s.x - Yu / 2, y: s.y - Xu / 2 } };
    }),
    edges: e.edges.map((o) => ({ ...o }))
  };
}
function a_(e, t) {
  const n = /* @__PURE__ */ new Set([t]), o = [t];
  for (; o.length; ) {
    const s = o.shift();
    for (const i of e.edges)
      i.source !== s || n.has(i.target) || (n.add(i.target), o.push(i.target));
  }
  return n;
}
function u_(e, t, n) {
  if (n.has(t)) return t;
  const o = /* @__PURE__ */ new Set(), s = [t];
  for (; s.length; ) {
    const i = s.shift();
    if (!o.has(i)) {
      o.add(i);
      for (const l of e.edges)
        if (l.target === i) {
          if (n.has(l.source)) return l.source;
          s.push(l.source);
        }
    }
  }
}
function c_(e, t) {
  var u;
  const n = e.nodes.find((c) => c.data.kind === "persona");
  if (!n) return e;
  const o = (u = e.nodes.find((c) => c.data.kind === "extensions")) == null ? void 0 : u.id, s = new Set(
    e.edges.filter((c) => c.source === (o || n.id)).map((c) => c.target).filter((c) => e.nodes.some((d) => d.id === c && ["skill", "tool"].includes(d.data.kind)))
  ), i = u_(e, t, s), l = t === o, r = /* @__PURE__ */ new Set([
    n.id,
    ...e.nodes.filter((c) => c.type === "module").map((c) => c.id),
    ...i ? [i] : l ? s : []
  ]);
  return i && a_(e, i).forEach((c) => r.add(c)), {
    nodes: e.nodes.filter((c) => r.has(c.id)),
    edges: e.edges.filter((c) => r.has(c.source) && r.has(c.target))
  };
}
const d_ = {
  class: "knowledge-quality",
  "aria-label": "知识质量"
}, f_ = { class: "knowledge-quality-heading" }, p_ = ["disabled"], h_ = {
  class: "knowledge-quality-stats",
  "aria-label": "资料处理概览"
}, v_ = { class: "knowledge-quality-report" }, g_ = { class: "knowledge-quality-subheading" }, m_ = {
  key: 0,
  class: "knowledge-quality-summary"
}, y_ = {
  key: 1,
  class: "knowledge-quality-meta"
}, b_ = { key: 0 }, __ = { key: 1 }, w_ = { key: 2 }, k_ = { key: 3 }, E_ = {
  key: 2,
  class: "knowledge-quality-empty"
}, C_ = { class: "knowledge-quality-evaluation" }, x_ = { class: "knowledge-quality-subheading" }, S_ = { key: 0 }, $_ = {
  key: 0,
  class: "knowledge-quality-summary"
}, I_ = { class: "knowledge-quality-eval-facts" }, N_ = { key: 0 }, T_ = { key: 1 }, M_ = {
  key: 1,
  class: "knowledge-quality-empty"
}, P_ = {
  key: 0,
  class: "knowledge-quality-error"
}, O_ = /* @__PURE__ */ He({
  __name: "KnowledgeQualityPanel",
  props: {
    personaId: {},
    knowledgeSpaceId: {},
    documents: {},
    disabled: { type: Boolean }
  },
  setup(e) {
    const t = e, n = te(null), o = te([]), s = te(!1), i = te("");
    let l = 0;
    const r = ae(() => Pg(t.documents)), u = ae(() => {
      if (!n.value) return r.value;
      const M = Number(n.value.total_documents), P = Number(n.value.indexed_count ?? n.value.indexed_documents), L = Number(n.value.in_progress_count ?? n.value.processing_documents), E = Number(n.value.failed_count ?? n.value.failed_documents);
      return [M, P, L, E].every(Number.isFinite) ? { total: M, indexed: P, processing: L, failed: E, attention: L + E } : r.value;
    }), c = ae(() => o.value[0] || null), d = ae(() => Dg(n.value)), f = ae(() => {
      var P, L, E;
      const M = ((P = n.value) == null ? void 0 : P.chunk_count) ?? ((L = n.value) == null ? void 0 : L.chunks) ?? ((E = n.value) == null ? void 0 : E.total_chunks);
      return Number.isFinite(Number(M)) ? Number(M) : null;
    }), p = ae(() => {
      var M, P, L;
      return ((P = (M = c.value) == null ? void 0 : M.metrics) == null ? void 0 : P.accepted_rate) ?? ((L = c.value) == null ? void 0 : L.accepted_rate);
    }), h = ae(() => {
      var L;
      const M = (L = n.value) == null ? void 0 : L.index_version_counts;
      if (!M) return "";
      const [P] = Object.keys(M);
      return P ? `索引 ${P}` : "";
    });
    function b(M) {
      if (!M) return "";
      const P = new Date(M);
      return Number.isNaN(P.getTime()) ? M : new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(P);
    }
    async function C() {
      const M = ++l;
      if (!t.knowledgeSpaceId) {
        n.value = null, o.value = [], i.value = "";
        return;
      }
      s.value = !0, i.value = "";
      const [P, L] = await Promise.allSettled([
        Zg(t.knowledgeSpaceId),
        Jg(t.personaId)
      ]);
      if (M !== l) return;
      P.status === "fulfilled" && (n.value = P.value), L.status === "fulfilled" && (o.value = L.value);
      const E = [P, L].find((x) => x.status === "rejected");
      (E == null ? void 0 : E.status) === "rejected" && (i.value = E.reason instanceof Error ? E.reason.message : String(E.reason)), s.value = !1;
    }
    return ze(() => [t.personaId, t.knowledgeSpaceId], C), xt(C), (M, P) => {
      var L, E, x;
      return v(), _("section", d_, [
        a("header", f_, [
          P[0] || (P[0] = a("div", null, [
            a("span", null, "知识质量"),
            a("strong", null, "处理与评测")
          ], -1)),
          a("button", {
            type: "button",
            class: "knowledge-quality-refresh",
            disabled: s.value || M.disabled || !M.knowledgeSpaceId,
            title: "刷新知识质量",
            onClick: C
          }, [
            ne(U(qt), {
              size: 13,
              class: be({ "is-spinning": s.value })
            }, null, 8, ["class"]),
            a("span", null, N(s.value ? "读取中" : "刷新"), 1)
          ], 8, p_)
        ]),
        a("div", h_, [
          a("div", null, [
            a("strong", null, N(u.value.total), 1),
            P[1] || (P[1] = a("span", null, "资料", -1))
          ]),
          a("div", null, [
            a("strong", null, N(u.value.indexed), 1),
            P[2] || (P[2] = a("span", null, "已索引", -1))
          ]),
          a("div", {
            class: be({ "has-attention": u.value.attention > 0 })
          }, [
            a("strong", null, N(u.value.attention), 1),
            P[3] || (P[3] = a("span", null, "需处理", -1))
          ], 2)
        ]),
        a("div", v_, [
          a("div", g_, [
            P[4] || (P[4] = a("span", null, "处理报告", -1)),
            a("b", {
              class: be({ "is-attention": u.value.attention > 0 })
            }, N(d.value), 3)
          ]),
          (L = n.value) != null && L.summary ? (v(), _("p", m_, N(n.value.summary), 1)) : se("", !0),
          f.value !== null || h.value ? (v(), _("p", y_, [
            f.value !== null ? (v(), _("span", b_, N(f.value) + " 个片段", 1)) : se("", !0),
            f.value !== null && h.value ? (v(), _("span", __, " · ")) : se("", !0),
            h.value ? (v(), _("span", w_, N(h.value), 1)) : se("", !0),
            (E = n.value) != null && E.latest_updated_at || (x = n.value) != null && x.updated_at ? (v(), _("span", k_, " · " + N(b(n.value.latest_updated_at || n.value.updated_at)) + " 更新", 1)) : se("", !0)
          ])) : n.value ? se("", !0) : (v(), _("p", E_, "暂无处理报告，当前先显示资料状态。"))
        ]),
        a("div", C_, [
          a("div", x_, [
            P[5] || (P[5] = a("span", null, "最近评测", -1)),
            c.value ? (v(), _("b", S_, N(U(Rg)(c.value.status)), 1)) : se("", !0)
          ]),
          c.value ? (v(), _(xe, { key: 0 }, [
            c.value.summary ? (v(), _("p", $_, N(c.value.summary), 1)) : se("", !0),
            a("div", I_, [
              p.value !== void 0 && p.value !== null ? (v(), _("span", N_, [
                P[6] || (P[6] = _e("通过率 ")),
                a("strong", null, N(U(Ag)(p.value)), 1)
              ])) : se("", !0),
              c.value.created_at ? (v(), _("span", T_, N(b(c.value.created_at)), 1)) : se("", !0)
            ])
          ], 64)) : (v(), _("p", M_, "暂无已保存评测，可从下方进入完整 RAG 评测。"))
        ]),
        i.value ? (v(), _("p", P_, "读取质量数据失败：" + N(i.value), 1)) : se("", !0)
      ]);
    };
  }
}), A_ = ["aria-busy"], D_ = {
  key: 0,
  class: "inspect-fields"
}, R_ = ["value"], L_ = ["value"], V_ = ["value"], z_ = { class: "inspect-fieldset" }, F_ = ["value"], B_ = ["value"], H_ = ["value"], U_ = ["value"], j_ = ["value"], G_ = { class: "inline-check" }, q_ = ["checked"], Y_ = {
  key: 1,
  class: "inspect-stack rag-inspector"
}, X_ = ["disabled"], K_ = {
  key: 0,
  class: "pending-files"
}, W_ = ["onClick"], Z_ = ["onClick"], J_ = ["disabled"], Q_ = { class: "document-items" }, e0 = { class: "document-actions" }, t0 = ["onClick"], n0 = ["onClick"], o0 = ["onClick"], s0 = {
  key: 2,
  class: "inspect-stack"
}, i0 = {
  key: 3,
  class: "inspect-stack"
}, l0 = {
  key: 4,
  class: "inspect-fields"
}, r0 = { class: "inline-check" }, a0 = ["checked"], u0 = { class: "inline-check" }, c0 = ["checked"], d0 = ["value"], f0 = ["value"], p0 = ["value"], h0 = { class: "inspect-button-row" }, v0 = ["disabled"], g0 = {
  key: 5,
  class: "live2d-model-library"
}, m0 = { class: "live2d-binding-summary" }, y0 = ["disabled"], b0 = { class: "live2d-library-actions" }, _0 = ["disabled"], w0 = ["disabled"], k0 = { class: "live2d-model-heading" }, E0 = {
  key: 0,
  class: "live2d-model-items"
}, C0 = { class: "live2d-model-copy" }, x0 = { class: "live2d-model-state" }, S0 = {
  key: 0,
  type: "button",
  disabled: "",
  class: "is-bound"
}, $0 = ["disabled", "title", "onClick"], I0 = {
  key: 1,
  class: "live2d-model-empty"
}, N0 = {
  key: 6,
  class: "inspect-fields"
}, T0 = { key: 0 }, M0 = ["value"], P0 = { key: 1 }, O0 = {
  key: 2,
  class: "dependency-list"
}, A0 = {
  key: 7,
  class: "inspect-fields"
}, D0 = { class: "inline-check" }, R0 = ["checked", "disabled"], L0 = /* @__PURE__ */ He({
  __name: "NodeInspector",
  props: {
    node: {},
    draft: {},
    disabled: { type: Boolean },
    uploadCompleteToken: {},
    canDelete: { type: Boolean }
  },
  emits: ["profile", "capability", "server", "upload", "deleteDocument", "retryDocument", "deletePersona", "previewVoice", "openVoiceStudio", "openRagEval", "previewDocument", "previewLocalFile", "refreshLive2d", "openLive2dDirectory"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = te([]), i = te(""), l = te(0), r = ae(() => {
      var H;
      return ((H = n.node) == null ? void 0 : H.data.kind) || "persona";
    }), u = ae(() => n.draft.capabilities.packages.find((H) => {
      var T;
      return H.id === ((T = n.node) == null ? void 0 : T.id);
    })), c = ae(() => r.value === "mcp" ? n.draft.grants.servers.find((H) => {
      var T;
      return `mcp:${H.name}` === ((T = n.node) == null ? void 0 : T.id);
    }) : void 0), d = ae(() => {
      const H = n.node ? n.draft.capabilities.overrides[n.node.id] : void 0;
      return H === !0 ? "allow" : H === !1 ? "deny" : "inherit";
    }), f = ae(() => {
      var H, T;
      return String(((T = (H = n.draft.persona.profile) == null ? void 0 : H.live2d) == null ? void 0 : T.model) || "");
    }), p = ae(() => {
      var H;
      return ((H = n.draft.resources) == null ? void 0 : H.live2dModels) || [];
    }), h = ae(() => {
      var H;
      return { available: "可用", partial: "部分可用", unassigned: "未分配", blocked: "不可用", pending: "等待中", error: "异常" }[((H = n.node) == null ? void 0 : H.data.status) || "blocked"];
    });
    function b(H) {
      return H.kind === "cubism2" ? "Cubism 2" : H.moc_version ? `MOC3 v${H.moc_version}` : "Cubism / MOC3";
    }
    function C(H, T) {
      const X = bt(n.draft.persona), q = { ...X.profile || {} };
      H === "name" ? X.name = String(T) : q[H] = T, X.profile = q, o("profile", X);
    }
    function M(H, T) {
      const X = bt(n.draft.persona), q = { ...X.profile || {} };
      q.tts = { ...q.tts || {}, [H]: T }, X.profile = q, o("profile", X);
    }
    function P(H) {
      const T = bt(n.draft.persona), X = { ...T.profile || {} };
      X.live2d = { ...X.live2d || {}, model: H }, T.profile = X, o("profile", T);
    }
    const L = ae(() => {
      var H;
      return ((H = n.draft.persona.profile) == null ? void 0 : H.rag) || {};
    });
    function E(H, T) {
      const X = bt(n.draft.persona), q = { ...X.profile || {} };
      q.rag = { ...q.rag || {}, [H]: T }, X.profile = q, o("profile", X);
    }
    function x(H) {
      s.value = Array.from(H.target.files || []);
    }
    function z(H) {
      var T;
      s.value = Array.from(((T = H.dataTransfer) == null ? void 0 : T.files) || []);
    }
    function Y(H) {
      s.value = s.value.filter((T, X) => X !== H);
    }
    function Z() {
      n.disabled || !s.value.length && !i.value.trim() || o("upload", s.value, i.value);
    }
    return ze(() => n.uploadCompleteToken, () => {
      s.value = [], i.value = "", l.value += 1;
    }), (H, T) => {
      var X, q, V, R, k, D, O, B, G, ie, de, ve, re, ye, pe, ce, Ie, Me;
      return v(), _("aside", {
        class: be(["node-inspector", { "is-disabled": H.disabled }]),
        "aria-busy": H.disabled
      }, [
        a("header", null, [
          a("div", null, [
            a("strong", null, N(((X = H.node) == null ? void 0 : X.data.label) || "角色配置"), 1),
            a("small", null, N((q = H.node) == null ? void 0 : q.data.summary), 1)
          ]),
          H.node ? (v(), _("span", {
            key: 0,
            class: be(`inspect-status status-${H.node.data.status}`)
          }, N(h.value), 3)) : se("", !0)
        ]),
        r.value === "profile" ? (v(), _("div", D_, [
          a("label", null, [
            T[24] || (T[24] = a("span", null, "角色名称", -1)),
            a("input", {
              value: H.draft.persona.name,
              onInput: T[0] || (T[0] = (oe) => C("name", oe.target.value))
            }, null, 40, R_)
          ]),
          a("label", null, [
            T[25] || (T[25] = a("span", null, "角色人设", -1)),
            a("textarea", {
              rows: "7",
              value: String(((V = H.draft.persona.profile) == null ? void 0 : V.description) || ""),
              onInput: T[1] || (T[1] = (oe) => C("description", oe.target.value))
            }, null, 40, L_)
          ]),
          a("label", null, [
            T[27] || (T[27] = a("span", null, "回复语言", -1)),
            a("select", {
              value: String(((R = H.draft.persona.profile) == null ? void 0 : R.reply_language) || ""),
              onChange: T[2] || (T[2] = (oe) => C("reply_language", oe.target.value))
            }, T[26] || (T[26] = [
              a("option", { value: "" }, "跟随对话", -1),
              a("option", { value: "zh" }, "中文", -1),
              a("option", { value: "ja" }, "日语", -1),
              a("option", { value: "en" }, "英语", -1)
            ]), 40, V_)
          ]),
          a("fieldset", z_, [
            T[35] || (T[35] = a("legend", null, "知识检索", -1)),
            a("label", null, [
              T[29] || (T[29] = a("span", null, "检索预设", -1)),
              a("select", {
                value: String(L.value.profile || "deep"),
                onChange: T[3] || (T[3] = (oe) => E("profile", oe.target.value))
              }, T[28] || (T[28] = [
                a("option", { value: "precise" }, "精准检索", -1),
                a("option", { value: "deep" }, "深度检索", -1),
                a("option", { value: "custom" }, "自定义", -1)
              ]), 40, F_)
            ]),
            L.value.profile === "custom" ? (v(), _(xe, { key: 0 }, [
              a("label", null, [
                T[30] || (T[30] = a("span", null, "初始召回 K", -1)),
                a("input", {
                  type: "number",
                  min: "1",
                  max: "100",
                  value: L.value.retrieval_k || 20,
                  onChange: T[4] || (T[4] = (oe) => E("retrieval_k", Number(oe.target.value)))
                }, null, 40, B_)
              ]),
              a("label", null, [
                T[31] || (T[31] = a("span", null, "重排保留 K", -1)),
                a("input", {
                  type: "number",
                  min: "1",
                  max: "100",
                  value: L.value.rerank_k || 8,
                  onChange: T[5] || (T[5] = (oe) => E("rerank_k", Number(oe.target.value)))
                }, null, 40, H_)
              ]),
              a("label", null, [
                T[32] || (T[32] = a("span", null, "最终上下文 K", -1)),
                a("input", {
                  type: "number",
                  min: "1",
                  max: "30",
                  value: L.value.final_context_k || 8,
                  onChange: T[6] || (T[6] = (oe) => E("final_context_k", Number(oe.target.value)))
                }, null, 40, U_)
              ]),
              a("label", null, [
                T[33] || (T[33] = a("span", null, "证据 Token 预算", -1)),
                a("input", {
                  type: "number",
                  min: "256",
                  max: "20000",
                  step: "256",
                  value: L.value.evidence_token_budget || 4500,
                  onChange: T[7] || (T[7] = (oe) => E("evidence_token_budget", Number(oe.target.value)))
                }, null, 40, j_)
              ]),
              a("label", G_, [
                a("input", {
                  type: "checkbox",
                  checked: L.value.allow_neighbors !== !1,
                  onChange: T[8] || (T[8] = (oe) => E("allow_neighbors", oe.target.checked))
                }, null, 40, q_),
                T[34] || (T[34] = a("span", null, "允许补充相邻片段", -1))
              ])
            ], 64)) : se("", !0),
            T[36] || (T[36] = a("small", null, "查询时直接使用这里保存的参数，不额外调用模型判断检索模式。", -1))
          ]),
          H.canDelete !== !1 && !((k = H.draft.persona.profile) != null && k.builtin) && !((D = H.draft.persona.profile) != null && D.guide) ? (v(), _("button", {
            key: 0,
            type: "button",
            class: "inspect-danger",
            onClick: T[9] || (T[9] = (oe) => o("deletePersona"))
          }, [
            ne(U($n), { size: 15 }),
            T[37] || (T[37] = _e("删除当前角色"))
          ])) : se("", !0)
        ])) : r.value === "rag" ? (v(), _("div", Y_, [
          a("p", null, N(H.draft.documents.length) + " 份资料已关联到角色知识空间。", 1),
          a("label", {
            class: "document-picker",
            onDragover: T[10] || (T[10] = $t(() => {
            }, ["prevent"])),
            onDrop: $t(z, ["prevent"])
          }, [
            ne(U(Bl), { size: 15 }),
            a("span", null, N(s.value.length ? `已选择 ${s.value.length} 个文件` : "选择或拖入资料文件"), 1),
            (v(), _("input", {
              key: l.value,
              type: "file",
              multiple: "",
              disabled: H.disabled,
              onChange: x
            }, null, 40, X_))
          ], 32),
          s.value.length ? (v(), _("ul", K_, [
            (v(!0), _(xe, null, Ve(s.value, (oe, Se) => (v(), _("li", {
              key: `${oe.name}-${oe.size}-${Se}`
            }, [
              a("span", null, N(oe.name), 1),
              a("span", null, [
                a("button", {
                  type: "button",
                  title: "上传前预览",
                  onClick: (Ee) => o("previewLocalFile", oe)
                }, [
                  ne(U(Vl), { size: 14 })
                ], 8, W_),
                a("button", {
                  type: "button",
                  title: "移除",
                  onClick: (Ee) => Y(Se)
                }, [
                  ne(U($n), { size: 14 })
                ], 8, Z_)
              ])
            ]))), 128))
          ])) : se("", !0),
          a("label", null, [
            T[38] || (T[38] = a("span", null, "补充文本", -1)),
            De(a("textarea", {
              "onUpdate:modelValue": T[11] || (T[11] = (oe) => i.value = oe),
              rows: "3",
              placeholder: "直接写入角色知识库"
            }, null, 512), [
              [Ge, i.value]
            ])
          ]),
          a("button", {
            type: "button",
            class: "inspect-action",
            disabled: H.disabled || !s.value.length && !i.value.trim(),
            onClick: Z
          }, [
            ne(U(Bl), { size: 15 }),
            _e(N(H.disabled ? "处理中" : "写入知识库"), 1)
          ], 8, J_),
          a("ul", Q_, [
            (v(!0), _(xe, null, Ve(H.draft.documents, (oe) => (v(), _("li", {
              key: String(oe.id)
            }, [
              a("div", null, [
                a("b", null, N(oe.original_filename || oe.original_name || oe.id), 1),
                a("span", null, N(oe.status), 1)
              ]),
              a("span", e0, [
                a("button", {
                  type: "button",
                  title: "预览 Markdown",
                  onClick: (Se) => o("previewDocument", oe)
                }, [
                  ne(U(Vl), { size: 14 })
                ], 8, t0),
                oe.status === "index_failed" ? (v(), _("button", {
                  key: 0,
                  type: "button",
                  title: "重新索引",
                  onClick: (Se) => o("retryDocument", String(oe.id))
                }, [
                  ne(U(Nr), { size: 14 })
                ], 8, n0)) : se("", !0),
                a("button", {
                  type: "button",
                  title: "删除资料",
                  onClick: (Se) => o("deleteDocument", String(oe.id))
                }, [
                  ne(U($n), { size: 14 })
                ], 8, o0)
              ])
            ]))), 128))
          ]),
          ne(O_, {
            "persona-id": H.draft.persona.id,
            "knowledge-space-id": H.draft.persona.knowledge_space_id,
            documents: H.draft.documents,
            disabled: H.disabled
          }, null, 8, ["persona-id", "knowledge-space-id", "documents", "disabled"]),
          a("button", {
            type: "button",
            class: "inspect-action",
            onClick: T[12] || (T[12] = (oe) => o("openRagEval"))
          }, [
            ne(U(Ll), { size: 15 }),
            T[39] || (T[39] = _e("前往 RAG 评测"))
          ])
        ])) : r.value === "memory" ? (v(), _("div", s0, T[40] || (T[40] = [
          a("p", null, "会话记忆按对话窗口隔离，长期记忆与角色绑定。", -1),
          a("small", null, "清理操作继续在对应对话或接入窗口执行，避免误清其他会话。", -1)
        ]))) : r.value === "extensions" ? (v(), _("div", i0, [
          a("p", null, "当前角色可配置 " + N(H.draft.capabilities.packages.length) + " 项扩展能力。", 1),
          T[41] || (T[41] = a("small", null, "选择画布中的 Skill 或 Tool 查看依赖并设置角色策略；依赖只在选中时展开。", -1))
        ])) : r.value === "voice" ? (v(), _("div", l0, [
          a("label", r0, [
            a("input", {
              type: "checkbox",
              checked: !!((B = (O = H.draft.persona.profile) == null ? void 0 : O.tts) != null && B.enabled),
              onChange: T[13] || (T[13] = (oe) => M("enabled", oe.target.checked))
            }, null, 40, a0),
            T[42] || (T[42] = a("span", null, "生成语音", -1))
          ]),
          a("label", u0, [
            a("input", {
              type: "checkbox",
              checked: !!((ie = (G = H.draft.persona.profile) == null ? void 0 : G.tts) != null && ie.auto_play),
              onChange: T[14] || (T[14] = (oe) => M("auto_play", oe.target.checked))
            }, null, 40, c0),
            T[43] || (T[43] = a("span", null, "自动播放", -1))
          ]),
          a("label", null, [
            T[45] || (T[45] = a("span", null, "角色音色", -1)),
            a("select", {
              value: String(((ve = (de = H.draft.persona.profile) == null ? void 0 : de.tts) == null ? void 0 : ve.voice_asset_id) || ""),
              onChange: T[15] || (T[15] = (oe) => M("voice_asset_id", oe.target.value))
            }, [
              T[44] || (T[44] = a("option", { value: "" }, "不绑定音色", -1)),
              (v(!0), _(xe, null, Ve((re = H.draft.resources) == null ? void 0 : re.voiceAssets, (oe) => (v(), _("option", {
                key: oe.id,
                value: oe.id
              }, N(oe.name), 9, f0))), 128))
            ], 40, d0)
          ]),
          a("label", null, [
            T[47] || (T[47] = a("span", null, "输出语言", -1)),
            a("select", {
              value: String(((pe = (ye = H.draft.persona.profile) == null ? void 0 : ye.tts) == null ? void 0 : pe.output_language) || "auto"),
              onChange: T[16] || (T[16] = (oe) => M("output_language", oe.target.value))
            }, T[46] || (T[46] = [
              a("option", { value: "auto" }, "自动", -1),
              a("option", { value: "zh" }, "中文", -1),
              a("option", { value: "ja" }, "日语", -1),
              a("option", { value: "en" }, "英语", -1)
            ]), 40, p0)
          ]),
          a("div", h0, [
            a("button", {
              type: "button",
              class: "inspect-action",
              disabled: !((Ie = (ce = H.draft.persona.profile) == null ? void 0 : ce.tts) != null && Ie.voice_asset_id),
              onClick: T[17] || (T[17] = (oe) => o("previewVoice"))
            }, [
              ne(U(Ir), { size: 15 }),
              T[48] || (T[48] = _e("试听"))
            ], 8, v0),
            a("button", {
              type: "button",
              class: "inspect-action",
              onClick: T[18] || (T[18] = (oe) => o("openVoiceStudio"))
            }, [
              ne(U(Ll), { size: 15 }),
              T[49] || (T[49] = _e("声音工坊"))
            ])
          ])
        ])) : r.value === "live2d" ? (v(), _("div", g0, [
          a("section", m0, [
            T[50] || (T[50] = a("span", null, "当前角色绑定", -1)),
            a("strong", null, N(f.value || "未绑定模型"), 1),
            f.value ? (v(), _("button", {
              key: 0,
              type: "button",
              disabled: H.disabled,
              onClick: T[19] || (T[19] = (oe) => P(""))
            }, "解除绑定", 8, y0)) : se("", !0)
          ]),
          a("div", b0, [
            a("button", {
              type: "button",
              disabled: H.disabled,
              title: "重新扫描模型",
              onClick: T[20] || (T[20] = (oe) => o("refreshLive2d"))
            }, [
              ne(U(qt), { size: 15 }),
              T[51] || (T[51] = _e("刷新"))
            ], 8, _0),
            a("button", {
              type: "button",
              disabled: H.disabled,
              title: "打开 Live2D 模型文件夹",
              onClick: T[21] || (T[21] = (oe) => o("openLive2dDirectory"))
            }, [
              ne(U(ss), { size: 15 }),
              T[52] || (T[52] = _e("打开文件夹"))
            ], 8, w0)
          ]),
          a("div", k0, [
            T[53] || (T[53] = a("strong", null, "已安装模型", -1)),
            a("span", null, N(p.value.length) + " 个", 1)
          ]),
          p.value.length ? (v(), _("ul", E0, [
            (v(!0), _(xe, null, Ve(p.value, (oe) => (v(), _("li", {
              key: oe.id,
              class: be({ bound: f.value === oe.id, incompatible: oe.compatible === !1 })
            }, [
              a("div", C0, [
                a("strong", null, N(oe.name), 1),
                a("span", null, N(b(oe)), 1)
              ]),
              a("div", x0, [
                a("span", {
                  class: be(oe.compatible === !1 ? "is-error" : "is-compatible")
                }, N(oe.compatible === !1 ? "不兼容" : "兼容"), 3),
                f.value === oe.id ? (v(), _("button", S0, [
                  ne(U(ro), { size: 14 }),
                  T[54] || (T[54] = _e("已绑定"))
                ])) : (v(), _("button", {
                  key: 1,
                  type: "button",
                  disabled: H.disabled || oe.compatible === !1,
                  title: oe.compatible === !1 ? "当前 Live2D 运行时不支持此 MOC3 版本" : `绑定 ${oe.name}`,
                  onClick: (Se) => P(oe.id)
                }, "绑定", 8, $0))
              ])
            ], 2))), 128))
          ])) : (v(), _("div", I0, T[55] || (T[55] = [
            a("strong", null, "尚未发现模型", -1),
            a("p", null, "将模型文件夹放入 data/live2d 后刷新。", -1)
          ]))),
          T[56] || (T[56] = a("p", { class: "live2d-save-hint" }, "绑定修改会随页面顶部“保存配置”一起生效。", -1))
        ])) : r.value === "skill" || r.value === "tool" ? (v(), _("div", N0, [
          u.value ? (v(), _("label", T0, [
            T[58] || (T[58] = a("span", null, "角色策略", -1)),
            a("select", {
              value: d.value,
              onChange: T[22] || (T[22] = (oe) => o("capability", H.node.id, oe.target.value))
            }, T[57] || (T[57] = [
              a("option", { value: "inherit" }, "继承默认", -1),
              a("option", { value: "allow" }, "允许", -1),
              a("option", { value: "deny" }, "禁用", -1)
            ]), 40, M0)
          ])) : (v(), _("p", P0, "此 Tool 由上级能力包管理，不单独保存开关。")),
          u.value ? (v(), _("div", O0, [
            T[59] || (T[59] = a("b", null, "依赖", -1)),
            (v(!0), _(xe, null, Ve(u.value.dependencies, (oe) => (v(), _("p", {
              key: oe.id || oe.name
            }, [
              a("span", null, N(oe.name), 1),
              a("em", null, N(oe.server || oe.source), 1)
            ]))), 128))
          ])) : se("", !0)
        ])) : r.value === "mcp" && c.value ? (v(), _("div", A0, [
          a("label", D0, [
            a("input", {
              type: "checkbox",
              checked: c.value.authorized,
              disabled: c.value.global,
              onChange: T[23] || (T[23] = (oe) => o("server", c.value.name, oe.target.checked))
            }, null, 40, R0),
            a("span", null, N(c.value.global ? "全局授权" : "允许当前角色使用"), 1)
          ]),
          a("p", null, N(c.value.description || "MCP 服务"), 1),
          a("small", null, "连接状态：" + N(((Me = c.value.status) == null ? void 0 : Me.status) || "unknown"), 1)
        ])) : se("", !0)
      ], 10, A_);
    };
  }
});
function Ri(e) {
  return pr() ? (Gs(e), !0) : !1;
}
function En(e) {
  return typeof e == "function" ? e() : U(e);
}
const V0 = typeof window < "u" && typeof document < "u", z0 = (e) => typeof e < "u", F0 = Object.prototype.toString, B0 = (e) => F0.call(e) === "[object Object]", H0 = () => {
};
function U0(e, t) {
  function n(...o) {
    return new Promise((s, i) => {
      Promise.resolve(e(() => t.apply(this, o), { fn: t, thisArg: this, args: o })).then(s).catch(i);
    });
  }
  return n;
}
const Pf = (e) => e();
function j0(e = Pf) {
  const t = te(!0);
  function n() {
    t.value = !1;
  }
  function o() {
    t.value = !0;
  }
  const s = (...i) => {
    t.value && e(...i);
  };
  return { isActive: yr(t), pause: n, resume: o, eventFilter: s };
}
function Wu(e, t = !1, n = "Timeout") {
  return new Promise((o, s) => {
    setTimeout(t ? () => s(n) : o, e);
  });
}
function G0(e, t, n = {}) {
  const {
    eventFilter: o = Pf,
    ...s
  } = n;
  return ze(
    e,
    U0(
      o,
      t
    ),
    s
  );
}
function _o(e, t, n = {}) {
  const {
    eventFilter: o,
    ...s
  } = n, { eventFilter: i, pause: l, resume: r, isActive: u } = j0(o);
  return { stop: G0(
    e,
    t,
    {
      ...s,
      eventFilter: i
    }
  ), pause: l, resume: r, isActive: u };
}
function q0(e, t = {}) {
  if (!at(e))
    return Sh(e);
  const n = Array.isArray(e.value) ? Array.from({ length: e.value.length }) : {};
  for (const o in e.value)
    n[o] = xh(() => ({
      get() {
        return e.value[o];
      },
      set(s) {
        var i;
        if ((i = En(t.replaceRef)) != null ? i : !0)
          if (Array.isArray(e.value)) {
            const r = [...e.value];
            r[o] = s, e.value = r;
          } else {
            const r = { ...e.value, [o]: s };
            Object.setPrototypeOf(r, Object.getPrototypeOf(e.value)), e.value = r;
          }
        else
          e.value[o] = s;
      }
    }));
  return n;
}
function Gl(e, t = !1) {
  function n(f, { flush: p = "sync", deep: h = !1, timeout: b, throwOnTimeout: C } = {}) {
    let M = null;
    const L = [new Promise((E) => {
      M = ze(
        e,
        (x) => {
          f(x) !== t && (M == null || M(), E(x));
        },
        {
          flush: p,
          deep: h,
          immediate: !0
        }
      );
    })];
    return b != null && L.push(
      Wu(b, C).then(() => En(e)).finally(() => M == null ? void 0 : M())
    ), Promise.race(L);
  }
  function o(f, p) {
    if (!at(f))
      return n((x) => x === f, p);
    const { flush: h = "sync", deep: b = !1, timeout: C, throwOnTimeout: M } = p ?? {};
    let P = null;
    const E = [new Promise((x) => {
      P = ze(
        [e, f],
        ([z, Y]) => {
          t !== (z === Y) && (P == null || P(), x(z));
        },
        {
          flush: h,
          deep: b,
          immediate: !0
        }
      );
    })];
    return C != null && E.push(
      Wu(C, M).then(() => En(e)).finally(() => (P == null || P(), En(e)))
    ), Promise.race(E);
  }
  function s(f) {
    return n((p) => !!p, f);
  }
  function i(f) {
    return o(null, f);
  }
  function l(f) {
    return o(void 0, f);
  }
  function r(f) {
    return n(Number.isNaN, f);
  }
  function u(f, p) {
    return n((h) => {
      const b = Array.from(h);
      return b.includes(f) || b.includes(En(f));
    }, p);
  }
  function c(f) {
    return d(1, f);
  }
  function d(f = 1, p) {
    let h = -1;
    return n(() => (h += 1, h >= f), p);
  }
  return Array.isArray(En(e)) ? {
    toMatch: n,
    toContains: u,
    changed: c,
    changedTimes: d,
    get not() {
      return Gl(e, !t);
    }
  } : {
    toMatch: n,
    toBe: o,
    toBeTruthy: s,
    toBeNull: i,
    toBeNaN: r,
    toBeUndefined: l,
    changed: c,
    changedTimes: d,
    get not() {
      return Gl(e, !t);
    }
  };
}
function ql(e) {
  return Gl(e);
}
function Y0(e) {
  var t;
  const n = En(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Of = V0 ? window : void 0;
function Af(...e) {
  let t, n, o, s;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, s] = e, t = Of) : [t, n, o, s] = e, !t)
    return H0;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const i = [], l = () => {
    i.forEach((d) => d()), i.length = 0;
  }, r = (d, f, p, h) => (d.addEventListener(f, p, h), () => d.removeEventListener(f, p, h)), u = ze(
    () => [Y0(t), En(s)],
    ([d, f]) => {
      if (l(), !d)
        return;
      const p = B0(f) ? { ...f } : f;
      i.push(
        ...n.flatMap((h) => o.map((b) => r(d, h, b, p)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    u(), l();
  };
  return Ri(c), c;
}
function X0(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Zu(...e) {
  let t, n, o = {};
  e.length === 3 ? (t = e[0], n = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: s = Of,
    eventName: i = "keydown",
    passive: l = !1,
    dedupe: r = !1
  } = o, u = X0(t);
  return Af(s, i, (d) => {
    d.repeat && En(r) || u(d) && n(d);
  }, l);
}
function K0(e) {
  return JSON.parse(JSON.stringify(e));
}
function dl(e, t, n, o = {}) {
  var s, i, l;
  const {
    clone: r = !1,
    passive: u = !1,
    eventName: c,
    deep: d = !1,
    defaultValue: f,
    shouldEmit: p
  } = o, h = zo(), b = n || (h == null ? void 0 : h.emit) || ((s = h == null ? void 0 : h.$emit) == null ? void 0 : s.bind(h)) || ((l = (i = h == null ? void 0 : h.proxy) == null ? void 0 : i.$emit) == null ? void 0 : l.bind(h == null ? void 0 : h.proxy));
  let C = c;
  t || (t = "modelValue"), C = C || `update:${t.toString()}`;
  const M = (E) => r ? typeof r == "function" ? r(E) : K0(E) : E, P = () => z0(e[t]) ? M(e[t]) : f, L = (E) => {
    p ? p(E) && b(C, E) : b(C, E);
  };
  if (u) {
    const E = P(), x = te(E);
    let z = !1;
    return ze(
      () => e[t],
      (Y) => {
        z || (z = !0, x.value = M(Y), _t(() => z = !1));
      }
    ), ze(
      x,
      (Y) => {
        !z && (Y !== e[t] || d) && L(Y);
      },
      { deep: d }
    ), x;
  } else
    return ae({
      get() {
        return P();
      },
      set(E) {
        L(E);
      }
    });
}
var W0 = { value: () => {
} };
function Li() {
  for (var e = 0, t = arguments.length, n = {}, o; e < t; ++e) {
    if (!(o = arguments[e] + "") || o in n || /[\s.]/.test(o))
      throw new Error("illegal type: " + o);
    n[o] = [];
  }
  return new Js(n);
}
function Js(e) {
  this._ = e;
}
function Z0(e, t) {
  return e.trim().split(/^|\s+/).map(function(n) {
    var o = "", s = n.indexOf(".");
    if (s >= 0 && (o = n.slice(s + 1), n = n.slice(0, s)), n && !t.hasOwnProperty(n))
      throw new Error("unknown type: " + n);
    return { type: n, name: o };
  });
}
Js.prototype = Li.prototype = {
  constructor: Js,
  on: function(e, t) {
    var n = this._, o = Z0(e + "", n), s, i = -1, l = o.length;
    if (arguments.length < 2) {
      for (; ++i < l; )
        if ((s = (e = o[i]).type) && (s = J0(n[s], e.name)))
          return s;
      return;
    }
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++i < l; )
      if (s = (e = o[i]).type)
        n[s] = Ju(n[s], e.name, t);
      else if (t == null)
        for (s in n)
          n[s] = Ju(n[s], e.name, null);
    return this;
  },
  copy: function() {
    var e = {}, t = this._;
    for (var n in t)
      e[n] = t[n].slice();
    return new Js(e);
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
function J0(e, t) {
  for (var n = 0, o = e.length, s; n < o; ++n)
    if ((s = e[n]).name === t)
      return s.value;
}
function Ju(e, t, n) {
  for (var o = 0, s = e.length; o < s; ++o)
    if (e[o].name === t) {
      e[o] = W0, e = e.slice(0, o).concat(e.slice(o + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var Yl = "http://www.w3.org/1999/xhtml";
const Qu = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: Yl,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Vi(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Qu.hasOwnProperty(t) ? { space: Qu[t], local: e } : e;
}
function Q0(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === Yl && t.documentElement.namespaceURI === Yl ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function ew(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Df(e) {
  var t = Vi(e);
  return (t.local ? ew : Q0)(t);
}
function tw() {
}
function Dr(e) {
  return e == null ? tw : function() {
    return this.querySelector(e);
  };
}
function nw(e) {
  typeof e != "function" && (e = Dr(e));
  for (var t = this._groups, n = t.length, o = new Array(n), s = 0; s < n; ++s)
    for (var i = t[s], l = i.length, r = o[s] = new Array(l), u, c, d = 0; d < l; ++d)
      (u = i[d]) && (c = e.call(u, u.__data__, d, i)) && ("__data__" in u && (c.__data__ = u.__data__), r[d] = c);
  return new jt(o, this._parents);
}
function ow(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function sw() {
  return [];
}
function Rf(e) {
  return e == null ? sw : function() {
    return this.querySelectorAll(e);
  };
}
function iw(e) {
  return function() {
    return ow(e.apply(this, arguments));
  };
}
function lw(e) {
  typeof e == "function" ? e = iw(e) : e = Rf(e);
  for (var t = this._groups, n = t.length, o = [], s = [], i = 0; i < n; ++i)
    for (var l = t[i], r = l.length, u, c = 0; c < r; ++c)
      (u = l[c]) && (o.push(e.call(u, u.__data__, c, l)), s.push(u));
  return new jt(o, s);
}
function Lf(e) {
  return function() {
    return this.matches(e);
  };
}
function Vf(e) {
  return function(t) {
    return t.matches(e);
  };
}
var rw = Array.prototype.find;
function aw(e) {
  return function() {
    return rw.call(this.children, e);
  };
}
function uw() {
  return this.firstElementChild;
}
function cw(e) {
  return this.select(e == null ? uw : aw(typeof e == "function" ? e : Vf(e)));
}
var dw = Array.prototype.filter;
function fw() {
  return Array.from(this.children);
}
function pw(e) {
  return function() {
    return dw.call(this.children, e);
  };
}
function hw(e) {
  return this.selectAll(e == null ? fw : pw(typeof e == "function" ? e : Vf(e)));
}
function vw(e) {
  typeof e != "function" && (e = Lf(e));
  for (var t = this._groups, n = t.length, o = new Array(n), s = 0; s < n; ++s)
    for (var i = t[s], l = i.length, r = o[s] = [], u, c = 0; c < l; ++c)
      (u = i[c]) && e.call(u, u.__data__, c, i) && r.push(u);
  return new jt(o, this._parents);
}
function zf(e) {
  return new Array(e.length);
}
function gw() {
  return new jt(this._enter || this._groups.map(zf), this._parents);
}
function fi(e, t) {
  this.ownerDocument = e.ownerDocument, this.namespaceURI = e.namespaceURI, this._next = null, this._parent = e, this.__data__ = t;
}
fi.prototype = {
  constructor: fi,
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
function mw(e) {
  return function() {
    return e;
  };
}
function yw(e, t, n, o, s, i) {
  for (var l = 0, r, u = t.length, c = i.length; l < c; ++l)
    (r = t[l]) ? (r.__data__ = i[l], o[l] = r) : n[l] = new fi(e, i[l]);
  for (; l < u; ++l)
    (r = t[l]) && (s[l] = r);
}
function bw(e, t, n, o, s, i, l) {
  var r, u, c = /* @__PURE__ */ new Map(), d = t.length, f = i.length, p = new Array(d), h;
  for (r = 0; r < d; ++r)
    (u = t[r]) && (p[r] = h = l.call(u, u.__data__, r, t) + "", c.has(h) ? s[r] = u : c.set(h, u));
  for (r = 0; r < f; ++r)
    h = l.call(e, i[r], r, i) + "", (u = c.get(h)) ? (o[r] = u, u.__data__ = i[r], c.delete(h)) : n[r] = new fi(e, i[r]);
  for (r = 0; r < d; ++r)
    (u = t[r]) && c.get(p[r]) === u && (s[r] = u);
}
function _w(e) {
  return e.__data__;
}
function ww(e, t) {
  if (!arguments.length)
    return Array.from(this, _w);
  var n = t ? bw : yw, o = this._parents, s = this._groups;
  typeof e != "function" && (e = mw(e));
  for (var i = s.length, l = new Array(i), r = new Array(i), u = new Array(i), c = 0; c < i; ++c) {
    var d = o[c], f = s[c], p = f.length, h = kw(e.call(d, d && d.__data__, c, o)), b = h.length, C = r[c] = new Array(b), M = l[c] = new Array(b), P = u[c] = new Array(p);
    n(d, f, C, M, P, h, t);
    for (var L = 0, E = 0, x, z; L < b; ++L)
      if (x = C[L]) {
        for (L >= E && (E = L + 1); !(z = M[E]) && ++E < b; )
          ;
        x._next = z || null;
      }
  }
  return l = new jt(l, o), l._enter = r, l._exit = u, l;
}
function kw(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Ew() {
  return new jt(this._exit || this._groups.map(zf), this._parents);
}
function Cw(e, t, n) {
  var o = this.enter(), s = this, i = this.exit();
  return typeof e == "function" ? (o = e(o), o && (o = o.selection())) : o = o.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), n == null ? i.remove() : n(i), o && s ? o.merge(s).order() : s;
}
function xw(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, o = t._groups, s = n.length, i = o.length, l = Math.min(s, i), r = new Array(s), u = 0; u < l; ++u)
    for (var c = n[u], d = o[u], f = c.length, p = r[u] = new Array(f), h, b = 0; b < f; ++b)
      (h = c[b] || d[b]) && (p[b] = h);
  for (; u < s; ++u)
    r[u] = n[u];
  return new jt(r, this._parents);
}
function Sw() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var o = e[t], s = o.length - 1, i = o[s], l; --s >= 0; )
      (l = o[s]) && (i && l.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(l, i), i = l);
  return this;
}
function $w(e) {
  e || (e = Iw);
  function t(f, p) {
    return f && p ? e(f.__data__, p.__data__) : !f - !p;
  }
  for (var n = this._groups, o = n.length, s = new Array(o), i = 0; i < o; ++i) {
    for (var l = n[i], r = l.length, u = s[i] = new Array(r), c, d = 0; d < r; ++d)
      (c = l[d]) && (u[d] = c);
    u.sort(t);
  }
  return new jt(s, this._parents).order();
}
function Iw(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Nw() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Tw() {
  return Array.from(this);
}
function Mw() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], s = 0, i = o.length; s < i; ++s) {
      var l = o[s];
      if (l)
        return l;
    }
  return null;
}
function Pw() {
  let e = 0;
  for (const t of this)
    ++e;
  return e;
}
function Ow() {
  return !this.node();
}
function Aw(e) {
  for (var t = this._groups, n = 0, o = t.length; n < o; ++n)
    for (var s = t[n], i = 0, l = s.length, r; i < l; ++i)
      (r = s[i]) && e.call(r, r.__data__, i, s);
  return this;
}
function Dw(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Rw(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Lw(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function Vw(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function zw(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function Fw(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Bw(e, t) {
  var n = Vi(e);
  if (arguments.length < 2) {
    var o = this.node();
    return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n);
  }
  return this.each((t == null ? n.local ? Rw : Dw : typeof t == "function" ? n.local ? Fw : zw : n.local ? Vw : Lw)(n, t));
}
function Ff(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Hw(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Uw(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function jw(e, t, n) {
  return function() {
    var o = t.apply(this, arguments);
    o == null ? this.style.removeProperty(e) : this.style.setProperty(e, o, n);
  };
}
function Gw(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? Hw : typeof t == "function" ? jw : Uw)(e, t, n ?? "")) : Do(this.node(), e);
}
function Do(e, t) {
  return e.style.getPropertyValue(t) || Ff(e).getComputedStyle(e, null).getPropertyValue(t);
}
function qw(e) {
  return function() {
    delete this[e];
  };
}
function Yw(e, t) {
  return function() {
    this[e] = t;
  };
}
function Xw(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function Kw(e, t) {
  return arguments.length > 1 ? this.each((t == null ? qw : typeof t == "function" ? Xw : Yw)(e, t)) : this.node()[e];
}
function Bf(e) {
  return e.trim().split(/^|\s+/);
}
function Rr(e) {
  return e.classList || new Hf(e);
}
function Hf(e) {
  this._node = e, this._names = Bf(e.getAttribute("class") || "");
}
Hf.prototype = {
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
function Uf(e, t) {
  for (var n = Rr(e), o = -1, s = t.length; ++o < s; )
    n.add(t[o]);
}
function jf(e, t) {
  for (var n = Rr(e), o = -1, s = t.length; ++o < s; )
    n.remove(t[o]);
}
function Ww(e) {
  return function() {
    Uf(this, e);
  };
}
function Zw(e) {
  return function() {
    jf(this, e);
  };
}
function Jw(e, t) {
  return function() {
    (t.apply(this, arguments) ? Uf : jf)(this, e);
  };
}
function Qw(e, t) {
  var n = Bf(e + "");
  if (arguments.length < 2) {
    for (var o = Rr(this.node()), s = -1, i = n.length; ++s < i; )
      if (!o.contains(n[s]))
        return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? Jw : t ? Ww : Zw)(n, t));
}
function ek() {
  this.textContent = "";
}
function tk(e) {
  return function() {
    this.textContent = e;
  };
}
function nk(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function ok(e) {
  return arguments.length ? this.each(e == null ? ek : (typeof e == "function" ? nk : tk)(e)) : this.node().textContent;
}
function sk() {
  this.innerHTML = "";
}
function ik(e) {
  return function() {
    this.innerHTML = e;
  };
}
function lk(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function rk(e) {
  return arguments.length ? this.each(e == null ? sk : (typeof e == "function" ? lk : ik)(e)) : this.node().innerHTML;
}
function ak() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function uk() {
  return this.each(ak);
}
function ck() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function dk() {
  return this.each(ck);
}
function fk(e) {
  var t = typeof e == "function" ? e : Df(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function pk() {
  return null;
}
function hk(e, t) {
  var n = typeof e == "function" ? e : Df(e), o = t == null ? pk : typeof t == "function" ? t : Dr(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function vk() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function gk() {
  return this.each(vk);
}
function mk() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function yk() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function bk(e) {
  return this.select(e ? yk : mk);
}
function _k(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function wk(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function kk(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", o = t.indexOf(".");
    return o >= 0 && (n = t.slice(o + 1), t = t.slice(0, o)), { type: t, name: n };
  });
}
function Ek(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, o = -1, s = t.length, i; n < s; ++n)
        i = t[n], (!e.type || i.type === e.type) && i.name === e.name ? this.removeEventListener(i.type, i.listener, i.options) : t[++o] = i;
      ++o ? t.length = o : delete this.__on;
    }
  };
}
function Ck(e, t, n) {
  return function() {
    var o = this.__on, s, i = wk(t);
    if (o) {
      for (var l = 0, r = o.length; l < r; ++l)
        if ((s = o[l]).type === e.type && s.name === e.name) {
          this.removeEventListener(s.type, s.listener, s.options), this.addEventListener(s.type, s.listener = i, s.options = n), s.value = t;
          return;
        }
    }
    this.addEventListener(e.type, i, n), s = { type: e.type, name: e.name, value: t, listener: i, options: n }, o ? o.push(s) : this.__on = [s];
  };
}
function xk(e, t, n) {
  var o = kk(e + ""), s, i = o.length, l;
  if (arguments.length < 2) {
    var r = this.node().__on;
    if (r) {
      for (var u = 0, c = r.length, d; u < c; ++u)
        for (s = 0, d = r[u]; s < i; ++s)
          if ((l = o[s]).type === d.type && l.name === d.name)
            return d.value;
    }
    return;
  }
  for (r = t ? Ck : Ek, s = 0; s < i; ++s)
    this.each(r(o[s], t, n));
  return this;
}
function Gf(e, t, n) {
  var o = Ff(e), s = o.CustomEvent;
  typeof s == "function" ? s = new s(t, n) : (s = o.document.createEvent("Event"), n ? (s.initEvent(t, n.bubbles, n.cancelable), s.detail = n.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function Sk(e, t) {
  return function() {
    return Gf(this, e, t);
  };
}
function $k(e, t) {
  return function() {
    return Gf(this, e, t.apply(this, arguments));
  };
}
function Ik(e, t) {
  return this.each((typeof t == "function" ? $k : Sk)(e, t));
}
function* Nk() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], s = 0, i = o.length, l; s < i; ++s)
      (l = o[s]) && (yield l);
}
var qf = [null];
function jt(e, t) {
  this._groups = e, this._parents = t;
}
function xs() {
  return new jt([[document.documentElement]], qf);
}
function Tk() {
  return this;
}
jt.prototype = xs.prototype = {
  constructor: jt,
  select: nw,
  selectAll: lw,
  selectChild: cw,
  selectChildren: hw,
  filter: vw,
  data: ww,
  enter: gw,
  exit: Ew,
  join: Cw,
  merge: xw,
  selection: Tk,
  order: Sw,
  sort: $w,
  call: Nw,
  nodes: Tw,
  node: Mw,
  size: Pw,
  empty: Ow,
  each: Aw,
  attr: Bw,
  style: Gw,
  property: Kw,
  classed: Qw,
  text: ok,
  html: rk,
  raise: uk,
  lower: dk,
  append: fk,
  insert: hk,
  remove: gk,
  clone: bk,
  datum: _k,
  on: xk,
  dispatch: Ik,
  [Symbol.iterator]: Nk
};
function Zt(e) {
  return typeof e == "string" ? new jt([[document.querySelector(e)]], [document.documentElement]) : new jt([[e]], qf);
}
function Mk(e) {
  let t;
  for (; t = e.sourceEvent; )
    e = t;
  return e;
}
function rn(e, t) {
  if (e = Mk(e), t === void 0 && (t = e.currentTarget), t) {
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
const Pk = { passive: !1 }, ps = { capture: !0, passive: !1 };
function fl(e) {
  e.stopImmediatePropagation();
}
function No(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Yf(e) {
  var t = e.document.documentElement, n = Zt(e).on("dragstart.drag", No, ps);
  "onselectstart" in t ? n.on("selectstart.drag", No, ps) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Xf(e, t) {
  var n = e.document.documentElement, o = Zt(e).on("dragstart.drag", null);
  t && (o.on("click.drag", No, ps), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in n ? o.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Ds = (e) => () => e;
function Xl(e, {
  sourceEvent: t,
  subject: n,
  target: o,
  identifier: s,
  active: i,
  x: l,
  y: r,
  dx: u,
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
    x: { value: l, enumerable: !0, configurable: !0 },
    y: { value: r, enumerable: !0, configurable: !0 },
    dx: { value: u, enumerable: !0, configurable: !0 },
    dy: { value: c, enumerable: !0, configurable: !0 },
    _: { value: d }
  });
}
Xl.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function Ok(e) {
  return !e.ctrlKey && !e.button;
}
function Ak() {
  return this.parentNode;
}
function Dk(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function Rk() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Lk() {
  var e = Ok, t = Ak, n = Dk, o = Rk, s = {}, i = Li("start", "drag", "end"), l = 0, r, u, c, d, f = 0;
  function p(x) {
    x.on("mousedown.drag", h).filter(o).on("touchstart.drag", M).on("touchmove.drag", P, Pk).on("touchend.drag touchcancel.drag", L).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function h(x, z) {
    if (!(d || !e.call(this, x, z))) {
      var Y = E(this, t.call(this, x, z), x, z, "mouse");
      Y && (Zt(x.view).on("mousemove.drag", b, ps).on("mouseup.drag", C, ps), Yf(x.view), fl(x), c = !1, r = x.clientX, u = x.clientY, Y("start", x));
    }
  }
  function b(x) {
    if (No(x), !c) {
      var z = x.clientX - r, Y = x.clientY - u;
      c = z * z + Y * Y > f;
    }
    s.mouse("drag", x);
  }
  function C(x) {
    Zt(x.view).on("mousemove.drag mouseup.drag", null), Xf(x.view, c), No(x), s.mouse("end", x);
  }
  function M(x, z) {
    if (e.call(this, x, z)) {
      var Y = x.changedTouches, Z = t.call(this, x, z), H = Y.length, T, X;
      for (T = 0; T < H; ++T)
        (X = E(this, Z, x, z, Y[T].identifier, Y[T])) && (fl(x), X("start", x, Y[T]));
    }
  }
  function P(x) {
    var z = x.changedTouches, Y = z.length, Z, H;
    for (Z = 0; Z < Y; ++Z)
      (H = s[z[Z].identifier]) && (No(x), H("drag", x, z[Z]));
  }
  function L(x) {
    var z = x.changedTouches, Y = z.length, Z, H;
    for (d && clearTimeout(d), d = setTimeout(function() {
      d = null;
    }, 500), Z = 0; Z < Y; ++Z)
      (H = s[z[Z].identifier]) && (fl(x), H("end", x, z[Z]));
  }
  function E(x, z, Y, Z, H, T) {
    var X = i.copy(), q = rn(T || Y, z), V, R, k;
    if ((k = n.call(x, new Xl("beforestart", {
      sourceEvent: Y,
      target: p,
      identifier: H,
      active: l,
      x: q[0],
      y: q[1],
      dx: 0,
      dy: 0,
      dispatch: X
    }), Z)) != null)
      return V = k.x - q[0] || 0, R = k.y - q[1] || 0, function D(O, B, G) {
        var ie = q, de;
        switch (O) {
          case "start":
            s[H] = D, de = l++;
            break;
          case "end":
            delete s[H], --l;
          case "drag":
            q = rn(G || B, z), de = l;
            break;
        }
        X.call(
          O,
          x,
          new Xl(O, {
            sourceEvent: B,
            subject: k,
            target: p,
            identifier: H,
            active: de,
            x: q[0] + V,
            y: q[1] + R,
            dx: q[0] - ie[0],
            dy: q[1] - ie[1],
            dispatch: X
          }),
          Z
        );
      };
  }
  return p.filter = function(x) {
    return arguments.length ? (e = typeof x == "function" ? x : Ds(!!x), p) : e;
  }, p.container = function(x) {
    return arguments.length ? (t = typeof x == "function" ? x : Ds(x), p) : t;
  }, p.subject = function(x) {
    return arguments.length ? (n = typeof x == "function" ? x : Ds(x), p) : n;
  }, p.touchable = function(x) {
    return arguments.length ? (o = typeof x == "function" ? x : Ds(!!x), p) : o;
  }, p.on = function() {
    var x = i.on.apply(i, arguments);
    return x === i ? p : x;
  }, p.clickDistance = function(x) {
    return arguments.length ? (f = (x = +x) * x, p) : Math.sqrt(f);
  }, p;
}
function Lr(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Kf(e, t) {
  var n = Object.create(e.prototype);
  for (var o in t)
    n[o] = t[o];
  return n;
}
function Ss() {
}
var hs = 0.7, pi = 1 / hs, To = "\\s*([+-]?\\d+)\\s*", vs = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", pn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", Vk = /^#([0-9a-f]{3,8})$/, zk = new RegExp(`^rgb\\(${To},${To},${To}\\)$`), Fk = new RegExp(`^rgb\\(${pn},${pn},${pn}\\)$`), Bk = new RegExp(`^rgba\\(${To},${To},${To},${vs}\\)$`), Hk = new RegExp(`^rgba\\(${pn},${pn},${pn},${vs}\\)$`), Uk = new RegExp(`^hsl\\(${vs},${pn},${pn}\\)$`), jk = new RegExp(`^hsla\\(${vs},${pn},${pn},${vs}\\)$`), ec = {
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
Lr(Ss, gs, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: tc,
  // Deprecated! Use color.formatHex.
  formatHex: tc,
  formatHex8: Gk,
  formatHsl: qk,
  formatRgb: nc,
  toString: nc
});
function tc() {
  return this.rgb().formatHex();
}
function Gk() {
  return this.rgb().formatHex8();
}
function qk() {
  return Wf(this).formatHsl();
}
function nc() {
  return this.rgb().formatRgb();
}
function gs(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = Vk.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? oc(t) : n === 3 ? new Ft(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Rs(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Rs(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = zk.exec(e)) ? new Ft(t[1], t[2], t[3], 1) : (t = Fk.exec(e)) ? new Ft(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Bk.exec(e)) ? Rs(t[1], t[2], t[3], t[4]) : (t = Hk.exec(e)) ? Rs(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Uk.exec(e)) ? lc(t[1], t[2] / 100, t[3] / 100, 1) : (t = jk.exec(e)) ? lc(t[1], t[2] / 100, t[3] / 100, t[4]) : ec.hasOwnProperty(e) ? oc(ec[e]) : e === "transparent" ? new Ft(NaN, NaN, NaN, 0) : null;
}
function oc(e) {
  return new Ft(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Rs(e, t, n, o) {
  return o <= 0 && (e = t = n = NaN), new Ft(e, t, n, o);
}
function Yk(e) {
  return e instanceof Ss || (e = gs(e)), e ? (e = e.rgb(), new Ft(e.r, e.g, e.b, e.opacity)) : new Ft();
}
function Kl(e, t, n, o) {
  return arguments.length === 1 ? Yk(e) : new Ft(e, t, n, o ?? 1);
}
function Ft(e, t, n, o) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +o;
}
Lr(Ft, Kl, Kf(Ss, {
  brighter(e) {
    return e = e == null ? pi : Math.pow(pi, e), new Ft(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? hs : Math.pow(hs, e), new Ft(this.r * e, this.g * e, this.b * e, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Ft(ao(this.r), ao(this.g), ao(this.b), hi(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: sc,
  // Deprecated! Use color.formatHex.
  formatHex: sc,
  formatHex8: Xk,
  formatRgb: ic,
  toString: ic
}));
function sc() {
  return `#${so(this.r)}${so(this.g)}${so(this.b)}`;
}
function Xk() {
  return `#${so(this.r)}${so(this.g)}${so(this.b)}${so((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ic() {
  const e = hi(this.opacity);
  return `${e === 1 ? "rgb(" : "rgba("}${ao(this.r)}, ${ao(this.g)}, ${ao(this.b)}${e === 1 ? ")" : `, ${e})`}`;
}
function hi(e) {
  return isNaN(e) ? 1 : Math.max(0, Math.min(1, e));
}
function ao(e) {
  return Math.max(0, Math.min(255, Math.round(e) || 0));
}
function so(e) {
  return e = ao(e), (e < 16 ? "0" : "") + e.toString(16);
}
function lc(e, t, n, o) {
  return o <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Jt(e, t, n, o);
}
function Wf(e) {
  if (e instanceof Jt)
    return new Jt(e.h, e.s, e.l, e.opacity);
  if (e instanceof Ss || (e = gs(e)), !e)
    return new Jt();
  if (e instanceof Jt)
    return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, o = e.b / 255, s = Math.min(t, n, o), i = Math.max(t, n, o), l = NaN, r = i - s, u = (i + s) / 2;
  return r ? (t === i ? l = (n - o) / r + (n < o) * 6 : n === i ? l = (o - t) / r + 2 : l = (t - n) / r + 4, r /= u < 0.5 ? i + s : 2 - i - s, l *= 60) : r = u > 0 && u < 1 ? 0 : l, new Jt(l, r, u, e.opacity);
}
function Kk(e, t, n, o) {
  return arguments.length === 1 ? Wf(e) : new Jt(e, t, n, o ?? 1);
}
function Jt(e, t, n, o) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +o;
}
Lr(Jt, Kk, Kf(Ss, {
  brighter(e) {
    return e = e == null ? pi : Math.pow(pi, e), new Jt(this.h, this.s, this.l * e, this.opacity);
  },
  darker(e) {
    return e = e == null ? hs : Math.pow(hs, e), new Jt(this.h, this.s, this.l * e, this.opacity);
  },
  rgb() {
    var e = this.h % 360 + (this.h < 0) * 360, t = isNaN(e) || isNaN(this.s) ? 0 : this.s, n = this.l, o = n + (n < 0.5 ? n : 1 - n) * t, s = 2 * n - o;
    return new Ft(
      pl(e >= 240 ? e - 240 : e + 120, s, o),
      pl(e, s, o),
      pl(e < 120 ? e + 240 : e - 120, s, o),
      this.opacity
    );
  },
  clamp() {
    return new Jt(rc(this.h), Ls(this.s), Ls(this.l), hi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = hi(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${rc(this.h)}, ${Ls(this.s) * 100}%, ${Ls(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function rc(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ls(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function pl(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Zf = (e) => () => e;
function Wk(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function Zk(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(o) {
    return Math.pow(e + o * t, n);
  };
}
function Jk(e) {
  return (e = +e) == 1 ? Jf : function(t, n) {
    return n - t ? Zk(t, n, e) : Zf(isNaN(t) ? n : t);
  };
}
function Jf(e, t) {
  var n = t - e;
  return n ? Wk(e, n) : Zf(isNaN(e) ? t : e);
}
const ac = function e(t) {
  var n = Jk(t);
  function o(s, i) {
    var l = n((s = Kl(s)).r, (i = Kl(i)).r), r = n(s.g, i.g), u = n(s.b, i.b), c = Jf(s.opacity, i.opacity);
    return function(d) {
      return s.r = l(d), s.g = r(d), s.b = u(d), s.opacity = c(d), s + "";
    };
  }
  return o.gamma = e, o;
}(1);
function Rn(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var Wl = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, hl = new RegExp(Wl.source, "g");
function Qk(e) {
  return function() {
    return e;
  };
}
function e2(e) {
  return function(t) {
    return e(t) + "";
  };
}
function t2(e, t) {
  var n = Wl.lastIndex = hl.lastIndex = 0, o, s, i, l = -1, r = [], u = [];
  for (e = e + "", t = t + ""; (o = Wl.exec(e)) && (s = hl.exec(t)); )
    (i = s.index) > n && (i = t.slice(n, i), r[l] ? r[l] += i : r[++l] = i), (o = o[0]) === (s = s[0]) ? r[l] ? r[l] += s : r[++l] = s : (r[++l] = null, u.push({ i: l, x: Rn(o, s) })), n = hl.lastIndex;
  return n < t.length && (i = t.slice(n), r[l] ? r[l] += i : r[++l] = i), r.length < 2 ? u[0] ? e2(u[0].x) : Qk(t) : (t = u.length, function(c) {
    for (var d = 0, f; d < t; ++d)
      r[(f = u[d]).i] = f.x(c);
    return r.join("");
  });
}
var uc = 180 / Math.PI, Zl = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function Qf(e, t, n, o, s, i) {
  var l, r, u;
  return (l = Math.sqrt(e * e + t * t)) && (e /= l, t /= l), (u = e * n + t * o) && (n -= e * u, o -= t * u), (r = Math.sqrt(n * n + o * o)) && (n /= r, o /= r, u /= r), e * o < t * n && (e = -e, t = -t, u = -u, l = -l), {
    translateX: s,
    translateY: i,
    rotate: Math.atan2(t, e) * uc,
    skewX: Math.atan(u) * uc,
    scaleX: l,
    scaleY: r
  };
}
var Vs;
function n2(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Zl : Qf(t.a, t.b, t.c, t.d, t.e, t.f);
}
function o2(e) {
  return e == null || (Vs || (Vs = document.createElementNS("http://www.w3.org/2000/svg", "g")), Vs.setAttribute("transform", e), !(e = Vs.transform.baseVal.consolidate())) ? Zl : (e = e.matrix, Qf(e.a, e.b, e.c, e.d, e.e, e.f));
}
function ep(e, t, n, o) {
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function i(c, d, f, p, h, b) {
    if (c !== f || d !== p) {
      var C = h.push("translate(", null, t, null, n);
      b.push({ i: C - 4, x: Rn(c, f) }, { i: C - 2, x: Rn(d, p) });
    } else (f || p) && h.push("translate(" + f + t + p + n);
  }
  function l(c, d, f, p) {
    c !== d ? (c - d > 180 ? d += 360 : d - c > 180 && (c += 360), p.push({ i: f.push(s(f) + "rotate(", null, o) - 2, x: Rn(c, d) })) : d && f.push(s(f) + "rotate(" + d + o);
  }
  function r(c, d, f, p) {
    c !== d ? p.push({ i: f.push(s(f) + "skewX(", null, o) - 2, x: Rn(c, d) }) : d && f.push(s(f) + "skewX(" + d + o);
  }
  function u(c, d, f, p, h, b) {
    if (c !== f || d !== p) {
      var C = h.push(s(h) + "scale(", null, ",", null, ")");
      b.push({ i: C - 4, x: Rn(c, f) }, { i: C - 2, x: Rn(d, p) });
    } else (f !== 1 || p !== 1) && h.push(s(h) + "scale(" + f + "," + p + ")");
  }
  return function(c, d) {
    var f = [], p = [];
    return c = e(c), d = e(d), i(c.translateX, c.translateY, d.translateX, d.translateY, f, p), l(c.rotate, d.rotate, f, p), r(c.skewX, d.skewX, f, p), u(c.scaleX, c.scaleY, d.scaleX, d.scaleY, f, p), c = d = null, function(h) {
      for (var b = -1, C = p.length, M; ++b < C; )
        f[(M = p[b]).i] = M.x(h);
      return f.join("");
    };
  };
}
var s2 = ep(n2, "px, ", "px)", "deg)"), i2 = ep(o2, ", ", ")", ")"), l2 = 1e-12;
function cc(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function r2(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function a2(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const u2 = function e(t, n, o) {
  function s(i, l) {
    var r = i[0], u = i[1], c = i[2], d = l[0], f = l[1], p = l[2], h = d - r, b = f - u, C = h * h + b * b, M, P;
    if (C < l2)
      P = Math.log(p / c) / t, M = function(Z) {
        return [
          r + Z * h,
          u + Z * b,
          c * Math.exp(t * Z * P)
        ];
      };
    else {
      var L = Math.sqrt(C), E = (p * p - c * c + o * C) / (2 * c * n * L), x = (p * p - c * c - o * C) / (2 * p * n * L), z = Math.log(Math.sqrt(E * E + 1) - E), Y = Math.log(Math.sqrt(x * x + 1) - x);
      P = (Y - z) / t, M = function(Z) {
        var H = Z * P, T = cc(z), X = c / (n * L) * (T * a2(t * H + z) - r2(z));
        return [
          r + X * h,
          u + X * b,
          c * T / cc(t * H + z)
        ];
      };
    }
    return M.duration = P * 1e3 * t / Math.SQRT2, M;
  }
  return s.rho = function(i) {
    var l = Math.max(1e-3, +i), r = l * l, u = r * r;
    return e(l, r, u);
  }, s;
}(Math.SQRT2, 2, 4);
var Ro = 0, Ko = 0, Go = 0, tp = 1e3, vi, Wo, gi = 0, ho = 0, zi = 0, ms = typeof performance == "object" && performance.now ? performance : Date, np = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Vr() {
  return ho || (np(c2), ho = ms.now() + zi);
}
function c2() {
  ho = 0;
}
function mi() {
  this._call = this._time = this._next = null;
}
mi.prototype = op.prototype = {
  constructor: mi,
  restart: function(e, t, n) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? Vr() : +n) + (t == null ? 0 : +t), !this._next && Wo !== this && (Wo ? Wo._next = this : vi = this, Wo = this), this._call = e, this._time = n, Jl();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Jl());
  }
};
function op(e, t, n) {
  var o = new mi();
  return o.restart(e, t, n), o;
}
function d2() {
  Vr(), ++Ro;
  for (var e = vi, t; e; )
    (t = ho - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Ro;
}
function dc() {
  ho = (gi = ms.now()) + zi, Ro = Ko = 0;
  try {
    d2();
  } finally {
    Ro = 0, p2(), ho = 0;
  }
}
function f2() {
  var e = ms.now(), t = e - gi;
  t > tp && (zi -= t, gi = e);
}
function p2() {
  for (var e, t = vi, n, o = 1 / 0; t; )
    t._call ? (o > t._time && (o = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : vi = n);
  Wo = e, Jl(o);
}
function Jl(e) {
  if (!Ro) {
    Ko && (Ko = clearTimeout(Ko));
    var t = e - ho;
    t > 24 ? (e < 1 / 0 && (Ko = setTimeout(dc, e - ms.now() - zi)), Go && (Go = clearInterval(Go))) : (Go || (gi = ms.now(), Go = setInterval(f2, tp)), Ro = 1, np(dc));
  }
}
function fc(e, t, n) {
  var o = new mi();
  return t = t == null ? 0 : +t, o.restart((s) => {
    o.stop(), e(s + t);
  }, t, n), o;
}
var h2 = Li("start", "end", "cancel", "interrupt"), v2 = [], sp = 0, pc = 1, Ql = 2, Qs = 3, hc = 4, er = 5, ei = 6;
function Fi(e, t, n, o, s, i) {
  var l = e.__transition;
  if (!l)
    e.__transition = {};
  else if (n in l)
    return;
  g2(e, n, {
    name: t,
    index: o,
    // For context during callback.
    group: s,
    // For context during callback.
    on: h2,
    tween: v2,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: sp
  });
}
function zr(e, t) {
  var n = nn(e, t);
  if (n.state > sp)
    throw new Error("too late; already scheduled");
  return n;
}
function vn(e, t) {
  var n = nn(e, t);
  if (n.state > Qs)
    throw new Error("too late; already running");
  return n;
}
function nn(e, t) {
  var n = e.__transition;
  if (!n || !(n = n[t]))
    throw new Error("transition not found");
  return n;
}
function g2(e, t, n) {
  var o = e.__transition, s;
  o[t] = n, n.timer = op(i, 0, n.time);
  function i(c) {
    n.state = pc, n.timer.restart(l, n.delay, n.time), n.delay <= c && l(c - n.delay);
  }
  function l(c) {
    var d, f, p, h;
    if (n.state !== pc)
      return u();
    for (d in o)
      if (h = o[d], h.name === n.name) {
        if (h.state === Qs)
          return fc(l);
        h.state === hc ? (h.state = ei, h.timer.stop(), h.on.call("interrupt", e, e.__data__, h.index, h.group), delete o[d]) : +d < t && (h.state = ei, h.timer.stop(), h.on.call("cancel", e, e.__data__, h.index, h.group), delete o[d]);
      }
    if (fc(function() {
      n.state === Qs && (n.state = hc, n.timer.restart(r, n.delay, n.time), r(c));
    }), n.state = Ql, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Ql) {
      for (n.state = Qs, s = new Array(p = n.tween.length), d = 0, f = -1; d < p; ++d)
        (h = n.tween[d].value.call(e, e.__data__, n.index, n.group)) && (s[++f] = h);
      s.length = f + 1;
    }
  }
  function r(c) {
    for (var d = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(u), n.state = er, 1), f = -1, p = s.length; ++f < p; )
      s[f].call(e, d);
    n.state === er && (n.on.call("end", e, e.__data__, n.index, n.group), u());
  }
  function u() {
    n.state = ei, n.timer.stop(), delete o[t];
    for (var c in o)
      return;
    delete e.__transition;
  }
}
function ti(e, t) {
  var n = e.__transition, o, s, i = !0, l;
  if (n) {
    t = t == null ? null : t + "";
    for (l in n) {
      if ((o = n[l]).name !== t) {
        i = !1;
        continue;
      }
      s = o.state > Ql && o.state < er, o.state = ei, o.timer.stop(), o.on.call(s ? "interrupt" : "cancel", e, e.__data__, o.index, o.group), delete n[l];
    }
    i && delete e.__transition;
  }
}
function m2(e) {
  return this.each(function() {
    ti(this, e);
  });
}
function y2(e, t) {
  var n, o;
  return function() {
    var s = vn(this, e), i = s.tween;
    if (i !== n) {
      o = n = i;
      for (var l = 0, r = o.length; l < r; ++l)
        if (o[l].name === t) {
          o = o.slice(), o.splice(l, 1);
          break;
        }
    }
    s.tween = o;
  };
}
function b2(e, t, n) {
  var o, s;
  if (typeof n != "function")
    throw new Error();
  return function() {
    var i = vn(this, e), l = i.tween;
    if (l !== o) {
      s = (o = l).slice();
      for (var r = { name: t, value: n }, u = 0, c = s.length; u < c; ++u)
        if (s[u].name === t) {
          s[u] = r;
          break;
        }
      u === c && s.push(r);
    }
    i.tween = s;
  };
}
function _2(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var o = nn(this.node(), n).tween, s = 0, i = o.length, l; s < i; ++s)
      if ((l = o[s]).name === e)
        return l.value;
    return null;
  }
  return this.each((t == null ? y2 : b2)(n, e, t));
}
function Fr(e, t, n) {
  var o = e._id;
  return e.each(function() {
    var s = vn(this, o);
    (s.value || (s.value = {}))[t] = n.apply(this, arguments);
  }), function(s) {
    return nn(s, o).value[t];
  };
}
function ip(e, t) {
  var n;
  return (typeof t == "number" ? Rn : t instanceof gs ? ac : (n = gs(t)) ? (t = n, ac) : t2)(e, t);
}
function w2(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function k2(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function E2(e, t, n) {
  var o, s = n + "", i;
  return function() {
    var l = this.getAttribute(e);
    return l === s ? null : l === o ? i : i = t(o = l, n);
  };
}
function C2(e, t, n) {
  var o, s = n + "", i;
  return function() {
    var l = this.getAttributeNS(e.space, e.local);
    return l === s ? null : l === o ? i : i = t(o = l, n);
  };
}
function x2(e, t, n) {
  var o, s, i;
  return function() {
    var l, r = n(this), u;
    return r == null ? void this.removeAttribute(e) : (l = this.getAttribute(e), u = r + "", l === u ? null : l === o && u === s ? i : (s = u, i = t(o = l, r)));
  };
}
function S2(e, t, n) {
  var o, s, i;
  return function() {
    var l, r = n(this), u;
    return r == null ? void this.removeAttributeNS(e.space, e.local) : (l = this.getAttributeNS(e.space, e.local), u = r + "", l === u ? null : l === o && u === s ? i : (s = u, i = t(o = l, r)));
  };
}
function $2(e, t) {
  var n = Vi(e), o = n === "transform" ? i2 : ip;
  return this.attrTween(e, typeof t == "function" ? (n.local ? S2 : x2)(n, o, Fr(this, "attr." + e, t)) : t == null ? (n.local ? k2 : w2)(n) : (n.local ? C2 : E2)(n, o, t));
}
function I2(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function N2(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function T2(e, t) {
  var n, o;
  function s() {
    var i = t.apply(this, arguments);
    return i !== o && (n = (o = i) && N2(e, i)), n;
  }
  return s._value = t, s;
}
function M2(e, t) {
  var n, o;
  function s() {
    var i = t.apply(this, arguments);
    return i !== o && (n = (o = i) && I2(e, i)), n;
  }
  return s._value = t, s;
}
function P2(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  var o = Vi(e);
  return this.tween(n, (o.local ? T2 : M2)(o, t));
}
function O2(e, t) {
  return function() {
    zr(this, e).delay = +t.apply(this, arguments);
  };
}
function A2(e, t) {
  return t = +t, function() {
    zr(this, e).delay = t;
  };
}
function D2(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? O2 : A2)(t, e)) : nn(this.node(), t).delay;
}
function R2(e, t) {
  return function() {
    vn(this, e).duration = +t.apply(this, arguments);
  };
}
function L2(e, t) {
  return t = +t, function() {
    vn(this, e).duration = t;
  };
}
function V2(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? R2 : L2)(t, e)) : nn(this.node(), t).duration;
}
function z2(e, t) {
  if (typeof t != "function")
    throw new Error();
  return function() {
    vn(this, e).ease = t;
  };
}
function F2(e) {
  var t = this._id;
  return arguments.length ? this.each(z2(t, e)) : nn(this.node(), t).ease;
}
function B2(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    vn(this, e).ease = n;
  };
}
function H2(e) {
  if (typeof e != "function")
    throw new Error();
  return this.each(B2(this._id, e));
}
function U2(e) {
  typeof e != "function" && (e = Lf(e));
  for (var t = this._groups, n = t.length, o = new Array(n), s = 0; s < n; ++s)
    for (var i = t[s], l = i.length, r = o[s] = [], u, c = 0; c < l; ++c)
      (u = i[c]) && e.call(u, u.__data__, c, i) && r.push(u);
  return new Nn(o, this._parents, this._name, this._id);
}
function j2(e) {
  if (e._id !== this._id)
    throw new Error();
  for (var t = this._groups, n = e._groups, o = t.length, s = n.length, i = Math.min(o, s), l = new Array(o), r = 0; r < i; ++r)
    for (var u = t[r], c = n[r], d = u.length, f = l[r] = new Array(d), p, h = 0; h < d; ++h)
      (p = u[h] || c[h]) && (f[h] = p);
  for (; r < o; ++r)
    l[r] = t[r];
  return new Nn(l, this._parents, this._name, this._id);
}
function G2(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function q2(e, t, n) {
  var o, s, i = G2(t) ? zr : vn;
  return function() {
    var l = i(this, e), r = l.on;
    r !== o && (s = (o = r).copy()).on(t, n), l.on = s;
  };
}
function Y2(e, t) {
  var n = this._id;
  return arguments.length < 2 ? nn(this.node(), n).on.on(e) : this.each(q2(n, e, t));
}
function X2(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition)
      if (+n !== e)
        return;
    t && t.removeChild(this);
  };
}
function K2() {
  return this.on("end.remove", X2(this._id));
}
function W2(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Dr(e));
  for (var o = this._groups, s = o.length, i = new Array(s), l = 0; l < s; ++l)
    for (var r = o[l], u = r.length, c = i[l] = new Array(u), d, f, p = 0; p < u; ++p)
      (d = r[p]) && (f = e.call(d, d.__data__, p, r)) && ("__data__" in d && (f.__data__ = d.__data__), c[p] = f, Fi(c[p], t, n, p, c, nn(d, n)));
  return new Nn(i, this._parents, t, n);
}
function Z2(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Rf(e));
  for (var o = this._groups, s = o.length, i = [], l = [], r = 0; r < s; ++r)
    for (var u = o[r], c = u.length, d, f = 0; f < c; ++f)
      if (d = u[f]) {
        for (var p = e.call(d, d.__data__, f, u), h, b = nn(d, n), C = 0, M = p.length; C < M; ++C)
          (h = p[C]) && Fi(h, t, n, C, p, b);
        i.push(p), l.push(d);
      }
  return new Nn(i, l, t, n);
}
var J2 = xs.prototype.constructor;
function Q2() {
  return new J2(this._groups, this._parents);
}
function eE(e, t) {
  var n, o, s;
  return function() {
    var i = Do(this, e), l = (this.style.removeProperty(e), Do(this, e));
    return i === l ? null : i === n && l === o ? s : s = t(n = i, o = l);
  };
}
function lp(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function tE(e, t, n) {
  var o, s = n + "", i;
  return function() {
    var l = Do(this, e);
    return l === s ? null : l === o ? i : i = t(o = l, n);
  };
}
function nE(e, t, n) {
  var o, s, i;
  return function() {
    var l = Do(this, e), r = n(this), u = r + "";
    return r == null && (u = r = (this.style.removeProperty(e), Do(this, e))), l === u ? null : l === o && u === s ? i : (s = u, i = t(o = l, r));
  };
}
function oE(e, t) {
  var n, o, s, i = "style." + t, l = "end." + i, r;
  return function() {
    var u = vn(this, e), c = u.on, d = u.value[i] == null ? r || (r = lp(t)) : void 0;
    (c !== n || s !== d) && (o = (n = c).copy()).on(l, s = d), u.on = o;
  };
}
function sE(e, t, n) {
  var o = (e += "") == "transform" ? s2 : ip;
  return t == null ? this.styleTween(e, eE(e, o)).on("end.style." + e, lp(e)) : typeof t == "function" ? this.styleTween(e, nE(e, o, Fr(this, "style." + e, t))).each(oE(this._id, e)) : this.styleTween(e, tE(e, o, t), n).on("end.style." + e, null);
}
function iE(e, t, n) {
  return function(o) {
    this.style.setProperty(e, t.call(this, o), n);
  };
}
function lE(e, t, n) {
  var o, s;
  function i() {
    var l = t.apply(this, arguments);
    return l !== s && (o = (s = l) && iE(e, l, n)), o;
  }
  return i._value = t, i;
}
function rE(e, t, n) {
  var o = "style." + (e += "");
  if (arguments.length < 2)
    return (o = this.tween(o)) && o._value;
  if (t == null)
    return this.tween(o, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(o, lE(e, t, n ?? ""));
}
function aE(e) {
  return function() {
    this.textContent = e;
  };
}
function uE(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function cE(e) {
  return this.tween("text", typeof e == "function" ? uE(Fr(this, "text", e)) : aE(e == null ? "" : e + ""));
}
function dE(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function fE(e) {
  var t, n;
  function o() {
    var s = e.apply(this, arguments);
    return s !== n && (t = (n = s) && dE(s)), t;
  }
  return o._value = e, o;
}
function pE(e) {
  var t = "text";
  if (arguments.length < 1)
    return (t = this.tween(t)) && t._value;
  if (e == null)
    return this.tween(t, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(t, fE(e));
}
function hE() {
  for (var e = this._name, t = this._id, n = rp(), o = this._groups, s = o.length, i = 0; i < s; ++i)
    for (var l = o[i], r = l.length, u, c = 0; c < r; ++c)
      if (u = l[c]) {
        var d = nn(u, t);
        Fi(u, e, n, c, l, {
          time: d.time + d.delay + d.duration,
          delay: 0,
          duration: d.duration,
          ease: d.ease
        });
      }
  return new Nn(o, this._parents, e, n);
}
function vE() {
  var e, t, n = this, o = n._id, s = n.size();
  return new Promise(function(i, l) {
    var r = { value: l }, u = { value: function() {
      --s === 0 && i();
    } };
    n.each(function() {
      var c = vn(this, o), d = c.on;
      d !== e && (t = (e = d).copy(), t._.cancel.push(r), t._.interrupt.push(r), t._.end.push(u)), c.on = t;
    }), s === 0 && i();
  });
}
var gE = 0;
function Nn(e, t, n, o) {
  this._groups = e, this._parents = t, this._name = n, this._id = o;
}
function rp() {
  return ++gE;
}
var yn = xs.prototype;
Nn.prototype = {
  constructor: Nn,
  select: W2,
  selectAll: Z2,
  selectChild: yn.selectChild,
  selectChildren: yn.selectChildren,
  filter: U2,
  merge: j2,
  selection: Q2,
  transition: hE,
  call: yn.call,
  nodes: yn.nodes,
  node: yn.node,
  size: yn.size,
  empty: yn.empty,
  each: yn.each,
  on: Y2,
  attr: $2,
  attrTween: P2,
  style: sE,
  styleTween: rE,
  text: cE,
  textTween: pE,
  remove: K2,
  tween: _2,
  delay: D2,
  duration: V2,
  ease: F2,
  easeVarying: H2,
  end: vE,
  [Symbol.iterator]: yn[Symbol.iterator]
};
function mE(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var yE = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: mE
};
function bE(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function _E(e) {
  var t, n;
  e instanceof Nn ? (t = e._id, e = e._name) : (t = rp(), (n = yE).time = Vr(), e = e == null ? null : e + "");
  for (var o = this._groups, s = o.length, i = 0; i < s; ++i)
    for (var l = o[i], r = l.length, u, c = 0; c < r; ++c)
      (u = l[c]) && Fi(u, e, t, c, l, n || bE(u, t));
  return new Nn(o, this._parents, e, t);
}
xs.prototype.interrupt = m2;
xs.prototype.transition = _E;
const zs = (e) => () => e;
function wE(e, {
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
function Cn(e, t, n) {
  this.k = e, this.x = t, this.y = n;
}
Cn.prototype = {
  constructor: Cn,
  scale: function(e) {
    return e === 1 ? this : new Cn(this.k * e, this.x, this.y);
  },
  translate: function(e, t) {
    return e === 0 & t === 0 ? this : new Cn(this.k, this.x + this.k * e, this.y + this.k * t);
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
var Lo = new Cn(1, 0, 0);
Cn.prototype;
function vl(e) {
  e.stopImmediatePropagation();
}
function qo(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function kE(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function EE() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function vc() {
  return this.__zoom || Lo;
}
function CE(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function xE() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function SE(e, t, n) {
  var o = e.invertX(t[0][0]) - n[0][0], s = e.invertX(t[1][0]) - n[1][0], i = e.invertY(t[0][1]) - n[0][1], l = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s),
    l > i ? (i + l) / 2 : Math.min(0, i) || Math.max(0, l)
  );
}
function $E() {
  var e = kE, t = EE, n = SE, o = CE, s = xE, i = [0, 1 / 0], l = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], r = 250, u = u2, c = Li("start", "zoom", "end"), d, f, p, h = 500, b = 150, C = 0, M = 10;
  function P(k) {
    k.property("__zoom", vc).on("wheel.zoom", H, { passive: !1 }).on("mousedown.zoom", T).on("dblclick.zoom", X).filter(s).on("touchstart.zoom", q).on("touchmove.zoom", V).on("touchend.zoom touchcancel.zoom", R).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  P.transform = function(k, D, O, B) {
    var G = k.selection ? k.selection() : k;
    G.property("__zoom", vc), k !== G ? z(k, D, O, B) : G.interrupt().each(function() {
      Y(this, arguments).event(B).start().zoom(null, typeof D == "function" ? D.apply(this, arguments) : D).end();
    });
  }, P.scaleBy = function(k, D, O, B) {
    P.scaleTo(k, function() {
      var G = this.__zoom.k, ie = typeof D == "function" ? D.apply(this, arguments) : D;
      return G * ie;
    }, O, B);
  }, P.scaleTo = function(k, D, O, B) {
    P.transform(k, function() {
      var G = t.apply(this, arguments), ie = this.__zoom, de = O == null ? x(G) : typeof O == "function" ? O.apply(this, arguments) : O, ve = ie.invert(de), re = typeof D == "function" ? D.apply(this, arguments) : D;
      return n(E(L(ie, re), de, ve), G, l);
    }, O, B);
  }, P.translateBy = function(k, D, O, B) {
    P.transform(k, function() {
      return n(this.__zoom.translate(
        typeof D == "function" ? D.apply(this, arguments) : D,
        typeof O == "function" ? O.apply(this, arguments) : O
      ), t.apply(this, arguments), l);
    }, null, B);
  }, P.translateTo = function(k, D, O, B, G) {
    P.transform(k, function() {
      var ie = t.apply(this, arguments), de = this.__zoom, ve = B == null ? x(ie) : typeof B == "function" ? B.apply(this, arguments) : B;
      return n(Lo.translate(ve[0], ve[1]).scale(de.k).translate(
        typeof D == "function" ? -D.apply(this, arguments) : -D,
        typeof O == "function" ? -O.apply(this, arguments) : -O
      ), ie, l);
    }, B, G);
  };
  function L(k, D) {
    return D = Math.max(i[0], Math.min(i[1], D)), D === k.k ? k : new Cn(D, k.x, k.y);
  }
  function E(k, D, O) {
    var B = D[0] - O[0] * k.k, G = D[1] - O[1] * k.k;
    return B === k.x && G === k.y ? k : new Cn(k.k, B, G);
  }
  function x(k) {
    return [(+k[0][0] + +k[1][0]) / 2, (+k[0][1] + +k[1][1]) / 2];
  }
  function z(k, D, O, B) {
    k.on("start.zoom", function() {
      Y(this, arguments).event(B).start();
    }).on("interrupt.zoom end.zoom", function() {
      Y(this, arguments).event(B).end();
    }).tween("zoom", function() {
      var G = this, ie = arguments, de = Y(G, ie).event(B), ve = t.apply(G, ie), re = O == null ? x(ve) : typeof O == "function" ? O.apply(G, ie) : O, ye = Math.max(ve[1][0] - ve[0][0], ve[1][1] - ve[0][1]), pe = G.__zoom, ce = typeof D == "function" ? D.apply(G, ie) : D, Ie = u(pe.invert(re).concat(ye / pe.k), ce.invert(re).concat(ye / ce.k));
      return function(Me) {
        if (Me === 1)
          Me = ce;
        else {
          var oe = Ie(Me), Se = ye / oe[2];
          Me = new Cn(Se, re[0] - oe[0] * Se, re[1] - oe[1] * Se);
        }
        de.zoom(null, Me);
      };
    });
  }
  function Y(k, D, O) {
    return !O && k.__zooming || new Z(k, D);
  }
  function Z(k, D) {
    this.that = k, this.args = D, this.active = 0, this.sourceEvent = null, this.extent = t.apply(k, D), this.taps = 0;
  }
  Z.prototype = {
    event: function(k) {
      return k && (this.sourceEvent = k), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(k, D) {
      return this.mouse && k !== "mouse" && (this.mouse[1] = D.invert(this.mouse[0])), this.touch0 && k !== "touch" && (this.touch0[1] = D.invert(this.touch0[0])), this.touch1 && k !== "touch" && (this.touch1[1] = D.invert(this.touch1[0])), this.that.__zoom = D, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(k) {
      var D = Zt(this.that).datum();
      c.call(
        k,
        this.that,
        new wE(k, {
          sourceEvent: this.sourceEvent,
          target: P,
          transform: this.that.__zoom,
          dispatch: c
        }),
        D
      );
    }
  };
  function H(k, ...D) {
    if (!e.apply(this, arguments))
      return;
    var O = Y(this, D).event(k), B = this.__zoom, G = Math.max(i[0], Math.min(i[1], B.k * Math.pow(2, o.apply(this, arguments)))), ie = rn(k);
    if (O.wheel)
      (O.mouse[0][0] !== ie[0] || O.mouse[0][1] !== ie[1]) && (O.mouse[1] = B.invert(O.mouse[0] = ie)), clearTimeout(O.wheel);
    else {
      if (B.k === G)
        return;
      O.mouse = [ie, B.invert(ie)], ti(this), O.start();
    }
    qo(k), O.wheel = setTimeout(de, b), O.zoom("mouse", n(E(L(B, G), O.mouse[0], O.mouse[1]), O.extent, l));
    function de() {
      O.wheel = null, O.end();
    }
  }
  function T(k, ...D) {
    if (p || !e.apply(this, arguments))
      return;
    var O = k.currentTarget, B = Y(this, D, !0).event(k), G = Zt(k.view).on("mousemove.zoom", re, !0).on("mouseup.zoom", ye, !0), ie = rn(k, O), de = k.clientX, ve = k.clientY;
    Yf(k.view), vl(k), B.mouse = [ie, this.__zoom.invert(ie)], ti(this), B.start();
    function re(pe) {
      if (qo(pe), !B.moved) {
        var ce = pe.clientX - de, Ie = pe.clientY - ve;
        B.moved = ce * ce + Ie * Ie > C;
      }
      B.event(pe).zoom("mouse", n(E(B.that.__zoom, B.mouse[0] = rn(pe, O), B.mouse[1]), B.extent, l));
    }
    function ye(pe) {
      G.on("mousemove.zoom mouseup.zoom", null), Xf(pe.view, B.moved), qo(pe), B.event(pe).end();
    }
  }
  function X(k, ...D) {
    if (e.apply(this, arguments)) {
      var O = this.__zoom, B = rn(k.changedTouches ? k.changedTouches[0] : k, this), G = O.invert(B), ie = O.k * (k.shiftKey ? 0.5 : 2), de = n(E(L(O, ie), B, G), t.apply(this, D), l);
      qo(k), r > 0 ? Zt(this).transition().duration(r).call(z, de, B, k) : Zt(this).call(P.transform, de, B, k);
    }
  }
  function q(k, ...D) {
    if (e.apply(this, arguments)) {
      var O = k.touches, B = O.length, G = Y(this, D, k.changedTouches.length === B).event(k), ie, de, ve, re;
      for (vl(k), de = 0; de < B; ++de)
        ve = O[de], re = rn(ve, this), re = [re, this.__zoom.invert(re), ve.identifier], G.touch0 ? !G.touch1 && G.touch0[2] !== re[2] && (G.touch1 = re, G.taps = 0) : (G.touch0 = re, ie = !0, G.taps = 1 + !!d);
      d && (d = clearTimeout(d)), ie && (G.taps < 2 && (f = re[0], d = setTimeout(function() {
        d = null;
      }, h)), ti(this), G.start());
    }
  }
  function V(k, ...D) {
    if (this.__zooming) {
      var O = Y(this, D).event(k), B = k.changedTouches, G = B.length, ie, de, ve, re;
      for (qo(k), ie = 0; ie < G; ++ie)
        de = B[ie], ve = rn(de, this), O.touch0 && O.touch0[2] === de.identifier ? O.touch0[0] = ve : O.touch1 && O.touch1[2] === de.identifier && (O.touch1[0] = ve);
      if (de = O.that.__zoom, O.touch1) {
        var ye = O.touch0[0], pe = O.touch0[1], ce = O.touch1[0], Ie = O.touch1[1], Me = (Me = ce[0] - ye[0]) * Me + (Me = ce[1] - ye[1]) * Me, oe = (oe = Ie[0] - pe[0]) * oe + (oe = Ie[1] - pe[1]) * oe;
        de = L(de, Math.sqrt(Me / oe)), ve = [(ye[0] + ce[0]) / 2, (ye[1] + ce[1]) / 2], re = [(pe[0] + Ie[0]) / 2, (pe[1] + Ie[1]) / 2];
      } else if (O.touch0)
        ve = O.touch0[0], re = O.touch0[1];
      else
        return;
      O.zoom("touch", n(E(de, ve, re), O.extent, l));
    }
  }
  function R(k, ...D) {
    if (this.__zooming) {
      var O = Y(this, D).event(k), B = k.changedTouches, G = B.length, ie, de;
      for (vl(k), p && clearTimeout(p), p = setTimeout(function() {
        p = null;
      }, h), ie = 0; ie < G; ++ie)
        de = B[ie], O.touch0 && O.touch0[2] === de.identifier ? delete O.touch0 : O.touch1 && O.touch1[2] === de.identifier && delete O.touch1;
      if (O.touch1 && !O.touch0 && (O.touch0 = O.touch1, delete O.touch1), O.touch0)
        O.touch0[1] = this.__zoom.invert(O.touch0[0]);
      else if (O.end(), O.taps === 2 && (de = rn(de, this), Math.hypot(f[0] - de[0], f[1] - de[1]) < M)) {
        var ve = Zt(this).on("dblclick.zoom");
        ve && ve.apply(this, arguments);
      }
    }
  }
  return P.wheelDelta = function(k) {
    return arguments.length ? (o = typeof k == "function" ? k : zs(+k), P) : o;
  }, P.filter = function(k) {
    return arguments.length ? (e = typeof k == "function" ? k : zs(!!k), P) : e;
  }, P.touchable = function(k) {
    return arguments.length ? (s = typeof k == "function" ? k : zs(!!k), P) : s;
  }, P.extent = function(k) {
    return arguments.length ? (t = typeof k == "function" ? k : zs([[+k[0][0], +k[0][1]], [+k[1][0], +k[1][1]]]), P) : t;
  }, P.scaleExtent = function(k) {
    return arguments.length ? (i[0] = +k[0], i[1] = +k[1], P) : [i[0], i[1]];
  }, P.translateExtent = function(k) {
    return arguments.length ? (l[0][0] = +k[0][0], l[1][0] = +k[1][0], l[0][1] = +k[0][1], l[1][1] = +k[1][1], P) : [[l[0][0], l[0][1]], [l[1][0], l[1][1]]];
  }, P.constrain = function(k) {
    return arguments.length ? (n = k, P) : n;
  }, P.duration = function(k) {
    return arguments.length ? (r = +k, P) : r;
  }, P.interpolate = function(k) {
    return arguments.length ? (u = k, P) : u;
  }, P.on = function() {
    var k = c.on.apply(c, arguments);
    return k === c ? P : k;
  }, P.clickDistance = function(k) {
    return arguments.length ? (C = (k = +k) * k, P) : Math.sqrt(C);
  }, P.tapDistance = function(k) {
    return arguments.length ? (M = +k, P) : M;
  }, P;
}
var $e = /* @__PURE__ */ ((e) => (e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom", e))($e || {}), Br = /* @__PURE__ */ ((e) => (e.Partial = "partial", e.Full = "full", e))(Br || {}), to = /* @__PURE__ */ ((e) => (e.Bezier = "default", e.SimpleBezier = "simple-bezier", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e))(to || {}), vo = /* @__PURE__ */ ((e) => (e.Strict = "strict", e.Loose = "loose", e))(vo || {}), tr = /* @__PURE__ */ ((e) => (e.Arrow = "arrow", e.ArrowClosed = "arrowclosed", e))(tr || {}), is = /* @__PURE__ */ ((e) => (e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal", e))(is || {});
function nr(e) {
  var t, n;
  const o = ((n = (t = e.composedPath) == null ? void 0 : t.call(e)) == null ? void 0 : n[0]) || e.target, s = typeof (o == null ? void 0 : o.hasAttribute) == "function" ? o.hasAttribute("contenteditable") : !1, i = typeof (o == null ? void 0 : o.closest) == "function" ? o.closest(".nokey") : null;
  return ["INPUT", "SELECT", "TEXTAREA"].includes(o == null ? void 0 : o.nodeName) || s || !!i;
}
function IE(e) {
  return e.ctrlKey || e.metaKey || e.shiftKey;
}
function gc(e, t, n, o) {
  const s = t.replace("+", `
`).replace(`

`, `
+`).split(`
`).map((l) => l.trim().toLowerCase());
  if (s.length === 1)
    return e.toLowerCase() === t.toLowerCase();
  o || n.add(e.toLowerCase());
  const i = s.every(
    (l, r) => n.has(l) && Array.from(n.values())[r] === s[r]
  );
  return o && n.delete(e.toLowerCase()), i;
}
function NE(e, t) {
  return (n) => {
    if (!n.code && !n.key)
      return !1;
    const o = TE(n.code, e);
    return Array.isArray(e) ? e.some((s) => gc(n[o], s, t, n.type === "keyup")) : gc(n[o], e, t, n.type === "keyup");
  };
}
function TE(e, t) {
  return t.includes(e) ? "code" : "key";
}
function ls(e, t) {
  const n = tt(() => Ue(t == null ? void 0 : t.actInsideInputWithModifier) ?? !1), o = tt(() => Ue(t == null ? void 0 : t.target) ?? window), s = te(Ue(e) === !0);
  let i = !1;
  const l = /* @__PURE__ */ new Set();
  let r = c(Ue(e));
  ze(
    () => Ue(e),
    (d, f) => {
      typeof f == "boolean" && typeof d != "boolean" && u(), r = c(d);
    },
    {
      immediate: !0
    }
  ), Af(["blur", "contextmenu"], u), Zu(
    (...d) => r(...d),
    (d) => {
      i = IE(d), !((!i || i && !n.value) && nr(d)) && (d.preventDefault(), s.value = !0);
    },
    { eventName: "keydown", target: o }
  ), Zu(
    (...d) => r(...d),
    (d) => {
      if (s.value) {
        if ((!i || i && !n.value) && nr(d))
          return;
        i = !1, s.value = !1;
      }
    },
    { eventName: "keyup", target: o }
  );
  function u() {
    i = !1, l.clear(), s.value = Ue(e) === !0;
  }
  function c(d) {
    return d === null ? (u(), () => !1) : typeof d == "boolean" ? (u(), s.value = d, () => !1) : Array.isArray(d) || typeof d == "string" ? NE(d, l) : d;
  }
  return s;
}
const ap = "vue-flow__node-desc", up = "vue-flow__edge-desc", ME = "vue-flow__aria-live", cp = ["Enter", " ", "Escape"], Mo = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
};
function or(e) {
  return {
    ...e.computedPosition || { x: 0, y: 0 },
    width: e.dimensions.width || 0,
    height: e.dimensions.height || 0
  };
}
function sr(e, t) {
  const n = Math.max(0, Math.min(e.x + e.width, t.x + t.width) - Math.max(e.x, t.x)), o = Math.max(0, Math.min(e.y + e.height, t.y + t.height) - Math.max(e.y, t.y));
  return Math.ceil(n * o);
}
function Bi(e) {
  return {
    width: e.offsetWidth,
    height: e.offsetHeight
  };
}
function go(e, t = 0, n = 1) {
  return Math.min(Math.max(e, t), n);
}
function dp(e, t) {
  return {
    x: go(e.x, t[0][0], t[1][0]),
    y: go(e.y, t[0][1], t[1][1])
  };
}
function mc(e) {
  const t = e.getRootNode();
  return "elementFromPoint" in t ? t : window.document;
}
function Yn(e) {
  return e && typeof e == "object" && "id" in e && "source" in e && "target" in e;
}
function uo(e) {
  return e && typeof e == "object" && "id" in e && "position" in e && !Yn(e);
}
function Zo(e) {
  return uo(e) && "computedPosition" in e;
}
function Fs(e) {
  return !Number.isNaN(e) && Number.isFinite(e);
}
function PE(e) {
  return Fs(e.width) && Fs(e.height) && Fs(e.x) && Fs(e.y);
}
function OE(e, t, n) {
  const o = {
    id: e.id.toString(),
    type: e.type ?? "default",
    dimensions: lo({
      width: 0,
      height: 0
    }),
    computedPosition: lo({
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
    data: pt(e.data) ? e.data : {},
    events: lo(pt(e.events) ? e.events : {})
  };
  return Object.assign(t ?? o, e, { id: e.id.toString(), parentNode: n });
}
function fp(e, t, n) {
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
    data: pt(e.data) ? e.data : {},
    events: lo(pt(e.events) ? e.events : {}),
    label: e.label ?? "",
    interactionWidth: e.interactionWidth ?? (n == null ? void 0 : n.interactionWidth),
    ...n ?? {}
  };
  return Object.assign(t ?? i, e, { id: e.id.toString() });
}
function pp(e, t, n, o) {
  const s = typeof e == "string" ? e : e.id, i = /* @__PURE__ */ new Set(), l = o === "source" ? "target" : "source";
  for (const r of n)
    r[l] === s && i.add(r[o]);
  return t.filter((r) => i.has(r.id));
}
function AE(...e) {
  if (e.length === 3) {
    const [i, l, r] = e;
    return pp(i, l, r, "target");
  }
  const [t, n] = e, o = typeof t == "string" ? t : t.id;
  return n.filter((i) => Yn(i) && i.source === o).map((i) => n.find((l) => uo(l) && l.id === i.target));
}
function DE(...e) {
  if (e.length === 3) {
    const [i, l, r] = e;
    return pp(i, l, r, "source");
  }
  const [t, n] = e, o = typeof t == "string" ? t : t.id;
  return n.filter((i) => Yn(i) && i.target === o).map((i) => n.find((l) => uo(l) && l.id === i.source));
}
function hp({ source: e, sourceHandle: t, target: n, targetHandle: o }) {
  return `vueflow__edge-${e}${t ?? ""}-${n}${o ?? ""}`;
}
function RE(e, t) {
  return t.some(
    (n) => Yn(n) && n.source === e.source && n.target === e.target && (n.sourceHandle === e.sourceHandle || !n.sourceHandle && !e.sourceHandle) && (n.targetHandle === e.targetHandle || !n.targetHandle && !e.targetHandle)
  );
}
function vp({ x: e, y: t }, { x: n, y: o, zoom: s }) {
  return {
    x: e * s + n,
    y: t * s + o
  };
}
function ys({ x: e, y: t }, { x: n, y: o, zoom: s }, i = !1, l = [1, 1]) {
  const r = {
    x: (e - n) / s,
    y: (t - o) / s
  };
  return i ? Hi(r, l) : r;
}
function LE(e, t) {
  return {
    x: Math.min(e.x, t.x),
    y: Math.min(e.y, t.y),
    x2: Math.max(e.x2, t.x2),
    y2: Math.max(e.y2, t.y2)
  };
}
function gp({ x: e, y: t, width: n, height: o }) {
  return {
    x: e,
    y: t,
    x2: e + n,
    y2: t + o
  };
}
function VE({ x: e, y: t, x2: n, y2: o }) {
  return {
    x: e,
    y: t,
    width: n - e,
    height: o - t
  };
}
function mp(e) {
  let t = {
    x: Number.POSITIVE_INFINITY,
    y: Number.POSITIVE_INFINITY,
    x2: Number.NEGATIVE_INFINITY,
    y2: Number.NEGATIVE_INFINITY
  };
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    t = LE(
      t,
      gp({
        ...o.computedPosition,
        ...o.dimensions
      })
    );
  }
  return VE(t);
}
function yp(e, t, n = { x: 0, y: 0, zoom: 1 }, o = !1, s = !1) {
  const i = {
    ...ys(t, n),
    width: t.width / n.zoom,
    height: t.height / n.zoom
  }, l = [];
  for (const r of e) {
    const { dimensions: u, selectable: c = !0, hidden: d = !1 } = r, f = u.width ?? r.width ?? null, p = u.height ?? r.height ?? null;
    if (s && !c || d)
      continue;
    const h = sr(i, or(r)), b = f === null || p === null, C = o && h > 0, M = (f ?? 0) * (p ?? 0);
    (b || C || h >= M || r.dragging) && l.push(r);
  }
  return l;
}
function bp(e, t) {
  const n = /* @__PURE__ */ new Set();
  if (typeof e == "string")
    n.add(e);
  else if (e.length >= 1)
    for (const o of e)
      n.add(o.id);
  return t.filter((o) => n.has(o.source) || n.has(o.target));
}
function yc(e, t, n, o, s, i = 0.1, l = { x: 0, y: 0 }) {
  const r = t / (e.width * (1 + i)), u = n / (e.height * (1 + i)), c = Math.min(r, u), d = go(c, o, s), f = e.x + e.width / 2, p = e.y + e.height / 2, h = t / 2 - f * d + (l.x ?? 0), b = n / 2 - p * d + (l.y ?? 0);
  return { x: h, y: b, zoom: d };
}
function zE(e, t) {
  return {
    x: t.x + e.x,
    y: t.y + e.y,
    z: (e.z > t.z ? e.z : t.z) + 1
  };
}
function _p(e, t) {
  if (!e.parentNode)
    return !1;
  const n = t(e.parentNode);
  return n ? n.selected ? !0 : _p(n, t) : !1;
}
function bs(e, t) {
  return typeof e > "u" ? "" : typeof e == "string" ? e : `${t ? `${t}__` : ""}${Object.keys(e).sort().map((o) => `${o}=${e[o]}`).join("&")}`;
}
function bc(e, t, n) {
  return e < t ? go(Math.abs(e - t), 1, t) / t : e > n ? -go(Math.abs(e - n), 1, t) / t : 0;
}
function wp(e, t, n = 15, o = 40) {
  const s = bc(e.x, o, t.width - o) * n, i = bc(e.y, o, t.height - o) * n;
  return [s, i];
}
function gl(e, t) {
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
          const l = Number(s.width.replace("px", ""));
          s.width = `${l + i}px`;
        } else
          s.width += i;
        e.position.x = 0;
      }
      if (e.position.y < 0) {
        const i = Math.abs(e.position.y);
        if (t.position.y = t.position.y - i, typeof s.height == "string") {
          const l = Number(s.height.replace("px", ""));
          s.height = `${l + i}px`;
        } else
          s.height += i;
        e.position.y = 0;
      }
      t.dimensions.width = Number(s.width.toString().replace("px", "")), t.dimensions.height = Number(s.height.toString().replace("px", "")), typeof t.style == "function" ? t.style = (i) => {
        const l = t.style;
        return {
          ...l(i),
          ...s
        };
      } : t.style = {
        ...t.style,
        ...s
      };
    }
  }
}
function _c(e, t) {
  var n, o;
  const s = e.filter((l) => l.type === "add" || l.type === "remove");
  for (const l of s)
    if (l.type === "add")
      t.findIndex((u) => u.id === l.item.id) === -1 && t.push(l.item);
    else if (l.type === "remove") {
      const r = t.findIndex((u) => u.id === l.id);
      r !== -1 && t.splice(r, 1);
    }
  const i = t.map((l) => l.id);
  for (const l of t)
    for (const r of e)
      if (r.id === l.id)
        switch (r.type) {
          case "select":
            l.selected = r.selected;
            break;
          case "position":
            if (Zo(l) && (typeof r.position < "u" && (l.position = r.position), typeof r.dragging < "u" && (l.dragging = r.dragging), l.expandParent && l.parentNode)) {
              const u = t[i.indexOf(l.parentNode)];
              u && Zo(u) && gl(l, u);
            }
            break;
          case "dimensions":
            if (Zo(l) && (typeof r.dimensions < "u" && (l.dimensions = r.dimensions), typeof r.updateStyle < "u" && r.updateStyle && (l.style = {
              ...l.style || {},
              width: `${(n = r.dimensions) == null ? void 0 : n.width}px`,
              height: `${(o = r.dimensions) == null ? void 0 : o.height}px`
            }), typeof r.resizing < "u" && (l.resizing = r.resizing), l.expandParent && l.parentNode)) {
              const u = t[i.indexOf(l.parentNode)];
              u && Zo(u) && (!!u.dimensions.width && !!u.dimensions.height ? gl(l, u) : _t(() => {
                gl(l, u);
              }));
            }
            break;
        }
  return t;
}
function On(e, t) {
  return {
    id: e,
    type: "select",
    selected: t
  };
}
function wc(e) {
  return {
    item: e,
    type: "add"
  };
}
function kc(e) {
  return {
    id: e,
    type: "remove"
  };
}
function Ec(e, t, n, o, s) {
  return {
    id: e,
    source: t,
    target: n,
    sourceHandle: o || null,
    targetHandle: s || null,
    type: "remove"
  };
}
function Ln(e, t = /* @__PURE__ */ new Set(), n = !1) {
  const o = [];
  for (const [s, i] of e) {
    const l = t.has(s);
    !(i.selected === void 0 && !l) && i.selected !== l && (n && (i.selected = l), o.push(On(i.id, l)));
  }
  return o;
}
function Ce(e) {
  const t = /* @__PURE__ */ new Set();
  let n = !1;
  const o = () => t.size > 0;
  e && (n = !0, t.add(e));
  const s = (r) => {
    t.delete(r);
  };
  return {
    on: (r) => {
      e && n && t.delete(e), t.add(r);
      const u = () => {
        s(r), e && n && t.add(e);
      };
      return Ri(u), {
        off: u
      };
    },
    off: s,
    trigger: (r) => Promise.all(Array.from(t).map((u) => u(r))),
    hasListeners: o,
    fns: t
  };
}
function Cc(e, t, n) {
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
function FE(e, t, n, o, s) {
  var i, l;
  const r = [];
  for (const u of e)
    (u.selected || u.id === s) && (!u.parentNode || !_p(u, o)) && (u.draggable || t && typeof u.draggable > "u") && r.push(
      lo({
        id: u.id,
        position: u.position || { x: 0, y: 0 },
        distance: {
          x: n.x - ((i = u.computedPosition) == null ? void 0 : i.x) || 0,
          y: n.y - ((l = u.computedPosition) == null ? void 0 : l.y) || 0
        },
        from: u.computedPosition,
        extent: u.extent,
        parentNode: u.parentNode,
        dimensions: u.dimensions,
        expandParent: u.expandParent
      })
    );
  return r;
}
function ml({
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
function kp(e) {
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
function BE(e, t, n) {
  const [o, s, i, l] = typeof e != "string" ? kp(e.padding) : [0, 0, 0, 0];
  return n && typeof n.computedPosition.x < "u" && typeof n.computedPosition.y < "u" && typeof n.dimensions.width < "u" && typeof n.dimensions.height < "u" ? [
    [n.computedPosition.x + l, n.computedPosition.y + o],
    [
      n.computedPosition.x + n.dimensions.width - s,
      n.computedPosition.y + n.dimensions.height - i
    ]
  ] : !1;
}
function HE(e, t, n, o) {
  let s = e.extent || n;
  if ((s === "parent" || !Array.isArray(s) && (s == null ? void 0 : s.range) === "parent") && !e.expandParent)
    if (e.parentNode && o && e.dimensions.width && e.dimensions.height) {
      const i = BE(s, e, o);
      i && (s = i);
    } else
      t(new wt(vt.NODE_EXTENT_INVALID, e.id)), s = n;
  else if (Array.isArray(s)) {
    const i = (o == null ? void 0 : o.computedPosition.x) || 0, l = (o == null ? void 0 : o.computedPosition.y) || 0;
    s = [
      [s[0][0] + i, s[0][1] + l],
      [s[1][0] + i, s[1][1] + l]
    ];
  } else if (s !== "parent" && (s != null && s.range) && Array.isArray(s.range)) {
    const [i, l, r, u] = kp(s.padding), c = (o == null ? void 0 : o.computedPosition.x) || 0, d = (o == null ? void 0 : o.computedPosition.y) || 0;
    s = [
      [s.range[0][0] + c + u, s.range[0][1] + d + i],
      [s.range[1][0] + c - l, s.range[1][1] + d - r]
    ];
  }
  return s === "parent" ? [
    [Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY],
    [Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY]
  ] : s;
}
function UE({ width: e, height: t }, n) {
  return [n[0], [n[1][0] - (e || 0), n[1][1] - (t || 0)]];
}
function Hr(e, t, n, o, s) {
  const i = UE(e.dimensions, HE(e, n, o, s)), l = dp(t, i);
  return {
    position: {
      x: l.x - ((s == null ? void 0 : s.computedPosition.x) || 0),
      y: l.y - ((s == null ? void 0 : s.computedPosition.y) || 0)
    },
    computedPosition: l
  };
}
function yi(e, t, n = $e.Left) {
  const o = ((t == null ? void 0 : t.x) ?? 0) + e.computedPosition.x, s = ((t == null ? void 0 : t.y) ?? 0) + e.computedPosition.y, { width: i, height: l } = t ?? qE(e);
  switch ((t == null ? void 0 : t.position) ?? n) {
    case $e.Top:
      return {
        x: o + i / 2,
        y: s
      };
    case $e.Right:
      return {
        x: o + i,
        y: s + l / 2
      };
    case $e.Bottom:
      return {
        x: o + i / 2,
        y: s + l
      };
    case $e.Left:
      return {
        x: o,
        y: s + l / 2
      };
  }
}
function xc(e = [], t) {
  return e.length && (t ? e.find((n) => n.id === t) : e[0]) || null;
}
function jE({
  sourcePos: e,
  targetPos: t,
  sourceWidth: n,
  sourceHeight: o,
  targetWidth: s,
  targetHeight: i,
  width: l,
  height: r,
  viewport: u
}) {
  const c = {
    x: Math.min(e.x, t.x),
    y: Math.min(e.y, t.y),
    x2: Math.max(e.x + n, t.x + s),
    y2: Math.max(e.y + o, t.y + i)
  };
  c.x === c.x2 && (c.x2 += 1), c.y === c.y2 && (c.y2 += 1);
  const d = gp({
    x: (0 - u.x) / u.zoom,
    y: (0 - u.y) / u.zoom,
    width: l / u.zoom,
    height: r / u.zoom
  }), f = Math.max(0, Math.min(d.x2, c.x2) - Math.max(d.x, c.x)), p = Math.max(0, Math.min(d.y2, c.y2) - Math.max(d.y, c.y));
  return Math.ceil(f * p) > 0;
}
function GE(e, t, n = !1) {
  const o = typeof e.zIndex == "number";
  let s = o ? e.zIndex : 0;
  const i = t(e.source), l = t(e.target);
  return !i || !l ? 0 : (n && (s = o ? e.zIndex : Math.max(i.computedPosition.z || 0, l.computedPosition.z || 0)), s);
}
var vt = /* @__PURE__ */ ((e) => (e.MISSING_STYLES = "MISSING_STYLES", e.MISSING_VIEWPORT_DIMENSIONS = "MISSING_VIEWPORT_DIMENSIONS", e.NODE_INVALID = "NODE_INVALID", e.NODE_NOT_FOUND = "NODE_NOT_FOUND", e.NODE_MISSING_PARENT = "NODE_MISSING_PARENT", e.NODE_TYPE_MISSING = "NODE_TYPE_MISSING", e.NODE_EXTENT_INVALID = "NODE_EXTENT_INVALID", e.EDGE_INVALID = "EDGE_INVALID", e.EDGE_NOT_FOUND = "EDGE_NOT_FOUND", e.EDGE_SOURCE_MISSING = "EDGE_SOURCE_MISSING", e.EDGE_TARGET_MISSING = "EDGE_TARGET_MISSING", e.EDGE_TYPE_MISSING = "EDGE_TYPE_MISSING", e.EDGE_SOURCE_TARGET_SAME = "EDGE_SOURCE_TARGET_SAME", e.EDGE_SOURCE_TARGET_MISSING = "EDGE_SOURCE_TARGET_MISSING", e.EDGE_ORPHANED = "EDGE_ORPHANED", e.USEVUEFLOW_OPTIONS = "USEVUEFLOW_OPTIONS", e))(vt || {});
const Sc = {
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
class wt extends Error {
  constructor(t, ...n) {
    var o;
    super((o = Sc[t]) == null ? void 0 : o.call(Sc, ...n)), this.name = "VueFlowError", this.code = t, this.args = n;
  }
}
function Ur(e) {
  return "clientX" in e;
}
function Ep(e) {
  return "sourceEvent" in e;
}
function In(e, t) {
  var n, o;
  const s = Ur(e), i = s ? e.clientX : (n = e.touches) == null ? void 0 : n[0].clientX, l = s ? e.clientY : (o = e.touches) == null ? void 0 : o[0].clientY;
  return {
    x: i - ((t == null ? void 0 : t.left) ?? 0),
    y: l - ((t == null ? void 0 : t.top) ?? 0)
  };
}
const bi = () => {
  var e;
  return typeof navigator < "u" && ((e = navigator == null ? void 0 : navigator.userAgent) == null ? void 0 : e.indexOf("Mac")) >= 0;
};
function qE(e) {
  var t, n;
  return {
    width: ((t = e.dimensions) == null ? void 0 : t.width) ?? e.width ?? 0,
    height: ((n = e.dimensions) == null ? void 0 : n.height) ?? e.height ?? 0
  };
}
function Hi(e, t = [1, 1]) {
  return {
    x: t[0] * Math.round(e.x / t[0]),
    y: t[1] * Math.round(e.y / t[1])
  };
}
function Cp() {
  return {
    handleDomNode: null,
    isValid: !1,
    connection: { source: "", target: "", sourceHandle: null, targetHandle: null },
    endHandle: null
  };
}
function yl(e) {
  e == null || e.classList.remove("valid", "connecting", "vue-flow__handle-valid", "vue-flow__handle-connecting");
}
function $c(e, t, n, o) {
  const s = [];
  for (const i of t[n] || [])
    if (`${e.id}-${i.id}-${n}` !== o) {
      const { x: l, y: r } = yi(e, i);
      s.push({
        id: i.id || null,
        type: n,
        nodeId: e.id,
        x: l,
        y: r
      });
    }
  return s;
}
function YE(e, t, n, o, s, i) {
  const { x: l, y: r } = In(e), c = t.elementsFromPoint(l, r).find((b) => b.classList.contains("vue-flow__handle"));
  if (c) {
    const b = c.getAttribute("data-nodeid");
    if (b) {
      const C = jr(void 0, c), M = c.getAttribute("data-handleid"), P = i({ nodeId: b, id: M, type: C });
      if (P) {
        const L = s.find((E) => E.nodeId === b && E.type === C && E.id === M);
        return {
          handle: {
            id: M,
            type: C,
            nodeId: b,
            x: (L == null ? void 0 : L.x) || n.x,
            y: (L == null ? void 0 : L.y) || n.y
          },
          validHandleResult: P
        };
      }
    }
  }
  let d = [], f = Number.POSITIVE_INFINITY;
  for (const b of s) {
    const C = Math.sqrt((b.x - n.x) ** 2 + (b.y - n.y) ** 2);
    if (C <= o) {
      const M = i(b);
      C <= f && (C < f ? d = [{ handle: b, validHandleResult: M }] : C === f && d.push({
        handle: b,
        validHandleResult: M
      }), f = C);
    }
  }
  if (!d.length)
    return { handle: null, validHandleResult: Cp() };
  if (d.length === 1)
    return d[0];
  const p = d.some(({ validHandleResult: b }) => b.isValid), h = d.some(({ handle: b }) => b.type === "target");
  return d.find(
    ({ handle: b, validHandleResult: C }) => h ? b.type === "target" : p ? C.isValid : !0
  ) || d[0];
}
function Ic(e, t, n, o, s, i, l, r, u, c, d) {
  const f = i === "target", p = r.querySelector(`.vue-flow__handle[data-id="${t == null ? void 0 : t.nodeId}-${t == null ? void 0 : t.id}-${t == null ? void 0 : t.type}"]`), { x: h, y: b } = In(e), C = r.elementFromPoint(h, b), M = C != null && C.classList.contains("vue-flow__handle") ? C : p, P = Cp();
  if (M) {
    P.handleDomNode = M;
    const L = jr(void 0, M), E = M.getAttribute("data-nodeid"), x = M.getAttribute("data-handleid"), z = M.classList.contains("connectable"), Y = M.classList.contains("connectableend"), Z = {
      source: f ? E : o,
      sourceHandle: f ? x : s,
      target: f ? o : E,
      targetHandle: f ? s : x
    };
    P.connection = Z, z && Y && (n === vo.Strict ? f && L === "source" || !f && L === "target" : E !== o || x !== s) && (P.isValid = l(Z, {
      edges: u,
      nodes: c,
      sourceNode: d(Z.source),
      targetNode: d(Z.target)
    }), P.endHandle = {
      nodeId: E,
      handleId: x,
      type: L,
      position: P.isValid ? M.getAttribute("data-handlepos") : null
    });
  }
  return P;
}
function XE({ nodes: e, nodeId: t, handleId: n, handleType: o }) {
  const s = [];
  for (let i = 0; i < e.length; i++) {
    const l = e[i], { handleBounds: r } = l;
    let u = [], c = [];
    r && (u = $c(l, r, "source", `${t}-${n}-${o}`), c = $c(l, r, "target", `${t}-${n}-${o}`)), s.push(...u, ...c);
  }
  return s;
}
function jr(e, t) {
  return e || (t != null && t.classList.contains("target") ? "target" : t != null && t.classList.contains("source") ? "source" : null);
}
function KE(e, t) {
  let n = null;
  return t ? n = "valid" : e && !t && (n = "invalid"), n;
}
const WE = ["production", "prod"];
function Ui(e, ...t) {
  xp() && console.warn(`[Vue Flow]: ${e}`, ...t);
}
function xp() {
  return !WE.includes("production");
}
function Nc(e, t, n, o) {
  const s = t.querySelectorAll(`.vue-flow__handle${e}`);
  return Array.from(s).map((l) => {
    const r = l.getBoundingClientRect();
    return {
      id: l.getAttribute("data-handleid"),
      position: l.getAttribute("data-handlepos"),
      x: (r.left - n.left) / o,
      y: (r.top - n.top) / o,
      ...Bi(l)
    };
  });
}
function ir(e, t, n, o, s, i = !1, l) {
  s.value = !1, e.selected ? (i || e.selected && t) && (o([e]), _t(() => {
    l.blur();
  })) : n([e]);
}
function pt(e) {
  return typeof U(e) < "u";
}
function ZE(e, t, n, o) {
  if (!e || !e.source || !e.target)
    return n(new wt(vt.EDGE_INVALID, (e == null ? void 0 : e.id) ?? "[ID UNKNOWN]")), !1;
  let s;
  return Yn(e) ? s = e : s = {
    ...e,
    id: hp(e)
  }, s = fp(s, void 0, o), RE(s, t) ? !1 : s;
}
function JE(e, t, n, o, s) {
  if (!t.source || !t.target)
    return s(new wt(vt.EDGE_INVALID, e.id)), !1;
  if (!n)
    return s(new wt(vt.EDGE_NOT_FOUND, e.id)), !1;
  const { id: i, ...l } = e;
  return {
    ...l,
    id: o ? hp(t) : i,
    source: t.source,
    target: t.target,
    sourceHandle: t.sourceHandle,
    targetHandle: t.targetHandle
  };
}
function Tc(e, t, n) {
  const o = {}, s = [];
  for (let i = 0; i < e.length; ++i) {
    const l = e[i];
    if (!uo(l)) {
      n(
        new wt(vt.NODE_INVALID, l == null ? void 0 : l.id) || `[ID UNKNOWN|INDEX ${i}]`
      );
      continue;
    }
    const r = OE(l, t(l.id), l.parentNode);
    l.parentNode && (o[l.parentNode] = !0), s[i] = r;
  }
  for (const i of s) {
    const l = t(i.parentNode) || s.find((r) => r.id === i.parentNode);
    i.parentNode && !l && n(new wt(vt.NODE_MISSING_PARENT, i.id, i.parentNode)), (i.parentNode || o[i.id]) && (o[i.id] && (i.isParent = !0), l && (l.isParent = !0));
  }
  return s;
}
function bl(e, t) {
  e.clear();
  for (const n of t) {
    const { id: o, source: s, target: i, sourceHandle: l = null, targetHandle: r = null } = n, u = `${s}-source-${l}`, c = `${i}-target-${r}`, d = e.get(u) || /* @__PURE__ */ new Map(), f = e.get(c) || /* @__PURE__ */ new Map(), p = lo({ edgeId: o, source: s, target: i, sourceHandle: l, targetHandle: r });
    e.set(u, d.set(`${i}-${r}`, p)), e.set(c, f.set(`${s}-${l}`, p));
  }
}
function _l(e, t, n, o, s, i, l, r) {
  const u = [];
  for (const c of e) {
    const d = Yn(c) ? c : ZE(c, r, s, i);
    if (!d)
      continue;
    const f = n(d.source), p = n(d.target);
    if (!f || !p) {
      s(new wt(vt.EDGE_SOURCE_TARGET_MISSING, d.id, d.source, d.target));
      continue;
    }
    if (!f) {
      s(new wt(vt.EDGE_SOURCE_MISSING, d.id, d.source));
      continue;
    }
    if (!p) {
      s(new wt(vt.EDGE_TARGET_MISSING, d.id, d.target));
      continue;
    }
    if (t && !t(d, {
      edges: r,
      nodes: l,
      sourceNode: f,
      targetNode: p
    })) {
      s(new wt(vt.EDGE_INVALID, d.id));
      continue;
    }
    const h = o(d.id);
    u.push({
      ...fp(d, h, i),
      sourceNode: f,
      targetNode: p
    });
  }
  return u;
}
const Mc = Symbol("vueFlow"), Sp = Symbol("nodeId"), $p = Symbol("nodeRef"), QE = Symbol("edgeId"), eC = Symbol("edgeRef"), ji = Symbol("slots");
function Ip(e) {
  const {
    vueFlowRef: t,
    snapToGrid: n,
    snapGrid: o,
    noDragClassName: s,
    nodes: i,
    nodeExtent: l,
    nodeDragThreshold: r,
    viewport: u,
    autoPanOnNodeDrag: c,
    autoPanSpeed: d,
    nodesDraggable: f,
    panBy: p,
    findNode: h,
    multiSelectionActive: b,
    nodesSelectionActive: C,
    selectNodesOnDrag: M,
    removeSelectedElements: P,
    addSelectedNodes: L,
    updateNodePositions: E,
    emits: x
  } = ot(), { onStart: z, onDrag: Y, onStop: Z, onClick: H, el: T, disabled: X, id: q, selectable: V, dragHandle: R } = e, k = te(!1);
  let D = [], O, B = null, G = { x: void 0, y: void 0 }, ie = { x: 0, y: 0 }, de = null, ve = !1, re = 0, ye = !1;
  const pe = oC(), ce = ({ x: ke, y: $ }) => {
    G = { x: ke, y: $ };
    let A = !1;
    if (D = D.map((m) => {
      const y = { x: ke - m.distance.x, y: $ - m.distance.y }, { computedPosition: w } = Hr(
        m,
        n.value ? Hi(y, o.value) : y,
        x.error,
        l.value,
        m.parentNode ? h(m.parentNode) : void 0
      );
      return A = A || m.position.x !== w.x || m.position.y !== w.y, m.position = w, m;
    }), !!A && (E(D, !0, !0), k.value = !0, de)) {
      const [m, y] = ml({
        id: q,
        dragItems: D,
        findNode: h
      });
      Y({ event: de, node: m, nodes: y });
    }
  }, Ie = () => {
    if (!B)
      return;
    const [ke, $] = wp(ie, B, d.value);
    if (ke !== 0 || $ !== 0) {
      const A = {
        x: (G.x ?? 0) - ke / u.value.zoom,
        y: (G.y ?? 0) - $ / u.value.zoom
      };
      p({ x: ke, y: $ }) && ce(A);
    }
    re = requestAnimationFrame(Ie);
  }, Me = (ke, $) => {
    ve = !0;
    const A = h(q);
    !M.value && !b.value && A && (A.selected || P()), A && Ue(V) && M.value && ir(
      A,
      b.value,
      L,
      P,
      C,
      !1,
      $
    );
    const m = pe(ke.sourceEvent);
    if (G = m, D = FE(i.value, f.value, m, h, q), D.length) {
      const [y, w] = ml({
        id: q,
        dragItems: D,
        findNode: h
      });
      z({ event: ke.sourceEvent, node: y, nodes: w });
    }
  }, oe = (ke, $) => {
    var A;
    ke.sourceEvent.type === "touchmove" && ke.sourceEvent.touches.length > 1 || (r.value === 0 && Me(ke, $), G = pe(ke.sourceEvent), B = ((A = t.value) == null ? void 0 : A.getBoundingClientRect()) || null, ie = In(ke.sourceEvent, B));
  }, Se = (ke, $) => {
    const A = pe(ke.sourceEvent);
    if (!ye && ve && c.value && (ye = !0, Ie()), !ve) {
      const m = A.xSnapped - (G.x ?? 0), y = A.ySnapped - (G.y ?? 0);
      Math.sqrt(m * m + y * y) > r.value && Me(ke, $);
    }
    (G.x !== A.xSnapped || G.y !== A.ySnapped) && D.length && ve && (de = ke.sourceEvent, ie = In(ke.sourceEvent, B), ce(A));
  }, Ee = (ke) => {
    if (!Ep(ke) && !ve && !k.value && !b.value) {
      const $ = ke, A = pe($), m = A.xSnapped - (G.x ?? 0), y = A.ySnapped - (G.y ?? 0), w = Math.sqrt(m * m + y * y);
      w !== 0 && w <= r.value && (H == null || H($));
      return;
    }
    if (k.value = !1, ye = !1, ve = !1, G = { x: void 0, y: void 0 }, cancelAnimationFrame(re), D.length) {
      E(D, !1, !1);
      const [$, A] = ml({
        id: q,
        dragItems: D,
        findNode: h
      });
      Z({ event: ke.sourceEvent, node: $, nodes: A });
    }
  };
  return ze([() => Ue(X), T], ([ke, $], A, m) => {
    if ($) {
      const y = Zt($);
      ke || (O = Lk().on("start", (w) => oe(w, $)).on("drag", (w) => Se(w, $)).on("end", (w) => Ee(w)).filter((w) => {
        const S = w.target, j = Ue(R);
        return !w.button && (!s.value || !Cc(S, `.${s.value}`, $) && (!j || Cc(S, j, $)));
      }), y.call(O)), m(() => {
        y.on(".drag", null), O && (O.on("start", null), O.on("drag", null), O.on("end", null));
      });
    }
  }), k;
}
function tC() {
  return {
    doubleClick: Ce(),
    click: Ce(),
    mouseEnter: Ce(),
    mouseMove: Ce(),
    mouseLeave: Ce(),
    contextMenu: Ce(),
    updateStart: Ce(),
    update: Ce(),
    updateEnd: Ce()
  };
}
function nC(e, t) {
  const n = tC();
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
function oC() {
  const { viewport: e, snapGrid: t, snapToGrid: n } = ot();
  return (o) => {
    const s = Ep(o) ? o.sourceEvent : o, { x: i, y: l } = In(s), r = ys({ x: i, y: l }, e.value), { x: u, y: c } = n.value ? Hi(r, t.value) : r;
    return {
      xSnapped: u,
      ySnapped: c,
      ...r
    };
  };
}
function Bs() {
  return !0;
}
function Np({
  handleId: e,
  nodeId: t,
  type: n,
  isValidConnection: o,
  edgeUpdaterType: s,
  onEdgeUpdate: i,
  onEdgeUpdateEnd: l
}) {
  const {
    vueFlowRef: r,
    connectionMode: u,
    connectionRadius: c,
    connectOnClick: d,
    connectionClickStartHandle: f,
    nodesConnectable: p,
    autoPanOnConnect: h,
    autoPanSpeed: b,
    findNode: C,
    panBy: M,
    startConnection: P,
    updateConnection: L,
    endConnection: E,
    emits: x,
    viewport: z,
    edges: Y,
    nodes: Z,
    isValidConnection: H
  } = ot();
  let T = null, X = !1, q = null, V = null;
  function R(D) {
    var O;
    const B = Ue(n) === "target", G = Ur(D), ie = mc(D.target);
    if (G && D.button === 0 || !G) {
      let de = function(w) {
        $ = In(w, Ee);
        const { handle: S, validHandleResult: j } = YE(
          w,
          ie,
          ys($, z.value, !1, [1, 1]),
          c.value,
          m,
          (K) => Ic(
            w,
            K,
            u.value,
            Ue(t),
            Ue(e),
            B ? "target" : "source",
            ye,
            ie,
            Y.value,
            Z.value,
            C
          )
        );
        if (pe = S, A || (y(), A = !0), T = j.connection, X = j.isValid, q = j.handleDomNode, !(X && pe && (V != null && V.endHandle) && j.endHandle && V.endHandle.type === j.endHandle.type && V.endHandle.nodeId === j.endHandle.nodeId && V.endHandle.handleId === j.endHandle.handleId)) {
          if (L(
            pe && X ? vp(
              {
                x: pe.x,
                y: pe.y
              },
              z.value
            ) : $,
            j.endHandle,
            KE(!!pe, X)
          ), V = j, !pe && !X && !q)
            return yl(ke);
          T && T.source !== T.target && q && (yl(ke), ke = q, q.classList.add("connecting", "vue-flow__handle-connecting"), q.classList.toggle("valid", X), q.classList.toggle("vue-flow__handle-valid", X));
        }
      }, ve = function(w) {
        (pe || q) && T && X && (i ? i(w, T) : x.connect(T)), x.connectEnd(w), s && (l == null || l(w)), yl(ke), cancelAnimationFrame(ce), E(w), A = !1, X = !1, T = null, q = null, ie.removeEventListener("mousemove", de), ie.removeEventListener("mouseup", ve), ie.removeEventListener("touchmove", de), ie.removeEventListener("touchend", ve);
      };
      const re = C(Ue(t));
      let ye = Ue(o) || H.value || Bs;
      !ye && re && (ye = (B ? re.isValidSourcePos : re.isValidTargetPos) || Bs);
      let pe, ce = 0;
      const { x: Ie, y: Me } = In(D), oe = ie == null ? void 0 : ie.elementFromPoint(Ie, Me), Se = jr(Ue(s), oe), Ee = (O = r.value) == null ? void 0 : O.getBoundingClientRect();
      if (!Ee || !Se)
        return;
      let ke, $ = In(D, Ee), A = !1;
      const m = XE({
        nodes: Z.value,
        nodeId: Ue(t),
        handleId: Ue(e),
        handleType: Se
      }), y = () => {
        if (!h.value)
          return;
        const [w, S] = wp($, Ee, b.value);
        M({ x: w, y: S }), ce = requestAnimationFrame(y);
      };
      P(
        {
          nodeId: Ue(t),
          handleId: Ue(e),
          type: Se,
          position: (oe == null ? void 0 : oe.getAttribute("data-handlepos")) || $e.Top
        },
        {
          x: Ie - Ee.left,
          y: Me - Ee.top
        }
      ), x.connectStart({ event: D, nodeId: Ue(t), handleId: Ue(e), handleType: Se }), ie.addEventListener("mousemove", de), ie.addEventListener("mouseup", ve), ie.addEventListener("touchmove", de), ie.addEventListener("touchend", ve);
    }
  }
  function k(D) {
    if (!d.value)
      return;
    const O = Ue(n) === "target";
    if (!f.value)
      x.clickConnectStart({ event: D, nodeId: Ue(t), handleId: Ue(e) }), P({ nodeId: Ue(t), type: Ue(n), handleId: Ue(e) }, void 0, !0);
    else {
      let B = Ue(o) || H.value || Bs;
      const G = C(Ue(t));
      if (!B && G && (B = (O ? G.isValidSourcePos : G.isValidTargetPos) || Bs), G && (typeof G.connectable > "u" ? p.value : G.connectable) === !1)
        return;
      const ie = mc(D.target), { connection: de, isValid: ve } = Ic(
        D,
        {
          nodeId: Ue(t),
          id: Ue(e),
          type: Ue(n)
        },
        u.value,
        f.value.nodeId,
        f.value.handleId || null,
        f.value.type,
        B,
        ie,
        Y.value,
        Z.value,
        C
      ), re = de.source === de.target;
      ve && !re && x.connect(de), x.clickConnectEnd(D), E(D, !0);
    }
  }
  return {
    handlePointerDown: R,
    handleClick: k
  };
}
function sC() {
  return dn(Sp, "");
}
function Tp(e) {
  const t = e ?? sC() ?? "", n = dn($p, te(null)), { findNode: o, edges: s, emits: i } = ot(), l = o(t);
  return l || i.error(new wt(vt.NODE_NOT_FOUND, t)), {
    id: t,
    nodeEl: n,
    node: l,
    parentNode: ae(() => o(l.parentNode)),
    connectedEdges: ae(() => bp([l], s.value))
  };
}
function iC() {
  return {
    doubleClick: Ce(),
    click: Ce(),
    mouseEnter: Ce(),
    mouseMove: Ce(),
    mouseLeave: Ce(),
    contextMenu: Ce(),
    dragStart: Ce(),
    drag: Ce(),
    dragStop: Ce()
  };
}
function lC(e, t) {
  const n = iC();
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
function Mp() {
  const { getSelectedNodes: e, nodeExtent: t, updateNodePositions: n, findNode: o, snapGrid: s, snapToGrid: i, nodesDraggable: l, emits: r } = ot();
  return (u, c = !1) => {
    const d = i.value ? s.value[0] : 5, f = i.value ? s.value[1] : 5, p = c ? 4 : 1, h = u.x * d * p, b = u.y * f * p, C = [];
    for (const M of e.value)
      if (M.draggable || l && typeof M.draggable > "u") {
        const P = { x: M.computedPosition.x + h, y: M.computedPosition.y + b }, { computedPosition: L } = Hr(
          M,
          P,
          r.error,
          t.value,
          M.parentNode ? o(M.parentNode) : void 0
        );
        C.push({
          id: M.id,
          position: L,
          from: M.position,
          distance: { x: u.x, y: u.y },
          dimensions: M.dimensions
        });
      }
    n(C, !0, !1);
  };
}
const wl = 0.1;
function Pn() {
  return Ui("Viewport not initialized yet."), Promise.resolve(!1);
}
const rC = {
  zoomIn: Pn,
  zoomOut: Pn,
  zoomTo: Pn,
  fitView: Pn,
  setCenter: Pn,
  fitBounds: Pn,
  project: (e) => e,
  screenToFlowCoordinate: (e) => e,
  flowToScreenCoordinate: (e) => e,
  setViewport: Pn,
  setTransform: Pn,
  getViewport: () => ({ x: 0, y: 0, zoom: 1 }),
  getTransform: () => ({ x: 0, y: 0, zoom: 1 }),
  viewportInitialized: !1
};
function aC(e) {
  function t(o, s) {
    return new Promise((i) => {
      e.d3Selection && e.d3Zoom ? e.d3Zoom.scaleBy(
        kl(e.d3Selection, s, () => {
          i(!0);
        }),
        o
      ) : i(!1);
    });
  }
  function n(o, s, i, l) {
    return new Promise((r) => {
      const { x: u, y: c } = dp({ x: -o, y: -s }, e.translateExtent), d = Lo.translate(-u, -c).scale(i);
      e.d3Selection && e.d3Zoom ? e.d3Zoom.transform(
        kl(e.d3Selection, l, () => {
          r(!0);
        }),
        d
      ) : r(!1);
    });
  }
  return ae(() => e.d3Zoom && e.d3Selection && e.dimensions.width && e.dimensions.height ? {
    viewportInitialized: !0,
    // todo: allow passing scale as option
    zoomIn: (s) => t(1.2, s == null ? void 0 : s.duration),
    zoomOut: (s) => t(1 / 1.2, s == null ? void 0 : s.duration),
    zoomTo: (s, i) => new Promise((l) => {
      e.d3Selection && e.d3Zoom ? e.d3Zoom.scaleTo(
        kl(e.d3Selection, i == null ? void 0 : i.duration, () => {
          l(!0);
        }),
        s
      ) : l(!1);
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
      padding: wl,
      includeHiddenNodes: !1,
      duration: 0
    }) => {
      var i, l;
      const r = [];
      for (const p of e.nodes)
        p.dimensions.width && p.dimensions.height && ((s == null ? void 0 : s.includeHiddenNodes) || !p.hidden) && (!((i = s.nodes) != null && i.length) || (l = s.nodes) != null && l.length && s.nodes.includes(p.id)) && r.push(p);
      if (!r.length)
        return Promise.resolve(!1);
      const u = mp(r), { x: c, y: d, zoom: f } = yc(
        u,
        e.dimensions.width,
        e.dimensions.height,
        s.minZoom ?? e.minZoom,
        s.maxZoom ?? e.maxZoom,
        s.padding ?? wl,
        s.offset
      );
      return n(c, d, f, s == null ? void 0 : s.duration);
    },
    setCenter: (s, i, l) => {
      const r = typeof (l == null ? void 0 : l.zoom) < "u" ? l.zoom : e.maxZoom, u = e.dimensions.width / 2 - s * r, c = e.dimensions.height / 2 - i * r;
      return n(u, c, r, l == null ? void 0 : l.duration);
    },
    fitBounds: (s, i = { padding: wl }) => {
      const { x: l, y: r, zoom: u } = yc(
        s,
        e.dimensions.width,
        e.dimensions.height,
        e.minZoom,
        e.maxZoom,
        i.padding
      );
      return n(l, r, u, i == null ? void 0 : i.duration);
    },
    project: (s) => ys(s, e.viewport, e.snapToGrid, e.snapGrid),
    screenToFlowCoordinate: (s) => {
      if (e.vueFlowRef) {
        const { x: i, y: l } = e.vueFlowRef.getBoundingClientRect(), r = {
          x: s.x - i,
          y: s.y - l
        };
        return ys(r, e.viewport, e.snapToGrid, e.snapGrid);
      }
      return { x: 0, y: 0 };
    },
    flowToScreenCoordinate: (s) => {
      if (e.vueFlowRef) {
        const { x: i, y: l } = e.vueFlowRef.getBoundingClientRect(), r = {
          x: s.x + i,
          y: s.y + l
        };
        return vp(r, e.viewport);
      }
      return { x: 0, y: 0 };
    }
  } : rC);
}
function kl(e, t = 0, n) {
  return e.transition().duration(t).on("end", n);
}
function uC(e, t, n) {
  const o = Kc(!0);
  return o.run(() => {
    const s = () => {
      o.run(() => {
        let C, M, P = !!(n.nodes.value.length || n.edges.value.length);
        C = _o([e.modelValue, () => {
          var L, E;
          return (E = (L = e.modelValue) == null ? void 0 : L.value) == null ? void 0 : E.length;
        }], ([L]) => {
          L && Array.isArray(L) && (M == null || M.pause(), n.setElements(L), !M && !P && L.length ? P = !0 : M == null || M.resume());
        }), M = _o(
          [n.nodes, n.edges, () => n.edges.value.length, () => n.nodes.value.length],
          ([L, E]) => {
            var x;
            (x = e.modelValue) != null && x.value && Array.isArray(e.modelValue.value) && (C == null || C.pause(), e.modelValue.value = [...L, ...E], _t(() => {
              C == null || C.resume();
            }));
          },
          { immediate: P }
        ), Gs(() => {
          C == null || C.stop(), M == null || M.stop();
        });
      });
    }, i = () => {
      o.run(() => {
        let C, M, P = !!n.nodes.value.length;
        C = _o([e.nodes, () => {
          var L, E;
          return (E = (L = e.nodes) == null ? void 0 : L.value) == null ? void 0 : E.length;
        }], ([L]) => {
          L && Array.isArray(L) && (M == null || M.pause(), n.setNodes(L), !M && !P && L.length ? P = !0 : M == null || M.resume());
        }), M = _o(
          [n.nodes, () => n.nodes.value.length],
          ([L]) => {
            var E;
            (E = e.nodes) != null && E.value && Array.isArray(e.nodes.value) && (C == null || C.pause(), e.nodes.value = [...L], _t(() => {
              C == null || C.resume();
            }));
          },
          { immediate: P }
        ), Gs(() => {
          C == null || C.stop(), M == null || M.stop();
        });
      });
    }, l = () => {
      o.run(() => {
        let C, M, P = !!n.edges.value.length;
        C = _o([e.edges, () => {
          var L, E;
          return (E = (L = e.edges) == null ? void 0 : L.value) == null ? void 0 : E.length;
        }], ([L]) => {
          L && Array.isArray(L) && (M == null || M.pause(), n.setEdges(L), !M && !P && L.length ? P = !0 : M == null || M.resume());
        }), M = _o(
          [n.edges, () => n.edges.value.length],
          ([L]) => {
            var E;
            (E = e.edges) != null && E.value && Array.isArray(e.edges.value) && (C == null || C.pause(), e.edges.value = [...L], _t(() => {
              C == null || C.resume();
            }));
          },
          { immediate: P }
        ), Gs(() => {
          C == null || C.stop(), M == null || M.stop();
        });
      });
    }, r = () => {
      o.run(() => {
        ze(
          () => t.maxZoom,
          () => {
            t.maxZoom && pt(t.maxZoom) && n.setMaxZoom(t.maxZoom);
          },
          {
            immediate: !0
          }
        );
      });
    }, u = () => {
      o.run(() => {
        ze(
          () => t.minZoom,
          () => {
            t.minZoom && pt(t.minZoom) && n.setMinZoom(t.minZoom);
          },
          { immediate: !0 }
        );
      });
    }, c = () => {
      o.run(() => {
        ze(
          () => t.translateExtent,
          () => {
            t.translateExtent && pt(t.translateExtent) && n.setTranslateExtent(t.translateExtent);
          },
          {
            immediate: !0
          }
        );
      });
    }, d = () => {
      o.run(() => {
        ze(
          () => t.nodeExtent,
          () => {
            t.nodeExtent && pt(t.nodeExtent) && n.setNodeExtent(t.nodeExtent);
          },
          {
            immediate: !0
          }
        );
      });
    }, f = () => {
      o.run(() => {
        ze(
          () => t.applyDefault,
          () => {
            pt(t.applyDefault) && (n.applyDefault.value = t.applyDefault);
          },
          {
            immediate: !0
          }
        );
      });
    }, p = () => {
      o.run(() => {
        const C = async (M) => {
          let P = M;
          typeof t.autoConnect == "function" && (P = await t.autoConnect(M)), P !== !1 && n.addEdges([P]);
        };
        ze(
          () => t.autoConnect,
          () => {
            pt(t.autoConnect) && (n.autoConnect.value = t.autoConnect);
          },
          { immediate: !0 }
        ), ze(
          n.autoConnect,
          (M, P, L) => {
            M ? n.onConnect(C) : n.hooks.value.connect.off(C), L(() => {
              n.hooks.value.connect.off(C);
            });
          },
          { immediate: !0 }
        );
      });
    }, h = () => {
      const C = [
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
      for (const M of Object.keys(t)) {
        const P = M;
        if (!C.includes(P)) {
          const L = tt(() => t[P]), E = n[P];
          at(E) && o.run(() => {
            ze(
              L,
              (x) => {
                pt(x) && (E.value = x);
              },
              { immediate: !0 }
            );
          });
        }
      }
    };
    (() => {
      s(), i(), l(), u(), r(), c(), d(), f(), p(), h();
    })();
  }), () => o.stop();
}
function cC() {
  return {
    edgesChange: Ce(),
    nodesChange: Ce(),
    nodeDoubleClick: Ce(),
    nodeClick: Ce(),
    nodeMouseEnter: Ce(),
    nodeMouseMove: Ce(),
    nodeMouseLeave: Ce(),
    nodeContextMenu: Ce(),
    nodeDragStart: Ce(),
    nodeDrag: Ce(),
    nodeDragStop: Ce(),
    nodesInitialized: Ce(),
    miniMapNodeClick: Ce(),
    miniMapNodeDoubleClick: Ce(),
    miniMapNodeMouseEnter: Ce(),
    miniMapNodeMouseMove: Ce(),
    miniMapNodeMouseLeave: Ce(),
    connect: Ce(),
    connectStart: Ce(),
    connectEnd: Ce(),
    clickConnectStart: Ce(),
    clickConnectEnd: Ce(),
    paneReady: Ce(),
    init: Ce(),
    move: Ce(),
    moveStart: Ce(),
    moveEnd: Ce(),
    selectionDragStart: Ce(),
    selectionDrag: Ce(),
    selectionDragStop: Ce(),
    selectionContextMenu: Ce(),
    selectionStart: Ce(),
    selectionEnd: Ce(),
    viewportChangeStart: Ce(),
    viewportChange: Ce(),
    viewportChangeEnd: Ce(),
    paneScroll: Ce(),
    paneClick: Ce(),
    paneContextMenu: Ce(),
    paneMouseEnter: Ce(),
    paneMouseMove: Ce(),
    paneMouseLeave: Ce(),
    edgeContextMenu: Ce(),
    edgeMouseEnter: Ce(),
    edgeMouseMove: Ce(),
    edgeMouseLeave: Ce(),
    edgeDoubleClick: Ce(),
    edgeClick: Ce(),
    edgeUpdateStart: Ce(),
    edgeUpdate: Ce(),
    edgeUpdateEnd: Ce(),
    updateNodeInternals: Ce(),
    error: Ce((e) => Ui(e.message))
  };
}
function dC(e, t) {
  Ed(() => {
    for (const [n, o] of Object.entries(t.value)) {
      const s = (i) => {
        e(n, i);
      };
      o.fns.add(s), Ri(() => {
        o.off(s);
      });
    }
  });
}
function Pp() {
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
    selectionMode: Br.Full,
    paneDragging: !1,
    preventScrolling: !0,
    zoomOnScroll: !0,
    zoomOnPinch: !0,
    zoomOnDoubleClick: !0,
    panOnScroll: !1,
    panOnScrollSpeed: 0.5,
    panOnScrollMode: is.Free,
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
      type: to.Bezier,
      style: {}
    },
    connectionMode: vo.Loose,
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
    multiSelectionKeyCode: bi() ? "Meta" : "Control",
    zoomActivationKeyCode: bi() ? "Meta" : "Control",
    deleteKeyCode: "Backspace",
    panActivationKeyCode: "Space",
    hooks: cC(),
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
const fC = [
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
function pC(e, t, n) {
  const o = aC(e), s = (m) => {
    const y = m ?? [];
    e.hooks.updateNodeInternals.trigger(y);
  }, i = (m) => DE(m, e.nodes, e.edges), l = (m) => AE(m, e.nodes, e.edges), r = (m) => bp(m, e.edges), u = ({ id: m, type: y, nodeId: w }) => {
    var S;
    return Array.from(((S = e.connectionLookup.get(`${w}-${y}-${m ?? null}`)) == null ? void 0 : S.values()) ?? []);
  }, c = (m) => {
    if (m)
      return t.value.get(m);
  }, d = (m) => {
    if (m)
      return n.value.get(m);
  }, f = (m, y, w) => {
    var S, j;
    const K = [];
    for (const Q of m) {
      const W = {
        id: Q.id,
        type: "position",
        dragging: w,
        from: Q.from
      };
      if (y && (W.position = Q.position, Q.parentNode)) {
        const fe = c(Q.parentNode);
        W.position = {
          x: W.position.x - (((S = fe == null ? void 0 : fe.computedPosition) == null ? void 0 : S.x) ?? 0),
          y: W.position.y - (((j = fe == null ? void 0 : fe.computedPosition) == null ? void 0 : j.y) ?? 0)
        };
      }
      K.push(W);
    }
    K != null && K.length && e.hooks.nodesChange.trigger(K);
  }, p = (m) => {
    if (!e.vueFlowRef)
      return;
    const y = e.vueFlowRef.querySelector(".vue-flow__transformationpane");
    if (!y)
      return;
    const w = window.getComputedStyle(y), { m22: S } = new window.DOMMatrixReadOnly(w.transform), j = [];
    for (let K = 0; K < m.length; ++K) {
      const Q = m[K], W = c(Q.id);
      if (W) {
        const fe = Bi(Q.nodeElement);
        if (!!(fe.width && fe.height && (W.dimensions.width !== fe.width || W.dimensions.height !== fe.height || Q.forceUpdate))) {
          const ge = Q.nodeElement.getBoundingClientRect();
          W.dimensions = fe, W.handleBounds.source = Nc(".source", Q.nodeElement, ge, S), W.handleBounds.target = Nc(".target", Q.nodeElement, ge, S), j.push({
            id: W.id,
            type: "dimensions",
            dimensions: fe
          });
        }
      }
    }
    !e.fitViewOnInitDone && e.fitViewOnInit && o.value.fitView().then(() => {
      e.fitViewOnInitDone = !0;
    }), j.length && e.hooks.nodesChange.trigger(j);
  }, h = (m, y) => {
    const w = /* @__PURE__ */ new Set(), S = /* @__PURE__ */ new Set();
    for (const Q of m)
      uo(Q) ? w.add(Q.id) : Yn(Q) && S.add(Q.id);
    const j = Ln(t.value, w, !0), K = Ln(n.value, S);
    if (e.multiSelectionActive) {
      for (const Q of w)
        j.push(On(Q, y));
      for (const Q of S)
        K.push(On(Q, y));
    }
    j.length && e.hooks.nodesChange.trigger(j), K.length && e.hooks.edgesChange.trigger(K);
  }, b = (m) => {
    if (e.multiSelectionActive) {
      const y = m.map((w) => On(w.id, !0));
      e.hooks.nodesChange.trigger(y);
      return;
    }
    e.hooks.nodesChange.trigger(Ln(t.value, new Set(m.map((y) => y.id)), !0)), e.hooks.edgesChange.trigger(Ln(n.value));
  }, C = (m) => {
    if (e.multiSelectionActive) {
      const y = m.map((w) => On(w.id, !0));
      e.hooks.edgesChange.trigger(y);
      return;
    }
    e.hooks.edgesChange.trigger(Ln(n.value, new Set(m.map((y) => y.id)))), e.hooks.nodesChange.trigger(Ln(t.value, /* @__PURE__ */ new Set(), !0));
  }, M = (m) => {
    h(m, !0);
  }, P = (m) => {
    const w = (m || e.nodes).map((S) => (S.selected = !1, On(S.id, !1)));
    e.hooks.nodesChange.trigger(w);
  }, L = (m) => {
    const w = (m || e.edges).map((S) => (S.selected = !1, On(S.id, !1)));
    e.hooks.edgesChange.trigger(w);
  }, E = (m) => {
    if (!m || !m.length)
      return h([], !1);
    const y = m.reduce(
      (w, S) => {
        const j = On(S.id, !1);
        return uo(S) ? w.nodes.push(j) : w.edges.push(j), w;
      },
      { nodes: [], edges: [] }
    );
    y.nodes.length && e.hooks.nodesChange.trigger(y.nodes), y.edges.length && e.hooks.edgesChange.trigger(y.edges);
  }, x = (m) => {
    var y;
    (y = e.d3Zoom) == null || y.scaleExtent([m, e.maxZoom]), e.minZoom = m;
  }, z = (m) => {
    var y;
    (y = e.d3Zoom) == null || y.scaleExtent([e.minZoom, m]), e.maxZoom = m;
  }, Y = (m) => {
    var y;
    (y = e.d3Zoom) == null || y.translateExtent(m), e.translateExtent = m;
  }, Z = (m) => {
    e.nodeExtent = m, s();
  }, H = (m) => {
    var y;
    (y = e.d3Zoom) == null || y.clickDistance(m);
  }, T = (m) => {
    e.nodesDraggable = m, e.nodesConnectable = m, e.elementsSelectable = m;
  }, X = (m) => {
    const y = m instanceof Function ? m(e.nodes) : m;
    !e.initialized && !y.length || (e.nodes = Tc(y, c, e.hooks.error.trigger));
  }, q = (m) => {
    const y = m instanceof Function ? m(e.edges) : m;
    if (!e.initialized && !y.length)
      return;
    const w = _l(
      y,
      e.isValidConnection,
      c,
      d,
      e.hooks.error.trigger,
      e.defaultEdgeOptions,
      e.nodes,
      e.edges
    );
    bl(e.connectionLookup, w), e.edges = w;
  }, V = (m) => {
    const y = m instanceof Function ? m([...e.nodes, ...e.edges]) : m;
    !e.initialized && !y.length || (X(y.filter(uo)), q(y.filter(Yn)));
  }, R = (m) => {
    let y = m instanceof Function ? m(e.nodes) : m;
    y = Array.isArray(y) ? y : [y];
    const w = Tc(y, c, e.hooks.error.trigger), S = [];
    for (const j of w)
      S.push(wc(j));
    S.length && e.hooks.nodesChange.trigger(S);
  }, k = (m) => {
    let y = m instanceof Function ? m(e.edges) : m;
    y = Array.isArray(y) ? y : [y];
    const w = _l(
      y,
      e.isValidConnection,
      c,
      d,
      e.hooks.error.trigger,
      e.defaultEdgeOptions,
      e.nodes,
      e.edges
    ), S = [];
    for (const j of w)
      S.push(wc(j));
    S.length && e.hooks.edgesChange.trigger(S);
  }, D = (m, y = !0, w = !1) => {
    const S = m instanceof Function ? m(e.nodes) : m, j = Array.isArray(S) ? S : [S], K = [], Q = [];
    function W(ue) {
      const ge = r(ue);
      for (const he of ge)
        (!pt(he.deletable) || he.deletable) && Q.push(Ec(he.id, he.source, he.target, he.sourceHandle, he.targetHandle));
    }
    function fe(ue) {
      const ge = [];
      for (const he of e.nodes)
        he.parentNode === ue && ge.push(he);
      if (ge.length) {
        for (const he of ge)
          K.push(kc(he.id));
        y && W(ge);
        for (const he of ge)
          fe(he.id);
      }
    }
    for (const ue of j) {
      const ge = typeof ue == "string" ? c(ue) : ue;
      ge && (pt(ge.deletable) && !ge.deletable || (K.push(kc(ge.id)), y && W([ge]), w && fe(ge.id)));
    }
    Q.length && e.hooks.edgesChange.trigger(Q), K.length && e.hooks.nodesChange.trigger(K);
  }, O = (m) => {
    const y = m instanceof Function ? m(e.edges) : m, w = Array.isArray(y) ? y : [y], S = [];
    for (const j of w) {
      const K = typeof j == "string" ? d(j) : j;
      K && (pt(K.deletable) && !K.deletable || S.push(
        Ec(
          typeof j == "string" ? j : j.id,
          K.source,
          K.target,
          K.sourceHandle,
          K.targetHandle
        )
      ));
    }
    e.hooks.edgesChange.trigger(S);
  }, B = (m, y, w = !0) => {
    const S = d(m.id), j = JE(m, y, S, w, e.hooks.error.trigger);
    if (j) {
      const [K] = _l(
        [j],
        e.isValidConnection,
        c,
        d,
        e.hooks.error.trigger,
        e.defaultEdgeOptions,
        e.nodes,
        e.edges
      );
      return e.edges.splice(e.edges.indexOf(S), 1, K), bl(e.connectionLookup, [K]), K;
    }
    return !1;
  }, G = (m, y, w = { replace: !1 }) => {
    const S = d(m);
    if (!S)
      return;
    const j = typeof y == "function" ? y(S) : y;
    S.data = w.replace ? j : { ...S.data, ...j };
  }, ie = (m) => _c(m, e.nodes), de = (m) => {
    const y = _c(m, e.edges);
    return bl(e.connectionLookup, y), y;
  }, ve = (m, y, w = { replace: !1 }) => {
    const S = c(m);
    if (!S)
      return;
    const j = typeof y == "function" ? y(S) : y;
    w.replace ? e.nodes.splice(e.nodes.indexOf(S), 1, j) : Object.assign(S, j);
  }, re = (m, y, w = { replace: !1 }) => {
    const S = c(m);
    if (!S)
      return;
    const j = typeof y == "function" ? y(S) : y;
    S.data = w.replace ? j : { ...S.data, ...j };
  }, ye = (m, y, w = !1) => {
    w ? e.connectionClickStartHandle = m : e.connectionStartHandle = m, e.connectionEndHandle = null, e.connectionStatus = null, y && (e.connectionPosition = y);
  }, pe = (m, y = null, w = null) => {
    e.connectionStartHandle && (e.connectionPosition = m, e.connectionEndHandle = y, e.connectionStatus = w);
  }, ce = (m, y) => {
    e.connectionPosition = { x: Number.NaN, y: Number.NaN }, e.connectionEndHandle = null, e.connectionStatus = null, y ? e.connectionClickStartHandle = null : e.connectionStartHandle = null;
  }, Ie = (m) => {
    const y = PE(m), w = y ? null : Zo(m) ? m : c(m.id);
    return !y && !w ? [null, null, y] : [y ? m : or(w), w, y];
  }, Me = (m, y = !0, w = e.nodes) => {
    const [S, j, K] = Ie(m);
    if (!S)
      return [];
    const Q = [];
    for (const W of w || e.nodes) {
      if (!K && (W.id === j.id || !W.computedPosition))
        continue;
      const fe = or(W), ue = sr(fe, S);
      (y && ue > 0 || ue >= Number(S.width) * Number(S.height)) && Q.push(W);
    }
    return Q;
  }, oe = (m, y, w = !0) => {
    const [S] = Ie(m);
    if (!S)
      return !1;
    const j = sr(S, y);
    return w && j > 0 || j >= Number(S.width) * Number(S.height);
  }, Se = (m) => {
    const { viewport: y, dimensions: w, d3Zoom: S, d3Selection: j, translateExtent: K } = e;
    if (!S || !j || !m.x && !m.y)
      return !1;
    const Q = Lo.translate(y.x + m.x, y.y + m.y).scale(y.zoom), W = [
      [0, 0],
      [w.width, w.height]
    ], fe = S.constrain()(Q, W, K), ue = e.viewport.x !== fe.x || e.viewport.y !== fe.y || e.viewport.zoom !== fe.k;
    return S.transform(j, fe), ue;
  }, Ee = (m) => {
    const y = m instanceof Function ? m(e) : m, w = [
      "d3Zoom",
      "d3Selection",
      "d3ZoomHandler",
      "viewportRef",
      "vueFlowRef",
      "dimensions",
      "hooks"
    ];
    pt(y.defaultEdgeOptions) && (e.defaultEdgeOptions = y.defaultEdgeOptions);
    const S = y.modelValue || y.nodes || y.edges ? [] : void 0;
    S && (y.modelValue && S.push(...y.modelValue), y.nodes && S.push(...y.nodes), y.edges && S.push(...y.edges), V(S));
    const j = () => {
      pt(y.maxZoom) && z(y.maxZoom), pt(y.minZoom) && x(y.minZoom), pt(y.translateExtent) && Y(y.translateExtent);
    };
    for (const K of Object.keys(y)) {
      const Q = K, W = y[Q];
      ![...fC, ...w].includes(Q) && pt(W) && (e[Q] = W);
    }
    ql(() => e.d3Zoom).not.toBeNull().then(j), e.initialized || (e.initialized = !0);
  };
  return {
    updateNodePositions: f,
    updateNodeDimensions: p,
    setElements: V,
    setNodes: X,
    setEdges: q,
    addNodes: R,
    addEdges: k,
    removeNodes: D,
    removeEdges: O,
    findNode: c,
    findEdge: d,
    updateEdge: B,
    updateEdgeData: G,
    updateNode: ve,
    updateNodeData: re,
    applyEdgeChanges: de,
    applyNodeChanges: ie,
    addSelectedElements: M,
    addSelectedNodes: b,
    addSelectedEdges: C,
    setMinZoom: x,
    setMaxZoom: z,
    setTranslateExtent: Y,
    setNodeExtent: Z,
    setPaneClickDistance: H,
    removeSelectedElements: E,
    removeSelectedNodes: P,
    removeSelectedEdges: L,
    startConnection: ye,
    updateConnection: pe,
    endConnection: ce,
    setInteractive: T,
    setState: Ee,
    getIntersectingNodes: Me,
    getIncomers: i,
    getOutgoers: l,
    getConnectedEdges: r,
    getHandleConnections: u,
    isNodeIntersecting: oe,
    panBy: Se,
    fitView: (m) => o.value.fitView(m),
    zoomIn: (m) => o.value.zoomIn(m),
    zoomOut: (m) => o.value.zoomOut(m),
    zoomTo: (m, y) => o.value.zoomTo(m, y),
    setViewport: (m, y) => o.value.setViewport(m, y),
    setTransform: (m, y) => o.value.setTransform(m, y),
    getViewport: () => o.value.getViewport(),
    getTransform: () => o.value.getTransform(),
    setCenter: (m, y, w) => o.value.setCenter(m, y, w),
    fitBounds: (m, y) => o.value.fitBounds(m, y),
    project: (m) => o.value.project(m),
    screenToFlowCoordinate: (m) => o.value.screenToFlowCoordinate(m),
    flowToScreenCoordinate: (m) => o.value.flowToScreenCoordinate(m),
    toObject: () => {
      const m = [], y = [];
      for (const w of e.nodes) {
        const {
          computedPosition: S,
          handleBounds: j,
          selected: K,
          dimensions: Q,
          isParent: W,
          resizing: fe,
          dragging: ue,
          events: ge,
          ...he
        } = w;
        m.push(he);
      }
      for (const w of e.edges) {
        const { selected: S, sourceNode: j, targetNode: K, events: Q, ...W } = w;
        y.push(W);
      }
      return JSON.parse(
        JSON.stringify({
          nodes: m,
          edges: y,
          position: [e.viewport.x, e.viewport.y],
          zoom: e.viewport.zoom,
          viewport: e.viewport
        })
      );
    },
    fromObject: (m) => new Promise((y) => {
      const { nodes: w, edges: S, position: j, zoom: K, viewport: Q } = m;
      if (w && X(w), S && q(S), Q != null && Q.x && (Q != null && Q.y) || j) {
        const W = (Q == null ? void 0 : Q.x) || j[0], fe = (Q == null ? void 0 : Q.y) || j[1], ue = (Q == null ? void 0 : Q.zoom) || K || e.viewport.zoom;
        return ql(() => o.value.viewportInitialized).toBe(!0).then(() => {
          o.value.setViewport({
            x: W,
            y: fe,
            zoom: ue
          }).then(() => {
            y(!0);
          });
        });
      } else
        y(!0);
    }),
    updateNodeInternals: s,
    viewportHelper: o,
    $reset: () => {
      const m = Pp();
      if (e.edges = [], e.nodes = [], e.d3Zoom && e.d3Selection) {
        const y = Lo.translate(m.defaultViewport.x ?? 0, m.defaultViewport.y ?? 0).scale(go(m.defaultViewport.zoom ?? 1, m.minZoom, m.maxZoom)), w = e.viewportRef.getBoundingClientRect(), S = [
          [0, 0],
          [w.width, w.height]
        ], j = e.d3Zoom.constrain()(y, S, m.translateExtent);
        e.d3Zoom.transform(e.d3Selection, j);
      }
      Ee(m);
    },
    $destroy: () => {
    }
  };
}
const hC = ["data-id", "data-handleid", "data-nodeid", "data-handlepos"], vC = {
  name: "Handle",
  compatConfig: { MODE: 3 }
}, Gn = /* @__PURE__ */ He({
  ...vC,
  props: {
    id: { default: null },
    type: {},
    position: { default: () => $e.Top },
    isValidConnection: { type: Function },
    connectable: { type: [Boolean, Number, String, Function], default: void 0 },
    connectableStart: { type: Boolean, default: !0 },
    connectableEnd: { type: Boolean, default: !0 }
  },
  setup(e, { expose: t }) {
    const n = Td(e, ["position", "connectable", "connectableStart", "connectableEnd", "id"]), o = tt(() => n.type ?? "source"), s = tt(() => n.isValidConnection ?? null), {
      connectionStartHandle: i,
      connectionClickStartHandle: l,
      connectionEndHandle: r,
      vueFlowRef: u,
      nodesConnectable: c,
      noDragClassName: d,
      noPanClassName: f
    } = ot(), { id: p, node: h, nodeEl: b, connectedEdges: C } = Tp(), M = te(), P = tt(() => typeof e.connectableStart < "u" ? e.connectableStart : !0), L = tt(() => typeof e.connectableEnd < "u" ? e.connectableEnd : !0), E = tt(
      () => {
        var X, q, V, R, k, D;
        return ((X = i.value) == null ? void 0 : X.nodeId) === p && ((q = i.value) == null ? void 0 : q.handleId) === e.id && ((V = i.value) == null ? void 0 : V.type) === o.value || ((R = r.value) == null ? void 0 : R.nodeId) === p && ((k = r.value) == null ? void 0 : k.handleId) === e.id && ((D = r.value) == null ? void 0 : D.type) === o.value;
      }
    ), x = tt(
      () => {
        var X, q, V;
        return ((X = l.value) == null ? void 0 : X.nodeId) === p && ((q = l.value) == null ? void 0 : q.handleId) === e.id && ((V = l.value) == null ? void 0 : V.type) === o.value;
      }
    ), { handlePointerDown: z, handleClick: Y } = Np({
      nodeId: p,
      handleId: e.id,
      isValidConnection: s,
      type: o
    }), Z = ae(() => typeof e.connectable == "string" && e.connectable === "single" ? !C.value.some((X) => {
      const q = X[`${o.value}Handle`];
      return X[o.value] !== p ? !1 : q ? q === e.id : !0;
    }) : typeof e.connectable == "number" ? C.value.filter((X) => {
      const q = X[`${o.value}Handle`];
      return X[o.value] !== p ? !1 : q ? q === e.id : !0;
    }).length < e.connectable : typeof e.connectable == "function" ? e.connectable(h, C.value) : pt(e.connectable) ? e.connectable : c.value);
    xt(() => {
      var X;
      if (!h.dimensions.width || !h.dimensions.height)
        return;
      const q = (X = h.handleBounds[o.value]) == null ? void 0 : X.find((G) => G.id === e.id);
      if (!u.value || q)
        return;
      const V = u.value.querySelector(".vue-flow__transformationpane");
      if (!b.value || !M.value || !V || !e.id)
        return;
      const R = b.value.getBoundingClientRect(), k = M.value.getBoundingClientRect(), D = window.getComputedStyle(V), { m22: O } = new window.DOMMatrixReadOnly(D.transform), B = {
        id: e.id,
        position: e.position,
        x: (k.left - R.left) / O,
        y: (k.top - R.top) / O,
        ...Bi(M.value)
      };
      h.handleBounds[o.value] = [...h.handleBounds[o.value] ?? [], B];
    }), Ti(() => {
      const X = h.handleBounds[o.value];
      X && (h.handleBounds[o.value] = X.filter((q) => q.id !== e.id));
    });
    function H(X) {
      const q = Ur(X);
      Z.value && P.value && (q && X.button === 0 || !q) && z(X);
    }
    function T(X) {
      !p || !l.value && !P.value || Z.value && Y(X);
    }
    return t({
      handleClick: Y,
      handlePointerDown: z,
      onClick: T,
      onPointerDown: H
    }), (X, q) => (v(), _("div", {
      ref_key: "handle",
      ref: M,
      "data-id": `${U(p)}-${e.id}-${o.value}`,
      "data-handleid": e.id,
      "data-nodeid": U(p),
      "data-handlepos": X.position,
      class: be(["vue-flow__handle", [
        `vue-flow__handle-${X.position}`,
        `vue-flow__handle-${e.id}`,
        U(d),
        U(f),
        o.value,
        {
          connectable: Z.value,
          connecting: x.value,
          connectablestart: P.value,
          connectableend: L.value,
          connectionindicator: Z.value && (P.value && !E.value || L.value && E.value)
        }
      ]]),
      onMousedown: H,
      onTouchstartPassive: H,
      onClick: T
    }, [
      fo(X.$slots, "default", { id: X.id })
    ], 42, hC));
  }
}), Gi = function({
  sourcePosition: e = $e.Bottom,
  targetPosition: t = $e.Top,
  label: n,
  connectable: o = !0,
  isValidTargetPos: s,
  isValidSourcePos: i,
  data: l
}) {
  const r = l.label || n;
  return [
    Xe(Gn, { type: "target", position: t, connectable: o, isValidConnection: s }),
    typeof r != "string" && r ? Xe(r) : Xe(xe, [r]),
    Xe(Gn, { type: "source", position: e, connectable: o, isValidConnection: i })
  ];
};
Gi.props = ["sourcePosition", "targetPosition", "label", "isValidTargetPos", "isValidSourcePos", "connectable", "data"];
Gi.inheritAttrs = !1;
Gi.compatConfig = { MODE: 3 };
const gC = Gi, qi = function({
  targetPosition: e = $e.Top,
  label: t,
  connectable: n = !0,
  isValidTargetPos: o,
  data: s
}) {
  const i = s.label || t;
  return [
    Xe(Gn, { type: "target", position: e, connectable: n, isValidConnection: o }),
    typeof i != "string" && i ? Xe(i) : Xe(xe, [i])
  ];
};
qi.props = ["targetPosition", "label", "isValidTargetPos", "connectable", "data"];
qi.inheritAttrs = !1;
qi.compatConfig = { MODE: 3 };
const mC = qi, Yi = function({
  sourcePosition: e = $e.Bottom,
  label: t,
  connectable: n = !0,
  isValidSourcePos: o,
  data: s
}) {
  const i = s.label || t;
  return [
    typeof i != "string" && i ? Xe(i) : Xe(xe, [i]),
    Xe(Gn, { type: "source", position: e, connectable: n, isValidConnection: o })
  ];
};
Yi.props = ["sourcePosition", "label", "isValidSourcePos", "connectable", "data"];
Yi.inheritAttrs = !1;
Yi.compatConfig = { MODE: 3 };
const yC = Yi, bC = ["transform"], _C = ["width", "height", "x", "y", "rx", "ry"], wC = ["y"], kC = {
  name: "EdgeText",
  compatConfig: { MODE: 3 }
}, EC = /* @__PURE__ */ He({
  ...kC,
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
    const t = te({ x: 0, y: 0, width: 0, height: 0 }), n = te(null), o = ae(() => `translate(${e.x - t.value.width / 2} ${e.y - t.value.height / 2})`);
    xt(s), ze([() => e.x, () => e.y, n, () => e.label], s);
    function s() {
      if (!n.value)
        return;
      const i = n.value.getBBox();
      (i.width !== t.value.width || i.height !== t.value.height) && (t.value = i);
    }
    return (i, l) => (v(), _("g", {
      transform: o.value,
      class: "vue-flow__edge-textwrapper"
    }, [
      i.labelShowBg ? (v(), _("rect", {
        key: 0,
        class: "vue-flow__edge-textbg",
        width: `${t.value.width + 2 * i.labelBgPadding[0]}px`,
        height: `${t.value.height + 2 * i.labelBgPadding[1]}px`,
        x: -i.labelBgPadding[0],
        y: -i.labelBgPadding[1],
        style: et(i.labelBgStyle),
        rx: i.labelBgBorderRadius,
        ry: i.labelBgBorderRadius
      }, null, 12, _C)) : se("", !0),
      a("text", $r(i.$attrs, {
        ref_key: "el",
        ref: n,
        class: "vue-flow__edge-text",
        y: t.value.height / 2,
        dy: "0.3em",
        style: i.labelStyle
      }), [
        fo(i.$slots, "default", {}, () => [
          typeof i.label != "string" ? (v(), ht(Er(i.label), { key: 0 })) : (v(), _(xe, { key: 1 }, [
            _e(N(i.label), 1)
          ], 64))
        ])
      ], 16, wC)
    ], 8, bC));
  }
}), CC = ["id", "d", "marker-end", "marker-start"], xC = ["d", "stroke-width"], SC = {
  name: "BaseEdge",
  inheritAttrs: !1,
  compatConfig: { MODE: 3 }
}, $s = /* @__PURE__ */ He({
  ...SC,
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
    const n = Td(e, ["interactionWidth", "labelShowBg"]), o = te(null), s = te(null), i = te(null), l = Wh();
    return t({
      pathEl: o,
      interactionEl: s,
      labelEl: i
    }), (r, u) => (v(), _(xe, null, [
      a("path", {
        id: r.id,
        ref_key: "pathEl",
        ref: o,
        d: r.path,
        style: et(n.style),
        class: be(["vue-flow__edge-path", U(l).class]),
        "marker-end": r.markerEnd,
        "marker-start": r.markerStart
      }, null, 14, CC),
      r.interactionWidth ? (v(), _("path", {
        key: 0,
        ref_key: "interactionEl",
        ref: s,
        fill: "none",
        d: r.path,
        "stroke-width": r.interactionWidth,
        "stroke-opacity": 0,
        class: "vue-flow__edge-interaction"
      }, null, 8, xC)) : se("", !0),
      r.label && r.labelX && r.labelY ? (v(), ht(EC, {
        key: 1,
        ref_key: "labelEl",
        ref: i,
        x: r.labelX,
        y: r.labelY,
        label: r.label,
        "label-show-bg": r.labelShowBg,
        "label-bg-style": r.labelBgStyle,
        "label-bg-padding": r.labelBgPadding,
        "label-bg-border-radius": r.labelBgBorderRadius,
        "label-style": r.labelStyle
      }, null, 8, ["x", "y", "label", "label-show-bg", "label-bg-style", "label-bg-padding", "label-bg-border-radius", "label-style"])) : se("", !0)
    ], 64));
  }
});
function Op({
  sourceX: e,
  sourceY: t,
  targetX: n,
  targetY: o
}) {
  const s = Math.abs(n - e) / 2, i = n < e ? n + s : n - s, l = Math.abs(o - t) / 2, r = o < t ? o + l : o - l;
  return [i, r, s, l];
}
function Ap({
  sourceX: e,
  sourceY: t,
  targetX: n,
  targetY: o,
  sourceControlX: s,
  sourceControlY: i,
  targetControlX: l,
  targetControlY: r
}) {
  const u = e * 0.125 + s * 0.375 + l * 0.375 + n * 0.125, c = t * 0.125 + i * 0.375 + r * 0.375 + o * 0.125, d = Math.abs(u - e), f = Math.abs(c - t);
  return [u, c, d, f];
}
function Hs(e, t) {
  return e >= 0 ? 0.5 * e : t * 25 * Math.sqrt(-e);
}
function Pc({ pos: e, x1: t, y1: n, x2: o, y2: s, c: i }) {
  let l, r;
  switch (e) {
    case $e.Left:
      l = t - Hs(t - o, i), r = n;
      break;
    case $e.Right:
      l = t + Hs(o - t, i), r = n;
      break;
    case $e.Top:
      l = t, r = n - Hs(n - s, i);
      break;
    case $e.Bottom:
      l = t, r = n + Hs(s - n, i);
      break;
  }
  return [l, r];
}
function Dp(e) {
  const {
    sourceX: t,
    sourceY: n,
    sourcePosition: o = $e.Bottom,
    targetX: s,
    targetY: i,
    targetPosition: l = $e.Top,
    curvature: r = 0.25
  } = e, [u, c] = Pc({
    pos: o,
    x1: t,
    y1: n,
    x2: s,
    y2: i,
    c: r
  }), [d, f] = Pc({
    pos: l,
    x1: s,
    y1: i,
    x2: t,
    y2: n,
    c: r
  }), [p, h, b, C] = Ap({
    sourceX: t,
    sourceY: n,
    targetX: s,
    targetY: i,
    sourceControlX: u,
    sourceControlY: c,
    targetControlX: d,
    targetControlY: f
  });
  return [
    `M${t},${n} C${u},${c} ${d},${f} ${s},${i}`,
    p,
    h,
    b,
    C
  ];
}
function Oc({ pos: e, x1: t, y1: n, x2: o, y2: s }) {
  let i, l;
  switch (e) {
    case $e.Left:
    case $e.Right:
      i = 0.5 * (t + o), l = n;
      break;
    case $e.Top:
    case $e.Bottom:
      i = t, l = 0.5 * (n + s);
      break;
  }
  return [i, l];
}
function Rp(e) {
  const {
    sourceX: t,
    sourceY: n,
    sourcePosition: o = $e.Bottom,
    targetX: s,
    targetY: i,
    targetPosition: l = $e.Top
  } = e, [r, u] = Oc({
    pos: o,
    x1: t,
    y1: n,
    x2: s,
    y2: i
  }), [c, d] = Oc({
    pos: l,
    x1: s,
    y1: i,
    x2: t,
    y2: n
  }), [f, p, h, b] = Ap({
    sourceX: t,
    sourceY: n,
    targetX: s,
    targetY: i,
    sourceControlX: r,
    sourceControlY: u,
    targetControlX: c,
    targetControlY: d
  });
  return [
    `M${t},${n} C${r},${u} ${c},${d} ${s},${i}`,
    f,
    p,
    h,
    b
  ];
}
const Ac = {
  [$e.Left]: { x: -1, y: 0 },
  [$e.Right]: { x: 1, y: 0 },
  [$e.Top]: { x: 0, y: -1 },
  [$e.Bottom]: { x: 0, y: 1 }
};
function $C({
  source: e,
  sourcePosition: t = $e.Bottom,
  target: n
}) {
  return t === $e.Left || t === $e.Right ? e.x < n.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < n.y ? { x: 0, y: 1 } : { x: 0, y: -1 };
}
function Dc(e, t) {
  return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
}
function IC({
  source: e,
  sourcePosition: t = $e.Bottom,
  target: n,
  targetPosition: o = $e.Top,
  center: s,
  offset: i
}) {
  const l = Ac[t], r = Ac[o], u = { x: e.x + l.x * i, y: e.y + l.y * i }, c = { x: n.x + r.x * i, y: n.y + r.y * i }, d = $C({
    source: u,
    sourcePosition: t,
    target: c
  }), f = d.x !== 0 ? "x" : "y", p = d[f];
  let h, b, C;
  const M = { x: 0, y: 0 }, P = { x: 0, y: 0 }, [L, E, x, z] = Op({
    sourceX: e.x,
    sourceY: e.y,
    targetX: n.x,
    targetY: n.y
  });
  if (l[f] * r[f] === -1) {
    b = s.x ?? L, C = s.y ?? E;
    const Z = [
      { x: b, y: u.y },
      { x: b, y: c.y }
    ], H = [
      { x: u.x, y: C },
      { x: c.x, y: C }
    ];
    l[f] === p ? h = f === "x" ? Z : H : h = f === "x" ? H : Z;
  } else {
    const Z = [{ x: u.x, y: c.y }], H = [{ x: c.x, y: u.y }];
    if (f === "x" ? h = l.x === p ? H : Z : h = l.y === p ? Z : H, t === o) {
      const R = Math.abs(e[f] - n[f]);
      if (R <= i) {
        const k = Math.min(i - 1, i - R);
        l[f] === p ? M[f] = (u[f] > e[f] ? -1 : 1) * k : P[f] = (c[f] > n[f] ? -1 : 1) * k;
      }
    }
    if (t !== o) {
      const R = f === "x" ? "y" : "x", k = l[f] === r[R], D = u[R] > c[R], O = u[R] < c[R];
      (l[f] === 1 && (!k && D || k && O) || l[f] !== 1 && (!k && O || k && D)) && (h = f === "x" ? Z : H);
    }
    const T = { x: u.x + M.x, y: u.y + M.y }, X = { x: c.x + P.x, y: c.y + P.y }, q = Math.max(Math.abs(T.x - h[0].x), Math.abs(X.x - h[0].x)), V = Math.max(Math.abs(T.y - h[0].y), Math.abs(X.y - h[0].y));
    q >= V ? (b = (T.x + X.x) / 2, C = h[0].y) : (b = h[0].x, C = (T.y + X.y) / 2);
  }
  return [[
    e,
    { x: u.x + M.x, y: u.y + M.y },
    ...h,
    { x: c.x + P.x, y: c.y + P.y },
    n
  ], b, C, x, z];
}
function NC(e, t, n, o) {
  const s = Math.min(Dc(e, t) / 2, Dc(t, n) / 2, o), { x: i, y: l } = t;
  if (e.x === i && i === n.x || e.y === l && l === n.y)
    return `L${i} ${l}`;
  if (e.y === l) {
    const c = e.x < n.x ? -1 : 1, d = e.y < n.y ? 1 : -1;
    return `L ${i + s * c},${l}Q ${i},${l} ${i},${l + s * d}`;
  }
  const r = e.x < n.x ? 1 : -1, u = e.y < n.y ? -1 : 1;
  return `L ${i},${l + s * u}Q ${i},${l} ${i + s * r},${l}`;
}
function lr(e) {
  const {
    sourceX: t,
    sourceY: n,
    sourcePosition: o = $e.Bottom,
    targetX: s,
    targetY: i,
    targetPosition: l = $e.Top,
    borderRadius: r = 5,
    centerX: u,
    centerY: c,
    offset: d = 20
  } = e, [f, p, h, b, C] = IC({
    source: { x: t, y: n },
    sourcePosition: o,
    target: { x: s, y: i },
    targetPosition: l,
    center: { x: u, y: c },
    offset: d
  });
  return [f.reduce((P, L, E) => {
    let x;
    return E > 0 && E < f.length - 1 ? x = NC(f[E - 1], L, f[E + 1], r) : x = `${E === 0 ? "M" : "L"}${L.x} ${L.y}`, P += x, P;
  }, ""), p, h, b, C];
}
function TC(e) {
  const { sourceX: t, sourceY: n, targetX: o, targetY: s } = e, [i, l, r, u] = Op({
    sourceX: t,
    sourceY: n,
    targetX: o,
    targetY: s
  });
  return [`M ${t},${n}L ${o},${s}`, i, l, r, u];
}
const MC = /* @__PURE__ */ He({
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
      const [n, o, s] = TC(e);
      return Xe($s, {
        path: n,
        labelX: o,
        labelY: s,
        ...t,
        ...e
      });
    };
  }
}), PC = MC, OC = /* @__PURE__ */ He({
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
      const [n, o, s] = lr({
        ...e,
        sourcePosition: e.sourcePosition ?? $e.Bottom,
        targetPosition: e.targetPosition ?? $e.Top
      });
      return Xe($s, {
        path: n,
        labelX: o,
        labelY: s,
        ...t,
        ...e
      });
    };
  }
}), Lp = OC, AC = /* @__PURE__ */ He({
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
    return () => Xe(Lp, { ...e, ...t, borderRadius: 0 });
  }
}), DC = AC, RC = /* @__PURE__ */ He({
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
      const [n, o, s] = Dp({
        ...e,
        sourcePosition: e.sourcePosition ?? $e.Bottom,
        targetPosition: e.targetPosition ?? $e.Top
      });
      return Xe($s, {
        path: n,
        labelX: o,
        labelY: s,
        ...t,
        ...e
      });
    };
  }
}), LC = RC, VC = /* @__PURE__ */ He({
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
      const [n, o, s] = Rp({
        ...e,
        sourcePosition: e.sourcePosition ?? $e.Bottom,
        targetPosition: e.targetPosition ?? $e.Top
      });
      return Xe($s, {
        path: n,
        labelX: o,
        labelY: s,
        ...t,
        ...e
      });
    };
  }
}), zC = VC, FC = {
  input: yC,
  default: gC,
  output: mC
}, BC = {
  default: LC,
  straight: PC,
  step: DC,
  smoothstep: Lp,
  simplebezier: zC
};
function HC(e, t, n) {
  const o = ae(() => (C) => t.value.get(C)), s = ae(() => (C) => n.value.get(C)), i = ae(() => {
    const C = {
      ...BC,
      ...e.edgeTypes
    }, M = Object.keys(C);
    for (const P of e.edges)
      P.type && !M.includes(P.type) && (C[P.type] = P.type);
    return C;
  }), l = ae(() => {
    const C = {
      ...FC,
      ...e.nodeTypes
    }, M = Object.keys(C);
    for (const P of e.nodes)
      P.type && !M.includes(P.type) && (C[P.type] = P.type);
    return C;
  }), r = ae(() => e.onlyRenderVisibleElements ? yp(
    e.nodes,
    {
      x: 0,
      y: 0,
      width: e.dimensions.width,
      height: e.dimensions.height
    },
    e.viewport,
    !0
  ) : e.nodes), u = ae(() => {
    if (e.onlyRenderVisibleElements) {
      const C = [];
      for (const M of e.edges) {
        const P = t.value.get(M.source), L = t.value.get(M.target);
        jE({
          sourcePos: P.computedPosition || { x: 0, y: 0 },
          targetPos: L.computedPosition || { x: 0, y: 0 },
          sourceWidth: P.dimensions.width,
          sourceHeight: P.dimensions.height,
          targetWidth: L.dimensions.width,
          targetHeight: L.dimensions.height,
          width: e.dimensions.width,
          height: e.dimensions.height,
          viewport: e.viewport
        }) && C.push(M);
      }
      return C;
    }
    return e.edges;
  }), c = ae(() => [...r.value, ...u.value]), d = ae(() => {
    const C = [];
    for (const M of e.nodes)
      M.selected && C.push(M);
    return C;
  }), f = ae(() => {
    const C = [];
    for (const M of e.edges)
      M.selected && C.push(M);
    return C;
  }), p = ae(() => [
    ...d.value,
    ...f.value
  ]), h = ae(() => {
    const C = [];
    for (const M of e.nodes)
      M.dimensions.width && M.dimensions.height && M.handleBounds !== void 0 && C.push(M);
    return C;
  }), b = ae(
    () => r.value.length > 0 && h.value.length === r.value.length
  );
  return {
    getNode: o,
    getEdge: s,
    getElements: c,
    getEdgeTypes: i,
    getNodeTypes: l,
    getEdges: u,
    getNodes: r,
    getSelectedElements: p,
    getSelectedNodes: d,
    getSelectedEdges: f,
    getNodesInitialized: h,
    areNodesInitialized: b
  };
}
class no {
  constructor() {
    this.currentId = 0, this.flows = /* @__PURE__ */ new Map();
  }
  static getInstance() {
    var t;
    const n = (t = zo()) == null ? void 0 : t.appContext.app, o = (n == null ? void 0 : n.config.globalProperties.$vueFlowStorage) ?? no.instance;
    return no.instance = o ?? new no(), n && (n.config.globalProperties.$vueFlowStorage = no.instance), no.instance;
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
    const o = Pp(), s = un(o), i = {};
    for (const [p, h] of Object.entries(s.hooks)) {
      const b = `on${p.charAt(0).toUpperCase() + p.slice(1)}`;
      i[b] = h.on;
    }
    const l = {};
    for (const [p, h] of Object.entries(s.hooks))
      l[p] = h.trigger;
    const r = ae(() => {
      const p = /* @__PURE__ */ new Map();
      for (const h of s.nodes)
        p.set(h.id, h);
      return p;
    }), u = ae(() => {
      const p = /* @__PURE__ */ new Map();
      for (const h of s.edges)
        p.set(h.id, h);
      return p;
    }), c = HC(s, r, u), d = pC(s, r, u);
    d.setState({ ...s, ...n });
    const f = {
      ...i,
      ...c,
      ...d,
      ...q0(s),
      nodeLookup: r,
      edgeLookup: u,
      emits: l,
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
function ot(e) {
  const t = no.getInstance(), n = pr(), o = typeof e == "object", s = o ? e : { id: e }, i = s.id, l = i ?? (n == null ? void 0 : n.vueFlowId);
  let r;
  if (n) {
    const u = dn(Mc, null);
    typeof u < "u" && u !== null && (!l || u.id === l) && (r = u);
  }
  if (r || l && (r = t.get(l)), !r || l && r.id !== l) {
    const u = i ?? t.getId(), c = t.create(u, s);
    r = c, (n ?? Kc(!0)).run(() => {
      ze(
        c.applyDefault,
        (f, p, h) => {
          const b = (M) => {
            c.applyNodeChanges(M);
          }, C = (M) => {
            c.applyEdgeChanges(M);
          };
          f ? (c.onNodesChange(b), c.onEdgesChange(C)) : (c.hooks.value.nodesChange.off(b), c.hooks.value.edgesChange.off(C)), h(() => {
            c.hooks.value.nodesChange.off(b), c.hooks.value.edgesChange.off(C);
          });
        },
        { immediate: !0 }
      ), Ri(() => {
        if (r) {
          const f = t.get(r.id);
          f ? f.$destroy() : Ui(`No store instance found for id ${r.id} in storage.`);
        }
      });
    });
  } else
    o && r.setState(s);
  if (n && (po(Mc, r), n.vueFlowId = r.id), o) {
    const u = zo();
    (u == null ? void 0 : u.type.name) !== "VueFlow" && r.emits.error(new wt(vt.USEVUEFLOW_OPTIONS));
  }
  return r;
}
function UC(e) {
  const { emits: t, dimensions: n } = ot();
  let o;
  xt(() => {
    const s = e.value, i = () => {
      if (!s)
        return;
      const l = Bi(s);
      (l.width === 0 || l.height === 0) && t.error(new wt(vt.MISSING_VIEWPORT_DIMENSIONS)), n.value = { width: l.width || 500, height: l.height || 500 };
    };
    i(), window.addEventListener("resize", i), s && (o = new ResizeObserver(() => i()), o.observe(s)), Mn(() => {
      window.removeEventListener("resize", i), o && s && o.unobserve(s);
    });
  });
}
const jC = {
  name: "UserSelection",
  compatConfig: { MODE: 3 }
}, GC = /* @__PURE__ */ He({
  ...jC,
  props: {
    userSelectionRect: {}
  },
  setup(e) {
    return (t, n) => (v(), _("div", {
      class: "vue-flow__selection vue-flow__container",
      style: et({
        width: `${t.userSelectionRect.width}px`,
        height: `${t.userSelectionRect.height}px`,
        transform: `translate(${t.userSelectionRect.x}px, ${t.userSelectionRect.y}px)`
      })
    }, null, 4));
  }
}), qC = ["tabIndex"], YC = {
  name: "NodesSelection",
  compatConfig: { MODE: 3 }
}, XC = /* @__PURE__ */ He({
  ...YC,
  setup(e) {
    const { emits: t, viewport: n, getSelectedNodes: o, noPanClassName: s, disableKeyboardA11y: i, userSelectionActive: l } = ot(), r = Mp(), u = te(null), c = Ip({
      el: u,
      onStart(b) {
        t.selectionDragStart(b);
      },
      onDrag(b) {
        t.selectionDrag(b);
      },
      onStop(b) {
        t.selectionDragStop(b);
      }
    });
    xt(() => {
      var b;
      i.value || (b = u.value) == null || b.focus({ preventScroll: !0 });
    });
    const d = ae(() => mp(o.value)), f = ae(() => ({
      width: `${d.value.width}px`,
      height: `${d.value.height}px`,
      top: `${d.value.y}px`,
      left: `${d.value.x}px`
    }));
    function p(b) {
      t.selectionContextMenu({ event: b, nodes: o.value });
    }
    function h(b) {
      i || Mo[b.key] && (b.preventDefault(), r(
        {
          x: Mo[b.key].x,
          y: Mo[b.key].y
        },
        b.shiftKey
      ));
    }
    return (b, C) => !U(l) && d.value.width && d.value.height ? (v(), _("div", {
      key: 0,
      class: be(["vue-flow__nodesselection vue-flow__container", U(s)]),
      style: et({ transform: `translate(${U(n).x}px,${U(n).y}px) scale(${U(n).zoom})` })
    }, [
      a("div", {
        ref_key: "el",
        ref: u,
        class: be([{ dragging: U(c) }, "vue-flow__nodesselection-rect"]),
        style: et(f.value),
        tabIndex: U(i) ? void 0 : -1,
        onContextmenu: p,
        onKeydown: h
      }, null, 46, qC)
    ], 6)) : se("", !0);
  }
});
function KC(e, t) {
  return {
    x: e.clientX - t.left,
    y: e.clientY - t.top
  };
}
const WC = {
  name: "Pane",
  compatConfig: { MODE: 3 }
}, ZC = /* @__PURE__ */ He({
  ...WC,
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
      removeSelectedElements: l,
      userSelectionRect: r,
      elementsSelectable: u,
      nodesSelectionActive: c,
      getSelectedEdges: d,
      getSelectedNodes: f,
      removeNodes: p,
      removeEdges: h,
      selectionMode: b,
      deleteKeyCode: C,
      multiSelectionKeyCode: M,
      multiSelectionActive: P,
      edgeLookup: L,
      nodeLookup: E
    } = ot(), x = te(null), z = te(0), Y = te(0), Z = te(), H = te(/* @__PURE__ */ new Map()), T = tt(() => u.value && (e.isSelecting || i.value));
    let X = !1, q = !1;
    const V = ls(C, { actInsideInputWithModifier: !1 }), R = ls(M);
    ze(V, (re) => {
      re && (p(f.value), h(d.value), c.value = !1);
    }), ze(R, (re) => {
      P.value = re;
    });
    function k(re, ye) {
      return (pe) => {
        pe.target === ye && (re == null || re(pe));
      };
    }
    function D() {
      i.value = !1, r.value = null, z.value = 0, Y.value = 0;
    }
    function O(re) {
      if (X) {
        X = !1;
        return;
      }
      s.paneClick(re), l(), c.value = !1;
    }
    function B(re) {
      re.preventDefault(), re.stopPropagation(), s.paneContextMenu(re);
    }
    function G(re) {
      s.paneScroll(re);
    }
    function ie(re) {
      var ye, pe, ce, Ie, Me;
      if (Z.value = (ye = t.value) == null ? void 0 : ye.getBoundingClientRect(), !u.value || !e.isSelecting || re.button !== 0 || re.target !== x.value || !Z.value)
        return;
      (ce = (pe = re.target) == null ? void 0 : pe.setPointerCapture) == null || ce.call(pe, re.pointerId);
      const { x: oe, y: Se } = KC(re, Z.value);
      q = !0, X = !1, H.value = /* @__PURE__ */ new Map();
      for (const [Ee, ke] of L.value)
        H.value.set(ke.source, ((Ie = H.value.get(ke.source)) == null ? void 0 : Ie.add(Ee)) || /* @__PURE__ */ new Set([Ee])), H.value.set(ke.target, ((Me = H.value.get(ke.target)) == null ? void 0 : Me.add(Ee)) || /* @__PURE__ */ new Set([Ee]));
      l(), r.value = {
        width: 0,
        height: 0,
        startX: oe,
        startY: Se,
        x: oe,
        y: Se
      }, s.selectionStart(re);
    }
    function de(re) {
      if (!Z.value || !r.value)
        return;
      X = !0;
      const { x: ye, y: pe } = In(re, Z.value), { startX: ce = 0, startY: Ie = 0 } = r.value, Me = {
        startX: ce,
        startY: Ie,
        x: ye < ce ? ye : ce,
        y: pe < Ie ? pe : Ie,
        width: Math.abs(ye - ce),
        height: Math.abs(pe - Ie)
      }, oe = yp(
        n.value,
        Me,
        o.value,
        b.value === Br.Partial,
        !0
      ), Se = /* @__PURE__ */ new Set(), Ee = /* @__PURE__ */ new Set();
      for (const ke of oe) {
        Ee.add(ke.id);
        const $ = H.value.get(ke.id);
        if ($)
          for (const A of $)
            Se.add(A);
      }
      if (z.value !== Ee.size) {
        z.value = Ee.size;
        const ke = Ln(E.value, Ee, !0);
        s.nodesChange(ke);
      }
      if (Y.value !== Se.size) {
        Y.value = Se.size;
        const ke = Ln(L.value, Se);
        s.edgesChange(ke);
      }
      r.value = Me, i.value = !0, c.value = !1;
    }
    function ve(re) {
      var ye;
      re.button !== 0 || !q || ((ye = re.target) == null || ye.releasePointerCapture(re.pointerId), !i.value && r.value && re.target === x.value && O(re), z.value > 0 && (c.value = !0), D(), s.selectionEnd(re), e.selectionKeyPressed && (X = !1), q = !1);
    }
    return (re, ye) => (v(), _("div", {
      ref_key: "container",
      ref: x,
      class: be(["vue-flow__pane vue-flow__container", { selection: re.isSelecting }]),
      onClick: ye[0] || (ye[0] = (pe) => T.value ? void 0 : k(O, x.value)(pe)),
      onContextmenu: ye[1] || (ye[1] = (pe) => k(B, x.value)(pe)),
      onWheelPassive: ye[2] || (ye[2] = (pe) => k(G, x.value)(pe)),
      onPointerenter: ye[3] || (ye[3] = (pe) => T.value ? void 0 : U(s).paneMouseEnter(pe)),
      onPointerdown: ye[4] || (ye[4] = (pe) => T.value ? ie(pe) : U(s).paneMouseMove(pe)),
      onPointermove: ye[5] || (ye[5] = (pe) => T.value ? de(pe) : U(s).paneMouseMove(pe)),
      onPointerup: ye[6] || (ye[6] = (pe) => T.value ? ve(pe) : void 0),
      onPointerleave: ye[7] || (ye[7] = (pe) => U(s).paneMouseLeave(pe))
    }, [
      fo(re.$slots, "default"),
      U(i) && U(r) ? (v(), ht(GC, {
        key: 0,
        "user-selection-rect": U(r)
      }, null, 8, ["user-selection-rect"])) : se("", !0),
      U(c) && U(f).length ? (v(), ht(XC, { key: 1 })) : se("", !0)
    ], 34));
  }
}), JC = {
  name: "Transform",
  compatConfig: { MODE: 3 }
}, QC = /* @__PURE__ */ He({
  ...JC,
  setup(e) {
    const { viewport: t, fitViewOnInit: n, fitViewOnInitDone: o } = ot(), s = ae(() => n.value ? !o.value : !1), i = ae(() => `translate(${t.value.x}px,${t.value.y}px) scale(${t.value.zoom})`);
    return (l, r) => (v(), _("div", {
      class: "vue-flow__transformationpane vue-flow__container",
      style: et({ transform: i.value, opacity: s.value ? 0 : void 0 })
    }, [
      fo(l.$slots, "default")
    ], 4));
  }
}), ex = {
  name: "Viewport",
  compatConfig: { MODE: 3 }
}, tx = /* @__PURE__ */ He({
  ...ex,
  setup(e) {
    const {
      minZoom: t,
      maxZoom: n,
      defaultViewport: o,
      translateExtent: s,
      zoomActivationKeyCode: i,
      selectionKeyCode: l,
      panActivationKeyCode: r,
      panOnScroll: u,
      panOnScrollMode: c,
      panOnScrollSpeed: d,
      panOnDrag: f,
      zoomOnDoubleClick: p,
      zoomOnPinch: h,
      zoomOnScroll: b,
      preventScrolling: C,
      noWheelClassName: M,
      noPanClassName: P,
      emits: L,
      connectionStartHandle: E,
      userSelectionActive: x,
      paneDragging: z,
      d3Zoom: Y,
      d3Selection: Z,
      d3ZoomHandler: H,
      viewport: T,
      viewportRef: X,
      paneClickDistance: q
    } = ot();
    UC(X);
    const V = te(!1), R = te(!1);
    let k = null, D = !1, O = 0, B = {
      x: 0,
      y: 0,
      zoom: 0
    };
    const G = ls(r), ie = ls(l), de = ls(i), ve = tt(
      () => (!ie.value || ie.value && l.value === !0) && (G.value || f.value)
    ), re = tt(() => G.value || u.value), ye = tt(() => ie.value || l.value === !0 && ve.value !== !0);
    xt(() => {
      if (!X.value) {
        Ui("Viewport element is missing");
        return;
      }
      const Se = X.value, Ee = Se.getBoundingClientRect(), ke = $E().clickDistance(q.value).scaleExtent([t.value, n.value]).translateExtent(s.value), $ = Zt(Se).call(ke), A = $.on("wheel.zoom"), m = Lo.translate(o.value.x ?? 0, o.value.y ?? 0).scale(go(o.value.zoom ?? 1, t.value, n.value)), y = [
        [0, 0],
        [Ee.width, Ee.height]
      ], w = ke.constrain()(m, y, s.value);
      ke.transform($, w), ke.wheelDelta(ce), Y.value = ke, Z.value = $, H.value = A, T.value = { x: w.x, y: w.y, zoom: w.k }, ke.on("start", (S) => {
        var j;
        if (!S.sourceEvent)
          return null;
        O = S.sourceEvent.button, V.value = !0;
        const K = Me(S.transform);
        ((j = S.sourceEvent) == null ? void 0 : j.type) === "mousedown" && (z.value = !0), B = K, L.viewportChangeStart(K), L.moveStart({ event: S, flowTransform: K });
      }), ke.on("end", (S) => {
        if (!S.sourceEvent)
          return null;
        if (V.value = !1, z.value = !1, pe(ve.value, O ?? 0) && !D && L.paneContextMenu(S.sourceEvent), D = !1, Ie(B, S.transform)) {
          const j = Me(S.transform);
          B = j, L.viewportChangeEnd(j), L.moveEnd({ event: S, flowTransform: j });
        }
      }), ke.filter((S) => {
        var j;
        const K = de.value || b.value, Q = h.value && S.ctrlKey, W = S.button;
        if (W === 1 && S.type === "mousedown" && (oe(S, "vue-flow__node") || oe(S, "vue-flow__edge")))
          return !0;
        if (!ve.value && !K && !re.value && !p.value && !h.value || x.value || !p.value && S.type === "dblclick" || oe(S, M.value) && S.type === "wheel" || oe(S, P.value) && (S.type !== "wheel" || re.value && S.type === "wheel" && !de.value) || !h.value && S.ctrlKey && S.type === "wheel" || !K && !re.value && !Q && S.type === "wheel")
          return !1;
        if (!h && S.type === "touchstart" && ((j = S.touches) == null ? void 0 : j.length) > 1)
          return S.preventDefault(), !1;
        if (!ve.value && (S.type === "mousedown" || S.type === "touchstart") || l.value === !0 && Array.isArray(f.value) && f.value.includes(0) && W === 0 || Array.isArray(f.value) && !f.value.includes(W) && (S.type === "mousedown" || S.type === "touchstart"))
          return !1;
        const fe = Array.isArray(f.value) && f.value.includes(W) || l.value === !0 && Array.isArray(f.value) && !f.value.includes(0) || !W || W <= 1;
        return (!S.ctrlKey || G.value || S.type === "wheel") && fe;
      }), ze(
        [x, ve],
        () => {
          x.value && !V.value ? ke.on("zoom", null) : x.value || ke.on("zoom", (S) => {
            T.value = { x: S.transform.x, y: S.transform.y, zoom: S.transform.k };
            const j = Me(S.transform);
            D = pe(ve.value, O ?? 0), L.viewportChange(j), L.move({ event: S, flowTransform: j });
          });
        },
        { immediate: !0 }
      ), ze(
        [x, re, c, de, h, C, M],
        () => {
          re.value && !de.value && !x.value ? $.on(
            "wheel.zoom",
            (S) => {
              if (oe(S, M.value))
                return !1;
              const j = de.value || b.value, K = h.value && S.ctrlKey;
              if (!(!C.value || re.value || j || K))
                return !1;
              S.preventDefault(), S.stopImmediatePropagation();
              const W = $.property("__zoom").k || 1, fe = bi();
              if (!G.value && S.ctrlKey && h.value && fe) {
                const Be = rn(S), Ae = ce(S), st = W * 2 ** Ae;
                ke.scaleTo($, st, Be, S);
                return;
              }
              const ue = S.deltaMode === 1 ? 20 : 1;
              let ge = c.value === is.Vertical ? 0 : S.deltaX * ue, he = c.value === is.Horizontal ? 0 : S.deltaY * ue;
              !fe && S.shiftKey && c.value !== is.Vertical && !ge && he && (ge = he, he = 0), ke.translateBy(
                $,
                -(ge / W) * d.value,
                -(he / W) * d.value
              );
              const Te = Me($.property("__zoom"));
              k && clearTimeout(k), R.value ? (L.move({ event: S, flowTransform: Te }), L.viewportChange(Te), k = setTimeout(() => {
                L.moveEnd({ event: S, flowTransform: Te }), L.viewportChangeEnd(Te), R.value = !1;
              }, 150)) : (R.value = !0, L.moveStart({ event: S, flowTransform: Te }), L.viewportChangeStart(Te));
            },
            { passive: !1 }
          ) : typeof A < "u" && $.on(
            "wheel.zoom",
            function(S, j) {
              const K = !C.value && S.type === "wheel" && !S.ctrlKey, Q = de.value || b.value, W = h.value && S.ctrlKey;
              if (!Q && !u.value && !W && S.type === "wheel" || K || oe(S, M.value))
                return null;
              S.preventDefault(), A.call(this, S, j);
            },
            { passive: !1 }
          );
        },
        { immediate: !0 }
      );
    });
    function pe(Se, Ee) {
      return Ee === 2 && Array.isArray(Se) && Se.includes(2);
    }
    function ce(Se) {
      const Ee = Se.ctrlKey && bi() ? 10 : 1;
      return -Se.deltaY * (Se.deltaMode === 1 ? 0.05 : Se.deltaMode ? 1 : 2e-3) * Ee;
    }
    function Ie(Se, Ee) {
      return Se.x !== Ee.x && !Number.isNaN(Ee.x) || Se.y !== Ee.y && !Number.isNaN(Ee.y) || Se.zoom !== Ee.k && !Number.isNaN(Ee.k);
    }
    function Me(Se) {
      return {
        x: Se.x,
        y: Se.y,
        zoom: Se.k
      };
    }
    function oe(Se, Ee) {
      return Se.target.closest(`.${Ee}`);
    }
    return (Se, Ee) => (v(), _("div", {
      ref_key: "viewportRef",
      ref: X,
      class: "vue-flow__viewport vue-flow__container"
    }, [
      ne(ZC, {
        "is-selecting": ye.value,
        "selection-key-pressed": U(ie),
        class: be({
          connecting: !!U(E),
          dragging: U(z),
          draggable: U(f) === !0 || Array.isArray(U(f)) && U(f).includes(0)
        })
      }, {
        default: jn(() => [
          ne(QC, null, {
            default: jn(() => [
              fo(Se.$slots, "default")
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["is-selecting", "selection-key-pressed", "class"])
    ], 512));
  }
}), nx = ["id"], ox = ["id"], sx = ["id"], ix = {
  name: "A11yDescriptions",
  compatConfig: { MODE: 3 }
}, lx = /* @__PURE__ */ He({
  ...ix,
  setup(e) {
    const { id: t, disableKeyboardA11y: n, ariaLiveMessage: o } = ot();
    return (s, i) => (v(), _(xe, null, [
      a("div", {
        id: `${U(ap)}-${U(t)}`,
        style: { display: "none" }
      }, " Press enter or space to select a node. " + N(U(n) ? "" : "You can then use the arrow keys to move the node around.") + " You can then use the arrow keys to move the node around, press delete to remove it and press escape to cancel. ", 9, nx),
      a("div", {
        id: `${U(up)}-${U(t)}`,
        style: { display: "none" }
      }, " Press enter or space to select an edge. You can then press delete to remove it or press escape to cancel. ", 8, ox),
      U(n) ? se("", !0) : (v(), _("div", {
        key: 0,
        id: `${U(ME)}-${U(t)}`,
        "aria-live": "assertive",
        "aria-atomic": "true",
        style: { position: "absolute", width: "1px", height: "1px", margin: "-1px", border: "0", padding: "0", overflow: "hidden", clip: "rect(0px, 0px, 0px, 0px)", "clip-path": "inset(100%)" }
      }, N(U(o)), 9, sx))
    ], 64));
  }
});
function rx() {
  const e = ot();
  ze(
    () => e.viewportHelper.value.viewportInitialized,
    (t) => {
      t && setTimeout(() => {
        e.emits.init(e), e.emits.paneReady(e);
      }, 1);
    }
  );
}
function ax(e, t, n) {
  return n === $e.Left ? e - t : n === $e.Right ? e + t : e;
}
function ux(e, t, n) {
  return n === $e.Top ? e - t : n === $e.Bottom ? e + t : e;
}
const Gr = function({
  radius: e = 10,
  centerX: t = 0,
  centerY: n = 0,
  position: o = $e.Top,
  type: s
}) {
  return Xe("circle", {
    class: `vue-flow__edgeupdater vue-flow__edgeupdater-${s}`,
    cx: ax(t, e, o),
    cy: ux(n, e, o),
    r: e,
    stroke: "transparent",
    fill: "transparent"
  });
};
Gr.props = ["radius", "centerX", "centerY", "position", "type"];
Gr.compatConfig = { MODE: 3 };
const Rc = Gr, cx = /* @__PURE__ */ He({
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
      nodesSelectionActive: l,
      noPanClassName: r,
      getEdgeTypes: u,
      removeSelectedEdges: c,
      findEdge: d,
      findNode: f,
      isValidConnection: p,
      multiSelectionActive: h,
      disableKeyboardA11y: b,
      elementsSelectable: C,
      edgesUpdatable: M,
      edgesFocusable: P,
      hooks: L
    } = ot(), E = ae(() => d(e.id)), { emit: x, on: z } = nC(E.value, i), Y = dn(ji), Z = zo(), H = te(!1), T = te(!1), X = te(""), q = te(null), V = te("source"), R = te(null), k = tt(
      () => typeof E.value.selectable > "u" ? C.value : E.value.selectable
    ), D = tt(() => typeof E.value.updatable > "u" ? M.value : E.value.updatable), O = tt(() => typeof E.value.focusable > "u" ? P.value : E.value.focusable);
    po(QE, e.id), po(eC, R);
    const B = ae(() => E.value.class instanceof Function ? E.value.class(E.value) : E.value.class), G = ae(() => E.value.style instanceof Function ? E.value.style(E.value) : E.value.style), ie = ae(() => {
      const y = E.value.type || "default", w = Y == null ? void 0 : Y[`edge-${y}`];
      if (w)
        return w;
      let S = E.value.template ?? u.value[y];
      if (typeof S == "string" && Z) {
        const j = Object.keys(Z.appContext.components);
        j && j.includes(y) && (S = xd(y, !1));
      }
      return S && typeof S != "string" ? S : (i.error(new wt(vt.EDGE_TYPE_MISSING, S)), !1);
    }), { handlePointerDown: de } = Np({
      nodeId: X,
      handleId: q,
      type: V,
      isValidConnection: p,
      edgeUpdaterType: V,
      onEdgeUpdate: ye,
      onEdgeUpdateEnd: pe
    });
    return () => {
      const y = f(E.value.source), w = f(E.value.target), S = "pathOptions" in E.value ? E.value.pathOptions : {};
      if (!y && !w)
        return i.error(new wt(vt.EDGE_SOURCE_TARGET_MISSING, E.value.id, E.value.source, E.value.target)), null;
      if (!y)
        return i.error(new wt(vt.EDGE_SOURCE_MISSING, E.value.id, E.value.source)), null;
      if (!w)
        return i.error(new wt(vt.EDGE_TARGET_MISSING, E.value.id, E.value.target)), null;
      if (!E.value || E.value.hidden || y.hidden || w.hidden)
        return null;
      let j;
      o.value === vo.Strict ? j = y.handleBounds.source : j = [...y.handleBounds.source || [], ...y.handleBounds.target || []];
      const K = xc(j, E.value.sourceHandle);
      let Q;
      o.value === vo.Strict ? Q = w.handleBounds.target : Q = [...w.handleBounds.target || [], ...w.handleBounds.source || []];
      const W = xc(Q, E.value.targetHandle), fe = (K == null ? void 0 : K.position) || $e.Bottom, ue = (W == null ? void 0 : W.position) || $e.Top, { x: ge, y: he } = yi(y, K, fe), { x: Te, y: Be } = yi(w, W, ue);
      return E.value.sourceX = ge, E.value.sourceY = he, E.value.targetX = Te, E.value.targetY = Be, Xe(
        "g",
        {
          ref: R,
          key: e.id,
          "data-id": e.id,
          class: [
            "vue-flow__edge",
            `vue-flow__edge-${ie.value === !1 ? "default" : E.value.type || "default"}`,
            r.value,
            B.value,
            {
              updating: H.value,
              selected: E.value.selected,
              animated: E.value.animated,
              inactive: !k.value && !L.value.edgeClick.hasListeners()
            }
          ],
          onClick: Ie,
          onContextmenu: Me,
          onDblclick: oe,
          onMouseenter: Se,
          onMousemove: Ee,
          onMouseleave: ke,
          onKeyDown: O.value ? m : void 0,
          tabIndex: O.value ? 0 : void 0,
          "aria-label": E.value.ariaLabel === null ? void 0 : E.value.ariaLabel || `Edge from ${E.value.source} to ${E.value.target}`,
          "aria-describedby": O.value ? `${up}-${t}` : void 0,
          role: O.value ? "button" : "img"
        },
        [
          T.value ? null : Xe(ie.value === !1 ? u.value.default : ie.value, {
            id: e.id,
            sourceNode: y,
            targetNode: w,
            source: E.value.source,
            target: E.value.target,
            type: E.value.type,
            updatable: D.value,
            selected: E.value.selected,
            animated: E.value.animated,
            label: E.value.label,
            labelStyle: E.value.labelStyle,
            labelShowBg: E.value.labelShowBg,
            labelBgStyle: E.value.labelBgStyle,
            labelBgPadding: E.value.labelBgPadding,
            labelBgBorderRadius: E.value.labelBgBorderRadius,
            data: E.value.data,
            events: { ...E.value.events, ...z },
            style: G.value,
            markerStart: `url('#${bs(E.value.markerStart, t)}')`,
            markerEnd: `url('#${bs(E.value.markerEnd, t)}')`,
            sourcePosition: fe,
            targetPosition: ue,
            sourceX: ge,
            sourceY: he,
            targetX: Te,
            targetY: Be,
            sourceHandleId: E.value.sourceHandle,
            targetHandleId: E.value.targetHandle,
            interactionWidth: E.value.interactionWidth,
            ...S
          }),
          [
            D.value === "source" || D.value === !0 ? [
              Xe(
                "g",
                {
                  onMousedown: $,
                  onMouseenter: ve,
                  onMouseout: re
                },
                Xe(Rc, {
                  position: fe,
                  centerX: ge,
                  centerY: he,
                  radius: s.value,
                  type: "source",
                  "data-type": "source"
                })
              )
            ] : null,
            D.value === "target" || D.value === !0 ? [
              Xe(
                "g",
                {
                  onMousedown: A,
                  onMouseenter: ve,
                  onMouseout: re
                },
                Xe(Rc, {
                  position: ue,
                  centerX: Te,
                  centerY: Be,
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
    function ve() {
      H.value = !0;
    }
    function re() {
      H.value = !1;
    }
    function ye(y, w) {
      x.update({ event: y, edge: E.value, connection: w });
    }
    function pe(y) {
      x.updateEnd({ event: y, edge: E.value }), T.value = !1;
    }
    function ce(y, w) {
      y.button === 0 && (T.value = !0, X.value = w ? E.value.target : E.value.source, q.value = (w ? E.value.targetHandle : E.value.sourceHandle) ?? "", V.value = w ? "target" : "source", x.updateStart({ event: y, edge: E.value }), de(y));
    }
    function Ie(y) {
      var w;
      const S = { event: y, edge: E.value };
      k.value && (l.value = !1, E.value.selected && h.value ? (c([E.value]), (w = R.value) == null || w.blur()) : n([E.value])), x.click(S);
    }
    function Me(y) {
      x.contextMenu({ event: y, edge: E.value });
    }
    function oe(y) {
      x.doubleClick({ event: y, edge: E.value });
    }
    function Se(y) {
      x.mouseEnter({ event: y, edge: E.value });
    }
    function Ee(y) {
      x.mouseMove({ event: y, edge: E.value });
    }
    function ke(y) {
      x.mouseLeave({ event: y, edge: E.value });
    }
    function $(y) {
      ce(y, !0);
    }
    function A(y) {
      ce(y, !1);
    }
    function m(y) {
      var w;
      !b.value && cp.includes(y.key) && k.value && (y.key === "Escape" ? ((w = R.value) == null || w.blur(), c([d(e.id)])) : n([d(e.id)]));
    }
  }
}), dx = cx, fx = {
  [$e.Left]: $e.Right,
  [$e.Right]: $e.Left,
  [$e.Top]: $e.Bottom,
  [$e.Bottom]: $e.Top
}, px = /* @__PURE__ */ He({
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
      connectionLineType: l,
      connectionLineStyle: r,
      connectionLineOptions: u,
      connectionStatus: c,
      viewport: d,
      findNode: f
    } = ot(), p = (e = dn(ji)) == null ? void 0 : e["connection-line"], h = ae(() => {
      var L;
      return f((L = o.value) == null ? void 0 : L.nodeId);
    }), b = ae(() => {
      var L;
      return f((L = s.value) == null ? void 0 : L.nodeId) ?? null;
    }), C = ae(() => ({
      x: (i.value.x - d.value.x) / d.value.zoom,
      y: (i.value.y - d.value.y) / d.value.zoom
    })), M = ae(
      () => u.value.markerStart ? `url(#${bs(u.value.markerStart, t)})` : ""
    ), P = ae(
      () => u.value.markerEnd ? `url(#${bs(u.value.markerEnd, t)})` : ""
    );
    return () => {
      var L, E, x, z;
      if (!h.value || !o.value)
        return null;
      const Y = o.value.handleId, Z = o.value.type, H = h.value.handleBounds;
      let T = (H == null ? void 0 : H[Z]) || [];
      if (n.value === vo.Loose) {
        const ie = (H == null ? void 0 : H[Z === "source" ? "target" : "source"]) || [];
        T = [...T, ...ie];
      }
      if (!T)
        return null;
      const X = (Y ? T.find((ie) => ie.id === Y) : T[0]) ?? null, q = (X == null ? void 0 : X.position) || $e.Top, { x: V, y: R } = yi(h.value, X, q);
      let k = null;
      b.value && ((L = s.value) != null && L.handleId) && (n.value === vo.Strict ? k = ((E = b.value.handleBounds[Z === "source" ? "target" : "source"]) == null ? void 0 : E.find(
        (ie) => {
          var de;
          return ie.id === ((de = s.value) == null ? void 0 : de.handleId);
        }
      )) || null : k = ((x = [...b.value.handleBounds.source || [], ...b.value.handleBounds.target || []]) == null ? void 0 : x.find(
        (ie) => {
          var de;
          return ie.id === ((de = s.value) == null ? void 0 : de.handleId);
        }
      )) || null);
      const D = ((z = s.value) == null ? void 0 : z.position) ?? (q ? fx[q] : null);
      if (!q || !D)
        return null;
      const O = l.value ?? u.value.type ?? to.Bezier;
      let B = "";
      const G = {
        sourceX: V,
        sourceY: R,
        sourcePosition: q,
        targetX: C.value.x,
        targetY: C.value.y,
        targetPosition: D
      };
      return O === to.Bezier ? [B] = Dp(G) : O === to.Step ? [B] = lr({
        ...G,
        borderRadius: 0
      }) : O === to.SmoothStep ? [B] = lr(G) : O === to.SimpleBezier ? [B] = Rp(G) : B = `M${V},${R} ${C.value.x},${C.value.y}`, Xe(
        "svg",
        { class: "vue-flow__edges vue-flow__connectionline vue-flow__container" },
        Xe(
          "g",
          { class: "vue-flow__connection" },
          p ? Xe(p, {
            sourceX: V,
            sourceY: R,
            sourcePosition: q,
            targetX: C.value.x,
            targetY: C.value.y,
            targetPosition: D,
            sourceNode: h.value,
            sourceHandle: X,
            targetNode: b.value,
            targetHandle: k,
            markerEnd: P.value,
            markerStart: M.value,
            connectionStatus: c.value
          }) : Xe("path", {
            d: B,
            class: [u.value.class, c, "vue-flow__connection-path"],
            style: {
              ...r.value,
              ...u.value.style
            },
            "marker-end": P.value,
            "marker-start": M.value
          })
        )
      );
    };
  }
}), hx = px, vx = ["id", "markerWidth", "markerHeight", "markerUnits", "orient"], gx = {
  name: "MarkerType",
  compatConfig: { MODE: 3 }
}, mx = /* @__PURE__ */ He({
  ...gx,
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
    return (t, n) => (v(), _("marker", {
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
      t.type === U(tr).ArrowClosed ? (v(), _("polyline", {
        key: 0,
        style: et({
          stroke: t.color,
          fill: t.color,
          strokeWidth: t.strokeWidth
        }),
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        points: "-5,-4 0,0 -5,4 -5,-4"
      }, null, 4)) : se("", !0),
      t.type === U(tr).Arrow ? (v(), _("polyline", {
        key: 1,
        style: et({
          stroke: t.color,
          strokeWidth: t.strokeWidth
        }),
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        fill: "none",
        points: "-5,-4 0,0 -5,4"
      }, null, 4)) : se("", !0)
    ], 8, vx));
  }
}), yx = { class: "vue-flow__marker vue-flow__container" }, bx = {
  name: "MarkerDefinitions",
  compatConfig: { MODE: 3 }
}, _x = /* @__PURE__ */ He({
  ...bx,
  setup(e) {
    const { id: t, edges: n, connectionLineOptions: o, defaultMarkerColor: s } = ot(), i = ae(() => {
      const l = /* @__PURE__ */ new Set(), r = [], u = (c) => {
        if (c) {
          const d = bs(c, t);
          l.has(d) || (typeof c == "object" ? r.push({ ...c, id: d, color: c.color || s.value }) : r.push({ id: d, color: s.value, type: c }), l.add(d));
        }
      };
      for (const c of [o.value.markerEnd, o.value.markerStart])
        u(c);
      for (const c of n.value)
        for (const d of [c.markerStart, c.markerEnd])
          u(d);
      return r.sort((c, d) => c.id.localeCompare(d.id));
    });
    return (l, r) => (v(), _("svg", yx, [
      a("defs", null, [
        (v(!0), _(xe, null, Ve(i.value, (u) => (v(), ht(mx, {
          id: u.id,
          key: u.id,
          type: u.type,
          color: u.color,
          width: u.width,
          height: u.height,
          markerUnits: u.markerUnits,
          "stroke-width": u.strokeWidth,
          orient: u.orient
        }, null, 8, ["id", "type", "color", "width", "height", "markerUnits", "stroke-width", "orient"]))), 128))
      ])
    ]));
  }
}), wx = {
  name: "Edges",
  compatConfig: { MODE: 3 }
}, kx = /* @__PURE__ */ He({
  ...wx,
  setup(e) {
    const { findNode: t, getEdges: n, elevateEdgesOnSelect: o } = ot();
    return (s, i) => (v(), _(xe, null, [
      ne(_x),
      (v(!0), _(xe, null, Ve(U(n), (l) => (v(), _("svg", {
        key: l.id,
        class: "vue-flow__edges vue-flow__container",
        style: et({ zIndex: U(GE)(l, U(t), U(o)) })
      }, [
        ne(U(dx), {
          id: l.id
        }, null, 8, ["id"])
      ], 4))), 128)),
      ne(U(hx))
    ], 64));
  }
}), Ex = /* @__PURE__ */ He({
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
      emits: l,
      removeSelectedNodes: r,
      addSelectedNodes: u,
      updateNodeDimensions: c,
      onUpdateNodeInternals: d,
      getNodeTypes: f,
      nodeExtent: p,
      elevateNodesOnSelect: h,
      disableKeyboardA11y: b,
      ariaLiveMessage: C,
      snapToGrid: M,
      snapGrid: P,
      nodeDragThreshold: L,
      nodesDraggable: E,
      elementsSelectable: x,
      nodesConnectable: z,
      nodesFocusable: Y,
      hooks: Z
    } = ot(), H = te(null);
    po($p, H), po(Sp, e.id);
    const T = dn(ji), X = zo(), q = Mp(), { node: V, parentNode: R } = Tp(e.id), { emit: k, on: D } = lC(V, l), O = tt(() => typeof V.draggable > "u" ? E.value : V.draggable), B = tt(() => typeof V.selectable > "u" ? x.value : V.selectable), G = tt(() => typeof V.connectable > "u" ? z.value : V.connectable), ie = tt(() => typeof V.focusable > "u" ? Y.value : V.focusable), de = tt(
      () => B.value || O.value || Z.value.nodeClick.hasListeners() || Z.value.nodeDoubleClick.hasListeners() || Z.value.nodeMouseEnter.hasListeners() || Z.value.nodeMouseMove.hasListeners() || Z.value.nodeMouseLeave.hasListeners()
    ), ve = tt(() => !!V.dimensions.width && !!V.dimensions.height), re = ae(() => {
      const w = V.type || "default", S = T == null ? void 0 : T[`node-${w}`];
      if (S)
        return S;
      let j = V.template || f.value[w];
      if (typeof j == "string" && X) {
        const K = Object.keys(X.appContext.components);
        K && K.includes(w) && (j = xd(w, !1));
      }
      return j && typeof j != "string" ? j : (l.error(new wt(vt.NODE_TYPE_MISSING, j)), !1);
    }), ye = Ip({
      id: e.id,
      el: H,
      disabled: () => !O.value,
      selectable: B,
      dragHandle: () => V.dragHandle,
      onStart(w) {
        k.dragStart(w);
      },
      onDrag(w) {
        k.drag(w);
      },
      onStop(w) {
        k.dragStop(w);
      },
      onClick(w) {
        m(w);
      }
    }), pe = ae(() => V.class instanceof Function ? V.class(V) : V.class), ce = ae(() => {
      const w = (V.style instanceof Function ? V.style(V) : V.style) || {}, S = V.width instanceof Function ? V.width(V) : V.width, j = V.height instanceof Function ? V.height(V) : V.height;
      return !w.width && S && (w.width = typeof S == "string" ? S : `${S}px`), !w.height && j && (w.height = typeof j == "string" ? j : `${j}px`), w;
    }), Ie = tt(() => Number(V.zIndex ?? ce.value.zIndex ?? 0));
    return d((w) => {
      (w.includes(e.id) || !w.length) && oe();
    }), xt(() => {
      ze(
        () => V.hidden,
        (w = !1, S, j) => {
          !w && H.value && (e.resizeObserver.observe(H.value), j(() => {
            H.value && e.resizeObserver.unobserve(H.value);
          }));
        },
        { immediate: !0, flush: "post" }
      );
    }), ze([() => V.type, () => V.sourcePosition, () => V.targetPosition], () => {
      _t(() => {
        c([{ id: e.id, nodeElement: H.value, forceUpdate: !0 }]);
      });
    }), ze(
      [
        () => V.position.x,
        () => V.position.y,
        () => {
          var w;
          return (w = R.value) == null ? void 0 : w.computedPosition.x;
        },
        () => {
          var w;
          return (w = R.value) == null ? void 0 : w.computedPosition.y;
        },
        () => {
          var w;
          return (w = R.value) == null ? void 0 : w.computedPosition.z;
        },
        Ie,
        () => V.selected,
        () => V.dimensions.height,
        () => V.dimensions.width,
        () => {
          var w;
          return (w = R.value) == null ? void 0 : w.dimensions.height;
        },
        () => {
          var w;
          return (w = R.value) == null ? void 0 : w.dimensions.width;
        }
      ],
      ([w, S, j, K, Q, W]) => {
        const fe = {
          x: w,
          y: S,
          z: W + (h.value && V.selected ? 1e3 : 0)
        };
        typeof j < "u" && typeof K < "u" ? V.computedPosition = zE({ x: j, y: K, z: Q }, fe) : V.computedPosition = fe;
      },
      { flush: "post", immediate: !0 }
    ), ze([() => V.extent, p], ([w, S], [j, K]) => {
      (w !== j || S !== K) && Me();
    }), V.extent === "parent" || typeof V.extent == "object" && "range" in V.extent && V.extent.range === "parent" ? ql(() => ve).toBe(!0).then(Me) : Me(), () => V.hidden ? null : Xe(
      "div",
      {
        ref: H,
        "data-id": V.id,
        class: [
          "vue-flow__node",
          `vue-flow__node-${re.value === !1 ? "default" : V.type || "default"}`,
          {
            [n.value]: O.value,
            dragging: ye == null ? void 0 : ye.value,
            draggable: O.value,
            selected: V.selected,
            selectable: B.value,
            parent: V.isParent
          },
          pe.value
        ],
        style: {
          visibility: ve.value ? "visible" : "hidden",
          zIndex: V.computedPosition.z ?? Ie.value,
          transform: `translate(${V.computedPosition.x}px,${V.computedPosition.y}px)`,
          pointerEvents: de.value ? "all" : "none",
          ...ce.value
        },
        tabIndex: ie.value ? 0 : void 0,
        role: ie.value ? "button" : void 0,
        "aria-describedby": b.value ? void 0 : `${ap}-${t}`,
        "aria-label": V.ariaLabel,
        onMouseenter: Se,
        onMousemove: Ee,
        onMouseleave: ke,
        onContextmenu: $,
        onClick: m,
        onDblclick: A,
        onKeydown: y
      },
      [
        Xe(re.value === !1 ? f.value.default : re.value, {
          id: V.id,
          type: V.type,
          data: V.data,
          events: { ...V.events, ...D },
          selected: V.selected,
          resizing: V.resizing,
          dragging: ye.value,
          connectable: G.value,
          position: V.computedPosition,
          dimensions: V.dimensions,
          isValidTargetPos: V.isValidTargetPos,
          isValidSourcePos: V.isValidSourcePos,
          parent: V.parentNode,
          parentNodeId: V.parentNode,
          zIndex: V.computedPosition.z ?? Ie.value,
          targetPosition: V.targetPosition,
          sourcePosition: V.sourcePosition,
          label: V.label,
          dragHandle: V.dragHandle,
          onUpdateNodeInternals: oe
        })
      ]
    );
    function Me() {
      const w = V.computedPosition, { computedPosition: S, position: j } = Hr(
        V,
        M.value ? Hi(w, P.value) : w,
        l.error,
        p.value,
        R.value
      );
      (V.computedPosition.x !== S.x || V.computedPosition.y !== S.y) && (V.computedPosition = { ...V.computedPosition, ...S }), (V.position.x !== j.x || V.position.y !== j.y) && (V.position = j);
    }
    function oe() {
      H.value && c([{ id: e.id, nodeElement: H.value, forceUpdate: !0 }]);
    }
    function Se(w) {
      ye != null && ye.value || k.mouseEnter({ event: w, node: V });
    }
    function Ee(w) {
      ye != null && ye.value || k.mouseMove({ event: w, node: V });
    }
    function ke(w) {
      ye != null && ye.value || k.mouseLeave({ event: w, node: V });
    }
    function $(w) {
      return k.contextMenu({ event: w, node: V });
    }
    function A(w) {
      return k.doubleClick({ event: w, node: V });
    }
    function m(w) {
      B.value && (!o.value || !O.value || L.value > 0) && ir(
        V,
        i.value,
        u,
        r,
        s,
        !1,
        H.value
      ), k.click({ event: w, node: V });
    }
    function y(w) {
      if (!(nr(w) || b.value))
        if (cp.includes(w.key) && B.value) {
          const S = w.key === "Escape";
          ir(
            V,
            i.value,
            u,
            r,
            s,
            S,
            H.value
          );
        } else O.value && V.selected && Mo[w.key] && (w.preventDefault(), C.value = `Moved selected node ${w.key.replace("Arrow", "").toLowerCase()}. New position, x: ${~~V.position.x}, y: ${~~V.position.y}`, q(
          {
            x: Mo[w.key].x,
            y: Mo[w.key].y
          },
          w.shiftKey
        ));
    }
  }
}), Cx = Ex;
function xx(e = { includeHiddenNodes: !1 }) {
  const { nodes: t } = ot();
  return ae(() => {
    if (t.value.length === 0)
      return !1;
    for (const n of t.value)
      if ((e.includeHiddenNodes || !n.hidden) && ((n == null ? void 0 : n.handleBounds) === void 0 || n.dimensions.width === 0 || n.dimensions.height === 0))
        return !1;
    return !0;
  });
}
const Sx = { class: "vue-flow__nodes vue-flow__container" }, $x = {
  name: "Nodes",
  compatConfig: { MODE: 3 }
}, Ix = /* @__PURE__ */ He({
  ...$x,
  setup(e) {
    const { getNodes: t, updateNodeDimensions: n, emits: o } = ot(), s = xx(), i = te();
    return ze(
      s,
      (l) => {
        l && _t(() => {
          o.nodesInitialized(t.value);
        });
      },
      { immediate: !0 }
    ), xt(() => {
      i.value = new ResizeObserver((l) => {
        const r = l.map((u) => ({
          id: u.target.getAttribute("data-id"),
          nodeElement: u.target,
          forceUpdate: !0
        }));
        _t(() => n(r));
      });
    }), Mn(() => {
      var l;
      return (l = i.value) == null ? void 0 : l.disconnect();
    }), (l, r) => (v(), _("div", Sx, [
      i.value ? (v(!0), _(xe, { key: 0 }, Ve(U(t), (u, c, d, f) => {
        const p = [u.id];
        if (f && f.key === u.id && Dv(f, p))
          return f;
        const h = (v(), ht(U(Cx), {
          id: u.id,
          key: u.id,
          "resize-observer": i.value
        }, null, 8, ["id", "resize-observer"]));
        return h.memo = p, h;
      }, r, 0), 128)) : se("", !0)
    ]));
  }
});
function Nx() {
  const { emits: e } = ot();
  xt(() => {
    if (xp()) {
      const t = document.querySelector(".vue-flow__pane");
      t && window.getComputedStyle(t).zIndex !== "1" && e.error(new wt(vt.MISSING_STYLES));
    }
  });
}
const Tx = /* @__PURE__ */ a("div", { class: "vue-flow__edge-labels" }, null, -1), Mx = {
  name: "VueFlow",
  compatConfig: { MODE: 3 }
}, Px = /* @__PURE__ */ He({
  ...Mx,
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
    const o = e, s = Kh(), i = dl(o, "modelValue", n), l = dl(o, "nodes", n), r = dl(o, "edges", n), u = ot(o), c = uC({ modelValue: i, nodes: l, edges: r }, o, u);
    return dC(n, u.hooks), rx(), Nx(), po(ji, s), Ti(() => {
      c();
    }), t(u), (d, f) => (v(), _("div", {
      ref: U(u).vueFlowRef,
      class: "vue-flow"
    }, [
      ne(tx, null, {
        default: jn(() => [
          ne(kx),
          Tx,
          ne(Ix),
          fo(d.$slots, "zoom-pane")
        ]),
        _: 3
      }),
      fo(d.$slots, "default"),
      ne(lx)
    ], 512));
  }
}), Ox = { class: "graph-node-head" }, Ax = {
  key: 0,
  class: "level-tag"
}, Dx = ["aria-pressed", "aria-label"], El = /* @__PURE__ */ He({
  __name: "GraphNodeCard",
  props: {
    data: {},
    selected: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = { persona: pg, profile: Hl, memory: hg, rag: yg, voice: wg, live2d: Sg, extensions: bg, skill: Cg, tool: Tg, mcp: Eg }, i = !!n.data.configurable && n.data.level > 0;
    return (l, r) => (v(), _("article", {
      class: be(["graph-node", [`kind-${l.data.kind}`, `status-${l.data.status}`, { selected: l.selected }]])
    }, [
      ne(U(Gn), {
        id: "left-target",
        type: "target",
        position: U($e).Left,
        class: "graph-handle"
      }, null, 8, ["position"]),
      ne(U(Gn), {
        id: "left-source",
        type: "source",
        position: U($e).Left,
        class: "graph-handle"
      }, null, 8, ["position"]),
      ne(U(Gn), {
        id: "right-target",
        type: "target",
        position: U($e).Right,
        class: "graph-handle"
      }, null, 8, ["position"]),
      ne(U(Gn), {
        id: "right-source",
        type: "source",
        position: U($e).Right,
        class: "graph-handle"
      }, null, 8, ["position"]),
      a("div", Ox, [
        (v(), ht(Er(s[l.data.kind]), { size: 16 })),
        a("b", null, N(l.data.label), 1),
        l.data.kind === "skill" || l.data.kind === "tool" ? (v(), _("span", Ax, "L" + N(l.data.level), 1)) : se("", !0)
      ]),
      a("p", null, N(l.data.summary), 1),
      a("footer", null, [
        a("span", null, N(l.data.status === "available" ? "可用" : l.data.status === "unassigned" ? "未分配" : l.data.status === "partial" ? "部分可用" : "不可用"), 1),
        U(i) ? (v(), _("button", {
          key: 0,
          type: "button",
          class: be(["graph-switch", { on: l.data.assigned }]),
          "aria-pressed": !!l.data.assigned,
          "aria-label": `${l.data.label}能力开关`,
          onClick: r[0] || (r[0] = $t((u) => o("toggle"), ["stop"]))
        }, r[1] || (r[1] = [
          a("i", null, null, -1)
        ]), 10, Dx)) : se("", !0)
      ])
    ], 2));
  }
}), Rx = /* @__PURE__ */ He({
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
      const o = t.targetX >= t.sourceX ? 1 : -1, s = Math.abs(t.targetX - t.sourceX), i = Math.min(86, s * 0.34), l = (t.sourceX + t.targetX) / 2, r = (t.sourceY + t.targetY) / 2;
      return `M ${t.sourceX} ${t.sourceY} C ${t.sourceX + o * i} ${t.sourceY}, ${l} ${t.sourceY}, ${l} ${r} C ${l} ${t.targetY}, ${t.targetX - o * i} ${t.targetY}, ${t.targetX} ${t.targetY}`;
    });
    return (o, s) => (v(), ht(U($s), {
      path: n.value,
      class: be({ selected: o.selected })
    }, null, 8, ["path", "class"]));
  }
}), Lx = {
  class: "graph-stage",
  "aria-label": "角色能力架构画布"
}, Vx = {
  class: "graph-tools",
  "aria-label": "画布工具"
}, zx = /* @__PURE__ */ He({
  __name: "RoleGraphCanvas",
  props: {
    graph: {},
    selectedNodeId: {}
  },
  emits: ["select", "toggle", "reset"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = te([]), i = te([]), { fitView: l, zoomIn: r, zoomOut: u } = ot({ id: "role-architecture" }), c = te(!1);
    function d() {
      return new Promise((E) => requestAnimationFrame(() => requestAnimationFrame(() => E())));
    }
    function f(E) {
      const x = /* @__PURE__ */ new Set([E]), z = [E];
      for (; z.length; ) {
        const Y = z.shift();
        for (const Z of i.value)
          Z.source !== Y || x.has(Z.target) || (x.add(Z.target), z.push(Z.target));
      }
      return x;
    }
    function p(E) {
      var Y;
      let x = E;
      const z = /* @__PURE__ */ new Set();
      for (; !z.has(x); ) {
        z.add(x);
        const Z = (Y = i.value.find((H) => H.target === x)) == null ? void 0 : Y.source;
        if (!Z) return;
        if (Z === "module:extensions") return x;
        x = Z;
      }
    }
    async function h(E, x) {
      !c.value || !E.length || (await _t(), await d(), await l({ nodes: E, ...x }));
    }
    function b(E = 220) {
      const x = s.value.filter((z) => z.data.kind === "persona" || ["profile", "memory", "rag", "voice", "live2d", "extensions"].includes(z.data.kind));
      return h(x.map((z) => z.id), { padding: 0.18, minZoom: 0.68, maxZoom: 1.08, duration: E });
    }
    function C(E = 220) {
      if (n.selectedNodeId === "module:extensions") {
        const z = s.value.filter((Y) => Y.id === "module:extensions" || ["skill", "tool"].includes(Y.data.kind));
        return h(z.map((Y) => Y.id), { padding: 0.16, minZoom: 0.38, maxZoom: 0.86, duration: E });
      }
      const x = p(n.selectedNodeId);
      if (x) {
        const z = f(x);
        return z.add("module:extensions"), h([...z], { padding: 0.24, minZoom: 0.58, maxZoom: 1, duration: E });
      }
      return b(E);
    }
    ze(() => n.graph, async (E) => {
      s.value = E.nodes.map((x) => ({ ...x, selected: x.id === n.selectedNodeId })), i.value = E.edges.map((x) => ({ ...x, type: "brace", animated: !1 })), await _t(), await C();
    }, { immediate: !0, deep: !0 }), ze(() => n.selectedNodeId, (E) => s.value = s.value.map((x) => ({ ...x, selected: x.id === E })));
    function M(E) {
      o("select", E.node.id);
    }
    async function P() {
      o("reset"), await _t(), b();
    }
    async function L() {
      c.value = !0, await C(0);
    }
    return (E, x) => (v(), _("section", Lx, [
      a("div", Vx, [
        a("button", {
          type: "button",
          title: "放大",
          onClick: x[0] || (x[0] = () => U(r)())
        }, [
          ne(U(oo), { size: 16 })
        ]),
        a("button", {
          type: "button",
          title: "缩小",
          onClick: x[1] || (x[1] = () => U(u)())
        }, [
          ne(U(kg), { size: 16 })
        ]),
        a("button", {
          type: "button",
          title: "适应视图",
          onClick: x[2] || (x[2] = (z) => U(l)({ padding: 0.15, duration: 220 }))
        }, [
          ne(U(_g), { size: 16 })
        ]),
        a("button", {
          type: "button",
          title: "恢复自动布局",
          onClick: P
        }, [
          ne(U(Nr), { size: 16 })
        ])
      ]),
      ne(U(Px), {
        id: "role-architecture",
        nodes: s.value,
        "onUpdate:nodes": x[3] || (x[3] = (z) => s.value = z),
        edges: i.value,
        "onUpdate:edges": x[4] || (x[4] = (z) => i.value = z),
        "min-zoom": 0.32,
        "max-zoom": 1.8,
        "fit-view-on-init": !1,
        onInit: L,
        onNodeClick: M
      }, {
        "node-persona": jn((z) => [
          ne(El, Ki(Ks(z)), null, 16)
        ]),
        "node-module": jn((z) => [
          ne(El, Ki(Ks(z)), null, 16)
        ]),
        "node-capability": jn((z) => [
          ne(El, $r(z, {
            onToggle: (Y) => o("toggle", z.id)
          }), null, 16, ["onToggle"])
        ]),
        "edge-brace": jn((z) => [
          ne(Rx, Ki(Ks(z)), null, 16)
        ]),
        _: 1
      }, 8, ["nodes", "edges"])
    ]));
  }
}), Fx = ["disabled", "aria-expanded"], Bx = {
  key: 0,
  id: "manage-role-menu",
  class: "role-picker-menu"
}, Hx = { class: "role-search" }, Ux = {
  class: "role-list",
  role: "listbox",
  "aria-label": "选择角色"
}, jx = ["aria-selected", "disabled", "onClick"], Gx = {
  key: 0,
  class: "role-empty"
}, qx = /* @__PURE__ */ He({
  __name: "RoleNavigator",
  props: {
    personas: {},
    selectedId: {},
    disabled: { type: Boolean }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = te(null), i = te(null), l = te(!1), r = te(""), u = ae(() => n.personas.filter((b) => b.name.toLowerCase().includes(r.value.trim().toLowerCase()))), c = ae(() => n.personas.find((b) => b.id === n.selectedId));
    async function d() {
      n.disabled || (l.value = !l.value, l.value && await _t(() => {
        var b;
        return (b = i.value) == null ? void 0 : b.focus();
      }));
    }
    function f(b) {
      o("select", b), l.value = !1, r.value = "";
    }
    function p(b) {
      var C;
      (C = s.value) != null && C.contains(b.target) || (l.value = !1);
    }
    function h(b) {
      b.key === "Escape" && (l.value = !1);
    }
    return ze(() => n.disabled, (b) => {
      b && (l.value = !1);
    }), xt(() => {
      document.addEventListener("pointerdown", p), document.addEventListener("keydown", h);
    }), Mn(() => {
      document.removeEventListener("pointerdown", p), document.removeEventListener("keydown", h);
    }), (b, C) => {
      var M;
      return v(), _("div", {
        ref_key: "root",
        ref: s,
        class: "role-picker"
      }, [
        a("button", {
          type: "button",
          class: "role-picker-trigger",
          disabled: b.disabled || !b.personas.length,
          "aria-haspopup": "listbox",
          "aria-expanded": l.value,
          "aria-controls": "manage-role-menu",
          onClick: d
        }, [
          ne(U(Hl), { size: 17 }),
          a("strong", null, N(((M = c.value) == null ? void 0 : M.name) || "角色管理"), 1),
          ne(U(gg), { size: 15 })
        ], 8, Fx),
        l.value ? (v(), _("div", Bx, [
          a("label", Hx, [
            ne(U(Zs), { size: 15 }),
            De(a("input", {
              ref_key: "searchInput",
              ref: i,
              "onUpdate:modelValue": C[0] || (C[0] = (P) => r.value = P),
              placeholder: "查找角色",
              "aria-label": "查找角色"
            }, null, 512), [
              [Ge, r.value]
            ])
          ]),
          a("div", Ux, [
            (v(!0), _(xe, null, Ve(u.value, (P) => {
              var L;
              return v(), _("button", {
                key: P.id,
                type: "button",
                role: "option",
                "aria-selected": P.id === b.selectedId,
                disabled: b.disabled,
                class: be({ active: P.id === b.selectedId }),
                onClick: (E) => f(P.id)
              }, [
                ne(U(Hl), { size: 17 }),
                a("span", null, [
                  a("b", null, N(P.name), 1),
                  a("small", null, N(((L = P.profile) == null ? void 0 : L.description) || "尚未填写人设"), 1)
                ])
              ], 10, jx);
            }), 128)),
            u.value.length ? se("", !0) : (v(), _("p", Gx, "没有匹配的角色"))
          ])
        ])) : se("", !0)
      ], 512);
    };
  }
}), Yx = { class: "version-panel-layer" }, Xx = {
  class: "version-panel",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "version-panel-title"
}, Kx = { class: "version-panel-header" }, Wx = { class: "version-panel-kicker" }, Zx = { id: "version-panel-title" }, Jx = {
  key: 0,
  class: "version-message is-error"
}, Qx = { class: "version-panel-toolbar" }, eS = ["disabled"], tS = ["disabled"], nS = {
  key: 0,
  class: "version-form-hint"
}, oS = { class: "version-form-actions" }, sS = ["disabled"], iS = ["disabled"], lS = {
  key: 2,
  class: "version-empty"
}, rS = {
  key: 3,
  class: "version-empty"
}, aS = {
  key: 4,
  class: "version-body"
}, uS = {
  class: "version-list",
  role: "listbox",
  "aria-label": "角色版本历史"
}, cS = ["aria-selected", "disabled", "onClick"], dS = { class: "version-number" }, fS = { class: "version-item-copy" }, pS = { class: "version-detail" }, hS = { class: "version-detail-heading" }, vS = {
  key: 0,
  class: "version-note"
}, gS = {
  key: 1,
  class: "version-detail-loading"
}, mS = {
  key: 2,
  class: "version-facts"
}, yS = {
  key: 3,
  class: "version-detail-loading"
}, bS = { class: "version-action-row" }, _S = ["disabled"], wS = ["disabled"], kS = {
  key: 2,
  class: "version-current"
}, ES = {
  key: 4,
  class: "version-published"
}, CS = {
  key: 5,
  class: "version-panel-footnote"
}, xS = /* @__PURE__ */ He({
  __name: "VersionPanel",
  props: {
    personaId: {},
    personaName: {},
    disabled: { type: Boolean }
  },
  emits: ["close", "changed"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = te([]), i = te(""), l = te(null), r = te(!1), u = te(!1), c = te(""), d = te(""), f = te(!1), p = te(""), h = te("");
    let b = 0;
    const C = ae(() => r.value || u.value || !!c.value), M = ae(() => s.value.find((O) => O.id === i.value)), P = ae(() => {
      var O;
      return (O = l.value) == null ? void 0 : O.snapshot;
    }), L = ae(() => {
      var O;
      return Object.keys(((O = P.value) == null ? void 0 : O.capability_overrides) || {}).length;
    }), E = ae(() => {
      var O, B;
      return ((B = (O = P.value) == null ? void 0 : O.document_ids) == null ? void 0 : B.length) || 0;
    }), x = ae(() => {
      var O;
      return ((O = P.value) == null ? void 0 : O.mcp_server_names) || [];
    });
    function z(O) {
      return { draft: "草稿", published: "已发布", superseded: "已替代", archived: "已归档" }[O] || O;
    }
    function Y(O) {
      return `is-${O}`;
    }
    function Z(O) {
      if (!O) return "—";
      const B = new Date(O);
      return Number.isNaN(B.getTime()) ? O : new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(B);
    }
    function H(O) {
      return O instanceof Tr && O.status === 404 ? "版本接口尚未启用，请先启用角色版本 API。" : O instanceof Error ? O.message : String(O);
    }
    async function T() {
      const O = ++b;
      if (s.value = [], i.value = "", l.value = null, d.value = "", !!n.personaId) {
        r.value = !0;
        try {
          const B = await qg(n.personaId);
          if (O !== b) return;
          s.value = B, B.length && await X(B[0].id, O);
        } catch (B) {
          O === b && (d.value = H(B));
        } finally {
          O === b && (r.value = !1);
        }
      }
    }
    async function X(O, B = b) {
      i.value = O, l.value = null, d.value = "", u.value = !0;
      try {
        const G = await Yg(n.personaId, O);
        B === b && (l.value = G);
      } catch (G) {
        B === b && (d.value = H(G));
      } finally {
        B === b && (u.value = !1);
      }
    }
    function q() {
      var O;
      n.disabled || C.value || (f.value = !0, p.value = `版本 ${Math.max(((O = s.value[0]) == null ? void 0 : O.version_number) || 0, 0) + 1}`, h.value = "");
    }
    function V() {
      c.value || (f.value = !1);
    }
    async function R() {
      if (!(n.disabled || C.value)) {
        c.value = "create", d.value = "";
        try {
          const O = await Xg(n.personaId, { label: p.value, note: h.value });
          f.value = !1, s.value = [O, ...s.value.filter((B) => B.id !== O.id)], i.value = O.id, l.value = O, o("changed", O);
        } catch (O) {
          d.value = H(O);
        } finally {
          c.value = "";
        }
      }
    }
    function k(O) {
      s.value = s.value.map((B) => B.id === O.id ? O : B), i.value = O.id, l.value = O;
    }
    async function D(O) {
      const B = i.value;
      if (!(!B || n.disabled || C.value) && !(O === "rollback" && !window.confirm("确定回滚到这个角色版本？当前未保存的运行配置不会自动保留。"))) {
        c.value = B, d.value = "";
        try {
          const G = O === "publish" ? await Kg(n.personaId, B) : await Wg(n.personaId, B);
          k(G), o("changed", G), await T();
        } catch (G) {
          d.value = H(G);
        } finally {
          c.value = "";
        }
      }
    }
    return ze(() => n.personaId, () => {
      T();
    }, { immediate: !0 }), (O, B) => {
      var G, ie, de, ve, re, ye, pe;
      return v(), _("div", Yx, [
        a("button", {
          type: "button",
          class: "version-panel-backdrop",
          "aria-label": "关闭版本面板",
          onClick: B[0] || (B[0] = (ce) => o("close"))
        }),
        a("section", Xx, [
          a("header", Kx, [
            a("div", null, [
              a("span", Wx, [
                ne(U(tf), { size: 13 }),
                B[6] || (B[6] = _e("运行版本"))
              ]),
              a("h2", Zx, N(O.personaName || "当前角色"), 1),
              B[7] || (B[7] = a("p", null, "保存和切换角色的运行配置", -1))
            ]),
            a("button", {
              type: "button",
              class: "icon-button",
              "aria-label": "关闭版本面板",
              onClick: B[1] || (B[1] = (ce) => o("close"))
            }, [
              ne(U(Gt), { size: 17 })
            ])
          ]),
          d.value ? (v(), _("p", Jx, N(d.value), 1)) : se("", !0),
          a("div", Qx, [
            a("span", null, N(s.value.length ? `${s.value.length} 个版本` : "版本历史"), 1),
            a("div", null, [
              a("button", {
                type: "button",
                class: "text-button",
                disabled: C.value,
                onClick: T
              }, [
                ne(U(qt), { size: 14 }),
                B[8] || (B[8] = _e("刷新"))
              ], 8, eS),
              a("button", {
                type: "button",
                class: "text-button is-primary",
                disabled: O.disabled || C.value,
                onClick: q
              }, [
                ne(U(oo), { size: 14 }),
                B[9] || (B[9] = _e("创建"))
              ], 8, tS)
            ])
          ]),
          f.value ? (v(), _("form", {
            key: 1,
            class: "version-create-form",
            onSubmit: $t(R, ["prevent"])
          }, [
            a("label", null, [
              B[10] || (B[10] = a("span", null, "版本名称", -1)),
              De(a("input", {
                "onUpdate:modelValue": B[2] || (B[2] = (ce) => p.value = ce),
                maxlength: "255",
                placeholder: "例如：稳定版"
              }, null, 512), [
                [Ge, p.value]
              ])
            ]),
            a("label", null, [
              B[11] || (B[11] = a("span", null, "备注", -1)),
              De(a("textarea", {
                "onUpdate:modelValue": B[3] || (B[3] = (ce) => h.value = ce),
                rows: "2",
                maxlength: "5000",
                placeholder: "记录这次配置的变化"
              }, null, 512), [
                [Ge, h.value]
              ])
            ]),
            O.disabled ? (v(), _("p", nS, "请先保存顶部的角色配置，再创建版本。")) : se("", !0),
            a("div", oS, [
              a("button", {
                type: "button",
                class: "text-button",
                disabled: !!c.value,
                onClick: V
              }, "取消", 8, sS),
              a("button", {
                type: "submit",
                class: "text-button is-primary",
                disabled: O.disabled || C.value
              }, N(c.value === "create" ? "创建中…" : "保存版本"), 9, iS)
            ])
          ], 32)) : se("", !0),
          r.value ? (v(), _("div", lS, "正在读取版本历史…")) : !s.value.length && !d.value ? (v(), _("div", rS, [
            ne(U(fg), { size: 22 }),
            B[12] || (B[12] = a("strong", null, "还没有保存的运行版本", -1)),
            B[13] || (B[13] = a("span", null, "创建版本会记录当前已保存的角色配置。", -1))
          ])) : s.value.length ? (v(), _("div", aS, [
            a("div", uS, [
              (v(!0), _(xe, null, Ve(s.value, (ce) => (v(), _("button", {
                key: ce.id,
                type: "button",
                class: be(["version-item", { selected: ce.id === i.value }]),
                "aria-selected": ce.id === i.value,
                role: "option",
                disabled: C.value,
                onClick: (Ie) => X(ce.id)
              }, [
                a("span", dS, "v" + N(ce.version_number), 1),
                a("span", fS, [
                  a("strong", null, N(ce.label || `版本 ${ce.version_number}`), 1),
                  a("small", null, N(Z(ce.created_at)), 1)
                ]),
                a("span", {
                  class: be(["version-status", Y(ce.status)])
                }, N(z(ce.status)), 3)
              ], 10, cS))), 128))
            ]),
            a("div", pS, [
              a("div", hS, [
                a("div", null, [
                  B[14] || (B[14] = a("span", null, "当前选择", -1)),
                  a("strong", null, N(((G = M.value) == null ? void 0 : G.label) || `版本 ${((ie = M.value) == null ? void 0 : ie.version_number) || ""}`), 1)
                ]),
                a("span", {
                  class: be(["version-status", Y(((de = M.value) == null ? void 0 : de.status) || "draft")])
                }, N(z(((ve = M.value) == null ? void 0 : ve.status) || "draft")), 3)
              ]),
              (re = M.value) != null && re.note ? (v(), _("p", vS, N(M.value.note), 1)) : se("", !0),
              u.value ? (v(), _("div", gS, "正在读取快照…")) : P.value ? (v(), _("dl", mS, [
                a("div", null, [
                  B[15] || (B[15] = a("dt", null, "角色名称", -1)),
                  a("dd", null, N(P.value.name), 1)
                ]),
                a("div", null, [
                  B[16] || (B[16] = a("dt", null, "知识库", -1)),
                  a("dd", null, N(P.value.knowledge_space_id || "未绑定"), 1)
                ]),
                a("div", null, [
                  B[17] || (B[17] = a("dt", null, "资料", -1)),
                  a("dd", null, N(E.value) + " 份资料", 1)
                ]),
                a("div", null, [
                  B[18] || (B[18] = a("dt", null, "能力策略", -1)),
                  a("dd", null, N(L.value) + " 项能力", 1)
                ]),
                a("div", null, [
                  B[19] || (B[19] = a("dt", null, "MCP 授权", -1)),
                  a("dd", null, N(x.value.length ? x.value.join("、") : "无"), 1)
                ])
              ])) : (v(), _("p", yS, "暂无快照详情")),
              a("div", bS, [
                ((ye = M.value) == null ? void 0 : ye.status) === "draft" ? (v(), _("button", {
                  key: 0,
                  type: "button",
                  class: "version-action is-primary",
                  disabled: O.disabled || C.value,
                  onClick: B[4] || (B[4] = (ce) => D("publish"))
                }, [
                  ne(U(Ig), { size: 14 }),
                  B[20] || (B[20] = _e("发布版本"))
                ], 8, _S)) : M.value && M.value.status !== "published" ? (v(), _("button", {
                  key: 1,
                  type: "button",
                  class: "version-action",
                  disabled: O.disabled || C.value,
                  onClick: B[5] || (B[5] = (ce) => D("rollback"))
                }, [
                  ne(U(Nr), { size: 14 }),
                  B[21] || (B[21] = _e("回滚到此版本"))
                ], 8, wS)) : (v(), _("span", kS, [
                  ne(U(ro), { size: 14 }),
                  B[22] || (B[22] = _e("这是当前发布版本"))
                ]))
              ]),
              (pe = M.value) != null && pe.published_at ? (v(), _("p", ES, [
                ne(U(mg), { size: 13 }),
                _e("发布于 " + N(Z(M.value.published_at)), 1)
              ])) : se("", !0)
            ])
          ])) : se("", !0),
          !d.value && O.disabled && s.value.length ? (v(), _("p", CS, "顶部存在未保存修改时，版本操作会暂时停用。")) : se("", !0)
        ])
      ]);
    };
  }
}), qr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, SS = /* @__PURE__ */ qr(xS, [["__scopeId", "data-v-81aec505"]]);
function $S(e, t, n) {
  const o = {
    ...e,
    capabilities: {
      ...e.capabilities,
      overrides: { ...e.capabilities.overrides }
    },
    grants: { servers: e.grants.servers.map((l) => ({ ...l })) }
  }, s = e.capabilities.packages.find((l) => l.id === t);
  if (!s || (n === "inherit" ? delete o.capabilities.overrides[t] : o.capabilities.overrides[t] = n === "allow", n !== "allow")) return o;
  for (const l of s.dependencies)
    l.id && (o.capabilities.overrides[l.id] = !0);
  const i = new Set(s.required_servers);
  return o.grants.servers.forEach((l) => {
    !l.global && i.has(l.name) && (l.authorized = !0);
  }), o;
}
async function IS(e) {
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
function NS(e, t, n) {
  const o = bt(e);
  return n.has("profile") && (o.persona = bt(t.persona)), n.has("capabilities") && (o.capabilities.overrides = bt(t.capabilities.overrides)), n.has("grants") && (o.grants.servers = bt(t.grants.servers)), o;
}
function TS() {
  const e = te([]), t = te(""), n = te(null), o = te(null), s = te(""), i = te(/* @__PURE__ */ new Set()), l = te(!1), r = te(!1), u = te(!1), c = te(""), d = te(""), f = ae(() => i.value.size > 0);
  async function p() {
    if (!l.value) {
      l.value = !0, c.value = "";
      try {
        e.value = await sl();
        const R = t.value || sessionStorage.getItem("charactoid.manage.persona"), k = e.value.find((D) => D.id === R) || e.value[0];
        k && await b(k.id, !0);
      } catch (R) {
        c.value = R instanceof Error ? R.message : String(R);
      } finally {
        l.value = !1;
      }
    }
  }
  async function h() {
    f.value || l.value || r.value || u.value || await p();
  }
  async function b(R, k = !1) {
    if (!k && (r.value || u.value)) {
      d.value = "当前操作完成后才能切换角色";
      return;
    }
    if (!k && f.value && !window.confirm("当前角色有未保存修改，放弃后切换角色？")) return;
    const D = e.value.find((O) => O.id === R);
    if (D) {
      l.value = !0, c.value = "", d.value = "";
      try {
        const O = await xu(D);
        n.value = O, o.value = bt(O), t.value = R, s.value = `persona:${R}`, i.value = /* @__PURE__ */ new Set(), sessionStorage.setItem("charactoid.manage.persona", R);
      } catch (O) {
        c.value = O instanceof Error ? O.message : String(O);
      } finally {
        l.value = !1;
      }
    }
  }
  function C(R) {
    s.value = R;
  }
  function M(R) {
    o.value && (o.value.persona = bt(R), i.value = new Set(i.value).add("profile"));
  }
  function P(R, k) {
    if (!o.value) return;
    o.value = $S(o.value, R, k);
    const D = new Set(i.value);
    D.add("capabilities"), D.add("grants"), i.value = D;
  }
  function L(R, k) {
    if (!o.value) return;
    const D = o.value.grants.servers.find((O) => O.name === R);
    D && !D.global && (D.authorized = k), i.value = new Set(i.value).add("grants");
  }
  function E() {
    n.value && (o.value = bt(n.value), i.value = /* @__PURE__ */ new Set(), d.value = "已撤销本轮修改");
  }
  async function x() {
    if (!o.value || !n.value) return;
    const R = await of(o.value.persona.id);
    o.value.documents = R, n.value.documents = bt(R);
  }
  async function z() {
    if (!(!o.value || !n.value || u.value)) {
      u.value = !0, c.value = "", d.value = "正在扫描 Live2D 模型...";
      try {
        const R = await sf();
        o.value.resources = { ...o.value.resources || { voiceAssets: [], live2dModels: [] }, live2dModels: R }, n.value.resources = { ...n.value.resources || { voiceAssets: [], live2dModels: [] }, live2dModels: bt(R) }, d.value = `已发现 ${R.length} 个 Live2D 模型`;
      } catch (R) {
        c.value = R instanceof Error ? R.message : String(R);
      } finally {
        u.value = !1;
      }
    }
  }
  async function Y() {
    if (!u.value) {
      u.value = !0, c.value = "";
      try {
        await Lg(), d.value = "已打开 Live2D 模型文件夹";
      } catch (R) {
        c.value = R instanceof Error ? R.message : String(R);
      } finally {
        u.value = !1;
      }
    }
  }
  function Z(R, k = 10) {
    k <= 0 || window.setTimeout(async () => {
      var D;
      if (((D = o.value) == null ? void 0 : D.persona.id) === R)
        try {
          await x(), o.value.documents.some((B) => ["converting", "preview_ready", "indexing"].includes(String(B.status))) && Z(R, k - 1);
        } catch {
        }
    }, 1400);
  }
  async function H(R, k) {
    if (!o.value || !R.length && !k.trim() || u.value) return !1;
    u.value = !0, c.value = "", d.value = "正在写入角色知识库...";
    try {
      const D = o.value.persona.id;
      return await Hg(o.value.persona, R, k), await x(), Z(D), d.value = "资料已提交，正在建立索引", !0;
    } catch (D) {
      return c.value = D instanceof Error ? D.message : String(D), !1;
    } finally {
      u.value = !1;
    }
  }
  async function T(R) {
    u.value = !0, c.value = "";
    try {
      await Ug(R), await x(), d.value = "资料已删除";
    } catch (k) {
      c.value = k instanceof Error ? k.message : String(k);
    } finally {
      u.value = !1;
    }
  }
  async function X(R) {
    var k;
    u.value = !0, c.value = "";
    try {
      const D = ((k = o.value) == null ? void 0 : k.persona.id) || "";
      await jg(R), await x(), D && Z(D), d.value = "已重新提交索引";
    } catch (D) {
      c.value = D instanceof Error ? D.message : String(D);
    } finally {
      u.value = !1;
    }
  }
  async function q() {
    if (o.value) {
      u.value = !0, c.value = "";
      try {
        const R = o.value.persona.id;
        await Bg(R), e.value = (await sl()).filter((k) => k.id !== R), n.value = null, o.value = null, t.value = "", i.value = /* @__PURE__ */ new Set(), e.value[0] && await b(e.value[0].id, !0), d.value = "角色已删除";
      } catch (R) {
        c.value = R instanceof Error ? R.message : String(R);
      } finally {
        u.value = !1;
      }
    }
  }
  async function V() {
    if (!o.value || !f.value) return;
    r.value = !0, c.value = "", d.value = "";
    const R = bt(o.value), k = {};
    i.value.has("profile") && (k.profile = () => Vg(R.persona)), i.value.has("capabilities") && (k.capabilities = () => zg(R.persona.id, R.capabilities.overrides)), i.value.has("grants") && (k.grants = () => Fg(R.persona.id, R.grants.servers));
    const D = await IS(k), O = new Set(D.failedDomains.map((B) => B.domain));
    if (i.value = O, D.savedDomains.length)
      try {
        e.value = await sl();
        const B = e.value.find((ie) => ie.id === R.persona.id) || R.persona, G = await xu(B);
        n.value = G, o.value = NS(G, R, O);
      } catch (B) {
        const G = bt(n.value || R);
        D.savedDomains.includes("profile") && (G.persona = bt(R.persona)), D.savedDomains.includes("capabilities") && (G.capabilities.overrides = bt(R.capabilities.overrides)), D.savedDomains.includes("grants") && (G.grants.servers = bt(R.grants.servers)), n.value = G, o.value = R, c.value = `配置已保存，但刷新失败：${B instanceof Error ? B.message : String(B)}`;
      }
    D.ok ? d.value = "角色配置已保存" : c.value = D.failedDomains.map((B) => `${B.domain}: ${B.message}`).join("；"), r.value = !1;
  }
  return { personas: e, selectedPersonaId: t, snapshot: n, draft: o, selectedNodeId: s, dirtyDomains: i, loading: l, isSaving: r, operationPending: u, error: c, message: d, isDirty: f, initialize: p, refreshIfClean: h, selectPersona: b, selectNode: C, updateProfile: M, setCapability: P, setServer: L, discard: E, save: V, addDocuments: H, removeDocument: T, reindexDocument: X, refreshLive2dResources: z, openLive2dDirectory: Y, removeCurrentPersona: q };
}
const MS = { class: "workbench-toolbar" }, PS = { class: "toolbar-identity" }, OS = { class: "toolbar-actions" }, AS = {
  key: 0,
  class: "dirty-state"
}, DS = ["disabled"], RS = ["disabled"], LS = ["disabled"], VS = {
  key: 0,
  class: "workbench-message error"
}, zS = {
  key: 1,
  class: "workbench-message"
}, FS = { class: "workbench-content" }, BS = { class: "workbench-canvas-region" }, HS = {
  key: 0,
  class: "workbench-loading"
}, US = {
  key: 1,
  class: "workbench-empty"
}, jS = /* @__PURE__ */ He({
  __name: "App",
  setup(e) {
    const t = TS(), n = te(0), o = te(0), s = te(!1), i = ae(() => t.isSaving.value || t.operationPending.value), l = ae(() => {
      var q, V, R, k;
      return !!((V = (q = t.draft.value) == null ? void 0 : q.persona.profile) != null && V.builtin || (k = (R = t.draft.value) == null ? void 0 : R.persona.profile) != null && k.guide);
    }), r = ae(() => t.draft.value ? tm(t.draft.value) : { nodes: [], edges: [] }), u = ae(() => (n.value, r_(c_(r.value, t.selectedNodeId.value)))), c = ae(() => r.value.nodes.find((q) => q.id === t.selectedNodeId.value));
    function d(q) {
      const V = u.value.nodes.find((R) => R.id === q);
      if (V != null && V.data.configurable) {
        if (V.data.kind === "mcp" && V.data.sourceId) {
          t.setServer(V.data.sourceId, !V.data.assigned);
          return;
        }
        t.setCapability(q, V.data.assigned ? "deny" : "allow");
      }
    }
    async function f() {
      var V, R, k;
      const q = (R = (V = t.draft.value) == null ? void 0 : V.persona.profile) == null ? void 0 : R.tts;
      if (q != null && q.voice_asset_id)
        try {
          const D = await Gg(q.voice_asset_id, q.output_language || "auto"), O = new Audio(URL.createObjectURL(D)), B = (k = window.PL) == null ? void 0 : k.audio;
          B ? await B.play(O) : await O.play();
        } catch (D) {
          t.error.value = D instanceof Error ? D.message : String(D);
        }
    }
    function p() {
      var q;
      (q = document.querySelector('[data-view="voice"]')) == null || q.click();
    }
    function h() {
      window.location.hash = "#knowledge-eval";
    }
    function b() {
      !t.draft.value || i.value || (s.value = !s.value);
    }
    function C() {
      s.value = !1;
    }
    async function M() {
      await t.refreshIfClean();
    }
    async function P() {
      var V;
      if (l.value) return;
      const q = (V = t.draft.value) == null ? void 0 : V.persona.name;
      !q || !window.confirm(`永久删除“${q}”及其资料、记忆、向量和对话？此操作无法恢复。`) || await t.removeCurrentPersona();
    }
    async function L(q) {
      window.confirm("从角色资料中删除该文件？知识库向量与本地文件将一并移除。") && await t.removeDocument(q);
    }
    async function E(q, V) {
      await t.addDocuments(q, V) && (o.value += 1);
    }
    function x(q, V) {
      var D, O;
      const R = document.querySelector("#preview-title"), k = document.querySelector("#preview-content");
      !R || !k || (R.textContent = q, k.replaceChildren(typeof V == "string" ? document.createTextNode(V) : V), (D = document.querySelector("#preview-drawer")) == null || D.classList.add("is-open"), (O = document.querySelector("#preview-backdrop")) == null || O.classList.add("is-open"));
    }
    function z() {
      var q, V;
      (q = document.querySelector("#preview-drawer")) == null || q.classList.remove("is-open"), (V = document.querySelector("#preview-backdrop")) == null || V.classList.remove("is-open");
    }
    function Y(q) {
      x(String(q.original_filename || q.original_name || "资料预览"), String(q.markdown_preview || q.error_message || "暂无预览内容"));
    }
    async function Z(q) {
      if (q.type.startsWith("image/")) {
        const R = document.createElement("img"), k = URL.createObjectURL(q);
        R.src = k, R.alt = q.name, R.style.maxWidth = "100%", R.onload = () => URL.revokeObjectURL(k), x(q.name, R);
        return;
      }
      const V = q.type.startsWith("text/") || /\.(md|txt|json|csv|ya?ml)$/i.test(q.name);
      x(q.name, V ? await q.text() : "该文件将在上传转换后提供 Markdown 预览。");
    }
    function H(q) {
      t.isDirty.value && (q.preventDefault(), q.returnValue = "");
    }
    function T(q) {
      var R;
      const V = ((R = q == null ? void 0 : q.detail) == null ? void 0 : R.nodeId) || sessionStorage.getItem("charactoid.manage.node");
      V && (sessionStorage.removeItem("charactoid.manage.node"), t.selectNode(V));
    }
    async function X() {
      await t.refreshIfClean(), T();
    }
    return ze(() => t.selectedPersonaId.value, () => {
      s.value = !1;
    }), xt(async () => {
      var q, V, R;
      await t.initialize(), T(), window.addEventListener("beforeunload", H), (q = document.querySelector("#role-workbench-root")) == null || q.addEventListener("charactoid:manage-show", X), document.addEventListener("charactoid:manage-select-node", T), (V = document.querySelector("#close-preview")) == null || V.addEventListener("click", z), (R = document.querySelector("#preview-backdrop")) == null || R.addEventListener("click", z);
    }), Mn(() => {
      var q, V, R;
      window.removeEventListener("beforeunload", H), (q = document.querySelector("#role-workbench-root")) == null || q.removeEventListener("charactoid:manage-show", X), document.removeEventListener("charactoid:manage-select-node", T), (V = document.querySelector("#close-preview")) == null || V.removeEventListener("click", z), (R = document.querySelector("#preview-backdrop")) == null || R.removeEventListener("click", z);
    }), (q, V) => (v(), _("div", {
      class: be(["role-workbench", { "is-busy": i.value }])
    }, [
      a("header", MS, [
        a("div", PS, [
          ne(qx, {
            personas: U(t).personas.value,
            "selected-id": U(t).selectedPersonaId.value,
            disabled: i.value,
            onSelect: U(t).selectPersona
          }, null, 8, ["personas", "selected-id", "disabled", "onSelect"]),
          V[3] || (V[3] = a("p", null, "角色运行架构与能力配置", -1))
        ]),
        a("div", OS, [
          U(t).isDirty.value ? (v(), _("span", AS, "存在未保存修改")) : se("", !0),
          a("button", {
            type: "button",
            class: be({ active: s.value }),
            disabled: !U(t).draft.value || i.value,
            onClick: b
          }, [
            ne(U(tf), { size: 16 }),
            V[4] || (V[4] = _e("运行版本"))
          ], 10, DS),
          a("button", {
            type: "button",
            disabled: !U(t).isDirty.value || U(t).isSaving.value || U(t).operationPending.value,
            onClick: V[0] || (V[0] = //@ts-ignore
            (...R) => U(t).discard && U(t).discard(...R))
          }, [
            ne(U(Ng), { size: 16 }),
            V[5] || (V[5] = _e("撤销"))
          ], 8, RS),
          a("button", {
            type: "button",
            class: "primary",
            disabled: !U(t).isDirty.value || U(t).isSaving.value || U(t).operationPending.value,
            onClick: V[1] || (V[1] = //@ts-ignore
            (...R) => U(t).save && U(t).save(...R))
          }, [
            ne(U(Fl), { size: 16 }),
            _e(N(U(t).isSaving.value ? "保存中" : "保存配置"), 1)
          ], 8, LS)
        ])
      ]),
      U(t).error.value ? (v(), _("p", VS, N(U(t).error.value), 1)) : U(t).message.value ? (v(), _("p", zS, N(U(t).message.value), 1)) : se("", !0),
      a("div", FS, [
        a("main", BS, [
          U(t).loading.value ? (v(), _("div", HS, "正在读取角色架构...")) : U(t).personas.value.length ? (v(), ht(zx, {
            key: 2,
            graph: u.value,
            "selected-node-id": U(t).selectedNodeId.value,
            onSelect: U(t).selectNode,
            onToggle: d,
            onReset: V[2] || (V[2] = (R) => n.value++)
          }, null, 8, ["graph", "selected-node-id", "onSelect"])) : (v(), _("div", US, V[6] || (V[6] = [
            a("strong", null, "还没有角色", -1),
            a("p", null, "先在“创建角色”页面建立角色。", -1)
          ])))
        ]),
        U(t).draft.value ? (v(), ht(L0, {
          key: 0,
          node: c.value,
          draft: U(t).draft.value,
          disabled: i.value,
          "upload-complete-token": o.value,
          onProfile: U(t).updateProfile,
          onCapability: U(t).setCapability,
          onServer: U(t).setServer,
          onUpload: E,
          onDeleteDocument: L,
          onRetryDocument: U(t).reindexDocument,
          "can-delete": !l.value,
          onDeletePersona: P,
          onPreviewVoice: f,
          onOpenVoiceStudio: p,
          onOpenRagEval: h,
          onPreviewDocument: Y,
          onPreviewLocalFile: Z,
          onRefreshLive2d: U(t).refreshLive2dResources,
          onOpenLive2dDirectory: U(t).openLive2dDirectory
        }, null, 8, ["node", "draft", "disabled", "upload-complete-token", "onProfile", "onCapability", "onServer", "onRetryDocument", "can-delete", "onRefreshLive2d", "onOpenLive2dDirectory"])) : se("", !0)
      ]),
      s.value && U(t).draft.value ? (v(), ht(SS, {
        key: 2,
        "persona-id": U(t).draft.value.persona.id,
        "persona-name": U(t).draft.value.persona.name,
        disabled: i.value || U(t).isDirty.value,
        onClose: C,
        onChanged: M
      }, null, 8, ["persona-id", "persona-name", "disabled"])) : se("", !0)
    ], 2));
  }
});
let zn = null;
function u4(e = "#role-workbench-root") {
  if (zn) return zn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("角色工作台挂载点不存在");
  return zn = Cs(jS), zn.mount(t), zn;
}
function c4() {
  var e;
  (e = document.querySelector("#role-workbench-root")) == null || e.dispatchEvent(new CustomEvent("charactoid:manage-show"));
}
function d4() {
  zn && (zn.unmount(), zn = null);
}
async function je(e, t) {
  const n = await fetch(e, t), s = (n.headers.get("content-type") || "").includes("application/json") ? await n.json() : await n.text();
  if (!n.ok) {
    const i = typeof s == "object" && s && "detail" in s ? s.detail : s;
    throw new Error(typeof i == "string" ? i : `请求失败（${n.status}）`);
  }
  return s;
}
function it(e) {
  return e instanceof Error ? e.message : String(e || "操作失败");
}
const GS = [
  { id: "assign", label: "角色分配(Assign)" },
  { id: "overview", label: "总览(Overview)" },
  { id: "skills", label: "技能(Skill)" },
  { id: "mcp", label: "MCP服务(MCP)" },
  { id: "tools", label: "工具(Tool)" },
  { id: "catalog", label: "扩展目录(Catalog)" }
], qS = {
  knowledge_worker: "知识(Knowledge)",
  memory_worker: "记忆(Memory)",
  document_worker: "文档(Document)",
  profile_worker: "人设(Profile)",
  voice_worker: "语音(Voice)",
  rvc_worker: "变声(RVC)",
  live2d_worker: "Live2D",
  config_worker: "配置(Config)",
  mcp: "MCP"
};
function YS(e) {
  const t = e.skills || [], n = e.servers || [], o = e.tools || [], s = t.filter((u) => u.enabled).length, i = n.filter((u) => {
    var c;
    return u.enabled && ((c = u.status) == null ? void 0 : c.status) === "connected";
  }).length, l = n.filter((u) => {
    var c, d;
    return ((c = u.status) == null ? void 0 : c.status) === "error" || u.enabled && ((d = u.status) == null ? void 0 : d.status) !== "connected";
  }).length, r = t.filter((u) => !u.builtin && !u.trusted).length;
  return { enabledSkills: s, mcpOnline: i, mcpIssues: l, toolCount: o.length, attentionCount: l + r };
}
function Lc(e) {
  const t = {};
  for (const n of e.split(/\r?\n/)) {
    const o = n.trim();
    if (!o) continue;
    const s = o.indexOf("="), i = o.indexOf(":"), l = s > 0 && (i < 0 || s < i) ? s : i;
    l > 0 && (t[o.slice(0, l).trim()] = o.slice(l + 1).trim());
  }
  return t;
}
function Vc(e) {
  return Object.entries(e || {}).map(([t, n]) => `${t}=${n}`).join(`
`);
}
function zc(e) {
  const t = String(e || "").replace(/^#/, ""), n = t.startsWith("capabilities-") ? t.slice(13) : t === "capabilities" ? "assign" : t;
  return n === "overview" || n === "assign" || n === "skills" || n === "mcp" || n === "tools" || n === "catalog" ? n : "assign";
}
function XS(e) {
  var n;
  const t = {};
  for (const o of e || []) {
    const s = ((n = o.metadata) == null ? void 0 : n.category) || (o.builtin ? "内置" : "自定义");
    (t[s] || (t[s] = [])).push(o);
  }
  return Object.entries(t).sort(([o], [s]) => o.localeCompare(s, "zh"));
}
function KS(e) {
  return e ? qS[e] || e : "其他";
}
function Fc(e, t = []) {
  const n = /* @__PURE__ */ new Map();
  for (const s of t || [])
    for (const i of s.tool_names || []) {
      const l = n.get(i) || [];
      l.push(s.name), n.set(i, l);
    }
  const o = {};
  for (const s of e || []) {
    const i = { ...s, usedBy: n.get(s.name) || [] }, l = s.source === "mcp" || s.specialist === "mcp" ? "MCP" : KS(s.specialist);
    (o[l] || (o[l] = [])).push(i);
  }
  return Object.entries(o).sort(([s], [i]) => s.localeCompare(i, "zh"));
}
function WS(e, t) {
  var o, s, i;
  const n = [];
  for (const l of e.skills || [])
    !l.builtin && !l.trusted && n.push({ kind: "skill", name: l.name, detail: "未信任的自定义技能，默认不启用脚本", tab: "skills" });
  for (const l of e.servers || [])
    ((o = l.status) == null ? void 0 : o.status) === "error" ? n.push({ kind: "mcp", name: l.name, detail: ((s = l.status) == null ? void 0 : s.error) || "连接失败", tab: "mcp" }) : l.enabled && ((i = l.status) == null ? void 0 : i.status) !== "connected" && n.push({ kind: "mcp", name: l.name, detail: "已启用但尚未连上", tab: "mcp" });
  if (t)
    for (const l of t.items || [])
      l.kind === "skill" && !l.builtin && _i(l, t) === "未分配" && n.push({ kind: "skill", name: l.name, detail: "自定义技能尚未分配给任何角色", tab: "assign" }), l.kind === "mcp" && _i(l, t) === "未分配" && n.push({ kind: "mcp", name: l.name, detail: "MCP 服务尚未授权给任何角色", tab: "assign" });
  return n;
}
function ZS(e, t, n) {
  const o = t.trim().toLowerCase();
  return (e || []).filter((s) => {
    const i = s.source === "mcp" || s.specialist === "mcp";
    return n === "mcp" && !i || n === "builtin" && i ? !1 : o ? [s.name, s.server, s.description, s.specialist].some((l) => String(l || "").toLowerCase().includes(o)) : !0;
  });
}
function rr(e, t, n) {
  var i, l;
  if (e.kind === "mcp") {
    const r = e.allowed_persona_ids || [];
    return t === "*" ? r.includes("*") : r.includes("*") || r.includes(t);
  }
  const o = n.overrides || {}, s = (i = o[t]) == null ? void 0 : i[e.id];
  if (s !== void 0) return s;
  if (t !== "*") {
    const r = (l = o["*"]) == null ? void 0 : l[e.id];
    if (r !== void 0) return r;
  }
  return !!e.default_assigned;
}
function _i(e, t) {
  const n = t.personas || [];
  if (e.kind === "mcp") {
    const l = e.allowed_persona_ids || [];
    if (l.includes("*")) return "全部角色";
    if (!l.length) return "未分配";
    const r = l.map((u) => {
      var c;
      return ((c = n.find((d) => d.id === u)) == null ? void 0 : c.name) || u;
    });
    return r.length <= 2 ? r.join("、") : `${r.slice(0, 2).join("、")} 等 ${r.length} 个角色`;
  }
  const o = n.filter((l) => rr(e, l.id, t));
  if (rr(e, "*", t) && o.length === n.length) return "全部角色";
  if (!o.length) return "未分配";
  const i = o.map((l) => l.name);
  return i.length <= 2 ? i.join("、") : `${i.slice(0, 2).join("、")} 等 ${i.length} 个角色`;
}
function JS(e) {
  const t = {};
  for (const n of e || []) {
    const o = n.kind === "skill" ? `技能 · ${n.group}` : n.kind === "mcp" ? "MCP 服务" : `工具 · ${n.group}`;
    (t[o] || (t[o] = [])).push(n);
  }
  return Object.entries(t).sort(([n], [o]) => n.localeCompare(o, "zh"));
}
function QS(e, t, n) {
  const o = t.trim().toLowerCase();
  return (e || []).filter((s) => s.locked || n !== "all" && s.kind !== n ? !1 : o ? [s.name, s.group, s.server, s.description].some((i) => String(i || "").toLowerCase().includes(o)) : !0);
}
function e$(e) {
  return e.kind === "mcp" ? "未授权则完全不可见；授权后该服务下的工具才可被角色调用。" : e.kind === "skill" ? e.builtin ? "内置技能默认开放，可按角色关闭。" : "自定义技能默认不给任何角色，需要明确分配。" : e.locked ? "MCP 工具随所属服务授权，不在这里单独开关。" : "内置工具默认开放，可按角色关闭。";
}
function t$(e) {
  return [{ id: "*", name: "全部角色(*)" }, ...(e == null ? void 0 : e.personas) || []];
}
const n$ = { class: "yv-page extension-page" }, o$ = { class: "extension-hero" }, s$ = { class: "hero-actions" }, i$ = ["disabled"], l$ = {
  class: "signal-strip",
  "aria-label": "能力状态"
}, r$ = {
  class: "extension-tabs",
  "aria-label": "能力工作台"
}, a$ = ["data-capability-tab", "onClick"], u$ = {
  key: 1,
  class: "overview-layout"
}, c$ = { class: "overview-foot" }, d$ = { class: "health-row" }, f$ = { class: "health-row" }, p$ = { class: "health-row" }, h$ = {
  key: 0,
  class: "attention-list"
}, v$ = ["onClick"], g$ = { class: "quick-entry" }, m$ = {
  key: 2,
  class: "content-section"
}, y$ = { class: "assign-toolbar" }, b$ = { class: "filter-input" }, _$ = { class: "assign-kinds" }, w$ = ["onClick"], k$ = { class: "assign-legend" }, E$ = {
  key: 0,
  class: "yv-empty"
}, C$ = {
  key: 1,
  class: "assign-board"
}, x$ = { class: "assign-table" }, S$ = { class: "group-row" }, $$ = ["colspan"], I$ = { class: "sticky" }, N$ = ["title"], T$ = ["checked", "disabled", "aria-label", "onChange"], M$ = {
  key: 0,
  class: "yv-empty"
}, P$ = {
  key: 3,
  class: "content-section"
}, O$ = {
  key: 0,
  class: "yv-empty"
}, A$ = { class: "row-main" }, D$ = { class: "tag-line" }, R$ = { class: "flag-line" }, L$ = ["checked", "onChange"], V$ = { key: 0 }, z$ = ["checked", "onChange"], F$ = { key: 1 }, B$ = ["checked", "onChange"], H$ = { class: "row-actions" }, U$ = ["title", "onClick"], j$ = ["onClick"], G$ = {
  key: 4,
  class: "content-section"
}, q$ = {
  key: 0,
  class: "yv-empty"
}, Y$ = { class: "row-main" }, X$ = { class: "grant-box" }, K$ = { class: "grant-empty" }, W$ = {
  key: 0,
  class: "mcp-test"
}, Z$ = { class: "row-actions" }, J$ = ["onClick"], Q$ = ["onClick"], eI = ["onClick"], tI = ["onClick"], nI = ["onClick"], oI = {
  key: 5,
  class: "content-section"
}, sI = { class: "filter-row" }, iI = { class: "filter-input" }, lI = {
  key: 0,
  class: "yv-empty"
}, rI = { class: "row-main" }, aI = {
  key: 0,
  class: "used-by tag-line"
}, uI = {
  key: 6,
  class: "content-section"
}, cI = { class: "catalog-tools" }, dI = { class: "filter-input" }, fI = { class: "catalog-grid" }, pI = { class: "tag-line" }, hI = ["disabled", "onClick"], vI = { class: "dialog-head" }, gI = { class: "yv-kicker" }, mI = { key: 0 }, yI = { key: 1 }, bI = {
  key: 0,
  class: "readonly-banner"
}, _I = { class: "yv-field" }, wI = ["readonly"], kI = { class: "yv-field" }, EI = ["readonly"], CI = { class: "yv-field" }, xI = ["readonly"], SI = { class: "yv-field" }, $I = ["readonly"], II = {
  key: 1,
  class: "mcp-test"
}, NI = ["value", "disabled"], TI = {
  key: 2,
  class: "yv-button primary",
  type: "submit"
}, MI = { class: "yv-field" }, PI = ["readonly"], OI = { class: "yv-field" }, AI = { class: "transport-tabs" }, DI = ["onClick"], RI = { class: "yv-field" }, LI = { class: "yv-field" }, VI = { class: "yv-field" }, zI = { class: "yv-field" }, FI = { class: "yv-field" }, BI = { class: "flag-line" }, HI = {
  class: "yv-button primary",
  type: "submit"
}, UI = { class: "dialog-head" }, jI = { class: "dialog-body" }, GI = { class: "catalog-detail" }, qI = { class: "dialog-head" }, YI = { class: "dialog-body" }, XI = { class: "dialog-actions" }, KI = ["disabled"], WI = /* @__PURE__ */ He({
  __name: "App",
  setup(e) {
    const t = un({ skills: [], servers: [], tools: [] }), n = te(null), o = te(""), s = te("all"), i = te(!1), l = [
      { id: "all", label: "全部" },
      { id: "skill", label: "技能(Skill)" },
      { id: "mcp", label: "MCP" },
      { id: "tool", label: "工具(Tool)" }
    ], r = te(zc(location.hash)), u = te(!1), c = te(""), d = te(!1), f = te(""), p = te("all"), h = te(null), b = te(null), C = te(null), M = te("skill"), P = te(null), L = te([]), E = te(!1), x = te(""), z = te("all"), Y = te(null), Z = te(null), H = te(null), T = te(!1), X = un({}), q = un({ title: "", detail: "", busy: !1 });
    let V = null;
    const R = un({ name: "", description: "", instructions: "", prompt_hint: "", tool_names: [] }), k = un({ name: "", description: "", transport: "stdio", command: "", args: "", env: "", url: "", headers: "", enabled: !0 }), D = ae(() => YS(t)), O = ae(() => WS(t, n.value)), B = ae(() => t$(n.value)), G = ae(() => {
      var le;
      return JS(QS(((le = n.value) == null ? void 0 : le.items) || [], o.value, s.value));
    }), ie = ae(() => G.value.reduce((le, [, I]) => le + I.length, 0)), de = ae(() => XS(t.skills)), ve = ae(() => Fc(t.tools)), re = ae(() => Fc(ZS(t.tools, f.value, p.value), t.skills)), ye = ae(() => {
      const le = x.value.trim().toLowerCase();
      return L.value.filter((I) => !le || [I.id, I.name, I.description, ...I.categories || []].join(" ").toLowerCase().includes(le));
    });
    let pe = 0;
    function ce(le, I = !1) {
      c.value = le, d.value = I;
    }
    function Ie() {
      return { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" };
    }
    function Me(le) {
      return le.split(/\r?\n/).map((I) => I.trim()).filter(Boolean);
    }
    function oe(le) {
      r.value = le;
      const I = "#capabilities-" + le;
      location.hash !== I && history.replaceState(null, "", I), le === "catalog" && ut(!1);
    }
    function Se() {
      const le = zc(location.hash);
      r.value = le, le === "catalog" && ut(!1);
    }
    async function Ee(le = !1) {
      le || (u.value = !0);
      try {
        const [I, Pe, We, Et] = await Promise.all([
          je("/api/skills"),
          je("/api/mcp/servers"),
          je("/api/skills/tools"),
          je("/api/capabilities/assignments")
        ]);
        t.skills = I, t.servers = Pe, t.tools = We, n.value = Et, le || ce("能力状态已刷新");
      } catch (I) {
        ce(it(I), !0);
      } finally {
        u.value = !1;
      }
    }
    function ke() {
      $(), pe = window.setInterval(() => Ee(!0), 3e4);
    }
    function $() {
      pe && window.clearInterval(pe), pe = 0;
    }
    async function A() {
      Se(), await Ee(!0), ke();
    }
    function m() {
      Z.value = null, T.value = !1, Object.assign(R, { name: "", description: "", instructions: "", prompt_hint: "", tool_names: [] });
    }
    function y(le, I = !1) {
      m(), M.value = "skill", le && (Z.value = le.name, T.value = !!(I || le.builtin), Object.assign(R, {
        name: le.name,
        description: le.description || "",
        instructions: le.instructions || "",
        prompt_hint: le.prompt_hint || "",
        tool_names: [...le.tool_names || []]
      })), _t(() => {
        var Pe;
        return (Pe = h.value) == null ? void 0 : Pe.showModal();
      });
    }
    function w() {
      H.value = null, Object.assign(k, { name: "", description: "", transport: "stdio", command: "", args: "", env: "", url: "", headers: "", enabled: !0 });
    }
    function S(le) {
      w(), M.value = "mcp", le && (H.value = le.name, Object.assign(k, {
        name: le.name,
        description: le.description || "",
        transport: le.transport || "stdio",
        command: le.command || "",
        args: (le.args || []).join(`
`),
        env: Vc(le.env),
        url: le.url || "",
        headers: Vc(le.headers),
        enabled: !!le.enabled
      })), _t(() => {
        var I;
        return (I = h.value) == null ? void 0 : I.showModal();
      });
    }
    async function j() {
      var le;
      if (!T.value) {
        if (!R.name.trim() || !R.instructions.trim()) return ce("名称与提示词不能为空", !0);
        u.value = !0;
        try {
          const I = {
            description: R.description.trim(),
            instructions: R.instructions.trim(),
            prompt_hint: R.prompt_hint.trim(),
            tool_names: R.tool_names
          };
          Z.value ? await je("/api/skills/" + encodeURIComponent(Z.value), { method: "PATCH", headers: Ie(), body: JSON.stringify(I) }) : await je("/api/skills", { method: "POST", headers: Ie(), body: JSON.stringify({ name: R.name.trim(), ...I }) }), (le = h.value) == null || le.close(), await Ee(!0), ce(Z.value ? "技能已保存" : "技能已创建");
        } catch (I) {
          ce(it(I), !0);
        } finally {
          u.value = !1;
        }
      }
    }
    async function K(le, I) {
      try {
        await je("/api/skills/" + encodeURIComponent(le.name), { method: "PATCH", headers: Ie(), body: JSON.stringify(I) }), await Ee(!0);
      } catch (Pe) {
        ce(it(Pe), !0);
      }
    }
    function Q(le, I, Pe) {
      q.title = le, q.detail = I, q.busy = !1, V = Pe, _t(() => {
        var We;
        return (We = b.value) == null ? void 0 : We.showModal();
      });
    }
    async function W() {
      var le;
      if (V) {
        q.busy = !0;
        try {
          await V(), (le = b.value) == null || le.close();
        } catch (I) {
          ce(it(I), !0);
        } finally {
          q.busy = !1, V = null;
        }
      }
    }
    function fe(le) {
      Q("删除技能", "删除 " + le.name + " 后不可恢复。", async () => {
        await je("/api/skills/" + encodeURIComponent(le.name), { method: "DELETE" }), await Ee(!0), ce("技能已删除");
      });
    }
    async function ue(le) {
      var Pe, We, Et, Wt;
      if (!le) return;
      const I = new FormData();
      I.append("file", le);
      try {
        const zt = await je("/api/skills/upload", { method: "POST", body: I });
        await Ee(!0);
        const gn = [];
        (Pe = zt.installed) != null && Pe.length && gn.push("已安装：" + zt.installed.join("、")), (We = zt.skipped) != null && We.length && gn.push("跳过：" + zt.skipped.map((F) => F.name + "（" + F.reason + "）").join("、")), ce(gn.join("。") || "上传完成，没有新技能被安装", !!((Et = zt.skipped) != null && Et.length && !((Wt = zt.installed) != null && Wt.length)));
      } catch (zt) {
        ce(it(zt), !0);
      } finally {
        P.value && (P.value.value = "");
      }
    }
    function ge(le) {
      var Pe;
      const I = le.target;
      ue(((Pe = I.files) == null ? void 0 : Pe[0]) || void 0);
    }
    async function he() {
      var le;
      if (!k.name.trim()) return ce("服务名称不能为空", !0);
      try {
        await je("/api/mcp/servers", {
          method: "POST",
          headers: Ie(),
          body: JSON.stringify({
            name: k.name.trim(),
            description: k.description.trim(),
            transport: k.transport,
            command: k.command.trim(),
            args: Me(k.args),
            env: Lc(k.env),
            url: k.url.trim(),
            headers: Lc(k.headers),
            enabled: k.enabled
          })
        }), (le = h.value) == null || le.close(), await Ee(!0), ce(H.value ? "MCP 服务已更新并重连" : "MCP 服务已保存并连接");
      } catch (I) {
        ce(it(I), !0);
      }
    }
    async function Te(le) {
      try {
        await je("/api/mcp/servers/" + encodeURIComponent(le.name) + "/" + (le.enabled ? "disable" : "enable"), { method: "POST" }), await Ee(!0);
      } catch (I) {
        ce(it(I), !0);
      }
    }
    async function Be(le) {
      ce("正在测试 " + le.name + "…");
      try {
        const I = await je("/api/mcp/servers/" + encodeURIComponent(le.name) + "/test", { method: "POST" });
        X[le.name] = I, ce(I.ok ? le.name + " 连接成功，发现 " + I.tool_count + " 个工具，耗时 " + I.elapsed_ms + "ms" : le.name + " 连接失败：" + I.error, !I.ok), await Ee(!0);
      } catch (I) {
        ce(it(I), !0);
      }
    }
    async function Ae(le) {
      try {
        await je("/api/mcp/servers/" + encodeURIComponent(le.name) + "/reload", { method: "POST" }), await Ee(!0), ce(le.name + " 已重新加载");
      } catch (I) {
        ce(it(I), !0);
      }
    }
    function st(le) {
      var Pe;
      const I = (Pe = n.value) == null ? void 0 : Pe.items.find((We) => We.kind === "mcp" && We.id === le.name);
      return !I || !n.value ? "尚未授权任何角色" : _i(I, n.value);
    }
    function mt(le, I) {
      return n.value ? rr(le, I, n.value) : !1;
    }
    async function Vt(le, I, Pe) {
      if (!(le.locked || i.value)) {
        i.value = !0;
        try {
          n.value = await je("/api/capabilities/assignments", {
            method: "PATCH",
            headers: Ie(),
            body: JSON.stringify({ persona_id: I, kind: le.kind, id: le.id, assigned: Pe })
          }), ce((Pe ? "已分配 " : "已取消 ") + le.name);
        } catch (We) {
          ce(it(We), !0);
        } finally {
          i.value = !1;
        }
      }
    }
    function Mt(le, I, Pe) {
      const We = Pe.target, Et = We.checked;
      We.checked = mt(le, I), Vt(le, I, Et);
    }
    function qe(le) {
      Q("删除 MCP 服务", "删除 " + le.name + " 后，其工具将立即从能力清单中移除。", async () => {
        await je("/api/mcp/servers/" + encodeURIComponent(le.name), { method: "DELETE" }), await Ee(!0), ce("MCP 服务已删除");
      });
    }
    async function ut(le = !1) {
      try {
        const I = await je("/api/extensions/catalog?kind=" + encodeURIComponent(z.value) + (le ? "&refresh=true" : ""));
        L.value = I.items || [], E.value = !!I.stale;
      } catch {
        ce("在线扩展目录暂时不可用，请稍后再试", !0), L.value = [];
      }
    }
    function yt(le) {
      return le.kind === "skill" ? t.skills.some((I) => I.name === le.id) : t.servers.some((I) => I.name === le.id);
    }
    function St(le) {
      Y.value = le, _t(() => {
        var I;
        return (I = C.value) == null ? void 0 : I.showModal();
      });
    }
    async function ct() {
      var I, Pe, We;
      const le = Y.value;
      if (le)
        try {
          const Et = await je("/api/extensions/catalog/" + encodeURIComponent(le.id) + "/install", {
            method: "POST",
            headers: Ie(),
            body: JSON.stringify({ confirmed: !1 })
          });
          if ((Pe = (I = Et.preview) == null ? void 0 : I.conflicts) != null && Pe.length) throw new Error(Et.preview.conflicts.join("；"));
          const Wt = await je("/api/extensions/catalog/" + encodeURIComponent(le.id) + "/install", {
            method: "POST",
            headers: Ie(),
            body: JSON.stringify({ confirmed: !0 })
          });
          if (Wt.status !== "installed") throw new Error(Wt.message || "安装未完成");
          await Ee(!0), (We = C.value) == null || We.close(), ce(le.kind === "skill" ? "安装完成，请在技能页启用并信任，再到角色分配页授权" : "安装完成，请在 MCP 页配置连接，再到角色分配页授权");
        } catch (Et) {
          ce(it(Et), !0);
        }
    }
    function dt(le) {
      var Pe;
      if (!le.enabled) return "warn";
      const I = (Pe = le.status) == null ? void 0 : Pe.status;
      return I === "connected" ? "ok" : I === "error" ? "error" : "warn";
    }
    function Bt(le) {
      var Pe, We;
      if (!le.enabled) return "已停用";
      const I = (Pe = le.status) == null ? void 0 : Pe.status;
      return I === "connected" ? "已连接 · " + Number(((We = le.status) == null ? void 0 : We.tool_count) || 0) + " 工具" : I === "error" ? "连接失败" : I === "not_loaded" ? "未加载" : I || "未知";
    }
    function Ht() {
      return t.skills.find((le) => le.name === Z.value);
    }
    function Ut() {
      A();
    }
    function on() {
      $();
    }
    return xt(() => {
      const le = document.querySelector("#extensions-app-root");
      le == null || le.addEventListener("charactoid:extensions-show", Ut), le == null || le.addEventListener("charactoid:extensions-hide", on), window.addEventListener("hashchange", Se), A();
    }), Mn(() => {
      $(), window.removeEventListener("hashchange", Se);
    }), (le, I) => {
      var Pe, We, Et, Wt, zt, gn, F, g, me, Le;
      return v(), _("main", n$, [
        a("header", o$, [
          I[40] || (I[40] = a("div", null, [
            a("span", { class: "yv-kicker" }, "Agent capability registry"),
            a("h1", null, "能力扩展"),
            a("p", null, "内置 Skill / Tool 固定，可按角色开关；自定义 Skill 与 MCP 在本页新增后，再分配给角色。")
          ], -1)),
          a("div", s$, [
            a("span", {
              class: be(["yv-status", D.value.attentionCount ? "warn" : "ok"])
            }, N(D.value.attentionCount ? D.value.attentionCount + " 项待处理" : "运行正常"), 3),
            a("button", {
              class: "yv-button yv-icon-button",
              type: "button",
              title: "刷新",
              disabled: u.value,
              onClick: I[0] || (I[0] = (J) => Ee())
            }, [
              ne(U(qt))
            ], 8, i$)
          ])
        ]),
        a("section", l$, [
          a("div", null, [
            I[41] || (I[41] = a("span", null, "已启用技能", -1)),
            a("strong", null, N(D.value.enabledSkills), 1),
            a("small", null, "共 " + N(t.skills.length) + " 个", 1)
          ]),
          a("div", null, [
            I[42] || (I[42] = a("span", null, "MCP 在线", -1)),
            a("strong", null, N(D.value.mcpOnline), 1),
            a("small", null, N(D.value.mcpIssues) + " 个异常", 1)
          ]),
          a("div", null, [
            I[43] || (I[43] = a("span", null, "已注册工具", -1)),
            a("strong", null, N(D.value.toolCount), 1),
            I[44] || (I[44] = a("small", null, "内置 + MCP", -1))
          ]),
          a("div", null, [
            I[45] || (I[45] = a("span", null, "需要处理", -1)),
            a("strong", null, N(D.value.attentionCount), 1),
            I[46] || (I[46] = a("small", null, "未信任或连接异常", -1))
          ])
        ]),
        a("nav", r$, [
          (v(!0), _(xe, null, Ve(U(GS), (J) => (v(), _("button", {
            key: J.id,
            "data-capability-tab": J.id,
            type: "button",
            class: be({ active: r.value === J.id }),
            onClick: (Oe) => oe(J.id)
          }, N(J.label), 11, a$))), 128))
        ]),
        c.value ? (v(), _("p", {
          key: 0,
          class: be(["extension-message", { error: d.value }]),
          role: "status"
        }, N(c.value), 3)) : se("", !0),
        r.value === "overview" ? (v(), _("section", u$, [
          I[52] || (I[52] = Sv('<div class="capability-line"><article class="skill"><span>01 Assign</span><strong>角色分配</strong><p>按角色开关 Skill / Tool；MCP 按服务授权，授权后该服务工具一起生效。</p></article><article class="tool"><span>02 Skill</span><strong>技能</strong><p>内置技能只读固定；自定义技能可新增、启用和信任。</p></article><article class="mcp"><span>03 MCP</span><strong>MCP 服务</strong><p>负责连接、测试和启用。角色授权请到分配页统一管理。</p></article><article><span>04 Tool</span><strong>工具清单</strong><p>内置 Worker 工具固定；MCP 工具随服务出现，确认策略写在代码里。</p></article></div>', 1)),
          a("div", c$, [
            a("div", null, [
              I[50] || (I[50] = a("h2", null, "健康与待处理", -1)),
              a("div", d$, [
                I[47] || (I[47] = a("span", null, "技能", -1)),
                a("div", null, N(D.value.enabledSkills) + " / " + N(t.skills.length) + " 已启用", 1),
                a("button", {
                  class: "yv-button",
                  type: "button",
                  onClick: I[1] || (I[1] = (J) => oe("skills"))
                }, "管理")
              ]),
              a("div", f$, [
                I[48] || (I[48] = a("span", null, "MCP", -1)),
                a("div", null, N(D.value.mcpOnline) + " 在线 · " + N(D.value.mcpIssues) + " 异常", 1),
                a("button", {
                  class: "yv-button",
                  type: "button",
                  onClick: I[2] || (I[2] = (J) => oe("mcp"))
                }, "管理")
              ]),
              a("div", p$, [
                I[49] || (I[49] = a("span", null, "工具", -1)),
                a("div", null, N(D.value.toolCount) + " 个已注册", 1),
                a("button", {
                  class: "yv-button",
                  type: "button",
                  onClick: I[3] || (I[3] = (J) => oe("tools"))
                }, "查看")
              ]),
              O.value.length ? (v(), _("div", h$, [
                (v(!0), _(xe, null, Ve(O.value, (J) => (v(), _("button", {
                  key: J.kind + J.name,
                  class: "attention-item",
                  type: "button",
                  onClick: (Oe) => oe(J.tab)
                }, [
                  a("span", null, N(J.kind === "skill" ? "技能" : "MCP"), 1),
                  a("div", null, [
                    a("strong", null, N(J.name), 1),
                    a("small", null, N(J.detail), 1)
                  ])
                ], 8, v$))), 128))
              ])) : se("", !0)
            ]),
            a("div", g$, [
              I[51] || (I[51] = a("h2", null, "快捷入口", -1)),
              a("button", {
                class: "yv-button primary",
                type: "button",
                onClick: I[4] || (I[4] = (J) => oe("assign"))
              }, "角色分配(Assign)"),
              a("button", {
                class: "yv-button",
                type: "button",
                onClick: I[5] || (I[5] = (J) => oe("skills"))
              }, "技能(Skill)"),
              a("button", {
                class: "yv-button",
                type: "button",
                onClick: I[6] || (I[6] = (J) => oe("mcp"))
              }, "MCP服务(MCP)"),
              a("button", {
                class: "yv-button",
                type: "button",
                onClick: I[7] || (I[7] = (J) => oe("tools"))
              }, "工具(Tool)"),
              a("button", {
                class: "yv-button",
                type: "button",
                onClick: I[8] || (I[8] = (J) => oe("catalog"))
              }, "扩展目录(Catalog)")
            ])
          ])
        ])) : r.value === "assign" ? (v(), _("section", m$, [
          a("header", null, [
            I[55] || (I[55] = a("div", null, [
              a("span", { class: "yv-kicker" }, "Role assignment matrix"),
              a("h2", null, "角色分配(Assign)"),
              a("p", null, "这是按角色分配 Skill / Tool / MCP 的主界面。内置能力内容固定，只能开关；MCP 按服务授权，不逐个工具分配。")
            ], -1)),
            a("div", null, [
              a("button", {
                class: "yv-button",
                type: "button",
                onClick: I[9] || (I[9] = (J) => oe("skills"))
              }, [
                ne(U(oo)),
                I[53] || (I[53] = _e("新增技能"))
              ]),
              a("button", {
                class: "yv-button",
                type: "button",
                onClick: I[10] || (I[10] = (J) => oe("mcp"))
              }, [
                ne(U(oo)),
                I[54] || (I[54] = _e("新增 MCP"))
              ])
            ])
          ]),
          a("div", y$, [
            a("label", b$, [
              ne(U(Zs)),
              De(a("input", {
                "onUpdate:modelValue": I[11] || (I[11] = (J) => o.value = J),
                placeholder: "搜索技能、工具或 MCP 服务"
              }, null, 512), [
                [Ge, o.value]
              ])
            ]),
            a("div", _$, [
              (v(), _(xe, null, Ve(l, (J) => a("button", {
                key: J.id,
                type: "button",
                class: be({ active: s.value === J.id }),
                onClick: (Oe) => s.value = J.id
              }, N(J.label), 11, w$)), 64))
            ])
          ]),
          a("p", k$, "显示 " + N(ie.value) + " 项。勾选即允许该角色使用；取消「全部角色(*)」中的某一个角色，只会收回该角色，不会清空其他人。", 1),
          B.value.length ? (v(), _("div", C$, [
            a("table", x$, [
              a("thead", null, [
                a("tr", null, [
                  I[56] || (I[56] = a("th", { class: "sticky" }, "能力", -1)),
                  (v(!0), _(xe, null, Ve(B.value, (J) => (v(), _("th", {
                    key: J.id,
                    class: "check"
                  }, N(J.name), 1))), 128))
                ])
              ]),
              a("tbody", null, [
                (v(!0), _(xe, null, Ve(G.value, ([J, Oe]) => (v(), _(xe, { key: J }, [
                  a("tr", S$, [
                    a("td", {
                      colspan: B.value.length + 1
                    }, N(J), 9, $$)
                  ]),
                  (v(!0), _(xe, null, Ve(Oe, (we) => (v(), _("tr", {
                    key: we.id,
                    class: be("kind-" + we.kind)
                  }, [
                    a("td", I$, [
                      a("div", {
                        class: "assign-name",
                        title: U(e$)(we)
                      }, [
                        a("strong", null, N(we.name), 1),
                        a("small", null, N(n.value ? U(_i)(we, n.value) : ""), 1)
                      ], 8, N$)
                    ]),
                    (v(!0), _(xe, null, Ve(B.value, (ft) => (v(), _("td", {
                      key: we.id + ft.id,
                      class: "check"
                    }, [
                      a("input", {
                        type: "checkbox",
                        checked: mt(we, ft.id),
                        disabled: i.value || we.locked,
                        "aria-label": we.name + " / " + ft.name,
                        onChange: (Pt) => Mt(we, ft.id, Pt)
                      }, null, 40, T$)
                    ]))), 128))
                  ], 2))), 128))
                ], 64))), 128))
              ])
            ]),
            G.value.length ? se("", !0) : (v(), _("p", M$, "没有匹配的能力。自定义 Skill / MCP 请到对应分页新增。"))
          ])) : (v(), _("div", E$, "还没有可分配的能力"))
        ])) : r.value === "skills" ? (v(), _("section", P$, [
          a("header", null, [
            I[59] || (I[59] = a("div", null, [
              a("span", { class: "yv-kicker" }, "Instruction packages"),
              a("h2", null, "技能(Skill)"),
              a("p", null, "内置技能只读查看；自定义技能可编辑、启用、信任并决定是否允许脚本。")
            ], -1)),
            a("div", null, [
              a("input", {
                ref_key: "uploadInput",
                ref: P,
                hidden: "",
                type: "file",
                accept: ".zip",
                onChange: ge
              }, null, 544),
              a("button", {
                class: "yv-button",
                type: "button",
                onClick: I[12] || (I[12] = (J) => {
                  var Oe;
                  return (Oe = P.value) == null ? void 0 : Oe.click();
                })
              }, [
                ne(U(Bl)),
                I[57] || (I[57] = _e("上传技能包"))
              ]),
              a("button", {
                class: "yv-button primary",
                type: "button",
                onClick: I[13] || (I[13] = (J) => y())
              }, [
                ne(U(oo)),
                I[58] || (I[58] = _e("新增技能"))
              ])
            ])
          ]),
          t.skills.length ? se("", !0) : (v(), _("div", O$, "还没有技能")),
          (v(!0), _(xe, null, Ve(de.value, ([J, Oe]) => (v(), _("section", {
            key: J,
            class: "skill-group"
          }, [
            a("h3", null, N(J), 1),
            (v(!0), _(xe, null, Ve(Oe, (we) => {
              var ft;
              return v(), _("article", {
                key: we.name,
                class: "extension-row kind-skill"
              }, [
                a("div", A$, [
                  a("div", null, [
                    a("strong", null, N(we.name), 1),
                    a("span", null, N(we.builtin ? "内置" : "自定义") + " · " + N(we.format === "skillmd" ? "标准包" : "JSON"), 1)
                  ]),
                  a("p", null, N(we.description || "暂无说明"), 1),
                  a("div", D$, [
                    (v(!0), _(xe, null, Ve(we.tool_names, (Pt) => (v(), _("span", { key: Pt }, N(Pt), 1))), 128))
                  ]),
                  a("div", R$, [
                    a("label", null, [
                      a("input", {
                        type: "checkbox",
                        checked: we.enabled,
                        onChange: (Pt) => K(we, { enabled: !we.enabled })
                      }, null, 40, L$),
                      I[60] || (I[60] = a("span", null, "启用", -1))
                    ]),
                    we.builtin ? se("", !0) : (v(), _("label", V$, [
                      a("input", {
                        type: "checkbox",
                        checked: we.trusted,
                        onChange: (Pt) => K(we, { trusted: !we.trusted })
                      }, null, 40, z$),
                      I[61] || (I[61] = a("span", null, "信任", -1))
                    ])),
                    (ft = we.scripts) != null && ft.length ? (v(), _("label", F$, [
                      a("input", {
                        type: "checkbox",
                        checked: we.scripts_enabled,
                        onChange: (Pt) => K(we, { scripts_enabled: !we.scripts_enabled })
                      }, null, 40, B$),
                      I[62] || (I[62] = a("span", null, "允许脚本", -1))
                    ])) : se("", !0)
                  ])
                ]),
                a("div", H$, [
                  a("span", {
                    class: be(["yv-status", we.enabled ? "ok" : "warn"])
                  }, N(we.enabled ? "已启用" : "已停用"), 3),
                  a("button", {
                    class: "yv-button yv-icon-button",
                    type: "button",
                    title: we.builtin ? "查看" : "编辑",
                    onClick: (Pt) => y(we, we.builtin)
                  }, [
                    (v(), ht(Er(we.builtin ? U(Vl) : U(zl))))
                  ], 8, U$),
                  we.builtin ? se("", !0) : (v(), _("button", {
                    key: 0,
                    class: "yv-button yv-icon-button danger",
                    type: "button",
                    title: "删除",
                    onClick: (Pt) => fe(we)
                  }, [
                    ne(U($n))
                  ], 8, j$))
                ])
              ]);
            }), 128))
          ]))), 128))
        ])) : r.value === "mcp" ? (v(), _("section", G$, [
          a("header", null, [
            I[64] || (I[64] = a("div", null, [
              a("span", { class: "yv-kicker" }, "External protocol services"),
              a("h2", null, "MCP服务(MCP)"),
              a("p", null, "配置连接、测试连通和启用。角色授权请到「角色分配」页统一管理，未授权角色即使服务在线也看不到对应工具。")
            ], -1)),
            a("button", {
              class: "yv-button primary",
              type: "button",
              onClick: I[14] || (I[14] = (J) => S())
            }, [
              ne(U(oo)),
              I[63] || (I[63] = _e("新增服务"))
            ])
          ]),
          t.servers.length ? se("", !0) : (v(), _("div", q$, "尚未配置 MCP 服务")),
          (v(!0), _(xe, null, Ve(t.servers, (J) => {
            var Oe;
            return v(), _("article", {
              key: J.name,
              class: "extension-row kind-mcp"
            }, [
              a("div", Y$, [
                a("div", null, [
                  a("strong", null, N(J.name), 1),
                  a("span", null, N(J.transport) + " · " + N(J.enabled ? "已启用" : "已停用"), 1)
                ]),
                a("p", null, N(J.description || ((Oe = J.status) == null ? void 0 : Oe.error) || "暂无说明"), 1),
                a("div", X$, [
                  I[65] || (I[65] = a("span", null, "角色授权", -1)),
                  a("p", K$, "当前：" + N(st(J)), 1),
                  a("button", {
                    class: "yv-button",
                    type: "button",
                    onClick: I[15] || (I[15] = (we) => oe("assign"))
                  }, "去分配")
                ]),
                X[J.name] ? (v(), _("p", W$, N(X[J.name].ok ? "最近测试成功 · " + X[J.name].tool_count + " 个工具 · " + X[J.name].elapsed_ms + "ms" : "最近测试失败：" + X[J.name].error), 1)) : se("", !0)
              ]),
              a("div", Z$, [
                a("span", {
                  class: be(["yv-status", dt(J)])
                }, N(Bt(J)), 3),
                a("button", {
                  class: "yv-button",
                  type: "button",
                  onClick: (we) => Te(J)
                }, N(J.enabled ? "停用" : "启用"), 9, J$),
                a("button", {
                  class: "yv-button yv-icon-button",
                  type: "button",
                  title: "测试连接",
                  onClick: (we) => Be(J)
                }, [
                  ne(U(Ir))
                ], 8, Q$),
                a("button", {
                  class: "yv-button yv-icon-button",
                  type: "button",
                  title: "重新加载",
                  onClick: (we) => Ae(J)
                }, [
                  ne(U(xg))
                ], 8, eI),
                a("button", {
                  class: "yv-button yv-icon-button",
                  type: "button",
                  title: "编辑",
                  onClick: (we) => S(J)
                }, [
                  ne(U(zl))
                ], 8, tI),
                a("button", {
                  class: "yv-button yv-icon-button danger",
                  type: "button",
                  title: "删除",
                  onClick: (we) => qe(J)
                }, [
                  ne(U($n))
                ], 8, nI)
              ])
            ]);
          }), 128))
        ])) : r.value === "tools" ? (v(), _("section", oI, [
          a("header", null, [
            I[66] || (I[66] = a("div", null, [
              a("span", { class: "yv-kicker" }, "Registered tools"),
              a("h2", null, "工具(Tool)"),
              a("p", null, "这里列出内置 Worker 工具和已连接 MCP 工具。内置工具可在角色分配页按角色开关；MCP 工具随所属服务授权。")
            ], -1)),
            a("button", {
              class: "yv-button",
              type: "button",
              onClick: I[16] || (I[16] = (J) => oe("assign"))
            }, "去分配")
          ]),
          a("div", sI, [
            a("label", iI, [
              ne(U(Zs)),
              De(a("input", {
                "onUpdate:modelValue": I[17] || (I[17] = (J) => f.value = J),
                placeholder: "搜索名称、说明、服务或 Worker"
              }, null, 512), [
                [Ge, f.value]
              ])
            ]),
            De(a("select", {
              "onUpdate:modelValue": I[18] || (I[18] = (J) => p.value = J)
            }, I[67] || (I[67] = [
              a("option", { value: "all" }, "全部来源", -1),
              a("option", { value: "builtin" }, "内置", -1),
              a("option", { value: "mcp" }, "MCP", -1)
            ]), 512), [
              [fn, p.value]
            ])
          ]),
          re.value.length ? se("", !0) : (v(), _("div", lI, "没有匹配的工具")),
          (v(!0), _(xe, null, Ve(re.value, ([J, Oe]) => (v(), _("section", {
            key: J,
            class: "tool-group"
          }, [
            a("h3", null, N(J), 1),
            (v(!0), _(xe, null, Ve(Oe, (we) => {
              var ft;
              return v(), _("article", {
                key: we.name,
                class: "extension-row kind-tool"
              }, [
                a("div", rI, [
                  a("div", null, [
                    a("strong", null, N(we.name), 1),
                    a("span", null, N(we.source === "mcp" ? we.server || "MCP" : "内置"), 1)
                  ]),
                  a("p", null, N(we.description || "暂无说明"), 1),
                  (ft = we.usedBy) != null && ft.length ? (v(), _("div", aI, [
                    (v(!0), _(xe, null, Ve(we.usedBy, (Pt) => (v(), _("span", { key: Pt }, "技能 " + N(Pt), 1))), 128))
                  ])) : se("", !0)
                ]),
                a("span", {
                  class: be(["yv-status", we.requires_confirmation ? "warn" : "ok"])
                }, N(we.requires_confirmation ? "调用需确认" : "可直接调用"), 3)
              ]);
            }), 128))
          ]))), 128))
        ])) : r.value === "catalog" ? (v(), _("section", uI, [
          a("header", null, [
            I[69] || (I[69] = a("div", null, [
              a("span", { class: "yv-kicker" }, "Curated catalog"),
              a("h2", null, "扩展目录(Catalog)"),
              a("p", null, "查看可安装扩展，确认来源后再加入本地能力系统。")
            ], -1)),
            a("button", {
              class: "yv-button",
              type: "button",
              onClick: I[19] || (I[19] = (J) => ut(!0))
            }, [
              ne(U(qt)),
              I[68] || (I[68] = _e("刷新目录"))
            ])
          ]),
          a("div", cI, [
            a("label", dI, [
              ne(U(Zs)),
              De(a("input", {
                "onUpdate:modelValue": I[20] || (I[20] = (J) => x.value = J),
                placeholder: "搜索名称、说明或分类"
              }, null, 512), [
                [Ge, x.value]
              ])
            ]),
            De(a("select", {
              "onUpdate:modelValue": I[21] || (I[21] = (J) => z.value = J),
              onChange: I[22] || (I[22] = (J) => ut(!1))
            }, I[70] || (I[70] = [
              a("option", { value: "all" }, "全部类型", -1),
              a("option", { value: "skill" }, "Skill", -1),
              a("option", { value: "mcp" }, "MCP", -1)
            ]), 544), [
              [fn, z.value]
            ]),
            a("span", {
              class: be(["yv-status", E.value ? "warn" : "ok"])
            }, N(E.value ? "缓存目录" : L.value.length + " 个条目"), 3)
          ]),
          a("div", fI, [
            (v(!0), _(xe, null, Ve(ye.value, (J) => (v(), _("article", {
              key: J.id,
              class: be(["catalog-item", "kind-" + J.kind])
            }, [
              a("span", null, N((J.kind || "").toUpperCase()), 1),
              a("h3", null, N(J.name || J.id), 1),
              a("small", null, "v" + N(J.version || "未知") + " · " + N(J.id), 1),
              a("p", null, N(J.description || "暂无说明"), 1),
              a("div", pI, [
                (v(!0), _(xe, null, Ve(J.categories, (Oe) => (v(), _("span", { key: Oe }, N(Oe), 1))), 128))
              ]),
              a("button", {
                class: "yv-button",
                type: "button",
                disabled: yt(J),
                onClick: (Oe) => St(J)
              }, N(yt(J) ? "已安装" : "查看并安装"), 9, hI)
            ], 2))), 128))
          ])
        ])) : se("", !0),
        a("dialog", {
          ref_key: "drawer",
          ref: h,
          class: "yv-dialog"
        }, [
          a("header", vI, [
            a("div", null, [
              a("span", gI, N(M.value === "skill" ? "Instruction package" : "Protocol service"), 1),
              M.value === "skill" ? (v(), _("h2", mI, N(T.value ? "查看 " + (Z.value || "") : Z.value ? "编辑 " + Z.value : "新增技能"), 1)) : (v(), _("h2", yI, N(H.value ? "编辑 " + H.value : "新增 MCP 服务"), 1))
            ]),
            a("button", {
              class: "yv-button yv-icon-button",
              type: "button",
              title: "关闭",
              onClick: I[23] || (I[23] = (J) => {
                var Oe;
                return (Oe = h.value) == null ? void 0 : Oe.close();
              })
            }, [
              ne(U(Gt))
            ])
          ]),
          M.value === "skill" ? (v(), _("form", {
            key: 0,
            class: "dialog-body",
            onSubmit: $t(j, ["prevent"])
          }, [
            T.value ? (v(), _("p", bI, "内置技能只读。可以在列表中启用或停用，但不能改提示词和工具。")) : se("", !0),
            a("label", _I, [
              I[71] || (I[71] = a("span", null, "名称", -1)),
              De(a("input", {
                "onUpdate:modelValue": I[24] || (I[24] = (J) => R.name = J),
                readonly: !!Z.value || T.value
              }, null, 8, wI), [
                [Ge, R.name]
              ])
            ]),
            a("label", kI, [
              I[72] || (I[72] = a("span", null, "描述", -1)),
              De(a("input", {
                "onUpdate:modelValue": I[25] || (I[25] = (J) => R.description = J),
                readonly: T.value
              }, null, 8, EI), [
                [Ge, R.description]
              ])
            ]),
            a("label", CI, [
              I[73] || (I[73] = a("span", null, "提示词", -1)),
              De(a("textarea", {
                "onUpdate:modelValue": I[26] || (I[26] = (J) => R.instructions = J),
                rows: "6",
                readonly: T.value
              }, null, 8, xI), [
                [Ge, R.instructions]
              ])
            ]),
            a("label", SI, [
              I[74] || (I[74] = a("span", null, "触发提示", -1)),
              De(a("input", {
                "onUpdate:modelValue": I[27] || (I[27] = (J) => R.prompt_hint = J),
                readonly: T.value
              }, null, 8, $I), [
                [Ge, R.prompt_hint]
              ])
            ]),
            (We = (Pe = Ht()) == null ? void 0 : Pe.scripts) != null && We.length ? (v(), _("p", II, "脚本：" + N(Ht().scripts.join("、")) + N(Ht().scripts_enabled ? "（已允许）" : "（未允许）"), 1)) : se("", !0),
            (v(!0), _(xe, null, Ve(ve.value, ([J, Oe]) => (v(), _("fieldset", {
              key: J,
              class: "tool-options"
            }, [
              a("legend", null, N(J), 1),
              (v(!0), _(xe, null, Ve(Oe, (we) => (v(), _("label", {
                key: we.name
              }, [
                De(a("input", {
                  "onUpdate:modelValue": I[28] || (I[28] = (ft) => R.tool_names = ft),
                  type: "checkbox",
                  value: we.name,
                  disabled: T.value
                }, null, 8, NI), [
                  [Rl, R.tool_names]
                ]),
                a("span", null, N(we.name) + N(we.requires_confirmation ? "（需确认）" : ""), 1)
              ]))), 128))
            ]))), 128)),
            T.value ? se("", !0) : (v(), _("button", TI, [
              ne(U(Fl)),
              I[75] || (I[75] = _e("保存技能"))
            ]))
          ], 32)) : (v(), _("form", {
            key: 1,
            class: "dialog-body",
            onSubmit: $t(he, ["prevent"])
          }, [
            a("label", MI, [
              I[76] || (I[76] = a("span", null, "名称", -1)),
              De(a("input", {
                "onUpdate:modelValue": I[29] || (I[29] = (J) => k.name = J),
                readonly: !!H.value
              }, null, 8, PI), [
                [Ge, k.name]
              ])
            ]),
            a("label", OI, [
              I[77] || (I[77] = a("span", null, "描述", -1)),
              De(a("input", {
                "onUpdate:modelValue": I[30] || (I[30] = (J) => k.description = J)
              }, null, 512), [
                [Ge, k.description]
              ])
            ]),
            a("div", AI, [
              (v(), _(xe, null, Ve([{ id: "stdio", label: "本地进程(stdio)" }, { id: "streamable_http", label: "远程 HTTP(HTTP)" }, { id: "sse", label: "远程 SSE(SSE)" }], (J) => a("button", {
                key: J.id,
                type: "button",
                class: be({ active: k.transport === J.id }),
                onClick: (Oe) => k.transport = J.id
              }, N(J.label), 11, DI)), 64))
            ]),
            k.transport === "stdio" ? (v(), _(xe, { key: 0 }, [
              a("label", RI, [
                I[78] || (I[78] = a("span", null, "启动命令", -1)),
                De(a("input", {
                  "onUpdate:modelValue": I[31] || (I[31] = (J) => k.command = J)
                }, null, 512), [
                  [Ge, k.command]
                ])
              ]),
              a("label", LI, [
                I[79] || (I[79] = a("span", null, "参数（每行一个）", -1)),
                De(a("textarea", {
                  "onUpdate:modelValue": I[32] || (I[32] = (J) => k.args = J),
                  rows: "3"
                }, null, 512), [
                  [Ge, k.args]
                ])
              ]),
              a("label", VI, [
                I[80] || (I[80] = a("span", null, "环境变量（KEY=VALUE）", -1)),
                De(a("textarea", {
                  "onUpdate:modelValue": I[33] || (I[33] = (J) => k.env = J),
                  rows: "3"
                }, null, 512), [
                  [Ge, k.env]
                ])
              ])
            ], 64)) : (v(), _(xe, { key: 1 }, [
              a("label", zI, [
                I[81] || (I[81] = a("span", null, "服务器地址", -1)),
                De(a("input", {
                  "onUpdate:modelValue": I[34] || (I[34] = (J) => k.url = J)
                }, null, 512), [
                  [Ge, k.url]
                ])
              ]),
              a("label", FI, [
                I[82] || (I[82] = a("span", null, "请求头（KEY: VALUE）", -1)),
                De(a("textarea", {
                  "onUpdate:modelValue": I[35] || (I[35] = (J) => k.headers = J),
                  rows: "3"
                }, null, 512), [
                  [Ge, k.headers]
                ])
              ])
            ], 64)),
            a("label", BI, [
              De(a("input", {
                "onUpdate:modelValue": I[36] || (I[36] = (J) => k.enabled = J),
                type: "checkbox"
              }, null, 512), [
                [Rl, k.enabled]
              ]),
              I[83] || (I[83] = a("span", null, "保存后启用", -1))
            ]),
            a("button", HI, [
              ne(U(Fl)),
              I[84] || (I[84] = _e("保存服务"))
            ])
          ], 32))
        ], 512),
        a("dialog", {
          ref_key: "catalogDialog",
          ref: C,
          class: "yv-dialog"
        }, [
          a("header", UI, [
            a("div", null, [
              I[85] || (I[85] = a("span", { class: "yv-kicker" }, "安装预览", -1)),
              a("h2", null, N(((Et = Y.value) == null ? void 0 : Et.name) || ((Wt = Y.value) == null ? void 0 : Wt.id)), 1)
            ]),
            a("button", {
              class: "yv-button yv-icon-button",
              type: "button",
              title: "关闭",
              onClick: I[37] || (I[37] = (J) => {
                var Oe;
                return (Oe = C.value) == null ? void 0 : Oe.close();
              })
            }, [
              ne(U(Gt))
            ])
          ]),
          a("div", jI, [
            a("p", null, N(((zt = Y.value) == null ? void 0 : zt.description) || "暂无说明"), 1),
            a("dl", GI, [
              I[86] || (I[86] = a("dt", null, "类型", -1)),
              a("dd", null, N((F = (gn = Y.value) == null ? void 0 : gn.kind) == null ? void 0 : F.toUpperCase()), 1),
              I[87] || (I[87] = a("dt", null, "版本", -1)),
              a("dd", null, N(((g = Y.value) == null ? void 0 : g.version) || "未知"), 1),
              I[88] || (I[88] = a("dt", null, "来源", -1)),
              a("dd", null, N(((Le = (me = Y.value) == null ? void 0 : me.source) == null ? void 0 : Le.type) || "未知"), 1)
            ]),
            a("button", {
              class: "yv-button primary",
              type: "button",
              onClick: ct
            }, [
              ne(U(ko)),
              I[89] || (I[89] = _e("确认安装"))
            ])
          ])
        ], 512),
        a("dialog", {
          ref_key: "confirmDialog",
          ref: b,
          class: "yv-dialog confirm-dialog"
        }, [
          a("header", qI, [
            a("div", null, [
              I[90] || (I[90] = a("span", { class: "yv-kicker" }, "Confirm action", -1)),
              a("h2", null, N(q.title), 1)
            ]),
            a("button", {
              class: "yv-button yv-icon-button",
              type: "button",
              title: "关闭",
              onClick: I[38] || (I[38] = (J) => {
                var Oe;
                return (Oe = b.value) == null ? void 0 : Oe.close();
              })
            }, [
              ne(U(Gt))
            ])
          ]),
          a("div", YI, [
            a("p", null, N(q.detail), 1),
            a("div", XI, [
              a("button", {
                class: "yv-button",
                type: "button",
                onClick: I[39] || (I[39] = (J) => {
                  var Oe;
                  return (Oe = b.value) == null ? void 0 : Oe.close();
                })
              }, "取消"),
              a("button", {
                class: "yv-button danger",
                type: "button",
                disabled: q.busy,
                onClick: W
              }, "确认删除", 8, KI)
            ])
          ])
        ], 512)
      ]);
    };
  }
});
let Fn = null;
const Vp = () => document.querySelector("#extensions-app-root");
function f4(e = "#extensions-app-root") {
  if (Fn) return Fn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("能力扩展挂载点不存在");
  return Fn = Cs(WI), Fn.mount(t), Fn;
}
function p4() {
  var e;
  (e = Vp()) == null || e.dispatchEvent(new CustomEvent("charactoid:extensions-show"));
}
function h4() {
  var e;
  (e = Vp()) == null || e.dispatchEvent(new CustomEvent("charactoid:extensions-hide"));
}
function v4() {
  Fn && (Fn.unmount(), Fn = null);
}
const ZI = /* @__PURE__ */ new Set([
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
function Us(e, t) {
  if (e === "scope_isolation_ok") return t ? "通过" : "未通过";
  const n = Number(t);
  return ZI.has(e) && Number.isFinite(n) ? `${Math.round(n * 100)}%` : typeof t == "number" && Number.isFinite(n) ? Number.isInteger(n) ? String(n) : n.toFixed(3) : String(t ?? "—");
}
function JI(e, t) {
  return t ? Math.max(0, Math.min(100, Math.round(e / t * 100))) : 0;
}
function QI(e) {
  return {
    persona_id: e.personaId,
    tier: e.tier,
    dataset_mode: e.datasetMode
  };
}
function wi(e) {
  return [...new Set(e.split(/[\n,，]+/).map((t) => t.trim()).filter(Boolean))];
}
function zp(e) {
  return {
    question: e.question.trim(),
    expected_answer: e.expectedAnswer.trim(),
    relevant_document_ids: wi(e.documentIds),
    tags: wi(e.tags),
    difficulty: e.difficulty,
    enabled: e.enabled
  };
}
function eN(e) {
  return je(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-cases`, { cache: "no-store" });
}
function tN(e, t) {
  return je(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-cases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(zp(t))
  });
}
function nN(e, t, n) {
  return je(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-cases/${encodeURIComponent(t)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(zp(n))
  });
}
async function oN(e, t) {
  await je(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-cases/${encodeURIComponent(t)}`, {
    method: "DELETE"
  });
}
function sN(e, t = "pending") {
  return je(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-candidates?status=${encodeURIComponent(t)}`, { cache: "no-store" });
}
function iN(e) {
  return je(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-candidates/sync`, { method: "POST" });
}
function lN(e) {
  const t = { note: (e.note || "").trim() };
  return e.expectedAnswer !== void 0 && (t.expected_answer = e.expectedAnswer.trim()), e.documentIds !== void 0 && (t.relevant_document_ids = wi(e.documentIds)), e.tags !== void 0 && (t.tags = wi(e.tags)), e.difficulty !== void 0 && (t.difficulty = e.difficulty), t;
}
function rN(e, t, n) {
  return je(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-candidates/${encodeURIComponent(t)}/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(lN(n))
  });
}
function aN(e, t, n = "") {
  return je(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-candidates/${encodeURIComponent(t)}/reject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note: n.trim() })
  });
}
const uN = {
  class: "eval-dataset",
  "aria-label": "人工评测题集"
}, cN = { class: "eval-dataset-heading" }, dN = { key: 0 }, fN = { class: "eval-dataset-actions" }, pN = ["disabled"], hN = ["disabled"], vN = {
  key: 0,
  class: "eval-dataset-error"
}, gN = {
  key: 1,
  class: "eval-dataset-editor"
}, mN = { class: "eval-dataset-editor-head" }, yN = ["disabled"], bN = { class: "yv-field" }, _N = { class: "yv-field" }, wN = { class: "eval-dataset-form-grid" }, kN = { class: "yv-field" }, EN = { class: "yv-field" }, CN = { class: "yv-field" }, xN = { class: "eval-dataset-check" }, SN = { class: "eval-dataset-editor-actions" }, $N = ["disabled"], IN = ["disabled"], NN = {
  key: 2,
  class: "eval-dataset-empty"
}, TN = {
  key: 3,
  class: "eval-dataset-empty"
}, MN = {
  key: 4,
  class: "eval-dataset-empty"
}, PN = {
  key: 5,
  class: "eval-dataset-list"
}, ON = { class: "eval-dataset-row-main" }, AN = { key: 0 }, DN = { class: "eval-dataset-meta" }, RN = { key: 0 }, LN = { key: 1 }, VN = { class: "eval-dataset-row-actions" }, zN = ["disabled", "onClick"], FN = ["disabled", "onClick"], BN = /* @__PURE__ */ He({
  __name: "EvalDatasetPanel",
  props: {
    spaceId: {}
  },
  setup(e) {
    const t = e, n = te([]), o = te(!1), s = te(!1), i = te(""), l = te(!1), r = te(null), u = te(p());
    let c = 0;
    const d = ae(() => n.value.filter((z) => z.enabled !== !1).length), f = ae(() => !!r.value);
    function p() {
      return { question: "", expectedAnswer: "", documentIds: "", tags: "", difficulty: "medium", enabled: !0 };
    }
    function h(z) {
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
    function b(z) {
      return { easy: "简单", medium: "中等", hard: "困难" }[z || "medium"] || "中等";
    }
    function C() {
      r.value = null, u.value = p(), l.value = !0, i.value = "";
    }
    function M(z) {
      r.value = z.id, u.value = h(z), l.value = !0, i.value = "";
    }
    function P() {
      s.value || (l.value = !1, r.value = null);
    }
    async function L() {
      const z = ++c;
      if (!t.spaceId) {
        n.value = [], l.value = !1;
        return;
      }
      o.value = !0, i.value = "";
      try {
        const Y = await eN(t.spaceId);
        z === c && (n.value = Y.items || []);
      } catch (Y) {
        z === c && (i.value = it(Y));
      } finally {
        z === c && (o.value = !1);
      }
    }
    async function E() {
      if (!t.spaceId || !u.value.question.trim()) {
        i.value = "请填写问题";
        return;
      }
      s.value = !0, i.value = "";
      try {
        const z = r.value ? await nN(t.spaceId, r.value, u.value) : await tN(t.spaceId, u.value);
        r.value ? n.value = n.value.map((Y) => Y.id === z.id ? z : Y) : n.value = [...n.value, z], P();
      } catch (z) {
        i.value = it(z);
      } finally {
        s.value = !1;
      }
    }
    async function x(z) {
      if (!(!t.spaceId || !window.confirm(`删除这条评测题？

${z.question}`))) {
        s.value = !0, i.value = "";
        try {
          await oN(t.spaceId, z.id), n.value = n.value.filter((Y) => Y.id !== z.id), r.value === z.id && P();
        } catch (Y) {
          i.value = it(Y);
        } finally {
          s.value = !1;
        }
      }
    }
    return ze(() => t.spaceId, L), xt(L), (z, Y) => (v(), _("section", uN, [
      a("header", cN, [
        a("div", null, [
          Y[7] || (Y[7] = a("span", { class: "yv-kicker" }, "Regression set", -1)),
          a("h2", null, [
            Y[6] || (Y[6] = _e("人工题集 ")),
            n.value.length ? (v(), _("small", dN, N(d.value) + "/" + N(n.value.length) + " 启用", 1)) : se("", !0)
          ]),
          Y[8] || (Y[8] = a("p", null, "把真实问题留成可重复的回归样本。", -1))
        ]),
        a("div", fN, [
          a("button", {
            class: "yv-button",
            type: "button",
            disabled: o.value || s.value || !z.spaceId,
            title: "刷新题集",
            onClick: L
          }, [
            ne(U(qt), {
              size: 14,
              class: be({ "is-spinning": o.value })
            }, null, 8, ["class"]),
            Y[9] || (Y[9] = _e("刷新"))
          ], 8, pN),
          a("button", {
            class: "yv-button primary",
            type: "button",
            disabled: s.value || !z.spaceId,
            onClick: C
          }, [
            ne(U(oo), { size: 14 }),
            Y[10] || (Y[10] = _e("新增题目"))
          ], 8, hN)
        ])
      ]),
      i.value ? (v(), _("p", vN, N(i.value), 1)) : se("", !0),
      l.value ? (v(), _("div", gN, [
        a("div", mN, [
          a("strong", null, N(f.value ? "编辑题目" : "新增题目"), 1),
          a("button", {
            class: "icon-button",
            type: "button",
            title: "关闭",
            disabled: s.value,
            onClick: P
          }, [
            ne(U(Gt), { size: 15 })
          ], 8, yN)
        ]),
        a("label", bN, [
          Y[11] || (Y[11] = a("span", null, "问题", -1)),
          De(a("textarea", {
            name: "question",
            "onUpdate:modelValue": Y[0] || (Y[0] = (Z) => u.value.question = Z),
            rows: "2",
            maxlength: "4000",
            placeholder: "例如：CHARACTOID 如何选择知识检索路径？"
          }, null, 512), [
            [Ge, u.value.question]
          ])
        ]),
        a("label", _N, [
          Y[12] || (Y[12] = a("span", null, [
            _e("预期答案 "),
            a("em", null, "可选")
          ], -1)),
          De(a("textarea", {
            name: "expected_answer",
            "onUpdate:modelValue": Y[1] || (Y[1] = (Z) => u.value.expectedAnswer = Z),
            rows: "3",
            maxlength: "8000",
            placeholder: "用于人工复核与后续答案对比"
          }, null, 512), [
            [Ge, u.value.expectedAnswer]
          ])
        ]),
        a("div", wN, [
          a("label", kN, [
            Y[13] || (Y[13] = a("span", null, [
              _e("相关资料 ID "),
              a("em", null, "每行一个，也可用逗号分隔")
            ], -1)),
            De(a("textarea", {
              "onUpdate:modelValue": Y[2] || (Y[2] = (Z) => u.value.documentIds = Z),
              rows: "2",
              placeholder: "上传资料列表中的 ID"
            }, null, 512), [
              [Ge, u.value.documentIds]
            ])
          ]),
          a("label", EN, [
            Y[14] || (Y[14] = a("span", null, [
              _e("标签 "),
              a("em", null, "用逗号分隔")
            ], -1)),
            De(a("input", {
              "onUpdate:modelValue": Y[3] || (Y[3] = (Z) => u.value.tags = Z),
              placeholder: "角色, RAG, 回归"
            }, null, 512), [
              [Ge, u.value.tags]
            ])
          ]),
          a("label", CN, [
            Y[16] || (Y[16] = a("span", null, "难度", -1)),
            De(a("select", {
              "onUpdate:modelValue": Y[4] || (Y[4] = (Z) => u.value.difficulty = Z)
            }, Y[15] || (Y[15] = [
              a("option", { value: "easy" }, "简单", -1),
              a("option", { value: "medium" }, "中等", -1),
              a("option", { value: "hard" }, "困难", -1)
            ]), 512), [
              [fn, u.value.difficulty]
            ])
          ]),
          a("label", xN, [
            De(a("input", {
              "onUpdate:modelValue": Y[5] || (Y[5] = (Z) => u.value.enabled = Z),
              type: "checkbox"
            }, null, 512), [
              [Rl, u.value.enabled]
            ]),
            Y[17] || (Y[17] = a("span", null, "加入后续评测", -1))
          ])
        ]),
        a("div", SN, [
          a("button", {
            class: "yv-button",
            type: "button",
            disabled: s.value,
            onClick: P
          }, "取消", 8, $N),
          a("button", {
            class: "yv-button primary",
            type: "button",
            disabled: s.value || !u.value.question.trim(),
            onClick: E
          }, [
            ne(U(ro), { size: 14 }),
            _e(N(s.value ? "保存中" : "保存题目"), 1)
          ], 8, IN)
        ])
      ])) : se("", !0),
      o.value && !n.value.length ? (v(), _("div", NN, "读取题集…")) : !n.value.length && !z.spaceId ? (v(), _("div", TN, "先选择一个角色")) : n.value.length ? (v(), _("div", PN, [
        (v(!0), _(xe, null, Ve(n.value, (Z) => {
          var H;
          return v(), _("article", {
            key: Z.id,
            class: be(["eval-dataset-row", { "is-disabled": Z.enabled === !1 }])
          }, [
            a("div", ON, [
              a("strong", null, N(Z.question), 1),
              Z.expected_answer ? (v(), _("p", AN, N(Z.expected_answer), 1)) : se("", !0),
              a("div", DN, [
                a("span", null, N(b(Z.difficulty)), 1),
                (H = Z.relevant_document_ids) != null && H.length ? (v(), _("span", RN, N(Z.relevant_document_ids.length) + " 份资料", 1)) : se("", !0),
                (v(!0), _(xe, null, Ve(Z.tags || [], (T) => (v(), _("span", {
                  key: T,
                  class: "eval-dataset-tag"
                }, N(T), 1))), 128)),
                Z.enabled === !1 ? (v(), _("span", LN, "已停用")) : se("", !0)
              ])
            ]),
            a("div", VN, [
              a("button", {
                class: "icon-button",
                type: "button",
                title: "编辑",
                disabled: s.value,
                onClick: (T) => M(Z)
              }, [
                ne(U(zl), { size: 15 })
              ], 8, zN),
              a("button", {
                class: "icon-button danger",
                type: "button",
                title: "删除",
                disabled: s.value,
                onClick: (T) => x(Z)
              }, [
                ne(U($n), { size: 15 })
              ], 8, FN)
            ])
          ], 2);
        }), 128))
      ])) : (v(), _("div", MN, "还没有人工题目，先保存一条真实问题。"))
    ]));
  }
}), HN = { class: "eval-candidates" }, UN = { class: "eval-candidates-heading" }, jN = { key: 0 }, GN = ["disabled"], qN = {
  key: 0,
  class: "eval-candidates-error"
}, YN = {
  key: 1,
  class: "eval-candidates-empty"
}, XN = {
  key: 2,
  class: "eval-candidates-empty"
}, KN = {
  key: 3,
  class: "eval-candidates-empty"
}, WN = {
  key: 4,
  class: "eval-candidates-list"
}, ZN = { class: "eval-candidate-head" }, JN = { class: "eval-candidate-source" }, QN = { class: "eval-candidate-signals" }, e3 = { class: "eval-candidate-question" }, t3 = { class: "eval-candidate-meta" }, n3 = { class: "eval-candidate-editor" }, o3 = { class: "yv-field" }, s3 = ["onUpdate:modelValue"], i3 = { class: "eval-candidate-fields" }, l3 = { class: "yv-field" }, r3 = ["onUpdate:modelValue"], a3 = { class: "yv-field" }, u3 = ["onUpdate:modelValue"], c3 = { class: "yv-field" }, d3 = ["onUpdate:modelValue"], f3 = { class: "yv-field" }, p3 = ["onUpdate:modelValue"], h3 = { class: "eval-candidate-actions" }, v3 = ["disabled", "onClick"], g3 = ["disabled", "onClick"], m3 = /* @__PURE__ */ He({
  __name: "EvalCandidatePanel",
  props: {
    spaceId: {}
  },
  emits: ["accepted"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = te([]), i = te(0), l = te(!1), r = te(!1), u = te(""), c = te(""), d = un({}), f = ae(() => !!n.spaceId);
    function p(L) {
      return d[L.id] || (d[L.id] = {
        expectedAnswer: L.suggested_answer || "",
        documentIds: (L.relevant_document_ids || []).join(`
`),
        tags: (L.tags || []).join(", "),
        difficulty: "medium",
        note: ""
      });
    }
    function h(L) {
      return L.source === "feedback" ? "用户反馈" : "质量信号";
    }
    function b() {
      return n.spaceId ? (l.value = !0, c.value = "", sN(n.spaceId).then((L) => {
        s.value = L.items || [], i.value = L.pending_total || s.value.length;
        for (const E of s.value) p(E);
      }).catch((L) => {
        c.value = it(L);
      }).finally(() => {
        l.value = !1;
      })) : (s.value = [], i.value = 0, Promise.resolve());
    }
    async function C() {
      if (n.spaceId) {
        r.value = !0, c.value = "";
        try {
          const L = await iN(n.spaceId);
          s.value = L.items || [], i.value = s.value.length;
          for (const E of s.value) p(E);
        } catch (L) {
          c.value = it(L);
        } finally {
          r.value = !1;
        }
      }
    }
    async function M(L) {
      if (n.spaceId) {
        u.value = L.id, c.value = "";
        try {
          await rN(n.spaceId, L.id, p(L)), s.value = s.value.filter((E) => E.id !== L.id), i.value = Math.max(0, i.value - 1), o("accepted");
        } catch (E) {
          c.value = it(E);
        } finally {
          u.value = "";
        }
      }
    }
    async function P(L) {
      if (n.spaceId) {
        u.value = L.id, c.value = "";
        try {
          await aN(n.spaceId, L.id, d[L.id].note), s.value = s.value.filter((E) => E.id !== L.id), i.value = Math.max(0, i.value - 1);
        } catch (E) {
          c.value = it(E);
        } finally {
          u.value = "";
        }
      }
    }
    return ze(() => n.spaceId, b, { immediate: !0 }), (L, E) => (v(), _("section", HN, [
      a("header", UN, [
        a("div", null, [
          E[1] || (E[1] = a("span", { class: "yv-kicker" }, "Quality loop", -1)),
          a("h2", null, [
            E[0] || (E[0] = _e("失败样本 ")),
            f.value ? (v(), _("small", jN, N(i.value) + " 条待确认", 1)) : se("", !0)
          ]),
          E[2] || (E[2] = a("p", null, "把真实问答里的问题沉淀为人工题，确认后才会进入正式评测。", -1))
        ]),
        a("button", {
          class: "yv-button",
          type: "button",
          disabled: !f.value || r.value,
          onClick: C
        }, [
          ne(U(qt), {
            size: 14,
            class: be({ "is-spinning": r.value })
          }, null, 8, ["class"]),
          _e(N(r.value ? "扫描中" : "扫描新样本"), 1)
        ], 8, GN)
      ]),
      c.value ? (v(), _("p", qN, N(c.value), 1)) : se("", !0),
      f.value ? l.value && !s.value.length ? (v(), _("div", XN, "读取待确认样本…")) : s.value.length ? (v(), _("div", WN, [
        (v(!0), _(xe, null, Ve(s.value, (x) => (v(), _("article", {
          key: x.id,
          class: "eval-candidate-row"
        }, [
          a("div", ZN, [
            a("div", null, [
              a("span", JN, N(h(x)), 1),
              a("small", null, "查询 " + N(x.source_query_id.slice(0, 8)), 1)
            ]),
            a("div", QN, [
              (v(!0), _(xe, null, Ve(x.signals, (z) => (v(), _("span", {
                key: z.code
              }, N(z.label), 1))), 128))
            ])
          ]),
          a("strong", e3, N(x.question), 1),
          a("div", t3, [
            a("span", null, "置信度 " + N(x.confidence.toFixed(2)), 1),
            a("span", null, N(x.grounded ? "已接地" : "未接地"), 1),
            a("span", null, N(x.useful ? "已解决" : "未解决"), 1)
          ]),
          a("div", n3, [
            a("label", o3, [
              E[3] || (E[3] = a("span", null, [
                _e("标准答案 "),
                a("em", null, "建议答案可直接修改")
              ], -1)),
              De(a("textarea", {
                "onUpdate:modelValue": (z) => d[x.id].expectedAnswer = z,
                rows: "3"
              }, null, 8, s3), [
                [Ge, d[x.id].expectedAnswer]
              ])
            ]),
            a("div", i3, [
              a("label", l3, [
                E[4] || (E[4] = a("span", null, "关联资料 ID", -1)),
                De(a("input", {
                  "onUpdate:modelValue": (z) => d[x.id].documentIds = z,
                  placeholder: "每行一个 DocumentJob ID"
                }, null, 8, r3), [
                  [Ge, d[x.id].documentIds]
                ])
              ]),
              a("label", a3, [
                E[5] || (E[5] = a("span", null, "标签", -1)),
                De(a("input", {
                  "onUpdate:modelValue": (z) => d[x.id].tags = z,
                  placeholder: "例如：反馈回流, 边界问题"
                }, null, 8, u3), [
                  [Ge, d[x.id].tags]
                ])
              ]),
              a("label", c3, [
                E[7] || (E[7] = a("span", null, "难度", -1)),
                De(a("select", {
                  "onUpdate:modelValue": (z) => d[x.id].difficulty = z
                }, E[6] || (E[6] = [
                  a("option", { value: "easy" }, "简单", -1),
                  a("option", { value: "medium" }, "中等", -1),
                  a("option", { value: "hard" }, "困难", -1)
                ]), 8, d3), [
                  [fn, d[x.id].difficulty]
                ])
              ])
            ]),
            a("label", f3, [
              E[8] || (E[8] = a("span", null, "复核备注", -1)),
              De(a("input", {
                "onUpdate:modelValue": (z) => d[x.id].note = z,
                placeholder: "可选：记录为什么收录或忽略"
              }, null, 8, p3), [
                [Ge, d[x.id].note]
              ])
            ])
          ]),
          a("div", h3, [
            a("button", {
              class: "yv-button primary",
              type: "button",
              disabled: u.value === x.id,
              onClick: (z) => M(x)
            }, [
              ne(U(ro), { size: 14 }),
              E[9] || (E[9] = _e("收录为人工题"))
            ], 8, v3),
            a("button", {
              class: "yv-button",
              type: "button",
              disabled: u.value === x.id,
              onClick: (z) => P(x)
            }, [
              ne(U(Gt), { size: 14 }),
              E[10] || (E[10] = _e("忽略"))
            ], 8, g3)
          ])
        ]))), 128))
      ])) : (v(), _("div", KN, "暂无待确认样本。点击“扫描新样本”读取低置信度、未接地或负反馈查询。")) : (v(), _("div", YN, "先选择一个角色。"))
    ]));
  }
}), y3 = { class: "yv-page evaluation-page" }, b3 = { class: "evaluation-hero" }, _3 = { class: "evaluation-control" }, w3 = { class: "control-fields" }, k3 = { class: "yv-field" }, E3 = ["value"], C3 = { class: "yv-field" }, x3 = { class: "yv-field" }, S3 = { class: "control-actions" }, $3 = ["disabled"], I3 = ["disabled"], N3 = ["href"], T3 = { class: "run-status" }, M3 = {
  key: 0,
  class: "results-stage"
}, P3 = { class: "metric-lead" }, O3 = { class: "metric-groups" }, A3 = {
  key: 0,
  class: "analysis-block"
}, D3 = { class: "case-section" }, R3 = { class: "case-index" }, L3 = {
  key: 1,
  class: "evaluation-empty"
}, V3 = /* @__PURE__ */ He({
  __name: "App",
  setup(e) {
    const t = te([]), n = te(""), o = te("fast"), s = te("generated"), i = ae(() => t.value.find((k) => k.id === n.value)), l = te({ state: "idle", progress: 0, total: 0 }), r = te(null), u = te(""), c = te(""), d = te(!1), f = te(!1), p = te(!1);
    let h = 0;
    const b = ae(() => ({ idle: "未运行", running: l.value.phase === "generating" ? "生成问题" : "评测中", done: "已完成", error: "失败" })[l.value.state] || l.value.state || "未运行"), C = ae(() => JI(Number(l.value.progress || 0), Number(l.value.total || 0))), M = ae(() => {
      var k;
      return ((k = r.value) == null ? void 0 : k.cases) || [];
    }), P = ae(() => p.value ? M.value : M.value.slice(0, 3)), L = ae(() => {
      var D;
      const k = ((D = r.value) == null ? void 0 : D.metrics) || {};
      return [
        { label: "Top 3 召回率", value: Us("recall_at_3_answerable", k.recall_at_3_answerable), tone: z("recall_at_3_answerable", k.recall_at_3_answerable) },
        { label: "回答接地率", value: Us("grounded_rate", k.grounded_rate), tone: z("grounded_rate", k.grounded_rate) },
        { label: "质量通过率", value: Us("accepted_rate", k.accepted_rate), tone: z("accepted_rate", k.accepted_rate) },
        { label: "P95 总延迟", value: k.p95_total_latency_ms == null ? "—" : `${Math.round(Number(k.p95_total_latency_ms))} ms`, tone: "" }
      ];
    }), E = [
      { title: "检索质量", keys: ["recall_at_3_answerable", "precision_at_3_answerable", "mrr_at_3_answerable", "hit_at_3_answerable", "cases_answerable", "mean_latency_ms", "p95_latency_ms"] },
      { title: "回答质量", keys: ["grounded_rate", "useful_rate", "accepted_rate", "answer_rate", "refusal_rate", "cases_checked", "mean_confidence", "scope_isolation_ok"] },
      { title: "行为与性能", keys: ["rewrite_rate", "correction_rate", "mean_rewrite_count", "mean_correction_count", "complex_rewrite_rate", "complex_correction_rate", "probe_refusal_rate", "cases_total", "cases_complex", "mean_total_latency_ms", "p95_total_latency_ms"] }
    ], x = { recall_at_3_answerable: "可答问题召回率 Recall@3", precision_at_3_answerable: "可答问题精确率 Precision@3", mrr_at_3_answerable: "可答问题 MRR@3", hit_at_3_answerable: "可答问题命中 Hit@3", cases_answerable: "可答用例数", mean_latency_ms: "平均检索延迟 (ms)", p95_latency_ms: "P95 检索延迟 (ms)", grounded_rate: "事实接地率", useful_rate: "问题解决率", accepted_rate: "质量通过率", answer_rate: "正常作答率", refusal_rate: "拒答率", cases_checked: "生成已检用例", mean_confidence: "平均置信度", scope_isolation_ok: "跨角色隔离校验", rewrite_rate: "查询改写触发率", correction_rate: "生成纠错触发率", mean_rewrite_count: "平均改写次数", mean_correction_count: "平均纠错次数", complex_rewrite_rate: "复杂题改写率", complex_correction_rate: "复杂题纠错率", probe_refusal_rate: "无关问题拒答率", cases_total: "用例总数", cases_complex: "复杂题数", mean_total_latency_ms: "平均整链路延迟 (ms)", p95_total_latency_ms: "P95 整链路延迟 (ms)" };
    function z(k, D) {
      if (k === "scope_isolation_ok") return D ? "good" : "bad";
      const O = Number(D);
      return !["recall_at_3_answerable", "precision_at_3_answerable", "mrr_at_3_answerable", "hit_at_3_answerable", "grounded_rate", "useful_rate", "accepted_rate", "answer_rate", "mean_confidence"].includes(k) || !Number.isFinite(O) ? "" : O >= 0.8 ? "good" : O <= 0.2 ? "bad" : "";
    }
    function Y() {
      return l.value.phase === "generating" ? l.value.status_text || "正在从角色资料生成问题" : l.value.total > 0 ? [`已完成 ${l.value.progress}/${l.value.total} 条`, l.value.current_question_text, l.value.current_step].filter(Boolean).join(" · ") : c.value || "等待开始";
    }
    async function Z() {
      try {
        t.value = await je("/api/personas"), !n.value && t.value.length && (n.value = t.value[0].id);
      } catch (k) {
        c.value = it(k);
      }
    }
    async function H() {
      r.value = await je("/api/eval/results");
    }
    function T() {
      h += 1, d.value = !1;
    }
    async function X() {
      const k = ++h;
      d.value = !0;
      for (let D = 0; D < 1200 && k === h; D += 1) {
        try {
          if (l.value = await je("/api/eval/status"), l.value.state === "done") {
            await H(), d.value = !1;
            return;
          }
          if (l.value.state === "error") {
            c.value = l.value.error || "评测失败", d.value = !1;
            return;
          }
        } catch (O) {
          c.value = it(O), d.value = !1;
          return;
        }
        await new Promise((O) => setTimeout(O, 500));
      }
    }
    async function q() {
      if (!n.value) {
        c.value = "请先选择评测角色";
        return;
      }
      c.value = "", r.value = null, u.value = "", p.value = !1;
      try {
        await je("/api/eval/run", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(QI({ personaId: n.value, tier: o.value, datasetMode: s.value })) }), await X();
      } catch (k) {
        c.value = it(k), d.value = !1;
      }
    }
    async function V() {
      f.value = !0;
      try {
        const k = await je("/api/eval/analyze", { method: "POST" });
        u.value = k.analysis || "分析结果为空";
      } catch (k) {
        c.value = it(k);
      } finally {
        f.value = !1;
      }
    }
    async function R() {
      await Z();
      try {
        l.value = await je("/api/eval/status"), l.value.state === "running" ? X() : l.value.state === "done" && await H();
      } catch {
      }
    }
    return xt(() => {
      const k = document.querySelector("#evaluation-app-root");
      k == null || k.addEventListener("charactoid:evaluation-show", R), k == null || k.addEventListener("charactoid:evaluation-hide", T), R();
    }), Mn(T), (k, D) => {
      var O, B;
      return v(), _("main", y3, [
        a("header", b3, [
          D[4] || (D[4] = a("div", null, [
            a("span", { class: "yv-kicker" }, "Retrieval quality lab"),
            a("h1", null, "RAG 评测"),
            a("p", null, "用可复现指标检查召回、回答接地与整链路延迟。")
          ], -1)),
          a("span", {
            class: be(["yv-status", l.value.state === "done" ? "ok" : l.value.state === "error" ? "error" : d.value ? "warn" : ""])
          }, N(b.value), 3)
        ]),
        a("section", _3, [
          a("div", w3, [
            a("label", k3, [
              D[6] || (D[6] = a("span", null, "评测角色", -1)),
              De(a("select", {
                "onUpdate:modelValue": D[0] || (D[0] = (G) => n.value = G)
              }, [
                D[5] || (D[5] = a("option", { value: "" }, "请选择角色", -1)),
                (v(!0), _(xe, null, Ve(t.value, (G) => (v(), _("option", {
                  key: G.id,
                  value: G.id
                }, N(G.name), 9, E3))), 128))
              ], 512), [
                [fn, n.value]
              ])
            ]),
            a("label", C3, [
              D[8] || (D[8] = a("span", null, "问题规模", -1)),
              De(a("select", {
                "onUpdate:modelValue": D[1] || (D[1] = (G) => o.value = G)
              }, D[7] || (D[7] = [
                a("option", { value: "fast" }, "轻量 · 5 个问题", -1),
                a("option", { value: "standard" }, "标准 · 10 个问题", -1),
                a("option", { value: "thorough" }, "全面 · 15 个问题", -1)
              ]), 512), [
                [fn, o.value]
              ])
            ]),
            a("label", x3, [
              D[10] || (D[10] = a("span", null, "题目来源", -1)),
              De(a("select", {
                "onUpdate:modelValue": D[2] || (D[2] = (G) => s.value = G)
              }, D[9] || (D[9] = [
                a("option", { value: "generated" }, "自动生成", -1),
                a("option", { value: "manual" }, "人工题集", -1),
                a("option", { value: "combined" }, "人工 + 自动", -1)
              ]), 512), [
                [fn, s.value]
              ])
            ])
          ]),
          a("div", S3, [
            a("button", {
              class: "yv-button primary",
              disabled: d.value,
              onClick: q
            }, [
              ne(U(Ir)),
              _e(N(d.value ? "评测进行中" : "生成并评测"), 1)
            ], 8, $3),
            a("button", {
              class: "yv-button",
              disabled: !r.value || f.value,
              onClick: V
            }, [
              ne(U($g)),
              _e(N(f.value ? "分析中" : "AI 分析"), 1)
            ], 8, I3),
            a("a", {
              class: be(["yv-button", { disabled: !r.value }]),
              href: r.value ? "/api/eval/export" : void 0
            }, [
              ne(U(ko)),
              D[11] || (D[11] = _e("导出 JSON"))
            ], 10, N3)
          ])
        ]),
        ne(m3, {
          "space-id": (O = i.value) == null ? void 0 : O.knowledge_space_id
        }, null, 8, ["space-id"]),
        ne(BN, {
          "space-id": (B = i.value) == null ? void 0 : B.knowledge_space_id
        }, null, 8, ["space-id"]),
        a("section", T3, [
          a("div", null, [
            a("strong", null, N(b.value), 1),
            a("p", {
              class: be({ error: c.value })
            }, N(c.value || Y()), 3)
          ]),
          a("div", {
            class: be(["progress-track", { indeterminate: d.value && l.value.phase === "generating" }])
          }, [
            a("span", {
              style: et({ width: `${C.value}%` })
            }, null, 4)
          ], 2)
        ]),
        r.value ? (v(), _("section", M3, [
          a("div", P3, [
            (v(!0), _(xe, null, Ve(L.value, (G) => (v(), _("article", {
              key: G.label,
              class: be(G.tone)
            }, [
              a("span", null, N(G.label), 1),
              a("strong", null, N(G.value), 1)
            ], 2))), 128))
          ]),
          a("div", O3, [
            (v(), _(xe, null, Ve(E, (G) => a("section", {
              key: G.title
            }, [
              a("h2", null, N(G.title), 1),
              a("div", null, [
                (v(!0), _(xe, null, Ve(G.keys.filter((ie) => {
                  var de, ve;
                  return ((de = r.value.metrics) == null ? void 0 : de[ie]) !== void 0 && ((ve = r.value.metrics) == null ? void 0 : ve[ie]) !== null;
                }), (ie) => (v(), _("article", { key: ie }, [
                  a("span", null, N(x[ie] || ie), 1),
                  a("strong", {
                    class: be(z(ie, r.value.metrics[ie]))
                  }, N(U(Us)(ie, r.value.metrics[ie])), 3)
                ]))), 128))
              ])
            ])), 64))
          ]),
          u.value ? (v(), _("section", A3, [
            D[12] || (D[12] = a("span", { class: "yv-kicker" }, "AI review", -1)),
            D[13] || (D[13] = a("h2", null, "结果解读", -1)),
            a("p", null, N(u.value), 1)
          ])) : se("", !0),
          a("section", D3, [
            a("header", null, [
              D[14] || (D[14] = a("div", null, [
                a("span", { class: "yv-kicker" }, "Case evidence"),
                a("h2", null, "逐条详情")
              ], -1)),
              M.value.length > 3 ? (v(), _("button", {
                key: 0,
                class: "yv-button",
                onClick: D[3] || (D[3] = (G) => p.value = !p.value)
              }, N(p.value ? "收起" : `展开全部 ${M.value.length} 条`), 1)) : se("", !0)
            ]),
            (v(!0), _(xe, null, Ve(P.value, (G, ie) => (v(), _("article", {
              key: ie,
              class: "case-row"
            }, [
              a("div", R3, N(String(ie + 1).padStart(2, "0")), 1),
              a("div", null, [
                a("strong", null, N(G.question), 1),
                a("p", null, N((G.answer || "").slice(0, 240)), 1),
                a("small", null, N([G.grounded == null ? "grounded=—" : `grounded=${G.grounded}`, G.useful == null ? "useful=—" : `useful=${G.useful}`, `confidence=${G.confidence ?? "—"}`, G.rewrite_used ? "查询改写" : "", G.corrected ? "生成纠错" : "", G.is_probe ? "无关探针" : ""].filter(Boolean).join(" · ")), 1)
              ]),
              a("span", {
                class: be(["yv-status", G.accepted || G.is_probe && G.refused ? "ok" : "error"])
              }, N(G.accepted || G.is_probe && G.refused ? "符合预期" : "未通过"), 3)
            ]))), 128))
          ])
        ])) : (v(), _("section", L3, [
          ne(U(vg)),
          D[15] || (D[15] = a("h2", null, "等待一轮可比较的结果", -1)),
          D[16] || (D[16] = a("p", null, "选择角色和问题规模后开始。评测会覆盖知识召回、复杂问题与无关问题拒答。", -1))
        ]))
      ]);
    };
  }
});
let Bn = null;
const Fp = () => document.querySelector("#evaluation-app-root");
function g4(e = "#evaluation-app-root") {
  if (Bn) return Bn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("RAG 评测挂载点不存在");
  return Bn = Cs(V3), Bn.mount(t), Bn;
}
function m4() {
  var e;
  (e = Fp()) == null || e.dispatchEvent(new CustomEvent("charactoid:evaluation-show"));
}
function y4() {
  var e;
  (e = Fp()) == null || e.dispatchEvent(new CustomEvent("charactoid:evaluation-hide"));
}
function b4() {
  Bn && (Bn.unmount(), Bn = null);
}
async function Is(e, t) {
  const n = await fetch(e, t), o = await n.json().catch(() => null);
  if (!n.ok) throw new Error((o == null ? void 0 : o.detail) || `请求失败 (${n.status})`);
  return o;
}
function z3() {
  return Is("/api/reranker/status", { cache: "no-store" });
}
function F3(e) {
  return Is("/api/reranker/install", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
    body: JSON.stringify({ model_id: "Qwen/Qwen3-Reranker-0.6B", source: "modelscope", device: e })
  });
}
function B3() {
  return Is("/api/reranker/install/cancel", { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } });
}
function H3() {
  return Is("/api/reranker/model", { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } });
}
function U3() {
  return Is("/api/reranker/model-directory", { method: "POST", headers: { "X-CHARACTOID-Request": "web" } });
}
const j3 = { class: "settings-summary" }, G3 = { class: "section-toggle-label" }, q3 = { class: "asr-resource-bar" }, Y3 = {
  key: 0,
  max: "100"
}, X3 = {
  key: 1,
  class: "inline-status"
}, K3 = { class: "asr-actions" }, W3 = ["disabled"], Z3 = ["disabled"], J3 = ["disabled"], Q3 = ["disabled"], eT = { class: "settings-grid one-column reranker-settings-grid" }, tT = { class: "field provider-field" }, nT = ["disabled"], oT = /* @__PURE__ */ He({
  __name: "RerankerSettingsApp",
  setup(e) {
    const t = te(null), n = te("auto"), o = te(!1), s = te(""), i = te(!1);
    let l;
    const r = ae(() => s.value ? "检查失败" : t.value ? t.value.installing ? "安装中" : t.value.ready ? "已就绪" : t.value.installed ? "已安装，等待加载" : "未安装" : "检查中"), u = ae(() => s.value ? s.value : t.value ? t.value.ready ? "本地精排可用；检索候选将经过语义重排序。" : t.value.installed ? "模型文件完整，将在首次检索时加载。" : "未安装时系统自动使用 RRF 融合结果，不会阻断知识检索。" : "正在读取本地模型状态"), c = ae(() => {
      var C;
      if (!((C = t.value) != null && C.installing)) return "";
      const h = t.value.phase || "准备资源";
      return `${t.value.current_file || h} · ${Math.round(t.value.elapsed_seconds || 0)} 秒`;
    });
    async function d() {
      try {
        t.value = await z3(), n.value = t.value.device || n.value, s.value = t.value.error || "";
      } catch (h) {
        s.value = h instanceof Error ? h.message : "无法读取 Reranker 状态";
      }
    }
    async function f(h) {
      if (!o.value) {
        o.value = !0, s.value = "";
        try {
          t.value = await h();
        } catch (b) {
          s.value = b instanceof Error ? b.message : "操作失败";
        } finally {
          o.value = !1;
        }
      }
    }
    async function p() {
      if (!o.value) {
        o.value = !0, s.value = "";
        try {
          await U3();
        } catch (h) {
          s.value = h instanceof Error ? h.message : "无法打开模型目录";
        } finally {
          o.value = !1;
        }
      }
    }
    return xt(() => {
      d(), l = window.setInterval(() => {
        var h;
        (h = t.value) != null && h.installing && d();
      }, 1500);
    }), Mn(() => {
      l && window.clearInterval(l);
    }), (h, b) => {
      var C, M, P, L, E, x, z;
      return v(), _("details", {
        class: "panel settings-section",
        "data-collapsible": "",
        onToggle: b[4] || (b[4] = (Y) => i.value = Y.currentTarget.open)
      }, [
        a("summary", j3, [
          b[5] || (b[5] = a("span", { class: "settings-summary-title" }, [
            a("strong", null, "Reranker 精排"),
            a("span", { class: "settings-summary-meta" }, "候选重排序 · 本地模型 · RRF 自动降级")
          ], -1)),
          a("span", G3, N(i.value ? "收起" : "展开"), 1)
        ]),
        b[9] || (b[9] = a("p", { class: "settings-help" }, [
          _e("使用本地模型 "),
          a("code", null, "Qwen3-Reranker-0.6B"),
          _e(" 对召回候选精排；模型未安装或暂不可用时，系统自动保留 RRF 融合结果。")
        ], -1)),
        a("div", q3, [
          a("div", null, [
            a("strong", null, N(r.value), 1),
            a("p", {
              class: be(["inline-status", { "is-error": !!s.value }]),
              role: "status",
              "aria-live": "polite"
            }, N(u.value), 3),
            (C = t.value) != null && C.installing ? (v(), _("progress", Y3)) : se("", !0),
            c.value ? (v(), _("p", X3, N(c.value), 1)) : se("", !0)
          ]),
          a("div", K3, [
            a("button", {
              class: "button button-secondary",
              type: "button",
              disabled: o.value,
              onClick: p
            }, [
              ne(U(ss), { size: 16 }),
              b[6] || (b[6] = _e("打开目录"))
            ], 8, W3),
            a("button", {
              class: "button button-danger",
              type: "button",
              disabled: o.value || !((M = t.value) != null && M.installed) || ((P = t.value) == null ? void 0 : P.installing),
              onClick: b[0] || (b[0] = (Y) => f(U(H3)))
            }, "删除", 8, Z3),
            (L = t.value) != null && L.installing ? (v(), _("button", {
              key: 0,
              class: "button button-secondary",
              type: "button",
              disabled: o.value || t.value.cancelling,
              onClick: b[1] || (b[1] = (Y) => f(U(B3)))
            }, "取消下载", 8, J3)) : (v(), _("button", {
              key: 1,
              class: "button button-primary",
              type: "button",
              disabled: o.value || ((E = t.value) == null ? void 0 : E.installed),
              onClick: b[2] || (b[2] = (Y) => f(() => U(F3)(n.value)))
            }, "安装", 8, Q3))
          ])
        ]),
        a("div", eT, [
          a("label", tT, [
            b[8] || (b[8] = a("span", null, "运行设备", -1)),
            De(a("select", {
              "onUpdate:modelValue": b[3] || (b[3] = (Y) => n.value = Y),
              disabled: o.value || ((x = t.value) == null ? void 0 : x.installing) || ((z = t.value) == null ? void 0 : z.installed)
            }, b[7] || (b[7] = [
              a("option", { value: "auto" }, "自动（GPU 优先）", -1),
              a("option", { value: "cuda" }, "仅 GPU", -1),
              a("option", { value: "cpu" }, "仅 CPU", -1)
            ]), 8, nT), [
              [fn, n.value]
            ])
          ])
        ]),
        b[10] || (b[10] = a("details", { class: "settings-help" }, [
          a("summary", null, "参数说明"),
          a("p", null, [
            _e("模型固定为 "),
            a("code", null, "Qwen/Qwen3-Reranker-0.6B"),
            _e("，从 ModelScope 下载。设备选择在安装时保存；需要更换设备时，删除后重新安装。")
          ])
        ], -1))
      ], 32);
    };
  }
}), sT = /* @__PURE__ */ qr(oT, [["__scopeId", "data-v-bf7b6366"]]), iT = { class: "providers-settings" }, lT = {
  class: "provider-tabs",
  role: "tablist",
  "aria-label": "供应商类型"
}, rT = ["aria-selected", "onClick"], aT = {
  key: 0,
  class: "download-center",
  "aria-label": "资源下载中心"
}, uT = ["aria-expanded"], cT = { class: "download-summary-icon" }, dT = { class: "download-summary-copy" }, fT = {
  key: 1,
  class: "local-production-zone audio-workbench",
  "aria-labelledby": "local-production-title"
}, pT = {
  class: "audio-section",
  "aria-labelledby": "audio-common-title"
}, hT = { class: "production-grid audio-grid audio-grid-2" }, vT = {
  key: 0,
  class: "production-card"
}, gT = { class: "production-card-head" }, mT = {
  key: 0,
  class: "install-progress"
}, yT = { class: "install-progress-head" }, bT = { class: "production-actions" }, _T = ["disabled"], wT = { class: "production-card production-card-ffmpeg" }, kT = { class: "production-card-head" }, ET = { class: "production-facts" }, CT = {
  key: 0,
  class: "install-progress"
}, xT = { class: "install-progress-head" }, ST = {
  key: 1,
  class: "config-hint"
}, $T = { class: "production-actions" }, IT = ["disabled"], NT = {
  class: "audio-section",
  "aria-labelledby": "audio-voice-title"
}, TT = { class: "production-grid audio-grid audio-grid-2" }, MT = {
  key: 0,
  class: "production-card production-card-gsv"
}, PT = { class: "production-card-head" }, OT = { class: "production-facts" }, AT = {
  key: 0,
  class: "install-progress"
}, DT = { class: "install-progress-head" }, RT = { class: "production-actions" }, LT = ["disabled"], VT = {
  key: 1,
  class: "production-card production-card-rvc"
}, zT = { class: "production-card-head" }, FT = {
  key: 0,
  class: "install-progress"
}, BT = { class: "install-progress-head" }, HT = { class: "production-actions" }, UT = {
  class: "audio-section",
  "aria-labelledby": "audio-stt-title"
}, jT = { class: "production-grid audio-grid audio-grid-1" }, GT = {
  key: 0,
  class: "production-card production-card-stt"
}, qT = { class: "production-card-head" }, YT = { class: "production-facts" }, XT = {
  key: 0,
  class: "install-progress"
}, KT = { class: "install-progress-head" }, WT = { class: "production-actions" }, ZT = ["disabled"], JT = {
  key: 2,
  class: "providers-main"
}, QT = {
  key: 0,
  class: "loading-state"
}, eM = {
  key: 1,
  class: "error-state"
}, tM = {
  key: 2,
  class: "empty-state"
}, nM = ["onClick", "onKeydown"], oM = { class: "provider-header" }, sM = { class: "provider-title" }, iM = {
  key: 0,
  class: "mode-badge"
}, lM = {
  key: 1,
  class: "mode-badge api"
}, rM = ["aria-checked", "aria-label", "onClick", "disabled"], aM = {
  key: 1,
  class: "active-label"
}, uM = { class: "provider-description" }, cM = {
  key: 0,
  class: "provider-meta resource-meta"
}, dM = { class: "install-progress-head" }, fM = { class: "download-task-meta" }, pM = { key: 0 }, hM = { key: 1 }, vM = { key: 2 }, gM = {
  key: 3,
  class: "task-error"
}, mM = {
  key: 2,
  class: "provider-meta"
}, yM = {
  key: 3,
  class: "provider-meta"
}, bM = {
  key: 0,
  class: "meta-url"
}, _M = { class: "provider-actions" }, wM = ["onClick"], kM = ["onClick", "disabled"], EM = {
  class: "config-drawer download-drawer provider-config-drawer",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "资源下载任务"
}, CM = { class: "drawer-header" }, xM = { class: "drawer-header-actions" }, SM = { class: "drawer-body download-list" }, $M = {
  key: 0,
  class: "empty-state"
}, IM = {
  key: 1,
  class: "empty-state"
}, NM = { class: "download-task-head" }, TM = { class: "download-task-meta" }, MM = { key: 0 }, PM = { key: 1 }, OM = { key: 2 }, AM = {
  key: 3,
  class: "task-error"
}, DM = {
  key: 0,
  class: "download-task-actions"
}, RM = ["onClick"], LM = {
  key: 1,
  class: "download-task-actions"
}, VM = ["onClick"], zM = {
  class: "config-drawer rvc-workspace-drawer provider-config-drawer",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "RVC 音频生产资源管理"
}, FM = { class: "drawer-header" }, BM = { class: "drawer-body rvc-workspace-body" }, HM = { class: "rvc-workspace-summary" }, UM = {
  class: "rvc-component-list",
  "aria-label": "RVC 资源状态"
}, jM = { class: "rvc-component-icon" }, GM = { key: 1 }, qM = { class: "rvc-component-copy" }, YM = { class: "rvc-install-block" }, XM = { class: "production-actions" }, KM = ["disabled"], WM = ["disabled"], ZM = ["disabled"], JM = ["disabled"], QM = {
  key: 0,
  class: "config-error"
}, e5 = {
  key: 1,
  class: "config-error"
}, t5 = {
  class: "config-drawer provider-config-drawer",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "FFmpeg 资源管理"
}, n5 = { class: "drawer-header" }, o5 = { class: "drawer-body" }, s5 = { class: "drawer-status" }, i5 = { class: "resource-config-readonly" }, l5 = { class: "production-facts" }, r5 = {
  key: 0,
  class: "install-progress"
}, a5 = { class: "install-progress-head" }, u5 = { class: "resource-control-actions" }, c5 = ["disabled"], d5 = ["disabled"], f5 = ["disabled"], p5 = ["disabled"], h5 = {
  key: 1,
  class: "config-error"
}, v5 = ["aria-label"], g5 = { class: "drawer-header" }, m5 = { class: "drawer-body" }, y5 = { class: "drawer-status" }, b5 = {
  key: 0,
  class: "field"
}, _5 = {
  key: 1,
  class: "field"
}, w5 = {
  key: 2,
  class: "resource-config-readonly"
}, k5 = {
  key: 0,
  class: "field"
}, E5 = { class: "field" }, C5 = ["placeholder"], x5 = { class: "field" }, S5 = ["placeholder"], $5 = { class: "resource-config-intro" }, I5 = {
  key: 0,
  class: "config-hint"
}, N5 = { class: "field" }, T5 = ["placeholder"], M5 = { class: "form-row" }, P5 = { class: "field" }, O5 = { class: "field" }, A5 = {
  key: 1,
  class: "resource-install-form"
}, D5 = {
  key: 2,
  class: "resource-config-readonly"
}, R5 = {
  key: 3,
  class: "resource-config-readonly"
}, L5 = { class: "resource-controls" }, V5 = {
  key: 0,
  class: "install-progress"
}, z5 = { class: "install-progress-head" }, F5 = { class: "download-task-meta" }, B5 = { key: 0 }, H5 = { key: 1 }, U5 = { key: 2 }, j5 = {
  key: 3,
  class: "task-error"
}, G5 = { class: "resource-control-actions" }, q5 = ["disabled"], Y5 = ["disabled"], X5 = ["disabled"], K5 = ["disabled"], W5 = ["disabled"], Z5 = ["disabled"], J5 = {
  key: 3,
  class: "config-hint"
}, Q5 = { class: "modal-actions" }, e4 = ["disabled"], t4 = {
  key: 4,
  class: "config-success"
}, n4 = {
  key: 6,
  class: "config-error"
}, Cl = "https://huggingface.co/lj1995/GPT-SoVITS-windows-package/resolve/main/GPT-SoVITS-v3lora-20250228.7z?download=true", o4 = /* @__PURE__ */ He({
  __name: "ProvidersApp",
  setup(e) {
    const t = te([]), n = te("llm"), o = te(!1), s = te(""), i = te(null), l = te(null), r = te(null), u = te(""), c = te(""), d = te({}), f = te(Cl), p = te([]), h = te(!1), b = te(!1), C = te(!1), M = te(!1), P = te(""), L = /* @__PURE__ */ new Set(), E = te(!1);
    let x;
    const z = te({
      provider_type: "",
      provider_id: "",
      api_key: "",
      base_url: "",
      model: "",
      source: "modelscope",
      device: "auto",
      enabled: !1
    }), Y = [
      { id: "llm", label: "对话模型(LLM)", count: 0 },
      { id: "embedding", label: "知识库向量化(Embedding)", count: 0 },
      { id: "reranker", label: "检索重排(Rerank)", count: 0 },
      { id: "stt", label: "语音识别(STT)", count: 0 },
      { id: "tts", label: "对话语音(TTS)", count: 0 },
      { id: "web_search", label: "联网搜索(Web)", count: 0 },
      { id: "audio", label: "音频(Audio)", count: 0 }
    ], Z = ae(() => t.value.filter((F) => F.type === n.value)), H = ae(() => t.value.find((F) => F.id === "rvc")), T = ae(() => t.value.find((F) => F.id === "separator")), X = ae(() => t.value.find((F) => F.id === "local_stt")), q = ae(() => t.value.find((F) => F.id === "gsv_tts_local")), V = te({}), R = ae(() => t.value.find((F) => F.id === i.value)), k = ae(() => !!(i.value || h.value || b.value || C.value));
    ze(k, (F) => {
      document.body.classList.toggle("provider-modal-open", F), document.documentElement.classList.toggle("provider-modal-open", F);
    }), ze(n, (F) => {
      F === "audio" && Ee("detect");
    });
    const D = ae(() => {
      var g;
      const F = (g = R.value) == null ? void 0 : g.id;
      return F === "local_embedding" ? "embedding" : F === "local_rerank" ? "reranker" : F === "local_stt" ? "stt" : F === "gsv_tts_local" ? "gpt_sovits" : F === "separator" ? "separator" : "none";
    });
    function O() {
      switch (D.value) {
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
    const B = {
      local_embedding: { status: "/api/embedding/status", install: "/api/embedding/install", cancel: "/api/embedding/install/cancel", remove: "/api/embedding/model", directory: "/api/embedding/model-directory" },
      local_rerank: { status: "/api/reranker/status", install: "/api/reranker/install", cancel: "/api/reranker/install/cancel", remove: "/api/reranker/model", directory: "/api/reranker/model-directory" },
      local_stt: { status: "/api/stt/status", install: "/api/stt/install", cancel: "/api/stt/install/cancel", remove: "/api/stt/install", directory: "/api/stt/model-directory" },
      gsv_tts_local: { status: "/api/gpt-sovits/status", install: "/api/gpt-sovits/install", cancel: "/api/gpt-sovits/install/cancel", remove: "/api/gpt-sovits/install", directory: "/api/gpt-sovits/model-directory", start: "/api/gpt-sovits/service/start", stop: "/api/gpt-sovits/service/stop" },
      // RVC 是音色转换资源，不计入 TTS 供应商数量；后端未实现时由抽屉显示可读错误。
      rvc: { status: "/api/providers/rvc/status", install: "/api/providers/rvc/install", cancel: "/api/providers/rvc/install/cancel", remove: "/api/providers/rvc/install", directory: "/api/providers/rvc/directory" },
      separator: { status: "/api/providers/resources/separator", install: "/api/providers/resources/separator/install", cancel: "/api/providers/resources/tasks", remove: "/api/providers/resources/separator", directory: "/api/providers/resources/separator" }
    };
    function G(F) {
      return ["queued", "preparing", "downloading", "verifying", "installing", "running"].includes(F.status);
    }
    const ie = ae(() => p.value.filter(G)), de = ae(() => p.value.filter((F) => !G(F)).length);
    function ve(F) {
      if (!F || F < 1024) return `${F || 0} B`;
      const g = ["KB", "MB", "GB", "TB"];
      let me = F, Le = -1;
      do
        me /= 1024, Le++;
      while (me >= 1024 && Le < g.length - 1);
      return `${me.toFixed(me >= 100 ? 0 : me >= 10 ? 1 : 2)} ${g[Le]}`;
    }
    function re(F) {
      return F == null || F < 0 ? "—" : F < 60 ? `${Math.round(F)} 秒` : `${Math.floor(F / 60)} 分 ${Math.round(F % 60)} 秒`;
    }
    function ye(F) {
      return { queued: "排队中", preparing: "准备中", downloading: "下载中", verifying: "校验中", installing: "安装中", ready: "已完成", failed: "失败", cancelled: "已取消", running: "运行中", interrupted: "已中断" }[F.status] || F.status;
    }
    function pe(F) {
      const g = {
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
      return F ? g[F] || F : "";
    }
    async function ce() {
      E.value = !0;
      try {
        const F = await fetch("/api/resources/tasks?limit=30", { headers: { "X-CHARACTOID-Request": "web" }, cache: "no-store" });
        if (!F.ok) return;
        const g = await F.json(), me = Array.isArray(g) ? g : g.tasks || g.items || [];
        p.value = me.map((Le) => ({
          ...Le,
          progress_percent: Le.progress_percent ?? (typeof Le.progress == "number" ? Le.progress : null),
          error_message: Le.error_message ?? Le.error,
          current_file: Le.current_file ?? Le.detail
        }));
      } catch {
      } finally {
        E.value = !1;
      }
    }
    async function Ie(F) {
      try {
        await fetch(`/api/resources/tasks/${encodeURIComponent(F.task_id)}`, { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } }), await ce();
      } catch (g) {
        s.value = g instanceof Error ? g.message : "取消下载失败";
      }
    }
    async function Me() {
      try {
        const F = await fetch("/api/resources/tasks?finished=true", { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } });
        if (!F.ok) {
          const g = await F.json().catch(() => ({}));
          throw new Error(g.detail || `HTTP ${F.status}`);
        }
        await ce();
      } catch (F) {
        s.value = F instanceof Error ? F.message : "清理下载记录失败";
      }
    }
    async function oe(F) {
      try {
        const g = await fetch(`/api/resources/tasks/${encodeURIComponent(F.task_id)}/retry`, { method: "POST", headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" } });
        if (!g.ok) {
          const me = await g.json().catch(() => ({}));
          throw new Error(me.detail || `HTTP ${g.status}`);
        }
        await ce();
      } catch (g) {
        s.value = g instanceof Error ? g.message : "重试下载失败";
      }
    }
    async function Se() {
      try {
        const F = await fetch("/api/providers/resources/ffmpeg/status", { headers: { "X-CHARACTOID-Request": "web" }, cache: "no-store" });
        F.ok && (V.value = await F.json());
      } catch {
      }
    }
    async function Ee(F) {
      const g = { install: "/api/providers/resources/ffmpeg/install", remove: "/api/providers/resources/ffmpeg", directory: "/api/providers/resources/ffmpeg/directory", detect: "/api/providers/resources/ffmpeg/detect" };
      r.value = `ffmpeg:${F}`, s.value = "", F === "detect" && (M.value = !0);
      try {
        const me = await fetch(g[F], { method: F === "remove" ? "DELETE" : F === "directory" ? "GET" : "POST", headers: { "X-CHARACTOID-Request": "web" } });
        if (!me.ok) {
          const Le = await me.json().catch(() => ({}));
          throw new Error(Le.detail || `HTTP ${me.status}`);
        }
        V.value = await me.json(), P.value = String(V.value.detection_note || "");
      } catch (me) {
        s.value = me instanceof Error ? me.message : "FFmpeg 操作失败";
      } finally {
        r.value = null, F === "detect" && (M.value = !1);
      }
    }
    async function ke(F) {
      const g = !!(F && typeof F == "object" && "quiet" in F && F.quiet);
      g || (o.value = !0, s.value = "");
      try {
        const me = await fetch("/api/providers/list", { cache: "no-store" });
        if (!me.ok) throw new Error(`HTTP ${me.status}`);
        const Le = await me.json();
        t.value = Le.providers || [], await Se(), Y.forEach((J) => {
          J.count = t.value.filter((Oe) => Oe.type === J.id).length;
        });
      } catch (me) {
        g || (s.value = me instanceof Error ? me.message : "加载失败");
      } finally {
        g || (o.value = !1);
      }
    }
    function $() {
      i.value = null, h.value = !1, b.value = !1, C.value = !1;
    }
    function A() {
      $(), h.value = !0;
    }
    function m() {
      $(), C.value = !0, P.value = "", Ee("detect");
    }
    function y(F) {
      if ($(), F.id === "rvc") {
        b.value = !0, ke();
        return;
      }
      i.value = F.id, u.value = "", c.value = "", s.value = "";
      const g = F.resource_status || {};
      let me = F.current_model || "";
      (F.id === "local_embedding" || F.id === "local_rerank") && !String(me).includes("/") ? me = String(g.model_id || F.default_model || "") : me || (me = String(g.model_id || F.default_model || "")), z.value = {
        provider_type: F.type,
        provider_id: F.id,
        api_key: F.current_api_key || "",
        base_url: F.current_base_url || F.default_base_url,
        model: me,
        source: String(g.source || "modelscope"),
        device: String(g.device || "auto"),
        enabled: F.is_active
      }, f.value = Cl;
    }
    function w() {
      b.value = !1, s.value = "";
    }
    function S(F) {
      var me, Le;
      const g = (Le = (me = H.value) == null ? void 0 : me.resource_status) == null ? void 0 : Le.components;
      return (g == null ? void 0 : g[F]) || {};
    }
    function j(F) {
      return !!S(F).ready;
    }
    function K(F) {
      return j(F) ? "已就绪" : F === "indices" ? "可选" : "待准备";
    }
    function Q() {
      var g, me;
      const F = ct(qe(H.value));
      return F ?? St((me = (g = H.value) == null ? void 0 : g.resource_status) == null ? void 0 : me.progress_percent);
    }
    function W() {
      i.value = null, u.value = "", c.value = "", f.value = "", z.value = { provider_type: "", provider_id: "", api_key: "", base_url: "", model: "", source: "modelscope", device: "auto", enabled: !1 }, f.value = Cl;
    }
    async function fe() {
      if (z.value.provider_id) {
        z.value.enabled = !0, o.value = !0, s.value = "", u.value = "";
        try {
          const F = await fetch("/api/providers/configure", {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
            body: JSON.stringify(ge())
          });
          if (!F.ok) {
            const me = await F.json().catch(() => ({}));
            throw new Error(me.detail || `HTTP ${F.status}`);
          }
          const g = await F.json();
          u.value = g.message || "配置已保存", await ke();
        } catch (F) {
          s.value = F instanceof Error ? F.message : "配置失败";
        } finally {
          o.value = !1;
        }
      }
    }
    function ue() {
      switch (D.value) {
        case "embedding":
        case "reranker":
          return { model_id: z.value.model, source: z.value.source || "modelscope", device: z.value.device || "auto" };
        case "gpt_sovits":
          return { url: f.value.trim() };
        default:
          return {};
      }
    }
    function ge() {
      var g;
      const F = { ...z.value };
      return ((g = R.value) == null ? void 0 : g.mode) === "local" && (["embedding", "reranker"].includes(D.value) || (delete F.model, delete F.source, delete F.device), delete F.api_key, delete F.base_url), F;
    }
    async function he(F, g) {
      if (!F) return;
      const me = B[F.id], Le = me == null ? void 0 : me[g];
      if (Le) {
        r.value = `${F.id}:${g}`, s.value = "";
        try {
          const J = g === "remove" || g === "cancel" ? "DELETE" : g === "directory" && F.id === "rvc" ? "GET" : g === "install" || g === "directory" || g === "start" || g === "stop" ? "POST" : "GET";
          let Oe;
          g === "install" && (Oe = F.id === "gsv_tts_local" ? JSON.stringify({ url: f.value.trim() }) : F.id === "local_stt" ? void 0 : JSON.stringify(ue()));
          let we;
          if (g === "install" && F.mode === "local") {
            const ft = `/api/resources/${encodeURIComponent(F.id)}/install`;
            we = await fetch(ft, { method: "POST", headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body: JSON.stringify({ parameters: F.id === "gsv_tts_local" ? { url: f.value.trim() } : ue() }) }), (we.status === 404 || we.status === 405) && (we = await fetch(Le, { method: J, headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body: Oe }));
          } else
            we = await fetch(Le, { method: J, headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body: Oe });
          if (!we.ok) {
            const ft = await we.json().catch(() => ({}));
            throw new Error(ft.detail || `HTTP ${we.status}`);
          }
          g === "install" && ["local_stt", "gsv_tts_local", "local_embedding", "local_rerank"].includes(F.id) && L.add(F.id), await ke(), await ce(), await zt();
        } catch (J) {
          s.value = J instanceof Error ? J.message : "资源操作失败";
        } finally {
          r.value = null;
        }
      }
    }
    async function Te(F) {
      var g, me;
      o.value = !0, s.value = "";
      try {
        const Le = await fetch("/api/providers/configure", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
          body: JSON.stringify({ provider_type: F.type, provider_id: F.id, api_key: F.current_api_key, base_url: F.current_base_url || F.default_base_url, model: F.current_model || F.default_model, source: (g = F.resource_status) == null ? void 0 : g.source, device: (me = F.resource_status) == null ? void 0 : me.device, enabled: !F.is_active })
        });
        if (!Le.ok) {
          const J = await Le.json().catch(() => ({}));
          throw new Error(J.detail || `HTTP ${Le.status}`);
        }
        await ke();
      } catch (Le) {
        s.value = Le instanceof Error ? Le.message : "切换失败";
      } finally {
        o.value = !1;
      }
    }
    async function Be(F) {
      l.value = F.id, s.value = "", d.value = { ...d.value, [F.id]: { ok: !1, message: "正在测试连接…" } };
      try {
        const g = await fetch("/api/providers/test", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
          body: JSON.stringify({ provider_type: F.type, provider_id: F.id, api_key: F.current_api_key, base_url: F.current_base_url, model: F.current_model })
        });
        if (!g.ok) {
          const Oe = await g.json().catch(() => ({}));
          throw new Error(Oe.detail || `HTTP ${g.status}`);
        }
        const me = await g.json(), Le = !!me.ok, J = Le ? `成功${me.latency_ms ? ` · ${me.latency_ms} ms` : ""}` : `失败 · ${me.message || "未通过"}`;
        d.value = { ...d.value, [F.id]: { ok: Le, message: J } }, c.value = J;
      } catch (g) {
        const me = `失败 · ${g instanceof Error ? g.message : "网络错误"}`;
        d.value = { ...d.value, [F.id]: { ok: !1, message: me } }, c.value = me;
      } finally {
        l.value = null;
      }
    }
    function Ae(F) {
      var me;
      if (!F) return !1;
      const g = F.resource_status || {};
      return !!(g.ready || g.service_running || g.installed || (me = g.install) != null && me.installed);
    }
    function st(F) {
      var me;
      if (!F) return !1;
      const g = F.resource_status || {};
      return !!(g.installing || (me = g.install) != null && me.installing);
    }
    const mt = {
      local_stt: ["local_stt", "stt", "asr"],
      gsv_tts_local: ["gsv_tts_local", "tts", "gpt_sovits"],
      local_embedding: ["local_embedding", "embedding"],
      local_rerank: ["local_rerank", "reranker"],
      rvc: ["rvc"],
      separator: ["separator"],
      ffmpeg: ["ffmpeg"]
    };
    function Vt(F, g) {
      const me = mt[g] || [g];
      return me.includes(F.provider_id) || me.includes(String(F.resource_kind || ""));
    }
    function Mt(F) {
      const g = p.value.filter((me) => Vt(me, F));
      return g.find(G) || g[0] || null;
    }
    function qe(F) {
      return F ? Mt(F.id) : null;
    }
    function ut(F) {
      if (!F) return !1;
      const g = qe(F);
      return st(F) || !!(g && G(g));
    }
    function yt(F) {
      const g = qe(F);
      return !!(g && G(g));
    }
    function St(F) {
      return typeof F != "number" || !Number.isFinite(F) ? null : Math.min(100, Math.max(0, F));
    }
    function ct(F) {
      return St(F == null ? void 0 : F.progress_percent);
    }
    function dt(F) {
      var me;
      if (!F) return null;
      const g = ct(qe(F));
      return g ?? St((me = F.resource_status) == null ? void 0 : me.progress_percent);
    }
    function Bt(F) {
      return F == null ? "进行中" : `${Math.round(F)}%`;
    }
    function Ht(F, g = !0) {
      return { "task-progress": !0, active: g, determinate: g && F != null, indeterminate: g && F == null };
    }
    function Ut(F) {
      return F == null ? void 0 : { width: `${F}%` };
    }
    function on() {
      return Mt("ffmpeg");
    }
    function le() {
      const F = on();
      return !!(F && G(F) || r.value === "ffmpeg:install");
    }
    function I() {
      const F = on();
      return F ? ye(F) : "安装中";
    }
    function Pe(F) {
      var me, Le, J, Oe;
      const g = qe(F);
      if (g && G(g)) {
        const we = g.progress_percent == null ? "" : ` ${Math.round(Number(g.progress_percent) || 0)}%`;
        return `${ye(g)}${we}${pe(g.phase) ? ` · ${pe(g.phase)}` : ""}`;
      }
      if (st(F)) {
        const we = (me = F.resource_status) == null ? void 0 : me.progress_percent;
        return `安装中${typeof we == "number" ? ` ${Math.round(we)}%` : ""}${pe(String(((Le = F.resource_status) == null ? void 0 : Le.phase) || "")) ? ` · ${pe(String(((J = F.resource_status) == null ? void 0 : J.phase) || ""))}` : ""}`;
      }
      return F.id === "gsv_tts_local" && ((Oe = F.resource_status) != null && Oe.service_running) ? "服务运行中" : Ae(F) ? "资源就绪" : "未安装";
    }
    function We() {
      return !!(V.value.installed || V.value.ready || V.value.cache_available || V.value.system_path);
    }
    function Et() {
      return le() ? I() : V.value.installed ? "托管副本已就绪" : V.value.system_path ? "已检测到系统 FFmpeg" : V.value.cache_available ? "已检测到本地缓存" : V.value.detected ? "已检测到" : "未检测到";
    }
    function Wt(F) {
      const g = F.resource_status || {};
      return F.id === "local_stt" ? Ae(F) ? String(g.model_id || g.resolved_model || "Qwen3-ASR-0.6B") : "未安装本地识别" : F.id === "gsv_tts_local" ? g.service_running ? `本地服务运行中 · 端口 ${g.api_port || "9880"}` : Ae(F) ? "GPT-SoVITS 已安装" : "未安装本地引擎" : Ae(F) ? String(g.model_id || "资源就绪") : String(g.model_id || "尚未安装资源");
    }
    async function zt() {
      const F = [...L];
      if (F.length) {
        for (const g of F) {
          const me = t.value.find((J) => J.id === g);
          if (!me || !Ae(me)) continue;
          if (me.is_active) {
            L.delete(g);
            continue;
          }
          (await fetch("/api/providers/configure", {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
            body: JSON.stringify({ provider_type: me.type, provider_id: me.id, enabled: !0 })
          })).ok && L.delete(g);
        }
        F.some((g) => !L.has(g)) && await ke({ quiet: !0 });
      }
    }
    function gn(F) {
      F.key === "Escape" && (i.value ? W() : h.value ? h.value = !1 : b.value ? w() : C.value && (C.value = !1));
    }
    return xt(() => {
      ke(), ce(), x = window.setInterval(() => {
        ce(), Se(), (n.value === "audio" || ie.value.length || t.value.some((F) => st(F))) && ke({ quiet: !0 }).then(() => zt());
      }, 2500), window.addEventListener("keydown", gn);
    }), Mn(() => {
      document.body.classList.remove("provider-modal-open"), document.documentElement.classList.remove("provider-modal-open"), x && window.clearInterval(x), window.removeEventListener("keydown", gn);
    }), (F, g) => {
      var me, Le, J, Oe, we, ft, Pt, Yr, Xr, Kr, Wr, Zr, Jr, Qr, ea, ta, na, oa, sa, ia, la, ra, aa, ua, ca, da, fa, pa, ha, va, ga, ma, ya, ba, _a, wa, ka, Ea, Ca, xa, Sa, $a, Ia, Na;
      return v(), _("div", iT, [
        a("nav", lT, [
          (v(), _(xe, null, Ve(Y, (ee) => a("button", {
            key: ee.id,
            class: be(["tab-button", { active: n.value === ee.id }]),
            role: "tab",
            "aria-selected": n.value === ee.id,
            onClick: (Fo) => n.value = ee.id
          }, [
            a("span", null, N(ee.label), 1)
          ], 10, rT)), 64))
        ]),
        ie.value.length || n.value === "audio" ? (v(), _("section", aT, [
          a("button", {
            class: "download-summary",
            type: "button",
            onClick: A,
            "aria-expanded": h.value
          }, [
            a("span", cT, [
              ne(U(ko), {
                size: 16,
                class: be({ spin: ie.value.length > 0 })
              }, null, 8, ["class"])
            ]),
            a("span", dT, [
              a("strong", null, N(ie.value.length ? `正在处理 ${ie.value.length} 个资源` : "资源任务中心"), 1),
              a("span", null, N(ie.value[0] ? `${ie.value[0].resource_name || ie.value[0].provider_id} · ${ye(ie.value[0])}` : "查看最近的安装、校验与失败记录"), 1)
            ]),
            ie.value[0] ? (v(), _("span", {
              key: 0,
              class: be(["download-summary-progress", { active: !0, determinate: ct(ie.value[0]) != null, indeterminate: ct(ie.value[0]) == null }])
            }, [
              a("b", null, N(Bt(ct(ie.value[0]))), 1),
              a("i", null, [
                a("em", {
                  style: et(Ut(ct(ie.value[0])))
                }, null, 4)
              ])
            ], 2)) : se("", !0),
            g[35] || (g[35] = a("span", { class: "download-summary-arrow" }, "查看详情 →", -1))
          ], 8, uT)
        ])) : se("", !0),
        n.value === "audio" ? (v(), _("section", fT, [
          g[56] || (g[56] = a("div", { class: "section-heading" }, [
            a("div", null, [
              a("span", { class: "section-label" }, "AUDIO WORKBENCH"),
              a("h3", { id: "local-production-title" }, "本地音频工作台")
            ]),
            a("span", { class: "section-note" }, "通用资源给各音频能力共用。GPT-SoVITS 装好后会出现在「对话语音(TTS)」；本地识别装好后会出现在「语音识别(STT)」。FFmpeg 用检测查看本机是否已有，不会开始下载。")
          ], -1)),
          a("section", pT, [
            g[43] || (g[43] = a("div", { class: "audio-section-head" }, [
              a("h4", { id: "audio-common-title" }, "通用资源"),
              a("span", null, "人声分离与 FFmpeg，供各音频能力共用")
            ], -1)),
            a("div", hT, [
              T.value ? (v(), _("article", vT, [
                a("div", gT, [
                  g[36] || (g[36] = a("div", null, [
                    a("span", { class: "production-kicker" }, "PREP"),
                    a("h3", null, "人声分离")
                  ], -1)),
                  a("span", {
                    class: be(["status-chip", { on: (me = T.value.resource_status) == null ? void 0 : me.ready }])
                  }, N((Le = T.value.resource_status) != null && Le.ready ? "已就绪" : ut(T.value) ? Pe(T.value) : "未准备"), 3)
                ]),
                g[38] || (g[38] = a("p", null, "切片和音频生产共用的 HT-Demucs 前处理模型。", -1)),
                ut(T.value) ? (v(), _("div", mT, [
                  a("div", yT, [
                    a("strong", null, N(Pe(T.value)), 1),
                    a("b", null, N(Bt(dt(T.value))), 1)
                  ]),
                  a("div", {
                    class: be(Ht(dt(T.value)))
                  }, [
                    a("i", {
                      style: et(Ut(dt(T.value)))
                    }, null, 4)
                  ], 2)
                ])) : se("", !0),
                a("div", bT, [
                  a("button", {
                    class: "button button-primary",
                    type: "button",
                    onClick: g[0] || (g[0] = (ee) => y(T.value))
                  }, [
                    ne(U(bo), { size: 15 }),
                    g[37] || (g[37] = _e("管理"))
                  ]),
                  ut(T.value) ? (v(), _("button", {
                    key: 0,
                    class: "button button-secondary",
                    type: "button",
                    onClick: g[1] || (g[1] = (ee) => he(T.value, "cancel")),
                    disabled: r.value !== null
                  }, "取消", 8, _T)) : se("", !0)
                ])
              ])) : se("", !0),
              a("article", wT, [
                a("div", kT, [
                  g[39] || (g[39] = a("div", null, [
                    a("span", { class: "production-kicker" }, "FFMPEG"),
                    a("h3", null, "FFmpeg")
                  ], -1)),
                  a("span", {
                    class: be(["status-chip", { on: We() }])
                  }, N(Et()), 3)
                ]),
                g[42] || (g[42] = a("p", null, "音视频前处理运行时。点检测即可确认托管副本、系统 PATH 或本地缓存，不必先点下载。", -1)),
                a("div", ET, [
                  a("span", null, "托管副本：" + N(V.value.installed ? "已存在" : "未安装"), 1),
                  a("span", null, "系统/缓存：" + N(V.value.system_path ? "PATH 已找到" : V.value.cache_available ? "本地缓存已找到" : "未找到"), 1)
                ]),
                le() ? (v(), _("div", CT, [
                  a("div", xT, [
                    a("strong", null, N(I()), 1),
                    a("b", null, N(Bt(ct(on()))), 1)
                  ]),
                  a("div", {
                    class: be(Ht(ct(on())))
                  }, [
                    a("i", {
                      style: et(Ut(ct(on())))
                    }, null, 4)
                  ], 2)
                ])) : se("", !0),
                P.value ? (v(), _("p", ST, N(P.value), 1)) : se("", !0),
                a("div", $T, [
                  a("button", {
                    class: "button button-secondary",
                    type: "button",
                    onClick: g[2] || (g[2] = (ee) => Ee("detect")),
                    disabled: M.value || r.value !== null
                  }, [
                    ne(U(qt), {
                      size: 15,
                      class: be({ spin: M.value })
                    }, null, 8, ["class"]),
                    g[40] || (g[40] = _e("检测"))
                  ], 8, IT),
                  a("button", {
                    class: "button button-primary",
                    type: "button",
                    onClick: m
                  }, [
                    ne(U(bo), { size: 15 }),
                    g[41] || (g[41] = _e("管理"))
                  ])
                ])
              ])
            ])
          ]),
          a("section", NT, [
            g[50] || (g[50] = a("div", { class: "audio-section-head" }, [
              a("h4", { id: "audio-voice-title" }, "音色引擎"),
              a("span", null, "GPT-SoVITS 与 RVC 并列，分别服务对话合成和音频变声")
            ], -1)),
            a("div", TT, [
              q.value ? (v(), _("article", MT, [
                a("div", PT, [
                  g[44] || (g[44] = a("div", null, [
                    a("span", { class: "production-kicker" }, "GPT-SOVITS"),
                    a("h3", null, "对话音色引擎")
                  ], -1)),
                  a("span", {
                    class: be(["status-chip", { on: ((J = q.value.resource_status) == null ? void 0 : J.service_running) || Ae(q.value) }])
                  }, N(Pe(q.value)), 3)
                ]),
                g[46] || (g[46] = a("p", null, "角色对话和声音训练共用的本地引擎。安装后会出现在「对话语音(TTS)」页。", -1)),
                a("div", OT, [
                  a("span", null, "安装包：" + N(Ae(q.value) || (Oe = q.value.resource_status) != null && Oe.installed ? "已就绪" : "未安装"), 1),
                  a("span", null, "服务：" + N((we = q.value.resource_status) != null && we.service_running ? "运行中" : "未启动"), 1)
                ]),
                ut(q.value) ? (v(), _("div", AT, [
                  a("div", DT, [
                    a("strong", null, N(Pe(q.value)), 1),
                    a("b", null, N(Bt(dt(q.value))), 1)
                  ]),
                  a("div", {
                    class: be(Ht(dt(q.value)))
                  }, [
                    a("i", {
                      style: et(Ut(dt(q.value)))
                    }, null, 4)
                  ], 2)
                ])) : se("", !0),
                a("div", RT, [
                  a("button", {
                    class: "button button-primary",
                    type: "button",
                    onClick: g[3] || (g[3] = (ee) => y(q.value))
                  }, [
                    ne(U(bo), { size: 15 }),
                    g[45] || (g[45] = _e("管理"))
                  ]),
                  ut(q.value) ? (v(), _("button", {
                    key: 0,
                    class: "button button-secondary",
                    type: "button",
                    onClick: g[4] || (g[4] = (ee) => he(q.value, "cancel")),
                    disabled: r.value !== null
                  }, "取消", 8, LT)) : se("", !0)
                ])
              ])) : se("", !0),
              H.value ? (v(), _("article", VT, [
                a("div", zT, [
                  g[47] || (g[47] = a("div", null, [
                    a("span", { class: "production-kicker" }, "RVC"),
                    a("h3", null, "变声生产")
                  ], -1)),
                  a("span", {
                    class: be(["status-chip", { on: (ft = H.value.resource_status) == null ? void 0 : ft.ready }])
                  }, N((Pt = H.value.resource_status) != null && Pt.ready ? "已就绪" : ut(H.value) ? Pe(H.value) : "未准备"), 3)
                ]),
                g[49] || (g[49] = a("p", null, "音频到音频变声运行时，不参与角色对话 TTS。", -1)),
                ut(H.value) ? (v(), _("div", FT, [
                  a("div", BT, [
                    a("strong", null, N(Pe(H.value)), 1),
                    a("b", null, N(Bt(dt(H.value))), 1)
                  ]),
                  a("div", {
                    class: be(Ht(dt(H.value)))
                  }, [
                    a("i", {
                      style: et(Ut(dt(H.value)))
                    }, null, 4)
                  ], 2)
                ])) : se("", !0),
                a("div", HT, [
                  a("button", {
                    class: "button button-primary",
                    type: "button",
                    onClick: g[5] || (g[5] = (ee) => y(H.value))
                  }, [
                    ne(U(bo), { size: 15 }),
                    g[48] || (g[48] = _e("管理"))
                  ])
                ])
              ])) : se("", !0)
            ])
          ]),
          a("section", UT, [
            g[55] || (g[55] = a("div", { class: "audio-section-head" }, [
              a("h4", { id: "audio-stt-title" }, "本地语音识别"),
              a("span", null, "安装后同步到「语音识别(STT)」页")
            ], -1)),
            a("div", jT, [
              X.value ? (v(), _("article", GT, [
                a("div", qT, [
                  g[51] || (g[51] = a("div", null, [
                    a("span", { class: "production-kicker" }, "LOCAL STT"),
                    a("h3", null, "本地语音识别")
                  ], -1)),
                  a("span", {
                    class: be(["status-chip", { on: Ae(X.value) }])
                  }, N(Pe(X.value)), 3)
                ]),
                g[54] || (g[54] = a("p", null, "Qwen3-ASR 给对话识别和 GPT-SoVITS 标注共用。安装后会出现在「语音识别(STT)」页。", -1)),
                a("div", YT, [
                  a("span", null, "模型：" + N(Wt(X.value)), 1),
                  g[52] || (g[52] = a("span", null, "依赖：FFmpeg", -1))
                ]),
                ut(X.value) ? (v(), _("div", XT, [
                  a("div", KT, [
                    a("strong", null, N(Pe(X.value)), 1),
                    a("b", null, N(Bt(dt(X.value))), 1)
                  ]),
                  a("div", {
                    class: be(Ht(dt(X.value)))
                  }, [
                    a("i", {
                      style: et(Ut(dt(X.value)))
                    }, null, 4)
                  ], 2)
                ])) : se("", !0),
                a("div", WT, [
                  a("button", {
                    class: "button button-primary",
                    type: "button",
                    onClick: g[6] || (g[6] = (ee) => y(X.value))
                  }, [
                    ne(U(bo), { size: 15 }),
                    g[53] || (g[53] = _e("管理"))
                  ]),
                  ut(X.value) ? (v(), _("button", {
                    key: 0,
                    class: "button button-secondary",
                    type: "button",
                    onClick: g[7] || (g[7] = (ee) => he(X.value, "cancel")),
                    disabled: r.value !== null
                  }, "取消", 8, ZT)) : se("", !0)
                ])
              ])) : se("", !0)
            ])
          ])
        ])) : se("", !0),
        n.value !== "audio" ? (v(), _("main", JT, [
          o.value && t.value.length === 0 ? (v(), _("div", QT, [
            ne(U(qt), {
              size: 22,
              class: "spin"
            }),
            g[57] || (g[57] = a("p", null, "加载中...", -1))
          ])) : s.value && t.value.length === 0 ? (v(), _("div", eM, [
            ne(U(Gt), { size: 22 }),
            a("p", null, N(s.value), 1),
            a("button", {
              class: "button button-primary",
              onClick: ke
            }, "重试")
          ])) : Z.value.length === 0 ? (v(), _("div", tM, g[58] || (g[58] = [
            a("p", null, "这个分类暂时没有可用供应商。", -1)
          ]))) : (v(), _("div", {
            key: 3,
            class: be(["providers-grid", { compact: n.value === "llm" }])
          }, [
            (v(!0), _(xe, null, Ve(Z.value, (ee) => {
              var Fo, Ta, Ma, Pa, Oa, Aa, Da, Ra, La, Va, za, Fa, Ba, Ha;
              return v(), _("article", {
                key: ee.type + ":" + ee.id,
                class: be(["provider-card", { configured: ee.is_configured, active: ee.is_active, local: ee.mode === "local" }]),
                tabindex: "0",
                onClick: (Bo) => y(ee),
                onKeydown: [
                  Eu((Bo) => y(ee), ["enter"]),
                  Eu($t((Bo) => y(ee), ["prevent"]), ["space"])
                ]
              }, [
                a("div", oM, [
                  a("div", sM, [
                    a("span", {
                      class: be(["provider-mark", { local: ee.mode === "local" }])
                    }, null, 2),
                    a("h3", null, N(ee.name), 1),
                    ee.mode === "local" ? (v(), _("span", iM, "本地")) : (v(), _("span", lM, "API"))
                  ]),
                  ee.runtime_supported ? (v(), _("button", {
                    key: 0,
                    class: be(["provider-switch", { on: ee.is_active }]),
                    type: "button",
                    role: "switch",
                    "aria-checked": ee.is_active,
                    "aria-label": `${ee.is_active ? "停用" : "启用"} ${ee.name}`,
                    onClick: $t((Bo) => Te(ee), ["stop"]),
                    disabled: o.value
                  }, g[59] || (g[59] = [
                    a("span", null, null, -1)
                  ]), 10, rM)) : (v(), _("span", aM, "仅配置"))
                ]),
                a("p", uM, N(ee.description), 1),
                ee.mode === "local" ? (v(), _("div", cM, [
                  g[60] || (g[60] = a("span", { class: "meta-label" }, "本地配置", -1)),
                  a("strong", null, N(Pe(ee)), 1),
                  a("code", null, N(Wt(ee)), 1)
                ])) : se("", !0),
                ee.mode === "local" && ut(ee) ? (v(), _("div", {
                  key: 1,
                  class: "install-progress",
                  onClick: g[8] || (g[8] = $t(() => {
                  }, ["stop"]))
                }, [
                  a("div", dM, [
                    a("strong", null, N(Pe(ee)), 1),
                    a("b", null, N(Bt(dt(ee))), 1)
                  ]),
                  a("div", {
                    class: be(Ht(dt(ee)))
                  }, [
                    a("i", {
                      style: et(Ut(dt(ee)))
                    }, null, 4)
                  ], 2),
                  a("div", fM, [
                    (Fo = qe(ee)) != null && Fo.current_file ? (v(), _("span", pM, "当前文件：" + N((Ta = qe(ee)) == null ? void 0 : Ta.current_file), 1)) : se("", !0),
                    (Ma = qe(ee)) != null && Ma.total_bytes ? (v(), _("span", hM, N(ve((Pa = qe(ee)) == null ? void 0 : Pa.downloaded_bytes)) + " / " + N(ve((Oa = qe(ee)) == null ? void 0 : Oa.total_bytes)), 1)) : se("", !0),
                    yt(ee) ? (v(), _("span", vM, "速度 " + N(ve((Aa = qe(ee)) == null ? void 0 : Aa.speed_bytes_per_second)) + "/秒 · 剩余 " + N(re((Da = qe(ee)) == null ? void 0 : Da.eta_seconds)), 1)) : se("", !0),
                    (Ra = qe(ee)) != null && Ra.error_message || (La = ee.resource_status) != null && La.error ? (v(), _("span", gM, N(((Va = qe(ee)) == null ? void 0 : Va.error_message) || ((za = ee.resource_status) == null ? void 0 : za.error)), 1)) : se("", !0)
                  ])
                ])) : ee.type === "web_search" ? (v(), _("div", mM, [
                  g[61] || (g[61] = a("span", { class: "meta-label" }, "搜索服务", -1)),
                  a("code", null, N(ee.name), 1),
                  a("span", null, N(ee.current_api_key ? "API Key 已配置" : "需要 API Key"), 1)
                ])) : ee.mode !== "local" ? (v(), _("div", yM, [
                  g[62] || (g[62] = a("span", { class: "meta-label" }, "当前模型", -1)),
                  a("code", null, N(ee.current_model || ee.default_model || "按接口默认"), 1),
                  ee.current_base_url ? (v(), _("span", bM, N(ee.current_base_url), 1)) : se("", !0)
                ])) : se("", !0),
                a("footer", _M, [
                  a("button", {
                    class: "button button-secondary",
                    type: "button",
                    onClick: $t((Bo) => y(ee), ["stop"])
                  }, [
                    ne(U(bo), { size: 15 }),
                    g[63] || (g[63] = _e("配置"))
                  ], 8, wM),
                  ee.mode === "api" && ee.is_configured && ee.runtime_supported ? (v(), _("button", {
                    key: 0,
                    class: be(["button button-test", { "is-success": (Fa = d.value[ee.id]) == null ? void 0 : Fa.ok, "is-error": d.value[ee.id] && !d.value[ee.id].ok }]),
                    type: "button",
                    onClick: $t((Bo) => Be(ee), ["stop"]),
                    disabled: l.value === ee.id
                  }, [
                    l.value === ee.id ? (v(), ht(U(qt), {
                      key: 0,
                      size: 15,
                      class: "spin"
                    })) : (Ba = d.value[ee.id]) != null && Ba.ok ? (v(), ht(U(ro), {
                      key: 1,
                      size: 15
                    })) : d.value[ee.id] ? (v(), ht(U(Gt), {
                      key: 2,
                      size: 15
                    })) : se("", !0),
                    _e(N(l.value === ee.id ? "测试中" : ((Ha = d.value[ee.id]) == null ? void 0 : Ha.message) || "测试连接"), 1)
                  ], 10, kM)) : se("", !0)
                ])
              ], 42, nM);
            }), 128))
          ], 2))
        ])) : se("", !0),
        (v(), ht(Vh, { to: "body" }, [
          h.value ? (v(), _("div", {
            key: 0,
            class: "drawer-overlay provider-config-overlay",
            onClick: g[10] || (g[10] = $t((ee) => h.value = !1, ["self"]))
          }, [
            a("aside", EM, [
              a("div", CM, [
                g[64] || (g[64] = a("div", null, [
                  a("p", { class: "eyebrow" }, "RESOURCE TASKS"),
                  a("h3", null, "下载中心"),
                  a("p", null, "安装、校验和失败记录都会留在这里。音频页会常驻入口，方便查看 GPT-SoVITS 与语音识别的下载进度。")
                ], -1)),
                a("div", xM, [
                  de.value ? (v(), _("button", {
                    key: 0,
                    class: "button button-quiet",
                    type: "button",
                    onClick: Me
                  }, "清理已结束")) : se("", !0),
                  a("button", {
                    class: "modal-close",
                    type: "button",
                    onClick: g[9] || (g[9] = (ee) => h.value = !1),
                    "aria-label": "关闭下载中心"
                  }, [
                    ne(U(Gt), { size: 18 })
                  ])
                ])
              ]),
              a("div", SM, [
                E.value && !p.value.length ? (v(), _("p", $M, "加载任务中…")) : p.value.length ? se("", !0) : (v(), _("p", IM, "暂无资源任务")),
                (v(!0), _(xe, null, Ve(p.value, (ee) => (v(), _("article", {
                  key: ee.task_id,
                  class: be(["download-task", `task-${ee.status}`])
                }, [
                  a("div", NM, [
                    a("div", null, [
                      a("strong", null, N(ee.resource_name || ee.provider_id), 1),
                      a("span", null, [
                        _e(N(ye(ee)), 1),
                        pe(ee.phase) ? (v(), _(xe, { key: 0 }, [
                          _e(" · " + N(pe(ee.phase)), 1)
                        ], 64)) : se("", !0)
                      ])
                    ]),
                    a("b", null, N(G(ee) ? Bt(ct(ee)) : ee.progress_percent == null ? "—" : `${Math.round(ee.progress_percent)}%`), 1)
                  ]),
                  a("div", {
                    class: be(Ht(ct(ee), G(ee)))
                  }, [
                    a("i", {
                      style: et(Ut(ct(ee)))
                    }, null, 4)
                  ], 2),
                  a("div", TM, [
                    ee.current_file ? (v(), _("span", MM, "当前文件：" + N(ee.current_file), 1)) : se("", !0),
                    ee.total_bytes ? (v(), _("span", PM, N(ve(ee.downloaded_bytes)) + " / " + N(ve(ee.total_bytes)), 1)) : se("", !0),
                    G(ee) ? (v(), _("span", OM, "速度 " + N(ve(ee.speed_bytes_per_second)) + "/秒 · 剩余 " + N(re(ee.eta_seconds)), 1)) : se("", !0),
                    ee.error_message ? (v(), _("span", AM, N(ee.error_message), 1)) : se("", !0)
                  ]),
                  G(ee) ? (v(), _("div", DM, [
                    a("button", {
                      class: "button button-secondary",
                      type: "button",
                      onClick: (Fo) => Ie(ee)
                    }, "取消", 8, RM)
                  ])) : ee.status === "failed" ? (v(), _("div", LM, [
                    a("button", {
                      class: "button button-secondary",
                      type: "button",
                      onClick: (Fo) => oe(ee)
                    }, [
                      ne(U(qt), { size: 14 }),
                      g[65] || (g[65] = _e("重试"))
                    ], 8, VM)
                  ])) : se("", !0)
                ], 2))), 128))
              ])
            ])
          ])) : se("", !0),
          b.value && H.value ? (v(), _("div", {
            key: 1,
            class: "drawer-overlay provider-config-overlay",
            onClick: $t(w, ["self"])
          }, [
            a("aside", zM, [
              a("div", FM, [
                g[66] || (g[66] = a("div", null, [
                  a("p", { class: "eyebrow" }, "LOCAL AUDIO PRODUCTION / RVC"),
                  a("h3", null, "RVC 音频生产"),
                  a("p", null, "只管理 RVC 音频到音频推理所需的运行时和模型，不参与角色对话或 TTS。")
                ], -1)),
                a("button", {
                  class: "modal-close",
                  type: "button",
                  onClick: w,
                  "aria-label": "关闭 RVC 管理"
                }, [
                  ne(U(Gt), { size: 18 })
                ])
              ]),
              a("div", BM, [
                a("div", HM, [
                  a("div", null, [
                    g[67] || (g[67] = a("span", { class: "section-label" }, "推理可用性", -1)),
                    a("strong", null, N((Yr = H.value.resource_status) != null && Yr.ready ? "可以开始生成变声音频" : "还需要补完资源"), 1)
                  ]),
                  a("span", {
                    class: be(["status-chip", { on: (Xr = H.value.resource_status) == null ? void 0 : Xr.ready }])
                  }, N((Kr = H.value.resource_status) != null && Kr.ready ? "READY" : "INCOMPLETE"), 3)
                ]),
                a("div", UM, [
                  (v(), _(xe, null, Ve([{ key: "source", title: "CHARACTOID 内置 RVC 核心", detail: "项目内置推理核心" }, { key: "runtime", title: "独立 Python 运行时", detail: "CHARACTOID/runtime/rvc" }, { key: "hubert", title: "Hubert 特征模型", detail: "用于音频特征提取" }, { key: "rmvpe", title: "RMVPE 音高模型", detail: "用于 F0 提取" }], (ee) => a("div", {
                    key: ee.key,
                    class: "rvc-component-row"
                  }, [
                    a("div", jM, [
                      j(ee.key) ? (v(), ht(U(ro), {
                        key: 0,
                        size: 16
                      })) : (v(), _("span", GM, "·"))
                    ]),
                    a("div", qM, [
                      a("strong", null, N(ee.title), 1),
                      a("span", null, N(ee.detail), 1)
                    ]),
                    a("b", {
                      class: be({ ready: j(ee.key) })
                    }, N(K(ee.key)), 3)
                  ])), 64))
                ]),
                a("div", YM, [
                  a("div", null, [
                    a("strong", null, N((Wr = H.value.resource_status) != null && Wr.installing ? "正在准备 RVC 运行时" : "补完推理环境"), 1),
                    a("p", null, N(((Zr = H.value.resource_status) == null ? void 0 : Zr.detail) || ((Jr = H.value.resource_status) == null ? void 0 : Jr.note)), 1)
                  ]),
                  (Qr = H.value.resource_status) != null && Qr.installing || ut(H.value) ? (v(), _("div", {
                    key: 0,
                    class: be(["rvc-progress", { active: !0, determinate: Q() != null, indeterminate: Q() == null }])
                  }, [
                    a("span", null, N(Bt(Q())), 1),
                    a("i", null, [
                      a("em", {
                        style: et(Ut(Q()))
                      }, null, 4)
                    ])
                  ], 2)) : se("", !0),
                  a("div", XM, [
                    (ea = H.value.resource_status) != null && ea.installing ? (v(), _("button", {
                      key: 0,
                      class: "button button-secondary",
                      type: "button",
                      onClick: g[11] || (g[11] = (ee) => he(H.value, "cancel")),
                      disabled: r.value !== null
                    }, "取消准备", 8, KM)) : (ta = H.value.resource_status) != null && ta.ready ? se("", !0) : (v(), _("button", {
                      key: 1,
                      class: "button button-primary",
                      type: "button",
                      onClick: g[12] || (g[12] = (ee) => he(H.value, "install")),
                      disabled: r.value !== null
                    }, [
                      ne(U(ko), { size: 15 }),
                      g[68] || (g[68] = _e("准备运行时与基础模型"))
                    ], 8, WM)),
                    (na = H.value.resource_status) != null && na.ready ? (v(), _("button", {
                      key: 2,
                      class: "button button-secondary",
                      type: "button",
                      onClick: g[13] || (g[13] = (ee) => he(H.value, "remove")),
                      disabled: r.value !== null
                    }, [
                      ne(U($n), { size: 15 }),
                      g[69] || (g[69] = _e("移除 CHARACTOID 运行时"))
                    ], 8, ZM)) : se("", !0),
                    a("button", {
                      class: "button button-secondary",
                      type: "button",
                      onClick: g[14] || (g[14] = (ee) => he(H.value, "directory")),
                      disabled: r.value !== null
                    }, [
                      ne(U(ss), { size: 15 }),
                      g[70] || (g[70] = _e("查看资源目录"))
                    ], 8, JM)
                  ])
                ]),
                (oa = H.value.resource_status) != null && oa.error ? (v(), _("p", QM, N(H.value.resource_status.error), 1)) : se("", !0),
                s.value ? (v(), _("p", e5, N(s.value), 1)) : se("", !0),
                g[71] || (g[71] = a("div", { class: "rvc-workspace-note" }, [
                  a("strong", null, "下一步"),
                  a("span", null, "将自己的 .pth 音色模型放入受管的 weights 目录；.index 文件不是必需项。完成后到独立的“RVC”页面上传音频并生成文件。")
                ], -1))
              ])
            ])
          ])) : se("", !0),
          C.value ? (v(), _("div", {
            key: 2,
            class: "drawer-overlay provider-config-overlay",
            onClick: g[20] || (g[20] = $t((ee) => C.value = !1, ["self"]))
          }, [
            a("aside", t5, [
              a("div", n5, [
                g[72] || (g[72] = a("div", null, [
                  a("p", { class: "eyebrow" }, "RUNTIME"),
                  a("h3", null, "FFmpeg"),
                  a("p", null, "检测只查找本机已有的托管副本、系统 PATH 和 imageio 缓存，不会开始下载。")
                ], -1)),
                a("button", {
                  class: "modal-close",
                  type: "button",
                  onClick: g[15] || (g[15] = (ee) => C.value = !1),
                  "aria-label": "关闭 FFmpeg 管理"
                }, [
                  ne(U(Gt), { size: 18 })
                ])
              ]),
              a("div", o5, [
                a("div", s5, [
                  a("span", {
                    class: be(["status-chip", { on: We() }])
                  }, N(Et()), 3),
                  a("span", null, N(V.value.path || "尚未找到可执行文件"), 1)
                ]),
                a("div", i5, [
                  g[73] || (g[73] = a("span", null, "检测结果", -1)),
                  a("strong", null, N(P.value || "点击检测以刷新本机状态"), 1)
                ]),
                a("div", l5, [
                  a("span", null, "托管：" + N(V.value.installed ? "已安装" : "无"), 1),
                  a("span", null, "系统：" + N(V.value.system_path ? "已找到" : "无"), 1),
                  a("span", null, "缓存：" + N(V.value.cache_available ? "已找到" : "无"), 1)
                ]),
                le() ? (v(), _("div", r5, [
                  a("div", a5, [
                    a("strong", null, N(I()), 1),
                    a("b", null, N(Bt(ct(on()))), 1)
                  ]),
                  a("div", {
                    class: be(Ht(ct(on())))
                  }, [
                    a("i", {
                      style: et(Ut(ct(on())))
                    }, null, 4)
                  ], 2)
                ])) : se("", !0),
                a("div", u5, [
                  a("button", {
                    class: "button button-secondary",
                    type: "button",
                    onClick: g[16] || (g[16] = (ee) => Ee("detect")),
                    disabled: M.value || r.value !== null
                  }, [
                    ne(U(qt), {
                      size: 15,
                      class: be({ spin: M.value })
                    }, null, 8, ["class"]),
                    g[74] || (g[74] = _e("检测"))
                  ], 8, c5),
                  V.value.installed ? (v(), _("button", {
                    key: 1,
                    class: "button button-secondary",
                    type: "button",
                    onClick: g[18] || (g[18] = (ee) => Ee("remove")),
                    disabled: r.value !== null
                  }, [
                    ne(U($n), { size: 15 }),
                    g[75] || (g[75] = _e("移除托管副本"))
                  ], 8, f5)) : (v(), _("button", {
                    key: 0,
                    class: "button button-primary",
                    type: "button",
                    onClick: g[17] || (g[17] = (ee) => Ee("install")),
                    disabled: r.value !== null
                  }, [
                    ne(U(ko), { size: 15 }),
                    _e(N(V.value.cache_available || V.value.system_path ? "安装托管副本" : "下载 FFmpeg"), 1)
                  ], 8, d5)),
                  a("button", {
                    class: "button button-secondary",
                    type: "button",
                    onClick: g[19] || (g[19] = (ee) => Ee("directory")),
                    disabled: r.value !== null
                  }, [
                    ne(U(ss), { size: 15 }),
                    g[76] || (g[76] = _e("打开目录"))
                  ], 8, p5)
                ]),
                s.value ? (v(), _("p", h5, N(s.value), 1)) : se("", !0)
              ])
            ])
          ])) : se("", !0),
          i.value ? (v(), _("div", {
            key: 3,
            class: "drawer-overlay provider-config-overlay",
            onClick: $t(W, ["self"])
          }, [
            a("aside", {
              class: "config-drawer provider-config-drawer",
              role: "dialog",
              "aria-modal": "true",
              "aria-label": `配置 ${((sa = R.value) == null ? void 0 : sa.name) || "供应商"}`
            }, [
              a("div", g5, [
                a("div", null, [
                  g[77] || (g[77] = a("p", { class: "eyebrow" }, "CONFIGURE", -1)),
                  a("h3", null, N((ia = R.value) == null ? void 0 : ia.name), 1),
                  a("p", null, N((la = R.value) == null ? void 0 : la.description), 1)
                ]),
                a("button", {
                  class: "modal-close",
                  type: "button",
                  onClick: W,
                  "aria-label": "关闭配置"
                }, [
                  ne(U(Gt), { size: 18 })
                ])
              ]),
              a("div", m5, [
                a("div", y5, [
                  a("span", {
                    class: be(["status-chip", { on: (ra = R.value) == null ? void 0 : ra.is_active }])
                  }, N((aa = R.value) != null && aa.is_active ? "当前启用" : (ua = R.value) != null && ua.runtime_supported ? "可用" : "仅保存配置"), 3),
                  a("span", null, N(((ca = R.value) == null ? void 0 : ca.mode) === "local" ? "本地资源" : "API 接口"), 1)
                ]),
                a("form", {
                  onSubmit: $t(fe, ["prevent"]),
                  class: "config-form"
                }, [
                  ((da = R.value) == null ? void 0 : da.mode) === "api" && ((fa = R.value) == null ? void 0 : fa.type) === "web_search" ? (v(), _(xe, { key: 0 }, [
                    g[81] || (g[81] = a("div", { class: "resource-config-intro" }, [
                      a("span", { class: "meta-label" }, "搜索服务"),
                      a("p", { class: "config-hint" }, "为 Agent 提供实时互联网检索能力，不是模型配置。")
                    ], -1)),
                    R.value.requires_api_key ? (v(), _("label", b5, [
                      g[78] || (g[78] = a("span", null, [
                        _e("搜索服务 API Key "),
                        a("span", { class: "required" }, "*")
                      ], -1)),
                      De(a("input", {
                        type: "password",
                        "onUpdate:modelValue": g[21] || (g[21] = (ee) => z.value.api_key = ee),
                        placeholder: "输入搜索服务 API Key",
                        required: "",
                        autocomplete: "off"
                      }, null, 512), [
                        [Ge, z.value.api_key]
                      ])
                    ])) : se("", !0),
                    R.value.id === "custom_search" ? (v(), _("label", _5, [
                      g[79] || (g[79] = a("span", null, "搜索接口地址", -1)),
                      De(a("input", {
                        type: "url",
                        "onUpdate:modelValue": g[22] || (g[22] = (ee) => z.value.base_url = ee),
                        placeholder: "https://your-search-endpoint"
                      }, null, 512), [
                        [Ge, z.value.base_url]
                      ])
                    ])) : (v(), _("div", w5, [
                      g[80] || (g[80] = a("span", null, "接口地址", -1)),
                      a("strong", null, N(R.value.id === "tavily" ? "Tavily 官方服务" : "博查官方服务"), 1)
                    ]))
                  ], 64)) : ((pa = R.value) == null ? void 0 : pa.mode) === "api" ? (v(), _(xe, { key: 1 }, [
                    R.value.requires_api_key ? (v(), _("label", k5, [
                      g[82] || (g[82] = a("span", null, [
                        _e("API Key "),
                        a("span", { class: "required" }, "*")
                      ], -1)),
                      De(a("input", {
                        type: "password",
                        "onUpdate:modelValue": g[23] || (g[23] = (ee) => z.value.api_key = ee),
                        placeholder: "输入 API Key",
                        required: "",
                        autocomplete: "off"
                      }, null, 512), [
                        [Ge, z.value.api_key]
                      ])
                    ])) : se("", !0),
                    a("label", E5, [
                      g[83] || (g[83] = a("span", null, "服务接口地址", -1)),
                      De(a("input", {
                        type: "url",
                        "onUpdate:modelValue": g[24] || (g[24] = (ee) => z.value.base_url = ee),
                        placeholder: R.value.default_base_url
                      }, null, 8, C5), [
                        [Ge, z.value.base_url]
                      ])
                    ]),
                    a("label", x5, [
                      g[84] || (g[84] = a("span", null, "模型名称", -1)),
                      De(a("input", {
                        type: "text",
                        "onUpdate:modelValue": g[25] || (g[25] = (ee) => z.value.model = ee),
                        placeholder: R.value.default_model
                      }, null, 8, S5), [
                        [Ge, z.value.model]
                      ])
                    ])
                  ], 64)) : (v(), _(xe, { key: 2 }, [
                    a("div", $5, [
                      g[85] || (g[85] = a("span", { class: "meta-label" }, "资源配置", -1)),
                      O() ? (v(), _("p", I5, N(O()), 1)) : se("", !0)
                    ]),
                    D.value === "embedding" || D.value === "reranker" ? (v(), _(xe, { key: 0 }, [
                      a("label", N5, [
                        a("span", null, N(D.value === "embedding" ? "向量模型 ID" : "精排模型 ID"), 1),
                        De(a("input", {
                          type: "text",
                          "onUpdate:modelValue": g[26] || (g[26] = (ee) => z.value.model = ee),
                          placeholder: (ha = R.value) == null ? void 0 : ha.default_model
                        }, null, 8, T5), [
                          [Ge, z.value.model]
                        ])
                      ]),
                      a("div", M5, [
                        a("label", P5, [
                          g[87] || (g[87] = a("span", null, "模型来源", -1)),
                          De(a("select", {
                            "onUpdate:modelValue": g[27] || (g[27] = (ee) => z.value.source = ee)
                          }, g[86] || (g[86] = [
                            a("option", { value: "modelscope" }, "ModelScope", -1),
                            a("option", { value: "huggingface" }, "Hugging Face", -1)
                          ]), 512), [
                            [fn, z.value.source]
                          ])
                        ]),
                        a("label", O5, [
                          g[89] || (g[89] = a("span", null, "运行设备", -1)),
                          De(a("select", {
                            "onUpdate:modelValue": g[28] || (g[28] = (ee) => z.value.device = ee)
                          }, g[88] || (g[88] = [
                            a("option", { value: "auto" }, "自动（GPU 优先）", -1),
                            a("option", { value: "cuda" }, "CUDA", -1),
                            a("option", { value: "cpu" }, "CPU", -1)
                          ]), 512), [
                            [fn, z.value.device]
                          ])
                        ])
                      ])
                    ], 64)) : D.value === "gpt_sovits" ? (v(), _("div", A5, g[90] || (g[90] = [
                      a("div", { class: "resource-config-readonly" }, [
                        a("span", null, "固定运行环境"),
                        a("strong", null, "GPT-SoVITS v3lora Windows 整合包"),
                        a("small", null, "应用内置下载源 · Hugging Face · 约 8 GB · 服务按需启动")
                      ], -1)
                    ]))) : D.value === "stt" ? (v(), _("div", D5, g[91] || (g[91] = [
                      a("span", null, "固定资源清单", -1),
                      a("strong", null, "Qwen3-ASR-0.6B + FFmpeg", -1)
                    ]))) : D.value === "separator" ? (v(), _("div", R5, g[92] || (g[92] = [
                      a("span", null, "固定资源", -1),
                      a("strong", null, "HT-Demucs 人声分离模型 · 约 165 MB", -1)
                    ]))) : se("", !0),
                    a("div", L5, [
                      a("div", null, [
                        g[93] || (g[93] = a("span", { class: "meta-label" }, "资源状态", -1)),
                        a("strong", null, N(R.value ? Pe(R.value) : "未知"), 1)
                      ]),
                      R.value && ut(R.value) ? (v(), _("div", V5, [
                        a("div", z5, [
                          a("strong", null, N(Pe(R.value)), 1),
                          a("b", null, N(Bt(dt(R.value))), 1)
                        ]),
                        a("div", {
                          class: be(Ht(dt(R.value)))
                        }, [
                          a("i", {
                            style: et(Ut(dt(R.value)))
                          }, null, 4)
                        ], 2),
                        a("div", F5, [
                          (va = qe(R.value)) != null && va.current_file ? (v(), _("span", B5, "当前文件：" + N((ga = qe(R.value)) == null ? void 0 : ga.current_file), 1)) : se("", !0),
                          (ma = qe(R.value)) != null && ma.total_bytes ? (v(), _("span", H5, N(ve((ya = qe(R.value)) == null ? void 0 : ya.downloaded_bytes)) + " / " + N(ve((ba = qe(R.value)) == null ? void 0 : ba.total_bytes)), 1)) : se("", !0),
                          yt(R.value) ? (v(), _("span", U5, "速度 " + N(ve((_a = qe(R.value)) == null ? void 0 : _a.speed_bytes_per_second)) + "/秒 · 剩余 " + N(re((wa = qe(R.value)) == null ? void 0 : wa.eta_seconds)), 1)) : se("", !0),
                          (ka = qe(R.value)) != null && ka.error_message || (Ea = R.value.resource_status) != null && Ea.error ? (v(), _("span", j5, N(((Ca = qe(R.value)) == null ? void 0 : Ca.error_message) || ((xa = R.value.resource_status) == null ? void 0 : xa.error)), 1)) : se("", !0)
                        ])
                      ])) : se("", !0),
                      a("div", G5, [
                        st(R.value) ? (v(), _("button", {
                          key: 0,
                          type: "button",
                          class: "button button-secondary",
                          onClick: g[29] || (g[29] = (ee) => he(R.value, "cancel")),
                          disabled: r.value !== null
                        }, "取消安装", 8, q5)) : Ae(R.value) ? se("", !0) : (v(), _("button", {
                          key: 1,
                          type: "button",
                          class: "button button-primary",
                          onClick: g[30] || (g[30] = (ee) => he(R.value, "install")),
                          disabled: r.value !== null || ((Sa = R.value) == null ? void 0 : Sa.id) === "gsv_tts_local" && !f.value
                        }, [
                          ne(U(ko), { size: 15 }),
                          g[94] || (g[94] = _e(" 安装运行环境"))
                        ], 8, Y5)),
                        Ae(R.value) ? (v(), _("button", {
                          key: 2,
                          type: "button",
                          class: "button button-secondary",
                          onClick: g[31] || (g[31] = (ee) => he(R.value, "remove")),
                          disabled: r.value !== null
                        }, [
                          ne(U($n), { size: 15 }),
                          g[95] || (g[95] = _e(" 删除"))
                        ], 8, X5)) : se("", !0),
                        a("button", {
                          type: "button",
                          class: "button button-secondary",
                          onClick: g[32] || (g[32] = (ee) => he(R.value, "directory")),
                          disabled: r.value !== null
                        }, [
                          ne(U(ss), { size: 15 }),
                          g[96] || (g[96] = _e(" 打开目录"))
                        ], 8, K5),
                        (($a = R.value) == null ? void 0 : $a.id) === "gsv_tts_local" && ((Ia = R.value.resource_status) != null && Ia.service_running) ? (v(), _("button", {
                          key: 3,
                          type: "button",
                          class: "button button-secondary",
                          onClick: g[33] || (g[33] = (ee) => he(R.value, "stop")),
                          disabled: r.value !== null
                        }, "停止服务", 8, W5)) : ((Na = R.value) == null ? void 0 : Na.id) === "gsv_tts_local" && Ae(R.value) ? (v(), _("button", {
                          key: 4,
                          type: "button",
                          class: "button button-primary",
                          onClick: g[34] || (g[34] = (ee) => he(R.value, "start")),
                          disabled: r.value !== null
                        }, [
                          ne(U(Ll), { size: 15 }),
                          g[97] || (g[97] = _e(" 启动服务"))
                        ], 8, Z5)) : se("", !0)
                      ])
                    ])
                  ], 64)),
                  R.value && !R.value.runtime_supported ? (v(), _("p", J5, "当前运行时还没有这个 Provider 的适配器，因此这里只保存配置，不会自动调用。")) : se("", !0),
                  a("div", Q5, [
                    a("button", {
                      type: "button",
                      class: "button button-secondary",
                      onClick: W
                    }, "取消"),
                    a("button", {
                      type: "submit",
                      class: "button button-primary",
                      disabled: o.value
                    }, N(o.value ? "保存中..." : "保存并启用"), 9, e4)
                  ]),
                  u.value ? (v(), _("p", t4, [
                    ne(U(ro), { size: 16 }),
                    _e(" " + N(u.value), 1)
                  ])) : se("", !0),
                  c.value ? (v(), _("p", {
                    key: 5,
                    class: be(["config-message", c.value.startsWith("连接成功") ? "success" : "error"])
                  }, N(c.value), 3)) : se("", !0),
                  s.value ? (v(), _("p", n4, N(s.value), 1)) : se("", !0)
                ], 32)
              ])
            ], 8, v5)
          ])) : se("", !0)
        ]))
      ]);
    };
  }
}), s4 = /* @__PURE__ */ qr(o4, [["__scopeId", "data-v-2735f362"]]);
let Hn = null, Un = null;
function _4(e = "#reranker-settings-root") {
  if (Hn) return Hn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("Reranker 设置挂载点不存在");
  return Hn = Cs(sT), Hn.mount(t), Hn;
}
function w4() {
  Hn && (Hn.unmount(), Hn = null);
}
function k4(e = "#providers-root") {
  if (Un) return Un;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("提供商配置挂载点不存在");
  return Un = Cs(s4), Un.mount(t), Un;
}
function E4() {
  Un && (Un.unmount(), Un = null);
}
export {
  b4 as destroyEvaluationApp,
  v4 as destroyExtensionsApp,
  d4 as destroyManageApp,
  E4 as destroyProvidersApp,
  w4 as destroyRerankerSettingsApp,
  y4 as hideEvaluationApp,
  h4 as hideExtensionsApp,
  g4 as mountEvaluationApp,
  f4 as mountExtensionsApp,
  u4 as mountManageApp,
  k4 as mountProvidersApp,
  _4 as mountRerankerSettingsApp,
  m4 as showEvaluationApp,
  p4 as showExtensionsApp,
  c4 as showManageApp
};
