﻿using ECommerce.Models;

namespace ECommerce.ViewModels
{
    public class CarrinhoCompraViewModel
    {
        public CarrinhoCompra CarrinhoCompra { get; set; }
        public string RegisterUserId {  get; set; }
        public decimal CarrinhoCompraTotal { get; set; }
    }
}
