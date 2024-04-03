using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("coctailbarsales")]
    public class CoctailbarSalesModel
    {
        public int Id { get; set; }
        public required CoctailModel Coctail { get; set; }
        public required GuestModel Guest { get; set; }
        public decimal Price { get; set; }
        public DateTime DateOfSales { get; set; }
        public DateTime? DateOfPayment { get; set; }

        public int CoctailId { get; set; }
        public int GuestId { get; set; }
    }
}
