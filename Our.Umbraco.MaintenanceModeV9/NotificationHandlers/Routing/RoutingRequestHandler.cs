using System;
using Our.Umbraco.MaintenanceModeV9.Interfaces;
using Serilog;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Services;
using Umbraco.Extensions;

namespace Our.Umbraco.MaintenanceModeV9.NotificationHandlers.Routing
{
    public class RoutingRequestHandler : INotificationHandler<RoutingRequestNotification>
    {
        private readonly IRuntimeState _runtimeState;
        private readonly IMaintenanceModeService _maintenanceModeService;
        private readonly IBackofficeUserAccessor _backofficeUserAccessor;
        private readonly ILogger _logger;

        public RoutingRequestHandler(IRuntimeState runtimeState, IMaintenanceModeService maintenanceModeService, IBackofficeUserAccessor backofficeUserAccessor, ILogger logger)
        {
            _runtimeState = runtimeState;
            _maintenanceModeService = maintenanceModeService;
            _backofficeUserAccessor = backofficeUserAccessor;
            _logger = logger;
        }

        public void Handle(RoutingRequestNotification notification)
        {
            // This is a massive bodge to overcome requests using a custom render controller.
            // We are internally redirecting these to the root node which hopefully uses a standard render controller
            // Todo figure out a better less bodgy way to do this
            try
            {
                var root = notification.RequestBuilder.PublishedContent.Root();
                if (_runtimeState.Level == RuntimeLevel.Run &&
                    _maintenanceModeService.IsInMaintenanceMode &&
                    notification.RequestBuilder.PublishedContent != root &&
                    !_maintenanceModeService.Settings.AllowBackOfficeUsersThrough &&
                    IsBackOfficeUserLoggedIn())
                {
                    notification.RequestBuilder.SetInternalRedirect(notification.RequestBuilder.PublishedContent
                        .Root());
                }
            }
            catch (Exception ex)
            {
                _logger.Information(ex, "Checking for maintenance mode failed : {error}", ex.Message);
            }
        }

        private bool IsBackOfficeUserLoggedIn()
        {
            return _backofficeUserAccessor.BackofficeUser.IsAuthenticated;
        }
    }
}
