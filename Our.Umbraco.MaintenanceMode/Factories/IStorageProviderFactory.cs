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
        IStorageProvider GetProvider();
    }
}
