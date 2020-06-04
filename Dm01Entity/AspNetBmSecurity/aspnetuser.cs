

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Dm01Entity.AspNetBmSecurity
{
    public class aspnetuser
    {
        [Required]
        [Display(Description = "User Id", Name = "User Id", Prompt = "Enter Id", ShortName = "User Id")]
        [StringLength(128, MinimumLength = 1, ErrorMessage = "Invalid")]
        public string Id { get; set; }

        [Display(Description = "User Email", Name = "User Email", Prompt = "Enter Email", ShortName = "User Email")]
        [StringLength(256, MinimumLength = 0, ErrorMessage = "Invalid")]
        public string Email { get; set; }

        [Required]
        [Display(Description = "Email Confirmed", Name = "Email Confirmed", Prompt = "Enter Email Confirmed", ShortName = "Email Confirmed")]
        public bool EmailConfirmed { get; set; }

        [Display(Description = "Phone Number", Name = "Phone Number", Prompt = "Enter Phone Number", ShortName = "Phone Number")]
        public string PhoneNumber { get; set; }

        [Required]
        [Display(Description = "Phone Number Confirmed", Name = "Phone Number Confirmed", Prompt = "Enter Phone Number Confirmed", ShortName = "Phone Number Confirmed")]
        public bool PhoneNumberConfirmed { get; set; }

        [Required]
        [Display(Description = "Two Factor Enabled", Name = "Two Factor Enabled", Prompt = "Enter Two Factor Enabled", ShortName = "Two Factor Enabled")]
        public bool TwoFactorEnabled { get; set; }

        [Display(Description = "Lockout End Date Utc", Name = "Lockout End Date Utc", Prompt = "Enter Lockout End Date Utc", ShortName = "Lockout End Date Utc")]
        public DateTime? LockoutEndDateUtc { get; set; }

        [Required]
        [Display(Description = "Lockout Enabled", Name = "Lockout Enabled", Prompt = "Enter Lockout Enabled", ShortName = "Lockout Enabled")]
        public bool LockoutEnabled { get; set; }

        [Required]
        [Display(Description = "Access Failed Count", Name = "Access Failed Count", Prompt = "Enter Access Failed Count", ShortName = "Access Failed Count")]
        public int AccessFailedCount { get; set; }

        [Display(Description = "User Name", Name = "User Name", Prompt = "Enter User Name", ShortName = "User Name")]
        [StringLength(256, MinimumLength = 1, ErrorMessage = "Invalid")]
        public string UserName { get; set; }


        public virtual ICollection<aspnetuserroles> UserRoles { get; set; }
        public virtual ICollection<aspnetusermask> UserMasks { get; set; }
    }
}

