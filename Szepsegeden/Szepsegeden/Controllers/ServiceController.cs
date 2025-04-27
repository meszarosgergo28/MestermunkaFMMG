using System.Linq;
using System.Web.Http;
using SzepsegedenLibrary.Database;

namespace Szepsegeden.Controllers
{
    public class ServiceController : ApiController
    {
        SzepsegedenContext ctx = new SzepsegedenContext();
        // GET api/<controller>
        public IHttpActionResult Get()
        {
            return Ok(ctx.Service.ToList());
        }
    }
}