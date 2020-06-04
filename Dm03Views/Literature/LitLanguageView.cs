using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;


namespace Dm03Views.Literature {
    public class LitLanguageView {
        [JsonProperty(PropertyName = "iso3")]
        [Required]
        [Display(Description="Language Iso 3 code",Name="Iso 3 code",Prompt="Enter Iso 3 code",ShortName="Iso 3")]
        [StringLength(3,MinimumLength=2,ErrorMessage="Invalid Iso3")]
        public System.String  Iso3 { get; set; }

        [JsonProperty(PropertyName = "iso2")]
        [Required]
        [Display(Description="Language Iso 3 code",Name="Iso 2 code",Prompt="Enter Iso 2 code",ShortName="Iso 2")]
        [StringLength(3,MinimumLength=2,ErrorMessage="Invalid Iso2")]
        public System.String  Iso2 { get; set; }

        [JsonProperty(PropertyName = "languageName")]
        [Required]
        [Display(Description="Language Name (no more than 30 characters in length)",Name="Language Name",Prompt="Enter Language Name",ShortName="Language")]
        [StringLength(27,MinimumLength=2,ErrorMessage="Invalid LanguageName")]
        public System.String  LanguageName { get; set; }

    }
}

