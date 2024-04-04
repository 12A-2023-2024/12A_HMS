using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("reservations")]
    public class ReservationModel
    {
        public int Id { get; set; }
        public RoomModel? Room { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public DateTime? CheckInTime { get; set; }
        public DateTime? CheckOutTime { get; set; }
        public decimal Price { get; set; }
        public string? PIN { get; set; }

        public int RoomId { get; set; }
        public List<GuestReservationModel> Guests { get; } = [];
    }
}
