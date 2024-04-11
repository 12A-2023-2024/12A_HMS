using HMS_WebAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HMS_WebAPI.Extensions
{
    public static class DbContextExtension
    {
        public static KeyValuePair<int, dynamic> GuestsInRoom(this HMSContext context, string roomNumber) 
        {
            if (string.IsNullOrEmpty(roomNumber))
                return new KeyValuePair<int, dynamic>(400, new { message = "Szoba száma hiányzik" });
            var reservation = context.Set<ReservationModel>()
                                       .Include(r => r.Room)
                                       .Include(r => r.Guests).ThenInclude(g => g.Guest)
                                       .SingleOrDefault(r => r.Room.RoomNumber == roomNumber &&
                                                             r.CheckInTime != null &&
                                                             r.CheckOutTime == null);
            
            return new KeyValuePair<int, dynamic>(200, reservation.Guests.Select(g => new
            {
                g.Guest.Id,
                g.Guest.Name,
                DateOfBirth = g.Guest.DateOfBirth.ToString("yyyy.MM.dd")
            }));
        }
    }
}
