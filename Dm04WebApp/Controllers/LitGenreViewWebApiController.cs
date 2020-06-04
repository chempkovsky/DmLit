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

    [RoutePrefix("litgenreviewwebapi")]
    public class LitGenreViewWebApiController: ApiController
    {
        private int defaultPageSize = 50;
        private int minPageSize = 5;
        private int maxPageSize = 150;
        private LitDbContext db = new LitDbContext();
        [HttpGet]
        [Route("getall")]
        public IQueryable<LitGenreView> getall()
        {
            return db.LitGenreDbSet
                    .Select(itm => new LitGenreView() {
                            GenreId = itm.GenreId,
                            GenreName = itm.GenreName
                            });

        } // the end of Get()-method


        [HttpGet]
        [Route("getwithfilter")]
        [ResponseType(typeof(LitGenreViewPage))]
        public IHttpActionResult getwithfilter([FromUri] System.Int32?[] genreId 
                  , [FromUri] string[] genreIdOprtr 
                , [FromUri] System.String[] genreName 
                  , [FromUri] string[] genreNameOprtr 
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
            IQueryable<LitGenre> query = 
                db.LitGenreDbSet;
            
            if(genreId != null) {
                if(genreId.Length > 0) {
                    int filterCnt = genreId.Length;
                    int operatorCnt = 0;
                    if(genreIdOprtr != null) {
                        operatorCnt = genreIdOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.Int32 > filterLst = new List<System.Int32 >();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(genreId[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( genreIdOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(genreIdOprtr[i])) {
                                    currOprtr = genreIdOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(genreId[i].Value);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                   // 
                   // System.Int32[] filter = genreId.Where(i => i.HasValue).Select(i => i.Value).ToArray();
                   //
                   System.Int32[] filter = filterLst.ToArray();
                    if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.GenreId));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Int32 aflt = genreId[ fltItm.Value ].Value;
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.GenreId >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.GenreId <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.GenreId != aflt );
                                break;
                        }
                    }

                }
            }
            if(genreName != null) {
                if(genreName.Length > 0) {
                    int filterCnt = genreName.Length;
                    int operatorCnt = 0;
                    if(genreNameOprtr != null) {
                        operatorCnt = genreNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(genreName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( genreNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(genreNameOprtr[i])) {
                                    currOprtr = genreNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(genreName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = genreName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = genreName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.GenreName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.GenreName == null) ||
                                            (p.GenreName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.GenreName.Contains(aflt0))
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
                                            (p.GenreName == null) ||
                                            (p.GenreName.Contains(aflt0)) ||
                                            (p.GenreName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.GenreName.Contains(aflt0)) ||
                                            (p.GenreName.Contains(aflt1))
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
                                            (p.GenreName == null) ||
                                            (p.GenreName.Contains(aflt0)) ||
                                            (p.GenreName.Contains(aflt1)) ||
                                            (p.GenreName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.GenreName.Contains(aflt0)) ||
                                            (p.GenreName.Contains(aflt1)) ||
                                            (p.GenreName.Contains(aflt2))
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
                                            (p.GenreName == null) ||
                                            (p.GenreName.Contains(aflt0)) ||
                                            (p.GenreName.Contains(aflt1)) ||
                                            (p.GenreName.Contains(aflt2)) ||
                                            (p.GenreName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.GenreName.Contains(aflt0)) ||
                                            (p.GenreName.Contains(aflt1)) ||
                                            (p.GenreName.Contains(aflt2)) ||
                                            (p.GenreName.Contains(aflt3))
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
                                            (p.GenreName == null) ||
                                            (p.GenreName.Contains(aflt0)) ||
                                            (p.GenreName.Contains(aflt1)) ||
                                            (p.GenreName.Contains(aflt2)) ||
                                            (p.GenreName.Contains(aflt3)) ||
                                            (p.GenreName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.GenreName.Contains(aflt0)) ||
                                            (p.GenreName.Contains(aflt1)) ||
                                            (p.GenreName.Contains(aflt2)) ||
                                            (p.GenreName.Contains(aflt3)) ||
                                            (p.GenreName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = genreName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.GenreName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.GenreName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.GenreName.CompareTo(aflt) != 0 );
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
                IOrderedQueryable<LitGenre> orderedQuery = null;
                if(currentOrderBy != null) {
                    List<string> wasInUseOrderBy = new List<string>();
                    foreach(string propName in currentOrderBy) {
                        string lowerCaseStr = propName.ToLower();
                        if (wasInUseOrderBy.Contains(lowerCaseStr)) {
                            continue;
                        }
                        switch(lowerCaseStr) {
                            case "genreid" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.GenreId);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.GenreId);
                                }
                                wasInUseOrderBy.Add("genreid");
                                wasInUseOrderBy.Add("-genreid");
                                break;
                            case "-genreid" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.GenreId);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.GenreId);
                                }
                                wasInUseOrderBy.Add("genreid");
                                wasInUseOrderBy.Add("-genreid");
                                break;
                            case "genrename" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.GenreName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.GenreName);
                                }
                                wasInUseOrderBy.Add("genrename");
                                wasInUseOrderBy.Add("-genrename");
                                break;
                            case "-genrename" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.GenreName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.GenreName);
                                }
                                wasInUseOrderBy.Add("genrename");
                                wasInUseOrderBy.Add("-genrename");
                                break;
                                default:
                                    break;
                        }
                    }
                }
                if(isFirstTime) {                
                    orderedQuery = query.OrderBy(p => p.GenreId);
                } // totals pageCount currentPageSize
                LitGenreViewPage resultObject = new LitGenreViewPage() {
                    page = (currentPage > 0) ? (currentPage-1) : currentPage,
                    pagesize = currentPageSize,
                    pagecount = pageCount,
                    total = totals
                };
                resultObject.items = orderedQuery.Skip((currentPage - 1) * currentPageSize).Take(currentPageSize).Select(itm => new LitGenreView() {
                            GenreId = itm.GenreId,
                            GenreName = itm.GenreName
                            }).ToList();
                return Ok(resultObject);
        } // the end of GetWithFilter()-method

        [HttpGet]
        [Route("getone")]
        [ResponseType(typeof(LitGenreView))]
        public IHttpActionResult getone([FromUri] System.Int32 genreId
                )
        {
            LitGenreView result = db.LitGenreDbSet
                    .Where(p => p.GenreId == genreId)
                    .Select(itm => new LitGenreView() {
                            GenreId = itm.GenreId,
                            GenreName = itm.GenreName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        } // the end of public GetOne()-method

        [HttpPut]
        [ResponseType(typeof(LitGenreView))]
        [Route("updateone")]
        public IHttpActionResult updateone([FromBody] LitGenreView viewToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            LitGenre resultEntity = db.LitGenreDbSet
                    .Where(p => p.GenreId == viewToUpdate.GenreId)
                    .FirstOrDefault();
            if(resultEntity == null) {
                return NotFound();
            }

            resultEntity.GenreName =  viewToUpdate.GenreName;
            db.Entry(resultEntity).State = EntityState.Modified;
            db.SaveChanges();
            LitGenreView result = db.LitGenreDbSet
                    .Where(p => p.GenreId == viewToUpdate.GenreId)
                    .Select(itm => new LitGenreView() {
                            GenreId = itm.GenreId,
                            GenreName = itm.GenreName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [ResponseType(typeof(LitGenreView))]
        [Route("addone")]
        public IHttpActionResult addone([FromBody] LitGenreView viewToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            LitGenre entityToAdd = new LitGenre();
            entityToAdd.GenreId =  viewToAdd.GenreId;
            entityToAdd.GenreName =  viewToAdd.GenreName;
            db.LitGenreDbSet.Add(entityToAdd);
            db.SaveChanges();

            LitGenreView result = db.LitGenreDbSet
                    .Where(p => p.GenreId == entityToAdd.GenreId)
                    .Select(itm => new LitGenreView() {
                            GenreId = itm.GenreId,
                            GenreName = itm.GenreName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpDelete]
        [ResponseType(typeof(LitGenreView))]
        [Route("deleteone")]
        public IHttpActionResult deleteone([FromUri] System.Int32 genreId
                )
        {

                LitGenreView result = db.LitGenreDbSet
                    .Where(p => p.GenreId == genreId)
                    .Select(itm => new LitGenreView() {
                            GenreId = itm.GenreId,
                            GenreName = itm.GenreName
                    }).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }

                LitGenre entityToDelete = db.LitGenreDbSet
                    .Where(p => p.GenreId == result.GenreId)
                    .FirstOrDefault();
                if (entityToDelete == null) {
                    return Ok(result);
                }
                db.LitGenreDbSet.Remove(entityToDelete);
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

