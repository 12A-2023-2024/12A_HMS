using HMS_WebAPI.Extensions;
using HMS_WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;
using System.Text.Json.Nodes;

namespace HMS_WebAPI.Controllers
{
    [Route("reservations")]
    [ApiController]
    [Authorize(Roles = "admin,reception")]
    public class ReservationController : ControllerBase
    {
        private readonly HMSContext dbContext;
        private readonly string filesPath;
        private Random random = new Random();

        public ReservationController(HMSContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            filesPath = configuration.GetValue<string>("filespath") ?? "/app/storage/files";
        }

        [HttpGet("/publicpages/findrooms")]
        [AllowAnonymous]
        public IActionResult FindRooms(
            [FromQuery] int? floor, 
            [FromQuery] decimal? fromPrice, 
            [FromQuery] decimal? toPrice, 
            [FromQuery] int? capacity, 
            [FromQuery] string? parameters, 
            [FromQuery] DateTime fromDate,
            [FromQuery] DateTime toDate)
        {
            var parameterIds = string.IsNullOrEmpty(parameters) ? new List<int>() : parameters.Split(';').Select(p => int.Parse(p)).ToList();
            var rooms = dbContext.Set<RoomModel>()
                                 .Include(r => r.RoomType).ThenInclude(t => t.Images).ThenInclude(i => i.Image)
                                 .Include(r => r.RoomType).ThenInclude(t => t.Parameters).ThenInclude(p => p.RoomParameter)
                                 .Where(r => r.Active && 
                                             r.RoomType.Active &&
                                             (floor == null || r.RoomNumber.StartsWith(floor.ToString())) &&
                                             (fromPrice == null || r.RoomType.PricePerNigthPerPerson > fromPrice) &&
                                             (toPrice == null || r.RoomType.PricePerNigthPerPerson < toPrice) &&
                                             (capacity == null || r.RoomType.Capacity >= capacity) &&
                                             (parameterIds.Count() == 0 || r.RoomType.Parameters.Select(p => p.Id).Intersect(parameterIds).Count() == parameterIds.Count)
                                       )
                                 .Select(r => new
                                 {
                                     r.Id,
                                     r.RoomNumber,
                                     RoomType = new
                                     {
                                         r.RoomType.Name,
                                         r.RoomType.Description,
                                         ImageUrls = r.RoomType.Images.Select(i => i.Image.ImageUrl),
                                         Parameters = r.RoomType.Parameters.Select(p => p.RoomParameter.Name)
                                     },
                                     r.RoomType.Capacity,
                                     r.RoomType.PricePerNigthPerPerson
                                 }).ToList();
            var reservedRooms = dbContext.Set<ReservationModel>().Include(r => r.Room)
                                         .Where(r => r.ToDate > fromDate && r.FromDate < toDate)
                                         .Select(r => r.RoomId)
                                         .ToList();
            return Ok(rooms.Where(r => !reservedRooms.Contains(r.Id)));
        }

