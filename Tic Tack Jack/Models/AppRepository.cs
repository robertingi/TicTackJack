using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tic_Tack_Jack.Models
{
    public class AppRepository : IAppRepository
    {
        private AppDataContext _db = new AppDataContext();

        public IEnumerable<Game> AllGames
        {
            get { return _db.Game; }
            set
            {
            }
        }
        public IEnumerable<BJModel> AllTables
        {
            get { return _db.BlackJackGames; }
            set { }
        }
        public AppRepository()
        { }

        
    }
}
