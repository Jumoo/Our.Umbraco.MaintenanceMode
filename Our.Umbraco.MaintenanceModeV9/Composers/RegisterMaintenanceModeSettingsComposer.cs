using Microsoft.Extensions.DependencyInjection;
using Our.Umbraco.MaintenanceModeV9.Configurations;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;

namespace Our.Umbraco.MaintenanceModeV9.Composers
{
    public class RegisterMaintenanceModeSettingsComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.Configure<MaintenanceModeSettings>(
                builder.Config.GetSection("MaintenanceMode"));
        }
    }
}
