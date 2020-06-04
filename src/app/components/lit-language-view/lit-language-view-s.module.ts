
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitLanguageViewSformComponent } from './sform/lit-language-view-sform.component';
import { LitLanguageViewSdlgComponent } from './sdlg/lit-language-view-sdlg.component';

@NgModule({
    declarations: [
        LitLanguageViewSformComponent,
        LitLanguageViewSdlgComponent
    ],
    imports: [
        CommonModule,
//        BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        LitLanguageViewSformComponent,
        LitLanguageViewSdlgComponent
    ],
    entryComponents: [
        LitLanguageViewSdlgComponent
    ]
})
export class LitLanguageViewSModule { }


