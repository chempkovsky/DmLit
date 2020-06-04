
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IaspnetroleView } from './../../components/aspnetrole-view/interfaces/aspnetrole-view.interface';
import { IaspnetroleViewPage } from './../../components/aspnetrole-view/interfaces/aspnetrole-view-page.interface';
import { IaspnetroleViewFilter } from './../../components/aspnetrole-view/interfaces/aspnetrole-view-filter.interface';
import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


@Injectable({
  providedIn: 'root'
})
export class AspnetroleViewService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
       this.serviceUrl = this.appGlblSettings.getWebApiPrefix('aspnetroleView') + 'aspnetroleviewwebapi';  
    }


    // 
    // HowTo:
    //
    // this.serviceRefInYourCode.getall().subscibe(value =>{
    //    // handling value of type IaspnetroleView[] 
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getall(): Observable<IaspnetroleView[]> {

        return this.http.get<IaspnetroleView[]>(this.serviceUrl+'/getall');
        //    .pipe(
        //        catchError(this.handleError('getall', []))
        //    );
    }



    // 
    // HowTo: flt is of type IaspnetroleViewFilter 
    //
    // this.serviceRefInYourCode.getwithfilter(flt).subscibe(value =>{
    //    // handling value of type IaspnetroleViewPage
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getwithfilter(filter: IaspnetroleViewFilter): Observable<IaspnetroleViewPage> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof filter === 'undefined')) {
            if (!(filter === null )) {
                if (!(typeof filter.id === 'undefined')) {
                    if ( Array.isArray(filter.id )) {
                        let hasNull: boolean = false;
                        filter.id.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('id', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('id', '');
                        }
                    } // if ( Array.isArray(filter.id ))
                } // if (!(typeof filter.id === 'undefined'))
                if (!(typeof filter.name === 'undefined')) {
                    if ( Array.isArray(filter.name )) {
                        let hasNull: boolean = false;
                        filter.name.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('name', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('name', '');
                        }
                    } // if ( Array.isArray(filter.name ))
                } // if (!(typeof filter.name === 'undefined'))


                if (!(typeof  filter.idOprtr === 'undefined')) {
                    if (Array.isArray(filter.idOprtr )) {
                        filter.idOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('idOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('idOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.idOprtr))
                } // if (!(typeof  filter.idOprtr === 'undefined'))
                if (!(typeof  filter.nameOprtr === 'undefined')) {
                    if (Array.isArray(filter.nameOprtr )) {
                        filter.nameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('nameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('nameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.nameOprtr))
                } // if (!(typeof  filter.nameOprtr === 'undefined'))

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
        return this.http.get<IaspnetroleViewPage>(this.serviceUrl+'/getwithfilter', options);
          //    .pipe(
          //        catchError(this.handleError('getwithfilter', []))
          //    );
    }

    // 
    // HowTo: {prm1, prm2, ..., prmN} -- primary key
    //
    // this.serviceRefInYourCode.getone(prm1, prm2, ..., prmN ).subscibe(value =>{
    //    // handling value of type IaspnetroleView
    // },
    // error => {
    //    // handling error 
    // });
    // 

    getone(id: string | null ): Observable<IaspnetroleView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof id === 'undefined')) {
            if (!(id === null)) {
                params = params.append('id', id);
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.get<IaspnetroleView>(this.serviceUrl+'/getone', options);
          // .pipe(
          //   catchError(this.handleError('getone', []))
          // );
    }

    // 
    // HowTo: item is of type IaspnetroleView 
    //
    // this.serviceRefInYourCode.updateone(item).subscibe(value =>{
    //    // handling value of type IaspnetroleView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    updateone(item: IaspnetroleView): Observable<IaspnetroleView> {

        return this.http.put<IaspnetroleView>(this.serviceUrl+'/updateone', item); //, httpOptions);
        //  .pipe(
        //    catchError(this.handleError('updateone', item))
        //  );
    }

    // 
    // HowTo: item is of type IaspnetroleView 
    //
    // this.serviceRefInYourCode.addone(item).subscibe(value =>{
    //    // handling value of type IaspnetroleView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    addone(item: IaspnetroleView): Observable<IaspnetroleView> {
        if(!(typeof item === 'undefined')) {
            if(!(item === null)) {
                if(typeof item.id === 'undefined') {
                    item['id'] = '0';
                }
                if(item.id === null) {
                    item['id'] = '0';
                }
            }
        }
        return this.http.post<IaspnetroleView>(this.serviceUrl+'/addone', item); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('addone', item))
        // );   
    }

    // 
    // HowTo: item is of type IaspnetroleView 
    //
    // this.serviceRefInYourCode.deleteone(item).subscibe(value =>{
    //    // handling value of type IaspnetroleView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    deleteone(id: string | null ): Observable<IaspnetroleView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof id === 'undefined')) {
            if (!(id === null)) {
                params = params.append('id', id);
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.delete<IaspnetroleView>(this.serviceUrl+'/deleteone', options); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('deleteone', item))
        // );   
    }

    src2dest(src: IaspnetroleView, dest: IaspnetroleView) {
        if ((typeof src === 'undefined') || (typeof dest === 'undefined')) return;
        if ((src === null) || (dest === null)) return;
        if(typeof src.id === 'undefined') {
            dest['id'] = null;
        } else {
            dest['id'] = src.id;
        }
        if(typeof src.name === 'undefined') {
            dest['name'] = null;
        } else {
            dest['name'] = src.name;
        }
        
    }


}

