
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { LitEditionViewSModule } from './lit-edition-view-s.module';
import { LitEditionViewEModule } from './lit-edition-view-e.module';
import { LitEditionViewLformComponent } from './lform/lit-edition-view-lform.component';
import { LitEditionViewLdlgComponent } from './ldlg/lit-edition-view-ldlg.component';

@NgModule({
    declarations: [
        LitEditionViewLformComponent,
        LitEditionViewLdlgComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitEditionViewSModule,
        LitEditionViewEModule,

    ],
    exports: [
        LitEditionViewLformComponent,
        LitEditionViewLdlgComponent
    ],
    entryComponents: [
        LitEditionViewLdlgComponent
    ]
})
export class LitEditionViewLModule { }


