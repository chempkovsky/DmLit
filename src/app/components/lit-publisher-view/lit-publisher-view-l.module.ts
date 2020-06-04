
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitPublisherViewSModule } from './lit-publisher-view-s.module';
import { LitPublisherViewEModule } from './lit-publisher-view-e.module';
import { LitPublisherViewLformComponent } from './lform/lit-publisher-view-lform.component';
import { LitPublisherViewLdlgComponent } from './ldlg/lit-publisher-view-ldlg.component';

@NgModule({
    declarations: [
        LitPublisherViewLformComponent,
        LitPublisherViewLdlgComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitPublisherViewSModule,
        LitPublisherViewEModule,

    ],
    exports: [
        LitPublisherViewLformComponent,
        LitPublisherViewLdlgComponent
    ],
    entryComponents: [
        LitPublisherViewLdlgComponent
    ]
})
export class LitPublisherViewLModule { }


