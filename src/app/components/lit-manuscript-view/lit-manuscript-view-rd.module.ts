
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';

import { LitManuscriptViewEModule } from './lit-manuscript-view-e.module';
import { LitManuscriptViewSModule } from './lit-manuscript-view-s.module';
import { LitManuscriptViewRdlistComponent } from './rdlist/lit-manuscript-view-rdlist.component';


import { LitCountryViewSModule } from './../lit-country-view/lit-country-view-s.module';



@NgModule({
    declarations: [
        LitManuscriptViewRdlistComponent,
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
        LitManuscriptViewRdlistComponent
    ],
    entryComponents: [
    ]
})
export class LitManuscriptViewRdModule { }


