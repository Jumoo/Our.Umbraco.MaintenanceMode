namespace Our.Umbraco.MaintenanceMode.Configurations
{
    public class MaintenanceModeSettings
    {
        public bool IsInMaintenanceMode { get; set; }
        public bool IsContentFrozen { get; set; }
        public StorageMode StorageMode { get; set; }
        public int WaitTimeBetweenDatabaseCalls { get; set; } = 30;
    }
}
