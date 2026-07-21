import { UmbControllerBase } from "@umbraco-cms/backoffice/class-api";
import { UmbContextToken } from "@umbraco-cms/backoffice/context-api";
import { UmbControllerHost } from "@umbraco-cms/backoffice/controller-api";
import { UmbObjectState } from "@umbraco-cms/backoffice/observable-api";
import {
  UMB_MODAL_MANAGER_CONTEXT,
  UmbModalManagerContext,
} from "@umbraco-cms/backoffice/modal";
import { PASSWORD_MODAL } from "../modals/password-modal-token";
import { INFO_MODAL } from "../modals/info-modal-token";
import {
  getSettings,
  getStatus,
  getToggleAccess,
  getToggleFrozen,
  getToggleMode,
  getToggleSiteLock,
  postUnlockSite,
  MaintenanceModeSettings,
  MaintenanceModeStatus,
  postSaveSettings,
} from "../api";
import { tryExecute } from "@umbraco-cms/backoffice/resources";

export class MaintenanceContext extends UmbControllerBase {
  #status = new UmbObjectState<MaintenanceModeStatus | undefined>(undefined);
  readonly status = this.#status.asObservable();

  #settings = new UmbObjectState<MaintenanceModeSettings | undefined>(
    undefined,
  );
  readonly settings = this.#settings.asObservable();

  #host: UmbControllerHost;
  #modalManager?: UmbModalManagerContext;

  constructor(host: UmbControllerHost) {
    super(host);
    this.#host = host;
    this.provideContext(MAINTENANCE_CONTEXT_TOKEN, this);
    this.consumeContext(UMB_MODAL_MANAGER_CONTEXT, (_instance) => {
      this.#modalManager = _instance;
    });
  }

  async #showError(headline: string, message: string) {
    const modalContext = this.#modalManager?.open(this.#host, INFO_MODAL, {
      data: {
        headline,
        message,
        color: "danger",
        confirmLabel: "OK",
      },
    });

    await modalContext?.onSubmit();
  }

  async getStatus() {
    let status = await tryExecute(this.#host, getStatus());
    if (status.data != null) this.#status.setValue(status.data);
  }

  async getSettings() {
    let settings = await tryExecute(this.#host, getSettings());
    if (settings.data != null) this.#settings.setValue(settings.data);
  }

  async toggleMaintenance() {
    console.log("Value:", this.#status.getValue());
    await tryExecute(
      this.#host,
      getToggleMode({
        query: {
          maintenanceMode: !this.#status.getValue()?.isInMaintenanceMode,
        },
      }),
    );
    await this.getStatus();
    console.log("eeby");
  }

  async toggleFrozen() {
    await tryExecute(
      this.#host,
      getToggleFrozen({
        query: {
          maintenanceMode: !this.#status.getValue()?.isContentFrozen,
        },
      }),
    );
    await this.getStatus();
    console.log("deeby");
  }

  async toggleSiteLock() {
    const currentStatus = this.#status.getValue();

    if (currentStatus?.isSiteLocked) {
      // Unlocking the site
      if (currentStatus?.hasLockPassword) {
        // Prompt for password using an Umbraco modal
        const modalContext = this.#modalManager?.open(
          this.#host,
          PASSWORD_MODAL,
          {
            data: {
              headline: "Unlock site",
              message: "Enter password to unlock the site:",
            },
          },
        );

        let password: string | undefined;
        try {
          const result = await modalContext?.onSubmit();
          password = result?.password;
        } catch {
          // User cancelled the modal
          return;
        }

        if (!password) {
          // User entered empty password
          return;
        }

        // Try to unlock with password
        try {
          const result = await tryExecute(
            this.#host,
            postUnlockSite({
              body: { password },
            }),
          );

          if (result.error) {
            // Password was incorrect or other error
            await this.#showError(
              "Unable to unlock",
              "Failed to unlock site. Please check the password and try again.",
            );
            return;
          }

          // Success - refresh status
          await this.getStatus();
        } catch (error) {
          await this.#showError(
            "Unable to unlock",
            "Failed to unlock site. Please check the password and try again.",
          );
          console.error("Unlock error:", error);
        }
      } else {
        // No password configured - unlock automatically without prompting
        try {
          const result = await tryExecute(
            this.#host,
            postUnlockSite({
              body: { password: "" },
            }),
          );

          if (result.error) {
            await this.#showError("Unable to unlock", "Failed to unlock site.");
            return;
          }

          await this.getStatus();
        } catch (error) {
          await this.#showError("Unable to unlock", "Failed to unlock site.");
          console.error("Unlock error:", error);
        }
      }
    } else {
      // Locking the site (no password required)
      await tryExecute(
        this.#host,
        getToggleSiteLock({
          query: {
            siteLocked: !currentStatus?.isSiteLocked,
          },
        }),
      );
      await this.getStatus();
    }
  }

  async toggleBackofficeAccess() {
    console.log(this.#status.getValue());
    await tryExecute(
      this.#host,
      getToggleAccess({
        query: {
          maintenanceMode:
            !this.#status?.getValue()?.settings?.allowBackOfficeUsersThrough,
        },
      }),
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
        postSaveSettings({
          body: settings,
        }),
      );
    }
  }
}

export default MaintenanceContext;
export const MAINTENANCE_CONTEXT_TOKEN =
  new UmbContextToken<MaintenanceContext>(MaintenanceContext.name);
