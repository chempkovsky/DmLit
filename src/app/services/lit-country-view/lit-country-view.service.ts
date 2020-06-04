
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ILitCountryView } from './../../components/lit-country-view/interfaces/lit-country-view.interface';
import { ILitCountryViewPage } from './../../components/lit-country-view/interfaces/lit-country-view-page.interface';
import { ILitCountryViewFilter } from './../../components/lit-country-view/interfaces/lit-country-view-filter.interface';
import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


@Injectable({
  providedIn: 'root'
})
export class LitCountryViewService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
       this.serviceUrl = this.appGlblSettings.getWebApiPrefix('LitCountryView') + 'litcountryviewwebapi';  
    }


    // 
    // HowTo:
    //
    // this.serviceRefInYourCode.getall().subscibe(value =>{
    //    // handling value of type ILitCountryView[] 
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getall(): Observable<ILitCountryView[]> {

        return this.http.get<ILitCountryView[]>(this.serviceUrl+'/getall');
        //    .pipe(
        //        catchError(this.handleError('getall', []))
        //    );
    }



    // 
    // HowTo: flt is of type ILitCountryViewFilter 
    //
    // this.serviceRefInYourCode.getwithfilter(flt).subscibe(value =>{
    //    // handling value of type ILitCountryViewPage
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getwithfilter(filter: ILitCountryViewFilter): Observable<ILitCountryViewPage> {
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
                if (!(typeof filter.countryName === 'undefined')) {
                    if ( Array.isArray(filter.countryName )) {
                        let hasNull: boolean = false;
                        filter.countryName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('countryName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('countryName', '');
                        }
                    } // if ( Array.isArray(filter.countryName ))
                } // if (!(typeof filter.countryName === 'undefined'))


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
                if (!(typeof  filter.countryNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.countryNameOprtr )) {
                        filter.countryNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('countryNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('countryNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.countryNameOprtr))
                } // if (!(typeof  filter.countryNameOprtr === 'undefined'))

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
        return this.http.get<ILitCountryViewPage>(this.serviceUrl+'/getwithfilter', options);
          //    .pipe(
          //        catchError(this.handleError('getwithfilter', []))
          //    );
    }

    // 
    // HowTo: {prm1, prm2, ..., prmN} -- primary key
    //
    // this.serviceRefInYourCode.getone(prm1, prm2, ..., prmN ).subscibe(value =>{
    //    // handling value of type ILitCountryView
    // },
    // error => {
    //    // handling error 
    // });
    // 

    getone(iso3: string | null , iso2: string | null ): Observable<ILitCountryView> {
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
        return this.http.get<ILitCountryView>(this.serviceUrl+'/getone', options);
          // .pipe(
          //   catchError(this.handleError('getone', []))
          // );
    }

    // 
    // HowTo: item is of type ILitCountryView 
    //
    // this.serviceRefInYourCode.updateone(item).subscibe(value =>{
    //    // handling value of type ILitCountryView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    updateone(item: ILitCountryView): Observable<ILitCountryView> {

        return this.http.put<ILitCountryView>(this.serviceUrl+'/updateone', item); //, httpOptions);
        //  .pipe(
        //    catchError(this.handleError('updateone', item))
        //  );
    }

    // 
    // HowTo: item is of type ILitCountryView 
    //
    // this.serviceRefInYourCode.addone(item).subscibe(value =>{
    //    // handling value of type ILitCountryView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    addone(item: ILitCountryView): Observable<ILitCountryView> {
        return this.http.post<ILitCountryView>(this.serviceUrl+'/addone', item); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('addone', item))
        // );   
    }

    // 
    // HowTo: item is of type ILitCountryView 
    //
    // this.serviceRefInYourCode.deleteone(item).subscibe(value =>{
    //    // handling value of type ILitCountryView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    deleteone(iso3: string | null , iso2: string | null ): Observable<ILitCountryView> {
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
        return this.http.delete<ILitCountryView>(this.serviceUrl+'/deleteone', options); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('deleteone', item))
        // );   
    }

    src2dest(src: ILitCountryView, dest: ILitCountryView) {
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
        if(typeof src.countryName === 'undefined') {
            dest['countryName'] = null;
        } else {
            dest['countryName'] = src.countryName;
        }
        
    }


}

