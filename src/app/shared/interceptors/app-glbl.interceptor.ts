
/*
The following should be added to the file 'app.module.ts':

    providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AppGlblInterceptor,
          multi: true
        }
    ],

*/


import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { AppGlblSettingsService } from './../services/app-glbl-settings.service';

@Injectable()
export class AppGlblInterceptor implements HttpInterceptor {
  constructor(private appGlblSettings: AppGlblSettingsService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let authInfo = this.appGlblSettings.getAuthInto();
    if(typeof authInfo === 'undefined') {
        return next.handle(req);
    }
    if(authInfo === null) {
        return next.handle(req);
    }
    if ((typeof authInfo.access_token === 'undefined') || (typeof authInfo.token_type === 'undefined')) {
        return next.handle(req);
    }
    if ((authInfo.access_token === null) || (authInfo.token_type === null)) {
        return next.handle(req);
    }
    const authReq = req.clone({ setHeaders: { Authorization: authInfo.token_type + ' ' +  authInfo.access_token} });
    return next.handle(authReq);
  }
}

