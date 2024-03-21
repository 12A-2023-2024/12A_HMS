using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("images")]
    public class ImageModel
    {
        public int Id { get; set; }
        public required string OriginalFileName { get; set; }
        public required string Path { get; set; }

        [NotMapped]
        public string ImageUrl => $"{StaticValues.BaseUrl}image/{Id}";

    }
}
