using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("roles")]
    public class RoleModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public List<UserRoleModel> UserRoles { get; } = [];
    }
}
