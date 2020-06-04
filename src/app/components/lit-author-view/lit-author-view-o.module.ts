
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';

import { LitAuthorViewLModule } from './lit-author-view-l.module';
import { LitAuthorViewO2mComponent } from './o2m/lit-author-view-o2m.component';
import { LitManuscriptViewLModule } from './../lit-manuscript-view/lit-manuscript-view-l.module';


@NgModule({
    declarations: [
        LitAuthorViewO2mComponent,
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitAuthorViewLModule,
        LitManuscriptViewLModule,
    ],
    exports: [
        LitAuthorViewO2mComponent,
    ],
    entryComponents: [
    ]
})
export class LitAuthorViewOModule { }


