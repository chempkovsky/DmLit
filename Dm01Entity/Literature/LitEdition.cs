using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dm01Entity.Literature
{
    public class LitEdition
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Display(Description = "Row id", Name = "Id of the edition", Prompt = "Enter Id of the edition", ShortName = "Edition Id")]
        [Required]
        public int EditionId { get; set; }

        [Display(Description = "Name of the edition", Name = "Name of the edition", Prompt = "Enter the Name of the edition", ShortName = "Edition Name")]
        [StringLength(40, MinimumLength = 3, ErrorMessage = "Invalid")]
        public string EditionName { get; set; }

        public List<LitBook> Books { get; set; }
    }
}
