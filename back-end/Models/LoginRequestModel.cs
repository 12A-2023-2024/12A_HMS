using Microsoft.AspNetCore.Cryptography.KeyDerivation;

namespace HMS_WebAPI.Models
{
    public class LoginRequestModel
    {
        public string LoginName { get; set; } = null!;
        public string Password { get; set; } = null!;

        //https://learn.microsoft.com/en-us/aspnet/core/security/data-protection/consumer-apis/password-hashing?view=aspnetcore-8.0
        public static string HashPassword(string password, byte[] salt)
        {
            return Convert.ToBase64String(KeyDerivation.Pbkdf2(
                password: password!,
                salt: salt,
                prf: KeyDerivationPrf.HMACSHA256,
                iterationCount: 100000,
                numBytesRequested: 256 / 8));

        }
    }
}
