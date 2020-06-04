using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;


namespace Dm03Views.Literature {
    public class LitAuthorView {
        [JsonProperty(PropertyName = "authorId")]
        [Required]
        [Display(Description="Row id",Name="Id of the Author",Prompt="Enter Id of the Author",ShortName="Author Id")]
        public System.Int32  AuthorId { get; set; }

        [JsonProperty(PropertyName = "firstName")]
        [Required]
        [Display(Description="First Name (no more than 16 characters in length)",Name="First Name",Prompt="Enter First Name",ShortName="First Name")]
        [StringLength(16,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  FirstName { get; set; }

        [JsonProperty(PropertyName = "lastName")]
        [Required]
        [Display(Description="Last Name (no more than 20 characters in length)",Name="Last Name",Prompt="Enter Last Name",ShortName="Last Name")]
        [StringLength(30,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  LastName { get; set; }

        [JsonProperty(PropertyName = "birthDate")]
        [Display(Description="Birth Date",Name="Birth Date",Prompt="Enter Birth Date",ShortName="Birth Date")]
        [DataType(DataType.Date)]
        public System.DateTime ?  BirthDate { get; set; }

        [JsonProperty(PropertyName = "deathDate")]
        [Display(Description="Birth Date (Required)",Name="Birth Date",Prompt="Enter Birth Date",ShortName="Birth Date")]
        [DataType(DataType.Date)]
        public System.DateTime ?  DeathDate { get; set; }

        [JsonProperty(PropertyName = "iso3CntrRef")]
        [Required]
        [Display(Description="Birth Country Iso 3 code",Name="Birth Country Iso 3 code",Prompt="Enter Birth Country Iso 3 code",ShortName="Birth Country Iso 3")]
        [StringLength(3,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  Iso3CntrRef { get; set; }

        [JsonProperty(PropertyName = "iso2CntrRef")]
        [Required]
        [Display(Description="Birth Country Iso 2 code",Name="Iso 2 code",Prompt="Enter Birth Country Iso 2 code",ShortName="Birth Country Iso 2")]
        [StringLength(3,MinimumLength=2,ErrorMessage="Invalid")]
        public System.String  Iso2CntrRef { get; set; }

        [JsonProperty(PropertyName = "cCountryName")]
        [Required]
        [Display(Description="Country Name (no more than 30 characters in length)",Name="Country Name",Prompt="Enter Country Name",ShortName="Country")]
        [StringLength(40,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  CCountryName { get; set; }

    }
}

