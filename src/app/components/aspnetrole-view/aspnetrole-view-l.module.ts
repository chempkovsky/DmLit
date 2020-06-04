
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AspnetroleViewSModule } from './aspnetrole-view-s.module';
import { AspnetroleViewEModule } from './aspnetrole-view-e.module';
import { AspnetroleViewLformComponent } from './lform/aspnetrole-view-lform.component';
import { AspnetroleViewLdlgComponent } from './ldlg/aspnetrole-view-ldlg.component';

@NgModule({
    declarations: [
        AspnetroleViewLformComponent,
        AspnetroleViewLdlgComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        AspnetroleViewSModule,
        AspnetroleViewEModule,

    ],
    exports: [
        AspnetroleViewLformComponent,
        AspnetroleViewLdlgComponent
    ],
    entryComponents: [
        AspnetroleViewLdlgComponent
    ]
})
export class AspnetroleViewLModule { }


