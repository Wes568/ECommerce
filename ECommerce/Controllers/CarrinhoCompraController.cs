using ECommerce.Models;
using ECommerce.Repositories.Interfaces;
using ECommerce.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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

        public IActionResult Index()
        {

            var itens = _carrinhoCompra.GetCarrinhoCompraItens();
            _carrinhoCompra.CarrinhoCompraItens = itens;

            var carrinhoCompraVM = new CarrinhoCompraViewModel
            {
                CarrinhoCompra = _carrinhoCompra,
                CarrinhoCompraTotal = _carrinhoCompra.GetCarrinhoCompraTotal()
            };

            return View(carrinhoCompraVM);

        }

        [Authorize]
        public IActionResult AdicionarItemNoCarrinhoCompra(int ProdutoId)
        {
            var Produtoselecionado = _ProdutoRepository.Produtos.FirstOrDefault(p => p.ProdutoId == ProdutoId);

            if(Produtoselecionado != null)
            {
                _carrinhoCompra.AdicionarAoCarrinho(Produtoselecionado);
            }

            return RedirectToAction("Index");
        }

        [Authorize]
        public IActionResult RemoverItemDoCarrinhoCompra(int ProdutoId)
        {
            var Produtoselecionado = _ProdutoRepository.Produtos.FirstOrDefault(p => p.ProdutoId == ProdutoId);

            if (Produtoselecionado != null)
            {
                _carrinhoCompra.RemoverDoCarrinho(Produtoselecionado);
            }

            return RedirectToAction("Index");
        }
    }
}
