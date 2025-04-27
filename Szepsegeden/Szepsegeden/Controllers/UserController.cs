using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using SzepsegedenLibrary.Models;
using SzepsegedenLibrary.Database;
using SzepsegedenLibrary.UserManager;

namespace Szepsegeden.Controllers
{
    public class UserCreateModel
    {
        public string Email { get; set; }
        public string Passwd { get; set; }
        public string Surname { get; set; }
        public string Firstname { get; set; }
        public string Phonenumber { get; set; }
        public int Role_Id { get; set; }
    }
    public class UserUpdateModel
    {
        public string Email { get; set; }
        public string OldPasswd { get; set; }
        public string NewPasswd { get; set; }
        public string Surname { get; set; }
        public string Firstname { get; set; }
        public string Phonenumber { get; set; }
        public int Role_Id { get; set; }
    }
    public class UserResponseModel
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Surname { get; set; }
        public string Firstname { get; set; }
        public string PhoneNumber { get; set; }
        public int Role_Id { get; set; }

        public UserResponseModel(User user)
        {
            Id = user.Id;
            Email = user.Email;
            Surname = user.Surname;
            Firstname = user.Firstname;
            PhoneNumber = user.PhoneNumber;
            Role_Id = user.Role_Id;
        }
    }
    public class AuthenticationModel
    {
        public string Email { get; set; }
        public string Passwd { get; set; }
    }
    public class UserController : ApiController
    {
        SzepsegedenContext ctx = new SzepsegedenContext();

        // POST api/<controller>
        [ResponseType(typeof(UserResponseModel))]
        public HttpResponseMessage Post([FromBody] UserCreateModel value)
        {
            try
            {
                var email = ctx.User.Where(x => x.Email == value.Email).FirstOrDefault();

                if (email != null)
                    return Request.CreateResponse(HttpStatusCode.Conflict, "EMAIL_EXISTS");
                ctx.User.Add(new User
                    (value.Email, value.Passwd, value.Surname, value.Firstname, value.Phonenumber, value.Role_Id));
                Console.WriteLine("Saving user...");
                ctx.SaveChanges();
                Console.WriteLine("User saved!");
                var res = ctx.User.Where(x => x.Email == value.Email).FirstOrDefault();
                var response = new UserResponseModel(res);
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                var fullMessage = ex.ToString();

                if (ex.InnerException != null)
                    fullMessage += "\nINNER: " + ex.InnerException.Message;

                if (ex.InnerException?.InnerException != null)
                    fullMessage += "\nDEEP INNER: " + ex.InnerException.InnerException.Message;

                Console.WriteLine(fullMessage); // Visual Studio Output ablakban megjelenik
                return Request.CreateResponse(HttpStatusCode.InternalServerError, fullMessage);
            }
            //catch (Exception ex)
            //{
            //    return Request.CreateResponse(HttpStatusCode.InternalServerError, $"{ex.Message}");
            //}
        }
        //PATCH
        [ResponseType(typeof(UserResponseModel))]
        public HttpResponseMessage Patch(int id, [FromBody] UserUpdateModel value)
        {
            try
            {
                var result = ctx.User.Where(x => x.Id == id).FirstOrDefault();
                if (result == null)
                {
                    return Request.CreateResponse(HttpStatusCode.NotFound);
                }

                var valid = PasswordManager.VerifyPasswordHash(value.OldPasswd, result.PasswdHash, result.PasswdSalt);

                if (!valid)
                    return Request.CreateResponse(HttpStatusCode.Unauthorized);

                if (value.Email != null && value.Email != result.Email)
                {
                    var email = ctx.User.Where(x => x.Email == value.Email).FirstOrDefault();
                    if (email != null)
                        return Request.CreateResponse(HttpStatusCode.Conflict, "EMAIL_EXISTS");
                }
                if (value.Surname != null)
                    result.Surname = value.Surname;
                if (value.Firstname != null)
                    result.Firstname = value.Firstname;
                if (value.Email != null)
                    result.Email = value.Email;
                if (value.NewPasswd != null)
                {
                    PasswordManager.CreatePasswordHash(value.NewPasswd, out byte[] hash, out byte[] salt);
                    result.PasswdHash = hash;
                    result.PasswdSalt = salt;
                }
                if (value.Phonenumber != null)
                    result.PhoneNumber = value.Phonenumber;

                var response = new UserResponseModel(result);

                ctx.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, response);
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, $"{ex.Message}");
            }
        }
        // AUTHENTICATE
        [HttpPost]
        [Route("api/User/authenticate")]
        [ResponseType(typeof(UserResponseModel))]
        public HttpResponseMessage Authenticate([FromBody] AuthenticationModel value)
        {
            var result = ctx.User.Where(x => x.Email == value.Email).FirstOrDefault();
            if (result != null)
            {
                var valid = PasswordManager.VerifyPasswordHash(value.Passwd, result.PasswdHash, result.PasswdSalt);
                var response = new UserResponseModel(result);

                if (valid)
                    return Request.CreateResponse(HttpStatusCode.OK, response);
                else
                    return Request.CreateResponse(HttpStatusCode.Unauthorized, response);

            }
            return Request.CreateResponse(HttpStatusCode.NotFound);
        }
    }
}