
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';

import { LitGenreViewLModule } from './lit-genre-view-l.module';
import { LitGenreViewO2mComponent } from './o2m/lit-genre-view-o2m.component';
import { LitManuscriptViewLModule } from './../lit-manuscript-view/lit-manuscript-view-l.module';


@NgModule({
    declarations: [
        LitGenreViewO2mComponent,
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitGenreViewLModule,
        LitManuscriptViewLModule,
    ],
    exports: [
        LitGenreViewO2mComponent,
    ],
    entryComponents: [
    ]
})
export class LitGenreViewOModule { }


