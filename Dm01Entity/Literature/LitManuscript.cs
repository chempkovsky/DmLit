using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dm01Entity.Literature
{
    public class LitManuscript
    {
        [Key] 
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]  
        [Display(Description = "Row id", Name = "Id of the Manuscript", Prompt = "Id of the Manuscript", ShortName = "Manuscript Id")]
        [DataType(DataType.Currency)]
        [Required]
        public int ManuscriptId { get; set; }

        [Display(Description = "Manuscript Title (no more than 60 characters in length)", Name = "Manuscript Name", Prompt = "Enter Manuscript Title", ShortName = "Title")]
        [StringLength(60, MinimumLength = 3, ErrorMessage = "Invalid")]
        [Required]
        public string ManuscriptTitle { get; set; }

        [Display(Description = "Date Of Manuscript Completion (not Required)", Name = "Completion Date", Prompt = "Enter Completion Date", ShortName = "Completion Date")]
        [DataType(DataType.Date)]
        [Required]
        public DateTime CompletionDate { get; set; }

        [DataType(DataType.Date)]
        [Display(Description = "Date Of Manuscript Beginning (not Required)", Name = "Beginning Date", Prompt = "Enter Beginning Date", ShortName = "Completion Date")]
        public Nullable<DateTime> BeginningDate { get; set; }



        
        [Display(Description = "Row id", Name = "Id of the Author", Prompt = "Enter Id of the Author", ShortName = "Author Id")]
        [Required]
        public int AuthorIdRef { get; set; }
        public LitAuthor Author { get; set; }



        [Display(Description = "Row id", Name = "Id of the genre", Prompt = "Id of the genre", ShortName = "Genre Id")]
        [Required]
        public int GenreIdRef { get; set; }
        public LitGenre Genre { get; set; }



        [StringLength(14, MinimumLength = 5, ErrorMessage = "Invalid")]
        [Required]
        public string DialectIdRef { get; set; }
        public LitDialect Dialect { get; set; }


        public ICollection<LitBook> LitBooks { get; set; }

    }
}
