using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("wellnesssales")]
    public class WellnessSaleModel
    {
        public int Id { get; set; }
        public required WellnessProductModel WellnessProduct { get; set; }
        public required GuestModel Guest { get; set; }
        public decimal Price { get; set; }
        public DateTime DateOfSales { get; set; }
        public DateTime? DateOfPayment { get; set; }

        public int WellnessProductId { get; set; }
        public int GuestId { get; set; }
    }
}
