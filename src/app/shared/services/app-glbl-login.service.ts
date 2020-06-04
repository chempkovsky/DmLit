
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { AppGlblSettingsService } from './app-glbl-settings.service';
import { IAppGlblRegister } from './../interfaces/app-glbl-register.interface';
import { IAppGlblLogin } from './../interfaces/app-glbl-login.interface';
import { IAppGlblChngpswd } from './../interfaces/app-glbl-chngpswd.interface';


@Injectable({
  providedIn: 'root'
})
export class AppGlblLoginService {
    serviceUrl: string;  
    constructor(private http: HttpClient, protected appGlblSettings: AppGlblSettingsService) {
        this.serviceUrl = this.appGlblSettings.getSecurityWebApiPrefix();  
    }
    login(usrNm: string, pssWrd: string): Observable<any> {
        /*
            let rqDt: IAppGlblLogin = {
                username: usrNm, 
                password: pssWrd,
                grant_type: 'password'
            };
            return this.http.post<IAppGlblLogin>(this.serviceUrl+'token', rqDt); 
        */
        let params: HttpParams  = new HttpParams();
        params = params.append('username', usrNm);
        params = params.append('password', pssWrd);
        params = params.append('grant_type', 'password');
        return this.http.post(this.serviceUrl+'token', params.toString());
    }
    register(rqDt: IAppGlblRegister): Observable<any> {
        return this.http.post<IAppGlblLogin>(this.serviceUrl+'api/Account/Register', rqDt); 
    }
    logout(): Observable<any> {
        return this.http.post(this.serviceUrl+'api/Account/Logout', null); 
    }
    changePassword(chPwd: IAppGlblChngpswd): Observable<any> {
        return this.http.post<IAppGlblChngpswd>(this.serviceUrl+'api/Account/ChangePassword', chPwd); 
    }
}

