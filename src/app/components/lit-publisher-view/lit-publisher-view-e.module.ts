
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { AppFormatterModule } from './../../shared/modules/app-formatter.module';
import { LitPublisherViewEformComponent } from './eform/lit-publisher-view-eform.component';
import { LitPublisherViewEdlgComponent } from './edlg/lit-publisher-view-edlg.component';


import { LitCountryViewSModule } from './../lit-country-view/lit-country-view-s.module';

@NgModule({
    declarations: [
        LitPublisherViewEformComponent,
        LitPublisherViewEdlgComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        AppFormatterModule,
        LitCountryViewSModule,

    ],
    exports: [
        LitPublisherViewEformComponent,
        LitPublisherViewEdlgComponent
    ],
    entryComponents: [
        LitPublisherViewEdlgComponent
    ]
})
export class LitPublisherViewEModule { }


