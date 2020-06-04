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

    [RoutePrefix("aspnetmodelviewwebapi")]
    public class aspnetmodelViewWebApiController: ApiController
    {
        private int defaultPageSize = 50;
        private int minPageSize = 5;
        private int maxPageSize = 150;
        private aspnetchckdbcontext db = new aspnetchckdbcontext();
        [HttpGet]
        [Route("getall")]
        public IQueryable<aspnetmodelView> getall()
        {
            return db.aspnetmodellDbSet
                    .Select(itm => new aspnetmodelView() {
                            ModelPk = itm.ModelPk,
                            ModelName = itm.ModelName,
                            ModelDescription = itm.ModelDescription
                            });

        } // the end of Get()-method


        [HttpGet]
        [Route("getwithfilter")]
        [ResponseType(typeof(aspnetmodelViewPage))]
        public IHttpActionResult getwithfilter([FromUri] System.Int32?[] modelPk 
                  , [FromUri] string[] modelPkOprtr 
                , [FromUri] System.String[] modelName 
                  , [FromUri] string[] modelNameOprtr 
                , [FromUri] System.String[] modelDescription 
                  , [FromUri] string[] modelDescriptionOprtr 
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
            IQueryable<aspnetmodel> query = 
                db.aspnetmodellDbSet;
            
            if(modelPk != null) {
                if(modelPk.Length > 0) {
                    int filterCnt = modelPk.Length;
                    int operatorCnt = 0;
                    if(modelPkOprtr != null) {
                        operatorCnt = modelPkOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.Int32 > filterLst = new List<System.Int32 >();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(modelPk[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( modelPkOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(modelPkOprtr[i])) {
                                    currOprtr = modelPkOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(modelPk[i].Value);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                   // 
                   // System.Int32[] filter = modelPk.Where(i => i.HasValue).Select(i => i.Value).ToArray();
                   //
                   System.Int32[] filter = filterLst.ToArray();
                    if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.ModelPk));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Int32 aflt = modelPk[ fltItm.Value ].Value;
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.ModelPk >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.ModelPk <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.ModelPk != aflt );
                                break;
                        }
                    }

                }
            }
            if(modelName != null) {
                if(modelName.Length > 0) {
                    int filterCnt = modelName.Length;
                    int operatorCnt = 0;
                    if(modelNameOprtr != null) {
                        operatorCnt = modelNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(modelName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( modelNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(modelNameOprtr[i])) {
                                    currOprtr = modelNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(modelName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = modelName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = modelName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.ModelName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.ModelName == null) ||
                                            (p.ModelName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.ModelName.Contains(aflt0))
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
                                            (p.ModelName == null) ||
                                            (p.ModelName.Contains(aflt0)) ||
                                            (p.ModelName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.ModelName.Contains(aflt0)) ||
                                            (p.ModelName.Contains(aflt1))
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
                                            (p.ModelName == null) ||
                                            (p.ModelName.Contains(aflt0)) ||
                                            (p.ModelName.Contains(aflt1)) ||
                                            (p.ModelName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.ModelName.Contains(aflt0)) ||
                                            (p.ModelName.Contains(aflt1)) ||
                                            (p.ModelName.Contains(aflt2))
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
                                            (p.ModelName == null) ||
                                            (p.ModelName.Contains(aflt0)) ||
                                            (p.ModelName.Contains(aflt1)) ||
                                            (p.ModelName.Contains(aflt2)) ||
                                            (p.ModelName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.ModelName.Contains(aflt0)) ||
                                            (p.ModelName.Contains(aflt1)) ||
                                            (p.ModelName.Contains(aflt2)) ||
                                            (p.ModelName.Contains(aflt3))
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
                                            (p.ModelName == null) ||
                                            (p.ModelName.Contains(aflt0)) ||
                                            (p.ModelName.Contains(aflt1)) ||
                                            (p.ModelName.Contains(aflt2)) ||
                                            (p.ModelName.Contains(aflt3)) ||
                                            (p.ModelName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.ModelName.Contains(aflt0)) ||
                                            (p.ModelName.Contains(aflt1)) ||
                                            (p.ModelName.Contains(aflt2)) ||
                                            (p.ModelName.Contains(aflt3)) ||
                                            (p.ModelName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = modelName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.ModelName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.ModelName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.ModelName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(modelDescription != null) {
                if(modelDescription.Length > 0) {
                    int filterCnt = modelDescription.Length;
                    int operatorCnt = 0;
                    if(modelDescriptionOprtr != null) {
                        operatorCnt = modelDescriptionOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(modelDescription[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( modelDescriptionOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(modelDescriptionOprtr[i])) {
                                    currOprtr = modelDescriptionOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(modelDescription[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = modelDescription.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = modelDescription.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.ModelDescription == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.ModelDescription == null) ||
                                            (p.ModelDescription.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.ModelDescription.Contains(aflt0))
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
                                            (p.ModelDescription == null) ||
                                            (p.ModelDescription.Contains(aflt0)) ||
                                            (p.ModelDescription.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.ModelDescription.Contains(aflt0)) ||
                                            (p.ModelDescription.Contains(aflt1))
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
                                            (p.ModelDescription == null) ||
                                            (p.ModelDescription.Contains(aflt0)) ||
                                            (p.ModelDescription.Contains(aflt1)) ||
                                            (p.ModelDescription.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.ModelDescription.Contains(aflt0)) ||
                                            (p.ModelDescription.Contains(aflt1)) ||
                                            (p.ModelDescription.Contains(aflt2))
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
                                            (p.ModelDescription == null) ||
                                            (p.ModelDescription.Contains(aflt0)) ||
                                            (p.ModelDescription.Contains(aflt1)) ||
                                            (p.ModelDescription.Contains(aflt2)) ||
                                            (p.ModelDescription.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.ModelDescription.Contains(aflt0)) ||
                                            (p.ModelDescription.Contains(aflt1)) ||
                                            (p.ModelDescription.Contains(aflt2)) ||
                                            (p.ModelDescription.Contains(aflt3))
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
                                            (p.ModelDescription == null) ||
                                            (p.ModelDescription.Contains(aflt0)) ||
                                            (p.ModelDescription.Contains(aflt1)) ||
                                            (p.ModelDescription.Contains(aflt2)) ||
                                            (p.ModelDescription.Contains(aflt3)) ||
                                            (p.ModelDescription.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.ModelDescription.Contains(aflt0)) ||
                                            (p.ModelDescription.Contains(aflt1)) ||
                                            (p.ModelDescription.Contains(aflt2)) ||
                                            (p.ModelDescription.Contains(aflt3)) ||
                                            (p.ModelDescription.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = modelDescription[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.ModelDescription.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.ModelDescription.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.ModelDescription.CompareTo(aflt) != 0 );
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
                IOrderedQueryable<aspnetmodel> orderedQuery = null;
                if(currentOrderBy != null) {
                    List<string> wasInUseOrderBy = new List<string>();
                    foreach(string propName in currentOrderBy) {
                        string lowerCaseStr = propName.ToLower();
                        if (wasInUseOrderBy.Contains(lowerCaseStr)) {
                            continue;
                        }
                        switch(lowerCaseStr) {
                            case "modelpk" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.ModelPk);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.ModelPk);
                                }
                                wasInUseOrderBy.Add("modelpk");
                                wasInUseOrderBy.Add("-modelpk");
                                break;
                            case "-modelpk" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.ModelPk);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.ModelPk);
                                }
                                wasInUseOrderBy.Add("modelpk");
                                wasInUseOrderBy.Add("-modelpk");
                                break;
                            case "modelname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.ModelName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.ModelName);
                                }
                                wasInUseOrderBy.Add("modelname");
                                wasInUseOrderBy.Add("-modelname");
                                break;
                            case "-modelname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.ModelName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.ModelName);
                                }
                                wasInUseOrderBy.Add("modelname");
                                wasInUseOrderBy.Add("-modelname");
                                break;
                            case "modeldescription" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.ModelDescription);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.ModelDescription);
                                }
                                wasInUseOrderBy.Add("modeldescription");
                                wasInUseOrderBy.Add("-modeldescription");
                                break;
                            case "-modeldescription" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.ModelDescription);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.ModelDescription);
                                }
                                wasInUseOrderBy.Add("modeldescription");
                                wasInUseOrderBy.Add("-modeldescription");
                                break;
                                default:
                                    break;
                        }
                    }
                }
                if(isFirstTime) {                
                    orderedQuery = query.OrderBy(p => p.ModelPk);
                } // totals pageCount currentPageSize
                aspnetmodelViewPage resultObject = new aspnetmodelViewPage() {
                    page = (currentPage > 0) ? (currentPage-1) : currentPage,
                    pagesize = currentPageSize,
                    pagecount = pageCount,
                    total = totals
                };
                resultObject.items = orderedQuery.Skip((currentPage - 1) * currentPageSize).Take(currentPageSize).Select(itm => new aspnetmodelView() {
                            ModelPk = itm.ModelPk,
                            ModelName = itm.ModelName,
                            ModelDescription = itm.ModelDescription
                            }).ToList();
                return Ok(resultObject);
        } // the end of GetWithFilter()-method

        [HttpGet]
        [Route("getone")]
        [ResponseType(typeof(aspnetmodelView))]
        public IHttpActionResult getone([FromUri] System.Int32 modelPk
                )
        {
            aspnetmodelView result = db.aspnetmodellDbSet
                    .Where(p => p.ModelPk == modelPk)
                    .Select(itm => new aspnetmodelView() {
                            ModelPk = itm.ModelPk,
                            ModelName = itm.ModelName,
                            ModelDescription = itm.ModelDescription
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        } // the end of public GetOne()-method

        [HttpPut]
        [ResponseType(typeof(aspnetmodelView))]
        [Route("updateone")]
        public IHttpActionResult updateone([FromBody] aspnetmodelView viewToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            aspnetmodel resultEntity = db.aspnetmodellDbSet
                    .Where(p => p.ModelPk == viewToUpdate.ModelPk)
                    .FirstOrDefault();
            if(resultEntity == null) {
                return NotFound();
            }

            resultEntity.ModelName =  viewToUpdate.ModelName;
            resultEntity.ModelDescription =  viewToUpdate.ModelDescription;
            db.Entry(resultEntity).State = EntityState.Modified;
            db.SaveChanges();
            aspnetmodelView result = db.aspnetmodellDbSet
                    .Where(p => p.ModelPk == viewToUpdate.ModelPk)
                    .Select(itm => new aspnetmodelView() {
                            ModelPk = itm.ModelPk,
                            ModelName = itm.ModelName,
                            ModelDescription = itm.ModelDescription
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [ResponseType(typeof(aspnetmodelView))]
        [Route("addone")]
        public IHttpActionResult addone([FromBody] aspnetmodelView viewToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            aspnetmodel entityToAdd = new aspnetmodel();
            entityToAdd.ModelPk =  viewToAdd.ModelPk;
            entityToAdd.ModelName =  viewToAdd.ModelName;
            entityToAdd.ModelDescription =  viewToAdd.ModelDescription;
            db.aspnetmodellDbSet.Add(entityToAdd);
            db.SaveChanges();

            aspnetmodelView result = db.aspnetmodellDbSet
                    .Where(p => p.ModelPk == entityToAdd.ModelPk)
                    .Select(itm => new aspnetmodelView() {
                            ModelPk = itm.ModelPk,
                            ModelName = itm.ModelName,
                            ModelDescription = itm.ModelDescription
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpDelete]
        [ResponseType(typeof(aspnetmodelView))]
        [Route("deleteone")]
        public IHttpActionResult deleteone([FromUri] System.Int32 modelPk
                )
        {

                aspnetmodelView result = db.aspnetmodellDbSet
                    .Where(p => p.ModelPk == modelPk)
                    .Select(itm => new aspnetmodelView() {
                            ModelPk = itm.ModelPk,
                            ModelName = itm.ModelName,
                            ModelDescription = itm.ModelDescription
                    }).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }

                aspnetmodel entityToDelete = db.aspnetmodellDbSet
                    .Where(p => p.ModelPk == result.ModelPk)
                    .FirstOrDefault();
                if (entityToDelete == null) {
                    return Ok(result);
                }
                db.aspnetmodellDbSet.Remove(entityToDelete);
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

