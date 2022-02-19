//using Microsoft.Extensions.DependencyInjection;
//using Our.Umbraco.MaintenanceModeV9.Controllers;
//using Umbraco.Cms.Core.Composing;
//using Umbraco.Cms.Core.DependencyInjection;
//using Umbraco.Cms.Web.Website.Controllers;

//namespace Our.Umbraco.MaintenanceModeV9.Composers
//{
//    public class OverrideDefaultRenderControllerComposer : IComposer
//    {
//        public void Compose(IUmbracoBuilder builder)
//        {
//            builder.Services.Configure<UmbracoRenderingDefaultsOptions>(c =>
//            {
//                c.DefaultControllerType = typeof(MaintenanceModeRenderController);
//            });
//        }
//    }
//}
