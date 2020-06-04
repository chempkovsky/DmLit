
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';

import { LitLanguageViewEModule } from './lit-language-view-e.module';
import { LitLanguageViewSModule } from './lit-language-view-s.module';
import { LitLanguageViewRdlistComponent } from './rdlist/lit-language-view-rdlist.component';





@NgModule({
    declarations: [
        LitLanguageViewRdlistComponent,
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitLanguageViewSModule,
        LitLanguageViewEModule,
        

    ],
    exports: [
        LitLanguageViewRdlistComponent
    ],
    entryComponents: [
    ]
})
export class LitLanguageViewRdModule { }


