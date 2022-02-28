using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Our.Umbraco.MaintenanceMode.Interfaces;
using Umbraco.Cms.Web.Common.Controllers;

namespace Our.Umbraco.MaintenanceMode.Controllers
{
    public class MaintenanceModeApiController : UmbracoApiController
    {
        private readonly IMaintenanceModeService _maintenanceModeService;
        private readonly Configurations.MaintenanceModeSettings _maintenanceModeSettings;

        public MaintenanceModeApiController(IMaintenanceModeService maintenanceModeService, IOptions<Configurations.MaintenanceModeSettings> maintenanceModeSettings)
        {
            _maintenanceModeService = maintenanceModeService;
            _maintenanceModeSettings = maintenanceModeSettings.Value;
        }

        [HttpGet]
        public IActionResult Toggle(string apiKey)
        {
            if (_maintenanceModeSettings.EnableApi &&
                _maintenanceModeSettings.ApiKey == apiKey &&
                (!string.IsNullOrEmpty(_maintenanceModeSettings.ApiKey) ||
                !string.IsNullOrWhiteSpace(_maintenanceModeSettings.ApiKey)))
            {
                var isEnabled = _maintenanceModeService.IsInMaintenanceMode;
                _maintenanceModeService.ToggleMaintenanceMode(!isEnabled);

                return Accepted();
            }

            return Unauthorized();
        }
    }
}
