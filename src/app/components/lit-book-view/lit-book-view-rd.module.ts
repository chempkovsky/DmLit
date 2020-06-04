
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';

import { LitBookViewEModule } from './lit-book-view-e.module';
import { LitBookViewSModule } from './lit-book-view-s.module';
import { LitBookViewRdlistComponent } from './rdlist/lit-book-view-rdlist.component';


import { LitCountryViewSModule } from './../lit-country-view/lit-country-view-s.module';



@NgModule({
    declarations: [
        LitBookViewRdlistComponent,
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitBookViewSModule,
        LitBookViewEModule,
        
        LitCountryViewSModule,

    ],
    exports: [
        LitBookViewRdlistComponent
    ],
    entryComponents: [
    ]
})
export class LitBookViewRdModule { }


