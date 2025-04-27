using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SzepsegedenLibrary.Models
{
    public class Reservation
    {
        [Key]
        public int Id { get; set; }
        [Column(Order = 1)]
        [ForeignKey("Worker")]
        public int Worker_Id { get; set; }
        public virtual User Worker { get; set; }
        [Column(Order = 2)]
        [ForeignKey("Guest")]
        public int Guest_Id { get; set; }
        public virtual User Guest { get; set; }
        [ForeignKey("Service")]
        public int Service_Id { get; set; }
        public virtual Service Service { get; set; }
        public DateTime Datetime { get; set; }
        public string Appointment { get; set; }
    }
}