using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HMS_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Wellness : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "galleryItems");

            migrationBuilder.CreateTable(
                name: "wellnessproductcatatories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_wellnessproductcatatories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "wellnessproducts",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    WellnessProductCatatoryId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_wellnessproducts", x => x.Id);
                    table.ForeignKey(
                        name: "FK_wellnessproducts_wellnessproductcatatories_WellnessProductCatatoryId",
                        column: x => x.WellnessProductCatatoryId,
                        principalTable: "wellnessproductcatatories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "wellnessproductimages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ImageId = table.Column<int>(type: "INTEGER", nullable: false),
                    WellnessProductId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_wellnessproductimages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_wellnessproductimages_images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_wellnessproductimages_wellnessproducts_WellnessProductId",
                        column: x => x.WellnessProductId,
                        principalTable: "wellnessproducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "wellnesssales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    DateOfSales = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateOfPayment = table.Column<DateTime>(type: "TEXT", nullable: true),
                    WellnessProductId = table.Column<int>(type: "INTEGER", nullable: false),
                    GuestId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_wellnesssales", x => x.Id);
                    table.ForeignKey(
                        name: "FK_wellnesssales_guests_GuestId",
                        column: x => x.GuestId,
                        principalTable: "guests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_wellnesssales_wellnessproducts_WellnessProductId",
                        column: x => x.WellnessProductId,
                        principalTable: "wellnessproducts",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "images",
                columns: new[] { "Id", "OriginalFileName", "Path" },
                values: new object[,]
                {
                    { 7, "szauna-1.jpg", "/app/storage/files/E9/67/E9671451232EDAB06D17512CB5273FF298619688.jpg" },
                    { 8, "szauna-2.jpg", "/app/storage/files/ED/14/ED14694497590D9202A9EF5CCE98E4F035F721C8.jpg" }
                });

            migrationBuilder.InsertData(
                table: "wellnessproductcatatories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Szépségápolás" },
                    { 2, "Masszázs" },
                    { 3, "Fürdő" },
                    { 4, "Szauna" }
                });

            migrationBuilder.InsertData(
                table: "wellnessproducts",
                columns: new[] { "Id", "Name", "Price", "WellnessProductCatatoryId" },
                values: new object[] { 1, "Finn aroma szauna - 1 alkalom", 7900m, 4 });

            migrationBuilder.InsertData(
                table: "wellnessproductimages",
                columns: new[] { "Id", "ImageId", "WellnessProductId" },
                values: new object[,]
                {
                    { 1, 7, 1 },
                    { 2, 8, 1 }
                });

            migrationBuilder.InsertData(
                table: "wellnesssales",
                columns: new[] { "Id", "DateOfPayment", "DateOfSales", "GuestId", "Price", "WellnessProductId" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 3, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 3, 5, 0, 0, 0, 0, DateTimeKind.Local), 1, 7900m, 1 },
                    { 2, null, new DateTime(2024, 3, 6, 0, 0, 0, 0, DateTimeKind.Local), 1, 7900m, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_wellnessproductimages_ImageId",
                table: "wellnessproductimages",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_wellnessproductimages_WellnessProductId",
                table: "wellnessproductimages",
                column: "WellnessProductId");

            migrationBuilder.CreateIndex(
                name: "IX_wellnessproducts_WellnessProductCatatoryId",
                table: "wellnessproducts",
                column: "WellnessProductCatatoryId");

            migrationBuilder.CreateIndex(
                name: "IX_wellnesssales_GuestId",
                table: "wellnesssales",
                column: "GuestId");

            migrationBuilder.CreateIndex(
                name: "IX_wellnesssales_WellnessProductId",
                table: "wellnesssales",
                column: "WellnessProductId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "wellnessproductimages");

            migrationBuilder.DropTable(
                name: "wellnesssales");

            migrationBuilder.DropTable(
                name: "wellnessproducts");

            migrationBuilder.DropTable(
                name: "wellnessproductcatatories");

            migrationBuilder.DeleteData(
                table: "images",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "images",
                keyColumn: "Id",
                keyValue: 8);

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

            migrationBuilder.InsertData(
                table: "galleryItems",
                columns: new[] { "Id", "PictureId" },
                values: new object[] { 1, 1 });

            migrationBuilder.CreateIndex(
                name: "IX_galleryItems_PictureId",
                table: "galleryItems",
                column: "PictureId");
        }
    }
}
