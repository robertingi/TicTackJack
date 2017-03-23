using System.Web;
using System.Web.Mvc;

namespace Tic_Tack_Jack
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}