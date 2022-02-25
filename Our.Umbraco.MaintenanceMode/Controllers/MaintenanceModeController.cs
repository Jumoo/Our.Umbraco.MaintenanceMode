using Microsoft.AspNetCore.Mvc;
using Our.Umbraco.MaintenanceMode.Interfaces;
using Our.Umbraco.MaintenanceMode.Models;
using Umbraco.Cms.Core.Cache;
using Umbraco.Cms.Core.Logging;
using Umbraco.Cms.Core.Routing;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Web.Website.Controllers;

namespace Our.Umbraco.MaintenanceMode.Controllers
{
    public class MaintenanceModeController : SurfaceController
    {
        private readonly IMaintenanceModeService _maintenanceModeService;
        [Route("e7f7581c6bcd4113954e163ff18cbaba")]
        public IActionResult Index()
        {

            Response.StatusCode = 503;
            return View($"~/Views/{_maintenanceModeService.Settings.TemplateName}.cshtml", _maintenanceModeService.Settings.ViewModel);
        }

        public MaintenanceModeController(IUmbracoContextAccessor umbracoContextAccessor, IUmbracoDatabaseFactory databaseFactory, ServiceContext services, AppCaches appCaches, IProfilingLogger profilingLogger, IPublishedUrlProvider publishedUrlProvider, IMaintenanceModeService maintenanceModeService) 
            : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
        {
            _maintenanceModeService = maintenanceModeService;
        }
    }
}
