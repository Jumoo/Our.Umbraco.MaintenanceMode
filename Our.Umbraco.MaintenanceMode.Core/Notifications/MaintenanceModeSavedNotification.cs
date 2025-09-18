using Our.Umbraco.MaintenanceMode.Models;
using Umbraco.Cms.Core.Notifications;

namespace Our.Umbraco.MaintenanceMode.Notifications
{
    public sealed class MaintenanceModeSavedNotification : INotification
    {
        public bool IsInMaintenanceMode { get; }
        public bool IsContentFrozen { get; }

        public MaintenanceModeSavedNotification(MaintenanceModeStatus status)
        {
            IsInMaintenanceMode = status.IsInMaintenanceMode;
            IsContentFrozen = status.IsContentFrozen;
        }
    }
}
