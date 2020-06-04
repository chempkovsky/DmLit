
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { IaspnetmodelView } from './../../components/aspnetmodel-view/interfaces/aspnetmodel-view.interface';
import { IaspnetmodelViewPage } from './../../components/aspnetmodel-view/interfaces/aspnetmodel-view-page.interface';
import { IaspnetmodelViewFilter } from './../../components/aspnetmodel-view/interfaces/aspnetmodel-view-filter.interface';
import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


@Injectable({
  providedIn: 'root'
})
export class AspnetmodelViewService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
       this.serviceUrl = this.appGlblSettings.getWebApiPrefix('aspnetmodelView') + 'aspnetmodelviewwebapi';  
    }


    // 
    // HowTo:
    //
    // this.serviceRefInYourCode.getall().subscibe(value =>{
    //    // handling value of type IaspnetmodelView[] 
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getall(): Observable<IaspnetmodelView[]> {

        return this.http.get<IaspnetmodelView[]>(this.serviceUrl+'/getall');
        //    .pipe(
        //        catchError(this.handleError('getall', []))
        //    );
    }



    // 
    // HowTo: flt is of type IaspnetmodelViewFilter 
    //
    // this.serviceRefInYourCode.getwithfilter(flt).subscibe(value =>{
    //    // handling value of type IaspnetmodelViewPage
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getwithfilter(filter: IaspnetmodelViewFilter): Observable<IaspnetmodelViewPage> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof filter === 'undefined')) {
            if (!(filter === null )) {
                if (!(typeof filter.modelPk === 'undefined')) {
                    if ( Array.isArray(filter.modelPk )) {
                        filter.modelPk.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('modelPk', value.toString());
                                    hasFilter = true;
                                } 
                            }
                        });
                    } // if ( Array.isArray(filter.modelPk ))
                } // if (!(typeof filter.modelPk === 'undefined'))
                if (!(typeof filter.modelName === 'undefined')) {
                    if ( Array.isArray(filter.modelName )) {
                        let hasNull: boolean = false;
                        filter.modelName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('modelName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('modelName', '');
                        }
                    } // if ( Array.isArray(filter.modelName ))
                } // if (!(typeof filter.modelName === 'undefined'))
                if (!(typeof filter.modelDescription === 'undefined')) {
                    if ( Array.isArray(filter.modelDescription )) {
                        let hasNull: boolean = false;
                        filter.modelDescription.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('modelDescription', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('modelDescription', '');
                        }
                    } // if ( Array.isArray(filter.modelDescription ))
                } // if (!(typeof filter.modelDescription === 'undefined'))


                if (!(typeof  filter.modelPkOprtr === 'undefined')) {
                    if (Array.isArray(filter.modelPkOprtr )) {
                        filter.modelPkOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('modelPkOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('modelPkOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.modelPkOprtr))
                } // if (!(typeof  filter.modelPkOprtr === 'undefined'))
                if (!(typeof  filter.modelNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.modelNameOprtr )) {
                        filter.modelNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('modelNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('modelNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.modelNameOprtr))
                } // if (!(typeof  filter.modelNameOprtr === 'undefined'))
                if (!(typeof  filter.modelDescriptionOprtr === 'undefined')) {
                    if (Array.isArray(filter.modelDescriptionOprtr )) {
                        filter.modelDescriptionOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('modelDescriptionOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('modelDescriptionOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.modelDescriptionOprtr))
                } // if (!(typeof  filter.modelDescriptionOprtr === 'undefined'))

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
        return this.http.get<IaspnetmodelViewPage>(this.serviceUrl+'/getwithfilter', options);
          //    .pipe(
          //        catchError(this.handleError('getwithfilter', []))
          //    );
    }

    // 
    // HowTo: {prm1, prm2, ..., prmN} -- primary key
    //
    // this.serviceRefInYourCode.getone(prm1, prm2, ..., prmN ).subscibe(value =>{
    //    // handling value of type IaspnetmodelView
    // },
    // error => {
    //    // handling error 
    // });
    // 

    getone(modelPk: number ): Observable<IaspnetmodelView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof modelPk === 'undefined')) {
            if (!(modelPk === null)) {
                params = params.append('modelPk', modelPk.toString());
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.get<IaspnetmodelView>(this.serviceUrl+'/getone', options);
          // .pipe(
          //   catchError(this.handleError('getone', []))
          // );
    }

    // 
    // HowTo: item is of type IaspnetmodelView 
    //
    // this.serviceRefInYourCode.updateone(item).subscibe(value =>{
    //    // handling value of type IaspnetmodelView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    updateone(item: IaspnetmodelView): Observable<IaspnetmodelView> {

        return this.http.put<IaspnetmodelView>(this.serviceUrl+'/updateone', item); //, httpOptions);
        //  .pipe(
        //    catchError(this.handleError('updateone', item))
        //  );
    }

    // 
    // HowTo: item is of type IaspnetmodelView 
    //
    // this.serviceRefInYourCode.addone(item).subscibe(value =>{
    //    // handling value of type IaspnetmodelView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    addone(item: IaspnetmodelView): Observable<IaspnetmodelView> {
        return this.http.post<IaspnetmodelView>(this.serviceUrl+'/addone', item); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('addone', item))
        // );   
    }

    // 
    // HowTo: item is of type IaspnetmodelView 
    //
    // this.serviceRefInYourCode.deleteone(item).subscibe(value =>{
    //    // handling value of type IaspnetmodelView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    deleteone(modelPk: number ): Observable<IaspnetmodelView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof modelPk === 'undefined')) {
            if (!(modelPk === null)) {
                params = params.append('modelPk', modelPk.toString());
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.delete<IaspnetmodelView>(this.serviceUrl+'/deleteone', options); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('deleteone', item))
        // );   
    }

    src2dest(src: IaspnetmodelView, dest: IaspnetmodelView) {
        if ((typeof src === 'undefined') || (typeof dest === 'undefined')) return;
        if ((src === null) || (dest === null)) return;
        if(typeof src.modelPk === 'undefined') {
            dest['modelPk'] = null;
        } else {
            dest['modelPk'] = src.modelPk;
        }
        if(typeof src.modelName === 'undefined') {
            dest['modelName'] = null;
        } else {
            dest['modelName'] = src.modelName;
        }
        if(typeof src.modelDescription === 'undefined') {
            dest['modelDescription'] = null;
        } else {
            dest['modelDescription'] = src.modelDescription;
        }
        
    }


}

