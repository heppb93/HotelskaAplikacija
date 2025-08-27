using System.ComponentModel.DataAnnotations.Schema;
using System.Text.RegularExpressions;

namespace HotelApp.Models
{
    public class Smjestaj : Entitet
    {
     
        public string? Naziv { get; set; }

        public decimal? Cijena { get; set; }

        public DateTime? DatumOd { get; set; }

        public DateTime? DatumDo { get; set; }


        public bool? Aktivan { get; set; }
    }
}

