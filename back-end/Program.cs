using HMS_WebAPI;
using HMS_WebAPI.Auth;
using Microsoft.AspNetCore.Authentication;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Configuration.SetBasePath(Directory.GetCurrentDirectory())
                     .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
                     .AddEnvironmentVariables();

builder.Services.AddControllers();
builder.Services.AddDbContext<HMSContext>(o =>
{
    o.UseSqlite(builder.Configuration.GetConnectionString("HMSDatabase"));
});
StaticValues.BaseUrl = builder.Configuration.GetValue<string>("BaseURL") ?? "https://hms.jedlik.cloud/";

builder.Services.AddAuthentication(options =>
{
    options.DefaultScheme = "TokenAuthentication";

}).AddScheme<AuthenticationSchemeOptions, AuthHandler>("TokenAuthentication", options => { });

builder.Services.AddCors(option =>
{
    option.AddPolicy("EnableCORS", builder =>
    {
        builder.SetIsOriginAllowed(origin => true)
            .AllowAnyMethod()
            .AllowAnyHeader()
            .WithExposedHeaders("X-Total-Count")
            .AllowCredentials()
            .Build();
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseCors("EnableCORS");
app.UseSwagger(c =>
{
    c.RouteTemplate = "swagger/{documentName}/swagger.json";
    c.PreSerializeFilters.Add((swagger, httpReq) =>
    {
        var oldPaths = swagger.Paths.ToDictionary(entry => entry.Key, entry => entry.Value);
        var routePath = app.Configuration.GetValue<string>("virtualdirectory");
        foreach (var path in oldPaths)
        {
            swagger.Paths.Remove(path.Key);
            swagger.Paths.Add($"{routePath}{path.Key}", path.Value);
        }
    });
});
app.UseSwaggerUI();

using (var scope = app.Services.CreateScope())
using (var context = scope.ServiceProvider.GetService<HMSContext>())
{
    context?.Database.Migrate();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
