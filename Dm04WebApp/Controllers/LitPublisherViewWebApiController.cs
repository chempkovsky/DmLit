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

    [RoutePrefix("litpublisherviewwebapi")]
    public class LitPublisherViewWebApiController: ApiController
    {
        private int defaultPageSize = 50;
        private int minPageSize = 5;
        private int maxPageSize = 150;
        private LitDbContext db = new LitDbContext();
        [HttpGet]
        [Route("getall")]
        public IQueryable<LitPublisherView> getall()
        {
            return db.LitPublisherDbSet
                    .Select(itm => new LitPublisherView() {
                            PublisherId = itm.PublisherId,
                            PublisherName = itm.PublisherName,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            CCountryName = itm.Country.CountryName
                            });

        } // the end of Get()-method


        [HttpGet]
        [Route("getwithfilter")]
        [ResponseType(typeof(LitPublisherViewPage))]
        public IHttpActionResult getwithfilter([FromUri] System.Int32?[] publisherId 
                  , [FromUri] string[] publisherIdOprtr 
                , [FromUri] System.String[] publisherName 
                  , [FromUri] string[] publisherNameOprtr 
                , [FromUri] System.String[] iso3CntrRef 
                  , [FromUri] string[] iso3CntrRefOprtr 
                , [FromUri] System.String[] iso2CntrRef 
                  , [FromUri] string[] iso2CntrRefOprtr 
                , [FromUri] System.String[] cCountryName 
                  , [FromUri] string[] cCountryNameOprtr 
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
            IQueryable<LitPublisher> query = 
                db.LitPublisherDbSet;
            
            if(publisherId != null) {
                if(publisherId.Length > 0) {
                    int filterCnt = publisherId.Length;
                    int operatorCnt = 0;
                    if(publisherIdOprtr != null) {
                        operatorCnt = publisherIdOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.Int32 > filterLst = new List<System.Int32 >();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(publisherId[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( publisherIdOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(publisherIdOprtr[i])) {
                                    currOprtr = publisherIdOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(publisherId[i].Value);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                   // 
                   // System.Int32[] filter = publisherId.Where(i => i.HasValue).Select(i => i.Value).ToArray();
                   //
                   System.Int32[] filter = filterLst.ToArray();
                    if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.PublisherId));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Int32 aflt = publisherId[ fltItm.Value ].Value;
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.PublisherId >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.PublisherId <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.PublisherId != aflt );
                                break;
                        }
                    }

                }
            }
            if(publisherName != null) {
                if(publisherName.Length > 0) {
                    int filterCnt = publisherName.Length;
                    int operatorCnt = 0;
                    if(publisherNameOprtr != null) {
                        operatorCnt = publisherNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(publisherName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( publisherNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(publisherNameOprtr[i])) {
                                    currOprtr = publisherNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(publisherName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = publisherName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = publisherName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.PublisherName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.PublisherName == null) ||
                                            (p.PublisherName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.PublisherName.Contains(aflt0))
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
                                            (p.PublisherName == null) ||
                                            (p.PublisherName.Contains(aflt0)) ||
                                            (p.PublisherName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.PublisherName.Contains(aflt0)) ||
                                            (p.PublisherName.Contains(aflt1))
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
                                            (p.PublisherName == null) ||
                                            (p.PublisherName.Contains(aflt0)) ||
                                            (p.PublisherName.Contains(aflt1)) ||
                                            (p.PublisherName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.PublisherName.Contains(aflt0)) ||
                                            (p.PublisherName.Contains(aflt1)) ||
                                            (p.PublisherName.Contains(aflt2))
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
                                            (p.PublisherName == null) ||
                                            (p.PublisherName.Contains(aflt0)) ||
                                            (p.PublisherName.Contains(aflt1)) ||
                                            (p.PublisherName.Contains(aflt2)) ||
                                            (p.PublisherName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.PublisherName.Contains(aflt0)) ||
                                            (p.PublisherName.Contains(aflt1)) ||
                                            (p.PublisherName.Contains(aflt2)) ||
                                            (p.PublisherName.Contains(aflt3))
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
                                            (p.PublisherName == null) ||
                                            (p.PublisherName.Contains(aflt0)) ||
                                            (p.PublisherName.Contains(aflt1)) ||
                                            (p.PublisherName.Contains(aflt2)) ||
                                            (p.PublisherName.Contains(aflt3)) ||
                                            (p.PublisherName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.PublisherName.Contains(aflt0)) ||
                                            (p.PublisherName.Contains(aflt1)) ||
                                            (p.PublisherName.Contains(aflt2)) ||
                                            (p.PublisherName.Contains(aflt3)) ||
                                            (p.PublisherName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = publisherName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.PublisherName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.PublisherName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.PublisherName.CompareTo(aflt) != 0 );
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
                int totals = query.Count();
                int pageCount = ((totals > 0) ? ((int)Math.Ceiling((double)totals / (double)currentPageSize)) : 0);
                List<string> currentOrderBy = null;
                if (orderby != null) {
                    if (orderby.Length > 0) {
                        currentOrderBy = orderby.Where(s => (!string.IsNullOrEmpty(s))).ToList();
                    }
                }   
                bool isFirstTime = true; 
                IOrderedQueryable<LitPublisher> orderedQuery = null;
                if(currentOrderBy != null) {
                    List<string> wasInUseOrderBy = new List<string>();
                    foreach(string propName in currentOrderBy) {
                        string lowerCaseStr = propName.ToLower();
                        if (wasInUseOrderBy.Contains(lowerCaseStr)) {
                            continue;
                        }
                        switch(lowerCaseStr) {
                            case "publisherid" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.PublisherId);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.PublisherId);
                                }
                                wasInUseOrderBy.Add("publisherid");
                                wasInUseOrderBy.Add("-publisherid");
                                break;
                            case "-publisherid" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.PublisherId);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.PublisherId);
                                }
                                wasInUseOrderBy.Add("publisherid");
                                wasInUseOrderBy.Add("-publisherid");
                                break;
                            case "publishername" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.PublisherName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.PublisherName);
                                }
                                wasInUseOrderBy.Add("publishername");
                                wasInUseOrderBy.Add("-publishername");
                                break;
                            case "-publishername" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.PublisherName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.PublisherName);
                                }
                                wasInUseOrderBy.Add("publishername");
                                wasInUseOrderBy.Add("-publishername");
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
                                default:
                                    break;
                        }
                    }
                }
                if(isFirstTime) {                
                    orderedQuery = query.OrderBy(p => p.PublisherId);
                } // totals pageCount currentPageSize
                LitPublisherViewPage resultObject = new LitPublisherViewPage() {
                    page = (currentPage > 0) ? (currentPage-1) : currentPage,
                    pagesize = currentPageSize,
                    pagecount = pageCount,
                    total = totals
                };
                resultObject.items = orderedQuery.Skip((currentPage - 1) * currentPageSize).Take(currentPageSize).Select(itm => new LitPublisherView() {
                            PublisherId = itm.PublisherId,
                            PublisherName = itm.PublisherName,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            CCountryName = itm.Country.CountryName
                            }).ToList();
                return Ok(resultObject);
        } // the end of GetWithFilter()-method

        [HttpGet]
        [Route("getone")]
        [ResponseType(typeof(LitPublisherView))]
        public IHttpActionResult getone([FromUri] System.Int32 publisherId
                )
        {
            LitPublisherView result = db.LitPublisherDbSet
                    .Where(p => p.PublisherId == publisherId)
                    .Select(itm => new LitPublisherView() {
                            PublisherId = itm.PublisherId,
                            PublisherName = itm.PublisherName,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            CCountryName = itm.Country.CountryName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        } // the end of public GetOne()-method

        [HttpPut]
        [ResponseType(typeof(LitPublisherView))]
        [Route("updateone")]
        public IHttpActionResult updateone([FromBody] LitPublisherView viewToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            LitPublisher resultEntity = db.LitPublisherDbSet
                    .Where(p => p.PublisherId == viewToUpdate.PublisherId)
                    .FirstOrDefault();
            if(resultEntity == null) {
                return NotFound();
            }

            resultEntity.PublisherName =  viewToUpdate.PublisherName;
            resultEntity.Iso3CntrRef =  viewToUpdate.Iso3CntrRef;
            resultEntity.Iso2CntrRef =  viewToUpdate.Iso2CntrRef;
            db.Entry(resultEntity).State = EntityState.Modified;
            db.SaveChanges();
            LitPublisherView result = db.LitPublisherDbSet
                    .Where(p => p.PublisherId == viewToUpdate.PublisherId)
                    .Select(itm => new LitPublisherView() {
                            PublisherId = itm.PublisherId,
                            PublisherName = itm.PublisherName,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            CCountryName = itm.Country.CountryName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [ResponseType(typeof(LitPublisherView))]
        [Route("addone")]
        public IHttpActionResult addone([FromBody] LitPublisherView viewToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            LitPublisher entityToAdd = new LitPublisher();
            entityToAdd.PublisherId =  viewToAdd.PublisherId;
            entityToAdd.PublisherName =  viewToAdd.PublisherName;
            entityToAdd.Iso3CntrRef =  viewToAdd.Iso3CntrRef;
            entityToAdd.Iso2CntrRef =  viewToAdd.Iso2CntrRef;
            db.LitPublisherDbSet.Add(entityToAdd);
            db.SaveChanges();

            LitPublisherView result = db.LitPublisherDbSet
                    .Where(p => p.PublisherId == entityToAdd.PublisherId)
                    .Select(itm => new LitPublisherView() {
                            PublisherId = itm.PublisherId,
                            PublisherName = itm.PublisherName,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            CCountryName = itm.Country.CountryName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpDelete]
        [ResponseType(typeof(LitPublisherView))]
        [Route("deleteone")]
        public IHttpActionResult deleteone([FromUri] System.Int32 publisherId
                )
        {

                LitPublisherView result = db.LitPublisherDbSet
                    .Where(p => p.PublisherId == publisherId)
                    .Select(itm => new LitPublisherView() {
                            PublisherId = itm.PublisherId,
                            PublisherName = itm.PublisherName,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            CCountryName = itm.Country.CountryName
                    }).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }

                LitPublisher entityToDelete = db.LitPublisherDbSet
                    .Where(p => p.PublisherId == result.PublisherId)
                    .FirstOrDefault();
                if (entityToDelete == null) {
                    return Ok(result);
                }
                db.LitPublisherDbSet.Remove(entityToDelete);
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

