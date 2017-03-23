using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace Tic_Tack_Jack.Models
{
    public class AppDataContext : DbContext
    {
        public DbSet<News> News { get; set; }
        public DbSet<Stats> Stats { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<UserComment> UserComment { get; set; }
        public DbSet<Game> Game { get; set; }
        public DbSet<ForumPost> ForumPost { get; set; }
        public DbSet<ForumPostComment> ForumPostComment { get; set; }
    }
}