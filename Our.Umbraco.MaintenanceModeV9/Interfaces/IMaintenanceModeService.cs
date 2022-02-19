using Our.Umbraco.MaintenanceModeV9.Models;

namespace Our.Umbraco.MaintenanceModeV9.Interfaces
{
    public interface IMaintenanceModeService
    {
        void ToggleMaintenanceMode(bool maintenanceMode);
        void ToggleContentFreeze(bool isContentFrozen);
        bool IsInMaintenanceMode { get; }
        bool IsContentFrozen { get;  }
        MaintenanceModeSettings Settings { get; }
        MaintenanceModeStatus Status { get; }
        void SaveSettings(MaintenanceModeSettings settings);
    }
}
