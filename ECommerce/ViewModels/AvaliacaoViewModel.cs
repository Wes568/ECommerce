namespace ECommerce.ViewModels
{
    public class AvaliacaoViewModel
    {
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
