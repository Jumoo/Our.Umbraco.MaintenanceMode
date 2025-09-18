const localizations: Array<UmbExtensionManifest> = [
    {
        type: 'localization',
        alias: 'time.lang.enus',
        name: 'English (US)',
        weight: 0,
        meta: {
            culture: 'en-us'
        },
        js: () => import('./en-us')
    },
    {
        type: 'localization',
        alias: 'time.lang.engb',
        name: 'English (UK)',
        weight: 0,
        meta: {
            culture: 'en-gb'
        },
        js: () => import('./en-us')
    },
];

export const manifests = [...localizations];