using ECommerce.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ECommerce.ViewModels
{
    public class ProdutoViewModel
    {
            public int ProdutoId { get; set; }

            [StringLength(80, MinimumLength = 5, ErrorMessage = "O {0} deve ter no mínimo {2} e no máximo {1} caracteres")]
            [Required(ErrorMessage = "Informe o nome do produto")]
            [Display(Name = "Nome do produto")]
            public string Nome { get; set; }

            [StringLength(200, MinimumLength = 20, ErrorMessage = "A {0} deve ter no mínimo {2} e no máximo {1} caracteres")]
            [Required(ErrorMessage = "Informe a descrição do produto")]
            [Display(Name = "Descrição do produto")]
            public string DescricaoCurta { get; set; }

            [StringLength(200, MinimumLength = 20, ErrorMessage = "A {0} deve ter no mínimo {2} e no máximo {1} caracteres")]
            [Required(ErrorMessage = "Informe a descrição detalhada do produto")]
            [Display(Name = "Descrição detalhada do produto")]
            public string DescricaoDetalhada { get; set; }

            [Required(ErrorMessage = "Informe o preço do Produto")]
            [Display(Name = "Preço")]
            [Column(TypeName = "decimal(10,2)")]
            [Range(1, 999.99, ErrorMessage = "O preço deve estar entre 1 e 999,99")]
            public decimal Preco { get; set; }

            [Display(Name = "Caminho imagem normal")]
            [StringLength(200, ErrorMessage = "O {0} deve ter no máximo {1} caracteres")]
            public string ImagemUrl { get; set; }

            [Display(Name = "Caminho imagem miniatura")]
            [StringLength(200, ErrorMessage = "O {0} deve ter no máximo {1} caracteres")]
            public string ImagemThumbnailUrl { get; set; }

            [Display(Name = "Preferido?")]
            public bool IsProdutoPreferido { get; set; }

            [Display(Name = "Estoque")]
            public bool EmEstoque { get; set; }
            public int CategoriaId { get; set; }
            public virtual Categoria Categoria { get; set; }
        
    }
}
