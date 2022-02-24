using Microsoft.Extensions.DependencyInjection;

using Our.Umbraco.MaintenanceModeV9.Configurations;
using Our.Umbraco.MaintenanceModeV9.Interfaces;
using Our.Umbraco.MaintenanceModeV9.NotificationHandlers.Content;
using Our.Umbraco.MaintenanceModeV9.NotificationHandlers.Media;
using Our.Umbraco.MaintenanceModeV9.NotificationHandlers.Routing;
using Our.Umbraco.MaintenanceModeV9.NotificationHandlers.ServerVariables;
using Our.Umbraco.MaintenanceModeV9.Services;

using System.Linq;

using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Extensions;

namespace Our.Umbraco.MaintenanceModeV9.Composers
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
                .AddNotificationHandler<MediaSavingNotification, FreezeMediaSavingNotification>()
                .AddNotificationHandler<RoutingRequestNotification, RoutingRequestHandler>();
        }
    }


}
