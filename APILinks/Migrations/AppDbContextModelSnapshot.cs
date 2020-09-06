﻿// <auto-generated />
using System;
using APILinks.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace APILinks.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.6")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("APILinks.Models.EnderecoLink", b =>
                {
                    b.Property<int>("IdEnderecoLink")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DTCriacao")
                        .HasColumnType("datetime2");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<int>("QTDClicks")
                        .HasColumnType("int");

                    b.Property<string>("URL")
                        .IsRequired()
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<int?>("UsuarioIdUsuario")
                        .HasColumnType("int");

                    b.HasKey("IdEnderecoLink");

                    b.HasIndex("UsuarioIdUsuario");

                    b.ToTable("EnderecosLinks");
                });

            modelBuilder.Entity("APILinks.Models.Grupo", b =>
                {
                    b.Property<int>("IdGrupo")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DTCriacao")
                        .HasColumnType("datetime2");

                    b.Property<int?>("EnderecoLinkIdEnderecoLink")
                        .HasColumnType("int");

                    b.Property<string>("Nome")
                        .IsRequired()
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<int>("Ordem")
                        .HasColumnType("int");

                    b.Property<int>("QTDClicks")
                        .HasColumnType("int");

                    b.Property<string>("URL")
                        .IsRequired()
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.HasKey("IdGrupo");

                    b.HasIndex("EnderecoLinkIdEnderecoLink");

                    b.ToTable("Grupos");
                });

            modelBuilder.Entity("APILinks.Models.Pagamento", b =>
                {
                    b.Property<int>("CDPagamento")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CDUsuario")
                        .HasColumnType("int");

                    b.Property<DateTime>("DTPagamento")
                        .HasColumnType("datetime2");

                    b.Property<string>("Plano")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<int?>("UsuarioIdUsuario")
                        .HasColumnType("int");

                    b.HasKey("CDPagamento");

                    b.HasIndex("UsuarioIdUsuario");

                    b.ToTable("Pagamentos");
                });

            modelBuilder.Entity("APILinks.Models.Usuario", b =>
                {
                    b.Property<int>("IdUsuario")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CPF")
                        .HasColumnType("nvarchar(11)")
                        .HasMaxLength(11);

                    b.Property<string>("Celular")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DTUltimoPagamento")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataCadastro")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DataUtimoAcesso")
                        .HasColumnType("datetime2");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<string>("Nome")
                        .HasColumnType("nvarchar(200)")
                        .HasMaxLength(200);

                    b.Property<string>("PlanoVigente")
                        .IsRequired()
                        .HasColumnType("nvarchar(50)")
                        .HasMaxLength(50);

                    b.Property<bool>("STAtivo")
                        .HasColumnType("bit");

                    b.Property<string>("Senha")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("IdUsuario");

                    b.ToTable("Usuarios");
                });

            modelBuilder.Entity("APILinks.Models.EnderecoLink", b =>
                {
                    b.HasOne("APILinks.Models.Usuario", "Usuario")
                        .WithMany("EnderecoLinks")
                        .HasForeignKey("UsuarioIdUsuario");
                });

            modelBuilder.Entity("APILinks.Models.Grupo", b =>
                {
                    b.HasOne("APILinks.Models.EnderecoLink", "EnderecoLink")
                        .WithMany("Grupos")
                        .HasForeignKey("EnderecoLinkIdEnderecoLink");
                });

            modelBuilder.Entity("APILinks.Models.Pagamento", b =>
                {
                    b.HasOne("APILinks.Models.Usuario", "Usuario")
                        .WithMany("Pagamento")
                        .HasForeignKey("UsuarioIdUsuario");
                });
#pragma warning restore 612, 618
        }
    }
}
