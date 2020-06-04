using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;


namespace Dm03Views.Literature {
    public class LitEditionView {
        [Required]
        [Display(Description="Row id",Name="Id of the edition",Prompt="Enter Id of the edition",ShortName="Edition Id")]
        public System.Int32  editionId { get; set; }

        [Display(Description="Name of the edition",Name="Name of the edition",Prompt="Enter the Name of the edition",ShortName="Edition Name")]
        [StringLength(40,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  editionName { get; set; }

    }
}

