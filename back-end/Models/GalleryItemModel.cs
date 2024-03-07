using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("galleryItems")]
    public class GalleryItemModel
    {
        public int Id { get; set; }
        public required PictureModel Picture { get; set; }
    }
}
