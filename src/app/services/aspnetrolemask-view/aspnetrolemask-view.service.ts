
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IaspnetrolemaskView } from './../../components/aspnetrolemask-view/interfaces/aspnetrolemask-view.interface';
import { IaspnetrolemaskViewPage } from './../../components/aspnetrolemask-view/interfaces/aspnetrolemask-view-page.interface';
import { IaspnetrolemaskViewFilter } from './../../components/aspnetrolemask-view/interfaces/aspnetrolemask-view-filter.interface';
import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


@Injectable({
  providedIn: 'root'
})
export class AspnetrolemaskViewService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
       this.serviceUrl = this.appGlblSettings.getWebApiPrefix('aspnetrolemaskView') + 'aspnetrolemaskviewwebapi';  
    }


    // 
    // HowTo:
    //
    // this.serviceRefInYourCode.getall().subscibe(value =>{
    //    // handling value of type IaspnetrolemaskView[] 
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getall(): Observable<IaspnetrolemaskView[]> {

        return this.http.get<IaspnetrolemaskView[]>(this.serviceUrl+'/getall');
        //    .pipe(
        //        catchError(this.handleError('getall', []))
        //    );
    }



    // 
    // HowTo: flt is of type IaspnetrolemaskViewFilter 
    //
    // this.serviceRefInYourCode.getwithfilter(flt).subscibe(value =>{
    //    // handling value of type IaspnetrolemaskViewPage
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getwithfilter(filter: IaspnetrolemaskViewFilter): Observable<IaspnetrolemaskViewPage> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof filter === 'undefined')) {
            if (!(filter === null )) {
                if (!(typeof filter.roleName === 'undefined')) {
                    if ( Array.isArray(filter.roleName )) {
                        let hasNull: boolean = false;
                        filter.roleName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('roleName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('roleName', '');
                        }
                    } // if ( Array.isArray(filter.roleName ))
                } // if (!(typeof filter.roleName === 'undefined'))
                if (!(typeof filter.roleDescription === 'undefined')) {
                    if ( Array.isArray(filter.roleDescription )) {
                        let hasNull: boolean = false;
                        filter.roleDescription.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('roleDescription', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('roleDescription', '');
                        }
                    } // if ( Array.isArray(filter.roleDescription ))
                } // if (!(typeof filter.roleDescription === 'undefined'))


                if (!(typeof  filter.roleNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.roleNameOprtr )) {
                        filter.roleNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('roleNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('roleNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.roleNameOprtr))
                } // if (!(typeof  filter.roleNameOprtr === 'undefined'))
                if (!(typeof  filter.roleDescriptionOprtr === 'undefined')) {
                    if (Array.isArray(filter.roleDescriptionOprtr )) {
                        filter.roleDescriptionOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('roleDescriptionOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('roleDescriptionOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.roleDescriptionOprtr))
                } // if (!(typeof  filter.roleDescriptionOprtr === 'undefined'))

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
        return this.http.get<IaspnetrolemaskViewPage>(this.serviceUrl+'/getwithfilter', options);
          //    .pipe(
          //        catchError(this.handleError('getwithfilter', []))
          //    );
    }

    // 
    // HowTo: {prm1, prm2, ..., prmN} -- primary key
    //
    // this.serviceRefInYourCode.getone(prm1, prm2, ..., prmN ).subscibe(value =>{
    //    // handling value of type IaspnetrolemaskView
    // },
    // error => {
    //    // handling error 
    // });
    // 

    getone(roleName: string | null ): Observable<IaspnetrolemaskView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof roleName === 'undefined')) {
            if (!(roleName === null)) {
                params = params.append('roleName', roleName);
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.get<IaspnetrolemaskView>(this.serviceUrl+'/getone', options);
          // .pipe(
          //   catchError(this.handleError('getone', []))
          // );
    }

    // 
    // HowTo: item is of type IaspnetrolemaskView 
    //
    // this.serviceRefInYourCode.updateone(item).subscibe(value =>{
    //    // handling value of type IaspnetrolemaskView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    updateone(item: IaspnetrolemaskView): Observable<IaspnetrolemaskView> {

        return this.http.put<IaspnetrolemaskView>(this.serviceUrl+'/updateone', item); //, httpOptions);
        //  .pipe(
        //    catchError(this.handleError('updateone', item))
        //  );
    }

    // 
    // HowTo: item is of type IaspnetrolemaskView 
    //
    // this.serviceRefInYourCode.addone(item).subscibe(value =>{
    //    // handling value of type IaspnetrolemaskView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    addone(item: IaspnetrolemaskView): Observable<IaspnetrolemaskView> {
        return this.http.post<IaspnetrolemaskView>(this.serviceUrl+'/addone', item); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('addone', item))
        // );   
    }

    // 
    // HowTo: item is of type IaspnetrolemaskView 
    //
    // this.serviceRefInYourCode.deleteone(item).subscibe(value =>{
    //    // handling value of type IaspnetrolemaskView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    deleteone(roleName: string | null ): Observable<IaspnetrolemaskView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof roleName === 'undefined')) {
            if (!(roleName === null)) {
                params = params.append('roleName', roleName);
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.delete<IaspnetrolemaskView>(this.serviceUrl+'/deleteone', options); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('deleteone', item))
        // );   
    }

    src2dest(src: IaspnetrolemaskView, dest: IaspnetrolemaskView) {
        if ((typeof src === 'undefined') || (typeof dest === 'undefined')) return;
        if ((src === null) || (dest === null)) return;
        if(typeof src.roleName === 'undefined') {
            dest['roleName'] = null;
        } else {
            dest['roleName'] = src.roleName;
        }
        if(typeof src.roleDescription === 'undefined') {
            dest['roleDescription'] = null;
        } else {
            dest['roleDescription'] = src.roleDescription;
        }
        if(typeof src.mask0 === 'undefined') {
            dest['mask0'] = null;
        } else {
            dest['mask0'] = src.mask0;
        }
        if(typeof src.mask1 === 'undefined') {
            dest['mask1'] = null;
        } else {
            dest['mask1'] = src.mask1;
        }
        if(typeof src.mask2 === 'undefined') {
            dest['mask2'] = null;
        } else {
            dest['mask2'] = src.mask2;
        }
        if(typeof src.mask3 === 'undefined') {
            dest['mask3'] = null;
        } else {
            dest['mask3'] = src.mask3;
        }
        if(typeof src.mask4 === 'undefined') {
            dest['mask4'] = null;
        } else {
            dest['mask4'] = src.mask4;
        }
        if(typeof src.mask5 === 'undefined') {
            dest['mask5'] = null;
        } else {
            dest['mask5'] = src.mask5;
        }
        if(typeof src.mask6 === 'undefined') {
            dest['mask6'] = null;
        } else {
            dest['mask6'] = src.mask6;
        }
        if(typeof src.mask7 === 'undefined') {
            dest['mask7'] = null;
        } else {
            dest['mask7'] = src.mask7;
        }
        if(typeof src.mask8 === 'undefined') {
            dest['mask8'] = null;
        } else {
            dest['mask8'] = src.mask8;
        }
        if(typeof src.mask9 === 'undefined') {
            dest['mask9'] = null;
        } else {
            dest['mask9'] = src.mask9;
        }
        if(typeof src.maskA === 'undefined') {
            dest['maskA'] = null;
        } else {
            dest['maskA'] = src.maskA;
        }
        if(typeof src.maskB === 'undefined') {
            dest['maskB'] = null;
        } else {
            dest['maskB'] = src.maskB;
        }
        if(typeof src.maskC === 'undefined') {
            dest['maskC'] = null;
        } else {
            dest['maskC'] = src.maskC;
        }
        if(typeof src.maskD === 'undefined') {
            dest['maskD'] = null;
        } else {
            dest['maskD'] = src.maskD;
        }
        if(typeof src.dask0 === 'undefined') {
            dest['dask0'] = null;
        } else {
            dest['dask0'] = src.dask0;
        }
        if(typeof src.dask1 === 'undefined') {
            dest['dask1'] = null;
        } else {
            dest['dask1'] = src.dask1;
        }
        if(typeof src.dask2 === 'undefined') {
            dest['dask2'] = null;
        } else {
            dest['dask2'] = src.dask2;
        }
        
    }


}

