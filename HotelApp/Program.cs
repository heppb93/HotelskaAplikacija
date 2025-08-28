using HotelApp.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<HotelContext>(opcije => opcije.UseSqlServer(builder.Configuration.GetConnectionString("HotelContext")));
builder.Services.AddCors(o =>
{
    o.AddPolicy("CorsPolicy", p =>
    {
        p.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
    
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwagger();
    app.UseSwaggerUI(opcije => {
        opcije.ConfigObject.AdditionalItems.Add("requestSnippetsEnabled", true);
        opcije.EnableTryItOutByDefault();
        opcije.DocExpansion(Swashbuckle.AspNetCore.SwaggerUI.DocExpansion.None);
    });
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
app.UseCors("CorsPolicy");

app.Run();
