using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;

using Our.Umbraco.MaintenanceMode.Middleware;

using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Web.Common.ApplicationBuilder;

namespace Our.Umbraco.MaintenanceMode.Composers
{
    internal static class UrlRedirectMiddlewareComposerExtensions
    {
        public static IUmbracoBuilder AddMaintenceManagerMiddleware(this IUmbracoBuilder builder)
        {

            builder.Services.Configure<UmbracoPipelineOptions>(options =>
            {
                options.AddFilter(new UmbracoPipelineFilter(
                    "MaintenceManager",
                    applicationBuilder =>
                    {
                        applicationBuilder.UseWhen(
                            ctx => !ctx.Request.Path.IsBackEndRequest(),
                            ab => ab.UseMiddleware<MaintenanceRedirectMiddleware>());
                    },
                    ab => { },
                    ab => { }
                ));
            });

            return builder;
        }

        // some reserved roots that are umbraco sepecifc and we don't want to 
        // trigger our middleware for.
        // TODO: These need to be dynamically calculated.
        private static string[] backofficePaths = new string[]
        {
            "/umbraco", "/App_Plugins", "/api", "/media", "/install"
        };

        // Note: this method is called for all requests to the site! 
        // 
        // 
        private static bool IsBackEndRequest(this PathString path)
        {
            // don't block on anything . (e.g file.js, file.css?)
            // quicker than putting /css /scripts /media in the list above? 
            if (path.Value.Contains(".")) return true;

            foreach (var backofficepath in backofficePaths)
            {
                if (path.StartsWithSegments(backofficepath))
                    return true;
            }

            return false;
        }
    }
}
