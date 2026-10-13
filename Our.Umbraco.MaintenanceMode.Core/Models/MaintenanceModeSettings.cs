using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;

namespace Our.Umbraco.MaintenanceMode.Models
{
    [JsonObject(NamingStrategyType = typeof(DefaultNamingStrategy))]
    public class MaintenanceModeSettings
    {
        public bool AllowBackOfficeUsersThrough { get; set; } = false;
        public string TemplateName { get; set; } = "MaintenancePage";
        /// <summary>
        /// urls that can get past the maintenance screen
        /// </summary>
        public string UrlWhitelist { get; set; } = "";

        /// <summary>
        ///  users who can get past the content freeze 
        /// </summary>
        public string IpWhitelist { get; set; } = "";
        public string UnfrozenUsers { get; set; } = "";

        /// <summary>
        ///  expose the maintenance, freeze and lock flags (and nothing else) on an
        ///  anonymous status url - off by default
        /// </summary>
        public bool EnablePublicStatus { get; set; } = false;
        public MaintenanceMode ViewModel { get; set; }
    }
}
