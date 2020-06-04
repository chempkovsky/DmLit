

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace Dm01Entity.AspNetBmSecurity
{
    public class aspnetrolemask
    {
        
        [Required]
        [Display(Description = "Role Name", Name = "Role Name", Prompt = "Enter RoleName", ShortName = "Role Name")]
        [StringLength(128, MinimumLength = 1, ErrorMessage = "Invalid")]
        public string RoleName { get; set; }

        [Display(Description = "Role Description", Name = "Role Description", Prompt = "Enter Role Description", ShortName = "Description")]
        [StringLength(70, MinimumLength = 0, ErrorMessage = "Invalid")]
        public string RoleDescription { get; set; }

        [Display(Description = "Mask0", Name = "Mask0", Prompt = "Enter Mask0", ShortName = "Mask0")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 Mask0 { get; set; }

        [Display(Description = "Mask1", Name = "Mask1", Prompt = "Enter Mask1", ShortName = "Mask1")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 Mask1 { get; set; }

        [Display(Description = "Mask2", Name = "Mask2", Prompt = "Enter Mask2", ShortName = "Mask2")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 Mask2 { get; set; }

        [Display(Description = "Mask3", Name = "Mask3", Prompt = "Enter Mask3", ShortName = "Mask3")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 Mask3 { get; set; }

        [Display(Description = "Mask4", Name = "Mask4", Prompt = "Enter Mask4", ShortName = "Mask4")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 Mask4 { get; set; }

        [Display(Description = "Mask5", Name = "Mask5", Prompt = "Enter Mask5", ShortName = "Mask5")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 Mask5 { get; set; }

        [Display(Description = "Mask6", Name = "Mask6", Prompt = "Enter Mask6", ShortName = "Mask6")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 Mask6 { get; set; }

        [Display(Description = "Mask7", Name = "Mask7", Prompt = "Enter Mask7", ShortName = "Mask7")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 Mask7 { get; set; }

        [Display(Description = "Mask8", Name = "Mask8", Prompt = "Enter Mask8", ShortName = "Mask8")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 Mask8 { get; set; }

        [Display(Description = "Mask9", Name = "Mask9", Prompt = "Enter Mask9", ShortName = "Mask9")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 Mask9 { get; set; }

        [Display(Description = "MaskA", Name = "MaskA", Prompt = "Enter MaskA", ShortName = "MaskA")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 MaskA { get; set; }

        [Display(Description = "MaskB", Name = "MaskB", Prompt = "Enter MaskB", ShortName = "MaskB")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 MaskB { get; set; }

        [Display(Description = "MaskC", Name = "MaskC", Prompt = "Enter MaskC", ShortName = "MaskC")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 MaskC { get; set; }

        [Display(Description = "MaskD", Name = "MaskD", Prompt = "Enter MaskD", ShortName = "MaskD")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 MaskD { get; set; }


        [Display(Description = "Dask0", Name = "Dask0", Prompt = "Enter Dask0", ShortName = "Dask0")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 Dask0 { get; set; }

        [Display(Description = "Dask1", Name = "Dask1", Prompt = "Enter Dask1", ShortName = "Dask1")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 Dask1 { get; set; }

        [Display(Description = "Dask2", Name = "Dask2", Prompt = "Enter Dask2", ShortName = "Dask2")]
        [Required]
        [DataType("toBinaryFormatter")]
        public Int32 Dask2 { get; set; }


    }
}


