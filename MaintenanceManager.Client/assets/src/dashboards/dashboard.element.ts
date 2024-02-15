import { LitElement, html, css, nothing } from "lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { customElement, property, state } from "@umbraco-cms/backoffice/external/lit";
import { MaintenanceContext, MAINTENANCE_CONTEXT_TOKEN } from "../contexts/context";
import { MaintenanceModeStatus } from "../api";

@customElement('maintenancemanager-dashboard')
export class MaintenanceManagerDashboard extends UmbElementMixin(LitElement) {

    #maintenanceContexts? : MaintenanceContext;

    @state()
    protected status?: MaintenanceModeStatus;

    @state()
    protected _loaded = true;

    @state()
    protected _status = {
        isInMaintenanceMode: true,
        isContentFrozen: true,
        usingWebConfig: true
    };

    constructor() {
        super();

        this.consumeContext(MAINTENANCE_CONTEXT_TOKEN, (_thing) => {
            this.#maintenanceContexts = _thing;

            this.observe(_thing.status, (_status) => {
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

    render() {
        return html`
        <uui-box>${this._loaded
                ? this.#showDashboard()
                : this.#showLoader()}</uui-box>`;
    }

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
        `;
    }

    #showButtons() {
        return html`
        <div class="buttons">
            <uui-button label="Toggle Maintenance" id="clickMaintenance" look="secondary" @click=${this.#onMaintenanceToggle}></uui-button>
            <uui-button label="Toggle Frozen" id="clickFrozen" look="secondary" @click=${this.#onFrozenToggle}></uui-button>
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

        .maintenanceMode-alert {
            padding: 2em;
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