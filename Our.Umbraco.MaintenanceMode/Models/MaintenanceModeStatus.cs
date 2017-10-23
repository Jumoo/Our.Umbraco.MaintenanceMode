using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Our.Umbraco.MaintenanceMode.Models
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
