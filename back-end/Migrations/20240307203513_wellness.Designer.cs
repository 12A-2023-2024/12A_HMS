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
    [Migration("20240307203513_wellness")]
    partial class wellness
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "8.0.2");

            modelBuilder.Entity("HMS_WebAPI.Models.ContactModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("PostalCode")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("TaxNumber")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Telephone")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("contact");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Address = "Szent István út 7.",
                            City = "Győr",
                            Email = "hotel@jedlik.cloud",
                            PostalCode = "9021",
                            TaxNumber = "12345678-1-12",
                            Telephone = "06-90-123456"
                        });
                });

            modelBuilder.Entity("HMS_WebAPI.Models.ContactSocialmediaItemModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("IconId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("SocialUrl")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("IconId");

                    b.ToTable("contactSocialmediaItems");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            IconId = 1,
                            Name = "Facebook",
                            SocialUrl = "https://www.facebook.com/jedlikanyostechnikum"
                        },
                        new
                        {
                            Id = 2,
                            IconId = 5,
                            Name = "Youtube",
                            SocialUrl = "https://www.youtube.com/@jedlikanyostechnikum_9189"
                        });
                });

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
                        },
                        new
                        {
                            Id = 6,
                            OriginalFileName = "gyor-latkep.jpg",
                            Path = "./files\\BF\\33\\BF33F8E14361B2A8E2FD12B41EB24AF317833D08.jpg"
                        },
                        new
                        {
                            Id = 7,
                            OriginalFileName = "szauna-1.jpg",
                            Path = "./files\\E9\\67\\E9671451232EDAB06D17512CB5273FF298619688.jpg"
                        },
                        new
                        {
                            Id = 8,
                            OriginalFileName = "szauna-2.jpg",
                            Path = "./files\\ED\\14\\ED14694497590D9202A9EF5CCE98E4F035F721C8.jpg"
                        });
                });

            modelBuilder.Entity("HMS_WebAPI.Models.IntroductionItemModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("PictureId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Section")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("PictureId");

                    b.ToTable("introductionItems");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            PictureId = 1,
                            Section = "Fejrész",
                            Text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nisl tellus, suscipit sit amet placerat et, varius et velit. Aliquam vel eros non nulla sagittis tempus quis convallis lorem. Duis at enim sed diam commodo iaculis. Vestibulum aliquam justo at nibh tempor, eget aliquam felis pellentesque. Suspendisse a nunc quis velit rhoncus dignissim ac a ligula. Praesent a sagittis tortor, et bibendum mi. Pellentesque eget hendrerit erat, eget eleifend arcu. Nunc eleifend mollis quam sed semper."
                        });
                });

            modelBuilder.Entity("HMS_WebAPI.Models.NewsItemModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Date")
                        .HasColumnType("TEXT");

                    b.Property<int>("PictureId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Text")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("PictureId");

                    b.ToTable("newsItems");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Date = new DateTime(2024, 3, 7, 0, 0, 0, 0, DateTimeKind.Local),
                            PictureId = 1,
                            Text = "Proin finibus eget enim sed sodales. Duis iaculis sagittis mauris ac tincidunt. Mauris pellentesque gravida feugiat. Vestibulum vulputate, tellus eget volutpat viverra, dolor tellus accumsan dolor, ac semper sapien lacus a risus. Suspendisse potenti. Vestibulum maximus aliquet erat ac interdum. Mauris tempor mi ac mauris finibus, a egestas purus gravida. Duis pellentesque, purus sit amet porttitor lobortis, eros eros fringilla tellus, ut congue augue sem sed massa. Donec consequat aliquet est vitae tempus. Praesent mollis diam eu eros bibendum mollis. Integer feugiat metus sit amet tellus feugiat, sit amet rutrum libero facilisis. Morbi non neque ex. Sed sit amet tempus tellus. Lorem ipsum dolor sit amet, consectetur adipiscing elit. ",
                            Title = "Lorem Ipsum"
                        });
                });

            modelBuilder.Entity("HMS_WebAPI.Models.PictureModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Alt")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Href")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("ImageId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ImageId");

                    b.ToTable("pictures");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Alt = "Győri látkép",
                            Href = "https://hu.wikipedia.org/wiki/Gy%C5%91r",
                            ImageId = 6
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

            modelBuilder.Entity("HMS_WebAPI.Models.WellnessProductCatatoryModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("wellnessproductcatatories");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Szépségápolás"
                        },
                        new
                        {
                            Id = 2,
                            Name = "Masszázs"
                        },
                        new
                        {
                            Id = 3,
                            Name = "Fürdő"
                        },
                        new
                        {
                            Id = 4,
                            Name = "Szauna"
                        });
                });

            modelBuilder.Entity("HMS_WebAPI.Models.WellnessProductImageModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ImageId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("WellnessProductId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ImageId");

                    b.HasIndex("WellnessProductId");

                    b.ToTable("wellnessproductimages");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ImageId = 7,
                            WellnessProductId = 1
                        },
                        new
                        {
                            Id = 2,
                            ImageId = 8,
                            WellnessProductId = 1
                        });
                });

            modelBuilder.Entity("HMS_WebAPI.Models.WellnessProductModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<decimal>("Price")
                        .HasColumnType("TEXT");

                    b.Property<int>("WellnessProductCatatoryId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("WellnessProductCatatoryId");

                    b.ToTable("wellnessproducts");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            Name = "Finn aroma szauna - 1 alkalom",
                            Price = 7900m,
                            WellnessProductCatatoryId = 4
                        });
                });

            modelBuilder.Entity("HMS_WebAPI.Models.WellnessSaleModel", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("DateOfPayment")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("DateOfSales")
                        .HasColumnType("TEXT");

                    b.Property<int>("GuestId")
                        .HasColumnType("INTEGER");

                    b.Property<decimal>("Price")
                        .HasColumnType("TEXT");

                    b.Property<int>("WellnessProductId")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("GuestId");

                    b.HasIndex("WellnessProductId");

                    b.ToTable("wellnesssales");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            DateOfPayment = new DateTime(2024, 3, 6, 0, 0, 0, 0, DateTimeKind.Local),
                            DateOfSales = new DateTime(2024, 3, 5, 0, 0, 0, 0, DateTimeKind.Local),
                            GuestId = 1,
                            Price = 7900m,
                            WellnessProductId = 1
                        },
                        new
                        {
                            Id = 2,
                            DateOfSales = new DateTime(2024, 3, 6, 0, 0, 0, 0, DateTimeKind.Local),
                            GuestId = 1,
                            Price = 7900m,
                            WellnessProductId = 1
                        });
                });

            modelBuilder.Entity("HMS_WebAPI.Models.ContactSocialmediaItemModel", b =>
                {
                    b.HasOne("HMS_WebAPI.Models.ImageModel", "Icon")
                        .WithMany()
                        .HasForeignKey("IconId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Icon");
                });

            modelBuilder.Entity("HMS_WebAPI.Models.IntroductionItemModel", b =>
                {
                    b.HasOne("HMS_WebAPI.Models.PictureModel", "Picture")
                        .WithMany()
                        .HasForeignKey("PictureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Picture");
                });

            modelBuilder.Entity("HMS_WebAPI.Models.NewsItemModel", b =>
                {
                    b.HasOne("HMS_WebAPI.Models.PictureModel", "Picture")
                        .WithMany()
                        .HasForeignKey("PictureId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Picture");
                });

            modelBuilder.Entity("HMS_WebAPI.Models.PictureModel", b =>
                {
                    b.HasOne("HMS_WebAPI.Models.ImageModel", "Image")
                        .WithMany()
                        .HasForeignKey("ImageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Image");
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

            modelBuilder.Entity("HMS_WebAPI.Models.WellnessProductImageModel", b =>
                {
                    b.HasOne("HMS_WebAPI.Models.ImageModel", "Image")
                        .WithMany()
                        .HasForeignKey("ImageId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HMS_WebAPI.Models.WellnessProductModel", "WellnessProduct")
                        .WithMany("Images")
                        .HasForeignKey("WellnessProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Image");

                    b.Navigation("WellnessProduct");
                });

            modelBuilder.Entity("HMS_WebAPI.Models.WellnessProductModel", b =>
                {
                    b.HasOne("HMS_WebAPI.Models.WellnessProductCatatoryModel", "WellnessProductCatatory")
                        .WithMany()
                        .HasForeignKey("WellnessProductCatatoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("WellnessProductCatatory");
                });

            modelBuilder.Entity("HMS_WebAPI.Models.WellnessSaleModel", b =>
                {
                    b.HasOne("HMS_WebAPI.Models.GuestModel", "Guest")
                        .WithMany()
                        .HasForeignKey("GuestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("HMS_WebAPI.Models.WellnessProductModel", "WellnessProduct")
                        .WithMany()
                        .HasForeignKey("WellnessProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Guest");

                    b.Navigation("WellnessProduct");
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

            modelBuilder.Entity("HMS_WebAPI.Models.WellnessProductModel", b =>
                {
                    b.Navigation("Images");
                });
#pragma warning restore 612, 618
        }
    }
}
