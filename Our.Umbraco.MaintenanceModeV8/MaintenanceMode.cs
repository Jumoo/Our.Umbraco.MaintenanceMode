using System;
using System.Configuration;
using System.IO;
using System.Xml.Serialization;
using Our.Umbraco.MaintenanceModeV8.Models;
using Umbraco.Core.IO;
using Umbraco.Core.Logging;

namespace Our.Umbraco.MaintenanceModeV8
{
    public class MaintenanceMode
    {
        private readonly ILogger _logger;

        public MaintenanceMode(ILogger logger)
        {
            _logger = logger;
        }

        private static MaintenanceMode _instance;
        public static MaintenanceMode Current
        {
            get
            {
                if (_instance != null) 
                    return _instance;

                _instance = new MaintenanceMode();
                _instance.InitializeCurrent();

                return _instance;
            }
        }

        public MaintenanceModeStatus Status { get; private set; }

        private readonly string _configFilePath;

        private MaintenanceMode()
        {
            _configFilePath = IOHelper.MapPath(
                Path.Combine(SystemDirectories.Config, "MaintenanceMode.Config"));
            
        }

        private void InitializeCurrent()
        {
            Status = InitializeStatus();
        }

        public void ToggleMaintenanceMode(bool maintenanceMode)
        {
            if (maintenanceMode == Status.IsInMaintenanceMode) 
                return;

            Status.IsInMaintenanceMode = maintenanceMode;
            PersistStatusToDisk();
        }

        public void SaveSettings(MaintenanceModeSettings settings)
        {
            Status.Settings = settings;
            PersistStatusToDisk();
        }

        private MaintenanceModeStatus InitializeStatus()
        {
            MaintenanceModeStatus status = null;

            if (_configFilePath != null && File.Exists(_configFilePath))
            {
                try
                {
                    var serializer = new XmlSerializer(typeof(MaintenanceModeStatus));
                    var xml = File.ReadAllText(_configFilePath);
                    using(TextReader reader = new StringReader(xml))
                    {
                        status = (MaintenanceModeStatus)serializer.Deserialize(reader);
                    }
                }
                catch(Exception ex)
                {
                    _logger.Warn<MaintenanceMode>("Failed to load maintance mode settings file: {0}", ex.Message);
                }
            }

            if (status == null) {
                status = new MaintenanceModeStatus
                {
                    IsInMaintenanceMode = false,
                    Settings = new MaintenanceModeSettings
                    {
                        AllowBackOfficeUsersThrough = false,
                        TemplateName = "MaintenancePage"
                    }
                };
            }

            status = CheckWebConfig(status);

            return status; 
        }

        private static MaintenanceModeStatus CheckWebConfig(MaintenanceModeStatus status)
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


        private void PersistStatusToDisk()
        {
            try
            {
                if (File.Exists(_configFilePath))
                    File.Delete(_configFilePath);

                var serializer = new XmlSerializer(typeof(MaintenanceModeStatus));

                using(var w = new StreamWriter(_configFilePath))
                {
                    serializer.Serialize(w, Status);
                }
            }
            catch(Exception ex)
            {
                _logger.Warn<MaintenanceMode>("Failed to save maintance mode settings file: {0}", ex.Message);
            }
        }
    }
}
