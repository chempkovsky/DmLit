
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AspnetuserViewSModule } from './aspnetuser-view-s.module';
import { AspnetuserViewEModule } from './aspnetuser-view-e.module';
import { AspnetuserViewLformComponent } from './lform/aspnetuser-view-lform.component';
import { AspnetuserViewLdlgComponent } from './ldlg/aspnetuser-view-ldlg.component';

@NgModule({
    declarations: [
        AspnetuserViewLformComponent,
        AspnetuserViewLdlgComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        AspnetuserViewSModule,
        AspnetuserViewEModule,

    ],
    exports: [
        AspnetuserViewLformComponent,
        AspnetuserViewLdlgComponent
    ],
    entryComponents: [
        AspnetuserViewLdlgComponent
    ]
})
export class AspnetuserViewLModule { }


