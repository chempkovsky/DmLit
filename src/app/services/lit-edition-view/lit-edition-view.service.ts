
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ILitEditionView } from './../../components/lit-edition-view/interfaces/lit-edition-view.interface';
import { ILitEditionViewPage } from './../../components/lit-edition-view/interfaces/lit-edition-view-page.interface';
import { ILitEditionViewFilter } from './../../components/lit-edition-view/interfaces/lit-edition-view-filter.interface';
import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


@Injectable({
  providedIn: 'root'
})
export class LitEditionViewService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
       this.serviceUrl = this.appGlblSettings.getWebApiPrefix('LitEditionView') + 'liteditionviewwebapi';  
    }


    // 
    // HowTo:
    //
    // this.serviceRefInYourCode.getall().subscibe(value =>{
    //    // handling value of type ILitEditionView[] 
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getall(): Observable<ILitEditionView[]> {

        return this.http.get<ILitEditionView[]>(this.serviceUrl+'/getall');
        //    .pipe(
        //        catchError(this.handleError('getall', []))
        //    );
    }



    // 
    // HowTo: flt is of type ILitEditionViewFilter 
    //
    // this.serviceRefInYourCode.getwithfilter(flt).subscibe(value =>{
    //    // handling value of type ILitEditionViewPage
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getwithfilter(filter: ILitEditionViewFilter): Observable<ILitEditionViewPage> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof filter === 'undefined')) {
            if (!(filter === null )) {
                if (!(typeof filter.editionId === 'undefined')) {
                    if ( Array.isArray(filter.editionId )) {
                        filter.editionId.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('editionId', value.toString());
                                    hasFilter = true;
                                } 
                            }
                        });
                    } // if ( Array.isArray(filter.editionId ))
                } // if (!(typeof filter.editionId === 'undefined'))
                if (!(typeof filter.editionName === 'undefined')) {
                    if ( Array.isArray(filter.editionName )) {
                        let hasNull: boolean = false;
                        filter.editionName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('editionName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('editionName', '');
                        }
                    } // if ( Array.isArray(filter.editionName ))
                } // if (!(typeof filter.editionName === 'undefined'))


                if (!(typeof  filter.editionIdOprtr === 'undefined')) {
                    if (Array.isArray(filter.editionIdOprtr )) {
                        filter.editionIdOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('editionIdOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('editionIdOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.editionIdOprtr))
                } // if (!(typeof  filter.editionIdOprtr === 'undefined'))
                if (!(typeof  filter.editionNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.editionNameOprtr )) {
                        filter.editionNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('editionNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('editionNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.editionNameOprtr))
                } // if (!(typeof  filter.editionNameOprtr === 'undefined'))

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
        return this.http.get<ILitEditionViewPage>(this.serviceUrl+'/getwithfilter', options);
          //    .pipe(
          //        catchError(this.handleError('getwithfilter', []))
          //    );
    }

    // 
    // HowTo: {prm1, prm2, ..., prmN} -- primary key
    //
    // this.serviceRefInYourCode.getone(prm1, prm2, ..., prmN ).subscibe(value =>{
    //    // handling value of type ILitEditionView
    // },
    // error => {
    //    // handling error 
    // });
    // 

    getone(editionId: number ): Observable<ILitEditionView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof editionId === 'undefined')) {
            if (!(editionId === null)) {
                params = params.append('editionId', editionId.toString());
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.get<ILitEditionView>(this.serviceUrl+'/getone', options);
          // .pipe(
          //   catchError(this.handleError('getone', []))
          // );
    }

    // 
    // HowTo: item is of type ILitEditionView 
    //
    // this.serviceRefInYourCode.updateone(item).subscibe(value =>{
    //    // handling value of type ILitEditionView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    updateone(item: ILitEditionView): Observable<ILitEditionView> {

        return this.http.put<ILitEditionView>(this.serviceUrl+'/updateone', item); //, httpOptions);
        //  .pipe(
        //    catchError(this.handleError('updateone', item))
        //  );
    }

    // 
    // HowTo: item is of type ILitEditionView 
    //
    // this.serviceRefInYourCode.addone(item).subscibe(value =>{
    //    // handling value of type ILitEditionView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    addone(item: ILitEditionView): Observable<ILitEditionView> {
        if(!(typeof item === 'undefined')) {
            if(!(item === null)) {
                if(typeof item.editionId === 'undefined') {
                    item['editionId'] = 0;
                }
                if(item.editionId === null) {
                    item['editionId'] = 0;
                }
            }
        }
        return this.http.post<ILitEditionView>(this.serviceUrl+'/addone', item); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('addone', item))
        // );   
    }

    // 
    // HowTo: item is of type ILitEditionView 
    //
    // this.serviceRefInYourCode.deleteone(item).subscibe(value =>{
    //    // handling value of type ILitEditionView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    deleteone(editionId: number ): Observable<ILitEditionView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof editionId === 'undefined')) {
            if (!(editionId === null)) {
                params = params.append('editionId', editionId.toString());
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.delete<ILitEditionView>(this.serviceUrl+'/deleteone', options); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('deleteone', item))
        // );   
    }

    src2dest(src: ILitEditionView, dest: ILitEditionView) {
        if ((typeof src === 'undefined') || (typeof dest === 'undefined')) return;
        if ((src === null) || (dest === null)) return;
        if(typeof src.editionId === 'undefined') {
            dest['editionId'] = null;
        } else {
            dest['editionId'] = src.editionId;
        }
        if(typeof src.editionName === 'undefined') {
            dest['editionName'] = null;
        } else {
            dest['editionName'] = src.editionName;
        }
        
    }


}

