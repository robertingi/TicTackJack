using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tic_Tack_Jack.Models
{
    public class ForumPostComment
    {
        public int ID { get; set; }
        public int PostID { get; set; }
        public string Author { get; set; }
        public DateTime date { get; set; }
        public string Content { get; set; }
    }
}