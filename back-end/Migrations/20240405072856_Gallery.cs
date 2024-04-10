using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HMS_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Gallery : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "gallery",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Order = table.Column<int>(type: "INTEGER", nullable: false),
                    PictureId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_gallery", x => x.Id);
                    table.ForeignKey(
                        name: "FK_gallery_pictures_PictureId",
                        column: x => x.PictureId,
                        principalTable: "pictures",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "reservations",
                keyColumn: "Id",
                keyValue: 1,
                column: "CheckInTime",
                value: new DateTime(2024, 4, 5, 9, 28, 56, 476, DateTimeKind.Local).AddTicks(6230));

            migrationBuilder.CreateIndex(
                name: "IX_gallery_PictureId",
                table: "gallery",
                column: "PictureId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "gallery");

            migrationBuilder.UpdateData(
                table: "reservations",
                keyColumn: "Id",
                keyValue: 1,
                column: "CheckInTime",
                value: new DateTime(2024, 4, 5, 8, 36, 54, 456, DateTimeKind.Local).AddTicks(3507));
        }
    }
}
