using Microsoft.Extensions.Options;
using Our.Umbraco.MaintenanceMode.Configurations;
using Our.Umbraco.MaintenanceMode.Providers;
using System;
using Umbraco.Cms.Core.Configuration.Models;

namespace Our.Umbraco.MaintenanceMode.Factories
{
    public class StorageProviderFactory : IStorageProviderFactory
    {
        private readonly Configurations.MaintenanceModeSettings _maintenanceModeSettings;
        private readonly IOptions<GlobalSettings> _globalSettings;
        private readonly IServiceProvider _serviceProvider;

        public StorageProviderFactory(
            IOptions<Configurations.MaintenanceModeSettings> maintenanceModeSettings,
            IOptions<GlobalSettings> globalSettings,
            IServiceProvider serviceProvider)
        {
            _maintenanceModeSettings = maintenanceModeSettings.Value;
            _serviceProvider = serviceProvider; 
            _globalSettings = globalSettings;
        }

        //public StorageMode StorageMode => this._maintenanceModeSettings?.StorageMode ?? StorageMode.FileSystem;
        public StorageMode StorageMode
        {
            get
            {
                if (_maintenanceModeSettings?.StorageMode is not null)
                {
                    // if it's been explicitly set in config
                    // this is particularly useful for testing (!)
                    return _maintenanceModeSettings.StorageMode;
                }
                else if (_globalSettings.Value.MainDomLock is not "MainDomSemaphoreLock") 
                {
                    // otherwise detect whether Umbraco is running in a distributed environment, if so we can't rely on file system/application scope
                    // by default Umbraco runs under the semaphore lock
                    // see https://docs.umbraco.com/umbraco-cms/fundamentals/setup/server-setup/load-balancing/azure-web-apps#host-synchronization
                    return StorageMode.Database;
                }
                
                return StorageMode.FileSystem;
            }
        }

        public IStorageProvider GetProvider() => StorageMode switch
        {
            StorageMode.Database => (IStorageProvider)_serviceProvider.GetService(typeof(DatabaseStorageProvider)),
            _ => (IStorageProvider)_serviceProvider.GetService(typeof(FileSystemStorageProvider))
        };
    }
}
