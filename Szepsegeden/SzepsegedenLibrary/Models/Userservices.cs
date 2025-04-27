using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace SzepsegedenLibrary.Models
{
    public class Userservices
    {
        [Key, Column(Order = 0)]
        [ForeignKey("User")]
        public int User_Id { get; set; }
        public virtual User User { get; set; }

        [Key, Column(Order = 1)]
        [ForeignKey("Service")]
        public int Service_Id { get; set; }
        public virtual Service Service { get; set; }
        public Userservices(){}
        public Userservices(int id,int id2)
        {
            User_Id = id;
            Service_Id = id2;
        }
    }
}