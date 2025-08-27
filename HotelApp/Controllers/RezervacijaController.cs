using HotelApp.Data;
using HotelApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class RezervacijaController : ControllerBase
    {
        private readonly HotelContext _context;
        public RezervacijaController(HotelContext context)
        {

            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Rezervacije);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }
        [HttpPost]

        public IActionResult Post(Rezervacija rezervacija)
        {
            try
            {
                _context.Rezervacije.Add(rezervacija);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, rezervacija);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

    }
}
