import { UmbEntryPointOnInit } from '@umbraco-cms/backoffice/extension-api';

// load up the manifests here.
import { manifests as dashboardManifests } from './dashboards/manifest.ts';
import { manifests as contextManifests } from './contexts/manifests.ts';
import { manifests as langManifests } from './lang/manifest.ts';
import { manifests as settingManifests } from './settings/manifests.ts';

const manifests: Array<UmbExtensionManifest> = [
    ...dashboardManifests,
    ...contextManifests,
    ...langManifests,
    ...settingManifests
];


export const onInit: UmbEntryPointOnInit = (_host, extensionRegistry) => {
    
    // register them here. 
    extensionRegistry.registerMany(manifests);
};
