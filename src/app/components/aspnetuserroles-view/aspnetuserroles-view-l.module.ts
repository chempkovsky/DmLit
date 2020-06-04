
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AspnetuserrolesViewSModule } from './aspnetuserroles-view-s.module';
import { AspnetuserrolesViewEModule } from './aspnetuserroles-view-e.module';
import { AspnetuserrolesViewLformComponent } from './lform/aspnetuserroles-view-lform.component';
import { AspnetuserrolesViewLdlgComponent } from './ldlg/aspnetuserroles-view-ldlg.component';

@NgModule({
    declarations: [
        AspnetuserrolesViewLformComponent,
        AspnetuserrolesViewLdlgComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        AspnetuserrolesViewSModule,
        AspnetuserrolesViewEModule,

    ],
    exports: [
        AspnetuserrolesViewLformComponent,
        AspnetuserrolesViewLdlgComponent
    ],
    entryComponents: [
        AspnetuserrolesViewLdlgComponent
    ]
})
export class AspnetuserrolesViewLModule { }


