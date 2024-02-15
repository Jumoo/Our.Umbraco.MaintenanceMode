var Tt = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var h = (s, t, e) => (Tt(s, t, "read from private field"), e ? e.call(s) : t.get(s)), y = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, f = (s, t, e, n) => (Tt(s, t, "write to private field"), n ? n.call(s, e) : t.set(s, e), e);
import { UmbElementMixin as Yt } from "@umbraco-cms/backoffice/element-api";
import { state as $t, property as te, customElement as ee } from "@umbraco-cms/backoffice/external/lit";
import { UmbBaseController as se } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as ne } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as ie } from "@umbraco-cms/backoffice/observable-api";
import { UMB_AUTH_CONTEXT as re } from "@umbraco-cms/backoffice/auth";
import { tryExecuteAndNotify as nt } from "@umbraco-cms/backoffice/resources";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Y = globalThis, mt = Y.ShadowRoot && (Y.ShadyCSS === void 0 || Y.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, yt = Symbol(), xt = /* @__PURE__ */ new WeakMap();
let It = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== yt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (mt && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = xt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && xt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const oe = (s) => new It(typeof s == "string" ? s : s + "", void 0, yt), ae = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((n, i, o) => n + ((r) => {
    if (r._$cssResult$ === !0)
      return r.cssText;
    if (typeof r == "number")
      return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[o + 1], s[0]);
  return new It(e, s, yt);
}, ce = (s, t) => {
  if (mt)
    s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const n = document.createElement("style"), i = Y.litNonce;
      i !== void 0 && n.setAttribute("nonce", i), n.textContent = e.cssText, s.appendChild(n);
    }
}, Mt = mt ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules)
    e += n.cssText;
  return oe(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: he, defineProperty: le, getOwnPropertyDescriptor: de, getOwnPropertyNames: ue, getOwnPropertySymbols: pe, getPrototypeOf: fe } = Object, w = globalThis, Pt = w.trustedTypes, $e = Pt ? Pt.emptyScript : "", it = w.reactiveElementPolyfillSupport, D = (s, t) => s, dt = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? $e : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, t) {
  let e = s;
  switch (t) {
    case Boolean:
      e = s !== null;
      break;
    case Number:
      e = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        e = JSON.parse(s);
      } catch {
        e = null;
      }
  }
  return e;
} }, Bt = (s, t) => !he(s, t), Ot = { attribute: !0, type: String, converter: dt, reflect: !1, hasChanged: Bt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), w.litPropertyMetadata ?? (w.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class U extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = Ot) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, e);
      i !== void 0 && le(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: i, set: o } = de(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(r) {
      const c = i == null ? void 0 : i.call(this);
      o.call(this, r), this.requestUpdate(t, c, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? Ot;
  }
  static _$Ei() {
    if (this.hasOwnProperty(D("elementProperties")))
      return;
    const t = fe(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(D("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(D("properties"))) {
      const e = this.properties, n = [...ue(e), ...pe(e)];
      for (const i of n)
        this.createProperty(i, e[i]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [n, i] of e)
          this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, n] of this.elementProperties) {
      const i = this._$Eu(e, n);
      i !== void 0 && this._$Eh.set(i, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const n = new Set(t.flat(1 / 0).reverse());
      for (const i of n)
        e.unshift(Mt(i));
    } else
      t !== void 0 && e.push(Mt(t));
    return e;
  }
  static _$Eu(t, e) {
    const n = e.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof t == "string" ? t.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    var t;
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), (t = this.constructor.l) == null || t.forEach((e) => e(this));
  }
  addController(t) {
    var e;
    (this._$EO ?? (this._$EO = /* @__PURE__ */ new Set())).add(t), this.renderRoot !== void 0 && this.isConnected && ((e = t.hostConnected) == null || e.call(t));
  }
  removeController(t) {
    var e;
    (e = this._$EO) == null || e.delete(t);
  }
  _$E_() {
    const t = /* @__PURE__ */ new Map(), e = this.constructor.elementProperties;
    for (const n of e.keys())
      this.hasOwnProperty(n) && (t.set(n, this[n]), delete this[n]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ce(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var n;
      return (n = e.hostConnected) == null ? void 0 : n.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var n;
      return (n = e.hostDisconnected) == null ? void 0 : n.call(e);
    });
  }
  attributeChangedCallback(t, e, n) {
    this._$AK(t, n);
  }
  _$EC(t, e) {
    var o;
    const n = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, n);
    if (i !== void 0 && n.reflect === !0) {
      const r = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : dt).toAttribute(e, n.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o;
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const r = n.getPropertyOptions(i), c = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((o = r.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? r.converter : dt;
      this._$Em = i, this[i] = c.fromAttribute(e, r.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, n) {
    if (t !== void 0) {
      if (n ?? (n = this.constructor.getPropertyOptions(t)), !(n.hasChanged ?? Bt)(this[t], e))
        return;
      this.P(t, e, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, e, n) {
    this._$AL.has(t) || this._$AL.set(t, e), n.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
  }
  async _$ET() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
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
    var n;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, r] of this._$Ep)
          this[o] = r;
        this._$Ep = void 0;
      }
      const i = this.constructor.elementProperties;
      if (i.size > 0)
        for (const [o, r] of i)
          r.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], r);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (n = this._$EO) == null || n.forEach((i) => {
        var o;
        return (o = i.hostUpdate) == null ? void 0 : o.call(i);
      }), this.update(e)) : this._$EU();
    } catch (i) {
      throw t = !1, this._$EU(), i;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((n) => {
      var i;
      return (i = n.hostUpdated) == null ? void 0 : i.call(n);
    }), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(t)), this.updated(t);
  }
  _$EU() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(t) {
    return !0;
  }
  update(t) {
    this._$Ej && (this._$Ej = this._$Ej.forEach((e) => this._$EC(e, this[e]))), this._$EU();
  }
  updated(t) {
  }
  firstUpdated(t) {
  }
}
U.elementStyles = [], U.shadowRootOptions = { mode: "open" }, U[D("elementProperties")] = /* @__PURE__ */ new Map(), U[D("finalized")] = /* @__PURE__ */ new Map(), it == null || it({ ReactiveElement: U }), (w.reactiveElementVersions ?? (w.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, tt = I.trustedTypes, Ut = tt ? tt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Lt = "$lit$", v = `lit$${(Math.random() + "").slice(9)}$`, Wt = "?" + v, me = `<${Wt}>`, P = document, F = () => P.createComment(""), q = (s) => s === null || typeof s != "object" && typeof s != "function", Ft = Array.isArray, ye = (s) => Ft(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", rt = `[ 	
\f\r]`, z = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Nt = /-->/g, Rt = />/g, C = RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ht = /'/g, kt = /"/g, qt = /^(?:script|style|textarea|title)$/i, _e = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), k = _e(1), R = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), zt = /* @__PURE__ */ new WeakMap(), T = P.createTreeWalker(P, 129);
function Vt(s, t) {
  if (!Array.isArray(s) || !s.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Ut !== void 0 ? Ut.createHTML(t) : t;
}
const ge = (s, t) => {
  const e = s.length - 1, n = [];
  let i, o = t === 2 ? "<svg>" : "", r = z;
  for (let c = 0; c < e; c++) {
    const a = s[c];
    let l, p, d = -1, $ = 0;
    for (; $ < a.length && (r.lastIndex = $, p = r.exec(a), p !== null); )
      $ = r.lastIndex, r === z ? p[1] === "!--" ? r = Nt : p[1] !== void 0 ? r = Rt : p[2] !== void 0 ? (qt.test(p[2]) && (i = RegExp("</" + p[2], "g")), r = C) : p[3] !== void 0 && (r = C) : r === C ? p[0] === ">" ? (r = i ?? z, d = -1) : p[1] === void 0 ? d = -2 : (d = r.lastIndex - p[2].length, l = p[1], r = p[3] === void 0 ? C : p[3] === '"' ? kt : Ht) : r === kt || r === Ht ? r = C : r === Nt || r === Rt ? r = z : (r = C, i = void 0);
    const A = r === C && s[c + 1].startsWith("/>") ? " " : "";
    o += r === z ? a + me : d >= 0 ? (n.push(l), a.slice(0, d) + Lt + a.slice(d) + v + A) : a + v + (d === -2 ? c : A);
  }
  return [Vt(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : "")), n];
};
class V {
  constructor({ strings: t, _$litType$: e }, n) {
    let i;
    this.parts = [];
    let o = 0, r = 0;
    const c = t.length - 1, a = this.parts, [l, p] = ge(t, e);
    if (this.el = V.createElement(l, n), T.currentNode = this.el.content, e === 2) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = T.nextNode()) !== null && a.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes())
          for (const d of i.getAttributeNames())
            if (d.endsWith(Lt)) {
              const $ = p[r++], A = i.getAttribute(d).split(v), Q = /([.?@])?(.*)/.exec($);
              a.push({ type: 1, index: o, name: Q[2], strings: A, ctor: Q[1] === "." ? be : Q[1] === "?" ? ve : Q[1] === "@" ? Se : st }), i.removeAttribute(d);
            } else
              d.startsWith(v) && (a.push({ type: 6, index: o }), i.removeAttribute(d));
        if (qt.test(i.tagName)) {
          const d = i.textContent.split(v), $ = d.length - 1;
          if ($ > 0) {
            i.textContent = tt ? tt.emptyScript : "";
            for (let A = 0; A < $; A++)
              i.append(d[A], F()), T.nextNode(), a.push({ type: 2, index: ++o });
            i.append(d[$], F());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === Wt)
          a.push({ type: 2, index: o });
        else {
          let d = -1;
          for (; (d = i.data.indexOf(v, d + 1)) !== -1; )
            a.push({ type: 7, index: o }), d += v.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const n = P.createElement("template");
    return n.innerHTML = t, n;
  }
}
function H(s, t, e = s, n) {
  var r, c;
  if (t === R)
    return t;
  let i = n !== void 0 ? (r = e._$Co) == null ? void 0 : r[n] : e._$Cl;
  const o = q(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((c = i == null ? void 0 : i._$AO) == null || c.call(i, !1), o === void 0 ? i = void 0 : (i = new o(s), i._$AT(s, e, n)), n !== void 0 ? (e._$Co ?? (e._$Co = []))[n] = i : e._$Cl = i), i !== void 0 && (t = H(s, i._$AS(s, t.values), i, n)), t;
}
class Ae {
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
    const { el: { content: e }, parts: n } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? P).importNode(e, !0);
    T.currentNode = i;
    let o = T.nextNode(), r = 0, c = 0, a = n[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let l;
        a.type === 2 ? l = new G(o, o.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (l = new Ee(o, this, t)), this._$AV.push(l), a = n[++c];
      }
      r !== (a == null ? void 0 : a.index) && (o = T.nextNode(), r++);
    }
    return T.currentNode = P, i;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV)
      n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class G {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, n, i) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = H(this, t, e), q(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== R && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : ye(t) ? this.k(t) : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  _(t) {
    this._$AH !== u && q(this._$AH) ? this._$AA.nextSibling.data = t : this.T(P.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = V.createElement(Vt(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i)
      this._$AH.p(e);
    else {
      const r = new Ae(i, this), c = r.u(this.options);
      r.p(e), this.T(c), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = zt.get(t.strings);
    return e === void 0 && zt.set(t.strings, e = new V(t)), e;
  }
  k(t) {
    Ft(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, i = 0;
    for (const o of t)
      i === e.length ? e.push(n = new G(this.S(F()), this.S(F()), this, this.options)) : n = e[i], n._$AI(o), i++;
    i < e.length && (this._$AR(n && n._$AB.nextSibling, i), e.length = i);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var n;
    for ((n = this._$AP) == null ? void 0 : n.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const i = t.nextSibling;
      t.remove(), t = i;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class st {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, n, i, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = u;
  }
  _$AI(t, e = this, n, i) {
    const o = this.strings;
    let r = !1;
    if (o === void 0)
      t = H(this, t, e, 0), r = !q(t) || t !== this._$AH && t !== R, r && (this._$AH = t);
    else {
      const c = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++)
        l = H(this, c[n + a], e, a), l === R && (l = this._$AH[a]), r || (r = !q(l) || l !== this._$AH[a]), l === u ? t = u : t !== u && (t += (l ?? "") + o[a + 1]), this._$AH[a] = l;
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class be extends st {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class ve extends st {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Se extends st {
  constructor(t, e, n, i, o) {
    super(t, e, n, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = H(this, t, e, 0) ?? u) === R)
      return;
    const n = this._$AH, i = t === u && n !== u || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== u && (n === u || i);
    i && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class Ee {
  constructor(t, e, n) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    H(this, t);
  }
}
const ot = I.litHtmlPolyfillSupport;
ot == null || ot(V, G), (I.litHtmlVersions ?? (I.litHtmlVersions = [])).push("3.1.2");
const we = (s, t, e) => {
  const n = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    n._$litPart$ = i = new G(t.insertBefore(F(), o), o, void 0, e ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class B extends U {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = we(e, this.renderRoot, this.renderOptions);
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
    return R;
  }
}
var Dt;
B._$litElement$ = !0, B.finalized = !0, (Dt = globalThis.litElementHydrateSupport) == null || Dt.call(globalThis, { LitElement: B });
const at = globalThis.litElementPolyfillSupport;
at == null || at({ LitElement: B });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.4");
class jt extends Error {
  constructor(t, e, n) {
    super(n), this.name = "ApiError", this.url = e.url, this.status = e.status, this.statusText = e.statusText, this.body = e.body, this.request = t;
  }
}
class Ce extends Error {
  constructor(t) {
    super(t), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
var _, g, m, S, x, J, N;
class Te {
  constructor(t) {
    y(this, _, void 0);
    y(this, g, void 0);
    y(this, m, void 0);
    y(this, S, void 0);
    y(this, x, void 0);
    y(this, J, void 0);
    y(this, N, void 0);
    f(this, _, !1), f(this, g, !1), f(this, m, !1), f(this, S, []), f(this, x, new Promise((e, n) => {
      f(this, J, e), f(this, N, n);
      const i = (c) => {
        var a;
        h(this, _) || h(this, g) || h(this, m) || (f(this, _, !0), (a = h(this, J)) == null || a.call(this, c));
      }, o = (c) => {
        var a;
        h(this, _) || h(this, g) || h(this, m) || (f(this, g, !0), (a = h(this, N)) == null || a.call(this, c));
      }, r = (c) => {
        h(this, _) || h(this, g) || h(this, m) || h(this, S).push(c);
      };
      return Object.defineProperty(r, "isResolved", {
        get: () => h(this, _)
      }), Object.defineProperty(r, "isRejected", {
        get: () => h(this, g)
      }), Object.defineProperty(r, "isCancelled", {
        get: () => h(this, m)
      }), t(i, o, r);
    }));
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(t, e) {
    return h(this, x).then(t, e);
  }
  catch(t) {
    return h(this, x).catch(t);
  }
  finally(t) {
    return h(this, x).finally(t);
  }
  cancel() {
    var t;
    if (!(h(this, _) || h(this, g) || h(this, m))) {
      if (f(this, m, !0), h(this, S).length)
        try {
          for (const e of h(this, S))
            e();
        } catch (e) {
          console.warn("Cancellation threw an error", e);
          return;
        }
      h(this, S).length = 0, (t = h(this, N)) == null || t.call(this, new Ce("Request aborted"));
    }
  }
  get isCancelled() {
    return h(this, m);
  }
}
_ = new WeakMap(), g = new WeakMap(), m = new WeakMap(), S = new WeakMap(), x = new WeakMap(), J = new WeakMap(), N = new WeakMap();
const L = {
  BASE: "",
  VERSION: "Latest",
  WITH_CREDENTIALS: !1,
  CREDENTIALS: "include",
  TOKEN: void 0,
  USERNAME: void 0,
  PASSWORD: void 0,
  HEADERS: void 0,
  ENCODE_PATH: void 0
}, _t = (s) => s != null, K = (s) => typeof s == "string", ct = (s) => K(s) && s !== "", gt = (s) => typeof s == "object" && typeof s.type == "string" && typeof s.stream == "function" && typeof s.arrayBuffer == "function" && typeof s.constructor == "function" && typeof s.constructor.name == "string" && /^(Blob|File)$/.test(s.constructor.name) && /^(Blob|File)$/.test(s[Symbol.toStringTag]), Jt = (s) => s instanceof FormData, xe = (s) => {
  try {
    return btoa(s);
  } catch {
    return Buffer.from(s).toString("base64");
  }
}, Me = (s) => {
  const t = [], e = (i, o) => {
    t.push(`${encodeURIComponent(i)}=${encodeURIComponent(String(o))}`);
  }, n = (i, o) => {
    _t(o) && (Array.isArray(o) ? o.forEach((r) => {
      n(i, r);
    }) : typeof o == "object" ? Object.entries(o).forEach(([r, c]) => {
      n(`${i}[${r}]`, c);
    }) : e(i, o));
  };
  return Object.entries(s).forEach(([i, o]) => {
    n(i, o);
  }), t.length > 0 ? `?${t.join("&")}` : "";
}, Pe = (s, t) => {
  const e = s.ENCODE_PATH || encodeURI, n = t.url.replace("{api-version}", s.VERSION).replace(/{(.*?)}/g, (o, r) => {
    var c;
    return (c = t.path) != null && c.hasOwnProperty(r) ? e(String(t.path[r])) : o;
  }), i = `${s.BASE}${n}`;
  return t.query ? `${i}${Me(t.query)}` : i;
}, Oe = (s) => {
  if (s.formData) {
    const t = new FormData(), e = (n, i) => {
      K(i) || gt(i) ? t.append(n, i) : t.append(n, JSON.stringify(i));
    };
    return Object.entries(s.formData).filter(([n, i]) => _t(i)).forEach(([n, i]) => {
      Array.isArray(i) ? i.forEach((o) => e(n, o)) : e(n, i);
    }), t;
  }
}, Z = async (s, t) => typeof t == "function" ? t(s) : t, Ue = async (s, t) => {
  const e = await Z(t, s.TOKEN), n = await Z(t, s.USERNAME), i = await Z(t, s.PASSWORD), o = await Z(t, s.HEADERS), r = Object.entries({
    Accept: "application/json",
    ...o,
    ...t.headers
  }).filter(([c, a]) => _t(a)).reduce((c, [a, l]) => ({
    ...c,
    [a]: String(l)
  }), {});
  if (ct(e) && (r.Authorization = `Bearer ${e}`), ct(n) && ct(i)) {
    const c = xe(`${n}:${i}`);
    r.Authorization = `Basic ${c}`;
  }
  return t.body && (t.mediaType ? r["Content-Type"] = t.mediaType : gt(t.body) ? r["Content-Type"] = t.body.type || "application/octet-stream" : K(t.body) ? r["Content-Type"] = "text/plain" : Jt(t.body) || (r["Content-Type"] = "application/json")), new Headers(r);
}, Ne = (s) => {
  var t;
  if (s.body !== void 0)
    return (t = s.mediaType) != null && t.includes("/json") ? JSON.stringify(s.body) : K(s.body) || gt(s.body) || Jt(s.body) ? s.body : JSON.stringify(s.body);
}, Re = async (s, t, e, n, i, o, r) => {
  const c = new AbortController(), a = {
    headers: o,
    body: n ?? i,
    method: t.method,
    signal: c.signal
  };
  return s.WITH_CREDENTIALS && (a.credentials = s.CREDENTIALS), r(() => c.abort()), await fetch(e, a);
}, He = (s, t) => {
  if (t) {
    const e = s.headers.get(t);
    if (K(e))
      return e;
  }
}, ke = async (s) => {
  if (s.status !== 204)
    try {
      const t = s.headers.get("Content-Type");
      if (t)
        return ["application/json", "application/problem+json"].some((i) => t.toLowerCase().startsWith(i)) ? await s.json() : await s.text();
    } catch (t) {
      console.error(t);
    }
}, ze = (s, t) => {
  const n = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    ...s.errors
  }[t.status];
  if (n)
    throw new jt(s, t, n);
  if (!t.ok) {
    const i = t.status ?? "unknown", o = t.statusText ?? "unknown", r = (() => {
      try {
        return JSON.stringify(t.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new jt(
      s,
      t,
      `Generic Error: status: ${i}; status text: ${o}; body: ${r}`
    );
  }
}, ht = (s, t) => new Te(async (e, n, i) => {
  try {
    const o = Pe(s, t), r = Oe(t), c = Ne(t), a = await Ue(s, t);
    if (!i.isCancelled) {
      const l = await Re(s, t, o, c, r, a, i), p = await ke(l), d = He(l, t.responseHeader), $ = {
        url: o,
        ok: l.ok,
        status: l.status,
        statusText: l.statusText,
        body: d ?? p
      };
      ze(t, $), e($.body);
    }
  } catch (o) {
    n(o);
  }
});
class lt {
  /**
   * @returns any Success
   * @throws ApiError
   */
  static getStatus() {
    return ht(L, {
      method: "GET",
      url: "/umbraco/maintenance/api/v1/GetStatus"
    });
  }
  /**
   * @returns any Success
   * @throws ApiError
   */
  static toggleFrozen({
    maintenanceMode: t
  }) {
    return ht(L, {
      method: "GET",
      url: "/umbraco/maintenance/api/v1/ToggleFrozen",
      query: {
        maintenanceMode: t
      }
    });
  }
  /**
   * @returns any Success
   * @throws ApiError
   */
  static toggleMode({
    maintenanceMode: t
  }) {
    return ht(L, {
      method: "GET",
      url: "/umbraco/maintenance/api/v1/ToggleMode",
      query: {
        maintenanceMode: t
      }
    });
  }
}
var E, M;
class ut extends se {
  constructor(e) {
    super(e);
    y(this, E, void 0);
    y(this, M, void 0);
    f(this, E, new ie(void 0)), this.status = h(this, E).asObservable(), f(this, M, e), this.provideContext(At, this), this.consumeContext(re, (n) => {
      if (n === void 0)
        return;
      const i = () => n.getLatestToken();
      L.TOKEN = i, L.WITH_CREDENTIALS = !0, this.getStatus();
    });
  }
  async getStatus() {
    let e = await nt(h(this, M), lt.getStatus());
    console.log(e), e.data != null && h(this, E).setValue(e.data);
  }
  async toggleMaintenance() {
    var e;
    await nt(h(this, M), lt.toggleMode({
      maintenanceMode: !((e = h(this, E).getValue()) != null && e.isInMaintenanceMode)
    })), await this.getStatus(), console.log("eeby");
  }
  async toggleFrozen() {
    var e;
    await nt(h(this, M), lt.toggleFrozen({
      maintenanceMode: !((e = h(this, E).getValue()) != null && e.isContentFrozen)
    })), await this.getStatus(), console.log("deeby");
  }
}
E = new WeakMap(), M = new WeakMap();
const At = new ne(ut.name), je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MAINTENANCE_CONTEXT_TOKEN: At,
  MaintenanceContext: ut,
  default: ut
}, Symbol.toStringTag, { value: "Module" }));
var De = Object.defineProperty, Ie = Object.getOwnPropertyDescriptor, X = (s, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? Ie(t, e) : t, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (i = (n ? r(t, e, i) : r(i)) || i);
  return n && i && De(t, e, i), i;
}, bt = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
}, et = (s, t, e) => (bt(s, t, "read from private field"), e ? e.call(s) : t.get(s)), b = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, Be = (s, t, e, n) => (bt(s, t, "write to private field"), n ? n.call(s, e) : t.set(s, e), e), W = (s, t, e) => (bt(s, t, "access private method"), e), j, vt, St, pt, Gt, ft, Kt, Et, Xt, wt, Qt, Ct, Zt;
let O = class extends Yt(B) {
  constructor() {
    super(), b(this, pt), b(this, ft), b(this, Et), b(this, wt), b(this, Ct), b(this, j, void 0), this._loaded = !0, this._status = {
      isInMaintenanceMode: !0,
      isContentFrozen: !0,
      usingWebConfig: !0
    }, this.title = "MaintenanceManager dashboard", b(this, vt, () => {
      var s;
      (s = et(this, j)) == null || s.toggleMaintenance();
    }), b(this, St, () => {
      var s;
      (s = et(this, j)) == null || s.toggleFrozen();
    }), this.consumeContext(At, (s) => {
      Be(this, j, s), this.observe(s.status, (t) => {
        this.status = t;
      });
    });
  }
  render() {
    return k`
        <uui-box>${this._loaded ? W(this, ft, Kt).call(this) : W(this, pt, Gt).call(this)}</uui-box>`;
  }
};
j = /* @__PURE__ */ new WeakMap();
vt = /* @__PURE__ */ new WeakMap();
St = /* @__PURE__ */ new WeakMap();
pt = /* @__PURE__ */ new WeakSet();
Gt = function() {
  return k`
			<uui-loader-bar animationDuration="1.5" style="color: black"></uui-loader-bar>
		`;
};
ft = /* @__PURE__ */ new WeakSet();
Kt = function() {
  return k`
        <div>${W(this, Et, Xt).call(this)}</div>
        <div>${W(this, wt, Qt).call(this)}</div>
        <div>${W(this, Ct, Zt).call(this)}</div>
        `;
};
Et = /* @__PURE__ */ new WeakSet();
Xt = function() {
  return k`
        <div class="buttons">
            <uui-button label="Toggle Maintenance" id="clickMaintenance" look="secondary" @click=${et(this, vt)}></uui-button>
            <uui-button label="Toggle Frozen" id="clickFrozen" look="secondary" @click=${et(this, St)}></uui-button>
        </div>
        `;
};
wt = /* @__PURE__ */ new WeakSet();
Qt = function() {
  var s;
  return (s = this.status) != null && s.isInMaintenanceMode ? k`
         <div class="alert alert-danger maintenanceMode-alert">
            <uui-icon name="icon-block"></uui-icon>
            <div>
                <umb-localize key="maintain_onMsg"></umb-localize>
            </div>
        </div>
                ` : u;
};
Ct = /* @__PURE__ */ new WeakSet();
Zt = function() {
  var s;
  return (s = this.status) != null && s.isContentFrozen ? k`
        <div class="alert alert-info maintenanceMode-alert">
            <uui-icon name="icon-snow"></uui-icon>
            <div>
                <umb-localize key="maintain_frozenMsg"></umb-localize>
            </div>
        </div>
        ` : u;
};
O.styles = ae`
        :host {
            display: block;
            padding: 20px;
        }

        .buttons {
            display: flex;
            justify-content: center;
        }

        .buttons > uui-button {
            margin: 10px;
        }

        .maintenanceMode-alert {
            padding: 2em;
            font-size: 125%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
        
            .maintenanceMode-alert > div {
                text-align: center;
            }
        
            .maintenanceMode-alert > uui-icon {
                font-size: 50px;
                padding: 10px;
                display: block;
            }
    `;
X([
  $t()
], O.prototype, "status", 2);
X([
  $t()
], O.prototype, "_loaded", 2);
X([
  $t()
], O.prototype, "_status", 2);
X([
  te()
], O.prototype, "title", 2);
O = X([
  ee("maintenancemanager-dashboard")
], O);
const Le = [
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
], We = [...Le], Fe = [
  {
    type: "globalContext",
    alias: "maintenance.context",
    name: "maintenance context",
    js: () => Promise.resolve().then(() => je)
  }
], qe = [...Fe], Ve = [
  {
    type: "localization",
    alias: "time.lang.enus",
    name: "English (US)",
    weight: 0,
    meta: {
      culture: "en-us"
    },
    js: () => import("./en-us-HOHmAWzC.js")
  },
  {
    type: "localization",
    alias: "time.lang.engb",
    name: "English (UK)",
    weight: 0,
    meta: {
      culture: "en-gb"
    },
    js: () => import("./en-us-HOHmAWzC.js")
  }
], Je = [...Ve], Ge = [
  ...We,
  ...qe,
  ...Je
], is = (s, t) => {
  t.registerMany(Ge);
};
export {
  is as onInit
};
//# sourceMappingURL=assets.js.map
