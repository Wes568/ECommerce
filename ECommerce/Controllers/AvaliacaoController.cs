using ECommerce.Models;
using ECommerce.Repositories.Interfaces;
using ECommerce.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Controllers
{
    public class AvaliacaoController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IAvaliacaoRepository _AvaliacaoRepository;

        public AvaliacaoController(IAvaliacaoRepository avaliacaoRepository, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _AvaliacaoRepository = avaliacaoRepository;
        }

        public IActionResult Delete(int avaliacaoId)
        {
            try
            {
                Avaliacao avaliacao = _AvaliacaoRepository.GetAvaliacaoById(avaliacaoId);

                if (avaliacao != null)
                    _AvaliacaoRepository.Delete(avaliacao);

                return Ok(new
                {
                    error = false,
                    errorMessage = ""

                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    error = true,
                    errorMessage = ex.Message == "" ? ex.Message : "Erro ao excluir avaliação."
                });
            }
        }

        public IActionResult Update([FromBody] AvaliacaoViewModel avaliacaoVM)
        {

            var avaliacao = _AvaliacaoRepository.GetAvaliacaoById(avaliacaoVM.AvaliacaoId);

            if (avaliacao == null)
                return BadRequest(new { error = true, errorMessage = "Avaliação Indisponível" });


            if (ModelState.IsValid)
            {
                avaliacao.Nota = avaliacaoVM.Nota;
                avaliacao.Comentario = avaliacaoVM.Comentario;
                avaliacao.DataAtualizacao = DateTime.Now;

                _AvaliacaoRepository.Update(avaliacao);

                return Ok(new
                {
                    avaliacao,
                    error = false,
                    errorMessage = ""

                });
            }

            var errorMessages = ModelState.Values
                .SelectMany(state => state.Errors)
                .Select(error => error.ErrorMessage)
                .ToList();

            return BadRequest(new
            {
                error = true,
                errorMessage = errorMessages
            });
        }

        public IActionResult ListAvaliacoesByProdutoId(int produtoId)
        {
            try
            {
                 var avaliacoes = _AvaliacaoRepository.GetAvaliacoesByIdProduto(produtoId);

                return Ok(new
                {
                    avaliacoes,
                    error = false,
                    errorMessage = ""

                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    products = "",
                    error = true,
                    errorMessage = ex.Message == "" ? ex.Message : "Erro ao listar avaliações por produto."
                });
            }

        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> Register([FromBody] AvaliacaoViewModel avaliacaoVM)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.GetUserAsync(User);

                if (user == null) return BadRequest(new { error = true, errorMessage = "Usuário não encontrado!" });

                Avaliacao avaliacao = new Avaliacao()
                {
                  ProdutoId = avaliacaoVM.ProdutoId,
                  RegisterUserId = avaliacaoVM.RegisterUserId,
                  Username = user.UserName,
                  Nota = avaliacaoVM.Nota,
                  DataRegistro = DateTime.Now,
                  DataAtualizacao = DateTime.Now,
                  Comentario = avaliacaoVM.Comentario,
                };

                _AvaliacaoRepository.Register(avaliacao);

                return Ok(new
                {
                    error = false,
                    errorMessage = ""

                });
            }

            var errorMessages = ModelState.Values
                .SelectMany(state => state.Errors)
                .Select(errorMessages => errorMessages.ErrorMessage)
                .ToList();

            return BadRequest(new
            {
                error = true,
                errorMessage = (errorMessages != null && errorMessages.Any()) ? errorMessages : new List<string> { "Erro desconhecido ao tentar registrar a avaliação!" }
            });

        }
    }
}
