
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';


import { LitGenreViewReditComponent } from './redit/lit-genre-view-redit.component';
import { LitGenreViewRlistComponent } from './rlist/lit-genre-view-rlist.component';
import { LitGenreViewSModule } from './lit-genre-view-s.module';
import { LitGenreViewEModule } from './lit-genre-view-e.module';




@NgModule({
    declarations: [
        LitGenreViewReditComponent,
        LitGenreViewRlistComponent
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
        LitGenreViewReditComponent,
        LitGenreViewRlistComponent
    ],
    entryComponents: [
    ]
})
export class LitGenreViewRModule { }


