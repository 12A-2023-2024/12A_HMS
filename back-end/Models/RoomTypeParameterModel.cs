using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("roomTypeParameters")]
    public class RoomTypeParameterModel
    {
        public int Id { get; set; }
        public required RoomTypeModel RoomType { get; set; }
        public required RoomParameterModel RoomParameter { get; set; }

        public int RoomTypeId { get; set; }
        public int RoomParameterId { get; set; }
    }
}
