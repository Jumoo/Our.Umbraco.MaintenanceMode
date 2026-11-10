using Our.Umbraco.MaintenanceMode.Interfaces;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Extensions;

namespace Our.Umbraco.MaintenanceMode.NotificationHandlers.Element
{
    public class FreezeElementMovingNotification : INotificationHandler<ElementMovingNotification>
    {
        private readonly IMaintenanceModeService _maintenanceModeService;
        private readonly IBackofficeUserAccessor _backofficeUserAccessor;
        public FreezeElementMovingNotification(IMaintenanceModeService maintenanceModeService, IBackofficeUserAccessor backofficeUserAccessor)
        {
            _maintenanceModeService = maintenanceModeService;
            _backofficeUserAccessor = backofficeUserAccessor;
        }

        public void Handle(ElementMovingNotification notification)
        {
            FreezeGuard.CancelIfLockedOrFrozen(notification, _maintenanceModeService.Status.IsContentFrozen, _maintenanceModeService.Status.IsSiteLocked, _maintenanceModeService, _backofficeUserAccessor, FreezeGuard.DefaultContentFrozenMessage);
        }
    }
}
