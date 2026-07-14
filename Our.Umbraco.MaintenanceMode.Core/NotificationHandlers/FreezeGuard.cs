using Our.Umbraco.MaintenanceMode.Interfaces;

using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Extensions;

namespace Our.Umbraco.MaintenanceMode.NotificationHandlers
{
    /// <summary>
    /// Shared logic for cancelling an Umbraco operation when a freeze/lock flag is active,
    /// unless the current backoffice user has been explicitly allowed through.
    /// </summary>
    internal static class FreezeGuard
    {
        public const string DefaultContentFrozenMessage = "This site is currently frozen during updates";
        public const string DefaultSiteLockedMessage = "This site is locked during updates - content, media, and settings cannot be changed";

        public static void CancelIfLocked<TEntity>(
            CancelableObjectNotification<TEntity> notification,
            bool isLocked,
            IMaintenanceModeService maintenanceModeService,
            IBackofficeUserAccessor backofficeUserAccessor,
            string message)
            where TEntity : class
        {
            if (!isLocked) return;

            if (backofficeUserAccessor.BackofficeUser == null) return;

            if (maintenanceModeService.AllowBackofficeUsersThrough(backofficeUserAccessor.BackofficeUser.GetId())) return;

            notification.CancelOperation(new EventMessage("Warning", message, EventMessageType.Error));
        }
    }
}
