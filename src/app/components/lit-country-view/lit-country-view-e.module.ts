
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppFlexLayoutModule } from './../../shared/modules/app-flex-layout.module';
import { AppMaterialModule } from './../../shared/modules/app-material.module';
import { AppFormatterModule } from './../../shared/modules/app-formatter.module';
import { LitCountryViewEformComponent } from './eform/lit-country-view-eform.component';
import { LitCountryViewEdlgComponent } from './edlg/lit-country-view-edlg.component';



@NgModule({
    declarations: [
        LitCountryViewEformComponent,
        LitCountryViewEdlgComponent
    ],
    imports: [
        CommonModule,
        AppMaterialModule,
        AppFlexLayoutModule,
        AppFormatterModule,

    ],
    exports: [
        LitCountryViewEformComponent,
        LitCountryViewEdlgComponent
    ],
    entryComponents: [
        LitCountryViewEdlgComponent
    ]
})
export class LitCountryViewEModule { }


