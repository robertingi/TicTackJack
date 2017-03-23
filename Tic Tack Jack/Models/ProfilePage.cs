using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tic_Tack_Jack.Models
{
    public class ProfilePage
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public int totalGames { get; set; }
        public int TICwins { get; set; }
        public int TICloss { get; set; }
        public int Status { get; set; } // 0 - regular user, 1 - respected, 2 - admin.
        public int Likes { get; set; }
        public bool Online { get; set; }
        public List<UserComment> UcL { get; set; }
    }
}