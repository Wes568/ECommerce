using ECommerce.Context;
using ECommerce.Models;
using ECommerce.Repositories.Interfaces;
using ECommerce.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Controllers
{
    public class CategoriaController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly ICategoriaRepository _CategoriaRepository;

        public CategoriaController(ICategoriaRepository CategoriaRepository, UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
            _CategoriaRepository = CategoriaRepository;
        }

        public IActionResult List()
        {
            try
            {
                List<Categoria> categorias;
                categorias = _CategoriaRepository.Categorias.OrderBy(l => l.CategoriaId).ToList();

                return Ok(new
                {
                    categorias,
                    error = false,
                    errorMessage = ""

                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    categorias = "",
                    error = true,
                    errorMessage = ex.Message == "" ? ex.Message : "Erro ao listar categorias."
                });
            }

        }

        public IActionResult Details(int categoriaId)
        {
            try
            {
                var categoria = _CategoriaRepository.GetCategoriaById(categoriaId);

                return Ok(new
                {
                    categoria = categoria,
                    error = false,
                    errorMessage = ""

                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    categoria = "",
                    error = true,
                    errorMessage = ex.Message == "" ? ex.Message : "Erro ao encontrar categoria."
                });
            }
        }

        public IActionResult Delete(int categoriaId)
        {
            try
            {
                Categoria categoria = _CategoriaRepository.GetCategoriaById(categoriaId);

                if (categoria != null)
                    _CategoriaRepository.Delete(categoria);

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
                    errorMessage = ex.Message == "" ? ex.Message : "Erro ao excluir produto."
                });
            }
        }

        public IActionResult Update([FromBody] CategoriaViewModel categoriaVM)
        {
            if (ModelState.IsValid)
            {
                Categoria categoria = new Categoria()
                {
                    Nome = categoriaVM.Nome,
                    Descricao = categoriaVM.Descricao,
                    RegisterUserId = _userManager.GetUserId(User),
                };

                if (categoria != null)
                    _CategoriaRepository.Update(categoria);

                return Ok(new
                {
                    categoria,
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

        //public IActionResult Search()
        //{
        //    return;

        //}

        //Categoria/ListCategoriasByUser
        public IActionResult ListProductsByUser()
        {
            try
            {
                List<Categoria> categorias;

                categorias = _CategoriaRepository.Categorias
                            .Where(l => l.RegisterUserId == _userManager.GetUserId(User))
                            .OrderBy(c => c.Nome).ToList();

                return Ok(new
                {
                    categorias,
                    error = false,
                    errorMessage = ""

                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    categorias = "",
                    error = true,
                    errorMessage = ex.Message == "" ? ex.Message : "Erro ao listar categorias por usuário."
                });
            }

        }

        [AllowAnonymous]
        [HttpPost]
        //[ValidateAntiForgeryToken]
        //Produto/Register
        public IActionResult Register([FromBody] CategoriaViewModel categoriaVM)
        {
            if (ModelState.IsValid)
            {

                Categoria categoria = new Categoria()
                {
                    Nome = categoriaVM.Nome,
                    Descricao = categoriaVM.Descricao,
                    RegisterUserId = categoriaVM.RegisterUserId,
                };

                _CategoriaRepository.Register(categoria);

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
                errorMessage = (errorMessages != null && errorMessages.Any()) ? errorMessages : new List<string> { "Erro desconhecido ao tentar registrar a categoria!" }
            });

        }
    }
}
