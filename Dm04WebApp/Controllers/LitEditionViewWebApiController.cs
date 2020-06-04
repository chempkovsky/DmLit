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

    [RoutePrefix("liteditionviewwebapi")]
    public class LitEditionViewWebApiController: ApiController
    {
        private int defaultPageSize = 50;
        private int minPageSize = 5;
        private int maxPageSize = 150;
        private LitDbContext db = new LitDbContext();
        [HttpGet]
        [Route("getall")]
        public IQueryable<LitEditionView> getall()
        {
            return db.LitEditionDbSet
                    .Select(itm => new LitEditionView() {
                            editionId = itm.EditionId,
                            editionName = itm.EditionName
                            });

        } // the end of Get()-method


        [HttpGet]
        [Route("getwithfilter")]
        [ResponseType(typeof(LitEditionViewPage))]
        public IHttpActionResult getwithfilter([FromUri] System.Int32?[] editionId 
                  , [FromUri] string[] editionIdOprtr 
                , [FromUri] System.String[] editionName 
                  , [FromUri] string[] editionNameOprtr 
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
            IQueryable<LitEdition> query = 
                db.LitEditionDbSet;
            
            if(editionId != null) {
                if(editionId.Length > 0) {
                    int filterCnt = editionId.Length;
                    int operatorCnt = 0;
                    if(editionIdOprtr != null) {
                        operatorCnt = editionIdOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.Int32 > filterLst = new List<System.Int32 >();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(editionId[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( editionIdOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(editionIdOprtr[i])) {
                                    currOprtr = editionIdOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(editionId[i].Value);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                   // 
                   // System.Int32[] filter = editionId.Where(i => i.HasValue).Select(i => i.Value).ToArray();
                   //
                   System.Int32[] filter = filterLst.ToArray();
                    if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.EditionId));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Int32 aflt = editionId[ fltItm.Value ].Value;
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.EditionId >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.EditionId <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.EditionId != aflt );
                                break;
                        }
                    }

                }
            }
            if(editionName != null) {
                if(editionName.Length > 0) {
                    int filterCnt = editionName.Length;
                    int operatorCnt = 0;
                    if(editionNameOprtr != null) {
                        operatorCnt = editionNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(editionName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( editionNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(editionNameOprtr[i])) {
                                    currOprtr = editionNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(editionName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = editionName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = editionName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.EditionName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.EditionName == null) ||
                                            (p.EditionName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.EditionName.Contains(aflt0))
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
                                            (p.EditionName == null) ||
                                            (p.EditionName.Contains(aflt0)) ||
                                            (p.EditionName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.EditionName.Contains(aflt0)) ||
                                            (p.EditionName.Contains(aflt1))
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
                                            (p.EditionName == null) ||
                                            (p.EditionName.Contains(aflt0)) ||
                                            (p.EditionName.Contains(aflt1)) ||
                                            (p.EditionName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.EditionName.Contains(aflt0)) ||
                                            (p.EditionName.Contains(aflt1)) ||
                                            (p.EditionName.Contains(aflt2))
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
                                            (p.EditionName == null) ||
                                            (p.EditionName.Contains(aflt0)) ||
                                            (p.EditionName.Contains(aflt1)) ||
                                            (p.EditionName.Contains(aflt2)) ||
                                            (p.EditionName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.EditionName.Contains(aflt0)) ||
                                            (p.EditionName.Contains(aflt1)) ||
                                            (p.EditionName.Contains(aflt2)) ||
                                            (p.EditionName.Contains(aflt3))
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
                                            (p.EditionName == null) ||
                                            (p.EditionName.Contains(aflt0)) ||
                                            (p.EditionName.Contains(aflt1)) ||
                                            (p.EditionName.Contains(aflt2)) ||
                                            (p.EditionName.Contains(aflt3)) ||
                                            (p.EditionName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.EditionName.Contains(aflt0)) ||
                                            (p.EditionName.Contains(aflt1)) ||
                                            (p.EditionName.Contains(aflt2)) ||
                                            (p.EditionName.Contains(aflt3)) ||
                                            (p.EditionName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = editionName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.EditionName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.EditionName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.EditionName.CompareTo(aflt) != 0 );
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
                IOrderedQueryable<LitEdition> orderedQuery = null;
                if(currentOrderBy != null) {
                    List<string> wasInUseOrderBy = new List<string>();
                    foreach(string propName in currentOrderBy) {
                        string lowerCaseStr = propName.ToLower();
                        if (wasInUseOrderBy.Contains(lowerCaseStr)) {
                            continue;
                        }
                        switch(lowerCaseStr) {
                            case "editionid" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.EditionId);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.EditionId);
                                }
                                wasInUseOrderBy.Add("editionid");
                                wasInUseOrderBy.Add("-editionid");
                                break;
                            case "-editionid" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.EditionId);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.EditionId);
                                }
                                wasInUseOrderBy.Add("editionid");
                                wasInUseOrderBy.Add("-editionid");
                                break;
                            case "editionname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.EditionName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.EditionName);
                                }
                                wasInUseOrderBy.Add("editionname");
                                wasInUseOrderBy.Add("-editionname");
                                break;
                            case "-editionname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.EditionName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.EditionName);
                                }
                                wasInUseOrderBy.Add("editionname");
                                wasInUseOrderBy.Add("-editionname");
                                break;
                                default:
                                    break;
                        }
                    }
                }
                if(isFirstTime) {                
                    orderedQuery = query.OrderBy(p => p.EditionId);
                } // totals pageCount currentPageSize
                LitEditionViewPage resultObject = new LitEditionViewPage() {
                    page = (currentPage > 0) ? (currentPage-1) : currentPage,
                    pagesize = currentPageSize,
                    pagecount = pageCount,
                    total = totals
                };
                resultObject.items = orderedQuery.Skip((currentPage - 1) * currentPageSize).Take(currentPageSize).Select(itm => new LitEditionView() {
                            editionId = itm.EditionId,
                            editionName = itm.EditionName
                            }).ToList();
                return Ok(resultObject);
        } // the end of GetWithFilter()-method

        [HttpGet]
        [Route("getone")]
        [ResponseType(typeof(LitEditionView))]
        public IHttpActionResult getone([FromUri] System.Int32 editionId
                )
        {
            LitEditionView result = db.LitEditionDbSet
                    .Where(p => p.EditionId == editionId)
                    .Select(itm => new LitEditionView() {
                            editionId = itm.EditionId,
                            editionName = itm.EditionName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        } // the end of public GetOne()-method

        [HttpPut]
        [ResponseType(typeof(LitEditionView))]
        [Route("updateone")]
        public IHttpActionResult updateone([FromBody] LitEditionView viewToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            LitEdition resultEntity = db.LitEditionDbSet
                    .Where(p => p.EditionId == viewToUpdate.editionId)
                    .FirstOrDefault();
            if(resultEntity == null) {
                return NotFound();
            }

            resultEntity.EditionName =  viewToUpdate.editionName;
            db.Entry(resultEntity).State = EntityState.Modified;
            db.SaveChanges();
            LitEditionView result = db.LitEditionDbSet
                    .Where(p => p.EditionId == viewToUpdate.editionId)
                    .Select(itm => new LitEditionView() {
                            editionId = itm.EditionId,
                            editionName = itm.EditionName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [ResponseType(typeof(LitEditionView))]
        [Route("addone")]
        public IHttpActionResult addone([FromBody] LitEditionView viewToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            LitEdition entityToAdd = new LitEdition();
            entityToAdd.EditionId =  viewToAdd.editionId;
            entityToAdd.EditionName =  viewToAdd.editionName;
            db.LitEditionDbSet.Add(entityToAdd);
            db.SaveChanges();

            LitEditionView result = db.LitEditionDbSet
                    .Where(p => p.EditionId == entityToAdd.EditionId)
                    .Select(itm => new LitEditionView() {
                            editionId = itm.EditionId,
                            editionName = itm.EditionName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpDelete]
        [ResponseType(typeof(LitEditionView))]
        [Route("deleteone")]
        public IHttpActionResult deleteone([FromUri] System.Int32 editionId
                )
        {

                LitEditionView result = db.LitEditionDbSet
                    .Where(p => p.EditionId == editionId)
                    .Select(itm => new LitEditionView() {
                            editionId = itm.EditionId,
                            editionName = itm.EditionName
                    }).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }

                LitEdition entityToDelete = db.LitEditionDbSet
                    .Where(p => p.EditionId == result.editionId)
                    .FirstOrDefault();
                if (entityToDelete == null) {
                    return Ok(result);
                }
                db.LitEditionDbSet.Remove(entityToDelete);
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

