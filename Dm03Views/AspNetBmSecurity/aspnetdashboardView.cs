using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;


namespace Dm03Views.AspNetBmSecurity {
    public class aspnetdashboardView {
        [JsonProperty(PropertyName = "dashboardPk")]
        [Required]
        [Display(Description="Dashboard Id",Name="Dashboard Id",Prompt="Enter Dashboard Id",ShortName="Id")]
        public System.Int32  DashboardPk { get; set; }

        [JsonProperty(PropertyName = "dashboardName")]
        [Required]
        [Display(Description="Dashboard Name",Name="Dashboard Name",Prompt="Enter DashboardName",ShortName="Name")]
        [StringLength(50,MinimumLength=1,ErrorMessage="Invalid")]
        public System.String  DashboardName { get; set; }

        [JsonProperty(PropertyName = "dashboardDescription")]
        [Display(Description="Dashboard Description",Name="Dashboard Description",Prompt="Enter DashboardDescription",ShortName="Description")]
        [StringLength(50,MinimumLength=1,ErrorMessage="Invalid")]
        public System.String  DashboardDescription { get; set; }

    }
}

