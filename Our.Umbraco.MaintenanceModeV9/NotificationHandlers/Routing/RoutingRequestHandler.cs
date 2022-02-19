using System;
using Our.Umbraco.MaintenanceModeV9.Interfaces;
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

        public RoutingRequestHandler(IRuntimeState runtimeState, IMaintenanceModeService maintenanceModeService, IBackofficeUserAccessor backofficeUserAccessor)
        {
            _runtimeState = runtimeState;
            _maintenanceModeService = maintenanceModeService;
            _backofficeUserAccessor = backofficeUserAccessor;
        }

        public void Handle(RoutingRequestNotification notification)
        {
            try
            {
                var root = notification.RequestBuilder.PublishedContent.Root();
                if (_runtimeState.Level == RuntimeLevel.Run &&
                    _maintenanceModeService.IsInMaintenanceMode &&
                    notification.RequestBuilder.PublishedContent != root)
                {
                    notification.RequestBuilder.SetInternalRedirect(notification.RequestBuilder.PublishedContent
                        .Root());
                }
                //if (_runtimeState.Level == RuntimeLevel.Run &&
                //    _maintenanceModeService.IsInMaintenanceMode)
                //{
                //    if (_maintenanceModeService.Settings.AllowBackOfficeUsersThrough
                //        && IsBackOfficeUserLoggedIn())
                //    {
                //        notification.RequestBuilder.
                //        await base.OnActionExecutionAsync(context, next);
                //    }

                //    context.Result = new ActionResults.ServiceUnavailableResult(_maintenanceModeService.Settings);
                //}
                //else
                //{
                //    await base.OnActionExecutionAsync(context, next);
                //}
            }
            catch (Exception ex)
            {
                //_logger.LogInformation("Checking for maintenance mode failed : {error}", ex.Message);
            }
        }

        private bool IsBackOfficeUserLoggedIn()
        {
            return _backofficeUserAccessor.BackofficeUser.IsAuthenticated;
        }
    }
}
