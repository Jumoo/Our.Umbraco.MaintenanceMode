using System;
using System.Configuration;
using System.IO;
using System.Xml.Serialization;

using Our.Umbraco.MaintenanceModeV8.Models;

using Umbraco.Core.IO;
using Umbraco.Core.Logging;

namespace Our.Umbraco.MaintenanceModeV8.Services
{
    public class MaintenanceModeService
    {
        private readonly string configFilePath;
        private readonly IProfilingLogger logger;

        public MaintenanceModeStatus Status { get; private set; }

        public MaintenanceModeService(IProfilingLogger logger)
        {
            this.logger = logger;

            configFilePath = IOHelper.MapPath(
                Path.Combine(SystemDirectories.Config, "MaintenanceMode.Config"));

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
            Status = null;

            if (configFilePath != null && File.Exists(configFilePath))
            {
                // load from config
                try
                {
                    var serializer = new XmlSerializer(typeof(MaintenanceModeStatus));
                    var xml = File.ReadAllText(configFilePath);
                    using (TextReader reader = new StringReader(xml))
                    {
                        Status = (MaintenanceModeStatus)serializer.Deserialize(reader);
                    }
                }
                catch (Exception ex)
                {
                    logger.Warn<MaintenanceModeService>("Failed to load Status {error}", ex.Message);
                }
            }

            if (Status == null)
            {
                Status = new MaintenanceModeStatus
                {
                    IsInMaintenanceMode = false,
                    Settings = new MaintenanceModeSettings
                    {
                        AllowBackOfficeUsersThrough = false,
                        TemplateName = "MaintenancePage"
                    }
                };
            }

            return CheckWebConfig(Status);
        }

        private void SaveToDisk()
        {
            try
            {
                if (File.Exists(configFilePath))
                    File.Delete(configFilePath);

                var serializer = new XmlSerializer(typeof(MaintenanceModeStatus));

                using (StreamWriter writer = new StreamWriter(configFilePath))
                {
                    serializer.Serialize(writer, Status);
                }
            }
            catch (Exception ex)
            {
                logger.Warn<MaintenanceModeService>("Failed to save config {error}", ex.Message);
            }
        }

        private MaintenanceModeStatus CheckWebConfig(MaintenanceModeStatus status)
        {
            var webConfigSetting = ConfigurationManager.AppSettings["MaintenanceMode"];
            if (webConfigSetting == null)
                return status;

            if (!bool.TryParse(webConfigSetting, out var mode))
                return status;

            status.IsInMaintenanceMode = mode;
            status.UsingWebConfig = true;

            return status;
        }

    }
}
