using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("roomParameters")]
    public class RoomParameterModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
    }
}
