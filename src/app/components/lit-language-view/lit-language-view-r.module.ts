
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';


import { LitLanguageViewReditComponent } from './redit/lit-language-view-redit.component';
import { LitLanguageViewRlistComponent } from './rlist/lit-language-view-rlist.component';
import { LitLanguageViewSModule } from './lit-language-view-s.module';
import { LitLanguageViewEModule } from './lit-language-view-e.module';




@NgModule({
    declarations: [
        LitLanguageViewReditComponent,
        LitLanguageViewRlistComponent
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
        LitLanguageViewReditComponent,
        LitLanguageViewRlistComponent
    ],
    entryComponents: [
    ]
})
export class LitLanguageViewRModule { }


