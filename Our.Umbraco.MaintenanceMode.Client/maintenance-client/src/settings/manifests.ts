const modals: Array<UmbExtensionManifest> = [
    {
        type: 'modal',
        alias: 'settings.modal',
        name: 'Settings modal',
        js: () => import('./settings-modal-element.js')
    }
]

export const manifests = [...modals];