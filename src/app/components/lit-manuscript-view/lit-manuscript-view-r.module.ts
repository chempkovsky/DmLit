
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';


import { LitManuscriptViewReditComponent } from './redit/lit-manuscript-view-redit.component';
import { LitManuscriptViewRlistComponent } from './rlist/lit-manuscript-view-rlist.component';
import { LitManuscriptViewSModule } from './lit-manuscript-view-s.module';
import { LitManuscriptViewEModule } from './lit-manuscript-view-e.module';

import { LitCountryViewSModule } from './../lit-country-view/lit-country-view-s.module';



@NgModule({
    declarations: [
        LitManuscriptViewReditComponent,
        LitManuscriptViewRlistComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitManuscriptViewSModule,
        LitManuscriptViewEModule,

        LitCountryViewSModule,

    ],
    exports: [
        LitManuscriptViewReditComponent,
        LitManuscriptViewRlistComponent
    ],
    entryComponents: [
    ]
})
export class LitManuscriptViewRModule { }


