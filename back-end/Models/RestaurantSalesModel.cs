using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("restaurantsales")]
    public class RestaurantSalesModel
    {
        public int Id { get; set; }
        public required MenuItemModel MenuItem { get; set; }
        public required GuestModel Guest { get; set; }
        public decimal Price { get; set; }
        public DateTime DateOfSales { get; set; }
        public DateTime? DateOfPayment { get; set; }

        public int MenuItemId { get; set; }
        public int GuestId { get; set; }
    }
}
