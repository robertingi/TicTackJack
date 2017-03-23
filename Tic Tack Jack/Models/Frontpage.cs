using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tic_Tack_Jack.Models
{
    public class Frontpage
    {

        public List<News> news { get; set; }
        public List<UserStats> userstats { get; set; }
        public List<Game> game { get; set; }
        public List<User> user { get; set; }
        public int Status { get; set; } // 0 - regular user, 1 - respected, 2 - admin.
    }
}