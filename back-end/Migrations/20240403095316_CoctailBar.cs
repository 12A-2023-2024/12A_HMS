using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HMS_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class CoctailBar : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "coctailcategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_coctailcategories", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "coctails",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false),
                    CoctailCategoryId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_coctails", x => x.Id);
                    table.ForeignKey(
                        name: "FK_coctails_coctailcategories_CoctailCategoryId",
                        column: x => x.CoctailCategoryId,
                        principalTable: "coctailcategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "coctailimages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ImageId = table.Column<int>(type: "INTEGER", nullable: false),
                    CoctailId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_coctailimages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_coctailimages_coctails_CoctailId",
                        column: x => x.CoctailId,
                        principalTable: "coctails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_coctailimages_images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "coctailcategories",
                columns: new[] { "Id", "Active", "Name" },
                values: new object[,]
                {
                    { 1, true, "Alkoholmentes" },
                    { 2, true, "Alkoholos" }
                });

            migrationBuilder.InsertData(
                table: "images",
                columns: new[] { "Id", "OriginalFileName", "Path" },
                values: new object[,]
                {
                    { 11, "mojito.jpg", "/app/storage/files/F6/52/F65207D984E489C6EE5C1DB3821BA31BECB826BA.jpg" },
                    { 12, "bloody-mary.jpg", "/app/storage/files/4A/76/4A769E1258DFC033D2222C846021A8186DEB140D.jpg" }
                });

            migrationBuilder.UpdateData(
                table: "newsItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 4, 3, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "restaurantsales",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateOfPayment", "DateOfSales" },
                values: new object[] { new DateTime(2024, 4, 2, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 4, 1, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "restaurantsales",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateOfSales",
                value: new DateTime(2024, 4, 2, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "wellnesssales",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateOfPayment", "DateOfSales" },
                values: new object[] { new DateTime(2024, 4, 2, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 4, 1, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "wellnesssales",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateOfSales",
                value: new DateTime(2024, 4, 2, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.InsertData(
                table: "coctails",
                columns: new[] { "Id", "Active", "CoctailCategoryId", "Description", "Name", "Price" },
                values: new object[,]
                {
                    { 1, true, 2, "A klasszikus mojito: rum, mentalevél, lime, citrom", "Mojito", 1899m },
                    { 2, true, 2, "Vodka, paradicsomlé, citrlomé, só, bors, worcestershire szósz", "Boody Mary", 1499m }
                });

            migrationBuilder.InsertData(
                table: "coctailimages",
                columns: new[] { "Id", "CoctailId", "ImageId" },
                values: new object[,]
                {
                    { 1, 1, 11 },
                    { 2, 2, 12 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_coctailimages_CoctailId",
                table: "coctailimages",
                column: "CoctailId");

            migrationBuilder.CreateIndex(
                name: "IX_coctailimages_ImageId",
                table: "coctailimages",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_coctails_CoctailCategoryId",
                table: "coctails",
                column: "CoctailCategoryId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "coctailimages");

            migrationBuilder.DropTable(
                name: "coctails");

            migrationBuilder.DropTable(
                name: "coctailcategories");

            migrationBuilder.DeleteData(
                table: "images",
                keyColumn: "Id",
                keyValue: 11);

            migrationBuilder.DeleteData(
                table: "images",
                keyColumn: "Id",
                keyValue: 12);

            migrationBuilder.UpdateData(
                table: "newsItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 3, 22, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "restaurantsales",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateOfPayment", "DateOfSales" },
                values: new object[] { new DateTime(2024, 3, 21, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 3, 20, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "restaurantsales",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateOfSales",
                value: new DateTime(2024, 3, 21, 0, 0, 0, 0, DateTimeKind.Local));

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
        }
    }
}
