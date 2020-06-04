
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitAuthorViewSModule } from './lit-author-view-s.module';
import { LitAuthorViewEModule } from './lit-author-view-e.module';
import { LitAuthorViewLformComponent } from './lform/lit-author-view-lform.component';
import { LitAuthorViewLdlgComponent } from './ldlg/lit-author-view-ldlg.component';

@NgModule({
    declarations: [
        LitAuthorViewLformComponent,
        LitAuthorViewLdlgComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitAuthorViewSModule,
        LitAuthorViewEModule,

    ],
    exports: [
        LitAuthorViewLformComponent,
        LitAuthorViewLdlgComponent
    ],
    entryComponents: [
        LitAuthorViewLdlgComponent
    ]
})
export class LitAuthorViewLModule { }


