
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IaspnetuserView } from './../../components/aspnetuser-view/interfaces/aspnetuser-view.interface';
import { IaspnetuserViewPage } from './../../components/aspnetuser-view/interfaces/aspnetuser-view-page.interface';
import { IaspnetuserViewFilter } from './../../components/aspnetuser-view/interfaces/aspnetuser-view-filter.interface';
import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


@Injectable({
  providedIn: 'root'
})
export class AspnetuserViewService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
       this.serviceUrl = this.appGlblSettings.getWebApiPrefix('aspnetuserView') + 'aspnetuserviewwebapi';  
    }


    // 
    // HowTo:
    //
    // this.serviceRefInYourCode.getall().subscibe(value =>{
    //    // handling value of type IaspnetuserView[] 
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getall(): Observable<IaspnetuserView[]> {

        return this.http.get<IaspnetuserView[]>(this.serviceUrl+'/getall');
        //    .pipe(
        //        catchError(this.handleError('getall', []))
        //    );
    }



    // 
    // HowTo: flt is of type IaspnetuserViewFilter 
    //
    // this.serviceRefInYourCode.getwithfilter(flt).subscibe(value =>{
    //    // handling value of type IaspnetuserViewPage
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getwithfilter(filter: IaspnetuserViewFilter): Observable<IaspnetuserViewPage> {
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
                if (!(typeof filter.email === 'undefined')) {
                    if ( Array.isArray(filter.email )) {
                        let hasNull: boolean = false;
                        filter.email.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('email', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('email', '');
                        }
                    } // if ( Array.isArray(filter.email ))
                } // if (!(typeof filter.email === 'undefined'))
                if (!(typeof filter.phoneNumber === 'undefined')) {
                    if ( Array.isArray(filter.phoneNumber )) {
                        let hasNull: boolean = false;
                        filter.phoneNumber.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('phoneNumber', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('phoneNumber', '');
                        }
                    } // if ( Array.isArray(filter.phoneNumber ))
                } // if (!(typeof filter.phoneNumber === 'undefined'))
                if (!(typeof filter.lockoutEndDateUtc === 'undefined')) {
                    if ( Array.isArray(filter.lockoutEndDateUtc )) {
                        let hasNull: boolean = false;
                        filter.lockoutEndDateUtc.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('lockoutEndDateUtc', value.toString());
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('lockoutEndDateUtc', '');
                        }
                    } // if ( Array.isArray(filter.lockoutEndDateUtc ))
                } // if (!(typeof filter.lockoutEndDateUtc === 'undefined'))
                if (!(typeof filter.userName === 'undefined')) {
                    if ( Array.isArray(filter.userName )) {
                        let hasNull: boolean = false;
                        filter.userName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('userName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('userName', '');
                        }
                    } // if ( Array.isArray(filter.userName ))
                } // if (!(typeof filter.userName === 'undefined'))


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
                if (!(typeof  filter.emailOprtr === 'undefined')) {
                    if (Array.isArray(filter.emailOprtr )) {
                        filter.emailOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('emailOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('emailOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.emailOprtr))
                } // if (!(typeof  filter.emailOprtr === 'undefined'))
                if (!(typeof  filter.phoneNumberOprtr === 'undefined')) {
                    if (Array.isArray(filter.phoneNumberOprtr )) {
                        filter.phoneNumberOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('phoneNumberOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('phoneNumberOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.phoneNumberOprtr))
                } // if (!(typeof  filter.phoneNumberOprtr === 'undefined'))
                if (!(typeof  filter.lockoutEndDateUtcOprtr === 'undefined')) {
                    if (Array.isArray(filter.lockoutEndDateUtcOprtr )) {
                        filter.lockoutEndDateUtcOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('lockoutEndDateUtcOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('lockoutEndDateUtcOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.lockoutEndDateUtcOprtr))
                } // if (!(typeof  filter.lockoutEndDateUtcOprtr === 'undefined'))
                if (!(typeof  filter.userNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.userNameOprtr )) {
                        filter.userNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('userNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('userNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.userNameOprtr))
                } // if (!(typeof  filter.userNameOprtr === 'undefined'))

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
        return this.http.get<IaspnetuserViewPage>(this.serviceUrl+'/getwithfilter', options);
          //    .pipe(
          //        catchError(this.handleError('getwithfilter', []))
          //    );
    }

    // 
    // HowTo: {prm1, prm2, ..., prmN} -- primary key
    //
    // this.serviceRefInYourCode.getone(prm1, prm2, ..., prmN ).subscibe(value =>{
    //    // handling value of type IaspnetuserView
    // },
    // error => {
    //    // handling error 
    // });
    // 

    getone(id: string | null ): Observable<IaspnetuserView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof id === 'undefined')) {
            if (!(id === null)) {
                params = params.append('id', id);
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.get<IaspnetuserView>(this.serviceUrl+'/getone', options);
          // .pipe(
          //   catchError(this.handleError('getone', []))
          // );
    }

    // 
    // HowTo: item is of type IaspnetuserView 
    //
    // this.serviceRefInYourCode.updateone(item).subscibe(value =>{
    //    // handling value of type IaspnetuserView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    updateone(item: IaspnetuserView): Observable<IaspnetuserView> {

        return this.http.put<IaspnetuserView>(this.serviceUrl+'/updateone', item); //, httpOptions);
        //  .pipe(
        //    catchError(this.handleError('updateone', item))
        //  );
    }

    // 
    // HowTo: item is of type IaspnetuserView 
    //
    // this.serviceRefInYourCode.addone(item).subscibe(value =>{
    //    // handling value of type IaspnetuserView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    addone(item: IaspnetuserView): Observable<IaspnetuserView> {
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
        return this.http.post<IaspnetuserView>(this.serviceUrl+'/addone', item); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('addone', item))
        // );   
    }

    // 
    // HowTo: item is of type IaspnetuserView 
    //
    // this.serviceRefInYourCode.deleteone(item).subscibe(value =>{
    //    // handling value of type IaspnetuserView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    deleteone(id: string | null ): Observable<IaspnetuserView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof id === 'undefined')) {
            if (!(id === null)) {
                params = params.append('id', id);
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.delete<IaspnetuserView>(this.serviceUrl+'/deleteone', options); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('deleteone', item))
        // );   
    }

    src2dest(src: IaspnetuserView, dest: IaspnetuserView) {
        if ((typeof src === 'undefined') || (typeof dest === 'undefined')) return;
        if ((src === null) || (dest === null)) return;
        if(typeof src.id === 'undefined') {
            dest['id'] = null;
        } else {
            dest['id'] = src.id;
        }
        if(typeof src.email === 'undefined') {
            dest['email'] = null;
        } else {
            dest['email'] = src.email;
        }
        if(typeof src.emailConfirmed === 'undefined') {
            dest['emailConfirmed'] = null;
        } else {
            dest['emailConfirmed'] = src.emailConfirmed;
        }
        if(typeof src.phoneNumber === 'undefined') {
            dest['phoneNumber'] = null;
        } else {
            dest['phoneNumber'] = src.phoneNumber;
        }
        if(typeof src.phoneNumberConfirmed === 'undefined') {
            dest['phoneNumberConfirmed'] = null;
        } else {
            dest['phoneNumberConfirmed'] = src.phoneNumberConfirmed;
        }
        if(typeof src.twoFactorEnabled === 'undefined') {
            dest['twoFactorEnabled'] = null;
        } else {
            dest['twoFactorEnabled'] = src.twoFactorEnabled;
        }
        if(typeof src.lockoutEndDateUtc === 'undefined') {
            dest['lockoutEndDateUtc'] = null;
        } else {
            dest['lockoutEndDateUtc'] = src.lockoutEndDateUtc;
        }
        if(typeof src.lockoutEnabled === 'undefined') {
            dest['lockoutEnabled'] = null;
        } else {
            dest['lockoutEnabled'] = src.lockoutEnabled;
        }
        if(typeof src.accessFailedCount === 'undefined') {
            dest['accessFailedCount'] = null;
        } else {
            dest['accessFailedCount'] = src.accessFailedCount;
        }
        if(typeof src.userName === 'undefined') {
            dest['userName'] = null;
        } else {
            dest['userName'] = src.userName;
        }
        
    }


}

