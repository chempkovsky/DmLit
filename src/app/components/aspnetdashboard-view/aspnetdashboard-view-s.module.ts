
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AspnetdashboardViewSformComponent } from './sform/aspnetdashboard-view-sform.component';
import { AspnetdashboardViewSdlgComponent } from './sdlg/aspnetdashboard-view-sdlg.component';

@NgModule({
    declarations: [
        AspnetdashboardViewSformComponent,
        AspnetdashboardViewSdlgComponent
    ],
    imports: [
        CommonModule,
//        BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        AspnetdashboardViewSformComponent,
        AspnetdashboardViewSdlgComponent
    ],
    entryComponents: [
        AspnetdashboardViewSdlgComponent
    ]
})
export class AspnetdashboardViewSModule { }


