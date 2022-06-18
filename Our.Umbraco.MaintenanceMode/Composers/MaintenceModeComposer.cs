using Microsoft.Extensions.DependencyInjection;

using Our.Umbraco.MaintenanceMode.Configurations;
using Our.Umbraco.MaintenanceMode.Interfaces;
using Our.Umbraco.MaintenanceMode.NotificationHandlers.Content;
using Our.Umbraco.MaintenanceMode.NotificationHandlers.Media;
using Our.Umbraco.MaintenanceMode.NotificationHandlers.ServerVariables;
using Our.Umbraco.MaintenanceMode.Services;
using System.Collections.Generic;
using System.Linq;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.Dashboards;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Manifest;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Extensions;

namespace Our.Umbraco.MaintenanceMode.Composers
{
    public class MaintenceModeComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.AddMaintenceManager();
        }
    }

    public static class MaintenceModeBuilderExtension
    {
        public static IUmbracoBuilder AddMaintenceManager(this IUmbracoBuilder builder)
        {
            // check to see if this has already been added
            if (builder.Services.Any(x => x.ServiceType == typeof(MaintenanceModeService)))
                return builder;

            // settings first (used in services)
            builder.Services.Configure<MaintenanceModeSettings>
                (builder.Config.GetSection("MaintenanceMode"));


            builder.Services.AddTransient<IBackofficeUserAccessor, BackofficeUserAccessor>();
            builder.Services.AddUnique<IMaintenanceModeService, MaintenanceModeService>();

            builder.AddNotificationHandlers();
            builder.AddMaintenceManagerMiddleware();

            builder.AddNotificationHandler<ServerVariablesParsingNotification, ServerVariablesParsingHandler>();

            if (!builder.ManifestFilters().Has<MaintenanceModeManifestFilter>())
                builder.ManifestFilters().Append<MaintenanceModeManifestFilter>();

            return builder;
        }

        private static void AddNotificationHandlers(this IUmbracoBuilder builder)
        {
            builder.AddNotificationHandler<ContentCopyingNotification, FreezeContentCopyingNotification>()
                .AddNotificationHandler<ContentDeletingNotification, FreezeContentDeletingNotification>()
                .AddNotificationHandler<ContentMovingNotification, FreezeContentMovingNotification>()
                .AddNotificationHandler<ContentMovingToRecycleBinNotification, FreezeContentMovingToRecycleBinNotification>()
                .AddNotificationHandler<ContentPublishingNotification, FreezeContentPublishingNotification>()
                .AddNotificationHandler<ContentSavingNotification, FreezeContentSavingNotification>()
                .AddNotificationHandler<ContentUnpublishingNotification, FreezeContentUnpublishingNotification>()
                .AddNotificationHandler<MediaDeletingNotification, FreezeMediaDeletingNotification>()
                .AddNotificationHandler<MediaMovingNotification, FreezeMediaMovingNotification>()
                .AddNotificationHandler<MediaMovingToRecycleBinNotification, FreezeMediaMovingToRecycleBinNotification>()
                .AddNotificationHandler<MediaSavingNotification, FreezeMediaSavingNotification>();
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
                Scripts = new [] {
                    "/App_Plugins/Our.Umbraco.MaintenanceMode/MaintenanceMode.Dashboard.js",
                    "/App_Plugins/Our.Umbraco.MaintenanceMode/MaintenanceMode.Service.js"
                },
                Stylesheets = new [] {
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
