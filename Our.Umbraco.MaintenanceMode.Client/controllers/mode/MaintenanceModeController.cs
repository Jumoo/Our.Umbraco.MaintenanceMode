using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Asp.Versioning;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Our.Umbraco.MaintenanceMode.Client.controllers;
using Our.Umbraco.MaintenanceMode.Interfaces;
using Our.Umbraco.MaintenanceMode.Models;

namespace Our.Umbraco.MaintenanceMode.Client.controllers.mode
{

    [ApiVersion("1.0")]
    [ApiExplorerSettings(GroupName = "Maintenance Mode")]
    public class MaintenanceModeController : MaintentanceModeControllerBase
    {
        private readonly IMaintenanceModeService _maintenanceModeService;

        public MaintenanceModeController(IMaintenanceModeService maintenanceModeService)
            : base()
        {
            _maintenanceModeService = maintenanceModeService;
        }

        [HttpGet("GetStatus")]
        [ProducesResponseType<MaintenanceModeStatus>(StatusCodes.Status200OK)]
        public MaintenanceModeStatus GetStatus() => _maintenanceModeService.Status;

        [HttpGet("ToggleMode")]
        [ProducesResponseType(200)]
        public void ToggleMode(bool maintenanceMode)
        {
            _maintenanceModeService.ToggleMaintenanceMode(maintenanceMode);
        }

        [HttpGet("ToggleFrozen")]
        [ProducesResponseType(200)]
        public void ToggleFrozen(bool maintenanceMode)
        {
            _maintenanceModeService.ToggleContentFreeze(maintenanceMode);
        }

        [HttpGet("ToggleAccess")]
        [ProducesResponseType(200)]
        public void ToggleAccess(bool maintenanceMode)
        {
            _maintenanceModeService.ToggleAccess(maintenanceMode);
        }

        [HttpGet("GetSettings")]
        [ProducesResponseType<MaintenanceModeSettings>(StatusCodes.Status200OK)]
        public MaintenanceModeSettings GetSettings() => _maintenanceModeService.Settings;

        [HttpPost("SaveSettings")]
        [ProducesResponseType(200)]
        public void SaveSettings(MaintenanceModeSettings settings)
        {
            _maintenanceModeService.SaveSettings(settings);
        }
    }
}
