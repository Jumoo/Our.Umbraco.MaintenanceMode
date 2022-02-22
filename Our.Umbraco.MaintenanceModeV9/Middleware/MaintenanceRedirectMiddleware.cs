using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

using Our.Umbraco.MaintenanceModeV9.Interfaces;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Our.Umbraco.MaintenanceModeV9.Middleware
{
    public class MaintenanceRedirectMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<MaintenanceRedirectMiddleware> _logger;
        private readonly IMaintenanceModeService _maintenanceModeService;

        public MaintenanceRedirectMiddleware(RequestDelegate next,
            ILogger<MaintenanceRedirectMiddleware> logger,
            IMaintenanceModeService maintenanceService)
        {
            _next = next;
            _logger = logger;
            _maintenanceModeService = maintenanceService;  
        }

        public async Task InvokeAsync(HttpContext context)
        {
            _logger.LogInformation("Middleware triggered {url}", context.Request.Path);

            if (_maintenanceModeService.IsInMaintenanceMode)
            {
                // do something...
                var newPath = new PathString("/maintain");

                context.Features.Set<IStatusCodeReExecuteFeature>(new StatusCodeReExecuteFeature()
                {
                    OriginalPath = context.Request.Path,
                    OriginalPathBase = context.Request.PathBase.Value,
                    OriginalQueryString = context.Request.QueryString.HasValue 
                        ? context.Request.QueryString.Value : null,
                });

                context.Request.Path = newPath;
            }
            await _next(context);
        }
    }
}
