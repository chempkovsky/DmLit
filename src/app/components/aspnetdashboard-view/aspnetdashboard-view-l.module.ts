
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AspnetdashboardViewSModule } from './aspnetdashboard-view-s.module';
import { AspnetdashboardViewEModule } from './aspnetdashboard-view-e.module';
import { AspnetdashboardViewLformComponent } from './lform/aspnetdashboard-view-lform.component';
import { AspnetdashboardViewLdlgComponent } from './ldlg/aspnetdashboard-view-ldlg.component';

@NgModule({
    declarations: [
        AspnetdashboardViewLformComponent,
        AspnetdashboardViewLdlgComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        AspnetdashboardViewSModule,
        AspnetdashboardViewEModule,

    ],
    exports: [
        AspnetdashboardViewLformComponent,
        AspnetdashboardViewLdlgComponent
    ],
    entryComponents: [
        AspnetdashboardViewLdlgComponent
    ]
})
export class AspnetdashboardViewLModule { }


