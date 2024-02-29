using HMS_WebAPI.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Text.Encodings.Web;

namespace HMS_WebAPI.Auth
{
    public class AuthHandler : AuthenticationHandler<AuthenticationSchemeOptions>
    {
        private double expirationInMinutes = 5;
        private readonly HMSContext dbContext;

        public AuthHandler(
            IOptionsMonitor<AuthenticationSchemeOptions> options,
            ILoggerFactory logger,
            UrlEncoder encoder,
            IConfiguration configuration,
            HMSContext dbContext) : base(options, logger, encoder)
        {
            this.dbContext = dbContext;
        }

        protected override async Task<AuthenticateResult> HandleAuthenticateAsync()
        {
            var authorizationHeader = Context.Request.Headers["Authorization"];
            if (!authorizationHeader.Any())
                return await Task.FromResult(AuthenticateResult.NoResult());

            var session = dbContext.Set<SessionModel>()
                                   .Include(s => s.User).ThenInclude(u => u.UserRoles).ThenInclude(u => u.Role)
                                   .SingleOrDefault(s => s.Token == authorizationHeader.ToString());
            if (session == null)
                return await Task.FromResult(AuthenticateResult.Fail("Sikertelen authentikáció"));

            session.LastAccess = DateTime.Now;
            dbContext.Entry(session).State = EntityState.Modified;
            dbContext.SaveChanges();

            var claimsIdentity = new ClaimsIdentity();
            claimsIdentity.AddClaim(new Claim("UserId", session.User.Id.ToString()));
            claimsIdentity.AddClaims(session.User.UserRoles.Select(r => new Claim(ClaimTypes.Role, r.Role.Name)));

            var ticket = new AuthenticationTicket(new ClaimsPrincipal(claimsIdentity), new AuthenticationProperties(), Scheme.Name);

            if (Context.Response != null)
            {
                Context.Response.Headers.Append("session", JsonConvert.SerializeObject(new
                {
                    //token = token.Token,
                    lastAccess = session.LastAccess,
                    validTo = session.LastAccess.AddMinutes(expirationInMinutes)
                }));
                Context.Response.Headers.Append("access-control-expose-headers", "session");
            }

            return await Task.FromResult(AuthenticateResult.Success(ticket));
        }


    }
}
