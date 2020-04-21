namespace Our.Umbraco.MaintenanceModeV8.Models
{
    public class MaintenanceModeStatus
    {
        public bool IsInMaintenanceMode { get; set; }
        public bool UsingWebConfig { get; set; }
        public MaintenanceModeSettings Settings { get; set; }
    }

    public class MaintenanceModeSettings
    {
        public bool AllowBackOfficeUsersThrough { get; set; }
        public string TemplateName { get; set; }
    }
}
