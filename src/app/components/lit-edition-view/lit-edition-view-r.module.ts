
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';


import { LitEditionViewReditComponent } from './redit/lit-edition-view-redit.component';
import { LitEditionViewRlistComponent } from './rlist/lit-edition-view-rlist.component';
import { LitEditionViewSModule } from './lit-edition-view-s.module';
import { LitEditionViewEModule } from './lit-edition-view-e.module';




@NgModule({
    declarations: [
        LitEditionViewReditComponent,
        LitEditionViewRlistComponent
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitEditionViewSModule,
        LitEditionViewEModule,


    ],
    exports: [
        LitEditionViewReditComponent,
        LitEditionViewRlistComponent
    ],
    entryComponents: [
    ]
})
export class LitEditionViewRModule { }


