using la_mia_pizzeria_static.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace la_mia_pizzeria_static.Api
{
    [Route("api/[controller]")]
    [ApiController]
    public class PizzasController : ControllerBase
    {
        private readonly PizzaContext _context;

        public PizzasController(PizzaContext context)
        {
            _context = context;   
        }

        [HttpGet]
        public IActionResult GetPizzas([FromQuery] string? name)
        {
            var pizzas = _context.Pizzas
                .Where(p => name == null || p.Name.ToLower().Contains(name.ToLower()))
                .ToList();

            return Ok(pizzas);
        }
    }
}
