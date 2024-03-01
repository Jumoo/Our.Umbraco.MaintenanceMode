var Pt = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var l = (s, t, e) => (Pt(s, t, "read from private field"), e ? e.call(s) : t.get(s)), $ = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, f = (s, t, e, i) => (Pt(s, t, "write to private field"), i ? i.call(s, e) : t.set(s, e), e);
import { UmbElementMixin as ce } from "@umbraco-cms/backoffice/element-api";
import { state as mt, property as le, customElement as he } from "@umbraco-cms/backoffice/external/lit";
import { UmbBaseController as de } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as ue } from "@umbraco-cms/backoffice/context-api";
import { UmbObjectState as Nt } from "@umbraco-cms/backoffice/observable-api";
import { UMB_AUTH_CONTEXT as pe } from "@umbraco-cms/backoffice/auth";
import { tryExecuteAndNotify as W } from "@umbraco-cms/backoffice/resources";
import { UmbModalToken as fe, UMB_MODAL_MANAGER_CONTEXT as ge } from "@umbraco-cms/backoffice/modal";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const nt = globalThis, $t = nt.ShadowRoot && (nt.ShadyCSS === void 0 || nt.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, yt = Symbol(), kt = /* @__PURE__ */ new WeakMap();
let Vt = class {
  constructor(t, e, i) {
    if (this._$cssResult$ = !0, i !== yt)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if ($t && t === void 0) {
      const i = e !== void 0 && e.length === 1;
      i && (t = kt.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), i && kt.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const me = (s) => new Vt(typeof s == "string" ? s : s + "", void 0, yt), $e = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((i, n, o) => i + ((r) => {
    if (r._$cssResult$ === !0)
      return r.cssText;
    if (typeof r == "number")
      return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(n) + s[o + 1], s[0]);
  return new Vt(e, s, yt);
}, ye = (s, t) => {
  if ($t)
    s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const i = document.createElement("style"), n = nt.litNonce;
      n !== void 0 && i.setAttribute("nonce", n), i.textContent = e.cssText, s.appendChild(i);
    }
}, Rt = $t ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const i of t.cssRules)
    e += i.cssText;
  return me(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: _e, defineProperty: be, getOwnPropertyDescriptor: Ae, getOwnPropertyNames: ve, getOwnPropertySymbols: Se, getPrototypeOf: Ee } = Object, x = globalThis, Ht = x.trustedTypes, we = Ht ? Ht.emptyScript : "", at = x.reactiveElementPolyfillSupport, V = (s, t) => s, ut = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? we : null;
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
} }, Gt = (s, t) => !_e(s, t), zt = { attribute: !0, type: String, converter: ut, reflect: !1, hasChanged: Gt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), x.litPropertyMetadata ?? (x.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class z extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = zt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const i = Symbol(), n = this.getPropertyDescriptor(t, i, e);
      n !== void 0 && be(this.prototype, t, n);
    }
  }
  static getPropertyDescriptor(t, e, i) {
    const { get: n, set: o } = Ae(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get() {
      return n == null ? void 0 : n.call(this);
    }, set(r) {
      const c = n == null ? void 0 : n.call(this);
      o.call(this, r), this.requestUpdate(t, c, i);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? zt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(V("elementProperties")))
      return;
    const t = Ee(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(V("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(V("properties"))) {
      const e = this.properties, i = [...ve(e), ...Se(e)];
      for (const n of i)
        this.createProperty(n, e[n]);
    }
    const t = this[Symbol.metadata];
    if (t !== null) {
      const e = litPropertyMetadata.get(t);
      if (e !== void 0)
        for (const [i, n] of e)
          this.elementProperties.set(i, n);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [e, i] of this.elementProperties) {
      const n = this._$Eu(e, i);
      n !== void 0 && this._$Eh.set(n, e);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(t) {
    const e = [];
    if (Array.isArray(t)) {
      const i = new Set(t.flat(1 / 0).reverse());
      for (const n of i)
        e.unshift(Rt(n));
    } else
      t !== void 0 && e.push(Rt(t));
    return e;
  }
  static _$Eu(t, e) {
    const i = e.attribute;
    return i === !1 ? void 0 : typeof i == "string" ? i : typeof t == "string" ? t.toLowerCase() : void 0;
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
    for (const i of e.keys())
      this.hasOwnProperty(i) && (t.set(i, this[i]), delete this[i]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return ye(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostConnected) == null ? void 0 : i.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var i;
      return (i = e.hostDisconnected) == null ? void 0 : i.call(e);
    });
  }
  attributeChangedCallback(t, e, i) {
    this._$AK(t, i);
  }
  _$EC(t, e) {
    var o;
    const i = this.constructor.elementProperties.get(t), n = this.constructor._$Eu(t, i);
    if (n !== void 0 && i.reflect === !0) {
      const r = (((o = i.converter) == null ? void 0 : o.toAttribute) !== void 0 ? i.converter : ut).toAttribute(e, i.type);
      this._$Em = t, r == null ? this.removeAttribute(n) : this.setAttribute(n, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o;
    const i = this.constructor, n = i._$Eh.get(t);
    if (n !== void 0 && this._$Em !== n) {
      const r = i.getPropertyOptions(n), c = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((o = r.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? r.converter : ut;
      this._$Em = n, this[n] = c.fromAttribute(e, r.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, i) {
    if (t !== void 0) {
      if (i ?? (i = this.constructor.getPropertyOptions(t)), !(i.hasChanged ?? Gt)(this[t], e))
        return;
      this.P(t, e, i);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, e, i) {
    this._$AL.has(t) || this._$AL.set(t, e), i.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
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
    var i;
    if (!this.isUpdatePending)
      return;
    if (!this.hasUpdated) {
      if (this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this._$Ep) {
        for (const [o, r] of this._$Ep)
          this[o] = r;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0)
        for (const [o, r] of n)
          r.wrapped !== !0 || this._$AL.has(o) || this[o] === void 0 || this.P(o, this[o], r);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (i = this._$EO) == null || i.forEach((n) => {
        var o;
        return (o = n.hostUpdate) == null ? void 0 : o.call(n);
      }), this.update(e)) : this._$EU();
    } catch (n) {
      throw t = !1, this._$EU(), n;
    }
    t && this._$AE(e);
  }
  willUpdate(t) {
  }
  _$AE(t) {
    var e;
    (e = this._$EO) == null || e.forEach((i) => {
      var n;
      return (n = i.hostUpdated) == null ? void 0 : n.call(i);
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
z.elementStyles = [], z.shadowRootOptions = { mode: "open" }, z[V("elementProperties")] = /* @__PURE__ */ new Map(), z[V("finalized")] = /* @__PURE__ */ new Map(), at == null || at({ ReactiveElement: z }), (x.reactiveElementVersions ?? (x.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const G = globalThis, rt = G.trustedTypes, jt = rt ? rt.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, Jt = "$lit$", w = `lit$${(Math.random() + "").slice(9)}$`, Kt = "?" + w, Ce = `<${Kt}>`, k = document, K = () => k.createComment(""), X = (s) => s === null || typeof s != "object" && typeof s != "function", Xt = Array.isArray, Te = (s) => Xt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", ct = `[ 	
\f\r]`, F = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Dt = /-->/g, Bt = />/g, U = RegExp(`>|${ct}(?:([^\\s"'>=/]+)(${ct}*=${ct}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), It = /'/g, Lt = /"/g, Qt = /^(?:script|style|textarea|title)$/i, Me = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), O = Me(1), I = Symbol.for("lit-noChange"), u = Symbol.for("lit-nothing"), Wt = /* @__PURE__ */ new WeakMap(), P = k.createTreeWalker(k, 129);
function Zt(s, t) {
  if (!Array.isArray(s) || !s.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return jt !== void 0 ? jt.createHTML(t) : t;
}
const xe = (s, t) => {
  const e = s.length - 1, i = [];
  let n, o = t === 2 ? "<svg>" : "", r = F;
  for (let c = 0; c < e; c++) {
    const a = s[c];
    let h, p, d = -1, g = 0;
    for (; g < a.length && (r.lastIndex = g, p = r.exec(a), p !== null); )
      g = r.lastIndex, r === F ? p[1] === "!--" ? r = Dt : p[1] !== void 0 ? r = Bt : p[2] !== void 0 ? (Qt.test(p[2]) && (n = RegExp("</" + p[2], "g")), r = U) : p[3] !== void 0 && (r = U) : r === U ? p[0] === ">" ? (r = n ?? F, d = -1) : p[1] === void 0 ? d = -2 : (d = r.lastIndex - p[2].length, h = p[1], r = p[3] === void 0 ? U : p[3] === '"' ? Lt : It) : r === Lt || r === It ? r = U : r === Dt || r === Bt ? r = F : (r = U, n = void 0);
    const S = r === U && s[c + 1].startsWith("/>") ? " " : "";
    o += r === F ? a + Ce : d >= 0 ? (i.push(h), a.slice(0, d) + Jt + a.slice(d) + w + S) : a + w + (d === -2 ? c : S);
  }
  return [Zt(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : "")), i];
};
class Q {
  constructor({ strings: t, _$litType$: e }, i) {
    let n;
    this.parts = [];
    let o = 0, r = 0;
    const c = t.length - 1, a = this.parts, [h, p] = xe(t, e);
    if (this.el = Q.createElement(h, i), P.currentNode = this.el.content, e === 2) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (n = P.nextNode()) !== null && a.length < c; ) {
      if (n.nodeType === 1) {
        if (n.hasAttributes())
          for (const d of n.getAttributeNames())
            if (d.endsWith(Jt)) {
              const g = p[r++], S = n.getAttribute(d).split(w), st = /([.?@])?(.*)/.exec(g);
              a.push({ type: 1, index: o, name: st[2], strings: S, ctor: st[1] === "." ? Ue : st[1] === "?" ? Pe : st[1] === "@" ? Ne : ot }), n.removeAttribute(d);
            } else
              d.startsWith(w) && (a.push({ type: 6, index: o }), n.removeAttribute(d));
        if (Qt.test(n.tagName)) {
          const d = n.textContent.split(w), g = d.length - 1;
          if (g > 0) {
            n.textContent = rt ? rt.emptyScript : "";
            for (let S = 0; S < g; S++)
              n.append(d[S], K()), P.nextNode(), a.push({ type: 2, index: ++o });
            n.append(d[g], K());
          }
        }
      } else if (n.nodeType === 8)
        if (n.data === Kt)
          a.push({ type: 2, index: o });
        else {
          let d = -1;
          for (; (d = n.data.indexOf(w, d + 1)) !== -1; )
            a.push({ type: 7, index: o }), d += w.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const i = k.createElement("template");
    return i.innerHTML = t, i;
  }
}
function L(s, t, e = s, i) {
  var r, c;
  if (t === I)
    return t;
  let n = i !== void 0 ? (r = e._$Co) == null ? void 0 : r[i] : e._$Cl;
  const o = X(t) ? void 0 : t._$litDirective$;
  return (n == null ? void 0 : n.constructor) !== o && ((c = n == null ? void 0 : n._$AO) == null || c.call(n, !1), o === void 0 ? n = void 0 : (n = new o(s), n._$AT(s, e, i)), i !== void 0 ? (e._$Co ?? (e._$Co = []))[i] = n : e._$Cl = n), n !== void 0 && (t = L(s, n._$AS(s, t.values), n, i)), t;
}
class Oe {
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
    const { el: { content: e }, parts: i } = this._$AD, n = ((t == null ? void 0 : t.creationScope) ?? k).importNode(e, !0);
    P.currentNode = n;
    let o = P.nextNode(), r = 0, c = 0, a = i[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let h;
        a.type === 2 ? h = new Y(o, o.nextSibling, this, t) : a.type === 1 ? h = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (h = new ke(o, this, t)), this._$AV.push(h), a = i[++c];
      }
      r !== (a == null ? void 0 : a.index) && (o = P.nextNode(), r++);
    }
    return P.currentNode = k, n;
  }
  p(t) {
    let e = 0;
    for (const i of this._$AV)
      i !== void 0 && (i.strings !== void 0 ? (i._$AI(t, i, e), e += i.strings.length - 2) : i._$AI(t[e])), e++;
  }
}
class Y {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, i, n) {
    this.type = 2, this._$AH = u, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = i, this.options = n, this._$Cv = (n == null ? void 0 : n.isConnected) ?? !0;
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
    t = L(this, t, e), X(t) ? t === u || t == null || t === "" ? (this._$AH !== u && this._$AR(), this._$AH = u) : t !== this._$AH && t !== I && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Te(t) ? this.k(t) : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  _(t) {
    this._$AH !== u && X(this._$AH) ? this._$AA.nextSibling.data = t : this.T(k.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: i } = t, n = typeof i == "number" ? this._$AC(t) : (i.el === void 0 && (i.el = Q.createElement(Zt(i.h, i.h[0]), this.options)), i);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === n)
      this._$AH.p(e);
    else {
      const r = new Oe(n, this), c = r.u(this.options);
      r.p(e), this.T(c), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Wt.get(t.strings);
    return e === void 0 && Wt.set(t.strings, e = new Q(t)), e;
  }
  k(t) {
    Xt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let i, n = 0;
    for (const o of t)
      n === e.length ? e.push(i = new Y(this.S(K()), this.S(K()), this, this.options)) : i = e[n], i._$AI(o), n++;
    n < e.length && (this._$AR(i && i._$AB.nextSibling, n), e.length = n);
  }
  _$AR(t = this._$AA.nextSibling, e) {
    var i;
    for ((i = this._$AP) == null ? void 0 : i.call(this, !1, !0, e); t && t !== this._$AB; ) {
      const n = t.nextSibling;
      t.remove(), t = n;
    }
  }
  setConnected(t) {
    var e;
    this._$AM === void 0 && (this._$Cv = t, (e = this._$AP) == null || e.call(this, t));
  }
}
class ot {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, i, n, o) {
    this.type = 1, this._$AH = u, this._$AN = void 0, this.element = t, this.name = e, this._$AM = n, this.options = o, i.length > 2 || i[0] !== "" || i[1] !== "" ? (this._$AH = Array(i.length - 1).fill(new String()), this.strings = i) : this._$AH = u;
  }
  _$AI(t, e = this, i, n) {
    const o = this.strings;
    let r = !1;
    if (o === void 0)
      t = L(this, t, e, 0), r = !X(t) || t !== this._$AH && t !== I, r && (this._$AH = t);
    else {
      const c = t;
      let a, h;
      for (t = o[0], a = 0; a < o.length - 1; a++)
        h = L(this, c[i + a], e, a), h === I && (h = this._$AH[a]), r || (r = !X(h) || h !== this._$AH[a]), h === u ? t = u : t !== u && (t += (h ?? "") + o[a + 1]), this._$AH[a] = h;
    }
    r && !n && this.j(t);
  }
  j(t) {
    t === u ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class Ue extends ot {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === u ? void 0 : t;
  }
}
class Pe extends ot {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== u);
  }
}
class Ne extends ot {
  constructor(t, e, i, n, o) {
    super(t, e, i, n, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = L(this, t, e, 0) ?? u) === I)
      return;
    const i = this._$AH, n = t === u && i !== u || t.capture !== i.capture || t.once !== i.once || t.passive !== i.passive, o = t !== u && (i === u || n);
    n && this.element.removeEventListener(this.name, this, i), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ke {
  constructor(t, e, i) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = i;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    L(this, t);
  }
}
const lt = G.litHtmlPolyfillSupport;
lt == null || lt(Q, Y), (G.litHtmlVersions ?? (G.litHtmlVersions = [])).push("3.1.2");
const Re = (s, t, e) => {
  const i = (e == null ? void 0 : e.renderBefore) ?? t;
  let n = i._$litPart$;
  if (n === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    i._$litPart$ = n = new Y(t.insertBefore(K(), o), o, void 0, e ?? {});
  }
  return n._$AI(s), n;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class J extends z {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Re(e, this.renderRoot, this.renderOptions);
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
    return I;
  }
}
var qt;
J._$litElement$ = !0, J.finalized = !0, (qt = globalThis.litElementHydrateSupport) == null || qt.call(globalThis, { LitElement: J });
const ht = globalThis.litElementPolyfillSupport;
ht == null || ht({ LitElement: J });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.4");
class Ft extends Error {
  constructor(t, e, i) {
    super(i), this.name = "ApiError", this.url = e.url, this.status = e.status, this.statusText = e.statusText, this.body = e.body, this.request = t;
  }
}
class He extends Error {
  constructor(t) {
    super(t), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
var _, b, y, T, N, Z, B;
class ze {
  constructor(t) {
    $(this, _, void 0);
    $(this, b, void 0);
    $(this, y, void 0);
    $(this, T, void 0);
    $(this, N, void 0);
    $(this, Z, void 0);
    $(this, B, void 0);
    f(this, _, !1), f(this, b, !1), f(this, y, !1), f(this, T, []), f(this, N, new Promise((e, i) => {
      f(this, Z, e), f(this, B, i);
      const n = (c) => {
        var a;
        l(this, _) || l(this, b) || l(this, y) || (f(this, _, !0), (a = l(this, Z)) == null || a.call(this, c));
      }, o = (c) => {
        var a;
        l(this, _) || l(this, b) || l(this, y) || (f(this, b, !0), (a = l(this, B)) == null || a.call(this, c));
      }, r = (c) => {
        l(this, _) || l(this, b) || l(this, y) || l(this, T).push(c);
      };
      return Object.defineProperty(r, "isResolved", {
        get: () => l(this, _)
      }), Object.defineProperty(r, "isRejected", {
        get: () => l(this, b)
      }), Object.defineProperty(r, "isCancelled", {
        get: () => l(this, y)
      }), t(n, o, r);
    }));
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(t, e) {
    return l(this, N).then(t, e);
  }
  catch(t) {
    return l(this, N).catch(t);
  }
  finally(t) {
    return l(this, N).finally(t);
  }
  cancel() {
    var t;
    if (!(l(this, _) || l(this, b) || l(this, y))) {
      if (f(this, y, !0), l(this, T).length)
        try {
          for (const e of l(this, T))
            e();
        } catch (e) {
          console.warn("Cancellation threw an error", e);
          return;
        }
      l(this, T).length = 0, (t = l(this, B)) == null || t.call(this, new He("Request aborted"));
    }
  }
  get isCancelled() {
    return l(this, y);
  }
}
_ = new WeakMap(), b = new WeakMap(), y = new WeakMap(), T = new WeakMap(), N = new WeakMap(), Z = new WeakMap(), B = new WeakMap();
const E = {
  BASE: "",
  VERSION: "Latest",
  WITH_CREDENTIALS: !1,
  CREDENTIALS: "include",
  TOKEN: void 0,
  USERNAME: void 0,
  PASSWORD: void 0,
  HEADERS: void 0,
  ENCODE_PATH: void 0
}, _t = (s) => s != null, tt = (s) => typeof s == "string", dt = (s) => tt(s) && s !== "", bt = (s) => typeof s == "object" && typeof s.type == "string" && typeof s.stream == "function" && typeof s.arrayBuffer == "function" && typeof s.constructor == "function" && typeof s.constructor.name == "string" && /^(Blob|File)$/.test(s.constructor.name) && /^(Blob|File)$/.test(s[Symbol.toStringTag]), Yt = (s) => s instanceof FormData, je = (s) => {
  try {
    return btoa(s);
  } catch {
    return Buffer.from(s).toString("base64");
  }
}, De = (s) => {
  const t = [], e = (n, o) => {
    t.push(`${encodeURIComponent(n)}=${encodeURIComponent(String(o))}`);
  }, i = (n, o) => {
    _t(o) && (Array.isArray(o) ? o.forEach((r) => {
      i(n, r);
    }) : typeof o == "object" ? Object.entries(o).forEach(([r, c]) => {
      i(`${n}[${r}]`, c);
    }) : e(n, o));
  };
  return Object.entries(s).forEach(([n, o]) => {
    i(n, o);
  }), t.length > 0 ? `?${t.join("&")}` : "";
}, Be = (s, t) => {
  const e = s.ENCODE_PATH || encodeURI, i = t.url.replace("{api-version}", s.VERSION).replace(/{(.*?)}/g, (o, r) => {
    var c;
    return (c = t.path) != null && c.hasOwnProperty(r) ? e(String(t.path[r])) : o;
  }), n = `${s.BASE}${i}`;
  return t.query ? `${n}${De(t.query)}` : n;
}, Ie = (s) => {
  if (s.formData) {
    const t = new FormData(), e = (i, n) => {
      tt(n) || bt(n) ? t.append(i, n) : t.append(i, JSON.stringify(n));
    };
    return Object.entries(s.formData).filter(([i, n]) => _t(n)).forEach(([i, n]) => {
      Array.isArray(n) ? n.forEach((o) => e(i, o)) : e(i, n);
    }), t;
  }
}, it = async (s, t) => typeof t == "function" ? t(s) : t, Le = async (s, t) => {
  const e = await it(t, s.TOKEN), i = await it(t, s.USERNAME), n = await it(t, s.PASSWORD), o = await it(t, s.HEADERS), r = Object.entries({
    Accept: "application/json",
    ...o,
    ...t.headers
  }).filter(([c, a]) => _t(a)).reduce((c, [a, h]) => ({
    ...c,
    [a]: String(h)
  }), {});
  if (dt(e) && (r.Authorization = `Bearer ${e}`), dt(i) && dt(n)) {
    const c = je(`${i}:${n}`);
    r.Authorization = `Basic ${c}`;
  }
  return t.body && (t.mediaType ? r["Content-Type"] = t.mediaType : bt(t.body) ? r["Content-Type"] = t.body.type || "application/octet-stream" : tt(t.body) ? r["Content-Type"] = "text/plain" : Yt(t.body) || (r["Content-Type"] = "application/json")), new Headers(r);
}, We = (s) => {
  var t;
  if (s.body !== void 0)
    return (t = s.mediaType) != null && t.includes("/json") ? JSON.stringify(s.body) : tt(s.body) || bt(s.body) || Yt(s.body) ? s.body : JSON.stringify(s.body);
}, Fe = async (s, t, e, i, n, o, r) => {
  const c = new AbortController(), a = {
    headers: o,
    body: i ?? n,
    method: t.method,
    signal: c.signal
  };
  return s.WITH_CREDENTIALS && (a.credentials = s.CREDENTIALS), r(() => c.abort()), await fetch(e, a);
}, qe = (s, t) => {
  if (t) {
    const e = s.headers.get(t);
    if (tt(e))
      return e;
  }
}, Ve = async (s) => {
  if (s.status !== 204)
    try {
      const t = s.headers.get("Content-Type");
      if (t)
        return ["application/json", "application/problem+json"].some((n) => t.toLowerCase().startsWith(n)) ? await s.json() : await s.text();
    } catch (t) {
      console.error(t);
    }
}, Ge = (s, t) => {
  const i = {
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    500: "Internal Server Error",
    502: "Bad Gateway",
    503: "Service Unavailable",
    ...s.errors
  }[t.status];
  if (i)
    throw new Ft(s, t, i);
  if (!t.ok) {
    const n = t.status ?? "unknown", o = t.statusText ?? "unknown", r = (() => {
      try {
        return JSON.stringify(t.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new Ft(
      s,
      t,
      `Generic Error: status: ${n}; status text: ${o}; body: ${r}`
    );
  }
}, H = (s, t) => new ze(async (e, i, n) => {
  try {
    const o = Be(s, t), r = Ie(t), c = We(t), a = await Le(s, t);
    if (!n.isCancelled) {
      const h = await Fe(s, t, o, c, r, a, n), p = await Ve(h), d = qe(h, t.responseHeader), g = {
        url: o,
        ok: h.ok,
        status: h.status,
        statusText: h.statusText,
        body: d ?? p
      };
      Ge(t, g), e(g.body);
    }
  } catch (o) {
    i(o);
  }
});
class q {
  /**
   * @returns any Success
   * @throws ApiError
   */
  static getSettings() {
    return H(E, {
      method: "GET",
      url: "/umbraco/maintenance/api/v1/GetSettings"
    });
  }
  /**
   * @returns any Success
   * @throws ApiError
   */
  static getStatus() {
    return H(E, {
      method: "GET",
      url: "/umbraco/maintenance/api/v1/GetStatus"
    });
  }
  /**
   * @returns any Success
   * @throws ApiError
   */
  static saveSettings({
    requestBody: t
  }) {
    return H(E, {
      method: "POST",
      url: "/umbraco/maintenance/api/v1/SaveSettings",
      body: t,
      mediaType: "application/json"
    });
  }
  /**
   * @returns any Success
   * @throws ApiError
   */
  static toggleAccess({
    maintenanceMode: t
  }) {
    return H(E, {
      method: "GET",
      url: "/umbraco/maintenance/api/v1/ToggleAccess",
      query: {
        maintenanceMode: t
      }
    });
  }
  /**
   * @returns any Success
   * @throws ApiError
   */
  static toggleFrozen({
    maintenanceMode: t
  }) {
    return H(E, {
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
    return H(E, {
      method: "GET",
      url: "/umbraco/maintenance/api/v1/ToggleMode",
      query: {
        maintenanceMode: t
      }
    });
  }
}
var A, M, v;
class pt extends de {
  constructor(e) {
    super(e);
    $(this, A, void 0);
    $(this, M, void 0);
    $(this, v, void 0);
    f(this, A, new Nt(void 0)), this.status = l(this, A).asObservable(), f(this, M, new Nt(void 0)), this.settings = l(this, M).asObservable(), f(this, v, e), this.provideContext(At, this), this.consumeContext(pe, (i) => {
      if (i === void 0)
        return;
      const n = () => i.getLatestToken();
      E.TOKEN = n, E.WITH_CREDENTIALS = !0, this.getStatus();
    });
  }
  async getStatus() {
    let e = await W(l(this, v), q.getStatus());
    console.log(e), e.data != null && l(this, A).setValue(e.data);
  }
  async getSettings() {
    let e = await W(l(this, v), q.getSettings());
    console.log(e), e.data != null && l(this, M).setValue(e.data);
  }
  async toggleMaintenance() {
    var e;
    await W(l(this, v), q.toggleMode({
      maintenanceMode: !((e = l(this, A).getValue()) != null && e.isInMaintenanceMode)
    })), await this.getStatus(), console.log("eeby");
  }
  async toggleFrozen() {
    var e;
    await W(l(this, v), q.toggleFrozen({
      maintenanceMode: !((e = l(this, A).getValue()) != null && e.isContentFrozen)
    })), await this.getStatus(), console.log("deeby");
  }
  async toggleBackofficeAccess() {
    var e, i, n;
    console.log(l(this, A).getValue()), await W(l(this, v), q.toggleAccess({
      maintenanceMode: !((n = (i = (e = l(this, A)) == null ? void 0 : e.getValue()) == null ? void 0 : i.settings) != null && n.allowBackOfficeUsersThrough)
    })), await this.getStatus();
  }
  //////////////
  updateTemplateName(e) {
    l(this, M).update({ templateName: e });
  }
  updateUnfrozenUsers(e) {
    l(this, M).update({ unfrozenUsers: e });
  }
}
A = new WeakMap(), M = new WeakMap(), v = new WeakMap();
const At = new ue(pt.name), Je = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MAINTENANCE_CONTEXT_TOKEN: At,
  MaintenanceContext: pt,
  default: pt
}, Symbol.toStringTag, { value: "Module" })), Ke = new fe(
  "settings.modal",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
);
var Xe = Object.defineProperty, Qe = Object.getOwnPropertyDescriptor, et = (s, t, e, i) => {
  for (var n = i > 1 ? void 0 : i ? Qe(t, e) : t, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (n = (i ? r(t, e, n) : r(n)) || n);
  return i && n && Xe(t, e, n), n;
}, vt = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
}, D = (s, t, e) => (vt(s, t, "read from private field"), e ? e.call(s) : t.get(s)), m = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, Ze = (s, t, e, i) => (vt(s, t, "write to private field"), i ? i.call(s, e) : t.set(s, e), e), C = (s, t, e) => (vt(s, t, "access private method"), e), j, St, Et, wt, Ct, te, ft, ee, gt, se, Tt, ie, Mt, ne, xt, re, Ot, oe, Ut, ae;
let R = class extends ce(J) {
  constructor() {
    super(), m(this, Ct), m(this, ft), m(this, gt), m(this, Tt), m(this, Mt), m(this, xt), m(this, Ot), m(this, Ut), m(this, j, void 0), this._loaded = !0, this._status = {
      isInMaintenanceMode: !0,
      isContentFrozen: !0,
      usingWebConfig: !0,
      settings: {
        allowBackOfficeUsersThrough: !0
      }
    }, this.title = "MaintenanceManager dashboard", m(this, St, () => {
      var s;
      (s = D(this, j)) == null || s.toggleMaintenance();
    }), m(this, Et, () => {
      var s;
      (s = D(this, j)) == null || s.toggleFrozen();
    }), m(this, wt, () => {
      var s;
      (s = D(this, j)) == null || s.toggleBackofficeAccess();
    }), this.consumeContext(ge, (s) => {
      this._modalContext = s;
    }), this.consumeContext(At, (s) => {
      Ze(this, j, s), this.observe(s.status, (t) => {
        this.status = t;
      });
    });
  }
  render() {
    return O`
        <uui-box>${this._loaded ? C(this, gt, se).call(this) : C(this, ft, ee).call(this)}</uui-box>`;
  }
};
j = /* @__PURE__ */ new WeakMap();
St = /* @__PURE__ */ new WeakMap();
Et = /* @__PURE__ */ new WeakMap();
wt = /* @__PURE__ */ new WeakMap();
Ct = /* @__PURE__ */ new WeakSet();
te = async function() {
  var e;
  const s = (e = this._modalContext) == null ? void 0 : e.open(Ke), t = await (s == null ? void 0 : s.onSubmit());
  t && console.log("data", t);
};
ft = /* @__PURE__ */ new WeakSet();
ee = function() {
  return O`
			<uui-loader-bar animationDuration="1.5" style="color: black"></uui-loader-bar>
		`;
};
gt = /* @__PURE__ */ new WeakSet();
se = function() {
  return O`
        <div>${C(this, Tt, ie).call(this)}</div>
        <div>${C(this, Mt, ne).call(this)}</div>
        <div>${C(this, xt, re).call(this)}</div>
        <div>${C(this, Ot, oe).call(this)}</div>
        <div>${C(this, Ut, ae).call(this)}</div>
        `;
};
Tt = /* @__PURE__ */ new WeakSet();
ie = function() {
  return O`
        <div class="buttons">
            <uui-button label="Toggle Maintenance" id="clickMaintenance" look="primary" color="positive" @click=${D(this, St)}></uui-button>
            <uui-button label="Toggle Frozen" id="clickFrozen" look="primary" color="warning" @click=${D(this, Et)}></uui-button>
        </div>
        `;
};
Mt = /* @__PURE__ */ new WeakSet();
ne = function() {
  var s;
  return (s = this.status) != null && s.isInMaintenanceMode ? O`
         <div class="alert alert-danger maintenanceMode-alert">
            <uui-icon name="icon-block"></uui-icon>
            <div>
                <umb-localize key="maintain_onMsg"></umb-localize>
            </div>
        </div>
                ` : u;
};
xt = /* @__PURE__ */ new WeakSet();
re = function() {
  var s;
  return (s = this.status) != null && s.isContentFrozen ? O`
        <div class="alert alert-info maintenanceMode-alert">
            <uui-icon name="icon-snow"></uui-icon>
            <div>
                <umb-localize key="maintain_frozenMsg"></umb-localize>
            </div>
        </div>
        ` : u;
};
Ot = /* @__PURE__ */ new WeakSet();
oe = function() {
  var s, t;
  return O`
        <div class="switch">
            <umb-input-toggle 
                .checked=${((t = (s = this.status) == null ? void 0 : s.settings) == null ? void 0 : t.allowBackOfficeUsersThrough) ?? !1}
                .showLabels=${!0} 
                labelOn="Allow backoffice users to view site" 
                labelOff="Don't allow backoffice users to view site"
                @click=${D(this, wt)}>
            </umb-input-toggle>
        </div>
        `;
};
Ut = /* @__PURE__ */ new WeakSet();
ae = function() {
  return O`
            <div class="settings">
                <uui-button label="Settings" look="primary" colour="positive"
                @click=${C(this, Ct, te)}></uui-button>
            </div>
        `;
};
R.styles = $e`
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

        .switch {
            display: flex;
            justify-content: center;
        }

        .settings {
            display: flex;
            justify-content: end;
        }

        .alert-danger {
            background-color: var(--uui-color-danger);
            color: var(--uui-color-danger-contrast);
        }

        .alert-info {
            background-color: var(--uui-palette-malibu);
            color: var(--uui-color-danger-contrast);
        }

        .maintenanceMode-alert {
            padding: 2em;
            margin: 2em;
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
et([
  mt()
], R.prototype, "status", 2);
et([
  mt()
], R.prototype, "_loaded", 2);
et([
  mt()
], R.prototype, "_status", 2);
et([
  le()
], R.prototype, "title", 2);
R = et([
  he("maintenancemanager-dashboard")
], R);
const Ye = [
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
], ts = [...Ye], es = [
  {
    type: "globalContext",
    alias: "maintenance.context",
    name: "maintenance context",
    js: () => Promise.resolve().then(() => Je)
  }
], ss = [...es], is = [
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
], ns = [...is], rs = [
  {
    type: "modal",
    alias: "settings.modal",
    name: "Settings modal",
    js: () => import("./settings-modal-element-Lcwm3R4Z.js")
  }
], os = [...rs], as = [
  ...ts,
  ...ss,
  ...ns,
  ...os
], ys = (s, t) => {
  t.registerMany(as);
};
export {
  At as M,
  ys as o
};
//# sourceMappingURL=index-wSYa5mrQ.js.map
