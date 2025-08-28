using HotelApp.Data;
using HotelApp.Models;
using Microsoft.AspNetCore.Mvc;

namespace HotelApp.Controllers
{
    [ApiController]
    [Route("api/v1/[controller]")]
    public class SmjestajController : ControllerBase
    {
        private readonly HotelContext _context;
        public SmjestajController(HotelContext context) {

            _context = context;
        }

        [HttpGet]
        public IActionResult Get()
        {
            try
            {
                return Ok(_context.Smjestaji);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }

        }

        [HttpGet("{sifra:int}")]
        public IActionResult Get(int sifra)
        {
            if (sifra <= 0)
            {
                return BadRequest(new { poruka = "Šifra mora biti veća od 0" });
            }

            try
            {
                var smjestaj = _context.Smjestaji.Find(sifra);

                if (smjestaj == null)
                {
                    return NotFound(new { poruka = $"Smještaj sa šifrom {sifra} nije pronađen." });
                }

                return Ok(smjestaj);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }



        [HttpPost]

        public IActionResult Post(Smjestaj smjestaj)
        {
            try
            {
                _context.Smjestaji.Add(smjestaj);
                _context.SaveChanges();
                return StatusCode(StatusCodes.Status201Created, smjestaj);
            }
            catch (Exception e)
            {
                return BadRequest(e);
            }
        }

        [HttpPut("{sifra:int}")]

        public IActionResult Put(int sifra, Smjestaj smjestaj)
        {
            if (sifra < 1)
            {
                return BadRequest(new { poruka = "Sifra mora biti veca od 0" });
            }
            try
            {
                Smjestaj s = _context.Smjestaji.Find(sifra);
                if (s == null) {
                    return NotFound();
                }
                s.Naziv = smjestaj.Naziv;
                s.Cijena = smjestaj.Cijena;
                s.DatumOd = smjestaj.DatumOd;
                s.DatumDo = smjestaj.DatumDo;
                s.Aktivan = smjestaj.Aktivan;

                _context.Smjestaji.Update(s);
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
                Smjestaj s = _context.Smjestaji.Find(sifra);
                if (s == null)
                {
                    return NotFound();
                }
                _context.Smjestaji.Remove(s);
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
