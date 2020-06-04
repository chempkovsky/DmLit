import { Component } from '@angular/core';
import { FormControl, Validators, ValidatorFn, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AppGlblSettingsService } from './../../services/app-glbl-settings.service';
import { AppGlblLoginService } from './../../services/app-glbl-login.service';
import { AspnetusermaskViewService } from 'src/app/services/aspnetusermask-view/aspnetusermask-view.service';
import { IaspnetusermaskViewPage } from 'src/app/components/aspnetusermask-view/interfaces/aspnetusermask-view-page.interface';


@Component({
  selector: 'app-app-glbl-login',
  templateUrl: './app-glbl-login.component.html',
  styleUrls: ['./app-glbl-login.component.css']
})
export class AppGlblLoginComponent {
    title: string = 'Sign in';
    cnfPwdhide: boolean = true;
    pwdhide: boolean = true;
    public appearance: string = 'outline';
    loginFormGroup: FormGroup;

    constructor(private scrtSvr: AppGlblLoginService, protected router: Router, protected usrMskSrv: AspnetusermaskViewService, protected appGlblSettings: AppGlblSettingsService ) {
        this.appearance = this.appGlblSettings.appearance;

        this.loginFormGroup =  new FormGroup({});
        let locValidators: ValidatorFn[]; 

        locValidators = [ Validators.required,Validators.minLength(3) ];
        this.loginFormGroup.addControl('username', new FormControl({ value: null, disabled: false}, locValidators));

        locValidators = [ Validators.required,Validators.minLength(6) ];
        this.loginFormGroup.addControl('password', new FormControl({ value: null, disabled: false}, locValidators));

    } 
    getErrorMessage(fc: AbstractControl): string {
        return this.appGlblSettings.getValidationErrorMessage(fc);
    } 

    doSubmit() {
        if(typeof this.loginFormGroup === 'undefined') return;
        if(this.loginFormGroup === null) return;
        if (this.loginFormGroup.invalid) {
            this.loginFormGroup.markAllAsTouched();
            return;
        }
        this.scrtSvr.login(this.loginFormGroup.controls['username'].value, this.loginFormGroup.controls['password'].value)
        .subscribe(
            (respdata: any ) => { // success path
                this.appGlblSettings.setAuthInto(respdata);
                this.usrMskSrv.getcurrusermasks()
                  .subscribe((vo: IaspnetusermaskViewPage) => {
                    this.appGlblSettings.perms = this.usrMskSrv.src2array(vo);
                    console.log(this.appGlblSettings.perms);
                    this.appGlblSettings.userName = this.loginFormGroup.controls['username'].value;
                    this.router.navigate(['/']);
                  },
                  error => { // error path
                    this.appGlblSettings.showError('http', error)
                  }
                );
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


