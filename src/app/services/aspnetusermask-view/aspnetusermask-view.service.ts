
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IaspnetusermaskView } from './../../components/aspnetusermask-view/interfaces/aspnetusermask-view.interface';
import { IaspnetusermaskViewPage } from './../../components/aspnetusermask-view/interfaces/aspnetusermask-view-page.interface';
import { IaspnetusermaskViewFilter } from './../../components/aspnetusermask-view/interfaces/aspnetusermask-view-filter.interface';
import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


@Injectable({
  providedIn: 'root'
})
export class AspnetusermaskViewService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
       this.serviceUrl = this.appGlblSettings.getWebApiPrefix('aspnetusermaskView') + 'aspnetusermaskviewwebapi';  
    }



    // 
    // HowTo: flt is of type IaspnetusermaskViewFilter 
    //
    // this.serviceRefInYourCode.getwithfilter(flt).subscibe(value =>{
    //    // handling value of type IaspnetusermaskViewPage
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getwithfilter(filter: IaspnetusermaskViewFilter): Observable<IaspnetusermaskViewPage> {
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
        return this.http.get<IaspnetusermaskViewPage>(this.serviceUrl+'/getwithfilter', options);
          //    .pipe(
          //        catchError(this.handleError('getwithfilter', []))
          //    );
    }

    getcurrusermasks(): Observable<IaspnetusermaskViewPage> {
        const options = {};
        return this.http.get<IaspnetusermaskViewPage>(this.serviceUrl+'/getcurrusermasks', options);
    }


    src2array(src: IaspnetusermaskViewPage): Array<number> {
        if (typeof src === 'undefined') return [];
        if (src === null)  return [];
        if (typeof src.items === 'undefined') return [];
        if (!Array.isArray(src.items)) return [];
        if (src.items.length < 1) return [];
        let rslt: Array<number> = [];
        if (!(typeof src.items[0].mask0 === 'undefined')) {
            if (!(src.items[0].mask0 === null)) {
                rslt.push(src.items[0].mask0);
            }
        }
        if (!(typeof src.items[0].mask1 === 'undefined')) {
            if (!(src.items[0].mask1 === null)) {
                rslt.push(src.items[0].mask1);
            }
        }
        if (!(typeof src.items[0].mask2 === 'undefined')) {
            if (!(src.items[0].mask2 === null)) {
                rslt.push(src.items[0].mask2);
            }
        }
        if (!(typeof src.items[0].mask3 === 'undefined')) {
            if (!(src.items[0].mask3 === null)) {
                rslt.push(src.items[0].mask3);
            }
        }
        if (!(typeof src.items[0].mask4 === 'undefined')) {
            if (!(src.items[0].mask4 === null)) {
                rslt.push(src.items[0].mask4);
            }
        }
        if (!(typeof src.items[0].mask5 === 'undefined')) {
            if (!(src.items[0].mask5 === null)) {
                rslt.push(src.items[0].mask5);
            }
        }
        if (!(typeof src.items[0].mask6 === 'undefined')) {
            if (!(src.items[0].mask6 === null)) {
                rslt.push(src.items[0].mask6);
            }
        }
        if (!(typeof src.items[0].mask7 === 'undefined')) {
            if (!(src.items[0].mask7 === null)) {
                rslt.push(src.items[0].mask7);
            }
        }
        if (!(typeof src.items[0].mask8 === 'undefined')) {
            if (!(src.items[0].mask8 === null)) {
                rslt.push(src.items[0].mask8);
            }
        }
        if (!(typeof src.items[0].mask9 === 'undefined')) {
            if (!(src.items[0].mask9 === null)) {
                rslt.push(src.items[0].mask9);
            }
        }
        if (!(typeof src.items[0].maskA === 'undefined')) {
            if (!(src.items[0].maskA === null)) {
                rslt.push(src.items[0].maskA);
            }
        }
        if (!(typeof src.items[0].maskB === 'undefined')) {
            if (!(src.items[0].maskB === null)) {
                rslt.push(src.items[0].maskB);
            }
        }
        if (!(typeof src.items[0].maskC === 'undefined')) {
            if (!(src.items[0].maskC === null)) {
                rslt.push(src.items[0].maskC);
            }
        }
        if (!(typeof src.items[0].maskD === 'undefined')) {
            if (!(src.items[0].maskD === null)) {
                rslt.push(src.items[0].maskD);
            }
        }
        if (!(typeof src.items[0].dask0 === 'undefined')) {
            if (!(src.items[0].dask0 === null)) {
                rslt.push(src.items[0].dask0);
            }
        }
        if (!(typeof src.items[0].dask1 === 'undefined')) {
            if (!(src.items[0].dask1 === null)) {
                rslt.push(src.items[0].dask1);
            }
        }
        if (!(typeof src.items[0].dask2 === 'undefined')) {
            if (!(src.items[0].dask2 === null)) {
                rslt.push(src.items[0].dask2);
            }
        }
        
        return rslt;
    }
}

