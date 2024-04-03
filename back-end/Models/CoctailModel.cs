using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("coctails")]
    public class CoctailModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public CoctailCategoryModel? CoctailCategory { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        public bool Active { get; set; } = true;

        public int CoctailCategoryId { get; set; }

        public List<CoctailImageModel> Images { get; } = [];

        [NotMapped]
        public int CategoryId
        {
            get => this.CoctailCategoryId;
            set => this.CoctailCategoryId = value;
        }
    }
}
