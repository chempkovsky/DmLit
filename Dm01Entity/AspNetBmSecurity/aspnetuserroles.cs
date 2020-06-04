

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Dm01Entity.AspNetBmSecurity
{
    public class aspnetuserroles
    {
        [Required]
        [Display(Description = "User Id", Name = "User Id", Prompt = "Enter Id", ShortName = "User Id")]
        [StringLength(128, MinimumLength = 1, ErrorMessage = "Invalid")]
        public string UserId { get; set; }

        [Required]
        [Display(Description = "Role Id", Name = "Role Id", Prompt = "Enter Id", ShortName = "Role Id")]
        [StringLength(128, MinimumLength = 1, ErrorMessage = "Invalid")]
        public string RoleId { get; set; }

        public virtual aspnetuser AspNetUser { get; set; }

        public virtual aspnetrole AspNetRole { get; set; }
    }
}

