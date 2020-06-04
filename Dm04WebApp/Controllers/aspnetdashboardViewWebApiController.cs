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

using Dm02Context.AspNetBmSecurity;
using Dm03Views.AspNetBmSecurity;
using Dm01Entity.AspNetBmSecurity;

namespace Dm04WebApp.Controllers {

    [RoutePrefix("aspnetdashboardviewwebapi")]
    public class aspnetdashboardViewWebApiController: ApiController
    {
        private int defaultPageSize = 50;
        private int minPageSize = 5;
        private int maxPageSize = 150;
        private aspnetchckdbcontext db = new aspnetchckdbcontext();
        [HttpGet]
        [Route("getall")]
        public IQueryable<aspnetdashboardView> getall()
        {
            return db.aspnetdashboardDbSet
                    .Select(itm => new aspnetdashboardView() {
                            DashboardPk = itm.DashboardPk,
                            DashboardName = itm.DashboardName,
                            DashboardDescription = itm.DashboardDescription
                            });

        } // the end of Get()-method


        [HttpGet]
        [Route("getwithfilter")]
        [ResponseType(typeof(aspnetdashboardViewPage))]
        public IHttpActionResult getwithfilter([FromUri] System.Int32?[] dashboardPk 
                  , [FromUri] string[] dashboardPkOprtr 
                , [FromUri] System.String[] dashboardName 
                  , [FromUri] string[] dashboardNameOprtr 
                , [FromUri] System.String[] dashboardDescription 
                  , [FromUri] string[] dashboardDescriptionOprtr 
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
            IQueryable<aspnetdashboard> query = 
                db.aspnetdashboardDbSet;
            
            if(dashboardPk != null) {
                if(dashboardPk.Length > 0) {
                    int filterCnt = dashboardPk.Length;
                    int operatorCnt = 0;
                    if(dashboardPkOprtr != null) {
                        operatorCnt = dashboardPkOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.Int32 > filterLst = new List<System.Int32 >();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(dashboardPk[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( dashboardPkOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(dashboardPkOprtr[i])) {
                                    currOprtr = dashboardPkOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(dashboardPk[i].Value);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                   // 
                   // System.Int32[] filter = dashboardPk.Where(i => i.HasValue).Select(i => i.Value).ToArray();
                   //
                   System.Int32[] filter = filterLst.ToArray();
                    if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.DashboardPk));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Int32 aflt = dashboardPk[ fltItm.Value ].Value;
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.DashboardPk >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.DashboardPk <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.DashboardPk != aflt );
                                break;
                        }
                    }

                }
            }
            if(dashboardName != null) {
                if(dashboardName.Length > 0) {
                    int filterCnt = dashboardName.Length;
                    int operatorCnt = 0;
                    if(dashboardNameOprtr != null) {
                        operatorCnt = dashboardNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(dashboardName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( dashboardNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(dashboardNameOprtr[i])) {
                                    currOprtr = dashboardNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(dashboardName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = dashboardName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = dashboardName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.DashboardName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.DashboardName == null) ||
                                            (p.DashboardName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DashboardName.Contains(aflt0))
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
                                            (p.DashboardName == null) ||
                                            (p.DashboardName.Contains(aflt0)) ||
                                            (p.DashboardName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DashboardName.Contains(aflt0)) ||
                                            (p.DashboardName.Contains(aflt1))
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
                                            (p.DashboardName == null) ||
                                            (p.DashboardName.Contains(aflt0)) ||
                                            (p.DashboardName.Contains(aflt1)) ||
                                            (p.DashboardName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DashboardName.Contains(aflt0)) ||
                                            (p.DashboardName.Contains(aflt1)) ||
                                            (p.DashboardName.Contains(aflt2))
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
                                            (p.DashboardName == null) ||
                                            (p.DashboardName.Contains(aflt0)) ||
                                            (p.DashboardName.Contains(aflt1)) ||
                                            (p.DashboardName.Contains(aflt2)) ||
                                            (p.DashboardName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DashboardName.Contains(aflt0)) ||
                                            (p.DashboardName.Contains(aflt1)) ||
                                            (p.DashboardName.Contains(aflt2)) ||
                                            (p.DashboardName.Contains(aflt3))
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
                                            (p.DashboardName == null) ||
                                            (p.DashboardName.Contains(aflt0)) ||
                                            (p.DashboardName.Contains(aflt1)) ||
                                            (p.DashboardName.Contains(aflt2)) ||
                                            (p.DashboardName.Contains(aflt3)) ||
                                            (p.DashboardName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DashboardName.Contains(aflt0)) ||
                                            (p.DashboardName.Contains(aflt1)) ||
                                            (p.DashboardName.Contains(aflt2)) ||
                                            (p.DashboardName.Contains(aflt3)) ||
                                            (p.DashboardName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = dashboardName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.DashboardName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.DashboardName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.DashboardName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(dashboardDescription != null) {
                if(dashboardDescription.Length > 0) {
                    int filterCnt = dashboardDescription.Length;
                    int operatorCnt = 0;
                    if(dashboardDescriptionOprtr != null) {
                        operatorCnt = dashboardDescriptionOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(dashboardDescription[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( dashboardDescriptionOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(dashboardDescriptionOprtr[i])) {
                                    currOprtr = dashboardDescriptionOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(dashboardDescription[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = dashboardDescription.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = dashboardDescription.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.DashboardDescription == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.DashboardDescription == null) ||
                                            (p.DashboardDescription.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DashboardDescription.Contains(aflt0))
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
                                            (p.DashboardDescription == null) ||
                                            (p.DashboardDescription.Contains(aflt0)) ||
                                            (p.DashboardDescription.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DashboardDescription.Contains(aflt0)) ||
                                            (p.DashboardDescription.Contains(aflt1))
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
                                            (p.DashboardDescription == null) ||
                                            (p.DashboardDescription.Contains(aflt0)) ||
                                            (p.DashboardDescription.Contains(aflt1)) ||
                                            (p.DashboardDescription.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DashboardDescription.Contains(aflt0)) ||
                                            (p.DashboardDescription.Contains(aflt1)) ||
                                            (p.DashboardDescription.Contains(aflt2))
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
                                            (p.DashboardDescription == null) ||
                                            (p.DashboardDescription.Contains(aflt0)) ||
                                            (p.DashboardDescription.Contains(aflt1)) ||
                                            (p.DashboardDescription.Contains(aflt2)) ||
                                            (p.DashboardDescription.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DashboardDescription.Contains(aflt0)) ||
                                            (p.DashboardDescription.Contains(aflt1)) ||
                                            (p.DashboardDescription.Contains(aflt2)) ||
                                            (p.DashboardDescription.Contains(aflt3))
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
                                            (p.DashboardDescription == null) ||
                                            (p.DashboardDescription.Contains(aflt0)) ||
                                            (p.DashboardDescription.Contains(aflt1)) ||
                                            (p.DashboardDescription.Contains(aflt2)) ||
                                            (p.DashboardDescription.Contains(aflt3)) ||
                                            (p.DashboardDescription.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DashboardDescription.Contains(aflt0)) ||
                                            (p.DashboardDescription.Contains(aflt1)) ||
                                            (p.DashboardDescription.Contains(aflt2)) ||
                                            (p.DashboardDescription.Contains(aflt3)) ||
                                            (p.DashboardDescription.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = dashboardDescription[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.DashboardDescription.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.DashboardDescription.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.DashboardDescription.CompareTo(aflt) != 0 );
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
                IOrderedQueryable<aspnetdashboard> orderedQuery = null;
                if(currentOrderBy != null) {
                    List<string> wasInUseOrderBy = new List<string>();
                    foreach(string propName in currentOrderBy) {
                        string lowerCaseStr = propName.ToLower();
                        if (wasInUseOrderBy.Contains(lowerCaseStr)) {
                            continue;
                        }
                        switch(lowerCaseStr) {
                            case "dashboardpk" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.DashboardPk);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.DashboardPk);
                                }
                                wasInUseOrderBy.Add("dashboardpk");
                                wasInUseOrderBy.Add("-dashboardpk");
                                break;
                            case "-dashboardpk" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.DashboardPk);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.DashboardPk);
                                }
                                wasInUseOrderBy.Add("dashboardpk");
                                wasInUseOrderBy.Add("-dashboardpk");
                                break;
                            case "dashboardname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.DashboardName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.DashboardName);
                                }
                                wasInUseOrderBy.Add("dashboardname");
                                wasInUseOrderBy.Add("-dashboardname");
                                break;
                            case "-dashboardname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.DashboardName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.DashboardName);
                                }
                                wasInUseOrderBy.Add("dashboardname");
                                wasInUseOrderBy.Add("-dashboardname");
                                break;
                            case "dashboarddescription" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.DashboardDescription);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.DashboardDescription);
                                }
                                wasInUseOrderBy.Add("dashboarddescription");
                                wasInUseOrderBy.Add("-dashboarddescription");
                                break;
                            case "-dashboarddescription" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.DashboardDescription);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.DashboardDescription);
                                }
                                wasInUseOrderBy.Add("dashboarddescription");
                                wasInUseOrderBy.Add("-dashboarddescription");
                                break;
                                default:
                                    break;
                        }
                    }
                }
                if(isFirstTime) {                
                    orderedQuery = query.OrderBy(p => p.DashboardPk);
                } // totals pageCount currentPageSize
                aspnetdashboardViewPage resultObject = new aspnetdashboardViewPage() {
                    page = (currentPage > 0) ? (currentPage-1) : currentPage,
                    pagesize = currentPageSize,
                    pagecount = pageCount,
                    total = totals
                };
                resultObject.items = orderedQuery.Skip((currentPage - 1) * currentPageSize).Take(currentPageSize).Select(itm => new aspnetdashboardView() {
                            DashboardPk = itm.DashboardPk,
                            DashboardName = itm.DashboardName,
                            DashboardDescription = itm.DashboardDescription
                            }).ToList();
                return Ok(resultObject);
        } // the end of GetWithFilter()-method

