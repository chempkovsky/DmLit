
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AspnetroleViewSformComponent } from './sform/aspnetrole-view-sform.component';
import { AspnetroleViewSdlgComponent } from './sdlg/aspnetrole-view-sdlg.component';

@NgModule({
    declarations: [
        AspnetroleViewSformComponent,
        AspnetroleViewSdlgComponent
    ],
    imports: [
        CommonModule,
//        BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        AspnetroleViewSformComponent,
        AspnetroleViewSdlgComponent
    ],
    entryComponents: [
        AspnetroleViewSdlgComponent
    ]
})
export class AspnetroleViewSModule { }


