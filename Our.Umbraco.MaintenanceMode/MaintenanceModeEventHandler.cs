using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;

using Umbraco.Core;
using Umbraco.Web;
using Umbraco.Web.Mvc;

using Our.Umbraco.MaintenanceMode.Controllers;

namespace Our.Umbraco.MaintenanceMode
{
    public class MaintenanceModeEventHandler : ApplicationEventHandler
    {
        protected override void ApplicationStarting(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext)
        {
            // replace the default MvcController Resolver.
            DefaultRenderMvcControllerResolver
                .Current.SetDefaultControllerType(typeof(MaintenanceModeMvcController));
        }

        protected override void ApplicationStarted(UmbracoApplicationBase umbracoApplication, ApplicationContext applicationContext)
        {
            // add the url for the backoffice to the server variables
            global::Umbraco.Web.UI.JavaScript.ServerVariablesParser.Parsing += 
                ServerVariablesParser_Parsing;
        }

        private void ServerVariablesParser_Parsing(object sender, Dictionary<string, object> e)
        {
            if (HttpContext.Current != null)
            {
                var urlHelper = new UrlHelper(HttpContext.Current.Request.RequestContext);
                e.Add("MaintenanceMode", new Dictionary<string, object>
                {
                    { "Service", urlHelper.GetUmbracoApiServiceBaseUrl<MaintenanceModeBackOfficeApiController>(
                            controller => controller.GetControllerUrl()) }
                });
            }
        }
    }
}
