using HMS_WebAPI.Extensions;
using HMS_WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Nodes;
using System.Xml.Linq;

namespace HMS_WebAPI.Controllers
{
    [Route("coctailbar")]
    [ApiController]
    [Authorize(Roles="admin")]
    public class CoctailbarController : ControllerBase
    {
        private readonly HMSContext dbContext;
        private readonly string filesPath;

        public CoctailbarController(HMSContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            filesPath = configuration.GetValue<string>("filespath") ?? "/app/storage/files";
        }

        #region Categories

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            return Ok(dbContext.Set<CoctailCategoryModel>()
                               .Where(w => w.Active)
                               .Select(p => new
                               {
                                   p.Id,
                                   p.Name
                               })
                               .OrderBy(p => p.Name));
        }

        [HttpGet("categories/{id}")]
        public IActionResult GetCategory([FromRoute] int id)
        {
            return Ok(dbContext.Set<CoctailCategoryModel>().SingleOrDefault(w => w.Active && w.Id == id));
        }

        [HttpPost("categories")]
        public IActionResult NewCategory([FromBody] object requestBody)
        {
            try
            {
                var model = requestBody.Serialize<CoctailCategoryModel>();
                if (model == null)
                    return BadRequest(new { message = "Missing body" });
                if (string.IsNullOrWhiteSpace(model.Name))
                    return BadRequest(new { message = "A megnevezés megadása kötelező" });

                if (dbContext.Set<CoctailCategoryModel>().Any(w => w.Name.ToLower() == model.Name.ToLower()))
                    return BadRequest(new { message = "A megadott névvel már van kategória rögzítve" });

                dbContext.Set<CoctailCategoryModel>().Add(model);
                dbContext.SaveChanges();
                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Hibás adat", debugMessage = ex.Message });
            }
        }

        [HttpPut("categories")]
        public IActionResult ModifyCategory([FromBody] object requestBody)
        {
            try
            {
                var model = requestBody.Serialize<CoctailCategoryModel>();
                if (model == null)
                    return BadRequest(new { message = "Missing body" });
                if (string.IsNullOrWhiteSpace(model.Name))
                    return BadRequest(new { message = "A megnevezés megadása kötelező" });

                if (dbContext.Set<MenuCategoryModel>().Any(w => w.Name.ToLower() == model.Name.ToLower() && w.Id != model.Id))
                    return BadRequest(new { message = "A megadott névvel már van kategória rögzítve" });

                var modelToModify = dbContext.Set<CoctailCategoryModel>().SingleOrDefault(w => w.Id == model.Id && w.Active);

                if (modelToModify == null)
                    return BadRequest(new { message = "A kategoria nem létezik, vagy már törölték" });
                modelToModify.Name = model.Name;

                dbContext.Entry(modelToModify).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                dbContext.SaveChanges();
                return Ok(model);
            }
            catch
            {
                return BadRequest(new { message = "Hibás adat" });
            }
        }

        [HttpDelete("categories/{id}")]
        public IActionResult DeleteCategory([FromRoute] int id)
        {
            var model = dbContext.Set<CoctailCategoryModel>().SingleOrDefault(p => p.Id == id);
            if (model == null)
                return BadRequest(new { message = "A kategoria nem létezik, vagy már törölték" });

            if (dbContext.Set<CoctailModel>().Any(p => p.CoctailCategoryId == id && p.Active))
                return BadRequest(new { message = "A megadott kategórával van már étel rögzítve" });

            model.Active = false;
            dbContext.Entry(model).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            dbContext.SaveChanges();

            return Ok(new { success = true });
        }

        #endregion Categories

        #region Coctails

        [HttpGet("coctails")]
        public IActionResult GetCoctails()
        { 
            return Ok
            (
                dbContext.Set<CoctailModel>()
                         .Include(m => m.CoctailCategory)
                         .Include(m => m.Images)
                         .Where(m => m.Active)
                         .Select(m => new
                         {
                             m.Id,
                             m.Name,
                             m.Price,
                             m.Description,
                             ImageUrls = m.Images.Select(x => x.Image.ImageUrl),
                             CategoryId = m.CoctailCategory == null ? null : (int?)m.CoctailCategory.Id,
                             CategoryName = m.CoctailCategory == null ? "" : m.CoctailCategory.Name
                         })
            );
        }

