using Our.Umbraco.MaintenanceMode.Interfaces;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Extensions;

namespace Our.Umbraco.MaintenanceMode.NotificationHandlers.Content
{
    public class FreezeContentMovingToRecycleBinNotification : INotificationHandler<ContentMovingToRecycleBinNotification>
    {
        private readonly IMaintenanceModeService _maintenanceModeService;
        private readonly IBackofficeUserAccessor _backofficeUserAccessor;
        public FreezeContentMovingToRecycleBinNotification(IMaintenanceModeService maintenanceModeService, IBackofficeUserAccessor backofficeUserAccessor)
        {
            _maintenanceModeService = maintenanceModeService;
            _backofficeUserAccessor = backofficeUserAccessor;
        }

        public void Handle(ContentMovingToRecycleBinNotification notification)
        {
            FreezeGuard.CancelIfLocked(notification, _maintenanceModeService.Status.IsContentFrozen, _maintenanceModeService, _backofficeUserAccessor, FreezeGuard.DefaultContentFrozenMessage);
        }
    }
}
