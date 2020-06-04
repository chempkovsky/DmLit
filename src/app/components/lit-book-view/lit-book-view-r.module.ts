
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';


import { LitBookViewReditComponent } from './redit/lit-book-view-redit.component';
import { LitBookViewRlistComponent } from './rlist/lit-book-view-rlist.component';
import { LitBookViewSModule } from './lit-book-view-s.module';
import { LitBookViewEModule } from './lit-book-view-e.module';

import { LitCountryViewSModule } from './../lit-country-view/lit-country-view-s.module';



@NgModule({
    declarations: [
        LitBookViewReditComponent,
        LitBookViewRlistComponent
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
        LitBookViewReditComponent,
        LitBookViewRlistComponent
    ],
    entryComponents: [
    ]
})
export class LitBookViewRModule { }


