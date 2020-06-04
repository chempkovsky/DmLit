
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitLanguageViewSModule } from './lit-language-view-s.module';
import { LitLanguageViewEModule } from './lit-language-view-e.module';
import { LitLanguageViewLformComponent } from './lform/lit-language-view-lform.component';
import { LitLanguageViewLdlgComponent } from './ldlg/lit-language-view-ldlg.component';

@NgModule({
    declarations: [
        LitLanguageViewLformComponent,
        LitLanguageViewLdlgComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitLanguageViewSModule,
        LitLanguageViewEModule,

    ],
    exports: [
        LitLanguageViewLformComponent,
        LitLanguageViewLdlgComponent
    ],
    entryComponents: [
        LitLanguageViewLdlgComponent
    ]
})
export class LitLanguageViewLModule { }


