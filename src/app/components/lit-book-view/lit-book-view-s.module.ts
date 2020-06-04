
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitBookViewSformComponent } from './sform/lit-book-view-sform.component';
import { LitBookViewSdlgComponent } from './sdlg/lit-book-view-sdlg.component';

@NgModule({
    declarations: [
        LitBookViewSformComponent,
        LitBookViewSdlgComponent
    ],
    imports: [
        CommonModule,
//        BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        LitBookViewSformComponent,
        LitBookViewSdlgComponent
    ],
    entryComponents: [
        LitBookViewSdlgComponent
    ]
})
export class LitBookViewSModule { }


