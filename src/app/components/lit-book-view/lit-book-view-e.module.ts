
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { AppFormatterModule } from './../../shared/modules/app-formatter.module';
import { LitBookViewEformComponent } from './eform/lit-book-view-eform.component';
import { LitBookViewEdlgComponent } from './edlg/lit-book-view-edlg.component';


import { LitCountryViewSModule } from './../lit-country-view/lit-country-view-s.module';

@NgModule({
    declarations: [
        LitBookViewEformComponent,
        LitBookViewEdlgComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        AppFormatterModule,
        LitCountryViewSModule,

    ],
    exports: [
        LitBookViewEformComponent,
        LitBookViewEdlgComponent
    ],
    entryComponents: [
        LitBookViewEdlgComponent
    ]
})
export class LitBookViewEModule { }


