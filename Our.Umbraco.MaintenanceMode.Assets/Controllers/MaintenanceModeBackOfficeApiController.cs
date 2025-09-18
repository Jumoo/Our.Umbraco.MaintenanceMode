using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Our.Umbraco.MaintenanceMode.Interfaces;
using Our.Umbraco.MaintenanceMode.Models;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Web.BackOffice.Controllers;

namespace Our.Umbraco.MaintenanceMode.Assets.Controllers
{
    public class MaintenanceModeBackOfficeApiController : UmbracoAuthorizedApiController
    {
        private readonly IMaintenanceModeService _maintenanceModeService;
        private readonly IFileService _fileService;

        public MaintenanceModeBackOfficeApiController(IMaintenanceModeService maintenanceModeService, IFileService fileService)
        {
            _maintenanceModeService = maintenanceModeService;
            _fileService = fileService;
        }

        [HttpGet]
        public MaintenanceModeStatus GetStatus()
            => _maintenanceModeService.Status;

        [HttpPost]
        public void ToggleMode(bool maintenanceMode)
        {
            _maintenanceModeService.ToggleMaintenanceMode(maintenanceMode);
        }

        [HttpPost]
        public void ToggleFreeze(bool contentFreeze)
        {
            _maintenanceModeService.ToggleContentFreeze(contentFreeze);
        }


        [HttpPost]
        public void SaveSettings(MaintenanceModeSettings settings)
        {
            _maintenanceModeService.SaveSettings(settings);
        }

        [HttpGet]
        public IEnumerable<string> GetTemplates()
        {
            var templates = _fileService.GetTemplates()
                .Select(x => x.Alias).ToList();

            templates.Insert(0, "MaintenancePage");

            return templates;
        }


        // called in events - the url of this call is put into 
        // sys variables so we don't have to hardwire it in javascript
        public int GetControllerUrl() => 1;
    }
}
