using Microsoft.AspNetCore.Mvc.ApiExplorer;
using Microsoft.AspNetCore.Mvc.Controllers;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Umbraco.Cms.Api.Common.OpenApi;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace Our.Umbraco.MaintenanceMode.Client
{
    public class MaintenanceModeComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.AddSingleton<IOperationIdHandler, MaintenanceModeCustomOperationHandler>();
            builder.Services.ConfigureOptions<ConfigureSwaggerGenOptions>();
        }
    }

    internal class ConfigureSwaggerGenOptions : IConfigureOptions<SwaggerGenOptions>
    {
        public void Configure(SwaggerGenOptions options)
        {
            options.SwaggerDoc(
                "maintenance",
                new OpenApiInfo
                {
                    Title = "Maintenance Mode API",
                    Version = "Latest",
                    Description = "it's maintenance mode methods"
                });

        }
    }

    public class MaintenanceModeCustomOperationHandler : IOperationIdHandler
    {
        public bool CanHandle(ApiDescription apiDescription)
        {
            if (apiDescription.ActionDescriptor is not
                ControllerActionDescriptor controllerActionDescriptor)
                return false;

            return CanHandle(apiDescription, controllerActionDescriptor);
        }

        public bool CanHandle(ApiDescription apiDescription, ControllerActionDescriptor controllerActionDescriptor)
            => controllerActionDescriptor.ControllerTypeInfo.Namespace?.StartsWith("Our.Umbraco.MaintenanceMode") is true;

        public string Handle(ApiDescription apiDescription)
            => $"{apiDescription.ActionDescriptor.RouteValues["action"]}";
    }
}
