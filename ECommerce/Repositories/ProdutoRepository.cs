using ECommerce.Context;
using ECommerce.Models;
using ECommerce.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ECommerce.Repositories
{
    public class ProdutoRepository : IProdutoRepository
    {
        private readonly AppDbContext _context;
        public ProdutoRepository(AppDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Produto> Produtos => _context.Produtos.Include(c=> c.Categoria);

        public IEnumerable<Produto> ProdutosPreferidos => _context.Produtos.Where(c => c.IsProdutoPreferido).Include(c => c.Categoria);


        public Produto GetProdutoById(int ProdutoId)
        {
            return _context.Produtos.FirstOrDefault(l => l.ProdutoId == ProdutoId);
        }

        public void Register(Produto pedido)
        {
            _context.Produtos.Add(pedido);
            _context.SaveChanges();
        }
    }
}
