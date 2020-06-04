using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;


namespace Dm03Views.Literature {
    public class LitPublisherView {
        [JsonProperty(PropertyName = "publisherId")]
        [Required]
        [Display(Description="Row id",Name="Id of the Publisher",Prompt="Enter Id of the Publisher",ShortName="Publisher Id")]
        public System.Int32  PublisherId { get; set; }

        [JsonProperty(PropertyName = "publisherName")]
        [Required]
        [Display(Description="Publisher Name (no more than 20 characters in length)",Name="Publisher Name",Prompt="Enter Publisher Name",ShortName="Publisher Name")]
        [StringLength(40,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  PublisherName { get; set; }

        [JsonProperty(PropertyName = "iso3CntrRef")]
        [Required]
        [Display(Description="Publisher Country Iso 3 code",Name="Publisher Country Iso 3 code",Prompt="Enter Publisher Country Iso 3 code",ShortName="Publisher Country Iso 3")]
        [StringLength(3,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  Iso3CntrRef { get; set; }

        [JsonProperty(PropertyName = "iso2CntrRef")]
        [Required]
        [Display(Description="Publisher Country Iso 2 code",Name="Iso 2 code",Prompt="Enter Publisher Country Iso 2 code",ShortName="Publisher Country Iso 2")]
        [StringLength(3,MinimumLength=2,ErrorMessage="Invalid")]
        public System.String  Iso2CntrRef { get; set; }

        [JsonProperty(PropertyName = "cCountryName")]
        [Required]
        [Display(Description="Country Name (no more than 30 characters in length)",Name="Country Name",Prompt="Enter Country Name",ShortName="Country")]
        [StringLength(40,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  CCountryName { get; set; }

    }
}

