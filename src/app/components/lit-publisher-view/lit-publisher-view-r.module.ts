
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';


import { LitPublisherViewReditComponent } from './redit/lit-publisher-view-redit.component';
import { LitPublisherViewRlistComponent } from './rlist/lit-publisher-view-rlist.component';
import { LitPublisherViewSModule } from './lit-publisher-view-s.module';
import { LitPublisherViewEModule } from './lit-publisher-view-e.module';

import { LitCountryViewSModule } from './../lit-country-view/lit-country-view-s.module';



@NgModule({
    declarations: [
        LitPublisherViewReditComponent,
        LitPublisherViewRlistComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitPublisherViewSModule,
        LitPublisherViewEModule,

        LitCountryViewSModule,

    ],
    exports: [
        LitPublisherViewReditComponent,
        LitPublisherViewRlistComponent
    ],
    entryComponents: [
    ]
})
export class LitPublisherViewRModule { }


