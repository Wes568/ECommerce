using ECommerce.Models;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Repositories.Interfaces
{
    public interface ICategoriaRepository
    {
        IEnumerable<Categoria> Categorias { get; }
        Categoria GetCategoriaById(int categoriaId);
        void Register(Categoria categoria);
        void Delete(Categoria categoria);
        void Update(Categoria categoria);
    }
}
