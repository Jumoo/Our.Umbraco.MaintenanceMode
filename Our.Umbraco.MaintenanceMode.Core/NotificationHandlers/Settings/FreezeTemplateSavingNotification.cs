using Our.Umbraco.MaintenanceMode.Interfaces;

using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;

namespace Our.Umbraco.MaintenanceMode.NotificationHandlers.Settings
{
    public class FreezeTemplateSavingNotification : INotificationHandler<TemplateSavingNotification>
    {
        private readonly IMaintenanceModeService _maintenanceModeService;
        private readonly IBackofficeUserAccessor _backofficeUserAccessor;
        public FreezeTemplateSavingNotification(IMaintenanceModeService maintenanceModeService, IBackofficeUserAccessor backofficeUserAccessor)
        {
            _maintenanceModeService = maintenanceModeService;
            _backofficeUserAccessor = backofficeUserAccessor;
        }

        public void Handle(TemplateSavingNotification notification)
        {
            FreezeGuard.CancelIfLocked(notification, _maintenanceModeService.Status.IsSiteLocked, _maintenanceModeService, _backofficeUserAccessor, FreezeGuard.DefaultSiteLockedMessage);
        }
    }
}
