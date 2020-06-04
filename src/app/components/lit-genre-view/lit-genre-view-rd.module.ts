
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';

import { LitGenreViewEModule } from './lit-genre-view-e.module';
import { LitGenreViewSModule } from './lit-genre-view-s.module';
import { LitGenreViewRdlistComponent } from './rdlist/lit-genre-view-rdlist.component';





@NgModule({
    declarations: [
        LitGenreViewRdlistComponent,
    ],
    imports: [
        CommonModule,
        // BrowserModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        // WebServiceFilterModule,
        LitGenreViewSModule,
        LitGenreViewEModule,
        

    ],
    exports: [
        LitGenreViewRdlistComponent
    ],
    entryComponents: [
    ]
})
export class LitGenreViewRdModule { }


