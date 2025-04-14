using Azure.Identity;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ECommerce.Models
{
    [Table("Avaliacoes")]
    public class Avaliacao
    {
        [Key]
        public int AvaliacaoId { get; set; }
        public int ProdutoId { get; set; }
        public string RegisterUserId { get; set; }
        public string Username { get; set; }
        public int Nota { get; set; }
        public DateTime DataRegistro { get; set; }
        public DateTime DataAtualizacao { get; set; }
        public string Comentario { get; set; }

    }
}
