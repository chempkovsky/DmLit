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


using Dm02Context.AspNetBmSecurity;
using Dm03Views.AspNetBmSecurity;
using Dm01Entity.AspNetBmSecurity;
using Dm04WebApp.Models;

namespace Dm04WebApp.Controllers {

    [RoutePrefix("aspnetuserviewwebapi")]
    public class aspnetuserViewWebApiController: ApiController
    {
        private int defaultPageSize = 50;
        private int minPageSize = 5;
        private int maxPageSize = 150;
        private ApplicationUserManager _userManager;
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
        [Route("getall")]
        public IQueryable<aspnetuserView> getall()
        {
            return UserManager.Users
                    .Select(itm => new aspnetuserView() {
                            Id = itm.Id,
                            Email = itm.Email,
                            EmailConfirmed = itm.EmailConfirmed,
                            PhoneNumber = itm.PhoneNumber,
                            PhoneNumberConfirmed = itm.PhoneNumberConfirmed,
                            TwoFactorEnabled = itm.TwoFactorEnabled,
                            LockoutEndDateUtc = itm.LockoutEndDateUtc,
                            LockoutEnabled = itm.LockoutEnabled,
                            AccessFailedCount = itm.AccessFailedCount,
                            UserName = itm.UserName
                            });

        } // the end of Get()-method


