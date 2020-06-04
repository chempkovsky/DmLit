
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ILitAuthorView } from './../../components/lit-author-view/interfaces/lit-author-view.interface';
import { ILitAuthorViewPage } from './../../components/lit-author-view/interfaces/lit-author-view-page.interface';
import { ILitAuthorViewFilter } from './../../components/lit-author-view/interfaces/lit-author-view-filter.interface';
import { AppGlblSettingsService } from './../../shared/services/app-glbl-settings.service';


@Injectable({
  providedIn: 'root'
})
export class LitAuthorViewService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
       this.serviceUrl = this.appGlblSettings.getWebApiPrefix('LitAuthorView') + 'litauthorviewwebapi';  
    }


    // 
    // HowTo:
    //
    // this.serviceRefInYourCode.getall().subscibe(value =>{
    //    // handling value of type ILitAuthorView[] 
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getall(): Observable<ILitAuthorView[]> {

        return this.http.get<ILitAuthorView[]>(this.serviceUrl+'/getall');
        //    .pipe(
        //        catchError(this.handleError('getall', []))
        //    );
    }



    // 
    // HowTo: flt is of type ILitAuthorViewFilter 
    //
    // this.serviceRefInYourCode.getwithfilter(flt).subscibe(value =>{
    //    // handling value of type ILitAuthorViewPage
    // },
    // error => {
    //    // handling error 
    // });
    // 
    getwithfilter(filter: ILitAuthorViewFilter): Observable<ILitAuthorViewPage> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof filter === 'undefined')) {
            if (!(filter === null )) {
                if (!(typeof filter.authorId === 'undefined')) {
                    if ( Array.isArray(filter.authorId )) {
                        filter.authorId.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('authorId', value.toString());
                                    hasFilter = true;
                                } 
                            }
                        });
                    } // if ( Array.isArray(filter.authorId ))
                } // if (!(typeof filter.authorId === 'undefined'))
                if (!(typeof filter.firstName === 'undefined')) {
                    if ( Array.isArray(filter.firstName )) {
                        let hasNull: boolean = false;
                        filter.firstName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('firstName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('firstName', '');
                        }
                    } // if ( Array.isArray(filter.firstName ))
                } // if (!(typeof filter.firstName === 'undefined'))
                if (!(typeof filter.lastName === 'undefined')) {
                    if ( Array.isArray(filter.lastName )) {
                        let hasNull: boolean = false;
                        filter.lastName.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('lastName', value);
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('lastName', '');
                        }
                    } // if ( Array.isArray(filter.lastName ))
                } // if (!(typeof filter.lastName === 'undefined'))
                if (!(typeof filter.birthDate === 'undefined')) {
                    if ( Array.isArray(filter.birthDate )) {
                        let hasNull: boolean = false;
                        filter.birthDate.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('birthDate', value.toString());
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('birthDate', '');
                        }
                    } // if ( Array.isArray(filter.birthDate ))
                } // if (!(typeof filter.birthDate === 'undefined'))
                if (!(typeof filter.deathDate === 'undefined')) {
                    if ( Array.isArray(filter.deathDate )) {
                        let hasNull: boolean = false;
                        filter.deathDate.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(!(value === null)) {
                                    params = params.append('deathDate', value.toString());
                                    hasFilter = true;
                                } 
                                else {
                                    hasNull = true;
                                }
                            }
                        });
                        if(hasNull) {
                            params = params.append('deathDate', '');
                        }
                    } // if ( Array.isArray(filter.deathDate ))
                } // if (!(typeof filter.deathDate === 'undefined'))
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


                if (!(typeof  filter.authorIdOprtr === 'undefined')) {
                    if (Array.isArray(filter.authorIdOprtr )) {
                        filter.authorIdOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('authorIdOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('authorIdOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.authorIdOprtr))
                } // if (!(typeof  filter.authorIdOprtr === 'undefined'))
                if (!(typeof  filter.firstNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.firstNameOprtr )) {
                        filter.firstNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('firstNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('firstNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.firstNameOprtr))
                } // if (!(typeof  filter.firstNameOprtr === 'undefined'))
                if (!(typeof  filter.lastNameOprtr === 'undefined')) {
                    if (Array.isArray(filter.lastNameOprtr )) {
                        filter.lastNameOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('lastNameOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('lastNameOprtr', value);
                                }
                            }
                        });
                    } // if (Array.isArray(filter.lastNameOprtr))
                } // if (!(typeof  filter.lastNameOprtr === 'undefined'))
                if (!(typeof  filter.birthDateOprtr === 'undefined')) {
                    if (Array.isArray(filter.birthDateOprtr )) {
                        filter.birthDateOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('birthDateOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('birthDateOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.birthDateOprtr))
                } // if (!(typeof  filter.birthDateOprtr === 'undefined'))
                if (!(typeof  filter.deathDateOprtr === 'undefined')) {
                    if (Array.isArray(filter.deathDateOprtr )) {
                        filter.deathDateOprtr.forEach(function (value) {
                            if(!(typeof value === 'undefined')) {
                                if(value === null) {
                                    params = params.append('deathDateOprtr', 'eq');
                                } 
                                else {
                                    params = params.append('deathDateOprtr', value.toString());
                                }
                            }
                        });
                    } // if (Array.isArray(filter.deathDateOprtr))
                } // if (!(typeof  filter.deathDateOprtr === 'undefined'))
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
        return this.http.get<ILitAuthorViewPage>(this.serviceUrl+'/getwithfilter', options);
          //    .pipe(
          //        catchError(this.handleError('getwithfilter', []))
          //    );
    }

    // 
    // HowTo: {prm1, prm2, ..., prmN} -- primary key
    //
    // this.serviceRefInYourCode.getone(prm1, prm2, ..., prmN ).subscibe(value =>{
    //    // handling value of type ILitAuthorView
    // },
    // error => {
    //    // handling error 
    // });
    // 

    getone(authorId: number ): Observable<ILitAuthorView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof authorId === 'undefined')) {
            if (!(authorId === null)) {
                params = params.append('authorId', authorId.toString());
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.get<ILitAuthorView>(this.serviceUrl+'/getone', options);
          // .pipe(
          //   catchError(this.handleError('getone', []))
          // );
    }

    // 
    // HowTo: item is of type ILitAuthorView 
    //
    // this.serviceRefInYourCode.updateone(item).subscibe(value =>{
    //    // handling value of type ILitAuthorView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    updateone(item: ILitAuthorView): Observable<ILitAuthorView> {

        return this.http.put<ILitAuthorView>(this.serviceUrl+'/updateone', item); //, httpOptions);
        //  .pipe(
        //    catchError(this.handleError('updateone', item))
        //  );
    }

    // 
    // HowTo: item is of type ILitAuthorView 
    //
    // this.serviceRefInYourCode.addone(item).subscibe(value =>{
    //    // handling value of type ILitAuthorView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    addone(item: ILitAuthorView): Observable<ILitAuthorView> {
        if(!(typeof item === 'undefined')) {
            if(!(item === null)) {
                if(typeof item.authorId === 'undefined') {
                    item['authorId'] = 0;
                }
                if(item.authorId === null) {
                    item['authorId'] = 0;
                }
            }
        }
        return this.http.post<ILitAuthorView>(this.serviceUrl+'/addone', item); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('addone', item))
        // );   
    }

    // 
    // HowTo: item is of type ILitAuthorView 
    //
    // this.serviceRefInYourCode.deleteone(item).subscibe(value =>{
    //    // handling value of type ILitAuthorView
    // },
    // error => {
    //    // handling error 
    // });
    // 
    deleteone(authorId: number ): Observable<ILitAuthorView> {
        let params: HttpParams  = new HttpParams();
        let hasFilter: boolean = false;
        if (!(typeof authorId === 'undefined')) {
            if (!(authorId === null)) {
                params = params.append('authorId', authorId.toString());
                hasFilter = true;
            }
        }
        const options = hasFilter ? { params } : {};
        return this.http.delete<ILitAuthorView>(this.serviceUrl+'/deleteone', options); //, httpOptions);
        // .pipe(
        //      catchError(this.handleError('deleteone', item))
        // );   
    }

    src2dest(src: ILitAuthorView, dest: ILitAuthorView) {
        if ((typeof src === 'undefined') || (typeof dest === 'undefined')) return;
        if ((src === null) || (dest === null)) return;
        if(typeof src.authorId === 'undefined') {
            dest['authorId'] = null;
        } else {
            dest['authorId'] = src.authorId;
        }
        if(typeof src.firstName === 'undefined') {
            dest['firstName'] = null;
        } else {
            dest['firstName'] = src.firstName;
        }
        if(typeof src.lastName === 'undefined') {
            dest['lastName'] = null;
        } else {
            dest['lastName'] = src.lastName;
        }
        if(typeof src.birthDate === 'undefined') {
            dest['birthDate'] = null;
        } else {
            dest['birthDate'] = src.birthDate;
        }
        if(typeof src.deathDate === 'undefined') {
            dest['deathDate'] = null;
        } else {
            dest['deathDate'] = src.deathDate;
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

