using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HMS_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class Publicpagesmodifications : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Order",
                table: "introductionItems",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "introductionItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "Order",
                value: 1);

            migrationBuilder.UpdateData(
                table: "newsItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 4, 5, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "reservations",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CheckInTime", "FromDate", "ToDate" },
                values: new object[] { new DateTime(2024, 4, 5, 8, 36, 54, 456, DateTimeKind.Local).AddTicks(3507), new DateTime(2024, 4, 5, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 4, 7, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "reservations",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "FromDate", "ToDate" },
                values: new object[] { new DateTime(2024, 4, 15, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 4, 19, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "restaurantsales",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateOfPayment", "DateOfSales" },
                values: new object[] { new DateTime(2024, 4, 4, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 4, 3, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "restaurantsales",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateOfSales",
                value: new DateTime(2024, 4, 4, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "wellnesssales",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateOfPayment", "DateOfSales" },
                values: new object[] { new DateTime(2024, 4, 4, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 4, 3, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "wellnesssales",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateOfSales",
                value: new DateTime(2024, 4, 4, 0, 0, 0, 0, DateTimeKind.Local));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Order",
                table: "introductionItems");

            migrationBuilder.UpdateData(
                table: "newsItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 4, 4, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "reservations",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CheckInTime", "FromDate", "ToDate" },
                values: new object[] { new DateTime(2024, 4, 4, 22, 12, 45, 553, DateTimeKind.Local).AddTicks(1557), new DateTime(2024, 4, 4, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 4, 6, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "reservations",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "FromDate", "ToDate" },
                values: new object[] { new DateTime(2024, 4, 14, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 4, 18, 0, 0, 0, 0, DateTimeKind.Local) });

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
        }
    }
}
