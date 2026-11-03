using System.Security.Claims;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Umbraco.Cms.Core.Models.Membership;
using Umbraco.Cms.Core.Security;
using Umbraco.Extensions;

namespace Our.Umbraco.MaintenanceMode
{

    public interface IBackofficeUserAccessor
    {
        ClaimsIdentity BackofficeUser { get; }

        /// <summary>
        ///  the backoffice user Umbraco has authenticated for the current request, if any.
        ///  on Umbraco 14+ backoffice requests are token authenticated, so this is the
        ///  reliable way to find the user making an edit - BackofficeUser reads the cookie.
        /// </summary>
        IUser CurrentUser { get; }
    }

    public class BackofficeUserAccessor : IBackofficeUserAccessor
    {
        private readonly IOptionsSnapshot<CookieAuthenticationOptions> _cookieOptionsSnapshot;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IBackOfficeSecurityAccessor _backOfficeSecurityAccessor;

        public BackofficeUserAccessor(
            IOptionsSnapshot<CookieAuthenticationOptions> cookieOptionsSnapshot,
            IHttpContextAccessor httpContextAccessor,
            IBackOfficeSecurityAccessor backOfficeSecurityAccessor
        )
        {
            _cookieOptionsSnapshot = cookieOptionsSnapshot;
            _httpContextAccessor = httpContextAccessor;
            _backOfficeSecurityAccessor = backOfficeSecurityAccessor;
        }

        public IUser CurrentUser
        {
            get
            {
                try
                {
                    return _backOfficeSecurityAccessor.BackOfficeSecurity?.CurrentUser;
                }
                catch
                {
                    // no authenticated backoffice user for this request
                    return null;
                }
            }
        }


        public ClaimsIdentity BackofficeUser
        {
            get
            {

                var httpContext = _httpContextAccessor.HttpContext;

                if (httpContext == null)
                    return new ClaimsIdentity();


                CookieAuthenticationOptions cookieOptions = _cookieOptionsSnapshot.Get(global::Umbraco.Cms.Core.Constants.Security.BackOfficeAuthenticationType);
                string backOfficeCookie = httpContext.Request.Cookies[cookieOptions.Cookie.Name!];

                if (string.IsNullOrEmpty(backOfficeCookie))
                    return new ClaimsIdentity();

                AuthenticationTicket unprotected = cookieOptions.TicketDataFormat.Unprotect(backOfficeCookie!);
                ClaimsIdentity backOfficeIdentity = unprotected!.Principal.GetUmbracoIdentity();

                return backOfficeIdentity;
            }

        }
    }
}