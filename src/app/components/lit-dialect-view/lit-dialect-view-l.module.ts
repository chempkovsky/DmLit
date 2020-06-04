
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitDialectViewSModule } from './lit-dialect-view-s.module';
import { LitDialectViewEModule } from './lit-dialect-view-e.module';
import { LitDialectViewLformComponent } from './lform/lit-dialect-view-lform.component';
import { LitDialectViewLdlgComponent } from './ldlg/lit-dialect-view-ldlg.component';

@NgModule({
    declarations: [
        LitDialectViewLformComponent,
        LitDialectViewLdlgComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitDialectViewSModule,
        LitDialectViewEModule,

    ],
    exports: [
        LitDialectViewLformComponent,
        LitDialectViewLdlgComponent
    ],
    entryComponents: [
        LitDialectViewLdlgComponent
    ]
})
export class LitDialectViewLModule { }


