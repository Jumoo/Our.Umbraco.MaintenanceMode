import { UmbElementMixin as Nt } from "@umbraco-cms/backoffice/element-api";
import { state as J, property as Ht, customElement as Rt } from "@umbraco-cms/backoffice/external/lit";
import { MAINTENANCE_CONTEXT_TOKEN as zt } from "./context-H6KD_sQ7.js";
import { UmbModalToken as Dt, UMB_MODAL_MANAGER_CONTEXT as Wt } from "@umbraco-cms/backoffice/modal";
import "@umbraco-cms/backoffice/class-api";
import "@umbraco-cms/backoffice/context-api";
import "@umbraco-cms/backoffice/observable-api";
import "@umbraco-cms/backoffice/auth";
import "@umbraco-cms/backoffice/resources";
/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const W = globalThis, X = W.ShadowRoot && (W.ShadyCSS === void 0 || W.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Z = Symbol(), ht = /* @__PURE__ */ new WeakMap();
let At = class {
  constructor(t, e, s) {
    if (this._$cssResult$ = !0, s !== Z)
      throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = t, this.t = e;
  }
  get styleSheet() {
    let t = this.o;
    const e = this.t;
    if (X && t === void 0) {
      const s = e !== void 0 && e.length === 1;
      s && (t = ht.get(e)), t === void 0 && ((this.o = t = new CSSStyleSheet()).replaceSync(this.cssText), s && ht.set(e, t));
    }
    return t;
  }
  toString() {
    return this.cssText;
  }
};
const Bt = (n) => new At(typeof n == "string" ? n : n + "", void 0, Z), Lt = (n, ...t) => {
  const e = n.length === 1 ? n[0] : t.reduce((s, i, r) => s + ((o) => {
    if (o._$cssResult$ === !0)
      return o.cssText;
    if (typeof o == "number")
      return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + n[r + 1], n[0]);
  return new At(e, n, Z);
}, It = (n, t) => {
  if (X)
    n.adoptedStyleSheets = t.map((e) => e instanceof CSSStyleSheet ? e : e.styleSheet);
  else
    for (const e of t) {
      const s = document.createElement("style"), i = W.litNonce;
      i !== void 0 && s.setAttribute("nonce", i), s.textContent = e.cssText, n.appendChild(s);
    }
}, lt = X ? (n) => n : (n) => n instanceof CSSStyleSheet ? ((t) => {
  let e = "";
  for (const s of t.cssRules)
    e += s.cssText;
  return Bt(e);
})(n) : n;
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const { is: jt, defineProperty: Ft, getOwnPropertyDescriptor: Vt, getOwnPropertyNames: qt, getOwnPropertySymbols: Gt, getPrototypeOf: Kt } = Object, m = globalThis, ct = m.trustedTypes, Jt = ct ? ct.emptyScript : "", I = m.reactiveElementPolyfillSupport, T = (n, t) => n, q = { toAttribute(n, t) {
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
} }, vt = (n, t) => !jt(n, t), dt = { attribute: !0, type: String, converter: q, reflect: !1, hasChanged: vt };
Symbol.metadata ?? (Symbol.metadata = Symbol("metadata")), m.litPropertyMetadata ?? (m.litPropertyMetadata = /* @__PURE__ */ new WeakMap());
class w extends HTMLElement {
  static addInitializer(t) {
    this._$Ei(), (this.l ?? (this.l = [])).push(t);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(t, e = dt) {
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
    return this.elementProperties.get(t) ?? dt;
  }
  static _$Ei() {
    if (this.hasOwnProperty(T("elementProperties")))
      return;
    const t = Kt(this);
    t.finalize(), t.l !== void 0 && (this.l = [...t.l]), this.elementProperties = new Map(t.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(T("finalized")))
      return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(T("properties"))) {
      const e = this.properties, s = [...qt(e), ...Gt(e)];
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
        e.unshift(lt(i));
    } else
      t !== void 0 && e.push(lt(t));
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
    for (const s of e.keys())
      this.hasOwnProperty(s) && (t.set(s, this[s]), delete this[s]);
    t.size > 0 && (this._$Ep = t);
  }
  createRenderRoot() {
    const t = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return It(t, this.constructor.elementStyles), t;
  }
  connectedCallback() {
    var t;
    this.renderRoot ?? (this.renderRoot = this.createRenderRoot()), this.enableUpdating(!0), (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostConnected) == null ? void 0 : s.call(e);
    });
  }
  enableUpdating(t) {
  }
  disconnectedCallback() {
    var t;
    (t = this._$EO) == null || t.forEach((e) => {
      var s;
      return (s = e.hostDisconnected) == null ? void 0 : s.call(e);
    });
  }
  attributeChangedCallback(t, e, s) {
    this._$AK(t, s);
  }
  _$EC(t, e) {
    var r;
    const s = this.constructor.elementProperties.get(t), i = this.constructor._$Eu(t, s);
    if (i !== void 0 && s.reflect === !0) {
      const o = (((r = s.converter) == null ? void 0 : r.toAttribute) !== void 0 ? s.converter : q).toAttribute(e, s.type);
      this._$Em = t, o == null ? this.removeAttribute(i) : this.setAttribute(i, o), this._$Em = null;
    }
  }
  _$AK(t, e) {
    var r;
    const s = this.constructor, i = s._$Eh.get(t);
    if (i !== void 0 && this._$Em !== i) {
      const o = s.getPropertyOptions(i), l = typeof o.converter == "function" ? { fromAttribute: o.converter } : ((r = o.converter) == null ? void 0 : r.fromAttribute) !== void 0 ? o.converter : q;
      this._$Em = i, this[i] = l.fromAttribute(e, o.type), this._$Em = null;
    }
  }
  requestUpdate(t, e, s) {
    if (t !== void 0) {
      if (s ?? (s = this.constructor.getPropertyOptions(t)), !(s.hasChanged ?? vt)(this[t], e))
        return;
      this.P(t, e, s);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$ET());
  }
  P(t, e, s) {
    this._$AL.has(t) || this._$AL.set(t, e), s.reflect === !0 && this._$Em !== t && (this._$Ej ?? (this._$Ej = /* @__PURE__ */ new Set())).add(t);
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
          o.wrapped !== !0 || this._$AL.has(r) || this[r] === void 0 || this.P(r, this[r], o);
    }
    let t = !1;
    const e = this._$AL;
    try {
      t = this.shouldUpdate(e), t ? (this.willUpdate(e), (s = this._$EO) == null || s.forEach((i) => {
        var r;
        return (r = i.hostUpdate) == null ? void 0 : r.call(i);
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
    (e = this._$EO) == null || e.forEach((s) => {
      var i;
      return (i = s.hostUpdated) == null ? void 0 : i.call(s);
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
w.elementStyles = [], w.shadowRootOptions = { mode: "open" }, w[T("elementProperties")] = /* @__PURE__ */ new Map(), w[T("finalized")] = /* @__PURE__ */ new Map(), I == null || I({ ReactiveElement: w }), (m.reactiveElementVersions ?? (m.reactiveElementVersions = [])).push("2.0.4");
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
const P = globalThis, B = P.trustedTypes, ut = B ? B.createPolicy("lit-html", { createHTML: (n) => n }) : void 0, yt = "$lit$", f = `lit$${(Math.random() + "").slice(9)}$`, bt = "?" + f, Xt = `<${bt}>`, S = document, O = () => S.createComment(""), N = (n) => n === null || typeof n != "object" && typeof n != "function", St = Array.isArray, Zt = (n) => St(n) || typeof (n == null ? void 0 : n[Symbol.iterator]) == "function", j = `[ 	
\f\r]`, k = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, pt = /-->/g, $t = />/g, y = RegExp(`>|${j}(?:([^\\s"'>=/]+)(${j}*=${j}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), _t = /'/g, ft = /"/g, wt = /^(?:script|style|textarea|title)$/i, Qt = (n) => (t, ...e) => ({ _$litType$: n, strings: t, values: e }), v = Qt(1), M = Symbol.for("lit-noChange"), c = Symbol.for("lit-nothing"), gt = /* @__PURE__ */ new WeakMap(), b = S.createTreeWalker(S, 129);
function Et(n, t) {
  if (!Array.isArray(n) || !n.hasOwnProperty("raw"))
    throw Error("invalid template strings array");
  return ut !== void 0 ? ut.createHTML(t) : t;
}
const Yt = (n, t) => {
  const e = n.length - 1, s = [];
  let i, r = t === 2 ? "<svg>" : "", o = k;
  for (let l = 0; l < e; l++) {
    const a = n[l];
    let d, u, h = -1, $ = 0;
    for (; $ < a.length && (o.lastIndex = $, u = o.exec(a), u !== null); )
      $ = o.lastIndex, o === k ? u[1] === "!--" ? o = pt : u[1] !== void 0 ? o = $t : u[2] !== void 0 ? (wt.test(u[2]) && (i = RegExp("</" + u[2], "g")), o = y) : u[3] !== void 0 && (o = y) : o === y ? u[0] === ">" ? (o = i ?? k, h = -1) : u[1] === void 0 ? h = -2 : (h = o.lastIndex - u[2].length, d = u[1], o = u[3] === void 0 ? y : u[3] === '"' ? ft : _t) : o === ft || o === _t ? o = y : o === pt || o === $t ? o = k : (o = y, i = void 0);
    const _ = o === y && n[l + 1].startsWith("/>") ? " " : "";
    r += o === k ? a + Xt : h >= 0 ? (s.push(d), a.slice(0, h) + yt + a.slice(h) + f + _) : a + f + (h === -2 ? l : _);
  }
  return [Et(n, r + (n[e] || "<?>") + (t === 2 ? "</svg>" : "")), s];
};
class H {
  constructor({ strings: t, _$litType$: e }, s) {
    let i;
    this.parts = [];
    let r = 0, o = 0;
    const l = t.length - 1, a = this.parts, [d, u] = Yt(t, e);
    if (this.el = H.createElement(d, s), b.currentNode = this.el.content, e === 2) {
      const h = this.el.content.firstChild;
      h.replaceWith(...h.childNodes);
    }
    for (; (i = b.nextNode()) !== null && a.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes())
          for (const h of i.getAttributeNames())
            if (h.endsWith(yt)) {
              const $ = u[o++], _ = i.getAttribute(h).split(f), D = /([.?@])?(.*)/.exec($);
              a.push({ type: 1, index: r, name: D[2], strings: _, ctor: D[1] === "." ? ee : D[1] === "?" ? se : D[1] === "@" ? ie : L }), i.removeAttribute(h);
            } else
              h.startsWith(f) && (a.push({ type: 6, index: r }), i.removeAttribute(h));
        if (wt.test(i.tagName)) {
          const h = i.textContent.split(f), $ = h.length - 1;
          if ($ > 0) {
            i.textContent = B ? B.emptyScript : "";
            for (let _ = 0; _ < $; _++)
              i.append(h[_], O()), b.nextNode(), a.push({ type: 2, index: ++r });
            i.append(h[$], O());
          }
        }
      } else if (i.nodeType === 8)
        if (i.data === bt)
          a.push({ type: 2, index: r });
        else {
          let h = -1;
          for (; (h = i.data.indexOf(f, h + 1)) !== -1; )
            a.push({ type: 7, index: r }), h += f.length - 1;
        }
      r++;
    }
  }
  static createElement(t, e) {
    const s = S.createElement("template");
    return s.innerHTML = t, s;
  }
}
function x(n, t, e = n, s) {
  var o, l;
  if (t === M)
    return t;
  let i = s !== void 0 ? (o = e._$Co) == null ? void 0 : o[s] : e._$Cl;
  const r = N(t) ? void 0 : t._$litDirective$;
  return (i == null ? void 0 : i.constructor) !== r && ((l = i == null ? void 0 : i._$AO) == null || l.call(i, !1), r === void 0 ? i = void 0 : (i = new r(n), i._$AT(n, e, s)), s !== void 0 ? (e._$Co ?? (e._$Co = []))[s] = i : e._$Cl = i), i !== void 0 && (t = x(n, i._$AS(n, t.values), i, s)), t;
}
class te {
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
    b.currentNode = i;
    let r = b.nextNode(), o = 0, l = 0, a = s[0];
    for (; a !== void 0; ) {
      if (o === a.index) {
        let d;
        a.type === 2 ? d = new R(r, r.nextSibling, this, t) : a.type === 1 ? d = new a.ctor(r, a.name, a.strings, this, t) : a.type === 6 && (d = new ne(r, this, t)), this._$AV.push(d), a = s[++l];
      }
      o !== (a == null ? void 0 : a.index) && (r = b.nextNode(), o++);
    }
    return b.currentNode = S, i;
  }
  p(t) {
    let e = 0;
    for (const s of this._$AV)
      s !== void 0 && (s.strings !== void 0 ? (s._$AI(t, s, e), e += s.strings.length - 2) : s._$AI(t[e])), e++;
  }
}
class R {
  get _$AU() {
    var t;
    return ((t = this._$AM) == null ? void 0 : t._$AU) ?? this._$Cv;
  }
  constructor(t, e, s, i) {
    this.type = 2, this._$AH = c, this._$AN = void 0, this._$AA = t, this._$AB = e, this._$AM = s, this.options = i, this._$Cv = (i == null ? void 0 : i.isConnected) ?? !0;
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
    t = x(this, t, e), N(t) ? t === c || t == null || t === "" ? (this._$AH !== c && this._$AR(), this._$AH = c) : t !== this._$AH && t !== M && this._(t) : t._$litType$ !== void 0 ? this.$(t) : t.nodeType !== void 0 ? this.T(t) : Zt(t) ? this.k(t) : this._(t);
  }
  S(t) {
    return this._$AA.parentNode.insertBefore(t, this._$AB);
  }
  T(t) {
    this._$AH !== t && (this._$AR(), this._$AH = this.S(t));
  }
  _(t) {
    this._$AH !== c && N(this._$AH) ? this._$AA.nextSibling.data = t : this.T(S.createTextNode(t)), this._$AH = t;
  }
  $(t) {
    var r;
    const { values: e, _$litType$: s } = t, i = typeof s == "number" ? this._$AC(t) : (s.el === void 0 && (s.el = H.createElement(Et(s.h, s.h[0]), this.options)), s);
    if (((r = this._$AH) == null ? void 0 : r._$AD) === i)
      this._$AH.p(e);
    else {
      const o = new te(i, this), l = o.u(this.options);
      o.p(e), this.T(l), this._$AH = o;
    }
  }
  _$AC(t) {
    let e = gt.get(t.strings);
    return e === void 0 && gt.set(t.strings, e = new H(t)), e;
  }
  k(t) {
    St(this._$AH) || (this._$AH = [], this._$AR());
    const e = this._$AH;
    let s, i = 0;
    for (const r of t)
      i === e.length ? e.push(s = new R(this.S(O()), this.S(O()), this, this.options)) : s = e[i], s._$AI(r), i++;
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
class L {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(t, e, s, i, r) {
    this.type = 1, this._$AH = c, this._$AN = void 0, this.element = t, this.name = e, this._$AM = i, this.options = r, s.length > 2 || s[0] !== "" || s[1] !== "" ? (this._$AH = Array(s.length - 1).fill(new String()), this.strings = s) : this._$AH = c;
  }
  _$AI(t, e = this, s, i) {
    const r = this.strings;
    let o = !1;
    if (r === void 0)
      t = x(this, t, e, 0), o = !N(t) || t !== this._$AH && t !== M, o && (this._$AH = t);
    else {
      const l = t;
      let a, d;
      for (t = r[0], a = 0; a < r.length - 1; a++)
        d = x(this, l[s + a], e, a), d === M && (d = this._$AH[a]), o || (o = !N(d) || d !== this._$AH[a]), d === c ? t = c : t !== c && (t += (d ?? "") + r[a + 1]), this._$AH[a] = d;
    }
    o && !i && this.j(t);
  }
  j(t) {
    t === c ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, t ?? "");
  }
}
class ee extends L {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(t) {
    this.element[this.name] = t === c ? void 0 : t;
  }
}
class se extends L {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(t) {
    this.element.toggleAttribute(this.name, !!t && t !== c);
  }
}
class ie extends L {
  constructor(t, e, s, i, r) {
    super(t, e, s, i, r), this.type = 5;
  }
  _$AI(t, e = this) {
    if ((t = x(this, t, e, 0) ?? c) === M)
      return;
    const s = this._$AH, i = t === c && s !== c || t.capture !== s.capture || t.once !== s.once || t.passive !== s.passive, r = t !== c && (s === c || i);
    i && this.element.removeEventListener(this.name, this, s), r && this.element.addEventListener(this.name, this, t), this._$AH = t;
  }
  handleEvent(t) {
    var e;
    typeof this._$AH == "function" ? this._$AH.call(((e = this.options) == null ? void 0 : e.host) ?? this.element, t) : this._$AH.handleEvent(t);
  }
}
class ne {
  constructor(t, e, s) {
    this.element = t, this.type = 6, this._$AN = void 0, this._$AM = e, this.options = s;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(t) {
    x(this, t);
  }
}
const F = P.litHtmlPolyfillSupport;
F == null || F(H, R), (P.litHtmlVersions ?? (P.litHtmlVersions = [])).push("3.1.2");
const oe = (n, t, e) => {
  const s = (e == null ? void 0 : e.renderBefore) ?? t;
  let i = s._$litPart$;
  if (i === void 0) {
    const r = (e == null ? void 0 : e.renderBefore) ?? null;
    s._$litPart$ = i = new R(t.insertBefore(O(), r), r, void 0, e ?? {});
  }
  return i._$AI(n), i;
};
/**
 * @license
 * Copyright 2017 Google LLC
 * SPDX-License-Identifier: BSD-3-Clause
 */
class U extends w {
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
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(t), this._$Do = oe(e, this.renderRoot, this.renderOptions);
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
    return M;
  }
}
var mt;
U._$litElement$ = !0, U.finalized = !0, (mt = globalThis.litElementHydrateSupport) == null || mt.call(globalThis, { LitElement: U });
const V = globalThis.litElementPolyfillSupport;
V == null || V({ LitElement: U });
(globalThis.litElementVersions ?? (globalThis.litElementVersions = [])).push("4.0.4");
const re = new Dt(
  "settings.modal",
  {
    modal: {
      type: "sidebar",
      size: "medium"
    }
  }
);
var ae = Object.defineProperty, he = Object.getOwnPropertyDescriptor, z = (n, t, e, s) => {
  for (var i = s > 1 ? void 0 : s ? he(t, e) : t, r = n.length - 1, o; r >= 0; r--)
    (o = n[r]) && (i = (s ? o(t, e, i) : o(i)) || i);
  return s && i && ae(t, e, i), i;
}, Q = (n, t, e) => {
  if (!t.has(n))
    throw TypeError("Cannot " + e);
}, C = (n, t, e) => (Q(n, t, "read from private field"), e ? e.call(n) : t.get(n)), p = (n, t, e) => {
  if (t.has(n))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(n) : t.set(n, e);
}, le = (n, t, e, s) => (Q(n, t, "write to private field"), s ? s.call(n, e) : t.set(n, e), e), g = (n, t, e) => (Q(n, t, "access private method"), e), E, Y, tt, et, st, Ct, G, Mt, K, xt, it, kt, nt, Tt, ot, Pt, rt, Ut, at, Ot;
let A = class extends Nt(U) {
  constructor() {
    super(), p(this, st), p(this, G), p(this, K), p(this, it), p(this, nt), p(this, ot), p(this, rt), p(this, at), p(this, E, void 0), this._loaded = !0, this._status = {
      isInMaintenanceMode: !0,
      isContentFrozen: !0,
      usingWebConfig: !0,
      settings: {
        allowBackOfficeUsersThrough: !0
      }
    }, this.title = "MaintenanceManager dashboard", p(this, Y, () => {
      var n;
      (n = C(this, E)) == null || n.toggleMaintenance();
    }), p(this, tt, () => {
      var n;
      (n = C(this, E)) == null || n.toggleFrozen();
    }), p(this, et, () => {
      var n;
      (n = C(this, E)) == null || n.toggleBackofficeAccess();
    }), this.consumeContext(Wt, (n) => {
      this._modalContext = n;
    }), this.consumeContext(zt, (n) => {
      le(this, E, n), this.observe(n.status, (t) => {
        this.status = t;
      });
    });
  }
  render() {
    return v`
        <uui-box>${this._loaded ? g(this, K, xt).call(this) : g(this, G, Mt).call(this)}</uui-box>`;
  }
};
E = /* @__PURE__ */ new WeakMap();
Y = /* @__PURE__ */ new WeakMap();
tt = /* @__PURE__ */ new WeakMap();
et = /* @__PURE__ */ new WeakMap();
st = /* @__PURE__ */ new WeakSet();
Ct = async function() {
  var e;
  const n = (e = this._modalContext) == null ? void 0 : e.open(this, re), t = await (n == null ? void 0 : n.onSubmit());
  t && console.log("data", t);
};
G = /* @__PURE__ */ new WeakSet();
Mt = function() {
  return v`
			<uui-loader-bar animationDuration="1.5" style="color: black"></uui-loader-bar>
		`;
};
K = /* @__PURE__ */ new WeakSet();
xt = function() {
  return v`
        <div>${g(this, it, kt).call(this)}</div>
        <div>${g(this, nt, Tt).call(this)}</div>
        <div>${g(this, ot, Pt).call(this)}</div>
        <div>${g(this, rt, Ut).call(this)}</div>
        <div>${g(this, at, Ot).call(this)}</div>
        `;
};
it = /* @__PURE__ */ new WeakSet();
kt = function() {
  return v`
        <div class="buttons">
            <uui-button label="Toggle Maintenance" id="clickMaintenance" look="primary" color="positive" @click=${C(this, Y)}></uui-button>
            <uui-button label="Toggle Frozen" id="clickFrozen" look="primary" color="warning" @click=${C(this, tt)}></uui-button>
        </div>
        `;
};
nt = /* @__PURE__ */ new WeakSet();
Tt = function() {
  var n;
  return (n = this.status) != null && n.isInMaintenanceMode ? v`
         <div class="alert alert-danger maintenanceMode-alert">
            <uui-icon name="icon-block"></uui-icon>
            <div>
                <umb-localize key="maintain_onMsg"></umb-localize>
            </div>
        </div>
                ` : c;
};
ot = /* @__PURE__ */ new WeakSet();
Pt = function() {
  var n;
  return (n = this.status) != null && n.isContentFrozen ? v`
        <div class="alert alert-info maintenanceMode-alert">
            <uui-icon name="icon-snow"></uui-icon>
            <div>
                <umb-localize key="maintain_frozenMsg"></umb-localize>
            </div>
        </div>
        ` : c;
};
rt = /* @__PURE__ */ new WeakSet();
Ut = function() {
  var n, t;
  return v`
        <div class="switch">
            <umb-input-toggle 
                .checked=${((t = (n = this.status) == null ? void 0 : n.settings) == null ? void 0 : t.allowBackOfficeUsersThrough) ?? !1}
                .showLabels=${!0} 
                labelOn="Allow backoffice users to view site" 
                labelOff="Don't allow backoffice users to view site"
                @click=${C(this, et)}>
            </umb-input-toggle>
        </div>
        `;
};
at = /* @__PURE__ */ new WeakSet();
Ot = function() {
  return v`
            <div class="settings">
                <uui-button label="Settings" look="primary" colour="positive"
                @click=${g(this, st, Ct)}></uui-button>
            </div>
        `;
};
A.styles = Lt`
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
z([
  J()
], A.prototype, "status", 2);
z([
  J()
], A.prototype, "_loaded", 2);
z([
  J()
], A.prototype, "_status", 2);
z([
  Ht()
], A.prototype, "title", 2);
A = z([
  Rt("maintenancemanager-dashboard")
], A);
const ve = A;
export {
  A as MaintenanceManagerDashboard,
  ve as default
};
//# sourceMappingURL=dashboard.element-qLmWkVIw.js.map
