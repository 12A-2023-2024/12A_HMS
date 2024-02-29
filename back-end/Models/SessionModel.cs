using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{ 
    [Table("sessions")]
    public class SessionModel
    {
        public int Id { get; set; }
        public required UserModel User { get; set; }
        public required string Token { get; set; }
        public DateTime LastAccess { get; set; }
    }
}
