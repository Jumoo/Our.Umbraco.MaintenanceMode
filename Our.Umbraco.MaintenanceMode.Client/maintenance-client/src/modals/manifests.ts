const modals: Array<UmbExtensionManifest> = [
    {
        type: 'modal',
        alias: 'password.modal',
        name: 'Password modal',
        js: () => import('./password-modal-element.js')
    },
    {
        type: 'modal',
        alias: 'info.modal',
        name: 'Info modal',
        js: () => import('./info-modal-element.js')
    }
]

export const manifests = [...modals];
