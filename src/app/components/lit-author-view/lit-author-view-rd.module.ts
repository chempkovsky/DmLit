
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';

import { LitAuthorViewEModule } from './lit-author-view-e.module';
import { LitAuthorViewSModule } from './lit-author-view-s.module';
import { LitAuthorViewRdlistComponent } from './rdlist/lit-author-view-rdlist.component';


import { LitCountryViewSModule } from './../lit-country-view/lit-country-view-s.module';



@NgModule({
    declarations: [
        LitAuthorViewRdlistComponent,
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitAuthorViewSModule,
        LitAuthorViewEModule,
        
        LitCountryViewSModule,

    ],
    exports: [
        LitAuthorViewRdlistComponent
    ],
    entryComponents: [
    ]
})
export class LitAuthorViewRdModule { }


