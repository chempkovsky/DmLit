using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;


namespace Dm03Views.Literature {
    public class LitDialectView {
        [JsonProperty(PropertyName = "dialectId")]
        [Required]
        [Display(Description="Dialect Id",Name="Dialect Id",Prompt="Dialect Id",ShortName="Id")]
        [StringLength(14,MinimumLength=5,ErrorMessage="Invalid")]
        public System.String  DialectId { get; set; }

        [JsonProperty(PropertyName = "dialectName")]
        [Required]
        [Display(Description="Dialect Name (no more than 40 characters in length)",Name="Dialect Name",Prompt="Enter Dialect Name",ShortName="Dialect")]
        [StringLength(52,MinimumLength=2,ErrorMessage="Invalid")]
        public System.String  DialectName { get; set; }

        [JsonProperty(PropertyName = "iso3CntrRef")]
        [Required]
        [Display(Description="Country Iso 3 code",Name="Country Iso 3 code",Prompt="Enter Country Iso 3 code",ShortName="Country Iso 3")]
        [StringLength(3,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  Iso3CntrRef { get; set; }

        [JsonProperty(PropertyName = "iso2CntrRef")]
        [Required]
        [Display(Description="Country Iso 2 code",Name="Iso 2 code",Prompt="Enter Country Iso 2 code",ShortName="Country Iso 2")]
        [StringLength(3,MinimumLength=2,ErrorMessage="Invalid")]
        public System.String  Iso2CntrRef { get; set; }

        [JsonProperty(PropertyName = "iso3LngRef")]
        [Required]
        [Display(Description="Language Iso 3 code",Name="Iso 3 code",Prompt="Enter Language Iso 3 code",ShortName="Language Iso 3")]
        [StringLength(3,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  Iso3LngRef { get; set; }

        [JsonProperty(PropertyName = "iso2LngRef")]
        [Required]
        [Display(Description="Language Iso 2 code",Name="Iso 2 code",Prompt="Enter Language Iso 2 code",ShortName="Language Iso 2")]
        [StringLength(3,MinimumLength=2,ErrorMessage="Invalid")]
        public System.String  Iso2LngRef { get; set; }

        [JsonProperty(PropertyName = "cCountryName")]
        [Required]
        [Display(Description="Country Name (no more than 30 characters in length)",Name="Country Name",Prompt="Enter Country Name",ShortName="Country")]
        [StringLength(40,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  CCountryName { get; set; }

        [JsonProperty(PropertyName = "lLanguageName")]
        [Required]
        [Display(Description="Language Name (no more than 30 characters in length)",Name="Language Name",Prompt="Enter Language Name",ShortName="Language")]
        [StringLength(27,MinimumLength=2,ErrorMessage="Invalid LanguageName")]
        public System.String  LLanguageName { get; set; }

    }
}

