using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace ECommerce.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Informe o login")]
        [Display(Name = "Usuário")]
        public string UserName { get; set; }

        [Required(ErrorMessage = "Informe a senha")]
        [DataType(DataType.Password)]
        [Display(Name = "Senha")]
        public string Password { get; set; } 
        public string ReturnUrl { get; set; }
    }
}
