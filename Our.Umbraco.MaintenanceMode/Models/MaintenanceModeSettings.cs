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
        public string UnfrozenUsers { get; set; } = "";
        public string PageTitle { get; set; } = "Site Maintenance";
        public string Title { get; set; } = "Under Maintenance";
        public string Text { get; set; } = "The Website is currently undergoing maintenance and will be back shortly.";
    }
}
