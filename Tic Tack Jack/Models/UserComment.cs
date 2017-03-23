using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tic_Tack_Jack.Models
{
    public class UserComment
    {
        public int ID { get; set; }
        public int userID { get; set; }
        public int posterID { get; set; }
        public string Author { get; set; }
        public DateTime date { get; set; }
        public string Content { get; set; }
    }
}