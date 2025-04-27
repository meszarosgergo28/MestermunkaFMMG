using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace SzepsegedenLibrary.Models
{
    public class Days
    {
        [Key]
        public int Daynumber { get; set; }
        public string Name { get; set; }
    }
}