using System.Windows;

namespace SzepsegedenWPF
{
    public partial class Menu : Window
    {
        public Menu()
        {
            InitializeComponent();
        }

        private void felvetel_Click(object sender, RoutedEventArgs e)
        {
            Felvetel felvetel = new Felvetel();
            felvetel.Show();
            Close();
        }

        private void torol_Click(object sender, RoutedEventArgs e)
        {
            Torles torles = new Torles();
            torles.Show();
            Close();
        }
    }
}
