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
    [Route("restaurant")]
    [ApiController]
    [Authorize(Roles = "admin")]
    public class RestaurantController : ControllerBase
    {
        private readonly HMSContext dbContext;
        private readonly string filesPath;

        public RestaurantController(HMSContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            filesPath = configuration.GetValue<string>("filespath") ?? "/app/storage/files";
        }

        #region MenuCategories

        [HttpGet("categories")]
        public IActionResult GetMenuCategories()
        {
            return Ok(dbContext.Set<MenuCategoryModel>()
                               .Where(w => w.Active)
                               .Select(p => new
                               {
                                   p.Id,
                                   p.Name
                               })
                               .OrderBy(p => p.Name));
        }

        [HttpGet("categories/{id}")]
        public IActionResult GetMenuCategory([FromRoute] int id)
        {
            return Ok(dbContext.Set<MenuCategoryModel>().SingleOrDefault(w => w.Active && w.Id == id));
        }

        [HttpPost("categories")]
        public IActionResult NewMenuCategory([FromBody] object requestBody)
        {
            try
            {
                var model = requestBody.Serialize<MenuCategoryModel>();
                if (model == null)
                    return BadRequest(new { message = "Missing body" });
                if (string.IsNullOrWhiteSpace(model.Name))
                    return BadRequest(new { message = "A megnevezés megadása kötelező" });

                if (dbContext.Set<MenuCategoryModel>().Any(w => w.Name.ToLower() == model.Name.ToLower()))
                    return BadRequest(new { message = "A megadott névvel már van kategória rögzítve" });

                dbContext.Set<MenuCategoryModel>().Add(model);
                dbContext.SaveChanges();
                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Hibás adat", debugMessage = ex.Message });
            }
        }

        [HttpPut("categories")]
        public IActionResult ModifyMenuCategory([FromBody] object requestBody)
        {
            try
            {
                var model = requestBody.Serialize<MenuCategoryModel>();
                if (model == null)
                    return BadRequest(new { message = "Missing body" });
                if (string.IsNullOrWhiteSpace(model.Name))
                    return BadRequest(new { message = "A megnevezés megadása kötelező" });

                if (dbContext.Set<MenuCategoryModel>().Any(w => w.Name.ToLower() == model.Name.ToLower() && w.Id != model.Id))
                    return BadRequest(new { message = "A megadott névvel már van kategória rögzítve" });

                var modelToModify = dbContext.Set<MenuCategoryModel>().SingleOrDefault(w => w.Id == model.Id && w.Active);

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
        public IActionResult DeleteMenuCategory([FromRoute] int id)
        {
            var model = dbContext.Set<MenuCategoryModel>().SingleOrDefault(p => p.Id == id);
            if (model == null)
                return BadRequest(new { message = "A kategoria nem létezik, vagy már törölték" });

            if (dbContext.Set<MenuItemModel>().Any(p => p.MenuCategoryId == id && p.Active))
                return BadRequest(new { message = "A megadott kategórával van már étel rögzítve" });

            model.Active = false;
            dbContext.Entry(model).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            dbContext.SaveChanges();

            return Ok(new { success = true });
        }

        #endregion MenuCategories

        #region MenuItems

        [HttpGet("menuitems")]
        public IActionResult GetMenuItems()
        {
            return Ok
            (
                dbContext.Set<MenuItemModel>()
                         .Include(m => m.MenuCategory)
                         .Include(m => m.Images)
                         .Where(m => m.Active)
                         .Select(m => new
                         {
                             m.Id,
                             m.Name,
                             m.Price,
                             m.Description,
                             ImageUrls = m.Images.Select(x => x.Image.ImageUrl),
                             CategoryId = m.MenuCategory.Id,
                             CategoryName = m.MenuCategory.Name
                         })
            );
        }

        [HttpGet("menuitems/{id}")]
        public IActionResult GetMenuItem([FromRoute] int id)
        {
            return Ok
            (
                dbContext.Set<MenuItemModel>()
                         .Include(m => m.MenuCategory)
                         .Include(m => m.Images)
                         .Where(m => m.Active && m.Id == id)
                         .Select(m => new
                         {
                             m.Id,
                             m.Name,
                             m.Price,
                             m.Description,
                             ImageUrls = m.Images.Select(x => x.Image.ImageUrl),
                             CategoryId = m.MenuCategory.Id,
                             CategoryName = m.MenuCategory.Name
                         })
                         .SingleOrDefault()
            );
        }

        [HttpPost("menuitems")]
        public IActionResult NewMenuItem([FromBody] object requestBody)
        {
            try
            {
                var model = requestBody.Serialize<MenuItemModel>();
                if (model == null)
                    return BadRequest(new { message = "Missing body" });
                if (string.IsNullOrWhiteSpace(model.Name))
                    return BadRequest(new { message = "A megnevezés megadása kötelező" });
                if (string.IsNullOrWhiteSpace(model.Description))
                    return BadRequest(new { message = "A leírás megadása kötelező" });
                if (model.Price == 0)
                    return BadRequest(new { message = "Az ár megadása kötelező" });
                if (model.MenuCategoryId == 0)
                    return BadRequest(new { message = "A kategória megadása kötelező" });


                dbContext.Set<MenuItemModel>().Add(model);
                var node = requestBody.Serialize<JsonNode>();

                var menuItemImages = new List<MenuImageModel>();
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
                            menuItemImages.Add(new MenuImageModel()
                            {
                                Image = image,
                                MenuItem = model
                            });
                        }

                    }
                    dbContext.Set<MenuImageModel>().AddRange(menuItemImages);
                }
                dbContext.SaveChanges();

                return GetMenuItem(model.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Váratlan hiba", debugMessage = ex.Message });
            }
        }

        [HttpPut("menuitems")]
        public IActionResult ModifyMenuItem([FromBody] object requestBody)
        {
            try
            {
                var model = requestBody.Serialize<MenuItemModel>();
                if (model == null)
                    return BadRequest(new { message = "Missing body" });
                if (string.IsNullOrWhiteSpace(model.Name))
                    return BadRequest(new { message = "A megnevezés megadása kötelező" });
                if (string.IsNullOrWhiteSpace(model.Description))
                    return BadRequest(new { message = "A leírás megadása kötelező" });
                if (model.Price == 0)
                    return BadRequest(new { message = "Az ár megadása kötelező" });
                if (model.MenuCategoryId == 0)
                    return BadRequest(new { message = "A kategória megadása kötelező" });

                var modelToModify = dbContext.Set<MenuItemModel>().SingleOrDefault(r => r.Id == model.Id && r.Active);
                if (modelToModify == null)
                    return BadRequest(new { message = "Nem található a módosítandó étel." });

                modelToModify.Name = model.Name;
                modelToModify.Description = model.Description;
                modelToModify.Price = model.Price;
                modelToModify.MenuCategoryId = model.MenuCategoryId;
                modelToModify.Active = model.Active;
                dbContext.Entry(modelToModify).State = EntityState.Modified;

                dbContext.Set<MenuImageModel>().RemoveRange(dbContext.Set<MenuImageModel>().Where(r => r.MenuItemId == model.Id));

                var node = requestBody.Serialize<JsonNode>();

                var menuItemImages = new List<MenuImageModel>();
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
                            menuItemImages.Add(new MenuImageModel()
                            {
                                Image = image,
                                MenuItem = modelToModify
                            });
                        }

                    }
                    dbContext.Set<MenuImageModel>().AddRange(menuItemImages);
                }
                dbContext.SaveChanges();

                return GetMenuItem(model.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Váratlan hiba", debugMessage = ex.Message });
            }
        }

        [HttpDelete("menuitems/{id}")]
        public IActionResult DeleteMenuItem([FromRoute] int id)
        {
            try
            {
                var modelToDelete = dbContext.Set<MenuItemModel>().SingleOrDefault(r => r.Id == id && r.Active);
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

        #endregion MenuItems

        #region RestaurantSales

        [HttpGet("sale/{roomNumber}")]
        [Authorize(Roles = "restaurant,admin")]
        public IActionResult CheckGuest([FromRoute] string roomNumber)
        {
            var value = dbContext.GuestsInRoom(roomNumber);
            return StatusCode(value.Key, value.Value);
        }


        [HttpPost("sale")]
        [Authorize(Roles = "restaurant,admin")]
        public IActionResult SellItem([FromBody] object requestBody)
        {
            try
            {
                var node = requestBody.Serialize<JsonNode>();
                if (node == null)
                    return BadRequest(new { message = "Missing body" });

                if (node["guestId"] == null)
                    return BadRequest(new { message = "A vendég megadása kötelező" });
                if (node["menuItemId"] == null)
                    return BadRequest(new { message = "Az eladott étel azonosítójának megadása kötelező" });

                var guestId = node["guestId"].GetValue<int>();
                var reservations = dbContext.Set<ReservationModel>()
                                            .Include(r => r.Room)
                                            .Include(r => r.Guests).ThenInclude(g => g.Guest)
                                            .Where(r => r.Guests.Any(g => g.GuestId == guestId) &&
                                                        r.CheckInTime != null &&
                                                        r.CheckOutTime == null);
                if (!reservations.Any())
                    return BadRequest(new { message = "A vendég kódja hibás, vagy már kijelentkezett" });

                var menuItem = dbContext.Set<MenuItemModel>().SingleOrDefault(c => c.Id == node["menuItemId"].GetValue<int>() && c.Active);
                if (menuItem == null)
                    return BadRequest(new { message = "A megodott étel nem létezik, vagy törölték" });
                var guest = dbContext.Set<GuestModel>().SingleOrDefault(g => g.Id == guestId);
                if (guest == null)
                    return BadRequest(new { message = "A vendég kódja hibás, vagy már kijelentkezett" });

                dbContext.Set<RestaurantSalesModel>().Add(new RestaurantSalesModel()
                {
                    MenuItem = menuItem,
                    DateOfSales = DateTime.Now,
                    Guest = guest,
                    Price = menuItem.Price
                });
                dbContext.SaveChanges();
                return Ok(new
                {
                    Price = menuItem.Price
                });
            }
            catch
            {
                return BadRequest(new { message = "Váratlan hiba" });
            }

            #endregion RestaurantSales

        }
    }
}
