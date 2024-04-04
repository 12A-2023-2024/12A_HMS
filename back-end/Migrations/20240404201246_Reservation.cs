using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HMS_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Reservation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "rooms",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoomNumber = table.Column<string>(type: "TEXT", nullable: false),
                    Active = table.Column<bool>(type: "INTEGER", nullable: false),
                    RoomTypeId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_rooms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_rooms_roomTypes_RoomTypeId",
                        column: x => x.RoomTypeId,
                        principalTable: "roomTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "reservations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    FromDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    ToDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CheckInTime = table.Column<DateTime>(type: "TEXT", nullable: true),
                    CheckOutTime = table.Column<DateTime>(type: "TEXT", nullable: true),
                    Price = table.Column<decimal>(type: "TEXT", nullable: false),
                    PIN = table.Column<string>(type: "TEXT", nullable: true),
                    RoomId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_reservations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_reservations_rooms_RoomId",
                        column: x => x.RoomId,
                        principalTable: "rooms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "guestreservations",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ReservationId = table.Column<int>(type: "INTEGER", nullable: false),
                    GuestId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_guestreservations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_guestreservations_guests_GuestId",
                        column: x => x.GuestId,
                        principalTable: "guests",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_guestreservations_reservations_ReservationId",
                        column: x => x.ReservationId,
                        principalTable: "reservations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.UpdateData(
                table: "newsItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 4, 4, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "restaurantsales",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateOfPayment", "DateOfSales" },
                values: new object[] { new DateTime(2024, 4, 3, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 4, 2, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "restaurantsales",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateOfSales",
                value: new DateTime(2024, 4, 3, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.InsertData(
                table: "rooms",
                columns: new[] { "Id", "Active", "RoomNumber", "RoomTypeId" },
                values: new object[] { 1, true, "103", 1 });

            migrationBuilder.UpdateData(
                table: "wellnesssales",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateOfPayment", "DateOfSales" },
                values: new object[] { new DateTime(2024, 4, 3, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 4, 2, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "wellnesssales",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateOfSales",
                value: new DateTime(2024, 4, 3, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.InsertData(
                table: "reservations",
                columns: new[] { "Id", "CheckInTime", "CheckOutTime", "FromDate", "PIN", "Price", "RoomId", "ToDate" },
                values: new object[,]
                {
                    { 1, new DateTime(2024, 4, 4, 22, 12, 45, 553, DateTimeKind.Local).AddTicks(1557), null, new DateTime(2024, 4, 4, 0, 0, 0, 0, DateTimeKind.Local), "123456", 12999m, 1, new DateTime(2024, 4, 6, 0, 0, 0, 0, DateTimeKind.Local) },
                    { 2, null, null, new DateTime(2024, 4, 14, 0, 0, 0, 0, DateTimeKind.Local), "112233", 12999m, 1, new DateTime(2024, 4, 18, 0, 0, 0, 0, DateTimeKind.Local) }
                });

            migrationBuilder.InsertData(
                table: "guestreservations",
                columns: new[] { "Id", "GuestId", "ReservationId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 1, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_wellnessproducts_Name",
                table: "wellnessproducts",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_wellnessproductcatatories_Name",
                table: "wellnessproductcatatories",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_menuitems_Name",
                table: "menuitems",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_coctails_Name",
                table: "coctails",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_coctailcategories_Name",
                table: "coctailcategories",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_guestreservations_GuestId",
                table: "guestreservations",
                column: "GuestId");

            migrationBuilder.CreateIndex(
                name: "IX_guestreservations_ReservationId",
                table: "guestreservations",
                column: "ReservationId");

            migrationBuilder.CreateIndex(
                name: "IX_reservations_RoomId",
                table: "reservations",
                column: "RoomId");

            migrationBuilder.CreateIndex(
                name: "IX_rooms_RoomNumber",
                table: "rooms",
                column: "RoomNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_rooms_RoomTypeId",
                table: "rooms",
                column: "RoomTypeId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "guestreservations");

            migrationBuilder.DropTable(
                name: "reservations");

            migrationBuilder.DropTable(
                name: "rooms");

            migrationBuilder.DropIndex(
                name: "IX_wellnessproducts_Name",
                table: "wellnessproducts");

            migrationBuilder.DropIndex(
                name: "IX_wellnessproductcatatories_Name",
                table: "wellnessproductcatatories");

            migrationBuilder.DropIndex(
                name: "IX_menuitems_Name",
                table: "menuitems");

            migrationBuilder.DropIndex(
                name: "IX_coctails_Name",
                table: "coctails");

            migrationBuilder.DropIndex(
                name: "IX_coctailcategories_Name",
                table: "coctailcategories");

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
        }
    }
}
