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

    [RoutePrefix("litauthorviewwebapi")]
    public class LitAuthorViewWebApiController: ApiController
    {
        private int defaultPageSize = 50;
        private int minPageSize = 5;
        private int maxPageSize = 150;
        private LitDbContext db = new LitDbContext();
        [HttpGet]
        [Route("getall")]
        public IQueryable<LitAuthorView> getall()
        {
            return db.LitAuthorDbSet
                    .Select(itm => new LitAuthorView() {
                            AuthorId = itm.AuthorId,
                            FirstName = itm.FirstName,
                            LastName = itm.LastName,
                            BirthDate = itm.BirthDate,
                            DeathDate = itm.DeathDate,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            CCountryName = itm.Country.CountryName
                            });

        } // the end of Get()-method


        [HttpGet]
        [Route("getwithfilter")]
        [ResponseType(typeof(LitAuthorViewPage))]
        public IHttpActionResult getwithfilter([FromUri] System.Int32?[] authorId 
                  , [FromUri] string[] authorIdOprtr 
                , [FromUri] System.String[] firstName 
                  , [FromUri] string[] firstNameOprtr 
                , [FromUri] System.String[] lastName 
                  , [FromUri] string[] lastNameOprtr 
                , [FromUri] System.DateTime?[] birthDate 
                  , [FromUri] string[] birthDateOprtr 
                , [FromUri] System.DateTime?[] deathDate 
                  , [FromUri] string[] deathDateOprtr 
                , [FromUri] System.String[] iso3CntrRef 
                  , [FromUri] string[] iso3CntrRefOprtr 
                , [FromUri] System.String[] iso2CntrRef 
                  , [FromUri] string[] iso2CntrRefOprtr 
                , [FromUri] System.String[] cCountryName 
                  , [FromUri] string[] cCountryNameOprtr 
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
            IQueryable<LitAuthor> query = 
                db.LitAuthorDbSet;
            
            if(authorId != null) {
                if(authorId.Length > 0) {
                    int filterCnt = authorId.Length;
                    int operatorCnt = 0;
                    if(authorIdOprtr != null) {
                        operatorCnt = authorIdOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.Int32 > filterLst = new List<System.Int32 >();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(authorId[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( authorIdOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(authorIdOprtr[i])) {
                                    currOprtr = authorIdOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(authorId[i].Value);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                   // 
                   // System.Int32[] filter = authorId.Where(i => i.HasValue).Select(i => i.Value).ToArray();
                   //
                   System.Int32[] filter = filterLst.ToArray();
                    if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.AuthorId));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Int32 aflt = authorId[ fltItm.Value ].Value;
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.AuthorId >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.AuthorId <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.AuthorId != aflt );
                                break;
                        }
                    }

                }
            }
            if(firstName != null) {
                if(firstName.Length > 0) {
                    int filterCnt = firstName.Length;
                    int operatorCnt = 0;
                    if(firstNameOprtr != null) {
                        operatorCnt = firstNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(firstName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( firstNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(firstNameOprtr[i])) {
                                    currOprtr = firstNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(firstName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = firstName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = firstName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.FirstName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.FirstName == null) ||
                                            (p.FirstName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.FirstName.Contains(aflt0))
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
                                            (p.FirstName == null) ||
                                            (p.FirstName.Contains(aflt0)) ||
                                            (p.FirstName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.FirstName.Contains(aflt0)) ||
                                            (p.FirstName.Contains(aflt1))
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
                                            (p.FirstName == null) ||
                                            (p.FirstName.Contains(aflt0)) ||
                                            (p.FirstName.Contains(aflt1)) ||
                                            (p.FirstName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.FirstName.Contains(aflt0)) ||
                                            (p.FirstName.Contains(aflt1)) ||
                                            (p.FirstName.Contains(aflt2))
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
                                            (p.FirstName == null) ||
                                            (p.FirstName.Contains(aflt0)) ||
                                            (p.FirstName.Contains(aflt1)) ||
                                            (p.FirstName.Contains(aflt2)) ||
                                            (p.FirstName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.FirstName.Contains(aflt0)) ||
                                            (p.FirstName.Contains(aflt1)) ||
                                            (p.FirstName.Contains(aflt2)) ||
                                            (p.FirstName.Contains(aflt3))
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
                                            (p.FirstName == null) ||
                                            (p.FirstName.Contains(aflt0)) ||
                                            (p.FirstName.Contains(aflt1)) ||
                                            (p.FirstName.Contains(aflt2)) ||
                                            (p.FirstName.Contains(aflt3)) ||
                                            (p.FirstName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.FirstName.Contains(aflt0)) ||
                                            (p.FirstName.Contains(aflt1)) ||
                                            (p.FirstName.Contains(aflt2)) ||
                                            (p.FirstName.Contains(aflt3)) ||
                                            (p.FirstName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = firstName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.FirstName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.FirstName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.FirstName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(lastName != null) {
                if(lastName.Length > 0) {
                    int filterCnt = lastName.Length;
                    int operatorCnt = 0;
                    if(lastNameOprtr != null) {
                        operatorCnt = lastNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(lastName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( lastNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(lastNameOprtr[i])) {
                                    currOprtr = lastNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(lastName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = lastName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = lastName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.LastName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.LastName == null) ||
                                            (p.LastName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.LastName.Contains(aflt0))
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
                                            (p.LastName == null) ||
                                            (p.LastName.Contains(aflt0)) ||
                                            (p.LastName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.LastName.Contains(aflt0)) ||
                                            (p.LastName.Contains(aflt1))
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
                                            (p.LastName == null) ||
                                            (p.LastName.Contains(aflt0)) ||
                                            (p.LastName.Contains(aflt1)) ||
                                            (p.LastName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.LastName.Contains(aflt0)) ||
                                            (p.LastName.Contains(aflt1)) ||
                                            (p.LastName.Contains(aflt2))
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
                                            (p.LastName == null) ||
                                            (p.LastName.Contains(aflt0)) ||
                                            (p.LastName.Contains(aflt1)) ||
                                            (p.LastName.Contains(aflt2)) ||
                                            (p.LastName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.LastName.Contains(aflt0)) ||
                                            (p.LastName.Contains(aflt1)) ||
                                            (p.LastName.Contains(aflt2)) ||
                                            (p.LastName.Contains(aflt3))
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
                                            (p.LastName == null) ||
                                            (p.LastName.Contains(aflt0)) ||
                                            (p.LastName.Contains(aflt1)) ||
                                            (p.LastName.Contains(aflt2)) ||
                                            (p.LastName.Contains(aflt3)) ||
                                            (p.LastName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.LastName.Contains(aflt0)) ||
                                            (p.LastName.Contains(aflt1)) ||
                                            (p.LastName.Contains(aflt2)) ||
                                            (p.LastName.Contains(aflt3)) ||
                                            (p.LastName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = lastName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.LastName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.LastName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.LastName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(birthDate != null) {
                if(birthDate.Length > 0) {
                    int filterCnt = birthDate.Length;
                    int operatorCnt = 0;
                    if(birthDateOprtr != null) {
                        operatorCnt = birthDateOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.DateTime ?> filterLst = new List<System.DateTime ?>();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(birthDate[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( birthDateOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(birthDateOprtr[i])) {
                                    currOprtr = birthDateOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(birthDate[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }
                    //
                    // System.DateTime ?[] filter = birthDate.Where(i => i.HasValue).Select(i => i).ToArray();
                    //
                    System.DateTime ?[] filter = filterLst.ToArray();
                    if ( (filter.Length + filterOprtLst.Count) != filterCnt) {
                        if (filter.Length > 0) {
                            query = query.Where(p => (filter.Contains(p.BirthDate)) || (p.BirthDate == null));
                        } else {
                            query = query.Where(p => (p.BirthDate == null) );
                        }
                    } else if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.BirthDate));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Nullable<System.DateTime> aflt = birthDate[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.BirthDate >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.BirthDate <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.BirthDate != aflt );
                                break;
                        }
                    }

                }
            }
            if(deathDate != null) {
                if(deathDate.Length > 0) {
                    int filterCnt = deathDate.Length;
                    int operatorCnt = 0;
                    if(deathDateOprtr != null) {
                        operatorCnt = deathDateOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.DateTime ?> filterLst = new List<System.DateTime ?>();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(deathDate[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( deathDateOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(deathDateOprtr[i])) {
                                    currOprtr = deathDateOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(deathDate[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }
                    //
                    // System.DateTime ?[] filter = deathDate.Where(i => i.HasValue).Select(i => i).ToArray();
                    //
                    System.DateTime ?[] filter = filterLst.ToArray();
                    if ( (filter.Length + filterOprtLst.Count) != filterCnt) {
                        if (filter.Length > 0) {
                            query = query.Where(p => (filter.Contains(p.DeathDate)) || (p.DeathDate == null));
                        } else {
                            query = query.Where(p => (p.DeathDate == null) );
                        }
                    } else if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.DeathDate));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Nullable<System.DateTime> aflt = deathDate[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.DeathDate >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.DeathDate <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.DeathDate != aflt );
                                break;
                        }
                    }

                }
            }
            if(iso3CntrRef != null) {
                if(iso3CntrRef.Length > 0) {
                    int filterCnt = iso3CntrRef.Length;
                    int operatorCnt = 0;
                    if(iso3CntrRefOprtr != null) {
                        operatorCnt = iso3CntrRefOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(iso3CntrRef[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( iso3CntrRefOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(iso3CntrRefOprtr[i])) {
                                    currOprtr = iso3CntrRefOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(iso3CntrRef[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = iso3CntrRef.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = iso3CntrRef.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Iso3CntrRef == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso3CntrRef == null) ||
                                            (p.Iso3CntrRef.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3CntrRef.Contains(aflt0))
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
                                            (p.Iso3CntrRef == null) ||
                                            (p.Iso3CntrRef.Contains(aflt0)) ||
                                            (p.Iso3CntrRef.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3CntrRef.Contains(aflt0)) ||
                                            (p.Iso3CntrRef.Contains(aflt1))
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
                                            (p.Iso3CntrRef == null) ||
                                            (p.Iso3CntrRef.Contains(aflt0)) ||
                                            (p.Iso3CntrRef.Contains(aflt1)) ||
                                            (p.Iso3CntrRef.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3CntrRef.Contains(aflt0)) ||
                                            (p.Iso3CntrRef.Contains(aflt1)) ||
                                            (p.Iso3CntrRef.Contains(aflt2))
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
                                            (p.Iso3CntrRef == null) ||
                                            (p.Iso3CntrRef.Contains(aflt0)) ||
                                            (p.Iso3CntrRef.Contains(aflt1)) ||
                                            (p.Iso3CntrRef.Contains(aflt2)) ||
                                            (p.Iso3CntrRef.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3CntrRef.Contains(aflt0)) ||
                                            (p.Iso3CntrRef.Contains(aflt1)) ||
                                            (p.Iso3CntrRef.Contains(aflt2)) ||
                                            (p.Iso3CntrRef.Contains(aflt3))
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
                                            (p.Iso3CntrRef == null) ||
                                            (p.Iso3CntrRef.Contains(aflt0)) ||
                                            (p.Iso3CntrRef.Contains(aflt1)) ||
                                            (p.Iso3CntrRef.Contains(aflt2)) ||
                                            (p.Iso3CntrRef.Contains(aflt3)) ||
                                            (p.Iso3CntrRef.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso3CntrRef.Contains(aflt0)) ||
                                            (p.Iso3CntrRef.Contains(aflt1)) ||
                                            (p.Iso3CntrRef.Contains(aflt2)) ||
                                            (p.Iso3CntrRef.Contains(aflt3)) ||
                                            (p.Iso3CntrRef.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = iso3CntrRef[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Iso3CntrRef.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Iso3CntrRef.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Iso3CntrRef.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(iso2CntrRef != null) {
                if(iso2CntrRef.Length > 0) {
                    int filterCnt = iso2CntrRef.Length;
                    int operatorCnt = 0;
                    if(iso2CntrRefOprtr != null) {
                        operatorCnt = iso2CntrRefOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(iso2CntrRef[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( iso2CntrRefOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(iso2CntrRefOprtr[i])) {
                                    currOprtr = iso2CntrRefOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(iso2CntrRef[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = iso2CntrRef.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = iso2CntrRef.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Iso2CntrRef == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Iso2CntrRef == null) ||
                                            (p.Iso2CntrRef.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2CntrRef.Contains(aflt0))
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
                                            (p.Iso2CntrRef == null) ||
                                            (p.Iso2CntrRef.Contains(aflt0)) ||
                                            (p.Iso2CntrRef.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2CntrRef.Contains(aflt0)) ||
                                            (p.Iso2CntrRef.Contains(aflt1))
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
                                            (p.Iso2CntrRef == null) ||
                                            (p.Iso2CntrRef.Contains(aflt0)) ||
                                            (p.Iso2CntrRef.Contains(aflt1)) ||
                                            (p.Iso2CntrRef.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2CntrRef.Contains(aflt0)) ||
                                            (p.Iso2CntrRef.Contains(aflt1)) ||
                                            (p.Iso2CntrRef.Contains(aflt2))
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
                                            (p.Iso2CntrRef == null) ||
                                            (p.Iso2CntrRef.Contains(aflt0)) ||
                                            (p.Iso2CntrRef.Contains(aflt1)) ||
                                            (p.Iso2CntrRef.Contains(aflt2)) ||
                                            (p.Iso2CntrRef.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2CntrRef.Contains(aflt0)) ||
                                            (p.Iso2CntrRef.Contains(aflt1)) ||
                                            (p.Iso2CntrRef.Contains(aflt2)) ||
                                            (p.Iso2CntrRef.Contains(aflt3))
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
                                            (p.Iso2CntrRef == null) ||
                                            (p.Iso2CntrRef.Contains(aflt0)) ||
                                            (p.Iso2CntrRef.Contains(aflt1)) ||
                                            (p.Iso2CntrRef.Contains(aflt2)) ||
                                            (p.Iso2CntrRef.Contains(aflt3)) ||
                                            (p.Iso2CntrRef.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Iso2CntrRef.Contains(aflt0)) ||
                                            (p.Iso2CntrRef.Contains(aflt1)) ||
                                            (p.Iso2CntrRef.Contains(aflt2)) ||
                                            (p.Iso2CntrRef.Contains(aflt3)) ||
                                            (p.Iso2CntrRef.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = iso2CntrRef[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Iso2CntrRef.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Iso2CntrRef.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Iso2CntrRef.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(cCountryName != null) {
                if(cCountryName.Length > 0) {
                    int filterCnt = cCountryName.Length;
                    int operatorCnt = 0;
                    if(cCountryNameOprtr != null) {
                        operatorCnt = cCountryNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(cCountryName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( cCountryNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(cCountryNameOprtr[i])) {
                                    currOprtr = cCountryNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(cCountryName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = cCountryName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = cCountryName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Country.CountryName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Country.CountryName == null) ||
                                            (p.Country.CountryName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Country.CountryName.Contains(aflt0))
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
                                            (p.Country.CountryName == null) ||
                                            (p.Country.CountryName.Contains(aflt0)) ||
                                            (p.Country.CountryName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Country.CountryName.Contains(aflt0)) ||
                                            (p.Country.CountryName.Contains(aflt1))
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
                                            (p.Country.CountryName == null) ||
                                            (p.Country.CountryName.Contains(aflt0)) ||
                                            (p.Country.CountryName.Contains(aflt1)) ||
                                            (p.Country.CountryName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Country.CountryName.Contains(aflt0)) ||
                                            (p.Country.CountryName.Contains(aflt1)) ||
                                            (p.Country.CountryName.Contains(aflt2))
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
                                            (p.Country.CountryName == null) ||
                                            (p.Country.CountryName.Contains(aflt0)) ||
                                            (p.Country.CountryName.Contains(aflt1)) ||
                                            (p.Country.CountryName.Contains(aflt2)) ||
                                            (p.Country.CountryName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Country.CountryName.Contains(aflt0)) ||
                                            (p.Country.CountryName.Contains(aflt1)) ||
                                            (p.Country.CountryName.Contains(aflt2)) ||
                                            (p.Country.CountryName.Contains(aflt3))
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
                                            (p.Country.CountryName == null) ||
                                            (p.Country.CountryName.Contains(aflt0)) ||
                                            (p.Country.CountryName.Contains(aflt1)) ||
                                            (p.Country.CountryName.Contains(aflt2)) ||
                                            (p.Country.CountryName.Contains(aflt3)) ||
                                            (p.Country.CountryName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Country.CountryName.Contains(aflt0)) ||
                                            (p.Country.CountryName.Contains(aflt1)) ||
                                            (p.Country.CountryName.Contains(aflt2)) ||
                                            (p.Country.CountryName.Contains(aflt3)) ||
                                            (p.Country.CountryName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = cCountryName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Country.CountryName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Country.CountryName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Country.CountryName.CompareTo(aflt) != 0 );
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
                IOrderedQueryable<LitAuthor> orderedQuery = null;
                if(currentOrderBy != null) {
                    List<string> wasInUseOrderBy = new List<string>();
                    foreach(string propName in currentOrderBy) {
                        string lowerCaseStr = propName.ToLower();
                        if (wasInUseOrderBy.Contains(lowerCaseStr)) {
                            continue;
                        }
                        switch(lowerCaseStr) {
                            case "authorid" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.AuthorId);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.AuthorId);
                                }
                                wasInUseOrderBy.Add("authorid");
                                wasInUseOrderBy.Add("-authorid");
                                break;
                            case "-authorid" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.AuthorId);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.AuthorId);
                                }
                                wasInUseOrderBy.Add("authorid");
                                wasInUseOrderBy.Add("-authorid");
                                break;
                            case "firstname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.FirstName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.FirstName);
                                }
                                wasInUseOrderBy.Add("firstname");
                                wasInUseOrderBy.Add("-firstname");
                                break;
                            case "-firstname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.FirstName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.FirstName);
                                }
                                wasInUseOrderBy.Add("firstname");
                                wasInUseOrderBy.Add("-firstname");
                                break;
                            case "lastname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.LastName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.LastName);
                                }
                                wasInUseOrderBy.Add("lastname");
                                wasInUseOrderBy.Add("-lastname");
                                break;
                            case "-lastname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.LastName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.LastName);
                                }
                                wasInUseOrderBy.Add("lastname");
                                wasInUseOrderBy.Add("-lastname");
                                break;
                            case "birthdate" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.BirthDate);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.BirthDate);
                                }
                                wasInUseOrderBy.Add("birthdate");
                                wasInUseOrderBy.Add("-birthdate");
                                break;
                            case "-birthdate" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.BirthDate);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.BirthDate);
                                }
                                wasInUseOrderBy.Add("birthdate");
                                wasInUseOrderBy.Add("-birthdate");
                                break;
                            case "deathdate" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.DeathDate);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.DeathDate);
                                }
                                wasInUseOrderBy.Add("deathdate");
                                wasInUseOrderBy.Add("-deathdate");
                                break;
                            case "-deathdate" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.DeathDate);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.DeathDate);
                                }
                                wasInUseOrderBy.Add("deathdate");
                                wasInUseOrderBy.Add("-deathdate");
                                break;
                            case "iso3cntrref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Iso3CntrRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Iso3CntrRef);
                                }
                                wasInUseOrderBy.Add("iso3cntrref");
                                wasInUseOrderBy.Add("-iso3cntrref");
                                break;
                            case "-iso3cntrref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Iso3CntrRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Iso3CntrRef);
                                }
                                wasInUseOrderBy.Add("iso3cntrref");
                                wasInUseOrderBy.Add("-iso3cntrref");
                                break;
                            case "iso2cntrref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Iso2CntrRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Iso2CntrRef);
                                }
                                wasInUseOrderBy.Add("iso2cntrref");
                                wasInUseOrderBy.Add("-iso2cntrref");
                                break;
                            case "-iso2cntrref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Iso2CntrRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Iso2CntrRef);
                                }
                                wasInUseOrderBy.Add("iso2cntrref");
                                wasInUseOrderBy.Add("-iso2cntrref");
                                break;
                            case "ccountryname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Country.CountryName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Country.CountryName);
                                }
                                wasInUseOrderBy.Add("ccountryname");
                                wasInUseOrderBy.Add("-ccountryname");
                                break;
                            case "-ccountryname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Country.CountryName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Country.CountryName);
                                }
                                wasInUseOrderBy.Add("ccountryname");
                                wasInUseOrderBy.Add("-ccountryname");
                                break;
                                default:
                                    break;
                        }
                    }
                }
                if(isFirstTime) {                
                    orderedQuery = query.OrderBy(p => p.AuthorId);
                } // totals pageCount currentPageSize
                LitAuthorViewPage resultObject = new LitAuthorViewPage() {
                    page = (currentPage > 0) ? (currentPage-1) : currentPage,
                    pagesize = currentPageSize,
                    pagecount = pageCount,
                    total = totals
                };
                resultObject.items = orderedQuery.Skip((currentPage - 1) * currentPageSize).Take(currentPageSize).Select(itm => new LitAuthorView() {
                            AuthorId = itm.AuthorId,
                            FirstName = itm.FirstName,
                            LastName = itm.LastName,
                            BirthDate = itm.BirthDate,
                            DeathDate = itm.DeathDate,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            CCountryName = itm.Country.CountryName
                            }).ToList();
                return Ok(resultObject);
        } // the end of GetWithFilter()-method

        [HttpGet]
        [Route("getone")]
        [ResponseType(typeof(LitAuthorView))]
        public IHttpActionResult getone([FromUri] System.Int32 authorId
                )
        {
            LitAuthorView result = db.LitAuthorDbSet
                    .Where(p => p.AuthorId == authorId)
                    .Select(itm => new LitAuthorView() {
                            AuthorId = itm.AuthorId,
                            FirstName = itm.FirstName,
                            LastName = itm.LastName,
                            BirthDate = itm.BirthDate,
                            DeathDate = itm.DeathDate,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            CCountryName = itm.Country.CountryName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        } // the end of public GetOne()-method

        [HttpPut]
        [ResponseType(typeof(LitAuthorView))]
        [Route("updateone")]
        public IHttpActionResult updateone([FromBody] LitAuthorView viewToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            LitAuthor resultEntity = db.LitAuthorDbSet
                    .Where(p => p.AuthorId == viewToUpdate.AuthorId)
                    .FirstOrDefault();
            if(resultEntity == null) {
                return NotFound();
            }

            resultEntity.FirstName =  viewToUpdate.FirstName;
            resultEntity.LastName =  viewToUpdate.LastName;
            resultEntity.BirthDate =  viewToUpdate.BirthDate;
            resultEntity.DeathDate =  viewToUpdate.DeathDate;
            resultEntity.Iso3CntrRef =  viewToUpdate.Iso3CntrRef;
            resultEntity.Iso2CntrRef =  viewToUpdate.Iso2CntrRef;
            db.Entry(resultEntity).State = EntityState.Modified;
            db.SaveChanges();
            LitAuthorView result = db.LitAuthorDbSet
                    .Where(p => p.AuthorId == viewToUpdate.AuthorId)
                    .Select(itm => new LitAuthorView() {
                            AuthorId = itm.AuthorId,
                            FirstName = itm.FirstName,
                            LastName = itm.LastName,
                            BirthDate = itm.BirthDate,
                            DeathDate = itm.DeathDate,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            CCountryName = itm.Country.CountryName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [ResponseType(typeof(LitAuthorView))]
        [Route("addone")]
        public IHttpActionResult addone([FromBody] LitAuthorView viewToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            LitAuthor entityToAdd = new LitAuthor();
            entityToAdd.AuthorId =  viewToAdd.AuthorId;
            entityToAdd.FirstName =  viewToAdd.FirstName;
            entityToAdd.LastName =  viewToAdd.LastName;
            entityToAdd.BirthDate =  viewToAdd.BirthDate;
            entityToAdd.DeathDate =  viewToAdd.DeathDate;
            entityToAdd.Iso3CntrRef =  viewToAdd.Iso3CntrRef;
            entityToAdd.Iso2CntrRef =  viewToAdd.Iso2CntrRef;
            db.LitAuthorDbSet.Add(entityToAdd);
            db.SaveChanges();

            LitAuthorView result = db.LitAuthorDbSet
                    .Where(p => p.AuthorId == entityToAdd.AuthorId)
                    .Select(itm => new LitAuthorView() {
                            AuthorId = itm.AuthorId,
                            FirstName = itm.FirstName,
                            LastName = itm.LastName,
                            BirthDate = itm.BirthDate,
                            DeathDate = itm.DeathDate,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            CCountryName = itm.Country.CountryName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpDelete]
        [ResponseType(typeof(LitAuthorView))]
        [Route("deleteone")]
        public IHttpActionResult deleteone([FromUri] System.Int32 authorId
                )
        {

                LitAuthorView result = db.LitAuthorDbSet
                    .Where(p => p.AuthorId == authorId)
                    .Select(itm => new LitAuthorView() {
                            AuthorId = itm.AuthorId,
                            FirstName = itm.FirstName,
                            LastName = itm.LastName,
                            BirthDate = itm.BirthDate,
                            DeathDate = itm.DeathDate,
                            Iso3CntrRef = itm.Iso3CntrRef,
                            Iso2CntrRef = itm.Iso2CntrRef,
                            CCountryName = itm.Country.CountryName
                    }).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }

                LitAuthor entityToDelete = db.LitAuthorDbSet
                    .Where(p => p.AuthorId == result.AuthorId)
                    .FirstOrDefault();
                if (entityToDelete == null) {
                    return Ok(result);
                }
                db.LitAuthorDbSet.Remove(entityToDelete);
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

