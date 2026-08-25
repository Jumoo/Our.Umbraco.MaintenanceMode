namespace Our.Umbraco.MaintenanceMode.Configurations
{
    public class MaintenanceModeSettings
    {
        public bool IsInMaintenanceMode { get; set; }
        public bool IsContentFrozen { get; set; }
        public bool IsSiteLocked { get; set; }
        public string? LockPassword { get; set; }
        public StorageMode StorageMode { get; set; } = StorageMode.Auto;
        public int WaitTimeBetweenDatabaseCalls { get; set; } = 30;
    }
}
