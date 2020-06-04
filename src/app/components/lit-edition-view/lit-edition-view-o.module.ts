
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';

import { LitEditionViewLModule } from './lit-edition-view-l.module';
import { LitEditionViewO2mComponent } from './o2m/lit-edition-view-o2m.component';
import { LitBookViewLModule } from './../lit-book-view/lit-book-view-l.module';


@NgModule({
    declarations: [
        LitEditionViewO2mComponent,
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitEditionViewLModule,
        LitBookViewLModule,
    ],
    exports: [
        LitEditionViewO2mComponent,
    ],
    entryComponents: [
    ]
})
export class LitEditionViewOModule { }


