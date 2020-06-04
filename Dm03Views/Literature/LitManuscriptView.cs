using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;


namespace Dm03Views.Literature {
    public class LitManuscriptView {
        [JsonProperty(PropertyName = "manuscriptId")]
        [Required]
        [Display(Description="Row id",Name="Id of the Manuscript",Prompt="Id of the Manuscript",ShortName="Manuscript Id")]
        [DataType(DataType.Currency)]
        public System.Int32  ManuscriptId { get; set; }

        [JsonProperty(PropertyName = "manuscriptTitle")]
        [Required]
        [Display(Description="Manuscript Title (no more than 60 characters in length)",Name="Manuscript Name",Prompt="Enter Manuscript Title",ShortName="Title")]
        [StringLength(60,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  ManuscriptTitle { get; set; }

        [JsonProperty(PropertyName = "completionDate")]
        [Required]
        [Display(Description="Date Of Manuscript Completion (not Required)",Name="Completion Date",Prompt="Enter Completion Date",ShortName="Completion Date")]
        [DataType(DataType.Date)]
        public System.DateTime  CompletionDate { get; set; }

        [JsonProperty(PropertyName = "beginningDate")]
        [DataType(DataType.Date)]
        [Display(Description="Date Of Manuscript Beginning (not Required)",Name="Beginning Date",Prompt="Enter Beginning Date",ShortName="Completion Date")]
        public System.DateTime ?  BeginningDate { get; set; }

        [JsonProperty(PropertyName = "authorIdRef")]
        [Required]
        [Display(Description="Row id",Name="Id of the Author",Prompt="Enter Id of the Author",ShortName="Author Id")]
        public System.Int32  AuthorIdRef { get; set; }

        [JsonProperty(PropertyName = "genreIdRef")]
        [Required]
        [Display(Description="Row id",Name="Id of the genre",Prompt="Id of the genre",ShortName="Genre Id")]
        public System.Int32  GenreIdRef { get; set; }

        [JsonProperty(PropertyName = "dialectIdRef")]
        [Required]
        [StringLength(14,MinimumLength=5,ErrorMessage="Invalid")]
        public System.String  DialectIdRef { get; set; }

        [JsonProperty(PropertyName = "aFirstName")]
        [Required]
        [Display(Description="First Name (no more than 16 characters in length)",Name="First Name",Prompt="Enter First Name",ShortName="First Name")]
        [StringLength(16,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  AFirstName { get; set; }

        [JsonProperty(PropertyName = "aLastName")]
        [Required]
        [Display(Description="Last Name (no more than 20 characters in length)",Name="Last Name",Prompt="Enter Last Name",ShortName="Last Name")]
        [StringLength(30,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  ALastName { get; set; }

        [JsonProperty(PropertyName = "aBirthDate")]
        [Display(Description="Birth Date",Name="Birth Date",Prompt="Enter Birth Date",ShortName="Birth Date")]
        [DataType(DataType.Date)]
        public System.DateTime ?  ABirthDate { get; set; }

        [JsonProperty(PropertyName = "aDeathDate")]
        [Display(Description="Birth Date (Required)",Name="Birth Date",Prompt="Enter Birth Date",ShortName="Birth Date")]
        [DataType(DataType.Date)]
        public System.DateTime ?  ADeathDate { get; set; }

        [JsonProperty(PropertyName = "aCCountryName")]
        [Required]
        [Display(Description="Birth Country(no more than 30 characters in length)",Name="Birth Country",Prompt="Enter Birth Country",ShortName="Birth Country")]
        [StringLength(40,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  ACCountryName { get; set; }

        [JsonProperty(PropertyName = "gGenreName")]
        [Required]
        [Display(Description="Name of the genre",Name="Name of the genre",Prompt="Name of the genre",ShortName="Genre Name")]
        [StringLength(20,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  GGenreName { get; set; }

        [JsonProperty(PropertyName = "dDialectName")]
        [Required]
        [Display(Description="Dialect Name (no more than 40 characters in length)",Name="Dialect Name",Prompt="Enter Dialect Name",ShortName="Dialect")]
        [StringLength(52,MinimumLength=2,ErrorMessage="Invalid")]
        public System.String  DDialectName { get; set; }

        [JsonProperty(PropertyName = "dCCountryName")]
        [Required]
        [Display(Description="Dialect Country (no more than 30 characters in length)",Name="Dialect Country",Prompt="Enter Dialect Country",ShortName="Dialect Country")]
        [StringLength(40,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  DCCountryName { get; set; }

        [JsonProperty(PropertyName = "dLLanguageName")]
        [Required]
        [Display(Description="Dialect Language (no more than 30 characters in length)",Name="Dialect Language",Prompt="Enter Dialect Language",ShortName="Dialect Language")]
        [StringLength(27,MinimumLength=2,ErrorMessage="Invalid LanguageName")]
        public System.String  DLLanguageName { get; set; }

    }
}

