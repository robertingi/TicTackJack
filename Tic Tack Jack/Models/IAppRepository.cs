using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Tic_Tack_Jack.Models
{
	public interface IAppRepository
	{
		IEnumerable<Game> AllGames { get ; set; }
	}

}
