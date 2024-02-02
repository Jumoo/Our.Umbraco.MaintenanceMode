import { UmbBaseController } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbBooleanState } from "@umbraco-cms/backoffice/observable-api";

export class MaintenanceContext extends UmbBaseController {
    
    #inMaintenanceMode = new UmbBooleanState(false);
    readonly inMaintenanceMode = this.#inMaintenanceMode.asObservable();

    #isFrozen = new UmbBooleanState(false);
    readonly isFrozen = this.#isFrozen.asObservable();

    
    constructor(host: UmbControllerHost) {
        super(host);
        this.provideContext(MAINTENANCE_CONTEXT_TOKEN, this);
    }

    toggleMaintenance() {
        this.#inMaintenanceMode.setValue (!this.#inMaintenanceMode.getValue());
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