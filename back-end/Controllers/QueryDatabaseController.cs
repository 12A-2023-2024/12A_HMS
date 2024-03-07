using HMS_WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HMS_WebAPI.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class QueryDatabaseController : ControllerBase
    {

        private readonly HMSContext dbContext;

        public QueryDatabaseController(HMSContext dbContext) 
        {
            this.dbContext = dbContext;
        }

        [HttpGet("roles")]
        public IActionResult Roles()
        {
            return Ok(dbContext.Set<RoleModel>().Select(r => new {r.Id, r.Name}));
        }

        [HttpGet("users")]
        public IActionResult Users()
        {
            return Ok
            (
                dbContext.Set<UserModel>()
                         .Include(u => u.UserRoles).ThenInclude(r => r.Role)
                         .Select(u => new
                         {
                             u.Id,
                             u.Name,
                             u.LoginName,
                             u.JobTitle,
                             Roles = u.UserRoles.Select(r => r.Role.Name)
                         })
            );
        }

        [HttpGet("guests")]
        public IActionResult Guests()
        {
            return Ok
            (
                dbContext.Set<GuestModel>()
            );
        }

        [HttpGet("roomparameters")]
        public IActionResult RoomParmeters()
        {
            return Ok
            (
                dbContext.Set<RoomParameterModel>()
            );
        }

        [HttpGet("roomtypes")]
        public IActionResult RoomTypes()
        {
            return Ok
            (
                dbContext.Set<RoomTypeModel>()
                         .Include(r => r.Parameters).ThenInclude(p => p.RoomParameter)
                         .Select(r => new
                         {
                             r.Id,
                             r.Name,
                             r.Description,
                             r.Capacity,
                             r.PricePerNigthPerPerson,
                             Parameters = r.Parameters.Select(p => p.RoomParameter.Name)
                         })
            );
        }

    }
}
