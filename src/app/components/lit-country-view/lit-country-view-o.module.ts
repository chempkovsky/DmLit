
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';

import { LitCountryViewLModule } from './lit-country-view-l.module';
import { LitCountryViewO2mComponent } from './o2m/lit-country-view-o2m.component';
import { LitDialectViewLModule } from './../lit-dialect-view/lit-dialect-view-l.module';
import { LitAuthorViewLModule } from './../lit-author-view/lit-author-view-l.module';
import { LitPublisherViewLModule } from './../lit-publisher-view/lit-publisher-view-l.module';


@NgModule({
    declarations: [
        LitCountryViewO2mComponent,
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitCountryViewLModule,
        LitDialectViewLModule,
        LitAuthorViewLModule,
        LitPublisherViewLModule,
    ],
    exports: [
        LitCountryViewO2mComponent,
    ],
    entryComponents: [
    ]
})
export class LitCountryViewOModule { }


