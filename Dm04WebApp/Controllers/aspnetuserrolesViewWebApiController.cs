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
using Dm04WebApp.Models;

namespace Dm04WebApp.Controllers {

    [RoutePrefix("aspnetuserrolesviewwebapi")]
    public class aspnetuserrolesViewWebApiController: ApiController
    {
        private int defaultPageSize = 50;
        private int minPageSize = 5;
        private int maxPageSize = 150;
        private ApplicationUserManager _userManager;
        private ApplicationRoleManager _roleManager = null;
        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? Request.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }
	    protected ApplicationRoleManager RoleManager
	    {
		    get
		    {
			    return _roleManager ?? Request.GetOwinContext().GetUserManager<ApplicationRoleManager>();
		    }
            private set
            {
                _roleManager = value;
            }
	    }


        [HttpGet]
        [Route("getall")]
        public IQueryable<aspnetuserrolesView> getall()
        {
            return new List<aspnetuserrolesView>().AsQueryable();
        } // the end of Get()-method

        [HttpGet]
        [Route("getwithfilter")]
        [ResponseType(typeof(aspnetuserrolesViewPage))]
        public IHttpActionResult getwithfilter([FromUri] System.String[] userId 
                  , [FromUri] string[] userIdOprtr 
                , [FromUri] System.String[] roleId 
                  , [FromUri] string[] roleIdOprtr 
                , [FromUri] System.String[] uUserName 
                  , [FromUri] string[] uUserNameOprtr 
                , [FromUri] System.String[] rName 
                  , [FromUri] string[] rNameOprtr 
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

            bool hasNo = true;
            System.String UserId = null;
            if(userId != null) {
                if(userId.Length > 0) {
                    int filterCnt = userId.Length;
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(userId[i]) ) continue;
                        UserId = userId[i];
                        hasNo = false;
                        break;
                    }

                }
            }
            aspnetuserrolesViewPage resultObject = new aspnetuserrolesViewPage() {
                page = (currentPage > 0) ? (currentPage-1) : currentPage,
                pagesize = currentPageSize,
                pagecount = 0,
                total = 0,
                items = new List<aspnetuserrolesView>()
            };

            if (hasNo) {
                return Ok(resultObject);
            }
            ApplicationUser usr = UserManager.Users.Where(u => u.Id == UserId).FirstOrDefault();
            if(usr == null) {
                return Ok(resultObject);
            }
            List<string> rls = usr.Roles.Select(r => r.RoleId).ToList();
            hasNo = (rls == null);
            hasNo = hasNo ? hasNo : (rls.Count < 1);
            if (hasNo) {
                return Ok(resultObject);
            }
            List<IdentityRole> usrRls = RoleManager.Roles.Where(r => rls.Contains( r.Id )).OrderBy(r => r.Name).ToList();
            hasNo = (usrRls == null);
            hasNo = hasNo ? hasNo : (usrRls.Count < 1);
            if (hasNo) {
                return Ok(resultObject);
            }
            resultObject.pagecount = 1;
            resultObject.total = usrRls.Count;
            foreach(IdentityRole usrRl in usrRls) {
                resultObject.items.Add(new aspnetuserrolesView() {
                    UserId = usr.Id,
                    RoleId = usrRl.Id,
                    UUserName = usr.UserName,
                    RName = usrRl.Name
                });
            }
            return Ok(resultObject);
        } // the end of GetWithFilter()-method

        [HttpGet]
        [Route("getone")]
        [ResponseType(typeof(aspnetuserrolesView))]
        public IHttpActionResult getone([FromUri] System.String userId
                , [FromUri] System.String roleId
                )
        {
            bool hasNoUserId = true;
            bool hasNoRoleId = true;

            System.String UserId = null;
            if(!string.IsNullOrEmpty(userId) ) {
                UserId = userId;
                hasNoUserId = false;
            }
            System.String RoleId = null;
            if(!string.IsNullOrEmpty(roleId) ) {
                RoleId = roleId;
                hasNoUserId = false;
            }
            if (hasNoUserId || hasNoRoleId) {
                return NotFound();
            }
            ApplicationUser usr = UserManager.Users.Where(u => u.Id == UserId).FirstOrDefault();
            if(usr == null) {
                return NotFound();
            }
            if(!usr.Roles.Any(r => r.RoleId == RoleId)) {
                return NotFound();
            }
            IdentityRole usrRl = RoleManager.Roles.Where(r => r.Id == RoleId).FirstOrDefault();
            if(usrRl == null) {
                return NotFound();
            }
            aspnetuserrolesView result = new aspnetuserrolesView() {

                    UserId = usr.Id,
                    RoleId = usrRl.Id,
                    UUserName = usr.UserName,
                    RName = usrRl.Name
            };
            return Ok(result);
        } // the end of public GetOne()-method

        [HttpPut]
        [ResponseType(typeof(aspnetuserrolesView))]
        [Route("updateone")]
        public IHttpActionResult updateone([FromBody] aspnetuserrolesView viewToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            bool hasNoUserId = true;
            bool hasNoRoleId = true;


            System.String UserId = null;
            if(! string.IsNullOrEmpty(viewToUpdate.UserId) ) {
                UserId = viewToUpdate.UserId;
                hasNoUserId =  false;
            }
            System.String RoleId = null;
             if(! string.IsNullOrEmpty(viewToUpdate.RoleId) ) {
                RoleId = viewToUpdate.RoleId;
                hasNoRoleId =  false;
             }
            if (hasNoUserId || hasNoRoleId) {
                return NotFound();
            }
            ApplicationUser usr = UserManager.Users.Where(u => u.Id == UserId).FirstOrDefault();
            if(usr == null) {
                return NotFound();
            }
            if(!usr.Roles.Any(r => r.RoleId == RoleId)) {
                return NotFound();
            }
            IdentityRole usrRl = RoleManager.Roles.Where(r => r.Id == RoleId).FirstOrDefault();
            if(usrRl == null) {
                return NotFound();
            }
            aspnetuserrolesView result = new aspnetuserrolesView() {

                    UserId = usr.Id,
                    RoleId = usrRl.Id,
                    UUserName = usr.UserName,
                    RName = usrRl.Name
            };
            return Ok(result);
        }

        [HttpPost]
        [ResponseType(typeof(aspnetuserrolesView))]
        [Route("addone")]
        public IHttpActionResult addone([FromBody] aspnetuserrolesView viewToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            bool hasNoUserId = true;
            bool hasNoRoleId = true;

            System.String UserId = null;
            if(! string.IsNullOrEmpty(viewToAdd.UserId) ) {
                UserId = viewToAdd.UserId;
                hasNoUserId =  false;
            }
            System.String RoleId = null;
             if(! string.IsNullOrEmpty(viewToAdd.RoleId) ) {
                RoleId = viewToAdd.RoleId;
                hasNoRoleId =  false;
             }
            if (hasNoUserId || hasNoRoleId) {
                return NotFound();
            }
            ApplicationUser usr = UserManager.Users.Where(u => u.Id == UserId).FirstOrDefault();
            if(usr == null) {
                return NotFound();
            }
            IdentityRole usrRl = RoleManager.Roles.Where(r => r.Id == RoleId).FirstOrDefault();
            if(usrRl == null) {
                return NotFound();
            }
            if(!UserManager.IsInRole(usr.Id, usrRl.Name)) {
                IdentityResult rslt = UserManager.AddToRole(usr.Id, usrRl.Name);
                if (!rslt.Succeeded)
                {
                    return GetErrorResult(rslt);
                }
            }
            aspnetuserrolesView result = new aspnetuserrolesView() {

                    UserId = usr.Id,
                    RoleId = usrRl.Id,
                    UUserName = usr.UserName,
                    RName = usrRl.Name
            };
            return Ok(result);
        }


        [HttpDelete]
        [ResponseType(typeof(aspnetuserrolesView))]
        [Route("deleteone")]
        public IHttpActionResult deleteone([FromUri] System.String userId
                , [FromUri] System.String roleId
                )
        {
            bool hasNoUserId = true;
            bool hasNoRoleId = true;



            System.String UserId = null;
            if(!string.IsNullOrEmpty(userId) ) {
                UserId = userId;
                hasNoUserId = false;
            }
            System.String RoleId = null;
            if(!string.IsNullOrEmpty(roleId) ) {
                RoleId = roleId;
                hasNoUserId = false;
            }
            if (hasNoUserId || hasNoRoleId) {
                return NotFound();
            }
            ApplicationUser usr = UserManager.Users.Where(u => u.Id == UserId).FirstOrDefault();
            if(usr == null) {
                return NotFound();
            }
            IdentityRole usrRl = RoleManager.Roles.Where(r => r.Id == RoleId).FirstOrDefault();
            if(usrRl == null) {
                return NotFound();
            }
            if(UserManager.IsInRole(usr.Id, usrRl.Name)) {
                IdentityResult rslt = UserManager.RemoveFromRole(usr.Id, usrRl.Name);
                if (!rslt.Succeeded)
                {
                    return GetErrorResult(rslt);
                }
            }
            aspnetuserrolesView result = new aspnetuserrolesView() {

                    UserId = usr.Id,
                    RoleId = usrRl.Id,
                    UUserName = usr.UserName,
                    RName = usrRl.Name
            };
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
            if (disposing && _userManager != null)
            {
                _userManager.Dispose();
                _userManager = null;
            }
            if (disposing && _roleManager != null)
            {
                _roleManager.Dispose();
                _roleManager = null;
            }
            base.Dispose(disposing);
        }
    }
}

