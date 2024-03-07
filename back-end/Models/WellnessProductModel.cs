using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("wellnessproducts")]
    public class WellnessProductModel
    {
        public int Id { get; set; }
        public required WellnessProductCatatoryModel WellnessProductCatatory { get; set; }
        public required string Name { get; set; }
        public decimal Price { get; set; }

        public int WellnessProductCatatoryId { get; set; }

        public List<WellnessProductImageModel> Images { get; } = [];

    }
}
