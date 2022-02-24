namespace Our.Umbraco.MaintenanceModeV8.Models
{
    public class MaintenanceModeStatus
    {
        public bool IsInMaintenanceMode { get; set; }
        public bool UsingWebConfig { get; set; }
        public MaintenanceModeSettings Settings { get; set; }
        public bool IsContentFrozen { get; set; }
    }
}
