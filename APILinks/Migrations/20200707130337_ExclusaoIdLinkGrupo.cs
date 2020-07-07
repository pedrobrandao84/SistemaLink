using Microsoft.EntityFrameworkCore.Migrations;

namespace APILinks.Migrations
{
    public partial class ExclusaoIdLinkGrupo : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "idEnderecoLink",
                table: "Grupos");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "idEnderecoLink",
                table: "Grupos",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
