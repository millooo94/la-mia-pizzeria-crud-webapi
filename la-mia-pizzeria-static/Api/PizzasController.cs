using la_mia_pizzeria_static.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

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
        public IActionResult GetPizzas([FromQuery] string? name, float? price)
        {
            var pizzas = _context.Pizzas
				.Include(p => p.Category)
				.Where(p=> (name == null && price == null) || (name != null && p.Name.ToLower().Contains(name.ToLower())) || (price != null && p.Price == Convert.ToUInt32(price)))
                .ToList();

			foreach (var pizza in pizzas) pizza.Category!.Pizzas = null;

			return Ok(pizzas);
        }

        [HttpGet("{id}")]
        public IActionResult GetPizza(int id)
        {
            var pizza = _context.Pizzas.FirstOrDefault(p => p.Id == id);

            if (pizza is null)
            {
                return NotFound();
            }

            return Ok(pizza);
        }

        [HttpPost]
        public IActionResult CreatePizza(Pizza pizza)
        {
            _context.Pizzas.Add(pizza);
            _context.SaveChanges();

            return Ok(pizza);
        }

        [HttpPut("{id}")]
        public IActionResult PutPizza(int id, [FromBody] Pizza pizza)
        {
            var savedPizza = _context.Pizzas.FirstOrDefault(p => p.Id == id);

            if (savedPizza is null)
            {
                return NotFound();
            }

            savedPizza.Name = pizza.Name;
            savedPizza.Description = pizza.Description;
            savedPizza.Price = pizza.Price;
            savedPizza.Img = pizza.Img;
            savedPizza.CategoryId = pizza.CategoryId;

            _context.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeletePizza(int id)
        {
            var savedPizza = _context.Pizzas.FirstOrDefault(p => p.Id == id);

            if (savedPizza is null)
            {
                return NotFound();
            }

            _context.Pizzas.Remove(savedPizza);
            _context.SaveChanges();

            return Ok();
        }
    }
}
