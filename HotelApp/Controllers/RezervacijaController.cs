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
                _context.SaveChangesAsync();
                return StatusCode(StatusCodes.Status201Created, rezervacija);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("{sifra:int}")]

        public IActionResult Put(int sifra, Rezervacija rezervacija)
        {
            if (sifra < 1)
            {
                return BadRequest(new { poruka = "Sifra mora biti veca od 0" });
            }
            try
            {
                Rezervacija s = _context.Rezervacije.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                s.Ime = rezervacija.Ime;
                s.Prezime = rezervacija.Prezime;
                s.Email = rezervacija.Email;
          

                _context.Rezervacije.Update(s);
                _context.SaveChanges();
                return Ok(s);


            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }
        [HttpDelete("{sifra:int}")]
        public IActionResult Delete(int sifra)
        {
            if (sifra < 1)
            {
                return BadRequest(new { poruka = "Šifra mora biti veća od 0" });
            }
            try
            {
                Rezervacija s = _context.Rezervacije.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Rezervacije.Remove(s);
                _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }
    }
}
