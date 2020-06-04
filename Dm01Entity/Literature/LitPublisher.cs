using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dm01Entity.Literature
{
    public class LitPublisher
    {
        //[Key]
        //[Column("PublisherId", Order = 0)] // zero-based order of the column the property is mapped to
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Display(Description = "Row id", Name = "Id of the Publisher", Prompt = "Enter Id of the Publisher", ShortName = "Publisher Id")]
        [Required]
        public int PublisherId { get; set; }

        [Display(Description = "Publisher Name (no more than 20 characters in length)", Name = "Publisher Name", Prompt = "Enter Publisher Name", ShortName = "Publisher Name")]
        [StringLength(40, MinimumLength = 3, ErrorMessage = "Invalid")]
        [Required]
        public string PublisherName { get; set; }

        



        [Display(Description = "Publisher Country Iso 3 code", Name = "Publisher Country Iso 3 code", Prompt = "Enter Publisher Country Iso 3 code", ShortName = "Publisher Country Iso 3")]
        [StringLength(3, MinimumLength = 3, ErrorMessage = "Invalid")]
        [Required]
        public string Iso3CntrRef { get; set; }


        [Display(Description = "Publisher Country Iso 2 code", Name = "Iso 2 code", Prompt = "Enter Publisher Country Iso 2 code", ShortName = "Publisher Country Iso 2")]
        [StringLength(3, MinimumLength = 2, ErrorMessage = "Invalid")]
        [Required]
        public string Iso2CntrRef { get; set; }
        public LitCountry Country { get; set; }



       public List<LitBook> LitBooks { get; set; }

    }
}
