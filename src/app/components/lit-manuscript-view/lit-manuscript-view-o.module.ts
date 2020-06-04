
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';

import { LitManuscriptViewLModule } from './lit-manuscript-view-l.module';
import { LitManuscriptViewO2mComponent } from './o2m/lit-manuscript-view-o2m.component';
import { LitBookViewLModule } from './../lit-book-view/lit-book-view-l.module';


@NgModule({
    declarations: [
        LitManuscriptViewO2mComponent,
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitManuscriptViewLModule,
        LitBookViewLModule,
    ],
    exports: [
        LitManuscriptViewO2mComponent,
    ],
    entryComponents: [
    ]
})
export class LitManuscriptViewOModule { }


