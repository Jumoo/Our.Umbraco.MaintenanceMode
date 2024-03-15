import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import { MaintenanceModeResource, MaintenanceModeSettings, MaintenanceModeStatus, OpenAPI } from "../api";
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth'
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';

export class MaintenanceContext extends UmbControllerBase {

    #status = new UmbObjectState<MaintenanceModeStatus|undefined>(undefined);
    readonly status = this.#status.asObservable();

    #settings = new UmbObjectState<MaintenanceModeSettings|undefined>(undefined);
    readonly settings = this.#settings.asObservable();

    #host: UmbControllerHost;

    
    constructor(host: UmbControllerHost) {
        super(host);
        this.#host = host;
        this.provideContext(MAINTENANCE_CONTEXT_TOKEN, this);
        this.consumeContext(UMB_AUTH_CONTEXT, (_auth) => {

            if (_auth===undefined){
                return;
            }

            const umbOpenApi = () => _auth.getLatestToken();
            OpenAPI.TOKEN = umbOpenApi;
            //OpenAPI.BASE = umbOpenApi.base;
            OpenAPI.WITH_CREDENTIALS = true;
            this.getStatus();
        });
    }

    async getStatus() {
        let status = await tryExecuteAndNotify(this.#host, MaintenanceModeResource.getStatus());
        console.log(status);
        if(status.data != null) this.#status.setValue (status.data)
    }

    async getSettings() {
        let settings = await tryExecuteAndNotify(this.#host, MaintenanceModeResource.getSettings());
        console.log(settings);
        if(settings.data != null) this.#settings.setValue (settings.data)
    }

    async toggleMaintenance() {
        await tryExecuteAndNotify(this.#host, MaintenanceModeResource.toggleMode({
            maintenanceMode: !this.#status.getValue()?.isInMaintenanceMode
        }));
        await this.getStatus();
        console.log("eeby");
    }

    async toggleFrozen() {
        await tryExecuteAndNotify(this.#host, MaintenanceModeResource.toggleFrozen({
            maintenanceMode: !this.#status.getValue()?.isContentFrozen
        }));
        await this.getStatus();
        console.log("deeby");
    }

    async toggleBackofficeAccess() {
        
        console.log(this.#status.getValue());
        await tryExecuteAndNotify(this.#host, MaintenanceModeResource.toggleAccess({
            
            maintenanceMode: !this.#status?.getValue()?.settings?.allowBackOfficeUsersThrough
        }));
        await this.getStatus();
    }

    //////////////

    updateSettings(partialData: Partial<MaintenanceModeSettings>) {
        this.#settings.update(partialData);
    }

    async saveSettings() {
        const settings = this.#settings.getValue();

        if(settings != undefined) {
            await tryExecuteAndNotify(this.#host, MaintenanceModeResource.saveSettings({
                requestBody: settings
            }))
        }
    }
}

export default MaintenanceContext;
export const MAINTENANCE_CONTEXT_TOKEN = 
    new UmbContextToken<MaintenanceContext>(MaintenanceContext.name);