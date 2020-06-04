
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';
import { AspnetmodelViewSModule } from './aspnetmodel-view-s.module';
import { AspnetmodelViewEModule } from './aspnetmodel-view-e.module';
import { AspnetmodelViewLformComponent } from './lform/aspnetmodel-view-lform.component';
import { AspnetmodelViewLdlgComponent } from './ldlg/aspnetmodel-view-ldlg.component';

@NgModule({
    declarations: [
        AspnetmodelViewLformComponent,
        AspnetmodelViewLdlgComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        AspnetmodelViewSModule,
        AspnetmodelViewEModule,

    ],
    exports: [
        AspnetmodelViewLformComponent,
        AspnetmodelViewLdlgComponent
    ],
    entryComponents: [
        AspnetmodelViewLdlgComponent
    ]
})
export class AspnetmodelViewLModule { }