        [HttpGet]
        [Route("getone")]
        [ResponseType(typeof(aspnetdashboardView))]
        public IHttpActionResult getone([FromUri] System.Int32 dashboardPk
                )
        {
            aspnetdashboardView result = db.aspnetdashboardDbSet
                    .Where(p => p.DashboardPk == dashboardPk)
                    .Select(itm => new aspnetdashboardView() {
                            DashboardPk = itm.DashboardPk,
                            DashboardName = itm.DashboardName,
                            DashboardDescription = itm.DashboardDescription
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        } // the end of public GetOne()-method

        [HttpPut]
        [ResponseType(typeof(aspnetdashboardView))]
        [Route("updateone")]
        public IHttpActionResult updateone([FromBody] aspnetdashboardView viewToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            aspnetdashboard resultEntity = db.aspnetdashboardDbSet
                    .Where(p => p.DashboardPk == viewToUpdate.DashboardPk)
                    .FirstOrDefault();
            if(resultEntity == null) {
                return NotFound();
            }

            resultEntity.DashboardName =  viewToUpdate.DashboardName;
            resultEntity.DashboardDescription =  viewToUpdate.DashboardDescription;
            db.Entry(resultEntity).State = EntityState.Modified;
            db.SaveChanges();
            aspnetdashboardView result = db.aspnetdashboardDbSet
                    .Where(p => p.DashboardPk == viewToUpdate.DashboardPk)
                    .Select(itm => new aspnetdashboardView() {
                            DashboardPk = itm.DashboardPk,
                            DashboardName = itm.DashboardName,
                            DashboardDescription = itm.DashboardDescription
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [ResponseType(typeof(aspnetdashboardView))]
        [Route("addone")]
        public IHttpActionResult addone([FromBody] aspnetdashboardView viewToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            aspnetdashboard entityToAdd = new aspnetdashboard();
            entityToAdd.DashboardPk =  viewToAdd.DashboardPk;
            entityToAdd.DashboardName =  viewToAdd.DashboardName;
            entityToAdd.DashboardDescription =  viewToAdd.DashboardDescription;
            db.aspnetdashboardDbSet.Add(entityToAdd);
            db.SaveChanges();

            aspnetdashboardView result = db.aspnetdashboardDbSet
                    .Where(p => p.DashboardPk == entityToAdd.DashboardPk)
                    .Select(itm => new aspnetdashboardView() {
                            DashboardPk = itm.DashboardPk,
                            DashboardName = itm.DashboardName,
                            DashboardDescription = itm.DashboardDescription
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpDelete]
        [ResponseType(typeof(aspnetdashboardView))]
        [Route("deleteone")]
        public IHttpActionResult deleteone([FromUri] System.Int32 dashboardPk
                )
        {

                aspnetdashboardView result = db.aspnetdashboardDbSet
                    .Where(p => p.DashboardPk == dashboardPk)
                    .Select(itm => new aspnetdashboardView() {
                            DashboardPk = itm.DashboardPk,
                            DashboardName = itm.DashboardName,
                            DashboardDescription = itm.DashboardDescription
                    }).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }

                aspnetdashboard entityToDelete = db.aspnetdashboardDbSet
                    .Where(p => p.DashboardPk == result.DashboardPk)
                    .FirstOrDefault();
                if (entityToDelete == null) {
                    return Ok(result);
                }
                db.aspnetdashboardDbSet.Remove(entityToDelete);
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

