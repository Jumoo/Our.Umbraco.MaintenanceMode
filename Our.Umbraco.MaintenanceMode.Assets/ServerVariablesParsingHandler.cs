using Microsoft.AspNetCore.Routing;
using Our.Umbraco.MaintenanceMode.Assets.Controllers;
using System.Collections.Generic;

using Umbraco.Cms.Core.Events;
using Umbraco.Cms.Core.Notifications;
using Umbraco.Cms.Core.Routing;
using Umbraco.Extensions;

namespace Our.Umbraco.MaintenanceMode.Assets
{
    public class ServerVariablesParsingHandler : INotificationHandler<ServerVariablesParsingNotification>
    {
        private LinkGenerator linkGenerator;
        private UriUtility uriUtility;

        public ServerVariablesParsingHandler(LinkGenerator linkGenerator,
            UriUtility uriUtility)
        {
            this.linkGenerator = linkGenerator;
            this.uriUtility = uriUtility;
        }

        public void Handle(ServerVariablesParsingNotification notification)
        {
            notification.ServerVariables.Add("MaintenanceMode", new Dictionary<string, object>
            {
                { "Service", linkGenerator.GetUmbracoApiServiceBaseUrl<MaintenanceModeBackOfficeApiController>(c => c.GetStatus()) }
            });
        }
    }
}
