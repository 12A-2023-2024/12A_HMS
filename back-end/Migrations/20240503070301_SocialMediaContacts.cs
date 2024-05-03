using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HMS_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class SocialMediaContacts : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ContactModelId",
                table: "contactSocialmediaItems",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.UpdateData(
                table: "contactSocialmediaItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "ContactModelId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "contactSocialmediaItems",
                keyColumn: "Id",
                keyValue: 2,
                column: "ContactModelId",
                value: 1);

            migrationBuilder.UpdateData(
                table: "newsItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 5, 3, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "reservations",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CheckInTime", "FromDate", "ToDate" },
                values: new object[] { new DateTime(2024, 5, 3, 9, 3, 0, 970, DateTimeKind.Local).AddTicks(1013), new DateTime(2024, 5, 3, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 5, 5, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "reservations",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "FromDate", "ToDate" },
                values: new object[] { new DateTime(2024, 5, 13, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 5, 17, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "restaurantsales",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateOfPayment", "DateOfSales" },
                values: new object[] { new DateTime(2024, 5, 2, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 5, 1, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "restaurantsales",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateOfSales",
                value: new DateTime(2024, 5, 2, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "wellnesssales",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateOfPayment", "DateOfSales" },
                values: new object[] { new DateTime(2024, 5, 2, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 5, 1, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "wellnesssales",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateOfSales",
                value: new DateTime(2024, 5, 2, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.CreateIndex(
                name: "IX_contactSocialmediaItems_ContactModelId",
                table: "contactSocialmediaItems",
                column: "ContactModelId");

            migrationBuilder.AddForeignKey(
                name: "FK_contactSocialmediaItems_contact_ContactModelId",
                table: "contactSocialmediaItems",
                column: "ContactModelId",
                principalTable: "contact",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_contactSocialmediaItems_contact_ContactModelId",
                table: "contactSocialmediaItems");

            migrationBuilder.DropIndex(
                name: "IX_contactSocialmediaItems_ContactModelId",
                table: "contactSocialmediaItems");

            migrationBuilder.DropColumn(
                name: "ContactModelId",
                table: "contactSocialmediaItems");

            migrationBuilder.UpdateData(
                table: "newsItems",
                keyColumn: "Id",
                keyValue: 1,
                column: "Date",
                value: new DateTime(2024, 4, 11, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "reservations",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CheckInTime", "FromDate", "ToDate" },
                values: new object[] { new DateTime(2024, 4, 11, 8, 30, 31, 32, DateTimeKind.Local).AddTicks(6827), new DateTime(2024, 4, 11, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 4, 13, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "reservations",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "FromDate", "ToDate" },
                values: new object[] { new DateTime(2024, 4, 21, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 4, 25, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "restaurantsales",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateOfPayment", "DateOfSales" },
                values: new object[] { new DateTime(2024, 4, 10, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 4, 9, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "restaurantsales",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateOfSales",
                value: new DateTime(2024, 4, 10, 0, 0, 0, 0, DateTimeKind.Local));

            migrationBuilder.UpdateData(
                table: "wellnesssales",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "DateOfPayment", "DateOfSales" },
                values: new object[] { new DateTime(2024, 4, 10, 0, 0, 0, 0, DateTimeKind.Local), new DateTime(2024, 4, 9, 0, 0, 0, 0, DateTimeKind.Local) });

            migrationBuilder.UpdateData(
                table: "wellnesssales",
                keyColumn: "Id",
                keyValue: 2,
                column: "DateOfSales",
                value: new DateTime(2024, 4, 10, 0, 0, 0, 0, DateTimeKind.Local));
        }
    }
}
