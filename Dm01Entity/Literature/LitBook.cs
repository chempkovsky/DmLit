using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace Dm01Entity.Literature
{
    public class LitBook
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Display(Description = "Row id", Name = "Id of the Book", Prompt = "Id of the Book", ShortName = "Book Id")]
        public int BookId { get; set; }

        [Display(Description = "Title of the Literary Book", Name = "Title of the Literary Book", Prompt = "Enter the title of the Literary Book", ShortName = "Book Title")]
        [Required]
        [StringLength(55, MinimumLength = 3, ErrorMessage = "Invalid")]
        public string BookTitle { get; set; }

        [Display(Description = "Publication Date", Name = "Publication Date", Prompt = "Enter Publication Date", ShortName = "Publication Date")]
        public DateTime PublicationDate { get; set; }

        [Display(Description = "Book Price", Name = "Book Price", Prompt = "Enter Book Price", ShortName = "Book Price")]
        [DataType(DataType.Currency)]
        public Double Price { get; set; }




        [Display(Description = "Row id", Name = "Id of the Publisher", Prompt = "Enter Id of the Publisher", ShortName = "Publisher Id")]
        [Required]
        public int PublisherIdRef { get; set; }
        public LitPublisher Publisher { get; set; }





        [Display(Description = "Row id", Name = "Id of the Manuscript", Prompt = "Id of the Manuscript", ShortName = "Manuscript Id")]
        [Required]
        public int ManuscriptIdRef { get; set; }
        public LitManuscript Manuscript { get; set; }





        [Display(Description = "Row id", Name = "Id of the edition", Prompt = "Enter Id of the edition", ShortName = "Edition Id")]
        public int? EditionIdRef { get; set; }
        public LitEdition Edition { get; set; }
        
    }
}
