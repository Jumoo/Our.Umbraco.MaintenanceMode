import { LitElement, html, css } from "lit";
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
import { customElement, property, state } from "@umbraco-cms/backoffice/external/lit";
import { MaintenanceContext, MAINTENANCE_CONTEXT_TOKEN } from "../contexts/context";

@customElement('maintenancemanager-dashboard')
export class MaintenanceManagerDashboard extends UmbElementMixin(LitElement) {

    #maintenanceContexts? : MaintenanceContext;

    @state()
    protected maintenance: boolean = false;

    @state()
    protected frozen: boolean = false;

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

            this.observe(_thing.inMaintenanceMode, (_maintenance) => {
                this.maintenance = _maintenance;
                console.log("some words 1")
            });

            this.observe(_thing.isFrozen, (_frozen) => {
                this.frozen = _frozen;
                console.log("some words 2")
            });
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
        <div>${this._status.isInMaintenanceMode ? this.#showMaintenanceAlert() : ''}</div>
        <div>${this._status.isContentFrozen ? this.#showContentFrozenAlert() : ''}</div>
        `;
    }

    #showMaintenanceAlert() {
        return html`
            <uui-button label="Toggle Maintenance" id="clickMaintenance" look="secondary" @click=${this.#onMaintenanceToggle}></uui-button>
        [${this.maintenance}]
         <div class="alert alert-danger maintenanceMode-alert">
                    <i class="icon icon-block"></i>
                    <div>
                        InMaintenanceMode
                    </div>
                </div>
                `;
    }

    #showContentFrozenAlert() {
        return html`
            <uui-button label="Toggle Frozen" id="clickFrozen" look="secondary" @click=${this.#onFrozenToggle}></uui-button>
        [${this.frozen}]
        <div class="alert alert-info frozen-alert">
                <i class="icon icon-snow"></i>
                    <div>
                        ContentFrozen
                    </div>
                </div>`;
    }



    static styles = css`
        :host {
            display: block;
            padding: 20px;
        }
    `
}

declare global {
    interface HtmlElementTagNameMap {
        'maintenancemanager-dashboard': MaintenanceManagerDashboard
    }
}