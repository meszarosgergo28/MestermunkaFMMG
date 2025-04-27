using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using SzepsegedenLibrary.Database;
using System.Data.Entity;
using SzepsegedenLibrary.Models;
using System.Net.Mail;
using System.Net;

namespace SzepsegedenWPF
{
    public partial class Torles : Window
    {
        SzepsegedenContext ctx = new SzepsegedenContext();
        public Torles()
        {
            InitializeComponent();
            frissit();
        }
        public void frissit()
        {
            listBox.Items.Clear();
            var result = ctx.User.Include(c => c.Role).Where(a => a.Role_Id == 3 || a.Role_Id == 2).Select(b => new {Id = b.Id, Email = b.Email, Nev = b.Surname + " " + b.Firstname, Role = b.Role.Name}).OrderBy(d => d.Id);
            foreach (var item in result)
            {
                listBox.Items.Add($"{item.Id} {item.Email} Szerepkör:{item.Role} Név:{item.Nev}");
            }
        }
        private void Menu_Click(object sender, RoutedEventArgs e)
        {
            Menu menu = new Menu();
            menu.Show();
            Close();
        }
        private void torol_Click(object sender, RoutedEventArgs e)
        {
            if (listBox.SelectedIndex == -1)
            {
                MessageBox.Show("Először válassza ki a törölni kívánt elemet!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            var kivalasztott = listBox.SelectedItem.ToString().Split(' ')[2].Split(':')[1];

            if (kivalasztott == "worker")
            {
                // vendeg
                var selecteditem = listBox.SelectedItem.ToString();
                var userId = int.Parse(listBox.SelectedItem.ToString().Split(' ')[0]);

                var foglalt = ctx.Reservation.Include(b => b.Guest).Include(c => c.Service).Where(a => a.Guest_Id == userId && a.Datetime > DateTime.Now).ToList();

                foreach (var item in foglalt)
                {

                    var guestEmail = item.Guest.Email;
                    var guestName = $"{selecteditem.Split(' ')[3].Split(':')[1]}";
                    var service = item.Service.Name;
                    var datum = item.Datetime;
                    var pontosido = item.Appointment;
                    ctx.Reservation.Remove(item);
                    if (!string.IsNullOrEmpty(guestEmail))
                    {
                        MailMessage mail = new MailMessage();
                        mail.From = new MailAddress("szepsegeden@gmail.com");
                        mail.To.Add(guestEmail);
                        mail.Subject = "Időpont törlés";
                        mail.Body = $"Kedves {guestName}!\n\n" +
                                    $"Értesítjük, hogy az Ön által {datum.ToShortDateString()} {pontosido} időpontra lefoglalt {service} szolgáltatása törlésre került.\n\n" +
                                    "Amennyiben kérdése van, kérjük, vegye fel velünk a kapcsolatot.\n\n" +
                                    "Üdvözlettel:\n" +
                                    "Szépségedén csapata";
                        SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");
                        smtpServer.Port = 587;
                        smtpServer.Credentials = new NetworkCredential("szepsegeden@gmail.com", "uyfp tlch omxk pnup");
                        smtpServer.EnableSsl = true;
                        smtpServer.Send(mail);
                    }
                    
                }
                ctx.SaveChanges();

                var multfoglalas = ctx.Reservation.Include(b => b.Guest).Include(c => c.Service).Where(a => a.Guest_Id == userId).ToList();
                foreach (var item in multfoglalas)
                {
                    ctx.Reservation.Remove(item);
                }
                ctx.SaveChanges();
                // o a dolgozo
                var munkaja = ctx.Reservation.Include(b => b.Guest).Include(c => c.Service).Where(a => a.Worker_Id == userId && a.Datetime > DateTime.Now).ToList();

                foreach (var item in munkaja)
                {

                    var guestEmail = item.Guest.Email;
                    var guestName = $"{item.Guest.Surname + " " + item.Guest.Firstname}";
                    var service = item.Service.Name;
                    var datum = item.Datetime;
                    var pontosido = item.Appointment;
                    ctx.Reservation.Remove(item);
                    if (!string.IsNullOrEmpty(guestEmail))
                    {
                        MailMessage mail = new MailMessage();
                        mail.From = new MailAddress("szepsegeden@gmail.com");
                        mail.To.Add(guestEmail);
                        mail.Subject = "Időpont törlés";
                        mail.Body = $"Kedves {guestName}!\n\n" +
                                    $"Értesítjük, hogy az Ön által {datum.ToShortDateString()} {pontosido} időpontra lefoglalt {service} szolgáltatása törlésre került.\n\n" +
                                    "Amennyiben kérdése van, kérjük, vegye fel velünk a kapcsolatot.\n\n" +
                                    "Üdvözlettel:\n" +
                                    "Szépségedén csapata";
                        SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");
                        smtpServer.Port = 587;
                        smtpServer.Credentials = new NetworkCredential("szepsegeden@gmail.com", "uyfp tlch omxk pnup");
                        smtpServer.EnableSsl = true;
                        smtpServer.Send(mail);
                    }

                }
                ctx.SaveChanges();

                var multmunka = ctx.Reservation.Include(b => b.Guest).Include(c => c.Service).Where(a => a.Worker_Id == userId).ToList();
                foreach (var item in multmunka)
                {
                    ctx.Reservation.Remove(item);
                }
                ctx.SaveChanges();

                // userservices
                var userservices = ctx.Userservices.Where(a => a.User_Id == userId).ToList();
                foreach (var item in userservices)
                {
                    ctx.Userservices.Remove(item);
                }
                ctx.SaveChanges();
                // Workingböl
                var working = ctx.Workinghours.Where(a => a.User_Id == userId).ToList();
                foreach (var item in working)
                {
                    ctx.Workinghours.Remove(item);
                }
                ctx.SaveChanges();
                // User törlés
                var user = ctx.User.Where(a => a.Id == userId).FirstOrDefault();
                ctx.User.Remove(user);
                ctx.SaveChanges();

                frissit();
                MessageBox.Show("Sikeresen törölte a dolgozó profilját és foglalásait!", "Info", MessageBoxButton.OK, MessageBoxImage.Information);

            }
            else
            {
                var selecteditem = listBox.SelectedItem.ToString();
                var userId = int.Parse(listBox.SelectedItem.ToString().Split(' ')[0]);

                var foglalt = ctx.Reservation.Include(b => b.Guest).Include(c => c.Service).Where(a => a.Guest_Id == userId && a.Datetime > DateTime.Now).ToList();

                foreach (var item in foglalt)
                {

                    var guestEmail = item.Guest.Email;
                    var guestName = $"{selecteditem.Split(' ')[3].Split(':')[1]}";
                    var service = item.Service.Name;
                    var datum = item.Datetime;
                    var pontosido = item.Appointment;
                    ctx.Reservation.Remove(item);
                    if (!string.IsNullOrEmpty(guestEmail))
                    {
                        MailMessage mail = new MailMessage();
                        mail.From = new MailAddress("szepsegeden@gmail.com");
                        mail.To.Add(guestEmail);
                        mail.Subject = "Időpont törlés";
                        mail.Body = $"Kedves {guestName}!\n\n" +
                                    $"Értesítjük, hogy az Ön által {datum.ToShortDateString()} {pontosido} időpontra lefoglalt {service} szolgáltatása törlésre került.\n\n" +
                                    "Amennyiben kérdése van, kérjük, vegye fel velünk a kapcsolatot.\n\n" +
                                    "Üdvözlettel:\n" +
                                    "Szépségedén csapata";
                        SmtpClient smtpServer = new SmtpClient("smtp.gmail.com");
                        smtpServer.Port = 587;
                        smtpServer.Credentials = new NetworkCredential("szepsegeden@gmail.com", "uyfp tlch omxk pnup");
                        smtpServer.EnableSsl = true;
                        smtpServer.Send(mail);
                    }
                }
                ctx.SaveChanges();
                var multfoglalas = ctx.Reservation.Include(b => b.Guest).Include(c => c.Service).Where(a => a.Guest_Id == userId).ToList();
                foreach (var item in multfoglalas)
                {
                    ctx.Reservation.Remove(item);
                }
                ctx.SaveChanges();

                var user = ctx.User.Where(a => a.Id == userId).FirstOrDefault();
                ctx.User.Remove(user);
                ctx.SaveChanges();

                frissit();
                MessageBox.Show("Sikeresen törölte a felhasználó profilját és foglalásait!", "Info", MessageBoxButton.OK, MessageBoxImage.Information);

            }
        }
    }
}
