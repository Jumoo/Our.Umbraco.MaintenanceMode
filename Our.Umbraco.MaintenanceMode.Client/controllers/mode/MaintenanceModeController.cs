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

        [HttpGet("Status")]
        [ProducesResponseType<MaintenanceModeStatus>(StatusCodes.Status200OK)]
        public MaintenanceModeStatus Status()
        {
            var status = _maintenanceModeService.Status;
            // Expose HasLockPassword in the status response (but not the actual password)
            // Note: MaintenanceModeStatus doesn't have this property yet, so we'll add it to the model
            return status;
        }

        [HttpGet("HasLockPassword")]
        [ProducesResponseType<bool>(StatusCodes.Status200OK)]
        public bool HasLockPassword() => _maintenanceModeService.HasLockPassword;

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

        [HttpGet("ToggleSiteLock")]
        [ProducesResponseType(200)]
        public void ToggleSiteLock(bool siteLocked)
        {
            // Only allow locking via this endpoint
            // Unlocking must be done via the UnlockSite endpoint with password
            if (!siteLocked)
            {
                throw new InvalidOperationException("Use the UnlockSite endpoint to unlock the site with a password.");
            }
            _maintenanceModeService.ToggleSiteLock(siteLocked);
        }

        [HttpPost("UnlockSite")]
        [ProducesResponseType(200)]
        [ProducesResponseType(500)]
        public async Task<IActionResult> UnlockSite([FromBody] UnlockSiteRequest request)
        {
            if (request == null || string.IsNullOrEmpty(request.Password))
            {
                return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Password is required" });
            }

            bool success = await _maintenanceModeService.TryUnlockSite(request.Password);

            if (success)
            {
                return Ok(new { message = "Site unlocked successfully" });
            }

            // Use 500 instead of 401 so that Umbraco's authentication middleware doesn't
            // interpret this as an expired/invalid backoffice session and log the user out
            return StatusCode(StatusCodes.Status500InternalServerError, new { message = "Invalid password" });
        }

        [HttpGet("ToggleAccess")]
        [ProducesResponseType(200)]
        public void ToggleAccess(bool maintenanceMode)
        {
            _maintenanceModeService.ToggleAccess(maintenanceMode);
        }

        [HttpGet("Settings")]
        [ProducesResponseType<MaintenanceModeSettings>(StatusCodes.Status200OK)]
        public MaintenanceModeSettings Settings() => _maintenanceModeService.Settings;

        [HttpPost("SaveSettings")]
        [ProducesResponseType(200)]
        public void SaveSettings(MaintenanceModeSettings settings)
        {
            _maintenanceModeService.SaveSettings(settings);
        }
    }

    public class UnlockSiteRequest
    {
        public string Password { get; set; } = string.Empty;
    }
}
