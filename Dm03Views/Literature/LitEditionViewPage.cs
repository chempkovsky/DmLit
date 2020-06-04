using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Linq.Expressions;


namespace Dm03Views.Literature {

    public class LitEditionViewPage {
        public int page { get; set; }
        public int pagesize { get; set; }
        public int pagecount { get; set; }
        public int total { get; set; }
        public List<LitEditionView> items { get; set; }
    }

}

