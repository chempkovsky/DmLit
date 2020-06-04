import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AppGlblSettingsService } from './../../services/app-glbl-settings.service';
import { AppGlblLoginService } from './../../services/app-glbl-login.service';


@Component({
  selector: 'app-app-glbl-logout',
  templateUrl: './app-glbl-logout.component.html',
  styleUrls: ['./app-glbl-logout.component.css']
})
export class AppGlblLogoutComponent {
    title: string = 'Do you want to Sign Out?';
    public appearance: string = 'outline';
    constructor(private scrtSvr: AppGlblLoginService, protected router: Router, protected appGlblSettings: AppGlblSettingsService ) {
        this.appearance = this.appGlblSettings.appearance;
    } 
    doSubmit() {
        this.scrtSvr.logout()
        .subscribe(
            (respdata: any ) => { // success path
                this.appGlblSettings.perms = [0,0,0,0,  0,0,0,0,  0,0,0,0,  0,0,  1,0,0];
                this.appGlblSettings.setAuthInto(null);
                this.appGlblSettings.userName = null;
                this.router.navigate(['/']);
            },
            error => { // error path
                this.appGlblSettings.showError('http', error)
            }
        );
    }
    onCancel(){
        this.router.navigate(['/']);
    }
}


