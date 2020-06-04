using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;


namespace Dm03Views.AspNetBmSecurity {
    public class aspnetusermaskView {
        [JsonProperty(PropertyName = "userId")]
        [Required]
        [Display(Description="User Id",Name="User Id",Prompt="Enter Id",ShortName="User Id")]
        [StringLength(128,MinimumLength=1,ErrorMessage="Invalid")]
        public System.String  UserId { get; set; }

        [JsonProperty(PropertyName = "mask0")]
        [Required]
        [Display(Description="Mask0",Name="Mask0",Prompt="Enter Mask0",ShortName="Mask0")]
        [DataType("toBinaryFormatter")]
        public System.Int32  Mask0 { get; set; }

        [JsonProperty(PropertyName = "mask1")]
        [Required]
        [Display(Description="Mask1",Name="Mask1",Prompt="Enter Mask1",ShortName="Mask1")]
        [DataType("toBinaryFormatter")]
        public System.Int32  Mask1 { get; set; }

        [JsonProperty(PropertyName = "mask2")]
        [Required]
        [Display(Description="Mask2",Name="Mask2",Prompt="Enter Mask2",ShortName="Mask2")]
        [DataType("toBinaryFormatter")]
        public System.Int32  Mask2 { get; set; }

        [JsonProperty(PropertyName = "mask3")]
        [Required]
        [Display(Description="Mask3",Name="Mask3",Prompt="Enter Mask3",ShortName="Mask3")]
        [DataType("toBinaryFormatter")]
        public System.Int32  Mask3 { get; set; }

        [JsonProperty(PropertyName = "mask4")]
        [Required]
        [Display(Description="Mask4",Name="Mask4",Prompt="Enter Mask4",ShortName="Mask4")]
        [DataType("toBinaryFormatter")]
        public System.Int32  Mask4 { get; set; }

        [JsonProperty(PropertyName = "mask5")]
        [Required]
        [Display(Description="Mask5",Name="Mask5",Prompt="Enter Mask5",ShortName="Mask5")]
        [DataType("toBinaryFormatter")]
        public System.Int32  Mask5 { get; set; }

        [JsonProperty(PropertyName = "mask6")]
        [Required]
        [Display(Description="Mask6",Name="Mask6",Prompt="Enter Mask6",ShortName="Mask6")]
        [DataType("toBinaryFormatter")]
        public System.Int32  Mask6 { get; set; }

        [JsonProperty(PropertyName = "mask7")]
        [Required]
        [Display(Description="Mask7",Name="Mask7",Prompt="Enter Mask7",ShortName="Mask7")]
        [DataType("toBinaryFormatter")]
        public System.Int32  Mask7 { get; set; }

        [JsonProperty(PropertyName = "mask8")]
        [Required]
        [Display(Description="Mask8",Name="Mask8",Prompt="Enter Mask8",ShortName="Mask8")]
        [DataType("toBinaryFormatter")]
        public System.Int32  Mask8 { get; set; }

        [JsonProperty(PropertyName = "mask9")]
        [Required]
        [Display(Description="Mask9",Name="Mask9",Prompt="Enter Mask9",ShortName="Mask9")]
        [DataType("toBinaryFormatter")]
        public System.Int32  Mask9 { get; set; }

        [JsonProperty(PropertyName = "maskA")]
        [Required]
        [Display(Description="MaskA",Name="MaskA",Prompt="Enter MaskA",ShortName="MaskA")]
        [DataType("toBinaryFormatter")]
        public System.Int32  MaskA { get; set; }

        [JsonProperty(PropertyName = "maskB")]
        [Required]
        [Display(Description="MaskB",Name="MaskB",Prompt="Enter MaskB",ShortName="MaskB")]
        [DataType("toBinaryFormatter")]
        public System.Int32  MaskB { get; set; }

        [JsonProperty(PropertyName = "maskC")]
        [Required]
        [Display(Description="MaskC",Name="MaskC",Prompt="Enter MaskC",ShortName="MaskC")]
        [DataType("toBinaryFormatter")]
        public System.Int32  MaskC { get; set; }

        [JsonProperty(PropertyName = "maskD")]
        [Required]
        [Display(Description="MaskD",Name="MaskD",Prompt="Enter MaskD",ShortName="MaskD")]
        [DataType("toBinaryFormatter")]
        public System.Int32  MaskD { get; set; }

        [JsonProperty(PropertyName = "dask0")]
        [Required]
        [Display(Description="Dask0",Name="Dask0",Prompt="Enter Dask0",ShortName="Dask0")]
        [DataType("toBinaryFormatter")]
        public System.Int32  Dask0 { get; set; }

        [JsonProperty(PropertyName = "dask1")]
        [Required]
        [Display(Description="Dask1",Name="Dask1",Prompt="Enter Dask1",ShortName="Dask1")]
        [DataType("toBinaryFormatter")]
        public System.Int32  Dask1 { get; set; }

        [JsonProperty(PropertyName = "dask2")]
        [Required]
        [Display(Description="Dask2",Name="Dask2",Prompt="Enter Dask2",ShortName="Dask2")]
        [DataType("toBinaryFormatter")]
        public System.Int32  Dask2 { get; set; }

    }
}

