
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { AspnetmodelViewChckmdlModule } from './../aspnetmodel-view/aspnetmodel-view-chckmdl.module';
import { AspnetdashboardViewChckdshbdModule } from './../aspnetdashboard-view/aspnetdashboard-view-chckdshbd.module';
import { AspnetusermaskViewLformComponent } from './lform/aspnetusermask-view-lform.component';


@NgModule({
    declarations: [
        AspnetusermaskViewLformComponent,
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,


        AspnetmodelViewChckmdlModule,
        AspnetdashboardViewChckdshbdModule
    ],
    exports: [
        AspnetusermaskViewLformComponent,
    ],
    entryComponents: [
    ]
})
export class AspnetusermaskViewLModule { }


