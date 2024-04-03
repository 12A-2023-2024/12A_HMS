using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("coctailcategories")]
    public class CoctailCategoryModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public bool Active { get; set; } = true;
    }
}
