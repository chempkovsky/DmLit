using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;


namespace Dm03Views.Literature {
    public class LitCountryView {
        [JsonProperty(PropertyName = "iso3")]
        [Required]
        [Display(Description="Country Iso 3 code",Name="Iso 3 code",Prompt="Enter Iso 3 code",ShortName="Iso 3")]
        [StringLength(3,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  Iso3 { get; set; }

        [JsonProperty(PropertyName = "iso2")]
        [Required]
        [Display(Description="Country Iso 3 code",Name="Iso 2 code",Prompt="Enter Iso 2 code",ShortName="Iso 2")]
        [StringLength(3,MinimumLength=2,ErrorMessage="Invalid")]
        public System.String  Iso2 { get; set; }

        [JsonProperty(PropertyName = "countryName")]
        [Required]
        [Display(Description="Country Name (no more than 30 characters in length)",Name="Country Name",Prompt="Enter Country Name",ShortName="Country")]
        [StringLength(40,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  CountryName { get; set; }

    }
}

