
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ILitBookView } from './../../components/lit-book-view/interfaces/lit-book-view.interface';
import { ILitBookViewPage } from './../../components/lit-book-view/interfaces/lit-book-view-page.interface';
import { ILitBookViewFilter } from './../../components/lit-book-view/interfaces/lit-book-view-filter.interface';
import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


@Injectable({
  providedIn: 'root'
})
export class LitBookViewService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
       this.serviceUrl = this.appGlblSettings.getWebApiPrefix('LitBookView') + 'litbookviewwebapi';  
    }


    // 
    // HowTo:
    //
    // this.serviceRefInYourCode.getall().subscibe(value =>{
    //    // handling value of type ILitBookView[] 
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getall(): Observable<ILitBookView[]> {

        return this.http.get<ILitBookView[]>(this.serviceUrl+'/getall');
        //    .pipe(
        //        catchError(this.handleError('getall', []))
        //    );
    }



    // 
    // HowTo: flt is of type ILitBookViewFilter 
    //
    // this.serviceRefInYourCode.getwithfilter(flt).subscibe(value =>{
    //    // handling value of type ILitBookViewPage
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getwithfilter(filter: ILitBookViewFilter): Observable<ILitBookViewPage> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof filter === 'undefined')) {
            if (!(filter === null )) {
                if (!(typeof filter.bookId === 'undefined')) {
                    if ( Array.isArray(filter.bookId )) {
                        filter.bookId.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('bookId', value.toString());
                                    hasFilter = true;
                                } 
                            }
                        });
                    } // if ( Array.isArray(filter.bookId ))
                } // if (!(typeof filter.bookId === 'undefined'))
                if (!(typeof filter.bookTitle === 'undefined')) {
                    if ( Array.isArray(filter.bookTitle )) {
                        let hasNull: boolean = false;
                        filter.bookTitle.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('bookTitle', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('bookTitle', '');
                        }
                    } // if ( Array.isArray(filter.bookTitle ))
                } // if (!(typeof filter.bookTitle === 'undefined'))
                if (!(typeof filter.publicationDate === 'undefined')) {
                    if ( Array.isArray(filter.publicationDate )) {
                        filter.publicationDate.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('publicationDate', value.toString());
                                    hasFilter = true;
                                } 
                            }
                        });
                    } // if ( Array.isArray(filter.publicationDate ))
                } // if (!(typeof filter.publicationDate === 'undefined'))
                if (!(typeof filter.price === 'undefined')) {
                    if ( Array.isArray(filter.price )) {
                        filter.price.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('price', value.toString());
                                    hasFilter = true;
                                } 
                            }
                        });
                    } // if ( Array.isArray(filter.price ))
                } // if (!(typeof filter.price === 'undefined'))
                if (!(typeof filter.pPublisherName === 'undefined')) {
                    if ( Array.isArray(filter.pPublisherName )) {
                        let hasNull: boolean = false;
                        filter.pPublisherName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('pPublisherName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('pPublisherName', '');
                        }
                    } // if ( Array.isArray(filter.pPublisherName ))
                } // if (!(typeof filter.pPublisherName === 'undefined'))
                if (!(typeof filter.pCCountryName === 'undefined')) {
                    if ( Array.isArray(filter.pCCountryName )) {
                        let hasNull: boolean = false;
                        filter.pCCountryName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('pCCountryName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('pCCountryName', '');
                        }
                    } // if ( Array.isArray(filter.pCCountryName ))
                } // if (!(typeof filter.pCCountryName === 'undefined'))
                if (!(typeof filter.mManuscriptTitle === 'undefined')) {
                    if ( Array.isArray(filter.mManuscriptTitle )) {
                        let hasNull: boolean = false;
                        filter.mManuscriptTitle.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('mManuscriptTitle', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('mManuscriptTitle', '');
                        }
                    } // if ( Array.isArray(filter.mManuscriptTitle ))
                } // if (!(typeof filter.mManuscriptTitle === 'undefined'))
                if (!(typeof filter.mCompletionDate === 'undefined')) {
                    if ( Array.isArray(filter.mCompletionDate )) {
                        filter.mCompletionDate.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('mCompletionDate', value.toString());
                                    hasFilter = true;
                                } 
                            }
                        });
                    } // if ( Array.isArray(filter.mCompletionDate ))
                } // if (!(typeof filter.mCompletionDate === 'undefined'))
                if (!(typeof filter.mAFirstName === 'undefined')) {
                    if ( Array.isArray(filter.mAFirstName )) {
                        let hasNull: boolean = false;
                        filter.mAFirstName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('mAFirstName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('mAFirstName', '');
                        }
                    } // if ( Array.isArray(filter.mAFirstName ))
                } // if (!(typeof filter.mAFirstName === 'undefined'))
                if (!(typeof filter.mALastName === 'undefined')) {
                    if ( Array.isArray(filter.mALastName )) {
                        let hasNull: boolean = false;
                        filter.mALastName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('mALastName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('mALastName', '');
                        }
                    } // if ( Array.isArray(filter.mALastName ))
                } // if (!(typeof filter.mALastName === 'undefined'))
                if (!(typeof filter.mABirthDate === 'undefined')) {
                    if ( Array.isArray(filter.mABirthDate )) {
                        let hasNull: boolean = false;
                        filter.mABirthDate.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('mABirthDate', value.toString());
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('mABirthDate', '');
                        }
                    } // if ( Array.isArray(filter.mABirthDate ))
                } // if (!(typeof filter.mABirthDate === 'undefined'))
                if (!(typeof filter.mACCountryName === 'undefined')) {
                    if ( Array.isArray(filter.mACCountryName )) {
                        let hasNull: boolean = false;
                        filter.mACCountryName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('mACCountryName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('mACCountryName', '');
                        }
                    } // if ( Array.isArray(filter.mACCountryName ))
                } // if (!(typeof filter.mACCountryName === 'undefined'))
                if (!(typeof filter.mGGenreName === 'undefined')) {
                    if ( Array.isArray(filter.mGGenreName )) {
                        let hasNull: boolean = false;
                        filter.mGGenreName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('mGGenreName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('mGGenreName', '');
                        }
                    } // if ( Array.isArray(filter.mGGenreName ))
                } // if (!(typeof filter.mGGenreName === 'undefined'))
                if (!(typeof filter.mDDialectName === 'undefined')) {
                    if ( Array.isArray(filter.mDDialectName )) {
                        let hasNull: boolean = false;
                        filter.mDDialectName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('mDDialectName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('mDDialectName', '');
                        }
                    } // if ( Array.isArray(filter.mDDialectName ))
                } // if (!(typeof filter.mDDialectName === 'undefined'))
                if (!(typeof filter.mDCCountryName === 'undefined')) {
                    if ( Array.isArray(filter.mDCCountryName )) {
                        let hasNull: boolean = false;
                        filter.mDCCountryName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('mDCCountryName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('mDCCountryName', '');
                        }
                    } // if ( Array.isArray(filter.mDCCountryName ))
                } // if (!(typeof filter.mDCCountryName === 'undefined'))
                if (!(typeof filter.eEditionName === 'undefined')) {
                    if ( Array.isArray(filter.eEditionName )) {
                        let hasNull: boolean = false;
                        filter.eEditionName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('eEditionName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('eEditionName', '');
                        }
                    } // if ( Array.isArray(filter.eEditionName ))
                } // if (!(typeof filter.eEditionName === 'undefined'))


                if (!(typeof  filter.bookIdOprtr === 'undefined')) {
                    if (Array.isArray(filter.bookIdOprtr )) {
                        filter.bookIdOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('bookIdOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('bookIdOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.bookIdOprtr))
                } // if (!(typeof  filter.bookIdOprtr === 'undefined'))
                if (!(typeof  filter.bookTitleOprtr === 'undefined')) {
                    if (Array.isArray(filter.bookTitleOprtr )) {
                        filter.bookTitleOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('bookTitleOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('bookTitleOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.bookTitleOprtr))
                } // if (!(typeof  filter.bookTitleOprtr === 'undefined'))
                if (!(typeof  filter.publicationDateOprtr === 'undefined')) {
                    if (Array.isArray(filter.publicationDateOprtr )) {
                        filter.publicationDateOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('publicationDateOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('publicationDateOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.publicationDateOprtr))
                } // if (!(typeof  filter.publicationDateOprtr === 'undefined'))
                if (!(typeof  filter.priceOprtr === 'undefined')) {
                    if (Array.isArray(filter.priceOprtr )) {
                        filter.priceOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('priceOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('priceOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.priceOprtr))
                } // if (!(typeof  filter.priceOprtr === 'undefined'))
                if (!(typeof  filter.pPublisherNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.pPublisherNameOprtr )) {
                        filter.pPublisherNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('pPublisherNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('pPublisherNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.pPublisherNameOprtr))
                } // if (!(typeof  filter.pPublisherNameOprtr === 'undefined'))
                if (!(typeof  filter.pCCountryNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.pCCountryNameOprtr )) {
                        filter.pCCountryNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('pCCountryNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('pCCountryNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.pCCountryNameOprtr))
                } // if (!(typeof  filter.pCCountryNameOprtr === 'undefined'))
                if (!(typeof  filter.mManuscriptTitleOprtr === 'undefined')) {
                    if (Array.isArray(filter.mManuscriptTitleOprtr )) {
                        filter.mManuscriptTitleOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('mManuscriptTitleOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('mManuscriptTitleOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.mManuscriptTitleOprtr))
                } // if (!(typeof  filter.mManuscriptTitleOprtr === 'undefined'))
                if (!(typeof  filter.mCompletionDateOprtr === 'undefined')) {
                    if (Array.isArray(filter.mCompletionDateOprtr )) {
                        filter.mCompletionDateOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('mCompletionDateOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('mCompletionDateOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.mCompletionDateOprtr))
                } // if (!(typeof  filter.mCompletionDateOprtr === 'undefined'))
                if (!(typeof  filter.mAFirstNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.mAFirstNameOprtr )) {
                        filter.mAFirstNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('mAFirstNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('mAFirstNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.mAFirstNameOprtr))
                } // if (!(typeof  filter.mAFirstNameOprtr === 'undefined'))
                if (!(typeof  filter.mALastNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.mALastNameOprtr )) {
                        filter.mALastNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('mALastNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('mALastNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.mALastNameOprtr))
                } // if (!(typeof  filter.mALastNameOprtr === 'undefined'))
                if (!(typeof  filter.mABirthDateOprtr === 'undefined')) {
                    if (Array.isArray(filter.mABirthDateOprtr )) {
                        filter.mABirthDateOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('mABirthDateOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('mABirthDateOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.mABirthDateOprtr))
                } // if (!(typeof  filter.mABirthDateOprtr === 'undefined'))
                if (!(typeof  filter.mACCountryNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.mACCountryNameOprtr )) {
                        filter.mACCountryNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('mACCountryNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('mACCountryNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.mACCountryNameOprtr))
                } // if (!(typeof  filter.mACCountryNameOprtr === 'undefined'))
                if (!(typeof  filter.mGGenreNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.mGGenreNameOprtr )) {
                        filter.mGGenreNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('mGGenreNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('mGGenreNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.mGGenreNameOprtr))
                } // if (!(typeof  filter.mGGenreNameOprtr === 'undefined'))
                if (!(typeof  filter.mDDialectNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.mDDialectNameOprtr )) {
                        filter.mDDialectNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('mDDialectNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('mDDialectNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.mDDialectNameOprtr))
                } // if (!(typeof  filter.mDDialectNameOprtr === 'undefined'))
                if (!(typeof  filter.mDCCountryNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.mDCCountryNameOprtr )) {
                        filter.mDCCountryNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('mDCCountryNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('mDCCountryNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.mDCCountryNameOprtr))
                } // if (!(typeof  filter.mDCCountryNameOprtr === 'undefined'))
                if (!(typeof  filter.eEditionNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.eEditionNameOprtr )) {
                        filter.eEditionNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('eEditionNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('eEditionNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.eEditionNameOprtr))
                } // if (!(typeof  filter.eEditionNameOprtr === 'undefined'))

                if (!(typeof filter.orderby === 'undefined')) {
                    if ( Array.isArray(filter.orderby)) {
                        filter.orderby.forEach(function (value) {
                            if (!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('orderby', value);
                                    hasFilter = true;
                                }
                            }
                        });
                    }
                }
                if (!(typeof filter.page === 'undefined')) {
                    if (!(filter.page === null)) {
                        params = params.append('page', filter.page.toString());
                        hasFilter = true;
                    }
                }
                if (!(typeof filter.pagesize === 'undefined')) {
                    if (!(filter.pagesize === null)) {
                        params = params.append('pagesize', filter.pagesize.toString());
                        hasFilter = true;
                    }
                }
            } // if (!(filter === null ))
        } // if (!(typeof filter === 'undefined'))
        const options = hasFilter ? { params } : {};
        return this.http.get<ILitBookViewPage>(this.serviceUrl+'/getwithfilter', options);
          //    .pipe(
          //        catchError(this.handleError('getwithfilter', []))
          //    );
    }

    // 
    // HowTo: {prm1, prm2, ..., prmN} -- primary key
    //
    // this.serviceRefInYourCode.getone(prm1, prm2, ..., prmN ).subscibe(value =>{
    //    // handling value of type ILitBookView
    // },
    // error => {
    //    // handling error 
    // });
    // 

    getone(bookId: number ): Observable<ILitBookView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof bookId === 'undefined')) {
            if (!(bookId === null)) {
                params = params.append('bookId', bookId.toString());
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.get<ILitBookView>(this.serviceUrl+'/getone', options);
          // .pipe(
          //   catchError(this.handleError('getone', []))
          // );
    }

    // 
    // HowTo: item is of type ILitBookView 
    //
    // this.serviceRefInYourCode.updateone(item).subscibe(value =>{
    //    // handling value of type ILitBookView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    updateone(item: ILitBookView): Observable<ILitBookView> {

        return this.http.put<ILitBookView>(this.serviceUrl+'/updateone', item); //, httpOptions);
        //  .pipe(
        //    catchError(this.handleError('updateone', item))
        //  );
    }

    // 
    // HowTo: item is of type ILitBookView 
    //
    // this.serviceRefInYourCode.addone(item).subscibe(value =>{
    //    // handling value of type ILitBookView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    addone(item: ILitBookView): Observable<ILitBookView> {
        if(!(typeof item === 'undefined')) {
            if(!(item === null)) {
                if(typeof item.bookId === 'undefined') {
                    item['bookId'] = 0;
                }
                if(item.bookId === null) {
                    item['bookId'] = 0;
                }
            }
        }
        return this.http.post<ILitBookView>(this.serviceUrl+'/addone', item); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('addone', item))
        // );   
    }

    // 
    // HowTo: item is of type ILitBookView 
    //
    // this.serviceRefInYourCode.deleteone(item).subscibe(value =>{
    //    // handling value of type ILitBookView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    deleteone(bookId: number ): Observable<ILitBookView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof bookId === 'undefined')) {
            if (!(bookId === null)) {
                params = params.append('bookId', bookId.toString());
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.delete<ILitBookView>(this.serviceUrl+'/deleteone', options); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('deleteone', item))
        // );   
    }

    src2dest(src: ILitBookView, dest: ILitBookView) {
        if ((typeof src === 'undefined') || (typeof dest === 'undefined')) return;
        if ((src === null) || (dest === null)) return;
        if(typeof src.bookId === 'undefined') {
            dest['bookId'] = null;
        } else {
            dest['bookId'] = src.bookId;
        }
        if(typeof src.bookTitle === 'undefined') {
            dest['bookTitle'] = null;
        } else {
            dest['bookTitle'] = src.bookTitle;
        }
        if(typeof src.publicationDate === 'undefined') {
            dest['publicationDate'] = null;
        } else {
            dest['publicationDate'] = src.publicationDate;
        }
        if(typeof src.price === 'undefined') {
            dest['price'] = null;
        } else {
            dest['price'] = src.price;
        }
        if(typeof src.publisherIdRef === 'undefined') {
            dest['publisherIdRef'] = null;
        } else {
            dest['publisherIdRef'] = src.publisherIdRef;
        }
        if(typeof src.manuscriptIdRef === 'undefined') {
            dest['manuscriptIdRef'] = null;
        } else {
            dest['manuscriptIdRef'] = src.manuscriptIdRef;
        }
        if(typeof src.editionIdRef === 'undefined') {
            dest['editionIdRef'] = null;
        } else {
            dest['editionIdRef'] = src.editionIdRef;
        }
        if(typeof src.pPublisherName === 'undefined') {
            dest['pPublisherName'] = null;
        } else {
            dest['pPublisherName'] = src.pPublisherName;
        }
        if(typeof src.pCCountryName === 'undefined') {
            dest['pCCountryName'] = null;
        } else {
            dest['pCCountryName'] = src.pCCountryName;
        }
        if(typeof src.mManuscriptTitle === 'undefined') {
            dest['mManuscriptTitle'] = null;
        } else {
            dest['mManuscriptTitle'] = src.mManuscriptTitle;
        }
        if(typeof src.mCompletionDate === 'undefined') {
            dest['mCompletionDate'] = null;
        } else {
            dest['mCompletionDate'] = src.mCompletionDate;
        }
        if(typeof src.mAFirstName === 'undefined') {
            dest['mAFirstName'] = null;
        } else {
            dest['mAFirstName'] = src.mAFirstName;
        }
        if(typeof src.mALastName === 'undefined') {
            dest['mALastName'] = null;
        } else {
            dest['mALastName'] = src.mALastName;
        }
        if(typeof src.mABirthDate === 'undefined') {
            dest['mABirthDate'] = null;
        } else {
            dest['mABirthDate'] = src.mABirthDate;
        }
        if(typeof src.mACCountryName === 'undefined') {
            dest['mACCountryName'] = null;
        } else {
            dest['mACCountryName'] = src.mACCountryName;
        }
        if(typeof src.mGGenreName === 'undefined') {
            dest['mGGenreName'] = null;
        } else {
            dest['mGGenreName'] = src.mGGenreName;
        }
        if(typeof src.mDDialectName === 'undefined') {
            dest['mDDialectName'] = null;
        } else {
            dest['mDDialectName'] = src.mDDialectName;
        }
        if(typeof src.mDCCountryName === 'undefined') {
            dest['mDCCountryName'] = null;
        } else {
            dest['mDCCountryName'] = src.mDCCountryName;
        }
        if(typeof src.eEditionName === 'undefined') {
            dest['eEditionName'] = null;
        } else {
            dest['eEditionName'] = src.eEditionName;
        }
        
    }


}

