using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tic_Tack_Jack.Models
{
    public class User
    {
        public int ID { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public int Status { get; set; } // 0 - regular user, 1 - respected, 2 - admin.
        public int Likes { get; set; }
        public bool Online { get; set; } // whether the user is currently online or not
    }
}