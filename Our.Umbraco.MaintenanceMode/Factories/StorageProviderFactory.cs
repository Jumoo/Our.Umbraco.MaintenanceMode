using System;
using Microsoft.Extensions.Options;
using Our.Umbraco.MaintenanceMode.Configurations;
using Our.Umbraco.MaintenanceMode.Providers;
using Umbraco.Cms.Core.Sync;

namespace Our.Umbraco.MaintenanceMode.Factories
{
    public class StorageProviderFactory : IStorageProviderFactory
    {
        private readonly Configurations.MaintenanceModeSettings _maintenanceModeSettings;
        private readonly IServiceProvider _serviceProvider;
        private readonly IServerRoleAccessor _serverRoleAccessor;

        public StorageProviderFactory(
            IOptions<Configurations.MaintenanceModeSettings> maintenanceModeSettings,
            IServiceProvider serviceProvider,
            IServerRoleAccessor serverRoleAccessor)
        {
            _maintenanceModeSettings = maintenanceModeSettings.Value;
            _serviceProvider = serviceProvider;
            _serverRoleAccessor = serverRoleAccessor;
        }

        //public StorageMode StorageMode => this._maintenanceModeSettings?.StorageMode ?? StorageMode.FileSystem;
        public StorageMode StorageMode
        {
            get
            {
                return _maintenanceModeSettings?.StorageMode ?? _serverRoleAccessor.CurrentServerRole switch
                {
                    // check server role to see if umbraco thinks it's load balanced
                    ServerRole.Subscriber or ServerRole.SchedulingPublisher => StorageMode.Database,
                    _ => StorageMode.FileSystem,
                };
            }
        }

        public IStorageProvider GetProvider() => StorageMode switch
        {
            StorageMode.Database => (IStorageProvider)_serviceProvider.GetService(typeof(DatabaseStorageProvider)),
            _ => (IStorageProvider)_serviceProvider.GetService(typeof(FileSystemStorageProvider))
        };
    }
}
