using HMS_WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace HMS_WebAPI.Controllers
{
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly HMSContext dbContext;
        private readonly byte[] salt;
        private readonly int sessionExpirationInMinutes;


        public AuthController(HMSContext dbContext, IConfiguration configuration)
        {
            var saltBase64 = configuration.GetSection("security").GetValue<string>("salt");
            if (string.IsNullOrEmpty(saltBase64))
            {
                throw new ArgumentNullException("Parameter is missing: salt");
            }
            salt = Convert.FromBase64String(saltBase64);
            sessionExpirationInMinutes = int.Parse(configuration.GetSection("session").GetValue<string>("expirationInMinutes") ?? "10");

            this.dbContext = dbContext;
        }

        //{"loginname":"admin", "password":"admin"}
        [HttpPost("/login")]
        public IActionResult Login([FromBody] dynamic loginData)
        {
            var model = (LoginRequestModel)System.Text.Json.JsonSerializer
                          .Deserialize<LoginRequestModel>(
                               loginData.ToString(),
                               new System.Text.Json.JsonSerializerOptions()
                               {
                                   PropertyNameCaseInsensitive = true,
                                   NumberHandling = System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString
                               });

            var user = dbContext.Set<UserModel>()
                                .Include(u => u.UserRoles).ThenInclude(r => r.Role)
                                .SingleOrDefault(u => u.LoginName.ToLower() == model.LoginName.ToLower() && u.PasswordHash == LoginRequestModel.HashPassword(model.Password, salt));

            if (user == null)
            {
                return Unauthorized(new { message = "Hibás felhasználónév vagy jelszó!" });
            }

            var sessions = dbContext.Set<SessionModel>().Include(s => s.User).Where(s => s.User.Id == user.Id && s.LastAccess.AddMinutes(sessionExpirationInMinutes) < DateTime.Now);
            if (sessions.Any())
                dbContext.Set<SessionModel>().RemoveRange(sessions);

            var session = new SessionModel()
            {
                User = user,
                LastAccess = DateTime.Now,
                Token = CreateTokenString(120)
            };
            dbContext.Set<SessionModel>().Add(session);
            dbContext.SaveChanges();

            return Ok(new
            {
                user.Name,
                session.Token,
                Roles = user.UserRoles.Select(r => r.Role.Name),
                ValidTo = session.LastAccess.AddMinutes(sessionExpirationInMinutes)
            });
        }

        private string CreateTokenString(int size)
        {
            char[] chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789".ToCharArray();
            byte[] data = new byte[4 * size];
            using (var crypto = RandomNumberGenerator.Create())
                crypto.GetBytes(data);

            StringBuilder result = new StringBuilder(size);
            for (int i = 0; i < size; i++)
            {
                var rnd = BitConverter.ToUInt32(data, i * 4);
                var idx = rnd % chars.Length;

                result.Append(chars[idx]);
            }

            return result.ToString();
        }

    }
}
