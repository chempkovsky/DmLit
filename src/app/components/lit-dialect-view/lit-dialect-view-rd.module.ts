
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';

import { LitDialectViewEModule } from './lit-dialect-view-e.module';
import { LitDialectViewSModule } from './lit-dialect-view-s.module';
import { LitDialectViewRdlistComponent } from './rdlist/lit-dialect-view-rdlist.component';


import { LitLanguageViewSModule } from './../lit-language-view/lit-language-view-s.module';



@NgModule({
    declarations: [
        LitDialectViewRdlistComponent,
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
        LitDialectViewRdlistComponent
    ],
    entryComponents: [
    ]
})
export class LitDialectViewRdModule { }


