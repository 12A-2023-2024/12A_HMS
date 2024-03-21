using HMS_WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HMS_WebAPI.Controllers
{
    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly string filePath;
        private readonly HMSContext dbContext;

        public CommonController(IConfiguration configuration, HMSContext dbContext)
        {
            filePath = configuration.GetValue<string>("filespath") ?? "/app/storage/files";
            this.dbContext = dbContext;
        }

        [HttpGet("image/{id}")]
        public IActionResult GetImage(int id)
        {
            try
            {
                var image = dbContext.Set<ImageModel>().Single(i => i.Id == id);
                var content = System.IO.File.ReadAllBytes(image.Path);
                return File(content, "image/jpeg", image.OriginalFileName);
            }
            catch
            {
                return NotFound("Image not found");
            }
        }
    }
}
