namespace Our.Umbraco.MaintenanceModeV9.Models
{
    public class MaintenanceModeStatus
    {
        public bool IsInMaintenanceMode { get; set; }
        public bool UsingWebConfig = false;
        public MaintenanceModeSettings Settings { get; set; }
        public bool IsContentFrozen { get; set; }
    }
}
