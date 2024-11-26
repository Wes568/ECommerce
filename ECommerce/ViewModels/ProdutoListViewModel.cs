using ECommerce.Models;
using System.Collections;

namespace ECommerce.ViewModels
{
    public class ProdutoListViewModel
    {
        public List<Produto> Produtos { get; set; }
        public string CategoriaAtual { get; set; }
    }
}
