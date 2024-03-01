import { html as C, state as f, customElement as g } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as U } from "@umbraco-cms/backoffice/modal";
import { M as T } from "./index-wSYa5mrQ.js";
import "@umbraco-cms/backoffice/element-api";
import "@umbraco-cms/backoffice/class-api";
import "@umbraco-cms/backoffice/context-api";
import "@umbraco-cms/backoffice/observable-api";
import "@umbraco-cms/backoffice/auth";
import "@umbraco-cms/backoffice/resources";
var E = Object.defineProperty, N = Object.getOwnPropertyDescriptor, h = (e, t, n, o) => {
  for (var a = o > 1 ? void 0 : o ? N(t, n) : t, l = e.length - 1, u; l >= 0; l--)
    (u = e[l]) && (a = (o ? u(t, n, a) : u(a)) || a);
  return o && a && E(t, n, a), a;
}, S = (e, t, n) => {
  if (!t.has(e))
    throw TypeError("Cannot " + n);
}, s = (e, t, n) => {
  if (t.has(e))
    throw TypeError("Cannot add the same private member more than once");
  t instanceof WeakSet ? t.add(e) : t.set(e, n);
}, r = (e, t, n) => (S(e, t, "access private method"), n), p, v, c, b, m, _, d, y;
let i = class extends U {
  constructor() {
    super(), s(this, p), s(this, c), s(this, m), s(this, d), this.content = "", this.consumeContext(T, (e) => {
      this._context = e, e.getSettings(), this.observe(e.settings, (t) => {
        this.settings = t;
      });
    });
  }
  connectedCallback() {
    super.connectedCallback();
  }
  //  "allowBackOfficeUsersThrough": true,
  //  "templateName": "MaintenancePage",
  //  "unfrozenUsers": "",
  //  "viewModel": {
  //  "pageTitle": "Site Maintenance",
  //  "title": "Under Maintenance",
  //  "text": "The Website is currently undergoing maintenance and will be back shortly."
  render() {
    var e, t;
    return C`
            <umb-body-layout headline="Maintenance Mode Settings">
                <uui-box>
                    <pre>${JSON.stringify(this.settings, null, 1)}</pre>
                    <umb-property-layout 
                    alias="templateName" 
                    label="Template" 
                    description="Template to be used on maintenance page."
                    orientation="vertical">
                        <div slot="editor">
                            <uui-input 
                            label="Template" 
                            .value=${(e = this.settings) == null ? void 0 : e.templateName}
                            @input=${r(this, m, _)}></uui-input>
                        </div>
                    </umb-property-layout>
                    <umb-property-layout 
                    alias="unfrozenUsers" 
                    label="Unfrozren Users" 
                    description="Users who can still edit when content is frozen."
                    orientation="vertical">
                        <div slot="editor">
                            <uui-input 
                            label="Unfrozen users" 
                            .value=${(t = this.settings) == null ? void 0 : t.unfrozenUsers}
                            @input=${r(this, d, y)}
                            placeholder="Enter Usernames Here..."></uui-input>
                        </div>
                    </umb-property-layout>
                </uui-box>
                <div slot="actions">
                        <uui-button id="cancel" label="Cancel" @click="${r(this, c, b)}">Cancel</uui-button>
                        <uui-button
                            id="submit"
                            color='positive'
                            look="primary"
                            label="Submit"
                            @click=${r(this, p, v)}></uui-button>
            </div>
            </umb-body-layout>
        `;
  }
};
p = /* @__PURE__ */ new WeakSet();
v = function() {
  var e;
  (e = this.modalContext) == null || e.submit();
};
c = /* @__PURE__ */ new WeakSet();
b = function() {
  var e;
  (e = this.modalContext) == null || e.reject();
};
m = /* @__PURE__ */ new WeakSet();
_ = function(e) {
  var n;
  const t = e.target.value;
  (n = this._context) == null || n.updateTemplateName(t);
};
d = /* @__PURE__ */ new WeakSet();
y = function(e) {
  var n;
  const t = e.target.value;
  (n = this._context) == null || n.updateUnfrozenUsers(t);
};
h([
  f()
], i.prototype, "settings", 2);
h([
  f()
], i.prototype, "content", 2);
i = h([
  g("settings-modal")
], i);
const A = i;
export {
  i as SettingsModalElement,
  A as default
};
//# sourceMappingURL=settings-modal-element-Lcwm3R4Z.js.map
