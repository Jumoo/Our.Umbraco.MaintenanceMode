namespace Our.Umbraco.MaintenanceMode.Configurations
{
    public class MaintenanceModeSettings
    {
        public bool IsInMaintenanceMode { get; set; }
        public bool IsContentFrozen { get; set; }
        public bool EnableApi { get; set; }
        public string ApiKey { get; set; }
    }
}
