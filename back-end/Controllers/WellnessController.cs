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
    [Route("wellness")]
    [ApiController]
    [Authorize(Roles="admin")]
    public class WellnessController : ControllerBase
    {
        private readonly HMSContext dbContext;
        private readonly string filesPath;

        public WellnessController(HMSContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            filesPath = configuration.GetValue<string>("filespath") ?? "/app/storage/files";
        }

        #region WellnessCategories

        [HttpGet("categories")]
        public IActionResult GetWellnessCategories()
        {
            return Ok(dbContext.Set<WellnessProductCatatoryModel>()
                               .Where(w => w.Active)
                               .Select(p => new
                               {
                                   p.Id,
                                   p.Name
                               })
                               .OrderBy(p => p.Name));
        }

        [HttpGet("categories/{id}")]
        public IActionResult GetWellnessCategory([FromRoute] int id)
        {
            return Ok(dbContext.Set<WellnessProductCatatoryModel>().SingleOrDefault(w => w.Active && w.Id == id));
        }

        [HttpPost("categories")]
        public IActionResult NewWellnessCategory([FromBody] object requestBody)
        {
            try
            {
                var model = requestBody.Serialize<WellnessProductCatatoryModel>();
                if (model == null)
                    return BadRequest(new { message = "Missing body" });
                if (string.IsNullOrWhiteSpace(model.Name))
                    return BadRequest(new { message = "A megnevezés megadása kötelező" });

                if (dbContext.Set<WellnessProductCatatoryModel>().Any(w => w.Name.ToLower() == model.Name.ToLower()))
                    return BadRequest(new { message = "A megadott névvel már van kategória rögzítve" });

                dbContext.Set<WellnessProductCatatoryModel>().Add(model);
                dbContext.SaveChanges();
                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Hibás adat", debugMessage = ex.Message });
            }
        }

        [HttpPut("categories")]
        public IActionResult ModifyWellnessCategory([FromBody] object requestBody)
        {
            try
            {
                var model = requestBody.Serialize<WellnessProductCatatoryModel>();
                if (model == null)
                    return BadRequest(new { message = "Missing body" });
                if (string.IsNullOrWhiteSpace(model.Name))
                    return BadRequest(new { message = "A megnevezés megadása kötelező" });

                if (dbContext.Set<WellnessProductCatatoryModel>().Any(w => w.Name.ToLower() == model.Name.ToLower() && w.Id != model.Id))
                    return BadRequest(new { message = "A megadott névvel már van kategória rögzítve" });

                var modelToModify = dbContext.Set<WellnessProductCatatoryModel>().SingleOrDefault(w => w.Id == model.Id && w.Active);

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
        public IActionResult DeleteWellnessCategory([FromRoute] int id)
        {
            var model = dbContext.Set<WellnessProductCatatoryModel>().SingleOrDefault(p => p.Id == id);
            if (model == null)
                return BadRequest(new { message = "A kategoria nem létezik, vagy már törölték" });

            if (dbContext.Set<WellnessProductModel>().Any(p => p.WellnessProductCatatoryId == id && p.Active))
                return BadRequest(new { message = "A kategoria nem létezik, vagy már törölték" });

            model.Active = false;
            dbContext.Entry(model).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
            dbContext.SaveChanges();

            return Ok(new { success = true });
        }

        #endregion WellnessCategories

        #region WellnessProducts

        [HttpGet("products")]
        public IActionResult GetWellnessProducts()
        {
            return Ok
            (
                dbContext.Set<WellnessProductModel>()
                         .Include(w => w.WellnessProductCatatory)
                         .Include(w => w.Images)
                         .Where(w => w.Active)
                         .Select(w => new
                         {
                             w.Id,
                             w.Name,
                             w.Price,
                             w.Description,
                             ImageUrls = w.Images.Select(x => x.Image.ImageUrl),
                             CategoryId = w.WellnessProductCatatory.Id,
                             CategoryName = w.WellnessProductCatatory.Name
                         })
            );
        }

        [HttpGet("products/{id}")]
        public IActionResult GetWellnessProduct([FromRoute] int id)
        {
            return Ok
            (
                dbContext.Set<WellnessProductModel>()
                         .Include(w => w.WellnessProductCatatory)
                         .Include(w => w.Images)
                         .Where(w => w.Active && w.Id == id)
                         .Select(w => new
                         {
                             w.Id,
                             w.Name,
                             w.Price,
                             w.Description,
                             ImageUrls = w.Images.Select(x => x.Image.ImageUrl),
                             CategoryId = w.WellnessProductCatatory.Id,
                             CategoryName = w.WellnessProductCatatory.Name
                         })
                         .SingleOrDefault()
            );
        }

        [HttpPost("products")]
        public IActionResult NewWellnessProduct([FromBody] object requestBody)
        {
            try
            {
                var model = requestBody.Serialize<WellnessProductModel>();
                if (model == null)
                    return BadRequest(new { message = "Missing body" });
                if (string.IsNullOrWhiteSpace(model.Name))
                    return BadRequest(new { message = "A megnevezés megadása kötelező" });
                if (string.IsNullOrWhiteSpace(model.Description))
                    return BadRequest(new { message = "A leírás megadása kötelező" });
                if (model.Price == 0)
                    return BadRequest(new { message = "Az ár megadása kötelező" });
                if (model.WellnessProductCatatoryId == 0)
                    return BadRequest(new { message = "A kategória megadása kötelező" });


                dbContext.Set<WellnessProductModel>().Add(model);
                var node = requestBody.Serialize<JsonNode>();

                var wellnessProductsImages = new List<WellnessProductImageModel>();
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
                            wellnessProductsImages.Add(new WellnessProductImageModel()
                            {
                                Image = image,
                                WellnessProduct = model
                            });
                        }

                    }
                    dbContext.Set<WellnessProductImageModel>().AddRange(wellnessProductsImages);
                }
                dbContext.SaveChanges();

                return GetWellnessProduct(model.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Váratlan hiba", debugMessage = ex.Message });
            }
        }

        [HttpPut("products")]
        public IActionResult ModifyWellnessProduct([FromBody] object requestBody)
        {
            try
            {
                var model = requestBody.Serialize<WellnessProductModel>();
                if (model == null)
                    return BadRequest(new { message = "Missing body" });
                if (string.IsNullOrWhiteSpace(model.Name))
                    return BadRequest(new { message = "A megnevezés megadása kötelező" });
                if (string.IsNullOrWhiteSpace(model.Description))
                    return BadRequest(new { message = "A leírás megadása kötelező" });
                if (model.Price == 0)
                    return BadRequest(new { message = "Az ár megadása kötelező" });
                if (model.WellnessProductCatatoryId == 0)
                    return BadRequest(new { message = "A kategória megadása kötelező" });

                var modelToModify = dbContext.Set<WellnessProductModel>().SingleOrDefault(r => r.Id == model.Id && r.Active);
                if (modelToModify == null)
                    return BadRequest(new { message = "Nem található a módosítandó wellness termék." });

                modelToModify.Name = model.Name;
                modelToModify.Description = model.Description;
                modelToModify.Price = model.Price;
                modelToModify.WellnessProductCatatoryId = model.WellnessProductCatatoryId;
                modelToModify.Active = model.Active;
                dbContext.Entry(modelToModify).State = EntityState.Modified;

                dbContext.Set<WellnessProductImageModel>().RemoveRange(dbContext.Set<WellnessProductImageModel>().Where(r => r.WellnessProductId == model.Id));
                
                var node = requestBody.Serialize<JsonNode>();

                var wellnessProductsImages = new List<WellnessProductImageModel>();
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
                            wellnessProductsImages.Add(new WellnessProductImageModel()
                            {
                                Image = image,
                                WellnessProduct = modelToModify
                            });
                        }

                    }
                    dbContext.Set<WellnessProductImageModel>().AddRange(wellnessProductsImages);
                }
                dbContext.SaveChanges();

                return GetWellnessProduct(model.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Váratlan hiba", debugMessage = ex.Message });
            }
        }

        [HttpDelete("products/{id}")]
        public IActionResult DeleteWellnessProduct([FromRoute] int id)
        {
            try
            {
                var modelToDelete = dbContext.Set<WellnessProductModel>().SingleOrDefault(r => r.Id == id && r.Active);
                if (modelToDelete == null)
                    return BadRequest(new { message = "Nem található a törlendő termék" });

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

        #endregion WellnessProducts

        #region WellnessSales

        //TODO

        /*
        [HttpPost("sale")]
        public IActionResult SellWellnessProduct([FromBody] object requestBody)
        {
            try
            {
                var node = requestBody.Serialize<JsonNode>();
                if (node == null)
                    return BadRequest(new { message = "Missing body" });
                JsonNode? roomNode = node["RoomNumber"];
                if (roomNode == null)
                    roomNode = node["roomNumber"];

                if (roomNode == null)
                    return BadRequest(new { message = "A szobaszám megadása kötelező" });

                JsonNode? wellnessProductNode = node["WellnessProductId"];
                if (wellnessProductNode == null)
                    wellnessProductNode = node["wellnessProductId"];

                if (wellnessProductNode == null)
                    return BadRequest(new { message = "A termék azonosítójának megadása kötelező" });

                var roomNumber = roomNode.GetValue<string>();
                var wellnessProductId = wellnessProductNode.GetValue<int>();

                
            }
            catch
            {
                return BadRequest(new { message = "Váratlan hiba" });
            }
        }
        */

        #endregion

    }
}
