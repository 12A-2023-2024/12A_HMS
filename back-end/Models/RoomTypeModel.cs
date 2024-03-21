using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

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
        public bool Active { get; set; } = true;

        [JsonIgnore]
        public List<RoomTypeParameterModel> Parameters { get; set; } = [];
        [JsonIgnore]
        public List<RoomTypeImageModel> Images { get; set; } = [];
    }
}
