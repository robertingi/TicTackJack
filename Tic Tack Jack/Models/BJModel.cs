using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tic_Tack_Jack.Models
{
    public class BJModel
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string owner { get; set; }
        public string player2 { get; set; }
        public int ownerChips { get; set; }
        public int player2Chips { get; set; }
    }
}