using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Options;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace MaintenanceManager.Client
{
    public class MaintenanceModeComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
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

            // sets the operation Ids to be the same as the action
            // so it loses all the v1... bits to the names.
            options.CustomOperationIds(e => $"{e.ActionDescriptor.RouteValues["action"]}");

        }
    }
}
