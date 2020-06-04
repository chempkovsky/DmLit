using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;


namespace Dm03Views.Literature {
    public class LitGenreView {
        [JsonProperty(PropertyName = "genreId")]
        [Required]
        [Display(Description="Row id",Name="Id of the genre",Prompt="Id of the genre",ShortName="Genre Id")]
        public System.Int32  GenreId { get; set; }

        [JsonProperty(PropertyName = "genreName")]
        [Required]
        [Display(Description="Name of the genre",Name="Name of the genre",Prompt="Name of the genre",ShortName="Genre Name")]
        [StringLength(20,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  GenreName { get; set; }

    }
}

