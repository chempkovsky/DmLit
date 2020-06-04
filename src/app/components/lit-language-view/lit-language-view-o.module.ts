
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';

import { LitLanguageViewLModule } from './lit-language-view-l.module';
import { LitLanguageViewO2mComponent } from './o2m/lit-language-view-o2m.component';
import { LitDialectViewLModule } from './../lit-dialect-view/lit-dialect-view-l.module';


@NgModule({
    declarations: [
        LitLanguageViewO2mComponent,
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitLanguageViewLModule,
        LitDialectViewLModule,
    ],
    exports: [
        LitLanguageViewO2mComponent,
    ],
    entryComponents: [
    ]
})
export class LitLanguageViewOModule { }


