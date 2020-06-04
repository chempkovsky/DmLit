using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dm01Entity.Literature
{
    public class LitAuthor
    {
        //[Key]
        //[Column("AuthorId", Order = 0)] // zero-based order of the column the property is mapped to
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Display(Description = "Row id", Name = "Id of the Author", Prompt = "Enter Id of the Author", ShortName = "Author Id")]
        [Required]
        public int AuthorId { get; set; }

        [Display(Description = "First Name (no more than 16 characters in length)", Name = "First Name", Prompt = "Enter First Name", ShortName = "First Name")]
        [StringLength(16, MinimumLength = 3, ErrorMessage = "Invalid")]
        [Required]
        public string FirstName { get; set; }

        [Display(Description = "Last Name (no more than 20 characters in length)", Name = "Last Name", Prompt = "Enter Last Name", ShortName = "Last Name")]
        [StringLength(30, MinimumLength = 3, ErrorMessage = "Invalid")]
        [Required]
        public string LastName { get; set; }

        [Display(Description = "Birth Date", Name = "Birth Date", Prompt = "Enter Birth Date", ShortName = "Birth Date")]
        [DataType(DataType.Date)]
        public Nullable<DateTime> BirthDate { get; set; }

        [Display(Description = "Birth Date (Required)", Name = "Birth Date", Prompt = "Enter Birth Date", ShortName = "Birth Date")]
        [DataType(DataType.Date)]
        public DateTime? DeathDate { get; set; }
        





        [Display(Description = "Birth Country Iso 3 code", Name = "Birth Country Iso 3 code", Prompt = "Enter Birth Country Iso 3 code", ShortName = "Birth Country Iso 3")]
        [StringLength(3, MinimumLength = 3, ErrorMessage = "Invalid")]
        [Required]
        public string Iso3CntrRef { get; set; }


        [Display(Description = "Birth Country Iso 2 code", Name = "Iso 2 code", Prompt = "Enter Birth Country Iso 2 code", ShortName = "Birth Country Iso 2")]
        [StringLength(3, MinimumLength = 2, ErrorMessage = "Invalid")]
        [Required]
        public string Iso2CntrRef { get; set; }
        public LitCountry Country { get; set; }

        public List<LitManuscript> Manuscripts { get; set; }
    }
}
