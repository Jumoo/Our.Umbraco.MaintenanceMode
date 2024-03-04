import { html as g, css as f, state as v, customElement as T } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement as _ } from "@umbraco-cms/backoffice/modal";
import { M as C } from "./index-jn-dpPsr.js";
import "@umbraco-cms/backoffice/element-api";
import "@umbraco-cms/backoffice/class-api";
import "@umbraco-cms/backoffice/context-api";
import "@umbraco-cms/backoffice/observable-api";
import "@umbraco-cms/backoffice/auth";
import "@umbraco-cms/backoffice/resources";
var x = Object.defineProperty, S = Object.getOwnPropertyDescriptor, m = (t, e, i, o) => {
  for (var a = o > 1 ? void 0 : o ? S(e, i) : e, n = t.length - 1, p; n >= 0; n--)
    (p = t[n]) && (a = (o ? p(e, i, a) : p(a)) || a);
  return o && a && x(e, i, a), a;
}, $ = (t, e, i) => {
  if (!e.has(t))
    throw TypeError("Cannot " + i);
}, c = (t, e, i) => {
  if (e.has(t))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(t) : e.set(t, i);
}, s = (t, e, i) => ($(t, e, "access private method"), i), d, b, h, y, l, r;
let u = class extends _ {
  constructor() {
    super(), c(this, d), c(this, h), c(this, l), this.content = "", this.consumeContext(C, (t) => {
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
    return g`
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
                            .value=${(t = this.settings) == null ? void 0 : t.templateName}
                            @input=${(n) => s(this, l, r).call(this, "templateName", n)}></uui-input>
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
                            @input=${(n) => s(this, l, r).call(this, "unfrozenUsers", n)}
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
                            @input=${(n) => s(this, l, r).call(this, "pageTitle", n)}></uui-input>
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
                            @input=${(n) => s(this, l, r).call(this, "title", n)}></uui-input>
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
                            @input=${(n) => s(this, l, r).call(this, "text", n)}></uui-textarea>
                        </div>
                    </umb-property-layout>
                </uui-box>
                <div slot="actions">
                        <uui-button id="cancel" label="Cancel" @click="${s(this, h, y)}">Cancel</uui-button>
                        <uui-button
                            id="submit"
                            color='positive'
                            look="primary"
                            label="Submit"
                            @click=${s(this, d, b)}></uui-button>
            </div>
            </umb-body-layout>
        `;
  }
};
d = /* @__PURE__ */ new WeakSet();
b = function() {
  var t, e;
  (t = this.modalContext) == null || t.submit(), (e = this._context) == null || e.saveSettings();
};
h = /* @__PURE__ */ new WeakSet();
y = function() {
  var t;
  (t = this.modalContext) == null || t.reject();
};
l = /* @__PURE__ */ new WeakSet();
r = function(t, e) {
  var a;
  const i = e.target.value, o = {};
  o[t] = i, (a = this._context) == null || a.updateSettings(o);
};
u.styles = f`
        uui-input {
            width: 100%;
        }
    `;
m([
  v()
], u.prototype, "settings", 2);
m([
  v()
], u.prototype, "content", 2);
u = m([
  T("settings-modal")
], u);
const W = u;
export {
  u as SettingsModalElement,
  W as default
};
//# sourceMappingURL=settings-modal-element-gSc1dS01.js.map
