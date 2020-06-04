import { Component } from '@angular/core';
import { FormControl, Validators, ValidatorFn, FormGroup, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AppGlblSettingsService } from './../../services/app-glbl-settings.service';
import { AppGlblLoginService } from './../../services/app-glbl-login.service';


@Component({
  selector: 'app-app-glbl-register',
  templateUrl: './app-glbl-register.component.html',
  styleUrls: ['./app-glbl-register.component.css']
})
export class AppGlblRegisterComponent {
    title: string = 'Registration';
    cnfPwdhide: boolean = true;
    pwdhide: boolean = true;
    public appearance: string = 'outline';
    registerFormGroup: FormGroup;


    constructor(private scrtSvr: AppGlblLoginService, protected router: Router, protected appGlblSettings: AppGlblSettingsService ) {
        this.appearance = this.appGlblSettings.appearance;

        this.registerFormGroup =  new FormGroup({});
        let locValidators: ValidatorFn[]; 

        locValidators = [ Validators.required,Validators.minLength(3) ];
        this.registerFormGroup.addControl('email', new FormControl({ value: null, disabled: false}, locValidators));

        locValidators = [ Validators.required,Validators.minLength(6) ];
        this.registerFormGroup.addControl('password', new FormControl({ value: null, disabled: false}, locValidators));

        locValidators = [ Validators.required,Validators.minLength(6) ];
        this.registerFormGroup.addControl('confirmPassword', new FormControl({ value: null, disabled: false}, locValidators));
    } 
    getErrorMessage(fc: AbstractControl): string {
        return this.appGlblSettings.getValidationErrorMessage(fc);
    } 

    doSubmit() {
        if(typeof this.registerFormGroup === 'undefined') return;
        if(this.registerFormGroup === null) return;
        if (this.registerFormGroup.invalid) {
            this.registerFormGroup.markAllAsTouched();
            return;
        }
        if(!(this.registerFormGroup.controls['password'].value === this.registerFormGroup.controls['confirmPassword'].value)) {
            let msg = {
                message: 'Password and Confirm Password must be identical'
            };
            this.appGlblSettings.showError('Input Error', msg);
            return;
        }
        this.scrtSvr.register(this.registerFormGroup.value)
        .subscribe(
            (respdata: any ) => { // success path
                this.doLogin();
            },
            error => { // error path
                this.appGlblSettings.showError('http', error)
            }
        );
    }
    doLogin() {
        this.scrtSvr.login(this.registerFormGroup.controls['email'].value, this.registerFormGroup.controls['password'].value)
        .subscribe(
            (respdata: any ) => { // success path
                this.appGlblSettings.setAuthInto(respdata);
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


