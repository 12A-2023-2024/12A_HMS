using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HMS_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class images : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "images",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    OriginalFileName = table.Column<string>(type: "TEXT", nullable: false),
                    Path = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_images", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "images",
                columns: new[] { "Id", "OriginalFileName", "Path" },
                values: new object[,]
                {
                    { 1, "facebook.png", "/app/storage/F3/EC/F3EC45E63FFF1BA1A6E0F721C0A8B269CCA5C099.png" },
                    { 2, "instagram.png", "/app/storage/CA/B9/CAB97BBDC04925AA77ABAE6335ACA31DB3024FA4.png" },
                    { 3, "linkedin.png", "/app/storage/EF/A7/EFA7A2C2D2B7A716F793A3B251108E7439342963.png" },
                    { 4, "twitter.png", "/app/storage/2C/9D/2C9D210692C0321B19E99AA7C9FC63CF7A96541B.png" },
                    { 5, "youtube.png", "/app/storage/24/87/2487459838DBD7705DDD0F4C1913E506058E8C78.png" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "images");
        }
    }
}
