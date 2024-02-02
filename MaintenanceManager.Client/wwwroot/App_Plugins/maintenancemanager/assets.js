var ct = (n, t, e) => {
  if (!t.has(n))
    throw TypeError("Cannot " + e);
};
var g = (n, t, e) => (ct(n, t, "read from private field"), e ? e.call(n) : t.get(n)), q = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
}, K = (n, t, e, s) => (ct(n, t, "write to private field"), s ? s.call(n, e) : t.set(n, e), e);
import { UmbElementMixin as kt } from "@umbraco-cms/backoffice/element-api";
import { state as V, property as Ht, customElement as zt } from "@umbraco-cms/backoffice/external/lit";
import { UmbBaseController as Rt } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as Dt } from "@umbraco-cms/backoffice/context-api";
import { UmbBooleanState as dt } from "@umbraco-cms/backoffice/observable-api";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const L = globalThis, st = L.ShadowRoot && (L.ShadyCSS === void 0 || L.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, it = Symbol(), pt = /* @__PURE__ */ new WeakMap();
let Et = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== it)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (st && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = pt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && pt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const It = (n) => new Et(typeof n == "string" ? n : n + "", void 0, it), Lt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new Et(e, n, it);
}, Wt = (n, t) => {
  if (st)
    n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const s = document.createElement("style"), i = L.litNonce;
      i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
    }
}, ut = st ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules)
    e += s.cssText;
  return It(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: Bt, defineProperty: Ft, getOwnPropertyDescriptor: Vt, getOwnPropertyNames: jt, getOwnPropertySymbols: qt, getPrototypeOf: Kt } = Object, f = globalThis, $t = f.trustedTypes, Jt = $t ? $t.emptyScript : "", J = f.reactiveElementPolyfillSupport, U = (n, t) => n, Q = { toAttribute(n, t) {
  switch (t) {
    case Boolean:
      n = n ? Jt : null;
      break;
    case Object:
    case Array:
      n = n == null ? n : JSON.stringify(n);
  }
  return n;
}, fromAttribute(n, t) {
  let e = n;
  switch (t) {
    case Boolean:
      e = n !== null;
      break;
    case Number:
      e = n === null ? null : Number(n);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(n);
      } catch {
        e = null;
      }
  }
  return e;
} }, St = (n, t) => !Bt(n, t), _t = { attribute: !0, type: String, converter: Q, reflect: !1, hasChanged: St };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), f.litPropertyMetadata ?? (f.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class w extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = _t) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const s = Symbol(), i = this.getPropertyDescriptor(t, s, e);
      i !== void 0 && Ft(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, s) {
    const { get: i, set: r } = Vt(this.prototype, t) ?? { get() {
      return this[e];
    }, set(o) {
      this[e] = o;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(o) {
      const l = i == null ? void 0 : i.call(this);
      r.call(this, o), this.requestUpdate(t, l, s);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? _t;
  }
  static _$Ei() {
    if (this.hasOwnProperty(U("elementProperties")))
      return;
    const t = Kt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(U("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(U("properties"))) {
      const e = this.properties, s = [...jt(e), ...qt(e)];
      for (const i of s)
        this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [s, i] of e)
          this.elementProperties.set(s, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, s] of this.elementProperties) {
      const i = this._$Eu(e, s);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const s = new Set(t.flat(1 / 0).reverse());
      for (const i of s)
        e.unshift(ut(i));
    } else
      t !== void 0 && e.push(ut(t));
    return e;
  }
  static _$Eu(t, e) {
    const s = e.attribute;
    return s === !1 ? void 0 : typeof s == "string" ? s : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$Eg = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$ES(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$E_ ?? (this._$E_ = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$E_) == null || e.delete(t);
  }
  _$ES() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const s of e.keys())
      this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return Wt(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$E_) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$E_) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EO(t, e) {
    var r;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : Q).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((r = o.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? o.converter : Q;
      this._$Em = i, this[i] = l.fromAttribute(e, o.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(t)), !(s.hasChanged ?? St)(this[t], e))
        return;
      this.C(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$Eg = this._$EP());
  }
  C(t, e, s) {
    this._$AL.has(t) || this._$AL.set(t, e), s.reflect === !0 && this._$Em !== t && (this._$ET ?? (this._$ET = /* @__PURE__ */ new Set())).add(t);
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$Eg;
    } catch (e) {
      Promise.reject(e);
    }
    const t = this.scheduleUpdate();
    return t != null && await t, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    var s;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [r, o] of this._$Ep)
          this[r] = o;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0)
        for (const [r, o] of i)
          o.wrapped !== !0 || this._$AL.has(r) || this[r] === void 0 || this.C(r, this[r], o);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$E_) == null || s.forEach((i) => {
        var r;
        return (r = i.hostUpdate) == null ? void 0 : r.call(i);
      }), this.update(e)) : this._$Ej();
    } catch (i) {
      throw t = !1, this._$Ej(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$E_) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$Ej() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$Eg;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$ET && (this._$ET = this._$ET.forEach((e) => this._$EO(e, this[e]))), this._$Ej();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[U("elementProperties")] = /* @__PURE__ */ new Map(), w[U("finalized")] = /* @__PURE__ */ new Map(), J == null || J({ ReactiveElement: w }), (f.reactiveElementVersions ?? (f.reactiveElementVersions = [])).push("2.0.3");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const O = globalThis, W = O.trustedTypes, ft = W ? W.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, wt = "$lit$", _ = `lit$${(Math.random() + "").slice(9)}$`, Ct = "?" + _, Gt = `<${Ct}>`, S = document, k = () => S.createComment(""), H = (n) => n === null || typeof n != "object" && typeof n != "function", Mt = Array.isArray, Xt = (n) => Mt(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", G = `[ 	
\f\r]`, P = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, mt = /-->/g, gt = />/g, A = RegExp(`>|${G}(?:([^\\s"'>=/]+)(${G}*=${G}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), At = /'/g, yt = /"/g, xt = /^(?:script|style|textarea|title)$/i, Zt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), R = Zt(1), C = Symbol.for("lit-noChange"), d = Symbol.for("lit-nothing"), vt = /* @__PURE__ */ new WeakMap(), v = S.createTreeWalker(S, 129);
function Pt(n, t) {
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return ft !== void 0 ? ft.createHTML(t) : t;
}
const Qt = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : "", o = P;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let c, p, h = -1, u = 0;
    for (; u < a.length && (o.lastIndex = u, p = o.exec(a), p !== null); )
      u = o.lastIndex, o === P ? p[1] === "!--" ? o = mt : p[1] !== void 0 ? o = gt : p[2] !== void 0 ? (xt.test(p[2]) && (i = RegExp("</" + p[2], "g")), o = A) : p[3] !== void 0 && (o = A) : o === A ? p[0] === ">" ? (o = i ?? P, h = -1) : p[1] === void 0 ? h = -2 : (h = o.lastIndex - p[2].length, c = p[1], o = p[3] === void 0 ? A : p[3] === '"' ? yt : At) : o === yt || o === At ? o = A : o === mt || o === gt ? o = P : (o = A, i = void 0);
    const $ = o === A && n[l + 1].startsWith("/>") ? " " : "";
    r += o === P ? a + Gt : h >= 0 ? (s.push(c), a.slice(0, h) + wt + a.slice(h) + _ + $) : a + _ + (h === -2 ? l : $);
  }
  return [Pt(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : "")), s];
};
class z {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const l = t.length - 1, a = this.parts, [c, p] = Qt(t, e);
    if (this.el = z.createElement(c, s), v.currentNode = this.el.content, e === 2) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = v.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes())
          for (const h of i.getAttributeNames())
            if (h.endsWith(wt)) {
              const u = p[o++], $ = i.getAttribute(h).split(_), I = /([.?@])?(.*)/.exec(u);
              a.push({ type: 1, index: r, name: I[2], strings: $, ctor: I[1] === "." ? te : I[1] === "?" ? ee : I[1] === "@" ? se : j }), i.removeAttribute(h);
            } else
              h.startsWith(_) && (a.push({ type: 6, index: r }), i.removeAttribute(h));
        if (xt.test(i.tagName)) {
          const h = i.textContent.split(_), u = h.length - 1;
          if (u > 0) {
            i.textContent = W ? W.emptyScript : "";
            for (let $ = 0; $ < u; $++)
              i.append(h[$], k()), v.nextNode(), a.push({ type: 2, index: ++r });
            i.append(h[u], k());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === Ct)
          a.push({ type: 2, index: r });
        else {
          let h = -1;
          for (; (h = i.data.indexOf(_, h + 1)) !== -1; )
            a.push({ type: 7, index: r }), h += _.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const s = S.createElement("template");
    return s.innerHTML = t, s;
  }
}
function M(n, t, e = n, s) {
  var o, l;
  if (t === C)
    return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const r = H(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = M(n, i._$AS(n, t.values), i, s)), t;
}
class Yt {
  constructor(t, e) {
    this._$AV = [], this._$AN = void 0, this._$AD = t, this._$AM = e;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(t) {
    const { el: { content: e }, parts: s } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? S).importNode(e, !0);
    v.currentNode = i;
    let r = v.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let c;
        a.type === 2 ? c = new D(r, r.nextSibling, this, t) : a.type === 1 ? c = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (c = new ie(r, this, t)), this._$AV.push(c), a = s[++l];
      }
      o !== (a == null ? void 0 : a.index) && (r = v.nextNode(), o++);
    }
    return v.currentNode = S, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class D {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = d, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
  }
  get parentNode() {
    let t = this._$AA.parentNode;
    const e = this._$AM;
    return e !== void 0 && (t == null ? void 0 : t.nodeType) === 11 && (t = e.parentNode), t;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(t, e = this) {
    t = M(this, t, e), H(t) ? t === d || t == null || t === "" ? (this._$AH !== d && this._$AR(), this._$AH = d) : t !== this._$AH && t !== C && this._(t) : t._$litType$ !== void 0 ? this.g(t) : t.nodeType !== void 0 ? this.$(t) : Xt(t) ? this.T(t) : this._(t);
  }
  k(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  $(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.k(t));
  }
  _(t) {
    this._$AH !== d && H(this._$AH) ? this._$AA.nextSibling.data = t : this.$(S.createTextNode(t)), this._$AH = t;
  }
  g(t) {
    var r;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = z.createElement(Pt(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i)
      this._$AH.p(e);
    else {
      const o = new Yt(i, this), l = o.u(this.options);
      o.p(e), this.$(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = vt.get(t.strings);
    return e === void 0 && vt.set(t.strings, e = new z(t)), e;
  }
  T(t) {
    Mt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t)
      i === e.length ? e.push(s = new D(this.k(k()), this.k(k()), this, this.options)) : s = e[i], s._$AI(r), i++;
    i < e.length && (this._$AR(s && s._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var s;
    for ((s = this._$AP) == null ? void 0 : s.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class j {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = d, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = d;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      t = M(this, t, e, 0), o = !H(t) || t !== this._$AH && t !== C, o && (this._$AH = t);
    else {
      const l = t;
      let a, c;
      for (t = r[0], a = 0; a < r.length - 1; a++)
        c = M(this, l[s + a], e, a), c === C && (c = this._$AH[a]), o || (o = !H(c) || c !== this._$AH[a]), c === d ? t = d : t !== d && (t += (c ?? "") + r[a + 1]), this._$AH[a] = c;
    }
    o && !i && this.O(t);
  }
  O(t) {
    t === d ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class te extends j {
  constructor() {
    super(...arguments), this.type = 3;
  }
  O(t) {
    this.element[this.name] = t === d ? void 0 : t;
  }
}
class ee extends j {
  constructor() {
    super(...arguments), this.type = 4;
  }
  O(t) {
    this.element.toggleAttribute(this.name, !!t && t !== d);
  }
}
class se extends j {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = M(this, t, e, 0) ?? d) === C)
      return;
    const s = this._$AH, i = t === d && s !== d || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== d && (s === d || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ie {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    M(this, t);
  }
}
const X = O.litHtmlPolyfillSupport;
X == null || X(z, D), (O.litHtmlVersions ?? (O.litHtmlVersions = [])).push("3.1.1");
const ne = (n, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new D(t.insertBefore(k(), r), r, void 0, e ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class N extends w {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    var e;
    const t = super.createRenderRoot();
    return (e = this.renderOptions).renderBefore ?? (e.renderBefore = t.firstChild), t;
  }
  update(t) {
    const e = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = ne(e, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    var t;
    super.connectedCallback(), (t = this._$Do) == null || t.setConnected(!0);
  }
  disconnectedCallback() {
    var t;
    super.disconnectedCallback(), (t = this._$Do) == null || t.setConnected(!1);
  }
  render() {
    return C;
  }
}
var bt;
N._$litElement$ = !0, N.finalized = !0, (bt = globalThis.litElementHydrateSupport) == null || bt.call(globalThis, { LitElement: N });
const Z = globalThis.litElementPolyfillSupport;
Z == null || Z({ LitElement: N });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.3");
var b, E;
class Y extends Rt {
  constructor(e) {
    super(e);
    q(this, b, void 0);
    q(this, E, void 0);
    K(this, b, new dt(!1)), this.inMaintenanceMode = g(this, b).asObservable(), K(this, E, new dt(!1)), this.isFrozen = g(this, E).asObservable(), this.provideContext(nt, this);
  }
  toggleMaintenance() {
    g(this, b).setValue(!g(this, b).getValue()), console.log("eeby");
  }
  toggleFrozen() {
    g(this, E).setValue(!g(this, E).getValue()), console.log("deeby");
  }
}
b = new WeakMap(), E = new WeakMap();
const nt = new Dt(Y.name), oe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MAINTENANCE_CONTEXT_TOKEN: nt,
  MaintenanceContext: Y,
  default: Y
}, Symbol.toStringTag, { value: "Module" }));
var re = Object.defineProperty, ae = Object.getOwnPropertyDescriptor, x = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? ae(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && re(t, e, i), i;
}, ot = (n, t, e) => {
  if (!t.has(n))
    throw TypeError("Cannot " + e);
}, B = (n, t, e) => (ot(n, t, "read from private field"), e ? e.call(n) : t.get(n)), y = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
}, he = (n, t, e, s) => (ot(n, t, "write to private field"), s ? s.call(n, e) : t.set(n, e), e), F = (n, t, e) => (ot(n, t, "access private method"), e), T, rt, at, tt, Tt, et, Ut, ht, Ot, lt, Nt;
let m = class extends kt(N) {
  constructor() {
    super(), y(this, tt), y(this, et), y(this, ht), y(this, lt), y(this, T, void 0), this.maintenance = !1, this.frozen = !1, this._loaded = !0, this._status = {
      isInMaintenanceMode: !0,
      isContentFrozen: !0,
      usingWebConfig: !0
    }, this.title = "MaintenanceManager dashboard", y(this, rt, () => {
      var n;
      (n = B(this, T)) == null || n.toggleMaintenance();
    }), y(this, at, () => {
      var n;
      (n = B(this, T)) == null || n.toggleFrozen();
    }), this.consumeContext(nt, (n) => {
      he(this, T, n), this.observe(n.inMaintenanceMode, (t) => {
        this.maintenance = t, console.log("some words 1");
      }), this.observe(n.isFrozen, (t) => {
        this.frozen = t, console.log("some words 2");
      });
    });
  }
  render() {
    return R`
        <uui-box>${this._loaded ? F(this, et, Ut).call(this) : F(this, tt, Tt).call(this)}</uui-box>`;
  }
};
T = /* @__PURE__ */ new WeakMap();
rt = /* @__PURE__ */ new WeakMap();
at = /* @__PURE__ */ new WeakMap();
tt = /* @__PURE__ */ new WeakSet();
Tt = function() {
  return R`
			<uui-loader-bar animationDuration="1.5" style="color: black"></uui-loader-bar>
		`;
};
et = /* @__PURE__ */ new WeakSet();
Ut = function() {
  return R`
        <div>${this._status.isInMaintenanceMode ? F(this, ht, Ot).call(this) : ""}</div>
        <div>${this._status.isContentFrozen ? F(this, lt, Nt).call(this) : ""}</div>
        `;
};
ht = /* @__PURE__ */ new WeakSet();
Ot = function() {
  return R`
            <uui-button label="Toggle Maintenance" id="clickMaintenance" look="secondary" @click=${B(this, rt)}></uui-button>
        [${this.maintenance}]
         <div class="alert alert-danger maintenanceMode-alert">
                    <i class="icon icon-block"></i>
                    <div>
                        InMaintenanceMode
                    </div>
                </div>
                `;
};
lt = /* @__PURE__ */ new WeakSet();
Nt = function() {
  return R`
            <uui-button label="Toggle Frozen" id="clickFrozen" look="secondary" @click=${B(this, at)}></uui-button>
        [${this.frozen}]
        <div class="alert alert-info frozen-alert">
                <i class="icon icon-snow"></i>
                    <div>
                        ContentFrozen
                    </div>
                </div>`;
};
m.styles = Lt`
        :host {
            display: block;
            padding: 20px;
        }
    `;
x([
  V()
], m.prototype, "maintenance", 2);
x([
  V()
], m.prototype, "frozen", 2);
x([
  V()
], m.prototype, "_loaded", 2);
x([
  V()
], m.prototype, "_status", 2);
x([
  Ht()
], m.prototype, "title", 2);
m = x([
  zt("maintenancemanager-dashboard")
], m);
const le = [
  {
    type: "dashboard",
    name: "maintenancemanager",
    alias: "maintenancemanager.dashboard",
    elementName: "maintenancemanager-dashboard",
    weight: -10,
    meta: {
      label: "MaintenanceManager",
      pathname: "maintenancemanager"
    },
    conditions: [
      {
        alias: "Umb.Condition.SectionAlias",
        match: "Umb.Section.Content"
      }
    ]
  }
], ce = [...le], de = [
  {
    type: "globalContext",
    alias: "maintenance.context",
    name: "maintenance context",
    js: () => Promise.resolve().then(() => oe)
  }
], pe = [...de], ue = [
  ...ce,
  ...pe
], ve = (n, t) => {
  t.registerMany(ue);
};
export {
  ve as onInit
};
//# sourceMappingURL=assets.js.map
