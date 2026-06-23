using Umbraco.Cms.Api.Common.OpenApi;
using Umbraco.Cms.Api.Management.OpenApi;
using Umbraco.Cms.Core.Composing;



#if NET10_0
#else
using Microsoft.OpenApi.Models;
#endif
namespace Our.Umbraco.MaintenanceMode.Client
{
    public class MaintenanceModeComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.AddMaintenanceOpenApi();
        }
    }

    public static class MaintenanceOpenApiExtensions
    {
        public static IUmbracoBuilder AddMaintenanceOpenApi(this IUmbracoBuilder builder)
            => builder.AddBackOfficeOpenApiDocument(
                "maintenance",
                document => document
                    .WithTitle("Maintenance Mode API")
                    .WithBackOfficeAuthentication()
                    .ConfigureOpenApiOptions(options =>
                    {
                        options.AddDocumentTransformer((doc, _, _) =>
                        {
                            doc.Info.Version = "Latest";
                            return Task.CompletedTask;
                        });
                    })
                );
    }
}
