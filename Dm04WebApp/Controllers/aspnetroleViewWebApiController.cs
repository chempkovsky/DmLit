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
using Microsoft.AspNet.Identity.Owin;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.EntityFramework;


using Dm02Context.AspNetBmSecurity;
using Dm03Views.AspNetBmSecurity;
using Dm01Entity.AspNetBmSecurity;

namespace Dm04WebApp.Controllers {

    [RoutePrefix("aspnetroleviewwebapi")]
    public class aspnetroleViewWebApiController: ApiController
    {
        private int defaultPageSize = 50;
        private int minPageSize = 5;
        private int maxPageSize = 150;
        private ApplicationRoleManager _RoleManager = null;
	
 
	    protected ApplicationRoleManager RoleManager
	    {
		    get
		    {
			    return _RoleManager ?? Request.GetOwinContext().GetUserManager<ApplicationRoleManager>();
		    }
            private set
            {
                _RoleManager = value;
            }
	    }

        [HttpGet]
        [Route("getall")]
        public IQueryable<aspnetroleView> getall()
        {
            return RoleManager.Roles
                    .Select(itm => new aspnetroleView() {
                            Id = itm.Id,
                            Name = itm.Name
                            });

        } // the end of Get()-method


        [HttpGet]
        [Route("getwithfilter")]
        [ResponseType(typeof(aspnetroleViewPage))]
        public IHttpActionResult getwithfilter([FromUri] System.String[] id 
                  , [FromUri] string[] idOprtr 
                , [FromUri] System.String[] name 
                  , [FromUri] string[] nameOprtr 
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
            IQueryable<IdentityRole> query = 
                RoleManager.Roles;
            
            if(id != null) {
                if(id.Length > 0) {
                    int filterCnt = id.Length;
                    int operatorCnt = 0;
                    if(idOprtr != null) {
                        operatorCnt = idOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(id[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( idOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(idOprtr[i])) {
                                    currOprtr = idOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(id[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = id.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = id.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Id == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Id == null) ||
                                            (p.Id.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Id.Contains(aflt0))
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
                                            (p.Id == null) ||
                                            (p.Id.Contains(aflt0)) ||
                                            (p.Id.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Id.Contains(aflt0)) ||
                                            (p.Id.Contains(aflt1))
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
                                            (p.Id == null) ||
                                            (p.Id.Contains(aflt0)) ||
                                            (p.Id.Contains(aflt1)) ||
                                            (p.Id.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Id.Contains(aflt0)) ||
                                            (p.Id.Contains(aflt1)) ||
                                            (p.Id.Contains(aflt2))
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
                                            (p.Id == null) ||
                                            (p.Id.Contains(aflt0)) ||
                                            (p.Id.Contains(aflt1)) ||
                                            (p.Id.Contains(aflt2)) ||
                                            (p.Id.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Id.Contains(aflt0)) ||
                                            (p.Id.Contains(aflt1)) ||
                                            (p.Id.Contains(aflt2)) ||
                                            (p.Id.Contains(aflt3))
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
                                            (p.Id == null) ||
                                            (p.Id.Contains(aflt0)) ||
                                            (p.Id.Contains(aflt1)) ||
                                            (p.Id.Contains(aflt2)) ||
                                            (p.Id.Contains(aflt3)) ||
                                            (p.Id.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Id.Contains(aflt0)) ||
                                            (p.Id.Contains(aflt1)) ||
                                            (p.Id.Contains(aflt2)) ||
                                            (p.Id.Contains(aflt3)) ||
                                            (p.Id.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = id[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Id.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Id.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Id.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(name != null) {
                if(name.Length > 0) {
                    int filterCnt = name.Length;
                    int operatorCnt = 0;
                    if(nameOprtr != null) {
                        operatorCnt = nameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(name[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( nameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(nameOprtr[i])) {
                                    currOprtr = nameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(name[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = name.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = name.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Name == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Name == null) ||
                                            (p.Name.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Name.Contains(aflt0))
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
                                            (p.Name == null) ||
                                            (p.Name.Contains(aflt0)) ||
                                            (p.Name.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Name.Contains(aflt0)) ||
                                            (p.Name.Contains(aflt1))
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
                                            (p.Name == null) ||
                                            (p.Name.Contains(aflt0)) ||
                                            (p.Name.Contains(aflt1)) ||
                                            (p.Name.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Name.Contains(aflt0)) ||
                                            (p.Name.Contains(aflt1)) ||
                                            (p.Name.Contains(aflt2))
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
                                            (p.Name == null) ||
                                            (p.Name.Contains(aflt0)) ||
                                            (p.Name.Contains(aflt1)) ||
                                            (p.Name.Contains(aflt2)) ||
                                            (p.Name.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Name.Contains(aflt0)) ||
                                            (p.Name.Contains(aflt1)) ||
                                            (p.Name.Contains(aflt2)) ||
                                            (p.Name.Contains(aflt3))
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
                                            (p.Name == null) ||
                                            (p.Name.Contains(aflt0)) ||
                                            (p.Name.Contains(aflt1)) ||
                                            (p.Name.Contains(aflt2)) ||
                                            (p.Name.Contains(aflt3)) ||
                                            (p.Name.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Name.Contains(aflt0)) ||
                                            (p.Name.Contains(aflt1)) ||
                                            (p.Name.Contains(aflt2)) ||
                                            (p.Name.Contains(aflt3)) ||
                                            (p.Name.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = name[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Name.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Name.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Name.CompareTo(aflt) != 0 );
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
                IOrderedQueryable<IdentityRole> orderedQuery = null;
                if(currentOrderBy != null) {
                    List<string> wasInUseOrderBy = new List<string>();
                    foreach(string propName in currentOrderBy) {
                        string lowerCaseStr = propName.ToLower();
                        if (wasInUseOrderBy.Contains(lowerCaseStr)) {
                            continue;
                        }
                        switch(lowerCaseStr) {
                            case "id" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Id);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Id);
                                }
                                wasInUseOrderBy.Add("id");
                                wasInUseOrderBy.Add("-id");
                                break;
                            case "-id" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Id);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Id);
                                }
                                wasInUseOrderBy.Add("id");
                                wasInUseOrderBy.Add("-id");
                                break;
                            case "name" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Name);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Name);
                                }
                                wasInUseOrderBy.Add("name");
                                wasInUseOrderBy.Add("-name");
                                break;
                            case "-name" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Name);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Name);
                                }
                                wasInUseOrderBy.Add("name");
                                wasInUseOrderBy.Add("-name");
                                break;
                                default:
                                    break;
                        }
                    }
                }
                if(isFirstTime) {                
                    orderedQuery = query.OrderBy(p => p.Id);
                } // totals pageCount currentPageSize
                aspnetroleViewPage resultObject = new aspnetroleViewPage() {
                    page = (currentPage > 0) ? (currentPage-1) : currentPage,
                    pagesize = currentPageSize,
                    pagecount = pageCount,
                    total = totals
                };
                resultObject.items = orderedQuery.Skip((currentPage - 1) * currentPageSize).Take(currentPageSize).Select(itm => new aspnetroleView() {
                            Id = itm.Id,
                            Name = itm.Name
                            }).ToList();
                return Ok(resultObject);
        } // the end of GetWithFilter()-method

        [HttpGet]
        [Route("getone")]
        [ResponseType(typeof(aspnetroleView))]
        public IHttpActionResult getone([FromUri] System.String id
                )
        {
            aspnetroleView result = RoleManager.Roles
                    .Where(p => p.Id == id)
                    .Select(itm => new aspnetroleView() {
                            Id = itm.Id,
                            Name = itm.Name
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        } // the end of public GetOne()-method

        [HttpPut]
        [ResponseType(typeof(aspnetroleView))]
        [Route("updateone")]
        public IHttpActionResult updateone([FromBody] aspnetroleView viewToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            IdentityRole resultEntity = RoleManager.Roles
                    .Where(p => p.Id == viewToUpdate.Id)
                    .FirstOrDefault();
            if(resultEntity == null) {
                return NotFound();
            }

            resultEntity.Name =  viewToUpdate.Name;
            IdentityResult rslt = RoleManager.Update(resultEntity);
            if (!rslt.Succeeded)
            {
                return GetErrorResult(rslt);
            }
            
            aspnetroleView result = RoleManager.Roles
                    .Where(p => p.Id == viewToUpdate.Id)
                    .Select(itm => new aspnetroleView() {
                            Id = itm.Id,
                            Name = itm.Name
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [ResponseType(typeof(aspnetroleView))]
        [Route("addone")]
        public IHttpActionResult addone([FromBody] aspnetroleView viewToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            IdentityRole entityToAdd = new IdentityRole()  { Name = viewToAdd.Name };
/*
            entityToAdd.Id =  viewToAdd.Id;
            entityToAdd.Name =  viewToAdd.Name;
*/
            IdentityResult rslt = RoleManager.Create(entityToAdd);
            if (!rslt.Succeeded)
            {
                return GetErrorResult(rslt);
            }
            aspnetroleView result = RoleManager.Roles.Where(p => p.Name == viewToAdd.Name)
                    .Select(itm => new aspnetroleView() {
                            Id = itm.Id,
                            Name = itm.Name
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpDelete]
        [ResponseType(typeof(aspnetroleView))]
        [Route("deleteone")]
        public async Task<IHttpActionResult> deleteone([FromUri] System.String id
                )
        {

                aspnetroleView result = RoleManager.Roles
                    .Where(p => p.Id == id)
                    .Select(itm => new aspnetroleView() {
                            Id = itm.Id,
                            Name = itm.Name
                    }).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }

                IdentityRole entityToDelete = RoleManager.Roles
                    .Where(p => p.Id == result.Id)
                    .FirstOrDefault();
                if (entityToDelete == null) {
                    return Ok(result);
                }
                IdentityResult rslt = await RoleManager.DeleteAsync(entityToDelete);
                if (!rslt.Succeeded)
                {
                    return GetErrorResult(rslt);
                }
                return Ok(result);
        }


        private IHttpActionResult GetErrorResult(IdentityResult result)
        {
            if (result == null)
            {
                return InternalServerError();
            }

            if (!result.Succeeded)
            {
                if (result.Errors != null)
                {
                    foreach (string error in result.Errors)
                    {
                        ModelState.AddModelError("", error);
                    }
                }

                if (ModelState.IsValid)
                {
                    return BadRequest();
                }

                return BadRequest(ModelState);
            }

            return null;
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing && _RoleManager != null)
            {
                _RoleManager.Dispose();
                _RoleManager = null;
            }

            base.Dispose(disposing);
        }
    }
}

