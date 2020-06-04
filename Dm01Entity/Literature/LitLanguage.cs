using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dm01Entity.Literature
{
    public class LitLanguage
    {
        //[Key]
        //[Column("Iso3", Order = 0)] // zero-based order of the column the property is mapped to
        [Display(Description = "Language Iso 3 code", Name = "Iso 3 code", Prompt = "Enter Iso 3 code", ShortName = "Iso 3")]
        [StringLength(3, MinimumLength = 2, ErrorMessage = "Invalid Iso3")]
        [Required]
        public string Iso3 { get; set; }


        //[Key]
        //[Column("Iso2", Order = 1)]
        [Display(Description = "Language Iso 3 code", Name = "Iso 2 code", Prompt = "Enter Iso 2 code", ShortName = "Iso 2")]
        [StringLength(3, MinimumLength = 2, ErrorMessage = "Invalid Iso2")]
        [Required]
        public string Iso2 { get; set; }


        [Display(Description = "Language Name (no more than 30 characters in length)", Name = "Language Name", Prompt = "Enter Language Name", ShortName = "Language")]
        [StringLength(27, MinimumLength = 2, ErrorMessage = "Invalid LanguageName")]
        [Required]
        public string LanguageName { get; set; }

        public List<LitDialect> Dialects { get; set; }
    }
}
