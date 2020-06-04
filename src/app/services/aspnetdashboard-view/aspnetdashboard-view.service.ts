
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IaspnetdashboardView } from './../../components/aspnetdashboard-view/interfaces/aspnetdashboard-view.interface';
import { IaspnetdashboardViewPage } from './../../components/aspnetdashboard-view/interfaces/aspnetdashboard-view-page.interface';
import { IaspnetdashboardViewFilter } from './../../components/aspnetdashboard-view/interfaces/aspnetdashboard-view-filter.interface';
import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


@Injectable({
  providedIn: 'root'
})
export class AspnetdashboardViewService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
       this.serviceUrl = this.appGlblSettings.getWebApiPrefix('aspnetdashboardView') + 'aspnetdashboardviewwebapi';  
    }


    // 
    // HowTo:
    //
    // this.serviceRefInYourCode.getall().subscibe(value =>{
    //    // handling value of type IaspnetdashboardView[] 
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getall(): Observable<IaspnetdashboardView[]> {

        return this.http.get<IaspnetdashboardView[]>(this.serviceUrl+'/getall');
        //    .pipe(
        //        catchError(this.handleError('getall', []))
        //    );
    }



    // 
    // HowTo: flt is of type IaspnetdashboardViewFilter 
    //
    // this.serviceRefInYourCode.getwithfilter(flt).subscibe(value =>{
    //    // handling value of type IaspnetdashboardViewPage
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getwithfilter(filter: IaspnetdashboardViewFilter): Observable<IaspnetdashboardViewPage> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof filter === 'undefined')) {
            if (!(filter === null )) {
                if (!(typeof filter.dashboardPk === 'undefined')) {
                    if ( Array.isArray(filter.dashboardPk )) {
                        filter.dashboardPk.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('dashboardPk', value.toString());
                                    hasFilter = true;
                                } 
                            }
                        });
                    } // if ( Array.isArray(filter.dashboardPk ))
                } // if (!(typeof filter.dashboardPk === 'undefined'))
                if (!(typeof filter.dashboardName === 'undefined')) {
                    if ( Array.isArray(filter.dashboardName )) {
                        let hasNull: boolean = false;
                        filter.dashboardName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('dashboardName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('dashboardName', '');
                        }
                    } // if ( Array.isArray(filter.dashboardName ))
                } // if (!(typeof filter.dashboardName === 'undefined'))
                if (!(typeof filter.dashboardDescription === 'undefined')) {
                    if ( Array.isArray(filter.dashboardDescription )) {
                        let hasNull: boolean = false;
                        filter.dashboardDescription.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('dashboardDescription', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('dashboardDescription', '');
                        }
                    } // if ( Array.isArray(filter.dashboardDescription ))
                } // if (!(typeof filter.dashboardDescription === 'undefined'))


                if (!(typeof  filter.dashboardPkOprtr === 'undefined')) {
                    if (Array.isArray(filter.dashboardPkOprtr )) {
                        filter.dashboardPkOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('dashboardPkOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('dashboardPkOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.dashboardPkOprtr))
                } // if (!(typeof  filter.dashboardPkOprtr === 'undefined'))
                if (!(typeof  filter.dashboardNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.dashboardNameOprtr )) {
                        filter.dashboardNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('dashboardNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('dashboardNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.dashboardNameOprtr))
                } // if (!(typeof  filter.dashboardNameOprtr === 'undefined'))
                if (!(typeof  filter.dashboardDescriptionOprtr === 'undefined')) {
                    if (Array.isArray(filter.dashboardDescriptionOprtr )) {
                        filter.dashboardDescriptionOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('dashboardDescriptionOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('dashboardDescriptionOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.dashboardDescriptionOprtr))
                } // if (!(typeof  filter.dashboardDescriptionOprtr === 'undefined'))

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
        return this.http.get<IaspnetdashboardViewPage>(this.serviceUrl+'/getwithfilter', options);
          //    .pipe(
          //        catchError(this.handleError('getwithfilter', []))
          //    );
    }

    // 
    // HowTo: {prm1, prm2, ..., prmN} -- primary key
    //
    // this.serviceRefInYourCode.getone(prm1, prm2, ..., prmN ).subscibe(value =>{
    //    // handling value of type IaspnetdashboardView
    // },
    // error => {
    //    // handling error 
    // });
    // 

    getone(dashboardPk: number ): Observable<IaspnetdashboardView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof dashboardPk === 'undefined')) {
            if (!(dashboardPk === null)) {
                params = params.append('dashboardPk', dashboardPk.toString());
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.get<IaspnetdashboardView>(this.serviceUrl+'/getone', options);
          // .pipe(
          //   catchError(this.handleError('getone', []))
          // );
    }

    // 
    // HowTo: item is of type IaspnetdashboardView 
    //
    // this.serviceRefInYourCode.updateone(item).subscibe(value =>{
    //    // handling value of type IaspnetdashboardView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    updateone(item: IaspnetdashboardView): Observable<IaspnetdashboardView> {

        return this.http.put<IaspnetdashboardView>(this.serviceUrl+'/updateone', item); //, httpOptions);
        //  .pipe(
        //    catchError(this.handleError('updateone', item))
        //  );
    }

    // 
    // HowTo: item is of type IaspnetdashboardView 
    //
    // this.serviceRefInYourCode.addone(item).subscibe(value =>{
    //    // handling value of type IaspnetdashboardView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    addone(item: IaspnetdashboardView): Observable<IaspnetdashboardView> {
        return this.http.post<IaspnetdashboardView>(this.serviceUrl+'/addone', item); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('addone', item))
        // );   
    }

    // 
    // HowTo: item is of type IaspnetdashboardView 
    //
    // this.serviceRefInYourCode.deleteone(item).subscibe(value =>{
    //    // handling value of type IaspnetdashboardView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    deleteone(dashboardPk: number ): Observable<IaspnetdashboardView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof dashboardPk === 'undefined')) {
            if (!(dashboardPk === null)) {
                params = params.append('dashboardPk', dashboardPk.toString());
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.delete<IaspnetdashboardView>(this.serviceUrl+'/deleteone', options); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('deleteone', item))
        // );   
    }

    src2dest(src: IaspnetdashboardView, dest: IaspnetdashboardView) {
        if ((typeof src === 'undefined') || (typeof dest === 'undefined')) return;
        if ((src === null) || (dest === null)) return;
        if(typeof src.dashboardPk === 'undefined') {
            dest['dashboardPk'] = null;
        } else {
            dest['dashboardPk'] = src.dashboardPk;
        }
        if(typeof src.dashboardName === 'undefined') {
            dest['dashboardName'] = null;
        } else {
            dest['dashboardName'] = src.dashboardName;
        }
        if(typeof src.dashboardDescription === 'undefined') {
            dest['dashboardDescription'] = null;
        } else {
            dest['dashboardDescription'] = src.dashboardDescription;
        }
        
    }


}

