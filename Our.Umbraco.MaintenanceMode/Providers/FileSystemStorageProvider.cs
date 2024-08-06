using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Options;
using Our.Umbraco.MaintenanceMode.Models;
using Serilog;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Extensions;

namespace Our.Umbraco.MaintenanceMode.Providers
{
    public class FileSystemStorageProvider : IStorageProvider
    {
        private readonly string _configFilePath;

        private readonly Configurations.MaintenanceModeSettings _maintenanceModeSettings;

        private readonly ILogger _logger;

        public FileSystemStorageProvider(
            ILogger logger,
            IOptions<Configurations.MaintenanceModeSettings> maintenanceModeSettings,
            IWebHostEnvironment webHostingEnvironment)
        {
            _maintenanceModeSettings = maintenanceModeSettings.Value;

            // put maintenanceMode config in the 'config folder'
            var configFolder = new DirectoryInfo(webHostingEnvironment.MapPathContentRoot(Constants.SystemDirectories.Config));
            _configFilePath = Path.Combine(configFolder.FullName, "maintenanceMode.json");
        }

        public async Task<MaintenanceModeStatus> Read()
        {
            if (_configFilePath != null && File.Exists(_configFilePath))
            {
                // load from config
                try
                {
                    var file = await File.ReadAllBytesAsync(_configFilePath);
                    var status = JsonSerializer.Deserialize<MaintenanceModeStatus>(file);
                    if (status != null)
                    {
                        return status;
                    }
                }
                catch (Exception ex)
                {
                    _logger.Warning(ex, string.Concat("Failed to load Status ", ex.Message));
                }
            }

            return null;
        }

        public async Task Save(MaintenanceModeStatus status)
        {
            try
            {
                if (File.Exists(_configFilePath))
                    File.Delete(_configFilePath);

                Directory.CreateDirectory(Path.GetDirectoryName(_configFilePath));

                string json = JsonSerializer.Serialize(status);
                await File.WriteAllTextAsync(_configFilePath, json);
            }
            catch (Exception ex)
            {
                _logger.Debug(ex, string.Concat("Failed to save config ", ex.Message));
            }
        }
    }
}
