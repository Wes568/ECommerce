using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ECommerce.Migrations
{
    /// <inheritdoc />
    public partial class PopulandoCategorias : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        { 
              migrationBuilder.Sql("INSERT INTO Categorias(Nome, Descricao)" +
                        "VALUES('Normal', 'Produto comum')");

              migrationBuilder.Sql("INSERT INTO Categorias(Nome, Descricao)" +
                        "VALUES('Usado', 'Produto de segunda mão')");
        }

    /// <inheritdoc />
    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.Sql("DELETE FROM Categorias");
    }
}
}
