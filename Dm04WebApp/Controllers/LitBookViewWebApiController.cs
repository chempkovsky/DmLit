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

    [RoutePrefix("litbookviewwebapi")]
    public class LitBookViewWebApiController: ApiController
    {
        private int defaultPageSize = 50;
        private int minPageSize = 5;
        private int maxPageSize = 150;
        private LitDbContext db = new LitDbContext();
        [HttpGet]
        [Route("getall")]
        public IQueryable<LitBookView> getall()
        {
            return db.LitBookDbSet
                    .Select(itm => new LitBookView() {
                            BookId = itm.BookId,
                            BookTitle = itm.BookTitle,
                            PublicationDate = itm.PublicationDate,
                            Price = itm.Price,
                            PublisherIdRef = itm.PublisherIdRef,
                            ManuscriptIdRef = itm.ManuscriptIdRef,
                            EditionIdRef = itm.EditionIdRef,
                            PPublisherName = itm.Publisher.PublisherName,
                            PCCountryName = itm.Publisher.Country.CountryName,
                            MManuscriptTitle = itm.Manuscript.ManuscriptTitle,
                            MCompletionDate = itm.Manuscript.CompletionDate,
                            MAFirstName = itm.Manuscript.Author.FirstName,
                            MALastName = itm.Manuscript.Author.LastName,
                            MABirthDate = itm.Manuscript.Author.BirthDate,
                            MACCountryName = itm.Manuscript.Author.Country.CountryName,
                            MGGenreName = itm.Manuscript.Genre.GenreName,
                            MDDialectName = itm.Manuscript.Dialect.DialectName,
                            MDCCountryName = itm.Manuscript.Dialect.Country.CountryName,
                            EEditionName = itm.Edition.EditionName
                            });

        } // the end of Get()-method


        [HttpGet]
        [Route("getwithfilter")]
        [ResponseType(typeof(LitBookViewPage))]
        public IHttpActionResult getwithfilter([FromUri] System.Int32?[] bookId 
                  , [FromUri] string[] bookIdOprtr 
                , [FromUri] System.String[] bookTitle 
                  , [FromUri] string[] bookTitleOprtr 
                , [FromUri] System.DateTime?[] publicationDate 
                  , [FromUri] string[] publicationDateOprtr 
                , [FromUri] System.Double?[] price 
                  , [FromUri] string[] priceOprtr 
                , [FromUri] System.String[] pPublisherName 
                  , [FromUri] string[] pPublisherNameOprtr 
                , [FromUri] System.String[] pCCountryName 
                  , [FromUri] string[] pCCountryNameOprtr 
                , [FromUri] System.String[] mManuscriptTitle 
                  , [FromUri] string[] mManuscriptTitleOprtr 
                , [FromUri] System.DateTime?[] mCompletionDate 
                  , [FromUri] string[] mCompletionDateOprtr 
                , [FromUri] System.String[] mAFirstName 
                  , [FromUri] string[] mAFirstNameOprtr 
                , [FromUri] System.String[] mALastName 
                  , [FromUri] string[] mALastNameOprtr 
                , [FromUri] System.DateTime?[] mABirthDate 
                  , [FromUri] string[] mABirthDateOprtr 
                , [FromUri] System.String[] mACCountryName 
                  , [FromUri] string[] mACCountryNameOprtr 
                , [FromUri] System.String[] mGGenreName 
                  , [FromUri] string[] mGGenreNameOprtr 
                , [FromUri] System.String[] mDDialectName 
                  , [FromUri] string[] mDDialectNameOprtr 
                , [FromUri] System.String[] mDCCountryName 
                  , [FromUri] string[] mDCCountryNameOprtr 
                , [FromUri] System.String[] eEditionName 
                  , [FromUri] string[] eEditionNameOprtr 
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
            IQueryable<LitBook> query = 
                db.LitBookDbSet;
            
            if(bookId != null) {
                if(bookId.Length > 0) {
                    int filterCnt = bookId.Length;
                    int operatorCnt = 0;
                    if(bookIdOprtr != null) {
                        operatorCnt = bookIdOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.Int32 > filterLst = new List<System.Int32 >();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(bookId[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( bookIdOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(bookIdOprtr[i])) {
                                    currOprtr = bookIdOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(bookId[i].Value);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                   // 
                   // System.Int32[] filter = bookId.Where(i => i.HasValue).Select(i => i.Value).ToArray();
                   //
                   System.Int32[] filter = filterLst.ToArray();
                    if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.BookId));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Int32 aflt = bookId[ fltItm.Value ].Value;
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.BookId >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.BookId <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.BookId != aflt );
                                break;
                        }
                    }

                }
            }
            if(bookTitle != null) {
                if(bookTitle.Length > 0) {
                    int filterCnt = bookTitle.Length;
                    int operatorCnt = 0;
                    if(bookTitleOprtr != null) {
                        operatorCnt = bookTitleOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(bookTitle[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( bookTitleOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(bookTitleOprtr[i])) {
                                    currOprtr = bookTitleOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(bookTitle[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = bookTitle.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = bookTitle.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.BookTitle == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.BookTitle == null) ||
                                            (p.BookTitle.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.BookTitle.Contains(aflt0))
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
                                            (p.BookTitle == null) ||
                                            (p.BookTitle.Contains(aflt0)) ||
                                            (p.BookTitle.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.BookTitle.Contains(aflt0)) ||
                                            (p.BookTitle.Contains(aflt1))
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
                                            (p.BookTitle == null) ||
                                            (p.BookTitle.Contains(aflt0)) ||
                                            (p.BookTitle.Contains(aflt1)) ||
                                            (p.BookTitle.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.BookTitle.Contains(aflt0)) ||
                                            (p.BookTitle.Contains(aflt1)) ||
                                            (p.BookTitle.Contains(aflt2))
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
                                            (p.BookTitle == null) ||
                                            (p.BookTitle.Contains(aflt0)) ||
                                            (p.BookTitle.Contains(aflt1)) ||
                                            (p.BookTitle.Contains(aflt2)) ||
                                            (p.BookTitle.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.BookTitle.Contains(aflt0)) ||
                                            (p.BookTitle.Contains(aflt1)) ||
                                            (p.BookTitle.Contains(aflt2)) ||
                                            (p.BookTitle.Contains(aflt3))
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
                                            (p.BookTitle == null) ||
                                            (p.BookTitle.Contains(aflt0)) ||
                                            (p.BookTitle.Contains(aflt1)) ||
                                            (p.BookTitle.Contains(aflt2)) ||
                                            (p.BookTitle.Contains(aflt3)) ||
                                            (p.BookTitle.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.BookTitle.Contains(aflt0)) ||
                                            (p.BookTitle.Contains(aflt1)) ||
                                            (p.BookTitle.Contains(aflt2)) ||
                                            (p.BookTitle.Contains(aflt3)) ||
                                            (p.BookTitle.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = bookTitle[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.BookTitle.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.BookTitle.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.BookTitle.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(publicationDate != null) {
                if(publicationDate.Length > 0) {
                    int filterCnt = publicationDate.Length;
                    int operatorCnt = 0;
                    if(publicationDateOprtr != null) {
                        operatorCnt = publicationDateOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.DateTime > filterLst = new List<System.DateTime >();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(publicationDate[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( publicationDateOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(publicationDateOprtr[i])) {
                                    currOprtr = publicationDateOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(publicationDate[i].Value);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                   // 
                   // System.DateTime[] filter = publicationDate.Where(i => i.HasValue).Select(i => i.Value).ToArray();
                   //
                   System.DateTime[] filter = filterLst.ToArray();
                    if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.PublicationDate));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.DateTime aflt = publicationDate[ fltItm.Value ].Value;
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.PublicationDate >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.PublicationDate <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.PublicationDate != aflt );
                                break;
                        }
                    }

                }
            }
            if(price != null) {
                if(price.Length > 0) {
                    int filterCnt = price.Length;
                    int operatorCnt = 0;
                    if(priceOprtr != null) {
                        operatorCnt = priceOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.Double > filterLst = new List<System.Double >();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(price[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( priceOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(priceOprtr[i])) {
                                    currOprtr = priceOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(price[i].Value);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                   // 
                   // System.Double[] filter = price.Where(i => i.HasValue).Select(i => i.Value).ToArray();
                   //
                   System.Double[] filter = filterLst.ToArray();
                    if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.Price));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Double aflt = price[ fltItm.Value ].Value;
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Price >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.Price <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.Price != aflt );
                                break;
                        }
                    }

                }
            }
            if(pPublisherName != null) {
                if(pPublisherName.Length > 0) {
                    int filterCnt = pPublisherName.Length;
                    int operatorCnt = 0;
                    if(pPublisherNameOprtr != null) {
                        operatorCnt = pPublisherNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(pPublisherName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( pPublisherNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(pPublisherNameOprtr[i])) {
                                    currOprtr = pPublisherNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(pPublisherName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = pPublisherName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = pPublisherName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Publisher.PublisherName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Publisher.PublisherName == null) ||
                                            (p.Publisher.PublisherName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Publisher.PublisherName.Contains(aflt0))
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
                                            (p.Publisher.PublisherName == null) ||
                                            (p.Publisher.PublisherName.Contains(aflt0)) ||
                                            (p.Publisher.PublisherName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Publisher.PublisherName.Contains(aflt0)) ||
                                            (p.Publisher.PublisherName.Contains(aflt1))
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
                                            (p.Publisher.PublisherName == null) ||
                                            (p.Publisher.PublisherName.Contains(aflt0)) ||
                                            (p.Publisher.PublisherName.Contains(aflt1)) ||
                                            (p.Publisher.PublisherName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Publisher.PublisherName.Contains(aflt0)) ||
                                            (p.Publisher.PublisherName.Contains(aflt1)) ||
                                            (p.Publisher.PublisherName.Contains(aflt2))
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
                                            (p.Publisher.PublisherName == null) ||
                                            (p.Publisher.PublisherName.Contains(aflt0)) ||
                                            (p.Publisher.PublisherName.Contains(aflt1)) ||
                                            (p.Publisher.PublisherName.Contains(aflt2)) ||
                                            (p.Publisher.PublisherName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Publisher.PublisherName.Contains(aflt0)) ||
                                            (p.Publisher.PublisherName.Contains(aflt1)) ||
                                            (p.Publisher.PublisherName.Contains(aflt2)) ||
                                            (p.Publisher.PublisherName.Contains(aflt3))
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
                                            (p.Publisher.PublisherName == null) ||
                                            (p.Publisher.PublisherName.Contains(aflt0)) ||
                                            (p.Publisher.PublisherName.Contains(aflt1)) ||
                                            (p.Publisher.PublisherName.Contains(aflt2)) ||
                                            (p.Publisher.PublisherName.Contains(aflt3)) ||
                                            (p.Publisher.PublisherName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Publisher.PublisherName.Contains(aflt0)) ||
                                            (p.Publisher.PublisherName.Contains(aflt1)) ||
                                            (p.Publisher.PublisherName.Contains(aflt2)) ||
                                            (p.Publisher.PublisherName.Contains(aflt3)) ||
                                            (p.Publisher.PublisherName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = pPublisherName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Publisher.PublisherName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Publisher.PublisherName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Publisher.PublisherName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(pCCountryName != null) {
                if(pCCountryName.Length > 0) {
                    int filterCnt = pCCountryName.Length;
                    int operatorCnt = 0;
                    if(pCCountryNameOprtr != null) {
                        operatorCnt = pCCountryNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(pCCountryName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( pCCountryNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(pCCountryNameOprtr[i])) {
                                    currOprtr = pCCountryNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(pCCountryName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = pCCountryName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = pCCountryName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Publisher.Country.CountryName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Publisher.Country.CountryName == null) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Publisher.Country.CountryName.Contains(aflt0))
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
                                            (p.Publisher.Country.CountryName == null) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt0)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Publisher.Country.CountryName.Contains(aflt0)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt1))
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
                                            (p.Publisher.Country.CountryName == null) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt0)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt1)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Publisher.Country.CountryName.Contains(aflt0)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt1)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt2))
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
                                            (p.Publisher.Country.CountryName == null) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt0)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt1)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt2)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Publisher.Country.CountryName.Contains(aflt0)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt1)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt2)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt3))
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
                                            (p.Publisher.Country.CountryName == null) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt0)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt1)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt2)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt3)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Publisher.Country.CountryName.Contains(aflt0)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt1)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt2)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt3)) ||
                                            (p.Publisher.Country.CountryName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = pCCountryName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Publisher.Country.CountryName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Publisher.Country.CountryName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Publisher.Country.CountryName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(mManuscriptTitle != null) {
                if(mManuscriptTitle.Length > 0) {
                    int filterCnt = mManuscriptTitle.Length;
                    int operatorCnt = 0;
                    if(mManuscriptTitleOprtr != null) {
                        operatorCnt = mManuscriptTitleOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(mManuscriptTitle[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( mManuscriptTitleOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(mManuscriptTitleOprtr[i])) {
                                    currOprtr = mManuscriptTitleOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(mManuscriptTitle[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = mManuscriptTitle.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = mManuscriptTitle.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Manuscript.ManuscriptTitle == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Manuscript.ManuscriptTitle == null) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt0))
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
                                            (p.Manuscript.ManuscriptTitle == null) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt0)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt0)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt1))
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
                                            (p.Manuscript.ManuscriptTitle == null) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt0)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt1)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt0)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt1)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt2))
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
                                            (p.Manuscript.ManuscriptTitle == null) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt0)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt1)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt2)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt0)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt1)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt2)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt3))
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
                                            (p.Manuscript.ManuscriptTitle == null) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt0)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt1)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt2)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt3)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt0)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt1)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt2)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt3)) ||
                                            (p.Manuscript.ManuscriptTitle.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = mManuscriptTitle[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Manuscript.ManuscriptTitle.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Manuscript.ManuscriptTitle.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Manuscript.ManuscriptTitle.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(mCompletionDate != null) {
                if(mCompletionDate.Length > 0) {
                    int filterCnt = mCompletionDate.Length;
                    int operatorCnt = 0;
                    if(mCompletionDateOprtr != null) {
                        operatorCnt = mCompletionDateOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.DateTime > filterLst = new List<System.DateTime >();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(mCompletionDate[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( mCompletionDateOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(mCompletionDateOprtr[i])) {
                                    currOprtr = mCompletionDateOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(mCompletionDate[i].Value);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                   // 
                   // System.DateTime[] filter = mCompletionDate.Where(i => i.HasValue).Select(i => i.Value).ToArray();
                   //
                   System.DateTime[] filter = filterLst.ToArray();
                    if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.Manuscript.CompletionDate));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.DateTime aflt = mCompletionDate[ fltItm.Value ].Value;
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Manuscript.CompletionDate >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.Manuscript.CompletionDate <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.Manuscript.CompletionDate != aflt );
                                break;
                        }
                    }

                }
            }
            if(mAFirstName != null) {
                if(mAFirstName.Length > 0) {
                    int filterCnt = mAFirstName.Length;
                    int operatorCnt = 0;
                    if(mAFirstNameOprtr != null) {
                        operatorCnt = mAFirstNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(mAFirstName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( mAFirstNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(mAFirstNameOprtr[i])) {
                                    currOprtr = mAFirstNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(mAFirstName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = mAFirstName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = mAFirstName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Manuscript.Author.FirstName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.FirstName == null) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.FirstName.Contains(aflt0))
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
                                            (p.Manuscript.Author.FirstName == null) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.FirstName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt1))
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
                                            (p.Manuscript.Author.FirstName == null) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.FirstName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt2))
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
                                            (p.Manuscript.Author.FirstName == null) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt2)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.FirstName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt2)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt3))
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
                                            (p.Manuscript.Author.FirstName == null) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt2)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt3)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.FirstName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt2)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt3)) ||
                                            (p.Manuscript.Author.FirstName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = mAFirstName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Manuscript.Author.FirstName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Manuscript.Author.FirstName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Manuscript.Author.FirstName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(mALastName != null) {
                if(mALastName.Length > 0) {
                    int filterCnt = mALastName.Length;
                    int operatorCnt = 0;
                    if(mALastNameOprtr != null) {
                        operatorCnt = mALastNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(mALastName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( mALastNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(mALastNameOprtr[i])) {
                                    currOprtr = mALastNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(mALastName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = mALastName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = mALastName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Manuscript.Author.LastName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.LastName == null) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.LastName.Contains(aflt0))
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
                                            (p.Manuscript.Author.LastName == null) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.LastName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt1))
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
                                            (p.Manuscript.Author.LastName == null) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.LastName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt2))
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
                                            (p.Manuscript.Author.LastName == null) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt2)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.LastName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt2)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt3))
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
                                            (p.Manuscript.Author.LastName == null) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt2)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt3)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.LastName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt2)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt3)) ||
                                            (p.Manuscript.Author.LastName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = mALastName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Manuscript.Author.LastName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Manuscript.Author.LastName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Manuscript.Author.LastName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(mABirthDate != null) {
                if(mABirthDate.Length > 0) {
                    int filterCnt = mABirthDate.Length;
                    int operatorCnt = 0;
                    if(mABirthDateOprtr != null) {
                        operatorCnt = mABirthDateOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.DateTime ?> filterLst = new List<System.DateTime ?>();
                    for(int i = 0; i < filterCnt; i++) {
                        if( !(mABirthDate[i].HasValue) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( mABirthDateOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(mABirthDateOprtr[i])) {
                                    currOprtr = mABirthDateOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(mABirthDate[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }
                    //
                    // System.DateTime ?[] filter = mABirthDate.Where(i => i.HasValue).Select(i => i).ToArray();
                    //
                    System.DateTime ?[] filter = filterLst.ToArray();
                    if ( (filter.Length + filterOprtLst.Count) != filterCnt) {
                        if (filter.Length > 0) {
                            query = query.Where(p => (filter.Contains(p.Manuscript.Author.BirthDate)) || (p.Manuscript.Author.BirthDate == null));
                        } else {
                            query = query.Where(p => (p.Manuscript.Author.BirthDate == null) );
                        }
                    } else if (filter.Length > 0) {
                        query = query.Where(p => filter.Contains(p.Manuscript.Author.BirthDate));
                    }
                    foreach(var fltItm in filterOprtLst) {
                        System.Nullable<System.DateTime> aflt = mABirthDate[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Manuscript.Author.BirthDate >= aflt );
                                break;
                            case "lt":
                                query = query.Where(p => p.Manuscript.Author.BirthDate <= aflt );
                                break;
                            case "ne":
                                query = query.Where(p => p.Manuscript.Author.BirthDate != aflt );
                                break;
                        }
                    }

                }
            }
            if(mACCountryName != null) {
                if(mACCountryName.Length > 0) {
                    int filterCnt = mACCountryName.Length;
                    int operatorCnt = 0;
                    if(mACCountryNameOprtr != null) {
                        operatorCnt = mACCountryNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(mACCountryName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( mACCountryNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(mACCountryNameOprtr[i])) {
                                    currOprtr = mACCountryNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(mACCountryName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = mACCountryName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = mACCountryName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Manuscript.Author.Country.CountryName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.Country.CountryName == null) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt0))
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
                                            (p.Manuscript.Author.Country.CountryName == null) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt1))
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
                                            (p.Manuscript.Author.Country.CountryName == null) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt2))
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
                                            (p.Manuscript.Author.Country.CountryName == null) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt2)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt2)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt3))
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
                                            (p.Manuscript.Author.Country.CountryName == null) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt2)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt3)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt0)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt1)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt2)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt3)) ||
                                            (p.Manuscript.Author.Country.CountryName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = mACCountryName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Manuscript.Author.Country.CountryName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Manuscript.Author.Country.CountryName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Manuscript.Author.Country.CountryName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(mGGenreName != null) {
                if(mGGenreName.Length > 0) {
                    int filterCnt = mGGenreName.Length;
                    int operatorCnt = 0;
                    if(mGGenreNameOprtr != null) {
                        operatorCnt = mGGenreNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(mGGenreName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( mGGenreNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(mGGenreNameOprtr[i])) {
                                    currOprtr = mGGenreNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(mGGenreName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = mGGenreName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = mGGenreName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Manuscript.Genre.GenreName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Manuscript.Genre.GenreName == null) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Genre.GenreName.Contains(aflt0))
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
                                            (p.Manuscript.Genre.GenreName == null) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt0)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Genre.GenreName.Contains(aflt0)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt1))
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
                                            (p.Manuscript.Genre.GenreName == null) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt0)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt1)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Genre.GenreName.Contains(aflt0)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt1)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt2))
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
                                            (p.Manuscript.Genre.GenreName == null) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt0)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt1)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt2)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Genre.GenreName.Contains(aflt0)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt1)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt2)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt3))
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
                                            (p.Manuscript.Genre.GenreName == null) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt0)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt1)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt2)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt3)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Genre.GenreName.Contains(aflt0)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt1)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt2)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt3)) ||
                                            (p.Manuscript.Genre.GenreName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = mGGenreName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Manuscript.Genre.GenreName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Manuscript.Genre.GenreName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Manuscript.Genre.GenreName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(mDDialectName != null) {
                if(mDDialectName.Length > 0) {
                    int filterCnt = mDDialectName.Length;
                    int operatorCnt = 0;
                    if(mDDialectNameOprtr != null) {
                        operatorCnt = mDDialectNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(mDDialectName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( mDDialectNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(mDDialectNameOprtr[i])) {
                                    currOprtr = mDDialectNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(mDDialectName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = mDDialectName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = mDDialectName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Manuscript.Dialect.DialectName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Manuscript.Dialect.DialectName == null) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt0))
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
                                            (p.Manuscript.Dialect.DialectName == null) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt0)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt0)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt1))
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
                                            (p.Manuscript.Dialect.DialectName == null) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt0)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt1)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt0)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt1)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt2))
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
                                            (p.Manuscript.Dialect.DialectName == null) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt0)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt1)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt2)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt0)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt1)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt2)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt3))
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
                                            (p.Manuscript.Dialect.DialectName == null) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt0)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt1)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt2)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt3)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt0)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt1)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt2)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt3)) ||
                                            (p.Manuscript.Dialect.DialectName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = mDDialectName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Manuscript.Dialect.DialectName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Manuscript.Dialect.DialectName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Manuscript.Dialect.DialectName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(mDCCountryName != null) {
                if(mDCCountryName.Length > 0) {
                    int filterCnt = mDCCountryName.Length;
                    int operatorCnt = 0;
                    if(mDCCountryNameOprtr != null) {
                        operatorCnt = mDCCountryNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(mDCCountryName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( mDCCountryNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(mDCCountryNameOprtr[i])) {
                                    currOprtr = mDCCountryNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(mDCCountryName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = mDCCountryName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = mDCCountryName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Manuscript.Dialect.Country.CountryName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Manuscript.Dialect.Country.CountryName == null) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt0))
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
                                            (p.Manuscript.Dialect.Country.CountryName == null) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt0)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt0)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt1))
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
                                            (p.Manuscript.Dialect.Country.CountryName == null) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt0)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt1)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt0)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt1)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt2))
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
                                            (p.Manuscript.Dialect.Country.CountryName == null) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt0)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt1)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt2)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt0)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt1)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt2)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt3))
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
                                            (p.Manuscript.Dialect.Country.CountryName == null) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt0)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt1)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt2)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt3)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt0)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt1)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt2)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt3)) ||
                                            (p.Manuscript.Dialect.Country.CountryName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = mDCCountryName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Manuscript.Dialect.Country.CountryName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Manuscript.Dialect.Country.CountryName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Manuscript.Dialect.Country.CountryName.CompareTo(aflt) != 0 );
                                break;
                        }
                    }
                }
            }
            if(eEditionName != null) {
                if(eEditionName.Length > 0) {
                    int filterCnt = eEditionName.Length;
                    int operatorCnt = 0;
                    if(eEditionNameOprtr != null) {
                        operatorCnt = eEditionNameOprtr.Length;
                    }
                    List<KeyValuePair<String, int >> filterOprtLst = new List<KeyValuePair<String, int>>();
                    List<System.String> filterLst = new List<System.String>();
                    for(int i = 0; i < filterCnt; i++) {
                        if(  string.IsNullOrEmpty(eEditionName[i]) ) continue;
                        string currOprtr = EqualOperators[0];
                        if (i < operatorCnt) {
                            if( ! string.IsNullOrEmpty( eEditionNameOprtr[i] ) ) {
                                if (ExpectedOperators.Contains(eEditionNameOprtr[i])) {
                                    currOprtr = eEditionNameOprtr[i];
                                }
                            }
                        }
                        if (EqualOperators.Contains(currOprtr)) {
                            filterLst.Add(eEditionName[i]);
                        } else {
                            filterOprtLst.Add( new KeyValuePair<String, int>(currOprtr, i) );
                        }
                    }

                    // 
                    // System.String[] filter = eEditionName.Where(i => (!string.IsNullOrEmpty(i)) ).ToArray();
                    //
                    System.String[] filter = filterLst.ToArray();
                    bool hasNUllFilter = eEditionName.Length > (filterLst.Count + filterOprtLst.Count);
                    switch(filter.Length)
                    {
                        case 0:
                            if (hasNUllFilter) {
                                query = query.Where(p => p.Edition.EditionName == null);
                            }
                            break;
                        case 1:
                            {
                                string aflt0 = filter[0].Trim();
                                if (hasNUllFilter) {
                                    query = query.Where(p => (
                                            (p.Edition.EditionName == null) ||
                                            (p.Edition.EditionName.Contains(aflt0))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Edition.EditionName.Contains(aflt0))
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
                                            (p.Edition.EditionName == null) ||
                                            (p.Edition.EditionName.Contains(aflt0)) ||
                                            (p.Edition.EditionName.Contains(aflt1))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Edition.EditionName.Contains(aflt0)) ||
                                            (p.Edition.EditionName.Contains(aflt1))
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
                                            (p.Edition.EditionName == null) ||
                                            (p.Edition.EditionName.Contains(aflt0)) ||
                                            (p.Edition.EditionName.Contains(aflt1)) ||
                                            (p.Edition.EditionName.Contains(aflt2))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Edition.EditionName.Contains(aflt0)) ||
                                            (p.Edition.EditionName.Contains(aflt1)) ||
                                            (p.Edition.EditionName.Contains(aflt2))
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
                                            (p.Edition.EditionName == null) ||
                                            (p.Edition.EditionName.Contains(aflt0)) ||
                                            (p.Edition.EditionName.Contains(aflt1)) ||
                                            (p.Edition.EditionName.Contains(aflt2)) ||
                                            (p.Edition.EditionName.Contains(aflt3))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Edition.EditionName.Contains(aflt0)) ||
                                            (p.Edition.EditionName.Contains(aflt1)) ||
                                            (p.Edition.EditionName.Contains(aflt2)) ||
                                            (p.Edition.EditionName.Contains(aflt3))
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
                                            (p.Edition.EditionName == null) ||
                                            (p.Edition.EditionName.Contains(aflt0)) ||
                                            (p.Edition.EditionName.Contains(aflt1)) ||
                                            (p.Edition.EditionName.Contains(aflt2)) ||
                                            (p.Edition.EditionName.Contains(aflt3)) ||
                                            (p.Edition.EditionName.Contains(aflt4))
                                            ));
                                } else {
                                    query = query.Where(p => (
                                            (p.Edition.EditionName.Contains(aflt0)) ||
                                            (p.Edition.EditionName.Contains(aflt1)) ||
                                            (p.Edition.EditionName.Contains(aflt2)) ||
                                            (p.Edition.EditionName.Contains(aflt3)) ||
                                            (p.Edition.EditionName.Contains(aflt4))
                                            ));
                                }

                            }
                            break;
                    }
                    foreach(var fltItm in filterOprtLst) {
                        string aflt = eEditionName[ fltItm.Value ];
                        switch(fltItm.Key) {
                            case "gt":
                                query = query.Where(p => p.Edition.EditionName.CompareTo(aflt) >= 0 );
                                break;
                            case "lt":
                                query = query.Where(p => p.Edition.EditionName.CompareTo(aflt) <= 0 );
                                break;
                            case "ne":
                                query = query.Where(p => p.Edition.EditionName.CompareTo(aflt) != 0 );
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
                IOrderedQueryable<LitBook> orderedQuery = null;
                if(currentOrderBy != null) {
                    List<string> wasInUseOrderBy = new List<string>();
                    foreach(string propName in currentOrderBy) {
                        string lowerCaseStr = propName.ToLower();
                        if (wasInUseOrderBy.Contains(lowerCaseStr)) {
                            continue;
                        }
                        switch(lowerCaseStr) {
                            case "bookid" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.BookId);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.BookId);
                                }
                                wasInUseOrderBy.Add("bookid");
                                wasInUseOrderBy.Add("-bookid");
                                break;
                            case "-bookid" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.BookId);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.BookId);
                                }
                                wasInUseOrderBy.Add("bookid");
                                wasInUseOrderBy.Add("-bookid");
                                break;
                            case "booktitle" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.BookTitle);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.BookTitle);
                                }
                                wasInUseOrderBy.Add("booktitle");
                                wasInUseOrderBy.Add("-booktitle");
                                break;
                            case "-booktitle" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.BookTitle);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.BookTitle);
                                }
                                wasInUseOrderBy.Add("booktitle");
                                wasInUseOrderBy.Add("-booktitle");
                                break;
                            case "publicationdate" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.PublicationDate);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.PublicationDate);
                                }
                                wasInUseOrderBy.Add("publicationdate");
                                wasInUseOrderBy.Add("-publicationdate");
                                break;
                            case "-publicationdate" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.PublicationDate);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.PublicationDate);
                                }
                                wasInUseOrderBy.Add("publicationdate");
                                wasInUseOrderBy.Add("-publicationdate");
                                break;
                            case "price" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Price);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Price);
                                }
                                wasInUseOrderBy.Add("price");
                                wasInUseOrderBy.Add("-price");
                                break;
                            case "-price" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Price);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Price);
                                }
                                wasInUseOrderBy.Add("price");
                                wasInUseOrderBy.Add("-price");
                                break;
                            case "ppublishername" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Publisher.PublisherName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Publisher.PublisherName);
                                }
                                wasInUseOrderBy.Add("ppublishername");
                                wasInUseOrderBy.Add("-ppublishername");
                                break;
                            case "-ppublishername" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Publisher.PublisherName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Publisher.PublisherName);
                                }
                                wasInUseOrderBy.Add("ppublishername");
                                wasInUseOrderBy.Add("-ppublishername");
                                break;
                            case "pccountryname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Publisher.Country.CountryName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Publisher.Country.CountryName);
                                }
                                wasInUseOrderBy.Add("pccountryname");
                                wasInUseOrderBy.Add("-pccountryname");
                                break;
                            case "-pccountryname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Publisher.Country.CountryName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Publisher.Country.CountryName);
                                }
                                wasInUseOrderBy.Add("pccountryname");
                                wasInUseOrderBy.Add("-pccountryname");
                                break;
                            case "mmanuscripttitle" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Manuscript.ManuscriptTitle);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Manuscript.ManuscriptTitle);
                                }
                                wasInUseOrderBy.Add("mmanuscripttitle");
                                wasInUseOrderBy.Add("-mmanuscripttitle");
                                break;
                            case "-mmanuscripttitle" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Manuscript.ManuscriptTitle);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Manuscript.ManuscriptTitle);
                                }
                                wasInUseOrderBy.Add("mmanuscripttitle");
                                wasInUseOrderBy.Add("-mmanuscripttitle");
                                break;
                            case "mcompletiondate" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Manuscript.CompletionDate);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Manuscript.CompletionDate);
                                }
                                wasInUseOrderBy.Add("mcompletiondate");
                                wasInUseOrderBy.Add("-mcompletiondate");
                                break;
                            case "-mcompletiondate" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Manuscript.CompletionDate);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Manuscript.CompletionDate);
                                }
                                wasInUseOrderBy.Add("mcompletiondate");
                                wasInUseOrderBy.Add("-mcompletiondate");
                                break;
                            case "mafirstname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Manuscript.Author.FirstName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Manuscript.Author.FirstName);
                                }
                                wasInUseOrderBy.Add("mafirstname");
                                wasInUseOrderBy.Add("-mafirstname");
                                break;
                            case "-mafirstname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Manuscript.Author.FirstName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Manuscript.Author.FirstName);
                                }
                                wasInUseOrderBy.Add("mafirstname");
                                wasInUseOrderBy.Add("-mafirstname");
                                break;
                            case "malastname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Manuscript.Author.LastName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Manuscript.Author.LastName);
                                }
                                wasInUseOrderBy.Add("malastname");
                                wasInUseOrderBy.Add("-malastname");
                                break;
                            case "-malastname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Manuscript.Author.LastName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Manuscript.Author.LastName);
                                }
                                wasInUseOrderBy.Add("malastname");
                                wasInUseOrderBy.Add("-malastname");
                                break;
                            case "mabirthdate" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Manuscript.Author.BirthDate);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Manuscript.Author.BirthDate);
                                }
                                wasInUseOrderBy.Add("mabirthdate");
                                wasInUseOrderBy.Add("-mabirthdate");
                                break;
                            case "-mabirthdate" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Manuscript.Author.BirthDate);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Manuscript.Author.BirthDate);
                                }
                                wasInUseOrderBy.Add("mabirthdate");
                                wasInUseOrderBy.Add("-mabirthdate");
                                break;
                            case "maccountryname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Manuscript.Author.Country.CountryName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Manuscript.Author.Country.CountryName);
                                }
                                wasInUseOrderBy.Add("maccountryname");
                                wasInUseOrderBy.Add("-maccountryname");
                                break;
                            case "-maccountryname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Manuscript.Author.Country.CountryName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Manuscript.Author.Country.CountryName);
                                }
                                wasInUseOrderBy.Add("maccountryname");
                                wasInUseOrderBy.Add("-maccountryname");
                                break;
                            case "mggenrename" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Manuscript.Genre.GenreName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Manuscript.Genre.GenreName);
                                }
                                wasInUseOrderBy.Add("mggenrename");
                                wasInUseOrderBy.Add("-mggenrename");
                                break;
                            case "-mggenrename" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Manuscript.Genre.GenreName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Manuscript.Genre.GenreName);
                                }
                                wasInUseOrderBy.Add("mggenrename");
                                wasInUseOrderBy.Add("-mggenrename");
                                break;
                            case "mddialectname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Manuscript.Dialect.DialectName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Manuscript.Dialect.DialectName);
                                }
                                wasInUseOrderBy.Add("mddialectname");
                                wasInUseOrderBy.Add("-mddialectname");
                                break;
                            case "-mddialectname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Manuscript.Dialect.DialectName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Manuscript.Dialect.DialectName);
                                }
                                wasInUseOrderBy.Add("mddialectname");
                                wasInUseOrderBy.Add("-mddialectname");
                                break;
                            case "mdccountryname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Manuscript.Dialect.Country.CountryName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Manuscript.Dialect.Country.CountryName);
                                }
                                wasInUseOrderBy.Add("mdccountryname");
                                wasInUseOrderBy.Add("-mdccountryname");
                                break;
                            case "-mdccountryname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Manuscript.Dialect.Country.CountryName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Manuscript.Dialect.Country.CountryName);
                                }
                                wasInUseOrderBy.Add("mdccountryname");
                                wasInUseOrderBy.Add("-mdccountryname");
                                break;
                            case "eeditionname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderBy(p => p.Edition.EditionName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenBy(p => p.Edition.EditionName);
                                }
                                wasInUseOrderBy.Add("eeditionname");
                                wasInUseOrderBy.Add("-eeditionname");
                                break;
                            case "-eeditionname" :
                                if(isFirstTime) {
                                    orderedQuery = query.OrderByDescending(p => p.Edition.EditionName);
                                    isFirstTime = false;
                                } else {
                                    orderedQuery = orderedQuery.ThenByDescending(p => p.Edition.EditionName);
                                }
                                wasInUseOrderBy.Add("eeditionname");
                                wasInUseOrderBy.Add("-eeditionname");
                                break;
                                default:
                                    break;
                        }
                    }
                }
                if(isFirstTime) {                
                    orderedQuery = query.OrderBy(p => p.BookId);
                } // totals pageCount currentPageSize
                LitBookViewPage resultObject = new LitBookViewPage() {
                    page = (currentPage > 0) ? (currentPage-1) : currentPage,
                    pagesize = currentPageSize,
                    pagecount = pageCount,
                    total = totals
                };
                resultObject.items = orderedQuery.Skip((currentPage - 1) * currentPageSize).Take(currentPageSize).Select(itm => new LitBookView() {
                            BookId = itm.BookId,
                            BookTitle = itm.BookTitle,
                            PublicationDate = itm.PublicationDate,
                            Price = itm.Price,
                            PublisherIdRef = itm.PublisherIdRef,
                            ManuscriptIdRef = itm.ManuscriptIdRef,
                            EditionIdRef = itm.EditionIdRef,
                            PPublisherName = itm.Publisher.PublisherName,
                            PCCountryName = itm.Publisher.Country.CountryName,
                            MManuscriptTitle = itm.Manuscript.ManuscriptTitle,
                            MCompletionDate = itm.Manuscript.CompletionDate,
                            MAFirstName = itm.Manuscript.Author.FirstName,
                            MALastName = itm.Manuscript.Author.LastName,
                            MABirthDate = itm.Manuscript.Author.BirthDate,
                            MACCountryName = itm.Manuscript.Author.Country.CountryName,
                            MGGenreName = itm.Manuscript.Genre.GenreName,
                            MDDialectName = itm.Manuscript.Dialect.DialectName,
                            MDCCountryName = itm.Manuscript.Dialect.Country.CountryName,
                            EEditionName = itm.Edition.EditionName
                            }).ToList();
                return Ok(resultObject);
        } // the end of GetWithFilter()-method

        [HttpGet]
        [Route("getone")]
        [ResponseType(typeof(LitBookView))]
        public IHttpActionResult getone([FromUri] System.Int32 bookId
                )
        {
            LitBookView result = db.LitBookDbSet
                    .Where(p => p.BookId == bookId)
                    .Select(itm => new LitBookView() {
                            BookId = itm.BookId,
                            BookTitle = itm.BookTitle,
                            PublicationDate = itm.PublicationDate,
                            Price = itm.Price,
                            PublisherIdRef = itm.PublisherIdRef,
                            ManuscriptIdRef = itm.ManuscriptIdRef,
                            EditionIdRef = itm.EditionIdRef,
                            PPublisherName = itm.Publisher.PublisherName,
                            PCCountryName = itm.Publisher.Country.CountryName,
                            MManuscriptTitle = itm.Manuscript.ManuscriptTitle,
                            MCompletionDate = itm.Manuscript.CompletionDate,
                            MAFirstName = itm.Manuscript.Author.FirstName,
                            MALastName = itm.Manuscript.Author.LastName,
                            MABirthDate = itm.Manuscript.Author.BirthDate,
                            MACCountryName = itm.Manuscript.Author.Country.CountryName,
                            MGGenreName = itm.Manuscript.Genre.GenreName,
                            MDDialectName = itm.Manuscript.Dialect.DialectName,
                            MDCCountryName = itm.Manuscript.Dialect.Country.CountryName,
                            EEditionName = itm.Edition.EditionName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        } // the end of public GetOne()-method

        [HttpPut]
        [ResponseType(typeof(LitBookView))]
        [Route("updateone")]
        public IHttpActionResult updateone([FromBody] LitBookView viewToUpdate)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            LitBook resultEntity = db.LitBookDbSet
                    .Where(p => p.BookId == viewToUpdate.BookId)
                    .FirstOrDefault();
            if(resultEntity == null) {
                return NotFound();
            }

            resultEntity.BookTitle =  viewToUpdate.BookTitle;
            resultEntity.PublicationDate =  viewToUpdate.PublicationDate;
            resultEntity.Price =  viewToUpdate.Price;
            resultEntity.PublisherIdRef =  viewToUpdate.PublisherIdRef;
            resultEntity.ManuscriptIdRef =  viewToUpdate.ManuscriptIdRef;
            resultEntity.EditionIdRef =  viewToUpdate.EditionIdRef;
            db.Entry(resultEntity).State = EntityState.Modified;
            db.SaveChanges();
            LitBookView result = db.LitBookDbSet
                    .Where(p => p.BookId == viewToUpdate.BookId)
                    .Select(itm => new LitBookView() {
                            BookId = itm.BookId,
                            BookTitle = itm.BookTitle,
                            PublicationDate = itm.PublicationDate,
                            Price = itm.Price,
                            PublisherIdRef = itm.PublisherIdRef,
                            ManuscriptIdRef = itm.ManuscriptIdRef,
                            EditionIdRef = itm.EditionIdRef,
                            PPublisherName = itm.Publisher.PublisherName,
                            PCCountryName = itm.Publisher.Country.CountryName,
                            MManuscriptTitle = itm.Manuscript.ManuscriptTitle,
                            MCompletionDate = itm.Manuscript.CompletionDate,
                            MAFirstName = itm.Manuscript.Author.FirstName,
                            MALastName = itm.Manuscript.Author.LastName,
                            MABirthDate = itm.Manuscript.Author.BirthDate,
                            MACCountryName = itm.Manuscript.Author.Country.CountryName,
                            MGGenreName = itm.Manuscript.Genre.GenreName,
                            MDDialectName = itm.Manuscript.Dialect.DialectName,
                            MDCCountryName = itm.Manuscript.Dialect.Country.CountryName,
                            EEditionName = itm.Edition.EditionName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }

        [HttpPost]
        [ResponseType(typeof(LitBookView))]
        [Route("addone")]
        public IHttpActionResult addone([FromBody] LitBookView viewToAdd)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            LitBook entityToAdd = new LitBook();
            entityToAdd.BookId =  viewToAdd.BookId;
            entityToAdd.BookTitle =  viewToAdd.BookTitle;
            entityToAdd.PublicationDate =  viewToAdd.PublicationDate;
            entityToAdd.Price =  viewToAdd.Price;
            entityToAdd.PublisherIdRef =  viewToAdd.PublisherIdRef;
            entityToAdd.ManuscriptIdRef =  viewToAdd.ManuscriptIdRef;
            entityToAdd.EditionIdRef =  viewToAdd.EditionIdRef;
            db.LitBookDbSet.Add(entityToAdd);
            db.SaveChanges();

            LitBookView result = db.LitBookDbSet
                    .Where(p => p.BookId == entityToAdd.BookId)
                    .Select(itm => new LitBookView() {
                            BookId = itm.BookId,
                            BookTitle = itm.BookTitle,
                            PublicationDate = itm.PublicationDate,
                            Price = itm.Price,
                            PublisherIdRef = itm.PublisherIdRef,
                            ManuscriptIdRef = itm.ManuscriptIdRef,
                            EditionIdRef = itm.EditionIdRef,
                            PPublisherName = itm.Publisher.PublisherName,
                            PCCountryName = itm.Publisher.Country.CountryName,
                            MManuscriptTitle = itm.Manuscript.ManuscriptTitle,
                            MCompletionDate = itm.Manuscript.CompletionDate,
                            MAFirstName = itm.Manuscript.Author.FirstName,
                            MALastName = itm.Manuscript.Author.LastName,
                            MABirthDate = itm.Manuscript.Author.BirthDate,
                            MACCountryName = itm.Manuscript.Author.Country.CountryName,
                            MGGenreName = itm.Manuscript.Genre.GenreName,
                            MDDialectName = itm.Manuscript.Dialect.DialectName,
                            MDCCountryName = itm.Manuscript.Dialect.Country.CountryName,
                            EEditionName = itm.Edition.EditionName
                    }).FirstOrDefault();
            if (result == null)
            {
                return NotFound();
            }
            return Ok(result);
        }


        [HttpDelete]
        [ResponseType(typeof(LitBookView))]
        [Route("deleteone")]
        public IHttpActionResult deleteone([FromUri] System.Int32 bookId
                )
        {

                LitBookView result = db.LitBookDbSet
                    .Where(p => p.BookId == bookId)
                    .Select(itm => new LitBookView() {
                            BookId = itm.BookId,
                            BookTitle = itm.BookTitle,
                            PublicationDate = itm.PublicationDate,
                            Price = itm.Price,
                            PublisherIdRef = itm.PublisherIdRef,
                            ManuscriptIdRef = itm.ManuscriptIdRef,
                            EditionIdRef = itm.EditionIdRef,
                            PPublisherName = itm.Publisher.PublisherName,
                            PCCountryName = itm.Publisher.Country.CountryName,
                            MManuscriptTitle = itm.Manuscript.ManuscriptTitle,
                            MCompletionDate = itm.Manuscript.CompletionDate,
                            MAFirstName = itm.Manuscript.Author.FirstName,
                            MALastName = itm.Manuscript.Author.LastName,
                            MABirthDate = itm.Manuscript.Author.BirthDate,
                            MACCountryName = itm.Manuscript.Author.Country.CountryName,
                            MGGenreName = itm.Manuscript.Genre.GenreName,
                            MDDialectName = itm.Manuscript.Dialect.DialectName,
                            MDCCountryName = itm.Manuscript.Dialect.Country.CountryName,
                            EEditionName = itm.Edition.EditionName
                    }).FirstOrDefault();
                if (result == null)
                {
                    return NotFound();
                }

                LitBook entityToDelete = db.LitBookDbSet
                    .Where(p => p.BookId == result.BookId)
                    .FirstOrDefault();
                if (entityToDelete == null) {
                    return Ok(result);
                }
                db.LitBookDbSet.Remove(entityToDelete);
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

