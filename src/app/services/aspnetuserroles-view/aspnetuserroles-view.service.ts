
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IaspnetuserrolesView } from './../../components/aspnetuserroles-view/interfaces/aspnetuserroles-view.interface';
import { IaspnetuserrolesViewPage } from './../../components/aspnetuserroles-view/interfaces/aspnetuserroles-view-page.interface';
import { IaspnetuserrolesViewFilter } from './../../components/aspnetuserroles-view/interfaces/aspnetuserroles-view-filter.interface';
import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


@Injectable({
  providedIn: 'root'
})
export class AspnetuserrolesViewService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
       this.serviceUrl = this.appGlblSettings.getWebApiPrefix('aspnetuserrolesView') + 'aspnetuserrolesviewwebapi';  
    }


    // 
    // HowTo:
    //
    // this.serviceRefInYourCode.getall().subscibe(value =>{
    //    // handling value of type IaspnetuserrolesView[] 
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getall(): Observable<IaspnetuserrolesView[]> {

        return this.http.get<IaspnetuserrolesView[]>(this.serviceUrl+'/getall');
        //    .pipe(
        //        catchError(this.handleError('getall', []))
        //    );
    }



    // 
    // HowTo: flt is of type IaspnetuserrolesViewFilter 
    //
    // this.serviceRefInYourCode.getwithfilter(flt).subscibe(value =>{
    //    // handling value of type IaspnetuserrolesViewPage
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getwithfilter(filter: IaspnetuserrolesViewFilter): Observable<IaspnetuserrolesViewPage> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof filter === 'undefined')) {
            if (!(filter === null )) {
                if (!(typeof filter.userId === 'undefined')) {
                    if ( Array.isArray(filter.userId )) {
                        let hasNull: boolean = false;
                        filter.userId.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('userId', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('userId', '');
                        }
                    } // if ( Array.isArray(filter.userId ))
                } // if (!(typeof filter.userId === 'undefined'))
                if (!(typeof filter.roleId === 'undefined')) {
                    if ( Array.isArray(filter.roleId )) {
                        let hasNull: boolean = false;
                        filter.roleId.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('roleId', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('roleId', '');
                        }
                    } // if ( Array.isArray(filter.roleId ))
                } // if (!(typeof filter.roleId === 'undefined'))
                if (!(typeof filter.uUserName === 'undefined')) {
                    if ( Array.isArray(filter.uUserName )) {
                        let hasNull: boolean = false;
                        filter.uUserName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('uUserName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('uUserName', '');
                        }
                    } // if ( Array.isArray(filter.uUserName ))
                } // if (!(typeof filter.uUserName === 'undefined'))
                if (!(typeof filter.rName === 'undefined')) {
                    if ( Array.isArray(filter.rName )) {
                        let hasNull: boolean = false;
                        filter.rName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('rName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('rName', '');
                        }
                    } // if ( Array.isArray(filter.rName ))
                } // if (!(typeof filter.rName === 'undefined'))


                if (!(typeof  filter.userIdOprtr === 'undefined')) {
                    if (Array.isArray(filter.userIdOprtr )) {
                        filter.userIdOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('userIdOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('userIdOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.userIdOprtr))
                } // if (!(typeof  filter.userIdOprtr === 'undefined'))
                if (!(typeof  filter.roleIdOprtr === 'undefined')) {
                    if (Array.isArray(filter.roleIdOprtr )) {
                        filter.roleIdOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('roleIdOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('roleIdOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.roleIdOprtr))
                } // if (!(typeof  filter.roleIdOprtr === 'undefined'))
                if (!(typeof  filter.uUserNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.uUserNameOprtr )) {
                        filter.uUserNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('uUserNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('uUserNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.uUserNameOprtr))
                } // if (!(typeof  filter.uUserNameOprtr === 'undefined'))
                if (!(typeof  filter.rNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.rNameOprtr )) {
                        filter.rNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('rNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('rNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.rNameOprtr))
                } // if (!(typeof  filter.rNameOprtr === 'undefined'))

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
        return this.http.get<IaspnetuserrolesViewPage>(this.serviceUrl+'/getwithfilter', options);
          //    .pipe(
          //        catchError(this.handleError('getwithfilter', []))
          //    );
    }

    // 
    // HowTo: {prm1, prm2, ..., prmN} -- primary key
    //
    // this.serviceRefInYourCode.getone(prm1, prm2, ..., prmN ).subscibe(value =>{
    //    // handling value of type IaspnetuserrolesView
    // },
    // error => {
    //    // handling error 
    // });
    // 

    getone(userId: string | null , roleId: string | null ): Observable<IaspnetuserrolesView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof userId === 'undefined')) {
            if (!(userId === null)) {
                params = params.append('userId', userId);
                hasFilter = true;
            }
        }
        if (!(typeof roleId === 'undefined')) {
            if (!(roleId === null)) {
                params = params.append('roleId', roleId);
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.get<IaspnetuserrolesView>(this.serviceUrl+'/getone', options);
          // .pipe(
          //   catchError(this.handleError('getone', []))
          // );
    }

    // 
    // HowTo: item is of type IaspnetuserrolesView 
    //
    // this.serviceRefInYourCode.updateone(item).subscibe(value =>{
    //    // handling value of type IaspnetuserrolesView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    updateone(item: IaspnetuserrolesView): Observable<IaspnetuserrolesView> {

        return this.http.put<IaspnetuserrolesView>(this.serviceUrl+'/updateone', item); //, httpOptions);
        //  .pipe(
        //    catchError(this.handleError('updateone', item))
        //  );
    }

    // 
    // HowTo: item is of type IaspnetuserrolesView 
    //
    // this.serviceRefInYourCode.addone(item).subscibe(value =>{
    //    // handling value of type IaspnetuserrolesView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    addone(item: IaspnetuserrolesView): Observable<IaspnetuserrolesView> {
        return this.http.post<IaspnetuserrolesView>(this.serviceUrl+'/addone', item); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('addone', item))
        // );   
    }

    // 
    // HowTo: item is of type IaspnetuserrolesView 
    //
    // this.serviceRefInYourCode.deleteone(item).subscibe(value =>{
    //    // handling value of type IaspnetuserrolesView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    deleteone(userId: string | null , roleId: string | null ): Observable<IaspnetuserrolesView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof userId === 'undefined')) {
            if (!(userId === null)) {
                params = params.append('userId', userId);
                hasFilter = true;
            }
        }
        if (!(typeof roleId === 'undefined')) {
            if (!(roleId === null)) {
                params = params.append('roleId', roleId);
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.delete<IaspnetuserrolesView>(this.serviceUrl+'/deleteone', options); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('deleteone', item))
        // );   
    }

    src2dest(src: IaspnetuserrolesView, dest: IaspnetuserrolesView) {
        if ((typeof src === 'undefined') || (typeof dest === 'undefined')) return;
        if ((src === null) || (dest === null)) return;
        if(typeof src.userId === 'undefined') {
            dest['userId'] = null;
        } else {
            dest['userId'] = src.userId;
        }
        if(typeof src.roleId === 'undefined') {
            dest['roleId'] = null;
        } else {
            dest['roleId'] = src.roleId;
        }
        if(typeof src.uUserName === 'undefined') {
            dest['uUserName'] = null;
        } else {
            dest['uUserName'] = src.uUserName;
        }
        if(typeof src.rName === 'undefined') {
            dest['rName'] = null;
        } else {
            dest['rName'] = src.rName;
        }
        
    }


}

