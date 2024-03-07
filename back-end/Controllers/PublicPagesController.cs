using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HMS_WebAPI.Controllers
{
    [Route("publicpages")]
    [ApiController]
    public class PublicPagesController : ControllerBase
    {
        private readonly HMSContext dbContext;
        private readonly string filePath;

        public PublicPagesController(HMSContext dbContext, IConfiguration configuration)
        {
            this.dbContext = dbContext;
            filePath = configuration.GetValue<string>("filepath") ?? "/app/storage/files";
        }

        [HttpPost("gallery/uploadasform")]
        public IActionResult UploadPictureToGalleryAsForm([FromForm] List<IFormFile> file, [FromForm] string? text)
        {
            var f = file.First();
            System.IO.Directory.CreateDirectory(filePath);
            using (Stream fileStream = new FileStream(System.IO.Path.Combine(filePath, f.FileName), FileMode.Create))
            {
                f.CopyTo(fileStream);
            }

            return Ok(new
            {
                f.FileName
            });
        }

        [HttpPost("gallery/uploadasbase64")]
        public IActionResult UploadPictureToGalleryAsBase64([FromBody] FileUploadTestModel data)
        {
            System.IO.File.WriteAllBytes(System.IO.Path.Combine(filePath, data.FileName), Convert.FromBase64String(data.File));
            return Ok(new
            {
                data.FileName
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
