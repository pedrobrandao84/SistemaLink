using Microsoft.EntityFrameworkCore.Migrations;

namespace APILinks.Migrations
{
    public partial class Usuario_Ativo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "STAtivo",
                table: "Usuarios",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "STAtivo",
                table: "Usuarios");
        }
    }
}
