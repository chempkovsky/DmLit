
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';


import { LitCountryViewReditComponent } from './redit/lit-country-view-redit.component';
import { LitCountryViewRlistComponent } from './rlist/lit-country-view-rlist.component';
import { LitCountryViewSModule } from './lit-country-view-s.module';
import { LitCountryViewEModule } from './lit-country-view-e.module';




@NgModule({
    declarations: [
        LitCountryViewReditComponent,
        LitCountryViewRlistComponent
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
        LitCountryViewReditComponent,
        LitCountryViewRlistComponent
    ],
    entryComponents: [
    ]
})
export class LitCountryViewRModule { }


