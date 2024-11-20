using ECommerce.Models;
using ECommerce.Repositories.Interfaces;
using ECommerce.ViewModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections;

namespace ECommerce.Controllers
{
    public class ProdutoController : Controller
    {
        private readonly IProdutoRepository _ProdutoRepository;

        public ProdutoController(IProdutoRepository ProdutoRepository)
        {
            _ProdutoRepository = ProdutoRepository;
        }

        public IActionResult List(string categoria)
        {
            IEnumerable<Produto> Produtos;
            string categoriaAtual = string.Empty;

            if (string.IsNullOrEmpty(categoria))
            {
                Produtos = _ProdutoRepository.Produtos.OrderBy(l => l.ProdutoId);
                categoriaAtual = "Todos os Produtos";
            }
            else
            { 

                Produtos = _ProdutoRepository.Produtos
                        .Where(l => l.Categoria.Nome.Equals(categoria))
                        .OrderBy(c => c.Nome);
                categoriaAtual = categoria;
            }

            var ProdutosListViewModel = new ProdutoListViewModel
            {
                Produtos = Produtos,
                CategoriaAtual = categoriaAtual
            };

            return View(ProdutosListViewModel);
        }

        public IActionResult Details (int ProdutoId)
        {
            var Produto = _ProdutoRepository.Produtos.FirstOrDefault(l => l.ProdutoId == ProdutoId);
            return View(Produto);
        }

        public ViewResult Search(string searchString)
        {
            IEnumerable<Produto> Produtos;
            string categoriaAtual = string.Empty;

            if(string.IsNullOrEmpty(searchString))
            {
                Produtos = _ProdutoRepository.Produtos.OrderBy(p => p.ProdutoId);
                categoriaAtual = "Todos os Produtos";
            }
            else
            {
                Produtos = _ProdutoRepository.Produtos
                    .Where(p => p.Nome.ToLower().Contains(searchString.ToLower()));

                if (Produtos.Any())
                    categoriaAtual = "Produtos";
                else
                    categoriaAtual = "Nenhum Produto foi encontrado";
            
            }

            return View("~/Views/Produto/List.cshtml", new ProdutoListViewModel
            {
                Produtos = Produtos,
                CategoriaAtual = categoriaAtual
            });
        }
    }
}
