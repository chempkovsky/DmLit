
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitGenreViewSModule } from './lit-genre-view-s.module';
import { LitGenreViewEModule } from './lit-genre-view-e.module';
import { LitGenreViewLformComponent } from './lform/lit-genre-view-lform.component';
import { LitGenreViewLdlgComponent } from './ldlg/lit-genre-view-ldlg.component';

@NgModule({
    declarations: [
        LitGenreViewLformComponent,
        LitGenreViewLdlgComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitGenreViewSModule,
        LitGenreViewEModule,

    ],
    exports: [
        LitGenreViewLformComponent,
        LitGenreViewLdlgComponent
    ],
    entryComponents: [
        LitGenreViewLdlgComponent
    ]
})
export class LitGenreViewLModule { }


