
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ILitManuscriptView } from './../../components/lit-manuscript-view/interfaces/lit-manuscript-view.interface';
import { ILitManuscriptViewPage } from './../../components/lit-manuscript-view/interfaces/lit-manuscript-view-page.interface';
import { ILitManuscriptViewFilter } from './../../components/lit-manuscript-view/interfaces/lit-manuscript-view-filter.interface';
import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


@Injectable({
  providedIn: 'root'
})
export class LitManuscriptViewService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
       this.serviceUrl = this.appGlblSettings.getWebApiPrefix('LitManuscriptView') + 'litmanuscriptviewwebapi';  
    }


    // 
    // HowTo:
    //
    // this.serviceRefInYourCode.getall().subscibe(value =>{
    //    // handling value of type ILitManuscriptView[] 
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getall(): Observable<ILitManuscriptView[]> {

        return this.http.get<ILitManuscriptView[]>(this.serviceUrl+'/getall');
        //    .pipe(
        //        catchError(this.handleError('getall', []))
        //    );
    }



    // 
    // HowTo: flt is of type ILitManuscriptViewFilter 
    //
    // this.serviceRefInYourCode.getwithfilter(flt).subscibe(value =>{
    //    // handling value of type ILitManuscriptViewPage
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getwithfilter(filter: ILitManuscriptViewFilter): Observable<ILitManuscriptViewPage> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof filter === 'undefined')) {
            if (!(filter === null )) {
                if (!(typeof filter.manuscriptId === 'undefined')) {
                    if ( Array.isArray(filter.manuscriptId )) {
                        filter.manuscriptId.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('manuscriptId', value.toString());
                                    hasFilter = true;
                                } 
                            }
                        });
                    } // if ( Array.isArray(filter.manuscriptId ))
                } // if (!(typeof filter.manuscriptId === 'undefined'))
                if (!(typeof filter.manuscriptTitle === 'undefined')) {
                    if ( Array.isArray(filter.manuscriptTitle )) {
                        let hasNull: boolean = false;
                        filter.manuscriptTitle.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('manuscriptTitle', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('manuscriptTitle', '');
                        }
                    } // if ( Array.isArray(filter.manuscriptTitle ))
                } // if (!(typeof filter.manuscriptTitle === 'undefined'))
                if (!(typeof filter.completionDate === 'undefined')) {
                    if ( Array.isArray(filter.completionDate )) {
                        filter.completionDate.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('completionDate', value.toString());
                                    hasFilter = true;
                                } 
                            }
                        });
                    } // if ( Array.isArray(filter.completionDate ))
                } // if (!(typeof filter.completionDate === 'undefined'))
                if (!(typeof filter.beginningDate === 'undefined')) {
                    if ( Array.isArray(filter.beginningDate )) {
                        let hasNull: boolean = false;
                        filter.beginningDate.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('beginningDate', value.toString());
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('beginningDate', '');
                        }
                    } // if ( Array.isArray(filter.beginningDate ))
                } // if (!(typeof filter.beginningDate === 'undefined'))
                if (!(typeof filter.authorIdRef === 'undefined')) {
                    if ( Array.isArray(filter.authorIdRef )) {
                        filter.authorIdRef.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('authorIdRef', value.toString());
                                    hasFilter = true;
                                } 
                            }
                        });
                    } // if ( Array.isArray(filter.authorIdRef ))
                } // if (!(typeof filter.authorIdRef === 'undefined'))
                if (!(typeof filter.genreIdRef === 'undefined')) {
                    if ( Array.isArray(filter.genreIdRef )) {
                        filter.genreIdRef.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('genreIdRef', value.toString());
                                    hasFilter = true;
                                } 
                            }
                        });
                    } // if ( Array.isArray(filter.genreIdRef ))
                } // if (!(typeof filter.genreIdRef === 'undefined'))
                if (!(typeof filter.dialectIdRef === 'undefined')) {
                    if ( Array.isArray(filter.dialectIdRef )) {
                        let hasNull: boolean = false;
                        filter.dialectIdRef.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('dialectIdRef', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('dialectIdRef', '');
                        }
                    } // if ( Array.isArray(filter.dialectIdRef ))
                } // if (!(typeof filter.dialectIdRef === 'undefined'))
                if (!(typeof filter.aFirstName === 'undefined')) {
                    if ( Array.isArray(filter.aFirstName )) {
                        let hasNull: boolean = false;
                        filter.aFirstName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('aFirstName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('aFirstName', '');
                        }
                    } // if ( Array.isArray(filter.aFirstName ))
                } // if (!(typeof filter.aFirstName === 'undefined'))
                if (!(typeof filter.aLastName === 'undefined')) {
                    if ( Array.isArray(filter.aLastName )) {
                        let hasNull: boolean = false;
                        filter.aLastName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('aLastName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('aLastName', '');
                        }
                    } // if ( Array.isArray(filter.aLastName ))
                } // if (!(typeof filter.aLastName === 'undefined'))
                if (!(typeof filter.aBirthDate === 'undefined')) {
                    if ( Array.isArray(filter.aBirthDate )) {
                        let hasNull: boolean = false;
                        filter.aBirthDate.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('aBirthDate', value.toString());
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('aBirthDate', '');
                        }
                    } // if ( Array.isArray(filter.aBirthDate ))
                } // if (!(typeof filter.aBirthDate === 'undefined'))
                if (!(typeof filter.aCCountryName === 'undefined')) {
                    if ( Array.isArray(filter.aCCountryName )) {
                        let hasNull: boolean = false;
                        filter.aCCountryName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('aCCountryName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('aCCountryName', '');
                        }
                    } // if ( Array.isArray(filter.aCCountryName ))
                } // if (!(typeof filter.aCCountryName === 'undefined'))
                if (!(typeof filter.gGenreName === 'undefined')) {
                    if ( Array.isArray(filter.gGenreName )) {
                        let hasNull: boolean = false;
                        filter.gGenreName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('gGenreName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('gGenreName', '');
                        }
                    } // if ( Array.isArray(filter.gGenreName ))
                } // if (!(typeof filter.gGenreName === 'undefined'))
                if (!(typeof filter.dDialectName === 'undefined')) {
                    if ( Array.isArray(filter.dDialectName )) {
                        let hasNull: boolean = false;
                        filter.dDialectName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('dDialectName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('dDialectName', '');
                        }
                    } // if ( Array.isArray(filter.dDialectName ))
                } // if (!(typeof filter.dDialectName === 'undefined'))
                if (!(typeof filter.dCCountryName === 'undefined')) {
                    if ( Array.isArray(filter.dCCountryName )) {
                        let hasNull: boolean = false;
                        filter.dCCountryName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('dCCountryName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('dCCountryName', '');
                        }
                    } // if ( Array.isArray(filter.dCCountryName ))
                } // if (!(typeof filter.dCCountryName === 'undefined'))


                if (!(typeof  filter.manuscriptIdOprtr === 'undefined')) {
                    if (Array.isArray(filter.manuscriptIdOprtr )) {
                        filter.manuscriptIdOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('manuscriptIdOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('manuscriptIdOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.manuscriptIdOprtr))
                } // if (!(typeof  filter.manuscriptIdOprtr === 'undefined'))
                if (!(typeof  filter.manuscriptTitleOprtr === 'undefined')) {
                    if (Array.isArray(filter.manuscriptTitleOprtr )) {
                        filter.manuscriptTitleOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('manuscriptTitleOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('manuscriptTitleOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.manuscriptTitleOprtr))
                } // if (!(typeof  filter.manuscriptTitleOprtr === 'undefined'))
                if (!(typeof  filter.completionDateOprtr === 'undefined')) {
                    if (Array.isArray(filter.completionDateOprtr )) {
                        filter.completionDateOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('completionDateOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('completionDateOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.completionDateOprtr))
                } // if (!(typeof  filter.completionDateOprtr === 'undefined'))
                if (!(typeof  filter.beginningDateOprtr === 'undefined')) {
                    if (Array.isArray(filter.beginningDateOprtr )) {
                        filter.beginningDateOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('beginningDateOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('beginningDateOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.beginningDateOprtr))
                } // if (!(typeof  filter.beginningDateOprtr === 'undefined'))
                if (!(typeof  filter.authorIdRefOprtr === 'undefined')) {
                    if (Array.isArray(filter.authorIdRefOprtr )) {
                        filter.authorIdRefOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('authorIdRefOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('authorIdRefOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.authorIdRefOprtr))
                } // if (!(typeof  filter.authorIdRefOprtr === 'undefined'))
                if (!(typeof  filter.genreIdRefOprtr === 'undefined')) {
                    if (Array.isArray(filter.genreIdRefOprtr )) {
                        filter.genreIdRefOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('genreIdRefOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('genreIdRefOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.genreIdRefOprtr))
                } // if (!(typeof  filter.genreIdRefOprtr === 'undefined'))
                if (!(typeof  filter.dialectIdRefOprtr === 'undefined')) {
                    if (Array.isArray(filter.dialectIdRefOprtr )) {
                        filter.dialectIdRefOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('dialectIdRefOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('dialectIdRefOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.dialectIdRefOprtr))
                } // if (!(typeof  filter.dialectIdRefOprtr === 'undefined'))
                if (!(typeof  filter.aFirstNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.aFirstNameOprtr )) {
                        filter.aFirstNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('aFirstNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('aFirstNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.aFirstNameOprtr))
                } // if (!(typeof  filter.aFirstNameOprtr === 'undefined'))
                if (!(typeof  filter.aLastNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.aLastNameOprtr )) {
                        filter.aLastNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('aLastNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('aLastNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.aLastNameOprtr))
                } // if (!(typeof  filter.aLastNameOprtr === 'undefined'))
                if (!(typeof  filter.aBirthDateOprtr === 'undefined')) {
                    if (Array.isArray(filter.aBirthDateOprtr )) {
                        filter.aBirthDateOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('aBirthDateOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('aBirthDateOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.aBirthDateOprtr))
                } // if (!(typeof  filter.aBirthDateOprtr === 'undefined'))
                if (!(typeof  filter.aCCountryNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.aCCountryNameOprtr )) {
                        filter.aCCountryNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('aCCountryNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('aCCountryNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.aCCountryNameOprtr))
                } // if (!(typeof  filter.aCCountryNameOprtr === 'undefined'))
                if (!(typeof  filter.gGenreNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.gGenreNameOprtr )) {
                        filter.gGenreNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('gGenreNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('gGenreNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.gGenreNameOprtr))
                } // if (!(typeof  filter.gGenreNameOprtr === 'undefined'))
                if (!(typeof  filter.dDialectNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.dDialectNameOprtr )) {
                        filter.dDialectNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('dDialectNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('dDialectNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.dDialectNameOprtr))
                } // if (!(typeof  filter.dDialectNameOprtr === 'undefined'))
                if (!(typeof  filter.dCCountryNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.dCCountryNameOprtr )) {
                        filter.dCCountryNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('dCCountryNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('dCCountryNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.dCCountryNameOprtr))
                } // if (!(typeof  filter.dCCountryNameOprtr === 'undefined'))

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
        return this.http.get<ILitManuscriptViewPage>(this.serviceUrl+'/getwithfilter', options);
          //    .pipe(
          //        catchError(this.handleError('getwithfilter', []))
          //    );
    }

    // 
    // HowTo: {prm1, prm2, ..., prmN} -- primary key
    //
    // this.serviceRefInYourCode.getone(prm1, prm2, ..., prmN ).subscibe(value =>{
    //    // handling value of type ILitManuscriptView
    // },
    // error => {
    //    // handling error 
    // });
    // 

    getone(manuscriptId: number ): Observable<ILitManuscriptView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof manuscriptId === 'undefined')) {
            if (!(manuscriptId === null)) {
                params = params.append('manuscriptId', manuscriptId.toString());
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.get<ILitManuscriptView>(this.serviceUrl+'/getone', options);
          // .pipe(
          //   catchError(this.handleError('getone', []))
          // );
    }

    // 
    // HowTo: item is of type ILitManuscriptView 
    //
    // this.serviceRefInYourCode.updateone(item).subscibe(value =>{
    //    // handling value of type ILitManuscriptView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    updateone(item: ILitManuscriptView): Observable<ILitManuscriptView> {

        return this.http.put<ILitManuscriptView>(this.serviceUrl+'/updateone', item); //, httpOptions);
        //  .pipe(
        //    catchError(this.handleError('updateone', item))
        //  );
    }

    // 
    // HowTo: item is of type ILitManuscriptView 
    //
    // this.serviceRefInYourCode.addone(item).subscibe(value =>{
    //    // handling value of type ILitManuscriptView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    addone(item: ILitManuscriptView): Observable<ILitManuscriptView> {
        if(!(typeof item === 'undefined')) {
            if(!(item === null)) {
                if(typeof item.manuscriptId === 'undefined') {
                    item['manuscriptId'] = 0;
                }
                if(item.manuscriptId === null) {
                    item['manuscriptId'] = 0;
                }
            }
        }
        return this.http.post<ILitManuscriptView>(this.serviceUrl+'/addone', item); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('addone', item))
        // );   
    }

    // 
    // HowTo: item is of type ILitManuscriptView 
    //
    // this.serviceRefInYourCode.deleteone(item).subscibe(value =>{
    //    // handling value of type ILitManuscriptView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    deleteone(manuscriptId: number ): Observable<ILitManuscriptView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof manuscriptId === 'undefined')) {
            if (!(manuscriptId === null)) {
                params = params.append('manuscriptId', manuscriptId.toString());
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.delete<ILitManuscriptView>(this.serviceUrl+'/deleteone', options); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('deleteone', item))
        // );   
    }

    src2dest(src: ILitManuscriptView, dest: ILitManuscriptView) {
        if ((typeof src === 'undefined') || (typeof dest === 'undefined')) return;
        if ((src === null) || (dest === null)) return;
        if(typeof src.manuscriptId === 'undefined') {
            dest['manuscriptId'] = null;
        } else {
            dest['manuscriptId'] = src.manuscriptId;
        }
        if(typeof src.manuscriptTitle === 'undefined') {
            dest['manuscriptTitle'] = null;
        } else {
            dest['manuscriptTitle'] = src.manuscriptTitle;
        }
        if(typeof src.completionDate === 'undefined') {
            dest['completionDate'] = null;
        } else {
            dest['completionDate'] = src.completionDate;
        }
        if(typeof src.beginningDate === 'undefined') {
            dest['beginningDate'] = null;
        } else {
            dest['beginningDate'] = src.beginningDate;
        }
        if(typeof src.authorIdRef === 'undefined') {
            dest['authorIdRef'] = null;
        } else {
            dest['authorIdRef'] = src.authorIdRef;
        }
        if(typeof src.genreIdRef === 'undefined') {
            dest['genreIdRef'] = null;
        } else {
            dest['genreIdRef'] = src.genreIdRef;
        }
        if(typeof src.dialectIdRef === 'undefined') {
            dest['dialectIdRef'] = null;
        } else {
            dest['dialectIdRef'] = src.dialectIdRef;
        }
        if(typeof src.aFirstName === 'undefined') {
            dest['aFirstName'] = null;
        } else {
            dest['aFirstName'] = src.aFirstName;
        }
        if(typeof src.aLastName === 'undefined') {
            dest['aLastName'] = null;
        } else {
            dest['aLastName'] = src.aLastName;
        }
        if(typeof src.aBirthDate === 'undefined') {
            dest['aBirthDate'] = null;
        } else {
            dest['aBirthDate'] = src.aBirthDate;
        }
        if(typeof src.aCCountryName === 'undefined') {
            dest['aCCountryName'] = null;
        } else {
            dest['aCCountryName'] = src.aCCountryName;
        }
        if(typeof src.gGenreName === 'undefined') {
            dest['gGenreName'] = null;
        } else {
            dest['gGenreName'] = src.gGenreName;
        }
        if(typeof src.dDialectName === 'undefined') {
            dest['dDialectName'] = null;
        } else {
            dest['dDialectName'] = src.dDialectName;
        }
        if(typeof src.dCCountryName === 'undefined') {
            dest['dCCountryName'] = null;
        } else {
            dest['dCCountryName'] = src.dCCountryName;
        }
        
    }


}

