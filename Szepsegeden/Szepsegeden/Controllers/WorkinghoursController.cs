using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using SzepsegedenLibrary.Database;

namespace Szepsegeden.Controllers
{
    public class WorkinghoursController : ApiController
    {
        SzepsegedenContext ctx = new SzepsegedenContext();
        // GET api/<controller>/5
        public IHttpActionResult Get(int id)
        {
            var res = ctx.Workinghours.Where(a => a.User_Id == id).Select(b => new {Daynumber = b.Daynumber, Openingtime = b.Opening_time,Closingtime = b.Closing_time});
            return Ok(res);
        }
    }
}