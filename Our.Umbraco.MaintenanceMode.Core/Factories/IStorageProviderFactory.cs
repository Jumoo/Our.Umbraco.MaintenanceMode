using Our.Umbraco.MaintenanceMode.Configurations;
using Our.Umbraco.MaintenanceMode.Providers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Our.Umbraco.MaintenanceMode.Factories
{
    public interface IStorageProviderFactory
    {
        StorageMode StorageMode { get; }
        IStorageProvider GetProvider();
    }
}