        [HttpGet("coctails/{id}")]
        public IActionResult GetCoctail([FromRoute] int id)
        {
            return Ok
            (
                dbContext.Set<CoctailModel>()
                         .Include(m => m.CoctailCategory)
                         .Include(m => m.Images)
                         .Where(m => m.Active && m.Id == id)
                         .Select(m => new
                         {
                             m.Id,
                             m.Name,
                             m.Price,
                             m.Description,
                             ImageUrls = m.Images.Select(x => x.Image.ImageUrl),
                             CategoryId = m.CoctailCategory == null ? null : (int?)m.CoctailCategory.Id,
                             CategoryName = m.CoctailCategory == null ? "" : m.CoctailCategory.Name
                         })
                         .SingleOrDefault()
            );
        }

        [HttpPost("coctails")]
        public IActionResult NewCoctail([FromBody] object requestBody)
        {
            try
            {
                var model = requestBody.Serialize<CoctailModel>();
                if (model == null)
                    return BadRequest(new { message = "Missing body" });
                if (string.IsNullOrWhiteSpace(model.Name))
                    return BadRequest(new { message = "A megnevezés megadása kötelező" });
                if (string.IsNullOrWhiteSpace(model.Description))
                    return BadRequest(new { message = "A leírás megadása kötelező" });
                if (model.Price == 0)
                    return BadRequest(new { message = "Az ár megadása kötelező" });
                if (model.CoctailCategoryId == 0)
                    return BadRequest(new { message = "A kategória megadása kötelező" });


                dbContext.Set<CoctailModel>().Add(model);
                var node = requestBody.Serialize<JsonNode>();

                var coctailImages = new List<CoctailImageModel>();
                JsonNode? imageNode = node?["Images"];
                if (imageNode == null)
                    imageNode = node?["images"];

                if (imageNode != null)
                {
                    foreach (var fileModel in imageNode.AsArray())
                    {
                        if (fileModel != null)
                        {
                            var fileName = fileModel["fileName"]?.GetValue<string>();
                            var base64 = fileModel["file"]?.GetValue<string>();
                            if (fileName == null || base64 == null)
                                return BadRequest(new { message = $"Hibás paraméterezés a feltöltött képek között" });

                            ImageModel image = FileHandling.SaveFile(Convert.FromBase64String(base64), fileName, filesPath);
                            dbContext.Set<ImageModel>().Add(image);
                            coctailImages.Add(new CoctailImageModel()
                            {
                                Image = image,
                                Coctail = model
                            });
                        }

                    }
                    dbContext.Set<CoctailImageModel>().AddRange(coctailImages);
                }
                dbContext.SaveChanges();

                return GetCoctail(model.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Váratlan hiba", debugMessage = ex.Message });
            }
        }

        [HttpPut("coctails")]
        public IActionResult ModifyCoctail([FromBody] object requestBody)
        {
            try
            {
                var model = requestBody.Serialize<CoctailModel>();
                if (model == null)
                    return BadRequest(new { message = "Missing body" });
                if (string.IsNullOrWhiteSpace(model.Name))
                    return BadRequest(new { message = "A megnevezés megadása kötelező" });
                if (string.IsNullOrWhiteSpace(model.Description))
                    return BadRequest(new { message = "A leírás megadása kötelező" });
                if (model.Price == 0)
                    return BadRequest(new { message = "Az ár megadása kötelező" });
                if (model.CoctailCategoryId == 0)
                    return BadRequest(new { message = "A kategória megadása kötelező" });

                var modelToModify = dbContext.Set<CoctailModel>().SingleOrDefault(r => r.Id == model.Id && r.Active);
                if (modelToModify == null)
                    return BadRequest(new { message = "Nem található a módosítandó étel." });

                modelToModify.Name = model.Name;
                modelToModify.Description = model.Description;
                modelToModify.Price = model.Price;
                modelToModify.CoctailCategoryId = model.CoctailCategoryId;
                modelToModify.Active = model.Active;
                dbContext.Entry(modelToModify).State = EntityState.Modified;

                dbContext.Set<CoctailImageModel>().RemoveRange(dbContext.Set<CoctailImageModel>().Where(r => r.CoctailId == model.Id));
                
                var node = requestBody.Serialize<JsonNode>();

                var coctailImages = new List<CoctailImageModel>();
                JsonNode? imageNode = node?["Images"];
                if (imageNode == null)
                    imageNode = node?["images"];

                if (imageNode != null)
                {
                    foreach (var fileModel in imageNode.AsArray())
                    {
                        if (fileModel != null)
                        {
                            var fileName = fileModel["fileName"]?.GetValue<string>();
                            var base64 = fileModel["file"]?.GetValue<string>();
                            if (fileName == null || base64 == null)
                                return BadRequest(new { message = $"Hibás paraméterezés a feltöltött képek között" });

                            ImageModel image = FileHandling.SaveFile(Convert.FromBase64String(base64), fileName, filesPath);
                            dbContext.Set<ImageModel>().Add(image);
                            coctailImages.Add(new CoctailImageModel()
                            {
                                Image = image,
                                Coctail = modelToModify
                            });
                        }

                    }
                    dbContext.Set<CoctailImageModel>().AddRange(coctailImages);
                }
                dbContext.SaveChanges();

                return GetCoctail(model.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Váratlan hiba", debugMessage = ex.Message });
            }
        }

        [HttpDelete("coctails/{id}")]
        public IActionResult DeleteCoctail([FromRoute] int id)
        {
            try
            {
                var modelToDelete = dbContext.Set<CoctailModel>().SingleOrDefault(r => r.Id == id && r.Active);
                if (modelToDelete == null)
                    return BadRequest(new { message = "Nem található a törlendő étel" });

                modelToDelete.Active = false;
                dbContext.Entry(modelToDelete).State = EntityState.Modified;
                dbContext.SaveChanges();

                return Ok(new { success = true });
            }
            catch
            {
                return BadRequest(new { message = "Váratlan hiba" });
            }
        }

        #endregion Coctails

        #region BarSales

        [HttpGet("sale/{roomNumber}")]
        [Authorize(Roles = "bar,admin")]
        public IActionResult CheckGuest([FromRoute] string roomNumber)
        {
            var value = dbContext.GuestsInRoom(roomNumber);
            return StatusCode(value.Key, value.Value);
        }


        [HttpPost("sale")]
        [Authorize(Roles = "bar,admin")]
        public IActionResult SellCoctail([FromBody] object requestBody)
        {
            try
            {
                var node = requestBody.Serialize<JsonNode>();
                if (node == null)
                    return BadRequest(new { message = "Missing body" });

                if (node["guestId"] == null)
                    return BadRequest(new { message = "A vendég megadása kötelező" });
                if (node["coctailId"] == null)
                    return BadRequest(new { message = "A koktél azonosítójának megadása kötelező" });

                var guestId = node["guestId"].GetValue<int>();
                var reservations = dbContext.Set<ReservationModel>()
                                            .Include(r => r.Room)
                                            .Include(r => r.Guests).ThenInclude(g => g.Guest)
                                            .Where(r => r.Guests.Any(g => g.GuestId == guestId) && 
                                                        r.CheckInTime != null &&
                                                        r.CheckOutTime == null);
                if (!reservations.Any())
                    return BadRequest(new { message = "A vendég kódja hibás, vagy már kijelentkezett" });

                var coctail = dbContext.Set<CoctailModel>().SingleOrDefault(c => c.Id == node["coctailId"].GetValue<int>() && c.Active);
                if (coctail == null)
                    return BadRequest(new { message = "A megodott koktél nem létezik, vagy törölték" });
                var guest = dbContext.Set<GuestModel>().SingleOrDefault(g => g.Id == guestId);
                if (guest == null)
                    return BadRequest(new { message = "A vendég kódja hibás, vagy már kijelentkezett" });

                dbContext.Set<CoctailbarSalesModel>().Add(new CoctailbarSalesModel()
                {
                    Coctail = coctail,
                    DateOfSales = DateTime.Now,
                    Guest = guest,
                    Price = coctail.Price                    
                });
                dbContext.SaveChanges();
                return Ok(new
                {
                    Price = coctail.Price
                });
            }
            catch
            {
                return BadRequest(new { message = "Váratlan hiba" });
            }
        }

        #endregion BarSales

    }
}
