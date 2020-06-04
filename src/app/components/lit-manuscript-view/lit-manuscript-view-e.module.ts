
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { AppFormatterModule } from './../../shared/modules/app-formatter.module';
import { LitManuscriptViewEformComponent } from './eform/lit-manuscript-view-eform.component';
import { LitManuscriptViewEdlgComponent } from './edlg/lit-manuscript-view-edlg.component';


import { LitCountryViewSModule } from './../lit-country-view/lit-country-view-s.module';

@NgModule({
    declarations: [
        LitManuscriptViewEformComponent,
        LitManuscriptViewEdlgComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        AppFormatterModule,
        LitCountryViewSModule,

    ],
    exports: [
        LitManuscriptViewEformComponent,
        LitManuscriptViewEdlgComponent
    ],
    entryComponents: [
        LitManuscriptViewEdlgComponent
    ]
})
export class LitManuscriptViewEModule { }


