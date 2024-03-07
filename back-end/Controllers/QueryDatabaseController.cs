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

        [HttpGet("contacts")]
        public IActionResult Contacts()
        {
            return Ok
            (
                dbContext.Set<ContactModel>()
                         .Select(c => new
                         {
                            c.Id,
                            c.TaxNumber,
                            c.PostalCode,
                            c.City,
                            c.Address,
                            c.Email,
                            c.Telephone,
                            SocialMedia = dbContext.Set<ContactSocialmediaItemModel>().Include(c => c.Icon).Select(s => new
                            {
                                s.Id,
                                s.Name,
                                s.IconURL,
                                s.SocialUrl
                            })
                         })
            );
        }

        [HttpGet("gallery")]
        public IActionResult Gallery()
        {
            return Ok
            (
                dbContext.Set<PictureModel>().Include(p => p.Image)
                         .Select(p => new
                         {
                             p.Id,
                             p.PictureUrl,
                             p.Href,
                             p.Alt
                         })
            );
        }

        [HttpGet("introduction")]
        public IActionResult Introduction()
        {
            return Ok
            (
                dbContext.Set<IntroductionItemModel>().Include(i => i.Picture).ThenInclude(p => p.Image)
                         .Select(i => new
                         {
                             i.Id,
                             i.Section,
                             i.Text,
                             i.Picture.PictureUrl
                         })
            );
        }

        [HttpGet("news")]
        public IActionResult News()
        {
            return Ok
            (
                dbContext.Set<NewsItemModel>().Include(n => n.Picture).ThenInclude(p => p.Image)
                         .Select(n => new
                         {
                             n.Id,
                             n.Title,
                             n.Date,
                             n.Text,
                             n.Picture.PictureUrl
                         })
            );
        }

        [HttpGet("wellnessproductcategories")]
        public IActionResult WellnessProductCategories()
        {
            return Ok
            (
                dbContext.Set<WellnessProductCatatoryModel>()
                         .Select(w => new
                         {
                             w.Id,
                             w.Name
                         })
            );
        }

        [HttpGet("wellnessproducts")]
        public IActionResult WellnessProducts()
        {
            return Ok
            (
                dbContext.Set<WellnessProductModel>()
                         .Include(w => w.WellnessProductCatatory)
                         .Include(w => w.Images)
                         .Select(w => new
                         {
                             w.Id,
                             w.Name,
                             w.Price,
                             w.ImageUrls,
                             CategoryId = w.WellnessProductCatatory.Id,
                             CategoryName = w.WellnessProductCatatory.Name
                         })
            );
        }

        [HttpGet("wellnesssales")]
        public IActionResult WellnessSales()
        {
            return Ok
            (
                dbContext.Set<WellnessSaleModel>()
                         .Include(w => w.WellnessProduct)
                         .Include(w => w.Guest)
                         .Select(w => new
                         {
                             w.Id,
                             w.GuestId,
                             GuestName = w.Guest.Name,
                             w.WellnessProductId,
                             WellnessProductName = w.WellnessProduct.Name,
                             w.Price,
                             w.DateOfSales,
                             w.DateOfPayment
                         })
            );
        }

    }
}
