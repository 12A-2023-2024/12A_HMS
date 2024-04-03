using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("coctailimages")]
    public class CoctailImageModel
    {
        public int Id { get; set; }
        public required ImageModel Image { get; set; }
        public required CoctailModel Coctail { get; set; }

        public int ImageId { get; set; }
        public int CoctailId { get; set; }
    }

}
