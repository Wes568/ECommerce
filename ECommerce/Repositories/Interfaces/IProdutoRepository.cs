using ECommerce.Models;

namespace ECommerce.Repositories.Interfaces
{
    public interface IProdutoRepository
    {
        IEnumerable<Produto> Produtos { get; }    
        IEnumerable<Produto> ProdutosPreferidos { get; }
        Produto GetProdutoById(int ProdutoId);
        void Register(Produto pedido);
    }
}
