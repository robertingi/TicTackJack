using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tic_Tack_Jack.Models;

namespace Tic_Tack_Jack.Controllers
{
    public class GameController : Controller
    {
        //
        // GET: /Game/
        AppDataContext db = new AppDataContext();
        Repository rep = new Repository();
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult createTicTacToe()
        {
            Game temp = new Game();
            var gameOwnerID = rep.userNameToID(User.Identity.Name);
            var gameOwner = User.Identity.Name;
            temp.Name = "Mylla -- " + gameOwner;
            temp.Rules = "reglur";
            temp.Active = true;
            temp.owner = gameOwner;
            db.Game.Add(temp);
            db.SaveChanges();
            var gameID = rep.newestGameID();
            return RedirectToAction("TicTacToe", "Game", new { id = gameID, u = gameOwner });
        }

        [HttpPost]
        public ActionResult TicTacToe(string id, string owner, string opp, string oN, string oppN)
        {
            int gameID, ownerWins, ownerLoss, oppWins, oppLoss;
            int.TryParse(owner, out ownerWins);
            int.TryParse(opp, out ownerLoss);
            int.TryParse(opp, out oppWins);
            int.TryParse(owner, out oppLoss);
            int.TryParse(id, out gameID);
            int ownerID = rep.userNameToID(oN);
            int oppID = rep.userNameToID(oppN);
            var ownerStats = (from f in db.Stats
                              where f.userID == ownerID
                              select f).SingleOrDefault();
            ownerStats.TICwins += ownerWins;
            ownerStats.TICloss += ownerLoss;
            ownerStats.totalGames += 1;
            db.SaveChanges();
            var oppStats = (from f in db.Stats
                            where f.userID == oppID
                            select f).SingleOrDefault();
            if (oppStats != null)
            {
                oppStats.TICwins += oppWins;
                oppStats.TICloss += oppLoss;
                oppStats.totalGames += 1;
            }
            db.SaveChanges();
            var currentGame = (from g in db.Game
                               where g.ID == gameID
                               select g).SingleOrDefault();
            currentGame.Active = false;
            db.SaveChanges();
            return Json(true);
        }

        public ActionResult blackjack()
        {
            return View();
        }

        public ActionResult TicTacToe(int id, string u)
        {
            var instance = (from game in db.Game
                            where game.ID == id
                            select game).SingleOrDefault();

            if (instance != null)
            {
                if (instance.owner != u)
                {
                    instance.player2 = u;
                    instance.Active = false;
                }
                db.SaveChanges();
                return View(instance);
            }

            return View("NotFound");
        }

        public ActionResult MyllaLobby()
        {
            ViewBag.Message = "Mylluleikir";
            List<Game> games = rep.getAllGames();

            return View(games);
        }

        

    }
}
