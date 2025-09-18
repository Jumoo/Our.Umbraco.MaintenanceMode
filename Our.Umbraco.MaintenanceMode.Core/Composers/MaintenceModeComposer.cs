using Microsoft.Extensions.DependencyInjection;

using Our.Umbraco.MaintenanceMode.Configurations;
using Our.Umbraco.MaintenanceMode.Factories;
using Our.Umbraco.MaintenanceMode.Interfaces;
using Our.Umbraco.MaintenanceMode.NotificationHandlers.Application;
using Our.Umbraco.MaintenanceMode.NotificationHandlers.Content;
using Our.Umbraco.MaintenanceMode.NotificationHandlers.Media;
using Our.Umbraco.MaintenanceMode.Providers;
using Our.Umbraco.MaintenanceMode.Services;
using System.Linq;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
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
            builder.Services.AddSingleton<IStorageProviderFactory, StorageProviderFactory>();
            builder.Services.AddSingleton<FileSystemStorageProvider>()
                            .AddSingleton<IStorageProvider, FileSystemStorageProvider>(s => s.GetService<FileSystemStorageProvider>());
            builder.Services.AddSingleton<DatabaseStorageProvider>()
                            .AddSingleton<IStorageProvider, DatabaseStorageProvider>(s => s.GetService<DatabaseStorageProvider>());
            builder.Services.AddUnique<IMaintenanceModeService, MaintenanceModeService>();

            builder.AddNotificationHandlers();
            builder.AddMaintenceManagerMiddleware();

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

            builder.AddNotificationHandler<UmbracoApplicationStartingNotification, UmbracoApplicationStartingHandler>();
        }
    }
}
