using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;
using SzepsegedenLibrary.Models;

namespace SzepsegedenLibrary.Database
{
    public class SzepsegedenContext : DbContext
    {
        public DbSet<Days> Days { get; set; }
        public DbSet<Reservation> Reservation { get; set; }
        public DbSet<Role> Role { get; set; }
        public DbSet<Service> Service { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Userservices> Userservices { get; set; }
        public DbSet<Workinghours> Workinghours { get; set; }
        public SzepsegedenContext() : base("name=SzepsegedenContext") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}