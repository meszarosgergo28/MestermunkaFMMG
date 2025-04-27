using System.Linq;
using System.Windows;
using SzepsegedenLibrary.Database;
using System.Data.Entity;
using SzepsegedenLibrary.Models;
using System.Net.Mail;
using System.Net;
using System;

namespace SzepsegedenWPF
{
    public partial class Dolgozo : Window
    {
        SzepsegedenContext ctx = new SzepsegedenContext();

        public int id;
        public Dolgozo(int id)
        {
            this.id = id;
            InitializeComponent();
            var nev = ctx.Reservation.Include(a => a.Worker).Where(b => b.Worker_Id == id).Select(b => new {Nev = b.Worker.Surname + " " + b.Worker.Firstname}).First();
            label.Content = $"{nev.Nev}";
            frissit(id);
        }
        public void frissit(int id)
        {
            listBox.Items.Clear();
            var result = ctx.Reservation.Include(a => a.Service).Include(c => c.Worker).Where(x => x.Worker_Id == id && x.Datetime > DateTime.Now).Select(b => new { Id = b.Id, Szolgáltatás = b.Service.Name, Idopont = b.Datetime, Ido = b.Appointment, Vendeg = b.Guest.Surname + " " +b.Guest.Firstname}).OrderBy(a => a.Idopont);
            foreach (var item in result)
            {
                listBox.Items.Add($"{item.Id} {item.Szolgáltatás} Időpont: {item.Idopont.ToShortDateString()} {item.Ido} Vendég neve: {item.Vendeg}");
            }
        }

        private void Torol(object sender, RoutedEventArgs e)
        {
            if (listBox.SelectedIndex == -1)
            {
                MessageBox.Show("Először válassza ki a törölni kívánt elemet!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            var foglalasId = int.Parse(listBox.SelectedItem.ToString().Split(' ')[0]);
            var foglalt = ctx.Reservation.Include(b => b.Guest).Include(c => c.Service).Where(a => a.Id == foglalasId).FirstOrDefault();
            var guestEmail = foglalt.Guest.Email;
            var guestName = $"{foglalt.Guest.Surname} {foglalt.Guest.Firstname}";
            var service = foglalt.Service.Name;
            var datum = foglalt.Datetime;
            var pontosido = foglalt.Appointment;
            ctx.Reservation.Remove(foglalt);
            ctx.SaveChanges();
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
            frissit(id);
            MessageBox.Show("Sikeres törlés!", "Info", MessageBoxButton.OK, MessageBoxImage.Information);
        }
    }
}
