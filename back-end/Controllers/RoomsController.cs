using HMS_WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using HMS_WebAPI.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization.Metadata;
using System.Text.Json.Nodes;

namespace HMS_WebAPI.Controllers
{
    [Route("rooms")]
    [Authorize(Roles = "admin")]
    [ApiController]
    public class RoomsController : ControllerBase
    {
        private readonly HMSContext dbContext;
        private readonly string filesPath;

        public RoomsController(HMSContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            filesPath = configuration.GetValue<string>("filespath") ?? "/app/storage/files";
        }

        #region RoomParameters

        [HttpGet("parameters")]
        public IActionResult GetRoomParameters()
        {
            return Ok(dbContext.Set<RoomParameterModel>()
                               .Select(p => new
                               {
                                   p.Id,
                                   p.Name
                               })
                               .OrderBy(p => p.Name));
        }

        [HttpGet("parameters/{id}")]
        public IActionResult GetSingleRoomParameter([FromRoute] int id)
        {
            return Ok(dbContext.Set<RoomParameterModel>().SingleOrDefault(p => p.Id == id));
        }

        [HttpPost("parameters")]
        public IActionResult NewRoomParameter([FromBody] object requestBody)
        {
            try
            {
                var model = requestBody.Serialize<RoomParameterModel>();
                if (model == null)
                    return BadRequest(new { message = "Missing body" });
                if (string.IsNullOrWhiteSpace(model.Name))
                    return BadRequest(new { message = "A megnevezés megadása kötelező" });

                if (dbContext.Set<RoomParameterModel>().Any(w => w.Name.ToLower() == model.Name.ToLower()))
                    return BadRequest(new { message = "A megadott névvel már van paraméter rögzítve" });

                dbContext.Set<RoomParameterModel>().Add(model);
                dbContext.SaveChanges();
                return Ok(model);
            }
            catch
            {
                return BadRequest(new { message = "Hibás adat", debugMessage = "Conversion error" });
            }
        }

        [HttpPut("parameters")]
        public IActionResult ModifyRoomParameter([FromBody] object requestBody)
        {
            try
            {
                var model = requestBody.Serialize<RoomParameterModel>();
                if (model == null)
                    return BadRequest(new { message = "Missing body" });
                if (string.IsNullOrWhiteSpace(model.Name))
                    return BadRequest(new { message = "A megnevezés megadása kötelező" });

                if (dbContext.Set<RoomParameterModel>().Any(w => w.Name.ToLower() == model.Name.ToLower() && w.Id != model.Id))
                    return BadRequest(new { message = "A megadott névvel már van paraméter rögzítve" });

                var modelToModify = dbContext.Set<RoomParameterModel>().SingleOrDefault(p => p.Id == model.Id);

                if (modelToModify == null)
                    return BadRequest(new { message = "A paraméter nem létezik, vagy már törölték" });
                modelToModify.Name = model.Name;

                dbContext.Entry(modelToModify).State = Microsoft.EntityFrameworkCore.EntityState.Modified;
                dbContext.SaveChanges();
                return Ok(model);
            }
            catch
            {
                return BadRequest(new { message = "Hibás adat", debugMessage = "Conversion error" });
            }
        }

        [HttpDelete("parameters/{id}")]
        public IActionResult DeleteRoomParameter([FromRoute] int id)
        {
            var model = dbContext.Set<RoomParameterModel>().SingleOrDefault(p => p.Id == id);
            if (model == null)
                return BadRequest(new { message = "A paraméter nem létezik, vagy már törölték" });

            var roomParameters = dbContext.Set<RoomTypeParameterModel>().Where(p => p.RoomParameterId == id);

            dbContext.Set<RoomTypeParameterModel>().RemoveRange(roomParameters);
            dbContext.Set<RoomParameterModel>().Remove(model);
            dbContext.SaveChanges();
            return Ok(new { success = true });
        }

        #endregion RoomParameters


