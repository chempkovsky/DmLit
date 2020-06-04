
import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AspnetmodelViewSformComponent } from './sform/aspnetmodel-view-sform.component';
import { AspnetmodelViewSdlgComponent } from './sdlg/aspnetmodel-view-sdlg.component';

@NgModule({
    declarations: [
        AspnetmodelViewSformComponent,
        AspnetmodelViewSdlgComponent
    ],
    imports: [
        CommonModule,
//        BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        WebServiceFilterModule,
    ],
    exports: [
        AspnetmodelViewSformComponent,
        AspnetmodelViewSdlgComponent
    ],
    entryComponents: [
        AspnetmodelViewSdlgComponent
    ]
})
export class AspnetmodelViewSModule { }


