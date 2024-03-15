import { UmbModalToken } from "@umbraco-cms/backoffice/modal";

export interface SettingsModalData {

}

export interface SettingsModalValue {

}

export const SETTINGS_MODAL = new UmbModalToken<SettingsModalData, SettingsModalValue>(
    "settings.modal",
    {
        modal: {
            type: 'sidebar',
            size: 'medium'
        }
    }
)