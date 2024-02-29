using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("users")]
    public class UserModel
    {
        public int Id { get; set; }
        public required string LoginName { get; set; }
        public required string Name { get; set; }
        public required string PasswordHash { get; set; }
        public required string JobTitle { get; set; }

        public List<UserRoleModel> UserRoles { get; } = [];
    }
}
