import type { ManifestDashboard } from "@umbraco-cms/backoffice/extension-registry";

const dashboards: Array<ManifestDashboard> = [
    {
        type: 'dashboard',
        name: 'maintenancemanager',
        alias: 'maintenancemanager.dashboard',
        elementName: 'maintenancemanager-dashboard',
        weight: -10,
        js: ()=>import('./dashboard.element'),
        meta: {
            label: 'MaintenanceManager',
            pathname: 'maintenancemanager'
        },
        conditions: [
            {
                alias: 'Umb.Condition.SectionAlias',
                match: 'Umb.Section.Content'
            }
        ]
    }
]

export const manifests = [...dashboards];