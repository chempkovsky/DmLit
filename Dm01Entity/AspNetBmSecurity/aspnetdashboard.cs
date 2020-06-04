

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Dm01Entity.AspNetBmSecurity
{
    public class aspnetdashboard
    {
        [Required]
        [Display(Description = "Dashboard Id", Name = "Dashboard Id", Prompt = "Enter Dashboard Id", ShortName = "Id")]
        public int DashboardPk { get; set; }

        [Required]
        [Display(Description = "Dashboard Name", Name = "Dashboard Name", Prompt = "Enter DashboardName", ShortName = "Name")]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Invalid")]
        public string DashboardName { get; set; }

        [Display(Description = "Dashboard Description", Name = "Dashboard Description", Prompt = "Enter DashboardDescription", ShortName = "Description")]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Invalid")]
        public string DashboardDescription { get; set; }

    }
}

