using System.Linq;
using System.Web.Http;
using SzepsegedenLibrary.Database;
using System.Data.Entity;

namespace Szepsegeden.Controllers
{
    public class UserservicesController : ApiController
    {
        SzepsegedenContext ctx = new SzepsegedenContext();
        
        // GET api/<controller>/5
        public IHttpActionResult Get(int id)
        {
            var res = ctx.Userservices.Include(a => a.Service).Include(c => c.User).Where(a => a.Service_Id == id).ToList().GroupBy(b => b.User.Id).Select(g => new {
                    Ar = g.First().Service.Price,
                    User_Id = g.Key,
                    FullName = g.First().User.Surname + " " + g.First().User.Firstname
            });
            return Ok(res);
        }
    }
}