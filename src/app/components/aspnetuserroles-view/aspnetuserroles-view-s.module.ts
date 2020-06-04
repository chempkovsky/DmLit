
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AspnetuserrolesViewSformComponent } from './sform/aspnetuserroles-view-sform.component';
import { AspnetuserrolesViewSdlgComponent } from './sdlg/aspnetuserroles-view-sdlg.component';

@NgModule({
    declarations: [
        AspnetuserrolesViewSformComponent,
        AspnetuserrolesViewSdlgComponent
    ],
    imports: [
        CommonModule,
//        BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        AspnetuserrolesViewSformComponent,
        AspnetuserrolesViewSdlgComponent
    ],
    entryComponents: [
        AspnetuserrolesViewSdlgComponent
    ]
})
export class AspnetuserrolesViewSModule { }


