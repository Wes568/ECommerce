using ECommerce.Models;
using ECommerce.Repositories.Interfaces;
using ECommerce.Services;
using ECommerce.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Collections;
using System.IdentityModel.Tokens.Jwt;

namespace ECommerce.Controllers
{
    public class ProdutoController : Controller
    {
        private readonly IProdutoRepository _ProdutoRepository;

        public ProdutoController(IProdutoRepository ProdutoRepository)
        {
            _ProdutoRepository = ProdutoRepository;
        }

        public IActionResult ListByCategory(string category)
        {
            try
            {
                List<Produto> products;
                string currentCategory = string.Empty;

                if (string.IsNullOrEmpty(category))
                {
                    products = _ProdutoRepository.Produtos.OrderBy(l => l.ProdutoId).ToList();
                    currentCategory = "Todos os Produtos";
                }
                else
                {

                    products = _ProdutoRepository.Produtos
                            .Where(l => l.Categoria.Nome.Equals(category))
                            .OrderBy(c => c.Nome).ToList();
                    currentCategory = category;
                }

                var productsListViewModel = new ProdutoListViewModel
                {
                    Produtos = products,
                    CategoriaAtual = currentCategory
                };

                return Ok(new
                {
                    products = productsListViewModel,
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
                    errorMessage = ex.Message == "" ? ex.Message : "Erro ao listar produtos por categoria."
                });
            }

        }

        public IActionResult Details(int productId)
        {
            try
            {
                var product = _ProdutoRepository.Produtos.FirstOrDefault(l => l.ProdutoId == productId);

                return Ok(new
                {
                    product = product,
                    error = false,
                    errorMessage = ""

                });
            }
            catch (Exception ex)
            {
                return BadRequest(new
                {
                    product = "",
                    error = true,
                    errorMessage = ex.Message == "" ? ex.Message : "Erro ao encontrar produto."
                });
            }
        }

        public IActionResult Search(string searchString)
        {
            List<Produto> products;
            string currentCategory = string.Empty;

            try
            {
                if (string.IsNullOrEmpty(searchString))
                {
                    products = _ProdutoRepository.Produtos.OrderBy(p => p.ProdutoId).ToList();
                    currentCategory = "Todos os Produtos";
                }
                else
                {
                    products = _ProdutoRepository.Produtos
                        .Where(p => p.Nome.ToLower().Contains(searchString.ToLower())).ToList();

                    if (products.Any())
                        currentCategory = "Produtos";
                    else
                        currentCategory = "Nenhum Produto foi encontrado";

                }

                var productsListViewModel = new ProdutoListViewModel
                {
                    Produtos = products,
                    CategoriaAtual = currentCategory
                };

                return Ok(new
                {
                    products = productsListViewModel,
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
                    errorMessage = ex.Message == "" ? ex.Message : "Erro ao buscar produtos."
                });
            }

        }

        [AllowAnonymous]
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public IActionResult Register([FromBody] ProdutoViewModel produtoVM)
        {
            if (ModelState.IsValid)
            {

                Produto product = new Produto()
                {
                    Nome = produtoVM.Nome,
                    DescricaoCurta = produtoVM.DescricaoCurta,
                    DescricaoDetalhada = produtoVM.DescricaoDetalhada,
                    Preco = produtoVM.Preco,
                    ImagemUrl = produtoVM.ImagemUrl,
                    ImagemThumbnailUrl = produtoVM.ImagemThumbnailUrl,
                    IsProdutoPreferido = produtoVM.IsProdutoPreferido,
                    EmEstoque = produtoVM.EmEstoque,
                    CategoriaId = produtoVM.CategoriaId
                };

                _ProdutoRepository.Register(product);

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
                errorMessage = (errorMessages != null && errorMessages.Any()) ? errorMessages : new List<string> { "Erro desconhecido ao tentar registrar o produto!" }
            });

        }
    }
}
