using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Our.Umbraco.MaintenanceMode.Configurations;
using Our.Umbraco.MaintenanceMode.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Our.Umbraco.MaintenanceMode.Factories
{
    public class StorageProviderFactory : IStorageProviderFactory
    {
        private readonly Configurations.MaintenanceModeSettings _maintenanceModeSettings;

        private readonly IServiceProvider _serviceProvider;

        public StorageProviderFactory(IOptions<Configurations.MaintenanceModeSettings> maintenanceModeSettings,
            IServiceProvider serviceProvider)
        {
            _maintenanceModeSettings = maintenanceModeSettings.Value;
            _serviceProvider = serviceProvider;
        }

        public StorageMode StorageMode => this._maintenanceModeSettings?.StorageMode ?? StorageMode.FileSystem;

        public IStorageProvider GetProvider() => StorageMode switch
        {
            _ => (IStorageProvider)_serviceProvider.GetService(typeof(FileSystemStorageProvider))
        };
    }
}
