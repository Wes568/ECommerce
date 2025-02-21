using ECommerce.Context;
using ECommerce.Models;
using ECommerce.Repositories.Interfaces;

namespace ECommerce.Repositories
{
    public class CategoriaRepository : ICategoriaRepository
    {
        private readonly AppDbContext _context;

        public CategoriaRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Categoria> Categorias => _context.Categorias;

        public Categoria GetCategoriaById(int categoriaId)
        {
            return _context.Categorias.FirstOrDefault(l => l.CategoriaId == categoriaId);
        }

        public void Register(Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            _context.SaveChanges();
        }

        public void Delete(Categoria categoria)
        {
            _context.Categorias.Remove(categoria);
            _context.SaveChanges();
        }

        public void Update(Categoria categoria)
        {
            _context.Categorias.Add(categoria);
            _context.SaveChanges();
        }
    }
}
