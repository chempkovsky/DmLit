
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ILitPublisherView } from './../../components/lit-publisher-view/interfaces/lit-publisher-view.interface';
import { ILitPublisherViewPage } from './../../components/lit-publisher-view/interfaces/lit-publisher-view-page.interface';
import { ILitPublisherViewFilter } from './../../components/lit-publisher-view/interfaces/lit-publisher-view-filter.interface';
import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


@Injectable({
  providedIn: 'root'
})
export class LitPublisherViewService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
       this.serviceUrl = this.appGlblSettings.getWebApiPrefix('LitPublisherView') + 'litpublisherviewwebapi';  
    }


    // 
    // HowTo:
    //
    // this.serviceRefInYourCode.getall().subscibe(value =>{
    //    // handling value of type ILitPublisherView[] 
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getall(): Observable<ILitPublisherView[]> {

        return this.http.get<ILitPublisherView[]>(this.serviceUrl+'/getall');
        //    .pipe(
        //        catchError(this.handleError('getall', []))
        //    );
    }



    // 
    // HowTo: flt is of type ILitPublisherViewFilter 
    //
    // this.serviceRefInYourCode.getwithfilter(flt).subscibe(value =>{
    //    // handling value of type ILitPublisherViewPage
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getwithfilter(filter: ILitPublisherViewFilter): Observable<ILitPublisherViewPage> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof filter === 'undefined')) {
            if (!(filter === null )) {
                if (!(typeof filter.publisherId === 'undefined')) {
                    if ( Array.isArray(filter.publisherId )) {
                        filter.publisherId.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('publisherId', value.toString());
                                    hasFilter = true;
                                } 
                            }
                        });
                    } // if ( Array.isArray(filter.publisherId ))
                } // if (!(typeof filter.publisherId === 'undefined'))
                if (!(typeof filter.publisherName === 'undefined')) {
                    if ( Array.isArray(filter.publisherName )) {
                        let hasNull: boolean = false;
                        filter.publisherName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('publisherName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('publisherName', '');
                        }
                    } // if ( Array.isArray(filter.publisherName ))
                } // if (!(typeof filter.publisherName === 'undefined'))
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


                if (!(typeof  filter.publisherIdOprtr === 'undefined')) {
                    if (Array.isArray(filter.publisherIdOprtr )) {
                        filter.publisherIdOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('publisherIdOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('publisherIdOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.publisherIdOprtr))
                } // if (!(typeof  filter.publisherIdOprtr === 'undefined'))
                if (!(typeof  filter.publisherNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.publisherNameOprtr )) {
                        filter.publisherNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('publisherNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('publisherNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.publisherNameOprtr))
                } // if (!(typeof  filter.publisherNameOprtr === 'undefined'))
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
        return this.http.get<ILitPublisherViewPage>(this.serviceUrl+'/getwithfilter', options);
          //    .pipe(
          //        catchError(this.handleError('getwithfilter', []))
          //    );
    }

    // 
    // HowTo: {prm1, prm2, ..., prmN} -- primary key
    //
    // this.serviceRefInYourCode.getone(prm1, prm2, ..., prmN ).subscibe(value =>{
    //    // handling value of type ILitPublisherView
    // },
    // error => {
    //    // handling error 
    // });
    // 

    getone(publisherId: number ): Observable<ILitPublisherView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof publisherId === 'undefined')) {
            if (!(publisherId === null)) {
                params = params.append('publisherId', publisherId.toString());
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.get<ILitPublisherView>(this.serviceUrl+'/getone', options);
          // .pipe(
          //   catchError(this.handleError('getone', []))
          // );
    }

    // 
    // HowTo: item is of type ILitPublisherView 
    //
    // this.serviceRefInYourCode.updateone(item).subscibe(value =>{
    //    // handling value of type ILitPublisherView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    updateone(item: ILitPublisherView): Observable<ILitPublisherView> {

        return this.http.put<ILitPublisherView>(this.serviceUrl+'/updateone', item); //, httpOptions);
        //  .pipe(
        //    catchError(this.handleError('updateone', item))
        //  );
    }

    // 
    // HowTo: item is of type ILitPublisherView 
    //
    // this.serviceRefInYourCode.addone(item).subscibe(value =>{
    //    // handling value of type ILitPublisherView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    addone(item: ILitPublisherView): Observable<ILitPublisherView> {
        if(!(typeof item === 'undefined')) {
            if(!(item === null)) {
                if(typeof item.publisherId === 'undefined') {
                    item['publisherId'] = 0;
                }
                if(item.publisherId === null) {
                    item['publisherId'] = 0;
                }
            }
        }
        return this.http.post<ILitPublisherView>(this.serviceUrl+'/addone', item); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('addone', item))
        // );   
    }

    // 
    // HowTo: item is of type ILitPublisherView 
    //
    // this.serviceRefInYourCode.deleteone(item).subscibe(value =>{
    //    // handling value of type ILitPublisherView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    deleteone(publisherId: number ): Observable<ILitPublisherView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof publisherId === 'undefined')) {
            if (!(publisherId === null)) {
                params = params.append('publisherId', publisherId.toString());
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.delete<ILitPublisherView>(this.serviceUrl+'/deleteone', options); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('deleteone', item))
        // );   
    }

    src2dest(src: ILitPublisherView, dest: ILitPublisherView) {
        if ((typeof src === 'undefined') || (typeof dest === 'undefined')) return;
        if ((src === null) || (dest === null)) return;
        if(typeof src.publisherId === 'undefined') {
            dest['publisherId'] = null;
        } else {
            dest['publisherId'] = src.publisherId;
        }
        if(typeof src.publisherName === 'undefined') {
            dest['publisherName'] = null;
        } else {
            dest['publisherName'] = src.publisherName;
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
        if(typeof src.cCountryName === 'undefined') {
            dest['cCountryName'] = null;
        } else {
            dest['cCountryName'] = src.cCountryName;
        }
        
    }


}

