using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HMS_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class MissingTables : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "coctailbarsales",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    DateOfSales = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateOfPayment = table.Column<DateTime>(type: "TEXT", nullable: true),
                    CoctailId = table.Column<int>(type: "INTEGER", nullable: false),
                    GuestId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_coctailbarsales", x => x.Id);
                    table.ForeignKey(
                        name: "FK_coctailbarsales_coctails_CoctailId",
                        column: x => x.CoctailId,
                        principalTable: "coctails",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_coctailbarsales_guests_GuestId",
                        column: x => x.GuestId,
                        principalTable: "guests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "reservations",
                keyColumn: "Id",
                keyValue: 1,
                column: "CheckInTime",
                value: new DateTime(2024, 4, 11, 8, 30, 31, 32, DateTimeKind.Local).AddTicks(6827));

            migrationBuilder.CreateIndex(
                name: "IX_coctailbarsales_CoctailId",
                table: "coctailbarsales",
                column: "CoctailId");

            migrationBuilder.CreateIndex(
                name: "IX_coctailbarsales_GuestId",
                table: "coctailbarsales",
                column: "GuestId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "coctailbarsales");

            migrationBuilder.UpdateData(
                table: "reservations",
                keyColumn: "Id",
                keyValue: 1,
                column: "CheckInTime",
                value: new DateTime(2024, 4, 11, 7, 54, 11, 809, DateTimeKind.Local).AddTicks(8422));
        }
    }
}
