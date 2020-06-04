
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AspnetrolemaskViewSModule } from './aspnetrolemask-view-s.module';
import { AspnetrolemaskViewEModule } from './aspnetrolemask-view-e.module';
import { AspnetrolemaskViewLformComponent } from './lform/aspnetrolemask-view-lform.component';
import { AspnetrolemaskViewLdlgComponent } from './ldlg/aspnetrolemask-view-ldlg.component';

@NgModule({
    declarations: [
        AspnetrolemaskViewLformComponent,
        AspnetrolemaskViewLdlgComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        AspnetrolemaskViewSModule,
        AspnetrolemaskViewEModule,

    ],
    exports: [
        AspnetrolemaskViewLformComponent,
        AspnetrolemaskViewLdlgComponent
    ],
    entryComponents: [
        AspnetrolemaskViewLdlgComponent
    ]
})
export class AspnetrolemaskViewLModule { }


