using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dm01Entity.Literature
{
    public class LitDialect
    {

        [Display(Description = "Dialect Id", Name = "Dialect Id", Prompt = "Dialect Id", ShortName = "Id")]
        [StringLength(14, MinimumLength = 5, ErrorMessage = "Invalid")]
        [Required]
        public string DialectId { get; set; }

        [Display(Description = "Dialect Name (no more than 40 characters in length)", Name = "Dialect Name", Prompt = "Enter Dialect Name", ShortName = "Dialect")]
        [StringLength(52, MinimumLength = 2, ErrorMessage = "Invalid")]
        [Required]
        public string DialectName { get; set; }

        [Display(Description = "Country Iso 3 code", Name = "Country Iso 3 code", Prompt = "Enter Country Iso 3 code", ShortName = "Country Iso 3")]
        [StringLength(3, MinimumLength = 3, ErrorMessage = "Invalid")]
        [Required]
        public string Iso3CntrRef { get; set; }
        [Display(Description = "Country Iso 2 code", Name = "Iso 2 code", Prompt = "Enter Country Iso 2 code", ShortName = "Country Iso 2")]
        [StringLength(3, MinimumLength = 2, ErrorMessage = "Invalid")]
        [Required]
        public string Iso2CntrRef { get; set; }
        public LitCountry Country { get; set; }

        [Display(Description = "Language Iso 3 code", Name = "Iso 3 code", Prompt = "Enter Language Iso 3 code", ShortName = "Language Iso 3")]
        [StringLength(3, MinimumLength = 3, ErrorMessage = "Invalid")]
        [Required]
        public string Iso3LngRef { get; set; }
        [Display(Description = "Language Iso 2 code", Name = "Iso 2 code", Prompt = "Enter Language Iso 2 code", ShortName = "Language Iso 2")]
        [StringLength(3, MinimumLength = 2, ErrorMessage = "Invalid")]
        [Required]
        public string Iso2LngRef { get; set; }
        public LitLanguage Language { get; set; }
        
        public List<LitManuscript> Manuscripts { get; set; }
    }
}
