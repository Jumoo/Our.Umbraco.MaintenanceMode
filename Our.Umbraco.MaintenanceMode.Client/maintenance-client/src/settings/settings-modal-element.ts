import {
  css,
  customElement,
  html,
  state,
} from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";
import { SettingsModalData, SettingsModalValue } from "./settings-modal-token";
import MaintenanceContext, {
  MAINTENANCE_CONTEXT_TOKEN,
} from "../contexts/context";
import { MaintenanceModeSettings } from "../api";

@customElement("settings-modal")
export class SettingsModalElement extends UmbModalBaseElement<
  SettingsModalData,
  SettingsModalValue
> {
  _context?: MaintenanceContext;

  @state()
  settings?: MaintenanceModeSettings;

  constructor() {
    super();
    this.consumeContext(MAINTENANCE_CONTEXT_TOKEN, (_context) => {
      if (!_context) return;
      this._context = _context;

      _context.getSettings();
      this.observe(_context.settings, (_settings) => {
        this.settings = _settings;
      });
    });
  }

  connectedCallback(): void {
    super.connectedCallback();
  }

  @state()
  content: string = "";

  #handleConfirm() {
    this.modalContext?.submit();
    this._context?.saveSettings();
  }

  #handleCancel() {
    this.modalContext?.reject();
  }

  #updateSettings(property: string, e: Event) {
    const value = (e.target as HTMLInputElement).value;

    const update: { [key: string]: any } = {};
    update[property] = value;

    this._context?.updateSettings(update);
  }

  #updateViewModel(e: Event) {
    const input = e.target as HTMLInputElement;
    if (!input || !this.settings) return;

    const property = input.id;
    const value = input.checked !== undefined ? input.checked : input.value;

    const viewModelValue = {
      ...this.settings.viewModel,
      ...{ [property]: value },
    };

    this._context?.updateSettings({ viewModel: viewModelValue });
  }

  //  "allowBackOfficeUsersThrough": true,
  //  "templateName": "MaintenancePage",
  //  "unfrozenUsers": "",
  //  "viewModel": {
  //  "pageTitle": "Site Maintenance",
  //  "title": "Under Maintenance",
  //  "text": "The Website is currently undergoing maintenance and will be back shortly."

  render() {
    return html`
      <umb-body-layout headline="Maintenance Mode Settings">
        <uui-box>
          <umb-property-layout
            alias="templateName"
            label=${this.localize.term("maintenance_labelTemplate")}
            description=${this.localize.term("maintenance_labelTemplateDesc")}
            orientation="vertical"
          >
            <div slot="editor">
              <uui-input
                label="Template"
                .value=${this.settings?.templateName ?? ""}
                @input=${(e: Event) => this.#updateSettings("templateName", e)}
              ></uui-input>
            </div>
          </umb-property-layout>
          <umb-property-layout
            alias="unfrozenUsers"
            label=${this.localize.term("maintenance_labelUnfreeze")}
            description=${this.localize.term("maintenance_labelUnfreezeDesc")}
            orientation="vertical"
          >
            <div slot="editor">
              <uui-input
                label="Unfrozen users"
                .value=${this.settings?.unfrozenUsers ?? ""}
                @input=${(e: Event) => this.#updateSettings("unfrozenUsers", e)}
                placeholder="Enter User IDs Here..."
              ></uui-input>
            </div>
          </umb-property-layout>
          <umb-property-layout
            alias="PageTitle"
            label=${this.localize.term("maintenance_labelPageTitle")}
            description=${this.localize.term("maintenance_labelPageTitleDesc")}
            orientation="vertical"
          >
            <div slot="editor">
              <uui-input
                id="pageTitle"
                label="Page Title"
                .value=${this.settings?.viewModel?.pageTitle ??
                "Site Maintenance"}
                @input=${this.#updateViewModel}
              ></uui-input>
            </div>
          </umb-property-layout>
          <umb-property-layout
            alias="title"
            label=${this.localize.term("maintenance_labelTitle")}
            description=${this.localize.term("maintenance_labelTitleDesc")}
            orientation="vertical"
          >
            <div slot="editor">
              <uui-input
                label="Title"
                id="title"
                .value=${this.settings?.viewModel?.title ?? "Under Maintenance"}
                @input=${this.#updateViewModel}
              ></uui-input>
            </div>
          </umb-property-layout>
          <umb-property-layout
            alias="text"
            label=${this.localize.term("maintenance_labelText")}
            description=${this.localize.term("maintenance_labelTextDesc")}
            orientation="vertical"
          >
            <div slot="editor">
              <uui-textarea
                label="Text"
                id="text"
                rows="5"
                .value=${this.settings?.viewModel?.text ??
                "The Website is currently undergoing maintenance and will be back shortly."}
                @input=${this.#updateViewModel}
              ></uui-textarea>
            </div>
          </umb-property-layout>
          <umb-property-layout
            alias="UrlWhitelist"
            label=${this.localize.term("maintenance_labelUrlWhitelist")}
            description=${this.localize.term(
              "maintenance_labelUrlWhitelistDesc",
            )}
            orientation="vertical"
          >
            <div slot="editor">
              <uui-input
                label="Url Whitelist"
                .value=${this.settings?.urlWhitelist ?? ""}
                @input=${(e: Event) => this.#updateSettings("urlWhitelist", e)}
              ></uui-input>
            </div>
          </umb-property-layout>
          <umb-property-layout
            alias="IpWhitelist"
            label=${this.localize.term("maintenance_labelUrlWhitelist")}
            description=${this.localize.term(
              "maintenance_labelUrlWhitelistDesc",
            )}
            orientation="vertical"
          >
            <div slot="editor">
              <uui-input
                label="IP Whitelist"
                .value=${this.settings?.ipWhitelist ?? ""}
                @input=${(e: Event) => this.#updateSettings("ipWhitelist", e)}
              ></uui-input>
            </div>
          </umb-property-layout>
        </uui-box>
        <div slot="actions">
          <uui-button
            id="cancel"
            look="outline"
            label="Cancel"
            @click="${this.#handleCancel}"
            >Cancel</uui-button
          >
          <uui-button
            id="submit"
            color="positive"
            look="primary"
            label="Submit"
            @click=${this.#handleConfirm}
          ></uui-button>
        </div>
      </umb-body-layout>
    `;
  }

  static styles = css`
    uui-input {
      width: 100%;
    }
  `;
}

export default SettingsModalElement;
