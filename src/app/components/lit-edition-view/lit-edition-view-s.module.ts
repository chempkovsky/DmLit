
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitEditionViewSformComponent } from './sform/lit-edition-view-sform.component';
import { LitEditionViewSdlgComponent } from './sdlg/lit-edition-view-sdlg.component';

@NgModule({
    declarations: [
        LitEditionViewSformComponent,
        LitEditionViewSdlgComponent
    ],
    imports: [
        CommonModule,
//        BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        LitEditionViewSformComponent,
        LitEditionViewSdlgComponent
    ],
    entryComponents: [
        LitEditionViewSdlgComponent
    ]
})
export class LitEditionViewSModule { }


