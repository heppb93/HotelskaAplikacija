using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace HotelApp.Models
{
    public class Rezervacija : Entitet
    {
    
        public string? Ime { get; set; }

        public string? Prezime { get; set; }

        public string? Email { get; set; }


        [ForeignKey("smjestaj")]
        public required Smjestaj Smjestaj { get; set; }



    }
}
