using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("gallery")]
    public class GalleryItem
    {
        public int Id { get; set; }
        public required PictureModel Picture { get; set; }
        public int Order { get; set; } = 0;

        public int PictureId { get; set; }

    }
}
