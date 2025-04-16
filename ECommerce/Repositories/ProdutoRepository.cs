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


        public Produto GetProdutoById(int produtoId)
        {
            return _context.Produtos.Include(c => c.Categoria).FirstOrDefault(l => l.ProdutoId == produtoId); ;
        }

        public void Register(Produto pedido)
        {
            _context.Produtos.Add(pedido);
            _context.SaveChanges();
        }

        public void Delete(Produto produto)
        {
            _context.Produtos.Remove(produto);
            _context.SaveChanges();
        }

        public void Update(Produto produto)
        {
            _context.Produtos.Update(produto);
            _context.SaveChanges();
        }
    }
}
