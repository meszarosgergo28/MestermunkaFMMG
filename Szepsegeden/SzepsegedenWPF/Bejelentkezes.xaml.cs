using System.Linq;
using System.Windows;
using System.Windows.Controls;
using SzepsegedenLibrary.Database;
using SzepsegedenLibrary.UserManager;

namespace SzepsegedenWPF
{
    public partial class Bejelentkezes : Window
    {
        SzepsegedenContext ctx = new SzepsegedenContext();
        public Bejelentkezes()
        {
            InitializeComponent();
        }
        private void Bejelentkezes_Click(object sender, RoutedEventArgs e)
        {
            var email = Email.Text.Trim();
            var jelszo = Jelszo.Text.Trim();

            if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(jelszo))
            {
                MessageBox.Show("Minden mezőt ki kell tölteni!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                return;
            }
            var result = ctx.User.Where(a => a.Email == email).FirstOrDefault();
            if (result != null)
            {
                var valid = PasswordManager.VerifyPasswordHash(jelszo, result.PasswdHash, result.PasswdSalt);
                if (valid)
                {
                    if (result.Role_Id == 1)
                    {
                        MessageBox.Show("Sikeres Bejelentkezés!", "Info", MessageBoxButton.OK, MessageBoxImage.Information);
                        Menu menu = new Menu();
                        menu.Show();
                        Close();
                    }
                    else if(result.Role_Id == 3)
                    {
                        MessageBox.Show("Sikeres Bejelentkezés!", "Info", MessageBoxButton.OK, MessageBoxImage.Information);
                        Dolgozo dolgozo = new Dolgozo(result.Id);
                        dolgozo.Show();
                        Close();
                    }
                    else
                    {
                        Email.Text = "";
                        Jelszo.Text = "";
                        MessageBox.Show("Vendég felhasználóval nem lehet bejelentkezni!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                    }
                }
                else
                {
                    Email.Text = "";
                    Jelszo.Text = "";
                    MessageBox.Show("Hibás email cím vagy jelszó!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
                };
            }
            else
            {
                Email.Text = "";
                Jelszo.Text = "";
                MessageBox.Show("Hibás email cím vagy jelszó!", "Hiba", MessageBoxButton.OK, MessageBoxImage.Error);
            }
        }
    }
}
