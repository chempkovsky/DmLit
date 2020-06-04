
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';

import { LitCountryViewEModule } from './lit-country-view-e.module';
import { LitCountryViewSModule } from './lit-country-view-s.module';
import { LitCountryViewRdlistComponent } from './rdlist/lit-country-view-rdlist.component';





@NgModule({
    declarations: [
        LitCountryViewRdlistComponent,
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitCountryViewSModule,
        LitCountryViewEModule,
        

    ],
    exports: [
        LitCountryViewRdlistComponent
    ],
    entryComponents: [
    ]
})
export class LitCountryViewRdModule { }


