using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("menuimages")]
    public class MenuImageModel
    {
        public int Id { get; set; }
        public required ImageModel Image { get; set; }
        public required MenuItemModel MenuItem { get; set; }

        public int ImageId { get; set; }
        public int MenuItemId { get; set; }
    }
}
