using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace APILinks.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Grupos",
                columns: table => new
                {
                    IdGrupo = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    idEnderecoLink = table.Column<int>(nullable: false),
                    Nome = table.Column<string>(maxLength: 100, nullable: false),
                    URL = table.Column<string>(maxLength: 200, nullable: false),
                    QTDClicks = table.Column<int>(nullable: false),
                    DTCriacao = table.Column<DateTime>(nullable: false),
                    EnderecoLinkIdEnderecoLink = table.Column<int>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Grupos", x => x.IdGrupo);
                    table.ForeignKey(
                        name: "FK_Grupos_EnderecosLinks_EnderecoLinkIdEnderecoLink",
                        column: x => x.EnderecoLinkIdEnderecoLink,
                        principalTable: "EnderecosLinks",
                        principalColumn: "IdEnderecoLink",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Grupos_EnderecoLinkIdEnderecoLink",
                table: "Grupos",
                column: "EnderecoLinkIdEnderecoLink");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Grupos");
        }
    }
}
