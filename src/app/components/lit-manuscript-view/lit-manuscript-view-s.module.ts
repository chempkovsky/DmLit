
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitManuscriptViewSformComponent } from './sform/lit-manuscript-view-sform.component';
import { LitManuscriptViewSdlgComponent } from './sdlg/lit-manuscript-view-sdlg.component';

@NgModule({
    declarations: [
        LitManuscriptViewSformComponent,
        LitManuscriptViewSdlgComponent
    ],
    imports: [
        CommonModule,
//        BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        LitManuscriptViewSformComponent,
        LitManuscriptViewSdlgComponent
    ],
    entryComponents: [
        LitManuscriptViewSdlgComponent
    ]
})
export class LitManuscriptViewSModule { }


