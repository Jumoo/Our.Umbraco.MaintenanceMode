import { ManifestModal } from "@umbraco-cms/backoffice/extension-registry";

const modals: Array<ManifestModal> = [
    {
        type: 'modal',
        alias: 'settings.modal',
        name: 'Settings modal',
        js: () => import('./settings-modal-element.js')
    }
]

export const manifests = [...modals];