        [HttpGet("types")]
        public IActionResult GetRoomTypes([FromQuery] bool onlyActives = true)
        {
            return Ok(dbContext.Set<RoomTypeModel>()
                               .Where(r => onlyActives ? r.Active : true)
                               .Select(r => new
                               {
                                   r.Id,
                                   r.Name,
                                   r.Description,
                                   r.PricePerNigthPerPerson,
                                   r.Capacity,
                                   r.Active,
                                   Images = dbContext.Set<RoomTypeImageModel>()
                                                     .Include(i => i.Image)
                                                     .Where(i => i.RoomTypeId == r.Id)
                                                     .Select(i => new
                                                     {
                                                         i.Image.Id,
                                                         i.Image.ImageUrl
                                                     }).ToArray(),
                                   Parameters = dbContext.Set<RoomTypeParameterModel>()
                                                         .Include(p => p.RoomParameter)
                                                         .Where(p => p.RoomTypeId == r.Id)
                                                         .Select(p => new
                                                         {
                                                             p.RoomParameter.Id,
                                                             p.RoomParameter.Name
                                                         })
                                                         .ToArray()
                               })
                     );
        }

        [HttpGet("types/{id}")]
        public IActionResult GetRoomType([FromRoute] int id, [FromQuery] bool onlyActives = true)
        {
            return Ok(dbContext.Set<RoomTypeModel>()
                               .Where(r => r.Id == id && (onlyActives ? r.Active : true) )
                               .Select(r => new
                               {
                                   r.Id,
                                   r.Name,
                                   r.Description,
                                   r.PricePerNigthPerPerson,
                                   r.Capacity,
                                   r.Active,
                                   Images = dbContext.Set<RoomTypeImageModel>()
                                                     .Include(i => i.Image)
                                                     .Where(i => i.RoomTypeId == r.Id)
                                                     .Select(i => new
                                                     {
                                                         i.Image.Id,
                                                         i.Image.ImageUrl
                                                     }).ToArray(),
                                   Parameters = dbContext.Set<RoomTypeParameterModel>()
                                                         .Include(p => p.RoomParameter)
                                                         .Where(p => p.RoomTypeId == r.Id)
                                                         .Select(p => new
                                                         {
                                                             p.RoomParameter.Id,
                                                             p.RoomParameter.Name
                                                         }).ToArray()
                               })
                               .SingleOrDefault()
                     );
        }

