
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AdminRolesFtrComponent } from './ftr/admin-roles.ftr.component';
import { AdminRolesFtrRoutingModule } from './admin-roles.ftr.routing.module';
import { AspnetdashboardViewLModule } from './../../components/aspnetdashboard-view/aspnetdashboard-view-l.module';
import { AspnetmodelViewLModule } from './../../components/aspnetmodel-view/aspnetmodel-view-l.module';
import { AspnetroleViewLModule } from './../../components/aspnetrole-view/aspnetrole-view-l.module';
import { AspnetrolemaskViewLModule } from './../../components/aspnetrolemask-view/aspnetrolemask-view-l.module';
import { AspnetrolemaskViewChckroleModule } from './../../components/aspnetrolemask-view/aspnetrolemask-view-chckrole.module';

//
// Hint: 
// add the following line
// { path: 'adminroles', loadChildren: () => import('./features/AdminRoles/admin-roles.ftr.module').then(m => m.AdminRolesFtrModule) }, 
//
// to the array
// const routes: Routes = [ ... ]
//
// of the "app-routing.module.ts"-file
// 
// In the app.component.html-file add the following line
// <mat-nav-list>
//  ...
//    <a mat-list-item [routerLink]="['/adminroles']" routerLinkActive="active">Title for AdminRoles </a> 
//  ...
// </mat-nav-list>
//
// 
//

@NgModule({
    declarations: [
        AdminRolesFtrComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        AdminRolesFtrRoutingModule,
        AspnetdashboardViewLModule,
        AspnetmodelViewLModule,
        AspnetroleViewLModule,
        AspnetrolemaskViewLModule,
        AspnetrolemaskViewChckroleModule,

    ],
    exports: [
        AdminRolesFtrComponent,


    ],
    entryComponents: [
    ]
})
export class AdminRolesFtrModule { }


