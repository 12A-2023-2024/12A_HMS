using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HMS_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Guests : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "guests",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Address = table.Column<string>(type: "TEXT", nullable: false),
                    City = table.Column<string>(type: "TEXT", nullable: false),
                    PostalCode = table.Column<string>(type: "TEXT", nullable: false),
                    Citizenship = table.Column<string>(type: "TEXT", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "TEXT", nullable: false),
                    PlaceOfBirth = table.Column<string>(type: "TEXT", nullable: false),
                    PassportNumber = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_guests", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "guests",
                columns: new[] { "Id", "Address", "Citizenship", "City", "DateOfBirth", "Name", "PassportNumber", "PlaceOfBirth", "PostalCode" },
                values: new object[] { 1, "Szent István út 7", "magyar", "Győr", new DateTime(2000, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), "Vendég Béla", "123456AB", "Győr", "9001" });

            migrationBuilder.CreateIndex(
                name: "IX_guests_PassportNumber",
                table: "guests",
                column: "PassportNumber",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "guests");
        }
    }
}
