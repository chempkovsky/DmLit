using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dm01Entity.Literature
{
    public class LitGenre
    {
        // [Key] will be defined by the Fluent API
        // [DatabaseGenerated(DatabaseGeneratedOption.None)]  will be defined by the Fluent API
        [Display(Description = "Row id", Name = "Id of the genre", 
            Prompt = "Id of the genre", ShortName = "Genre Id")]
        [Required]
        public int GenreId { get; set; }

        [Display(Description = "Name of the genre", Name = "Name of the genre", 
            Prompt = "Name of the genre", ShortName = "Genre Name")]
        [StringLength(20, MinimumLength = 3, ErrorMessage = "Invalid")]
        [Required]
        public string GenreName { get; set; }

        public List<LitManuscript> Manuscripts { get; set; }
    }
}
