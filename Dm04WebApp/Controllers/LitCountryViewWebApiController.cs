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

    [RoutePrefix("litcountryviewwebapi")]
    public class LitCountryViewWebApiController: ApiController
    {
        private int defaultPageSize = 350;
        private int minPageSize = 5;
        private int maxPageSize = 350;
        private LitDbContext db = new LitDbContext();
        [HttpGet]
        [Route("getall")]
        public IQueryable<LitCountryView> getall()
        {
            return db.LitCountryDbSet
                    .Select(itm => new LitCountryView() {
                            Iso3 = itm.Iso3,
                            Iso2 = itm.Iso2,
                            CountryName = itm.CountryName
                            });

        } // the end of Get()-method


        [HttpGet]
        [Route("getwithfilter")]
        [ResponseType(typeof(LitCountryViewPage))]
        public IHttpActionResult getwithfilter([FromUri] System.String[] iso3 
                  , [FromUri] string[] iso3Oprtr 
                , [FromUri] System.String[] iso2 
                  , [FromUri] string[] iso2Oprtr 
                , [FromUri] System.String[] countryName 
                  , [FromUri] string[] countryNameOprtr 
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
            IQueryable<LitCountry> query = 
                db.LitCountryDbSet;
            
            if(iso3 != null) {
                if(iso3.Length > 0) {
                    int filterCnt = iso3.Length;
                    int operatorCnt = 0;
                    if(iso3Oprtr != null) {
                        operatorCnt = iso3Oprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(iso3[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( iso3Oprtr[i] ) ) {
                                if (ExpectedOperators.Contains(iso3Oprtr[i])) {
                                    currOprtr = iso3Oprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(iso3[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = iso3.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = iso3.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Iso3 == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso3 == null) ||
                                            (p.Iso3.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3.Contains(aflt0))
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
                                            (p.Iso3 == null) ||
                                            (p.Iso3.Contains(aflt0)) ||
                                            (p.Iso3.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3.Contains(aflt0)) ||
                                            (p.Iso3.Contains(aflt1))
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
                                            (p.Iso3 == null) ||
                                            (p.Iso3.Contains(aflt0)) ||
                                            (p.Iso3.Contains(aflt1)) ||
                                            (p.Iso3.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3.Contains(aflt0)) ||
                                            (p.Iso3.Contains(aflt1)) ||
                                            (p.Iso3.Contains(aflt2))
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
                                            (p.Iso3 == null) ||
                                            (p.Iso3.Contains(aflt0)) ||
                                            (p.Iso3.Contains(aflt1)) ||
                                            (p.Iso3.Contains(aflt2)) ||
                                            (p.Iso3.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3.Contains(aflt0)) ||
                                            (p.Iso3.Contains(aflt1)) ||
                                            (p.Iso3.Contains(aflt2)) ||
                                            (p.Iso3.Contains(aflt3))
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
                                            (p.Iso3 == null) ||
                                            (p.Iso3.Contains(aflt0)) ||
                                            (p.Iso3.Contains(aflt1)) ||
                                            (p.Iso3.Contains(aflt2)) ||
                                            (p.Iso3.Contains(aflt3)) ||
                                            (p.Iso3.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3.Contains(aflt0)) ||
                                            (p.Iso3.Contains(aflt1)) ||
                                            (p.Iso3.Contains(aflt2)) ||
                                            (p.Iso3.Contains(aflt3)) ||
                                            (p.Iso3.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = iso3[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Iso3.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Iso3.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Iso3.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(iso2 != null) {
                if(iso2.Length > 0) {
                    int filterCnt = iso2.Length;
                    int operatorCnt = 0;
                    if(iso2Oprtr != null) {
                        operatorCnt = iso2Oprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(iso2[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( iso2Oprtr[i] ) ) {
                                if (ExpectedOperators.Contains(iso2Oprtr[i])) {
                                    currOprtr = iso2Oprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(iso2[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = iso2.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = iso2.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Iso2 == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso2 == null) ||
                                            (p.Iso2.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2.Contains(aflt0))
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
                                            (p.Iso2 == null) ||
                                            (p.Iso2.Contains(aflt0)) ||
                                            (p.Iso2.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2.Contains(aflt0)) ||
                                            (p.Iso2.Contains(aflt1))
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
                                            (p.Iso2 == null) ||
                                            (p.Iso2.Contains(aflt0)) ||
                                            (p.Iso2.Contains(aflt1)) ||
                                            (p.Iso2.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2.Contains(aflt0)) ||
                                            (p.Iso2.Contains(aflt1)) ||
                                            (p.Iso2.Contains(aflt2))
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
                                            (p.Iso2 == null) ||
                                            (p.Iso2.Contains(aflt0)) ||
                                            (p.Iso2.Contains(aflt1)) ||
                                            (p.Iso2.Contains(aflt2)) ||
                                            (p.Iso2.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2.Contains(aflt0)) ||
                                            (p.Iso2.Contains(aflt1)) ||
                                            (p.Iso2.Contains(aflt2)) ||
                                            (p.Iso2.Contains(aflt3))
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
                                            (p.Iso2 == null) ||
                                            (p.Iso2.Contains(aflt0)) ||
                                            (p.Iso2.Contains(aflt1)) ||
                                            (p.Iso2.Contains(aflt2)) ||
                                            (p.Iso2.Contains(aflt3)) ||
                                            (p.Iso2.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2.Contains(aflt0)) ||
                                            (p.Iso2.Contains(aflt1)) ||
                                            (p.Iso2.Contains(aflt2)) ||
                                            (p.Iso2.Contains(aflt3)) ||
                                            (p.Iso2.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = iso2[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Iso2.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Iso2.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Iso2.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(countryName != null) {
                if(countryName.Length > 0) {
                    int filterCnt = countryName.Length;
                    int operatorCnt = 0;
                    if(countryNameOprtr != null) {
                        operatorCnt = countryNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(countryName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( countryNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(countryNameOprtr[i])) {
                                    currOprtr = countryNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(countryName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = countryName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = countryName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.CountryName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.CountryName == null) ||
                                            (p.CountryName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.CountryName.Contains(aflt0))
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
                                            (p.CountryName == null) ||
                                            (p.CountryName.Contains(aflt0)) ||
                                            (p.CountryName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.CountryName.Contains(aflt0)) ||
                                            (p.CountryName.Contains(aflt1))
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
                                            (p.CountryName == null) ||
                                            (p.CountryName.Contains(aflt0)) ||
                                            (p.CountryName.Contains(aflt1)) ||
                                            (p.CountryName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.CountryName.Contains(aflt0)) ||
                                            (p.CountryName.Contains(aflt1)) ||
                                            (p.CountryName.Contains(aflt2))
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
                                            (p.CountryName == null) ||
                                            (p.CountryName.Contains(aflt0)) ||
                                            (p.CountryName.Contains(aflt1)) ||
                                            (p.CountryName.Contains(aflt2)) ||
                                            (p.CountryName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.CountryName.Contains(aflt0)) ||
                                            (p.CountryName.Contains(aflt1)) ||
                                            (p.CountryName.Contains(aflt2)) ||
                                            (p.CountryName.Contains(aflt3))
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
                                            (p.CountryName == null) ||
                                            (p.CountryName.Contains(aflt0)) ||
                                            (p.CountryName.Contains(aflt1)) ||
                                            (p.CountryName.Contains(aflt2)) ||
                                            (p.CountryName.Contains(aflt3)) ||
                                            (p.CountryName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.CountryName.Contains(aflt0)) ||
                                            (p.CountryName.Contains(aflt1)) ||
                                            (p.CountryName.Contains(aflt2)) ||
                                            (p.CountryName.Contains(aflt3)) ||
                                            (p.CountryName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = countryName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.CountryName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.CountryName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.CountryName.CompareTo(aflt) != 0 );
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
                IOrderedQueryable<LitCountry> orderedQuery = null;
                if(currentOrderBy != null) {
                    List<string> wasInUseOrderBy = new List<string>();
                    foreach(string propName in currentOrderBy) {
                        string lowerCaseStr = propName.ToLower();
                        if (wasInUseOrderBy.Contains(lowerCaseStr)) {
                            continue;
                        }
                        switch(lowerCaseStr) {
                            case "iso3" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Iso3);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Iso3);
                                }
                                wasInUseOrderBy.Add("iso3");
                                wasInUseOrderBy.Add("-iso3");
                                break;
                            case "-iso3" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Iso3);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Iso3);
                                }
                                wasInUseOrderBy.Add("iso3");
                                wasInUseOrderBy.Add("-iso3");
                                break;
                            case "iso2" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Iso2);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Iso2);
                                }
                                wasInUseOrderBy.Add("iso2");
                                wasInUseOrderBy.Add("-iso2");
                                break;
                            case "-iso2" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Iso2);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Iso2);
                                }
                                wasInUseOrderBy.Add("iso2");
                                wasInUseOrderBy.Add("-iso2");
                                break;
                            case "countryname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.CountryName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.CountryName);
                                }
                                wasInUseOrderBy.Add("countryname");
                                wasInUseOrderBy.Add("-countryname");
                                break;
                            case "-countryname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.CountryName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.CountryName);
                                }
                                wasInUseOrderBy.Add("countryname");
                                wasInUseOrderBy.Add("-countryname");
                                break;
                                default:
                                    break;
                        }
                    }
                }
                if(isFirstTime) {                
                    orderedQuery = query.OrderBy(p => p.Iso3);
                } // totals pageCount currentPageSize
                LitCountryViewPage resultObject = new LitCountryViewPage() {
                    page = (currentPage > 0) ? (currentPage-1) : currentPage,
                    pagesize = currentPageSize,
                    pagecount = pageCount,
                    total = totals
                };
                resultObject.items = orderedQuery.Skip((currentPage - 1) * currentPageSize).Take(currentPageSize).Select(itm => new LitCountryView() {
                            Iso3 = itm.Iso3,
                            Iso2 = itm.Iso2,
                            CountryName = itm.CountryName
                            }).ToList();
                return Ok(resultObject);
        } // the end of GetWithFilter()-method

        [HttpGet]
        [Route("getone")]
        [ResponseType(typeof(LitCountryView))]
        public IHttpActionResult getone([FromUri] System.String iso3
                , [FromUri] System.String iso2
                )
        {
            LitCountryView result = db.LitCountryDbSet
                    .Where(p => p.Iso3 == iso3)
                    .Where(p => p.Iso2 == iso2)
                    .Select(itm => new LitCountryView() {
                            Iso3 = itm.Iso3,
                            Iso2 = itm.Iso2,
                            CountryName = itm.CountryName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        } // the end of public GetOne()-method

        [HttpPut]
        [ResponseType(typeof(LitCountryView))]
        [Route("updateone")]
        public IHttpActionResult updateone([FromBody] LitCountryView viewToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            LitCountry resultEntity = db.LitCountryDbSet
                    .Where(p => p.Iso3 == viewToUpdate.Iso3)
                    .Where(p => p.Iso2 == viewToUpdate.Iso2)
                    .FirstOrDefault();
            if(resultEntity == null) {
                return NotFound();
            }

            resultEntity.CountryName =  viewToUpdate.CountryName;
            db.Entry(resultEntity).State = EntityState.Modified;
            db.SaveChanges();
            LitCountryView result = db.LitCountryDbSet
                    .Where(p => p.Iso3 == viewToUpdate.Iso3)
                    .Where(p => p.Iso2 == viewToUpdate.Iso2)
                    .Select(itm => new LitCountryView() {
                            Iso3 = itm.Iso3,
                            Iso2 = itm.Iso2,
                            CountryName = itm.CountryName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [ResponseType(typeof(LitCountryView))]
        [Route("addone")]
        public IHttpActionResult addone([FromBody] LitCountryView viewToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            LitCountry entityToAdd = new LitCountry();
            entityToAdd.Iso3 =  viewToAdd.Iso3;
            entityToAdd.Iso2 =  viewToAdd.Iso2;
            entityToAdd.CountryName =  viewToAdd.CountryName;
            db.LitCountryDbSet.Add(entityToAdd);
            db.SaveChanges();

            LitCountryView result = db.LitCountryDbSet
                    .Where(p => p.Iso3 == entityToAdd.Iso3)
                    .Where(p => p.Iso2 == entityToAdd.Iso2)
                    .Select(itm => new LitCountryView() {
                            Iso3 = itm.Iso3,
                            Iso2 = itm.Iso2,
                            CountryName = itm.CountryName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpDelete]
        [ResponseType(typeof(LitCountryView))]
        [Route("deleteone")]
        public IHttpActionResult deleteone([FromUri] System.String iso3
                , [FromUri] System.String iso2
                )
        {

                LitCountryView result = db.LitCountryDbSet
                    .Where(p => p.Iso3 == iso3)
                    .Where(p => p.Iso2 == iso2)
                    .Select(itm => new LitCountryView() {
                            Iso3 = itm.Iso3,
                            Iso2 = itm.Iso2,
                            CountryName = itm.CountryName
                    }).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }

                LitCountry entityToDelete = db.LitCountryDbSet
                    .Where(p => p.Iso3 == result.Iso3)
                    .Where(p => p.Iso2 == result.Iso2)
                    .FirstOrDefault();
                if (entityToDelete == null) {
                    return Ok(result);
                }
                db.LitCountryDbSet.Remove(entityToDelete);
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

