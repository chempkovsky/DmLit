using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;


namespace Dm03Views.Literature {
    public class LitBookView {
        [JsonProperty(PropertyName = "bookId")]
        [Required]
        [Display(Description="Row id",Name="Id of the Book",Prompt="Id of the Book",ShortName="Book Id")]
        public System.Int32  BookId { get; set; }

        [JsonProperty(PropertyName = "bookTitle")]
        [Required]
        [Display(Description="Title of the Literary Book",Name="Title of the Literary Book",Prompt="Enter the title of the Literary Book",ShortName="Book Title")]
        [StringLength(55,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  BookTitle { get; set; }

        [JsonProperty(PropertyName = "publicationDate")]
        [Required]
        [Display(Description="Publication Date",Name="Publication Date",Prompt="Enter Publication Date",ShortName="Publication Date")]
        public System.DateTime  PublicationDate { get; set; }

        [JsonProperty(PropertyName = "price")]
        [Required]
        [Display(Description="Book Price",Name="Book Price",Prompt="Enter Book Price",ShortName="Book Price")]
        [DataType(DataType.Currency)]
        public System.Double  Price { get; set; }

        [JsonProperty(PropertyName = "publisherIdRef")]
        [Required]
        [Display(Description="Row id",Name="Id of the Publisher",Prompt="Enter Id of the Publisher",ShortName="Publisher Id")]
        public System.Int32  PublisherIdRef { get; set; }

        [JsonProperty(PropertyName = "manuscriptIdRef")]
        [Required]
        [Display(Description="Row id",Name="Id of the Manuscript",Prompt="Id of the Manuscript",ShortName="Manuscript Id")]
        public System.Int32  ManuscriptIdRef { get; set; }

        [JsonProperty(PropertyName = "editionIdRef")]
        [Display(Description="Row id",Name="Id of the edition",Prompt="Enter Id of the edition",ShortName="Edition Id")]
        public System.Int32 ?  EditionIdRef { get; set; }

        [JsonProperty(PropertyName = "pPublisherName")]
        [Required]
        [Display(Description="Publisher Name (no more than 20 characters in length)",Name="Publisher Name",Prompt="Enter Publisher Name",ShortName="Publisher Name")]
        [StringLength(40,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  PPublisherName { get; set; }

        [JsonProperty(PropertyName = "pCCountryName")]
        [Required]
        [Display(Description="Publisher Country (no more than 30 characters in length)",Name="Publisher Country",Prompt="Enter Publisher Country",ShortName="Publisher Country")]
        [StringLength(40,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  PCCountryName { get; set; }

        [JsonProperty(PropertyName = "mManuscriptTitle")]
        [Required]
        [Display(Description="Manuscript Title (no more than 60 characters in length)",Name="Manuscript Name",Prompt="Enter Manuscript Title",ShortName="Title")]
        [StringLength(60,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  MManuscriptTitle { get; set; }

        [JsonProperty(PropertyName = "mCompletionDate")]
        [Required]
        [Display(Description="Date Of Manuscript Completion (not Required)",Name="Completion Date",Prompt="Enter Completion Date",ShortName="Completion Date")]
        [DataType(DataType.Date)]
        public System.DateTime  MCompletionDate { get; set; }

        [JsonProperty(PropertyName = "mAFirstName")]
        [Required]
        [Display(Description="First Name (no more than 16 characters in length)",Name="First Name",Prompt="Enter First Name",ShortName="First Name")]
        [StringLength(16,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  MAFirstName { get; set; }

        [JsonProperty(PropertyName = "mALastName")]
        [Required]
        [Display(Description="Last Name (no more than 20 characters in length)",Name="Last Name",Prompt="Enter Last Name",ShortName="Last Name")]
        [StringLength(30,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  MALastName { get; set; }

        [JsonProperty(PropertyName = "mABirthDate")]
        [Display(Description="Birth Date",Name="Birth Date",Prompt="Enter Birth Date",ShortName="Birth Date")]
        [DataType(DataType.Date)]
        public System.DateTime ?  MABirthDate { get; set; }

        [JsonProperty(PropertyName = "mACCountryName")]
        [Required]
        [Display(Description="Birth Country (no more than 30 characters in length)",Name="Birth Country",Prompt="Enter Birth Country",ShortName="Birth Country")]
        [StringLength(40,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  MACCountryName { get; set; }

        [JsonProperty(PropertyName = "mGGenreName")]
        [Required]
        [Display(Description="Manuscript Genre",Name="Manuscript Genre",Prompt="Enter Manuscript Genre",ShortName="Manuscript Genre")]
        [StringLength(20,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  MGGenreName { get; set; }

        [JsonProperty(PropertyName = "mDDialectName")]
        [Required]
        [Display(Description="Dialect Name (no more than 40 characters in length)",Name="Dialect Name",Prompt="Enter Dialect Name",ShortName="Dialect")]
        [StringLength(52,MinimumLength=2,ErrorMessage="Invalid")]
        public System.String  MDDialectName { get; set; }

        [JsonProperty(PropertyName = "mDCCountryName")]
        [Required]
        [Display(Description="Dialect Country (no more than 30 characters in length)",Name="Dialect Country",Prompt="Enter Dialect Country",ShortName="Dialect Country")]
        [StringLength(40,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  MDCCountryName { get; set; }

        [JsonProperty(PropertyName = "eEditionName")]
        [Display(Description="Name of the edition",Name="Name of the edition",Prompt="Enter the Name of the edition",ShortName="Edition Name")]
        [StringLength(40,MinimumLength=3,ErrorMessage="Invalid")]
        public System.String  EEditionName { get; set; }

    }
}

