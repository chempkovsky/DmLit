
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitDialectViewSformComponent } from './sform/lit-dialect-view-sform.component';
import { LitDialectViewSdlgComponent } from './sdlg/lit-dialect-view-sdlg.component';

@NgModule({
    declarations: [
        LitDialectViewSformComponent,
        LitDialectViewSdlgComponent
    ],
    imports: [
        CommonModule,
//        BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        LitDialectViewSformComponent,
        LitDialectViewSdlgComponent
    ],
    entryComponents: [
        LitDialectViewSdlgComponent
    ]
})
export class LitDialectViewSModule { }


