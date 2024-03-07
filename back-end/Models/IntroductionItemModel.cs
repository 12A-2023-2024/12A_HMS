using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("introductionItems")]
    public class IntroductionItemModel
    {
        public int Id { get; set; }
        public required PictureModel Picture { get; set; }
        public required string Text { get; set; }
        public required string Section { get; set; }
    }
}
