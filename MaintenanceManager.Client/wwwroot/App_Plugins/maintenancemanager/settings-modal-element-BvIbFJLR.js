import { html as b, css as y, state as d, customElement as g } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as f } from "@umbraco-cms/backoffice/modal";
import { MAINTENANCE_CONTEXT_TOKEN as _ } from "./context-BaM4y99h.js";
var T = Object.defineProperty, x = Object.getOwnPropertyDescriptor, h = (t) => {
  throw TypeError(t);
}, c = (t, e, i, o) => {
  for (var a = o > 1 ? void 0 : o ? x(e, i) : e, n = t.length - 1, p; n >= 0; n--)
    (p = t[n]) && (a = (o ? p(e, i, a) : p(a)) || a);
  return o && a && T(e, i, a), a;
}, C = (t, e, i) => e.has(t) || h("Cannot " + i), $ = (t, e, i) => e.has(t) ? h("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, i), l = (t, e, i) => (C(t, e, "access private method"), i), s, m, v, r;
let u = class extends f {
  constructor() {
    super(), $(this, s), this.content = "", this.consumeContext(_, (t) => {
      this._context = t, t.getSettings(), this.observe(t.settings, (e) => {
        this.settings = e;
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
    var t, e, i, o, a;
    return b`
            <umb-body-layout headline="Maintenance Mode Settings">
                <uui-box>
                    <umb-property-layout 
                    alias="templateName" 
                    label="Template" 
                    description="Template to be used on maintenance page."
                    orientation="vertical">
                        <div slot="editor">
                            <uui-input 
                            label="Template" 
                            .value=${(t = this.settings) == null ? void 0 : t.templateName}
                            @input=${(n) => l(this, s, r).call(this, "templateName", n)}></uui-input>
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
                            .value=${(e = this.settings) == null ? void 0 : e.unfrozenUsers}
                            @input=${(n) => l(this, s, r).call(this, "unfrozenUsers", n)}
                            placeholder="Enter Usernames Here..."></uui-input>
                        </div>
                    </umb-property-layout>
                    <umb-property-layout 
                    alias="PageTitle" 
                    label="Page Title" 
                    description="The title of the maintenance page in your browser."
                    orientation="vertical">
                        <div slot="editor">
                            <uui-input 
                            label="Page Title" 
                            .value=${(i = this.settings) == null ? void 0 : i.pageTitle}
                            @input=${(n) => l(this, s, r).call(this, "pageTitle", n)}></uui-input>
                        </div>
                    </umb-property-layout>
                    <umb-property-layout 
                    alias="title" 
                    label="Title" 
                    description="The title on the maintenance page."
                    orientation="vertical">
                        <div slot="editor">
                            <uui-input 
                            label="Title" 
                            .value=${(o = this.settings) == null ? void 0 : o.title}
                            @input=${(n) => l(this, s, r).call(this, "title", n)}></uui-input>
                        </div>
                    </umb-property-layout>
                    <umb-property-layout 
                    alias="text" 
                    label="Text" 
                    description="The text on the maintenance page."
                    orientation="vertical">
                        <div slot="editor">
                            <uui-textarea 
                            label="Text" 
                            rows=5
                            .value=${(a = this.settings) == null ? void 0 : a.text}
                            @input=${(n) => l(this, s, r).call(this, "text", n)}></uui-textarea>
                        </div>
                    </umb-property-layout>
                </uui-box>
                <div slot="actions">
                        <uui-button id="cancel" label="Cancel" @click="${l(this, s, v)}">Cancel</uui-button>
                        <uui-button
                            id="submit"
                            color='positive'
                            look="primary"
                            label="Submit"
                            @click=${l(this, s, m)}></uui-button>
            </div>
            </umb-body-layout>
        `;
  }
};
s = /* @__PURE__ */ new WeakSet();
m = function() {
  var t, e;
  (t = this.modalContext) == null || t.submit(), (e = this._context) == null || e.saveSettings();
};
v = function() {
  var t;
  (t = this.modalContext) == null || t.reject();
};
r = function(t, e) {
  var a;
  const i = e.target.value, o = {};
  o[t] = i, (a = this._context) == null || a.updateSettings(o);
};
u.styles = y`
        uui-input {
            width: 100%;
        }
    `;
c([
  d()
], u.prototype, "settings", 2);
c([
  d()
], u.prototype, "content", 2);
u = c([
  g("settings-modal")
], u);
const U = u;
export {
  u as SettingsModalElement,
  U as default
};
//# sourceMappingURL=settings-modal-element-BvIbFJLR.js.map
