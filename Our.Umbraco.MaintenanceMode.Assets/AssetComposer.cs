using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Dashboards;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Manifest;
using Umbraco.Cms.Core.Notifications;

namespace Our.Umbraco.MaintenanceMode.Assets
{
    public class AssetComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            if (!builder.ManifestFilters().Has<MaintenanceModeManifestFilter>())
                builder.ManifestFilters().Append<MaintenanceModeManifestFilter>();

            builder.AddNotificationHandler<ServerVariablesParsingNotification, ServerVariablesParsingHandler>();
        }
    }

    internal class MaintenanceModeManifestFilter : IManifestFilter
    {
        public void Filter(List<PackageManifest> manifests)
        {
            manifests.Add(new PackageManifest()
            {
                PackageName = "Our.Umbraco.MaintenanceMode",
                Version = "",
                AllowPackageTelemetry = true,
                Scripts = new[] {
                    "/App_Plugins/Our.Umbraco.MaintenanceMode/MaintenanceMode.Dashboard.js",
                    "/App_Plugins/Our.Umbraco.MaintenanceMode/MaintenanceMode.Service.js"
                },
                Stylesheets = new[] {
                    "/App_Plugins/Our.Umbraco.MaintenanceMode/MaintenanceMode.css"
                },
                Dashboards = new ManifestDashboard[] {
                    new ManifestDashboard {
                        Alias = "maintenanceModeDashboard",
                        View = "/App_Plugins/Our.Umbraco.MaintenanceMode/MaintenanceModeDashboard.html",
                        Sections = new [] { Constants.Applications.Content },
                        Weight = -10,
                        AccessRules = new IAccessRule[] {
                            new AccessRule {
                                Type = AccessRuleType.Grant,
                                Value = "admin"
                            }
                        }
                    }
                }
            });
        }
    }
}
