using la_mia_pizzeria_static.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace la_mia_pizzeria_static.Api
{
    [Route("api/")]
    [ApiController]
    public class PizzaDataController : ControllerBase
    {
        private readonly PizzaContext _context;

        public PizzaDataController(PizzaContext context)
        {
            _context = context;
        }

        [Route("category")]
        [HttpGet]
        public IActionResult GetCategories()
        {
            return Ok(_context.Categories.ToList());
        }

        [Route("ingredient")]
        [HttpGet]
        public IActionResult GetIngredients()
        {
            return Ok(_context.Ingredients.ToList());
        }
    }
}



