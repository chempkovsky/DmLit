
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitManuscriptViewSModule } from './lit-manuscript-view-s.module';
import { LitManuscriptViewEModule } from './lit-manuscript-view-e.module';
import { LitManuscriptViewLformComponent } from './lform/lit-manuscript-view-lform.component';
import { LitManuscriptViewLdlgComponent } from './ldlg/lit-manuscript-view-ldlg.component';

@NgModule({
    declarations: [
        LitManuscriptViewLformComponent,
        LitManuscriptViewLdlgComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitManuscriptViewSModule,
        LitManuscriptViewEModule,

    ],
    exports: [
        LitManuscriptViewLformComponent,
        LitManuscriptViewLdlgComponent
    ],
    entryComponents: [
        LitManuscriptViewLdlgComponent
    ]
})
export class LitManuscriptViewLModule { }


