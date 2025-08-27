using System.ComponentModel.DataAnnotations;

namespace HotelApp.Models
{
    public abstract class Entitet
    {
        [Key]
        public int? Sifra { get; set; }
    }
}
