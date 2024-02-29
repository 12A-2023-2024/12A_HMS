using HMS_WebAPI.Models;
using Microsoft.EntityFrameworkCore;

namespace HMS_WebAPI
{
    public class HMSContext : DbContext
    {
        public DbSet<SessionModel> Sessions { get; set; }

        private string baseURL = "";
        private readonly byte[] salt;

        public HMSContext(DbContextOptions options, IConfiguration configuration) : base(options)
        {
            baseURL = configuration.GetValue<string>("BaseURL") ?? "";
            var saltBase64 = configuration.GetSection("Security").GetValue<string>("salt");
            if (string.IsNullOrEmpty(saltBase64))
            {
                throw new ArgumentNullException("Parameter is missing: salt");
            }
            salt = Convert.FromBase64String(saltBase64);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlite(@"Data Source=.\migration.db;Version=3;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserModel>().HasIndex(u => u.LoginName).IsUnique();
            modelBuilder.Entity<SessionModel>().HasIndex(e => e.Token).IsUnique();

            modelBuilder.Entity<UserModel>().HasData([
                new UserModel() { Id = 1, Name = "administrator", JobTitle = "rendszergazda", LoginName = "admin", PasswordHash = LoginRequestModel.HashPassword("admin", salt) },
                new UserModel() { Id = 2, Name = "Csák Ottó", JobTitle = "igazgató", LoginName = "csak.otto", PasswordHash = LoginRequestModel.HashPassword("ottó", salt) },
                new UserModel() { Id = 3, Name = "Váradi Nikoletta", JobTitle = "recepciós", LoginName = "varadi.nikoletta", PasswordHash = LoginRequestModel.HashPassword("nikoletta", salt) },
                new UserModel() { Id = 4, Name = "Farkas Vilmos", JobTitle = "bármixer", LoginName = "farkas.vilmos", PasswordHash = LoginRequestModel.HashPassword("vilmos", salt) },
                new UserModel() { Id = 5, Name = "Pintér Bea", JobTitle = "pincér", LoginName = "pinter.bea", PasswordHash = LoginRequestModel.HashPassword("bea", salt) },
            ]);

            modelBuilder.Entity<RoleModel>().HasData([
                new RoleModel() { Id = 1, Name= "admin"},
                new RoleModel() { Id = 2, Name= "reception"},
                new RoleModel() { Id = 3, Name= "bar"},
                new RoleModel() { Id = 4, Name= "wellness"},
                new RoleModel() { Id = 5, Name= "restorant"},
                new RoleModel() { Id = 6, Name= "account"}
            ]);

            modelBuilder.Entity<UserRoleModel>().HasData([
                new { Id = 1, UserId = 1, RoleId = 1 },
                new { Id = 2, UserId = 2, RoleId = 1 },
                new { Id = 3, UserId = 3, RoleId = 2 },
                new { Id = 4, UserId = 4, RoleId = 3 },
                new { Id = 5, UserId = 5, RoleId = 5 }
            ]);

        }

    }
}
