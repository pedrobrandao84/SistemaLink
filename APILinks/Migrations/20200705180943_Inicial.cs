using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace APILinks.Migrations
{
    public partial class Inicial : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "EnderecosLinks",
                columns: table => new
                {
                    IdEnderecoLink = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Nome = table.Column<string>(maxLength: 100, nullable: false),
                    URL = table.Column<string>(maxLength: 200, nullable: false),
                    QTDClicks = table.Column<int>(nullable: false),
                    DTCriacao = table.Column<DateTime>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EnderecosLinks", x => x.IdEnderecoLink);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "EnderecosLinks");
        }
    }
}
