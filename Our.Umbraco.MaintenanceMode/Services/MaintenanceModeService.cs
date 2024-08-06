using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using Our.Umbraco.MaintenanceMode.Factories;
using Our.Umbraco.MaintenanceMode.Interfaces;
using Our.Umbraco.MaintenanceMode.Models;
using Our.Umbraco.MaintenanceMode.Providers;
using Serilog;

using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;

using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Extensions;
using Umbraco.Cms.Core.Hosting;

namespace Our.Umbraco.MaintenanceMode.Services
{
    public class MaintenanceModeService : IMaintenanceModeService
    {
        private readonly ILogger _logger;
        private readonly IStorageProvider _storageProvider; 
        
        private readonly Configurations.MaintenanceModeSettings _maintenanceModeSettings;
        private readonly string _configFilePath;
        public MaintenanceModeStatus Status { get; private set; }

        public MaintenanceModeService(ILogger logger,
            IOptions<Configurations.MaintenanceModeSettings> maintenanceModeSettings, 
            IWebHostEnvironment webHostingEnvironment,
            IStorageProviderFactory storageProviderFactory)
        {
            _logger = logger;
            _storageProvider = storageProviderFactory.GetProvider();
            _maintenanceModeSettings = maintenanceModeSettings.Value;

            Status = LoadStatus().Result;
        }

        public bool IsInMaintenanceMode => Status.IsInMaintenanceMode;

        public bool IsContentFrozen => Status.IsContentFrozen;

        public MaintenanceModeSettings Settings => Status.Settings;

        public async Task ToggleMaintenanceMode(bool maintenanceMode)
        {
            if (maintenanceMode == Status.IsInMaintenanceMode)
                return; // already in this state

            Status.IsInMaintenanceMode = maintenanceMode;
            await _storageProvider.Save(Status);
        }

        public async Task ToggleContentFreeze(bool isContentFrozen)
        {
            if (isContentFrozen == Status.IsContentFrozen)
                return; // already in this state

            Status.IsContentFrozen = isContentFrozen;
            await _storageProvider.Save(Status);
        }

        public async Task SaveSettings(MaintenanceModeSettings settings)
        {
            Status.Settings = settings;
            await _storageProvider.Save(Status);
        }

        private async Task<MaintenanceModeStatus> LoadStatus()
        {
            var maintenanceModeStatus = new MaintenanceModeStatus
            {
                IsInMaintenanceMode = false,
                UsingWebConfig = false,
                Settings = new MaintenanceModeSettings
                {
                    ViewModel = new Models.MaintenanceMode()
                }
            };

            maintenanceModeStatus = await CheckStorage(maintenanceModeStatus);

            return CheckAppSettings(maintenanceModeStatus);
        }

        private MaintenanceModeStatus CheckAppSettings(MaintenanceModeStatus status)
        {
            if (_maintenanceModeSettings is null or { IsInMaintenanceMode: false })
                return status;

            status.IsInMaintenanceMode = _maintenanceModeSettings.IsInMaintenanceMode;
            status.IsContentFrozen = _maintenanceModeSettings.IsContentFrozen;
            status.UsingWebConfig = true;

            return status;
        }

        private async Task<MaintenanceModeStatus> CheckStorage(MaintenanceModeStatus status) 
            => await _storageProvider.Read() ?? status;
    }
}
