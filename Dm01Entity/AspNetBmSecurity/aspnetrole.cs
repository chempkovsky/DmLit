

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Dm01Entity.AspNetBmSecurity
{
    public class aspnetrole
    {
        [Required]
        [Display(Description = "Role Id", Name = "Role Id", Prompt = "Enter Id", ShortName = "Id")]
        [StringLength(128, MinimumLength = 1, ErrorMessage = "Invalid")]
        public string Id { get; set; }

        [Required]
        [Display(Description = "Role Name", Name = "Role Name", Prompt = "Enter RoleName", ShortName = "Role Name")]
        [StringLength(128, MinimumLength = 1, ErrorMessage = "Invalid")]
        public string Name { get; set; }

        public virtual ICollection<aspnetuserroles> UserRoles { get; set; }
    }
}


