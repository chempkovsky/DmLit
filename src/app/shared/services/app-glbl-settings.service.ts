
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AppGlblSettingsService implements CanActivate, CanActivateChild {
    public appearance: string = 'outline';
    public filterHeightAddition: number = 0.5;
    public filterHeightFactor: number = 5;
    public tableHeightAddition: number = 0;
    public tableHeightFactor: number = 31;

    constructor(private _snackBar: MatSnackBar) {}
    public showMsg(msg: string) {
      this._snackBar.open(msg, 'Close', { duration: 4000 });
    }
    public showError(errTp: string, errorStruct: any) {
        let text: string = 'Error :';
        if(!(typeof errTp === 'undefined')) {
            if(!(errTp === null)) {
                text = 'Error of type ' + errTp + ': ';
            }
        }
        if(!(typeof errorStruct === 'undefined')) {
            if(!(errorStruct === null)) {
                if(!(typeof errorStruct.message === 'undefined')) {
                    if(!(errorStruct.message === null)) {
                        text = text + ' ' +  errorStruct.message;
                    }
                }
                if(!(typeof errorStruct.statusText === 'undefined')) {
                    if(!(errorStruct.statusText === null)) {
                        text = text + ' ' +  errorStruct.statusText;
                    }
                }
                if(!(typeof errorStruct.error === 'undefined')) {
                  if(!(errorStruct.error === null)) {
                    if(!(typeof errorStruct.error.ModelState === 'undefined')) {
                      if(Array.isArray( errorStruct.error.ModelState[''] )) {
                        errorStruct.error.ModelState[''].forEach(element => {
                          text = text + ' ' +  element;
                        });
                      }
                    }
                  }
                }
            }
        }
        this._snackBar.open(text, 'Close', { duration: 4000 });
    }
    public getWebApiPrefix(vwNm: string): string {
        let reslt: string = '';
        if(!(vwNm === null)) {
            if(!(vwNm === null)) {
                //
                // here: defining url by ViewName
                //
                reslt = 'https://localhost:44312/';
            }
        }
        return reslt;
    } 
    public getSecurityWebApiPrefix(): string {
        return 'https://localhost:44312/';
    } 
    getValidationErrorMessage(fc: AbstractControl): string {
        let rslt: string = 'Validation Error. ';
        if (typeof fc === 'undefined') {
          return rslt;
        }
        if (fc === null) {
          return rslt;
        }
        const errs: ValidationErrors = fc.errors;
        Object.keys(errs).forEach(k => {
          switch(k) {
            case 'maxlength':
              rslt +=' Required max length. ' + errs[k].requiredLength;
              break;
            case 'minlength':
              rslt +=' Required min length: ' + errs[k].requiredLength;
              break;
            case 'required':
              rslt +=' Required field. ' ;
              break;
            case 'max':
              rslt +=' The value must be less than ' + errs[k].max;
              break;
            case 'min':
              rslt +=' Value must be greater than ' + errs[k].min;
              break;
            case 'pattern':
              rslt +=' Icorrect format.' ;
              break;
            case 'matDatepickerMin':
              rslt +=' Value must be greater than ' + errs[k].min;
              break;
            case 'matDatepickerMax':
              rslt +=' The value must be less than ' + errs[k].max;
              break;
            case 'matDatepickerParse':
              rslt +=' Icorrect date format.' ;
              break;
            default:
              rslt +=' Icorrect format.' ;
              break;
          }
        });
        return rslt;
    } // end of getErrorMessage
    public getDialogWidth(vwNm: string): string {
        let rslt: string = '99vw';
        if(!(vwNm === null)) {
            if(!(vwNm === null)) {
                //
                // here: set dialog width for the given ViewName
                //
                return '99vw';        
            }
        }
        return rslt;
    }
    public getDialogMaxWidth(vwNm: string): string {
        let rslt: string = '100vw';
        if(!(vwNm === null)) {
            if(!(vwNm === null)) {
                //
                // here: set dialog max width for the given ViewName
                //
                return '100vw';        
            }
        }
        return rslt;
    }
    
    protected authInto: any = null;
    public getAuthInto(): any {
        return this.authInto;
    }
    public setAuthInto(info: any): any {
        if(typeof info === 'undefined') {
            this.authInto = null;
        } else {
            this.authInto = info;
        }
    }

    public perms: number[] = [0,0,0,0,  0,0,0,0,  0,0,0,0,  0,0,  1,0,0];
    vwModels:  { [key: string]: number } = {
      // subject area context
      'LitGenreView': 0,
      'LitEditionView': 1,
      'LitCountryView': 2,
      'LitLanguageView': 3,
      'LitDialectView': 4,
      'LitAuthorView': 5,
      'LitManuscriptView': 6,
      'LitPublisherView': 7,
      'LitBookView': 8,
 
      // security context
      'aspnetdashboardView': 9,
      'aspnetmodelView': 10,
      'aspnetroleView': 11,
      'aspnetrolemaskView': 12,
      'aspnetuserView': 13,
      'aspnetusermaskView': 14,
      'aspnetuserrolesView': 15,
 
    };
    dshBrds:  { [key: string]: number } = {
      // subject area context
      'DDialectFtrComponent': 0,
      'RDialectFtrComponent': 1,
      'DBookFtrComponent': 2,
      'RBookFtrComponent': 3,
      'RManuscriptFtrComponent': 4,
      'DManuscriptFtrComponent': 5,
      'DPublisherFtrComponent': 6,
      'RPublisherFtrComponent': 7,
      'DAuthorFtrComponent': 8,
      'RAuthorFtrComponent': 9,
      'DEditionFtrComponent': 10,
      'REditionFtrComponent': 11,
      'DGenreFtrComponent': 12,
      'RGenreFtrComponent': 13,
      'DLanguageFtrComponent': 14,
      'RLanguageFtrComponent': 15,
      'DCountryFtrComponent': 16,
      'RCountryFtrComponent': 17,

      // security context
      'AdminUsersFtrComponent': 18,
      'AdminRolesFtrComponent': 19,
  
      };
    getViewModelMask(vwModel: string): number {
      //return 15; // delete this line when vwModels is ready
      let pk = this.vwModels[vwModel];
      if(typeof pk === 'undefined') return 0;
      let rid: number = Math.floor(pk/7);
      if(rid >= (this.perms.length-3))  return 0; 
      let sft: number = (pk - rid * 7) * 4;
      let rslt = this.perms[rid];
      if(sft > 0) {
        rslt = this.perms[rid] >> sft;
      }
      return rslt; 
    }
    getDashBrdMask(dshBrd: string): number {
      //return 1; // delete this line when dshBrds is ready
      let pk = this.dshBrds[dshBrd];
      if(typeof pk === 'undefined') return 0;
      let rid: number = Math.floor(pk/31);
      if(rid >= (this.perms.length-14))  return 0; 
      let sft: number = (pk - rid * 31);
      let rslt = (this.perms[rid+14])
      if(sft > 0) {
        rslt = (this.perms[rid+14]) >> sft;
      }
      return rslt; 
    }
    canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
      let pth: string[] = childRoute.routeConfig.path.split('/');
      let vnm: string = '';
      let act: number = 1;
      let vid: number = -1;
      let cnt = 0;
      for(let i = pth.length-1; i > -1; i-- ) {
        if(!pth[i].startsWith(':')) {
          if(cnt > 0) {
            vnm = pth[i];
            vid = i;
            break;
          } else cnt++;
        }
      }
      if (vid < 0) {
        if(pth.length>0) {
          vnm = pth[0];
          vid = 0;
        } else return false;
      }
      if ( pth[pth.length-1].startsWith(':') ) {
        switch( childRoute.url[childRoute.url.length-1].path ) {
          case 'add':
            act = 8;
            break;
          case 'update':
            act = 4;
            break;
          case 'delete':
            act = 2;
            break;
        };
      } 
      return (this.getViewModelMask(vnm) & act) === act;
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean  {
      return ( this.getDashBrdMask(route.routeConfig.component['name']) & 1) === 1;
    }
    
    public userName: string;

}

