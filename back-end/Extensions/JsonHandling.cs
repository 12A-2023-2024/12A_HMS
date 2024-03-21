using HMS_WebAPI.Models;

namespace HMS_WebAPI.Extensions
{
    public static class JsonHandling
    {
        public static T? Serialize<T>(this object data)
        {
            if (data == null)
                return default(T);

            var s = data.ToString();

            if (s == null)
                return default(T);

            return System.Text.Json.JsonSerializer
                   .Deserialize<T>(
                        s,
                        new System.Text.Json.JsonSerializerOptions()
                        {
                            PropertyNameCaseInsensitive = true,
                            NumberHandling = System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString
                        }
                    );
        }


    }
}
