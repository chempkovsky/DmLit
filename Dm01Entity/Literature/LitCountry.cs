using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dm01Entity.Literature
{
    public class LitCountry
    {
        //[Key]
        //[Column("Iso3", Order = 0)] // zero-based order of the column the property is mapped to
        [Display(Description = "Country Iso 3 code", Name = "Iso 3 code", Prompt = "Enter Iso 3 code", ShortName = "Iso 3")]
        [StringLength(3, MinimumLength = 3, ErrorMessage = "Invalid")]
        [Required]
        public string Iso3 { get; set; }

        //[Key]
        //[Column("Iso2", Order = 1)]
        [Display(Description = "Country Iso 3 code", Name = "Iso 2 code", Prompt = "Enter Iso 2 code", ShortName = "Iso 2")]
        [StringLength(3, MinimumLength = 2, ErrorMessage = "Invalid")]
        [Required]
        public string Iso2 { get; set; }

        [Display(Description = "Country Name (no more than 30 characters in length)", Name = "Country Name", Prompt = "Enter Country Name", ShortName = "Country")]
        [StringLength(40, MinimumLength = 3, ErrorMessage = "Invalid")]
        [Required]
        public string CountryName { get; set; }

        public List<LitDialect> Dialects { get; set; }

        public List<LitPublisher> Publishers { get; set; }

        public List<LitAuthor> Authors { get; set; }

    }
}
