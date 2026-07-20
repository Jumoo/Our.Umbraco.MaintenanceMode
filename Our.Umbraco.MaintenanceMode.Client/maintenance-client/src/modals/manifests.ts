const modals: Array<UmbExtensionManifest> = [
    {
        type: 'modal',
        alias: 'password.modal',
        name: 'Password modal',
        js: () => import('./password-modal-element.js')
    }
]

export const manifests = [...modals];
