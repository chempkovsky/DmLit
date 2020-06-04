
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';

import { LitPublisherViewEModule } from './lit-publisher-view-e.module';
import { LitPublisherViewSModule } from './lit-publisher-view-s.module';
import { LitPublisherViewRdlistComponent } from './rdlist/lit-publisher-view-rdlist.component';


import { LitCountryViewSModule } from './../lit-country-view/lit-country-view-s.module';



@NgModule({
    declarations: [
        LitPublisherViewRdlistComponent,
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
        LitPublisherViewRdlistComponent
    ],
    entryComponents: [
    ]
})
export class LitPublisherViewRdModule { }


