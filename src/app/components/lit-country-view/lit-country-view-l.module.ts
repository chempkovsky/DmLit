
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitCountryViewSModule } from './lit-country-view-s.module';
import { LitCountryViewEModule } from './lit-country-view-e.module';
import { LitCountryViewLformComponent } from './lform/lit-country-view-lform.component';
import { LitCountryViewLdlgComponent } from './ldlg/lit-country-view-ldlg.component';

@NgModule({
    declarations: [
        LitCountryViewLformComponent,
        LitCountryViewLdlgComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitCountryViewSModule,
        LitCountryViewEModule,

    ],
    exports: [
        LitCountryViewLformComponent,
        LitCountryViewLdlgComponent
    ],
    entryComponents: [
        LitCountryViewLdlgComponent
    ]
})
export class LitCountryViewLModule { }


