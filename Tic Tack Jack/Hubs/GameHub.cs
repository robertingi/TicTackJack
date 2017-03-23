using System;
using System.Web;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace SignalRGameHub
{
    //	[Authorize]
    public class GameHub : Hub
    {
        public void Join(string groupId)
        {
            //			Context.User.Identity.Name
            // Context.QueryString

            Groups.Add(Context.ConnectionId, groupId);
        }

        public void AddPlayer(string groupName, string userName)
        {
            Clients.OthersInGroup(groupName).addPlayer(userName);
        }

        public void ClickCell(string groupName, string cellId)
        {
            Clients.OthersInGroup(groupName).cellClicked(cellId);
            //			Clients.Others.cellClicked(cellId);
        }
        public void ClickClear(string groupName, string ClearId)
        {
            Clients.OthersInGroup(groupName).clearClicked(ClearId);
        }
        public void ClickEnd(string groupName)
        {
            Clients.OthersInGroup(groupName).endClicked();
        }
    }
}
