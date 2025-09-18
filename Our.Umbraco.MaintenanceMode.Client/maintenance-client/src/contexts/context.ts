import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import {
  MaintenanceModeService,
  MaintenanceModeSettings,
  MaintenanceModeStatus,
} from "../api";
import { tryExecute } from "@umbraco-cms/backoffice/resources";

export class MaintenanceContext extends UmbControllerBase {
  #status = new UmbObjectState<MaintenanceModeStatus | undefined>(undefined);
  readonly status = this.#status.asObservable();

  #settings = new UmbObjectState<MaintenanceModeSettings | undefined>(
    undefined
  );
  readonly settings = this.#settings.asObservable();

  #host: UmbControllerHost;

  constructor(host: UmbControllerHost) {
    super(host);
    this.#host = host;
    this.provideContext(MAINTENANCE_CONTEXT_TOKEN, this);
  }

  async getStatus() {
    let status = await tryExecute(
      this.#host,
      MaintenanceModeService.getStatus()
    );
    if (status.data != null) this.#status.setValue(status.data);
  }

  async getSettings() {
    let settings = await tryExecute(
      this.#host,
      MaintenanceModeService.getSettings()
    );
    if (settings.data != null) this.#settings.setValue(settings.data);
  }

  async toggleMaintenance() {
    console.log("Value:", this.#status.getValue());
    await tryExecute(
      this.#host,
      MaintenanceModeService.toggleMode({
        query: {
          maintenanceMode: !this.#status.getValue()?.isInMaintenanceMode,
        },
      })
    );
    await this.getStatus();
    console.log("eeby");
  }

  async toggleFrozen() {
    await tryExecute(
      this.#host,
      MaintenanceModeService.toggleFrozen({
        query: {
          maintenanceMode: !this.#status.getValue()?.isContentFrozen,
        },
      })
    );
    await this.getStatus();
    console.log("deeby");
  }

  async toggleBackofficeAccess() {
    console.log(this.#status.getValue());
    await tryExecute(
      this.#host,
      MaintenanceModeService.toggleAccess({
        query: {
          maintenanceMode:
            !this.#status?.getValue()?.settings?.allowBackOfficeUsersThrough,
        },
      })
    );
    await this.getStatus();
  }

  //////////////

  updateSettings(partialData: Partial<MaintenanceModeSettings>) {
    this.#settings.update(partialData);
  }

  async saveSettings() {
    const settings = this.#settings.getValue();
    console.log(settings);

    if (settings != undefined) {
      await tryExecute(
        this.#host,
        MaintenanceModeService.saveSettings({
          body: settings,
        })
      );
    }
  }
}

export default MaintenanceContext;
export const MAINTENANCE_CONTEXT_TOKEN =
  new UmbContextToken<MaintenanceContext>(MaintenanceContext.name);
