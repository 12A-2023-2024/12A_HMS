﻿// <auto-generated />
using System;
using HMS_WebAPI;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace HMS_WebAPI.Migrations
{
    [DbContext(typeof(HMSContext))]
    [Migration("20240307183034_images")]
    partial class images
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.2");

            modelBuilder.Entity("HMS_WebAPI.Models.GuestModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Citizenship")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateOfBirth")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PassportNumber")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PlaceOfBirth")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("PassportNumber")
                        .IsUnique();

                    b.ToTable("guests");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "Szent István út 7",
                            Citizenship = "magyar",
                            City = "Győr",
                            DateOfBirth = new DateTime(2000, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                            Name = "Vendég Béla",
                            PassportNumber = "123456AB",
                            PlaceOfBirth = "Győr",
                            PostalCode = "9001"
                        });
                });

            modelBuilder.Entity("HMS_WebAPI.Models.ImageModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("OriginalFileName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Path")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("images");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            OriginalFileName = "facebook.png",
                            Path = "./files\\F3\\EC\\F3EC45E63FFF1BA1A6E0F721C0A8B269CCA5C099.png"
                        },
                        new
                        {
                            Id = 2,
                            OriginalFileName = "instagram.png",
                            Path = "./files\\CA\\B9\\CAB97BBDC04925AA77ABAE6335ACA31DB3024FA4.png"
                        },
                        new
                        {
                            Id = 3,
                            OriginalFileName = "linkedin.png",
                            Path = "./files\\EF\\A7\\EFA7A2C2D2B7A716F793A3B251108E7439342963.png"
                        },
                        new
                        {
                            Id = 4,
                            OriginalFileName = "twitter.png",
                            Path = "./files\\2C\\9D\\2C9D210692C0321B19E99AA7C9FC63CF7A96541B.png"
                        },
                        new
                        {
                            Id = 5,
                            OriginalFileName = "youtube.png",
                            Path = "./files\\24\\87\\2487459838DBD7705DDD0F4C1913E506058E8C78.png"
                        });
                });

            modelBuilder.Entity("HMS_WebAPI.Models.RoleModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("roles");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "admin"
                        },
                        new
                        {
                            Id = 2,
                            Name = "reception"
                        },
                        new
                        {
                            Id = 3,
                            Name = "bar"
                        },
                        new
                        {
                            Id = 4,
                            Name = "wellness"
                        },
                        new
                        {
                            Id = 5,
                            Name = "restorant"
                        },
                        new
                        {
                            Id = 6,
                            Name = "account"
                        });
                });

            modelBuilder.Entity("HMS_WebAPI.Models.RoomParameterModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("roomParameters");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Kisállat bevihető"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Hűtőszekrény"
                        });
                });

            modelBuilder.Entity("HMS_WebAPI.Models.RoomTypeModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("Capacity")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<decimal>("PricePerNigthPerPerson")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Name")
                        .IsUnique();

                    b.ToTable("roomTypes");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Capacity = 4,
                            Description = "Kétlégterű négyfős családi szoba",
                            Name = "4 fős családi szoba",
                            PricePerNigthPerPerson = 12999m
                        });
                });

            modelBuilder.Entity("HMS_WebAPI.Models.RoomTypeParameterModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("RoomParameterId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("RoomTypeId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("RoomParameterId");

                    b.HasIndex("RoomTypeId");

                    b.ToTable("roomTypeParameters");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            RoomParameterId = 1,
                            RoomTypeId = 1
                        },
                        new
                        {
                            Id = 2,
                            RoomParameterId = 2,
                            RoomTypeId = 1
                        });
                });

            modelBuilder.Entity("HMS_WebAPI.Models.SessionModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("LastAccess")
                        .HasColumnType("TEXT");

                    b.Property<string>("Token")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("Token")
                        .IsUnique();

                    b.HasIndex("UserId");

                    b.ToTable("sessions");
                });

            modelBuilder.Entity("HMS_WebAPI.Models.UserModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("JobTitle")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("LoginName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PasswordHash")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("LoginName")
                        .IsUnique();

                    b.ToTable("users");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            JobTitle = "rendszergazda",
                            LoginName = "admin",
                            Name = "administrator",
                            PasswordHash = "+mhDhHFuHeMET3Sd4pau/cn8HfZCS89yojUwSYuppKc="
                        },
                        new
                        {
                            Id = 2,
                            JobTitle = "igazgató",
                            LoginName = "csak.otto",
                            Name = "Csák Ottó",
                            PasswordHash = "H7rWMBHQm9qZKbHvhrOGwEAfw0XAj3kY3lzSLoI+uB8="
                        },
                        new
                        {
                            Id = 3,
                            JobTitle = "recepciós",
                            LoginName = "varadi.nikoletta",
                            Name = "Váradi Nikoletta",
                            PasswordHash = "zQ26Ku+e1ZurG7XAyzgcEEvvkl07ZTdvFar2Uq8tcOU="
                        },
                        new
                        {
                            Id = 4,
                            JobTitle = "bármixer",
                            LoginName = "farkas.vilmos",
                            Name = "Farkas Vilmos",
                            PasswordHash = "erbR1BTveAC4DFaISzhJCJd+wA0aQUlbW46hlQ/1UYo="
                        },
                        new
                        {
                            Id = 5,
                            JobTitle = "pincér",
                            LoginName = "pinter.bea",
                            Name = "Pintér Bea",
                            PasswordHash = "yWzSCV3ynrhDCR7lzM4G/mZWLBRhtNqtA4Z6iTfwkQk="
                        });
                });

            modelBuilder.Entity("HMS_WebAPI.Models.UserRoleModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("RoleId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("UserId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("userroles");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            RoleId = 1,
                            UserId = 1
                        },
                        new
                        {
                            Id = 2,
                            RoleId = 1,
                            UserId = 2
                        },
                        new
                        {
                            Id = 3,
                            RoleId = 2,
                            UserId = 3
                        },
                        new
                        {
                            Id = 4,
                            RoleId = 3,
                            UserId = 4
                        },
                        new
                        {
                            Id = 5,
                            RoleId = 5,
                            UserId = 5
                        });
                });

            modelBuilder.Entity("HMS_WebAPI.Models.RoomTypeParameterModel", b =>
                {
                    b.HasOne("HMS_WebAPI.Models.RoomParameterModel", "RoomParameter")
                        .WithMany()
                        .HasForeignKey("RoomParameterId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HMS_WebAPI.Models.RoomTypeModel", "RoomType")
                        .WithMany("Parameters")
                        .HasForeignKey("RoomTypeId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("RoomParameter");

                    b.Navigation("RoomType");
                });

            modelBuilder.Entity("HMS_WebAPI.Models.SessionModel", b =>
                {
                    b.HasOne("HMS_WebAPI.Models.UserModel", "User")
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("HMS_WebAPI.Models.UserRoleModel", b =>
                {
                    b.HasOne("HMS_WebAPI.Models.RoleModel", "Role")
                        .WithMany("UserRoles")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HMS_WebAPI.Models.UserModel", "User")
                        .WithMany("UserRoles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Role");

                    b.Navigation("User");
                });

            modelBuilder.Entity("HMS_WebAPI.Models.RoleModel", b =>
                {
                    b.Navigation("UserRoles");
                });

            modelBuilder.Entity("HMS_WebAPI.Models.RoomTypeModel", b =>
                {
                    b.Navigation("Parameters");
                });

            modelBuilder.Entity("HMS_WebAPI.Models.UserModel", b =>
                {
                    b.Navigation("UserRoles");
                });
#pragma warning restore 612, 618
        }
    }
}
