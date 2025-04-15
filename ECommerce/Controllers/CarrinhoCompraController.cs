using ECommerce.Models;
using ECommerce.Repositories.Interfaces;
using ECommerce.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ECommerce.Controllers
{
    public class CarrinhoCompraController : Controller
    {
        private readonly IProdutoRepository _ProdutoRepository;
        private readonly CarrinhoCompra _carrinhoCompra;

        public CarrinhoCompraController(IProdutoRepository ProdutoRepository, CarrinhoCompra carrinhoCompra)
        {
            _ProdutoRepository = ProdutoRepository;
            _carrinhoCompra = carrinhoCompra;
        }

        [Authorize]
        public IActionResult GetCarrinho()
        {

            try
            {
                var itens = _carrinhoCompra.GetCarrinhoCompraItens();

                var carrinhoCompraVM = new CarrinhoCompraViewModel
                {
                    CarrinhoCompra = _carrinhoCompra,
                    RegisterUserId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value,
                    CarrinhoCompraTotal = _carrinhoCompra.GetCarrinhoCompraTotal()
                };

                return Ok(new
                {
                    carrinho = carrinhoCompraVM,
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
                    errorMessage = ex.Message == "" ? ex.Message : "Erro ao obter itens do carrinho."
                });
            }
        }

        [HttpPost]
        public IActionResult AdicionarItemNoCarrinhoCompra([FromBody] int produtoId)
        {

            try
            {
                var produtoselecionado = _ProdutoRepository.Produtos.FirstOrDefault(p => p.ProdutoId == produtoId);

                if (produtoselecionado != null)
                    _carrinhoCompra.AdicionarAoCarrinho(produtoselecionado);

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
                    errorMessage = ex.Message == "" ? ex.Message : "Erro ao adicionar item ao carrinho."
                });
            }
        }

        [HttpPost]
        public IActionResult RemoverItemDoCarrinhoCompra([FromBody] int produtoId)
        {

            try
            {
                var produtoselecionado = _ProdutoRepository.Produtos.FirstOrDefault(p => p.ProdutoId == produtoId);

                if (produtoselecionado != null)
                {
                    _carrinhoCompra.RemoverDoCarrinho(produtoselecionado);
                }

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
                    errorMessage = ex.Message == "" ? ex.Message : "Erro ao remover item do carrinho."
                });
            }
        }
    }
}
