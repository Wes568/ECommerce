﻿using ECommerce.Models;
using ECommerce.Repositories.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ECommerce.Controllers
{
    public class PedidoController : Controller
    {
        private readonly IPedidoRepository _pedidoRepository;
        private readonly CarrinhoCompra _carrinhoCompra;

        public PedidoController(IPedidoRepository pedidoRepository,
            CarrinhoCompra carrinhoCompra)
        {
            _pedidoRepository = pedidoRepository;
            _carrinhoCompra = carrinhoCompra;
        }

        [Authorize]
        [HttpGet]
        public IActionResult Checkout()
        {
            return View();
        }

        [Authorize]
        [HttpPost]
        public IActionResult Checkout(Pedido pedido)
        {
            int totalItensPedido = 0;
            decimal precoTotalPedido = 0.0m;

            List<CarrinhoCompraItem> items = _carrinhoCompra.GetCarrinhoCompraItens();

            _carrinhoCompra.CarrinhoCompraItens = items;

            if(_carrinhoCompra.CarrinhoCompraItens.Count == 0)
            {
                ModelState.AddModelError("", "Seu carrinho esta vazio, que tal incluir um Produto?");
            }

            foreach(var item in items)
            {
                totalItensPedido += item.Quantidade;
                precoTotalPedido += (item.Produto.Preco * item.Quantidade);
            }

            pedido.TotalItensPedido = totalItensPedido;
            pedido.PedidoTotal = precoTotalPedido;

            if (ModelState.IsValid)
            {
                _pedidoRepository.CriarPedido(pedido);

                ViewBag.CheckoutCompletoMensagem = "Obrigado pelo seu pedido: )";
                ViewBag.TotalPedido = _carrinhoCompra.GetCarrinhoCompraTotal();

                _carrinhoCompra.LimparCarrinho();

                return View("~/Views/Pedido/CheckoutCompleto.cshtml", pedido);
            }

            return View(pedido);
        }

    }
}
