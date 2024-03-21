using System.ComponentModel;
using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("wellnessproducts")]
    public class WellnessProductModel
    {
        public int Id { get; set; }
        public WellnessProductCatatoryModel? WellnessProductCatatory { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public decimal Price { get; set; }
        [DefaultValue(true)]
        public bool Active { get; set; } = true;

        public int WellnessProductCatatoryId { get; set; }

        public List<WellnessProductImageModel> Images { get; } = [];

        [NotMapped]
        public int CategoryId
        {
            get => this.WellnessProductCatatoryId;
            set => this.WellnessProductCatatoryId = value;
        }

    }
}
