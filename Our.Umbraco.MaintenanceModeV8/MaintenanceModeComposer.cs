using System.Collections.Generic;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using Our.Umbraco.MaintenanceModeV8.Controllers;
using Our.Umbraco.MaintenanceModeV8.Services;
using Umbraco.Core;
using Umbraco.Core.Composing;
using Umbraco.Core.Events;
using Umbraco.Core.Security;
using Umbraco.Core.Services;
using Umbraco.Core.Services.Implement;
using Umbraco.Web;
using Umbraco.Web.JavaScript;

namespace Our.Umbraco.MaintenanceModeV8
{
    [RuntimeLevel(MinLevel = RuntimeLevel.Run)]
    public class MaintenanceModeComposer : IUserComposer
    {
        public void Compose(Composition composition)
        {
            composition.RegisterUnique<MaintenanceModeService>();

            composition.SetDefaultRenderMvcController(typeof(MaintenanceModeMvcController));

            composition.Components().Append<MaintenanceModeComponent>();
        }
    }

    public class MaintenanceModeComponent : IComponent
    {
        private readonly MaintenanceModeService maintenanceModeService;
        public MaintenanceModeComponent(MaintenanceModeService maintenanceModeService)
        {
            this.maintenanceModeService = maintenanceModeService;
        }

        public void Initialize()
        {
            ServerVariablesParser.Parsing += ServerVariablesParser_Parsing;

            ContentService.Saving += FreezableEvent;
            ContentService.Deleting += FreezableEvent;
            ContentService.Moving += FreezableEvent;
            ContentService.Trashing += FreezableEvent;

            MediaService.Saving += FreezableEvent;
            MediaService.Deleting += FreezableEvent;
            MediaService.Moving += FreezableEvent;
            MediaService.Trashing += FreezableEvent;

            MemberService.Saving += FreezableEvent;
            MemberService.Deleting += FreezableEvent;

            MemberGroupService.Saving += FreezableEvent;
            MemberGroupService.Deleting += FreezableEvent;
        }

        public void Terminate()
        {
        }

        /// <summary>
        ///  event triggered when one of the things we freeze the content 
        ///  model for happens (save/delete trashing of content).
        /// </summary>
        private void FreezableEvent(IService sender, CancellableObjectEventArgs e)
        {
            if (maintenanceModeService.IsContentFrozen)
            {
                var backOfficeIdentity = Thread.CurrentPrincipal.Identity as UmbracoBackOfficeIdentity;
                if (backOfficeIdentity == null) return;

                if (maintenanceModeService.Settings.UnfrozenUsers.Contains(backOfficeIdentity.Id.ToString())) return;

                e.CancelOperation(new EventMessage("Warning", "This site is currently frozen during updates", EventMessageType.Error));
            }
        }


        private void ServerVariablesParser_Parsing(object o, Dictionary<string, object> e)
        {
            if (HttpContext.Current == null) 
                return;

            var urlHelper = new UrlHelper(HttpContext.Current.Request.RequestContext);
            e.Add("MaintenanceMode", new Dictionary<string, object>
            {
                {
                    "Service", urlHelper.GetUmbracoApiServiceBaseUrl<MaintenanceModeBackOfficeApiController>(
                        controller => controller.GetControllerUrl())
                }
            });
        }
    }
}
