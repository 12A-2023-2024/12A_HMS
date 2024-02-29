using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("userroles")]
    public class UserRoleModel
    {
        public int Id { get; set; }
        public required UserModel User { get; set; }
        public required RoleModel Role { get; set; }

        public int UserId { get; set; }
        public int RoleId { get; set; }
    }
}
