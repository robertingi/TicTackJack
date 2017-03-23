using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tic_Tack_Jack.Models
{
    public class ForumPostContent
    {
        public ForumPost fp { get; set; }
        public List<ForumPostComment> fpc { get; set; }
    }
}