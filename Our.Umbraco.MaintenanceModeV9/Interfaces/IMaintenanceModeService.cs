using System.Threading.Tasks;
using Our.Umbraco.MaintenanceModeV9.Models;

namespace Our.Umbraco.MaintenanceModeV9.Interfaces
{
    public interface IMaintenanceModeService
    {
        Task ToggleMaintenanceMode(bool maintenanceMode);
        Task ToggleContentFreeze(bool isContentFrozen);
        bool IsInMaintenanceMode { get; }
        bool IsContentFrozen { get;  }
        MaintenanceModeSettings Settings { get; }
        MaintenanceModeStatus Status { get; }
        Task SaveSettings(MaintenanceModeSettings settings);
    }
}
