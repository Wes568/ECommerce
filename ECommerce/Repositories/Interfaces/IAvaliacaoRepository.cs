using ECommerce.Models;

namespace ECommerce.Repositories.Interfaces
{
    public interface IAvaliacaoRepository
    {
        IEnumerable<Avaliacao> Avaliacoes { get; }
        IEnumerable<Avaliacao> GetAvaliacoesByIdProduto(int produtoId);
        public Avaliacao GetAvaliacaoById(int avaliacaoId);
        void Register(Avaliacao avaliacao);
        void Delete(Avaliacao avaliacao);
        void Update(Avaliacao avaliacao);
    }
}
