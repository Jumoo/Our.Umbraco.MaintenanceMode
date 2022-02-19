using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ViewEngines;
using Microsoft.Extensions.Logging;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Web.Common.Controllers;

public class MyRenderController : RenderController
{
    public MyRenderController(ILogger<RenderController> logger, ICompositeViewEngine compositeViewEngine, IUmbracoContextAccessor umbracoContextAccessor)
        : base(logger, compositeViewEngine, umbracoContextAccessor)
    {
    }

    public override IActionResult Index()
    {
        // Add some custom logic here. 
        return CurrentTemplate(CurrentPage);
    }
}

//using System;
//using System.Net;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.AspNetCore.Mvc.Filters;
//using Microsoft.AspNetCore.Mvc.ViewEngines;
//using Microsoft.Extensions.Logging;
//using Our.Umbraco.MaintenanceModeV9.Interfaces;
//using Umbraco.Cms.Core;
//using Umbraco.Cms.Core.Services;
//using Umbraco.Cms.Core.Web;
//using Umbraco.Cms.Web.Common.Controllers;

//namespace Our.Umbraco.MaintenanceModeV9.Controllers
//{
//    public class MaintenanceModeRenderController : RenderController
//    {
//        //private readonly IRuntimeState _runtimeState;
//        //private readonly ILogger _logger;
//        //private readonly IMaintenanceModeService _maintenanceModeService;

//        public override IActionResult Index()
//        {
//            return CurrentTemplate(CurrentPage);
//        }

//        /// <summary>
//        /// Before the controller executes we will handle the MaintenanceMode config
//        /// </summary>
//        public override async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
//        {
//            try
//            {
//                //if (_runtimeState.Level == RuntimeLevel.Run &&
//                //    _maintenanceModeService.IsInMaintenanceMode)
//                //{
//                //    if (_maintenanceModeService.Settings.AllowBackOfficeUsersThrough
//                //        && IsBackOfficeUserLoggedIn())
//                //    {
//                //        await base.OnActionExecutionAsync(context, next);
//                //    }

//                //    context.Result = new ActionResults.ServiceUnavailableResult(_maintenanceModeService.Settings);
//                //}
//            }
//            catch (Exception ex)
//            {
//                //_logger.LogInformation("Checking for maintenance mode failed : {error}", ex.Message);
//            }
//        }

//        private bool IsBackOfficeUserLoggedIn()
//        {
//            //return HttpContext?.GetUmbracoAuthTicket() != null;
//            return false;
//        }

//        public MaintenanceModeRenderController(ILogger<MaintenanceModeRenderController> logger, ICompositeViewEngine compositeViewEngine, IUmbracoContextAccessor umbracoContextAccessor)
//            : base(logger, compositeViewEngine, umbracoContextAccessor)
//        {
//            //_runtimeState = runtimeState;
//            //_maintenanceModeService = maintenanceModeService;
//            //_logger = logger1;
//        }
//    }
//}
