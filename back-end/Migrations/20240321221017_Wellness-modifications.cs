using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HMS_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Wellnessmodifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "wellnessproducts",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "wellnessproducts",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "wellnessproductcatatories",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "Active",
                table: "roomTypes",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateTable(
                name: "roomimages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoomTypeId = table.Column<int>(type: "INTEGER", nullable: false),
                    ImageId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roomimages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_roomimages_images_ImageId",
                        column: x => x.ImageId,
                        principalTable: "images",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_roomimages_roomTypes_RoomTypeId",
                        column: x => x.RoomTypeId,
                        principalTable: "roomTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "images",
                columns: new[] { "Id", "OriginalFileName", "Path" },
                values: new object[] { 9, "szoba-1.jpg", "/app/storage/files/43/5B/435B7CC2C23C7B07DB18CFAE2E1F01C51A5E1C2F.jpg" });

            migrationBuilder.UpdateData(
                table: "newsItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 3, 21, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "roomTypes",
                keyColumn: "Id",
                keyValue: 1,
                column: "Active",
                value: true);

            migrationBuilder.UpdateData(
                table: "wellnessproductcatatories",
                keyColumn: "Id",
                keyValue: 1,
                column: "Active",
                value: true);

            migrationBuilder.UpdateData(
                table: "wellnessproductcatatories",
                keyColumn: "Id",
                keyValue: 2,
                column: "Active",
                value: true);

            migrationBuilder.UpdateData(
                table: "wellnessproductcatatories",
                keyColumn: "Id",
                keyValue: 3,
                column: "Active",
                value: true);

            migrationBuilder.UpdateData(
                table: "wellnessproductcatatories",
                keyColumn: "Id",
                keyValue: 4,
                column: "Active",
                value: true);

            migrationBuilder.UpdateData(
                table: "wellnessproducts",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Active", "Description" },
                values: new object[] { true, "1 alkalmas finn szauna igénybevétel" });

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

            migrationBuilder.InsertData(
                table: "roomimages",
                columns: new[] { "Id", "ImageId", "RoomTypeId" },
                values: new object[] { 1, 9, 1 });

            migrationBuilder.CreateIndex(
                name: "IX_roomimages_ImageId",
                table: "roomimages",
                column: "ImageId");

            migrationBuilder.CreateIndex(
                name: "IX_roomimages_RoomTypeId",
                table: "roomimages",
                column: "RoomTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "roomimages");

            migrationBuilder.DeleteData(
                table: "images",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DropColumn(
                name: "Active",
                table: "wellnessproducts");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "wellnessproducts");

            migrationBuilder.DropColumn(
                name: "Active",
                table: "wellnessproductcatatories");

            migrationBuilder.DropColumn(
                name: "Active",
                table: "roomTypes");

            migrationBuilder.UpdateData(
                table: "newsItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 3, 7, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "wellnesssales",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateOfPayment", "DateOfSales" },
                values: new object[] { new DateTime(2024, 3, 6, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 3, 5, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "wellnesssales",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateOfSales",
                value: new DateTime(2024, 3, 6, 0, 0, 0, 0, DateTimeKind.Local));
        }
    }
}
