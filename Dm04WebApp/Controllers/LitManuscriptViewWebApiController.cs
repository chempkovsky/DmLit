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

    [RoutePrefix("litmanuscriptviewwebapi")]
    public class LitManuscriptViewWebApiController: ApiController
    {
        private int defaultPageSize = 50;
        private int minPageSize = 5;
        private int maxPageSize = 150;
        private LitDbContext db = new LitDbContext();
        [HttpGet]
        [Route("getall")]
        public IQueryable<LitManuscriptView> getall()
        {
            return db.LitManuscriptDbSet
                    .Select(itm => new LitManuscriptView() {
                            ManuscriptId = itm.ManuscriptId,
                            ManuscriptTitle = itm.ManuscriptTitle,
                            CompletionDate = itm.CompletionDate,
                            BeginningDate = itm.BeginningDate,
                            AuthorIdRef = itm.AuthorIdRef,
                            GenreIdRef = itm.GenreIdRef,
                            DialectIdRef = itm.DialectIdRef,
                            AFirstName = itm.Author.FirstName,
                            ALastName = itm.Author.LastName,
                            ABirthDate = itm.Author.BirthDate,
                            ACCountryName = itm.Author.Country.CountryName,
                            GGenreName = itm.Genre.GenreName,
                            DDialectName = itm.Dialect.DialectName,
                            DCCountryName = itm.Dialect.Country.CountryName
                            });

        } // the end of Get()-method


        [HttpGet]
        [Route("getwithfilter")]
        [ResponseType(typeof(LitManuscriptViewPage))]
        public IHttpActionResult getwithfilter([FromUri] System.Int32?[] manuscriptId 
                  , [FromUri] string[] manuscriptIdOprtr 
                , [FromUri] System.String[] manuscriptTitle 
                  , [FromUri] string[] manuscriptTitleOprtr 
                , [FromUri] System.DateTime?[] completionDate 
                  , [FromUri] string[] completionDateOprtr 
                , [FromUri] System.DateTime?[] beginningDate 
                  , [FromUri] string[] beginningDateOprtr 
                , [FromUri] System.Int32?[] authorIdRef 
                  , [FromUri] string[] authorIdRefOprtr 
                , [FromUri] System.Int32?[] genreIdRef 
                  , [FromUri] string[] genreIdRefOprtr 
                , [FromUri] System.String[] dialectIdRef 
                  , [FromUri] string[] dialectIdRefOprtr 
                , [FromUri] System.String[] aFirstName 
                  , [FromUri] string[] aFirstNameOprtr 
                , [FromUri] System.String[] aLastName 
                  , [FromUri] string[] aLastNameOprtr 
                , [FromUri] System.DateTime?[] aBirthDate 
                  , [FromUri] string[] aBirthDateOprtr 
                , [FromUri] System.String[] aCCountryName 
                  , [FromUri] string[] aCCountryNameOprtr 
                , [FromUri] System.String[] gGenreName 
                  , [FromUri] string[] gGenreNameOprtr 
                , [FromUri] System.String[] dDialectName 
                  , [FromUri] string[] dDialectNameOprtr 
                , [FromUri] System.String[] dCCountryName 
                  , [FromUri] string[] dCCountryNameOprtr 
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
            IQueryable<LitManuscript> query = 
                db.LitManuscriptDbSet;
            
            if(manuscriptId != null) {
                if(manuscriptId.Length > 0) {
                    int filterCnt = manuscriptId.Length;
                    int operatorCnt = 0;
                    if(manuscriptIdOprtr != null) {
                        operatorCnt = manuscriptIdOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.Int32 > filterLst = new List<System.Int32 >();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(manuscriptId[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( manuscriptIdOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(manuscriptIdOprtr[i])) {
                                    currOprtr = manuscriptIdOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(manuscriptId[i].Value);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                   // 
                   // System.Int32[] filter = manuscriptId.Where(i => i.HasValue).Select(i => i.Value).ToArray();
                   //
                   System.Int32[] filter = filterLst.ToArray();
                    if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.ManuscriptId));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Int32 aflt = manuscriptId[ fltItm.Value ].Value;
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.ManuscriptId >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.ManuscriptId <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.ManuscriptId != aflt );
                                break;
                        }
                    }

                }
            }
            if(manuscriptTitle != null) {
                if(manuscriptTitle.Length > 0) {
                    int filterCnt = manuscriptTitle.Length;
                    int operatorCnt = 0;
                    if(manuscriptTitleOprtr != null) {
                        operatorCnt = manuscriptTitleOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(manuscriptTitle[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( manuscriptTitleOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(manuscriptTitleOprtr[i])) {
                                    currOprtr = manuscriptTitleOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(manuscriptTitle[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = manuscriptTitle.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = manuscriptTitle.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.ManuscriptTitle == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.ManuscriptTitle == null) ||
                                            (p.ManuscriptTitle.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.ManuscriptTitle.Contains(aflt0))
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
                                            (p.ManuscriptTitle == null) ||
                                            (p.ManuscriptTitle.Contains(aflt0)) ||
                                            (p.ManuscriptTitle.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.ManuscriptTitle.Contains(aflt0)) ||
                                            (p.ManuscriptTitle.Contains(aflt1))
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
                                            (p.ManuscriptTitle == null) ||
                                            (p.ManuscriptTitle.Contains(aflt0)) ||
                                            (p.ManuscriptTitle.Contains(aflt1)) ||
                                            (p.ManuscriptTitle.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.ManuscriptTitle.Contains(aflt0)) ||
                                            (p.ManuscriptTitle.Contains(aflt1)) ||
                                            (p.ManuscriptTitle.Contains(aflt2))
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
                                            (p.ManuscriptTitle == null) ||
                                            (p.ManuscriptTitle.Contains(aflt0)) ||
                                            (p.ManuscriptTitle.Contains(aflt1)) ||
                                            (p.ManuscriptTitle.Contains(aflt2)) ||
                                            (p.ManuscriptTitle.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.ManuscriptTitle.Contains(aflt0)) ||
                                            (p.ManuscriptTitle.Contains(aflt1)) ||
                                            (p.ManuscriptTitle.Contains(aflt2)) ||
                                            (p.ManuscriptTitle.Contains(aflt3))
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
                                            (p.ManuscriptTitle == null) ||
                                            (p.ManuscriptTitle.Contains(aflt0)) ||
                                            (p.ManuscriptTitle.Contains(aflt1)) ||
                                            (p.ManuscriptTitle.Contains(aflt2)) ||
                                            (p.ManuscriptTitle.Contains(aflt3)) ||
                                            (p.ManuscriptTitle.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.ManuscriptTitle.Contains(aflt0)) ||
                                            (p.ManuscriptTitle.Contains(aflt1)) ||
                                            (p.ManuscriptTitle.Contains(aflt2)) ||
                                            (p.ManuscriptTitle.Contains(aflt3)) ||
                                            (p.ManuscriptTitle.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = manuscriptTitle[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.ManuscriptTitle.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.ManuscriptTitle.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.ManuscriptTitle.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(completionDate != null) {
                if(completionDate.Length > 0) {
                    int filterCnt = completionDate.Length;
                    int operatorCnt = 0;
                    if(completionDateOprtr != null) {
                        operatorCnt = completionDateOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.DateTime > filterLst = new List<System.DateTime >();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(completionDate[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( completionDateOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(completionDateOprtr[i])) {
                                    currOprtr = completionDateOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(completionDate[i].Value);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                   // 
                   // System.DateTime[] filter = completionDate.Where(i => i.HasValue).Select(i => i.Value).ToArray();
                   //
                   System.DateTime[] filter = filterLst.ToArray();
                    if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.CompletionDate));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.DateTime aflt = completionDate[ fltItm.Value ].Value;
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.CompletionDate >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.CompletionDate <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.CompletionDate != aflt );
                                break;
                        }
                    }

                }
            }
            if(beginningDate != null) {
                if(beginningDate.Length > 0) {
                    int filterCnt = beginningDate.Length;
                    int operatorCnt = 0;
                    if(beginningDateOprtr != null) {
                        operatorCnt = beginningDateOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.DateTime ?> filterLst = new List<System.DateTime ?>();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(beginningDate[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( beginningDateOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(beginningDateOprtr[i])) {
                                    currOprtr = beginningDateOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(beginningDate[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }
                    //
                    // System.DateTime ?[] filter = beginningDate.Where(i => i.HasValue).Select(i => i).ToArray();
                    //
                    System.DateTime ?[] filter = filterLst.ToArray();
                    if ( (filter.Length + filterOprtLst.Count) != filterCnt) {
                        if (filter.Length > 0) {
                            query = query.Where(p => (filter.Contains(p.BeginningDate)) || (p.BeginningDate == null));
                        } else {
                            query = query.Where(p => (p.BeginningDate == null) );
                        }
                    } else if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.BeginningDate));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Nullable<System.DateTime> aflt = beginningDate[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.BeginningDate >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.BeginningDate <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.BeginningDate != aflt );
                                break;
                        }
                    }

                }
            }
            if(authorIdRef != null) {
                if(authorIdRef.Length > 0) {
                    int filterCnt = authorIdRef.Length;
                    int operatorCnt = 0;
                    if(authorIdRefOprtr != null) {
                        operatorCnt = authorIdRefOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.Int32 > filterLst = new List<System.Int32 >();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(authorIdRef[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( authorIdRefOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(authorIdRefOprtr[i])) {
                                    currOprtr = authorIdRefOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(authorIdRef[i].Value);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                   // 
                   // System.Int32[] filter = authorIdRef.Where(i => i.HasValue).Select(i => i.Value).ToArray();
                   //
                   System.Int32[] filter = filterLst.ToArray();
                    if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.AuthorIdRef));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Int32 aflt = authorIdRef[ fltItm.Value ].Value;
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.AuthorIdRef >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.AuthorIdRef <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.AuthorIdRef != aflt );
                                break;
                        }
                    }

                }
            }
            if(genreIdRef != null) {
                if(genreIdRef.Length > 0) {
                    int filterCnt = genreIdRef.Length;
                    int operatorCnt = 0;
                    if(genreIdRefOprtr != null) {
                        operatorCnt = genreIdRefOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.Int32 > filterLst = new List<System.Int32 >();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(genreIdRef[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( genreIdRefOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(genreIdRefOprtr[i])) {
                                    currOprtr = genreIdRefOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(genreIdRef[i].Value);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                   // 
                   // System.Int32[] filter = genreIdRef.Where(i => i.HasValue).Select(i => i.Value).ToArray();
                   //
                   System.Int32[] filter = filterLst.ToArray();
                    if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.GenreIdRef));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Int32 aflt = genreIdRef[ fltItm.Value ].Value;
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.GenreIdRef >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.GenreIdRef <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.GenreIdRef != aflt );
                                break;
                        }
                    }

                }
            }
            if(dialectIdRef != null) {
                if(dialectIdRef.Length > 0) {
                    int filterCnt = dialectIdRef.Length;
                    int operatorCnt = 0;
                    if(dialectIdRefOprtr != null) {
                        operatorCnt = dialectIdRefOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(dialectIdRef[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( dialectIdRefOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(dialectIdRefOprtr[i])) {
                                    currOprtr = dialectIdRefOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(dialectIdRef[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = dialectIdRef.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = dialectIdRef.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.DialectIdRef == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.DialectIdRef == null) ||
                                            (p.DialectIdRef.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DialectIdRef.Contains(aflt0))
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
                                            (p.DialectIdRef == null) ||
                                            (p.DialectIdRef.Contains(aflt0)) ||
                                            (p.DialectIdRef.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DialectIdRef.Contains(aflt0)) ||
                                            (p.DialectIdRef.Contains(aflt1))
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
                                            (p.DialectIdRef == null) ||
                                            (p.DialectIdRef.Contains(aflt0)) ||
                                            (p.DialectIdRef.Contains(aflt1)) ||
                                            (p.DialectIdRef.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DialectIdRef.Contains(aflt0)) ||
                                            (p.DialectIdRef.Contains(aflt1)) ||
                                            (p.DialectIdRef.Contains(aflt2))
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
                                            (p.DialectIdRef == null) ||
                                            (p.DialectIdRef.Contains(aflt0)) ||
                                            (p.DialectIdRef.Contains(aflt1)) ||
                                            (p.DialectIdRef.Contains(aflt2)) ||
                                            (p.DialectIdRef.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DialectIdRef.Contains(aflt0)) ||
                                            (p.DialectIdRef.Contains(aflt1)) ||
                                            (p.DialectIdRef.Contains(aflt2)) ||
                                            (p.DialectIdRef.Contains(aflt3))
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
                                            (p.DialectIdRef == null) ||
                                            (p.DialectIdRef.Contains(aflt0)) ||
                                            (p.DialectIdRef.Contains(aflt1)) ||
                                            (p.DialectIdRef.Contains(aflt2)) ||
                                            (p.DialectIdRef.Contains(aflt3)) ||
                                            (p.DialectIdRef.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.DialectIdRef.Contains(aflt0)) ||
                                            (p.DialectIdRef.Contains(aflt1)) ||
                                            (p.DialectIdRef.Contains(aflt2)) ||
                                            (p.DialectIdRef.Contains(aflt3)) ||
                                            (p.DialectIdRef.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = dialectIdRef[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.DialectIdRef.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.DialectIdRef.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.DialectIdRef.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(aFirstName != null) {
                if(aFirstName.Length > 0) {
                    int filterCnt = aFirstName.Length;
                    int operatorCnt = 0;
                    if(aFirstNameOprtr != null) {
                        operatorCnt = aFirstNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(aFirstName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( aFirstNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(aFirstNameOprtr[i])) {
                                    currOprtr = aFirstNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(aFirstName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = aFirstName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = aFirstName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Author.FirstName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Author.FirstName == null) ||
                                            (p.Author.FirstName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Author.FirstName.Contains(aflt0))
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
                                            (p.Author.FirstName == null) ||
                                            (p.Author.FirstName.Contains(aflt0)) ||
                                            (p.Author.FirstName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Author.FirstName.Contains(aflt0)) ||
                                            (p.Author.FirstName.Contains(aflt1))
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
                                            (p.Author.FirstName == null) ||
                                            (p.Author.FirstName.Contains(aflt0)) ||
                                            (p.Author.FirstName.Contains(aflt1)) ||
                                            (p.Author.FirstName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Author.FirstName.Contains(aflt0)) ||
                                            (p.Author.FirstName.Contains(aflt1)) ||
                                            (p.Author.FirstName.Contains(aflt2))
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
                                            (p.Author.FirstName == null) ||
                                            (p.Author.FirstName.Contains(aflt0)) ||
                                            (p.Author.FirstName.Contains(aflt1)) ||
                                            (p.Author.FirstName.Contains(aflt2)) ||
                                            (p.Author.FirstName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Author.FirstName.Contains(aflt0)) ||
                                            (p.Author.FirstName.Contains(aflt1)) ||
                                            (p.Author.FirstName.Contains(aflt2)) ||
                                            (p.Author.FirstName.Contains(aflt3))
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
                                            (p.Author.FirstName == null) ||
                                            (p.Author.FirstName.Contains(aflt0)) ||
                                            (p.Author.FirstName.Contains(aflt1)) ||
                                            (p.Author.FirstName.Contains(aflt2)) ||
                                            (p.Author.FirstName.Contains(aflt3)) ||
                                            (p.Author.FirstName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Author.FirstName.Contains(aflt0)) ||
                                            (p.Author.FirstName.Contains(aflt1)) ||
                                            (p.Author.FirstName.Contains(aflt2)) ||
                                            (p.Author.FirstName.Contains(aflt3)) ||
                                            (p.Author.FirstName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = aFirstName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Author.FirstName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Author.FirstName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Author.FirstName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(aLastName != null) {
                if(aLastName.Length > 0) {
                    int filterCnt = aLastName.Length;
                    int operatorCnt = 0;
                    if(aLastNameOprtr != null) {
                        operatorCnt = aLastNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(aLastName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( aLastNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(aLastNameOprtr[i])) {
                                    currOprtr = aLastNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(aLastName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = aLastName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = aLastName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Author.LastName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Author.LastName == null) ||
                                            (p.Author.LastName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Author.LastName.Contains(aflt0))
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
                                            (p.Author.LastName == null) ||
                                            (p.Author.LastName.Contains(aflt0)) ||
                                            (p.Author.LastName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Author.LastName.Contains(aflt0)) ||
                                            (p.Author.LastName.Contains(aflt1))
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
                                            (p.Author.LastName == null) ||
                                            (p.Author.LastName.Contains(aflt0)) ||
                                            (p.Author.LastName.Contains(aflt1)) ||
                                            (p.Author.LastName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Author.LastName.Contains(aflt0)) ||
                                            (p.Author.LastName.Contains(aflt1)) ||
                                            (p.Author.LastName.Contains(aflt2))
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
                                            (p.Author.LastName == null) ||
                                            (p.Author.LastName.Contains(aflt0)) ||
                                            (p.Author.LastName.Contains(aflt1)) ||
                                            (p.Author.LastName.Contains(aflt2)) ||
                                            (p.Author.LastName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Author.LastName.Contains(aflt0)) ||
                                            (p.Author.LastName.Contains(aflt1)) ||
                                            (p.Author.LastName.Contains(aflt2)) ||
                                            (p.Author.LastName.Contains(aflt3))
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
                                            (p.Author.LastName == null) ||
                                            (p.Author.LastName.Contains(aflt0)) ||
                                            (p.Author.LastName.Contains(aflt1)) ||
                                            (p.Author.LastName.Contains(aflt2)) ||
                                            (p.Author.LastName.Contains(aflt3)) ||
                                            (p.Author.LastName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Author.LastName.Contains(aflt0)) ||
                                            (p.Author.LastName.Contains(aflt1)) ||
                                            (p.Author.LastName.Contains(aflt2)) ||
                                            (p.Author.LastName.Contains(aflt3)) ||
                                            (p.Author.LastName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = aLastName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Author.LastName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Author.LastName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Author.LastName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(aBirthDate != null) {
                if(aBirthDate.Length > 0) {
                    int filterCnt = aBirthDate.Length;
                    int operatorCnt = 0;
                    if(aBirthDateOprtr != null) {
                        operatorCnt = aBirthDateOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.DateTime ?> filterLst = new List<System.DateTime ?>();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(aBirthDate[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( aBirthDateOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(aBirthDateOprtr[i])) {
                                    currOprtr = aBirthDateOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(aBirthDate[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }
                    //
                    // System.DateTime ?[] filter = aBirthDate.Where(i => i.HasValue).Select(i => i).ToArray();
                    //
                    System.DateTime ?[] filter = filterLst.ToArray();
                    if ( (filter.Length + filterOprtLst.Count) != filterCnt) {
                        if (filter.Length > 0) {
                            query = query.Where(p => (filter.Contains(p.Author.BirthDate)) || (p.Author.BirthDate == null));
                        } else {
                            query = query.Where(p => (p.Author.BirthDate == null) );
                        }
                    } else if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.Author.BirthDate));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Nullable<System.DateTime> aflt = aBirthDate[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Author.BirthDate >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.Author.BirthDate <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.Author.BirthDate != aflt );
                                break;
                        }
                    }

                }
            }
            if(aCCountryName != null) {
                if(aCCountryName.Length > 0) {
                    int filterCnt = aCCountryName.Length;
                    int operatorCnt = 0;
                    if(aCCountryNameOprtr != null) {
                        operatorCnt = aCCountryNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(aCCountryName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( aCCountryNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(aCCountryNameOprtr[i])) {
                                    currOprtr = aCCountryNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(aCCountryName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = aCCountryName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = aCCountryName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Author.Country.CountryName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Author.Country.CountryName == null) ||
                                            (p.Author.Country.CountryName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Author.Country.CountryName.Contains(aflt0))
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
                                            (p.Author.Country.CountryName == null) ||
                                            (p.Author.Country.CountryName.Contains(aflt0)) ||
                                            (p.Author.Country.CountryName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Author.Country.CountryName.Contains(aflt0)) ||
                                            (p.Author.Country.CountryName.Contains(aflt1))
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
                                            (p.Author.Country.CountryName == null) ||
                                            (p.Author.Country.CountryName.Contains(aflt0)) ||
                                            (p.Author.Country.CountryName.Contains(aflt1)) ||
                                            (p.Author.Country.CountryName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Author.Country.CountryName.Contains(aflt0)) ||
                                            (p.Author.Country.CountryName.Contains(aflt1)) ||
                                            (p.Author.Country.CountryName.Contains(aflt2))
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
                                            (p.Author.Country.CountryName == null) ||
                                            (p.Author.Country.CountryName.Contains(aflt0)) ||
                                            (p.Author.Country.CountryName.Contains(aflt1)) ||
                                            (p.Author.Country.CountryName.Contains(aflt2)) ||
                                            (p.Author.Country.CountryName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Author.Country.CountryName.Contains(aflt0)) ||
                                            (p.Author.Country.CountryName.Contains(aflt1)) ||
                                            (p.Author.Country.CountryName.Contains(aflt2)) ||
                                            (p.Author.Country.CountryName.Contains(aflt3))
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
                                            (p.Author.Country.CountryName == null) ||
                                            (p.Author.Country.CountryName.Contains(aflt0)) ||
                                            (p.Author.Country.CountryName.Contains(aflt1)) ||
                                            (p.Author.Country.CountryName.Contains(aflt2)) ||
                                            (p.Author.Country.CountryName.Contains(aflt3)) ||
                                            (p.Author.Country.CountryName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Author.Country.CountryName.Contains(aflt0)) ||
                                            (p.Author.Country.CountryName.Contains(aflt1)) ||
                                            (p.Author.Country.CountryName.Contains(aflt2)) ||
                                            (p.Author.Country.CountryName.Contains(aflt3)) ||
                                            (p.Author.Country.CountryName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = aCCountryName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Author.Country.CountryName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Author.Country.CountryName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Author.Country.CountryName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(gGenreName != null) {
                if(gGenreName.Length > 0) {
                    int filterCnt = gGenreName.Length;
                    int operatorCnt = 0;
                    if(gGenreNameOprtr != null) {
                        operatorCnt = gGenreNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(gGenreName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( gGenreNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(gGenreNameOprtr[i])) {
                                    currOprtr = gGenreNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(gGenreName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = gGenreName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = gGenreName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Genre.GenreName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Genre.GenreName == null) ||
                                            (p.Genre.GenreName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Genre.GenreName.Contains(aflt0))
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
                                            (p.Genre.GenreName == null) ||
                                            (p.Genre.GenreName.Contains(aflt0)) ||
                                            (p.Genre.GenreName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Genre.GenreName.Contains(aflt0)) ||
                                            (p.Genre.GenreName.Contains(aflt1))
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
                                            (p.Genre.GenreName == null) ||
                                            (p.Genre.GenreName.Contains(aflt0)) ||
                                            (p.Genre.GenreName.Contains(aflt1)) ||
                                            (p.Genre.GenreName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Genre.GenreName.Contains(aflt0)) ||
                                            (p.Genre.GenreName.Contains(aflt1)) ||
                                            (p.Genre.GenreName.Contains(aflt2))
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
                                            (p.Genre.GenreName == null) ||
                                            (p.Genre.GenreName.Contains(aflt0)) ||
                                            (p.Genre.GenreName.Contains(aflt1)) ||
                                            (p.Genre.GenreName.Contains(aflt2)) ||
                                            (p.Genre.GenreName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Genre.GenreName.Contains(aflt0)) ||
                                            (p.Genre.GenreName.Contains(aflt1)) ||
                                            (p.Genre.GenreName.Contains(aflt2)) ||
                                            (p.Genre.GenreName.Contains(aflt3))
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
                                            (p.Genre.GenreName == null) ||
                                            (p.Genre.GenreName.Contains(aflt0)) ||
                                            (p.Genre.GenreName.Contains(aflt1)) ||
                                            (p.Genre.GenreName.Contains(aflt2)) ||
                                            (p.Genre.GenreName.Contains(aflt3)) ||
                                            (p.Genre.GenreName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Genre.GenreName.Contains(aflt0)) ||
                                            (p.Genre.GenreName.Contains(aflt1)) ||
                                            (p.Genre.GenreName.Contains(aflt2)) ||
                                            (p.Genre.GenreName.Contains(aflt3)) ||
                                            (p.Genre.GenreName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = gGenreName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Genre.GenreName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Genre.GenreName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Genre.GenreName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(dDialectName != null) {
                if(dDialectName.Length > 0) {
                    int filterCnt = dDialectName.Length;
                    int operatorCnt = 0;
                    if(dDialectNameOprtr != null) {
                        operatorCnt = dDialectNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(dDialectName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( dDialectNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(dDialectNameOprtr[i])) {
                                    currOprtr = dDialectNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(dDialectName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = dDialectName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = dDialectName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Dialect.DialectName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Dialect.DialectName == null) ||
                                            (p.Dialect.DialectName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Dialect.DialectName.Contains(aflt0))
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
                                            (p.Dialect.DialectName == null) ||
                                            (p.Dialect.DialectName.Contains(aflt0)) ||
                                            (p.Dialect.DialectName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Dialect.DialectName.Contains(aflt0)) ||
                                            (p.Dialect.DialectName.Contains(aflt1))
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
                                            (p.Dialect.DialectName == null) ||
                                            (p.Dialect.DialectName.Contains(aflt0)) ||
                                            (p.Dialect.DialectName.Contains(aflt1)) ||
                                            (p.Dialect.DialectName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Dialect.DialectName.Contains(aflt0)) ||
                                            (p.Dialect.DialectName.Contains(aflt1)) ||
                                            (p.Dialect.DialectName.Contains(aflt2))
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
                                            (p.Dialect.DialectName == null) ||
                                            (p.Dialect.DialectName.Contains(aflt0)) ||
                                            (p.Dialect.DialectName.Contains(aflt1)) ||
                                            (p.Dialect.DialectName.Contains(aflt2)) ||
                                            (p.Dialect.DialectName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Dialect.DialectName.Contains(aflt0)) ||
                                            (p.Dialect.DialectName.Contains(aflt1)) ||
                                            (p.Dialect.DialectName.Contains(aflt2)) ||
                                            (p.Dialect.DialectName.Contains(aflt3))
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
                                            (p.Dialect.DialectName == null) ||
                                            (p.Dialect.DialectName.Contains(aflt0)) ||
                                            (p.Dialect.DialectName.Contains(aflt1)) ||
                                            (p.Dialect.DialectName.Contains(aflt2)) ||
                                            (p.Dialect.DialectName.Contains(aflt3)) ||
                                            (p.Dialect.DialectName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Dialect.DialectName.Contains(aflt0)) ||
                                            (p.Dialect.DialectName.Contains(aflt1)) ||
                                            (p.Dialect.DialectName.Contains(aflt2)) ||
                                            (p.Dialect.DialectName.Contains(aflt3)) ||
                                            (p.Dialect.DialectName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = dDialectName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Dialect.DialectName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Dialect.DialectName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Dialect.DialectName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(dCCountryName != null) {
                if(dCCountryName.Length > 0) {
                    int filterCnt = dCCountryName.Length;
                    int operatorCnt = 0;
                    if(dCCountryNameOprtr != null) {
                        operatorCnt = dCCountryNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(dCCountryName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( dCCountryNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(dCCountryNameOprtr[i])) {
                                    currOprtr = dCCountryNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(dCCountryName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = dCCountryName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = dCCountryName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Dialect.Country.CountryName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Dialect.Country.CountryName == null) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Dialect.Country.CountryName.Contains(aflt0))
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
                                            (p.Dialect.Country.CountryName == null) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt0)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Dialect.Country.CountryName.Contains(aflt0)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt1))
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
                                            (p.Dialect.Country.CountryName == null) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt0)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt1)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Dialect.Country.CountryName.Contains(aflt0)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt1)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt2))
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
                                            (p.Dialect.Country.CountryName == null) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt0)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt1)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt2)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Dialect.Country.CountryName.Contains(aflt0)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt1)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt2)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt3))
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
                                            (p.Dialect.Country.CountryName == null) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt0)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt1)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt2)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt3)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Dialect.Country.CountryName.Contains(aflt0)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt1)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt2)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt3)) ||
                                            (p.Dialect.Country.CountryName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = dCCountryName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Dialect.Country.CountryName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Dialect.Country.CountryName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Dialect.Country.CountryName.CompareTo(aflt) != 0 );
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
                IOrderedQueryable<LitManuscript> orderedQuery = null;
                if(currentOrderBy != null) {
                    List<string> wasInUseOrderBy = new List<string>();
                    foreach(string propName in currentOrderBy) {
                        string lowerCaseStr = propName.ToLower();
                        if (wasInUseOrderBy.Contains(lowerCaseStr)) {
                            continue;
                        }
                        switch(lowerCaseStr) {
                            case "manuscriptid" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.ManuscriptId);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.ManuscriptId);
                                }
                                wasInUseOrderBy.Add("manuscriptid");
                                wasInUseOrderBy.Add("-manuscriptid");
                                break;
                            case "-manuscriptid" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.ManuscriptId);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.ManuscriptId);
                                }
                                wasInUseOrderBy.Add("manuscriptid");
                                wasInUseOrderBy.Add("-manuscriptid");
                                break;
                            case "manuscripttitle" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.ManuscriptTitle);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.ManuscriptTitle);
                                }
                                wasInUseOrderBy.Add("manuscripttitle");
                                wasInUseOrderBy.Add("-manuscripttitle");
                                break;
                            case "-manuscripttitle" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.ManuscriptTitle);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.ManuscriptTitle);
                                }
                                wasInUseOrderBy.Add("manuscripttitle");
                                wasInUseOrderBy.Add("-manuscripttitle");
                                break;
                            case "completiondate" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.CompletionDate);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.CompletionDate);
                                }
                                wasInUseOrderBy.Add("completiondate");
                                wasInUseOrderBy.Add("-completiondate");
                                break;
                            case "-completiondate" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.CompletionDate);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.CompletionDate);
                                }
                                wasInUseOrderBy.Add("completiondate");
                                wasInUseOrderBy.Add("-completiondate");
                                break;
                            case "beginningdate" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.BeginningDate);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.BeginningDate);
                                }
                                wasInUseOrderBy.Add("beginningdate");
                                wasInUseOrderBy.Add("-beginningdate");
                                break;
                            case "-beginningdate" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.BeginningDate);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.BeginningDate);
                                }
                                wasInUseOrderBy.Add("beginningdate");
                                wasInUseOrderBy.Add("-beginningdate");
                                break;
                            case "authoridref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.AuthorIdRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.AuthorIdRef);
                                }
                                wasInUseOrderBy.Add("authoridref");
                                wasInUseOrderBy.Add("-authoridref");
                                break;
                            case "-authoridref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.AuthorIdRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.AuthorIdRef);
                                }
                                wasInUseOrderBy.Add("authoridref");
                                wasInUseOrderBy.Add("-authoridref");
                                break;
                            case "genreidref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.GenreIdRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.GenreIdRef);
                                }
                                wasInUseOrderBy.Add("genreidref");
                                wasInUseOrderBy.Add("-genreidref");
                                break;
                            case "-genreidref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.GenreIdRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.GenreIdRef);
                                }
                                wasInUseOrderBy.Add("genreidref");
                                wasInUseOrderBy.Add("-genreidref");
                                break;
                            case "dialectidref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.DialectIdRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.DialectIdRef);
                                }
                                wasInUseOrderBy.Add("dialectidref");
                                wasInUseOrderBy.Add("-dialectidref");
                                break;
                            case "-dialectidref" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.DialectIdRef);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.DialectIdRef);
                                }
                                wasInUseOrderBy.Add("dialectidref");
                                wasInUseOrderBy.Add("-dialectidref");
                                break;
                            case "afirstname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Author.FirstName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Author.FirstName);
                                }
                                wasInUseOrderBy.Add("afirstname");
                                wasInUseOrderBy.Add("-afirstname");
                                break;
                            case "-afirstname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Author.FirstName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Author.FirstName);
                                }
                                wasInUseOrderBy.Add("afirstname");
                                wasInUseOrderBy.Add("-afirstname");
                                break;
                            case "alastname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Author.LastName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Author.LastName);
                                }
                                wasInUseOrderBy.Add("alastname");
                                wasInUseOrderBy.Add("-alastname");
                                break;
                            case "-alastname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Author.LastName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Author.LastName);
                                }
                                wasInUseOrderBy.Add("alastname");
                                wasInUseOrderBy.Add("-alastname");
                                break;
                            case "accountryname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Author.Country.CountryName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Author.Country.CountryName);
                                }
                                wasInUseOrderBy.Add("accountryname");
                                wasInUseOrderBy.Add("-accountryname");
                                break;
                            case "-accountryname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Author.Country.CountryName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Author.Country.CountryName);
                                }
                                wasInUseOrderBy.Add("accountryname");
                                wasInUseOrderBy.Add("-accountryname");
                                break;
                            case "ggenrename" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Genre.GenreName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Genre.GenreName);
                                }
                                wasInUseOrderBy.Add("ggenrename");
                                wasInUseOrderBy.Add("-ggenrename");
                                break;
                            case "-ggenrename" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Genre.GenreName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Genre.GenreName);
                                }
                                wasInUseOrderBy.Add("ggenrename");
                                wasInUseOrderBy.Add("-ggenrename");
                                break;
                            case "ddialectname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Dialect.DialectName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Dialect.DialectName);
                                }
                                wasInUseOrderBy.Add("ddialectname");
                                wasInUseOrderBy.Add("-ddialectname");
                                break;
                            case "-ddialectname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Dialect.DialectName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Dialect.DialectName);
                                }
                                wasInUseOrderBy.Add("ddialectname");
                                wasInUseOrderBy.Add("-ddialectname");
                                break;
                            case "dccountryname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Dialect.Country.CountryName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Dialect.Country.CountryName);
                                }
                                wasInUseOrderBy.Add("dccountryname");
                                wasInUseOrderBy.Add("-dccountryname");
                                break;
                            case "-dccountryname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Dialect.Country.CountryName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Dialect.Country.CountryName);
                                }
                                wasInUseOrderBy.Add("dccountryname");
                                wasInUseOrderBy.Add("-dccountryname");
                                break;
                                default:
                                    break;
                        }
                    }
                }
                if(isFirstTime) {                
                    orderedQuery = query.OrderBy(p => p.ManuscriptId);
                } // totals pageCount currentPageSize
                LitManuscriptViewPage resultObject = new LitManuscriptViewPage() {
                    page = (currentPage > 0) ? (currentPage-1) : currentPage,
                    pagesize = currentPageSize,
                    pagecount = pageCount,
                    total = totals
                };
                resultObject.items = orderedQuery.Skip((currentPage - 1) * currentPageSize).Take(currentPageSize).Select(itm => new LitManuscriptView() {
                            ManuscriptId = itm.ManuscriptId,
                            ManuscriptTitle = itm.ManuscriptTitle,
                            CompletionDate = itm.CompletionDate,
                            BeginningDate = itm.BeginningDate,
                            AuthorIdRef = itm.AuthorIdRef,
                            GenreIdRef = itm.GenreIdRef,
                            DialectIdRef = itm.DialectIdRef,
                            AFirstName = itm.Author.FirstName,
                            ALastName = itm.Author.LastName,
                            ABirthDate = itm.Author.BirthDate,
                            ACCountryName = itm.Author.Country.CountryName,
                            GGenreName = itm.Genre.GenreName,
                            DDialectName = itm.Dialect.DialectName,
                            DCCountryName = itm.Dialect.Country.CountryName
                            }).ToList();
                return Ok(resultObject);
        } // the end of GetWithFilter()-method

        [HttpGet]
        [Route("getone")]
        [ResponseType(typeof(LitManuscriptView))]
        public IHttpActionResult getone([FromUri] System.Int32 manuscriptId
                )
        {
            LitManuscriptView result = db.LitManuscriptDbSet
                    .Where(p => p.ManuscriptId == manuscriptId)
                    .Select(itm => new LitManuscriptView() {
                            ManuscriptId = itm.ManuscriptId,
                            ManuscriptTitle = itm.ManuscriptTitle,
                            CompletionDate = itm.CompletionDate,
                            BeginningDate = itm.BeginningDate,
                            AuthorIdRef = itm.AuthorIdRef,
                            GenreIdRef = itm.GenreIdRef,
                            DialectIdRef = itm.DialectIdRef,
                            AFirstName = itm.Author.FirstName,
                            ALastName = itm.Author.LastName,
                            ABirthDate = itm.Author.BirthDate,
                            ACCountryName = itm.Author.Country.CountryName,
                            GGenreName = itm.Genre.GenreName,
                            DDialectName = itm.Dialect.DialectName,
                            DCCountryName = itm.Dialect.Country.CountryName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        } // the end of public GetOne()-method

        [HttpPut]
        [ResponseType(typeof(LitManuscriptView))]
        [Route("updateone")]
        public IHttpActionResult updateone([FromBody] LitManuscriptView viewToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            LitManuscript resultEntity = db.LitManuscriptDbSet
                    .Where(p => p.ManuscriptId == viewToUpdate.ManuscriptId)
                    .FirstOrDefault();
            if(resultEntity == null) {
                return NotFound();
            }

            resultEntity.ManuscriptTitle =  viewToUpdate.ManuscriptTitle;
            resultEntity.CompletionDate =  viewToUpdate.CompletionDate;
            resultEntity.BeginningDate =  viewToUpdate.BeginningDate;
            resultEntity.AuthorIdRef =  viewToUpdate.AuthorIdRef;
            resultEntity.GenreIdRef =  viewToUpdate.GenreIdRef;
            resultEntity.DialectIdRef =  viewToUpdate.DialectIdRef;
            db.Entry(resultEntity).State = EntityState.Modified;
            db.SaveChanges();
            LitManuscriptView result = db.LitManuscriptDbSet
                    .Where(p => p.ManuscriptId == viewToUpdate.ManuscriptId)
                    .Select(itm => new LitManuscriptView() {
                            ManuscriptId = itm.ManuscriptId,
                            ManuscriptTitle = itm.ManuscriptTitle,
                            CompletionDate = itm.CompletionDate,
                            BeginningDate = itm.BeginningDate,
                            AuthorIdRef = itm.AuthorIdRef,
                            GenreIdRef = itm.GenreIdRef,
                            DialectIdRef = itm.DialectIdRef,
                            AFirstName = itm.Author.FirstName,
                            ALastName = itm.Author.LastName,
                            ABirthDate = itm.Author.BirthDate,
                            ACCountryName = itm.Author.Country.CountryName,
                            GGenreName = itm.Genre.GenreName,
                            DDialectName = itm.Dialect.DialectName,
                            DCCountryName = itm.Dialect.Country.CountryName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [ResponseType(typeof(LitManuscriptView))]
        [Route("addone")]
        public IHttpActionResult addone([FromBody] LitManuscriptView viewToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            LitManuscript entityToAdd = new LitManuscript();
            entityToAdd.ManuscriptId =  viewToAdd.ManuscriptId;
            entityToAdd.ManuscriptTitle =  viewToAdd.ManuscriptTitle;
            entityToAdd.CompletionDate =  viewToAdd.CompletionDate;
            entityToAdd.BeginningDate =  viewToAdd.BeginningDate;
            entityToAdd.AuthorIdRef =  viewToAdd.AuthorIdRef;
            entityToAdd.GenreIdRef =  viewToAdd.GenreIdRef;
            entityToAdd.DialectIdRef =  viewToAdd.DialectIdRef;
            db.LitManuscriptDbSet.Add(entityToAdd);
            db.SaveChanges();

            LitManuscriptView result = db.LitManuscriptDbSet
                    .Where(p => p.ManuscriptId == entityToAdd.ManuscriptId)
                    .Select(itm => new LitManuscriptView() {
                            ManuscriptId = itm.ManuscriptId,
                            ManuscriptTitle = itm.ManuscriptTitle,
                            CompletionDate = itm.CompletionDate,
                            BeginningDate = itm.BeginningDate,
                            AuthorIdRef = itm.AuthorIdRef,
                            GenreIdRef = itm.GenreIdRef,
                            DialectIdRef = itm.DialectIdRef,
                            AFirstName = itm.Author.FirstName,
                            ALastName = itm.Author.LastName,
                            ABirthDate = itm.Author.BirthDate,
                            ACCountryName = itm.Author.Country.CountryName,
                            GGenreName = itm.Genre.GenreName,
                            DDialectName = itm.Dialect.DialectName,
                            DCCountryName = itm.Dialect.Country.CountryName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpDelete]
        [ResponseType(typeof(LitManuscriptView))]
        [Route("deleteone")]
        public IHttpActionResult deleteone([FromUri] System.Int32 manuscriptId
                )
        {

                LitManuscriptView result = db.LitManuscriptDbSet
                    .Where(p => p.ManuscriptId == manuscriptId)
                    .Select(itm => new LitManuscriptView() {
                            ManuscriptId = itm.ManuscriptId,
                            ManuscriptTitle = itm.ManuscriptTitle,
                            CompletionDate = itm.CompletionDate,
                            BeginningDate = itm.BeginningDate,
                            AuthorIdRef = itm.AuthorIdRef,
                            GenreIdRef = itm.GenreIdRef,
                            DialectIdRef = itm.DialectIdRef,
                            AFirstName = itm.Author.FirstName,
                            ALastName = itm.Author.LastName,
                            ABirthDate = itm.Author.BirthDate,
                            ACCountryName = itm.Author.Country.CountryName,
                            GGenreName = itm.Genre.GenreName,
                            DDialectName = itm.Dialect.DialectName,
                            DCCountryName = itm.Dialect.Country.CountryName
                    }).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }

                LitManuscript entityToDelete = db.LitManuscriptDbSet
                    .Where(p => p.ManuscriptId == result.ManuscriptId)
                    .FirstOrDefault();
                if (entityToDelete == null) {
                    return Ok(result);
                }
                db.LitManuscriptDbSet.Remove(entityToDelete);
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

