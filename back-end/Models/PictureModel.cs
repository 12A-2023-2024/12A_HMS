using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("pictures")]
    public class PictureModel
    {
        public int Id { get; set; }
        public required string OriginalFileName { get; set; }
        public required string Path { get; set; }
        public required string Alt { get; set; }
        public required string Href { get; set; }

        [NotMapped]
        public required string PictureUrl { get; set; }

    }
}
