using Microsoft.Extensions.DependencyInjection;
using Our.Umbraco.MaintenanceModeV9.Interfaces;
using Our.Umbraco.MaintenanceModeV9.Services;
using Umbraco.Cms.Core.Composing;
using Umbraco.Cms.Core.DependencyInjection;
using Umbraco.Cms.Infrastructure.DependencyInjection;
using Umbraco.Extensions;

namespace Our.Umbraco.MaintenanceModeV9.Composers
{
    public class RegisterMaintenanceModeServiceComposer : IComposer
    {
        public void Compose(IUmbracoBuilder builder)
        {
            builder.Services.AddTransient<IBackofficeUserAccessor, BackofficeUserAccessor>();
            builder.Services.AddUnique<IMaintenanceModeService, MaintenanceModeService>();
        }
    }
}
