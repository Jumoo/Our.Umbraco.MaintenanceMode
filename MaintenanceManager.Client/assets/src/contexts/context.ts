import { UmbBaseController } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbBooleanState } from "@umbraco-cms/backoffice/observable-api";
import { MaintenanceModeResource, OpenAPI } from "../api";
import { UMB_AUTH_CONTEXT } from '@umbraco-cms/backoffice/auth'
import { tryExecuteAndNotify } from '@umbraco-cms/backoffice/resources';

export class MaintenanceContext extends UmbBaseController {
    
    #inMaintenanceMode = new UmbBooleanState(false);
    readonly inMaintenanceMode = this.#inMaintenanceMode.asObservable();

    #isFrozen = new UmbBooleanState(false);
    readonly isFrozen = this.#isFrozen.asObservable();

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
        });
    }

    async toggleMaintenance() {
        this.#inMaintenanceMode.setValue (!this.#inMaintenanceMode.getValue());

        await tryExecuteAndNotify(this.#host, MaintenanceModeResource.toggleMode({
            maintenanceMode: this.#inMaintenanceMode.getValue()
        }));

        console.log("eeby");
    }

    toggleFrozen() {
        this.#isFrozen.setValue (!this.#isFrozen.getValue());
        console.log("deeby");
    }
}

export default MaintenanceContext;
export const MAINTENANCE_CONTEXT_TOKEN = 
    new UmbContextToken<MaintenanceContext>(MaintenanceContext.name);