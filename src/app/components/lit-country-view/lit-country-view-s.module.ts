
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitCountryViewSformComponent } from './sform/lit-country-view-sform.component';
import { LitCountryViewSdlgComponent } from './sdlg/lit-country-view-sdlg.component';

@NgModule({
    declarations: [
        LitCountryViewSformComponent,
        LitCountryViewSdlgComponent
    ],
    imports: [
        CommonModule,
//        BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        LitCountryViewSformComponent,
        LitCountryViewSdlgComponent
    ],
    entryComponents: [
        LitCountryViewSdlgComponent
    ]
})
export class LitCountryViewSModule { }


