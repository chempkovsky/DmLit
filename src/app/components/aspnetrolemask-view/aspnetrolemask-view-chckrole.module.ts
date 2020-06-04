
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AspnetrolemaskViewCheckedroleComponent } from './chkform/aspnetrolemask-view-checkedrole.component';
import { AspnetrolemaskViewLModule } from './aspnetrolemask-view-l.module';
import { AspnetrolemaskViewEModule } from './aspnetrolemask-view-e.module';


import { AspnetmodelViewChckmdlModule } from './../aspnetmodel-view/aspnetmodel-view-chckmdl.module';
import { AspnetdashboardViewChckdshbdModule } from './../aspnetdashboard-view/aspnetdashboard-view-chckdshbd.module';

@NgModule({
    declarations: [
        AspnetrolemaskViewCheckedroleComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
        AspnetrolemaskViewEModule,
        AspnetrolemaskViewLModule,
        AspnetmodelViewChckmdlModule,
        AspnetdashboardViewChckdshbdModule
    ],
    exports: [
        AspnetrolemaskViewCheckedroleComponent,
    ],
    entryComponents: [
    ]
})
export class AspnetrolemaskViewChckroleModule { }


