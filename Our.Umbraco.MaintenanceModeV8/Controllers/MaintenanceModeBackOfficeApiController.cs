using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Our.Umbraco.MaintenanceModeV8.Models;
using Umbraco.Web.WebApi;

namespace Our.Umbraco.MaintenanceModeV8.Controllers
{
    public class MaintenanceModeBackOfficeApiController
        : UmbracoAuthorizedApiController
    {
        [HttpGet]
        public MaintenanceModeStatus GetStatus()
        {
            return MaintenanceMode.Current.Status;
        }

        [HttpPost]
        public void ToggleMode(bool maintenanceMode)
        {
            MaintenanceMode.Current.ToggleMaintenanceMode(maintenanceMode);
        }

        [HttpPost]
        public void SaveSettings(MaintenanceModeSettings settings)
        {
            MaintenanceMode.Current.SaveSettings(settings);
        }

        [HttpGet]
        public IEnumerable<string> GetTemplates()
        {
            return Services.FileService.GetTemplates()
                .Select(x => x.Alias).ToList();
        }


        // called in events - the url of this call is put into 
        // sys variables so we don't have to hardwire it in javascript
        public int GetControllerUrl()
        {
            return 1; 
        }
    }
}
 