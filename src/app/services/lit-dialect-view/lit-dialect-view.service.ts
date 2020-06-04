
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ILitDialectView } from './../../components/lit-dialect-view/interfaces/lit-dialect-view.interface';
import { ILitDialectViewPage } from './../../components/lit-dialect-view/interfaces/lit-dialect-view-page.interface';
import { ILitDialectViewFilter } from './../../components/lit-dialect-view/interfaces/lit-dialect-view-filter.interface';
import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


@Injectable({
  providedIn: 'root'
})
export class LitDialectViewService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
       this.serviceUrl = this.appGlblSettings.getWebApiPrefix('LitDialectView') + 'litdialectviewwebapi';  
    }


    // 
    // HowTo:
    //
    // this.serviceRefInYourCode.getall().subscibe(value =>{
    //    // handling value of type ILitDialectView[] 
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getall(): Observable<ILitDialectView[]> {

        return this.http.get<ILitDialectView[]>(this.serviceUrl+'/getall');
        //    .pipe(
        //        catchError(this.handleError('getall', []))
        //    );
    }



    // 
    // HowTo: flt is of type ILitDialectViewFilter 
    //
    // this.serviceRefInYourCode.getwithfilter(flt).subscibe(value =>{
    //    // handling value of type ILitDialectViewPage
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getwithfilter(filter: ILitDialectViewFilter): Observable<ILitDialectViewPage> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof filter === 'undefined')) {
            if (!(filter === null )) {
                if (!(typeof filter.dialectId === 'undefined')) {
                    if ( Array.isArray(filter.dialectId )) {
                        let hasNull: boolean = false;
                        filter.dialectId.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('dialectId', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('dialectId', '');
                        }
                    } // if ( Array.isArray(filter.dialectId ))
                } // if (!(typeof filter.dialectId === 'undefined'))
                if (!(typeof filter.dialectName === 'undefined')) {
                    if ( Array.isArray(filter.dialectName )) {
                        let hasNull: boolean = false;
                        filter.dialectName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('dialectName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('dialectName', '');
                        }
                    } // if ( Array.isArray(filter.dialectName ))
                } // if (!(typeof filter.dialectName === 'undefined'))
                if (!(typeof filter.iso3CntrRef === 'undefined')) {
                    if ( Array.isArray(filter.iso3CntrRef )) {
                        let hasNull: boolean = false;
                        filter.iso3CntrRef.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('iso3CntrRef', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('iso3CntrRef', '');
                        }
                    } // if ( Array.isArray(filter.iso3CntrRef ))
                } // if (!(typeof filter.iso3CntrRef === 'undefined'))
                if (!(typeof filter.iso2CntrRef === 'undefined')) {
                    if ( Array.isArray(filter.iso2CntrRef )) {
                        let hasNull: boolean = false;
                        filter.iso2CntrRef.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('iso2CntrRef', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('iso2CntrRef', '');
                        }
                    } // if ( Array.isArray(filter.iso2CntrRef ))
                } // if (!(typeof filter.iso2CntrRef === 'undefined'))
                if (!(typeof filter.iso3LngRef === 'undefined')) {
                    if ( Array.isArray(filter.iso3LngRef )) {
                        let hasNull: boolean = false;
                        filter.iso3LngRef.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('iso3LngRef', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('iso3LngRef', '');
                        }
                    } // if ( Array.isArray(filter.iso3LngRef ))
                } // if (!(typeof filter.iso3LngRef === 'undefined'))
                if (!(typeof filter.iso2LngRef === 'undefined')) {
                    if ( Array.isArray(filter.iso2LngRef )) {
                        let hasNull: boolean = false;
                        filter.iso2LngRef.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('iso2LngRef', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('iso2LngRef', '');
                        }
                    } // if ( Array.isArray(filter.iso2LngRef ))
                } // if (!(typeof filter.iso2LngRef === 'undefined'))
                if (!(typeof filter.cCountryName === 'undefined')) {
                    if ( Array.isArray(filter.cCountryName )) {
                        let hasNull: boolean = false;
                        filter.cCountryName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('cCountryName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('cCountryName', '');
                        }
                    } // if ( Array.isArray(filter.cCountryName ))
                } // if (!(typeof filter.cCountryName === 'undefined'))
                if (!(typeof filter.lLanguageName === 'undefined')) {
                    if ( Array.isArray(filter.lLanguageName )) {
                        let hasNull: boolean = false;
                        filter.lLanguageName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('lLanguageName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('lLanguageName', '');
                        }
                    } // if ( Array.isArray(filter.lLanguageName ))
                } // if (!(typeof filter.lLanguageName === 'undefined'))


                if (!(typeof  filter.dialectIdOprtr === 'undefined')) {
                    if (Array.isArray(filter.dialectIdOprtr )) {
                        filter.dialectIdOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('dialectIdOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('dialectIdOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.dialectIdOprtr))
                } // if (!(typeof  filter.dialectIdOprtr === 'undefined'))
                if (!(typeof  filter.dialectNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.dialectNameOprtr )) {
                        filter.dialectNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('dialectNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('dialectNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.dialectNameOprtr))
                } // if (!(typeof  filter.dialectNameOprtr === 'undefined'))
                if (!(typeof  filter.iso3CntrRefOprtr === 'undefined')) {
                    if (Array.isArray(filter.iso3CntrRefOprtr )) {
                        filter.iso3CntrRefOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('iso3CntrRefOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('iso3CntrRefOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.iso3CntrRefOprtr))
                } // if (!(typeof  filter.iso3CntrRefOprtr === 'undefined'))
                if (!(typeof  filter.iso2CntrRefOprtr === 'undefined')) {
                    if (Array.isArray(filter.iso2CntrRefOprtr )) {
                        filter.iso2CntrRefOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('iso2CntrRefOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('iso2CntrRefOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.iso2CntrRefOprtr))
                } // if (!(typeof  filter.iso2CntrRefOprtr === 'undefined'))
                if (!(typeof  filter.iso3LngRefOprtr === 'undefined')) {
                    if (Array.isArray(filter.iso3LngRefOprtr )) {
                        filter.iso3LngRefOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('iso3LngRefOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('iso3LngRefOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.iso3LngRefOprtr))
                } // if (!(typeof  filter.iso3LngRefOprtr === 'undefined'))
                if (!(typeof  filter.iso2LngRefOprtr === 'undefined')) {
                    if (Array.isArray(filter.iso2LngRefOprtr )) {
                        filter.iso2LngRefOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('iso2LngRefOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('iso2LngRefOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.iso2LngRefOprtr))
                } // if (!(typeof  filter.iso2LngRefOprtr === 'undefined'))
                if (!(typeof  filter.cCountryNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.cCountryNameOprtr )) {
                        filter.cCountryNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('cCountryNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('cCountryNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.cCountryNameOprtr))
                } // if (!(typeof  filter.cCountryNameOprtr === 'undefined'))
                if (!(typeof  filter.lLanguageNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.lLanguageNameOprtr )) {
                        filter.lLanguageNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('lLanguageNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('lLanguageNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.lLanguageNameOprtr))
                } // if (!(typeof  filter.lLanguageNameOprtr === 'undefined'))

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
        return this.http.get<ILitDialectViewPage>(this.serviceUrl+'/getwithfilter', options);
          //    .pipe(
          //        catchError(this.handleError('getwithfilter', []))
          //    );
    }

    // 
    // HowTo: {prm1, prm2, ..., prmN} -- primary key
    //
    // this.serviceRefInYourCode.getone(prm1, prm2, ..., prmN ).subscibe(value =>{
    //    // handling value of type ILitDialectView
    // },
    // error => {
    //    // handling error 
    // });
    // 

    getone(dialectId: string | null ): Observable<ILitDialectView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof dialectId === 'undefined')) {
            if (!(dialectId === null)) {
                params = params.append('dialectId', dialectId);
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.get<ILitDialectView>(this.serviceUrl+'/getone', options);
          // .pipe(
          //   catchError(this.handleError('getone', []))
          // );
    }

    // 
    // HowTo: item is of type ILitDialectView 
    //
    // this.serviceRefInYourCode.updateone(item).subscibe(value =>{
    //    // handling value of type ILitDialectView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    updateone(item: ILitDialectView): Observable<ILitDialectView> {

        return this.http.put<ILitDialectView>(this.serviceUrl+'/updateone', item); //, httpOptions);
        //  .pipe(
        //    catchError(this.handleError('updateone', item))
        //  );
    }

    // 
    // HowTo: item is of type ILitDialectView 
    //
    // this.serviceRefInYourCode.addone(item).subscibe(value =>{
    //    // handling value of type ILitDialectView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    addone(item: ILitDialectView): Observable<ILitDialectView> {
        return this.http.post<ILitDialectView>(this.serviceUrl+'/addone', item); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('addone', item))
        // );   
    }

    // 
    // HowTo: item is of type ILitDialectView 
    //
    // this.serviceRefInYourCode.deleteone(item).subscibe(value =>{
    //    // handling value of type ILitDialectView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    deleteone(dialectId: string | null ): Observable<ILitDialectView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof dialectId === 'undefined')) {
            if (!(dialectId === null)) {
                params = params.append('dialectId', dialectId);
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.delete<ILitDialectView>(this.serviceUrl+'/deleteone', options); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('deleteone', item))
        // );   
    }

    src2dest(src: ILitDialectView, dest: ILitDialectView) {
        if ((typeof src === 'undefined') || (typeof dest === 'undefined')) return;
        if ((src === null) || (dest === null)) return;
        if(typeof src.dialectId === 'undefined') {
            dest['dialectId'] = null;
        } else {
            dest['dialectId'] = src.dialectId;
        }
        if(typeof src.dialectName === 'undefined') {
            dest['dialectName'] = null;
        } else {
            dest['dialectName'] = src.dialectName;
        }
        if(typeof src.iso3CntrRef === 'undefined') {
            dest['iso3CntrRef'] = null;
        } else {
            dest['iso3CntrRef'] = src.iso3CntrRef;
        }
        if(typeof src.iso2CntrRef === 'undefined') {
            dest['iso2CntrRef'] = null;
        } else {
            dest['iso2CntrRef'] = src.iso2CntrRef;
        }
        if(typeof src.iso3LngRef === 'undefined') {
            dest['iso3LngRef'] = null;
        } else {
            dest['iso3LngRef'] = src.iso3LngRef;
        }
        if(typeof src.iso2LngRef === 'undefined') {
            dest['iso2LngRef'] = null;
        } else {
            dest['iso2LngRef'] = src.iso2LngRef;
        }
        if(typeof src.cCountryName === 'undefined') {
            dest['cCountryName'] = null;
        } else {
            dest['cCountryName'] = src.cCountryName;
        }
        if(typeof src.lLanguageName === 'undefined') {
            dest['lLanguageName'] = null;
        } else {
            dest['lLanguageName'] = src.lLanguageName;
        }
        
    }


}

