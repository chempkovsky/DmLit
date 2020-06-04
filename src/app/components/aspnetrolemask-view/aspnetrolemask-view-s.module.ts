
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AspnetrolemaskViewSformComponent } from './sform/aspnetrolemask-view-sform.component';
import { AspnetrolemaskViewSdlgComponent } from './sdlg/aspnetrolemask-view-sdlg.component';

@NgModule({
    declarations: [
        AspnetrolemaskViewSformComponent,
        AspnetrolemaskViewSdlgComponent
    ],
    imports: [
        CommonModule,
//        BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        AspnetrolemaskViewSformComponent,
        AspnetrolemaskViewSdlgComponent
    ],
    entryComponents: [
        AspnetrolemaskViewSdlgComponent
    ]
})
export class AspnetrolemaskViewSModule { }


