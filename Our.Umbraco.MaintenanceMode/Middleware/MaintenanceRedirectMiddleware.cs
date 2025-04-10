using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using Our.Umbraco.MaintenanceMode.Interfaces;
using System;
using System.Linq;
using System.Threading.Tasks;

using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Services;
using Umbraco.Extensions;

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
            if (_runtimeState.Level < RuntimeLevel.Run)
            {
                await _next(context);
                return;
            }
            _logger.LogDebug("Maintenance mode middleware triggered {url}", context.Request.Path);

            if (IsAllowedPath(context) == true)
            {
                await _next(context);
                return;
            };

            bool IsAuthenticated = IsBackOfficeAuthenticated(backofficeUserAccessor);

            if (backofficeUserAccessor != null)
            {
                if (_runtimeState.Level == RuntimeLevel.Run &&
                    _maintenanceModeService.IsInMaintenanceMode)
                {
                    // todo figure out how to do this check here
                    if (!_maintenanceModeService.Settings.AllowBackOfficeUsersThrough
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
            catch {
                // in v10 - this thows an erro internally, if there is no backoffice user 🤷‍♀️
                // _logger.LogWarning(ex, "Error getting back office user");
                return false;
            }
        }

        private HttpContext HandleRequest(HttpContext context)
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

        private bool IsAllowedPath(HttpContext context)
        {
            var urlList = _maintenanceModeService.Settings.UrlWhitelist
                .Split(',', System.StringSplitOptions.RemoveEmptyEntries)
                .Select(x => x.Trim(' ', '/', '\\'));
            if (urlList.Contains(context.Request.Path.Value.Trim('/'), StringComparer.OrdinalIgnoreCase))
            {
                return true;
            }
            else return false;
        }
    }
}
