using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("pictures")]
    public class PictureModel
    {
        public int Id { get; set; }
        public required ImageModel Image { get; set; }
        public required string Alt { get; set; }
        public required string Href { get; set; }

        public int ImageId { get; set; }

        public string FileName => Image.OriginalFileName;
        public string PictureUrl => Image.ImageUrl;


    }
}
