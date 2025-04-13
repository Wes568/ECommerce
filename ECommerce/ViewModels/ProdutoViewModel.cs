using ECommerce.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ECommerce.ViewModels
{
    public class ProdutoViewModel
    {
            public int ProdutoId { get; set; }
            public string Nome { get; set; }
            public string DescricaoCurta { get; set; }
            public string DescricaoDetalhada { get; set; }
            public decimal Preco { get; set; }
            public string ImagemUrl { get; set; }
            public string ImagemThumbnailUrl { get; set; }
            public bool IsProdutoPreferido { get; set; }
            public bool EmEstoque { get; set; }
            public string RegisterUserId { get; set; }
            public int CategoriaId { get; set; }
            public virtual Categoria Categoria { get; set; }
        
    }
}
