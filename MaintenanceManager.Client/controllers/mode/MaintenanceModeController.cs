using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Mvc;
using Our.Umbraco.MaintenanceMode.Interfaces;

namespace MaintenanceManager.Client.controllers.mode
{

    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "Maintenance Mode")]
    public class MaintenanceModeController : MaintentanceModeControllerBase
    {
        private readonly IMaintenanceModeService _maintenanceModeService;

        public MaintenanceModeController(IMaintenanceModeService maintenanceModeService)
        {
            _maintenanceModeService = maintenanceModeService;
        }

        [HttpGet("ToggleMode")]
        [ProducesResponseType(200)]
        public void ToggleMode(bool maintenanceMode)
        {
            _maintenanceModeService.ToggleMaintenanceMode(maintenanceMode);
        }
    }
}
