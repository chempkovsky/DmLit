
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';

import { LitPublisherViewLModule } from './lit-publisher-view-l.module';
import { LitPublisherViewO2mComponent } from './o2m/lit-publisher-view-o2m.component';
import { LitBookViewLModule } from './../lit-book-view/lit-book-view-l.module';


@NgModule({
    declarations: [
        LitPublisherViewO2mComponent,
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitPublisherViewLModule,
        LitBookViewLModule,
    ],
    exports: [
        LitPublisherViewO2mComponent,
    ],
    entryComponents: [
    ]
})
export class LitPublisherViewOModule { }


