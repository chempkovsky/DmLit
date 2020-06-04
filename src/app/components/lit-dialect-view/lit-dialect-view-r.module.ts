
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';


import { LitDialectViewReditComponent } from './redit/lit-dialect-view-redit.component';
import { LitDialectViewRlistComponent } from './rlist/lit-dialect-view-rlist.component';
import { LitDialectViewSModule } from './lit-dialect-view-s.module';
import { LitDialectViewEModule } from './lit-dialect-view-e.module';

import { LitLanguageViewSModule } from './../lit-language-view/lit-language-view-s.module';



@NgModule({
    declarations: [
        LitDialectViewReditComponent,
        LitDialectViewRlistComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitDialectViewSModule,
        LitDialectViewEModule,

        LitLanguageViewSModule,

    ],
    exports: [
        LitDialectViewReditComponent,
        LitDialectViewRlistComponent
    ],
    entryComponents: [
    ]
})
export class LitDialectViewRModule { }


