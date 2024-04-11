using HMS_WebAPI.Extensions;
using HMS_WebAPI.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Nodes;

namespace HMS_WebAPI.Controllers
{
    [Route("about")]
    [ApiController]
    [Authorize(Roles="admin")]
    public class AboutController : ControllerBase
    {
        private readonly HMSContext dbContext;
        private readonly string filesPath;

        public AboutController(HMSContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            filesPath = configuration.GetValue<string>("filespath") ?? "/app/storage/files";
        }

        #region Gallery
        [HttpGet("gallery")]
        public IActionResult GetGallery()
        {
            return Ok(dbContext.Set<GalleryItem>()
                               .Include(g => g.Picture).ThenInclude(p => p.Image)
                               .Select(g => new
                               {
                                   g.Id,
                                   g.Order,
                                   g.Picture.PictureUrl,
                                   g.Picture.Href,
                                   g.Picture.Alt
                               })
                               .OrderBy(g => g.Order).ThenBy(g => g.Id));
        }

        [HttpGet("gallery/{id}")]
        public IActionResult GetGalleryItem([FromRoute] int id)
        {
            return Ok(dbContext.Set<GalleryItem>()
                               .Include(g => g.Picture).ThenInclude(p => p.Image)
                               .Where(g => g.Id == id)
                               .Select(g => new
                               {
                                   g.Id,
                                   g.Order,
                                   g.Picture.PictureUrl,
                                   g.Picture.Href,
                                   g.Picture.Alt
                               })
                               .FirstOrDefault());
        }

