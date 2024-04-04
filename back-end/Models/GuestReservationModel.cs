using System.ComponentModel.DataAnnotations.Schema;

namespace HMS_WebAPI.Models
{
    [Table("guestreservations")]
    public class GuestReservationModel
    {
        public int Id { get; set; }
        public ReservationModel? Reservation { get; set; }
        public GuestModel? Guest { get; set; }

        public int ReservationId { get; set; }
        public int GuestId { get; set; }
    }
}
