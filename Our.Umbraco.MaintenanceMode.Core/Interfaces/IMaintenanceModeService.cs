using System.Threading.Tasks;
using Our.Umbraco.MaintenanceMode.Models;

namespace Our.Umbraco.MaintenanceMode.Interfaces
{
    public interface IMaintenanceModeService
    {
        Task ToggleMaintenanceMode(bool maintenanceMode);
        Task ToggleContentFreeze(bool isContentFrozen);
        Task ToggleSiteLock(bool isSiteLocked);
        Task<bool> TryUnlockSite(string password);
        bool IsInMaintenanceMode { get; }
        bool IsContentFrozen { get; }
        bool IsSiteLocked { get; }
        bool HasLockPassword { get; }
        MaintenanceModeSettings Settings { get; }
        MaintenanceModeStatus Status { get; }
        Task SaveSettings(MaintenanceModeSettings settings);
        Task ToggleAccess(bool hasAccess);
        bool AllowBackofficeUsersThrough(int? id);
    }
}
