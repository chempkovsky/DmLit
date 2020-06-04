
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ILitLanguageView } from './../../components/lit-language-view/interfaces/lit-language-view.interface';
import { ILitLanguageViewPage } from './../../components/lit-language-view/interfaces/lit-language-view-page.interface';
import { ILitLanguageViewFilter } from './../../components/lit-language-view/interfaces/lit-language-view-filter.interface';
import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


@Injectable({
  providedIn: 'root'
})
export class LitLanguageViewService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
       this.serviceUrl = this.appGlblSettings.getWebApiPrefix('LitLanguageView') + 'litlanguageviewwebapi';  
    }


    // 
    // HowTo:
    //
    // this.serviceRefInYourCode.getall().subscibe(value =>{
    //    // handling value of type ILitLanguageView[] 
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getall(): Observable<ILitLanguageView[]> {

        return this.http.get<ILitLanguageView[]>(this.serviceUrl+'/getall');
        //    .pipe(
        //        catchError(this.handleError('getall', []))
        //    );
    }



    // 
    // HowTo: flt is of type ILitLanguageViewFilter 
    //
    // this.serviceRefInYourCode.getwithfilter(flt).subscibe(value =>{
    //    // handling value of type ILitLanguageViewPage
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getwithfilter(filter: ILitLanguageViewFilter): Observable<ILitLanguageViewPage> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof filter === 'undefined')) {
            if (!(filter === null )) {
                if (!(typeof filter.iso3 === 'undefined')) {
                    if ( Array.isArray(filter.iso3 )) {
                        let hasNull: boolean = false;
                        filter.iso3.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('iso3', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('iso3', '');
                        }
                    } // if ( Array.isArray(filter.iso3 ))
                } // if (!(typeof filter.iso3 === 'undefined'))
                if (!(typeof filter.iso2 === 'undefined')) {
                    if ( Array.isArray(filter.iso2 )) {
                        let hasNull: boolean = false;
                        filter.iso2.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('iso2', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('iso2', '');
                        }
                    } // if ( Array.isArray(filter.iso2 ))
                } // if (!(typeof filter.iso2 === 'undefined'))
                if (!(typeof filter.languageName === 'undefined')) {
                    if ( Array.isArray(filter.languageName )) {
                        let hasNull: boolean = false;
                        filter.languageName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('languageName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('languageName', '');
                        }
                    } // if ( Array.isArray(filter.languageName ))
                } // if (!(typeof filter.languageName === 'undefined'))


                if (!(typeof  filter.iso3Oprtr === 'undefined')) {
                    if (Array.isArray(filter.iso3Oprtr )) {
                        filter.iso3Oprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('iso3Oprtr', 'eq');
                                } 
                                else {
                                    params = params.append('iso3Oprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.iso3Oprtr))
                } // if (!(typeof  filter.iso3Oprtr === 'undefined'))
                if (!(typeof  filter.iso2Oprtr === 'undefined')) {
                    if (Array.isArray(filter.iso2Oprtr )) {
                        filter.iso2Oprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('iso2Oprtr', 'eq');
                                } 
                                else {
                                    params = params.append('iso2Oprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.iso2Oprtr))
                } // if (!(typeof  filter.iso2Oprtr === 'undefined'))
                if (!(typeof  filter.languageNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.languageNameOprtr )) {
                        filter.languageNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('languageNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('languageNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.languageNameOprtr))
                } // if (!(typeof  filter.languageNameOprtr === 'undefined'))

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
        return this.http.get<ILitLanguageViewPage>(this.serviceUrl+'/getwithfilter', options);
          //    .pipe(
          //        catchError(this.handleError('getwithfilter', []))
          //    );
    }

    // 
    // HowTo: {prm1, prm2, ..., prmN} -- primary key
    //
    // this.serviceRefInYourCode.getone(prm1, prm2, ..., prmN ).subscibe(value =>{
    //    // handling value of type ILitLanguageView
    // },
    // error => {
    //    // handling error 
    // });
    // 

    getone(iso3: string | null , iso2: string | null ): Observable<ILitLanguageView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof iso3 === 'undefined')) {
            if (!(iso3 === null)) {
                params = params.append('iso3', iso3);
                hasFilter = true;
            }
        }
        if (!(typeof iso2 === 'undefined')) {
            if (!(iso2 === null)) {
                params = params.append('iso2', iso2);
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.get<ILitLanguageView>(this.serviceUrl+'/getone', options);
          // .pipe(
          //   catchError(this.handleError('getone', []))
          // );
    }

    // 
    // HowTo: item is of type ILitLanguageView 
    //
    // this.serviceRefInYourCode.updateone(item).subscibe(value =>{
    //    // handling value of type ILitLanguageView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    updateone(item: ILitLanguageView): Observable<ILitLanguageView> {

        return this.http.put<ILitLanguageView>(this.serviceUrl+'/updateone', item); //, httpOptions);
        //  .pipe(
        //    catchError(this.handleError('updateone', item))
        //  );
    }

    // 
    // HowTo: item is of type ILitLanguageView 
    //
    // this.serviceRefInYourCode.addone(item).subscibe(value =>{
    //    // handling value of type ILitLanguageView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    addone(item: ILitLanguageView): Observable<ILitLanguageView> {
        return this.http.post<ILitLanguageView>(this.serviceUrl+'/addone', item); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('addone', item))
        // );   
    }

    // 
    // HowTo: item is of type ILitLanguageView 
    //
    // this.serviceRefInYourCode.deleteone(item).subscibe(value =>{
    //    // handling value of type ILitLanguageView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    deleteone(iso3: string | null , iso2: string | null ): Observable<ILitLanguageView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof iso3 === 'undefined')) {
            if (!(iso3 === null)) {
                params = params.append('iso3', iso3);
                hasFilter = true;
            }
        }
        if (!(typeof iso2 === 'undefined')) {
            if (!(iso2 === null)) {
                params = params.append('iso2', iso2);
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.delete<ILitLanguageView>(this.serviceUrl+'/deleteone', options); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('deleteone', item))
        // );   
    }

    src2dest(src: ILitLanguageView, dest: ILitLanguageView) {
        if ((typeof src === 'undefined') || (typeof dest === 'undefined')) return;
        if ((src === null) || (dest === null)) return;
        if(typeof src.iso3 === 'undefined') {
            dest['iso3'] = null;
        } else {
            dest['iso3'] = src.iso3;
        }
        if(typeof src.iso2 === 'undefined') {
            dest['iso2'] = null;
        } else {
            dest['iso2'] = src.iso2;
        }
        if(typeof src.languageName === 'undefined') {
            dest['languageName'] = null;
        } else {
            dest['languageName'] = src.languageName;
        }
        
    }


}