        [HttpPost("/publicpages/reserveroom")]
        [AllowAnonymous]
        public IActionResult ReserveRoom([FromBody] object requestBody)
        {
            /*
            {
                "roomnumber": "103",
                "fromdate": "2024-04-06",
                "todate": "2024-04-10",
                "guests": [
                   {
                        "name": "Gipsz Jakab",
                        "address": "Szent István út 7",
                        "city": "Győr",
                        "postalcode": "9021",
                        "citizenship": "magyar",
                        "dateofbirth": "2000-01-01",
                        "placeofbirth": "Győr",
                        "passportnumber": "XY123456"
                   },
                   {
                        "name": "Gipsz Jakabné",
                        "address": "Szent István út 7",
                        "city": "Győr",
                        "postalcode": "9021",
                        "citizenship": "magyar",
                        "dateofbirth": "2001-01-01",
                        "placeofbirth": "Győr",
                        "passportnumber": "AB987654"
                   }
                ]
            }
            */
            var node = requestBody.Serialize<JsonNode>();
            if (node == null)
                return BadRequest("Missing body");
            if (node["roomnumber"] == null)
                return BadRequest("Szobaszám megadása kötelező");
            if (node["fromdate"] == null || node["todate"] == null)
                return BadRequest("Fogalalási időszak megadása kötelező");
            if (!DateTime.TryParse(node["fromdate"].ToString(), out DateTime fromDate))
                return BadRequest("Hibás dátum: foglalási időszak kezdete");
            if (!DateTime.TryParse(node["todate"].ToString(), out DateTime toDate))
                return BadRequest("Hibás dátum: foglalási időszak vége");
            if (node["guests"] == null)
                return BadRequest("Hibányzó adat: vendégek listája");
            fromDate = new DateTime(fromDate.Year, fromDate.Month, fromDate.Day);
            toDate = new DateTime(toDate.Year, toDate.Month, toDate.Day);
            if (fromDate >= toDate)
                return BadRequest("Hibás időszak.");

            var room = dbContext.Set<RoomModel>().Include(r => r.RoomType).SingleOrDefault(r => r.RoomNumber == node["roomnumber"].ToString() && r.Active);
            if (room == null)
                return BadRequest("Nem létező szoba");
            var guests = new List<GuestModel>();

            foreach (var guest in node["guests"].AsArray())
            {
                try
                {
                    guests.Add(guest.ToJsonString().Serialize<GuestModel>());
                }
                catch
                {
                    return BadRequest("Hibás adat a vendégek között");
                }
            }

            var reservedRooms = dbContext.Set<ReservationModel>().Include(r => r.Room)
                                         .Where(r => r.ToDate > fromDate && r.FromDate < toDate && r.Room.RoomNumber == room.RoomNumber)
                                         .Select(r => r.RoomId)
                                         .ToList();
            if (reservedRooms.Count != 0)
            {
                return BadRequest("A szoba már nem szabad.");
            }

            dbContext.Guests.AddRange(guests);
            var reservetation = dbContext.Set<ReservationModel>().Add(new ReservationModel
            {
                FromDate = fromDate,
                ToDate = toDate,
                Room = room,
                PIN = GeneratePIN(),
                Price = room.RoomType.PricePerNigthPerPerson * guests.Count() * (int)((toDate - fromDate).TotalDays)
            });
            dbContext.Set<GuestReservationModel>().AddRange(guests.Select(g => new GuestReservationModel()
            {
                Guest = g,
                Reservation = reservetation.Entity
            }));
            dbContext.SaveChanges();

            return Ok(new
            {
                reservetation.Entity.Id,
                Price = room.RoomType.PricePerNigthPerPerson * guests.Count() * (int)((toDate - fromDate).TotalDays)
            });
        }


        [HttpPost("/publicpages/checkin/{pin}")]
        [AllowAnonymous]
        public IActionResult CheckInByPIN([FromRoute] string pin)
        {
            var reservation = dbContext.Set<ReservationModel>()
                                       .Include(r => r.Room)
                                       .SingleOrDefault(r => r.PIN == pin && r.CheckInTime == null && r.FromDate <= DateTime.Today && r.ToDate > DateTime.Today);
            if (reservation == null)
            {
                return BadRequest("Érvénytelen PIN kód");
            }
            reservation.CheckInTime = DateTime.Now;
            dbContext.SaveChanges();
            return Ok(new
            {
                reservation.Room.RoomNumber
            });
        }

        [HttpGet("list")]
        public IActionResult Reservations()
        {
            return Ok(dbContext.Set<ReservationModel>()
                               .Include(r => r.Room)
                               .Include(r => r.Guests).ThenInclude(g => g.Guest)
                               .Where(r => r.CheckOutTime == null)
                               .Select(r => new
                               {
                                   r.Room.RoomNumber,
                                   FromDate = r.FromDate.ToString("yyyy-MM-dd"),
                                   ToDate = r.ToDate.ToString("yyyy-MM-dd"),
                                   r.PIN,
                                   CheckInTime = r.CheckInTime == null ? "" : ((DateTime)r.CheckInTime).ToString("yyyy-MM-dd"),
                                   r.Price,
                                   Guests = r.Guests.Select(g => new
                                            {
                                                g.Guest.Name,
                                                g.Guest.City,
                                                g.Guest.PostalCode,
                                                g.Guest.Address,
                                                g.Guest.PlaceOfBirth,
                                                DateOfBirth = g.Guest.DateOfBirth.ToString("yyyy-MM-dd"),
                                                g.Guest.Citizenship,
                                                g.Guest.PassportNumber
                                            })
                               }));
        }

        private string GeneratePIN()
        {
            var pin = random.Next(1, 1000000).ToString().PadLeft(2, '0');
            while (dbContext.Set<ReservationModel>().Any(r => r.PIN == pin && r.CheckInTime == null))
                pin = random.Next(1, 1000000).ToString().PadLeft(2, '0');
            return pin;

        }

    }
}
