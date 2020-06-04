
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitGenreViewSformComponent } from './sform/lit-genre-view-sform.component';
import { LitGenreViewSdlgComponent } from './sdlg/lit-genre-view-sdlg.component';

@NgModule({
    declarations: [
        LitGenreViewSformComponent,
        LitGenreViewSdlgComponent
    ],
    imports: [
        CommonModule,
//        BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        LitGenreViewSformComponent,
        LitGenreViewSdlgComponent
    ],
    entryComponents: [
        LitGenreViewSdlgComponent
    ]
})
export class LitGenreViewSModule { }


