using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SzepsegedenLibrary.Models
{
    public class Workinghours
    {
        [Key, Column(Order = 0)]
        [ForeignKey("User")]
        public int User_Id { get; set; }
        public virtual User User { get; set; }

        [Key, Column(Order = 1)]
        [ForeignKey("Days")]
        public int Daynumber { get; set; }
        public virtual Days Days { get; set; }

        public string Opening_time { get; set; }
        public string Closing_time { get; set; }

        public Workinghours()
        {

        }
        public Workinghours(int id,int nap,string kezd,string befejez)
        {
            User_Id = id;
            Daynumber = nap;
            Opening_time = kezd;
            Closing_time = befejez;
        }

    }
}