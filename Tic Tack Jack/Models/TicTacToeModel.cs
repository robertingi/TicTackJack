using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tic_Tack_Jack.Models
{
    public class TicTacToeModel
    {
        public int ID { get; set; }
        public int playerX { get; set; } //FK to a user
        public int playerY { get; set; } //FK to a user
    }
}