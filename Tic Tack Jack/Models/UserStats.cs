using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tic_Tack_Jack.Models
{
    public class UserStats
    {
        public int ID { get; set; }
        public string userName { get; set; }
        public int totalGames { get; set; }
        public int TICWins { get; set; }
        public int TICLoss { get; set; }
    }
}