using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using SzepsegedenLibrary.Database;
using SzepsegedenLibrary.Models;
using System.Text.RegularExpressions;

namespace SzepsegedenWPF
{
    public partial class Felvetel : Window
    {
        SzepsegedenContext ctx = new SzepsegedenContext();
        public Felvetel()
        {
            InitializeComponent();
        }

        private void Create(object sender, RoutedEventArgs e)
        {
            // Adat eltárolás

            var hibak = new List<string>();
            var email = Email.Text.Trim();
            var jelszo = Password.Text.Trim();
            var jelszoUjra = Password_again.Text.Trim();
            var vezetek = Surname.Text.Trim();
            var kereszt = Firstname.Text.Trim();
            var telefonszam = Phone.Text.Trim();
            var munkaidok = new List<string>
            {
                MondayStart.Text.Trim(), MondayEnd.Text.Trim(),
                TuesdayStart.Text.Trim(), TuesdayEnd.Text.Trim(),
                WednesdayStart.Text.Trim(), WednesdayEnd.Text.Trim(),
                ThursdayStart.Text.Trim(), ThursdayEnd.Text.Trim(),
                FridayStart.Text.Trim(), FridayEnd.Text.Trim()
            };

            // Ellenőrzések

            var emailRegex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
            var foglaltemail = ctx.User.Where(a => a.Email == email).FirstOrDefault();


            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(jelszo) || string.IsNullOrWhiteSpace(jelszoUjra) || string.IsNullOrWhiteSpace(vezetek) || string.IsNullOrWhiteSpace(kereszt) || string.IsNullOrWhiteSpace(telefonszam))
            {
                hibak.Add("Minden mezőt ki kell tölteni!");
            }

            if (vezetek.Length < 2 || !Regex.IsMatch(vezetek, @"^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]+$"))
            {
                hibak.Add("A vezeteknévnek legalább 2 karakter hosszúnak kell lennie, és csak betűket tartalmazhat!");
            }

            if (kereszt.Length < 3 || !Regex.IsMatch(kereszt, @"^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]+$"))
            {
                hibak.Add("A keresztnévnek legalább 3 karakter hosszúnak kell lennie, és csak betűket tartalmazhat!");
            }

            foreach (var ido in munkaidok)
            {
                if (string.IsNullOrWhiteSpace(ido))
                {
                    hibak.Add("Minden munkaidőt ki kell tölteni!");
                    break;
                }
            }

            if (jelszo != jelszoUjra)
            {
                hibak.Add("A jelszavak nem egyeznek!");
            }

            if (!emailRegex.IsMatch(email))
            {
                hibak.Add("Érvénytelen email cím formátum!");
            }

            if (foglaltemail != null)
            {
                hibak.Add("Ez az email cím már regisztrálva van!");
            }

            if (!Regex.IsMatch(telefonszam, @"^\d{10,}$"))
            {
                hibak.Add("A telefonszám csak számjegyekből állhat és legalább 10 számjegy hosszú legyen!");
            }

            if (jelszo.Length < 8 || !jelszo.Any(char.IsUpper) || !jelszo.Any(char.IsDigit))
            {
                hibak.Add("A jelszónak legalább 8 karakter hosszúnak kell lennie, tartalmaznia kell legalább egy nagybetűt és egy számot!");
            }

            foreach (var ido in munkaidok)
            {
                if (!string.IsNullOrEmpty(ido))
                {
                    if (!TimeSpan.TryParse(ido, out _))
                    {
                        hibak.Add($"Érvénytelen idő formátum: {ido}. Helyes formátum például: 08:00");
                        break;
                    }
                }
            }

            if (!(Service1.IsChecked == true || Service2.IsChecked == true || Service3.IsChecked == true || Service4.IsChecked == true || Service5.IsChecked == true || Service6.IsChecked == true || Service7.IsChecked == true || Service8.IsChecked == true))
            {
                hibak.Add("Legalább egy szolgáltatást ki kell választani!");
            }

            if (hibak.Any())
            {
                MessageBox.Show(string.Join("\n", hibak), "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }

            // Mentések

            var user = ctx.User.Add(new User(email, jelszo, vezetek, kereszt, telefonszam, 3));
            ctx.SaveChanges();

            var checkBoxok = new List<CheckBox> { Service1, Service2, Service3, Service4, Service5, Service6, Service7, Service8 };

            for (int i = 0; i < checkBoxok.Count; i++)
            {
                if (checkBoxok[i].IsChecked == true)
                {
                    ctx.Userservices.Add(new Userservices(user.Id, i + 1));
                }
            }
            ctx.SaveChanges();

            ctx.Workinghours.Add(new Workinghours(user.Id, 1, munkaidok[0], munkaidok[1]));
            ctx.Workinghours.Add(new Workinghours(user.Id, 2, munkaidok[2], munkaidok[3]));
            ctx.Workinghours.Add(new Workinghours(user.Id, 3, munkaidok[4], munkaidok[5]));
            ctx.Workinghours.Add(new Workinghours(user.Id, 4, munkaidok[6], munkaidok[7]));
            ctx.Workinghours.Add(new Workinghours(user.Id, 5, munkaidok[8], munkaidok[9]));

            ctx.SaveChanges();

            MessageBox.Show("Sikeres felvétel!", "Info", MessageBoxButton.OK, MessageBoxImage.Information);

            // Érték nullázás

            Email.Text = "";Password.Text = "";Password_again.Text = "";Surname.Text = "";Firstname.Text = "";Phone.Text = "";
            Service1.IsChecked = false;Service2.IsChecked = false; Service3.IsChecked = false; Service4.IsChecked = false;
            Service5.IsChecked = false; Service6.IsChecked = false; Service7.IsChecked = false; Service8.IsChecked = false;
            MondayStart.Text = ""; MondayEnd.Text = "";
            TuesdayStart.Text = ""; TuesdayEnd.Text = "";
            WednesdayStart.Text = ""; WednesdayEnd.Text = "";
            ThursdayStart.Text = ""; ThursdayEnd.Text = "";
            FridayStart.Text = ""; FridayEnd.Text = "";
        }
        private void Menu(object sender, RoutedEventArgs e)
        {
            Menu menu = new Menu();
            menu.Show();
            Close();
        }
    }
}
