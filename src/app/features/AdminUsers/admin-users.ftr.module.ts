
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AdminUsersFtrComponent } from './ftr/admin-users.ftr.component';
import { AdminUsersFtrRoutingModule } from './admin-users.ftr.routing.module';
import { AspnetroleViewLModule } from './../../components/aspnetrole-view/aspnetrole-view-l.module';
import { AspnetuserViewLModule } from './../../components/aspnetuser-view/aspnetuser-view-l.module';
import { AspnetuserViewOModule } from './../../components/aspnetuser-view/aspnetuser-view-o.module';

//
// Hint: 
// add the following line
// { path: 'adminusers', loadChildren: () => import('./features/AdminUsers/admin-users.ftr.module').then(m => m.AdminUsersFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/adminusers']" routerLinkActive="active">Title for AdminUsers </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        AdminUsersFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        AdminUsersFtrRoutingModule,
        AspnetroleViewLModule,
        AspnetuserViewLModule,
        AspnetuserViewOModule,

    ],
    exports: [
        AdminUsersFtrComponent,


    ],
    entryComponents: [
    ]
})
export class AdminUsersFtrModule { }


