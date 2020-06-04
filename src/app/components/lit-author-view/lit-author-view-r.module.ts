
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';


import { LitAuthorViewReditComponent } from './redit/lit-author-view-redit.component';
import { LitAuthorViewRlistComponent } from './rlist/lit-author-view-rlist.component';
import { LitAuthorViewSModule } from './lit-author-view-s.module';
import { LitAuthorViewEModule } from './lit-author-view-e.module';

import { LitCountryViewSModule } from './../lit-country-view/lit-country-view-s.module';



@NgModule({
    declarations: [
        LitAuthorViewReditComponent,
        LitAuthorViewRlistComponent
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
        LitAuthorViewReditComponent,
        LitAuthorViewRlistComponent
    ],
    entryComponents: [
    ]
})
export class LitAuthorViewRModule { }


