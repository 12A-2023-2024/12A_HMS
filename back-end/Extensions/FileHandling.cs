using HMS_WebAPI.Models;
using System.Security.Cryptography;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace HMS_WebAPI.Extensions
{
    public static class FileHandling
    {

        public static ImageModel SaveFile(byte[] content, string fileName, string filesPath)
        {
            var hash = content.GetHashSHA1();
            var extension = Path.GetExtension(fileName);
            if (!Directory.Exists(filesPath))
                Directory.CreateDirectory(filesPath);
            if (!Directory.Exists(Path.Combine(filesPath, hash.Substring(0, 2))))
                Directory.CreateDirectory(Path.Combine(filesPath, hash.Substring(0, 2)));
            if (!Directory.Exists(Path.Combine(filesPath, hash.Substring(2, 2))))
                Directory.CreateDirectory(Path.Combine(filesPath, hash.Substring(0, 2), hash.Substring(2, 2)));
            var path = Path.Combine(filesPath, hash.Substring(0, 2), hash.Substring(2, 2), $"{hash}{extension}");
            File.WriteAllBytes(path, content);

            return new ImageModel()
            {
                OriginalFileName = fileName,
                Path = path,
            };
        }

        private static string GetHashSHA1(this byte[] bytes)
        {
            using (var sha1 = SHA1.Create())
            {
                return string.Concat(sha1.ComputeHash(bytes).Select(x => x.ToString("X2")));
            }
        }
    }
}
