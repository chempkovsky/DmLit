
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppMaterialModule } from './app-material.module';
import { AppFlexLayoutModule } from './app-flex-layout.module';
import { AppGlblSecurityRoutingModule } from './app-glbl-security.routing.module';

import { AppGlblChngpswdComponent } from './../components/app-glbl-chngpswd/app-glbl-chngpswd.component';
import { AppGlblLogoutComponent } from './../components/app-glbl-logout/app-glbl-logout.component';
import { AppGlblLoginComponent } from './../components/app-glbl-login/app-glbl-login.component';
import { AppGlblRegisterComponent } from './../components/app-glbl-register/app-glbl-register.component';
import { AppScrtDashboardComponent } from './../components/app-scrt-dashboard/app-scrt-dashboard.component';


//
// Hint: 
// add the following line
// { path: 'authentication', loadChildren: () => import('./shared/modules/app-glbl-security.module').then(m => m.AppGlblSecurityModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file you can add the following lines
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/authentication/login']" routerLinkActive="active">Sign in</a> 
//    <a mat-list-item [routerLink]="['/authentication/logout']" routerLinkActive="active">Sign out</a> 
//    <a mat-list-item [routerLink]="['/authentication/register']" routerLinkActive="active">Registration</a> 
//    <a mat-list-item [routerLink]="['/authentication/changepassword']" routerLinkActive="active">Change Password</a> 
//  ...
// </mat-nav-list>
//
// 
//



@NgModule({
    declarations: [
        AppGlblRegisterComponent,
        AppGlblLoginComponent,
        AppGlblLogoutComponent,
        AppGlblChngpswdComponent,
        AppScrtDashboardComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        AppGlblSecurityRoutingModule
    ],
    exports: [
        AppGlblRegisterComponent,
        AppGlblLoginComponent,
        AppGlblLogoutComponent,
        AppGlblChngpswdComponent,
        AppScrtDashboardComponent,
    ],
    entryComponents: [
    ]
})
export class AppGlblSecurityModule { }


