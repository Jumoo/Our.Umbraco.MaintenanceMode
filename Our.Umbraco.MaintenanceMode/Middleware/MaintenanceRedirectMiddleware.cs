using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;

using Our.Umbraco.MaintenanceMode.Interfaces;

using System.Threading.Tasks;

using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Services;

namespace Our.Umbraco.MaintenanceMode.Middleware
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
            _logger.LogDebug("Maintenance mode middleware triggered {url}", context.Request.Path);

            bool IsAuthenticated = IsBackOfficeAuthenticated(backofficeUserAccessor);

            if (backofficeUserAccessor != null)
            {
                if (_runtimeState.Level == RuntimeLevel.Run &&
                    _maintenanceModeService.Status.IsInMaintenanceMode)
                {
                    // todo figure out how to do this check here
                    if (!_maintenanceModeService.Status.Settings.AllowBackOfficeUsersThrough
                        && IsAuthenticated)
                    {
                        context = HandleRequest(context);
                    }
                    else if (!IsAuthenticated)
                    {
                        context = HandleRequest(context);
                    }
                }
            }

            await _next(context);
        }

        private bool IsBackOfficeAuthenticated(IBackofficeUserAccessor backofficeUserAccessor) {
            try {
                return backofficeUserAccessor.BackofficeUser?.IsAuthenticated ?? false;
            }
            catch(System.Exception ex) {
                // in v10 - this thows an erro internally, if there is no backoffice user 🤷‍♀️
                // _logger.LogWarning(ex, "Error getting back office user");
                return false;
            }
        }

        private static HttpContext HandleRequest(HttpContext context)
        {
            var newPath = new PathString($"/{MaintenanceMode.MaintenanceRoot}");

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
