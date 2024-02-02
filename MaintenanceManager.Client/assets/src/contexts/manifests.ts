import { ManifestGlobalContext } from "@umbraco-cms/backoffice/extension-registry";

const contexts : Array<ManifestGlobalContext> = [
    {
        type: 'globalContext',
        alias: 'maintenance.context',
        name: 'maintenance context',
        js: () => import('./context.js')
    }
];

export const manifests = [...contexts];