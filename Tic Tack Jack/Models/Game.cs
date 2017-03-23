using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tic_Tack_Jack.Models
{
    public class Game
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Rules { get; set; }
        public bool Active { get; set; }
        public string owner { get; set; }
        public string player2 { get; set; }
    }
}