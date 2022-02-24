using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Our.Umbraco.MaintenanceModeV9.Interfaces;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Services;

namespace Our.Umbraco.MaintenanceModeV9.Middleware
{
    public class MaintenanceRedirectMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<MaintenanceRedirectMiddleware> _logger;
        private readonly IMaintenanceModeService _maintenanceModeService;
        private readonly IRuntimeState _runtimeState;

        public MaintenanceRedirectMiddleware(RequestDelegate next,
            ILogger<MaintenanceRedirectMiddleware> logger,
            IMaintenanceModeService maintenanceService,
            IRuntimeState runtimeState)
        {
            _next = next;
            _logger = logger;
            _maintenanceModeService = maintenanceService;
            _runtimeState = runtimeState;
        }

        public async Task InvokeAsync(HttpContext context, IBackofficeUserAccessor backofficeUserAccessor)
        {
            _logger.LogInformation("Middleware triggered {url}", context.Request.Path);

            if (_runtimeState.Level == RuntimeLevel.Run &&
                _maintenanceModeService.IsInMaintenanceMode)
            {
                // todo figure out how to do this check here
                if (!_maintenanceModeService.Settings.AllowBackOfficeUsersThrough
                    && backofficeUserAccessor.BackofficeUser.IsAuthenticated)
                {
                    context = HandleRequest(context);
                }
                else if (!backofficeUserAccessor.BackofficeUser.IsAuthenticated)
                {
                    context = HandleRequest(context);
                }

                await _next(context);
            }
        }

        private static HttpContext HandleRequest(HttpContext context)
        {
            var newPath = new PathString("/maintain");

            context.Features.Set<IStatusCodeReExecuteFeature>(new StatusCodeReExecuteFeature()
            {
                OriginalPath = context.Request.Path,
                OriginalPathBase = context.Request.PathBase.Value,
                OriginalQueryString = context.Request.QueryString.HasValue
                    ? context.Request.QueryString.Value
                    : null,
            });

            context.Request.Path = newPath;
            return context;
        }
    }
}
