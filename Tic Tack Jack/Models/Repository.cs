using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Tic_Tack_Jack.Models
{
    public class Repository
    {
        AppDataContext db = new AppDataContext();
        public Repository()
        {
        }

        public string userIDtouserName(int id)
        {
            var model = (from n in db.User
                         where n.ID == id
                         select n.UserName).SingleOrDefault();
            string userName = model.ToString();
            return userName;
        }


        public List<Game> getAllGames()
        {
            var model = (from m in db.Game
                         where m.Active == true
                         orderby m.ID descending
                         select new { m.ID, m.Name, m.Rules, m.Description, m.Active });
            List<Game> games = new List<Game>();
            foreach (var m in model)
            {
                Game temp = new Game();
                temp.Name = m.Name;
                temp.ID = m.ID;
                temp.Rules = m.Rules;
                temp.Description = m.Description;
                temp.Active = m.Active;
                games.Add(temp);
            }
            return games;
        }

        public int userNameToID(string userName)
        {
            var model = (from n in db.User
                         where n.UserName == userName
                         select n.ID).SingleOrDefault();
            int id = model;
            return id;
        }

        public int newestGameID()
        {
            var newestID = (from n in db.Game
                            select (n.ID)).Max();
            return newestID;
        }

        public UserStats getUserStatsByID(int id)
        {
            var model = (from s in db.Stats
                         join u in db.User on s.userID equals u.ID
                         where s.userID == id
                         orderby s.TICwins descending
                         select new { s.ID, u.UserName, s.totalGames, s.TICwins, s.TICloss }).SingleOrDefault();
            UserStats temp = new UserStats()
            {
                ID = model.ID,
                userName = model.UserName,
                totalGames = model.totalGames,
                TICWins = model.TICwins,
                TICLoss = model.TICloss
            };
            return temp;
        }

        public UserStats getStatsByUserID(int id)
        {
            var model = (from s in db.Stats
                         where s.userID == id
                         orderby s.TICwins descending
                         select s).SingleOrDefault();
            UserStats temp = new UserStats()
            {
                ID = model.ID,
                totalGames = model.totalGames,
                TICWins = model.TICwins,
                TICLoss = model.TICloss
            };
            return temp;
        }

        public List<News> getAllNews()
        {
            var model = (from n in db.News
                         orderby n.postdate descending
                         select new { n.ID, n.Title, n.Author, n.postdate, n.Content });
            List<News> news = new List<News>();
            foreach (var n in model)
            {
                News temp = new News();
                temp.ID = n.ID;
                temp.Title = n.Title;
                temp.Author = n.Author;
                temp.postdate = n.postdate;
                temp.Content = n.Content;
                news.Add(temp);
            }
            return news;
        }
        public List<ForumPostComment> getForumPostComments(int id)
        {
            var model = (from f in db.ForumPostComment
                         where f.PostID == id
                         select f).ToList();
            return model;
        }
        public ForumPost getForumPostByID(int id)
        {
            var model = (from f in db.ForumPost
                         where f.ID == id
                         select f).SingleOrDefault();

            ForumPost temp = new ForumPost();
            temp.ID = model.ID;
            temp.Title = model.Title;
            temp.PostDate = model.PostDate;
            temp.Author = model.Author;
            temp.Content = model.Content;
            return temp;
        }

        public List<UserStats> getAllUserStats()
        {
            var model = (from s in db.Stats
                         join u in db.User on s.userID equals u.ID
                         orderby s.TICwins descending
                         select new { u.ID, u.UserName, s.totalGames, s.TICwins, s.TICloss }).ToList();

            List<UserStats> us = new List<UserStats>();
            foreach (var m in model)
            {
                UserStats temp = new UserStats();
                temp.ID = m.ID;
                temp.userName = m.UserName;
                temp.totalGames = m.totalGames;
                temp.TICWins = m.TICwins;
                temp.TICLoss = m.TICloss;
                us.Add(temp);
            }

            return us;
        }
        public User getUserbyID(int id)
        {
            var model = (from u in db.User
                         where u.ID == id
                         select u).SingleOrDefault();
            /*User temp = new User();
            temp.ID = model.ID;
            temp.UserName = model.UserName;
            temp.Status = model.Status;
            temp.Likes = model.Likes;
            temp.Online = model.Online;*/
            return model;
        }
        public UserStats getUserStatsbyID(int id)
        {
            var model = (from us in db.Stats
                         where us.userID == id
                         select us).SingleOrDefault();
            UserStats temp = new UserStats();
            temp.ID = model.ID;
            temp.totalGames = model.totalGames;
            temp.TICWins = model.TICwins;
            temp.TICLoss = model.TICloss;
            return temp;
        }

        public Game getGamebyID(int id)
        {
            var model = (from g in db.Game
                         where g.ID == id
                         select g).SingleOrDefault();
            Game temp = new Game();
            temp.ID = model.ID;
            temp.Name = model.Name;
            temp.Description = model.Description;
            temp.Rules = model.Rules;
            temp.Active = model.Active;
            return temp;
        }

        public List<User> getAllUsers()
        {
            var model = (from s in db.User
                         select s).ToList();
            List<User> us = new List<User>();
            foreach (var m in model)
            {
                User temp = new User();
                temp.ID = m.ID;
                temp.UserName = m.UserName;
                temp.Status = m.Status;
                temp.Likes = m.Likes;
                temp.Online = m.Online;
                us.Add(temp);
            }
            return us;
        }

        public List<ForumPost> getAllForumPost()
        {
            var model = (from f in db.ForumPost
                         orderby f.PostDate descending
                         select new { f.ID, f.Author, f.PostDate, f.Title, f.Content });
            List<ForumPost> forums = new List<ForumPost>();
            foreach (var f in model)
            {
                ForumPost temp = new ForumPost();
                temp.ID = f.ID;
                temp.Author = f.Author;
                temp.PostDate = f.PostDate;
                temp.Title = f.Title;
                temp.Content = f.Content;
                forums.Add(temp);
            }
            return forums;

        }

        public int UserStatus(int id)
        {
            var model = getUserbyID(id);
            int userstatus = model.Status;
            return userstatus;
        }
    }
}