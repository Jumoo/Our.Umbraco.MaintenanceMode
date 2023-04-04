﻿using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using Newtonsoft.Json;
using Our.Umbraco.MaintenanceModeV8.Models;
using Our.Umbraco.MaintenanceModeV8.Services;
using Umbraco.Web.WebApi;

namespace Our.Umbraco.MaintenanceModeV8.Controllers
{
    public class MaintenanceModeBackOfficeApiController
        : UmbracoAuthorizedApiController
    {
        private readonly MaintenanceModeService maintenanceModeService;
        private readonly JsonSerializerSettings jsonSerializerSettings = new JsonSerializerSettings();

        public MaintenanceModeBackOfficeApiController(
            MaintenanceModeService maintenanceModeService)
        {
            this.maintenanceModeService = maintenanceModeService;
        }

        [HttpGet]
        public IHttpActionResult GetStatus()
            => Json(maintenanceModeService.Status, jsonSerializerSettings);

        [HttpPost]
        public void ToggleMode(bool maintenanceMode)
        {
            maintenanceModeService.ToggleMaintenanceMode(maintenanceMode);
        }

        [HttpPost]
        public void ToggleFreeze(bool contentFreeze)
        {
            maintenanceModeService.ToggleContentFreeze(contentFreeze);
        }


        [HttpPost]
        public void SaveSettings(MaintenanceModeSettings settings)
        {
            maintenanceModeService.SaveSettings(settings);
        }

        [HttpGet]
        public IEnumerable<string> GetTemplates()
        {
            var templates = Services.FileService.GetTemplates()
                .Select(x => x.Alias).ToList();

            templates.Insert(0, "MaintenancePage");

            return templates;
        }


        // called in events - the url of this call is put into 
        // sys variables so we don't have to hardwire it in javascript
        public int GetControllerUrl() => 1;
    }
}
 