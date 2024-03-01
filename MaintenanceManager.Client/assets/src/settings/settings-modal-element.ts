import { customElement, html, state } from "@umbraco-cms/backoffice/external/lit";
import { UmbModalBaseElement } from "@umbraco-cms/backoffice/modal";
import { SettingsModalData, SettingsModalValue } from "./settings-modal-token";
import MaintenanceContext, { MAINTENANCE_CONTEXT_TOKEN } from "../contexts/context";
import { MaintenanceModeSettings } from "../api";

@customElement('settings-modal')
export class SettingsModalElement extends 
    UmbModalBaseElement<SettingsModalData, SettingsModalValue> 
{
    _context?: MaintenanceContext;

    @state()
    settings? : MaintenanceModeSettings;

    constructor() {
        super();
        this.consumeContext(MAINTENANCE_CONTEXT_TOKEN, (_context) => {
            this._context=_context;
            _context.getSettings();
            this.observe(_context.settings,(_settings) => {
                this.settings = _settings;
            })
        });
    }

    connectedCallback(): void {
        super.connectedCallback();
    }

    @state()
    content: string = '';

    #handleConfirm() {
		this.modalContext?.submit();
	}

	#handleCancel() {
		this.modalContext?.reject();
	}

    #updateTemplateName(e: Event) {
        const value = (e.target as HTMLInputElement).value;
        this._context?.updateTemplateName(value);
    }

    #updateUnfrozenUsers(e: Event) {
        const value = (e.target as HTMLInputElement).value;
        this._context?.updateUnfrozenUsers(value);
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
                    <pre>${JSON.stringify(this.settings, null, 1)}</pre>
                    <umb-property-layout 
                    alias="templateName" 
                    label="Template" 
                    description="Template to be used on maintenance page."
                    orientation="vertical">
                        <div slot="editor">
                            <uui-input 
                            label="Template" 
                            .value=${this.settings?.templateName}
                            @input=${this.#updateTemplateName}></uui-input>
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
                            .value=${this.settings?.unfrozenUsers}
                            @input=${this.#updateUnfrozenUsers}
                            placeholder="Enter Usernames Here..."></uui-input>
                        </div>
                    </umb-property-layout>
                </uui-box>
                <div slot="actions">
                        <uui-button id="cancel" label="Cancel" @click="${this.#handleCancel}">Cancel</uui-button>
                        <uui-button
                            id="submit"
                            color='positive'
                            look="primary"
                            label="Submit"
                            @click=${this.#handleConfirm}></uui-button>
            </div>
            </umb-body-layout>
        `;
    }
    
}

export default SettingsModalElement;