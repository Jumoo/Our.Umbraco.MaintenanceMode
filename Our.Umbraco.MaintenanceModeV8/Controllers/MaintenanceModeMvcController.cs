using System;
using System.Net;
using System.Web.Mvc;
using Our.Umbraco.MaintenanceModeV8.Services;
using Umbraco.Core;
using Umbraco.Core.Cache;
using Umbraco.Core.Composing;
using Umbraco.Core.Configuration;
using Umbraco.Core.Logging;
using Umbraco.Core.Services;
using Umbraco.Web;
using Umbraco.Web.Models;
using Umbraco.Web.Mvc;
using Umbraco.Web.Security;

namespace Our.Umbraco.MaintenanceModeV8.Controllers
{
    public class MaintenanceModeMvcController 
        : RenderMvcController
    {
        private readonly MaintenanceModeService maintenanceModeService;
        private readonly IRuntimeState runtimeState;

        public MaintenanceModeMvcController(
                   IGlobalSettings globalSettings,
                   IUmbracoContextAccessor umbracoContextAccessor,
                   ServiceContext services,
                   AppCaches appCaches,
                   IProfilingLogger profilingLogger,
                   UmbracoHelper umbracoHelper,
                   IRuntimeState runtimeState,
                   MaintenanceModeService maintenanceModeService)
                   : base(globalSettings, umbracoContextAccessor, services, appCaches, profilingLogger, umbracoHelper)
        {
            this.runtimeState = runtimeState;
            this.maintenanceModeService = maintenanceModeService;
        }

        public override ActionResult Index(ContentModel model)
        {
            try
            {
                if (runtimeState.Level == RuntimeLevel.Run &&
                    maintenanceModeService.Status.IsInMaintenanceMode)
                {
                    if (maintenanceModeService.Status.Settings.AllowBackOfficeUsersThrough
                        && IsBackOfficeUserLoggedIn())
                    {
                        return base.Index(model);
                    }

                    if (Response != null)
                        Response.StatusCode = (int)HttpStatusCode.ServiceUnavailable;

                    return View(maintenanceModeService.Status.Settings.TemplateName, model);
                }
            }
            catch(Exception ex)
            {
                Logger.Info<MaintenanceModeMvcController>("Checking for maintenance mode failed : {error}", ex.Message);
            }

            return base.Index(model);
        }

        private bool IsBackOfficeUserLoggedIn()
        {
            return HttpContext?.GetUmbracoAuthTicket() != null;
        }
    }
}
