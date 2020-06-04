
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitAuthorViewSformComponent } from './sform/lit-author-view-sform.component';
import { LitAuthorViewSdlgComponent } from './sdlg/lit-author-view-sdlg.component';

@NgModule({
    declarations: [
        LitAuthorViewSformComponent,
        LitAuthorViewSdlgComponent
    ],
    imports: [
        CommonModule,
//        BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        LitAuthorViewSformComponent,
        LitAuthorViewSdlgComponent
    ],
    entryComponents: [
        LitAuthorViewSdlgComponent
    ]
})
export class LitAuthorViewSModule { }


