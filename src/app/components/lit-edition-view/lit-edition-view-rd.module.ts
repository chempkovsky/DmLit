
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';

import { LitEditionViewEModule } from './lit-edition-view-e.module';
import { LitEditionViewSModule } from './lit-edition-view-s.module';
import { LitEditionViewRdlistComponent } from './rdlist/lit-edition-view-rdlist.component';





@NgModule({
    declarations: [
        LitEditionViewRdlistComponent,
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
        LitEditionViewRdlistComponent
    ],
    entryComponents: [
    ]
})
export class LitEditionViewRdModule { }


