using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("rooms")]
    public class RoomModel
    {
        public int Id { get; set; }
        public required RoomTypeModel RoomType { get; set; }
        public required string RoomNumber { get; set; }
        public bool Active { get; set; } = true;

        public int RoomTypeId { get; set; }
    }
}
