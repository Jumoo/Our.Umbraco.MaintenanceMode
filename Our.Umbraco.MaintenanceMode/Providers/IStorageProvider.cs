using Our.Umbraco.MaintenanceMode.Models;
using System.Threading.Tasks;

namespace Our.Umbraco.MaintenanceMode.Providers
{
    public interface IStorageProvider
    {
        Task Save(MaintenanceModeStatus status);
        Task<MaintenanceModeStatus> Read();
    }
}
