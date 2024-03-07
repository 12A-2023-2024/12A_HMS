using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace HMS_WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class RoomTypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "roomParameters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roomParameters", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "roomTypes",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: false),
                    PricePerNigthPerPerson = table.Column<decimal>(type: "TEXT", nullable: false),
                    Capacity = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roomTypes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "roomTypeParameters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    RoomTypeId = table.Column<int>(type: "INTEGER", nullable: false),
                    RoomParameterId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_roomTypeParameters", x => x.Id);
                    table.ForeignKey(
                        name: "FK_roomTypeParameters_roomParameters_RoomParameterId",
                        column: x => x.RoomParameterId,
                        principalTable: "roomParameters",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_roomTypeParameters_roomTypes_RoomTypeId",
                        column: x => x.RoomTypeId,
                        principalTable: "roomTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "roomParameters",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Kisállat bevihető" },
                    { 2, "Hűtőszekrény" }
                });

            migrationBuilder.InsertData(
                table: "roomTypes",
                columns: new[] { "Id", "Capacity", "Description", "Name", "PricePerNigthPerPerson" },
                values: new object[] { 1, 4, "Kétlégterű négyfős családi szoba", "4 fős családi szoba", 12999m });

            migrationBuilder.InsertData(
                table: "roomTypeParameters",
                columns: new[] { "Id", "RoomParameterId", "RoomTypeId" },
                values: new object[,]
                {
                    { 1, 1, 1 },
                    { 2, 2, 1 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_roomParameters_Name",
                table: "roomParameters",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_roomTypeParameters_RoomParameterId",
                table: "roomTypeParameters",
                column: "RoomParameterId");

            migrationBuilder.CreateIndex(
                name: "IX_roomTypeParameters_RoomTypeId",
                table: "roomTypeParameters",
                column: "RoomTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_roomTypes_Name",
                table: "roomTypes",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "roomTypeParameters");

            migrationBuilder.DropTable(
                name: "roomParameters");

            migrationBuilder.DropTable(
                name: "roomTypes");
        }
    }
}
