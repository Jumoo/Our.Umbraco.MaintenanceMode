using System;
using System.Net;
using System.Web.Mvc;
using Umbraco.Core.Composing;
using Umbraco.Web.Models;
using Umbraco.Web.Mvc;
using Umbraco.Web.Security;

namespace Our.Umbraco.MaintenanceModeV8.Controllers
{
    public class MaintenanceModeMvcController 
        : RenderMvcController
    {
        public override ActionResult Index(ContentModel model)
        {
            try
            {
                if (MaintenanceMode.Current.Status.IsInMaintenanceMode)
                {
                    if (MaintenanceMode.Current.Status.Settings.AllowBackOfficeUsersThrough
                        && IsBackOfficeUserLoggedIn())
                    {
                        return base.Index(model);
                    }

                    if (Response != null)
                        Response.StatusCode = (int)HttpStatusCode.ServiceUnavailable;

                    return View(MaintenanceMode.Current.Status.Settings.TemplateName, model);
                }
            }
            catch(Exception ex)
            {
                Current.Logger.Info(typeof(MaintenanceModeMvcController), "Checking Maintance Mode Failed: {0}", ex.Message);
            }

            return base.Index(model);
        }

        private bool IsBackOfficeUserLoggedIn()
        {
            return HttpContext?.GetUmbracoAuthTicket() != null;
        }
    }
}
