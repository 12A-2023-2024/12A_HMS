using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HMS_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Publicpages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "contact",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Telephone = table.Column<string>(type: "TEXT", nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    PostalCode = table.Column<string>(type: "TEXT", nullable: false),
                    City = table.Column<string>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: false),
                    TaxNumber = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_contact", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "contactSocialmediaItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    SocialUrl = table.Column<string>(type: "TEXT", nullable: false),
                    IconId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_contactSocialmediaItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_contactSocialmediaItems_images_IconId",
                        column: x => x.IconId,
                        principalTable: "images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "pictures",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Alt = table.Column<string>(type: "TEXT", nullable: false),
                    Href = table.Column<string>(type: "TEXT", nullable: false),
                    ImageId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_pictures", x => x.Id);
                    table.ForeignKey(
                        name: "FK_pictures_images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "galleryItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    PictureId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_galleryItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_galleryItems_pictures_PictureId",
                        column: x => x.PictureId,
                        principalTable: "pictures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "introductionItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Text = table.Column<string>(type: "TEXT", nullable: false),
                    Section = table.Column<string>(type: "TEXT", nullable: false),
                    PictureId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_introductionItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_introductionItems_pictures_PictureId",
                        column: x => x.PictureId,
                        principalTable: "pictures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "newsItems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Date = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Title = table.Column<string>(type: "TEXT", nullable: false),
                    Text = table.Column<string>(type: "TEXT", nullable: false),
                    PictureId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_newsItems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_newsItems_pictures_PictureId",
                        column: x => x.PictureId,
                        principalTable: "pictures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "contact",
                columns: new[] { "Id", "Address", "City", "Email", "PostalCode", "TaxNumber", "Telephone" },
                values: new object[] { 1, "Szent István út 7.", "Győr", "hotel@jedlik.cloud", "9021", "12345678-1-12", "06-90-123456" });

            migrationBuilder.InsertData(
                table: "contactSocialmediaItems",
                columns: new[] { "Id", "IconId", "Name", "SocialUrl" },
                values: new object[,]
                {
                    { 1, 1, "Facebook", "https://www.facebook.com/jedlikanyostechnikum" },
                    { 2, 5, "Youtube", "https://www.youtube.com/@jedlikanyostechnikum_9189" }
                });

            migrationBuilder.InsertData(
                table: "images",
                columns: new[] { "Id", "OriginalFileName", "Path" },
                values: new object[] { 6, "gyor-latkep.jpg", "/app/storage/files/BF/33/BF33F8E14361B2A8E2FD12B41EB24AF317833D08.jpg" });

            migrationBuilder.InsertData(
                table: "pictures",
                columns: new[] { "Id", "Alt", "Href", "ImageId" },
                values: new object[] { 1, "Győri látkép", "https://hu.wikipedia.org/wiki/Gy%C5%91r", 6 });

            migrationBuilder.InsertData(
                table: "galleryItems",
                columns: new[] { "Id", "PictureId" },
                values: new object[] { 1, 1 });

            migrationBuilder.InsertData(
                table: "introductionItems",
                columns: new[] { "Id", "PictureId", "Section", "Text" },
                values: new object[] { 1, 1, "Fejrész", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nisl tellus, suscipit sit amet placerat et, varius et velit. Aliquam vel eros non nulla sagittis tempus quis convallis lorem. Duis at enim sed diam commodo iaculis. Vestibulum aliquam justo at nibh tempor, eget aliquam felis pellentesque. Suspendisse a nunc quis velit rhoncus dignissim ac a ligula. Praesent a sagittis tortor, et bibendum mi. Pellentesque eget hendrerit erat, eget eleifend arcu. Nunc eleifend mollis quam sed semper." });

            migrationBuilder.InsertData(
                table: "newsItems",
                columns: new[] { "Id", "Date", "PictureId", "Text", "Title" },
                values: new object[] { 1, new DateTime(2024, 3, 7, 0, 0, 0, 0, DateTimeKind.Local), 1, "Proin finibus eget enim sed sodales. Duis iaculis sagittis mauris ac tincidunt. Mauris pellentesque gravida feugiat. Vestibulum vulputate, tellus eget volutpat viverra, dolor tellus accumsan dolor, ac semper sapien lacus a risus. Suspendisse potenti. Vestibulum maximus aliquet erat ac interdum. Mauris tempor mi ac mauris finibus, a egestas purus gravida. Duis pellentesque, purus sit amet porttitor lobortis, eros eros fringilla tellus, ut congue augue sem sed massa. Donec consequat aliquet est vitae tempus. Praesent mollis diam eu eros bibendum mollis. Integer feugiat metus sit amet tellus feugiat, sit amet rutrum libero facilisis. Morbi non neque ex. Sed sit amet tempus tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ", "Lorem Ipsum" });

            migrationBuilder.CreateIndex(
                name: "IX_contactSocialmediaItems_IconId",
                table: "contactSocialmediaItems",
                column: "IconId");

            migrationBuilder.CreateIndex(
                name: "IX_galleryItems_PictureId",
                table: "galleryItems",
                column: "PictureId");

            migrationBuilder.CreateIndex(
                name: "IX_introductionItems_PictureId",
                table: "introductionItems",
                column: "PictureId");

            migrationBuilder.CreateIndex(
                name: "IX_newsItems_PictureId",
                table: "newsItems",
                column: "PictureId");

            migrationBuilder.CreateIndex(
                name: "IX_pictures_ImageId",
                table: "pictures",
                column: "ImageId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "contact");

            migrationBuilder.DropTable(
                name: "contactSocialmediaItems");

            migrationBuilder.DropTable(
                name: "galleryItems");

            migrationBuilder.DropTable(
                name: "introductionItems");

            migrationBuilder.DropTable(
                name: "newsItems");

            migrationBuilder.DropTable(
                name: "pictures");

            migrationBuilder.DeleteData(
                table: "images",
                keyColumn: "Id",
                keyValue: 6);
        }
    }
}
