using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace Our.Umbraco.MaintenanceMode.Models
{
    [JsonObject(NamingStrategyType = typeof(DefaultNamingStrategy))]
    public class MaintenanceModeStatus
    {
        public bool IsInMaintenanceMode { get; set; }
        public bool UsingWebConfig = false;
        public MaintenanceModeSettings Settings { get; set; }
        public bool IsContentFrozen { get; set; }
    }
}
