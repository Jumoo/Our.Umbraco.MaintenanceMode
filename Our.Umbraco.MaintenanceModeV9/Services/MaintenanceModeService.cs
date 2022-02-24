using System;
using System.IO;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using Our.Umbraco.MaintenanceModeV9.Interfaces;
using Our.Umbraco.MaintenanceModeV9.Models;
using Serilog;

using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Hosting;

namespace Our.Umbraco.MaintenanceModeV9.Services
{
    public class MaintenanceModeService : IMaintenanceModeService
    {
        private readonly ILogger _logger;
        private readonly Configurations.MaintenanceModeSettings _maintenanceModeSettings;
        private readonly string _configFilePath;
        public MaintenanceModeStatus Status { get; private set; }

        public MaintenanceModeService(ILogger logger,
            IOptions<Configurations.MaintenanceModeSettings> maintenanceModeSettings, IHostingEnvironment hostingEnvironment)
        {
            _logger = logger;
            _maintenanceModeSettings = maintenanceModeSettings.Value;

            // put maintenanceMode config in the 'config folder'
            var configFolder = new DirectoryInfo(hostingEnvironment.MapPathContentRoot(Constants.SystemDirectories.Config));
            _configFilePath = Path.Combine(configFolder.FullName, "maintenanceMode.json");

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
            await SaveToDisk();
        }

        public async Task ToggleContentFreeze(bool isContentFrozen)
        {
            if (isContentFrozen == Status.IsContentFrozen)
                return; // already in this state

            Status.IsContentFrozen = isContentFrozen;
            await SaveToDisk();
        }

        public async Task SaveSettings(MaintenanceModeSettings settings)
        {
            Status.Settings = settings;
            await SaveToDisk();
        }

        private async Task<MaintenanceModeStatus> LoadStatus()
        {
            var maintenanceModeStatus = new MaintenanceModeStatus
            {
                IsInMaintenanceMode = false,
                UsingWebConfig = false,
                Settings = new MaintenanceModeSettings
                {
                    ViewModel = new MaintenanceMode()
                }
            };

            if (_configFilePath != null && File.Exists(_configFilePath))
            {
                // load from config
                try
                {
                    var file = await File.ReadAllBytesAsync(_configFilePath);
                    var status = JsonSerializer.Deserialize<MaintenanceModeStatus>(file);
                    if (status != null)
                    {
                        maintenanceModeStatus = status;
                    }
                }
                catch (Exception ex)
                {
                    _logger.Warning(ex, string.Concat("Failed to load Status ", ex.Message));
                }
            }

            return CheckAppSettings(maintenanceModeStatus);
        }

        private async Task SaveToDisk()
        {
            try
            {
                if (File.Exists(_configFilePath))
                    File.Delete(_configFilePath);

                Directory.CreateDirectory(Path.GetDirectoryName(_configFilePath));

                string json = JsonSerializer.Serialize(Status);
                await File.WriteAllTextAsync(_configFilePath, json);
            }
            catch (Exception ex)
            {
                _logger.Debug(ex, string.Concat("Failed to save config ", ex.Message));
            }
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
    }
}
