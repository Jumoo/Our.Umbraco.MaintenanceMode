using System;
using System.IO;
using System.Text.Json;
using Microsoft.Extensions.Options;
using Our.Umbraco.MaintenanceModeV9.Interfaces;
using Our.Umbraco.MaintenanceModeV9.Models;
using Serilog;
using Umbraco.Cms.Core.Hosting;

namespace Our.Umbraco.MaintenanceModeV9.Services
{
    public class MaintenanceModeService :  IMaintenanceModeService
    {
        private readonly ILogger _logger;
        private readonly Configurations.MaintenanceModeSettings _maintenanceModeSettings;
        private readonly string _configFilePath;
        public MaintenanceModeStatus Status { get; private set; }

        public MaintenanceModeService(ILogger logger, IOptions<Configurations.MaintenanceModeSettings> maintenanceModeSettings, IHostingEnvironment hostingEnvironment)
        {
            _logger = logger;
            _maintenanceModeSettings = maintenanceModeSettings.Value;
            _configFilePath = hostingEnvironment.MapPathContentRoot("~/umbraco/config/maintenanceMode.json");

            Status = LoadStatus();
        }

        public bool IsInMaintenanceMode => Status.IsInMaintenanceMode;

        public bool IsContentFrozen => Status.IsContentFrozen;

        public MaintenanceModeSettings Settings => Status.Settings;

        public void ToggleMaintenanceMode(bool maintenanceMode)
        {
            if (maintenanceMode == Status.IsInMaintenanceMode)
                return; // already in this state

            Status.IsInMaintenanceMode = maintenanceMode;
            SaveToDisk();
        }

        public void ToggleContentFreeze(bool isContentFrozen)
        {
            if (isContentFrozen == Status.IsContentFrozen)
                return; // already in this state

            Status.IsContentFrozen = isContentFrozen;
            SaveToDisk();
        }

        public void SaveSettings(MaintenanceModeSettings settings)
        {
            Status.Settings = settings;
            SaveToDisk();
        }

        private MaintenanceModeStatus LoadStatus()
        {
            var maintenanceModeStatus = new MaintenanceModeStatus
            {
                IsInMaintenanceMode = false,
                Settings = new MaintenanceModeSettings
                {
                    AllowBackOfficeUsersThrough = false,
                    TemplateName = "MaintenancePage"
                }
            };

            if (_configFilePath != null && File.Exists(_configFilePath))
            {
                // load from config
                try
                {
                    var settings = JsonSerializer.Deserialize<MaintenanceModeSettings>(_configFilePath);
                    maintenanceModeStatus.Settings = settings;
                }
                catch (Exception ex)
                {
                    _logger.Warning(ex, string.Concat("Failed to load Status ", ex.Message));
                }
            }

            return CheckAppSettings(maintenanceModeStatus);
        }

        private void SaveToDisk()
        {
            try
            {
                if (File.Exists(_configFilePath))
                    File.Delete(_configFilePath);

                string json = JsonSerializer.Serialize(Status);
                File.WriteAllText(_configFilePath, json);
            }
            catch (Exception ex)
            {
                _logger.Debug(ex, string.Concat("Failed to save config ", ex.Message));
            }
        }

        private MaintenanceModeStatus CheckAppSettings(MaintenanceModeStatus status)
        {
            if (_maintenanceModeSettings == null)
                return status;

            status.IsInMaintenanceMode = _maintenanceModeSettings.Enabled;

            if (_maintenanceModeSettings.Enabled)
            {
                status.UsingWebConfig = true;
            }

            return status;
        }
    }
}
