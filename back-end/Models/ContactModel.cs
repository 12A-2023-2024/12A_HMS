using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("contact")]
    public class ContactModel
    {
        public int Id { get; set; }
        public required string Telephone { get; set; }
        public required string Email { get; set; }
        public required string PostalCode { get; set; }
        public required string City { get; set; }
        public required string Address { get; set; }
        public required string TaxNumber { get; set; }


    }
}
