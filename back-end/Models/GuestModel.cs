using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("guests")]
    public class GuestModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Address { get; set; }
        public required string City { get; set; }
        public required string PostalCode { get; set; }
        public required string Citizenship { get; set; }
        public DateTime DateOfBirth { get; set; }
        public required string PlaceOfBirth { get; set; }
        public required string PassportNumber { get; set; }
    }
}
