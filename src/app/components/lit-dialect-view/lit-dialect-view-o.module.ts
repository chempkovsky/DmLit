
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';

import { LitDialectViewLModule } from './lit-dialect-view-l.module';
import { LitDialectViewO2mComponent } from './o2m/lit-dialect-view-o2m.component';
import { LitManuscriptViewLModule } from './../lit-manuscript-view/lit-manuscript-view-l.module';


@NgModule({
    declarations: [
        LitDialectViewO2mComponent,
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitDialectViewLModule,
        LitManuscriptViewLModule,
    ],
    exports: [
        LitDialectViewO2mComponent,
    ],
    entryComponents: [
    ]
})
export class LitDialectViewOModule { }


