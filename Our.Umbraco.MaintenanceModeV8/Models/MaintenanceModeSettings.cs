namespace Our.Umbraco.MaintenanceModeV8.Models
{
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
