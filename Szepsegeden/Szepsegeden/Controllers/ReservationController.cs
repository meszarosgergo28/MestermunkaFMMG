using System;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Http;
using SzepsegedenLibrary.Database;
using SzepsegedenLibrary.Models;

namespace Szepsegeden.Controllers
{
    public class ReservationDto
    {
        public int Worker_Id { get; set; }
        public int Guest_Id { get; set; }
        public int Service_Id { get; set; }
        public DateTime Datetime { get; set; }
        public string Appointment { get; set; }
    }
    public class ReservationController : ApiController
    {
        SzepsegedenContext ctx = new SzepsegedenContext();
        // GET api/<controller>/5
        [Route("api/Reservation/dolgozo/{id}")]
        public IHttpActionResult GetByDolgozo(int id,DateTime Date)
        {
            var res = ctx.Reservation.Include(s => s.Service).Where(a => a.Worker_Id == id && a.Datetime == Date).Select(b => new { FoglaltIdopont = b.Appointment, SzolgaltatasHossz = b.Service.Duration});
            return Ok(res);
        }
        // GET vendég
        [Route("api/Reservation/vendeg/{id}")]
        public IHttpActionResult GetByVendeg(int id, DateTime Date)
        {
            var res = ctx.Reservation.Include(s => s.Service).Include(b => b.Worker).Where(a => a.Guest_Id == id && a.Datetime == Date).Select(a => new {Id = a.Id, Szakember = a.Worker.Surname + " " + a.Worker.Firstname, Ar = a.Service.Price, Szolgaltatas = a.Service.Name, Hossz = a.Service.Duration,Idopont = a.Appointment});
            return Ok(res);
        }   
        // POST api/<controller>
        [HttpPost]
        public IHttpActionResult Post([FromBody] ReservationDto value)
        {
            try
            {
                if (value == null)
                {
                    return BadRequest("Üres body");
                }
                var reservation = new Reservation
                {
                    Worker_Id = value.Worker_Id,
                    Guest_Id = value.Guest_Id,
                    Service_Id = value.Service_Id,
                    Datetime = value.Datetime,
                    Appointment = value.Appointment
                };

                ctx.Reservation.Add(reservation);
                ctx.SaveChanges();

                return Content(HttpStatusCode.Created, new { reservation.Id });
            }
            catch (Exception ex)
            {
                return InternalServerError(ex);
            }
        }
        // DELETE api/<controller>/5
        public IHttpActionResult Delete(int id)
        {
            var foglalt = ctx.Reservation.Where(a => a.Id == id).FirstOrDefault();
            if (foglalt == null)
            {
                return Content(HttpStatusCode.NoContent, "");
            }
            ctx.Reservation.Remove(foglalt);
            ctx.SaveChanges();
            return Content(HttpStatusCode.NoContent, "Sikeres törlés");
        }
    }
}