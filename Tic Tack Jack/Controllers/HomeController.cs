using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tic_Tack_Jack.Models;

namespace Tic_Tack_Jack.Controllers
{
    public class HomeController : Controller
    {
        AppDataContext db = new AppDataContext();
        Repository rep = new Repository();

        public ActionResult Index()
        {
            ViewBag.Message = "";
            List<News> news = rep.getAllNews();
            List<UserStats> userstats = rep.getAllUserStats();
            List<Game> games = rep.getAllGames();
            List<User> user = rep.getAllUsers();
            Frontpage front = new Frontpage();
            
            front.game = games;
            front.news = news;
            front.user = user;
            front.userstats = userstats;
            var status = (from u in db.User
                          where u.UserName == User.Identity.Name
                          select u.ID).SingleOrDefault();
            if (status != 0)
            {
                front.Status = rep.UserStatus(status);
            }
            

            return View(front);
        }

        public ActionResult createNews()
        {
            return View();
        }

        [HttpPost]
        public ActionResult createNews(News n)
        {
            db.News.Add(n);
            db.SaveChanges();
            return RedirectToAction("Index", "Home");
        }

        public ActionResult Likeinc(int id) //LAGA
        {

            var model = (from u in db.User
                         where u.ID == id
                         select u).SingleOrDefault();
            model.Likes += 1;
            if (model.Likes >= 100)
            {
                model.Status = 1;
            }
            db.SaveChanges();
            return RedirectToAction("ProfilePage", "Home", new { id = id });
        }

        public ActionResult Stigatafla()
        {
            ViewBag.Message = "Stigatafla";
            List<UserStats> model = rep.getAllUserStats();
            return View(model);
        } 

            

        public ActionResult _ChatPartial()
        {
            return View();
        }

        public ActionResult LoginError(string test)
        {
            return View();
        }



        [HttpPost]
        public ActionResult ProfilePage(string author, int id, int pid, string content)
        {
            UserComment Uc = new UserComment();
            Uc.Author = author;
            Uc.userID = id;
            Uc.posterID = pid;
            Uc.Content = content;
            Uc.date = DateTime.Now;
            db.UserComment.Add(Uc);
            db.SaveChanges();
            return RedirectToAction("ProfilePage", "Home", new { id = id });
        }
        public ActionResult ProfilePage(int id)
        {
            ViewBag.Message = "ProfilePage";
            UserStats userstats = rep.getUserStatsbyID(id);
            User user = rep.getUserbyID(id);
            ProfilePage ppage = new ProfilePage();
            ppage.ID = user.ID;
            ppage.UserName = user.UserName;
            ppage.totalGames = userstats.totalGames;
            ppage.TICwins = userstats.TICWins;
            ppage.TICloss = userstats.TICLoss;
            ppage.Status = user.Status;
            ppage.Online = user.Online;
            ppage.Likes = user.Likes;

            var userComments = (from u in db.UserComment
                                where u.userID == id
                                select u).ToList();
            List<UserComment> uc = userComments;
            ppage.UcL = uc;
            return View(ppage);
        }
        

    }
}
