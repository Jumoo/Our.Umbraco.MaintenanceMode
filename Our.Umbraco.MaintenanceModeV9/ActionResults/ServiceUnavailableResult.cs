using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Our.Umbraco.MaintenanceModeV9.Models;

namespace Our.Umbraco.MaintenanceModeV9.ActionResults
{
    public class ServiceUnavailableResult : IActionResult
    {
        private readonly MaintenanceModeSettings _maintenanceModeSettings;
        public ServiceUnavailableResult(MaintenanceModeSettings maintenanceModeSettings)
        {
            _maintenanceModeSettings = maintenanceModeSettings;
        }

        public async Task ExecuteResultAsync(ActionContext context)
        {
            HttpResponse response = context.HttpContext.Response;

            response.Clear();

            response.StatusCode = StatusCodes.Status503ServiceUnavailable;

            var viewResult = new ViewResult
            {
                ViewName = $"~/Views/{_maintenanceModeSettings.TemplateName}.cshtml"
            };

            await viewResult.ExecuteResultAsync(context);
        }
    }
}
