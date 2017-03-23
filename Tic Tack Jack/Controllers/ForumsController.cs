using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Tic_Tack_Jack.Models;

namespace Tic_Tack_Jack.Controllers
{
    public class ForumsController : Controller
    {
        //
        // GET: /Forums/
        AppDataContext db = new AppDataContext();
        Repository rep = new Repository();
        public ActionResult Index()
        {
            if (User.Identity.Name != "")
            {
                ViewBag.Message = "Spjallbord";
                ForumpostAndStatus fap = new ForumpostAndStatus();
                AppDataContext db = new AppDataContext();
                Repository rep = new Repository();

                List<ForumPost> model = rep.getAllForumPost();
                fap.fp = model;
                var status = (from u in db.User
                              where u.UserName == User.Identity.Name
                              select u.ID).SingleOrDefault();
                if (status != 0)
                {
                    fap.Status = rep.UserStatus(status);
                }
                return View(fap);
            }
            return RedirectToAction("LoginError", "Home");

        }

        public ActionResult createForumPost()
        {
            return View();
        }

        [HttpPost]
        public ActionResult createForumPost(ForumPost n)
        {
            db.ForumPost.Add(n);
            db.SaveChanges();
            return RedirectToAction("Index");
        }


        [HttpPost]
        public ActionResult SpjallbordContent(string Author, int pid, string Content)
        {
            ForumPostComment fpc = new ForumPostComment();
            fpc.Author = Author;
            fpc.Content = Content;
            fpc.date = DateTime.Now;
            fpc.PostID = pid;
            db.ForumPostComment.Add(fpc);
            db.SaveChanges();

            ForumPostContent model = new ForumPostContent();
            model.fp = rep.getForumPostByID(pid);
            model.fpc = rep.getForumPostComments(pid);

            return View(model);
        }

        public ActionResult SpjallbordContent(int ID, string Author, string Title, string Content)
        {
            ForumPostContent model = new ForumPostContent();
            model.fp = rep.getForumPostByID(ID);
            model.fpc = rep.getForumPostComments(ID);

            return View(model);
        }

        public ActionResult Details(int ID)
        {
            ViewBag.Message = "Spjallbord";
            ForumPost model = rep.getForumPostByID(ID);

            return RedirectToAction("SpjallbordContent", "Forums", new { ID = model.ID, Author = model.Author, Title = model.Title, Content = model.Content });
        }

    }
}
