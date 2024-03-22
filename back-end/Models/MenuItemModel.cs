using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("menuitems")]
    public class MenuItemModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public MenuCategoryModel? MenuCategory { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public bool Active { get; set; } = true;

        public int MenuCategoryId { get; set; }

        public List<MenuImageModel> Images { get; } = [];

        [NotMapped]
        public int CategoryId
        {
            get => this.MenuCategoryId;
            set => this.MenuCategoryId = value;
        }
    }
}
