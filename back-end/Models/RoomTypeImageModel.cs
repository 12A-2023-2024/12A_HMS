using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("roomimages")]
    public class RoomTypeImageModel
    {
        public int Id { get; set; }
        public required RoomTypeModel RoomType { get; set; }
        public required ImageModel Image { get; set; }

        public int RoomTypeId { get; set; }
        public int ImageId { get; set; }

    }
}
