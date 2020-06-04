
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AspnetuserViewSformComponent } from './sform/aspnetuser-view-sform.component';
import { AspnetuserViewSdlgComponent } from './sdlg/aspnetuser-view-sdlg.component';

@NgModule({
    declarations: [
        AspnetuserViewSformComponent,
        AspnetuserViewSdlgComponent
    ],
    imports: [
        CommonModule,
//        BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        AspnetuserViewSformComponent,
        AspnetuserViewSdlgComponent
    ],
    entryComponents: [
        AspnetuserViewSdlgComponent
    ]
})
export class AspnetuserViewSModule { }


