var Hp = Object.defineProperty;
var Up = (e, t, n) => t in e ? Hp(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var rt = (e, t, n) => Up(e, typeof t != "symbol" ? t + "" : t, n);
/**
* @vue/shared v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
/*! #__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function rr(e) {
  const t = /* @__PURE__ */ Object.create(null);
  for (const n of e.split(",")) t[n] = 1;
  return (n) => n in t;
}
const Ze = {}, Eo = [], cn = () => {
}, jp = () => !1, ki = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // uppercase letter
(e.charCodeAt(2) > 122 || e.charCodeAt(2) < 97), ar = (e) => e.startsWith("onUpdate:"), Tt = Object.assign, ur = (e, t) => {
  const n = e.indexOf(t);
  n > -1 && e.splice(n, 1);
}, Gp = Object.prototype.hasOwnProperty, Ke = (e, t) => Gp.call(e, t), Ne = Array.isArray, Co = (e) => _s(e) === "[object Map]", Vo = (e) => _s(e) === "[object Set]", Ba = (e) => _s(e) === "[object Date]", Re = (e) => typeof e == "function", nt = (e) => typeof e == "string", en = (e) => typeof e == "symbol", Je = (e) => e !== null && typeof e == "object", Fc = (e) => (Je(e) || Re(e)) && Re(e.then) && Re(e.catch), Bc = Object.prototype.toString, _s = (e) => Bc.call(e), qp = (e) => _s(e).slice(8, -1), Hc = (e) => _s(e) === "[object Object]", cr = (e) => nt(e) && e !== "NaN" && e[0] !== "-" && "" + parseInt(e, 10) === e, Jo = /* @__PURE__ */ rr(
  // the leading comma is intentional so empty string "" is also included
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
), Ei = (e) => {
  const t = /* @__PURE__ */ Object.create(null);
  return (n) => t[n] || (t[n] = e(n));
}, Yp = /-(\w)/g, Xt = Ei(
  (e) => e.replace(Yp, (t, n) => n ? n.toUpperCase() : "")
), Xp = /\B([A-Z])/g, Xn = Ei(
  (e) => e.replace(Xp, "-$1").toLowerCase()
), Ci = Ei((e) => e.charAt(0).toUpperCase() + e.slice(1)), Xi = Ei(
  (e) => e ? `on${Ci(e)}` : ""
), Sn = (e, t) => !Object.is(e, t), js = (e, ...t) => {
  for (let n = 0; n < e.length; n++)
    e[n](...t);
}, Uc = (e, t, n, o = !1) => {
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
let Ha;
const Si = () => Ha || (Ha = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : typeof global < "u" ? global : {});
function et(e) {
  if (Ne(e)) {
    const t = {};
    for (let n = 0; n < e.length; n++) {
      const o = e[n], s = nt(o) ? Jp(o) : et(o);
      if (s)
        for (const i in s)
          t[i] = s[i];
    }
    return t;
  } else if (nt(e) || Je(e))
    return e;
}
const Kp = /;(?![^(]*\))/g, Wp = /:([^]+)/, Zp = /\/\*[^]*?\*\//g;
function Jp(e) {
  const t = {};
  return e.replace(Zp, "").split(Kp).forEach((n) => {
    if (n) {
      const o = n.split(Wp);
      o.length > 1 && (t[o[0].trim()] = o[1].trim());
    }
  }), t;
}
function ye(e) {
  let t = "";
  if (nt(e))
    t = e;
  else if (Ne(e))
    for (let n = 0; n < e.length; n++) {
      const o = ye(e[n]);
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
  return t && !nt(t) && (e.class = ye(t)), n && (e.style = et(n)), e;
}
const Qp = "itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly", eh = /* @__PURE__ */ rr(Qp);
function jc(e) {
  return !!e || e === "";
}
function th(e, t) {
  if (e.length !== t.length) return !1;
  let n = !0;
  for (let o = 0; n && o < e.length; o++)
    n = ws(e[o], t[o]);
  return n;
}
function ws(e, t) {
  if (e === t) return !0;
  let n = Ba(e), o = Ba(t);
  if (n || o)
    return n && o ? e.getTime() === t.getTime() : !1;
  if (n = en(e), o = en(t), n || o)
    return e === t;
  if (n = Ne(e), o = Ne(t), n || o)
    return n && o ? th(e, t) : !1;
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
function dr(e, t) {
  return e.findIndex((n) => ws(n, t));
}
const Gc = (e) => !!(e && e.__v_isRef === !0), T = (e) => nt(e) ? e : e == null ? "" : Ne(e) || Je(e) && (e.toString === Bc || !Re(e.toString)) ? Gc(e) ? T(e.value) : JSON.stringify(e, qc, 2) : String(e), qc = (e, t) => Gc(t) ? qc(e, t.value) : Co(t) ? {
  [`Map(${t.size})`]: [...t.entries()].reduce(
    (n, [o, s], i) => (n[Wi(o, i) + " =>"] = s, n),
    {}
  )
} : Vo(t) ? {
  [`Set(${t.size})`]: [...t.values()].map((n) => Wi(n))
} : en(t) ? Wi(t) : Je(t) && !Ne(t) && !Hc(t) ? String(t) : t, Wi = (e, t = "") => {
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
class Yc {
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
function Xc(e) {
  return new Yc(e);
}
function fr() {
  return Dt;
}
function Gs(e, t = !1) {
  Dt && Dt.cleanups.push(e);
}
let Qe;
const Zi = /* @__PURE__ */ new WeakSet();
class Kc {
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
    this.flags & 2 && !(this.flags & 32) || this.flags & 8 || Zc(this);
  }
  run() {
    if (!(this.flags & 1))
      return this.fn();
    this.flags |= 2, Ua(this), Jc(this);
    const t = Qe, n = Qt;
    Qe = this, Qt = !0;
    try {
      return this.fn();
    } finally {
      Qc(this), Qe = t, Qt = n, this.flags &= -3;
    }
  }
  stop() {
    if (this.flags & 1) {
      for (let t = this.deps; t; t = t.nextDep)
        vr(t);
      this.deps = this.depsTail = void 0, Ua(this), this.onStop && this.onStop(), this.flags &= -2;
    }
  }
  trigger() {
    this.flags & 64 ? Zi.add(this) : this.scheduler ? this.scheduler() : this.runIfDirty();
  }
  /**
   * @internal
   */
  runIfDirty() {
    Sl(this) && this.run();
  }
  get dirty() {
    return Sl(this);
  }
}
let Wc = 0, Qo, es;
function Zc(e, t = !1) {
  if (e.flags |= 8, t) {
    e.next = es, es = e;
    return;
  }
  e.next = Qo, Qo = e;
}
function pr() {
  Wc++;
}
function hr() {
  if (--Wc > 0)
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
function Jc(e) {
  for (let t = e.deps; t; t = t.nextDep)
    t.version = -1, t.prevActiveLink = t.dep.activeLink, t.dep.activeLink = t;
}
function Qc(e) {
  let t, n = e.depsTail, o = n;
  for (; o; ) {
    const s = o.prevDep;
    o.version === -1 ? (o === n && (n = s), vr(o), nh(o)) : t = o, o.dep.activeLink = o.prevActiveLink, o.prevActiveLink = void 0, o = s;
  }
  e.deps = t, e.depsTail = n;
}
function Sl(e) {
  for (let t = e.deps; t; t = t.nextDep)
    if (t.dep.version !== t.version || t.dep.computed && (ed(t.dep.computed) || t.dep.version !== t.version))
      return !0;
  return !!e._dirty;
}
function ed(e) {
  if (e.flags & 4 && !(e.flags & 16) || (e.flags &= -17, e.globalVersion === rs))
    return;
  e.globalVersion = rs;
  const t = e.dep;
  if (e.flags |= 2, t.version > 0 && !e.isSSR && e.deps && !Sl(e)) {
    e.flags &= -3;
    return;
  }
  const n = Qe, o = Qt;
  Qe = e, Qt = !0;
  try {
    Jc(e);
    const s = e.fn(e._value);
    (t.version === 0 || Sn(s, e._value)) && (e._value = s, t.version++);
  } catch (s) {
    throw t.version++, s;
  } finally {
    Qe = n, Qt = o, Qc(e), e.flags &= -3;
  }
}
function vr(e, t = !1) {
  const { dep: n, prevSub: o, nextSub: s } = e;
  if (o && (o.nextSub = s, e.prevSub = void 0), s && (s.prevSub = o, e.nextSub = void 0), n.subs === e && (n.subs = o, !o && n.computed)) {
    n.computed.flags &= -5;
    for (let i = n.computed.deps; i; i = i.nextDep)
      vr(i, !0);
  }
  !t && !--n.sc && n.map && n.map.delete(n.key);
}
function nh(e) {
  const { prevDep: t, nextDep: n } = e;
  t && (t.nextDep = n, e.prevDep = void 0), n && (n.prevDep = t, e.nextDep = void 0);
}
let Qt = !0;
const td = [];
function Kn() {
  td.push(Qt), Qt = !1;
}
function Wn() {
  const e = td.pop();
  Qt = e === void 0 ? !0 : e;
}
function Ua(e) {
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
class oh {
  constructor(t, n) {
    this.sub = t, this.dep = n, this.version = n.version, this.nextDep = this.prevDep = this.nextSub = this.prevSub = this.prevActiveLink = void 0;
  }
}
class xi {
  constructor(t) {
    this.computed = t, this.version = 0, this.activeLink = void 0, this.subs = void 0, this.map = void 0, this.key = void 0, this.sc = 0;
  }
  track(t) {
    if (!Qe || !Qt || Qe === this.computed)
      return;
    let n = this.activeLink;
    if (n === void 0 || n.sub !== Qe)
      n = this.activeLink = new oh(Qe, this), Qe.deps ? (n.prevDep = Qe.depsTail, Qe.depsTail.nextDep = n, Qe.depsTail = n) : Qe.deps = Qe.depsTail = n, nd(n);
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
    pr();
    try {
      for (let n = this.subs; n; n = n.prevSub)
        n.sub.notify() && n.sub.dep.notify();
    } finally {
      hr();
    }
  }
}
function nd(e) {
  if (e.dep.sc++, e.sub.flags & 4) {
    const t = e.dep.computed;
    if (t && !e.dep.subs) {
      t.flags |= 20;
      for (let o = t.deps; o; o = o.nextDep)
        nd(o);
    }
    const n = e.dep.subs;
    n !== e && (e.prevSub = n, n && (n.nextSub = e)), e.dep.subs = e;
  }
}
const oi = /* @__PURE__ */ new WeakMap(), io = Symbol(
  ""
), xl = Symbol(
  ""
), as = Symbol(
  ""
);
function It(e, t, n) {
  if (Qt && Qe) {
    let o = oi.get(e);
    o || oi.set(e, o = /* @__PURE__ */ new Map());
    let s = o.get(n);
    s || (o.set(n, s = new xi()), s.map = o, s.key = n), s.track();
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
  if (pr(), t === "clear")
    l.forEach(r);
  else {
    const u = Ne(e), c = u && cr(n);
    if (u && n === "length") {
      const d = Number(o);
      l.forEach((f, p) => {
        (p === "length" || p === as || !en(p) && p >= d) && r(f);
      });
    } else
      switch ((n !== void 0 || l.has(void 0)) && r(l.get(n)), c && r(l.get(as)), t) {
        case "add":
          u ? c && r(l.get("length")) : (r(l.get(io)), Co(e) && r(l.get(xl)));
          break;
        case "delete":
          u || (r(l.get(io)), Co(e) && r(l.get(xl)));
          break;
        case "set":
          Co(e) && r(l.get(io));
          break;
      }
  }
  hr();
}
function sh(e, t) {
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
const ih = {
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
    return ja(this, "reduce", e, t);
  },
  reduceRight(e, ...t) {
    return ja(this, "reduceRight", e, t);
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
const lh = Array.prototype;
function mn(e, t, n, o, s, i) {
  const l = $i(e), r = l !== e && !Yt(e), u = l[t];
  if (u !== lh[t]) {
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
function ja(e, t, n, o) {
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
  return (s === -1 || s === !1) && br(n[0]) ? (n[0] = Ye(n[0]), o[t](...n)) : s;
}
function Ho(e, t, n = []) {
  Kn(), pr();
  const o = Ye(e)[t].apply(e, n);
  return hr(), Wn(), o;
}
const rh = /* @__PURE__ */ rr("__proto__,__v_isRef,__isVue"), od = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((e) => e !== "arguments" && e !== "caller").map((e) => Symbol[e]).filter(en)
);
function ah(e) {
  en(e) || (e = String(e));
  const t = Ye(this);
  return It(t, "has", e), t.hasOwnProperty(e);
}
class sd {
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
      return o === (s ? i ? yh : ad : i ? rd : ld).get(t) || // receiver is not the reactive proxy, but has the same prototype
      // this means the receiver is a user proxy of the reactive proxy
      Object.getPrototypeOf(t) === Object.getPrototypeOf(o) ? t : void 0;
    const l = Ne(t);
    if (!s) {
      let u;
      if (l && (u = ih[n]))
        return u;
      if (n === "hasOwnProperty")
        return ah;
    }
    const r = Reflect.get(
      t,
      n,
      // if this is a proxy wrapping a ref, return methods using the raw ref
      // as receiver so that we don't have to call `toRaw` on the ref in all
      // its class methods
      at(t) ? t : o
    );
    return (en(n) ? od.has(n) : rh(n)) || (s || It(t, "get", n), i) ? r : at(r) ? l && cr(n) ? r : r.value : Je(r) ? s ? mr(r) : un(r) : r;
  }
}
class id extends sd {
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
    const l = Ne(t) && cr(n) ? Number(n) < t.length : Ke(t, n), r = Reflect.set(
      t,
      n,
      o,
      at(t) ? t : s
    );
    return t === Ye(s) && (l ? Sn(o, i) && _n(t, "set", n, o) : _n(t, "add", n, o)), r;
  }
  deleteProperty(t, n) {
    const o = Ke(t, n);
    t[n];
    const s = Reflect.deleteProperty(t, n);
    return s && o && _n(t, "delete", n, void 0), s;
  }
  has(t, n) {
    const o = Reflect.has(t, n);
    return (!en(n) || !od.has(n)) && It(t, "has", n), o;
  }
  ownKeys(t) {
    return It(
      t,
      "iterate",
      Ne(t) ? "length" : io
    ), Reflect.ownKeys(t);
  }
}
class uh extends sd {
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
const ch = /* @__PURE__ */ new id(), dh = /* @__PURE__ */ new uh(), fh = /* @__PURE__ */ new id(!0);
const $l = (e) => e, Ns = (e) => Reflect.getPrototypeOf(e);
function ph(e, t, n) {
  return function(...o) {
    const s = this.__v_raw, i = Ye(s), l = Co(i), r = e === "entries" || e === Symbol.iterator && l, u = e === "keys" && l, c = s[e](...o), d = n ? $l : t ? Il : Nt;
    return !t && It(
      i,
      "iterate",
      u ? xl : io
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
function hh(e, t) {
  const n = {
    get(s) {
      const i = this.__v_raw, l = Ye(i), r = Ye(s);
      e || (Sn(s, r) && It(l, "get", s), It(l, "get", r));
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
      return e || (Sn(s, r) && It(l, "has", s), It(l, "has", r)), s === r ? i.has(s) : i.has(s) || i.has(r);
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
        return l.set(s, i), c ? Sn(i, d) && _n(l, "set", s, i) : _n(l, "add", s, i), this;
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
    n[s] = ph(s, e, t);
  }), n;
}
function gr(e, t) {
  const n = hh(e, t);
  return (o, s, i) => s === "__v_isReactive" ? !e : s === "__v_isReadonly" ? e : s === "__v_raw" ? o : Reflect.get(
    Ke(n, s) && s in o ? n : o,
    s,
    i
  );
}
const vh = {
  get: /* @__PURE__ */ gr(!1, !1)
}, gh = {
  get: /* @__PURE__ */ gr(!1, !0)
}, mh = {
  get: /* @__PURE__ */ gr(!0, !1)
};
const ld = /* @__PURE__ */ new WeakMap(), rd = /* @__PURE__ */ new WeakMap(), ad = /* @__PURE__ */ new WeakMap(), yh = /* @__PURE__ */ new WeakMap();
function bh(e) {
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
function _h(e) {
  return e.__v_skip || !Object.isExtensible(e) ? 0 : bh(qp(e));
}
function un(e) {
  return co(e) ? e : yr(
    e,
    !1,
    ch,
    vh,
    ld
  );
}
function wh(e) {
  return yr(
    e,
    !1,
    fh,
    gh,
    rd
  );
}
function mr(e) {
  return yr(
    e,
    !0,
    dh,
    mh,
    ad
  );
}
function yr(e, t, n, o, s) {
  if (!Je(e) || e.__v_raw && !(t && e.__v_isReactive))
    return e;
  const i = s.get(e);
  if (i)
    return i;
  const l = _h(e);
  if (l === 0)
    return e;
  const r = new Proxy(
    e,
    l === 2 ? o : n
  );
  return s.set(e, r), r;
}
function So(e) {
  return co(e) ? So(e.__v_raw) : !!(e && e.__v_isReactive);
}
function co(e) {
  return !!(e && e.__v_isReadonly);
}
function Yt(e) {
  return !!(e && e.__v_isShallow);
}
function br(e) {
  return e ? !!e.__v_raw : !1;
}
function Ye(e) {
  const t = e && e.__v_raw;
  return t ? Ye(t) : e;
}
function lo(e) {
  return !Ke(e, "__v_skip") && Object.isExtensible(e) && Uc(e, "__v_skip", !0), e;
}
const Nt = (e) => Je(e) ? un(e) : e, Il = (e) => Je(e) ? mr(e) : e;
function at(e) {
  return e ? e.__v_isRef === !0 : !1;
}
function te(e) {
  return kh(e, !1);
}
function kh(e, t) {
  return at(e) ? e : new Eh(e, t);
}
class Eh {
  constructor(t, n) {
    this.dep = new xi(), this.__v_isRef = !0, this.__v_isShallow = !1, this._rawValue = n ? t : Ye(t), this._value = n ? t : Nt(t), this.__v_isShallow = n;
  }
  get value() {
    return this.dep.track(), this._value;
  }
  set value(t) {
    const n = this._rawValue, o = this.__v_isShallow || Yt(t) || co(t);
    t = o ? t : Ye(t), Sn(t, n) && (this._rawValue = t, this._value = o ? t : Nt(t), this.dep.trigger());
  }
}
function H(e) {
  return at(e) ? e.value : e;
}
function Ue(e) {
  return Re(e) ? e() : H(e);
}
const Ch = {
  get: (e, t, n) => t === "__v_raw" ? e : H(Reflect.get(e, t, n)),
  set: (e, t, n, o) => {
    const s = e[t];
    return at(s) && !at(n) ? (s.value = n, !0) : Reflect.set(e, t, n, o);
  }
};
function ud(e) {
  return So(e) ? e : new Proxy(e, Ch);
}
class Sh {
  constructor(t) {
    this.__v_isRef = !0, this._value = void 0;
    const n = this.dep = new xi(), { get: o, set: s } = t(n.track.bind(n), n.trigger.bind(n));
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
  return new Sh(e);
}
function $h(e) {
  const t = Ne(e) ? new Array(e.length) : {};
  for (const n in e)
    t[n] = cd(e, n);
  return t;
}
class Ih {
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
    return sh(Ye(this._object), this._key);
  }
}
class Nh {
  constructor(t) {
    this._getter = t, this.__v_isRef = !0, this.__v_isReadonly = !0, this._value = void 0;
  }
  get value() {
    return this._value = this._getter();
  }
}
function tt(e, t, n) {
  return at(e) ? e : Re(e) ? new Nh(e) : Je(e) && arguments.length > 1 ? cd(e, t, n) : te(e);
}
function cd(e, t, n) {
  const o = e[t];
  return at(o) ? o : new Ih(e, t, n);
}
class Th {
  constructor(t, n, o) {
    this.fn = t, this.setter = n, this._value = void 0, this.dep = new xi(this), this.__v_isRef = !0, this.deps = void 0, this.depsTail = void 0, this.flags = 16, this.globalVersion = rs - 1, this.next = void 0, this.effect = this, this.__v_isReadonly = !n, this.isSSR = o;
  }
  /**
   * @internal
   */
  notify() {
    if (this.flags |= 16, !(this.flags & 8) && // avoid infinite self recursion
    Qe !== this)
      return Zc(this, !0), !0;
  }
  get value() {
    const t = this.dep.track();
    return ed(this), t && (t.version = this.dep.version), this._value;
  }
  set value(t) {
    this.setter && this.setter(t);
  }
}
function Mh(e, t, n = !1) {
  let o, s;
  return Re(e) ? o = e : (o = e.get, s = e.set), new Th(o, s, n);
}
const Ms = {}, si = /* @__PURE__ */ new WeakMap();
let eo;
function Ph(e, t = !1, n = eo) {
  if (n) {
    let o = si.get(n);
    o || si.set(n, o = []), o.push(e);
  }
}
function Oh(e, t, n = Ze) {
  const { immediate: o, deep: s, once: i, scheduler: l, augmentJob: r, call: u } = n, c = (C) => s ? C : Yt(C) || s === !1 || s === 0 ? wn(C, 1) : wn(C);
  let d, f, p, v, w = !1, S = !1;
  if (at(e) ? (f = () => e.value, w = Yt(e)) : So(e) ? (f = () => c(e), w = !0) : Ne(e) ? (S = !0, w = e.some((C) => So(C) || Yt(C)), f = () => e.map((C) => {
    if (at(C))
      return C.value;
    if (So(C))
      return c(C);
    if (Re(C))
      return u ? u(C, 2) : C();
  })) : Re(e) ? t ? f = u ? () => u(e, 2) : e : f = () => {
    if (p) {
      Kn();
      try {
        p();
      } finally {
        Wn();
      }
    }
    const C = eo;
    eo = d;
    try {
      return u ? u(e, 3, [v]) : e(v);
    } finally {
      eo = C;
    }
  } : f = cn, t && s) {
    const C = f, O = s === !0 ? 1 / 0 : s;
    f = () => wn(C(), O);
  }
  const P = fr(), z = () => {
    d.stop(), P && P.active && ur(P.effects, d);
  };
  if (i && t) {
    const C = t;
    t = (...O) => {
      C(...O), z();
    };
  }
  let L = S ? new Array(e.length).fill(Ms) : Ms;
  const y = (C) => {
    if (!(!(d.flags & 1) || !d.dirty && !C))
      if (t) {
        const O = d.run();
        if (s || w || (S ? O.some((q, Y) => Sn(q, L[Y])) : Sn(O, L))) {
          p && p();
          const q = eo;
          eo = d;
          try {
            const Y = [
              O,
              // pass undefined as the old value when it's changed for the first time
              L === Ms ? void 0 : S && L[0] === Ms ? [] : L,
              v
            ];
            u ? u(t, 3, Y) : (
              // @ts-expect-error
              t(...Y)
            ), L = O;
          } finally {
            eo = q;
          }
        }
      } else
        d.run();
  };
  return r && r(y), d = new Kc(f), d.scheduler = l ? () => l(y, !1) : y, v = (C) => Ph(C, !1, d), p = d.onStop = () => {
    const C = si.get(d);
    if (C) {
      if (u)
        u(C, 4);
      else
        for (const O of C) O();
      si.delete(d);
    }
  }, t ? o ? y(!0) : L = d.run() : l ? l(y.bind(null, !0), !0) : d.run(), z.pause = d.pause.bind(d), z.resume = d.resume.bind(d), z.stop = z, z;
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
  else if (Hc(e)) {
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
    return s && Fc(s) && s.catch((i) => {
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
  Ah(e, n, s, o, l);
}
function Ah(e, t, n, o = !0, s = !1) {
  if (s)
    throw e;
  console.error(e);
}
const Rt = [];
let ln = -1;
const xo = [];
let On = null, wo = 0;
const dd = /* @__PURE__ */ Promise.resolve();
let ii = null;
function _t(e) {
  const t = ii || dd;
  return e ? t.then(this ? e.bind(this) : e) : t;
}
function Dh(e) {
  let t = ln + 1, n = Rt.length;
  for (; t < n; ) {
    const o = t + n >>> 1, s = Rt[o], i = us(s);
    i < e || i === e && s.flags & 2 ? t = o + 1 : n = o;
  }
  return t;
}
function _r(e) {
  if (!(e.flags & 1)) {
    const t = us(e), n = Rt[Rt.length - 1];
    !n || // fast path when the job id is larger than the tail
    !(e.flags & 2) && t >= us(n) ? Rt.push(e) : Rt.splice(Dh(t), 0, e), e.flags |= 1, fd();
  }
}
function fd() {
  ii || (ii = dd.then(hd));
}
function Rh(e) {
  Ne(e) ? xo.push(...e) : On && e.id === -1 ? On.splice(wo + 1, 0, e) : e.flags & 1 || (xo.push(e), e.flags |= 1), fd();
}
function Ga(e, t, n = ln + 1) {
  for (; n < Rt.length; n++) {
    const o = Rt[n];
    if (o && o.flags & 2) {
      if (e && o.id !== e.uid)
        continue;
      Rt.splice(n, 1), n--, o.flags & 4 && (o.flags &= -2), o(), o.flags & 4 || (o.flags &= -2);
    }
  }
}
function pd(e) {
  if (xo.length) {
    const t = [...new Set(xo)].sort(
      (n, o) => us(n) - us(o)
    );
    if (xo.length = 0, On) {
      On.push(...t);
      return;
    }
    for (On = t, wo = 0; wo < On.length; wo++) {
      const n = On[wo];
      n.flags & 4 && (n.flags &= -2), n.flags & 8 || n(), n.flags &= -2;
    }
    On = null, wo = 0;
  }
}
const us = (e) => e.id == null ? e.flags & 2 ? -1 : 1 / 0 : e.id;
function hd(e) {
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
    ln = -1, Rt.length = 0, pd(), ii = null, (Rt.length || xo.length) && hd();
  }
}
let kt = null, vd = null;
function li(e) {
  const t = kt;
  return kt = e, vd = e && e.type.__scopeId || null, t;
}
function Un(e, t = kt, n) {
  if (!t || e._n)
    return e;
  const o = (...s) => {
    o._d && su(-1);
    const i = li(t);
    let l;
    try {
      l = e(...s);
    } finally {
      li(i), o._d && su(1);
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
const gd = Symbol("_vte"), Lh = (e) => e.__isTeleport, ts = (e) => e && (e.disabled || e.disabled === ""), qa = (e) => e && (e.defer || e.defer === ""), Ya = (e) => typeof SVGElement < "u" && e instanceof SVGElement, Xa = (e) => typeof MathMLElement == "function" && e instanceof MathMLElement, Nl = (e, t) => {
  const n = e && e.to;
  return nt(n) ? t ? t(n) : null : n;
}, md = {
  name: "Teleport",
  __isTeleport: !0,
  process(e, t, n, o, s, i, l, r, u, c) {
    const {
      mc: d,
      pc: f,
      pbc: p,
      o: { insert: v, querySelector: w, createText: S, createComment: P }
    } = c, z = ts(t.props);
    let { shapeFlag: L, children: y, dynamicChildren: C } = t;
    if (e == null) {
      const O = t.el = S(""), q = t.anchor = S("");
      v(O, n, o), v(q, n, o);
      const Y = (M, X) => {
        L & 16 && (s && s.isCE && (s.ce._teleportTarget = M), d(
          y,
          M,
          X,
          s,
          i,
          l,
          r,
          u
        ));
      }, B = () => {
        const M = t.target = Nl(t.props, w), X = yd(M, t, S, v);
        M && (l !== "svg" && Ya(M) ? l = "svg" : l !== "mathml" && Xa(M) && (l = "mathml"), z || (Y(M, X), qs(t, !1)));
      };
      z && (Y(n, q), qs(t, !0)), qa(t.props) ? At(() => {
        B(), t.el.__isMounted = !0;
      }, i) : B();
    } else {
      if (qa(t.props) && !e.el.__isMounted) {
        At(() => {
          md.process(
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
      const O = t.anchor = e.anchor, q = t.target = e.target, Y = t.targetAnchor = e.targetAnchor, B = ts(e.props), M = B ? n : q, X = B ? O : Y;
      if (l === "svg" || Ya(q) ? l = "svg" : (l === "mathml" || Xa(q)) && (l = "mathml"), C ? (p(
        e.dynamicChildren,
        C,
        M,
        s,
        i,
        l,
        r
      ), Cr(e, t, !0)) : u || f(
        e,
        t,
        M,
        X,
        s,
        i,
        l,
        r,
        !1
      ), z)
        B ? t.props && e.props && t.props.to !== e.props.to && (t.props.to = e.props.to) : Ps(
          t,
          n,
          O,
          c,
          1
        );
      else if ((t.props && t.props.to) !== (e.props && e.props.to)) {
        const ie = t.target = Nl(
          t.props,
          w
        );
        ie && Ps(
          t,
          ie,
          null,
          c,
          0
        );
      } else B && Ps(
        t,
        q,
        Y,
        c,
        1
      );
      qs(t, z);
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
      const v = i || !ts(p);
      for (let w = 0; w < r.length; w++) {
        const S = r[w];
        o(
          S,
          t,
          n,
          v,
          !!S.dynamicChildren
        );
      }
    }
  },
  move: Ps,
  hydrate: Vh
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
function Vh(e, t, n, o, s, i, {
  o: { nextSibling: l, parentNode: r, querySelector: u, insert: c, createText: d }
}, f) {
  const p = t.target = Nl(
    t.props,
    u
  );
  if (p) {
    const v = ts(t.props), w = p._lpa || p.firstChild;
    if (t.shapeFlag & 16)
      if (v)
        t.anchor = f(
          l(e),
          t,
          r(e),
          n,
          o,
          s,
          i
        ), t.targetStart = w, t.targetAnchor = w && l(w);
      else {
        t.anchor = l(e);
        let S = w;
        for (; S; ) {
          if (S && S.nodeType === 8) {
            if (S.data === "teleport start anchor")
              t.targetStart = S;
            else if (S.data === "teleport anchor") {
              t.targetAnchor = S, p._lpa = t.targetAnchor && l(t.targetAnchor);
              break;
            }
          }
          S = l(S);
        }
        t.targetAnchor || yd(p, t, d, c), f(
          w && l(w),
          t,
          p,
          n,
          o,
          s,
          i
        );
      }
    qs(t, v);
  }
  return t.anchor && l(t.anchor);
}
const zh = md;
function qs(e, t) {
  const n = e.ctx;
  if (n && n.ut) {
    let o, s;
    for (t ? (o = e.el, s = e.anchor) : (o = e.targetStart, s = e.targetAnchor); o && o !== s; )
      o.nodeType === 1 && o.setAttribute("data-v-owner", n.uid), o = o.nextSibling;
    n.ut();
  }
}
function yd(e, t, n, o) {
  const s = t.targetStart = n(""), i = t.targetAnchor = n("");
  return s[gd] = i, e && (o(s, e), o(i, e)), i;
}
function wr(e, t) {
  e.shapeFlag & 6 && e.component ? (e.transition = t, wr(e.component.subTree, t)) : e.shapeFlag & 128 ? (e.ssContent.transition = t.clone(e.ssContent), e.ssFallback.transition = t.clone(e.ssFallback)) : e.transition = t;
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
function bd(e) {
  e.ids = [e.ids[0] + e.ids[2]++ + "-", 0, 0];
}
function ri(e, t, n, o, s = !1) {
  if (Ne(e)) {
    e.forEach(
      (w, S) => ri(
        w,
        t && (Ne(t) ? t[S] : t),
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
  const i = o.shapeFlag & 4 ? Oi(o.component) : o.el, l = s ? null : i, { i: r, r: u } = e, c = t && t.r, d = r.refs === Ze ? r.refs = {} : r.refs, f = r.setupState, p = Ye(f), v = f === Ze ? () => !1 : (w) => Ke(p, w);
  if (c != null && c !== u && (nt(c) ? (d[c] = null, v(c) && (f[c] = null)) : at(c) && (c.value = null)), Re(u))
    ks(u, r, 12, [l, d]);
  else {
    const w = nt(u), S = at(u);
    if (w || S) {
      const P = () => {
        if (e.f) {
          const z = w ? v(u) ? f[u] : d[u] : u.value;
          s ? Ne(z) && ur(z, i) : Ne(z) ? z.includes(i) || z.push(i) : w ? (d[u] = [i], v(u) && (f[u] = d[u])) : (u.value = [i], e.k && (d[e.k] = u.value));
        } else w ? (d[u] = l, v(u) && (f[u] = l)) : S && (u.value = l, e.k && (d[e.k] = l));
      };
      l ? (P.id = -1, At(P, n)) : P();
    }
  }
}
Si().requestIdleCallback;
Si().cancelIdleCallback;
const $o = (e) => !!e.type.__asyncLoader, _d = (e) => e.type.__isKeepAlive;
function Fh(e, t) {
  wd(e, "a", t);
}
function Bh(e, t) {
  wd(e, "da", t);
}
function wd(e, t, n = Ct) {
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
      _d(s.parent.vnode) && Hh(o, t, n, s), s = s.parent;
  }
}
function Hh(e, t, n, o) {
  const s = Ni(
    t,
    e,
    o,
    !0
    /* prepend */
  );
  Ti(() => {
    ur(o[t], s);
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
const Nn = (e) => (t, n = Ct) => {
  (!ds || e === "sp") && Ni(e, (...o) => t(...o), n);
}, kd = Nn("bm"), St = Nn("m"), Uh = Nn(
  "bu"
), jh = Nn("u"), Tn = Nn(
  "bum"
), Ti = Nn("um"), Gh = Nn(
  "sp"
), qh = Nn("rtg"), Yh = Nn("rtc");
function Xh(e, t = Ct) {
  Ni("ec", e, t);
}
const Ed = "components";
function Cd(e, t) {
  return xd(Ed, e, !0, t) || e;
}
const Sd = Symbol.for("v-ndc");
function kr(e) {
  return nt(e) ? xd(Ed, e, !1) || e : e || Sd;
}
function xd(e, t, n = !0, o = !1) {
  const s = kt || Ct;
  if (s) {
    const i = s.type;
    {
      const r = Av(
        i,
        !1
      );
      if (r && (r === t || r === Xt(t) || r === Ci(Xt(t))))
        return i;
    }
    const l = (
      // local registration
      // check instance[type] first which is resolved for options API
      Ka(s[e] || i[e], t) || // global registration
      Ka(s.appContext[e], t)
    );
    return !l && o ? i : l;
  }
}
function Ka(e, t) {
  return e && (e[t] || e[Xt(t)] || e[Ci(Xt(t))]);
}
function Ve(e, t, n, o) {
  let s;
  const i = n && n[o], l = Ne(e);
  if (l || nt(e)) {
    const r = l && So(e);
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
    return t !== "default" && (n.name = t), g(), ht(
      Se,
      null,
      [se("slot", n, o && o())],
      64
    );
  let i = e[t];
  i && i._c && (i._d = !1), g();
  const l = i && $d(i(n)), r = n.key || // slot content array of a dynamic conditional slot may have a branch
  // key attached in the `createSlots` helper, respect that
  l && l.key, u = ht(
    Se,
    {
      key: (r && !en(r) ? r : `_${t}`) + // #7256 force differentiate fallback content from actual content
      (!l && o ? "_fb" : "")
    },
    l || (o ? o() : []),
    l && e._ === 1 ? 64 : -2
  );
  return u.scopeId && (u.slotScopeIds = [u.scopeId + "-s"]), i && i._c && (i._d = !0), u;
}
function $d(e) {
  return e.some((t) => cs(t) ? !(t.type === qn || t.type === Se && !$d(t.children)) : !0) ? e : null;
}
const Tl = (e) => e ? Kd(e) ? Oi(e) : Tl(e.parent) : null, ns = (
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
    $options: (e) => Md(e),
    $forceUpdate: (e) => e.f || (e.f = () => {
      _r(e.update);
    }),
    $nextTick: (e) => e.n || (e.n = _t.bind(e.proxy)),
    $watch: (e) => mv.bind(e)
  })
), el = (e, t) => e !== Ze && !e.__isScriptSetup && Ke(e, t), Kh = {
  get({ _: e }, t) {
    if (t === "__v_skip")
      return !0;
    const { ctx: n, setupState: o, data: s, props: i, accessCache: l, type: r, appContext: u } = e;
    let c;
    if (t[0] !== "$") {
      const v = l[t];
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
function Wh() {
  return Id().slots;
}
function Zh() {
  return Id().attrs;
}
function Id() {
  const e = zo();
  return e.setupContext || (e.setupContext = Zd(e));
}
function Wa(e) {
  return Ne(e) ? e.reduce(
    (t, n) => (t[n] = null, t),
    {}
  ) : e;
}
function Nd(e, t) {
  const n = {};
  for (const o in e)
    t.includes(o) || Object.defineProperty(n, o, {
      enumerable: !0,
      get: () => e[o]
    });
  return n;
}
let Ml = !0;
function Jh(e) {
  const t = Md(e), n = e.proxy, o = e.ctx;
  Ml = !1, t.beforeCreate && Za(t.beforeCreate, e, "bc");
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
    beforeUpdate: v,
    updated: w,
    activated: S,
    deactivated: P,
    beforeDestroy: z,
    beforeUnmount: L,
    destroyed: y,
    unmounted: C,
    render: O,
    renderTracked: q,
    renderTriggered: Y,
    errorCaptured: B,
    serverPrefetch: M,
    // public API
    expose: X,
    inheritAttrs: ie,
    // assets
    components: D,
    directives: G,
    filters: h
  } = t;
  if (c && Qh(c, o, null), l)
    for (const V in l) {
      const U = l[V];
      Re(U) && (o[V] = U.bind(n));
    }
  if (s) {
    const V = s.call(n, n);
    Je(V) && (e.data = un(V));
  }
  if (Ml = !0, i)
    for (const V in i) {
      const U = i[V], ee = Re(U) ? U.bind(n, n) : Re(U.get) ? U.get.bind(n, n) : cn, ce = !Re(U) && Re(U.set) ? U.set.bind(n) : cn, ve = ae({
        get: ee,
        set: ce
      });
      Object.defineProperty(o, V, {
        enumerable: !0,
        configurable: !0,
        get: () => ve.value,
        set: (re) => ve.value = re
      });
    }
  if (r)
    for (const V in r)
      Td(r[V], o, n, V);
  if (u) {
    const V = Re(u) ? u.call(n) : u;
    Reflect.ownKeys(V).forEach((U) => {
      po(U, V[U]);
    });
  }
  d && Za(d, e, "c");
  function $(V, U) {
    Ne(U) ? U.forEach((ee) => V(ee.bind(n))) : U && V(U.bind(n));
  }
  if ($(kd, f), $(St, p), $(Uh, v), $(jh, w), $(Fh, S), $(Bh, P), $(Xh, B), $(Yh, q), $(qh, Y), $(Tn, L), $(Ti, C), $(Gh, M), Ne(X))
    if (X.length) {
      const V = e.exposed || (e.exposed = {});
      X.forEach((U) => {
        Object.defineProperty(V, U, {
          get: () => n[U],
          set: (ee) => n[U] = ee
        });
      });
    } else e.exposed || (e.exposed = {});
  O && e.render === cn && (e.render = O), ie != null && (e.inheritAttrs = ie), D && (e.components = D), G && (e.directives = G), M && bd(e);
}
function Qh(e, t, n = cn) {
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
function Za(e, t, n) {
  hn(
    Ne(e) ? e.map((o) => o.bind(t.proxy)) : e.bind(t.proxy),
    t,
    n
  );
}
function Td(e, t, n, o) {
  let s = o.includes(".") ? jd(n, o) : () => n[o];
  if (nt(e)) {
    const i = t[e];
    Re(i) && ze(s, i);
  } else if (Re(e))
    ze(s, e.bind(n));
  else if (Je(e))
    if (Ne(e))
      e.forEach((i) => Td(i, t, n, o));
    else {
      const i = Re(e.handler) ? e.handler.bind(n) : t[e.handler];
      Re(i) && ze(s, i, e);
    }
}
function Md(e) {
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
      const r = ev[l] || n && n[l];
      e[l] = r ? r(e[l], t[l]) : t[l];
    }
  return e;
}
const ev = {
  data: Ja,
  props: Qa,
  emits: Qa,
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
  watch: nv,
  // provide / inject
  provide: Ja,
  inject: tv
};
function Ja(e, t) {
  return t ? e ? function() {
    return Tt(
      Re(e) ? e.call(this, this) : e,
      Re(t) ? t.call(this, this) : t
    );
  } : t : e;
}
function tv(e, t) {
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
function Qa(e, t) {
  return e ? Ne(e) && Ne(t) ? [.../* @__PURE__ */ new Set([...e, ...t])] : Tt(
    /* @__PURE__ */ Object.create(null),
    Wa(e),
    Wa(t ?? {})
  ) : t;
}
function nv(e, t) {
  if (!e) return t;
  if (!t) return e;
  const n = Tt(/* @__PURE__ */ Object.create(null), e);
  for (const o in t)
    n[o] = Ot(e[o], t[o]);
  return n;
}
function Pd() {
  return {
    app: null,
    config: {
      isNativeTag: jp,
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
let ov = 0;
function sv(e, t) {
  return function(o, s = null) {
    Re(o) || (o = Tt({}, o)), s != null && !Je(s) && (s = null);
    const i = Pd(), l = /* @__PURE__ */ new WeakSet(), r = [];
    let u = !1;
    const c = i.app = {
      _uid: ov++,
      _component: o,
      _props: s,
      _container: null,
      _context: i,
      _instance: null,
      version: Lv,
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
          const v = c._ceVNode || se(o, s);
          return v.appContext = i, p === !0 ? p = "svg" : p === !1 && (p = void 0), e(v, d, p), u = !0, c._container = d, d.__vue_app__ = c, Oi(v.component);
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
const Od = {}, Ad = () => Object.create(Od), Dd = (e) => Object.getPrototypeOf(e) === Od;
function iv(e, t, n, o = !1) {
  const s = {}, i = Ad();
  e.propsDefaults = /* @__PURE__ */ Object.create(null), Rd(e, t, s, i);
  for (const l in e.propsOptions[0])
    l in s || (s[l] = void 0);
  n ? e.props = o ? s : wh(s) : e.type.props ? e.props = s : e.props = i, e.attrs = i;
}
function lv(e, t, n, o) {
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
        const v = t[p];
        if (u)
          if (Ke(i, p))
            v !== i[p] && (i[p] = v, c = !0);
          else {
            const w = Xt(p);
            s[w] = Ol(
              u,
              r,
              w,
              v,
              e,
              !1
            );
          }
        else
          v !== i[p] && (i[p] = v, c = !0);
      }
    }
  } else {
    Rd(e, t, s, i) && (c = !0);
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
function Rd(e, t, n, o) {
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
const rv = /* @__PURE__ */ new WeakMap();
function Ld(e, t, n = !1) {
  const o = n ? rv : t.propsCache, s = o.get(e);
  if (s)
    return s;
  const i = e.props, l = {}, r = [];
  let u = !1;
  if (!Re(e)) {
    const d = (f) => {
      u = !0;
      const [p, v] = Ld(f, t, !0);
      Tt(l, p), v && r.push(...v);
    };
    !n && t.mixins.length && t.mixins.forEach(d), e.extends && d(e.extends), e.mixins && e.mixins.forEach(d);
  }
  if (!i && !u)
    return Je(e) && o.set(e, Eo), Eo;
  if (Ne(i))
    for (let d = 0; d < i.length; d++) {
      const f = Xt(i[d]);
      eu(f) && (l[f] = Ze);
    }
  else if (i)
    for (const d in i) {
      const f = Xt(d);
      if (eu(f)) {
        const p = i[d], v = l[f] = Ne(p) || Re(p) ? { type: p } : Tt({}, p), w = v.type;
        let S = !1, P = !0;
        if (Ne(w))
          for (let z = 0; z < w.length; ++z) {
            const L = w[z], y = Re(L) && L.name;
            if (y === "Boolean") {
              S = !0;
              break;
            } else y === "String" && (P = !1);
          }
        else
          S = Re(w) && w.name === "Boolean";
        v[
          0
          /* shouldCast */
        ] = S, v[
          1
          /* shouldCastTrue */
        ] = P, (S || Ke(v, "default")) && r.push(f);
      }
    }
  const c = [l, r];
  return Je(e) && o.set(e, c), c;
}
function eu(e) {
  return e[0] !== "$" && !Jo(e);
}
const Vd = (e) => e[0] === "_" || e === "$stable", Er = (e) => Ne(e) ? e.map(an) : [an(e)], av = (e, t, n) => {
  if (t._n)
    return t;
  const o = Un((...s) => Er(t(...s)), n);
  return o._c = !1, o;
}, zd = (e, t, n) => {
  const o = e._ctx;
  for (const s in e) {
    if (Vd(s)) continue;
    const i = e[s];
    if (Re(i))
      t[s] = av(s, i, o);
    else if (i != null) {
      const l = Er(i);
      t[s] = () => l;
    }
  }
}, Fd = (e, t) => {
  const n = Er(t);
  e.slots.default = () => n;
}, Bd = (e, t, n) => {
  for (const o in t)
    (n || o !== "_") && (e[o] = t[o]);
}, uv = (e, t, n) => {
  const o = e.slots = Ad();
  if (e.vnode.shapeFlag & 32) {
    const s = t._;
    s ? (Bd(o, t, n), n && Uc(o, "_", s, !0)) : zd(t, o);
  } else t && Fd(e, t);
}, cv = (e, t, n) => {
  const { vnode: o, slots: s } = e;
  let i = !0, l = Ze;
  if (o.shapeFlag & 32) {
    const r = t._;
    r ? n && r === 1 ? i = !1 : Bd(s, t, n) : (i = !t.$stable, zd(t, s)), l = t;
  } else t && (Fd(e, t), l = { default: 1 });
  if (i)
    for (const r in s)
      !Vd(r) && l[r] == null && delete s[r];
}, At = Cv;
function dv(e) {
  return fv(e);
}
function fv(e, t) {
  const n = Si();
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
    setScopeId: v = cn,
    insertStaticContent: w
  } = e, S = (I, R, b, _ = null, E = null, x = null, j = void 0, K = null, J = !!R.dynamicChildren) => {
    if (I === R)
      return;
    I && !Uo(I, R) && (_ = Me(I), re(I, E, x, !0), I = null), R.patchFlag === -2 && (J = !1, R.dynamicChildren = null);
    const { type: W, ref: fe, shapeFlag: ue } = R;
    switch (W) {
      case Pi:
        P(I, R, b, _);
        break;
      case qn:
        z(I, R, b, _);
        break;
      case Ys:
        I == null && L(R, b, _, j);
        break;
      case Se:
        D(
          I,
          R,
          b,
          _,
          E,
          x,
          j,
          K,
          J
        );
        break;
      default:
        ue & 1 ? O(
          I,
          R,
          b,
          _,
          E,
          x,
          j,
          K,
          J
        ) : ue & 6 ? G(
          I,
          R,
          b,
          _,
          E,
          x,
          j,
          K,
          J
        ) : (ue & 64 || ue & 128) && W.process(
          I,
          R,
          b,
          _,
          E,
          x,
          j,
          K,
          J,
          Ee
        );
    }
    fe != null && E && ri(fe, I && I.ref, x, R || I, !R);
  }, P = (I, R, b, _) => {
    if (I == null)
      o(
        R.el = r(R.children),
        b,
        _
      );
    else {
      const E = R.el = I.el;
      R.children !== I.children && c(E, R.children);
    }
  }, z = (I, R, b, _) => {
    I == null ? o(
      R.el = u(R.children || ""),
      b,
      _
    ) : R.el = I.el;
  }, L = (I, R, b, _) => {
    [I.el, I.anchor] = w(
      I.children,
      R,
      b,
      _,
      I.el,
      I.anchor
    );
  }, y = ({ el: I, anchor: R }, b, _) => {
    let E;
    for (; I && I !== R; )
      E = p(I), o(I, b, _), I = E;
    o(R, b, _);
  }, C = ({ el: I, anchor: R }) => {
    let b;
    for (; I && I !== R; )
      b = p(I), s(I), I = b;
    s(R);
  }, O = (I, R, b, _, E, x, j, K, J) => {
    R.type === "svg" ? j = "svg" : R.type === "math" && (j = "mathml"), I == null ? q(
      R,
      b,
      _,
      E,
      x,
      j,
      K,
      J
    ) : M(
      I,
      R,
      E,
      x,
      j,
      K,
      J
    );
  }, q = (I, R, b, _, E, x, j, K) => {
    let J, W;
    const { props: fe, shapeFlag: ue, transition: ge, dirs: he } = I;
    if (J = I.el = l(
      I.type,
      x,
      fe && fe.is,
      fe
    ), ue & 8 ? d(J, I.children) : ue & 16 && B(
      I.children,
      J,
      null,
      _,
      E,
      tl(I, x),
      j,
      K
    ), he && Zn(I, null, _, "created"), Y(J, I, I.scopeId, j, _), fe) {
      for (const Be in fe)
        Be !== "value" && !Jo(Be) && i(J, Be, null, fe[Be], x, _);
      "value" in fe && i(J, "value", null, fe.value, x), (W = fe.onVnodeBeforeMount) && sn(W, _, I);
    }
    he && Zn(I, null, _, "beforeMount");
    const Te = pv(E, ge);
    Te && ge.beforeEnter(J), o(J, R, b), ((W = fe && fe.onVnodeMounted) || Te || he) && At(() => {
      W && sn(W, _, I), Te && ge.enter(J), he && Zn(I, null, _, "mounted");
    }, E);
  }, Y = (I, R, b, _, E) => {
    if (b && v(I, b), _)
      for (let x = 0; x < _.length; x++)
        v(I, _[x]);
    if (E) {
      let x = E.subTree;
      if (R === x || qd(x.type) && (x.ssContent === R || x.ssFallback === R)) {
        const j = E.vnode;
        Y(
          I,
          j,
          j.scopeId,
          j.slotScopeIds,
          E.parent
        );
      }
    }
  }, B = (I, R, b, _, E, x, j, K, J = 0) => {
    for (let W = J; W < I.length; W++) {
      const fe = I[W] = K ? An(I[W]) : an(I[W]);
      S(
        null,
        fe,
        R,
        b,
        _,
        E,
        x,
        j,
        K
      );
    }
  }, M = (I, R, b, _, E, x, j) => {
    const K = R.el = I.el;
    let { patchFlag: J, dynamicChildren: W, dirs: fe } = R;
    J |= I.patchFlag & 16;
    const ue = I.props || Ze, ge = R.props || Ze;
    let he;
    if (b && Jn(b, !1), (he = ge.onVnodeBeforeUpdate) && sn(he, b, R, I), fe && Zn(R, I, b, "beforeUpdate"), b && Jn(b, !0), (ue.innerHTML && ge.innerHTML == null || ue.textContent && ge.textContent == null) && d(K, ""), W ? X(
      I.dynamicChildren,
      W,
      K,
      b,
      _,
      tl(R, E),
      x
    ) : j || U(
      I,
      R,
      K,
      null,
      b,
      _,
      tl(R, E),
      x,
      !1
    ), J > 0) {
      if (J & 16)
        ie(K, ue, ge, b, E);
      else if (J & 2 && ue.class !== ge.class && i(K, "class", null, ge.class, E), J & 4 && i(K, "style", ue.style, ge.style, E), J & 8) {
        const Te = R.dynamicProps;
        for (let Be = 0; Be < Te.length; Be++) {
          const Ae = Te[Be], st = ue[Ae], mt = ge[Ae];
          (mt !== st || Ae === "value") && i(K, Ae, st, mt, E, b);
        }
      }
      J & 1 && I.children !== R.children && d(K, R.children);
    } else !j && W == null && ie(K, ue, ge, b, E);
    ((he = ge.onVnodeUpdated) || fe) && At(() => {
      he && sn(he, b, R, I), fe && Zn(R, I, b, "updated");
    }, _);
  }, X = (I, R, b, _, E, x, j) => {
    for (let K = 0; K < R.length; K++) {
      const J = I[K], W = R[K], fe = (
        // oldVNode may be an errored async setup() component inside Suspense
        // which will not have a mounted element
        J.el && // - In the case of a Fragment, we need to provide the actual parent
        // of the Fragment itself so it can move its children.
        (J.type === Se || // - In the case of different nodes, there is going to be a replacement
        // which also requires the correct parent container
        !Uo(J, W) || // - In the case of a component, it could contain anything.
        J.shapeFlag & 70) ? f(J.el) : (
          // In other cases, the parent container is not actually used so we
          // just pass the block element here to avoid a DOM parentNode call.
          b
        )
      );
      S(
        J,
        W,
        fe,
        null,
        _,
        E,
        x,
        j,
        !0
      );
    }
  }, ie = (I, R, b, _, E) => {
    if (R !== b) {
      if (R !== Ze)
        for (const x in R)
          !Jo(x) && !(x in b) && i(
            I,
            x,
            R[x],
            null,
            E,
            _
          );
      for (const x in b) {
        if (Jo(x)) continue;
        const j = b[x], K = R[x];
        j !== K && x !== "value" && i(I, x, K, j, E, _);
      }
      "value" in b && i(I, "value", R.value, b.value, E);
    }
  }, D = (I, R, b, _, E, x, j, K, J) => {
    const W = R.el = I ? I.el : r(""), fe = R.anchor = I ? I.anchor : r("");
    let { patchFlag: ue, dynamicChildren: ge, slotScopeIds: he } = R;
    he && (K = K ? K.concat(he) : he), I == null ? (o(W, b, _), o(fe, b, _), B(
      // #10007
      // such fragment like `<></>` will be compiled into
      // a fragment which doesn't have a children.
      // In this case fallback to an empty array
      R.children || [],
      b,
      fe,
      E,
      x,
      j,
      K,
      J
    )) : ue > 0 && ue & 64 && ge && // #2715 the previous fragment could've been a BAILed one as a result
    // of renderSlot() with no valid children
    I.dynamicChildren ? (X(
      I.dynamicChildren,
      ge,
      b,
      E,
      x,
      j,
      K
    ), // #2080 if the stable fragment has a key, it's a <template v-for> that may
    //  get moved around. Make sure all root level vnodes inherit el.
    // #2134 or if it's a component root, it may also get moved around
    // as the component is being moved.
    (R.key != null || E && R === E.subTree) && Cr(
      I,
      R,
      !0
      /* shallow */
    )) : U(
      I,
      R,
      b,
      fe,
      E,
      x,
      j,
      K,
      J
    );
  }, G = (I, R, b, _, E, x, j, K, J) => {
    R.slotScopeIds = K, I == null ? R.shapeFlag & 512 ? E.ctx.activate(
      R,
      b,
      _,
      j,
      J
    ) : h(
      R,
      b,
      _,
      E,
      x,
      j,
      J
    ) : A(I, R, J);
  }, h = (I, R, b, _, E, x, j) => {
    const K = I.component = Tv(
      I,
      _,
      E
    );
    if (_d(I) && (K.ctx.renderer = Ee), Mv(K, !1, j), K.asyncDep) {
      if (E && E.registerDep(K, $, j), !I.el) {
        const J = K.subTree = se(qn);
        z(null, J, R, b);
      }
    } else
      $(
        K,
        I,
        R,
        b,
        E,
        x,
        j
      );
  }, A = (I, R, b) => {
    const _ = R.component = I.component;
    if (kv(I, R, b))
      if (_.asyncDep && !_.asyncResolved) {
        V(_, R, b);
        return;
      } else
        _.next = R, _.update();
    else
      R.el = I.el, _.vnode = R;
  }, $ = (I, R, b, _, E, x, j) => {
    const K = () => {
      if (I.isMounted) {
        let { next: ue, bu: ge, u: he, parent: Te, vnode: Be } = I;
        {
          const Mt = Hd(I);
          if (Mt) {
            ue && (ue.el = Be.el, V(I, ue, j)), Mt.asyncDep.then(() => {
              I.isUnmounted || K();
            });
            return;
          }
        }
        let Ae = ue, st;
        Jn(I, !1), ue ? (ue.el = Be.el, V(I, ue, j)) : ue = Be, ge && js(ge), (st = ue.props && ue.props.onVnodeBeforeUpdate) && sn(st, Te, ue, Be), Jn(I, !0);
        const mt = nu(I), Vt = I.subTree;
        I.subTree = mt, S(
          Vt,
          mt,
          // parent may have changed if it's in a teleport
          f(Vt.el),
          // anchor may have changed if it's in a fragment
          Me(Vt),
          I,
          E,
          x
        ), ue.el = mt.el, Ae === null && Ev(I, mt.el), he && At(he, E), (st = ue.props && ue.props.onVnodeUpdated) && At(
          () => sn(st, Te, ue, Be),
          E
        );
      } else {
        let ue;
        const { el: ge, props: he } = R, { bm: Te, m: Be, parent: Ae, root: st, type: mt } = I, Vt = $o(R);
        Jn(I, !1), Te && js(Te), !Vt && (ue = he && he.onVnodeBeforeMount) && sn(ue, Ae, R), Jn(I, !0);
        {
          st.ce && st.ce._injectChildStyle(mt);
          const Mt = I.subTree = nu(I);
          S(
            null,
            Mt,
            b,
            _,
            I,
            E,
            x
          ), R.el = Mt.el;
        }
        if (Be && At(Be, E), !Vt && (ue = he && he.onVnodeMounted)) {
          const Mt = R;
          At(
            () => sn(ue, Ae, Mt),
            E
          );
        }
        (R.shapeFlag & 256 || Ae && $o(Ae.vnode) && Ae.vnode.shapeFlag & 256) && I.a && At(I.a, E), I.isMounted = !0, R = b = _ = null;
      }
    };
    I.scope.on();
    const J = I.effect = new Kc(K);
    I.scope.off();
    const W = I.update = J.run.bind(J), fe = I.job = J.runIfDirty.bind(J);
    fe.i = I, fe.id = I.uid, J.scheduler = () => _r(fe), Jn(I, !0), W();
  }, V = (I, R, b) => {
    R.component = I;
    const _ = I.vnode.props;
    I.vnode = R, I.next = null, lv(I, R.props, _, b), cv(I, R.children, b), Kn(), Ga(I), Wn();
  }, U = (I, R, b, _, E, x, j, K, J = !1) => {
    const W = I && I.children, fe = I ? I.shapeFlag : 0, ue = R.children, { patchFlag: ge, shapeFlag: he } = R;
    if (ge > 0) {
      if (ge & 128) {
        ce(
          W,
          ue,
          b,
          _,
          E,
          x,
          j,
          K,
          J
        );
        return;
      } else if (ge & 256) {
        ee(
          W,
          ue,
          b,
          _,
          E,
          x,
          j,
          K,
          J
        );
        return;
      }
    }
    he & 8 ? (fe & 16 && Ie(W, E, x), ue !== W && d(b, ue)) : fe & 16 ? he & 16 ? ce(
      W,
      ue,
      b,
      _,
      E,
      x,
      j,
      K,
      J
    ) : Ie(W, E, x, !0) : (fe & 8 && d(b, ""), he & 16 && B(
      ue,
      b,
      _,
      E,
      x,
      j,
      K,
      J
    ));
  }, ee = (I, R, b, _, E, x, j, K, J) => {
    I = I || Eo, R = R || Eo;
    const W = I.length, fe = R.length, ue = Math.min(W, fe);
    let ge;
    for (ge = 0; ge < ue; ge++) {
      const he = R[ge] = J ? An(R[ge]) : an(R[ge]);
      S(
        I[ge],
        he,
        b,
        null,
        E,
        x,
        j,
        K,
        J
      );
    }
    W > fe ? Ie(
      I,
      E,
      x,
      !0,
      !1,
      ue
    ) : B(
      R,
      b,
      _,
      E,
      x,
      j,
      K,
      J,
      ue
    );
  }, ce = (I, R, b, _, E, x, j, K, J) => {
    let W = 0;
    const fe = R.length;
    let ue = I.length - 1, ge = fe - 1;
    for (; W <= ue && W <= ge; ) {
      const he = I[W], Te = R[W] = J ? An(R[W]) : an(R[W]);
      if (Uo(he, Te))
        S(
          he,
          Te,
          b,
          null,
          E,
          x,
          j,
          K,
          J
        );
      else
        break;
      W++;
    }
    for (; W <= ue && W <= ge; ) {
      const he = I[ue], Te = R[ge] = J ? An(R[ge]) : an(R[ge]);
      if (Uo(he, Te))
        S(
          he,
          Te,
          b,
          null,
          E,
          x,
          j,
          K,
          J
        );
      else
        break;
      ue--, ge--;
    }
    if (W > ue) {
      if (W <= ge) {
        const he = ge + 1, Te = he < fe ? R[he].el : _;
        for (; W <= ge; )
          S(
            null,
            R[W] = J ? An(R[W]) : an(R[W]),
            b,
            Te,
            E,
            x,
            j,
            K,
            J
          ), W++;
      }
    } else if (W > ge)
      for (; W <= ue; )
        re(I[W], E, x, !0), W++;
    else {
      const he = W, Te = W, Be = /* @__PURE__ */ new Map();
      for (W = Te; W <= ge; W++) {
        const yt = R[W] = J ? An(R[W]) : an(R[W]);
        yt.key != null && Be.set(yt.key, W);
      }
      let Ae, st = 0;
      const mt = ge - Te + 1;
      let Vt = !1, Mt = 0;
      const qe = new Array(mt);
      for (W = 0; W < mt; W++) qe[W] = 0;
      for (W = he; W <= ue; W++) {
        const yt = I[W];
        if (st >= mt) {
          re(yt, E, x, !0);
          continue;
        }
        let xt;
        if (yt.key != null)
          xt = Be.get(yt.key);
        else
          for (Ae = Te; Ae <= ge; Ae++)
            if (qe[Ae - Te] === 0 && Uo(yt, R[Ae])) {
              xt = Ae;
              break;
            }
        xt === void 0 ? re(yt, E, x, !0) : (qe[xt - Te] = W + 1, xt >= Mt ? Mt = xt : Vt = !0, S(
          yt,
          R[xt],
          b,
          null,
          E,
          x,
          j,
          K,
          J
        ), st++);
      }
      const ut = Vt ? hv(qe) : Eo;
      for (Ae = ut.length - 1, W = mt - 1; W >= 0; W--) {
        const yt = Te + W, xt = R[yt], ct = yt + 1 < fe ? R[yt + 1].el : _;
        qe[W] === 0 ? S(
          null,
          xt,
          b,
          ct,
          E,
          x,
          j,
          K,
          J
        ) : Vt && (Ae < 0 || W !== ut[Ae] ? ve(xt, b, ct, 2) : Ae--);
      }
    }
  }, ve = (I, R, b, _, E = null) => {
    const { el: x, type: j, transition: K, children: J, shapeFlag: W } = I;
    if (W & 6) {
      ve(I.component.subTree, R, b, _);
      return;
    }
    if (W & 128) {
      I.suspense.move(R, b, _);
      return;
    }
    if (W & 64) {
      j.move(I, R, b, Ee);
      return;
    }
    if (j === Se) {
      o(x, R, b);
      for (let ue = 0; ue < J.length; ue++)
        ve(J[ue], R, b, _);
      o(I.anchor, R, b);
      return;
    }
    if (j === Ys) {
      y(I, R, b);
      return;
    }
    if (_ !== 2 && W & 1 && K)
      if (_ === 0)
        K.beforeEnter(x), o(x, R, b), At(() => K.enter(x), E);
      else {
        const { leave: ue, delayLeave: ge, afterLeave: he } = K, Te = () => o(x, R, b), Be = () => {
          ue(x, () => {
            Te(), he && he();
          });
        };
        ge ? ge(x, Te, Be) : Be();
      }
    else
      o(x, R, b);
  }, re = (I, R, b, _ = !1, E = !1) => {
    const {
      type: x,
      props: j,
      ref: K,
      children: J,
      dynamicChildren: W,
      shapeFlag: fe,
      patchFlag: ue,
      dirs: ge,
      cacheIndex: he
    } = I;
    if (ue === -2 && (E = !1), K != null && ri(K, null, b, I, !0), he != null && (R.renderCache[he] = void 0), fe & 256) {
      R.ctx.deactivate(I);
      return;
    }
    const Te = fe & 1 && ge, Be = !$o(I);
    let Ae;
    if (Be && (Ae = j && j.onVnodeBeforeUnmount) && sn(Ae, R, I), fe & 6)
      de(I.component, b, _);
    else {
      if (fe & 128) {
        I.suspense.unmount(b, _);
        return;
      }
      Te && Zn(I, null, R, "beforeUnmount"), fe & 64 ? I.type.remove(
        I,
        R,
        b,
        Ee,
        _
      ) : W && // #5154
      // when v-once is used inside a block, setBlockTracking(-1) marks the
      // parent block with hasOnce: true
      // so that it doesn't take the fast path during unmount - otherwise
      // components nested in v-once are never unmounted.
      !W.hasOnce && // #1153: fast path should not be taken for non-stable (v-for) fragments
      (x !== Se || ue > 0 && ue & 64) ? Ie(
        W,
        R,
        b,
        !1,
        !0
      ) : (x === Se && ue & 384 || !E && fe & 16) && Ie(J, R, b), _ && be(I);
    }
    (Be && (Ae = j && j.onVnodeUnmounted) || Te) && At(() => {
      Ae && sn(Ae, R, I), Te && Zn(I, null, R, "unmounted");
    }, b);
  }, be = (I) => {
    const { type: R, el: b, anchor: _, transition: E } = I;
    if (R === Se) {
      pe(b, _);
      return;
    }
    if (R === Ys) {
      C(I);
      return;
    }
    const x = () => {
      s(b), E && !E.persisted && E.afterLeave && E.afterLeave();
    };
    if (I.shapeFlag & 1 && E && !E.persisted) {
      const { leave: j, delayLeave: K } = E, J = () => j(b, x);
      K ? K(I.el, x, J) : J();
    } else
      x();
  }, pe = (I, R) => {
    let b;
    for (; I !== R; )
      b = p(I), s(I), I = b;
    s(R);
  }, de = (I, R, b) => {
    const { bum: _, scope: E, job: x, subTree: j, um: K, m: J, a: W } = I;
    tu(J), tu(W), _ && js(_), E.stop(), x && (x.flags |= 8, re(j, I, R, b)), K && At(K, R), At(() => {
      I.isUnmounted = !0;
    }, R), R && R.pendingBranch && !R.isUnmounted && I.asyncDep && !I.asyncResolved && I.suspenseId === R.pendingId && (R.deps--, R.deps === 0 && R.resolve());
  }, Ie = (I, R, b, _ = !1, E = !1, x = 0) => {
    for (let j = x; j < I.length; j++)
      re(I[j], R, b, _, E);
  }, Me = (I) => {
    if (I.shapeFlag & 6)
      return Me(I.component.subTree);
    if (I.shapeFlag & 128)
      return I.suspense.next();
    const R = p(I.anchor || I.el), b = R && R[gd];
    return b ? p(b) : R;
  };
  let ne = !1;
  const xe = (I, R, b) => {
    I == null ? R._vnode && re(R._vnode, null, null, !0) : S(
      R._vnode || null,
      I,
      R,
      null,
      null,
      null,
      b
    ), R._vnode = I, ne || (ne = !0, Ga(), pd(), ne = !1);
  }, Ee = {
    p: S,
    um: re,
    m: ve,
    r: be,
    mt: h,
    mc: B,
    pc: U,
    pbc: X,
    n: Me,
    o: e
  };
  return {
    render: xe,
    hydrate: void 0,
    createApp: sv(xe)
  };
}
function tl({ type: e, props: t }, n) {
  return n === "svg" && e === "foreignObject" || n === "mathml" && e === "annotation-xml" && t && t.encoding && t.encoding.includes("html") ? void 0 : n;
}
function Jn({ effect: e, job: t }, n) {
  n ? (e.flags |= 32, t.flags |= 4) : (e.flags &= -33, t.flags &= -5);
}
function pv(e, t) {
  return (!e || e && !e.pendingBranch) && t && !t.persisted;
}
function Cr(e, t, n = !1) {
  const o = e.children, s = t.children;
  if (Ne(o) && Ne(s))
    for (let i = 0; i < o.length; i++) {
      const l = o[i];
      let r = s[i];
      r.shapeFlag & 1 && !r.dynamicChildren && ((r.patchFlag <= 0 || r.patchFlag === 32) && (r = s[i] = An(s[i]), r.el = l.el), !n && r.patchFlag !== -2 && Cr(l, r)), r.type === Pi && (r.el = l.el);
    }
}
function hv(e) {
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
function Hd(e) {
  const t = e.subTree.component;
  if (t)
    return t.asyncDep && !t.asyncResolved ? t : Hd(t);
}
function tu(e) {
  if (e)
    for (let t = 0; t < e.length; t++)
      e[t].flags |= 8;
}
const vv = Symbol.for("v-scx"), gv = () => dn(vv);
function ze(e, t, n) {
  return Ud(e, t, n);
}
function Ud(e, t, n = Ze) {
  const { immediate: o, deep: s, flush: i, once: l } = n, r = Tt({}, n), u = t && o || !t && i !== "post";
  let c;
  if (ds) {
    if (i === "sync") {
      const v = gv();
      c = v.__watcherHandles || (v.__watcherHandles = []);
    } else if (!u) {
      const v = () => {
      };
      return v.stop = cn, v.resume = cn, v.pause = cn, v;
    }
  }
  const d = Ct;
  r.call = (v, w, S) => hn(v, d, w, S);
  let f = !1;
  i === "post" ? r.scheduler = (v) => {
    At(v, d && d.suspense);
  } : i !== "sync" && (f = !0, r.scheduler = (v, w) => {
    w ? v() : _r(v);
  }), r.augmentJob = (v) => {
    t && (v.flags |= 4), f && (v.flags |= 2, d && (v.id = d.uid, v.i = d));
  };
  const p = Oh(e, t, r);
  return ds && (c ? c.push(p) : u && p()), p;
}
function mv(e, t, n) {
  const o = this.proxy, s = nt(e) ? e.includes(".") ? jd(o, e) : () => o[e] : e.bind(o, o);
  let i;
  Re(t) ? i = t : (i = t.handler, n = t);
  const l = Es(this), r = Ud(s, i.bind(o), n);
  return l(), r;
}
function jd(e, t) {
  const n = t.split(".");
  return () => {
    let o = e;
    for (let s = 0; s < n.length && o; s++)
      o = o[n[s]];
    return o;
  };
}
const yv = (e, t) => t === "modelValue" || t === "model-value" ? e.modelModifiers : e[`${t}Modifiers`] || e[`${Xt(t)}Modifiers`] || e[`${Xn(t)}Modifiers`];
function bv(e, t, ...n) {
  if (e.isUnmounted) return;
  const o = e.vnode.props || Ze;
  let s = n;
  const i = t.startsWith("update:"), l = i && yv(o, t.slice(7));
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
function Gd(e, t, n = !1) {
  const o = t.emitsCache, s = o.get(e);
  if (s !== void 0)
    return s;
  const i = e.emits;
  let l = {}, r = !1;
  if (!Re(e)) {
    const u = (c) => {
      const d = Gd(c, t, !0);
      d && (r = !0, Tt(l, d));
    };
    !n && t.mixins.length && t.mixins.forEach(u), e.extends && u(e.extends), e.mixins && e.mixins.forEach(u);
  }
  return !i && !r ? (Je(e) && o.set(e, null), null) : (Ne(i) ? i.forEach((u) => l[u] = null) : Tt(l, i), Je(e) && o.set(e, l), l);
}
function Mi(e, t) {
  return !e || !ki(t) ? !1 : (t = t.slice(2).replace(/Once$/, ""), Ke(e, t[0].toLowerCase() + t.slice(1)) || Ke(e, Xn(t)) || Ke(e, t));
}
function nu(e) {
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
    setupState: v,
    ctx: w,
    inheritAttrs: S
  } = e, P = li(e);
  let z, L;
  try {
    if (n.shapeFlag & 4) {
      const C = s || o, O = C;
      z = an(
        c.call(
          O,
          C,
          d,
          f,
          v,
          p,
          w
        )
      ), L = r;
    } else {
      const C = t;
      z = an(
        C.length > 1 ? C(
          f,
          { attrs: r, slots: l, emit: u }
        ) : C(
          f,
          null
        )
      ), L = t.props ? r : _v(r);
    }
  } catch (C) {
    os.length = 0, Ii(C, e, 1), z = se(qn);
  }
  let y = z;
  if (L && S !== !1) {
    const C = Object.keys(L), { shapeFlag: O } = y;
    C.length && O & 7 && (i && C.some(ar) && (L = wv(
      L,
      i
    )), y = Oo(y, L, !1, !0));
  }
  return n.dirs && (y = Oo(y, null, !1, !0), y.dirs = y.dirs ? y.dirs.concat(n.dirs) : n.dirs), n.transition && wr(y, n.transition), z = y, li(P), z;
}
const _v = (e) => {
  let t;
  for (const n in e)
    (n === "class" || n === "style" || ki(n)) && ((t || (t = {}))[n] = e[n]);
  return t;
}, wv = (e, t) => {
  const n = {};
  for (const o in e)
    (!ar(o) || !(o.slice(9) in t)) && (n[o] = e[o]);
  return n;
};
function kv(e, t, n) {
  const { props: o, children: s, component: i } = e, { props: l, children: r, patchFlag: u } = t, c = i.emitsOptions;
  if (t.dirs || t.transition)
    return !0;
  if (n && u >= 0) {
    if (u & 1024)
      return !0;
    if (u & 16)
      return o ? ou(o, l, c) : !!l;
    if (u & 8) {
      const d = t.dynamicProps;
      for (let f = 0; f < d.length; f++) {
        const p = d[f];
        if (l[p] !== o[p] && !Mi(c, p))
          return !0;
      }
    }
  } else
    return (s || r) && (!r || !r.$stable) ? !0 : o === l ? !1 : o ? l ? ou(o, l, c) : !0 : !!l;
  return !1;
}
function ou(e, t, n) {
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
function Ev({ vnode: e, parent: t }, n) {
  for (; t; ) {
    const o = t.subTree;
    if (o.suspense && o.suspense.activeBranch === e && (o.el = e.el), o === e)
      (e = t.vnode).el = n, t = t.parent;
    else
      break;
  }
}
const qd = (e) => e.__isSuspense;
function Cv(e, t) {
  t && t.pendingBranch ? Ne(e) ? t.effects.push(...e) : t.effects.push(e) : Rh(e);
}
const Se = Symbol.for("v-fgt"), Pi = Symbol.for("v-txt"), qn = Symbol.for("v-cmt"), Ys = Symbol.for("v-stc"), os = [];
let Lt = null;
function g(e = !1) {
  os.push(Lt = e ? null : []);
}
function Sv() {
  os.pop(), Lt = os[os.length - 1] || null;
}
let Po = 1;
function su(e, t = !1) {
  Po += e, e < 0 && Lt && t && (Lt.hasOnce = !0);
}
function Yd(e) {
  return e.dynamicChildren = Po > 0 ? Lt || Eo : null, Sv(), Po > 0 && Lt && Lt.push(e), e;
}
function k(e, t, n, o, s, i) {
  return Yd(
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
  return Yd(
    se(
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
const Xd = ({ key: e }) => e ?? null, Xs = ({
  ref: e,
  ref_key: t,
  ref_for: n
}) => (typeof e == "number" && (e = "" + e), e != null ? nt(e) || at(e) || Re(e) ? { i: kt, r: e, k: t, f: !!n } : e : null);
function a(e, t = null, n = null, o = 0, s = null, i = e === Se ? 0 : 1, l = !1, r = !1) {
  const u = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e,
    props: t,
    key: t && Xd(t),
    ref: t && Xs(t),
    scopeId: vd,
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
const se = xv;
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
  if (Dv(e) && (e = e.__vccOpts), t) {
    t = Ks(t);
    let { class: r, style: u } = t;
    r && !nt(r) && (t.class = ye(r)), Je(u) && (br(u) && !Ne(u) && (u = Tt({}, u)), t.style = et(u));
  }
  const l = nt(e) ? 1 : qd(e) ? 128 : Lh(e) ? 64 : Je(e) ? 4 : Re(e) ? 2 : 0;
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
  return e ? br(e) || Dd(e) ? Tt({}, e) : e : null;
}
function Oo(e, t, n = !1, o = !1) {
  const { props: s, ref: i, patchFlag: l, children: r, transition: u } = e, c = t ? xr(s || {}, t) : s, d = {
    __v_isVNode: !0,
    __v_skip: !0,
    type: e.type,
    props: c,
    key: c && Xd(c),
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
    patchFlag: t && e.type !== Se ? l === -1 ? 16 : l | 16 : l,
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
  return u && o && wr(
    d,
    u.clone(d)
  ), d;
}
function _e(e = " ", t = 0) {
  return se(Pi, null, e, t);
}
function $v(e, t) {
  const n = se(Ys, null, e);
  return n.staticCount = t, n;
}
function oe(e = "", t = !1) {
  return t ? (g(), ht(qn, null, e)) : se(qn, null, e);
}
function an(e) {
  return e == null || typeof e == "boolean" ? se(qn) : Ne(e) ? se(
    Se,
    null,
    // #3666, avoid reference pollution when reusing vnode
    e.slice()
  ) : cs(e) ? An(e) : se(Pi, null, String(e));
}
function An(e) {
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
      !s && !Dd(t) ? t._ctx = kt : s === 3 && kt && (kt.slots._ === 1 ? t._ = 1 : (t._ = 2, e.patchFlag |= 1024));
    }
  else Re(t) ? (t = { default: t, _ctx: kt }, n = 32) : (t = String(t), o & 64 ? (n = 16, t = [_e(t)]) : n = 8);
  e.children = t, e.shapeFlag |= n;
}
function xr(...e) {
  const t = {};
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    for (const s in o)
      if (s === "class")
        t.class !== o.class && (t.class = ye([t.class, o.class]));
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
const Iv = Pd();
let Nv = 0;
function Tv(e, t, n) {
  const o = e.type, s = (t ? t.appContext : e.appContext) || Iv, i = {
    uid: Nv++,
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
    scope: new Yc(
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
    propsOptions: Ld(o, s),
    emitsOptions: Gd(o, s),
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
  return i.ctx = { _: i }, i.root = t ? t.root : i, i.emit = bv.bind(null, i), e.ce && e.ce(i), i;
}
let Ct = null;
const zo = () => Ct || kt;
let ui, Al;
{
  const e = Si(), t = (n, o) => {
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
}, iu = () => {
  Ct && Ct.scope.off(), ui(null);
};
function Kd(e) {
  return e.vnode.shapeFlag & 4;
}
let ds = !1;
function Mv(e, t = !1, n = !1) {
  t && Al(t);
  const { props: o, children: s } = e.vnode, i = Kd(e);
  iv(e, o, i, t), uv(e, s, n);
  const l = i ? Pv(e, t) : void 0;
  return t && Al(!1), l;
}
function Pv(e, t) {
  const n = e.type;
  e.accessCache = /* @__PURE__ */ Object.create(null), e.proxy = new Proxy(e.ctx, Kh);
  const { setup: o } = n;
  if (o) {
    Kn();
    const s = e.setupContext = o.length > 1 ? Zd(e) : null, i = Es(e), l = ks(
      o,
      e,
      0,
      [
        e.props,
        s
      ]
    ), r = Fc(l);
    if (Wn(), i(), (r || e.sp) && !$o(e) && bd(e), r) {
      if (l.then(iu, iu), t)
        return l.then((u) => {
          lu(e, u);
        }).catch((u) => {
          Ii(u, e, 0);
        });
      e.asyncDep = l;
    } else
      lu(e, l);
  } else
    Wd(e);
}
function lu(e, t, n) {
  Re(t) ? e.type.__ssrInlineRender ? e.ssrRender = t : e.render = t : Je(t) && (e.setupState = ud(t)), Wd(e);
}
function Wd(e, t, n) {
  const o = e.type;
  e.render || (e.render = o.render || cn);
  {
    const s = Es(e);
    Kn();
    try {
      Jh(e);
    } finally {
      Wn(), s();
    }
  }
}
const Ov = {
  get(e, t) {
    return It(e, "get", ""), e[t];
  }
};
function Zd(e) {
  const t = (n) => {
    e.exposed = n || {};
  };
  return {
    attrs: new Proxy(e.attrs, Ov),
    slots: e.slots,
    emit: e.emit,
    expose: t
  };
}
function Oi(e) {
  return e.exposed ? e.exposeProxy || (e.exposeProxy = new Proxy(ud(lo(e.exposed)), {
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
function Av(e, t = !0) {
  return Re(e) ? e.displayName || e.name : e.name || t && e.__name;
}
function Dv(e) {
  return Re(e) && "__vccOpts" in e;
}
const ae = (e, t) => Mh(e, t, ds);
function Xe(e, t, n) {
  const o = arguments.length;
  return o === 2 ? Je(t) && !Ne(t) ? cs(t) ? se(e, null, [t]) : se(e, t) : se(e, null, t) : (o > 3 ? n = Array.prototype.slice.call(arguments, 2) : o === 3 && cs(n) && (n = [n]), se(e, t, n));
}
function Rv(e, t) {
  const n = e.memo;
  if (n.length != t.length)
    return !1;
  for (let o = 0; o < n.length; o++)
    if (Sn(n[o], t[o]))
      return !1;
  return Po > 0 && Lt && Lt.push(e), !0;
}
const Lv = "3.5.13";
/**
* @vue/runtime-dom v3.5.13
* (c) 2018-present Yuxi (Evan) You and Vue contributors
* @license MIT
**/
let Dl;
const ru = typeof window < "u" && window.trustedTypes;
if (ru)
  try {
    Dl = /* @__PURE__ */ ru.createPolicy("vue", {
      createHTML: (e) => e
    });
  } catch {
  }
const Jd = Dl ? (e) => Dl.createHTML(e) : (e) => e, Vv = "http://www.w3.org/2000/svg", zv = "http://www.w3.org/1998/Math/MathML", bn = typeof document < "u" ? document : null, au = bn && /* @__PURE__ */ bn.createElement("template"), Fv = {
  insert: (e, t, n) => {
    t.insertBefore(e, n || null);
  },
  remove: (e) => {
    const t = e.parentNode;
    t && t.removeChild(e);
  },
  createElement: (e, t, n, o) => {
    const s = t === "svg" ? bn.createElementNS(Vv, e) : t === "mathml" ? bn.createElementNS(zv, e) : n ? bn.createElement(e, { is: n }) : bn.createElement(e);
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
      au.innerHTML = Jd(
        o === "svg" ? `<svg>${e}</svg>` : o === "mathml" ? `<math>${e}</math>` : e
      );
      const r = au.content;
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
}, Bv = Symbol("_vtc");
function Hv(e, t, n) {
  const o = e[Bv];
  o && (t = (t ? [t, ...o] : [...o]).join(" ")), t == null ? e.removeAttribute("class") : n ? e.setAttribute("class", t) : e.className = t;
}
const uu = Symbol("_vod"), Uv = Symbol("_vsh"), jv = Symbol(""), Gv = /(^|;)\s*display\s*:/;
function qv(e, t, n) {
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
      const l = o[jv];
      l && (n += ";" + l), o.cssText = n, i = Gv.test(n);
    }
  } else t && e.removeAttribute("style");
  uu in e && (e[uu] = i ? o.display : "", e[Uv] && (o.display = "none"));
}
const cu = /\s*!important$/;
function Ws(e, t, n) {
  if (Ne(n))
    n.forEach((o) => Ws(e, t, o));
  else if (n == null && (n = ""), t.startsWith("--"))
    e.setProperty(t, n);
  else {
    const o = Yv(e, t);
    cu.test(n) ? e.setProperty(
      Xn(o),
      n.replace(cu, ""),
      "important"
    ) : e[o] = n;
  }
}
const du = ["Webkit", "Moz", "ms"], nl = {};
function Yv(e, t) {
  const n = nl[t];
  if (n)
    return n;
  let o = Xt(t);
  if (o !== "filter" && o in e)
    return nl[t] = o;
  o = Ci(o);
  for (let s = 0; s < du.length; s++) {
    const i = du[s] + o;
    if (i in e)
      return nl[t] = i;
  }
  return t;
}
const fu = "http://www.w3.org/1999/xlink";
function pu(e, t, n, o, s, i = eh(t)) {
  o && t.startsWith("xlink:") ? n == null ? e.removeAttributeNS(fu, t.slice(6, t.length)) : e.setAttributeNS(fu, t, n) : n == null || i && !jc(n) ? e.removeAttribute(t) : e.setAttribute(
    t,
    i ? "" : en(n) ? String(n) : n
  );
}
function hu(e, t, n, o, s) {
  if (t === "innerHTML" || t === "textContent") {
    n != null && (e[t] = t === "innerHTML" ? Jd(n) : n);
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
    r === "boolean" ? n = jc(n) : n == null && r === "string" ? (n = "", l = !0) : r === "number" && (n = 0, l = !0);
  }
  try {
    e[t] = n;
  } catch {
  }
  l && e.removeAttribute(s || t);
}
function Ln(e, t, n, o) {
  e.addEventListener(t, n, o);
}
function Xv(e, t, n, o) {
  e.removeEventListener(t, n, o);
}
const vu = Symbol("_vei");
function Kv(e, t, n, o, s = null) {
  const i = e[vu] || (e[vu] = {}), l = i[t];
  if (o && l)
    l.value = o;
  else {
    const [r, u] = Wv(t);
    if (o) {
      const c = i[t] = Qv(
        o,
        s
      );
      Ln(e, r, c, u);
    } else l && (Xv(e, r, l, u), i[t] = void 0);
  }
}
const gu = /(?:Once|Passive|Capture)$/;
function Wv(e) {
  let t;
  if (gu.test(e)) {
    t = {};
    let o;
    for (; o = e.match(gu); )
      e = e.slice(0, e.length - o[0].length), t[o[0].toLowerCase()] = !0;
  }
  return [e[2] === ":" ? e.slice(3) : Xn(e.slice(2)), t];
}
let ol = 0;
const Zv = /* @__PURE__ */ Promise.resolve(), Jv = () => ol || (Zv.then(() => ol = 0), ol = Date.now());
function Qv(e, t) {
  const n = (o) => {
    if (!o._vts)
      o._vts = Date.now();
    else if (o._vts <= n.attached)
      return;
    hn(
      eg(o, n.value),
      t,
      5,
      [o]
    );
  };
  return n.value = e, n.attached = Jv(), n;
}
function eg(e, t) {
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
const mu = (e) => e.charCodeAt(0) === 111 && e.charCodeAt(1) === 110 && // lowercase letter
e.charCodeAt(2) > 96 && e.charCodeAt(2) < 123, tg = (e, t, n, o, s, i) => {
  const l = s === "svg";
  t === "class" ? Hv(e, o, l) : t === "style" ? qv(e, n, o) : ki(t) ? ar(t) || Kv(e, t, n, o, i) : (t[0] === "." ? (t = t.slice(1), !0) : t[0] === "^" ? (t = t.slice(1), !1) : ng(e, t, o, l)) ? (hu(e, t, o), !e.tagName.includes("-") && (t === "value" || t === "checked" || t === "selected") && pu(e, t, o, l, i, t !== "value")) : /* #11081 force set props for possible async custom element */ e._isVueCE && (/[A-Z]/.test(t) || !nt(o)) ? hu(e, Xt(t), o, i, t) : (t === "true-value" ? e._trueValue = o : t === "false-value" && (e._falseValue = o), pu(e, t, o, l));
};
function ng(e, t, n, o) {
  if (o)
    return !!(t === "innerHTML" || t === "textContent" || t in e && mu(t) && Re(n));
  if (t === "spellcheck" || t === "draggable" || t === "translate" || t === "form" || t === "list" && e.tagName === "INPUT" || t === "type" && e.tagName === "TEXTAREA")
    return !1;
  if (t === "width" || t === "height") {
    const s = e.tagName;
    if (s === "IMG" || s === "VIDEO" || s === "CANVAS" || s === "SOURCE")
      return !1;
  }
  return mu(t) && nt(n) ? !1 : t in e;
}
const Ao = (e) => {
  const t = e.props["onUpdate:modelValue"] || !1;
  return Ne(t) ? (n) => js(t, n) : t;
};
function og(e) {
  e.target.composing = !0;
}
function yu(e) {
  const t = e.target;
  t.composing && (t.composing = !1, t.dispatchEvent(new Event("input")));
}
const xn = Symbol("_assign"), Ge = {
  created(e, { modifiers: { lazy: t, trim: n, number: o } }, s) {
    e[xn] = Ao(s);
    const i = o || s.props && s.props.type === "number";
    Ln(e, t ? "change" : "input", (l) => {
      if (l.target.composing) return;
      let r = e.value;
      n && (r = r.trim()), i && (r = ni(r)), e[xn](r);
    }), n && Ln(e, "change", () => {
      e.value = e.value.trim();
    }), t || (Ln(e, "compositionstart", og), Ln(e, "compositionend", yu), Ln(e, "change", yu));
  },
  // set value on mounted so it's after min/max for type="range"
  mounted(e, { value: t }) {
    e.value = t ?? "";
  },
  beforeUpdate(e, { value: t, oldValue: n, modifiers: { lazy: o, trim: s, number: i } }, l) {
    if (e[xn] = Ao(l), e.composing) return;
    const r = (i || e.type === "number") && !/^0\d/.test(e.value) ? ni(e.value) : e.value, u = t ?? "";
    r !== u && (document.activeElement === e && e.type !== "range" && (o && t === n || s && e.value.trim() === u) || (e.value = u));
  }
}, Rl = {
  // #4096 array checkboxes need to be deep traversed
  deep: !0,
  created(e, t, n) {
    e[xn] = Ao(n), Ln(e, "change", () => {
      const o = e._modelValue, s = fs(e), i = e.checked, l = e[xn];
      if (Ne(o)) {
        const r = dr(o, s), u = r !== -1;
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
        l(Qd(e, i));
    });
  },
  // set initial checked on mount to wait for true-value/false-value
  mounted: bu,
  beforeUpdate(e, t, n) {
    e[xn] = Ao(n), bu(e, t, n);
  }
};
function bu(e, { value: t, oldValue: n }, o) {
  e._modelValue = t;
  let s;
  if (Ne(t))
    s = dr(t, o.props.value) > -1;
  else if (Vo(t))
    s = t.has(o.props.value);
  else {
    if (t === n) return;
    s = ws(t, Qd(e, !0));
  }
  e.checked !== s && (e.checked = s);
}
const fn = {
  // <select multiple> value need to be deep traversed
  deep: !0,
  created(e, { value: t, modifiers: { number: n } }, o) {
    const s = Vo(t);
    Ln(e, "change", () => {
      const i = Array.prototype.filter.call(e.options, (l) => l.selected).map(
        (l) => n ? ni(fs(l)) : fs(l)
      );
      e[xn](
        e.multiple ? s ? new Set(i) : i : i[0]
      ), e._assigning = !0, _t(() => {
        e._assigning = !1;
      });
    }), e[xn] = Ao(o);
  },
  // set value in mounted & updated because <select> relies on its children
  // <option>s.
  mounted(e, { value: t }) {
    _u(e, t);
  },
  beforeUpdate(e, t, n) {
    e[xn] = Ao(n);
  },
  updated(e, { value: t }) {
    e._assigning || _u(e, t);
  }
};
function _u(e, t) {
  const n = e.multiple, o = Ne(t);
  if (!(n && !o && !Vo(t))) {
    for (let s = 0, i = e.options.length; s < i; s++) {
      const l = e.options[s], r = fs(l);
      if (n)
        if (o) {
          const u = typeof r;
          u === "string" || u === "number" ? l.selected = t.some((c) => String(c) === String(r)) : l.selected = dr(t, r) > -1;
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
function Qd(e, t) {
  const n = t ? "_trueValue" : "_falseValue";
  return n in e ? e[n] : t;
}
const sg = ["ctrl", "shift", "alt", "meta"], ig = {
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
  exact: (e, t) => sg.some((n) => e[`${n}Key`] && !t.includes(n))
}, $t = (e, t) => {
  const n = e._withMods || (e._withMods = {}), o = t.join(".");
  return n[o] || (n[o] = (s, ...i) => {
    for (let l = 0; l < t.length; l++) {
      const r = ig[t[l]];
      if (r && r(s, t)) return;
    }
    return e(s, ...i);
  });
}, lg = {
  esc: "escape",
  space: " ",
  up: "arrow-up",
  left: "arrow-left",
  right: "arrow-right",
  down: "arrow-down",
  delete: "backspace"
}, wu = (e, t) => {
  const n = e._withKeys || (e._withKeys = {}), o = t.join(".");
  return n[o] || (n[o] = (s) => {
    if (!("key" in s))
      return;
    const i = Xn(s.key);
    if (t.some(
      (l) => l === i || lg[l] === i
    ))
      return e(s);
  });
}, rg = /* @__PURE__ */ Tt({ patchProp: tg }, Fv);
let ku;
function ag() {
  return ku || (ku = dv(rg));
}
const Cs = (...e) => {
  const t = ag().createApp(...e), { mount: n } = t;
  return t.mount = (o) => {
    const s = cg(o);
    if (!s) return;
    const i = t._component;
    !Re(i) && !i.render && !i.template && (i.template = s.innerHTML), s.nodeType === 1 && (s.textContent = "");
    const l = n(s, !1, ug(s));
    return s instanceof Element && (s.removeAttribute("v-cloak"), s.setAttribute("data-v-app", "")), l;
  }, t;
};
function ug(e) {
  if (e instanceof SVGElement)
    return "svg";
  if (typeof MathMLElement == "function" && e instanceof MathMLElement)
    return "mathml";
}
function cg(e) {
  return nt(e) ? document.querySelector(e) : e;
}
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const dg = (e) => e.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
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
const fg = ({ size: e, strokeWidth: t = 2, absoluteStrokeWidth: n, color: o, iconNode: s, name: i, class: l, ...r }, { slots: u }) => Xe(
  "svg",
  {
    ...Os,
    width: e || Os.width,
    height: e || Os.height,
    stroke: o || Os.stroke,
    "stroke-width": n ? Number(t) * 24 / Number(e) : t,
    class: ["lucide", `lucide-${dg(i ?? "icon")}`],
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
  fg,
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
const pg = Fe("ArchiveIcon", [
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
const hg = Fe("BotIcon", [
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
const vg = Fe("BrainIcon", [
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
const gg = Fe("ChartColumnIcon", [
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
const mg = Fe("ChevronDownIcon", [
  ["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const yg = Fe("Clock3Icon", [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16.5 12", key: "1aq6pp" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const bg = Fe("DatabaseIcon", [
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
const ef = Fe("EyeIcon", [
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
const _g = Fe("LayersIcon", [
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
const wg = Fe("Maximize2Icon", [
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
const kg = Fe("MicVocalIcon", [
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
const Eg = Fe("MinusIcon", [["path", { d: "M5 12h14", key: "1ays0h" }]]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Vl = Fe("PenLineIcon", [
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
const $r = Fe("PlayIcon", [
  ["polygon", { points: "6 3 20 12 6 21 6 3", key: "1oa8hb" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Cg = Fe("PlugIcon", [
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
const Sg = Fe("PuzzleIcon", [
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
const nf = Fe("RotateCcwIcon", [
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
const zl = Fe("SaveIcon", [
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
const $g = Fe("ScanFaceIcon", [
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
const Ig = Fe("ScanSearchIcon", [
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
const Ng = Fe("SendIcon", [
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
const Gn = Fe("Trash2Icon", [
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
const Tg = Fe("Undo2Icon", [
  ["path", { d: "M9 14 4 9l5-5", key: "102s5s" }],
  ["path", { d: "M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11", key: "f3b9sd" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Fl = Fe("UploadIcon", [
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
const Bl = Fe("UserRoundIcon", [
  ["circle", { cx: "12", cy: "8", r: "5", key: "1hypcn" }],
  ["path", { d: "M20 21a8 8 0 0 0-16 0", key: "rfgkzh" }]
]);
/**
 * @license lucide-vue-next v0.468.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const Mg = Fe("WrenchIcon", [
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
]), Pg = /* @__PURE__ */ new Set(["converting", "preview_ready", "indexing"]);
function Og(e) {
  let t = 0, n = 0, o = 0;
  for (const s of e) {
    const i = String(s.status || "");
    i === "indexed" ? t += 1 : i.endsWith("_failed") || ["failed", "error"].includes(i) ? o += 1 : Pg.has(i) && i !== "preview_ready" && (n += 1);
  }
  return { total: e.length, indexed: t, processing: n, failed: o, attention: n + o };
}
function Ag(e) {
  if (Array.isArray(e)) return e;
  if (!e || typeof e != "object") return [];
  const t = e;
  for (const n of ["items", "evaluations", "results"])
    if (Array.isArray(t[n])) return t[n];
  return [e];
}
function Dg(e) {
  const t = Number(e);
  return Number.isFinite(t) ? `${Math.round(t <= 1 ? t * 100 : t)}%` : "—";
}
function Rg(e) {
  const t = Number(e == null ? void 0 : e.total_documents), n = Number((e == null ? void 0 : e.indexed_count) ?? (e == null ? void 0 : e.indexed_documents)), o = Number((e == null ? void 0 : e.failed_count) ?? (e == null ? void 0 : e.failed_documents)), s = Number((e == null ? void 0 : e.in_progress_count) ?? (e == null ? void 0 : e.processing_documents)), i = String((e == null ? void 0 : e.status) || (e == null ? void 0 : e.state) || "");
  return ["ready", "completed", "complete", "healthy"].includes(i) ? "处理完成" : ["running", "processing", "pending", "indexing"].includes(i) ? "处理中" : ["failed", "error"].includes(i) || Number.isFinite(o) && o > 0 ? "需要处理" : Number.isFinite(s) && s > 0 ? "处理中" : Number.isFinite(t) && t > 0 && Number.isFinite(n) && n >= t ? "处理完成" : Number.isFinite(t) && t === 0 ? "暂无资料" : e ? "已生成" : "暂无报告";
}
function Lg(e) {
  return { completed: "已完成", complete: "已完成", running: "进行中", pending: "等待中", failed: "失败", error: "失败" }[e || ""] || e || "已保存";
}
const Vg = {
  converting: "正在整理",
  conversion_failed: "整理失败",
  preview_ready: "待入库",
  indexing: "正在入库",
  indexed: "已入库",
  index_failed: "整理未完成",
  failed: "整理未完成",
  error: "整理未完成"
};
function zg(e) {
  return Vg[String(e || "")] || "处理中";
}
function Fg(e) {
  return ["index_failed", "preview_ready"].includes(String(e || ""));
}
function Bg(e) {
  const t = String(e || "");
  return t === "indexed" ? "ok" : t.endsWith("_failed") || t === "failed" || t === "error" ? "failed" : ["converting", "indexing", "preview_ready"].includes(t) ? "pending" : "";
}
function bt(e) {
  return JSON.parse(JSON.stringify(e));
}
class Ir extends Error {
  constructor(n, o) {
    super(n);
    rt(this, "status");
    this.name = "ApiError", this.status = o;
  }
}
async function lt(e, t) {
  const n = await fetch(e, t), o = await n.json().catch(() => null);
  if (!n.ok) throw new Ir((o == null ? void 0 : o.detail) || `请求失败 (${n.status})`, n.status);
  return o;
}
async function of(e, t) {
  try {
    return await lt(e, t);
  } catch (n) {
    if (n instanceof Ir && n.status === 404) return null;
    throw n;
  }
}
function sl() {
  return lt("/api/personas", { cache: "no-store" });
}
async function sf(e) {
  const t = await lt(`/api/personas/${encodeURIComponent(e)}/documents`, { cache: "no-store" });
  return Array.isArray(t) ? t : t && typeof t == "object" && Array.isArray(t.items) ? t.items : [];
}
async function lf() {
  return (await lt("/api/live2d/models", { cache: "no-store" })).models;
}
async function Hg() {
  await lt("/api/live2d/model-directory", {
    method: "POST",
    headers: { "X-CHARACTOID-Request": "web" }
  });
}
async function Eu(e) {
  const [t, n, o, s, i, l] = await Promise.all([
    lt(`/api/personas/${encodeURIComponent(e.id)}/capabilities`, { cache: "no-store" }),
    lt(`/api/personas/${encodeURIComponent(e.id)}/mcp-grants`, { cache: "no-store" }),
    sf(e.id),
    lt("/api/mcp/servers", { cache: "no-store" }).catch(() => []),
    lf().then((u) => ({ models: u })).catch(() => ({ models: [] })),
    lt("/api/voice-assets", { cache: "no-store" }).catch(() => ({ items: [] }))
  ]), r = new Map(s.map((u) => [u.name, u.status]));
  return {
    persona: bt(e),
    documents: o,
    capabilities: t,
    grants: { servers: n.servers.map((u) => ({ ...u, status: r.get(u.name) || { status: u.enabled ? "unknown" : "disabled" } })) },
    resources: { live2dModels: i.models, voiceAssets: l.items.filter((u) => u.status === "ready" && (!u.engine || u.engine === "gpt_sovits")) }
  };
}
async function Ug(e) {
  await lt(`/api/personas/${encodeURIComponent(e.id)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: e.name, profile: e.profile || {} })
  });
}
async function jg(e, t) {
  await lt(`/api/personas/${encodeURIComponent(e)}/capabilities`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ overrides: t })
  });
}
async function Gg(e, t) {
  const n = t.filter((o) => o.authorized && !o.global).map((o) => o.name);
  await lt(`/api/personas/${encodeURIComponent(e)}/mcp-grants`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ server_names: n })
  });
}
async function qg(e) {
  await lt(`/api/personas/${encodeURIComponent(e)}`, { method: "DELETE" });
}
async function Yg(e, t, n) {
  if (!e.knowledge_space_id) throw new Error("角色知识空间不可用");
  const o = new FormData();
  t.forEach((i) => o.append("files", i)), n.trim() && o.append("files", new File([n.trim()], `text-${Date.now()}.txt`, { type: "text/plain;charset=utf-8" }));
  const s = await lt(`/api/knowledge-spaces/${encodeURIComponent(e.knowledge_space_id)}/documents/upload`, { method: "POST", body: o });
  await Promise.all(s.map((i) => lt(`/api/documents/${encodeURIComponent(i.id)}/confirm`, { method: "POST" })));
}
async function Xg(e) {
  var n;
  const t = await fetch(`/api/documents/${encodeURIComponent(e)}`, { method: "DELETE" });
  if (!t.ok) throw new Error(((n = await t.json().catch(() => null)) == null ? void 0 : n.detail) || `删除失败 (${t.status})`);
}
async function Kg(e) {
  return lt(`/api/documents/${encodeURIComponent(e)}`, { cache: "no-store" });
}
async function Cu(e, t) {
  const n = t === "preview_ready" ? "confirm" : "retry-index";
  await lt(`/api/documents/${encodeURIComponent(e)}/${n}`, { method: "POST" });
}
async function Wg(e, t) {
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
function Zg(e) {
  return lt(`/api/personas/${encodeURIComponent(e)}/versions`, { cache: "no-store" });
}
function Jg(e, t) {
  return lt(`/api/personas/${encodeURIComponent(e)}/versions/${encodeURIComponent(t)}`, { cache: "no-store" });
}
function Qg(e, t = {}) {
  return lt(`/api/personas/${encodeURIComponent(e)}/versions`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ label: t.label || "", note: t.note || "" })
  });
}
async function em(e, t) {
  return (await lt(
    `/api/personas/${encodeURIComponent(e)}/versions/${encodeURIComponent(t)}/publish`,
    { method: "POST" }
  )).version;
}
async function tm(e, t) {
  return (await lt(
    `/api/personas/${encodeURIComponent(e)}/versions/${encodeURIComponent(t)}/rollback`,
    { method: "POST" }
  )).version;
}
async function nm(e) {
  return of(
    `/api/knowledge-spaces/${encodeURIComponent(e)}/documents/report`,
    { cache: "no-store" }
  );
}
async function om(e, t = 1) {
  const n = await of(
    `/api/eval/history?persona_id=${encodeURIComponent(e)}&limit=${encodeURIComponent(String(t))}`,
    { cache: "no-store" }
  );
  return Ag(n);
}
const sm = [
  { id: "profile", label: "设定", summary: () => "编辑角色设定" },
  { id: "memory", label: "记忆", summary: () => "会话与长期记忆" },
  { id: "rag", label: "知识库", summary: (e) => {
    const t = e.documents.filter((n) => String(n.status).includes("failed")).length;
    return t ? `${e.documents.length} 份资料，${t} 份待整理` : `${e.documents.length} 份资料`;
  } },
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
function im(e) {
  return ["available", "partial", "unassigned", "blocked", "pending", "error"].includes(e) ? e : "blocked";
}
function jo(e, t, n) {
  return { id: e, type: t, position: { x: 0, y: 0 }, data: n };
}
function lm(e) {
  var i, l;
  const t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Map(), o = `persona:${e.persona.id}`, s = "module:extensions";
  t.set(o, jo(o, "persona", { kind: "persona", label: e.persona.name, summary: String(((i = e.persona.profile) == null ? void 0 : i.description) || "尚未填写人设"), status: "available", level: 0 }));
  for (const r of sm) {
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
      status: im(f),
      level: r.level,
      assigned: d,
      configurable: !0,
      sourceId: r.id
    })), n.set(`${s}->${r.id}`, { id: `${s}->${r.id}`, source: s, target: r.id, sourceHandle: "right-source", targetHandle: "left-target" });
    for (const p of r.dependencies || []) {
      if (!p.id) continue;
      const v = e.capabilities.overrides[p.id], w = v === void 0 ? p.effective : v;
      if (t.set(p.id, jo(p.id, "capability", {
        kind: "tool",
        label: p.name,
        summary: p.server ? `MCP · ${p.server}` : p.source,
        status: w ? "available" : "blocked",
        level: p.level,
        assigned: w,
        configurable: !1,
        sourceId: p.id
      })), n.set(`${r.id}->${p.id}`, { id: `${r.id}->${p.id}`, source: r.id, target: p.id, sourceHandle: "right-source", targetHandle: "left-target" }), p.server) {
        const S = `mcp:${p.server}`, P = e.grants.servers.find((L) => L.name === p.server), z = ((l = P == null ? void 0 : P.status) == null ? void 0 : l.status) === "connected";
        t.set(S, jo(S, "capability", {
          kind: "mcp",
          label: p.server,
          summary: (P == null ? void 0 : P.description) || "MCP 服务",
          status: P != null && P.authorized && z ? "available" : "blocked",
          level: p.level,
          assigned: !!(P != null && P.authorized),
          configurable: !!(P && !P.global),
          sourceId: p.server
        })), n.set(`${p.id}->${S}`, { id: `${p.id}->${S}`, source: p.id, target: S, sourceHandle: "right-source", targetHandle: "left-target" });
      }
    }
  }
  return { nodes: [...t.values()], edges: [...n.values()] };
}
function rm(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var am = "\0", Qn = "\0", Su = "";
let um = class {
  constructor(t) {
    rt(this, "_isDirected", !0);
    rt(this, "_isMultigraph", !1);
    rt(this, "_isCompound", !1);
    // Label for the graph itself
    rt(this, "_label");
    // Defaults to be set when creating a new node
    rt(this, "_defaultNodeLabelFn", () => {
    });
    // Defaults to be set when creating a new edge
    rt(this, "_defaultEdgeLabelFn", () => {
    });
    // v -> label
    rt(this, "_nodes", {});
    // v -> edgeObj
    rt(this, "_in", {});
    // u -> v -> Number
    rt(this, "_preds", {});
    // v -> edgeObj
    rt(this, "_out", {});
    // v -> w -> Number
    rt(this, "_sucs", {});
    // e -> edgeObj
    rt(this, "_edgeObjs", {});
    // e -> label
    rt(this, "_edgeLabels", {});
    /* Number of nodes in the graph. Should only be changed by the implementation. */
    rt(this, "_nodeCount", 0);
    /* Number of edges in the graph. Should only be changed by the implementation. */
    rt(this, "_edgeCount", 0);
    rt(this, "_parent");
    rt(this, "_children");
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
    var u = cm(this._isDirected, t, n, o);
    return t = u.v, n = u.w, Object.freeze(u), this._edgeObjs[r] = u, xu(this._preds[n], t), xu(this._sucs[t], n), this._in[n][r] = u, this._out[t][r] = u, this._edgeCount++, this;
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
    return i && (t = i.v, n = i.w, delete this._edgeLabels[s], delete this._edgeObjs[s], $u(this._preds[n], t), $u(this._sucs[t], n), delete this._in[n][s], delete this._out[t][s], this._edgeCount--), this;
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
function xu(e, t) {
  e[t] ? e[t]++ : e[t] = 1;
}
function $u(e, t) {
  --e[t] || delete e[t];
}
function Xo(e, t, n, o) {
  var s = "" + t, i = "" + n;
  if (!e && s > i) {
    var l = s;
    s = i, i = l;
  }
  return s + Su + i + Su + (o === void 0 ? am : o);
}
function cm(e, t, n, o) {
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
var Nr = um, dm = "2.2.4", fm = {
  Graph: Nr,
  version: dm
}, pm = Nr, hm = {
  write: vm,
  read: ym
};
function vm(e) {
  var t = {
    options: {
      directed: e.isDirected(),
      multigraph: e.isMultigraph(),
      compound: e.isCompound()
    },
    nodes: gm(e),
    edges: mm(e)
  };
  return e.graph() !== void 0 && (t.value = structuredClone(e.graph())), t;
}
function gm(e) {
  return e.nodes().map(function(t) {
    var n = e.node(t), o = e.parent(t), s = { v: t };
    return n !== void 0 && (s.value = n), o !== void 0 && (s.parent = o), s;
  });
}
function mm(e) {
  return e.edges().map(function(t) {
    var n = e.edge(t), o = { v: t.v, w: t.w };
    return t.name !== void 0 && (o.name = t.name), n !== void 0 && (o.value = n), o;
  });
}
function ym(e) {
  var t = new pm(e.options).setGraph(e.value);
  return e.nodes.forEach(function(n) {
    t.setNode(n.v, n.value), n.parent && t.setParent(n.v, n.parent);
  }), e.edges.forEach(function(n) {
    t.setEdge({ v: n.v, w: n.w, name: n.name }, n.value);
  }), t;
}
var bm = _m;
function _m(e) {
  var t = {}, n = [], o;
  function s(i) {
    Object.hasOwn(t, i) || (t[i] = !0, o.push(i), e.successors(i).forEach(s), e.predecessors(i).forEach(s));
  }
  return e.nodes().forEach(function(i) {
    o = [], s(i), o.length && n.push(o);
  }), n;
}
let wm = class {
  constructor() {
    rt(this, "_arr", []);
    rt(this, "_keyIndices", {});
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
var rf = wm, km = rf, af = Cm, Em = () => 1;
function Cm(e, t, n, o) {
  return Sm(
    e,
    String(t),
    n || Em,
    o || function(s) {
      return e.outEdges(s);
    }
  );
}
function Sm(e, t, n, o) {
  var s = {}, i = new km(), l, r, u = function(c) {
    var d = c.v !== l ? c.v : c.w, f = s[d], p = n(c), v = r.distance + p;
    if (p < 0)
      throw new Error("dijkstra does not allow negative edge weights. Bad edge: " + c + " Weight: " + p);
    v < f.distance && (f.distance = v, f.predecessor = l, i.decrease(d, v));
  };
  for (e.nodes().forEach(function(c) {
    var d = c === t ? 0 : Number.POSITIVE_INFINITY;
    s[c] = { distance: d }, i.add(c, d);
  }); i.size() > 0 && (l = i.removeMin(), r = s[l], r.distance !== Number.POSITIVE_INFINITY); )
    o(l).forEach(u);
  return s;
}
var xm = af, $m = Im;
function Im(e, t, n) {
  return e.nodes().reduce(function(o, s) {
    return o[s] = xm(e, s, t, n), o;
  }, {});
}
var uf = Nm;
function Nm(e) {
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
var Tm = uf, Mm = Pm;
function Pm(e) {
  return Tm(e).filter(function(t) {
    return t.length > 1 || t.length === 1 && e.hasEdge(t[0], t[0]);
  });
}
var Om = Dm, Am = () => 1;
function Dm(e, t, n) {
  return Rm(
    e,
    t || Am,
    n || function(o) {
      return e.outEdges(o);
    }
  );
}
function Rm(e, t, n) {
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
        var d = u[i], f = l[c], p = u[c], v = d.distance + f.distance;
        v < p.distance && (p.distance = v, p.predecessor = f.predecessor);
      });
    });
  }), o;
}
function cf(e) {
  var t = {}, n = {}, o = [];
  function s(i) {
    if (Object.hasOwn(n, i))
      throw new Hl();
    Object.hasOwn(t, i) || (n[i] = !0, t[i] = !0, e.predecessors(i).forEach(s), delete n[i], o.push(i));
  }
  if (e.sinks().forEach(s), Object.keys(t).length !== e.nodeCount())
    throw new Hl();
  return o;
}
class Hl extends Error {
  constructor() {
    super(...arguments);
  }
}
var df = cf;
cf.CycleException = Hl;
var Iu = df, Lm = Vm;
function Vm(e) {
  try {
    Iu(e);
  } catch (t) {
    if (t instanceof Iu.CycleException)
      return !1;
    throw t;
  }
  return !0;
}
var ff = zm;
function zm(e, t, n) {
  Array.isArray(t) || (t = [t]);
  var o = e.isDirected() ? (r) => e.successors(r) : (r) => e.neighbors(r), s = n === "post" ? Fm : Bm, i = [], l = {};
  return t.forEach((r) => {
    if (!e.hasNode(r))
      throw new Error("Graph does not have node: " + r);
    s(r, o, l, i);
  }), i;
}
function Fm(e, t, n, o) {
  for (var s = [[e, !1]]; s.length > 0; ) {
    var i = s.pop();
    i[1] ? o.push(i[0]) : Object.hasOwn(n, i[0]) || (n[i[0]] = !0, s.push([i[0], !0]), pf(t(i[0]), (l) => s.push([l, !1])));
  }
}
function Bm(e, t, n, o) {
  for (var s = [e]; s.length > 0; ) {
    var i = s.pop();
    Object.hasOwn(n, i) || (n[i] = !0, o.push(i), pf(t(i), (l) => s.push(l)));
  }
}
function pf(e, t) {
  for (var n = e.length; n--; )
    t(e[n], n, e);
  return e;
}
var Hm = ff, Um = jm;
function jm(e, t) {
  return Hm(e, t, "post");
}
var Gm = ff, qm = Ym;
function Ym(e, t) {
  return Gm(e, t, "pre");
}
var Xm = Nr, Km = rf, Wm = Zm;
function Zm(e, t) {
  var n = new Xm(), o = {}, s = new Km(), i;
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
var Jm = {
  components: bm,
  dijkstra: af,
  dijkstraAll: $m,
  findCycles: Mm,
  floydWarshall: Om,
  isAcyclic: Lm,
  postorder: Um,
  preorder: qm,
  prim: Wm,
  tarjan: uf,
  topsort: df
}, Nu = fm, tn = {
  Graph: Nu.Graph,
  json: hm,
  alg: Jm,
  version: Nu.version
};
let Qm = class {
  constructor() {
    let t = {};
    t._next = t._prev = t, this._sentinel = t;
  }
  dequeue() {
    let t = this._sentinel, n = t._prev;
    if (n !== t)
      return Tu(n), n;
  }
  enqueue(t) {
    let n = this._sentinel;
    t._prev && t._next && Tu(t), t._next = n._next, n._next._prev = t, n._next = t, t._prev = n;
  }
  toString() {
    let t = [], n = this._sentinel, o = n._prev;
    for (; o !== n; )
      t.push(JSON.stringify(o, ey)), o = o._prev;
    return "[" + t.join(", ") + "]";
  }
};
function Tu(e) {
  e._prev._next = e._next, e._next._prev = e._prev, delete e._next, delete e._prev;
}
function ey(e, t) {
  if (e !== "_next" && e !== "_prev")
    return t;
}
var ty = Qm;
let ny = tn.Graph, oy = ty;
var sy = ly;
let iy = () => 1;
function ly(e, t) {
  if (e.nodeCount() <= 1)
    return [];
  let n = ay(e, t || iy);
  return ry(n.graph, n.buckets, n.zeroIdx).flatMap((s) => e.outEdges(s.v, s.w));
}
function ry(e, t, n) {
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
    s && i.push({ v: l.v, w: l.w }), u.out -= r, Ul(t, n, u);
  }), e.outEdges(o.v).forEach((l) => {
    let r = e.edge(l), u = l.w, c = e.node(u);
    c.in -= r, Ul(t, n, c);
  }), e.removeNode(o.v), i;
}
function ay(e, t) {
  let n = new ny(), o = 0, s = 0;
  e.nodes().forEach((r) => {
    n.setNode(r, { v: r, in: 0, out: 0 });
  }), e.edges().forEach((r) => {
    let u = n.edge(r.v, r.w) || 0, c = t(r), d = u + c;
    n.setEdge(r.v, r.w, d), s = Math.max(s, n.node(r.v).out += c), o = Math.max(o, n.node(r.w).in += c);
  });
  let i = uy(s + o + 3).map(() => new oy()), l = o + 1;
  return n.nodes().forEach((r) => {
    Ul(i, l, n.node(r));
  }), { graph: n, buckets: i, zeroIdx: l };
}
function Ul(e, t, n) {
  n.out ? n.in ? e[n.out - n.in + t].enqueue(n) : e[e.length - 1].enqueue(n) : e[0].enqueue(n);
}
function uy(e) {
  const t = [];
  for (let n = 0; n < e; n++)
    t.push(n);
  return t;
}
let hf = tn.Graph;
var gt = {
  addBorderNode: yy,
  addDummyNode: vf,
  applyWithChunking: Ai,
  asNonCompoundGraph: dy,
  buildLayerMatrix: vy,
  intersectRect: hy,
  mapValues: Sy,
  maxRank: mf,
  normalizeRanks: gy,
  notime: ky,
  partition: _y,
  pick: Cy,
  predecessorWeights: py,
  range: bf,
  removeEmptyRanks: my,
  simplify: cy,
  successorWeights: fy,
  time: wy,
  uniqueId: yf,
  zipObject: Tr
};
function vf(e, t, n, o) {
  for (var s = o; e.hasNode(s); )
    s = yf(o);
  return n.dummy = t, e.setNode(s, n), s;
}
function cy(e) {
  let t = new hf().setGraph(e.graph());
  return e.nodes().forEach((n) => t.setNode(n, e.node(n))), e.edges().forEach((n) => {
    let o = t.edge(n.v, n.w) || { weight: 0, minlen: 1 }, s = e.edge(n);
    t.setEdge(n.v, n.w, {
      weight: o.weight + s.weight,
      minlen: Math.max(o.minlen, s.minlen)
    });
  }), t;
}
function dy(e) {
  let t = new hf({ multigraph: e.isMultigraph() }).setGraph(e.graph());
  return e.nodes().forEach((n) => {
    e.children(n).length || t.setNode(n, e.node(n));
  }), e.edges().forEach((n) => {
    t.setEdge(n, e.edge(n));
  }), t;
}
function fy(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.outEdges(n).forEach((s) => {
      o[s.w] = (o[s.w] || 0) + e.edge(s).weight;
    }), o;
  });
  return Tr(e.nodes(), t);
}
function py(e) {
  let t = e.nodes().map((n) => {
    let o = {};
    return e.inEdges(n).forEach((s) => {
      o[s.v] = (o[s.v] || 0) + e.edge(s).weight;
    }), o;
  });
  return Tr(e.nodes(), t);
}
function hy(e, t) {
  let n = e.x, o = e.y, s = t.x - n, i = t.y - o, l = e.width / 2, r = e.height / 2;
  if (!s && !i)
    throw new Error("Not possible to find intersection inside of the rectangle");
  let u, c;
  return Math.abs(i) * l > Math.abs(s) * r ? (i < 0 && (r = -r), u = r * s / i, c = r) : (s < 0 && (l = -l), u = l, c = l * i / s), { x: n + u, y: o + c };
}
function vy(e) {
  let t = bf(mf(e) + 1).map(() => []);
  return e.nodes().forEach((n) => {
    let o = e.node(n), s = o.rank;
    s !== void 0 && (t[s][o.order] = n);
  }), t;
}
function gy(e) {
  let t = e.nodes().map((o) => {
    let s = e.node(o).rank;
    return s === void 0 ? Number.MAX_VALUE : s;
  }), n = Ai(Math.min, t);
  e.nodes().forEach((o) => {
    let s = e.node(o);
    Object.hasOwn(s, "rank") && (s.rank -= n);
  });
}
function my(e) {
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
function yy(e, t, n, o) {
  let s = {
    width: 0,
    height: 0
  };
  return arguments.length >= 4 && (s.rank = n, s.order = o), vf(e, "border", s, t);
}
function by(e, t = gf) {
  const n = [];
  for (let o = 0; o < e.length; o += t) {
    const s = e.slice(o, o + t);
    n.push(s);
  }
  return n;
}
const gf = 65535;
function Ai(e, t) {
  if (t.length > gf) {
    const n = by(t);
    return e.apply(null, n.map((o) => e.apply(null, o)));
  } else
    return e.apply(null, t);
}
function mf(e) {
  const n = e.nodes().map((o) => {
    let s = e.node(o).rank;
    return s === void 0 ? Number.MIN_VALUE : s;
  });
  return Ai(Math.max, n);
}
function _y(e, t) {
  let n = { lhs: [], rhs: [] };
  return e.forEach((o) => {
    t(o) ? n.lhs.push(o) : n.rhs.push(o);
  }), n;
}
function wy(e, t) {
  let n = Date.now();
  try {
    return t();
  } finally {
    console.log(e + " time: " + (Date.now() - n) + "ms");
  }
}
function ky(e, t) {
  return t();
}
let Ey = 0;
function yf(e) {
  var t = ++Ey;
  return e + ("" + t);
}
function bf(e, t, n = 1) {
  t == null && (t = e, e = 0);
  let o = (i) => i < t;
  n < 0 && (o = (i) => t < i);
  const s = [];
  for (let i = e; o(i); i += n)
    s.push(i);
  return s;
}
function Cy(e, t) {
  const n = {};
  for (const o of t)
    e[o] !== void 0 && (n[o] = e[o]);
  return n;
}
function Sy(e, t) {
  let n = t;
  return typeof t == "string" && (n = (o) => o[t]), Object.entries(e).reduce((o, [s, i]) => (o[s] = n(i, s), o), {});
}
function Tr(e, t) {
  return e.reduce((n, o, s) => (n[o] = t[s], n), {});
}
let xy = sy, $y = gt.uniqueId;
var Iy = {
  run: Ny,
  undo: My
};
function Ny(e) {
  (e.graph().acyclicer === "greedy" ? xy(e, n(e)) : Ty(e)).forEach((o) => {
    let s = e.edge(o);
    e.removeEdge(o), s.forwardName = o.name, s.reversed = !0, e.setEdge(o.w, o.v, s, $y("rev"));
  });
  function n(o) {
    return (s) => o.edge(s).weight;
  }
}
function Ty(e) {
  let t = [], n = {}, o = {};
  function s(i) {
    Object.hasOwn(o, i) || (o[i] = !0, n[i] = !0, e.outEdges(i).forEach((l) => {
      Object.hasOwn(n, l.w) ? t.push(l) : s(l.w);
    }), delete n[i]);
  }
  return e.nodes().forEach(s), t;
}
function My(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.reversed) {
      e.removeEdge(t);
      let o = n.forwardName;
      delete n.reversed, delete n.forwardName, e.setEdge(t.w, t.v, n, o);
    }
  });
}
let Py = gt;
var Oy = {
  run: Ay,
  undo: Ry
};
function Ay(e) {
  e.graph().dummyChains = [], e.edges().forEach((t) => Dy(e, t));
}
function Dy(e, t) {
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
    }, c = Py.addDummyNode(e, "edge", d, "_d"), o === u && (d.width = r.width, d.height = r.height, d.dummy = "edge-label", d.labelpos = r.labelpos), e.setEdge(n, c, { weight: r.weight }, l), f === 0 && e.graph().dummyChains.push(c), n = c;
  e.setEdge(n, s, { weight: r.weight }, l);
}
function Ry(e) {
  e.graph().dummyChains.forEach((t) => {
    let n = e.node(t), o = n.edgeLabel, s;
    for (e.setEdge(n.edgeObj, o); n.dummy; )
      s = e.successors(t)[0], e.removeNode(t), o.points.push({ x: n.x, y: n.y }), n.dummy === "edge-label" && (o.x = n.x, o.y = n.y, o.width = n.width, o.height = n.height), t = s, n = e.node(t);
  });
}
const { applyWithChunking: Ly } = gt;
var Di = {
  longestPath: Vy,
  slack: zy
};
function Vy(e) {
  var t = {};
  function n(o) {
    var s = e.node(o);
    if (Object.hasOwn(t, o))
      return s.rank;
    t[o] = !0;
    let i = e.outEdges(o).map((r) => r == null ? Number.POSITIVE_INFINITY : n(r.w) - e.edge(r).minlen);
    var l = Ly(Math.min, i);
    return l === Number.POSITIVE_INFINITY && (l = 0), s.rank = l;
  }
  e.sources().forEach(n);
}
function zy(e, t) {
  return e.node(t.w).rank - e.node(t.v).rank - e.edge(t).minlen;
}
var Fy = tn.Graph, ci = Di.slack, _f = By;
function By(e) {
  var t = new Fy({ directed: !1 }), n = e.nodes()[0], o = e.nodeCount();
  t.setNode(n, {});
  for (var s, i; Hy(t, e) < o; )
    s = Uy(t, e), i = t.hasNode(s.v) ? ci(e, s) : -ci(e, s), jy(t, e, i);
  return t;
}
function Hy(e, t) {
  function n(o) {
    t.nodeEdges(o).forEach((s) => {
      var i = s.v, l = o === i ? s.w : i;
      !e.hasNode(l) && !ci(t, s) && (e.setNode(l, {}), e.setEdge(o, l, {}), n(l));
    });
  }
  return e.nodes().forEach(n), e.nodeCount();
}
function Uy(e, t) {
  return t.edges().reduce((o, s) => {
    let i = Number.POSITIVE_INFINITY;
    return e.hasNode(s.v) !== e.hasNode(s.w) && (i = ci(t, s)), i < o[0] ? [i, s] : o;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function jy(e, t, n) {
  e.nodes().forEach((o) => t.node(o).rank += n);
}
var Gy = _f, Mu = Di.slack, qy = Di.longestPath, Yy = tn.alg.preorder, Xy = tn.alg.postorder, Ky = gt.simplify, Wy = mo;
mo.initLowLimValues = Pr;
mo.initCutValues = Mr;
mo.calcCutValue = wf;
mo.leaveEdge = Ef;
mo.enterEdge = Cf;
mo.exchangeEdges = Sf;
function mo(e) {
  e = Ky(e), qy(e);
  var t = Gy(e);
  Pr(t), Mr(t, e);
  for (var n, o; n = Ef(t); )
    o = Cf(t, e, n), Sf(t, e, n, o);
}
function Mr(e, t) {
  var n = Xy(e, e.nodes());
  n = n.slice(0, n.length - 1), n.forEach((o) => Zy(e, t, o));
}
function Zy(e, t, n) {
  var o = e.node(n), s = o.parent;
  e.edge(n, s).cutvalue = wf(e, t, n);
}
function wf(e, t, n) {
  var o = e.node(n), s = o.parent, i = !0, l = t.edge(n, s), r = 0;
  return l || (i = !1, l = t.edge(s, n)), r = l.weight, t.nodeEdges(n).forEach((u) => {
    var c = u.v === n, d = c ? u.w : u.v;
    if (d !== s) {
      var f = c === i, p = t.edge(u).weight;
      if (r += f ? p : -p, Qy(e, n, d)) {
        var v = e.edge(n, d).cutvalue;
        r += f ? -v : v;
      }
    }
  }), r;
}
function Pr(e, t) {
  arguments.length < 2 && (t = e.nodes()[0]), kf(e, {}, 1, t);
}
function kf(e, t, n, o, s) {
  var i = n, l = e.node(o);
  return t[o] = !0, e.neighbors(o).forEach((r) => {
    Object.hasOwn(t, r) || (n = kf(e, t, n, r, o));
  }), l.low = i, l.lim = n++, s ? l.parent = s : delete l.parent, n;
}
function Ef(e) {
  return e.edges().find((t) => e.edge(t).cutvalue < 0);
}
function Cf(e, t, n) {
  var o = n.v, s = n.w;
  t.hasEdge(o, s) || (o = n.w, s = n.v);
  var i = e.node(o), l = e.node(s), r = i, u = !1;
  i.lim > l.lim && (r = l, u = !0);
  var c = t.edges().filter((d) => u === Pu(e, e.node(d.v), r) && u !== Pu(e, e.node(d.w), r));
  return c.reduce((d, f) => Mu(t, f) < Mu(t, d) ? f : d);
}
function Sf(e, t, n, o) {
  var s = n.v, i = n.w;
  e.removeEdge(s, i), e.setEdge(o.v, o.w, {}), Pr(e), Mr(e, t), Jy(e, t);
}
function Jy(e, t) {
  var n = e.nodes().find((s) => !t.node(s).parent), o = Yy(e, n);
  o = o.slice(1), o.forEach((s) => {
    var i = e.node(s).parent, l = t.edge(s, i), r = !1;
    l || (l = t.edge(i, s), r = !0), t.node(s).rank = t.node(i).rank + (r ? l.minlen : -l.minlen);
  });
}
function Qy(e, t, n) {
  return e.hasEdge(t, n);
}
function Pu(e, t, n) {
  return n.low <= t.lim && t.lim <= n.lim;
}
var e1 = Di, xf = e1.longestPath, t1 = _f, n1 = Wy, o1 = s1;
function s1(e) {
  var t = e.graph().ranker;
  if (t instanceof Function)
    return t(e);
  switch (e.graph().ranker) {
    case "network-simplex":
      Ou(e);
      break;
    case "tight-tree":
      l1(e);
      break;
    case "longest-path":
      i1(e);
      break;
    case "none":
      break;
    default:
      Ou(e);
  }
}
var i1 = xf;
function l1(e) {
  xf(e), t1(e);
}
function Ou(e) {
  n1(e);
}
var r1 = a1;
function a1(e) {
  let t = c1(e);
  e.graph().dummyChains.forEach((n) => {
    let o = e.node(n), s = o.edgeObj, i = u1(e, t, s.v, s.w), l = i.path, r = i.lca, u = 0, c = l[u], d = !0;
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
function u1(e, t, n, o) {
  let s = [], i = [], l = Math.min(t[n].low, t[o].low), r = Math.max(t[n].lim, t[o].lim), u, c;
  u = n;
  do
    u = e.parent(u), s.push(u);
  while (u && (t[u].low > l || r > t[u].lim));
  for (c = u, u = o; (u = e.parent(u)) !== c; )
    i.push(u);
  return { path: s.concat(i.reverse()), lca: c };
}
function c1(e) {
  let t = {}, n = 0;
  function o(s) {
    let i = n;
    e.children(s).forEach(o), t[s] = { low: i, lim: n++ };
  }
  return e.children().forEach(o), t;
}
let di = gt;
var d1 = {
  run: f1,
  cleanup: v1
};
function f1(e) {
  let t = di.addDummyNode(e, "root", {}, "_root"), n = p1(e), o = Object.values(n), s = di.applyWithChunking(Math.max, o) - 1, i = 2 * s + 1;
  e.graph().nestingRoot = t, e.edges().forEach((r) => e.edge(r).minlen *= i);
  let l = h1(e) + 1;
  e.children().forEach((r) => $f(e, t, i, l, s, n, r)), e.graph().nodeRankFactor = i;
}
function $f(e, t, n, o, s, i, l) {
  let r = e.children(l);
  if (!r.length) {
    l !== t && e.setEdge(t, l, { weight: 0, minlen: n });
    return;
  }
  let u = di.addBorderNode(e, "_bt"), c = di.addBorderNode(e, "_bb"), d = e.node(l);
  e.setParent(u, l), d.borderTop = u, e.setParent(c, l), d.borderBottom = c, r.forEach((f) => {
    $f(e, t, n, o, s, i, f);
    let p = e.node(f), v = p.borderTop ? p.borderTop : f, w = p.borderBottom ? p.borderBottom : f, S = p.borderTop ? o : 2 * o, P = v !== w ? 1 : s - i[l] + 1;
    e.setEdge(u, v, {
      weight: S,
      minlen: P,
      nestingEdge: !0
    }), e.setEdge(w, c, {
      weight: S,
      minlen: P,
      nestingEdge: !0
    });
  }), e.parent(l) || e.setEdge(t, u, { weight: 0, minlen: s + i[l] });
}
function p1(e) {
  var t = {};
  function n(o, s) {
    var i = e.children(o);
    i && i.length && i.forEach((l) => n(l, s + 1)), t[o] = s;
  }
  return e.children().forEach((o) => n(o, 1)), t;
}
function h1(e) {
  return e.edges().reduce((t, n) => t + e.edge(n).weight, 0);
}
function v1(e) {
  var t = e.graph();
  e.removeNode(t.nestingRoot), delete t.nestingRoot, e.edges().forEach((n) => {
    var o = e.edge(n);
    o.nestingEdge && e.removeEdge(n);
  });
}
let g1 = gt;
var m1 = y1;
function y1(e) {
  function t(n) {
    let o = e.children(n), s = e.node(n);
    if (o.length && o.forEach(t), Object.hasOwn(s, "minRank")) {
      s.borderLeft = [], s.borderRight = [];
      for (let i = s.minRank, l = s.maxRank + 1; i < l; ++i)
        Au(e, "borderLeft", "_bl", n, s, i), Au(e, "borderRight", "_br", n, s, i);
    }
  }
  e.children().forEach(t);
}
function Au(e, t, n, o, s, i) {
  let l = { width: 0, height: 0, rank: i, borderType: t }, r = s[t][i - 1], u = g1.addDummyNode(e, "border", l, n);
  s[t][i] = u, e.setParent(u, o), r && e.setEdge(r, u, { weight: 1 });
}
var b1 = {
  adjust: _1,
  undo: w1
};
function _1(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "lr" || t === "rl") && If(e);
}
function w1(e) {
  let t = e.graph().rankdir.toLowerCase();
  (t === "bt" || t === "rl") && k1(e), (t === "lr" || t === "rl") && (E1(e), If(e));
}
function If(e) {
  e.nodes().forEach((t) => Du(e.node(t))), e.edges().forEach((t) => Du(e.edge(t)));
}
function Du(e) {
  let t = e.width;
  e.width = e.height, e.height = t;
}
function k1(e) {
  e.nodes().forEach((t) => rl(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(rl), Object.hasOwn(n, "y") && rl(n);
  });
}
function rl(e) {
  e.y = -e.y;
}
function E1(e) {
  e.nodes().forEach((t) => al(e.node(t))), e.edges().forEach((t) => {
    let n = e.edge(t);
    n.points.forEach(al), Object.hasOwn(n, "x") && al(n);
  });
}
function al(e) {
  let t = e.x;
  e.x = e.y, e.y = t;
}
let Ru = gt;
var C1 = S1;
function S1(e) {
  let t = {}, n = e.nodes().filter((u) => !e.children(u).length), o = n.map((u) => e.node(u).rank), s = Ru.applyWithChunking(Math.max, o), i = Ru.range(s + 1).map(() => []);
  function l(u) {
    if (t[u]) return;
    t[u] = !0;
    let c = e.node(u);
    i[c.rank].push(u), e.successors(u).forEach(l);
  }
  return n.sort((u, c) => e.node(u).rank - e.node(c).rank).forEach(l), i;
}
let x1 = gt.zipObject;
var $1 = I1;
function I1(e, t) {
  let n = 0;
  for (let o = 1; o < t.length; ++o)
    n += N1(e, t[o - 1], t[o]);
  return n;
}
function N1(e, t, n) {
  let o = x1(n, n.map((c, d) => d)), s = t.flatMap((c) => e.outEdges(c).map((d) => ({ pos: o[d.w], weight: e.edge(d).weight })).sort((d, f) => d.pos - f.pos)), i = 1;
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
var T1 = M1;
function M1(e, t = []) {
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
let P1 = gt;
var O1 = A1;
function A1(e, t) {
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
  return D1(o);
}
function D1(e) {
  let t = [];
  function n(s) {
    return (i) => {
      i.merged || (i.barycenter === void 0 || s.barycenter === void 0 || i.barycenter >= s.barycenter) && R1(s, i);
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
  return t.filter((s) => !s.merged).map((s) => P1.pick(s, ["vs", "i", "barycenter", "weight"]));
}
function R1(e, t) {
  let n = 0, o = 0;
  e.weight && (n += e.barycenter * e.weight, o += e.weight), t.weight && (n += t.barycenter * t.weight, o += t.weight), e.vs = t.vs.concat(e.vs), e.barycenter = n / o, e.weight = o, e.i = Math.min(t.i, e.i), t.merged = !0;
}
let L1 = gt;
var V1 = z1;
function z1(e, t) {
  let n = L1.partition(e, (d) => Object.hasOwn(d, "barycenter")), o = n.lhs, s = n.rhs.sort((d, f) => f.i - d.i), i = [], l = 0, r = 0, u = 0;
  o.sort(F1(!!t)), u = Lu(i, s, u), o.forEach((d) => {
    u += d.vs.length, i.push(d.vs), l += d.barycenter * d.weight, r += d.weight, u = Lu(i, s, u);
  });
  let c = { vs: i.flat(!0) };
  return r && (c.barycenter = l / r, c.weight = r), c;
}
function Lu(e, t, n) {
  let o;
  for (; t.length && (o = t[t.length - 1]).i <= n; )
    t.pop(), e.push(o.vs), n++;
  return n;
}
function F1(e) {
  return (t, n) => t.barycenter < n.barycenter ? -1 : t.barycenter > n.barycenter ? 1 : e ? n.i - t.i : t.i - n.i;
}
let B1 = T1, H1 = O1, U1 = V1;
var j1 = Nf;
function Nf(e, t, n, o) {
  let s = e.children(t), i = e.node(t), l = i ? i.borderLeft : void 0, r = i ? i.borderRight : void 0, u = {};
  l && (s = s.filter((p) => p !== l && p !== r));
  let c = B1(e, s);
  c.forEach((p) => {
    if (e.children(p.v).length) {
      let v = Nf(e, p.v, n, o);
      u[p.v] = v, Object.hasOwn(v, "barycenter") && q1(p, v);
    }
  });
  let d = H1(c, n);
  G1(d, u);
  let f = U1(d, o);
  if (l && (f.vs = [l, f.vs, r].flat(!0), e.predecessors(l).length)) {
    let p = e.node(e.predecessors(l)[0]), v = e.node(e.predecessors(r)[0]);
    Object.hasOwn(f, "barycenter") || (f.barycenter = 0, f.weight = 0), f.barycenter = (f.barycenter * f.weight + p.order + v.order) / (f.weight + 2), f.weight += 2;
  }
  return f;
}
function G1(e, t) {
  e.forEach((n) => {
    n.vs = n.vs.flatMap((o) => t[o] ? t[o].vs : o);
  });
}
function q1(e, t) {
  e.barycenter !== void 0 ? (e.barycenter = (e.barycenter * e.weight + t.barycenter * t.weight) / (e.weight + t.weight), e.weight += t.weight) : (e.barycenter = t.barycenter, e.weight = t.weight);
}
let Y1 = tn.Graph, X1 = gt;
var K1 = W1;
function W1(e, t, n) {
  let o = Z1(e), s = new Y1({ compound: !0 }).setGraph({ root: o }).setDefaultNodeLabel((i) => e.node(i));
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
function Z1(e) {
  for (var t; e.hasNode(t = X1.uniqueId("_root")); ) ;
  return t;
}
var J1 = Q1;
function Q1(e, t, n) {
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
let eb = C1, tb = $1, nb = j1, ob = K1, sb = J1, ib = tn.Graph, As = gt;
var lb = Tf;
function Tf(e, t) {
  if (t && typeof t.customOrder == "function") {
    t.customOrder(e, Tf);
    return;
  }
  let n = As.maxRank(e), o = Vu(e, As.range(1, n + 1), "inEdges"), s = Vu(e, As.range(n - 1, -1, -1), "outEdges"), i = eb(e);
  if (zu(e, i), t && t.disableOptimalOrderHeuristic)
    return;
  let l = Number.POSITIVE_INFINITY, r;
  for (let u = 0, c = 0; c < 4; ++u, ++c) {
    rb(u % 2 ? o : s, u % 4 >= 2), i = As.buildLayerMatrix(e);
    let d = tb(e, i);
    d < l && (c = 0, r = Object.assign({}, i), l = d);
  }
  zu(e, r);
}
function Vu(e, t, n) {
  return t.map(function(o) {
    return ob(e, o, n);
  });
}
function rb(e, t) {
  let n = new ib();
  e.forEach(function(o) {
    let s = o.graph().root, i = nb(o, s, n, t);
    i.vs.forEach((l, r) => o.node(l).order = r), sb(o, n, i.vs);
  });
}
function zu(e, t) {
  Object.values(t).forEach((n) => n.forEach((o, s) => e.node(o).order = s));
}
let ab = tn.Graph, kn = gt;
var ub = {
  positionX: _b
};
function cb(e, t) {
  let n = {};
  function o(s, i) {
    let l = 0, r = 0, u = s.length, c = i[i.length - 1];
    return i.forEach((d, f) => {
      let p = fb(e, d), v = p ? e.node(p).order : u;
      (p || d === c) && (i.slice(r, f + 1).forEach((w) => {
        e.predecessors(w).forEach((S) => {
          let P = e.node(S), z = P.order;
          (z < l || v < z) && !(P.dummy && e.node(w).dummy) && Mf(n, S, w);
        });
      }), r = f + 1, l = v);
    }), i;
  }
  return t.length && t.reduce(o), n;
}
function db(e, t) {
  let n = {};
  function o(i, l, r, u, c) {
    let d;
    kn.range(l, r).forEach((f) => {
      d = i[f], e.node(d).dummy && e.predecessors(d).forEach((p) => {
        let v = e.node(p);
        v.dummy && (v.order < u || v.order > c) && Mf(n, p, d);
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
function fb(e, t) {
  if (e.node(t).dummy)
    return e.predecessors(t).find((n) => e.node(n).dummy);
}
function Mf(e, t, n) {
  if (t > n) {
    let s = t;
    t = n, n = s;
  }
  let o = e[t];
  o || (e[t] = o = {}), o[n] = !0;
}
function pb(e, t, n) {
  if (t > n) {
    let o = t;
    t = n, n = o;
  }
  return !!e[t] && Object.hasOwn(e[t], n);
}
function hb(e, t, n, o) {
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
        d = d.sort((p, v) => l[p] - l[v]);
        let f = (d.length - 1) / 2;
        for (let p = Math.floor(f), v = Math.ceil(f); p <= v; ++p) {
          let w = d[p];
          i[c] === c && u < l[w] && !pb(n, c, w) && (i[w] = c, i[c] = s[c] = s[w], u = l[w]);
        }
      }
    });
  }), { root: s, align: i };
}
function vb(e, t, n, o, s) {
  let i = {}, l = gb(e, t, n, s), r = s ? "borderLeft" : "borderRight";
  function u(f, p) {
    let v = l.nodes(), w = v.pop(), S = {};
    for (; w; )
      S[w] ? f(w) : (S[w] = !0, v.push(w), v = v.concat(p(w))), w = v.pop();
  }
  function c(f) {
    i[f] = l.inEdges(f).reduce((p, v) => Math.max(p, i[v.v] + l.edge(v)), 0);
  }
  function d(f) {
    let p = l.outEdges(f).reduce((w, S) => Math.min(w, i[S.w] - l.edge(S)), Number.POSITIVE_INFINITY), v = e.node(f);
    p !== Number.POSITIVE_INFINITY && v.borderType !== r && (i[f] = Math.max(i[f], p));
  }
  return u(c, l.predecessors.bind(l)), u(d, l.successors.bind(l)), Object.keys(o).forEach((f) => i[f] = i[n[f]]), i;
}
function gb(e, t, n, o) {
  let s = new ab(), i = e.graph(), l = wb(i.nodesep, i.edgesep, o);
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
function mb(e, t) {
  return Object.values(t).reduce((n, o) => {
    let s = Number.NEGATIVE_INFINITY, i = Number.POSITIVE_INFINITY;
    Object.entries(o).forEach(([r, u]) => {
      let c = kb(e, r) / 2;
      s = Math.max(u + c, s), i = Math.min(u - c, i);
    });
    const l = s - i;
    return l < n[0] && (n = [l, o]), n;
  }, [Number.POSITIVE_INFINITY, null])[1];
}
function yb(e, t) {
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
function bb(e, t) {
  return kn.mapValues(e.ul, (n, o) => {
    if (t)
      return e[t.toLowerCase()][o];
    {
      let s = Object.values(e).map((i) => i[o]).sort((i, l) => i - l);
      return (s[1] + s[2]) / 2;
    }
  });
}
function _b(e) {
  let t = kn.buildLayerMatrix(e), n = Object.assign(
    cb(e, t),
    db(e, t)
  ), o = {}, s;
  ["u", "d"].forEach((l) => {
    s = l === "u" ? t : Object.values(t).reverse(), ["l", "r"].forEach((r) => {
      r === "r" && (s = s.map((f) => Object.values(f).reverse()));
      let u = (l === "u" ? e.predecessors : e.successors).bind(e), c = hb(e, s, n, u), d = vb(
        e,
        s,
        c.root,
        c.align,
        r === "r"
      );
      r === "r" && (d = kn.mapValues(d, (f) => -f)), o[l + r] = d;
    });
  });
  let i = mb(e, o);
  return yb(o, i), bb(o, e.graph().align);
}
function wb(e, t, n) {
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
function kb(e, t) {
  return e.node(t).width;
}
let Pf = gt, Eb = ub.positionX;
var Cb = Sb;
function Sb(e) {
  e = Pf.asNonCompoundGraph(e), xb(e), Object.entries(Eb(e)).forEach(([t, n]) => e.node(t).x = n);
}
function xb(e) {
  let t = Pf.buildLayerMatrix(e), n = e.graph().ranksep, o = 0;
  t.forEach((s) => {
    const i = s.reduce((l, r) => {
      const u = e.node(r).height;
      return l > u ? l : u;
    }, 0);
    s.forEach((l) => e.node(l).y = o + i / 2), o += i + n;
  });
}
let Fu = Iy, Bu = Oy, $b = o1, Ib = gt.normalizeRanks, Nb = r1, Tb = gt.removeEmptyRanks, Hu = d1, Mb = m1, Uu = b1, Pb = lb, Ob = Cb, Kt = gt, Ab = tn.Graph;
var Db = Rb;
function Rb(e, t) {
  let n = t && t.debugTiming ? Kt.time : Kt.notime;
  n("layout", () => {
    let o = n("  buildLayoutGraph", () => qb(e));
    n("  runLayout", () => Lb(o, n, t)), n("  updateInputGraph", () => Vb(e, o));
  });
}
function Lb(e, t, n) {
  t("    makeSpaceForEdgeLabels", () => Yb(e)), t("    removeSelfEdges", () => n_(e)), t("    acyclic", () => Fu.run(e)), t("    nestingGraph.run", () => Hu.run(e)), t("    rank", () => $b(Kt.asNonCompoundGraph(e))), t("    injectEdgeLabelProxies", () => Xb(e)), t("    removeEmptyRanks", () => Tb(e)), t("    nestingGraph.cleanup", () => Hu.cleanup(e)), t("    normalizeRanks", () => Ib(e)), t("    assignRankMinMax", () => Kb(e)), t("    removeEdgeLabelProxies", () => Wb(e)), t("    normalize.run", () => Bu.run(e)), t("    parentDummyChains", () => Nb(e)), t("    addBorderSegments", () => Mb(e)), t("    order", () => Pb(e, n)), t("    insertSelfEdges", () => o_(e)), t("    adjustCoordinateSystem", () => Uu.adjust(e)), t("    position", () => Ob(e)), t("    positionSelfEdges", () => s_(e)), t("    removeBorderNodes", () => t_(e)), t("    normalize.undo", () => Bu.undo(e)), t("    fixupEdgeLabelCoords", () => Qb(e)), t("    undoCoordinateSystem", () => Uu.undo(e)), t("    translateGraph", () => Zb(e)), t("    assignNodeIntersects", () => Jb(e)), t("    reversePoints", () => e_(e)), t("    acyclic.undo", () => Fu.undo(e));
}
function Vb(e, t) {
  e.nodes().forEach((n) => {
    let o = e.node(n), s = t.node(n);
    o && (o.x = s.x, o.y = s.y, o.rank = s.rank, t.children(n).length && (o.width = s.width, o.height = s.height));
  }), e.edges().forEach((n) => {
    let o = e.edge(n), s = t.edge(n);
    o.points = s.points, Object.hasOwn(s, "x") && (o.x = s.x, o.y = s.y);
  }), e.graph().width = t.graph().width, e.graph().height = t.graph().height;
}
let zb = ["nodesep", "edgesep", "ranksep", "marginx", "marginy"], Fb = { ranksep: 50, edgesep: 20, nodesep: 50, rankdir: "tb" }, Bb = ["acyclicer", "ranker", "rankdir", "align"], Hb = ["width", "height", "rank"], ju = { width: 0, height: 0 }, Ub = ["minlen", "weight", "width", "height", "labeloffset"], jb = {
  minlen: 1,
  weight: 1,
  width: 0,
  height: 0,
  labeloffset: 10,
  labelpos: "r"
}, Gb = ["labelpos"];
function qb(e) {
  let t = new Ab({ multigraph: !0, compound: !0 }), n = cl(e.graph());
  return t.setGraph(Object.assign(
    {},
    Fb,
    ul(n, zb),
    Kt.pick(n, Bb)
  )), e.nodes().forEach((o) => {
    let s = cl(e.node(o));
    const i = ul(s, Hb);
    Object.keys(ju).forEach((l) => {
      i[l] === void 0 && (i[l] = ju[l]);
    }), t.setNode(o, i), t.setParent(o, e.parent(o));
  }), e.edges().forEach((o) => {
    let s = cl(e.edge(o));
    t.setEdge(o, Object.assign(
      {},
      jb,
      ul(s, Ub),
      Kt.pick(s, Gb)
    ));
  }), t;
}
function Yb(e) {
  let t = e.graph();
  t.ranksep /= 2, e.edges().forEach((n) => {
    let o = e.edge(n);
    o.minlen *= 2, o.labelpos.toLowerCase() !== "c" && (t.rankdir === "TB" || t.rankdir === "BT" ? o.width += o.labeloffset : o.height += o.labeloffset);
  });
}
function Xb(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    if (n.width && n.height) {
      let o = e.node(t.v), i = { rank: (e.node(t.w).rank - o.rank) / 2 + o.rank, e: t };
      Kt.addDummyNode(e, "edge-proxy", i, "_ep");
    }
  });
}
function Kb(e) {
  let t = 0;
  e.nodes().forEach((n) => {
    let o = e.node(n);
    o.borderTop && (o.minRank = e.node(o.borderTop).rank, o.maxRank = e.node(o.borderBottom).rank, t = Math.max(t, o.maxRank));
  }), e.graph().maxRank = t;
}
function Wb(e) {
  e.nodes().forEach((t) => {
    let n = e.node(t);
    n.dummy === "edge-proxy" && (e.edge(n.e).labelRank = n.rank, e.removeNode(t));
  });
}
function Zb(e) {
  let t = Number.POSITIVE_INFINITY, n = 0, o = Number.POSITIVE_INFINITY, s = 0, i = e.graph(), l = i.marginx || 0, r = i.marginy || 0;
  function u(c) {
    let d = c.x, f = c.y, p = c.width, v = c.height;
    t = Math.min(t, d - p / 2), n = Math.max(n, d + p / 2), o = Math.min(o, f - v / 2), s = Math.max(s, f + v / 2);
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
function Jb(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t), o = e.node(t.v), s = e.node(t.w), i, l;
    n.points ? (i = n.points[0], l = n.points[n.points.length - 1]) : (n.points = [], i = s, l = o), n.points.unshift(Kt.intersectRect(o, i)), n.points.push(Kt.intersectRect(s, l));
  });
}
function Qb(e) {
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
function e_(e) {
  e.edges().forEach((t) => {
    let n = e.edge(t);
    n.reversed && n.points.reverse();
  });
}
function t_(e) {
  e.nodes().forEach((t) => {
    if (e.children(t).length) {
      let n = e.node(t), o = e.node(n.borderTop), s = e.node(n.borderBottom), i = e.node(n.borderLeft[n.borderLeft.length - 1]), l = e.node(n.borderRight[n.borderRight.length - 1]);
      n.width = Math.abs(l.x - i.x), n.height = Math.abs(s.y - o.y), n.x = i.x + n.width / 2, n.y = o.y + n.height / 2;
    }
  }), e.nodes().forEach((t) => {
    e.node(t).dummy === "border" && e.removeNode(t);
  });
}
function n_(e) {
  e.edges().forEach((t) => {
    if (t.v === t.w) {
      var n = e.node(t.v);
      n.selfEdges || (n.selfEdges = []), n.selfEdges.push({ e: t, label: e.edge(t) }), e.removeEdge(t);
    }
  });
}
function o_(e) {
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
function s_(e) {
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
let i_ = gt, l_ = tn.Graph;
var r_ = {
  debugOrdering: a_
};
function a_(e) {
  let t = i_.buildLayerMatrix(e), n = new l_({ compound: !0, multigraph: !0 }).setGraph({});
  return e.nodes().forEach((o) => {
    n.setNode(o, { label: o }), n.setParent(o, "layer" + e.node(o).rank);
  }), e.edges().forEach((o) => n.setEdge(o.v, o.w, {}, o.name)), t.forEach((o, s) => {
    let i = "layer" + s;
    n.setNode(i, { rank: "same" }), o.reduce((l, r) => (n.setEdge(l, r, { style: "invis" }), r));
  }), n;
}
var u_ = "1.1.5", c_ = {
  graphlib: tn,
  layout: Db,
  debug: r_,
  util: {
    time: gt.time,
    notime: gt.notime
  },
  version: u_
};
const Gu = /* @__PURE__ */ rm(c_), qu = 190, Yu = 78, Xu = ["profile", "memory", "rag", "extensions", "voice", "live2d"];
function d_(e) {
  const t = e.nodes.find((u) => u.data.kind === "persona"), n = e.nodes.find((u) => u.data.kind === "extensions");
  if (!t || !n) return;
  const o = /* @__PURE__ */ new Map(), s = e.nodes.filter((u) => u.type === "module" && u.data.kind !== "extensions").sort((u, c) => Xu.indexOf(u.data.kind) - Xu.indexOf(c.data.kind));
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
      const p = d.shift(), v = c.get(p);
      e.edges.filter((w) => w.source === p).forEach((w) => {
        c.has(w.target) || (c.set(w.target, v + 1), d.push(w.target));
      });
    }
    const f = Math.max(0, ...c.values());
    for (let p = 1; p <= f; p += 1) {
      const v = e.nodes.filter((S) => c.get(S.id) === p).sort((S, P) => S.data.label.localeCompare(P.data.label)), w = o.get(n.id).y;
      v.forEach((S, P) => o.set(S.id, {
        x: 960 + p * 260,
        y: w + (P - (v.length - 1) / 2) * 104
      }));
    }
  }
  return {
    nodes: e.nodes.map((u) => ({ ...u, position: o.get(u.id) || u.position })),
    edges: e.edges.map((u) => ({ ...u }))
  };
}
function f_(e) {
  const t = d_(e);
  if (t) return t;
  const n = new Gu.graphlib.Graph();
  return n.setDefaultEdgeLabel(() => ({})), n.setGraph({ rankdir: "LR", nodesep: 34, ranksep: 96, marginx: 28, marginy: 28 }), [...e.nodes].sort((o, s) => o.id.localeCompare(s.id)).forEach((o) => n.setNode(o.id, { width: qu, height: Yu })), [...e.edges].sort((o, s) => o.id.localeCompare(s.id)).forEach((o) => n.setEdge(o.source, o.target)), Gu.layout(n), {
    nodes: e.nodes.map((o) => {
      const s = n.node(o.id);
      return { ...o, position: { x: s.x - qu / 2, y: s.y - Yu / 2 } };
    }),
    edges: e.edges.map((o) => ({ ...o }))
  };
}
function p_(e, t) {
  const n = /* @__PURE__ */ new Set([t]), o = [t];
  for (; o.length; ) {
    const s = o.shift();
    for (const i of e.edges)
      i.source !== s || n.has(i.target) || (n.add(i.target), o.push(i.target));
  }
  return n;
}
function h_(e, t, n) {
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
function v_(e, t) {
  var u;
  const n = e.nodes.find((c) => c.data.kind === "persona");
  if (!n) return e;
  const o = (u = e.nodes.find((c) => c.data.kind === "extensions")) == null ? void 0 : u.id, s = new Set(
    e.edges.filter((c) => c.source === (o || n.id)).map((c) => c.target).filter((c) => e.nodes.some((d) => d.id === c && ["skill", "tool"].includes(d.data.kind)))
  ), i = h_(e, t, s), l = t === o, r = /* @__PURE__ */ new Set([
    n.id,
    ...e.nodes.filter((c) => c.type === "module").map((c) => c.id),
    ...i ? [i] : l ? s : []
  ]);
  return i && p_(e, i).forEach((c) => r.add(c)), {
    nodes: e.nodes.filter((c) => r.has(c.id)),
    edges: e.edges.filter((c) => r.has(c.source) && r.has(c.target))
  };
}
const g_ = {
  class: "knowledge-quality",
  "aria-label": "知识质量"
}, m_ = { class: "knowledge-quality-heading" }, y_ = ["disabled"], b_ = {
  class: "knowledge-quality-stats",
  "aria-label": "资料处理概览"
}, __ = { class: "knowledge-quality-report" }, w_ = { class: "knowledge-quality-subheading" }, k_ = {
  key: 0,
  class: "knowledge-quality-summary"
}, E_ = {
  key: 1,
  class: "knowledge-quality-meta"
}, C_ = { key: 0 }, S_ = { key: 1 }, x_ = { key: 2 }, $_ = { key: 3 }, I_ = {
  key: 2,
  class: "knowledge-quality-empty"
}, N_ = { class: "knowledge-quality-evaluation" }, T_ = { class: "knowledge-quality-subheading" }, M_ = { key: 0 }, P_ = {
  key: 0,
  class: "knowledge-quality-summary"
}, O_ = { class: "knowledge-quality-eval-facts" }, A_ = { key: 0 }, D_ = { key: 1 }, R_ = {
  key: 1,
  class: "knowledge-quality-empty"
}, L_ = {
  key: 0,
  class: "knowledge-quality-error"
}, V_ = ["disabled"], z_ = /* @__PURE__ */ He({
  __name: "KnowledgeQualityPanel",
  props: {
    personaId: {},
    knowledgeSpaceId: {},
    documents: {},
    disabled: { type: Boolean }
  },
  emits: ["retryFailed"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = te(null), i = te([]), l = te(!1), r = te("");
    let u = 0;
    const c = ae(() => Og(n.documents)), d = ae(() => {
      if (!s.value) return c.value;
      const L = Number(s.value.total_documents), y = Number(s.value.indexed_count ?? s.value.indexed_documents), C = Number(s.value.in_progress_count ?? s.value.processing_documents), O = Number(s.value.failed_count ?? s.value.failed_documents);
      return [L, y, C, O].every(Number.isFinite) ? { total: L, indexed: y, processing: C, failed: O, attention: C + O } : c.value;
    }), f = ae(() => i.value[0] || null), p = ae(() => Rg(s.value)), v = ae(() => {
      var y, C, O;
      const L = ((y = s.value) == null ? void 0 : y.chunk_count) ?? ((C = s.value) == null ? void 0 : C.chunks) ?? ((O = s.value) == null ? void 0 : O.total_chunks);
      return Number.isFinite(Number(L)) ? Number(L) : null;
    }), w = ae(() => {
      var L, y, C;
      return ((y = (L = f.value) == null ? void 0 : L.metrics) == null ? void 0 : y.accepted_rate) ?? ((C = f.value) == null ? void 0 : C.accepted_rate);
    }), S = ae(() => {
      var C;
      const L = (C = s.value) == null ? void 0 : C.index_version_counts;
      if (!L) return "";
      const [y] = Object.keys(L).filter((O) => O && O !== "unknown");
      return y ? `索引 ${y}` : "";
    });
    function P(L) {
      if (!L) return "";
      const y = new Date(L);
      return Number.isNaN(y.getTime()) ? L : new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(y);
    }
    async function z() {
      const L = ++u;
      if (!n.knowledgeSpaceId) {
        s.value = null, i.value = [], r.value = "";
        return;
      }
      l.value = !0, r.value = "";
      const [y, C] = await Promise.allSettled([
        nm(n.knowledgeSpaceId),
        om(n.personaId)
      ]);
      if (L !== u) return;
      y.status === "fulfilled" && (s.value = y.value), C.status === "fulfilled" && (i.value = C.value);
      const O = [y, C].find((q) => q.status === "rejected");
      (O == null ? void 0 : O.status) === "rejected" && (r.value = O.reason instanceof Error ? O.reason.message : String(O.reason)), l.value = !1;
    }
    return ze(() => [n.personaId, n.knowledgeSpaceId], z), St(z), (L, y) => {
      var C, O, q;
      return g(), k("section", g_, [
        a("header", m_, [
          y[1] || (y[1] = a("div", null, [
            a("span", null, "知识质量"),
            a("strong", null, "处理与评测")
          ], -1)),
          a("button", {
            type: "button",
            class: "knowledge-quality-refresh",
            disabled: l.value || L.disabled || !L.knowledgeSpaceId,
            title: "刷新知识质量",
            onClick: z
          }, [
            se(H(qt), {
              size: 13,
              class: ye({ "is-spinning": l.value })
            }, null, 8, ["class"]),
            a("span", null, T(l.value ? "读取中" : "刷新"), 1)
          ], 8, y_)
        ]),
        a("div", b_, [
          a("div", null, [
            a("strong", null, T(d.value.total), 1),
            y[2] || (y[2] = a("span", null, "资料", -1))
          ]),
          a("div", null, [
            a("strong", null, T(d.value.indexed), 1),
            y[3] || (y[3] = a("span", null, "已索引", -1))
          ]),
          a("div", {
            class: ye({ "has-attention": d.value.attention > 0 })
          }, [
            a("strong", null, T(d.value.attention), 1),
            y[4] || (y[4] = a("span", null, "需处理", -1))
          ], 2)
        ]),
        a("div", __, [
          a("div", w_, [
            y[5] || (y[5] = a("span", null, "处理报告", -1)),
            a("b", {
              class: ye({ "is-attention": d.value.attention > 0 })
            }, T(p.value), 3)
          ]),
          (C = s.value) != null && C.summary ? (g(), k("p", k_, T(s.value.summary), 1)) : oe("", !0),
          v.value !== null || S.value ? (g(), k("p", E_, [
            v.value !== null ? (g(), k("span", C_, T(v.value) + " 个片段", 1)) : oe("", !0),
            v.value !== null && S.value ? (g(), k("span", S_, " · ")) : oe("", !0),
            S.value ? (g(), k("span", x_, T(S.value), 1)) : oe("", !0),
            (O = s.value) != null && O.latest_updated_at || (q = s.value) != null && q.updated_at ? (g(), k("span", $_, " · " + T(P(s.value.latest_updated_at || s.value.updated_at)) + " 更新", 1)) : oe("", !0)
          ])) : s.value ? oe("", !0) : (g(), k("p", I_, "暂无处理报告，当前先显示资料状态。"))
        ]),
        a("div", N_, [
          a("div", T_, [
            y[6] || (y[6] = a("span", null, "最近评测", -1)),
            f.value ? (g(), k("b", M_, T(H(Lg)(f.value.status)), 1)) : oe("", !0)
          ]),
          f.value ? (g(), k(Se, { key: 0 }, [
            f.value.summary ? (g(), k("p", P_, T(f.value.summary), 1)) : oe("", !0),
            a("div", O_, [
              w.value !== void 0 && w.value !== null ? (g(), k("span", A_, [
                y[7] || (y[7] = _e("通过率 ")),
                a("strong", null, T(H(Dg)(w.value)), 1)
              ])) : oe("", !0),
              f.value.created_at ? (g(), k("span", D_, T(P(f.value.created_at)), 1)) : oe("", !0)
            ])
          ], 64)) : (g(), k("p", R_, "暂无已保存评测，可从下方进入完整 RAG 评测。"))
        ]),
        r.value ? (g(), k("p", L_, "读取质量数据失败：" + T(r.value), 1)) : oe("", !0),
        d.value.failed > 0 ? (g(), k("button", {
          key: 1,
          type: "button",
          class: "inspect-action",
          disabled: L.disabled,
          onClick: y[0] || (y[0] = (Y) => o("retryFailed"))
        }, "重新整理失败资料", 8, V_)) : oe("", !0)
      ]);
    };
  }
}), F_ = ["aria-busy"], B_ = {
  key: 0,
  class: "inspect-fields"
}, H_ = ["value"], U_ = ["value"], j_ = ["value"], G_ = { class: "inspect-fieldset" }, q_ = ["value"], Y_ = ["value"], X_ = ["value"], K_ = ["value"], W_ = ["value"], Z_ = { class: "inline-check" }, J_ = ["checked"], Q_ = {
  key: 1,
  class: "inspect-stack rag-inspector"
}, e0 = ["disabled"], t0 = {
  key: 0,
  class: "pending-files"
}, n0 = ["onClick"], o0 = ["onClick"], s0 = ["disabled"], i0 = { class: "document-items" }, l0 = { class: "document-actions" }, r0 = ["onClick"], a0 = ["onClick"], u0 = ["onClick"], c0 = {
  key: 2,
  class: "inspect-stack"
}, d0 = {
  key: 3,
  class: "inspect-stack"
}, f0 = {
  key: 4,
  class: "inspect-fields"
}, p0 = { class: "inline-check" }, h0 = ["checked"], v0 = { class: "inline-check" }, g0 = ["checked"], m0 = ["value"], y0 = ["value"], b0 = ["value"], _0 = { class: "inspect-button-row" }, w0 = ["disabled"], k0 = {
  key: 5,
  class: "live2d-model-library"
}, E0 = { class: "live2d-binding-summary" }, C0 = ["disabled"], S0 = { class: "live2d-library-actions" }, x0 = ["disabled"], $0 = ["disabled"], I0 = { class: "live2d-model-heading" }, N0 = {
  key: 0,
  class: "live2d-model-items"
}, T0 = { class: "live2d-model-copy" }, M0 = { class: "live2d-model-state" }, P0 = {
  key: 0,
  type: "button",
  disabled: "",
  class: "is-bound"
}, O0 = ["disabled", "title", "onClick"], A0 = {
  key: 1,
  class: "live2d-model-empty"
}, D0 = {
  key: 6,
  class: "inspect-fields"
}, R0 = { key: 0 }, L0 = ["value"], V0 = { key: 1 }, z0 = {
  key: 2,
  class: "dependency-list"
}, F0 = {
  key: 7,
  class: "inspect-fields"
}, B0 = { class: "inline-check" }, H0 = ["checked", "disabled"], U0 = /* @__PURE__ */ He({
  __name: "NodeInspector",
  props: {
    node: {},
    draft: {},
    disabled: { type: Boolean },
    uploadCompleteToken: {},
    canDelete: { type: Boolean }
  },
  emits: ["profile", "capability", "server", "upload", "deleteDocument", "retryDocument", "retryFailed", "deletePersona", "previewVoice", "openVoiceStudio", "openRagEval", "previewDocument", "previewLocalFile", "refreshLive2d", "openLive2dDirectory"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = te([]), i = te(""), l = te(0), r = ae(() => {
      var B;
      return ((B = n.node) == null ? void 0 : B.data.kind) || "persona";
    }), u = ae(() => n.draft.capabilities.packages.find((B) => {
      var M;
      return B.id === ((M = n.node) == null ? void 0 : M.id);
    })), c = ae(() => r.value === "mcp" ? n.draft.grants.servers.find((B) => {
      var M;
      return `mcp:${B.name}` === ((M = n.node) == null ? void 0 : M.id);
    }) : void 0), d = ae(() => {
      const B = n.node ? n.draft.capabilities.overrides[n.node.id] : void 0;
      return B === !0 ? "allow" : B === !1 ? "deny" : "inherit";
    }), f = ae(() => {
      var B, M;
      return String(((M = (B = n.draft.persona.profile) == null ? void 0 : B.live2d) == null ? void 0 : M.model) || "");
    }), p = ae(() => {
      var B;
      return ((B = n.draft.resources) == null ? void 0 : B.live2dModels) || [];
    }), v = ae(() => {
      var B;
      return { available: "可用", partial: "部分可用", unassigned: "未分配", blocked: "不可用", pending: "等待中", error: "异常" }[((B = n.node) == null ? void 0 : B.data.status) || "blocked"];
    });
    function w(B) {
      return B.kind === "cubism2" ? "Cubism 2" : B.moc_version ? `MOC3 v${B.moc_version}` : "Cubism / MOC3";
    }
    function S(B, M) {
      const X = bt(n.draft.persona), ie = { ...X.profile || {} };
      B === "name" ? X.name = String(M) : ie[B] = M, X.profile = ie, o("profile", X);
    }
    function P(B, M) {
      const X = bt(n.draft.persona), ie = { ...X.profile || {} };
      ie.tts = { ...ie.tts || {}, [B]: M }, X.profile = ie, o("profile", X);
    }
    function z(B) {
      const M = bt(n.draft.persona), X = { ...M.profile || {} };
      X.live2d = { ...X.live2d || {}, model: B }, M.profile = X, o("profile", M);
    }
    const L = ae(() => {
      var B;
      return ((B = n.draft.persona.profile) == null ? void 0 : B.rag) || {};
    });
    function y(B, M) {
      const X = bt(n.draft.persona), ie = { ...X.profile || {} };
      ie.rag = { ...ie.rag || {}, [B]: M }, X.profile = ie, o("profile", X);
    }
    function C(B) {
      s.value = Array.from(B.target.files || []);
    }
    function O(B) {
      var M;
      s.value = Array.from(((M = B.dataTransfer) == null ? void 0 : M.files) || []);
    }
    function q(B) {
      s.value = s.value.filter((M, X) => X !== B);
    }
    function Y() {
      n.disabled || !s.value.length && !i.value.trim() || o("upload", s.value, i.value);
    }
    return ze(() => n.uploadCompleteToken, () => {
      s.value = [], i.value = "", l.value += 1;
    }), (B, M) => {
      var X, ie, D, G, h, A, $, V, U, ee, ce, ve, re, be, pe, de, Ie, Me;
      return g(), k("aside", {
        class: ye(["node-inspector", { "is-disabled": B.disabled }]),
        "aria-busy": B.disabled
      }, [
        a("header", null, [
          a("div", null, [
            a("strong", null, T(((X = B.node) == null ? void 0 : X.data.label) || "角色配置"), 1),
            a("small", null, T((ie = B.node) == null ? void 0 : ie.data.summary), 1)
          ]),
          B.node ? (g(), k("span", {
            key: 0,
            class: ye(`inspect-status status-${B.node.data.status}`)
          }, T(v.value), 3)) : oe("", !0)
        ]),
        r.value === "profile" ? (g(), k("div", B_, [
          a("label", null, [
            M[25] || (M[25] = a("span", null, "角色名称", -1)),
            a("input", {
              value: B.draft.persona.name,
              onInput: M[0] || (M[0] = (ne) => S("name", ne.target.value))
            }, null, 40, H_)
          ]),
          a("label", null, [
            M[26] || (M[26] = a("span", null, "角色人设", -1)),
            a("textarea", {
              rows: "7",
              value: String(((D = B.draft.persona.profile) == null ? void 0 : D.description) || ""),
              onInput: M[1] || (M[1] = (ne) => S("description", ne.target.value))
            }, null, 40, U_)
          ]),
          a("label", null, [
            M[28] || (M[28] = a("span", null, "回复语言", -1)),
            a("select", {
              value: String(((G = B.draft.persona.profile) == null ? void 0 : G.reply_language) || ""),
              onChange: M[2] || (M[2] = (ne) => S("reply_language", ne.target.value))
            }, M[27] || (M[27] = [
              a("option", { value: "" }, "跟随对话", -1),
              a("option", { value: "zh" }, "中文", -1),
              a("option", { value: "ja" }, "日语", -1),
              a("option", { value: "en" }, "英语", -1)
            ]), 40, j_)
          ]),
          a("fieldset", G_, [
            M[36] || (M[36] = a("legend", null, "知识检索", -1)),
            a("label", null, [
              M[30] || (M[30] = a("span", null, "检索预设", -1)),
              a("select", {
                value: String(L.value.profile || "deep"),
                onChange: M[3] || (M[3] = (ne) => y("profile", ne.target.value))
              }, M[29] || (M[29] = [
                a("option", { value: "precise" }, "精准检索", -1),
                a("option", { value: "deep" }, "深度检索", -1),
                a("option", { value: "custom" }, "自定义", -1)
              ]), 40, q_)
            ]),
            L.value.profile === "custom" ? (g(), k(Se, { key: 0 }, [
              a("label", null, [
                M[31] || (M[31] = a("span", null, "初始召回 K", -1)),
                a("input", {
                  type: "number",
                  min: "1",
                  max: "100",
                  value: L.value.retrieval_k || 20,
                  onChange: M[4] || (M[4] = (ne) => y("retrieval_k", Number(ne.target.value)))
                }, null, 40, Y_)
              ]),
              a("label", null, [
                M[32] || (M[32] = a("span", null, "重排保留 K", -1)),
                a("input", {
                  type: "number",
                  min: "1",
                  max: "100",
                  value: L.value.rerank_k || 8,
                  onChange: M[5] || (M[5] = (ne) => y("rerank_k", Number(ne.target.value)))
                }, null, 40, X_)
              ]),
              a("label", null, [
                M[33] || (M[33] = a("span", null, "最终上下文 K", -1)),
                a("input", {
                  type: "number",
                  min: "1",
                  max: "30",
                  value: L.value.final_context_k || 8,
                  onChange: M[6] || (M[6] = (ne) => y("final_context_k", Number(ne.target.value)))
                }, null, 40, K_)
              ]),
              a("label", null, [
                M[34] || (M[34] = a("span", null, "证据 Token 预算", -1)),
                a("input", {
                  type: "number",
                  min: "256",
                  max: "20000",
                  step: "256",
                  value: L.value.evidence_token_budget || 4500,
                  onChange: M[7] || (M[7] = (ne) => y("evidence_token_budget", Number(ne.target.value)))
                }, null, 40, W_)
              ]),
              a("label", Z_, [
                a("input", {
                  type: "checkbox",
                  checked: L.value.allow_neighbors !== !1,
                  onChange: M[8] || (M[8] = (ne) => y("allow_neighbors", ne.target.checked))
                }, null, 40, J_),
                M[35] || (M[35] = a("span", null, "允许补充相邻片段", -1))
              ])
            ], 64)) : oe("", !0),
            M[37] || (M[37] = a("small", null, "查询时直接使用这里保存的参数，不额外调用模型判断检索模式。", -1))
          ]),
          B.canDelete !== !1 && !((h = B.draft.persona.profile) != null && h.builtin) && !((A = B.draft.persona.profile) != null && A.guide) ? (g(), k("button", {
            key: 0,
            type: "button",
            class: "inspect-danger",
            onClick: M[9] || (M[9] = (ne) => o("deletePersona"))
          }, [
            se(H(Gn), { size: 15 }),
            M[38] || (M[38] = _e("删除当前角色"))
          ])) : oe("", !0)
        ])) : r.value === "rag" ? (g(), k("div", Q_, [
          a("p", null, T(B.draft.documents.length) + " 份资料已关联到角色知识空间。", 1),
          a("label", {
            class: "document-picker",
            onDragover: M[10] || (M[10] = $t(() => {
            }, ["prevent"])),
            onDrop: $t(O, ["prevent"])
          }, [
            se(H(Fl), { size: 15 }),
            a("span", null, T(s.value.length ? `已选择 ${s.value.length} 个文件` : "选择或拖入资料文件"), 1),
            (g(), k("input", {
              key: l.value,
              type: "file",
              multiple: "",
              disabled: B.disabled,
              onChange: C
            }, null, 40, e0))
          ], 32),
          s.value.length ? (g(), k("ul", t0, [
            (g(!0), k(Se, null, Ve(s.value, (ne, xe) => (g(), k("li", {
              key: `${ne.name}-${ne.size}-${xe}`
            }, [
              a("span", null, T(ne.name), 1),
              a("span", null, [
                a("button", {
                  type: "button",
                  title: "上传前预览",
                  onClick: (Ee) => o("previewLocalFile", ne)
                }, [
                  se(H(ef), { size: 14 })
                ], 8, n0),
                a("button", {
                  type: "button",
                  title: "移除",
                  onClick: (Ee) => q(xe)
                }, [
                  se(H(Gn), { size: 14 })
                ], 8, o0)
              ])
            ]))), 128))
          ])) : oe("", !0),
          a("label", null, [
            M[39] || (M[39] = a("span", null, "补充文本", -1)),
            De(a("textarea", {
              "onUpdate:modelValue": M[11] || (M[11] = (ne) => i.value = ne),
              rows: "3",
              placeholder: "直接写入角色知识库"
            }, null, 512), [
              [Ge, i.value]
            ])
          ]),
          a("button", {
            type: "button",
            class: "inspect-action",
            disabled: B.disabled || !s.value.length && !i.value.trim(),
            onClick: Y
          }, [
            se(H(Fl), { size: 15 }),
            _e(T(B.disabled ? "处理中" : "写入知识库"), 1)
          ], 8, s0),
          a("ul", i0, [
            (g(!0), k(Se, null, Ve(B.draft.documents, (ne) => (g(), k("li", {
              key: String(ne.id)
            }, [
              a("div", null, [
                a("b", null, T(ne.original_filename || ne.original_name || ne.id), 1),
                a("span", {
                  class: ye(`document-state is-${H(Bg)(String(ne.status || ""))}`)
                }, T(H(zg)(String(ne.status || ""))), 3)
              ]),
              a("span", l0, [
                a("button", {
                  type: "button",
                  class: "is-text",
                  title: "查看资料",
                  onClick: (xe) => o("previewDocument", ne)
                }, "查看", 8, r0),
                H(Fg)(String(ne.status || "")) ? (g(), k("button", {
                  key: 0,
                  type: "button",
                  class: "is-text",
                  title: "重新整理",
                  onClick: (xe) => o("retryDocument", String(ne.id))
                }, "重试", 8, a0)) : oe("", !0),
                a("button", {
                  type: "button",
                  class: "is-text is-danger",
                  title: "删除资料",
                  onClick: (xe) => o("deleteDocument", String(ne.id))
                }, "删除", 8, u0)
              ])
            ]))), 128))
          ]),
          se(z_, {
            "persona-id": B.draft.persona.id,
            "knowledge-space-id": B.draft.persona.knowledge_space_id,
            documents: B.draft.documents,
            disabled: B.disabled,
            onRetryFailed: M[12] || (M[12] = (ne) => B.$emit("retryFailed"))
          }, null, 8, ["persona-id", "knowledge-space-id", "documents", "disabled"]),
          a("button", {
            type: "button",
            class: "inspect-action",
            onClick: M[13] || (M[13] = (ne) => o("openRagEval"))
          }, [
            se(H(Ll), { size: 15 }),
            M[40] || (M[40] = _e("前往 RAG 评测"))
          ])
        ])) : r.value === "memory" ? (g(), k("div", c0, M[41] || (M[41] = [
          a("p", null, "对话窗口内的短期记忆只服务当前会话；长期记忆会写入这个角色，供之后的对话继续使用。", -1),
          a("small", null, "清空记忆请在对话页的会话设置里操作，避免误清其他窗口。", -1)
        ]))) : r.value === "extensions" ? (g(), k("div", d0, [
          a("p", null, "当前角色可配置 " + T(B.draft.capabilities.packages.length) + " 项扩展能力。", 1),
          M[42] || (M[42] = a("small", null, "选择画布中的 Skill 或 Tool 查看依赖并设置角色策略；依赖只在选中时展开。", -1))
        ])) : r.value === "voice" ? (g(), k("div", f0, [
          a("label", p0, [
            a("input", {
              type: "checkbox",
              checked: !!((V = ($ = B.draft.persona.profile) == null ? void 0 : $.tts) != null && V.enabled),
              onChange: M[14] || (M[14] = (ne) => P("enabled", ne.target.checked))
            }, null, 40, h0),
            M[43] || (M[43] = a("span", null, "生成语音", -1))
          ]),
          a("label", v0, [
            a("input", {
              type: "checkbox",
              checked: !!((ee = (U = B.draft.persona.profile) == null ? void 0 : U.tts) != null && ee.auto_play),
              onChange: M[15] || (M[15] = (ne) => P("auto_play", ne.target.checked))
            }, null, 40, g0),
            M[44] || (M[44] = a("span", null, "自动播放", -1))
          ]),
          a("label", null, [
            M[46] || (M[46] = a("span", null, "角色音色", -1)),
            a("select", {
              value: String(((ve = (ce = B.draft.persona.profile) == null ? void 0 : ce.tts) == null ? void 0 : ve.voice_asset_id) || ""),
              onChange: M[16] || (M[16] = (ne) => P("voice_asset_id", ne.target.value))
            }, [
              M[45] || (M[45] = a("option", { value: "" }, "不绑定音色", -1)),
              (g(!0), k(Se, null, Ve((re = B.draft.resources) == null ? void 0 : re.voiceAssets, (ne) => (g(), k("option", {
                key: ne.id,
                value: ne.id
              }, T(ne.name), 9, y0))), 128))
            ], 40, m0)
          ]),
          a("label", null, [
            M[48] || (M[48] = a("span", null, "输出语言", -1)),
            a("select", {
              value: String(((pe = (be = B.draft.persona.profile) == null ? void 0 : be.tts) == null ? void 0 : pe.output_language) || "auto"),
              onChange: M[17] || (M[17] = (ne) => P("output_language", ne.target.value))
            }, M[47] || (M[47] = [
              a("option", { value: "auto" }, "自动", -1),
              a("option", { value: "zh" }, "中文", -1),
              a("option", { value: "ja" }, "日语", -1),
              a("option", { value: "en" }, "英语", -1)
            ]), 40, b0)
          ]),
          a("div", _0, [
            a("button", {
              type: "button",
              class: "inspect-action",
              disabled: !((Ie = (de = B.draft.persona.profile) == null ? void 0 : de.tts) != null && Ie.voice_asset_id),
              onClick: M[18] || (M[18] = (ne) => o("previewVoice"))
            }, [
              se(H($r), { size: 15 }),
              M[49] || (M[49] = _e("试听"))
            ], 8, w0),
            a("button", {
              type: "button",
              class: "inspect-action",
              onClick: M[19] || (M[19] = (ne) => o("openVoiceStudio"))
            }, [
              se(H(Ll), { size: 15 }),
              M[50] || (M[50] = _e("声音工坊"))
            ])
          ])
        ])) : r.value === "live2d" ? (g(), k("div", k0, [
          a("section", E0, [
            M[51] || (M[51] = a("span", null, "当前角色绑定", -1)),
            a("strong", null, T(f.value || "未绑定模型"), 1),
            f.value ? (g(), k("button", {
              key: 0,
              type: "button",
              disabled: B.disabled,
              onClick: M[20] || (M[20] = (ne) => z(""))
            }, "解除绑定", 8, C0)) : oe("", !0)
          ]),
          a("div", S0, [
            a("button", {
              type: "button",
              disabled: B.disabled,
              title: "重新扫描模型",
              onClick: M[21] || (M[21] = (ne) => o("refreshLive2d"))
            }, [
              se(H(qt), { size: 15 }),
              M[52] || (M[52] = _e("刷新"))
            ], 8, x0),
            a("button", {
              type: "button",
              disabled: B.disabled,
              title: "打开 Live2D 模型文件夹",
              onClick: M[22] || (M[22] = (ne) => o("openLive2dDirectory"))
            }, [
              se(H(ss), { size: 15 }),
              M[53] || (M[53] = _e("打开文件夹"))
            ], 8, $0)
          ]),
          a("div", I0, [
            M[54] || (M[54] = a("strong", null, "已安装模型", -1)),
            a("span", null, T(p.value.length) + " 个", 1)
          ]),
          p.value.length ? (g(), k("ul", N0, [
            (g(!0), k(Se, null, Ve(p.value, (ne) => (g(), k("li", {
              key: ne.id,
              class: ye({ bound: f.value === ne.id, incompatible: ne.compatible === !1 })
            }, [
              a("div", T0, [
                a("strong", null, T(ne.name), 1),
                a("span", null, T(w(ne)), 1)
              ]),
              a("div", M0, [
                a("span", {
                  class: ye(ne.compatible === !1 ? "is-error" : "is-compatible")
                }, T(ne.compatible === !1 ? "不兼容" : "兼容"), 3),
                f.value === ne.id ? (g(), k("button", P0, [
                  se(H(ro), { size: 14 }),
                  M[55] || (M[55] = _e("已绑定"))
                ])) : (g(), k("button", {
                  key: 1,
                  type: "button",
                  disabled: B.disabled || ne.compatible === !1,
                  title: ne.compatible === !1 ? "当前 Live2D 运行时不支持此 MOC3 版本" : `绑定 ${ne.name}`,
                  onClick: (xe) => z(ne.id)
                }, "绑定", 8, O0))
              ])
            ], 2))), 128))
          ])) : (g(), k("div", A0, M[56] || (M[56] = [
            a("strong", null, "尚未发现模型", -1),
            a("p", null, "将模型文件夹放入 data/live2d 后刷新。", -1)
          ]))),
          M[57] || (M[57] = a("p", { class: "live2d-save-hint" }, "绑定修改会随页面顶部“保存配置”一起生效。", -1))
        ])) : r.value === "skill" || r.value === "tool" ? (g(), k("div", D0, [
          u.value ? (g(), k("label", R0, [
            M[59] || (M[59] = a("span", null, "角色策略", -1)),
            a("select", {
              value: d.value,
              onChange: M[23] || (M[23] = (ne) => o("capability", B.node.id, ne.target.value))
            }, M[58] || (M[58] = [
              a("option", { value: "inherit" }, "继承默认", -1),
              a("option", { value: "allow" }, "允许", -1),
              a("option", { value: "deny" }, "禁用", -1)
            ]), 40, L0)
          ])) : (g(), k("p", V0, "此 Tool 由上级能力包管理，不单独保存开关。")),
          u.value ? (g(), k("div", z0, [
            M[60] || (M[60] = a("b", null, "依赖", -1)),
            (g(!0), k(Se, null, Ve(u.value.dependencies, (ne) => (g(), k("p", {
              key: ne.id || ne.name
            }, [
              a("span", null, T(ne.name), 1),
              a("em", null, T(ne.server || ne.source), 1)
            ]))), 128))
          ])) : oe("", !0)
        ])) : r.value === "mcp" && c.value ? (g(), k("div", F0, [
          a("label", B0, [
            a("input", {
              type: "checkbox",
              checked: c.value.authorized,
              disabled: c.value.global,
              onChange: M[24] || (M[24] = (ne) => o("server", c.value.name, ne.target.checked))
            }, null, 40, H0),
            a("span", null, T(c.value.global ? "全局授权" : "允许当前角色使用"), 1)
          ]),
          a("p", null, T(c.value.description || "MCP 服务"), 1),
          a("small", null, "连接状态：" + T({ connected: "已连接", disconnected: "未连接", connecting: "连接中", disabled: "已关闭", error: "异常", unknown: "未知" }[String(((Me = c.value.status) == null ? void 0 : Me.status) || "unknown")] || "未知"), 1)
        ])) : oe("", !0)
      ], 10, F_);
    };
  }
});
function Ri(e) {
  return fr() ? (Gs(e), !0) : !1;
}
function En(e) {
  return typeof e == "function" ? e() : H(e);
}
const j0 = typeof window < "u" && typeof document < "u", G0 = (e) => typeof e < "u", q0 = Object.prototype.toString, Y0 = (e) => q0.call(e) === "[object Object]", X0 = () => {
};
function K0(e, t) {
  function n(...o) {
    return new Promise((s, i) => {
      Promise.resolve(e(() => t.apply(this, o), { fn: t, thisArg: this, args: o })).then(s).catch(i);
    });
  }
  return n;
}
const Of = (e) => e();
function W0(e = Of) {
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
  return { isActive: mr(t), pause: n, resume: o, eventFilter: s };
}
function Ku(e, t = !1, n = "Timeout") {
  return new Promise((o, s) => {
    setTimeout(t ? () => s(n) : o, e);
  });
}
function Z0(e, t, n = {}) {
  const {
    eventFilter: o = Of,
    ...s
  } = n;
  return ze(
    e,
    K0(
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
  } = n, { eventFilter: i, pause: l, resume: r, isActive: u } = W0(o);
  return { stop: Z0(
    e,
    t,
    {
      ...s,
      eventFilter: i
    }
  ), pause: l, resume: r, isActive: u };
}
function J0(e, t = {}) {
  if (!at(e))
    return $h(e);
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
function jl(e, t = !1) {
  function n(f, { flush: p = "sync", deep: v = !1, timeout: w, throwOnTimeout: S } = {}) {
    let P = null;
    const L = [new Promise((y) => {
      P = ze(
        e,
        (C) => {
          f(C) !== t && (P == null || P(), y(C));
        },
        {
          flush: p,
          deep: v,
          immediate: !0
        }
      );
    })];
    return w != null && L.push(
      Ku(w, S).then(() => En(e)).finally(() => P == null ? void 0 : P())
    ), Promise.race(L);
  }
  function o(f, p) {
    if (!at(f))
      return n((C) => C === f, p);
    const { flush: v = "sync", deep: w = !1, timeout: S, throwOnTimeout: P } = p ?? {};
    let z = null;
    const y = [new Promise((C) => {
      z = ze(
        [e, f],
        ([O, q]) => {
          t !== (O === q) && (z == null || z(), C(O));
        },
        {
          flush: v,
          deep: w,
          immediate: !0
        }
      );
    })];
    return S != null && y.push(
      Ku(S, P).then(() => En(e)).finally(() => (z == null || z(), En(e)))
    ), Promise.race(y);
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
    return n((v) => {
      const w = Array.from(v);
      return w.includes(f) || w.includes(En(f));
    }, p);
  }
  function c(f) {
    return d(1, f);
  }
  function d(f = 1, p) {
    let v = -1;
    return n(() => (v += 1, v >= f), p);
  }
  return Array.isArray(En(e)) ? {
    toMatch: n,
    toContains: u,
    changed: c,
    changedTimes: d,
    get not() {
      return jl(e, !t);
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
      return jl(e, !t);
    }
  };
}
function Gl(e) {
  return jl(e);
}
function Q0(e) {
  var t;
  const n = En(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const Af = j0 ? window : void 0;
function Df(...e) {
  let t, n, o, s;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, o, s] = e, t = Af) : [t, n, o, s] = e, !t)
    return X0;
  Array.isArray(n) || (n = [n]), Array.isArray(o) || (o = [o]);
  const i = [], l = () => {
    i.forEach((d) => d()), i.length = 0;
  }, r = (d, f, p, v) => (d.addEventListener(f, p, v), () => d.removeEventListener(f, p, v)), u = ze(
    () => [Q0(t), En(s)],
    ([d, f]) => {
      if (l(), !d)
        return;
      const p = Y0(f) ? { ...f } : f;
      i.push(
        ...n.flatMap((v) => o.map((w) => r(d, v, w, p)))
      );
    },
    { immediate: !0, flush: "post" }
  ), c = () => {
    u(), l();
  };
  return Ri(c), c;
}
function ew(e) {
  return typeof e == "function" ? e : typeof e == "string" ? (t) => t.key === e : Array.isArray(e) ? (t) => e.includes(t.key) : () => !0;
}
function Wu(...e) {
  let t, n, o = {};
  e.length === 3 ? (t = e[0], n = e[1], o = e[2]) : e.length === 2 ? typeof e[1] == "object" ? (t = !0, n = e[0], o = e[1]) : (t = e[0], n = e[1]) : (t = !0, n = e[0]);
  const {
    target: s = Af,
    eventName: i = "keydown",
    passive: l = !1,
    dedupe: r = !1
  } = o, u = ew(t);
  return Df(s, i, (d) => {
    d.repeat && En(r) || u(d) && n(d);
  }, l);
}
function tw(e) {
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
  } = o, v = zo(), w = n || (v == null ? void 0 : v.emit) || ((s = v == null ? void 0 : v.$emit) == null ? void 0 : s.bind(v)) || ((l = (i = v == null ? void 0 : v.proxy) == null ? void 0 : i.$emit) == null ? void 0 : l.bind(v == null ? void 0 : v.proxy));
  let S = c;
  t || (t = "modelValue"), S = S || `update:${t.toString()}`;
  const P = (y) => r ? typeof r == "function" ? r(y) : tw(y) : y, z = () => G0(e[t]) ? P(e[t]) : f, L = (y) => {
    p ? p(y) && w(S, y) : w(S, y);
  };
  if (u) {
    const y = z(), C = te(y);
    let O = !1;
    return ze(
      () => e[t],
      (q) => {
        O || (O = !0, C.value = P(q), _t(() => O = !1));
      }
    ), ze(
      C,
      (q) => {
        !O && (q !== e[t] || d) && L(q);
      },
      { deep: d }
    ), C;
  } else
    return ae({
      get() {
        return z();
      },
      set(y) {
        L(y);
      }
    });
}
var nw = { value: () => {
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
function ow(e, t) {
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
    var n = this._, o = ow(e + "", n), s, i = -1, l = o.length;
    if (arguments.length < 2) {
      for (; ++i < l; )
        if ((s = (e = o[i]).type) && (s = sw(n[s], e.name)))
          return s;
      return;
    }
    if (t != null && typeof t != "function")
      throw new Error("invalid callback: " + t);
    for (; ++i < l; )
      if (s = (e = o[i]).type)
        n[s] = Zu(n[s], e.name, t);
      else if (t == null)
        for (s in n)
          n[s] = Zu(n[s], e.name, null);
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
function sw(e, t) {
  for (var n = 0, o = e.length, s; n < o; ++n)
    if ((s = e[n]).name === t)
      return s.value;
}
function Zu(e, t, n) {
  for (var o = 0, s = e.length; o < s; ++o)
    if (e[o].name === t) {
      e[o] = nw, e = e.slice(0, o).concat(e.slice(o + 1));
      break;
    }
  return n != null && e.push({ name: t, value: n }), e;
}
var ql = "http://www.w3.org/1999/xhtml";
const Ju = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: ql,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Vi(e) {
  var t = e += "", n = t.indexOf(":");
  return n >= 0 && (t = e.slice(0, n)) !== "xmlns" && (e = e.slice(n + 1)), Ju.hasOwnProperty(t) ? { space: Ju[t], local: e } : e;
}
function iw(e) {
  return function() {
    var t = this.ownerDocument, n = this.namespaceURI;
    return n === ql && t.documentElement.namespaceURI === ql ? t.createElement(e) : t.createElementNS(n, e);
  };
}
function lw(e) {
  return function() {
    return this.ownerDocument.createElementNS(e.space, e.local);
  };
}
function Rf(e) {
  var t = Vi(e);
  return (t.local ? lw : iw)(t);
}
function rw() {
}
function Or(e) {
  return e == null ? rw : function() {
    return this.querySelector(e);
  };
}
function aw(e) {
  typeof e != "function" && (e = Or(e));
  for (var t = this._groups, n = t.length, o = new Array(n), s = 0; s < n; ++s)
    for (var i = t[s], l = i.length, r = o[s] = new Array(l), u, c, d = 0; d < l; ++d)
      (u = i[d]) && (c = e.call(u, u.__data__, d, i)) && ("__data__" in u && (c.__data__ = u.__data__), r[d] = c);
  return new jt(o, this._parents);
}
function uw(e) {
  return e == null ? [] : Array.isArray(e) ? e : Array.from(e);
}
function cw() {
  return [];
}
function Lf(e) {
  return e == null ? cw : function() {
    return this.querySelectorAll(e);
  };
}
function dw(e) {
  return function() {
    return uw(e.apply(this, arguments));
  };
}
function fw(e) {
  typeof e == "function" ? e = dw(e) : e = Lf(e);
  for (var t = this._groups, n = t.length, o = [], s = [], i = 0; i < n; ++i)
    for (var l = t[i], r = l.length, u, c = 0; c < r; ++c)
      (u = l[c]) && (o.push(e.call(u, u.__data__, c, l)), s.push(u));
  return new jt(o, s);
}
function Vf(e) {
  return function() {
    return this.matches(e);
  };
}
function zf(e) {
  return function(t) {
    return t.matches(e);
  };
}
var pw = Array.prototype.find;
function hw(e) {
  return function() {
    return pw.call(this.children, e);
  };
}
function vw() {
  return this.firstElementChild;
}
function gw(e) {
  return this.select(e == null ? vw : hw(typeof e == "function" ? e : zf(e)));
}
var mw = Array.prototype.filter;
function yw() {
  return Array.from(this.children);
}
function bw(e) {
  return function() {
    return mw.call(this.children, e);
  };
}
function _w(e) {
  return this.selectAll(e == null ? yw : bw(typeof e == "function" ? e : zf(e)));
}
function ww(e) {
  typeof e != "function" && (e = Vf(e));
  for (var t = this._groups, n = t.length, o = new Array(n), s = 0; s < n; ++s)
    for (var i = t[s], l = i.length, r = o[s] = [], u, c = 0; c < l; ++c)
      (u = i[c]) && e.call(u, u.__data__, c, i) && r.push(u);
  return new jt(o, this._parents);
}
function Ff(e) {
  return new Array(e.length);
}
function kw() {
  return new jt(this._enter || this._groups.map(Ff), this._parents);
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
function Ew(e) {
  return function() {
    return e;
  };
}
function Cw(e, t, n, o, s, i) {
  for (var l = 0, r, u = t.length, c = i.length; l < c; ++l)
    (r = t[l]) ? (r.__data__ = i[l], o[l] = r) : n[l] = new fi(e, i[l]);
  for (; l < u; ++l)
    (r = t[l]) && (s[l] = r);
}
function Sw(e, t, n, o, s, i, l) {
  var r, u, c = /* @__PURE__ */ new Map(), d = t.length, f = i.length, p = new Array(d), v;
  for (r = 0; r < d; ++r)
    (u = t[r]) && (p[r] = v = l.call(u, u.__data__, r, t) + "", c.has(v) ? s[r] = u : c.set(v, u));
  for (r = 0; r < f; ++r)
    v = l.call(e, i[r], r, i) + "", (u = c.get(v)) ? (o[r] = u, u.__data__ = i[r], c.delete(v)) : n[r] = new fi(e, i[r]);
  for (r = 0; r < d; ++r)
    (u = t[r]) && c.get(p[r]) === u && (s[r] = u);
}
function xw(e) {
  return e.__data__;
}
function $w(e, t) {
  if (!arguments.length)
    return Array.from(this, xw);
  var n = t ? Sw : Cw, o = this._parents, s = this._groups;
  typeof e != "function" && (e = Ew(e));
  for (var i = s.length, l = new Array(i), r = new Array(i), u = new Array(i), c = 0; c < i; ++c) {
    var d = o[c], f = s[c], p = f.length, v = Iw(e.call(d, d && d.__data__, c, o)), w = v.length, S = r[c] = new Array(w), P = l[c] = new Array(w), z = u[c] = new Array(p);
    n(d, f, S, P, z, v, t);
    for (var L = 0, y = 0, C, O; L < w; ++L)
      if (C = S[L]) {
        for (L >= y && (y = L + 1); !(O = P[y]) && ++y < w; )
          ;
        C._next = O || null;
      }
  }
  return l = new jt(l, o), l._enter = r, l._exit = u, l;
}
function Iw(e) {
  return typeof e == "object" && "length" in e ? e : Array.from(e);
}
function Nw() {
  return new jt(this._exit || this._groups.map(Ff), this._parents);
}
function Tw(e, t, n) {
  var o = this.enter(), s = this, i = this.exit();
  return typeof e == "function" ? (o = e(o), o && (o = o.selection())) : o = o.append(e + ""), t != null && (s = t(s), s && (s = s.selection())), n == null ? i.remove() : n(i), o && s ? o.merge(s).order() : s;
}
function Mw(e) {
  for (var t = e.selection ? e.selection() : e, n = this._groups, o = t._groups, s = n.length, i = o.length, l = Math.min(s, i), r = new Array(s), u = 0; u < l; ++u)
    for (var c = n[u], d = o[u], f = c.length, p = r[u] = new Array(f), v, w = 0; w < f; ++w)
      (v = c[w] || d[w]) && (p[w] = v);
  for (; u < s; ++u)
    r[u] = n[u];
  return new jt(r, this._parents);
}
function Pw() {
  for (var e = this._groups, t = -1, n = e.length; ++t < n; )
    for (var o = e[t], s = o.length - 1, i = o[s], l; --s >= 0; )
      (l = o[s]) && (i && l.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(l, i), i = l);
  return this;
}
function Ow(e) {
  e || (e = Aw);
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
function Aw(e, t) {
  return e < t ? -1 : e > t ? 1 : e >= t ? 0 : NaN;
}
function Dw() {
  var e = arguments[0];
  return arguments[0] = this, e.apply(null, arguments), this;
}
function Rw() {
  return Array.from(this);
}
function Lw() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], s = 0, i = o.length; s < i; ++s) {
      var l = o[s];
      if (l)
        return l;
    }
  return null;
}
function Vw() {
  let e = 0;
  for (const t of this)
    ++e;
  return e;
}
function zw() {
  return !this.node();
}
function Fw(e) {
  for (var t = this._groups, n = 0, o = t.length; n < o; ++n)
    for (var s = t[n], i = 0, l = s.length, r; i < l; ++i)
      (r = s[i]) && e.call(r, r.__data__, i, s);
  return this;
}
function Bw(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function Hw(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function Uw(e, t) {
  return function() {
    this.setAttribute(e, t);
  };
}
function jw(e, t) {
  return function() {
    this.setAttributeNS(e.space, e.local, t);
  };
}
function Gw(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttribute(e) : this.setAttribute(e, n);
  };
}
function qw(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? this.removeAttributeNS(e.space, e.local) : this.setAttributeNS(e.space, e.local, n);
  };
}
function Yw(e, t) {
  var n = Vi(e);
  if (arguments.length < 2) {
    var o = this.node();
    return n.local ? o.getAttributeNS(n.space, n.local) : o.getAttribute(n);
  }
  return this.each((t == null ? n.local ? Hw : Bw : typeof t == "function" ? n.local ? qw : Gw : n.local ? jw : Uw)(n, t));
}
function Bf(e) {
  return e.ownerDocument && e.ownerDocument.defaultView || e.document && e || e.defaultView;
}
function Xw(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function Kw(e, t, n) {
  return function() {
    this.style.setProperty(e, t, n);
  };
}
function Ww(e, t, n) {
  return function() {
    var o = t.apply(this, arguments);
    o == null ? this.style.removeProperty(e) : this.style.setProperty(e, o, n);
  };
}
function Zw(e, t, n) {
  return arguments.length > 1 ? this.each((t == null ? Xw : typeof t == "function" ? Ww : Kw)(e, t, n ?? "")) : Do(this.node(), e);
}
function Do(e, t) {
  return e.style.getPropertyValue(t) || Bf(e).getComputedStyle(e, null).getPropertyValue(t);
}
function Jw(e) {
  return function() {
    delete this[e];
  };
}
function Qw(e, t) {
  return function() {
    this[e] = t;
  };
}
function ek(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    n == null ? delete this[e] : this[e] = n;
  };
}
function tk(e, t) {
  return arguments.length > 1 ? this.each((t == null ? Jw : typeof t == "function" ? ek : Qw)(e, t)) : this.node()[e];
}
function Hf(e) {
  return e.trim().split(/^|\s+/);
}
function Ar(e) {
  return e.classList || new Uf(e);
}
function Uf(e) {
  this._node = e, this._names = Hf(e.getAttribute("class") || "");
}
Uf.prototype = {
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
function jf(e, t) {
  for (var n = Ar(e), o = -1, s = t.length; ++o < s; )
    n.add(t[o]);
}
function Gf(e, t) {
  for (var n = Ar(e), o = -1, s = t.length; ++o < s; )
    n.remove(t[o]);
}
function nk(e) {
  return function() {
    jf(this, e);
  };
}
function ok(e) {
  return function() {
    Gf(this, e);
  };
}
function sk(e, t) {
  return function() {
    (t.apply(this, arguments) ? jf : Gf)(this, e);
  };
}
function ik(e, t) {
  var n = Hf(e + "");
  if (arguments.length < 2) {
    for (var o = Ar(this.node()), s = -1, i = n.length; ++s < i; )
      if (!o.contains(n[s]))
        return !1;
    return !0;
  }
  return this.each((typeof t == "function" ? sk : t ? nk : ok)(n, t));
}
function lk() {
  this.textContent = "";
}
function rk(e) {
  return function() {
    this.textContent = e;
  };
}
function ak(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.textContent = t ?? "";
  };
}
function uk(e) {
  return arguments.length ? this.each(e == null ? lk : (typeof e == "function" ? ak : rk)(e)) : this.node().textContent;
}
function ck() {
  this.innerHTML = "";
}
function dk(e) {
  return function() {
    this.innerHTML = e;
  };
}
function fk(e) {
  return function() {
    var t = e.apply(this, arguments);
    this.innerHTML = t ?? "";
  };
}
function pk(e) {
  return arguments.length ? this.each(e == null ? ck : (typeof e == "function" ? fk : dk)(e)) : this.node().innerHTML;
}
function hk() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function vk() {
  return this.each(hk);
}
function gk() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function mk() {
  return this.each(gk);
}
function yk(e) {
  var t = typeof e == "function" ? e : Rf(e);
  return this.select(function() {
    return this.appendChild(t.apply(this, arguments));
  });
}
function bk() {
  return null;
}
function _k(e, t) {
  var n = typeof e == "function" ? e : Rf(e), o = t == null ? bk : typeof t == "function" ? t : Or(t);
  return this.select(function() {
    return this.insertBefore(n.apply(this, arguments), o.apply(this, arguments) || null);
  });
}
function wk() {
  var e = this.parentNode;
  e && e.removeChild(this);
}
function kk() {
  return this.each(wk);
}
function Ek() {
  var e = this.cloneNode(!1), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Ck() {
  var e = this.cloneNode(!0), t = this.parentNode;
  return t ? t.insertBefore(e, this.nextSibling) : e;
}
function Sk(e) {
  return this.select(e ? Ck : Ek);
}
function xk(e) {
  return arguments.length ? this.property("__data__", e) : this.node().__data__;
}
function $k(e) {
  return function(t) {
    e.call(this, t, this.__data__);
  };
}
function Ik(e) {
  return e.trim().split(/^|\s+/).map(function(t) {
    var n = "", o = t.indexOf(".");
    return o >= 0 && (n = t.slice(o + 1), t = t.slice(0, o)), { type: t, name: n };
  });
}
function Nk(e) {
  return function() {
    var t = this.__on;
    if (t) {
      for (var n = 0, o = -1, s = t.length, i; n < s; ++n)
        i = t[n], (!e.type || i.type === e.type) && i.name === e.name ? this.removeEventListener(i.type, i.listener, i.options) : t[++o] = i;
      ++o ? t.length = o : delete this.__on;
    }
  };
}
function Tk(e, t, n) {
  return function() {
    var o = this.__on, s, i = $k(t);
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
function Mk(e, t, n) {
  var o = Ik(e + ""), s, i = o.length, l;
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
  for (r = t ? Tk : Nk, s = 0; s < i; ++s)
    this.each(r(o[s], t, n));
  return this;
}
function qf(e, t, n) {
  var o = Bf(e), s = o.CustomEvent;
  typeof s == "function" ? s = new s(t, n) : (s = o.document.createEvent("Event"), n ? (s.initEvent(t, n.bubbles, n.cancelable), s.detail = n.detail) : s.initEvent(t, !1, !1)), e.dispatchEvent(s);
}
function Pk(e, t) {
  return function() {
    return qf(this, e, t);
  };
}
function Ok(e, t) {
  return function() {
    return qf(this, e, t.apply(this, arguments));
  };
}
function Ak(e, t) {
  return this.each((typeof t == "function" ? Ok : Pk)(e, t));
}
function* Dk() {
  for (var e = this._groups, t = 0, n = e.length; t < n; ++t)
    for (var o = e[t], s = 0, i = o.length, l; s < i; ++s)
      (l = o[s]) && (yield l);
}
var Yf = [null];
function jt(e, t) {
  this._groups = e, this._parents = t;
}
function Ss() {
  return new jt([[document.documentElement]], Yf);
}
function Rk() {
  return this;
}
jt.prototype = Ss.prototype = {
  constructor: jt,
  select: aw,
  selectAll: fw,
  selectChild: gw,
  selectChildren: _w,
  filter: ww,
  data: $w,
  enter: kw,
  exit: Nw,
  join: Tw,
  merge: Mw,
  selection: Rk,
  order: Pw,
  sort: Ow,
  call: Dw,
  nodes: Rw,
  node: Lw,
  size: Vw,
  empty: zw,
  each: Fw,
  attr: Yw,
  style: Zw,
  property: tk,
  classed: ik,
  text: uk,
  html: pk,
  raise: vk,
  lower: mk,
  append: yk,
  insert: _k,
  remove: kk,
  clone: Sk,
  datum: xk,
  on: Mk,
  dispatch: Ak,
  [Symbol.iterator]: Dk
};
function Zt(e) {
  return typeof e == "string" ? new jt([[document.querySelector(e)]], [document.documentElement]) : new jt([[e]], Yf);
}
function Lk(e) {
  let t;
  for (; t = e.sourceEvent; )
    e = t;
  return e;
}
function rn(e, t) {
  if (e = Lk(e), t === void 0 && (t = e.currentTarget), t) {
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
const Vk = { passive: !1 }, ps = { capture: !0, passive: !1 };
function fl(e) {
  e.stopImmediatePropagation();
}
function No(e) {
  e.preventDefault(), e.stopImmediatePropagation();
}
function Xf(e) {
  var t = e.document.documentElement, n = Zt(e).on("dragstart.drag", No, ps);
  "onselectstart" in t ? n.on("selectstart.drag", No, ps) : (t.__noselect = t.style.MozUserSelect, t.style.MozUserSelect = "none");
}
function Kf(e, t) {
  var n = e.document.documentElement, o = Zt(e).on("dragstart.drag", null);
  t && (o.on("click.drag", No, ps), setTimeout(function() {
    o.on("click.drag", null);
  }, 0)), "onselectstart" in n ? o.on("selectstart.drag", null) : (n.style.MozUserSelect = n.__noselect, delete n.__noselect);
}
const Ds = (e) => () => e;
function Yl(e, {
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
Yl.prototype.on = function() {
  var e = this._.on.apply(this._, arguments);
  return e === this._ ? this : e;
};
function zk(e) {
  return !e.ctrlKey && !e.button;
}
function Fk() {
  return this.parentNode;
}
function Bk(e, t) {
  return t ?? { x: e.x, y: e.y };
}
function Hk() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function Uk() {
  var e = zk, t = Fk, n = Bk, o = Hk, s = {}, i = Li("start", "drag", "end"), l = 0, r, u, c, d, f = 0;
  function p(C) {
    C.on("mousedown.drag", v).filter(o).on("touchstart.drag", P).on("touchmove.drag", z, Vk).on("touchend.drag touchcancel.drag", L).style("touch-action", "none").style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  function v(C, O) {
    if (!(d || !e.call(this, C, O))) {
      var q = y(this, t.call(this, C, O), C, O, "mouse");
      q && (Zt(C.view).on("mousemove.drag", w, ps).on("mouseup.drag", S, ps), Xf(C.view), fl(C), c = !1, r = C.clientX, u = C.clientY, q("start", C));
    }
  }
  function w(C) {
    if (No(C), !c) {
      var O = C.clientX - r, q = C.clientY - u;
      c = O * O + q * q > f;
    }
    s.mouse("drag", C);
  }
  function S(C) {
    Zt(C.view).on("mousemove.drag mouseup.drag", null), Kf(C.view, c), No(C), s.mouse("end", C);
  }
  function P(C, O) {
    if (e.call(this, C, O)) {
      var q = C.changedTouches, Y = t.call(this, C, O), B = q.length, M, X;
      for (M = 0; M < B; ++M)
        (X = y(this, Y, C, O, q[M].identifier, q[M])) && (fl(C), X("start", C, q[M]));
    }
  }
  function z(C) {
    var O = C.changedTouches, q = O.length, Y, B;
    for (Y = 0; Y < q; ++Y)
      (B = s[O[Y].identifier]) && (No(C), B("drag", C, O[Y]));
  }
  function L(C) {
    var O = C.changedTouches, q = O.length, Y, B;
    for (d && clearTimeout(d), d = setTimeout(function() {
      d = null;
    }, 500), Y = 0; Y < q; ++Y)
      (B = s[O[Y].identifier]) && (fl(C), B("end", C, O[Y]));
  }
  function y(C, O, q, Y, B, M) {
    var X = i.copy(), ie = rn(M || q, O), D, G, h;
    if ((h = n.call(C, new Yl("beforestart", {
      sourceEvent: q,
      target: p,
      identifier: B,
      active: l,
      x: ie[0],
      y: ie[1],
      dx: 0,
      dy: 0,
      dispatch: X
    }), Y)) != null)
      return D = h.x - ie[0] || 0, G = h.y - ie[1] || 0, function A($, V, U) {
        var ee = ie, ce;
        switch ($) {
          case "start":
            s[B] = A, ce = l++;
            break;
          case "end":
            delete s[B], --l;
          case "drag":
            ie = rn(U || V, O), ce = l;
            break;
        }
        X.call(
          $,
          C,
          new Yl($, {
            sourceEvent: V,
            subject: h,
            target: p,
            identifier: B,
            active: ce,
            x: ie[0] + D,
            y: ie[1] + G,
            dx: ie[0] - ee[0],
            dy: ie[1] - ee[1],
            dispatch: X
          }),
          Y
        );
      };
  }
  return p.filter = function(C) {
    return arguments.length ? (e = typeof C == "function" ? C : Ds(!!C), p) : e;
  }, p.container = function(C) {
    return arguments.length ? (t = typeof C == "function" ? C : Ds(C), p) : t;
  }, p.subject = function(C) {
    return arguments.length ? (n = typeof C == "function" ? C : Ds(C), p) : n;
  }, p.touchable = function(C) {
    return arguments.length ? (o = typeof C == "function" ? C : Ds(!!C), p) : o;
  }, p.on = function() {
    var C = i.on.apply(i, arguments);
    return C === i ? p : C;
  }, p.clickDistance = function(C) {
    return arguments.length ? (f = (C = +C) * C, p) : Math.sqrt(f);
  }, p;
}
function Dr(e, t, n) {
  e.prototype = t.prototype = n, n.constructor = e;
}
function Wf(e, t) {
  var n = Object.create(e.prototype);
  for (var o in t)
    n[o] = t[o];
  return n;
}
function xs() {
}
var hs = 0.7, pi = 1 / hs, To = "\\s*([+-]?\\d+)\\s*", vs = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", pn = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", jk = /^#([0-9a-f]{3,8})$/, Gk = new RegExp(`^rgb\\(${To},${To},${To}\\)$`), qk = new RegExp(`^rgb\\(${pn},${pn},${pn}\\)$`), Yk = new RegExp(`^rgba\\(${To},${To},${To},${vs}\\)$`), Xk = new RegExp(`^rgba\\(${pn},${pn},${pn},${vs}\\)$`), Kk = new RegExp(`^hsl\\(${vs},${pn},${pn}\\)$`), Wk = new RegExp(`^hsla\\(${vs},${pn},${pn},${vs}\\)$`), Qu = {
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
Dr(xs, gs, {
  copy(e) {
    return Object.assign(new this.constructor(), this, e);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ec,
  // Deprecated! Use color.formatHex.
  formatHex: ec,
  formatHex8: Zk,
  formatHsl: Jk,
  formatRgb: tc,
  toString: tc
});
function ec() {
  return this.rgb().formatHex();
}
function Zk() {
  return this.rgb().formatHex8();
}
function Jk() {
  return Zf(this).formatHsl();
}
function tc() {
  return this.rgb().formatRgb();
}
function gs(e) {
  var t, n;
  return e = (e + "").trim().toLowerCase(), (t = jk.exec(e)) ? (n = t[1].length, t = parseInt(t[1], 16), n === 6 ? nc(t) : n === 3 ? new Ft(t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, (t & 15) << 4 | t & 15, 1) : n === 8 ? Rs(t >> 24 & 255, t >> 16 & 255, t >> 8 & 255, (t & 255) / 255) : n === 4 ? Rs(t >> 12 & 15 | t >> 8 & 240, t >> 8 & 15 | t >> 4 & 240, t >> 4 & 15 | t & 240, ((t & 15) << 4 | t & 15) / 255) : null) : (t = Gk.exec(e)) ? new Ft(t[1], t[2], t[3], 1) : (t = qk.exec(e)) ? new Ft(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, 1) : (t = Yk.exec(e)) ? Rs(t[1], t[2], t[3], t[4]) : (t = Xk.exec(e)) ? Rs(t[1] * 255 / 100, t[2] * 255 / 100, t[3] * 255 / 100, t[4]) : (t = Kk.exec(e)) ? ic(t[1], t[2] / 100, t[3] / 100, 1) : (t = Wk.exec(e)) ? ic(t[1], t[2] / 100, t[3] / 100, t[4]) : Qu.hasOwnProperty(e) ? nc(Qu[e]) : e === "transparent" ? new Ft(NaN, NaN, NaN, 0) : null;
}
function nc(e) {
  return new Ft(e >> 16 & 255, e >> 8 & 255, e & 255, 1);
}
function Rs(e, t, n, o) {
  return o <= 0 && (e = t = n = NaN), new Ft(e, t, n, o);
}
function Qk(e) {
  return e instanceof xs || (e = gs(e)), e ? (e = e.rgb(), new Ft(e.r, e.g, e.b, e.opacity)) : new Ft();
}
function Xl(e, t, n, o) {
  return arguments.length === 1 ? Qk(e) : new Ft(e, t, n, o ?? 1);
}
function Ft(e, t, n, o) {
  this.r = +e, this.g = +t, this.b = +n, this.opacity = +o;
}
Dr(Ft, Xl, Wf(xs, {
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
  hex: oc,
  // Deprecated! Use color.formatHex.
  formatHex: oc,
  formatHex8: e2,
  formatRgb: sc,
  toString: sc
}));
function oc() {
  return `#${so(this.r)}${so(this.g)}${so(this.b)}`;
}
function e2() {
  return `#${so(this.r)}${so(this.g)}${so(this.b)}${so((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function sc() {
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
function ic(e, t, n, o) {
  return o <= 0 ? e = t = n = NaN : n <= 0 || n >= 1 ? e = t = NaN : t <= 0 && (e = NaN), new Jt(e, t, n, o);
}
function Zf(e) {
  if (e instanceof Jt)
    return new Jt(e.h, e.s, e.l, e.opacity);
  if (e instanceof xs || (e = gs(e)), !e)
    return new Jt();
  if (e instanceof Jt)
    return e;
  e = e.rgb();
  var t = e.r / 255, n = e.g / 255, o = e.b / 255, s = Math.min(t, n, o), i = Math.max(t, n, o), l = NaN, r = i - s, u = (i + s) / 2;
  return r ? (t === i ? l = (n - o) / r + (n < o) * 6 : n === i ? l = (o - t) / r + 2 : l = (t - n) / r + 4, r /= u < 0.5 ? i + s : 2 - i - s, l *= 60) : r = u > 0 && u < 1 ? 0 : l, new Jt(l, r, u, e.opacity);
}
function t2(e, t, n, o) {
  return arguments.length === 1 ? Zf(e) : new Jt(e, t, n, o ?? 1);
}
function Jt(e, t, n, o) {
  this.h = +e, this.s = +t, this.l = +n, this.opacity = +o;
}
Dr(Jt, t2, Wf(xs, {
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
    return new Jt(lc(this.h), Ls(this.s), Ls(this.l), hi(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const e = hi(this.opacity);
    return `${e === 1 ? "hsl(" : "hsla("}${lc(this.h)}, ${Ls(this.s) * 100}%, ${Ls(this.l) * 100}%${e === 1 ? ")" : `, ${e})`}`;
  }
}));
function lc(e) {
  return e = (e || 0) % 360, e < 0 ? e + 360 : e;
}
function Ls(e) {
  return Math.max(0, Math.min(1, e || 0));
}
function pl(e, t, n) {
  return (e < 60 ? t + (n - t) * e / 60 : e < 180 ? n : e < 240 ? t + (n - t) * (240 - e) / 60 : t) * 255;
}
const Jf = (e) => () => e;
function n2(e, t) {
  return function(n) {
    return e + n * t;
  };
}
function o2(e, t, n) {
  return e = Math.pow(e, n), t = Math.pow(t, n) - e, n = 1 / n, function(o) {
    return Math.pow(e + o * t, n);
  };
}
function s2(e) {
  return (e = +e) == 1 ? Qf : function(t, n) {
    return n - t ? o2(t, n, e) : Jf(isNaN(t) ? n : t);
  };
}
function Qf(e, t) {
  var n = t - e;
  return n ? n2(e, n) : Jf(isNaN(e) ? t : e);
}
const rc = function e(t) {
  var n = s2(t);
  function o(s, i) {
    var l = n((s = Xl(s)).r, (i = Xl(i)).r), r = n(s.g, i.g), u = n(s.b, i.b), c = Qf(s.opacity, i.opacity);
    return function(d) {
      return s.r = l(d), s.g = r(d), s.b = u(d), s.opacity = c(d), s + "";
    };
  }
  return o.gamma = e, o;
}(1);
function Dn(e, t) {
  return e = +e, t = +t, function(n) {
    return e * (1 - n) + t * n;
  };
}
var Kl = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, hl = new RegExp(Kl.source, "g");
function i2(e) {
  return function() {
    return e;
  };
}
function l2(e) {
  return function(t) {
    return e(t) + "";
  };
}
function r2(e, t) {
  var n = Kl.lastIndex = hl.lastIndex = 0, o, s, i, l = -1, r = [], u = [];
  for (e = e + "", t = t + ""; (o = Kl.exec(e)) && (s = hl.exec(t)); )
    (i = s.index) > n && (i = t.slice(n, i), r[l] ? r[l] += i : r[++l] = i), (o = o[0]) === (s = s[0]) ? r[l] ? r[l] += s : r[++l] = s : (r[++l] = null, u.push({ i: l, x: Dn(o, s) })), n = hl.lastIndex;
  return n < t.length && (i = t.slice(n), r[l] ? r[l] += i : r[++l] = i), r.length < 2 ? u[0] ? l2(u[0].x) : i2(t) : (t = u.length, function(c) {
    for (var d = 0, f; d < t; ++d)
      r[(f = u[d]).i] = f.x(c);
    return r.join("");
  });
}
var ac = 180 / Math.PI, Wl = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function ep(e, t, n, o, s, i) {
  var l, r, u;
  return (l = Math.sqrt(e * e + t * t)) && (e /= l, t /= l), (u = e * n + t * o) && (n -= e * u, o -= t * u), (r = Math.sqrt(n * n + o * o)) && (n /= r, o /= r, u /= r), e * o < t * n && (e = -e, t = -t, u = -u, l = -l), {
    translateX: s,
    translateY: i,
    rotate: Math.atan2(t, e) * ac,
    skewX: Math.atan(u) * ac,
    scaleX: l,
    scaleY: r
  };
}
var Vs;
function a2(e) {
  const t = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(e + "");
  return t.isIdentity ? Wl : ep(t.a, t.b, t.c, t.d, t.e, t.f);
}
function u2(e) {
  return e == null || (Vs || (Vs = document.createElementNS("http://www.w3.org/2000/svg", "g")), Vs.setAttribute("transform", e), !(e = Vs.transform.baseVal.consolidate())) ? Wl : (e = e.matrix, ep(e.a, e.b, e.c, e.d, e.e, e.f));
}
function tp(e, t, n, o) {
  function s(c) {
    return c.length ? c.pop() + " " : "";
  }
  function i(c, d, f, p, v, w) {
    if (c !== f || d !== p) {
      var S = v.push("translate(", null, t, null, n);
      w.push({ i: S - 4, x: Dn(c, f) }, { i: S - 2, x: Dn(d, p) });
    } else (f || p) && v.push("translate(" + f + t + p + n);
  }
  function l(c, d, f, p) {
    c !== d ? (c - d > 180 ? d += 360 : d - c > 180 && (c += 360), p.push({ i: f.push(s(f) + "rotate(", null, o) - 2, x: Dn(c, d) })) : d && f.push(s(f) + "rotate(" + d + o);
  }
  function r(c, d, f, p) {
    c !== d ? p.push({ i: f.push(s(f) + "skewX(", null, o) - 2, x: Dn(c, d) }) : d && f.push(s(f) + "skewX(" + d + o);
  }
  function u(c, d, f, p, v, w) {
    if (c !== f || d !== p) {
      var S = v.push(s(v) + "scale(", null, ",", null, ")");
      w.push({ i: S - 4, x: Dn(c, f) }, { i: S - 2, x: Dn(d, p) });
    } else (f !== 1 || p !== 1) && v.push(s(v) + "scale(" + f + "," + p + ")");
  }
  return function(c, d) {
    var f = [], p = [];
    return c = e(c), d = e(d), i(c.translateX, c.translateY, d.translateX, d.translateY, f, p), l(c.rotate, d.rotate, f, p), r(c.skewX, d.skewX, f, p), u(c.scaleX, c.scaleY, d.scaleX, d.scaleY, f, p), c = d = null, function(v) {
      for (var w = -1, S = p.length, P; ++w < S; )
        f[(P = p[w]).i] = P.x(v);
      return f.join("");
    };
  };
}
var c2 = tp(a2, "px, ", "px)", "deg)"), d2 = tp(u2, ", ", ")", ")"), f2 = 1e-12;
function uc(e) {
  return ((e = Math.exp(e)) + 1 / e) / 2;
}
function p2(e) {
  return ((e = Math.exp(e)) - 1 / e) / 2;
}
function h2(e) {
  return ((e = Math.exp(2 * e)) - 1) / (e + 1);
}
const v2 = function e(t, n, o) {
  function s(i, l) {
    var r = i[0], u = i[1], c = i[2], d = l[0], f = l[1], p = l[2], v = d - r, w = f - u, S = v * v + w * w, P, z;
    if (S < f2)
      z = Math.log(p / c) / t, P = function(Y) {
        return [
          r + Y * v,
          u + Y * w,
          c * Math.exp(t * Y * z)
        ];
      };
    else {
      var L = Math.sqrt(S), y = (p * p - c * c + o * S) / (2 * c * n * L), C = (p * p - c * c - o * S) / (2 * p * n * L), O = Math.log(Math.sqrt(y * y + 1) - y), q = Math.log(Math.sqrt(C * C + 1) - C);
      z = (q - O) / t, P = function(Y) {
        var B = Y * z, M = uc(O), X = c / (n * L) * (M * h2(t * B + O) - p2(O));
        return [
          r + X * v,
          u + X * w,
          c * M / uc(t * B + O)
        ];
      };
    }
    return P.duration = z * 1e3 * t / Math.SQRT2, P;
  }
  return s.rho = function(i) {
    var l = Math.max(1e-3, +i), r = l * l, u = r * r;
    return e(l, r, u);
  }, s;
}(Math.SQRT2, 2, 4);
var Ro = 0, Ko = 0, Go = 0, np = 1e3, vi, Wo, gi = 0, ho = 0, zi = 0, ms = typeof performance == "object" && performance.now ? performance : Date, op = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(e) {
  setTimeout(e, 17);
};
function Rr() {
  return ho || (op(g2), ho = ms.now() + zi);
}
function g2() {
  ho = 0;
}
function mi() {
  this._call = this._time = this._next = null;
}
mi.prototype = sp.prototype = {
  constructor: mi,
  restart: function(e, t, n) {
    if (typeof e != "function")
      throw new TypeError("callback is not a function");
    n = (n == null ? Rr() : +n) + (t == null ? 0 : +t), !this._next && Wo !== this && (Wo ? Wo._next = this : vi = this, Wo = this), this._call = e, this._time = n, Zl();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, Zl());
  }
};
function sp(e, t, n) {
  var o = new mi();
  return o.restart(e, t, n), o;
}
function m2() {
  Rr(), ++Ro;
  for (var e = vi, t; e; )
    (t = ho - e._time) >= 0 && e._call.call(void 0, t), e = e._next;
  --Ro;
}
function cc() {
  ho = (gi = ms.now()) + zi, Ro = Ko = 0;
  try {
    m2();
  } finally {
    Ro = 0, b2(), ho = 0;
  }
}
function y2() {
  var e = ms.now(), t = e - gi;
  t > np && (zi -= t, gi = e);
}
function b2() {
  for (var e, t = vi, n, o = 1 / 0; t; )
    t._call ? (o > t._time && (o = t._time), e = t, t = t._next) : (n = t._next, t._next = null, t = e ? e._next = n : vi = n);
  Wo = e, Zl(o);
}
function Zl(e) {
  if (!Ro) {
    Ko && (Ko = clearTimeout(Ko));
    var t = e - ho;
    t > 24 ? (e < 1 / 0 && (Ko = setTimeout(cc, e - ms.now() - zi)), Go && (Go = clearInterval(Go))) : (Go || (gi = ms.now(), Go = setInterval(y2, np)), Ro = 1, op(cc));
  }
}
function dc(e, t, n) {
  var o = new mi();
  return t = t == null ? 0 : +t, o.restart((s) => {
    o.stop(), e(s + t);
  }, t, n), o;
}
var _2 = Li("start", "end", "cancel", "interrupt"), w2 = [], ip = 0, fc = 1, Jl = 2, Qs = 3, pc = 4, Ql = 5, ei = 6;
function Fi(e, t, n, o, s, i) {
  var l = e.__transition;
  if (!l)
    e.__transition = {};
  else if (n in l)
    return;
  k2(e, n, {
    name: t,
    index: o,
    // For context during callback.
    group: s,
    // For context during callback.
    on: _2,
    tween: w2,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: ip
  });
}
function Lr(e, t) {
  var n = nn(e, t);
  if (n.state > ip)
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
function k2(e, t, n) {
  var o = e.__transition, s;
  o[t] = n, n.timer = sp(i, 0, n.time);
  function i(c) {
    n.state = fc, n.timer.restart(l, n.delay, n.time), n.delay <= c && l(c - n.delay);
  }
  function l(c) {
    var d, f, p, v;
    if (n.state !== fc)
      return u();
    for (d in o)
      if (v = o[d], v.name === n.name) {
        if (v.state === Qs)
          return dc(l);
        v.state === pc ? (v.state = ei, v.timer.stop(), v.on.call("interrupt", e, e.__data__, v.index, v.group), delete o[d]) : +d < t && (v.state = ei, v.timer.stop(), v.on.call("cancel", e, e.__data__, v.index, v.group), delete o[d]);
      }
    if (dc(function() {
      n.state === Qs && (n.state = pc, n.timer.restart(r, n.delay, n.time), r(c));
    }), n.state = Jl, n.on.call("start", e, e.__data__, n.index, n.group), n.state === Jl) {
      for (n.state = Qs, s = new Array(p = n.tween.length), d = 0, f = -1; d < p; ++d)
        (v = n.tween[d].value.call(e, e.__data__, n.index, n.group)) && (s[++f] = v);
      s.length = f + 1;
    }
  }
  function r(c) {
    for (var d = c < n.duration ? n.ease.call(null, c / n.duration) : (n.timer.restart(u), n.state = Ql, 1), f = -1, p = s.length; ++f < p; )
      s[f].call(e, d);
    n.state === Ql && (n.on.call("end", e, e.__data__, n.index, n.group), u());
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
      s = o.state > Jl && o.state < Ql, o.state = ei, o.timer.stop(), o.on.call(s ? "interrupt" : "cancel", e, e.__data__, o.index, o.group), delete n[l];
    }
    i && delete e.__transition;
  }
}
function E2(e) {
  return this.each(function() {
    ti(this, e);
  });
}
function C2(e, t) {
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
function S2(e, t, n) {
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
function x2(e, t) {
  var n = this._id;
  if (e += "", arguments.length < 2) {
    for (var o = nn(this.node(), n).tween, s = 0, i = o.length, l; s < i; ++s)
      if ((l = o[s]).name === e)
        return l.value;
    return null;
  }
  return this.each((t == null ? C2 : S2)(n, e, t));
}
function Vr(e, t, n) {
  var o = e._id;
  return e.each(function() {
    var s = vn(this, o);
    (s.value || (s.value = {}))[t] = n.apply(this, arguments);
  }), function(s) {
    return nn(s, o).value[t];
  };
}
function lp(e, t) {
  var n;
  return (typeof t == "number" ? Dn : t instanceof gs ? rc : (n = gs(t)) ? (t = n, rc) : r2)(e, t);
}
function $2(e) {
  return function() {
    this.removeAttribute(e);
  };
}
function I2(e) {
  return function() {
    this.removeAttributeNS(e.space, e.local);
  };
}
function N2(e, t, n) {
  var o, s = n + "", i;
  return function() {
    var l = this.getAttribute(e);
    return l === s ? null : l === o ? i : i = t(o = l, n);
  };
}
function T2(e, t, n) {
  var o, s = n + "", i;
  return function() {
    var l = this.getAttributeNS(e.space, e.local);
    return l === s ? null : l === o ? i : i = t(o = l, n);
  };
}
function M2(e, t, n) {
  var o, s, i;
  return function() {
    var l, r = n(this), u;
    return r == null ? void this.removeAttribute(e) : (l = this.getAttribute(e), u = r + "", l === u ? null : l === o && u === s ? i : (s = u, i = t(o = l, r)));
  };
}
function P2(e, t, n) {
  var o, s, i;
  return function() {
    var l, r = n(this), u;
    return r == null ? void this.removeAttributeNS(e.space, e.local) : (l = this.getAttributeNS(e.space, e.local), u = r + "", l === u ? null : l === o && u === s ? i : (s = u, i = t(o = l, r)));
  };
}
function O2(e, t) {
  var n = Vi(e), o = n === "transform" ? d2 : lp;
  return this.attrTween(e, typeof t == "function" ? (n.local ? P2 : M2)(n, o, Vr(this, "attr." + e, t)) : t == null ? (n.local ? I2 : $2)(n) : (n.local ? T2 : N2)(n, o, t));
}
function A2(e, t) {
  return function(n) {
    this.setAttribute(e, t.call(this, n));
  };
}
function D2(e, t) {
  return function(n) {
    this.setAttributeNS(e.space, e.local, t.call(this, n));
  };
}
function R2(e, t) {
  var n, o;
  function s() {
    var i = t.apply(this, arguments);
    return i !== o && (n = (o = i) && D2(e, i)), n;
  }
  return s._value = t, s;
}
function L2(e, t) {
  var n, o;
  function s() {
    var i = t.apply(this, arguments);
    return i !== o && (n = (o = i) && A2(e, i)), n;
  }
  return s._value = t, s;
}
function V2(e, t) {
  var n = "attr." + e;
  if (arguments.length < 2)
    return (n = this.tween(n)) && n._value;
  if (t == null)
    return this.tween(n, null);
  if (typeof t != "function")
    throw new Error();
  var o = Vi(e);
  return this.tween(n, (o.local ? R2 : L2)(o, t));
}
function z2(e, t) {
  return function() {
    Lr(this, e).delay = +t.apply(this, arguments);
  };
}
function F2(e, t) {
  return t = +t, function() {
    Lr(this, e).delay = t;
  };
}
function B2(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? z2 : F2)(t, e)) : nn(this.node(), t).delay;
}
function H2(e, t) {
  return function() {
    vn(this, e).duration = +t.apply(this, arguments);
  };
}
function U2(e, t) {
  return t = +t, function() {
    vn(this, e).duration = t;
  };
}
function j2(e) {
  var t = this._id;
  return arguments.length ? this.each((typeof e == "function" ? H2 : U2)(t, e)) : nn(this.node(), t).duration;
}
function G2(e, t) {
  if (typeof t != "function")
    throw new Error();
  return function() {
    vn(this, e).ease = t;
  };
}
function q2(e) {
  var t = this._id;
  return arguments.length ? this.each(G2(t, e)) : nn(this.node(), t).ease;
}
function Y2(e, t) {
  return function() {
    var n = t.apply(this, arguments);
    if (typeof n != "function")
      throw new Error();
    vn(this, e).ease = n;
  };
}
function X2(e) {
  if (typeof e != "function")
    throw new Error();
  return this.each(Y2(this._id, e));
}
function K2(e) {
  typeof e != "function" && (e = Vf(e));
  for (var t = this._groups, n = t.length, o = new Array(n), s = 0; s < n; ++s)
    for (var i = t[s], l = i.length, r = o[s] = [], u, c = 0; c < l; ++c)
      (u = i[c]) && e.call(u, u.__data__, c, i) && r.push(u);
  return new In(o, this._parents, this._name, this._id);
}
function W2(e) {
  if (e._id !== this._id)
    throw new Error();
  for (var t = this._groups, n = e._groups, o = t.length, s = n.length, i = Math.min(o, s), l = new Array(o), r = 0; r < i; ++r)
    for (var u = t[r], c = n[r], d = u.length, f = l[r] = new Array(d), p, v = 0; v < d; ++v)
      (p = u[v] || c[v]) && (f[v] = p);
  for (; r < o; ++r)
    l[r] = t[r];
  return new In(l, this._parents, this._name, this._id);
}
function Z2(e) {
  return (e + "").trim().split(/^|\s+/).every(function(t) {
    var n = t.indexOf(".");
    return n >= 0 && (t = t.slice(0, n)), !t || t === "start";
  });
}
function J2(e, t, n) {
  var o, s, i = Z2(t) ? Lr : vn;
  return function() {
    var l = i(this, e), r = l.on;
    r !== o && (s = (o = r).copy()).on(t, n), l.on = s;
  };
}
function Q2(e, t) {
  var n = this._id;
  return arguments.length < 2 ? nn(this.node(), n).on.on(e) : this.each(J2(n, e, t));
}
function eE(e) {
  return function() {
    var t = this.parentNode;
    for (var n in this.__transition)
      if (+n !== e)
        return;
    t && t.removeChild(this);
  };
}
function tE() {
  return this.on("end.remove", eE(this._id));
}
function nE(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Or(e));
  for (var o = this._groups, s = o.length, i = new Array(s), l = 0; l < s; ++l)
    for (var r = o[l], u = r.length, c = i[l] = new Array(u), d, f, p = 0; p < u; ++p)
      (d = r[p]) && (f = e.call(d, d.__data__, p, r)) && ("__data__" in d && (f.__data__ = d.__data__), c[p] = f, Fi(c[p], t, n, p, c, nn(d, n)));
  return new In(i, this._parents, t, n);
}
function oE(e) {
  var t = this._name, n = this._id;
  typeof e != "function" && (e = Lf(e));
  for (var o = this._groups, s = o.length, i = [], l = [], r = 0; r < s; ++r)
    for (var u = o[r], c = u.length, d, f = 0; f < c; ++f)
      if (d = u[f]) {
        for (var p = e.call(d, d.__data__, f, u), v, w = nn(d, n), S = 0, P = p.length; S < P; ++S)
          (v = p[S]) && Fi(v, t, n, S, p, w);
        i.push(p), l.push(d);
      }
  return new In(i, l, t, n);
}
var sE = Ss.prototype.constructor;
function iE() {
  return new sE(this._groups, this._parents);
}
function lE(e, t) {
  var n, o, s;
  return function() {
    var i = Do(this, e), l = (this.style.removeProperty(e), Do(this, e));
    return i === l ? null : i === n && l === o ? s : s = t(n = i, o = l);
  };
}
function rp(e) {
  return function() {
    this.style.removeProperty(e);
  };
}
function rE(e, t, n) {
  var o, s = n + "", i;
  return function() {
    var l = Do(this, e);
    return l === s ? null : l === o ? i : i = t(o = l, n);
  };
}
function aE(e, t, n) {
  var o, s, i;
  return function() {
    var l = Do(this, e), r = n(this), u = r + "";
    return r == null && (u = r = (this.style.removeProperty(e), Do(this, e))), l === u ? null : l === o && u === s ? i : (s = u, i = t(o = l, r));
  };
}
function uE(e, t) {
  var n, o, s, i = "style." + t, l = "end." + i, r;
  return function() {
    var u = vn(this, e), c = u.on, d = u.value[i] == null ? r || (r = rp(t)) : void 0;
    (c !== n || s !== d) && (o = (n = c).copy()).on(l, s = d), u.on = o;
  };
}
function cE(e, t, n) {
  var o = (e += "") == "transform" ? c2 : lp;
  return t == null ? this.styleTween(e, lE(e, o)).on("end.style." + e, rp(e)) : typeof t == "function" ? this.styleTween(e, aE(e, o, Vr(this, "style." + e, t))).each(uE(this._id, e)) : this.styleTween(e, rE(e, o, t), n).on("end.style." + e, null);
}
function dE(e, t, n) {
  return function(o) {
    this.style.setProperty(e, t.call(this, o), n);
  };
}
function fE(e, t, n) {
  var o, s;
  function i() {
    var l = t.apply(this, arguments);
    return l !== s && (o = (s = l) && dE(e, l, n)), o;
  }
  return i._value = t, i;
}
function pE(e, t, n) {
  var o = "style." + (e += "");
  if (arguments.length < 2)
    return (o = this.tween(o)) && o._value;
  if (t == null)
    return this.tween(o, null);
  if (typeof t != "function")
    throw new Error();
  return this.tween(o, fE(e, t, n ?? ""));
}
function hE(e) {
  return function() {
    this.textContent = e;
  };
}
function vE(e) {
  return function() {
    var t = e(this);
    this.textContent = t ?? "";
  };
}
function gE(e) {
  return this.tween("text", typeof e == "function" ? vE(Vr(this, "text", e)) : hE(e == null ? "" : e + ""));
}
function mE(e) {
  return function(t) {
    this.textContent = e.call(this, t);
  };
}
function yE(e) {
  var t, n;
  function o() {
    var s = e.apply(this, arguments);
    return s !== n && (t = (n = s) && mE(s)), t;
  }
  return o._value = e, o;
}
function bE(e) {
  var t = "text";
  if (arguments.length < 1)
    return (t = this.tween(t)) && t._value;
  if (e == null)
    return this.tween(t, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(t, yE(e));
}
function _E() {
  for (var e = this._name, t = this._id, n = ap(), o = this._groups, s = o.length, i = 0; i < s; ++i)
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
  return new In(o, this._parents, e, n);
}
function wE() {
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
var kE = 0;
function In(e, t, n, o) {
  this._groups = e, this._parents = t, this._name = n, this._id = o;
}
function ap() {
  return ++kE;
}
var yn = Ss.prototype;
In.prototype = {
  constructor: In,
  select: nE,
  selectAll: oE,
  selectChild: yn.selectChild,
  selectChildren: yn.selectChildren,
  filter: K2,
  merge: W2,
  selection: iE,
  transition: _E,
  call: yn.call,
  nodes: yn.nodes,
  node: yn.node,
  size: yn.size,
  empty: yn.empty,
  each: yn.each,
  on: Q2,
  attr: O2,
  attrTween: V2,
  style: cE,
  styleTween: pE,
  text: gE,
  textTween: bE,
  remove: tE,
  tween: x2,
  delay: B2,
  duration: j2,
  ease: q2,
  easeVarying: X2,
  end: wE,
  [Symbol.iterator]: yn[Symbol.iterator]
};
function EE(e) {
  return ((e *= 2) <= 1 ? e * e * e : (e -= 2) * e * e + 2) / 2;
}
var CE = {
  time: null,
  // Set on use.
  delay: 0,
  duration: 250,
  ease: EE
};
function SE(e, t) {
  for (var n; !(n = e.__transition) || !(n = n[t]); )
    if (!(e = e.parentNode))
      throw new Error(`transition ${t} not found`);
  return n;
}
function xE(e) {
  var t, n;
  e instanceof In ? (t = e._id, e = e._name) : (t = ap(), (n = CE).time = Rr(), e = e == null ? null : e + "");
  for (var o = this._groups, s = o.length, i = 0; i < s; ++i)
    for (var l = o[i], r = l.length, u, c = 0; c < r; ++c)
      (u = l[c]) && Fi(u, e, t, c, l, n || SE(u, t));
  return new In(o, this._parents, e, t);
}
Ss.prototype.interrupt = E2;
Ss.prototype.transition = xE;
const zs = (e) => () => e;
function $E(e, {
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
function IE(e) {
  return (!e.ctrlKey || e.type === "wheel") && !e.button;
}
function NE() {
  var e = this;
  return e instanceof SVGElement ? (e = e.ownerSVGElement || e, e.hasAttribute("viewBox") ? (e = e.viewBox.baseVal, [[e.x, e.y], [e.x + e.width, e.y + e.height]]) : [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]]) : [[0, 0], [e.clientWidth, e.clientHeight]];
}
function hc() {
  return this.__zoom || Lo;
}
function TE(e) {
  return -e.deltaY * (e.deltaMode === 1 ? 0.05 : e.deltaMode ? 1 : 2e-3) * (e.ctrlKey ? 10 : 1);
}
function ME() {
  return navigator.maxTouchPoints || "ontouchstart" in this;
}
function PE(e, t, n) {
  var o = e.invertX(t[0][0]) - n[0][0], s = e.invertX(t[1][0]) - n[1][0], i = e.invertY(t[0][1]) - n[0][1], l = e.invertY(t[1][1]) - n[1][1];
  return e.translate(
    s > o ? (o + s) / 2 : Math.min(0, o) || Math.max(0, s),
    l > i ? (i + l) / 2 : Math.min(0, i) || Math.max(0, l)
  );
}
function OE() {
  var e = IE, t = NE, n = PE, o = TE, s = ME, i = [0, 1 / 0], l = [[-1 / 0, -1 / 0], [1 / 0, 1 / 0]], r = 250, u = v2, c = Li("start", "zoom", "end"), d, f, p, v = 500, w = 150, S = 0, P = 10;
  function z(h) {
    h.property("__zoom", hc).on("wheel.zoom", B, { passive: !1 }).on("mousedown.zoom", M).on("dblclick.zoom", X).filter(s).on("touchstart.zoom", ie).on("touchmove.zoom", D).on("touchend.zoom touchcancel.zoom", G).style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }
  z.transform = function(h, A, $, V) {
    var U = h.selection ? h.selection() : h;
    U.property("__zoom", hc), h !== U ? O(h, A, $, V) : U.interrupt().each(function() {
      q(this, arguments).event(V).start().zoom(null, typeof A == "function" ? A.apply(this, arguments) : A).end();
    });
  }, z.scaleBy = function(h, A, $, V) {
    z.scaleTo(h, function() {
      var U = this.__zoom.k, ee = typeof A == "function" ? A.apply(this, arguments) : A;
      return U * ee;
    }, $, V);
  }, z.scaleTo = function(h, A, $, V) {
    z.transform(h, function() {
      var U = t.apply(this, arguments), ee = this.__zoom, ce = $ == null ? C(U) : typeof $ == "function" ? $.apply(this, arguments) : $, ve = ee.invert(ce), re = typeof A == "function" ? A.apply(this, arguments) : A;
      return n(y(L(ee, re), ce, ve), U, l);
    }, $, V);
  }, z.translateBy = function(h, A, $, V) {
    z.transform(h, function() {
      return n(this.__zoom.translate(
        typeof A == "function" ? A.apply(this, arguments) : A,
        typeof $ == "function" ? $.apply(this, arguments) : $
      ), t.apply(this, arguments), l);
    }, null, V);
  }, z.translateTo = function(h, A, $, V, U) {
    z.transform(h, function() {
      var ee = t.apply(this, arguments), ce = this.__zoom, ve = V == null ? C(ee) : typeof V == "function" ? V.apply(this, arguments) : V;
      return n(Lo.translate(ve[0], ve[1]).scale(ce.k).translate(
        typeof A == "function" ? -A.apply(this, arguments) : -A,
        typeof $ == "function" ? -$.apply(this, arguments) : -$
      ), ee, l);
    }, V, U);
  };
  function L(h, A) {
    return A = Math.max(i[0], Math.min(i[1], A)), A === h.k ? h : new Cn(A, h.x, h.y);
  }
  function y(h, A, $) {
    var V = A[0] - $[0] * h.k, U = A[1] - $[1] * h.k;
    return V === h.x && U === h.y ? h : new Cn(h.k, V, U);
  }
  function C(h) {
    return [(+h[0][0] + +h[1][0]) / 2, (+h[0][1] + +h[1][1]) / 2];
  }
  function O(h, A, $, V) {
    h.on("start.zoom", function() {
      q(this, arguments).event(V).start();
    }).on("interrupt.zoom end.zoom", function() {
      q(this, arguments).event(V).end();
    }).tween("zoom", function() {
      var U = this, ee = arguments, ce = q(U, ee).event(V), ve = t.apply(U, ee), re = $ == null ? C(ve) : typeof $ == "function" ? $.apply(U, ee) : $, be = Math.max(ve[1][0] - ve[0][0], ve[1][1] - ve[0][1]), pe = U.__zoom, de = typeof A == "function" ? A.apply(U, ee) : A, Ie = u(pe.invert(re).concat(be / pe.k), de.invert(re).concat(be / de.k));
      return function(Me) {
        if (Me === 1)
          Me = de;
        else {
          var ne = Ie(Me), xe = be / ne[2];
          Me = new Cn(xe, re[0] - ne[0] * xe, re[1] - ne[1] * xe);
        }
        ce.zoom(null, Me);
      };
    });
  }
  function q(h, A, $) {
    return !$ && h.__zooming || new Y(h, A);
  }
  function Y(h, A) {
    this.that = h, this.args = A, this.active = 0, this.sourceEvent = null, this.extent = t.apply(h, A), this.taps = 0;
  }
  Y.prototype = {
    event: function(h) {
      return h && (this.sourceEvent = h), this;
    },
    start: function() {
      return ++this.active === 1 && (this.that.__zooming = this, this.emit("start")), this;
    },
    zoom: function(h, A) {
      return this.mouse && h !== "mouse" && (this.mouse[1] = A.invert(this.mouse[0])), this.touch0 && h !== "touch" && (this.touch0[1] = A.invert(this.touch0[0])), this.touch1 && h !== "touch" && (this.touch1[1] = A.invert(this.touch1[0])), this.that.__zoom = A, this.emit("zoom"), this;
    },
    end: function() {
      return --this.active === 0 && (delete this.that.__zooming, this.emit("end")), this;
    },
    emit: function(h) {
      var A = Zt(this.that).datum();
      c.call(
        h,
        this.that,
        new $E(h, {
          sourceEvent: this.sourceEvent,
          target: z,
          transform: this.that.__zoom,
          dispatch: c
        }),
        A
      );
    }
  };
  function B(h, ...A) {
    if (!e.apply(this, arguments))
      return;
    var $ = q(this, A).event(h), V = this.__zoom, U = Math.max(i[0], Math.min(i[1], V.k * Math.pow(2, o.apply(this, arguments)))), ee = rn(h);
    if ($.wheel)
      ($.mouse[0][0] !== ee[0] || $.mouse[0][1] !== ee[1]) && ($.mouse[1] = V.invert($.mouse[0] = ee)), clearTimeout($.wheel);
    else {
      if (V.k === U)
        return;
      $.mouse = [ee, V.invert(ee)], ti(this), $.start();
    }
    qo(h), $.wheel = setTimeout(ce, w), $.zoom("mouse", n(y(L(V, U), $.mouse[0], $.mouse[1]), $.extent, l));
    function ce() {
      $.wheel = null, $.end();
    }
  }
  function M(h, ...A) {
    if (p || !e.apply(this, arguments))
      return;
    var $ = h.currentTarget, V = q(this, A, !0).event(h), U = Zt(h.view).on("mousemove.zoom", re, !0).on("mouseup.zoom", be, !0), ee = rn(h, $), ce = h.clientX, ve = h.clientY;
    Xf(h.view), vl(h), V.mouse = [ee, this.__zoom.invert(ee)], ti(this), V.start();
    function re(pe) {
      if (qo(pe), !V.moved) {
        var de = pe.clientX - ce, Ie = pe.clientY - ve;
        V.moved = de * de + Ie * Ie > S;
      }
      V.event(pe).zoom("mouse", n(y(V.that.__zoom, V.mouse[0] = rn(pe, $), V.mouse[1]), V.extent, l));
    }
    function be(pe) {
      U.on("mousemove.zoom mouseup.zoom", null), Kf(pe.view, V.moved), qo(pe), V.event(pe).end();
    }
  }
  function X(h, ...A) {
    if (e.apply(this, arguments)) {
      var $ = this.__zoom, V = rn(h.changedTouches ? h.changedTouches[0] : h, this), U = $.invert(V), ee = $.k * (h.shiftKey ? 0.5 : 2), ce = n(y(L($, ee), V, U), t.apply(this, A), l);
      qo(h), r > 0 ? Zt(this).transition().duration(r).call(O, ce, V, h) : Zt(this).call(z.transform, ce, V, h);
    }
  }
  function ie(h, ...A) {
    if (e.apply(this, arguments)) {
      var $ = h.touches, V = $.length, U = q(this, A, h.changedTouches.length === V).event(h), ee, ce, ve, re;
      for (vl(h), ce = 0; ce < V; ++ce)
        ve = $[ce], re = rn(ve, this), re = [re, this.__zoom.invert(re), ve.identifier], U.touch0 ? !U.touch1 && U.touch0[2] !== re[2] && (U.touch1 = re, U.taps = 0) : (U.touch0 = re, ee = !0, U.taps = 1 + !!d);
      d && (d = clearTimeout(d)), ee && (U.taps < 2 && (f = re[0], d = setTimeout(function() {
        d = null;
      }, v)), ti(this), U.start());
    }
  }
  function D(h, ...A) {
    if (this.__zooming) {
      var $ = q(this, A).event(h), V = h.changedTouches, U = V.length, ee, ce, ve, re;
      for (qo(h), ee = 0; ee < U; ++ee)
        ce = V[ee], ve = rn(ce, this), $.touch0 && $.touch0[2] === ce.identifier ? $.touch0[0] = ve : $.touch1 && $.touch1[2] === ce.identifier && ($.touch1[0] = ve);
      if (ce = $.that.__zoom, $.touch1) {
        var be = $.touch0[0], pe = $.touch0[1], de = $.touch1[0], Ie = $.touch1[1], Me = (Me = de[0] - be[0]) * Me + (Me = de[1] - be[1]) * Me, ne = (ne = Ie[0] - pe[0]) * ne + (ne = Ie[1] - pe[1]) * ne;
        ce = L(ce, Math.sqrt(Me / ne)), ve = [(be[0] + de[0]) / 2, (be[1] + de[1]) / 2], re = [(pe[0] + Ie[0]) / 2, (pe[1] + Ie[1]) / 2];
      } else if ($.touch0)
        ve = $.touch0[0], re = $.touch0[1];
      else
        return;
      $.zoom("touch", n(y(ce, ve, re), $.extent, l));
    }
  }
  function G(h, ...A) {
    if (this.__zooming) {
      var $ = q(this, A).event(h), V = h.changedTouches, U = V.length, ee, ce;
      for (vl(h), p && clearTimeout(p), p = setTimeout(function() {
        p = null;
      }, v), ee = 0; ee < U; ++ee)
        ce = V[ee], $.touch0 && $.touch0[2] === ce.identifier ? delete $.touch0 : $.touch1 && $.touch1[2] === ce.identifier && delete $.touch1;
      if ($.touch1 && !$.touch0 && ($.touch0 = $.touch1, delete $.touch1), $.touch0)
        $.touch0[1] = this.__zoom.invert($.touch0[0]);
      else if ($.end(), $.taps === 2 && (ce = rn(ce, this), Math.hypot(f[0] - ce[0], f[1] - ce[1]) < P)) {
        var ve = Zt(this).on("dblclick.zoom");
        ve && ve.apply(this, arguments);
      }
    }
  }
  return z.wheelDelta = function(h) {
    return arguments.length ? (o = typeof h == "function" ? h : zs(+h), z) : o;
  }, z.filter = function(h) {
    return arguments.length ? (e = typeof h == "function" ? h : zs(!!h), z) : e;
  }, z.touchable = function(h) {
    return arguments.length ? (s = typeof h == "function" ? h : zs(!!h), z) : s;
  }, z.extent = function(h) {
    return arguments.length ? (t = typeof h == "function" ? h : zs([[+h[0][0], +h[0][1]], [+h[1][0], +h[1][1]]]), z) : t;
  }, z.scaleExtent = function(h) {
    return arguments.length ? (i[0] = +h[0], i[1] = +h[1], z) : [i[0], i[1]];
  }, z.translateExtent = function(h) {
    return arguments.length ? (l[0][0] = +h[0][0], l[1][0] = +h[1][0], l[0][1] = +h[0][1], l[1][1] = +h[1][1], z) : [[l[0][0], l[0][1]], [l[1][0], l[1][1]]];
  }, z.constrain = function(h) {
    return arguments.length ? (n = h, z) : n;
  }, z.duration = function(h) {
    return arguments.length ? (r = +h, z) : r;
  }, z.interpolate = function(h) {
    return arguments.length ? (u = h, z) : u;
  }, z.on = function() {
    var h = c.on.apply(c, arguments);
    return h === c ? z : h;
  }, z.clickDistance = function(h) {
    return arguments.length ? (S = (h = +h) * h, z) : Math.sqrt(S);
  }, z.tapDistance = function(h) {
    return arguments.length ? (P = +h, z) : P;
  }, z;
}
var $e = /* @__PURE__ */ ((e) => (e.Left = "left", e.Top = "top", e.Right = "right", e.Bottom = "bottom", e))($e || {}), zr = /* @__PURE__ */ ((e) => (e.Partial = "partial", e.Full = "full", e))(zr || {}), to = /* @__PURE__ */ ((e) => (e.Bezier = "default", e.SimpleBezier = "simple-bezier", e.Straight = "straight", e.Step = "step", e.SmoothStep = "smoothstep", e))(to || {}), vo = /* @__PURE__ */ ((e) => (e.Strict = "strict", e.Loose = "loose", e))(vo || {}), er = /* @__PURE__ */ ((e) => (e.Arrow = "arrow", e.ArrowClosed = "arrowclosed", e))(er || {}), is = /* @__PURE__ */ ((e) => (e.Free = "free", e.Vertical = "vertical", e.Horizontal = "horizontal", e))(is || {});
function tr(e) {
  var t, n;
  const o = ((n = (t = e.composedPath) == null ? void 0 : t.call(e)) == null ? void 0 : n[0]) || e.target, s = typeof (o == null ? void 0 : o.hasAttribute) == "function" ? o.hasAttribute("contenteditable") : !1, i = typeof (o == null ? void 0 : o.closest) == "function" ? o.closest(".nokey") : null;
  return ["INPUT", "SELECT", "TEXTAREA"].includes(o == null ? void 0 : o.nodeName) || s || !!i;
}
function AE(e) {
  return e.ctrlKey || e.metaKey || e.shiftKey;
}
function vc(e, t, n, o) {
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
function DE(e, t) {
  return (n) => {
    if (!n.code && !n.key)
      return !1;
    const o = RE(n.code, e);
    return Array.isArray(e) ? e.some((s) => vc(n[o], s, t, n.type === "keyup")) : vc(n[o], e, t, n.type === "keyup");
  };
}
function RE(e, t) {
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
  ), Df(["blur", "contextmenu"], u), Wu(
    (...d) => r(...d),
    (d) => {
      i = AE(d), !((!i || i && !n.value) && tr(d)) && (d.preventDefault(), s.value = !0);
    },
    { eventName: "keydown", target: o }
  ), Wu(
    (...d) => r(...d),
    (d) => {
      if (s.value) {
        if ((!i || i && !n.value) && tr(d))
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
    return d === null ? (u(), () => !1) : typeof d == "boolean" ? (u(), s.value = d, () => !1) : Array.isArray(d) || typeof d == "string" ? DE(d, l) : d;
  }
  return s;
}
const up = "vue-flow__node-desc", cp = "vue-flow__edge-desc", LE = "vue-flow__aria-live", dp = ["Enter", " ", "Escape"], Mo = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 }
};
function nr(e) {
  return {
    ...e.computedPosition || { x: 0, y: 0 },
    width: e.dimensions.width || 0,
    height: e.dimensions.height || 0
  };
}
function or(e, t) {
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
function fp(e, t) {
  return {
    x: go(e.x, t[0][0], t[1][0]),
    y: go(e.y, t[0][1], t[1][1])
  };
}
function gc(e) {
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
function VE(e) {
  return Fs(e.width) && Fs(e.height) && Fs(e.x) && Fs(e.y);
}
function zE(e, t, n) {
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
function pp(e, t, n) {
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
function hp(e, t, n, o) {
  const s = typeof e == "string" ? e : e.id, i = /* @__PURE__ */ new Set(), l = o === "source" ? "target" : "source";
  for (const r of n)
    r[l] === s && i.add(r[o]);
  return t.filter((r) => i.has(r.id));
}
function FE(...e) {
  if (e.length === 3) {
    const [i, l, r] = e;
    return hp(i, l, r, "target");
  }
  const [t, n] = e, o = typeof t == "string" ? t : t.id;
  return n.filter((i) => Yn(i) && i.source === o).map((i) => n.find((l) => uo(l) && l.id === i.target));
}
function BE(...e) {
  if (e.length === 3) {
    const [i, l, r] = e;
    return hp(i, l, r, "source");
  }
  const [t, n] = e, o = typeof t == "string" ? t : t.id;
  return n.filter((i) => Yn(i) && i.target === o).map((i) => n.find((l) => uo(l) && l.id === i.source));
}
function vp({ source: e, sourceHandle: t, target: n, targetHandle: o }) {
  return `vueflow__edge-${e}${t ?? ""}-${n}${o ?? ""}`;
}
function HE(e, t) {
  return t.some(
    (n) => Yn(n) && n.source === e.source && n.target === e.target && (n.sourceHandle === e.sourceHandle || !n.sourceHandle && !e.sourceHandle) && (n.targetHandle === e.targetHandle || !n.targetHandle && !e.targetHandle)
  );
}
function gp({ x: e, y: t }, { x: n, y: o, zoom: s }) {
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
function UE(e, t) {
  return {
    x: Math.min(e.x, t.x),
    y: Math.min(e.y, t.y),
    x2: Math.max(e.x2, t.x2),
    y2: Math.max(e.y2, t.y2)
  };
}
function mp({ x: e, y: t, width: n, height: o }) {
  return {
    x: e,
    y: t,
    x2: e + n,
    y2: t + o
  };
}
function jE({ x: e, y: t, x2: n, y2: o }) {
  return {
    x: e,
    y: t,
    width: n - e,
    height: o - t
  };
}
function yp(e) {
  let t = {
    x: Number.POSITIVE_INFINITY,
    y: Number.POSITIVE_INFINITY,
    x2: Number.NEGATIVE_INFINITY,
    y2: Number.NEGATIVE_INFINITY
  };
  for (let n = 0; n < e.length; n++) {
    const o = e[n];
    t = UE(
      t,
      mp({
        ...o.computedPosition,
        ...o.dimensions
      })
    );
  }
  return jE(t);
}
function bp(e, t, n = { x: 0, y: 0, zoom: 1 }, o = !1, s = !1) {
  const i = {
    ...ys(t, n),
    width: t.width / n.zoom,
    height: t.height / n.zoom
  }, l = [];
  for (const r of e) {
    const { dimensions: u, selectable: c = !0, hidden: d = !1 } = r, f = u.width ?? r.width ?? null, p = u.height ?? r.height ?? null;
    if (s && !c || d)
      continue;
    const v = or(i, nr(r)), w = f === null || p === null, S = o && v > 0, P = (f ?? 0) * (p ?? 0);
    (w || S || v >= P || r.dragging) && l.push(r);
  }
  return l;
}
function _p(e, t) {
  const n = /* @__PURE__ */ new Set();
  if (typeof e == "string")
    n.add(e);
  else if (e.length >= 1)
    for (const o of e)
      n.add(o.id);
  return t.filter((o) => n.has(o.source) || n.has(o.target));
}
function mc(e, t, n, o, s, i = 0.1, l = { x: 0, y: 0 }) {
  const r = t / (e.width * (1 + i)), u = n / (e.height * (1 + i)), c = Math.min(r, u), d = go(c, o, s), f = e.x + e.width / 2, p = e.y + e.height / 2, v = t / 2 - f * d + (l.x ?? 0), w = n / 2 - p * d + (l.y ?? 0);
  return { x: v, y: w, zoom: d };
}
function GE(e, t) {
  return {
    x: t.x + e.x,
    y: t.y + e.y,
    z: (e.z > t.z ? e.z : t.z) + 1
  };
}
function wp(e, t) {
  if (!e.parentNode)
    return !1;
  const n = t(e.parentNode);
  return n ? n.selected ? !0 : wp(n, t) : !1;
}
function bs(e, t) {
  return typeof e > "u" ? "" : typeof e == "string" ? e : `${t ? `${t}__` : ""}${Object.keys(e).sort().map((o) => `${o}=${e[o]}`).join("&")}`;
}
function yc(e, t, n) {
  return e < t ? go(Math.abs(e - t), 1, t) / t : e > n ? -go(Math.abs(e - n), 1, t) / t : 0;
}
function kp(e, t, n = 15, o = 40) {
  const s = yc(e.x, o, t.width - o) * n, i = yc(e.y, o, t.height - o) * n;
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
function bc(e, t) {
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
function Pn(e, t) {
  return {
    id: e,
    type: "select",
    selected: t
  };
}
function _c(e) {
  return {
    item: e,
    type: "add"
  };
}
function wc(e) {
  return {
    id: e,
    type: "remove"
  };
}
function kc(e, t, n, o, s) {
  return {
    id: e,
    source: t,
    target: n,
    sourceHandle: o || null,
    targetHandle: s || null,
    type: "remove"
  };
}
function Rn(e, t = /* @__PURE__ */ new Set(), n = !1) {
  const o = [];
  for (const [s, i] of e) {
    const l = t.has(s);
    !(i.selected === void 0 && !l) && i.selected !== l && (n && (i.selected = l), o.push(Pn(i.id, l)));
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
function Ec(e, t, n) {
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
function qE(e, t, n, o, s) {
  var i, l;
  const r = [];
  for (const u of e)
    (u.selected || u.id === s) && (!u.parentNode || !wp(u, o)) && (u.draggable || t && typeof u.draggable > "u") && r.push(
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
function Ep(e) {
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
function YE(e, t, n) {
  const [o, s, i, l] = typeof e != "string" ? Ep(e.padding) : [0, 0, 0, 0];
  return n && typeof n.computedPosition.x < "u" && typeof n.computedPosition.y < "u" && typeof n.dimensions.width < "u" && typeof n.dimensions.height < "u" ? [
    [n.computedPosition.x + l, n.computedPosition.y + o],
    [
      n.computedPosition.x + n.dimensions.width - s,
      n.computedPosition.y + n.dimensions.height - i
    ]
  ] : !1;
}
function XE(e, t, n, o) {
  let s = e.extent || n;
  if ((s === "parent" || !Array.isArray(s) && (s == null ? void 0 : s.range) === "parent") && !e.expandParent)
    if (e.parentNode && o && e.dimensions.width && e.dimensions.height) {
      const i = YE(s, e, o);
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
    const [i, l, r, u] = Ep(s.padding), c = (o == null ? void 0 : o.computedPosition.x) || 0, d = (o == null ? void 0 : o.computedPosition.y) || 0;
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
function KE({ width: e, height: t }, n) {
  return [n[0], [n[1][0] - (e || 0), n[1][1] - (t || 0)]];
}
function Fr(e, t, n, o, s) {
  const i = KE(e.dimensions, XE(e, n, o, s)), l = fp(t, i);
  return {
    position: {
      x: l.x - ((s == null ? void 0 : s.computedPosition.x) || 0),
      y: l.y - ((s == null ? void 0 : s.computedPosition.y) || 0)
    },
    computedPosition: l
  };
}
function yi(e, t, n = $e.Left) {
  const o = ((t == null ? void 0 : t.x) ?? 0) + e.computedPosition.x, s = ((t == null ? void 0 : t.y) ?? 0) + e.computedPosition.y, { width: i, height: l } = t ?? JE(e);
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
function Cc(e = [], t) {
  return e.length && (t ? e.find((n) => n.id === t) : e[0]) || null;
}
function WE({
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
  const d = mp({
    x: (0 - u.x) / u.zoom,
    y: (0 - u.y) / u.zoom,
    width: l / u.zoom,
    height: r / u.zoom
  }), f = Math.max(0, Math.min(d.x2, c.x2) - Math.max(d.x, c.x)), p = Math.max(0, Math.min(d.y2, c.y2) - Math.max(d.y, c.y));
  return Math.ceil(f * p) > 0;
}
function ZE(e, t, n = !1) {
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
function Br(e) {
  return "clientX" in e;
}
function Cp(e) {
  return "sourceEvent" in e;
}
function $n(e, t) {
  var n, o;
  const s = Br(e), i = s ? e.clientX : (n = e.touches) == null ? void 0 : n[0].clientX, l = s ? e.clientY : (o = e.touches) == null ? void 0 : o[0].clientY;
  return {
    x: i - ((t == null ? void 0 : t.left) ?? 0),
    y: l - ((t == null ? void 0 : t.top) ?? 0)
  };
}
const bi = () => {
  var e;
  return typeof navigator < "u" && ((e = navigator == null ? void 0 : navigator.userAgent) == null ? void 0 : e.indexOf("Mac")) >= 0;
};
function JE(e) {
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
function Sp() {
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
function xc(e, t, n, o) {
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
function QE(e, t, n, o, s, i) {
  const { x: l, y: r } = $n(e), c = t.elementsFromPoint(l, r).find((w) => w.classList.contains("vue-flow__handle"));
  if (c) {
    const w = c.getAttribute("data-nodeid");
    if (w) {
      const S = Hr(void 0, c), P = c.getAttribute("data-handleid"), z = i({ nodeId: w, id: P, type: S });
      if (z) {
        const L = s.find((y) => y.nodeId === w && y.type === S && y.id === P);
        return {
          handle: {
            id: P,
            type: S,
            nodeId: w,
            x: (L == null ? void 0 : L.x) || n.x,
            y: (L == null ? void 0 : L.y) || n.y
          },
          validHandleResult: z
        };
      }
    }
  }
  let d = [], f = Number.POSITIVE_INFINITY;
  for (const w of s) {
    const S = Math.sqrt((w.x - n.x) ** 2 + (w.y - n.y) ** 2);
    if (S <= o) {
      const P = i(w);
      S <= f && (S < f ? d = [{ handle: w, validHandleResult: P }] : S === f && d.push({
        handle: w,
        validHandleResult: P
      }), f = S);
    }
  }
  if (!d.length)
    return { handle: null, validHandleResult: Sp() };
  if (d.length === 1)
    return d[0];
  const p = d.some(({ validHandleResult: w }) => w.isValid), v = d.some(({ handle: w }) => w.type === "target");
  return d.find(
    ({ handle: w, validHandleResult: S }) => v ? w.type === "target" : p ? S.isValid : !0
  ) || d[0];
}
function $c(e, t, n, o, s, i, l, r, u, c, d) {
  const f = i === "target", p = r.querySelector(`.vue-flow__handle[data-id="${t == null ? void 0 : t.nodeId}-${t == null ? void 0 : t.id}-${t == null ? void 0 : t.type}"]`), { x: v, y: w } = $n(e), S = r.elementFromPoint(v, w), P = S != null && S.classList.contains("vue-flow__handle") ? S : p, z = Sp();
  if (P) {
    z.handleDomNode = P;
    const L = Hr(void 0, P), y = P.getAttribute("data-nodeid"), C = P.getAttribute("data-handleid"), O = P.classList.contains("connectable"), q = P.classList.contains("connectableend"), Y = {
      source: f ? y : o,
      sourceHandle: f ? C : s,
      target: f ? o : y,
      targetHandle: f ? s : C
    };
    z.connection = Y, O && q && (n === vo.Strict ? f && L === "source" || !f && L === "target" : y !== o || C !== s) && (z.isValid = l(Y, {
      edges: u,
      nodes: c,
      sourceNode: d(Y.source),
      targetNode: d(Y.target)
    }), z.endHandle = {
      nodeId: y,
      handleId: C,
      type: L,
      position: z.isValid ? P.getAttribute("data-handlepos") : null
    });
  }
  return z;
}
function eC({ nodes: e, nodeId: t, handleId: n, handleType: o }) {
  const s = [];
  for (let i = 0; i < e.length; i++) {
    const l = e[i], { handleBounds: r } = l;
    let u = [], c = [];
    r && (u = xc(l, r, "source", `${t}-${n}-${o}`), c = xc(l, r, "target", `${t}-${n}-${o}`)), s.push(...u, ...c);
  }
  return s;
}
function Hr(e, t) {
  return e || (t != null && t.classList.contains("target") ? "target" : t != null && t.classList.contains("source") ? "source" : null);
}
function tC(e, t) {
  let n = null;
  return t ? n = "valid" : e && !t && (n = "invalid"), n;
}
const nC = ["production", "prod"];
function Ui(e, ...t) {
  xp() && console.warn(`[Vue Flow]: ${e}`, ...t);
}
function xp() {
  return !nC.includes("production");
}
function Ic(e, t, n, o) {
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
function sr(e, t, n, o, s, i = !1, l) {
  s.value = !1, e.selected ? (i || e.selected && t) && (o([e]), _t(() => {
    l.blur();
  })) : n([e]);
}
function pt(e) {
  return typeof H(e) < "u";
}
function oC(e, t, n, o) {
  if (!e || !e.source || !e.target)
    return n(new wt(vt.EDGE_INVALID, (e == null ? void 0 : e.id) ?? "[ID UNKNOWN]")), !1;
  let s;
  return Yn(e) ? s = e : s = {
    ...e,
    id: vp(e)
  }, s = pp(s, void 0, o), HE(s, t) ? !1 : s;
}
function sC(e, t, n, o, s) {
  if (!t.source || !t.target)
    return s(new wt(vt.EDGE_INVALID, e.id)), !1;
  if (!n)
    return s(new wt(vt.EDGE_NOT_FOUND, e.id)), !1;
  const { id: i, ...l } = e;
  return {
    ...l,
    id: o ? vp(t) : i,
    source: t.source,
    target: t.target,
    sourceHandle: t.sourceHandle,
    targetHandle: t.targetHandle
  };
}
function Nc(e, t, n) {
  const o = {}, s = [];
  for (let i = 0; i < e.length; ++i) {
    const l = e[i];
    if (!uo(l)) {
      n(
        new wt(vt.NODE_INVALID, l == null ? void 0 : l.id) || `[ID UNKNOWN|INDEX ${i}]`
      );
      continue;
    }
    const r = zE(l, t(l.id), l.parentNode);
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
    const d = Yn(c) ? c : oC(c, r, s, i);
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
    const v = o(d.id);
    u.push({
      ...pp(d, v, i),
      sourceNode: f,
      targetNode: p
    });
  }
  return u;
}
const Tc = Symbol("vueFlow"), $p = Symbol("nodeId"), Ip = Symbol("nodeRef"), iC = Symbol("edgeId"), lC = Symbol("edgeRef"), ji = Symbol("slots");
function Np(e) {
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
    findNode: v,
    multiSelectionActive: w,
    nodesSelectionActive: S,
    selectNodesOnDrag: P,
    removeSelectedElements: z,
    addSelectedNodes: L,
    updateNodePositions: y,
    emits: C
  } = ot(), { onStart: O, onDrag: q, onStop: Y, onClick: B, el: M, disabled: X, id: ie, selectable: D, dragHandle: G } = e, h = te(!1);
  let A = [], $, V = null, U = { x: void 0, y: void 0 }, ee = { x: 0, y: 0 }, ce = null, ve = !1, re = 0, be = !1;
  const pe = uC(), de = ({ x: ke, y: I }) => {
    U = { x: ke, y: I };
    let R = !1;
    if (A = A.map((b) => {
      const _ = { x: ke - b.distance.x, y: I - b.distance.y }, { computedPosition: E } = Fr(
        b,
        n.value ? Hi(_, o.value) : _,
        C.error,
        l.value,
        b.parentNode ? v(b.parentNode) : void 0
      );
      return R = R || b.position.x !== E.x || b.position.y !== E.y, b.position = E, b;
    }), !!R && (y(A, !0, !0), h.value = !0, ce)) {
      const [b, _] = ml({
        id: ie,
        dragItems: A,
        findNode: v
      });
      q({ event: ce, node: b, nodes: _ });
    }
  }, Ie = () => {
    if (!V)
      return;
    const [ke, I] = kp(ee, V, d.value);
    if (ke !== 0 || I !== 0) {
      const R = {
        x: (U.x ?? 0) - ke / u.value.zoom,
        y: (U.y ?? 0) - I / u.value.zoom
      };
      p({ x: ke, y: I }) && de(R);
    }
    re = requestAnimationFrame(Ie);
  }, Me = (ke, I) => {
    ve = !0;
    const R = v(ie);
    !P.value && !w.value && R && (R.selected || z()), R && Ue(D) && P.value && sr(
      R,
      w.value,
      L,
      z,
      S,
      !1,
      I
    );
    const b = pe(ke.sourceEvent);
    if (U = b, A = qE(i.value, f.value, b, v, ie), A.length) {
      const [_, E] = ml({
        id: ie,
        dragItems: A,
        findNode: v
      });
      O({ event: ke.sourceEvent, node: _, nodes: E });
    }
  }, ne = (ke, I) => {
    var R;
    ke.sourceEvent.type === "touchmove" && ke.sourceEvent.touches.length > 1 || (r.value === 0 && Me(ke, I), U = pe(ke.sourceEvent), V = ((R = t.value) == null ? void 0 : R.getBoundingClientRect()) || null, ee = $n(ke.sourceEvent, V));
  }, xe = (ke, I) => {
    const R = pe(ke.sourceEvent);
    if (!be && ve && c.value && (be = !0, Ie()), !ve) {
      const b = R.xSnapped - (U.x ?? 0), _ = R.ySnapped - (U.y ?? 0);
      Math.sqrt(b * b + _ * _) > r.value && Me(ke, I);
    }
    (U.x !== R.xSnapped || U.y !== R.ySnapped) && A.length && ve && (ce = ke.sourceEvent, ee = $n(ke.sourceEvent, V), de(R));
  }, Ee = (ke) => {
    if (!Cp(ke) && !ve && !h.value && !w.value) {
      const I = ke, R = pe(I), b = R.xSnapped - (U.x ?? 0), _ = R.ySnapped - (U.y ?? 0), E = Math.sqrt(b * b + _ * _);
      E !== 0 && E <= r.value && (B == null || B(I));
      return;
    }
    if (h.value = !1, be = !1, ve = !1, U = { x: void 0, y: void 0 }, cancelAnimationFrame(re), A.length) {
      y(A, !1, !1);
      const [I, R] = ml({
        id: ie,
        dragItems: A,
        findNode: v
      });
      Y({ event: ke.sourceEvent, node: I, nodes: R });
    }
  };
  return ze([() => Ue(X), M], ([ke, I], R, b) => {
    if (I) {
      const _ = Zt(I);
      ke || ($ = Uk().on("start", (E) => ne(E, I)).on("drag", (E) => xe(E, I)).on("end", (E) => Ee(E)).filter((E) => {
        const x = E.target, j = Ue(G);
        return !E.button && (!s.value || !Ec(x, `.${s.value}`, I) && (!j || Ec(x, j, I)));
      }), _.call($)), b(() => {
        _.on(".drag", null), $ && ($.on("start", null), $.on("drag", null), $.on("end", null));
      });
    }
  }), h;
}
function rC() {
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
function aC(e, t) {
  const n = rC();
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
function uC() {
  const { viewport: e, snapGrid: t, snapToGrid: n } = ot();
  return (o) => {
    const s = Cp(o) ? o.sourceEvent : o, { x: i, y: l } = $n(s), r = ys({ x: i, y: l }, e.value), { x: u, y: c } = n.value ? Hi(r, t.value) : r;
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
function Tp({
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
    autoPanOnConnect: v,
    autoPanSpeed: w,
    findNode: S,
    panBy: P,
    startConnection: z,
    updateConnection: L,
    endConnection: y,
    emits: C,
    viewport: O,
    edges: q,
    nodes: Y,
    isValidConnection: B
  } = ot();
  let M = null, X = !1, ie = null, D = null;
  function G(A) {
    var $;
    const V = Ue(n) === "target", U = Br(A), ee = gc(A.target);
    if (U && A.button === 0 || !U) {
      let ce = function(E) {
        I = $n(E, Ee);
        const { handle: x, validHandleResult: j } = QE(
          E,
          ee,
          ys(I, O.value, !1, [1, 1]),
          c.value,
          b,
          (K) => $c(
            E,
            K,
            u.value,
            Ue(t),
            Ue(e),
            V ? "target" : "source",
            be,
            ee,
            q.value,
            Y.value,
            S
          )
        );
        if (pe = x, R || (_(), R = !0), M = j.connection, X = j.isValid, ie = j.handleDomNode, !(X && pe && (D != null && D.endHandle) && j.endHandle && D.endHandle.type === j.endHandle.type && D.endHandle.nodeId === j.endHandle.nodeId && D.endHandle.handleId === j.endHandle.handleId)) {
          if (L(
            pe && X ? gp(
              {
                x: pe.x,
                y: pe.y
              },
              O.value
            ) : I,
            j.endHandle,
            tC(!!pe, X)
          ), D = j, !pe && !X && !ie)
            return yl(ke);
          M && M.source !== M.target && ie && (yl(ke), ke = ie, ie.classList.add("connecting", "vue-flow__handle-connecting"), ie.classList.toggle("valid", X), ie.classList.toggle("vue-flow__handle-valid", X));
        }
      }, ve = function(E) {
        (pe || ie) && M && X && (i ? i(E, M) : C.connect(M)), C.connectEnd(E), s && (l == null || l(E)), yl(ke), cancelAnimationFrame(de), y(E), R = !1, X = !1, M = null, ie = null, ee.removeEventListener("mousemove", ce), ee.removeEventListener("mouseup", ve), ee.removeEventListener("touchmove", ce), ee.removeEventListener("touchend", ve);
      };
      const re = S(Ue(t));
      let be = Ue(o) || B.value || Bs;
      !be && re && (be = (V ? re.isValidSourcePos : re.isValidTargetPos) || Bs);
      let pe, de = 0;
      const { x: Ie, y: Me } = $n(A), ne = ee == null ? void 0 : ee.elementFromPoint(Ie, Me), xe = Hr(Ue(s), ne), Ee = ($ = r.value) == null ? void 0 : $.getBoundingClientRect();
      if (!Ee || !xe)
        return;
      let ke, I = $n(A, Ee), R = !1;
      const b = eC({
        nodes: Y.value,
        nodeId: Ue(t),
        handleId: Ue(e),
        handleType: xe
      }), _ = () => {
        if (!v.value)
          return;
        const [E, x] = kp(I, Ee, w.value);
        P({ x: E, y: x }), de = requestAnimationFrame(_);
      };
      z(
        {
          nodeId: Ue(t),
          handleId: Ue(e),
          type: xe,
          position: (ne == null ? void 0 : ne.getAttribute("data-handlepos")) || $e.Top
        },
        {
          x: Ie - Ee.left,
          y: Me - Ee.top
        }
      ), C.connectStart({ event: A, nodeId: Ue(t), handleId: Ue(e), handleType: xe }), ee.addEventListener("mousemove", ce), ee.addEventListener("mouseup", ve), ee.addEventListener("touchmove", ce), ee.addEventListener("touchend", ve);
    }
  }
  function h(A) {
    if (!d.value)
      return;
    const $ = Ue(n) === "target";
    if (!f.value)
      C.clickConnectStart({ event: A, nodeId: Ue(t), handleId: Ue(e) }), z({ nodeId: Ue(t), type: Ue(n), handleId: Ue(e) }, void 0, !0);
    else {
      let V = Ue(o) || B.value || Bs;
      const U = S(Ue(t));
      if (!V && U && (V = ($ ? U.isValidSourcePos : U.isValidTargetPos) || Bs), U && (typeof U.connectable > "u" ? p.value : U.connectable) === !1)
        return;
      const ee = gc(A.target), { connection: ce, isValid: ve } = $c(
        A,
        {
          nodeId: Ue(t),
          id: Ue(e),
          type: Ue(n)
        },
        u.value,
        f.value.nodeId,
        f.value.handleId || null,
        f.value.type,
        V,
        ee,
        q.value,
        Y.value,
        S
      ), re = ce.source === ce.target;
      ve && !re && C.connect(ce), C.clickConnectEnd(A), y(A, !0);
    }
  }
  return {
    handlePointerDown: G,
    handleClick: h
  };
}
function cC() {
  return dn($p, "");
}
function Mp(e) {
  const t = e ?? cC() ?? "", n = dn(Ip, te(null)), { findNode: o, edges: s, emits: i } = ot(), l = o(t);
  return l || i.error(new wt(vt.NODE_NOT_FOUND, t)), {
    id: t,
    nodeEl: n,
    node: l,
    parentNode: ae(() => o(l.parentNode)),
    connectedEdges: ae(() => _p([l], s.value))
  };
}
function dC() {
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
function fC(e, t) {
  const n = dC();
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
function Pp() {
  const { getSelectedNodes: e, nodeExtent: t, updateNodePositions: n, findNode: o, snapGrid: s, snapToGrid: i, nodesDraggable: l, emits: r } = ot();
  return (u, c = !1) => {
    const d = i.value ? s.value[0] : 5, f = i.value ? s.value[1] : 5, p = c ? 4 : 1, v = u.x * d * p, w = u.y * f * p, S = [];
    for (const P of e.value)
      if (P.draggable || l && typeof P.draggable > "u") {
        const z = { x: P.computedPosition.x + v, y: P.computedPosition.y + w }, { computedPosition: L } = Fr(
          P,
          z,
          r.error,
          t.value,
          P.parentNode ? o(P.parentNode) : void 0
        );
        S.push({
          id: P.id,
          position: L,
          from: P.position,
          distance: { x: u.x, y: u.y },
          dimensions: P.dimensions
        });
      }
    n(S, !0, !1);
  };
}
const wl = 0.1;
function Mn() {
  return Ui("Viewport not initialized yet."), Promise.resolve(!1);
}
const pC = {
  zoomIn: Mn,
  zoomOut: Mn,
  zoomTo: Mn,
  fitView: Mn,
  setCenter: Mn,
  fitBounds: Mn,
  project: (e) => e,
  screenToFlowCoordinate: (e) => e,
  flowToScreenCoordinate: (e) => e,
  setViewport: Mn,
  setTransform: Mn,
  getViewport: () => ({ x: 0, y: 0, zoom: 1 }),
  getTransform: () => ({ x: 0, y: 0, zoom: 1 }),
  viewportInitialized: !1
};
function hC(e) {
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
      const { x: u, y: c } = fp({ x: -o, y: -s }, e.translateExtent), d = Lo.translate(-u, -c).scale(i);
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
      const u = yp(r), { x: c, y: d, zoom: f } = mc(
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
      const { x: l, y: r, zoom: u } = mc(
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
        return gp(r, e.viewport);
      }
      return { x: 0, y: 0 };
    }
  } : pC);
}
function kl(e, t = 0, n) {
  return e.transition().duration(t).on("end", n);
}
function vC(e, t, n) {
  const o = Xc(!0);
  return o.run(() => {
    const s = () => {
      o.run(() => {
        let S, P, z = !!(n.nodes.value.length || n.edges.value.length);
        S = _o([e.modelValue, () => {
          var L, y;
          return (y = (L = e.modelValue) == null ? void 0 : L.value) == null ? void 0 : y.length;
        }], ([L]) => {
          L && Array.isArray(L) && (P == null || P.pause(), n.setElements(L), !P && !z && L.length ? z = !0 : P == null || P.resume());
        }), P = _o(
          [n.nodes, n.edges, () => n.edges.value.length, () => n.nodes.value.length],
          ([L, y]) => {
            var C;
            (C = e.modelValue) != null && C.value && Array.isArray(e.modelValue.value) && (S == null || S.pause(), e.modelValue.value = [...L, ...y], _t(() => {
              S == null || S.resume();
            }));
          },
          { immediate: z }
        ), Gs(() => {
          S == null || S.stop(), P == null || P.stop();
        });
      });
    }, i = () => {
      o.run(() => {
        let S, P, z = !!n.nodes.value.length;
        S = _o([e.nodes, () => {
          var L, y;
          return (y = (L = e.nodes) == null ? void 0 : L.value) == null ? void 0 : y.length;
        }], ([L]) => {
          L && Array.isArray(L) && (P == null || P.pause(), n.setNodes(L), !P && !z && L.length ? z = !0 : P == null || P.resume());
        }), P = _o(
          [n.nodes, () => n.nodes.value.length],
          ([L]) => {
            var y;
            (y = e.nodes) != null && y.value && Array.isArray(e.nodes.value) && (S == null || S.pause(), e.nodes.value = [...L], _t(() => {
              S == null || S.resume();
            }));
          },
          { immediate: z }
        ), Gs(() => {
          S == null || S.stop(), P == null || P.stop();
        });
      });
    }, l = () => {
      o.run(() => {
        let S, P, z = !!n.edges.value.length;
        S = _o([e.edges, () => {
          var L, y;
          return (y = (L = e.edges) == null ? void 0 : L.value) == null ? void 0 : y.length;
        }], ([L]) => {
          L && Array.isArray(L) && (P == null || P.pause(), n.setEdges(L), !P && !z && L.length ? z = !0 : P == null || P.resume());
        }), P = _o(
          [n.edges, () => n.edges.value.length],
          ([L]) => {
            var y;
            (y = e.edges) != null && y.value && Array.isArray(e.edges.value) && (S == null || S.pause(), e.edges.value = [...L], _t(() => {
              S == null || S.resume();
            }));
          },
          { immediate: z }
        ), Gs(() => {
          S == null || S.stop(), P == null || P.stop();
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
        const S = async (P) => {
          let z = P;
          typeof t.autoConnect == "function" && (z = await t.autoConnect(P)), z !== !1 && n.addEdges([z]);
        };
        ze(
          () => t.autoConnect,
          () => {
            pt(t.autoConnect) && (n.autoConnect.value = t.autoConnect);
          },
          { immediate: !0 }
        ), ze(
          n.autoConnect,
          (P, z, L) => {
            P ? n.onConnect(S) : n.hooks.value.connect.off(S), L(() => {
              n.hooks.value.connect.off(S);
            });
          },
          { immediate: !0 }
        );
      });
    }, v = () => {
      const S = [
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
      for (const P of Object.keys(t)) {
        const z = P;
        if (!S.includes(z)) {
          const L = tt(() => t[z]), y = n[z];
          at(y) && o.run(() => {
            ze(
              L,
              (C) => {
                pt(C) && (y.value = C);
              },
              { immediate: !0 }
            );
          });
        }
      }
    };
    (() => {
      s(), i(), l(), u(), r(), c(), d(), f(), p(), v();
    })();
  }), () => o.stop();
}
function gC() {
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
function mC(e, t) {
  kd(() => {
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
function Op() {
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
    selectionMode: zr.Full,
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
    hooks: gC(),
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
const yC = [
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
function bC(e, t, n) {
  const o = hC(e), s = (b) => {
    const _ = b ?? [];
    e.hooks.updateNodeInternals.trigger(_);
  }, i = (b) => BE(b, e.nodes, e.edges), l = (b) => FE(b, e.nodes, e.edges), r = (b) => _p(b, e.edges), u = ({ id: b, type: _, nodeId: E }) => {
    var x;
    return Array.from(((x = e.connectionLookup.get(`${E}-${_}-${b ?? null}`)) == null ? void 0 : x.values()) ?? []);
  }, c = (b) => {
    if (b)
      return t.value.get(b);
  }, d = (b) => {
    if (b)
      return n.value.get(b);
  }, f = (b, _, E) => {
    var x, j;
    const K = [];
    for (const J of b) {
      const W = {
        id: J.id,
        type: "position",
        dragging: E,
        from: J.from
      };
      if (_ && (W.position = J.position, J.parentNode)) {
        const fe = c(J.parentNode);
        W.position = {
          x: W.position.x - (((x = fe == null ? void 0 : fe.computedPosition) == null ? void 0 : x.x) ?? 0),
          y: W.position.y - (((j = fe == null ? void 0 : fe.computedPosition) == null ? void 0 : j.y) ?? 0)
        };
      }
      K.push(W);
    }
    K != null && K.length && e.hooks.nodesChange.trigger(K);
  }, p = (b) => {
    if (!e.vueFlowRef)
      return;
    const _ = e.vueFlowRef.querySelector(".vue-flow__transformationpane");
    if (!_)
      return;
    const E = window.getComputedStyle(_), { m22: x } = new window.DOMMatrixReadOnly(E.transform), j = [];
    for (let K = 0; K < b.length; ++K) {
      const J = b[K], W = c(J.id);
      if (W) {
        const fe = Bi(J.nodeElement);
        if (!!(fe.width && fe.height && (W.dimensions.width !== fe.width || W.dimensions.height !== fe.height || J.forceUpdate))) {
          const ge = J.nodeElement.getBoundingClientRect();
          W.dimensions = fe, W.handleBounds.source = Ic(".source", J.nodeElement, ge, x), W.handleBounds.target = Ic(".target", J.nodeElement, ge, x), j.push({
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
  }, v = (b, _) => {
    const E = /* @__PURE__ */ new Set(), x = /* @__PURE__ */ new Set();
    for (const J of b)
      uo(J) ? E.add(J.id) : Yn(J) && x.add(J.id);
    const j = Rn(t.value, E, !0), K = Rn(n.value, x);
    if (e.multiSelectionActive) {
      for (const J of E)
        j.push(Pn(J, _));
      for (const J of x)
        K.push(Pn(J, _));
    }
    j.length && e.hooks.nodesChange.trigger(j), K.length && e.hooks.edgesChange.trigger(K);
  }, w = (b) => {
    if (e.multiSelectionActive) {
      const _ = b.map((E) => Pn(E.id, !0));
      e.hooks.nodesChange.trigger(_);
      return;
    }
    e.hooks.nodesChange.trigger(Rn(t.value, new Set(b.map((_) => _.id)), !0)), e.hooks.edgesChange.trigger(Rn(n.value));
  }, S = (b) => {
    if (e.multiSelectionActive) {
      const _ = b.map((E) => Pn(E.id, !0));
      e.hooks.edgesChange.trigger(_);
      return;
    }
    e.hooks.edgesChange.trigger(Rn(n.value, new Set(b.map((_) => _.id)))), e.hooks.nodesChange.trigger(Rn(t.value, /* @__PURE__ */ new Set(), !0));
  }, P = (b) => {
    v(b, !0);
  }, z = (b) => {
    const E = (b || e.nodes).map((x) => (x.selected = !1, Pn(x.id, !1)));
    e.hooks.nodesChange.trigger(E);
  }, L = (b) => {
    const E = (b || e.edges).map((x) => (x.selected = !1, Pn(x.id, !1)));
    e.hooks.edgesChange.trigger(E);
  }, y = (b) => {
    if (!b || !b.length)
      return v([], !1);
    const _ = b.reduce(
      (E, x) => {
        const j = Pn(x.id, !1);
        return uo(x) ? E.nodes.push(j) : E.edges.push(j), E;
      },
      { nodes: [], edges: [] }
    );
    _.nodes.length && e.hooks.nodesChange.trigger(_.nodes), _.edges.length && e.hooks.edgesChange.trigger(_.edges);
  }, C = (b) => {
    var _;
    (_ = e.d3Zoom) == null || _.scaleExtent([b, e.maxZoom]), e.minZoom = b;
  }, O = (b) => {
    var _;
    (_ = e.d3Zoom) == null || _.scaleExtent([e.minZoom, b]), e.maxZoom = b;
  }, q = (b) => {
    var _;
    (_ = e.d3Zoom) == null || _.translateExtent(b), e.translateExtent = b;
  }, Y = (b) => {
    e.nodeExtent = b, s();
  }, B = (b) => {
    var _;
    (_ = e.d3Zoom) == null || _.clickDistance(b);
  }, M = (b) => {
    e.nodesDraggable = b, e.nodesConnectable = b, e.elementsSelectable = b;
  }, X = (b) => {
    const _ = b instanceof Function ? b(e.nodes) : b;
    !e.initialized && !_.length || (e.nodes = Nc(_, c, e.hooks.error.trigger));
  }, ie = (b) => {
    const _ = b instanceof Function ? b(e.edges) : b;
    if (!e.initialized && !_.length)
      return;
    const E = _l(
      _,
      e.isValidConnection,
      c,
      d,
      e.hooks.error.trigger,
      e.defaultEdgeOptions,
      e.nodes,
      e.edges
    );
    bl(e.connectionLookup, E), e.edges = E;
  }, D = (b) => {
    const _ = b instanceof Function ? b([...e.nodes, ...e.edges]) : b;
    !e.initialized && !_.length || (X(_.filter(uo)), ie(_.filter(Yn)));
  }, G = (b) => {
    let _ = b instanceof Function ? b(e.nodes) : b;
    _ = Array.isArray(_) ? _ : [_];
    const E = Nc(_, c, e.hooks.error.trigger), x = [];
    for (const j of E)
      x.push(_c(j));
    x.length && e.hooks.nodesChange.trigger(x);
  }, h = (b) => {
    let _ = b instanceof Function ? b(e.edges) : b;
    _ = Array.isArray(_) ? _ : [_];
    const E = _l(
      _,
      e.isValidConnection,
      c,
      d,
      e.hooks.error.trigger,
      e.defaultEdgeOptions,
      e.nodes,
      e.edges
    ), x = [];
    for (const j of E)
      x.push(_c(j));
    x.length && e.hooks.edgesChange.trigger(x);
  }, A = (b, _ = !0, E = !1) => {
    const x = b instanceof Function ? b(e.nodes) : b, j = Array.isArray(x) ? x : [x], K = [], J = [];
    function W(ue) {
      const ge = r(ue);
      for (const he of ge)
        (!pt(he.deletable) || he.deletable) && J.push(kc(he.id, he.source, he.target, he.sourceHandle, he.targetHandle));
    }
    function fe(ue) {
      const ge = [];
      for (const he of e.nodes)
        he.parentNode === ue && ge.push(he);
      if (ge.length) {
        for (const he of ge)
          K.push(wc(he.id));
        _ && W(ge);
        for (const he of ge)
          fe(he.id);
      }
    }
    for (const ue of j) {
      const ge = typeof ue == "string" ? c(ue) : ue;
      ge && (pt(ge.deletable) && !ge.deletable || (K.push(wc(ge.id)), _ && W([ge]), E && fe(ge.id)));
    }
    J.length && e.hooks.edgesChange.trigger(J), K.length && e.hooks.nodesChange.trigger(K);
  }, $ = (b) => {
    const _ = b instanceof Function ? b(e.edges) : b, E = Array.isArray(_) ? _ : [_], x = [];
    for (const j of E) {
      const K = typeof j == "string" ? d(j) : j;
      K && (pt(K.deletable) && !K.deletable || x.push(
        kc(
          typeof j == "string" ? j : j.id,
          K.source,
          K.target,
          K.sourceHandle,
          K.targetHandle
        )
      ));
    }
    e.hooks.edgesChange.trigger(x);
  }, V = (b, _, E = !0) => {
    const x = d(b.id), j = sC(b, _, x, E, e.hooks.error.trigger);
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
      return e.edges.splice(e.edges.indexOf(x), 1, K), bl(e.connectionLookup, [K]), K;
    }
    return !1;
  }, U = (b, _, E = { replace: !1 }) => {
    const x = d(b);
    if (!x)
      return;
    const j = typeof _ == "function" ? _(x) : _;
    x.data = E.replace ? j : { ...x.data, ...j };
  }, ee = (b) => bc(b, e.nodes), ce = (b) => {
    const _ = bc(b, e.edges);
    return bl(e.connectionLookup, _), _;
  }, ve = (b, _, E = { replace: !1 }) => {
    const x = c(b);
    if (!x)
      return;
    const j = typeof _ == "function" ? _(x) : _;
    E.replace ? e.nodes.splice(e.nodes.indexOf(x), 1, j) : Object.assign(x, j);
  }, re = (b, _, E = { replace: !1 }) => {
    const x = c(b);
    if (!x)
      return;
    const j = typeof _ == "function" ? _(x) : _;
    x.data = E.replace ? j : { ...x.data, ...j };
  }, be = (b, _, E = !1) => {
    E ? e.connectionClickStartHandle = b : e.connectionStartHandle = b, e.connectionEndHandle = null, e.connectionStatus = null, _ && (e.connectionPosition = _);
  }, pe = (b, _ = null, E = null) => {
    e.connectionStartHandle && (e.connectionPosition = b, e.connectionEndHandle = _, e.connectionStatus = E);
  }, de = (b, _) => {
    e.connectionPosition = { x: Number.NaN, y: Number.NaN }, e.connectionEndHandle = null, e.connectionStatus = null, _ ? e.connectionClickStartHandle = null : e.connectionStartHandle = null;
  }, Ie = (b) => {
    const _ = VE(b), E = _ ? null : Zo(b) ? b : c(b.id);
    return !_ && !E ? [null, null, _] : [_ ? b : nr(E), E, _];
  }, Me = (b, _ = !0, E = e.nodes) => {
    const [x, j, K] = Ie(b);
    if (!x)
      return [];
    const J = [];
    for (const W of E || e.nodes) {
      if (!K && (W.id === j.id || !W.computedPosition))
        continue;
      const fe = nr(W), ue = or(fe, x);
      (_ && ue > 0 || ue >= Number(x.width) * Number(x.height)) && J.push(W);
    }
    return J;
  }, ne = (b, _, E = !0) => {
    const [x] = Ie(b);
    if (!x)
      return !1;
    const j = or(x, _);
    return E && j > 0 || j >= Number(x.width) * Number(x.height);
  }, xe = (b) => {
    const { viewport: _, dimensions: E, d3Zoom: x, d3Selection: j, translateExtent: K } = e;
    if (!x || !j || !b.x && !b.y)
      return !1;
    const J = Lo.translate(_.x + b.x, _.y + b.y).scale(_.zoom), W = [
      [0, 0],
      [E.width, E.height]
    ], fe = x.constrain()(J, W, K), ue = e.viewport.x !== fe.x || e.viewport.y !== fe.y || e.viewport.zoom !== fe.k;
    return x.transform(j, fe), ue;
  }, Ee = (b) => {
    const _ = b instanceof Function ? b(e) : b, E = [
      "d3Zoom",
      "d3Selection",
      "d3ZoomHandler",
      "viewportRef",
      "vueFlowRef",
      "dimensions",
      "hooks"
    ];
    pt(_.defaultEdgeOptions) && (e.defaultEdgeOptions = _.defaultEdgeOptions);
    const x = _.modelValue || _.nodes || _.edges ? [] : void 0;
    x && (_.modelValue && x.push(..._.modelValue), _.nodes && x.push(..._.nodes), _.edges && x.push(..._.edges), D(x));
    const j = () => {
      pt(_.maxZoom) && O(_.maxZoom), pt(_.minZoom) && C(_.minZoom), pt(_.translateExtent) && q(_.translateExtent);
    };
    for (const K of Object.keys(_)) {
      const J = K, W = _[J];
      ![...yC, ...E].includes(J) && pt(W) && (e[J] = W);
    }
    Gl(() => e.d3Zoom).not.toBeNull().then(j), e.initialized || (e.initialized = !0);
  };
  return {
    updateNodePositions: f,
    updateNodeDimensions: p,
    setElements: D,
    setNodes: X,
    setEdges: ie,
    addNodes: G,
    addEdges: h,
    removeNodes: A,
    removeEdges: $,
    findNode: c,
    findEdge: d,
    updateEdge: V,
    updateEdgeData: U,
    updateNode: ve,
    updateNodeData: re,
    applyEdgeChanges: ce,
    applyNodeChanges: ee,
    addSelectedElements: P,
    addSelectedNodes: w,
    addSelectedEdges: S,
    setMinZoom: C,
    setMaxZoom: O,
    setTranslateExtent: q,
    setNodeExtent: Y,
    setPaneClickDistance: B,
    removeSelectedElements: y,
    removeSelectedNodes: z,
    removeSelectedEdges: L,
    startConnection: be,
    updateConnection: pe,
    endConnection: de,
    setInteractive: M,
    setState: Ee,
    getIntersectingNodes: Me,
    getIncomers: i,
    getOutgoers: l,
    getConnectedEdges: r,
    getHandleConnections: u,
    isNodeIntersecting: ne,
    panBy: xe,
    fitView: (b) => o.value.fitView(b),
    zoomIn: (b) => o.value.zoomIn(b),
    zoomOut: (b) => o.value.zoomOut(b),
    zoomTo: (b, _) => o.value.zoomTo(b, _),
    setViewport: (b, _) => o.value.setViewport(b, _),
    setTransform: (b, _) => o.value.setTransform(b, _),
    getViewport: () => o.value.getViewport(),
    getTransform: () => o.value.getTransform(),
    setCenter: (b, _, E) => o.value.setCenter(b, _, E),
    fitBounds: (b, _) => o.value.fitBounds(b, _),
    project: (b) => o.value.project(b),
    screenToFlowCoordinate: (b) => o.value.screenToFlowCoordinate(b),
    flowToScreenCoordinate: (b) => o.value.flowToScreenCoordinate(b),
    toObject: () => {
      const b = [], _ = [];
      for (const E of e.nodes) {
        const {
          computedPosition: x,
          handleBounds: j,
          selected: K,
          dimensions: J,
          isParent: W,
          resizing: fe,
          dragging: ue,
          events: ge,
          ...he
        } = E;
        b.push(he);
      }
      for (const E of e.edges) {
        const { selected: x, sourceNode: j, targetNode: K, events: J, ...W } = E;
        _.push(W);
      }
      return JSON.parse(
        JSON.stringify({
          nodes: b,
          edges: _,
          position: [e.viewport.x, e.viewport.y],
          zoom: e.viewport.zoom,
          viewport: e.viewport
        })
      );
    },
    fromObject: (b) => new Promise((_) => {
      const { nodes: E, edges: x, position: j, zoom: K, viewport: J } = b;
      if (E && X(E), x && ie(x), J != null && J.x && (J != null && J.y) || j) {
        const W = (J == null ? void 0 : J.x) || j[0], fe = (J == null ? void 0 : J.y) || j[1], ue = (J == null ? void 0 : J.zoom) || K || e.viewport.zoom;
        return Gl(() => o.value.viewportInitialized).toBe(!0).then(() => {
          o.value.setViewport({
            x: W,
            y: fe,
            zoom: ue
          }).then(() => {
            _(!0);
          });
        });
      } else
        _(!0);
    }),
    updateNodeInternals: s,
    viewportHelper: o,
    $reset: () => {
      const b = Op();
      if (e.edges = [], e.nodes = [], e.d3Zoom && e.d3Selection) {
        const _ = Lo.translate(b.defaultViewport.x ?? 0, b.defaultViewport.y ?? 0).scale(go(b.defaultViewport.zoom ?? 1, b.minZoom, b.maxZoom)), E = e.viewportRef.getBoundingClientRect(), x = [
          [0, 0],
          [E.width, E.height]
        ], j = e.d3Zoom.constrain()(_, x, b.translateExtent);
        e.d3Zoom.transform(e.d3Selection, j);
      }
      Ee(b);
    },
    $destroy: () => {
    }
  };
}
const _C = ["data-id", "data-handleid", "data-nodeid", "data-handlepos"], wC = {
  name: "Handle",
  compatConfig: { MODE: 3 }
}, jn = /* @__PURE__ */ He({
  ...wC,
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
    const n = Nd(e, ["position", "connectable", "connectableStart", "connectableEnd", "id"]), o = tt(() => n.type ?? "source"), s = tt(() => n.isValidConnection ?? null), {
      connectionStartHandle: i,
      connectionClickStartHandle: l,
      connectionEndHandle: r,
      vueFlowRef: u,
      nodesConnectable: c,
      noDragClassName: d,
      noPanClassName: f
    } = ot(), { id: p, node: v, nodeEl: w, connectedEdges: S } = Mp(), P = te(), z = tt(() => typeof e.connectableStart < "u" ? e.connectableStart : !0), L = tt(() => typeof e.connectableEnd < "u" ? e.connectableEnd : !0), y = tt(
      () => {
        var X, ie, D, G, h, A;
        return ((X = i.value) == null ? void 0 : X.nodeId) === p && ((ie = i.value) == null ? void 0 : ie.handleId) === e.id && ((D = i.value) == null ? void 0 : D.type) === o.value || ((G = r.value) == null ? void 0 : G.nodeId) === p && ((h = r.value) == null ? void 0 : h.handleId) === e.id && ((A = r.value) == null ? void 0 : A.type) === o.value;
      }
    ), C = tt(
      () => {
        var X, ie, D;
        return ((X = l.value) == null ? void 0 : X.nodeId) === p && ((ie = l.value) == null ? void 0 : ie.handleId) === e.id && ((D = l.value) == null ? void 0 : D.type) === o.value;
      }
    ), { handlePointerDown: O, handleClick: q } = Tp({
      nodeId: p,
      handleId: e.id,
      isValidConnection: s,
      type: o
    }), Y = ae(() => typeof e.connectable == "string" && e.connectable === "single" ? !S.value.some((X) => {
      const ie = X[`${o.value}Handle`];
      return X[o.value] !== p ? !1 : ie ? ie === e.id : !0;
    }) : typeof e.connectable == "number" ? S.value.filter((X) => {
      const ie = X[`${o.value}Handle`];
      return X[o.value] !== p ? !1 : ie ? ie === e.id : !0;
    }).length < e.connectable : typeof e.connectable == "function" ? e.connectable(v, S.value) : pt(e.connectable) ? e.connectable : c.value);
    St(() => {
      var X;
      if (!v.dimensions.width || !v.dimensions.height)
        return;
      const ie = (X = v.handleBounds[o.value]) == null ? void 0 : X.find((U) => U.id === e.id);
      if (!u.value || ie)
        return;
      const D = u.value.querySelector(".vue-flow__transformationpane");
      if (!w.value || !P.value || !D || !e.id)
        return;
      const G = w.value.getBoundingClientRect(), h = P.value.getBoundingClientRect(), A = window.getComputedStyle(D), { m22: $ } = new window.DOMMatrixReadOnly(A.transform), V = {
        id: e.id,
        position: e.position,
        x: (h.left - G.left) / $,
        y: (h.top - G.top) / $,
        ...Bi(P.value)
      };
      v.handleBounds[o.value] = [...v.handleBounds[o.value] ?? [], V];
    }), Ti(() => {
      const X = v.handleBounds[o.value];
      X && (v.handleBounds[o.value] = X.filter((ie) => ie.id !== e.id));
    });
    function B(X) {
      const ie = Br(X);
      Y.value && z.value && (ie && X.button === 0 || !ie) && O(X);
    }
    function M(X) {
      !p || !l.value && !z.value || Y.value && q(X);
    }
    return t({
      handleClick: q,
      handlePointerDown: O,
      onClick: M,
      onPointerDown: B
    }), (X, ie) => (g(), k("div", {
      ref_key: "handle",
      ref: P,
      "data-id": `${H(p)}-${e.id}-${o.value}`,
      "data-handleid": e.id,
      "data-nodeid": H(p),
      "data-handlepos": X.position,
      class: ye(["vue-flow__handle", [
        `vue-flow__handle-${X.position}`,
        `vue-flow__handle-${e.id}`,
        H(d),
        H(f),
        o.value,
        {
          connectable: Y.value,
          connecting: C.value,
          connectablestart: z.value,
          connectableend: L.value,
          connectionindicator: Y.value && (z.value && !y.value || L.value && y.value)
        }
      ]]),
      onMousedown: B,
      onTouchstartPassive: B,
      onClick: M
    }, [
      fo(X.$slots, "default", { id: X.id })
    ], 42, _C));
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
    Xe(jn, { type: "target", position: t, connectable: o, isValidConnection: s }),
    typeof r != "string" && r ? Xe(r) : Xe(Se, [r]),
    Xe(jn, { type: "source", position: e, connectable: o, isValidConnection: i })
  ];
};
Gi.props = ["sourcePosition", "targetPosition", "label", "isValidTargetPos", "isValidSourcePos", "connectable", "data"];
Gi.inheritAttrs = !1;
Gi.compatConfig = { MODE: 3 };
const kC = Gi, qi = function({
  targetPosition: e = $e.Top,
  label: t,
  connectable: n = !0,
  isValidTargetPos: o,
  data: s
}) {
  const i = s.label || t;
  return [
    Xe(jn, { type: "target", position: e, connectable: n, isValidConnection: o }),
    typeof i != "string" && i ? Xe(i) : Xe(Se, [i])
  ];
};
qi.props = ["targetPosition", "label", "isValidTargetPos", "connectable", "data"];
qi.inheritAttrs = !1;
qi.compatConfig = { MODE: 3 };
const EC = qi, Yi = function({
  sourcePosition: e = $e.Bottom,
  label: t,
  connectable: n = !0,
  isValidSourcePos: o,
  data: s
}) {
  const i = s.label || t;
  return [
    typeof i != "string" && i ? Xe(i) : Xe(Se, [i]),
    Xe(jn, { type: "source", position: e, connectable: n, isValidConnection: o })
  ];
};
Yi.props = ["sourcePosition", "label", "isValidSourcePos", "connectable", "data"];
Yi.inheritAttrs = !1;
Yi.compatConfig = { MODE: 3 };
const CC = Yi, SC = ["transform"], xC = ["width", "height", "x", "y", "rx", "ry"], $C = ["y"], IC = {
  name: "EdgeText",
  compatConfig: { MODE: 3 }
}, NC = /* @__PURE__ */ He({
  ...IC,
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
    St(s), ze([() => e.x, () => e.y, n, () => e.label], s);
    function s() {
      if (!n.value)
        return;
      const i = n.value.getBBox();
      (i.width !== t.value.width || i.height !== t.value.height) && (t.value = i);
    }
    return (i, l) => (g(), k("g", {
      transform: o.value,
      class: "vue-flow__edge-textwrapper"
    }, [
      i.labelShowBg ? (g(), k("rect", {
        key: 0,
        class: "vue-flow__edge-textbg",
        width: `${t.value.width + 2 * i.labelBgPadding[0]}px`,
        height: `${t.value.height + 2 * i.labelBgPadding[1]}px`,
        x: -i.labelBgPadding[0],
        y: -i.labelBgPadding[1],
        style: et(i.labelBgStyle),
        rx: i.labelBgBorderRadius,
        ry: i.labelBgBorderRadius
      }, null, 12, xC)) : oe("", !0),
      a("text", xr(i.$attrs, {
        ref_key: "el",
        ref: n,
        class: "vue-flow__edge-text",
        y: t.value.height / 2,
        dy: "0.3em",
        style: i.labelStyle
      }), [
        fo(i.$slots, "default", {}, () => [
          typeof i.label != "string" ? (g(), ht(kr(i.label), { key: 0 })) : (g(), k(Se, { key: 1 }, [
            _e(T(i.label), 1)
          ], 64))
        ])
      ], 16, $C)
    ], 8, SC));
  }
}), TC = ["id", "d", "marker-end", "marker-start"], MC = ["d", "stroke-width"], PC = {
  name: "BaseEdge",
  inheritAttrs: !1,
  compatConfig: { MODE: 3 }
}, $s = /* @__PURE__ */ He({
  ...PC,
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
    const n = Nd(e, ["interactionWidth", "labelShowBg"]), o = te(null), s = te(null), i = te(null), l = Zh();
    return t({
      pathEl: o,
      interactionEl: s,
      labelEl: i
    }), (r, u) => (g(), k(Se, null, [
      a("path", {
        id: r.id,
        ref_key: "pathEl",
        ref: o,
        d: r.path,
        style: et(n.style),
        class: ye(["vue-flow__edge-path", H(l).class]),
        "marker-end": r.markerEnd,
        "marker-start": r.markerStart
      }, null, 14, TC),
      r.interactionWidth ? (g(), k("path", {
        key: 0,
        ref_key: "interactionEl",
        ref: s,
        fill: "none",
        d: r.path,
        "stroke-width": r.interactionWidth,
        "stroke-opacity": 0,
        class: "vue-flow__edge-interaction"
      }, null, 8, MC)) : oe("", !0),
      r.label && r.labelX && r.labelY ? (g(), ht(NC, {
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
      }, null, 8, ["x", "y", "label", "label-show-bg", "label-bg-style", "label-bg-padding", "label-bg-border-radius", "label-style"])) : oe("", !0)
    ], 64));
  }
});
function Ap({
  sourceX: e,
  sourceY: t,
  targetX: n,
  targetY: o
}) {
  const s = Math.abs(n - e) / 2, i = n < e ? n + s : n - s, l = Math.abs(o - t) / 2, r = o < t ? o + l : o - l;
  return [i, r, s, l];
}
function Dp({
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
function Mc({ pos: e, x1: t, y1: n, x2: o, y2: s, c: i }) {
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
function Rp(e) {
  const {
    sourceX: t,
    sourceY: n,
    sourcePosition: o = $e.Bottom,
    targetX: s,
    targetY: i,
    targetPosition: l = $e.Top,
    curvature: r = 0.25
  } = e, [u, c] = Mc({
    pos: o,
    x1: t,
    y1: n,
    x2: s,
    y2: i,
    c: r
  }), [d, f] = Mc({
    pos: l,
    x1: s,
    y1: i,
    x2: t,
    y2: n,
    c: r
  }), [p, v, w, S] = Dp({
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
    v,
    w,
    S
  ];
}
function Pc({ pos: e, x1: t, y1: n, x2: o, y2: s }) {
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
function Lp(e) {
  const {
    sourceX: t,
    sourceY: n,
    sourcePosition: o = $e.Bottom,
    targetX: s,
    targetY: i,
    targetPosition: l = $e.Top
  } = e, [r, u] = Pc({
    pos: o,
    x1: t,
    y1: n,
    x2: s,
    y2: i
  }), [c, d] = Pc({
    pos: l,
    x1: s,
    y1: i,
    x2: t,
    y2: n
  }), [f, p, v, w] = Dp({
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
    v,
    w
  ];
}
const Oc = {
  [$e.Left]: { x: -1, y: 0 },
  [$e.Right]: { x: 1, y: 0 },
  [$e.Top]: { x: 0, y: -1 },
  [$e.Bottom]: { x: 0, y: 1 }
};
function OC({
  source: e,
  sourcePosition: t = $e.Bottom,
  target: n
}) {
  return t === $e.Left || t === $e.Right ? e.x < n.x ? { x: 1, y: 0 } : { x: -1, y: 0 } : e.y < n.y ? { x: 0, y: 1 } : { x: 0, y: -1 };
}
function Ac(e, t) {
  return Math.sqrt((t.x - e.x) ** 2 + (t.y - e.y) ** 2);
}
function AC({
  source: e,
  sourcePosition: t = $e.Bottom,
  target: n,
  targetPosition: o = $e.Top,
  center: s,
  offset: i
}) {
  const l = Oc[t], r = Oc[o], u = { x: e.x + l.x * i, y: e.y + l.y * i }, c = { x: n.x + r.x * i, y: n.y + r.y * i }, d = OC({
    source: u,
    sourcePosition: t,
    target: c
  }), f = d.x !== 0 ? "x" : "y", p = d[f];
  let v, w, S;
  const P = { x: 0, y: 0 }, z = { x: 0, y: 0 }, [L, y, C, O] = Ap({
    sourceX: e.x,
    sourceY: e.y,
    targetX: n.x,
    targetY: n.y
  });
  if (l[f] * r[f] === -1) {
    w = s.x ?? L, S = s.y ?? y;
    const Y = [
      { x: w, y: u.y },
      { x: w, y: c.y }
    ], B = [
      { x: u.x, y: S },
      { x: c.x, y: S }
    ];
    l[f] === p ? v = f === "x" ? Y : B : v = f === "x" ? B : Y;
  } else {
    const Y = [{ x: u.x, y: c.y }], B = [{ x: c.x, y: u.y }];
    if (f === "x" ? v = l.x === p ? B : Y : v = l.y === p ? Y : B, t === o) {
      const G = Math.abs(e[f] - n[f]);
      if (G <= i) {
        const h = Math.min(i - 1, i - G);
        l[f] === p ? P[f] = (u[f] > e[f] ? -1 : 1) * h : z[f] = (c[f] > n[f] ? -1 : 1) * h;
      }
    }
    if (t !== o) {
      const G = f === "x" ? "y" : "x", h = l[f] === r[G], A = u[G] > c[G], $ = u[G] < c[G];
      (l[f] === 1 && (!h && A || h && $) || l[f] !== 1 && (!h && $ || h && A)) && (v = f === "x" ? Y : B);
    }
    const M = { x: u.x + P.x, y: u.y + P.y }, X = { x: c.x + z.x, y: c.y + z.y }, ie = Math.max(Math.abs(M.x - v[0].x), Math.abs(X.x - v[0].x)), D = Math.max(Math.abs(M.y - v[0].y), Math.abs(X.y - v[0].y));
    ie >= D ? (w = (M.x + X.x) / 2, S = v[0].y) : (w = v[0].x, S = (M.y + X.y) / 2);
  }
  return [[
    e,
    { x: u.x + P.x, y: u.y + P.y },
    ...v,
    { x: c.x + z.x, y: c.y + z.y },
    n
  ], w, S, C, O];
}
function DC(e, t, n, o) {
  const s = Math.min(Ac(e, t) / 2, Ac(t, n) / 2, o), { x: i, y: l } = t;
  if (e.x === i && i === n.x || e.y === l && l === n.y)
    return `L${i} ${l}`;
  if (e.y === l) {
    const c = e.x < n.x ? -1 : 1, d = e.y < n.y ? 1 : -1;
    return `L ${i + s * c},${l}Q ${i},${l} ${i},${l + s * d}`;
  }
  const r = e.x < n.x ? 1 : -1, u = e.y < n.y ? -1 : 1;
  return `L ${i},${l + s * u}Q ${i},${l} ${i + s * r},${l}`;
}
function ir(e) {
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
  } = e, [f, p, v, w, S] = AC({
    source: { x: t, y: n },
    sourcePosition: o,
    target: { x: s, y: i },
    targetPosition: l,
    center: { x: u, y: c },
    offset: d
  });
  return [f.reduce((z, L, y) => {
    let C;
    return y > 0 && y < f.length - 1 ? C = DC(f[y - 1], L, f[y + 1], r) : C = `${y === 0 ? "M" : "L"}${L.x} ${L.y}`, z += C, z;
  }, ""), p, v, w, S];
}
function RC(e) {
  const { sourceX: t, sourceY: n, targetX: o, targetY: s } = e, [i, l, r, u] = Ap({
    sourceX: t,
    sourceY: n,
    targetX: o,
    targetY: s
  });
  return [`M ${t},${n}L ${o},${s}`, i, l, r, u];
}
const LC = /* @__PURE__ */ He({
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
      const [n, o, s] = RC(e);
      return Xe($s, {
        path: n,
        labelX: o,
        labelY: s,
        ...t,
        ...e
      });
    };
  }
}), VC = LC, zC = /* @__PURE__ */ He({
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
      const [n, o, s] = ir({
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
}), Vp = zC, FC = /* @__PURE__ */ He({
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
    return () => Xe(Vp, { ...e, ...t, borderRadius: 0 });
  }
}), BC = FC, HC = /* @__PURE__ */ He({
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
}), UC = HC, jC = /* @__PURE__ */ He({
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
      const [n, o, s] = Lp({
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
}), GC = jC, qC = {
  input: CC,
  default: kC,
  output: EC
}, YC = {
  default: UC,
  straight: VC,
  step: BC,
  smoothstep: Vp,
  simplebezier: GC
};
function XC(e, t, n) {
  const o = ae(() => (S) => t.value.get(S)), s = ae(() => (S) => n.value.get(S)), i = ae(() => {
    const S = {
      ...YC,
      ...e.edgeTypes
    }, P = Object.keys(S);
    for (const z of e.edges)
      z.type && !P.includes(z.type) && (S[z.type] = z.type);
    return S;
  }), l = ae(() => {
    const S = {
      ...qC,
      ...e.nodeTypes
    }, P = Object.keys(S);
    for (const z of e.nodes)
      z.type && !P.includes(z.type) && (S[z.type] = z.type);
    return S;
  }), r = ae(() => e.onlyRenderVisibleElements ? bp(
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
      const S = [];
      for (const P of e.edges) {
        const z = t.value.get(P.source), L = t.value.get(P.target);
        WE({
          sourcePos: z.computedPosition || { x: 0, y: 0 },
          targetPos: L.computedPosition || { x: 0, y: 0 },
          sourceWidth: z.dimensions.width,
          sourceHeight: z.dimensions.height,
          targetWidth: L.dimensions.width,
          targetHeight: L.dimensions.height,
          width: e.dimensions.width,
          height: e.dimensions.height,
          viewport: e.viewport
        }) && S.push(P);
      }
      return S;
    }
    return e.edges;
  }), c = ae(() => [...r.value, ...u.value]), d = ae(() => {
    const S = [];
    for (const P of e.nodes)
      P.selected && S.push(P);
    return S;
  }), f = ae(() => {
    const S = [];
    for (const P of e.edges)
      P.selected && S.push(P);
    return S;
  }), p = ae(() => [
    ...d.value,
    ...f.value
  ]), v = ae(() => {
    const S = [];
    for (const P of e.nodes)
      P.dimensions.width && P.dimensions.height && P.handleBounds !== void 0 && S.push(P);
    return S;
  }), w = ae(
    () => r.value.length > 0 && v.value.length === r.value.length
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
    getNodesInitialized: v,
    areNodesInitialized: w
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
    const o = Op(), s = un(o), i = {};
    for (const [p, v] of Object.entries(s.hooks)) {
      const w = `on${p.charAt(0).toUpperCase() + p.slice(1)}`;
      i[w] = v.on;
    }
    const l = {};
    for (const [p, v] of Object.entries(s.hooks))
      l[p] = v.trigger;
    const r = ae(() => {
      const p = /* @__PURE__ */ new Map();
      for (const v of s.nodes)
        p.set(v.id, v);
      return p;
    }), u = ae(() => {
      const p = /* @__PURE__ */ new Map();
      for (const v of s.edges)
        p.set(v.id, v);
      return p;
    }), c = XC(s, r, u), d = bC(s, r, u);
    d.setState({ ...s, ...n });
    const f = {
      ...i,
      ...c,
      ...d,
      ...J0(s),
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
  const t = no.getInstance(), n = fr(), o = typeof e == "object", s = o ? e : { id: e }, i = s.id, l = i ?? (n == null ? void 0 : n.vueFlowId);
  let r;
  if (n) {
    const u = dn(Tc, null);
    typeof u < "u" && u !== null && (!l || u.id === l) && (r = u);
  }
  if (r || l && (r = t.get(l)), !r || l && r.id !== l) {
    const u = i ?? t.getId(), c = t.create(u, s);
    r = c, (n ?? Xc(!0)).run(() => {
      ze(
        c.applyDefault,
        (f, p, v) => {
          const w = (P) => {
            c.applyNodeChanges(P);
          }, S = (P) => {
            c.applyEdgeChanges(P);
          };
          f ? (c.onNodesChange(w), c.onEdgesChange(S)) : (c.hooks.value.nodesChange.off(w), c.hooks.value.edgesChange.off(S)), v(() => {
            c.hooks.value.nodesChange.off(w), c.hooks.value.edgesChange.off(S);
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
  if (n && (po(Tc, r), n.vueFlowId = r.id), o) {
    const u = zo();
    (u == null ? void 0 : u.type.name) !== "VueFlow" && r.emits.error(new wt(vt.USEVUEFLOW_OPTIONS));
  }
  return r;
}
function KC(e) {
  const { emits: t, dimensions: n } = ot();
  let o;
  St(() => {
    const s = e.value, i = () => {
      if (!s)
        return;
      const l = Bi(s);
      (l.width === 0 || l.height === 0) && t.error(new wt(vt.MISSING_VIEWPORT_DIMENSIONS)), n.value = { width: l.width || 500, height: l.height || 500 };
    };
    i(), window.addEventListener("resize", i), s && (o = new ResizeObserver(() => i()), o.observe(s)), Tn(() => {
      window.removeEventListener("resize", i), o && s && o.unobserve(s);
    });
  });
}
const WC = {
  name: "UserSelection",
  compatConfig: { MODE: 3 }
}, ZC = /* @__PURE__ */ He({
  ...WC,
  props: {
    userSelectionRect: {}
  },
  setup(e) {
    return (t, n) => (g(), k("div", {
      class: "vue-flow__selection vue-flow__container",
      style: et({
        width: `${t.userSelectionRect.width}px`,
        height: `${t.userSelectionRect.height}px`,
        transform: `translate(${t.userSelectionRect.x}px, ${t.userSelectionRect.y}px)`
      })
    }, null, 4));
  }
}), JC = ["tabIndex"], QC = {
  name: "NodesSelection",
  compatConfig: { MODE: 3 }
}, eS = /* @__PURE__ */ He({
  ...QC,
  setup(e) {
    const { emits: t, viewport: n, getSelectedNodes: o, noPanClassName: s, disableKeyboardA11y: i, userSelectionActive: l } = ot(), r = Pp(), u = te(null), c = Np({
      el: u,
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
    St(() => {
      var w;
      i.value || (w = u.value) == null || w.focus({ preventScroll: !0 });
    });
    const d = ae(() => yp(o.value)), f = ae(() => ({
      width: `${d.value.width}px`,
      height: `${d.value.height}px`,
      top: `${d.value.y}px`,
      left: `${d.value.x}px`
    }));
    function p(w) {
      t.selectionContextMenu({ event: w, nodes: o.value });
    }
    function v(w) {
      i || Mo[w.key] && (w.preventDefault(), r(
        {
          x: Mo[w.key].x,
          y: Mo[w.key].y
        },
        w.shiftKey
      ));
    }
    return (w, S) => !H(l) && d.value.width && d.value.height ? (g(), k("div", {
      key: 0,
      class: ye(["vue-flow__nodesselection vue-flow__container", H(s)]),
      style: et({ transform: `translate(${H(n).x}px,${H(n).y}px) scale(${H(n).zoom})` })
    }, [
      a("div", {
        ref_key: "el",
        ref: u,
        class: ye([{ dragging: H(c) }, "vue-flow__nodesselection-rect"]),
        style: et(f.value),
        tabIndex: H(i) ? void 0 : -1,
        onContextmenu: p,
        onKeydown: v
      }, null, 46, JC)
    ], 6)) : oe("", !0);
  }
});
function tS(e, t) {
  return {
    x: e.clientX - t.left,
    y: e.clientY - t.top
  };
}
const nS = {
  name: "Pane",
  compatConfig: { MODE: 3 }
}, oS = /* @__PURE__ */ He({
  ...nS,
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
      removeEdges: v,
      selectionMode: w,
      deleteKeyCode: S,
      multiSelectionKeyCode: P,
      multiSelectionActive: z,
      edgeLookup: L,
      nodeLookup: y
    } = ot(), C = te(null), O = te(0), q = te(0), Y = te(), B = te(/* @__PURE__ */ new Map()), M = tt(() => u.value && (e.isSelecting || i.value));
    let X = !1, ie = !1;
    const D = ls(S, { actInsideInputWithModifier: !1 }), G = ls(P);
    ze(D, (re) => {
      re && (p(f.value), v(d.value), c.value = !1);
    }), ze(G, (re) => {
      z.value = re;
    });
    function h(re, be) {
      return (pe) => {
        pe.target === be && (re == null || re(pe));
      };
    }
    function A() {
      i.value = !1, r.value = null, O.value = 0, q.value = 0;
    }
    function $(re) {
      if (X) {
        X = !1;
        return;
      }
      s.paneClick(re), l(), c.value = !1;
    }
    function V(re) {
      re.preventDefault(), re.stopPropagation(), s.paneContextMenu(re);
    }
    function U(re) {
      s.paneScroll(re);
    }
    function ee(re) {
      var be, pe, de, Ie, Me;
      if (Y.value = (be = t.value) == null ? void 0 : be.getBoundingClientRect(), !u.value || !e.isSelecting || re.button !== 0 || re.target !== C.value || !Y.value)
        return;
      (de = (pe = re.target) == null ? void 0 : pe.setPointerCapture) == null || de.call(pe, re.pointerId);
      const { x: ne, y: xe } = tS(re, Y.value);
      ie = !0, X = !1, B.value = /* @__PURE__ */ new Map();
      for (const [Ee, ke] of L.value)
        B.value.set(ke.source, ((Ie = B.value.get(ke.source)) == null ? void 0 : Ie.add(Ee)) || /* @__PURE__ */ new Set([Ee])), B.value.set(ke.target, ((Me = B.value.get(ke.target)) == null ? void 0 : Me.add(Ee)) || /* @__PURE__ */ new Set([Ee]));
      l(), r.value = {
        width: 0,
        height: 0,
        startX: ne,
        startY: xe,
        x: ne,
        y: xe
      }, s.selectionStart(re);
    }
    function ce(re) {
      if (!Y.value || !r.value)
        return;
      X = !0;
      const { x: be, y: pe } = $n(re, Y.value), { startX: de = 0, startY: Ie = 0 } = r.value, Me = {
        startX: de,
        startY: Ie,
        x: be < de ? be : de,
        y: pe < Ie ? pe : Ie,
        width: Math.abs(be - de),
        height: Math.abs(pe - Ie)
      }, ne = bp(
        n.value,
        Me,
        o.value,
        w.value === zr.Partial,
        !0
      ), xe = /* @__PURE__ */ new Set(), Ee = /* @__PURE__ */ new Set();
      for (const ke of ne) {
        Ee.add(ke.id);
        const I = B.value.get(ke.id);
        if (I)
          for (const R of I)
            xe.add(R);
      }
      if (O.value !== Ee.size) {
        O.value = Ee.size;
        const ke = Rn(y.value, Ee, !0);
        s.nodesChange(ke);
      }
      if (q.value !== xe.size) {
        q.value = xe.size;
        const ke = Rn(L.value, xe);
        s.edgesChange(ke);
      }
      r.value = Me, i.value = !0, c.value = !1;
    }
    function ve(re) {
      var be;
      re.button !== 0 || !ie || ((be = re.target) == null || be.releasePointerCapture(re.pointerId), !i.value && r.value && re.target === C.value && $(re), O.value > 0 && (c.value = !0), A(), s.selectionEnd(re), e.selectionKeyPressed && (X = !1), ie = !1);
    }
    return (re, be) => (g(), k("div", {
      ref_key: "container",
      ref: C,
      class: ye(["vue-flow__pane vue-flow__container", { selection: re.isSelecting }]),
      onClick: be[0] || (be[0] = (pe) => M.value ? void 0 : h($, C.value)(pe)),
      onContextmenu: be[1] || (be[1] = (pe) => h(V, C.value)(pe)),
      onWheelPassive: be[2] || (be[2] = (pe) => h(U, C.value)(pe)),
      onPointerenter: be[3] || (be[3] = (pe) => M.value ? void 0 : H(s).paneMouseEnter(pe)),
      onPointerdown: be[4] || (be[4] = (pe) => M.value ? ee(pe) : H(s).paneMouseMove(pe)),
      onPointermove: be[5] || (be[5] = (pe) => M.value ? ce(pe) : H(s).paneMouseMove(pe)),
      onPointerup: be[6] || (be[6] = (pe) => M.value ? ve(pe) : void 0),
      onPointerleave: be[7] || (be[7] = (pe) => H(s).paneMouseLeave(pe))
    }, [
      fo(re.$slots, "default"),
      H(i) && H(r) ? (g(), ht(ZC, {
        key: 0,
        "user-selection-rect": H(r)
      }, null, 8, ["user-selection-rect"])) : oe("", !0),
      H(c) && H(f).length ? (g(), ht(eS, { key: 1 })) : oe("", !0)
    ], 34));
  }
}), sS = {
  name: "Transform",
  compatConfig: { MODE: 3 }
}, iS = /* @__PURE__ */ He({
  ...sS,
  setup(e) {
    const { viewport: t, fitViewOnInit: n, fitViewOnInitDone: o } = ot(), s = ae(() => n.value ? !o.value : !1), i = ae(() => `translate(${t.value.x}px,${t.value.y}px) scale(${t.value.zoom})`);
    return (l, r) => (g(), k("div", {
      class: "vue-flow__transformationpane vue-flow__container",
      style: et({ transform: i.value, opacity: s.value ? 0 : void 0 })
    }, [
      fo(l.$slots, "default")
    ], 4));
  }
}), lS = {
  name: "Viewport",
  compatConfig: { MODE: 3 }
}, rS = /* @__PURE__ */ He({
  ...lS,
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
      zoomOnPinch: v,
      zoomOnScroll: w,
      preventScrolling: S,
      noWheelClassName: P,
      noPanClassName: z,
      emits: L,
      connectionStartHandle: y,
      userSelectionActive: C,
      paneDragging: O,
      d3Zoom: q,
      d3Selection: Y,
      d3ZoomHandler: B,
      viewport: M,
      viewportRef: X,
      paneClickDistance: ie
    } = ot();
    KC(X);
    const D = te(!1), G = te(!1);
    let h = null, A = !1, $ = 0, V = {
      x: 0,
      y: 0,
      zoom: 0
    };
    const U = ls(r), ee = ls(l), ce = ls(i), ve = tt(
      () => (!ee.value || ee.value && l.value === !0) && (U.value || f.value)
    ), re = tt(() => U.value || u.value), be = tt(() => ee.value || l.value === !0 && ve.value !== !0);
    St(() => {
      if (!X.value) {
        Ui("Viewport element is missing");
        return;
      }
      const xe = X.value, Ee = xe.getBoundingClientRect(), ke = OE().clickDistance(ie.value).scaleExtent([t.value, n.value]).translateExtent(s.value), I = Zt(xe).call(ke), R = I.on("wheel.zoom"), b = Lo.translate(o.value.x ?? 0, o.value.y ?? 0).scale(go(o.value.zoom ?? 1, t.value, n.value)), _ = [
        [0, 0],
        [Ee.width, Ee.height]
      ], E = ke.constrain()(b, _, s.value);
      ke.transform(I, E), ke.wheelDelta(de), q.value = ke, Y.value = I, B.value = R, M.value = { x: E.x, y: E.y, zoom: E.k }, ke.on("start", (x) => {
        var j;
        if (!x.sourceEvent)
          return null;
        $ = x.sourceEvent.button, D.value = !0;
        const K = Me(x.transform);
        ((j = x.sourceEvent) == null ? void 0 : j.type) === "mousedown" && (O.value = !0), V = K, L.viewportChangeStart(K), L.moveStart({ event: x, flowTransform: K });
      }), ke.on("end", (x) => {
        if (!x.sourceEvent)
          return null;
        if (D.value = !1, O.value = !1, pe(ve.value, $ ?? 0) && !A && L.paneContextMenu(x.sourceEvent), A = !1, Ie(V, x.transform)) {
          const j = Me(x.transform);
          V = j, L.viewportChangeEnd(j), L.moveEnd({ event: x, flowTransform: j });
        }
      }), ke.filter((x) => {
        var j;
        const K = ce.value || w.value, J = v.value && x.ctrlKey, W = x.button;
        if (W === 1 && x.type === "mousedown" && (ne(x, "vue-flow__node") || ne(x, "vue-flow__edge")))
          return !0;
        if (!ve.value && !K && !re.value && !p.value && !v.value || C.value || !p.value && x.type === "dblclick" || ne(x, P.value) && x.type === "wheel" || ne(x, z.value) && (x.type !== "wheel" || re.value && x.type === "wheel" && !ce.value) || !v.value && x.ctrlKey && x.type === "wheel" || !K && !re.value && !J && x.type === "wheel")
          return !1;
        if (!v && x.type === "touchstart" && ((j = x.touches) == null ? void 0 : j.length) > 1)
          return x.preventDefault(), !1;
        if (!ve.value && (x.type === "mousedown" || x.type === "touchstart") || l.value === !0 && Array.isArray(f.value) && f.value.includes(0) && W === 0 || Array.isArray(f.value) && !f.value.includes(W) && (x.type === "mousedown" || x.type === "touchstart"))
          return !1;
        const fe = Array.isArray(f.value) && f.value.includes(W) || l.value === !0 && Array.isArray(f.value) && !f.value.includes(0) || !W || W <= 1;
        return (!x.ctrlKey || U.value || x.type === "wheel") && fe;
      }), ze(
        [C, ve],
        () => {
          C.value && !D.value ? ke.on("zoom", null) : C.value || ke.on("zoom", (x) => {
            M.value = { x: x.transform.x, y: x.transform.y, zoom: x.transform.k };
            const j = Me(x.transform);
            A = pe(ve.value, $ ?? 0), L.viewportChange(j), L.move({ event: x, flowTransform: j });
          });
        },
        { immediate: !0 }
      ), ze(
        [C, re, c, ce, v, S, P],
        () => {
          re.value && !ce.value && !C.value ? I.on(
            "wheel.zoom",
            (x) => {
              if (ne(x, P.value))
                return !1;
              const j = ce.value || w.value, K = v.value && x.ctrlKey;
              if (!(!S.value || re.value || j || K))
                return !1;
              x.preventDefault(), x.stopImmediatePropagation();
              const W = I.property("__zoom").k || 1, fe = bi();
              if (!U.value && x.ctrlKey && v.value && fe) {
                const Be = rn(x), Ae = de(x), st = W * 2 ** Ae;
                ke.scaleTo(I, st, Be, x);
                return;
              }
              const ue = x.deltaMode === 1 ? 20 : 1;
              let ge = c.value === is.Vertical ? 0 : x.deltaX * ue, he = c.value === is.Horizontal ? 0 : x.deltaY * ue;
              !fe && x.shiftKey && c.value !== is.Vertical && !ge && he && (ge = he, he = 0), ke.translateBy(
                I,
                -(ge / W) * d.value,
                -(he / W) * d.value
              );
              const Te = Me(I.property("__zoom"));
              h && clearTimeout(h), G.value ? (L.move({ event: x, flowTransform: Te }), L.viewportChange(Te), h = setTimeout(() => {
                L.moveEnd({ event: x, flowTransform: Te }), L.viewportChangeEnd(Te), G.value = !1;
              }, 150)) : (G.value = !0, L.moveStart({ event: x, flowTransform: Te }), L.viewportChangeStart(Te));
            },
            { passive: !1 }
          ) : typeof R < "u" && I.on(
            "wheel.zoom",
            function(x, j) {
              const K = !S.value && x.type === "wheel" && !x.ctrlKey, J = ce.value || w.value, W = v.value && x.ctrlKey;
              if (!J && !u.value && !W && x.type === "wheel" || K || ne(x, P.value))
                return null;
              x.preventDefault(), R.call(this, x, j);
            },
            { passive: !1 }
          );
        },
        { immediate: !0 }
      );
    });
    function pe(xe, Ee) {
      return Ee === 2 && Array.isArray(xe) && xe.includes(2);
    }
    function de(xe) {
      const Ee = xe.ctrlKey && bi() ? 10 : 1;
      return -xe.deltaY * (xe.deltaMode === 1 ? 0.05 : xe.deltaMode ? 1 : 2e-3) * Ee;
    }
    function Ie(xe, Ee) {
      return xe.x !== Ee.x && !Number.isNaN(Ee.x) || xe.y !== Ee.y && !Number.isNaN(Ee.y) || xe.zoom !== Ee.k && !Number.isNaN(Ee.k);
    }
    function Me(xe) {
      return {
        x: xe.x,
        y: xe.y,
        zoom: xe.k
      };
    }
    function ne(xe, Ee) {
      return xe.target.closest(`.${Ee}`);
    }
    return (xe, Ee) => (g(), k("div", {
      ref_key: "viewportRef",
      ref: X,
      class: "vue-flow__viewport vue-flow__container"
    }, [
      se(oS, {
        "is-selecting": be.value,
        "selection-key-pressed": H(ee),
        class: ye({
          connecting: !!H(y),
          dragging: H(O),
          draggable: H(f) === !0 || Array.isArray(H(f)) && H(f).includes(0)
        })
      }, {
        default: Un(() => [
          se(iS, null, {
            default: Un(() => [
              fo(xe.$slots, "default")
            ]),
            _: 3
          })
        ]),
        _: 3
      }, 8, ["is-selecting", "selection-key-pressed", "class"])
    ], 512));
  }
}), aS = ["id"], uS = ["id"], cS = ["id"], dS = {
  name: "A11yDescriptions",
  compatConfig: { MODE: 3 }
}, fS = /* @__PURE__ */ He({
  ...dS,
  setup(e) {
    const { id: t, disableKeyboardA11y: n, ariaLiveMessage: o } = ot();
    return (s, i) => (g(), k(Se, null, [
      a("div", {
        id: `${H(up)}-${H(t)}`,
        style: { display: "none" }
      }, " Press enter or space to select a node. " + T(H(n) ? "" : "You can then use the arrow keys to move the node around.") + " You can then use the arrow keys to move the node around, press delete to remove it and press escape to cancel. ", 9, aS),
      a("div", {
        id: `${H(cp)}-${H(t)}`,
        style: { display: "none" }
      }, " Press enter or space to select an edge. You can then press delete to remove it or press escape to cancel. ", 8, uS),
      H(n) ? oe("", !0) : (g(), k("div", {
        key: 0,
        id: `${H(LE)}-${H(t)}`,
        "aria-live": "assertive",
        "aria-atomic": "true",
        style: { position: "absolute", width: "1px", height: "1px", margin: "-1px", border: "0", padding: "0", overflow: "hidden", clip: "rect(0px, 0px, 0px, 0px)", "clip-path": "inset(100%)" }
      }, T(H(o)), 9, cS))
    ], 64));
  }
});
function pS() {
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
function hS(e, t, n) {
  return n === $e.Left ? e - t : n === $e.Right ? e + t : e;
}
function vS(e, t, n) {
  return n === $e.Top ? e - t : n === $e.Bottom ? e + t : e;
}
const Ur = function({
  radius: e = 10,
  centerX: t = 0,
  centerY: n = 0,
  position: o = $e.Top,
  type: s
}) {
  return Xe("circle", {
    class: `vue-flow__edgeupdater vue-flow__edgeupdater-${s}`,
    cx: hS(t, e, o),
    cy: vS(n, e, o),
    r: e,
    stroke: "transparent",
    fill: "transparent"
  });
};
Ur.props = ["radius", "centerX", "centerY", "position", "type"];
Ur.compatConfig = { MODE: 3 };
const Dc = Ur, gS = /* @__PURE__ */ He({
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
      multiSelectionActive: v,
      disableKeyboardA11y: w,
      elementsSelectable: S,
      edgesUpdatable: P,
      edgesFocusable: z,
      hooks: L
    } = ot(), y = ae(() => d(e.id)), { emit: C, on: O } = aC(y.value, i), q = dn(ji), Y = zo(), B = te(!1), M = te(!1), X = te(""), ie = te(null), D = te("source"), G = te(null), h = tt(
      () => typeof y.value.selectable > "u" ? S.value : y.value.selectable
    ), A = tt(() => typeof y.value.updatable > "u" ? P.value : y.value.updatable), $ = tt(() => typeof y.value.focusable > "u" ? z.value : y.value.focusable);
    po(iC, e.id), po(lC, G);
    const V = ae(() => y.value.class instanceof Function ? y.value.class(y.value) : y.value.class), U = ae(() => y.value.style instanceof Function ? y.value.style(y.value) : y.value.style), ee = ae(() => {
      const _ = y.value.type || "default", E = q == null ? void 0 : q[`edge-${_}`];
      if (E)
        return E;
      let x = y.value.template ?? u.value[_];
      if (typeof x == "string" && Y) {
        const j = Object.keys(Y.appContext.components);
        j && j.includes(_) && (x = Cd(_, !1));
      }
      return x && typeof x != "string" ? x : (i.error(new wt(vt.EDGE_TYPE_MISSING, x)), !1);
    }), { handlePointerDown: ce } = Tp({
      nodeId: X,
      handleId: ie,
      type: D,
      isValidConnection: p,
      edgeUpdaterType: D,
      onEdgeUpdate: be,
      onEdgeUpdateEnd: pe
    });
    return () => {
      const _ = f(y.value.source), E = f(y.value.target), x = "pathOptions" in y.value ? y.value.pathOptions : {};
      if (!_ && !E)
        return i.error(new wt(vt.EDGE_SOURCE_TARGET_MISSING, y.value.id, y.value.source, y.value.target)), null;
      if (!_)
        return i.error(new wt(vt.EDGE_SOURCE_MISSING, y.value.id, y.value.source)), null;
      if (!E)
        return i.error(new wt(vt.EDGE_TARGET_MISSING, y.value.id, y.value.target)), null;
      if (!y.value || y.value.hidden || _.hidden || E.hidden)
        return null;
      let j;
      o.value === vo.Strict ? j = _.handleBounds.source : j = [..._.handleBounds.source || [], ..._.handleBounds.target || []];
      const K = Cc(j, y.value.sourceHandle);
      let J;
      o.value === vo.Strict ? J = E.handleBounds.target : J = [...E.handleBounds.target || [], ...E.handleBounds.source || []];
      const W = Cc(J, y.value.targetHandle), fe = (K == null ? void 0 : K.position) || $e.Bottom, ue = (W == null ? void 0 : W.position) || $e.Top, { x: ge, y: he } = yi(_, K, fe), { x: Te, y: Be } = yi(E, W, ue);
      return y.value.sourceX = ge, y.value.sourceY = he, y.value.targetX = Te, y.value.targetY = Be, Xe(
        "g",
        {
          ref: G,
          key: e.id,
          "data-id": e.id,
          class: [
            "vue-flow__edge",
            `vue-flow__edge-${ee.value === !1 ? "default" : y.value.type || "default"}`,
            r.value,
            V.value,
            {
              updating: B.value,
              selected: y.value.selected,
              animated: y.value.animated,
              inactive: !h.value && !L.value.edgeClick.hasListeners()
            }
          ],
          onClick: Ie,
          onContextmenu: Me,
          onDblclick: ne,
          onMouseenter: xe,
          onMousemove: Ee,
          onMouseleave: ke,
          onKeyDown: $.value ? b : void 0,
          tabIndex: $.value ? 0 : void 0,
          "aria-label": y.value.ariaLabel === null ? void 0 : y.value.ariaLabel || `Edge from ${y.value.source} to ${y.value.target}`,
          "aria-describedby": $.value ? `${cp}-${t}` : void 0,
          role: $.value ? "button" : "img"
        },
        [
          M.value ? null : Xe(ee.value === !1 ? u.value.default : ee.value, {
            id: e.id,
            sourceNode: _,
            targetNode: E,
            source: y.value.source,
            target: y.value.target,
            type: y.value.type,
            updatable: A.value,
            selected: y.value.selected,
            animated: y.value.animated,
            label: y.value.label,
            labelStyle: y.value.labelStyle,
            labelShowBg: y.value.labelShowBg,
            labelBgStyle: y.value.labelBgStyle,
            labelBgPadding: y.value.labelBgPadding,
            labelBgBorderRadius: y.value.labelBgBorderRadius,
            data: y.value.data,
            events: { ...y.value.events, ...O },
            style: U.value,
            markerStart: `url('#${bs(y.value.markerStart, t)}')`,
            markerEnd: `url('#${bs(y.value.markerEnd, t)}')`,
            sourcePosition: fe,
            targetPosition: ue,
            sourceX: ge,
            sourceY: he,
            targetX: Te,
            targetY: Be,
            sourceHandleId: y.value.sourceHandle,
            targetHandleId: y.value.targetHandle,
            interactionWidth: y.value.interactionWidth,
            ...x
          }),
          [
            A.value === "source" || A.value === !0 ? [
              Xe(
                "g",
                {
                  onMousedown: I,
                  onMouseenter: ve,
                  onMouseout: re
                },
                Xe(Dc, {
                  position: fe,
                  centerX: ge,
                  centerY: he,
                  radius: s.value,
                  type: "source",
                  "data-type": "source"
                })
              )
            ] : null,
            A.value === "target" || A.value === !0 ? [
              Xe(
                "g",
                {
                  onMousedown: R,
                  onMouseenter: ve,
                  onMouseout: re
                },
                Xe(Dc, {
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
      B.value = !0;
    }
    function re() {
      B.value = !1;
    }
    function be(_, E) {
      C.update({ event: _, edge: y.value, connection: E });
    }
    function pe(_) {
      C.updateEnd({ event: _, edge: y.value }), M.value = !1;
    }
    function de(_, E) {
      _.button === 0 && (M.value = !0, X.value = E ? y.value.target : y.value.source, ie.value = (E ? y.value.targetHandle : y.value.sourceHandle) ?? "", D.value = E ? "target" : "source", C.updateStart({ event: _, edge: y.value }), ce(_));
    }
    function Ie(_) {
      var E;
      const x = { event: _, edge: y.value };
      h.value && (l.value = !1, y.value.selected && v.value ? (c([y.value]), (E = G.value) == null || E.blur()) : n([y.value])), C.click(x);
    }
    function Me(_) {
      C.contextMenu({ event: _, edge: y.value });
    }
    function ne(_) {
      C.doubleClick({ event: _, edge: y.value });
    }
    function xe(_) {
      C.mouseEnter({ event: _, edge: y.value });
    }
    function Ee(_) {
      C.mouseMove({ event: _, edge: y.value });
    }
    function ke(_) {
      C.mouseLeave({ event: _, edge: y.value });
    }
    function I(_) {
      de(_, !0);
    }
    function R(_) {
      de(_, !1);
    }
    function b(_) {
      var E;
      !w.value && dp.includes(_.key) && h.value && (_.key === "Escape" ? ((E = G.value) == null || E.blur(), c([d(e.id)])) : n([d(e.id)]));
    }
  }
}), mS = gS, yS = {
  [$e.Left]: $e.Right,
  [$e.Right]: $e.Left,
  [$e.Top]: $e.Bottom,
  [$e.Bottom]: $e.Top
}, bS = /* @__PURE__ */ He({
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
    } = ot(), p = (e = dn(ji)) == null ? void 0 : e["connection-line"], v = ae(() => {
      var L;
      return f((L = o.value) == null ? void 0 : L.nodeId);
    }), w = ae(() => {
      var L;
      return f((L = s.value) == null ? void 0 : L.nodeId) ?? null;
    }), S = ae(() => ({
      x: (i.value.x - d.value.x) / d.value.zoom,
      y: (i.value.y - d.value.y) / d.value.zoom
    })), P = ae(
      () => u.value.markerStart ? `url(#${bs(u.value.markerStart, t)})` : ""
    ), z = ae(
      () => u.value.markerEnd ? `url(#${bs(u.value.markerEnd, t)})` : ""
    );
    return () => {
      var L, y, C, O;
      if (!v.value || !o.value)
        return null;
      const q = o.value.handleId, Y = o.value.type, B = v.value.handleBounds;
      let M = (B == null ? void 0 : B[Y]) || [];
      if (n.value === vo.Loose) {
        const ee = (B == null ? void 0 : B[Y === "source" ? "target" : "source"]) || [];
        M = [...M, ...ee];
      }
      if (!M)
        return null;
      const X = (q ? M.find((ee) => ee.id === q) : M[0]) ?? null, ie = (X == null ? void 0 : X.position) || $e.Top, { x: D, y: G } = yi(v.value, X, ie);
      let h = null;
      w.value && ((L = s.value) != null && L.handleId) && (n.value === vo.Strict ? h = ((y = w.value.handleBounds[Y === "source" ? "target" : "source"]) == null ? void 0 : y.find(
        (ee) => {
          var ce;
          return ee.id === ((ce = s.value) == null ? void 0 : ce.handleId);
        }
      )) || null : h = ((C = [...w.value.handleBounds.source || [], ...w.value.handleBounds.target || []]) == null ? void 0 : C.find(
        (ee) => {
          var ce;
          return ee.id === ((ce = s.value) == null ? void 0 : ce.handleId);
        }
      )) || null);
      const A = ((O = s.value) == null ? void 0 : O.position) ?? (ie ? yS[ie] : null);
      if (!ie || !A)
        return null;
      const $ = l.value ?? u.value.type ?? to.Bezier;
      let V = "";
      const U = {
        sourceX: D,
        sourceY: G,
        sourcePosition: ie,
        targetX: S.value.x,
        targetY: S.value.y,
        targetPosition: A
      };
      return $ === to.Bezier ? [V] = Rp(U) : $ === to.Step ? [V] = ir({
        ...U,
        borderRadius: 0
      }) : $ === to.SmoothStep ? [V] = ir(U) : $ === to.SimpleBezier ? [V] = Lp(U) : V = `M${D},${G} ${S.value.x},${S.value.y}`, Xe(
        "svg",
        { class: "vue-flow__edges vue-flow__connectionline vue-flow__container" },
        Xe(
          "g",
          { class: "vue-flow__connection" },
          p ? Xe(p, {
            sourceX: D,
            sourceY: G,
            sourcePosition: ie,
            targetX: S.value.x,
            targetY: S.value.y,
            targetPosition: A,
            sourceNode: v.value,
            sourceHandle: X,
            targetNode: w.value,
            targetHandle: h,
            markerEnd: z.value,
            markerStart: P.value,
            connectionStatus: c.value
          }) : Xe("path", {
            d: V,
            class: [u.value.class, c, "vue-flow__connection-path"],
            style: {
              ...r.value,
              ...u.value.style
            },
            "marker-end": z.value,
            "marker-start": P.value
          })
        )
      );
    };
  }
}), _S = bS, wS = ["id", "markerWidth", "markerHeight", "markerUnits", "orient"], kS = {
  name: "MarkerType",
  compatConfig: { MODE: 3 }
}, ES = /* @__PURE__ */ He({
  ...kS,
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
    return (t, n) => (g(), k("marker", {
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
      t.type === H(er).ArrowClosed ? (g(), k("polyline", {
        key: 0,
        style: et({
          stroke: t.color,
          fill: t.color,
          strokeWidth: t.strokeWidth
        }),
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        points: "-5,-4 0,0 -5,4 -5,-4"
      }, null, 4)) : oe("", !0),
      t.type === H(er).Arrow ? (g(), k("polyline", {
        key: 1,
        style: et({
          stroke: t.color,
          strokeWidth: t.strokeWidth
        }),
        "stroke-linecap": "round",
        "stroke-linejoin": "round",
        fill: "none",
        points: "-5,-4 0,0 -5,4"
      }, null, 4)) : oe("", !0)
    ], 8, wS));
  }
}), CS = { class: "vue-flow__marker vue-flow__container" }, SS = {
  name: "MarkerDefinitions",
  compatConfig: { MODE: 3 }
}, xS = /* @__PURE__ */ He({
  ...SS,
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
    return (l, r) => (g(), k("svg", CS, [
      a("defs", null, [
        (g(!0), k(Se, null, Ve(i.value, (u) => (g(), ht(ES, {
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
}), $S = {
  name: "Edges",
  compatConfig: { MODE: 3 }
}, IS = /* @__PURE__ */ He({
  ...$S,
  setup(e) {
    const { findNode: t, getEdges: n, elevateEdgesOnSelect: o } = ot();
    return (s, i) => (g(), k(Se, null, [
      se(xS),
      (g(!0), k(Se, null, Ve(H(n), (l) => (g(), k("svg", {
        key: l.id,
        class: "vue-flow__edges vue-flow__container",
        style: et({ zIndex: H(ZE)(l, H(t), H(o)) })
      }, [
        se(H(mS), {
          id: l.id
        }, null, 8, ["id"])
      ], 4))), 128)),
      se(H(_S))
    ], 64));
  }
}), NS = /* @__PURE__ */ He({
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
      elevateNodesOnSelect: v,
      disableKeyboardA11y: w,
      ariaLiveMessage: S,
      snapToGrid: P,
      snapGrid: z,
      nodeDragThreshold: L,
      nodesDraggable: y,
      elementsSelectable: C,
      nodesConnectable: O,
      nodesFocusable: q,
      hooks: Y
    } = ot(), B = te(null);
    po(Ip, B), po($p, e.id);
    const M = dn(ji), X = zo(), ie = Pp(), { node: D, parentNode: G } = Mp(e.id), { emit: h, on: A } = fC(D, l), $ = tt(() => typeof D.draggable > "u" ? y.value : D.draggable), V = tt(() => typeof D.selectable > "u" ? C.value : D.selectable), U = tt(() => typeof D.connectable > "u" ? O.value : D.connectable), ee = tt(() => typeof D.focusable > "u" ? q.value : D.focusable), ce = tt(
      () => V.value || $.value || Y.value.nodeClick.hasListeners() || Y.value.nodeDoubleClick.hasListeners() || Y.value.nodeMouseEnter.hasListeners() || Y.value.nodeMouseMove.hasListeners() || Y.value.nodeMouseLeave.hasListeners()
    ), ve = tt(() => !!D.dimensions.width && !!D.dimensions.height), re = ae(() => {
      const E = D.type || "default", x = M == null ? void 0 : M[`node-${E}`];
      if (x)
        return x;
      let j = D.template || f.value[E];
      if (typeof j == "string" && X) {
        const K = Object.keys(X.appContext.components);
        K && K.includes(E) && (j = Cd(E, !1));
      }
      return j && typeof j != "string" ? j : (l.error(new wt(vt.NODE_TYPE_MISSING, j)), !1);
    }), be = Np({
      id: e.id,
      el: B,
      disabled: () => !$.value,
      selectable: V,
      dragHandle: () => D.dragHandle,
      onStart(E) {
        h.dragStart(E);
      },
      onDrag(E) {
        h.drag(E);
      },
      onStop(E) {
        h.dragStop(E);
      },
      onClick(E) {
        b(E);
      }
    }), pe = ae(() => D.class instanceof Function ? D.class(D) : D.class), de = ae(() => {
      const E = (D.style instanceof Function ? D.style(D) : D.style) || {}, x = D.width instanceof Function ? D.width(D) : D.width, j = D.height instanceof Function ? D.height(D) : D.height;
      return !E.width && x && (E.width = typeof x == "string" ? x : `${x}px`), !E.height && j && (E.height = typeof j == "string" ? j : `${j}px`), E;
    }), Ie = tt(() => Number(D.zIndex ?? de.value.zIndex ?? 0));
    return d((E) => {
      (E.includes(e.id) || !E.length) && ne();
    }), St(() => {
      ze(
        () => D.hidden,
        (E = !1, x, j) => {
          !E && B.value && (e.resizeObserver.observe(B.value), j(() => {
            B.value && e.resizeObserver.unobserve(B.value);
          }));
        },
        { immediate: !0, flush: "post" }
      );
    }), ze([() => D.type, () => D.sourcePosition, () => D.targetPosition], () => {
      _t(() => {
        c([{ id: e.id, nodeElement: B.value, forceUpdate: !0 }]);
      });
    }), ze(
      [
        () => D.position.x,
        () => D.position.y,
        () => {
          var E;
          return (E = G.value) == null ? void 0 : E.computedPosition.x;
        },
        () => {
          var E;
          return (E = G.value) == null ? void 0 : E.computedPosition.y;
        },
        () => {
          var E;
          return (E = G.value) == null ? void 0 : E.computedPosition.z;
        },
        Ie,
        () => D.selected,
        () => D.dimensions.height,
        () => D.dimensions.width,
        () => {
          var E;
          return (E = G.value) == null ? void 0 : E.dimensions.height;
        },
        () => {
          var E;
          return (E = G.value) == null ? void 0 : E.dimensions.width;
        }
      ],
      ([E, x, j, K, J, W]) => {
        const fe = {
          x: E,
          y: x,
          z: W + (v.value && D.selected ? 1e3 : 0)
        };
        typeof j < "u" && typeof K < "u" ? D.computedPosition = GE({ x: j, y: K, z: J }, fe) : D.computedPosition = fe;
      },
      { flush: "post", immediate: !0 }
    ), ze([() => D.extent, p], ([E, x], [j, K]) => {
      (E !== j || x !== K) && Me();
    }), D.extent === "parent" || typeof D.extent == "object" && "range" in D.extent && D.extent.range === "parent" ? Gl(() => ve).toBe(!0).then(Me) : Me(), () => D.hidden ? null : Xe(
      "div",
      {
        ref: B,
        "data-id": D.id,
        class: [
          "vue-flow__node",
          `vue-flow__node-${re.value === !1 ? "default" : D.type || "default"}`,
          {
            [n.value]: $.value,
            dragging: be == null ? void 0 : be.value,
            draggable: $.value,
            selected: D.selected,
            selectable: V.value,
            parent: D.isParent
          },
          pe.value
        ],
        style: {
          visibility: ve.value ? "visible" : "hidden",
          zIndex: D.computedPosition.z ?? Ie.value,
          transform: `translate(${D.computedPosition.x}px,${D.computedPosition.y}px)`,
          pointerEvents: ce.value ? "all" : "none",
          ...de.value
        },
        tabIndex: ee.value ? 0 : void 0,
        role: ee.value ? "button" : void 0,
        "aria-describedby": w.value ? void 0 : `${up}-${t}`,
        "aria-label": D.ariaLabel,
        onMouseenter: xe,
        onMousemove: Ee,
        onMouseleave: ke,
        onContextmenu: I,
        onClick: b,
        onDblclick: R,
        onKeydown: _
      },
      [
        Xe(re.value === !1 ? f.value.default : re.value, {
          id: D.id,
          type: D.type,
          data: D.data,
          events: { ...D.events, ...A },
          selected: D.selected,
          resizing: D.resizing,
          dragging: be.value,
          connectable: U.value,
          position: D.computedPosition,
          dimensions: D.dimensions,
          isValidTargetPos: D.isValidTargetPos,
          isValidSourcePos: D.isValidSourcePos,
          parent: D.parentNode,
          parentNodeId: D.parentNode,
          zIndex: D.computedPosition.z ?? Ie.value,
          targetPosition: D.targetPosition,
          sourcePosition: D.sourcePosition,
          label: D.label,
          dragHandle: D.dragHandle,
          onUpdateNodeInternals: ne
        })
      ]
    );
    function Me() {
      const E = D.computedPosition, { computedPosition: x, position: j } = Fr(
        D,
        P.value ? Hi(E, z.value) : E,
        l.error,
        p.value,
        G.value
      );
      (D.computedPosition.x !== x.x || D.computedPosition.y !== x.y) && (D.computedPosition = { ...D.computedPosition, ...x }), (D.position.x !== j.x || D.position.y !== j.y) && (D.position = j);
    }
    function ne() {
      B.value && c([{ id: e.id, nodeElement: B.value, forceUpdate: !0 }]);
    }
    function xe(E) {
      be != null && be.value || h.mouseEnter({ event: E, node: D });
    }
    function Ee(E) {
      be != null && be.value || h.mouseMove({ event: E, node: D });
    }
    function ke(E) {
      be != null && be.value || h.mouseLeave({ event: E, node: D });
    }
    function I(E) {
      return h.contextMenu({ event: E, node: D });
    }
    function R(E) {
      return h.doubleClick({ event: E, node: D });
    }
    function b(E) {
      V.value && (!o.value || !$.value || L.value > 0) && sr(
        D,
        i.value,
        u,
        r,
        s,
        !1,
        B.value
      ), h.click({ event: E, node: D });
    }
    function _(E) {
      if (!(tr(E) || w.value))
        if (dp.includes(E.key) && V.value) {
          const x = E.key === "Escape";
          sr(
            D,
            i.value,
            u,
            r,
            s,
            x,
            B.value
          );
        } else $.value && D.selected && Mo[E.key] && (E.preventDefault(), S.value = `Moved selected node ${E.key.replace("Arrow", "").toLowerCase()}. New position, x: ${~~D.position.x}, y: ${~~D.position.y}`, ie(
          {
            x: Mo[E.key].x,
            y: Mo[E.key].y
          },
          E.shiftKey
        ));
    }
  }
}), TS = NS;
function MS(e = { includeHiddenNodes: !1 }) {
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
const PS = { class: "vue-flow__nodes vue-flow__container" }, OS = {
  name: "Nodes",
  compatConfig: { MODE: 3 }
}, AS = /* @__PURE__ */ He({
  ...OS,
  setup(e) {
    const { getNodes: t, updateNodeDimensions: n, emits: o } = ot(), s = MS(), i = te();
    return ze(
      s,
      (l) => {
        l && _t(() => {
          o.nodesInitialized(t.value);
        });
      },
      { immediate: !0 }
    ), St(() => {
      i.value = new ResizeObserver((l) => {
        const r = l.map((u) => ({
          id: u.target.getAttribute("data-id"),
          nodeElement: u.target,
          forceUpdate: !0
        }));
        _t(() => n(r));
      });
    }), Tn(() => {
      var l;
      return (l = i.value) == null ? void 0 : l.disconnect();
    }), (l, r) => (g(), k("div", PS, [
      i.value ? (g(!0), k(Se, { key: 0 }, Ve(H(t), (u, c, d, f) => {
        const p = [u.id];
        if (f && f.key === u.id && Rv(f, p))
          return f;
        const v = (g(), ht(H(TS), {
          id: u.id,
          key: u.id,
          "resize-observer": i.value
        }, null, 8, ["id", "resize-observer"]));
        return v.memo = p, v;
      }, r, 0), 128)) : oe("", !0)
    ]));
  }
});
function DS() {
  const { emits: e } = ot();
  St(() => {
    if (xp()) {
      const t = document.querySelector(".vue-flow__pane");
      t && window.getComputedStyle(t).zIndex !== "1" && e.error(new wt(vt.MISSING_STYLES));
    }
  });
}
const RS = /* @__PURE__ */ a("div", { class: "vue-flow__edge-labels" }, null, -1), LS = {
  name: "VueFlow",
  compatConfig: { MODE: 3 }
}, VS = /* @__PURE__ */ He({
  ...LS,
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
    const o = e, s = Wh(), i = dl(o, "modelValue", n), l = dl(o, "nodes", n), r = dl(o, "edges", n), u = ot(o), c = vC({ modelValue: i, nodes: l, edges: r }, o, u);
    return mC(n, u.hooks), pS(), DS(), po(ji, s), Ti(() => {
      c();
    }), t(u), (d, f) => (g(), k("div", {
      ref: H(u).vueFlowRef,
      class: "vue-flow"
    }, [
      se(rS, null, {
        default: Un(() => [
          se(IS),
          RS,
          se(AS),
          fo(d.$slots, "zoom-pane")
        ]),
        _: 3
      }),
      fo(d.$slots, "default"),
      se(fS)
    ], 512));
  }
}), zS = { class: "graph-node-head" }, FS = {
  key: 0,
  class: "level-tag"
}, BS = ["aria-pressed", "aria-label"], El = /* @__PURE__ */ He({
  __name: "GraphNodeCard",
  props: {
    data: {},
    selected: { type: Boolean }
  },
  emits: ["toggle"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = { persona: hg, profile: Bl, memory: vg, rag: bg, voice: kg, live2d: $g, extensions: _g, skill: Sg, tool: Mg, mcp: Cg }, i = !!n.data.configurable && n.data.level > 0;
    return (l, r) => (g(), k("article", {
      class: ye(["graph-node", [`kind-${l.data.kind}`, `status-${l.data.status}`, { selected: l.selected }]])
    }, [
      se(H(jn), {
        id: "left-target",
        type: "target",
        position: H($e).Left,
        class: "graph-handle"
      }, null, 8, ["position"]),
      se(H(jn), {
        id: "left-source",
        type: "source",
        position: H($e).Left,
        class: "graph-handle"
      }, null, 8, ["position"]),
      se(H(jn), {
        id: "right-target",
        type: "target",
        position: H($e).Right,
        class: "graph-handle"
      }, null, 8, ["position"]),
      se(H(jn), {
        id: "right-source",
        type: "source",
        position: H($e).Right,
        class: "graph-handle"
      }, null, 8, ["position"]),
      a("div", zS, [
        (g(), ht(kr(s[l.data.kind]), { size: 16 })),
        a("b", null, T(l.data.label), 1),
        l.data.kind === "skill" || l.data.kind === "tool" ? (g(), k("span", FS, "L" + T(l.data.level), 1)) : oe("", !0)
      ]),
      a("p", null, T(l.data.summary), 1),
      a("footer", null, [
        a("span", null, T(l.data.status === "available" ? "可用" : l.data.status === "unassigned" ? "未分配" : l.data.status === "partial" ? "部分可用" : "不可用"), 1),
        H(i) ? (g(), k("button", {
          key: 0,
          type: "button",
          class: ye(["graph-switch", { on: l.data.assigned }]),
          "aria-pressed": !!l.data.assigned,
          "aria-label": `${l.data.label}能力开关`,
          onClick: r[0] || (r[0] = $t((u) => o("toggle"), ["stop"]))
        }, r[1] || (r[1] = [
          a("i", null, null, -1)
        ]), 10, BS)) : oe("", !0)
      ])
    ], 2));
  }
}), HS = /* @__PURE__ */ He({
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
    return (o, s) => (g(), ht(H($s), {
      path: n.value,
      class: ye({ selected: o.selected })
    }, null, 8, ["path", "class"]));
  }
}), US = {
  class: "graph-stage",
  "aria-label": "角色能力架构画布"
}, jS = {
  class: "graph-tools",
  "aria-label": "画布工具"
}, GS = /* @__PURE__ */ He({
  __name: "RoleGraphCanvas",
  props: {
    graph: {},
    selectedNodeId: {}
  },
  emits: ["select", "toggle", "reset"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = te([]), i = te([]), { fitView: l, zoomIn: r, zoomOut: u } = ot({ id: "role-architecture" }), c = te(!1);
    function d() {
      return new Promise((y) => requestAnimationFrame(() => requestAnimationFrame(() => y())));
    }
    function f(y) {
      const C = /* @__PURE__ */ new Set([y]), O = [y];
      for (; O.length; ) {
        const q = O.shift();
        for (const Y of i.value)
          Y.source !== q || C.has(Y.target) || (C.add(Y.target), O.push(Y.target));
      }
      return C;
    }
    function p(y) {
      var q;
      let C = y;
      const O = /* @__PURE__ */ new Set();
      for (; !O.has(C); ) {
        O.add(C);
        const Y = (q = i.value.find((B) => B.target === C)) == null ? void 0 : q.source;
        if (!Y) return;
        if (Y === "module:extensions") return C;
        C = Y;
      }
    }
    async function v(y, C) {
      !c.value || !y.length || (await _t(), await d(), await l({ nodes: y, ...C }));
    }
    function w(y = 220) {
      const C = s.value.filter((O) => O.data.kind === "persona" || ["profile", "memory", "rag", "voice", "live2d", "extensions"].includes(O.data.kind));
      return v(C.map((O) => O.id), { padding: 0.18, minZoom: 0.68, maxZoom: 1.08, duration: y });
    }
    function S(y = 220) {
      if (n.selectedNodeId === "module:extensions") {
        const O = s.value.filter((q) => q.id === "module:extensions" || ["skill", "tool"].includes(q.data.kind));
        return v(O.map((q) => q.id), { padding: 0.16, minZoom: 0.38, maxZoom: 0.86, duration: y });
      }
      const C = p(n.selectedNodeId);
      if (C) {
        const O = f(C);
        return O.add("module:extensions"), v([...O], { padding: 0.24, minZoom: 0.58, maxZoom: 1, duration: y });
      }
      return w(y);
    }
    ze(() => n.graph, async (y) => {
      s.value = y.nodes.map((C) => ({ ...C, selected: C.id === n.selectedNodeId })), i.value = y.edges.map((C) => ({ ...C, type: "brace", animated: !1 })), await _t(), await S();
    }, { immediate: !0, deep: !0 }), ze(() => n.selectedNodeId, (y) => s.value = s.value.map((C) => ({ ...C, selected: C.id === y })));
    function P(y) {
      o("select", y.node.id);
    }
    async function z() {
      o("reset"), await _t(), w();
    }
    async function L() {
      c.value = !0, await S(0);
    }
    return (y, C) => (g(), k("section", US, [
      a("div", jS, [
        a("button", {
          type: "button",
          title: "放大",
          onClick: C[0] || (C[0] = () => H(r)())
        }, [
          se(H(oo), { size: 16 })
        ]),
        a("button", {
          type: "button",
          title: "缩小",
          onClick: C[1] || (C[1] = () => H(u)())
        }, [
          se(H(Eg), { size: 16 })
        ]),
        a("button", {
          type: "button",
          title: "适应视图",
          onClick: C[2] || (C[2] = (O) => H(l)({ padding: 0.15, duration: 220 }))
        }, [
          se(H(wg), { size: 16 })
        ]),
        a("button", {
          type: "button",
          title: "恢复自动布局",
          onClick: z
        }, [
          se(H(nf), { size: 16 })
        ])
      ]),
      se(H(VS), {
        id: "role-architecture",
        nodes: s.value,
        "onUpdate:nodes": C[3] || (C[3] = (O) => s.value = O),
        edges: i.value,
        "onUpdate:edges": C[4] || (C[4] = (O) => i.value = O),
        "min-zoom": 0.32,
        "max-zoom": 1.8,
        "fit-view-on-init": !1,
        onInit: L,
        onNodeClick: P
      }, {
        "node-persona": Un((O) => [
          se(El, Ki(Ks(O)), null, 16)
        ]),
        "node-module": Un((O) => [
          se(El, Ki(Ks(O)), null, 16)
        ]),
        "node-capability": Un((O) => [
          se(El, xr(O, {
            onToggle: (q) => o("toggle", O.id)
          }), null, 16, ["onToggle"])
        ]),
        "edge-brace": Un((O) => [
          se(HS, Ki(Ks(O)), null, 16)
        ]),
        _: 1
      }, 8, ["nodes", "edges"])
    ]));
  }
}), qS = ["disabled", "aria-expanded"], YS = {
  key: 0,
  id: "manage-role-menu",
  class: "role-picker-menu"
}, XS = { class: "role-search" }, KS = {
  class: "role-list",
  role: "listbox",
  "aria-label": "选择角色"
}, WS = ["aria-selected", "disabled", "onClick"], ZS = {
  key: 0,
  class: "role-empty"
}, JS = /* @__PURE__ */ He({
  __name: "RoleNavigator",
  props: {
    personas: {},
    selectedId: {},
    disabled: { type: Boolean }
  },
  emits: ["select"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = te(null), i = te(null), l = te(!1), r = te(""), u = ae(() => n.personas.filter((w) => w.name.toLowerCase().includes(r.value.trim().toLowerCase()))), c = ae(() => n.personas.find((w) => w.id === n.selectedId));
    async function d() {
      n.disabled || (l.value = !l.value, l.value && await _t(() => {
        var w;
        return (w = i.value) == null ? void 0 : w.focus();
      }));
    }
    function f(w) {
      o("select", w), l.value = !1, r.value = "";
    }
    function p(w) {
      var S;
      (S = s.value) != null && S.contains(w.target) || (l.value = !1);
    }
    function v(w) {
      w.key === "Escape" && (l.value = !1);
    }
    return ze(() => n.disabled, (w) => {
      w && (l.value = !1);
    }), St(() => {
      document.addEventListener("pointerdown", p), document.addEventListener("keydown", v);
    }), Tn(() => {
      document.removeEventListener("pointerdown", p), document.removeEventListener("keydown", v);
    }), (w, S) => {
      var P;
      return g(), k("div", {
        ref_key: "root",
        ref: s,
        class: "role-picker"
      }, [
        a("button", {
          type: "button",
          class: "role-picker-trigger",
          disabled: w.disabled || !w.personas.length,
          "aria-haspopup": "listbox",
          "aria-expanded": l.value,
          "aria-controls": "manage-role-menu",
          onClick: d
        }, [
          se(H(Bl), { size: 17 }),
          a("strong", null, T(((P = c.value) == null ? void 0 : P.name) || "角色管理"), 1),
          se(H(mg), { size: 15 })
        ], 8, qS),
        l.value ? (g(), k("div", YS, [
          a("label", XS, [
            se(H(Zs), { size: 15 }),
            De(a("input", {
              ref_key: "searchInput",
              ref: i,
              "onUpdate:modelValue": S[0] || (S[0] = (z) => r.value = z),
              placeholder: "查找角色",
              "aria-label": "查找角色"
            }, null, 512), [
              [Ge, r.value]
            ])
          ]),
          a("div", KS, [
            (g(!0), k(Se, null, Ve(u.value, (z) => {
              var L;
              return g(), k("button", {
                key: z.id,
                type: "button",
                role: "option",
                "aria-selected": z.id === w.selectedId,
                disabled: w.disabled,
                class: ye({ active: z.id === w.selectedId }),
                onClick: (y) => f(z.id)
              }, [
                se(H(Bl), { size: 17 }),
                a("span", null, [
                  a("b", null, T(z.name), 1),
                  a("small", null, T(((L = z.profile) == null ? void 0 : L.description) || "尚未填写人设"), 1)
                ])
              ], 10, WS);
            }), 128)),
            u.value.length ? oe("", !0) : (g(), k("p", ZS, "没有匹配的角色"))
          ])
        ])) : oe("", !0)
      ], 512);
    };
  }
}), QS = { class: "version-panel-layer" }, ex = {
  class: "version-panel",
  role: "dialog",
  "aria-modal": "true",
  "aria-labelledby": "version-panel-title"
}, tx = { class: "version-panel-header" }, nx = { class: "version-panel-kicker" }, ox = { id: "version-panel-title" }, sx = {
  key: 0,
  class: "version-message is-error"
}, ix = { class: "version-panel-toolbar" }, lx = ["disabled"], rx = ["disabled"], ax = {
  key: 0,
  class: "version-form-hint"
}, ux = { class: "version-form-actions" }, cx = ["disabled"], dx = ["disabled"], fx = {
  key: 2,
  class: "version-empty"
}, px = {
  key: 3,
  class: "version-empty"
}, hx = {
  key: 4,
  class: "version-body"
}, vx = {
  class: "version-list",
  role: "listbox",
  "aria-label": "角色版本历史"
}, gx = ["aria-selected", "disabled", "onClick"], mx = { class: "version-number" }, yx = { class: "version-item-copy" }, bx = { class: "version-detail" }, _x = { class: "version-detail-heading" }, wx = {
  key: 0,
  class: "version-note"
}, kx = {
  key: 1,
  class: "version-detail-loading"
}, Ex = {
  key: 2,
  class: "version-facts"
}, Cx = {
  key: 3,
  class: "version-detail-loading"
}, Sx = { class: "version-action-row" }, xx = ["disabled"], $x = ["disabled"], Ix = {
  key: 2,
  class: "version-current"
}, Nx = {
  key: 4,
  class: "version-published"
}, Tx = {
  key: 5,
  class: "version-panel-footnote"
}, Mx = /* @__PURE__ */ He({
  __name: "VersionPanel",
  props: {
    personaId: {},
    personaName: {},
    disabled: { type: Boolean }
  },
  emits: ["close", "changed"],
  setup(e, { emit: t }) {
    const n = e, o = t, s = te([]), i = te(""), l = te(null), r = te(!1), u = te(!1), c = te(""), d = te(""), f = te(!1), p = te(""), v = te("");
    let w = 0;
    const S = ae(() => r.value || u.value || !!c.value), P = ae(() => s.value.find(($) => $.id === i.value)), z = ae(() => {
      var $;
      return ($ = l.value) == null ? void 0 : $.snapshot;
    }), L = ae(() => {
      var $;
      return Object.keys((($ = z.value) == null ? void 0 : $.capability_overrides) || {}).length;
    }), y = ae(() => {
      var $, V;
      return ((V = ($ = z.value) == null ? void 0 : $.document_ids) == null ? void 0 : V.length) || 0;
    }), C = ae(() => {
      var $;
      return (($ = z.value) == null ? void 0 : $.mcp_server_names) || [];
    });
    function O($) {
      return { draft: "草稿", published: "已发布", superseded: "已替代", archived: "已归档" }[$] || $;
    }
    function q($) {
      return `is-${$}`;
    }
    function Y($) {
      if (!$) return "—";
      const V = new Date($);
      return Number.isNaN(V.getTime()) ? $ : new Intl.DateTimeFormat("zh-CN", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" }).format(V);
    }
    function B($) {
      return $ instanceof Ir && $.status === 404 ? "版本接口尚未启用，请先启用角色版本 API。" : $ instanceof Error ? $.message : String($);
    }
    async function M() {
      const $ = ++w;
      if (s.value = [], i.value = "", l.value = null, d.value = "", !!n.personaId) {
        r.value = !0;
        try {
          const V = await Zg(n.personaId);
          if ($ !== w) return;
          s.value = V, V.length && await X(V[0].id, $);
        } catch (V) {
          $ === w && (d.value = B(V));
        } finally {
          $ === w && (r.value = !1);
        }
      }
    }
    async function X($, V = w) {
      i.value = $, l.value = null, d.value = "", u.value = !0;
      try {
        const U = await Jg(n.personaId, $);
        V === w && (l.value = U);
      } catch (U) {
        V === w && (d.value = B(U));
      } finally {
        V === w && (u.value = !1);
      }
    }
    function ie() {
      var $;
      n.disabled || S.value || (f.value = !0, p.value = `版本 ${Math.max((($ = s.value[0]) == null ? void 0 : $.version_number) || 0, 0) + 1}`, v.value = "");
    }
    function D() {
      c.value || (f.value = !1);
    }
    async function G() {
      if (!(n.disabled || S.value)) {
        c.value = "create", d.value = "";
        try {
          const $ = await Qg(n.personaId, { label: p.value, note: v.value });
          f.value = !1, s.value = [$, ...s.value.filter((V) => V.id !== $.id)], i.value = $.id, l.value = $, o("changed", $);
        } catch ($) {
          d.value = B($);
        } finally {
          c.value = "";
        }
      }
    }
    function h($) {
      s.value = s.value.map((V) => V.id === $.id ? $ : V), i.value = $.id, l.value = $;
    }
    async function A($) {
      const V = i.value;
      if (!(!V || n.disabled || S.value) && !($ === "rollback" && !window.confirm("确定回滚到这个角色版本？当前未保存的运行配置不会自动保留。"))) {
        c.value = V, d.value = "";
        try {
          const U = $ === "publish" ? await em(n.personaId, V) : await tm(n.personaId, V);
          h(U), o("changed", U), await M();
        } catch (U) {
          d.value = B(U);
        } finally {
          c.value = "";
        }
      }
    }
    return ze(() => n.personaId, () => {
      M();
    }, { immediate: !0 }), ($, V) => {
      var U, ee, ce, ve, re, be, pe;
      return g(), k("div", QS, [
        a("button", {
          type: "button",
          class: "version-panel-backdrop",
          "aria-label": "关闭版本面板",
          onClick: V[0] || (V[0] = (de) => o("close"))
        }),
        a("section", ex, [
          a("header", tx, [
            a("div", null, [
              a("span", nx, [
                se(H(tf), { size: 13 }),
                V[6] || (V[6] = _e("运行版本"))
              ]),
              a("h2", ox, T($.personaName || "当前角色"), 1),
              V[7] || (V[7] = a("p", null, "保存和切换角色的运行配置", -1))
            ]),
            a("button", {
              type: "button",
              class: "icon-button",
              "aria-label": "关闭版本面板",
              onClick: V[1] || (V[1] = (de) => o("close"))
            }, [
              se(H(Gt), { size: 17 })
            ])
          ]),
          d.value ? (g(), k("p", sx, T(d.value), 1)) : oe("", !0),
          a("div", ix, [
            a("span", null, T(s.value.length ? `${s.value.length} 个版本` : "版本历史"), 1),
            a("div", null, [
              a("button", {
                type: "button",
                class: "text-button",
                disabled: S.value,
                onClick: M
              }, [
                se(H(qt), { size: 14 }),
                V[8] || (V[8] = _e("刷新"))
              ], 8, lx),
              a("button", {
                type: "button",
                class: "text-button is-primary",
                disabled: $.disabled || S.value,
                onClick: ie
              }, [
                se(H(oo), { size: 14 }),
                V[9] || (V[9] = _e("创建"))
              ], 8, rx)
            ])
          ]),
          f.value ? (g(), k("form", {
            key: 1,
            class: "version-create-form",
            onSubmit: $t(G, ["prevent"])
          }, [
            a("label", null, [
              V[10] || (V[10] = a("span", null, "版本名称", -1)),
              De(a("input", {
                "onUpdate:modelValue": V[2] || (V[2] = (de) => p.value = de),
                maxlength: "255",
                placeholder: "例如：稳定版"
              }, null, 512), [
                [Ge, p.value]
              ])
            ]),
            a("label", null, [
              V[11] || (V[11] = a("span", null, "备注", -1)),
              De(a("textarea", {
                "onUpdate:modelValue": V[3] || (V[3] = (de) => v.value = de),
                rows: "2",
                maxlength: "5000",
                placeholder: "记录这次配置的变化"
              }, null, 512), [
                [Ge, v.value]
              ])
            ]),
            $.disabled ? (g(), k("p", ax, "请先保存顶部的角色配置，再创建版本。")) : oe("", !0),
            a("div", ux, [
              a("button", {
                type: "button",
                class: "text-button",
                disabled: !!c.value,
                onClick: D
              }, "取消", 8, cx),
              a("button", {
                type: "submit",
                class: "text-button is-primary",
                disabled: $.disabled || S.value
              }, T(c.value === "create" ? "创建中…" : "保存版本"), 9, dx)
            ])
          ], 32)) : oe("", !0),
          r.value ? (g(), k("div", fx, "正在读取版本历史…")) : !s.value.length && !d.value ? (g(), k("div", px, [
            se(H(pg), { size: 22 }),
            V[12] || (V[12] = a("strong", null, "还没有保存的运行版本", -1)),
            V[13] || (V[13] = a("span", null, "创建版本会记录当前已保存的角色配置。", -1))
          ])) : s.value.length ? (g(), k("div", hx, [
            a("div", vx, [
              (g(!0), k(Se, null, Ve(s.value, (de) => (g(), k("button", {
                key: de.id,
                type: "button",
                class: ye(["version-item", { selected: de.id === i.value }]),
                "aria-selected": de.id === i.value,
                role: "option",
                disabled: S.value,
                onClick: (Ie) => X(de.id)
              }, [
                a("span", mx, "v" + T(de.version_number), 1),
                a("span", yx, [
                  a("strong", null, T(de.label || `版本 ${de.version_number}`), 1),
                  a("small", null, T(Y(de.created_at)), 1)
                ]),
                a("span", {
                  class: ye(["version-status", q(de.status)])
                }, T(O(de.status)), 3)
              ], 10, gx))), 128))
            ]),
            a("div", bx, [
              a("div", _x, [
                a("div", null, [
                  V[14] || (V[14] = a("span", null, "当前选择", -1)),
                  a("strong", null, T(((U = P.value) == null ? void 0 : U.label) || `版本 ${((ee = P.value) == null ? void 0 : ee.version_number) || ""}`), 1)
                ]),
                a("span", {
                  class: ye(["version-status", q(((ce = P.value) == null ? void 0 : ce.status) || "draft")])
                }, T(O(((ve = P.value) == null ? void 0 : ve.status) || "draft")), 3)
              ]),
              (re = P.value) != null && re.note ? (g(), k("p", wx, T(P.value.note), 1)) : oe("", !0),
              u.value ? (g(), k("div", kx, "正在读取快照…")) : z.value ? (g(), k("dl", Ex, [
                a("div", null, [
                  V[15] || (V[15] = a("dt", null, "角色名称", -1)),
                  a("dd", null, T(z.value.name), 1)
                ]),
                a("div", null, [
                  V[16] || (V[16] = a("dt", null, "知识库", -1)),
                  a("dd", null, T(z.value.knowledge_space_id || "未绑定"), 1)
                ]),
                a("div", null, [
                  V[17] || (V[17] = a("dt", null, "资料", -1)),
                  a("dd", null, T(y.value) + " 份资料", 1)
                ]),
                a("div", null, [
                  V[18] || (V[18] = a("dt", null, "能力策略", -1)),
                  a("dd", null, T(L.value) + " 项能力", 1)
                ]),
                a("div", null, [
                  V[19] || (V[19] = a("dt", null, "MCP 授权", -1)),
                  a("dd", null, T(C.value.length ? C.value.join("、") : "无"), 1)
                ])
              ])) : (g(), k("p", Cx, "暂无快照详情")),
              a("div", Sx, [
                ((be = P.value) == null ? void 0 : be.status) === "draft" ? (g(), k("button", {
                  key: 0,
                  type: "button",
                  class: "version-action is-primary",
                  disabled: $.disabled || S.value,
                  onClick: V[4] || (V[4] = (de) => A("publish"))
                }, [
                  se(H(Ng), { size: 14 }),
                  V[20] || (V[20] = _e("发布版本"))
                ], 8, xx)) : P.value && P.value.status !== "published" ? (g(), k("button", {
                  key: 1,
                  type: "button",
                  class: "version-action",
                  disabled: $.disabled || S.value,
                  onClick: V[5] || (V[5] = (de) => A("rollback"))
                }, [
                  se(H(nf), { size: 14 }),
                  V[21] || (V[21] = _e("回滚到此版本"))
                ], 8, $x)) : (g(), k("span", Ix, [
                  se(H(ro), { size: 14 }),
                  V[22] || (V[22] = _e("这是当前发布版本"))
                ]))
              ]),
              (pe = P.value) != null && pe.published_at ? (g(), k("p", Nx, [
                se(H(yg), { size: 13 }),
                _e("发布于 " + T(Y(P.value.published_at)), 1)
              ])) : oe("", !0)
            ])
          ])) : oe("", !0),
          !d.value && $.disabled && s.value.length ? (g(), k("p", Tx, "顶部存在未保存修改时，版本操作会暂时停用。")) : oe("", !0)
        ])
      ]);
    };
  }
}), jr = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [o, s] of t)
    n[o] = s;
  return n;
}, Px = /* @__PURE__ */ jr(Mx, [["__scopeId", "data-v-81aec505"]]);
function Ox(e, t, n) {
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
async function Ax(e) {
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
function Dx(e, t, n) {
  const o = bt(e);
  return n.has("profile") && (o.persona = bt(t.persona)), n.has("capabilities") && (o.capabilities.overrides = bt(t.capabilities.overrides)), n.has("grants") && (o.grants.servers = bt(t.grants.servers)), o;
}
function Rx() {
  const e = te([]), t = te(""), n = te(null), o = te(null), s = te(""), i = te(/* @__PURE__ */ new Set()), l = te(!1), r = te(!1), u = te(!1), c = te(""), d = te(""), f = ae(() => i.value.size > 0);
  async function p() {
    if (!l.value) {
      l.value = !0, c.value = "";
      try {
        e.value = await sl();
        const h = t.value || sessionStorage.getItem("charactoid.manage.persona"), A = e.value.find(($) => $.id === h) || e.value[0];
        A && await w(A.id, !0);
      } catch (h) {
        c.value = h instanceof Error ? h.message : String(h);
      } finally {
        l.value = !1;
      }
    }
  }
  async function v() {
    f.value || l.value || r.value || u.value || await p();
  }
  async function w(h, A = !1) {
    if (!A && (r.value || u.value)) {
      d.value = "当前操作完成后才能切换角色";
      return;
    }
    if (!A && f.value && !window.confirm("当前角色有未保存修改，放弃后切换角色？")) return;
    const $ = e.value.find((V) => V.id === h);
    if ($) {
      l.value = !0, c.value = "", d.value = "";
      try {
        const V = await Eu($);
        n.value = V, o.value = bt(V), t.value = h, s.value = `persona:${h}`, i.value = /* @__PURE__ */ new Set(), sessionStorage.setItem("charactoid.manage.persona", h);
        const U = o.value.documents.filter((ce) => ["converting", "preview_ready", "indexing"].includes(String(ce.status))), ee = o.value.documents.filter((ce) => String(ce.status) === "index_failed");
        U.length ? Y(h) : ee.length && (d.value = "有资料尚未整理完成，可在知识库中重试");
      } catch (V) {
        c.value = V instanceof Error ? V.message : String(V);
      } finally {
        l.value = !1;
      }
    }
  }
  function S(h) {
    s.value = h;
  }
  function P(h) {
    o.value && (o.value.persona = bt(h), i.value = new Set(i.value).add("profile"));
  }
  function z(h, A) {
    if (!o.value) return;
    o.value = Ox(o.value, h, A);
    const $ = new Set(i.value);
    $.add("capabilities"), $.add("grants"), i.value = $;
  }
  function L(h, A) {
    if (!o.value) return;
    const $ = o.value.grants.servers.find((V) => V.name === h);
    $ && !$.global && ($.authorized = A), i.value = new Set(i.value).add("grants");
  }
  function y() {
    n.value && (o.value = bt(n.value), i.value = /* @__PURE__ */ new Set(), d.value = "已撤销本轮修改");
  }
  async function C() {
    if (!o.value || !n.value) return;
    const h = await sf(o.value.persona.id);
    o.value.documents = h, n.value.documents = bt(h);
  }
  async function O() {
    if (!(!o.value || !n.value || u.value)) {
      u.value = !0, c.value = "", d.value = "正在扫描 Live2D 模型...";
      try {
        const h = await lf();
        o.value.resources = { ...o.value.resources || { voiceAssets: [], live2dModels: [] }, live2dModels: h }, n.value.resources = { ...n.value.resources || { voiceAssets: [], live2dModels: [] }, live2dModels: bt(h) }, d.value = `已发现 ${h.length} 个 Live2D 模型`;
      } catch (h) {
        c.value = h instanceof Error ? h.message : String(h);
      } finally {
        u.value = !1;
      }
    }
  }
  async function q() {
    if (!u.value) {
      u.value = !0, c.value = "";
      try {
        await Hg(), d.value = "已打开 Live2D 模型文件夹";
      } catch (h) {
        c.value = h instanceof Error ? h.message : String(h);
      } finally {
        u.value = !1;
      }
    }
  }
  function Y(h, A = 10) {
    A <= 0 || window.setTimeout(async () => {
      var $;
      if ((($ = o.value) == null ? void 0 : $.persona.id) === h)
        try {
          await C(), o.value.documents.some((U) => ["converting", "preview_ready", "indexing"].includes(String(U.status))) && Y(h, A - 1);
        } catch {
        }
    }, 1400);
  }
  async function B(h, A) {
    if (!o.value || !h.length && !A.trim() || u.value) return !1;
    u.value = !0, c.value = "", d.value = "正在写入角色知识库...";
    try {
      const $ = o.value.persona.id;
      return await Yg(o.value.persona, h, A), await C(), Y($), d.value = "资料已提交，正在建立索引", !0;
    } catch ($) {
      return c.value = $ instanceof Error ? $.message : String($), !1;
    } finally {
      u.value = !1;
    }
  }
  async function M(h) {
    u.value = !0, c.value = "";
    try {
      await Xg(h), await C(), d.value = "资料已删除";
    } catch (A) {
      c.value = A instanceof Error ? A.message : String(A);
    } finally {
      u.value = !1;
    }
  }
  async function X(h) {
    var A, $;
    u.value = !0, c.value = "";
    try {
      const V = ((A = o.value) == null ? void 0 : A.persona.id) || "", U = ($ = o.value) == null ? void 0 : $.documents.find((ee) => String(ee.id) === h);
      await Cu(h, String((U == null ? void 0 : U.status) || "")), await C(), V && Y(V), d.value = "正在重新整理资料";
    } catch (V) {
      c.value = V instanceof Error ? V.message : String(V);
    } finally {
      u.value = !1;
    }
  }
  async function ie() {
    if (o.value) {
      u.value = !0, c.value = "";
      try {
        const h = o.value.persona.id;
        await qg(h), e.value = (await sl()).filter((A) => A.id !== h), n.value = null, o.value = null, t.value = "", i.value = /* @__PURE__ */ new Set(), e.value[0] && await w(e.value[0].id, !0), d.value = "角色已删除";
      } catch (h) {
        c.value = h instanceof Error ? h.message : String(h);
      } finally {
        u.value = !1;
      }
    }
  }
  async function D() {
    if (!o.value || !f.value) return;
    r.value = !0, c.value = "", d.value = "";
    const h = bt(o.value), A = {};
    i.value.has("profile") && (A.profile = () => Ug(h.persona)), i.value.has("capabilities") && (A.capabilities = () => jg(h.persona.id, h.capabilities.overrides)), i.value.has("grants") && (A.grants = () => Gg(h.persona.id, h.grants.servers));
    const $ = await Ax(A), V = new Set($.failedDomains.map((U) => U.domain));
    if (i.value = V, $.savedDomains.length)
      try {
        e.value = await sl();
        const U = e.value.find((ce) => ce.id === h.persona.id) || h.persona, ee = await Eu(U);
        n.value = ee, o.value = Dx(ee, h, V);
      } catch (U) {
        const ee = bt(n.value || h);
        $.savedDomains.includes("profile") && (ee.persona = bt(h.persona)), $.savedDomains.includes("capabilities") && (ee.capabilities.overrides = bt(h.capabilities.overrides)), $.savedDomains.includes("grants") && (ee.grants.servers = bt(h.grants.servers)), n.value = ee, o.value = h, c.value = `配置已保存，但刷新失败：${U instanceof Error ? U.message : String(U)}`;
      }
    $.ok ? d.value = "角色配置已保存" : c.value = $.failedDomains.map((U) => `${U.domain}: ${U.message}`).join("；"), r.value = !1;
  }
  async function G() {
    if (!o.value || u.value) return;
    const h = o.value.documents.filter((A) => ["index_failed", "preview_ready"].includes(String(A.status)));
    if (!h.length) {
      d.value = "没有需要重试的资料";
      return;
    }
    u.value = !0, c.value = "";
    try {
      const A = o.value.persona.id;
      for (const $ of h) await Cu(String($.id), String($.status || ""));
      await C(), Y(A), d.value = `已重新整理 ${h.length} 份资料`;
    } catch (A) {
      c.value = A instanceof Error ? A.message : String(A);
    } finally {
      u.value = !1;
    }
  }
  return { personas: e, selectedPersonaId: t, snapshot: n, draft: o, selectedNodeId: s, dirtyDomains: i, loading: l, isSaving: r, operationPending: u, error: c, message: d, isDirty: f, initialize: p, refreshIfClean: v, selectPersona: w, selectNode: S, updateProfile: P, setCapability: z, setServer: L, discard: y, save: D, addDocuments: B, removeDocument: M, reindexDocument: X, reindexFailedDocuments: G, refreshLive2dResources: O, openLive2dDirectory: q, removeCurrentPersona: ie };
}
const Lx = { class: "workbench-toolbar" }, Vx = { class: "toolbar-identity" }, zx = { class: "toolbar-actions" }, Fx = {
  key: 0,
  class: "dirty-state"
}, Bx = ["disabled"], Hx = ["disabled"], Ux = ["disabled"], jx = {
  key: 0,
  class: "workbench-message error"
}, Gx = {
  key: 1,
  class: "workbench-message"
}, qx = { class: "workbench-content" }, Yx = { class: "workbench-canvas-region" }, Xx = {
  key: 0,
  class: "workbench-loading"
}, Kx = {
  key: 1,
  class: "workbench-empty"
}, Wx = /* @__PURE__ */ He({
  __name: "App",
  setup(e) {
    const t = Rx(), n = te(0), o = te(0), s = te(!1), i = ae(() => t.isSaving.value || t.operationPending.value), l = ae(() => {
      var D, G, h, A;
      return !!((G = (D = t.draft.value) == null ? void 0 : D.persona.profile) != null && G.builtin || (A = (h = t.draft.value) == null ? void 0 : h.persona.profile) != null && A.guide);
    }), r = ae(() => t.draft.value ? lm(t.draft.value) : { nodes: [], edges: [] }), u = ae(() => (n.value, f_(v_(r.value, t.selectedNodeId.value)))), c = ae(() => r.value.nodes.find((D) => D.id === t.selectedNodeId.value));
    function d(D) {
      const G = u.value.nodes.find((h) => h.id === D);
      if (G != null && G.data.configurable) {
        if (G.data.kind === "mcp" && G.data.sourceId) {
          t.setServer(G.data.sourceId, !G.data.assigned);
          return;
        }
        t.setCapability(D, G.data.assigned ? "deny" : "allow");
      }
    }
    async function f() {
      var G, h, A;
      const D = (h = (G = t.draft.value) == null ? void 0 : G.persona.profile) == null ? void 0 : h.tts;
      if (D != null && D.voice_asset_id)
        try {
          const $ = await Wg(D.voice_asset_id, D.output_language || "auto"), V = new Audio(URL.createObjectURL($)), U = (A = window.PL) == null ? void 0 : A.audio;
          U ? await U.play(V) : await V.play();
        } catch ($) {
          t.error.value = $ instanceof Error ? $.message : String($);
        }
    }
    function p() {
      var D;
      (D = document.querySelector('[data-view="voice"]')) == null || D.click();
    }
    function v() {
      window.location.hash = "#knowledge-eval";
    }
    function w() {
      !t.draft.value || i.value || (s.value = !s.value);
    }
    function S() {
      s.value = !1;
    }
    async function P() {
      await t.refreshIfClean();
    }
    async function z() {
      var G;
      if (l.value) return;
      const D = (G = t.draft.value) == null ? void 0 : G.persona.name;
      !D || !window.confirm(`永久删除“${D}”及其资料、记忆、向量和对话？此操作无法恢复。`) || await t.removeCurrentPersona();
    }
    async function L(D) {
      window.confirm("从角色资料中删除该文件？知识库向量与本地文件将一并移除。") && await t.removeDocument(D);
    }
    async function y(D, G) {
      await t.addDocuments(D, G) && (o.value += 1);
    }
    function C() {
      return document.querySelector("#document-preview-dialog");
    }
    function O(D, G) {
      var V, U;
      const h = C(), A = document.querySelector("#document-preview-title") || document.querySelector("#preview-title"), $ = document.querySelector("#document-preview-content") || document.querySelector("#preview-content");
      if (A && (A.textContent = D), $ && $.replaceChildren(typeof G == "string" ? document.createTextNode(G) : G), h && typeof h.showModal == "function") {
        h.open || h.showModal();
        return;
      }
      (V = document.querySelector("#preview-drawer")) == null || V.classList.add("is-open"), (U = document.querySelector("#preview-backdrop")) == null || U.classList.add("is-open");
    }
    function q() {
      var G, h;
      const D = C();
      D != null && D.open && D.close(), (G = document.querySelector("#preview-drawer")) == null || G.classList.remove("is-open"), (h = document.querySelector("#preview-backdrop")) == null || h.classList.remove("is-open");
    }
    async function Y(D) {
      const G = String(D.original_filename || D.original_name || "查看资料");
      O(G, "正在打开…");
      let h = String(D.markdown_preview || "");
      const A = String(D.id || "");
      if ((!h || h.length < 8) && A)
        try {
          const $ = await Kg(A);
          h = String($.markdown_preview || "");
        } catch {
          h = "";
        }
      O(G, h || "这份资料还没有可预览的正文");
    }
    async function B(D) {
      if (D.type.startsWith("image/")) {
        const h = document.createElement("img"), A = URL.createObjectURL(D);
        h.src = A, h.alt = D.name, h.style.maxWidth = "100%", h.onload = () => URL.revokeObjectURL(A), O(D.name, h);
        return;
      }
      const G = D.type.startsWith("text/") || /\.(md|txt|json|csv|ya?ml)$/i.test(D.name);
      O(D.name, G ? await D.text() : "该文件将在上传转换后提供 Markdown 预览。");
    }
    function M(D) {
      t.isDirty.value && (D.preventDefault(), D.returnValue = "");
    }
    function X(D) {
      var h;
      const G = ((h = D == null ? void 0 : D.detail) == null ? void 0 : h.nodeId) || sessionStorage.getItem("charactoid.manage.node");
      G && (sessionStorage.removeItem("charactoid.manage.node"), t.selectNode(G));
    }
    async function ie() {
      await t.refreshIfClean(), X();
    }
    return ze(() => t.selectedPersonaId.value, () => {
      s.value = !1;
    }), St(async () => {
      var D, G, h;
      await t.initialize(), X(), window.addEventListener("beforeunload", M), (D = document.querySelector("#role-workbench-root")) == null || D.addEventListener("charactoid:manage-show", ie), document.addEventListener("charactoid:manage-select-node", X), (G = document.querySelector("#close-preview")) == null || G.addEventListener("click", q), (h = document.querySelector("#preview-backdrop")) == null || h.addEventListener("click", q);
    }), Tn(() => {
      var D, G, h;
      window.removeEventListener("beforeunload", M), (D = document.querySelector("#role-workbench-root")) == null || D.removeEventListener("charactoid:manage-show", ie), document.removeEventListener("charactoid:manage-select-node", X), (G = document.querySelector("#close-preview")) == null || G.removeEventListener("click", q), (h = document.querySelector("#preview-backdrop")) == null || h.removeEventListener("click", q);
    }), (D, G) => (g(), k("div", {
      class: ye(["role-workbench", { "is-busy": i.value }])
    }, [
      a("header", Lx, [
        a("div", Vx, [
          se(JS, {
            personas: H(t).personas.value,
            "selected-id": H(t).selectedPersonaId.value,
            disabled: i.value,
            onSelect: H(t).selectPersona
          }, null, 8, ["personas", "selected-id", "disabled", "onSelect"]),
          G[3] || (G[3] = a("p", null, "角色运行架构与能力配置", -1))
        ]),
        a("div", zx, [
          H(t).isDirty.value ? (g(), k("span", Fx, "存在未保存修改")) : oe("", !0),
          a("button", {
            type: "button",
            class: ye({ active: s.value }),
            disabled: !H(t).draft.value || i.value,
            onClick: w
          }, [
            se(H(tf), { size: 16 }),
            G[4] || (G[4] = _e("运行版本"))
          ], 10, Bx),
          a("button", {
            type: "button",
            disabled: !H(t).isDirty.value || H(t).isSaving.value || H(t).operationPending.value,
            onClick: G[0] || (G[0] = //@ts-ignore
            (...h) => H(t).discard && H(t).discard(...h))
          }, [
            se(H(Tg), { size: 16 }),
            G[5] || (G[5] = _e("撤销"))
          ], 8, Hx),
          a("button", {
            type: "button",
            class: "primary",
            disabled: !H(t).isDirty.value || H(t).isSaving.value || H(t).operationPending.value,
            onClick: G[1] || (G[1] = //@ts-ignore
            (...h) => H(t).save && H(t).save(...h))
          }, [
            se(H(zl), { size: 16 }),
            _e(T(H(t).isSaving.value ? "保存中" : "保存配置"), 1)
          ], 8, Ux)
        ])
      ]),
      H(t).error.value ? (g(), k("p", jx, T(H(t).error.value), 1)) : H(t).message.value ? (g(), k("p", Gx, T(H(t).message.value), 1)) : oe("", !0),
      a("div", qx, [
        a("main", Yx, [
          H(t).loading.value ? (g(), k("div", Xx, "正在读取角色架构...")) : H(t).personas.value.length ? (g(), ht(GS, {
            key: 2,
            graph: u.value,
            "selected-node-id": H(t).selectedNodeId.value,
            onSelect: H(t).selectNode,
            onToggle: d,
            onReset: G[2] || (G[2] = (h) => n.value++)
          }, null, 8, ["graph", "selected-node-id", "onSelect"])) : (g(), k("div", Kx, G[6] || (G[6] = [
            a("strong", null, "还没有角色", -1),
            a("p", null, "先在“创建角色”页面建立角色。", -1)
          ])))
        ]),
        H(t).draft.value ? (g(), ht(U0, {
          key: 0,
          node: c.value,
          draft: H(t).draft.value,
          disabled: i.value,
          "upload-complete-token": o.value,
          onProfile: H(t).updateProfile,
          onCapability: H(t).setCapability,
          onServer: H(t).setServer,
          onUpload: y,
          onDeleteDocument: L,
          onRetryDocument: H(t).reindexDocument,
          "can-delete": !l.value,
          onDeletePersona: z,
          onPreviewVoice: f,
          onOpenVoiceStudio: p,
          onOpenRagEval: v,
          onPreviewDocument: Y,
          onPreviewLocalFile: B,
          onRetryFailed: H(t).reindexFailedDocuments,
          onRefreshLive2d: H(t).refreshLive2dResources,
          onOpenLive2dDirectory: H(t).openLive2dDirectory
        }, null, 8, ["node", "draft", "disabled", "upload-complete-token", "onProfile", "onCapability", "onServer", "onRetryDocument", "can-delete", "onRetryFailed", "onRefreshLive2d", "onOpenLive2dDirectory"])) : oe("", !0)
      ]),
      s.value && H(t).draft.value ? (g(), ht(Px, {
        key: 2,
        "persona-id": H(t).draft.value.persona.id,
        "persona-name": H(t).draft.value.persona.name,
        disabled: i.value || H(t).isDirty.value,
        onClose: S,
        onChanged: P
      }, null, 8, ["persona-id", "persona-name", "disabled"])) : oe("", !0)
    ], 2));
  }
});
let Vn = null;
function v4(e = "#role-workbench-root") {
  if (Vn) return Vn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("角色工作台挂载点不存在");
  return Vn = Cs(Wx), Vn.mount(t), Vn;
}
function g4() {
  var e;
  (e = document.querySelector("#role-workbench-root")) == null || e.dispatchEvent(new CustomEvent("charactoid:manage-show"));
}
function m4() {
  Vn && (Vn.unmount(), Vn = null);
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
const Zx = [
  { id: "assign", label: "角色分配(Assign)" },
  { id: "overview", label: "总览(Overview)" },
  { id: "skills", label: "技能(Skill)" },
  { id: "mcp", label: "MCP服务(MCP)" },
  { id: "tools", label: "工具(Tool)" },
  { id: "catalog", label: "扩展目录(Catalog)" }
], Jx = {
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
function Qx(e) {
  const t = e.skills || [], n = e.servers || [], o = e.tools || [], s = t.filter((u) => u.enabled).length, i = n.filter((u) => {
    var c;
    return u.enabled && ((c = u.status) == null ? void 0 : c.status) === "connected";
  }).length, l = n.filter((u) => {
    var c, d;
    return ((c = u.status) == null ? void 0 : c.status) === "error" || u.enabled && ((d = u.status) == null ? void 0 : d.status) !== "connected";
  }).length, r = t.filter((u) => !u.builtin && !u.trusted).length;
  return { enabledSkills: s, mcpOnline: i, mcpIssues: l, toolCount: o.length, attentionCount: l + r };
}
function Rc(e) {
  const t = {};
  for (const n of e.split(/\r?\n/)) {
    const o = n.trim();
    if (!o) continue;
    const s = o.indexOf("="), i = o.indexOf(":"), l = s > 0 && (i < 0 || s < i) ? s : i;
    l > 0 && (t[o.slice(0, l).trim()] = o.slice(l + 1).trim());
  }
  return t;
}
function Lc(e) {
  return Object.entries(e || {}).map(([t, n]) => `${t}=${n}`).join(`
`);
}
function Vc(e) {
  const t = String(e || "").replace(/^#/, ""), n = t.startsWith("capabilities-") ? t.slice(13) : t === "capabilities" ? "assign" : t;
  return n === "overview" || n === "assign" || n === "skills" || n === "mcp" || n === "tools" || n === "catalog" ? n : "assign";
}
function e$(e) {
  var n;
  const t = {};
  for (const o of e || []) {
    const s = ((n = o.metadata) == null ? void 0 : n.category) || (o.builtin ? "内置" : "自定义");
    (t[s] || (t[s] = [])).push(o);
  }
  return Object.entries(t).sort(([o], [s]) => o.localeCompare(s, "zh"));
}
function t$(e) {
  return e ? Jx[e] || e : "其他";
}
function zc(e, t = []) {
  const n = /* @__PURE__ */ new Map();
  for (const s of t || [])
    for (const i of s.tool_names || []) {
      const l = n.get(i) || [];
      l.push(s.name), n.set(i, l);
    }
  const o = {};
  for (const s of e || []) {
    const i = { ...s, usedBy: n.get(s.name) || [] }, l = s.source === "mcp" || s.specialist === "mcp" ? "MCP" : t$(s.specialist);
    (o[l] || (o[l] = [])).push(i);
  }
  return Object.entries(o).sort(([s], [i]) => s.localeCompare(i, "zh"));
}
function n$(e, t) {
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
function o$(e, t, n) {
  const o = t.trim().toLowerCase();
  return (e || []).filter((s) => {
    const i = s.source === "mcp" || s.specialist === "mcp";
    return n === "mcp" && !i || n === "builtin" && i ? !1 : o ? [s.name, s.server, s.description, s.specialist].some((l) => String(l || "").toLowerCase().includes(o)) : !0;
  });
}
function lr(e, t, n) {
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
  const o = n.filter((l) => lr(e, l.id, t));
  if (lr(e, "*", t) && o.length === n.length) return "全部角色";
  if (!o.length) return "未分配";
  const i = o.map((l) => l.name);
  return i.length <= 2 ? i.join("、") : `${i.slice(0, 2).join("、")} 等 ${i.length} 个角色`;
}
function s$(e) {
  const t = {};
  for (const n of e || []) {
    const o = n.kind === "skill" ? `技能 · ${n.group}` : n.kind === "mcp" ? "MCP 服务" : `工具 · ${n.group}`;
    (t[o] || (t[o] = [])).push(n);
  }
  return Object.entries(t).sort(([n], [o]) => n.localeCompare(o, "zh"));
}
function i$(e, t, n) {
  const o = t.trim().toLowerCase();
  return (e || []).filter((s) => s.locked || n !== "all" && s.kind !== n ? !1 : o ? [s.name, s.group, s.server, s.description].some((i) => String(i || "").toLowerCase().includes(o)) : !0);
}
function l$(e) {
  return e.kind === "mcp" ? "未授权则完全不可见；授权后该服务下的工具才可被角色调用。" : e.kind === "skill" ? e.builtin ? "内置技能默认开放，可按角色关闭。" : "自定义技能默认不给任何角色，需要明确分配。" : e.locked ? "MCP 工具随所属服务授权，不在这里单独开关。" : "内置工具默认开放，可按角色关闭。";
}
function r$(e) {
  return [{ id: "*", name: "全部角色(*)" }, ...(e == null ? void 0 : e.personas) || []];
}
const a$ = { class: "yv-page extension-page" }, u$ = { class: "extension-hero" }, c$ = { class: "hero-actions" }, d$ = ["disabled"], f$ = {
  class: "signal-strip",
  "aria-label": "能力状态"
}, p$ = {
  class: "extension-tabs",
  "aria-label": "能力工作台"
}, h$ = ["data-capability-tab", "onClick"], v$ = {
  key: 1,
  class: "overview-layout"
}, g$ = { class: "overview-foot" }, m$ = { class: "health-row" }, y$ = { class: "health-row" }, b$ = { class: "health-row" }, _$ = {
  key: 0,
  class: "attention-list"
}, w$ = ["onClick"], k$ = { class: "quick-entry" }, E$ = {
  key: 2,
  class: "content-section"
}, C$ = { class: "assign-toolbar" }, S$ = { class: "filter-input" }, x$ = { class: "assign-kinds" }, $$ = ["onClick"], I$ = { class: "assign-legend" }, N$ = {
  key: 0,
  class: "yv-empty"
}, T$ = {
  key: 1,
  class: "assign-board"
}, M$ = { class: "assign-table" }, P$ = { class: "group-row" }, O$ = ["colspan"], A$ = { class: "sticky" }, D$ = ["title"], R$ = ["checked", "disabled", "aria-label", "onChange"], L$ = {
  key: 0,
  class: "yv-empty"
}, V$ = {
  key: 3,
  class: "content-section"
}, z$ = {
  key: 0,
  class: "yv-empty"
}, F$ = { class: "row-main" }, B$ = { class: "tag-line" }, H$ = { class: "flag-line" }, U$ = ["checked", "onChange"], j$ = { key: 0 }, G$ = ["checked", "onChange"], q$ = { key: 1 }, Y$ = ["checked", "onChange"], X$ = { class: "row-actions" }, K$ = ["title", "onClick"], W$ = ["onClick"], Z$ = {
  key: 4,
  class: "content-section"
}, J$ = {
  key: 0,
  class: "yv-empty"
}, Q$ = { class: "row-main" }, eI = { class: "grant-box" }, tI = { class: "grant-empty" }, nI = {
  key: 0,
  class: "mcp-test"
}, oI = { class: "row-actions" }, sI = ["onClick"], iI = ["onClick"], lI = ["onClick"], rI = ["onClick"], aI = ["onClick"], uI = {
  key: 5,
  class: "content-section"
}, cI = { class: "filter-row" }, dI = { class: "filter-input" }, fI = {
  key: 0,
  class: "yv-empty"
}, pI = { class: "row-main" }, hI = {
  key: 0,
  class: "used-by tag-line"
}, vI = {
  key: 6,
  class: "content-section"
}, gI = { class: "catalog-tools" }, mI = { class: "filter-input" }, yI = { class: "catalog-grid" }, bI = { class: "tag-line" }, _I = ["disabled", "onClick"], wI = { class: "dialog-head" }, kI = { class: "yv-kicker" }, EI = { key: 0 }, CI = { key: 1 }, SI = {
  key: 0,
  class: "readonly-banner"
}, xI = { class: "yv-field" }, $I = ["readonly"], II = { class: "yv-field" }, NI = ["readonly"], TI = { class: "yv-field" }, MI = ["readonly"], PI = { class: "yv-field" }, OI = ["readonly"], AI = {
  key: 1,
  class: "mcp-test"
}, DI = ["value", "disabled"], RI = {
  key: 2,
  class: "yv-button primary",
  type: "submit"
}, LI = { class: "yv-field" }, VI = ["readonly"], zI = { class: "yv-field" }, FI = { class: "transport-tabs" }, BI = ["onClick"], HI = { class: "yv-field" }, UI = { class: "yv-field" }, jI = { class: "yv-field" }, GI = { class: "yv-field" }, qI = { class: "yv-field" }, YI = { class: "flag-line" }, XI = {
  class: "yv-button primary",
  type: "submit"
}, KI = { class: "dialog-head" }, WI = { class: "dialog-body" }, ZI = { class: "catalog-detail" }, JI = { class: "dialog-head" }, QI = { class: "dialog-body" }, eN = { class: "dialog-actions" }, tN = ["disabled"], nN = /* @__PURE__ */ He({
  __name: "App",
  setup(e) {
    const t = un({ skills: [], servers: [], tools: [] }), n = te(null), o = te(""), s = te("all"), i = te(!1), l = [
      { id: "all", label: "全部" },
      { id: "skill", label: "技能(Skill)" },
      { id: "mcp", label: "MCP" },
      { id: "tool", label: "工具(Tool)" }
    ], r = te(Vc(location.hash)), u = te(!1), c = te(""), d = te(!1), f = te(""), p = te("all"), v = te(null), w = te(null), S = te(null), P = te("skill"), z = te(null), L = te([]), y = te(!1), C = te(""), O = te("all"), q = te(null), Y = te(null), B = te(null), M = te(!1), X = un({}), ie = un({ title: "", detail: "", busy: !1 });
    let D = null;
    const G = un({ name: "", description: "", instructions: "", prompt_hint: "", tool_names: [] }), h = un({ name: "", description: "", transport: "stdio", command: "", args: "", env: "", url: "", headers: "", enabled: !0 }), A = ae(() => Qx(t)), $ = ae(() => n$(t, n.value)), V = ae(() => r$(n.value)), U = ae(() => {
      var le;
      return s$(i$(((le = n.value) == null ? void 0 : le.items) || [], o.value, s.value));
    }), ee = ae(() => U.value.reduce((le, [, N]) => le + N.length, 0)), ce = ae(() => e$(t.skills)), ve = ae(() => zc(t.tools)), re = ae(() => zc(o$(t.tools, f.value, p.value), t.skills)), be = ae(() => {
      const le = C.value.trim().toLowerCase();
      return L.value.filter((N) => !le || [N.id, N.name, N.description, ...N.categories || []].join(" ").toLowerCase().includes(le));
    });
    let pe = 0;
    function de(le, N = !1) {
      c.value = le, d.value = N;
    }
    function Ie() {
      return { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" };
    }
    function Me(le) {
      return le.split(/\r?\n/).map((N) => N.trim()).filter(Boolean);
    }
    function ne(le) {
      r.value = le;
      const N = "#capabilities-" + le;
      location.hash !== N && history.replaceState(null, "", N), le === "catalog" && ut(!1);
    }
    function xe() {
      const le = Vc(location.hash);
      r.value = le, le === "catalog" && ut(!1);
    }
    async function Ee(le = !1) {
      le || (u.value = !0);
      try {
        const [N, Pe, We, Et] = await Promise.all([
          je("/api/skills"),
          je("/api/mcp/servers"),
          je("/api/skills/tools"),
          je("/api/capabilities/assignments")
        ]);
        t.skills = N, t.servers = Pe, t.tools = We, n.value = Et, le || de("能力状态已刷新");
      } catch (N) {
        de(it(N), !0);
      } finally {
        u.value = !1;
      }
    }
    function ke() {
      I(), pe = window.setInterval(() => Ee(!0), 3e4);
    }
    function I() {
      pe && window.clearInterval(pe), pe = 0;
    }
    async function R() {
      xe(), await Ee(!0), ke();
    }
    function b() {
      Y.value = null, M.value = !1, Object.assign(G, { name: "", description: "", instructions: "", prompt_hint: "", tool_names: [] });
    }
    function _(le, N = !1) {
      b(), P.value = "skill", le && (Y.value = le.name, M.value = !!(N || le.builtin), Object.assign(G, {
        name: le.name,
        description: le.description || "",
        instructions: le.instructions || "",
        prompt_hint: le.prompt_hint || "",
        tool_names: [...le.tool_names || []]
      })), _t(() => {
        var Pe;
        return (Pe = v.value) == null ? void 0 : Pe.showModal();
      });
    }
    function E() {
      B.value = null, Object.assign(h, { name: "", description: "", transport: "stdio", command: "", args: "", env: "", url: "", headers: "", enabled: !0 });
    }
    function x(le) {
      E(), P.value = "mcp", le && (B.value = le.name, Object.assign(h, {
        name: le.name,
        description: le.description || "",
        transport: le.transport || "stdio",
        command: le.command || "",
        args: (le.args || []).join(`
`),
        env: Lc(le.env),
        url: le.url || "",
        headers: Lc(le.headers),
        enabled: !!le.enabled
      })), _t(() => {
        var N;
        return (N = v.value) == null ? void 0 : N.showModal();
      });
    }
    async function j() {
      var le;
      if (!M.value) {
        if (!G.name.trim() || !G.instructions.trim()) return de("名称与提示词不能为空", !0);
        u.value = !0;
        try {
          const N = {
            description: G.description.trim(),
            instructions: G.instructions.trim(),
            prompt_hint: G.prompt_hint.trim(),
            tool_names: G.tool_names
          };
          Y.value ? await je("/api/skills/" + encodeURIComponent(Y.value), { method: "PATCH", headers: Ie(), body: JSON.stringify(N) }) : await je("/api/skills", { method: "POST", headers: Ie(), body: JSON.stringify({ name: G.name.trim(), ...N }) }), (le = v.value) == null || le.close(), await Ee(!0), de(Y.value ? "技能已保存" : "技能已创建");
        } catch (N) {
          de(it(N), !0);
        } finally {
          u.value = !1;
        }
      }
    }
    async function K(le, N) {
      try {
        await je("/api/skills/" + encodeURIComponent(le.name), { method: "PATCH", headers: Ie(), body: JSON.stringify(N) }), await Ee(!0);
      } catch (Pe) {
        de(it(Pe), !0);
      }
    }
    function J(le, N, Pe) {
      ie.title = le, ie.detail = N, ie.busy = !1, D = Pe, _t(() => {
        var We;
        return (We = w.value) == null ? void 0 : We.showModal();
      });
    }
    async function W() {
      var le;
      if (D) {
        ie.busy = !0;
        try {
          await D(), (le = w.value) == null || le.close();
        } catch (N) {
          de(it(N), !0);
        } finally {
          ie.busy = !1, D = null;
        }
      }
    }
    function fe(le) {
      J("删除技能", "删除 " + le.name + " 后不可恢复。", async () => {
        await je("/api/skills/" + encodeURIComponent(le.name), { method: "DELETE" }), await Ee(!0), de("技能已删除");
      });
    }
    async function ue(le) {
      var Pe, We, Et, Wt;
      if (!le) return;
      const N = new FormData();
      N.append("file", le);
      try {
        const zt = await je("/api/skills/upload", { method: "POST", body: N });
        await Ee(!0);
        const gn = [];
        (Pe = zt.installed) != null && Pe.length && gn.push("已安装：" + zt.installed.join("、")), (We = zt.skipped) != null && We.length && gn.push("跳过：" + zt.skipped.map((F) => F.name + "（" + F.reason + "）").join("、")), de(gn.join("。") || "上传完成，没有新技能被安装", !!((Et = zt.skipped) != null && Et.length && !((Wt = zt.installed) != null && Wt.length)));
      } catch (zt) {
        de(it(zt), !0);
      } finally {
        z.value && (z.value.value = "");
      }
    }
    function ge(le) {
      var Pe;
      const N = le.target;
      ue(((Pe = N.files) == null ? void 0 : Pe[0]) || void 0);
    }
    async function he() {
      var le;
      if (!h.name.trim()) return de("服务名称不能为空", !0);
      try {
        await je("/api/mcp/servers", {
          method: "POST",
          headers: Ie(),
          body: JSON.stringify({
            name: h.name.trim(),
            description: h.description.trim(),
            transport: h.transport,
            command: h.command.trim(),
            args: Me(h.args),
            env: Rc(h.env),
            url: h.url.trim(),
            headers: Rc(h.headers),
            enabled: h.enabled
          })
        }), (le = v.value) == null || le.close(), await Ee(!0), de(B.value ? "MCP 服务已更新并重连" : "MCP 服务已保存并连接");
      } catch (N) {
        de(it(N), !0);
      }
    }
    async function Te(le) {
      try {
        await je("/api/mcp/servers/" + encodeURIComponent(le.name) + "/" + (le.enabled ? "disable" : "enable"), { method: "POST" }), await Ee(!0);
      } catch (N) {
        de(it(N), !0);
      }
    }
    async function Be(le) {
      de("正在测试 " + le.name + "…");
      try {
        const N = await je("/api/mcp/servers/" + encodeURIComponent(le.name) + "/test", { method: "POST" });
        X[le.name] = N, de(N.ok ? le.name + " 连接成功，发现 " + N.tool_count + " 个工具，耗时 " + N.elapsed_ms + "ms" : le.name + " 连接失败：" + N.error, !N.ok), await Ee(!0);
      } catch (N) {
        de(it(N), !0);
      }
    }
    async function Ae(le) {
      try {
        await je("/api/mcp/servers/" + encodeURIComponent(le.name) + "/reload", { method: "POST" }), await Ee(!0), de(le.name + " 已重新加载");
      } catch (N) {
        de(it(N), !0);
      }
    }
    function st(le) {
      var Pe;
      const N = (Pe = n.value) == null ? void 0 : Pe.items.find((We) => We.kind === "mcp" && We.id === le.name);
      return !N || !n.value ? "尚未授权任何角色" : _i(N, n.value);
    }
    function mt(le, N) {
      return n.value ? lr(le, N, n.value) : !1;
    }
    async function Vt(le, N, Pe) {
      if (!(le.locked || i.value)) {
        i.value = !0;
        try {
          n.value = await je("/api/capabilities/assignments", {
            method: "PATCH",
            headers: Ie(),
            body: JSON.stringify({ persona_id: N, kind: le.kind, id: le.id, assigned: Pe })
          }), de((Pe ? "已分配 " : "已取消 ") + le.name);
        } catch (We) {
          de(it(We), !0);
        } finally {
          i.value = !1;
        }
      }
    }
    function Mt(le, N, Pe) {
      const We = Pe.target, Et = We.checked;
      We.checked = mt(le, N), Vt(le, N, Et);
    }
    function qe(le) {
      J("删除 MCP 服务", "删除 " + le.name + " 后，其工具将立即从能力清单中移除。", async () => {
        await je("/api/mcp/servers/" + encodeURIComponent(le.name), { method: "DELETE" }), await Ee(!0), de("MCP 服务已删除");
      });
    }
    async function ut(le = !1) {
      try {
        const N = await je("/api/extensions/catalog?kind=" + encodeURIComponent(O.value) + (le ? "&refresh=true" : ""));
        L.value = N.items || [], y.value = !!N.stale;
      } catch {
        de("在线扩展目录暂时不可用，请稍后再试", !0), L.value = [];
      }
    }
    function yt(le) {
      return le.kind === "skill" ? t.skills.some((N) => N.name === le.id) : t.servers.some((N) => N.name === le.id);
    }
    function xt(le) {
      q.value = le, _t(() => {
        var N;
        return (N = S.value) == null ? void 0 : N.showModal();
      });
    }
    async function ct() {
      var N, Pe, We;
      const le = q.value;
      if (le)
        try {
          const Et = await je("/api/extensions/catalog/" + encodeURIComponent(le.id) + "/install", {
            method: "POST",
            headers: Ie(),
            body: JSON.stringify({ confirmed: !1 })
          });
          if ((Pe = (N = Et.preview) == null ? void 0 : N.conflicts) != null && Pe.length) throw new Error(Et.preview.conflicts.join("；"));
          const Wt = await je("/api/extensions/catalog/" + encodeURIComponent(le.id) + "/install", {
            method: "POST",
            headers: Ie(),
            body: JSON.stringify({ confirmed: !0 })
          });
          if (Wt.status !== "installed") throw new Error(Wt.message || "安装未完成");
          await Ee(!0), (We = S.value) == null || We.close(), de(le.kind === "skill" ? "安装完成，请在技能页启用并信任，再到角色分配页授权" : "安装完成，请在 MCP 页配置连接，再到角色分配页授权");
        } catch (Et) {
          de(it(Et), !0);
        }
    }
    function dt(le) {
      var Pe;
      if (!le.enabled) return "warn";
      const N = (Pe = le.status) == null ? void 0 : Pe.status;
      return N === "connected" ? "ok" : N === "error" ? "error" : "warn";
    }
    function Bt(le) {
      var Pe, We;
      if (!le.enabled) return "已停用";
      const N = (Pe = le.status) == null ? void 0 : Pe.status;
      return N === "connected" ? "已连接 · " + Number(((We = le.status) == null ? void 0 : We.tool_count) || 0) + " 工具" : N === "error" ? "连接失败" : N === "not_loaded" ? "未加载" : N || "未知";
    }
    function Ht() {
      return t.skills.find((le) => le.name === Y.value);
    }
    function Ut() {
      R();
    }
    function on() {
      I();
    }
    return St(() => {
      const le = document.querySelector("#extensions-app-root");
      le == null || le.addEventListener("charactoid:extensions-show", Ut), le == null || le.addEventListener("charactoid:extensions-hide", on), window.addEventListener("hashchange", xe), R();
    }), Tn(() => {
      I(), window.removeEventListener("hashchange", xe);
    }), (le, N) => {
      var Pe, We, Et, Wt, zt, gn, F, m, me, Le;
      return g(), k("main", a$, [
        a("header", u$, [
          N[40] || (N[40] = a("div", null, [
            a("span", { class: "yv-kicker" }, "Agent capability registry"),
            a("h1", null, "能力扩展"),
            a("p", null, "内置 Skill / Tool 固定，可按角色开关；自定义 Skill 与 MCP 在本页新增后，再分配给角色。")
          ], -1)),
          a("div", c$, [
            a("span", {
              class: ye(["yv-status", A.value.attentionCount ? "warn" : "ok"])
            }, T(A.value.attentionCount ? A.value.attentionCount + " 项待处理" : "运行正常"), 3),
            a("button", {
              class: "yv-button yv-icon-button",
              type: "button",
              title: "刷新",
              disabled: u.value,
              onClick: N[0] || (N[0] = (Z) => Ee())
            }, [
              se(H(qt))
            ], 8, d$)
          ])
        ]),
        a("section", f$, [
          a("div", null, [
            N[41] || (N[41] = a("span", null, "已启用技能", -1)),
            a("strong", null, T(A.value.enabledSkills), 1),
            a("small", null, "共 " + T(t.skills.length) + " 个", 1)
          ]),
          a("div", null, [
            N[42] || (N[42] = a("span", null, "MCP 在线", -1)),
            a("strong", null, T(A.value.mcpOnline), 1),
            a("small", null, T(A.value.mcpIssues) + " 个异常", 1)
          ]),
          a("div", null, [
            N[43] || (N[43] = a("span", null, "已注册工具", -1)),
            a("strong", null, T(A.value.toolCount), 1),
            N[44] || (N[44] = a("small", null, "内置 + MCP", -1))
          ]),
          a("div", null, [
            N[45] || (N[45] = a("span", null, "需要处理", -1)),
            a("strong", null, T(A.value.attentionCount), 1),
            N[46] || (N[46] = a("small", null, "未信任或连接异常", -1))
          ])
        ]),
        a("nav", p$, [
          (g(!0), k(Se, null, Ve(H(Zx), (Z) => (g(), k("button", {
            key: Z.id,
            "data-capability-tab": Z.id,
            type: "button",
            class: ye({ active: r.value === Z.id }),
            onClick: (Oe) => ne(Z.id)
          }, T(Z.label), 11, h$))), 128))
        ]),
        c.value ? (g(), k("p", {
          key: 0,
          class: ye(["extension-message", { error: d.value }]),
          role: "status"
        }, T(c.value), 3)) : oe("", !0),
        r.value === "overview" ? (g(), k("section", v$, [
          N[52] || (N[52] = $v('<div class="capability-line"><article class="skill"><span>01 Assign</span><strong>角色分配</strong><p>按角色开关 Skill / Tool；MCP 按服务授权，授权后该服务工具一起生效。</p></article><article class="tool"><span>02 Skill</span><strong>技能</strong><p>内置技能只读固定；自定义技能可新增、启用和信任。</p></article><article class="mcp"><span>03 MCP</span><strong>MCP 服务</strong><p>负责连接、测试和启用。角色授权请到分配页统一管理。</p></article><article><span>04 Tool</span><strong>工具清单</strong><p>内置 Worker 工具固定；MCP 工具随服务出现，确认策略写在代码里。</p></article></div>', 1)),
          a("div", g$, [
            a("div", null, [
              N[50] || (N[50] = a("h2", null, "健康与待处理", -1)),
              a("div", m$, [
                N[47] || (N[47] = a("span", null, "技能", -1)),
                a("div", null, T(A.value.enabledSkills) + " / " + T(t.skills.length) + " 已启用", 1),
                a("button", {
                  class: "yv-button",
                  type: "button",
                  onClick: N[1] || (N[1] = (Z) => ne("skills"))
                }, "管理")
              ]),
              a("div", y$, [
                N[48] || (N[48] = a("span", null, "MCP", -1)),
                a("div", null, T(A.value.mcpOnline) + " 在线 · " + T(A.value.mcpIssues) + " 异常", 1),
                a("button", {
                  class: "yv-button",
                  type: "button",
                  onClick: N[2] || (N[2] = (Z) => ne("mcp"))
                }, "管理")
              ]),
              a("div", b$, [
                N[49] || (N[49] = a("span", null, "工具", -1)),
                a("div", null, T(A.value.toolCount) + " 个已注册", 1),
                a("button", {
                  class: "yv-button",
                  type: "button",
                  onClick: N[3] || (N[3] = (Z) => ne("tools"))
                }, "查看")
              ]),
              $.value.length ? (g(), k("div", _$, [
                (g(!0), k(Se, null, Ve($.value, (Z) => (g(), k("button", {
                  key: Z.kind + Z.name,
                  class: "attention-item",
                  type: "button",
                  onClick: (Oe) => ne(Z.tab)
                }, [
                  a("span", null, T(Z.kind === "skill" ? "技能" : "MCP"), 1),
                  a("div", null, [
                    a("strong", null, T(Z.name), 1),
                    a("small", null, T(Z.detail), 1)
                  ])
                ], 8, w$))), 128))
              ])) : oe("", !0)
            ]),
            a("div", k$, [
              N[51] || (N[51] = a("h2", null, "快捷入口", -1)),
              a("button", {
                class: "yv-button primary",
                type: "button",
                onClick: N[4] || (N[4] = (Z) => ne("assign"))
              }, "角色分配(Assign)"),
              a("button", {
                class: "yv-button",
                type: "button",
                onClick: N[5] || (N[5] = (Z) => ne("skills"))
              }, "技能(Skill)"),
              a("button", {
                class: "yv-button",
                type: "button",
                onClick: N[6] || (N[6] = (Z) => ne("mcp"))
              }, "MCP服务(MCP)"),
              a("button", {
                class: "yv-button",
                type: "button",
                onClick: N[7] || (N[7] = (Z) => ne("tools"))
              }, "工具(Tool)"),
              a("button", {
                class: "yv-button",
                type: "button",
                onClick: N[8] || (N[8] = (Z) => ne("catalog"))
              }, "扩展目录(Catalog)")
            ])
          ])
        ])) : r.value === "assign" ? (g(), k("section", E$, [
          a("header", null, [
            N[55] || (N[55] = a("div", null, [
              a("span", { class: "yv-kicker" }, "Role assignment matrix"),
              a("h2", null, "角色分配(Assign)"),
              a("p", null, "这是按角色分配 Skill / Tool / MCP 的主界面。内置能力内容固定，只能开关；MCP 按服务授权，不逐个工具分配。")
            ], -1)),
            a("div", null, [
              a("button", {
                class: "yv-button",
                type: "button",
                onClick: N[9] || (N[9] = (Z) => ne("skills"))
              }, [
                se(H(oo)),
                N[53] || (N[53] = _e("新增技能"))
              ]),
              a("button", {
                class: "yv-button",
                type: "button",
                onClick: N[10] || (N[10] = (Z) => ne("mcp"))
              }, [
                se(H(oo)),
                N[54] || (N[54] = _e("新增 MCP"))
              ])
            ])
          ]),
          a("div", C$, [
            a("label", S$, [
              se(H(Zs)),
              De(a("input", {
                "onUpdate:modelValue": N[11] || (N[11] = (Z) => o.value = Z),
                placeholder: "搜索技能、工具或 MCP 服务"
              }, null, 512), [
                [Ge, o.value]
              ])
            ]),
            a("div", x$, [
              (g(), k(Se, null, Ve(l, (Z) => a("button", {
                key: Z.id,
                type: "button",
                class: ye({ active: s.value === Z.id }),
                onClick: (Oe) => s.value = Z.id
              }, T(Z.label), 11, $$)), 64))
            ])
          ]),
          a("p", I$, "显示 " + T(ee.value) + " 项。勾选即允许该角色使用；取消「全部角色(*)」中的某一个角色，只会收回该角色，不会清空其他人。", 1),
          V.value.length ? (g(), k("div", T$, [
            a("table", M$, [
              a("thead", null, [
                a("tr", null, [
                  N[56] || (N[56] = a("th", { class: "sticky" }, "能力", -1)),
                  (g(!0), k(Se, null, Ve(V.value, (Z) => (g(), k("th", {
                    key: Z.id,
                    class: "check"
                  }, T(Z.name), 1))), 128))
                ])
              ]),
              a("tbody", null, [
                (g(!0), k(Se, null, Ve(U.value, ([Z, Oe]) => (g(), k(Se, { key: Z }, [
                  a("tr", P$, [
                    a("td", {
                      colspan: V.value.length + 1
                    }, T(Z), 9, O$)
                  ]),
                  (g(!0), k(Se, null, Ve(Oe, (we) => (g(), k("tr", {
                    key: we.id,
                    class: ye("kind-" + we.kind)
                  }, [
                    a("td", A$, [
                      a("div", {
                        class: "assign-name",
                        title: H(l$)(we)
                      }, [
                        a("strong", null, T(we.name), 1),
                        a("small", null, T(n.value ? H(_i)(we, n.value) : ""), 1)
                      ], 8, D$)
                    ]),
                    (g(!0), k(Se, null, Ve(V.value, (ft) => (g(), k("td", {
                      key: we.id + ft.id,
                      class: "check"
                    }, [
                      a("input", {
                        type: "checkbox",
                        checked: mt(we, ft.id),
                        disabled: i.value || we.locked,
                        "aria-label": we.name + " / " + ft.name,
                        onChange: (Pt) => Mt(we, ft.id, Pt)
                      }, null, 40, R$)
                    ]))), 128))
                  ], 2))), 128))
                ], 64))), 128))
              ])
            ]),
            U.value.length ? oe("", !0) : (g(), k("p", L$, "没有匹配的能力。自定义 Skill / MCP 请到对应分页新增。"))
          ])) : (g(), k("div", N$, "还没有可分配的能力"))
        ])) : r.value === "skills" ? (g(), k("section", V$, [
          a("header", null, [
            N[59] || (N[59] = a("div", null, [
              a("span", { class: "yv-kicker" }, "Instruction packages"),
              a("h2", null, "技能(Skill)"),
              a("p", null, "内置技能只读查看；自定义技能可编辑、启用、信任并决定是否允许脚本。")
            ], -1)),
            a("div", null, [
              a("input", {
                ref_key: "uploadInput",
                ref: z,
                hidden: "",
                type: "file",
                accept: ".zip",
                onChange: ge
              }, null, 544),
              a("button", {
                class: "yv-button",
                type: "button",
                onClick: N[12] || (N[12] = (Z) => {
                  var Oe;
                  return (Oe = z.value) == null ? void 0 : Oe.click();
                })
              }, [
                se(H(Fl)),
                N[57] || (N[57] = _e("上传技能包"))
              ]),
              a("button", {
                class: "yv-button primary",
                type: "button",
                onClick: N[13] || (N[13] = (Z) => _())
              }, [
                se(H(oo)),
                N[58] || (N[58] = _e("新增技能"))
              ])
            ])
          ]),
          t.skills.length ? oe("", !0) : (g(), k("div", z$, "还没有技能")),
          (g(!0), k(Se, null, Ve(ce.value, ([Z, Oe]) => (g(), k("section", {
            key: Z,
            class: "skill-group"
          }, [
            a("h3", null, T(Z), 1),
            (g(!0), k(Se, null, Ve(Oe, (we) => {
              var ft;
              return g(), k("article", {
                key: we.name,
                class: "extension-row kind-skill"
              }, [
                a("div", F$, [
                  a("div", null, [
                    a("strong", null, T(we.name), 1),
                    a("span", null, T(we.builtin ? "内置" : "自定义") + " · " + T(we.format === "skillmd" ? "标准包" : "JSON"), 1)
                  ]),
                  a("p", null, T(we.description || "暂无说明"), 1),
                  a("div", B$, [
                    (g(!0), k(Se, null, Ve(we.tool_names, (Pt) => (g(), k("span", { key: Pt }, T(Pt), 1))), 128))
                  ]),
                  a("div", H$, [
                    a("label", null, [
                      a("input", {
                        type: "checkbox",
                        checked: we.enabled,
                        onChange: (Pt) => K(we, { enabled: !we.enabled })
                      }, null, 40, U$),
                      N[60] || (N[60] = a("span", null, "启用", -1))
                    ]),
                    we.builtin ? oe("", !0) : (g(), k("label", j$, [
                      a("input", {
                        type: "checkbox",
                        checked: we.trusted,
                        onChange: (Pt) => K(we, { trusted: !we.trusted })
                      }, null, 40, G$),
                      N[61] || (N[61] = a("span", null, "信任", -1))
                    ])),
                    (ft = we.scripts) != null && ft.length ? (g(), k("label", q$, [
                      a("input", {
                        type: "checkbox",
                        checked: we.scripts_enabled,
                        onChange: (Pt) => K(we, { scripts_enabled: !we.scripts_enabled })
                      }, null, 40, Y$),
                      N[62] || (N[62] = a("span", null, "允许脚本", -1))
                    ])) : oe("", !0)
                  ])
                ]),
                a("div", X$, [
                  a("span", {
                    class: ye(["yv-status", we.enabled ? "ok" : "warn"])
                  }, T(we.enabled ? "已启用" : "已停用"), 3),
                  a("button", {
                    class: "yv-button yv-icon-button",
                    type: "button",
                    title: we.builtin ? "查看" : "编辑",
                    onClick: (Pt) => _(we, we.builtin)
                  }, [
                    (g(), ht(kr(we.builtin ? H(ef) : H(Vl))))
                  ], 8, K$),
                  we.builtin ? oe("", !0) : (g(), k("button", {
                    key: 0,
                    class: "yv-button yv-icon-button danger",
                    type: "button",
                    title: "删除",
                    onClick: (Pt) => fe(we)
                  }, [
                    se(H(Gn))
                  ], 8, W$))
                ])
              ]);
            }), 128))
          ]))), 128))
        ])) : r.value === "mcp" ? (g(), k("section", Z$, [
          a("header", null, [
            N[64] || (N[64] = a("div", null, [
              a("span", { class: "yv-kicker" }, "External protocol services"),
              a("h2", null, "MCP服务(MCP)"),
              a("p", null, "配置连接、测试连通和启用。角色授权请到「角色分配」页统一管理，未授权角色即使服务在线也看不到对应工具。")
            ], -1)),
            a("button", {
              class: "yv-button primary",
              type: "button",
              onClick: N[14] || (N[14] = (Z) => x())
            }, [
              se(H(oo)),
              N[63] || (N[63] = _e("新增服务"))
            ])
          ]),
          t.servers.length ? oe("", !0) : (g(), k("div", J$, "尚未配置 MCP 服务")),
          (g(!0), k(Se, null, Ve(t.servers, (Z) => {
            var Oe;
            return g(), k("article", {
              key: Z.name,
              class: "extension-row kind-mcp"
            }, [
              a("div", Q$, [
                a("div", null, [
                  a("strong", null, T(Z.name), 1),
                  a("span", null, T(Z.transport) + " · " + T(Z.enabled ? "已启用" : "已停用"), 1)
                ]),
                a("p", null, T(Z.description || ((Oe = Z.status) == null ? void 0 : Oe.error) || "暂无说明"), 1),
                a("div", eI, [
                  N[65] || (N[65] = a("span", null, "角色授权", -1)),
                  a("p", tI, "当前：" + T(st(Z)), 1),
                  a("button", {
                    class: "yv-button",
                    type: "button",
                    onClick: N[15] || (N[15] = (we) => ne("assign"))
                  }, "去分配")
                ]),
                X[Z.name] ? (g(), k("p", nI, T(X[Z.name].ok ? "最近测试成功 · " + X[Z.name].tool_count + " 个工具 · " + X[Z.name].elapsed_ms + "ms" : "最近测试失败：" + X[Z.name].error), 1)) : oe("", !0)
              ]),
              a("div", oI, [
                a("span", {
                  class: ye(["yv-status", dt(Z)])
                }, T(Bt(Z)), 3),
                a("button", {
                  class: "yv-button",
                  type: "button",
                  onClick: (we) => Te(Z)
                }, T(Z.enabled ? "停用" : "启用"), 9, sI),
                a("button", {
                  class: "yv-button yv-icon-button",
                  type: "button",
                  title: "测试连接",
                  onClick: (we) => Be(Z)
                }, [
                  se(H($r))
                ], 8, iI),
                a("button", {
                  class: "yv-button yv-icon-button",
                  type: "button",
                  title: "重新加载",
                  onClick: (we) => Ae(Z)
                }, [
                  se(H(xg))
                ], 8, lI),
                a("button", {
                  class: "yv-button yv-icon-button",
                  type: "button",
                  title: "编辑",
                  onClick: (we) => x(Z)
                }, [
                  se(H(Vl))
                ], 8, rI),
                a("button", {
                  class: "yv-button yv-icon-button danger",
                  type: "button",
                  title: "删除",
                  onClick: (we) => qe(Z)
                }, [
                  se(H(Gn))
                ], 8, aI)
              ])
            ]);
          }), 128))
        ])) : r.value === "tools" ? (g(), k("section", uI, [
          a("header", null, [
            N[66] || (N[66] = a("div", null, [
              a("span", { class: "yv-kicker" }, "Registered tools"),
              a("h2", null, "工具(Tool)"),
              a("p", null, "这里列出内置 Worker 工具和已连接 MCP 工具。内置工具可在角色分配页按角色开关；MCP 工具随所属服务授权。")
            ], -1)),
            a("button", {
              class: "yv-button",
              type: "button",
              onClick: N[16] || (N[16] = (Z) => ne("assign"))
            }, "去分配")
          ]),
          a("div", cI, [
            a("label", dI, [
              se(H(Zs)),
              De(a("input", {
                "onUpdate:modelValue": N[17] || (N[17] = (Z) => f.value = Z),
                placeholder: "搜索名称、说明、服务或 Worker"
              }, null, 512), [
                [Ge, f.value]
              ])
            ]),
            De(a("select", {
              "onUpdate:modelValue": N[18] || (N[18] = (Z) => p.value = Z)
            }, N[67] || (N[67] = [
              a("option", { value: "all" }, "全部来源", -1),
              a("option", { value: "builtin" }, "内置", -1),
              a("option", { value: "mcp" }, "MCP", -1)
            ]), 512), [
              [fn, p.value]
            ])
          ]),
          re.value.length ? oe("", !0) : (g(), k("div", fI, "没有匹配的工具")),
          (g(!0), k(Se, null, Ve(re.value, ([Z, Oe]) => (g(), k("section", {
            key: Z,
            class: "tool-group"
          }, [
            a("h3", null, T(Z), 1),
            (g(!0), k(Se, null, Ve(Oe, (we) => {
              var ft;
              return g(), k("article", {
                key: we.name,
                class: "extension-row kind-tool"
              }, [
                a("div", pI, [
                  a("div", null, [
                    a("strong", null, T(we.name), 1),
                    a("span", null, T(we.source === "mcp" ? we.server || "MCP" : "内置"), 1)
                  ]),
                  a("p", null, T(we.description || "暂无说明"), 1),
                  (ft = we.usedBy) != null && ft.length ? (g(), k("div", hI, [
                    (g(!0), k(Se, null, Ve(we.usedBy, (Pt) => (g(), k("span", { key: Pt }, "技能 " + T(Pt), 1))), 128))
                  ])) : oe("", !0)
                ]),
                a("span", {
                  class: ye(["yv-status", we.requires_confirmation ? "warn" : "ok"])
                }, T(we.requires_confirmation ? "调用需确认" : "可直接调用"), 3)
              ]);
            }), 128))
          ]))), 128))
        ])) : r.value === "catalog" ? (g(), k("section", vI, [
          a("header", null, [
            N[69] || (N[69] = a("div", null, [
              a("span", { class: "yv-kicker" }, "Curated catalog"),
              a("h2", null, "扩展目录(Catalog)"),
              a("p", null, "查看可安装扩展，确认来源后再加入本地能力系统。")
            ], -1)),
            a("button", {
              class: "yv-button",
              type: "button",
              onClick: N[19] || (N[19] = (Z) => ut(!0))
            }, [
              se(H(qt)),
              N[68] || (N[68] = _e("刷新目录"))
            ])
          ]),
          a("div", gI, [
            a("label", mI, [
              se(H(Zs)),
              De(a("input", {
                "onUpdate:modelValue": N[20] || (N[20] = (Z) => C.value = Z),
                placeholder: "搜索名称、说明或分类"
              }, null, 512), [
                [Ge, C.value]
              ])
            ]),
            De(a("select", {
              "onUpdate:modelValue": N[21] || (N[21] = (Z) => O.value = Z),
              onChange: N[22] || (N[22] = (Z) => ut(!1))
            }, N[70] || (N[70] = [
              a("option", { value: "all" }, "全部类型", -1),
              a("option", { value: "skill" }, "Skill", -1),
              a("option", { value: "mcp" }, "MCP", -1)
            ]), 544), [
              [fn, O.value]
            ]),
            a("span", {
              class: ye(["yv-status", y.value ? "warn" : "ok"])
            }, T(y.value ? "缓存目录" : L.value.length + " 个条目"), 3)
          ]),
          a("div", yI, [
            (g(!0), k(Se, null, Ve(be.value, (Z) => (g(), k("article", {
              key: Z.id,
              class: ye(["catalog-item", "kind-" + Z.kind])
            }, [
              a("span", null, T((Z.kind || "").toUpperCase()), 1),
              a("h3", null, T(Z.name || Z.id), 1),
              a("small", null, "v" + T(Z.version || "未知") + " · " + T(Z.id), 1),
              a("p", null, T(Z.description || "暂无说明"), 1),
              a("div", bI, [
                (g(!0), k(Se, null, Ve(Z.categories, (Oe) => (g(), k("span", { key: Oe }, T(Oe), 1))), 128))
              ]),
              a("button", {
                class: "yv-button",
                type: "button",
                disabled: yt(Z),
                onClick: (Oe) => xt(Z)
              }, T(yt(Z) ? "已安装" : "查看并安装"), 9, _I)
            ], 2))), 128))
          ])
        ])) : oe("", !0),
        a("dialog", {
          ref_key: "drawer",
          ref: v,
          class: "yv-dialog"
        }, [
          a("header", wI, [
            a("div", null, [
              a("span", kI, T(P.value === "skill" ? "Instruction package" : "Protocol service"), 1),
              P.value === "skill" ? (g(), k("h2", EI, T(M.value ? "查看 " + (Y.value || "") : Y.value ? "编辑 " + Y.value : "新增技能"), 1)) : (g(), k("h2", CI, T(B.value ? "编辑 " + B.value : "新增 MCP 服务"), 1))
            ]),
            a("button", {
              class: "yv-button yv-icon-button",
              type: "button",
              title: "关闭",
              onClick: N[23] || (N[23] = (Z) => {
                var Oe;
                return (Oe = v.value) == null ? void 0 : Oe.close();
              })
            }, [
              se(H(Gt))
            ])
          ]),
          P.value === "skill" ? (g(), k("form", {
            key: 0,
            class: "dialog-body",
            onSubmit: $t(j, ["prevent"])
          }, [
            M.value ? (g(), k("p", SI, "内置技能只读。可以在列表中启用或停用，但不能改提示词和工具。")) : oe("", !0),
            a("label", xI, [
              N[71] || (N[71] = a("span", null, "名称", -1)),
              De(a("input", {
                "onUpdate:modelValue": N[24] || (N[24] = (Z) => G.name = Z),
                readonly: !!Y.value || M.value
              }, null, 8, $I), [
                [Ge, G.name]
              ])
            ]),
            a("label", II, [
              N[72] || (N[72] = a("span", null, "描述", -1)),
              De(a("input", {
                "onUpdate:modelValue": N[25] || (N[25] = (Z) => G.description = Z),
                readonly: M.value
              }, null, 8, NI), [
                [Ge, G.description]
              ])
            ]),
            a("label", TI, [
              N[73] || (N[73] = a("span", null, "提示词", -1)),
              De(a("textarea", {
                "onUpdate:modelValue": N[26] || (N[26] = (Z) => G.instructions = Z),
                rows: "6",
                readonly: M.value
              }, null, 8, MI), [
                [Ge, G.instructions]
              ])
            ]),
            a("label", PI, [
              N[74] || (N[74] = a("span", null, "触发提示", -1)),
              De(a("input", {
                "onUpdate:modelValue": N[27] || (N[27] = (Z) => G.prompt_hint = Z),
                readonly: M.value
              }, null, 8, OI), [
                [Ge, G.prompt_hint]
              ])
            ]),
            (We = (Pe = Ht()) == null ? void 0 : Pe.scripts) != null && We.length ? (g(), k("p", AI, "脚本：" + T(Ht().scripts.join("、")) + T(Ht().scripts_enabled ? "（已允许）" : "（未允许）"), 1)) : oe("", !0),
            (g(!0), k(Se, null, Ve(ve.value, ([Z, Oe]) => (g(), k("fieldset", {
              key: Z,
              class: "tool-options"
            }, [
              a("legend", null, T(Z), 1),
              (g(!0), k(Se, null, Ve(Oe, (we) => (g(), k("label", {
                key: we.name
              }, [
                De(a("input", {
                  "onUpdate:modelValue": N[28] || (N[28] = (ft) => G.tool_names = ft),
                  type: "checkbox",
                  value: we.name,
                  disabled: M.value
                }, null, 8, DI), [
                  [Rl, G.tool_names]
                ]),
                a("span", null, T(we.name) + T(we.requires_confirmation ? "（需确认）" : ""), 1)
              ]))), 128))
            ]))), 128)),
            M.value ? oe("", !0) : (g(), k("button", RI, [
              se(H(zl)),
              N[75] || (N[75] = _e("保存技能"))
            ]))
          ], 32)) : (g(), k("form", {
            key: 1,
            class: "dialog-body",
            onSubmit: $t(he, ["prevent"])
          }, [
            a("label", LI, [
              N[76] || (N[76] = a("span", null, "名称", -1)),
              De(a("input", {
                "onUpdate:modelValue": N[29] || (N[29] = (Z) => h.name = Z),
                readonly: !!B.value
              }, null, 8, VI), [
                [Ge, h.name]
              ])
            ]),
            a("label", zI, [
              N[77] || (N[77] = a("span", null, "描述", -1)),
              De(a("input", {
                "onUpdate:modelValue": N[30] || (N[30] = (Z) => h.description = Z)
              }, null, 512), [
                [Ge, h.description]
              ])
            ]),
            a("div", FI, [
              (g(), k(Se, null, Ve([{ id: "stdio", label: "本地进程(stdio)" }, { id: "streamable_http", label: "远程 HTTP(HTTP)" }, { id: "sse", label: "远程 SSE(SSE)" }], (Z) => a("button", {
                key: Z.id,
                type: "button",
                class: ye({ active: h.transport === Z.id }),
                onClick: (Oe) => h.transport = Z.id
              }, T(Z.label), 11, BI)), 64))
            ]),
            h.transport === "stdio" ? (g(), k(Se, { key: 0 }, [
              a("label", HI, [
                N[78] || (N[78] = a("span", null, "启动命令", -1)),
                De(a("input", {
                  "onUpdate:modelValue": N[31] || (N[31] = (Z) => h.command = Z)
                }, null, 512), [
                  [Ge, h.command]
                ])
              ]),
              a("label", UI, [
                N[79] || (N[79] = a("span", null, "参数（每行一个）", -1)),
                De(a("textarea", {
                  "onUpdate:modelValue": N[32] || (N[32] = (Z) => h.args = Z),
                  rows: "3"
                }, null, 512), [
                  [Ge, h.args]
                ])
              ]),
              a("label", jI, [
                N[80] || (N[80] = a("span", null, "环境变量（KEY=VALUE）", -1)),
                De(a("textarea", {
                  "onUpdate:modelValue": N[33] || (N[33] = (Z) => h.env = Z),
                  rows: "3"
                }, null, 512), [
                  [Ge, h.env]
                ])
              ])
            ], 64)) : (g(), k(Se, { key: 1 }, [
              a("label", GI, [
                N[81] || (N[81] = a("span", null, "服务器地址", -1)),
                De(a("input", {
                  "onUpdate:modelValue": N[34] || (N[34] = (Z) => h.url = Z)
                }, null, 512), [
                  [Ge, h.url]
                ])
              ]),
              a("label", qI, [
                N[82] || (N[82] = a("span", null, "请求头（KEY: VALUE）", -1)),
                De(a("textarea", {
                  "onUpdate:modelValue": N[35] || (N[35] = (Z) => h.headers = Z),
                  rows: "3"
                }, null, 512), [
                  [Ge, h.headers]
                ])
              ])
            ], 64)),
            a("label", YI, [
              De(a("input", {
                "onUpdate:modelValue": N[36] || (N[36] = (Z) => h.enabled = Z),
                type: "checkbox"
              }, null, 512), [
                [Rl, h.enabled]
              ]),
              N[83] || (N[83] = a("span", null, "保存后启用", -1))
            ]),
            a("button", XI, [
              se(H(zl)),
              N[84] || (N[84] = _e("保存服务"))
            ])
          ], 32))
        ], 512),
        a("dialog", {
          ref_key: "catalogDialog",
          ref: S,
          class: "yv-dialog"
        }, [
          a("header", KI, [
            a("div", null, [
              N[85] || (N[85] = a("span", { class: "yv-kicker" }, "安装预览", -1)),
              a("h2", null, T(((Et = q.value) == null ? void 0 : Et.name) || ((Wt = q.value) == null ? void 0 : Wt.id)), 1)
            ]),
            a("button", {
              class: "yv-button yv-icon-button",
              type: "button",
              title: "关闭",
              onClick: N[37] || (N[37] = (Z) => {
                var Oe;
                return (Oe = S.value) == null ? void 0 : Oe.close();
              })
            }, [
              se(H(Gt))
            ])
          ]),
          a("div", WI, [
            a("p", null, T(((zt = q.value) == null ? void 0 : zt.description) || "暂无说明"), 1),
            a("dl", ZI, [
              N[86] || (N[86] = a("dt", null, "类型", -1)),
              a("dd", null, T((F = (gn = q.value) == null ? void 0 : gn.kind) == null ? void 0 : F.toUpperCase()), 1),
              N[87] || (N[87] = a("dt", null, "版本", -1)),
              a("dd", null, T(((m = q.value) == null ? void 0 : m.version) || "未知"), 1),
              N[88] || (N[88] = a("dt", null, "来源", -1)),
              a("dd", null, T(((Le = (me = q.value) == null ? void 0 : me.source) == null ? void 0 : Le.type) || "未知"), 1)
            ]),
            a("button", {
              class: "yv-button primary",
              type: "button",
              onClick: ct
            }, [
              se(H(ko)),
              N[89] || (N[89] = _e("确认安装"))
            ])
          ])
        ], 512),
        a("dialog", {
          ref_key: "confirmDialog",
          ref: w,
          class: "yv-dialog confirm-dialog"
        }, [
          a("header", JI, [
            a("div", null, [
              N[90] || (N[90] = a("span", { class: "yv-kicker" }, "Confirm action", -1)),
              a("h2", null, T(ie.title), 1)
            ]),
            a("button", {
              class: "yv-button yv-icon-button",
              type: "button",
              title: "关闭",
              onClick: N[38] || (N[38] = (Z) => {
                var Oe;
                return (Oe = w.value) == null ? void 0 : Oe.close();
              })
            }, [
              se(H(Gt))
            ])
          ]),
          a("div", QI, [
            a("p", null, T(ie.detail), 1),
            a("div", eN, [
              a("button", {
                class: "yv-button",
                type: "button",
                onClick: N[39] || (N[39] = (Z) => {
                  var Oe;
                  return (Oe = w.value) == null ? void 0 : Oe.close();
                })
              }, "取消"),
              a("button", {
                class: "yv-button danger",
                type: "button",
                disabled: ie.busy,
                onClick: W
              }, "确认删除", 8, tN)
            ])
          ])
        ], 512)
      ]);
    };
  }
});
let zn = null;
const zp = () => document.querySelector("#extensions-app-root");
function y4(e = "#extensions-app-root") {
  if (zn) return zn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("能力扩展挂载点不存在");
  return zn = Cs(nN), zn.mount(t), zn;
}
function b4() {
  var e;
  (e = zp()) == null || e.dispatchEvent(new CustomEvent("charactoid:extensions-show"));
}
function _4() {
  var e;
  (e = zp()) == null || e.dispatchEvent(new CustomEvent("charactoid:extensions-hide"));
}
function w4() {
  zn && (zn.unmount(), zn = null);
}
const oN = /* @__PURE__ */ new Set([
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
  return oN.has(e) && Number.isFinite(n) ? `${Math.round(n * 100)}%` : typeof t == "number" && Number.isFinite(n) ? Number.isInteger(n) ? String(n) : n.toFixed(3) : String(t ?? "—");
}
function sN(e, t) {
  return t ? Math.max(0, Math.min(100, Math.round(e / t * 100))) : 0;
}
function iN(e) {
  return {
    persona_id: e.personaId,
    tier: e.tier,
    dataset_mode: e.datasetMode
  };
}
function wi(e) {
  return [...new Set(e.split(/[\n,，]+/).map((t) => t.trim()).filter(Boolean))];
}
function Fp(e) {
  return {
    question: e.question.trim(),
    expected_answer: e.expectedAnswer.trim(),
    relevant_document_ids: wi(e.documentIds),
    tags: wi(e.tags),
    difficulty: e.difficulty,
    enabled: e.enabled
  };
}
function lN(e) {
  return je(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-cases`, { cache: "no-store" });
}
function rN(e, t) {
  return je(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-cases`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Fp(t))
  });
}
function aN(e, t, n) {
  return je(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-cases/${encodeURIComponent(t)}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(Fp(n))
  });
}
async function uN(e, t) {
  await je(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-cases/${encodeURIComponent(t)}`, {
    method: "DELETE"
  });
}
function cN(e, t = "pending") {
  return je(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-candidates?status=${encodeURIComponent(t)}`, { cache: "no-store" });
}
function dN(e) {
  return je(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-candidates/sync`, { method: "POST" });
}
function fN(e) {
  const t = { note: (e.note || "").trim() };
  return e.expectedAnswer !== void 0 && (t.expected_answer = e.expectedAnswer.trim()), e.documentIds !== void 0 && (t.relevant_document_ids = wi(e.documentIds)), e.tags !== void 0 && (t.tags = wi(e.tags)), e.difficulty !== void 0 && (t.difficulty = e.difficulty), t;
}
function pN(e, t, n) {
  return je(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-candidates/${encodeURIComponent(t)}/approve`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(fN(n))
  });
}
function hN(e, t, n = "") {
  return je(`/api/knowledge-spaces/${encodeURIComponent(e)}/eval-candidates/${encodeURIComponent(t)}/reject`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ note: n.trim() })
  });
}
const vN = {
  class: "eval-dataset",
  "aria-label": "人工评测题集"
}, gN = { class: "eval-dataset-heading" }, mN = { key: 0 }, yN = { class: "eval-dataset-actions" }, bN = ["disabled"], _N = ["disabled"], wN = {
  key: 0,
  class: "eval-dataset-error"
}, kN = {
  key: 1,
  class: "eval-dataset-editor"
}, EN = { class: "eval-dataset-editor-head" }, CN = ["disabled"], SN = { class: "yv-field" }, xN = { class: "yv-field" }, $N = { class: "eval-dataset-form-grid" }, IN = { class: "yv-field" }, NN = { class: "yv-field" }, TN = { class: "yv-field" }, MN = { class: "eval-dataset-check" }, PN = { class: "eval-dataset-editor-actions" }, ON = ["disabled"], AN = ["disabled"], DN = {
  key: 2,
  class: "eval-dataset-empty"
}, RN = {
  key: 3,
  class: "eval-dataset-empty"
}, LN = {
  key: 4,
  class: "eval-dataset-empty"
}, VN = {
  key: 5,
  class: "eval-dataset-list"
}, zN = { class: "eval-dataset-row-main" }, FN = { key: 0 }, BN = { class: "eval-dataset-meta" }, HN = { key: 0 }, UN = { key: 1 }, jN = { class: "eval-dataset-row-actions" }, GN = ["disabled", "onClick"], qN = ["disabled", "onClick"], YN = /* @__PURE__ */ He({
  __name: "EvalDatasetPanel",
  props: {
    spaceId: {}
  },
  setup(e) {
    const t = e, n = te([]), o = te(!1), s = te(!1), i = te(""), l = te(!1), r = te(null), u = te(p());
    let c = 0;
    const d = ae(() => n.value.filter((O) => O.enabled !== !1).length), f = ae(() => !!r.value);
    function p() {
      return { question: "", expectedAnswer: "", documentIds: "", tags: "", difficulty: "medium", enabled: !0 };
    }
    function v(O) {
      return {
        question: O.question || "",
        expectedAnswer: O.expected_answer || "",
        documentIds: (O.relevant_document_ids || []).join(`
`),
        tags: (O.tags || []).join(", "),
        difficulty: O.difficulty || "medium",
        enabled: O.enabled !== !1
      };
    }
    function w(O) {
      return { easy: "简单", medium: "中等", hard: "困难" }[O || "medium"] || "中等";
    }
    function S() {
      r.value = null, u.value = p(), l.value = !0, i.value = "";
    }
    function P(O) {
      r.value = O.id, u.value = v(O), l.value = !0, i.value = "";
    }
    function z() {
      s.value || (l.value = !1, r.value = null);
    }
    async function L() {
      const O = ++c;
      if (!t.spaceId) {
        n.value = [], l.value = !1;
        return;
      }
      o.value = !0, i.value = "";
      try {
        const q = await lN(t.spaceId);
        O === c && (n.value = q.items || []);
      } catch (q) {
        O === c && (i.value = it(q));
      } finally {
        O === c && (o.value = !1);
      }
    }
    async function y() {
      if (!t.spaceId || !u.value.question.trim()) {
        i.value = "请填写问题";
        return;
      }
      s.value = !0, i.value = "";
      try {
        const O = r.value ? await aN(t.spaceId, r.value, u.value) : await rN(t.spaceId, u.value);
        r.value ? n.value = n.value.map((q) => q.id === O.id ? O : q) : n.value = [...n.value, O], z();
      } catch (O) {
        i.value = it(O);
      } finally {
        s.value = !1;
      }
    }
    async function C(O) {
      if (!(!t.spaceId || !window.confirm(`删除这条评测题？

${O.question}`))) {
        s.value = !0, i.value = "";
        try {
          await uN(t.spaceId, O.id), n.value = n.value.filter((q) => q.id !== O.id), r.value === O.id && z();
        } catch (q) {
          i.value = it(q);
        } finally {
          s.value = !1;
        }
      }
    }
    return ze(() => t.spaceId, L), St(L), (O, q) => (g(), k("section", vN, [
      a("header", gN, [
        a("div", null, [
          q[7] || (q[7] = a("span", { class: "yv-kicker" }, "Regression set", -1)),
          a("h2", null, [
            q[6] || (q[6] = _e("人工题集 ")),
            n.value.length ? (g(), k("small", mN, T(d.value) + "/" + T(n.value.length) + " 启用", 1)) : oe("", !0)
          ]),
          q[8] || (q[8] = a("p", null, "把真实问题留成可重复的回归样本。", -1))
        ]),
        a("div", yN, [
          a("button", {
            class: "yv-button",
            type: "button",
            disabled: o.value || s.value || !O.spaceId,
            title: "刷新题集",
            onClick: L
          }, [
            se(H(qt), {
              size: 14,
              class: ye({ "is-spinning": o.value })
            }, null, 8, ["class"]),
            q[9] || (q[9] = _e("刷新"))
          ], 8, bN),
          a("button", {
            class: "yv-button primary",
            type: "button",
            disabled: s.value || !O.spaceId,
            onClick: S
          }, [
            se(H(oo), { size: 14 }),
            q[10] || (q[10] = _e("新增题目"))
          ], 8, _N)
        ])
      ]),
      i.value ? (g(), k("p", wN, T(i.value), 1)) : oe("", !0),
      l.value ? (g(), k("div", kN, [
        a("div", EN, [
          a("strong", null, T(f.value ? "编辑题目" : "新增题目"), 1),
          a("button", {
            class: "icon-button",
            type: "button",
            title: "关闭",
            disabled: s.value,
            onClick: z
          }, [
            se(H(Gt), { size: 15 })
          ], 8, CN)
        ]),
        a("label", SN, [
          q[11] || (q[11] = a("span", null, "问题", -1)),
          De(a("textarea", {
            name: "question",
            "onUpdate:modelValue": q[0] || (q[0] = (Y) => u.value.question = Y),
            rows: "2",
            maxlength: "4000",
            placeholder: "例如：CHARACTOID 如何选择知识检索路径？"
          }, null, 512), [
            [Ge, u.value.question]
          ])
        ]),
        a("label", xN, [
          q[12] || (q[12] = a("span", null, [
            _e("预期答案 "),
            a("em", null, "可选")
          ], -1)),
          De(a("textarea", {
            name: "expected_answer",
            "onUpdate:modelValue": q[1] || (q[1] = (Y) => u.value.expectedAnswer = Y),
            rows: "3",
            maxlength: "8000",
            placeholder: "用于人工复核与后续答案对比"
          }, null, 512), [
            [Ge, u.value.expectedAnswer]
          ])
        ]),
        a("div", $N, [
          a("label", IN, [
            q[13] || (q[13] = a("span", null, [
              _e("相关资料 ID "),
              a("em", null, "每行一个，也可用逗号分隔")
            ], -1)),
            De(a("textarea", {
              "onUpdate:modelValue": q[2] || (q[2] = (Y) => u.value.documentIds = Y),
              rows: "2",
              placeholder: "上传资料列表中的 ID"
            }, null, 512), [
              [Ge, u.value.documentIds]
            ])
          ]),
          a("label", NN, [
            q[14] || (q[14] = a("span", null, [
              _e("标签 "),
              a("em", null, "用逗号分隔")
            ], -1)),
            De(a("input", {
              "onUpdate:modelValue": q[3] || (q[3] = (Y) => u.value.tags = Y),
              placeholder: "角色, RAG, 回归"
            }, null, 512), [
              [Ge, u.value.tags]
            ])
          ]),
          a("label", TN, [
            q[16] || (q[16] = a("span", null, "难度", -1)),
            De(a("select", {
              "onUpdate:modelValue": q[4] || (q[4] = (Y) => u.value.difficulty = Y)
            }, q[15] || (q[15] = [
              a("option", { value: "easy" }, "简单", -1),
              a("option", { value: "medium" }, "中等", -1),
              a("option", { value: "hard" }, "困难", -1)
            ]), 512), [
              [fn, u.value.difficulty]
            ])
          ]),
          a("label", MN, [
            De(a("input", {
              "onUpdate:modelValue": q[5] || (q[5] = (Y) => u.value.enabled = Y),
              type: "checkbox"
            }, null, 512), [
              [Rl, u.value.enabled]
            ]),
            q[17] || (q[17] = a("span", null, "加入后续评测", -1))
          ])
        ]),
        a("div", PN, [
          a("button", {
            class: "yv-button",
            type: "button",
            disabled: s.value,
            onClick: z
          }, "取消", 8, ON),
          a("button", {
            class: "yv-button primary",
            type: "button",
            disabled: s.value || !u.value.question.trim(),
            onClick: y
          }, [
            se(H(ro), { size: 14 }),
            _e(T(s.value ? "保存中" : "保存题目"), 1)
          ], 8, AN)
        ])
      ])) : oe("", !0),
      o.value && !n.value.length ? (g(), k("div", DN, "读取题集…")) : !n.value.length && !O.spaceId ? (g(), k("div", RN, "先选择一个角色")) : n.value.length ? (g(), k("div", VN, [
        (g(!0), k(Se, null, Ve(n.value, (Y) => {
          var B;
          return g(), k("article", {
            key: Y.id,
            class: ye(["eval-dataset-row", { "is-disabled": Y.enabled === !1 }])
          }, [
            a("div", zN, [
              a("strong", null, T(Y.question), 1),
              Y.expected_answer ? (g(), k("p", FN, T(Y.expected_answer), 1)) : oe("", !0),
              a("div", BN, [
                a("span", null, T(w(Y.difficulty)), 1),
                (B = Y.relevant_document_ids) != null && B.length ? (g(), k("span", HN, T(Y.relevant_document_ids.length) + " 份资料", 1)) : oe("", !0),
                (g(!0), k(Se, null, Ve(Y.tags || [], (M) => (g(), k("span", {
                  key: M,
                  class: "eval-dataset-tag"
                }, T(M), 1))), 128)),
                Y.enabled === !1 ? (g(), k("span", UN, "已停用")) : oe("", !0)
              ])
            ]),
            a("div", jN, [
              a("button", {
                class: "icon-button",
                type: "button",
                title: "编辑",
                disabled: s.value,
                onClick: (M) => P(Y)
              }, [
                se(H(Vl), { size: 15 })
              ], 8, GN),
              a("button", {
                class: "icon-button danger",
                type: "button",
                title: "删除",
                disabled: s.value,
                onClick: (M) => C(Y)
              }, [
                se(H(Gn), { size: 15 })
              ], 8, qN)
            ])
          ], 2);
        }), 128))
      ])) : (g(), k("div", LN, "还没有人工题目，先保存一条真实问题。"))
    ]));
  }
}), XN = { class: "eval-candidates" }, KN = { class: "eval-candidates-heading" }, WN = { key: 0 }, ZN = ["disabled"], JN = {
  key: 0,
  class: "eval-candidates-error"
}, QN = {
  key: 1,
  class: "eval-candidates-empty"
}, e3 = {
  key: 2,
  class: "eval-candidates-empty"
}, t3 = {
  key: 3,
  class: "eval-candidates-empty"
}, n3 = {
  key: 4,
  class: "eval-candidates-list"
}, o3 = { class: "eval-candidate-head" }, s3 = { class: "eval-candidate-source" }, i3 = { class: "eval-candidate-signals" }, l3 = { class: "eval-candidate-question" }, r3 = { class: "eval-candidate-meta" }, a3 = { class: "eval-candidate-editor" }, u3 = { class: "yv-field" }, c3 = ["onUpdate:modelValue"], d3 = { class: "eval-candidate-fields" }, f3 = { class: "yv-field" }, p3 = ["onUpdate:modelValue"], h3 = { class: "yv-field" }, v3 = ["onUpdate:modelValue"], g3 = { class: "yv-field" }, m3 = ["onUpdate:modelValue"], y3 = { class: "yv-field" }, b3 = ["onUpdate:modelValue"], _3 = { class: "eval-candidate-actions" }, w3 = ["disabled", "onClick"], k3 = ["disabled", "onClick"], E3 = /* @__PURE__ */ He({
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
    function v(L) {
      return L.source === "feedback" ? "用户反馈" : "质量信号";
    }
    function w() {
      return n.spaceId ? (l.value = !0, c.value = "", cN(n.spaceId).then((L) => {
        s.value = L.items || [], i.value = L.pending_total || s.value.length;
        for (const y of s.value) p(y);
      }).catch((L) => {
        c.value = it(L);
      }).finally(() => {
        l.value = !1;
      })) : (s.value = [], i.value = 0, Promise.resolve());
    }
    async function S() {
      if (n.spaceId) {
        r.value = !0, c.value = "";
        try {
          const L = await dN(n.spaceId);
          s.value = L.items || [], i.value = s.value.length;
          for (const y of s.value) p(y);
        } catch (L) {
          c.value = it(L);
        } finally {
          r.value = !1;
        }
      }
    }
    async function P(L) {
      if (n.spaceId) {
        u.value = L.id, c.value = "";
        try {
          await pN(n.spaceId, L.id, p(L)), s.value = s.value.filter((y) => y.id !== L.id), i.value = Math.max(0, i.value - 1), o("accepted");
        } catch (y) {
          c.value = it(y);
        } finally {
          u.value = "";
        }
      }
    }
    async function z(L) {
      if (n.spaceId) {
        u.value = L.id, c.value = "";
        try {
          await hN(n.spaceId, L.id, d[L.id].note), s.value = s.value.filter((y) => y.id !== L.id), i.value = Math.max(0, i.value - 1);
        } catch (y) {
          c.value = it(y);
        } finally {
          u.value = "";
        }
      }
    }
    return ze(() => n.spaceId, w, { immediate: !0 }), (L, y) => (g(), k("section", XN, [
      a("header", KN, [
        a("div", null, [
          y[1] || (y[1] = a("span", { class: "yv-kicker" }, "Quality loop", -1)),
          a("h2", null, [
            y[0] || (y[0] = _e("失败样本 ")),
            f.value ? (g(), k("small", WN, T(i.value) + " 条待确认", 1)) : oe("", !0)
          ]),
          y[2] || (y[2] = a("p", null, "把真实问答里的问题沉淀为人工题，确认后才会进入正式评测。", -1))
        ]),
        a("button", {
          class: "yv-button",
          type: "button",
          disabled: !f.value || r.value,
          onClick: S
        }, [
          se(H(qt), {
            size: 14,
            class: ye({ "is-spinning": r.value })
          }, null, 8, ["class"]),
          _e(T(r.value ? "扫描中" : "扫描新样本"), 1)
        ], 8, ZN)
      ]),
      c.value ? (g(), k("p", JN, T(c.value), 1)) : oe("", !0),
      f.value ? l.value && !s.value.length ? (g(), k("div", e3, "读取待确认样本…")) : s.value.length ? (g(), k("div", n3, [
        (g(!0), k(Se, null, Ve(s.value, (C) => (g(), k("article", {
          key: C.id,
          class: "eval-candidate-row"
        }, [
          a("div", o3, [
            a("div", null, [
              a("span", s3, T(v(C)), 1),
              a("small", null, "查询 " + T(C.source_query_id.slice(0, 8)), 1)
            ]),
            a("div", i3, [
              (g(!0), k(Se, null, Ve(C.signals, (O) => (g(), k("span", {
                key: O.code
              }, T(O.label), 1))), 128))
            ])
          ]),
          a("strong", l3, T(C.question), 1),
          a("div", r3, [
            a("span", null, "置信度 " + T(C.confidence.toFixed(2)), 1),
            a("span", null, T(C.grounded ? "已接地" : "未接地"), 1),
            a("span", null, T(C.useful ? "已解决" : "未解决"), 1)
          ]),
          a("div", a3, [
            a("label", u3, [
              y[3] || (y[3] = a("span", null, [
                _e("标准答案 "),
                a("em", null, "建议答案可直接修改")
              ], -1)),
              De(a("textarea", {
                "onUpdate:modelValue": (O) => d[C.id].expectedAnswer = O,
                rows: "3"
              }, null, 8, c3), [
                [Ge, d[C.id].expectedAnswer]
              ])
            ]),
            a("div", d3, [
              a("label", f3, [
                y[4] || (y[4] = a("span", null, "关联资料 ID", -1)),
                De(a("input", {
                  "onUpdate:modelValue": (O) => d[C.id].documentIds = O,
                  placeholder: "每行一个 DocumentJob ID"
                }, null, 8, p3), [
                  [Ge, d[C.id].documentIds]
                ])
              ]),
              a("label", h3, [
                y[5] || (y[5] = a("span", null, "标签", -1)),
                De(a("input", {
                  "onUpdate:modelValue": (O) => d[C.id].tags = O,
                  placeholder: "例如：反馈回流, 边界问题"
                }, null, 8, v3), [
                  [Ge, d[C.id].tags]
                ])
              ]),
              a("label", g3, [
                y[7] || (y[7] = a("span", null, "难度", -1)),
                De(a("select", {
                  "onUpdate:modelValue": (O) => d[C.id].difficulty = O
                }, y[6] || (y[6] = [
                  a("option", { value: "easy" }, "简单", -1),
                  a("option", { value: "medium" }, "中等", -1),
                  a("option", { value: "hard" }, "困难", -1)
                ]), 8, m3), [
                  [fn, d[C.id].difficulty]
                ])
              ])
            ]),
            a("label", y3, [
              y[8] || (y[8] = a("span", null, "复核备注", -1)),
              De(a("input", {
                "onUpdate:modelValue": (O) => d[C.id].note = O,
                placeholder: "可选：记录为什么收录或忽略"
              }, null, 8, b3), [
                [Ge, d[C.id].note]
              ])
            ])
          ]),
          a("div", _3, [
            a("button", {
              class: "yv-button primary",
              type: "button",
              disabled: u.value === C.id,
              onClick: (O) => P(C)
            }, [
              se(H(ro), { size: 14 }),
              y[9] || (y[9] = _e("收录为人工题"))
            ], 8, w3),
            a("button", {
              class: "yv-button",
              type: "button",
              disabled: u.value === C.id,
              onClick: (O) => z(C)
            }, [
              se(H(Gt), { size: 14 }),
              y[10] || (y[10] = _e("忽略"))
            ], 8, k3)
          ])
        ]))), 128))
      ])) : (g(), k("div", t3, "暂无待确认样本。点击“扫描新样本”读取低置信度、未接地或负反馈查询。")) : (g(), k("div", QN, "先选择一个角色。"))
    ]));
  }
}), C3 = { class: "yv-page evaluation-page" }, S3 = { class: "evaluation-hero" }, x3 = { class: "evaluation-control" }, $3 = { class: "control-fields" }, I3 = { class: "yv-field" }, N3 = ["value"], T3 = { class: "yv-field" }, M3 = { class: "yv-field" }, P3 = { class: "control-actions" }, O3 = ["disabled"], A3 = ["disabled"], D3 = ["href"], R3 = { class: "run-status" }, L3 = {
  key: 0,
  class: "results-stage"
}, V3 = { class: "metric-lead" }, z3 = { class: "metric-groups" }, F3 = {
  key: 0,
  class: "analysis-block"
}, B3 = { class: "case-section" }, H3 = { class: "case-index" }, U3 = {
  key: 1,
  class: "evaluation-empty"
}, j3 = /* @__PURE__ */ He({
  __name: "App",
  setup(e) {
    const t = te([]), n = te(""), o = te("fast"), s = te("generated"), i = ae(() => t.value.find((h) => h.id === n.value)), l = te({ state: "idle", progress: 0, total: 0 }), r = te(null), u = te(""), c = te(""), d = te(!1), f = te(!1), p = te(!1);
    let v = 0;
    const w = ae(() => ({ idle: "未运行", running: l.value.phase === "generating" ? "生成问题" : "评测中", done: "已完成", error: "失败" })[l.value.state] || l.value.state || "未运行"), S = ae(() => sN(Number(l.value.progress || 0), Number(l.value.total || 0))), P = ae(() => {
      var h;
      return ((h = r.value) == null ? void 0 : h.cases) || [];
    }), z = ae(() => p.value ? P.value : P.value.slice(0, 3)), L = ae(() => {
      var A;
      const h = ((A = r.value) == null ? void 0 : A.metrics) || {};
      return [
        { label: "Top 3 召回率", value: Us("recall_at_3_answerable", h.recall_at_3_answerable), tone: O("recall_at_3_answerable", h.recall_at_3_answerable) },
        { label: "回答接地率", value: Us("grounded_rate", h.grounded_rate), tone: O("grounded_rate", h.grounded_rate) },
        { label: "质量通过率", value: Us("accepted_rate", h.accepted_rate), tone: O("accepted_rate", h.accepted_rate) },
        { label: "P95 总延迟", value: h.p95_total_latency_ms == null ? "—" : `${Math.round(Number(h.p95_total_latency_ms))} ms`, tone: "" }
      ];
    }), y = [
      { title: "检索质量", keys: ["recall_at_3_answerable", "precision_at_3_answerable", "mrr_at_3_answerable", "hit_at_3_answerable", "cases_answerable", "mean_latency_ms", "p95_latency_ms"] },
      { title: "回答质量", keys: ["grounded_rate", "useful_rate", "accepted_rate", "answer_rate", "refusal_rate", "cases_checked", "mean_confidence", "scope_isolation_ok"] },
      { title: "行为与性能", keys: ["rewrite_rate", "correction_rate", "mean_rewrite_count", "mean_correction_count", "complex_rewrite_rate", "complex_correction_rate", "probe_refusal_rate", "cases_total", "cases_complex", "mean_total_latency_ms", "p95_total_latency_ms"] }
    ], C = { recall_at_3_answerable: "可答问题召回率 Recall@3", precision_at_3_answerable: "可答问题精确率 Precision@3", mrr_at_3_answerable: "可答问题 MRR@3", hit_at_3_answerable: "可答问题命中 Hit@3", cases_answerable: "可答用例数", mean_latency_ms: "平均检索延迟 (ms)", p95_latency_ms: "P95 检索延迟 (ms)", grounded_rate: "事实接地率", useful_rate: "问题解决率", accepted_rate: "质量通过率", answer_rate: "正常作答率", refusal_rate: "拒答率", cases_checked: "生成已检用例", mean_confidence: "平均置信度", scope_isolation_ok: "跨角色隔离校验", rewrite_rate: "查询改写触发率", correction_rate: "生成纠错触发率", mean_rewrite_count: "平均改写次数", mean_correction_count: "平均纠错次数", complex_rewrite_rate: "复杂题改写率", complex_correction_rate: "复杂题纠错率", probe_refusal_rate: "无关问题拒答率", cases_total: "用例总数", cases_complex: "复杂题数", mean_total_latency_ms: "平均整链路延迟 (ms)", p95_total_latency_ms: "P95 整链路延迟 (ms)" };
    function O(h, A) {
      if (h === "scope_isolation_ok") return A ? "good" : "bad";
      const $ = Number(A);
      return !["recall_at_3_answerable", "precision_at_3_answerable", "mrr_at_3_answerable", "hit_at_3_answerable", "grounded_rate", "useful_rate", "accepted_rate", "answer_rate", "mean_confidence"].includes(h) || !Number.isFinite($) ? "" : $ >= 0.8 ? "good" : $ <= 0.2 ? "bad" : "";
    }
    function q() {
      return l.value.phase === "generating" ? l.value.status_text || "正在从角色资料生成问题" : l.value.total > 0 ? [`已完成 ${l.value.progress}/${l.value.total} 条`, l.value.current_question_text, l.value.current_step].filter(Boolean).join(" · ") : c.value || "等待开始";
    }
    async function Y() {
      try {
        t.value = await je("/api/personas"), !n.value && t.value.length && (n.value = t.value[0].id);
      } catch (h) {
        c.value = it(h);
      }
    }
    async function B() {
      r.value = await je("/api/eval/results");
    }
    function M() {
      v += 1, d.value = !1;
    }
    async function X() {
      const h = ++v;
      d.value = !0;
      for (let A = 0; A < 1200 && h === v; A += 1) {
        try {
          if (l.value = await je("/api/eval/status"), l.value.state === "done") {
            await B(), d.value = !1;
            return;
          }
          if (l.value.state === "error") {
            c.value = l.value.error || "评测失败", d.value = !1;
            return;
          }
        } catch ($) {
          c.value = it($), d.value = !1;
          return;
        }
        await new Promise(($) => setTimeout($, 500));
      }
    }
    async function ie() {
      if (!n.value) {
        c.value = "请先选择评测角色";
        return;
      }
      c.value = "", r.value = null, u.value = "", p.value = !1;
      try {
        await je("/api/eval/run", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(iN({ personaId: n.value, tier: o.value, datasetMode: s.value })) }), await X();
      } catch (h) {
        c.value = it(h), d.value = !1;
      }
    }
    async function D() {
      f.value = !0;
      try {
        const h = await je("/api/eval/analyze", { method: "POST" });
        u.value = h.analysis || "分析结果为空";
      } catch (h) {
        c.value = it(h);
      } finally {
        f.value = !1;
      }
    }
    async function G() {
      await Y();
      try {
        l.value = await je("/api/eval/status"), l.value.state === "running" ? X() : l.value.state === "done" && await B();
      } catch {
      }
    }
    return St(() => {
      const h = document.querySelector("#evaluation-app-root");
      h == null || h.addEventListener("charactoid:evaluation-show", G), h == null || h.addEventListener("charactoid:evaluation-hide", M), G();
    }), Tn(M), (h, A) => {
      var $, V;
      return g(), k("main", C3, [
        a("header", S3, [
          A[4] || (A[4] = a("div", null, [
            a("span", { class: "yv-kicker" }, "Retrieval quality lab"),
            a("h1", null, "RAG 评测"),
            a("p", null, "用可复现指标检查召回、回答接地与整链路延迟。")
          ], -1)),
          a("span", {
            class: ye(["yv-status", l.value.state === "done" ? "ok" : l.value.state === "error" ? "error" : d.value ? "warn" : ""])
          }, T(w.value), 3)
        ]),
        a("section", x3, [
          a("div", $3, [
            a("label", I3, [
              A[6] || (A[6] = a("span", null, "评测角色", -1)),
              De(a("select", {
                "onUpdate:modelValue": A[0] || (A[0] = (U) => n.value = U)
              }, [
                A[5] || (A[5] = a("option", { value: "" }, "请选择角色", -1)),
                (g(!0), k(Se, null, Ve(t.value, (U) => (g(), k("option", {
                  key: U.id,
                  value: U.id
                }, T(U.name), 9, N3))), 128))
              ], 512), [
                [fn, n.value]
              ])
            ]),
            a("label", T3, [
              A[8] || (A[8] = a("span", null, "问题规模", -1)),
              De(a("select", {
                "onUpdate:modelValue": A[1] || (A[1] = (U) => o.value = U)
              }, A[7] || (A[7] = [
                a("option", { value: "fast" }, "轻量 · 5 个问题", -1),
                a("option", { value: "standard" }, "标准 · 10 个问题", -1),
                a("option", { value: "thorough" }, "全面 · 15 个问题", -1)
              ]), 512), [
                [fn, o.value]
              ])
            ]),
            a("label", M3, [
              A[10] || (A[10] = a("span", null, "题目来源", -1)),
              De(a("select", {
                "onUpdate:modelValue": A[2] || (A[2] = (U) => s.value = U)
              }, A[9] || (A[9] = [
                a("option", { value: "generated" }, "自动生成", -1),
                a("option", { value: "manual" }, "人工题集", -1),
                a("option", { value: "combined" }, "人工 + 自动", -1)
              ]), 512), [
                [fn, s.value]
              ])
            ])
          ]),
          a("div", P3, [
            a("button", {
              class: "yv-button primary",
              disabled: d.value,
              onClick: ie
            }, [
              se(H($r)),
              _e(T(d.value ? "评测进行中" : "生成并评测"), 1)
            ], 8, O3),
            a("button", {
              class: "yv-button",
              disabled: !r.value || f.value,
              onClick: D
            }, [
              se(H(Ig)),
              _e(T(f.value ? "分析中" : "AI 分析"), 1)
            ], 8, A3),
            a("a", {
              class: ye(["yv-button", { disabled: !r.value }]),
              href: r.value ? "/api/eval/export" : void 0
            }, [
              se(H(ko)),
              A[11] || (A[11] = _e("导出 JSON"))
            ], 10, D3)
          ])
        ]),
        se(E3, {
          "space-id": ($ = i.value) == null ? void 0 : $.knowledge_space_id
        }, null, 8, ["space-id"]),
        se(YN, {
          "space-id": (V = i.value) == null ? void 0 : V.knowledge_space_id
        }, null, 8, ["space-id"]),
        a("section", R3, [
          a("div", null, [
            a("strong", null, T(w.value), 1),
            a("p", {
              class: ye({ error: c.value })
            }, T(c.value || q()), 3)
          ]),
          a("div", {
            class: ye(["progress-track", { indeterminate: d.value && l.value.phase === "generating" }])
          }, [
            a("span", {
              style: et({ width: `${S.value}%` })
            }, null, 4)
          ], 2)
        ]),
        r.value ? (g(), k("section", L3, [
          a("div", V3, [
            (g(!0), k(Se, null, Ve(L.value, (U) => (g(), k("article", {
              key: U.label,
              class: ye(U.tone)
            }, [
              a("span", null, T(U.label), 1),
              a("strong", null, T(U.value), 1)
            ], 2))), 128))
          ]),
          a("div", z3, [
            (g(), k(Se, null, Ve(y, (U) => a("section", {
              key: U.title
            }, [
              a("h2", null, T(U.title), 1),
              a("div", null, [
                (g(!0), k(Se, null, Ve(U.keys.filter((ee) => {
                  var ce, ve;
                  return ((ce = r.value.metrics) == null ? void 0 : ce[ee]) !== void 0 && ((ve = r.value.metrics) == null ? void 0 : ve[ee]) !== null;
                }), (ee) => (g(), k("article", { key: ee }, [
                  a("span", null, T(C[ee] || ee), 1),
                  a("strong", {
                    class: ye(O(ee, r.value.metrics[ee]))
                  }, T(H(Us)(ee, r.value.metrics[ee])), 3)
                ]))), 128))
              ])
            ])), 64))
          ]),
          u.value ? (g(), k("section", F3, [
            A[12] || (A[12] = a("span", { class: "yv-kicker" }, "AI review", -1)),
            A[13] || (A[13] = a("h2", null, "结果解读", -1)),
            a("p", null, T(u.value), 1)
          ])) : oe("", !0),
          a("section", B3, [
            a("header", null, [
              A[14] || (A[14] = a("div", null, [
                a("span", { class: "yv-kicker" }, "Case evidence"),
                a("h2", null, "逐条详情")
              ], -1)),
              P.value.length > 3 ? (g(), k("button", {
                key: 0,
                class: "yv-button",
                onClick: A[3] || (A[3] = (U) => p.value = !p.value)
              }, T(p.value ? "收起" : `展开全部 ${P.value.length} 条`), 1)) : oe("", !0)
            ]),
            (g(!0), k(Se, null, Ve(z.value, (U, ee) => (g(), k("article", {
              key: ee,
              class: "case-row"
            }, [
              a("div", H3, T(String(ee + 1).padStart(2, "0")), 1),
              a("div", null, [
                a("strong", null, T(U.question), 1),
                a("p", null, T((U.answer || "").slice(0, 240)), 1),
                a("small", null, T([U.grounded == null ? "grounded=—" : `grounded=${U.grounded}`, U.useful == null ? "useful=—" : `useful=${U.useful}`, `confidence=${U.confidence ?? "—"}`, U.rewrite_used ? "查询改写" : "", U.corrected ? "生成纠错" : "", U.is_probe ? "无关探针" : ""].filter(Boolean).join(" · ")), 1)
              ]),
              a("span", {
                class: ye(["yv-status", U.accepted || U.is_probe && U.refused ? "ok" : "error"])
              }, T(U.accepted || U.is_probe && U.refused ? "符合预期" : "未通过"), 3)
            ]))), 128))
          ])
        ])) : (g(), k("section", U3, [
          se(H(gg)),
          A[15] || (A[15] = a("h2", null, "等待一轮可比较的结果", -1)),
          A[16] || (A[16] = a("p", null, "选择角色和问题规模后开始。评测会覆盖知识召回、复杂问题与无关问题拒答。", -1))
        ]))
      ]);
    };
  }
});
let Fn = null;
const Bp = () => document.querySelector("#evaluation-app-root");
function k4(e = "#evaluation-app-root") {
  if (Fn) return Fn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("RAG 评测挂载点不存在");
  return Fn = Cs(j3), Fn.mount(t), Fn;
}
function E4() {
  var e;
  (e = Bp()) == null || e.dispatchEvent(new CustomEvent("charactoid:evaluation-show"));
}
function C4() {
  var e;
  (e = Bp()) == null || e.dispatchEvent(new CustomEvent("charactoid:evaluation-hide"));
}
function S4() {
  Fn && (Fn.unmount(), Fn = null);
}
async function Is(e, t) {
  const n = await fetch(e, t), o = await n.json().catch(() => null);
  if (!n.ok) throw new Error((o == null ? void 0 : o.detail) || `请求失败 (${n.status})`);
  return o;
}
function G3() {
  return Is("/api/reranker/status", { cache: "no-store" });
}
function q3(e) {
  return Is("/api/reranker/install", {
    method: "POST",
    headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
    body: JSON.stringify({ model_id: "Qwen/Qwen3-Reranker-0.6B", source: "modelscope", device: e })
  });
}
function Y3() {
  return Is("/api/reranker/install/cancel", { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } });
}
function X3() {
  return Is("/api/reranker/model", { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } });
}
function K3() {
  return Is("/api/reranker/model-directory", { method: "POST", headers: { "X-CHARACTOID-Request": "web" } });
}
const W3 = { class: "settings-summary" }, Z3 = { class: "section-toggle-label" }, J3 = { class: "asr-resource-bar" }, Q3 = {
  key: 0,
  max: "100"
}, eT = {
  key: 1,
  class: "inline-status"
}, tT = { class: "asr-actions" }, nT = ["disabled"], oT = ["disabled"], sT = ["disabled"], iT = ["disabled"], lT = { class: "settings-grid one-column reranker-settings-grid" }, rT = { class: "field provider-field" }, aT = ["disabled"], uT = /* @__PURE__ */ He({
  __name: "RerankerSettingsApp",
  setup(e) {
    const t = te(null), n = te("auto"), o = te(!1), s = te(""), i = te(!1);
    let l;
    const r = ae(() => s.value ? "检查失败" : t.value ? t.value.installing ? "安装中" : t.value.ready ? "已就绪" : t.value.installed ? "已安装，等待加载" : "未安装" : "检查中"), u = ae(() => s.value ? s.value : t.value ? t.value.ready ? "本地精排可用；检索候选将经过语义重排序。" : t.value.installed ? "模型文件完整，将在首次检索时加载。" : "未安装时系统自动使用 RRF 融合结果，不会阻断知识检索。" : "正在读取本地模型状态"), c = ae(() => {
      var S;
      if (!((S = t.value) != null && S.installing)) return "";
      const v = t.value.phase || "准备资源";
      return `${t.value.current_file || v} · ${Math.round(t.value.elapsed_seconds || 0)} 秒`;
    });
    async function d() {
      try {
        t.value = await G3(), n.value = t.value.device || n.value, s.value = t.value.error || "";
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
    async function p() {
      if (!o.value) {
        o.value = !0, s.value = "";
        try {
          await K3();
        } catch (v) {
          s.value = v instanceof Error ? v.message : "无法打开模型目录";
        } finally {
          o.value = !1;
        }
      }
    }
    return St(() => {
      d(), l = window.setInterval(() => {
        var v;
        (v = t.value) != null && v.installing && d();
      }, 1500);
    }), Tn(() => {
      l && window.clearInterval(l);
    }), (v, w) => {
      var S, P, z, L, y, C, O;
      return g(), k("details", {
        class: "panel settings-section",
        "data-collapsible": "",
        onToggle: w[4] || (w[4] = (q) => i.value = q.currentTarget.open)
      }, [
        a("summary", W3, [
          w[5] || (w[5] = a("span", { class: "settings-summary-title" }, [
            a("strong", null, "Reranker 精排"),
            a("span", { class: "settings-summary-meta" }, "候选重排序 · 本地模型 · RRF 自动降级")
          ], -1)),
          a("span", Z3, T(i.value ? "收起" : "展开"), 1)
        ]),
        w[9] || (w[9] = a("p", { class: "settings-help" }, [
          _e("使用本地模型 "),
          a("code", null, "Qwen3-Reranker-0.6B"),
          _e(" 对召回候选精排；模型未安装或暂不可用时，系统自动保留 RRF 融合结果。")
        ], -1)),
        a("div", J3, [
          a("div", null, [
            a("strong", null, T(r.value), 1),
            a("p", {
              class: ye(["inline-status", { "is-error": !!s.value }]),
              role: "status",
              "aria-live": "polite"
            }, T(u.value), 3),
            (S = t.value) != null && S.installing ? (g(), k("progress", Q3)) : oe("", !0),
            c.value ? (g(), k("p", eT, T(c.value), 1)) : oe("", !0)
          ]),
          a("div", tT, [
            a("button", {
              class: "button button-secondary",
              type: "button",
              disabled: o.value,
              onClick: p
            }, [
              se(H(ss), { size: 16 }),
              w[6] || (w[6] = _e("打开目录"))
            ], 8, nT),
            a("button", {
              class: "button button-danger",
              type: "button",
              disabled: o.value || !((P = t.value) != null && P.installed) || ((z = t.value) == null ? void 0 : z.installing),
              onClick: w[0] || (w[0] = (q) => f(H(X3)))
            }, "删除", 8, oT),
            (L = t.value) != null && L.installing ? (g(), k("button", {
              key: 0,
              class: "button button-secondary",
              type: "button",
              disabled: o.value || t.value.cancelling,
              onClick: w[1] || (w[1] = (q) => f(H(Y3)))
            }, "取消下载", 8, sT)) : (g(), k("button", {
              key: 1,
              class: "button button-primary",
              type: "button",
              disabled: o.value || ((y = t.value) == null ? void 0 : y.installed),
              onClick: w[2] || (w[2] = (q) => f(() => H(q3)(n.value)))
            }, "安装", 8, iT))
          ])
        ]),
        a("div", lT, [
          a("label", rT, [
            w[8] || (w[8] = a("span", null, "运行设备", -1)),
            De(a("select", {
              "onUpdate:modelValue": w[3] || (w[3] = (q) => n.value = q),
              disabled: o.value || ((C = t.value) == null ? void 0 : C.installing) || ((O = t.value) == null ? void 0 : O.installed)
            }, w[7] || (w[7] = [
              a("option", { value: "auto" }, "自动（GPU 优先）", -1),
              a("option", { value: "cuda" }, "仅 GPU", -1),
              a("option", { value: "cpu" }, "仅 CPU", -1)
            ]), 8, aT), [
              [fn, n.value]
            ])
          ])
        ]),
        w[10] || (w[10] = a("details", { class: "settings-help" }, [
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
}), cT = /* @__PURE__ */ jr(uT, [["__scopeId", "data-v-bf7b6366"]]), dT = { class: "providers-settings" }, fT = {
  class: "provider-tabs",
  role: "tablist",
  "aria-label": "供应商类型"
}, pT = ["aria-selected", "onClick"], hT = {
  key: 0,
  class: "download-center",
  "aria-label": "资源下载中心"
}, vT = ["aria-expanded"], gT = { class: "download-summary-icon" }, mT = { class: "download-summary-copy" }, yT = {
  key: 1,
  class: "local-production-zone audio-workbench",
  "aria-labelledby": "local-production-title"
}, bT = {
  class: "audio-section",
  "aria-labelledby": "audio-common-title"
}, _T = { class: "production-grid audio-grid audio-grid-2" }, wT = {
  key: 0,
  class: "production-card"
}, kT = { class: "production-card-head" }, ET = {
  key: 0,
  class: "install-progress"
}, CT = { class: "install-progress-head" }, ST = { class: "production-actions" }, xT = ["disabled"], $T = { class: "production-card production-card-ffmpeg" }, IT = { class: "production-card-head" }, NT = { class: "production-facts" }, TT = {
  key: 0,
  class: "install-progress"
}, MT = { class: "install-progress-head" }, PT = {
  key: 1,
  class: "config-hint"
}, OT = { class: "production-actions" }, AT = ["disabled"], DT = {
  class: "audio-section",
  "aria-labelledby": "audio-voice-title"
}, RT = { class: "production-grid audio-grid audio-grid-2" }, LT = {
  key: 0,
  class: "production-card production-card-gsv"
}, VT = { class: "production-card-head" }, zT = { class: "production-facts" }, FT = {
  key: 0,
  class: "install-progress"
}, BT = { class: "install-progress-head" }, HT = { class: "production-actions" }, UT = ["disabled"], jT = {
  key: 1,
  class: "production-card production-card-rvc"
}, GT = { class: "production-card-head" }, qT = {
  key: 0,
  class: "install-progress"
}, YT = { class: "install-progress-head" }, XT = { class: "production-actions" }, KT = {
  class: "audio-section",
  "aria-labelledby": "audio-stt-title"
}, WT = { class: "production-grid audio-grid audio-grid-1" }, ZT = {
  key: 0,
  class: "production-card production-card-stt"
}, JT = { class: "production-card-head" }, QT = { class: "production-facts" }, eM = {
  key: 0,
  class: "install-progress"
}, tM = { class: "install-progress-head" }, nM = { class: "production-actions" }, oM = ["disabled"], sM = {
  key: 2,
  class: "providers-main"
}, iM = {
  key: 0,
  class: "loading-state"
}, lM = {
  key: 1,
  class: "error-state"
}, rM = {
  key: 2,
  class: "empty-state"
}, aM = ["onClick", "onKeydown"], uM = { class: "provider-header" }, cM = { class: "provider-title" }, dM = {
  key: 0,
  class: "mode-badge"
}, fM = {
  key: 1,
  class: "mode-badge api"
}, pM = ["aria-checked", "aria-label", "onClick", "disabled"], hM = {
  key: 1,
  class: "active-label"
}, vM = { class: "provider-description" }, gM = {
  key: 0,
  class: "provider-meta resource-meta"
}, mM = { class: "install-progress-head" }, yM = { class: "download-task-meta" }, bM = { key: 0 }, _M = { key: 1 }, wM = { key: 2 }, kM = {
  key: 3,
  class: "task-error"
}, EM = {
  key: 2,
  class: "provider-meta"
}, CM = {
  key: 3,
  class: "provider-meta"
}, SM = {
  key: 0,
  class: "meta-url"
}, xM = { class: "provider-actions" }, $M = ["onClick"], IM = ["onClick", "disabled"], NM = {
  class: "config-drawer download-drawer provider-config-drawer",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "资源下载任务"
}, TM = { class: "drawer-header" }, MM = { class: "drawer-header-actions" }, PM = { class: "drawer-body download-list" }, OM = {
  key: 0,
  class: "empty-state"
}, AM = {
  key: 1,
  class: "empty-state"
}, DM = { class: "download-task-head" }, RM = { class: "download-task-meta" }, LM = { key: 0 }, VM = { key: 1 }, zM = { key: 2 }, FM = {
  key: 3,
  class: "task-error"
}, BM = {
  key: 0,
  class: "download-task-actions"
}, HM = ["onClick"], UM = {
  key: 1,
  class: "download-task-actions"
}, jM = ["onClick"], GM = {
  class: "config-drawer rvc-workspace-drawer provider-config-drawer",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "RVC 音频生产资源管理"
}, qM = { class: "drawer-header" }, YM = { class: "drawer-body rvc-workspace-body" }, XM = { class: "rvc-workspace-summary" }, KM = {
  class: "rvc-component-list",
  "aria-label": "RVC 资源状态"
}, WM = { class: "rvc-component-icon" }, ZM = { key: 1 }, JM = { class: "rvc-component-copy" }, QM = { class: "rvc-install-block" }, e5 = { class: "production-actions" }, t5 = ["disabled"], n5 = ["disabled"], o5 = ["disabled"], s5 = ["disabled"], i5 = {
  key: 0,
  class: "config-error"
}, l5 = {
  key: 1,
  class: "config-error"
}, r5 = {
  class: "config-drawer provider-config-drawer",
  role: "dialog",
  "aria-modal": "true",
  "aria-label": "FFmpeg 资源管理"
}, a5 = { class: "drawer-header" }, u5 = { class: "drawer-body" }, c5 = { class: "drawer-status" }, d5 = { class: "resource-config-readonly" }, f5 = { class: "production-facts" }, p5 = {
  key: 0,
  class: "install-progress"
}, h5 = { class: "install-progress-head" }, v5 = { class: "resource-control-actions" }, g5 = ["disabled"], m5 = ["disabled"], y5 = ["disabled"], b5 = ["disabled"], _5 = {
  key: 1,
  class: "config-error"
}, w5 = ["aria-label"], k5 = { class: "drawer-header" }, E5 = { class: "drawer-body" }, C5 = { class: "drawer-status" }, S5 = {
  key: 0,
  class: "field"
}, x5 = {
  key: 1,
  class: "field"
}, $5 = {
  key: 2,
  class: "resource-config-readonly"
}, I5 = {
  key: 0,
  class: "field"
}, N5 = { class: "field" }, T5 = ["placeholder"], M5 = { class: "field" }, P5 = ["placeholder"], O5 = { class: "resource-config-intro" }, A5 = {
  key: 0,
  class: "config-hint"
}, D5 = { class: "field" }, R5 = ["placeholder"], L5 = { class: "form-row" }, V5 = { class: "field" }, z5 = { class: "field" }, F5 = {
  key: 1,
  class: "resource-install-form"
}, B5 = {
  key: 2,
  class: "resource-config-readonly"
}, H5 = {
  key: 3,
  class: "resource-config-readonly"
}, U5 = { class: "resource-controls" }, j5 = {
  key: 0,
  class: "install-progress"
}, G5 = { class: "install-progress-head" }, q5 = { class: "download-task-meta" }, Y5 = { key: 0 }, X5 = { key: 1 }, K5 = { key: 2 }, W5 = {
  key: 3,
  class: "task-error"
}, Z5 = { class: "resource-control-actions" }, J5 = ["disabled"], Q5 = ["disabled"], e4 = ["disabled"], t4 = ["disabled"], n4 = ["disabled"], o4 = ["disabled"], s4 = {
  key: 3,
  class: "config-hint"
}, i4 = { class: "modal-actions" }, l4 = ["disabled"], r4 = {
  key: 4,
  class: "config-success"
}, a4 = {
  key: 6,
  class: "config-error"
}, Cl = "https://huggingface.co/lj1995/GPT-SoVITS-windows-package/resolve/main/GPT-SoVITS-v3lora-20250228.7z?download=true", u4 = /* @__PURE__ */ He({
  __name: "ProvidersApp",
  setup(e) {
    const t = te([]), n = te("llm"), o = te(!1), s = te(""), i = te(null), l = te(null), r = te(null), u = te(""), c = te(""), d = te({}), f = te(Cl), p = te([]), v = te(!1), w = te(!1), S = te(!1), P = te(!1), z = te(""), L = /* @__PURE__ */ new Set(), y = te(!1);
    let C;
    const O = te({
      provider_type: "",
      provider_id: "",
      api_key: "",
      base_url: "",
      model: "",
      source: "modelscope",
      device: "auto",
      enabled: !1
    }), q = [
      { id: "llm", label: "对话模型(LLM)", count: 0 },
      { id: "embedding", label: "知识库向量化(Embedding)", count: 0 },
      { id: "reranker", label: "检索重排(Rerank)", count: 0 },
      { id: "stt", label: "语音识别(STT)", count: 0 },
      { id: "tts", label: "对话语音(TTS)", count: 0 },
      { id: "web_search", label: "联网搜索(Web)", count: 0 },
      { id: "audio", label: "音频(Audio)", count: 0 }
    ], Y = ae(() => t.value.filter((F) => F.type === n.value)), B = ae(() => t.value.find((F) => F.id === "rvc")), M = ae(() => t.value.find((F) => F.id === "separator")), X = ae(() => t.value.find((F) => F.id === "local_stt")), ie = ae(() => t.value.find((F) => F.id === "gsv_tts_local")), D = te({}), G = ae(() => t.value.find((F) => F.id === i.value)), h = ae(() => !!(i.value || v.value || w.value || S.value));
    ze(h, (F) => {
      document.body.classList.toggle("provider-modal-open", F), document.documentElement.classList.toggle("provider-modal-open", F);
    }), ze(n, (F) => {
      F === "audio" && Ee("detect");
    });
    const A = ae(() => {
      var m;
      const F = (m = G.value) == null ? void 0 : m.id;
      return F === "local_embedding" ? "embedding" : F === "local_rerank" ? "reranker" : F === "local_stt" ? "stt" : F === "gsv_tts_local" ? "gpt_sovits" : F === "separator" ? "separator" : "none";
    });
    function $() {
      switch (A.value) {
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
    const V = {
      local_embedding: { status: "/api/embedding/status", install: "/api/embedding/install", cancel: "/api/embedding/install/cancel", remove: "/api/embedding/model", directory: "/api/embedding/model-directory" },
      local_rerank: { status: "/api/reranker/status", install: "/api/reranker/install", cancel: "/api/reranker/install/cancel", remove: "/api/reranker/model", directory: "/api/reranker/model-directory" },
      local_stt: { status: "/api/stt/status", install: "/api/stt/install", cancel: "/api/stt/install/cancel", remove: "/api/stt/install", directory: "/api/stt/model-directory" },
      gsv_tts_local: { status: "/api/gpt-sovits/status", install: "/api/gpt-sovits/install", cancel: "/api/gpt-sovits/install/cancel", remove: "/api/gpt-sovits/install", directory: "/api/gpt-sovits/model-directory", start: "/api/gpt-sovits/service/start", stop: "/api/gpt-sovits/service/stop" },
      // RVC 是音色转换资源，不计入 TTS 供应商数量；后端未实现时由抽屉显示可读错误。
      rvc: { status: "/api/providers/rvc/status", install: "/api/providers/rvc/install", cancel: "/api/providers/rvc/install/cancel", remove: "/api/providers/rvc/install", directory: "/api/providers/rvc/directory" },
      separator: { status: "/api/providers/resources/separator", install: "/api/providers/resources/separator/install", cancel: "/api/providers/resources/tasks", remove: "/api/providers/resources/separator", directory: "/api/providers/resources/separator" }
    };
    function U(F) {
      return ["queued", "preparing", "downloading", "verifying", "installing", "running"].includes(F.status);
    }
    const ee = ae(() => p.value.filter(U)), ce = ae(() => p.value.filter((F) => !U(F)).length);
    function ve(F) {
      if (!F || F < 1024) return `${F || 0} B`;
      const m = ["KB", "MB", "GB", "TB"];
      let me = F, Le = -1;
      do
        me /= 1024, Le++;
      while (me >= 1024 && Le < m.length - 1);
      return `${me.toFixed(me >= 100 ? 0 : me >= 10 ? 1 : 2)} ${m[Le]}`;
    }
    function re(F) {
      return F == null || F < 0 ? "—" : F < 60 ? `${Math.round(F)} 秒` : `${Math.floor(F / 60)} 分 ${Math.round(F % 60)} 秒`;
    }
    function be(F) {
      return { queued: "排队中", preparing: "准备中", downloading: "下载中", verifying: "校验中", installing: "安装中", ready: "已完成", failed: "失败", cancelled: "已取消", running: "运行中", interrupted: "已中断" }[F.status] || F.status;
    }
    function pe(F) {
      const m = {
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
      return F ? m[F] || F : "";
    }
    async function de() {
      y.value = !0;
      try {
        const F = await fetch("/api/resources/tasks?limit=30", { headers: { "X-CHARACTOID-Request": "web" }, cache: "no-store" });
        if (!F.ok) return;
        const m = await F.json(), me = Array.isArray(m) ? m : m.tasks || m.items || [];
        p.value = me.map((Le) => ({
          ...Le,
          progress_percent: Le.progress_percent ?? (typeof Le.progress == "number" ? Le.progress : null),
          error_message: Le.error_message ?? Le.error,
          current_file: Le.current_file ?? Le.detail
        }));
      } catch {
      } finally {
        y.value = !1;
      }
    }
    async function Ie(F) {
      try {
        await fetch(`/api/resources/tasks/${encodeURIComponent(F.task_id)}`, { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } }), await de();
      } catch (m) {
        s.value = m instanceof Error ? m.message : "取消下载失败";
      }
    }
    async function Me() {
      try {
        const F = await fetch("/api/resources/tasks?finished=true", { method: "DELETE", headers: { "X-CHARACTOID-Request": "web" } });
        if (!F.ok) {
          const m = await F.json().catch(() => ({}));
          throw new Error(m.detail || `HTTP ${F.status}`);
        }
        await de();
      } catch (F) {
        s.value = F instanceof Error ? F.message : "清理下载记录失败";
      }
    }
    async function ne(F) {
      try {
        const m = await fetch(`/api/resources/tasks/${encodeURIComponent(F.task_id)}/retry`, { method: "POST", headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" } });
        if (!m.ok) {
          const me = await m.json().catch(() => ({}));
          throw new Error(me.detail || `HTTP ${m.status}`);
        }
        await de();
      } catch (m) {
        s.value = m instanceof Error ? m.message : "重试下载失败";
      }
    }
    async function xe() {
      try {
        const F = await fetch("/api/providers/resources/ffmpeg/status", { headers: { "X-CHARACTOID-Request": "web" }, cache: "no-store" });
        F.ok && (D.value = await F.json());
      } catch {
      }
    }
    async function Ee(F) {
      const m = { install: "/api/providers/resources/ffmpeg/install", remove: "/api/providers/resources/ffmpeg", directory: "/api/providers/resources/ffmpeg/directory", detect: "/api/providers/resources/ffmpeg/detect" };
      r.value = `ffmpeg:${F}`, s.value = "", F === "detect" && (P.value = !0);
      try {
        const me = await fetch(m[F], { method: F === "remove" ? "DELETE" : F === "directory" ? "GET" : "POST", headers: { "X-CHARACTOID-Request": "web" } });
        if (!me.ok) {
          const Le = await me.json().catch(() => ({}));
          throw new Error(Le.detail || `HTTP ${me.status}`);
        }
        D.value = await me.json(), z.value = String(D.value.detection_note || "");
      } catch (me) {
        s.value = me instanceof Error ? me.message : "FFmpeg 操作失败";
      } finally {
        r.value = null, F === "detect" && (P.value = !1);
      }
    }
    async function ke(F) {
      const m = !!(F && typeof F == "object" && "quiet" in F && F.quiet);
      m || (o.value = !0, s.value = "");
      try {
        const me = await fetch("/api/providers/list", { cache: "no-store" });
        if (!me.ok) throw new Error(`HTTP ${me.status}`);
        const Le = await me.json();
        t.value = Le.providers || [], await xe(), q.forEach((Z) => {
          Z.count = t.value.filter((Oe) => Oe.type === Z.id).length;
        });
      } catch (me) {
        m || (s.value = me instanceof Error ? me.message : "加载失败");
      } finally {
        m || (o.value = !1);
      }
    }
    function I() {
      i.value = null, v.value = !1, w.value = !1, S.value = !1;
    }
    function R() {
      I(), v.value = !0;
    }
    function b() {
      I(), S.value = !0, z.value = "", Ee("detect");
    }
    function _(F) {
      if (I(), F.id === "rvc") {
        w.value = !0, ke();
        return;
      }
      i.value = F.id, u.value = "", c.value = "", s.value = "";
      const m = F.resource_status || {};
      let me = F.current_model || "";
      (F.id === "local_embedding" || F.id === "local_rerank") && !String(me).includes("/") ? me = String(m.model_id || F.default_model || "") : me || (me = String(m.model_id || F.default_model || "")), O.value = {
        provider_type: F.type,
        provider_id: F.id,
        api_key: F.current_api_key || "",
        base_url: F.current_base_url || F.default_base_url,
        model: me,
        source: String(m.source || "modelscope"),
        device: String(m.device || "auto"),
        enabled: F.is_active
      }, f.value = Cl;
    }
    function E() {
      w.value = !1, s.value = "";
    }
    function x(F) {
      var me, Le;
      const m = (Le = (me = B.value) == null ? void 0 : me.resource_status) == null ? void 0 : Le.components;
      return (m == null ? void 0 : m[F]) || {};
    }
    function j(F) {
      return !!x(F).ready;
    }
    function K(F) {
      return j(F) ? "已就绪" : F === "indices" ? "可选" : "待准备";
    }
    function J() {
      var m, me;
      const F = ct(qe(B.value));
      return F ?? xt((me = (m = B.value) == null ? void 0 : m.resource_status) == null ? void 0 : me.progress_percent);
    }
    function W() {
      i.value = null, u.value = "", c.value = "", f.value = "", O.value = { provider_type: "", provider_id: "", api_key: "", base_url: "", model: "", source: "modelscope", device: "auto", enabled: !1 }, f.value = Cl;
    }
    async function fe() {
      if (O.value.provider_id) {
        O.value.enabled = !0, o.value = !0, s.value = "", u.value = "";
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
          const m = await F.json();
          u.value = m.message || "配置已保存", await ke();
        } catch (F) {
          s.value = F instanceof Error ? F.message : "配置失败";
        } finally {
          o.value = !1;
        }
      }
    }
    function ue() {
      switch (A.value) {
        case "embedding":
        case "reranker":
          return { model_id: O.value.model, source: O.value.source || "modelscope", device: O.value.device || "auto" };
        case "gpt_sovits":
          return { url: f.value.trim() };
        default:
          return {};
      }
    }
    function ge() {
      var m;
      const F = { ...O.value };
      return ((m = G.value) == null ? void 0 : m.mode) === "local" && (["embedding", "reranker"].includes(A.value) || (delete F.model, delete F.source, delete F.device), delete F.api_key, delete F.base_url), F;
    }
    async function he(F, m) {
      if (!F) return;
      const me = V[F.id], Le = me == null ? void 0 : me[m];
      if (Le) {
        r.value = `${F.id}:${m}`, s.value = "";
        try {
          const Z = m === "remove" || m === "cancel" ? "DELETE" : m === "directory" && F.id === "rvc" ? "GET" : m === "install" || m === "directory" || m === "start" || m === "stop" ? "POST" : "GET";
          let Oe;
          m === "install" && (Oe = F.id === "gsv_tts_local" ? JSON.stringify({ url: f.value.trim() }) : F.id === "local_stt" ? void 0 : JSON.stringify(ue()));
          let we;
          if (m === "install" && F.mode === "local") {
            const ft = `/api/resources/${encodeURIComponent(F.id)}/install`;
            we = await fetch(ft, { method: "POST", headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body: JSON.stringify({ parameters: F.id === "gsv_tts_local" ? { url: f.value.trim() } : ue() }) }), (we.status === 404 || we.status === 405) && (we = await fetch(Le, { method: Z, headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body: Oe }));
          } else
            we = await fetch(Le, { method: Z, headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" }, body: Oe });
          if (!we.ok) {
            const ft = await we.json().catch(() => ({}));
            throw new Error(ft.detail || `HTTP ${we.status}`);
          }
          m === "install" && ["local_stt", "gsv_tts_local", "local_embedding", "local_rerank"].includes(F.id) && L.add(F.id), await ke(), await de(), await zt();
        } catch (Z) {
          s.value = Z instanceof Error ? Z.message : "资源操作失败";
        } finally {
          r.value = null;
        }
      }
    }
    async function Te(F) {
      var m, me;
      o.value = !0, s.value = "";
      try {
        const Le = await fetch("/api/providers/configure", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
          body: JSON.stringify({ provider_type: F.type, provider_id: F.id, api_key: F.current_api_key, base_url: F.current_base_url || F.default_base_url, model: F.current_model || F.default_model, source: (m = F.resource_status) == null ? void 0 : m.source, device: (me = F.resource_status) == null ? void 0 : me.device, enabled: !F.is_active })
        });
        if (!Le.ok) {
          const Z = await Le.json().catch(() => ({}));
          throw new Error(Z.detail || `HTTP ${Le.status}`);
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
        const m = await fetch("/api/providers/test", {
          method: "POST",
          headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
          body: JSON.stringify({ provider_type: F.type, provider_id: F.id, api_key: F.current_api_key, base_url: F.current_base_url, model: F.current_model })
        });
        if (!m.ok) {
          const Oe = await m.json().catch(() => ({}));
          throw new Error(Oe.detail || `HTTP ${m.status}`);
        }
        const me = await m.json(), Le = !!me.ok, Z = Le ? `成功${me.latency_ms ? ` · ${me.latency_ms} ms` : ""}` : `失败 · ${me.message || "未通过"}`;
        d.value = { ...d.value, [F.id]: { ok: Le, message: Z } }, c.value = Z;
      } catch (m) {
        const me = `失败 · ${m instanceof Error ? m.message : "网络错误"}`;
        d.value = { ...d.value, [F.id]: { ok: !1, message: me } }, c.value = me;
      } finally {
        l.value = null;
      }
    }
    function Ae(F) {
      var me;
      if (!F) return !1;
      const m = F.resource_status || {};
      return !!(m.ready || m.service_running || m.installed || (me = m.install) != null && me.installed);
    }
    function st(F) {
      var me;
      if (!F) return !1;
      const m = F.resource_status || {};
      return !!(m.installing || (me = m.install) != null && me.installing);
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
    function Vt(F, m) {
      const me = mt[m] || [m];
      return me.includes(F.provider_id) || me.includes(String(F.resource_kind || ""));
    }
    function Mt(F) {
      const m = p.value.filter((me) => Vt(me, F));
      return m.find(U) || m[0] || null;
    }
    function qe(F) {
      return F ? Mt(F.id) : null;
    }
    function ut(F) {
      if (!F) return !1;
      const m = qe(F);
      return st(F) || !!(m && U(m));
    }
    function yt(F) {
      const m = qe(F);
      return !!(m && U(m));
    }
    function xt(F) {
      return typeof F != "number" || !Number.isFinite(F) ? null : Math.min(100, Math.max(0, F));
    }
    function ct(F) {
      return xt(F == null ? void 0 : F.progress_percent);
    }
    function dt(F) {
      var me;
      if (!F) return null;
      const m = ct(qe(F));
      return m ?? xt((me = F.resource_status) == null ? void 0 : me.progress_percent);
    }
    function Bt(F) {
      return F == null ? "进行中" : `${Math.round(F)}%`;
    }
    function Ht(F, m = !0) {
      return { "task-progress": !0, active: m, determinate: m && F != null, indeterminate: m && F == null };
    }
    function Ut(F) {
      return F == null ? void 0 : { width: `${F}%` };
    }
    function on() {
      return Mt("ffmpeg");
    }
    function le() {
      const F = on();
      return !!(F && U(F) || r.value === "ffmpeg:install");
    }
    function N() {
      const F = on();
      return F ? be(F) : "安装中";
    }
    function Pe(F) {
      var me, Le, Z, Oe;
      const m = qe(F);
      if (m && U(m)) {
        const we = m.progress_percent == null ? "" : ` ${Math.round(Number(m.progress_percent) || 0)}%`;
        return `${be(m)}${we}${pe(m.phase) ? ` · ${pe(m.phase)}` : ""}`;
      }
      if (st(F)) {
        const we = (me = F.resource_status) == null ? void 0 : me.progress_percent;
        return `安装中${typeof we == "number" ? ` ${Math.round(we)}%` : ""}${pe(String(((Le = F.resource_status) == null ? void 0 : Le.phase) || "")) ? ` · ${pe(String(((Z = F.resource_status) == null ? void 0 : Z.phase) || ""))}` : ""}`;
      }
      return F.id === "gsv_tts_local" && ((Oe = F.resource_status) != null && Oe.service_running) ? "服务运行中" : Ae(F) ? "资源就绪" : "未安装";
    }
    function We() {
      return !!(D.value.installed || D.value.ready || D.value.cache_available || D.value.system_path);
    }
    function Et() {
      return le() ? N() : D.value.installed ? "托管副本已就绪" : D.value.system_path ? "已检测到系统 FFmpeg" : D.value.cache_available ? "已检测到本地缓存" : D.value.detected ? "已检测到" : "未检测到";
    }
    function Wt(F) {
      const m = F.resource_status || {};
      return F.id === "local_stt" ? Ae(F) ? String(m.model_id || m.resolved_model || "Qwen3-ASR-0.6B") : "未安装本地识别" : F.id === "gsv_tts_local" ? m.service_running ? `本地服务运行中 · 端口 ${m.api_port || "9880"}` : Ae(F) ? "GPT-SoVITS 已安装" : "未安装本地引擎" : Ae(F) ? String(m.model_id || "资源就绪") : String(m.model_id || "尚未安装资源");
    }
    async function zt() {
      const F = [...L];
      if (F.length) {
        for (const m of F) {
          const me = t.value.find((Z) => Z.id === m);
          if (!me || !Ae(me)) continue;
          if (me.is_active) {
            L.delete(m);
            continue;
          }
          (await fetch("/api/providers/configure", {
            method: "POST",
            headers: { "Content-Type": "application/json", "X-CHARACTOID-Request": "web" },
            body: JSON.stringify({ provider_type: me.type, provider_id: me.id, enabled: !0 })
          })).ok && L.delete(m);
        }
        F.some((m) => !L.has(m)) && await ke({ quiet: !0 });
      }
    }
    function gn(F) {
      F.key === "Escape" && (i.value ? W() : v.value ? v.value = !1 : w.value ? E() : S.value && (S.value = !1));
    }
    return St(() => {
      ke(), de(), C = window.setInterval(() => {
        de(), xe(), (n.value === "audio" || ee.value.length || t.value.some((F) => st(F))) && ke({ quiet: !0 }).then(() => zt());
      }, 2500), window.addEventListener("keydown", gn);
    }), Tn(() => {
      document.body.classList.remove("provider-modal-open"), document.documentElement.classList.remove("provider-modal-open"), C && window.clearInterval(C), window.removeEventListener("keydown", gn);
    }), (F, m) => {
      var me, Le, Z, Oe, we, ft, Pt, Gr, qr, Yr, Xr, Kr, Wr, Zr, Jr, Qr, ea, ta, na, oa, sa, ia, la, ra, aa, ua, ca, da, fa, pa, ha, va, ga, ma, ya, ba, _a, wa, ka, Ea, Ca, Sa, xa, $a;
      return g(), k("div", dT, [
        a("nav", fT, [
          (g(), k(Se, null, Ve(q, (Q) => a("button", {
            key: Q.id,
            class: ye(["tab-button", { active: n.value === Q.id }]),
            role: "tab",
            "aria-selected": n.value === Q.id,
            onClick: (Fo) => n.value = Q.id
          }, [
            a("span", null, T(Q.label), 1)
          ], 10, pT)), 64))
        ]),
        ee.value.length || n.value === "audio" ? (g(), k("section", hT, [
          a("button", {
            class: "download-summary",
            type: "button",
            onClick: R,
            "aria-expanded": v.value
          }, [
            a("span", gT, [
              se(H(ko), {
                size: 16,
                class: ye({ spin: ee.value.length > 0 })
              }, null, 8, ["class"])
            ]),
            a("span", mT, [
              a("strong", null, T(ee.value.length ? `正在处理 ${ee.value.length} 个资源` : "资源任务中心"), 1),
              a("span", null, T(ee.value[0] ? `${ee.value[0].resource_name || ee.value[0].provider_id} · ${be(ee.value[0])}` : "查看最近的安装、校验与失败记录"), 1)
            ]),
            ee.value[0] ? (g(), k("span", {
              key: 0,
              class: ye(["download-summary-progress", { active: !0, determinate: ct(ee.value[0]) != null, indeterminate: ct(ee.value[0]) == null }])
            }, [
              a("b", null, T(Bt(ct(ee.value[0]))), 1),
              a("i", null, [
                a("em", {
                  style: et(Ut(ct(ee.value[0])))
                }, null, 4)
              ])
            ], 2)) : oe("", !0),
            m[35] || (m[35] = a("span", { class: "download-summary-arrow" }, "查看详情 →", -1))
          ], 8, vT)
        ])) : oe("", !0),
        n.value === "audio" ? (g(), k("section", yT, [
          m[56] || (m[56] = a("div", { class: "section-heading" }, [
            a("div", null, [
              a("span", { class: "section-label" }, "AUDIO WORKBENCH"),
              a("h3", { id: "local-production-title" }, "本地音频工作台")
            ]),
            a("span", { class: "section-note" }, "通用资源给各音频能力共用。GPT-SoVITS 装好后会出现在「对话语音(TTS)」；本地识别装好后会出现在「语音识别(STT)」。FFmpeg 用检测查看本机是否已有，不会开始下载。")
          ], -1)),
          a("section", bT, [
            m[43] || (m[43] = a("div", { class: "audio-section-head" }, [
              a("h4", { id: "audio-common-title" }, "通用资源"),
              a("span", null, "人声分离与 FFmpeg，供各音频能力共用")
            ], -1)),
            a("div", _T, [
              M.value ? (g(), k("article", wT, [
                a("div", kT, [
                  m[36] || (m[36] = a("div", null, [
                    a("span", { class: "production-kicker" }, "PREP"),
                    a("h3", null, "人声分离")
                  ], -1)),
                  a("span", {
                    class: ye(["status-chip", { on: (me = M.value.resource_status) == null ? void 0 : me.ready }])
                  }, T((Le = M.value.resource_status) != null && Le.ready ? "已就绪" : ut(M.value) ? Pe(M.value) : "未准备"), 3)
                ]),
                m[38] || (m[38] = a("p", null, "切片和音频生产共用的 HT-Demucs 前处理模型。", -1)),
                ut(M.value) ? (g(), k("div", ET, [
                  a("div", CT, [
                    a("strong", null, T(Pe(M.value)), 1),
                    a("b", null, T(Bt(dt(M.value))), 1)
                  ]),
                  a("div", {
                    class: ye(Ht(dt(M.value)))
                  }, [
                    a("i", {
                      style: et(Ut(dt(M.value)))
                    }, null, 4)
                  ], 2)
                ])) : oe("", !0),
                a("div", ST, [
                  a("button", {
                    class: "button button-primary",
                    type: "button",
                    onClick: m[0] || (m[0] = (Q) => _(M.value))
                  }, [
                    se(H(bo), { size: 15 }),
                    m[37] || (m[37] = _e("管理"))
                  ]),
                  ut(M.value) ? (g(), k("button", {
                    key: 0,
                    class: "button button-secondary",
                    type: "button",
                    onClick: m[1] || (m[1] = (Q) => he(M.value, "cancel")),
                    disabled: r.value !== null
                  }, "取消", 8, xT)) : oe("", !0)
                ])
              ])) : oe("", !0),
              a("article", $T, [
                a("div", IT, [
                  m[39] || (m[39] = a("div", null, [
                    a("span", { class: "production-kicker" }, "FFMPEG"),
                    a("h3", null, "FFmpeg")
                  ], -1)),
                  a("span", {
                    class: ye(["status-chip", { on: We() }])
                  }, T(Et()), 3)
                ]),
                m[42] || (m[42] = a("p", null, "音视频前处理运行时。点检测即可确认托管副本、系统 PATH 或本地缓存，不必先点下载。", -1)),
                a("div", NT, [
                  a("span", null, "托管副本：" + T(D.value.installed ? "已存在" : "未安装"), 1),
                  a("span", null, "系统/缓存：" + T(D.value.system_path ? "PATH 已找到" : D.value.cache_available ? "本地缓存已找到" : "未找到"), 1)
                ]),
                le() ? (g(), k("div", TT, [
                  a("div", MT, [
                    a("strong", null, T(N()), 1),
                    a("b", null, T(Bt(ct(on()))), 1)
                  ]),
                  a("div", {
                    class: ye(Ht(ct(on())))
                  }, [
                    a("i", {
                      style: et(Ut(ct(on())))
                    }, null, 4)
                  ], 2)
                ])) : oe("", !0),
                z.value ? (g(), k("p", PT, T(z.value), 1)) : oe("", !0),
                a("div", OT, [
                  a("button", {
                    class: "button button-secondary",
                    type: "button",
                    onClick: m[2] || (m[2] = (Q) => Ee("detect")),
                    disabled: P.value || r.value !== null
                  }, [
                    se(H(qt), {
                      size: 15,
                      class: ye({ spin: P.value })
                    }, null, 8, ["class"]),
                    m[40] || (m[40] = _e("检测"))
                  ], 8, AT),
                  a("button", {
                    class: "button button-primary",
                    type: "button",
                    onClick: b
                  }, [
                    se(H(bo), { size: 15 }),
                    m[41] || (m[41] = _e("管理"))
                  ])
                ])
              ])
            ])
          ]),
          a("section", DT, [
            m[50] || (m[50] = a("div", { class: "audio-section-head" }, [
              a("h4", { id: "audio-voice-title" }, "音色引擎"),
              a("span", null, "GPT-SoVITS 与 RVC 并列，分别服务对话合成和音频变声")
            ], -1)),
            a("div", RT, [
              ie.value ? (g(), k("article", LT, [
                a("div", VT, [
                  m[44] || (m[44] = a("div", null, [
                    a("span", { class: "production-kicker" }, "GPT-SOVITS"),
                    a("h3", null, "对话音色引擎")
                  ], -1)),
                  a("span", {
                    class: ye(["status-chip", { on: ((Z = ie.value.resource_status) == null ? void 0 : Z.service_running) || Ae(ie.value) }])
                  }, T(Pe(ie.value)), 3)
                ]),
                m[46] || (m[46] = a("p", null, "角色对话和声音训练共用的本地引擎。安装后会出现在「对话语音(TTS)」页。", -1)),
                a("div", zT, [
                  a("span", null, "安装包：" + T(Ae(ie.value) || (Oe = ie.value.resource_status) != null && Oe.installed ? "已就绪" : "未安装"), 1),
                  a("span", null, "服务：" + T((we = ie.value.resource_status) != null && we.service_running ? "运行中" : "未启动"), 1)
                ]),
                ut(ie.value) ? (g(), k("div", FT, [
                  a("div", BT, [
                    a("strong", null, T(Pe(ie.value)), 1),
                    a("b", null, T(Bt(dt(ie.value))), 1)
                  ]),
                  a("div", {
                    class: ye(Ht(dt(ie.value)))
                  }, [
                    a("i", {
                      style: et(Ut(dt(ie.value)))
                    }, null, 4)
                  ], 2)
                ])) : oe("", !0),
                a("div", HT, [
                  a("button", {
                    class: "button button-primary",
                    type: "button",
                    onClick: m[3] || (m[3] = (Q) => _(ie.value))
                  }, [
                    se(H(bo), { size: 15 }),
                    m[45] || (m[45] = _e("管理"))
                  ]),
                  ut(ie.value) ? (g(), k("button", {
                    key: 0,
                    class: "button button-secondary",
                    type: "button",
                    onClick: m[4] || (m[4] = (Q) => he(ie.value, "cancel")),
                    disabled: r.value !== null
                  }, "取消", 8, UT)) : oe("", !0)
                ])
              ])) : oe("", !0),
              B.value ? (g(), k("article", jT, [
                a("div", GT, [
                  m[47] || (m[47] = a("div", null, [
                    a("span", { class: "production-kicker" }, "RVC"),
                    a("h3", null, "变声生产")
                  ], -1)),
                  a("span", {
                    class: ye(["status-chip", { on: (ft = B.value.resource_status) == null ? void 0 : ft.ready }])
                  }, T((Pt = B.value.resource_status) != null && Pt.ready ? "已就绪" : ut(B.value) ? Pe(B.value) : "未准备"), 3)
                ]),
                m[49] || (m[49] = a("p", null, "音频到音频变声运行时，不参与角色对话 TTS。", -1)),
                ut(B.value) ? (g(), k("div", qT, [
                  a("div", YT, [
                    a("strong", null, T(Pe(B.value)), 1),
                    a("b", null, T(Bt(dt(B.value))), 1)
                  ]),
                  a("div", {
                    class: ye(Ht(dt(B.value)))
                  }, [
                    a("i", {
                      style: et(Ut(dt(B.value)))
                    }, null, 4)
                  ], 2)
                ])) : oe("", !0),
                a("div", XT, [
                  a("button", {
                    class: "button button-primary",
                    type: "button",
                    onClick: m[5] || (m[5] = (Q) => _(B.value))
                  }, [
                    se(H(bo), { size: 15 }),
                    m[48] || (m[48] = _e("管理"))
                  ])
                ])
              ])) : oe("", !0)
            ])
          ]),
          a("section", KT, [
            m[55] || (m[55] = a("div", { class: "audio-section-head" }, [
              a("h4", { id: "audio-stt-title" }, "本地语音识别"),
              a("span", null, "安装后同步到「语音识别(STT)」页")
            ], -1)),
            a("div", WT, [
              X.value ? (g(), k("article", ZT, [
                a("div", JT, [
                  m[51] || (m[51] = a("div", null, [
                    a("span", { class: "production-kicker" }, "LOCAL STT"),
                    a("h3", null, "本地语音识别")
                  ], -1)),
                  a("span", {
                    class: ye(["status-chip", { on: Ae(X.value) }])
                  }, T(Pe(X.value)), 3)
                ]),
                m[54] || (m[54] = a("p", null, "Qwen3-ASR 给对话识别和 GPT-SoVITS 标注共用。安装后会出现在「语音识别(STT)」页。", -1)),
                a("div", QT, [
                  a("span", null, "模型：" + T(Wt(X.value)), 1),
                  m[52] || (m[52] = a("span", null, "依赖：FFmpeg", -1))
                ]),
                ut(X.value) ? (g(), k("div", eM, [
                  a("div", tM, [
                    a("strong", null, T(Pe(X.value)), 1),
                    a("b", null, T(Bt(dt(X.value))), 1)
                  ]),
                  a("div", {
                    class: ye(Ht(dt(X.value)))
                  }, [
                    a("i", {
                      style: et(Ut(dt(X.value)))
                    }, null, 4)
                  ], 2)
                ])) : oe("", !0),
                a("div", nM, [
                  a("button", {
                    class: "button button-primary",
                    type: "button",
                    onClick: m[6] || (m[6] = (Q) => _(X.value))
                  }, [
                    se(H(bo), { size: 15 }),
                    m[53] || (m[53] = _e("管理"))
                  ]),
                  ut(X.value) ? (g(), k("button", {
                    key: 0,
                    class: "button button-secondary",
                    type: "button",
                    onClick: m[7] || (m[7] = (Q) => he(X.value, "cancel")),
                    disabled: r.value !== null
                  }, "取消", 8, oM)) : oe("", !0)
                ])
              ])) : oe("", !0)
            ])
          ])
        ])) : oe("", !0),
        n.value !== "audio" ? (g(), k("main", sM, [
          o.value && t.value.length === 0 ? (g(), k("div", iM, [
            se(H(qt), {
              size: 22,
              class: "spin"
            }),
            m[57] || (m[57] = a("p", null, "加载中...", -1))
          ])) : s.value && t.value.length === 0 ? (g(), k("div", lM, [
            se(H(Gt), { size: 22 }),
            a("p", null, T(s.value), 1),
            a("button", {
              class: "button button-primary",
              onClick: ke
            }, "重试")
          ])) : Y.value.length === 0 ? (g(), k("div", rM, m[58] || (m[58] = [
            a("p", null, "这个分类暂时没有可用供应商。", -1)
          ]))) : (g(), k("div", {
            key: 3,
            class: ye(["providers-grid", { compact: n.value === "llm" }])
          }, [
            (g(!0), k(Se, null, Ve(Y.value, (Q) => {
              var Fo, Ia, Na, Ta, Ma, Pa, Oa, Aa, Da, Ra, La, Va, za, Fa;
              return g(), k("article", {
                key: Q.type + ":" + Q.id,
                class: ye(["provider-card", { configured: Q.is_configured, active: Q.is_active, local: Q.mode === "local" }]),
                tabindex: "0",
                onClick: (Bo) => _(Q),
                onKeydown: [
                  wu((Bo) => _(Q), ["enter"]),
                  wu($t((Bo) => _(Q), ["prevent"]), ["space"])
                ]
              }, [
                a("div", uM, [
                  a("div", cM, [
                    a("span", {
                      class: ye(["provider-mark", { local: Q.mode === "local" }])
                    }, null, 2),
                    a("h3", null, T(Q.name), 1),
                    Q.mode === "local" ? (g(), k("span", dM, "本地")) : (g(), k("span", fM, "API"))
                  ]),
                  Q.runtime_supported ? (g(), k("button", {
                    key: 0,
                    class: ye(["provider-switch", { on: Q.is_active }]),
                    type: "button",
                    role: "switch",
                    "aria-checked": Q.is_active,
                    "aria-label": `${Q.is_active ? "停用" : "启用"} ${Q.name}`,
                    onClick: $t((Bo) => Te(Q), ["stop"]),
                    disabled: o.value
                  }, m[59] || (m[59] = [
                    a("span", null, null, -1)
                  ]), 10, pM)) : (g(), k("span", hM, "仅配置"))
                ]),
                a("p", vM, T(Q.description), 1),
                Q.mode === "local" ? (g(), k("div", gM, [
                  m[60] || (m[60] = a("span", { class: "meta-label" }, "本地配置", -1)),
                  a("strong", null, T(Pe(Q)), 1),
                  a("code", null, T(Wt(Q)), 1)
                ])) : oe("", !0),
                Q.mode === "local" && ut(Q) ? (g(), k("div", {
                  key: 1,
                  class: "install-progress",
                  onClick: m[8] || (m[8] = $t(() => {
                  }, ["stop"]))
                }, [
                  a("div", mM, [
                    a("strong", null, T(Pe(Q)), 1),
                    a("b", null, T(Bt(dt(Q))), 1)
                  ]),
                  a("div", {
                    class: ye(Ht(dt(Q)))
                  }, [
                    a("i", {
                      style: et(Ut(dt(Q)))
                    }, null, 4)
                  ], 2),
                  a("div", yM, [
                    (Fo = qe(Q)) != null && Fo.current_file ? (g(), k("span", bM, "当前文件：" + T((Ia = qe(Q)) == null ? void 0 : Ia.current_file), 1)) : oe("", !0),
                    (Na = qe(Q)) != null && Na.total_bytes ? (g(), k("span", _M, T(ve((Ta = qe(Q)) == null ? void 0 : Ta.downloaded_bytes)) + " / " + T(ve((Ma = qe(Q)) == null ? void 0 : Ma.total_bytes)), 1)) : oe("", !0),
                    yt(Q) ? (g(), k("span", wM, "速度 " + T(ve((Pa = qe(Q)) == null ? void 0 : Pa.speed_bytes_per_second)) + "/秒 · 剩余 " + T(re((Oa = qe(Q)) == null ? void 0 : Oa.eta_seconds)), 1)) : oe("", !0),
                    (Aa = qe(Q)) != null && Aa.error_message || (Da = Q.resource_status) != null && Da.error ? (g(), k("span", kM, T(((Ra = qe(Q)) == null ? void 0 : Ra.error_message) || ((La = Q.resource_status) == null ? void 0 : La.error)), 1)) : oe("", !0)
                  ])
                ])) : Q.type === "web_search" ? (g(), k("div", EM, [
                  m[61] || (m[61] = a("span", { class: "meta-label" }, "搜索服务", -1)),
                  a("code", null, T(Q.name), 1),
                  a("span", null, T(Q.current_api_key ? "API Key 已配置" : "需要 API Key"), 1)
                ])) : Q.mode !== "local" ? (g(), k("div", CM, [
                  m[62] || (m[62] = a("span", { class: "meta-label" }, "当前模型", -1)),
                  a("code", null, T(Q.current_model || Q.default_model || "按接口默认"), 1),
                  Q.current_base_url ? (g(), k("span", SM, T(Q.current_base_url), 1)) : oe("", !0)
                ])) : oe("", !0),
                a("footer", xM, [
                  a("button", {
                    class: "button button-secondary",
                    type: "button",
                    onClick: $t((Bo) => _(Q), ["stop"])
                  }, [
                    se(H(bo), { size: 15 }),
                    m[63] || (m[63] = _e("配置"))
                  ], 8, $M),
                  Q.mode === "api" && Q.is_configured && Q.runtime_supported ? (g(), k("button", {
                    key: 0,
                    class: ye(["button button-test", { "is-success": (Va = d.value[Q.id]) == null ? void 0 : Va.ok, "is-error": d.value[Q.id] && !d.value[Q.id].ok }]),
                    type: "button",
                    onClick: $t((Bo) => Be(Q), ["stop"]),
                    disabled: l.value === Q.id
                  }, [
                    l.value === Q.id ? (g(), ht(H(qt), {
                      key: 0,
                      size: 15,
                      class: "spin"
                    })) : (za = d.value[Q.id]) != null && za.ok ? (g(), ht(H(ro), {
                      key: 1,
                      size: 15
                    })) : d.value[Q.id] ? (g(), ht(H(Gt), {
                      key: 2,
                      size: 15
                    })) : oe("", !0),
                    _e(T(l.value === Q.id ? "测试中" : ((Fa = d.value[Q.id]) == null ? void 0 : Fa.message) || "测试连接"), 1)
                  ], 10, IM)) : oe("", !0)
                ])
              ], 42, aM);
            }), 128))
          ], 2))
        ])) : oe("", !0),
        (g(), ht(zh, { to: "body" }, [
          v.value ? (g(), k("div", {
            key: 0,
            class: "drawer-overlay provider-config-overlay",
            onClick: m[10] || (m[10] = $t((Q) => v.value = !1, ["self"]))
          }, [
            a("aside", NM, [
              a("div", TM, [
                m[64] || (m[64] = a("div", null, [
                  a("p", { class: "eyebrow" }, "RESOURCE TASKS"),
                  a("h3", null, "下载中心"),
                  a("p", null, "安装、校验和失败记录都会留在这里。音频页会常驻入口，方便查看 GPT-SoVITS 与语音识别的下载进度。")
                ], -1)),
                a("div", MM, [
                  ce.value ? (g(), k("button", {
                    key: 0,
                    class: "button button-quiet",
                    type: "button",
                    onClick: Me
                  }, "清理已结束")) : oe("", !0),
                  a("button", {
                    class: "modal-close",
                    type: "button",
                    onClick: m[9] || (m[9] = (Q) => v.value = !1),
                    "aria-label": "关闭下载中心"
                  }, [
                    se(H(Gt), { size: 18 })
                  ])
                ])
              ]),
              a("div", PM, [
                y.value && !p.value.length ? (g(), k("p", OM, "加载任务中…")) : p.value.length ? oe("", !0) : (g(), k("p", AM, "暂无资源任务")),
                (g(!0), k(Se, null, Ve(p.value, (Q) => (g(), k("article", {
                  key: Q.task_id,
                  class: ye(["download-task", `task-${Q.status}`])
                }, [
                  a("div", DM, [
                    a("div", null, [
                      a("strong", null, T(Q.resource_name || Q.provider_id), 1),
                      a("span", null, [
                        _e(T(be(Q)), 1),
                        pe(Q.phase) ? (g(), k(Se, { key: 0 }, [
                          _e(" · " + T(pe(Q.phase)), 1)
                        ], 64)) : oe("", !0)
                      ])
                    ]),
                    a("b", null, T(U(Q) ? Bt(ct(Q)) : Q.progress_percent == null ? "—" : `${Math.round(Q.progress_percent)}%`), 1)
                  ]),
                  a("div", {
                    class: ye(Ht(ct(Q), U(Q)))
                  }, [
                    a("i", {
                      style: et(Ut(ct(Q)))
                    }, null, 4)
                  ], 2),
                  a("div", RM, [
                    Q.current_file ? (g(), k("span", LM, "当前文件：" + T(Q.current_file), 1)) : oe("", !0),
                    Q.total_bytes ? (g(), k("span", VM, T(ve(Q.downloaded_bytes)) + " / " + T(ve(Q.total_bytes)), 1)) : oe("", !0),
                    U(Q) ? (g(), k("span", zM, "速度 " + T(ve(Q.speed_bytes_per_second)) + "/秒 · 剩余 " + T(re(Q.eta_seconds)), 1)) : oe("", !0),
                    Q.error_message ? (g(), k("span", FM, T(Q.error_message), 1)) : oe("", !0)
                  ]),
                  U(Q) ? (g(), k("div", BM, [
                    a("button", {
                      class: "button button-secondary",
                      type: "button",
                      onClick: (Fo) => Ie(Q)
                    }, "取消", 8, HM)
                  ])) : Q.status === "failed" ? (g(), k("div", UM, [
                    a("button", {
                      class: "button button-secondary",
                      type: "button",
                      onClick: (Fo) => ne(Q)
                    }, [
                      se(H(qt), { size: 14 }),
                      m[65] || (m[65] = _e("重试"))
                    ], 8, jM)
                  ])) : oe("", !0)
                ], 2))), 128))
              ])
            ])
          ])) : oe("", !0),
          w.value && B.value ? (g(), k("div", {
            key: 1,
            class: "drawer-overlay provider-config-overlay",
            onClick: $t(E, ["self"])
          }, [
            a("aside", GM, [
              a("div", qM, [
                m[66] || (m[66] = a("div", null, [
                  a("p", { class: "eyebrow" }, "LOCAL AUDIO PRODUCTION / RVC"),
                  a("h3", null, "RVC 音频生产"),
                  a("p", null, "只管理 RVC 音频到音频推理所需的运行时和模型，不参与角色对话或 TTS。")
                ], -1)),
                a("button", {
                  class: "modal-close",
                  type: "button",
                  onClick: E,
                  "aria-label": "关闭 RVC 管理"
                }, [
                  se(H(Gt), { size: 18 })
                ])
              ]),
              a("div", YM, [
                a("div", XM, [
                  a("div", null, [
                    m[67] || (m[67] = a("span", { class: "section-label" }, "推理可用性", -1)),
                    a("strong", null, T((Gr = B.value.resource_status) != null && Gr.ready ? "可以开始生成变声音频" : "还需要补完资源"), 1)
                  ]),
                  a("span", {
                    class: ye(["status-chip", { on: (qr = B.value.resource_status) == null ? void 0 : qr.ready }])
                  }, T((Yr = B.value.resource_status) != null && Yr.ready ? "READY" : "INCOMPLETE"), 3)
                ]),
                a("div", KM, [
                  (g(), k(Se, null, Ve([{ key: "source", title: "CHARACTOID 内置 RVC 核心", detail: "项目内置推理核心" }, { key: "runtime", title: "独立 Python 运行时", detail: "CHARACTOID/runtime/rvc" }, { key: "hubert", title: "Hubert 特征模型", detail: "用于音频特征提取" }, { key: "rmvpe", title: "RMVPE 音高模型", detail: "用于 F0 提取" }], (Q) => a("div", {
                    key: Q.key,
                    class: "rvc-component-row"
                  }, [
                    a("div", WM, [
                      j(Q.key) ? (g(), ht(H(ro), {
                        key: 0,
                        size: 16
                      })) : (g(), k("span", ZM, "·"))
                    ]),
                    a("div", JM, [
                      a("strong", null, T(Q.title), 1),
                      a("span", null, T(Q.detail), 1)
                    ]),
                    a("b", {
                      class: ye({ ready: j(Q.key) })
                    }, T(K(Q.key)), 3)
                  ])), 64))
                ]),
                a("div", QM, [
                  a("div", null, [
                    a("strong", null, T((Xr = B.value.resource_status) != null && Xr.installing ? "正在准备 RVC 运行时" : "补完推理环境"), 1),
                    a("p", null, T(((Kr = B.value.resource_status) == null ? void 0 : Kr.detail) || ((Wr = B.value.resource_status) == null ? void 0 : Wr.note)), 1)
                  ]),
                  (Zr = B.value.resource_status) != null && Zr.installing || ut(B.value) ? (g(), k("div", {
                    key: 0,
                    class: ye(["rvc-progress", { active: !0, determinate: J() != null, indeterminate: J() == null }])
                  }, [
                    a("span", null, T(Bt(J())), 1),
                    a("i", null, [
                      a("em", {
                        style: et(Ut(J()))
                      }, null, 4)
                    ])
                  ], 2)) : oe("", !0),
                  a("div", e5, [
                    (Jr = B.value.resource_status) != null && Jr.installing ? (g(), k("button", {
                      key: 0,
                      class: "button button-secondary",
                      type: "button",
                      onClick: m[11] || (m[11] = (Q) => he(B.value, "cancel")),
                      disabled: r.value !== null
                    }, "取消准备", 8, t5)) : (Qr = B.value.resource_status) != null && Qr.ready ? oe("", !0) : (g(), k("button", {
                      key: 1,
                      class: "button button-primary",
                      type: "button",
                      onClick: m[12] || (m[12] = (Q) => he(B.value, "install")),
                      disabled: r.value !== null
                    }, [
                      se(H(ko), { size: 15 }),
                      m[68] || (m[68] = _e("准备运行时与基础模型"))
                    ], 8, n5)),
                    (ea = B.value.resource_status) != null && ea.ready ? (g(), k("button", {
                      key: 2,
                      class: "button button-secondary",
                      type: "button",
                      onClick: m[13] || (m[13] = (Q) => he(B.value, "remove")),
                      disabled: r.value !== null
                    }, [
                      se(H(Gn), { size: 15 }),
                      m[69] || (m[69] = _e("移除 CHARACTOID 运行时"))
                    ], 8, o5)) : oe("", !0),
                    a("button", {
                      class: "button button-secondary",
                      type: "button",
                      onClick: m[14] || (m[14] = (Q) => he(B.value, "directory")),
                      disabled: r.value !== null
                    }, [
                      se(H(ss), { size: 15 }),
                      m[70] || (m[70] = _e("查看资源目录"))
                    ], 8, s5)
                  ])
                ]),
                (ta = B.value.resource_status) != null && ta.error ? (g(), k("p", i5, T(B.value.resource_status.error), 1)) : oe("", !0),
                s.value ? (g(), k("p", l5, T(s.value), 1)) : oe("", !0),
                m[71] || (m[71] = a("div", { class: "rvc-workspace-note" }, [
                  a("strong", null, "下一步"),
                  a("span", null, "将自己的 .pth 音色模型放入受管的 weights 目录；.index 文件不是必需项。完成后到独立的“RVC”页面上传音频并生成文件。")
                ], -1))
              ])
            ])
          ])) : oe("", !0),
          S.value ? (g(), k("div", {
            key: 2,
            class: "drawer-overlay provider-config-overlay",
            onClick: m[20] || (m[20] = $t((Q) => S.value = !1, ["self"]))
          }, [
            a("aside", r5, [
              a("div", a5, [
                m[72] || (m[72] = a("div", null, [
                  a("p", { class: "eyebrow" }, "RUNTIME"),
                  a("h3", null, "FFmpeg"),
                  a("p", null, "检测只查找本机已有的托管副本、系统 PATH 和 imageio 缓存，不会开始下载。")
                ], -1)),
                a("button", {
                  class: "modal-close",
                  type: "button",
                  onClick: m[15] || (m[15] = (Q) => S.value = !1),
                  "aria-label": "关闭 FFmpeg 管理"
                }, [
                  se(H(Gt), { size: 18 })
                ])
              ]),
              a("div", u5, [
                a("div", c5, [
                  a("span", {
                    class: ye(["status-chip", { on: We() }])
                  }, T(Et()), 3),
                  a("span", null, T(D.value.path || "尚未找到可执行文件"), 1)
                ]),
                a("div", d5, [
                  m[73] || (m[73] = a("span", null, "检测结果", -1)),
                  a("strong", null, T(z.value || "点击检测以刷新本机状态"), 1)
                ]),
                a("div", f5, [
                  a("span", null, "托管：" + T(D.value.installed ? "已安装" : "无"), 1),
                  a("span", null, "系统：" + T(D.value.system_path ? "已找到" : "无"), 1),
                  a("span", null, "缓存：" + T(D.value.cache_available ? "已找到" : "无"), 1)
                ]),
                le() ? (g(), k("div", p5, [
                  a("div", h5, [
                    a("strong", null, T(N()), 1),
                    a("b", null, T(Bt(ct(on()))), 1)
                  ]),
                  a("div", {
                    class: ye(Ht(ct(on())))
                  }, [
                    a("i", {
                      style: et(Ut(ct(on())))
                    }, null, 4)
                  ], 2)
                ])) : oe("", !0),
                a("div", v5, [
                  a("button", {
                    class: "button button-secondary",
                    type: "button",
                    onClick: m[16] || (m[16] = (Q) => Ee("detect")),
                    disabled: P.value || r.value !== null
                  }, [
                    se(H(qt), {
                      size: 15,
                      class: ye({ spin: P.value })
                    }, null, 8, ["class"]),
                    m[74] || (m[74] = _e("检测"))
                  ], 8, g5),
                  D.value.installed ? (g(), k("button", {
                    key: 1,
                    class: "button button-secondary",
                    type: "button",
                    onClick: m[18] || (m[18] = (Q) => Ee("remove")),
                    disabled: r.value !== null
                  }, [
                    se(H(Gn), { size: 15 }),
                    m[75] || (m[75] = _e("移除托管副本"))
                  ], 8, y5)) : (g(), k("button", {
                    key: 0,
                    class: "button button-primary",
                    type: "button",
                    onClick: m[17] || (m[17] = (Q) => Ee("install")),
                    disabled: r.value !== null
                  }, [
                    se(H(ko), { size: 15 }),
                    _e(T(D.value.cache_available || D.value.system_path ? "安装托管副本" : "下载 FFmpeg"), 1)
                  ], 8, m5)),
                  a("button", {
                    class: "button button-secondary",
                    type: "button",
                    onClick: m[19] || (m[19] = (Q) => Ee("directory")),
                    disabled: r.value !== null
                  }, [
                    se(H(ss), { size: 15 }),
                    m[76] || (m[76] = _e("打开目录"))
                  ], 8, b5)
                ]),
                s.value ? (g(), k("p", _5, T(s.value), 1)) : oe("", !0)
              ])
            ])
          ])) : oe("", !0),
          i.value ? (g(), k("div", {
            key: 3,
            class: "drawer-overlay provider-config-overlay",
            onClick: $t(W, ["self"])
          }, [
            a("aside", {
              class: "config-drawer provider-config-drawer",
              role: "dialog",
              "aria-modal": "true",
              "aria-label": `配置 ${((na = G.value) == null ? void 0 : na.name) || "供应商"}`
            }, [
              a("div", k5, [
                a("div", null, [
                  m[77] || (m[77] = a("p", { class: "eyebrow" }, "CONFIGURE", -1)),
                  a("h3", null, T((oa = G.value) == null ? void 0 : oa.name), 1),
                  a("p", null, T((sa = G.value) == null ? void 0 : sa.description), 1)
                ]),
                a("button", {
                  class: "modal-close",
                  type: "button",
                  onClick: W,
                  "aria-label": "关闭配置"
                }, [
                  se(H(Gt), { size: 18 })
                ])
              ]),
              a("div", E5, [
                a("div", C5, [
                  a("span", {
                    class: ye(["status-chip", { on: (ia = G.value) == null ? void 0 : ia.is_active }])
                  }, T((la = G.value) != null && la.is_active ? "当前启用" : (ra = G.value) != null && ra.runtime_supported ? "可用" : "仅保存配置"), 3),
                  a("span", null, T(((aa = G.value) == null ? void 0 : aa.mode) === "local" ? "本地资源" : "API 接口"), 1)
                ]),
                a("form", {
                  onSubmit: $t(fe, ["prevent"]),
                  class: "config-form"
                }, [
                  ((ua = G.value) == null ? void 0 : ua.mode) === "api" && ((ca = G.value) == null ? void 0 : ca.type) === "web_search" ? (g(), k(Se, { key: 0 }, [
                    m[81] || (m[81] = a("div", { class: "resource-config-intro" }, [
                      a("span", { class: "meta-label" }, "搜索服务"),
                      a("p", { class: "config-hint" }, "为 Agent 提供实时互联网检索能力，不是模型配置。")
                    ], -1)),
                    G.value.requires_api_key ? (g(), k("label", S5, [
                      m[78] || (m[78] = a("span", null, [
                        _e("搜索服务 API Key "),
                        a("span", { class: "required" }, "*")
                      ], -1)),
                      De(a("input", {
                        type: "password",
                        "onUpdate:modelValue": m[21] || (m[21] = (Q) => O.value.api_key = Q),
                        placeholder: "输入搜索服务 API Key",
                        required: "",
                        autocomplete: "off"
                      }, null, 512), [
                        [Ge, O.value.api_key]
                      ])
                    ])) : oe("", !0),
                    G.value.id === "custom_search" ? (g(), k("label", x5, [
                      m[79] || (m[79] = a("span", null, "搜索接口地址", -1)),
                      De(a("input", {
                        type: "url",
                        "onUpdate:modelValue": m[22] || (m[22] = (Q) => O.value.base_url = Q),
                        placeholder: "https://your-search-endpoint"
                      }, null, 512), [
                        [Ge, O.value.base_url]
                      ])
                    ])) : (g(), k("div", $5, [
                      m[80] || (m[80] = a("span", null, "接口地址", -1)),
                      a("strong", null, T(G.value.id === "tavily" ? "Tavily 官方服务" : "博查官方服务"), 1)
                    ]))
                  ], 64)) : ((da = G.value) == null ? void 0 : da.mode) === "api" ? (g(), k(Se, { key: 1 }, [
                    G.value.requires_api_key ? (g(), k("label", I5, [
                      m[82] || (m[82] = a("span", null, [
                        _e("API Key "),
                        a("span", { class: "required" }, "*")
                      ], -1)),
                      De(a("input", {
                        type: "password",
                        "onUpdate:modelValue": m[23] || (m[23] = (Q) => O.value.api_key = Q),
                        placeholder: "输入 API Key",
                        required: "",
                        autocomplete: "off"
                      }, null, 512), [
                        [Ge, O.value.api_key]
                      ])
                    ])) : oe("", !0),
                    a("label", N5, [
                      m[83] || (m[83] = a("span", null, "服务接口地址", -1)),
                      De(a("input", {
                        type: "url",
                        "onUpdate:modelValue": m[24] || (m[24] = (Q) => O.value.base_url = Q),
                        placeholder: G.value.default_base_url
                      }, null, 8, T5), [
                        [Ge, O.value.base_url]
                      ])
                    ]),
                    a("label", M5, [
                      m[84] || (m[84] = a("span", null, "模型名称", -1)),
                      De(a("input", {
                        type: "text",
                        "onUpdate:modelValue": m[25] || (m[25] = (Q) => O.value.model = Q),
                        placeholder: G.value.default_model
                      }, null, 8, P5), [
                        [Ge, O.value.model]
                      ])
                    ])
                  ], 64)) : (g(), k(Se, { key: 2 }, [
                    a("div", O5, [
                      m[85] || (m[85] = a("span", { class: "meta-label" }, "资源配置", -1)),
                      $() ? (g(), k("p", A5, T($()), 1)) : oe("", !0)
                    ]),
                    A.value === "embedding" || A.value === "reranker" ? (g(), k(Se, { key: 0 }, [
                      a("label", D5, [
                        a("span", null, T(A.value === "embedding" ? "向量模型 ID" : "精排模型 ID"), 1),
                        De(a("input", {
                          type: "text",
                          "onUpdate:modelValue": m[26] || (m[26] = (Q) => O.value.model = Q),
                          placeholder: (fa = G.value) == null ? void 0 : fa.default_model
                        }, null, 8, R5), [
                          [Ge, O.value.model]
                        ])
                      ]),
                      a("div", L5, [
                        a("label", V5, [
                          m[87] || (m[87] = a("span", null, "模型来源", -1)),
                          De(a("select", {
                            "onUpdate:modelValue": m[27] || (m[27] = (Q) => O.value.source = Q)
                          }, m[86] || (m[86] = [
                            a("option", { value: "modelscope" }, "ModelScope", -1),
                            a("option", { value: "huggingface" }, "Hugging Face", -1)
                          ]), 512), [
                            [fn, O.value.source]
                          ])
                        ]),
                        a("label", z5, [
                          m[89] || (m[89] = a("span", null, "运行设备", -1)),
                          De(a("select", {
                            "onUpdate:modelValue": m[28] || (m[28] = (Q) => O.value.device = Q)
                          }, m[88] || (m[88] = [
                            a("option", { value: "auto" }, "自动（GPU 优先）", -1),
                            a("option", { value: "cuda" }, "CUDA", -1),
                            a("option", { value: "cpu" }, "CPU", -1)
                          ]), 512), [
                            [fn, O.value.device]
                          ])
                        ])
                      ])
                    ], 64)) : A.value === "gpt_sovits" ? (g(), k("div", F5, m[90] || (m[90] = [
                      a("div", { class: "resource-config-readonly" }, [
                        a("span", null, "固定运行环境"),
                        a("strong", null, "GPT-SoVITS v3lora Windows 整合包"),
                        a("small", null, "应用内置下载源 · Hugging Face · 约 8 GB · 服务按需启动")
                      ], -1)
                    ]))) : A.value === "stt" ? (g(), k("div", B5, m[91] || (m[91] = [
                      a("span", null, "固定资源清单", -1),
                      a("strong", null, "Qwen3-ASR-0.6B + FFmpeg", -1)
                    ]))) : A.value === "separator" ? (g(), k("div", H5, m[92] || (m[92] = [
                      a("span", null, "固定资源", -1),
                      a("strong", null, "HT-Demucs 人声分离模型 · 约 165 MB", -1)
                    ]))) : oe("", !0),
                    a("div", U5, [
                      a("div", null, [
                        m[93] || (m[93] = a("span", { class: "meta-label" }, "资源状态", -1)),
                        a("strong", null, T(G.value ? Pe(G.value) : "未知"), 1)
                      ]),
                      G.value && ut(G.value) ? (g(), k("div", j5, [
                        a("div", G5, [
                          a("strong", null, T(Pe(G.value)), 1),
                          a("b", null, T(Bt(dt(G.value))), 1)
                        ]),
                        a("div", {
                          class: ye(Ht(dt(G.value)))
                        }, [
                          a("i", {
                            style: et(Ut(dt(G.value)))
                          }, null, 4)
                        ], 2),
                        a("div", q5, [
                          (pa = qe(G.value)) != null && pa.current_file ? (g(), k("span", Y5, "当前文件：" + T((ha = qe(G.value)) == null ? void 0 : ha.current_file), 1)) : oe("", !0),
                          (va = qe(G.value)) != null && va.total_bytes ? (g(), k("span", X5, T(ve((ga = qe(G.value)) == null ? void 0 : ga.downloaded_bytes)) + " / " + T(ve((ma = qe(G.value)) == null ? void 0 : ma.total_bytes)), 1)) : oe("", !0),
                          yt(G.value) ? (g(), k("span", K5, "速度 " + T(ve((ya = qe(G.value)) == null ? void 0 : ya.speed_bytes_per_second)) + "/秒 · 剩余 " + T(re((ba = qe(G.value)) == null ? void 0 : ba.eta_seconds)), 1)) : oe("", !0),
                          (_a = qe(G.value)) != null && _a.error_message || (wa = G.value.resource_status) != null && wa.error ? (g(), k("span", W5, T(((ka = qe(G.value)) == null ? void 0 : ka.error_message) || ((Ea = G.value.resource_status) == null ? void 0 : Ea.error)), 1)) : oe("", !0)
                        ])
                      ])) : oe("", !0),
                      a("div", Z5, [
                        st(G.value) ? (g(), k("button", {
                          key: 0,
                          type: "button",
                          class: "button button-secondary",
                          onClick: m[29] || (m[29] = (Q) => he(G.value, "cancel")),
                          disabled: r.value !== null
                        }, "取消安装", 8, J5)) : Ae(G.value) ? oe("", !0) : (g(), k("button", {
                          key: 1,
                          type: "button",
                          class: "button button-primary",
                          onClick: m[30] || (m[30] = (Q) => he(G.value, "install")),
                          disabled: r.value !== null || ((Ca = G.value) == null ? void 0 : Ca.id) === "gsv_tts_local" && !f.value
                        }, [
                          se(H(ko), { size: 15 }),
                          m[94] || (m[94] = _e(" 安装运行环境"))
                        ], 8, Q5)),
                        Ae(G.value) ? (g(), k("button", {
                          key: 2,
                          type: "button",
                          class: "button button-secondary",
                          onClick: m[31] || (m[31] = (Q) => he(G.value, "remove")),
                          disabled: r.value !== null
                        }, [
                          se(H(Gn), { size: 15 }),
                          m[95] || (m[95] = _e(" 删除"))
                        ], 8, e4)) : oe("", !0),
                        a("button", {
                          type: "button",
                          class: "button button-secondary",
                          onClick: m[32] || (m[32] = (Q) => he(G.value, "directory")),
                          disabled: r.value !== null
                        }, [
                          se(H(ss), { size: 15 }),
                          m[96] || (m[96] = _e(" 打开目录"))
                        ], 8, t4),
                        ((Sa = G.value) == null ? void 0 : Sa.id) === "gsv_tts_local" && ((xa = G.value.resource_status) != null && xa.service_running) ? (g(), k("button", {
                          key: 3,
                          type: "button",
                          class: "button button-secondary",
                          onClick: m[33] || (m[33] = (Q) => he(G.value, "stop")),
                          disabled: r.value !== null
                        }, "停止服务", 8, n4)) : (($a = G.value) == null ? void 0 : $a.id) === "gsv_tts_local" && Ae(G.value) ? (g(), k("button", {
                          key: 4,
                          type: "button",
                          class: "button button-primary",
                          onClick: m[34] || (m[34] = (Q) => he(G.value, "start")),
                          disabled: r.value !== null
                        }, [
                          se(H(Ll), { size: 15 }),
                          m[97] || (m[97] = _e(" 启动服务"))
                        ], 8, o4)) : oe("", !0)
                      ])
                    ])
                  ], 64)),
                  G.value && !G.value.runtime_supported ? (g(), k("p", s4, "当前运行时还没有这个 Provider 的适配器，因此这里只保存配置，不会自动调用。")) : oe("", !0),
                  a("div", i4, [
                    a("button", {
                      type: "button",
                      class: "button button-secondary",
                      onClick: W
                    }, "取消"),
                    a("button", {
                      type: "submit",
                      class: "button button-primary",
                      disabled: o.value
                    }, T(o.value ? "保存中..." : "保存并启用"), 9, l4)
                  ]),
                  u.value ? (g(), k("p", r4, [
                    se(H(ro), { size: 16 }),
                    _e(" " + T(u.value), 1)
                  ])) : oe("", !0),
                  c.value ? (g(), k("p", {
                    key: 5,
                    class: ye(["config-message", c.value.startsWith("连接成功") ? "success" : "error"])
                  }, T(c.value), 3)) : oe("", !0),
                  s.value ? (g(), k("p", a4, T(s.value), 1)) : oe("", !0)
                ], 32)
              ])
            ], 8, w5)
          ])) : oe("", !0)
        ]))
      ]);
    };
  }
}), c4 = /* @__PURE__ */ jr(u4, [["__scopeId", "data-v-2735f362"]]);
let Bn = null, Hn = null;
function x4(e = "#reranker-settings-root") {
  if (Bn) return Bn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("Reranker 设置挂载点不存在");
  return Bn = Cs(cT), Bn.mount(t), Bn;
}
function $4() {
  Bn && (Bn.unmount(), Bn = null);
}
function I4(e = "#providers-root") {
  if (Hn) return Hn;
  const t = typeof e == "string" ? document.querySelector(e) : e;
  if (!t) throw new Error("提供商配置挂载点不存在");
  return Hn = Cs(c4), Hn.mount(t), Hn;
}
function N4() {
  Hn && (Hn.unmount(), Hn = null);
}
export {
  S4 as destroyEvaluationApp,
  w4 as destroyExtensionsApp,
  m4 as destroyManageApp,
  N4 as destroyProvidersApp,
  $4 as destroyRerankerSettingsApp,
  C4 as hideEvaluationApp,
  _4 as hideExtensionsApp,
  k4 as mountEvaluationApp,
  y4 as mountExtensionsApp,
  v4 as mountManageApp,
  I4 as mountProvidersApp,
  x4 as mountRerankerSettingsApp,
  E4 as showEvaluationApp,
  b4 as showExtensionsApp,
  g4 as showManageApp
};
