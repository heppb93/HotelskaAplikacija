using HotelApp.Models;
using Microsoft.EntityFrameworkCore;


namespace HotelApp.Data
{
    public class HotelContext : DbContext
    {
        public HotelContext(DbContextOptions<HotelContext> option) : base(option)
        {
        }
        public DbSet<Smjestaj> Smjestaji { get; set; }
        public DbSet<Rezervacija> Rezervacije { get; set; }
        public DbSet<Operater> Operateri { get; set; }

    }
}
