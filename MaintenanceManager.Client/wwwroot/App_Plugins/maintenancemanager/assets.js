var St = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
};
var c = (s, t, e) => (St(s, t, "read from private field"), e ? e.call(s) : t.get(s)), _ = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, f = (s, t, e, n) => (St(s, t, "write to private field"), n ? n.call(s, e) : t.set(s, e), e);
import { UmbElementMixin as Xt } from "@umbraco-cms/backoffice/element-api";
import { state as st, property as Qt, customElement as Zt } from "@umbraco-cms/backoffice/external/lit";
import { UmbBaseController as Yt } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken as te } from "@umbraco-cms/backoffice/context-api";
import { UmbBooleanState as wt } from "@umbraco-cms/backoffice/observable-api";
import { UMB_AUTH_CONTEXT as ee } from "@umbraco-cms/backoffice/auth";
import { tryExecuteAndNotify as se } from "@umbraco-cms/backoffice/resources";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const Z = globalThis, ft = Z.ShadowRoot && (Z.ShadyCSS === void 0 || Z.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, $t = Symbol(), Ct = /* @__PURE__ */ new WeakMap();
let zt = class {
  constructor(t, e, n) {
    if (this._$cssResult$ = !0, n !== $t)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (ft && t === void 0) {
      const n = e !== void 0 && e.length === 1;
      n && (t = Ct.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), n && Ct.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const ne = (s) => new zt(typeof s == "string" ? s : s + "", void 0, $t), ie = (s, ...t) => {
  const e = s.length === 1 ? s[0] : t.reduce((n, i, o) => n + ((r) => {
    if (r._$cssResult$ === !0)
      return r.cssText;
    if (typeof r == "number")
      return r;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + r + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + s[o + 1], s[0]);
  return new zt(e, s, $t);
}, re = (s, t) => {
  if (ft)
    s.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const n = document.createElement("style"), i = Z.litNonce;
      i !== void 0 && n.setAttribute("nonce", i), n.textContent = e.cssText, s.appendChild(n);
    }
}, Tt = ft ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const n of t.cssRules)
    e += n.cssText;
  return ne(e);
})(s) : s;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: oe, defineProperty: ae, getOwnPropertyDescriptor: he, getOwnPropertyNames: ce, getOwnPropertySymbols: le, getPrototypeOf: de } = Object, S = globalThis, Mt = S.trustedTypes, ue = Mt ? Mt.emptyScript : "", it = S.reactiveElementPolyfillSupport, j = (s, t) => s, ct = { toAttribute(s, t) {
  switch (t) {
    case Boolean:
      s = s ? ue : null;
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
} }, jt = (s, t) => !oe(s, t), xt = { attribute: !0, type: String, converter: ct, reflect: !1, hasChanged: jt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), S.litPropertyMetadata ?? (S.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class N extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = xt) {
    if (e.state && (e.attribute = !1), this._$Ei(), this.elementProperties.set(t, e), !e.noAccessor) {
      const n = Symbol(), i = this.getPropertyDescriptor(t, n, e);
      i !== void 0 && ae(this.prototype, t, i);
    }
  }
  static getPropertyDescriptor(t, e, n) {
    const { get: i, set: o } = he(this.prototype, t) ?? { get() {
      return this[e];
    }, set(r) {
      this[e] = r;
    } };
    return { get() {
      return i == null ? void 0 : i.call(this);
    }, set(r) {
      const h = i == null ? void 0 : i.call(this);
      o.call(this, r), this.requestUpdate(t, h, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(t) {
    return this.elementProperties.get(t) ?? xt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(j("elementProperties")))
      return;
    const t = de(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(j("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(j("properties"))) {
      const e = this.properties, n = [...ce(e), ...le(e)];
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
        e.unshift(Tt(i));
    } else
      t !== void 0 && e.push(Tt(t));
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
    return re(t, this.constructor.elementStyles), t;
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
      const r = (((o = n.converter) == null ? void 0 : o.toAttribute) !== void 0 ? n.converter : ct).toAttribute(e, n.type);
      this._$Em = t, r == null ? this.removeAttribute(i) : this.setAttribute(i, r), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var o;
    const n = this.constructor, i = n._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const r = n.getPropertyOptions(i), h = typeof r.converter == "function" ? { fromAttribute: r.converter } : ((o = r.converter) == null ? void 0 : o.fromAttribute) !== void 0 ? r.converter : ct;
      this._$Em = i, this[i] = h.fromAttribute(e, r.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, n) {
    if (t !== void 0) {
      if (n ?? (n = this.constructor.getPropertyOptions(t)), !(n.hasChanged ?? jt)(this[t], e))
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
N.elementStyles = [], N.shadowRootOptions = { mode: "open" }, N[j("elementProperties")] = /* @__PURE__ */ new Map(), N[j("finalized")] = /* @__PURE__ */ new Map(), it == null || it({ ReactiveElement: N }), (S.reactiveElementVersions ?? (S.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const I = globalThis, Y = I.trustedTypes, Pt = Y ? Y.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, It = "$lit$", b = `lit$${(Math.random() + "").slice(9)}$`, Bt = "?" + b, pe = `<${Bt}>`, O = document, L = () => O.createComment(""), W = (s) => s === null || typeof s != "object" && typeof s != "function", Lt = Array.isArray, fe = (s) => Lt(s) || typeof (s == null ? void 0 : s[Symbol.iterator]) == "function", rt = `[ 	
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, Ot = /-->/g, Nt = />/g, C = RegExp(`>|${rt}(?:([^\\s"'>=/]+)(${rt}*=${rt}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), Ut = /'/g, Rt = /"/g, Wt = /^(?:script|style|textarea|title)$/i, $e = (s) => (t, ...e) => ({ _$litType$: s, strings: t, values: e }), J = $e(1), R = Symbol.for("lit-noChange"), p = Symbol.for("lit-nothing"), Ht = /* @__PURE__ */ new WeakMap(), M = O.createTreeWalker(O, 129);
function Ft(s, t) {
  if (!Array.isArray(s) || !s.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return Pt !== void 0 ? Pt.createHTML(t) : t;
}
const _e = (s, t) => {
  const e = s.length - 1, n = [];
  let i, o = t === 2 ? "<svg>" : "", r = k;
  for (let h = 0; h < e; h++) {
    const a = s[h];
    let l, u, d = -1, $ = 0;
    for (; $ < a.length && (r.lastIndex = $, u = r.exec(a), u !== null); )
      $ = r.lastIndex, r === k ? u[1] === "!--" ? r = Ot : u[1] !== void 0 ? r = Nt : u[2] !== void 0 ? (Wt.test(u[2]) && (i = RegExp("</" + u[2], "g")), r = C) : u[3] !== void 0 && (r = C) : r === C ? u[0] === ">" ? (r = i ?? k, d = -1) : u[1] === void 0 ? d = -2 : (d = r.lastIndex - u[2].length, l = u[1], r = u[3] === void 0 ? C : u[3] === '"' ? Rt : Ut) : r === Rt || r === Ut ? r = C : r === Ot || r === Nt ? r = k : (r = C, i = void 0);
    const A = r === C && s[h + 1].startsWith("/>") ? " " : "";
    o += r === k ? a + pe : d >= 0 ? (n.push(l), a.slice(0, d) + It + a.slice(d) + b + A) : a + b + (d === -2 ? h : A);
  }
  return [Ft(s, o + (s[e] || "<?>") + (t === 2 ? "</svg>" : "")), n];
};
class F {
  constructor({ strings: t, _$litType$: e }, n) {
    let i;
    this.parts = [];
    let o = 0, r = 0;
    const h = t.length - 1, a = this.parts, [l, u] = _e(t, e);
    if (this.el = F.createElement(l, n), M.currentNode = this.el.content, e === 2) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = M.nextNode()) !== null && a.length < h; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes())
          for (const d of i.getAttributeNames())
            if (d.endsWith(It)) {
              const $ = u[r++], A = i.getAttribute(d).split(b), X = /([.?@])?(.*)/.exec($);
              a.push({ type: 1, index: o, name: X[2], strings: A, ctor: X[1] === "." ? me : X[1] === "?" ? ge : X[1] === "@" ? Ae : nt }), i.removeAttribute(d);
            } else
              d.startsWith(b) && (a.push({ type: 6, index: o }), i.removeAttribute(d));
        if (Wt.test(i.tagName)) {
          const d = i.textContent.split(b), $ = d.length - 1;
          if ($ > 0) {
            i.textContent = Y ? Y.emptyScript : "";
            for (let A = 0; A < $; A++)
              i.append(d[A], L()), M.nextNode(), a.push({ type: 2, index: ++o });
            i.append(d[$], L());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === Bt)
          a.push({ type: 2, index: o });
        else {
          let d = -1;
          for (; (d = i.data.indexOf(b, d + 1)) !== -1; )
            a.push({ type: 7, index: o }), d += b.length - 1;
        }
      o++;
    }
  }
  static createElement(t, e) {
    const n = O.createElement("template");
    return n.innerHTML = t, n;
  }
}
function H(s, t, e = s, n) {
  var r, h;
  if (t === R)
    return t;
  let i = n !== void 0 ? (r = e._$Co) == null ? void 0 : r[n] : e._$Cl;
  const o = W(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== o && ((h = i == null ? void 0 : i._$AO) == null || h.call(i, !1), o === void 0 ? i = void 0 : (i = new o(s), i._$AT(s, e, n)), n !== void 0 ? (e._$Co ?? (e._$Co = []))[n] = i : e._$Cl = i), i !== void 0 && (t = H(s, i._$AS(s, t.values), i, n)), t;
}
class ye {
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
    const { el: { content: e }, parts: n } = this._$AD, i = ((t == null ? void 0 : t.creationScope) ?? O).importNode(e, !0);
    M.currentNode = i;
    let o = M.nextNode(), r = 0, h = 0, a = n[0];
    for (; a !== void 0; ) {
      if (r === a.index) {
        let l;
        a.type === 2 ? l = new K(o, o.nextSibling, this, t) : a.type === 1 ? l = new a.ctor(o, a.name, a.strings, this, t) : a.type === 6 && (l = new be(o, this, t)), this._$AV.push(l), a = n[++h];
      }
      r !== (a == null ? void 0 : a.index) && (o = M.nextNode(), r++);
    }
    return M.currentNode = O, i;
  }
  p(t) {
    let e = 0;
    for (const n of this._$AV)
      n !== void 0 && (n.strings !== void 0 ? (n._$AI(t, n, e), e += n.strings.length - 2) : n._$AI(t[e])), e++;
  }
}
class K {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, n, i) {
    this.type = 2, this._$AH = p, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = n, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = H(this, t, e), W(t) ? t === p || t == null || t === "" ? (this._$AH !== p && this._$AR(), this._$AH = p) : t !== this._$AH && t !== R && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : fe(t) ? this.k(t) : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  _(t) {
    this._$AH !== p && W(this._$AH) ? this._$AA.nextSibling.data = t : this.T(O.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var o;
    const { values: e, _$litType$: n } = t, i = typeof n == "number" ? this._$AC(t) : (n.el === void 0 && (n.el = F.createElement(Ft(n.h, n.h[0]), this.options)), n);
    if (((o = this._$AH) == null ? void 0 : o._$AD) === i)
      this._$AH.p(e);
    else {
      const r = new ye(i, this), h = r.u(this.options);
      r.p(e), this.T(h), this._$AH = r;
    }
  }
  _$AC(t) {
    let e = Ht.get(t.strings);
    return e === void 0 && Ht.set(t.strings, e = new F(t)), e;
  }
  k(t) {
    Lt(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let n, i = 0;
    for (const o of t)
      i === e.length ? e.push(n = new K(this.S(L()), this.S(L()), this, this.options)) : n = e[i], n._$AI(o), i++;
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
class nt {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, n, i, o) {
    this.type = 1, this._$AH = p, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = o, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = p;
  }
  _$AI(t, e = this, n, i) {
    const o = this.strings;
    let r = !1;
    if (o === void 0)
      t = H(this, t, e, 0), r = !W(t) || t !== this._$AH && t !== R, r && (this._$AH = t);
    else {
      const h = t;
      let a, l;
      for (t = o[0], a = 0; a < o.length - 1; a++)
        l = H(this, h[n + a], e, a), l === R && (l = this._$AH[a]), r || (r = !W(l) || l !== this._$AH[a]), l === p ? t = p : t !== p && (t += (l ?? "") + o[a + 1]), this._$AH[a] = l;
    }
    r && !i && this.j(t);
  }
  j(t) {
    t === p ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class me extends nt {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === p ? void 0 : t;
  }
}
class ge extends nt {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== p);
  }
}
class Ae extends nt {
  constructor(t, e, n, i, o) {
    super(t, e, n, i, o), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = H(this, t, e, 0) ?? p) === R)
      return;
    const n = this._$AH, i = t === p && n !== p || t.capture !== n.capture || t.once !== n.once || t.passive !== n.passive, o = t !== p && (n === p || i);
    i && this.element.removeEventListener(this.name, this, n), o && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class be {
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
ot == null || ot(F, K), (I.litHtmlVersions ?? (I.litHtmlVersions = [])).push("3.1.2");
const Ee = (s, t, e) => {
  const n = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = n._$litPart$;
  if (i === void 0) {
    const o = (e == null ? void 0 : e.renderBefore) ?? null;
    n._$litPart$ = i = new K(t.insertBefore(L(), o), o, void 0, e ?? {});
  }
  return i._$AI(s), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class B extends N {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = Ee(e, this.renderRoot, this.renderOptions);
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
var kt;
B._$litElement$ = !0, B.finalized = !0, (kt = globalThis.litElementHydrateSupport) == null || kt.call(globalThis, { LitElement: B });
const at = globalThis.litElementPolyfillSupport;
at == null || at({ LitElement: B });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.4");
class Dt extends Error {
  constructor(t, e, n) {
    super(n), this.name = "ApiError", this.url = e.url, this.status = e.status, this.statusText = e.statusText, this.body = e.body, this.request = t;
  }
}
class ve extends Error {
  constructor(t) {
    super(t), this.name = "CancelError";
  }
  get isCancelled() {
    return !0;
  }
}
var m, g, y, E, x, V, U;
class Se {
  constructor(t) {
    _(this, m, void 0);
    _(this, g, void 0);
    _(this, y, void 0);
    _(this, E, void 0);
    _(this, x, void 0);
    _(this, V, void 0);
    _(this, U, void 0);
    f(this, m, !1), f(this, g, !1), f(this, y, !1), f(this, E, []), f(this, x, new Promise((e, n) => {
      f(this, V, e), f(this, U, n);
      const i = (h) => {
        var a;
        c(this, m) || c(this, g) || c(this, y) || (f(this, m, !0), (a = c(this, V)) == null || a.call(this, h));
      }, o = (h) => {
        var a;
        c(this, m) || c(this, g) || c(this, y) || (f(this, g, !0), (a = c(this, U)) == null || a.call(this, h));
      }, r = (h) => {
        c(this, m) || c(this, g) || c(this, y) || c(this, E).push(h);
      };
      return Object.defineProperty(r, "isResolved", {
        get: () => c(this, m)
      }), Object.defineProperty(r, "isRejected", {
        get: () => c(this, g)
      }), Object.defineProperty(r, "isCancelled", {
        get: () => c(this, y)
      }), t(i, o, r);
    }));
  }
  get [Symbol.toStringTag]() {
    return "Cancellable Promise";
  }
  then(t, e) {
    return c(this, x).then(t, e);
  }
  catch(t) {
    return c(this, x).catch(t);
  }
  finally(t) {
    return c(this, x).finally(t);
  }
  cancel() {
    var t;
    if (!(c(this, m) || c(this, g) || c(this, y))) {
      if (f(this, y, !0), c(this, E).length)
        try {
          for (const e of c(this, E))
            e();
        } catch (e) {
          console.warn("Cancellation threw an error", e);
          return;
        }
      c(this, E).length = 0, (t = c(this, U)) == null || t.call(this, new ve("Request aborted"));
    }
  }
  get isCancelled() {
    return c(this, y);
  }
}
m = new WeakMap(), g = new WeakMap(), y = new WeakMap(), E = new WeakMap(), x = new WeakMap(), V = new WeakMap(), U = new WeakMap();
const lt = {
  BASE: "",
  VERSION: "Latest",
  WITH_CREDENTIALS: !1,
  CREDENTIALS: "include",
  TOKEN: void 0,
  USERNAME: void 0,
  PASSWORD: void 0,
  HEADERS: void 0,
  ENCODE_PATH: void 0
}, _t = (s) => s != null, G = (s) => typeof s == "string", ht = (s) => G(s) && s !== "", yt = (s) => typeof s == "object" && typeof s.type == "string" && typeof s.stream == "function" && typeof s.arrayBuffer == "function" && typeof s.constructor == "function" && typeof s.constructor.name == "string" && /^(Blob|File)$/.test(s.constructor.name) && /^(Blob|File)$/.test(s[Symbol.toStringTag]), Vt = (s) => s instanceof FormData, we = (s) => {
  try {
    return btoa(s);
  } catch {
    return Buffer.from(s).toString("base64");
  }
}, Ce = (s) => {
  const t = [], e = (i, o) => {
    t.push(`${encodeURIComponent(i)}=${encodeURIComponent(String(o))}`);
  }, n = (i, o) => {
    _t(o) && (Array.isArray(o) ? o.forEach((r) => {
      n(i, r);
    }) : typeof o == "object" ? Object.entries(o).forEach(([r, h]) => {
      n(`${i}[${r}]`, h);
    }) : e(i, o));
  };
  return Object.entries(s).forEach(([i, o]) => {
    n(i, o);
  }), t.length > 0 ? `?${t.join("&")}` : "";
}, Te = (s, t) => {
  const e = s.ENCODE_PATH || encodeURI, n = t.url.replace("{api-version}", s.VERSION).replace(/{(.*?)}/g, (o, r) => {
    var h;
    return (h = t.path) != null && h.hasOwnProperty(r) ? e(String(t.path[r])) : o;
  }), i = `${s.BASE}${n}`;
  return t.query ? `${i}${Ce(t.query)}` : i;
}, Me = (s) => {
  if (s.formData) {
    const t = new FormData(), e = (n, i) => {
      G(i) || yt(i) ? t.append(n, i) : t.append(n, JSON.stringify(i));
    };
    return Object.entries(s.formData).filter(([n, i]) => _t(i)).forEach(([n, i]) => {
      Array.isArray(i) ? i.forEach((o) => e(n, o)) : e(n, i);
    }), t;
  }
}, Q = async (s, t) => typeof t == "function" ? t(s) : t, xe = async (s, t) => {
  const e = await Q(t, s.TOKEN), n = await Q(t, s.USERNAME), i = await Q(t, s.PASSWORD), o = await Q(t, s.HEADERS), r = Object.entries({
    Accept: "application/json",
    ...o,
    ...t.headers
  }).filter(([h, a]) => _t(a)).reduce((h, [a, l]) => ({
    ...h,
    [a]: String(l)
  }), {});
  if (ht(e) && (r.Authorization = `Bearer ${e}`), ht(n) && ht(i)) {
    const h = we(`${n}:${i}`);
    r.Authorization = `Basic ${h}`;
  }
  return t.body && (t.mediaType ? r["Content-Type"] = t.mediaType : yt(t.body) ? r["Content-Type"] = t.body.type || "application/octet-stream" : G(t.body) ? r["Content-Type"] = "text/plain" : Vt(t.body) || (r["Content-Type"] = "application/json")), new Headers(r);
}, Pe = (s) => {
  var t;
  if (s.body !== void 0)
    return (t = s.mediaType) != null && t.includes("/json") ? JSON.stringify(s.body) : G(s.body) || yt(s.body) || Vt(s.body) ? s.body : JSON.stringify(s.body);
}, Oe = async (s, t, e, n, i, o, r) => {
  const h = new AbortController(), a = {
    headers: o,
    body: n ?? i,
    method: t.method,
    signal: h.signal
  };
  return s.WITH_CREDENTIALS && (a.credentials = s.CREDENTIALS), r(() => h.abort()), await fetch(e, a);
}, Ne = (s, t) => {
  if (t) {
    const e = s.headers.get(t);
    if (G(e))
      return e;
  }
}, Ue = async (s) => {
  if (s.status !== 204)
    try {
      const t = s.headers.get("Content-Type");
      if (t)
        return ["application/json", "application/problem+json"].some((i) => t.toLowerCase().startsWith(i)) ? await s.json() : await s.text();
    } catch (t) {
      console.error(t);
    }
}, Re = (s, t) => {
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
    throw new Dt(s, t, n);
  if (!t.ok) {
    const i = t.status ?? "unknown", o = t.statusText ?? "unknown", r = (() => {
      try {
        return JSON.stringify(t.body, null, 2);
      } catch {
        return;
      }
    })();
    throw new Dt(
      s,
      t,
      `Generic Error: status: ${i}; status text: ${o}; body: ${r}`
    );
  }
}, He = (s, t) => new Se(async (e, n, i) => {
  try {
    const o = Te(s, t), r = Me(t), h = Pe(t), a = await xe(s, t);
    if (!i.isCancelled) {
      const l = await Oe(s, t, o, h, r, a, i), u = await Ue(l), d = Ne(l, t.responseHeader), $ = {
        url: o,
        ok: l.ok,
        status: l.status,
        statusText: l.statusText,
        body: d ?? u
      };
      Re(t, $), e($.body);
    }
  } catch (o) {
    n(o);
  }
});
class De {
  /**
   * @returns any Success
   * @throws ApiError
   */
  static toggleMode({
    maintenanceMode: t
  }) {
    return He(lt, {
      method: "GET",
      url: "/umbraco/maintenance/api/v1/ToggleMode",
      query: {
        maintenanceMode: t
      }
    });
  }
}
var v, P, q;
class dt extends Yt {
  constructor(e) {
    super(e);
    _(this, v, void 0);
    _(this, P, void 0);
    _(this, q, void 0);
    f(this, v, new wt(!1)), this.inMaintenanceMode = c(this, v).asObservable(), f(this, P, new wt(!1)), this.isFrozen = c(this, P).asObservable(), f(this, q, e), this.provideContext(mt, this), this.consumeContext(ee, (n) => {
      if (n === void 0)
        return;
      const i = () => n.getLatestToken();
      lt.TOKEN = i, lt.WITH_CREDENTIALS = !0;
    });
  }
  async toggleMaintenance() {
    c(this, v).setValue(!c(this, v).getValue()), await se(c(this, q), De.toggleMode({
      maintenanceMode: c(this, v).getValue()
    })), console.log("eeby");
  }
  toggleFrozen() {
    c(this, P).setValue(!c(this, P).getValue()), console.log("deeby");
  }
}
v = new WeakMap(), P = new WeakMap(), q = new WeakMap();
const mt = new te(dt.name), ke = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  MAINTENANCE_CONTEXT_TOKEN: mt,
  MaintenanceContext: dt,
  default: dt
}, Symbol.toStringTag, { value: "Module" }));
var ze = Object.defineProperty, je = Object.getOwnPropertyDescriptor, D = (s, t, e, n) => {
  for (var i = n > 1 ? void 0 : n ? je(t, e) : t, o = s.length - 1, r; o >= 0; o--)
    (r = s[o]) && (i = (n ? r(t, e, i) : r(i)) || i);
  return n && i && ze(t, e, i), i;
}, gt = (s, t, e) => {
  if (!t.has(s))
    throw TypeError("Cannot " + e);
}, tt = (s, t, e) => (gt(s, t, "read from private field"), e ? e.call(s) : t.get(s)), T = (s, t, e) => {
  if (t.has(s))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(s) : t.set(s, e);
}, Ie = (s, t, e, n) => (gt(s, t, "write to private field"), n ? n.call(s, e) : t.set(s, e), e), et = (s, t, e) => (gt(s, t, "access private method"), e), z, At, bt, ut, qt, pt, Jt, Et, Kt, vt, Gt;
let w = class extends Xt(B) {
  constructor() {
    super(), T(this, ut), T(this, pt), T(this, Et), T(this, vt), T(this, z, void 0), this.maintenance = !1, this.frozen = !1, this._loaded = !0, this._status = {
      isInMaintenanceMode: !0,
      isContentFrozen: !0,
      usingWebConfig: !0
    }, this.title = "MaintenanceManager dashboard", T(this, At, () => {
      var s;
      (s = tt(this, z)) == null || s.toggleMaintenance();
    }), T(this, bt, () => {
      var s;
      (s = tt(this, z)) == null || s.toggleFrozen();
    }), this.consumeContext(mt, (s) => {
      Ie(this, z, s), this.observe(s.inMaintenanceMode, (t) => {
        this.maintenance = t, console.log("some words 1");
      }), this.observe(s.isFrozen, (t) => {
        this.frozen = t, console.log("some words 2");
      });
    });
  }
  render() {
    return J`
        <uui-box>${this._loaded ? et(this, pt, Jt).call(this) : et(this, ut, qt).call(this)}</uui-box>`;
  }
};
z = /* @__PURE__ */ new WeakMap();
At = /* @__PURE__ */ new WeakMap();
bt = /* @__PURE__ */ new WeakMap();
ut = /* @__PURE__ */ new WeakSet();
qt = function() {
  return J`
			<uui-loader-bar animationDuration="1.5" style="color: black"></uui-loader-bar>
		`;
};
pt = /* @__PURE__ */ new WeakSet();
Jt = function() {
  return J`
        <div>${this._status.isInMaintenanceMode ? et(this, Et, Kt).call(this) : ""}</div>
        <div>${this._status.isContentFrozen ? et(this, vt, Gt).call(this) : ""}</div>
        `;
};
Et = /* @__PURE__ */ new WeakSet();
Kt = function() {
  return J`
            <uui-button label="Toggle Maintenance" id="clickMaintenance" look="secondary" @click=${tt(this, At)}></uui-button>
        [${this.maintenance}]
         <div class="alert alert-danger maintenanceMode-alert">
                    <i class="icon icon-block"></i>
                    <div>
                        InMaintenanceMode
                    </div>
                </div>
                `;
};
vt = /* @__PURE__ */ new WeakSet();
Gt = function() {
  return J`
            <uui-button label="Toggle Frozen" id="clickFrozen" look="secondary" @click=${tt(this, bt)}></uui-button>
        [${this.frozen}]
        <div class="alert alert-info frozen-alert">
                <i class="icon icon-snow"></i>
                    <div>
                        ContentFrozen
                    </div>
                </div>`;
};
w.styles = ie`
        :host {
            display: block;
            padding: 20px;
        }
    `;
D([
  st()
], w.prototype, "maintenance", 2);
D([
  st()
], w.prototype, "frozen", 2);
D([
  st()
], w.prototype, "_loaded", 2);
D([
  st()
], w.prototype, "_status", 2);
D([
  Qt()
], w.prototype, "title", 2);
w = D([
  Zt("maintenancemanager-dashboard")
], w);
const Be = [
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
], Le = [...Be], We = [
  {
    type: "globalContext",
    alias: "maintenance.context",
    name: "maintenance context",
    js: () => Promise.resolve().then(() => ke)
  }
], Fe = [...We], Ve = [
  ...Le,
  ...Fe
], es = (s, t) => {
  t.registerMany(Ve);
};
export {
  es as onInit
};
//# sourceMappingURL=assets.js.map
