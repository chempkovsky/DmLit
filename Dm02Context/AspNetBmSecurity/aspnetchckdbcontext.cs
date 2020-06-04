

using System;
using System.Linq;
using System.Web;
using System.Collections.Generic;
using System.Data.Entity;
using Dm01Entity.AspNetBmSecurity;

/*
    This is a dummy(mock) class, and you must remove it from the project after generating the user interface.
*/

namespace Dm02Context.AspNetBmSecurity
{
    public class aspnetchckdbcontext : DbContext
    {

        public aspnetchckdbcontext()
          : base("name=AspNetBmConnection")
        {
        }

        public aspnetchckdbcontext(string ConnectionString)
          : base("name=" + ConnectionString)
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {

            modelBuilder.Entity<aspnetmodel>().
                Property(p => p.ModelPk).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None);
            modelBuilder.Entity<aspnetdashboard>().
                Property(p => p.DashboardPk).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.None);


            modelBuilder.Entity<aspnetmodel>().HasKey(p => p.ModelPk);
            modelBuilder.Entity<aspnetdashboard>().HasKey(p => p.DashboardPk);
            modelBuilder.Entity<aspnetrolemask>().HasKey(p => p.RoleName);



//-------------------------------------------
// begin code to remove
/*
            modelBuilder.Entity<aspnetuser>().
                Property(p => p.Id).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Computed);
            modelBuilder.Entity<aspnetrole>().
                Property(p => p.Id).HasDatabaseGeneratedOption(System.ComponentModel.DataAnnotations.Schema.DatabaseGeneratedOption.Computed);

            modelBuilder.Entity<aspnetusermask>().HasKey(p => p.UserId);
            modelBuilder.Entity<aspnetuserroles>().HasKey(p => new { p.UserId, p.RoleId });
            modelBuilder.Entity<aspnetuser>().HasKey(p => p.Id);
            modelBuilder.Entity<aspnetrole>().HasKey(p => p.Id);

            modelBuilder.Entity<aspnetuserroles>().HasRequired(d => d.AspNetUser)
                .WithMany(m => m.UserRoles)
                .HasForeignKey(d => d.UserId);

            modelBuilder.Entity<aspnetuserroles>().HasRequired(d => d.AspNetRole)
                .WithMany(m => m.UserRoles)
                .HasForeignKey(d => d.RoleId);


            modelBuilder.Entity<aspnetusermask>().HasRequired(d => d.AspNetUser)
                .WithMany(m => m.UserMasks)
                .HasForeignKey(d => d.UserId);
*/
// end code to remove
//-------------------------------------------


        }

//-------------------------------------------
// begin code to remove
/*
        public DbSet< aspnetrole > aspnetroleDbSet
        {
            get;
            set;
        }

        public DbSet< aspnetuser > aspnetuserDbSet
        {
            get;
            set;
        }

        public DbSet< aspnetuserroles > aspnetuserroleDbSet
        {
            get;
            set;
        }

        public DbSet< aspnetusermask > aspnetusermaskDbSet
        {
            get;
            set;
        }

*/
// end code to remove
//-------------------------------------------
        public DbSet< aspnetmodel > aspnetmodellDbSet
        {
            get;
            set;
        }

        public DbSet< aspnetdashboard > aspnetdashboardDbSet
        {
            get;
            set;
        }

        public DbSet< aspnetrolemask > aspnetrolemaskDbSet
        {
            get;
            set;
        }


    }
}

