using ECommerce.Context;
using ECommerce.Models;

namespace ECommerce.Repositories
{
    public class AvaliacaoRepository
    {
        private readonly AppDbContext _context;
        public AvaliacaoRepository(AppDbContext context)
        {
            _context = context;
        }
        public IEnumerable<Avaliacao> Avaliacoes => _context.Avaliacoes;

        public Avaliacao GetAvaliacaoById(int avaliacaoId)
        {
            return _context.Avaliacoes.FirstOrDefault(l => l.AvaliacaoId == avaliacaoId);
        }

        public IEnumerable<Avaliacao> GetAvaliacoesByIdProduto(int produtoId)
        {
            return _context.Avaliacoes.Where(l => l.ProdutoId == produtoId);
        }

        public void Register(Avaliacao avaliacao)
        {
            _context.Avaliacoes.Add(avaliacao);
            _context.SaveChanges();
        }

        public void Delete(Avaliacao avaliacao)
        {
            _context.Avaliacoes.Remove(avaliacao);
            _context.SaveChanges();
        }

        public void Update(Avaliacao avaliacao)
        {
            _context.Avaliacoes.Update(avaliacao);
            _context.SaveChanges();
        }
    }
}
