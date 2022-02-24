using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Our.Umbraco.MaintenanceModeV9.Interfaces;
using System.Threading.Tasks;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Services;

namespace Our.Umbraco.MaintenanceModeV9.Middleware
{
    public class MaintenanceRedirectMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<MaintenanceRedirectMiddleware> _logger;
        private readonly IMaintenanceModeService _maintenanceModeService;
        //private readonly IBackofficeUserAccessor _backofficeUserAccessor;
        private readonly IRuntimeState _runtimeState;

        public MaintenanceRedirectMiddleware(RequestDelegate next,
            ILogger<MaintenanceRedirectMiddleware> logger,
            IMaintenanceModeService maintenanceService/*, IBackofficeUserAccessor backofficeUserAccessor*/,
            IRuntimeState runtimeState)
        {
            _next = next;
            _logger = logger;
            _maintenanceModeService = maintenanceService;
            //_backofficeUserAccessor = backofficeUserAccessor;
            _runtimeState = runtimeState;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            _logger.LogInformation("Middleware triggered {url}", context.Request.Path);

            if (_runtimeState.Level == RuntimeLevel.Run &&
                _maintenanceModeService.IsInMaintenanceMode)
            {
                // todo figure out how to do this check here
                //if (!_maintenanceModeService.Settings.AllowBackOfficeUsersThrough
                //    && !_backofficeUserAccessor.BackofficeUser.IsAuthenticated)
                //{
                    // do something...
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
                //}

                await _next(context);
            }
        }
    }
}