        [HttpPost("types")]
        public IActionResult NewRoomType([FromBody] object requestBody)
        {
            try
            {
                var model = requestBody.Serialize<RoomTypeModel>();
                if (model == null)
                    return BadRequest(new { message = "Missing body" });
                if (string.IsNullOrWhiteSpace(model.Name))
                    return BadRequest(new { message = "A megnevezés megadása kötelező" });
                if (string.IsNullOrWhiteSpace(model.Description))
                    return BadRequest(new { message = "A leírás megadása kötelező" });
                if (model.PricePerNigthPerPerson == 0)
                    return BadRequest(new { message = "Az ár megadása kötelező" });
                if (model.Capacity == 0)
                    return BadRequest(new { message = "Az elhelyezhető vendégek számának megadása kötelező" });

                if (dbContext.Set<RoomTypeModel>().Any(r => r.Name.ToLower() == model.Name.ToLower()))
                    return BadRequest(new { message = "A megadott névvel már van szobatípus rögzítve" });

                dbContext.Set<RoomTypeModel>().Add(model);
                var roomTypeParameters = new List<RoomTypeParameterModel>();
                var node = requestBody.Serialize<JsonNode>();
                JsonNode? parametersNode = node?["Parameters"];
                if (parametersNode == null)
                    parametersNode = node?["parameters"];

                if (parametersNode != null)
                {
                    foreach(var p in parametersNode.AsArray())
                    {
                        if (p != null)
                        {
                            var roomParameter = dbContext.Set<RoomParameterModel>().SingleOrDefault(rp => rp.Id == p.GetValue<int>());
                            if (roomParameter == null)
                                return BadRequest(new { message = $"Nem létező szoba paraméter azonosító: {p}" });
                            else 
                                roomTypeParameters.Add(new RoomTypeParameterModel()
                                {
                                    RoomParameter = roomParameter,
                                    RoomType = model
                                });
                        }

                    }
                    dbContext.Set<RoomTypeParameterModel>().AddRange(roomTypeParameters);
                }

                var roomTypeImages = new List<RoomTypeImageModel>();
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
                            roomTypeImages.Add(new RoomTypeImageModel()
                            { 
                                Image = image,
                                RoomType = model
                            });
                        }

                    }
                    dbContext.Set<RoomTypeImageModel>().AddRange(roomTypeImages);
                }
                dbContext.SaveChanges();
                return GetRoomType(model.Id);
            }
            catch
            {
                return BadRequest(new { message = "Váratlan hiba" });
            }
        }

        
        [HttpPut("types")]
        public IActionResult ModifyRoomType([FromBody] object requestBody)
        {
            try
            {
                var model = requestBody.Serialize<RoomTypeModel>();
                if (model == null)
                    return BadRequest(new { message = "Missing body" });
                if (string.IsNullOrWhiteSpace(model.Name))
                    return BadRequest(new { message = "A megnevezés megadása kötelező" });
                if (string.IsNullOrWhiteSpace(model.Description))
                    return BadRequest(new { message = "A leírás megadása kötelező" });
                if (model.PricePerNigthPerPerson == 0)
                    return BadRequest(new { message = "Az ár megadása kötelező" });
                if (model.Capacity == 0)
                    return BadRequest(new { message = "Az elhelyezhető vendégek számának megadása kötelező" });

                var modelToModify = dbContext.Set<RoomTypeModel>().SingleOrDefault(r => r.Id == model.Id && (r.Active));
                if (modelToModify == null)
                    return BadRequest(new { message = "Nem található a módosítandó szobatípus" });

                modelToModify.Name = model.Name;
                modelToModify.Description = model.Description;
                modelToModify.PricePerNigthPerPerson = model.PricePerNigthPerPerson;
                modelToModify.Capacity = model.Capacity;
                modelToModify.Active = model.Active;
                dbContext.Entry(modelToModify).State = EntityState.Modified;

                dbContext.Set<RoomTypeParameterModel>().RemoveRange(dbContext.Set<RoomTypeParameterModel>().Where(r => r.RoomTypeId == model.Id));
                dbContext.Set<RoomTypeImageModel>().RemoveRange(dbContext.Set<RoomTypeImageModel>().Where(r => r.RoomTypeId == model.Id));

                var roomTypeParameters = new List<RoomTypeParameterModel>();
                var node = requestBody.Serialize<JsonNode>();
                JsonNode? parametersNode = node?["Parameters"];
                if (parametersNode == null)
                    parametersNode = node?["parameters"];

                if (parametersNode != null)
                {
                    foreach (var p in parametersNode.AsArray())
                    {
                        if (p != null)
                        {
                            var roomParameter = dbContext.Set<RoomParameterModel>().SingleOrDefault(rp => rp.Id == p.GetValue<int>());
                            if (roomParameter == null)
                                return BadRequest(new { message = $"Nem létező szoba paraméter azonosító: {p}" });
                            else
                                roomTypeParameters.Add(new RoomTypeParameterModel()
                                {
                                    RoomParameter = roomParameter,
                                    RoomType = modelToModify
                                });
                        }

                    }
                    dbContext.Set<RoomTypeParameterModel>().AddRange(roomTypeParameters);
                }

                var roomTypeImages = new List<RoomTypeImageModel>();
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
                            roomTypeImages.Add(new RoomTypeImageModel()
                            {
                                Image = image,
                                RoomType = modelToModify
                            });
                        }

                    }
                    dbContext.Set<RoomTypeImageModel>().AddRange(roomTypeImages);
                }
                dbContext.SaveChanges();
                return GetRoomType(modelToModify.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Váratlan hiba", debug = ex.Message});
            }
        }

        [HttpDelete("types/{id}")]
        public IActionResult DeleteRoomType([FromRoute] int id)
        {
            try
            {
                var modelToDelete = dbContext.Set<RoomTypeModel>().SingleOrDefault(r => r.Id == id && r.Active);
                if (modelToDelete == null)
                    return BadRequest(new { message = "Nem található a törlendő szobatípus" });

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

    }
}
