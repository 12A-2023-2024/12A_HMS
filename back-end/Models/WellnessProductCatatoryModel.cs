using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table ("wellnessproductcatatories")]
    public class WellnessProductCatatoryModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }

        public bool Active { get; set; } = true;
    }
}
