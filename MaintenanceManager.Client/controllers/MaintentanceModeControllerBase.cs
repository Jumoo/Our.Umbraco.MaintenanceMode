using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Umbraco.Cms.Api.Common.Attributes;
using Umbraco.Cms.Web.Common.Authorization;
using Umbraco.Cms.Web.Common.Routing;

namespace MaintenanceManager.Client.controllers
{
    [ApiController]
    [BackOfficeRoute("maintenance/api/v{version:apiVersion}")]
    [Authorize(Policy = "New" + AuthorizationPolicies.BackOfficeAccess)]
    [MapToApi("maintenance")]
    public class MaintentanceModeControllerBase
    {
    }
}
