using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
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
            if (MaintenanceMode.Current.Status.IsInMaintenanceMode
                && ApplicationContext.IsConfigured)
            {
                if (MaintenanceMode.Current.Status.Settings.AllowBackOfficeUsersThrough
                    && IsBackOfficeUserLoggedIn())
                {
                    return base.Index(model);
                }

                Response.StatusCode = (int)HttpStatusCode.ServiceUnavailable;
                return View(MaintenanceMode.Current.Status.Settings.TemplateName, model);
            }

            return base.Index(model);

        }

        private bool IsBackOfficeUserLoggedIn()
        {
            var userTicket = this.HttpContext.GetUmbracoAuthTicket();
            if (userTicket != null)
            {
                return true;
            }

            return false;

        }
    }
}
