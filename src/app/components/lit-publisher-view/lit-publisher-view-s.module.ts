
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitPublisherViewSformComponent } from './sform/lit-publisher-view-sform.component';
import { LitPublisherViewSdlgComponent } from './sdlg/lit-publisher-view-sdlg.component';

@NgModule({
    declarations: [
        LitPublisherViewSformComponent,
        LitPublisherViewSdlgComponent
    ],
    imports: [
        CommonModule,
//        BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        LitPublisherViewSformComponent,
        LitPublisherViewSdlgComponent
    ],
    entryComponents: [
        LitPublisherViewSdlgComponent
    ]
})
export class LitPublisherViewSModule { }


