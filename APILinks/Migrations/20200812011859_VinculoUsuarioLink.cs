using Microsoft.EntityFrameworkCore.Migrations;

namespace APILinks.Migrations
{
    public partial class VinculoUsuarioLink : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Usuarios",
                maxLength: 200,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(200)",
                oldMaxLength: 200);

            migrationBuilder.AlterColumn<string>(
                name: "CPF",
                table: "Usuarios",
                maxLength: 11,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(11)",
                oldMaxLength: 11);

            migrationBuilder.AddColumn<int>(
                name: "UsuarioIdUsuario",
                table: "EnderecosLinks",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_EnderecosLinks_UsuarioIdUsuario",
                table: "EnderecosLinks",
                column: "UsuarioIdUsuario");

            migrationBuilder.AddForeignKey(
                name: "FK_EnderecosLinks_Usuarios_UsuarioIdUsuario",
                table: "EnderecosLinks",
                column: "UsuarioIdUsuario",
                principalTable: "Usuarios",
                principalColumn: "IdUsuario",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EnderecosLinks_Usuarios_UsuarioIdUsuario",
                table: "EnderecosLinks");

            migrationBuilder.DropIndex(
                name: "IX_EnderecosLinks_UsuarioIdUsuario",
                table: "EnderecosLinks");

            migrationBuilder.DropColumn(
                name: "UsuarioIdUsuario",
                table: "EnderecosLinks");

            migrationBuilder.AlterColumn<string>(
                name: "Nome",
                table: "Usuarios",
                type: "nvarchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 200,
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CPF",
                table: "Usuarios",
                type: "nvarchar(11)",
                maxLength: 11,
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 11,
                oldNullable: true);
        }
    }
}
