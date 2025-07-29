import { LitElement, html, css, nothing } from "lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { customElement, property, state } from "@umbraco-cms/backoffice/external/lit";
import { MaintenanceContext, MAINTENANCE_CONTEXT_TOKEN } from "../contexts/context";
import { MaintenanceModeStatus } from "../api";
import { UMB_MODAL_MANAGER_CONTEXT, UmbModalManagerContext } from "@umbraco-cms/backoffice/modal";
import { SETTINGS_MODAL } from "../settings/settings-modal-token";

@customElement('maintenancemanager-dashboard')
export class MaintenanceManagerDashboard extends UmbElementMixin(LitElement) {

    #maintenanceContexts? : MaintenanceContext;

    @state()
    protected status?: MaintenanceModeStatus;

    @state()
    protected _loaded = true;

    @state()
    protected _status : MaintenanceModeStatus = {
        isInMaintenanceMode: true,
        isContentFrozen: true,
        usingWebConfig: true,
        settings: {
            allowBackOfficeUsersThrough: true
        }
    };

    private _modalContext?: UmbModalManagerContext;

    constructor() {
        super();
        this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (_instance) => {
            this._modalContext = _instance;
        });

        this.consumeContext(MAINTENANCE_CONTEXT_TOKEN, (_thing) => {
            this.#maintenanceContexts = _thing;

            this.observe(_thing?.status, (_status) => {
                this.status = _status;
            })
        })
    }

    @property()
    title = 'MaintenanceManager dashboard'

    #onMaintenanceToggle = () => {
        this.#maintenanceContexts?.toggleMaintenance();
    }

    #onFrozenToggle = () => {
        this.#maintenanceContexts?.toggleFrozen();
    }

    #onBackofficeToggle = () => {
        this.#maintenanceContexts?.toggleBackofficeAccess();
    }

    async #openSettings() {
        const customContext = this._modalContext?.open(this, SETTINGS_MODAL);

        const data = await customContext?.onSubmit();

        if (!data) return;

        console.log('data', data);
    }

    render() {
        return html`
        <uui-box>${this._loaded
                ? this.#showDashboard()
                : this.#showLoader()}</uui-box>`;    }

    #showLoader() {
        return html`
			<uui-loader-bar animationDuration="1.5" style="color: black"></uui-loader-bar>
		`;
    }

    #showDashboard() {
        return html`
        <div>${this.#showButtons()}</div>
        <div>${this.#showMaintenanceAlert()}</div>
        <div>${this.#showContentFrozenAlert()}</div>
        <div>${this.#showAllowBackofficeToggle()}</div>
        <div>${this.#showSettings()}</div>
        `;
    }

    #showButtons() {
        return html`
        <div class="buttons">
            <uui-button label="Toggle Maintenance" id="clickMaintenance" look="primary" color="positive" @click=${this.#onMaintenanceToggle}></uui-button>
            <uui-button label="Toggle Frozen" id="clickFrozen" look="primary" color="warning" @click=${this.#onFrozenToggle}></uui-button>
        </div>
        `
    }

    #showMaintenanceAlert() {
        if(this.status?.isInMaintenanceMode){
        return html`
         <div class="alert alert-danger maintenanceMode-alert">
            <uui-icon name="icon-block"></uui-icon>
            <div>
                <umb-localize key="maintain_onMsg"></umb-localize>
            </div>
        </div>
                `;
            } else {
                return nothing;
            }
    }

    #showContentFrozenAlert() {
        if(this.status?.isContentFrozen){
        return html`
        <div class="alert alert-info maintenanceMode-alert">
            <uui-icon name="icon-snow"></uui-icon>
            <div>
                <umb-localize key="maintain_frozenMsg"></umb-localize>
            </div>
        </div>
        `;
        } else {
            return nothing;
        }
    }

    #showAllowBackofficeToggle() {
        return html`
        <div class="switch">
            <umb-input-toggle 
                .checked=${this.status?.settings?.allowBackOfficeUsersThrough ?? false}
                .showLabels=${true} 
                labelOn="Allow backoffice users to view site" 
                labelOff="Don't allow backoffice users to view site"
                @click=${this.#onBackofficeToggle}>
            </umb-input-toggle>
        </div>
        `
    }


    #showSettings() {
        return html`
            <div class="settings">
                <uui-button label="Settings" look="primary" colour="positive"
                @click=${this.#openSettings}></uui-button>
            </div>
        `
    }

    static styles = css`
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
    `
}

declare global {
    interface HtmlElementTagNameMap {
        'maintenancemanager-dashboard': MaintenanceManagerDashboard
    }
}

export default MaintenanceManagerDashboard;