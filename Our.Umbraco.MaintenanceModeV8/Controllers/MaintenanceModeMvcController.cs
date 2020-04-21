using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Umbraco.Core.Logging;
using Umbraco.Core.Security;
using Umbraco.Web.Models;
using Umbraco.Web.Mvc;

namespace Our.Umbraco.MaintenanceMode.Controllers
{
    public class MaintenanceModeMvcController 
        : RenderMvcController
    {
        public override ActionResult Index(RenderModel model)
        {
            try
            {
                if (ApplicationContext != null
                    && ApplicationContext.IsConfigured
                    && MaintenanceMode.Current.Status.IsInMaintenanceMode)
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
                Logger.Warn<MaintenanceModeMvcController>("Checking Maintance Mode Failed: {0}", () => ex.Message);
            }

            return base.Index(model);
        }

        private bool IsBackOfficeUserLoggedIn()
        {
            if (HttpContext != null && HttpContext.GetUmbracoAuthTicket() != null)
                return true;
          
            return false;
        }
    }
}
