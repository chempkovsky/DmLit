using Dm02Context.AspNetBmSecurity;
using Dm02Context.Literature;
using Dm05WpfApp.Helpers;
using System;
using System.Collections.Generic;
using System.Data.Entity;
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
using System.Windows.Navigation;
using System.Windows.Shapes;

namespace Dm05WpfApp
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public MainWindow()
        {
            InitializeComponent();
        }
        private void MenuItem_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        private void Window_Closing(object sender, System.ComponentModel.CancelEventArgs e)
        {
            if (MessageBox.Show("Exit Application?", "Exit", MessageBoxButton.YesNo) == MessageBoxResult.No)
            {
                e.Cancel = true;
            }
        }

        private void MenuItem_Click_10(object sender, RoutedEventArgs e)
        {
            DataTextBox.Text = DbHelpers.Gengers2string();
        }

        private void MenuItem_Click_1(object sender, RoutedEventArgs e)
        {
            // Create db
            Database.SetInitializer(
                new DropCreateDatabaseAlways<LitDbContext>());
            LitDbContext db = new LitDbContext();
            db.LitGenreDbSet.FirstOrDefault();
            MessageBox.Show("The database was successfully created.", "Done", MessageBoxButton.OK, MessageBoxImage.Information);
            Database.SetInitializer(new CreateDatabaseIfNotExists<LitDbContext>());
        }

        private void MenuItem_Click_11(object sender, RoutedEventArgs e)
        {
            LitDbContext db = new LitDbContext();
            try
            {
                db.PopulateGengers();
                MessageBox.Show("The Gengers was successfully saved.", "Done", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            catch (Exception expt)
            {
                ErrorTextBox.Text = expt.Message;
            }

        }

        private void MenuItem_Click_9(object sender, RoutedEventArgs e)
        {
            LitDbContext db = new LitDbContext();
            try
            {
                db.PopulateEditions();
                MessageBox.Show("The Editions was successfully saved.", "Done", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            catch (Exception expt)
            {
                ErrorTextBox.Text = expt.Message;
            }

        }

        private void MenuItem_Click_6(object sender, RoutedEventArgs e)
        {
            LitDbContext db = new LitDbContext();
            try
            {
                db.PopulateCounties();
                MessageBox.Show("The Counties was successfully saved.", "Done", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            catch (Exception expt)
            {
                ErrorTextBox.Text = expt.Message;
            }
        }


        private void MenuItem_Click_2(object sender, RoutedEventArgs e)
        {
            DataTextBox.Text = DbHelpers.Languages2string();
        }

        private void MenuItem_Click_3(object sender, RoutedEventArgs e)
        {
            DataTextBox.Text = DbHelpers.Dialects2string();
        }

        private void MenuItem_Click_4(object sender, RoutedEventArgs e)
        {
            DataTextBox.Text = DbHelpers.Counties2string();
        }


        private void MenuItem_Click_5(object sender, RoutedEventArgs e)
        {
            LitDbContext db = new LitDbContext();
            try
            {
                db.PopulateLanguages();
                MessageBox.Show("The Languages was successfully saved.", "Done", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            catch (Exception expt)
            {
                ErrorTextBox.Text = expt.Message;
            }

        }

        private void MenuItem_Click_14(object sender, RoutedEventArgs e)
        {
            LitDbContext db = new LitDbContext();
            try
            {
                db.PopulateDialects();
                MessageBox.Show("The Dialects was successfully saved.", "Done", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            catch (Exception expt)
            {
                ErrorTextBox.Text = expt.Message;
            }
        }


        private void MenuItem_Click_8(object sender, RoutedEventArgs e)
        {
            DataTextBox.Text = DbHelpers.Editions2string();
        }



        private void MenuItem_Click_12(object sender, RoutedEventArgs e)
        {
            LitDbContext db = new LitDbContext();
            try
            {
                db.PopulateAuthors();
                MessageBox.Show("The Authors was successfully saved.", "Done", MessageBoxButton.OK, MessageBoxImage.Information);
            }
            catch (Exception expt)
            {
                ErrorTextBox.Text = expt.Message;
            }

        }

        private void MenuItem_Click_13(object sender, RoutedEventArgs e)
        {
            DataTextBox.Text = DbHelpers.Dialects2string();
        }


        private void MenuItem_Click_15(object sender, RoutedEventArgs e)
        {
            /*            
                        Database.SetInitializer(new DropCreateDatabaseAlways<securitydbcontext>());
                        securitydbcontext db = new securitydbcontext();
                        db.securitymodelDbSet.FirstOrDefault();
                        MessageBox.Show("The database was successfully created.", "Done", MessageBoxButton.OK, MessageBoxImage.Information);
                        Database.SetInitializer(new CreateDatabaseIfNotExists<securitydbcontext>());
            */
        }

        private void MenuItem_Click_16(object sender, RoutedEventArgs e)
        {
            
            Database.SetInitializer(new DropCreateDatabaseAlways<aspnetchckdbcontext>());
            aspnetchckdbcontext db = new aspnetchckdbcontext();
            db.aspnetdashboardDbSet.FirstOrDefault();
            MessageBox.Show("The database was successfully created.", "Done", MessageBoxButton.OK, MessageBoxImage.Information);
            Database.SetInitializer(new CreateDatabaseIfNotExists<aspnetchckdbcontext>());
            
        }

    }
}
