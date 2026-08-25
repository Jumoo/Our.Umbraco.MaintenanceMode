using Our.Umbraco.MaintenanceMode.Interfaces;

using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace Our.Umbraco.MaintenanceMode.NotificationHandlers.Settings
{
    public class FreezeMediaTypeMovingNotification : INotificationHandler<MediaTypeMovingNotification>
    {
        private readonly IMaintenanceModeService _maintenanceModeService;
        private readonly IBackofficeUserAccessor _backofficeUserAccessor;
        public FreezeMediaTypeMovingNotification(IMaintenanceModeService maintenanceModeService, IBackofficeUserAccessor backofficeUserAccessor)
        {
            _maintenanceModeService = maintenanceModeService;
            _backofficeUserAccessor = backofficeUserAccessor;
        }

        public void Handle(MediaTypeMovingNotification notification)
        {
            FreezeGuard.CancelIfLocked(notification, _maintenanceModeService.Status.IsSiteLocked, _maintenanceModeService, _backofficeUserAccessor, FreezeGuard.DefaultSiteLockedMessage);
        }
    }
}
