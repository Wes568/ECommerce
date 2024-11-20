using ECommerce.Models;
using NuGet.Common;
using System.Collections;
using System.Reflection.Metadata.Ecma335;

namespace ECommerce.ViewModels
{
    public class HomeViewModel
    {
        public IEnumerable<Produto> ProdutosPreferidos { get; set; }  
    }
}
