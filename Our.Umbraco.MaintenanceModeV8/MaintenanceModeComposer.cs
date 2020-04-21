using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using Our.Umbraco.MaintenanceModeV8.Controllers;
using Our.Umbraco.MaintenanceModeV8.Services;
using Umbraco.Core;
using Umbraco.Core.Composing;
using Umbraco.Web;
using Umbraco.Web.JavaScript;

namespace Our.Umbraco.MaintenanceModeV8
{
    [RuntimeLevel(MinLevel = RuntimeLevel.Run)]
    public class MaintenanceModeComposer : IUserComposer
    {
        public void Compose(Composition composition)
        {
            composition.RegisterUnique<MaintenanceModeService>();

            composition.SetDefaultRenderMvcController(typeof(MaintenanceModeMvcController));

            composition.Components().Append<MaintenanceModeComponent>();
        }
    }

    public class MaintenanceModeComponent : IComponent
    {
        public void Initialize()
        {
            ServerVariablesParser.Parsing += ServerVariablesParser_Parsing;
        }

        public void Terminate()
        {
        }

        private void ServerVariablesParser_Parsing(object o, Dictionary<string, object> e)
        {
            if (HttpContext.Current == null) 
                return;

            var urlHelper = new UrlHelper(HttpContext.Current.Request.RequestContext);
            e.Add("MaintenanceMode", new Dictionary<string, object>
            {
                {
                    "Service", urlHelper.GetUmbracoApiServiceBaseUrl<MaintenanceModeBackOfficeApiController>(
                        controller => controller.GetControllerUrl())
                }
            });
        }
    }
}
