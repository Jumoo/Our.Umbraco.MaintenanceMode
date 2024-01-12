import { LitElement as u, html as v, customElement as f } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as d } from "@umbraco-cms/backoffice/element-api";
import { UMB_NOTIFICATION_CONTEXT_TOKEN as m } from "@umbraco-cms/backoffice/notification";
var C = Object.defineProperty, E = Object.getOwnPropertyDescriptor, O = (t, e, r, i) => {
  for (var a = i > 1 ? void 0 : i ? E(e, r) : e, o = t.length - 1, s; o >= 0; o--)
    (s = t[o]) && (a = (i ? s(e, r, a) : s(a)) || a);
  return i && a && C(e, r, a), a;
}, h = (t, e, r) => {
  if (!e.has(t))
    throw TypeError("Cannot " + r);
}, l = (t, e, r) => (h(t, e, "read from private field"), r ? r.call(t) : e.get(t)), c = (t, e, r) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, r);
}, T = (t, e, r, i) => (h(t, e, "write to private field"), i ? i.call(t, r) : e.set(t, r), r), n, p;
let _ = class extends d(u) {
  constructor() {
    super(), c(this, n, void 0), c(this, p, () => {
      var t;
      (t = l(this, n)) == null || t.peek("positive", { data: { message: "#h5yr" } });
    }), this.consumeContext(m, (t) => {
      T(this, n, t);
    });
  }
  render() {
    return v`
			<uui-box headline="HELLO">
				<p>A TypeScript Lit Dashboard</p>
				<uui-button look="primary" label="Click" @click=${l(this, p)}></uui-button>
			</uui-box>
		`;
  }
};
n = /* @__PURE__ */ new WeakMap();
p = /* @__PURE__ */ new WeakMap();
_ = O([
  f("my-element")
], _);
export {
  _ as default
};
//# sourceMappingURL=maintenancemanager.js.map
