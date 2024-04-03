using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HMS_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Restaurant : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "menucategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menucategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "menuitems",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false),
                    MenuCategoryId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menuitems", x => x.Id);
                    table.ForeignKey(
                        name: "FK_menuitems_menucategories_MenuCategoryId",
                        column: x => x.MenuCategoryId,
                        principalTable: "menucategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "menuimages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ImageId = table.Column<int>(type: "INTEGER", nullable: false),
                    MenuItemId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_menuimages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_menuimages_images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_menuimages_menuitems_MenuItemId",
                        column: x => x.MenuItemId,
                        principalTable: "menuitems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "restaurantsales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    DateOfSales = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateOfPayment = table.Column<DateTime>(type: "TEXT", nullable: true),
                    MenuItemId = table.Column<int>(type: "INTEGER", nullable: false),
                    GuestId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_restaurantsales", x => x.Id);
                    table.ForeignKey(
                        name: "FK_restaurantsales_guests_GuestId",
                        column: x => x.GuestId,
                        principalTable: "guests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_restaurantsales_menuitems_MenuItemId",
                        column: x => x.MenuItemId,
                        principalTable: "menuitems",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "images",
                columns: new[] { "Id", "OriginalFileName", "Path" },
                values: new object[] { 10, "husleves.jpg", "/app/storage/files/CE/A2/CEA2806130AA51D7746A8C0CF3D5536F7812F4FF.jpg" });

            migrationBuilder.InsertData(
                table: "menucategories",
                columns: new[] { "Id", "Active", "Name" },
                values: new object[,]
                {
                    { 1, true, "Előételek" },
                    { 2, true, "Főételek" }
                });

            migrationBuilder.UpdateData(
                table: "newsItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 3, 22, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "wellnesssales",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateOfPayment", "DateOfSales" },
                values: new object[] { new DateTime(2024, 3, 21, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 3, 20, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "wellnesssales",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateOfSales",
                value: new DateTime(2024, 3, 21, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.InsertData(
                table: "menuitems",
                columns: new[] { "Id", "Active", "Description", "MenuCategoryId", "Name", "Price" },
                values: new object[,]
                {
                    { 1, true, "Húsleves...", 1, "Húsleveles gazdagon", 1699m },
                    { 2, true, "A klasszikus...", 2, "Rántott szelet", 2899m }
                });

            migrationBuilder.InsertData(
                table: "menuimages",
                columns: new[] { "Id", "ImageId", "MenuItemId" },
                values: new object[] { 1, 10, 1 });

            migrationBuilder.InsertData(
                table: "restaurantsales",
                columns: new[] { "Id", "DateOfPayment", "DateOfSales", "GuestId", "MenuItemId", "Price" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 3, 21, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 3, 20, 0, 0, 0, 0, DateTimeKind.Local), 1, 1, 1699m },
                    { 2, null, new DateTime(2024, 3, 21, 0, 0, 0, 0, DateTimeKind.Local), 1, 2, 2899m }
                });

            migrationBuilder.CreateIndex(
                name: "IX_menucategories_Name",
                table: "menucategories",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_menuimages_ImageId",
                table: "menuimages",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_menuimages_MenuItemId",
                table: "menuimages",
                column: "MenuItemId");

            migrationBuilder.CreateIndex(
                name: "IX_menuitems_MenuCategoryId",
                table: "menuitems",
                column: "MenuCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_restaurantsales_GuestId",
                table: "restaurantsales",
                column: "GuestId");

            migrationBuilder.CreateIndex(
                name: "IX_restaurantsales_MenuItemId",
                table: "restaurantsales",
                column: "MenuItemId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "menuimages");

            migrationBuilder.DropTable(
                name: "restaurantsales");

            migrationBuilder.DropTable(
                name: "menuitems");

            migrationBuilder.DropTable(
                name: "menucategories");

            migrationBuilder.DeleteData(
                table: "images",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.UpdateData(
                table: "newsItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 3, 21, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "wellnesssales",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateOfPayment", "DateOfSales" },
                values: new object[] { new DateTime(2024, 3, 20, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 3, 19, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "wellnesssales",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateOfSales",
                value: new DateTime(2024, 3, 20, 0, 0, 0, 0, DateTimeKind.Local));
        }
    }
}
