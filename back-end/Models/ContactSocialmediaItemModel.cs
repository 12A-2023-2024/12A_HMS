using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("contactSocialmediaItems")]
    public class ContactSocialmediaItemModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public required string Icon { get; set; }
        public required string SocialUrl { get; set; }


        [NotMapped]
        public required string IconUrl { get; set; }
    }
}
