
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitBookViewSModule } from './lit-book-view-s.module';
import { LitBookViewEModule } from './lit-book-view-e.module';
import { LitBookViewLformComponent } from './lform/lit-book-view-lform.component';
import { LitBookViewLdlgComponent } from './ldlg/lit-book-view-ldlg.component';

@NgModule({
    declarations: [
        LitBookViewLformComponent,
        LitBookViewLdlgComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitBookViewSModule,
        LitBookViewEModule,

    ],
    exports: [
        LitBookViewLformComponent,
        LitBookViewLdlgComponent
    ],
    entryComponents: [
        LitBookViewLdlgComponent
    ]
})
export class LitBookViewLModule { }


