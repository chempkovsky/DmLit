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

    [RoutePrefix("aspnetrolemaskviewwebapi")]
    public class aspnetrolemaskViewWebApiController: ApiController
    {
        private int defaultPageSize = 50;
        private int minPageSize = 5;
        private int maxPageSize = 150;
        private aspnetchckdbcontext db = new aspnetchckdbcontext();
        [HttpGet]
        [Route("getall")]
        public IQueryable<aspnetrolemaskView> getall()
        {
            return db.aspnetrolemaskDbSet
                    .Select(itm => new aspnetrolemaskView() {
                            RoleName = itm.RoleName,
                            RoleDescription = itm.RoleDescription,
                            Mask0 = itm.Mask0,
                            Mask1 = itm.Mask1,
                            Mask2 = itm.Mask2,
                            Mask3 = itm.Mask3,
                            Mask4 = itm.Mask4,
                            Mask5 = itm.Mask5,
                            Mask6 = itm.Mask6,
                            Mask7 = itm.Mask7,
                            Mask8 = itm.Mask8,
                            Mask9 = itm.Mask9,
                            MaskA = itm.MaskA,
                            MaskB = itm.MaskB,
                            MaskC = itm.MaskC,
                            MaskD = itm.MaskD,
                            Dask0 = itm.Dask0,
                            Dask1 = itm.Dask1,
                            Dask2 = itm.Dask2
                            });

        } // the end of Get()-method


        [HttpGet]
        [Route("getwithfilter")]
        [ResponseType(typeof(aspnetrolemaskViewPage))]
        public IHttpActionResult getwithfilter([FromUri] System.String[] roleName 
                  , [FromUri] string[] roleNameOprtr 
                , [FromUri] System.String[] roleDescription 
                  , [FromUri] string[] roleDescriptionOprtr 
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
            IQueryable<aspnetrolemask> query = 
                db.aspnetrolemaskDbSet;
            
            if(roleName != null) {
                if(roleName.Length > 0) {
                    int filterCnt = roleName.Length;
                    int operatorCnt = 0;
                    if(roleNameOprtr != null) {
                        operatorCnt = roleNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(roleName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( roleNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(roleNameOprtr[i])) {
                                    currOprtr = roleNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(roleName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = roleName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = roleName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.RoleName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.RoleName == null) ||
                                            (p.RoleName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.RoleName.Contains(aflt0))
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
                                            (p.RoleName == null) ||
                                            (p.RoleName.Contains(aflt0)) ||
                                            (p.RoleName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.RoleName.Contains(aflt0)) ||
                                            (p.RoleName.Contains(aflt1))
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
                                            (p.RoleName == null) ||
                                            (p.RoleName.Contains(aflt0)) ||
                                            (p.RoleName.Contains(aflt1)) ||
                                            (p.RoleName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.RoleName.Contains(aflt0)) ||
                                            (p.RoleName.Contains(aflt1)) ||
                                            (p.RoleName.Contains(aflt2))
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
                                            (p.RoleName == null) ||
                                            (p.RoleName.Contains(aflt0)) ||
                                            (p.RoleName.Contains(aflt1)) ||
                                            (p.RoleName.Contains(aflt2)) ||
                                            (p.RoleName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.RoleName.Contains(aflt0)) ||
                                            (p.RoleName.Contains(aflt1)) ||
                                            (p.RoleName.Contains(aflt2)) ||
                                            (p.RoleName.Contains(aflt3))
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
                                            (p.RoleName == null) ||
                                            (p.RoleName.Contains(aflt0)) ||
                                            (p.RoleName.Contains(aflt1)) ||
                                            (p.RoleName.Contains(aflt2)) ||
                                            (p.RoleName.Contains(aflt3)) ||
                                            (p.RoleName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.RoleName.Contains(aflt0)) ||
                                            (p.RoleName.Contains(aflt1)) ||
                                            (p.RoleName.Contains(aflt2)) ||
                                            (p.RoleName.Contains(aflt3)) ||
                                            (p.RoleName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = roleName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.RoleName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.RoleName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.RoleName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(roleDescription != null) {
                if(roleDescription.Length > 0) {
                    int filterCnt = roleDescription.Length;
                    int operatorCnt = 0;
                    if(roleDescriptionOprtr != null) {
                        operatorCnt = roleDescriptionOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(roleDescription[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( roleDescriptionOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(roleDescriptionOprtr[i])) {
                                    currOprtr = roleDescriptionOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(roleDescription[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = roleDescription.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = roleDescription.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.RoleDescription == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.RoleDescription == null) ||
                                            (p.RoleDescription.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.RoleDescription.Contains(aflt0))
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
                                            (p.RoleDescription == null) ||
                                            (p.RoleDescription.Contains(aflt0)) ||
                                            (p.RoleDescription.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.RoleDescription.Contains(aflt0)) ||
                                            (p.RoleDescription.Contains(aflt1))
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
                                            (p.RoleDescription == null) ||
                                            (p.RoleDescription.Contains(aflt0)) ||
                                            (p.RoleDescription.Contains(aflt1)) ||
                                            (p.RoleDescription.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.RoleDescription.Contains(aflt0)) ||
                                            (p.RoleDescription.Contains(aflt1)) ||
                                            (p.RoleDescription.Contains(aflt2))
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
                                            (p.RoleDescription == null) ||
                                            (p.RoleDescription.Contains(aflt0)) ||
                                            (p.RoleDescription.Contains(aflt1)) ||
                                            (p.RoleDescription.Contains(aflt2)) ||
                                            (p.RoleDescription.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.RoleDescription.Contains(aflt0)) ||
                                            (p.RoleDescription.Contains(aflt1)) ||
                                            (p.RoleDescription.Contains(aflt2)) ||
                                            (p.RoleDescription.Contains(aflt3))
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
                                            (p.RoleDescription == null) ||
                                            (p.RoleDescription.Contains(aflt0)) ||
                                            (p.RoleDescription.Contains(aflt1)) ||
                                            (p.RoleDescription.Contains(aflt2)) ||
                                            (p.RoleDescription.Contains(aflt3)) ||
                                            (p.RoleDescription.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.RoleDescription.Contains(aflt0)) ||
                                            (p.RoleDescription.Contains(aflt1)) ||
                                            (p.RoleDescription.Contains(aflt2)) ||
                                            (p.RoleDescription.Contains(aflt3)) ||
                                            (p.RoleDescription.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = roleDescription[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.RoleDescription.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.RoleDescription.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.RoleDescription.CompareTo(aflt) != 0 );
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
                IOrderedQueryable<aspnetrolemask> orderedQuery = null;
                if(currentOrderBy != null) {
                    List<string> wasInUseOrderBy = new List<string>();
                    foreach(string propName in currentOrderBy) {
                        string lowerCaseStr = propName.ToLower();
                        if (wasInUseOrderBy.Contains(lowerCaseStr)) {
                            continue;
                        }
                        switch(lowerCaseStr) {
                            case "rolename" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.RoleName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.RoleName);
                                }
                                wasInUseOrderBy.Add("rolename");
                                wasInUseOrderBy.Add("-rolename");
                                break;
                            case "-rolename" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.RoleName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.RoleName);
                                }
                                wasInUseOrderBy.Add("rolename");
                                wasInUseOrderBy.Add("-rolename");
                                break;
                            case "roledescription" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.RoleDescription);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.RoleDescription);
                                }
                                wasInUseOrderBy.Add("roledescription");
                                wasInUseOrderBy.Add("-roledescription");
                                break;
                            case "-roledescription" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.RoleDescription);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.RoleDescription);
                                }
                                wasInUseOrderBy.Add("roledescription");
                                wasInUseOrderBy.Add("-roledescription");
                                break;
                                default:
                                    break;
                        }
                    }
                }
                if(isFirstTime) {                
                    orderedQuery = query.OrderBy(p => p.RoleName);
                } // totals pageCount currentPageSize
                aspnetrolemaskViewPage resultObject = new aspnetrolemaskViewPage() {
                    page = (currentPage > 0) ? (currentPage-1) : currentPage,
                    pagesize = currentPageSize,
                    pagecount = pageCount,
                    total = totals
                };
                resultObject.items = orderedQuery.Skip((currentPage - 1) * currentPageSize).Take(currentPageSize).Select(itm => new aspnetrolemaskView() {
                            RoleName = itm.RoleName,
                            RoleDescription = itm.RoleDescription,
                            Mask0 = itm.Mask0,
                            Mask1 = itm.Mask1,
                            Mask2 = itm.Mask2,
                            Mask3 = itm.Mask3,
                            Mask4 = itm.Mask4,
                            Mask5 = itm.Mask5,
                            Mask6 = itm.Mask6,
                            Mask7 = itm.Mask7,
                            Mask8 = itm.Mask8,
                            Mask9 = itm.Mask9,
                            MaskA = itm.MaskA,
                            MaskB = itm.MaskB,
                            MaskC = itm.MaskC,
                            MaskD = itm.MaskD,
                            Dask0 = itm.Dask0,
                            Dask1 = itm.Dask1,
                            Dask2 = itm.Dask2
                            }).ToList();
                return Ok(resultObject);
        } // the end of GetWithFilter()-method

        [HttpGet]
        [Route("getone")]
        [ResponseType(typeof(aspnetrolemaskView))]
        public IHttpActionResult getone([FromUri] System.String roleName
                )
        {
            aspnetrolemaskView result = db.aspnetrolemaskDbSet
                    .Where(p => p.RoleName == roleName)
                    .Select(itm => new aspnetrolemaskView() {
                            RoleName = itm.RoleName,
                            RoleDescription = itm.RoleDescription,
                            Mask0 = itm.Mask0,
                            Mask1 = itm.Mask1,
                            Mask2 = itm.Mask2,
                            Mask3 = itm.Mask3,
                            Mask4 = itm.Mask4,
                            Mask5 = itm.Mask5,
                            Mask6 = itm.Mask6,
                            Mask7 = itm.Mask7,
                            Mask8 = itm.Mask8,
                            Mask9 = itm.Mask9,
                            MaskA = itm.MaskA,
                            MaskB = itm.MaskB,
                            MaskC = itm.MaskC,
                            MaskD = itm.MaskD,
                            Dask0 = itm.Dask0,
                            Dask1 = itm.Dask1,
                            Dask2 = itm.Dask2
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        } // the end of public GetOne()-method

        [HttpPut]
        [ResponseType(typeof(aspnetrolemaskView))]
        [Route("updateone")]
        public IHttpActionResult updateone([FromBody] aspnetrolemaskView viewToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            aspnetrolemask resultEntity = db.aspnetrolemaskDbSet
                    .Where(p => p.RoleName == viewToUpdate.RoleName)
                    .FirstOrDefault();
            if(resultEntity == null) {
                return NotFound();
            }

            resultEntity.RoleDescription =  viewToUpdate.RoleDescription;
            resultEntity.Mask0 =  viewToUpdate.Mask0;
            resultEntity.Mask1 =  viewToUpdate.Mask1;
            resultEntity.Mask2 =  viewToUpdate.Mask2;
            resultEntity.Mask3 =  viewToUpdate.Mask3;
            resultEntity.Mask4 =  viewToUpdate.Mask4;
            resultEntity.Mask5 =  viewToUpdate.Mask5;
            resultEntity.Mask6 =  viewToUpdate.Mask6;
            resultEntity.Mask7 =  viewToUpdate.Mask7;
            resultEntity.Mask8 =  viewToUpdate.Mask8;
            resultEntity.Mask9 =  viewToUpdate.Mask9;
            resultEntity.MaskA =  viewToUpdate.MaskA;
            resultEntity.MaskB =  viewToUpdate.MaskB;
            resultEntity.MaskC =  viewToUpdate.MaskC;
            resultEntity.MaskD =  viewToUpdate.MaskD;
            resultEntity.Dask0 =  viewToUpdate.Dask0;
            resultEntity.Dask1 =  viewToUpdate.Dask1;
            resultEntity.Dask2 =  viewToUpdate.Dask2;
            db.Entry(resultEntity).State = EntityState.Modified;
            db.SaveChanges();
            aspnetrolemaskView result = db.aspnetrolemaskDbSet
                    .Where(p => p.RoleName == viewToUpdate.RoleName)
                    .Select(itm => new aspnetrolemaskView() {
                            RoleName = itm.RoleName,
                            RoleDescription = itm.RoleDescription,
                            Mask0 = itm.Mask0,
                            Mask1 = itm.Mask1,
                            Mask2 = itm.Mask2,
                            Mask3 = itm.Mask3,
                            Mask4 = itm.Mask4,
                            Mask5 = itm.Mask5,
                            Mask6 = itm.Mask6,
                            Mask7 = itm.Mask7,
                            Mask8 = itm.Mask8,
                            Mask9 = itm.Mask9,
                            MaskA = itm.MaskA,
                            MaskB = itm.MaskB,
                            MaskC = itm.MaskC,
                            MaskD = itm.MaskD,
                            Dask0 = itm.Dask0,
                            Dask1 = itm.Dask1,
                            Dask2 = itm.Dask2
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [ResponseType(typeof(aspnetrolemaskView))]
        [Route("addone")]
        public IHttpActionResult addone([FromBody] aspnetrolemaskView viewToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            aspnetrolemask entityToAdd = new aspnetrolemask();
            entityToAdd.RoleName =  viewToAdd.RoleName;
            entityToAdd.RoleDescription =  viewToAdd.RoleDescription;
            entityToAdd.Mask0 =  viewToAdd.Mask0;
            entityToAdd.Mask1 =  viewToAdd.Mask1;
            entityToAdd.Mask2 =  viewToAdd.Mask2;
            entityToAdd.Mask3 =  viewToAdd.Mask3;
            entityToAdd.Mask4 =  viewToAdd.Mask4;
            entityToAdd.Mask5 =  viewToAdd.Mask5;
            entityToAdd.Mask6 =  viewToAdd.Mask6;
            entityToAdd.Mask7 =  viewToAdd.Mask7;
            entityToAdd.Mask8 =  viewToAdd.Mask8;
            entityToAdd.Mask9 =  viewToAdd.Mask9;
            entityToAdd.MaskA =  viewToAdd.MaskA;
            entityToAdd.MaskB =  viewToAdd.MaskB;
            entityToAdd.MaskC =  viewToAdd.MaskC;
            entityToAdd.MaskD =  viewToAdd.MaskD;
            entityToAdd.Dask0 =  viewToAdd.Dask0;
            entityToAdd.Dask1 =  viewToAdd.Dask1;
            entityToAdd.Dask2 =  viewToAdd.Dask2;
            db.aspnetrolemaskDbSet.Add(entityToAdd);
            db.SaveChanges();

            aspnetrolemaskView result = db.aspnetrolemaskDbSet
                    .Where(p => p.RoleName == entityToAdd.RoleName)
                    .Select(itm => new aspnetrolemaskView() {
                            RoleName = itm.RoleName,
                            RoleDescription = itm.RoleDescription,
                            Mask0 = itm.Mask0,
                            Mask1 = itm.Mask1,
                            Mask2 = itm.Mask2,
                            Mask3 = itm.Mask3,
                            Mask4 = itm.Mask4,
                            Mask5 = itm.Mask5,
                            Mask6 = itm.Mask6,
                            Mask7 = itm.Mask7,
                            Mask8 = itm.Mask8,
                            Mask9 = itm.Mask9,
                            MaskA = itm.MaskA,
                            MaskB = itm.MaskB,
                            MaskC = itm.MaskC,
                            MaskD = itm.MaskD,
                            Dask0 = itm.Dask0,
                            Dask1 = itm.Dask1,
                            Dask2 = itm.Dask2
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpDelete]
        [ResponseType(typeof(aspnetrolemaskView))]
        [Route("deleteone")]
        public IHttpActionResult deleteone([FromUri] System.String roleName
                )
        {

                aspnetrolemaskView result = db.aspnetrolemaskDbSet
                    .Where(p => p.RoleName == roleName)
                    .Select(itm => new aspnetrolemaskView() {
                            RoleName = itm.RoleName,
                            RoleDescription = itm.RoleDescription,
                            Mask0 = itm.Mask0,
                            Mask1 = itm.Mask1,
                            Mask2 = itm.Mask2,
                            Mask3 = itm.Mask3,
                            Mask4 = itm.Mask4,
                            Mask5 = itm.Mask5,
                            Mask6 = itm.Mask6,
                            Mask7 = itm.Mask7,
                            Mask8 = itm.Mask8,
                            Mask9 = itm.Mask9,
                            MaskA = itm.MaskA,
                            MaskB = itm.MaskB,
                            MaskC = itm.MaskC,
                            MaskD = itm.MaskD,
                            Dask0 = itm.Dask0,
                            Dask1 = itm.Dask1,
                            Dask2 = itm.Dask2
                    }).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }

                aspnetrolemask entityToDelete = db.aspnetrolemaskDbSet
                    .Where(p => p.RoleName == result.RoleName)
                    .FirstOrDefault();
                if (entityToDelete == null) {
                    return Ok(result);
                }
                db.aspnetrolemaskDbSet.Remove(entityToDelete);
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

