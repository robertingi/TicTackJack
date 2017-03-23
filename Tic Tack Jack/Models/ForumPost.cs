using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tic_Tack_Jack.Models
{
    public class ForumPost
    {
        public int ID { get; set; }
        public string Author { get; set; }
        public DateTime PostDate { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}