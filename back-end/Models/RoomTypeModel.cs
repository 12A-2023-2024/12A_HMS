using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("roomTypes")]
    public class RoomTypeModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public decimal PricePerNigthPerPerson { get; set; }
        public int Capacity { get; set; }

        public List<RoomTypeParameterModel> Parameters { get; set; } = [];
    }
}
