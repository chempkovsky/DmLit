using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;

using Dm02Context.Literature;
using Dm03Views.Literature;
using Dm01Entity.Literature;

namespace Dm04WebApp.Controllers {

    [RoutePrefix("litdialectviewwebapi")]
    public class LitDialectViewWebApiController: ApiController
    {
        private int defaultPageSize = 50;
        private int minPageSize = 5;
        private int maxPageSize = 150;
        private LitDbContext db = new LitDbContext();
        [HttpGet]
        [Route("getall")]
        public IQueryable<LitDialectView> getall()
        {
            return db.LitDialectDbSet
                    .Select(itm => new LitDialectView() {
                            DialectId = itm.DialectId,
                            DialectName = itm.DialectName,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            Iso3LngRef = itm.Iso3LngRef,
                            Iso2LngRef = itm.Iso2LngRef,
                            CCountryName = itm.Country.CountryName,
                            LLanguageName = itm.Language.LanguageName
                            });

        } // the end of Get()-method


        [HttpGet]
        [Route("getwithfilter")]
        [ResponseType(typeof(LitDialectViewPage))]
        public IHttpActionResult getwithfilter([FromUri] System.String[] dialectId 
                  , [FromUri] string[] dialectIdOprtr 
                , [FromUri] System.String[] dialectName 
                  , [FromUri] string[] dialectNameOprtr 
                , [FromUri] System.String[] iso3CntrRef 
                  , [FromUri] string[] iso3CntrRefOprtr 
                , [FromUri] System.String[] iso2CntrRef 
                  , [FromUri] string[] iso2CntrRefOprtr 
                , [FromUri] System.String[] iso3LngRef 
                  , [FromUri] string[] iso3LngRefOprtr 
                , [FromUri] System.String[] iso2LngRef 
                  , [FromUri] string[] iso2LngRefOprtr 
                , [FromUri] System.String[] cCountryName 
                  , [FromUri] string[] cCountryNameOprtr 
                , [FromUri] System.String[] lLanguageName 
                  , [FromUri] string[] lLanguageNameOprtr 
                , [FromUri] string[] orderby = null, [FromUri] int? page =null, [FromUri] int? pagesize = null)
        {

            string[] EqualOperators = { "eq", "lk" };
            string[] ExpectedOperators = { "eq", "lk", "gt", "lt", "ne" };

            int currentPageSize = this.defaultPageSize;
            int currentPage = 1;
            if (pagesize.HasValue) {
                currentPageSize = pagesize.Value;
                if ((currentPageSize < this.minPageSize) || (currentPageSize > this.maxPageSize)) {
                    currentPageSize = defaultPageSize;
                }
            }
            if (page.HasValue) {
                currentPage = page.Value+1;
                if (currentPage < 1) {
                    currentPage = 1;
                }
            }
            IQueryable<LitDialect> query = 
                db.LitDialectDbSet;
            
            if(dialectId != null) {
                if(dialectId.Length > 0) {
                    int filterCnt = dialectId.Length;
                    int operatorCnt = 0;
                    if(dialectIdOprtr != null) {
                        operatorCnt = dialectIdOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(dialectId[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( dialectIdOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(dialectIdOprtr[i])) {
                                    currOprtr = dialectIdOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(dialectId[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = dialectId.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = dialectId.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.DialectId == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.DialectId == null) ||
                                            (p.DialectId.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DialectId.Contains(aflt0))
                                            ));
                                }
                            }
                            break;
                        case 2:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.DialectId == null) ||
                                            (p.DialectId.Contains(aflt0)) ||
                                            (p.DialectId.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DialectId.Contains(aflt0)) ||
                                            (p.DialectId.Contains(aflt1))
                                            ));
                                }
                            }
                            break;
                        case 3:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.DialectId == null) ||
                                            (p.DialectId.Contains(aflt0)) ||
                                            (p.DialectId.Contains(aflt1)) ||
                                            (p.DialectId.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DialectId.Contains(aflt0)) ||
                                            (p.DialectId.Contains(aflt1)) ||
                                            (p.DialectId.Contains(aflt2))
                                            ));
                                }
                            }
                            break;
                        case 4:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                string aflt3 = filter[3].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.DialectId == null) ||
                                            (p.DialectId.Contains(aflt0)) ||
                                            (p.DialectId.Contains(aflt1)) ||
                                            (p.DialectId.Contains(aflt2)) ||
                                            (p.DialectId.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DialectId.Contains(aflt0)) ||
                                            (p.DialectId.Contains(aflt1)) ||
                                            (p.DialectId.Contains(aflt2)) ||
                                            (p.DialectId.Contains(aflt3))
                                            ));
                                }
                            }
                            break;
                        default:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                string aflt3 = filter[3].Trim();
                                string aflt4 = filter[4].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.DialectId == null) ||
                                            (p.DialectId.Contains(aflt0)) ||
                                            (p.DialectId.Contains(aflt1)) ||
                                            (p.DialectId.Contains(aflt2)) ||
                                            (p.DialectId.Contains(aflt3)) ||
                                            (p.DialectId.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DialectId.Contains(aflt0)) ||
                                            (p.DialectId.Contains(aflt1)) ||
                                            (p.DialectId.Contains(aflt2)) ||
                                            (p.DialectId.Contains(aflt3)) ||
                                            (p.DialectId.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = dialectId[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.DialectId.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.DialectId.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.DialectId.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(dialectName != null) {
                if(dialectName.Length > 0) {
                    int filterCnt = dialectName.Length;
                    int operatorCnt = 0;
                    if(dialectNameOprtr != null) {
                        operatorCnt = dialectNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(dialectName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( dialectNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(dialectNameOprtr[i])) {
                                    currOprtr = dialectNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(dialectName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = dialectName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = dialectName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.DialectName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.DialectName == null) ||
                                            (p.DialectName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DialectName.Contains(aflt0))
                                            ));
                                }
                            }
                            break;
                        case 2:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.DialectName == null) ||
                                            (p.DialectName.Contains(aflt0)) ||
                                            (p.DialectName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DialectName.Contains(aflt0)) ||
                                            (p.DialectName.Contains(aflt1))
                                            ));
                                }
                            }
                            break;
                        case 3:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.DialectName == null) ||
                                            (p.DialectName.Contains(aflt0)) ||
                                            (p.DialectName.Contains(aflt1)) ||
                                            (p.DialectName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DialectName.Contains(aflt0)) ||
                                            (p.DialectName.Contains(aflt1)) ||
                                            (p.DialectName.Contains(aflt2))
                                            ));
                                }
                            }
                            break;
                        case 4:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                string aflt3 = filter[3].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.DialectName == null) ||
                                            (p.DialectName.Contains(aflt0)) ||
                                            (p.DialectName.Contains(aflt1)) ||
                                            (p.DialectName.Contains(aflt2)) ||
                                            (p.DialectName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DialectName.Contains(aflt0)) ||
                                            (p.DialectName.Contains(aflt1)) ||
                                            (p.DialectName.Contains(aflt2)) ||
                                            (p.DialectName.Contains(aflt3))
                                            ));
                                }
                            }
                            break;
                        default:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                string aflt3 = filter[3].Trim();
                                string aflt4 = filter[4].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.DialectName == null) ||
                                            (p.DialectName.Contains(aflt0)) ||
                                            (p.DialectName.Contains(aflt1)) ||
                                            (p.DialectName.Contains(aflt2)) ||
                                            (p.DialectName.Contains(aflt3)) ||
                                            (p.DialectName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DialectName.Contains(aflt0)) ||
                                            (p.DialectName.Contains(aflt1)) ||
                                            (p.DialectName.Contains(aflt2)) ||
                                            (p.DialectName.Contains(aflt3)) ||
                                            (p.DialectName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = dialectName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.DialectName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.DialectName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.DialectName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(iso3CntrRef != null) {
                if(iso3CntrRef.Length > 0) {
                    int filterCnt = iso3CntrRef.Length;
                    int operatorCnt = 0;
                    if(iso3CntrRefOprtr != null) {
                        operatorCnt = iso3CntrRefOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(iso3CntrRef[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( iso3CntrRefOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(iso3CntrRefOprtr[i])) {
                                    currOprtr = iso3CntrRefOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(iso3CntrRef[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = iso3CntrRef.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = iso3CntrRef.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Iso3CntrRef == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso3CntrRef == null) ||
                                            (p.Iso3CntrRef.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3CntrRef.Contains(aflt0))
                                            ));
                                }
                            }
                            break;
                        case 2:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso3CntrRef == null) ||
                                            (p.Iso3CntrRef.Contains(aflt0)) ||
                                            (p.Iso3CntrRef.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3CntrRef.Contains(aflt0)) ||
                                            (p.Iso3CntrRef.Contains(aflt1))
                                            ));
                                }
                            }
                            break;
                        case 3:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso3CntrRef == null) ||
                                            (p.Iso3CntrRef.Contains(aflt0)) ||
                                            (p.Iso3CntrRef.Contains(aflt1)) ||
                                            (p.Iso3CntrRef.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3CntrRef.Contains(aflt0)) ||
                                            (p.Iso3CntrRef.Contains(aflt1)) ||
                                            (p.Iso3CntrRef.Contains(aflt2))
                                            ));
                                }
                            }
                            break;
                        case 4:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                string aflt3 = filter[3].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso3CntrRef == null) ||
                                            (p.Iso3CntrRef.Contains(aflt0)) ||
                                            (p.Iso3CntrRef.Contains(aflt1)) ||
                                            (p.Iso3CntrRef.Contains(aflt2)) ||
                                            (p.Iso3CntrRef.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3CntrRef.Contains(aflt0)) ||
                                            (p.Iso3CntrRef.Contains(aflt1)) ||
                                            (p.Iso3CntrRef.Contains(aflt2)) ||
                                            (p.Iso3CntrRef.Contains(aflt3))
                                            ));
                                }
                            }
                            break;
                        default:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                string aflt3 = filter[3].Trim();
                                string aflt4 = filter[4].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso3CntrRef == null) ||
                                            (p.Iso3CntrRef.Contains(aflt0)) ||
                                            (p.Iso3CntrRef.Contains(aflt1)) ||
                                            (p.Iso3CntrRef.Contains(aflt2)) ||
                                            (p.Iso3CntrRef.Contains(aflt3)) ||
                                            (p.Iso3CntrRef.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3CntrRef.Contains(aflt0)) ||
                                            (p.Iso3CntrRef.Contains(aflt1)) ||
                                            (p.Iso3CntrRef.Contains(aflt2)) ||
                                            (p.Iso3CntrRef.Contains(aflt3)) ||
                                            (p.Iso3CntrRef.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = iso3CntrRef[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Iso3CntrRef.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Iso3CntrRef.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Iso3CntrRef.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(iso2CntrRef != null) {
                if(iso2CntrRef.Length > 0) {
                    int filterCnt = iso2CntrRef.Length;
                    int operatorCnt = 0;
                    if(iso2CntrRefOprtr != null) {
                        operatorCnt = iso2CntrRefOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(iso2CntrRef[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( iso2CntrRefOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(iso2CntrRefOprtr[i])) {
                                    currOprtr = iso2CntrRefOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(iso2CntrRef[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = iso2CntrRef.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = iso2CntrRef.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Iso2CntrRef == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso2CntrRef == null) ||
                                            (p.Iso2CntrRef.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2CntrRef.Contains(aflt0))
                                            ));
                                }
                            }
                            break;
                        case 2:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso2CntrRef == null) ||
                                            (p.Iso2CntrRef.Contains(aflt0)) ||
                                            (p.Iso2CntrRef.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2CntrRef.Contains(aflt0)) ||
                                            (p.Iso2CntrRef.Contains(aflt1))
                                            ));
                                }
                            }
                            break;
                        case 3:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso2CntrRef == null) ||
                                            (p.Iso2CntrRef.Contains(aflt0)) ||
                                            (p.Iso2CntrRef.Contains(aflt1)) ||
                                            (p.Iso2CntrRef.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2CntrRef.Contains(aflt0)) ||
                                            (p.Iso2CntrRef.Contains(aflt1)) ||
                                            (p.Iso2CntrRef.Contains(aflt2))
                                            ));
                                }
                            }
                            break;
                        case 4:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                string aflt3 = filter[3].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso2CntrRef == null) ||
                                            (p.Iso2CntrRef.Contains(aflt0)) ||
                                            (p.Iso2CntrRef.Contains(aflt1)) ||
                                            (p.Iso2CntrRef.Contains(aflt2)) ||
                                            (p.Iso2CntrRef.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2CntrRef.Contains(aflt0)) ||
                                            (p.Iso2CntrRef.Contains(aflt1)) ||
                                            (p.Iso2CntrRef.Contains(aflt2)) ||
                                            (p.Iso2CntrRef.Contains(aflt3))
                                            ));
                                }
                            }
                            break;
                        default:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                string aflt3 = filter[3].Trim();
                                string aflt4 = filter[4].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso2CntrRef == null) ||
                                            (p.Iso2CntrRef.Contains(aflt0)) ||
                                            (p.Iso2CntrRef.Contains(aflt1)) ||
                                            (p.Iso2CntrRef.Contains(aflt2)) ||
                                            (p.Iso2CntrRef.Contains(aflt3)) ||
                                            (p.Iso2CntrRef.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2CntrRef.Contains(aflt0)) ||
                                            (p.Iso2CntrRef.Contains(aflt1)) ||
                                            (p.Iso2CntrRef.Contains(aflt2)) ||
                                            (p.Iso2CntrRef.Contains(aflt3)) ||
                                            (p.Iso2CntrRef.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = iso2CntrRef[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Iso2CntrRef.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Iso2CntrRef.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Iso2CntrRef.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(iso3LngRef != null) {
                if(iso3LngRef.Length > 0) {
                    int filterCnt = iso3LngRef.Length;
                    int operatorCnt = 0;
                    if(iso3LngRefOprtr != null) {
                        operatorCnt = iso3LngRefOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(iso3LngRef[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( iso3LngRefOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(iso3LngRefOprtr[i])) {
                                    currOprtr = iso3LngRefOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(iso3LngRef[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = iso3LngRef.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = iso3LngRef.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Iso3LngRef == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso3LngRef == null) ||
                                            (p.Iso3LngRef.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3LngRef.Contains(aflt0))
                                            ));
                                }
                            }
                            break;
                        case 2:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso3LngRef == null) ||
                                            (p.Iso3LngRef.Contains(aflt0)) ||
                                            (p.Iso3LngRef.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3LngRef.Contains(aflt0)) ||
                                            (p.Iso3LngRef.Contains(aflt1))
                                            ));
                                }
                            }
                            break;
                        case 3:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso3LngRef == null) ||
                                            (p.Iso3LngRef.Contains(aflt0)) ||
                                            (p.Iso3LngRef.Contains(aflt1)) ||
                                            (p.Iso3LngRef.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3LngRef.Contains(aflt0)) ||
                                            (p.Iso3LngRef.Contains(aflt1)) ||
                                            (p.Iso3LngRef.Contains(aflt2))
                                            ));
                                }
                            }
                            break;
                        case 4:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                string aflt3 = filter[3].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso3LngRef == null) ||
                                            (p.Iso3LngRef.Contains(aflt0)) ||
                                            (p.Iso3LngRef.Contains(aflt1)) ||
                                            (p.Iso3LngRef.Contains(aflt2)) ||
                                            (p.Iso3LngRef.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3LngRef.Contains(aflt0)) ||
                                            (p.Iso3LngRef.Contains(aflt1)) ||
                                            (p.Iso3LngRef.Contains(aflt2)) ||
                                            (p.Iso3LngRef.Contains(aflt3))
                                            ));
                                }
                            }
                            break;
                        default:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                string aflt3 = filter[3].Trim();
                                string aflt4 = filter[4].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso3LngRef == null) ||
                                            (p.Iso3LngRef.Contains(aflt0)) ||
                                            (p.Iso3LngRef.Contains(aflt1)) ||
                                            (p.Iso3LngRef.Contains(aflt2)) ||
                                            (p.Iso3LngRef.Contains(aflt3)) ||
                                            (p.Iso3LngRef.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3LngRef.Contains(aflt0)) ||
                                            (p.Iso3LngRef.Contains(aflt1)) ||
                                            (p.Iso3LngRef.Contains(aflt2)) ||
                                            (p.Iso3LngRef.Contains(aflt3)) ||
                                            (p.Iso3LngRef.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = iso3LngRef[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Iso3LngRef.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Iso3LngRef.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Iso3LngRef.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(iso2LngRef != null) {
                if(iso2LngRef.Length > 0) {
                    int filterCnt = iso2LngRef.Length;
                    int operatorCnt = 0;
                    if(iso2LngRefOprtr != null) {
                        operatorCnt = iso2LngRefOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(iso2LngRef[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( iso2LngRefOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(iso2LngRefOprtr[i])) {
                                    currOprtr = iso2LngRefOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(iso2LngRef[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = iso2LngRef.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = iso2LngRef.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Iso2LngRef == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso2LngRef == null) ||
                                            (p.Iso2LngRef.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2LngRef.Contains(aflt0))
                                            ));
                                }
                            }
                            break;
                        case 2:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso2LngRef == null) ||
                                            (p.Iso2LngRef.Contains(aflt0)) ||
                                            (p.Iso2LngRef.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2LngRef.Contains(aflt0)) ||
                                            (p.Iso2LngRef.Contains(aflt1))
                                            ));
                                }
                            }
                            break;
                        case 3:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso2LngRef == null) ||
                                            (p.Iso2LngRef.Contains(aflt0)) ||
                                            (p.Iso2LngRef.Contains(aflt1)) ||
                                            (p.Iso2LngRef.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2LngRef.Contains(aflt0)) ||
                                            (p.Iso2LngRef.Contains(aflt1)) ||
                                            (p.Iso2LngRef.Contains(aflt2))
                                            ));
                                }
                            }
                            break;
                        case 4:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                string aflt3 = filter[3].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso2LngRef == null) ||
                                            (p.Iso2LngRef.Contains(aflt0)) ||
                                            (p.Iso2LngRef.Contains(aflt1)) ||
                                            (p.Iso2LngRef.Contains(aflt2)) ||
                                            (p.Iso2LngRef.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2LngRef.Contains(aflt0)) ||
                                            (p.Iso2LngRef.Contains(aflt1)) ||
                                            (p.Iso2LngRef.Contains(aflt2)) ||
                                            (p.Iso2LngRef.Contains(aflt3))
                                            ));
                                }
                            }
                            break;
                        default:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                string aflt3 = filter[3].Trim();
                                string aflt4 = filter[4].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso2LngRef == null) ||
                                            (p.Iso2LngRef.Contains(aflt0)) ||
                                            (p.Iso2LngRef.Contains(aflt1)) ||
                                            (p.Iso2LngRef.Contains(aflt2)) ||
                                            (p.Iso2LngRef.Contains(aflt3)) ||
                                            (p.Iso2LngRef.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2LngRef.Contains(aflt0)) ||
                                            (p.Iso2LngRef.Contains(aflt1)) ||
                                            (p.Iso2LngRef.Contains(aflt2)) ||
                                            (p.Iso2LngRef.Contains(aflt3)) ||
                                            (p.Iso2LngRef.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = iso2LngRef[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Iso2LngRef.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Iso2LngRef.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Iso2LngRef.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(cCountryName != null) {
                if(cCountryName.Length > 0) {
                    int filterCnt = cCountryName.Length;
                    int operatorCnt = 0;
                    if(cCountryNameOprtr != null) {
                        operatorCnt = cCountryNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(cCountryName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( cCountryNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(cCountryNameOprtr[i])) {
                                    currOprtr = cCountryNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(cCountryName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = cCountryName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = cCountryName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Country.CountryName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Country.CountryName == null) ||
                                            (p.Country.CountryName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Country.CountryName.Contains(aflt0))
                                            ));
                                }
                            }
                            break;
                        case 2:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Country.CountryName == null) ||
                                            (p.Country.CountryName.Contains(aflt0)) ||
                                            (p.Country.CountryName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Country.CountryName.Contains(aflt0)) ||
                                            (p.Country.CountryName.Contains(aflt1))
                                            ));
                                }
                            }
                            break;
                        case 3:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Country.CountryName == null) ||
                                            (p.Country.CountryName.Contains(aflt0)) ||
                                            (p.Country.CountryName.Contains(aflt1)) ||
                                            (p.Country.CountryName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Country.CountryName.Contains(aflt0)) ||
                                            (p.Country.CountryName.Contains(aflt1)) ||
                                            (p.Country.CountryName.Contains(aflt2))
                                            ));
                                }
                            }
                            break;
                        case 4:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                string aflt3 = filter[3].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Country.CountryName == null) ||
                                            (p.Country.CountryName.Contains(aflt0)) ||
                                            (p.Country.CountryName.Contains(aflt1)) ||
                                            (p.Country.CountryName.Contains(aflt2)) ||
                                            (p.Country.CountryName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Country.CountryName.Contains(aflt0)) ||
                                            (p.Country.CountryName.Contains(aflt1)) ||
                                            (p.Country.CountryName.Contains(aflt2)) ||
                                            (p.Country.CountryName.Contains(aflt3))
                                            ));
                                }
                            }
                            break;
                        default:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                string aflt3 = filter[3].Trim();
                                string aflt4 = filter[4].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Country.CountryName == null) ||
                                            (p.Country.CountryName.Contains(aflt0)) ||
                                            (p.Country.CountryName.Contains(aflt1)) ||
                                            (p.Country.CountryName.Contains(aflt2)) ||
                                            (p.Country.CountryName.Contains(aflt3)) ||
                                            (p.Country.CountryName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Country.CountryName.Contains(aflt0)) ||
                                            (p.Country.CountryName.Contains(aflt1)) ||
                                            (p.Country.CountryName.Contains(aflt2)) ||
                                            (p.Country.CountryName.Contains(aflt3)) ||
                                            (p.Country.CountryName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = cCountryName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Country.CountryName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Country.CountryName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Country.CountryName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(lLanguageName != null) {
                if(lLanguageName.Length > 0) {
                    int filterCnt = lLanguageName.Length;
                    int operatorCnt = 0;
                    if(lLanguageNameOprtr != null) {
                        operatorCnt = lLanguageNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(lLanguageName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( lLanguageNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(lLanguageNameOprtr[i])) {
                                    currOprtr = lLanguageNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(lLanguageName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = lLanguageName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = lLanguageName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Language.LanguageName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Language.LanguageName == null) ||
                                            (p.Language.LanguageName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Language.LanguageName.Contains(aflt0))
                                            ));
                                }
                            }
                            break;
                        case 2:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Language.LanguageName == null) ||
                                            (p.Language.LanguageName.Contains(aflt0)) ||
                                            (p.Language.LanguageName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Language.LanguageName.Contains(aflt0)) ||
                                            (p.Language.LanguageName.Contains(aflt1))
                                            ));
                                }
                            }
                            break;
                        case 3:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Language.LanguageName == null) ||
                                            (p.Language.LanguageName.Contains(aflt0)) ||
                                            (p.Language.LanguageName.Contains(aflt1)) ||
                                            (p.Language.LanguageName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Language.LanguageName.Contains(aflt0)) ||
                                            (p.Language.LanguageName.Contains(aflt1)) ||
                                            (p.Language.LanguageName.Contains(aflt2))
                                            ));
                                }
                            }
                            break;
                        case 4:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                string aflt3 = filter[3].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Language.LanguageName == null) ||
                                            (p.Language.LanguageName.Contains(aflt0)) ||
                                            (p.Language.LanguageName.Contains(aflt1)) ||
                                            (p.Language.LanguageName.Contains(aflt2)) ||
                                            (p.Language.LanguageName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Language.LanguageName.Contains(aflt0)) ||
                                            (p.Language.LanguageName.Contains(aflt1)) ||
                                            (p.Language.LanguageName.Contains(aflt2)) ||
                                            (p.Language.LanguageName.Contains(aflt3))
                                            ));
                                }
                            }
                            break;
                        default:
                            {
                                string aflt0 = filter[0].Trim();
                                string aflt1 = filter[1].Trim();
                                string aflt2 = filter[2].Trim();
                                string aflt3 = filter[3].Trim();
                                string aflt4 = filter[4].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Language.LanguageName == null) ||
                                            (p.Language.LanguageName.Contains(aflt0)) ||
                                            (p.Language.LanguageName.Contains(aflt1)) ||
                                            (p.Language.LanguageName.Contains(aflt2)) ||
                                            (p.Language.LanguageName.Contains(aflt3)) ||
                                            (p.Language.LanguageName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Language.LanguageName.Contains(aflt0)) ||
                                            (p.Language.LanguageName.Contains(aflt1)) ||
                                            (p.Language.LanguageName.Contains(aflt2)) ||
                                            (p.Language.LanguageName.Contains(aflt3)) ||
                                            (p.Language.LanguageName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = lLanguageName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Language.LanguageName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Language.LanguageName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Language.LanguageName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
                int totals = query.Count();
                int pageCount = ((totals > 0) ? ((int)Math.Ceiling((double)totals / (double)currentPageSize)) : 0);
                List<string> currentOrderBy = null;
                if (orderby != null) {
                    if (orderby.Length > 0) {
                        currentOrderBy = orderby.Where(s => (!string.IsNullOrEmpty(s))).ToList();
                    }
                }   
                bool isFirstTime = true; 
                IOrderedQueryable<LitDialect> orderedQuery = null;
                if(currentOrderBy != null) {
                    List<string> wasInUseOrderBy = new List<string>();
                    foreach(string propName in currentOrderBy) {
                        string lowerCaseStr = propName.ToLower();
                        if (wasInUseOrderBy.Contains(lowerCaseStr)) {
                            continue;
                        }
                        switch(lowerCaseStr) {
                            case "dialectid" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.DialectId);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.DialectId);
                                }
                                wasInUseOrderBy.Add("dialectid");
                                wasInUseOrderBy.Add("-dialectid");
                                break;
                            case "-dialectid" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.DialectId);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.DialectId);
                                }
                                wasInUseOrderBy.Add("dialectid");
                                wasInUseOrderBy.Add("-dialectid");
                                break;
                            case "dialectname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.DialectName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.DialectName);
                                }
                                wasInUseOrderBy.Add("dialectname");
                                wasInUseOrderBy.Add("-dialectname");
                                break;
                            case "-dialectname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.DialectName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.DialectName);
                                }
                                wasInUseOrderBy.Add("dialectname");
                                wasInUseOrderBy.Add("-dialectname");
                                break;
                            case "iso3cntrref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Iso3CntrRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Iso3CntrRef);
                                }
                                wasInUseOrderBy.Add("iso3cntrref");
                                wasInUseOrderBy.Add("-iso3cntrref");
                                break;
                            case "-iso3cntrref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Iso3CntrRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Iso3CntrRef);
                                }
                                wasInUseOrderBy.Add("iso3cntrref");
                                wasInUseOrderBy.Add("-iso3cntrref");
                                break;
                            case "iso2cntrref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Iso2CntrRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Iso2CntrRef);
                                }
                                wasInUseOrderBy.Add("iso2cntrref");
                                wasInUseOrderBy.Add("-iso2cntrref");
                                break;
                            case "-iso2cntrref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Iso2CntrRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Iso2CntrRef);
                                }
                                wasInUseOrderBy.Add("iso2cntrref");
                                wasInUseOrderBy.Add("-iso2cntrref");
                                break;
                            case "iso3lngref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Iso3LngRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Iso3LngRef);
                                }
                                wasInUseOrderBy.Add("iso3lngref");
                                wasInUseOrderBy.Add("-iso3lngref");
                                break;
                            case "-iso3lngref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Iso3LngRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Iso3LngRef);
                                }
                                wasInUseOrderBy.Add("iso3lngref");
                                wasInUseOrderBy.Add("-iso3lngref");
                                break;
                            case "iso2lngref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Iso2LngRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Iso2LngRef);
                                }
                                wasInUseOrderBy.Add("iso2lngref");
                                wasInUseOrderBy.Add("-iso2lngref");
                                break;
                            case "-iso2lngref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Iso2LngRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Iso2LngRef);
                                }
                                wasInUseOrderBy.Add("iso2lngref");
                                wasInUseOrderBy.Add("-iso2lngref");
                                break;
                            case "ccountryname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Country.CountryName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Country.CountryName);
                                }
                                wasInUseOrderBy.Add("ccountryname");
                                wasInUseOrderBy.Add("-ccountryname");
                                break;
                            case "-ccountryname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Country.CountryName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Country.CountryName);
                                }
                                wasInUseOrderBy.Add("ccountryname");
                                wasInUseOrderBy.Add("-ccountryname");
                                break;
                            case "llanguagename" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Language.LanguageName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Language.LanguageName);
                                }
                                wasInUseOrderBy.Add("llanguagename");
                                wasInUseOrderBy.Add("-llanguagename");
                                break;
                            case "-llanguagename" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Language.LanguageName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Language.LanguageName);
                                }
                                wasInUseOrderBy.Add("llanguagename");
                                wasInUseOrderBy.Add("-llanguagename");
                                break;
                                default:
                                    break;
                        }
                    }
                }
                if(isFirstTime) {                
                    orderedQuery = query.OrderBy(p => p.DialectId);
                } // totals pageCount currentPageSize
                LitDialectViewPage resultObject = new LitDialectViewPage() {
                    page = (currentPage > 0) ? (currentPage-1) : currentPage,
                    pagesize = currentPageSize,
                    pagecount = pageCount,
                    total = totals
                };
                resultObject.items = orderedQuery.Skip((currentPage - 1) * currentPageSize).Take(currentPageSize).Select(itm => new LitDialectView() {
                            DialectId = itm.DialectId,
                            DialectName = itm.DialectName,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            Iso3LngRef = itm.Iso3LngRef,
                            Iso2LngRef = itm.Iso2LngRef,
                            CCountryName = itm.Country.CountryName,
                            LLanguageName = itm.Language.LanguageName
                            }).ToList();
                return Ok(resultObject);
        } // the end of GetWithFilter()-method

        [HttpGet]
        [Route("getone")]
        [ResponseType(typeof(LitDialectView))]
        public IHttpActionResult getone([FromUri] System.String dialectId
                )
        {
            LitDialectView result = db.LitDialectDbSet
                    .Where(p => p.DialectId == dialectId)
                    .Select(itm => new LitDialectView() {
                            DialectId = itm.DialectId,
                            DialectName = itm.DialectName,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            Iso3LngRef = itm.Iso3LngRef,
                            Iso2LngRef = itm.Iso2LngRef,
                            CCountryName = itm.Country.CountryName,
                            LLanguageName = itm.Language.LanguageName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        } // the end of public GetOne()-method

        [HttpPut]
        [ResponseType(typeof(LitDialectView))]
        [Route("updateone")]
        public IHttpActionResult updateone([FromBody] LitDialectView viewToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            LitDialect resultEntity = db.LitDialectDbSet
                    .Where(p => p.DialectId == viewToUpdate.DialectId)
                    .FirstOrDefault();
            if(resultEntity == null) {
                return NotFound();
            }

            resultEntity.DialectName =  viewToUpdate.DialectName;
            resultEntity.Iso3CntrRef =  viewToUpdate.Iso3CntrRef;
            resultEntity.Iso2CntrRef =  viewToUpdate.Iso2CntrRef;
            resultEntity.Iso3LngRef =  viewToUpdate.Iso3LngRef;
            resultEntity.Iso2LngRef =  viewToUpdate.Iso2LngRef;
            db.Entry(resultEntity).State = EntityState.Modified;
            db.SaveChanges();
            LitDialectView result = db.LitDialectDbSet
                    .Where(p => p.DialectId == viewToUpdate.DialectId)
                    .Select(itm => new LitDialectView() {
                            DialectId = itm.DialectId,
                            DialectName = itm.DialectName,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            Iso3LngRef = itm.Iso3LngRef,
                            Iso2LngRef = itm.Iso2LngRef,
                            CCountryName = itm.Country.CountryName,
                            LLanguageName = itm.Language.LanguageName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [ResponseType(typeof(LitDialectView))]
        [Route("addone")]
        public IHttpActionResult addone([FromBody] LitDialectView viewToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            LitDialect entityToAdd = new LitDialect();
            entityToAdd.DialectId =  viewToAdd.DialectId;
            entityToAdd.DialectName =  viewToAdd.DialectName;
            entityToAdd.Iso3CntrRef =  viewToAdd.Iso3CntrRef;
            entityToAdd.Iso2CntrRef =  viewToAdd.Iso2CntrRef;
            entityToAdd.Iso3LngRef =  viewToAdd.Iso3LngRef;
            entityToAdd.Iso2LngRef =  viewToAdd.Iso2LngRef;
            db.LitDialectDbSet.Add(entityToAdd);
            db.SaveChanges();

            LitDialectView result = db.LitDialectDbSet
                    .Where(p => p.DialectId == entityToAdd.DialectId)
                    .Select(itm => new LitDialectView() {
                            DialectId = itm.DialectId,
                            DialectName = itm.DialectName,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            Iso3LngRef = itm.Iso3LngRef,
                            Iso2LngRef = itm.Iso2LngRef,
                            CCountryName = itm.Country.CountryName,
                            LLanguageName = itm.Language.LanguageName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpDelete]
        [ResponseType(typeof(LitDialectView))]
        [Route("deleteone")]
        public IHttpActionResult deleteone([FromUri] System.String dialectId
                )
        {

                LitDialectView result = db.LitDialectDbSet
                    .Where(p => p.DialectId == dialectId)
                    .Select(itm => new LitDialectView() {
                            DialectId = itm.DialectId,
                            DialectName = itm.DialectName,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            Iso3LngRef = itm.Iso3LngRef,
                            Iso2LngRef = itm.Iso2LngRef,
                            CCountryName = itm.Country.CountryName,
                            LLanguageName = itm.Language.LanguageName
                    }).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }

                LitDialect entityToDelete = db.LitDialectDbSet
                    .Where(p => p.DialectId == result.DialectId)
                    .FirstOrDefault();
                if (entityToDelete == null) {
                    return Ok(result);
                }
                db.LitDialectDbSet.Remove(entityToDelete);
                db.SaveChanges();
                return Ok(result);
        }



        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}

