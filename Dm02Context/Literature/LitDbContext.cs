using System;
using System.Linq;
using System.Web;
using System.Collections.Generic;
using System.Data.Entity;
using Dm01Entity.Literature;


namespace Dm02Context.Literature
{
    public class LitDbContext : DbContext
    {

        public LitDbContext() : base("name=LitConnection") { }

        public LitDbContext(string ConnectionString)
          : base("name=" + ConnectionString)
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LitBook>().HasKey(p => p.BookId);
            modelBuilder.Entity<LitPublisher>().HasKey(p => p.PublisherId);
            modelBuilder.Entity<LitManuscript>().HasKey(p => p.ManuscriptId);
            modelBuilder.Entity<LitAuthor>().HasKey(p => p.AuthorId);
            modelBuilder.Entity<LitDialect>().HasKey(p => p.DialectId);
            modelBuilder.Entity<LitLanguage>().HasKey(p => new { p.Iso3, p.Iso2 });
            modelBuilder.Entity<LitCountry>().HasKey(p => new { p.Iso3, p.Iso2 });
            modelBuilder.Entity<LitGenre>().HasKey(p => p.GenreId);
            modelBuilder.Entity<LitGenre>().Property(p => p.GenreId)
            .HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None);
            modelBuilder.Entity<LitDialect>().HasRequired(d => d.Country)
                .WithMany(m => m.Dialects)
                .HasForeignKey(d => new { d.Iso3CntrRef, d.Iso2CntrRef });
            modelBuilder.Entity<LitDialect>().HasRequired(d => d.Language)
                .WithMany(m => m.Dialects)
                .HasForeignKey(d => new { d.Iso3LngRef, d.Iso2LngRef });
            modelBuilder.Entity<LitAuthor>().HasRequired(d => d.Country)
                .WithMany(m => m.Authors)
                .HasForeignKey(d => new { d.Iso3CntrRef, d.Iso2CntrRef });
            modelBuilder.Entity<LitManuscript>().HasRequired(d => d.Author)
                .WithMany(m => m.Manuscripts)
                .HasForeignKey(d => d.AuthorIdRef);
            modelBuilder.Entity<LitManuscript>().HasRequired(d => d.Genre)
                .WithMany(m => m.Manuscripts)
                .HasForeignKey(d => d.GenreIdRef);

            modelBuilder.Entity<LitPublisher>().HasRequired(d => d.Country)
                .WithMany(m => m.Publishers)
                .HasForeignKey(d => new { d.Iso3CntrRef, d.Iso2CntrRef }).WillCascadeOnDelete(false); 
            modelBuilder.Entity<LitBook>().HasRequired(d => d.Publisher)
                .WithMany(m => m.LitBooks)
                .HasForeignKey(d => d.PublisherIdRef);
            modelBuilder.Entity<LitBook>().HasRequired(d => d.Manuscript)
                .WithMany(m => m.LitBooks)
                .HasForeignKey(d => d.ManuscriptIdRef);
            modelBuilder.Entity<LitBook>().HasOptional(d => d.Edition)
                .WithMany(m => m.Books)
                .HasForeignKey(d => d.EditionIdRef);
            modelBuilder.Entity<LitManuscript>().HasRequired(d => d.Dialect)
                .WithMany(m => m.Manuscripts)
                .HasForeignKey(d => d.DialectIdRef).WillCascadeOnDelete(false); ;
        }

        public DbSet<LitGenre> LitGenreDbSet
        {
            get;
            set;
        }

        public DbSet<LitEdition> LitEditionDbSet
        {
            get;
            set;
        }

        public DbSet<LitCountry> LitCountryDbSet
        {
            get;
            set;
        }

        public DbSet<LitLanguage> LitLanguageDbSet
        {
            get;
            set;
        }

        public DbSet<LitDialect> LitDialectDbSet
        {
            get;
            set;
        }

        public DbSet<LitAuthor> LitAuthorDbSet
        {
            get;
            set;
        }

        public DbSet<LitManuscript> LitManuscriptDbSet
        {
            get;
            set;
        }

        public DbSet<LitPublisher> LitPublisherDbSet
        {
            get;
            set;
        }

        public DbSet<LitBook> LitBookDbSet
        {
            get;
            set;
        }
    }
}
