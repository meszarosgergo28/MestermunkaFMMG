using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using SzepsegedenLibrary.UserManager;

namespace SzepsegedenLibrary.Models
{
    public class User
    {
        [Key]
        public int Id { get; set; }
        public string Email { get; set; }
        [Column("passwd_hash")]
        public byte[] PasswdHash { get; set; }
        [Column("passwd_salt")]
        public byte[] PasswdSalt { get; set; }
        public string Surname { get; set; }
        public string Firstname { get; set; }
        public string PhoneNumber { get; set; }
        [ForeignKey("Role")]
        public int Role_Id { get; set; }
        public virtual Role Role { get; set; }

        public User() { }

        public User(string email, string password, string surname, string firstname, string phonenumber, int role_id)
        {
            Email = email;
            PasswordManager.CreatePasswordHash(password, out byte[] hash, out byte[] salt);
            PasswdHash = hash;
            PasswdSalt = salt;
            Surname = surname;
            Firstname = firstname;
            PhoneNumber = phonenumber;
            Role_Id = role_id;
        }
    }
}