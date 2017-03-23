using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tic_Tack_Jack.Models
{
    public class Stats
    {
        public int ID { get; set; }
        public int userID { get; set; }
        public int totalGames { get; set; }
        public int TICwins { get; set; }
        public int TICloss { get; set; }
    }
}