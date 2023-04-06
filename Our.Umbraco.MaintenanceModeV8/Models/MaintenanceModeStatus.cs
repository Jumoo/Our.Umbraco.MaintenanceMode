using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Our.Umbraco.MaintenanceModeV8.Models
{
    [JsonObject(NamingStrategyType = typeof(DefaultNamingStrategy))]
    public class MaintenanceModeStatus
    {
        public bool IsInMaintenanceMode { get; set; }
        public bool UsingWebConfig { get; set; }
        public MaintenanceModeSettings Settings { get; set; }
        public bool IsContentFrozen { get; set; }
    }

    [JsonObject(NamingStrategyType = typeof(DefaultNamingStrategy))]
    public class MaintenanceModeSettings
    {
        public bool AllowBackOfficeUsersThrough { get; set; }
        public string TemplateName { get; set; }

        /// <summary>
        ///  users who can get past the content freeze 
        /// </summary>
        public string UnfrozenUsers { get; set; } = "";
    }
}
