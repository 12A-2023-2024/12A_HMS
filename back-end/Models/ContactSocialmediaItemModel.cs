using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("contactSocialmediaItems")]
    public class ContactSocialmediaItemModel
    {
        public int Id { get; set; }
        public required string Name { get; set; }
        public ImageModel Icon { get; set; } = null!;
        public required string SocialUrl { get; set; }

        public int IconId { get; set; }
        public string IconURL => Icon.ImageUrl;

        public int ContactModelId { get; set; }
    }
}
