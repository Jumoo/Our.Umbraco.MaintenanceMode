using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;

namespace Our.Umbraco.MaintenanceMode.Client.controllers
{
    [ApiController]
    [BackOfficeRoute("maintenance/api/v{version:apiVersion}")]
    [Authorize(Policy = AuthorizationPolicies.BackOfficeAccess)]
    [MapToApi("maintenance")]
    public class MaintentanceModeControllerBase : ControllerBase
    {
    }
}
