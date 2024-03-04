using Microsoft.AspNetCore.Components.Web;
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
        [Route(MaintenanceMode.MaintenanceRoot)]
        public IActionResult Index()
        {

            Response.StatusCode = 503;

            var viewModel = new Models.MaintenanceMode
            {
                PageTitle = _maintenanceModeService.Settings.PageTitle,
                Title = _maintenanceModeService.Settings.Title,
                Text = _maintenanceModeService.Settings.Text
            };

            return View($"/views/{_maintenanceModeService.Settings.TemplateName}.cshtml", viewModel);
        }

        public MaintenanceModeController(IUmbracoContextAccessor umbracoContextAccessor, IUmbracoDatabaseFactory databaseFactory, ServiceContext services, AppCaches appCaches, IProfilingLogger profilingLogger, IPublishedUrlProvider publishedUrlProvider, IMaintenanceModeService maintenanceModeService) 
            : base(umbracoContextAccessor, databaseFactory, services, appCaches, profilingLogger, publishedUrlProvider)
        {
            _maintenanceModeService = maintenanceModeService;
        }
    }
}
