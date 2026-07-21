using Microsoft.Extensions.Options;

using Our.Umbraco.MaintenanceMode.Configurations;
using Our.Umbraco.MaintenanceMode.Factories;
using Our.Umbraco.MaintenanceMode.Interfaces;
using Our.Umbraco.MaintenanceMode.Models;
using Our.Umbraco.MaintenanceMode.Providers;

using Serilog;

using System;
using System.Threading.Tasks;
using Umbraco.Extensions;

namespace Our.Umbraco.MaintenanceMode.Services
{
    public class MaintenanceModeService : IMaintenanceModeService
    {
        private readonly ILogger _logger;
        private readonly IStorageProviderFactory _storageProviderFactory;

        private Configurations.MaintenanceModeSettings _maintenanceModeSettings;
        private readonly string _configFilePath;
        private MaintenanceModeStatus TrackedStatus { get; set; }
        public Models.MaintenanceModeSettings Settings => TrackedStatus.Settings;

        public MaintenanceModeStatus Status
        {
            get
            {
                // when in 'Database' storage mode we want to be fetching every time as this
                // typically will mean Umbraco is deployed in a distributed environment therefore
                // status can't be tracked in scope, it needs to be read from storage each time
                var status = _storageProviderFactory.StorageMode switch
                {
                    StorageMode.Database => GetFromStorageOrDefault().Result,
                    _ => TrackedStatus
                };

                // Always populate HasLockPassword from configuration
                status.HasLockPassword = HasLockPassword;

                return status;
            }
        }

        public MaintenanceModeService(ILogger logger,
            IOptionsMonitor<Configurations.MaintenanceModeSettings> maintenanceModeSettings,
            IStorageProviderFactory storageProviderFactory)
        {
            _logger = logger;
            _storageProviderFactory = storageProviderFactory;
            _maintenanceModeSettings = maintenanceModeSettings.CurrentValue;
            maintenanceModeSettings.OnChange((option) =>
            {
                _maintenanceModeSettings = option;
            });

            TrackedStatus = LoadStatus().Result;
        }

        public bool IsInMaintenanceMode => Status.IsInMaintenanceMode;

        public bool IsContentFrozen => Status.IsContentFrozen;

        public bool IsSiteLocked => Status.IsSiteLocked;

        public bool HasLockPassword => !string.IsNullOrWhiteSpace(_maintenanceModeSettings?.LockPassword);


        public IStorageProvider StorageProvider => _storageProviderFactory.GetProvider();

        public async Task ToggleMaintenanceMode(bool maintenanceMode)
        {
            // checking against TrackedStatus is fine even in distributed environments
            // the toggle will have been executed on the SchedulingPublisher app
            if (maintenanceMode == TrackedStatus.IsInMaintenanceMode)
                return; // already in this state

            TrackedStatus.IsInMaintenanceMode = maintenanceMode;
            await StorageProvider.Save(TrackedStatus);
        }

        public async Task ToggleContentFreeze(bool isContentFrozen)
        {
            // checking against TrackedStatus is fine even in distributed environments
            // the toggle will have been executed on the SchedulingPublisher app
            if (isContentFrozen == TrackedStatus.IsContentFrozen)
                return; // already in this state

            TrackedStatus.IsContentFrozen = isContentFrozen;
            await StorageProvider.Save(TrackedStatus);
        }

        public async Task ToggleSiteLock(bool isSiteLocked, string? username = null)
        {
            // checking against TrackedStatus is fine even in distributed environments
            // the toggle will have been executed on the SchedulingPublisher app
            if (isSiteLocked == TrackedStatus.IsSiteLocked)
                return; // already in this state

            TrackedStatus.IsSiteLocked = isSiteLocked;
            await StorageProvider.Save(TrackedStatus);

            _logger.Information(
                "Maintenance Mode: site was {LockState} by {Username}",
                isSiteLocked ? "locked" : "unlocked",
                string.IsNullOrWhiteSpace(username) ? "unknown user" : username);
        }

        public async Task<bool> TryUnlockSite(string password, string? username = null)
        {
            // If no password is configured, always allow unlock (backward-compatible)
            if (string.IsNullOrWhiteSpace(_maintenanceModeSettings?.LockPassword))
            {
                await ToggleSiteLock(false, username);
                return true;
            }

            // Validate password (plain-text comparison with ordinal)
            if (!string.Equals(password, _maintenanceModeSettings.LockPassword, StringComparison.Ordinal))
            {
                return false; // Invalid password
            }

            // Password is correct, unlock the site
            TrackedStatus.IsSiteLocked = false;
            await StorageProvider.Save(TrackedStatus);

            _logger.Information(
                "Maintenance Mode: site was unlocked by {Username}",
                string.IsNullOrWhiteSpace(username) ? "unknown user" : username);

            return true;
        }

        public async Task ToggleAccess(bool hasAccess)
        {
            if (hasAccess == Status.Settings.AllowBackOfficeUsersThrough)
                return; // already in this state

            Status.Settings.AllowBackOfficeUsersThrough = hasAccess;
            await StorageProvider.Save(TrackedStatus);
        }

        public bool AllowBackofficeUsersThrough(int? id) 
            => id is not null && Status.Settings.UnfrozenUsers.ToDelimitedList().Contains(id.ToString());

        //Status.Settings.UnfrozenUsers.Contains

        public async Task SaveSettings(Models.MaintenanceModeSettings settings)
        {
            TrackedStatus.Settings = settings;
            if (TrackedStatus.Settings.TemplateName == "undefined") TrackedStatus.Settings.TemplateName = "MaintenancePage";
            await StorageProvider.Save(TrackedStatus);
        }

        private static MaintenanceModeStatus _defaultStatus = new MaintenanceModeStatus
        {
            IsInMaintenanceMode = false,
            UsingWebConfig = false,
            Settings = new Models.MaintenanceModeSettings
            {
                ViewModel = new Models.MaintenanceMode()
            }
        };

        private async Task<MaintenanceModeStatus> LoadStatus()
        {
            // read from the storage location, if available
            var maintenanceModeStatus = await GetFromStorageOrDefault();

            // override from appsettings, if applicable
            return CheckAppSettings(maintenanceModeStatus);
        }

        private MaintenanceModeStatus CheckAppSettings(MaintenanceModeStatus status)
        {
            // If a lock password is configured, force the site to be locked on startup
            if (!string.IsNullOrWhiteSpace(_maintenanceModeSettings?.LockPassword))
            {
                status.IsSiteLocked = true;
            }

            if (_maintenanceModeSettings is null or { IsInMaintenanceMode: false })
                return status;

            status.IsInMaintenanceMode = _maintenanceModeSettings.IsInMaintenanceMode;
            status.IsContentFrozen = _maintenanceModeSettings.IsContentFrozen;
            status.IsSiteLocked = _maintenanceModeSettings.IsSiteLocked;
            status.UsingWebConfig = true;

            return status;
        }

        private async Task<MaintenanceModeStatus> GetFromStorageOrDefault()
        {
            return await StorageProvider.Read() ?? _defaultStatus;
        }
    }
}
