
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { AppFormatterModule } from './../../shared/modules/app-formatter.module';
import { LitAuthorViewEformComponent } from './eform/lit-author-view-eform.component';
import { LitAuthorViewEdlgComponent } from './edlg/lit-author-view-edlg.component';


import { LitCountryViewSModule } from './../lit-country-view/lit-country-view-s.module';

@NgModule({
    declarations: [
        LitAuthorViewEformComponent,
        LitAuthorViewEdlgComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        AppFormatterModule,
        LitCountryViewSModule,

    ],
    exports: [
        LitAuthorViewEformComponent,
        LitAuthorViewEdlgComponent
    ],
    entryComponents: [
        LitAuthorViewEdlgComponent
    ]
})
export class LitAuthorViewEModule { }


