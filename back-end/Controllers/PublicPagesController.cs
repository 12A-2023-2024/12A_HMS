using HMS_WebAPI.Extensions;
using HMS_WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HMS_WebAPI.Controllers
{
    [Route("publicpages")]
    [ApiController]
    public class PublicPagesController : ControllerBase
    {
        private readonly HMSContext dbContext;
        private readonly string filesPath;
        private readonly IConfiguration configuration;

        public PublicPagesController(HMSContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            this.configuration = configuration;
            filesPath = configuration.GetValue<string>("filespath") ?? "/app/storage/files";
        }

        [HttpGet("roomparameters")]
        public IActionResult GetRoomParameters()
        {
            return new RoomsController(this.dbContext, configuration).GetRoomParameters();
        }

        [HttpGet("roomtypes")]
        public IActionResult GetRoomTypes() 
        { 
            return new RoomsController(this.dbContext, configuration).GetRoomTypes(true);
        }

        [HttpGet("wellnessproducts")]
        public IActionResult GetWellnessProducts()
        {
            return new WellnessController(this.dbContext, configuration).GetWellnessProducts();
        }

        [HttpGet("menuitems")]
        public IActionResult GetMenuItems()
        {
            return new RestaurantController(this.dbContext, configuration).GetMenuItems();
        }

        [HttpGet("coctails")]
        public IActionResult GetCoctails()
        {
            return new CoctailbarController(this.dbContext, configuration).GetCoctails();
        }

        [HttpGet("gallery")]
        public IActionResult GetGallery()
        {
            return new AboutController(this.dbContext, configuration).GetGallery();
        }

        [HttpGet("news")]
        public IActionResult GetNews()
        {
            return new AboutController(this.dbContext, configuration).GetNews();
        }

        [HttpGet("introduction")]
        public IActionResult GetIntroduction()
        {
            return new AboutController(this.dbContext, configuration).GetIntroductions();
        }


        [HttpPost("/test/uploadasform")]
        public IActionResult UploadPictureToGalleryAsForm([FromForm] List<IFormFile> file, [FromForm] string? text)
        {
            var f = file.First();
            System.IO.Directory.CreateDirectory(filesPath);
            using (Stream fileStream = new FileStream(System.IO.Path.Combine(filesPath, f.FileName), FileMode.Create))
            {
                f.CopyTo(fileStream);
            }

            return Ok(new
            {
                f.FileName
            });
        }

        [HttpPost("/test/uploadasbase64")]
        public IActionResult UploadPictureToGalleryAsBase64([FromBody] dynamic data)
        {
            var model = System.Text.Json.JsonSerializer
                   .Deserialize<FileUploadTestModel>(
                    data.ToString(),
                    new System.Text.Json.JsonSerializerOptions()
                    {
                        PropertyNameCaseInsensitive = true,
                        NumberHandling = System.Text.Json.Serialization.JsonNumberHandling.AllowReadingFromString
                    }
                );

            ImageModel image = FileHandling.SaveFile(Convert.FromBase64String(model.File), model.FileName, filesPath);
            dbContext.Set<ImageModel>().Add(image);
            dbContext.SaveChanges();

            return Ok(new
            {
                imageUrl = image.ImageUrl
            });
        }
    }

    public class FileUploadTestModel
    {
        public required string File { get; set; }
        public required string FileName { get; set; }
        public string? Text { get; set; }
    }
}
