
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
// import { WebServiceFilterModule } from './../../shared/modules/web-service-filter.module';

import { AspnetuserViewLModule } from './aspnetuser-view-l.module';
import { AspnetuserViewO2mComponent } from './o2m/aspnetuser-view-o2m.component';
import { AspnetusermaskViewLModule } from './../aspnetusermask-view/aspnetusermask-view-l.module';
import { AspnetuserrolesViewLModule } from './../aspnetuserroles-view/aspnetuserroles-view-l.module';


@NgModule({
    declarations: [
        AspnetuserViewO2mComponent,
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        AspnetuserViewLModule,
        AspnetusermaskViewLModule,
        AspnetuserrolesViewLModule,
    ],
    exports: [
        AspnetuserViewO2mComponent,
    ],
    entryComponents: [
    ]
})
export class AspnetuserViewOModule { }


