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

using Dm02Context.AspNetBmSecurity;
using Dm03Views.AspNetBmSecurity;
using Dm01Entity.AspNetBmSecurity;

namespace Dm04WebApp.Controllers {

    [RoutePrefix("aspnetusermaskviewwebapi")]
    public class aspnetusermaskViewWebApiController: ApiController
    {
        private int defaultPageSize = 50;
        private int minPageSize = 5;
        private int maxPageSize = 150;
        private ApplicationUserManager _userManager;
        private aspnetchckdbcontext db = new aspnetchckdbcontext();

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


        [HttpGet]
        [Route("getcurrusermasks")]
        [ResponseType(typeof(aspnetusermaskViewPage))]
        public IHttpActionResult getcurrusermasks(){
            aspnetusermaskViewPage resultObject = new aspnetusermaskViewPage() {
                page = 1,
                pagesize = 1,
                pagecount = 1,
                total = 1
            };
            resultObject.items = new List<aspnetusermaskView>();
            aspnetusermaskView rsltItm =  new aspnetusermaskView();
            resultObject.items.Add(rsltItm);
            rsltItm.Mask0 = 0;
            rsltItm.Mask1 = 0;
            rsltItm.Mask2 = 0;
            rsltItm.Mask3 = 0;
            rsltItm.Mask4 = 0;
            rsltItm.Mask5 = 0;
            rsltItm.Mask6 = 0;
            rsltItm.Mask7 = 0;
            rsltItm.Mask8 = 0;
            rsltItm.Mask9 = 0;
            rsltItm.MaskA = 0;
            rsltItm.MaskB = 0;
            rsltItm.MaskC = 0;
            rsltItm.MaskD = 0;
            rsltItm.Dask0 = 0;
            rsltItm.Dask1 = 0;
            rsltItm.Dask2 = 0;

            string UserId = User.Identity.GetUserId();
            IList<string> rls = UserManager.GetRoles(UserId);
            if(rls == null)
            {
                return Ok(resultObject);
            }
            if (rls.Count < 1)
            {
                return Ok(resultObject);
            }
            IQueryable<aspnetrolemask> query = 
                db.aspnetrolemaskDbSet
                .Where(r => rls.Contains( r.RoleName ));
            if(query.Any()) {
                resultObject.items = new List<aspnetusermaskView> { query.Select(itm => new aspnetusermaskView() {
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
                    }).Aggregate(OredBits) };
                resultObject.items[0].UserId = UserId;
            } 
            return Ok(resultObject);
        }


        [HttpGet]
        [Route("getwithfilter")]
        [ResponseType(typeof(aspnetusermaskViewPage))]
        public IHttpActionResult getwithfilter([FromUri] System.String[] userId 
                  , [FromUri] string[] userIdOprtr 
                , [FromUri] string[] orderby = null, [FromUri] int? page =null, [FromUri] int? pagesize = null)
        {
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
            aspnetusermaskViewPage resultObject = new aspnetusermaskViewPage() {
                page = 1,
                pagesize = 1,
                pagecount = 1,
                total = 1,
                items = new List<aspnetusermaskView>()
            };
            aspnetusermaskView rsltItm =  new aspnetusermaskView();
            resultObject.items.Add(rsltItm);
            rsltItm.Mask0 = 0;
            rsltItm.Mask1 = 0;
            rsltItm.Mask2 = 0;
            rsltItm.Mask3 = 0;
            rsltItm.Mask4 = 0;
            rsltItm.Mask5 = 0;
            rsltItm.Mask6 = 0;
            rsltItm.Mask7 = 0;
            rsltItm.Mask8 = 0;
            rsltItm.Mask9 = 0;
            rsltItm.MaskA = 0;
            rsltItm.MaskB = 0;
            rsltItm.MaskC = 0;
            rsltItm.MaskD = 0;
            rsltItm.Dask0 = 0;
            rsltItm.Dask1 = 0;
            rsltItm.Dask2 = 0;
            if (hasNo) {
                return Ok(resultObject);
            }
            //
            // ApplicationUser usr = UserManager.Users.Where(u => u.Id == UserId).FirstOrDefault();
            //if (usr == null) {
            //    return Ok(resultObject);
            //}
            //List<string> rls = usr.Roles.Select(r => r.RoleId).ToList();
            //

            IList<string> rls = UserManager.GetRoles(UserId);
            if(rls == null)
            {
                return Ok(resultObject);
            }
            if (rls.Count < 1)
            {
                return Ok(resultObject);
            }
            IQueryable<aspnetrolemask> query = 
                db.aspnetrolemaskDbSet
                .Where(r => rls.Contains( r.RoleName ));
            if(query.Any()) {
                resultObject.items = new List<aspnetusermaskView> { query.Select(itm => new aspnetusermaskView() {
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
                    }).Aggregate(OredBits) };
                resultObject.items[0].UserId = UserId;
            } 
            return Ok(resultObject);
        } // the end of GetWithFilter()-method

        aspnetusermaskView OredBits(aspnetusermaskView rslt, aspnetusermaskView itm) {
                            rslt.Mask0 |= itm.Mask0;
                            rslt.Mask1 |= itm.Mask1;
                            rslt.Mask2 |= itm.Mask2;
                            rslt.Mask3 |= itm.Mask3;
                            rslt.Mask4 |= itm.Mask4;
                            rslt.Mask5 |= itm.Mask5;
                            rslt.Mask6 |= itm.Mask6;
                            rslt.Mask7 |= itm.Mask7;
                            rslt.Mask8 |= itm.Mask8;
                            rslt.Mask9 |= itm.Mask9;
                            rslt.MaskA |= itm.MaskA;
                            rslt.MaskB |= itm.MaskB;
                            rslt.MaskC |= itm.MaskC;
                            rslt.MaskD |= itm.MaskD;
                            rslt.Dask0 |= itm.Dask0;
                            rslt.Dask1 |= itm.Dask1;
                            rslt.Dask2 |= itm.Dask2;
            return rslt;
        }


        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
                if(_userManager != null) {
                    _userManager.Dispose();
                    _userManager = null;
                }
            }
            base.Dispose(disposing);
        }
    }
}

