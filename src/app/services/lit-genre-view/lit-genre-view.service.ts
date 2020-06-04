
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ILitGenreView } from './../../components/lit-genre-view/interfaces/lit-genre-view.interface';
import { ILitGenreViewPage } from './../../components/lit-genre-view/interfaces/lit-genre-view-page.interface';
import { ILitGenreViewFilter } from './../../components/lit-genre-view/interfaces/lit-genre-view-filter.interface';
import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


@Injectable({
  providedIn: 'root'
})
export class LitGenreViewService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
       this.serviceUrl = this.appGlblSettings.getWebApiPrefix('LitGenreView') + 'litgenreviewwebapi';  
    }


    // 
    // HowTo:
    //
    // this.serviceRefInYourCode.getall().subscibe(value =>{
    //    // handling value of type ILitGenreView[] 
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getall(): Observable<ILitGenreView[]> {

        return this.http.get<ILitGenreView[]>(this.serviceUrl+'/getall');
        //    .pipe(
        //        catchError(this.handleError('getall', []))
        //    );
    }



    // 
    // HowTo: flt is of type ILitGenreViewFilter 
    //
    // this.serviceRefInYourCode.getwithfilter(flt).subscibe(value =>{
    //    // handling value of type ILitGenreViewPage
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getwithfilter(filter: ILitGenreViewFilter): Observable<ILitGenreViewPage> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof filter === 'undefined')) {
            if (!(filter === null )) {
                if (!(typeof filter.genreId === 'undefined')) {
                    if ( Array.isArray(filter.genreId )) {
                        filter.genreId.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('genreId', value.toString());
                                    hasFilter = true;
                                } 
                            }
                        });
                    } // if ( Array.isArray(filter.genreId ))
                } // if (!(typeof filter.genreId === 'undefined'))
                if (!(typeof filter.genreName === 'undefined')) {
                    if ( Array.isArray(filter.genreName )) {
                        let hasNull: boolean = false;
                        filter.genreName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('genreName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('genreName', '');
                        }
                    } // if ( Array.isArray(filter.genreName ))
                } // if (!(typeof filter.genreName === 'undefined'))


                if (!(typeof  filter.genreIdOprtr === 'undefined')) {
                    if (Array.isArray(filter.genreIdOprtr )) {
                        filter.genreIdOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('genreIdOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('genreIdOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.genreIdOprtr))
                } // if (!(typeof  filter.genreIdOprtr === 'undefined'))
                if (!(typeof  filter.genreNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.genreNameOprtr )) {
                        filter.genreNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('genreNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('genreNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.genreNameOprtr))
                } // if (!(typeof  filter.genreNameOprtr === 'undefined'))

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
        return this.http.get<ILitGenreViewPage>(this.serviceUrl+'/getwithfilter', options);
          //    .pipe(
          //        catchError(this.handleError('getwithfilter', []))
          //    );
    }

    // 
    // HowTo: {prm1, prm2, ..., prmN} -- primary key
    //
    // this.serviceRefInYourCode.getone(prm1, prm2, ..., prmN ).subscibe(value =>{
    //    // handling value of type ILitGenreView
    // },
    // error => {
    //    // handling error 
    // });
    // 

    getone(genreId: number ): Observable<ILitGenreView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof genreId === 'undefined')) {
            if (!(genreId === null)) {
                params = params.append('genreId', genreId.toString());
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.get<ILitGenreView>(this.serviceUrl+'/getone', options);
          // .pipe(
          //   catchError(this.handleError('getone', []))
          // );
    }

    // 
    // HowTo: item is of type ILitGenreView 
    //
    // this.serviceRefInYourCode.updateone(item).subscibe(value =>{
    //    // handling value of type ILitGenreView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    updateone(item: ILitGenreView): Observable<ILitGenreView> {

        return this.http.put<ILitGenreView>(this.serviceUrl+'/updateone', item); //, httpOptions);
        //  .pipe(
        //    catchError(this.handleError('updateone', item))
        //  );
    }

    // 
    // HowTo: item is of type ILitGenreView 
    //
    // this.serviceRefInYourCode.addone(item).subscibe(value =>{
    //    // handling value of type ILitGenreView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    addone(item: ILitGenreView): Observable<ILitGenreView> {
        return this.http.post<ILitGenreView>(this.serviceUrl+'/addone', item); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('addone', item))
        // );   
    }

    // 
    // HowTo: item is of type ILitGenreView 
    //
    // this.serviceRefInYourCode.deleteone(item).subscibe(value =>{
    //    // handling value of type ILitGenreView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    deleteone(genreId: number ): Observable<ILitGenreView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof genreId === 'undefined')) {
            if (!(genreId === null)) {
                params = params.append('genreId', genreId.toString());
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.delete<ILitGenreView>(this.serviceUrl+'/deleteone', options); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('deleteone', item))
        // );   
    }

    src2dest(src: ILitGenreView, dest: ILitGenreView) {
        if ((typeof src === 'undefined') || (typeof dest === 'undefined')) return;
        if ((src === null) || (dest === null)) return;
        if(typeof src.genreId === 'undefined') {
            dest['genreId'] = null;
        } else {
            dest['genreId'] = src.genreId;
        }
        if(typeof src.genreName === 'undefined') {
            dest['genreName'] = null;
        } else {
            dest['genreName'] = src.genreName;
        }
        
    }


}

