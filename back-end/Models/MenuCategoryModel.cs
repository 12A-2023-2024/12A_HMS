using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table ("menucategories")]
    public class MenuCategoryModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public bool Active { get; set; } = true;
    }
}
