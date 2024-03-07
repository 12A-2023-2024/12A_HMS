using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("newsItems")]
    public class NewsItemModel
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
        public required PictureModel Picture { get; set; }
        public required string Title { get; set; }
        public required string Text { get; set; }

        public int PictureId { get; set; }

    }
}