        [HttpPost("gallery")]
        public IActionResult NewGalleryItem([FromBody] object requestBody)
        {
            try
            {
                var node = requestBody.Serialize<JsonNode>();
                if (node == null)
                    return BadRequest("Missing body");
                if (node["order"] == null)
                    return BadRequest("Sorrend megadása kötelező");
                var fileModel = node["image"];
                if (fileModel == null)
                    return BadRequest("Nem töltött fel képet");

                var fileName = fileModel["fileName"]?.GetValue<string>();
                var base64 = fileModel["file"]?.GetValue<string>();
                if (fileName == null || base64 == null)
                    return BadRequest(new { message = $"Hibás paraméterezés a feltöltött képben" });

                ImageModel image = FileHandling.SaveFile(Convert.FromBase64String(base64), fileName, filesPath);
                dbContext.Set<ImageModel>().Add(image);

                var item = dbContext.Set<GalleryItem>().Add(new GalleryItem()
                {
                    Order = node["order"].GetValue<int>(),
                    Picture = new PictureModel()
                    {
                        Alt = node["alt"]?.GetValue<string>() ?? "",
                        Href = node["href"]?.GetValue<string>() ?? "",
                        Image = image
                    }
                }); ;
                dbContext.SaveChanges();
                return GetGalleryItem(item.Entity.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Hibás adat", debugMessage = ex.Message });
            }
        }

        [HttpPut("gallery")]
        public IActionResult ModifyGallery([FromBody] object requestBody)
        {
            try
            {
                var node = requestBody.Serialize<JsonNode>();
                if (node == null)
                    return BadRequest("Missing body");
                if (node["order"] == null)
                    return BadRequest("Sorrend megadása kötelező");
                if (node["id"] == null)
                    return BadRequest("Nem adta meg a módosítandó galéria elemet");
                var fileModel = node["image"];
                if (fileModel == null)
                    return BadRequest("Nem töltött fel képet");

                var fileName = fileModel["fileName"]?.GetValue<string>();
                var base64 = fileModel["file"]?.GetValue<string>();
                if (fileName == null || base64 == null)
                    return BadRequest(new { message = $"Hibás paraméterezés a feltöltött képben" });

                var modelToModify = dbContext.Set<GalleryItem>().Include(g => g.Picture).ThenInclude(p => p.Image).SingleOrDefault(g => g.Id == node["id"].GetValue<int>());
                if (modelToModify == null)
                    return BadRequest("Nem található a módosítandó elem");

                ImageModel imageToDelete = modelToModify.Picture.Image;
                ImageModel image = FileHandling.SaveFile(Convert.FromBase64String(base64), fileName, filesPath);
                dbContext.Set<ImageModel>().Add(image);

                modelToModify.Picture.Image = image;
                modelToModify.Picture.Alt = node["alt"]?.GetValue<string>() ?? "";
                modelToModify.Picture.Href = node["href"]?.GetValue<string>() ?? "";
                dbContext.Entry(modelToModify.Picture).State = EntityState.Modified;
                dbContext.Set<ImageModel>().Remove(imageToDelete);

                modelToModify.Order = node["order"].GetValue<int>();
                dbContext.Entry(modelToModify).State = EntityState.Modified;

                dbContext.SaveChanges();
                return GetGalleryItem(modelToModify.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Hibás adat", debugMessage = ex.Message });
            }
        }

        [HttpDelete("gallery/{id}")]
        public IActionResult DeleteGalleryItem([FromRoute] int id)
        {
            var model = dbContext.Set<GalleryItem>().SingleOrDefault(p => p.Id == id);
            if (model == null)
                return BadRequest(new { message = "Az elem nem létezik" });

            dbContext.Set<GalleryItem>().Remove(model);
            dbContext.SaveChanges();

            return Ok(new { success = true });
        }
        #endregion Gallery

        #region News
        [HttpGet("news")]
        public IActionResult GetNews()
        {
            return Ok(dbContext.Set<NewsItemModel>()
                               .Include(g => g.Picture).ThenInclude(p => p.Image)
                               .Select(g => new
                               {
                                   g.Id,
                                   g.Date,
                                   g.Title,
                                   g.Text,
                                   g.Picture.PictureUrl,
                                   g.Picture.Href,
                                   g.Picture.Alt
                               })
                               .OrderBy(g => g.Date).ThenBy(g => g.Id));
        }

        [HttpGet("news/{id}")]
        public IActionResult GetNewsItem([FromRoute] int id)
        {
            return Ok(dbContext.Set<NewsItemModel>()
                               .Include(g => g.Picture).ThenInclude(p => p.Image)
                               .Where(g => g.Id == id)
                               .Select(g => new
                               {
                                   g.Id,
                                   g.Date,
                                   g.Title,
                                   g.Text,
                                   g.Picture.PictureUrl,
                                   g.Picture.Href,
                                   g.Picture.Alt
                               })
                               .FirstOrDefault());
        }

        [HttpPost("news")]
        public IActionResult NewNewsItem([FromBody] object requestBody)
        {
            try
            {
                var node = requestBody.Serialize<JsonNode>();
                if (node == null)
                    return BadRequest("Missing body");
                if (node["date"] == null || !DateTime.TryParse(node["date"].ToString(), out DateTime date))
                    return BadRequest("Dátum megadása kötelező");
                if (node["title"] == null || string.IsNullOrEmpty(node["title"].ToString()))
                    return BadRequest("A cím megadása kötelező");
                if (node["text"] == null || string.IsNullOrEmpty(node["text"].ToString()))
                    return BadRequest("A szöveg megadása kötelező");
                var fileModel = node["image"];
                if (fileModel == null)
                    return BadRequest("Nem töltött fel képet");

                var fileName = fileModel["fileName"]?.GetValue<string>();
                var base64 = fileModel["file"]?.GetValue<string>();
                if (fileName == null || base64 == null)
                    return BadRequest(new { message = $"Hibás paraméterezés a feltöltött képben" });

                ImageModel image = FileHandling.SaveFile(Convert.FromBase64String(base64), fileName, filesPath);
                dbContext.Set<ImageModel>().Add(image);

                var item = dbContext.Set<NewsItemModel>().Add(new NewsItemModel()
                {
                    Title = node["title"].GetValue<string>(),
                    Text = node["text"].GetValue<string>(),
                    Date = date,
                    Picture = new PictureModel()
                    {
                        Alt = node["alt"]?.GetValue<string>() ?? "",
                        Href = node["href"]?.GetValue<string>() ?? "",
                        Image = image
                    }
                }); ;
                dbContext.SaveChanges();
                return GetNewsItem(item.Entity.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Hibás adat", debugMessage = ex.Message });
            }
        }

        [HttpPut("news")]
        public IActionResult ModifyNewsItem([FromBody] object requestBody)
        {
            try
            {
                var node = requestBody.Serialize<JsonNode>();
                if (node == null)
                    return BadRequest("Missing body");
                if (node["date"] == null || !DateTime.TryParse(node["date"].ToString(), out DateTime date))
                    return BadRequest("Dátum megadása kötelező");
                if (node["title"] == null || string.IsNullOrEmpty(node["title"].ToString()))
                    return BadRequest("A cím megadása kötelező");
                if (node["text"] == null || string.IsNullOrEmpty(node["text"].ToString()))
                    return BadRequest("A szöveg megadása kötelező");
                if (node["id"] == null)
                    return BadRequest("Nem adta meg a módosítandó hír azonosítóját");
                var fileModel = node["image"];
                if (fileModel == null)
                    return BadRequest("Nem töltött fel képet");

                var fileName = fileModel["fileName"]?.GetValue<string>();
                var base64 = fileModel["file"]?.GetValue<string>();
                if (fileName == null || base64 == null)
                    return BadRequest(new { message = $"Hibás paraméterezés a feltöltött képben" });

                var modelToModify = dbContext.Set<NewsItemModel>().Include(g => g.Picture).ThenInclude(p => p.Image).SingleOrDefault(g => g.Id == node["id"].GetValue<int>());
                if (modelToModify == null)
                    return BadRequest("Nem található a módosítandó elem");

                ImageModel imageToDelete = modelToModify.Picture.Image;
                ImageModel image = FileHandling.SaveFile(Convert.FromBase64String(base64), fileName, filesPath);
                dbContext.Set<ImageModel>().Add(image);

                modelToModify.Picture.Image = image;
                modelToModify.Picture.Alt = node["alt"]?.GetValue<string>() ?? "";
                modelToModify.Picture.Href = node["href"]?.GetValue<string>() ?? "";
                dbContext.Entry(modelToModify.Picture).State = EntityState.Modified;
                dbContext.Set<ImageModel>().Remove(imageToDelete);

                modelToModify.Date = date;
                modelToModify.Text = node["text"].GetValue<string>();
                modelToModify.Title = node["title"].GetValue<string>();
                dbContext.Entry(modelToModify).State = EntityState.Modified;

                dbContext.SaveChanges();
                return GetNewsItem(modelToModify.Id);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = "Hibás adat", debugMessage = ex.Message });
            }
        }

        [HttpDelete("news/{id}")]
        public IActionResult DeleteNewsItem([FromRoute] int id)
        {
            var model = dbContext.Set<NewsItemModel>().SingleOrDefault(p => p.Id == id);
            if (model == null)
                return BadRequest(new { message = "Az elem nem létezik" });

            dbContext.Set<NewsItemModel>().Remove(model);
            dbContext.SaveChanges();

            return Ok(new { success = true });
        }
        #endregion News
    }
}
