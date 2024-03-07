using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("wellnessproductimages")]
    public class WellnessProductImageModel
    {
        public int Id { get; set; }
        public required ImageModel Image { get; set; }
        public required WellnessProductModel WellnessProduct { get; set; }

        public int ImageId { get; set; }
        public int WellnessProductId { get; set; }
    }
}
