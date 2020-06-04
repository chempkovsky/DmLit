

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Dm01Entity.AspNetBmSecurity
{
    public class aspnetmodel
    {
        [Required]
        [Display(Description = "Model Id", Name = "Model Id", Prompt = "Enter Model Id", ShortName = "Id")]
        public int ModelPk { get; set; }

        [Required]
        [Display(Description = "Model Name", Name = "Model Name", Prompt = "Enter ModelName", ShortName = "Name")]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Invalid")]
        public string ModelName { get; set; }

        [Display(Description = "Model Description", Name = "Model Description", Prompt = "Enter ModelDescription", ShortName = "Description")]
        [StringLength(50, MinimumLength = 1, ErrorMessage = "Invalid")]
        public string ModelDescription { get; set; }

    }
}

