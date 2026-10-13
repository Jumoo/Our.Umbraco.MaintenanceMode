using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Our.Umbraco.MaintenanceMode.Interfaces;

namespace Our.Umbraco.MaintenanceMode.Controllers
{
    /// <summary>
    ///  anonymous, read only status for monitoring dashboards. Only returns the three
    ///  state flags - never settings - and 404s unless EnablePublicStatus is turned on.
    /// </summary>
    /// <remarks>
    ///  lives under /umbraco so the maintenance middleware never redirects it.
    /// </remarks>
    [AllowAnonymous]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class MaintenanceModePublicStatusController : ControllerBase
    {
        public const string Route = "umbraco/maintenance/status";

        private static readonly JsonSerializerOptions _jsonOptions = new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase
        };

        private readonly IMaintenanceModeService _maintenanceModeService;

        public MaintenanceModePublicStatusController(IMaintenanceModeService maintenanceModeService)
        {
            _maintenanceModeService = maintenanceModeService;
        }

        [HttpGet(Route)]
        public IActionResult Get()
        {
            var status = _maintenanceModeService.Status;
            if (status?.Settings?.EnablePublicStatus != true)
                return NotFound();

            Response.Headers["Cache-Control"] = "no-store";

            // serialized here rather than left to the mvc formatter, so the shape is
            // the same whichever json serializer the umbraco version configures.
            var json = JsonSerializer.Serialize(new PublicStatus
            {
                IsInMaintenanceMode = status.IsInMaintenanceMode,
                IsContentFrozen = status.IsContentFrozen,
                IsSiteLocked = status.IsSiteLocked
            }, _jsonOptions);

            return Content(json, "application/json");
        }

        private class PublicStatus
        {
            public bool IsInMaintenanceMode { get; set; }
            public bool IsContentFrozen { get; set; }
            public bool IsSiteLocked { get; set; }
        }
    }
}
