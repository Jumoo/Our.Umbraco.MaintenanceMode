using Newtonsoft.Json.Serialization;
using Newtonsoft.Json;
using System.Linq;
using System.Collections.Generic;

namespace Our.Umbraco.MaintenanceMode.Models
{
    [JsonObject(NamingStrategyType = typeof(DefaultNamingStrategy))]
    public class MaintenanceModeSettings
    {
        public bool AllowBackOfficeUsersThrough { get; set; } = false;
        public string TemplateName { get; set; } = "MaintenancePage";

        /// <summary>
        ///  users who can get past the content freeze 
        /// </summary>
        public string UnfrozenUsers { get; set; } = "";

        public List<string> UnfrozenUsersList
        {
            get
            {
                return UnfrozenUsers?.Split(',')
                                     .Select(s => s.Trim())
                                     .Where(s => !string.IsNullOrEmpty(s))
                                     .Distinct()
                                     .ToList() ?? new List<string>();
            }
        }

        public MaintenanceMode ViewModel { get; set; }
    }
}