        [HttpGet]
        [Route("getwithfilter")]
        [ResponseType(typeof(aspnetuserViewPage))]
        public IHttpActionResult getwithfilter([FromUri] System.String[] id 
                  , [FromUri] string[] idOprtr 
                , [FromUri] System.String[] email 
                  , [FromUri] string[] emailOprtr 
                , [FromUri] System.String[] phoneNumber 
                  , [FromUri] string[] phoneNumberOprtr 
                , [FromUri] System.DateTime?[] lockoutEndDateUtc 
                  , [FromUri] string[] lockoutEndDateUtcOprtr 
                , [FromUri] System.String[] userName 
                  , [FromUri] string[] userNameOprtr 
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
            IQueryable<ApplicationUser> query = 
                UserManager.Users;
            
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
            if(email != null) {
                if(email.Length > 0) {
                    int filterCnt = email.Length;
                    int operatorCnt = 0;
                    if(emailOprtr != null) {
                        operatorCnt = emailOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(email[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( emailOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(emailOprtr[i])) {
                                    currOprtr = emailOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(email[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = email.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = email.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Email == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Email == null) ||
                                            (p.Email.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Email.Contains(aflt0))
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
                                            (p.Email == null) ||
                                            (p.Email.Contains(aflt0)) ||
                                            (p.Email.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Email.Contains(aflt0)) ||
                                            (p.Email.Contains(aflt1))
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
                                            (p.Email == null) ||
                                            (p.Email.Contains(aflt0)) ||
                                            (p.Email.Contains(aflt1)) ||
                                            (p.Email.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Email.Contains(aflt0)) ||
                                            (p.Email.Contains(aflt1)) ||
                                            (p.Email.Contains(aflt2))
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
                                            (p.Email == null) ||
                                            (p.Email.Contains(aflt0)) ||
                                            (p.Email.Contains(aflt1)) ||
                                            (p.Email.Contains(aflt2)) ||
                                            (p.Email.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Email.Contains(aflt0)) ||
                                            (p.Email.Contains(aflt1)) ||
                                            (p.Email.Contains(aflt2)) ||
                                            (p.Email.Contains(aflt3))
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
                                            (p.Email == null) ||
                                            (p.Email.Contains(aflt0)) ||
                                            (p.Email.Contains(aflt1)) ||
                                            (p.Email.Contains(aflt2)) ||
                                            (p.Email.Contains(aflt3)) ||
                                            (p.Email.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Email.Contains(aflt0)) ||
                                            (p.Email.Contains(aflt1)) ||
                                            (p.Email.Contains(aflt2)) ||
                                            (p.Email.Contains(aflt3)) ||
                                            (p.Email.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = email[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Email.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Email.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Email.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(phoneNumber != null) {
                if(phoneNumber.Length > 0) {
                    int filterCnt = phoneNumber.Length;
                    int operatorCnt = 0;
                    if(phoneNumberOprtr != null) {
                        operatorCnt = phoneNumberOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(phoneNumber[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( phoneNumberOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(phoneNumberOprtr[i])) {
                                    currOprtr = phoneNumberOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(phoneNumber[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = phoneNumber.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = phoneNumber.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.PhoneNumber == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.PhoneNumber == null) ||
                                            (p.PhoneNumber.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.PhoneNumber.Contains(aflt0))
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
                                            (p.PhoneNumber == null) ||
                                            (p.PhoneNumber.Contains(aflt0)) ||
                                            (p.PhoneNumber.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.PhoneNumber.Contains(aflt0)) ||
                                            (p.PhoneNumber.Contains(aflt1))
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
                                            (p.PhoneNumber == null) ||
                                            (p.PhoneNumber.Contains(aflt0)) ||
                                            (p.PhoneNumber.Contains(aflt1)) ||
                                            (p.PhoneNumber.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.PhoneNumber.Contains(aflt0)) ||
                                            (p.PhoneNumber.Contains(aflt1)) ||
                                            (p.PhoneNumber.Contains(aflt2))
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
                                            (p.PhoneNumber == null) ||
                                            (p.PhoneNumber.Contains(aflt0)) ||
                                            (p.PhoneNumber.Contains(aflt1)) ||
                                            (p.PhoneNumber.Contains(aflt2)) ||
                                            (p.PhoneNumber.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.PhoneNumber.Contains(aflt0)) ||
                                            (p.PhoneNumber.Contains(aflt1)) ||
                                            (p.PhoneNumber.Contains(aflt2)) ||
                                            (p.PhoneNumber.Contains(aflt3))
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
                                            (p.PhoneNumber == null) ||
                                            (p.PhoneNumber.Contains(aflt0)) ||
                                            (p.PhoneNumber.Contains(aflt1)) ||
                                            (p.PhoneNumber.Contains(aflt2)) ||
                                            (p.PhoneNumber.Contains(aflt3)) ||
                                            (p.PhoneNumber.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.PhoneNumber.Contains(aflt0)) ||
                                            (p.PhoneNumber.Contains(aflt1)) ||
                                            (p.PhoneNumber.Contains(aflt2)) ||
                                            (p.PhoneNumber.Contains(aflt3)) ||
                                            (p.PhoneNumber.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = phoneNumber[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.PhoneNumber.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.PhoneNumber.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.PhoneNumber.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(lockoutEndDateUtc != null) {
                if(lockoutEndDateUtc.Length > 0) {
                    int filterCnt = lockoutEndDateUtc.Length;
                    int operatorCnt = 0;
                    if(lockoutEndDateUtcOprtr != null) {
                        operatorCnt = lockoutEndDateUtcOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.DateTime ?> filterLst = new List<System.DateTime ?>();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(lockoutEndDateUtc[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( lockoutEndDateUtcOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(lockoutEndDateUtcOprtr[i])) {
                                    currOprtr = lockoutEndDateUtcOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(lockoutEndDateUtc[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }
                    //
                    // System.DateTime ?[] filter = lockoutEndDateUtc.Where(i => i.HasValue).Select(i => i).ToArray();
                    //
                    System.DateTime ?[] filter = filterLst.ToArray();
                    if ( (filter.Length + filterOprtLst.Count) != filterCnt) {
                        if (filter.Length > 0) {
                            query = query.Where(p => (filter.Contains(p.LockoutEndDateUtc)) || (p.LockoutEndDateUtc == null));
                        } else {
                            query = query.Where(p => (p.LockoutEndDateUtc == null) );
                        }
                    } else if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.LockoutEndDateUtc));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Nullable<System.DateTime> aflt = lockoutEndDateUtc[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.LockoutEndDateUtc >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.LockoutEndDateUtc <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.LockoutEndDateUtc != aflt );
                                break;
                        }
                    }

                }
            }
            if(userName != null) {
                if(userName.Length > 0) {
                    int filterCnt = userName.Length;
                    int operatorCnt = 0;
                    if(userNameOprtr != null) {
                        operatorCnt = userNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(userName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( userNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(userNameOprtr[i])) {
                                    currOprtr = userNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(userName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = userName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = userName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.UserName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.UserName == null) ||
                                            (p.UserName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.UserName.Contains(aflt0))
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
                                            (p.UserName == null) ||
                                            (p.UserName.Contains(aflt0)) ||
                                            (p.UserName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.UserName.Contains(aflt0)) ||
                                            (p.UserName.Contains(aflt1))
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
                                            (p.UserName == null) ||
                                            (p.UserName.Contains(aflt0)) ||
                                            (p.UserName.Contains(aflt1)) ||
                                            (p.UserName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.UserName.Contains(aflt0)) ||
                                            (p.UserName.Contains(aflt1)) ||
                                            (p.UserName.Contains(aflt2))
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
                                            (p.UserName == null) ||
                                            (p.UserName.Contains(aflt0)) ||
                                            (p.UserName.Contains(aflt1)) ||
                                            (p.UserName.Contains(aflt2)) ||
                                            (p.UserName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.UserName.Contains(aflt0)) ||
                                            (p.UserName.Contains(aflt1)) ||
                                            (p.UserName.Contains(aflt2)) ||
                                            (p.UserName.Contains(aflt3))
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
                                            (p.UserName == null) ||
                                            (p.UserName.Contains(aflt0)) ||
                                            (p.UserName.Contains(aflt1)) ||
                                            (p.UserName.Contains(aflt2)) ||
                                            (p.UserName.Contains(aflt3)) ||
                                            (p.UserName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.UserName.Contains(aflt0)) ||
                                            (p.UserName.Contains(aflt1)) ||
                                            (p.UserName.Contains(aflt2)) ||
                                            (p.UserName.Contains(aflt3)) ||
                                            (p.UserName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = userName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.UserName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.UserName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.UserName.CompareTo(aflt) != 0 );
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
                IOrderedQueryable<ApplicationUser> orderedQuery = null;
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
                            case "email" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Email);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Email);
                                }
                                wasInUseOrderBy.Add("email");
                                wasInUseOrderBy.Add("-email");
                                break;
                            case "-email" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Email);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Email);
                                }
                                wasInUseOrderBy.Add("email");
                                wasInUseOrderBy.Add("-email");
                                break;
                            case "phonenumber" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.PhoneNumber);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.PhoneNumber);
                                }
                                wasInUseOrderBy.Add("phonenumber");
                                wasInUseOrderBy.Add("-phonenumber");
                                break;
                            case "-phonenumber" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.PhoneNumber);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.PhoneNumber);
                                }
                                wasInUseOrderBy.Add("phonenumber");
                                wasInUseOrderBy.Add("-phonenumber");
                                break;
                            case "lockoutenddateutc" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.LockoutEndDateUtc);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.LockoutEndDateUtc);
                                }
                                wasInUseOrderBy.Add("lockoutenddateutc");
                                wasInUseOrderBy.Add("-lockoutenddateutc");
                                break;
                            case "-lockoutenddateutc" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.LockoutEndDateUtc);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.LockoutEndDateUtc);
                                }
                                wasInUseOrderBy.Add("lockoutenddateutc");
                                wasInUseOrderBy.Add("-lockoutenddateutc");
                                break;
                            case "username" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.UserName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.UserName);
                                }
                                wasInUseOrderBy.Add("username");
                                wasInUseOrderBy.Add("-username");
                                break;
                            case "-username" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.UserName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.UserName);
                                }
                                wasInUseOrderBy.Add("username");
                                wasInUseOrderBy.Add("-username");
                                break;
                                default:
                                    break;
                        }
                    }
                }
                if(isFirstTime) {                
                    orderedQuery = query.OrderBy(p => p.Id);
                } // totals pageCount currentPageSize
                aspnetuserViewPage resultObject = new aspnetuserViewPage() {
                    page = (currentPage > 0) ? (currentPage-1) : currentPage,
                    pagesize = currentPageSize,
                    pagecount = pageCount,
                    total = totals
                };
                resultObject.items = orderedQuery.Skip((currentPage - 1) * currentPageSize).Take(currentPageSize).Select(itm => new aspnetuserView() {
                            Id = itm.Id,
                            Email = itm.Email,
                            EmailConfirmed = itm.EmailConfirmed,
                            PhoneNumber = itm.PhoneNumber,
                            PhoneNumberConfirmed = itm.PhoneNumberConfirmed,
                            TwoFactorEnabled = itm.TwoFactorEnabled,
                            LockoutEndDateUtc = itm.LockoutEndDateUtc,
                            LockoutEnabled = itm.LockoutEnabled,
                            AccessFailedCount = itm.AccessFailedCount,
                            UserName = itm.UserName
                            }).ToList();
                return Ok(resultObject);
        } // the end of GetWithFilter()-method

