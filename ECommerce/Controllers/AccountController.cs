using ECommerce.Services;
using ECommerce.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NuGet.Common;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ECommerce.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;
        private readonly TokenService _tokenService;

        public AccountController(UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signManager, IConfiguration configuration, TokenService tokenService)
        {
            _userManager = userManager;
            _signInManager = signManager;
            _configuration = configuration;
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Login([FromBody] LoginViewModel loginVM)
        {
            if (ModelState.IsValid)
            {

                var user = await _userManager.FindByNameAsync(loginVM.UserName);

                if (user != null)
                {
                    if (await _userManager.IsLockedOutAsync(user))
                        return BadRequest(new { error = true, errorMessage = "A conta está bloqueada." });

                    //if (!await _userManager.IsEmailConfirmedAsync(user))
                    //   return BadRequest(new { error = true, errorMessage = "O e-mail não foi confirmado." });

                    var result = await _signInManager.PasswordSignInAsync(user, loginVM.Password, false, false);

                    if (result.Succeeded)
                    {
                        var token = _tokenService.GenerateToken(user);

                        return Ok(new
                        {
                            user = user,
                            token = new JwtSecurityTokenHandler().WriteToken(token),
                            expiration = token.ValidTo,
                            error = false,
                            errorMessage = ""

                        });

                    }
                }
            }

            var errorMessages = ModelState.Values
            .SelectMany(state => state.Errors)
            .Select(errorMessages => errorMessages.ErrorMessage)
            .ToList();

            return BadRequest(new
            {
                user = "",
                token = "",
                expiration = "",
                error = true,
                errorMessage = (errorMessages != null && errorMessages.Any()) ? errorMessages : new List<string> { "Usuário não encontrado." }
            });
        }

        [AllowAnonymous]
        [HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Register([FromBody] RegisterViewModel registroVM)
        {
            if (ModelState.IsValid)
            {
                var user = new IdentityUser
                {
                    UserName = registroVM.UserName,
                    Email = registroVM.Email
                };

                var result = await _userManager.CreateAsync(user, registroVM.Password);

                if (result.Succeeded)
                {
                    var token = _tokenService.GenerateToken(user);

                    return Ok(new
                    {
                        user = user,
                        token = new JwtSecurityTokenHandler().WriteToken(token),
                        expiration = token.ValidTo,
                        error = false,
                        errorMessage = ""

                    });
                }
            }

            var errorMessages = ModelState.Values
                .SelectMany(state => state.Errors)
                .Select(errorMessages => errorMessages.ErrorMessage)
                .ToList();

            return BadRequest(new
            {
                user = "",
                token = "",
                expiration = "",
                error = true,
                errorMessage = (errorMessages != null && errorMessages.Any()) ? errorMessages : new List<string> { "Nome de usuário indisponível." } //debugar qnd a senha nao conter caractere especial.
            });

        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> Logout()
        {
            try
            {
                HttpContext.Session.Clear();
                HttpContext.User = null;
                await _signInManager.SignOutAsync();

                return Ok(new
                {
                    error = false,
                    errorMessage = ""
                });
            }
            catch
            {
                return BadRequest(new
                {
                    error = true,
                    errorMessage = "Houve um erro para deslogar!"
                });
            }
        }

        [AllowAnonymous]
        [HttpPost]
        public async Task<IActionResult> GetUserByToken(string token)
        {
            try
            {
                var userName = _tokenService.GetUserIdFromTokenAsync(token);
                var user = await _userManager.FindByNameAsync(userName);

                return Ok(new
                {
                    user = user,
                    error = false,
                    errorMessage = ""
                });

            }
            catch (Exception ex)
            {

                return BadRequest(new
                {
                    user = "",
                    token = "",
                    expiration = "",
                    error = true,
                    errorMessage = "Usuário não encontrado... " + ex.Message
                });

            }



        }
    }

}