        [HttpGet]
        [Route("getone")]
        [ResponseType(typeof(aspnetuserView))]
        public IHttpActionResult getone([FromUri] System.String id
                )
        {
            aspnetuserView result = UserManager.Users
                    .Where(p => p.Id == id)
                    .Select(itm => new aspnetuserView() {
                            Id = itm.Id,
                            Email = itm.Email,
                            EmailConfirmed = itm.EmailConfirmed,
                            PhoneNumber = itm.PhoneNumber,
                            PhoneNumberConfirmed = itm.PhoneNumberConfirmed,
                            TwoFactorEnabled = itm.TwoFactorEnabled,
                            LockoutEndDateUtc = itm.LockoutEndDateUtc,
                            LockoutEnabled = itm.LockoutEnabled,
                            AccessFailedCount = itm.AccessFailedCount,
                            UserName = itm.UserName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        } // the end of public GetOne()-method

        [HttpPut]
        [ResponseType(typeof(aspnetuserView))]
        [Route("updateone")]
        public IHttpActionResult updateone([FromBody] aspnetuserView viewToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ApplicationUser resultEntity = UserManager.Users
                    .Where(p => p.Id == viewToUpdate.Id)
                    .FirstOrDefault();
            if(resultEntity == null) {
                return NotFound();
            }

            resultEntity.Email =  viewToUpdate.Email;
            resultEntity.EmailConfirmed =  viewToUpdate.EmailConfirmed;
            resultEntity.PhoneNumber =  viewToUpdate.PhoneNumber;
            resultEntity.PhoneNumberConfirmed =  viewToUpdate.PhoneNumberConfirmed;
            resultEntity.TwoFactorEnabled =  viewToUpdate.TwoFactorEnabled;
            resultEntity.LockoutEndDateUtc =  viewToUpdate.LockoutEndDateUtc;
            resultEntity.LockoutEnabled =  viewToUpdate.LockoutEnabled;
            resultEntity.AccessFailedCount =  viewToUpdate.AccessFailedCount;
            resultEntity.UserName =  viewToUpdate.UserName;
            UserManager.Update(resultEntity);
            aspnetuserView result = UserManager.Users
                    .Where(p => p.Id == viewToUpdate.Id)
                    .Select(itm => new aspnetuserView() {
                            Id = itm.Id,
                            Email = itm.Email,
                            EmailConfirmed = itm.EmailConfirmed,
                            PhoneNumber = itm.PhoneNumber,
                            PhoneNumberConfirmed = itm.PhoneNumberConfirmed,
                            TwoFactorEnabled = itm.TwoFactorEnabled,
                            LockoutEndDateUtc = itm.LockoutEndDateUtc,
                            LockoutEnabled = itm.LockoutEnabled,
                            AccessFailedCount = itm.AccessFailedCount,
                            UserName = itm.UserName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [ResponseType(typeof(aspnetuserView))]
        [Route("addone")]
        public IHttpActionResult addone([FromBody] aspnetuserView viewToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ApplicationUser entityToAdd = new ApplicationUser()  { UserName = viewToAdd.Email, Email = viewToAdd.Email };
/*
            entityToAdd.Id =  viewToAdd.Id;
            entityToAdd.Email =  viewToAdd.Email;
            entityToAdd.EmailConfirmed =  viewToAdd.EmailConfirmed;
            entityToAdd.PhoneNumber =  viewToAdd.PhoneNumber;
            entityToAdd.PhoneNumberConfirmed =  viewToAdd.PhoneNumberConfirmed;
            entityToAdd.TwoFactorEnabled =  viewToAdd.TwoFactorEnabled;
            entityToAdd.LockoutEndDateUtc =  viewToAdd.LockoutEndDateUtc;
            entityToAdd.LockoutEnabled =  viewToAdd.LockoutEnabled;
            entityToAdd.AccessFailedCount =  viewToAdd.AccessFailedCount;
            entityToAdd.UserName =  viewToAdd.UserName;
*/
            IdentityResult rslt = UserManager.Create(entityToAdd, "Qqw?123");
            if (!rslt.Succeeded)
            {
                return GetErrorResult(rslt);
            }
            aspnetuserView result = UserManager.Users.Where(p => p.UserName == viewToAdd.Email)
                    .Select(itm => new aspnetuserView() {
                            Id = itm.Id,
                            Email = itm.Email,
                            EmailConfirmed = itm.EmailConfirmed,
                            PhoneNumber = itm.PhoneNumber,
                            PhoneNumberConfirmed = itm.PhoneNumberConfirmed,
                            TwoFactorEnabled = itm.TwoFactorEnabled,
                            LockoutEndDateUtc = itm.LockoutEndDateUtc,
                            LockoutEnabled = itm.LockoutEnabled,
                            AccessFailedCount = itm.AccessFailedCount,
                            UserName = itm.UserName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpDelete]
        [ResponseType(typeof(aspnetuserView))]
        [Route("deleteone")]
        public IHttpActionResult deleteone([FromUri] System.String id
                )
        {

                aspnetuserView result = UserManager.Users
                    .Where(p => p.Id == id)
                    .Select(itm => new aspnetuserView() {
                            Id = itm.Id,
                            Email = itm.Email,
                            EmailConfirmed = itm.EmailConfirmed,
                            PhoneNumber = itm.PhoneNumber,
                            PhoneNumberConfirmed = itm.PhoneNumberConfirmed,
                            TwoFactorEnabled = itm.TwoFactorEnabled,
                            LockoutEndDateUtc = itm.LockoutEndDateUtc,
                            LockoutEnabled = itm.LockoutEnabled,
                            AccessFailedCount = itm.AccessFailedCount,
                            UserName = itm.UserName
                    }).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }

                ApplicationUser entityToDelete = UserManager.Users
                    .Where(p => p.Id == result.Id)
                    .FirstOrDefault();
                if (entityToDelete == null) {
                    return Ok(result);
                }
                IdentityResult rslt = UserManager.Delete(entityToDelete);
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
            if (disposing && _userManager != null)
            {
                _userManager.Dispose();
                _userManager = null;
            }

            base.Dispose(disposing);
        }
    }
}

